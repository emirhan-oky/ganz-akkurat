import { ALLE_ENTWUERFE } from '../daten/entwuerfe/index.js';
import { KALTSTART_ARTEN } from '../src/typen.js';
const kuerzel = (s: string) => (s === 'zeiger' ? 'W' : 'V');
for (const id of process.argv.slice(2)) {
  const short = ALLE_ENTWUERFE.find((s) => s.id === id);
  if (!short) { console.error(`? ${id}`); continue; }
  const art = KALTSTART_ARTEN.find((a) => a.schluessel === short.kaltstart.art)!;
  console.log(`## ${short.id}\n`);
  console.log(`\`${short.format}\` · Kaltstart ${art.wer === 'zeiger' ? 'Watti' : 'Volti'}  `);
  console.log(`Quelle: ${short.quellenIds.map((q) => `\`${q}\``).join(', ')}\n`);
  console.log('```');
  console.log(`${kuerzel(art.wer)}: ${short.kaltstart.satz}`);
  console.log(`   Heutiges Thema: ${short.vorspann}`);
  for (const szene of short.szenen) {
    for (const r of szene.rede ?? []) console.log(`${kuerzel(r.sprecher)}: ${r.text}`);
    if (szene.art === 'zitatkarte') console.log(`   [Zitatkarte] ${szene.zitat}`);
  }
  console.log('```\n');
}
