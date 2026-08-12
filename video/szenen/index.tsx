import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, FARBEN, GROESSEN, RADIUS, SCHRIFT, TEMPO } from '../../src/marke';
import type { Szene } from '../../src/typen';
import { Buehne } from '../bausteine/Buehne';
import { Geraet } from '../bausteine/Geraete';
import {
  auftritt,
  auftrittGestaffelt,
  auftrittImSprechrhythmus,
  einblenden,
  impuls,
  linienFortschritt,
} from '../bausteine/bewegung';

/**
 * Das Szenenvokabular von SetupKlar.
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

/* ─────────────────────────────── Hook ──────────────────────────────── */

type SzenenProps<A extends Szene['art']> = { szene: Extract<Szene, { art: A }>; dauer: number };

const Hook: React.FC<SzenenProps<'hook'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Buehne dauerBilder={dauer}>
      {szene.kontext && (
        <div style={{ ...auftritt(frame, fps, 0), marginBottom: ABSTAND.m }}>
          <span
            style={{
              ...grundtext,
              fontWeight: SCHRIFT.halbfett,
              fontSize: GROESSEN.detail,
              color: FARBEN.blau,
              backgroundColor: FARBEN.blauHell,
              padding: '10px 22px',
              borderRadius: RADIUS.rund,
              letterSpacing: 0,
            }}
          >
            {szene.kontext}
          </span>
        </div>
      )}

      <h1
        style={{
          ...grundtext,
          ...auftritt(frame, fps, 4),
          fontWeight: SCHRIFT.schwarz,
          fontSize: GROESSEN.hook,
          lineHeight: 1.04,
          margin: 0,
        }}
      >
        {szene.text}
      </h1>

      {/* Blauer Balken als Marken-Akzent, faehrt unter dem Text aus. */}
      <div
        style={{
          marginTop: ABSTAND.l,
          height: 12,
          borderRadius: RADIUS.rund,
          backgroundColor: FARBEN.blau,
          width: `${einblenden(frame, 12, 14) * 42}%`,
        }}
      />
    </Buehne>
  );
};

/* ────────────────────────────── Aussage ────────────────────────────── */

