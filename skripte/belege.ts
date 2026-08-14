import fs from 'node:fs/promises';
import { Quelle, Short } from '../src/typen';
import { belegansichtBauen } from '../src/belegansicht';
import { WOCHENLAUF } from '../daten/entwuerfe';

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
  for (const entwurf of WOCHENLAUF) {
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

  const belege = shorts.reduce((n, s) => {
    const ids = s.szenen.map((z) => (z as { quelleId?: string }).quelleId).filter(Boolean);
    return n + ids.reduce((m, id) => m + (quellen.find((q) => q.id === id)?.belegt.length ?? 0), 0);
  }, 0);

  const beteiligt = shorts.filter((s) =>
    s.quellenIds
      .map((id) => quellen.find((q) => q.id === id))
      .every((q) => q && (q.art === 'hersteller' || q.art === 'plattform')),
  );

  console.log(`SetupKlar · Belegansicht`);
  console.log(`   ${shorts.length} Shorts, ${belege} Zitat-Folgerung-Paare zu lesen`);
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
