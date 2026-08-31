import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FARBEN } from '../src/marke';
import { PosenName } from '../src/figur';
import {
  Buehnenbild,
  WORTWECHSEL,
  wortwechselKanten,
  type Wortwechselstand,
} from './bausteine/Buehnenbild';
import { Sprecherstand } from './bausteine/Sprecherstand';

/**
 * Der Prueftisch fuer den Wortwechsel. Kein Sendeinhalt.
 *
 * **Gerendert wird durch `Buehnenbild` selbst**, mit `stand` als Prop. Ein
 * Nachbau der Anordnung waere eine zweite Geometrie neben der echten und liefe
 * beim ersten Umbau lautlos auseinander — dieselbe Ueberlegung, aus der
 * `daten/figur/zeiger.ts` vom `nachleser` ableitet, statt ihn abzuschreiben.
 *
 *     npx remotion still video/index.ts Wortwechselprobe probe.png
 *
 * ## Zwei Fragen, zwei Bloecke
 *
 * **Block 1 — passen sie ueberhaupt ins Bild?** Am 31.08.2026 war die Antwort
 * nein, und zwar rechnerisch zwingend: Bei `links: 42`, `rechts: 158`, voller
 * Groesse und Zoom 1,06 lag Voltis linke Kante bei −10 und Wattis rechte bei
 * 220, waehrend das Feld von 5,7 bis 194,3 reicht. **Beide verloren ihre
 * aeussere Hand**, und in der Mitte blieben zugleich zwei Einheiten Luft.
 *
 * Die Rechnung dahinter ist eine Zeile: Zwei Figuren nebeneinander brauchen
 * `228,8 × groesse + luecke` Einheiten, das Feld ist `200 / zoom` breit. Bei
 * voller Groesse sind das 228,8 gegen 188,7 — es geht nicht auf, egal wie man
 * die beiden hinstellt. **Der fehlende Freiheitsgrad war die Groesse.**
 *
 * Jede Kachel traegt ihre gerechneten Kanten als Zeile darunter, damit das
 * Auge die Rechnung gegenpruefen kann statt sie zu ersetzen.
 *
 * **Block 2 — welche Pose passt zu zweit?** Am 26.08.2026 sind in zwei Shorts
 * nacheinander Haende im Gehaeuse der anderen Figur gelandet, jedes Mal erst im
 * fertigen Standbild. Die Antwort hat seither dreimal gewechselt, weil sie an
 * der Anordnung haengt und nicht an der Pose: erst drei gesperrt, dann keine,
 * dann drei andere, seit dem Umbau auf zwei gestauchte Figuren nur noch
 * `achselzucken`.
 *
 * **Deshalb steht die Liste nirgends geschrieben.**
 * `zuBreiteWortwechselposen` rechnet sie aus `AUSSENREICHWEITE` und dem
 * aktuellen Stand; `skripte/schemapruefung.ts` haelt sie gegen die Sperre in
 * `src/pruefung.ts`. Drei handgeschriebene Listen in einer Woche waeren drei
 * still falsche gewesen.
 *
 * **Und dieser Prueftisch beantwortet die andere Haelfte**, die keine Rechnung
 * kann: ob eine Pose, die rechnerisch passt, auch aussieht, als paesse sie.
 */

const POSEN = PosenName.options;

/** Die Kandidaten aus der Rechnung. Der erste ist der laufende Stand. */
const KANDIDATEN: { titel: string; stand: Wortwechselstand }[] = [
  { titel: 'laufend', stand: WORTWECHSEL },
  {
    titel: 'groesser',
    stand: { links: 51, rechts: 149, groesse: 0.75, ziel: { x: 100, y: 84, zoom: 1.0 } },
  },
  {
    titel: 'wie Volti frueher',
    stand: { links: 48, rechts: 152, groesse: 0.7, ziel: { x: 100, y: 84, zoom: 1.0 } },
  },
  {
    titel: 'zu klein (verworfen)',
    stand: { links: 49, rechts: 151, groesse: 0.62, ziel: { x: 100, y: 84, zoom: 1.0 } },
  },
];

