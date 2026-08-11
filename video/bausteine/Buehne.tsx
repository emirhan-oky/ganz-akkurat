import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BUEHNE, SICHERE_ZONE } from '../../src/marke';

/**
 * Nutzflaeche innerhalb der sicheren Zone.
 *
 * Ausserhalb liegen die Bedienelemente von TikTok, Reels und Shorts — rechts
 * die Aktionsleiste, unten Beschreibung und Ton. Was hier nicht hineinpasst,
 * wird auf mindestens einer Plattform verdeckt. Deshalb rendert jede Szene
 * ausschliesslich in diesem Rahmen.
 *
 * Die Buehne traegt ausserdem die **Dauerbewegung**: eine sehr langsame
 * Vergroesserung ueber die gesamte Szenenlaenge. Ohne sie steht das Bild nach
 * dem Einblenden mehrere Sekunden voellig still, und genau das laesst einen
 * Short wie eine Diashow wirken. Die Bewegung ist zu langsam, um bewusst
 * aufzufallen, aber schnell genug, dass das Auge nicht abschaltet.
 */
export const Buehne: React.FC<{
  children: React.ReactNode;
  ausrichtung?: 'oben' | 'mitte';
  /** Laenge der Szene in Bildern. Bestimmt das Tempo der Dauerbewegung. */
  dauerBilder?: number;
}> = ({ children, ausrichtung = 'mitte', dauerBilder }) => {
  const frame = useCurrentFrame();

  const zoom = dauerBilder
    ? interpolate(frame, [0, dauerBilder], [1, 1.045], { extrapolateRight: 'clamp' })
    : 1;

  return (
    <AbsoluteFill
      style={{
        paddingTop: SICHERE_ZONE.oben,
        paddingBottom: SICHERE_ZONE.unten,
        paddingLeft: SICHERE_ZONE.links,
        paddingRight: SICHERE_ZONE.rechts,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: ausrichtung === 'mitte' ? 'center' : 'flex-start',
        alignItems: 'stretch',
        width: BUEHNE.breite + SICHERE_ZONE.links + SICHERE_ZONE.rechts,
        transform: `scale(${zoom})`,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
