import type { Quelle, Short } from './typen';
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
  const letzte = short.szenen[short.szenen.length - 1];

  if (erste?.art !== 'hook') {
    melde('fehler', 'aufbau', 'Der Short beginnt nicht mit einer Hook-Szene.');
  }
  if (letzte?.art !== 'endkarte' && letzte?.art !== 'cta') {
    melde('hinweis', 'aufbau', 'Der Short endet weder mit Endkarte noch mit Abbinder.');
  } else if (letzte.art === 'cta') {
    melde(
      'hinweis',
      'aufbau',
      'Der Short endet mit einem reinen Abbinder. Eine Endkarte mit den Kernpunkten hält Zuschauer im Video und wird häufiger gespeichert.',
    );
  }

  /*
   * Verweise auf angeheftete Beitraege oder das Profil verlangen einen
   * Absprung, den auf Shortplattformen kaum jemand macht. Was der Zuschauer
   * mitnehmen soll, gehoert ins Video.
   */
  for (const szene of short.szenen) {
    if (/angehefte|link in bio|im profil|in der beschreibung/i.test(szene.sprechtext)) {
      melde(
        'hinweis',
        'absprung',
        'Der Sprechtext verweist aus dem Video heraus. Besser den Inhalt selbst als Endkarte zeigen.',
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

  const texteMitWerbung = Object.values(short.texte).filter((t) => werbemarker.test(t.beschreibung));
  if (texteMitWerbung.length > 0 && !short.kennzeichnung.werbung) {
    melde(
      'fehler',
      'kennzeichnung',
      `Ein Plattformtext enthält einen kommerziellen Verweis („${
        texteMitWerbung[0]!.beschreibung.match(werbemarker)?.[0]
      }"), „Werbung" ist aber nicht gesetzt.`,
    );
  }

  // Umgekehrter Fall: gekennzeichnet, aber nirgends ein Verweis. Meist ein
  // vergessener Link, seltener eine ueberfluessige Kennzeichnung.
  if (short.kennzeichnung.werbung && texteMitWerbung.length === 0) {
    melde('hinweis', 'kennzeichnung', '„Werbung" ist gesetzt, aber kein Plattformtext enthält einen kommerziellen Verweis.');
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

/** Prueft alle Shorts eines Laufs und fasst zusammen. */
export const laufPruefen = (shorts: Short[], quellen: Quelle[]) => {
  const befunde = shorts.flatMap((s) => shortPruefen(s, quellen));
  const fehler = befunde.filter((b) => b.stufe === 'fehler');

  return {
    befunde,
    fehler,
    hinweise: befunde.filter((b) => b.stufe === 'hinweis'),
    /** Shorts ohne Fehler dürfen zur Freigabe. */
    freigabefaehig: shorts.filter((s) => !fehler.some((f) => f.shortId === s.id)),
  };
};
