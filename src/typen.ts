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

/** Kurzer Abbinder ohne Inhalt. Nur, wenn es nichts zusammenzufassen gibt. */
const SzeneCta = SzeneBasis.extend({
  art: z.literal('cta'),
  text: z.string().max(90),
});

/**
 * Schlusskarte mit Inhalt zum Mitnehmen.
 *
 * Der Regelabschluss eines Shorts. Sie fasst den Kern noch einmal so
 * zusammen, dass ein Screenshot genuegt — statt auf einen angehefteten
 * Beitrag zu verweisen, den kaum jemand oeffnet. Wer im Video bleibt,
 * soll alles bekommen; das erhoeht zugleich Wiedergabedauer und
 * Speicherungen, statt Zuschauer wegzuschicken.
 */
const SzeneEndkarte = SzeneBasis.extend({
  art: z.literal('endkarte'),
  ueberschrift: z.string().max(46),
  /** Die Kernpunkte des Videos, knapp genug zum Erfassen im Standbild. */
  punkte: z.array(z.string().max(58)).min(2).max(4),
  /** Leise Handlungsaufforderung unter der Karte. */
  abschluss: z.string().max(52).optional(),
});

/**
 * Kaufkriterien — die Bruecke vom Problem zum Produkt.
 *
 * Der Unterschied zur Checkliste: Die prueft, was jemand **schon hat**. Diese
 * Szene sagt, worauf beim **Kauf** zu achten ist. Sie nennt bewusst kein
 * Modell, sondern das Merkmal — das bleibt richtig, wenn das Geraet laengst
 * abgeloest ist, und macht den Link in der Beschreibung erst nachvollziehbar.
 *
 * Sobald `verweis` gesetzt ist, verweist das Video selbst auf die
 * Beschreibung und wird damit kommerzielle Kommunikation (§ 5a Abs. 4 UWG,
 * § 6 DDG). Die Werbekennzeichnung im Bild ist dann Pflicht — das erzwingt
 * das Short-Schema weiter unten, damit sie nicht vergessen werden kann.
 */
const SzeneKaufkriterien = SzeneBasis.extend({
  art: z.literal('kaufkriterien'),
  ueberschrift: z.string().max(46),
  kriterien: z
    .array(
      z.object({
        text: z.string().max(58),
        /** Woran sich das Merkmal im Datenblatt erkennen laesst. */
        pruefen: z.string().max(44).optional(),
      }),
    )
    .min(2)
    .max(3),
  /** Hinweis auf die Beschreibung. Loest die Kennzeichnungspflicht aus. */
  verweis: z.string().max(52).optional(),
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
  SzeneEndkarte,
  SzeneKaufkriterien,
]);
export type Szene = z.infer<typeof Szene>;
export type SzenenArt = Szene['art'];

/* ───────────────────────────── Winkelart ───────────────────────────── */

/**
 * Die Machart eines Shorts — nicht das Thema, sondern der Zugriff darauf.
 *
 * Fuenf Videos zu einem Thema duerfen nicht fuenfmal dasselbe tun. Ohne
 * Benennung passiert genau das trotzdem: Im Dock-Thema waren Video 2 und 5
 * beide „pruef nach, ob dein Geraet das kann", nur verschieden betitelt.
 * Erst der Name macht die Wiederholung sichtbar — und damit pruefbar.
 */
export const Winkelart = z.enum([
  /* Warum es klemmt */
  'diagnose',
  'verwechslung',
  'uebersehenerPunkt',
  'haken',
  /* Was die Angabe bedeutet */
  'entlarvung',
  'mythos',
  'grenzwert',
  'umrechnung',
  /* Was gilt */
  'vorschrift',
  'reihenfolge',
  /* Was du tust */
  'selbsttest',
  'kaufberatung',
  'kompromiss',
  'notloesung',
]);
export type Winkelart = z.infer<typeof Winkelart>;

/**
 * Was jede Machart beantwortet und welche Szene sie tragen muss.
 *
 * Die `signatur` ist kein Schmuck: Eine Diagnose ohne unterbrochene
 * Signalkette ist keine Diagnose, sondern eine Behauptung. Wo mehrere
 * Szenenarten stehen, darf der Stoff verschieden liegen — die Regel soll
 * fuehren, nicht fesseln.
 */
export const WINKELARTEN: Record<
  Winkelart,
  { titel: string; frage: string; signatur: readonly SzenenArt[] }
