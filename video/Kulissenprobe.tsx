import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BUEHNE, FARBEN, FORMAT } from '../src/marke';
import { Kulisse } from './bausteine/Kulisse';
import { Vorhangstoff, RUHE } from './bausteine/Vorhang';
import { Figur } from './bausteine/Figur';
import { POSEN } from './bausteine/posen';
import { nachleser } from '../daten/figur/nachleser';
import { zeiger } from '../daten/figur/zeiger';

/**
 * **Frage: liest sich der Raum als Ort?**
 *
 *     npx remotion still video/index.ts Kulissenprobe kulisse.png
 *     npx remotion still video/index.ts Kulissenprobe ohne.png --props='{"mitKulisse":false}'
 *
 * ## Was der erste Anlauf falsch machte
 *
 * Er steckte im Buehnenkasten und hoerte an vier Seiten auf — ein Poster an
 * der Wand, kein Zimmer. Und er stand ganz in Grau, weil er den Zeichenstil
 * der Requisiten uebernahm; der ist richtig fuer einen Gegenstand **auf** der
 * Buehne und falsch fuer den Raum, in dem sie steht.
 *
 * Diese Probe zeigt deshalb **mit Vorhang**: Die Frage nach den Raendern laesst
 * sich ohne ihn nicht beantworten.
 *
 * ## Was zu sehen sein muss
 *
 * Die Fuesse der Figuren beruehren die Bodenkante — nicht darueber, nicht
 * darin. Beide SVGs rechnen dafuer dieselbe Zahl aus `standlinieImBild()`.
 */
export const Kulissenprobe: React.FC<{ mitKulisse?: boolean; mitVorhang?: boolean }> = ({
  mitKulisse = true,
  mitVorhang = true,
}) => (
  <AbsoluteFill style={{ backgroundColor: FARBEN.grund }}>
    {mitKulisse && <Kulisse />}
    {mitVorhang && <Vorhangstoff zu={RUHE} breite={FORMAT.breite} hoehe={FORMAT.hoehe} />}
    <div
      style={{
        position: 'absolute',
        left: BUEHNE.x,
        top: BUEHNE.y,
        width: BUEHNE.breite,
        height: BUEHNE.hoeheOhneUntertitel,
      }}
    >
      <svg
        viewBox="0 0 200 150"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <ellipse cx={50} cy={140} rx={34 * 0.73} ry={9 * 0.73} fill={FARBEN.flaeche} opacity={0.4} />
        <ellipse cx={150} cy={140} rx={34 * 0.73} ry={9 * 0.73} fill={FARBEN.flaeche} opacity={0.4} />
        <g transform="translate(50 140) scale(0.73) translate(-100 -140)">
          <Figur rig={nachleser} pose={POSEN.ruhe} />
        </g>
        <g transform="translate(150 140) scale(0.73) translate(-100 -140) translate(200 0) scale(-1 1)">
          <Figur rig={zeiger} pose={POSEN.ruhe} />
        </g>
      </svg>
    </div>
    <div
      style={{
        position: 'absolute',
        bottom: 30,
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: 24,
        color: FARBEN.tinte,
        opacity: 0.45,
      }}
    >
      {mitKulisse ? 'mit Kulisse' : 'ohne'} · {FORMAT.breite}×{FORMAT.hoehe}
    </div>
  </AbsoluteFill>
);
