/**
 * Datenvertraege der Pipeline.
 *
 * Diese Schemata sind die Schnittstelle zwischen Skript-Engine und Renderer.
 * Was hier nicht validiert, wird nicht gerendert — so kann kein halbfertiges
 * oder unbelegtes Skript versehentlich in die Produktion laufen.
 */
import { z } from 'zod';

/* ────────────────────────────── System ─────────────────────────────── */

/**
 * Das Betriebssystem, auf das ein Short sich bezieht.
 *
 * Sichtbar in der Hook-Pille; im Titel nur bei echter Systemspezifik. Der
 * Grund fuer die Zurueckhaltung ist Reichweite: „macOS" im Titel schliesst
 * die Haelfte des Publikums aus, wenn die Aussage gar nicht systemabhaengig
 * ist. `beide` heisst geprueft und gleich, `ohne` heisst systemunabhaengig —
 * das ist nicht dasselbe und darf nicht zusammenfallen.
 */
export const System = z.enum(['macos', 'windows', 'beide', 'ohne']);
export type System = z.infer<typeof System>;

export const SYSTEME: Record<System, { titel: string; imTitel: boolean }> = {
  macos: { titel: 'macOS', imTitel: true },
  windows: { titel: 'Windows', imTitel: true },
  beide: { titel: 'macOS & Windows', imTitel: false },
  ohne: { titel: '', imTitel: false },
};

/* ────────────────────────────── Quellen ────────────────────────────── */

/**
 * Ein einzelner Beleg: der woertliche Satz und was daraus folgt.
 *
 * Der Unterschied zwischen `zitat` und `stuetzt` traegt die ganze
 * Vertrauenskette. `zitat` ist woertlich von der Seite abgeschrieben und
 * damit **maschinell nachpruefbar** — `skripte/quellen-pruefen.ts` ruft die
 * URL ab und sucht die Zeichenkette. `stuetzt` ist unsere Schlussfolgerung
 * und wird nicht geprueft, weil sie sich nicht pruefen laesst.
 *
 * Vorher standen hier nur Paraphrasen. Ein Test am 13.08.2026 zeigte, warum
 * das nicht genuegt: Die LBA-Quelle stuetzte inhaltlich alle sechs Punkte,
 * aber keine einzige Formulierung stand woertlich so auf der Seite — eine
 * Zeichenkettensuche haette nichts gefunden. Und einer der sechs Punkte war
 * bei genauem Hinsehen gar keine Fundstelle, sondern eine Folgerung.
 */
export const Beleg = z.object({
  /**
   * Woertlich von der Seite, unveraendert.
   *
   * Kurz halten. Lange Zitate brechen an Zeilenumbruechen, geschuetzten
   * Leerzeichen und typografischen Anfuehrungszeichen — der Dell-Eintrag
   * riss beim Test genau daran.
   */
  zitat: z.string().min(15).max(180),
  /** Was daraus folgt, in unseren Worten. Wird nicht maschinell geprueft. */
  stuetzt: z.string().max(160),
});
export type Beleg = z.infer<typeof Beleg>;

/**
 * Was eine Quelle sein darf — und was ausdruecklich nicht.
 *
 * Die Liste ist am 14.08.2026 enger geworden, und zwar an beiden Enden:
 *
 * **`presse` ist raus.** Nicht heruntergestuft, sondern **nicht mehr
 * eintragbar**. Vorher stand `presse` im Enum und war nur aus
 * `OFFIZIELLE_ARTEN` ausgenommen — eine Pressequelle durfte also in
 * `quellen.json` stehen und von einer Szene ueber `quelleId` als Beleg
 * benutzt werden, solange drei offizielle Quellen daneben die Zaehlung
 * erfuellten. Das war das Schlupfloch: Die Zahl stimmte, und die konkrete
 * Aussage hing trotzdem an einem Fachartikel.
 *
 * Presse bleibt als **Wegweiser** erlaubt und ist es ausdruecklich: Ein
 * Fachartikel ist oft der schnellste Weg zur Primaerquelle. Er wird gelesen,
 * er fuehrt zur Spezifikation, und dann wird die Spezifikation zitiert. In
 * `quellen.json` landet er nie. Dass die Regel nicht an Vorsatz haengt,
 * sondern an diesem Enum, ist Absicht — eine Regel, die sich nicht
 * ausdruecken laesst, laesst sich nicht brechen.
 *
 * **`messung` ist raus.** Sie war per Konstruktion unerreichbar: Die
 * `produktionsregel` verbietet Aussagen aus eigener Produkterfahrung, wir
 * benutzen also nie etwas selbst und koennen nie messen. Was wir sehr wohl
 * messen — Sprechtempo, Bitrate, Dateigroesse — sind interne Kennzahlen und
 * keine Aussagen im Video. Eine Art, die niemand je vergeben kann, sieht im
 * Enum aus wie eine Option und ist keine.
 *
 * **`rechtsprechung` ist dazugekommen.** Ein Urteil gilt anders als eine
 * Verordnung, und die Rubrik Kaufen braucht es regelmaessig — LG Erfurt und
 * BGH standen bisher nur in Projektkommentaren, nicht als Beleg.
 */
