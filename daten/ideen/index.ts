import type { Idee, Rubrik } from '../../src/typen';
import { schreibtischIdeen } from './schreibtisch';
import { unterwegsIdeen } from './unterwegs';
import { reiseIdeen } from './reise';
import { zuhauseIdeen } from './zuhause';
import { kaufenIdeen } from './kaufen';

/**
 * Der Ideenvorrat — angelegt am 14.08.2026.
 *
 * Zweck: Der Takt soll von fuenf auf zehn Shorts je Woche steigen, also zwei
 * je Rubrik. Der Engpass dabei ist nicht das Schreiben, sondern der Beleg.
 * Wer Montag frueh ein Thema sucht, sucht in Wahrheit eine Aussage, die eine
 * unbeteiligte Instanz traegt — und das ist die Arbeit, die Zeit kostet.
 *
 * Diese Liste nimmt sie vorweg, aber nur bis zu einem klar markierten Punkt:
 *
 *   `skizze`     Frage, Entwarnung, Sache und **Belegpfad** stehen. Der
 *                Belegpfad ist eine Vermutung: die Instanz ist benannt, die
 *                Seite ist nicht abgerufen und es gibt kein Zitat.
 *   `belegt`     Drei Quellen sind abgerufen, woertlich zitiert und stehen in
 *                quellen.json. Ab hier ist eine Idee sofort produzierbar.
 *   `produziert` Laeuft bereits als Short.
 *
 * **Eine `skizze` ist kein fertiges Video.** Der Sprung nach `belegt` kostet
 * je Idee drei abgerufene Seiten mit woertlichem Zitat, und er kann scheitern:
 * Wenn die vermutete Instanz die Aussage nicht hergibt, faellt die Idee. Das
 * ist gewollt — lieber hier als nach der Vertonung.
 *
 * Das Schema erzwingt an jeder Idee **mindestens eine unbeteiligte Instanz**
 * im Belegpfad (`Idee.superRefine` in src/typen.ts). Der Grund steht im
 * WLAN-Short: Der ging sauber durch die Pruefung und stand auf TP-Link,
 * TP-Link und Intel — „dein Router ist nicht zu alt", belegt vom
 * Routerhersteller. Wer schon beim Skizzieren keine unbeteiligte Instanz
 * benennen kann, hat kein Thema, sondern eine Vermutung.
 *
 * Diese Datei ist die **einzige** Liste des Vorrats. `daten/themen.json` war
 * die vorherige, wurde von keinem Skript gelesen und behauptete am Ende
 * Dinge, die seit einem Tag nicht mehr stimmten — sie ist abgeloest. Als
 * TypeScript prueft `tsc` hier bei jedem Lauf mit.
 */
export const IDEEN: Idee[] = [
  ...schreibtischIdeen,
  ...unterwegsIdeen,
  ...reiseIdeen,
  ...zuhauseIdeen,
  ...kaufenIdeen,
];

export const ideenNachRubrik = (rubrik: Rubrik): Idee[] => IDEEN.filter((i) => i.rubrik === rubrik);

/** Was als naechstes produziert werden kann, ohne noch zu recherchieren. */
export const sofortProduzierbar = (): Idee[] => IDEEN.filter((i) => i.reifegrad === 'belegt');

/**
 * Reichweite des Vorrats in Wochen, bei einem gegebenen Takt je Rubrik.
 *
 * Rechnet **je Rubrik** und nimmt das Minimum, nicht den Durchschnitt: Der
 * Lauf braucht jede Rubrik besetzt. Eine Rubrik ohne Nachschub haelt die
 * ganze Woche auf, auch wenn vier andere ueberquellen.
 */
export const reichweiteInWochen = (jeRubrikUndWoche = 2): number => {
  const rubriken: Rubrik[] = ['schreibtisch', 'unterwegs', 'reise', 'zuhause', 'kaufen'];
  const offen = rubriken.map(
    (r) => ideenNachRubrik(r).filter((i) => i.reifegrad !== 'produziert').length,
  );
  return Math.floor(Math.min(...offen) / jeRubrikUndWoche);
};
