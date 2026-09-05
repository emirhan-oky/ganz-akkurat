import { GEPARKT } from '../daten/entwuerfe';
import { laufPruefen } from './pruefung';
import { SENDEPLAETZE } from './buffer';
import type { Quelle, Short } from './typen';
import type { Verlaufslauf } from './verlauf';
import { rueckblickLesenSync } from './rueckschau';

/**
 * Die fuenf Shorts einer Sendewoche auswaehlen.
 *
 * ## Warum das ein Programm braucht
 *
 * Eine Woche muss **drei Bedingungen gleichzeitig** erfuellen, und sie ziehen
 * gegeneinander:
 *
 * - **Format** — keines zweimal hintereinander, keines ueber der Haelfte. Bei
 *   fuenf Shorts und vier Formaten laeuft genau eines doppelt.
 * - **Bauform** — hoechstens zwei je Bauform. Bei fuenf ergibt das **2/2/1**,
 *   und das ist die einzige zulaessige Aufteilung.
 * - **Sachgebiet** — hoechstens zwei je Gebiet, also mindestens drei
 *   verschiedene.
 *
 * Am 04.09.2026 hat eine Suche ueber 4.000 Kombinationen von Hand nichts
 * gefunden, obwohl 48 Entwuerfe bereitlagen. Das ist keine Handarbeit mehr.
 *
 * ## Der doppelte Platz geht an den groessten Vorrat
 *
 * Emirhans Regel, und sie reguliert sich selbst: Heute bekommt „Das gibt es
 * wirklich" den zweiten Platz (21 Entwuerfe), schrumpft der, wandert er von
 * allein weiter. **„Es war einmal" bekommt ihn nie**, solange es der kleinste
 * Vorrat ist — genau das Format, das mit zwei Entwuerfen am Limit steht.
 *
 * ## Was diese Funktion nicht tut
 *
 * Sie **entscheidet nicht, was gut ist.** Sie findet, was die Regeln erlauben,
 * und nimmt unter den gueltigen Kombinationen die erste. Welcher Short stark
 * genug ist, steht nicht im Schema — das bleibt die Freigabe.
 *
 * Und sie **schreibt keinen Code**: `WOCHENLAUF` in `daten/entwuerfe/index.ts`
 * bleibt die Liste von Hand. Der Wochenlauf umgeht sie mit
 * `--auswahl=automatisch` zur Laufzeit.
 */
export type Wochenauswahl = {
  shorts: Short[];
  /** Wie viele volle Wochen der Vorrat nach dieser noch traegt. */
  reichweiteWochen: number;
  /** Woran es klemmt, wenn nichts gefunden wurde. */
  grund?: string;
  /** Der Vorrat **ohne** das, was schon draussen ist — die Zahl, die zaehlt. */
  frisch: Short[];
};

/** Wie viele Shorts eine Woche traegt — die Zahl der Sendeplaetze. */
const PRO_WOCHE = SENDEPLAETZE.length;

/**
 * Wie viele Wochen der Vorrat noch traegt, gerechnet am **knappsten**
 * Bestandteil.
 *
 * Nicht „48 Entwuerfe durch fuenf". Die Bauformregel laesst hoechstens zwei
 * Zitatkarten je Woche zu, also braucht jede Woche drei Videos, die keine sind
 * — und davon gibt es dreizehn. Am 04.09.2026 hiess das: vier Wochen, waehrend
 * die naive Rechnung neun ergab.
 */
export const reichweiteInWochen = (vorrat: Short[]): number => {
  const jeBauform = new Map<string, number>();
  for (const s of vorrat) jeBauform.set(s.bauform, (jeBauform.get(s.bauform) ?? 0) + 1);

  const maxJeBauform = Math.floor(PRO_WOCHE / 2);
  const nichtGedeckelt = [...jeBauform.values()].reduce((s, n) => s + Math.min(n, maxJeBauform), 0);
  // Was die gedeckelten Bauformen je Woche beisteuern koennen, gegen den Bedarf.
  const proWocheMoeglich = Math.min(PRO_WOCHE, nichtGedeckelt);
  if (proWocheMoeglich <= 0) return 0;

  /*
   * Die Grenze ist die Bauform, die am haeufigsten gebraucht wird und am
   * seltensten da ist. Gerechnet wird sie als „wie oft laesst sich der Deckel
   * fuellen": Jede Woche braucht `PRO_WOCHE` Shorts, aber nie mehr als
   * `maxJeBauform` je Bauform.
   */
  let wochen = 0;
  const rest = new Map(jeBauform);
  for (;;) {
    let genommen = 0;
    for (const [b, n] of rest) {
      if (genommen >= PRO_WOCHE) break;
      const nehmen = Math.min(n, maxJeBauform, PRO_WOCHE - genommen);
      if (nehmen <= 0) continue;
      rest.set(b, n - nehmen);
      genommen += nehmen;
    }
    if (genommen < PRO_WOCHE) break;
    wochen += 1;
    if (wochen > 200) break;
  }
  return wochen;
};

