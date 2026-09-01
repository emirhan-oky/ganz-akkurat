import { FORMAT, VORHANG } from './marke';
import { BAUFORMEN, type Format, type Short, type Sprecher, type Szene } from './typen';
/*
 * Die gemessenen Dauern der zehn festen Vorspannaufnahmen.
 *
 * Sie kommen aus `skripte/vorspannton.ts` und sind der Grund, warum der
 * Vorspann nicht mehr eine Konstante ist: Jede Show ist verschieden lang, und
 * eine Zahl fuer alle war fuer jede einzelne die falsche.
 */
import VORSPANNTON from '../daten/vorspannton.json';

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
 *
 * ## Offener Verdacht seit dem 24.08.2026
 *
 * `raumstation-alte-rechner` hat **506 Zeichen Sprechtext und 28,608 s
 * Tonspur** — das sind **17,7 Zeichen/s**, nicht 15,4. Die Sprechprobe
 * schaetzte fuer denselben Short 34,5 s. Ein Fehler von 15 %, und diesmal in
 * die *harmlose* Richtung: zu lang geschaetzt heisst, es wird zu viel
 * gestrichen.
 *
 * **Die Zahl wird trotzdem nicht geaendert**, weil eine Messung an einem
 * Video genau der Fehler waere, den dieser Kommentar oben beschreibt. Der
 * Verdacht hat aber eine plausible Ursache: Die Konstante wurde an Texten im
 * alten Telegrammstil gemessen — viele kurze Saetze, viele Satzpausen. Seit
 * dem 24.08.2026 verlangt `voice.md` in jedem gesprochenen Satz ein Verb, und
 * laengere Saetze laufen fluessiger durch.
 *
 * Waere das die Ursache, dann waere die Konstante nicht falsch gemessen,
 * sondern **fuer eine Sprache gemessen, die es nicht mehr gibt**. Nachmessen,
 * sobald vier Shorts im neuen Stil vertont sind — dann liegen genug Werte vor.
 *
 * ## 13,0 statt 15,4 — 25.08.2026, wegen des Modellwechsels
 *
 * Der Satz oben („nicht aendern, eine Messung an einem Video waere genau der
 * Fehler") gilt weiter fuer eine **unsichere** Zahl. Hier liegt ein anderer
 * Fall vor: Die 15,4 sind an `eleven_multilingual_v2` gemessen, und seit dem
 * Wechsel auf `eleven_v3` (Begruendung in `src/stimme.ts`) spricht das Modell
 * langsamer. Die Zahl ist damit nicht unsicher, sondern **fuer ein Modell
 * gemessen, das nicht mehr laeuft**.
 *
 * Drei Messungen auf v3, zusammen rund 800 Zeichen:
 *
 * | Was | Zeichen | Dauer | Rate |
 * |---|---|---|---|
 * | `passwort-wechseln`, zweistimmig, ganze Kette | 502 | 38,7 s ohne Pausen | **13,0** |
 * | Lenny, Vergleichstext | 148 | 11,5 s | 12,9 |
 * | Prayan, Vergleichstext | 148 | 11,7 s | 12,6 |
 *
 * Genommen wird **13,0**, die Rate **ohne** Pausen: Die Konstante rechnet je
 * Szene, und `szenendauerAus` addiert `pauseSek` getrennt. Mit Pausen waeren
 * es 12,1 — die Pausen zaehlten dann doppelt.
 *
 * **Was die Schaetzung weiterhin nicht kennt, sind die Sprecherwechsel.** Seit
 * dem 25.08. liegt zwischen zwei Redeanteilen einer Szene eine Pause von 0,28
 * Sekunden (`SPRECHERWECHSEL_SEK` in `src/stimme.ts`), und `szenendauerAus`
 * sieht sie nicht. Beim gemessenen Short fehlen dadurch rund 1,1 Sekunden.
 * Das ist der naechste Posten, nicht dieser.
 *
 * Die Basis bleibt duenn — 800 Zeichen gegen die 2.479, auf denen die 15,4
 * standen. Nachmessen, sobald vier Shorts auf v3 vertont sind.
 *
 * ## 14,3 statt 13,0 — 30.08.2026, die angekuendigte Nachmessung
 *
 * Die Bedingung von oben ist eingetreten: Am 30.08.2026 sind vier Shorts im
 * neuen, zweistimmigen Bau auf v3 vertont worden. **2.111 Zeichen gegen die
 * 800, auf denen die 13,0 standen.**
 *
 * | Short | Zeichen | gesprochen | Rate |
 * |---|---|---|---|
 * | `ersatzteil-freischalten` | 492 | 32,1 s | 15,33 |
 * | `erstes-laden` | 480 | 32,1 s | 14,95 |
 * | `raumstation-alte-rechner` | 606 | 41,7 s | 14,53 |
 * | `passwort-wechseln` | 533 | 41,2 s | 12,94 |
 * | **zusammen** | **2.111** | **147,1 s** | **14,35** |
 *
 * Genommen wird **14,3**, gerechnet als Summe durch Summe und nicht als
 * Mittel der vier Raten: Ein langer Short soll mehr wiegen als ein kurzer.
 *
 * **Was die 13,0 gekostet hat, war sichtbar:** `raumstation-alte-rechner` kam
 * mit 49,9 Sekunden geschaetzt aus der Sprechprobe und mit 43,2 Sekunden aus
 * dem Render. Die Schaetzung lag durchweg rund ein Zehntel zu hoch, und daran
 * haengen der Zielwert je Bauform und die Laengenklassen — also die beiden
 * Groessen, an denen der Laengenversuch bis Oktober gemessen wird.
 *
 * **Die Streuung bleibt und ist der ehrliche Teil dieses Kommentars:** 12,9
 * bis 15,3, also rund ein Fuenftel zwischen dem langsamsten und dem
 * schnellsten Short. `passwort-wechseln` ist der Ausreisser nach unten, und
 * die naechstliegende Erklaerung ist seine Zeichensetzung — er hat die
 * kuerzesten Saetze im Lauf, und jeder Punkt ist eine Pause. Das ist derselbe
 * Verdacht wie oben beim Telegrammstil, nur diesmal an vier Shorts sichtbar
 * statt an einem. **Eine einzelne Konstante kann das nicht abbilden**; sie
 * bleibt eine Schaetzung, und die Tonspur bleibt die Wahrheit.
 */
export const ZEICHEN_PRO_SEKUNDE = 14.3;

/**
 * Stille nach dem letzten Wort, in der die Signatur stehen bleibt.
 *
 * **Diese Zahl stand hier schon einmal — und war zu Recht weg.** Bis zum
 * 24.08.2026 addierte `gesamtdauerBilder` 0,8 Sekunden „damit die Endkarte
 * nicht auf dem letzten Wort abreisst"; die Endkarte war seit dem 18.08.2026
 * gestrichen, und uebrig blieb eine **leere Buehne** am Videoende. Aufgefallen
 * ist das am Standbild des letzten Bildes.
 *
 * Jetzt steht dort etwas: Der Zeiger blickt in die Richtung des Folgen-Knopfs,
 * und eine Geste, die mit dem letzten Wort verschwindet, sieht niemand.
 * Dieselbe Zahl, ein anderer Grund — und diesmal waechst die **Schlussszene**
 * mit, nicht nur die Komposition. Genau das war der alte Fehler.
 *
 * Wer sie streichen will: erst das letzte Bild eines Videos ziehen.
 */
export const NACHLAUF_SEK = 1.5;

/**
 * Kurze Atempause nach jeder Szene, damit Schnitte nicht auf dem Wort sitzen.
 *
 * **0,20 statt 0,32 seit dem 31.08.2026, und die Zahl ist erst jetzt ehrlich.**
 * Vorher stand hier eine Pause, die niemand so gehoert hat: Zu den bestellten
 * 0,32 kamen Vorlauf- und Endstille aus den Tondateien, und die tatsaechlichen
 * Luecken lagen zwischen 0,28 und **0,61 Sekunden** — im Mittel 0,42, in der
 * Summe 4,19 Sekunden auf ein Video von 53. Erst seit `stilleBeschneidenPuffer`
 * die Enden abschneidet, ist die bestellte Pause auch die gehoerte.
 *
 * Damit war die alte Zahl nicht mehr richtig: Sie war als Atempause gedacht und
 * hat als Atempause **plus** Dateirand gewirkt.
 */
const PAUSE_NACH_SZENE_SEK = 0.2;

/**
 * Die Pause an einer Szenengrenze — **seit dem 31.08.2026 unabhaengig davon,
 * ob der Sprecher dabei wechselt.**
 *
 * Vorher gab es zwei Faelle. Mit Sprecherwechsel schnitt die Vertonung, und
 * hier stand 0,45. Ohne Wechsel lief der Lauf weiter und die Pause entstand
 * ueber ` ... ` im Text — die Schaetzung rechnete dafuer die Atempause von
 * 0,32, **gehoert wurden 0,85 bis 2,19 Sekunden.**
 *
 * Seit `redelaeufe` an jeder Szenengrenze schneidet, gibt es nur noch einen
 * Fall und nur noch eine Zahl. Die 0,45 sind mitgegangen: Sie waren der
 * gemessene Wert des Trenners, den es nicht mehr gibt, und eine geerbte Zahl
 * ohne Gegenstand ist die Sorte Bauteil, die dieses Projekt am haeufigsten
 * teuer zu stehen kam.
 *
 * **Die 0,32 sind ein Startwert, kein Ergebnis.** Sie sind jetzt aber die
 * erste Groesse hier, die sich ohne Kontingent nachjustieren laesst: Die
 * Tondateien bleiben, nur die `startSek` der Abschnitte verschieben sich.
 */
export const SZENENGRENZE_SEK = PAUSE_NACH_SZENE_SEK;

/**
 * Wie lange zwischen zwei Sprechern geschwiegen wird.
 *
 * Kuerzer als die Szenengrenze: Ein Wortwechsel ist eine Reaktion, und eine
 * Reaktion kommt schnell. Zu lang, und aus dem Schlagabtausch werden zwei
 * Monologe.
 *
 * **Steht hier und nicht in `stimme.ts`**, obwohl die Vertonung sie einlegt:
 * Sie ist eine Laenge, und Laengen wohnen in dieser Datei. Vorher stand sie
 * nur drueben — und die Schaetzung wusste deshalb nichts von ihr.
 */
export const SPRECHERWECHSEL_SEK = 0.15;

/*
 * **0,15 statt 0,28 seit dem 31.08.2026 — und das ist eine geratene Zahl.**
 *
 * Sie steht hier so ausdruecklich, weil dieses Projekt zweimal Geld dafuer
 * bezahlt hat, eine geratene Groesse fuer eine gemessene zu halten. Gemessen
 * ist nur, was die alte Zahl in Wirklichkeit erzeugt hat: 0,42 s im Mittel,
 * weil der Dateirand dazukam. Dass 0,15 die richtige Antwort ist, ist eine
 * Annahme — ein Gespraechswechsel kommt schneller als eine Atempause, und im
 * Streit fallen sich Leute sogar ins Wort.
 *
 * **Sie faellt am naechsten fertigen Video**, so wie `ZEICHEN_PRO_SEKUNDE`
 * gefallen ist. Nachjustieren kostet nichts: Die Tondateien bleiben, nur die
 * `startSek` der Abschnitte verschieben sich.
 */

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
   * Die Zitatkarte traegt einen woertlichen Behoerdensatz — laenger und
   * sperriger als jeder Satz, den der Kanal selbst schreibt. Sie braucht
   * Lesezeit, nicht nur Sprechzeit.
   */
  zitatkarte: 2.6,
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
  /**
   * Der Nachschlag traegt einen Satz, die Wortmarke und den Spruch.
   *
   * Hier stand die Endkarte mit 3,2 Sekunden, davor mit fuenf, „damit man sie
   * fotografieren kann". Fotografiert wurde nie etwas. Ein Satz plus Absender
   * ist in zweieinhalb Sekunden gelesen.
   */
  schluss: 2.5,
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

/**
 * Die Pausen, die **zwischen** den Sprechern entstehen und die
 * `szenendauerAus` nicht kennt.
 *
 * ## Der Fehler, den sie behebt
 *
 * `szenendauerAus` rechnet je Szene: Sprechdauer plus eine Atempause. Seit dem
 * Umbau auf zwei Stimmen legt die Vertonung aber **innerhalb** einer Szene
 * eine Pause ein, sobald die Figur wechselt — 0,28 Sekunden, die in keiner
 * Schaetzung standen. Bei vier Reaktionszeilen sind das 1,1 Sekunden je Short,
 * und sie fehlten in der Sprechprobe, in der Laengenpruefung und im
 * Szenenzeitplan der Vorschau.
 *
 * **Die zweite Haelfte ist am 31.08.2026 entfallen.** Bis dahin stand hier ein
 * Zuschlag fuer den Fall, dass der Sprecherwechsel auf eine Szenengrenze
 * faellt: Dort schnitt die Vertonung und legte 0,45 statt 0,32 ein. Seit
 * `redelaeufe` an **jeder** Szenengrenze schneidet, kostet jede gleich viel —
 * `SZENENGRENZE_SEK` ist `PAUSE_NACH_SZENE_SEK`, der Zuschlag ist null.
 *
 * Uebrig bleibt der Fall, den `szenendauerAus` nicht sehen kann: der Wechsel
 * **innerhalb** einer Szene.
 *
 * ## Warum sie `redelaeufe` nicht aufruft
 *
 * `redelaeufe` in `src/stimme.ts` ist die Wahrheit ueber diese Pausen — die
 * Regel hier ist ihr Abbild und kein zweiter Entwurf. Aufrufen laesst sie sich
 * trotzdem nicht: `stimme.ts` importiert `node:buffer`, und `gesamtdauerBilder`
 * laeuft ueber `calculateMetadata` **im Browser**. Ein Import von dort haenge
 * den Render an einem Modul auf, das dort nicht laedt.
 *
 * **Die Doppelung hat deshalb eine Wache**: `skripte/schemapruefung.ts` haelt
 * beide Rechnungen je Short nebeneinander und meldet jede Abweichung. Eine
 * Doppelung ohne Wache waere der eigentliche Fehler.
 */
/**
 * Wie lange der Vorspann dauert — Vorhang zu, Titelkarte, zwei gesprochene
 * Namen, Jingle, Vorhang auf.
 *
 * ## Warum er eine einzige Zahl ist und keine Rechnung
 *
 * Sein gesprochener Teil ist in jedem Video **derselbe** und wird deshalb nur
 * einmal vertont und als feste Datei abgelegt (wie `gefaellt.wav`). Was je
 * Short wechselt, ist allein die Themenzeile — und die wird gelesen, nicht
 * gesprochen. Der Vorspann kostet also in jedem Video gleich viel Zeit.
 *
 * ## Wo sie einsteigt
 *
 * Der Vorspann sitzt als **Cold Open** nach der ersten Szene, nicht davor. Die
 * ganze Verrechnung passiert an genau einer Stelle: `shortVertonen` in
 * `src/stimme.ts` addiert diese Zahl auf die Uhr, bevor die zweite Szene
 * beginnt. Damit stimmen `szenenStartSek`, `tonspur.dauerSek`,
 * `szenenZeitplan` und `gesamtdauerBilder` **von selbst** — kein Offset muss
 * an fuenf Orten mitgedacht werden.
 *
 * Zwei Stellen sahen dabei kritisch aus und sind es nicht:
 * `gesamtdauerBilder` kuerzt bei vorhandener Tonspur auf `dauerSek +
 * NACHLAUF_SEK`, und die Vorspanndauer steckt in `dauerSek`. Und die
 * Aufschlagmessung filtert Woerter gegen `szenenStartSek[1]` — der
 * Vorspanntext liegt in einer **eigenen** Wortliste und nie in
 * `tonspur.woerter`, also liefert der Filter weiterhin genau die Woerter der
 * ersten Szene.
 *
 * ## Gemessen am 31.08.2026, an den Tondateien
 *
 * Hier stand **3,8**, und die Zahl war gerechnet: 0,4 s Vorhang zu, rund 2,6 s
 * Sprache, 0,6 s Jingle. Der Kommentar versprach, sie an der Tondatei
 * abzulesen, sobald es eine gibt. Es gibt sie, und die Rechnung lag um eine
 * ganze Sekunde daneben.
 *
 * Gerechnet wird mit der **laengsten** Show, nicht mit der mittleren: Die Zahl
 * gilt fuer jeden Short, also muss die langsamste hineinpassen. Ein Mittelwert
 * liesse „Empfehlungen" ueber die Karte hinauslaufen.
 *
 * | | |
 * |---|---|
 * | Voltis Ansage („Empfehlungen. Mit Volti …") | 2,59 s |
 * | Sprecherwechsel | 0,28 s |
 * | Wattis Einwurf („… und Watti!") | 1,15 s |
 * | Vorhang zu und auf, je 12 Bilder | 0,80 s |
 * | **zusammen** | **4,8 s** |
 *
 * ## Was die Messung nebenbei gefunden hat
 *
 * `eleven_v3` **halluziniert bei kurzen Eingaben**. Fuenf Laeufe mit identischem
 * Text (18 Zeichen) ergaben 4,80 · 5,04 · 2,08 · 4,24 · **415,84** Sekunden —
 * sieben Minuten Ton fuer vier Woerter. Das Modell ist auf lange Eingaben
 * gebaut und faengt unterhalb einiger Dutzend Zeichen an weiterzureden.
 *
 * Bekannt war nur die Streuung von „rund sechs Prozent", und die ist an 800
 * Zeichen gemessen. **Bei achtzehn sind es Faktor 200.** `skripte/vorspannton.ts`
 * laeuft deshalb dreimal je Aufnahme und verwirft alles ueber vier Sekunden;
 * sechs von dreissig Laeufen fielen durch.
 *
 * Wattis Reaktionszeilen sind 20 bis 40 Zeichen lang und laufen im Wochenlauf
 * durch dasselbe Modell — dort fiel ein kaputter Lauf erst **nach** dem
 * Bezahlen auf.
 *
 * **Seit dem 31.08.2026 nicht mehr.** `plausibelBisSek` in `src/stimme.ts`
 * haelt jede Synthese gegen die Laenge ihres Textes und wiederholt bei
 * Verdacht genau einmal. Der Befund bleibt hier stehen, weil er der Grund
 * ist: Die Wache ist an diesen fuenf Zahlen kalibriert.
 */
/**
 * Wie lange der feste Teil des Vorspanns dauert — je Show, aus den Aufnahmen.
 *
 * **`VORSPANN_SEK = 4,8` ist am 31.08.2026 gestrichen.** Es war eine feste
 * Zahl fuer die laengste Show, und daneben rechnete `ansageAbBild` in
 * `video/Short.tsx` dieselbe Sache **je Format**. Zwei Zahlen fuer denselben
 * Zeitpunkt, 1,57 s auseinander — und zwischen dem Ende der Themenansage und
 * dem ersten gesprochenen Wort klaffte deshalb ein Loch von **1,53 Sekunden**,
 * das keine Pruefung sehen konnte und das erst am fertigen Video auffiel.
 *
 * Dass die feste Zahl fuer die *laengste* Show gerechnet war, machte es
 * schlimmer statt besser: Sie war fuer jede andere Show zu gross, und genau
 * diese Differenz stand als Stille im Video.
 *
 * Jetzt faellt die Laenge aus den gemessenen Dauern: Showtitel, Pause, Einwurf,
 * Pause — je Show verschieden, **und das ist richtig, weil die Aufnahmen es
 * sind.** Eine Quelle statt zwei; dieselbe Lehre wie bei `gesamtdauerBilder`
 * am selben Abend.
 */
export const vorspannFestSek = (format: Format): number =>
  VORSPANNTON[format].volti + SPRECHERWECHSEL_SEK + VORSPANNTON[format].watti + SPRECHERWECHSEL_SEK;

/** Die Vorhangfahrt am Ende des Vorspanns, in Sekunden. */
export const VORHANGFAHRT_SEK = VORHANG.fahrtBilder / FORMAT.bilderProSekunde;

/**
 * Was Volti nach Wattis Einwurf sagt.
 *
 * **An genau einer Stelle**, weil zwei Leser danach greifen: die Synthese in
 * `src/stimme.ts` und die Schaetzung hier darunter. Stuende der Wortlaut
 * zweimal da, klaenge das Video eines Tages anders, als jede Laengenrechnung
 * annimmt — und niemand saehe es, weil beide fuer sich richtig waeren.
 */
export const themaAnsage = (short: Pick<Short, 'vorspann'>): string =>
  `Heutiges Thema: ${short.vorspann}.`;

/**
 * Wie lange der Vorspann dieses Shorts dauert.
 *
 * **War bis zum 31.08.2026 eine Konstante, und das ging nur, solange jedes Wort
 * fest war.** Mit der Themenansage wechselt der laengste Teil je Short: 51 bis
 * 63 Zeichen, rund vier Sekunden. Eine Zahl fuer alle waere fuer jeden Short
 * die falsche.
 *
 * Zwei Faelle, dieselbe Zweiteilung wie ueberall in dieser Datei:
 *
 * - **Mit Tonspur** steht die Dauer gemessen darin. Sie gilt, denn im fertigen
 *   Video zaehlt, was wirklich gesprochen wurde.
 * - **Ohne Tonspur** wird ueber `ZEICHEN_PRO_SEKUNDE` geschaetzt, wie bei jeder
 *   anderen Szene auch. Das ist die Zahl, mit der die Laengenpruefung vor der
 *   Vertonung arbeitet — und sie muss dieselbe Groesse meinen, sonst entstehen
 *   zwei Wahrheiten ueber dieselbe Laenge.
 *
 * Der feste Teil kommt aus `vorspannFestSek` — Showtitel und Einwurf, je Show
 * gemessen. Dahinter steht die Vorhangfahrt, denn `ablauf` in `Vorhang.tsx`
 * rechnet sie von hinten: Der Vorhang soll mit dem Vorspann fertig werden, und
 * solange die Ansage laeuft, gehoert das Thema ins Bild.
 */
export const vorspannSek = (short: Pick<Short, 'vorspann' | 'tonspur' | 'format'>): number =>
  vorspannFestSek(short.format) +
  (short.tonspur?.vorspann
    ? short.tonspur.vorspann.dauerSek
    : themaAnsage(short).length / ZEICHEN_PRO_SEKUNDE) +
  VORHANGFAHRT_SEK;


/**
 * Wie lange eine Figur **am Stueck** redet — ueber Szenengrenzen hinweg.
 *
 * ## Warum das eine eigene Groesse ist
 *
 * Der Befund vom 31.08.2026 an den ersten zwei fertigen Videos: In
 * `raumstation-alte-rechner` spricht Volti **13,9 Sekunden**, bevor Watti das
 * erste Mal etwas sagt. Alle Regeln waren dabei gruen — `zweistimmigkeit`
 * verlangt zwei Szenen mit beiden Stimmen, und die gab es. Das Minimum war
 * erfuellt und es war zu niedrig.
 *
 * ## Warum nicht ueber `redelaeufe`
 *
 * `redelaeufe` in `src/stimme.ts` gruppiert nach **Syntheseaufrufen**: Ein
 * Lauf ist, was in einem Stueck an ElevenLabs geht, und seit dem 31.08.2026
 * endet er an jeder Szenengrenze. Diese Funktion gruppiert nach
 * **zusammenhaengender Rede**, und die laeuft ueber Szenengrenzen weiter.
 *
 * Zwei verschiedene Fragen, zwei Funktionen — keine Doppelung. Waeren es
 * dieselben Bloecke, gehoerte eine der beiden geloescht.
 *
 * Dazu kommt die alte Sperre: `stimme.ts` importiert `node:buffer` und laesst
 * sich aus dem Browser-Kontext nicht aufrufen. Diese Datei kann es.
 */
export const redebloecke = (
  short: Short,
): { sprecher: Sprecher; zeichen: number; szenen: number[] }[] => {
  const bloecke: { sprecher: Sprecher; zeichen: number; szenen: number[] }[] = [];

  short.szenen.forEach((szene, i) => {
    const anteile = szene.rede ?? [
      // Siehe `redelaeufe` in `src/stimme.ts`: ohne `rede` behauptet die Szene ihren Satz.
      { sprecher: 'nachleser' as Sprecher, zug: 'behaupten' as const, text: szene.sprechtext.trim() },
    ];
    for (const anteil of anteile) {
      const letzter = bloecke[bloecke.length - 1];
      if (letzter !== undefined && letzter.sprecher === anteil.sprecher) {
        letzter.zeichen += anteil.text.trim().length;
        if (letzter.szenen[letzter.szenen.length - 1] !== i) letzter.szenen.push(i);
        continue;
      }
      bloecke.push({ sprecher: anteil.sprecher, zeichen: anteil.text.trim().length, szenen: [i] });
    }
  });

  return bloecke;
};

export const zusatzpausenSzene = (short: Short, i: number): number => {
  const szene = short.szenen[i];
  const anteile = szene?.rede;
  if (!szene || anteile === undefined) return 0;

  /*
   * Der Beat der **ersten** Zeile einer Szene faellt an ihrer vorderen Grenze
   * an — dort beginnt in `redelaeufe` immer ein neuer Lauf, unabhaengig vom
   * Sprecher. Die erste Szene des Shorts hat keine Naht davor.
   */
  let summe = i > 0 ? (anteile[0]?.beatSek ?? 0) : 0;

  /*
   * Wechsel **innerhalb** der Szene: jede Naht zwischen zwei Sprechern, dazu
   * der bestellte Beat der Zeile danach.
   *
   * **Der Beat zaehlt nur an einer Naht**, und das ist keine Nachlaessigkeit,
   * sondern die Wahrheit ueber den Schnitt: Zwei Anteile derselben Figur gehen
   * in einen Syntheseaufruf, dort gibt es keine Stelle, in die sich etwas
   * legen liesse. `beatverlust` in `src/pruefung.ts` meldet den Fall, statt
   * ihn hier stillschweigend mitzurechnen — sonst waere die Schaetzung laenger
   * als das Video.
   */
  for (let j = 1; j < anteile.length; j += 1) {
    if (anteile[j]!.sprecher !== anteile[j - 1]!.sprecher) {
      summe += SPRECHERWECHSEL_SEK + (anteile[j]!.beatSek ?? 0);
    }
  }

  /*
   * An der hinteren Szenengrenze faellt nichts mehr an: Sie kostet
   * `SZENENGRENZE_SEK`, und das ist genau die Atempause, die `szenendauerAus`
   * ohnehin schon addiert — mit Sprecherwechsel wie ohne.
   */
  return summe;
};

/**
 * Dieselben Pausen ueber den ganzen Short.
 *
 * **Je Szene und nicht nur als Summe**, weil sonst zwei Wahrheiten ueber
 * dieselbe Laenge entstuenden: `geschaetzteDauerSek` haette die Pausen
 * gezaehlt und `szenenZeitplan` nicht — der tonlose Render waere um bis zu
 * anderthalb Sekunden kuerzer gewesen als die Zahl, gegen die die
 * Laengenpruefung misst. Genau diese Sorte Widerspruch hat hier schon einmal
 * eine leere Buehne am Videoende produziert.
 */
export const zusatzpausenSek = (short: Short): number =>
  short.szenen.reduce((summe, _, i) => summe + zusatzpausenSzene(short, i), 0);

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
      const letzte = i === szenenStartSek.length - 1;
      // Die letzte Szene traegt den Nachlauf mit, sonst endet sie mit dem Wort
      // und die Komposition liefe ueber eine leere Buehne weiter.
      const naechster = (szenenStartSek[i + 1] ?? dauerSek) + (letzte ? NACHLAUF_SEK : 0);
      return {
        startBild: Math.round(start * fps),
        dauerBilder: Math.max(1, Math.round((naechster - start) * fps)),
      };
    });
  }

  /*
   * **Der Vorspann ist der Vorlauf, nicht ein Einschub.**
   *
   * Bis zum 31.08.2026 sass er zwischen Szene 0 und 1, und die Dauer wurde der
   * Szene davor zugeschlagen — waehrend er lief, war die Buehne dahinter vom
   * Vorhang gedeckt. Der Short begann mit dem Aufschlag als Cold Open.
   *
   * Am fertigen Video hat sich das nicht bewaehrt („der Anfang ist echt
   * unnoetig"), und seither steht der Vorhang am Anfang. Damit beginnt jede
   * Szene um dieselbe Spanne spaeter — **eine Anfangsbedingung statt einer
   * Sonderbehandlung mitten in der Schleife.**
   *
   * Was dabei erhalten bleibt: Alle Abstaende zwischen den Szenen sind
   * unveraendert, also misst die Aufschlagregel weiter dieselbe Differenz.
   */
  let laufend = vorspannSek(short);
  return short.szenen.map((szene, i) => {
    /*
     * Die Sprecherpausen gehoeren in die Szene, in der gewechselt wird —
     * sonst laufen Zeitplan und Gesamtdauer auseinander.
     */
    const dauer = geschaetzteSzenendauer(szene) + zusatzpausenSzene(short, i);
    const eintrag = {
      startBild: Math.round(laufend * fps),
      dauerBilder: Math.max(1, Math.round(dauer * fps)),
    };
    laufend += dauer;
    return eintrag;
  });
};

