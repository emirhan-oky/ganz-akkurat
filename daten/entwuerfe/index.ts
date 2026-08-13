import type { Short } from '../../src/typen';
import { dockKeinBild } from './dock-kein-bild';
import { kabelWatt } from './kabel-watt';
import { powerbankFlug } from './powerbank-flug';
import { wlanAbends } from './wlan-abends';
import { garantieGewaehrleistung } from './garantie-gewaehrleistung';

/**
 * Die eine Liste der Entwuerfe.
 *
 * Sie existiert, weil dieselbe Liste vorher an zwei Stellen stand — im
 * Wochenlauf und in der Schemapruefung — und auseinandergelaufen ist. Am
 * 13.08.2026 kannte die Pruefung drei von fuenf Shorts: `kabel-watt`,
 * `wlan-abends` und `garantie-gewaehrleistung` fehlten ganz, `powerbank-flug`
 * stand noch als geparkt, obwohl es laengst im Lauf war.
 *
 * Das ist genau die Pruefung, die den haengenden Render verhindern soll —
 * und sie meldete gruen, ohne zwei Drittel der Daten anzusehen. Doppelte
 * Listen fallen nicht auf, weil beide fuer sich stimmig aussehen.
 */

/** Was in dieser Woche laeuft — einer je Rubrik. */
export const WOCHENLAUF: Short[] = [
  ...dockKeinBild,
  ...kabelWatt,
  ...powerbankFlug,
  ...wlanAbends,
  ...garantieGewaehrleistung,
];

/**
 * Entwuerfe, die noch nicht tragen.
 *
 * Sie sind nicht im Lauf und faerben die Pruefung deshalb nicht rot — sie
 * erscheinen dort nur als Hinweis. Eine Pruefung, die dauerhaft rot ist,
 * liest bald niemand mehr.
 *
 * Zurzeit leer: `powerbank-flug` stand hier, solange es auf einer einzigen
 * Quelle (LBA) stand, und ist seit dem 13.08.2026 mit drei geprueften
 * Quellen im Lauf.
 */
export const GEPARKT: Short[] = [];
