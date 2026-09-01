import { AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, BUEHNE, FARBEN, GROESSEN, RADIUS, SCHRIFT, SPRUCH, TEMPO, VORHANG } from '../../src/marke';
import type { Buehnenbild as BuehnenbildDaten, KontextArt, Szene } from '../../src/typen';
import { Buehne } from '../bausteine/Buehne';
import { Figur } from '../bausteine/Figur';
import { nachleser } from '../../daten/figur/nachleser';
import { zeiger } from '../../daten/figur/zeiger';
import { FOLGEPOSEN, POSEN } from '../bausteine/posen';
import {
  Buehnenbild,
  WORTWECHSEL_SCHLUSS,
  type Wortwechselstand,
} from '../bausteine/Buehnenbild';
import type { Dienst } from '../bausteine/Geraete';
import { Wortmarke } from '../bausteine/Wortmarke';
import {
  abschnitt,
  auftritt,
  auftrittGestaffelt,
  auftrittImSprechrhythmus,
  einblenden,
  impuls,
  linienFortschritt,
} from '../bausteine/bewegung';

/**
 * Das Szenenvokabular von Ganz akkurat.
 *
 * Jede Szenenart loest genau eine erzaehlerische Aufgabe. Neue Szenenarten
 * kommen nur dazu, wenn sich eine Aussage mit den vorhandenen nicht sauber
 * zeigen laesst — sonst zerfaellt die Wiedererkennbarkeit der Marke.
 */

const grundtext = {
  fontFamily: SCHRIFT.familie,
  // Die Hausschrift ist kursiv. Der Schnitt steht im System und nicht an
  // jeder Textstelle, sonst faellt beim naechsten Wechsel die Haelfte durch.
  fontStyle: SCHRIFT.neigung,
  color: FARBEN.tinte,
  letterSpacing: -0.5,
} as const;

/** Farbpaar zu einer Bewertung. */
const bewertungsfarben = (b?: 'ja' | 'nein' | 'achtung' | 'neutral') => {
  switch (b) {
    case 'ja':
      return { vorne: FARBEN.jaGruen, hinten: FARBEN.jaGruenHell, zeichen: '✓' };
    case 'nein':
      return { vorne: FARBEN.neinRot, hinten: FARBEN.neinRotHell, zeichen: '✕' };
    case 'achtung':
      return { vorne: FARBEN.achtungGelb, hinten: FARBEN.achtungGelbHell, zeichen: '!' };
    default:
      return { vorne: FARBEN.tinteWeich, hinten: FARBEN.grundRein, zeichen: '·' };
  }
};

/* ──────────────────────────── Die Buehne ───────────────────────────── */

/**
 * Das Bild unter dem Text, sofern die Szene eines nennt.
 *
 * Es tritt **nach** dem Text auf, etwa im ersten Fuenftel der Szene: Erst
 * liest man, was behauptet wird, dann sieht man, wovon die Rede ist. Beides
 * gleichzeitig einzublenden liesse den Blick zwischen zwei Neuigkeiten
 * springen.
 *
 * **Das stehende Symbol ist am 24.08.2026 weggefallen**, und mit ihm das Feld
 * `symbol`. Es war der Vorgaenger der Buehne: eine Zeichnung, die unter dem
 * Satz stand und nichts tat. Die Entscheidung darueber war im Schema
 * ausdruecklich auf Stufe 4 vertagt — „ein Feld zu streichen, bevor sein
 * Nachfolger an einem fertigen Video gemessen wurde, ist derselbe Fehler wie
 * eine geratene Konstante". Der Nachfolger ist inzwischen gemessen, und kein
 * Entwurf hat das alte Feld noch gesetzt.
 *
 * Gibt `undefined` zurueck, wenn nichts gesetzt ist — und das ist der
 * Normalfall: Die Typografie traegt, das Bild ist die Ausnahme.
 */
/**
 * Der Schleier hinter geschriebenem Text auf der Buehne.
 *
 * **Seit dem 01.09.2026 steht die Buehne in einem Raum**, und der Raum hat
 * Fenster, Bilder und eine Uhr an der Wand. Im ersten Standbild lag „Nicht
 * der Kalender entscheidet." quer darueber und war nicht mehr zu lesen.
 *
 * Ein Kasten waere hier falsch. Der Schluss hat schon einmal einen Strich
 * ueber die ganze Buehnenbreite gehabt, und der sagte optisch „fertig" — ein
 * Rahmen um die Pointe taete dasselbe. Ein Verlauf **hat keine Kante**: Er
 * hellt die Wand dort auf, wo Text steht, und laeuft nach aussen ins Nichts.
 *
 * Zwei Dinge daran sind am Standbild erarbeitet:
 *
 * 1. **Er haengt absolut hinter dem Text, nicht als Hintergrund am
 *    Textkasten.** Ein Verlauf endet am Rand seines Kastens; beim ersten
 *    Anlauf stand er dort noch bei halber Deckung, und im Bild war ein heller
 *    **Rechteckblock** mit vier Raendern — genau der Rahmen, den der Schluss
 *    nicht haben darf. Er braucht Platz ueber den Text hinaus, um auf null zu
 *    laufen.
 * 2. **Diesen Platz ueber Rand und Innenabstand zu holen ginge nicht.**
 *    `offsetHeight` zaehlt den Innenabstand mit, und die Ueberlaufbremse in
 *    `Buehne.tsx` misst genau diese Zahl. Der Schleier haette den Text
 *    verkleinert, den er lesbar machen soll.
 *
 * Die Farbe ist `grundRein` und nicht die Wandfarbe: Ein Schleier in
 * `blauHell` waere auf `blauHell` unsichtbar.
 */
