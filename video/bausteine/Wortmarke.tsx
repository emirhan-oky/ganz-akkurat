import { interpolate, useCurrentFrame } from 'remotion';
import { FARBEN, SCHRIFT, SPRUCH } from '../../src/marke';
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
      fontFamily: SCHRIFT.wortmarke,
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
    {/*
      * Ladung — in `anzeigeEins`, nicht im Akzent.
      *
      * Dieselbe Rechnung wie beim Ladebalken der Figur: Der Akzent ist ein
      * dunkles Marineblau und traegt auf hellem Grund; **auf dem dunklen
      * Gehaeuse hat er nur 1,7**, und der Balken verschwindet darin. Bei 40
      * Pixeln Kanalbild waere das ein schwarzer Fleck ohne Ladestand.
      */}
    <rect x="28" y="52" width="44" height="34" rx="7" fill={FARBEN.anzeigeEins} />
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
 *
 * ## Die Zaehlung rechts aussen
 *
 * `zaehlung` steht am rechten Rand und nicht neben der Pille. Der Grund ist
 * die Aufgabe: Die Pille sagt, **welche Sorte** Video laeuft, die Zaehlung
 * sagt, **wie weit** es ist. Nebeneinander lesen sich beide als ein Etikett;
 * getrennt ist die Zahl das, was sie sein soll — ein Fortschrittsbalken aus
 * zwei Ziffern.
 *
 * Sie erscheint nur, wenn der Short zaehlt. Warum das eine Ausnahme bleiben
 * muss und keine Schablone werden darf, steht am Feld in `src/typen.ts`.
 */
export const Kopfzeile: React.FC<{ format: Format; zaehlung?: { nummer: number; von: number } }> = ({
  format,
  zaehlung,
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
    <Logozeichen groesse={40} />
    <Wortmarke groesse={34} />
    <span
      style={{
        fontFamily: SCHRIFT.wortmarke,
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

    {zaehlung && (
      <span
        style={{
          // Schiebt die Zaehlung an den rechten Rand, ohne dass die Kopfzeile
          // ihre Breite kennen muss.
          marginLeft: 'auto',
          fontFamily: SCHRIFT.wortmarke,
          fontWeight: SCHRIFT.fett,
          fontSize: 26,
          color: FARBEN.tinteWeich,
          letterSpacing: 0.4,
          whiteSpace: 'nowrap',
          /*
           * Tabellenziffern. Ohne sie sind „1" und „2" verschieden breit, und
           * die Zahl zappelt bei jedem Wechsel um ein paar Pixel — bei einem
           * Element, das sonst still steht, faellt genau das auf.
           */
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {zaehlung.nummer}
        <span style={{ color: FARBEN.linie, fontWeight: SCHRIFT.normal }}> / {zaehlung.von}</span>
      </span>
    )}
  </div>
);

/**
 * Der Spruch in der Schlussszene — an derselben Stelle wie der Beleg.
 *
 * Bis zum 18.08.2026 stand er unten im Bild, unter einem blauen Strich und
 * neben einer zweiten Wortmarke: ein **Vorhang**. Er sagte dem Zuschauer
 * optisch, dass Schluss ist — und genau das ist bei einem Short die falsche
 * Ansage, weil er von selbst wieder anlaeuft. Zwei Sekunden Abspann sind bei
 * zwanzig Sekunden Laufzeit elf Prozent, in denen nichts Neues kommt.
 *
 * Jetzt laeuft der Spruch **oben** mit, waehrend die Pointe steht. Der Platz
 * ist frei, weil die Schlussszene als einzige keinen Beleg traegt — sie
 * behauptet nichts, sie kommentiert. Und die Nachbarschaft stimmt: Wortmarke,
 * Formatpille, Beleg, Spruch sind alle vier Markenelemente.
 *
 * Die Wortmarke selbst wird dadurch nicht seltener. Sie steht in der
 * Kopfzeile, in jedem einzelnen Bild, das ganze Video lang — der Abspann hat
 * sie nur ein zweites Mal gezeigt.
 */
export const Spruchzeile: React.FC = () => {
  const frame = useCurrentFrame();
  const auf = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <span
      style={{
        fontFamily: SCHRIFT.wortmarke,
        fontWeight: SCHRIFT.halbfett,
        fontSize: 26,
        color: FARBEN.tinteWeich,
        letterSpacing: 0.2,
        whiteSpace: 'nowrap',
        opacity: auf,
        transform: `translateY(${(1 - auf) * -8}px)`,
      }}
    >
      {SPRUCH}
    </span>
  );
};

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
          fontFamily: SCHRIFT.wortmarke,
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
