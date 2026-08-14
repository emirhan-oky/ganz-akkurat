import {
  RUBRIKEN,
  Rubrik,
  SYSTEME,
  VERTIEFUNGEN,
  WINKELARTEN,
  type Quelle,
  type Short,
  type Titelmuster,
  type Vertiefung,
  type Winkelart,
} from './typen';
import { fehlendeSymbole } from './illustration';
import { gelaufeneThemen, zuletztOhneVertiefung, type Verlaufslauf } from './verlauf';
import { geschaetzteDauerSek, LAENGE_SEK, zielfenster } from './zeit';

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
 * Kennzeichnungswoerter, die am Partnerlink stehen muessen.
 *
 * Bewusst nur diese drei. „Affiliate-Link", „sponsored by" und „gesponsert"
 * hat der BGH als unscharfe Angaben verworfen (Urteil vom 06.02.2014,
 * I ZR 2/11) — sie erklaeren den werblichen Charakter nicht, sie umschreiben
 * ihn. Wer sie benutzt, hat nicht gekennzeichnet.
 */
const KENNZEICHNUNGSWORT = /\b(werbung|anzeige|werbepartner)\b/i;

/**
 * Quellenarten, die auf die Drei-Quellen-Regel zaehlen.
 *
 * `presse` fehlt bewusst: Ein Fachartikel referiert bestenfalls das, was im
 * Datenblatt steht, und altert schneller als die Spezifikation selbst. Er
 * darf einen Short ergaenzen — tragen darf er ihn nicht.
 */
const OFFIZIELLE_ARTEN = new Set<Quelle['art']>(['hersteller', 'standard', 'behoerde', 'plattform', 'messung']);

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

/** Alle Zeichenketten einer Szene — Sprechtext wie sichtbarer Text. */
const textwerte = (wert: unknown): string[] =>
  typeof wert === 'string'
    ? [wert]
    : Array.isArray(wert)
      ? wert.flatMap(textwerte)
      : wert && typeof wert === 'object'
        ? Object.values(wert).flatMap(textwerte)
        : [];

/* ───────────────────────────── Titel ─────────────────────────────── */

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
  'und', 'oder', 'aber', 'denn', 'nur', 'auch', 'noch', 'schon', 'nicht', 'kein', 'keine', 'keinen',
  'am', 'an', 'auf', 'aus', 'bei', 'bis', 'durch', 'fuer', 'für', 'in', 'im', 'mit', 'nach', 'ohne',
  'seit', 'um', 'von', 'vor', 'zu', 'zum', 'zur', 'ueber', 'über', 'unter', 'gegen', 'ins',
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

/**
 * Ob ein Titel die Form seines Musters hat — nicht, ob er gut ist.
 *
 * Geprueft wird das eine, was sich pruefen laesst: `zweisatz` braucht zwei
 * Saetze, `verdaechtiger` eine Verneinung (die Entwarnung ist der Hebel des
 * Musters), `uhr` eine Zahl (die Ersparnis hat eine Uhr). Ob der Widerspruch
 * traegt oder die Verneinung sitzt, entscheidet weiter ein Mensch.
 */
const musterFormfehler = (muster: Titelmuster, titel: string): string | null => {
  switch (muster) {
    case 'zweisatz': {
      const saetze = titel.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
      return saetze.length >= 2
        ? null
        : 'zwei Sätze, die sich widersprechen – hier steht nur einer.';
    }
    case 'verdaechtiger':
      return /\b(nicht|kein|keine|keinen|keinem|keiner|nie|niemals)\b/i.test(titel)
        ? null
        : 'der Verdächtige wird entlastet – dafür fehlt die Verneinung.';
    case 'uhr':
      return /\d/.test(titel)
        ? null
        : 'die Ersparnis hat eine Uhr – dafür fehlt die Zeit- oder Zahlangabe.';
  }
};