/**
 * Gesamtlaenge des Shorts in Bildern.
 *
 * **Immer aus dem Zeitplan, seit dem 31.08.2026.** Fuer vertonte Shorts stand
 * hier eine eigene Rechnung — `(dauerSek + NACHLAUF_SEK) * fps` —, und sie war
 * nicht falsch, sondern **zweite Wahrheit ueber dieselbe Groesse**. Beide
 * runden, und zwar an verschiedenen Stellen: Der Zeitplan rundet jede Szene
 * einzeln, diese Zeile die Summe. Beim ersten vertonten Short trennte sie
 * genau ein Bild — die Komposition war 1634 Bilder lang, die letzte Szene
 * endete bei 1633.
 *
 * Sichtbar wurde das nur im Standbild des **letzten** Bildes: eine leere
 * Buehne, ein Dreissigstel Sekunde lang, genau dort, wo der Rundlauf ansetzt.
 * Denselben Fehler hat dieselbe Zeile schon einmal produziert — damals 0,8
 * Sekunden lang, weil sie einen Nachlauf fuer eine geloeschte Endkarte
 * addierte. Er ist nicht wiedergekommen, weil die Zahl falsch war, sondern
 * **weil die Rechnung doppelt war.**
 *
 * Der Nachlauf steckt laengst im Zeitplan: `szenenZeitplan` schlaegt ihn der
 * letzten Szene zu, damit die Signatur nach dem letzten Wort stehen bleibt.
 * Ihn hier ein zweites Mal zu kennen, war der ganze Fehler. Jetzt kann per
 * Konstruktion kein Bild uebrig bleiben, das keine Szene abdeckt.
 */
