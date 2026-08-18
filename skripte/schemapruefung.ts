import { readFileSync } from 'node:fs';
import { Idee, Short, type Quelle } from '../src/typen';
import { beispielShort } from '../daten/beispiel-short';
import { GEPARKT, WOCHENLAUF } from '../daten/entwuerfe';
import { IDEEN, reichweiteInWochen } from '../daten/ideen';
import { shortPruefen } from '../src/pruefung';

/**
 * Schemapruefung der Daten — die Luecke, die `tsc` nicht schliesst.
 *
 * TypeScript prueft Formen, nicht Werte. Ein Short mit zwei statt drei
 * Quellen typisiert einwandfrei und faellt erst zur Laufzeit durch das
 * Zod-Schema.
 *
 * Das ist besonders teuer beim **Referenz-Short**: Er ist die Standard-Prop
 * der Remotion-Komposition, und `calculateMetadata` parst ihn im
 * Browser-Kontext. Wirft er dort, bleibt Remotion in einem unerfuellten
 * Promise stehen — der Render haengt dann ohne jede Fehlermeldung, bis
 * jemand ihn abbricht. Genau das ist am 12.08.2026 passiert und hat
 * anderthalb Stunden gekostet, bevor die Ursache gefunden war.
 *
 * Deshalb laeuft diese Pruefung vor jedem Lauf mit.
 */

/**
 * Die Prueflinge kommen aus `daten/entwuerfe/index.ts`, nicht aus einer
 * eigenen Liste. Eine eigene Liste hatte diese Pruefung bis zum 13.08.2026,
 * und sie war um zwei Shorts veraltet — gemeldet wurde trotzdem gruen.
 *
 * Geparkte Entwuerfe blockieren nicht: Sie erscheinen als Hinweis und aendern
 * den Exit-Code nicht. Eine Pruefung, die dauerhaft rot ist, liest bald
 * niemand mehr.
 */
type Pruefling = { name: string; daten: unknown[]; blockierend: boolean };

const PRUEFLINGE: Pruefling[] = [
  { name: 'Referenz-Short (Standard-Prop der Komposition)', daten: [beispielShort], blockierend: true },
  { name: 'Wochenlauf', daten: WOCHENLAUF, blockierend: true },
  { name: 'geparkt', daten: GEPARKT, blockierend: false },
];

const pruefen = ({ name, daten, blockierend }: Pruefling): number => {
  let fehler = 0;
  for (const eintrag of daten) {
    const ergebnis = Short.safeParse(eintrag);
    if (ergebnis.success) continue;
    fehler++;
    const id = (eintrag as { id?: string }).id ?? '(ohne id)';
    const melden = blockierend ? console.error : console.warn;
    melden(`${blockierend ? '✕' : '·'} ${name} · ${id}`);
    for (const problem of ergebnis.error.issues) {
      melden(`    ${problem.path.join('.') || '(wurzel)'}: ${problem.message}`);
    }
  }
  return blockierend ? fehler : 0;
};

const gesamt = PRUEFLINGE.reduce((n, p) => n + p.daten.length, 0);
let fehler = PRUEFLINGE.reduce((n, p) => n + pruefen(p), 0);

/*
 * Der Ideenvorrat wird mitgeprueft, blockierend.
 *
 * `tsc` sieht an einer Idee nur die Form, nicht die Regel: dass mindestens
 * eine der genannten Instanzen unbeteiligt sein muss und dass `belegt` drei
 * Quellen verlangt, steht in `Idee.superRefine` — und ein superRefine laeuft
 * nur, wenn jemand parst. Ohne diese Schleife waere es eine tote Regel,
 * derselbe Fall wie beim `Lauf`-Schema.
 */
for (const idee of IDEEN) {
  const ergebnis = Idee.safeParse(idee);
  if (ergebnis.success) continue;
  fehler++;
  console.error(`✕ Ideenvorrat · ${idee.id}`);
  for (const problem of ergebnis.error.issues) {
    console.error(`    ${problem.path.join('.') || '(wurzel)'}: ${problem.message}`);
  }
}

/*
 * Die harten Regeln laufen hier mit — nicht erst im Wochenlauf.
 *
 * Bis zum 18.08.2026 prueften `npm run pruefen` und `shortPruefen` zwei
 * verschiedene Dinge: hier das Zod-Schema, dort die Regeln aus
 * `src/pruefung.ts`. Aufgefallen ist der Unterschied an einem Schlusssatz
 * mit „Schreib es in die Kommentare" — die Regel dagegen meldete ihn
 * zuverlaessig, aber `npm run pruefen` sagte gruen.
 *
 * Das ist derselbe Fehler wie bei `npm run belege`, nur eine Stufe frueher:
 * **Was erst in der Freigabe auffaellt, ist schon vertont und schon
 * gerendert.** Die Regeln kosten hier nichts und finden dort alles, was
 * keine Tonspur braucht; die tonspurabhaengigen Bloecke in `shortPruefen`
 * ueberspringen sich von selbst, solange keine vorliegt.
 */
const quellen = (
  JSON.parse(readFileSync('daten/quellen.json', 'utf8')) as { quellen?: Quelle[] } | Quelle[]
);
const quellenliste = Array.isArray(quellen) ? quellen : (quellen.quellen ?? []);

let hinweise = 0;
for (const eintrag of WOCHENLAUF) {
  for (const befund of shortPruefen(eintrag, quellenliste)) {
    if (befund.stufe === 'fehler') {
      fehler++;
      console.error(`✕ Regel · ${befund.shortId} · [${befund.regel}] ${befund.text}`);
    } else {
      hinweise++;
      console.warn(`· Hinweis · ${befund.shortId} · [${befund.regel}] ${befund.text}`);
    }
  }
}

if (fehler > 0) {
  console.error(`\n${fehler === 1 ? 'Ein Befund haelt' : `${fehler} Befunde halten`} den Lauf zurück.`);
  process.exit(1);
}

const belegt = IDEEN.filter((i) => i.reifegrad === 'belegt').length;
const produziert = IDEEN.filter((i) => i.reifegrad === 'produziert').length;

console.log(
  `✓ Schema: ${gesamt} Shorts geprüft, keine blockierenden Verstöße` +
    (hinweise > 0 ? ` (${hinweise} Hinweis${hinweise === 1 ? '' : 'e'})` : ''),
);
console.log(
  `✓ Ideen:  ${IDEEN.length} im Vorrat (${belegt} belegt, ${produziert} produziert), ` +
    `Reichweite ${reichweiteInWochen()} Wochen bei einem Video je Format`,
);
