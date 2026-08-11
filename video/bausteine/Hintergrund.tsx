import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { FARBEN, FORMAT, ISOMETRIE } from '../../src/marke';

/**
 * Heller Grund mit isometrischem Gitter — direkt aus dem Bannerstil der Marke.
 *
 * Das Gitter driftet ueber die Laufzeit minimal diagonal. Kaum bewusst
 * wahrnehmbar, aber es nimmt dem Standbild die Starre, ohne vom Text
 * abzulenken.
 */
export const Hintergrund: React.FC<{ akzent?: boolean }> = ({ akzent = true }) => {
  const frame = useCurrentFrame();

  // Eine volle Kachel pro 12 Sekunden. Bewusst unterhalb der Aufmerksamkeit.
  const drift = (frame / (12 * FORMAT.bilderProSekunde)) % 1;
  const versatzX = drift * ISOMETRIE.gitterBreite;
  const versatzY = drift * ISOMETRIE.gitterHoehe;

  return (
    <AbsoluteFill style={{ backgroundColor: FARBEN.grund }}>
      <svg
        width={FORMAT.breite}
        height={FORMAT.hoehe}
        viewBox={`0 0 ${FORMAT.breite} ${FORMAT.hoehe}`}
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <pattern
            id="isoGitter"
            width={ISOMETRIE.gitterBreite}
            height={ISOMETRIE.gitterHoehe}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${versatzX} ${versatzY})`}
          >
            <path
              d={`M0 ${ISOMETRIE.gitterHoehe / 2}L${ISOMETRIE.gitterBreite / 2} 0L${ISOMETRIE.gitterBreite} ${
                ISOMETRIE.gitterHoehe / 2
              }L${ISOMETRIE.gitterBreite / 2} ${ISOMETRIE.gitterHoehe}Z`}
              fill="none"
              stroke={FARBEN.gitter}
              strokeWidth={1}
            />
          </pattern>

          {/* Weicher Lichtschein hinter dem Inhalt, damit Text vom Gitter abhebt. */}
          <radialGradient id="lichtschein" cx="50%" cy="42%" r="58%">
            <stop offset="0%" stopColor={FARBEN.grundRein} stopOpacity={0.95} />
            <stop offset="100%" stopColor={FARBEN.grundRein} stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect width={FORMAT.breite} height={FORMAT.hoehe} fill="url(#isoGitter)" />
        <rect width={FORMAT.breite} height={FORMAT.hoehe} fill="url(#lichtschein)" />

        {akzent && (
          <>
            {/*
              Wegweiser-Dreiecke wie im Banner: setzen Rhythmus ohne Text.
              Sie liegen ausschliesslich in den Raendern ausserhalb der Buehne —
              innerhalb wuerden sie hinter Ueberschriften durchscheinen.
            */}
            <polygon points="944,470 944,528 990,499" fill={FARBEN.blau} opacity={0.10} />
            <polygon points="1004,1640 1004,1698 954,1669" fill={FARBEN.blau} opacity={0.10} />
            <polygon points="120,1730 120,1780 163,1755" fill={FARBEN.blau} opacity={0.07} />
          </>
        )}
      </svg>
    </AbsoluteFill>
  );
};
