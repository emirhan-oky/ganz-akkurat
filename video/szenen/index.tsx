import { AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, BUEHNE, FARBEN, GROESSEN, RADIUS, SCHRIFT, SPRUCH, TEMPO } from '../../src/marke';
import type { Buehnenbild as BuehnenbildDaten, KontextArt, Szene } from '../../src/typen';
import { Buehne } from '../bausteine/Buehne';
import { Figur } from '../bausteine/Figur';
import { nachleser } from '../../daten/figur/nachleser';
import { ZEIGER_STAUCHUNG, zeiger } from '../../daten/figur/zeiger';
import { FOLGEPOSEN, POSEN } from '../bausteine/posen';
import { Buehnenbild } from '../bausteine/Buehnenbild';
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
const Illustration = (
  szene: { buehne?: BuehnenbildDaten },
  frame: number,
  fps: number,
  dauer: number,
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
          marginTop: ABSTAND.xl,
          display: 'flex',
          justifyContent: 'center',
          minHeight: 0,
          flex: 1,
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
        <Buehnenbild buehne={szene.buehne} dauer={dauer} />
      </div>
    );
  }

  return undefined;
};

/* ─────────────────────────────── Text ──────────────────────────────── */

type SzenenProps<A extends Szene['art']> = { szene: Extract<Szene, { art: A }>; dauer: number };

/**
 * Der gesprochene Satz im Bild — das Arbeitspferd, in zwei Groessen.
 *
 * Hier standen bis zum 17.08.2026 **zwei** Komponenten: `Hook` und `Aussage`.
 * Sie unterschieden sich in der Schriftgroesse, im blauen Balken darunter und
 * in einer Kontextpille, die zweimal in fuenf Shorts benutzt wurde. Der Rest
 * war derselbe Absatz.
 *
 * Was sie wirklich unterschied, war nicht die Art, sondern die **Position**:
 * Der Aufschlag steht gross, die Mitte steht normal. Genau das entscheidet
 * jetzt `szene.position`, und die zweite Komponente ist entfallen.
 *
 * Der blaue Balken bleibt dem Aufschlag vorbehalten. Er ist die einzige
 * Bewegung in der Szene und markiert den Anfang des Videos — unter jedem Satz
 * waere er Dekoration.
 */
