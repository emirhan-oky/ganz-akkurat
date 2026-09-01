import 'dotenv/config';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { KANAL_STIMME, synthetisieren } from '../src/stimme';
import { FORMATE, FIGURENNAMEN, Format } from '../src/typen';
import { SPRUCH } from '../src/marke';
import { SPRECHERWECHSEL_SEK } from '../src/zeit';

/**
 * Die festen Sprachaufnahmen des Vorspanns — **einmal bezahlt, nie wieder.**
 *
 * ```
 * npx tsx skripte/vorspannton.ts            # alle Shows
 * npx tsx skripte/vorspannton.ts --nur=facts
 * ```
 *
 * ## Warum ein eigenes Skript und nicht der Wochenlauf
 *
 * Der Vorspann steht **nicht** im Schema. Er haengt am `format`, nicht am
 * Short, und sein Wortlaut wechselt nie — genau deshalb ist er eine feste
 * Datei und keine Zeile in `rede`. Ihn durch `shortVertonen` zu schicken hiesse,
 * ihn bei **jedem** Video neu zu bezahlen; bei vier Videos die Woche waeren das
 * rund 11.000 Zeichen im Jahr fuer denselben Satz.
 *
 * `synthetisieren()` nimmt reinen Text und eine Sprecheinstellung. Mehr braucht
 * es hier nicht — dasselbe Vorgehen wie in `skripte/stimmproben.ts`.
 *
 * ## Wer was sagt
 *
 * | | |
 * |---|---|
 * | **Volti** | „Facts. Mit Volti …" |
 * | **Watti** | „… und Watti!" |
 *
 * **Jeder nennt sich selbst.** Damit ist die Titelkarte ein Wortwechsel und
 * keine Ansage — dieselbe Figur, die der ganze Umbau auf zwei Stimmen
 * verteidigt.
 *
 * Die Reihenfolge folgt dem **Bild**: Der Vorhang zeigt „mit Volti und Watti".
 * Sie stand in zwei Kommentaren umgekehrt („mit Watti … und Volti"), und das
 * waere im Video als Widerspruch zu hoeren gewesen — der Sprechtext ist
 * ueberall in diesem Projekt zugleich das, was im Bild steht.
 *
 * ## Wattis Teil wird fuenfmal aufgenommen, obwohl er fuenfmal gleich ist
 *
 * Die **Anschlussbetonung** unterscheidet sie: „… und Watti!" nach „Facts."
 * klingt anders als nach „Maerchenstunde." Eine Aufnahme fuer alle waere fuer
 * vier der fuenf die falsche. Der Preis ist klein: fuenfmal 14 Zeichen.
 *
 * ## `eleven_v3` halluziniert bei kurzen Eingaben — gemessen am 31.08.2026
 *
 * Fuenf Laeufe, **identischer** Text („Facts. Mit Volti …", 18 Zeichen):
 *
 * | Lauf | Dauer |
 * |---|---|
 * | 1 | 4,80 s |
 * | 2 | 5,04 s |
 * | 3 | **2,08 s** |
 * | 4 | 4,24 s |
 * | 5 | **415,84 s** |
 *
 * Der fuenfte ist keine Streuung mehr, sondern ein kaputter Lauf: sieben
 * Minuten Ton fuer vier Woerter. Das Modell ist auf lange Eingaben gebaut, und
 * unterhalb einiger Dutzend Zeichen faengt es an, weiterzureden.
 *
 * **Bekannt war nur die Streuung**, nicht ihre Groessenordnung: Der Vertrag
 * notiert „rund sechs Prozent" (75,3 gegen 70,5 Sekunden) — gemessen an einem
 * Text von 800 Zeichen. Bei achtzehn sind es **Faktor 200**.
 *
 * Deshalb laeuft jede Aufnahme mehrfach, und es gilt eine Plausibilitaetsgrenze
 * (`GRENZE_SEK`). Genommen wird die **kuerzeste** brauchbare: Bei identischem
 * Wortlaut ist die kuerzeste die ohne angehaengten Leerlauf — der gesprochene
 * Inhalt ist in allen derselbe.
 *
 * **Der Befund gilt nicht nur hier.** Wattis Reaktionszeilen sind 20 bis 40
 * Zeichen lang und laufen im Wochenlauf durch dasselbe Modell. Seit dem
 * 31.08.2026 haelt `plausibelBisSek` in `src/stimme.ts` sie dort ab.
 *
 * **Diese Datei behaelt trotzdem ihre eigene Regel**, und das ist kein
 * Versehen: Dort sind es rund 56 Aufrufe je Woche, hier zehn Aufnahmen, einmal
 * bezahlt und nie wieder. Wo Wiederholen nichts kostet, ist dreimal messen und
 * die kuerzeste nehmen besser als einmal messen und hoffen. Zwei
 * uebereinandergelegte Wachen waeren dagegen undurchschaubar — deshalb ist die
 * neue ein Schalter, und er steht hier auf aus.
 */

