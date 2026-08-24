import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FARBEN, SCHRIFT } from '../src/marke';
import { Figur } from './bausteine/Figur';
import { Symbol } from './bausteine/Geraete';
import { nachleser } from '../daten/figur/nachleser';
import { zeiger } from '../daten/figur/zeiger';
import { POSEN } from './bausteine/posen';

/**
 * Der Prueftisch fuer den Hintergrund. Kein Sendeinhalt.
 *
 * **Warum es ihn gibt.** Der Grund des Kanals ist am 24. und 25.08.2026
 * viermal gewechselt worden — Off-White, Nachtblau, Papier, Blaugrau — und
 * jedes Mal war die Entscheidung an einem Hexwert getroffen und erst am
 * fertigen Video zu sehen. Vier Renderlaeufe fuer eine Frage, die sich in
 * einem Bild beantworten laesst.
 *
 * Die Rechnung allein reicht dafuer nicht: **Alle hellen Kandidaten tragen
 * Schrift und Symbole praktisch gleich** (13,8–16,8 bzw. 4,4–5,3). Was sie
 * unterscheidet, ist Farbton und Helligkeit, und das ist eine Frage ans Auge.
 *
 * Gezeigt wird deshalb jeder Kandidat mit allem, was im Video darauf steht:
 * beide Figuren, ein Symbol, die Schrift in zwei Groessen und der Akzent.
 */

type Kandidat = { hex: string; name: string; notiz: string };

const KANDIDATEN: Kandidat[] = [
  { hex: '#F0EFEB', name: 'Warmes Weiß', notiz: 'gewählt am 25.08.2026' },
  { hex: '#F7F8FA', name: 'Off-White', notiz: 'der Ausgangspunkt' },
  { hex: '#F2F3F5', name: 'Neutralgrau hell', notiz: 'kaum getönt' },
  { hex: '#EBEDF0', name: 'Neutralgrau', notiz: 'eine Stufe tiefer' },
  { hex: '#E4E9EF', name: 'Blaugrau', notiz: 'verworfen' },
  { hex: '#E8EAE6', name: 'Betongrau', notiz: 'minimal grün' },
  { hex: '#EAF0F2', name: 'Helles Cyan', notiz: 'technisch kühl' },
  { hex: '#EDEDF5', name: 'Helles Lavendel', notiz: 'zieht zum Marineblau' },
];

const Feld: React.FC<{ k: Kandidat }> = ({ k }) => (
  <div
    style={{
      backgroundColor: k.hex,
      width: 620,
      height: 660,
      display: 'flex',
      flexDirection: 'column',
      padding: 26,
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        fontFamily: SCHRIFT.familie,
        fontStyle: 'italic',
        fontWeight: SCHRIFT.schwarz,
        fontSize: 44,
        color: FARBEN.tinte,
        lineHeight: 1.1,
      }}
    >
      Voll laden war die Regel.
    </div>

    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
      <div style={{ width: 250, height: 188 }}>
        <Figur rig={nachleser} pose={POSEN.zeigen} />
      </div>
      <div style={{ width: 250, height: 188, marginLeft: -40 }}>
        <Figur rig={zeiger} pose={POSEN.ruhe} />
      </div>
      <Symbol art="lupe" groesse={150} />
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 70, height: 6, borderRadius: 999, backgroundColor: FARBEN.blau }} />
      <span
        style={{
          fontFamily: SCHRIFT.familie,
          fontStyle: 'italic',
          fontWeight: SCHRIFT.fett,
          fontSize: 24,
          color: FARBEN.tinteWeich,
        }}
      >
        Wir haben nachgelesen.
      </span>
    </div>

    <div
      style={{
        marginTop: 14,
        fontFamily: 'Inter',
        fontSize: 19,
        fontWeight: 600,
        color: FARBEN.tinte,
      }}
    >
      {k.hex} · {k.name}
      <span style={{ color: FARBEN.tinteWeich, fontWeight: 400 }}> — {k.notiz}</span>
    </div>
  </div>
);

export const Farbprobe: React.FC = () => (
  <AbsoluteFill style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#2A2E35' }}>
    {KANDIDATEN.map((k) => (
      <Feld key={k.hex} k={k} />
    ))}
  </AbsoluteFill>
);