const Textschleier: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative' }}>
    <div
      style={{
        position: 'absolute',
        inset: -260,
        background:
          `radial-gradient(52% 46% at 44% 50%, ${FARBEN.grundRein}F2 0%, ` +
          `${FARBEN.grundRein}E0 46%, ${FARBEN.grundRein}00 100%)`,
      }}
    />
    <div style={{ position: 'relative' }}>{children}</div>
  </div>
);

const Illustration = (
  szene: { buehne?: BuehnenbildDaten },
  frame: number,
  fps: number,
  dauer: number,
  /**
   * Abweichende Anordnung fuer den Wortwechsel. Nur der Schluss nutzt sie:
   * Dort reicht keine Pose weit genug, um die Groesse von `WORTWECHSEL` zu
   * rechtfertigen — siehe `WORTWECHSEL_SCHLUSS`.
   */
  stand?: Wortwechselstand,
): React.ReactNode | undefined => {
  /*
   * Die Buehne geht vor. Sie ist der Nachfolger von `symbol` — eine Szene, die
   * beides setzt, ist ein halber Umbau, und dann soll das Neue gewinnen.
   *
   * Sie bekommt ihre eigene Untergrenze und **keinen** `auftritt`: Ein
   * Vorgang, der als Ganzes eingeblendet wird, hat seinen Anfang schon
   * verloren, bevor er sichtbar war. Die Buehne bringt ihre Zeitachse selbst
   * mit und faengt bei Bild 0 der Szene an.
   */
  if (szene.buehne) {
    /*
     * `minHeight: 0` ist hier die eigentliche Ansage, nicht `flex: 1`.
     * Flex-Kinder haben `min-height: auto`, schrumpfen also nicht unter ihren
     * Inhalt — ein Kasten mit fester Untergrenze nimmt sich den Platz auch
     * dann, wenn keiner da ist, und laeuft nach oben in den Satz hinein.
     *
     * Genau das ist am 23.08.2026 passiert: Hier stand `minHeight: 620`, und
     * bei „Nicht das Flugzeug. Das Netz." bricht der Satz in **drei** Zeilen
     * statt zwei. Das Etikett „DAS FLUGZEUG" lag daraufhin quer ueber dem Wort
     * „Netz.". Zwei Zeilen hatten gereicht, drei nicht — eine feste Zahl kann
     * diesen Unterschied nicht kennen.
     *
     * Die Buehne nimmt jetzt den Rest und nie mehr. Wie viel das ist,
     * entscheidet der Satz darueber, und das ist die richtige Rangfolge: Der
     * Text traegt den Inhalt, die Zeichnung fuehrt ihn vor.
     */
    return (
      <div
        style={{
          /*
           * `xl` und nicht `m`. Der Aufschlag setzt unter seinen Satz einen
           * blauen Balken — die einzige Bewegung der Szene und der Marker fuer
           * den Anfang des Videos. Mit 32 Pixeln Abstand schob sich die groesser
           * gewordene Buehne darueber, und der Balken schaute links neben dem
           * Kopf der Figur hervor.
           *
           * Der Balken gehoert zum Text, nicht zur Zeichnung. Also braucht die
           * Zeichnung Abstand, nicht der Balken weniger Platz.
           */
          display: 'flex',
          justifyContent: 'center',
          /*
           * **Kein `marginTop` und kein `minHeight` mehr — seit dem
           * 01.09.2026.** Beide Zahlen gehoerten zu einer Zeit, in der die
           * Zeichnung als letztes Kind im gemessenen Textstapel hing: Der
           * Abstand hielt sie vom blauen Balken des Aufschlags frei (den es
           * nicht mehr gibt), die 260 waren die Untergrenze, unter der eine
           * Figur keine mehr ist.
           *
           * Die Untergrenze ist mit ihrem Grund entfallen. Die Zeichnung
           * bekommt in `Buehne.tsx` die **ganze** Buehnenflaeche, absolut und
           * unabhaengig davon, wie viel Text darueber steht — sie kann nicht
           * mehr auf null schrumpfen, und sie ist in jeder Szene gleich gross.
           */
          flex: 1,
          /*
           * **`minWidth: 0` ist die Zeile, die die Figur in der Buehne haelt.**
           *
           * Ein Flex-Kind hat `min-width: auto`, schrumpft also nicht unter die
           * **Mindestbreite seines Inhalts**. Das `<svg>` darin traegt
           * `alignSelf: 'stretch'` und bekommt damit die volle Hoehe des
           * Kastens; aus seiner `viewBox` von 200 zu 150 leitet der Browser
           * dann eine Mindestbreite von vier Dritteln dieser Hoehe ab. Bei 649
           * Pixeln Hoehe sind das **865 Pixel Breite auf einer Buehne von 719**
           * — der Kasten wuchs nach beiden Seiten heraus, und die Figur stand
           * mit der Hand auf dem Vorhangstreifen.
           *
           * Gefunden mit farbigen Rahmen um beide Kaesten im Standbild,
           * nachdem drei andere Erklaerungen danebenlagen: die Kamerafahrt war
           * nur die Haelfte, `overflow` war es nicht, und die Buehne selbst ist
           * mit 710 Pixeln sogar schmaler als die freie Flaeche zwischen den
           * Vorhaengen. **Die Breite kam nicht von der Breite, sondern von der
           * Hoehe.**
           */
          minWidth: 0,
          /*
           * **Und dasselbe noch einmal gespiegelt.** `minWidth: 0` allein hat
           * nur die halbe Kopplung geloest: Das `<svg>` leitet aus seiner
           * **Breite** genauso eine Mindesthoehe ab wie umgekehrt — bei 710
           * Pixeln Breite sind das 532 Pixel Hoehe, und damit brauchte der
           * Inhalt 1240 Pixel auf einer Buehne von 1000. Die `passung`-Bremse
           * schrumpfte daraufhin **alles** auf 0,806: Karte und Figuren wurden
           * kleiner, obwohl reichlich Platz da war.
           *
           * `relative` plus `overflow: hidden` hier und `absolute` am `<svg>`
           * darunter schneiden die Kette durch: Der Kasten bestimmt seine
           * Groesse aus dem Flex-Layout, das SVG folgt ihm — und nie
           * andersherum. Das ist zugleich die Beschneidung, die vorher fehlte,
           * als die Kamerafahrt den Inhalt herausdrueckte.
           */
          position: 'relative',
          overflow: 'hidden',
          /*
           * `alignSelf: stretch` ist die Zeile, auf die es ankommt.
           *
           * `Buehne.tsx` wickelt die Illustration in einen eigenen Kasten mit
           * `flex: 1` und `alignItems: 'center'`. Der hat keine
           * `flexDirection`, ist also eine **Zeile** — und dort richtet
           * `alignItems: center` senkrecht aus. Dieser Kasten bekam dadurch die
           * Hoehe seines Inhalts statt die des Wrappers; das `<svg>` mit
           * `height: 100%` fand keine feste Bezugshoehe und rechnete seine
           * eigene aus der Breite, also rund 820 mal 0,75 — gut 600 Pixel in
           * einem Restplatz von etwa 450. Der Ueberschuss verteilte sich beim
           * Zentrieren nach oben und unten, und die Figur ragte unter den
           * blauen Balken des Aufschlags.
           *
           * Zwei Erklaerungen davor waren falsch: mehr Abstand und die
           * Streckung des SVG haben nichts bewegt. Gefunden wurde es erst mit
           * einem farbigen Rahmen um beide Kaesten im Standbild — der Balken
           * lag sichtbar **innerhalb** des Buehnenkastens. Damit war klar, dass
           * nicht der Abstand fehlt, sondern der Kasten zu hoch ist.
           */
          alignSelf: 'stretch',
        }}
      >
        <Buehnenbild buehne={szene.buehne} dauer={dauer} stand={stand} />
      </div>
    );
  }

  return undefined;
};

