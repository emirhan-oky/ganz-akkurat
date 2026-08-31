import 'dotenv/config';
import fs from 'node:fs/promises';
import { median } from '../src/rueckschau';
import { KANAL_STIMME, synthetisieren, type Sprecheinstellung } from '../src/stimme';

/**
 * Wogegen messen wir eigentlich? — `npm run stimmprobe-v3`
 *
 * Angelegt am 26.08.2026, vor der Regieprobe und ausdruecklich **vor** ihr.
 *
 * ## Warum das zuerst kommt
 *
 * Die ElevenLabs-Doku sagt ueber `eleven_v3`: „For maximum expressiveness with
 * audio tags, use Creative or Natural settings. Robust reduces responsiveness
 * to directional prompts." Die Einstellung entscheidet also darueber, ob eine
 * Regieanweisung ueberhaupt ankommt.
 *
 * `KANAL_STIMME` in `src/stimme.ts` steht auf `stabilitaet: 0.45`, und der
 * Kommentar daneben beschreibt einen **stufenlosen Regler** — das ist v2. v3
 * kennt drei Stufen. Wo unsere 0,45 landet, weiss hier niemand. Eine Tag-Probe
 * gegen eine Einstellung, die den Tag gerade daempft, misst den Tag nicht.
 *
 * Dieselbe Geschichte wie bei `ZEICHEN_PRO_SEKUNDE`: eine Zahl, die nicht
 * unsicher war, sondern **fuer ein Modell gemessen, das nicht mehr laeuft**.
 *
 * ## Zwei Teile
 *
 * **A · Die Regler.** Dieselbe Zeile mit `[sighs]` als Messsonde — hoerbar,
 * also an der Klammerspanne ablesbar — ueber die Stabilitaetsstufen, dazu
 * `style` und `speed` gegeneinander. Wo sich nichts aendert, ist der Regler
 * tot; das zu wissen ist so viel wert wie sein richtiger Wert.
 *
 * **B · Die achtzehn Kandidaten**, jeder an einer kurzen Zeile, mit der
 * Klammerspanne daneben — der Zeitspanne zwischen `[` und `]` in der
 * Zeichenausrichtung. Sie war als **Sieb** gedacht: hoerbare Anweisungen
 * sollten aus dem Vorrat fallen, weil sie Sekunden erzeugen, die keine
 * Schaetzung sieht.
 *
 * **Das Sieb hat nicht funktioniert**, und warum, steht weiter unten bei der
 * Schwelle. Geblieben ist eine sortierte Reihe: ein Hinweis, welche Dateien
 * man zuerst anhoert.
 *
 * ## Warum jeder Punkt dreimal gemessen wird
 *
 * Der erste Lauf am 26.08.2026 lief mit einer Messung je Punkt und hat sich
 * damit selbst widerlegt: Dieselbe Zeile ergab 2,56 bis 3,12 Sekunden, und
 * `speed 0.8` kam **kuerzer** heraus als `speed 1.0`. Bei 20 Prozent Streuung
 * ist kein Reglereffekt zu sehen.
 *
 * Das war derselbe Fehler, den dieselbe Sitzung fuer die Tag-Blindwahl schon
 * ausgeschlossen hatte — dort wurde auf zwei Durchgaenge bestanden, hier lief
 * einer. Der Vertrag weiss es ohnehin von der Tonhoehe: Olaf mass 182 und
 * 155 Hz an derselben Zeile.
 *
 * Rund 2.000 Zeichen Kontingent. Anders als `npm run sprechprobe` ruft es
 * ElevenLabs wirklich an.
 */

/** Messungen je Punkt. Drei, wie bei der Tonhoehe. */
const WIEDERHOLUNGEN = 3;

/** Die Messsonde fuer Teil A: hoerbar, also an der Klammerspanne ablesbar. */
const SONDE = '[sighs] Also war das alles umsonst?';

/** Kurz und tonlos — in Teil B interessiert nur die Klammer, nicht die Zeile. */
const SIEBZEILE = 'Und jetzt?';

