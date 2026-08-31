import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { WOCHENLAUF } from '../daten/entwuerfe';
import { FORMAT, SPIELFLAECHE, VORHANG } from '../src/marke';
import { szenenZeitplan } from '../src/zeit';
import type { Short } from '../src/typen';

/**
 * Welche Szene den Gefaellt-mir-Zeiger traegt.
 *
 * **Abgeschrieben aus `video/Short.tsx:91`, und das ist hier vertretbar:** Der
 * Renderer darf von einem Pruefskript nichts wissen, und eine Komponente aus
 * `video/` in ein Node-Skript zu ziehen, holt die halbe Remotion-Laufzeit mit.
 * Laeuft die Regel dort auseinander, meldet diese Probe hoechstens einmal zu
 * viel — sie wird nie still falsch.
 */
const hinweisSzene = (short: Short): number | null => {
  for (let i = short.szenen.length - 2; i >= 1; i -= 1) {
    const szene = short.szenen[i]!;
    const buehne = 'buehne' in szene ? szene.buehne : undefined;
    if (buehne === undefined || buehne.art !== 'figur' || buehne.requisite === undefined) return i;
  }
  return null;
};

const ausfuehren = promisify(execFile);

/**
 * Steht alles im Bild, was im Bild stehen soll?
 *
 * ## Warum es diese Probe gibt
 *
 * Am 31.08.2026 lag Voltis linke Hand im fertigen Video bei x = 101, die
 * Vorhangkante bei 100. Gefunden wurde das vom Zuschauer, nicht von der
 * Pruefung — und der Weg dorthin war lang: Drei Erklaerungen lagen daneben,
 * bevor farbige Rahmen im Standbild zeigten, dass der Kasten um die Figur
 * **856 Pixel** breit war, wo die Buehne 719 hat.
 *
 * Die Ursache war eine Flexbox-Regel (`min-width: auto` auf einem Kasten, dessen
 * SVG aus seiner Hoehe eine Mindestbreite ableitet), und sie ist behoben. Diese
 * Probe prueft nicht die Ursache, sondern **das Ergebnis** — genau deshalb
 * faengt sie auch die naechste, die niemand vorhersieht.
 *
 * ## Warum an mehreren Bildern je Szene
 *
 * Der Ueberstand **wuchs mit der Zeit**: 58 Pixel am Szenenanfang, 70 am Ende.
 * Ein einzelnes Standbild haette ihn um ein Drittel unterschaetzt oder ganz
 * verfehlt. Geprueft werden deshalb Anfang, Mitte und Ende jeder Szene.
 *
 * ## Was gemessen wird
 *
 * Die Figuren sind fast schwarz und leicht blaeulich, der Vorhang ist
 * dunkelrot. Beides ist dunkel, aber nur eines ist neutral — daran lassen sie
 * sich trennen, ohne dass die Probe wissen muss, wo eine Figur steht.
 */

const SCHWELLE = { hell: 60, blau: 75, buntheit: 25 } as const;

type Bild = { breite: number; hoehe: number; kanaele: number; zeilen: Buffer[] };