/* ─────────────────────────────── Text ──────────────────────────────── */

type SzenenProps<A extends Szene['art']> = { szene: Extract<Szene, { art: A }>; dauer: number };

/**
 * Die schlichte Szene — sie traegt nur noch die Buehne.
 *
 * **Hier stand bis zum 01.09.2026 der grosse Satz ueber den Figuren**, in zwei
 * Groessen, mit Hervorhebung und einem blauen Balken darunter. Er ist
 * gestrichen, und der Befund war einfach: „Das Geschriebene oben macht sowieso
 * keinen Sinn."
 *
 * Er hatte recht, und zwar doppelt. Bei zwei Stimmen traegt die Sprechblase
 * den gesprochenen Satz Wort fuer Wort — oben stand ein zweiter, anderer. Der
 * Zuschauer las zweimal.
 *
 * An seine Stelle tritt kein besserer Text, sondern ein **Ort**: die Kulisse
 * in `video/bausteine/Kulisse.tsx`. Im ersten Standbild mit beidem lag „Oft
 * schwache Passwoerter." quer ueber Fenster und Bilderwand.
 *
 * **Und der Satz kostete mehr als seine eigene Hoehe.** Er drueckte die Buehne
 * nach unten, und damit wanderte die Standlinie der Figuren je nach
 * Textlaenge. Die Kulisse rechnet ihre Bodenkante aus einer festen Zahl; ohne
 * Text stehen die Figuren wieder dort, wo der Boden ist.
 *
 * Die Zeichnung steht als `illustration` und nicht als Kind, und das ist der
 * ganze Unterschied: Als Kind bekommt sie nur ihre eigene Hoehe und sitzt
 * zentriert im Rahmen — im ersten Standbild ohne Text stand die Figur dadurch
 * achtzig Pixel ueber dem Boden und halb so hoch wie sonst. Als `illustration`
 * bekommt sie `flex: 1` und damit den ganzen Rahmen.
 */
const NurBuehne: React.FC<SzenenProps<'text'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return <Buehne dauerBilder={dauer} illustration={Illustration(szene, frame, fps, dauer)} />;
};

/* ─────────────────────────────── Frage ─────────────────────────────── */

/**
 * Die Frage, die stehen bleibt — der Montag.
 *
 * Die einzige Szene ohne Bewegung nach dem Einlaufen und die einzige, in der
 * laenger geschwiegen als gesprochen wird. „Schätz mal." dauert eine dreiviertel
 * Sekunde, die Szene vier — der Rest ist Stille mit der Frage im Bild.
 *
 * Das Fragezeichen steht bewusst gross und blau daneben statt am Satzende: Es
 * ist das Signal, dass hier etwas vom Zuschauer erwartet wird, und es muss auf
 * einen Blick lesbar sein, auch ohne Ton. Der Laufbalken darunter zeigt, dass
 * die Zeit ablaeuft — ohne ihn sieht ein stehendes Bild nach Fehler aus.
 */
