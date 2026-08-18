import type { Short } from '../../src/typen';
import { powerbankHandgepaeck } from './powerbank-handgepaeck';
import { flugmodusMaerchen } from './flugmodus-maerchen';
import { produktpassRegister } from './produktpass-register';
import { akkuLoesungsmittel } from './akku-loesungsmittel';
import { aufkleberGarantie } from './aufkleber-garantie';
import { druckerKennung } from './drucker-kennung';
import { schaltsekundeEndet } from './schaltsekunde-endet';
import { privaterModus } from './privater-modus';

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
 * Die Reihenfolge hier ist die des Wochentags, entscheidet aber nichts:
 * `zeitplanBauen` liest den Tag aus `FORMATE[...].tag` und nicht aus der
 * Listenstelle. Der Wochentag ist ein Versprechen an den Zuschauer und gehoert
 * nicht an eine Array-Position.
 */
export const WOCHENLAUF: Short[] = [
  powerbankHandgepaeck,
  flugmodusMaerchen,
  produktpassRegister,
  akkuLoesungsmittel,
  aufkleberGarantie,
  druckerKennung,
  schaltsekundeEndet,
  privaterModus,
];

/**
 * Entwuerfe, die noch nicht tragen.
 *
 * Sie sind nicht im Lauf und faerben die Pruefung deshalb nicht rot — sie
 * erscheinen dort nur als Hinweis. Eine Pruefung, die dauerhaft rot ist, liest
 * bald niemand mehr.
 */
export const GEPARKT: Short[] = [];