const Aussage: React.FC<SzenenProps<'aussage'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Das hervorgehobene Wort bekommt Signalblau — der Rest bleibt ruhig.
  const teile = szene.hervorhebung
    ? szene.text.split(new RegExp(`(${szene.hervorhebung.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'))
    : [szene.text];

  return (
    <Buehne dauerBilder={dauer}>
      <p
        style={{
          ...grundtext,
          ...auftritt(frame, fps, 0),
          fontWeight: SCHRIFT.fett,
          fontSize: GROESSEN.ueberschrift,
          lineHeight: 1.16,
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
    <Buehne dauerBilder={dauer}>
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

/* ──────────────────────────── Checkliste ───────────────────────────── */

const Checkliste: React.FC<SzenenProps<'checkliste'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Buehne dauerBilder={dauer}>
      <h2
        style={{
          ...grundtext,
          ...auftritt(frame, fps, 0),
          fontWeight: SCHRIFT.schwarz,
          fontSize: GROESSEN.ueberschrift,
          lineHeight: 1.15,
          margin: `0 0 ${ABSTAND.xl}px`,
        }}
      >
        {szene.ueberschrift}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: ABSTAND.m }}>
        {szene.punkte.map((punkt, i) => {
          const farben = bewertungsfarben(punkt.bewertung);
          return (
            <div
              key={i}
              style={{
                ...auftrittImSprechrhythmus(frame, fps, i, szene.punkte.length, dauer),
                display: 'flex',
                alignItems: 'center',
                gap: ABSTAND.m,
                backgroundColor: FARBEN.grundRein,
                border: `2px solid ${FARBEN.flaeche}`,
                borderLeft: `10px solid ${farben.vorne}`,
                borderRadius: RADIUS.m,
                padding: `${ABSTAND.m}px ${ABSTAND.l}px`,
              }}
            >
              <span
                style={{
                  ...grundtext,
                  fontWeight: SCHRIFT.schwarz,
                  fontSize: 34,
                  color: farben.vorne,
                  flexShrink: 0,
                  width: 40,
                }}
              >
                {farben.zeichen}
              </span>
              <span style={{ ...grundtext, fontWeight: SCHRIFT.halbfett, fontSize: GROESSEN.fliesstext, lineHeight: 1.3 }}>
                {punkt.text}
              </span>
            </div>
          );
        })}
      </div>
    </Buehne>
  );
};

/* ───────────────────────────── Warnung ─────────────────────────────── */

const Warnung: React.FC<SzenenProps<'warnung'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Buehne dauerBilder={dauer}>
      <div
        style={{
          ...auftritt(frame, fps, 0),
          backgroundColor: FARBEN.neinRotHell,
          border: `3px solid ${FARBEN.neinRot}`,
          borderRadius: RADIUS.l,
          padding: ABSTAND.l,
          transform: `${auftritt(frame, fps, 0).transform} scale(${impuls(frame, fps, 6)})`,
        }}
      >
        <div
          style={{
            ...grundtext,
            fontWeight: SCHRIFT.schwarz,
            fontSize: GROESSEN.detail,
            color: FARBEN.neinRot,
            letterSpacing: 1.5,
            marginBottom: ABSTAND.s,
          }}
        >
          DAS GEHT SCHIEF
        </div>
        <p style={{ ...grundtext, fontWeight: SCHRIFT.fett, fontSize: GROESSEN.aussage, lineHeight: 1.22, margin: 0 }}>
          {szene.text}
        </p>
      </div>

      {szene.loesung && (
        <div
          style={{
            ...auftritt(frame, fps, 16),
            marginTop: ABSTAND.m,
            backgroundColor: FARBEN.jaGruenHell,
            border: `3px solid ${FARBEN.jaGruen}`,
            borderRadius: RADIUS.l,
            padding: ABSTAND.l,
          }}
        >
          <div
            style={{
              ...grundtext,
              fontWeight: SCHRIFT.schwarz,
              fontSize: GROESSEN.detail,
              color: FARBEN.jaGruen,
              letterSpacing: 1.5,
              marginBottom: ABSTAND.s,
            }}
          >
            SO GEHT ES
          </div>
          <p style={{ ...grundtext, fontWeight: SCHRIFT.fett, fontSize: GROESSEN.aussage, lineHeight: 1.22, margin: 0 }}>
            {szene.loesung}
          </p>
        </div>
      )}
    </Buehne>
  );
};

/* ──────────────────────────── Anschluss ────────────────────────────── */

/**
 * Der Signalweg zwischen Geraeten — die Signaturszene dieser Nische.
 * Die Kette laeuft senkrecht: das nutzt das Hochformat und liest sich als
 * Weg von oben nach unten. Ein Bruch wird als rotes Kreuz auf der
 * Verbindungslinie gezeigt, genau dort wo es in der Realitaet scheitert.
 */
const Anschluss: React.FC<SzenenProps<'anschluss'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {szene.kette.map((glied, i) => {
          // Verzoegerung ueber die ganze Szene verteilt statt in festem
          // Abstand am Anfang: das Diagramm baut sich im Sprechtempo auf.
          const verzoegerung = Math.round((i / szene.kette.length) * 0.85 * dauer);
          const bruchHier = szene.bruchNach === i;
          const istLetztes = i === szene.kette.length - 1;

          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div style={{ ...auftritt(frame, fps, verzoegerung), textAlign: 'center' }}>
                <Geraet art={glied.geraet} groesse={240} />
                <div
                  style={{
                    ...grundtext,
                    fontWeight: SCHRIFT.halbfett,
                    fontSize: GROESSEN.detail,
                    marginTop: ABSTAND.xs,
                  }}
                >
                  {glied.beschriftung}
                </div>
              </div>

              {!istLetztes && (
                // Die Verbindung braucht eigene Hoehe, sonst sitzt das
                // Bruchzeichen auf der Beschriftung darueber.
                <div
                  style={{
                    position: 'relative',
                    height: 110,
                    marginTop: ABSTAND.s,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="80" height="110" viewBox="0 0 80 110">
                    <line
                      x1="40"
                      y1="0"
                      x2="40"
                      y2={110 * linienFortschritt(frame, verzoegerung + 6, 10)}
                      stroke={bruchHier ? FARBEN.neinRot : FARBEN.blau}
                      strokeWidth={7}
                      strokeLinecap="round"
                      strokeDasharray={bruchHier ? '14 12' : undefined}
                    />
                  </svg>

                  {bruchHier && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 23,
                        opacity: einblenden(frame, verzoegerung + 14, 8),
                        transform: `scale(${impuls(frame, fps, verzoegerung + 14)})`,
                        width: 64,
                        height: 64,
                        borderRadius: RADIUS.rund,
                        backgroundColor: FARBEN.neinRot,
                        color: FARBEN.grundRein,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: SCHRIFT.familie,
                        fontWeight: SCHRIFT.schwarz,
                        fontSize: 38,
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Buehne>
  );
};

/* ─────────────────────────────── CTA ───────────────────────────────── */

const Cta: React.FC<SzenenProps<'cta'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Buehne dauerBilder={dauer}>
      <div style={{ ...auftritt(frame, fps, 0), textAlign: 'center' }}>
        <p
          style={{
            ...grundtext,
            fontWeight: SCHRIFT.schwarz,
            fontSize: GROESSEN.ueberschrift,
            lineHeight: 1.15,
            margin: `0 0 ${ABSTAND.xl}px`,
          }}
        >
          {szene.text}
        </p>

        <div
          style={{
            ...auftritt(frame, fps, 10),
            display: 'inline-flex',
            alignItems: 'center',
            gap: ABSTAND.s,
            backgroundColor: FARBEN.blau,
            borderRadius: RADIUS.rund,
            padding: `${ABSTAND.m}px ${ABSTAND.xl}px`,
          }}
        >
          <span style={{ fontFamily: SCHRIFT.familie, fontSize: 46, color: FARBEN.grundRein }}>
            <span style={{ fontWeight: SCHRIFT.duenn }}>Setup</span>
            <span style={{ fontWeight: SCHRIFT.fett }}>Klar</span>
          </span>
          <span style={{ fontSize: 40, color: FARBEN.grundRein }}>›</span>
        </div>
      </div>
    </Buehne>
  );
};

/* ───────────────────────────── Endkarte ────────────────────────────── */

/**
 * Die Schlusskarte muss als **Standbild** funktionieren: Sie wird pausiert,
 * fotografiert und weitergeschickt. Deshalb bekommt sie keine Dauerbewegung
 * — die Punkte laufen einmal ein und stehen dann ruhig. Alles, was hier
 * noch wandert, macht den Screenshot unbrauchbar.
 */
const Endkarte: React.FC<SzenenProps<'endkarte'>> = ({ szene, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Punkte laufen im ersten Drittel ein, danach steht die Karte still.
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: ABSTAND.m }}>
          {szene.punkte.map((punkt, i) => (
            <div
              key={i}
              style={{
                ...auftrittImSprechrhythmus(frame, fps, i, szene.punkte.length, einlaufzeit),
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
              <span
                style={{
                  ...grundtext,
                  fontWeight: SCHRIFT.halbfett,
                  fontSize: GROESSEN.fliesstext,
                  lineHeight: 1.32,
                  paddingTop: 2,
                }}
              >
                {punkt}
              </span>
            </div>
          ))}
        </div>

        {/* Markenzeile im Fuss: bleibt auf jedem weitergeschickten Screenshot. */}
        <div
          style={{
            marginTop: ABSTAND.xl,
            paddingTop: ABSTAND.m,
            borderTop: `2px solid ${FARBEN.gitter}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: ABSTAND.m,
          }}
        >
          <span style={{ fontFamily: SCHRIFT.familie, fontSize: 36, color: FARBEN.tinte }}>
            <span style={{ fontWeight: SCHRIFT.duenn }}>Setup</span>
            <span style={{ fontWeight: SCHRIFT.fett }}>Klar</span>
          </span>
          {szene.abschluss && (
            <span
              style={{
                ...grundtext,
                fontWeight: SCHRIFT.halbfett,
                fontSize: GROESSEN.fussnote,
                color: FARBEN.tinteWeich,
                letterSpacing: 0,
                textAlign: 'right',
              }}
            >
              {szene.abschluss}
            </span>
          )}
        </div>
      </div>
    </Buehne>
  );
};

