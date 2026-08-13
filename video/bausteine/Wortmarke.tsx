import { FARBEN, SCHRIFT } from '../../src/marke';
import { RUBRIKEN, SYSTEME, type Rubrik, type System } from '../../src/typen';

/**
 * Die Wortmarke lebt vom Staerkekontrast: "Setup" duenn, "Klar" fett.
 * Das ist das eigentliche Erkennungsmerkmal der Marke und wird deshalb
 * nirgends anders gesetzt als hier.
 */
export const Wortmarke: React.FC<{ groesse?: number; farbe?: string }> = ({
  groesse = 38,
  farbe = FARBEN.tinte,
}) => (
  <span
    style={{
      fontFamily: SCHRIFT.familie,
      fontSize: groesse,
      color: farbe,
      letterSpacing: -0.5,
      whiteSpace: 'nowrap',
      lineHeight: 1,
    }}
  >
    <span style={{ fontWeight: SCHRIFT.duenn }}>Setup</span>
    <span style={{ fontWeight: SCHRIFT.fett }}>Klar</span>
  </span>
);

/**
 * Das Logozeichen: dunkles Rechteck mit blauem Winkel, abstrahiert aus dem
 * Bildlogo. Als Vektor nachgebaut, damit es in jeder Groesse scharf bleibt
 * und keine PNG-Datei in den Renderprozess muss.
 */
export const Logozeichen: React.FC<{ groesse?: number }> = ({ groesse = 44 }) => (
  <svg width={groesse} height={groesse} viewBox="0 0 100 100" style={{ display: 'block' }}>
    <rect x="4" y="10" width="34" height="80" rx="11" fill={FARBEN.tinte} />
    <path d="M46 12 L84 12 L52 52 L46 52 Z" fill={FARBEN.blau} />
    <path d="M52 56 L62 56 L92 90 L52 90 Z" fill={FARBEN.tinte} />
  </svg>
);

/**
 * Kopfzeile: Logozeichen, Wortmarke und die Rubrik des Shorts.
 *
 * Die Rubrik steht bewusst ohne "Klar"-Endung neben der Wortmarke: sonst
 * liest die Zeile "SetupKlar SchreibtischKlar". Dass die Pille wie ein
 * Sendeplatz wirkt, ist seit der Umstellung auf feste Rubriken gewollt —
 * der Zuschauer soll den Wochentag daran wiedererkennen.
 */
export const Kopfzeile: React.FC<{ rubrik: Rubrik; system: System }> = ({ rubrik, system }) => {
  const pille = {
    fontFamily: SCHRIFT.familie,
    fontWeight: SCHRIFT.halbfett,
    fontSize: 24,
    padding: '8px 18px',
    borderRadius: 999,
    letterSpacing: 0.2,
  } as const;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <Logozeichen groesse={40} />
      <Wortmarke groesse={34} />
      <span style={{ ...pille, color: FARBEN.blau, backgroundColor: FARBEN.blauHell }}>
        {RUBRIKEN[rubrik].titel}
      </span>

      {/*
       * Die Systemangabe erscheint nur bei echter Systemspezifik.
       *
       * `beide` und `ohne` bleiben absichtlich unsichtbar: „gilt fuer beide"
       * ist im Bild keine Information, sondern Rauschen — und `ohne` heisst,
       * dass es gar keinen Systembezug gibt. Sichtbar wird die Angabe nur,
       * wenn sie den Zuschauer aussortiert oder einschliesst.
       *
       * Dunkel statt blau gesetzt, damit die Rubrik die Leitfarbe behaelt.
       * Zwei blaue Pillen nebeneinander lesen sich als eine.
       */}
      {SYSTEME[system].imTitel && (
        <span style={{ ...pille, color: FARBEN.grundRein, backgroundColor: FARBEN.tinte }}>
          {SYSTEME[system].titel}
        </span>
      )}
    </div>
  );
};