const Frage: React.FC<SzenenProps<'frage'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const laengstesWort = Math.max(...szene.frage.split(/\s+/).map((w) => w.length));
  const groesse = laengstesWort <= 12 ? 82 : laengstesWort <= 16 ? 70 : 60;

  return (
    <Buehne dauerBilder={dauer} illustration={Illustration(szene, frame, fps, dauer)}>
      <Textschleier>
      <div style={{ ...auftritt(frame, fps, 0), display: 'flex', alignItems: 'flex-start', gap: ABSTAND.m }}>
        <span
          style={{
            ...grundtext,
            fontWeight: SCHRIFT.schwarz,
            fontSize: Math.round(groesse * 1.6),
            lineHeight: 0.86,
            color: FARBEN.blau,
            flexShrink: 0,
          }}
        >
          ?
        </span>
        <p
          style={{
            ...grundtext,
            fontWeight: SCHRIFT.schwarz,
            fontSize: groesse,
            lineHeight: 1.08,
            margin: 0,
          }}
        >
          {szene.frage}
        </p>
      </div>

      {/*
        Der Balken laeuft ueber die volle Szenenlaenge leer. Er ist die
        Denkzeit, sichtbar gemacht — und der Grund, warum vier Sekunden
        Standbild nicht nach eingefrorenem Video aussehen.
      */}
      <div
        style={{
          marginTop: ABSTAND.xl,
          height: 10,
          borderRadius: RADIUS.rund,
          backgroundColor: FARBEN.gitter,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: RADIUS.rund,
            backgroundColor: FARBEN.blau,
            width: `${(1 - linienFortschritt(frame, fps, dauer)) * 100}%`,
          }}
        />
      </div>
      </Textschleier>
    </Buehne>
  );
};
/* ─────────────────────────────── Zahl ──────────────────────────────── */

const Zahl: React.FC<SzenenProps<'zahl'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /*
   * Die Schriftgroesse richtet sich nach der Laenge der Zahl. Eine feste
   * Groesse laesst „27.000 mAh" ueber den rechten Rand der Buehne laufen —
   * also genau dorthin, wo TikTok seine Bedienleiste einblendet.
   */
  const zeichen = szene.wert.length + (szene.einheit?.length ?? 0);
  const grundGroesse = zeichen <= 4 ? 220 : zeichen <= 7 ? 180 : zeichen <= 10 ? 140 : 112;

  /*
   * ## Steht eine Zeichnung darunter, wird die Zahl kleiner
   *
   * Die Zeichnung bekommt in `Buehne.tsx` nur `flex: 1`, also **den Rest**.
   * Eine Zahl auf 220 Pixel plus `bedeutung` plus `ABSTAND.l` nimmt rund
   * hundert Pixel mehr als eine zweizeilige Ueberschrift — und weil beide
   * Figuren sich in die verbleibende Hoehe einpassen, schlaegt das dort
   * doppelt durch: In `erstes-laden` standen sie in der `zahl`-Szene 230
   * Pixel hoch, in der Textszene daneben 400.
   *
   * Derselbe Restplatz-Fehler wie seinerzeit bei den 60-Pixel-Symbolen: Wer
   * zuerst den Text setzt und der Zeichnung gibt, was uebrig bleibt, bekommt
   * eine Zeichnung in Briefmarkengroesse — und im Feed ist das Bild ohnehin
   * schon briefmarkengross.
   *
   * **Die Ueberlaufmessung in `Buehne.tsx` wird dafuer nicht angefasst.** Ein
   * Mindestanteil fuer die Zeichnung liesse den Inhalt ueberlaufen, und die
   * Messung skalierte daraufhin **alles** herunter, Zahl inbegriffen. Der
   * Tausch waere schlechter als das Problem; die Kommentare dort zaehlen drei
   * gescheiterte Anlaeufe, einer machte jede Szene leer.
   *
   * **Die 0,68 schliesst die Luecke nicht ganz, und das ist Absicht.** Am
   * Standbild gemessen: 230 Pixel vorher, 290 nachher, gegen 400 in den
   * Textszenen desselben Shorts. Weiter zu gehen lohnt nicht — das `<svg>`
   * fuellt seinen Kasten nur zu rund drei Fuenfteln (die Figuren stehen in
   * einer viewBox von 200 x 150 auf der Standlinie bei y = 146), jeder
   * gewonnene Pixel Kasten bringt also nur 0,6 Pixel Figur. Fuer die
   * restlichen 110 muesste die Zahl auf gut hundert Pixel schrumpfen, und
   * dann traegt die `zahl`-Szene ihren eigenen Gegenstand nicht mehr.
   */
  const hatZeichnung = szene.buehne !== undefined;
  const wertGroesse = hatZeichnung ? Math.round(grundGroesse * 0.68) : grundGroesse;
  const einheitGroesse = Math.round(wertGroesse * 0.38);

  return (
    <Buehne dauerBilder={dauer} illustration={Illustration(szene, frame, fps, dauer)}>
      <Textschleier>
      <div
        style={{
          ...auftritt(frame, fps, 0),
          display: 'flex',
          alignItems: 'baseline',
          gap: ABSTAND.s,
          transform: `${auftritt(frame, fps, 0).transform} scale(${impuls(frame, fps, 8)})`,
          transformOrigin: 'left center',
        }}
      >
        <span
          style={{
            ...grundtext,
            fontWeight: SCHRIFT.schwarz,
            fontSize: wertGroesse,
            lineHeight: 0.9,
            color: FARBEN.blau,
            letterSpacing: -8,
          }}
        >
          {szene.wert}
        </span>
        {szene.einheit && (
          <span
            style={{
              ...grundtext,
              fontWeight: SCHRIFT.fett,
              fontSize: einheitGroesse,
              color: FARBEN.tinteWeich,
            }}
          >
            {szene.einheit}
          </span>
        )}
      </div>

      <p
        style={{
          ...grundtext,
          ...auftritt(frame, fps, 10),
          fontWeight: SCHRIFT.halbfett,
          fontSize: GROESSEN.aussage,
          lineHeight: 1.25,
          marginTop: hatZeichnung ? ABSTAND.m : ABSTAND.l,
        }}
      >
        {szene.bedeutung}
      </p>
      </Textschleier>
    </Buehne>
  );
};