/**
 * Sucht eine gueltige Woche.
 *
 * Die Suche ist absichtlich stumpf: Formatmuster durchgehen, je Muster die
 * Kandidaten in Vorratsreihenfolge durchprobieren, jede Kombination durch
 * `laufPruefen` schicken und die erste fehlerfreie nehmen. Kein Optimieren —
 * es gibt nichts zu optimieren, solange „gut" nicht im Schema steht.
 */
export const wochenAuswaehlen = (
  quellen: Quelle[],
  verlauf: Verlaufslauf[] = [],
  vorrat: Short[] = GEPARKT,
): Wochenauswahl => {
  /*
   * **Was draussen ist, kommt nicht wieder — und der Verlauf allein reicht
   * dafuer nicht.**
   *
   * `verlauf.json` haelt, was ein **Wochenlauf** gesendet hat. Es fehlen darin
   * die Shorts, die ueber einen Teillauf oder mit `--ton-behalten`
   * hinausgingen: „Verlauf unberuehrt — diese Woche steht schon im Verlauf".
   * Am 05.09.2026 schlug die Auswahl deshalb drei Shorts vor, die laengst
   * draussen waren; der Verlauf kannte nur einen davon.
   *
   * `daten/rueckblick.json` weiss es besser: Dort steht, was Zahlen hat, und
   * Zahlen hat nur, was gesendet wurde. **Die verlaesslichste Quelle fuer
   * „schon draussen" ist die, die misst.**
   */
  const gesendet = new Set<string>([
    ...verlauf.flatMap((l) => l.shorts.map((s) => s.themaId)),
    ...Object.keys(rueckblickLesenSync()),
  ]);
  const frisch = vorrat.filter((s) => !gesendet.has(s.id) && !gesendet.has(s.themaId));
  const reichweite = reichweiteInWochen(frisch);
  vorrat = frisch;

  const jeFormat = new Map<string, Short[]>();
  for (const s of vorrat) {
    if (!jeFormat.has(s.format)) jeFormat.set(s.format, []);
    jeFormat.get(s.format)!.push(s);
  }
  const nachVorrat = [...jeFormat.entries()].sort((a, b) => b[1].length - a[1].length);
  if (nachVorrat.length < 2) {
    return { shorts: [], reichweiteWochen: reichweite, frisch, grund: 'Weniger als zwei Formate im Vorrat.' };
  }

  const doppelt = nachVorrat[0]![0];
  const uebrige = nachVorrat.slice(1).map(([f]) => f);

  /*
   * Die Stellen, an denen das doppelte Format stehen darf — nie zwei
   * hintereinander. Mehr Muster als noetig schaden nicht: Die Pruefung
   * entscheidet, nicht die Liste.
   */
  const stellen = [
    [0, 2], [0, 3], [0, 4], [1, 3], [1, 4], [2, 4],
  ];

  for (const [a, b] of stellen) {
    const folge: string[] = new Array(PRO_WOCHE).fill('');
    folge[a!] = doppelt;
    folge[b!] = doppelt;
    let k = 0;
    for (let i = 0; i < PRO_WOCHE; i++) {
      if (folge[i] === '') folge[i] = uebrige[k++ % uebrige.length]!;
    }

    /*
     * Je Position ein Zeiger in den Vorrat des jeweiligen Formats. Hochgezaehlt
     * wird von hinten, wie bei einem Kilometerzaehler — so kommen zuerst die
     * Kombinationen dran, die vorn den ersten Kandidaten behalten.
     */
    const zeiger = new Array(PRO_WOCHE).fill(0);
    const grenzen = folge.map((f) => Math.min((jeFormat.get(f) ?? []).length, 8));
    if (grenzen.some((g) => g === 0)) continue;

    for (let versuch = 0; versuch < 3000; versuch++) {
      const benutzt = new Set<string>();
      const liste: Short[] = [];
      let vollstaendig = true;

      for (let i = 0; i < PRO_WOCHE; i++) {
        const kandidaten = jeFormat.get(folge[i]!)!;
        let gewaehlt: Short | undefined;
        for (let t = 0; t < kandidaten.length; t++) {
          const c = kandidaten[(zeiger[i]! + t) % kandidaten.length]!;
          if (!benutzt.has(c.id)) { gewaehlt = c; break; }
        }
        if (!gewaehlt) { vollstaendig = false; break; }
        benutzt.add(gewaehlt.id);
        liste.push(gewaehlt);
      }

      if (vollstaendig) {
        const ergebnis = laufPruefen(liste, quellen, verlauf);
        if (ergebnis.fehler.length === 0) return { shorts: liste, reichweiteWochen: reichweite, frisch };
      }

      for (let i = PRO_WOCHE - 1; i >= 0; i--) {
        zeiger[i] = (zeiger[i]! + 1) % grenzen[i]!;
        if (zeiger[i] !== 0) break;
      }
    }
  }

  return {
    shorts: [],
    reichweiteWochen: reichweite,
    frisch,
    grund:
      `Keine gültige Woche aus ${vorrat.length} Entwürfen. Häufigste Ursache ist die ` +
      'Bauformregel: Bei fünf Shorts sind höchstens zwei je Bauform erlaubt, es braucht also ' +
      'drei Videos, die keine Zitatkarte sind.',
  };
};
