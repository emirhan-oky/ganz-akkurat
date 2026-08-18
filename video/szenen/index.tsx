import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, BUEHNE, FARBEN, GROESSEN, RADIUS, SCHRIFT, SPRUCH, TEMPO } from '../../src/marke';
import type { KontextArt, Szene } from '../../src/typen';
import { Buehne } from '../bausteine/Buehne';
import { Symbol } from '../bausteine/Geraete';
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
  color: FARBEN.tinte,
  letterSpacing: -1,
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

/* ─────────────────────────── Illustration ──────────────────────────── */

/**
 * Groesse der Zeichnung unter dem Text.
 *
 * Die Buehne ist 820 Pixel breit; bei 560 bleibt links und rechts Luft, und
 * die Zeichnung wird nicht groesser als der Text darueber.
 */
const ILLUSTRATION_GROESSE = 560;

/**
 * Die Zeichnung unter dem Text, sofern die Szene eine nennt.
 *
 * Sie tritt **nach** dem Text auf, etwa im ersten Fuenftel der Szene: Erst
 * liest man, was behauptet wird, dann sieht man, wovon die Rede ist. Beides
 * gleichzeitig einzublenden liesse den Blick zwischen zwei Neuigkeiten
 * springen.
 *
 * Seit dem 17.08.2026 gibt es nur noch **eine** Zeichenkategorie. `geraet`
 * ist weg — wir zeichnen keine Buchsen mehr, und die Regel „muss dem
 * Datenblatt entsprechen" ist damit gegenstandslos statt gelockert. Was
 * bleibt, ist das Situationssymbol, das nichts Technisches behauptet.
 *
 * Gibt `undefined` zurueck, wenn nichts gesetzt ist — und das ist jetzt der
 * Normalfall: Die Typografie traegt, die Zeichnung ist die Ausnahme.
 */
const Illustration = (
  szene: { symbol?: KontextArt },
  frame: number,
  fps: number,
  dauer: number,
): React.ReactNode | undefined => {
  if (!szene.symbol) return undefined;
  return (
    <div
      style={{
        ...auftritt(frame, fps, Math.round(dauer * 0.22)),
        marginTop: ABSTAND.l,
        display: 'flex',
        justifyContent: 'center',
        /*
         * Eine Untergrenze, seit dem 17.08.2026.
         *
         * Vorher stand hier `minHeight: 0` neben `maxHeight: '100%'`, und das
         * bedeutet in einer Flex-Spalte: Der Text nimmt sich, was er braucht,
         * die Zeichnung bekommt den Rest. In einer textreichen Szene ist der
         * Rest fast nichts — im gerenderten Sonntag kamen von 560 Pixeln
         * Sollgroesse rund 60 an. Das Symbol war da, aber es las sich als
         * graues Kritzelchen und nicht als Bild.
         *
         * Genau die Sorte Fehler, gegen die die Hausregel steht: Eine
         * Zeichnung ist erst geprueft, wenn sie gerendert danebensteht. Im
         * Code sah `einpassen` vernuenftig aus.
         *
         * 300 Pixel sind gemessen und nicht geraten: Die Buehne ueber der
         * 270-Pixel-Untertitelzone ist rund 1.400 Pixel hoch, die Zeichnung
         * nimmt davon gut ein Fuenftel.
         */
        minHeight: 300,
        maxHeight: '100%',
      }}
    >
      <Symbol art={szene.symbol} groesse={ILLUSTRATION_GROESSE} einpassen />
    </div>
  );
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
  const groesse = aufschlag
    ? laengstesWort <= 11
      ? GROESSEN.hook
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
          fontWeight: aufschlag ? SCHRIFT.schwarz : SCHRIFT.fett,
          fontSize: groesse,
          lineHeight: aufschlag ? 1.04 : 1.16,
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
 * Der Spruch ist nicht verschwunden, er ist umgezogen: Er laeuft oben unter
 * der Kopfzeile mit, an der Stelle, an der sonst der Beleg steht (siehe
 * `Spruchzeile`). Die Wortmarke stand ohnehin die ganze Zeit oben.
 *
 * Keine Dauerbewegung: Der letzte Frame ist der, den die Plattform als
 * Vorschaubild nimmt, wenn wiederholt wird. Der soll stehen.
 */
const Schluss: React.FC<Omit<SzenenProps<'schluss'>, 'dauer'>> = ({ szene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const laengstesWort = Math.max(...szene.satz.split(/\s+/).map((w) => w.length));
  const groesse = laengstesWort <= 13 ? GROESSEN.ueberschrift : 62;

  return (
    <Buehne>
      <p
        style={{
          ...grundtext,
          ...auftritt(frame, fps, 0),
          fontWeight: SCHRIFT.schwarz,
          fontSize: groesse,
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {szene.satz}
      </p>
    </Buehne>
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

/* ──────────────────────────── Verteiler ────────────────────────────── */

export const SzeneRendern: React.FC<{ szene: Szene; dauer: number }> = ({ szene, dauer }) => {
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
    case 'schluss':
      return <Schluss szene={szene} />;
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
