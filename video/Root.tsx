import { Composition } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { loadFont as ladePlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { FORMAT } from '../src/marke';
import { Short as ShortDaten } from '../src/typen';
import { gesamtdauerBilder } from '../src/zeit';
import { Short } from './Short';
import { beispielShort } from '../daten/beispiel-short';
import { BannerMuster, ProfilbildHell } from './Marke';
import { Figurenprobe, Figurenfolge, Figurengang, Buehnenprobe } from './Figurenprobe';
import { Farbprobe } from './Farbprobe';
import { Pillenprobe } from './Pillenprobe';
import { Haltungsprobe, Wortwechselprobe, Wortwechselstaende, Zuwendungsprobe } from './Wortwechselprobe';
import { Bewegungsprobe, BEWEGUNGSPROBE_BILDER } from './Bewegungsprobe';
import { Kulissenprobe } from './Kulissenprobe';
import { Anordnungsprobe, AnordnungsprobeProps } from './Anordnungsprobe';

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
ladePlayfair('italic', {
  weights: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'latin-ext'],
});

export const RemotionRoot: React.FC = () => (
  <>
  {/*
    * Die Kanalbilder liegen bewusst neben dem Short und nicht in einem
    * eigenen Projekt: Sie sollen sich mitaendern, wenn sich die Marke aendert.
    * Ein Bild, das von Hand gebaut wurde, veraltet still.
    */}
  <Composition id="Profilbild-hell" component={ProfilbildHell} width={1024} height={1024} fps={30} durationInFrames={1} />
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
  <Composition id="Farbprobe" component={Farbprobe} width={2480} height={1320} fps={30} durationInFrames={1} />
    <Composition id="Pillenprobe" component={Pillenprobe} width={1500} height={1180} fps={30} durationInFrames={1} />
  {/* Der Musterbogen fuer die Bildaufteilung: acht Muster, 4 × 2, halbe
      Aufloesung. `--props='{"zonen":true}'` legt die App-Flaechen darueber. */}
  <Composition
    id="Anordnungsprobe"
    component={Anordnungsprobe}
    schema={AnordnungsprobeProps}
    defaultProps={{ zonen: false }}
    width={FORMAT.breite * 2}
    height={FORMAT.hoehe}
    fps={30}
    durationInFrames={1}
  />
  <Composition id="Bewegungsprobe" component={Bewegungsprobe} width={1920} height={1080} fps={30} durationInFrames={BEWEGUNGSPROBE_BILDER} />
  <Composition id="Wortwechselstaende" component={Wortwechselstaende} width={1888} height={1436} fps={30} durationInFrames={1} />
  <Composition id="Wortwechselprobe" component={Wortwechselprobe} width={1900} height={3300} fps={30} durationInFrames={1} />
  {/* 60 Bilder statt 1: Die Sprechstaerke braucht 8 Bilder Anlauf. Standbild bei 20. */}
  <Composition id="Zuwendungsprobe" component={Zuwendungsprobe} width={1300} height={1000} fps={30} durationInFrames={60} />
  {/* In Formatgroesse, als einzige Probe: Gefragt sind 7,5 Pixel von 1920 — wer
      das vergroessert beurteilt, beantwortet eine andere Frage. Bild 20 wie oben. */}
  <Composition
    id="Haltungsprobe"
    component={Haltungsprobe}
    width={FORMAT.breite}
    height={FORMAT.hoehe}
    fps={FORMAT.bilderProSekunde}
    durationInFrames={60}
    defaultProps={{ traeger: 'keine' as const }}
  />
  {/* Die Kulisse in Formatgroesse, mit `--props` gegen den heutigen Stand. */}
  <Composition
    id="Kulissenprobe"
    component={Kulissenprobe}
    width={FORMAT.breite}
    height={FORMAT.hoehe}
    fps={FORMAT.bilderProSekunde}
    durationInFrames={1}
    defaultProps={{ mitKulisse: true, mitVorhang: true }}
  />
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
