import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { hochladen, loeschen, oeffentlichErreichbar, zugangAusUmgebung } from '../src/ablage';
import {
  beitragLoeschen,
  beitragPlanen,
  beitragstext,
  beitragstitel,
  kanaeleLesen,
  organisationErmitteln,
} from '../src/buffer';
import { WOCHENLAUF } from '../daten/entwuerfe';

/**
 * Rauchtest der Veroeffentlichungskette.
 *
 * Legt auf jedem verbundenen Kanal einen Beitrag an, prueft dass Buffer ihn
 * annimmt, und loescht ihn sofort wieder. Danach verschwindet auch das
 * hochgeladene Video.
 *
 * Der Zweck: Ob Buffer eine Video-URL aus der eigenen Ablage akzeptiert,
 * laesst sich nicht simulieren — die Schnittstelle laedt die Datei beim
 * Anlegen. Dieser Test ist der einzige Weg, das Glied zu pruefen, ohne
 * einen echten Wochenlauf zu verbrennen.
 *
 * Alle Beitraege werden weit in der Zukunft terminiert. Selbst wenn das
 * Aufraeumen fehlschlaegt, veroeffentlicht nichts von allein.
 *
 * Aufruf: npm run buffer-probe
 */

const ENDPUNKT = 'https://api.buffer.com/graphql';

/** Weit genug weg, dass ein misslungenes Aufraeumen folgenlos bleibt. */
const TERMIN = new Date('2027-12-24T12:00:00Z');

/**
 * Das neueste gerenderte Video zu diesem Short.
 *
 * Hier stand bis zum 13.08.2026 ein fester Pfad auf `laeufe/2026-08-11`. Den
 * Ordner gab es da laengst nicht mehr — `laeufe/` steht in `.gitignore` und
 * wird beim Aufraeumen geleert. Der Rauchtest waere also an der fehlenden
 * Datei gescheitert und nicht an dem, was er pruefen soll.
 *
 * Fuer den Rauchtest genuegt ein stumm gerendertes Video: Es wird sofort
 * wieder geloescht, und geprueft wird die Kette, nicht der Inhalt.
 */
const neuestesVideo = async (shortId: string): Promise<string> => {
  const laeufe = await fs.readdir('laeufe').catch(() => [] as string[]);
  for (const lauf of laeufe.sort().reverse()) {
    const pfad = path.join('laeufe', lauf, 'videos', `${shortId}.mp4`);
    if (await fs.stat(pfad).then(() => true, () => false)) return pfad;
  }
  throw new Error(`Kein gerendertes Video fuer ${shortId} in laeufe/. Erst \`npm run lauf\` ausfuehren.`);
};

const anfragen = async <T>(schluessel: string, query: string, variables: unknown): Promise<T> => {
  const a = await fetch(ENDPUNKT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${schluessel}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const d = (await a.json()) as { data?: T; errors?: { message: string }[] };
  if (d.errors?.length) throw new Error(d.errors.map((f) => f.message).join('; '));
  if (!d.data) throw new Error('Keine Daten.');
  return d.data;
};

const main = async () => {
  const schluessel = process.env.BUFFER_ACCESS_TOKEN;
  if (!schluessel) throw new Error('BUFFER_ACCESS_TOKEN fehlt in .env');

  const short = WOCHENLAUF[0]!;
  const zugang = zugangAusUmgebung();
  const zielpfad = `probe/${short.id}.mp4`;
  const lokal = await neuestesVideo(short.id);
  const angelegt: string[] = [];

  console.log('SetupKlar · Rauchtest der Veröffentlichung\n');

  try {
    /* 1 — Video ablegen */
    console.log('1  Video ablegen');
    const videoUrl = await hochladen(zugang, lokal, zielpfad);
    if (!(await oeffentlichErreichbar(videoUrl))) throw new Error(`${videoUrl} ist nicht abrufbar.`);
    console.log(`   ${videoUrl}\n`);

    /* 2 — Kanaele */
    const organisation = await organisationErmitteln(schluessel);
    const kanaele = (await kanaeleLesen(schluessel, organisation)).filter((k) => !k.isDisconnected);

    /* 3 — Beitrag je Kanal */
    console.log(`2  Beiträge anlegen (Termin ${TERMIN.toLocaleDateString('de-DE')})`);
    for (const kanal of kanaele) {
      const text = beitragstext(short, kanal.service);
      if (!text) {
        console.log(`   · ${kanal.service.padEnd(11)} kein Text hinterlegt`);
        continue;
      }
      try {
        const id = await beitragPlanen(schluessel, {
          kanalId: kanal.id,
          dienst: kanal.service,
          text,
          videoUrl,
          titel: beitragstitel(short, kanal.service) ?? short.texte.youtube.titel,
          kiStimme: short.kennzeichnung.kiStimme,
          faelligAm: TERMIN,
        });
        angelegt.push(id);
        console.log(`   ✓ ${kanal.service.padEnd(11)} angenommen`);
      } catch (f) {
        console.log(`   ✕ ${kanal.service.padEnd(11)} ${(f as Error).message.slice(0, 150)}`);
      }
    }
  } finally {
    /* 4 — Aufraeumen, auch wenn oben etwas schiefging */
    console.log('\n3  Aufräumen');
    for (const id of angelegt) {
      try {
        await beitragLoeschen(schluessel, id);
        console.log(`   ✓ Beitrag ${id} gelöscht`);
      } catch (f) {
        console.log(`   ✕ Beitrag ${id} NICHT gelöscht – bitte in Buffer von Hand entfernen (${(f as Error).message.slice(0, 80)})`);
      }
    }
    await loeschen(zugang, zielpfad).catch(() => console.log('   ✕ Video in R2 nicht gelöscht'));
    console.log('   ✓ Video aus der Ablage entfernt');
  }
};

main().catch((f) => {
  console.error('\nFehlgeschlagen:', f.message);
  process.exit(1);
});
