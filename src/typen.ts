/**
 * Datenvertraege der Pipeline.
 *
 * Diese Schemata sind die Schnittstelle zwischen Skript-Engine und Renderer.
 * Was hier nicht validiert, wird nicht gerendert — so kann kein halbfertiges
 * oder unbelegtes Skript versehentlich in die Produktion laufen.
 */
import { z } from 'zod';

/* ────────────────────────────── Quellen ────────────────────────────── */

/**
 * Belegpflicht: Jede technische Kernaussage braucht eine Hersteller- oder
 * Standardquelle. Das ist die Produktionsregel aus der Markenstrategie,
 * hier technisch erzwungen statt nur aufgeschrieben.
 */
export const Quelle = z.object({
  id: z.string(),
  titel: z.string(),
  url: z.url(),
  herausgeber: z.string(),
  /** Wann zuletzt geprueft. Preise und Spezifikationen altern. */
  geprueftAm: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  art: z.enum(['hersteller', 'standard', 'behoerde', 'plattform', 'messung', 'presse']),
});
export type Quelle = z.infer<typeof Quelle>;

/* ────────────────────────────── Szenen ─────────────────────────────── */

/** Gemeinsame Felder jeder Szene. */
const SzeneBasis = z.object({
  /**
   * Was gesprochen wird. Die Szenenlaenge ergibt sich spaeter aus der
   * tatsaechlichen Sprechdauer, nicht aus einer geschaetzten Sekundenzahl.
   */
  sprechtext: z.string().min(1),
});

/** Aufhaenger. Die ersten drei Sekunden entscheiden ueber alles Weitere. */
const SzeneHook = SzeneBasis.extend({
  art: z.literal('hook'),
  /** Kurz und konkret. Laenger als sieben Woerter liest im Feed niemand. */
  text: z.string().max(70),
  /** Optionaler Unterton, z.B. das Geraet oder die Situation. */
  kontext: z.string().max(60).optional(),
});

/** Eine Behauptung mit optionaler Hervorhebung eines Schluesselworts. */
const SzeneAussage = SzeneBasis.extend({
  art: z.literal('aussage'),
  text: z.string().max(140),
  /** Teilstring aus text, der in Signalblau gesetzt wird. */
  hervorhebung: z.string().optional(),
});

/** Grosse Zahl mit Einheit — Wattzahlen, Aufloesungen, Bildwiederholraten. */
const SzeneZahl = SzeneBasis.extend({
  art: z.literal('zahl'),
  wert: z.string().max(12),
  einheit: z.string().max(16).optional(),
  bedeutung: z.string().max(90),
});

/** Zwei Optionen gegenuebergestellt — der Kern der Kaufentscheidung. */
const SzeneVergleich = SzeneBasis.extend({
  art: z.literal('vergleich'),
  ueberschrift: z.string().max(50).optional(),
  links: z.object({
    titel: z.string().max(28),
    zeilen: z.array(z.string().max(40)).min(1).max(4),
    bewertung: z.enum(['ja', 'nein', 'achtung']).optional(),
  }),
  rechts: z.object({
    titel: z.string().max(28),
    zeilen: z.array(z.string().max(40)).min(1).max(4),
    bewertung: z.enum(['ja', 'nein', 'achtung']).optional(),
  }),
});

/** Pruefpunkte, die nacheinander erscheinen. */
const SzeneCheckliste = SzeneBasis.extend({
  art: z.literal('checkliste'),
  ueberschrift: z.string().max(50),
  punkte: z
    .array(
      z.object({
        text: z.string().max(60),
        bewertung: z.enum(['ja', 'nein', 'achtung', 'neutral']).default('neutral'),
      }),
    )
    .min(2)
    .max(5),
});

/** Der Moment, in dem etwas nicht funktioniert. Traegt die meisten Videos. */
const SzeneWarnung = SzeneBasis.extend({
  art: z.literal('warnung'),
  text: z.string().max(120),
  /** Was stattdessen zu tun ist. Ohne Loesung bleibt nur Frust. */
  loesung: z.string().max(120).optional(),
});

