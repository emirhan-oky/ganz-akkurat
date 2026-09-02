import fs from 'node:fs/promises';
import { Quelle, Short } from '../src/typen';
import { belegansichtBauen } from '../src/belegansicht';
import { ALLE_ENTWUERFE } from '../daten/entwuerfe';

/**
 * `npm run belege` — die Folgerungen lesen, bevor sie Geld kosten.
 *
 * Der Platz in der Kette ist der Punkt: **vor** `npm run lauf --mit-ton`.
 * Was hier auffaellt, kostet einen Absatz; was in der Freigabe auffaellt,
 * kostet einen ganzen Lauf.
 *
 * Das Skript urteilt nicht und kann es nicht. Es stellt nebeneinander und
 * zaehlt, was zu lesen ist.
 */

const ZIEL = 'belege.html';

const main = async () => {
  const shorts: Short[] = [];
  for (const entwurf of ALLE_ENTWUERFE) {
    const ergebnis = Short.safeParse(entwurf);
    if (!ergebnis.success) {
      console.error(`✕ ${entwurf.id}: entspricht nicht dem Schema – erst \`npm run pruefen\`.`);
      process.exit(1);
    }
    shorts.push(ergebnis.data);
  }

  const roh = JSON.parse(await fs.readFile('daten/quellen.json', 'utf8')) as { quellen: unknown[] };
  const quellen = roh.quellen.map((q) => Quelle.parse(q));

  await fs.writeFile(ZIEL, belegansichtBauen(shorts, quellen));

  /*
   * Gezaehlt wird, was **zu lesen** ist: ein Paar je Szene, die sich an eine
   * Fundstelle gebunden hat.
   *
   * Bis zum 17.08.2026 zaehlte diese Stelle alle Zitate der genannten Quelle,
   * und zwar je Szene erneut — acht Shorts ergaben 82 Paare, obwohl es nur
   * dreissig Behauptungen gab. Die Zahl war nicht bloss falsch, sie war das
   * Symptom: Eine Szene hing an einer Quelle und damit an allem, was darin
   * stand.
   */
  const belege = shorts.reduce(
    (n, s) => n + s.szenen.filter((z) => (z as { belegId?: string }).belegId).length,
    0,
  );

  const beteiligt = shorts.filter((s) =>
    s.quellenIds
      .map((id) => quellen.find((q) => q.id === id))
      .every((q) => q && (q.art === 'hersteller' || q.art === 'plattform')),
  );

  console.log(`Ganz akkurat · Belegansicht`);
  console.log(`   ${shorts.length} Shorts, ${belege} Behauptung-Zitat-Paare zu lesen`);
  if (beteiligt.length > 0) {
    console.log(`   ✕ ${beteiligt.length} Short(s) nur von beteiligten Quellen getragen`);
  }
  console.log('');
  console.log(`   ${ZIEL}`);
  console.log('');
  console.log('Die Frage beim Lesen: Trägt das Zitat den Satz – und ist der Zitierende');
  console.log('die richtige Instanz, um ihn zu sagen?');
};

main().catch((fehler) => {
  console.error('\nFehlgeschlagen:', fehler.message);
  process.exit(1);
});