> = {
  diagnose: { titel: 'Diagnose', frage: 'Warum geht es bei dir nicht?', signatur: ['anschluss'] },
  verwechslung: {
    titel: 'Verwechslung',
    frage: 'Zwei Dinge sehen gleich aus und sind es nicht.',
    signatur: ['vergleich'],
  },
  uebersehenerPunkt: {
    titel: 'Übersehener Punkt',
    frage: 'Die Regel, die fast alle überlesen.',
    signatur: ['warnung'],
  },
  haken: {
    titel: 'Der Haken',
    frage: 'Alles richtig gemacht und trotzdem abgelehnt.',
    signatur: ['vergleich'],
  },
  entlarvung: { titel: 'Entlarvung', frage: 'Was das Werbewort verschweigt.', signatur: ['vergleich'] },
  mythos: { titel: 'Mythos', frage: 'Was alle sagen — und was stimmt.', signatur: ['vergleich', 'aussage'] },
  grenzwert: { titel: 'Grenzwert', frage: 'Die Zahl, an der es kippt.', signatur: ['zahl'] },
  umrechnung: {
    titel: 'Umrechnung',
    frage: 'Auf dem Gerät steht eine andere Einheit als in der Regel.',
    signatur: ['zahl'],
  },
  vorschrift: { titel: 'Vorschrift', frage: 'Was verboten ist — und warum.', signatur: ['warnung'] },
  reihenfolge: {
    titel: 'Reihenfolge',
    frage: 'Die Reihenfolge entscheidet, ob es geht.',
    signatur: ['anschluss'],
  },
  selbsttest: { titel: 'Selbsttest', frage: 'Prüf es in zwanzig Sekunden.', signatur: ['checkliste'] },
  kaufberatung: {
    titel: 'Kaufberatung',
    frage: 'Worauf du beim Kauf achtest.',
    signatur: ['kaufkriterien'],
  },
  kompromiss: {
    titel: 'Kompromiss',
    frage: 'Was du aufgibst, wenn du das nimmst.',
    signatur: ['vergleich'],
  },
  notloesung: { titel: 'Notlösung', frage: 'Was tun, wenn du es jetzt brauchst.', signatur: ['checkliste'] },
};

/* ────────────────────────────── Rubrik ─────────────────────────────── */

/**
 * Die fuenf festen Rubriken des Kanals. Eine je Woche und Werktag.
 *
 * Das ersetzt das alte Modell „ein Thema, fuenf Zugriffe". Das erzeugte
 * formal Vielfalt und inhaltlich fuenf Scheiben derselben Frage — die Videos
 * blieben beim Anreissen. Fuenf unabhaengige Fragen sind einzeln tiefer, und
 * der Zuschauer lernt einen Sendeplatz statt einer Themenwoche.
 *
 * Anders als der frueher freie `kontext` ist das jetzt **bewusst eine
 * geschlossene Liste**: Eine Rubrik, in die jedes Thema hineinpassen muss,
 * ist genau der Punkt. Wer eine sechste braucht, hat kein neues Thema,
 * sondern ein falsch zugeschnittenes.
 */
export const Rubrik = z.enum(['schreibtisch', 'unterwegs', 'reise', 'zuhause', 'kaufen']);
export type Rubrik = z.infer<typeof Rubrik>;

/**
 * Was jede Rubrik traegt — und woran die Abgrenzung entschieden wird.
 *
 * `unterwegs` und `reise` gehen ineinander ueber, wenn man sie als Orte
 * denkt. Der Schnitt laeuft deshalb nicht am Ort, sondern an der Frage:
 * Sobald eine **Vorschrift oder eine Landesgrenze** im Spiel ist, ist es
 * Reise. Sonst ist es der Alltagsweg.
 */
