import { FORMATE, type Format, type Idee, type Sachgebiet } from '../../src/typen';
import { dubistdummIdeen } from './dubistdumm';
import { eswareinmalIdeen } from './eswareinmal';
import { absichtIdeen } from './absicht';
import { neuIdeen } from './neu';
import { auchgekauftIdeen } from './auchgekauft';
import { heimlichIdeen } from './heimlich';
import { gibtswirklichIdeen } from './gibtswirklich';
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
  ...dubistdummIdeen,
  ...eswareinmalIdeen,
  ...absichtIdeen,
  ...neuIdeen,
  ...auchgekauftIdeen,
  ...heimlichIdeen,
  ...gibtswirklichIdeen,
  ...werhatrechtIdeen,
];

export const ideenNachFormat = (format: Format): Idee[] =>
  IDEEN.filter((i) => i.format === format);

export const ideenNachSachgebiet = (sachgebiet: Sachgebiet): Idee[] =>
  IDEEN.filter((i) => i.sachgebiet === sachgebiet);

/** Was als naechstes produziert werden kann, ohne noch zu recherchieren. */
export const sofortProduzierbar = (): Idee[] => IDEEN.filter((i) => i.reifegrad === 'belegt');

/**
 * Die sieben Formate, die woechentlich laufen — ohne `empfehlung`.
 *
 * Die Empfehlung hat keinen festen Wochentag (`FORMATE[...].tag === null`)
 * und kommt erst, wenn Affiliate-Links stehen. Sie darf die Reichweite des
 * Vorrats nicht mitrechnen, sonst meldet ein leeres Empfehlungsfach eine
 * Reichweite von null Wochen fuer einen Kanal, der laeuft.
 */
export const WOCHENFORMATE = (Object.keys(FORMATE) as Format[]).filter(
  (f) => FORMATE[f].tag !== null,
);

/**
 * Reichweite des Vorrats in Wochen.
 *
 * Rechnet **je Format** und nimmt das Minimum, nicht den Durchschnitt: Der
 * Lauf braucht jeden Wochentag besetzt. Ein Format ohne Nachschub haelt die
 * ganze Woche auf, auch wenn sechs andere ueberquellen.
 *
 * Vorher rechnete diese Funktion je Rubrik und mit zwei Videos je Rubrik und
 * Woche. Beides ist mit dem Formatmodell hinfaellig: Der Takt ist ein Video
 * je Format und Woche, und die Rubrik ist zum Sachgebiet abgesunken.
 */
export const reichweiteInWochen = (): number => {
  const offen = WOCHENFORMATE.map(
    (f) => ideenNachFormat(f).filter((i) => i.reifegrad !== 'produziert').length,
  );
  return Math.min(...offen);
};

/** Welches Format zu wenig Vorrat hat — fuer den Hinweis in der Pruefung. */
export const duenneFormate = (mindestens = 3): Format[] =>
  WOCHENFORMATE.filter(
    (f) => ideenNachFormat(f).filter((i) => i.reifegrad !== 'produziert').length < mindestens,
  );
