/**
 * Datenvertraege der Pipeline.
 *
 * Diese Schemata sind die Schnittstelle zwischen Skript-Engine und Renderer.
 * Was hier nicht validiert, wird nicht gerendert — so kann kein halbfertiges
 * oder unbelegtes Skript versehentlich in die Produktion laufen.
 */
import { z } from 'zod';

/*
 * Hier stand bis zum 17.08.2026 `System` — macOS, Windows, beide, ohne. Das
 * Feld hat den Umbau auf Unterhaltung nicht ueberlebt, und zwar nicht aus
 * Aufraeumlust: Von den 45 Themen im neuen Vorrat ist **kein einziges**
 * systemspezifisch. Ein gelbes Punktmuster im Laserdruck, ein Ereignisspeicher
 * im Neuwagen, sechzig Elemente im Telefon — nichts davon haengt am
 * Betriebssystem. Das Feld haette in jedem Short `ohne` getragen und in der
 * Kopfzeile Platz belegt, den die Formatpille braucht.
 *
 * Der alte Grund fuer die Angabe war die Hilfe-Aera: Wer eine Anleitung
 * befolgt, muss wissen, ob sie fuer sein Geraet gilt. Wer eine Anekdote hoert,
 * nicht.
 */

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
   * Kennung des einzelnen Belegs, eindeutig innerhalb seiner Quelle.
   *
   * Am 17.08.2026 nachgetragen, und zwar wegen eines Fehlers, der zweimal
   * durchgerutscht ist: Eine Szene zeigte bisher auf eine **Quelle**, nicht auf
   * ein **Zitat**. Eine Quelle mit drei Zitaten hing an vier Szenen, und jede
   * erbte den Belegstatus der Quelle als Ganzes.
   *
   * So kam „Kein Zufall. Ein Gremium hat das so festgelegt." durch die
   * Pruefung, obwohl das einzige Zitat dahinter von Wattzahlen handelte —
   * irgendetwas stand ja in der Quelle. Mit einer Kennung je Beleg muss beim
   * Schreiben benannt werden, **welcher Satz** diesen Satz traegt, und die
   * Luecke faellt beim Schreiben auf statt beim Durchsehen.
   */
  id: z.string().min(3),
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

/* ──────────────────────────── Dramaturgie ──────────────────────────── */

/**
 * Die vier Positionen einer erzaehlten Sache.
 *
 * **Das wichtigste Feld dieses Umbaus.** Bis zum 17.08.2026 ergab sich die
 * Position stillschweigend aus der Reihenfolge und der Szenenart: Die Hook war
 * erste, die Endkarte letzte, dazwischen lag, was lag. Das Ergebnis waren
 * sieben Erklaervideos — und zwar nicht, weil die Texte schlecht waren,
 * sondern weil **nichts im Datenvertrag beim Schreiben gefragt hat**, was
 * diese Szene dramaturgisch eigentlich tut.
 *
 * Dieselbe Logik wie bei der Belegpflicht und beim gestrichenen `presse`: Eine
 * Regel, die sich nicht ausdruecken laesst, laesst sich nicht brechen. Wer
 * jetzt eine Szene schreibt, muss sie einordnen, und eine Szene, die weder
 * zuspitzt noch kippt, faellt beim Einordnen auf.
 *
 * | Position | tut was | verboten |
 * |---|---|---|
 * | `aufschlag` | greift zu: beschuldigt, behauptet, fordert heraus | das Thema ankuendigen |
 * | `zuspitzung` | macht es schlimmer, teurer, absurder | die Aufloesung vorwegnehmen |
 * | `kipppunkt` | die Wendung — die Zahl, das „und heute", der Schuldige | erklaeren, warum das so ist |
 * | `nachschlag` | ein trockener Satz hinterher | zusammenfassen |
 *
 * Der `nachschlag` ist der Platz, an dem bis zum 17.08.2026 die Endkarte
 * stand — eine Liste aus zwei bis vier Punkten, per Schema erzwungen. Eine
 * Liste kann keine Pointe sein. Sie war Lernkontrolle, und Lernkontrolle ist
 * das Gegenteil von Unterhaltung.
 */
export const Position = z.enum(['aufschlag', 'zuspitzung', 'kipppunkt', 'nachschlag']);
export type Position = z.infer<typeof Position>;

export const POSITIONEN: Record<Position, { titel: string; tut: string; verboten: string }> = {
  aufschlag: {
    titel: 'Aufschlag',
    tut: 'Greift zu — beschuldigt, behauptet, fordert heraus.',
    verboten: 'Das Thema ankündigen. „Heute geht es um …" ist kein Aufschlag, sondern eine Ansage.',
  },
  zuspitzung: {
    titel: 'Zuspitzung',
    tut: 'Macht es schlimmer, teurer, absurder. Der Zuschauer lehnt sich vor.',
    verboten: 'Die Auflösung vorwegnehmen. Wer hier schon kippt, hat keinen Kipppunkt mehr.',
  },
  kipppunkt: {
    titel: 'Kipppunkt',
    tut: 'Die Wendung. Je Sendeplatz eine andere — die Zahl, das „und heute", der Schuldige.',
    verboten: 'Erklären, warum das so ist. Die Erklärung ist der Anfang des Erklärvideos.',
  },
  nachschlag: {
    titel: 'Nachschlag',
    tut: 'Ein trockener Satz hinterher, dann Wortmarke und Spruch.',
    verboten: 'Zusammenfassen. Wer wiederholt, was gerade lief, misstraut seinem eigenen Video.',
  },
};

/* ────────────────────────────── Szenen ─────────────────────────────── */

/** Gemeinsame Felder jeder Szene. */
const SzeneBasis = z.object({
  /**
   * Was gesprochen wird. Die Szenenlaenge ergibt sich spaeter aus der
   * tatsaechlichen Sprechdauer, nicht aus einer geschaetzten Sekundenzahl.
   */
  sprechtext: z.string().min(1),
  /** Wo im Bau die Szene steht. Geprueft im `superRefine` des Shorts. */
  position: Position,
  /**
   * Wie lange es nach dieser Szene still bleibt, in Sekunden.
   *
   * Es gibt das Feld wegen des Montags: Nach „Schätz mal." muss der Zuschauer
   * Zeit zum Schaetzen haben, sonst ist die Frage rhetorisch — und wer nicht
   * geschaetzt hat, liegt hinterher auch nicht daneben.
   *
   * **Hier stand bis zum 17.08.2026 `pauseNach: 'kurz' | 'lang'`**, mit der
   * Begruendung, eine Sekundenangabe sei „eine Zahl, die niemand einhaelt":
   * Die Pause entstehe in der Sprachsynthese und lasse sich nicht bestellen.
   * Das war geraten und falsch. `npm run pausenprobe` hat es gemessen:
   *
   * | Trenner | Pause |
   * |---|---|
   * | ` ... ` | 0,38 s |
   * | ` ... ... ... ` | 0,86 s |
   * | ` ... ... ... ... ... ... ` | 1,69 s |
   * | `<break time="2.5s" />` | **2,60 s** |
   *
   * Der erste Anlauf ueber Auslassungspunkte ergab im fertigen Montags-Short
   * eine Denkpause von **1,0 Sekunde** — eine Atempause, kein Gedanke. Der
   * Break-Tag trifft dagegen auf ein Zehntel genau.
   *
   * Dieselbe Geschichte wie bei `ZEICHEN_PRO_SEKUNDE`, das zweimal auf einer
   * Annahme stand, bis jemand nachgemessen hat. **Wenn eine Groesse messbar
   * ist, gehoert sie gemessen und nicht begruendet.**
   *
   * Achtung beim Wechsel von Modell oder Stimme: Ein nicht unterstuetzter
   * Break-Tag wuerde vorgelesen. `npm run pausenprobe` kostet 60 Zeichen und
   * beantwortet das.
   */
  pauseSek: z.number().min(0.5).max(3).optional(),
});

