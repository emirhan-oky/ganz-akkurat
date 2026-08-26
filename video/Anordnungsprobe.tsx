import React from 'react';
import { AbsoluteFill } from 'remotion';
import { z } from 'zod';
import { ABSTAND, FARBEN, FORMAT, GROESSEN, RADIUS, SCHRIFT, SICHERE_ZONE } from '../src/marke';
import { Figur } from './bausteine/Figur';
import { Symbol } from './bausteine/Geraete';
import { Kopfzeile, Belegzeile } from './bausteine/Wortmarke';
import { nachleser } from '../daten/figur/nachleser';
import { POSEN } from './bausteine/posen';

/**
 * Der Musterbogen fuer die Bildaufteilung. Kein Sendeinhalt.
 *
 * **Warum es ihn gibt.** Alle Shorts sehen gleich aus, und beim Nachzaehlen
 * sind dafuer zwei Ursachen sichtbar geworden — nur eine davon ist die Buehne.
 *
 * Erstens der **feste Kasten**: Jede Szene rendert in 710 × 730 Pixel und wird
 * darin zentriert. Das ist ein Viertel der Bildflaeche, und es ist immer
 * dieselbe Mitte.
 *
 * Zweitens die **eine Szenenart**: Von sieben wird faktisch eine benutzt. In
 * den vier fertigen Shorts sind 22 von 25 Szenen `text`, dazu ein `zahl` und
 * vier `schluss`. `frage`, `vergleich`, `einschraenkung` und `kaufkriterien`
 * kommen kein einziges Mal vor. Nur die Buehne zu streichen ergaebe deshalb
 * dasselbe Bild in groesser.
 *
 * Der Bogen zeigt dieselbe echte Szene in acht Aufteilungen der **ganzen**
 * Bildflaeche. Echter Inhalt und kein Blindtext, weil die Laenge des Satzes
 * die halbe Antwort ist: „Wer staendig wechseln muss, greift vermehrt zu
 * schwachen, vorhersehbaren Passwoertern." aus `passwort-wechseln`.
 *
 * **Der Beschnitt gilt in jedem Muster.** Alle drei Apps zeigen 9:16 auf
 * langen Displays formatfuellend — auf die Hoehe skaliert, seitlich
 * abgeschnitten. 52 Pixel links, 56 rechts, am 15.08.2026 an einem
 * veroeffentlichten Beitrag gemessen. Das ist kein Gestaltungsrand, sondern
 * der Bildrand: Was dort steht, ist nicht verdeckt, es ist nicht da.
 *
 *     npx remotion still video/index.ts Anordnungsprobe <ziel>
 *     npx remotion still video/index.ts Anordnungsprobe <ziel> --props='{"zonen":true}'
 */

export const AnordnungsprobeProps = z.object({
  /** Legt die Flaechen darueber, die eine App belegt. */
  zonen: z.boolean().default(false),
});

/* ── Der Inhalt, aus dem jedes Muster dasselbe macht ─────────────────── */

const SATZ = 'Wer ständig wechseln muss, greift zu schwachen Passwörtern.';
const HERVOR = 'schwachen';
const HERAUSGEBER = 'Bundesamt für Sicherheit in der Informationstechnik';

/** Der gemessene Beschnitt. Gilt in jedem Muster, auch im randfuellenden. */
const BESCHNITT = { links: 52, rechts: 56 };

const grundtext = {
  fontFamily: SCHRIFT.familie,
  fontStyle: SCHRIFT.neigung,
  color: FARBEN.tinte,
  letterSpacing: -0.5,
} as const;

/** Der Satz mit blauem Signalwort — in jedem Muster gleich aufgebaut. */
const Satz: React.FC<{ groesse: number; zeilenhoehe?: number; farbe?: string }> = ({
  groesse,
  zeilenhoehe = 1.14,
  farbe = FARBEN.tinte,
}) => {
  const teile = SATZ.split(new RegExp(`(${HERVOR})`, 'i'));
  return (
    <p
      style={{
        ...grundtext,
        color: farbe,
        fontWeight: SCHRIFT.schwarz,
        fontSize: groesse,
        lineHeight: zeilenhoehe,
        margin: 0,
      }}
    >
      {teile.map((teil, i) =>
        teil.toLowerCase() === HERVOR.toLowerCase() ? (
          <span key={i} style={{ color: FARBEN.blau }}>
            {teil}
          </span>
        ) : (
          <span key={i}>{teil}</span>
        ),
      )}
    </p>
  );
};

const figur = <Figur rig={nachleser} pose={POSEN.erklaeren} />;

/* ── Die acht Muster ─────────────────────────────────────────────────── */

/*
 * Jedes Muster ist ein `AbsoluteFill` ueber das volle Format und teilt die
 * Flaeche selbst auf. Keines benutzt `Buehne` — ausser dem ersten, das als
 * Vergleichsmass genau das zeigt, was heute laeuft.
 *
 * Die Kopfzeile steht ueberall, weil sie die Wiedererkennung traegt: Seit dem
 * Wegfall des Wochentags ist die Formatpille das einzige Zeichen, das ein
 * Format hat. Ein Muster ohne sie waere kein Muster fuer diesen Kanal.
 */

