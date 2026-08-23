import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { FARBEN, SCHRIFT } from '../../src/marke';
import type { Buehnenbild as BuehnenbildDaten, KontextArt } from '../../src/typen';
import { nachleser } from '../../daten/figur/nachleser';
import { Figur } from './Figur';
import { Symbole } from './Geraete';
import { Kamera } from './Kamera';
import { poseAus } from './posen';
import { Blatt } from './Requisiten';

/**
 * Die Buehne einer Szene: was im Bild **passiert**.
 *
 * Sie ist der Nachfolger von `symbol`, und der Unterschied ist der ganze
 * Punkt. Ein Symbol steht unter dem Satz und tut nichts — im Standbild vom
 * 20.08.2026 war das eine graue Lupe neben „Beim BSI heisst das
 * Wasserzeichen". Eine Buehne fuehrt vor.
 *
 * Der Befund dazu steht am Schema in `src/typen.ts`: Neun von zwoelf
 * vermessenen viralen Tech-Shorts leben von einer Vorfuehrung. Wir haben
 * nichts vorzufuehren, also muss die Zeichnung es tun.
 *
 * ## Alles laeuft ueber den Fortschritt
 *
 * Die Buehne rechnet nicht in Sekunden, sondern in einem Anteil von 0 bis 1
 * ueber die Szenenlaenge. Das ist dieselbe Ueberlegung wie bei
 * `auftrittImSprechrhythmus` in `bewegung.ts`: Wer feste Sekunden rechnet,
 * baut einen Fehler ein, der erst nach der Vertonung sichtbar wird — die
 * Bewegung ist nach drei Sekunden durch, die Stimme redet noch neun weitere,
 * und das Bild steht still.
 */

/** Wie viel Platz die Buehne im Bild bekommt. Untergrenze, kein Restplatz. */
export const BUEHNENBILD_GROESSE = 620;

/* ───────────────────────────── Figurenbuehne ─────────────────────────── */

/**
 * Die Figur geht waehrend der Szene von einer Haltung in eine andere; eine
 * Requisite taucht zur Mitte auf.
 *
 * **Der Uebergang liegt in der Mitte der Szene, nicht am Anfang.** Am Anfang
 * waere er noch vor dem Satz, der ihn ausloest — die Figur reagierte auf etwas,
 * das der Zuschauer noch nicht gehoert hat. In der Mitte faellt er mit dem
 * Moment zusammen, in dem die Stimme die Wendung spricht.
 */
