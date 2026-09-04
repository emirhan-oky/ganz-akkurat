import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Quelle, Short } from '../src/typen';
import { hochladen, oeffentlichErreichbar, zugangAusUmgebung } from '../src/ablage';
import {
  geplanteJeKanal,
  GEPLANT_MAXIMUM,
  beitragPlanen,
  beitragstext,
  beitragstitel,
  kanaeleLesen,
  naechsterMontag,
  nichtInDerVergangenheit,
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
 *   npm run veroeffentlichen -- <lauf-id> --ab=2026-08-17  Wochenbeginn setzen
 *   npm run veroeffentlichen -- <lauf-id> --termine=2026-09-04T18:00,…  Termine von Hand
 *
 * Der Probelauf ist Standard. Geplante Beitraege lassen sich nur einzeln von
 * Hand wieder entfernen — ein versehentlicher Durchlauf waere teuer an Zeit.
 */

const WIRKLICH = process.argv.includes('--wirklich');
const LAUF_ID = process.argv.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));
/** Wochenbeginn, falls nicht der naechste Montag gemeint ist. */
const AB = process.argv.find((a) => a.startsWith('--ab='))?.slice('--ab='.length);

/**
 * Termine von Hand, je Short einer, in der Reihenfolge der Freigabe.
 *
 * **Der Zeitplan kann genau eine Form: ein Video je Tag zur Uhrzeit seines
 * Formats.** Das ist die Regel des Takts und bleibt die Voreinstellung — aber
 * am 04.09.2026 sollten vier Videos auf drei Tage, zwei davon am selben Tag zu
 * verschiedenen Stunden. Ohne diesen Schalter waere der Ausweg gewesen, den
 * Lauf viermal mit verschiedenem `--ab=` aufzurufen und dazu die Uhrzeit am
 * Format zu verbiegen — **eine Regel zu verbiegen, um sie einmal zu umgehen,
 * hinterlaesst sie verbogen.**
 *
 * Er ersetzt `zeitplanBauen` vollstaendig und vertraegt sich deshalb nicht mit
 * `--ab=`. `nichtInDerVergangenheit` laeuft hinterher wie sonst auch.
 */
const TERMINE = process.argv
  .find((a) => a.startsWith('--termine='))
  ?.slice('--termine='.length)
  .split(',')
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

