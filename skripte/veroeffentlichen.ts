import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Short } from '../src/typen';
import { hochladen, oeffentlichErreichbar, zugangAusUmgebung } from '../src/ablage';
import {
  beitragPlanen,
  beitragstext,
  beitragstitel,
  kanaeleLesen,
  naechsterMontag,
  organisationErmitteln,
  zeitplanBauen,
  type Veroeffentlichung,
} from '../src/buffer';

/**
 * Veroeffentlichungsschritt.
 *
 * Liest die Freigabeentscheidung, legt die freigegebenen Videos oeffentlich
 * ab und plant sie ueber Buffer ein.
 *
 * Aufruf:
 *   npm run veroeffentlichen -- <lauf-id>            Probelauf, plant nichts
 *   npm run veroeffentlichen -- <lauf-id> --wirklich Legt Beitraege wirklich an
 *
 * Der Probelauf ist Standard. Geplante Beitraege lassen sich nur einzeln von
 * Hand wieder entfernen — ein versehentlicher Durchlauf waere teuer an Zeit.
 */

const WIRKLICH = process.argv.includes('--wirklich');
const LAUF_ID = process.argv.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));

const main = async () => {
  if (!LAUF_ID) throw new Error('Lauf-Kennung fehlt. Beispiel: npm run veroeffentlichen -- 2026-08-11');

  const schluessel = process.env.BUFFER_ACCESS_TOKEN;
  if (!schluessel) throw new Error('BUFFER_ACCESS_TOKEN fehlt in .env');

  const wurzel = path.join('laeufe', LAUF_ID);
  console.log(`SetupKlar · Veröffentlichung ${LAUF_ID}`);
  console.log(WIRKLICH ? 'Modus: Beiträge werden wirklich angelegt\n' : 'Modus: Probelauf, es wird nichts angelegt\n');

  /* ── 1  Freigabe einlesen ────────────────────────────────────────── */

  const lauf = JSON.parse(await fs.readFile(path.join(wurzel, 'lauf.json'), 'utf8')) as { shorts: unknown[] };

  /*
   * Ein Lauf aus der Zeit vor einer Vertragsaenderung entspricht dem Schema
   * nicht mehr. `Short.parse` wirft dann eine Zod-Fehlerwand, aus der nicht
   * hervorgeht, was eigentlich zu tun ist — naemlich neu rendern, nicht die
   * alte Datei reparieren.
   */
  const geparst = lauf.shorts.map((s) => Short.safeParse(s));
  const kaputt = geparst.filter((e) => !e.success);
  if (kaputt.length > 0) {
    const felder = [
      ...new Set(
        kaputt.flatMap((e) => (e as { error: { issues: { path: (string | number)[] }[] } }).error.issues.map((i) => i.path.join('.'))),
      ),
    ].slice(0, 6);
    throw new Error(
      `${kaputt.length} von ${lauf.shorts.length} Shorts in lauf.json entsprechen nicht mehr dem ` +
        `Datenvertrag (${felder.join(', ')}). Der Lauf stammt aus der Zeit vor einer Vertragsänderung ` +
        'und lässt sich nicht nachträglich veröffentlichen – er muss neu erzeugt werden.',
    );
  }
  const alle = geparst.map((e) => (e as { data: Short }).data);

  let freigegebeneIds: string[];
  try {
    const freigabe = JSON.parse(await fs.readFile(path.join(wurzel, 'freigabe.json'), 'utf8')) as {
      freigegeben: string[];
    };
    freigegebeneIds = freigabe.freigegeben;
  } catch {
    throw new Error(
      `Keine Freigabe gefunden. Öffne ${path.join(wurzel, 'freigabe.html')}, entscheide je Video ` +
        `und lege die heruntergeladene freigabe.json in ${wurzel} ab.`,
    );
  }

  const shorts = alle.filter((s) => freigegebeneIds.includes(s.id));
  console.log(`1  Freigabe: ${shorts.length} von ${alle.length} Videos\n`);
  if (shorts.length === 0) return;

  /* ── 1b  Sind die Videos noch aktuell? ───────────────────────────── */

  /*
   * Dieses Skript lud bisher hoch, was im Ordner lag — ohne zu fragen, ob es
   * zum aktuellen Stand passt. Genau das ist am 12.08.2026 passiert: Die
   * Videos des Laufs waren vor der Safe-Zone-Korrektur gerendert, die
   * Beschriftung des letzten Geraets lag im Bereich, den Reels mit der
   * Beschreibung ueberdeckt. Gemerkt hat es ein Mensch, nicht das Skript.
   *
   * Die Pruefung ist bewusst grob: Ist irgendetwas in `video/`, `src/` oder
   * `daten/` neuer als die Videodatei, wurde nach dem Render geaendert. Das
   * meldet gelegentlich einen Fehlalarm — ein geaenderter Kommentar zaehlt
   * mit. Der Preis ist ein unnoetiger Neurender; der Preis der Gegenrichtung
   * ist ein veraltetes Video, das oeffentlich steht.
   */
  /*
   * `daten/verlauf.json` ist ausgenommen, und das ist kein Schlupfloch: Der
   * Wochenlauf schreibt es **nach** dem Rendern (Schritt 6). Ohne die
   * Ausnahme waere jedes frisch gerenderte Video sofort veraltet und die
   * Pruefung dauerhaft rot — und eine Pruefung, die immer rot ist, liest bald
   * niemand mehr. Der Verlauf ist Buchhaltung ueber den Lauf, kein Eingang
   * in das Video.
   */
  const NICHT_UEBERWACHT = new Set([path.join('daten', 'verlauf.json')]);

  const neuesteAenderung = async (ordner: string): Promise<number> => {
    const eintraege = await fs.readdir(ordner, { withFileTypes: true });
    const zeiten = await Promise.all(
      eintraege.map(async (e) => {
        const pfad = path.join(ordner, e.name);
        if (NICHT_UEBERWACHT.has(pfad)) return 0;
        if (e.isDirectory()) return neuesteAenderung(pfad);
        return (await fs.stat(pfad)).mtimeMs;
      }),
    );
    return Math.max(0, ...zeiten);
  };

  const quellstand = Math.max(
    ...(await Promise.all(['video', 'src', 'daten'].map(neuesteAenderung))),
  );

  const veraltet: string[] = [];
  for (const short of shorts) {
    const datei = path.join(wurzel, 'videos', `${short.id}.mp4`);
    const stand = await fs.stat(datei).catch(() => null);
    if (!stand) throw new Error(`Videodatei fehlt: ${datei}`);
    if (stand.mtimeMs < quellstand) veraltet.push(short.id);
  }

  if (veraltet.length > 0) {
    throw new Error(
      `${veraltet.length} Video(s) sind älter als der aktuelle Stand von video/, src/ oder daten/ ` +
        `(${veraltet.join(', ')}). Seit dem Render wurde am Aussehen oder an den Daten gearbeitet – ` +
        'vor der Veröffentlichung neu rendern mit `npm run lauf -- --mit-ton`.',
    );
  }
  console.log(`   Videos sind auf dem Stand von video/, src/ und daten/\n`);

  // Ohne Tonspur ist ein Video stumm. Das darf nicht nach draussen.
  const stumme = shorts.filter((s) => !s.tonspur);
  if (stumme.length > 0) {
    throw new Error(
      `${stumme.length} freigegebene Video(s) haben keine Tonspur (${stumme.map((s) => s.id).join(', ')}). ` +
        'Der Lauf war ein Trockenlauf – vor der Veröffentlichung mit --mit-ton wiederholen.',
    );
  }

  /* ── 2  Kanaele lesen ────────────────────────────────────────────── */

  console.log('2  Kanäle');
  const organisation = await organisationErmitteln(schluessel);
  const kanaele = (await kanaeleLesen(schluessel, organisation)).filter((k) => !k.isDisconnected);
  for (const k of kanaele) console.log(`   ${k.service.padEnd(12)} ${k.name}`);
  if (kanaele.length === 0) throw new Error('Keine verbundenen Kanäle in Buffer.');
  console.log('');

  /* ── 3  Videos ablegen ───────────────────────────────────────────── */

  console.log('3  Dateiablage');
  const zugang = zugangAusUmgebung();
  const urls = new Map<string, string>();

  for (const short of shorts) {
    const lokal = path.join(wurzel, 'videos', `${short.id}.mp4`);
    const zielpfad = `${LAUF_ID}/${short.id}.mp4`;

    if (WIRKLICH) {
      const url = await hochladen(zugang, lokal, zielpfad);
      if (!(await oeffentlichErreichbar(url))) {
        throw new Error(
          `${url} ist nicht öffentlich erreichbar. Buffer könnte das Video nicht laden – ` +
            'im R2-Dashboard den öffentlichen Zugriff für den Bucket freigeben.',
        );
      }
      urls.set(short.id, url);
      console.log(`   ${short.id} → ${url}`);
    } else {
      urls.set(short.id, `${zugang.oeffentlicheBasis}/${zielpfad}`);
      console.log(`   ${short.id} → würde nach ${zielpfad} geladen`);
    }
  }
  console.log('');

  /* ── 4  Zeitplan und Beitraege ───────────────────────────────────── */

  console.log('4  Zeitplan');
  const zeiten = zeitplanBauen(shorts, naechsterMontag(new Date()));
  const geplant: Veroeffentlichung[] = [];

  for (const [i, short] of shorts.entries()) {
    const faellig = zeiten[i]!;
    const videoUrl = urls.get(short.id)!;

    for (const kanal of kanaele) {
      const text = beitragstext(short, kanal.service);
      if (!text) {
        console.log(`   ${short.id}  ${kanal.service}: kein Text hinterlegt, übersprungen`);
        continue;
      }

      const titel = beitragstitel(short, kanal.service) ?? short.texte.youtube.titel;
      const wann = faellig.toLocaleString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

      if (WIRKLICH) {
        const beitragId = await beitragPlanen(schluessel, {
          kanalId: kanal.id,
          dienst: kanal.service,
          text,
          videoUrl,
          titel,
          kiStimme: short.kennzeichnung.kiStimme,
          faelligAm: faellig,
        });
        geplant.push({ shortId: short.id, kanalId: kanal.id, dienst: kanal.service, faelligAm: faellig.toISOString(), beitragId });
        console.log(`   ✓ ${short.id}  ${kanal.service.padEnd(10)} ${wann}`);
      } else {
        console.log(`   · ${short.id}  ${kanal.service.padEnd(10)} ${wann}`);
      }
    }
  }

  if (WIRKLICH) {
    await fs.writeFile(path.join(wurzel, 'veroeffentlicht.json'), JSON.stringify(geplant, null, 2));
    console.log(`\n${geplant.length} Beiträge geplant. Übersicht in ${wurzel}/veroeffentlicht.json`);
  } else {
    console.log(`\nProbelauf beendet. Mit --wirklich würden ${shorts.length * kanaele.length} Beiträge angelegt.`);
  }
};

main().catch((fehler) => {
  console.error('\nFehlgeschlagen:', fehler.message);
  process.exit(1);
});
