import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, FARBEN, GROESSEN, RADIUS, SCHRIFT, SICHERE_ZONE } from '../../src/marke';
import { FIGURENNAMEN, type Sprecher, type Tonspur, type Untertitelwort } from '../../src/typen';
import { gruppiere } from './Untertitel';

/**
 * Der Untertitel fuer zwei Stimmen.
 *
 * ## Warum es ihn gibt
 *
 * Der Untertitel unten konnte alles, was er sollte — er wurde von den ersten
 * Zuschauern ausdruecklich gelobt („Design, Untertitel und Machart kamen an,
 * die Laenge nicht"). Was er nicht kann, ist **zeigen, wer spricht.** Bei einer
 * Stimme war das keine Frage; seit dem 25.08.2026 gibt es zwei, und ein
 * Wortwechsel, bei dem man ohne Ton nicht erkennt, wer dran ist, ist keiner.
 *
 * **Das Karaoke-Prinzip zieht deshalb mit um, statt ersetzt zu werden.** Das
 * gerade gesprochene Wort steht weiter auf blauem Grund, die Gruppierung kommt
 * unveraendert aus `gruppiere` in `Untertitel.tsx`. Neu ist nur, **wo** der
 * Text steht und dass ein Name darueber haengt.
 *
 * ## Keine Blase mit Zipfel
 *
 * Eine echte Sprechblase muesste auf den Mund der Figur zeigen, und der sitzt
 * im SVG-Raum der Buehne (200 x 150 Einheiten), waehrend der Text HTML ist.
 * Die Umrechnung zwischen beiden Raeumen ist genau die Sorte Kopplung, an der
 * hier schon die Symbolposition dreimal gescheitert ist.
 *
 * Stattdessen **Seite und Farbe**: Voltis Text steht links und traegt seinen
 * blauen Akzent, Wattis steht rechts in Altrosa — dieselben Seiten, auf denen
 * die Figuren stehen (`WORTWECHSEL` in `Buehnenbild.tsx`), und dieselben
 * Farben wie ihre Ladebalken. Das beantwortet „wer spricht" ohne eine einzige
 * Koordinate aus dem anderen Raum.
 */

const FARBE: Record<Sprecher, string> = {
  nachleser: FARBEN.anzeigeEins,
  zeiger: FARBEN.anzeigeZwei,
};

/**
 * Wer zu dieser Sekunde spricht.
 *
 * Der letzte Abschnitt, dessen Start erreicht ist — dieselbe Rechnung wie bei
 * der Posenkette in `Buehnenbild.tsx`. Zwischen zwei Abschnitten liegt eine
 * Pause von 0,28 Sekunden; in ihr bleibt der vorige Sprecher stehen, sonst
 * blitzt die Blase in jeder Atempause weg.
 */
const sprecherZu = (abschnitte: NonNullable<Tonspur['abschnitte']>, sekunde: number): Sprecher => {
  let wer = abschnitte[0]!.sprecher;
  for (const a of abschnitte) if (sekunde >= a.startSek) wer = a.sprecher;
  return wer;
};

export const Sprechblase: React.FC<{
  woerter: Untertitelwort[];
  abschnitte: NonNullable<Tonspur['abschnitte']>;
}> = ({ woerter, abschnitte }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sekunde = frame / fps;

  if (woerter.length === 0) return null;

  const gruppen = gruppiere(woerter);
  const index = gruppen.findIndex((g, i) => {
    const naechste = gruppen[i + 1];
    return sekunde >= g.startSek && (naechste ? sekunde < naechste.startSek : sekunde <= g.endeSek + 0.6);
  });
  if (index === -1) return null;
  const gruppe = gruppen[index]!;

  /*
   * Der Sprecher wird am **ersten Wort der Gruppe** bestimmt, nicht an der
   * laufenden Sekunde. Sonst wechselte die Blase mitten in einer Gruppe die
   * Seite, wenn ein Abschnitt beginnt, waehrend das letzte Wort des vorigen
   * noch steht — und der Text spraenge im Bild hin und her.
   */
  const wer = sprecherZu(abschnitte, gruppe.startSek);
  const links = wer === 'nachleser';

  /*
   * Schriftgroesse nach dem laengsten Wort, wie beim Untertitel. Der Platz ist
   * hier schmaler, weil die Blase nur eine Bildhaelfte belegt: rund 620 statt
   * 960 Pixel.
   */
  const laengstes = Math.max(...gruppe.woerter.map((w) => w.wort.length));
  const groesse = Math.min(GROESSEN.untertitel, Math.floor(620 / (laengstes * 0.62)));

  return (
    <div
      style={{
        position: 'absolute',
        left: links ? ABSTAND.l : undefined,
        right: links ? undefined : SICHERE_ZONE.rechts - ABSTAND.m,
        // Auf derselben Hoehe wie der einstimmige Untertitel — die Zone ist
        // vermessen und liegt ueber TikToks Bedienleiste.
        bottom: SICHERE_ZONE.unten + ABSTAND.m,
        maxWidth: 620,
        display: 'flex',
        flexDirection: 'column',
        alignItems: links ? 'flex-start' : 'flex-end',
      }}
    >
      {/*
        Das Namensschild. Es ist der eigentliche Zugewinn gegenueber dem
        Untertitel: Ohne Ton steht damit im Bild, wer redet. Klein gesetzt —
        es soll gelesen werden koennen, nicht mit dem Satz konkurrieren.
      */}
      <div
        style={{
          fontFamily: SCHRIFT.familie,
          fontWeight: 700,
          fontSize: 30,
          letterSpacing: 0.5,
          color: '#FFFFFF',
          backgroundColor: FARBE[wer],
          padding: '6px 18px',
          borderRadius: RADIUS.rund,
          marginBottom: 12,
        }}
      >
        {FIGURENNAMEN[wer]}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: links ? 'flex-start' : 'flex-end',
          gap: '0 24px',
          maxWidth: '100%',
        }}
      >
        {gruppe.woerter.map((w, i) => {
          const aktiv = sekunde >= w.startSek && sekunde <= w.endeSek;
          return (
            <span
              key={`${w.wort}-${i}`}
              style={{
                fontFamily: SCHRIFT.untertitel,
                fontStyle: SCHRIFT.neigung,
                fontWeight: SCHRIFT.schwarz,
                fontSize: groesse,
                lineHeight: 1.18,
                color: aktiv ? '#FFFFFF' : FARBEN.tinte,
                letterSpacing: -1,
                // Das aktive Wort traegt die Farbe **seines** Sprechers, nicht
                // pauschal Blau. Damit sagt schon der Balken, wer dran ist.
                backgroundColor: aktiv ? FARBE[wer] : 'transparent',
                padding: aktiv ? '0 10px' : 0,
                margin: aktiv ? '0 -10px' : 0,
                borderRadius: 8,
                textShadow: aktiv
                  ? 'none'
                  : [
                      `0 0 10px ${FARBEN.grund}FA`,
                      `0 0 20px ${FARBEN.grund}EB`,
                      `0 2px 4px ${FARBEN.grund}`,
                    ].join(', '),
              }}
            >
              {w.wort}
            </span>
          );
        })}
      </div>
    </div>
  );
};
