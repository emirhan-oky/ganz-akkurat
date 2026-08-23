import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { FARBEN, SCHRIFT } from '../src/marke';
import { nachleser } from '../daten/figur/nachleser';
import { Figur } from './bausteine/Figur';
import { POSEN, poseAus } from './bausteine/posen';
import type { PosenName } from '../src/figur';
import { Blatt } from './bausteine/Requisiten';
import { Buehnenbild } from './bausteine/Buehnenbild';
import type { Buehnenbild as Buehnenbilddaten } from '../src/typen';

/**
 * Der Prueftisch fuer die Figur. Kein Sendeinhalt.
 *
 * Er steht in `Root.tsx` neben den Kanalbildern und aus demselben Grund: Eine
 * Zeichnung ist erst geprueft, wenn sie gerendert danebensteht — und was von
 * Hand geprueft wird, wird irgendwann nicht mehr geprueft. Als Komposition
 * laesst sich jede Pose mit einem Befehl als Standbild herausschreiben.
 *
 * Zwei Ansichten, weil sie zwei verschiedene Fehler finden:
 *
 * - **`Figurenprobe`** zeigt alle Posen nebeneinander. Sie findet, was im
 *   Code richtig aussieht und im Bild nicht: abgeloeste Gliedmassen, falsche
 *   Ebenenreihenfolge, ein Auge, das nicht mehr im Kopf sitzt.
 * - **`Figurengang`** laeuft ueber die Zeit. Sie findet die eingefrorene
 *   Animation — die Bewegungsprobe der QA-Kette, die aus abgetasteten
 *   Einzelbildern echte Unterschiede verlangt.
 */

const REIHE: PosenName[] = ['ruhe', 'lesen', 'zeigen', 'stutzen', 'staunen', 'achselzucken'];

