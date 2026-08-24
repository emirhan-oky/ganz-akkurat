import { FARBEN } from '../../src/marke';
import type { Rig, Stil } from '../../src/figur';
import { nachleser } from './nachleser';

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
 * Seine Farbe ist der Akzent des Kanals — seit dem 24.08.2026 das Gelb
 * `#F7F36D` aus der Vorlage, mit der die ganze Palette umgekehrt wurde.
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
 * Getauscht wird genau eine Farbe: die des Koerpers.
 *
 * Der Nachleser ist hell, der Zeiger gelb — beide mit demselben dunklen
 * Ladebalken, denselben Augen, demselben Mund. Sie sind erkennbar dasselbe
 * Geraet und trotzdem im Standbild nie zu verwechseln.
 *
 * `FARBEN.blau` heisst weiter so und ist seit dem 24.08.2026 das Gelb
 * `#F7F36D`; der Name steht fuer die Rolle „Akzent", nicht fuer den Farbton.
 */
export const zeiger: Rig = eingefaerbt(nachleser, {
  [FARBEN.tinte]: FARBEN.blau,
});
