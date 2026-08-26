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
 * Getauscht wird genau eine Farbe: die des **Ladebalkens**.
 *
 * Koerper, Augen, Mund, Groesse, Haltung — alles identisch. Die beiden sind
 * dasselbe Geraet, und was sie trennt, ist die Anzeige darauf: blau beim
 * Nachleser, rot beim Zeiger.
 *
 * **Der erste Anlauf faerbte den Koerper**, und das war falsch. Ein zweiter
 * Avatar in anderer Koerperfarbe ist eine zweite Figur; ein zweiter mit
 * anderem Balken ist derselbe in einer anderen Rolle. Genau das ist gemeint.
 */
export const zeiger: Rig = eingefaerbt(nachleser, {
  [FARBEN.anzeigeEins]: FARBEN.anzeigeZwei,
});

/**
 * Wattis Umriss: eine **Knopfzelle**, breiter als hoch.
 *
 * **Warum die Balkenfarbe nicht mehr genuegt.** Sie war richtig, solange es
 * eine Figur in zwei Rollen war — der Kommentar oben sagt das noch. Seit dem
 * 25.08.2026 sind es zwei Charaktere mit Namen, die miteinander reden, und im
 * ersten Standbild zu zweit waren sie nicht auseinanderzuhalten: gleicher
 * Koerper, gleiches Gesicht, gleiche Groesse, dazwischen ein Farbfleck, der im
 * Feed briefmarkengross ist. Wiedererkennung ist der ganze Grund fuer den
 * Umbau — bei 0 Abonnenten baut sie niemand mit einem Detail auf.
 *
 * **Gestaucht statt umgebaut.** Ein zweites Rig von Hand liefe beim ersten
 * Umbau am Koerper auseinander, und ein veraendertes Gehaeuse zoege Gelenke,
 * Arme und Beine hinter sich her: Die Armgelenke sitzen bei x = 68 und 132,
 * ein breiteres Gehaeuse liesse die Arme aus dem Rumpf wachsen. Die Stauchung
 * nimmt alles mit — Koerper, Gesicht, Glieder — und bleibt eine Zeile.
 *
 * Um die **Standlinie** bei y = 140, nicht um die Mitte: Eine Figur, die um
 * ihren Mittelpunkt gestaucht wird, versinkt im Boden. Dieselbe Rechnung wie
 * bei `PLAETZE` in `Buehnenbild.tsx`.
 *
 * Zwei Klischee-Wege wurden vorher verworfen: eine eigene Koerperfarbe (macht
 * aus der Rolle eine fremde Figur) und Geschlechtszeichen wie Wimpern (sagen
 * nichts ueber eine Figur, die alles falsch macht und nichts lernt).
 */
export const ZEIGER_STAUCHUNG = 'translate(100 140) scale(1.2 0.74) translate(-100 -140)';
