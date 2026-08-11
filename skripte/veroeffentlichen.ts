import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Short } from '../src/typen';
import { hochladen, oeffentlichErreichbar, zugangAusUmgebung } from '../src/ablage';
import {
  beitragPlanen,
  beitragstext,
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
  const alle = lauf.shorts.map((s) => Short.parse(s));

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

      const titel = short.texte.youtube.titel;
      const wann = faellig.toLocaleString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

      if (WIRKLICH) {
        const beitragId = await beitragPlanen(schluessel, {
          kanalId: kanal.id,
          text,
          videoUrl,
          titel,
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
