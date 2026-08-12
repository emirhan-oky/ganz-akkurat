import { WINKELARTEN, type Quelle, type Short, type Winkelart } from './typen';
import { LAENGE_SEK } from './zeit';

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

/** Alle Zeichenketten einer Szene — Sprechtext wie sichtbarer Text. */
const textwerte = (wert: unknown): string[] =>
  typeof wert === 'string'
    ? [wert]
    : Array.isArray(wert)
      ? wert.flatMap(textwerte)
      : wert && typeof wert === 'object'
        ? Object.values(wert).flatMap(textwerte)
        : [];

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
   * Keine Produktnamen im Video. Das ist die Regel, die das Video als
   * Information traegt und die Kennzeichnung in der Beschreibung genuegen
   * laesst. Faellt hier ein Markenname, bewirbt das Video ein Produkt.
   */
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

  /* ── Sprechdauer ─────────────────────────────────────────────────── */

  if (short.tonspur) {
    const d = short.tonspur.dauerSek;
    if (d > LAENGE_SEK.maximum) {
      melde('fehler', 'laenge', `${d.toFixed(1)}s überschreitet das Plattformlimit von ${LAENGE_SEK.maximum}s.`);
    } else if (d < LAENGE_SEK.minimum) {
      melde('fehler', 'laenge', `${d.toFixed(1)}s ist zu kurz – unter ${LAENGE_SEK.minimum}s wirkt der Short abgehackt.`);
    } else if (d > LAENGE_SEK.ziel[1]) {
      melde('hinweis', 'laenge', `${d.toFixed(1)}s liegt über dem Zielfenster von ${LAENGE_SEK.ziel[0]}–${LAENGE_SEK.ziel[1]}s.`);
    }

    if (short.tonspur.woerter.length === 0) {
      melde('fehler', 'untertitel', 'Die Tonspur hat keine Wort-Zeitstempel – es gäbe keine Untertitel.');
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
const laufweiteBefunde = (shorts: Short[]): Befund[] => {
  const befunde: Befund[] = [];

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
            .join(', ')}). Fünf Videos zu einem Thema brauchen fünf verschiedene Zugriffe.`,
      });
    }
  }

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

/** Prueft alle Shorts eines Laufs und fasst zusammen. */
export const laufPruefen = (shorts: Short[], quellen: Quelle[]) => {
  const befunde = [...shorts.flatMap((s) => shortPruefen(s, quellen)), ...laufweiteBefunde(shorts)];
  const fehler = befunde.filter((b) => b.stufe === 'fehler');

  return {
    befunde,
    fehler,
    hinweise: befunde.filter((b) => b.stufe === 'hinweis'),
    /** Shorts ohne Fehler dürfen zur Freigabe. */
    freigabefaehig: shorts.filter((s) => !fehler.some((f) => f.shortId === s.id)),
  };
};
