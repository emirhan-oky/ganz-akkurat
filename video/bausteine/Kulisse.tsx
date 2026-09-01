import React from 'react';
import { FARBEN, FORMAT, VORHANG, standlinieImBild } from '../../src/marke';

/**
 * Der Ort, an dem die Show spielt — ein Wohnzimmer.
 *
 * ## Warum es sie gibt
 *
 * Bis zum 01.09.2026 stand ueber den Figuren ein grosser Szenentext, und der
 * Befund am fertigen Video war: „Das Geschriebene oben macht sowieso keinen
 * Sinn." Er stimmte doppelt — bei zwei Stimmen traegt die Sprechblase den
 * gesprochenen Satz Wort fuer Wort, waehrend oben ein zweiter, anderer Satz
 * stand. Der Zuschauer las zweimal.
 *
 * An seine Stelle tritt kein besserer Text, sondern ein **Ort**. Der Kanal ist
 * seit dem 31.08. eine Show mit Vorhang; was fehlte, war das, was hinter dem
 * Vorhang steht.
 *
 * ## Warum ein Wohnzimmer
 *
 * Volti und Watti sind seit dem 01.09.2026 **Brueder** (siehe `voice.md`).
 * Brueder streiten nicht in einem Studio, und ein Moderationspult erklaert
 * nicht, warum keiner geht, wenn es nervt.
 *
 * **Ein Ort fuer alle Videos.** Neun Videos haben 2.212 Aufrufe und **0
 * Abonnenten** gebracht. Man abonniert Leute und Orte, keine Fakten — und ein
 * Ort, den man wiedererkennt, entsteht nur, wenn er derselbe bleibt.
 *
 * ## Randlos, und warum das der zweite Anlauf ist
 *
 * Der erste steckte im Buehnenkasten: 710 x 1000 Pixel, zentriert im 1080er
 * Bild. Er hoerte an vier Seiten auf und las sich als **Poster an der Wand**,
 * nicht als Zimmer. Jetzt fuellt die Kulisse die volle Flaeche zwischen den
 * Vorhaengen — 880 x 1920 Pixel.
 *
 * ## Die eine Zahl, die beide Seiten teilen
 *
 * Die Bodenkante muss dort liegen, wo die Figuren stehen, und die stehen in
 * einem **anderen** SVG. Das ist genau die Kopplung, an der die Symbolposition
 * dreimal gescheitert ist.
 *
 * Der Unterschied: Es ist eine einzige Zahl, keine Position je Gegenstand.
 * `standlinieImBild()` in `src/marke.ts` rechnet sie aus den Konstanten, die
 * sie bestimmen; beide Seiten lesen dieselbe Funktion. **Eine geteilte
 * Konstante kann nicht auseinanderlaufen.**
 *
 * ## Die Farben gehoeren den Figuren
 *
 * Nichts ist erfunden. Die Wand steht in **Voltis** Hellton (`blauHell`), der
 * Boden in **Wattis** (`anzeigeZweiHell`), die Moebel in ihren Vollfarben. Der
 * Raum gehoert damit buchstaeblich den beiden — und die kuehle Wand setzt die
 * fast schwarzen Figuren ab, waehrend der warme Boden sie traegt.
 *
 * Der erste Anlauf stand ganz in Grau, weil er den Zeichenstil der Requisiten
 * uebernahm. Der ist richtig fuer einen Gegenstand **auf** der Buehne und
 * falsch fuer den Raum, in dem sie steht.
 */

/** Wie weit die Wand hinter der Standlinie endet, in Pixeln. */
const SOCKEL = 26;

const links = VORHANG.rand;
const breite = FORMAT.breite - 2 * VORHANG.rand;

/**
 * Die Tapete — dasselbe isometrische Raster wie im Hintergrund, nur still.
 *
 * Eine Tapete, die driftet, ist ein Fehler und keine Textur. Eigene Kennung,
 * weil zwei `pattern` mit derselben id im SVG ein Fehler sind, den niemand
 * meldet.
 */
const Tapete: React.FC = () => (
  <pattern id="kulisseRaster" width={44} height={26} patternUnits="userSpaceOnUse">
    <path d="M0 13 22 0l22 13M0 13l22 13 22-13" fill="none" stroke={FARBEN.gitter} strokeWidth={1.4} />
  </pattern>
);