export const QuellenArt = z.enum(['standard', 'behoerde', 'rechtsprechung', 'hersteller', 'plattform']);
export type QuellenArt = z.infer<typeof QuellenArt>;

/**
 * Quellen, die **kein eigenes Interesse** am Inhalt der Aussage haben.
 *
 * Der Unterschied ist nicht Qualitaet, sondern Rolle. Ein Hersteller ist die
 * beste Adresse fuer sein eigenes Datenblatt und eine schlechte fuer die
 * Frage, woran es liegt, dass etwas nicht funktioniert. Am 14.08.2026 stand
 * der WLAN-Short auf TP-Link, TP-Link und Intel: „Dein Router ist nicht zu
 * alt" — belegt vom Routerhersteller und vom Funkmodulhersteller.
 *
 * Dieselbe Doppelrolle hat `plattform`: YouTube ist die Autoritaet fuer die
 * eigenen Regeln und zugleich der Beteiligte.
 */
export const UNBETEILIGTE_ARTEN = ['standard', 'behoerde', 'rechtsprechung'] as const;

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
  art: QuellenArt,
  /**
   * Nur gesetzt, wenn die Quelle **systemspezifisch** ist.
   *
   * Ein Short mit `system: 'macos'` braucht mindestens eine Quelle, die
   * macOS auch wirklich behandelt. Ohne dieses Feld waere die Systemangabe
   * eine Behauptung wie jede andere — nur eine, die im Bild steht.
   */
  system: z.enum(['macos', 'windows']).optional(),
  /**
   * Ob sich die Seite automatisch abrufen laesst.
   *
   * `manuell` ist die Ausnahme fuer Seiten, die ihren Inhalt nachladen oder
   * automatische Abrufe sperren — beim Test am 13.08.2026 war das die
   * Apple-Supportseite, die zweimal abgeschnitten zurueckkam. Solche
   * Eintraege duerfen weder still durchrutschen noch alles blockieren: Sie
   * werden gezaehlt und in der Freigabe ausgewiesen, damit sichtbar bleibt,
   * welche Belege die Maschine nicht bestaetigen konnte.
   */
  abrufart: z.enum(['automatisch', 'manuell']).default('automatisch'),
  /** Warum manuell. Pflicht, sobald `abrufart: 'manuell'` steht. */
  abrufhinweis: z.string().max(160).optional(),
  /** Die Fundstellen. Mindestens eine, sonst belegt die Quelle nichts. */
  belegt: z.array(Beleg).min(1),
})
  .refine((q) => q.abrufart !== 'manuell' || Boolean(q.abrufhinweis), {
    path: ['abrufhinweis'],
    message: 'Eine manuell geprüfte Quelle muss begründen, warum sie sich nicht abrufen lässt.',
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

/**
 * Die Geraete, die als Zeichnung vorliegen (`video/bausteine/Geraete.tsx`).
 *
 * Geschlossen wie die Rubriken, und aus demselben Grund: Jedes Geraet ist
 * eine eigene Zeichnung im flaechigen Stil der Marke. Wer ein neues braucht,
 * zeichnet es — es gibt keinen Rueckfall auf ein allgemeines Symbol, weil ein
 * falsch gezeichnetes Geraet derselbe Fehler waere, den die Belegpflicht
 * verhindern soll, nur an einer Stelle, die niemand prueft.
 */
export const GeraeteArt = z.enum([
  'notebook',
  'dock',
  'monitor',
  'kabel',
  'netzteil',
  'telefon',
  'powerbank',
  'adapter',
  'router',
]);
export type GeraeteArt = z.infer<typeof GeraeteArt>;

/**
 * Symbole fuer die Situation, nicht fuer die Technik.
 *
 * Die zweite Zeichenkategorie neben `GeraeteArt`, und die Trennung ist der
 * ganze Punkt:
 *
 * | | zeigt | Anspruch |
 * |---|---|---|
 * | `geraet` | Dock, Kabel, Router | **muss stimmen** — gezeichnet wird nur, was im Datenblatt steht |
 * | `symbol` | Flugzeug, Gesetzbuch, Kassenbon | behauptet nichts Technisches, setzt den Ort |
 *
 * Der Anlass war die Rubrik Kaufen: Bei „Die Garantie ist abgelaufen" gibt es
 * kein Geraet zu zeichnen, und ein beliebiges Dock daneben waere Dekoration
 * gewesen. Ein Gesetzbuch dagegen sagt in einem Bild, worum es geht.
 *
 * Warum das kein Widerspruch zur Bildregel ist: Verboten sind erfundene
 * technische Details — Buchsen, die es nicht gibt. Ein stilisiertes Flugzeug
 * macht keine Aussage, die falsch sein koennte. Sobald ein Symbol anfinge,
 * etwas zu behaupten, waere es ein Geraet und muesste belegt sein.
 *
 * **Nicht dabei: der Richterhammer.** Deutsche Gerichte benutzen keinen, das
 * ist ein Bild aus amerikanischen Serien. Bei einem Kanal, dessen Kern die
 * belegte Aussage ist, ausgerechnet beim Rechtsthema ein Requisit zu zeigen,
 * das es hierzulande nicht gibt, waere ein vermeidbarer Patzer.
 */
export const KontextArt = z.enum([
  'flugzeug',
  'koffer',
  'gesetzbuch',
  'kassenbon',
  'steckdose',
  'nachbarhaeuser',
  'uhr',
  'kalender',
]);
export type KontextArt = z.infer<typeof KontextArt>;

/**
 * Zeichnung unter dem Text einer Szene.
 *
 * Optional, und das ist die ganze Regel: Zwischen Text und Untertitel liegt
 * Platz, aber ein Bild, das nur diesen Platz fuellt, macht den Short nicht
 * besser. Gesetzt wird nur, wenn die Zeichnung die Aussage **zeigt** oder den
 * Ort setzt, statt sie zu begleiten.
 *
 * Beide Felder zugleich waeren zwei Bilder auf einem Platz — geprueft im
 * `superRefine` des Shorts.
 */
const mitIllustration = {
  geraet: GeraeteArt.optional(),
  symbol: KontextArt.optional(),
};

/** Aufhaenger. Die ersten drei Sekunden entscheiden ueber alles Weitere. */
const SzeneHook = SzeneBasis.extend({
  art: z.literal('hook'),
  /** Kurz und konkret. Laenger als sieben Woerter liest im Feed niemand. */
  text: z.string().max(70),
  /** Optionaler Unterton, z.B. das Geraet oder die Situation. */
  kontext: z.string().max(60).optional(),
  /*
   * Die Hook traegt eine Illustration am wirksamsten: Sie hat wenig Text und
   * die Aufgabe, in drei Sekunden klarzumachen, worum es geht. Beim
   * Reise-Short stand der Flug bis zum 13.08.2026 nur im Sprechtext — wer die
   * ersten Sekunden stumm sah, hielt das Video fuer Powerbank-Wissen mit
   * zufaelligem Flugbeispiel.
   */
  ...mitIllustration,
});

/**
 * Wer behaupten kann, muss belegen koennen.
 *
 * Bis zum 14.08.2026 hatten vier Szenenarten ein Pflichtfeld, drei ein
 * optionales und der Rest gar keins — gewachsen, nicht entschieden. Die
 * Belegansicht hat die Folge sichtbar gemacht: Der Dock-Short sagt in einer
 * `vergleich`-Szene „Alt Mode ist optional, nicht jedes System hat ihn". Das
 * ist eine Tatsachenbehauptung, und im Datenvertrag gab es keine Stelle, an
 * die sich ein Beleg haengen liess. Die passende Quelle stand derweil in
 * `quellenIds` des Shorts, von keiner Szene benutzt, und zaehlte trotzdem auf
 * die Drei-Quellen-Regel mit — dieselbe Form von Schlupfloch, die bei
 * `presse` geschlossen wurde.
 *
 * Der Schnitt laeuft jetzt an einer Frage: **Sagt die Szene etwas ueber die
 * Welt?**
 *
 * | | Arten | warum |
 * |---|---|---|
 * | Pflicht | `aussage`, `zahl`, `herleitung`, `einschraenkung`, `vergleich`, `warnung`, `merkmalskarte`, `anschluss`, `kaufkriterien` | jede von ihnen behauptet immer |
 * | optional | `fehlspur`, `checkliste` | die Fehlspur erzaehlt, was der Zuschauer vermutet, die Checkliste sagt, was er tun soll — beides kann belegbeduerftig werden, muss es aber nicht |
 * | ohne Feld | `hook`, `cta`, `endkarte` | Aufhaenger und Rueckblick, sie sagen nichts Neues |
 *
 * `anschluss` sieht harmlos aus und ist es nicht: `bruchNach` behauptet, an
 * welcher Verbindung die Kette reisst.
 */
export const QUELLENPFLICHT = {
  aussage: 'pflicht',
  zahl: 'pflicht',
  herleitung: 'pflicht',
  einschraenkung: 'pflicht',
  vergleich: 'pflicht',
  warnung: 'pflicht',
  merkmalskarte: 'pflicht',
  anschluss: 'pflicht',
  kaufkriterien: 'pflicht',
  fehlspur: 'moeglich',
  checkliste: 'moeglich',
  hook: 'ohne',
  cta: 'ohne',
  endkarte: 'ohne',
} as const satisfies Record<string, 'pflicht' | 'moeglich' | 'ohne'>;

/**
 * Eine Behauptung mit optionaler Hervorhebung eines Schluesselworts.
 *
 * `quelleId` ist Pflicht, und das ist der Unterschied zu vorher: Die
 * Belegdecke hing am Short als Liste am Ende — bei drei Quellen und sechs
 * Aussagen konnte eine Aussage frei schweben, ohne dass es auffiel. Jetzt
 * traegt jede Kernaussage ihren Beleg selbst.
 */
const SzeneAussage = SzeneBasis.extend({
  art: z.literal('aussage'),
  text: z.string().max(140),
  /** Teilstring aus text, der in Signalblau gesetzt wird. */
  hervorhebung: z.string().optional(),
  /** Muss in `quellenIds` des Shorts vorkommen — geprueft in `laufPruefen`. */
  quelleId: z.string(),
  ...mitIllustration,
});

/** Grosse Zahl mit Einheit — Wattzahlen, Aufloesungen, Bildwiederholraten. */
const SzeneZahl = SzeneBasis.extend({
  art: z.literal('zahl'),
  wert: z.string().max(12),
  einheit: z.string().max(16).optional(),
  bedeutung: z.string().max(90),
  /** Eine Zahl ohne Beleg ist eine Behauptung mit Nachkommastelle. */
  quelleId: z.string(),
  ...mitIllustration,
});

/**
 * Die falsche Faehrte — Signaturszene der Vertiefung `fehlspur`.
 *
 * Erst nennen, was der Zuschauer selbst vermutet haette, dann ausschliessen.
 * Der Zuschauer erlebt zwei Sackgassen, die er gehabt haette, bevor er die
 * Antwort bekommt — derselbe Inhalt, aber eine offene Frage vor ihm statt
 * hinter ihm.
 *
 * Die `aufloesung` ist absichtlich optional: Dramaturgisch gehoert sie in
 * die **folgende** Szene, damit die Fehlspur offen endet. Sie steht nur
 * hier, wenn danach keine Szene sie traegt.
 */
const SzeneFehlspur = SzeneBasis.extend({
  art: z.literal('fehlspur'),
  ueberschrift: z.string().max(50).optional(),
  /**
   * Optional: Die Fehlspur erzaehlt zuerst, was der Zuschauer selbst vermutet
   * haette — das ist eine Erzaehlung und keine Aussage ueber die Welt. Sobald
   * die Entkraeftung eine Tatsache behauptet, gehoert hier eine Quelle hin.
   */
  quelleId: z.string().optional(),
  spuren: z
    .array(
      z.object({
        /** Was naheliegt: „Kabel kaputt" */
        verdacht: z.string().max(46),
        /** Warum es das nicht ist: „Neues Kabel, immer noch schwarz" */
        entkraeftung: z.string().max(56),
      }),
    )
    .min(1)
    .max(3),
  aufloesung: z.string().max(70).optional(),
});

/**
 * Die gerechnete Zahl — Signaturszene der Vertiefung `herleitung`.
 *
 * Behauptete Zahlen sind flach, hergeleitete sind tief: Wer die Rechnung
 * gesehen hat, kann danach jede Powerbank selbst einschaetzen, statt sich
 * eine Zahl zu merken. Das ist der Unterschied zwischen einer Information
 * und einem Werkzeug.
 */
const SzeneHerleitung = SzeneBasis.extend({
  art: z.literal('herleitung'),
  ueberschrift: z.string().max(50).optional(),
  schritte: z
    .array(
      z.object({
        /** „100 Wh" oder „÷ 3,7 V" */
        wert: z.string().max(14),
        /** „ist die Grenze" oder „Nennspannung einer Lithium-Zelle" */
        erlaeuterung: z.string().max(44),
      }),
    )
    .min(2)
    .max(4),
  ergebnis: z.object({
    wert: z.string().max(14),
    /** „← die Zahl, die auf der Powerbank steht" */
    bedeutung: z.string().max(60),
  }),
  quelleId: z.string(),
});

/**
 * Die Kehrseite — Signaturszene der Vertiefungen `grenzfall` und
 * `folgekosten`.
 *
 * Beide sagen „so einfach ist es nicht", nur aus verschiedener Richtung:
 * Der Grenzfall nennt, wann die Regel **nicht** gilt, die Folgekosten, was
 * sie **kostet**. Eine Regel, die ihre eigene Grenze nennt, wirkt kompetent
 * — und ist ehrlicher.
 *
 * Warum eine eigene Szenenart und nicht `warnung` oder `aussage`: Die
 * Vertiefung waere sonst nicht pruefbar. Fast jeder Short hat eine
 * `aussage`, also haette eine Signatur darauf nichts ausgesagt.
 */
const SzeneEinschraenkung = SzeneBasis.extend({
  art: z.literal('einschraenkung'),
  ueberschrift: z.string().max(50).optional(),
  /** „Ausser wenn ein DisplayLink-Treiber laeuft" / „Die Notloesung traegt" */
  bedingung: z.string().max(70),
  /** „Dann kommt Bild, kostet aber CPU" / „Zwei Stunden, dann ist Schluss" */
  folge: z.string().max(90),
  quelleId: z.string(),
  ...mitIllustration,
});

/** Zwei Optionen gegenuebergestellt — der Kern der Kaufentscheidung. */
const SzeneVergleich = SzeneBasis.extend({
  art: z.literal('vergleich'),
  ueberschrift: z.string().max(50).optional(),
  /** Ein Vergleich behauptet ueber beide Seiten. Ohne Beleg ist er eine Meinung. */
  quelleId: z.string(),
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
  /**
   * Optional, anders als bei `aussage` oder `zahl`.
   *
   * Eine Checkliste ist eine Handlungsempfehlung, keine Tatsachenbehauptung
   * — „prüf das mal" muss nicht belegt werden. Beruht sie aber auf einer
   * Herstellerempfehlung, gehoert die Quelle dazu und erscheint in der
   * Belegtafel der Freigabe.
   */
  quelleId: z.string().optional(),
});

/** Der Moment, in dem etwas nicht funktioniert. Traegt die meisten Videos. */
const SzeneWarnung = SzeneBasis.extend({
  art: z.literal('warnung'),
  text: z.string().max(120),
  /** Was stattdessen zu tun ist. Ohne Loesung bleibt nur Frust. */
  loesung: z.string().max(120).optional(),
  /**
   * Optional, wie bei `checkliste` und aus demselben Grund.
   *
   * Eine Warnung kann beides sein: ein Rat („lass das lieber") oder eine
   * Vorschrift. Im zweiten Fall gehoert die Quelle dazu und erscheint in der
   * Belegtafel — dass Powerbank-Pole gegen Kurzschluss gesichert sein
   * muessen, ist keine Meinung, sondern steht beim Luftfahrt-Bundesamt.
   */
  quelleId: z.string(),
});

/** Signalweg zwischen Geraeten — die Signaturszene dieser Nische. */
const SzeneAnschluss = SzeneBasis.extend({
  art: z.literal('anschluss'),
  ueberschrift: z.string().max(50).optional(),
  kette: z
    .array(
      z.object({
        geraet: GeraeteArt,
        beschriftung: z.string().max(24),
      }),
    )
    .min(2)
    .max(4),
  /** Verbindung, die scheitert — als Index in kette, zeigt den Bruch. */
  bruchNach: z.number().int().nonnegative().optional(),
  /** `bruchNach` behauptet, an welcher Verbindung die Kette reisst. */
  quelleId: z.string(),
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
  /** Kaufkriterien sind Tatsachen ueber Geraeteklassen, keine Meinungen. */
  quelleId: z.string(),
});

/**
 * Das Produkt im Bild — generisch gezeichnet, nie benannt.
 *
 * Die Umsetzung der Entscheidung vom 12.08.2026: **zeigen ja, benennen
 * nein.** Das Geraet wird als flaechige Vektorzeichnung gezeigt, die
 * Merkmale stehen daneben — aber es faellt kein Markenname. Damit bleibt
 * `produktname` unangetastet und das Video bleibt Information.
 *
 * Kein Foto und kein Bildmodell: Ein Bildmodell erfindet Buchsen, und das
 * waere derselbe Fehler, den die Belegpflicht verhindern soll, nur
 * ungeprueft.
 *
 * Loest zugleich den Hinweis „Szenenart `aussage` kommt in 4 von 5 Shorts
 * vor" — die Merkmalskarte sagt dasselbe wie eine Aussage, zeigt es aber.
 */
const SzeneMerkmalskarte = SzeneBasis.extend({
  art: z.literal('merkmalskarte'),
  ueberschrift: z.string().max(50).optional(),
  /** Welches Geraet gezeichnet wird. Gleiche Auswahl wie in der Signalkette. */
  geraet: GeraeteArt,
  /** Woran man es erkennt — Merkmale, keine Modelle. */
  merkmale: z
    .array(
      z.object({
        text: z.string().max(52),
        bewertung: z.enum(['ja', 'nein', 'achtung', 'neutral']).default('neutral'),
      }),
    )
    .min(2)
    .max(4),
  quelleId: z.string(),
});

export const Szene = z.discriminatedUnion('art', [
  SzeneHook,
  SzeneAussage,
  SzeneZahl,
  SzeneVergleich,
  SzeneCheckliste,
  SzeneWarnung,
  SzeneAnschluss,
  SzeneFehlspur,
  SzeneHerleitung,
  SzeneEinschraenkung,
  SzeneMerkmalskarte,
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

/* ──────────────────────────── Titelmuster ──────────────────────────── */

/**
 * Der Bau von Hook und Titel. Je Video wird eines der drei gewaehlt.
 *
 * Der Hebel ist **Entwarnung, nicht Konfrontation**: „Dein Monitor ist nicht
 * kaputt", nicht „Du machst es falsch". Der Ton darf zugespitzt und humorvoll
 * sein — die Tatsache muss von den Quellen getragen sein.
 *
 * Nicht als harte Pruefung gebaut, und das mit Absicht: Alle harten Regeln in
 * diesem Projekt sind rechtlich oder faktisch begruendet, nie geschmacklich.
 * Geprueft wird nur die Wiederholung (drei gleiche Muster je Lauf klingen nach
 * Schablone) — und das als Hinweis.
 */
export const Titelmuster = z.enum(['verdaechtiger', 'uhr', 'zweisatz']);
export type Titelmuster = z.infer<typeof Titelmuster>;

export const TITELMUSTER: Record<Titelmuster, { titel: string; bau: string; braucht: string }> = {
  verdaechtiger: {
    titel: 'Der falsche Verdächtige',
    bau: 'Was der Zuschauer verdächtigt, ist unschuldig — also gibt es einen echten Täter.',
    braucht: 'einen Täter',
  },
  uhr: {
    titel: 'Die Ersparnis mit Uhr',
    bau: 'Eine kurze Prüfung, an deren Ende eine Ausgabe wegfällt.',
    braucht: 'eine Handlung',
  },
  zweisatz: {
    titel: 'Die trockene Feststellung',
    bau: 'Zwei Sätze, die sich widersprechen. Der Widerspruch ist die Pointe.',
    braucht: 'einen Widerspruch',
  },
};

/* ───────────────────────────── Vertiefung ──────────────────────────── */

/**
 * Wodurch ein Short Tiefe bekommt — die zweite Ebene neben der Machart.
 *
 * Die Machart sagt, **worauf** ein Video zugreift. Die Vertiefung sagt,
 * **wodurch** es mehr wird als eine Information: durch eine ausgeschlossene
 * Fehlannahme, eine gerechnete Zahl, eine genannte Ausnahme oder einen
 * genannten Preis.
 *
 * Bewusst **nicht** an jedem Short Pflicht (siehe `laufweiteBefunde`): Ein
 * Zwang zur Tiefe erzeugt erfundene Tiefe, und die riecht man. Drei von fuenf
 * lassen Raum, sie ehrlich zu vergeben — die Rubrik `kaufen` ist die
 * Ausnahme, weil der werbende Short die Glaubwuerdigkeit am dringendsten
 * braucht.
 */
export const Vertiefung = z.enum(['fehlspur', 'herleitung', 'grenzfall', 'folgekosten']);
export type Vertiefung = z.infer<typeof Vertiefung>;

/**
 * Was jede Vertiefung tut und welche Szene sie tragen muss.
 *
 * Wie bei `WINKELARTEN` ist die `signatur` kein Schmuck: Ohne sie koennte
 * jemand `vertiefung: 'grenzfall'` setzen, ohne dass im Video je eine
 * Einschraenkung vorkaeme.
 */
export const VERTIEFUNGEN: Record<
  Vertiefung,
  {
    titel: string;
    tut: string;
    moment: string;
    signatur: readonly SzenenArt[];
  }
> = {
  fehlspur: {
    titel: 'Fehlspur',
    tut: 'Die naheliegende Erklärung wird erst genannt, dann ausgeschlossen.',
    moment: 'Genau das dachte ich auch.',
    signatur: ['fehlspur'],
  },
  herleitung: {
    titel: 'Herleitung',
    tut: 'Die Zahl wird vor seinen Augen gerechnet, nicht behauptet.',
    moment: 'Das kann ich jetzt selbst ausrechnen.',
    signatur: ['herleitung'],
  },
  grenzfall: {
    titel: 'Grenzfall',
    tut: 'Die Regel nennt ihre eigene Ausnahme.',
    moment: 'Der weiß, wovon er redet.',
    signatur: ['einschraenkung'],
  },
  folgekosten: {
    titel: 'Folgekosten',
    tut: 'Was du aufgibst, wenn du die Lösung nimmst.',
    moment: 'Ah, es ist nicht umsonst.',
    signatur: ['einschraenkung'],
  },
};

/**
 * Empfehlung, welche Vertiefung und welches Titelmuster zu einer Machart
 * passen. **Kommentar in Tabellenform, keine Pruefung** — eine Diagnose ohne
 * Fehlspur ist kein Fehler, sie ist nur die schwaechere Wahl.
 *
 * Ausgeschrieben in `produktionsmatrix.md`, dort auch mit Rubrikspalte.
 */
export const MATRIX: Record<Winkelart, { vertiefung: Vertiefung; titelmuster: Titelmuster }> = {
  diagnose: { vertiefung: 'fehlspur', titelmuster: 'verdaechtiger' },
  verwechslung: { vertiefung: 'fehlspur', titelmuster: 'zweisatz' },
  uebersehenerPunkt: { vertiefung: 'fehlspur', titelmuster: 'verdaechtiger' },
  haken: { vertiefung: 'grenzfall', titelmuster: 'zweisatz' },
  entlarvung: { vertiefung: 'herleitung', titelmuster: 'zweisatz' },
  mythos: { vertiefung: 'fehlspur', titelmuster: 'verdaechtiger' },
  grenzwert: { vertiefung: 'herleitung', titelmuster: 'zweisatz' },
  umrechnung: { vertiefung: 'herleitung', titelmuster: 'zweisatz' },
  vorschrift: { vertiefung: 'herleitung', titelmuster: 'zweisatz' },
  reihenfolge: { vertiefung: 'fehlspur', titelmuster: 'verdaechtiger' },
  selbsttest: { vertiefung: 'grenzfall', titelmuster: 'uhr' },
  kaufberatung: { vertiefung: 'grenzfall', titelmuster: 'uhr' },
  kompromiss: { vertiefung: 'folgekosten', titelmuster: 'zweisatz' },
  notloesung: { vertiefung: 'folgekosten', titelmuster: 'uhr' },
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
  /**
   * Zusatztext zwischen Titel und Quellenblock — **zurzeit ueberall leer**.
   *
   * Seit dem 15.08.2026 traegt der veroeffentlichte Text auf allen drei
   * Diensten dasselbe Muster: Titel, Trennstrich, Quellen, Hashtags. Ein
   * Short erklaert sich im Video, nicht im Text darunter; die frueheren
   * Erklaerabsaetze sind deshalb entfallen. Die Quellen stehen nicht mehr
   * hier drin, sondern werden in `beitragstext` aus den `quelleId`s der
   * Szenen erzeugt — die abgeschriebene Liste war unvollstaendig.
   *
   * **Das Feld bleibt trotzdem, und zwar mit Absicht.** An ihm haengt die
   * `kennzeichnung`-Regel in `src/pruefung.ts`: Sie sucht Partnerlinks und
   * verlangt „Werbung" oder „Anzeige" in derselben Zeile. Ohne ein Feld, das
   * wirklich veroeffentlicht wird, waere das eine tote Regel an der einen
   * Stelle, an der ein Fehler Geld kostet. Sobald Variante A greift, steht
   * der Partnerlink hier.
   */
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
   * Kopfzeilen-Pille frueher ueber die themaId aus dem damaligen `themen.json`
   * und fiel
   * still auf „Setup" zurueck, wenn er nichts fand. Ein stiller Rueckfall
   * ist genau die Sorte Fehler, die dieses Projekt sonst hart prueft.
   */
  rubrik: Rubrik,
  /** Interner Arbeitstitel, nicht der Veroeffentlichungstitel. */
  arbeitstitel: z.string(),

  /** Die Machart dieses Shorts. Je Lauf muessen alle fuenf verschieden sein. */
  winkelart: Winkelart,

  /**
   * Betriebssystembezug. `ohne` heisst systemunabhaengig und ist der
   * Normalfall — nicht „noch nicht entschieden".
   */
  system: System,

  /** Der Bau von Hook und Titel. Empfehlung je Machart siehe `MATRIX`. */
  titelmuster: Titelmuster,

  /**
   * Wodurch dieser Short Tiefe bekommt — optional.
   *
   * Mindestens drei der fuenf Shorts eines Laufs tragen eine, `kaufen`
   * immer. Das prueft `laufweiteBefunde`, nicht dieses Schema: Die Regel
   * gilt fuer den Lauf, nicht fuer den einzelnen Short.
   */
  vertiefung: Vertiefung.optional(),

  /**
   * Der Satz, der ueber den Einzelfall hinaustraegt.
   *
   * „USB-C ist eine Steckerform, keine Faehigkeit." Das ist, was jemand
   * naechste Woche noch weiss, wenn er das Dock laengst vergessen hat — und
   * womit er beim naechsten USB-C-Problem selbst weiterkommt.
   *
   * Pflichtfeld, obwohl sich seine Guete nicht pruefen laesst. Der Zwang,
   * ihn ueberhaupt zu formulieren, stellt bei der Themenwahl die Frage
   * „was ist hier eigentlich das Prinzip?" — und ein Thema ohne Antwort
   * darauf ist meistens kein Thema, sondern eine Fussnote.
   */
  merksatz: z.string().min(10).max(70),

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

    /* ── Ein Bildplatz, ein Bild ─────────────────────────────────── */

    /*
     * `geraet` und `symbol` teilen sich denselben Platz unter dem Text. Beide
     * zu setzen ist kein Gestaltungsfall, sondern ein Versehen — und eines,
     * das im Video nicht auffiele, weil eines der beiden stillschweigend
     * gewinnt.
     */
    short.szenen.forEach((szene, i) => {
      if ('geraet' in szene && 'symbol' in szene && szene.geraet && szene.symbol) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen', i],
          message: `Szene ${i + 1} setzt „geraet" und „symbol" — beide teilen sich denselben Bildplatz.`,
        });
      }
    });

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

    /* ── Die Vertiefung muss ihre tragende Szene haben ──────────── */

    if (short.vertiefung) {
      const v = VERTIEFUNGEN[short.vertiefung];
      if (!v.signatur.some((art) => arten.has(art))) {
        ctx.addIssue({
          code: 'custom',
          path: ['vertiefung'],
          message: `Vertiefung „${v.titel}" braucht mindestens eine Szene der Art ${v.signatur
            .map((a) => `„${a}"`)
            .join(' oder ')}.`,
        });
      }
    }

    /*
     * Umgekehrt gilt die Regel auch: Wer die Szene baut, ohne die Vertiefung
     * zu benennen, faellt aus der Zaehlung „drei von fuenf" heraus, obwohl
     * die Tiefe im Video steht. Das waere eine stille Fehlbuchung.
     */
    const vertiefungsszenen: SzenenArt[] = ['fehlspur', 'herleitung', 'einschraenkung'];
    const gebaut = vertiefungsszenen.filter((a) => arten.has(a));
    if (gebaut.length > 0 && !short.vertiefung) {
      ctx.addIssue({
        code: 'custom',
        path: ['vertiefung'],
        message:
          `Der Short baut ${gebaut.map((a) => `„${a}"`).join(' und ')}, benennt aber keine ` +
          'Vertiefung. Dann zählt er nicht mit, obwohl die Tiefe im Video steht.',
      });
    }

    /* ── Jede Aussage steht auf einer Quelle des Shorts ──────────── */

    const belegdecke = new Set(short.quellenIds);
    short.szenen.forEach((szene, i) => {
      // Bei der Checkliste ist `quelleId` optional — dort darf es fehlen.
      if (!('quelleId' in szene) || szene.quelleId === undefined) return;
      if (!belegdecke.has(szene.quelleId)) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen', i, 'quelleId'],
          message: `Quelle „${szene.quelleId}" steht nicht in quellenIds dieses Shorts.`,
        });
      }
    });

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

