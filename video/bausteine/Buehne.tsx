import { AbsoluteFill } from 'remotion';
import { BUEHNE, SICHERE_ZONE } from '../../src/marke';

/**
 * Nutzflaeche innerhalb der sicheren Zone.
 *
 * Ausserhalb liegen die Bedienelemente von TikTok, Reels und Shorts — rechts
 * die Aktionsleiste, unten Beschreibung und Ton. Was hier nicht hineinpasst,
 * wird auf mindestens einer Plattform verdeckt. Deshalb rendert jede Szene
 * ausschliesslich in diesem Rahmen.
 */
export const Buehne: React.FC<{
  children: React.ReactNode;
  ausrichtung?: 'oben' | 'mitte';
}> = ({ children, ausrichtung = 'mitte' }) => (
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
    }}
  >
    {children}
  </AbsoluteFill>
);
