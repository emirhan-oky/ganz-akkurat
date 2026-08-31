import { FARBEN, SCHRIFT, SPRUCH } from '../src/marke';
import { FORMATE, type Format } from '../src/typen';
import { Doppelzeichen, Logozeichen } from './bausteine/Wortmarke';
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
 * Der YouTube-Banner — 2048x1152.
 *
 * **Der sichere Bereich bestimmt die Komposition, nicht die Bildmitte.** Von
 * den 2048x1152 sind nur **1235x338 in der Mitte** auf allen Geraeten
 * sichtbar; auf dem Handy sieht man genau diesen flachen Streifen. Alles, was
 * gelesen werden muss, gehoert hinein — alles, was schmueckt, darf daneben
 * stehen und erscheint erst auf dem Desktop.
 *
 * Deshalb steht mittig nur Spruch und Zeile. Die beiden Akkus und die Lupe
 * flankieren sie ausserhalb: Auf dem Handy fehlt nichts, auf dem grossen
 * Bildschirm erzaehlt der Banner mehr.
 *
 * Der Aufbau folgt dem Feld der `Farbprobe`, weil dort schon steht, wie die
 * Teile zusammen wirken: Satz oben, Figuren und Symbol in der Mitte, unten
 * Strich, Spruch und eine Zeile im selben Muster.
 *
 * **Die Zeile nennt keine Frequenz.** „Viermal die Woche" waere ein
 * Versprechen an ein Publikum, das es noch nicht gibt — dasselbe Argument, mit
 * dem am 20.08.2026 der Wochentag gestrichen wurde. Sie sagt stattdessen, was
 * den Kanal von hundert anderen mit derselben Verpackung unterscheidet.
 */
const BANNER_SATZ = 'Nichts davon ist Zufall.';

export const BannerMuster: React.FC = () => (
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
     * der nichts steht: Der Block ist oben 308 breit, in der Mitte 800 und
     * unten rund 500. Genau diese Flaeche zeigt das Telefon.
     *
     * Die drei Streifen sind an der gerenderten Fassung gemessen, nicht
     * geschaetzt — dieselbe Regel wie bei der Sprechgeschwindigkeit und der
     * Denkpause. Der Rand von 34 Pixeln kommt dazu.
     */}
    <Muster
      breite={2048}
      hoehe={1152}
      frei={[
        { breite: 308, oben: -140, unten: -12 },
        { breite: 800, oben: 8, unten: 80 },
        { breite: 510, oben: 98, unten: 140 },
      ]}
      freiRand={34}
      linie={FARBEN.linie}
      dunkel={FARBEN.tinte}
      akzent={FARBEN.blau}
    />

    {/*
     * **Der ganze Vordergrund steht gestapelt im sicheren Feld.**
     *
     * Bis zum 25.08.2026 flankierten die Figuren den Satz und die Lupe stand
     * rechts aussen — beides ausserhalb der 1235x338 und damit auf dem Handy
     * unsichtbar. Das war als Zugabe fuer grosse Bildschirme gedacht und ist
     * die falsche Rechnung: Ein Kanalbanner wird ueberwiegend am Telefon
     * gesehen, und was dort fehlt, fehlt fast immer.
     *
     * Die Groessen sind daran gerechnet, nicht geschaetzt. Gestapelt braucht
     * der Block in den alten Groessen rund 415 Pixel Hoehe; erlaubt sind 338.
     * Akkus 130, Satz 72, Spruch 36, Zeile 28, dazwischen je 15 — zusammen
     * rund 325, also 13 Pixel Luft. Die Akkus standen erst auf 100 und wirkten
     * neben dem Satz verloren; die Reserve ist in sie geflossen.
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
        gap: 15,
        zIndex: 1,
      }}
    >
      {/* Die beiden Akkus, zentriert ueber dem Satz. */}
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: 174, height: 130 }}>
          <Figur rig={nachleser} pose={POSEN.zeigen} />
        </div>
        <div style={{ width: 174, height: 130, marginLeft: -40 }}>
          <Figur rig={zeiger} pose={POSEN.ruhe} />
        </div>
      </div>

      <div
        style={{
          fontFamily: SCHRIFT.familie,
          fontStyle: 'italic',
          fontWeight: SCHRIFT.schwarz,
          fontSize: 72,
          color: FARBEN.tinte,
          lineHeight: 1.05,
          textAlign: 'center',
        }}
      >
        {BANNER_SATZ}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 88, height: 7, borderRadius: 999, backgroundColor: FARBEN.blau }} />
        <span
          style={{
            fontFamily: SCHRIFT.familie,
            fontStyle: 'italic',
            fontWeight: SCHRIFT.fett,
            fontSize: 36,
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

