import { z } from 'zod';

/**
 * Der Vertrag fuer die Figur.
 *
 * Bewusst **nicht** in `src/typen.ts`. Der haelt den Vertrag fuer einen
 * Short — was gesagt, belegt und gesendet wird. Eine Figur ist Bildwissen:
 * Sie hat keine Quelle, keine Position im Aufbau und keinen Sendetermin.
 * Was `typen.ts` von hier braucht, ist ein einziges Feld an der Szene.
 *
 * ## Warum ein Datenpaket und kein Bauteil
 *
 * Die Figur koennte als React-Komponente mit fest verdrahteten Pfaden
 * existieren. Dann waere jede Pose eine neue Komponente, und die Frage „dreht
 * der Arm um die Schulter oder um den Ellenbogen?" liesse sich nirgends
 * stellen — sie steckte in JSX. Als Datenpaket steht sie in `gelenke`, und
 * der Renderer bleibt fuer jede weitere Figur derselbe.
 *
 * ## Der Koordinatenraum ist der der Requisiten
 *
 * 200 x 150, Standlinie bei y = 140, nichts unter y = 146 — dieselben Masse
 * wie in `video/bausteine/Geraete.tsx`. Das ist die eigentliche Entscheidung
 * dieser Datei: Figur und Requisite stehen damit **ohne Umrechnung**
 * nebeneinander, und eine Hand kann auf einen Punkt zeigen, der im Symbol
 * wirklich dort liegt. Ein eigener Figurenraum haette bei jeder Beruehrung
 * eine Umrechnung verlangt, und die haette irgendwann jemand vergessen.
 */

export const BUEHNE_FIGUR = {
  breite: 200,
  hoehe: 150,
  /** Standlinie. Fuesse und Requisiten setzen hier auf. */
  boden: 140,
  /** Harte Untergrenze: Was tiefer liegt, wird lautlos abgeschnitten. */
  unterkante: 146,
} as const;

const Stil = z.object({
  fuellung: z.string().optional(),
  strich: z.string().optional(),
  staerke: z.number().optional(),
  /** Fuer Striche ohne Flaeche — Mund, Braue, Falte. */
  kappe: z.enum(['butt', 'round']).optional(),
});
export type Stil = z.infer<typeof Stil>;

/**
 * Die Formen, aus denen ein Teil besteht.
 *
 * Absichtlich nur vier. Wer eine fuenfte braucht, zeichnet vermutlich ein
 * Datenblatt — genau die Zeichnungen, die dieser Kanal nicht macht.
 */
const Form = z.discriminatedUnion('art', [
  z.object({ art: z.literal('pfad'), d: z.string(), stil: Stil.optional() }),
  z.object({
    art: z.literal('kreis'),
    cx: z.number(),
    cy: z.number(),
    r: z.number(),
    stil: Stil.optional(),
  }),
  z.object({
    art: z.literal('ellipse'),
    cx: z.number(),
    cy: z.number(),
    rx: z.number(),
    ry: z.number(),
    stil: Stil.optional(),
  }),
  z.object({
    art: z.literal('rechteck'),
    x: z.number(),
    y: z.number(),
    breite: z.number(),
    hoehe: z.number(),
    radius: z.number().optional(),
    stil: Stil.optional(),
  }),
]);
export type Form = z.infer<typeof Form>;

/**
 * Ein Teil der Figur.
 *
 * `ebene` steht **explizit** und wird nicht aus der Reihenfolge im Array
 * gelesen. Das ist die Lehre aus dem Skill `character-rigging`: Sobald ein
 * Teil verschoben, ergaenzt oder aus einer zweiten Ansicht uebernommen wird,
 * stimmt die Quellreihenfolge nicht mehr, und der Arm liegt hinter dem
 * Koerper, obwohl er davor liegen soll. Eine Zahl laesst sich lesen, eine
 * Reihenfolge muss man rekonstruieren.
 */
