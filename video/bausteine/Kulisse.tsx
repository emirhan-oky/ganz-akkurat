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
const Sessel: React.FC<{ x: number; boden: number; groesse?: number; tiefe?: number }> = ({
  x,
  boden,
  groesse = 1.2,
  tiefe = 268,
}) => (
  <g transform={`translate(${x - 80 * groesse} ${boden - tiefe}) scale(${groesse})`}>
    <path d="M58 40h44v50H58Z" fill={FARBEN.gold} stroke={FARBEN.symbolLinie} strokeWidth={6} strokeLinejoin="round" />
    <path d="M34 74a12 12 0 0 1 24 0v22H34Z" fill={FARBEN.gold} stroke={FARBEN.symbolLinie} strokeWidth={6} strokeLinejoin="round" />
    <path d="M102 74a12 12 0 0 1 24 0v22h-24Z" fill={FARBEN.gold} stroke={FARBEN.symbolLinie} strokeWidth={6} strokeLinejoin="round" />
    <rect x="34" y="88" width="92" height="26" rx="8" fill={FARBEN.gold} stroke={FARBEN.symbolLinie} strokeWidth={6} strokeLinejoin="round" />
    <path d="M50 114v14M110 114v14" fill="none" stroke={FARBEN.symbolLinie} strokeWidth={6} strokeLinecap="round" />
  </g>
);

/**
 * Vier Katzen, und **jede eine andere**.
 *
 * Der erste Anlauf zeichnete dieselbe Silhouette viermal und variierte nur die
 * Groesse. Vier identische Bilder an einer Wand sind ein Kachelmuster, keine
 * Sammlung — und das Urteil dazu kam prompt: „Das soll nicht alles dasselbe
 * Bild sein!!!"
 *
 * Dasselbe Prinzip wie ueberall sonst in diesem Projekt: Der Ausruf hat einen
 * Vorrat, die Regieanweisung hat einen Vorrat, die Zugtripel-Regel meldet den
 * Takt. **Was sich wiederholt, faellt auf.**
 *
 * Alle vier ohne Gesicht. Bei dieser Groesse waere es ein Fleck, und was eine
 * Katze erkennbar macht, sind Ohren, Ruecken und Schwanz.
 */
const KATZEN = {
  /** Sitzend, von vorn — Kopf mit Ohren, Koerper, Schwanz seitlich. */
  sitzend: (
    <>
      <path d="M38 44a16 16 0 0 1 24 0l4 26H34Z" />
      <path d="M36 44l-4-14 14 6ZM64 44l4-14-14 6Z" />
      <path d="M34 70h32v12H34Z" />
      <path d="M66 78c10 0 12-8 10-16l-6 2c1 6 0 8-4 8Z" />
    </>
  ),
  /** Liegend, langgestreckt — der Kopf ruht auf den Pfoten. */
  liegend: (
    <>
      <path d="M26 66h48a12 12 0 0 1 0 20H26a10 10 0 0 1 0-20Z" />
      <path d="M22 60a13 13 0 0 1 20 0l2 12H20Z" />
      <path d="M22 60l-3-11 11 5ZM42 60l3-11-11 5Z" />
      <path d="M74 76c8-2 12 2 14 8l-6 2c-2-4-4-5-8-4Z" />
    </>
  ),
  /** Portraet — nur der Kopf, gross im Rahmen. */
  kopf: (
    <>
      <path d="M28 48a22 22 0 0 1 44 0v10a22 22 0 0 1-44 0Z" />
      <path d="M28 46l-5-20 19 8ZM72 46l5-20-19 8Z" />
    </>
  ),
  /** Von hinten — Ruecken und aufgestellter Schwanz, keine Ohren. */
  vonHinten: (
    <>
      <path d="M36 52a14 14 0 0 1 28 0v6a10 10 0 0 1-4 8H40a10 10 0 0 1-4-8Z" />
      <path d="M34 64h32v20H34Z" />
      <path d="M66 84c0-16 4-24 12-28l4 6c-8 4-10 10-10 22Z" />
    </>
  ),
} as const;

/**
 * Ein Bild im Rahmen.
 *
 * Die Rahmen sind schwarz wie die Figuren (`tinte`) und **verschieden gross**
 * — gleich grosse waeren wieder ein Raster.
 */
const Katzenbild: React.FC<{
  x: number;
  y: number;
  groesse: number;
  welche: keyof typeof KATZEN;
}> = ({ x, y, groesse, welche }) => (
  <g transform={`translate(${x} ${y}) scale(${groesse})`}>
    <rect x={0} y={0} width={100} height={100} rx={3} fill={FARBEN.grundRein} stroke={FARBEN.tinte} strokeWidth={7} />
    <g fill={FARBEN.tinte}>{KATZEN[welche]}</g>
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
      **Die Uhr steht wieder rechts oben.** Sie war gefallen, weil ich den Raum
      fuer zu voll hielt — das war nicht meine Entscheidung.
    */}
    <g stroke={FARBEN.symbolLinie} strokeWidth={5} fill={FARBEN.grundRein}>
      <circle cx={links + breite - 150} cy={boden - 560} r={52} />
      <path
        d={`M${links + breite - 150} ${boden - 560}V${boden - 596}M${links + breite - 150} ${boden - 560}l28 20`}
        fill="none"
        strokeLinecap="round"
      />
    </g>

    {/*
      **Die vier Bilder haengen zwischen Fenster und Uhr**, in zwei Reihen zu
      zweit und gegeneinander versetzt. Gleichmaessig gehaengt waeren sie ein
      Raster; versetzt sind sie eine Wand, an der jemand wohnt.
    */}
    <Katzenbild x={links + 340} y={boden - 640} groesse={0.95} welche="sitzend" />
    <Katzenbild x={links + 455} y={boden - 608} groesse={0.78} welche="kopf" />
    <Katzenbild x={links + 334} y={boden - 512} groesse={0.72} welche="vonHinten" />
    <Katzenbild x={links + 442} y={boden - 496} groesse={0.9} welche="liegend" />
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
        **Beide Sessel links, nebeneinander.**

        Zwei Anlaeufe haben sie hinter den Figuren verschwinden lassen, erst
        mittig, dann versetzt. Der Grund ist Geometrie und nicht Platzierung:
        Die beiden Figuren belegen mit ihren 52 Einheiten Halbbreite fast die
        ganze Buehne, und **in einer flachen Zeichnung gibt es kein „weiter
        hinten"** — alles steht auf derselben Linie, und was hinter einer Figur
        steht, ist weg.

        **Und links ist weniger Platz, als „nebeneinander" braucht.** Gemessen:
        Zwischen Vorhangkante und Voltis linker Aussenkante liegen **113
        Pixel**; zwei Sessel nebeneinander brauchen mindestens 186. Sie stehen
        deshalb als Sitzgruppe leicht **versetzt** — der zweite kleiner und
        hoeher, also weiter hinten, und seine Lehne schaut ueber den ersten.

        Das ist die einzige Anordnung, die beide zeigt, ohne dass einer im
        Vorhang oder hinter Volti verschwindet.
      */}
      <Sessel x={links + 78} boden={boden} groesse={0.74} tiefe={214} />
      <Sessel x={links + 142} boden={boden} groesse={0.64} tiefe={244} />

      {/* Die Kommode rechts — sie war den Sesseln gewichen und kommt zurueck. */}
      <Regal boden={boden} />
    </svg>
  );
};
