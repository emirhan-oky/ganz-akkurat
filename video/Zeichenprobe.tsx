import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FARBEN } from '../src/marke';
import { Doppelzeichen } from './bausteine/Wortmarke';
import { Symbol as Symbolzeichnung } from './bausteine/Geraete';

/**
 * Das Kanalzeichen und das Batteriesymbol — zwei offene Bildfragen von einem
 * Blatt.
 *
 * **1. Steht Watti im Zeichen gestaucht?** Im Video ist er eine Knopfzelle,
 * `scale(1.2 0.74)` um die Standlinie; im Kanalzeichen sind beide Akkus gleich
 * hoch und unterscheiden sich nur an der Polzahl. Die Stauchung macht das
 * Zeichen ehrlicher und riskiert, bei 40 Pixeln schief auszusehen.
 *
 * **2. Liegt `batterie` weiter quer?** Sie liegt, weil eine zweite aufrechte
 * Batterie das Logo doppeln wuerde. Seit die Figuren zu zweit im Bild stehen,
 * ist das Querformat selbst die Dopplung — die Frage hat sich umgedreht.
 *
 * Beides in Bildgroesse und in Kopfzeilengroesse, weil die Antwort in den
 * beiden Groessen verschieden ausfallen kann.
 *
 *     npx remotion still video/index.ts Zeichenprobe zeichen.png
 */
const Feld: React.FC<{ titel: string; kinder: React.ReactNode }> = ({ titel, kinder }) => (
  <div style={{ marginBottom: 34 }}>
    <p style={{ margin: '0 0 12px', fontSize: 18, color: FARBEN.tinteWeich }}>{titel}</p>
    <div
      style={{
        background: FARBEN.grund,
        borderRadius: 12,
        padding: '20px 26px',
        display: 'flex',
        alignItems: 'center',
        gap: 40,
      }}
    >
      {kinder}
    </div>
  </div>
);

export const Zeichenprobe: React.FC = () => (
  <AbsoluteFill style={{ background: FARBEN.grundRein, fontFamily: 'system-ui, sans-serif' }}>
    <div style={{ padding: '40px 54px', display: 'flex', gap: 60 }}>
      <div style={{ width: 620 }}>
        <Feld
          titel="Kanalzeichen — heute: beide gleich hoch"
          kinder={
            <>
              <Doppelzeichen hoehe={120} />
              <Doppelzeichen hoehe={40} />
              <Doppelzeichen hoehe={22} />
            </>
          }
        />
        <Feld
          titel="Kanalzeichen — Watti gestaucht wie im Video"
          kinder={
            <>
              <Doppelzeichen hoehe={120} gestaucht />
              <Doppelzeichen hoehe={40} gestaucht />
              <Doppelzeichen hoehe={22} gestaucht />
            </>
          }
        />
      </div>

      <div style={{ width: 620 }}>
        <Feld
          titel="Szenensymbol `batterie` — heute quer"
          kinder={
            <div style={{ width: 260, height: 190 }}>
              <Symbolzeichnung art="batterie" />
            </div>
          }
        />
        <Feld
          titel="Dasselbe aufrecht gedreht"
          kinder={
            <div style={{ width: 260, height: 190, transform: 'rotate(-90deg)' }}>
              <Symbolzeichnung art="batterie" />
            </div>
          }
        />
      </div>
    </div>
  </AbsoluteFill>
);
