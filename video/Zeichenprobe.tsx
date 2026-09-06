import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FARBEN } from '../src/marke';
import { Doppelzeichen, Kopfzeile } from './bausteine/Wortmarke';

/**
 * Das Kanalzeichen: beide Akkus gleich hoch, oder Watti gestaucht wie im Video?
 *
 * Im Video ist er eine Knopfzelle — `scale(1.2 0.74)` um die Standlinie. Das
 * Zeichen unterscheidet die beiden bisher nur an der Polzahl, und die
 * verschwindet als erstes, wenn es klein wird.
 *
 * **Drei Groessen, weil die Antwort in jeder anders ausfallen kann**, und
 * darunter dieselbe Frage in der echten Kopfzeile.
 *
 *     npx remotion still video/index.ts Zeichenprobe zeichen.png
 */
const Feld: React.FC<{ titel: string; kinder: React.ReactNode }> = ({ titel, kinder }) => (
  <div style={{ marginBottom: 26 }}>
    <p style={{ margin: '0 0 10px', fontSize: 19, color: FARBEN.tinteWeich }}>{titel}</p>
    <div
      style={{
        background: FARBEN.grund,
        borderRadius: 12,
        padding: '22px 30px',
        display: 'flex',
        alignItems: 'center',
        gap: 52,
      }}
    >
      {kinder}
    </div>
  </div>
);

export const Zeichenprobe: React.FC = () => (
  <AbsoluteFill style={{ background: FARBEN.grundRein, fontFamily: 'system-ui, sans-serif' }}>
    <div style={{ padding: '38px 50px' }}>
      <Feld
        titel="Heute — beide gleich hoch, Unterschied nur an den Polen"
        kinder={
          <>
            <Doppelzeichen hoehe={200} gestaucht={false} />
            <Doppelzeichen hoehe={90} gestaucht={false} />
            <Doppelzeichen hoehe={40} gestaucht={false} />
            <Doppelzeichen hoehe={22} gestaucht={false} />
          </>
        }
      />
      <Feld
        titel="Mit Stauchung — Watti als Knopfzelle, wie im Video"
        kinder={
          <>
            <Doppelzeichen hoehe={200} gestaucht />
            <Doppelzeichen hoehe={90} gestaucht />
            <Doppelzeichen hoehe={40} gestaucht />
            <Doppelzeichen hoehe={22} gestaucht />
          </>
        }
      />
      <div style={{ display: 'flex', gap: 40, marginTop: 6 }}>
        <div style={{ background: FARBEN.grund, borderRadius: 12, padding: '18px 24px' }}>
          <p style={{ margin: '0 0 10px', fontSize: 17, color: FARBEN.tinteWeich }}>
            Kopfzeile — jetzt mit Stauchung
          </p>
          <Kopfzeile format="gibtswirklich" />
        </div>

      </div>
    </div>
  </AbsoluteFill>
);
