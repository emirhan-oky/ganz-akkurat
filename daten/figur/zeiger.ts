import { FARBEN } from '../../src/marke';
import type { Rig, Stil } from '../../src/figur';
import { POL_DOPPELT, mitPolen, nachleser } from './nachleser';

/**
 * Der zweite Akku — derselbe Koerper, andere Rolle.
 *
 * **Der Kanal hat seit dem 24.08.2026 zwei Figuren, und sie teilen sich die
 * Arbeit:** Der `nachleser` traegt den Inhalt, der `zeiger` alles, was der
 * Zuschauer tun kann — liken, folgen, abonnieren. Wer den Kanal ein paar Mal
 * sieht, weiss beim Auftauchen des Zweiten sofort, worum es geht.
 *
 * Der Anlass war ein Bauproblem: Mitten im Video steht der Nachleser schon auf
 * der Buehne und kann nicht gleichzeitig zum Like-Knopf schauen. Drei Anlaeufe
 * mit einer koerperlosen Hand sind daran gescheitert — sie wurde im fertigen
 * Video als **Schluessel** gelesen.
 *
 * Nebenbei stimmt damit der Spruch: „Wir haben nachgelesen" steht im Plural
 * und hatte bisher nur einen Sprecher.
 *
 * **Abgeleitet und nicht abgeschrieben.** Die Teile, Gelenke und Griffe kommen
 * unveraendert vom `nachleser`; getauscht wird nur die Farbe. Ein zweites Rig
 * von Hand waere beim ersten Umbau am Koerper auseinandergelaufen, und zwar
 * lautlos — die Schemapruefung sieht zwei gueltige Rigs, nicht zwei
 * verschiedene.
 *
 * Seine Kennfarbe ist das Altrosa `anzeigeZwei`. Gelb und Rot waren dafuer im
 * Gespraech: Gelb ist an der Luminanz gescheitert (auf hellem Grund 1,1 zu 1),
 * Rot war zu grell. Die Rechnungen stehen bei `FARBEN` in `src/marke.ts`.
 */
const farbeTauschen = (stil: Stil | undefined, karte: Record<string, string>): Stil | undefined => {
  if (!stil) return stil;
  return {
    ...stil,
    ...(stil.fuellung && karte[stil.fuellung] ? { fuellung: karte[stil.fuellung] } : {}),
    ...(stil.strich && karte[stil.strich] ? { strich: karte[stil.strich] } : {}),
  };
};

/**
 * Ein Rig mit getauschten Farben.
 *
 * **Alle Tausche in einem Durchgang, nicht nacheinander.** Der Akku traegt
 * einen blauen Ladebalken, und der Zeiger wird selbst blau — waeren es zwei
 * Durchgaenge, faerbte der zweite den frisch blauen Koerper gleich mit, und
 * der Balken verschwaende im Koerper.
 *
 * Geht sowohl ueber `teil.stil` als auch ueber `form.stil`: Der Ladebalken ist
 * eine Form mit eigenem Stil, und ohne den zweiten Durchgriff bliebe er in der
 * alten Farbe stehen.
 */
export const eingefaerbt = (rig: Rig, karte: Record<string, string>): Rig => ({
  ...rig,
  teile: rig.teile.map((teil) => ({
    ...teil,
    stil: farbeTauschen(teil.stil, karte),
    formen: teil.formen.map((form) => ({
      ...form,
      stil: farbeTauschen(form.stil, karte),
    })),
  })),
});

/**
 * **Zwei Unterschiede, beide abgeleitet: zwei Pole statt eines, Altrosa statt
 * Blau.**
 *
 * Koerper, Gesicht, Gelenke, Groesse, Haltung — alles identisch und alles vom
 * `nachleser` uebernommen. Ein zweites Rig von Hand liefe beim ersten Umbau am
 * Koerper auseinander, und zwar lautlos: Die Schemapruefung saehe zwei gueltige
 * Rigs und nicht zwei verschiedene.
 *
 * **Die Pole kamen am 31.08.2026 dazu.** Bis dahin trennte die beiden allein
 * die Balkenfarbe, dazu ab dem 25.08. eine Stauchung, die aus Watti eine
 * Knopfzelle machte. Beides trug zu wenig: Der Farbfleck ist im Feed
 * briefmarkengross, und die Stauchung ist am selben Abend wieder gefallen —
 * „ich haette nicht gedacht, dass jetzt beide so klein und dickfoermig
 * aussehen".
 *
 * **Was trennt, ist die Oberkante.** Watti traegt zwei Pole wie ein
 * 9-Volt-Block, Volti den einen, den der Kanal seit dem 24.08.2026 fuehrt und
 * den auch das Logozeichen der Wortmarke zeigt. Ein Unterschied in der
 * Silhouette liest sich auch klein; ein Farbfleck tut das nicht.
 *
 * **Die Reihenfolge zaehlt.** Erst die Pole tauschen, dann faerben — nicht
 * umgekehrt: `eingefaerbt` greift auf jede Form durch, und ein danach
 * eingesetzter Pol traege noch die alte Farbe.
 *
 * Zur Farbe: Der erste Anlauf faerbte den ganzen Koerper, und das war falsch.
 * Ein zweiter Avatar in anderer Koerperfarbe ist eine fremde Figur; einer mit
 * anderer Anzeige ist derselbe Bautyp in einer anderen Rolle.
 */
export const zeiger: Rig = eingefaerbt(mitPolen(nachleser, POL_DOPPELT), {
  [FARBEN.anzeigeEins]: FARBEN.anzeigeZwei,
});

/**
 * **Die Stauchung ist am 31.08.2026 ersatzlos gefallen** — hier stand bis dahin
 * `ZEIGER_STAUCHUNG` mit `scale(1.2 0.74)` um die Standlinie.
 *
 * Sie kam am 25.08.2026 aus einem Notbehelf: Im ersten Standbild zu zweit waren
 * die beiden nicht auseinanderzuhalten, und eine gestauchte Knopfzelle neben
 * einer schlanken Zelle war der schnellste sichtbare Unterschied.
 *
 * **Sie hat das Problem geloest und ein zweites gemacht.** Am 31.08. wurde sie
 * erst auf beide Figuren ausgeweitet und am selben Abend ganz gestrichen: Zwei
 * breite Figuren brauchen mehr Buehne, also musste jede kleiner werden — von
 * 84 auf 55 von 150 Einheiten Hoehe. „Klein und dickfoermig" war das Urteil,
 * und beides stimmte.
 *
 * **Die Aufgabe hat jetzt die Oberkante**, und sie erledigt sie besser: ein Pol
 * gegen zwei ist ein Unterschied in der Silhouette und kostet keine Breite.
 * Ohne Stauchung passen beide Figuren auf **88** von 150 Einheiten — groesser,
 * als Volti je war.
 *
 * Wer sie wieder einbauen will, weil zwei Figuren sich zu aehnlich sehen: Das
 * war ihr Zweck, und dafuer gibt es jetzt ein besseres Mittel.
 */
