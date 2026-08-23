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

/**
 * Der Zeigestab. Gehoert zur Pose `erklaeren` und zu keiner anderen.
 *
 * Er steht **fest im Koordinatenraum**, genau wie das Blatt, und aus demselben
 * Grund: An ein Handteil gehaengt wuerde er mit dem Unterarm mitkippen und bei
 * jeder Winkelaenderung woandershin zeigen. Ein Zeigestab, der nicht dorthin
 * zeigt, wo die Figur hinsieht, ist keiner.
 *
 * Die Lage ist an `erklaeren` gerechnet. Mit -78 Grad am Oberarm und -12 am
 * Unterarm laeuft die Kette so: Die Hand (144 | 99) dreht erst um den
 * Ellenbogen (144 | 76) auf (148,8 | 98,5), dann um die Schulter (132 | 62)
 * auf **(171,2 | 53,2)**. Der Schaft laeuft durch diesen Punkt.
 *
 * ## Ebene 25, nicht 36
 *
 * Anders als das Blatt liegt er **unter** dem Saumband (30 bis 35). Auf 36 war
 * er im ersten Standbild praktisch unsichtbar: Schaft und Arm haben beide
 * `tinte`, laufen fast parallel und verschmolzen zu einer einzigen dunklen
 * Form — genau das Problem, gegen das der Saum gebaut ist, nur dass der ihn
 * dort nicht erreichte.
 *
 * Unter dem Saum trennt derselbe helle Strich jetzt auch den Arm vom Stab.
 * Die Reihenfolge stimmt dabei weiterhin: Stab, dann Saum, dann Arm mit Hand —
 * die Hand liegt oben und haelt ihn sichtbar.
 */
export const Zeigestab: React.FC = () => (
  <g>
    <path
      d="M 160 71 L 191 20"
      style={{
        fill: 'none',
        stroke: FARBEN.tinte,
        strokeWidth: 4,
        strokeLinecap: 'round' as const,
      }}
    />
    {/* Die Spitze abgesetzt, damit das Ende des Stabs zu sehen ist und nicht
        im Strich verlaeuft. */}
    <path
      d="M 185 30 L 191 20"
      style={{
        fill: 'none',
        stroke: FARBEN.blau,
        strokeWidth: 5,
        strokeLinecap: 'round' as const,
      }}
    />
  </g>
);