export const Figurenprobe: React.FC<{ geruest?: boolean }> = ({ geruest = false }) => (
  <AbsoluteFill style={{ backgroundColor: FARBEN.grund, padding: 40 }}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 24,
        width: '100%',
        height: '100%',
      }}
    >
      {REIHE.map((name) => (
        <div
          key={name}
          style={{
            backgroundColor: FARBEN.grundRein,
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 16,
          }}
        >
          <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
            <Figur
              rig={nachleser}
              pose={POSEN[name]}
              geruest={geruest}
              // Die Lesepose wird mit ihrer Requisite geprueft, nicht ohne.
              // Ohne Blatt ist sie kein zu zahmer Ausdruck, sondern falsch —
              // und eine Probe, die den falschen Zustand zeigt, prueft nichts.
              requisiten={name === 'lesen' ? [{ inhalt: <Blatt />, ebene: 36 }] : []}
            />
          </div>
          <div
            style={{
              fontFamily: SCHRIFT.familie,
              fontWeight: SCHRIFT.halbfett,
              fontSize: 28,
              color: FARBEN.tinteWeich,
            }}
          >
            {name}
          </div>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

/**
 * Die Bewegungsprobe als Standbild: vier Zeitpunkte nebeneinander.
 *
 * Sie ist die vierte Stufe der QA-Kette in Form eines einzigen Bildes. Ihr
 * Gegenstand ist der Fehler, den keine der anderen Stufen findet: die
 * Animation, die im Code richtig aussieht und im Render steht. Abgetastete
 * Einzelbilder muessen sich **sichtbar** unterscheiden — steht viermal
 * dasselbe da, ist die Zeitachse tot, auch wenn jede Zahl stimmt.
 *
 * Die Zeitpunkte sind gewaehlt, nicht gleichmaessig verteilt: Bild 2 faellt
 * in den Lidschluss (Takt 97, Dauer 5), Bild 12 mitten in den Uebergang,
 * Bild 45 in die Ruhe danach, Bild 99 in das zweite Blinzeln. Vier
 * gleichmaessige Abstaende haetten das Blinzeln zuverlaessig verpasst.
 */
const ABTASTUNG = [2, 12, 45, 99];

export const Figurenfolge: React.FC<{ pose?: PosenName }> = ({ pose = 'zeigen' }) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: FARBEN.grund, padding: 40 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, height: '100%' }}>
        {ABTASTUNG.map((bild) => (
          <div
            key={bild}
            style={{
              backgroundColor: FARBEN.grundRein,
              borderRadius: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 16,
            }}
          >
            <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
              <Figur rig={nachleser} pose={poseAus({ frame: bild, fps, pose })} />
            </div>
            <div
              style={{
                fontFamily: SCHRIFT.familie,
                fontWeight: SCHRIFT.halbfett,
                fontSize: 26,
                color: FARBEN.tinteWeich,
              }}
            >
              Bild {bild}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* ───────────────────────────── Buehnenprobe ──────────────────────────── */

/**
 * Der Prueftisch fuer die Buehnen. Drei Faelle nebeneinander.
 *
 * Er ist entstanden, weil die Buehnen gebaut waren und **kein einziger
 * Entwurf sie benutzt**: `grep -rn "buehne:" daten/entwuerfe/` liefert nichts.
 * Damit war der ganze Teil ungeprueft, und geprueft heisst hier gerendert.
 *
 * Die drei Faelle sind die drei Wege, auf denen etwas schiefgehen kann:
 *
 * - **gehalten** — die Figur haelt das Blatt. Vorher lag es ausserhalb der
 *   Figurenverschiebung und stand in der Buehnenmitte, waehrend die Haende
 *   links danach griffen.
 * - **daneben** — ein Symbol steht rechts. Hier lag der erste Fehler
 *   ueberhaupt: eine Lupe mittig ueber dem Kopf.
 * - **gegenueber** — zwei Haelften mit Etiketten. Hier war es der Umbruch,
 *   der aus „FRUEHER" einen Ueberlauf machte.
 *
 * Alle drei stehen bei Bild 60 von 90, also **nach** dem Uebergang bei 40 %.
 * Bei Bild 0 saehe man drei Anfangszustaende und damit nichts von dem, was
 * die Buehne eigentlich behauptet.
 */
const BUEHNENFAELLE: { titel: string; buehne: Buehnenbilddaten }[] = [
  {
    titel: 'gehalten',
    buehne: { art: 'figur', von: 'ruhe', nach: 'lesen', requisite: 'blatt' },
  },
  {
    titel: 'daneben',
    buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'drucker' },
  },
  {
    titel: 'gegenueber',
    buehne: {
      art: 'gegenueber',
      oben: { etikett: 'FRÜHER', symbol: 'kabel' },
      unten: { etikett: 'HEUTE', symbol: 'wolke' },
    },
  },
];

export const Buehnenprobe: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: FARBEN.grund, padding: 40 }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, height: '100%' }}>
      {BUEHNENFAELLE.map(({ titel, buehne }) => (
        <div
          key={titel}
          style={{
            backgroundColor: FARBEN.grundRein,
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 16,
          }}
        >
          <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
            <Buehnenbild buehne={buehne} dauer={90} />
          </div>
          <div
            style={{
              fontFamily: SCHRIFT.familie,
              fontWeight: SCHRIFT.halbfett,
              fontSize: 26,
              color: FARBEN.tinteWeich,
            }}
          >
            {titel}
          </div>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

/**
 * Eine Figur ueber die Zeit: Uebergang in eine Zielpose, dazu Atmen und
 * Blinzeln. Das Blinzeln ist der Grund, warum die Probe laenger laeuft, als
 * der Uebergang dauert — bei einem Takt von 97 Bildern faellt es sonst
 * zwischen zwei Abtastpunkte und niemand sieht, ob es funktioniert.
 */
export const Figurengang: React.FC<{ pose?: PosenName }> = ({ pose = 'zeigen' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: FARBEN.grund,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      }}
    >
      <Figur rig={nachleser} pose={poseAus({ frame, fps, pose })} />
    </AbsoluteFill>
  );
};
