import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { WOCHENLAUF } from '../daten/entwuerfe';
import type { Szene } from '../src/typen';
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
 * nicht wie ElevenLabs und soll es nicht. Fuer die Endabnahme bleibt die echte
 * Tonspur zustaendig.
 *
 * **Was sie misst, ist nicht das Tempo, sondern der Text.** Die Formel in
 * `src/zeit.ts` zaehlt Zeichen; gesprochen werden aber Silben. „240" sind drei
 * Zeichen und vier Silben, „USB-C" fuenf Zeichen und drei — eine Szene voller
 * Zahlen dauert laenger, als ihre Laenge verraet. Genau diesen Unterschied
 * sieht `say` und die Formel nicht.
 *
 * Das **absolute** Tempo der Systemstimme ist dagegen wertlos: Anna spricht
 * langsamer als Lenny, und vierzehn geprobte deutsche Stimmen lagen zwischen
 * 12,2 und 20,1 Zeichen je Sekunde. Bis zum 16.08.2026 stellte die Probe
 * Annas Tempo neben `ZEICHEN_PRO_SEKUNDE` und meldete „weicht deutlich ab" —
 * ein Fehlalarm, der genau die falsche Reaktion nahelegt: die Konstante von
 * der Produktionsstimme wegzudrehen. Die gemessenen Dauern werden deshalb auf
 * das Tempo der Produktionsstimme umgerechnet, bevor sie am Zielfenster
 * gemessen werden.
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

/** Was eine Szene beigetragen hat — roh gemessen, noch nicht umgerechnet. */
type Probe = { id: string; format: string; art: Szene['art']; roh: number; zeichen: number };

const main = async () => {
  const ordner = await fs.mkdtemp(path.join(os.tmpdir(), 'ganzakkurat-sprechprobe-'));
  console.log(`Ganz akkurat · Sprechprobe (Systemstimme ${STIMME}, kostet kein Kontingent)\n`);

  let zeichen = 0;
  let sekunden = 0;
  let ausserhalb = 0;
  const proben: Probe[] = [];

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
      for (const [i, szene] of short.szenen.entries()) {
        const roh = await sprechdauer(szene.sprechtext, path.join(ordner, `${short.id}-${i}.aiff`));
        proben.push({
          id: short.id,
          format: short.format,
          art: szene.art,
          roh,
          zeichen: szene.sprechtext.length,
        });
        sekunden += roh;
        zeichen += szene.sprechtext.length;
      }
    }
  } finally {
    await fs.rm(ordner, { recursive: true, force: true });
  }

  /*
   * Der Umrechnungsfaktor zwischen Messstimme und Produktionsstimme.
   *
   * Er faellt aus der Messung selbst: Beide Stimmen sprechen denselben Text,
   * also verhalten sich ihre Dauern wie ihre Tempi umgekehrt. Was uebrig
   * bleibt, nachdem der Faktor draussen ist, ist genau die Groesse, wegen der
   * es die Probe gibt — dass Zahlwoerter und Abkuerzungen laenger dauern, als
   * ihre Zeichenzahl sagt.
   */
  const tempo = zeichen / sekunden;
  const faktor = tempo / ZEICHEN_PRO_SEKUNDE;
  const [min, max] = zielfenster();

  for (const short of WOCHENLAUF) {
    const meine = proben.filter((p) => p.id === short.id);
    const erwartet = meine.reduce((summe, p) => summe + szenendauerAus(p.art, p.roh * faktor), 0);
    const geschaetzt = geschaetzteDauerSek(short);

    const drin = erwartet >= min && erwartet <= max;
    if (!drin) ausserhalb++;
    console.log(
      `  ${drin ? '✓' : '·'} ${short.id.padEnd(12)} ${short.format.padEnd(20)}` +
        ` erwartet ${erwartet.toFixed(1).padStart(5)}s` +
        `  Formel ${geschaetzt.toFixed(1).padStart(5)}s` +
        `  Ziel ${min}–${max}s`,
    );
  }

  const komma = (n: number) => n.toFixed(1).replace('.', ',');
  console.log(
    `\n  ${STIMME} spricht ${komma(tempo)} Zeichen/s, die Produktionsstimme ${komma(ZEICHEN_PRO_SEKUNDE)}` +
      ` — gemessen wurde mit Faktor ${faktor.toFixed(2).replace('.', ',')} umgerechnet.`,
  );
  /*
   * Verglichen wird die umgerechnete Dauer mit der Formel, nie das Tempo mit
   * der Konstante: Weicht „erwartet" von „Formel" ab, liegt es am Text —
   * Zahlen, Abkuerzungen, Komposita. Die Konstante bleibt davon unberuehrt.
   */
  const spreizung = WOCHENLAUF.map((short) => {
    const erwartet = proben
      .filter((p) => p.id === short.id)
      .reduce((summe, p) => summe + szenendauerAus(p.art, p.roh * faktor), 0);
    return Math.abs(erwartet - geschaetzteDauerSek(short));
  });
  const groesste = Math.max(...spreizung);
  if (groesste > 2) {
    console.log(
      `  Bis zu ${komma(groesste)}s Unterschied zur Formel — dort steckt mehr Ansage im Text,` +
        ` als seine Zeichenzahl verrät.`,
    );
  }
  if (ausserhalb > 0) {
    console.log(`  ${ausserhalb} Short(s) außerhalb des Zielfensters — vor der Vertonung nachbessern.`);
  }
};

main().catch((fehler) => {
  console.error('\nFehlgeschlagen:', fehler.message);
  process.exit(1);
});
