import { FARBEN, SCHRIFT, SPRUCH } from '../src/marke';
import { Doppelzeichen, Wortmarke } from './bausteine/Wortmarke';
import { Vorhangstoff } from './bausteine/Vorhang';
import { Muster } from './bausteine/Muster';
import { Figur } from './bausteine/Figur';
import { nachleser } from '../daten/figur/nachleser';
import { zeiger } from '../daten/figur/zeiger';
import { POSEN } from './bausteine/posen';

/**
 * Kanalbilder — Profilbild und YouTube-Banner.
 *
 * Sie sind hier Kompositionen und keine Bilddateien, und das ist der Punkt.
 * Bis zum 17.08.2026 lagen acht PNG-Banner im Repository, zusammen 32 MB, und
 * sie zeigten einen Kanalnamen, den es nicht mehr gibt. Ein Bild, das von Hand
 * gebaut wurde, veraltet still: Man aendert die Marke im Code, das Bild bleibt.
 *
 * Aus derselben Quelle gebaut heisst: Wer `FARBEN.blau` verschiebt oder die
 * Wortmarke aendert, aendert das Profilbild mit. Erzeugt werden die Dateien
 * mit `npm run markenbilder`, und sie landen in `marke/` — ausserhalb von Git,
 * weil sie jederzeit reproduzierbar sind.
 */

/**
 * Profilbild, hell — 1024x1024.
 *
 * **Zwei Akkuzeichen, seit dem 25.08.2026.** Vorher stand hier eines allein.
 * Der Kanal hat zwei Figuren mit geteilter Arbeit, und das Kanalbild ist die
 * Stelle, an der man sie zuerst sieht — unterschieden wie ueberall sonst am
 * Ladebalken, blau und altrosa.
 *
 * **Das Zeichen, nicht die Figur.** Der Akku ohne Gesicht und Gliedmassen
 * bleibt bei 40 Pixeln lesbar; zwei vollstaendige Figuren waeren dort zwei
 * dunkle Flecken mit Beinen.
 *
 * Ein Kanalbild wird bei TikTok mit rund 40 Pixeln Kantenlaenge angezeigt und
 * **rund beschnitten**. Zwei Figuren nebeneinander brauchen deshalb Breite,
 * und die ist im Kreis am knappsten: Bei einem Quadrat von 1024 misst der
 * einbeschriebene Kreis dieselben 1024, aber auf halber Hoehe. Das Paar steht
 * deshalb auf rund 620 Pixel Breite — schmal genug, dass der Beschnitt keinen
 * Arm nimmt.
 *
 * Keine Schrift: Jede Wortmarke waere bei 40 Pixeln ein grauer Streifen.
 *
 * Die Regel von hier gilt weiter: erst gerendert, dann geurteilt. Der erste
 * Anlauf des alten Zeichens stand auf 660 und war zu klein — im Quadrat
 * ausgewogen, als Kanalbild ein Punkt mit viel Rand.
 */
export const ProfilbildHell: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: FARBEN.grund,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {/*
     * Die beiden stehen dicht beieinander und ueberlappen leicht: Ein
     * Kanalbild wird rund beschnitten, und zwei Zeichen mit Luft dazwischen
     * fallen dabei aus dem Kreis. Als Paar gelesen brauchen sie ohnehin keine
     * Trennung — der Ladebalken unterscheidet sie.
     *
     * Das Zeichen bringt in seiner 100er-Flaeche links und rechts je 16
     * Einheiten Rand mit; bei 460 Pixeln sind das rund 74 je Seite. Ein
     * negativer Abstand von 120 laesst die Gehaeuse damit rund 30 Pixel
     * ueberlappen.
     */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/*
        Die Paarung kommt seit dem 31.08.2026 aus `Doppelzeichen` und wird
        hier nicht mehr von Hand gebaut. Die Rechnung dafuer — 16 Einheiten
        Rand je Seite, daraus der Versatz — stand vorher an zwei Orten und
        waere beim ersten Umbau auseinandergelaufen.
      */}
      <Doppelzeichen hoehe={460} />
    </div>
  </div>
);

/**
 * Das sichere Feld eines YouTube-Banners.
 *
 * YouTube zeigt je nach Geraet einen anderen Ausschnitt derselben Datei.
 * Sicher sichtbar ist allein ein Feld von **1235x338 Pixeln in der Mitte**;
 * auf dem Fernseher laeuft das ganze Bild, auf dem Telefon nur dieser
 * Streifen. Alles, was gelesen werden muss, gehoert hinein.
 *
 * Am 17.08.2026 hat sich das im Betrieb bestaetigt: Der Spruch stand
 * vollstaendig im beschnittenen Desktop-Streifen, mit Dreiecken links und
 * rechts als Rahmung. Waere er breiter gesetzt, waere er angeschnitten.
 *
 * Dieselbe Sorte Regel wie die 270-Pixel-Zone des Untertitels im Video: eine
 * gemessene Grenze fremder Software, die man nicht verhandeln kann.
 */
const SICHER_BREITE = 1235;
const SICHER_HOEHE = 338;