/**
 * Was eine Aufnahme hoechstens dauern darf, bevor sie als kaputt gilt.
 *
 * Der laengste Text ist „Maerchenstunde. Mit Volti …" mit 26 Zeichen; bei den
 * gemessenen 14,3 Zeichen je Sekunde sind das 1,8 Sekunden Sprache. Vier
 * Sekunden lassen reichlich Luft fuer Betonung und Endpause und schliessen den
 * Fall aus, der hier gefunden wurde.
 */
const GRENZE_SEK = 4;

/** Wie oft eine Aufnahme angefordert wird, bevor die beste gewaehlt wird. */
const VERSUCHE = 3;

/** Wattis Einwurf. Bei allen Shows derselbe Wortlaut, je Show eine Aufnahme. */
const EINWURF = `… und ${FIGURENNAMEN.zeiger}!`;

/**
 * Voltis Teil: der Showtitel, dann der eigene Name.
 *
 * Der Punkt nach dem Titel ist Absicht — er setzt ihn als Ansage und nicht als
 * Satzanfang. Die Auslassungspunkte am Ende halten die Stimme oben, damit
 * Wattis Einwurf als Fortsetzung klingt und nicht als neuer Satz.
 */
const ansage = (show: string) => `${show}. Mit ${FIGURENNAMEN.nachleser} …`;

/** Der Ordner, aus dem `video/Short.tsx` die Dateien holt. */
const ZIEL = path.join('public', 'ton', 'marke', 'vorspann');

/**
 * Die gemessenen Dauern, damit der Renderer weiss, wann Watti einfaellt.
 *
 * **Remotion kann die Laenge einer Tondatei nicht synchron lesen**, und der
 * Einsatz des zweiten Sprechers haengt genau daran. Die Zahlen muessen also im
 * Code stehen — und weil eine von Hand gepflegte Tabelle beim naechsten Lauf
 * lautlos auseinanderliefe, schreibt dieses Skript sie mit.
 *
 * **Eine Doppelung ohne Wache ist der eigentliche Fehler, nicht die
 * Doppelung.** Hier ist die Wache, dass niemand sie von Hand pflegt.
 */
const DAUERN = path.join('daten', 'vorspannton.json');

/**
 * Ein sprechender Dateiname je Format.
 *
 * Nicht der Showtitel: „Kein Zufall" und „Schätz mal" haetten ein Leerzeichen,
 * „Märchenstunde" einen Umlaut. Der Schluessel des Formats ist beides nicht und
 * steht ohnehin schon im Schema.
 */
const dateiname = (format: Format, wer: 'volti' | 'watti') => `${format}.${wer}.mp3`;

/**
 * Der Abspann — zwei feste Zeilen, in jedem Short dieselben.
 *
 * **Seit dem 01.09.2026.** Volti sagt den Spruch, Watti antwortet mit einem
 * Wort. Formatunabhaengig, also zwei Dateien statt zehn, und sie liegen neben
 * dem Vorspannordner, nicht darin. Der Wortlaut ist vorgegeben und steht hier
 * woertlich: „Wir haben nachgelesen." — „Wirklich."
 *
 * Aufgenommen nur mit `--abspann`, damit die zehn Showaufnahmen nicht noch
 * einmal laufen.
 */
const ABSPANN = {
  volti: `${SPRUCH}`,
  watti: 'Wirklich.',
} as const;
const ABSPANN_ZIEL = path.join('public', 'ton', 'marke');

/**
 * Nimmt eine Zeile mehrfach auf und liefert die kuerzeste brauchbare —
 * dieselbe Regel wie unten bei den Shows, nur herausgezogen, damit der
 * Abspann sie mitbenutzt.
 */
