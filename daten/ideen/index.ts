import { FORMATE, type Format, type Idee, type Sachgebiet } from '../../src/typen';
import { gibtswirklichIdeen } from './gibtswirklich';
import { absichtIdeen } from './absicht';
import { eswareinmalIdeen } from './eswareinmal';
import { werhatrechtIdeen } from './werhatrecht';

/**
 * Der Ideenvorrat — angelegt am 14.08.2026, am 17.08.2026 komplett ersetzt.
 *
 * **Eine Datei je Sendeplatz, nicht mehr je Sachgebiet.** Der Grund steht in
 * `reichweiteInWochen` weiter unten: Gerechnet wird je Format und mit dem
 * Minimum, nicht mit dem Durchschnitt. Ein leerer Sonntag haelt die ganze
 * Woche auf, auch wenn sechs andere Faecher ueberquellen — und wer wissen
 * will, welches Fach leer laeuft, soll eine Datei oeffnen und nicht sieben.
 *
 * Der alte Vorrat ist am 17.08.2026 vollstaendig verworfen worden. Er bestand
 * aus Suchanfragen — „welche Buchse ueberträgt Bild", „welche Kabelklasse
 * reicht". Antworten auf Fragen, die im Feed niemand stellt. Der neue steht
 * unter einem einzigen Pruefstein: **Erzaehlt das jemand freiwillig weiter?**
 *
 * Zweck: Der Engpass der Produktion ist nicht das Schreiben, sondern der
 * Beleg. Wer morgens ein Thema sucht, sucht in Wahrheit eine Aussage, die eine
 * unbeteiligte Instanz traegt — und das ist die Arbeit, die Zeit kostet. Bei
 * sieben Videos je Woche sind das sieben abgerufene Seiten mit woertlichem
 * Zitat, jede Woche.
 *
 * Diese Liste nimmt die Arbeit vorweg, aber nur bis zu einem klar markierten
 * Punkt:
 *
 *   `skizze`     Frage, Dreh, Sache und **Belegpfad** stehen. Der Belegpfad
 *                ist eine Vermutung: die Instanz ist benannt, die Seite ist
 *                nicht abgerufen und es gibt kein Zitat.
 *   `belegt`     Die Quelle ist abgerufen, woertlich zitiert und steht in
 *                quellen.json. Ab hier ist eine Idee sofort produzierbar.
 *   `produziert` Laeuft bereits als Short.
 *
 * **Eine `skizze` ist kein fertiges Video.** Der Sprung nach `belegt` kann
 * scheitern: Wenn die vermutete Instanz die Aussage nicht hergibt, faellt die
 * Idee. Das ist gewollt — lieber hier als nach der Vertonung.
 *
 * Das Schema erzwingt an jeder Idee **mindestens eine unbeteiligte Instanz**
 * im Belegpfad (`Idee.superRefine` in src/typen.ts). Der Grund steht im
 * WLAN-Short: Der ging sauber durch die Pruefung und stand auf TP-Link,
 * TP-Link und Intel — „dein Router ist nicht zu alt", belegt vom
 * Routerhersteller.
 *
 * **Was am 16.08.2026 hier herausgefallen ist:** sechzehn Ideen, die als
 * Short nicht tragen — elf Diagnosen, die eine Vorgeschichte brauchen, und
 * fuenf, die eine Handlung verlangen. Sie stehen in `hauptvideo.ts` und sind
 * nicht verloren, sondern auf dem falschen Kanal. Der Belegpfad, also der
 * teure Teil, ist mitgewandert.
 *
 * Diese Datei ist die **einzige** Liste des Vorrats. `daten/themen.json` war
 * die vorherige, wurde von keinem Skript gelesen und behauptete am Ende
 * Dinge, die seit einem Tag nicht mehr stimmten. Als TypeScript prueft `tsc`
 * hier bei jedem Lauf mit.
 */
export const IDEEN: Idee[] = [
  ...gibtswirklichIdeen,
  ...absichtIdeen,
  ...eswareinmalIdeen,
  ...werhatrechtIdeen,
];

export const ideenNachFormat = (format: Format): Idee[] =>
  IDEEN.filter((i) => i.format === format);

export const ideenNachSachgebiet = (sachgebiet: Sachgebiet): Idee[] =>
  IDEEN.filter((i) => i.sachgebiet === sachgebiet);

/** Was als naechstes produziert werden kann, ohne noch zu recherchieren. */
export const sofortProduzierbar = (): Idee[] => IDEEN.filter((i) => i.reifegrad === 'belegt');

/**
 * Die Formate, die laufend bespielt werden — ohne `empfehlung`.
 *
 * Die Empfehlung kommt erst, wenn Affiliate-Links stehen. Sie darf die
 * Reichweite des Vorrats nicht mitrechnen, sonst meldet ein leeres
 * Empfehlungsfach eine Reichweite von null Wochen fuer einen Kanal, der laeuft.
 *
 * **Bis zum 20.08.2026 hiess das `WOCHENFORMATE`** und wurde ueber
 * `FORMATE[f].tag !== null` bestimmt — die Empfehlung war das einzige Format
 * ohne Wochentag. Mit dem Wegfall von `tag` steht die Ausnahme jetzt
 * ausdruecklich da, statt sich aus einem Feld zu ergeben. Das ist die
 * ehrlichere Fassung: Sie war nie eine Aussage ueber Wochentage, sondern
 * darueber, was noch nicht laeuft.
 */
export const LAUFENDE_FORMATE = (Object.keys(FORMATE) as Format[]).filter(
  (f) => f !== 'empfehlung',
);

/**
 * Reichweite des Vorrats in Wochen — gerechnet auf **vier Videos je Woche**.
 *
 * Rechnet **je Format** und nimmt das Minimum, nicht den Durchschnitt. Ein
 * Format ohne Nachschub haelt den Kanal auf, auch wenn die anderen
 * ueberquellen.
 *
 * **Seit dem 24.08.2026 ist das keine Annahme mehr, sondern der Takt.** Ein
 * Video im neuen Bau wurde gemessen: elf Minuten, davon sechs fuer den Beleg.
 * Rechnerisch gingen 26 Videos je Woche — die Grenze ist also nicht die
 * Produktion, sondern **diese Zahl hier**. Bei vier Videos je Woche traegt der
 * Vorrat neun Wochen, bei sieben fuenf.
 *
 * Damit ist diese Funktion nicht laenger eine Nebenrechnung, sondern die
 * Stelle, an der der Takt haengt. Faellt das Minimum unter sechs, ist das die
 * Aufforderung nachzufuellen — nicht, langsamer zu werden.
 */
export const reichweiteInWochen = (): number => {
  const offen = LAUFENDE_FORMATE.map(
    (f) => ideenNachFormat(f).filter((i) => i.reifegrad !== 'produziert').length,
  );
  return Math.min(...offen);
};

/** Welches Format zu wenig Vorrat hat — fuer den Hinweis in der Pruefung. */
export const duenneFormate = (mindestens = 3): Format[] =>
  LAUFENDE_FORMATE.filter(
    (f) => ideenNachFormat(f).filter((i) => i.reifegrad !== 'produziert').length < mindestens,
  );