/**
/**
 * Der YouTube-Banner — 2048x1152.
 *
 * **Der sichere Bereich bestimmt die Komposition, nicht die Bildmitte.** Von
 * den 2048x1152 sind nur **1235x338 in der Mitte** auf allen Geraeten
 * sichtbar; auf dem Handy sieht man genau diesen flachen Streifen. Alles, was
 * gelesen werden muss, gehoert hinein — alles, was schmueckt, darf daneben
 * stehen und erscheint erst auf dem Desktop.
 *
 * ## Der Banner ist eine Buehne, seit dem 02.09.2026
 *
 * Bis dahin stand er in der Welt vor dem 31.08.: Isometriemuster, Marineblau,
 * kein Vorhang. Das Video beginnt seitdem als Show und traegt links und rechts
 * gerafftes Tuch ueber die ganze Laufzeit — **das Kanalbild zeigte einen
 * Kanal, den es so nicht mehr gibt.** Genau der Fall, gegen den diese Datei
 * ueberhaupt gebaut wurde, nur eine Ebene hoeher: Nicht die Bilddatei war
 * veraltet, sondern die Komposition dahinter.
 *
 * Der Aufbau ist derselbe wie im Video und nicht nachgebaut: `Vorhangstoff`
 * kommt aus `video/bausteine/Vorhang.tsx` und bekommt hier nur andere Masze.
 * Ein zweiter Vorhang von Hand waere die Doppelung ohne Wache, vor der an
 * fuenf Stellen dieser Datei gewarnt wird.
 *
 * Deshalb steht mittig nur Spruch und Zeile. Die beiden Akkus und die Lupe
 * flankieren sie ausserhalb: Auf dem Handy fehlt nichts, auf dem grossen
 * Bildschirm erzaehlt der Banner mehr.
 *
 * **Die Zeile nennt keine Frequenz.** „Viermal die Woche" waere ein
 * Versprechen an ein Publikum, das es noch nicht gibt — dasselbe Argument, mit
 * dem am 20.08.2026 der Wochentag gestrichen wurde. Sie sagt stattdessen, was
 * den Kanal von hundert anderen mit derselben Verpackung unterscheidet.
 */
const BANNER_SATZ = 'Nichts davon ist Zufall.';

/**
 * Wie breit das geraffte Tuch je Seite steht — **an der Kante des sicheren
 * Feldes gerechnet, nicht am Bildrand.**
 *
 * Vom Bildrand bis zum sicheren Feld sind es (2048 - 1235) / 2 = 406 Pixel.
 * Ein Vorhang, der genau dort endet, ist auf dem Handy **unsichtbar** — und
 * damit fehlt er in dem Fall, der fast immer gilt. Ein Vorhang, der weit
 * hineinreicht, drueckt den Satz.
 *
 * 480 laesst ihn 74 Pixel ins sichere Feld ragen: am Telefon ein roter
 * Streifen an beiden Raendern, wie im Video, und zwischen den beiden Bahnen
 * bleiben 1088 Pixel Buehne fuer einen Satz, der 740 breit ist.
 *
 * Dieselbe Abwaegung wie beim Rand des Videovorhangs, nur von der anderen
 * Seite: Dort war die Untergrenze der App-Beschnitt, hier ist es die
 * Handy-Ansicht.
 */
const BANNER_BAHN = 480;

/**
 * Die Figuren stehen auf 186 statt auf 130 Pixeln.
 *
 * Bei 130 waren sie im Feed zwei dunkle Punkte ueber einer Zeile — der Banner
 * zeigte den Kanal, ohne die beiden zu zeigen, die ihn tragen. Der Platz kommt
 * aus dem Satz: 72 auf 56 Pixel, und der Spruch von 36 auf 28.
 *
 * Das Seitenverhaeltnis stammt aus der alten Fassung (174 zu 130) und wird
 * mitskaliert; die Ueberlappung ebenso. Wer die Hoehe aendert, aendert Breite
 * und Versatz mit — von Hand nachgezogen liefen die drei beim ersten Umbau
 * auseinander.
 */
const FIGUR_HOCH = 186;

/**
 * Ohne Wortmarke bekommen die Figuren den Platz — 214 statt 186.
 *
 * **YouTube setzt den Kanalnamen direkt unter den Banner**, im Bild steht er
 * also ein zweites Mal. Ob die Wiederholung die Zeile wert ist, entscheidet
 * kein Argument, sondern der Vergleich:
 *
 *     npx remotion still video/index.ts Banner-muster mit.png
 *     npx remotion still video/index.ts Banner-muster ohne.png --props='{"ohneWortmarke":true}'
 */
const FIGUR_HOCH_OHNE = 214;