/* ───────────────────────────── Vergleich ───────────────────────────── */

/**
 * Der Nachschlag: **ein** Satz. Sonst nichts.
 *
 * Hier stand bis zum 17.08.2026 die Endkarte — eine gerahmte Liste aus zwei
 * bis vier nummerierten Punkten, gebaut als Standbild „zum Fotografieren und
 * Weiterschicken". Fotografiert wurde nie etwas. Was sie tatsaechlich war:
 * Lernkontrolle, und Lernkontrolle ist das Gegenteil von Unterhaltung.
 *
 * Bis zum 18.08.2026 folgten auf den Satz dann ein blauer Strich, eine zweite
 * Wortmarke und der Spruch. Auch das ist gegangen, und zwar aus einem
 * gemessenen Grund: **Der Abspann dauerte 1,5 bis 3,1 Sekunden**, im Schnitt
 * 2,2 — bei zwanzig Sekunden Laufzeit elf Prozent der Zeit, in denen nichts
 * Neues mehr kommt. Ein Short laeuft von selbst wieder an; ein Vorhang sagt
 * dem Zuschauer, dass er das nicht abwarten muss.
 *
 * Der Strich war dabei das eigentliche Signal. Er trennte „die Pointe" von
 * „dem Absender" und damit den Inhalt vom Ende. Ohne ihn sieht die letzte
 * Szene aus wie jede andere — und genau das soll sie, damit der erste Satz
 * danach wieder passt.
 *
 * Der Spruch stand seit dem 18.08.2026 oben unter der Kopfzeile. **Seit dem
 * 24.08.2026 steht er wieder in der Mitte**, unter dem Schlusssatz — aber
 * ohne das, was den alten Abspann zum Vorhang gemacht hat: kein blauer Strich,
 * keine zweite Wortmarke, keine eigene Standzeit. Er erscheint innerhalb der
 * Schlussszene, die ohnehin laeuft.
 *
 * Das ist kein Rueckbau der Begruendung von oben. Der Strich war das Signal
 * „fertig", nicht der Spruch. Was jetzt dasteht, ist eine Signatur: die Figur
 * in Schriftgroesse neben ihrem eigenen Satz. Sie hat nachgelesen.
 *
 * Keine Dauerbewegung: Der letzte Frame ist der, den die Plattform als
 * Vorschaubild nimmt, wenn wiederholt wird. Der soll stehen.
 */
/**
 * Wo der Zeiger in der Signatur steht — je Dienst.
 *
 * Zwei Plaetze, nicht ein Versatz: **In der Zeile** steht er rechts neben dem
 * Spruch, auf dessen Hoehe. **Frei** verlaesst er die Zeile und sitzt unten in
 * der Buehne, ueber dem Knopf.
 *
 * Der Unterschied kommt daher, wo die Apps ihren Folgen-Knopf haben. Bei
 * TikTok liegt er **rechts auf mittlerer Hoehe** — genau dort, wo die Signatur
 * ohnehin endet, und ein Versatz nach aussen genuegt. Bei Instagram liegt er
 * **unten links** neben dem Kanalnamen, also weder auf der Hoehe des Spruchs
 * noch auf seiner Seite. Ein Zeiger, der von rechts oben dorthin deutet,
 * deutet quer ueber den eigenen Schlusssatz.
 *
 * Negative Werte in der Zeile schieben ihn ueber die sichere Zone hinaus. Das
 * ist vertretbar: Es ist kein Text und keine Aussage, sondern eine Geste, die
 * aus dem Bild deutet. Selbst wenn eine App ein Stueck verdeckt, bleibt die
 * Richtung lesbar.
 *
 * **Der freie Platz liegt ausserhalb der Buehne**, und das ist eine bewusste
 * Ausnahme von der Regel, dass jede Szene nur im Rahmen rendert. Die Buehne
 * endet bei y = 1150, der Untertitel darunter bei 1388, und der Folgen-Knopf
 * sitzt erst bei rund 1594 — eine Figur am Buehnenboden stuende 450 Pixel
 * ueber dem, worauf sie deutet.
 *
 * Die Zone dazwischen ist sonst gesperrt, weil die Apps dort ihre
 * Bedienelemente einblenden. Hier traegt die Ausnahme, weil die Fassung fuer
 * **genau eine App** gerendert wird: Bei Reels liegen Kanalname und Knopf
 * tiefer, und der Streifen darueber bleibt frei. Auf einer anderen Plattform
 * waere derselbe Platz verdeckt — deshalb steht er in einer Tabelle je Dienst
 * und nicht als allgemeine Regel.
 *
 * Die Grenzen sind hart und in beide Richtungen begruendet: nicht hoeher als
 * 1388, sonst laeuft der Untertitel hinein; nicht tiefer als rund 1570, sonst
 * steht die Figur auf dem Knopf statt ueber ihm.
 *
 * `links` und `unten` sind Abstaende zum **Bildrand**, nicht zur Buehne. Der
 * Knopf sitzt auf rund 38 % der Bildbreite, also bei 410; der Kasten ist 240
 * breit und die Figur darin ungefaehr mittig, deshalb 290.
 */
type ZeigerPlatz =
  | { art: 'zeile'; versatz: number }
  | { art: 'frei'; links: number; unten: number; breite: number };

