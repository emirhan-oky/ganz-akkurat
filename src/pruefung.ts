import { AUSRUFE,
  BAUFORMEN,
  KALTSTART_ARTEN,
  SCHLUSSFORMELN,
  type Bauform,
  MACHARTEN,
  UNBETEILIGTE_ARTEN,
  Format,
  FORMATE,
  Sachgebiet,
  SACHGEBIETE,
  type KontextArt,
  type Quelle,
  type Short,
  type Szene,
  FIGURENNAMEN,
  type Sprecher,
  ZUGARTEN,
  type Zug,
  GESPRAECHSBOEGEN,
} from './typen';
import { gelaufeneThemen, type Verlaufslauf } from './verlauf';
import {
  geschaetzteDauerSek,
  geschaetzteInhaltSek,
  vorspannSek,
  laengenklasseVon,
  LAENGE_SEK,
  ZEICHEN_PRO_SEKUNDE,
  redebloecke,
  zielfenster,
} from './zeit';

/**
 * Qualitaetspruefung vor der Freigabe.
 *
 * Die Pruefung ist bewusst streng und kennt zwei Stufen: **Fehler** halten
 * einen Short zurueck, **Hinweise** erscheinen nur in der Freigabe-Uebersicht.
 * Alles, was rechtlich oder handwerklich nicht verhandelbar ist — Belegpflicht,
 * Kennzeichnung, Plattformgrenzen — ist ein Fehler.
 */

export type Befund = {
  stufe: 'fehler' | 'hinweis';
  shortId: string;
  regel: string;
  text: string;
};

/**
 * Wendungen, die eine eigene Produkterfahrung behaupten.
 *
 * Bewusst eng gefasst: „zum Test tauschen" ist eine Diagnoseanweisung an den
 * Zuschauer und keine Behauptung. Erst die erste Person oder das Perfekt
 * macht daraus eine Erfahrungsaussage, die belegt sein muesste.
 */
const ERFAHRUNGSBEHAUPTUNG =
  /\b(getestet|ausprobiert|selbst benutzt|benutze ich|nutze ich|im dauereinsatz|meiner erfahrung|wir haben .{0,24}(getestet|ausprobiert))\b/i;

/**
 * Ein Inhalt darf nur „Test" heissen, wenn das Produkt selbst benutzt wurde.
 * Reine Quellenvergleiche heissen „Vergleich", „Kompatibilitaetscheck" oder
 * „Kaufhilfe". Diese Regel gilt fuer die Veroeffentlichungstitel.
 */
const TITEL_ALS_TEST = /\b(test|testbericht|getestet|im praxistest)\b/i;

/**
 * Verweise aus dem Video heraus.
 *
 * Sobald das Video selbst auf die Beschreibung zeigt, ist es kommerzielle
 * Kommunikation und braucht das Label im Bild. Solange die Links nur unten
 * stehen, bleibt es Information — deshalb ist das hier ein Fehler und kein
 * Geschmacksurteil.
 */
const VERWEIS_NACH_DRAUSSEN =
  /(angehefte|link in bio|im profil|in der beschreibung|unten verlinkt|siehe beschreibung)/i;

/**
 * Zubehoermarken, die im Video nicht fallen duerfen.
 *
 * Das ist die Regel, auf der das ganze Werbemodell steht: Nennt ein Video
 * kein Produkt, sondern nur Merkmale, dann bewirbt es nichts und braucht
 * kein Label — die Kennzeichnung sitzt am Link in der Beschreibung.
 *
 * Bewusst **nur Zubehoermarken**. Geraetehersteller wie Apple, Dell oder
 * Lenovo stehen absichtlich nicht drin: „bei einem MacBook mit M1" ist der
 * Kontext des Zuschauers, keine Empfehlung. Die Liste ist unvollstaendig und
 * soll wachsen — und „Anker" ist im Deutschen auch ein normales Wort, das
 * hier zu einem Fehlalarm fuehren kann.
 */
export const ZUBEHOERMARKEN =
  /\b(anker|ugreen|belkin|caldigit|satechi|baseus|delock|startech|targus|kensington|elgato|sonnet|owc|aukey|ravpower|inateck|sabrent|orico|plugable|j5create|hyperdrive|lindy|club3d|cable ?matters|raidsonic|icy ?box|sharkoon|corsair)\b/i;

/**
 * Hashtags, die nur Reichweite erbitten.
 *
 * `#fyp` beeinflusst die For-You-Page nicht — das steht so in
 * `hashtag-strategy`, und TikTok deprioritisiert die 30-Tag-Spray ohnehin.
 * Ein Tag, der nichts kategorisiert, sondern „bitte zeigt mich" sagt, steht
 * neben einer Quellenangabe wie eine Bitte um Aufmerksamkeit.
 */
export const REICHWEITENTAGS = [
  'fyp', 'fürdich', 'fuerdich', 'foryou', 'foryoupage', 'viral', 'viralvideo',
  'trending', 'explore', 'explorepage', 'reichweite', 'algorithmus',
];

/**
 * Tags, unter denen die Zielgruppe wirklich browst — je Plattform.
 *
 * **Die Listen sind absichtlich leer.** `hashtag-strategy` verlangt als
 * dritten Schritt, die Tagseite vor der Verwendung anzusehen: Sind die
 * obersten Beitraege von der Art? Gibt es echtes Publikum? Ist sie von Spam
 * ueberrannt? Das kann kein Skript, und aus dem Gedaechtnis eine Groesse zu
 * behaupten waere derselbe Fehler wie bei `ZEICHEN_PRO_SEKUNDE` und der
 * Denkpause — beide standen zweimal auf einer Annahme, bis jemand nachgemessen
 * hat.
 *
 * Kandidaten zum Ansehen, je zwei Minuten auf der Plattform:
 * TikTok `#techtok`, `#lernenmittiktok`, `#wissenauftiktok`;
 * Instagram `#technikwissen`, `#wissenswert`, `#erklaert`;
 * YouTube `#technikwissen`, `#wissen`.
 *
 * Was die Sichtung uebersteht, kommt hier hinein — mit dem Datum, wie
 * `geprueftAm` bei den Quellen. Solange eine Liste leer ist, schweigt die
 * Regel dazu: Eine Wache, die eine leere Liste erzwingt, hielte jeden Short
 * zurueck.
 */
export const GEMEINSCHAFTSTAGS: Record<string, readonly string[]> = {
  tiktok: [],
  instagram: [],
  youtube: [],
};

/**
 * Tags, die zu breit sind, um zu tragen.
 *
 * Mid-Tier schlaegt Mega-Tag, weil man dort ueberhaupt sichtbar wird — unter
 * `#technik` verschwindet ein neuer Beitrag in Sekunden. **Hinweis, kein
 * Fehler:** Die Grenze zwischen breit und mittel ist eine Einschaetzung und
 * keine Tatsache, und ein breiter Tag schadet nicht, er bringt nur nichts.
 */
export const BREITE_TAGS = [
  'technik', 'tech', 'technology', 'wissen', 'news', 'tipps', 'tipp',
  'lifehack', 'lifehacks', 'gadgets', 'digital',
];

/** Der Markentag. Genau einer, in jedem Short, auf jeder Plattform. */
export const MARKENTAG = 'ganzakkurat';

/**
 * Kennzeichnungswoerter, die am Partnerlink stehen muessen.
 *
 * Bewusst nur diese drei. „Affiliate-Link", „sponsored by" und „gesponsert"
 * hat der BGH als unscharfe Angaben verworfen (Urteil vom 06.02.2014,
 * I ZR 2/11) — sie erklaeren den werblichen Charakter nicht, sie umschreiben
 * ihn. Wer sie benutzt, hat nicht gekennzeichnet.
 */
const KENNZEICHNUNGSWORT = /\b(werbung|anzeige|werbepartner)\b/i;

/**
 * Technische Zahl mit Einheit.
 *
 * Grundregel seit dem 13.08.2026: Eine gesprochene Zahl ist eine Behauptung,
 * eine gezeigte Zahl ist ein Beleg. „Hundert Wattstunden" hoert man und
 * vergisst es — steht es da, hat der Zuschauer es.
 *
 * Bewusst **nur technische** Einheiten. Zeitangaben fehlen absichtlich:
 * „In 20 Sekunden weisst du es" ist der Bau des Titelmusters `uhr` und keine
 * technische Angabe, die ins Bild muesste.
 */
const ZAHL_MIT_EINHEIT =
  /\b\d+(?:[.,]\d+)?\s?(wh|wattstunden?|w(?:att)?|v(?:olt)?|a(?:mpere)?|mah|gb|tb|mb|hz|khz|ghz|zoll|mbit|gbit|%|prozent|euro|€)\b/i;

/** Szenenarten, die eine Zahl sichtbar machen. */
const ZEIGT_ZAHLEN = new Set<string>(['zahl', 'herleitung']);

/**
 * Felder, die zwar Zeichenketten enthalten, aber nie gesprochen oder gezeigt
 * werden.
 *
 * `quelleId` ist eine Kennung, kein Text. Am 14.08.2026 hielt die
 * `produktname`-Regel den Dock-Short zurueck, weil in einer Szene
 * `quelleId: 'plugable-altmode'` stand und „plugable" in `ZUBEHOERMARKEN`
 * steht. Im Video faellt der Name nie — er zeigt auf die Quelle, und Quellen
 * *sind* oft Hersteller. Die Regel prueft, was der Zuschauer hoert und sieht;
 * eine Kennung gehoert nicht dazu.
 *
 * `geraet` und `symbol` sind aus demselben Grund ausgenommen: Sie waehlen
 * eine Zeichnung aus, sie sind kein Text.
 */
const KEIN_SICHTBARER_TEXT = new Set(['quelleId', 'geraet', 'symbol', 'art']);

/** Alle Zeichenketten einer Szene — Sprechtext wie sichtbarer Text. */
const textwerte = (wert: unknown): string[] =>
  typeof wert === 'string'
    ? [wert]
    : Array.isArray(wert)
      ? wert.flatMap(textwerte)
      : wert && typeof wert === 'object'
        ? Object.entries(wert)
            .filter(([schluessel]) => !KEIN_SICHTBARER_TEXT.has(schluessel))
            .flatMap(([, v]) => textwerte(v))
        : [];

/* ───────────────────────────── Titel ─────────────────────────────── */

/**
 * Der Witz darf den Zuschauer nicht treffen.
 *
 * Das ist keine Geschmacksregel, sondern dieselbe wie „Entwarnung statt
 * Konfrontation" — nur fuer die Pointe. Ein Kanal, der jemandem erklaert, was
 * er nicht wusste, darf ihn dafuer nicht auslachen. Die Pointe trifft die
 * Sache, die Situation oder eine Institution; nie den, der es nicht wusste.
 *
 * Gefangen werden nur die eindeutigen Faelle. Wer den Zuschauer beilaeufig
 * herabsetzt, kommt hier durch — dagegen hilft nur Lesen.
 */
const KONFRONTATION =
  /\b(du machst (es )?(alles )?falsch|dein fehler|falsch gemacht|machst du falsch|du bist schuld|selbst schuld|jeder macht diesen fehler)\b/i;

/**
 * Lauter Titel: Ausrufezeichen und Emojis.
 *
 * Der Kanal lebt von der belegten Aussage, und Glaubwuerdigkeit ist das
 * Einzige, was er zu verkaufen hat. Ein Titel, der schreit, gibt davon etwas
 * aus, bevor das Video etwas verdient hat. Der Witz dieses Kanals ist die
 * Untertreibung — und Untertreibung mit Ausrufezeichen gibt es nicht.
 */
const LAUT = /[!\p{Extended_Pictographic}]/u;

/**
 * Grossgeschriebene Woerter, die trotzdem keine Sache benennen.
 *
 * Deutsch schreibt Substantive gross — damit lassen sich die Sachwoerter
 * eines Titels ohne Woerterbuch herausziehen. Zwei Faelle stoeren dabei:
 * Satzanfaenge und die Anredefuerwoerter. Beide stehen hier.
 *
 * Die Liste darf kurz bleiben. Sie muss nicht jedes Funktionswort kennen,
 * sondern nur die, die am Satzanfang eines Titels vorkommen — und Titel
 * fangen fast immer gleich an.
 */
const KEINE_SACHWOERTER = new Set([
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'eines',
  'dein', 'deine', 'deinen', 'deinem', 'deiner', 'du', 'dir', 'dich', 'ihr', 'ihre', 'sie', 'es',
  /*
   * Am 16.08.2026 dazugekommen: Konjunktionen und Adverbien, die am
   * Titelanfang stehen und dort grossgeschrieben werden. „Weder Leitung noch
   * Router sind schuld" meldete „weder" als Sachwort, das im Video fehle —
   * ein Fehlalarm, der den Short zurueckhielt. Die Regel selbst bleibt
   * richtig: Was der Titel nennt, muss im Video vorkommen.
   */
  'weder', 'wenn', 'wann', 'warum', 'wieso', 'wie', 'was', 'wer', 'wo', 'wohin', 'welche',
  'welcher', 'welches', 'ohne', 'mit', 'nach', 'vor', 'bei', 'seit', 'trotz', 'statt',
  'und', 'oder', 'aber', 'doch', 'denn', 'also', 'nur', 'noch', 'schon', 'kein', 'keine',
  'keinen', 'nicht', 'jeder', 'jede', 'alle', 'mein', 'meine', 'so', 'dann', 'darum',
  'und', 'oder', 'aber', 'denn', 'nur', 'auch', 'noch', 'schon', 'nicht', 'kein', 'keine', 'keinen',
  'am', 'an', 'auf', 'aus', 'bei', 'bis', 'durch', 'fuer', 'für', 'in', 'im', 'mit', 'nach', 'ohne',
  'seit', 'um', 'von', 'vor', 'zu', 'zum', 'zur', 'ueber', 'über', 'unter', 'gegen', 'ins',
  /*
   * Am 17.08.2026 nachgetragen: verschmolzene Praepositionen. „Vom Wohnzimmer
   * auf den Cloud-Server" meldete „vom" als fehlendes Sachwort — derselbe
   * Fehlalarm wie „weder" tags zuvor und aus demselben Grund: Am Titelanfang
   * steht das Funktionswort gross da und sieht fuer die Regex aus wie ein
   * Substantiv. Die Liste waechst an genau dieser Kante weiter, und das ist
   * in Ordnung — die Alternative waere eine Wortartenerkennung fuer einen
   * Titel von acht Woertern.
   */
  'vom', 'beim', 'ans', 'aufs', 'fuers', 'fürs', 'uebers', 'übers', 'unterm', 'hinter', 'neben',
  /*
   * Am 06.09.2026 nachgetragen: die Personalpronomen der ersten Person.
   * Dieselbe Kante, diesmal am **Kaltstart**. „Ich habe nichts zu verbergen.
   * Bei mir ist nichts zu holen." lieferte als einzige Sachwoerter „ich" und
   * „bei" — die Bruecke in die erste Szene haengt dann an einem Funktionswort,
   * und der Hinweis meldete „kein Wort kommt wieder vor", obwohl „verbergen"
   * und „holen" woertlich wiederkehren.
   *
   * **Ein Kaltstart ohne Substantiv ist kein Fehler**, sondern der Normalfall
   * bei einer Figur, die ueber sich selbst redet. Ohne Sachwort schweigt die
   * Wache (`bruecke.length > 0`) — und schweigen ist richtiger, als auf ein
   * „ich" zu zeigen.
   */
  'ich', 'mir', 'mich', 'meinem', 'meinen', 'meiner', 'meins',
  'also', 'dann', 'jetzt', 'hier', 'so', 'wenn', 'weil', 'bevor', 'obwohl', 'was', 'wie', 'warum',
  'ist', 'sind', 'war', 'hat', 'haben', 'wird', 'werden', 'kann', 'koennen', 'können', 'muss',
  // Verben am Satzanfang — Titel beginnen oft mit einer Aufforderung.
  'schau', 'nimm', 'merk', 'rechne', 'frag', 'hol', 'pack', 'prüf', 'pruef', 'sag', 'denk',
  'kauf', 'spar', 'vergiss', 'geh', 'gilt', 'liegt', 'lädt', 'laedt', 'steht', 'stehen', 'zählt',
  'zaehlt', 'zählen', 'zaehlen', 'brauchst', 'weißt', 'weisst',
  // Fuellwoerter, die eine Sache vortaeuschen, ohne eine zu benennen.
  'sache', 'ding', 'dinge', 'grund', 'sachen', 'trick', 'fehler', 'problem', 'tipp', 'tipps',
]);

/** Titeltext ohne Satzzeichen und Kleinschreibung — fuer den Vergleich mit der Hook. */
const ohneSatzzeichen = (text: string): string =>
  text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();

/**
 * Die Sachwoerter eines Textes — was er tatsaechlich benennt.
 *
 * Grossschreibung ist das Sieb, `KEINE_SACHWOERTER` faengt die Ausreisser.
 * Zusammensetzungen mit Bindestrich zaehlen als ein Wort: „USB-C-Anschluss"
 * ist eine Sache und nicht drei. Rueckgabe kleingeschrieben und ohne
 * Dubletten, damit sich zwei Texte vergleichen lassen.
 */
const sachwoerter = (text: string): string[] => {
  const treffer = text.match(/\b\p{Lu}[\p{L}\d]*(?:-[\p{L}\d]+)*/gu) ?? [];
  const gefunden = treffer
    .map((w) => w.toLowerCase())
    .filter((w) => w.length >= 3 && !KEINE_SACHWOERTER.has(w));
  return [...new Set(gefunden)];
};

/**
 * Ob ein Sachwort im Video vorkommt.
 *
 * Deutsche Zusammensetzungen machen den direkten Vergleich unbrauchbar: Der
 * Titel sagt „USB-C-Anschluss", das Video sagt „Anschluss"; der Titel sagt
 * „2,4-GHz-Band", das Video sagt „Band". Deshalb genuegt ein Bestandteil ab
 * vier Zeichen. Das ist grosszuegig und soll es sein — die Regel faengt
 * erfundene Titel, nicht ungeschickte.
 */
const kommtImVideoVor = (wort: string, videotext: string): boolean =>
  [wort, ...wort.split('-')]
    .filter((teil) => teil.length >= 4)
    .some((teil) => videotext.includes(teil));

/*
 * **Die Sperre ist am 31.08.2026 zweimal umgezogen — und der Weg ist die
 * eigentliche Lehre.**
 *
 * *Bis dahin:* `zeigen`, `erklaeren`, `achselzucken` waren gesperrt, weil
 * sie im Wortwechsel eine Hand auf das andere Gehaeuse legten. Gemessen
 * am 26.08.2026 in `Wortwechselprobe`, und richtig — fuer die damalige
 * Anordnung.
 *
 * *Vormittags:* Die Anordnung ging von voller Groesse auf 0,75, weil
 * beide Figuren am Bildrand ihre aeussere Hand verloren; die Luecke in
 * der Mitte wuchs dabei von 1,6 auf 20,2 Einheiten. Die drei Posen
 * greifen seither nicht mehr hinueber, **die Sperre fiel.**
 *
 * *Abends:* Drei **andere** Posen ragten aus dem Bild, und zwar zwei
 * davon schon vorher. Die Kantenrechnung lief gegen die **Ruhepose** —
 * `achselzucken` reicht aber 76,7 Einheiten nach aussen statt 52.
 *
 * ## Was daraus folgt
 *
 * **Die Liste hier ist abgeleitet und nicht geschrieben.**
 * `zuBreiteWortwechselposen` in `Buehnenbild.tsx` rechnet sie aus der
 * Anordnung und `AUSSENREICHWEITE` in `posen.ts`;
 * `skripte/schemapruefung.ts` haelt beide gegeneinander und meldet jede
 * Abweichung. Ohne diese Wache waere es die dritte handgeschriebene
 * Liste in einer Woche, und jede der beiden vorigen war irgendwann
 * still falsch.
 *
 * ## Die Grenze ist geometrisch und nicht verhandelbar
 *
 * Zwei Figuren nebeneinander brauchen `228,8 x groesse + luecke` von 200
 * Einheiten. Wer beide Arme ausbreitet, braucht noch einmal 50 mehr. Das
 * geht bei **keiner** Groesse auf: Bei 0,70 bliebe eine Luecke von 1,8
 * Einheiten, und bei 10,5 lag die Hand schon auf dem fremden Gehaeuse.
 *
 * `staunen`, `achselzucken` und `hochschauen` bleiben deshalb Posen fuer
 * **eine** Figur im Bild. Sie sind nicht schlechter geworden — sie
 * brauchen Platz, den es zu zweit nicht gibt.
 */
export const ZU_BREIT_IM_WORTWECHSEL = new Set(['achselzucken']);

