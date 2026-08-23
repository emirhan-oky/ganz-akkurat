import { Composition } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { loadFont as ladePlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as ladeAnton } from '@remotion/google-fonts/Anton';
import { loadFont as ladeArchivoBlack } from '@remotion/google-fonts/ArchivoBlack';
import { FORMAT } from '../src/marke';
import { Short as ShortDaten } from '../src/typen';
import { gesamtdauerBilder } from '../src/zeit';
import { Short } from './Short';
import { beispielShort } from '../daten/beispiel-short';
import { BannerMuster, ProfilbildDunkel, ProfilbildHell, WortmarkeQuer } from './Marke';
import { Figurenprobe, Figurenfolge, Figurengang, Buehnenprobe } from './Figurenprobe';
import { Untertitelprobe } from './Untertitelprobe';

/**
 * Alle Schriftstaerken, die das Design-System kennt. Werden hier einmal
 * geladen — sonst rendert der erste Frame mit Ersatzschrift und die
 * Zeilenumbrueche verspringen.
 */
loadFont('normal', { weights: ['300', '400', '600', '800', '900'], subsets: ['latin', 'latin-ext'] });

/*
 * Die Auszeichnungsschrift fuer Aufschlag und Schlusssatz. Die Begruendung
 * fuer die Wahl steht bei `SCHRIFT.auszeichnung` in `src/marke.ts`.
 *
 * Auch hier gilt, was fuer Inter gilt: Wer die Schrift erst in der Komponente
 * anfordert, rendert das erste Bild mit Ersatzschrift, und die Zeilenumbrueche
 * verspringen. Beim Aufschlag entscheidet der Umbruch ueber den Platz, den die
 * Buehne darunter bekommt.
 */
ladePlayfair('italic', { weights: ['900'], subsets: ['latin', 'latin-ext'] });

/*
 * Die Untertitelschrift. Begruendung bei `SCHRIFT.untertitel` in `marke.ts`.
 */
ladeArchivoBlack('normal', { weights: ['400'], subsets: ['latin', 'latin-ext'] });

/* Der unterlegene Kandidat — nur noch fuer `Untertitelprobe`. */
ladeAnton('normal', { weights: ['400'], subsets: ['latin', 'latin-ext'] });

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
  {/*
    * Der Prueftisch der Figur. Steht hier aus demselben Grund wie die
    * Kanalbilder: Was nur von Hand geprueft wird, wird irgendwann nicht mehr
    * geprueft.
    */}
  <Composition id="Figurenprobe" component={Figurenprobe} width={2600} height={1100} fps={30} durationInFrames={1} defaultProps={{ geruest: false }} />
  <Composition id="Figurengeruest" component={Figurenprobe} width={2600} height={1100} fps={30} durationInFrames={1} defaultProps={{ geruest: true }} />
  <Composition id="Figurenfolge" component={Figurenfolge} width={1920} height={640} fps={30} durationInFrames={1} defaultProps={{ pose: 'zeigen' as const }} />
  <Composition id="Figurengang" component={Figurengang} width={1080} height={1080} fps={30} durationInFrames={120} defaultProps={{ pose: 'zeigen' as const }} />
  {/* Die Buehnenprobe steht bei Bild 60 von 90: nach dem Uebergang bei 40 %,
      denn ein Anfangszustand zeigt nichts von dem, was die Buehne behauptet. */}
  <Composition id="Buehnenprobe" component={Buehnenprobe} width={1800} height={900} fps={30} durationInFrames={90} />
  {/* Der Prueftisch fuer die Untertitelschrift. Geht nach der Entscheidung
      wieder weg, samt der Kandidatenschriften oben. */}
  <Composition id="Untertitelprobe" component={Untertitelprobe} width={1900} height={1100} fps={30} durationInFrames={1} />
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
