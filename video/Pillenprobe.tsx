import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FARBEN } from '../src/marke';
import { FORMATE, type Format } from '../src/typen';
import { Kopfzeile } from './bausteine/Wortmarke';

/**
 * Die Kopfzeile aller Formate — gross und in Feed-Groesse.
 *
 * **Gebaut am 06.09.2026 fuer zwei offene Fragen aus `AUFGABEN.md`:**
 *
 * 1. **Bleibt die Formatpille?** Sie traegt den Showtitel — „Facts", „Beef",
 *    „Kein Zufall" —, und seit dem 02.09.2026 wird er nicht mehr gesprochen.
 *    Ob er im Bild noch etwas beitraegt, entscheidet kein Argument, sondern
 *    dieser Anblick.
 * 2. **Zwei Formate trugen beide Blau.** `absicht` steht seit dem 06.09. auf
 *    Gruen; die rechte Spalte zeigt, ob das bei Briefmarkengroesse reicht.
 *
 * **Die rechte Spalte ist der eigentliche Pruefstein.** Sie zeigt dieselbe
 * Kopfzeile bei 26 % — das ist die Breite, mit der ein Short im Feed neben
 * anderen steht. Was dort nicht mehr zu trennen ist, ist im Video nicht
 * getrennt, egal wie es in voller Groesse aussieht.
 *
 *     npx remotion still video/index.ts Pillenprobe pillen.png
 *     npx remotion still video/index.ts Pillenprobe ohne.png --props='{"mitPille":false}'
 */
export const Pillenprobe: React.FC<{ mitPille?: boolean }> = ({ mitPille = true }) => {
  const formate = Object.keys(FORMATE) as Format[];
  return (
    <AbsoluteFill style={{ background: FARBEN.grundRein, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '46px 60px', display: 'flex', gap: 70 }}>
        <div>
          <p style={{ margin: '0 0 26px', fontSize: 22, color: FARBEN.tinteWeich }}>
            Kopfzeile in voller Größe {mitPille ? '' : '— ohne Pille'}
          </p>
          {formate.map((f) => (
            <div key={f} style={{ marginBottom: 34 }}>
              <div style={{ background: FORMATE[f].farbeHell, padding: '18px 22px', borderRadius: 10 }}>
                <Kopfzeile format={f} {...(mitPille ? {} : {})} />
              </div>
              <p style={{ margin: '8px 0 0', fontSize: 19, color: '#8A8078' }}>
                {FORMATE[f].pille} · {FORMATE[f].farbe}
              </p>
            </div>
          ))}
        </div>

        <div>
          <p style={{ margin: '0 0 26px', fontSize: 22, color: '#6B6B6B' }}>
            Dieselbe Zeile bei 26 % — so steht sie im Feed
          </p>
          {formate.map((f) => (
            <div key={f} style={{ marginBottom: 34, height: 92 }}>
              <div
                style={{
                  transform: 'scale(0.26)',
                  transformOrigin: 'top left',
                  background: FORMATE[f].farbeHell,
                  padding: '18px 22px',
                  borderRadius: 10,
                  width: 1080,
                }}
              >
                <Kopfzeile format={f} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