const Text: React.FC<SzenenProps<'text'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const aufschlag = szene.position === 'aufschlag';

  /*
   * Die Schriftgroesse richtet sich nach dem **laengsten Wort**, nicht nach
   * der Gesamtlaenge: Ein langer Satz bricht um, ein langes Wort nicht.
   * „Zwanzigtausend." lief bei der festen Groesse von 104 Pixeln ueber den
   * rechten Rand der Buehne — genau dorthin, wo TikTok seine Bedienleiste
   * einblendet. Deutsche Komposita sind lang, und die Buehne ist 1100 Pixel
   * breit.
   */
  const laengstesWort = Math.max(...szene.text.split(/\s+/).map((w) => w.length));

  /*
   * Ein Aufschlag mit Buehne steht eine Stufe kleiner.
   *
   * Der Grund ist gemessen: `BUEHNE.hoehe` betraegt **730 Pixel** — von den
   * 1920 des Formats gehen 420 an die sichere Zone oben, 500 an die unten und
   * 270 an die Untertitelzone. Ein dreizeiliger Aufschlag in 104 Pixeln
   * braucht davon mit dem blauen Balken rund 400, und fuer die Zeichnung
   * bleiben 330. Die Figur wurde dadurch zum Daumennagel.
   *
   * Bei 86 Pixeln passt derselbe Satz auf zwei Zeilen: rund 250 Pixel statt
   * 400, und die Buehne bekommt 480 statt 330. Das ist der Tausch, um den es
   * geht — der Aufschlag verliert ein Sechstel Schriftgroesse, die Zeichnung
   * gewinnt die Haelfte an Flaeche.
   *
   * Ohne Buehne bleibt es bei 104: Dort ist der ganze Platz seiner.
   */
  const grosseStufe = aufschlag && !szene.buehne ? GROESSEN.hook : 86;

  const groesse = aufschlag
    ? laengstesWort <= 11
      ? grosseStufe
      : laengstesWort <= 14
        ? 86
        : laengstesWort <= 17
          ? 72
          : 62
    : laengstesWort <= 15
      ? GROESSEN.ueberschrift
      : 62;

  // Das hervorgehobene Wort bekommt Signalblau — der Rest bleibt ruhig.
  const teile = szene.hervorhebung
    ? szene.text.split(new RegExp(`(${szene.hervorhebung.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'))
    : [szene.text];

  return (
    <Buehne dauerBilder={dauer} illustration={Illustration(szene, frame, fps, dauer)}>
      <p
        style={{
          ...grundtext,
          ...auftritt(frame, fps, 0),
          /*
           * Der Aufschlag steht in der Auszeichnungsschrift, alles danach in
           * Inter. Er ist die einzige Position, die im Feed ueber das Video
           * entscheidet — und die einzige, die nicht wortweise mitgelesen,
           * sondern als Bild erfasst wird.
           */
          fontWeight: aufschlag ? SCHRIFT.schwarz : SCHRIFT.fett,
          fontSize: groesse,
          lineHeight: aufschlag ? 1.06 : 1.16,
          margin: 0,
        }}
      >
        {teile.map((teil, i) =>
          szene.hervorhebung && teil.toLowerCase() === szene.hervorhebung.toLowerCase() ? (
            <span key={i} style={{ color: FARBEN.blau }}>
              {teil}
            </span>
          ) : (
            <span key={i}>{teil}</span>
          ),
        )}
      </p>

      {aufschlag && (
        <div
          style={{
            marginTop: ABSTAND.l,
            height: 12,
            borderRadius: RADIUS.rund,
            backgroundColor: FARBEN.blau,
            width: `${einblenden(frame, 12, 14) * 42}%`,
          }}
        />
      )}
    </Buehne>
  );
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
  const wertGroesse = zeichen <= 4 ? 220 : zeichen <= 7 ? 180 : zeichen <= 10 ? 140 : 112;
  const einheitGroesse = Math.round(wertGroesse * 0.38);

  return (
    <Buehne dauerBilder={dauer} illustration={Illustration(szene, frame, fps, dauer)}>
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
          marginTop: ABSTAND.l,
        }}
      >
        {szene.bedeutung}
      </p>
    </Buehne>
  );
};

/* ───────────────────────────── Vergleich ───────────────────────────── */

/**
 * Im Hochformat werden die beiden Seiten uebereinander gestapelt, nicht
 * nebeneinander. Nebeneinander blieben je Spalte rund 400 Pixel — zu wenig
 * fuer lesbare Spezifikationszeilen.
 */
const Vergleich: React.FC<SzenenProps<'vergleich'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Die zweite Karte erscheint erst, wenn die Stimme bei ihr angekommen ist.
  // Beide gleichzeitig zu zeigen nimmt dem Vergleich die Spannung.
  const Karte: React.FC<{ seite: typeof szene.links; index: number }> = ({ seite, index }) => {
    const farben = bewertungsfarben(seite.bewertung);
    return (
      <div
        style={{
          ...auftrittImSprechrhythmus(frame, fps, index, 2, dauer),
          backgroundColor: seite.bewertung ? farben.hinten : FARBEN.grundRein,
          border: `3px solid ${seite.bewertung ? farben.vorne : FARBEN.flaeche}`,
          borderRadius: RADIUS.l,
          padding: ABSTAND.l,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: ABSTAND.s, marginBottom: ABSTAND.m }}>
          {seite.bewertung && (
            <span
              style={{
                ...grundtext,
                fontWeight: SCHRIFT.schwarz,
                fontSize: 40,
                color: FARBEN.grundRein,
                backgroundColor: farben.vorne,
                width: 56,
                height: 56,
                borderRadius: RADIUS.rund,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {farben.zeichen}
            </span>
          )}
          <span style={{ ...grundtext, fontWeight: SCHRIFT.schwarz, fontSize: GROESSEN.aussage }}>{seite.titel}</span>
        </div>

        {seite.zeilen.map((zeile, i) => (
          <div
            key={i}
            style={{
              ...grundtext,
              ...auftrittGestaffelt(frame, fps, i, 6),
              fontWeight: SCHRIFT.normal,
              fontSize: GROESSEN.fliesstext,
              color: FARBEN.tinteWeich,
              lineHeight: 1.5,
              letterSpacing: -0.3,
            }}
          >
            {zeile}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Buehne dauerBilder={dauer}>
      {szene.ueberschrift && (
        <h2
          style={{
            ...grundtext,
            ...auftritt(frame, fps, 0),
            fontWeight: SCHRIFT.fett,
            fontSize: GROESSEN.aussage,
            margin: `0 0 ${ABSTAND.l}px`,
          }}
        >
          {szene.ueberschrift}
        </h2>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: ABSTAND.m }}>
        <Karte seite={szene.links} index={0} />
        <Karte seite={szene.rechts} index={1} />
      </div>
    </Buehne>
  );
};

/* ─────────────────────────── Einschraenkung ────────────────────────── */

/**
 * Die Kehrseite — Grenzfall oder Folgekosten.
 *
 * Bewusst ruhig gehalten und **nicht** in Warnrot: Das hier ist keine
 * Warnung, sondern eine Praezisierung. Wer die Ausnahme in Alarmfarbe setzt,
 * macht aus „so genau ist es" ein „Achtung, Gefahr" — und verschenkt genau
 * die Souveraenitaet, wegen der die Szene ueberhaupt existiert.
 */
const Einschraenkung: React.FC<SzenenProps<'einschraenkung'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Buehne dauerBilder={dauer} illustration={Illustration(szene, frame, fps, dauer)}>
      {szene.ueberschrift && (
        <p
          style={{
            ...grundtext,
            ...auftritt(frame, fps, 0),
            fontWeight: SCHRIFT.fett,
            fontSize: GROESSEN.aussage,
            color: FARBEN.tinteWeich,
            margin: `0 0 ${ABSTAND.l}px 0`,
          }}
        >
          {szene.ueberschrift}
        </p>
      )}

      {/*
       * Bedingung und Folge sind zwei Gedanken und bekommen je einen
       * Abschnitt der Szene. Vorher standen beide nach 0,2 und 1,1 Sekunden
       * fest — die Folge war da, bevor die Stimme die Bedingung zu Ende
       * gesprochen hatte.
       */}
      <div
        style={{
          ...auftrittImSprechrhythmus(frame, fps, 0, 2, dauer),
          borderLeft: `10px solid ${FARBEN.blau}`,
          paddingLeft: ABSTAND.l,
        }}
      >
        <p
          style={{
            ...grundtext,
            fontWeight: SCHRIFT.fett,
            fontSize: GROESSEN.ueberschrift,
            lineHeight: 1.16,
            margin: 0,
          }}
        >
          {szene.bedingung}
        </p>
        <p
          style={{
            ...grundtext,
            opacity: einblenden(frame, abschnitt(1, 2, dauer).start),
            fontSize: GROESSEN.fliesstext,
            color: FARBEN.tinteWeich,
            lineHeight: 1.3,
            margin: `${ABSTAND.m}px 0 0 0`,
          }}
        >
          {szene.folge}
        </p>
      </div>
    </Buehne>
  );
};

/* ───────────────────────────── Schluss ─────────────────────────────── */

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
  tiktok: { art: 'zeile', versatz: -86 },
  instagram: { art: 'frei', links: 290, unten: 348, breite: 240 },
  youtube: { art: 'frei', links: 580, unten: 348, breite: 240 },
};

const Schluss: React.FC<Omit<SzenenProps<'schluss'>, 'dauer'> & { dienst: Dienst }> = ({
  szene,
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
  const figur = (
    <g transform={ZEIGER_STAUCHUNG}>
      <Figur rig={zeiger} pose={FOLGEPOSEN[dienst]} />
    </g>
  );

  return (
    <>
      {/*
       * Der freie Platz haengt nicht an der Buehne, sondern am Bild — deshalb
       * ein eigener `AbsoluteFill` neben ihr statt eines Slots in ihr. Er
       * steht **vor** der Buehne im Markup, damit die Figur hinter dem Text
       * liegt, falls beide sich je beruehren.
       */}
      {platz.art === 'frei' && (
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

      <Buehne>
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
        {platz.art === 'zeile' && (
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
      </Buehne>
    </>
  );
};

/* ──────────────────────────── Kaufkriterien ─────────────────────────── */

/**
 * Die Erntekarte des Kaufwinkels.
 *
 * Sie sieht der Endkarte bewusst aehnlich — gleicher Rahmen, gleiche
 * Nummernkreise —, weil sie dieselbe Aufgabe hat: als Standbild ueberleben.
 * Der Unterschied liegt im `pruefen`-Detail unter jedem Kriterium und im
 * abgesetzten Verweis am Fuss. Wer das Video anhaelt, hat eine Einkaufsliste
 * statt eines Merksatzes.
 */
const Kaufkriterien: React.FC<SzenenProps<'kaufkriterien'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Wie bei der Endkarte: Einlauf im ersten Drittel, danach steht die Karte.
  const einlaufzeit = Math.round(dauer * 0.34);

  return (
    <Buehne>
      <div
        style={{
          ...auftritt(frame, fps, 0),
          backgroundColor: FARBEN.grundRein,
          border: `4px solid ${FARBEN.tinte}`,
          borderRadius: RADIUS.l,
          padding: ABSTAND.xl,
          boxShadow: '0 18px 48px rgba(17,24,32,0.10)',
        }}
      >
        <h2
          style={{
            ...grundtext,
            fontWeight: SCHRIFT.schwarz,
            fontSize: GROESSEN.ueberschrift,
            lineHeight: 1.12,
            margin: `0 0 ${ABSTAND.l}px`,
          }}
        >
          {szene.ueberschrift}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: ABSTAND.l }}>
          {szene.kriterien.map((kriterium, i) => (
            <div
              key={i}
              style={{
                ...auftrittImSprechrhythmus(frame, fps, i, szene.kriterien.length, einlaufzeit),
                display: 'flex',
                alignItems: 'flex-start',
                gap: ABSTAND.m,
              }}
            >
              <span
                style={{
                  ...grundtext,
                  fontWeight: SCHRIFT.schwarz,
                  fontSize: 34,
                  color: FARBEN.grundRein,
                  backgroundColor: FARBEN.blau,
                  minWidth: 52,
                  height: 52,
                  borderRadius: RADIUS.rund,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: ABSTAND.xs, paddingTop: 2 }}>
                <span
                  style={{
                    ...grundtext,
                    fontWeight: SCHRIFT.halbfett,
                    fontSize: GROESSEN.fliesstext,
                    lineHeight: 1.32,
                  }}
                >
                  {kriterium.text}
                </span>

                {/* Wo das Merkmal nachzulesen ist — macht das Kriterium pruefbar
                    statt zu einer Behauptung, der man glauben muss. */}
                {kriterium.pruefen && (
                  <span
                    style={{
                      ...grundtext,
                      fontWeight: SCHRIFT.normal,
                      fontSize: GROESSEN.detail,
                      color: FARBEN.tinteWeich,
                      letterSpacing: 0,
                      lineHeight: 1.28,
                    }}
                  >
                    {kriterium.pruefen}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Der Verweis loest die Werbekennzeichnung aus (siehe Short-Schema).
            Deshalb steht er sichtbar abgesetzt und nicht als Nebensatz. */}
        {szene.verweis && (
          <div
            style={{
              ...auftritt(frame, fps, einlaufzeit + TEMPO.einblenden),
              marginTop: ABSTAND.xl,
              backgroundColor: FARBEN.blauHell,
              borderRadius: RADIUS.m,
              padding: `${ABSTAND.m}px ${ABSTAND.l}px`,
              display: 'flex',
              alignItems: 'center',
              gap: ABSTAND.m,
            }}
          >
            <span style={{ ...grundtext, fontSize: 40, color: FARBEN.blau, flexShrink: 0 }}>↓</span>
            <span
              style={{
                ...grundtext,
                fontWeight: SCHRIFT.halbfett,
                fontSize: GROESSEN.detail,
                color: FARBEN.blau,
                letterSpacing: 0,
                lineHeight: 1.28,
              }}
            >
              {szene.verweis}
            </span>
          </div>
        )}
      </div>
    </Buehne>
  );
};

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
    <Buehne dauerBilder={dauer}>
      <div
        style={{
          ...rahmen,
          backgroundColor: FARBEN.flaeche,
          borderRadius: RADIUS.m,
          padding: `${ABSTAND.l}px ${ABSTAND.l}px`,
          // Der blaue Balken links ist das Zitatzeichen. Er kostet nichts an
          // Hoehe und sagt auf einen Blick: Das hier ist nicht von uns.
          borderLeft: `10px solid ${FARBEN.blau}`,
        }}
      >
        <p
          style={{
            ...grundtext,
            ...text,
            fontSize: GROESSEN.aussage,
            fontStyle: 'italic',
            lineHeight: 1.32,
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
      return <Text szene={szene} dauer={dauer} />;
    case 'zahl':
      return <Zahl szene={szene} dauer={dauer} />;
    case 'frage':
      return <Frage szene={szene} dauer={dauer} />;
    case 'vergleich':
      return <Vergleich szene={szene} dauer={dauer} />;
    case 'einschraenkung':
      return <Einschraenkung szene={szene} dauer={dauer} />;
    case 'zitatkarte':
      return <Zitatkarte szene={szene} dauer={dauer} />;
    case 'schluss':
      return <Schluss szene={szene} dienst={dienst} />;
    case 'kaufkriterien':
      return <Kaufkriterien szene={szene} dauer={dauer} />;
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
