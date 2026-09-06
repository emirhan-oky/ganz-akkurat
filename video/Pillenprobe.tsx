import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FARBEN } from '../src/marke';
import { FORMATE, type Format } from '../src/typen';
import { Kopfzeile } from './bausteine/Wortmarke';

/*
 * **Eine `transform: scale()` aendert das Layout nicht.** Der erste Anlauf
 * dieser Probe setzte die Feed-Spalten auf `width: 1080` und skalierte sie auf
 * 26 % — im Bild waren sie klein, im Layout blieben sie 1080 Pixel breit und
 * schoben die letzte Spalte aus der Komposition. Die Huelle bekommt deshalb
 * die **gerechnete** Breite (1080 x 0,26 = 281) und `overflow: hidden`.
 */

/**
 * Die Kopfzeile aller Formate — mit Pille und ohne, gross und in Feed-Groesse.
 *
 * **Gebaut am 06.09.2026 fuer zwei offene Fragen aus `AUFGABEN.md`:**
 *
 * 1. **Bleibt die Formatpille?** Sie traegt den Showtitel — „Facts", „Beef",
 *    „Kein Zufall" —, und seit dem 02.09.2026 wird er nicht mehr gesprochen.
 *    Ob er im Bild noch etwas beitraegt, entscheidet kein Argument, sondern
 *    dieser Anblick.
 * 2. **Zwei Formate trugen beide Blau.** `absicht` steht seit dem 06.09. auf
 *    Gruen; die schmalen Spalten zeigen, ob das bei Briefmarkengroesse reicht.
 *
 * **Die 26-%-Spalten sind der eigentliche Pruefstein.** Das ist die Breite,
 * mit der ein Short im Feed neben anderen steht. Was dort nicht mehr zu
 * trennen ist, ist im Video nicht getrennt, egal wie es in voller Groesse
 * aussieht.
 *
 *     npx remotion still video/index.ts Pillenprobe pillen.png
 */
export const Pillenprobe: React.FC = () => {
  const formate = Object.keys(FORMATE) as Format[];
  const kopf = (t: string) => (
    <p style={{ margin: '0 0 22px', fontSize: 21, color: FARBEN.tinteWeich }}>{t}</p>
  );
  const zeile = (f: Format, ohnePille: boolean, klein: boolean) => (
    <div
      style={{
        background: FORMATE[f].farbeHell,
        padding: '16px 20px',
        borderRadius: 10,
        width: klein ? 1080 : undefined,
        transform: klein ? 'scale(0.26)' : undefined,
        transformOrigin: 'top left',
      }}
    >
      <Kopfzeile format={f} ohnePille={ohnePille} />
    </div>
  );

  return (
    <AbsoluteFill style={{ background: FARBEN.grundRein, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '40px 50px', display: 'flex', gap: 46 }}>
        <div>
          {kopf('Mit Pille — volle Größe')}
          {formate.map((f) => (
            <div key={f} style={{ marginBottom: 26 }}>
              {zeile(f, false, false)}
              <p style={{ margin: '6px 0 0', fontSize: 17, color: '#8A8078' }}>
                {FORMATE[f].pille} · {FORMATE[f].farbe}
              </p>
            </div>
          ))}
        </div>

        <div>
          {kopf('Ohne Pille')}
          {formate.map((f) => (
            <div key={f} style={{ marginBottom: 26 }}>
              {zeile(f, true, false)}
              <p style={{ margin: '6px 0 0', fontSize: 17, color: '#8A8078' }}>&nbsp;</p>
            </div>
          ))}
        </div>

        <div>
          {kopf('Im Feed, 26 %')}
          {formate.map((f) => (
            <div key={f} style={{ marginBottom: 26, height: 78, width: 281, overflow: 'hidden' }}>
              {zeile(f, false, true)}
            </div>
          ))}
        </div>

        <div>
          {kopf('Im Feed, ohne')}
          {formate.map((f) => (
            <div key={f} style={{ marginBottom: 26, height: 78, width: 281, overflow: 'hidden' }}>
              {zeile(f, true, true)}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