const Zahlenzeile: React.FC<{ stand: Wortwechselstand }> = ({ stand }) => {
  const k = wortwechselKanten(stand);
  const eng = (wert: number, min: number) => (wert < min ? FARBEN.anzeigeZwei : FARBEN.tinte);
  const z = (n: number) => n.toFixed(1);
  return (
    <div
      style={{
        fontFamily: 'Inter',
        fontSize: 15,
        color: FARBEN.tinte,
        padding: '4px 12px',
        display: 'flex',
        gap: 14,
      }}
    >
      <span>g {stand.groesse.toFixed(2)}</span>
      <span>zoom {stand.ziel.zoom.toFixed(2)}</span>
      <span>Feld {z(k.feld.von)}–{z(k.feld.bis)}</span>
      <span style={{ color: eng(k.linksAussen - k.feld.von, 0) }}>links {z(k.linksAussen)}</span>
      <span style={{ color: eng(k.feld.bis - k.rechtsAussen, 0) }}>rechts {z(k.rechtsAussen)}</span>
      <span style={{ color: eng(k.luecke, 10) }}>Lücke {z(k.luecke)}</span>
    </div>
  );
};

const Kachel: React.FC<{
  links: string;
  rechts: string;
  titel: string;
  stand?: Wortwechselstand;
  breite?: number;
  hoehe?: number;
  mitZahlen?: boolean;
}> = ({ links, rechts, titel, stand, breite = 618, hoehe = 464, mitZahlen = false }) => (
  /*
   * **Die Kachel ist ein Flex-Kasten, und das ist keine Zierde.** Das `<svg>`
   * der Buehne traegt `flex: 1` mit `alignSelf: 'stretch'` — in einem Kasten
   * ohne `display: flex` greift beides nicht, und das SVG nimmt seine
   * Eigengroesse und laeuft unten aus der Kachel heraus. Im ersten Anlauf am
   * 31.08.2026 sah der Prueftisch dadurch aus, als waeren die Figuren viel zu
   * gross — gemessen wurde die Kachel, nicht die Anordnung.
   *
   * `overflow: hidden` daneben, damit ein Ueberlauf wieder auffaellt, statt
   * die Nachbarkachel zu ueberdecken. Und die Vorgabehoehe steht auf 464 statt
   * 372: Das ist die Buehne 200 x 150 auf 618 Breite, also **ihr** Verhaeltnis
   * statt eines gegriffenen.
   */
  <div
    style={{
      width: breite,
      height: hoehe,
      border: `2px solid ${FARBEN.gitter}`,
      boxSizing: 'border-box',
      position: 'relative',
      display: 'flex',
      overflow: 'hidden',
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
    {mitZahlen && stand && (
      <div style={{ position: 'absolute', bottom: 2, left: 0, zIndex: 2 }}>
        <Zahlenzeile stand={stand} />
      </div>
    )}
    <Buehnenbild
      buehne={{
        art: 'figur',
        von: links as never,
        nach: links as never,
        gegenueber: { von: rechts as never, nach: rechts as never },
      }}
      dauer={120}
      stand={stand}
    />
  </div>
);

/**
 * **Frage 1: passen sie ueberhaupt ins Bild?**
 *
 * Dieselbe Pose, vier Anordnungen. `erklaeren` links gegen `zeigen` rechts ist
 * der haerteste Fall — beide strecken einen Arm ueber die eigene Mitte,
 * greifen also gleichzeitig aufeinander zu.
 *
 *     npx remotion still video/index.ts Wortwechselstaende staende.png
 */
export const Wortwechselstaende: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: FARBEN.grund, padding: 20 }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {KANDIDATEN.map((k) => (
        <Kachel
          key={`a-${k.titel}`}
          links="erklaeren"
          rechts="zeigen"
          titel={k.titel}
          stand={k.stand}
          breite={920}
          hoehe={690}
          mitZahlen
        />
      ))}
    </div>
  </AbsoluteFill>
);