/**
 * Symbole fuer die Situation, nicht fuer die Technik.
 *
 * Hier standen bis zum 17.08.2026 **zwei** Kategorien: `GeraeteArt` (Dock,
 * Kabel, Router — musste dem Datenblatt entsprechen) und `KontextArt`. Die
 * Geraete sind weg, und der Grund ist nicht Aufraeumen, sondern dass sich das
 * Material unter ihnen weggedreht hat.
 *
 * „Licht braucht siebenundsechzig Millisekunden um die Erde" hat keinen
 * Gegenstand. „Ein Rechenzentrum wie eine Kleinstadt" ist ein
 * Groessenverhaeltnis. Von 45 Themen im Vorrat haben vielleicht zwoelf ein
 * Objekt, das selbst der Witz ist. **Die Zahl ist jetzt das Bild**, gesetzt in
 * grosser Schrift — Zeichnungen sind die Ausnahme.
 *
 * Die alte Regel „`geraet` muss dem Datenblatt entsprechen" ist damit nicht
 * gelockert, sondern gegenstandslos: Sie gab es, weil eine falsch gezeichnete
 * Buchse eine unbelegte technische Behauptung ist. Wir zeichnen keine Buchsen
 * mehr. Ein stilisiertes Flugzeug macht keine Aussage, die falsch sein
 * koennte.
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
  /*
   * Vier dazu am 17.08.2026, aus einem Befund am fertigen Video: Der Vorrat
   * deckte genau die Haelfte der acht Sendeplaetze ab, und die andere Haelfte
   * lief deshalb ganz ohne Bild.
   *
   * Alle vier setzen die **Situation**, keine Technik. Das Mikrofon ist nicht
   * das Mikrofon eines bestimmten Fernsehers, das Regal keine Speicherzelle,
   * das Thermometer misst nichts. Der Anhaenger ist der Aufdruck, der bei den
   * Kabeln fehlte — ein Etikett, kein Stecker.
   */
  'mikrofon',
  'regal',
  'thermometer',
  'anhaenger',
  /*
   * Ab dem 18.08.2026 waechst der Vorrat, weil sich die Doktrin gedreht hat:
   * Nicht mehr **eine** Zeichnung je Short als Ausnahme, sondern eine je
   * Szene. Der Grund ist Zuschauerseite, nicht Systematik — die reine
   * Typografie traegt inhaltlich, aber sie laesst die Flaeche leer.
   *
   * Die Grenze bleibt dieselbe und wird dadurch wichtiger, nicht unwichtiger:
   * Situation, nie Technik. Ein Schraubenschluessel steht fuer Reparatur, er
   * ist nicht das Werkzeug, mit dem etwas geoeffnet wird. Ein Karton ist der
   * Kauf, kein Produkt.
   */
  'schraubenschluessel',
  'lupe',
  'karton',
  /*
   * Achtzehn auf einmal, am 18.08.2026 — der Vorrat musste von 15 auf 33, weil
   * jetzt **jede** symbolfaehige Szene eine Zeichnung traegt und keine
   * innerhalb eines Shorts doppelt vorkommen darf.
   *
   * Der Zuschnitt folgt weiter derselben Grenze, und an drei Stellen wurde sie
   * eng: `batterie` ist waagerecht und offen gezeichnet, damit sie nicht mit
   * dem aufrechten, flaechigen Logo verwechselt wird. Statt eines Fernsehers
   * steht `sofa` — das Wohnzimmer ist die Situation, das Geraet waere die
   * Behauptung. Und `schallwellen` zeigt, dass etwas aufgezeichnet wird, ohne
   * ein Aufnahmegeraet zu zeichnen.
   */
  'europa',
  'batterie',
  'zettel',
  'warndreieck',
  'waage',
  'stempel',
  'sprechblase',
  'haken',
  'sofa',
  'fabrik',
  'schallwellen',
  'wolke',
  'papierkorb',
  'karteikarte',
  'ordner',
  'mond',
  'menschen',
  'schild',
  /*
   * Fuenf Gegenstaende, nachgetragen am 18.08.2026 nach einer Korrektur an der
   * Doktrin selbst.
   *
   * Die Regel „keine Geraetezeichnungen" stand hier seit dem 17.08. und war
   * **ueberdehnt**. Ihr Grund ist eine falsch gezeichnete **Buchse**: Die
   * behauptet etwas ueber ein Datenblatt, und dafuer steht keine Quelle ein.
   * Ein Fernseher als Rechteck auf einem Fuss behauptet gar nichts. Ein Kabel
   * ohne Pinbelegung auch nicht.
   *
   * Aus „keine Buchsen" war „keine Gegenstaende" geworden, und an die Stelle
   * der Gegenstaende traten Assoziationen: ein Sofa fuer den Fernseher, eine
   * Waage fuer zwei Kabel, eine Uhr fuer dreizehn Jahre. Eine Assoziation, die
   * nicht trifft, ist schlechter als der schlichte Gegenstand — sie sieht aus
   * wie ein Versehen, und beim Zuschauer ist sie genau das.
   *
   * **Die Grenze verlaeuft jetzt dort, wo sie immer gemeint war:** Gezeichnet
   * wird, was der Satz nennt. Nicht gezeichnet wird, was ein Datenblatt
   * behaupten wuerde — Buchsenformen, Pinbelegungen, Leistungsangaben,
   * Herstellermerkmale.
   */
  'fernseher',
  'kabel',
  'stecker',
  'einkaufskorb',
  'kreuz',

  /*
   * Nachgetragen am 18.08.2026, nach der Sichtung der zweiten Woche. Alle vier
   * schliessen dieselbe Luecke: **Der Satz nannte einen Gegenstand, und im
   * Vorrat stand keiner** — also wich die Zuordnung auf eine Assoziation aus.
   *
   * „Dein Drucker unterschreibt" bekam einen Stempel, „Ein Code auf der
   * Batterie" eine Lupe, „Fingerprints nutzen mehr Daten" ebenfalls eine Lupe,
   * „Die Erde dreht ungleichmaessig" einen Mond. Genau das Muster, das am
   * 18.08. schon einmal zehn von 26 Zuordnungen verdorben hat.
   *
   * Bemerkenswert ist der Drucker: `drucken` ist eines von acht Sachgebieten,
   * und das Geraet dazu fehlte im Symbolvorrat.
   */
  'drucker',
  'browserfenster',
  'erde',
  'qrcode',
]);
export type KontextArt = z.infer<typeof KontextArt>;

/**
 * Zeichnung unter dem Text einer Szene.
 *
 * Optional, und die Regel ist seit dem 17.08.2026 schaerfer: Gesetzt wird nur,
 * wenn die Zeichnung selbst der Witz ist. Der automatische Vorschlag aus dem
 * Szenentext (`src/illustration.ts`) ist ersatzlos gestrichen — er hat dafuer
 * gesorgt, dass **jede** Szene ein Bildchen bekam, und das ist der
 * mechanische Erklaervideo-Reflex in Codeform. Wenn Zeichnungen die Ausnahme
 * sind, muss die Ausnahme eine Entscheidung sein.
 */
const mitIllustration = {
  symbol: KontextArt.optional(),
};

/**
 * Der Beleg im Bild — seit dem 17.08.2026 eine Einblendung, keine Szene.
 *
 * Die Belegszene sass auf Position 4 des alten Baus: nach der Aufloesung, vor
 * dem Schluss. Also genau dort, wo die Pointe hingehoert, stand zweieinhalb
 * Sekunden lang ein Behoerdenname. Das war der teuerste Platz im Video fuer
 * eine Information, die niemanden unterhaelt.
 *
 * Jetzt haengt `herausgeber` an der Szene, die die **tragende Behauptung**
 * macht, und erscheint als duenne Zeile unter der Kopfzeile — nicht unten:
 * Dort sitzt der Untertitel in seiner 270-Pixel-Zone, darunter beginnt
 * TikToks Bedienleiste. Oben steht der Beleg ausserdem bei Wortmarke und
 * Formatpille, und das ist die richtige Nachbarschaft: Er ist ein
 * Markenelement, kein Inhalt.
 *
 * `herausgeber` steht hier **und** in `quellen.json`. Die Doppelung ist
 * gewollt — der Renderer bekommt nur den Short, nicht die Quellenliste. Damit
 * beide nicht auseinanderlaufen, prueft `shortPruefen` hart auf Gleichheit.
 */
