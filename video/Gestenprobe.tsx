import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FARBEN, SCHRIFT } from '../src/marke';
import { Figur } from './bausteine/Figur';
import { zeiger } from '../daten/figur/zeiger';
import { Pose } from '../src/figur';

/**
 * Der Prueftisch fuer die Geste nach unten. Kein Sendeinhalt.
 *
 * **Warum es ihn gibt.** Die YouTube- und Instagram-Fassung sollen auf einen
 * Knopf **unter** der Figur deuten, und genau das ist die schwerste Richtung:
 * Der linke Unterarm haengt in der Ruhelage bereits senkrecht nach unten
 * (`M 56 76 L 56 96`), also sieht „nach unten zeigen" aus wie „gar nichts".
 * Am fertigen Video war die YouTube-Geste deshalb von der Ruhehaltung nicht
 * zu unterscheiden.
 *
 * Zwei Sackgassen liegen hinter dieser Datei, beide am Standbild gesehen:
 * Ein **abstehender Ellbogen** (Oberarm heraus, Unterarm herunter) liest sich
 * als Winken, nicht als Deuten. Und ein **negativer Unterarm** klappt nicht
 * nach aussen, sondern vor den Koerper — die Hand landet auf dem Ladebalken.
 *
 * Was bleibt: Der Unterarm steht auf seinem Maximum `+15` (weiter geht das
 * Gelenk nicht, ein Ellbogen ueberstreckt nicht), und die **Richtung macht
 * allein der Oberarm**. Dessen Ruhelage liegt 41 Grad links der Senkrechten,
 * positive Werte drehen nach aussen, negative zum Koerper.
 *
 * Die Kandidaten variieren genau diese beiden Werte. Der graue Balken unter
 * jeder Figur steht dort, wo in der App der Knopf liegt — ohne ihn laesst
 * sich nicht beurteilen, ob die Geste hinzeigt oder daneben.
 *
 *     npx remotion still video/index.ts Gestenprobe <ziel>
 */

type Kandidat = {
  name: string;
  notiz: string;
  ober: number;
  unter: number;
  koerper: number;
  blick: [number, number];
  /** Rechter Oberarm, wo die Asymmetrie den linken Arm zum zeigenden macht. */
  rechts?: number;
};

/*
 * Vorzeichen, einmal nachgeschlagen, damit es beim Lesen nicht neu hergeleitet
 * werden muss: Am **linken** Arm dreht ein positiver Winkel den Oberarm vom
 * Koerper weg nach aussen (bei etwa +46 steht er waagerecht), ein negativer
 * klappt ihn vor die Brust. Beim Unterarm zaehlt die Drehung **relativ zum
 * Oberarm** — ein Unterarm auf dem Gegenwert des Oberarms steht damit wieder
 * senkrecht.
 */
const KANDIDATEN: Kandidat[] = [
  { name: 'Jetzt (YouTube)', notiz: 'gleicher Arm wie Instagram, Unterarm nur 8', ober: 20, unter: 8, koerper: -4, blick: [-1, 2.9] },
  { name: 'Oberarm 0', notiz: 'Ruhewinkel, 41 Grad nach links-unten', ober: 0, unter: 15, koerper: -4, blick: [-1, 3.1] },
  { name: 'Oberarm -15', notiz: '26 Grad nach links-unten', ober: -15, unter: 15, koerper: -4, blick: [-0.6, 3.3] },
  { name: 'Oberarm -25', notiz: '16 Grad, fast senkrecht', ober: -25, unter: 15, koerper: -4, blick: [-0.3, 3.5] },
  { name: 'Oberarm -30', notiz: '11 Grad, senkrecht nach unten', ober: -30, unter: 15, koerper: 0, blick: [0, 3.6] },
  { name: 'Oberarm -25, geneigt', notiz: 'Koerper lehnt nach vorn', ober: -25, unter: 15, koerper: -12, blick: [-0.3, 3.5] },
  { name: 'Oberarm -20, rechts an', notiz: 'rechter Arm liegt an, Asymmetrie', ober: -20, unter: 15, koerper: -4, blick: [-0.5, 3.4], rechts: 16 },
  { name: 'Oberarm -30, rechts an', notiz: 'senkrecht plus Asymmetrie', ober: -30, unter: 15, koerper: -4, blick: [0, 3.6], rechts: 16 },
];

const pose = (k: Kandidat): Pose => ({
  drehung: {
    oberarm_links: k.ober,
    unterarm_links: k.unter,
    koerper: k.koerper,
    ...(k.rechts != null ? { oberarm_rechts: k.rechts } : {}),
  },
  stauchung: {},
  dehnung: {},
  blick: k.blick,
  mund: 'laecheln',
  hub: 0,
});

const Feld: React.FC<{ k: Kandidat }> = ({ k }) => (
  <div
    style={{
      backgroundColor: FARBEN.grund,
      width: 620,
      height: 660,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 24,
      boxSizing: 'border-box',
      border: `2px solid ${FARBEN.gitter}`,
    }}
  >
    <div
      style={{
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: 600,
        color: FARBEN.tinte,
        alignSelf: 'flex-start',
      }}
    >
      {k.name}
      <span style={{ color: FARBEN.tinteWeich, fontWeight: 400 }}> — {k.notiz}</span>
    </div>

    <div style={{ width: 420, height: 315, marginTop: 8 }}>
      <Figur rig={zeiger} pose={pose(k)} />
    </div>

    {/*
     * Der Platzhalter fuer den Knopf. Er ist absichtlich nicht mittig unter
     * der Figur, sondern leicht links: So liegt er bei Instagram und YouTube,
     * und eine Geste, die genau senkrecht nach unten geht, verfehlt ihn.
     */}
    <div style={{ alignSelf: 'center', marginTop: 'auto' }}>
      <div
        style={{
          width: 170,
          height: 46,
          borderRadius: 10,
          border: `2px solid ${FARBEN.linie}`,
          color: FARBEN.tinteWeich,
          fontFamily: 'Inter',
          fontSize: 19,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Abonnieren
      </div>
    </div>

    <div
      style={{
        alignSelf: 'flex-start',
        marginTop: 10,
        fontFamily: SCHRIFT.familie,
        fontSize: 17,
        color: FARBEN.tinteWeich,
      }}
    >
      Oberarm {k.ober} · Unterarm {k.unter} · Körper {k.koerper}
    </div>
  </div>
);

export const Gestenprobe: React.FC = () => (
  <AbsoluteFill style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#2A2E35' }}>
    {KANDIDATEN.map((k) => (
      <Feld key={k.name} k={k} />
    ))}
  </AbsoluteFill>
);