const beste = async (
  text: string,
  stimmeId: string,
  schluessel: string,
): Promise<{ dauerSek: number; ton: Buffer; verworfen: number }> => {
  const laeufe: { dauerSek: number; ton: Buffer }[] = [];
  for (let i = 0; i < VERSUCHE; i++) {
    const versuch = await synthetisieren(text, { stimmeId, ...KANAL_STIMME }, schluessel);
    laeufe.push({ dauerSek: versuch.dauerSek, ton: versuch.ton });
  }
  const brauchbar = laeufe.filter((l) => l.dauerSek <= GRENZE_SEK);
  if (brauchbar.length === 0) {
    const kuerzeste = Math.min(...laeufe.map((l) => l.dauerSek));
    throw new Error(
      `alle ${VERSUCHE} Laeufe ueber ${GRENZE_SEK}s (kuerzeste ${kuerzeste.toFixed(1)}s) — noch einmal laufen lassen`,
    );
  }
  const synthese = brauchbar.reduce((a, b) => (b.dauerSek < a.dauerSek ? b : a));
  return { ...synthese, verworfen: laeufe.length - brauchbar.length };
};

const abspannAufnehmen = async (schluessel: string, stimmen: { volti: string; watti: string }) => {
  const zeichen = ABSPANN.volti.length + ABSPANN.watti.length;
  console.log(`\nGanz akkurat · Abspannton\n`);
  console.log(`   2 Zeilen, ${zeichen} Zeichen je Versuch, ${VERSUCHE} Versuche — einmalig.\n`);

  const gemessen: Partial<Record<'volti' | 'watti', number>> = {};
  for (const wer of ['volti', 'watti'] as const) {
    const text = ABSPANN[wer];
    const synthese = await beste(text, stimmen[wer], schluessel);
    const datei = path.join(ABSPANN_ZIEL, `abspann.${wer}.mp3`);
    await fs.writeFile(datei, synthese.ton);
    console.log(
      `✓ abspann ${wer.padEnd(6)} ${synthese.dauerSek.toFixed(2).padStart(5)}s  „${text}"` +
        (synthese.verworfen > 0 ? `  (${synthese.verworfen} verworfen)` : ''),
    );
    gemessen[wer] = Number(synthese.dauerSek.toFixed(3));
  }

  const alt = await fs
    .readFile(DAUERN, 'utf8')
    .then((t) => JSON.parse(t) as Record<string, Record<string, number>>)
    .catch(() => ({}) as Record<string, Record<string, number>>);
  alt.abspann = { volti: gemessen.volti!, watti: gemessen.watti! };
  await fs.writeFile(DAUERN, JSON.stringify(alt, null, 2) + '\n');
  console.log(`\n   Dauern nach ${DAUERN} geschrieben.`);
};

