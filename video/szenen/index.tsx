import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, FARBEN, GROESSEN, RADIUS, SCHRIFT } from '../../src/marke';
import type { Szene } from '../../src/typen';
import { Buehne } from '../bausteine/Buehne';
import { Geraet } from '../bausteine/Geraete';
import { auftritt, auftrittGestaffelt, einblenden, impuls, linienFortschritt } from '../bausteine/bewegung';

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

const Hook: React.FC<{ szene: Extract<Szene, { art: 'hook' }> }> = ({ szene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Buehne>
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

const Aussage: React.FC<{ szene: Extract<Szene, { art: 'aussage' }> }> = ({ szene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Das hervorgehobene Wort bekommt Signalblau — der Rest bleibt ruhig.
  const teile = szene.hervorhebung
    ? szene.text.split(new RegExp(`(${szene.hervorhebung.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'))
    : [szene.text];

  return (
    <Buehne>
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

const Zahl: React.FC<{ szene: Extract<Szene, { art: 'zahl' }> }> = ({ szene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Buehne>
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
            fontSize: 220,
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
              fontSize: 76,
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
const Vergleich: React.FC<{ szene: Extract<Szene, { art: 'vergleich' }> }> = ({ szene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const Karte: React.FC<{ seite: typeof szene.links; verzoegerung: number }> = ({ seite, verzoegerung }) => {
    const farben = bewertungsfarben(seite.bewertung);
    return (
      <div
        style={{
          ...auftritt(frame, fps, verzoegerung),
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
              ...auftrittGestaffelt(frame, fps, i, verzoegerung + 6),
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
    <Buehne>
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
        <Karte seite={szene.links} verzoegerung={4} />
        <Karte seite={szene.rechts} verzoegerung={14} />
      </div>
    </Buehne>
  );
};

/* ──────────────────────────── Checkliste ───────────────────────────── */

const Checkliste: React.FC<{ szene: Extract<Szene, { art: 'checkliste' }> }> = ({ szene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Buehne>
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
                ...auftrittGestaffelt(frame, fps, i, 8),
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

const Warnung: React.FC<{ szene: Extract<Szene, { art: 'warnung' }> }> = ({ szene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Buehne>
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
const Anschluss: React.FC<{ szene: Extract<Szene, { art: 'anschluss' }> }> = ({ szene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Buehne>
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
          const verzoegerung = 6 + i * 8;
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

const Cta: React.FC<{ szene: Extract<Szene, { art: 'cta' }> }> = ({ szene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Buehne>
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

/* ──────────────────────────── Verteiler ────────────────────────────── */

export const SzeneRendern: React.FC<{ szene: Szene }> = ({ szene }) => {
  switch (szene.art) {
    case 'hook':
      return <Hook szene={szene} />;
    case 'aussage':
      return <Aussage szene={szene} />;
    case 'zahl':
      return <Zahl szene={szene} />;
    case 'vergleich':
      return <Vergleich szene={szene} />;
    case 'checkliste':
      return <Checkliste szene={szene} />;
    case 'warnung':
      return <Warnung szene={szene} />;
    case 'anschluss':
      return <Anschluss szene={szene} />;
    case 'cta':
      return <Cta szene={szene} />;
  }
};