const Teil = z.object({
  id: z.string(),
  ebene: z.number().int(),
  /**
   * Uebergeordnetes Teil. Wer einen Elternteil hat, erbt dessen Drehung —
   * der Kopf dreht mit dem Rumpf, das Auge mit dem Kopf.
   */
  eltern: z.string().optional(),
  formen: z.array(Form).min(1),
  stil: Stil.optional(),
});
export type Teil = z.infer<typeof Teil>;

/**
 * Das Gelenk eines Teils: der Punkt, um den es dreht, und wie weit.
 *
 * Die Grenzen sind kein Schmuck. Ohne sie entsteht die Pose, die in der
 * QA-Liste „abgeloeste Gliedmassen" heisst: Ein Arm, der um 180 Grad dreht,
 * sieht im Code wie eine Zahl aus und im Standbild wie ein Bruch. Der
 * Renderer klemmt hart auf diese Werte, statt zu melden — eine Pose soll
 * notfalls zu zahm sein, nicht kaputt.
 */
const Gelenk = z.object({
  /** Drehpunkt in Buehnenkoordinaten, nicht relativ zum Teil. */
  pivot: z.tuple([z.number(), z.number()]),
  /** Zulaessige Drehung in Grad, [min, max]. */
  drehung: z.tuple([z.number(), z.number()]),
});
export type Gelenk = z.infer<typeof Gelenk>;

export const Rig = z
  .object({
    id: z.string(),
    /** Eine Ansicht zuerst. Weitere erst, wenn eine Szene sie verlangt. */
    ansicht: z.enum(['vorn']),
    teile: z.array(Teil).min(1),
    gelenke: z.record(z.string(), Gelenk),
    /**
     * Punkte, an denen die Figur etwas halten oder worauf sie zeigen kann.
     * Requisiten haengen hier, statt eigene Koordinaten mitzubringen.
     */
    griffe: z.record(z.string(), z.tuple([z.number(), z.number()])),
  })
  .superRefine((rig, ctx) => {
    const ids = new Set(rig.teile.map((t) => t.id));

    for (const teil of rig.teile) {
      if (teil.eltern && !ids.has(teil.eltern)) {
        ctx.addIssue({
          code: 'custom',
          message: `Teil „${teil.id}" nennt Elternteil „${teil.eltern}", das es nicht gibt.`,
        });
      }
    }

    /*
     * Jedes bewegliche Teil braucht einen Pivot — die erste Zeile der
     * Pruefliste im Skill. Die Umkehrung ist die interessantere Haelfte: Ein
     * Gelenk ohne Teil ist ein Tippfehler, der sonst nie auffaellt, weil der
     * Renderer es schlicht nie nachschlaegt. Die Pose sieht dann steif aus,
     * und niemand weiss warum.
     */
    for (const id of Object.keys(rig.gelenke)) {
      if (!ids.has(id)) {
        ctx.addIssue({
          code: 'custom',
          message: `Gelenk „${id}" gehoert zu keinem Teil.`,
        });
      }
    }

    for (const [id, gelenk] of Object.entries(rig.gelenke)) {
      const [min, max] = gelenk.drehung;
      if (min > max) {
        ctx.addIssue({
          code: 'custom',
          message: `Gelenk „${id}": Untergrenze ${min} liegt ueber der Obergrenze ${max}.`,
        });
      }
    }
  });
export type Rig = z.infer<typeof Rig>;

/**
 * Eine Pose: je Gelenk ein Winkel, dazu Blick und Mund.
 *
 * `blick` verschiebt die Pupillen, nicht den Kopf. Beides zugleich zu drehen
 * ist der haeufigste Grund, warum eine Figur schielt.
 */
