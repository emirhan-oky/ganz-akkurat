import React from 'react';
import { FARBEN } from '../../src/marke';

/**
 * Requisiten der Figur — gezeichnet im selben Koordinatenraum wie sie.
 *
 * Sie sind **kein** zweiter Symbolsatz. Die 38 Zeichnungen in `Geraete.tsx`
 * bleiben, wo sie sind, und sind teuer erarbeitet: sieben davon wurden im
 * Standbild verworfen und neu gezeichnet. Hier steht nur, was eine Figur in
 * der Hand hat und was es dort ohne Figur nicht gibt.
 *
 * Es gilt dieselbe Regel wie fuer jede andere Zeichnung: **Gezeichnet wird,
 * was der Satz nennt, nicht was ein Datenblatt behaupten wuerde.** Ein Blatt
 * mit Textstrichen behauptet nichts; ein Blatt mit einem lesbaren Aktenzeichen
 * behauptete eine Quelle, fuer die niemand einsteht.
 */

const KONTUR = {
  fill: FARBEN.grundRein,
  stroke: FARBEN.tinte,
  strokeWidth: 3,
  strokeLinejoin: 'round' as const,
};

const TEXTZEILE = {
  fill: 'none',
  stroke: FARBEN.linie,
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
};

/**
 * Das aufgeschlagene Blatt. Die Requisite des Kanalspruchs.
 *
 * Sie steht **frei** und nicht an einer Hand: An das Handteil gehaengt kippt
 * sie mit dem Unterarm um dreissig Grad, und so haelt niemand ein Blatt. Die
 * Haende der Lesepose greifen von beiden Seiten daran.
 */
export const Blatt: React.FC = () => (
  <g>
    <path d="M 86 94 L 100 97 L 114 94 L 114 110 L 100 113 L 86 110 Z" style={KONTUR} />
    <path d="M 100 97 L 100 113" style={{ ...KONTUR, fill: 'none', strokeWidth: 2 }} />
    <path d="M 90 100 L 96 101" style={TEXTZEILE} />
    <path d="M 90 104 L 96 105" style={TEXTZEILE} />
    <path d="M 104 101 L 110 100" style={TEXTZEILE} />
    <path d="M 104 105 L 110 104" style={TEXTZEILE} />
  </g>
);