/** Liest ein PNG ohne fremde Bibliothek: entpacken und die Filter zuruecknehmen. */
const pngLesen = (roh: Buffer): Bild => {
  let i = 8;
  let breite = 0;
  let hoehe = 0;
  let farbtyp = 6;
  const teile: Buffer[] = [];

  while (i < roh.length) {
    const laenge = roh.readUInt32BE(i);
    const typ = roh.subarray(i + 4, i + 8).toString('latin1');
    const daten = roh.subarray(i + 8, i + 8 + laenge);
    if (typ === 'IHDR') {
      breite = daten.readUInt32BE(0);
      hoehe = daten.readUInt32BE(4);
      farbtyp = daten[9]!;
    } else if (typ === 'IDAT') {
      teile.push(daten);
    }
    i += 12 + laenge;
  }

  const kanaele = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[farbtyp] ?? 3;
  const entpackt = zlib.inflateSync(Buffer.concat(teile));
  const breiteBytes = breite * kanaele;
  const zeilen: Buffer[] = [];
  let vorige = Buffer.alloc(breiteBytes);
  let pos = 0;

  for (let y = 0; y < hoehe; y += 1) {
    const filter = entpackt[pos]!;
    pos += 1;
    const zeile = Buffer.from(entpackt.subarray(pos, pos + breiteBytes));
    pos += breiteBytes;
    for (let x = 0; x < breiteBytes; x += 1) {
      const a = x >= kanaele ? zeile[x - kanaele]! : 0;
      const b = vorige[x]!;
      const c = x >= kanaele ? vorige[x - kanaele]! : 0;
      if (filter === 1) zeile[x] = (zeile[x]! + a) & 255;
      else if (filter === 2) zeile[x] = (zeile[x]! + b) & 255;
      else if (filter === 3) zeile[x] = (zeile[x]! + ((a + b) >> 1)) & 255;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        zeile[x] = (zeile[x]! + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255;
      }
    }
    zeilen.push(zeile);
    vorige = zeile;
  }

  return { breite, hoehe, kanaele, zeilen };
};

/** Die aeusserste Spalte links und rechts, in der eine Figur steht. */
const figurenrand = (bild: Bild): { links: number; rechts: number } | null => {
  let links = bild.breite;
  let rechts = -1;
  for (let y = 0; y < bild.hoehe; y += 1) {
    const zeile = bild.zeilen[y]!;
    for (let x = 0; x < bild.breite; x += 1) {
      const p = x * bild.kanaele;
      const r = zeile[p]!;
      const g = zeile[p + 1]!;
      const b = zeile[p + 2]!;
      const dunkel = r < SCHWELLE.hell && g < SCHWELLE.hell && b < SCHWELLE.blau;
      const neutral = b >= r && Math.abs(r - g) < SCHWELLE.buntheit;
      if (dunkel && neutral) {
        if (x < links) links = x;
        if (x > rechts) rechts = x;
      }
    }
  }
  return rechts < 0 ? null : { links, rechts };
};

