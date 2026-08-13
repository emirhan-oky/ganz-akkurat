import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BUEHNE, SICHERE_ZONE, UNTERTITEL_ZONE } from '../../src/marke';

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
  /**
   * Zeichnung unterhalb des Textes.
   *
   * Der Grund, aus dem es diesen Platz gibt: Zwischen Text und Untertitel
   * blieb bisher ein Viertel der Bildhoehe ungenutzt — der Text stand mittig,
   * darunter kam lange nichts. Hier steht jetzt das Geraet, um das es geht.
   *
   * Bewusst **optional**. Ein Bild, das nur Platz fuellt, macht den Short
   * nicht besser: Bei „Die Garantie ist abgelaufen" gibt es nichts zu
   * zeichnen, und ein beliebiges Dock daneben waere Dekoration. Ohne
   * Illustration bleibt der Text mittig stehen wie zuvor.
   */
  illustration?: React.ReactNode;
}> = ({ children, ausrichtung = 'mitte', dauerBilder, illustration }) => {
  const frame = useCurrentFrame();

  const zoom = dauerBilder
    ? interpolate(frame, [0, dauerBilder], [1, 1.045], { extrapolateRight: 'clamp' })
    : 1;

  return (
    <AbsoluteFill
      style={{
        paddingTop: SICHERE_ZONE.oben,
        // Der Untertitel wohnt unten in der sicheren Zone mit, seit er nicht
        // mehr im verdeckten Bereich sitzt. Die Buehne rendert nicht hinein.
        paddingBottom: SICHERE_ZONE.unten + UNTERTITEL_ZONE,
        paddingLeft: SICHERE_ZONE.links,
        paddingRight: SICHERE_ZONE.rechts,
        display: 'flex',
        flexDirection: 'column',
        // Mit Illustration steht der Text oben und die Zeichnung fuellt den
        // Rest — sonst schoebe die Zentrierung beide in die Bildmitte und
        // liesse oben und unten je ein Loch.
        justifyContent: illustration || ausrichtung === 'oben' ? 'flex-start' : 'center',
        alignItems: 'stretch',
        width: BUEHNE.breite + SICHERE_ZONE.links + SICHERE_ZONE.rechts,
        transform: `scale(${zoom})`,
        transformOrigin: 'center center',
      }}
    >
      {children}

      {illustration && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 0,
          }}
        >
          {illustration}
        </div>
      )}
    </AbsoluteFill>
  );
};