const mitBelegeinblendung = {
  /**
   * 60 statt der frueheren 46 Zeichen.
   *
   * Die alte Grenze stammt aus der Belegszene, die den Herausgeber in
   * Ueberschriftgroesse setzte — 76 Pixel, da passen keine 46 Zeichen mehr in
   * eine Zeile. Die Einblendung setzt ihn in 26 Pixel auf voller Buehnenbreite;
   * „Bundesamt für Sicherheit in der Informationstechnik" braucht dort rund
   * zwei Drittel der 1100 Pixel.
   *
   * Abkuerzen waere die falsche Loesung gewesen: „BSI" ist fuer den Zuschauer
   * kein Absender, sondern drei Buchstaben. Der ausgeschriebene Name ist das
   * Argument.
   */
  herausgeber: z.string().max(60).optional(),
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
 * Die Liste nennt die Arten, die **immer** behaupten, egal wo sie stehen: Eine
 * Zahl ohne Beleg ist eine Behauptung mit Nachkommastelle, ein Vergleich ohne
 * Beleg eine Meinung ueber zwei Dinge.
 *
 * Die zweite Haelfte der Regel haengt seit dem 17.08.2026 nicht mehr an der
 * Art, sondern an der **Position**: Alles auf `zuspitzung` und `kipppunkt`
 * braucht eine Quelle, auch eine schlichte `text`-Szene. Dort liegt die
 * Substanz des Videos.
 *
 * Frei bleiben `aufschlag` und `nachschlag`. Der Aufschlag beschuldigt
 * („Na, auch diesen dummen Kauf gemacht?") und der Nachschlag kommentiert —
 * beides sind Sprechhandlungen, keine Tatsachenbehauptungen. Die alte Fassung
 * band die Pflicht allein an die Art und hatte damit ein Loch: Ob eine Aussage
 * belegt sein musste, entschied sich daran, welche Darstellung jemand zufaellig
 * gewaehlt hatte.
 */
export const QUELLENPFLICHT = {
  zahl: 'pflicht',
  vergleich: 'pflicht',
  einschraenkung: 'pflicht',
  kaufkriterien: 'pflicht',
  /** Haengt an der Position — geprueft im `superRefine` des Shorts. */
  text: 'nachPosition',
  /** Eine Frage behauptet nichts. Die Antwort kommt in der naechsten Szene. */
  frage: 'ohne',
  schluss: 'ohne',
} as const satisfies Record<string, 'pflicht' | 'nachPosition' | 'ohne'>;

/**
 * Ein gesprochener Satz im Bild — das Arbeitspferd.
 *
 * Hiess bis zum 17.08.2026 `aussage` und traegt jetzt auch das, was vorher
 * `hook` war. Die eigene Hook-Art ist entfallen, weil ihr einziges
 * Unterscheidungsmerkmal eine Laengengrenze von 70 Zeichen war — und die
 * Kuerze des Aufschlags wird laengst an der richtigen Stelle geprueft: an der
 * **gemessenen** Sprechdauer von hoechstens 3,5 Sekunden in `src/pruefung.ts`.
 * Zwei Regeln fuer dieselbe Sache, eine davon an Zeichen statt an Sekunden,
 * ist genau die Sorte Doppelung, die dieses Projekt schon dreimal bezahlt hat.
 */
const SzeneText = SzeneBasis.extend({
  art: z.literal('text'),
  text: z.string().max(140),
  /** Teilstring aus text, der in Signalblau gesetzt wird. */
  hervorhebung: z.string().optional(),
  /** Pflicht auf `zuspitzung` und `kipppunkt`, sonst frei. */
  quelleId: z.string().optional(),
  /** Das eine Zitat aus dieser Quelle, das genau diesen Satz traegt. */
  belegId: z.string().optional(),
  ...mitIllustration,
  ...mitBelegeinblendung,
});

/**
 * Die grosse Zahl — seit dem Umbau die haeufigste Darstellung.
 *
 * Sie war eine unter zehn Arten und ist jetzt der Kipppunkt des Montags und
 * das Bild des Samstags. Der Grund steht bei `KontextArt`: Das neue Material
 * hat meistens keinen Gegenstand, aber fast immer eine Groesse. Gesetzt wird
 * sie gross genug, um allein die Flaeche zu tragen.
 */
const SzeneZahl = SzeneBasis.extend({
  art: z.literal('zahl'),
  wert: z.string().max(12),
  einheit: z.string().max(16).optional(),
  bedeutung: z.string().max(90),
  /** Eine Zahl ohne Beleg ist eine Behauptung mit Nachkommastelle. */
  quelleId: z.string(),
  /** Und das Zitat, in dem die Zahl wirklich steht. */
  belegId: z.string(),
  ...mitIllustration,
  ...mitBelegeinblendung,
});

/**
 * Die Frage, die stehen bleibt — der Montag.
 *
 * Die einzige Stelle im ganzen Kanal, an der der Zuschauer selbst etwas tut.
 * „Schätz mal." wird gesprochen, danach steht die Frage im Bild und es bleibt
 * still, bis die Zahl kommt. Wer nicht schaetzen musste, liegt hinterher auch
 * nicht daneben — und ohne Danebenliegen traegt der Sendeplatz „Du bist dumm"
 * seinen Namen zu Unrecht.
 *
 * Die Stille kostet **kein ElevenLabs-Kontingent**: Sie entsteht aus dem
 * Szenentrenner, nicht aus gesprochenem Text. Der Montag ist damit der
 * billigste Short der Woche und zugleich der interaktivste.
 */
const SzeneFrage = SzeneBasis.extend({
  art: z.literal('frage'),
  /** Steht gross im Bild und bleibt stehen, waehrend nichts gesprochen wird. */
  frage: z.string().max(80),
  /** Eine Frage behauptet nichts — die Antwort kommt in der naechsten Szene. */
  ...mitIllustration,
});

/**
 * Zwei Lager nebeneinander — praktisch nur noch am Sonntag.
 *
 * Die Art war frueher die Kaufentscheidung („dieses Kabel oder jenes"). Was
 * davon bleibt, ist der Streitfall: Die einen sagen das, die anderen das. Fuer
 * die Kaufberatung ist sie nicht mehr da, dafuer gibt es `kaufkriterien`.
 */
const SzeneVergleich = SzeneBasis.extend({
  art: z.literal('vergleich'),
  ueberschrift: z.string().max(50).optional(),
  /** Ein Vergleich behauptet ueber beide Seiten. Ohne Beleg ist er eine Meinung. */
  quelleId: z.string(),
  belegId: z.string(),
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
  ...mitBelegeinblendung,
});

/**
 * Das „aber" — der Kipppunkt des Sonntags.
 *
 * Am Sonntag haben **beide** Lager etwas uebersehen, und die Aufloesung hat
 * deshalb zwei Haelften: die Bedingung, unter der es kippt, und was dann
 * folgt. Das ist zugleich die Art, die den Sonntag offen enden laesst — er
 * schliesst als einziger Sendeplatz auf einer Restfrage statt auf einer
 * Pointe, weil es sonst nichts zu kommentieren gibt.
 */
const SzeneEinschraenkung = SzeneBasis.extend({
  art: z.literal('einschraenkung'),
  ueberschrift: z.string().max(50).optional(),
  bedingung: z.string().max(70),
  folge: z.string().max(90),
  quelleId: z.string(),
  belegId: z.string(),
  ...mitIllustration,
  ...mitBelegeinblendung,
});

/**
 * Der Nachschlag — **ein** Satz, dann Wortmarke und Spruch.
 *
 * Hier stand bis zum 17.08.2026 die Endkarte, und ihr Schema erzwang
 * `punkte: min(2).max(4)`. Eine Liste kann keine Pointe sein; die Endkarte war
 * per Bauart Lernkontrolle. Die alte Begruendung — „knapp genug zum Erfassen
 * im Standbild", damit jemand sie fotografiert — hat sich nie eingeloest:
 * Fotografiert wird ein Fahrplan, kein Merksatz.
 *
 * Das Feld heisst `satz` im Singular, und der Singular ist die Regel. Wer zwei
 * Saetze braucht, hat keine Pointe, sondern eine Zusammenfassung.
 *
 * Der Kanalspruch darunter kommt aus `src/marke.ts` und steht in jedem Short.
 * Nach einem frechen Video ist „Wir haben nachgelesen." selbst die Pointe: Die
 * pedantischste Stimme, die man sich vorstellen kann, hat gerade behauptet,
 * der Zuschauer sei dumm — und legt jetzt die Quelle daneben.
 */
const SzeneSchluss = SzeneBasis.extend({
  art: z.literal('schluss'),
  satz: z.string().max(80),
  /**
   * Warum der **erste** Satz des Videos danach wieder passt.
   *
   * Ein Short laeuft von selbst wieder an, und ein Rewatch zaehlt als eigene
   * Ansicht. Bis zum 18.08.2026 arbeitete der Schluss dagegen: blauer Strich,
   * zweite Wortmarke, Spruch — ein Vorhang, der 1,5 bis 3,1 Sekunden dauerte
   * und optisch sagte, dass man nicht abwarten muss. Der Vorhang ist weg.
   *
   * Das allein reicht nicht. Ob der Anfang nach dem Ende wieder traegt, kann
   * kein Skript beurteilen — es ist eine Frage an den Text. Deshalb steht sie
   * hier als **Feld** und nicht als Pruefung: dieselbe Logik wie bei
   * `position`, `weitererzaehlt` und `belegId`. Eine Regel, nach der nichts
   * fragt, wird nicht befolgt.
   *
   * Bemerkenswert: Bei zweien der acht Shorts vom 18.08. lief es schon rund,
   * ohne dass jemand darauf geachtet haette. „Gefragt hat dich niemand." →
   * „Dein Fernseher hat ein Mikrofon." Das Feld haelt fest, was sonst Zufall
   * bleibt.
   */
  rundlauf: z.string().min(15).max(160),
});

/**
 * Kaufkriterien — die Bruecke vom Problem zum Produkt.
 *
 * Ruht bis zu den Affiliate-Links und laeuft dann nur im Format `empfehlung`.
 * Sie nennt bewusst kein Modell, sondern das Merkmal — das bleibt richtig,
 * wenn das Geraet laengst abgeloest ist, und macht den Link in der
 * Beschreibung erst nachvollziehbar.
 *
 * Sobald `verweis` gesetzt ist, verweist das Video selbst auf die Beschreibung
 * und wird damit kommerzielle Kommunikation (§ 5a Abs. 4 UWG, § 6 DDG). Die
 * Werbekennzeichnung im Bild ist dann Pflicht — das erzwingt das Short-Schema
 * weiter unten, damit sie nicht vergessen werden kann.
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
  belegId: z.string(),
  ...mitBelegeinblendung,
});

/*
 * Sieben Arten statt zehn. Was am 17.08.2026 gestrichen wurde und warum:
 *
 * | Art | warum weg |
 * |---|---|
 * | `hook` | ging in `text` auf — ihr Merkmal war eine Zeichengrenze, die als Sekundengrenze schon existierte |
 * | `aussage` | heisst jetzt `text` |
 * | `warnung` | trug ein Feld `loesung`. Eine Loesung anzubieten heisst, eine Handlung zu verlangen — im Feed toedlich |
 * | `merkmalskarte` | Geraetezeichnung plus ja/nein-Merkmale: eine Kaufberatungskarte, und wir zeichnen keine Geraete mehr |
 * | `beleg` | wurde zur Einblendung, siehe `mitBelegeinblendung` |
 * | `endkarte` | konnte per Schema nur eine Liste sein, siehe `SzeneSchluss` |
 *
 * Die vier Streichungen sind derselbe Befund aus vier Richtungen: Das alte
 * Vokabular war Erklaervideo-Vokabular. Loesung, Merkmal, Bewertung, Punkte
 * zum Mitnehmen — jedes einzelne Feld setzt voraus, dass der Zuschauer etwas
 * lernen will. Er will unterhalten werden.
 */
export const Szene = z.discriminatedUnion('art', [
  SzeneText,
  SzeneZahl,
  SzeneFrage,
  SzeneVergleich,
  SzeneEinschraenkung,
  SzeneSchluss,
  SzeneKaufkriterien,
]);
export type Szene = z.infer<typeof Szene>;
export type SzenenArt = Szene['art'];

/* ────────────────────────────── Format ─────────────────────────────── */

/**
 * Das Sendeformat — die einzige tragende Achse eines Shorts.
 *
 * **Die sieben Formate sind am 17.08.2026 aus dem Material abgeleitet worden,
 * nicht umgekehrt.** Das ist der Unterschied zur Fassung vom Vortag: Damals
 * standen sieben Sendeplaetze fest, und die Themen wurden hineinsortiert.
 * Ergebnis waren sieben Erklaervideos, weil die Themen Suchanfragen waren —
 * „welche Buchse ueberträgt Bild", „welche Kabelklasse reicht". Antworten auf
 * Fragen, die im Feed niemand stellt.
 *
 * Der neue Weg lief andersherum: erst 56 Sachen sammeln, die man am Tisch
 * erzaehlen wuerde, dann nach der **Reaktion** sortieren, die sie ausloesen,
 * und schauen, welche Gruppen dabei entstehen. Es wurden sieben — ohne dass
 * die Zahl vorgegeben war.
 *
 * Eine Beobachtung dabei hat die Rechnung gerettet: **„Du bist dumm" ist keine
 * Themengruppe, sondern die Machart der Zahlen-Gruppe.** „Wie viele Elemente
 * stecken in deinem Handy? Schätz mal." — die Schaetzfrage ist das Roasten,
 * und die Zahl ist die Aufloesung. Ohne diese Zusammenlegung waeren es acht
 * Gruppen auf sieben Tage gewesen.
 *
 * Zwei Regeln gelten fuer alle sieben:
 *
 * 1. **Die Pointe trifft die Sache, nicht den Zuschauer** — mit einer
 *    ausdruecklichen Ausnahme. Der Montag heisst „Du bist dumm" und behauptet
 *    genau das, aber die Aufloesung sammelt ihn sofort wieder ein:
 *    „Sechzig. Du warst bei zwölf — wie alle." Der Titel beleidigt, das Video
 *    beweist, dass es allen so geht. Ohne dieses „wie alle" bleibt nur die
 *    Beleidigung.
 * 2. **Kein Format verlangt eine Handlung.** „Steh auf und pruef das" ist
 *    Arbeit. Ein Format, das Arbeit verlangt, ist Hauptvideo-Stoff. Der
 *    Montag ist die feine Ausnahme: Schaetzen ist keine Arbeit, es passiert
 *    unwillkuerlich, waehrend der Daumen schon weiterwischt.
 *
 * Die zweite Person ist seit dem 16.08.2026 erlaubt und der Sprecher dabei
 * mitgemeint. Vorher galt die dritte Person als Schutz vor Belehrung; sie hat
 * stattdessen jede Frechheit weichgespuelt.
 */
export const Format = z.enum([
  'dubistdumm',
  'eswareinmal',
  'absicht',
  'neu',
  'auchgekauft',
  'heimlich',
  'gibtswirklich',
  'werhatrecht',
  'empfehlung',
]);
export type Format = z.infer<typeof Format>;

/**
 * Der Wochentag, an dem ein Format laeuft — `null` fuer die Empfehlung.
 *
 * Die sieben festen Formate belegen Montag bis Sonntag. Die **Empfehlung**
 * steht bewusst ausserhalb: Sie ist die Hauptidee des Kanals und wird als
 * Nebensache gesendet, weil Seltenheit der Preis ist, den eine Empfehlung
 * wert ist. Wer woechentlich empfiehlt, ist ein Prospekt. Sie kommt erst,
 * wenn Affiliate-Links stehen — dann als drei zusaetzliche Videos je Woche,
 * mit Label im Bild.
 */
export const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as const;

export const FORMATE: Record<
  Format,
  {
    titel: string;
    /**
     * Der Name in der Kopfzeilen-Pille.
     *
     * Getrennt vom `titel`, weil die Bildzeile Platz mit Logozeichen und
     * Wortmarke teilt. Am 16.08.2026 brach „Hallo 21. Jahrhundert" bei 21
     * Zeichen auf zwei Zeilen und zog die ganze Kopfzeile in die Hoehe —
     * seither ist das die Obergrenze, an der gemessen wird. Die laengste Pille
     * unten hat 17 Zeichen.
     */
    pille: string;
    tag: (typeof WOCHENTAGE)[number] | null;
    /**
     * Sendezeit als volle Stunde.
     *
     * Stand bis zum 17.08.2026 als Konstante `UHRZEIT = 18` in
     * `zeitplanBauen` und war dort richtig, solange ein Tag genau ein Format
     * trug. Mit dem zweiten Mittwochsvideo waeren zwei Shorts auf dieselbe
     * Minute gefallen — sie haetten sich gegenseitig die Reichweite genommen,
     * und zwar unbemerkt, weil der Plan formal stimmt.
     *
     * Achtzehn Uhr bleibt der Hauptplatz. Der Zweitplatz liegt mittags, weit
     * genug entfernt, dass die beiden nicht dieselbe Feed-Sitzung teilen.
     */
    uhrzeit: number;
    haltung: string;
    reaktion: string;
    /** Woran die Wendung auf Position 3 haengt. Je Sendeplatz eine andere. */
    kipppunkt: string;
    /** Muster fuer den ersten Satz. Kein fester Wortlaut — nur die Bewegung. */
    opener: readonly string[];
  }
> = {
  dubistdumm: {
    titel: 'Du bist dumm',
    pille: 'Du bist dumm',
    tag: 'Mo',
    uhrzeit: 18,
    haltung:
      'Eine Groesse, die niemand einordnen kann, als Schaetzfrage. Der Kanal ' +
      'behauptet im Titel, der Zuschauer sei zu bloed dafuer — und beweist ' +
      'dann, dass es allen so geht. Die Frechheit traegt nur mit dem ' +
      '„wie alle" in der Aufloesung.',
    reaktion: 'Nie im Leben hätte ich das geraten',
    kipppunkt: 'Die Zahl.',
    opener: ['Schätz mal.', 'Wie viele, glaubst du?', 'Nenn eine Zahl.'],
  },
  eswareinmal: {
    titel: 'Es war einmal',
    pille: 'Es war einmal',
    tag: 'Di',
    uhrzeit: 18,
    haltung:
      'Die Regel, die einmal richtig war, als Maerchen erzaehlt. Der Reiz liegt ' +
      'darin, dass niemand gelogen hat — die Technik hat sich unter der Regel ' +
      'weggedreht. Die Pointe trifft die veraltete Weisheit, nie den, der sie ' +
      'weitergegeben hat.',
    reaktion: 'Stimmt, das sagt mein Vater immer noch',
    kipppunkt: 'Das „und heute".',
    opener: ['Es war einmal eine Regel.', 'Damals stimmte das.', 'Vor langer Zeit war das richtig.'],
  },
  absicht: {
    titel: 'Das ist Absicht',
    pille: 'Das ist Absicht',
    tag: 'Mi',
    uhrzeit: 18,
    haltung:
      'Nichts davon ist kaputt, es ist so gebaut. Der Unterschied zur blossen ' +
      'Absurditaet: Hier gibt es jemanden, der es entschieden hat. Die Wut ' +
      'richtet sich gegen den Hersteller, und das macht den Zuschauer ' +
      'automatisch zum Verbuendeten.',
    reaktion: 'Die haben sie doch nicht mehr alle',
    kipppunkt: 'Wer es entschieden hat.',
    opener: ['Das ist kein Fehler.', 'Da hat jemand drüber nachgedacht.', 'Das war eine Entscheidung.'],
  },
  /**
   * Der achte Sendeplatz, beschlossen am 17.08.2026 — und der einzige, der
   * einen Tag **teilt** statt einen zu verdraengen.
   *
   * Der Anlass: Von 51 Themen im Vorrat hatte **keines ein Datum**. Der Kanal
   * war ein Museum — gelbe Punkte, Bildschirmschoner, Defragmentieren, alles
   * zeitlos richtig und nichts davon von dieser Woche.
   *
   * **Die Materialgrenze ist hart und definiert den Sendeplatz.** „Aktuell"
   * zerfaellt in zwei Sorten: neue Geraete, belegt durch Herstellerankuendigung
   * (beteiligt) und Presse (nicht eintragbar) — das koennen wir nicht. Und
   * neue **Regeln, Normen und Grenzwerte**, belegt durch Behoerden und
   * Normungsgremien — das koennen wir als einzige. Wer hier ein Gadget
   * ankuendigt, hat den Sendeplatz missverstanden.
   *
   * Das ist kein Ersatzmaterial, sondern das bessere: Niemand liest das
   * Amtsblatt. Ein Kanal mit dem Spruch „Wir haben nachgelesen" hat dort ein
   * Monopol, und es ist wirklich aktuell statt nur zeitlos interessant.
   *
   * **Er ist der teuerste der acht.** Alle anderen ziehen aus einem Vorrat,
   * der Wochen haelt. Dieser braucht jede Woche eine frisch abgerufene
   * Behoerdenseite — ein Vorrat aus dem Fruehjahr ist im Herbst kein Vorrat
   * mehr, sondern ein Archiv.
   */
  neu: {
    titel: 'Neu und keiner sagt es dir',
    pille: 'Neu',
    tag: 'Mi',
    uhrzeit: 12,
    haltung:
      'Was sich gerade geaendert hat und wovon niemand erzaehlt hat. Die ' +
      'Komplizenschaft kommt aus der Aktualitaet: Der Zuschauer erfaehrt es ' +
      'hier zuerst, und zwar aus dem Dokument statt aus einer Meldung ueber ' +
      'das Dokument.',
    reaktion: 'Das gilt schon? Seit wann?',
    kipppunkt: 'Seit wann es gilt — und dass es niemand gesagt hat.',
    opener: ['Seit drei Wochen gilt das.', 'Das hat sich gerade geändert.', 'Niemand hat es dir gesagt.'],
  },
  auchgekauft: {
    titel: 'Na, auch gekauft?',
    pille: 'Auch gekauft?',
    tag: 'Do',
    uhrzeit: 18,
    haltung:
      'Der Zuschauer sieht sein eigenes Regal. Funktioniert nur, wenn der ' +
      'Sprecher mitgemeint ist — sonst ist es Belehrung. Zugleich die Vorarbeit ' +
      'fuer die Empfehlung: Ein Kanal, der ein halbes Jahr lang sagt, was man ' +
      'nicht kaufen soll, wird geglaubt, wenn er einmal etwas empfiehlt.',
    reaktion: 'Verdammt, das liegt bei mir in der Schublade',
    kipppunkt: 'Was du stattdessen bekommen hast.',
    opener: ['Na, auch diesen dummen Kauf gemacht?', 'Das liegt bei dir in der Schublade.', 'Dafür hast du bezahlt.'],
  },
  heimlich: {
    titel: 'Das macht dein Gerät heimlich',
    pille: 'Heimlich',
    tag: 'Fr',
    uhrzeit: 18,
    haltung:
      'Nicht was du tust, sondern was das Geraet tut. An dir, ohne zu fragen. ' +
      'Die harte Regel dieses Sendeplatzes: **Es muss in einem Dokument ' +
      'stehen.** „Dein Handy hoert mit" ist unbelegbar und deshalb kein Thema — ' +
      'gerade hier, wo die Vermutung billig zu haben waere.',
    reaktion: 'Moment, was macht es?',
    kipppunkt: 'Wo es dokumentiert steht.',
    opener: ['Es tut das gerade. Jetzt.', 'Niemand hat dich gefragt.', 'Es schreibt mit.'],
  },
  gibtswirklich: {
    titel: 'Das gibt es wirklich',
    pille: 'Gibt es wirklich',
    tag: 'Sa',
    uhrzeit: 18,
    haltung:
      'Tatsachen, die absurd klingen und trotzdem dokumentiert sind. Sie ' +
      'brauchen keine Pointe — die Sache selbst ist die Pointe. Der staerkste ' +
      'Vorrat des Kanals steht am staerksten Feed-Tag.',
    reaktion: 'Das kann nicht stimmen',
    kipppunkt: 'Die Sache selbst.',
    opener: ['Das gibt es wirklich.', 'Ich habe das dreimal nachgelesen.', 'Das ist kein Witz.'],
  },
  werhatrecht: {
    titel: 'Wer hat recht?',
    pille: 'Wer hat recht?',
    tag: 'So',
    uhrzeit: 18,
    haltung:
      'Zwei benennbare Lager, und **beide** uebersehen etwas. Der einzige ' +
      'Sendeplatz, der nicht auf einer Pointe endet, sondern auf einer ' +
      'Restfrage — sonst gibt es nichts zu kommentieren, und Kommentare sind ' +
      'bei Shorts ein Verteilungssignal.',
    reaktion: 'Nein, das stimmt so nicht ganz',
    kipppunkt: 'Das Dritte, das beide Lager übersehen.',
    opener: ['Zwei Lager. Beide daneben.', 'Darüber streiten Leute seit Jahren.', 'Du sagst das, dein Vater sagt das.'],
  },
  empfehlung: {
    titel: 'Empfehlung',
    pille: 'Empfehlung',
    tag: null,
    uhrzeit: 18,
    haltung:
      'Kaufhilfe mit Label im Bild. Der einzige Sendeplatz mit Partnerlinks ' +
      '(Variante A) und der einzige, auf dem ein Markenname fallen darf.',
    reaktion: 'Das nehme ich',
    kipppunkt: 'Das Merkmal, an dem es haengt.',
    opener: ['Worauf du achtest, wenn du eins kaufst.'],
  },
};

/**
 * Woran sich entscheidet, in welches Format ein Fakt gehoert.
 *
 * Der Reihe nach geprueft, **die erste Uebereinstimmung gewinnt**. Die Ordnung
 * geht von der schaerfsten Bedingung zur weitesten: `gibtswirklich` steht am
 * Ende, weil es alles auffaengt, was keine der sechs anderen Bedingungen
 * erfuellt — und deshalb nie zuerst greifen darf.
 *
 * Zwei Abgrenzungen muessen halten:
 *
 * **Dienstag gegen Sonntag.** Beide handeln von falschen Ueberzeugungen.
 * Pruefstein — lautet die Aufloesung schlicht „frueher stimmte es, heute
 * nicht", ist es ein **Maerchen**. `werhatrecht` braucht, dass **beide**
 * Seiten etwas uebersehen haben. Sonst ist es ein Mythos mit zwei Sprechern.
 *
 * **Mittwoch gegen Freitag.** Beide empoeren. `absicht` ist, wie das Geraet
 * **gebaut** wurde — jemand hat es so entschieden und verkauft es dir.
 * `heimlich` ist, was es im Betrieb **tut**, ohne zu fragen. Der Drucker, der
 * Fremdpatronen sperrt, ist Mittwoch; der Drucker, der den Fuellstand nach
 * Hause meldet, ist Freitag.
 */
export const MATRIX: readonly { prueffrage: string; format: Format }[] = [
  { prueffrage: 'Streiten zwei Lager darüber, und beide übersehen etwas?', format: 'werhatrecht' },
  { prueffrage: 'Tut das Gerät es im Betrieb, ohne zu fragen — und steht das in einem Dokument?', format: 'heimlich' },
  { prueffrage: 'Stimmte es früher und heute nicht mehr?', format: 'eswareinmal' },
  { prueffrage: 'Hat es sich in diesem Jahr geändert und steht das in einem amtlichen Text?', format: 'neu' },
  { prueffrage: 'Hat jemand es absichtlich so gebaut, gegen den Käufer?', format: 'absicht' },
  { prueffrage: 'Liegt das Ding bei ihm zu Hause und war es sein Geld?', format: 'auchgekauft' },
  { prueffrage: 'Ist es eine Größe, die niemand einordnen kann?', format: 'dubistdumm' },
  { prueffrage: 'Klingt es absurd und ist trotzdem dokumentiert?', format: 'gibtswirklich' },
];

/* ──────────────────────────── Sachgebiet ───────────────────────────── */

/**
 * Wovon ein Short handelt — **nicht** sein Sendeplatz.
 *
 * Einzige Aufgabe: verhindern, dass eine Woche zur Druckerwoche wird. Sieben
 * Formate garantieren sieben verschiedene **Zugriffe**, aber nicht sieben
 * verschiedene **Gegenstaende** — deshalb hoechstens zweimal dasselbe
 * Sachgebiet je Lauf.
 *
 * **Die Werte sind am 17.08.2026 komplett ausgetauscht worden.** Vorher hiessen
 * sie `schreibtisch`, `unterwegs`, `reise`, `zuhause`, `kaufen` — die fuenf
 * alten Rubriken, vom Sendeplatz zum Sachgebiet abgesunken. Auf das neue
 * Material passen sie nicht: `reise` haette genau **ein** Thema getragen (den
 * Flugmodus), waehrend im Vorrat vier Drucker- und sieben Akku-Themen stehen.
 * Eine Achse, die die Haeufung nicht sieht, um die es geht, ist keine Achse.
 *
 * Format und Sachgebiet bleiben **unabhaengig**: „Es war einmal" ueber Akkus
 * und ueber Bildschirme sind zwei verschiedene Videos.
 */
export const Sachgebiet = z.enum(['drucken', 'laden', 'bildschirm', 'rechner', 'handy', 'fahren', 'netz', 'recht']);
export type Sachgebiet = z.infer<typeof Sachgebiet>;

export const SACHGEBIETE: Record<Sachgebiet, { titel: string; traegt: string; abgrenzung: string }> = {
  drucken: {
    titel: 'Drucken',
    traegt: 'Patronen, Toner, Firmware, Verbrauchsmaterial, das gelbe Punktmuster.',
    abgrenzung: 'Das ergiebigste und gefährlichste Gebiet — vier Themen im Vorrat, alle stark.',
  },
  laden: {
    titel: 'Laden',
    traegt: 'Akku, Ladezyklen, Netzteile, kabellos, Ladeziegel, Wärme.',
    abgrenzung: 'Das zweite Haufengebiet: sieben Themen. Höchstens zwei je Woche.',
  },
  bildschirm: {
    titel: 'Bildschirm',
    traegt: 'Fernseher, Monitore, HbbTV, Bilderkennung, Einbrennen.',
    abgrenzung: 'Das Gerät zeigt etwas an. Was dahinter rechnet, ist „rechner".',
  },
  rechner: {
    titel: 'Rechner',
    traegt: 'Speicher, Dateien, Betriebssystem, SSD, Sticks, alte Hardware.',
    abgrenzung: 'Alles, was rechnet und keinen Akku im Namen trägt.',
  },
  handy: {
    titel: 'Handy',
    traegt: 'Telefon als Ganzes: Kamera, Fotos, Rohstoffe, Wasserschaden, Apps.',
    abgrenzung: 'Geht es um den Akku darin, ist es „laden".',
  },
  fahren: {
    titel: 'Fahren',
    traegt: 'Auto, Ereignisspeicher, Fahrzeugsoftware, Abos im Fahrzeug.',
    abgrenzung: 'Drei Themen — dünn, aber unverwechselbar und deshalb eigenständig.',
  },
  netz: {
    titel: 'Netz',
    traegt: 'WLAN, Internet, Rechenzentren, Laufzeiten, Browser, Datenschutz.',
    abgrenzung: 'Sobald die Aussage an einer Leitung oder Gegenstelle hängt.',
  },
  /*
   * Das achte Sachgebiet, nachgetragen beim Planen der ersten Woche.
   *
   * Es fehlte, und der Mangel fiel erst am konkreten Fall auf: Wohin gehoert
   * „Ersatzteile muessen freigeschaltet werden"? Es hat keinen Gegenstand,
   * sondern einen Paragrafen. Der Griff waere gewesen, es irgendeinem
   * Geraetegebiet zuzuschlagen — und eine willkuerliche Zuordnung macht die
   * Achse wertlos, weil sie dann Haeufungen weder zeigt noch verhindert.
   */
  recht: {
    titel: 'Recht',
    traegt: 'Verordnungen, Gewährleistung, Reparatur, Kennzeichnung, Urteile.',
    abgrenzung: 'Der Gegenstand ist eine Vorschrift, kein Gerät.',
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

/**
 * Die fertige Vertonung eines Shorts.
 *
 * Steht seit dem 18.08.2026 als **eigenes** Schema hier und nicht mehr inline
 * im Short. Der Anlass ist `--ton-behalten` im Wochenlauf: Der Schalter
 * braucht aus alten Renderdaten genau dieses Stueck und sonst nichts.
 *
 * Vorher parste er die ganze Datei gegen den aktuellen `Short` — und
 * blockierte sich damit selbst, sobald sich der Datenvertrag aenderte. Genau
 * das passierte, als ein Symbolwert aus dem Enum flog: Die Renderdaten von
 * vorhin galten ploetzlich als ungueltig, obwohl an der Tonspur nichts falsch
 * war. Renderdaten sind eine **Momentaufnahme** eines aelteren Vertrags; was
 * man aus ihnen liest, muss man einzeln lesen koennen.
 */
export const Tonspur = z.object({
  datei: z.string(),
  dauerSek: z.number().positive(),
  woerter: z.array(Untertitelwort),
  /** Startzeit jeder Szene, aus den Sprech-Zeitstempeln abgeleitet. */
  szenenStartSek: z.array(z.number().nonnegative()),
});
export type Tonspur = z.infer<typeof Tonspur>;

export const Short = z.object({
  id: z.string(),
  /** Thema, zu dem dieser Short gehoert. */
  themaId: z.string(),
  /**
   * Das Sendeformat — die tragende Achse. Je Lauf kommt jedes genau einmal
   * vor, und der Wochentag ergibt sich daraus (`FORMATE[...].tag`).
   */
  format: Format,

  /**
   * Wovon der Short handelt. Nur fuer die Streuung: In sieben Videos darf kein
   * Sachgebiet oefter als zweimal vorkommen, sonst wird die Woche zur
   * Druckerwoche.
   */
  sachgebiet: Sachgebiet,

  /** Interner Arbeitstitel, nicht der Veroeffentlichungstitel. */
  arbeitstitel: z.string(),

  /**
   * Der Satz, den jemand am Tisch weitererzaehlt.
   *
   * Hier stand bis zum 17.08.2026 `merksatz` — „der Satz, der ueber den
   * Einzelfall hinaustraegt", also die Lehre. Das Feld hat getan, was es
   * sollte, und genau darin lag der Fehler: Es hat bei jedem Entwurf die Frage
   * gestellt „was ist hier das Prinzip?" und damit siebenmal ein Erklaervideo
   * erzwungen.
   *
   * Der Zwang bleibt, die Frage wechselt: **Erzaehlt das jemand freiwillig
   * weiter?** „USB-C braucht Alt Mode fuer Bild" — nein. „Dein Drucker druckt
   * unsichtbare gelbe Punkte auf jede Seite" — ja. Beides Technik, beides
   * belegbar, nur eins ist ein Video.
   *
   * Pflichtfeld, obwohl sich seine Guete nicht pruefen laesst. Ein Thema, zu
   * dem sich dieser Satz nicht schreiben laesst, ist keins.
   */
  weitererzaehlt: z.string().min(10).max(90),

  /**
   * Der Bau: vier Positionen, fuenf bis acht Szenen.
   *
   * **Positionen und Szenen sind seit dem 17.08.2026 zwei verschiedene
   * Dinge.** Vorher war eine Szene eine Position, und das hiess bei fuenf
   * Positionen: fuenf Textblocke à vier bis fuenf Sekunden. Fuer einen Feed
   * ist das eine Diashow. Sechs bis sieben Szenen ergeben einen Schnitt alle
   * drei Sekunden bei **gleicher** Gesamtlaenge — der Platz dafuer kommt aus
   * der gestrichenen Belegszene (2,5 s) und der gestrichenen Endkarte (3,2 s).
   *
   * Die `position` steht, die `art` ist frei: Ein Kipppunkt kann eine `zahl`
   * sein, eine `einschraenkung` oder schlicht ein `text`, je nachdem was der
   * Fakt braucht.
   *
   * Acht ist die Obergrenze, weil bei 23 Sekunden und 0,32 s Atempause je
   * Schnitt sonst mehr Pause als Satz im Video steht.
   */
  szenen: z.array(Szene).min(5).max(8),

  /**
   * Die Quellen dieses Shorts.
   *
   * Bis zum 15.08.2026 waren es **drei**, und daneben stand die Regel, dass
   * mindestens eine davon unbeteiligt sein muss. Aus den zwei Regeln ist eine
   * geworden: Die Anzahl war die schwaechere Haelfte — drei Herstellerseiten
   * belegen nichts, eine Behoerdenseite belegt alles. Geprueft wird der
   * **Rang** in `beleg()`, nicht die Zahl.
   */
  quellenIds: z.array(z.string()).min(1),

  texte: z.object({
    tiktok: Plattformtext,
    instagram: Plattformtext,
    youtube: Plattformtext,
  }),

  kennzeichnung: z.object({
    /**
     * **Wo** die Werbung stattfindet — nicht ob.
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
  tonspur: Tonspur.optional(),
  })
  /**
   * Bau, Beleg und Kennzeichnung haengen nicht am Gewissen.
   *
   * Bei bis zu 500.000 Euro Bussgeld ist das die einzige Stelle, an der die
   * Kennzeichnungsregel zuverlaessig greift — und seit dem 17.08.2026 auch die
   * Stelle, an der die Dramaturgie greift.
   */
  .superRefine((short, ctx) => {
    /* ── Der Bau: vier Positionen in ihrer Reihenfolge ───────────── */

    /*
     * Die Regel, die es vorher nicht gab und deren Fehlen sieben Erklaervideos
     * gekostet hat. Geprueft wird dreierlei: dass jede Position vorkommt, dass
     * Aufschlag und Nachschlag genau einmal vorkommen, und dass die Folge
     * monoton ist — keine Zuspitzung nach dem Kipppunkt.
     *
     * Die Monotonie ist der eigentliche Punkt. Eine Zuspitzung nach der
     * Wendung ist kein Erzaehlfehler, den man hoert, sondern einer, den man
     * spuert: Das Video hat seine Pointe schon gehabt und redet weiter.
     */
    const rang: Record<Position, number> = { aufschlag: 0, zuspitzung: 1, kipppunkt: 2, nachschlag: 3 };
    const folge = short.szenen.map((s) => s.position);

    (['aufschlag', 'nachschlag'] as const).forEach((p) => {
      const anzahl = folge.filter((f) => f === p).length;
      if (anzahl !== 1) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen'],
          message:
            anzahl === 0
              ? `Keine Szene auf Position „${POSITIONEN[p].titel}". ${POSITIONEN[p].tut}`
              : `${anzahl} Szenen auf Position „${POSITIONEN[p].titel}" — die Position gibt es genau einmal.`,
        });
      }
    });

    (['zuspitzung', 'kipppunkt'] as const).forEach((p) => {
      if (!folge.includes(p)) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen'],
          message: `Keine Szene auf Position „${POSITIONEN[p].titel}". ${POSITIONEN[p].tut}`,
        });
      }
    });

    folge.forEach((p, i) => {
      const vorher = folge[i - 1];
      if (vorher !== undefined && rang[p] < rang[vorher]) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen', i, 'position'],
          message:
            `Szene ${i + 1} steht auf „${POSITIONEN[p].titel}", die Szene davor war schon ` +
            `„${POSITIONEN[vorher].titel}". Der Bau läuft nur vorwärts.`,
        });
      }
    });

    /* ── Der Schluss ist eine `schluss`-Szene, und zwar die letzte ─ */

    const letzte = short.szenen[short.szenen.length - 1];
    if (letzte !== undefined && letzte.art !== 'schluss' && letzte.art !== 'kaufkriterien') {
      ctx.addIssue({
        code: 'custom',
        path: ['szenen'],
        message: `Der Short endet auf „${letzte.art}". Er endet auf einem Nachschlag oder auf Kaufkriterien.`,
      });
    }

    /* ── Ein Aufschlag kündigt nichts an ─────────────────────────── */

    /*
     * Die einzige Textregel im Schema, und sie steht hier, weil sie sich
     * ausnahmsweise mechanisch pruefen laesst. „Heute geht es um" und
     * „ich zeige dir" sind keine Aufschlaege, sondern Ansagen — und die
     * zuverlaessigste Art, einen Zuschauer im Feed zu verlieren.
     */
    const ansagen = ['heute geht es um', 'in diesem video', 'ich zeige dir', 'wir schauen uns'];
    const erste = short.szenen[0];
    if (erste !== undefined) {
      const gesagt = erste.sprechtext.toLowerCase();
      const treffer = ansagen.find((a) => gesagt.includes(a));
      if (treffer !== undefined) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen', 0, 'sprechtext'],
          message: `Der Aufschlag sagt „${treffer}" — das kündigt an, statt zuzugreifen.`,
        });
      }
    }

    /* ── Genau eine Belegeinblendung, und sie trägt eine Quelle ──── */

    /*
     * Der Nachfolger der Belegszene. Zwei Einblendungen waeren zwei
     * Quellenangaben in zwanzig Sekunden: Das liest niemand, und es verraet,
     * dass der Fakt nicht traegt. Keine waere der Zustand vor dem 16.08.2026 —
     * der ganze Belegapparat im Video unsichtbar.
     */
    const mitHerausgeber = short.szenen
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => 'herausgeber' in s && s.herausgeber !== undefined);

    if (mitHerausgeber.length !== 1) {
      ctx.addIssue({
        code: 'custom',
        path: ['szenen'],
        message:
          mitHerausgeber.length === 0
            ? 'Kein Beleg im Bild. Jeder Short blendet genau einmal ein, wer die Aussage trägt.'
            : `${mitHerausgeber.length} Belegeinblendungen. Ein Fakt, eine Quelle, eine Nennung.`,
      });
    }

    mitHerausgeber.forEach(({ s, i }) => {
      const quelle = 'quelleId' in s ? s.quelleId : undefined;
      if (quelle === undefined) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen', i, 'herausgeber'],
          message: `Szene ${i + 1} blendet einen Herausgeber ein, hängt aber an keiner quelleId.`,
        });
      }
    });

    /* ── Belegpflicht nach Position ──────────────────────────────── */

    /*
     * Die Haelfte der Belegpflicht, die nicht an der Art haengt: Alles auf
     * `zuspitzung` und `kipppunkt` behauptet, egal in welcher Darstellung.
     * Vorher entschied allein die Art, und damit entschied die Wahl der
     * Darstellung darueber, ob ein Satz belegt sein musste.
     */
    short.szenen.forEach((szene, i) => {
      const brauchtQuelle = szene.position === 'zuspitzung' || szene.position === 'kipppunkt';
      const hatQuelle = 'quelleId' in szene && szene.quelleId !== undefined;
      if (brauchtQuelle && !hatQuelle) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen', i],
          message:
            `Szene ${i + 1} steht auf „${POSITIONEN[szene.position].titel}" und nennt keine Quelle. ` +
            `Dort liegt die Substanz des Videos.`,
        });
      }
    });

    /* ── Jede Aussage steht auf einer Quelle des Shorts ──────────── */

    const belegdecke = new Set(short.quellenIds);
    short.szenen.forEach((szene, i) => {
      if (!('quelleId' in szene) || szene.quelleId === undefined) return;
      if (!belegdecke.has(szene.quelleId)) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen', i, 'quelleId'],
          message: `Quelle „${szene.quelleId}" steht nicht in quellenIds dieses Shorts.`,
        });
      }
    });

    /* ── Wer eine Quelle nennt, nennt das Zitat ──────────────────── */

    /*
     * Der teuerste Fehler dieses Projekts hat hier gesessen, zweimal.
     *
     * Eine Szene zeigte bis zum 17.08.2026 auf eine **Quelle**, nicht auf ein
     * **Zitat**. Eine Quelle mit drei Fundstellen haengt aber an vier Szenen,
     * und jede erbt damit den Belegstatus der Quelle als Ganzes. So ging „Kein
     * Zufall. Ein Gremium hat das so festgelegt." gruen durch: Irgendwo in der
     * Quelle stand ja etwas — nur eben ueber Leistungsklassen und nicht ueber
     * Absichten.
     *
     * Kein Schema, keine Zeichenkettensuche und kein zweites Modell haette das
     * gefunden, weil formal alles stimmte. Was es findet, ist diese Regel: Wer
     * eine Quelle nennt, muss die **Fundstelle** nennen. Die Frage „welcher
     * Satz traegt das?" faellt damit beim Schreiben an, nicht in der Freigabe —
     * und wo es keine Fundstelle gibt, gibt es beim Schreiben ein leeres Feld
     * statt in der Freigabe eine Diskussion.
     *
     * Dass die Fundstelle wirklich in **dieser** Quelle steht, prueft
     * `shortPruefen` in `src/pruefung.ts`: Dort liegt `quellen.json` vor, hier
     * nicht — das Schema laeuft auch im Browser, wenn Remotion
     * `daten/beispiel-short.ts` parst.
     */
    short.szenen.forEach((szene, i) => {
      const quelle = 'quelleId' in szene ? szene.quelleId : undefined;
      const beleg = 'belegId' in szene ? szene.belegId : undefined;

      if (quelle !== undefined && beleg === undefined) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen', i, 'belegId'],
          message:
            `Szene ${i + 1} nennt die Quelle „${quelle}", aber keine Fundstelle darin. ` +
            `Welches Zitat trägt diesen Satz?`,
        });
      }
      if (beleg !== undefined && quelle === undefined) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen', i, 'quelleId'],
          message: `Szene ${i + 1} nennt die Fundstelle „${beleg}", aber keine Quelle.`,
        });
      }
    });

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
 * Ein Wochenlauf: sieben Shorts, einer je Format und Wochentag.
 *
 * Sieben, weil die Woche sieben Tage hat — nicht, weil ein Thema sieben
 * hergibt. Jeder Short bringt seinen eigenen Fakt und seine eigene Quelle
 * mit. Der Engpass ist damit nicht die Produktion, sondern der Beleg: sieben
 * abgerufene, woertlich zitierte Seiten je Woche, und das ist der einzige
 * Schritt, den keine Struktur verkuerzt.
 *
 * Die Empfehlung zaehlt nicht mit. Sie kommt, sobald Affiliate-Links stehen,
 * als drei zusaetzliche Videos — dann sind es zehn.
 *
 * Achtung: Dieses Schema wird von **keinem Skript geparst**. Der Wochenlauf
 * validiert Shorts einzeln. Laufweite Regeln — jedes Format genau einmal,
 * kein Sachgebiet oefter als zweimal — stehen deshalb in `laufweiteBefunde`,
 * weil das tatsaechlich ausgefuehrt wird. Eine Regel hier waere tote Regel.
 */