const Figurenbuehne: React.FC<{
  buehne: Extract<BuehnenbildDaten, { art: 'figur' }>;
  dauer: number;
}> = ({ buehne, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Der Uebergang beginnt bei 40 % der Szene. `abBild` verschiebt **nur** ihn;
  // Atmen und Blinzeln laufen ab Bild 0 weiter. Der erste Anlauf uebergab
  // stattdessen `frame - beginn` und verschob damit alles — mit negativen
  // Frames als Folge, die die Augen auf das Einundzwanzigfache streckten.
  const beginn = Math.round(dauer * 0.4);
  const pose = poseAus({
    frame,
    fps,
    pose: buehne.nach,
    vorherigePose: buehne.von,
    abBild: beginn,
  });

  /*
   * Die Requisite erscheint kurz **vor** dem Haltungswechsel. Umgekehrt wuerde
   * die Figur auf etwas reagieren, das noch nicht da ist; gleichzeitig saehe
   * es aus, als haette sie es herbeigezaubert.
   */
  const auftauchen = interpolate(frame, [beginn - 12, beginn], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  /*
   * Das Blatt gehoert **in** die Figur, nicht daneben.
   *
   * Vorher lag es hier ausserhalb von `<Figur>` und damit ausserhalb der
   * Verschiebung um -38: Die Figur stand links, das Blatt in der Buehnenmitte,
   * und die Lesepose griff daneben ins Leere. Als Requisite auf Ebene 36 faehrt
   * es mit, sitzt vor dem Gehaeuse und hinter den Haenden — und die Haende
   * decken seine Kanten, weil beide im selben Koordinatenraum gerechnet sind.
   *
   * Der Unterschied zu den Symbolen ist nicht Bequemlichkeit, sondern Groesse:
   * Ein Blatt ist so gebaut, dass eine Hand es halten kann. Ein Drucker ist es
   * nicht.
   */
  const gehalten =
    buehne.requisite === 'blatt'
      ? [{ inhalt: <g opacity={auftauchen}><Blatt /></g>, ebene: 36 }]
      : [];

  const daneben =
    buehne.requisite === undefined || buehne.requisite === 'blatt' ? undefined : (
      <g opacity={auftauchen}>
        {(
          /*
           * Ein Symbol neben der Figur, nicht in ihrer Hand: Die Zeichnungen
           * in `Geraete.tsx` sind fuer die volle Buehnenbreite gebaut und um
           * (100, 140) herum aufgesetzt. In die Hand gelegt muessten sie je
           * Symbol von Hand skaliert und verschoben werden. Rechts daneben
           * stehen sie in ihrer eigenen Form, und die Figur schaut hin.
           *
           * `Symbole` und nicht `Symbol`: Die Komponente braechte ein zweites
           * `<svg>` samt Standflaeche mit, und die schwebte im ersten
           * Standbild als graue Ellipse in der Luft.
           *
           * Die Skalierung sitzt in einem eigenen `<g>` **innerhalb** der
           * Deckkraft. Ein `transform` per CSS mit `transformOrigin` in Pixeln
           * waere hier falsch: In einem viewBox-SVG sind CSS-Pixel nicht die
           * Einheiten der Zeichnung, und der Ursprung laege irgendwo.
           *
           * ## Warum (138 | 110) und nicht (112 | 44)
           *
           * Die erste Fassung war zweimal falsch, und beides zeigte erst die
           * `Buehnenprobe`: Das Symbol lag in Kopfhoehe und ueberdeckte das
           * Gesicht.
           *
           * Nachgerechnet: Ein Symbol setzt bei y = 140 auf. Diese Kette bildet
           * (100 | 140) auf (tx | ty + 0,46 · 65) ab. Mit ty = 44 landet die
           * Standlinie bei y = 74 — das Symbol schwebte also 66 Einheiten ueber
           * dem Boden, auf dem die Figur steht. Mit ty = 110 kommt sie auf
           * y = 139,9, und tx = 138 haelt es rechts von der Figur, deren
           * ausgestreckter Arm bis x = 106 reicht.
           */
          <g transform="translate(138 110) scale(0.46) translate(-100 -75)">
            <g
              transform={`scale(${interpolate(auftauchen, [0, 1], [0.94, 1])})`}
              transform-origin="100 75"
            >
              {Symbole[buehne.requisite]}
            </g>
          </g>
        )}
      </g>
    );

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
      <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet" style={{ maxHeight: '100%' }}>
        {/*
          Die Kamera faehrt langsam heran. Sie richtet sich nach dem, was zu
          sehen ist: Steht ein Symbol daneben, rueckt sie in die Mitte zwischen
          beide — dorthin also, wo das Ereignis stattfindet. Haelt die Figur
          etwas selbst, bleibt sie auf der Figur, denn dort ist das Ereignis
          schon.

          Sie ersetzt nicht die Dauerbewegung in `Buehne.tsx`, sondern liegt
          darunter: Jene bewegt das **ganze** Bild samt Text und ist so
          langsam, dass sie nur das Auge wachhaelt. Diese hier bewegt die
          Zeichnung und darf gesehen werden.
        */}
        <Kamera
          dauer={dauer}
          von={{ zoom: 1 }}
          nach={daneben ? { x: 88, y: 82, zoom: 1.16 } : { x: 62, y: 80, zoom: 1.24 }}
        >
          {/*
            Standflaeche wie bei den Symbolen — Figur und Requisite stehen auf
            derselben Linie, weil sie sich denselben Koordinatenraum teilen.

            Sie richtet sich nach dem, was darauf steht. Die feste Breite von
            vorher spannte immer von x = 38 bis 162, auch wenn nur die Figur bei
            x = 62 stand: In der `Buehnenprobe` lag der Schatten dann als
            eigener grauer Fleck **neben** ihr. Ein Schatten, der weiter reicht
            als das, was ihn wirft, sieht nicht nach Boden aus, sondern nach
            einem zweiten Gegenstand.
          */}
          <ellipse
            cx={daneben ? 100 : 62}
            cy="140"
            rx={daneben ? 62 : 34}
            ry="9"
            fill={FARBEN.flaeche}
            opacity={0.5}
          />
          {/* Die Figur steht links, ein Symbol rechts. Im ersten Standbild
              standen beide mittig und die Lupe lag ueber dem Kopf. Das Blatt
              geht als `gehalten` mit hinein und wird deshalb mitverschoben. */}
          <g transform="translate(-38 0)">
            <Figur rig={nachleser} pose={pose} requisiten={gehalten} />
          </g>
          {daneben}
        </Kamera>
      </svg>
    </div>
  );
};

/* ───────────────────────────── Gegenueber ────────────────────────────── */

/**
 * Zwei Zustaende uebereinander, je ein Etikett.
 *
 * Aus dem kuerzesten Video der Sammlung: DJI zeigt in sieben Sekunden oben
 * „AMATEUR" und unten „PRO" — 1,75 Mio Aufrufe, kein gesprochenes Wort.
 *
 * **Der Vorgang liegt hier nicht in einer Bewegung, sondern im Vergleich.**
 * Deshalb erscheinen die Haelften nacheinander: Zuerst steht die obere allein,
 * dann kommt die untere dazu. Beide gleichzeitig einzublenden waere ein Bild
 * mit zwei Haelften; nacheinander ist es eine Behauptung und ihre Antwort.
 */
const Gegenueber: React.FC<{
  buehne: Extract<BuehnenbildDaten, { art: 'gegenueber' }>;
  dauer: number;
}> = ({ buehne, dauer }) => {
  const frame = useCurrentFrame();
  const zweite = interpolate(frame, [Math.round(dauer * 0.42), Math.round(dauer * 0.52)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  /*
   * Alles in **einem** SVG, nicht in zwei Flex-Kaesten mit HTML-Etiketten.
   *
   * Der erste Anlauf war HTML: zwei `div` mit `flex: 1`, das Symbol darin, das
   * Etikett absolut positioniert. Im Standbild standen beide Haelften
   * zusammengedraengt oben, darunter ein Drittel leere Flaeche, und die
   * Etiketten klebten am linken Buehnenrand statt an ihrer Zeichnung. Der
   * Grund ist immer derselbe: `height: 100%` braucht einen Elternteil mit
   * bekannter Hoehe, und in einer Flex-Spalte, die selbst noch verhandelt,
   * gibt es die nicht.
   *
   * Ein SVG mit `viewBox` verhandelt nicht. Die obere Haelfte **ist** y 0 bis
   * 72, und das Etikett sitzt bei (6, 6), weil es dort sitzen soll.
   */
  const HALB = 72;

  const Haelfte: React.FC<{
    seite: { etikett: string; symbol: KontextArt };
    y: number;
    auf: number;
  }> = ({ seite, y, auf }) => (
    <g opacity={auf} transform={`translate(0 ${y + interpolate(auf, [0, 1], [4, 0])})`}>
      {/* Die Zeichnung sitzt in der Mitte ihrer Haelfte. Der doppelte
          `translate` ist der uebliche Weg, um **um einen Punkt** zu skalieren,
          ohne sich auf `transform-origin` zu verlassen. */}
      <g transform={`translate(112 ${HALB / 2 - 2}) scale(0.52) translate(-100 -75)`}>
        {Symbole[seite.symbol]}
      </g>

      {/*
        Etikett links oben in der Haelfte, wie im Vorbild. Nicht zentriert:
        Zentriert konkurriert es mit der Zeichnung um die Mitte, und das Auge
        weiss nicht, was zuerst gilt.

        Die Breite wird aus der Zeichenzahl geschaetzt statt gemessen. Die
        Alternative waere eine Messung im DOM, also derselbe `delayRender`, den
        sich `Buehne.tsx` schon leistet — fuer ein Etikett aus hoechstens
        vierzehn Zeichen zu teuer.

        **6,4 Einheiten je Zeichen, nicht 5,1.** Der erste Wert war geraten und
        im Standbild sofort zu sehen: „FRÜHER" stand rechts ueber seinem
        Kasten hinaus. Gemessen an Inter in `SCHRIFT.fett` bei Schriftgroesse 9
        und Grossbuchstaben — die breiteste Stelle ist ein „M", die schmalste
        ein „I", und der Mittelwert deckt beides mit dem Innenabstand ab.
      */}
      <rect x={6} y={6} width={seite.etikett.length * 6.4 + 12} height={14} rx={3} fill={FARBEN.tinte} />
      <text
        x={12}
        y={16.4}
        fill={FARBEN.grundRein}
        style={{
          fontFamily: SCHRIFT.familie,
          fontWeight: SCHRIFT.fett,
          fontSize: 9,
          letterSpacing: 0.3,
        }}
      >
        {seite.etikett.toUpperCase()}
      </text>
    </g>
  );

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
      <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet" style={{ maxHeight: '100%' }}>
        <Haelfte seite={buehne.oben} y={0} auf={1} />

        {/* Die Trennlinie gehoert zur unteren Haelfte: Sie erscheint mit ihr
            und markiert den Moment, in dem aus einem Bild ein Vergleich wird. */}
        <line
          x1={10}
          y1={HALB + 3}
          x2={190}
          y2={HALB + 3}
          stroke={FARBEN.flaeche}
          strokeWidth={1.5}
          opacity={zweite}
        />

        <Haelfte seite={buehne.unten} y={HALB + 6} auf={zweite} />
      </svg>
    </div>
  );
};

/* ─────────────────────────────── Auswahl ─────────────────────────────── */

export const Buehnenbild: React.FC<{ buehne: BuehnenbildDaten; dauer: number }> = ({ buehne, dauer }) => {
  switch (buehne.art) {
    case 'figur':
      return <Figurenbuehne buehne={buehne} dauer={dauer} />;
    case 'gegenueber':
      return <Gegenueber buehne={buehne} dauer={dauer} />;
  }
};
