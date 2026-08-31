import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { FARBEN, FIGURENFEDERN, type Federname } from '../src/marke';
import type { Pose, PosenName } from '../src/figur';
import { nachleser } from '../daten/figur/nachleser';
import { zeiger } from '../daten/figur/zeiger';
import { Figur } from './bausteine/Figur';
import { poseAus, POSEN } from './bausteine/posen';
import { atemvolumen, gewicht } from './bausteine/bewegung';

/**
 * Der Prueftisch fuer die Frage vom 31.08.2026: **Was kann das Rig maximal?**
 *
 *     npx remotion render video/index.ts Bewegungsprobe probe.mp4
 *
 * ## Warum es ihn gibt
 *
 * Nach dem ersten Bildumbau lagen zwei Figuren im Bild, die sich ansehen und
 * deren Mund sich bewegt. Die Frage darauf war „Ist das das Maximum an
 * dynamischen Bewegungen?", und die Antwort ist nein — es war etwa ein
 * Drittel. Nachgezaehlt am Rig: Die Beine wurden in **keiner** der zehn Posen
 * benutzt, die Brauen hatten kein Gelenk, `koerper` nur feste Werte, und
 * `TEMPO.feder` war 11,8-fach ueberdaempft und hat nie gefedert.
 *
 * ## Was hier **nicht** passiert
 *
 * Diese Probe ist eine **Demonstration und keine Umstellung.** `TEMPO.feder`
 * bleibt, wie sie war; die Federn kommen aus `FIGURENFEDERN`. Die vier
 * Entwuerfe und der Renderpfad der Shorts sind unangetastet — `npm run
 * pruefen` meldet nach dem Bau dieselben acht Befunde wie davor.
 *
 * Was bleibt, entscheidet das Auge. Danach wandert es in die Produktion, und
 * was nicht bleibt, wird hier geloescht statt liegen zu lassen.
 */

const BREITE = 1080;
const HOEHE = 1080;

/* ─────────────────────────────── Bausteine ────────────────────────────── */

const Kachel: React.FC<{ titel: string; notiz?: string; children: React.ReactNode }> = ({
  titel,
  notiz,
  children,
}) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      position: 'relative',
      display: 'flex',
      borderLeft: `2px solid ${FARBEN.gitter}`,
    }}
  >
    <div style={{ position: 'absolute', top: 14, left: 18, zIndex: 2 }}>
      <div style={{ fontFamily: 'Inter', fontSize: 30, fontWeight: 700, color: FARBEN.tinte }}>
        {titel}
      </div>
      {notiz !== undefined && (
        <div style={{ fontFamily: 'Inter', fontSize: 21, color: FARBEN.tinte, opacity: 0.55 }}>
          {notiz}
        </div>
      )}
    </div>
    {children}
  </div>
);

/** Eine Figur allein, in ihrem eigenen SVG — fuer die Vergleichskacheln. */
const Solo: React.FC<{ pose: Pose; watti?: boolean }> = ({ pose, watti = false }) => (
  <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet" style={{ flex: 1, minWidth: 0 }}>
    <ellipse cx="100" cy="140" rx="34" ry="9" fill={FARBEN.flaeche} opacity={0.5} />
    <Figur rig={watti ? zeiger : nachleser} pose={pose} />
  </svg>
);

const Abschnitt: React.FC<{ titel: string; children: React.ReactNode }> = ({ titel, children }) => (
  <AbsoluteFill style={{ backgroundColor: FARBEN.grund, flexDirection: 'column' }}>
    <div
      style={{
        fontFamily: 'Inter',
        fontSize: 44,
        fontWeight: 800,
        color: FARBEN.tinte,
        padding: '28px 32px 8px',
      }}
    >
      {titel}
    </div>
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>{children}</div>
  </AbsoluteFill>
);

/**
 * Der Taktgeber jedes Abschnitts: Alle 60 Bilder ein Posenwechsel, damit man
 * denselben Uebergang mehrfach und in jeder Kachel gleichzeitig sieht.
 */
const TAKT = 60;
const wechsel = (frame: number, kette: readonly PosenName[]) => {
  const i = Math.floor(frame / TAKT);
  return {
    vorherigePose: kette[i % kette.length]!,
    pose: kette[(i + 1) % kette.length]!,
    abBild: (i + 1) * TAKT,
  };
};

/* ──────────────────────────── Block 1 · Feder ─────────────────────────── */

const KETTE: PosenName[] = ['ruhe', 'zeigen', 'staunen', 'erklaeren'];

const FEDER_NOTIZ: Record<Federname, string> = {
  heute: '11,8-fach überdämpft — kein Überschwingen',
  gefasst: 'Maximum 104,2 %, ruhig nach 0,50 s',
  cartoon: 'Maximum 118,3 %, ruhig nach 0,83 s',
};

const Federblock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const w = wechsel(frame, KETTE);
  return (
    <Abschnitt titel="1 · Die Feder — dieselbe Bewegung, drei Kurven">
      {(Object.keys(FIGURENFEDERN) as Federname[]).map((name) => (
        <Kachel key={name} titel={name} notiz={FEDER_NOTIZ[name]}>
          <Solo pose={poseAus({ frame, fps, ...w, feder: FIGURENFEDERN[name] })} />
        </Kachel>
      ))}
    </Abschnitt>
  );
};

/* ─────────────────────── Block 2 · Die Prinzipien ─────────────────────── */