/**
 * Prueft einen Short gegen alle Regeln, die ohne die fertige Videodatei
 * beantwortbar sind. Laufzeit- und Lautheitspruefung folgen nach dem Render.
 */
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
   * Drei Belege muessen es sein, und zwar drei **offizielle**. Das Schema
   * zaehlt nur die Eintraege; ob sie tragen, weiss erst diese Stelle, weil
   * hier die Quellenarten vorliegen.
   */
  const offizielle = short.quellenIds.filter((id) => {
    const quelle = quellen.find((q) => q.id === id);
    return quelle && OFFIZIELLE_ARTEN.has(quelle.art);
  });

  if (offizielle.length < 3) {
    const presse = short.quellenIds.length - offizielle.length;
    melde(
      'fehler',
      'beleg',
      `Nur ${offizielle.length} von 3 offiziellen Quellen` +
        (presse > 0 ? ` (${presse}× Presse zählt nicht mit).` : '.'),
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

  if (erste?.art !== 'hook') {
    melde('fehler', 'aufbau', 'Der Short beginnt nicht mit einer Hook-Szene.');
  }

  // Den Abschluss prueft bereits das Schema: letzte Szene ist Endkarte oder
  // Kaufkriterien, und nie beides im selben Short.

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

  /* ── Systemangabe braucht eine systemspezifische Quelle ──────────── */

  /*
   * `macos` oder `windows` in der Hook-Pille ist eine Aussage ueber die
   * Wirklichkeit wie jede andere — nur eine, die im Bild steht. Ohne eine
   * Quelle, die das System tatsaechlich behandelt, waere sie geraten.
   */
  if (short.system === 'macos' || short.system === 'windows') {
    const passend = short.quellenIds.some((id) => quellen.find((q) => q.id === id)?.system === short.system);
    if (!passend) {
      melde(
        'fehler',
        'system',
        `Der Short ist auf ${SYSTEME[short.system].titel} festgelegt, aber keine seiner Quellen ist ` +
          'als systemspezifisch ausgewiesen.',
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

  const hook = erste?.art === 'hook' ? erste : null;
  if (hook && hook.text.split(/\s+/).length > 9) {
    melde('hinweis', 'lesbarkeit', 'Die Hook hat mehr als neun Wörter – im Feed wird sie kaum zu Ende gelesen.');
  }

  /* ── Plattformtexte ──────────────────────────────────────────────── */

  for (const [plattform, text] of Object.entries(short.texte)) {
    if (text.hashtags.length === 0) {
      melde('hinweis', 'texte', `Für ${plattform} sind keine Hashtags gesetzt.`);
    }
  }

  /* ── Illustration ────────────────────────────────────────────────── */

  /*
   * Situationssymbole waren gut und wurden trotzdem selten gesetzt: zwei von
   * fuenf Shorts, weil sie von Hand kamen. Die Ableitung schlaegt vor, wo
   * eine Szene eine Situation beschreibt, fuer die es ein Symbol gibt.
   *
   * **Hinweis, nicht Zuweisung.** Vorgeschlagen wird nur, gesetzt wird im
   * Entwurf. Ein still gesetztes Bild waere ein Bild, das niemand entschieden
   * hat — und es steht im fertigen Video.
   */
  for (const { index, art, symbol } of fehlendeSymbole(short.szenen)) {
    melde(
      'hinweis',
      'illustration',
      `Szene ${index + 1} (${art}) beschreibt eine Situation ohne Bild – „symbol: '${symbol}'" passt.`,
    );
  }

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
  const hookSzene = short.szenen.find((s) => s.art === 'hook');
  const hookText = hookSzene?.art === 'hook' ? hookSzene.text : '';
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
   * Das Titelmuster steht als Feld am Short und sagt, was der Titel tun
   * soll. Ungeprueft waere es eine tote Regel — man koennte `zweisatz`
   * setzen und einen einzelnen Satz schreiben, was genau passiert war.
   *
   * Geprueft wird es am `arbeitstitel`: Er ist der Titel in Reinform, die
   * drei Plattformtitel sind seine Anpassungen und duerfen kuerzen. Und
   * geprueft wird nur die Form, nicht die Qualitaet — dass zwei Saetze da
   * stehen, nicht ob sie sich widersprechen.
   */
  const formfehler = musterFormfehler(short.titelmuster, short.arbeitstitel);
  if (formfehler) {
    melde('fehler', 'titel', `Arbeitstitel, Muster „${short.titelmuster}": ${formfehler}`);
  }

  /* ── Sprechdauer ─────────────────────────────────────────────────── */

  if (short.tonspur) {
    const d = short.tonspur.dauerSek;
    const [von, bis] = zielfenster(short);
    const stufe = short.vertiefung ? 'mit Vertiefung' : 'ohne Vertiefung';

    if (d > LAENGE_SEK.maximum) {
      melde('fehler', 'laenge', `${d.toFixed(1)}s überschreitet die Obergrenze von ${LAENGE_SEK.maximum}s.`);
    } else if (d < LAENGE_SEK.minimum) {
      melde('fehler', 'laenge', `${d.toFixed(1)}s ist zu kurz – unter ${LAENGE_SEK.minimum}s wirkt der Short abgehackt.`);
    } else if (d < von || d > bis) {
      /*
       * Beide Richtungen sind ein Hinweis, und die untere ist die
       * wichtigere: Ein Short mit Vertiefung, der bei 50 Sekunden endet,
       * hat seine Struktur nicht ausgespielt. Ein Short ohne Vertiefung,
       * der 85 Sekunden dauert, ist gedehnt — und gedehnt ist schlimmer
       * als kurz.
       */
      melde(
        'hinweis',
        'laenge',
        `${d.toFixed(1)}s liegt außerhalb des Zielfensters ${von}–${bis}s (${stufe}).`,
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
    const [von, bis] = zielfenster(short);
    if (geschaetzt < von || geschaetzt > bis) {
      melde(
        'hinweis',
        'laenge',
        `Geschätzt ${geschaetzt.toFixed(0)}s, Zielfenster ${von}–${bis}s (${
          short.vertiefung ? 'mit' : 'ohne'
        } Vertiefung). Vor der Vertonung anpassen – danach kostet es Kontingent.`,
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
  const vorwoche = zuletztOhneVertiefung(verlauf);
  for (const short of shorts) {
    if (short.vertiefung || !vorwoche.has(short.rubrik)) continue;
    befunde.push({
      stufe: 'hinweis',
      shortId: short.id,
      regel: 'rotation',
      text:
        `Rubrik „${RUBRIKEN[short.rubrik].titel}" ist zum zweiten Mal in Folge ohne Vertiefung. ` +
        'Die zwei freien Plätze sollen rotieren.',
    });
  }

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

  /* ── Jede Rubrik genau einmal ────────────────────────────────────── */

  /*
   * Der Sendeplatz ist das Versprechen an den Zuschauer: montags bis
   * freitags je eine Rubrik. Zwei Shorts derselben Rubrik in einer Woche
   * heissen, dass eine andere ausfaellt — und genau das war das alte
   * Modell, in dem fuenf Videos aus einem einzigen Thema kamen.
   */
  const proRubrik = new Map<Rubrik, Short[]>();
  for (const short of shorts) {
    proRubrik.set(short.rubrik, [...(proRubrik.get(short.rubrik) ?? []), short]);
  }

  for (const [rubrik, gruppe] of proRubrik) {
    if (gruppe.length < 2) continue;
    for (const short of gruppe) {
      befunde.push({
        stufe: 'fehler',
        shortId: short.id,
        regel: 'rubrik',
        text:
          `Rubrik „${RUBRIKEN[rubrik].titel}" kommt ${gruppe.length}× im Lauf vor (${gruppe
            .map((s) => s.id)
            .join(', ')}). Jede Woche trägt jede Rubrik genau einen Short.`,
      });
    }
  }

  /*
   * Die Gegenprobe. Ohne sie faellt ein Lauf mit vier Shorts nicht auf —
   * die Dopplungspruefung oben schweigt, weil nichts doppelt ist.
   */
  if (shorts.length === 5) {
    const fehlend = Rubrik.options.filter((r) => !proRubrik.has(r));
    if (fehlend.length > 0) {
      for (const short of shorts) {
        befunde.push({
          stufe: 'fehler',
          shortId: short.id,
          regel: 'rubrik',
          text: `Im Lauf fehlt die Rubrik ${fehlend.map((r) => `„${RUBRIKEN[r].titel}"`).join(', ')}.`,
        });
      }
    }
  }

  /* ── Fuenf verschiedene Macharten ────────────────────────────────── */

  const proMachart = new Map<string, Short[]>();
  for (const short of shorts) {
    const liste = proMachart.get(short.winkelart) ?? [];
    liste.push(short);
    proMachart.set(short.winkelart, liste);
  }

  for (const [winkelart, gruppe] of proMachart) {
    if (gruppe.length < 2) continue;
    const titel = WINKELARTEN[winkelart as Winkelart].titel;
    for (const short of gruppe) {
      befunde.push({
        stufe: 'fehler',
        shortId: short.id,
        regel: 'machart',
        text:
          `Machart „${titel}" kommt ${gruppe.length}× im Lauf vor (${gruppe
            .map((s) => s.id)
            .join(', ')}). Die fünf Videos einer Woche brauchen fünf verschiedene Zugriffe.`,
      });
    }
  }

  /* ── Drei von fuenf tragen eine Vertiefung, „Kaufen" immer ───────── */

  /*
   * Warum nicht alle fuenf: Ein Zwang zur Tiefe erzeugt erfundene Tiefe. Ein
   * Video, das seine Fehlspur nicht wirklich hat, bekommt eine
   * konstruierte — und die riecht man. Drei von fuenf lassen Raum, sie
   * ehrlich zu vergeben.
   *
   * Warum „Kaufen" trotzdem gesetzt ist: Der Kaufberatungs-Short traegt als
   * einziger das Werbelabel. Genau der braucht die meiste Glaubwuerdigkeit,
   * weil beim Zuschauer sonst „der will mir was verkaufen" gewinnt.
   */
  const MINDESTENS_TIEF = 3;

  const mitVertiefung = shorts.filter((s) => s.vertiefung);
  if (shorts.length === 5 && mitVertiefung.length < MINDESTENS_TIEF) {
    for (const short of shorts.filter((s) => !s.vertiefung)) {
      befunde.push({
        stufe: 'fehler',
        shortId: short.id,
        regel: 'vertiefung',
        text:
          `Nur ${mitVertiefung.length} von ${shorts.length} Shorts tragen eine Vertiefung, ` +
          `mindestens ${MINDESTENS_TIEF} müssen es sein.`,
      });
    }
  }

  for (const short of shorts) {
    if (short.rubrik === 'kaufen' && !short.vertiefung) {
      befunde.push({
        stufe: 'fehler',
        shortId: short.id,
        regel: 'vertiefung',
        text:
          'Die Rubrik „Kaufen" trägt immer eine Vertiefung. Sie ist der einzige werbende Short ' +
          'und braucht die Glaubwürdigkeit am dringendsten.',
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

  haeufung<Titelmuster>(
    (s) => s.titelmuster,
    'titelmuster',
    (wert) => `Titelmuster „${wert}"`,
  );
  haeufung<Vertiefung>(
    (s) => s.vertiefung,
    'vertiefung',
    (wert) => `Vertiefung „${VERTIEFUNGEN[wert].titel}"`,
  );

  /* ── Kein Szenenbild im Uebermass ────────────────────────────────── */

  const HOECHSTZAHL = 3;

  /*
   * Hook und Schlusskarte schreibt das Schema jedem Short vor. Sie zu zaehlen
   * hiesse, den Pflichtaufbau als Einfallslosigkeit zu melden.
   */
  const VORGESCHRIEBEN = new Set<string>(['hook', 'endkarte', 'kaufkriterien']);

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