/**
 * Die achtzehn Kandidaten, alle aus der ElevenLabs-Doku.
 *
 * Nicht dabei: `[gunshot]`, `[applause]`, `[explosion]`, `[sings]`, `[fart]`
 * und die Akzent-Tags — Geraeusche und Verkleidungen, keine Tonlagen. Und
 * **nicht dabei ist `[confused]`**, das in keiner Doku steht: Es war mein
 * Beispiel seit dem 25.08., aus dem Gedaechtnis gegriffen, ausgerechnet fuer
 * die Machart, fuer die der ganze Modellwechsel gemacht wurde.
 */
const KANDIDATEN = [
  '[laughs]', '[whispers]', '[sighs]', '[exhales]', '[sarcastic]', '[curious]',
  '[excited]', '[crying]', '[snorts]', '[mischievously]', '[happy]', '[sad]',
  '[angry]', '[annoyed]', '[appalled]', '[thoughtful]', '[surprised]', '[muttering]',
];

/*
 * ## Die Klammerspanne traegt nicht, und das ist der Befund
 *
 * Zwei Anlaeufe am 26.08.2026, beide falsch:
 *
 * 1. Feste Schwelle bei 0,15 s — meldete **17 von 18** Kandidaten als hoerbar.
 *    Kein Befund, sondern ein kaputtes Sieb: Die Zeichenausrichtung gibt auch
 *    stummen Zeichen Zeit, es gibt also eine Grundlast.
 * 2. Schwelle aus der groessten Luecke der Messreihe gelesen — meldete im
 *    zweiten Lauf **1 von 18**, und `[laughs]` stand auf „still". Ein Lachen
 *    ist per Definition Ton.
 *
 * Dieselben Tags, zwei Laeufe, zwei Antworten: `[snorts]` 1,20 dann 0,44,
 * `[thoughtful]` 0,26 dann 0,08 — Median aus drei Messungen inklusive. Eine
 * Groesse, die bei Wiederholung ihre Ordnung verliert, misst nichts.
 *
 * **Was daraus folgt: Das Sieb gehoert ans Ende, nicht an den Anfang.** Ob ein
 * Tag Ton erzeugt, faellt in der Blindwahl ohnehin auf — wer hoert, dass Watti
 * seufzt, hoert es. Und die Frage, wieviel Sekunden das kostet, stellt sich
 * erst fuer die zwei bis drei Tags, die tatsaechlich in einen Vorrat kommen.
 * Zwei Tags gezielt zu vermessen ist eine Messung, die traegt; achtzehn vorab
 * zu sieben war eine, die es nicht tut.
 *
 * Die Spalte bleibt trotzdem in der Ausgabe: als Reihe sortiert ist sie ein
 * Hinweis, welche Dateien man zuerst anhoert. Ein Urteil faellt sie nicht mehr.
 */

type Ausrichtung = {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
};

/** Die Zeitspanne zwischen `[` und `]`, oder `null`, wenn keine da ist. */
const klammerspanne = (a: Ausrichtung): number | null => {
  const auf = a.characters.indexOf('[');
  const zu = a.characters.indexOf(']');
  if (auf === -1 || zu === -1 || zu < auf) return null;
  return (a.character_end_times_seconds[zu] ?? 0) - (a.character_start_times_seconds[auf] ?? 0);
};

const schluessel = process.env.ELEVENLABS_API_KEY;
if (!schluessel) throw new Error('ELEVENLABS_API_KEY fehlt in .env');
const stimmeId = process.env.ELEVENLABS_VOICE_ID_ZEIGER;
if (!stimmeId) throw new Error('ELEVENLABS_VOICE_ID_ZEIGER fehlt in .env — das ist Wattis Stimme');

const ZIEL = 'laeufe/stimmprobe-v3';
await fs.mkdir(ZIEL, { recursive: true });

let zeichen = 0;