const Prinzipienblock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const w = wechsel(frame, KETTE);
  const feder = FIGURENFEDERN.cartoon;
  return (
    <Abschnitt titel="2 · Anticipation und Overlapping — beide mit derselben Feder">
      <Kachel titel="nur Feder" notiz="der Arm bewegt sich in einem Stück">
        <Solo pose={poseAus({ frame, fps, ...w, feder })} />
      </Kachel>
      <Kachel titel="+ Overlapping" notiz="Unterarm 2 Bilder, Hand 4 Bilder später">
        <Solo pose={poseAus({ frame, fps, ...w, feder, nachzug: true })} />
      </Kachel>
      <Kachel titel="+ Anticipation" notiz="holt 12 % zurück, bevor sie zeigt">
        <Solo pose={poseAus({ frame, fps, ...w, feder, nachzug: true, ausholung: 0.12 })} />
      </Kachel>
    </Abschnitt>
  );
};

/* ────────────────────── Block 3 · Die toten Gelenke ───────────────────── */

/** Die Brauen — bis zum 31.08.2026 unbewegliche Teile ohne Gelenk. */
const BRAUEN: { titel: string; notiz: string; werte: Record<string, number> }[] = [
  { titel: 'ruhig', notiz: 'der Stand bis heute', werte: {} },
  { titel: 'innen hoch', notiz: 'ratlos — Wattis Grundzustand', werte: { braue_links: 16, braue_rechts: -16 } },
  { titel: 'innen tief', notiz: 'skeptisch, gleich empört', werte: { braue_links: -18, braue_rechts: 18 } },
  { titel: 'schief', notiz: 'eine hoch, eine tief: Zweifel', werte: { braue_links: 18, braue_rechts: 18 } },
];

const Gelenkblock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grund = poseAus({ frame, fps, pose: 'ruhe', vorherigePose: 'ruhe' });
  const g = gewicht(frame, fps);
  const atem = atemvolumen(frame, fps);
  return (
    <Abschnitt titel="3 · Die toten Gelenke — Beine und Körper">
      <Kachel titel="heute" notiz="Beine starr, Körper nur mit festem Wert je Pose">
        <Solo pose={grund} />
      </Kachel>
      <Kachel titel="+ Gewicht" notiz="Standbein und Spielbein, ±3,2°, zwei Frequenzen">
        <Solo pose={{ ...grund, drehung: { ...grund.drehung, ...g } }} />
      </Kachel>
      <Kachel titel="+ Atemvolumen" notiz="Squash & Stretch, 1 % — volumenerhaltend">
        <Solo
          pose={{
            ...grund,
            drehung: { ...grund.drehung, ...g },
            stauchung: { ...grund.stauchung, ...atem.stauchung },
            dehnung: { ...grund.dehnung, ...atem.dehnung },
          }}
        />
      </Kachel>
    </Abschnitt>
  );
};

/**
 * Die Brauen — bis zum 31.08.2026 unbewegliche Teile ohne Gelenk, und damit
 * die groesste ungenutzte Ausdrucksflaeche der Figur. An Watti gezeigt: Er
 * macht alles falsch und lernt nichts, das ist sein Gebiet.
 */
const Brauenblock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grund = poseAus({ frame, fps, pose: 'ruhe', vorherigePose: 'ruhe' });
  const g = gewicht(frame, fps);
  return (
    <Abschnitt titel="4 · Die Brauen — neu beweglich, Gelenk am inneren Ende">
      {BRAUEN.map((b) => (
        <Kachel key={b.titel} titel={b.titel} notiz={b.notiz}>
          <Solo pose={{ ...grund, drehung: { ...grund.drehung, ...g, ...b.werte } }} watti />
        </Kachel>
      ))}
    </Abschnitt>
  );
};

/* ───────────────────────── Block 4 · Vergleich ────────────────────────── */

const Vergleichsblock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const w = wechsel(frame, KETTE);
  const g = gewicht(frame, fps);
  const atem = atemvolumen(frame, fps);
  const alt = poseAus({ frame, fps, ...w, feder: FIGURENFEDERN.heute });
  const neu = poseAus({
    frame,
    fps,
    ...w,
    feder: FIGURENFEDERN.cartoon,
    nachzug: true,
    ausholung: 0.12,
  });
  return (
    <Abschnitt titel="5 · Alles zusammen gegen den Stand von heute Mittag">
      <Kachel titel="heute Mittag" notiz="überdämpfte Feder, starre Beine, feste Brauen">
        <Solo pose={alt} />
      </Kachel>
      <Kachel titel="Maximum" notiz="Feder, Overlapping, Anticipation, Gewicht, Atemvolumen">
        <Solo
          pose={{
            ...neu,
            drehung: { ...neu.drehung, ...g },
            stauchung: { ...neu.stauchung, ...atem.stauchung },
            dehnung: { ...neu.dehnung, ...atem.dehnung },
          }}
        />
      </Kachel>
    </Abschnitt>
  );
};

/* ──────────────────────────────── Ablauf ──────────────────────────────── */

const BLOECKE = [Federblock, Prinzipienblock, Gelenkblock, Brauenblock, Vergleichsblock];
export const BLOCKDAUER = TAKT * 4;

export const Bewegungsprobe: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: FARBEN.grund }}>
    {BLOECKE.map((Block, i) => (
      <Sequence key={i} from={i * BLOCKDAUER} durationInFrames={BLOCKDAUER}>
        <Block />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export const BEWEGUNGSPROBE_BILDER = BLOECKE.length * BLOCKDAUER;
export const BEWEGUNGSPROBE_MASSE = { breite: BREITE, hoehe: HOEHE };