const main = async () => {
  console.log('\nGanz akkurat · Bildrand (kein Kontingent, nur Renderzeit)\n');
  console.log(
    `  Spielfläche ${SPIELFLAECHE.links}–${SPIELFLAECHE.rechts} px, ` +
      `Vorhangkanten ${VORHANG.rand} / ${FORMAT.breite - VORHANG.rand}\n`,
  );

  const ordner = await fs.mkdtemp(path.join(os.tmpdir(), 'ganzakkurat-rand-'));
  let befunde = 0;
  let geprueft = 0;

  try {
    for (const short of WOCHENLAUF as Short[]) {
      const props = path.join(ordner, `${short.id}.json`);
      /*
       * **Die Probe braucht eine Tonspur-Attrappe, sonst prueft sie das
       * falsche Layout.** `Sprecherstand` haelt einen Short ohne `abschnitte`
       * fuer einstimmig, und dann reserviert `Buehne` unten 270 Pixel fuer den
       * Untertitel. Die Buehne ist damit niedriger, die Figuren sind kleiner —
       * und eine Probe, die kleinere Figuren misst, kann nicht sehen, dass die
       * grossen herausragen. Sie waere genau dort still, wo sie gebraucht wird.
       *
       * Nur `abschnitte` zaehlen; `woerter` bleibt leer, weil der Lippensync
       * die Umrisse nicht veraendert. Die Sprecher wechseln je Szene, damit
       * beide Figuren einmal mit voller Sprechstaerke gemessen werden —
       * `HINLEHNEN` neigt sie, und geneigt reichen sie weiter.
       */
      const roh = szenenZeitplan(short);
      const letzte = roh[roh.length - 1]!;
      const mitTon: Short = {
        ...short,
        tonspur: {
          datei: '',
          dauerSek: (letzte.startBild + letzte.dauerBilder) / 30,
          woerter: [],
          szenenStartSek: roh.map((p) => p.startBild / 30),
          abschnitte: roh.map((p, i) => ({
            datei: '',
            sprecher: i % 2 === 0 ? ('nachleser' as const) : ('zeiger' as const),
            startSek: p.startBild / 30,
          })),
        },
      };
      await fs.writeFile(props, JSON.stringify({ daten: mitTon, dienst: 'tiktok' }));
      /*
       * **Der Zeitplan kommt aus dem Short mit Attrappe, nicht ohne.** Mit
       * Tonspur rechnet `szenenZeitplan` die Laengen aus den Startsekunden
       * statt aus der Zeichenzahl; die Komposition wurde dadurch acht Bilder
       * kuerzer, und die Probe forderte ein Bild hinter dem Ende an. Der
       * Renderer hat es gemeldet — beide Zahlen muessen aus derselben Quelle
       * kommen, sonst prueft die Probe ein anderes Video als sie rendert.
       */
      const plan = szenenZeitplan(mitTon);

      for (const [i, szene] of plan.entries()) {
        /*
         * Anfang, Mitte, Ende — weil der gefundene Ueberstand mit der Szene
         * wuchs. Der erste Frame einer Szene ist zudem der einzige, in dem eine
         * Einblendung noch nicht steht; wer nur ihn prueft, misst das Nichts.
         */
        for (const anteil of [0.05, 0.5, 0.95]) {
          const bild = szene.startBild + Math.floor(szene.dauerBilder * anteil);
          const ziel = path.join(ordner, `${short.id}-${i}-${anteil}.png`);
          await ausfuehren('npx', [
            'remotion', 'still', 'video/index.ts', 'Short', ziel,
            `--frame=${bild}`, `--props=${props}`, '--log=error',
          ]);
          const rand = figurenrand(pngLesen(await fs.readFile(ziel)));
          await fs.rm(ziel, { force: true });
          if (!rand) continue;
          geprueft += 1;

          /*
           * **Der Gefaellt-mir-Zeiger steht mit Absicht ausserhalb.**
           *
           * Er tritt in der letzten Szene ohne Requisite halb von rechts ins
           * Bild und zeigt auf den Folgen-Knopf der App — das ist der ganze
           * Zweck, und der Vertrag nennt ihn „eine Richtung, kein Zielen".
           * Beim ersten Lauf dieser Probe hat er in allen vier Shorts gemeldet.
           *
           * Ihn generell zu ignorieren waere falsch: In dieser Szene steht auch
           * die eigentliche Figur, und die soll nicht herausragen. Deshalb wird
           * dort nur die **linke** Kante geprueft — der Zeiger kommt bei
           * `tiktok`, dem Dienst dieser Probe, von rechts.
           */
          const zeigerszene = i === hinweisSzene(short);
          const zuWeitRechts = !zeigerszene && rand.rechts > SPIELFLAECHE.rechts;

          if (rand.links < SPIELFLAECHE.links || zuWeitRechts) {
            befunde += 1;
            console.log(
              `  ✕ ${short.id} Szene ${i + 1}, Bild ${bild}: Figur reicht von ` +
                `${rand.links} bis ${rand.rechts} — erlaubt ist ` +
                `${SPIELFLAECHE.links} bis ${SPIELFLAECHE.rechts}.`,
            );
          }
        }
      }
      console.log(`  ${befunde === 0 ? '✓' : '·'} ${short.id}`);
    }
  } finally {
    await fs.rm(ordner, { recursive: true, force: true });
  }

  console.log(
    befunde === 0
      ? `\n✓ ${geprueft} Standbilder, nichts ragt in den Vorhang.\n`
      : `\n✕ ${befunde} von ${geprueft} Standbildern ragen über die Spielfläche.\n`,
  );
  process.exitCode = befunde === 0 ? 0 : 1;
};

void main();
