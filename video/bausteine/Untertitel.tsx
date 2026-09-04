import type { Untertitelwort } from '../../src/typen';

/**
 * Die Gruppierung wortgenauer Untertitel.
 *
 * **Von der Datei ist am 04.09.2026 nur `gruppiere` uebrig.** Die Komponente
 * `Untertitel` daneben lief nur noch bei einer Tonspur mit einem einzigen
 * Sprecherabschnitt, und `zweistimmigkeit` macht die seit dem 26.08.2026
 * unmoeglich — ein Zweig, den kein Short mehr erreicht.
 *
 * **Das Karaoke-Prinzip ist geblieben und nur umgezogen:** `Redespalten`
 * gruppiert damit die Zeilen unter den Figuren, und das aktive Wort steht dort
 * weiter auf farbigem Grund. Die Zeitstempel stammen aus der Sprachsynthese
 * selbst, nicht aus einer nachtraeglichen Erkennung, sind also exakt statt
 * geschaetzt.
 */

/**
 * Wie viele Zeichen eine Gruppe hoechstens umfasst.
 *
 * Von 20 auf 28 erhoeht am 13.08.2026: Drei Woerter wechselten so schnell,
 * dass die untere Bildhaelfte staendig flackerte. Vier Woerter stehen ruhiger,
 * ohne dass man dem Text hinterherliest — bei 66 Pixel Schrift passen sie
 * immer noch in eine Zeile.
 */
const MAX_ZEICHEN_PRO_GRUPPE = 28;
/** Wie viele Woerter eine Gruppe hoechstens umfasst. */
const MAX_WOERTER_PRO_GRUPPE = 4;

type Gruppe = {
  woerter: Untertitelwort[];
  startSek: number;
  endeSek: number;
};

/**
 * Fasst Woerter zu lesbaren Haeppchen zusammen. Eine spuerbare Sprechpause
 * beendet eine Gruppe immer — so folgt der Untertitel dem Satzrhythmus statt
 * stur einem Zeichenzaehler.
 */
export const gruppiere = (woerter: Untertitelwort[]): Gruppe[] => {
  const gruppen: Gruppe[] = [];
  let aktuell: Untertitelwort[] = [];

  const abschliessen = () => {
    if (aktuell.length === 0) return;
    const erstes = aktuell[0]!;
    const letztes = aktuell[aktuell.length - 1]!;
    gruppen.push({ woerter: aktuell, startSek: erstes.startSek, endeSek: letztes.endeSek });
    aktuell = [];
  };

  for (const wort of woerter) {
    const vorheriges = aktuell[aktuell.length - 1];
    const pause = vorheriges ? wort.startSek - vorheriges.endeSek : 0;
    const zeichen = aktuell.reduce((n, w) => n + w.wort.length + 1, 0) + wort.wort.length;

    const zuLang = zeichen > MAX_ZEICHEN_PRO_GRUPPE;
    const zuViele = aktuell.length >= MAX_WOERTER_PRO_GRUPPE;
    const satzende = vorheriges ? /[.!?:]$/.test(vorheriges.wort) : false;

    if (aktuell.length > 0 && (zuLang || zuViele || satzende || pause > 0.28)) {
      abschliessen();
    }
    aktuell.push(wort);
  }
  abschliessen();

  return gruppen;
};
