import { KontextArt, type Szene } from './typen';

/**
 * Welches Situationssymbol zu einer Szene passt.
 *
 * Die Symbole sind am 13.08.2026 dazugekommen und haben die Videos deutlich
 * besser gemacht — aber sie standen auf zwei von fuenf Shorts, weil ich sie
 * dort von Hand gesetzt hatte. Genau so etwas laeuft nach drei Wochen aus:
 * Was jemand bei jedem Entwurf neu bemerken muss, bemerkt er irgendwann
 * nicht mehr, und dann sind die Symbole eine Erinnerung an eine gute Woche.
 *
 * **Ein Vorschlag, keine Zuweisung.** Die Ableitung schreibt nichts still in
 * den Short. Sie erscheint als Hinweis in der Pruefung, und die Entscheidung
 * steht danach als Wert im Entwurf. Der Grund steht in CLAUDE.md an der
 * Kopfzeilen-Pille: Ein stiller Rueckfall an einer Stelle, die im fertigen
 * Video sichtbar ist, faellt niemandem auf — er sieht ja aus wie eine
 * Entscheidung.
 *
 * Warum Vorschlaege hier ueberhaupt zulaessig sind, `geraet` aber nie
 * vorgeschlagen wird: Ein Symbol behauptet nichts, das falsch sein koennte.
 * Ein automatisch gesetztes Dock waere eine technische Aussage ohne Beleg.
 */

/**
 * Wortfelder je Symbol.
 *
 * Bewusst breit und ohne Wortgrenze am Ende: „flieg" faengt fliegst, Flug,
 * Fluggesellschaft. Die Praezision kommt nicht aus engen Mustern, sondern
 * aus der Bewertung weiter unten — ein einzelner Treffer reicht nicht.
 */
const WORTFELDER: Record<KontextArt, readonly RegExp[]> = {
  flugzeug: [/\bflieg/i, /\bflug/i, /\bgate\b/i, /\bluftfahrt/i, /\bhandgepäck/i, /\bbord\b/i],
  koffer: [/\bkoffer/i, /\bgepäck/i, /\baufgegeben/i, /\bpack/i, /\bunterwegs/i, /\breise/i],
  gesetzbuch: [
    /\bgesetz/i,
    /\bbürgerlich/i,
    /\bparagraf/i,
    /\bvorschrift/i,
    /\bhaftung/i,
    /\bgewährleistung/i,
    /\bgarantie/i,
  ],
  kassenbon: [/\bgekauft\b/i, /\bkaufdatum/i, /\brechnung/i, /\bverkäufer/i, /\bquittung/i, /\bbon\b/i],
  steckdose: [/\bsteckdose/i, /\bstrom\b/i, /\bnetzteil/i, /\bwatt/i, /\bvolt/i, /\bampere/i],
  nachbarhaeuser: [/\bnachbar/i, /\bstraße\b/i, /\bhaus\b/i, /\bwohnung/i, /\bteilen\b/i, /\balle\b/i],
  uhr: [/\babends?\b/i, /\bvormittags?\b/i, /\buhrzeit/i, /\bgegen acht\b/i, /\btageszeit/i, /\bjeden abend/i],
  kalender: [/\bjahr\b/i, /\bjahre\b/i, /\bfrist/i, /\bmonate?n?\b/i, /\bzwei jahre/i, /\bab dem\b/i],
};

/** Szenenarten, die ueberhaupt eine Illustration tragen koennen (siehe `mitIllustration`). */
const TRAEGT_ILLUSTRATION = new Set<Szene['art']>(['hook', 'aussage', 'zahl', 'einschraenkung']);

/**
 * Alles, was in einer Szene gesprochen oder gezeigt wird — die Grundlage der
 * Ableitung. Der Sprechtext allein reichte nicht: Beim Reise-Short steht das
 * Handgepaeck in der Kontext-Pille der Hook und nicht im Satz darunter.
 */
const szenentext = (szene: Szene): string =>
  Object.values(szene)
    .flatMap((wert) =>
      typeof wert === 'string' ? [wert] : Array.isArray(wert) ? wert.map((x) => JSON.stringify(x)) : [],
    )
    .join(' ');

/**
 * Das passende Symbol — oder `null`, wenn die Szene keins braucht.
 *
 * Zwei Treffer sind das Mindeste, und der Abstand zum zweitbesten Symbol
 * entscheidet. Ein einzelnes Wort reicht nicht: „Beim Kauf" in einem
 * Reise-Short soll keinen Kassenbon herbeirufen, und der Powerbank-Short
 * spricht tatsaechlich vom Kaufen („bevor du sie kaufst"). Bei Gleichstand
 * lieber nichts — ein zweideutiges Bild ist schlechter als keins.
 */
export const symbolvorschlag = (szene: Szene): KontextArt | null => {
  if (!TRAEGT_ILLUSTRATION.has(szene.art)) return null;

  const text = szenentext(szene);
  const werte = KontextArt.options.map((art) => ({
    art,
    treffer: WORTFELDER[art].filter((muster) => muster.test(text)).length,
  }));

  const [bester, zweiter] = werte.sort((a, b) => b.treffer - a.treffer);
  if (!bester || bester.treffer < 2) return null;
  if (zweiter && zweiter.treffer === bester.treffer) return null;
  return bester.art;
};

/**
 * Szenen, denen ein Symbol fehlt, das sich aus ihrem Text ergibt.
 *
 * Uebersprungen wird, was schon eine Illustration hat — ein gesetztes
 * `geraet` ist immer die staerkere Wahl, weil es die Sache selbst zeigt und
 * nicht ihren Ort. Vorgeschlagen wird nur, wo nichts steht.
 */
export const fehlendeSymbole = (
  szenen: readonly Szene[],
): { index: number; art: Szene['art']; symbol: KontextArt }[] =>
  szenen.flatMap((szene, index) => {
    const hat = szene as { geraet?: unknown; symbol?: unknown };
    if (hat.geraet || hat.symbol) return [];
    const symbol = symbolvorschlag(szene);
    return symbol ? [{ index, art: szene.art, symbol }] : [];
  });
