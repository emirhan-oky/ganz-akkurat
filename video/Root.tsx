import { Composition } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { FORMAT } from '../src/marke';
import { Short as ShortDaten } from '../src/typen';
import { gesamtdauerBilder } from '../src/zeit';
import { Short } from './Short';
import { beispielShort } from '../daten/beispiel-short';

/**
 * Alle Schriftstaerken, die das Design-System kennt. Werden hier einmal
 * geladen — sonst rendert der erste Frame mit Ersatzschrift und die
 * Zeilenumbrueche verspringen.
 */
loadFont('normal', { weights: ['300', '400', '600', '800', '900'], subsets: ['latin', 'latin-ext'] });

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Short"
    component={Short}
    width={FORMAT.breite}
    height={FORMAT.hoehe}
    fps={FORMAT.bilderProSekunde}
    durationInFrames={900}
    defaultProps={{ daten: beispielShort, reihe: 'SchreibtischKlar' }}
    /**
     * Die Laufzeit ergibt sich aus den Daten, nicht aus einem festen Wert:
     * bei vorhandener Tonspur aus deren echten Zeitstempeln, sonst aus der
     * geschaetzten Sprechdauer.
     */
    calculateMetadata={({ props }) => {
      const daten = ShortDaten.parse(props.daten);
      return { durationInFrames: gesamtdauerBilder(daten) };
    }}
  />
);
