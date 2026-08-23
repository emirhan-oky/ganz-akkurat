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
 * **Seit dem 16.08.2026 steht hier eine Messung statt einer Probe.** Der Wert
 * war 17,4 und stammte aus 289 Zeichen einer Stimmprobe — eine Ansage in
 * Vorlesetonfall, nicht ein Short. Der erste vollstaendig vertonte Wochenlauf
 * liefert die belastbare Zahl: **2.479 Zeichen in 160,6 Sekunden, also 15,4**.
 * Dieselben Zeitstempel, aus denen der Renderer die Szenenlaengen nimmt.
 *
 * Der Fehler ging in die gefaehrliche Richtung. Zu hohe Zeichen/s heisst zu
 * kurz geschaetzt: Sieben Shorts galten als 20,8–23,3 s und lagen bei
 * 21,7–26,3 s. Alle noch im Fenster, aber die Zielmitte war rechnerisch
 * verfehlt — und wer bei 26,3 s landet, faellt beim naechsten Lauf durch die
 * Streuung heraus, ohne ein Wort geaendert zu haben.
 *
 * Bemerkenswert daneben: Die Systemstimme Anna misst ebenfalls 15,4. Die
 * kostenlose Probe traf die Produktionsstimme auf die erste Nachkommastelle,
 * und die teure Konstante lag daneben.
 *
 * Auch die neue Zahl bleibt eine Schaetzung fuer *ungesprochene* Entwuerfe:
 * Sobald ein Lauf `--mit-ton` gelaufen ist, gelten dessen echte Zeitstempel
 * und diese Formel spielt fuer den Short keine Rolle mehr.
 */
export const ZEICHEN_PRO_SEKUNDE = 15.4;

/** Kurze Atempause nach jeder Szene, damit Schnitte nicht auf dem Wort sitzen. */
const PAUSE_NACH_SZENE_SEK = 0.32;

/**
 * Untergrenzen je Szenenart: manche Bilder brauchen Zeit, egal wie kurz der
 * Text ist.
 *
 * Die Werte sind am 17.08.2026 gesunken, und zwar aus einem dramaturgischen
 * Grund, nicht aus einem rechnerischen: Der Bau hat jetzt sechs bis acht
 * Szenen statt vier bis sechs, weil ein Schnitt alle drei Sekunden im Feed
 * traegt und ein Textblock von fuenf Sekunden nicht. Untergrenzen, die aus der
 * Zeit der fuenf langen Karten stammen, wuerden diesen Takt verhindern.
 */