const main = async () => {
  if (!LAUF_ID) throw new Error('Lauf-Kennung fehlt. Beispiel: npm run veroeffentlichen -- 2026-08-11');

  const schluessel = process.env.BUFFER_ACCESS_TOKEN;
  if (!schluessel) throw new Error('BUFFER_ACCESS_TOKEN fehlt in .env');

  const wurzel = path.join('laeufe', LAUF_ID);
  /*
   * Die Quellen fuer den Beitragstext. Sie stehen unter jedem Video und
   * werden aus den `quelleId`s der Szenen erzeugt — nicht aus einer zweiten
   * Liste im Beschreibungstext, wie bis zum 15.08.2026.
   */
  const quellen = (
    JSON.parse(await fs.readFile('daten/quellen.json', 'utf8')) as { quellen: unknown[] }
  ).quellen.map((q) => Quelle.parse(q));

  console.log(`Ganz akkurat · Veröffentlichung ${LAUF_ID}`);
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
   * Ausgenommen ist, was **nachweislich nicht in das Video eingeht**.
   *
   * Die Liste ist eine Ausnahmeliste und keine Einschlussliste, und das ist
   * Absicht: Wer eine neue Datei anlegt, ist damit ueberwacht, bis jemand
   * ausdruecklich das Gegenteil begruendet. Vergisst man einen Eintrag, gibt
   * es einen Fehlalarm und einen unnoetigen Neurender. Vergaesse man einen
   * Eintrag in einer Einschlussliste, ginge ein veraltetes Video online.
   *
   * `daten/verlauf.json` — der Wochenlauf schreibt es **nach** dem Rendern
   * (Schritt 6). Ohne die Ausnahme waere jedes frisch gerenderte Video sofort
   * veraltet und die Pruefung dauerhaft rot.
   *
   * `daten/rueckblick.json` und `src/youtube.ts` — derselbe Denkfehler, nur
   * eine Woche spaeter: Der Rueckblick misst, was aus den **veroeffentlichten**
   * Videos geworden ist, und schreibt das nach `daten/`. Ohne die Ausnahme
   * haette ein Blick auf die Zahlen vom Montag jedes fertige Video des
   * Dienstags fuer veraltet erklaert.
   *
   * Die vier Module der Veroeffentlichungskette — hinzugekommen am
   * 15.08.2026, nach einem Zirkelschluss im laufenden Betrieb: Buffer
   * antwortete mit 504, die Fehlermeldung dazu war unbrauchbar, also wurde
   * `src/buffer.ts` verbessert — und **genau diese Verbesserung** erklaerte
   * das fertige Video fuer veraltet. Um zu veroeffentlichen, musste die Kette
   * repariert werden; wer die Kette reparierte, durfte nicht mehr
   * veroeffentlichen.
   *
   * Keines der vier Module laeuft im Browser-Kontext von Remotion. Sie
   * kommen erst zum Zug, wenn die Datei fertig auf der Platte liegt: hochladen
   * (`ablage`), einplanen (`buffer`), Buchfuehrung (`verlauf`), und die
   * Uebersicht, aus der die Freigabe entsteht (`freigabeseite`).
   *
   * `daten/marke/` — die drei Prosadateien des Kanals (`brand-profile.md`,
   * `voice.md`, `dialoganalyse.md`). Sie werden von Menschen und Skills
   * gelesen, von keiner Zeile Code: Ein `grep` ueber `src/`, `video/` und
   * `skripte/` findet sie nur in Kommentaren. Am 04.09.2026 hat ein
   * nachgetragener Befund vier fertige Videos fuer veraltet erklaert —
   * **eine Notiz ueber die Sprache aendert kein Bild.**
   *
   * **Nicht ausgenommen und niemals auszunehmen** sind `marke`, `zeit`,
   * `typen`, `illustration`, `pruefung`, `stimme` und `medien`: Die ersten
   * vier bestimmen das Bild, die letzten beiden Ton und Lautheit — und die
   * stecken in derselben Datei. `src/marke.ts` und `daten/marke/` sind
   * verschiedene Dinge mit demselben Wort.
   */
  const NICHT_UEBERWACHT = new Set([
    path.join('daten', 'verlauf.json'),
    path.join('daten', 'rueckblick.json'),
    path.join('daten', 'marke'),
    path.join('src', 'ablage.ts'),
    path.join('src', 'youtube.ts'),
    path.join('src', 'buffer.ts'),
    path.join('src', 'verlauf.ts'),
    path.join('src', 'freigabeseite.ts'),
  ]);

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

  /*
   * Eine Datei je Short, seit dem 04.09.2026. Vorher lag hier eine Fassung je
   * Dienst, weil das Folgen-Zeichen an der Signatur je Plattform woanders hin
   * deutete — mit dem Zeiger ist der Unterschied gegangen. **Ein Short ist
   * derselbe, egal wo er landet.**
   */
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

  /*
   * **Eine Datei je Short, alle drei Kanaele teilen sie.** Bis zum 24.08.2026
   * war das schon einmal so, dann kam das Folgen-Zeichen je Plattform dazu und
   * verlangte drei Fassungen. Am 04.09.2026 ist der Zeiger gestrichen, und
   * damit ist der Unterschied wieder weg — samt zwei Dritteln der Renderzeit
   * und zwei Dritteln des Uploads.
   */
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
      console.log(`   ${short.id}  → ${url}`);
    } else {
      urls.set(short.id, `${zugang.oeffentlicheBasis}/${zielpfad}`);
      console.log(`   ${short.id}  → würde nach ${zielpfad} geladen`);
    }
  }
  console.log('');

  /* ── 4  Zeitplan und Beitraege ───────────────────────────────────── */

  console.log('4  Zeitplan');
  /*
   * `--ab=<datum>` bestimmt den Wochenbeginn, sonst der naechste Montag.
   *
   * Gebraucht am 17.08.2026 fuer die allererste Woche: Sie sollte an dem
   * Montag starten, an dem sie fertig wurde, und nicht sieben Tage spaeter.
   * `naechsterMontag` liefert bewusst immer den **naechsten** — von einem
   * Montag aus also den in einer Woche. Das ist als Voreinstellung richtig
   * (wer montags baut, sendet die Woche darauf), taugt aber nicht als einzige
   * Moeglichkeit.
   */
  const jetzt = new Date();
  if (TERMINE && AB) {
    throw new Error('--termine= und --ab= schliessen sich aus: --termine setzt jeden Termin selbst.');
  }

  let geplanteZeiten: Date[];
  if (TERMINE) {
    if (TERMINE.length !== shorts.length) {
      throw new Error(
        `--termine= nennt ${TERMINE.length} Termin(e), freigegeben sind ${shorts.length} Video(s). ` +
          'Je Video genau ein Termin, in der Reihenfolge der Freigabe.',
      );
    }
    geplanteZeiten = TERMINE.map((s, i) => {
      const d = new Date(s.length <= 10 ? `${s}T00:00:00` : s);
      if (Number.isNaN(d.getTime())) {
        throw new Error(`--termine=: „${s}" ist kein Zeitpunkt. Erwartet wird 2026-09-04T18:00.`);
      }
      console.log(
        `   ${shorts[i]!.id.padEnd(22)} ${d.toLocaleString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}  (von Hand)`,
      );
      return d;
    });
  } else {
    const beginn = AB ? new Date(`${AB}T00:00:00`) : naechsterMontag(jetzt);
    if (AB && beginn.getDay() !== 1) {
      console.log(`   ⚠ ${AB} ist kein Montag – die Wochentage verschieben sich entsprechend.`);
    }
    geplanteZeiten = zeitplanBauen(shorts, beginn);
  }
  const zeiten = nichtInDerVergangenheit(geplanteZeiten, jetzt);
  const nachgezogen = zeiten.filter((z, i) => z.getTime() !== geplanteZeiten[i]!.getTime()).length;
  if (nachgezogen > 0) {
    console.log(`   ${nachgezogen} Termin(e) lagen in der Vergangenheit und gehen gleich raus.\n`);
  }
  /*
   * Was schon eingeplant ist, wird uebersprungen — und es wird nur so viel
   * eingeplant, wie Buffer noch annimmt.
   *
   * Beides kommt vom 18.08.2026. Buffers kostenloser Tarif erlaubt zehn
   * geplante Beitraege **je Kanal**; bei acht Shorts auf drei Kanaelen passt
   * eine zweite Woche nicht daneben, solange die erste noch aussteht. Der
   * Lauf brach damals mitten im Versand ab.
   *
   * Abbrechen waere die falsche Antwort gewesen. Der Lauf legt jetzt an, was
   * hineinpasst, merkt sich in `veroeffentlicht.json`, was schon draussen
   * ist, und beim naechsten Aufruf geht der Rest raus — ohne Doppelung, weil
   * bereits eingeplante Shorts erkannt und uebersprungen werden.
   *
   * Damit ist der Lauf **wiederholbar**: Man kann ihn taeglich aufrufen, und
   * er tut jedes Mal genau so viel, wie moeglich ist. Das ist die Grundlage
   * fuer `npm run nachlegen`.
   */
  const bereitsGeplant = await fs
    .readFile(path.join(wurzel, 'veroeffentlicht.json'), 'utf8')
    .then((t) => JSON.parse(t) as Veroeffentlichung[])
    .catch(() => [] as Veroeffentlichung[]);
  const schonDraussen = new Set(bereitsGeplant.map((e) => `${e.shortId}\u0000${e.kanalId}`));

  let platzJeKanal = new Map<string, number>();
  if (WIRKLICH) {
    const belegt = await geplanteJeKanal(schluessel, organisation);
    platzJeKanal = new Map(
      kanaele.map((k) => [k.id, Math.max(0, GEPLANT_MAXIMUM - (belegt.get(k.id) ?? 0))]),
    );

    const offen = shorts.filter((sh) =>
      kanaele.some((k) => !schonDraussen.has(`${sh.id}\u0000${k.id}`)),
    );
    const knapp = kanaele.filter((k) => (platzJeKanal.get(k.id) ?? 0) < offen.length);
    if (knapp.length > 0) {
      console.log('   Buffer hat begrenzt Platz — es geht raus, was hineinpasst:');
      for (const k of knapp) {
        console.log(
          `   ${k.service.padEnd(10)} ${platzJeKanal.get(k.id)} frei von ${GEPLANT_MAXIMUM}, ` +
            `${offen.length} Short(s) offen`,
        );
      }
      console.log('   Der Rest geht beim nächsten Lauf raus (npm run nachlegen).\n');
    }
  }

  const geplant: Veroeffentlichung[] = [];

  /*
   * Nach **jedem** angelegten Beitrag fortschreiben, nicht erst am Ende.
   *
   * Am 18.08.2026 brach der Lauf nach dem zwoelften von 24 Beitraegen ab
   * (Buffer-Kontolimit). Die zwoelf standen damit draussen, aber in keiner
   * Datei — und `npm run rueckblick` haette sie nie gefunden. Die Zuordnung
   * musste hinterher von Hand aus Buffer zurueckgeholt und ueber die
   * Faelligkeit den Shorts zugeordnet werden.
   *
   * Ein Beitrag, der angelegt ist, existiert. Ihn erst nach dem letzten
   * Erfolg zu vermerken heisst, den Buchhaltungsstand von etwas abhaengig zu
   * machen, das danach kommt.
   */
  const fortschreiben = async () => {
    const ablage = path.join(wurzel, 'veroeffentlicht.json');
    const bisher = await fs
      .readFile(ablage, 'utf8')
      .then((t) => JSON.parse(t) as Veroeffentlichung[])
      .catch(() => [] as Veroeffentlichung[]);
    const schluesselVon = (e: Veroeffentlichung) => `${e.shortId}\u0000${e.kanalId}`;
    const neuKeys = new Set(geplant.map(schluesselVon));
    await fs.writeFile(
      ablage,
      JSON.stringify([...bisher.filter((e) => !neuKeys.has(schluesselVon(e))), ...geplant], null, 2),
    );
  };

  for (const [i, short] of shorts.entries()) {
    const faellig = zeiten[i]!;

    for (const kanal of kanaele) {
      const text = beitragstext(short, kanal.service, quellen);
      if (!text) {
        console.log(`   ${short.id}  ${kanal.service}: kein Text hinterlegt, übersprungen`);
        continue;
      }

      /*
       * Kein `!` an dieser Stelle. Fehlt die Fassung, ginge `undefined` als
       * Video-URL an Buffer — der Beitrag entstuende, nur ohne Video, und der
       * Fehler faellt erst zum Sendetermin auf.
       */
      const videoUrl = urls.get(short.id);
      if (!videoUrl) {
        console.log(`   ${short.id}  ${kanal.service}: keine Fassung gerendert, übersprungen`);
        continue;
      }

      if (schonDraussen.has(`${short.id}\u0000${kanal.id}`)) {
        console.log(`   · ${short.id}  ${kanal.service.padEnd(10)} steht schon in Buffer`);
        continue;
      }

      if (WIRKLICH && (platzJeKanal.get(kanal.id) ?? 0) <= 0) {
        console.log(`   ⏸ ${short.id}  ${kanal.service.padEnd(10)} kein Platz mehr, bleibt offen`);
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
        await fortschreiben();
        platzJeKanal.set(kanal.id, (platzJeKanal.get(kanal.id) ?? 1) - 1);
        console.log(`   ✓ ${short.id}  ${kanal.service.padEnd(10)} ${wann}`);
      } else {
        console.log(`   · ${short.id}  ${kanal.service.padEnd(10)} ${wann}`);
      }
    }
  }

  if (WIRKLICH) {
    /*
     * Angehaengt, nicht ersetzt.
     *
     * Diese Datei ist die einzige Bruecke zwischen einem Entwurf auf der
     * Platte und dem Video draussen: `npm run rueckblick` liest hier
     * `shortId` und `beitragId` und holt sich darueber bei Buffer den
     * `externalLink`. Wird sie ueberschrieben, verliert der Rueckblick alle
     * frueher veroeffentlichten Videos — und zwar lautlos, denn die neue
     * Datei sieht vollstaendig aus.
     *
     * Der Fall ist nicht hypothetisch: Am 18.08.2026 liefen **zwei** Wochen
     * durch denselben Tagesordner, weil beide am selben Tag fertig wurden.
     * Ohne dieses Anhaengen haette die zweite Veroeffentlichung die
     * Zuordnung der ersten mitgenommen.
     *
     * Ein Eintrag wird ersetzt, wenn dieselbe `shortId` auf demselben Kanal
     * erneut geplant wird — dann gilt der neue Beitrag. Alles andere bleibt
     * stehen.
     */
    const ablage = path.join(wurzel, 'veroeffentlicht.json');
    const bisher = await fs
      .readFile(ablage, 'utf8')
      .then((t) => JSON.parse(t) as typeof geplant)
      .catch(() => [] as typeof geplant);

    const schluessel = (e: (typeof geplant)[number]) => `${e.shortId}\u0000${e.kanalId}`;
    const neuKeys = new Set(geplant.map(schluessel));
    const zusammen = [...bisher.filter((e) => !neuKeys.has(schluessel(e))), ...geplant];

    await fs.writeFile(ablage, JSON.stringify(zusammen, null, 2));
    console.log(
      `\n${geplant.length} Beiträge geplant. Übersicht in ${ablage}` +
        (zusammen.length > geplant.length
          ? ` (${zusammen.length - geplant.length} frühere Einträge bleiben stehen)`
          : ''),
    );
  } else {
    console.log(`\nProbelauf beendet. Mit --wirklich würden ${shorts.length * kanaele.length} Beiträge angelegt.`);
  }
};

main().catch((fehler) => {
  console.error('\nFehlgeschlagen:', fehler.message);
  process.exit(1);
});