export const Pose = z.object({
  drehung: z.record(z.string(), z.number()).default({}),
  /** Pupillenversatz in Buehneneinheiten, [x, y]. Klein halten: ±2 reicht. */
  blick: z.tuple([z.number(), z.number()]).default([0, 0]),
  /**
   * Fuenf Mundformen. `laecheln` kam am 24.08.2026 dazu, nach dem ersten
   * fertigen Video im neuen Bau: Die Figur wirkte durchgehend ernst bis
   * betruebt. Der Grund stand im Rig — `schmal` ist zwar ein Bogen nach oben,
   * aber ein sehr flacher, und die haeufigsten Posen trugen `strich` oder
   * `zug`. Eine Figur, die in acht von zehn Posen nicht laechelt, laechelt im
   * Video nie.
   */
  mund: z.enum(['strich', 'offen', 'schmal', 'zug', 'laecheln']).default('strich'),
  /**
   * Senkrechte Stauchung je Teil, um dessen Pivot. `1` ist unveraendert,
   * `0` ist zugedrueckt.
   *
   * Sie existiert wegen des Blinzelns, ist aber bewusst **nicht** danach
   * benannt. Ein Feld `lidschluss` haette dem Renderer beibringen muessen,
   * welche Teile Augen sind — also eine Figur in ein Bauteil geschrieben,
   * das keine Figur kennen darf. Als Stauchung um einen Pivot ist es
   * dieselbe Rechnung wie eine Drehung, und ein Auge ist nur das Teil, dem
   * das Rig einen Pivot in der Augenmitte gibt.
   */
  stauchung: z.record(z.string(), z.number()).default({}),
  /** Hebt die ganze Figur, ohne ein Gelenk zu bemuehen — fuer Atmen. */
  hub: z.number().default(0),
});
export type Pose = z.infer<typeof Pose>;

/**
 * Die benannten Haltungen. Die Werte selbst stehen in
 * `video/bausteine/posen.ts` — hier steht nur, welche es gibt.
 *
 * Die Trennung ist nicht kosmetisch: `src/typen.ts` braucht die Namen, weil
 * eine Szene ihre Buehne ueber sie beschreibt, und der Vertrag darf nicht auf
 * den Renderer zeigen. Umgekehrt haette der Vertrag die Winkel aufnehmen
 * muessen, und dann stuenden Gradzahlen in einer Datei, die das Schema fuer
 * Sprechtexte und Quellen haelt.
 *
 * `posen.ts` haelt sich per `Record<PosenName, Pose>` daran — fehlt dort eine,
 * meldet es `tsc`.
 */
export const PosenName = z.enum([
  'ruhe',
  'lesen',
  'zeigen',
  'stutzen',
  'staunen',
  'achselzucken',
  /*
   * Vier dazu am 23.08.2026, nach dem ersten fertigen Satz Videos. Der Befund
   * kam vom Zuschauer und war eindeutig: „Er macht staendig immer nur dieselben
   * Bewegungen."
   *
   * Der Kommentar in `posen.ts` verteidigte die Beschraenkung mit dem Satz,
   * eine Figur mit dreissig Posen waere „eine Figur, die spielt". Das Argument
   * stimmt und traf den falschen Fall: Bei acht Videos hintereinander sind
   * sechs Posen keine Zurueckhaltung mehr, sondern eine Schleife.
   */
  /** Erklaeren: der ausgestreckte Arm zum Bild hin. */
  'erklaeren',
  /** Von unten nach oben schauen, wenn die Figur klein im Bild steht. */
  'hochschauen',
  /** Gruss mit erhobenem Arm. */
  'winken',
  /** Hand an der Wange. Die Pause vor der Aufloesung. */
  'nachdenken',
]);
export type PosenName = z.infer<typeof PosenName>;

/**
 * Klemmt einen Winkel in die Grenzen seines Gelenks.
 *
 * Steht hier und nicht im Renderer, damit eine Posenpruefung dieselbe
 * Rechnung benutzen kann wie das Bild. Zwei Fassungen derselben Klemmung
 * waeren genau die Sorte Doppelung, die spaeter auseinanderlaeuft.
 */
export const winkelKlemmen = (rig: Rig, teilId: string, winkel: number): number => {
  const gelenk = rig.gelenke[teilId];
  if (!gelenk) return 0;
  const [min, max] = gelenk.drehung;
  return Math.min(max, Math.max(min, winkel));
};