/*
 * Hier standen bis zum 14.08.2026 `Thema` und eine erste, schwaechere Fassung
 * von `Idee`. Beide Typen wurden von keinem Skript je geparst und gehoerten
 * zu `daten/themen.json`, das mit ihnen abgeloest ist. `Idee` steht jetzt am
 * Ende dieser Datei — mit Winkelart, Titelmuster und erzwungenem Belegpfad.
 *
 * Der alte `Thema`-Typ verlangte drei `quellenIds` am Thema. Diese Belegdecke
 * am Thema ist genau das Schlupfloch, das am 14.08.2026 zugemacht wurde: Die
 * Quellen haengen seither an den Szenen, die behaupten (`QUELLENPFLICHT`),
 * nicht an der Ueberschrift darueber.
 */

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

/* ────────────────────────────── Ideen ──────────────────────────────── */

/**
 * Wie weit eine Idee ist. Der Sprung von `skizze` nach `belegt` ist der
 * teure — er kostet je Idee drei abgerufene Seiten mit woertlichem Zitat.
 */
export const Reifegrad = z.enum(['skizze', 'belegt', 'produziert']);
export type Reifegrad = z.infer<typeof Reifegrad>;

/**
 * Eine Instanz, die eine Aussage tragen koennte — noch nicht abgerufen.
 *
 * Das ist der Unterschied zu `Quelle`: Dort steht eine URL mit woertlichem
 * Zitat und Abrufdatum. Hier steht nur die Vermutung, wo es stehen muesste.
 * Kein Zitat, keine URL-Pflicht, nichts Nachpruefbares — und genau deshalb
 * darf daraus nie direkt ein Short werden.
 */
