import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, FARBEN, SCHRIFT, SICHERE_ZONE, VORHANG, standlinieImBild } from '../../src/marke';
import type { Sprecher, Tonspur, Untertitelwort } from '../../src/typen';
import { gruppiere } from './Untertitel';

/**
 * Das Gesprochene unter den Figuren — zwei Spalten, die sich fuellen.
 *
 * ## Warum es das wieder gibt
 *
 * Der Untertitel unten war am 31.08.2026 abgeschaltet worden, weil er zu zweit
 * nicht funktionierte: „das sieht mit den Untertiteln so unfassbar scheisse
 * aus, wenn beide Charaktere im Bild sind". Die Zuordnung traegt seitdem der
 * Name ueber der Figur.
 *
 * Mit der Kulisse dahinter faellt der Preis auf: Die Flaeche unter den Figuren
 * ist leer, waehrend die beiden reden. Der Befund am ersten Video mit Raum:
 * „mir ist aufgefallen, dass, wenn die beiden sprechen, es im Bild leer wirkt."
 *
 * **Der Unterschied zur alten Sprechblase ist der Ort und das Sammeln.** Sie
 * stand als ein Block unten in der Bildmitte und zeigte immer nur die laufende
 * Gruppe; hier steht der Text unter der Figur, die ihn sagt, und die Zeilen
 * bleiben bis zum Ende der Szene stehen. Das Bild fuellt sich, waehrend das
 * Gespraech laeuft, und leert sich mit dem Schnitt.
 *
 * ## Warum die Spalten fest stehen und nicht an der Figur haengen
 *
 * Der Text sitzt unter dem **Standplatz**, nicht unter der gerenderten Figur.
 * Die Kamera faehrt im Buehnen-SVG bis Zoom 1,24 (`PLAETZE` in
 * `Buehnenbild.tsx`) — wer den Text pixelgenau an die Figur bindet, rechnet
 * zwischen SVG-Raum und Pixelraum um und laesst ihn bei jeder Fahrt mitwandern.
 * Genau diese Kopplung ist hier dreimal gescheitert, zuletzt an der
 * Symbolposition, und aus demselben Grund hatte die Sprechblase nie einen
 * Zipfel: **Seite und Farbe beantworten „wer spricht" ohne eine einzige
 * umgerechnete Koordinate.**
 *
 * ## Die Hoehe
 *
 * Oben beginnt die Spalte an den Fuessen (`standlinieImBild()` plus etwas
 * Luft), unten endet sie an der sicheren Zone. Das sind rund 240 Pixel — genug
 * fuer drei bis vier kleine Zeilen je Figur. Was darueber hinaus anfaellt,
 * rutscht oben heraus: Die aeltesten Zeilen fallen weg, statt in TikToks
 * Bedienleiste zu wachsen.
 */

const FARBE: Record<Sprecher, string> = {
  nachleser: FARBEN.anzeigeEins,
  zeiger: FARBEN.anzeigeZwei,
};

/** Luft zwischen den Fuessen der Figur und der ersten Zeile. */
const LUFT = 18;

/** Wie viele Zeilen je Figur hoechstens stehen bleiben. */
const MAX_ZEILEN = 4;

/**
 * Wer diesen Abschnitt spricht.
 *
 * Der letzte Abschnitt, dessen Start erreicht ist — dieselbe Rechnung wie in
 * `Sprechblase.tsx` und bei der Posenkette. In der Pause zwischen zwei
 * Abschnitten bleibt der vorige Sprecher stehen.
 */
const sprecherZu = (abschnitte: NonNullable<Tonspur['abschnitte']>, sekunde: number): Sprecher => {
  let wer = abschnitte[0]!.sprecher;
  for (const a of abschnitte) if (sekunde >= a.startSek) wer = a.sprecher;
  return wer;
};

/** Welche Szene laeuft — die Spalten leeren sich an jeder Grenze. */
const szeneZu = (startSek: number[], sekunde: number): number => {
  let i = 0;
  for (const [n, s] of startSek.entries()) if (sekunde >= s) i = n;
  return i;
};