/** Signalweg zwischen Geraeten — die Signaturszene dieser Nische. */
const SzeneAnschluss = SzeneBasis.extend({
  art: z.literal('anschluss'),
  ueberschrift: z.string().max(50).optional(),
  kette: z
    .array(
      z.object({
        geraet: z.enum(['notebook', 'dock', 'monitor', 'kabel', 'netzteil', 'telefon', 'powerbank', 'adapter']),
        beschriftung: z.string().max(24),
      }),
    )
    .min(2)
    .max(4),
  /** Verbindung, die scheitert — als Index in kette, zeigt den Bruch. */
  bruchNach: z.number().int().nonnegative().optional(),
});

/** Endkarte mit Handlungsaufforderung. */
const SzeneCta = SzeneBasis.extend({
  art: z.literal('cta'),
  text: z.string().max(90),
});

export const Szene = z.discriminatedUnion('art', [
  SzeneHook,
  SzeneAussage,
  SzeneZahl,
  SzeneVergleich,
  SzeneCheckliste,
  SzeneWarnung,
  SzeneAnschluss,
  SzeneCta,
]);
export type Szene = z.infer<typeof Szene>;
export type SzenenArt = Szene['art'];

/* ────────────────────────────── Short ──────────────────────────────── */

/** Untertitelwort mit Zeitstempel, abgeleitet aus der Sprachsynthese. */
export const Untertitelwort = z.object({
  wort: z.string(),
  startSek: z.number().nonnegative(),
  endeSek: z.number().nonnegative(),
});
export type Untertitelwort = z.infer<typeof Untertitelwort>;

export const Plattformtext = z.object({
  titel: z.string().max(100),
  beschreibung: z.string().max(2200),
  hashtags: z.array(z.string()).max(12),
});

export const Short = z.object({
  id: z.string(),
  /** Themencluster, zu dem dieser Short gehoert. */
  themaId: z.string(),
  /** Interner Arbeitstitel, nicht der Veroeffentlichungstitel. */
  arbeitstitel: z.string(),

  szenen: z.array(Szene).min(3).max(9),

  /** Jede Kernaussage im Skript verweist auf mindestens eine Quelle. */
  quellenIds: z.array(z.string()).min(1),

  texte: z.object({
    tiktok: Plattformtext,
    instagram: Plattformtext,
    youtube: Plattformtext,
  }),

  kennzeichnung: z.object({
    /** Sobald ein Affiliate-Link im Beitrag steht: Pflicht. */
    werbung: z.boolean(),
    /** Synthetische Stimme im Video: Pflicht. */
    kiStimme: z.boolean(),
  }),

  /* Wird erst von der Vertonung gefuellt. */
  tonspur: z
    .object({
      datei: z.string(),
      dauerSek: z.number().positive(),
      woerter: z.array(Untertitelwort),
      /** Startzeit jeder Szene, aus den Sprech-Zeitstempeln abgeleitet. */
      szenenStartSek: z.array(z.number().nonnegative()),
    })
    .optional(),
});
export type Short = z.infer<typeof Short>;

/* ────────────────────────────── Lauf ───────────────────────────────── */

export const Themencluster = z.object({
  id: z.string(),
  /** Uebergeordnete Situation, nicht nur Produktkategorie. */
  reihe: z.enum(['SchreibtischKlar', 'UnterwegsKlar', 'LadeKlar', 'NeuOderRefurbished']),
  titel: z.string(),
  kernfrage: z.string(),
  quellenIds: z.array(z.string()).min(1),
});
export type Themencluster = z.infer<typeof Themencluster>;

/** Ein Wochenlauf: 2 Themencluster mit je 5 Shorts. */
export const Lauf = z.object({
  id: z.string(),
  erstelltAm: z.string(),
  cluster: z.array(Themencluster).length(2),
  shorts: z.array(Short).length(10),
  status: z.enum(['entwurf', 'vertont', 'gerendert', 'freigegeben', 'veroeffentlicht']),
});
export type Lauf = z.infer<typeof Lauf>;
