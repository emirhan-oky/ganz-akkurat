import { FORMAT } from './marke';
import type { Short, Szene } from './typen';

/**
 * Zeitberechnung eines Shorts.
 *
 * Solange keine Tonspur vorliegt, wird die Sprechdauer aus der Textlaenge
 * geschaetzt — damit laesst sich ein Skript im Studio schon vor der
 * Vertonung ansehen. Sobald die Sprachsynthese gelaufen ist, gelten
 * ausschliesslich deren echte Zeitstempel. Geschaetzt wird also nie
 * gerendert, nur vorschaubar gemacht.
 */

/**
 * Sprechgeschwindigkeit in Zeichen pro Sekunde.
 *
 * Bis zum 13.08.2026 stand hier 15 — eine Annahme, nie nachgemessen. Die
 * Sprechprobe (`npm run sprechprobe`, deutsche Systemstimme ueber alle fuenf
 * Shorts) ergab 15,9. Der Unterschied klingt klein und ist es nicht: Bei
 * einem Short von rund 1.250 Zeichen sind das acht Sekunden, und acht
 * Sekunden entscheiden ueber das Zielfenster. Der Reise-Short galt mit 78,7
 * geschaetzten Sekunden als drin und lag gemessen bei 70,4.
 *
 * Die Richtung des Fehlers war die unguenstige: Wer zu lang schaetzt, baut zu
 * kurze Shorts — und merkt es erst, nachdem ElevenLabs abgerechnet hat.
 *
 * **Der Wert gehoert auf die gewaehlte Stimme gesetzt** und steht seit dem
 * 13.08.2026 auf Lenny (`6IEvIqBOPOMUc5HwR9sQ`), gemessen ueber
 * `npm run stimmproben`. Die Streuung zwischen Stimmen ist gross: vierzehn
 * geprobte deutsche Stimmen lagen zwischen 12,2 und 20,1 Zeichen je Sekunde.
 * Das entscheidet darueber, ob derselbe Text 76 oder 117 Sekunden dauert —
 * wer die Stimme wechselt, muss diesen Wert mitwechseln.
 *
 * Die Zahl stammt aus einer Probe von 289 Zeichen. Sie ist eine gute
 * Schaetzung und keine Messung des fertigen Shorts: Sobald ein Lauf
 * `--mit-ton` gelaufen ist, gelten dessen echte Zeitstempel und diese Formel
 * spielt keine Rolle mehr.
 */
export const ZEICHEN_PRO_SEKUNDE = 17.4;

/** Kurze Atempause nach jeder Szene, damit Schnitte nicht auf dem Wort sitzen. */
const PAUSE_NACH_SZENE_SEK = 0.32;

/** Untergrenzen je Szenenart: manche Bilder brauchen Zeit, egal wie kurz der Text ist. */
const MINDESTDAUER_SEK: Record<Szene['art'], number> = {
  hook: 1.8,
  aussage: 1.6,
  zahl: 2.2,
  vergleich: 4.0,
  checkliste: 4.0,
  warnung: 3.0,
  anschluss: 4.5,
  /**
   * Die Fehlspur braucht Zeit zum Wirken: Jeder Verdacht muss gelesen und
   * dann durchgestrichen werden. Zu schnell gespielt ist sie keine Spur,
   * sondern eine Aufzaehlung.
   */
  fehlspur: 5.0,
  /**
   * Die Herleitung steht am laengsten von den Vertiefungsszenen. Wer eine
   * Rechnung mitdenken soll, braucht die Zeile davor noch im Kopf.
   */
  herleitung: 6.0,
  einschraenkung: 3.5,
  /**
   * Die Merkmalskarte steht laenger als eine Aussage: Erst das Geraet
   * erfassen, dann die Merkmale lesen — beides nacheinander, nicht parallel.
   */
  merkmalskarte: 5.0,
  cta: 2.2,
  /**
   * Die Endkarte steht bewusst lange. Sie soll gelesen und fotografiert
   * werden koennen — dafuer reicht die Sprechdauer allein nicht aus.
   */
  endkarte: 5.0,
  /**
   * Die Kaufkriterien stehen noch laenger als die Endkarte: Sie tragen zu
   * jedem Kriterium ein Pruefdetail und darunter den Verweis. Wer danach
   * einkaufen gehen soll, muss die Liste zu Ende lesen koennen.
   */
  kaufkriterien: 6.5,
};

/**
 * Standdauer einer Szene aus ihrer Sprechdauer.
 *
 * Getrennt von der Schaetzung, damit `npm run sprechprobe` mit einer
 * **gemessenen** Sprechdauer dieselbe Rechnung anstellen kann statt sie
 * nachzubauen. Die Mindestdauern und die Atempause gelten unabhaengig davon,
 * woher die Sprechdauer kommt: Ein Bild, das fuenf Sekunden stehen muss,
 * steht auch dann fuenf Sekunden, wenn der Satz darueber in dreien
 * gesprochen ist.
 */
export const szenendauerAus = (art: Szene['art'], sprechdauerSek: number): number =>
  Math.max(MINDESTDAUER_SEK[art], sprechdauerSek) + PAUSE_NACH_SZENE_SEK;