/**
 * Die Moebel stehen **auf** der Bodenkante.
 *
 * Der erste Anlauf setzte sie an die Wand, und im Standbild schwebten sie. Die
 * Formen sind aus `Geraete.tsx` abgeleitet — dieselbe Strichfuehrung, andere
 * Groesse und Farbe. **Abgeleitet und nicht abgeschrieben**, aus demselben
 * Grund, aus dem `zeiger.ts` vom `nachleser` ableitet: Zwei Zeichnungen
 * desselben Gegenstands laufen beim ersten Umbau auseinander, und zwar
 * lautlos.
 */
const Sofa: React.FC<{ boden: number }> = ({ boden }) => (
  <g transform={`translate(${links + 10} ${boden - 236}) scale(1.3)`}>
    <path d="M58 40h84v50H58Z" fill={FARBEN.anzeigeEins} stroke={FARBEN.symbolLinie} strokeWidth={5} strokeLinejoin="round" />
    <path d="M34 74a12 12 0 0 1 24 0v22H34Z" fill={FARBEN.anzeigeEins} stroke={FARBEN.symbolLinie} strokeWidth={5} strokeLinejoin="round" />
    <path d="M142 74a12 12 0 0 1 24 0v22h-24Z" fill={FARBEN.anzeigeEins} stroke={FARBEN.symbolLinie} strokeWidth={5} strokeLinejoin="round" />
    <rect x="34" y="88" width="132" height="26" rx="8" fill={FARBEN.anzeigeEins} stroke={FARBEN.symbolLinie} strokeWidth={5} strokeLinejoin="round" />
    <path d="M52 114v14M148 114v14" fill="none" stroke={FARBEN.symbolLinie} strokeWidth={5} strokeLinecap="round" />
  </g>
);

/**
 * Ein Sessel — dasselbe Moebelstueck wie das Sofa, nur fuer einen.
 *
 * Zwei davon stehen **hinter** den Figuren, an deren x-Positionen. Die Figuren
 * verdecken sie zur Haelfte, und genau das macht aus zwei Zeichnungen einen
 * Raum mit Tiefe: Was vollstaendig zu sehen ist, steht daneben; was halb
 * verdeckt ist, steht dahinter.
 *
 * `gold` und nicht `achtungGelb`: Der zweite ist der Signalton fuer Warnungen.
 * Ein Sessel in derselben Farbe wie ein Hinweis wird zum Hinweis.
 */
const Sessel: React.FC<{ x: number; boden: number }> = ({ x, boden }) => (
  <g transform={`translate(${x - 96} ${boden - 268}) scale(1.2)`}>
    <path d="M58 40h44v50H58Z" fill={FARBEN.gold} stroke={FARBEN.symbolLinie} strokeWidth={6} strokeLinejoin="round" />
    <path d="M34 74a12 12 0 0 1 24 0v22H34Z" fill={FARBEN.gold} stroke={FARBEN.symbolLinie} strokeWidth={6} strokeLinejoin="round" />
    <path d="M102 74a12 12 0 0 1 24 0v22h-24Z" fill={FARBEN.gold} stroke={FARBEN.symbolLinie} strokeWidth={6} strokeLinejoin="round" />
    <rect x="34" y="88" width="92" height="26" rx="8" fill={FARBEN.gold} stroke={FARBEN.symbolLinie} strokeWidth={6} strokeLinejoin="round" />
    <path d="M50 114v14M110 114v14" fill="none" stroke={FARBEN.symbolLinie} strokeWidth={6} strokeLinecap="round" />
  </g>
);

/**
 * Eine Katze im Rahmen.
 *
 * **Ohne Gesicht.** Bei dieser Groesse waere es ein Fleck, und der Kanal
 * zeichnet nichts, was er nicht erkennbar zeichnen kann — dieselbe Regel, aus
 * der es keine Buchsenformen und keine Pinbelegungen gibt.
 *
 * Was eine Katze erkennbar macht, sind die Ohren und der Schwanz, nicht das
 * Gesicht.
 */