export const Belegpfad = z.object({
  /** Wer. „Bundesnetzagentur", „USB Implementers Forum", „§ 477 BGB". */
  instanz: z.string(),
  art: QuellenArt,
  /** Was dort stehen muesste, damit die Aussage traegt. */
  findet: z.string(),
});
export type Belegpfad = z.infer<typeof Belegpfad>;

/**
 * Eine Videoidee im Vorrat.
 *
 * Angelegt am 14.08.2026, weil der Takt von 5 auf 10 Shorts je Woche
 * steigen soll und der Engpass dabei nicht das Schreiben ist, sondern der
 * Beleg. Eine Idee ohne benennbare unbeteiligte Instanz ist keine Idee,
 * sondern eine Sackgasse, die man erst nach drei abgerufenen Seiten als
 * solche erkennt. Deswegen erzwingt das Schema den Belegpfad **vorher**.
 *
 * Der Vorrat ist bewusst keine JSON-Datei: `themen.json` war eine, wurde
 * von keinem Skript gelesen und behauptete am Ende Dinge, die seit einem
 * Tag nicht mehr stimmten. Als TypeScript prueft `tsc` bei jedem Lauf mit.
 */
export const Idee = z
  .object({
    id: z.string(),
    rubrik: Rubrik,
    winkelart: Winkelart,
    reifegrad: Reifegrad,

    /** Die Frage des Zuschauers, in seinen Worten — nicht in unseren. */
    kernfrage: z.string(),
    /**
     * Der Hebel: die Entwarnung. „Dein Monitor ist nicht kaputt."
     * Nie die Konfrontation („Du machst es falsch").
     */
    entwarnung: z.string(),
    /**
     * Die Tatsache, die die Entwarnung traegt. Ein Satz, pruefbar.
     * Traegt der Belegpfad diesen Satz nicht, faellt die Idee — nicht der
     * Satz wird weichgespuelt.
     */
    sache: z.string(),

    titelmuster: Titelmuster,
    vertiefung: Vertiefung.optional(),
    system: System,

    /** Mindestens eine Instanz je Idee, mindestens eine davon unbeteiligt. */
    belegpfad: z.array(Belegpfad).min(1),
    /** Gefuellt, sobald die Quellen wirklich abgerufen und zitiert sind. */
    quellenIds: z.array(z.string()).default([]),
    /** Warum die Idee traegt, woran sie haengt, was sie nicht darf. */
    notiz: z.string().optional(),
  })
  .superRefine((i, ctx) => {
    const unbeteiligt = i.belegpfad.filter((b) =>
      (UNBETEILIGTE_ARTEN as readonly string[]).includes(b.art),
    );
    if (unbeteiligt.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['belegpfad'],
        message:
          `Idee „${i.id}" nennt nur beteiligte Instanzen. Eine Aussage, die ` +
          `nur der Hersteller bestaetigt, traegt keinen Short — dieselbe Regel ` +
          `wie in beleg(). Wer hier keine unbeteiligte Instanz benennen kann, ` +
          `hat kein Thema, sondern eine Vermutung.`,
      });
    }
    if (i.reifegrad === 'belegt' && i.quellenIds.length < 3) {
      ctx.addIssue({
        code: 'custom',
        path: ['quellenIds'],
        message:
          `Idee „${i.id}" steht auf „belegt", nennt aber nur ` +
          `${i.quellenIds.length} Quellen. Belegt heisst: drei abgerufene ` +
          `Seiten mit woertlichem Zitat, sofort produzierbar.`,
      });
    }
  });
export type Idee = z.infer<typeof Idee>;