/**
 * Posen, die **mit einem Symbol daneben** aus dem Bild ragen.
 *
 * Die Figur steht dann links auf x = 52, und die Kamera faehrt auf ein engeres
 * Feld — am Ende der Fahrt von −2,9 bis 178,9. Wer weiter als 55 Einheiten
 * nach aussen reicht, verliert seine Hand.
 *
 * **Der Anlass ist ein Arm, der am Ellenbogen endete.** Im Aufschlag von
 * `passwort-wechseln` stand Watti in `staunen` neben einem Browserfenster; im
 * fertigen Video fehlte seine linke Hand. `npm run bildrand` war dabei gruen,
 * und konnte es auch sein: Die Probe misst die aeusserste dunkle Spalte, und
 * das war der Ellenbogen. **Was jenseits des Randes fehlt, sieht keine
 * Randmessung.**
 *
 * Wie drueben ist die Liste **abgeleitet und nicht geschrieben** —
 * `zuBreiteSymbolposen` rechnet sie aus `AUSSENREICHWEITE` und dem
 * Kameraziel, `skripte/schemapruefung.ts` haelt beide gegeneinander.
 */
export const ZU_BREIT_MIT_SYMBOL = new Set(['staunen', 'achselzucken', 'hochschauen']);

/**
 * Posen, die **im Schluss** aus dem Bild ragen — die dritte Sperre derselben
 * Bauart, seit dem 04.09.2026.
 *
 * **Der Anlass ist Emirhans Satz zum fertigen Video:** „Manchmal ist Wattis
 * Hand links aus dem Bild." Die Ursache stand in einem Kommentar, der sich
 * selbst widerlegt: `WORTWECHSEL_SCHLUSS` steht auf 0,92 statt 0,73, „weil im
 * Schluss `ansprechen` und die ruhigen Posen daneben stehen, alle bei 52 — die
 * Grenze, die 0,73 erzwingt, liegt in dieser Szene gar nicht an."
 *
 * **Das war eine Beobachtung an den damaligen Entwuerfen, keine Wache.** Sobald
 * eine Schlussszene mit `staunen` beginnt — und drei der vier Shorts im Lauf
 * vom 04.09. tun genau das —, liegt die Grenze sehr wohl an: 63,9 x 0,92 sind
 * 58,8 gegen 50 Einheiten Feld, also fehlen 8,8. Bei 0,73 waeren es 46,6 und
 * damit im Bild.
 *
 * **`npm run bildrand` kann es prinzipiell nicht finden.** Die Probe misst die
 * aeusserste dunkle Spalte, und was jenseits des Randes liegt, ist im PNG gar
 * nicht erst da — derselbe Befund wie am 01.09.2026 beim Arm, der am Ellenbogen
 * endete.
 *
 * Wie ihre beiden Geschwister ist die Liste **gerechnet und nicht
 * geschrieben**: `zuBreiteWortwechselposen(WORTWECHSEL_SCHLUSS, …)`, und
 * `skripte/schemapruefung.ts` haelt beide gegeneinander.
 */
export const ZU_BREIT_IM_SCHLUSS = new Set(['staunen', 'achselzucken', 'hochschauen']);

/**
 * Wie lange der Kaltstart hoechstens spricht.
 *
 * **5,2 Sekunden und nicht die 3,5 des Aufschlags.** Die Begruendung steht am
 * Feld `satz` in `src/typen.ts`: Der Aufschlag ist eine Szene unter sechs, der
 * Kaltstart ist der ganze Hook. Die Zahl ist keine Messung, sondern der Rand
 * der zehn vorliegenden Kaltstarts — der laengste hat 63 Zeichen. Sie faellt,
 * sobald drei davon vertont sind.
 */
const KALTSTART_MAX_SEK = 5.2;

