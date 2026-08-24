import { FARBEN } from '../../src/marke';
import type { KontextArt } from '../../src/typen';

/**
 * Geraete als Strichzeichnung im Bannerstil der Marke.
 *
 * Bewusst als Vektor nachgebaut statt als Foto oder Herstellerbild: Damit
 * entsteht kein Lizenz- oder Markenrechtsproblem, das Aussehen bleibt ueber
 * alle Videos identisch, und die Zeichnungen skalieren verlustfrei.
 *
 * Alle Icons teilen sich dieselbe Zeichenflaeche (200x150) und dieselben
 * Strichstaerken, damit sie in einer Kette optisch gleich gross wirken.
 */

/*
 * Der Typ kommt aus dem Datenvertrag, nicht aus dieser Datei. Vorher stand er
 * an beiden Stellen — eine Zeichnung ohne Eintrag im Schema oder ein
 * Schema-Wert ohne Zeichnung waere nicht aufgefallen, bis Remotion beim
 * Rendern nichts zu zeichnen findet.
 */
export type { KontextArt } from '../../src/typen';

/*
 * ## Warum `tinteWeich` und nicht `linie`
 *
 * Bis zum 23.08.2026 zeichneten die Symbole in `linie` (#9EA6AF) mit Staerke 4.
 * Das war richtig, solange sie allein unter einem Satz standen und
 * zuruecktreten sollten. Seit die Figur danebensteht, stimmt es nicht mehr:
 * Sie ist eine Flaeche in `tinte` (#111820), und daneben liest sich eine
 * hellgraue Kontur als Hintergrund statt als zweiter Gegenstand. Im geteilten
 * Bild fiel es am deutlichsten auf — zwei blasse Zeichnungen unter fetter
 * Typografie.
 *
 * `tinteWeich` (#5E6877) war der Mittelweg: deutlich dunkler als vorher und
 * trotzdem leichter als die Figur, damit die Rangfolge im Bild bleibt.
 *
 * **Seit dem 25.08.2026 steht hier `symbolLinie` (#3D4655).** Die Farbprobe
 * zeigte die Lupe auf allen acht Hintergrundkandidaten blass — das lag nicht
 * am Grund, sondern an der Strichstaerke: Fuenf Einheiten auf einer 200er
 * Flaeche sind im Video rund neun Pixel, und bei so duennen Linien traegt ein
 * Kontrast von 4,9 nicht. Die Rangfolge bleibt trotzdem: Die Figur ist eine
 * geschlossene Flaeche in `tinte`, das Symbol eine Kontur.
 *
 * Die Markenfarbe `linie` selbst bleibt unangetastet — sie faerbt auch das
 * isometrische Hintergrundgitter in `Muster.tsx`, und das soll blass bleiben.
 */
