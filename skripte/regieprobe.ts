import 'dotenv/config';
import fs from 'node:fs/promises';
import { KANAL_STIMME, synthetisieren } from '../src/stimme';
import { REAKTIONS_MACHARTEN } from '../src/typen';

/**
 * Was macht eine Regieanweisung mit der Zeile? — `npm run regieprobe`
 *
 * Angelegt am 26.08.2026, als die Anweisungen aus `eleven_v3` endlich an die
 * Macharten gebunden wurden. Sie waren der **Grund** fuer den Modellwechsel
 * vom 25.08. und lagen seither ungenutzt da: Das Modell konnte es, niemand hat
 * es bestellt.
 *
 * ## Warum gemessen und nicht begruendet
 *
 * Die sechs Zuordnungen in `REAKTIONS_MACHARTEN` sind geraten. Genau an dieser
 * Stelle hat das Projekt schon zweimal bezahlt — `ZEICHEN_PRO_SEKUNDE` stand
 * jahrelang auf einer Zahl aus dem falschen Modell, und die Denkpause hatte
 * eine Begruendung, warum sie sich angeblich nicht messen liesse. Sie liess
 * sich messen, und die Begruendung war falsch.
 *
 * Drei Fragen, die das Skript beantwortet, und eine, die es nicht kann:
 *
 * 1. **Erzeugt die Klammer Ton?** `[sighs]` ist ein Seufzer und damit hoerbar;
 *    `[confused]` ist nur eine Anweisung. Gemessen an der Zeitspanne zwischen
 *    `[` und `]` in der Zeichenausrichtung.
 * 2. **Wird sie mitgesprochen?** Der schlimmste Fall — die Stimme liest
 *    „confused" vor. Im Untertitel faellt das nicht auf, weil
 *    `woerterAusAusrichtung` eckige Klammern wegfiltert. Zu hoeren waere es
 *    trotzdem. Ein langer Klammerabschnitt ist der Verdacht.
 * 3. **Kostet sie Sprechzeit?** Dieselbe Zeile mit und ohne, die Differenz
 *    steht daneben. Ueber vier Reaktionen je Short summiert sich das.
 *
 * Nicht beantworten kann es die eigentliche Frage: **ob es besser klingt.** Das
 * entscheidet ein Ohr, kein Skript — die Proben liegen deshalb als Dateien in
 * `laeufe/regieprobe/`, mit und ohne Anweisung nebeneinander.
 *
 * ## Was es kostet
 *
 * Rund 600 Zeichen von 121.000 im Monat, also praktisch nichts. Anders als
 * `npm run sprechprobe` ruft es ElevenLabs aber wirklich an.
 */

/**
 * Je Machart eine echte Zeile aus den vier Entwuerfen.
 *
 * Keine erfundenen Beispielsaetze: Eine Anweisung, die an einem gebauten Satz
 * gemessen wurde, gilt fuer gebaute Saetze.
 */
const ZEILEN: Record<string, string> = {
  gestaendnis: 'Meins ist vom Flohmarkt. Sagt keinem was.',
  falscherschluss: 'Also lade ich ab jetzt absichtlich schlecht.',
  bild: 'Aus? Dann gucke ich solange die Wand an.',
  ratlosigkeit: 'Also war das alles umsonst?',
  empoerung: 'Meine Mutter hat mir das beigebracht!',
  rueckfrage: 'Und wer weckt mich dafür?',
};

/**
 * Was `bild` und `rueckfrage` bekommen wuerden, wenn sie etwas bekaemen.
 *
 * Beide stehen in `REAKTIONS_MACHARTEN` bewusst ohne Anweisung, und die
 * Begruendung dort ist ein Argument, kein Messwert. Damit die Entscheidung
 * „keine" denselben Rang hat wie die vier anderen, laufen sie hier mit einem
 * Kandidaten mit — sonst ist die eine Haelfte gemessen und die andere
 * behauptet.
 */
const KANDIDATEN: Record<string, string> = {
  bild: '[mischievously]',
  rueckfrage: '[curious]',
};

/** Die Zeitspanne zwischen `[` und `]`, oder `null`, wenn keine da ist. */
const klammerspanne = (
  a: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] },
): number | null => {
  const auf = a.characters.indexOf('[');
  const zu = a.characters.indexOf(']');
  if (auf === -1 || zu === -1 || zu < auf) return null;
  return (a.character_end_times_seconds[zu] ?? 0) - (a.character_start_times_seconds[auf] ?? 0);
};

const schluessel = process.env.ELEVENLABS_API_KEY;
if (!schluessel) throw new Error('ELEVENLABS_API_KEY fehlt in .env');
const stimmeId = process.env.ELEVENLABS_VOICE_ID_ZEIGER;
if (!stimmeId) throw new Error('ELEVENLABS_VOICE_ID_ZEIGER fehlt in .env — das ist Wattis Stimme');

const ZIEL = 'laeufe/regieprobe';
await fs.mkdir(ZIEL, { recursive: true });

console.log('\nGanz akkurat · Regieprobe (Wattis Stimme)\n');
console.log('  Machart          Anweisung          Klammer   ohne     mit    Differenz');
console.log('  ' + '─'.repeat(72));

let zeichen = 0;

for (const m of REAKTIONS_MACHARTEN) {
  const zeile = ZEILEN[m.schluessel];
  if (zeile === undefined) continue;
  const regie = m.regie ?? KANDIDATEN[m.schluessel];
  if (regie === undefined) continue;

  const ohne = await synthetisieren(zeile, { stimmeId, ...KANAL_STIMME }, schluessel);
  const mitText = `${regie} ${zeile}`;
  const mit = await synthetisieren(mitText, { stimmeId, ...KANAL_STIMME }, schluessel);
  zeichen += zeile.length + mitText.length;

  await fs.writeFile(`${ZIEL}/${m.schluessel}-ohne.mp3`, ohne.ton);
  await fs.writeFile(`${ZIEL}/${m.schluessel}-mit.mp3`, mit.ton);

  const spanne = klammerspanne(mit.ausrichtung);
  const marke = m.regie === undefined ? '?' : ' ';
  console.log(
    `  ${(m.schluessel + marke).padEnd(17)}${regie.padEnd(19)}` +
      `${(spanne === null ? '—' : spanne.toFixed(2) + 's').padStart(7)}  ` +
      `${ohne.dauerSek.toFixed(2).padStart(5)}s  ${mit.dauerSek.toFixed(2).padStart(5)}s  ` +
      `${(mit.dauerSek - ohne.dauerSek >= 0 ? '+' : '') + (mit.dauerSek - ohne.dauerSek).toFixed(2)}s`,
  );
}

console.log('  ' + '─'.repeat(72));
console.log(`\n  ${zeichen} Zeichen verbraucht. Proben liegen in ${ZIEL}/`);
console.log(
  '\n  „?" heißt: Diese Machart trägt in `REAKTIONS_MACHARTEN` bewusst keine\n' +
    '  Anweisung — der Wert daneben ist ein Kandidat, damit die Entscheidung\n' +
    '  „keine" gemessen ist und nicht nur begründet.\n' +
    '\n  Eine Klammerspanne nahe null heißt: reine Anweisung, kein Ton. Eine lange\n' +
    '  Spanne heißt Seufzer, Lachen — oder im schlimmsten Fall, dass die Stimme\n' +
    '  das Wort vorliest. Das hört man nur in den Dateien.',
);
