import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';

/**
 * Eine Kamerafahrt ueber die Buehne.
 *
 * Sie sitzt **innerhalb** des SVG und rechnet in Buehneneinheiten, nicht in
 * Pixeln. Das ist der Grund, warum sie hier steht und nicht als CSS-Transform
 * am Container: Ein Zoom auf „die Stelle, an der die Lupe auftaucht" laesst
 * sich nur formulieren, wenn die Stelle Koordinaten hat — und die hat sie im
 * Buehnenraum 200 x 150, nicht in einem Kasten, dessen Pixelmasse vom
 * Endgeraet abhaengen.
 *
 * ## Warum `Easing.inOut(sin)` und nicht `spring`
 *
 * Gemessen am 12.08.2026: Ueber etwa **1 % Bildaenderung je Einzelbild** wird
 * eine Fahrt unruhig. `spring` in Remotions Voreinstellung (`damping: 10`)
 * erreicht in der Spitze das **2,95-fache** seiner
 * Durchschnittsgeschwindigkeit, `Easing.inOut(sin)` nur das **1,57-fache**.
 *
 * Bei einer Figur ist die Feder richtig — ein Arm, der federt, wirkt lebendig.
 * Bei der Kamera ist sie falsch: Eine Kamera, die nachschwingt, sieht nicht
 * lebendig aus, sondern nach verwackelt. Deshalb hier eine Sinuskurve, deren
 * Spitze knapp ueber dem Mittel liegt.
 *
 * ## Die Fahrt laeuft ueber die ganze Szene
 *
 * Kein Auftritt am Anfang und danach Stillstand. Dieselbe Ueberlegung wie bei
 * `auftrittImSprechrhythmus`: Wer feste Sekunden rechnet, hat die Bewegung
 * nach drei Sekunden durch, waehrend die Stimme noch neun weitere redet.
 */

export type Kamerastand = {
  /** Blickpunkt in Buehnenkoordinaten. Voreinstellung ist die Buehnenmitte. */
  x?: number;
  y?: number;
  /** 1 ist die ganze Buehne. Groesser heisst naeher. */
  zoom?: number;
};

const MITTE = { x: 100, y: 75 };

/**
 * Die groesste Annaeherung, die noch ruhig wirkt.
 *
 * Nicht gemessen, sondern gesetzt — und deshalb ausdruecklich als Annahme
 * markiert. Bei einer Buehne von 200 Einheiten schneidet Faktor 1,4 rund ein
 * Drittel weg; darueber liegt die Figur schnell teilweise ausserhalb, und ein
 * abgeschnittener Kopf ist derselbe lautlose Fehler wie eine Zeichnung unter
 * y = 146.
 */
const ZOOM_MAX = 1.4;

export const Kamera: React.FC<{
  von?: Kamerastand;
  nach?: Kamerastand;
  /** Szenenlaenge in Bildern. Die Fahrt verteilt sich darueber. */
  dauer: number;
  children: React.ReactNode;
}> = ({ von = {}, nach = {}, dauer, children }) => {
  const frame = useCurrentFrame();

  const t = interpolate(frame, [0, Math.max(1, dauer)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.sin),
  });

  const misch = (a: number | undefined, b: number | undefined, ruhe: number) =>
    interpolate(t, [0, 1], [a ?? ruhe, b ?? ruhe]);

  const zoom = Math.min(ZOOM_MAX, misch(von.zoom, nach.zoom, 1));
  const x = misch(von.x, nach.x, MITTE.x);
  const y = misch(von.y, nach.y, MITTE.y);

  /*
   * Die Reihenfolge ist die ganze Rechnung: erst die Buehnenmitte an den
   * Ursprung schieben, dort skalieren, dann den Blickpunkt an die Mitte
   * ruecken. Andersherum wandert das Bild beim Zoomen aus dem Rahmen, weil
   * dann um die linke obere Ecke skaliert wird.
   */
  return (
    <g transform={`translate(${MITTE.x} ${MITTE.y}) scale(${zoom}) translate(${-x} ${-y})`}>
      {children}
    </g>
  );
};
