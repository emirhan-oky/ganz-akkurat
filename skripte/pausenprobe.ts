import 'dotenv/config';
import { KANAL_STIMME, synthetisieren } from '../src/stimme';

/**
 * Wie lange schweigt die Stimme bei welchem Szenentrenner?
 *
 * Angelegt am 17.08.2026, nachdem die Denkpause des Montags im fertigen Short
 * nur **1,0 Sekunde** lang war statt der geplanten zwei. Der Trenner mit drei
 * Auslassungspunkten wirkt, aber schwaecher als angenommen — und geraten
 * hatten wir ihn, statt ihn zu messen. Dieselbe Geschichte wie bei
 * ZEICHEN_PRO_SEKUNDE.
 *
 * Kostet rund 60 Zeichen Kontingent, also nichts. `npm run pausenprobe`.
 */
const VARIANTEN = [
  { name: '1x', trenner: ' ... ' },
  { name: '3x', trenner: ' ... ... ... ' },
  { name: '6x', trenner: ' ... ... ... ... ... ... ' },
  { name: 'break', trenner: ' <break time="2.5s" /> ' },
];

const schluessel = process.env.ELEVENLABS_API_KEY;
if (!schluessel) throw new Error('ELEVENLABS_API_KEY fehlt in .env');
const stimmeId = process.env.ELEVENLABS_VOICE_ID ?? 'nPczCjzI2devNBz1zQrb';

console.log('\nGanz akkurat · Pausenprobe\n');

for (const v of VARIANTEN) {
  const text = `Eins.${v.trenner}Zwei.`;
  const s = await synthetisieren(text, { stimmeId, ...KANAL_STIMME }, schluessel);
  const w = s.woerter;
  const erstes = w[0];
  const letztes = w[w.length - 1];
  const luecke = w.length >= 2 ? letztes!.startSek - erstes!.endeSek : NaN;
  console.log(
    `  ${v.name.padEnd(6)} ${String(text.length).padStart(3)} Zeichen  ` +
      `Pause ${luecke.toFixed(2)}s  gesamt ${s.dauerSek.toFixed(2)}s  [${w.map((x) => x.wort).join(' | ')}]`,
  );
}