export const RUBRIKEN: Record<Rubrik, { titel: string; traegt: string; abgrenzung: string }> = {
  schreibtisch: {
    titel: 'Schreibtisch',
    traegt: 'Monitore, Docks, Kabel, Strom, Ton, Ergonomie am festen Platz.',
    abgrenzung: 'Das Gerät steht. Nichts davon wird eingepackt.',
  },
  unterwegs: {
    titel: 'Unterwegs',
    traegt: 'Akku, Laden, Tethering, Rucksack, fremde Steckdosen und WLANs.',
    abgrenzung: 'Alltagsweg im Inland. Es geht um Ausdauer, nicht um Erlaubnis.',
  },
  reise: {
    titel: 'Reise',
    traegt: 'Flug, Handgepäck, Wattstunden, fremde Stromnetze, Roaming, Zoll.',
    abgrenzung: 'Eine Vorschrift oder eine Landesgrenze entscheidet mit.',
  },
  zuhause: {
    titel: 'Zuhause',
    traegt: 'WLAN, Router, Fernseher, Streaming, Netzwerk in der Wohnung.',
    abgrenzung: 'In der Wohnung, aber nicht am Arbeitsplatz.',
  },
  kaufen: {
    titel: 'Kaufen',
    traegt: 'Kaufhilfe, Gebrauchtkauf, Garantie, Reparatur, Akkutausch.',
    abgrenzung:
      'Der einzige Sendeplatz, auf dem Partnerlinks vorgesehen sind (Variante A). ' +
      'Die anderen vier bleiben ohne Links.',
  },
};

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
  /** Thema, zu dem dieser Short gehoert. */
  themaId: z.string(),
  /**
   * Die Rubrik — der Sendeplatz dieses Shorts.
   *
   * Steht bewusst am Short und nicht nur am Thema: Der Renderer holte die
   * Kopfzeilen-Pille frueher ueber die themaId aus `themen.json` und fiel
   * still auf „Setup" zurueck, wenn er nichts fand. Ein stiller Rueckfall
   * ist genau die Sorte Fehler, die dieses Projekt sonst hart prueft.
   */
  rubrik: Rubrik,
  /** Interner Arbeitstitel, nicht der Veroeffentlichungstitel. */
  arbeitstitel: z.string(),

  /** Die Machart dieses Shorts. Je Lauf muessen alle fuenf verschieden sein. */
  winkelart: Winkelart,

  szenen: z.array(Szene).min(3).max(9),

  /**
   * Belegdecke dieses Shorts: mindestens **drei** Quellen.
   *
   * Eine Quelle belegt eine Aussage, drei belegen ein Video. Die Huerde ist
   * bewusst hoch: Wer drei offizielle Belege fuer ein 40-Sekunden-Video
   * zusammentraegt, hat das Thema verstanden — und ein Short, der die Huerde
   * reisst, gehoert noch nicht in die Produktion.
   */
  quellenIds: z.array(z.string()).min(3),

  texte: z.object({
    tiktok: Plattformtext,
    instagram: Plattformtext,
    youtube: Plattformtext,
  }),

  kennzeichnung: z.object({
    /**
     * **Wo** die Werbung stattfindet — nicht ob.
     *
     * Ein einzelnes Ja/Nein konnte das nicht trennen und hat beides
     * gekoppelt: Sobald irgendwo ein Partnerlink stand, brannte das Label
     * ins Bild. Bei Links, die ausschliesslich in der Beschreibung stehen,
     * waere damit jedes Video als Werbung markiert worden.
     *
     * - `keine`        kein kommerzieller Inhalt
     * - `beschreibung` Links nur in der Beschreibung, dort gekennzeichnet.
     *                  Das Video bleibt Information und traegt kein Label.
     * - `video`        Das Video verweist selbst auf die Links. Label im Bild.
     */
    werbung: z.enum(['keine', 'beschreibung', 'video']),
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
  })
  /**
   * Machart, Abschluss und Kennzeichnung haengen nicht am Gewissen.
   *
   * Wer eine Diagnose ohne Signalkette schreibt oder einen Verweis ins Video
   * setzt und das Werbe-Kennzeichen vergisst, kommt hier nicht durch. Bei bis
   * zu 500.000 Euro Bussgeld ist das die einzige Stelle, an der die
   * Kennzeichnungsregel zuverlaessig greift.
   */
  .superRefine((short, ctx) => {
    const arten = new Set(short.szenen.map((s) => s.art));

    /* ── Die Machart muss ihre tragende Szene haben ──────────────── */

    const { titel, signatur } = WINKELARTEN[short.winkelart];
    if (!signatur.some((art) => arten.has(art))) {
      ctx.addIssue({
        code: 'custom',
        path: ['szenen'],
        message: `Machart „${titel}" braucht mindestens eine Szene der Art ${signatur
          .map((a) => `„${a}"`)
          .join(' oder ')}.`,
      });
    }

    /* ── Genau eine Schlusskarte, und die steht am Ende ──────────── */

    const letzte = short.szenen[short.szenen.length - 1];
    if (letzte?.art !== 'endkarte' && letzte?.art !== 'kaufkriterien') {
      ctx.addIssue({
        code: 'custom',
        path: ['szenen'],
        message: 'Der Short endet weder mit einer Endkarte noch mit Kaufkriterien.',
      });
    }
    if (arten.has('endkarte') && arten.has('kaufkriterien')) {
      ctx.addIssue({
        code: 'custom',
        path: ['szenen'],
        message:
          'Endkarte und Kaufkriterien sind beide Schlusskarten. Zwei davon kosten Laufzeit und sagen dasselbe zweimal.',
      });
    }

    /* ── Wo verwiesen wird, muss auch gekennzeichnet werden ──────── */

    const verweist = short.szenen.some((s) => s.art === 'kaufkriterien' && s.verweis);
    if (verweist && short.kennzeichnung.werbung !== 'video') {
      ctx.addIssue({
        code: 'custom',
        path: ['kennzeichnung', 'werbung'],
        message:
          'Die Kaufkriterien verweisen auf die Beschreibung. Damit ist das Video selbst kommerzielle ' +
          'Kommunikation (§ 5a Abs. 4 UWG) und braucht werbung: "video".',
      });
    }
    /*
     * Die Regel gilt bewusst nur in eine Richtung.
     *
     * Ein Verweis erzwingt das Label — das ist Pflicht. Umgekehrt ist ein
     * Label ohne Verweis kein Fehler, sondern die vorsichtige Wahl: Ob eine
     * Kennzeichnung allein in der Beschreibung fuer ein Video genuegt, ist
     * ungeklaert; die Praxisliteratur empfiehlt fuer YouTube die Einblendung.
     * Wer sie ohne Not setzt, kennzeichnet zu viel — nie ein Rechtsproblem.
     */
  });
export type Short = z.infer<typeof Short>;

/* ────────────────────────────── Lauf ───────────────────────────────── */

/**
 * Ein Thema: eine Alltagsfrage, aus der **ein** Short entsteht.
 *
 * Frueher lieferte ein Thema fuenf Shorts. Das war die Ursache der
 * Oberflaechlichkeit: Wer aus einer Frage fuenf Videos ziehen muss, schneidet
 * sie in fuenf duenne Scheiben. Jetzt traegt jedes Thema ein Video, und die
 * Woche besteht aus fuenf Themen — eines je Rubrik.
 *
 * Der frueher freie `kontext` ist damit die feste `rubrik` geworden. Der alte
 * Kommentar hier warnte davor, die Liste zu schliessen, weil dann jedes Thema
 * in eine Rubrik passen muesste. Genau das ist jetzt gewollt.
 */
export const Thema = z.object({
  id: z.string(),
  /** Sendeplatz des Themas. Erscheint als Pille in der Kopfzeile. */
  rubrik: Rubrik,
  titel: z.string(),
  kernfrage: z.string(),
  /** Belegdecke des Themas — drei offizielle Quellen, einmal recherchiert. */
  quellenIds: z.array(z.string()).min(3),
});
export type Thema = z.infer<typeof Thema>;

/**
 * Eine rohe Videoidee — die Vorstufe zum Thema.
 *
 * Hier landet, was in einer Ideensession entsteht: eine Frage, ein Kontext,
 * eine Spur, wo der Beleg zu finden waere. Bewusst **ohne** Quellenpflicht,
 * sonst bremst die Belegarbeit das Sammeln aus. Eine Idee wandert erst dann
 * nach `themen.json`, wenn drei offizielle Quellen stehen und fuenf Winkel
 * formuliert sind. So bleibt der Themenpool sauber und der Vorrat trotzdem
 * gross.
 */
export const Idee = z.object({
  id: z.string(),
  /** Sendeplatz, auf den die Idee zielt. Gleiche Liste wie beim Thema. */
  rubrik: Rubrik,
  /** Die Alltagsfrage, um die das Video kreist. */
  kernfrage: z.string().min(1),
  /** Optionale Notiz: warum das traegt, welcher Winkel denkbar ist. */
  notiz: z.string().optional(),
  /** Wo der Beleg vermutlich steht — Hersteller, Norm, Behoerde. */
  quellenspur: z.array(z.string()).default([]),
  erfasstAm: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(['roh', 'inArbeit', 'uebernommen', 'verworfen']).default('roh'),
});
export type Idee = z.infer<typeof Idee>;

/**
 * Ein Wochenlauf: fuenf Shorts, einer je Rubrik.
 *
 * Fuenf, weil der Takt fuenf Werktage hat — nicht, weil ein Thema fuenf
 * hergibt. Jeder Short bringt sein eigenes Thema und seine eigenen drei
 * Quellen mit; die Belegarbeit verteilt sich damit auf fuenf schmale
 * Recherchen statt einer tiefen.
 *
 * Achtung: Dieses Schema wird derzeit von keinem Skript geparst. Der
 * Wochenlauf validiert Shorts einzeln. Die laufweiten Regeln — jede Rubrik
 * genau einmal, fuenf verschiedene Macharten, keine Szenenart im Uebermass —
 * stehen deshalb in `laufPruefen`, weil das tatsaechlich ausgefuehrt wird.
 */
export const Lauf = z.object({
  id: z.string(),
  erstelltAm: z.string(),
  shorts: z.array(Short).length(5),
  status: z.enum(['entwurf', 'vertont', 'gerendert', 'freigegeben', 'veroeffentlicht']),
});
export type Lauf = z.infer<typeof Lauf>;
