import fs from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';
import { Bauform, Format, Sachgebiet } from './typen';

/**
 * Die Rückschau — was hinausging, neben dem, was ankam.
 *
 * `skripte/rueckblick.ts` holt die Zahlen und schreibt sie nach
 * `daten/rueckblick.json`. Damit war der Kreis gebaut, aber nicht geschlossen:
 * Die Zahlen lagen neben der Produktion, nicht darin. Wer wissen wollte,
 * welches **Format** ein Ausreißer hatte oder welcher **Aufschlag** gehalten
 * hat, musste zwei Dateien nebeneinanderlegen und von Hand zuordnen.
 *
 * Dieses Modul legt sie zusammen. Es holt nichts ab und schreibt nichts —
 * es liest nur, was schon dasteht.
 *
 * **Die Brücke ist `laeufe/<tag>/lauf.json`, nicht `daten/verlauf.json`.**
 * Der Verlauf kennt nur die `themaId`, der Rückblick nur die `shortId`; die
 * beiden sind meistens, aber nicht immer gleich. `lauf.json` trägt beide und
 * dazu die Szenen — und die braucht es für den Aufschlagtext ohnehin.
 *
 * Der Preis dafür steht in `.gitignore`: `laeufe/` wird nicht versioniert.
 * Auf einem frischen Klon ist die Rückschau leer, und zwar stumm. Deshalb
 * sagt sie das ausdrücklich, statt eine leere Tabelle zu zeigen.
 */

export const RUECKBLICKDATEI = 'daten/rueckblick.json';
export const LAEUFE = 'laeufe';

/** Ende des Aufschlags. Dieselbe Grenze wie in `src/pruefung.ts`. */
export const AUFSCHLAG_SEK = 3.5;

/**
 * Ab wie vielen gemessenen Videos ein Median etwas bedeutet.
 *
 * Acht ist keine schöne Zahl, sondern die Wochenmenge: Vorher vergleicht man
 * ein Video mit sich selbst. Wer darunter eine Rangfolge aufstellt, hat
 * geraten — und geratene Größen haben hier schon zweimal Geld gekostet
 * (`ZEICHEN_PRO_SEKUNDE`, `pauseSek`).
 */
export const GENUG_FUER_MEDIAN = 8;

/** Ab wie vielen Videos je Format sich Formate überhaupt vergleichen lassen. */
export const GENUG_JE_FORMAT = 5;

/**
 * Was ein einzelner Kanal zu einem Short meldet — die Zahlen aus Buffer.
 *
 * **Hier steht die Form, nicht in `skripte/rueckblick.ts`.** Das Skript hat
 * sie am 05.09.2026 selbst beschrieben, und dieselbe Form zweimal zu
 * beschreiben ist in diesem Projekt schon dreimal auseinandergelaufen. Es
 * importiert den Typ jetzt von hier; die Übersetzung der Buffer-Namen bleibt
 * dort, denn die gehört zum Holen und nicht zum Lesen.
 *
 * `undefined` heißt „dieser Dienst kennt die Größe nicht", `0` heißt „keine".
 * Der Unterschied trägt: Buffer schickt für YouTube kein `Reach` und für
 * TikTok kein `Follows` — eine 0 an diesen Stellen wäre eine Messung, die
 * niemand gemacht hat.
 */
export const Kanalmessung = z.object({
  aufrufe: z.number(),
  reichweite: z.number().optional(),
  likes: z.number(),
  kommentare: z.number(),
  geteilt: z.number().optional(),
  gespeichert: z.number().optional(),
  neueAbos: z.number().optional(),
  /** Durchschnittliche Sehdauer in Sekunden — bisher nur von TikTok. */
  sehdauerSek: z.number().optional(),
  /** Wann Buffer die Zahlen zuletzt geholt hat. */
  stand: z.string().nullable(),
});
export type Kanalmessung = z.infer<typeof Kanalmessung>;