const strich = {
  fill: 'none',
  stroke: FARBEN.symbolLinie,
  strokeWidth: 5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/**
 * Detaillinien innerhalb einer Zeichnung — Fensterreihe, Kreuz in der Lupe,
 * Fugen. Leichter als die Kontur, damit die Form vorne bleibt.
 *
 * **Nicht `linie`, seit dem 25.08.2026.** Das ist die Farbe des
 * Hintergrundgitters und damit dafuer gebaut, kaum sichtbar zu sein. In der
 * Farbprobe wirkte die Lupe deshalb auf jedem der acht Gruende blass — die
 * Kontur war laengst dunkler, aber das Kreuz darin blieb ein Gitterstrich.
 */
const fein = { ...strich, stroke: FARBEN.tinteWeich, strokeWidth: 3.5 };
const koerper = {
  fill: FARBEN.grundRein,
  stroke: FARBEN.symbolLinie,
  strokeWidth: 5,
  strokeLinejoin: 'round' as const,
};

/*
 * Hier standen bis zum 17.08.2026 neun **Geraetezeichnungen** — Notebook,
 * Dock, Monitor, Kabel, Netzteil, Telefon, Powerbank, Adapter, Router — und
 * daneben die Regel, dass jede dem Datenblatt entsprechen muss.
 *
 * Sie sind mit der Kaufberatung gegangen. Das neue Material hat meistens
 * keinen Gegenstand: „Licht braucht siebenundsechzig Millisekunden um die
 * Erde" ist kein Bild, das man zeichnet, sondern eine Zahl, die man setzt.
 * Von 45 Themen im Vorrat haben vielleicht zwoelf ein Objekt, das selbst der
 * Witz ist — und die kommen mit Situationssymbolen aus.
 *
 * Der Verlust ist keiner: Eine falsch gezeichnete Buchse waere eine unbelegte
 * technische Behauptung an einer Stelle, die niemand prueft. Wer nichts
 * Technisches zeichnet, kann darin nichts Falsches behaupten.
 */

/**
 * Symbole fuer die Situation, nicht fuer die Technik.
 *
 * Sie stehen dort, wo es kein Geraet zu zeigen gibt — beim Rechtsthema, beim
 * Flug, an der fremden Steckdose. Derselbe Stil und dieselbe Zeichenflaeche,
 * aber ein anderer Anspruch: Ein Geraet muss dem Datenblatt entsprechen, ein
 * Symbol behauptet nichts, das falsch sein koennte. Ausfuehrlich begruendet
 * bei `KontextArt` in `src/typen.ts`.
 */
/**
 * Die Zeichnungen selbst, ohne Rahmen und ohne Standflaeche.
 *
 * Exportiert, seit es die Buehne gibt: Sie setzt ein Symbol **neben** die
 * Figur, und beide teilen sich eine Zeichenflaeche. Ueber `Symbol` ginge das
 * nicht — die Komponente bringt ihr eigenes `<svg>` samt Breite, Hoehe und
 * Standflaeche mit. Verschachtelt ergab das im Standbild eine zweite,
 * schwebende Ellipse neben der Figur.
 *
 * Wer eine Zeichnung allein braucht, nimmt weiterhin `Symbol`.
 */
export const Symbole: Record<KontextArt, React.ReactNode> = {
  /*
   * Seitenansicht, Nase nach rechts — aus vier klaren Formen statt einer
   * durchgehenden Kontur. Ein erster Versuch zeichnete die ganze Silhouette
   * als einen Pfad; sie war als Flugzeug zu erkennen, aber Nase und Heck
   * gerieten eckig. Vier Teile lassen sich einzeln sauber setzen.
   */
  flugzeug: (
    <>
      {/* Rumpf */}
      <path {...koerper} d="M40 66h100c17 0 28 7 28 15s-11 15-28 15H40c-13 0-22-7-22-15s9-15 22-15Z" />
      {/* Leitwerk */}
      <path {...koerper} d="M42 66 32 32h17l21 34Z" />
      {/* Tragflaeche, nach hinten unten gezogen */}
      <path {...koerper} d="M94 96 68 128h21l26-32Z" />
      {/* Fensterreihe */}
      <path {...fein} d="M62 81h58" />
    </>
  ),
  koffer: (
    <>
      <rect {...koerper} x="52" y="46" width="96" height="74" rx="10" />
      <path {...strich} d="M82 46V30h36v16" />
      <path {...fein} d="M74 62v42M126 62v42" />
      <circle {...fein} cx="72" cy="128" r="7" />
      <circle {...fein} cx="128" cy="128" r="7" />
    </>
  ),
  /* Gesetzbuch statt Richterhammer — die Begruendung steht bei `KontextArt`. */
  gesetzbuch: (
    <>
      {/* Deckel */}
      <rect {...koerper} x="46" y="26" width="110" height="96" rx="8" />
      {/* Ruecken links, Seitenschnitt rechts */}
      <path {...strich} d="M66 26v96" />
      <path {...fein} d="M146 44v60" />
      <text
        x="108"
        y="90"
        textAnchor="middle"
        fontSize="52"
        fontWeight="800"
        fontFamily="Inter, system-ui, sans-serif"
        fill={FARBEN.linie}
      >
        §
      </text>
    </>
  ),
  /* Der Bon traegt das Kaufdatum — den Tag, an dem die Fristen zu laufen beginnen. */
  kassenbon: (
    <>
      <path {...koerper} d="M62 24h76v102l-9.5-8-9.5 8-9.5-8-9.5 8-9.5-8-9.5 8-9.5-8-9.5 8Z" />
      <path {...fein} d="M78 50h44M78 68h44M78 86h28" />
    </>
  ),
  /*
   * Wandplatte mit rundem Einsatz, nicht nur der Kreis.
   *
   * Die erste Fassung war ein Kreis mit zwei runden Loechern und zwei
   * durchgehenden Querstrichen — und sah im gerenderten Bild aus wie ein
   * Gesicht mit zwei Augen und einem Strichmund. An einem Kanal, der ernst
   * erklaert, ist das kein kleiner Schoenheitsfehler: Das Auge sieht das
   * Gesicht zuerst und die Steckdose gar nicht.
   *
   * Die Platte drumherum nimmt dem Kreis die Gesichtswirkung, und die
   * Schutzkontakte sitzen jetzt als kurze Marken am Rand statt als Striche
   * quer durchs Bild.
   */
  steckdose: (
    <>
      <rect {...koerper} x="36" y="18" width="128" height="114" rx="16" />
      <circle {...fein} cx="100" cy="75" r="42" />
      {/*
       * Die Schutzkontakte tragen die Zeichnung, nicht die Loecher.
       *
       * Zweiter Anlauf am 16.08.2026: Die Buegel standen als duenne Striche
       * dicht am Kreisrand und verschwanden im gerenderten Bild — uebrig
       * blieben ein Kreis und zwei Punkte, also weiter ein Gesicht. Jetzt
       * liegen sie als kraeftige Klammern **auf** dem Kreis und schneiden ihn
       * oben und unten an. Das ist die Form, die eine Schuko-Dose von einem
       * Smiley unterscheidet, und sie haelt bei 200 Pixeln Kantenlaenge.
       */}
      <path {...koerper} d="M78 33h44v9H78z" />
      <path {...koerper} d="M78 108h44v9H78z" />
      <circle {...koerper} cx="83" cy="75" r="8" />
      <circle {...koerper} cx="117" cy="75" r="8" />
    </>
  ),
  /*
   * Zwei Haeuser, nicht eines: Beim WLAN-Thema ist der Taeter die Nachbarschaft
   * — „die halbe Strasse sitzt auf demselben Kanal". Ein einzelnes Haus zeigte
   * die Wohnung und damit die falsche Haelfte der Aussage.
   *
   * Die beleuchteten Fenster sind der Abend. Sie stehen nicht vollstaendig:
   * Ein Raster aus lauter gleichen Quadraten sah nach Tabelle aus, ein paar
   * dunkle Fenster machen daraus ein Haus.
   */
  nachbarhaeuser: (
    <>
      {/*
       * Satteldaecher und quadratische Fenster. Ein erster Versuch waren zwei
       * abgerundete Rechtecke mit Strichen darin — die lasen sich als zwei
       * Karten oder zwei Geraete, nicht als Haeuser. Was ein Haus zum Haus
       * macht, ist das Dach; was ein Fenster zum Fenster macht, ist die
       * Flaeche und nicht der Strich.
       */}
      {/* Hinteres Haus, hoeher und nach rechts versetzt */}
      <path {...koerper} d="M110 62h58v62h-58z" />
      <path {...koerper} d="m106 62 33-26 33 26z" />
      <rect {...fein} x="122" y="76" width="15" height="15" rx="2" />
      <rect {...fein} x="145" y="76" width="15" height="15" rx="2" />
      <rect {...fein} x="122" y="100" width="15" height="15" rx="2" />
      {/* Vorderes Haus */}
      <path {...koerper} d="M38 78h60v46H38z" />
      <path {...koerper} d="m34 78 34-25 34 25z" />
      <rect {...fein} x="50" y="92" width="15" height="15" rx="2" />
      <rect {...fein} x="72" y="92" width="15" height="15" rx="2" />
    </>
  ),
  /*
   * Zifferblatt fuer die Tageszeit, nicht fuer eine Dauer. Die Zeiger stehen
   * bewusst auf acht — die Uhrzeit, an der im WLAN-Short das Band vollaeuft.
   * Eine Sanduhr waere die Dauer gewesen und damit das falsche Bild.
   */
  uhr: (
    <>
      <circle {...koerper} cx="100" cy="75" r="50" />
      <path {...fein} d="M100 33v6M142 75h-6M100 117v-6M58 75h6" />
      {/* Grosser Zeiger auf 12, kleiner auf 8 */}
      <path {...strich} d="M100 75V42" />
      <path {...strich} d="m100 75-20 12" />
      <circle cx="100" cy="75" r="5" fill={FARBEN.linie} />
    </>
  ),
  /*
   * Fuer Fristen: die zwei Jahre Gewaehrleistung, das erste Jahr mit der
   * Beweislast beim Verkaeufer. Ein Kalenderblatt sagt „ab wann und wie
   * lange", was der Kassenbon allein nicht sagt — der nennt nur den Tag null.
   */
  /*
   * Die Kopfleiste ist **gefuellt**, nicht nur eine Linie. In Szenen mit viel
   * Text schrumpft die Zeichnung auf ihre Behaelterhoehe, und die erste
   * Fassung — Umriss, duenne Leiste, ein paar Striche — war dann keine
   * Kalenderform mehr, sondern eine Karte mit Streifen. Eine gefuellte Flaeche
   * traegt auch klein.
   */
  kalender: (
    <>
      {/* Die zwei Ringe, hinter dem Blatt beginnend */}
      <path {...strich} d="M72 40V22M128 40V22" />
      <rect {...koerper} x="40" y="34" width="120" height="94" rx="10" />
      {/* Gefuellte Kopfleiste */}
      <path fill={FARBEN.linie} d="M40 44a10 10 0 0 1 10-10h100a10 10 0 0 1 10 10v22H40Z" />
      {/* Tagesraster: drei Spalten, zwei Zeilen — angedeutet, nicht ausgezaehlt */}
      <path {...fein} d="M62 84h18M91 84h18M120 84h18M62 108h18M91 108h18" />
    </>
  ),
  /*
   * Mikrofon — der Freitag.
   *
   * Kapsel, Buegel, Fuss. Bewusst die Bauform, die jeder aus dem Studio kennt,
   * und nicht das Loch in einer Fernseherblende: Gezeigt wird, **dass**
   * mitgehoert wird, nicht womit. Ein gezeichnetes Geraetemikrofon waere
   * wieder eine Behauptung ueber ein Datenblatt.
   */
  mikrofon: (
    <>
      <rect {...koerper} x="82" y="18" width="36" height="62" rx="18" />
      <path {...fein} d="M90 40h20M90 52h20" />
      <path {...strich} d="M64 68a36 36 0 0 0 72 0" />
      <path {...strich} d="M100 104v22M80 126h40" />
    </>
  ),
  /*
   * Regal — der Samstag.
   *
   * Das Bild steht woertlich im Sprechtext: „Dein Rechner hat die Seite aus
   * dem Register gerissen. Das Regal steht noch." Eine Zeichnung, die einen
   * gesprochenen Vergleich aufnimmt, erklaert nichts doppelt — sie haelt ihn
   * fest, waehrend die Stimme weiterlaeuft.
   *
   * Ein Fach bleibt leer. Das ist der Witz: Der Platz ist freigegeben, aber
   * noch liegt nichts Neues darin.
   */
  regal: (
    <>
      <rect {...koerper} x="34" y="26" width="132" height="104" rx="8" />
      <path {...strich} d="M34 78h132" />
      <rect fill={FARBEN.linie} stroke="none" x="46" y="38" width="14" height="34" rx="3" />
      <rect fill={FARBEN.linie} stroke="none" x="66" y="42" width="14" height="30" rx="3" />
      <rect fill={FARBEN.linie} stroke="none" x="86" y="36" width="14" height="36" rx="3" />
      <rect fill={FARBEN.linie} stroke="none" x="46" y="92" width="14" height="30" rx="3" />
      <rect fill={FARBEN.linie} stroke="none" x="66" y="88" width="14" height="34" rx="3" />
    </>
  ),
  /*
   * Thermometer — der Dienstag.
   *
   * Der Schuldige des Akku-Shorts ist die Waerme und nicht der Ladestand, und
   * genau das ist die Wendung. Die Kugel ist der einzige blaue Fleck der
   * Zeichnung — dieselbe Sparsamkeit wie beim Logo.
   */
  thermometer: (
    <>
      <path {...koerper} d="M86 34a14 14 0 0 1 28 0v54a26 26 0 1 1-28 0Z" />
      <circle fill={FARBEN.blau} stroke="none" cx="100" cy="104" r="15" />
      <path {...fein} d="M118 48h14M118 62h10M118 76h14" />
    </>
  ),
  /*
   * Anhaenger — der Mittwochabend.
   *
   * Das Kabelthema handelt vom **fehlenden Aufdruck**, nicht vom Kabel. Also
   * wird das Etikett gezeichnet und nicht der Stecker: ein Schild mit Loch und
   * zwei Zeilen, die nichts sagen. Das ist der Unterschied zwischen einem
   * Situationssymbol und einer Geraetezeichnung, an einem Fall, an dem er
   * knapp wird.
   */
  anhaenger: (
    <>
      <path {...koerper} d="M104 26h56v98h-56L44 75Z" />
      <circle {...fein} cx="86" cy="75" r="9" />
      <path {...fein} d="M112 58h34M112 92h22" />
    </>
  ),
  /*
   * Schraubenschluessel — das Zeichen fuer Reparatur.
   *
   * Ein Maulschluessel, kein Schraubendreher: Der Schraubendreher oeffnet ein
   * Geraet und ist damit fast schon eine Handlungsaufforderung. Der
   * Maulschluessel ist das allgemeine Reparaturzeichen, wie es auf jedem
   * Werkstattschild steht.
   */
  schraubenschluessel: (
    <>
      <path
        {...koerper}
        d="M126 26a30 30 0 0 0-28 40L60 104a14 14 0 0 0 0 20 14 14 0 0 0 20 0l38-38a30 30 0 0 0 34-46l-18 18-16-4-4-16Z"
      />
    </>
  ),
  /*
   * Lupe — nachsehen, was wirklich dasteht.
   *
   * Das Zeichen des Kanals, wenn man eines suchen muesste: „Wir haben
   * nachgelesen." Steht dort, wo das Video eine Stelle im Kleingedruckten
   * aufschlaegt.
   */
  lupe: (
    <>
      <circle {...koerper} cx="88" cy="66" r="38" />
      <path {...fein} d="M74 66h28M88 52v28" />
      <path {...strich} d="M116 94l26 30" />
    </>
  ),
  /*
   * Karton — der Kauf.
   *
   * Nicht das Geraet, sondern die Schachtel, in der es kam. Damit laesst sich
   * ueber Kaeufe reden, ohne ein Produkt zu zeichnen: Der Karton hat keine
   * Buchsen, die falsch sein koennten.
   */
  karton: (
    <>
      <path {...koerper} d="M42 58h116v68H42Z" />
      <path {...koerper} d="M42 58l16-24h84l16 24Z" />
      <path {...fein} d="M100 34v24M84 82h32" />
    </>
  ),
  /* Die zwoelf Sterne im Kreis — die EU, ohne Flagge und ohne Text. */
  europa: (
    <>
      {Array.from({ length: 12 }, (_, i) => {
        const w = (i / 12) * Math.PI * 2 - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={100 + Math.cos(w) * 46}
            cy={74 + Math.sin(w) * 46}
            r={7}
            fill={FARBEN.blau}
          />
        );
      })}
    </>
  ),
  /*
   * Waagerecht und offen — bewusst **anders als das Logo**.
   *
   * Das Logozeichen ist ein aufrechter, flaechiger Akku. Eine zweite Batterie
   * in derselben Haltung im selben Bild waere eine Dopplung der Wortmarke.
   * Diese hier liegt, ist umrissen statt gefuellt und zeigt einen Teilstand.
   */
  batterie: (
    <>
      <rect {...koerper} x="38" y="46" width="112" height="58" rx="10" />
      <rect fill={FARBEN.linie} stroke="none" x="152" y="64" width="12" height="22" rx="4" />
      <rect fill={FARBEN.linie} stroke="none" x="52" y="60" width="26" height="30" rx="4" />
    </>
  ),
  /* Notizzettel — das Gedaechtnis, um das es beim Memory-Effekt geht. */
  zettel: (
    <>
      <path {...koerper} d="M58 24h60l26 26v76H58Z" />
      <path {...fein} d="M118 24v26h26" />
      <path {...fein} d="M76 70h48M76 88h48M76 106h30" />
    </>
  ),
  /* Warndreieck — schadet, nicht bloss nutzlos. */
  warndreieck: (
    <>
      <path {...koerper} d="M100 22l60 104H40Z" />
      <path {...strich} d="M100 62v32" />
      <circle fill={FARBEN.linie} stroke="none" cx="100" cy="110" r="6" />
    </>
  ),
  /* Waage — zwei Dinge, die gleich aussehen. */
  waage: (
    <>
      <path {...koerper} d="M28 54a18 18 0 0 0 36 0Z" />
      <path {...koerper} d="M136 54a18 18 0 0 0 36 0Z" />
      <path {...strich} d="M100 26v92M74 122h52M46 50h108" />
      <path {...fein} d="M46 50v6M154 50v6" />
    </>
  ),
  /* Stempel — jemand hat es festgelegt. */
  stempel: (
    <>
      <rect {...koerper} x="38" y="104" width="124" height="22" rx="7" />
      <path {...koerper} d="M62 104l12-32h52l12 32Z" />
      <rect {...koerper} x="86" y="28" width="28" height="46" rx="12" />
    </>
  ),
  /* Sprechblase — jemand hat etwas gesagt, mehr behauptet sie nicht. */
  sprechblase: (
    <>
      <path {...koerper} d="M72 98h36l-32 28Z" />
      <rect {...koerper} x="32" y="26" width="136" height="76" rx="16" />
      <path {...fein} d="M56 54h88M56 76h56" />
    </>
  ),
  /* Haken — das hattest du schon. */
  haken: (
    <>
      <circle {...koerper} cx="100" cy="74" r="52" />
      <path {...strich} stroke={FARBEN.blau} strokeWidth={7} d="M74 76l18 20 34-42" />
    </>
  ),
  /* Sofa — das Wohnzimmer als Situation, statt eines Fernsehers als Geraet. */
  sofa: (
    <>
      <path {...koerper} d="M58 40h84v50H58Z" />
      <path {...koerper} d="M34 74a12 12 0 0 1 24 0v22H34Z" />
      <path {...koerper} d="M142 74a12 12 0 0 1 24 0v22h-24Z" />
      <rect {...koerper} x="34" y="88" width="132" height="26" rx="8" />
      <path {...strich} d="M52 114v12M148 114v12" />
    </>
  ),
  /* Fabrik — ab Werk. */
  fabrik: (
    <>
      <rect {...koerper} x="44" y="28" width="22" height="54" rx="4" />
      <path {...koerper} d="M44 82h112v42H44Z" />
      <path {...fein} d="M76 82l24-20v20M116 82l24-20v20" />
    </>
  ),
  /* Schallwellen — es wird aufgezeichnet, ohne ein Aufnahmegeraet zu zeigen. */
  schallwellen: (
    <>
      <path {...koerper} d="M44 60h22l26-24v80l-26-24H44Z" />
      <path {...strich} d="M116 54a30 30 0 0 1 0 44" />
      <path {...strich} d="M136 38a54 54 0 0 1 0 76" />
    </>
  ),
  /* Wolke — es verlaesst das Geraet. */
  wolke: (
    <>
      <path
        {...koerper}
        d="M68 122a28 28 0 0 1 2-56 36 36 0 0 1 68 6 24 24 0 0 1-6 50Z"
      />
    </>
  ),
  /* Papierkorb — der Klick, der nichts loescht. */
  papierkorb: (
    <>
      <path {...koerper} d="M84 30h32v14H84Z" />
      <path {...strich} d="M56 46h88" />
      <path {...koerper} d="M66 52h68l-7 74H73Z" />
      <path {...fein} d="M88 70v42M112 70v42" />
    </>
  ),
  /* Karteikarte — der Verweis im Register, nicht die Sache selbst. */
  karteikarte: (
    <>
      <rect {...koerper} x="38" y="36" width="124" height="88" rx="8" />
      <path fill={FARBEN.linie} stroke="none" d="M38 44a8 8 0 0 1 8-8h34v20H38Z" />
      <path {...fein} d="M60 80h80M60 100h52" />
    </>
  ),
  /* Ordner — die Datei, die weiter da liegt. */
  ordner: (
    <>
      <path {...koerper} d="M34 40h46l14 16h72v70H34Z" />
      <path {...fein} d="M60 88h80" />
    </>
  ),
  /*
   * Satellit — der Weltraum als Ort, an dem Technik arbeitet.
   *
   * Der Mond daneben taugt fuer „abends", nicht fuer Raumfahrt: Er zeigt den
   * Himmel, aber niemanden, der dort etwas gebaut hat. Zwei Paneele, ein
   * Rumpf, eine Schuessel — das ist die Silhouette, die auch bei 40 Pixeln
   * noch als Satellit gelesen wird.
   */
  satellit: (
    <>
      <rect {...koerper} x="86" y="56" width="28" height="40" rx="5" />
      <rect {...koerper} x="26" y="62" width="50" height="28" rx="3" />
      <rect {...koerper} x="124" y="62" width="50" height="28" rx="3" />
      <path {...fein} d="M43 62v28M60 62v28M141 62v28M158 62v28" />
      <path {...strich} d="M76 76h10M114 76h10" />
      <path {...strich} d="M100 56V42" />
      <path {...strich} stroke={FARBEN.blau} strokeWidth={7} d="M82 40a24 24 0 0 1 36 0" />
    </>
  ),
  /*
   * Chip — das Bauteil selbst.
   *
   * Fuer Saetze ueber Strukturbreite, Strahlungsfestigkeit und Rechenleistung.
   * Der Haken stand hier vorher und sagte „stimmt" — er bewertet, statt zu
   * zeigen, wovon die Rede ist.
   */
  chip: (
    <>
      <rect {...koerper} x="62" y="42" width="76" height="66" rx="8" />
      <rect x="84" y="62" width="32" height="26" rx="4" style={{ fill: FARBEN.blau }} />
      <path {...strich} d="M76 42V30M100 42V30M124 42V30M76 108v12M100 108v12M124 108v12" />
      <path {...strich} d="M62 58H50M62 75H50M62 92H50M138 58h12M138 75h12M138 92h12" />
    </>
  ),
  /* Mond — abends. */
  mond: (
    <>
      <path {...koerper} d="M114 22a54 54 0 1 0 32 100 46 46 0 0 1-32-100Z" />
    </>
  ),
  /* Menschen — alle gleichzeitig, nicht ein Geraet. */
  menschen: (
    <>
      <circle {...koerper} cx="56" cy="56" r="15" />
      <path {...koerper} d="M32 120a24 24 0 0 1 48 0Z" />
      <circle {...koerper} cx="144" cy="56" r="15" />
      <path {...koerper} d="M120 120a24 24 0 0 1 48 0Z" />
      <circle {...koerper} cx="100" cy="44" r="18" />
      <path {...koerper} d="M70 124a30 30 0 0 1 60 0Z" />
    </>
  ),
  /* Schild mit Strich — kein Schutz. */
  schild: (
    <>
      <path {...koerper} d="M100 22l52 18v34c0 32-23 48-52 56-29-8-52-24-52-56V40Z" />
      <path {...strich} stroke={FARBEN.blau} strokeWidth={7} d="M74 100l52-52" />
    </>
  ),
  /*
   * Fernseher — ein Rechteck auf einem Fuss.
   *
   * Bewusst ohne Marke, ohne Rahmenprofil, ohne Anschluesse: Was hier fehlt,
   * ist genau das, was ein Datenblatt behaupten wuerde. Was bleibt, ist die
   * Silhouette, die jeder als Fernseher liest.
   */
  fernseher: (
    <>
      <rect {...koerper} x="30" y="26" width="140" height="84" rx="8" />
      <path {...strich} d="M100 110v14M74 124h52" />
    </>
  ),
  /*
   * Zwei Kabel — der ganze Witz des Mittwochs.
   *
   * Sie sind absichtlich **identisch** gezeichnet. Genau darum geht es: Von
   * aussen ist kein Unterschied zu sehen. Keine Pins, keine Kontakte, kein
   * Innenleben — nur Stecker und Strang.
   *
   * **Und gleichgerichtet, nicht gespiegelt.** Der erste Anlauf liess die
   * Straenge nach aussen auseinanderlaufen; im gerenderten Bild waren das
   * zwei duenne Haken an einem gedachten Buegel, also Ohrhoerer. Zwei
   * deckungsgleiche Formen nebeneinander lesen sich dagegen als das, was sie
   * sind: zweimal dasselbe.
   */
  kabel: (
    <>
      <rect {...koerper} x="40" y="18" width="38" height="28" rx="10" />
      <path {...strich} strokeWidth={7} d="M59 46v36c0 20 11 30 27 34" />
      <rect {...koerper} x="114" y="18" width="38" height="28" rx="10" />
      <path {...strich} strokeWidth={7} d="M133 46v36c0 20 11 30 27 34" />
    </>
  ),
  /* Ein Stecker, aus der Naehe. Umriss ohne Kontakte. */
  stecker: (
    <>
      <rect {...koerper} x="66" y="20" width="68" height="34" rx="16" />
      <path {...strich} d="M100 54v42" />
      <path {...koerper} d="M76 96h48v30H76Z" />
    </>
  ),
  /*
   * Einkaufskorb — der Moment an der Kasse.
   *
   * Hier stand zuerst eine **Ladenkasse**: Gehaeuse, Display, Bon. Im
   * gerenderten Bild las sie sich als Bildschirm auf einem Kasten und damit
   * fast wie das Symbol `fernseher`, das zwei Videos weiter steht. Zwei
   * Zeichnungen, die sich aehneln, sind schlimmer als eine zu wenig — der
   * Zuschauer sieht dieselbe Form und sucht einen Zusammenhang, den es nicht
   * gibt.
   *
   * Der Korb ist unverwechselbar und trifft dieselbe Situation.
   */
  einkaufskorb: (
    <>
      <path {...strich} d="M72 60a28 28 0 0 1 56 0" />
      <path {...koerper} d="M32 64h136l-18 62H50Z" />
      <path {...fein} d="M64 80l7 34M100 80v34M136 80l-7 34" />
    </>
  ),
  /*
   * Drucker — flacher Kasten, Papier oben hinein, Blatt unten heraus.
   *
   * Er hat bis zum 18.08.2026 gefehlt, obwohl `drucken` eines von acht
   * Sachgebieten ist. „Dein Drucker unterschreibt" bekam deshalb einen
   * Stempel: wieder eine Assoziation statt des Gegenstands, den der Satz
   * nennt. Gezeichnet ist nur die Silhouette — keine Schaechte, keine
   * Bedienfelder, nichts, was ein Datenblatt behaupten wuerde.
   */
  drucker: (
    <>
      <path {...koerper} d="M62 40h76v26H62Z" />
      <path {...koerper} d="M34 66h132v46H34Z" />
      <path {...koerper} d="M62 96h76v42H62Z" />
      <path {...fein} d="M74 112h52M74 124h38" />
      <circle cx="150" cy="80" r="5" fill={FARBEN.blau} />
    </>
  ),
  /*
   * Browserfenster — Rahmen, Titelleiste, Adresszeile.
   *
   * Hier stand zweimal ein **Fingerabdruck**, und beide Male hat das Standbild
   * ihn verworfen: konzentrische Kreise lasen sich als Radar, offene Boegen
   * als Regenbogen. Ein Abdruck lebt von zwei Dutzend dicht liegenden Linien
   * — bei 4 Pixeln Strichstaerke auf 200 Einheiten wird daraus entweder ein
   * grauer Fleck oder etwas anderes.
   *
   * Der eigentliche Fehler lag aber davor, im Zuordnen: Der Satz lautet
   * „Erkannt wirst du am **Browser**." Er nennt kein Fingerabdruckbild. Die
   * Doktrin sagt, gezeichnet wird, was der Satz nennt — und ein Browserfenster
   * ist mit vier Linien eindeutig.
   */
  browserfenster: (
    <>
      <path {...koerper} d="M28 28h144v114H28Z" />
      <path {...fein} d="M28 58h144" />
      <circle cx="46" cy="43" r="5" fill={FARBEN.linieFein} />
      <circle cx="64" cy="43" r="5" fill={FARBEN.linieFein} />
      <circle cx="82" cy="43" r="5" fill={FARBEN.blau} />
      <path {...fein} d="M48 80h104M48 100h78M48 120h58" />
    </>
  ),
  /*
   * Erde — Kugel mit Aequator und zwei Meridianen.
   *
   * Fuer „Die Erde dreht ungleichmaessig" stand vorher ein Mond da. Der Mond
   * ist ein anderer Himmelskoerper, und genau darum geht es beim Zeichnen:
   * Der Satz nennt die Erde.
   */
  erde: (
    <>
      <circle {...koerper} cx="100" cy="82" r="54" />
      <path {...fein} d="M46 82h108" />
      <path {...fein} d="M100 28c-19 21-19 87 0 108" />
      {/*
        * Der blaue Akzent liegt auf einem **Meridian**, nicht als Bogen quer
        * ueber die Kugel. Der erste Anlauf hatte ihn dort, und im Standbild
        * las sich die Erde damit als Smiley — zwei Meridiane als Augen, der
        * blaue Bogen als Mund. Dasselbe war am 14.08.2026 schon der Steckdose
        * passiert.
        */}
      <path {...strich} stroke={FARBEN.blau} strokeWidth={5} d="M100 28c19 21 19 87 0 108" />
    </>
  ),
  /*
   * QR-Code — drei Ecken und ein paar Felder.
   *
   * Kein lesbarer Code: Er wuerde beim Rendern zu einem Raster verschwimmen
   * und waere obendrein eine Behauptung ueber einen Inhalt, den niemand
   * geprueft hat. Die drei Eckmarken machen ihn eindeutig erkennbar.
   */
  qrcode: (
    <>
      {/*
        * Auf y = 48…152 gestaucht. Der erste Anlauf lief bis y = 160, und im
        * Standbild fehlte die Unterkante der linken unteren Ecke: Die Buehne
        * begrenzt die Zeichnung, und ein QR-Code ohne dritte Ecke ist kein
        * QR-Code mehr, sondern drei Quadrate.
        */}
      <path {...koerper} d="M48 26h42v42H48ZM110 26h42v42h-42ZM48 104h42v42H48Z" />
      <path {...koerper} fill={FARBEN.blau} stroke="none" d="M60 38h18v18H60ZM122 38h18v18h-18ZM60 116h18v18H60Z" />
      <path {...fein} d="M110 104h14v14h-14M138 104h14M110 132h14M138 132h14v14" />
    </>
  ),
  /* Kreuz im Kreis — gibt es nicht. */
  kreuz: (
    <>
      <circle {...koerper} cx="100" cy="74" r="52" />
      <path {...strich} stroke={FARBEN.blau} strokeWidth={7} d="M78 52l44 44M122 52l-44 44" />
    </>
  ),
};

