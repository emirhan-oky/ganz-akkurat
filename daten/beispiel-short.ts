import type { Short } from '../src/typen';
import { raumstationAlteRechner } from './entwuerfe/raumstation-alte-rechner';

/**
 * Referenz-Short — die Standard-Prop der Remotion-Komposition.
 *
 * Bis zum 16.08.2026 stand hier ein eigener, von Hand gepflegter Short. Das
 * war eine **zweite Liste** neben `daten/entwuerfe/`, und dieses Projekt hat
 * mit zweiten Listen schlechte Erfahrungen: Am 13.08.2026 kannte die
 * Schemapruefung drei von fuenf Shorts und meldete trotzdem gruen, weil
 * Wochenlauf und Pruefung je eigene Listen fuehrten. Doppelte Listen fallen
 * nicht auf, weil jede fuer sich stimmig aussieht.
 *
 * Der Referenz-Short ist deshalb kein eigener Datensatz mehr, sondern
 * **derselbe Montags-Short, der auch laeuft**. Damit kann er gar nicht mehr
 * veralten, und die Vorschau im Studio zeigt, was tatsaechlich produziert
 * wird.
 *
 * Warum das hier trotzdem eine eigene Datei bleibt: An ihr haengt die
 * teuerste Erfahrung des Projekts. `calculateMetadata` parst diese Prop **im
 * Browser-Kontext**; reisst sie das Schema, bleibt Remotion in einem
 * unerfuellten Promise stehen — der Render haengt ohne Fehlermeldung, bis
 * jemand abbricht. `skripte/schemapruefung.ts` prueft sie deshalb
 * ausdruecklich und blockierend.
 */
export const beispielShort: Short = raumstationAlteRechner;