const ZEIGER_PLATZ: Record<Dienst, ZeigerPlatz> = {
  /*
   * Der Versatz war einmal glatte −86 und richtete sich am **Bildrand** aus.
   * Seit dem 31.08.2026 steht dort der geraffte Vorhangstreifen, und der liegt
   * ueber den Szenen — die Figur waere hinter ihm verschwunden.
   *
   * Sie rueckt deshalb um dessen Breite ein und steht zur **Innenkante des
   * Vorhangs** jetzt so, wie sie vorher zum Bildrand stand. Die Geste bleibt
   * dieselbe: Sie deutet aus dem Bild heraus, und es war ohnehin nie ein
   * Zielen, sondern eine Richtung.
   */
  tiktok: { art: 'zeile', versatz: -86 + VORHANG.rand },
  instagram: { art: 'frei', links: 290, unten: 348, breite: 240 },
  youtube: { art: 'frei', links: 580, unten: 348, breite: 240 },
};

const Schluss: React.FC<SzenenProps<'schluss'> & { dienst: Dienst }> = ({
  szene,
  dauer,
  dienst,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const laengstesWort = Math.max(...szene.satz.split(/\s+/).map((w) => w.length));
  const groesse = laengstesWort <= 13 ? GROESSEN.ueberschrift : 62;

  const platz = ZEIGER_PLATZ[dienst];

  /*
   * Kein zweites `viewBox` um die Figur herum: Sie bringt ihr eigenes SVG mit
   * `width="100%"` mit, und in einem aeusseren viewBox-SVG verschwindet sie
   * spurlos — im ersten Anlauf stand hier nur der Spruch, ohne Fehler und ohne
   * Figur. Der Kasten hat stattdessen das Seitenverhaeltnis ihres Zeichenraums
   * (200 zu 150).
   *
   * **Hier steht der Zeiger, nicht der Nachleser.** Der Kanal hat seit dem
   * 24.08.2026 zwei Figuren mit geteilter Arbeit: Der Nachleser traegt den
   * Inhalt, der Zeiger alles, was der Zuschauer tun kann. Der Schluss ist die
   * Stelle, an der etwas verlangt wird — also gehoert sie ihm.
   *
   * Er blickt und zeigt je nach Dienst woanders hin, weil der Folgen-Knopf
   * ueberall woanders liegt. Ein gezeichnetes Plus stand hier bis zum
   * 24.08.2026 und ist gestrichen: Ein Zeichen, das wir selbst malen, deutet
   * auf nichts.
   */
  /*
   * Gestaucht wie auf der Buehne. Ohne das waere Watti in der Signatur schlank
   * und mitten im Video eine Knopfzelle — zwei Umrisse fuer dieselbe Figur
   * heben genau die Wiedererkennung wieder auf, fuer die die Stauchung da ist.
   */
  const figur = <Figur rig={zeiger} pose={FOLGEPOSEN[dienst]} />;

  return (
    <>
      {/*
       * Der freie Platz haengt nicht an der Buehne, sondern am Bild — deshalb
       * ein eigener `AbsoluteFill` neben ihr statt eines Slots in ihr. Er
       * steht **vor** der Buehne im Markup, damit die Figur hinter dem Text
       * liegt, falls beide sich je beruehren.
       */}
      {platz.art === 'frei' && szene.buehne === undefined && (
        <AbsoluteFill>
          <div
            style={{
              ...auftritt(frame, fps, 12),
              position: 'absolute',
              left: platz.links,
              bottom: platz.unten,
              width: platz.breite,
              height: (platz.breite * 3) / 4,
            }}
          >
            {figur}
          </div>
        </AbsoluteFill>
      )}

      {/*
        **Seit dem 01.09.2026 traegt der Schluss dieselbe Buehne wie jede andere
        Szene.** Vorher standen hier Satz, Strich und Spruch — und die beiden
        Figuren, die den ganzen Short getragen haben, waren im Moment der Pointe
        verschwunden. Sie stehen jetzt darunter, und die kleine Signaturfigur
        entfaellt dafuer: Drei Figuren in einem Bild sind zwei zu viel.
      */}
      <Buehne
        dauerBilder={dauer}
        illustration={Illustration(szene, frame, fps, dauer, WORTWECHSEL_SCHLUSS)}
      >
      <Textschleier>
      <p
        style={{
          ...grundtext,
          ...auftritt(frame, fps, 0),
          /*
           * Dieselbe Schrift wie der Aufschlag — die Klammer um das Video.
           *
           * Das ist keine Symmetrie um ihrer selbst willen: Ein Short laeuft
           * von selbst wieder an, und das Feld `rundlauf` haelt fest, warum
           * der erste Satz nach dem letzten wieder passt. Wenn beide Saetze in
           * derselben Schrift stehen, sieht man den Anschluss, statt ihn nur
           * aufgeschrieben zu haben.
           */
          fontWeight: SCHRIFT.schwarz,
          fontSize: groesse,
          lineHeight: 1.12,
          margin: 0,
        }}
      >
        {szene.satz}
      </p>

      {/*
       * Die Signatur: Strich, Spruch — und, wo der Knopf auf ihrer Hoehe
       * liegt, die Figur rechts daneben.
       *
       * Sie hat drei Plaetze durchlaufen, und der Weg dorthin ist die
       * Begruendung: **links** neben dem Spruch nahm sie ihm den Anfang,
       * **unter** ihm sass sie in einer Ecke, die sonst leer bleibt, und
       * **direkt daneben** teilte sie sich mit der Textzeile eine Grundlinie,
       * die zu keinem von beiden gehoert. Rechts aussen, vertikal zentriert
       * ueber dem ganzen Block, hat sie eine eigene Mitte.
       *
       * Sie zeigt auf nichts. Der Spruch traegt sich selbst, und eine Figur,
       * die auf ihn deutet, macht ihn zur Beschriftung.
       *
       * **Der Strich ist bewusst kurz.** Der alte Abspann hatte einen ueber
       * die ganze Buehnenbreite, und der war das Signal „fertig" — er trennte
       * die Pointe vom Absender. 96 Pixel trennen nichts, sie zeichnen aus.
       * Gezogen statt eingeblendet: Eine Linie, die entsteht, ist eine Geste.
       */}
      {/*
       * `justifyContent: space-between` und ein Versatz je Dienst: Der Zeiger
       * rueckt dorthin, wo der Knopf liegt — bei TikTok an den rechten Rand.
       * Bei Instagram steht er gar nicht in dieser Zeile, sondern unten in der
       * Buehne; siehe `ZEIGER_PLATZ`.
       *
       * Die Geste allein reicht nicht: Wer nach rechts zeigt und dabei in der
       * Bildmitte steht, zeigt auf die Buehne. Naeher am Rand zeigt er aus dem
       * Bild heraus, und genau das ist gemeint.
       */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: ABSTAND.s,
          marginTop: ABSTAND.l,
        }}
      >
        <div>
          <div
            style={{
              height: 6,
              width: interpolate(
                spring({ frame: frame - 6, fps, config: TEMPO.feder }),
                [0, 1],
                [0, 96],
              ),
              borderRadius: 999,
              backgroundColor: FARBEN.blau,
            }}
          />

          <span
            style={{
              ...auftritt(frame, fps, 10),
              ...grundtext,
              display: 'block',
              fontWeight: SCHRIFT.fett,
              fontSize: GROESSEN.detail,
              color: FARBEN.tinteWeich,
              letterSpacing: 0.2,
              marginTop: ABSTAND.s,
              /* Der Spruch ist eine Zeile. Bricht er, steht dort ein Absatz. */
              whiteSpace: 'nowrap',
            }}
          >
            {SPRUCH}
          </span>
        </div>

        {/*
         * Nur wo der Knopf auf der Hoehe der Signatur liegt. Steht die Figur
         * frei, ist diese Stelle leer und die Zeile traegt allein den Spruch —
         * `space-between` schadet dabei nicht, weil nur noch ein Kind da ist.
         */}
        {platz.art === 'zeile' && szene.buehne === undefined && (
          <div
            style={{
              ...auftritt(frame, fps, 12),
              width: 240,
              height: 180,
              flex: 'none',
              marginRight: platz.versatz,
            }}
          >
            {figur}
          </div>
        )}

        {/*
         * Der Ton sitzt auf dem Moment, in dem die Geste steht — nicht auf dem
         * Auftritt. Ein Klang zum Einblenden waere eine Ankuendigung.
         *
         * Eigener Ton (`skripte/toene.ts`), kein Plattformklang: Das
         * Bediengeraeusch der App ist nirgends veroeffentlicht und nicht zum
         * Einbrennen lizenziert.
         */}
        <Sequence from={22} layout="none" name="Ton folgen">
          <Audio src={staticFile('ton/marke/folgen.wav')} volume={0.55} />
        </Sequence>
      </div>
      </Textschleier>
      </Buehne>
    </>
  );
};