export const shortPruefen = (short: Short, quellen: Quelle[]): Befund[] => {
  const befunde: Befund[] = [];
  const melde = (stufe: Befund['stufe'], regel: string, text: string) =>
    befunde.push({ stufe, shortId: short.id, regel, text });

  /* ── Belegpflicht ────────────────────────────────────────────────── */

  const bekannteIds = new Set(quellen.map((q) => q.id));
  for (const id of short.quellenIds) {
    if (!bekannteIds.has(id)) {
      melde('fehler', 'beleg', `Quelle „${id}" steht nicht in quellen.json.`);
    }
  }

  /*
   * Hier stand bis zum 16.08.2026: **drei** offizielle Quellen je Short.
   *
   * Die Zahl ist entfallen, der Rang geblieben (gleich darunter). Aus zwei
   * Regeln ist eine geworden, und zwar die staerkere — die Anzahl war immer
   * die schwaechere Haelfte: Drei Herstellerseiten belegen nichts, eine
   * Behoerdenseite belegt alles. Genau dieser Fall stand am 14.08.2026 im
   * WLAN-Short, der mit drei Quellen sauber durchging und trotzdem nur
   * Beteiligte nannte.
   *
   * Dazu kommt der Formatwechsel: **Ein Fakt je Video** braucht keine drei
   * Quellen, er braucht die eine, die ihn traegt. Drei zu verlangen hiesse,
   * zwei dekorative dazuzuschreiben — und Dekoration im Belegapparat ist
   * schlimmer als keine, weil sie die Zahl stimmen laesst.
   *
   * Was die Zahl wirklich absicherte, sichert seit dem 16.08.2026 die
   * Belegszene: Jeder Short zeigt im Bild, wer die Aussage traegt. Eine
   * Quelle, die niemand nennt, faellt damit auf.
   *
   * **Die Menge `OFFIZIELLE_ARTEN` ist am 20.08.2026 gestrichen worden.** Sie
   * stand hier noch als `void OFFIZIELLE_ARTEN;` — beruehrt, damit der
   * Compiler schweigt, und sonst von nichts gelesen. Ihr eigener Kommentar
   * nannte sie „den Ort, an dem eine kuenftige Art eingeordnet werden muss";
   * als am selben Tag `wissenschaft` dazukam, hat sie das nicht geleistet und
   * konnte es nicht, weil sie nichts prueft. Eine Konstante, die als
   * Absicherung beschrieben ist und keine ist, ist dieselbe Sorte Fehler wie
   * die dekorative dritte Quelle: Sie laesst etwas stimmen aussehen.
   * Massgeblich ist `UNBETEILIGTE_ARTEN` in `src/typen.ts`, und die wird
   * gelesen.
   */

  /*
   * Mindestens eine Quelle ohne eigenes Interesse an der Aussage.
   *
   * Die Drei-Quellen-Regel zaehlt nur. Am 14.08.2026 fiel auf, dass der
   * WLAN-Short damit sauber durchging und trotzdem auf TP-Link, TP-Link und
   * Intel stand: „Dein Router ist nicht zu alt", belegt vom Routerhersteller
   * und vom Hersteller der Funkmodule. Zur Frage, wie sich ein Funkband
   * unter Nachbarn aufteilt, ist ein Anbieter nicht die zustaendige Instanz —
   * das ist der Standard oder die Bundesnetzagentur.
   *
   * Bewusst schwach formuliert: **eine** reicht. Der Hersteller bleibt die
   * beste Adresse fuer sein eigenes Datenblatt, und ein Short, der ein
   * konkretes Geraeteverhalten erklaert, soll ihn weiter tragen duerfen. Was
   * die Regel verhindert, ist der Short, der **ausschliesslich** von
   * Beteiligten getragen wird.
   */
  const unbeteiligte = short.quellenIds.filter((id) => {
    const quelle = quellen.find((q) => q.id === id);
    return quelle && (UNBETEILIGTE_ARTEN as readonly string[]).includes(quelle.art);
  });

  if (short.quellenIds.length > 0 && unbeteiligte.length === 0) {
    const beteiligte = short.quellenIds
      .map((id) => quellen.find((q) => q.id === id))
      .filter((q): q is Quelle => Boolean(q))
      .map((q) => `${q.herausgeber} (${q.art})`);
    melde(
      'fehler',
      'beleg',
      `Alle Quellen sind am Inhalt beteiligt: ${beteiligte.join(', ')}. ` +
        'Mindestens eine muss aus Standard, Behörde oder Rechtsprechung kommen.',
    );
  }

  // Quellen altern. Spezifikationen und Preise aendern sich still.
  const heute = new Date();
  for (const id of short.quellenIds) {
    const quelle = quellen.find((q) => q.id === id);
    if (!quelle) continue;
    const alterTage = (heute.getTime() - new Date(quelle.geprueftAm).getTime()) / 86_400_000;
    if (alterTage > 180) {
      melde('hinweis', 'quellenalter', `Quelle „${id}" wurde seit ${Math.round(alterTage)} Tagen nicht geprüft.`);
    }
  }

  /* ── Aufbau ──────────────────────────────────────────────────────── */

  const erste = short.szenen[0];

  if (erste !== undefined && erste.position !== 'aufschlag') {
    melde('fehler', 'aufbau', `Die erste Szene steht auf „${erste.position}" statt auf dem Aufschlag.`);
  }

  // Den Rest des Baus prueft bereits das Schema: jede Position kommt vor,
  // Aufschlag und Nachschlag genau einmal, und die Folge laeuft nur vorwaerts.

  /*
   * Ein Verweis aus dem Video heraus ist nicht nur schlechte Bindung — er
   * macht das Video kennzeichnungspflichtig. Wer ihn schreibt, ohne
   * `werbung: "video"` zu setzen, veroeffentlicht unmarkierte Werbung.
   */
  for (const szene of short.szenen) {
    for (const text of textwerte(szene)) {
      if (!VERWEIS_NACH_DRAUSSEN.test(text)) continue;

      if (short.kennzeichnung.werbung === 'video') {
        melde(
          'hinweis',
          'absprung',
          'Das Video verweist nach draußen. Gekennzeichnet ist es, aber es kostet Wiedergabedauer.',
        );
      } else {
        melde(
          'fehler',
          'kennzeichnung',
          `Der Text verweist aus dem Video heraus („${text.match(VERWEIS_NACH_DRAUSSEN)?.[0]}"), ` +
            'die Kennzeichnung steht aber nicht auf „video". Entweder den Verweis streichen ' +
            'oder das Label ins Bild nehmen.',
        );
      }
      break;
    }
  }

  /*
   * Keine Produktnamen — ausser dort, wo gekennzeichnet wird.
   *
   * Die Regel traegt das Werbemodell: Nennt ein Video kein Produkt, sondern
   * nur Merkmale, dann bewirbt es nichts und braucht kein Label. Sie gilt
   * deshalb genau dort **nicht**, wo das Label ohnehin im Bild steht — der
   * Kaufberatungs-Short darf benennen, weil er kennzeichnet. Vorher war die
   * Pruefung unbedingt und haette Variante A blockiert.
   *
   * Zweite Korrektur: Geprueft werden jetzt auch die **Plattformtexte**.
   * Vorher lief die Suche nur ueber die Szenen — Titel und Beschreibung
   * waren blinder Fleck, und ausgerechnet dort steht ein Markenname am
   * ehesten.
   */
  if (short.kennzeichnung.werbung !== 'video') {
    for (const szene of short.szenen) {
      for (const text of textwerte(szene)) {
        const treffer = text.match(ZUBEHOERMARKEN);
        if (treffer) {
          melde(
            'fehler',
            'produktname',
            `Im Video fällt der Markenname „${treffer[0]}". Videos nennen Merkmale, keine Produkte — ` +
              'sonst bewirbt das Video selbst und braucht die Kennzeichnung im Bild.',
          );
          break;
        }
      }
    }

    for (const [plattform, text] of Object.entries(short.texte)) {
      /*
       * Quellenangaben sind ausgenommen. In der YouTube-Beschreibung stehen
       * die Belege mit Herausgeber und URL — „Plugable: Understanding USB-C
       * Alt Mode" ist eine Herkunftsangabe, keine Empfehlung. Erkennbar an
       * der URL in derselben Zeile.
       */
      const zeilen = [text.titel, ...text.beschreibung.split('\n')].filter(
        (zeile) => !/https?:\/\//i.test(zeile),
      );

      for (const zeile of zeilen) {
        const treffer = zeile.match(ZUBEHOERMARKEN);
        if (treffer) {
          melde(
            'fehler',
            'produktname',
            `Der ${plattform}-Text nennt den Markennamen „${treffer[0]}" außerhalb einer Quellenangabe. ` +
              'Benennen ist der Rubrik „Kaufen" mit Label im Bild vorbehalten.',
          );
          break;
        }
      }
    }
  }

  /* ── Technische Zahlen gehören ins Bild ──────────────────────────── */

  /*
   * Wenn im Sprechtext eine technische Zahl faellt, muss eine Szene sie
   * zeigen. Mechanisch pruefbar und deshalb hart — kein Geschmacksurteil,
   * sondern die Umsetzung der Grundregel „gesprochene Zahl ist Behauptung,
   * gezeigte Zahl ist Beleg".
   */
  const gesprocheneZahlen = short.szenen
    .map((szene) => szene.sprechtext.match(ZAHL_MIT_EINHEIT)?.[0])
    .filter((treffer): treffer is string => Boolean(treffer));

  if (gesprocheneZahlen.length > 0 && !short.szenen.some((s) => ZEIGT_ZAHLEN.has(s.art))) {
    melde(
      'fehler',
      'zahlImBild',
      `Der Sprechtext nennt „${gesprocheneZahlen[0]}", aber keine Szene zeigt die Zahl. ` +
        'Technische Angaben brauchen eine „zahl"- oder „herleitung"-Szene.',
    );
  }

  /* ── Der eingeblendete Herausgeber muss der echte sein ───────────── */

  /*
   * Die Nachfolgerin der Belegszenen-Pruefung. `herausgeber` steht in der
   * Szene **und** in `quellen.json`, weil der Renderer nur den Short bekommt.
   * Genau die Sorte stiller Abweichung, die dieses Projekt sonst teuer bezahlt
   * hat: Im Bild stuende dann ein Absender, den die Quelle nie hatte.
   */
  for (const [i, szene] of short.szenen.entries()) {
    if (!('herausgeber' in szene) || szene.herausgeber === undefined) continue;
    const quelleId = 'quelleId' in szene ? szene.quelleId : undefined;
    const quelle = quellen.find((q) => q.id === quelleId);
    if (quelle && quelle.herausgeber !== szene.herausgeber) {
      melde(
        'fehler',
        'beleg',
        `Szene ${i + 1} blendet „${szene.herausgeber}" ein, in quellen.json steht ` +
          `„${quelle.herausgeber}". Im Video stünde ein Absender, den die Quelle nicht hat.`,
      );
    }
  }

  /* ── Die Fundstelle steht wirklich in dieser Quelle ──────────────── */

  /*
   * Die zweite Haelfte der Regel, deren erste im Schema steht: Dort wird
   * verlangt, dass eine Szene mit Quelle auch eine `belegId` nennt; hier wird
   * nachgesehen, ob es sie gibt. Getrennt sind die beiden, weil das Schema
   * auch im Browser laeuft (Remotion parst `daten/beispiel-short.ts`) und dort
   * `quellen.json` nicht vorliegt.
   *
   * Ohne diese Haelfte waere die Regel eine Formalie: Man koennte irgendeine
   * Zeichenkette eintragen und haette dieselbe Blankovollmacht wie vorher, nur
   * mit einem Feld mehr.
   */
  const belegtVonSzenen = new Map<string, number[]>();

  for (const [i, szene] of short.szenen.entries()) {
    const belegId = 'belegId' in szene ? szene.belegId : undefined;
    const quelleId = 'quelleId' in szene ? szene.quelleId : undefined;
    if (belegId === undefined || quelleId === undefined) continue;

    const quelle = quellen.find((q) => q.id === quelleId);
    if (!quelle) continue; // schon oben als fehlende Quelle gemeldet

    const beleg = quelle.belegt.find((b) => b.id === belegId);
    if (!beleg) {
      melde(
        'fehler',
        'beleg',
        `Szene ${i + 1} beruft sich auf die Fundstelle „${belegId}", die es in „${quelleId}" nicht ` +
          `gibt. Vorhanden: ${quelle.belegt.map((b) => b.id).join(', ')}.`,
      );
      continue;
    }

    const schluessel = `${quelleId}#${belegId}`;
    belegtVonSzenen.set(schluessel, [...(belegtVonSzenen.get(schluessel) ?? []), i + 1]);
  }

  /* ── Voltis Erstaunen traegt seine Behauptung ────────────────────── */

  /*
   * **Die Belegpflicht ist am 02.09.2026 umgezogen, nicht gestrichen.**
   *
   * Sie hing seit dem 31.08. an der Themenzeile, und der Anlass war gut: Sie
   * war das einzige gesprochene Feld ohne Deckung, und drei von vier Entwuerfen
   * trugen ihre Behauptung nicht — am haertesten „Passwort wechseln bringt gar
   * nichts" gegen das BSI-Zitat „erhoeht die Sicherheit **nicht automatisch**".
   *
   * Die Themenzeile behauptet seitdem nichts mehr; sie nennt die Figur, deren
   * Geschichte kommt. **Wo nichts behauptet wird, kann nichts ueberzogen
   * werden.** Was vor dem Vorhang noch behauptet, ist genau ein Satz: Voltis
   * Erstaunen. Also haengt die Regel jetzt dort — dieselbe Regel, dasselbe
   * Verfahren, ein anderes Feld.
   *
   * **Geprueft wird die Fundstelle, nicht der Satz.** Ob das Zitat den
   * Kaltstart wirklich traegt, kann kein Skript beurteilen — dafuer gibt es
   * `npm run belege` und den `belegpruefer`. Was hier geprueft wird, ist das,
   * was pruefbar ist: dass es die Fundstelle gibt und dass sie zu einer Quelle
   * **dieses** Shorts gehoert. Ohne die zweite Haelfte koennte der Kaltstart
   * sich auf ein Zitat berufen, das im Video nirgends vorkommt — belegt waere
   * er dann nur auf dem Papier.
   */
  const belegQuellen = short.szenen
    .map((szene) => ('quelleId' in szene ? szene.quelleId : undefined))
    .filter((id): id is string => id !== undefined);

  if (short.kaltstart.belegId !== undefined) {
    const kaltstartBelegId = short.kaltstart.belegId;
    const traegerQuelle = quellen.find(
      (q) => belegQuellen.includes(q.id) && q.belegt.some((b) => b.id === kaltstartBelegId),
    );

    if (!traegerQuelle) {
      const vorhanden = quellen
        .filter((q) => belegQuellen.includes(q.id))
        .flatMap((q) => q.belegt.map((b) => `${q.id}#${b.id}`));
      melde(
        'fehler',
        'beleg',
        `Der Kaltstart „${short.kaltstart.satz}" beruft sich auf die Fundstelle ` +
          `„${kaltstartBelegId}", die es in keiner Quelle dieses Shorts gibt. ` +
          (vorhanden.length > 0
            ? `Vorhanden: ${vorhanden.join(', ')}.`
            : 'Der Short nennt bisher gar keine Quelle.'),
      );
    }
  }

  /*
   * Ein Zitat, das drei Szenen tragen soll, traegt meistens eine.
   *
   * Das ist das Muster, an dem beide Fehler vom 17.08.2026 hingen: Eine Quelle
   * wurde ueber den ganzen Short verteilt, und irgendwo dazwischen stand ein
   * Satz, den sie nicht hergibt. Zwei Szenen aus einem Zitat sind normal — die
   * Zuspitzung und der Kipppunkt kommen oft aus demselben Absatz. Ab der
   * dritten lohnt der Blick, deshalb Hinweis und nicht Fehler.
   */
  for (const [schluessel, szenen] of belegtVonSzenen) {
    if (szenen.length > 2) {
      melde(
        'hinweis',
        'beleg',
        `Ein Zitat trägt ${szenen.length} Szenen (${szenen.join(', ')}): „${schluessel}". ` +
          'Trägt es wirklich jeden dieser Sätze?',
      );
    }
  }

  /* ── Produktionsregel: keine behauptete Erfahrung ────────────────── */

  for (const szene of short.szenen) {
    const treffer = szene.sprechtext.match(ERFAHRUNGSBEHAUPTUNG);
    if (treffer) {
      melde(
        'fehler',
        'produktionsregel',
        `Der Sprechtext behauptet eigene Produkterfahrung („${treffer[0]}"). ` +
          'Erlaubt nur, wenn das Produkt tatsächlich selbst benutzt wurde.',
      );
    }
  }

  for (const [plattform, text] of Object.entries(short.texte)) {
    const treffer = text.titel.match(TITEL_ALS_TEST);
    if (treffer) {
      melde(
        'fehler',
        'produktionsregel',
        `Der ${plattform}-Titel nennt den Inhalt „${treffer[0]}". Ohne eigene Nutzung sind nur ` +
          '„Vergleich", „Kompatibilitätscheck" oder „Kaufhilfe" zulässig.',
      );
    }
  }

  /* ── Kennzeichnung ───────────────────────────────────────────────── */

  // Synthetische Stimme ist im Video eingebrannt, muss aber auch gesetzt sein.
  if (!short.kennzeichnung.kiStimme) {
    melde('fehler', 'kennzeichnung', 'Die Stimme ist synthetisch, kiStimme steht aber auf false.');
  }

  /**
   * Kennzeichnungspflichtig ist der kommerzielle Verweis, nicht der Quellenbeleg.
   * Ein Link auf eine Hersteller-Supportseite ist eine Quelle und loest die
   * Pflicht nicht aus — ein Partnerlink, Rabattcode oder Shopverweis schon.
   */
  const werbemarker =
    /(amzn\.to|[?&](tag|ref|aff|affid|partner|awinaffid|utm_medium=affiliate)=|\b(affiliate|provision|rabattcode|gutscheincode|werbelink|partnerlink)\b|link in bio.*\b(kauf|shop|bestell))/i;

  const eintraege = Object.entries(short.texte) as [string, (typeof short.texte)['tiktok']][];
  const texteMitWerbung = eintraege.filter(([, t]) => werbemarker.test(t.beschreibung));

  if (texteMitWerbung.length > 0 && short.kennzeichnung.werbung === 'keine') {
    melde(
      'fehler',
      'kennzeichnung',
      `Ein Plattformtext enthält einen kommerziellen Verweis („${
        texteMitWerbung[0]![1].beschreibung.match(werbemarker)?.[0]
      }"), die Kennzeichnung steht aber auf „keine".`,
    );
  }

  // Umgekehrter Fall: gekennzeichnet, aber nirgends ein Verweis. Meist ein
  // vergessener Link, seltener eine ueberfluessige Kennzeichnung.
  if (short.kennzeichnung.werbung !== 'keine' && texteMitWerbung.length === 0) {
    melde(
      'hinweis',
      'kennzeichnung',
      'Die Kennzeichnung ist gesetzt, aber kein Plattformtext enthält einen kommerziellen Verweis.',
    );
  }

  /*
   * Der Kern des Modells: Steht die Werbung nur in der Beschreibung, dann
   * ist die Beschreibung auch der Ort der Kennzeichnung. Ein Partnerlink
   * ohne „Werbung" oder „Anzeige" im selben Text ist unmarkierte Werbung —
   * unabhaengig davon, was im Schema steht.
   */
  for (const [plattform, text] of texteMitWerbung) {
    // Zeilenweise, nicht ueber den ganzen Text: Ein „Werbung" irgendwo oben
    // kennzeichnet nicht den Link zwanzig Zeilen weiter unten.
    const ungekennzeichnet = text.beschreibung
      .split('\n')
      .filter((zeile) => werbemarker.test(zeile) && !KENNZEICHNUNGSWORT.test(zeile));

    if (ungekennzeichnet.length > 0) {
      melde(
        'fehler',
        'kennzeichnung',
        `In der ${plattform}-Beschreibung steht ein Partnerlink ohne „Werbung" oder „Anzeige" in derselben ` +
          `Zeile: „${ungekennzeichnet[0]!.trim().slice(0, 60)}…". Das Kennzeichen gehört an den Link, ` +
          'nicht als Sammelhinweis ans Ende.',
      );
    }
  }

  /* ── Lesbarkeit im Feed ──────────────────────────────────────────── */

  /*
   * **Die neun Woerter gelten dem Kaltstart, seit es ihn gibt.**
   *
   * Sie standen bis zum 02.09.2026 am Aufschlag, aus derselben Zeit wie die
   * 3,5 Sekunden — als die erste Szene noch der Anfang des Videos war. Heute
   * steht der Kaltstart davor, und **er ist der Satz, den jemand im Feed
   * liest, bevor er weiterwischt.**
   *
   * Am Aufschlag hat die Regel bei allen zehn Dialogen gemeldet und bei
   * keinem recht gehabt: Ein Wortwechsel aus zwei Zeilen hat immer mehr als
   * neun Woerter, und mehr als eine Zeile ist genau das, was ihn zum Gespraech
   * macht.
   */
  if (short.kaltstart.satz.split(/\s+/).length > 12) {
    melde(
      'hinweis',
      'lesbarkeit',
      `Der Kaltstart hat ${short.kaltstart.satz.split(/\s+/).length} Wörter – im Feed greift er dann nicht mehr zu.`,
    );
  }

  /* ── Plattformtexte ──────────────────────────────────────────────── */

  /*
   * Hashtags kategorisieren und helfen der Suche. Mehr tun sie nicht.
   *
   * Die Zahl steht seit dem 24.08.2026 im Schema (drei bis fuenf, wegen
   * Instagrams hartem Deckel). Hier stehen die Regeln, die sich nicht als Zahl
   * ausdruecken lassen — der **Bauplan aus drei Rollen**:
   *
   * | Rolle | Anzahl | Beispiel |
   * |---|---|---|
   * | Marke | genau 1 | `#ganzakkurat` |
   * | Gemeinschaft | 1–2, aus kuratierter Liste | `#techtok` |
   * | Thema | 2–3, konkret zum Video | `#schaltsekunde` |
   *
   * Einen **Formattag** gibt es bewusst nicht. Er sammelte eine Serie fuer ein
   * Publikum, das es noch nicht gibt — dasselbe Argument, mit dem am
   * 20.08.2026 der Wochentag gestrichen wurde. Er kostet dafuer einen von
   * fuenf Plaetzen, auf dem sonst ein Wort steht, nach dem jemand sucht.
   *
   * Und eine Abkuerzung, die nicht traegt: **Das `sachgebiet` taugt nicht als
   * Tag.** `#drucken` gehoert dem Textildruck, `#laden` dem Einzelhandel,
   * `#fahren` der Fahrschule. Die Sachgebiete sind interne Sortierachsen gegen
   * die Druckerwoche, keine Suchwoerter.
   */
  const nackt = (tag: string): string => tag.replace(/^#/, '').toLowerCase();

  const hashtagSaetze = new Map<string, string>();

  for (const [plattform, text] of Object.entries(short.texte)) {
    const tags = text.hashtags.map(nackt);

    const reichweitentags = tags.filter((t) => REICHWEITENTAGS.includes(t));
    if (reichweitentags.length > 0) {
      melde(
        'fehler',
        'texte',
        `${plattform} trägt #${reichweitentags.join(' #')}. Diese Tags wirken nachweislich nicht – ` +
          'sie kategorisieren nichts und stehen neben einer Quellenangabe wie eine Bitte um Aufmerksamkeit.',
      );
    }

    /*
     * Der Markentag ist die eine Stelle, an der Hashtags dauerhaft Gewicht
     * haben: Er sammelt, was zum Kanal gehoert. Er kostet nichts und ist
     * deshalb ein Fehler, kein Hinweis.
     */
    if (!tags.includes(MARKENTAG)) {
      melde('fehler', 'texte', `Bei ${plattform} fehlt #${MARKENTAG} – der Markentag sammelt den Kanal.`);
    }

    /*
     * Die Gemeinschaftsliste ist heute leer, und dann schweigt diese Regel.
     * Erst wenn jemand die Tagseiten angesehen und Tags eingetragen hat, wird
     * daraus eine Wache.
     */
    const gemeinschaft = GEMEINSCHAFTSTAGS[plattform] ?? [];
    const getragen = tags.filter((t) => gemeinschaft.includes(t));
    if (gemeinschaft.length > 0 && getragen.length === 0) {
      melde(
        'fehler',
        'texte',
        `${plattform} trägt keinen Gemeinschaftstag. Einer aus #${gemeinschaft.join(' #')} sagt, ` +
          'wohin der Kanal gehört – dort browst die Zielgruppe wirklich.',
      );
    }

    const breite = tags.filter((t) => BREITE_TAGS.includes(t));
    if (breite.length > 0) {
      melde(
        'hinweis',
        'texte',
        `#${breite.join(' #')} bei ${plattform} ist zu breit. Unter Millionen Beiträgen verschwindet ` +
          'ein neuer in Sekunden – ein Tag, unter dem man sichtbar wird, ist enger.',
      );
    }

    /*
     * Was uebrig bleibt, benennt das Thema. Weniger als zwei heisst: Der Satz
     * besteht aus Zugehoerigkeit und sagt nicht, wovon das Video handelt.
     */
    const themen = tags.filter(
      (t) => t !== MARKENTAG && !gemeinschaft.includes(t) && !BREITE_TAGS.includes(t) && !REICHWEITENTAGS.includes(t),
    );
    if (themen.length < 2) {
      melde(
        'hinweis',
        'texte',
        `${plattform} hat ${themen.length === 0 ? 'keinen' : 'nur einen'} Tag zum Thema. Marke und ` +
          'Gemeinschaft sagen, wer sendet – gefunden wird das Video über das, wovon es handelt.',
      );
    }

    hashtagSaetze.set(plattform, [...tags].sort().join(' '));
  }

  /*
   * Derselbe Block auf allen drei Kanaelen war bis zum 24.08.2026 der Zustand.
   * Die Plattformen wollen Verschiedenes: TikTok Suchwoerter, Instagram
   * Nische, YouTube das, was auch im Titel steht.
   */
  if (new Set(hashtagSaetze.values()).size === 1) {
    melde(
      'hinweis',
      'texte',
      'Alle drei Plattformen tragen denselben Hashtag-Satz. Sie suchen verschieden – ' +
        'ein Block überall ist der geringste gemeinsame Nenner.',
    );
  }

  /* ── Bilder ────────────────────────────────────────────────────────── */

  /*
   * Hier stand bis zum 18.08.2026 eine Obergrenze: ein Hinweis, sobald **mehr
   * als die Haelfte** der Szenen eine Zeichnung traegt. Sie war die Antwort
   * auf `src/illustration.ts`, das aus dem Szenentext Symbole ableitete und
   * deshalb jede Szene bebilderte — der Erklaervideo-Reflex in Codeform.
   *
   * Am 18.08.2026 hat die Doktrin sich umgedreht: **Jede Szene, die eine
   * Zeichnung tragen kann, traegt eine.** Die Regel blieb trotzdem stehen und
   * meldete von da an den Sollzustand als Mangel — mit einem Begruendungstext
   * („sonst traegt die Typografie"), der das Gegenteil dessen sagte, was
   * inzwischen galt.
   *
   * Aufgefallen ist sie erst, als `npm run pruefen` am selben Tag anfing,
   * `shortPruefen` mitlaufen zu lassen. Vorher lief sie nur im Wochenlauf und
   * ging dort zwischen echten Hinweisen unter. Die gueltige Regel ist die
   * **Untergrenze** in `bildvielfalt` (laufweite Befunde): gemeldet wird jede
   * bebilderbare Szene **ohne** Zeichnung.
   */


  /* ── Titel ───────────────────────────────────────────────────────── */

  /*
   * Der Titel hat eine andere Aufgabe als die Hook, und bis zum 14.08.2026
   * hat er sie in vier von fuenf Faellen nicht erfuellt.
   *
   * Drei Titel waren **woertlich der Hooktext**, ein vierter nannte die
   * falsche Sache: „Du brauchst kein neues Netzteil" ueber einem Video, in
   * dem es um das Kabel geht. Genau ein Titel funktionierte — „Die Garantie
   * ist abgelaufen. Deine Rechte nicht." —, und der Unterschied ist
   * benennbar: Er traegt ein Sachwort, das die Hook nicht sagt.
   *
   * Damit ist die Regel aus der Konzeption pruefbar geworden: Die Hook ist
   * die kurze Haelfte, der Titel traegt den Kontext mit. Wer im Titel nur
   * die Hook wiederholt, hat eine Zeile, die zweimal dasselbe tut — und die
   * Situation, in der jemand das Video braucht, kommt nirgends vor. In der
   * Suche entscheidet aber genau sie.
   */
  /*
   * **Die Hook ist der Kaltstart, seit dem 02.09.2026.** Hier stand die erste
   * Szene, und das war richtig, solange das Video mit ihr anfing. Heute steht
   * der Kaltstart davor — er ist der Satz, gegen den der Titel sich abheben
   * muss, weil beide im Feed nebeneinander zu sehen sind.
   *
   * Und der **Videotext** schliesst Kaltstart und Themenzeile ein. Beides wird
   * gesprochen und steht im Bild; ohne sie meldete die Regel Woerter als
   * „kommt im Video nicht vor", die der Zuschauer in der ersten Sekunde hoert.
   */
  const hookText = short.kaltstart.satz;
  const hookWoerter = new Set(sachwoerter(hookText));
  const videotext = [
    ...short.szenen.flatMap((s) => textwerte(s)),
    short.kaltstart.satz,
    short.vorspann,
  ]
    .join(' ')
    .toLowerCase();

  /*
   * **Die beiden Figurennamen sind ausgenommen.** Sie stehen auf jeder
   * Vorhangkarte und werden im Vorspann gesprochen — nur eben nicht in einem
   * Feld, das `textwerte` liest. Emirhans Titel nennen fast alle „Watti" oder
   * „Volti", und die Regel meldete sie 23-mal als unbelegt.
   */
  const FIGURENWOERTER = new Set(['watti', 'wattis', 'volti', 'voltis']);

  /*
   * Geprueft werden die **veroeffentlichten** Titel, nicht der
   * `arbeitstitel` — der steht nur in der Freigabe-Uebersicht. Draussen
   * gelesen wird `texte[dienst].titel`, und dort muss die Regel greifen.
   */
  for (const [plattform, text] of Object.entries(short.texte)) {
    const woerter = sachwoerter(text.titel);

    if (ohneSatzzeichen(text.titel) === ohneSatzzeichen(hookText)) {
      melde(
        'fehler',
        'titel',
        `${plattform}: Titel und Hooktext sind derselbe Satz. Der Titel soll die Sache benennen, ` +
          'die Hook macht die Entwarnung.',
      );
      continue;
    }

    if (woerter.length === 0) {
      melde('fehler', 'titel', `${plattform}: Der Titel nennt keine Sache, nur Allgemeinplätze.`);
      continue;
    }

    if (woerter.every((w) => hookWoerter.has(w))) {
      /*
       * **Hinweis, seit die Hook der Kaltstart ist.** Die Ueberschneidung ist
       * jetzt gebaut: Der Kaltstart **muss** das zusammengesetzte Substantiv
       * nennen, das das Thema festnagelt — Akkuwechsel, Flugmodus,
       * Kabelschublade —, und derselbe Gegenstand steht im Titel. „Ein
       * Passwort fuer alles" neben „Ich haette mein Passwort wechseln
       * muessen" ist kein doppelter Satz, sondern zweimal dasselbe Thema.
       *
       * Die Frage bleibt richtig: Was fuegt der Titel hinzu? Als Fehler
       * bestrafte sie die Regel, die daneben steht.
       */
      melde(
        'hinweis',
        'titel',
        `${plattform}: Der Titel nennt nur, was der Kaltstart schon sagt (${woerter.join(', ')}).`,
      );
    }

    /*
     * Ein Titel darf nichts benennen, was im Video nicht vorkommt. Das ist
     * die Belegpflicht auf den Titel angewandt: Wer im Titel eine Sache
     * verspricht, ueber die das Video nicht spricht, hat einen Koeder
     * geschrieben und keinen Titel.
     */
    const unbelegt = woerter.filter((w) => !FIGURENWOERTER.has(w) && !kommtImVideoVor(w, videotext));
    if (unbelegt.length > 0) {
      /*
       * **Hinweis und nicht mehr Fehler.** Der Titel darf ein **Bild**
       * benutzen statt des technischen Worts — „Wattis sieben Waechter
       * verraten ihn" statt „Blocker", Befund 9 in
       * `daten/marke/dialoganalyse.md`. Ein Bild ist keine Behauptung, und die
       * Regel kann die beiden nicht unterscheiden.
       *
       * Was sie kann, ist fragen. Der Fall, gegen den sie gebaut ist, sieht
       * anders aus und faellt beim Lesen sofort auf: ein Titel, der eine
       * **Sache** verspricht, ueber die das Video nicht spricht.
       */
      melde(
        'hinweis',
        'titel',
        `${plattform}: „${unbelegt.join(', ')}" kommt im Video nicht vor. ` +
          'Ein Bild darf das — eine Sache, die niemand nennt, ist ein Köder.',
      );
    }

    /*
     * Die zwei pruefbaren Haelften der Humor-Regel. Ob ein Titel witzig ist,
     * entscheidet niemand hier — ob er laut ist oder auf den Zuschauer zielt,
     * schon.
     */
    if (LAUT.test(text.titel)) {
      melde(
        'fehler',
        'titel',
        `${plattform}: Ausrufezeichen oder Emoji im Titel. Der Ton dieses Kanals ist trocken.`,
      );
    }

    if (KONFRONTATION.test(text.titel)) {
      melde(
        'fehler',
        'titel',
        `${plattform}: Der Titel zielt auf den Zuschauer. Die Pointe trifft die Sache, nicht ihn.`,
      );
    }

    // Laenge nur als Hinweis: TikTok schneidet frueher ab als YouTube.
    const obergrenze = plattform === 'tiktok' ? 60 : 70;
    if (text.titel.length > obergrenze) {
      melde(
        'hinweis',
        'titel',
        `${plattform}: Titel ist ${text.titel.length} Zeichen lang – abgeschnitten wird ab etwa ${obergrenze}.`,
      );
    }
  }

  /*
   * Hier stand bis zum 16.08.2026 die Formpruefung des Titelmusters: ob ein
   * `zweisatz` wirklich zwei Saetze hat, ob eine `uhr` eine Zahl nennt.
   *
   * Das Feld ist mit den Formaten entfallen. Hook und Titel folgen jetzt dem
   * Opener des Formats (`FORMATE[...].opener`), und der ist ausdruecklich ein
   * **Muster und kein fester Wortlaut**: Derselbe Einstieg siebenmal die
   * Woche klingt nach Schablone, und nach drei Wochen ueberspringt man ihn.
   *
   * Damit ist die Wiedererkennung ans Bild gewandert — die Formatpille in der
   * Kopfzeile steht ab Sekunde null. Eine Formpruefung am Text waere jetzt
   * genau die Fessel, die der variable Opener vermeiden soll.
   */

  /* ── Die ersten Sekunden ─────────────────────────────────────────── */

  /*
   * Die Hook ist die erste Szene, und sie entscheidet, ob es eine zweite
   * gibt. Am 15.08.2026 dauerte die Hook des Gewaehrleistungs-Shorts 7,5
   * Sekunden — sie war damit laenger als das Fenster, in dem sich jemand
   * fuers Bleiben entscheidet, und der Short verlor sein Publikum, bevor die
   * Sache ueberhaupt gesagt war.
   *
   * Gemessen wird die **Sprechdauer** der ersten Szene, nicht ihre Standzeit:
   * Die Mindestdauer im Bild darf laenger sein.
   *
   * ## Warum die Grenze am 02.09.2026 von 3,5 auf 9 Sekunden gegangen ist
   *
   * **Die erste Szene ist nicht mehr die Hook.** Vor ihr liegen der Kaltstart
   * und der Vorhang; wer sich fuers Bleiben entscheidet, tut das im Kaltstart,
   * und **dort steht die 3,5-Sekunden-Idee jetzt** als `KALTSTART_MAX_SEK`.
   * Die erste Szene beginnt rund neun Sekunden spaeter — der Zuschauer, der
   * sie hoert, hat sich laengst entschieden.
   *
   * Alle zehn Dialoge von Emirhan haben sie gerissen, von 6,2 bis 8,8
   * Sekunden, und alle zehn sind gute Anfaenge. Der Grund ist der Bau: Die
   * erste Szene ist heute ein **Wortwechsel** aus zwei bis drei Zeilen, wo
   * frueher ein Satz stand. „Warum bringst du die Kopfhoerer nicht einfach
   * zurueck? — Weil ich sie letztes Jahr aufgemacht habe und der Aufkleber
   * jetzt ab ist." sind zwei Zeilen, und keine davon ist zu lang.
   *
   * **Eine Regel, die zehn von zehn guten Anfaengen ablehnt, misst das
   * Falsche.** Sie bleibt trotzdem stehen: Bei neun Sekunden faengt sie den
   * Fall, gegen den sie gebaut war — die erste Szene als Vortrag. Fehler und
   * nicht Hinweis, weil dieser Fall am 15.08. teuer war.
   */
  /*
   * Liegt eine Tonspur vor, gilt sie — auch hier.
   *
   * Bis zum 16.08.2026 rechnete diese Regel immer mit der Formel, obwohl der
   * Short die echten Zeitstempel schon dabeihatte. Im ersten vertonten
   * Wochenlauf sprachen deshalb **vier von sieben** Hooks laenger als erlaubt,
   * bis zu 4,7 s, und die Pruefung meldete nichts: Die Formel stand auf 17,4
   * Zeichen/s, gesprochen wurden 15,4. Eine harte Regel an geschaetzten Daten
   * zu pruefen, waehrend gemessene daneben liegen, ist keine Pruefung.
   */
  const ersteSzene = short.szenen[0];
  if (ersteSzene) {
    /*
     * Aus den Wortstempeln, nicht aus dem Szenenabstand.
     *
     * Zwischen dem letzten Wort der Hook und dem ersten der zweiten Szene
     * liegen 0,3 bis 0,7 Sekunden Atempause. Wer den Abstand misst, misst sie
     * mit — und prueft damit etwas anderes als die Schaetzformel darunter, die
     * nur Zeichen zaehlt. Dieselbe Regel darf nicht zweierlei bedeuten, je
     * nachdem ob schon vertont wurde.
     */
    const grenze = short.tonspur?.szenenStartSek[1];
    const hookWoerter =
      grenze === undefined ? [] : (short.tonspur?.woerter ?? []).filter((w) => w.startSek < grenze);
    const erstes = hookWoerter[0];
    const letztes = hookWoerter[hookWoerter.length - 1];
    const gemessen = erstes !== undefined && letztes !== undefined;
    const hookSek = gemessen
      ? letztes.endeSek - erstes.startSek
      : ersteSzene.sprechtext.length / ZEICHEN_PRO_SEKUNDE;
    if (hookSek > LAENGE_SEK.hookMaximum) {
      melde(
        'fehler',
        'hook',
        `Die Hook spricht ${hookSek.toFixed(1)}s ` +
          `(${gemessen ? 'gemessen' : `${ersteSzene.sprechtext.length} Zeichen`}). ` +
          `Höchstens ${LAENGE_SEK.hookMaximum}s — das sind rund ` +
          `${Math.floor(LAENGE_SEK.hookMaximum * ZEICHEN_PRO_SEKUNDE)} Zeichen, ein Satz.`,
      );
    }
  }

  /* ── Der Kaltstart vor dem Vorhang ────────────────────────────────── */

  /*
   * **Dieselbe Grenze wie beim Aufschlag, ein Stueck weiter vorn.**
   *
   * Der Kaltstart ist seit dem 02.09.2026 der erste Satz des Videos, und damit
   * gilt fuer ihn, was fuer den Aufschlag gilt: 71 % der Zuschauer entscheiden
   * in den ersten Sekunden. Gemessen wird aus den Wortstempeln, sobald eine
   * Tonspur vorliegt — genau wie oben, und aus demselben Grund: Eine harte
   * Regel an geschaetzten Daten zu pruefen, waehrend gemessene daneben liegen,
   * ist keine Pruefung.
   *
   * Das Schema deckelt den Satz schon bei 45 Zeichen. Diese Regel ist
   * trotzdem keine Doppelung, sondern die **Gegenprobe**: Das Schema zaehlt
   * Zeichen, hier wird die Sprechdauer gemessen. Am 25.08.2026 hat genau
   * dieser Unterschied `ZEICHEN_PRO_SEKUNDE` von 15,4 auf 13,0 gebracht.
   */
  const kaltstartWoerter = short.tonspur?.kaltstart?.woerter ?? [];
  const kErstes = kaltstartWoerter[0];
  const kLetztes = kaltstartWoerter[kaltstartWoerter.length - 1];
  const kaltstartGemessen = kErstes !== undefined && kLetztes !== undefined;
  const kaltstartDauer = kaltstartGemessen
    ? kLetztes.endeSek - kErstes.startSek
    : short.kaltstart.satz.length / ZEICHEN_PRO_SEKUNDE;
  if (kaltstartDauer > KALTSTART_MAX_SEK) {
    melde(
      'fehler',
      'kaltstart',
      `Der Kaltstart spricht ${kaltstartDauer.toFixed(1)}s ` +
        `(${kaltstartGemessen ? 'gemessen' : `${short.kaltstart.satz.length} Zeichen`}). ` +
        `Höchstens ${LAENGE_SEK.hookMaximum}s — er ist der erste Satz des Videos.`,
    );
  }

  /*
   * **Der Anschluss: Die erste Szene macht aus dem Selbstgespräch ein Gespräch.**
   *
   * ## Die Regel hat am ersten fremden Dialog vier Stunden gehalten
   *
   * Sie hiess bis zum 02.09.2026 nachmittags: „Die erste Zeile nach dem Vorhang
   * kommt vom **anderen**." Die Begruendung klang gut — spraeche dieselbe Figur
   * weiter, waere der Vorhang mitten in ihrem Satz gefallen.
   *
   * Emirhans erster selbstgeschriebener Dialog macht es anders und macht es
   * besser: Watti sagt vor dem Vorhang „Oh man ich haette mein Passwort
   * wechseln muessen" und danach „Volti, ich brauche deine Hilfe". Der Vorhang
   * ist eben **kein Schnitt mitten im Gedanken, sondern ein Zeitsprung** — vor
   * ihm steht Watti allein mit seinem Schaden, hinter ihm geht er zu seinem
   * Bruder.
   *
   * ## Was die alte Regel eigentlich wollte
   *
   * Nicht den Sprecherwechsel, sondern das **Gespraech**: Der Kaltstart ist ein
   * Selbstgespraech, und die erste Szene muss daraus eines zu zweit machen.
   * Dafuer gibt es zwei Wege, und Emirhans Satz geht den zweiten:
   *
   * 1. Der andere antwortet — der alte Fall.
   * 2. Derselbe **redet den anderen an** — „Volti, ich brauche deine Hilfe".
   *
   * Beides ist pruefbar, und beides schliesst den einen Fall aus, der wirklich
   * schlecht ist: dieselbe Figur redet weiter, als waere nichts gewesen.
   */
  const kaltstartArt = KALTSTART_ARTEN.find((a) => a.schluessel === short.kaltstart.art);
  const ersterAnteil = short.szenen[0]?.rede?.[0];
  if (kaltstartArt !== undefined && ersterAnteil !== undefined) {
    const anderer: Sprecher = kaltstartArt.wer === 'zeiger' ? 'nachleser' : 'zeiger';
    const beantwortet = ersterAnteil.sprecher === anderer;
    /*
     * ## Der dritte Weg, gefunden am 03.09.2026
     *
     * Die Anrede zaehlte bis dahin nur in der **ersten Zeile**, mit der
     * Begruendung: Wer den anderen erst im dritten Satz beim Namen nennt, hat
     * die ersten beiden ins Leere gesprochen.
     *
     * **Emirhans zwei Dialoge widersprechen sich hier.** In
     * `passwort-wechseln` redet Watti nach dem Vorhang sofort an („Volti, ich
     * brauche deine Hilfe"); in `akku-wechselbar-2027` schimpft er weiter
     * („Aber mein Handy haelt nur noch 3 Stunden bei 100 Prozent"), und **erst
     * die zweite Zeile** macht ein Gespraech daraus: Volti kommt herein und
     * fragt „Hey Watti, was laeuft?".
     *
     * Das ist keine ins Leere gesprochene Zeile, sondern eine Buehnenanweisung
     * — der andere **betritt den Raum**. Geprueft wird deshalb die **Szene**
     * und nicht die Zeile: Kommt der andere in der ersten Szene ueberhaupt zu
     * Wort, ist aus dem Selbstgespraech eines zu zweit geworden.
     *
     * Der Fall, gegen den die Regel gebaut ist, faellt weiter durch: eine
     * erste Szene, in der nur der Kaltstart-Sprecher redet.
     */
    const spricht = ersterAnteil.text.toLowerCase();
    const redetAn = spricht.includes(FIGURENNAMEN[anderer].toLowerCase());
    const andererKommtVor = (short.szenen[0]?.rede ?? []).some((r) => r.sprecher === anderer);

    if (!beantwortet && !redetAn && !andererKommtVor) {
      melde(
        'fehler',
        'kaltstart',
        `${FIGURENNAMEN[kaltstartArt.wer]} spricht die ganze erste Szene allein weiter, ohne ` +
          `${FIGURENNAMEN[anderer]} anzusprechen. Der Kaltstart ist ein Selbstgespräch — die ` +
          'erste Szene muss ein Gespräch daraus machen.',
      );
    }

    /*
     * **Der Zug muss antworten — wenn der andere spricht.**
     *
     * Redet die Kaltstartfigur selbst weiter, hat sie nichts zu beantworten;
     * sie **bittet**, und dafuer gibt es seit dem 02.09.2026 einen eigenen Zug.
     * Die alte Fassung meldete hier bei jedem Hilferuf, also genau bei dem Bau,
     * den sie erlauben sollte.
     */
    const antwortende = new Set(['nachhaken', 'richtigstellen', 'beantworten', 'widersprechen']);
    const eroeffnende = new Set(['bitten', 'behaupten']);
    const erlaubt = beantwortet ? antwortende : eroeffnende;
    if (!erlaubt.has(ersterAnteil.zug)) {
      melde(
        'hinweis',
        'kaltstart',
        `Die erste Zeile nach dem Vorhang trägt „${ersterAnteil.zug}". ` +
          (beantwortet
            ? `Sie soll auf den Kaltstart antworten: ${[...antwortende].join(', ')}.`
            : `Sie spricht den anderen an und eröffnet damit: ${[...eroeffnende].join(', ')}.`),
      );
    }
  }

  /*
   * **Die Wortbruecke: Ein Sachwort des Kaltstarts steht in der ersten Szene.**
   *
   * Sie ist die Gegenprobe zur Regel darueber, so wie `rueckbezug` die
   * Gegenprobe zu den Zugarten ist: Der Sprecherwechsel ist eine **erklaerte**
   * Beziehung, die Wortbruecke misst die **tatsaechlichen** Woerter. Am ersten
   * vertonten Video war `rueckbezug` weit uebererfuellt und es war trotzdem
   * kein Gespraech — ein Mass, das eine Zeichenkette zaehlt, kann eine
   * Beziehung nicht sehen. Umgekehrt gilt es genauso.
   *
   * Deshalb ein Hinweis und kein Fehler: „Kacke, ich hätte mein Passwort
   * wechseln müssen." und „Jemand war in meinem Konto." haengen zusammen, ohne
   * ein Wort zu teilen. Die Regel meldet den Verdacht, sie faellt kein Urteil.
   */
  const bruecke = sachwoerter(short.kaltstart.satz);
  const ersteSzenenWorte = ohneSatzzeichen(short.szenen[0]?.sprechtext ?? '');
  if (bruecke.length > 0 && !bruecke.some((w) => kommtImVideoVor(w, ersteSzenenWorte))) {
    melde(
      'hinweis',
      'kaltstart',
      `Kein Wort aus dem Kaltstart „${short.kaltstart.satz}" kommt in der ersten Szene ` +
        'wieder vor. Nachsehen, ob der Vorhang die beiden trennt statt sie zu verbinden.',
    );
  }

  /* ── Der weitererzaehlbare Satz ───────────────────────────────────── */

  /*
   * `weitererzaehlt` muss im Video **vorkommen**.
   *
   * Das Feld stellt seit dem 17.08.2026 beim Entwerfen die richtige Frage:
   * Was erzaehlt jemand am Tisch weiter? Am 18.08.2026 fiel auf, dass die
   * Antwort den Zuschauer nie erreicht. In **keinem** der acht fertigen
   * Shorts kam der Satz vor — bei `wlan-abends` nicht einmal eines seiner
   * sechs Sachwoerter. Er existierte ausschliesslich als Notiz auf der
   * Platte.
   *
   * Damit war das Feld eine Denkhilfe fuer den Autor und kein Bestandteil des
   * Videos. Ein Satz, den niemand hoert, wird nicht weitererzaehlt.
   *
   * Geprueft wird gegen den **verketteten** Sprechtext, nicht gegen einzelne
   * Szenen: Zwischen zwei Szenen liegt nur eine Atempause, der Satz bleibt
   * hoerbar zusammenhaengend. Er darf also ueber eine Szenengrenze laufen,
   * aber nicht ueber das ganze Video verstreut sein.
   */
  const gesprochen = ohneSatzzeichen(short.szenen.map((s) => s.sprechtext).join(' '));
  if (!gesprochen.includes(ohneSatzzeichen(short.weitererzaehlt))) {
    melde(
      'fehler',
      'weitererzaehlt',
      `„${short.weitererzaehlt}" wird im Video nicht gesagt. Der Satz, den jemand ` +
        'weitererzählen soll, muss zusammenhängend im Sprechtext vorkommen – sonst ist ' +
        'er eine Notiz für den Autor und kein Teil des Videos.',
    );
  }

  /* ── Der Suchbegriff ──────────────────────────────────────────────── */

  /*
   * `suchbegriff` muss dort stehen, wo die Plattform liest.
   *
   * `hashtag-strategy` und `social-seo` liefern denselben Befund: Der Hebel
   * sind nicht die Tags, sondern das Suchwort — gesprochen, im Bild und in der
   * Beschreibung. Bei TikTok heisst das die Dreifachnennung.
   *
   * Zwei Drittel davon erfuellt der Kanal ohnehin, weil der Sprechtext Wort
   * fuer Wort der Untertitel ist. Das dritte Drittel fehlte bis zum 24.08.2026
   * ganz: Die Beschreibung war ueberall leer.
   *
   * Geprueft wird **Wort fuer Wort**, nicht als Phrase. „Laptops Raumstation"
   * steht im Video als „Auf der Raumstation liefen 2009 Laptops" — getrennt,
   * und genau so sucht auch niemand. Als Teilstring, damit Beugungen nicht
   * durchfallen: „raumstation" findet auch „Raumstationen".
   */
  const suchWoerter = ohneSatzzeichen(short.suchbegriff).split(' ').filter((w) => w.length >= 3);

  const fehlendImSprechtext = suchWoerter.filter((w) => !gesprochen.includes(w));
  if (fehlendImSprechtext.length > 0) {
    melde(
      'fehler',
      'suchbegriff',
      `„${fehlendImSprechtext.join('", „')}" aus dem Suchbegriff „${short.suchbegriff}" wird im ` +
        'Video nicht gesagt. Der Sprechtext ist zugleich der Untertitel – was dort nicht steht, ' +
        'findet die Plattform weder im Ton noch im Bild.',
    );
  }

  for (const [plattform, text] of Object.entries(short.texte)) {
    const beschreibung = ohneSatzzeichen(text.beschreibung);
    const fehlend = suchWoerter.filter((w) => !beschreibung.includes(w));

    if (fehlend.length > 0) {
      melde(
        'fehler',
        'suchbegriff',
        `In der ${plattform}-Beschreibung fehlt „${fehlend.join('", „')}" aus dem Suchbegriff. ` +
          'Die ersten rund 80 Zeichen sind das, was die Plattform indiziert – eine leere ' +
          'Beschreibung verschenkt genau die Stelle.',
      );
    }

    /*
     * Die Zeile darf nicht zum Erklaerabsatz zurueckwachsen. Die Entscheidung
     * vom 15.08.2026 gilt weiter: Ein Short erklaert sich im Video.
     */
    if (text.beschreibung.length > 150) {
      melde(
        'hinweis',
        'texte',
        `Die ${plattform}-Beschreibung hat ${text.beschreibung.length} Zeichen. Sie soll auffindbar ` +
          'machen, nicht erklären – ein Satz mit dem Suchbegriff vorn reicht.',
      );
    }
  }

  /*
   * **Das dritte Drittel des Suchworts ist am 01.09.2026 entfallen.** Hier
   * stand ein Hinweis, wenn ein Suchwort in keinem **Bildtext** vorkam. Das
   * Feld `text` gibt es nicht mehr — an seiner Stelle steht die Kulisse.
   *
   * Die Regel faellt damit ersatzlos, und das ist kein Verlust: Die beiden
   * tragenden Drittel sind der **Sprechtext** (er ist Wort fuer Wort der
   * Untertitel) und die **Beschreibung**, und beide werden oben hart geprueft.
   * Der Bildtext war ohnehin nur ein Zubrot — der Hinweis sagte es selbst.
   */

  /* ── Zeitangaben altern ───────────────────────────────────────────── */

  /*
   * Kein Sprechtext enthaelt eine Zeitangabe, die sich auf **heute** bezieht.
   *
   * Am 18.08.2026 stand im Mittwochs-Short „Seit zwoelf Tagen hat dein Akku
   * einen Ausweis". Am Tag des Schreibens stimmte das. Gesendet wird der Short
   * aber am **26.08.**, und dann sind es zwanzig Tage. Der Satz war nicht
   * falsch, als er entstand — er wird es beim Liegen.
   *
   * Das ist eine besonders unangenehme Sorte Fehler, weil sie durch jede
   * Pruefung geht: Die Quelle stimmt, das Zitat steht auf der Seite, die
   * Rechnung war korrekt. Nur der Bezugspunkt wandert.
   *
   * Zwischen Entwurf und Ausstrahlung liegen hier regelmaessig ein bis zwei
   * Wochen, und ein Short bleibt danach im Feed. Absolute Daten altern nicht:
   * „Seit dem 6. August" ist in einem Jahr noch richtig.
   */
  const HEUTEBEZUG = [
    'seit heute',
    'seit gestern',
    'seit vorgestern',
    'diese woche',
    'letzte woche',
    'vorige woche',
    'diesen monat',
    'letzten monat',
    'gestern',
    'vorgestern',
    'morgen',
    'uebermorgen',
    'übermorgen',
  ];
  /*
   * „heute vor drei Jahren" — aber nur mit Zeitspanne dahinter.
   *
   * Die Wendung stand bis zum 26.08.2026 als blosse Zeichenkette in der Liste
   * oben und hat den Satz „Das Umweltbundesamt empfiehlt heute, vorher zu
   * unterbrechen" abgelehnt: `ohneSatzzeichen` nimmt das Komma weg, und uebrig
   * bleibt „heute vorher".
   *
   * Der Fehlalarm ist teurer als er aussieht, weil er auf der starken Seite
   * liegt: Er haelt einen richtigen Short zurueck und laedt dazu ein, den
   * Sprechtext gegen die Sprache zu verbiegen. Gesucht wird deshalb, was
   * gemeint war — die Wendung **samt** ihrer Zeitspanne.
   */
  const HEUTE_VOR =
    /\bheute vor\s+(einer|einem|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|\d+)\s+(tag|tagen|woche|wochen|monat|monaten|jahr|jahren)\b/i;

  /** „seit drei Wochen", „vor zwoelf Tagen" — Zahl plus Zeiteinheit. */
  const ZEITSPANNE =
    /\b(seit|vor)\s+(einer|einem|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|\d+)\s+(tag|tagen|woche|wochen|monat|monaten)\b/i;

  /*
   * Die zweite Haelfte derselben Falle: ein Datum **ohne Jahr**.
   *
   * „Und die galt nur bis zum ersten Januar" — bis zum ersten Januar welchen
   * Jahres? Im Kopf des Schreibenden stand 2026, im Video steht es nicht. Der
   * Zuschauer hat keine Chance, und anders als bei „seit zwoelf Tagen" faellt
   * es nicht einmal spaeter auf: Der Satz bleibt fuer immer unvollstaendig.
   *
   * Gesucht wird ein Monatsname ohne Jahreszahl in der Naehe. Jahreszahlen
   * werden hier ausgeschrieben („zweitausendsechsundzwanzig"), weil die
   * Vertonung sie sonst falsch liest — beide Schreibweisen zaehlen.
   */
  const MONATE =
    /\b(januar|februar|märz|maerz|april|mai|juni|juli|august|september|oktober|november|dezember)\b/i;
  const JAHR = /\b(19|20)\d{2}\b|zweitausend\w*|neunzehnhundert\w*/i;

  /*
   * **Nur die behauptenden Zeilen, seit dem 02.09.2026.**
   *
   * Die Regel zielt auf Zeitangaben, die eine **Aussage ueber die Welt**
   * datieren: „seit zwoelf Tagen gilt", „diese Woche hat die Kommission". Die
   * altern zwischen Entwurf und Ausstrahlung, ohne dass jemand etwas aendert.
   *
   * Sie hat aber auch die **Erzaehlzeit der beiden Brueder** getroffen — „das
   * Foto von gestern", „du hast letzte Woche danach gefragt", „dann gehe ich
   * morgen hin". Vier von zehn Dialogen, und keine dieser Angaben verweist auf
   * ein reales Datum: Sie steht im erzaehlten Fall, so wie das Wohnzimmer und
   * die Fahrradlampe. **Was im Short passiert, altert mit dem Short.**
   *
   * Dieselbe Trennung wie bei der Belegpflicht, und derselbe Traeger: der Zug.
   * Wo `behauptet` steht, greift die Regel unveraendert.
   */
  for (const szene of short.szenen) {
    const anteile = szene.rede ?? [];
    const pruefText =
      anteile.length > 0
        ? anteile
            .filter((r) => ZUGARTEN[r.zug].behauptet)
            .map((r) => r.text)
            .join(' ')
        : szene.sprechtext;
    const text = ohneSatzzeichen(pruefText);
    /*
     * **An Wortgrenzen, nicht als Teilzeichenkette.**
     *
     * Bis zum 03.09.2026 stand hier `text.includes(w)`, und damit fing
     * „morgen" auch „**morgens**". Emirhans Zeile „Weil es laden soll du
     * Idiot, damit es **morgens** wieder voll ist." wurde als relative
     * Zeitangabe abgelehnt — sie ist eine Tageszeit und altert nicht.
     *
     * Der Fehlalarm liegt auf der teuren Seite: Er haelt einen richtigen Short
     * zurueck und laedt dazu ein, den Sprechtext gegen die Sprache zu
     * verbiegen. Dieselbe Lehre wie bei `heute vor` einen Monat zuvor —
     * **eine Wache, die Zeichenketten zaehlt, muss wenigstens Woerter
     * zaehlen.**
     */
    const alsWort = (w: string): boolean =>
      new RegExp(`(^|\\s)${w.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}(\\s|$)`).test(text);
    const woerter = [
      ...HEUTEBEZUG.filter(alsWort),
      ...(HEUTE_VOR.test(pruefText) ? ['heute vor'] : []),
    ];
    const spanne = ZEITSPANNE.exec(pruefText);

    const monat = MONATE.exec(pruefText);
    if (monat && !JAHR.test(pruefText)) {
      melde(
        'fehler',
        'zeitbezug',
        `„${monat[0]}" steht ohne Jahr. Welcher ${monat[0]}? Der Zuschauer kann es nicht wissen, ` +
          'und der Satz wird auch später nicht klarer.',
      );
    }

    if (woerter.length > 0 || spanne) {
      melde(
        'fehler',
        'zeitbezug',
        `„${spanne ? spanne[0] : woerter.join('", „')}" rechnet ab heute. Zwischen Entwurf und ` +
          'Ausstrahlung liegen hier ein bis zwei Wochen, und der Short bleibt danach im Feed – ' +
          'die Angabe wird falsch, ohne dass jemand etwas ändert. Absolutes Datum nehmen.',
      );
    }
  }

  /* ── Der Rundlauf ─────────────────────────────────────────────────── */

  /*
   * Ob der erste Satz nach dem letzten wieder traegt, beurteilt das Feld
   * `rundlauf` im Schema — kein Skript kann das lesen. Pruefbar ist die
   * andere Haelfte: ob der Schlusssatz **abbindet**.
   *
   * Diese Woerter tun genau das, was der Vorhang tat, den wir gerade
   * abgehaengt haben: Sie sagen dem Zuschauer, dass Schluss ist. Ein Short,
   * der von selbst wieder anlaeuft, darf das nicht ansagen.
   */
  const ABBINDER = [
    'fazit',
    'zusammengefasst',
    'kurz gesagt',
    'unterm strich',
    'am ende bleibt',
    'merke',
    'das wars',
    'das war es',
    'bis zum naechsten',
    'schreib es in die kommentare',
    'schreibt es in die kommentare',
    'lass ein abo',
    'folg mir',
    'folgt mir',
  ];
  const schlussSzene = short.szenen.find((s) => s.art === 'schluss');
  if (schlussSzene) {
    const text = ohneSatzzeichen(`${schlussSzene.satz} ${schlussSzene.sprechtext}`);
    const treffer = ABBINDER.filter((w) => text.includes(w));
    if (treffer.length > 0) {
      melde(
        'fehler',
        'rundlauf',
        `Der Schluss bindet ab („${treffer.join('", „')}"). Ein Short läuft von selbst ` +
          'wieder an – der letzte Satz soll auf den ersten passen, nicht das Ende ansagen.',
      );
    }
  }

/**
 * Wie lange eine Figur hoechstens am Stueck reden darf.
 *
 * **Gesetzt, nicht gemessen — und das steht hier, weil der Vertrag verlangt,
 * dass eine geratene Zahl sich als geraten zu erkennen gibt.** Sechs Sekunden
 * sind rund 90 Zeichen, also zwei mittlere Saetze; danach muss der andere dran
 * sein.
 *
 * Der Bestand am 31.08.2026, geschaetzt ueber `ZEICHEN_PRO_SEKUNDE`:
 * `raumstation` 12,8 s, `passwort` 10,3 s, `erstes-laden` 6,9 s,
 * `ersatzteil` 6,8 s. **Alle vier fielen durch, und das war der Zweck** —
 * eine Regel, die den Bestand gruen laesst, haette nichts gefunden.
 *
 * ## Sechs Sekunden, gemessen: acht
 *
 * Am 02.09.2026 lagen zehn Dialoge von Emirhan vor. Ihre laengsten
 * Redebloecke: 7,5 · 7,4 · 7,1 · 6,7 · 6,4 · 6,1 · 5,9 · 5,5 · 5,0 · 4,8
 * Sekunden. **Sechs von zehn ueber der Grenze**, und keiner von ihnen ist ein
 * Vortrag — der Grund ist der Satzbau: Seine Zeilen haben im Schnitt 65
 * Zeichen, meine hatten 35. Ein Satz mit Nebensatz ist keine Rede.
 *
 * Acht Sekunden liegen ueber dem gemessenen Rand und deutlich unter dem Fall,
 * gegen den die Regel gebaut ist: Voltis 13,9 Sekunden am Stueck in
 * `raumstation`, bevor Watti zum ersten Mal etwas sagte.
 */
const REDEBLOCK_MAX_SEK = 8;

/**
 * Wie viel des Textes hoechstens auf eine Figur entfallen darf.
 *
 * **Rollenneutral formuliert und nicht auf Watti gemuenzt.** Die Besetzung
 * darf laut Vertrag wechseln — wer den Beleg traegt und wer reagiert, ist eine
 * Rolle und keine Figur. Eine Regel, die „Watti" naeme, machte aus der Rolle
 * wieder eine feste Besetzung, und das ist genau die Schablone, gegen die der
 * Umbau laeuft.
 *
 * Der Bestand am 31.08.2026: 83 %, 77 %, 70 %, 69 % fuer die tragende Stimme.
 * Ebenfalls gesetzt und nicht gemessen.
 */
const STIMMANTEIL_MAX = 2 / 3;

  /* ── Aus dem Vortrag ein Gespraech ───────────────────────────────── */

  /*
   * **Die beiden Regeln, die aus dem ersten fertigen Video folgen.**
   *
   * Am 31.08.2026 lagen `raumstation-alte-rechner` und
   * `ersatzteil-freischalten` gerendert vor. Zwei Figuren im Bild, alle Regeln
   * gruen — und trotzdem kein Gespraech: Volti spricht in `raumstation`
   * **13,9 Sekunden am Stueck**, bevor Watti das erste Mal etwas sagt, und
   * traegt 83 % der Zeichen.
   *
   * `zweistimmigkeit` verlangt zwei Szenen mit beiden Stimmen. Die gab es. Das
   * Minimum war erfuellt und es war zu niedrig — dieselbe Schwaeche, die der
   * Vertrag bei dieser Regelsorte selbst benennt: geprueft wird, „ob der Platz
   * benutzt wurde".
   *
   * **Zwei Wachen, weil sie verschiedene Fehler fangen.** `redelauf` faengt
   * den Vortrag: einer redet lange, der andere wirft ein. `stimmanteil` faengt
   * die Statistenrolle: viele kurze Wechsel, aber einer traegt fast alles.
   * Eine allein liesse die jeweils andere Form durch.
   *
   * **Beide ohne Ton pruefbar**, ueber `ZEICHEN_PRO_SEKUNDE`. Sonst griffen
   * sie erst nach der bezahlten Vertonung — derselbe Grund, aus dem am
   * 30.08.2026 die laufweiten Regeln nach `npm run pruefen` gewandert sind.
   */
  {
    const bloecke = redebloecke(short);
    const laengster = bloecke.reduce(
      (m, b) => (b.zeichen > m.zeichen ? b : m),
      bloecke[0] ?? { sprecher: 'nachleser' as const, zeichen: 0, szenen: [] },
    );
    const sekunden = laengster.zeichen / ZEICHEN_PRO_SEKUNDE;

    if (sekunden > REDEBLOCK_MAX_SEK) {
      melde(
        'fehler',
        'redelauf',
        `${FIGURENNAMEN[laengster.sprecher]} spricht ${sekunden.toFixed(1)}s am Stück ` +
          `(Szene ${laengster.szenen.map((i) => i + 1).join(', ')}), erlaubt sind ` +
          `${REDEBLOCK_MAX_SEK}s. Der lange Belegsatz zerfällt in Frage und Antwort – ` +
          'die Frage gehört dem anderen.',
      );
    }

    const gesamt = bloecke.reduce((summe, b) => summe + b.zeichen, 0);
    if (gesamt > 0) {
      for (const sprecher of ['nachleser', 'zeiger'] as const) {
        const eigen = bloecke
          .filter((b) => b.sprecher === sprecher)
          .reduce((summe, b) => summe + b.zeichen, 0);
        const anteil = eigen / gesamt;
        if (anteil > STIMMANTEIL_MAX) {
          melde(
            'fehler',
            'stimmanteil',
            `${FIGURENNAMEN[sprecher]} trägt ${Math.round(anteil * 100)} % des Textes, ` +
              `erlaubt sind ${Math.round(STIMMANTEIL_MAX * 100)} %. Der andere ist dann ` +
              'kein Gegenüber mehr, sondern ein Requisit mit Stimme.',
          );
        }
      }
    }
  }

  /* ── Die Bauform darf nicht luegen ───────────────────────────────── */

  /*
   * **Ein Etikett ohne Deckung ist schlimmer als keins.**
   *
   * `bauform` steuert seit dem 25.08.2026 zwei Regeln: keine zweimal
   * hintereinander, keine ueber ein Drittel je Lauf. Beide sollen dafuer
   * sorgen, dass Videos verschieden **aussehen** — und beide sind wirkungslos,
   * wenn ein Short sich Zitatkarte nennt und dann wie jeder andere gebaut ist.
   * Die Drittelregel zaehlte dann Etiketten und keine Unterschiede.
   *
   * Geprueft wird deshalb, ob die Mittel da sind, die den Namen tragen. Nicht,
   * ob es gut aussieht — das kann kein Skript. Sondern ob das Wort gedeckt
   * ist, genau wie bei der Belegregel: Sie prueft nicht, ob das Zitat
   * ueberzeugt, sondern ob eins da ist.
   */
  {
    const zweistimmig = short.szenen.filter(
      (sz) => new Set((sz.rede ?? []).map((r) => r.sprecher)).size > 1,
    ).length;
    const zitatkarten = short.szenen.filter((sz) => sz.art === 'zitatkarte').length;
    const stationen = short.szenen.filter((sz) => sz.position === 'zuspitzung').length;

    if (short.bauform === 'zitatkarte' && zitatkarten === 0) {
      melde('fehler', 'bauform', 'Zitatkarte ohne eine Szene der Art `zitatkarte`.');
    }
    if (short.bauform === 'stationen' && stationen < 3) {
      melde(
        'fehler',
        'bauform',
        `Stationen, aber nur ${stationen} Zuspitzung(en). Eine steigende ` +
          'Aufzählung braucht mindestens drei, sonst ist es eine Wechselrede.',
      );
    }
    /*
     * Hier stand die Gegenprobe fuer `einstimmig`: Wer die Mittel benutzt, soll
     * sie auch anmelden. Die Bauform ist am 31.08.2026 gestrichen, und mit ihr
     * faellt die Regel — nicht aus Nachlaessigkeit, sondern weil
     * `zweistimmigkeit` denselben Fall jetzt haerter fasst. Sie verlangt zwei
     * Szenen mit beiden Stimmen von **jedem** Short, ohne Ausnahme; ein
     * einstimmiger Bau ist damit nicht mehr falsch angemeldet, sondern
     * unmoeglich.
     */
  }

  /* ── Zwei Stimmen: das Mindestmass ───────────────────────────────── */

  /*
   * **Die erste Regel des Projekts, die etwas verlangt statt etwas zu
   * verbieten.** 1693 Zeilen Pruefung haben bis zum 26.08.2026 ausschliesslich
   * Verbotenes gesucht — und `npm run pruefen` wurde bei neun Videos gruen,
   * die 0-mal geteilt wurden.
   *
   * Zwei Sachen werden verlangt, beide abzaehlbar:
   *
   * **Zweistimmigkeit.** Mindestens zwei Szenen tragen beide Stimmen. Ein
   * Mindestmass, kein Muster: „immer beide" waere nach vier Videos wieder die
   * Schablone, gegen die der Umbau laeuft.
   *
   * **Ohne Ausnahme, seit dem 31.08.2026.** Bis dahin war `einstimmig` als
   * angemeldeter Bau befreit und wurde nur von der Drittelregel im Lauf
   * begrenzt. Mit einem Fenster ab 42 Sekunden ist der einstimmige Bau aber
   * kein kurzer Sonderfall mehr, sondern ein Monolog von dreiviertel Minute.
   * Er ist deshalb gestrichen — und diese Regel ist die Stelle, an der das
   * durchgesetzt wird.
   *
   * **Eine Reaktion.** Mindestens eine Zeile traegt eine `machart`, also eine
   * Aeusserung, die nichts ueber die Welt behauptet. Geprueft wird nicht, ob
   * sie witzig ist — das kann kein Skript. Geprueft wird, ob der Platz benutzt
   * wurde, genau wie bei der Belegregel: Sie prueft nicht, ob das Zitat
   * ueberzeugt, sondern ob eins da ist.
   *
   */
  {
    const zweistimmig = short.szenen.filter(
      (sz) => new Set((sz.rede ?? []).map((r) => r.sprecher)).size > 1,
    ).length;

    if (zweistimmig < 2) {
      melde(
        'fehler',
        'zweistimmigkeit',
        `Nur ${zweistimmig} Szene(n) mit beiden Stimmen, mindestens zwei sind nötig. ` +
          'Zwei Figuren, die abwechselnd Absätze vorlesen, sind ein Sprecher mit zwei Farben.',
      );
    }

    const reaktionen = short.szenen.flatMap((sz) =>
      (sz.rede ?? []).filter((r) => r.machart !== undefined),
    );
    if (reaktionen.length === 0) {
      melde(
        'fehler',
        'reaktion',
        'Keine einzige Reaktionszeile. Der Short trägt nur Belegtes — und genau so ' +
          'sahen die neun Videos aus, die 0-mal geteilt wurden. Mindestens eine Zeile ' +
          'mit `machart` aus `MACHARTEN`.',
      );
    }

    /*
     * Und keine Machart zweimal im selben Short. Das Schema prueft es je
     * Szene; ueber den ganzen Short faellt erst auf, wenn ein Entwurf sich auf
     * eine Lieblingsform einpendelt — vier Rueckfragen hintereinander sind
     * keine zweite Stimme, sondern ein Tic.
     */
    const gesehen = new Map<string, number>();
    for (const r of reaktionen) {
      if (r.machart === undefined) continue;
      gesehen.set(r.machart, (gesehen.get(r.machart) ?? 0) + 1);
    }
    for (const [machart, anzahl] of gesehen) {
      if (anzahl < 2) continue;
      const name = MACHARTEN.find((m) => m.schluessel === machart)?.name ?? machart;
      melde(
        'fehler',
        'reaktion',
        `Die Machart „${name}" kommt ${anzahl}-mal vor. Eine je Short — sonst ist die ` +
          'zweite Stimme eine Masche und keine Figur.',
      );
    }
  }

  /* ── Wer redet, steht auch im Bild ───────────────────────────────── */

  /*
   * **Sprechen zwei, stehen zwei auf der Buehne.**
   *
   * `zweistimmigkeit` verlangt zwei Szenen mit beiden Stimmen und meint den
   * **Text**. Ob dabei auch zwei Figuren zu sehen sind, hat bis zum 31.08.2026
   * niemand geprueft — und `passwort-wechseln` zeigte in **drei von sechs**
   * Szenen eine einzelne Figur, waehrend beide miteinander redeten.
   *
   * Das war nicht Nachlaessigkeit, sondern der Weg des geringsten Widerstands:
   * Die drei Szenen trugen `erklaeren`, `zeigen` und zwei Requisiten — alles
   * Dinge, die bei zwei Figuren **verboten** sind. Wer die Sperre nicht loesen
   * will, laesst die zweite Figur weg, und keine Regel merkt es.
   *
   * **Sperren verbieten, sie verlangen nichts.** Genau diese Luecke schliesst
   * die Regel hier — dasselbe Muster wie bei `zweistimmigkeit` und `reaktion`,
   * die beide aus demselben Grund entstanden sind.
   *
   * Hinweis und nicht Fehler: Es gibt Szenen, in denen eine einzelne Figur die
   * bessere Wahl ist — der Aufschlag mit Kontextsymbol etwa, wo das Symbol den
   * Platz der zweiten Figur braucht. Die Regel soll fragen, nicht zwingen.
   */
  {
    const einsam = short.szenen.filter((sz) => {
      const sprecher = new Set((sz.rede ?? []).map((r) => r.sprecher));
      if (sprecher.size < 2) return false;
      const buehne = 'buehne' in sz ? sz.buehne : undefined;
      return buehne !== undefined && buehne.art === 'figur' && buehne.gegenueber === undefined;
    });

    if (einsam.length > 0) {
      const wo = short.szenen
        .map((sz, i) => (einsam.includes(sz) ? i + 1 : 0))
        .filter((n) => n > 0)
        .join(', ');
      melde(
        'hinweis',
        'zweiImBild',
        `In Szene ${wo} sprechen beide, aber nur eine Figur steht auf der Bühne. ` +
          'Wo ein Gespräch läuft, gehören beide ins Bild — eine einzelne Figur füllt ' +
          '52 % der Bühnenbreite, zwei füllen 76 %.',
      );
    }
  }

  /* ── Der Gespraechsmassstab ──────────────────────────────────────── */

  /*
   * ## Drei Regeln, damit aus Zwischenrufen ein Gespraech wird
   *
   * `redelauf` und `stimmanteil` sorgen dafuer, dass **beide** sprechen.
   * Sie sorgen nicht dafuer, dass die beiden **miteinander** sprechen — und
   * genau das ist am 31.08.2026 aufgeflogen: Alle vier Entwuerfe wurden nach
   * diesen zwei Regeln umgeschrieben, `npm run pruefen` wurde gruen, und
   * `ersatzteil-freischalten` hatte danach **null Anreden und null Zeilen in
   * der zweiten Person**. Formal ein Wortwechsel, gehoert ein Vortrag mit
   * Zwischenrufen.
   *
   * Der Massstab dafuer stand seit dem Vormittag desselben Tages in einem
   * Chat — Emirhans Musterdialog, jetzt woertlich in `daten/marke/voice.md`.
   * **Was keine Regel hat, wird beim Schreiben nicht gefragt.** Dieselbe
   * Lehre wie bei der Belegpflicht, den Positionen und der Reaktionsregel.
   *
   * Alle drei pruefen wie `reaktion`: **nicht, ob es gut ist, sondern ob der
   * Platz benutzt wurde.** Und alle drei sind Mindestmasse, keine Muster — bei
   * „immer" entsteht in vier Wochen wieder eine Schablone.
   */
  {
    const alleAnteile = short.szenen.flatMap((sz) => sz.rede ?? []);
    /*
     * **Der Kaltstart zaehlt mit, seit dem 02.09.2026.** Er ist gesprochener
     * Text derselben beiden Figuren, nur vor dem Vorhang — und in
     * `raumstation-alte-rechner` ist genau die Zeile dorthin gewandert, die
     * vorher eine der beiden Anreden trug. Eine Regel, die den ersten Satz des
     * Videos nicht sieht, misst das Gespraech an seinem Rest.
     */
    const gesprochen = [...alleAnteile.map((r) => r.text), short.kaltstart.satz];

    /*
     * **Anrede.** „Volti, …" — jemand spricht *jemanden* an. Ohne sie steht
     * ein Satz im Raum, und die Antwort darauf ist ein Zwischenruf.
     *
     * Eine reicht. Die Namen fallen laut `voice.md` ohnehin nur ein- bis
     * zweimal je Video; oefter wird es zur Floskel und kostet Sprechzeit.
     */
    const namen = Object.values(FIGURENNAMEN);
    const mitAnrede = gesprochen.filter((t) =>
      namen.some((n) => new RegExp(`\\b${n}\\b`).test(t)),
    ).length;
    /*
     * **Hinweis und nicht mehr Fehler, seit dem 02.09.2026.** Fuenf von
     * Emirhans zehn Dialogen kommen ohne eine einzige Anrede aus, und es sind
     * dieselben zehn, an denen alles andere hier geeicht ist. Sie tragen den
     * Anschluss anders — ueber die Frage, ueber das Aufgreifen, ueber den Zug.
     *
     * Die Regel bleibt, weil sie beim Schreiben die richtige Frage stellt:
     * *Redet hier jemand mit jemandem?* Als Fehler haette sie die Haelfte des
     * Eichmasses zurueckgehalten.
     */
    if (mitAnrede === 0) {
      melde(
        'hinweis',
        'anrede',
        'Keine Zeile spricht den anderen mit Namen an. Ohne Anrede steht ein Satz im ' +
          'Raum, und was darauf folgt, ist ein Zwischenruf statt einer Antwort.',
      );
    }

    /*
     * **Zweite Person.** Der Belegsatz redet *zu* einem Gegenueber, nicht
     * *ueber* die Welt. Das ist der Unterschied zwischen einem Vortrag und
     * einer Erklaerung — und nebenbei zwischen „Hersteller duerfen die
     * Verwendung von Ersatzteilen nicht behindern" und „Hersteller duerfen
     * deine Handy-Reparatur nicht per Software behindern".
     *
     * **Der Nebeneffekt ist der eigentliche Gewinn:** Eine Verallgemeinerung
     * faellt nicht auf, eine Anrede schon. Solange ein Satz „Hersteller
     * duerfen …" heisst, klingt er nach dem Rechtstext; sobald er „du" sagt,
     * muss man wissen, wer gemeint ist. Am 31.08.2026 hat genau das zwei
     * Grenzen sichtbar gemacht, die in keinem Zitat standen.
     *
     * Zwei Zeilen als Mindestmass: eine kann Zufall sein.
     */
    /* `deins` gehoert dazu und fehlte im ersten Anlauf — es ist die Form, die
       tatsaechlich gesprochen wird. */
    const DUFORM = /\b(du|dir|dich|dein|deins|deine|deiner|deinen|deinem|deines)\b/i;
    const mitDu = gesprochen.filter((t) => DUFORM.test(t)).length;
    if (mitDu < 2) {
      melde(
        'fehler',
        'zweitePerson',
        `Nur ${mitDu} Zeile(n) reden in der zweiten Person, mindestens zwei sind nötig. ` +
          'Wer über die Welt redet, hält einen Vortrag; wer „du" sagt, erklärt es jemandem.',
      );
    }

    /*
     * **Rueckbezug.** Die Antwort greift ein Wort der Vorzeile auf: „wenn du
     * einen Verdacht **spuerst**" → „jetzt **spuere** ich einen Verdacht".
     * **Daran erkennt man, dass zugehoert wurde** — ohne ihn koennten die
     * Zeilen in beliebiger Reihenfolge stehen.
     *
     * Verglichen werden Wortstaemme grob ueber die ersten sechs Buchstaben.
     * Das ist ungenau in beide Richtungen und trotzdem der richtige Schnitt:
     * Eine echte Stammformerkennung braeuchte ein Woerterbuch, und die Regel
     * soll den Platz pruefen, nicht die Sprache. Deshalb **Hinweis statt
     * Fehler** — wo sie danebenliegt, kostet sie niemanden einen Lauf.
     *
     * Kurze und haeufige Woerter zaehlen nicht mit: „nicht", „steht", „einen"
     * kommen in jedem zweiten Satz vor und wuerden jeden Short gruen machen.
     */
    const HAEUFIG = new Set([
      'nicht',
      'steht',
      'einen',
      'eine',
      'sind',
      'wird',
      'werden',
      'haben',
      'jemand',
      'sollst',
      'stehen',
      'meine',
      'meins',
      'schon',
      'immer',
      'jetzt',
      'wieder',
    ]);
    /*
     * **Umlaute werden aufgeloest, bevor abgeschnitten wird.** „Passwoertern"
     * und „Passwort" haben denselben Stamm, aber nicht dieselben ersten sechs
     * Buchstaben — `passwoe` gegen `passwo`. Ohne diesen Schritt uebersieht die
     * Regel genau die Rueckbezuege, die auf einer Beugung beruhen, und das sind
     * im Deutschen die meisten.
     */
    const staemme = (t: string) =>
      new Set(
        t
          .toLowerCase()
          .replace(/ä/g, 'a')
          .replace(/ö/g, 'o')
          .replace(/ü/g, 'u')
          .replace(/ß/g, 'ss')
          .replace(/[^a-z\s]/g, ' ')
          .split(/\s+/)
          .filter((w) => w.length >= 5 && !HAEUFIG.has(w))
          .map((w) => w.slice(0, 6)),
      );

    let rueckbezuege = 0;
    for (let i = 1; i < alleAnteile.length; i++) {
      const vorher = staemme(alleAnteile[i - 1]!.text);
      for (const wort of staemme(alleAnteile[i]!.text)) {
        if (vorher.has(wort)) {
          rueckbezuege += 1;
          break;
        }
      }
    }
    /*
     * **Eins statt zwei, seit dem 02.09.2026.** Sechs von Emirhans zehn
     * Dialogen liegen unter zwei; nur 17 Prozent seiner Zeilen greifen
     * ueberhaupt ein Wort auf. Der Anschluss laeuft bei ihm ueber die Frage
     * und ueber den Zug, nicht ueber die Wortwiederholung.
     *
     * Die Regel bleibt trotzdem, und zwar als **Gegenprobe zum Zug**: Der Zug
     * ist eine erklaerte Beziehung, der Rueckbezug misst die tatsaechlichen
     * Woerter. Bei null Rueckbezuegen in einem ganzen Short lohnt der Blick.
     */
    if (rueckbezuege < 1) {
      melde(
        'hinweis',
        'rueckbezug',
        `Keine Zeile greift ein Wort ihrer Vorzeile auf. Daran erkennt man, dass zugehört ` +
          'wurde — ohne es könnten die Zeilen in beliebiger Reihenfolge stehen.',
      );
    }
  }

  /* ── Die Zuege: ob eine Zeile der anderen antwortet ──────────────── */

  /*
   * **Warum es diese Ebene ueberhaupt gibt.**
   *
   * `rueckbezug` daruber war beim ersten fertigen Video **weit uebererfuellt**
   * — fuenf von zehn Zeilen greifen ein Wort der Vorzeile auf, verlangt sind
   * zwei — und das Urteil lautete trotzdem: „Die beiden fuehren einfach kein
   * Gespraech miteinander."
   *
   * Der Grund steht in einer einzigen Zeile des Shorts: „Sicherheit? Also war
   * das alles umsonst?" enthaelt „Sicherheit" und **antwortet trotzdem nicht
   * Volti, sondern dem Fakt.** Ein Mass, das eine Zeichenkette zaehlt, kann
   * eine Beziehung nicht sehen. Die Schwelle zu erhoehen haette nichts
   * gebracht; gebraucht wird eine andere Art von Angabe.
   *
   * Deshalb `zug` am Redeanteil und diese vier Regeln darauf. Sie pruefen
   * **deklarierte Felder** und koennen nicht danebenliegen — anders als
   * `rueckbezug` mit seiner groben Stammformerkennung. Eine Wache, die nie
   * falsch meldet, darf hart sein.
   *
   * **Alle Zaehlregeln sind Obergrenzen, keine Mindestmasse.** Das Projekt hat
   * dreimal erlebt, dass eine vorschreibende Regel selbst zur Schablone wird
   * (`einstimmig`, der einzelne Zielwert, „immer beide Stimmen"). Ein Maximum
   * laesst sich nicht ansteuern.
   *
   * **`zug` ist seit dem 01.09.2026 Pflicht**, und damit ist der
   * Uebersprungzweig weg, der die Umstellung Entwurf fuer Entwurf erlaubt hat.
   * Er war ein Zwischenzustand mit Ablaufdatum: Eine Regel, die Zeilen ohne
   * Angabe stillschweigend durchlaesst, ist genau dann still, wenn jemand die
   * Angabe weggelassen hat.
   */
  {
    const mitZug = short.szenen.flatMap((sz) => sz.rede ?? []);

    if (mitZug.length > 0) {
      const zuege = mitZug.map((r) => r.zug);

      /*
       * **Die Antwortpflicht.** `widersprechen` verlangt einen Konter,
       * `nachhaken` eine Auskunft — geschlossen vom naechsten Zug der
       * **anderen** Figur.
       *
       * Drei Vorkehrungen, damit daraus kein Ping-Pong-Muster wird:
       *
       * 1. **Nicht die unmittelbar naechste Zeile**, sondern hoechstens zwei
       *    Positionen weiter. Der Fragende darf noch einen Satz nachschieben,
       *    der Antwortende erst reagieren und dann antworten.
       * 2. **Vier Zuege schliessen einen Konter**, nicht einer. Auf einen
       *    Widerspruch gibt es mehrere richtige Antworten; bei einer waere die
       *    Regel eine Vorschrift.
       * 3. **Ein Zug derselben Figur zaehlt nie.** Wer nachhakt und sich
       *    selbst beantwortet, fuehrt kein Gespraech.
       *
       * Die Pflicht laeuft ueber Szenengrenzen weiter: Eine Szenengrenze ist
       * ein **Schnitt, kein Raumwechsel** — Frage am Szenenende, Antwort nach
       * dem Schnitt ist ein Spannungsbogen und kein Fehler.
       */
      let offen: { art: 'konter' | 'antwort'; von: number } | undefined;
      const unerfuellt: { art: 'konter' | 'antwort'; von: number }[] = [];

      mitZug.forEach((anteil, i) => {
        const art = ZUGARTEN[anteil.zug];
        if (offen !== undefined) {
          const andere = mitZug[offen.von]!.sprecher !== anteil.sprecher;
          if (andere && art.schliesst.includes(offen.art)) {
            offen = undefined;
          } else if (andere && anteil.zug === 'abbiegen') {
            /*
             * **Wer ausweicht, geht darauf ein — er antwortet nur nicht.**
             * `abbiegen` ist der Zug fuer „Jetzt komm mir nicht mit der
             * Lampe.", und in `kabelschublade` ist genau das die Stelle, an
             * der Volti verliert. Als unerfuellte Antwortpflicht gemeldet
             * bestraft ihn dieselbe Zeile zweimal: `abbiegen` ist ohnehin auf
             * einen je Short gedeckelt, und dieser Deckel ist die richtige
             * Wache dafuer.
             */
            offen = undefined;
          } else if (andere && art.verlangt !== undefined) {
            /*
             * **Die Gegenfrage geht darauf ein.** Vierte Vorkehrung, seit dem
             * 02.09.2026: Wer auf einen Widerspruch mit „Wieso denn nicht?"
             * antwortet, missachtet ihn nicht — er schiebt die Antwort weiter,
             * und die neue Pflicht traegt sie.
             *
             * In `festplatte-loeschen` steht genau das: Watti widerspricht,
             * Volti fragt zurueck, Watti begruendet. Ein Gespraech, das die
             * Regel als Vortrag gemeldet hat.
             *
             * Die alte Pflicht gilt damit als eingeloest, die neue faengt an —
             * ein Schlupfloch ist es nicht, denn die Gegenfrage verlangt
             * ihrerseits eine Antwort und wird zwei Zeilen spaeter gemessen.
             */
            offen = undefined;
          } else if (i - offen.von > 2) {
            unerfuellt.push(offen);
            offen = undefined;
          }
        }
        // Erst danach, damit ein Konter, der selbst nachhakt, sofort neu aufmacht.
        if (art.verlangt !== undefined && offen === undefined) {
          offen = { art: art.verlangt, von: i };
        }
      });

      /*
       * Am Short-Ende darf nur offen bleiben, wessen Bogen es zusagt — und das
       * ist faktisch nur `werhatrecht` mit seiner Restfrage. Damit ist die
       * Ausnahme eingetragen statt geduldet.
       */
      const darfOffenEnden = GESPRAECHSBOEGEN[short.format].schluss.some(
        (z) => ZUGARTEN[z].verlangt !== undefined,
      );
      if (offen !== undefined && !darfOffenEnden) unerfuellt.push(offen);

      for (const p of unerfuellt) {
        const a = mitZug[p.von]!;
        const anderer = a.sprecher === 'zeiger' ? 'nachleser' : 'zeiger';
        melde(
          'fehler',
          'antwortpflicht',
          `„${a.text}" ist ein ${ZUGARTEN[a.zug].name} und bleibt unbeantwortet. ` +
            `${FIGURENNAMEN[anderer]} redet weiter, statt darauf einzugehen — genau daran ` +
            'hat man im ersten fertigen Video gehört, dass die beiden kein Gespräch führen.',
        );
      }

      /*
       * **`abbiegen` hoechstens einmal.** Die Regel, die den diagnostizierten
       * Fall direkt trifft: In `passwort-wechseln` sprach Volti Watti dreimal
       * an und bekam dreimal keine Antwort. Jede Zeile fuer sich war witzig
       * und bezog sich auf nichts.
       *
       * Fehler und nicht Hinweis: Als Hinweis gaebe es wieder ein gruenes
       * `npm run pruefen` bei einem Video ohne Gespraech.
       */
      const abgebogen = zuege.filter((z) => z === 'abbiegen').length;
      if (abgebogen > 1) {
        melde(
          'fehler',
          'abbiegen',
          `${abgebogen} Zeilen gehen am Gesagten vorbei, erlaubt ist eine. Ab der zweiten ` +
            'führen die beiden zwei Monologe nebeneinander.',
        );
      }

      /*
       * **Die Anschlussquote** schliesst das Schlupfloch der Antwortpflicht:
       * Wer nie widerspricht und nie nachhakt, hat nichts offen — und besteht
       * dann aus lauter `behaupten`. Genau das war der erste Short.
       *
       * Die erste Zeile ist ausgenommen, sie kann nichts aufgreifen.
       *
       * **Als Maximum formuliert und nicht als „mindestens zwei Drittel
       * anschliessende"**, damit niemand auf die Mindestzahl hin schreibt.
       */
      const ANSCHLUSSLOS_MAX = 1 / 3;
      const ohneAnschluss = zuege
        .slice(1)
        .filter((z) => ZUGARTEN[z].schliesst.length === 0 && ZUGARTEN[z].verlangt === undefined)
        .length;
      if (zuege.length > 1 && ohneAnschluss / (zuege.length - 1) > ANSCHLUSSLOS_MAX) {
        melde(
          'fehler',
          'anschluss',
          `${ohneAnschluss} von ${zuege.length - 1} Zeilen gehen auf nichts ein, erlaubt ist ` +
            'ein Drittel. Wer nur behauptet und nachlegt, hält einen Vortrag zu zweit.',
        );
      }

      /*
       * **Kein Zugpaar ueber der Haelfte.** Die Regel hiess bis zum 02.09.2026
       * „kein Zugpaar dreimal", gerechnet aus elf Paaren und 72 moeglichen
       * Kombinationen: Erwartungswert 0,76, drei waeren der Takt.
       *
       * **Die Rechnung war richtig und die Annahme darunter falsch.** Sie
       * behandelt Zugpaare als gleich wahrscheinlich. Das sind sie nicht:
       * „Nachhaken → Beantworten" ist die Grundbewegung jedes Gespraechs, und
       * in Emirhans zehn Dialogen steht sie vier- bis fuenfmal je Short. Acht
       * Meldungen an zehn guten Dialogen, und keine davon hatte recht.
       *
       * Die Grenze haengt jetzt an der Laenge des Shorts statt an einer festen
       * Zahl: Ein Paar darf bis zur **Haelfte** aller Wechsel stellen. Damit
       * faengt sie weiter, wogegen sie gebaut war — `(behaupten → abbiegen)`
       * als halber Short ist die Bauform des ersten Videos in einer Zeile —
       * und laesst das Frage-und-Antwort-Gespraech in Ruhe.
       */
      const paare = new Map<string, number>();
      for (let i = 1; i < zuege.length; i++) {
        const paar = `${ZUGARTEN[zuege[i - 1]!].name} → ${ZUGARTEN[zuege[i]!].name}`;
        paare.set(paar, (paare.get(paar) ?? 0) + 1);
      }
      const wechsel = Math.max(zuege.length - 1, 1);
      for (const [paar, anzahl] of paare) {
        if (anzahl <= wechsel / 2) continue;
        melde(
          'fehler',
          'zugpaar',
          `Der Wechsel „${paar}" steht ${anzahl}-mal von ${wechsel} im selben Short. ` +
            'Mehr als die Hälfte aller Wechsel ist der Takt, an dem der Zuschauer die Mechanik hört.',
        );
      }

      /*
       * **Wo ein Zug still verlorengeht.** `redelaeufe` haengt zwei Anteile
       * derselben Figur **innerhalb einer Szene** zu einem Syntheseaufruf
       * zusammen, weil sonst eine Sprecherpause entstuende, wo kein Sprecher
       * wechselt. Ein Abschnitt traegt aber genau einen Zug — der erste
       * gewinnt, der zweite kommt im Bild nie an.
       *
       * **Hinweis und nicht Fehler.** Die Verschmelzung ist richtig, und der
       * Verlust ist meistens folgenlos: Er faellt nur ins Gewicht, wenn der
       * zweite Zug eine andere `aufrichtung` traegt als der erste. Genau das
       * meldet die Regel, statt jeden Fall zu zaehlen.
       *
       * Am 01.09.2026 gab es drei solche Stellen in vier Shorts, keine davon
       * mit unterschiedlicher Haltung. Der alte Plan hielt den Fall noch fuer
       * theoretisch — damals wechselten alle vier Entwuerfe strikt ab.
       */
      short.szenen.forEach((szene, si) => {
        const anteile = szene.rede ?? [];
        for (let i = 1; i < anteile.length; i += 1) {
          const vor = anteile[i - 1]!;
          const jetzt = anteile[i]!;
          if (vor.sprecher !== jetzt.sprecher) continue;
          const a = ZUGARTEN[vor.zug].aufrichtung ?? 0;
          const b = ZUGARTEN[jetzt.zug].aufrichtung ?? 0;
          if (a === b) continue;
          melde(
            'hinweis',
            'zugverlust',
            `Szene ${si + 1}: „${ZUGARTEN[jetzt.zug].name}" folgt auf ` +
              `„${ZUGARTEN[vor.zug].name}" bei derselben Figur. Beide gehen in einen ` +
              'Syntheseaufruf, der Zug des ersten gewinnt — die Haltung des zweiten ' +
              'kommt im Bild nicht an.',
          );
        }
      });

      /*
       * **Ein Beat an einer Naht, die es nicht gibt.** `redelaeufe` haengt zwei
       * Anteile derselben Figur innerhalb einer Szene zu einem Syntheseaufruf
       * zusammen — dort ist keine Stelle, in die sich eine Pause legen liesse.
       * Ein `beatSek` auf so einer Zeile wirkt nicht, und zwar lautlos.
       *
       * Fehler und nicht Hinweis: Anders als beim verlorenen Zug gibt es hier
       * nichts abzuwaegen. Wer einen Beat bestellt, will ihn hoeren.
       */
      short.szenen.forEach((szene, si) => {
        const anteile = szene.rede ?? [];
        for (let i = 1; i < anteile.length; i += 1) {
          const jetzt = anteile[i]!;
          if (jetzt.beatSek === undefined) continue;
          if (anteile[i - 1]!.sprecher !== jetzt.sprecher) continue;
          melde(
            'fehler',
            'beatverlust',
            `Szene ${si + 1}: „${jetzt.text.slice(0, 30)}…" bestellt einen Beat von ` +
              `${jetzt.beatSek}s, folgt aber auf dieselbe Figur. Beide gehen in einen ` +
              'Syntheseaufruf — dort gibt es keine Naht, und der Beat verschwindet.',
          );
        }
      });

      /*
       * **Der Bogen sagt zu, wie es ausgeht.** Das einzige Feld aus
       * `GESPRAECHSBOEGEN`, das eine Pruefung traegt — alles andere darin ist
       * Handreichung fuer den Entwurf und wird ausdruecklich von keinem Skript
       * gelesen.
       */
      const letzter = zuege[zuege.length - 1]!;
      const bogen = GESPRAECHSBOEGEN[short.format];
      if (!bogen.schluss.includes(letzter)) {
        melde(
          'hinweis',
          'bogen',
          `Der Short endet auf „${ZUGARTEN[letzter].name}". ${FORMATE[short.format].show} ` +
            `endet laut Bogen auf ${bogen.schluss.map((z) => ZUGARTEN[z].name).join(', ')} — ` +
            `die Wendung ist ${bogen.wendung.toLowerCase()}`,
        );
      }
    }
  }

  /* ── Behoerdendeutsch ────────────────────────────────────────────── */

  /*
   * Die Belegpflicht flacht die Sprache ab, und niemand hat es entschieden.
   *
   * Ein Satz muss vom Zitat gedeckt sein. Der sicherste Weg, gedeckt zu sein,
   * ist, dicht am Zitat zu bleiben — also schreibt sich der Sprechtext von
   * selbst in Richtung Amtssprache. Im Short vom 25.08.2026 waren vier von
   * sechs gesprochenen Saetzen das BSI mit anderer Wortstellung:
   * „routinemaessig", „laut Behoerde", „unbefugte Dritte".
   *
   * Die Regel dreht das um. **Das Zitat bleibt woertlich Amtsdeutsch und ist
   * als Zitat erkennbar; alles, was der Kanal in eigenen Worten sagt, ist
   * Alltagssprache.** Bisher lief es andersherum — das Zitat stand klein oben
   * in der Einblendung, gesprochen wurde die Behoerdenfassung.
   *
   * **Der Doppelpunkt ist die Grenze.** Geprueft wird nur, was **vor** dem
   * ersten Doppelpunkt einer Sprecheinheit steht; alles dahinter gilt als
   * ausgeliefertes Zitat („Das BSI schreibt: …"). Das ist bewusst grob: Ein
   * Doppelpunkt steht hier auch mal ohne Quelle dahinter („Zwei Artikel
   * weiter:"), und dort schweigt die Regel dann zu Unrecht. Der Fehler geht
   * in die harmlose Richtung — eine Wache, die zu viel meldet, wird
   * abgeschaltet.
   *
   * Die Liste haelt nur Woerter, die unverwechselbar Amtsdeutsch sind. Woerter
   * wie „vermehrt" oder „vorhersehbar" stehen bewusst nicht darin: Sie sind
   * steif, aber sie sind auch normales Deutsch, und eine Wache, die normales
   * Deutsch meldet, erzieht zum Ausweichen statt zum Umschreiben.
   */
  const AMTSDEUTSCH = [
    'laut behörde',
    'gemäß',
    'routinemäßig',
    'im sinne von',
    'unbefugte dritte',
    'seitens',
    'zwecks',
    'diesbezüglich',
    'in diesem zusammenhang',
    'ist sicherzustellen',
    'ist zu gewährleisten',
  ];
  for (const szene of short.szenen) {
    const gesprochen = szene.sprechtext;
    if (!gesprochen) continue;
    // Nur der Teil vor dem ersten Doppelpunkt — dahinter steht das Zitat.
    const eigeneWorte = ohneSatzzeichen(gesprochen.split(':')[0] ?? '');
    const treffer = AMTSDEUTSCH.filter((w) => eigeneWorte.includes(w));
    if (treffer.length > 0) {
      melde(
        'fehler',
        'sprache',
        `„${treffer.join('", „')}" steht im Sprechtext außerhalb eines Zitats. ` +
          'Das Zitat bleibt wörtlich, alles andere ist Alltagssprache.',
      );
    }
  }

  /* ── Sprechdauer ─────────────────────────────────────────────────── */

  if (short.tonspur) {
    const d = short.tonspur.dauerSek;
    const [von, bis] = zielfenster();

    /*
     * Seit dem 16.08.2026 ist das Fenster selbst die harte Grenze. Vorher lag
     * darueber noch eine zweite Stufe („ausnahmslos 45 s") — ein Rest aus der
     * Zeit mit zwei Fenstern. Mit einem Fenster hat sie keine Aufgabe mehr.
     *
     * Beide Richtungen sind Fehler, und die obere ist die wichtigere: Zu lang
     * war der einzige Kritikpunkt am ersten veroeffentlichten Lauf. Nach unten
     * ist es ebenfalls ein Fehler, weil ein Fakt unter 18 Sekunden seinen
     * Beleg nicht mehr unterbringt — und ohne Beleg ist er eine Behauptung.
     */
    if (d > bis) {
      melde(
        'fehler',
        'laenge',
        `${d.toFixed(1)}s überschreitet das Zielfenster ${von}–${bis}s. ` +
          `Zielwert ist die Mitte bei ${((von + bis) / 2).toFixed(0)}s, nicht der Rand.`,
      );
    } else if (d < von) {
      melde(
        'fehler',
        'laenge',
        `${d.toFixed(1)}s unterschreitet das Zielfenster ${von}–${bis}s – für Fakt, Beleg und Merksatz zu knapp.`,
      );
    }

    if (short.tonspur.woerter.length === 0) {
      melde('fehler', 'untertitel', 'Die Tonspur hat keine Wort-Zeitstempel – es gäbe keine Untertitel.');
    }
  } else {
    /*
     * Ohne Tonspur wird geschaetzt. Das ist ungenau, aber es kommt zur
     * richtigen Zeit: Wer erst nach der Vertonung erfaehrt, dass sein Short
     * zu kurz geraten ist, hat das Zeichenkontingent schon ausgegeben.
     * Deshalb Hinweis und nicht Fehler — die Schaetzung soll warnen, nicht
     * den Trockenlauf blockieren.
     */
    const geschaetzt = geschaetzteDauerSek(short);
    const [von, bis] = zielfenster();
    if (geschaetzt < von || geschaetzt > bis) {
      melde(
        'hinweis',
        'laenge',
        `Geschätzt ${geschaetzt.toFixed(0)}s, Zielfenster ${von}–${bis}s. ` +
          'Vor der Vertonung anpassen – danach kostet es Kontingent.',
      );
    }
  }

  /*
   * **Hier stand die Wache ueber den Zielwert der Bauform, gestrichen am
   * 02.09.2026.**
   *
   * Sie meldete, wenn ein Short mehr als ein Fuenftel von 45, 52 oder 62
   * Sekunden abwich. Die drei Zahlen sind mit ihr gegangen: Sie waren nie
   * gemessen, standen selbst als „Versuchsaufbau" im Code, und daneben liegen
   * jetzt zehn eigene Dialoge zwischen 40 und 78 Sekunden — die sich nicht
   * nach Bauform verteilen, sondern nach dem, was zu erzaehlen ist.
   *
   * **Eine Wache auf einer geratenen Zahl meldet nicht den Fehler, sondern die
   * Abweichung von einer Vermutung.** Was bleibt, ist das harte Fenster
   * darueber, und das ist jetzt am eigenen Material gemessen.
   */

  return befunde;
};

/**
 * Regeln, die erst im Verbund sichtbar werden.
 *
 * Ein Short fuer sich kann tadellos sein und der Lauf trotzdem misslungen:
 * fuenf Videos, die alle dasselbe tun. Die Befunde haengen bewusst an den
 * beteiligten Shorts statt am Lauf — nur so erscheinen sie in der Freigabe
 * dort, wo die Entscheidung faellt.
 */
/**
 * Wie viele Zugketten es ueberhaupt gibt — Laenge 2, 3 und 4.
 *
 * Gerechnet aus `ZUGARTEN` und nicht danebengeschrieben, weil eine
 * danebengeschriebene Zahl beim naechsten Zug still falsch wird. Genau das ist
 * am 02.09.2026 passiert: `bitten` kam dazu, und drei Zahlen im Kommentar
 * darueber stimmten von da an nicht mehr.
 *
 * Das Modell ist das, was die uebrigen Regeln erzwingen:
 *
 * - **Beleg, Reaktion, Beleg im Wechsel.** Zwei behauptende Zuege
 *   hintereinander sind kein Gespraech, sondern ein Vortrag — dagegen stehen
 *   `stimmanteil` und `redelauf`.
 * - **Die Antwortpflicht.** Wer `widersprechen` sagt, bekommt einen Konter;
 *   wer `nachhaken` oder `bitten` sagt, eine Auskunft.
 *
 * Das ist eine Naeherung und will keine sein: Sie sagt die Groessenordnung,
 * und die entscheidet, auf welcher Kettenlaenge die laufweite Regel sitzt.
 */
const ZUGRAUM: Record<number, number> = (() => {
  const alle = Object.keys(ZUGARTEN) as Zug[];
  const folgt = (a: Zug, b: Zug): boolean => {
    if (ZUGARTEN[a].behauptet === ZUGARTEN[b].behauptet) return false;
    const verlangt = ZUGARTEN[a].verlangt;
    return verlangt === undefined || ZUGARTEN[b].schliesst.includes(verlangt);
  };
  const zaehle = (laenge: number): number => {
    let n = 0;
    const lauf = (kette: Zug[]): void => {
      if (kette.length === laenge) {
        n += 1;
        return;
      }
      for (const z of alle) {
        if (kette.length === 0 || folgt(kette[kette.length - 1]!, z)) lauf([...kette, z]);
      }
    };
    lauf([]);
    return n;
  };
  return { 2: zaehle(2), 3: zaehle(3), 4: zaehle(4) };
})();

const laufweiteBefunde = (shorts: Short[], verlauf: Verlaufslauf[] = []): Befund[] => {
  const befunde: Befund[] = [];

  /* ── Was der Verlauf weiss ───────────────────────────────────────── */

  /*
   * Die einzigen zwei Regeln im ganzen System, die ueber die Woche
   * hinausschauen. Beide nur Hinweise: Ein Lauf soll nicht daran scheitern,
   * dass vor vier Monaten etwas Aehnliches lief.
   */
  /*
   * Hier stand bis zum 15.08.2026 eine Rotationsregel: Welche Rubrik zweimal
   * in Folge ohne Vertiefung lief, bekam einen Hinweis. Mit der Vertiefung
   * ist sie gegenstandslos — jetzt ist jeder Short knapp.
   */

  const bekannteThemen = gelaufeneThemen(verlauf);
  for (const short of shorts) {
    const frueher = bekannteThemen.get(short.themaId);
    if (!frueher) continue;
    befunde.push({
      stufe: 'hinweis',
      shortId: short.id,
      regel: 'wiederholung',
      text: `Thema „${short.themaId}" lief schon im Lauf ${frueher}.`,
    });
  }

  /* ── Ausrufe und Schlussformeln: nicht zweimal hintereinander ────── */

  /*
   * **Die beiden Vorraete, die bis zum 02.09.2026 nur in Prosa standen.**
   *
   * `voice.md` sagt seit dem 25.08.2026: „Der Ausruf darf nie zum Markenwort
   * werden … dasselbe Wort steht nicht zweimal im selben Lauf." Das war die
   * einzige Humorregel des Kanals **ohne Wache** — kein Skript kannte den
   * Vorrat, also konnte keins ihn zaehlen.
   *
   * Voltis Schlussformel bekommt dieselbe Regel, bevor es sie ueberhaupt
   * mehrfach gibt. Der Grund steht in der Projektgeschichte: „Eine Regel, die
   * erst gebaut wird, wenn sie gebraucht wird, wird unter Zeitdruck gebaut."
   *
   * **Hinweis und kein Fehler, und nur auf benachbarten Shorts.** Ein Ausruf,
   * der zweimal in derselben Woche faellt, ist Sprache; zweimal hintereinander
   * ist ein Takt, den man hoert. Dieselbe Schwelle wie beim Zugtripel.
   */
  const gesagteZeilen = (short: Short): string[] =>
    short.szenen.flatMap((sz) => (sz.rede ?? []).map((r) => r.text));

  const vorratsTreffer = (short: Short, vorrat: readonly string[]): string[] => {
    const zeilen = gesagteZeilen(short).map((t) => t.toLowerCase());
    return vorrat.filter((v) => zeilen.some((z) => z.includes(v.toLowerCase())));
  };

  for (let i = 1; i < shorts.length; i += 1) {
    const vorher = shorts[i - 1]!;
    const jetzt = shorts[i]!;
    for (const [was, vorrat] of [
      ['Ausruf', AUSRUFE],
      ['Schlussformel', SCHLUSSFORMELN],
    ] as const) {
      const davor = new Set(vorratsTreffer(vorher, vorrat));
      const doppelt = vorratsTreffer(jetzt, vorrat).filter((v) => davor.has(v));
      if (doppelt.length === 0) continue;
      befunde.push({
        stufe: 'hinweis',
        shortId: jetzt.id,
        regel: was === 'Ausruf' ? 'ausruf' : 'schlussformel',
        text:
          `„${doppelt.join('", „')}" steht in ${vorher.id} und ${jetzt.id}. ` +
          `Der ${was}vorrat ist da, damit nichts zum Markenwort wird — ` +
          'ein fester Marker ist in vier Wochen eine Schablone.',
      });
    }
  }

  /* ── Keine Kaltstart-Art zweimal hintereinander ──────────────────── */

  /*
   * **Eine Obergrenze, kein Mindestmass** — wie bei den Zugarten.
   *
   * Der Kaltstart ist das Erste, was der Zuschauer von einem Short sieht, und
   * zwei Videos, die beide mit „So. Zwoelf Stunden geladen." beginnen, lesen
   * sich als dasselbe Video. Wer anfaengt, steht ohnehin am Format
   * (`KALTSTART_SPRECHER`) und streut sich damit von selbst; hier geht es um
   * die **Machart**, nicht um die Figur.
   *
   * Hinweis und kein Fehler: Ein fertiger Lauf soll nicht daran scheitern,
   * dass zwei gute Kaltstarts denselben Bau haben. Dieselbe Begruendung wie
   * beim Zugtripel.
   */
  for (let i = 1; i < shorts.length; i += 1) {
    const vorher = shorts[i - 1]!;
    const jetzt = shorts[i]!;
    if (vorher.kaltstart.art !== jetzt.kaltstart.art) continue;
    const art = KALTSTART_ARTEN.find((a) => a.schluessel === jetzt.kaltstart.art);
    befunde.push({
      stufe: 'hinweis',
      shortId: jetzt.id,
      regel: 'kaltstart',
      text:
        `„${art?.name ?? jetzt.kaltstart.art}" eröffnet ${vorher.id} und ${jetzt.id}. ` +
        'Zwei Shorts hintereinander mit demselben Anfang lesen sich als derselbe Short.',
    });
  }

  /* ── Kein Format zweimal hintereinander ──────────────────────────── */

  /*
   * **Diese Regel hat am 20.08.2026 die Richtung gewechselt.**
   *
   * Vorher hiess sie „jedes Format genau einmal je Lauf" und prueste beides:
   * ein Format doppelt und ein Format fehlend. Sie war richtig, solange das
   * Format ein Sendeplatz war — montags die Skala, dienstags das Maerchen. Wer
   * zweimal dasselbe Format brachte, liess einen Wochentag ausfallen, und der
   * Zuschauer, der dienstags kam, fand nichts.
   *
   * Mit dem Wegfall des Wochentags faellt die Begruendung weg, und die Regel
   * waere zum Zwang geworden: Bei vier Formaten haette sie jede Woche genau
   * diese vier verlangt, in derselben Zusammensetzung — also die Wiederholung
   * erzwungen, die die Retention-Ladder als Verteilungsrisiko nennt
   * („volume without novelty is a negative").
   *
   * **Die Gegenprobe auf fehlende Formate ist ersatzlos gestrichen.** Kein
   * Format ist mehr Pflicht. Was sie einmal fand — ein Lauf mit sechs Shorts,
   * bei dem die Dopplungspruefung schwieg, weil nichts doppelt war — kann
   * nicht mehr auftreten, weil es keinen Sollbestand mehr gibt. Der Befund von
   * damals bleibt trotzdem lesenswert: Sie stand bis zum 17.08.2026 hinter
   * `if (shorts.length === wochenformate.length)` und war damit genau dann
   * still, wenn sie gebraucht wurde. **Eine Wache, die sich bei Abweichung
   * selbst abschaltet, ist keine Wache.**
   *
   * Was bleibt, ist die Neuheitsregel. Zwei gleiche Formate direkt
   * hintereinander sehen im Feed wie dasselbe Video aus — dort liegen sie an
   * aufeinanderfolgenden Tagen und treffen dieselben Zuschauer. Verteilt im
   * Lauf ist dasselbe Format dagegen unbedenklich.
   *
   * Die Reihenfolge der Liste ist dafuer massgeblich, weil `zeitplanBauen` den
   * Termin daraus ableitet.
   */
  const proFormat = new Map<Format, Short[]>();
  for (const short of shorts) {
    proFormat.set(short.format, [...(proFormat.get(short.format) ?? []), short]);
  }

  for (let i = 1; i < shorts.length; i++) {
    const vorher = shorts[i - 1];
    const jetzt = shorts[i];
    if (!vorher || !jetzt || vorher.format !== jetzt.format) continue;
    befunde.push({
      stufe: 'fehler',
      shortId: jetzt.id,
      regel: 'format',
      text:
        `Format „${FORMATE[jetzt.format].titel}" läuft zweimal hintereinander ` +
        `(${vorher.id}, ${jetzt.id}). Im Feed sind das aufeinanderfolgende Tage und dieselben ` +
        `Zuschauer. Einen der beiden im Lauf nach hinten schieben.`,
    });
  }

  /*
   * Dazu die weichere Haelfte: Ein Lauf, der ueberwiegend aus einem Format
   * besteht, ist kein Fehler, aber ein Zeichen. Meistens heisst es, dass ein
   * Fach leer laeuft und der Rest aus dem vollsten aufgefuellt wurde.
   *
   * Erst ab vier Shorts, weil die Haelfte darunter keine Aussage ist: Bei zwei
   * Shorts ist ein Format zwangslaeufig die Haelfte.
   */
  if (shorts.length >= 4) {
    for (const [format, gruppe] of proFormat) {
      const erster = gruppe[0];
      if (!erster || gruppe.length * 2 <= shorts.length) continue;
      befunde.push({
        stufe: 'hinweis',
        shortId: erster.id,
        regel: 'format',
        text:
          `${gruppe.length} von ${shorts.length} Shorts sind „${FORMATE[format].titel}". ` +
          `Meistens heißt das, ein anderes Fach läuft leer — \`npm run pruefen\` nennt die Reichweite je Format.`,
      });
    }
  }

  /* ── Bauform: nicht zweimal hintereinander, nicht ein Drittel ────── */

  /*
   * Dieselbe Rechnung wie beim Format, aus einem anderen Grund. Das Format
   * sagt, was ein Short **ausloest**; die Bauform sagt, wie er **aussieht** —
   * und im Feed entscheidet das Aussehen, ob der naechste wie derselbe wirkt.
   *
   * Der Anlass steht nicht im Geschmack, sondern bei YouTube: Seit Juli 2025
   * wird schablonenhaftes KI-Material unterdrueckt, und die Machart, die wir
   * neun Videos lang gefahren haben, ist die Voreinstellung einer ganzen
   * Gattung.
   *
   * ## Aus dem Drittel ist die Haelfte geworden (31.08.2026)
   *
   * Die Regel hiess „hoechstens ein Drittel je Lauf, ab sechs Shorts", und sie
   * war richtig, solange es **vier** Bauformen gab. Mit dem Wegfall von
   * `einstimmig` sind es drei, und dieselbe Rechnung kippt:
   *
   * - Bei sechs Shorts erlaubt ein Drittel genau zwei je Bauform. Das ist
   *   **2/2/2 und sonst nichts** — keine Wache mehr, sondern ein Stundenplan.
   * - Bei sieben Shorts erlaubt sie weiterhin zwei, also hoechstens sechs
   *   insgesamt. **Die Regel waere unerfuellbar**, und sieben ist die
   *   Obergrenze des Takts.
   *
   * Beides ist derselbe Zwang, an dem die alte Formatregel gescheitert ist,
   * nur von der anderen Seite. Die Lehre daraus stand schon einmal hier: **Eine
   * Wache, die sich bei Abweichung selbst abschaltet, ist keine Wache** — und
   * eine, die bei sieben Shorts nicht mehr erfuellbar ist, ebenso wenig.
   *
   * Jetzt gilt dieselbe Schwelle wie beim Format: **mehr als die Haelfte**, ab
   * vier Shorts. Bei sieben laesst das 3/2/2 zu und meldet erst, wenn eine
   * Bauform wirklich dominiert.
   */
  const proBauform = new Map<Bauform, Short[]>();
  for (const short of shorts) {
    proBauform.set(short.bauform, [...(proBauform.get(short.bauform) ?? []), short]);
  }

  for (let i = 1; i < shorts.length; i++) {
    const vorher = shorts[i - 1];
    const jetzt = shorts[i];
    if (!vorher || !jetzt || vorher.bauform !== jetzt.bauform) continue;
    befunde.push({
      stufe: 'fehler',
      shortId: jetzt.id,
      regel: 'bauform',
      text:
        `Bauform „${BAUFORMEN[jetzt.bauform].titel}" läuft zweimal hintereinander ` +
        `(${vorher.id}, ${jetzt.id}). Zwei gleich gebaute Videos an aufeinanderfolgenden ` +
        `Tagen sehen für denselben Zuschauer aus wie eins.`,
    });
  }

  if (shorts.length >= 4) {
    for (const [bauform, gruppe] of proBauform) {
      const erster = gruppe[0];
      if (!erster || gruppe.length * 2 <= shorts.length) continue;
      befunde.push({
        stufe: 'fehler',
        shortId: erster.id,
        regel: 'bauform',
        text:
          `${gruppe.length} von ${shorts.length} Shorts sind „${BAUFORMEN[bauform].titel}" ` +
          `(${gruppe.map((s) => s.id).join(', ')}). Höchstens die Hälfte je Lauf.`,
      });
    }
  }

  /* ── Nicht alle Shorts in derselben Längenklasse ─────────────────── */

  /*
   * **Der Laengenversuch bis Oktober, als Wache.**
   *
   * Emirhans Vorschlag vom 26.08.2026: bis Oktober absichtlich verschiedene
   * Laengen senden, damit sich ueberhaupt vergleichen laesst, welche ankommt.
   * Bisher ist genau **eine** Laenge gemessen — alle neun veroeffentlichten
   * Videos sind 20 bis 23 Sekunden lang.
   *
   * **Hinweis und kein Fehler**, und das ist wichtig: „Laenge ist eine Folge
   * davon, wie viel es zu zeigen gibt" bleibt die staerkere Regel. Es gibt
   * Wochen, in denen das Material die Klasse vorgibt, und einen fertigen Lauf
   * dafuer zurueckzuhalten hiesse, den Versuchsaufbau ueber den Inhalt zu
   * stellen.
   *
   * Erst ab drei Shorts. Bei zweien ist „beide in derselben Klasse" keine
   * Einseitigkeit, sondern die Haelfte aller Moeglichkeiten.
   */
  if (shorts.length >= 3) {
    const klassen = new Set(
      shorts.map((s) => laengenklasseVon(geschaetzteDauerSek(s)).name),
    );
    if (klassen.size === 1) {
      const erster = shorts[0];
      if (erster) {
        befunde.push({
          stufe: 'hinweis',
          shortId: erster.id,
          regel: 'laenge',
          text:
            `Alle ${shorts.length} Shorts liegen in derselben Längenklasse (${[...klassen][0]}). ` +
            'Bis Oktober läuft der Versuch, verschiedene Längen zu senden — gemessen ist ' +
            'bisher nur eine. Eine andere Bauform im Lauf trägt eine andere Länge.',
        });
      }
    }
  }

  /* ── Kein Zugtripel in zwei Shorts hintereinander ────────────────── */

  /*
   * **Die einzige Gespraechsregel, die ueber den einzelnen Short hinausschaut.**
   *
   * Sie sitzt auf dem **Tripel**, und die Ebene ist gerechnet, nicht gewaehlt:
   *
   * | Einheit | moegliche | in 3 gesehenen Shorts erwartet |
   * |---|---|---|
   * | Zugpaar | 73 | ~30 je Woche — harmlos, das ist Sprache |
   * | **Zugtripel** | 403 | **~1,0 — die Sichtbarkeitsschwelle** |
   * | Zugquadrupel | 2.263 | 0,19 — unsichtbar |
   *
   * Eine Regel auf Paarebene waere bei sieben Shorts je Woche **unerfuellbar**
   * — dieselbe Rechnung, an der die Drittelregel fuer Bauformen gekippt ist.
   * Eine auf Quadrupelebene waere tote Regel.
   *
   * **Die Zahlen werden gerechnet und nicht mehr danebengeschrieben.** Hier
   * standen 72, 380 und 2.600, gueltig fuer zwoelf Zugarten — und am
   * 02.09.2026 kam `bitten` dazu und machte alle drei still falsch. Die
   * Herleitung von damals ist nirgends aufgeschrieben und laesst sich nicht
   * nachvollziehen; `ZUGRAUM` unten rechnet sie stattdessen aus `ZUGARTEN`,
   * mit dem Modell, das die Regeln wirklich erzwingen: **Beleg, Reaktion,
   * Beleg** im Wechsel, dazu die Antwortpflicht. Eine Zahl, die aus ihrer
   * Quelle faellt, kann nicht veralten.
   *
   * **Nur benachbarte Shorts**, nicht der ganze Lauf. Ein Tripel, das am
   * Montag und am Freitag vorkommt, sieht niemand; zwei Videos an
   * aufeinanderfolgenden Tagen sieht derselbe Zuschauer hintereinander — genau
   * die Begruendung, aus der auch die Format- und Bauformregel auf Nachbarn
   * sitzt.
   *
   * **Hinweis und kein Fehler.** Alle Zahlen oben sind gerechnet und stehen
   * unter demselben Vorbehalt wie die Zielwerte in `BAUFORMEN`: Sie sagen,
   * wie oft eine Wiederholung bei gleichverteilter Wahl auftraete, und die
   * Wahl ist nicht gleichverteilt. Ein fertiger Lauf soll daran nicht
   * scheitern.
   */
  const tripel = (short: Short): Set<string> => {
    const zuege = short.szenen.flatMap((sz) => sz.rede ?? []).map((r) => r.zug);
    const menge = new Set<string>();
    for (let i = 2; i < zuege.length; i += 1) {
      menge.add(`${zuege[i - 2]} → ${zuege[i - 1]} → ${zuege[i]}`);
    }
    return menge;
  };

  for (let i = 1; i < shorts.length; i += 1) {
    const vorher = shorts[i - 1]!;
    const jetzt = shorts[i]!;
    const vorherige = tripel(vorher);
    const doppelt = [...tripel(jetzt)].filter((t) => vorherige.has(t));
    if (doppelt.length === 0) continue;
    befunde.push({
      stufe: 'hinweis',
      shortId: jetzt.id,
      regel: 'zugtripel',
      text:
        `${doppelt.length === 1 ? 'Die Zugfolge' : `${doppelt.length} Zugfolgen, darunter`} ` +
        `„${doppelt
          .slice(0, 2)
          .map((t) =>
            t
              .split(' → ')
              .map((z) => ZUGARTEN[z as Zug].name)
              .join(' → '),
          )
          .join('", „')}" steht in ${vorher.id} und ${jetzt.id}. ` +
        `Bei ${ZUGRAUM[3]} möglichen Tripeln liegt die Erwartung bei rund einer je drei ` +
        'gesehenen Shorts — an zwei aufeinanderfolgenden Tagen hört man den Takt.',
    });
  }

  /* ── Kein Sachgebiet öfter als zweimal ───────────────────────────── */

  /*
   * Die zweite, viel lockerere Achse. Sieben Formate garantieren sieben
   * verschiedene **Zugriffe**, aber nicht sieben verschiedene **Gegenstaende**
   * — eine Woche aus sieben Kabelvideos waere formal tadellos und trotzdem
   * eine Kabelwoche.
   *
   * Zwei sind erlaubt, weil sieben Videos auf fuenf Sachgebiete nicht
   * gleichmaessig aufgehen. Drei sind zu viel: Dann handelt fast die halbe
   * Woche vom selben Gegenstand.
   */
  const proSachgebiet = new Map<Sachgebiet, Short[]>();
  for (const short of shorts) {
    proSachgebiet.set(short.sachgebiet, [...(proSachgebiet.get(short.sachgebiet) ?? []), short]);
  }

  for (const [sachgebiet, gruppe] of proSachgebiet) {
    if (gruppe.length <= 2) continue;
    for (const short of gruppe) {
      befunde.push({
        stufe: 'fehler',
        shortId: short.id,
        regel: 'sachgebiet',
        text:
          `Sachgebiet „${SACHGEBIETE[sachgebiet].titel}" trägt ${gruppe.length} der ` +
          `${shorts.length} Shorts (${gruppe.map((s) => s.id).join(', ')}). Höchstens zwei je Woche.`,
      });
    }
  }

  /* ── Abnutzung: gleiche Muster, gleiche Vertiefungen ─────────────── */

  /*
   * Beides nur ein Hinweis. Es gibt Wochen, in denen zwei Fehlspuren die
   * richtige Wahl sind — aber ab der dritten merkt der Zuschauer, dass da
   * immer erst eine falsche Antwort kommt. Die Fehlspur nutzt sich am
   * schnellsten ab, weil sie am auffaelligsten ist.
   */
  const haeufung = <T extends string>(
    schluessel: (s: Short) => T | undefined,
    regel: string,
    benenne: (wert: T) => string,
  ) => {
    const gruppen = new Map<T, Short[]>();
    for (const short of shorts) {
      const wert = schluessel(short);
      if (!wert) continue;
      gruppen.set(wert, [...(gruppen.get(wert) ?? []), short]);
    }
    for (const [wert, gruppe] of gruppen) {
      if (gruppe.length < 3) continue;
      for (const short of gruppe) {
        befunde.push({
          stufe: 'hinweis',
          shortId: short.id,
          regel,
          text: `${benenne(wert)} kommt ${gruppe.length}× im Lauf vor. Ab drei klingt die Woche nach Schablone.`,
        });
      }
    }
  };

  /*
   * Die Haeufungspruefung sucht seit dem 16.08.2026 nichts mehr: Sie zaehlte
   * gleiche Titelmuster, und die gibt es nicht mehr. Was sie ersetzt hat, ist
   * strenger — jedes Format genau einmal je Lauf, geprueft als Fehler.
   *
   * Die Funktion bleibt stehen, weil die naechste Achse kommt, sobald es zehn
   * Videos je Woche sind: Dann laufen Formate doppelt, und „kein Format
   * oefter als dreimal" wird wieder eine echte Frage.
   */
  void haeufung;

  /* ── Kein Szenenbild im Uebermass ────────────────────────────────── */

  const HOECHSTZAHL = 3;

  /*
   * Was das Schema ohnehin vorschreibt, darf hier nicht als Einfallslosigkeit
   * gemeldet werden — „schluss kommt in 7 von 7 Shorts vor" ist kein Befund,
   * sondern die Regel.
   *
   * **`text` ist am 17.08.2026 dazugekommen, und das war eine Korrektur.**
   * Beim ersten Lauf nach dem Umbau meldete die Regel „Szenenart „text" kommt
   * in 7 von 7 Shorts vor" — vierzehn Hinweise, alle falsch. `text` ist seit
   * der Zusammenlegung von `hook` und `aussage` die Grundform jeder
   * gesprochenen Zeile; sie kommt zwangslaeufig ueberall vor.
   *
   * Der Fehler ist derselbe wie bei der Sprechprobe, die monatelang „weicht
   * deutlich ab" meldete: Eine Regel, die bei jedem Lauf anschlaegt, wird
   * ueberlesen — und dann uebersieht man auch den Lauf, bei dem sie recht hat.
   */
  const VORGESCHRIEBEN = new Set<string>(['text', 'schluss', 'kaufkriterien']);

  const proArt = new Map<string, Set<string>>();
  for (const short of shorts) {
    for (const art of new Set(short.szenen.map((s) => s.art))) {
      if (VORGESCHRIEBEN.has(art)) continue;
      proArt.set(art, (proArt.get(art) ?? new Set()).add(short.id));
    }
  }

  for (const [art, ids] of proArt) {
    if (ids.size <= HOECHSTZAHL) continue;
    for (const id of ids) {
      befunde.push({
        stufe: 'hinweis',
        shortId: id,
        regel: 'bildvielfalt',
        text: `Szenenart „${art}" kommt in ${ids.size} von ${shorts.length} Shorts vor. Die Macharten unterscheiden sich, das Bild nicht.`,
      });
    }
  }

  /* ── Jede symbolfähige Szene trägt eine Zeichnung ────────────────── */

  /*
   * Die Regel ist am 18.08.2026 zum zweiten Mal in zwei Tagen gekippt, und
   * beide Male aus demselben Grund: Sie stand auf der falschen Seite.
   *
   * Zuerst prüfte sie nur nach **oben** — mehr als die Hälfte der Szenen mit
   * Zeichnung sei zu viel. Ergebnis: gar keine, weil nichts nach unten fragte.
   * Dann verlangte sie **genau eine** je Short. Ergebnis: eine, und die
   * restlichen vier Szenen blieben leer.
   *
   * Jetzt ist die Doktrin eine andere, und sie kommt vom Zuschauer, nicht aus
   * der Systematik: **Jede Szene, die eine Zeichnung tragen kann, trägt
   * eine.** Die reine Typografie hält den Inhalt, aber sie lässt die Fläche
   * leer, und das fällt im Feed auf.
   *
   * Drei Arten können konstruktionsbedingt keine tragen und stehen deshalb
   * nicht in der Zählung: `vergleich` hat zwei Spalten, `kaufkriterien` eine
   * Liste, `schluss` zeigt Wortmarke und Spruch. Alle drei sind voll.
   */
  const TRAEGT_ZEICHNUNG = new Set(['text', 'zahl', 'frage', 'einschraenkung']);

  /**
   * Was eine Szene an Zeichnung zeigt — als Liste von Symbolnamen.
   *
   * Die Buehne muss hier mitgezaehlt werden, sonst arbeitet die Regel gegen
   * ihren eigenen Zweck: Sie meldet „ohne Zeichnung" fuer genau die Szenen,
   * die statt eines stehenden Symbols einen Vorgang zeigen — also fuer den
   * besseren Fall. Eine Wache, die den Fortschritt bestraft, wird abgeschaltet
   * und nicht befolgt.
   *
   * `gegenueber` steht bewusst **nicht** darin. Dort stehen zwei Symbole
   * nebeneinander, und ihr Verhaeltnis ist der Inhalt; das eine greift
   * ausserdem meistens auf, was eine fruehere Szene schon gezeigt hat. Genau
   * diese Wiederholung ist das Argument und kein Versehen — sie unten als
   * Dopplung zu melden waere ein Fehlalarm mit Ansage.
   */
  const zeichnungenVon = (szene: Szene): KontextArt[] => {
    const aus: KontextArt[] = [];
    if ('buehne' in szene && szene.buehne?.art === 'figur' && szene.buehne.requisite) {
      /*
       * `blatt` ist keine `KontextArt`, sondern eine Requisite der Figur —
       * sie steht in `Requisiten.tsx`, nicht in `Geraete.tsx`. Aus
       * der Dopplungspruefung gehoeren sie ohnehin heraus: Dass die Figur in
       * zwei Szenen liest oder zweimal auf etwas zeigt, ist eine Geste und
       * keine wiederholte Zeichnung.
       */
      const r = szene.buehne.requisite;
      if (r !== 'blatt') aus.push(r);
    }
    return aus;
  };

  const traegtBild = (szene: Szene): boolean =>
    ('symbol' in szene && szene.symbol !== undefined) ||
    ('buehne' in szene && szene.buehne !== undefined);

  for (const short of shorts) {
    const faehig = short.szenen.filter((s) => TRAEGT_ZEICHNUNG.has(s.art));
    const ohne = faehig.filter((s) => !traegtBild(s));

    if (ohne.length > 0) {
      befunde.push({
        stufe: 'hinweis',
        shortId: short.id,
        regel: 'bildvielfalt',
        text:
          `${ohne.length} von ${faehig.length} bebilderbaren Szenen ohne Zeichnung. ` +
          'Dort bleibt die Fläche unter dem Text leer.',
      });
    }

    /*
     * Dieselbe Zeichnung zweimal in einem Video liest sich nicht als Motiv,
     * sondern als Verlegenheit — beim zweiten Mal fragt der Zuschauer, ob er
     * dieselbe Szene noch einmal sieht. Ueber verschiedene Shorts hinweg ist
     * Wiederholung dagegen erwuenscht: Das Gesetzbuch soll bei jedem
     * Rechtsthema dasselbe sein.
     */
    const benutzt = short.szenen.flatMap(zeichnungenVon);
    const doppelt = benutzt.filter((s, i) => benutzt.indexOf(s) !== i);
    if (doppelt.length > 0) {
      befunde.push({
        stufe: 'hinweis',
        shortId: short.id,
        regel: 'bildvielfalt',
        text: `Zeichnung „${[...new Set(doppelt)].join(', ')}" kommt mehrfach vor.`,
      });
    }

    /*
     * Breite Pose und Requisite daneben passen nicht in denselben Raum.
     *
     * Die Buehne ist 200 Einheiten breit. Steht ein Symbol daneben, rueckt die
     * Figur um 38 nach links, und `achselzucken` stellt beide Arme so weit
     * aus, dass die linke Hand bei x = 23,3 liegt — nach der Verschiebung also
     * bei -14,7. Ein SVG mit `viewBox` verhandelt darueber nicht: Der Arm ist
     * im Bild glatt abgeschnitten.
     *
     * Gefunden am ersten echten Short, nicht in der Buehnenprobe — die zeigt
     * `stutzen` neben einem Drucker, und `stutzen` haelt die Arme am Koerper.
     * Eine Probe findet nur die Faelle, die sie auch aufstellt.
     *
     * Hinweis, nicht Fehler: Ob es reicht, haengt am Symbol, und der Ausweg
     * ist billig — eine andere Zielpose kostet nichts, weil `zeigen` und
     * `stutzen` denselben Vorgang tragen.
     */
    /*
     * **Diese Liste hiess `BREITE_POSEN` und stand hier von Hand.** Sie hatte
     * genau einen Eintrag, `achselzucken`, und `staunen` fehlte — deshalb ging
     * am 01.09.2026 ein Aufschlag durch, in dem Wattis linker Arm am
     * Ellenbogen endete.
     *
     * Sie faellt jetzt aus `zuBreiteSymbolposen`, also aus derselben Rechnung
     * wie ihr Gegenstueck im Wortwechsel. Der Kommentar darueber sagte es
     * bereits: „Eine Probe findet nur die Faelle, die sie auch aufstellt" —
     * fuer eine handgeschriebene Sperre gilt dasselbe.
     */
    /*
     * **Der Kaltstart laeuft mit, seit dem 02.09.2026.**
     *
     * Er traegt dieselbe Buehne wie jede Szene — Figur, Pose, Requisite — und
     * war beim ersten Anlauf trotzdem unsichtbar fuer diese Schleife, weil sie
     * ueber `short.szenen` lief. Zwei der vier Entwuerfe standen sofort auf
     * „staunen mit Symbol daneben", also genau auf dem Fehler, gegen den die
     * Regel darunter gebaut ist. **Eine Wache, die das neue Feld nicht kennt,
     * ist fuer dieses Feld keine.**
     */
    for (const szene of [...short.szenen, short.kaltstart]) {
      if (!('buehne' in szene) || szene.buehne?.art !== 'figur') continue;
      const { nach, requisite, stand } = szene.buehne;
      const symbolDaneben = requisite !== undefined && requisite !== 'blatt';

      /*
       * Rechts steht das Symbol. Beide dorthin geht nicht.
       *
       * Die Buehne setzt ein Symbol fest auf x = 138, und `stand: 'rechts'`
       * stellt die Figur auf denselben Punkt. Das ist kein Gedraenge, sondern
       * eine Ueberlagerung — im Bild steht die Figur *im* Drucker.
       *
       * Fehler und nicht Hinweis: Anders als bei der breiten Pose gibt es hier
       * keinen Fall, in dem es doch aufgeht.
       */
      if (stand === 'rechts' && symbolDaneben) {
        befunde.push({
          stufe: 'fehler',
          shortId: short.id,
          regel: 'bildvielfalt',
          text:
            `Figur steht rechts und „${requisite}" auch — beide liegen auf x = 138. ` +
            'Entweder ein anderer Stand oder eine gehaltene Requisite (blatt, stab).',
        });
      }

      /*
       * Klein und weit weg ist nur dann eine Geste, wenn sie hochsieht.
       *
       * `stand: 'klein'` setzt die Figur auf ein Drittel ihrer Groesse an den
       * unteren Rand. Schaut sie dabei geradeaus, wirkt sie nicht klein,
       * sondern nur entfernt — und der Sinn der Anordnung, dass ueber ihr etwas
       * steht, geht verloren.
       */
      if (stand === 'klein' && nach !== 'hochschauen' && nach !== 'staunen') {
        befunde.push({
          stufe: 'hinweis',
          shortId: short.id,
          regel: 'bildvielfalt',
          text:
            `Figur steht klein am Rand und endet in „${nach}". Ohne Blick nach oben ` +
            'liest sich das als entfernt, nicht als kleiner Betrachter.',
        });
      }

      if (szene.buehne.gegenueber) {
        const ketten = [
          ...[szene.buehne.von, ...(szene.buehne.zwischen ?? []), szene.buehne.nach],
          ...[
            szene.buehne.gegenueber.von,
            ...(szene.buehne.gegenueber.zwischen ?? []),
            szene.buehne.gegenueber.nach,
          ],
        ];
        /*
         * **Im Schluss gilt die schaerfere Liste.** Dort stehen die Figuren auf
         * 0,92 statt 0,73, und was groesser ist, ragt frueher heraus — die
         * Sperre wandert also mit der Groesse, nicht mit der Szenenart.
         */
        const imSchluss = 'art' in szene && szene.art === 'schluss';
        const sperre = imSchluss ? ZU_BREIT_IM_SCHLUSS : ZU_BREIT_IM_WORTWECHSEL;
        const treffer = [...new Set(ketten.filter((p) => sperre.has(p)))];
        if (treffer.length > 0) {
          befunde.push({
            stufe: 'fehler',
            shortId: short.id,
            regel: 'bildvielfalt',
            text: imSchluss
              ? `„${treffer.join('", „')}" im Schluss: Der äußere Arm ragt aus dem Bild. ` +
                'Dort stehen die Figuren auf 0,92 statt 0,73, und diese Posen greifen weiter ' +
                'als 54 Einheiten – mehr passt neben die zweite Figur nicht.'
              : `„${treffer.join('", „')}" im Wortwechsel: Der äußere Arm ragt aus dem Bild. ` +
                'Diese Posen breiten beide Arme aus und brauchen die ganze Bühnenbreite – ' +
                'zu zweit gibt es die nicht. Für eine Figur allein bleiben sie erlaubt.',
          });
        }
      }

      if (symbolDaneben) {
        /*
         * **Die ganze Kette, nicht nur die Zielpose.** Vorher wurde allein
         * `nach` geprueft; eine Pose in der Mitte der Folge lief ungeprueft
         * durch. Dieselbe Korrektur wie beim Wortwechsel, nur ein paar Wochen
         * spaeter.
         *
         * **Fehler und nicht mehr Hinweis:** Der alte Kommentar begruendete
         * den Hinweis damit, dass es „am Symbol haengt, ob es reicht". Das
         * stimmt nicht — es haengt am Kamerafeld, und das ist bei jedem Symbol
         * dasselbe. Die Hand verschwindet vollstaendig, und der Ausweg kostet
         * nichts.
         */
        const kette = [szene.buehne.von, ...(szene.buehne.zwischen ?? []), nach];
        const treffer = [...new Set(kette.filter((p) => ZU_BREIT_MIT_SYMBOL.has(p)))];
        if (treffer.length > 0) {
          befunde.push({
            stufe: 'fehler',
            shortId: short.id,
            regel: 'bildvielfalt',
            text:
              `„${treffer.join('", „')}" mit „${requisite}" daneben: Der äußere Arm läuft ` +
              'aus dem Bild. Die Figur steht dann links auf x = 52, und das Kamerafeld ' +
              'beginnt bei −2,9 — mehr als 55 Einheiten Reichweite passen nicht.',
          });
        }
      }
    }
  }

  return befunde;
};

/**
 * Prueft alle Shorts eines Laufs und fasst zusammen.
 *
 * `verlauf` ist optional, damit die Pruefung ohne Historie lauffaehig
 * bleibt — beim allerersten Lauf gibt es sie noch nicht, und die
 * Schemapruefung braucht sie ohnehin nicht.
 */
export const laufPruefen = (
  shorts: Short[],
  quellen: Quelle[],
  verlauf: Verlaufslauf[] = [],
  /**
   * Nur die Regeln je Short pruefen, die laufweiten auslassen.
   *
   * Fuer den Teillauf (`npm run lauf -- --nur=…`): Jede Rubrik genau einmal,
   * Vertiefung in drei von fuenf, keine Haeufung von Titelmustern — das ist
   * auf die Woche gemuenzt und schluege bei einem einzelnen Short
   * zwangslaeufig an. Eine Pruefung, die dort immer rot ist, liest bald
   * niemand mehr.
   */
  nurEinzeln = false,
) => {
  const befunde = [
    ...shorts.flatMap((s) => shortPruefen(s, quellen)),
    ...(nurEinzeln ? [] : laufweiteBefunde(shorts, verlauf)),
  ];
  const fehler = befunde.filter((b) => b.stufe === 'fehler');

  return {
    befunde,
    fehler,
    hinweise: befunde.filter((b) => b.stufe === 'hinweis'),
    /** Shorts ohne Fehler dürfen zur Freigabe. */
    freigabefaehig: shorts.filter((s) => !fehler.some((f) => f.shortId === s.id)),
  };
};