export const Messung = z.object({
  gemessenAm: z.string(),
  aufrufe: z.number(),
  likes: z.number(),
  kommentare: z.number(),
  durchsicht: z.number().nullable(),
  haltequote: z.number().nullable(),
  geteilt: z.number().nullable(),
  neueAbos: z.number().nullable(),
  /**
   * Dieselbe Messung je Kanal, seit dem 05.09.2026.
   *
   * **Das Feld hat hier gefehlt, und das war kein Schönheitsfehler.** Zod
   * streift ab, was nicht beschrieben ist: `skripte/rueckblick.ts` schrieb
   * `jeKanal` in die Datei, und `rueckblickLesen` warf es beim Parsen wieder
   * weg. Alle vier Leser — `ausreisser`, `aufschlaege`, `laengen`,
   * `schemapruefung` — waren damit für Instagram und TikTok blind, obwohl die
   * Zahlen dastanden. Eine Lücke, die keinen Fehler wirft, weil ein Feld
   * einfach verschwindet.
   *
   * Optional, weil die Messungen vor diesem Tag es nicht haben. Pflicht
   * gemacht hieße, jede ältere Messung zu verwerfen.
   */
  jeKanal: z.record(z.string(), Kanalmessung).optional(),
});
export type Messung = z.infer<typeof Messung>;

/**
 * Die drei Kanäle, in der Reihenfolge, in der sie in jeder Ausgabe stehen.
 *
 * Eine feste Liste und nicht die Schlüssel aus den Daten: Ein Kanal, der eine
 * Woche lang nichts meldet, soll als Zeile mit einem Strich dastehen und nicht
 * aus der Tabelle verschwinden — sonst liest sich ein Ausfall wie ein Kanal,
 * den es nicht gibt.
 */
export const KANAELE = ['youtube', 'instagram', 'tiktok'] as const;
export type Kanal = (typeof KANAELE)[number];

export const Rueckblickeintrag = z.object({
  shortId: z.string(),
  titel: z.string(),
  online: z.string(),
  laengeSek: z.number(),
  videoId: z.string(),
  link: z.string(),
  messungen: z.array(Messung),
});
export type Rueckblickeintrag = z.infer<typeof Rueckblickeintrag>;

const Rueckblickdatei = z.object({
  _hinweis: z.string().optional(),
  shorts: z.record(z.string(), Rueckblickeintrag),
});

/** Liest den Rückblick. Fehlt die Datei, ist er leer — kein Fehler. */
/**
 * Die Kennungen aller Shorts, die schon draussen sind — synchron.
 *
 * **Synchron, weil `wochenAuswaehlen` synchron ist**, und die Alternative waere
 * gewesen, die Auswahl asynchron zu machen, damit sie eine Datei lesen kann,
 * die 16 KB gross ist.
 *
 * Fehlt die Datei, ist nichts gesendet — das ist der Zustand eines frischen
 * Klons und kein Fehler.
 */
export const rueckblickLesenSync = (datei = RUECKBLICKDATEI): Record<string, unknown> => {
  try {
    const roh = JSON.parse(readFileSync(datei, 'utf8')) as { shorts?: Record<string, unknown> };
    return roh.shorts ?? {};
  } catch (fehler) {
    if ((fehler as NodeJS.ErrnoException).code === 'ENOENT') return {};
    throw fehler;
  }
};

