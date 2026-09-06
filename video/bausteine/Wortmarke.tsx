import { interpolate, useCurrentFrame } from 'remotion';
import { FARBEN, SCHRIFT, mische } from '../../src/marke';
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
export const Wortmarke: React.FC<{
  groesse?: number;
  farbe?: string;
  /**
   * Die zweite Farbe fuer „akkurat". Ohne Angabe traegt das ganze Wort
   * `farbe` — so rendert jede Probe unveraendert weiter.
   *
   * **Zweifarbig seit dem 31.08.2026**, in den *gedaempften* Kennfarben
   * `kennVoltiTief` und `kennWattiTief`. Der erste Anlauf nahm `anzeigeEins`
   * und `anzeigeZwei` und wirkte flau: Das sind **Anzeigefarben**, aufgehellt
   * fuer den fast schwarzen Figurenkoerper. Auf hellem Grund braucht Schrift
   * die dunkle Fassung — dieselbe Trennung, die es fuer Blau seit dem
   * 24.08.2026 gibt.
   */
  farbeZwei?: string;
}> = ({
  groesse = 38,
  farbe = FARBEN.tinte,
  farbeZwei,
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
    <span style={{ fontWeight: SCHRIFT.fett, color: farbeZwei ?? farbe }}>akkurat</span>
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
/**
 * Die Formen des Zeichens, ohne eigenen SVG-Rahmen.
 *
 * **Herausgezogen, damit `Doppelzeichen` sie nicht abschreiben muss.** Zwei
 * Akkus nebeneinander brauchen ein gemeinsames SVG mit eigener `viewBox` —
 * zwei verschachtelte gingen zwar, ergaeben aber zwei Koordinatenraeume, die
 * beim ersten Umbau lautlos auseinanderlaufen. Dieselbe Ueberlegung, aus der
 * `daten/figur/zeiger.ts` vom `nachleser` ableitet, statt ihn abzuschreiben.
 */
const Zeichenformen: React.FC<{ ladung: string; pole: 1 | 2; gehaeuse: string }> = ({
  ladung,
  pole,
  gehaeuse,
}) => (
  <>
    {/*
      * Hochkant statt quer. Die erste Fassung lag waagerecht wie das
      * Batteriesymbol im Display und nutzte damit nur die halbe Hoehe des
      * Quadrats — im gerenderten Standbild las sie sich als dunkler Fleck
      * neben der Wortmarke, nicht als Akku.
      */}
    {/*
      * **Ein Pol oder zwei — seit dem 31.08.2026 die Unterscheidung der beiden
      * Figuren.** Volti traegt den einen mittigen, Watti zwei nebeneinander
      * wie ein 9-Volt-Block.
      *
      * Die Masze sind dieselben wie am Rig und gehen ohne Rest auf: Das
      * Gehaeuse ist 68 breit, zwei Pole zu je 22 ergeben mit 8 Rand aussen und
      * 8 Luecke innen genau 68. Wer die Gehaeusebreite aendert, sieht sofort,
      * dass die Rechnung nicht mehr stimmt.
      */}
    {pole === 2 ? (
      <>
        <rect x="24" y="4" width="22" height="12" rx="4" fill={gehaeuse} />
        <rect x="54" y="4" width="22" height="12" rx="4" fill={gehaeuse} />
      </>
    ) : (
      <rect x="38" y="4" width="24" height="12" rx="4" fill={gehaeuse} />
    )}
    <rect x="16" y="16" width="68" height="80" rx="14" fill={gehaeuse} />
    {/*
      * Ladung — in `anzeigeEins`, nicht im Akzent.
      *
      * Dieselbe Rechnung wie beim Ladebalken der Figur: Der Akzent ist ein
      * dunkles Marineblau und traegt auf hellem Grund; **auf dem dunklen
      * Gehaeuse hat er nur 1,7**, und der Balken verschwindet darin. Bei 40
      * Pixeln Kanalbild waere das ein schwarzer Fleck ohne Ladestand.
      */}
    <rect x="28" y="52" width="44" height="34" rx="7" fill={ladung} />
  </>
);

export const Logozeichen: React.FC<{
  groesse?: number;
  ladung?: string;
  pole?: 1 | 2;
  gehaeuse?: string;
}> = ({ groesse = 44, ladung = FARBEN.anzeigeEins, pole = 1, gehaeuse = FARBEN.tinte }) => (
  <svg width={groesse} height={groesse} viewBox="0 0 100 100" style={{ display: 'block' }}>
    <Zeichenformen ladung={ladung} pole={pole} gehaeuse={gehaeuse} />
  </svg>
);

/**
 * Die Kopfzeile auf dem Vorhang — welche Farbe wovon ablöst.
 *
 * Solange der Vorhang zu ist, steht die Kopfzeile auf Theaterrot statt auf
 * hellem Grund. **Ein Wert, der einen Hintergrund meint, wechselt mit ihm** —
 * derselbe Satz steht am Saum der Figuren und an den Kennfarben.
 *
 * Gerechnet ist gegen den **hellsten** Faltenton `#9D5555`, nicht gegen die
 * Grundfarbe. Genau dort saß der Fehler, den diese Tabelle mitbehebt: Die
 * dokumentierten 3,23 und 4,36 der Kennfarben galten der Grundfarbe; gegen den
 * hellsten Ton fallen sie auf 1,76 und 2,37 und reißen die 3,0.
 *
 * | Element | hell | Kontrast |
 * |---|---|---|
 * | Gehäuse der Akkus | `grundRein` | 5,21 |
 * | „Ganz" | `blauHell` | 4,19 |
 * | „akkurat" | `anzeigeZweiHell` | 4,49 |
 * | Zählung, Belegzeile | `flaeche` | 3,70 |
 *
 * **Nicht in der Tabelle stehen die Pillen.** Formatpille und „KI-Stimme"
 * haben eine opake helle Füllung und tragen mit 3,70 bis 12,5 unverändert —
 * eine Fläche bringt ihren eigenen Hintergrund mit.
 *
 * Die Ladungen bleiben ebenfalls: Sie liegen im Gehäuse, nicht auf dem Stoff.
 */
const AUF_VORHANG = {
  gehaeuse: FARBEN.grundRein,
  eins: FARBEN.blauHell,
  zwei: FARBEN.anzeigeZweiHell,
  leise: FARBEN.flaeche,
} as const;

/**
 * Beide Akkus nebeneinander — das Kanalzeichen seit dem 31.08.2026.
 *
 * Vorher stand oben in jedem Bild **ein** Akku, und seine Ladung war blau:
 * Voltis Kennfarbe. Das groesste Markenzeichen des Kanals gehoerte damit einer
 * der beiden Figuren. Zwei Zeichen loesen das und sagen nebenbei, worum es
 * geht — zwei, die miteinander reden.
 *
 * ## Der Versatz ist gemessen
 *
 * Das zweite Zeichen sitzt bei **78** von 100 Einheiten. Weil jedes Zeichen
 * links und rechts 16 Einheiten Rand mitbringt, stossen die Gehaeuse bei 84
 * zusammen; 78 laesst sechs Einheiten Luft zwischen ihnen.
 *
 * Am 31.08.2026 stand hier 105 — **37 Einheiten Luecke bei 68 Einheiten
 * Gehaeusebreite.** Im Standbild waren das zwei Zeichen und nicht eines. Vier
 * Abstaende standen daraufhin nebeneinander, jeder zweimal: gross und bei
 * Briefmarkengroesse, weil sich dort entscheidet, ob zwei Akkus zwei bleiben
 * oder ein Fleck werden.
 */
const DOPPEL_VERSATZ = 78;

export const Doppelzeichen: React.FC<{
  hoehe?: number;
  aufVorhang?: number;
  /**
   * Den zweiten Akku stauchen wie Watti im Video — **Gegenprobe, Standard aus.**
   *
   * Watti ist eine Knopfzelle: `scale(1.2 0.74)` um die Standlinie. Das
   * Kanalzeichen zeigt beide bisher gleich hoch und unterscheidet sie nur an
   * der Polzahl. Ob die Stauchung bei 40 Pixeln noch als Figur liest oder nur
   * schief aussieht, entscheidet `video/Zeichenprobe.tsx`.
   */
  gestaucht?: boolean;
}> = ({ hoehe = 40, aufVorhang = 0, gestaucht = false }) => {
  const breite = DOPPEL_VERSATZ + 100;
  const gehaeuse = mische(FARBEN.tinte, AUF_VORHANG.gehaeuse, aufVorhang);
  return (
    <svg
      width={(hoehe * breite) / 100}
      height={hoehe}
      viewBox={`0 0 ${breite} 100`}
      style={{ display: 'block', flex: 'none' }}
    >
      <g>
        <Zeichenformen ladung={FARBEN.anzeigeEins} pole={1} gehaeuse={gehaeuse} />
      </g>
      <g
        transform={
          gestaucht
            ? `translate(${DOPPEL_VERSATZ} 0) translate(50 100) scale(1.2 0.74) translate(-50 -100)`
            : `translate(${DOPPEL_VERSATZ} 0)`
        }
      >
        <Zeichenformen ladung={FARBEN.anzeigeZwei} pole={2} gehaeuse={gehaeuse} />
      </g>
    </svg>
  );
};

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
export const Kopfzeile: React.FC<{
  format: Format;
  zaehlung?: { nummer: number; von: number };
  /** Wie stark der Vorhang dahintersteht: 0 heller Grund, 1 Theaterrot. */
  aufVorhang?: number;
  /**
   * Die Formatpille weglassen — **nur fuer die Gegenprobe.**
   *
   * Sie traegt den Showtitel, und seit dem 02.09.2026 wird der nicht mehr
   * gesprochen. Ob er im Bild noch etwas beitraegt, entscheidet
   * `video/Pillenprobe.tsx`: Bei 26 % ist der Text nicht mehr zu lesen, die
   * Farbe schon.
   */
  ohnePille?: boolean;
}> = ({ format, zaehlung, aufVorhang = 0, ohnePille = false }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
    <Doppelzeichen hoehe={40} aufVorhang={aufVorhang} />
    <Wortmarke
      groesse={34}
      farbe={mische(FARBEN.kennVoltiTief, AUF_VORHANG.eins, aufVorhang)}
      farbeZwei={mische(FARBEN.kennWattiTief, AUF_VORHANG.zwei, aufVorhang)}
    />
{!ohnePille && (
      <span
      style={{
        fontFamily: SCHRIFT.wortmarke,
        fontWeight: SCHRIFT.halbfett,
        fontSize: 24,
        padding: '8px 18px',
        borderRadius: 999,
        letterSpacing: 0.2,
        color: FORMATE[format].farbe,
        backgroundColor: FORMATE[format].farbeHell,
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
      {FORMATE[format].show}
    </span>
    )}

    {zaehlung && (
      <span
        style={{
          // Schiebt die Zaehlung an den rechten Rand, ohne dass die Kopfzeile
          // ihre Breite kennen muss.
          marginLeft: 'auto',
          fontFamily: SCHRIFT.wortmarke,
          fontWeight: SCHRIFT.fett,
          fontSize: 26,
          color: mische(FARBEN.tinteWeich, AUF_VORHANG.leise, aufVorhang),
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
        <span
          style={{
            color: mische(FARBEN.linie, AUF_VORHANG.leise, aufVorhang),
            fontWeight: SCHRIFT.normal,
          }}
        >
          {' '}
          / {zaehlung.von}
        </span>
      </span>
    )}
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
export const Belegzeile: React.FC<{ herausgeber: string; aufVorhang?: number }> = ({
  herausgeber,
  aufVorhang = 0,
}) => {
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
      <span style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: mische(FARBEN.blau, AUF_VORHANG.eins, aufVorhang), flex: 'none' }} />
      <span
        style={{
          fontFamily: SCHRIFT.wortmarke,
          fontWeight: SCHRIFT.halbfett,
          fontSize: 26,
          color: mische(FARBEN.tinteWeich, AUF_VORHANG.leise, aufVorhang),
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
