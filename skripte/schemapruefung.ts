import { Short } from '../src/typen';
import { beispielShort } from '../daten/beispiel-short';
import { GEPARKT, WOCHENLAUF } from '../daten/entwuerfe';

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
const fehler = PRUEFLINGE.reduce((n, p) => n + pruefen(p), 0);

if (fehler > 0) {
  console.error(`\n${fehler === 1 ? 'Ein Short entspricht' : `${fehler} Shorts entsprechen`} dem Schema nicht.`);
  process.exit(1);
}

console.log(`✓ Schema: ${gesamt} Shorts geprüft, keine blockierenden Verstöße`);
