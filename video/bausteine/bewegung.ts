import { interpolate, spring } from 'remotion';
import { TEMPO } from '../../src/marke';

/**
 * Gemeinsames Bewegungsvokabular.
 *
 * Alle Szenen greifen hierauf zu, damit das Timing-Gefuehl ueber ein ganzes
 * Video und ueber alle zehn Videos eines Laufs hinweg identisch bleibt.
 * Bewegung ist hier Dienstleistung am Lesen, nicht Selbstzweck.
 */

/** Einflug von unten mit Deckkraft. Der Standardauftritt fuer Textelemente. */
export const auftritt = (frame: number, fps: number, verzoegerungBilder = 0) => {
  const f = frame - verzoegerungBilder;
  const fortschritt = spring({ frame: f, fps, config: TEMPO.feder });
  return {
    opacity: interpolate(f, [0, TEMPO.einblenden], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    transform: `translateY(${interpolate(fortschritt, [0, 1], [26, 0])}px)`,
  };
};

/** Gestaffelter Auftritt fuer Listen: jedes Element etwas spaeter. */
export const auftrittGestaffelt = (frame: number, fps: number, index: number, grundVerzoegerung = 0) =>
  auftritt(frame, fps, grundVerzoegerung + index * TEMPO.versatzProElement);

/**
 * Auftritt im Sprechrhythmus.
 *
 * Der entscheidende Unterschied zu `auftrittGestaffelt`: Dort erscheinen alle
 * Elemente kurz nach Szenenbeginn in festem Abstand, danach passiert nichts
 * mehr. Hier verteilen sie sich ueber die **ganze** Szenenlaenge — und weil
 * sich die Szenenlaenge aus der tatsaechlichen Sprechdauer ergibt, erscheint
 * jedes Element ungefaehr dann, wenn die Stimme es erwaehnt.
 *
 * Die letzten 15 Prozent bleiben frei, damit der vollstaendige Stand noch
 * einen Moment ruhig zu sehen ist, bevor die Szene wechselt.
 */
export const auftrittImSprechrhythmus = (
  frame: number,
  fps: number,
  index: number,
  anzahl: number,
  dauerBilder: number,
) => {
  const anteil = anzahl <= 1 ? 0 : (index / anzahl) * 0.85;
  return auftritt(frame, fps, Math.round(anteil * dauerBilder));
};

/** Reines Einblenden ohne Versatz — fuer grossflaechige Elemente. */
export const einblenden = (frame: number, verzoegerungBilder = 0, dauer: number = TEMPO.einblenden) =>
  interpolate(frame - verzoegerungBilder, [0, dauer], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/**
 * Kurzer Aufmerksamkeitsimpuls: einmal leicht groesser und zurueck.
 * Nur fuer den einen entscheidenden Moment einer Szene verwenden.
 */
export const impuls = (frame: number, fps: number, beiBild: number) => {
  const f = frame - beiBild;
  if (f < 0) return 1;
  const s = spring({ frame: f, fps, config: { damping: 12, stiffness: 220, mass: 0.5 } });
  return 1 + interpolate(s, [0, 1], [0.09, 0]);
};

/** Zeichnet eine SVG-Linie fortschreitend. Fuer Signalwege und Diagramme. */
export const linienFortschritt = (frame: number, verzoegerungBilder: number, dauerBilder: number) =>
  interpolate(frame - verzoegerungBilder, [0, dauerBilder], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