export const BannerMuster: React.FC<{ ohneWortmarke?: boolean }> = ({ ohneWortmarke = false }) => {
  const figurHoch = ohneWortmarke ? FIGUR_HOCH_OHNE : FIGUR_HOCH;
  const FIGUR_BREIT = Math.round(figurHoch * (174 / 130));
  const FIGUR_VERSATZ = Math.round(figurHoch * (40 / 130));
  return (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: FARBEN.grund,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/*
     * **Der Freiraum ist die Silhouette des Textblocks, keine Huelle darum.**
     *
     * Bis zum 25.08.2026 stand hier zweimal die falsche Form. Erst war der
     * Freiraum breiter als der Ausschnitt, den ein Telefon zeigt — vom Muster
     * sah man dort **gar nichts**. Dann war er ein Rechteck von 790 x 330,
     * und damit blieb neben den Akkus und neben dem Spruch Flaeche frei, in
     * der nichts steht.
     *
     * Die vier Streifen bilden den Block von oben nach unten ab: Figuren,
     * Wortmarke, Satz, Spruchzeile. Der Rand von 34 Pixeln kommt dazu.
     *
     * **Der Akzent ist Theaterrot statt Marineblau.** Die blauen Dreiecke
     * standen neben einem roten Vorhang wie ein Rest der alten Marke — und
     * Blau gehoert seit dem 31.08.2026 einer der beiden Figuren, nicht dem
     * Kanal.
     */}
    <Muster
      breite={2048}
      hoehe={1152}
      frei={[
        { breite: 410, oben: -170, unten: -14 },
        { breite: 300, oben: -14, unten: 24 },
        { breite: 760, oben: 24, unten: 96 },
        { breite: 480, oben: 96, unten: 140 },
      ]}
      freiRand={34}
      linie={FARBEN.linie}
      dunkel={FARBEN.tinte}
      akzent={FARBEN.vorhang}
    />

    {/*
     * Das geraffte Tuch, aus derselben Zeichnung wie im Video.
     *
     * `Vorhangstoff` rechnet seine Bahn als Anteil der halben Breite. Der
     * Anteil steht deshalb hier als Bruch und nicht als Zahl: Wer
     * `BANNER_BAHN` verschiebt, verschiebt das Tuch mit.
     *
     * Der Querbehang kommt gratis dazu und macht aus zwei roten Balken eine
     * Buehne — dieselbe Beobachtung wie im Video, wo er im Ruhezustand als
     * flache Blende stehen bleibt.
     */}
    <Vorhangstoff zu={BANNER_BAHN / 1024} breite={2048} hoehe={1152} />

    {/*
     * **Der ganze Vordergrund steht gestapelt im sicheren Feld.**
     *
     * Bis zum 25.08.2026 flankierten die Figuren den Satz und die Lupe stand
     * rechts aussen — beides ausserhalb der 1235x338 und damit auf dem Handy
     * unsichtbar. Das war als Zugabe fuer grosse Bildschirme gedacht und ist
     * die falsche Rechnung: Ein Kanalbanner wird ueberwiegend am Telefon
     * gesehen, und was dort fehlt, fehlt fast immer.
     *
     * Die Groessen sind gerechnet, nicht geschaetzt. Erlaubt sind 338 Pixel:
     * Figuren 186, Wortmarke 30, Satz 56 mal 1,05, Spruch 28, dazwischen je
     * 6 — zusammen rund 329.
     *
     * Das Feld ist an `SICHER_BREITE` und `SICHER_HOEHE` festgemacht und nicht
     * an freien Zahlen: Die Grenze steht damit im Code und nicht im Kopf.
     */}
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: SICHER_BREITE,
        height: SICHER_HOEHE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        zIndex: 1,
      }}
    >
      {/* Die beiden Figuren, zentriert ueber der Wortmarke. */}
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: FIGUR_BREIT, height: figurHoch }}>
          <Figur rig={nachleser} pose={POSEN.zeigen} />
        </div>
        <div style={{ width: FIGUR_BREIT, height: figurHoch, marginLeft: -FIGUR_VERSATZ }}>
          <Figur rig={zeiger} pose={POSEN.ruhe} />
        </div>
      </div>

      {/*
       * Die Wortmarke in den gedaempften Kennfarben — dieselbe Fassung wie in
       * der Kopfzeile jedes Videos. Ohne Doppelzeichen davor: Die beiden
       * Akkus stehen als Figuren schon darueber, und das Zeichen ist ihre
       * Abkuerzung.
       */}
      {!ohneWortmarke && (
        <Wortmarke groesse={30} farbe={FARBEN.kennVoltiTief} farbeZwei={FARBEN.kennWattiTief} />
      )}

      <div
        style={{
          fontFamily: SCHRIFT.familie,
          fontStyle: 'italic',
          fontWeight: SCHRIFT.schwarz,
          fontSize: 56,
          color: FARBEN.tinte,
          lineHeight: 1.05,
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {BANNER_SATZ}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        {/* Der Strich traegt den Akzent, und der ist auf der Buehne rot. */}
        <div style={{ width: 88, height: 7, borderRadius: 999, backgroundColor: FARBEN.vorhang }} />
        <span
          style={{
            fontFamily: SCHRIFT.familie,
            fontStyle: 'italic',
            fontWeight: SCHRIFT.fett,
            fontSize: 28,
            color: FARBEN.tinteWeich,
            whiteSpace: 'nowrap',
          }}
        >
          {SPRUCH}
        </span>
      </div>
    </div>
  </div>
  );
};