export const gesamtdauerBilder = (short: Short): number => {
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
   * Das Zielfenster. **42 bis 67 Sekunden seit dem 31.08.2026.**
   *
   * Vorher 20 bis 65, davor 20 bis 36, davor 28 bis 40. Die Zwischenstaende
   * stehen hier nicht mehr — was von ihnen bleibt, sind drei Lehren, die jede
   * kuenftige Aenderung binden:
   *
   * - **Zielwert ist die Mitte, nicht der Rand.** Die Vertonung streut rund
   *   sechs Prozent (derselbe Text ergab 75,3 und 70,5 Sekunden). Wer an der
   *   Obergrenze baut, faellt beim naechsten Lauf heraus, ohne ein Wort
   *   geaendert zu haben.
   * - **Laenge ist keine Ursache, sondern eine Folge davon, wie viel es zu
   *   zeigen gibt.** Ein Fenster, das die Obergrenze zur Aussage ueber
   *   Qualitaet macht, misst die falsche Groesse.
   * - **Ein zu enger Zielwert verstuemmelt die Sprache.** Bei 23 Sekunden auf
   *   sechs Szenen blieben je Satz vier Sekunden, und es entstand „Laptops,
   *   aelter als fuenf Jahre." Kein Satz, kein Verb, ein Telegramm. Der Zwang
   *   kam nicht vom Fenster, sondern vom Zielwert, an dem geschrieben wird.
   *
   * ## Woher die 42 und die 67 kommen
   *
   * Die **67** sind gemessen, aber an einem fremden Kanal: `@dr_data_dr`
   * (91.000 Abonnenten, 44 Mio. Aufrufe), zwoelf Shorts zwischen 48 und 67
   * Sekunden, Median rund 61, das staerkste bei 51. Englisch, einstimmig,
   * anderes Publikum — uebertragbar ist die Groessenordnung, nicht mehr.
   *
   * Die **42** sind eine Entscheidung vom 31.08.2026 und keine Messung. Sie
   * hebt die Untergrenze so weit an, dass ein Gespraech ueberhaupt Platz hat:
   * Unter 42 Sekunden bleibt bei zwei Sprechern kaum mehr als ein Beleg und
   * eine Reaktion, und genau das war der Bau, der 0-mal geteilt wurde.
   *
   * **Was die Zahlen nicht sind: gemessen an eigenen Videos.** Alle neun
   * veroeffentlichten liegen bei 20 bis 23 Sekunden; zu jeder Laenge darueber
   * gibt es keine eigene Zahl. `npm run laengen` schweigt deshalb weiter.
   *
   * ## Die Zielwerte je Bauform sind nachgezogen
   *
   * Hier stand am 31.08.2026 morgens, die vier Zielwerte (25 / 35 / 45 / 60)
   * laegen zu drei Vierteln unter der neuen Untergrenze und die Entscheidung
   * sei offen gelassen, „bis feststeht, was zwei Figuren im Bild koennen".
   *
   * Das steht seit dem Abend desselben Tages fest, und die Vermutung von
   * morgens hat sich bestaetigt: **`einstimmig` ist gestrichen.** Bei einer
   * Untergrenze von 42 Sekunden ist der einstimmige Bau kein kurzer
   * Sonderfall, sondern ein Monolog von dreiviertel Minute — genau der Bau,
   * gegen den der Umbau laeuft.
   *
   * Die drei verbliebenen zielen auf **45 / 52 / 62** und liegen damit im
   * Fenster. Sie sind so gesetzt, dass sie es ausspannen: Die Klassen unten
   * fallen daraus ab, und ein Versuch ueber Laengen hat wieder etwas zu
   * messen. Gemessen ist keine der drei Zahlen — die Begruendung steht bei
   * `BAUFORMEN`.
   */
  ziel: [42, 67] as const,
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

/* ───────────────────────── Laengenklassen ──────────────────────────── */

/**
 * Die Klassen, in denen der Ruecklauf Laengen vergleicht.
 *
 * **Sie werden aus `BAUFORMEN` abgeleitet und nicht danebengeschrieben.** Die
 * Zielwerte sagen, welche Laengen wir ueberhaupt anstreben; eine zweite,
 * handgeschriebene Einteilung waere eine Doppelung ohne Wache und liefe beim
 * ersten Umbau lautlos auseinander — genau der Fehler, den `rede` neben
 * `sprechtext` nur deshalb nicht macht, weil dort eine harte Gleichheit
 * prueft.
 *
 * Die Grenze liegt jeweils **in der Mitte zwischen zwei benachbarten
 * Zielwerten**: Bei 25 / 35 / 45 / 60 sind das 30, 40 und 53. Damit liegt
 * jeder Zielwert mittig in seiner Klasse, und eine Bauform, die ihr Ziel
 * trifft, landet in ihrer eigenen Klasse.
 *
 * Zwei Bauformen mit demselben Zielwert teilen sich eine Klasse. Das ist kein
 * Sonderfall, sondern die richtige Antwort: Sie sind dann in dieser Hinsicht
 * dasselbe, und genau deshalb wurden die Zielwerte am 26.08.2026 gespreizt.
 */
export type Laengenklasse = { name: string; von: number; bis: number };

const klassenAusZielwerten = (): Laengenklasse[] => {
  const ziele = [...new Set(Object.values(BAUFORMEN).map((b) => b.zielSek))].sort((a, b) => a - b);
  const grenzen = ziele.slice(0, -1).map((z, i) => Math.round((z + ziele[i + 1]!) / 2));

  return ziele.map((_, i) => {
    const von = i === 0 ? 0 : grenzen[i - 1]!;
    const bis = i === ziele.length - 1 ? Infinity : grenzen[i]!;
    return {
      name: von === 0 ? `bis ${bis} s` : bis === Infinity ? `über ${von} s` : `${von}–${bis} s`,
      von,
      bis,
    };
  });
};

export const LAENGENKLASSEN = klassenAusZielwerten();

/** In welche Klasse eine Dauer faellt. Die letzte Klasse ist nach oben offen. */
export const laengenklasseVon = (sek: number): Laengenklasse =>
  LAENGENKLASSEN.find((k) => sek >= k.von && sek < k.bis) ?? LAENGENKLASSEN[LAENGENKLASSEN.length - 1]!;

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
  geschaetzteInhaltSek(short) +
  // Der Vorspann zaehlt mit. Das Laengenfenster misst, wie lange der Zuschauer
  // zusieht — nicht, wie lange geredet wird.
  vorspannSek(short);

/**
 * Dieselbe Schaetzung **ohne** den Vorspann — die Laenge des Gespraechs.
 *
 * ## Warum es beide gibt
 *
 * Das **Fenster** (42–67 s) misst, wie lange der Zuschauer zusieht, und dazu
 * gehoert der Vorspann. Der **Zielwert einer Bauform** misst etwas anderes: wie
 * lang ein so gebautes Gespraech ist. Der Vorspann ist bei jeder Bauform
 * derselbe und sagt ueber sie nichts aus.
 *
 * Solange er 3,8 Sekunden gerechnet war, fiel der Unterschied nicht auf. Mit
 * der Themenansage kostet er **9,5**, und damit blieben einer Wechselrede von
 * ihren 45 Sekunden noch 35,5 fuer den Inhalt — `ersatzteil-freischalten`
 * meldete 58 gegen 45, ohne dass am Text etwas falsch war.
 *
 * Die Zielwerte einfach anzuheben ging nicht: 62 plus 9,5 sind 71,5 und reissen
 * die Obergrenze. **Zwei Groessen, die verschiedene Dinge meinen, brauchen
 * verschiedene Zahlen** — nicht dieselbe Zahl mit einem Aufschlag.
 */
export const geschaetzteInhaltSek = (short: Short): number =>
  short.szenen.reduce((summe, szene) => summe + geschaetzteSzenendauer(szene), 0) +
  zusatzpausenSek(short);