/** Geschaetzte Sprechdauer einer einzelnen Szene in Sekunden. */
export const geschaetzteSzenendauer = (szene: Szene): number =>
  szenendauerAus(szene.art, szene.sprechtext.length / ZEICHEN_PRO_SEKUNDE);

/**
 * Startzeit und Dauer jeder Szene in Bildern.
 * Nutzt echte Zeitstempel, sobald die Tonspur vorliegt.
 */
export const szenenZeitplan = (short: Short): { startBild: number; dauerBilder: number }[] => {
  const fps = FORMAT.bilderProSekunde;

  if (short.tonspur) {
    const { szenenStartSek, dauerSek } = short.tonspur;
    return szenenStartSek.map((start, i) => {
      const naechster = szenenStartSek[i + 1] ?? dauerSek;
      return {
        startBild: Math.round(start * fps),
        dauerBilder: Math.max(1, Math.round((naechster - start) * fps)),
      };
    });
  }

  let laufend = 0;
  return short.szenen.map((szene) => {
    const dauer = geschaetzteSzenendauer(szene);
    const eintrag = {
      startBild: Math.round(laufend * fps),
      dauerBilder: Math.max(1, Math.round(dauer * fps)),
    };
    laufend += dauer;
    return eintrag;
  });
};

/** Gesamtlaenge des Shorts in Bildern. */
export const gesamtdauerBilder = (short: Short): number => {
  if (short.tonspur) {
    // Etwas Nachlauf, damit die Endkarte nicht auf dem letzten Wort abreisst.
    return Math.round((short.tonspur.dauerSek + 0.8) * FORMAT.bilderProSekunde);
  }
  const plan = szenenZeitplan(short);
  const letzter = plan[plan.length - 1];
  return letzter ? letzter.startBild + letzter.dauerBilder : FORMAT.bilderProSekunde;
};

/**
 * Laenge nach Vertiefung — zwei Stufen statt einer Grenze.
 *
 * Die alte Obergrenze von 59 Sekunden war das Shorts-Limit von frueher.
 * YouTube Shorts nimmt seit Oktober 2024 bis drei Minuten, Reels ebenso,
 * TikTok deutlich mehr; die Grenze kam also nicht mehr von aussen, sondern
 * hielt sich nur noch selbst.
 *
 * Die Kopplung an die Vertiefung verhindert den eigentlichen Fehler. Der
 * ist nicht, dass zwei Shorts je Woche ohne Vertiefung auskommen — sondern
 * dass sie ohne Vertiefung **trotzdem neunzig Sekunden** dauern. Gedehnt ist
 * schlimmer als kurz.
 *
 * `maximum` bleibt als harte Grenze fuer beide Stufen bestehen: Auch ein
 * tiefer Short soll nicht ins Erklaervideo kippen.
 */
export const LAENGE_SEK = {
  minimum: 15,
  /** Zielfenster ohne Vertiefung: eine Sache, sauber gesagt, fertig. */
  knapp: [40, 60] as const,
  /**
   * Zielfenster mit Vertiefung: traegt eine Struktur, braucht den Platz.
   *
   * Die Obergrenze stand bis zum 13.08.2026 auf 90. Der Grund fuer die 95 ist
   * die Streuung der Vertonung: Derselbe Text ergab bei zwei Laeufen 75,3 und
   * 70,5 Sekunden, also rund sechs Prozent oder fuenf Sekunden. Wer bei 90
   * baut, faellt beim naechsten Lauf heraus, ohne ein Wort geaendert zu haben.
   *
   * **95 ist Spielraum, nicht das neue Ziel.** Die Absicht ist ausdruecklich,
   * die Laenge ueber die Zeit wieder zu druecken — aber ueber Straffung, nie
   * ueber Weglassen von Substanz. Wo das gelingt, zeigt der Wochenschnitt im
   * Lauf; deshalb steht er dort neben dem der Vorwoche.
   */
  tief: [75, 95] as const,
  /**
   * Harte Grenze, in beiden Stufen und ohne Ausnahme. Darueber ist es kein
   * Short mehr, sondern ein Erklaervideo im Hochformat.
   */
  maximum: 100,
} as const;

/** Das Zielfenster, das fuer diesen Short gilt. */
export const zielfenster = (short: Short): readonly [number, number] =>
  short.vertiefung ? LAENGE_SEK.tief : LAENGE_SEK.knapp;

/**
 * Geschaetzte Gesamtlaenge in Sekunden, ohne Tonspur.
 *
 * Damit laesst sich die Laenge schon **vor** der Vertonung pruefen. Vorher
 * lief die Laengenpruefung nur ueber `short.tonspur` — wer also einen zu
 * kurzen Short schrieb, erfuhr es erst, nachdem die Sprachsynthese
 * abgerechnet war. Bei rund 1.400 Zeichen je Short ist das die teuerste
 * Stelle, an der eine Rueckmeldung zu spaet kommt.
 */
export const geschaetzteDauerSek = (short: Short): number =>
  short.szenen.reduce((summe, szene) => summe + geschaetzteSzenendauer(szene), 0);
