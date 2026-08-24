import { FARBEN, SCHRIFT, SPRUCH } from '../src/marke';
import { FORMATE, type Format } from '../src/typen';
import { Logozeichen, Wortmarke } from './bausteine/Wortmarke';
import { Muster } from './bausteine/Muster';
import { Figur } from './bausteine/Figur';
import { Symbol } from './bausteine/Geraete';
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
 * Nur das Akkuzeichen, keine Schrift. Ein Kanalbild wird bei TikTok mit rund
 * 40 Pixeln Kantenlaenge angezeigt und rund beschnitten; jede Wortmarke darin
 * waere ein grauer Streifen. Das Zeichen fuellt deshalb knapp zwei Drittel der
 * Flaeche — genug Rand, dass der runde Beschnitt nichts abschneidet, und
 * gross genug, dass der blaue Ladestand bei 40 Pixeln noch sichtbar ist.
 *
 * Der erste Anlauf stand auf 660 und war zu klein: Im Quadrat sah es
 * ausgewogen aus, als Kanalbild war es ein Punkt mit viel Rand. Der runde
 * Beschnitt nimmt ohnehin die Ecken, also darf das Zeichen bis nah an den
 * Rand — nachgerechnet bleibt an der schmalsten Stelle des Kreises noch
 * Luft. Wieder die Regel: erst gerendert, dann geurteilt.
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
    <Logozeichen groesse={820} />
  </div>
);

/**
 * Profilbild, dunkel — 1024x1024.
 *
 * Dieselbe Zeichnung auf Tinte. Im Feed stehen Kanalbilder meist auf hellem
 * Grund, und ein heller Kreis auf hellem Grund verschwindet. Welche der beiden
 * Fassungen genommen wird, entscheidet sich am fertigen Kanal, nicht hier —
 * deshalb gibt es beide.
 */
export const ProfilbildDunkel: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: FARBEN.tinte,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width={820} height={820} viewBox="0 0 100 100" style={{ display: 'block' }}>
      <rect x="38" y="4" width="24" height="12" rx="4" fill={FARBEN.grund} />
      <rect x="16" y="16" width="68" height="80" rx="14" fill={FARBEN.grund} />
      <rect x="28" y="52" width="44" height="34" rx="7" fill={FARBEN.blau} />
    </svg>
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
 * Wortmarke quer, freigestellt — 1600x360.
 *
 * Fuer alles, was kein Kanalbild ist: Impressum, Anschreiben, ein
 * Presseversand, spaeter eine Website. Wird mit durchsichtigem Grund
 * gerendert, damit sie auf jeden Untergrund passt.
 */
export const WortmarkeQuer: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 34,
    }}
  >
    <Logozeichen groesse={200} />
    <Wortmarke groesse={200} />
  </div>
);

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
    <Muster
      breite={2048}
      hoehe={1152}
      freiBreite={1580}
      freiHoehe={620}
      linie={FARBEN.linie}
      dunkel={FARBEN.tinte}
      akzent={FARBEN.blau}
    />

    {/*
     * Die Akkus links, die Lupe rechts — **neben** dem Text, nicht darunter.
     *
     * Gerechnet, nicht geschaetzt: Der Satz steht bei 92 Pixeln Schriftgroesse
     * rund 950 Pixel breit und mittig, laeuft also von etwa x = 550 bis 1500.
     * Links bleiben 550 Pixel, rechts 548. Im ersten Anlauf standen die
     * Figuren bei x = 250 mit 540 Pixeln Breite und lagen mitten im Wort.
     */}
    <div
      style={{
        position: 'absolute',
        left: 60,
        top: 425,
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div style={{ width: 230, height: 173 }}>
        <Figur rig={nachleser} pose={POSEN.zeigen} />
      </div>
      <div style={{ width: 230, height: 173, marginLeft: -50 }}>
        <Figur rig={zeiger} pose={POSEN.ruhe} />
      </div>
    </div>

    <div style={{ position: 'absolute', right: 150, top: 445 }}>
      <Symbol art="lupe" groesse={210} />
    </div>

    {/* Das sichere Feld: Satz, Spruch, Zeile. */}
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1235,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        zIndex: 1,
      }}
    >
      <div
        style={{
          fontFamily: SCHRIFT.familie,
          fontStyle: 'italic',
          fontWeight: SCHRIFT.schwarz,
          fontSize: 92,
          color: FARBEN.tinte,
          lineHeight: 1.05,
          textAlign: 'center',
        }}
      >
        {BANNER_SATZ}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <div style={{ width: 108, height: 9, borderRadius: 999, backgroundColor: FARBEN.blau }} />
        <span
          style={{
            fontFamily: SCHRIFT.familie,
            fontStyle: 'italic',
            fontWeight: SCHRIFT.fett,
            fontSize: 44,
            color: FARBEN.tinteWeich,
            whiteSpace: 'nowrap',
          }}
        >
          {SPRUCH}
        </span>
      </div>

      {/*
       * Dieselbe Struktur wie die Beschriftung in der `Farbprobe`: zwei
       * gesetzte Teile, durch einen Mittelpunkt getrennt, dann ein leichter
       * Nachsatz hinter dem Gedankenstrich.
       *
       * Der Nachsatz hiess im ersten Anlauf „nichts davon ist Zufall" — und
       * stand damit woertlich zweimal im Bild, oben als Satz und hier klein.
       * „Woertlich zitiert" sagt stattdessen, was tatsaechlich passiert: Jedes
       * Zitat in `quellen.json` wird von `npm run quellen-pruefen` als
       * Zeichenkette auf der Seite gesucht.
       */}
      <div style={{ fontFamily: 'Inter', fontSize: 34, color: FARBEN.tinte }}>
        <span style={{ fontWeight: 700 }}>Ein Fakt</span>
        <span style={{ fontWeight: 400, color: FARBEN.tinteWeich }}> · </span>
        <span style={{ fontWeight: 700 }}>eine Fundstelle</span>
        <span style={{ fontWeight: 400, color: FARBEN.tinteWeich }}> — wörtlich zitiert</span>
      </div>
    </div>
  </div>
);