export const rueckblickLesen = async (
  datei = RUECKBLICKDATEI,
): Promise<Rueckblickeintrag[]> => {
  try {
    const roh = JSON.parse(await fs.readFile(datei, 'utf8'));
    return Object.values(Rueckblickdatei.parse(roh).shorts);
  } catch (fehler) {
    if ((fehler as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw fehler;
  }
};

/**
 * Was ein Lauf über einen Short weiß — schmal gehalten.
 *
 * `lauf.json` ist 21 KB je Woche und trägt jeden Sprechtext. Hier wird nur
 * herausgenommen, was die Rückschau braucht; alles andere bliebe sonst im
 * Speicher und in jeder Ausgabe im Weg.
 */
export type Herkunft = {
  shortId: string;
  lauf: string;
  format: Format;
  sachgebiet: Sachgebiet;
  /**
   * Wie der Short gebaut war. **Optional, und das bleibt so.**
   *
   * `bauform` gibt es erst seit dem 25.08.2026; die Laeufe davor kennen das
   * Feld nicht. Es zur Pflicht zu machen hiesse, dass `safeParse` unten jeden
   * alten Lauf verwirft — und damit waeren die neun veroeffentlichten Videos
   * auf einen Schlag herkunftslos, samt ihrer Formate und Aufschlaege.
   */
  bauform?: Bauform;
  themaId: string;
  arbeitstitel: string;
  /** Der gesprochene Text der Aufschlagszenen, zusammengezogen. */
  aufschlag: string;
};

const LaufShort = z.object({
  id: z.string(),
  themaId: z.string(),
  format: Format,
  sachgebiet: Sachgebiet,
  bauform: Bauform.optional(),
  arbeitstitel: z.string(),
  szenen: z.array(
    z.object({
      sprechtext: z.string().optional(),
      position: z.string().optional(),
    }).passthrough(),
  ),
});

const Laufdatei = z.object({ id: z.string(), shorts: z.array(LaufShort) });

/**
 * Liest alle Läufe und gibt je `shortId` die **jüngste** Herkunft zurück.
 *
 * Von hinten nach vorn, aus demselben Grund wie in `skripte/rueckblick.ts`:
 * Am 18.08.2026 wurde eine Woche nach der Bebilderung ein zweites Mal
 * geplant. Ein Short kommt dann in zwei Läufen vor, und draußen liegt der
 * neuere.
 */
export const herkuenfteLesen = async (ordner = LAEUFE): Promise<Map<string, Herkunft>> => {
  const herkuenfte = new Map<string, Herkunft>();
  if (!existsSync(ordner)) return herkuenfte;

  const tage = (await fs.readdir(ordner)).sort().reverse();
  for (const tag of tage) {
    const datei = join(ordner, tag, 'lauf.json');
    if (!existsSync(datei)) continue;

    const ergebnis = Laufdatei.safeParse(JSON.parse(await fs.readFile(datei, 'utf8')));
    if (!ergebnis.success) continue; // Ein alter Lauf gegen das heutige Schema ist kein Fehler, nur unlesbar.

    for (const short of ergebnis.data.shorts) {
      if (herkuenfte.has(short.id)) continue;
      herkuenfte.set(short.id, {
        shortId: short.id,
        lauf: ergebnis.data.id,
        format: short.format,
        sachgebiet: short.sachgebiet,
        bauform: short.bauform,
        themaId: short.themaId,
        arbeitstitel: short.arbeitstitel,
        aufschlag: short.szenen
          .filter((s) => s.position === 'aufschlag')
          .map((s) => s.sprechtext?.trim())
          .filter((t): t is string => !!t)
          .join(' '),
      });
    }
  }
  return herkuenfte;
};

/** Ein Short mit allem, was über ihn bekannt ist. */
export type Rueckschau = {
  herkunft: Herkunft | undefined;
  eintrag: Rueckblickeintrag;
  /** Die jüngste Messung. */
  zuletzt: Messung;
  /**
   * Die jüngste Messung, die eine Haltequote trägt.
   *
   * Getrennt von `zuletzt`, weil Analytics ein bis drei Tage nachhinkt: Die
   * Messung von heute kann Aufrufe haben und trotzdem keine Kurve. Wer dann
   * `zuletzt.haltequote` liest, sieht `null` und hält das Video für tot,
   * obwohl gestern eine Zahl dastand.
   */
  mitHalt: Messung | undefined;
};

export const zusammenfuehren = (
  eintraege: Rueckblickeintrag[],
  herkuenfte: Map<string, Herkunft>,
): Rueckschau[] =>
  eintraege
    .filter((e) => e.messungen.length > 0)
    .map((eintrag) => {
      const sortiert = [...eintrag.messungen].sort((a, b) =>
        a.gemessenAm.localeCompare(b.gemessenAm),
      );
      return {
        herkunft: herkuenfte.get(eintrag.shortId),
        eintrag,
        // Der Filter oben garantiert mindestens eine Messung.
        zuletzt: sortiert[sortiert.length - 1]!,
        mitHalt: [...sortiert].reverse().find((m) => m.haltequote !== null),
      };
    })
    .sort((a, b) => a.eintrag.online.localeCompare(b.eintrag.online));

/** Median einer Zahlenreihe. Leer ergibt `null`, nicht 0. */
export const median = (werte: number[]): number | null => {
  if (werte.length === 0) return null;
  const s = [...werte].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
};

/**
 * Die Messung, die als Vergleichspunkt für einen Zuwachs taugt.
 *
 * Gesucht wird die **jüngste** Messung, die mindestens `tage` älter ist als
 * die neueste. Gibt es keine, ist es die älteste überhaupt — und dann sagt
 * `spanneTage` daneben, worüber der Zuwachs wirklich geht.
 *
 * **Der Rückblick misst nicht so zuverlässig, wie sein Name verspricht.** Am
 * 05.09.2026 standen sechs Messtage seit dem 18.08. in der Ablage, mit einer
 * Lücke von sechs Tagen darin. Eine Auswertung, die „diese Woche" auf eine
 * Zahl schreibt, die über elf Tage entstanden ist, erfindet eine Genauigkeit,
 * die die Messreihe nicht hergibt. Deshalb wird die Spanne mitgeliefert und
 * nicht verschwiegen.
 */
export const vergleichspunkt = (
  messungen: Messung[],
  tage: number,
): { davor: Messung; jetzt: Messung; spanneTage: number } | null => {
  if (messungen.length < 2) return null;
  const s = [...messungen].sort((a, b) => a.gemessenAm.localeCompare(b.gemessenAm));
  const jetzt = s[s.length - 1]!;
  const grenze = new Date(new Date(jetzt.gemessenAm).getTime() - tage * 86_400_000)
    .toISOString()
    .slice(0, 10);
  const passend = s.filter((m) => m.gemessenAm <= grenze);
  const davor = passend.length > 0 ? passend[passend.length - 1]! : s[0]!;
  if (davor.gemessenAm === jetzt.gemessenAm) return null;
  const spanne = Math.round(
    (new Date(jetzt.gemessenAm).getTime() - new Date(davor.gemessenAm).getTime()) / 86_400_000,
  );
  return { davor, jetzt, spanneTage: spanne };
};

/** `41 %`, oder ein Gedankenstrich. Nie `0 %` für „nicht gemessen". */
export const prozent = (v: number | null | undefined, breite = 3): string =>
  v === null || v === undefined ? '—'.padStart(breite + 2) : `${v.toFixed(0).padStart(breite)} %`;

/** Tage zwischen Veröffentlichung und heute. */
export const tageDraussen = (online: string): number =>
  Math.floor((Date.now() - new Date(online).getTime()) / 86_400_000);

/**
 * „heute", „1 Tag", „3 Tage".
 *
 * Klingt nach Kleinkram und ist auf einem Kanal, der „Ganz akkurat" heißt,
 * keiner: „1 Tage draußen" stand in der ersten Fassung dieser Ausgabe.
 */
export const tageText = (tage: number): string =>
  tage === 0 ? 'heute' : tage === 1 ? '1 Tag' : `${tage} Tage`;

/**
 * Dasselbe für den Fließtext, wo der Dativ steht: „seit 3 Tagen draußen".
 *
 * Getrennt von `tageText`, weil die Tabellenspalte den Nominativ braucht
 * („3 Tage") und der Satz den Dativ („seit 3 Tagen") — eine Form für beides
 * ist in einer der beiden Stellen falsch.
 */
export const seitText = (tage: number): string =>
  tage === 0
    ? 'heute veröffentlicht'
    : tage === 1
      ? 'seit 1 Tag draußen'
      : `seit ${tage} Tagen draußen`;