type Muster = { name: string; notiz: string; inhalt: React.ReactNode };

const Kopf = () => (
  <div style={{ position: 'absolute', left: SICHERE_ZONE.links, top: 270 }}>
    <Kopfzeile format="werhatrecht" />
  </div>
);

const MUSTER: Muster[] = [
  {
    name: '1 · Heute',
    notiz: 'die Bühne: 710 × 730, zentriert',
    inhalt: (
      <>
        <Kopf />
        {/* Nachgebaut statt <Buehne> benutzt: Die Buehne misst ihre
            Inhaltshoehe ueber delayRender, und acht Messungen in einem
            Standbild haben sich als Haenger erwiesen. Die Maße sind dieselben. */}
        <div
          style={{
            position: 'absolute',
            left: SICHERE_ZONE.links,
            top: SICHERE_ZONE.oben,
            width: FORMAT.breite - SICHERE_ZONE.links - SICHERE_ZONE.rechts,
            height: 730,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Satz groesse={GROESSEN.ueberschrift} />
          <div style={{ height: 300, marginTop: ABSTAND.l }}>{figur}</div>
        </div>
      </>
    ),
  },
  {
    name: '2 · Groß oben',
    notiz: 'Text füllt die obere Hälfte, Figur unten',
    inhalt: (
      <>
        <Kopf />
        <div
          style={{
            position: 'absolute',
            left: BESCHNITT.links + 60,
            right: BESCHNITT.rechts + 60,
            top: 400,
          }}
        >
          <Satz groesse={112} zeilenhoehe={1.02} />
        </div>
        <div style={{ position: 'absolute', left: 120, bottom: 380, width: 460, height: 345 }}>
          {figur}
        </div>
      </>
    ),
  },
  {
    name: '3 · Tief',
    notiz: 'Zeichnung oben groß, Text unten',
    inhalt: (
      <>
        <Kopf />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 420, height: 700 }}>
          <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <Symbol art="schild" groesse={620} />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: BESCHNITT.links + 60,
            right: BESCHNITT.rechts + 60,
            bottom: 560,
          }}
        >
          <Satz groesse={82} />
        </div>
      </>
    ),
  },
  {
    name: '4 · Diagonale',
    notiz: 'Text links oben, Figur rechts unten',
    inhalt: (
      <>
        <Kopf />
        <div style={{ position: 'absolute', left: BESCHNITT.links + 60, top: 420, width: 620 }}>
          <Satz groesse={88} />
        </div>
        <div style={{ position: 'absolute', right: BESCHNITT.rechts + 20, bottom: 480, width: 480, height: 360 }}>
          {figur}
        </div>
      </>
    ),
  },
  {
    name: '5 · Randfüllend',
    notiz: 'Schrift von Beschnitt zu Beschnitt, keine Figur',
    inhalt: (
      <>
        <Kopf />
        <div
          style={{
            position: 'absolute',
            left: BESCHNITT.links,
            right: BESCHNITT.rechts,
            top: 480,
          }}
        >
          <Satz groesse={132} zeilenhoehe={0.98} />
        </div>
      </>
    ),
  },
  {
    name: '6 · Geteilt',
    notiz: 'Farbfläche gegen Text, harte Kante',
    inhalt: (
      <>
        {/* Die Flaeche laeuft bis an die Bildkante, also durch den Beschnitt
            hindurch. Das ist der Fall, fuer den die Ausnahme gilt: Flaeche
            darf dorthin, Schrift nicht. */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            /*
             * 1120, nicht 900: Bei 900 lief die vierte Zeile aus der Flaeche
             * heraus und stand halb dunkel auf hellem Grund. Eine Flaeche,
             * die den Text nur fast traegt, ist schlimmer als keine.
             */
            height: 1120,
            backgroundColor: FARBEN.blau,
          }}
        />
        <div style={{ position: 'absolute', left: SICHERE_ZONE.links, top: 270 }}>
          <Kopfzeile format="werhatrecht" />
        </div>
        <div
          style={{
            position: 'absolute',
            left: BESCHNITT.links + 60,
            right: BESCHNITT.rechts + 60,
            top: 460,
          }}
        >
          <Satz groesse={92} farbe={FARBEN.grund} />
        </div>
        <div style={{ position: 'absolute', left: 140, top: 1160, width: 460, height: 345 }}>
          {figur}
        </div>
      </>
    ),
  },
  {
    name: '7 · Figur groß',
    notiz: 'die Figur trägt das Bild, Text klein',
    inhalt: (
      <>
        <Kopf />
        <div style={{ position: 'absolute', left: -80, top: 380, width: 900, height: 675 }}>
          {figur}
        </div>
        <div
          style={{
            position: 'absolute',
            left: BESCHNITT.links + 60,
            right: BESCHNITT.rechts + 60,
            bottom: 540,
          }}
        >
          <Satz groesse={58} />
        </div>
      </>
    ),
  },
  {
    name: '8 · Ein Wort',
    notiz: 'ein Wort riesig, der Rest bleibt leer',
    inhalt: (
      <>
        <Kopf />
        <div style={{ position: 'absolute', left: BESCHNITT.links, right: BESCHNITT.rechts, top: 620 }}>
          <p
            style={{
              ...grundtext,
              fontWeight: SCHRIFT.schwarz,
              fontSize: 200,
              lineHeight: 0.94,
              margin: 0,
              color: FARBEN.blau,
            }}
          >
            Schwach.
          </p>
          <p
            style={{
              ...grundtext,
              fontWeight: SCHRIFT.fett,
              fontSize: 52,
              lineHeight: 1.2,
              margin: 0,
              marginTop: ABSTAND.l,
              color: FARBEN.tinteWeich,
            }}
          >
            Wer ständig wechseln muss, wählt einfacher.
          </p>
        </div>
      </>
    ),
  },
];