export const Redespalten: React.FC<{
  woerter: Untertitelwort[];
  abschnitte: NonNullable<Tonspur['abschnitte']>;
  /** Beginn jeder Szene in Sekunden — aus `tonspur.szenenStartSek`. */
  szenenStartSek: number[];
  /**
   * Wer in dieser Szene **links** steht, je Szene.
   *
   * Das ist keine Konstante: `wer` an der Figurenbuehne darf wechseln, und
   * genau dafuer gibt es das Feld — feste Rollen an festen Figuren waeren nach
   * vier Videos wieder eine Schablone. Die Spalten muessen dem folgen, sonst
   * steht Voltis Satz unter Watti. Genau das zeigte das erste Standbild.
   */
  linksJeSzene: Sprecher[];
  /**
   * Die Art jeder Szene — die Zitatkarte schaltet die Spalten ab.
   *
   * **Der Grund steht im ersten Durchgang durchs fertige Video und war am
   * Standbild nicht zu sehen:** Die Karte steht seit dem 01.09.2026 unten, und
   * die Spalten liegen im Markup darueber. Vier Zeilen Gespraech schimmerten
   * quer durch das Zitat, in zwei Farben und zwei Schriftgroessen.
   *
   * Sie unter die Szene zu legen waere die schlechtere Loesung: Dann stuende
   * die Haelfte jeder Zeile unter der Karte und der Rest ragte darunter hervor.
   * In dieser Szene traegt das Zitat, und ein Zitat teilt sich die Flaeche
   * nicht.
   */
  szenenArt: string[];
}> = ({ woerter, abschnitte, szenenStartSek, linksJeSzene, szenenArt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sekunde = frame / fps;

  if (woerter.length === 0) return null;

  const szene = szeneZu(szenenStartSek, sekunde);
  const abSek = szenenStartSek[szene] ?? 0;
  const linksSteht = linksJeSzene[szene] ?? 'nachleser';
  if (szenenArt[szene] === 'zitatkarte') return null;

  /*
   * Alle Gruppen der laufenden Szene, die bereits begonnen haben. Eine Gruppe
   * gehoert zur Szene, wenn sie in ihr **anfaengt** — ein Satz, der ueber die
   * Szenengrenze laeuft, bleibt bei seinem Anfang stehen, statt in der Mitte
   * die Spalte zu wechseln.
   */
  const sichtbar = gruppiere(woerter).filter((g) => g.startSek >= abSek && sekunde >= g.startSek);
  if (sichtbar.length === 0) return null;

  const spalte = (wer: Sprecher) => {
    const meine = sichtbar.filter((g) => sprecherZu(abschnitte, g.startSek) === wer);
    const gezeigt = meine.slice(-MAX_ZEILEN);
    const links = wer === linksSteht;

    return (
      <div
        style={{
          position: 'absolute',
          top: standlinieImBild() + LUFT,
          bottom: SICHERE_ZONE.unten,
          /*
           * Die beiden Haelften der Buehne, jeweils um den Vorhangstreifen
           * eingerueckt. Links steht Volti, rechts Watti — dieselben Seiten wie
           * `WORTWECHSEL` in `Buehnenbild.tsx`.
           */
          left: links ? VORHANG.rand + ABSTAND.s : '50%',
          right: links ? '50%' : VORHANG.rand + ABSTAND.s,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 6,
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {gezeigt.map((g, i) => {
          /*
           * Die aelteren Zeilen stehen gedaempft. Sie sind Nachhall, nicht
           * Ansage — wer sie so hell setzt wie die laufende, macht aus dem
           * Gespraech eine Textwand.
           *
           * **0,62 und nicht 0,42.** Der erste Wert war am vollen Bild
           * gewaehlt; im Feed ist der Short 512 Pixel breit, und dort waren
           * die aelteren Zeilen nicht mehr zu lesen. Gedaempft heisst leiser,
           * nicht weg.
           */
          const jetzt = i === gezeigt.length - 1;
          return (
            <div
              key={`${wer}-${g.startSek}`}
              style={{
                fontFamily: SCHRIFT.untertitel,
                fontStyle: SCHRIFT.neigung,
                fontWeight: SCHRIFT.schwarz,
                fontSize: 46,
                lineHeight: 1.14,
                letterSpacing: -0.5,
                color: FARBE[wer],
                opacity: jetzt ? 1 : 0.62,
                textShadow: [
                  `0 0 10px ${FARBEN.grundRein}FA`,
                  `0 0 20px ${FARBEN.grundRein}EB`,
                ].join(', '),
              }}
            >
              {g.woerter.map((w) => w.wort).join(' ')}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {spalte('nachleser')}
      {spalte('zeiger')}
    </>
  );
};
