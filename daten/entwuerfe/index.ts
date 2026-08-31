import type { Short } from '../../src/typen';
import { raumstationAlteRechner } from './raumstation-alte-rechner';
import { ersatzteilFreischalten } from './ersatzteil-freischalten';
import { erstesLaden } from './erstes-laden';
import { passwortWechseln } from './passwort-wechseln';

/**
 * Die eine Liste der Entwuerfe.
 *
 * Sie existiert, weil dieselbe Liste vorher an zwei Stellen stand — im
 * Wochenlauf und in der Schemapruefung — und auseinandergelaufen ist. Am
 * 13.08.2026 kannte die Pruefung drei von fuenf Shorts. Das ist genau die
 * Pruefung, die den haengenden Render verhindern soll, und sie meldete gruen,
 * ohne zwei Drittel der Daten anzusehen. Doppelte Listen fallen nicht auf,
 * weil beide fuer sich stimmig aussehen.
 */

/**
 * Was in dieser Woche laeuft — einer je Sendeplatz, **acht seit dem
 * 17.08.2026**.
 *
 * Der Satz vom 18.08.2026 ist der erste mit **Rundlauf**: Jede Schlussszene
 * traegt jetzt ein Feld, das sagt, warum der erste Satz danach wieder passt,
 * und der Vorhang am Ende — Strich, zweite Wortmarke, Spruch — ist weg.
 *
 * Der Satz vom 17.08. ist geloescht; er laeuft draussen und steht in
 * `laeufe/2026-08-18/props/` als Abzug seines Datenstands. Die Quellen sind
 * geblieben — der Beleg ist der einzige Teil der Produktion, den keine
 * Struktur verkuerzt, und drei dieser acht Shorts leben davon, dass er
 * schon da war.
 *
 * **Die Reihenfolge hier entscheidet den Sendetermin.** Bis zum 20.08.2026 tat
 * sie das nicht, und der Kommentar an dieser Stelle sagte ausdruecklich, die
 * Listenstelle sei gleichgueltig: `zeitplanBauen` las den Tag aus
 * `FORMATE[...].tag`. Mit dem Wegfall des Wochentags gilt das Gegenteil — der
 * Zeitplan zaehlt die Positionen ab dem Beginn durch.
 *
 * Daraus folgt die Sortierung unten. Vier der acht stehen auf `absicht`, und
 * dasselbe Format an zwei aufeinanderfolgenden Tagen trifft dieselben
 * Zuschauer mit dem, was im Feed wie dasselbe Video aussieht. Bei vier von
 * acht geht das Abwechseln genau auf: jede zweite Stelle ein `absicht`.
 */
export const WOCHENLAUF: Short[] = [
  raumstationAlteRechner,
  ersatzteilFreischalten,
  passwortWechseln,
  erstesLaden,
];

/**
 * Entwuerfe, die noch nicht tragen.
 *
 * Sie sind nicht im Lauf und faerben die Pruefung deshalb nicht rot — sie
 * erscheinen dort nur als Hinweis. Eine Pruefung, die dauerhaft rot ist, liest
 * bald niemand mehr.
 */
export const GEPARKT: Short[] = [];