const Katzenbild: React.FC<{ x: number; y: number; groesse: number }> = ({ x, y, groesse }) => (
  <g transform={`translate(${x} ${y}) scale(${groesse})`}>
    <rect x={0} y={0} width={100} height={100} rx={3} fill={FARBEN.grundRein} stroke={FARBEN.tinte} strokeWidth={7} />
    {/* Sitzende Katze: Kopf mit Ohren, Koerper, Schwanz. */}
    <g fill={FARBEN.tinte}>
      <path d="M38 44a16 16 0 0 1 24 0l4 26H34Z" />
      <path d="M36 44l-4-14 14 6ZM64 44l4-14-14 6Z" />
      <path d="M34 70h32v12H34Z" />
      <path d="M66 78c10 0 12-8 10-16l-6 2c1 6 0 8-4 8Z" />
    </g>
  </g>
);

const Regal: React.FC<{ boden: number }> = ({ boden }) => (
  <g transform={`translate(${links + breite - 300} ${boden - 300}) scale(1.4)`}>
    <rect x="34" y="26" width="132" height="104" rx="8" fill={FARBEN.anzeigeZwei} stroke={FARBEN.symbolLinie} strokeWidth={5} strokeLinejoin="round" />
    <path d="M34 78h132" fill="none" stroke={FARBEN.symbolLinie} strokeWidth={5} strokeLinecap="round" />
    <rect fill={FARBEN.grundRein} x="46" y="38" width="14" height="34" rx="3" />
    <rect fill={FARBEN.grundRein} x="66" y="42" width="14" height="30" rx="3" />
    <rect fill={FARBEN.grundRein} x="86" y="36" width="14" height="36" rx="3" />
    <rect fill={FARBEN.grundRein} x="112" y="86" width="34" height="30" rx="3" />
  </g>
);

/**
 * Was an der Wand haengt.
 *
 * **Der leere Teil ist das eigentliche Problem eines hohen Raums.** Ueber den
 * Figuren stehen ueber 900 Pixel Wand; ohne etwas darauf liest sich das nicht
 * als Zimmer, sondern als Flaeche.
 *
 * Beides haengt auf **Kopfhoehe der Figuren und darueber** — was tiefer haenge,
 * stuende hinter ihnen und waere verdeckt.
 */
const Wandschmuck: React.FC<{ boden: number }> = ({ boden }) => (
  <>
    {/*
      Das Fenster zeigt Himmel, nicht Weiss. Die Sonne steht **in der Ecke**
      und nicht mittig: Mittig waere sie ein Symbol, in der Ecke ist sie ein
      Ausschnitt — man sieht einen Teil von etwas, das weitergeht.
    */}
    <g>
      <clipPath id="kulisseFenster">
        <rect x={links + 96} y={boden - 620} width={200} height={250} rx={8} />
      </clipPath>
      <g clipPath="url(#kulisseFenster)">
        <rect x={links + 96} y={boden - 620} width={200} height={250} fill={FARBEN.achtungGelbHell} />
        <circle cx={links + 250} cy={boden - 566} r={40} fill={FARBEN.gold} />
        {/* Zwei Wolken, damit der Himmel Himmel ist und nicht Farbe. */}
        <g fill={FARBEN.grundRein} opacity={0.85}>
          <ellipse cx={links + 150} cy={boden - 470} rx={40} ry={15} />
          <ellipse cx={links + 176} cy={boden - 478} rx={26} ry={13} />
        </g>
      </g>
      <g stroke={FARBEN.symbolLinie} strokeWidth={5} strokeLinejoin="round" fill="none">
        <rect x={links + 96} y={boden - 620} width={200} height={250} rx={8} />
        <path d={`M${links + 196} ${boden - 620}v250M${links + 96} ${boden - 495}h200`} />
      </g>
    </g>
    {/*
      **Vier Katzenbilder, versetzt gehaengt.** Gleichmaessig waeren sie ein
      Raster; versetzt sind sie eine Wand, an der jemand wohnt.
      Die Uhr, die hier stand, ist dafuer gefallen — Fenster, vier Bilder, zwei
      Sessel, Sofa und Regal sind genug Dinge in einem Raum, und sie war der
      schwaechste Beitrag.
    */}
    <Katzenbild x={links + breite - 330} y={boden - 640} groesse={1.05} />
    <Katzenbild x={links + breite - 200} y={boden - 610} groesse={0.85} />
    <Katzenbild x={links + breite - 336} y={boden - 500} groesse={0.8} />
    <Katzenbild x={links + breite - 214} y={boden - 476} groesse={1.0} />
  </>
);