const main = async () => {
  const schluessel = process.env.ELEVENLABS_API_KEY;
  if (!schluessel) throw new Error('ELEVENLABS_API_KEY fehlt in .env');

  const stimmen = {
    volti: process.env.ELEVENLABS_VOICE_ID,
    watti: process.env.ELEVENLABS_VOICE_ID_ZEIGER,
  };
  if (!stimmen.volti || !stimmen.watti) {
    throw new Error('ELEVENLABS_VOICE_ID oder ELEVENLABS_VOICE_ID_ZEIGER fehlt in .env');
  }

  if (process.argv.includes('--abspann')) {
    await abspannAufnehmen(schluessel, stimmen as { volti: string; watti: string });
    return;
  }

  const nur = process.argv.find((a) => a.startsWith('--nur='))?.slice(6);
  const formate = (Object.keys(FORMATE) as Format[]).filter((f) => nur === undefined || f === nur);
  if (formate.length === 0) throw new Error(`Kein Format „${nur}". Bekannt: ${Object.keys(FORMATE).join(', ')}`);

  await fs.mkdir(ZIEL, { recursive: true });

  const zeichen = formate.reduce((s, f) => s + ansage(FORMATE[f].show).length + EINWURF.length, 0);
  console.log(`\nGanz akkurat · Vorspannton\n`);
  console.log(`   ${formate.length} Show(s), ${zeichen} Zeichen — einmalig.\n`);

  /*
   * Die laengste Summe zaehlt, nicht die mittlere: `VORSPANN_SEK` gilt fuer
   * **jeden** Short, also muss die langsamste Show hineinpassen. Ein Mittelwert
   * liesse „Maerchenstunde" ueber die Karte hinauslaufen.
   */
  let laengste = { name: '', dauer: 0 };
  const gemessen: Record<string, number> = {};

  for (const format of formate) {
    const show = FORMATE[format].show;
    let voltiDauer = 0;

    for (const [wer, text, stimmeId] of [
      ['volti', ansage(show), stimmen.volti],
      ['watti', EINWURF, stimmen.watti],
    ] as const) {
      try {
        /*
         * Mehrere Anlaeufe, die kuerzeste brauchbare gewinnt. Ein einzelner
         * Aufruf hat bei dieser Textlaenge eine messbare Wahrscheinlichkeit,
         * Minuten von Ton zu liefern — siehe oben.
         */
        const laeufe: { dauerSek: number; ton: Buffer }[] = [];
        for (let i = 0; i < VERSUCHE; i++) {
          const versuch = await synthetisieren(text, { stimmeId, ...KANAL_STIMME }, schluessel);
          laeufe.push({ dauerSek: versuch.dauerSek, ton: versuch.ton });
        }

        const brauchbar = laeufe.filter((l) => l.dauerSek <= GRENZE_SEK);
        const verworfen = laeufe.length - brauchbar.length;
        if (brauchbar.length === 0) {
          const kuerzeste = Math.min(...laeufe.map((l) => l.dauerSek));
          throw new Error(
            `alle ${VERSUCHE} Laeufe ueber ${GRENZE_SEK}s (kuerzeste ${kuerzeste.toFixed(1)}s) — noch einmal laufen lassen`,
          );
        }

        const synthese = brauchbar.reduce((a, b) => (b.dauerSek < a.dauerSek ? b : a));
        const datei = path.join(ZIEL, dateiname(format, wer));
        await fs.writeFile(datei, synthese.ton);
        console.log(
          `✓ ${show.padEnd(15)} ${wer.padEnd(6)} ${synthese.dauerSek.toFixed(2).padStart(5)}s  „${text}"` +
            (verworfen > 0 ? `  (${verworfen} verworfen)` : ''),
        );

        gemessen[`${format}.${wer}`] = Number(synthese.dauerSek.toFixed(3));
        if (wer === 'volti') voltiDauer = synthese.dauerSek;
        else {
          /*
           * Der Einwurf setzt ein, wenn Volti fertig ist — plus die Pause, die
           * `src/zeit.ts` fuer jeden Sprecherwechsel innerhalb einer Szene
           * ansetzt. Sie steht dort gemessen und wird hier nicht neu geraten.
           */
          const summe = voltiDauer + SPRECHERWECHSEL_SEK + synthese.dauerSek;
          console.log(`  ${''.padEnd(15)} zusammen ${summe.toFixed(2).padStart(5)}s`);
          if (summe > laengste.dauer) laengste = { name: show, dauer: summe };
        }
      } catch (fehler) {
        console.log(`✕ ${show.padEnd(15)} ${wer.padEnd(6)} ${(fehler as Error).message.slice(0, 100)}`);
      }
    }
  }

  /*
   * Nur schreiben, wenn **alle** Aufnahmen dieses Laufs gelungen sind: Ein
   * Teillauf (`--nur=…`) darf die Tabelle ergaenzen, aber ein Lauf mit Fehlern
   * darf sie nicht mit Luecken ueberschreiben.
   */
  if (Object.keys(gemessen).length === formate.length * 2) {
    const alt = await fs
      .readFile(DAUERN, 'utf8')
      .then((t) => JSON.parse(t) as Record<string, Record<string, number>>)
      .catch(() => ({}) as Record<string, Record<string, number>>);
    for (const format of formate) {
      alt[format] = {
        volti: gemessen[`${format}.volti`]!,
        watti: gemessen[`${format}.watti`]!,
      };
    }
    await fs.writeFile(DAUERN, JSON.stringify(alt, null, 2) + '\n');
    console.log(`\n   Dauern nach ${DAUERN} geschrieben.`);
  }

  if (laengste.dauer > 0) {
    /*
     * Gerechnet wird mit der **laengsten** Show, nicht mit der mittleren:
     * `VORSPANN_SEK` gilt fuer jeden Short, also muss die langsamste
     * hineinpassen. Dazu die Vorhangfahrt (zweimal `FAHRT_BILDER` bei 30 fps)
     * und der Jingle, der beim Oeffnen mitlaeuft und deshalb nicht addiert
     * wird.
     */
    const fahrt = (2 * 12) / 30;
    const empfohlen = laengste.dauer + fahrt;
    console.log(
      `\n   Laengste Show: ${laengste.name} mit ${laengste.dauer.toFixed(2)}s Sprache.\n` +
        `   Plus ${fahrt.toFixed(2)}s Vorhangfahrt ⇒ VORSPANN_SEK = ${empfohlen.toFixed(1)}\n` +
        '   Seit dem 31.08.2026 rechnet `vorspannFestSek` das je Show aus dieser Datei —\n' +
        '   die eine feste Zahl fuer alle Shows gibt es nicht mehr.\n',
    );
  }
};

main().catch((fehler) => {
  console.error(fehler);
  process.exit(1);
});