type ZeichnungProps = {
  groesse?: number;
  gedimmt?: boolean;
  /**
   * Begrenzt die Zeichnung auf die Hoehe ihres Behaelters.
   *
   * Noetig, seit Textszenen eine Illustration tragen koennen: Dort steht
   * zuerst der Text, und was uebrig bleibt, ist von Szene zu Szene
   * verschieden. Ohne diese Grenze quoll ein Geraet aus einer Szene mit
   * langem Text nach unten in den Untertitel hinein.
   */
  einpassen?: boolean;
};

const Zeichenflaeche: React.FC<ZeichnungProps & { inhalt: React.ReactNode }> = ({
  inhalt,
  groesse = 200,
  gedimmt = false,
  einpassen = false,
}) => (
  <svg
    width={groesse}
    height={groesse * 0.75}
    viewBox="0 0 200 150"
    preserveAspectRatio="xMidYMid meet"
    style={{
      display: 'block',
      opacity: gedimmt ? 0.35 : 1,
      ...(einpassen ? { maxHeight: '100%', maxWidth: '100%', height: 'auto' } : {}),
    }}
  >
    {/*
      * **Die Buehne ist 200 x 150, nicht quadratisch.** Wer fuer 200 x 200
      * zeichnet, verliert alles unter y = 150 — und zwar lautlos: Das Symbol
      * erscheint, nur ohne Unterkante. Am 18.08.2026 traf das drei von vier
      * neuen Zeichnungen; beim QR-Code fehlte dadurch die dritte Eckmarke, und
      * ohne die ist es kein QR-Code mehr, sondern sind es drei Quadrate.
      *
      * Faustregel: nichts unter y = 146, und die Standflaeche liegt bei 140.
      */}
    {/* Standflaeche: gibt den Objekten Halt wie im Banner. */}
    <ellipse cx="100" cy="140" rx="62" ry="9" fill={FARBEN.flaeche} opacity={0.5} />
    {inhalt}
  </svg>
);

