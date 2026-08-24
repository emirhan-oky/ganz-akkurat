import { FARBEN, SCHRIFT, SPRUCH } from '../src/marke';
import { FORMATE, type Format } from '../src/typen';
import { Logozeichen, Wortmarke } from './bausteine/Wortmarke';
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
      freiBreite={SICHER_BREITE + 180}
      freiHoehe={SICHER_HOEHE + 120}
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