export const Lauf = z.object({
  id: z.string(),
  erstelltAm: z.string(),
  shorts: z.array(Short).length(8),
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
    format: Format,
    sachgebiet: Sachgebiet,
    reifegrad: Reifegrad,

    /**
     * Die Sache, so wie man sie am Tisch erzaehlen wuerde.
     *
     * Hiess bis zum 17.08.2026 `kernfrage` — „die Frage des Zuschauers, in
     * seinen Worten". Das Feld hat die Suchanfragen produziert, die den ersten
     * Wochenlauf ruiniert haben: Wer eine Frage notiert, baut eine Antwort,
     * und eine Antwort ist ein Erklaervideo. Im Feed stellt niemand eine
     * Frage.
     *
     * Der Pruefstein steht jetzt im Feldnamen: **Erzaehlt das jemand
     * freiwillig weiter?** Kein Titel, keine Frage, kein Problem — ein Satz,
     * den man sagen wuerde.
     */
    erzaehlt: z.string(),
    /**
     * Der Dreh — was das Video mit der Frage macht.
     *
     * Hiess bis zum 16.08.2026 `entwarnung`, weil der Hebel damals immer
     * dieselbe Bewegung war: „Dein Monitor ist nicht kaputt." Mit sieben
     * Formaten gibt es sieben Drehungen — der Freispruch ist nur noch eine
     * davon, neben dem Maerchen, der verbrannten Ausgabe und dem Staunfakt.
     */
    dreh: z.string(),
    /**
     * Die Tatsache, die die Entwarnung traegt. Ein Satz, pruefbar.
     * Traegt der Belegpfad diesen Satz nicht, faellt die Idee — nicht der
     * Satz wird weichgespuelt.
     */
    sache: z.string(),

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
    if (i.reifegrad === 'belegt' && i.quellenIds.length < 1) {
      ctx.addIssue({
        code: 'custom',
        path: ['quellenIds'],
        message:
          `Idee „${i.id}" steht auf „belegt", nennt aber keine Quelle. ` +
          `Belegt heisst: abgerufene Seite mit woertlichem Zitat, sofort ` +
          `produzierbar.`,
      });
    }
  });
