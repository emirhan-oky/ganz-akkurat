import { interpolate, useCurrentFrame } from 'remotion';
import { FARBEN, SCHRIFT } from '../../src/marke';
import { FORMATE, type Format } from '../../src/typen';

/**
 * Die Wortmarke lebt vom Staerkekontrast: „Ganz" duenn, „akkurat" fett.
 *
 * Hiess bis zum 16.08.2026 „SetupKlar". Der Name war selbst ein
 * Hilfe-Versprechen — wer ihn liest, erwartet Unterstuetzung beim Einrichten,
 * nicht Tech-Maerchen und Wut auf die Industrie. „Akkurat" traegt drei
 * Bedeutungen auf einmal: den **Akku** vorn, die **Genauigkeit** als Haltung
 * und den **Rat** hinten. Das Bauprinzip der Marke bleibt unveraendert, nur
 * der Text darin ist ausgetauscht.
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
    <span style={{ fontWeight: SCHRIFT.duenn }}>Ganz&#8202;</span>
    <span style={{ fontWeight: SCHRIFT.fett }}>akkurat</span>
  </span>
);

/**
 * Das Logozeichen: ein Akku, flaechig, mit blauer Ladung.
 *
 * Das alte Zeichen war ein abstrahiertes „K" fuer „Klar" — ein Buchstabe aus
 * einem Namen, den es nicht mehr gibt. Der Akku steckt dagegen im neuen Namen
 * selbst und ist das bekannteste Symbol, das dieser Kanal haben kann: Jeder
 * hat es oben rechts auf dem Display.
 *
 * Farben, Rundungen und die flaechige Machart sind unveraendert aus dem alten
 * Zeichen uebernommen — gewechselt hat die Form, nicht der Stil. Als Vektor
 * gebaut, damit es in jeder Groesse scharf bleibt und keine PNG-Datei in den
 * Renderprozess muss.
 */
export const Logozeichen: React.FC<{ groesse?: number }> = ({ groesse = 44 }) => (
  <svg width={groesse} height={groesse} viewBox="0 0 100 100" style={{ display: 'block' }}>
    {/*
      * Hochkant statt quer. Die erste Fassung lag waagerecht wie das
      * Batteriesymbol im Display und nutzte damit nur die halbe Hoehe des
      * Quadrats — im gerenderten Standbild las sie sich als dunkler Fleck
      * neben der Wortmarke, nicht als Akku. Aufrecht fuellt das Zeichen
      * seinen Platz und bleibt bei 40 Pixeln erkennbar.
      */}
    {/* Pluspol */}
    <rect x="38" y="4" width="24" height="12" rx="4" fill={FARBEN.tinte} />
    {/* Gehaeuse */}
    <rect x="16" y="16" width="68" height="80" rx="14" fill={FARBEN.tinte} />
    {/* Ladung — der einzige blaue Fleck, wie beim Winkel zuvor */}
    <rect x="28" y="52" width="44" height="34" rx="7" fill={FARBEN.blau} />
  </svg>
);

/**
 * Kopfzeile: Logozeichen, Wortmarke und das Format des Shorts.
 *
 * Die Formatpille traegt die Wiedererkennung, und seit dem 16.08.2026 traegt
 * sie sie **allein**: Der gesprochene Opener variiert bewusst von Video zu
 * Video, weil derselbe Einstieg siebenmal die Woche nach Schablone klingt.
 * Damit muss das Bild leisten, was der Text nicht mehr leistet — der
 * Zuschauer sieht ab Sekunde null „Tech-Märchen" und weiss, welche Sorte
 * Video laeuft.
 *
 * Das war lange die offene Frage: eine eingeblendete Rubrik sieht nach
 * Fernsehen aus statt nach Feed. Mit variablem Opener ist sie entschieden.
 */
export const Kopfzeile: React.FC<{ format: Format }> = ({ format }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
    <Logozeichen groesse={40} />
    <Wortmarke groesse={34} />
    <span
      style={{
        fontFamily: SCHRIFT.familie,
        fontWeight: SCHRIFT.halbfett,
        fontSize: 24,
        padding: '8px 18px',
        borderRadius: 999,
        letterSpacing: 0.2,
        color: FARBEN.blau,
        backgroundColor: FARBEN.blauHell,
        /*
         * Nie umbrechen. „Hallo 21. Jahrhundert" brach auf zwei Zeilen und zog
         * die ganze Kopfzeile in die Hoehe — die Pille sah damit aus wie ein
         * Kasten, nicht wie ein Sendeplatz. Die Kurznamen in
         * `FORMATE[...].pille` sind auf eine Zeile hin geschnitten; das hier
         * ist die Absicherung. Der laengste liegt bei 17 Zeichen
         * („Das ist Absicht"), die gemessene Bruchgrenze bei 21.
         */
        whiteSpace: 'nowrap',
      }}
    >
      {FORMATE[format].pille}
    </span>
  </div>
);

/**
 * Der Beleg im Bild — die Zeile, die den ganzen Kanal rechtfertigt.
 *
 * Bis zum 17.08.2026 war das eine **eigene Szene** auf Position 4 des Baus:
 * zweieinhalb Sekunden Standbild mit einem Behoerdennamen, und zwar genau
 * dort, wo die Pointe hingehoert. Das war der teuerste Platz im Video fuer
 * etwas, das niemanden unterhaelt.
 *
 * Jetzt laeuft der Beleg **unter** der Kopfzeile mit, waehrend die tragende
 * Behauptung gesprochen wird. Zwei Gruende fuer oben statt unten:
 *
 * 1. Unten sitzt der Untertitel in seiner 270-Pixel-Zone, und darunter beginnt
 *    TikToks Bedienleiste. Es ist schlicht kein Platz.
 * 2. Oben steht der Beleg bei Wortmarke und Formatpille — und das ist die
 *    richtige Nachbarschaft. Er ist ein Markenelement, kein Inhalt.
 *
 * Das Einblenden ist bewusst schnell (sechs Bilder) und das Ausblenden gibt es
 * nicht: Die Zeile verschwindet mit ihrer Szene. Ein Element, das sich
 * hereinschiebt und wieder hinaus, zieht mehr Aufmerksamkeit als der Satz, den
 * es belegt.
 */
export const Belegzeile: React.FC<{ herausgeber: string }> = ({ herausgeber }) => {
  const frame = useCurrentFrame();
  const auf = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        opacity: auf,
        transform: `translateY(${(1 - auf) * -8}px)`,
      }}
    >
      {/* Der blaue Punkt ersetzt das Wort „Quelle" — er kostet keine Zeile. */}
      <span style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: FARBEN.blau, flex: 'none' }} />
      <span
        style={{
          fontFamily: SCHRIFT.familie,
          fontWeight: SCHRIFT.halbfett,
          fontSize: 26,
          color: FARBEN.tinteWeich,
          letterSpacing: 0.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {herausgeber}
      </span>
    </div>
  );
};
