import {
  herkuenfteLesen,
  median,
  prozent,
  rueckblickLesen,
  zusammenfuehren,
  type Rueckschau,
} from '../src/rueckschau';
import { BAUFORMEN, FORMATE, type Bauform, type Format } from '../src/typen';
import { LAENGENKLASSEN } from '../src/zeit';

/**
 * `npm run laengen` — hält ein längeres Video länger?
 *
 * ## Warum es das Skript gibt
 *
 * `daten/rueckblick.json` trägt seit Wochen ein Feld `laengeSek`, und **keine
 * Auswertung hat es je gelesen** — weder `ausreisser.ts` noch `aufschlaege.ts`
 * fassen es an. Am 26.08.2026 fiel das auf, als die Frage aufkam, warum die
 * neuen Shorts bei 36 bis 48 Sekunden liegen, obwohl das Fenster bis 65 reicht.
 *
 * Die Antwort war: Der Zielwert je Bauform steht bei 35, und diese Zahl ist
 * aus einem einzelnen Entwurf abgelesen. Entschieden wurde, sie stehen zu
 * lassen, bis eigene Zahlen vorliegen — und **dann muss es etwas geben, das
 * die Zahlen nebeneinanderlegt.** Ohne dieses Skript sammeln wir Daten, die
 * niemand ansieht.
 *
 * ## Warum die Verweildauer und nicht die Durchsicht
 *
 * Die Prozent-Durchsicht sinkt mit der Länge zwangsläufig: Ein Video von 60
 * Sekunden mit 40 % hält den Zuschauer 24 Sekunden, eines von 20 Sekunden mit
 * 80 % nur 16. Wer Längen an Prozenten vergleicht, entscheidet sich damit
 * automatisch für das kürzere — die Kennzahl beantwortet die Frage, bevor sie
 * gestellt ist.
 *
 * Gerechnet wird deshalb `durchsicht × laengeSek`, also die Sekunden, die
 * jemand tatsächlich zusieht. Beide Zahlen stehen daneben, weil die eine ohne
 * die andere in die Irre führt.
 *
 * ## Warum es meistens schweigt
 *
 * Am Tag, an dem es entstand, waren **alle neun veröffentlichten Videos 20 bis
 * 23 Sekunden lang.** Zu jeder Länge darüber gab es keine einzige eigene Zahl.
 * Genau das soll die Ausgabe sagen, und zwar ausdrücklich: Eine Auswertung,
 * die aus einer einzigen Längenklasse eine Aussage über Längen macht, ist die
 * geratene Reichweitenregel, vor der `ausreisser.ts` warnt.
 *
 *   npm run laengen
 */

/**
 * Ab wie vielen gemessenen Videos eine Klasse etwas sagt.
 *
 * Drei, nicht acht wie beim Median in `rueckschau.ts`. Die Schwelle dort
 * schützt eine **Rangfolge** über acht Fächer; hier geht es um den Vergleich
 * zweier bis vier Klassen, und die Frage ist gröber: nicht „welche Länge ist
 * die beste", sondern „hält die längere überhaupt länger". Bei zwei Videos ist
 * jede Antwort darauf ein Zufall, bei drei ein Fingerzeig.
 */
const GENUG_JE_KLASSE = 3;

/** Die Sekunden, die jemand wirklich zugesehen hat — aus YouTubes Durchsicht. */
const verweildauer = (r: Rueckschau): number | null => {
  const d = r.mitHalt?.durchsicht ?? null;
  return d === null ? null : (d / 100) * r.eintrag.laengeSek;
};

/**
 * Dasselbe von TikTok — und **nicht dieselbe Zahl.**
 *
 * YouTube meldet einen Anteil, aus dem hier Sekunden gerechnet werden; TikTok
 * meldet die Sekunden direkt (`Avg. Watch Time (sec)` über Buffer). Beide
 * beantworten dieselbe Frage, aber sie sind auf verschiedenen Plattformen an
 * verschiedenen Publika gemessen. **Sie werden deshalb nebeneinandergestellt
 * und nie gemittelt** — dieselbe Regel wie auf der Kanalseite, wo Buffer- und
 * Analytics-Zahlen getrennt gekennzeichnet sind.
 *
 * **Sie ist die tragfähigere der beiden.** Am 06.09.2026 hatten 16 Videos eine
 * TikTok-Sehdauer und nur 8 eine YouTube-Durchsicht — auf dem Kanal, der zwei
 * Drittel der Aufrufe bringt, wird auch mehr gemessen.
 */
const sehdauer = (r: Rueckschau): number | null => {
  const t = r.zuletzt.jeKanal?.['tiktok'];
  if (!t || t.sehdauerSek == null) return null;
  // Ohne Aufrufe ist die Sehdauer 0 und bedeutet nichts.
  return t.aufrufe > 0 ? t.sehdauerSek : null;
};

