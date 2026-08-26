import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FARBEN } from '../src/marke';
import { PosenName } from '../src/figur';
import { Buehnenbild } from './bausteine/Buehnenbild';

/**
 * Der Prueftisch fuer den Wortwechsel. Kein Sendeinhalt.
 *
 * **Warum es ihn gibt.** Am 26.08.2026 sind in zwei Shorts nacheinander
 * Haende im Gehaeuse der anderen Figur gelandet, jedes Mal erst im fertigen
 * Standbild und jedes Mal an einer anderen Pose: `achselzucken` rechts,
 * `zeigen` links, dann `erklaeren` links. Nach dem dritten Fall war klar,
 * dass die Frage nicht je Short beantwortet wird, sondern einmal fuer das
 * ganze Posenvokabular.
 *
 * Zwanzig Kacheln, zwei Reihen: **oben** traegt die linke Figur je eine Pose
 * und die rechte ruht, **unten** umgekehrt. Damit ist abzulesen, welche Pose
 * allein schon in die andere Figur greift — der Fall, in dem beide
 * gleichzeitig ausgreifen, ist schon eine Regel in `src/pruefung.ts`.
 *
 * **Gerendert wird durch `Buehnenbild` selbst**, nicht durch einen Nachbau der
 * Anordnung. Ein Nachbau waere eine zweite Geometrie neben der echten, und die
 * liefe beim ersten Umbau lautlos auseinander — dieselbe Ueberlegung, aus der
 * `daten/figur/zeiger.ts` vom `nachleser` ableitet, statt ihn abzuschreiben.
 *
 * **Das Ergebnis vom 26.08.2026**, an allen zehn Posen abgelesen: `zeigen`,
 * `erklaeren` und `achselzucken` legen eine Hand auf das andere Gehaeuse, die
 * uebrigen sieben bleiben frei. Es haengt nicht an der Seite — die rechte
 * Figur ist gespiegelt und greift spiegelbildlich. `src/pruefung.ts` sperrt
 * die drei seither im Wortwechsel.
 *
 *     npx remotion still video/index.ts Wortwechselprobe probe.png
 */

const POSEN = PosenName.options;

const Kachel: React.FC<{ links: string; rechts: string; titel: string }> = ({
  links,
  rechts,
  titel,
}) => (
  <div
    style={{
      width: 618,
      height: 372,
      border: `2px solid ${FARBEN.gitter}`,
      boxSizing: 'border-box',
      position: 'relative',
      backgroundColor: FARBEN.grund,
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 8,
        left: 12,
        fontFamily: 'Inter',
        fontSize: 19,
        fontWeight: 600,
        color: FARBEN.tinte,
        zIndex: 2,
      }}
    >
      {titel}
    </div>
    <Buehnenbild
      buehne={{
        art: 'figur',
        von: links as never,
        nach: links as never,
        gegenueber: { von: rechts as never, nach: rechts as never },
      }}
      dauer={120}
    />
  </div>
);

export const Wortwechselprobe: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: FARBEN.grund, padding: 20 }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {POSEN.map((p) => (
        <Kachel key={`l-${p}`} links={p} rechts="ruhe" titel={`links ${p}`} />
      ))}
      {POSEN.map((p) => (
        <Kachel key={`r-${p}`} links="ruhe" rechts={p} titel={`rechts ${p}`} />
      ))}
    </div>
  </AbsoluteFill>
);