/* ──────────────────────────── Verteiler ────────────────────────────── */

/**
 * `dauer` ist die Laenge dieser Szene in Bildern. Sie stammt aus den echten
 * Sprech-Zeitstempeln und ist deshalb der Taktgeber fuer alles, was sich im
 * Bild aufbaut — nicht eine geschaetzte Sekundenzahl.
 */
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

export const SzeneRendern: React.FC<{ szene: Szene; dauer: number }> = ({ szene, dauer }) => {
  switch (szene.art) {
    case 'hook':
      return <Hook szene={szene} dauer={dauer} />;
    case 'aussage':
      return <Aussage szene={szene} dauer={dauer} />;
    case 'zahl':
      return <Zahl szene={szene} dauer={dauer} />;
    case 'vergleich':
      return <Vergleich szene={szene} dauer={dauer} />;
    case 'checkliste':
      return <Checkliste szene={szene} dauer={dauer} />;
    case 'warnung':
      return <Warnung szene={szene} dauer={dauer} />;
    case 'anschluss':
      return <Anschluss szene={szene} dauer={dauer} />;
    case 'cta':
      return <Cta szene={szene} dauer={dauer} />;
    case 'endkarte':
      return <Endkarte szene={szene} dauer={dauer} />;
    case 'kaufkriterien':
      return <Kaufkriterien szene={szene} dauer={dauer} />;
  }
};