/* ──────────────────────────── Kaufkriterien ─────────────────────────── */

/**
 * Die Zitatkarte — der Wortlaut steht im Bild, in Anfuehrungszeichen und auf
 * einer eigenen Flaeche.
 *
 * **Warum eine Flaeche und keine blosse Kursivschrift.** Ein Zitat muss als
 * fremder Text erkennbar sein, sonst ist es nur ein Satz mit anderer Neigung.
 * Die Karte trennt ihn sichtbar von allem, was der Kanal selbst sagt — und
 * genau das ist der Punkt der Sprachregel vom 25.08.2026: Das Zitat bleibt
 * Behoerdendeutsch, alles andere ist Alltagssprache. Sieht man die Grenze
 * nicht, traegt die Regel nicht.
 *
 * Der Herausgeber steht **unter** dem Zitat, klein und in der weichen Tinte.
 * Nicht darueber: Erst der Satz, dann wer ihn verantwortet — umgekehrt liest
 * man den Namen und ueberfliegt den Satz.
 */
const Zitatkarte: React.FC<SzenenProps<'zitatkarte'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /*
   * Die Karte faehrt aus sich heraus auf: erst der Rahmen, dann der Text.
   * Beides gleichzeitig sieht aus wie ein eingeblendetes Bild; nacheinander
   * wie ein Blatt, das jemand hinlegt.
   */
  const rahmen = auftritt(frame, fps, 0);
  const text = auftritt(frame, fps, 8);

  return (
    /*
     * **Die Karte steht unten, vor den Figuren — seit dem 01.09.2026.**
     *
     * Sie stand oben, und die Figuren bekamen darunter den Rest. Zwei Dinge
     * gingen daran schief: Bei einem langen Zitat blieb ihnen fast nichts, und
     * in jeder Szene standen sie anders hoch — in der Zitatkartenszene halb so
     * gross wie nebenan. Mit einem gezeichneten Raum im Ruecken faellt das
     * sofort auf, weil die Bodenkante fest liegt.
     *
     * Jetzt steht die Figurenbuehne absolut auf ihrer Standlinie
     * (`Buehne.tsx`), und die Karte sitzt darunter auf der Diele. Sie liest
     * sich als Schild, das die beiden vor sich halten: Gesichter und
     * Oberkoerper bleiben frei, der Beleg steht davor.
     *
     * **Die `passung`-Bremse bleibt zustaendig.** Sie misst weiter „Platz
     * gegen Bedarf", nur betrifft ihr Ergebnis jetzt allein die Karte — die
     * Figuren kann sie nicht mehr mit herunterziehen.
     */
    <Buehne
      dauerBilder={dauer}
      illustration={Illustration(szene, frame, fps, dauer)}
      inhaltStand="unten"
    >
      <div
        style={{
          ...rahmen,
          backgroundColor: FARBEN.flaeche,
          borderRadius: RADIUS.m,
          padding: `${ABSTAND.m}px ${ABSTAND.m}px`,
          // Der blaue Balken links ist das Zitatzeichen. Er kostet nichts an
          // Hoehe und sagt auf einen Blick: Das hier ist nicht von uns.
          borderLeft: `10px solid ${FARBEN.blau}`,
        }}
      >
        <p
          style={{
            ...grundtext,
            ...text,
            /*
             * **`ueberschrift` statt `aussage`, seit dem 31.08.2026.**
             *
             * Die Karte traegt jetzt hoechstens 90 Zeichen statt 180, und
             * damit ist Platz fuer die Groesse, die ein Beleg im Feed braucht.
             * Vorher stand hier ein Textblock in Aussagengroesse, ueber den
             * das Urteil lautete: „Niemand wuerde sich das oben durchlesen."
             *
             * Ein Zitat, das man liest, ist ein Zitat, das man **sieht** —
             * gehoert wird es ohnehin.
             */
            /*
             * **Die Groesse richtet sich nach der Laenge**, wie beim Satz in
             * `Text` — dort nach dem laengsten Wort, hier nach der Zeichenzahl.
             *
             * Eine feste Groesse hat beides falsch gemacht: In
             * Aussagengroesse war die Karte ein Textblock, ueber den das Urteil
             * lautete „niemand wuerde sich das oben durchlesen"; in
             * Ueberschriftgroesse brach ein Zitat von 79 Zeichen auf sechs
             * Zeilen um, die `passung`-Bremse griff, und **alles** wurde
             * kleiner — Karte und Figuren zusammen. Die Bremse hat richtig
             * gearbeitet und das Bild trotzdem verschlechtert.
             *
             * Der Kernsatz steht gross, ein laengerer Ausschnitt kleiner. Wer
             * die Karte gross will, kuerzt das Zitat — und genau diese
             * Entscheidung gehoert beim Schreiben getroffen.
             *
             * **Die Schwelle liegt bei 40 Zeichen und nicht bei 62.** Der
             * Kernsatz steht gross, ein laengerer Ausschnitt kleiner. Wer die
             * Karte gross will, kuerzt das Zitat — und diese Entscheidung
             * gehoert beim Schreiben getroffen.
             *
             * **Der Faktor 0,72 kommt aus dem Umzug nach unten (01.09.2026).**
             * Zwischen den Fuessen der Figuren und dem unteren Buehnenrand
             * liegen rund 240 Pixel; in voller Groesse deckte die Karte von
             * dort aus die beiden bis zum Kopf. Mit 0,72 bleiben Gesicht und
             * Oberkoerper frei.
             *
             * Der alte Zielkonflikt ist damit erledigt: „Karte und Figuren
             * teilen sich dieselbe Hoehe" stimmt nicht mehr, seit die
             * Figurenbuehne absolut steht. Was die Karte gross macht, macht
             * die Figuren nicht mehr klein — es deckt sie nur zu.
             */
            fontSize: Math.round(
              (szene.zitat.length <= 40 ? GROESSEN.ueberschrift : GROESSEN.aussage) * 0.72,
            ),
            fontStyle: 'italic',
            lineHeight: 1.24,
            color: FARBEN.tinte,
            margin: 0,
          }}
        >
          {'\u201E'}{szene.zitat}{'\u201C'}
        </p>
        {szene.herausgeber && (
          <p
            style={{
              ...grundtext,
              ...text,
              fontSize: GROESSEN.fussnote,
              color: FARBEN.tinteWeich,
              margin: `${ABSTAND.m}px 0 0 0`,
            }}
          >
            {szene.herausgeber}
          </p>
        )}
      </div>
    </Buehne>
  );
};

