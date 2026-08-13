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
 * Anteil der Szene, der bespielt wird. Der Rest steht still, damit der
 * vollstaendige Stand noch einen Moment ruhig zu sehen ist.
 */
const BESPIELT = 0.85;

/**
 * Das Zeitfenster eines Elements innerhalb der Szene, in Bildern.
 *
 * Die Grundlage aller Timings, die sich nach der Stimme richten sollen. Weil
 * die Szenenlaenge aus der tatsaechlichen Sprechdauer stammt, faellt der
 * Abschnitt eines Elements ungefaehr mit dem Moment zusammen, in dem die
 * Stimme davon spricht.
 *
 * `start` ist der Auftritt, `laenge` der Platz bis zum naechsten Element —
 * darin lassen sich Folgebewegungen unterbringen, etwa ein Durchstrich, der
 * erst laufen darf, wenn die Zeile gelesen ist.
 */
export const abschnitt = (index: number, anzahl: number, dauerBilder: number) => {
  const nutzbar = dauerBilder * BESPIELT;
  const laenge = anzahl <= 1 ? nutzbar : nutzbar / anzahl;
  return {
    start: anzahl <= 1 ? 0 : Math.round(index * laenge),
    laenge: Math.round(laenge),
  };
};

/**
 * Auftritt im Sprechrhythmus.
 *
 * Der entscheidende Unterschied zu `auftrittGestaffelt`: Dort erscheinen alle
 * Elemente kurz nach Szenenbeginn in festem Abstand, danach passiert nichts
 * mehr. Hier verteilen sie sich ueber die **ganze** Szenenlaenge.
 *
 * Wer feste Sekunden rechnet, baut einen Fehler ein, der erst nach der
 * Vertonung sichtbar wird: Die Animation ist nach drei Sekunden durch, die
 * Stimme redet noch neun weitere — und das Bild steht still. Genau das war
 * am 13.08.2026 bei allen vier Vertiefungsszenen der Fall, also
 * ausgerechnet bei den laengsten Szenen des Videos.
 */
export const auftrittImSprechrhythmus = (
  frame: number,
  fps: number,
  index: number,
  anzahl: number,
  dauerBilder: number,
) => auftritt(frame, fps, abschnitt(index, anzahl, dauerBilder).start);

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