/**
 * Die Kulisse, von hinten nach vorn.
 *
 * Sie liegt im Hintergrund — hinter allem, aber **vor** dem Vorhang. Der bleibt
 * der Rahmen, und ein Zimmer, das ueber den Vorhang laeuft, waere kein Zimmer
 * hinter einer Buehne mehr.
 */
export const Kulisse: React.FC<{ mitUntertitelzone?: boolean }> = ({
  mitUntertitelzone = false,
}) => {
  const boden = standlinieImBild(mitUntertitelzone) - SOCKEL;
  return (
    <svg
      viewBox={`0 0 ${FORMAT.breite} ${FORMAT.hoehe}`}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <defs>
        <Tapete />
        {/*
          Der Boden bekommt einen Verlauf nach hinten: dort, wo er die Wand
          trifft, ist er dunkler. Eine Flaeche in einer Farbe liest sich flach,
          und ein Raum ohne Tiefe ist eine Wand mit Muster.
        */}
        <linearGradient id="kulisseBoden" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={FARBEN.anzeigeZwei} stopOpacity={0.34} />
          <stop offset="0.35" stopColor={FARBEN.anzeigeZweiHell} />
          <stop offset="1" stopColor={FARBEN.anzeigeZweiHell} />
        </linearGradient>
      </defs>

      {/* Wand */}
      <rect x={links} y={0} width={breite} height={boden} fill={FARBEN.blauHell} />
      <rect x={links} y={0} width={breite} height={boden} fill="url(#kulisseRaster)" />

      <Wandschmuck boden={boden} />

      {/* Boden */}
      <rect x={links} y={boden} width={breite} height={FORMAT.hoehe - boden} fill="url(#kulisseBoden)" />
      {/*
        Dielen, in die Fluchtpunkte laufend. **Der Boden ist 41 % des Bildes**,
        und eine Flaeche dieser Groesse ohne Struktur liest sich nicht als
        Boden, sondern als Rand. Die Fugen laufen auseinander, weil ein Boden
        auf den Betrachter zukommt — parallele Linien waeren eine Wand, die
        umgefallen ist.
      */}
      {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${links + breite / 2 + i * 96} ${boden}L${links + breite / 2 + i * 260} ${FORMAT.hoehe}`}
          stroke={FARBEN.anzeigeZwei}
          strokeWidth={2.5}
          opacity={0.28}
          fill="none"
        />
      ))}

      {/*
        Die Scheuerleiste. Sie ist das eine Element, das aus zwei Flaechen einen
        Raum macht: Erst durch sie hat er eine Tiefe, in der etwas stehen kann.
      */}
      <rect x={links} y={boden - 14} width={breite} height={14} fill={FARBEN.grundRein} />
      <path
        d={`M${links} ${boden}h${breite}`}
        fill="none"
        stroke={FARBEN.symbolLinie}
        strokeWidth={4}
        opacity={0.5}
      />

      {/*
        **Die Sessel stehen dort, wo vorher Sofa und Regal standen.**

        Zwei Anlaeufe haben sie hinter den Figuren verschwinden lassen, erst
        mittig, dann versetzt — und der Grund ist die Geometrie, nicht die
        Position: Die beiden Figuren belegen mit ihren 52 Einheiten Halbbreite
        fast die ganze Buehne. **In einer flachen Zeichnung gibt es kein
        „weiter hinten"**; alles steht auf derselben Linie, und was hinter
        einer Figur steht, ist weg.

        Also stehen sie neben ihnen, aussen. Sofa und Regal weichen dafuer —
        sie waren ohnehin meine Zutat, bestellt waren zwei Sessel.
      */}
      <Sessel x={links + 132} boden={boden} />
      <Sessel x={links + breite - 132} boden={boden} />
    </svg>
  );
};
