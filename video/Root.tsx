import { Composition } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { FORMAT } from '../src/marke';
import { Short as ShortDaten } from '../src/typen';
import { gesamtdauerBilder } from '../src/zeit';
import { Short } from './Short';
import { beispielShort } from '../daten/beispiel-short';
import { BannerMuster, ProfilbildDunkel, ProfilbildHell, WortmarkeQuer } from './Marke';

/**
 * Alle Schriftstaerken, die das Design-System kennt. Werden hier einmal
 * geladen — sonst rendert der erste Frame mit Ersatzschrift und die
 * Zeilenumbrueche verspringen.
 */
loadFont('normal', { weights: ['300', '400', '600', '800', '900'], subsets: ['latin', 'latin-ext'] });

export const RemotionRoot: React.FC = () => (
  <>
  {/*
    * Die Kanalbilder liegen bewusst neben dem Short und nicht in einem
    * eigenen Projekt: Sie sollen sich mitaendern, wenn sich die Marke aendert.
    * Ein Bild, das von Hand gebaut wurde, veraltet still.
    */}
  <Composition id="Profilbild-hell" component={ProfilbildHell} width={1024} height={1024} fps={30} durationInFrames={1} />
  <Composition id="Profilbild-dunkel" component={ProfilbildDunkel} width={1024} height={1024} fps={30} durationInFrames={1} />
  <Composition id="Banner-muster" component={BannerMuster} width={2048} height={1152} fps={30} durationInFrames={1} />
  <Composition id="Wortmarke-quer" component={WortmarkeQuer} width={1600} height={360} fps={30} durationInFrames={1} />
  <Composition
    id="Short"
    component={Short}
    width={FORMAT.breite}
    height={FORMAT.hoehe}
    fps={FORMAT.bilderProSekunde}
    durationInFrames={900}
    defaultProps={{ daten: beispielShort }}
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
  </>
);
