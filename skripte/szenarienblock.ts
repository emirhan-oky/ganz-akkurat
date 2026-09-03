/**
 * Zieht den Dialogblock eines Entwurfs in der Form, die `daten/szenarien/`
 * zeigt.
 *
 * **Aus dem Entwurf, nicht abgeschrieben.** Der Szenarienordner ist der
 * Beispielvorrat des Schreibskills; eine zweite Fassung desselben Dialogs
 * daneben waere die Doppelung ohne Wache und liefe beim ersten Umbau lautlos
 * auseinander. Am 03.09.2026 ist genau das aufgefallen: Drei Dokumente zeigten
 * noch Dialoge, die eine Woche vorher verworfen worden waren — sie standen
 * nur dort und in keinem Entwurf.
 *
 *   npx tsx skripte/szenarienblock.ts <short-id> [<short-id> ...]
 */
import { ALLE_ENTWUERFE } from '../daten/entwuerfe/index';
import type { Short } from '../src/typen';

const kuerzel = (s: 'zeiger' | 'nachleser') => (s === 'zeiger' ? 'W' : 'V');

const block = (short: Short): string => {
  const zeilen: string[] = [];
  zeilen.push(`W: ${short.kaltstart.satz}`);
  zeilen.push(`   Heutiges Thema: ${short.vorspann}`);
  for (const szene of short.szenen) {
    for (const r of szene.rede ?? []) zeilen.push(`${kuerzel(r.sprecher)}: ${r.text}`);
    if (szene.art === 'zitatkarte') zeilen.push(`   [Zitatkarte] ${szene.zitat}`);
    if (szene.art === 'zahl') zeilen.push(`   [Zahl] ${szene.wert} ${szene.einheit} — ${szene.bedeutung}`);
  }
  const kopf =
    `## ${short.id}\n\n` +
    `\`${short.format}\` · Kaltstart ${short.kaltstart.satz.startsWith('Wie,') ? 'Volti' : 'Watti'}  \n` +
    `Quelle: ${short.quellenIds.map((q) => `\`${q}\``).join(', ')}\n`;
  return `${kopf}\n\`\`\`\n${zeilen.join('\n')}\n\`\`\`\n`;
};

const ids = process.argv.slice(2);
for (const id of ids) {
  const s = ALLE_ENTWUERFE.find((x) => x.id === id);
  if (!s) { console.error(`nicht gefunden: ${id}`); continue; }
  console.log(block(s));
}