/* ─────────────────────────── Plattformzeichen ───────────────────────── */

/**
 * Der Dienst, fuer den eine Fassung gerendert wird.
 *
 * Keine Eigenschaft des Shorts, sondern des Renders — deshalb steht das hier
 * und nicht im Schema. Ein Short ist derselbe, egal wo er landet; nur das
 * Zeichen an der Signatur wechselt.
 */
export type Dienst = 'tiktok' | 'instagram' | 'youtube';

/**
 * Das stumme Folgen-Zeichen an der Signatur.
 *
 * **Nicht in `KontextArt`.** Das ist die Aufzaehlung der Symbole, die eine
 * Szene inhaltlich zeigen kann; ein Plattformzeichen behauptet nichts ueber
 * die Welt und haengt an keiner `quelleId`. Es ist ein Markenelement wie die
 * Wortmarke, kein Inhalt.
 *
 * **Nachgebaut wird die Geste, nicht das Logo.** Ein Plus im Kreis, eine
 * Glocke, ein Personenumriss — in den Farben des Kanals, im Strichstil der
 * uebrigen Symbole. Keine rote Glocke, keine Note. Dasselbe Argument wie bei
 * den Geraetezeichnungen: selbst gezeichnet, damit kein Lizenz- oder
 * Markenproblem entsteht.
 *
 * `gedrueckt` schaltet den Zustand um: Umriss vor dem Antippen, gefuellt
 * danach. **Das Zeichen bleibt in beiden Zustaenden vollstaendig** — beim
 * Plus waere es naheliegend gewesen, es beim Fuellen verschwinden zu lassen
 * („mach das Plus weg"), aber dann stuende im Standbild ein leerer Kreis. Es
 * invertiert stattdessen: blauer Grund, weisses Zeichen.
 */
