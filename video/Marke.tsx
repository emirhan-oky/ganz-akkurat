import { FARBEN, SCHRIFT, SPRUCH } from '../src/marke';
import { FORMATE, type Format } from '../src/typen';
import { Logozeichen, Wortmarke } from './bausteine/Wortmarke';
import { Muster, SpruchGross } from './bausteine/Muster';

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
 * Banner, Variante Muster — 2048x1152.
 *
 * Die Fassung nach dem Vorbild des alten Banners: dichtes Isometriemuster aus
 * Linien und Dreiecken, in der Mitte eine Luecke, darin der Spruch.
 *
 * Der Spruch traegt allein, ohne Logo. Er kann das, weil er im selben
 * Staerkekontrast gesetzt ist wie die Wortmarke — „Wir haben" duenn,
 * „nachgelesen." fett. Wer „Ganz akkurat" schon einmal gesehen hat, erkennt
 * die Machart wieder, auch wenn der Name nicht dasteht.
 *
 * Und inhaltlich ist es die richtige Reihenfolge: Der Name sagt, wie der Kanal
 * heisst; der Spruch sagt, warum es ihn gibt.
 */
export const BannerMuster: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: FARBEN.grund,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Muster
      breite={2048}
      hoehe={1152}
      freiBreite={SICHER_BREITE}
      freiHoehe={SICHER_HOEHE}
      linie={FARBEN.linie}
      dunkel={FARBEN.tinte}
      akzent={FARBEN.blau}
    />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <SpruchGross
        groesse={104}
        farbe={FARBEN.tinte}
        duenn={SCHRIFT.duenn}
        fett={SCHRIFT.fett}
        familie={SCHRIFT.familie}
        akzent={FARBEN.blau}
      />
    </div>
  </div>
);

