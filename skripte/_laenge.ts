import { ALLE_ENTWUERFE } from '../daten/entwuerfe/index.js';
import { geschaetzteDauerSek, zielfenster } from '../src/zeit.js';
const [u, o] = zielfenster();
for (const s of ALLE_ENTWUERFE.slice(-4)) {
  const d = geschaetzteDauerSek(s);
  console.log(`${d < u || d > o ? '✕' : '✓'} ${d.toFixed(1).padStart(5)} s  ${s.id}`);
}
