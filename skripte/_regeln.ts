import { readFileSync } from 'node:fs';
import { GEPARKT, WOCHENLAUF } from '../daten/entwuerfe/index.js';
import { shortPruefen } from '../src/pruefung.js';
const roh = JSON.parse(readFileSync('daten/quellen.json', 'utf8'));
const quellen = Array.isArray(roh) ? roh : (roh.quellen ?? []);
const z = new Map<string, number>();
let fehler = 0;
for (const s of [...GEPARKT, ...WOCHENLAUF]) {
  for (const x of shortPruefen(s, quellen)) {
    z.set(`${x.stufe} ${x.regel}`, (z.get(`${x.stufe} ${x.regel}`) ?? 0) + 1);
    if (x.stufe === 'fehler') { fehler++; console.log(`FEHLER ${s.id} · ${x.regel} · ${x.text.slice(0, 120)}`); }
  }
}
console.log('');
for (const [r, n] of [...z].sort((a, b) => b[1] - a[1])) console.log(`${String(n).padStart(3)}×  ${r}`);
console.log(`\n${fehler} Fehler über 14 Shorts`);