export const Plattformzeichen: React.FC<{
  dienst: Dienst;
  groesse?: number;
  gedrueckt?: boolean;
}> = ({ dienst, groesse = 76, gedrueckt = false }) => {
  const grund = gedrueckt ? FARBEN.blau : FARBEN.grundRein;
  const zug = gedrueckt ? FARBEN.grundRein : FARBEN.blau;
  const kontur = { fill: 'none', stroke: zug, strokeWidth: 7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  return (
    <svg width={groesse} height={groesse} viewBox="0 0 100 100" style={{ display: 'block', overflow: 'visible' }}>
      {/*
       * Der Ring traegt alle drei Zeichen. Er ist der Knopf; was darin steht,
       * unterscheidet die Dienste. Ohne ihn waere das Antippen nicht
       * darstellbar — eine freistehende Glocke, die die Farbe wechselt, sieht
       * aus wie ein Fehler.
       */}
      <circle cx="50" cy="50" r="42" fill={grund} stroke={FARBEN.blau} strokeWidth={6} />

      {dienst === 'tiktok' && <path {...kontur} d="M50 32v36M32 50h36" />}

      {dienst === 'instagram' && (
        <>
          {/* Kopf und Schultern, dazu das Plus rechts daneben. */}
          <circle {...kontur} cx="43" cy="38" r="10.5" />
          <path {...kontur} d="M27 68c3-9 8-13.5 16-13.5s13 4.5 16 13.5" />
          <path {...kontur} strokeWidth={5.5} d="M71 37v14M64 44h14" />
        </>
      )}

      {dienst === 'youtube' && (
        <>
          {/* Glockenmantel, Rand, Kloeppel. */}
          <path {...kontur} d="M35 60c0-16 2-25 15-25s15 9 15 25" />
          <path {...kontur} d="M31 60h38" />
          <path {...kontur} strokeWidth={5.5} d="M46 68h8" />
        </>
      )}
    </svg>
  );
};

/** Situationssymbol — gleiche Flaeche, anderer Anspruch. Siehe `Symbole`. */
export const Symbol: React.FC<ZeichnungProps & { art: KontextArt }> = ({ art, ...rest }) => (
  <Zeichenflaeche inhalt={Symbole[art]} {...rest} />
);