/* ── Die App-Zonen ───────────────────────────────────────────────────── */

/**
 * Was eine App ueber unser Bild legt — und was gar nicht erst ankommt.
 *
 * Die Werte stammen aus einem Reels-Screenshot vom 25.08.2026 und stehen in
 * Anteilen der Bildhoehe, weil das Video auf die Hoehe skaliert wird.
 *
 * Der **Beschnitt** ist eigens dabei und in einer anderen Farbe: Er verdeckt
 * nichts, er ist schlicht nicht da. Genau das sieht man am Schreibtisch nie —
 * am 15.08.2026 klebte deshalb eine Ueberschrift am Displayrand, waehrend im
 * Render alles richtig aussah.
 */
const Zonen: React.FC = () => (
  <>
    {[
      { was: 'Aktionsleiste', links: '87%', rechts: '0%', oben: '46%', unten: '22%' },
      { was: 'Name · Folgen', links: '0%', rechts: '40%', oben: '81%', unten: '15%' },
      { was: 'Beschreibung', links: '0%', rechts: '25%', oben: '85%', unten: '10%' },
    ].map((z) => (
      <div
        key={z.was}
        style={{
          position: 'absolute',
          left: z.links,
          right: z.rechts,
          top: z.oben,
          bottom: z.unten,
          backgroundColor: 'rgba(200, 40, 60, 0.28)',
          border: '3px solid rgba(200, 40, 60, 0.75)',
          fontFamily: 'Inter',
          fontSize: 26,
          fontWeight: 700,
          color: '#7A0C1E',
          padding: 8,
        }}
      >
        {z.was}
      </div>
    ))}

    {[
      { seite: 'left' as const, breite: BESCHNITT.links },
      { seite: 'right' as const, breite: BESCHNITT.rechts },
    ].map((b) => (
      <div
        key={b.seite}
        style={{
          position: 'absolute',
          [b.seite]: 0,
          top: 0,
          bottom: 0,
          width: b.breite,
          backgroundColor: 'rgba(20, 24, 32, 0.55)',
          borderRight: b.seite === 'left' ? '3px solid #141820' : undefined,
          borderLeft: b.seite === 'right' ? '3px solid #141820' : undefined,
        }}
      />
    ))}
  </>
);

/* ── Der Bogen ───────────────────────────────────────────────────────── */

const Kachel: React.FC<{ m: Muster; zonen: boolean }> = ({ m, zonen }) => (
  <div style={{ width: FORMAT.breite / 2, height: FORMAT.hoehe / 2, position: 'relative' }}>
    {/* Halbe Auflösung: Der Inhalt wird im vollen Format gebaut und als
        Ganzes skaliert. Alles selbst zu halbieren waere die Sorte Doppelung,
        die beim ersten Wert auseinanderlaeuft. */}
    <div
      style={{
        width: FORMAT.breite,
        height: FORMAT.hoehe,
        transform: 'scale(0.5)',
        transformOrigin: 'top left',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: FARBEN.grund,
      }}
    >
      {m.inhalt}

      {/* Die Belegzeile gehoert in jedes Muster: Sie ist der Belegapparat im
          Bild und damit das, was den Kanal von hundert anderen trennt. */}
      <div style={{ position: 'absolute', left: SICHERE_ZONE.links, top: 350 }}>
        <Belegzeile herausgeber={HERAUSGEBER} />
      </div>

      {zonen && <Zonen />}
    </div>

    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '10px 16px',
        backgroundColor: FARBEN.tinte,
        color: FARBEN.grund,
        fontFamily: 'Inter',
        fontSize: 22,
        fontWeight: 600,
      }}
    >
      {m.name}
      <span style={{ opacity: 0.65, fontWeight: 400 }}> — {m.notiz}</span>
    </div>
  </div>
);

export const Anordnungsprobe: React.FC<z.infer<typeof AnordnungsprobeProps>> = ({ zonen }) => (
  <AbsoluteFill
    style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#2A2E35',
      gap: 0,
    }}
  >
    {MUSTER.map((m) => (
      <Kachel key={m.name} m={m} zonen={zonen} />
    ))}
  </AbsoluteFill>
);
