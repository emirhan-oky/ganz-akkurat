import { Idee, Short } from '../src/typen';
import { beispielShort } from '../daten/beispiel-short';
import { GEPARKT, WOCHENLAUF } from '../daten/entwuerfe';
import { IDEEN, reichweiteInWochen } from '../daten/ideen';

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

if (fehler > 0) {
  console.error(`\n${fehler === 1 ? 'Ein Short entspricht' : `${fehler} Shorts entsprechen`} dem Schema nicht.`);
  process.exit(1);
}

const belegt = IDEEN.filter((i) => i.reifegrad === 'belegt').length;
const produziert = IDEEN.filter((i) => i.reifegrad === 'produziert').length;

console.log(`✓ Schema: ${gesamt} Shorts geprüft, keine blockierenden Verstöße`);
console.log(
  `✓ Ideen:  ${IDEEN.length} im Vorrat (${belegt} belegt, ${produziert} produziert), ` +
    `Reichweite ${reichweiteInWochen()} Wochen bei einem Video je Format`,
);
