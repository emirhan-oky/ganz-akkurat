import { BAUFORMEN,
  type Bauform,
  REAKTIONS_MACHARTEN,
  UNBETEILIGTE_ARTEN,
  Format,
  FORMATE,
  Sachgebiet,
  SACHGEBIETE,
  type KontextArt,
  type Quelle,
  type Short,
  type Szene,
} from './typen';
import { gelaufeneThemen, type Verlaufslauf } from './verlauf';
import {
  geschaetzteDauerSek,
  laengenklasseVon,
  LAENGE_SEK,
  ZEICHEN_PRO_SEKUNDE,
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

  if (erste !== undefined && erste.sprechtext.split(/\s+/).length > 9) {
    melde('hinweis', 'lesbarkeit', 'Der Aufschlag hat mehr als neun Wörter – im Feed greift er dann nicht mehr zu.');
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
  const aufschlagSzene = short.szenen.find((s) => s.position === 'aufschlag');
  const hookText = aufschlagSzene?.sprechtext ?? '';
  const hookWoerter = new Set(sachwoerter(hookText));
  const videotext = short.szenen
    .flatMap((s) => textwerte(s))
    .join(' ')
    .toLowerCase();

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
      melde(
        'fehler',
        'titel',
        `${plattform}: Der Titel nennt nur, was die Hook schon sagt (${woerter.join(', ')}).`,
      );
    }

    /*
     * Ein Titel darf nichts benennen, was im Video nicht vorkommt. Das ist
     * die Belegpflicht auf den Titel angewandt: Wer im Titel eine Sache
     * verspricht, ueber die das Video nicht spricht, hat einen Koeder
     * geschrieben und keinen Titel.
     */
    const unbelegt = woerter.filter((w) => !kommtImVideoVor(w, videotext));
    if (unbelegt.length > 0) {
      melde(
        'fehler',
        'titel',
        `${plattform}: „${unbelegt.join(', ')}" kommt im Video nicht vor.`,
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
   * Die Mindestdauer im Bild darf laenger sein, gesprochen wird trotzdem nur
   * ein Satz. Fehler statt Hinweis, weil es der teuerste Fehler ist, den ein
   * Short machen kann — alles Weitere daran haengt.
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

  const bildtexte = ohneSatzzeichen(
    short.szenen.map((szene) => (szene as { text?: string }).text ?? '').join(' '),
  );
  const fehlendImBild = suchWoerter.filter((w) => !bildtexte.includes(w));
  if (fehlendImBild.length > 0) {
    melde(
      'hinweis',
      'suchbegriff',
      `„${fehlendImBild.join('", „')}" steht in keinem Bildtext. Kein Fehler – der Bildtext ist auf ` +
        'wenige Wörter gebaut –, aber wo es ohne Verrenkung passt, zählt es doppelt.',
    );
  }

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

  for (const szene of short.szenen) {
    const text = ohneSatzzeichen(szene.sprechtext);
    const woerter = [
      ...HEUTEBEZUG.filter((w) => text.includes(w)),
      ...(HEUTE_VOR.test(szene.sprechtext) ? ['heute vor'] : []),
    ];
    const spanne = ZEITSPANNE.exec(szene.sprechtext);

    const monat = MONATE.exec(szene.sprechtext);
    if (monat && !JAHR.test(szene.sprechtext)) {
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
     * Umgekehrt ebenso: Wer die Mittel benutzt, soll sie auch anmelden. Sonst
     * stuenden zwei gleich gebaute Shorts unter verschiedenen Etiketten, und
     * die Drittelregel liesse beide durch.
     */
    if (short.bauform === 'einstimmig' && zweistimmig > 0) {
      melde(
        'fehler',
        'bauform',
        'Als einstimmig angemeldet, hat aber Szenen mit zwei Stimmen.',
      );
    }
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
   * Schablone, gegen die der Umbau laeuft. Ausgenommen ist `einstimmig` —
   * dort ist es der angemeldete Bau, und begrenzt wird er von der Drittelregel
   * im Lauf, nicht hier.
   *
   * **Eine Reaktion.** Mindestens eine Zeile traegt eine `machart`, also eine
   * Aeusserung, die nichts ueber die Welt behauptet. Geprueft wird nicht, ob
   * sie witzig ist — das kann kein Skript. Geprueft wird, ob der Platz benutzt
   * wurde, genau wie bei der Belegregel: Sie prueft nicht, ob das Zitat
   * ueberzeugt, sondern ob eins da ist.
   *
   * Auch `einstimmig` braucht sie. Der gemessene Vergleichskanal setzt seinen
   * Humor eingestreut statt in einem Slot — funktional dieselbe Zeile, nur vom
   * selben Sprecher.
   */
  {
    const zweistimmig = short.szenen.filter(
      (sz) => new Set((sz.rede ?? []).map((r) => r.sprecher)).size > 1,
    ).length;

    if (short.bauform !== 'einstimmig' && zweistimmig < 2) {
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
          'mit `machart` aus `REAKTIONS_MACHARTEN`.',
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
      const name = REAKTIONS_MACHARTEN.find((m) => m.schluessel === machart)?.name ?? machart;
      melde(
        'fehler',
        'reaktion',
        `Die Machart „${name}" kommt ${anzahl}-mal vor. Eine je Short — sonst ist die ` +
          'zweite Stimme eine Masche und keine Figur.',
      );
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
   * Der Zielwert der Bauform — die Wache, die das geweitete Fenster ersetzt.
   *
   * Bis zum 25.08.2026 stand der Zielwert nur im Kommentar von `LAENGE_SEK`,
   * und das Fenster war eng genug, um ihn nebenbei durchzusetzen. Mit 20 bis
   * 65 Sekunden ist es das nicht mehr: Eine Wechselrede von 60 Sekunden laege
   * bequem darin und waere trotzdem das Doppelte dessen, was diese Bauform
   * sein will.
   *
   * Gemessen wird gegen die **tatsaechliche** Dauer, sobald es eine Tonspur
   * gibt, sonst gegen die Schaetzung. Ein Fuenftel Abweichung ist grosszuegig
   * — die Vertonung selbst streut schon rund sechs Prozent, und ein Hinweis,
   * der bei jedem zweiten Short erscheint, wird nicht gelesen.
   */
  {
    const ziel = BAUFORMEN[short.bauform].zielSek;
    const gemessen = short.tonspur !== undefined;
    const dauer = gemessen ? short.tonspur!.dauerSek : geschaetzteDauerSek(short);
    const abweichung = Math.abs(dauer - ziel) / ziel;
    if (abweichung > 0.2) {
      melde(
        'hinweis',
        'laenge',
        `${BAUFORMEN[short.bauform].titel} will rund ${ziel}s, ` +
          `${gemessen ? 'gemessen' : 'geschätzt'} sind es ${dauer.toFixed(0)}s. ` +
          'Länge ist eine Folge davon, wie viel es zu zeigen gibt – ' +
          'wenn der Inhalt es trägt, ist der Hinweis erledigt.',
      );
    }
  }

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
   * Gattung. `einstimmig` ist deshalb ausdruecklich mitgezaehlt — was keinen
   * Namen hat, kann keine Regel begrenzen.
   *
   * Die Drittelregel greift erst ab sechs Shorts. Darunter erzwaenge sie
   * lauter verschiedene Bauformen: Bei vier Shorts waere ein Drittel eine
   * einzige, also vier verschiedene je Woche — genau der Zwang, an dem die
   * alte Formatregel gescheitert ist.
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

  if (shorts.length >= 6) {
    for (const [bauform, gruppe] of proBauform) {
      const erster = gruppe[0];
      if (!erster || gruppe.length * 3 <= shorts.length) continue;
      befunde.push({
        stufe: 'fehler',
        shortId: erster.id,
        regel: 'bauform',
        text:
          `${gruppe.length} von ${shorts.length} Shorts sind „${BAUFORMEN[bauform].titel}" ` +
          `(${gruppe.map((s) => s.id).join(', ')}). Höchstens ein Drittel je Lauf.`,
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
    const BREITE_POSEN = new Set(['achselzucken']);
    for (const szene of short.szenen) {
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

      /*
       * **Drei Posen greifen bei zwei Figuren in die andere hinein.**
       *
       * Das ist gemessen, nicht geschaetzt: `video/Wortwechselprobe.tsx`
       * stellt alle zehn Posen einzeln neben eine ruhende Figur, in derselben
       * Anordnung wie im Video. `zeigen`, `erklaeren` und `achselzucken`
       * legen eine Hand auf das andere Gehaeuse, die uebrigen sieben bleiben
       * frei. Die Seite spielt keine Rolle — die rechte Figur ist gespiegelt
       * und greift spiegelbildlich.
       *
       * **Der Weg dahin gehoert dazu.** Am 26.08.2026 sind nacheinander drei
       * Faelle im fertigen Standbild aufgefallen, jeder an einer anderen Pose,
       * und nach jedem stand eine engere Regel da: erst „nicht beide
       * gleichzeitig", dann „kein `zeigen`". Beide waren zu eng, weil sie aus
       * je einem Bild geschlossen haben. Erst die Probe hat die Frage fuer das
       * ganze Vokabular beantwortet — **eine Messung ist billiger als drei
       * Regeln, die nacheinander zu eng waren.**
       *
       * Mehr Abstand loest es nicht: Die 116 Einheiten sind an zwei gleich
       * breiten Rigs gemessen, Wattis Stauchung macht ihn ein Fuenftel
       * breiter, und bei x = 158 plus halber Breite steht er am Buehnenrand.
       */
      const GREIFT_HINUEBER = new Set(['zeigen', 'erklaeren', 'achselzucken']);
      if (szene.buehne.gegenueber) {
        const ketten = [
          ...[szene.buehne.von, ...(szene.buehne.zwischen ?? []), szene.buehne.nach],
          ...[
            szene.buehne.gegenueber.von,
            ...(szene.buehne.gegenueber.zwischen ?? []),
            szene.buehne.gegenueber.nach,
          ],
        ];
        const treffer = [...new Set(ketten.filter((p) => GREIFT_HINUEBER.has(p)))];
        if (treffer.length > 0) {
          befunde.push({
            stufe: 'fehler',
            shortId: short.id,
            regel: 'bildvielfalt',
            text:
              `„${treffer.join('", „')}" im Wortwechsel: Die Hand landet auf dem anderen ` +
              'Gehäuse. Frei sind ruhe, lesen, stutzen, staunen, hochschauen, winken und ' +
              'nachdenken — gemessen in `Wortwechselprobe`.',
          });
        }
      }

      if (symbolDaneben && BREITE_POSEN.has(nach)) {
        befunde.push({
          stufe: 'hinweis',
          shortId: short.id,
          regel: 'bildvielfalt',
          text:
            `Pose „${nach}" stellt die Arme aus, und „${requisite}" steht daneben. ` +
            'Der linke Arm läuft dabei aus dem Bild. Andere Zielpose wählen.',
        });
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