/**
 * **Frage 2: welche Pose greift in die andere Figur?**
 *
 * Alle Posen im laufenden Stand, oben je links, unten je rechts.
 *
 *     npx remotion still video/index.ts Wortwechselprobe probe.png
 */
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

/**
 * **Frage 3: schaltet `ansprechen` die Zuwendung wirklich ab?**
 *
 *     npx remotion still video/index.ts Zuwendungsprobe zuwendung.png --frame=20
 *
 * ## Warum diese Probe einen Wrapper braucht und die beiden oberen nicht
 *
 * `Wortwechselprobe` rendert `Buehnenbild` **ohne** `Sprecherstand`. Die
 * Sprechstaerke ist dort also 0, und damit zeigt sie ausgerechnet die beiden
 * Groessen nicht, gegen die `ansprechen` antritt: `BLICK_ZUR_MITTE` und
 * `HINLEHNEN` werden mit der Staerke multipliziert. Fuer die Frage „passt die
 * Hand ins Bild" ist das richtig — eine ruhende Figur ist die breiteste —,
 * fuer diese Frage macht es die Probe blind.
 *
 * **Das Bild 20 ist Teil der Probe.** Der Sprecherwechsel laeuft ueber
 * `UEBERGANG_SEK = 0,25`, also acht Bilder. Bei Bild 0 steht die Staerke auf 0,
 * und die Probe zeigte dann dasselbe wie ihre eigene Gegenprobe.
 *
 * ## Was zu sehen sein muss
 *
 * Links `ansprechen`: Pupillen **mittig** im Auge, Gehaeuse **senkrecht**.
 * Rechts daneben dieselbe Figur mit `ruhe`, und dort muessen beide da sein —
 * Pupille zur Mitte versetzt, Gehaeuse leicht geneigt. **Ohne die Gegenprobe
 * beweist die Probe nur, dass die Zuwendung ueberhaupt noch anliegt**, nicht
 * dass die Pose sie ausnimmt.
 */
const spricht = (wer: 'nachleser' | 'zeiger') =>
  [
    /*
     * Zwei Abschnitte mit derselben Startsekunde: `sprecherZu` nimmt den
     * letzten erreichten, `sprechstaerke` sieht dazwischen einen Wechsel bei
     * 0 und faehrt den zweiten binnen 0,25 s auf 1. Ein einzelner Abschnitt
     * genuegt nicht — `Sprecherstand` haelt einen Short mit einem Abschnitt
     * fuer einstimmig und liefert gar keine Staerke.
     */
    { datei: '', sprecher: wer === 'nachleser' ? ('zeiger' as const) : ('nachleser' as const), startSek: 0 },
    { datei: '', sprecher: wer, startSek: 0 },
  ];

const Zuwendungsfeld: React.FC<{
  titel: string;
  links: PosenName;
  rechts: PosenName;
  wer: 'nachleser' | 'zeiger';
}> = ({ titel, links, rechts, wer }) => (
  <Sprecherstand abschnitte={spricht(wer)}>
    <Kachel links={links} rechts={rechts} titel={titel} breite={620} hoehe={470} />
  </Sprecherstand>
);

export const Zuwendungsprobe: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: FARBEN.grund, padding: 20 }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Zuwendungsfeld titel="Volti spricht · ansprechen" links="ansprechen" rechts="ruhe" wer="nachleser" />
      <Zuwendungsfeld titel="Volti spricht · ruhe (Gegenprobe)" links="ruhe" rechts="ruhe" wer="nachleser" />
      <Zuwendungsfeld titel="Watti spricht · ansprechen" links="ruhe" rechts="ansprechen" wer="zeiger" />
      <Zuwendungsfeld titel="Watti spricht · ruhe (Gegenprobe)" links="ruhe" rechts="ruhe" wer="zeiger" />
    </div>
  </AbsoluteFill>
);
