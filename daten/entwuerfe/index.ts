import type { Short } from '../../src/typen';
import { raumstationAlteRechner } from './raumstation-alte-rechner';
import { ersatzteilFreischalten } from './ersatzteil-freischalten';
import { erstesLaden } from './erstes-laden';
import { passwortWechseln } from './passwort-wechseln';
import { garantiesiegelNichtig } from './garantiesiegel-nichtig';
import { handyversicherung } from './handyversicherung';
import { werbeblocker } from './werbeblocker';
import { festplatteLoeschen } from './festplatte-loeschen';
import { fernseherHoertZu } from './fernseher-hoert-zu';
import { kabelschublade } from './kabelschublade';
import { produktpassAkku } from './produktpass-akku';
import { ladekabelWatt } from './ladekabel-watt';
import { zettelImTreppenhaus } from './zettel-im-treppenhaus';
import { urlaubsfoto } from './urlaubsfoto';
import { fremdesLadekabel } from './fremdes-ladekabel';
import { powerbankWattstunden } from './powerbank-wattstunden';
import { akkuWechselbar2027 } from './akku-wechselbar-2027';
import { flugmodus } from './flugmodus';
import { schaltsekundeWette } from './schaltsekunde-wette';
import { druckerGelbePunkte } from './drucker-gelbe-punkte';
import { autoEreignisspeicher } from './auto-ereignisspeicher';
import { arianeAlteEinstellung } from './ariane-alte-einstellung';
import { ladezyklenSteckdose } from './ladezyklen-steckdose';
import { updatefristStichtag } from './updatefrist-stichtag';
import { ersatzteilFuenfTage } from './ersatzteil-fuenf-tage';
import { cafeWlan } from './cafe-wlan';
import { handyheizung } from './handyheizung';
import { updateItalien } from './update-italien';
import { akkuGanzLeer } from './akku-ganz-leer';
import { virenprogrammWette } from './virenprogramm-wette';
import { achtzigProzentNachbar } from './achtzig-prozent-nachbar';
import { laptopUsbC } from './laptop-usb-c';
import { sekundeVomAtom } from './sekunde-vom-atom';
import { mobilfunkMesskampagne } from './mobilfunk-messkampagne';
import { routerZwang } from './router-zwang';
import { roamingSommer } from './roaming-sommer';
import { elektroschrottSupermarkt } from './elektroschrott-supermarkt';
import { nummerMitnehmen } from './nummer-mitnehmen';
import { widerrufWette } from './widerruf-wette';
import { energielabelBuchstabe } from './energielabel-buchstabe';
import { ladegeraetPiktogramm } from './ladegeraet-piktogramm';
import { standbyHalbesWatt } from './standby-halbes-watt';
import { updatesVomHaendler } from './updates-vom-haendler';
import { geldscheinDrucken } from './geldschein-drucken';
import { kassenzettelAusschluss } from './kassenzettel-ausschluss';
import { blitzerApp } from './blitzer-app';
import { streamenImZug } from './streamen-im-zug';
import { wlanPasswortAbmahnung } from './wlan-passwort-abmahnung';
import { balkonkraftwerkNachbar } from './balkonkraftwerk-nachbar';
import { technikerTermin } from './techniker-termin';
import { vierPaketeZurueck } from './vier-pakete-zurueck';
import { handyAmSteuer } from './handy-am-steuer';
import { bluetoothBlauzahn } from './bluetooth-blauzahn';
import { lichtgeschwindigkeitFestgelegt } from './lichtgeschwindigkeit-festgelegt';
import { seiteGesperrt } from './seite-gesperrt';
import { bildschirmschoner } from './bildschirmschoner';
import { handyTankstelle } from './handy-tankstelle';
import { passwortSonderzeichen } from './passwort-sonderzeichen';
import { virusMerktMan } from './virus-merkt-man';

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
export const WOCHENLAUF: Short[] = [powerbankWattstunden, handyversicherung, akkuGanzLeer, werbeblocker, autoEreignisspeicher];

/**
 * Entwuerfe, die noch nicht tragen.
 *
 * Sie sind nicht im Lauf und faerben die Pruefung deshalb nicht rot — sie
 * erscheinen dort nur als Hinweis. Eine Pruefung, die dauerhaft rot ist, liest
 * bald niemand mehr.
 */
export const GEPARKT: Short[] = [raumstationAlteRechner, ersatzteilFreischalten, passwortWechseln, erstesLaden, garantiesiegelNichtig, festplatteLoeschen, fernseherHoertZu, kabelschublade, produktpassAkku, ladekabelWatt, zettelImTreppenhaus, urlaubsfoto, fremdesLadekabel, akkuWechselbar2027, schaltsekundeWette, druckerGelbePunkte, arianeAlteEinstellung, ladezyklenSteckdose, updatefristStichtag, ersatzteilFuenfTage, cafeWlan, handyheizung, updateItalien, virenprogrammWette, achtzigProzentNachbar, laptopUsbC, sekundeVomAtom, mobilfunkMesskampagne, routerZwang, roamingSommer, elektroschrottSupermarkt, nummerMitnehmen, widerrufWette, energielabelBuchstabe, ladegeraetPiktogramm, standbyHalbesWatt, updatesVomHaendler, kassenzettelAusschluss, streamenImZug, wlanPasswortAbmahnung, balkonkraftwerkNachbar, technikerTermin, handyAmSteuer, bluetoothBlauzahn, lichtgeschwindigkeitFestgelegt, seiteGesperrt, bildschirmschoner, handyTankstelle, passwortSonderzeichen, virusMerktMan];

/**
 * Alles, was geschrieben ist — Lauf und Geparktes zusammen.
 *
 * **Fuer die Proben, nicht fuer den Lauf.** `npm run belege`,
 * `npm run sprechprobe` und `npm run bildrand` messen einzelne Shorts; welche
 * Liste sie lesen, sagt nur, *welche* Shorts sie ansehen. Sie lasen bis zum
 * 03.09.2026 nur `WOCHENLAUF`, und damit war von den zehn Dialogen aus dem
 * Gegentest **kein Standbild gezogen und keine Sprechdauer gemessen** — sie
 * lagen vollstaendig in `GEPARKT`.
 *
 * Das ist dieselbe Luecke, die einen Tag vorher bei `npm run pruefen` gefunden
 * wurde: **Eine Probe, die den Ordner nicht ansieht, in dem geschrieben wird,
 * ist genau dort still, wo sie gebraucht wird.**
 *
 * Der Wochenlauf, `veroeffentlichen.ts` und die laufweiten Regeln lesen
 * weiterhin `WOCHENLAUF` — dort ist die Liste eine Zusage und keine Auswahl.
 */
export const ALLE_ENTWUERFE: Short[] = [...WOCHENLAUF, ...GEPARKT];