const MINDESTDAUER_SEK: Record<Szene['art'], number> = {
  text: 1.4,
  zahl: 2.0,
  /**
   * Die Frage steht, waehrend nichts gesprochen wird.
   *
   * Die Untergrenze stand kurz auf 4,0 Sekunden und war damit ein **Platzhalter
   * fuer die Denkpause**, die es im Datenvertrag noch nicht gab. Seit `pauseSek`
   * existiert, bestellt die Szene ihre Stille selbst, und die Untergrenze darf
   * wieder das sein, was sie ueberall sonst ist: die Zeit zum Lesen.
   *
   * „Wie viele Jahre für einen Stecker?" ist in anderthalb Sekunden erfasst.
   * Die Denkzeit kommt danach.
   */
  frage: 1.5,
  vergleich: 2.6,
  einschraenkung: 2.2,
  /**
   * Der Nachschlag traegt einen Satz, die Wortmarke und den Spruch.
   *
   * Hier stand die Endkarte mit 3,2 Sekunden, davor mit fuenf, „damit man sie
   * fotografieren kann". Fotografiert wurde nie etwas. Ein Satz plus Absender
   * ist in zweieinhalb Sekunden gelesen.
   */
  schluss: 2.5,
  /** Nur im Format `empfehlung`, das erst mit Affiliate-Links kommt. */
  kaufkriterien: 4.5,
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
export const szenendauerAus = (
  art: Szene['art'],
  sprechdauerSek: number,
  /**
   * Bestellte Pause nach dieser Szene. Ohne Angabe die Atempause.
   *
   * Am 17.08.2026 dazugekommen. Vorher rechnete die Schaetzung immer mit 0,32
   * Sekunden, waehrend die Vertonung bei `pauseSek` das Mehrfache einlegt —
   * die Vorschau lief also genau an der Stelle von der Wirklichkeit weg, an
   * der bewusst Zeit verbraucht wird. Bei der Denkpause des Montags sind das
   * mehr als zwei Sekunden auf ein Video von zwanzig.
   */
  pauseSek?: number,
): number => Math.max(MINDESTDAUER_SEK[art], sprechdauerSek) + (pauseSek ?? PAUSE_NACH_SZENE_SEK);

/** Geschaetzte Sprechdauer einer einzelnen Szene in Sekunden. */
export const geschaetzteSzenendauer = (szene: Szene): number =>
  szenendauerAus(szene.art, szene.sprechtext.length / ZEICHEN_PRO_SEKUNDE, szene.pauseSek);

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
 * Laengenvorgaben.
 *
 * Hier stand bis zum 15.08.2026 ein zweistufiges Modell: ein knappes Fenster
 * ohne Vertiefung, ein tiefes mit. Es ist ersatzlos entfallen — die Begruendung
 * steht an `ziel`.
 */
export const LAENGE_SEK = {
  /**
   * Das Zielfenster. **Seit dem 16.08.2026 eine Stufe statt dreier.**
   *
   * Hier standen bis dahin drei Zahlen fuer eine Frage: ein Fenster von 28
   * bis 40 Sekunden, eine „ausnahmslose" Grenze bei 45 und ein Minimum bei
   * 15. Die zweite Stufe war ein Rest aus der Zeit mit zwei Fenstern (mit und
   * ohne Vertiefung) — mit nur einem Fenster ist sie eine Regel ohne Aufgabe.
   *
   * Die Zahlen kommen aus zwei Messungen und einer Rechnung:
   *
   * - **15 bis 30 Sekunden** haben die hoechste Abschlussrate. Erklaerendes
   *   darf 35 bis 45, aber nur wenn der Nutzen frueh sichtbar ist — und
   *   „frueh sichtbar" ist bei einem Fakt je Video ohnehin die ganze Anlage.
   * - **Die Vertonung streut rund sechs Prozent.** Derselbe Text ergab bei
   *   zwei Laeufen 75,3 und 70,5 Sekunden; ElevenLabs liefert nicht zweimal
   *   dieselbe Aufnahme. Bei 23 Sekunden sind das ±1,4 s.
   * - Fuenf Szenen mit rund 370 Zeichen ergeben bei 17,4 Zeichen je Sekunde
   *   21,4 s Sprechzeit plus 1,6 s Pausen — also 23 s.
   *
   * Daraus folgt die Regel, die wichtiger ist als die Grenzen selbst:
   * **Zielwert ist die Mitte, nicht der Rand.** Wer an der Obergrenze baut,
   * faellt beim naechsten Lauf heraus, ohne ein Wort geaendert zu haben.
   *
   * ## Die Obergrenze steht seit dem 20.08.2026 auf 34 statt 28
   *
   * Zwoelf fremde Tech-Shorts wurden angesehen und vermessen. Die drei mit den
   * meisten Aufrufen sind **41, 29 und 31 Sekunden** lang — das alte Fenster
   * haette alle drei abgelehnt. Der Median der Sammlung liegt bei rund 28 s,
   * also genau auf der alten Obergrenze.
   *
   * Die Gegenprobe steht in derselben Sammlung: 4,1 Mio Aufrufe bei 19 s,
   * 1,75 Mio bei 7 s. **Laenge ist keine Ursache, sondern eine Folge davon,
   * wie viel es zu zeigen gibt.** Ein Fenster, das die Obergrenze zur Aussage
   * ueber Qualitaet macht, misst die falsche Groesse.
   *
   * Der Zielwert bleibt deshalb bei 23 s und ist die eigentliche Steuerung.
   * Die Obergrenze ist wieder das, was sie sein soll: eine Grenze gegen
   * Abschweifen, keine Qualitaetsaussage.
   *
   * Der naheliegende Einwand — das „zu lang" der ersten Zuschauer — trifft die
   * Shorts mit dem alten Fenster von 28 bis 40 Sekunden, nicht eine Obergrenze
   * von 34. Und er kam von unserem Publikum, waehrend diese zwoelf Videos von
   * fremden Kanaelen stammen und ausdruecklich als Treffer ausgewaehlt wurden.
   * Deshalb wird die Obergrenze geoeffnet und nicht der Zielwert verschoben.
   */
  ziel: [18, 34] as const,
  /**
   * Die Hook spricht hoechstens dreieinhalb Sekunden.
   *
   * Eingefuehrt am 15.08.2026, nachdem die Hook des Kabel-Shorts 14,0 s
   * dauerte. 71 Prozent der Zuschauer entscheiden in den ersten Sekunden, ob
   * sie bleiben — eine Hook, die laenger braucht als diese Entscheidung, ist
   * keine Hook, sondern der Anfang des Videos.
   *
   * 3,5 s sind bei 17,4 Zeichen je Sekunde rund 60 Zeichen. Ein Satz.
   */
  hookMaximum: 3.5,
} as const;

export const zielfenster = (): readonly [number, number] => LAENGE_SEK.ziel;

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
