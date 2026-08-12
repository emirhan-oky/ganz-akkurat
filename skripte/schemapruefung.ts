import { Short } from '../src/typen';
import { beispielShort } from '../daten/beispiel-short';
import { dockKeinBild } from '../daten/entwuerfe/dock-kein-bild';
import { powerbankFlug } from '../daten/entwuerfe/powerbank-flug';

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
 * Geparkte Entwuerfe blockieren nicht.
 *
 * `powerbank-flug` traegt bis heute eine einzige Quelle und steht deshalb
 * nicht im Wochenlauf. Wuerde es die Pruefung rot faerben, waere sie dauerhaft
 * rot — und eine Pruefung, die immer fehlschlaegt, liest bald niemand mehr.
 * Solche Entwuerfe erscheinen als Hinweis und aendern den Exit-Code nicht.
 */
type Pruefling = { name: string; daten: unknown[]; blockierend: boolean };

const PRUEFLINGE: Pruefling[] = [
  { name: 'Referenz-Short (Standard-Prop der Komposition)', daten: [beispielShort], blockierend: true },
  { name: 'dock-kein-bild (im Wochenlauf)', daten: dockKeinBild, blockierend: true },
  { name: 'powerbank-flug (geparkt)', daten: powerbankFlug, blockierend: false },
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
