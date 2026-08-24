/**
 * Die zwei Marken-Toene: `gefaellt` und `folgen`.
 *
 * **Warum selbst erzeugt und nicht heruntergeladen.** Dieselbe Begruendung wie
 * bei den Zeichnungen: Ein fremder Klang ist ein Lizenzproblem, und der
 * naheliegendste — das Bediengeraeusch der App beim Antippen — ist zugleich
 * ein fremdes Markenzeichen. Es ist nirgends als Datei veroeffentlicht und
 * nicht zum Einbrennen lizenziert. Nachgebaut wird die **Geste**, nicht der
 * Klang der Plattform.
 *
 * **Warum nicht mit ffmpeg.** Die Installation hier traegt 50 Filter; `afade`
 * und `aevalsrc` fehlen. Ein `sine` ohne Huellkurve knackt am Ende, und ein
 * Knacken faellt in einem stillen Video mehr auf als der Ton selbst. Eine WAV
 * von Hand zu schreiben ist ein Dutzend Zeilen und gibt volle Kontrolle.
 *
 * **Warum zwei Toene und nicht einer.** Sie markieren verschiedene Dinge: Der
 * eine sitzt mitten im Video und deutet auf den Like-Knopf, der andere steht
 * am Schluss beim Folgen-Zeichen. Zweimal derselbe Klang liesse den zweiten
 * wie eine Wiederholung des ersten klingen.
 *
 *     npx tsx skripte/toene.ts
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const RATE = 48_000;

/** WAV-Kopf plus 16-Bit-PCM. Kein Paket noetig; das Format ist ein Dutzend Felder. */
const wav = (proben: Float32Array): Buffer => {
  const daten = Buffer.alloc(proben.length * 2);
  for (let i = 0; i < proben.length; i++) {
    const v = Math.max(-1, Math.min(1, proben[i]!));
    daten.writeInt16LE(Math.round(v * 32_767), i * 2);
  }

  const kopf = Buffer.alloc(44);
  kopf.write('RIFF', 0);
  kopf.writeUInt32LE(36 + daten.length, 4);
  kopf.write('WAVE', 8);
  kopf.write('fmt ', 12);
  kopf.writeUInt32LE(16, 16); // Laenge des fmt-Blocks
  kopf.writeUInt16LE(1, 20); // PCM
  kopf.writeUInt16LE(1, 22); // mono
  kopf.writeUInt32LE(RATE, 24);
  kopf.writeUInt32LE(RATE * 2, 28); // Bytes je Sekunde
  kopf.writeUInt16LE(2, 32); // Blockgroesse
  kopf.writeUInt16LE(16, 34); // Bit je Probe
  kopf.write('data', 36);
  kopf.writeUInt32LE(daten.length, 40);

  return Buffer.concat([kopf, daten]);
};

/**
 * Ein Ton aus Grundton und Oktave, mit weicher Huellkurve.
 *
 * Der schnelle Anstieg (4 ms) macht den Anschlag, das lange Abklingen den
 * Charakter. Ohne den Anstieg klickt es, ohne das Abklingen piept es.
 */
const ton = (
  dauerSek: number,
  hz: (t: number) => number,
  opts: { oktave?: number; anstiegSek?: number; abfall?: number } = {},
): Float32Array => {
  const { oktave = 0.28, anstiegSek = 0.004, abfall = 26 } = opts;
  const n = Math.round(dauerSek * RATE);
  const proben = new Float32Array(n);

  let phase = 0;
  let phaseOkt = 0;

  for (let i = 0; i < n; i++) {
    const t = i / RATE;
    const f = hz(t);
    phase += (2 * Math.PI * f) / RATE;
    phaseOkt += (2 * Math.PI * f * 2) / RATE;

    const anstieg = Math.min(1, t / anstiegSek);
    const huelle = anstieg * Math.exp(-abfall * t);

    proben[i] = huelle * (Math.sin(phase) + oktave * Math.sin(phaseOkt)) * 0.42;
  }

  return proben;
};

/** Zwei Toene hintereinander, der zweite versetzt. */
const nacheinander = (teile: { ab: number; proben: Float32Array }[]): Float32Array => {
  const laenge = Math.max(...teile.map((s) => Math.round(s.ab * RATE) + s.proben.length));
  const misch = new Float32Array(laenge);
  for (const { ab, proben } of teile) {
    const versatz = Math.round(ab * RATE);
    for (let i = 0; i < proben.length; i++) {
      misch[versatz + i] = (misch[versatz + i] ?? 0) + proben[i]!;
    }
  }
  return misch;
};

const main = async () => {
  const ordner = path.join('public', 'ton', 'marke');
  await fs.mkdir(ordner, { recursive: true });

  /*
   * **gefaellt** — ein kurzer, heller Pop mit steigender Tonhoehe.
   *
   * Steigend, weil er auf etwas zeigt: Er hebt an, statt abzuschliessen. 130
   * Millisekunden, damit er unter der Stimme durchgeht und nicht ueber ihr
   * steht.
   */
  const gefaellt = ton(0.13, (t) => 660 + 520 * t * 8, { abfall: 34, oktave: 0.22 });

  /*
   * **folgen** — zwei Toene, eine Quinte auseinander, der zweite nach 90 ms.
   *
   * Zwei statt einem, weil der Schluss bestaetigt und nicht hinweist. Die
   * Quinte klingt aufgeloest; eine Sekunde oder Terz klaenge nach Frage.
   */
  const folgen = nacheinander([
    { ab: 0, proben: ton(0.4, () => 587.33, { abfall: 13 }) }, // D5
    { ab: 0.09, proben: ton(0.42, () => 880, { abfall: 11 }) }, // A5
  ]);

  for (const [name, proben] of [
    ['gefaellt', gefaellt],
    ['folgen', folgen],
  ] as const) {
    const ziel = path.join(ordner, `${name}.wav`);
    await fs.writeFile(ziel, wav(proben));
    const kb = (proben.length * 2 + 44) / 1024;
    console.log(`   ${name.padEnd(10)} ${(proben.length / RATE).toFixed(2)}s  ${kb.toFixed(0)} KB  ${ziel}`);
  }
};

console.log('\nGanz akkurat · Markentöne\n');
await main();
console.log('');
