import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { WOCHENLAUF } from '../daten/entwuerfe';
import { ZEICHEN_PRO_SEKUNDE, geschaetzteDauerSek, szenendauerAus, zielfenster } from '../src/zeit';

const ausfuehren = promisify(execFile);

/**
 * Sprechprobe — die Laengenpruefung, die nichts kostet.
 *
 * Die Laengenschaetzung in `src/zeit.ts` rechnet mit 15 Zeichen je Sekunde.
 * Die Zahl war bis zum 13.08.2026 nie an gesprochener Sprache geprueft; sie
 * war eine Annahme. Steht sie zu hoch, sind alle Shorts in Wahrheit laenger
 * als das Zielfenster — und das faellt erst auf, **nachdem** ElevenLabs
 * abgerechnet hat.
 *
 * Genau da liegt der teure Punkt: Ein Wochenlauf kostet rund 6.300 Zeichen.
 * Wer nach der Vertonung merkt, dass drei Shorts zu lang sind, kuerzt und
 * zahlt sie ein zweites Mal.
 *
 * Diese Probe laeuft ueber `say`, die Sprachausgabe von macOS. Sie klingt
 * nicht wie ElevenLabs und soll es nicht — gemessen wird das Sprechtempo
 * einer deutschen Stimme bei normaler Betonung, und das ist die Groesse, um
 * die es geht. Fuer die Endabnahme bleibt die echte Tonspur zustaendig.
 *
 * Aufruf: npm run sprechprobe
 */

/** Deutsche Systemstimme. `say -v '?'` listet die installierten auf. */
const STIMME = 'Anna';

const sprechdauer = async (text: string, datei: string): Promise<number> => {
  // Ohne `--data-format`: die Voreinstellung schreibt AIFF, jede andere
  // Angabe lehnt `say` je nach Dateiendung mit „Opening output file failed" ab.
  await ausfuehren('say', ['-v', STIMME, '-o', datei, text]);
  const { stdout } = await ausfuehren('afinfo', [datei]);
  const treffer = /estimated duration: ([\d.]+)/.exec(stdout);
  if (!treffer) throw new Error(`Dauer von ${datei} nicht lesbar.`);
  return Number(treffer[1]);
};

const main = async () => {
  const ordner = await fs.mkdtemp(path.join(os.tmpdir(), 'setupklar-sprechprobe-'));
  console.log(`SetupKlar · Sprechprobe (Systemstimme ${STIMME}, kostet kein Kontingent)\n`);

  let zeichen = 0;
  let sekunden = 0;
  let ausserhalb = 0;

  try {
    for (const short of WOCHENLAUF) {
      /*
       * Szenenweise messen, nicht am Stueck.
       *
       * Der erste Anlauf las alle Sprechtexte in einem Rutsch vor und lag
       * deshalb systematisch zu niedrig: Er unterschlug die Atempause nach
       * jeder Szene und die Mindestdauern aus `src/zeit.ts` — ein Bild, das
       * fuenf Sekunden stehen muss, steht auch dann fuenf Sekunden, wenn der
       * Satz darueber in dreien gesprochen ist.
       *
       * Gemessen wird also nur die Sprechdauer; alles, was die Zeitrechnung
       * darum herum baut, kommt aus derselben Funktion wie beim Rendern.
       */
      let gemessen = 0;
      let gesprochen = 0;
      for (const [i, szene] of short.szenen.entries()) {
        const roh = await sprechdauer(szene.sprechtext, path.join(ordner, `${short.id}-${i}.aiff`));
        gesprochen += roh;
        gemessen += szenendauerAus(szene.art, roh);
        zeichen += szene.sprechtext.length;
      }
      sekunden += gesprochen;

      const geschaetzt = geschaetzteDauerSek(short);
      const [min, max] = zielfenster(short);

      const drin = gemessen >= min && gemessen <= max;
      if (!drin) ausserhalb++;
      console.log(
        `  ${drin ? '✓' : '·'} ${short.id.padEnd(12)} ${short.rubrik.padEnd(13)}` +
          ` gemessen ${gemessen.toFixed(1).padStart(5)}s` +
          `  geschätzt ${geschaetzt.toFixed(1).padStart(5)}s` +
          `  Ziel ${min}–${max}s`,
      );
    }
  } finally {
    await fs.rm(ordner, { recursive: true, force: true });
  }

  const tempo = zeichen / sekunden;
  console.log(
    `\n  Sprechtempo gemessen: ${tempo.toFixed(1)} Zeichen/s` +
      ` — die Formel rechnet mit ${ZEICHEN_PRO_SEKUNDE.toFixed(1).replace('.', ',')}`,
  );
  if (Math.abs(tempo - ZEICHEN_PRO_SEKUNDE) > 1.5) {
    console.log(`  Die Formel in src/zeit.ts (ZEICHEN_PRO_SEKUNDE) weicht deutlich ab.`);
  }
  if (ausserhalb > 0) {
    console.log(`  ${ausserhalb} Short(s) außerhalb des Zielfensters — vor der Vertonung nachbessern.`);
  }
};

main().catch((fehler) => {
  console.error('\nFehlgeschlagen:', fehler.message);
  process.exit(1);
});
