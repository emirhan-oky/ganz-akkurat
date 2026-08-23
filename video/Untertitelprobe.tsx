import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FARBEN, SCHRIFT, GROESSEN } from '../src/marke';

/**
 * Der Prueftisch fuer die Untertitelschrift. Kein Sendeinhalt.
 *
 * Untertitel sind der Teil, den das Publikum bisher gelobt hat, und der
 * einzige, der **wortweise** gelesen wird: Ein Wort steht hell auf blauem
 * Balken, der Rest daneben. Was auf einer Musterseite gut aussieht, kann hier
 * scheitern — an der Laufweite, an der Wortlaenge, am Kasten um das aktive
 * Wort.
 *
 * Geprueft wird deshalb am echten Fall: derselbe Satz, dieselbe Groesse,
 * derselbe blaue Balken um dasselbe Wort. Ein Pangramm haette keinen davon.
 */

const SATZ = ['Jeder', 'Ausdruck', 'trägt', 'die', 'Nummer'];
const AKTIV = 3;

type Kandidat = {
  name: string;
  familie: string;
  gewicht: number;
  kursiv?: boolean;
  versal?: boolean;
  laufweite: number;
  begruendung: string;
};

const KANDIDATEN: Kandidat[] = [
  {
    name: 'Inter 800',
    familie: 'Inter',
    gewicht: SCHRIFT.fett,
    laufweite: -1,
    begruendung: 'Der heutige Stand. Vergleichsmass, nicht Kandidat.',
  },
  {
    name: 'Inter 900 Versalien',
    familie: 'Inter',
    gewicht: SCHRIFT.schwarz,
    versal: true,
    laufweite: -0.5,
    begruendung: 'Dieselbe Schrift, laut gestellt. Kein zweiter Font noetig.',
  },
  {
    name: 'Anton',
    familie: 'Anton',
    gewicht: 400,
    laufweite: 0,
    begruendung: 'Die uebliche Shorts-Schrift: schmal, sehr fett, hohe x-Hoehe.',
  },
  {
    name: 'Archivo Black',
    familie: 'Archivo Black',
    gewicht: 400,
    laufweite: -0.5,
    begruendung: 'Breiter als Anton, ruhiger. Naeher an Inter.',
  },
];

export const Untertitelprobe: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: FARBEN.flaeche, padding: 40 }}>
    <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gap: 24, height: '100%' }}>
      {KANDIDATEN.map((k) => (
        <div
          key={k.name}
          style={{
            backgroundColor: FARBEN.grund,
            borderRadius: 20,
            padding: '20px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 40,
          }}
        >
          <div style={{ width: 320, flexShrink: 0 }}>
            <div
              style={{
                fontFamily: SCHRIFT.familie,
                fontWeight: SCHRIFT.halbfett,
                fontSize: 24,
                color: FARBEN.tinte,
              }}
            >
              {k.name}
            </div>
            <div
              style={{
                fontFamily: SCHRIFT.familie,
                fontSize: 19,
                color: FARBEN.tinteWeich,
                lineHeight: 1.35,
                marginTop: 6,
              }}
            >
              {k.begruendung}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 14px', flex: 1 }}>
            {SATZ.map((wort, i) => {
              const aktiv = i === AKTIV;
              return (
                <span
                  key={wort}
                  style={{
                    fontFamily: k.familie,
                    fontWeight: k.gewicht,
                    fontStyle: k.kursiv ? 'italic' : 'normal',
                    fontSize: GROESSEN.untertitel,
                    lineHeight: 1.18,
                    letterSpacing: k.laufweite,
                    color: aktiv ? '#FFFFFF' : FARBEN.tinte,
                    backgroundColor: aktiv ? FARBEN.blau : 'transparent',
                    padding: aktiv ? '0 10px' : 0,
                    margin: aktiv ? '0 -10px' : 0,
                    borderRadius: 8,
                  }}
                >
                  {k.versal ? wort.toUpperCase() : wort}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);
