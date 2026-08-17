import type { Short } from '../../src/typen';
import { einStecker } from './ein-stecker';
import { akkuLeerlaufen } from './akku-leerlaufen';
import { kabelGleich } from './kabel-gleich';
import { reparaturGilt } from './reparatur-gilt';
import { garantieGekauft } from './garantie-gekauft';
import { fernseherHoert } from './fernseher-hoert';
import { loeschenLoeschtNicht } from './loeschen-loescht-nicht';
import { wlanAbends } from './wlan-abends';

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
 * Der Satz vom 17.08.2026 ist der erste nach dem Umbau auf Unterhaltung. Die
 * sieben Vorgaenger sind geloescht: Sie waren Erklaervideos, und zwar nicht
 * wegen des Tons, sondern wegen der Themen. Die Quellen sind geblieben — der
 * Beleg ist der einzige Teil der Produktion, den keine Struktur verkuerzt.
 *
 * Die Reihenfolge hier ist die des Wochentags, entscheidet aber nichts:
 * `zeitplanBauen` liest den Tag aus `FORMATE[...].tag` und nicht aus der
 * Listenstelle. Der Wochentag ist ein Versprechen an den Zuschauer und gehoert
 * nicht an eine Array-Position.
 */
export const WOCHENLAUF: Short[] = [
  einStecker,
  akkuLeerlaufen,
  kabelGleich,
  reparaturGilt,
  garantieGekauft,
  fernseherHoert,
  loeschenLoeschtNicht,
  wlanAbends,
];

/**
 * Entwuerfe, die noch nicht tragen.
 *
 * Sie sind nicht im Lauf und faerben die Pruefung deshalb nicht rot — sie
 * erscheinen dort nur als Hinweis. Eine Pruefung, die dauerhaft rot ist, liest
 * bald niemand mehr.
 */
export const GEPARKT: Short[] = [];