const main = async () => {
  const [eintraege, herkuenfte] = await Promise.all([rueckblickLesen(), herkuenfteLesen()]);
  const alle = zusammenfuehren(eintraege, herkuenfte);

  if (alle.length === 0) {
    console.log('Noch nichts gemessen. `npm run rueckblick` holt die Zahlen.');
    return;
  }

  const gemessen = alle.filter((r) => verweildauer(r) !== null);
  const mitSehdauer = alle.filter((r) => sehdauer(r) !== null);

  console.log('Ganz akkurat · Länge und Verweildauer\n');
  console.log(
    `  ${alle.length} veröffentlichte Shorts, ${gemessen.length} davon mit YouTube-Durchsicht,\n` +
      `  ${mitSehdauer.length} mit TikTok-Sehdauer.`,
  );

  const laengen = alle.map((r) => r.eintrag.laengeSek);
  const kuerzestes = Math.min(...laengen);
  const laengstes = Math.max(...laengen);
  console.log(`  Gemessene Längen: ${kuerzestes} bis ${laengstes} Sekunden.\n`);

  console.log('  Klasse      Videos  Verweildauer  Durchsicht  Aufrufe (Median)');
  console.log('  ' + '─'.repeat(64));

  const belegteKlassen: string[] = [];
  for (const klasse of LAENGENKLASSEN) {
    const dazu = gemessen.filter(
      (r) => r.eintrag.laengeSek >= klasse.von && r.eintrag.laengeSek < klasse.bis,
    );
    if (dazu.length > 0) belegteKlassen.push(klasse.name);

    const genug = dazu.length >= GENUG_JE_KLASSE;
    const dauer = genug ? median(dazu.map((r) => verweildauer(r)!)) : null;
    const durch = genug ? median(dazu.map((r) => r.mitHalt!.durchsicht!)) : null;
    const rufe = genug ? median(dazu.map((r) => r.zuletzt.aufrufe)) : null;

    console.log(
      `  ${klasse.name.padEnd(12)}${String(dazu.length).padStart(4)}    ` +
        (genug
          ? `${(dauer ?? 0).toFixed(1).padStart(9)} s  ${prozent(durch)}  ` +
            `${String(rufe ?? 0).padStart(16)}`
          : `zu wenig (${dazu.length} von ${GENUG_JE_KLASSE})`),
    );
  }
  console.log('  ' + '─'.repeat(64));

  /*
   * Dieselben Klassen an der TikTok-Sehdauer. Getrennte Tabelle, weil es eine
   * getrennte Messung ist — die Zahlen dürfen sich nicht vermischen.
   */
  const belegtTikTok: string[] = [];
  console.log('\n  Dasselbe an TikToks Sehdauer — die einzige Zahl vom größten Kanal:');
  console.log('  Klasse      Videos     Sehdauer  Anteil (Median)');
  console.log('  ' + '─'.repeat(52));
  for (const klasse of LAENGENKLASSEN) {
    const dazu = mitSehdauer.filter(
      (r) => r.eintrag.laengeSek >= klasse.von && r.eintrag.laengeSek < klasse.bis,
    );
    const genug = dazu.length >= GENUG_JE_KLASSE;
    if (genug) belegtTikTok.push(klasse.name);
    const dauer = genug ? median(dazu.map((r) => sehdauer(r)!)) : null;
    const anteil = genug
      ? median(dazu.map((r) => (sehdauer(r)! / r.eintrag.laengeSek) * 100))
      : null;
    console.log(
      `  ${klasse.name.padEnd(12)}${String(dazu.length).padStart(4)}    ` +
        (genug
          ? `${(dauer ?? 0).toFixed(1).padStart(9)} s  ${prozent(anteil)}`
          : `zu wenig (${dazu.length} von ${GENUG_JE_KLASSE})`),
    );
  }
  console.log('  ' + '─'.repeat(52));

  /*
   * Die Bauform steht daneben, weil sie den Zielwert setzt. Sie ist die
   * Groesse, die am Ende geaendert wuerde — nicht die Laenge selbst, die ja
   * nur herauskommt.
   *
   * Traegt kein einziges gemessenes Video eine, liegt das nicht an der Menge,
   * sondern am Feld: `bauform` gibt es erst seit dem 25.08.2026. Viermal
   * „zu wenig (0 von 3)" untereinander liest sich wie ein Datenmangel und ist
   * ein Datumsproblem — deshalb steht dort ein eigener Satz.
   */
  /*
   * Beide Aufstellungen unten brauchen die **Herkunft** aus `laeufe/`, und der
   * Ordner steht in `.gitignore`: Auf einem frischen Klon ist er leer, und
   * dann steht ueberall „zu wenig", wo in Wahrheit „nicht zuzuordnen" gilt.
   * Derselbe Hinweis wie in `ausreisser.ts` — eine Zahl, die fehlt, und eine
   * Zahl, die niemand kennt, sind zwei verschiedene Befunde.
   */
  const ohneHerkunft = gemessen.filter((r) => !r.herkunft).length;
  if (ohneHerkunft > 0) {
    console.log(
      `\n  ${ohneHerkunft} von ${gemessen.length} gemessenen Shorts haben keine Herkunft: Der zugehörige\n` +
        '  Lauf liegt nicht mehr unter `laeufe/`. Bauform und Format lassen sich für sie\n' +
        '  nicht bestimmen — was unten „zu wenig" heißt, heißt für sie „unbekannt".',
    );
  }

  const mitBauform = gemessen.filter((r) => r.herkunft?.bauform !== undefined);
  if (mitBauform.length === 0) {
    console.log(
      '\n  Je Bauform: kein gemessenes Video trägt eine. Das Feld gibt es erst seit dem\n' +
        '  25.08.2026 — die Läufe davor kennen es nicht, und veröffentlicht ist bisher\n' +
        '  nur aus dieser Zeit.',
    );
  } else {
    console.log('\n  Je Bauform');
    for (const bauform of Object.keys(BAUFORMEN) as Bauform[]) {
      const dazu = gemessen.filter((r) => r.herkunft?.bauform === bauform);
      const dauer =
        dazu.length >= GENUG_JE_KLASSE ? median(dazu.map((r) => verweildauer(r)!)) : null;
      console.log(
        `    ${BAUFORMEN[bauform].titel.padEnd(14)}` +
          (dauer === null
            ? `zu wenig (${dazu.length} von ${GENUG_JE_KLASSE})`
            : `${dauer.toFixed(1)} s Verweildauer aus ${dazu.length} Videos`),
      );
    }
  }

  /*
   * Je Format daneben, und **eindimensional**. Die Kreuzung Format mal Laenge
   * waeren zwoelf Felder; bei vier Videos je Woche stuenden bis Ende Oktober
   * drei Videos in jedem, und drei Videos je Feld sind Rauschen. Wer sie
   * trotzdem aufstellt, liest am Ende Zufall als Regel.
   */
  console.log('\n  Je Format');
  for (const format of Object.keys(FORMATE) as Format[]) {
    const dazu = gemessen.filter((r) => r.herkunft?.format === format);
    const dauer = dazu.length >= GENUG_JE_KLASSE ? median(dazu.map((r) => verweildauer(r)!)) : null;
    console.log(
      `    ${FORMATE[format].titel.padEnd(22)}` +
        (dauer === null
          ? `zu wenig (${dazu.length} von ${GENUG_JE_KLASSE})`
          : `${dauer.toFixed(1)} s Verweildauer aus ${dazu.length} Videos`),
    );
  }

  /*
   * Der wichtigste Satz der Ausgabe, und er steht am Ende, weil er die ganze
   * Tabelle darueber einordnet: Solange nur eine Klasse belegt ist, misst
   * dieses Skript keine Laengen, sondern eine einzige Laenge.
   */
  if (belegtTikTok.length >= 2) {
    /*
     * **Der Fall, für den dieses Skript gebaut wurde, ist am 06.09.2026 zum
     * ersten Mal eingetreten** — und er kam von TikTok, nicht von YouTube.
     * Zwei Längenklassen tragen an der Sehdauer je drei Videos, an der
     * YouTube-Durchsicht steht weiter nur eine da.
     */
    console.log(
      `\n  Zwei Längenklassen tragen an TikToks Sehdauer je ${GENUG_JE_KLASSE} Videos ` +
        `(${belegtTikTok.join(', ')}).\n` +
        '  Das ist der erste Vergleich über Längen, den dieses Projekt hat — und ein\n' +
        '  Fingerzeig, keine Erkenntnis: Drei Videos je Klasse ist die Untergrenze,\n' +
        '  nicht das Maß. An der YouTube-Durchsicht steht weiter nur eine Klasse da.',
    );
  } else if (belegteKlassen.length < 2) {
    console.log(
      `\n  Nur eine Längenklasse ist belegt (${belegteKlassen[0] ?? 'keine'}). Damit lässt sich\n` +
        '  über Länge nichts sagen — auch nicht vorsichtig. Das Längenfenster ist bis\n' +
        '  dahin ein Versuchsaufbau und keine Erkenntnis: Es wurde gespreizt, damit es\n' +
        `  etwas zu messen gibt. Es fällt, sobald eine zweite Klasse\n  ${GENUG_JE_KLASSE} gemessene Videos trägt.`,
    );
  } else {
    console.log(
      '\n  Die Verweildauer ist die Zahl, an der entschieden wird. Die Durchsicht sinkt\n' +
        '  mit der Länge zwangsläufig — wer Längen an Prozenten vergleicht, hat sich für\n' +
        '  das kürzere Video entschieden, bevor er hingesehen hat.',
    );
  }
};

main().catch((fehler) => {
  console.error('\n✗ ' + (fehler instanceof Error ? fehler.message : String(fehler)));
  process.exit(1);
});