export type Idee = z.infer<typeof Idee>;

/**
 * Eine Idee, die als Short nicht traegt — Stoff fuer lange Videos.
 *
 * Angelegt am 16.08.2026 beim Umbau auf sieben Formate. Sechzehn der
 * siebenundsiebzig Ideen im Vorrat scheitern an den zwei neuen Pruefsteinen:
 * Sie brauchen eine **Vorgeschichte** (elf Diagnosen — „mein Dock laedt, aber
 * kein Bild") oder verlangen eine **Handlung** (Selbsttest, Notloesung,
 * Reihenfolge). Beides ist im Feed toedlich und im langen Video normal.
 *
 * Der Typ hat bewusst **kein `format`** und **keinen `reifegrad`**: Beide
 * gehoeren zur Short-Produktion. Was bleibt, ist der teure Teil — die
 * Kernfrage und der `belegpfad`, also die Instanz, die die Aussage tragen
 * koennte. Den wegzuwerfen, nur weil das Ausspielformat wechselt, waere die
 * Sorte Verlust, die man erst in einem halben Jahr bemerkt.
 */
export const HauptvideoIdee = z.object({
  id: z.string(),
  /** Warum es kein Short ist. Pflicht, damit die Aussortierung nachvollziehbar bleibt. */
  warum: z.string(),
  sachgebiet: Sachgebiet,
  /*
   * Beim Hauptvideo bleibt die **Frage** stehen, wo sie beim Short der
   * erzaehlten Sache gewichen ist. Das ist kein vergessener Umbau, sondern der
   * Unterschied der Gattungen: Ein langes Video wird gesucht, ein Short laeuft
   * im Feed von selbst vorbei. Wer sucht, hat eine Frage.
   */
  kernfrage: z.string(),
  dreh: z.string(),
  sache: z.string(),
  belegpfad: z.array(Belegpfad).min(1),
  notiz: z.string().optional(),
});
export type HauptvideoIdee = z.infer<typeof HauptvideoIdee>;