/** Ein Messpunkt: dreimal synthetisiert, Median aus beiden Groessen. */
const probe = async (
  name: string,
  text: string,
  abweichung: Partial<Omit<Sprecheinstellung, 'stimmeId'>>,
): Promise<{ dauer: number; spanne: number | null; streuung: number }> => {
  const dauern: number[] = [];
  const spannen: number[] = [];
  for (let i = 0; i < WIEDERHOLUNGEN; i += 1) {
    const s = await synthetisieren(text, { stimmeId, ...KANAL_STIMME, ...abweichung }, schluessel);
    zeichen += text.length;
    // Nur die erste Probe wird abgelegt — zum Hoeren genuegt eine.
    if (i === 0) await fs.writeFile(`${ZIEL}/${name}.mp3`, s.ton);
    dauern.push(s.dauerSek);
    const sp = klammerspanne(s.ausrichtung);
    if (sp !== null) spannen.push(sp);
  }
  return {
    dauer: median(dauern) ?? 0,
    spanne: spannen.length > 0 ? median(spannen) : null,
    streuung: Math.max(...dauern) - Math.min(...dauern),
  };
};

console.log('\nGanz akkurat · Stimmprobe v3 (Wattis Stimme)\n');
console.log('  A · Die Regler — dieselbe Zeile, eine Messsonde davor\n');
console.log('     Einstellung          Dauer    Klammer   Streuung');
console.log('     ' + '─'.repeat(54));

for (const stab of [0.0, 0.45, 0.5, 1.0]) {
  const r = await probe(`stability-${stab}`, SONDE, { stabilitaet: stab });
  console.log(
    `     stability ${String(stab).padEnd(11)}${r.dauer.toFixed(2).padStart(5)}s  ` +
      `${(r.spanne === null ? '—' : r.spanne.toFixed(2) + 's').padStart(7)}   ` +
      `±${r.streuung.toFixed(2)}s`,
  );
}
for (const stil of [0.0, 0.35]) {
  const r = await probe(`style-${stil}`, SONDE, { ausdruck: stil });
  console.log(
    `     style ${String(stil).padEnd(15)}${r.dauer.toFixed(2).padStart(5)}s  ` +
      `${(r.spanne === null ? '—' : r.spanne.toFixed(2) + 's').padStart(7)}   ` +
      `±${r.streuung.toFixed(2)}s`,
  );
}
for (const tempo of [1.0, 0.8]) {
  const r = await probe(`speed-${tempo}`, SONDE, { tempo });
  console.log(
    `     speed ${String(tempo).padEnd(15)}${r.dauer.toFixed(2).padStart(5)}s  ` +
      `${(r.spanne === null ? '—' : r.spanne.toFixed(2) + 's').padStart(7)}   ` +
      `±${r.streuung.toFixed(2)}s`,
  );
}

console.log('\n  B · Klammerspanne je Kandidat — wo zuerst hinhören  (18 Stück)\n');
console.log('     Kandidat            Klammer');
console.log('     ' + '─'.repeat(30));

const gemessen: { tag: string; spanne: number }[] = [];

for (const tag of KANDIDATEN) {
  const name = tag.replace(/[[\]]/g, '');
  const r = await probe(`sieb-${name}`, `${tag} ${SIEBZEILE}`, {});
  if (r.spanne !== null) gemessen.push({ tag, spanne: r.spanne });
}

// Sortiert, damit man sieht, wo man zuerst hinhoert. Kein Urteil — siehe oben.
gemessen.sort((a, b) => b.spanne - a.spanne);
for (const g of gemessen) {
  console.log(`     ${g.tag.padEnd(18)}${(g.spanne.toFixed(2) + 's').padStart(7)}`);
}
console.log(`\n  ${zeichen} Zeichen verbraucht. Proben liegen in ${ZIEL}/`);
console.log(
  '\n  Die Zahlen entscheiden nichts. Zwei Läufe am 26.08.2026 ergaben zwei\n' +
    '  verschiedene Ordnungen — die Klammerspanne schwankt stärker als der\n' +
    '  Unterschied, den sie zeigen soll, auch als Median aus drei Messungen.\n' +
    '\n  Teil A beantwortet dieselbe Frage genauso wenig: Ob v3 auf `stability`\n' +
    '  hört, ist ein Klangunterschied und keine Dauer. Zwei Dateien vergleichen\n' +
    '  — `stability-0.mp3` gegen `stability-1.mp3` — sagt in zehn Sekunden mehr\n' +
    '  als jede Zahlenreihe hier.',
);