/* ──────────────────────────── Verteiler ────────────────────────────── */

export const SzeneRendern: React.FC<{ szene: Szene; dauer: number; dienst: Dienst }> = ({
  szene,
  dauer,
  dienst,
}) => {
  switch (szene.art) {
    case 'text':
      return <NurBuehne szene={szene} dauer={dauer} />;
    case 'zahl':
      return <Zahl szene={szene} dauer={dauer} />;
    case 'frage':
      return <Frage szene={szene} dauer={dauer} />;
    case 'zitatkarte':
      return <Zitatkarte szene={szene} dauer={dauer} />;
    case 'schluss':
      return <Schluss szene={szene} dauer={dauer} dienst={dienst} />;
  }

  /*
   * Vollstaendigkeitspruefung zur Uebersetzungszeit.
   *
   * Ohne sie faellt eine neu hinzugefuegte Szenenart hier still durch und
   * rendert ein leeres Bild — sichtbar erst im fertigen Video. Mit ihr
   * beschwert sich `tsc`, sobald eine Art im Vertrag steht, aber nicht im
   * Verteiler. Beim Umbau am 17.08.2026 hat sie genau das geleistet: `frage`
   * und `schluss` standen im Schema, bevor sie hier ankamen.
   */
  const unbehandelt: never = szene;
  throw new Error(`Szenenart ohne Darstellung: ${(unbehandelt as Szene).art}`);
};
