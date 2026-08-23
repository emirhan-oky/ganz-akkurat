import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FARBEN, SCHRIFT, GROESSEN } from '../src/marke';

/**
 * Der Prueftisch fuer die Aufschlagschrift. Kein Sendeinhalt.
 *
 * Er steht hier aus demselben Grund wie `Figurenprobe`: Eine Schrift laesst
 * sich nicht aus einem Namen beurteilen. Was auf einer Musterseite elegant
 * aussieht, kann bei 104 Pixeln ueber drei Zeilen zerfallen — und genau so
 * steht der Aufschlag im Short.
 *
 * Geprueft wird deshalb **am echten Satz**, nicht an einem Pangramm: „Handy
 * aus. Sonst stuerzt es ab." bricht in drei Zeilen um und enthaelt ein
 * Umlaut-Ü. Beides sind die Faelle, an denen eine Schrift hier scheitert.
 *
 * Die Kandidaten stehen alle bei Google Fonts und laufen damit lokal ueber
 * `@remotion/google-fonts`. Die Schriften aus den Vorbildern — Macabro Danger,
 * Ketchup Manis, Margin — sind Canva-Schriften und dort nicht enthalten.
 */

const SATZ = 'Handy aus. Sonst stürzt es ab.';

type Kandidat = {
  name: string;
  familie: string;
  gewicht: number;
  kursiv: boolean;
  /** Was diese Wahl behauptet. Ein Name allein entscheidet nichts. */
  begruendung: string;
};

const KANDIDATEN: Kandidat[] = [
  {
    name: 'Inter 900',
    familie: 'Inter',
    gewicht: SCHRIFT.schwarz,
    kursiv: false,
    begruendung: 'Der heutige Stand. Vergleichsmass, nicht Kandidat.',
  },
  {
    name: 'Fraunces 900 kursiv',
    familie: 'Fraunces',
    gewicht: 900,
    kursiv: true,
    begruendung: 'Schwer und eigenwillig. Am naechsten an den Vorbildern.',
  },
  {
    name: 'Instrument Serif kursiv',
    familie: 'Instrument Serif',
    gewicht: 400,
    kursiv: true,
    begruendung: 'Schlank und redaktionell. Passt zum Belegapparat.',
  },
  {
    name: 'Playfair Display 900 kursiv',
    familie: 'Playfair Display',
    gewicht: 900,
    kursiv: true,
    begruendung: 'Hoher Strichkontrast. Duenne Stellen sind das Risiko.',
  },
];

export const Schriftprobe: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: FARBEN.flaeche, padding: 32 }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, height: '100%' }}>
      {KANDIDATEN.map((k) => (
        <div
          key={k.name}
          style={{
            backgroundColor: FARBEN.grund,
            borderRadius: 24,
            padding: 28,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontFamily: SCHRIFT.familie,
              fontWeight: SCHRIFT.halbfett,
              fontSize: 22,
              color: FARBEN.tinteWeich,
              marginBottom: 20,
            }}
          >
            {k.name}
          </div>

          <p
            style={{
              fontFamily: k.familie,
              fontWeight: k.gewicht,
              fontStyle: k.kursiv ? 'italic' : 'normal',
              fontSize: GROESSEN.hook,
              lineHeight: 1.04,
              letterSpacing: -1,
              color: FARBEN.tinte,
              margin: 0,
            }}
          >
            {SATZ}
          </p>

          {/* Der blaue Balken gehoert zum Aufschlag und steht mit im Bild:
              Er entscheidet mit, ob die Schrift darueber schwer genug wirkt. */}
          <div
            style={{
              marginTop: 28,
              height: 12,
              width: '42%',
              borderRadius: 999,
              backgroundColor: FARBEN.blau,
            }}
          />

          <div style={{ flex: 1 }} />

          {/* Die Kopfzeile bleibt Inter. Sie steht hier, weil die eigentliche
              Frage nicht ist, ob die Schrift schoen ist, sondern ob sie neben
              der Wortmarke bestehen kann. */}
          <div
            style={{
              fontFamily: SCHRIFT.familie,
              fontWeight: SCHRIFT.fett,
              fontSize: 30,
              color: FARBEN.tinte,
              marginBottom: 10,
            }}
          >
            Ganz<span style={{ fontWeight: SCHRIFT.schwarz }}>akkurat</span>
          </div>
          <div
            style={{
              fontFamily: SCHRIFT.familie,
              fontSize: 20,
              color: FARBEN.tinteWeich,
              lineHeight: 1.35,
            }}
          >
            {k.begruendung}
          </div>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);
