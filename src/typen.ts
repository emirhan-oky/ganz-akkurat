/**
 * Datenvertraege der Pipeline.
 *
 * Diese Schemata sind die Schnittstelle zwischen Skript-Engine und Renderer.
 * Was hier nicht validiert, wird nicht gerendert — so kann kein halbfertiges
 * oder unbelegtes Skript versehentlich in die Produktion laufen.
 */
import { z } from 'zod';
import { PosenName } from './figur';

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
   *
   * ## Warum die Grenze am 31.08.2026 von 180 auf 240 gestiegen ist
   *
   * Sie geriet mit der juengeren Regel aneinander: **Ein Zitat muss sein
   * Subjekt enthalten** (30.08.2026). Bei der EU-Reparaturrichtlinie stehen
   * Subjekt und Verneinung an den beiden Enden eines Satzes mit einer
   * Aufzaehlung dazwischen — „Die Hersteller behindern insbesondere die
   * Verwendung von … durch unabhaengige Reparaturbetriebe **nicht**". Wer
   * ihn auf 180 Zeichen kuerzt, schneidet die Verneinung ab, und das Fragment
   * sagt fuer sich gelesen **das Gegenteil**.
   *
   * Die 180 waren nie eine gemessene Bruchgrenze, sondern die Vorsicht nach
   * einem Fall, der an **Sonderzeichen** gescheitert ist und nicht an der
   * Laenge. Das 231-Zeichen-Zitat ist am 31.08.2026 im Volltext der Richtlinie
   * als Zeichenkette gefunden worden — gemessen, nicht angenommen.
   *
   * **Von zwei Regeln, die sich widersprechen, gewinnt die mit dem besseren
   * Grund.** Ein zu langes Zitat faellt bei `npm run quellen-pruefen` sofort
   * auf; ein zu kurzes wird still falsch, sobald die Seite umformuliert.
   * Kurz halten bleibt trotzdem die Empfehlung — 240 ist der Rand, nicht das
   * Ziel.
   */
  zitat: z.string().min(15).max(240),
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
 * eintragbar**. Vorher stand `presse` im Enum und war nur aus der damaligen
 * Menge `OFFIZIELLE_ARTEN` ausgenommen (am 20.08.2026 gestrichen, weil sie
 * nichts mehr pruefte) — eine Pressequelle durfte also in
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
 *
 * **`wissenschaft` ist am 20.08.2026 dazugekommen**, als die Nische von
 * Geraeten und Verbraucherrecht auf Technik allgemein verbreitert wurde. Der
 * Anlass ist eine Luecke, kein Wunsch: „Licht braucht 67 Millisekunden um die
 * Erde" belegt keine Behoerde und keine Norm. Ohne eine passende Art waere ein
 * grosser Teil der neuen Nische unbelegbar — und die Erfahrung dieses Projekts
 * sagt, was dann passiert: Die Regel wird nicht gebrochen, sie wird umgangen,
 * indem der Satz an eine Quelle gehaengt wird, die halb passt.
 *
 * Gemeint sind begutachtete Veroeffentlichungen, staatliche
 * Forschungsinstitute (PTB, Fraunhofer, NIST, ESA) und Normungsgremien
 * jenseits von `standard`. Sie erfuellt dasselbe Kriterium wie die drei
 * anderen unbeteiligten Arten: **kein wirtschaftliches Interesse am
 * Gegenstand.** Ein Institutsblog, der ein eigenes Produkt bewirbt, ist keine
 * Wissenschaft in diesem Sinn, sondern `hersteller`.
 *
 * `presse` bleibt draussen, `messung` bleibt draussen. Was sich nicht
 * ausdruecken laesst, laesst sich nicht brechen.
 */
export const QuellenArt = z.enum([
  'standard',
  'behoerde',
  'rechtsprechung',
  'wissenschaft',
  'hersteller',
  'plattform',
]);
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
export const UNBETEILIGTE_ARTEN = [
  'standard',
  'behoerde',
  'rechtsprechung',
  'wissenschaft',
] as const;

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

/* ──────────────────────────── Bauformen ────────────────────────────── */

/**
 * Wie ein Short gebaut ist — die Struktur, nicht der Inhalt.
 *
 * **Warum es die Ebene gibt.** Am 25.08.2026 wurde gemessen, was die Gattung
 * „faceless" als Standard fahrt: KI-Stimme, ein Erzaehler, wortweise animierte
 * Untertitel. Das war Wort fuer Wort unser Bau — wir waren nicht eigen,
 * sondern die Voreinstellung. Und dieselbe Gattung prueft YouTube seit Juli
 * 2025 auf Schablonenhaftigkeit, was Reichweite **und** Monetarisierung
 * kostet.
 *
 * Der Katalog ist die Antwort darauf, und er ist bewusst eine **Auswahl, aus
 * der gewaehlt werden muss**, keine Vorschrift: `laufweiteBefunde` meldet
 * dieselbe Bauform zweimal hintereinander und jede, die mehr als ein Drittel
 * eines Laufs stellt. Eine festlegende Matrix machte alle Videos einer Rubrik
 * identisch — eine ausschliessende laesst offen, was dazwischen passiert.
 *
 * **Die Figuren bleiben dabei konstant, die Bauformen wechseln.** Die
 * Zwei-Figuren-Gattung lebt anderswo von geborgter Wiedererkennung; unsere
 * muss erst entstehen, und sie entsteht am Charakter, nicht an der Struktur.
 * Die Regel gegen Schablonen zielt deshalb nie auf Volti und Watti.
 *
 * Fuenf bis sieben sind das Ziel — fuenf ist das Minimum, bei dem die
 * Drittelregel bei sieben Videos je Woche ueberhaupt etwas zu sagen hat.
 */
export const Bauform = z.enum(['wechselrede', 'zitatkarte', 'stationen']);
export type Bauform = z.infer<typeof Bauform>;

/**
 * Was jede Bauform tut — und **wie lang sie sein will**.
 *
 * `zielSek` ist die wichtigste Zahl hier, und sie ist neu. Bis zum 25.08.2026
 * gab es **einen** Zielwert fuer alle Shorts, und der stand nur im Kommentar;
 * geprueft wurde allein das Fenster. Beides war falsch:
 *
 * - **Ein Zielwert fuer alle Bauformen ist der eigentliche Fehler**, nicht
 *   seine Hoehe. Vier Stationen brauchen mehr Zeit als ein Wortwechsel, weil
 *   sie mehr Inhalt haben. „Laenge ist keine Ursache, sondern eine Folge
 *   davon, wie viel es zu zeigen gibt" — der Satz stand schon im Vertrag, die
 *   Folgerung fehlte.
 * - **Ein Zielwert, der nur im Kommentar steht, ist keine Wache.** Mit dem
 *   Fenster auf 20–65 s liefe eine Wechselrede von 60 Sekunden stumm durch.
 *   `shortPruefen` meldet deshalb einen Hinweis, sobald ein Short mehr als ein
 *   Fuenftel vom Zielwert seiner Bauform abweicht.
 */
/*
 * ## Drei Zielwerte, und sie sind ein Versuchsaufbau
 *
 * **45 / 52 / 62 seit dem 31.08.2026.** Wer sie liest, muss wissen: Sie sind
 * nicht gemessen. Gemessen ist bisher **eine einzige Laenge** — alle neun
 * veroeffentlichten Videos sind 20 bis 23 Sekunden lang, und zu allem darueber
 * gibt es keine eigene Zahl.
 *
 * ## Warum sie schon wieder wandern
 *
 * Am 26.08. standen sie auf 25 / 35 / 45 / 60, davor auf 30 / 35 / 35 / 55.
 * Der erste Umbau spreizte sie, weil drei von vier in dieselbe Laengenklasse
 * fielen und ein Versuch ueber Laengen so nicht moeglich war.
 *
 * Der zweite hatte einen anderen Grund: Am 31.08. ist das harte Fenster auf
 * **42 bis 67 Sekunden** gestiegen, und damit lagen **drei von vier
 * Zielwerten unter der Untergrenze.** Eine Wechselrede konnte ihr eigenes Ziel
 * nicht treffen, ohne durchzufallen — ein Zielwert, der den eigenen Short
 * ungueltig macht, ist keine Vorgabe, sondern eine Falle.
 *
 * ## `einstimmig` ist gestrichen
 *
 * Er stand hier mit einer guten Begruendung: **Was keinen Namen hat, kann
 * keine Regel begrenzen.** Ein Erzaehler, wortweise Untertitel — die
 * Voreinstellung der ganzen „faceless"-Gattung, und ihn zu benennen setzte ihn
 * unter dieselbe Drittelregel wie alles andere.
 *
 * Das Fenster hat die Begruendung ueberholt. Bei einer Untergrenze von 42
 * Sekunden ist der einstimmige Bau kein kurzer Sonderfall mehr, sondern ein
 * **Monolog von dreiviertel Minute** — genau der Bau, gegen den der ganze
 * Umbau laeuft. Die neun Videos in diesem Bau haben 2.212 Aufrufe, 0-mal
 * geteilt und 0 Abonnenten gebracht, und sie waren dabei halb so lang.
 *
 * **Eine Begrenzung, die den begrenzten Fall zugleich verschlimmert, ist keine
 * Begrenzung mehr.** Was bleibt, ist die alte Sorge: Ohne Namen laesst er sich
 * nicht verbieten. Er ist jetzt nicht mehr benannt, sondern **unmoeglich** —
 * `zweistimmigkeit` verlangt zwei Szenen mit beiden Stimmen, ohne Ausnahme.
 *
 * ## Was die Zahlen nicht sind
 *
 * Die einzige fremde Messung (`@dr_data_dr`, zwoelf Shorts, 48–67 s, Median
 * 61) haette hoehere Werte nahegelegt; eine geratene Zahl durch eine
 * uebertragene zu ersetzen, macht sie aber nicht gemessen — der Kanal ist
 * englisch, einstimmig und hat ein Publikum, das wir nicht haben.
 *
 * **Diese Zahlen fallen, sobald `npm run laengen` zwei belegte Klassen zeigt.**
 */
export const BAUFORMEN: Record<Bauform, { titel: string; tut: string; zielSek: number }> = {
  wechselrede: {
    titel: 'Wechselrede',
    tut: 'Einer traegt den Beleg, der andere reagiert. Vier Runden, dichter Sprecherwechsel.',
    zielSek: 45,
  },
  zitatkarte: {
    titel: 'Zitatkarte',
    tut: 'Das Zitat steht als Karte im Bild, beide unterhalten sich darueber.',
    zielSek: 52,
  },
  stationen: {
    titel: 'Stationen',
    tut: 'Vier bis fuenf Stationen, steigend, dann die Landung. Die Stationen sind Zuspitzungen, die letzte ist der Kipppunkt.',
    zielSek: 62,
  },
};

/* ─────────────────────────── Zwei Stimmen ──────────────────────────── */

/**
 * Wer spricht. Zwei Figuren seit dem 25.08.2026.
 *
 * Die Rollen sind fest, die **Besetzung nicht**: In jedem Wortwechsel traegt
 * genau einer die belegte Aussage und der andere reagiert, aber wer von beiden
 * das ist, wechselt zwischen und innerhalb von Videos. Feste Rollen an festen
 * Figuren waeren nach vier Videos wieder eine Schablone — aus dem Nachleser
 * wuerde ein Moderator und aus dem Zeiger ein Requisit.
 *
 * Die Bezeichner hier sind intern; im Bild und im Sprechtext stehen die Namen.
 */
export const Sprecher = z.enum(['nachleser', 'zeiger']);

/**
 * Die Namen der beiden Figuren, seit dem 25.08.2026.
 *
 * Nicht Zierde: Die Zwei-Figuren-Gattung lebt anderswo von **geborgter**
 * Wiedererkennung — man bleibt haengen, weil man eine bekannte Stimme hoert.
 * Unsere Akkus kennt niemand, und ueber eine namenlose Figur kann auch niemand
 * reden. Ein Name ist das billigste Wiedererkennungsmittel, das es gibt.
 *
 * **Wattis Ausruf ist „Watt?"** — norddeutsch fuer „Was?". Er sagt bei jeder
 * Verwirrung fast seinen eigenen Namen; der Witz erklaert sich von selbst und
 * nutzt sich nicht ab, weil er nie ausgesprochen wird.
 */
export const FIGURENNAMEN: Record<Sprecher, string> = {
  nachleser: 'Volti',
  zeiger: 'Watti',
};
export type Sprecher = z.infer<typeof Sprecher>;

/**
 * Was ein Redezug im Gespraech **tut** — die zweite Achse neben der Machart.
 *
 * ## Warum es sie gibt
 *
 * Am 31.08.2026 lag der erste vertonte Short im neuen Bau vor, und das Urteil
 * war eindeutig: „Die beiden fuehren einfach kein Gespraech miteinander. Volti
 * erklaert irgendwas und Watti gibt einfach dumme Kommentare ab."
 *
 * Die Ursache stand hier im Schema. `REAKTIONS_MACHARTEN` kennt Gestaendnis,
 * falschen Schluss, Bild, Ratlosigkeit, Empoerung, Rueckfrage — und **keine
 * einzige Beziehung zum Vorredner**. Ein Redeanteil konnte gar nicht auf einen
 * anderen zeigen, also konnte kein Entwurf es tun und keine Pruefung sein
 * Fehlen melden.
 *
 * ## Machart und Zug sind zwei Achsen, nicht eine
 *
 * Die Machart beantwortet **„was fuegt diese Zeile dem Fakt hinzu?"**, der Zug
 * **„was tut diese Zeile dem anderen an?"**. „Ich bin bei Passwort7." ist ein
 * tadelloses Gestaendnis **und** geht am Vorredner vorbei — beides ist
 * gleichzeitig wahr, weil die Fragen verschieden sind.
 *
 * Deshalb steht hier kein Eintrag, der eine Machart nachbaut: kein
 * `bebildern`, kein `sich-verraten`, kein `ratlos-werden`. Zwei Felder, die
 * beinahe dasselbe sagen, sind die Doppelung ohne Wache — der Fehler, den
 * dieses Projekt am haeufigsten teuer bezahlt hat.
 *
 * **Der Nebengewinn ist der entscheidende:** `regieVorrat` und `syntheseText`
 * haengen weiter an der Machart und bleiben unberuehrt. Die geplante Blindwahl
 * fuer die Regieanweisungen bleibt gueltig.
 *
 * ## `abbiegen` ist der wichtigste Eintrag
 *
 * Es ist der Zug, der das erste Video ruiniert hat: am Gesagten vorbei. Er
 * steht trotzdem im Vorrat, und zwar aus dem Satz, der einmal `einstimmig` in
 * `BAUFORMEN` gehalten hat — **was keinen Namen hat, kann keine Regel
 * begrenzen.** Dort war die Begruendung an der falschen Sache; hier traegt
 * sie: `abbiegen` darf hoechstens einmal je Short vorkommen, und das laesst
 * sich nur zaehlen, weil es heisst, wie es heisst.
 */
export const Zug = z.enum([
  'behaupten',
  'nachlegen',
  'beantworten',
  'richtigstellen',
  'gegenbeispiel',
  'einschraenken',
  'widersprechen',
  'nachhaken',
  'umdeuten',
  'einlenken',
  'zuspitzen',
  'abbiegen',
]);
export type Zug = z.infer<typeof Zug>;

/** Was ein Zug offenlaesst und was er schliesst. */
type Offenheit = 'konter' | 'antwort';

export const ZUGARTEN: Record<
  Zug,
  {
    name: string;
    tut: string;
    achtung: string;
    beispiele: readonly string[];
    /**
     * Ob der Zug etwas ueber die Welt behauptet.
     *
     * **Traegt seit dem 01.09.2026 die Belegpflicht**, die vorher an
     * `machart !== undefined` hing. Das ist keine Umbenennung, sondern eine
     * Verschaerfung: Eine quellenlose Zeile **ohne** Machart entkam der Sperre
     * bisher vollstaendig, und drei solche Zeilen stehen in
     * `ersatzteil-freischalten`.
     */
    behauptet: boolean;
    /** Was der Zug offenlaesst. Der naechste Zug der **anderen** Figur schliesst es. */
    verlangt?: Offenheit;
    /** Welche offene Pflicht dieser Zug schliesst. Leer heisst: er schliesst keine. */
    schliesst: readonly Offenheit[];
    /**
     * Wie die Figur dabei steht: 1 richtet auf, −1 laesst einsinken, 0 ist die
     * Ruhelage.
     *
     * **Gemessen am 01.09.2026, nicht gegriffen.** Eine `Haltungsprobe` in
     * voller Formatgroesse hat die vier Fassungen gegeneinandergestellt: Die
     * Streckung des Koerpers um die Standlinie bewegt die Oberkante um **16
     * Pixel von 1920**, die Fuesse bleiben dabei stehen (1 Pixel, Rundung).
     * Meine Vorabrechnung hatte 7,5 gesagt und lag um die Haelfte daneben —
     * sie ging von der Gehaeusehoehe 84 aus, waehrend die Streckung auf den
     * Abstand vom Pivot bei y = 138 bis zur Oberkante wirkt, und das sind
     * rund 108.
     *
     * **Bewusst nur an vier Zuegen.** Wer jedem Zug eine Haltung gibt, bekommt
     * keine Koerpersprache, sondern eine zappelnde Figur — dieselbe
     * Ueberlegung, aus der der Ausruf einen Vorrat hat und keinen festen
     * Marker. Die vier sind die, bei denen die Haltung im Wort schon steckt.
     *
     * Der Weg ins Bild laeuft ueber `abschnitte[].zug` und `Sprecherstand`,
     * **nicht** ueber ein Posenfeld: Der Zug wechselt je Redeanteil, die Pose
     * nur einmal je Szene. Ein Posenfeld haette den Wert nie zu sehen
     * bekommen.
     */
    aufrichtung?: number;
  }
> = {
  behaupten: {
    name: 'Behaupten',
    tut: 'Stellt den Fakt hin. Der Zug, der ein Gespraech eroeffnet.',
    achtung: 'Ein Short aus lauter Behauptungen ist ein Vortrag zu zweit — siehe die Anschlussquote.',
    beispiele: ['Beim BSI steht: Ein Wechsel nach Plan erhoeht die Sicherheit nicht automatisch.'],
    behauptet: true,
    schliesst: [],
  },
  nachlegen: {
    name: 'Nachlegen',
    tut: 'Legt in derselben Richtung nach. Macht es schlimmer, nicht anders.',
    achtung: 'Nicht dasselbe zweimal. Wer nachlegt, bringt eine zweite Tatsache, keine zweite Formulierung.',
    beispiele: ['Und die Liste gilt erst ab Juli 2026.'],
    behauptet: true,
    schliesst: [],
  },
  beantworten: {
    name: 'Beantworten',
    tut: 'Beantwortet, was gefragt wurde.',
    achtung: 'Die Antwort muss die Frage treffen. Wer daneben antwortet, biegt ab — und das ist ein anderer Zug.',
    beispiele: ['Wechseln sollst du, wenn es einen Hinweis gibt.'],
    behauptet: true,
    schliesst: ['antwort'],
  },
  richtigstellen: {
    name: 'Richtigstellen',
    tut: 'Sagt, was am Gesagten falsch war.',
    achtung: 'Richtigstellen heisst widerlegen, nicht wiederholen. Ohne neuen Inhalt ist es ein Nachlegen.',
    beispiele: ['Nicht der Kalender entscheidet, sondern der Verdacht.'],
    behauptet: true,
    schliesst: ['konter', 'antwort'],
    aufrichtung: 1,
  },
  gegenbeispiel: {
    name: 'Gegenbeispiel',
    tut: 'Haelt einen Fall dagegen, statt zu widersprechen. Ein Beispiel schlaegt ein Argument.',
    achtung: 'Der Fall muss belegt sein — er behauptet etwas ueber die Welt.',
    beispiele: ['Auf der ISS liefen 2009 Laptops, die aelter als fuenf Jahre waren.'],
    behauptet: true,
    schliesst: ['konter'],
  },
  einschraenken: {
    name: 'Einschraenken',
    tut: 'Nimmt zurueck: nicht immer, nur wenn.',
    achtung:
      'Der haeufigste Ort fuer eine stille Ueberdehnung in der Gegenrichtung — wer einschraenkt, muss die Grenze belegen koennen.',
    beispiele: ['Nur, wenn das Teil den Anforderungen entspricht.'],
    behauptet: true,
    schliesst: ['konter'],
  },
  widersprechen: {
    name: 'Widersprechen',
    tut: 'Bestreitet, was gerade gesagt wurde. Der Motor eines Streits.',
    achtung:
      'Er bestreitet, er behauptet nicht. „Das stimmt nicht, weil X" ist kein Widerspruch, sondern ein Gegenbeispiel — und dann belegpflichtig.',
    beispiele: ['Das hat sich doch jemand ausgedacht.'],
    behauptet: false,
    verlangt: 'konter',
    schliesst: [],
    aufrichtung: 1,
  },
  nachhaken: {
    name: 'Nachhaken',
    tut: 'Fragt nach dem, was offen blieb.',
    achtung: 'Eine echte Frage, keine rhetorische. Wer die Antwort mitliefert, hakt nicht nach.',
    beispiele: ['Kacke, was dann?', 'Sagt das eigentlich mal jemand mit Ahnung?'],
    behauptet: false,
    verlangt: 'antwort',
    schliesst: [],
    aufrichtung: -0.5,
  },
  umdeuten: {
    name: 'Umdeuten',
    tut: 'Greift ein Wort auf und dreht seine Bedeutung.',
    achtung:
      'Das aufgegriffene Wort muss wirklich in der Vorzeile stehen — `rueckbezug` prueft das nach. Ein behaupteter Anschluss ohne Deckung ist schlimmer als keiner.',
    beispiele: ['Jetzt spuere ich einen Verdacht auf meine Dummheit.', 'Konto? Meins ist der Generalschluessel.'],
    behauptet: false,
    schliesst: ['konter', 'antwort'],
  },
  einlenken: {
    name: 'Einlenken',
    tut: 'Gibt nach.',
    achtung: 'Widerwillig, nicht einsichtig. Wer freundlich einlenkt, beendet den Streit statt ihn aufzuloesen.',
    beispiele: ['Na super.', 'Also war das alles umsonst.'],
    behauptet: false,
    schliesst: ['konter'],
    aufrichtung: -1,
  },
  zuspitzen: {
    name: 'Zuspitzen',
    tut: 'Treibt weiter, ohne etwas zu behaupten.',
    achtung: 'Zuspitzen ist keine Steigerung derselben Zeile. Es muss eine Ecke weiter gehen, nicht lauter werden.',
    beispiele: ['Auch die Zahnbuerste?'],
    behauptet: false,
    schliesst: [],
  },
  abbiegen: {
    name: 'Abbiegen',
    tut: 'Geht am Gesagten vorbei. Der eine spricht, der andere ist woanders — und manchmal liegt genau darin der Witz.',
    achtung:
      'Der Zug, der das erste fertige Video ruiniert hat. Volti sprach Watti dreimal direkt an und bekam dreimal keine Antwort; jede Zeile fuer sich war witzig und bezog sich auf nichts. **Hoechstens einer je Short**, und nie mit einem Pronomen am Anfang: „Das …" behauptet einen Bezug, den dieser Zug gerade bestreitet.',
    beispiele: ['Ich bin bei Passwort7. Passwort8 kriegt ein Ausrufezeichen.'],
    behauptet: false,
    schliesst: [],
  },
};

/*
 * Typwache nach dem Vorbild von `_machartenDeckenSich`: Der Record oben muss
 * jeden Zug aus dem Enum kennen. Ohne sie faellt ein neuer Zug hier still
 * durch und wirft erst zur Laufzeit.
 */
const _zugartenDeckenSich: Record<Zug, unknown> = ZUGARTEN;
void _zugartenDeckenSich;

/**
 * Die Formsperre: Hier darf keine Tatsachenbehauptung stehen.
 *
 * Sie gilt fuer jede Zeile, die **ohne Quelle** gesprochen wird — die Reaktion
 * mit Machart und, seit dem 01.09.2026, Wattis Abspannzeile. Beide behaupten
 * nichts ueber die Welt, und genau deshalb duerfen sie frech sein.
 *
 * **Nicht „keine Ziffer".** Der erste Anlauf verbot jede Ziffer und hat sofort
 * „Passwort7 ist meins" abgelehnt — eine Zeile, die als Beispiel in
 * `REAKTIONS_MACHARTEN` steht. Eine Ziffer ist keine Behauptung; eine
 * **Messgroesse** ist eine. Verboten sind deshalb Jahreszahlen und Zahlen mit
 * technischer Einheit, nicht die Ziffer als solche.
 *
 * **Zeitspannen bleiben erlaubt.** Der zweite Anlauf hatte „Jahre", „Monate"
 * und „Tage" in der Einheitenliste und lehnte damit „Wie? Ich mache das seit
 * 10 Jahren" ab — eine Zeile aus dem Eichmass. Eine Zeitspanne behauptet etwas
 * ueber den Sprecher, nicht ueber die Welt.
 *
 * **Sie steht als Funktion und nicht zweimal als Block.** Zwei Fassungen
 * derselben Sperre liefen beim ersten Umbau an den Einheiten auseinander, und
 * zwar lautlos — dieselbe Sorte Doppelung, gegen die hier ueberall eine Wache
 * steht.
 */
const ohneWeltbehauptung = (
  text: string,
  ctx: z.RefinementCtx,
  path: (string | number)[],
  was: string,
): void => {
  if (/\b(?:19|20)\d{2}\b/.test(text)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${was} nennt keine Jahreszahl — das wäre eine Aussage über die Welt.`,
      path,
    });
  }
  if (
    /\b\d+(?:[.,]\d+)?\s?(?:wh|wattstunden?|w|v|a|mah|gb|tb|mb|hz|khz|ghz|zoll|mbit|gbit|%|prozent|euro|€)\b/i.test(
      text,
    )
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${was} nennt keine Größe mit Einheit — das wäre ein Fakt ohne Beleg.`,
      path,
    });
  }
  const saetze = text.split(/[.!?]+/).filter((t) => t.trim().length > 0);
  if (saetze.length > 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${was} ist kurz. Höchstens zwei Sätze, meist einer.`,
      path,
    });
  }
};

/**
 * Ein Redeanteil — eine Figur, ein Satz.
 *
 * **Warum es die Reaktionszeile ueberhaupt gibt.** Die Belegpflicht zwingt
 * jeden Satz dicht ans Zitat, und dicht am Zitat heisst Amtssprache; neun
 * Videos lang war das Ergebnis „informativ, aber ohne Charakter". Eine
 * **Reaktion behauptet nichts ueber die Welt** und braucht deshalb keine
 * Quelle — genau dort darf der Kanal frech sein.
 *
 * Die Trennung liegt in der Rolle, nicht in einer Pruefung: Wer einen Zug
 * traegt, der **nichts behauptet**, darf keine Quelle nennen. Dieselbe Bauart
 * wie „`presse` fehlt im Enum" — was sich nicht ausdruecken laesst, laesst
 * sich nicht brechen.
 *
 * **Bis zum 01.09.2026 hing dieselbe Sperre an `machart`, und das war eine
 * Luecke.** Eine quellenlose Zeile ohne Machart entkam ihr vollstaendig — drei
 * solche Zeilen standen in `ersatzteil-freischalten`. Der Zug ist Pflicht, die
 * Machart nicht; eine Wache gehoert an das Feld, das immer da ist.
 *
 * **Die Formsperre daneben** faengt die eine Luecke, die bleibt: Eine Reaktion
 * koennte heimlich eine Tatsachenbehauptung sein. Keine Zahl, keine
 * Jahreszahl, hoechstens ein Satz — dann passt dort keine hinein. Der
 * `belegpruefer` liest zusaetzlich gegen, aber als zweite Instanz; eine Wache,
 * die ein Modell fragt, ist die schwaechere.
 */
export const Redeanteil = z
  .object({
    sprecher: Sprecher,
    text: z.string().min(1),
    /**
     * Was dieser Zug im Gespraech tut. Aus `ZUGARTEN`.
     *
     * **Pflicht seit dem 01.09.2026**, nachdem alle vier Entwuerfe umgestellt
     * waren — nach dem Muster von `belegId`, `weitererzaehlt` und
     * `suchbegriff`: **Die Frage faellt beim Schreiben an, nicht in der
     * Durchsicht.** Ein optionales Feld beantwortet die Frage „wem antwortet
     * diese Zeile?" genau dann nicht, wenn sie unbequem ist.
     */
    zug: Zug,
    /**
     * Ein **zusaetzlicher Beat vor dieser Zeile**, in Sekunden.
     *
     * `SPRECHERWECHSEL_SEK` steht auf 0,15 — kurz, und das ist richtig: „Ein
     * Wortwechsel ist eine Reaktion, und eine Reaktion kommt schnell." Manche
     * Reaktion braucht aber genau das Gegenteil. Nach einer Beschimpfung ist
     * die Verbluefftheit die Pointe, und 0,15 Sekunden sind dafuer zu wenig.
     *
     * **Gefunden am fertigen Video am 01.09.2026:** „Hier sagt Watti zu
     * schnell Watt." Die Konstante war nicht falsch, sie war nur die einzige.
     *
     * Der Beat entsteht als **Versatz im Schnitt**, nicht als Break-Tag im
     * Text — dieselbe Entscheidung wie beim Szenenschnitt: „Ein Break-Tag ist
     * eine Bitte an die Synthese, ein Versatz im Schnitt ist eine Tatsache."
     * Er kostet deshalb kein Kontingent und laesst sich ohne neue Vertonung
     * nachjustieren.
     *
     * **Er wirkt nur, wo ein Sprecherwechsel stattfindet.** Zwei Anteile
     * derselben Figur in derselben Szene gehen in einen Syntheseaufruf; dort
     * gibt es keine Naht, in die sich etwas legen liesse. `beatverlust` in
     * `src/pruefung.ts` meldet den Fall.
     */
    beatSek: z.number().min(0.1).max(1.5).optional(),
    /**
     * Nur an Reaktionszeilen. Aus `REAKTIONS_MACHARTEN` — der Entwurf muss
     * eine waehlen, statt in den zusammenfassenden Kommentar zu fallen.
     *
     * **Die zweite Achse neben `zug`**, nicht dieselbe: Diese sagt, was die
     * Zeile dem **Fakt** hinzufuegt, jene, was sie dem **anderen** antut.
     */
    machart: z
      .enum(['gestaendnis', 'falscherschluss', 'bild', 'ratlosigkeit', 'empoerung', 'rueckfrage'])
      .optional(),
    quelleId: z.string().min(1).optional(),
    belegId: z.string().min(1).optional(),
  })
  .superRefine((r, ctx) => {
    /*
     * **Keine Regieanweisung von Hand.** Sie haengt seit dem 26.08.2026 an der
     * Machart (`regie` in `REAKTIONS_MACHARTEN`) und wird beim Vertonen davor
     * gesetzt — im Text steht sie nie.
     *
     * Der Schaden waere still: `sprechtext` ist die Fassung, an der die Laenge
     * geschaetzt wird, und `ZEICHEN_PRO_SEKUNDE` haelt jedes Zeichen darin fuer
     * gesprochen. Zehn Zeichen Klammer sind knapp eine Sekunde Schaetzfehler je
     * Zeile — im Untertitel unsichtbar, weil `woerterAusAusrichtung` eckige
     * Klammern wegfiltert. Ein Fehler, den niemand sieht und niemand hoert.
     */
    if (/[[\]]/.test(r.text)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Keine eckigen Klammern im Sprechtext. Die Regieanweisung hängt an der ' +
          'Machart und wird beim Vertonen gesetzt.',
        path: ['text'],
      });
    }
    if (r.machart !== undefined && (r.quelleId !== undefined || r.belegId !== undefined)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Eine Reaktion nennt keine Quelle. Sie behauptet nichts über die Welt.',
        path: ['quelleId'],
      });
    }
    /*
     * **Die Wache ueber den zwei Achsen.** Eine Machart beschreibt, wie eine
     * Reaktion witzig ist; ein behauptender Zug traegt einen Fakt.
     * `richtigstellen` und `gestaendnis` schliessen einander aus.
     *
     * Ohne sie driften die beiden Felder auseinander wie `rede` und
     * `sprechtext` ohne ihre Gleichheitswache — jedes fuer sich gueltig, und
     * zusammen sagen sie zwei verschiedene Dinge ueber dieselbe Zeile.
     */
    if (r.zug !== undefined && r.machart !== undefined && ZUGARTEN[r.zug].behauptet) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          `„${ZUGARTEN[r.zug].name}" behauptet etwas über die Welt und trägt deshalb keine ` +
          'Machart. Die Machart gehört der Reaktion, nicht dem Beleg.',
        path: ['machart'],
      });
    }
    if ((r.quelleId === undefined) !== (r.belegId === undefined)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Wer eine Quelle nennt, nennt die Fundstelle darin — und umgekehrt.',
        path: ['belegId'],
      });
    }
    if (r.machart !== undefined) {
      ohneWeltbehauptung(r.text, ctx, ['text'], 'Eine Reaktion');
    }
  });
export type Redeanteil = z.infer<typeof Redeanteil>;

/* ────────────────────────────── Szenen ─────────────────────────────── */

/** Gemeinsame Felder jeder Szene. */
const SzeneBasis = z.object({
  /**
   * Was gesprochen wird. Die Szenenlaenge ergibt sich spaeter aus der
   * tatsaechlichen Sprechdauer, nicht aus einer geschaetzten Sekundenzahl.
   */
  sprechtext: z.string().min(1),
  /**
   * Die Aufteilung desselben Textes auf zwei Stimmen. Optional.
   *
   * **`sprechtext` bleibt die Fassung, die alle lesen** — Vertonung,
   * Untertitel, Sprechprobe, zwanzig Pruefstellen. `rede` sagt zusaetzlich,
   * wer welchen Teil spricht, und wird von Vertonung und Sprechblasen
   * gebraucht.
   *
   * Die Doppelung ist gewollt und hat hier ein Vorbild: `herausgeber` steht
   * ebenfalls an zwei Stellen, und `shortPruefen` prueft hart auf Gleichheit.
   * Der Grund ist derselbe — ein Umbau aller Lesestellen waere teurer als eine
   * Wache, und **eine Doppelung ohne Wache ist der eigentliche Fehler**, nicht
   * die Doppelung selbst. Geprueft wird im `superRefine` des Shorts: Die
   * verketteten `rede`-Texte muessen `sprechtext` ergeben.
   *
   * **Ein Anteil genuegt.** Der erste Anlauf verlangte zwei und lehnte damit
   * jede einstimmige Szene ab. Das Mindestmass an Zweistimmigkeit gilt je
   * **Short**, nicht je Szene — „immer beide" waere nach vier Videos wieder
   * die Schablone, gegen die der ganze Umbau laeuft.
   */
  rede: z.array(Redeanteil).min(1).optional(),
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
  /**
   * Die Nummer dieser Szene in einer sichtbaren Zaehlung. Die Kopfzeile zeigt
   * daraus „2 von 3"; die Gesamtzahl ist der hoechste Wert im Short und steht
   * nirgends noch einmal.
   *
   * ## Woher das kommt
   *
   * Am 20.08.2026 wurden zwoelf virale Tech-Shorts angesehen und vermessen.
   * **Drei der fuenf groessten bauen auf einer sichtbaren Zaehlung**: ein
   * Countdown von 5 auf 1 (14,8 Mio Aufrufe), zehn Blaetter nacheinander
   * (4,1 Mio), „SHOT 1 / SHOT 2 / SHOT 3" (5,7 Mio). Es ist eine offene
   * Schleife, die man **sieht** statt hoert — wer bei 5 einsteigt, will die 1.
   *
   * ## Warum nur eine Zahl und kein Listenformat
   *
   * Der naheliegende Schluss waere ein fuenftes Format „Drei Dinge ueber X".
   * Das waere ein Rueckfall: `endkarte` ist am 17.08.2026 gestrichen worden,
   * weil ihr Schema `punkte: min(2).max(4)` erzwang und **eine Liste keine
   * Pointe sein kann**. Die Begruendung gilt weiter.
   *
   * Was die zwoelf Videos zeigen, ist aber nicht die Liste, sondern die
   * **Anzeige** der Liste. Der Motor ist die Zahl im Bild, nicht der
   * Listeninhalt. Deshalb steht hier eine Zahl an der Szene und nicht eine
   * Punkteliste am Short: Der Short bleibt ein Gedanke mit vier Positionen,
   * und darueber laeuft eine Zaehlung mit.
   *
   * ## Bewusst optional
   *
   * Eine Zaehlung in jedem Short ist keine Schleife mehr, sondern eine
   * Schablone — und die Retention-Ladder (`youtube-shorts`) nennt geklonte
   * Machart ausdruecklich als Grund fuer Unterdrueckung. Dasselbe Argument,
   * das den Wochentag gekostet hat.
   */
  zaehlung: z.number().int().min(1).max(9).optional(),
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
  /* Zwei dazu am 24.08.2026 mit dem ersten Raumfahrt-Short. */
  'satellit',
  'chip',
]);
export type KontextArt = z.infer<typeof KontextArt>;

/**
 * Die Buehne einer Szene — was im Bild **passiert**, nicht was darin steht.
 *
 * ## Der Befund dahinter
 *
 * Am 20.08.2026 wurden zwoelf virale Tech-Shorts angesehen. **Neun von zwoelf
 * leben davon, dass etwas Echtes vorgefuehrt wird**: ein Geraet in der Hand,
 * eine Bildschirmaufnahme, ein Auto vor Ort. Das ist der Motor, nicht der
 * Text.
 *
 * Wir haben nichts vorzufuehren — wir zeichnen, und eine Zeichnung fuehrt
 * nichts vor, sie behauptet. Bildschirmaufnahmen waeren die naheliegende
 * Abkuerzung und haengen an keiner `quelleId`; dasselbe Argument wie bei
 * Herstellerfootage. **Also muss die Zeichnung selbst vorfuehren.**
 *
 * ## Die Regel, und warum sie sich pruefen laesst
 *
 * > Eine Buehne zeigt einen **Vorgang**, keinen Zustand. Zwischen erstem und
 * > letztem Bild einer Szene muss sich etwas ereignet haben.
 *
 * Das klingt nach einer Regel, die kein Skript pruefen kann — und ist es
 * nicht: Bei `figur` muessen `von` und `nach` verschieden sein. Eine Buehne,
 * die anfaengt und endet wie sie anfing, wird abgelehnt. Damit steht die Regel
 * im Schema und nicht in einem Kommentar, den man beim Schreiben nicht liest.
 *
 * ## Warum das `symbol` daneben bleibt
 *
 * `symbol` zeichnet einen Gegenstand unter den Satz und ist damit genau die
 * **Bebilderung**, von der der Befund wegfuehrt. Es faellt trotzdem nicht
 * sofort weg: Es traegt die sieben bestehenden Shorts, und ein Feld zu
 * streichen, bevor sein Nachfolger an einem fertigen Video gemessen wurde,
 * ist derselbe Fehler wie eine geratene Konstante. Die Entscheidung faellt in
 * Stufe 4.
 */
const Buehnenbild = z.discriminatedUnion('art', [
  z.object({
    art: z.literal('figur'),
    /**
     * Die Haltung am Anfang und am Ende der Szene. **Sie muessen verschieden
     * sein** — das ist die Vorgangsregel in Schemaform.
     */
    /**
     * Wessen Haltungen `von`, `zwischen` und `nach` beschreiben.
     *
     * **Die Rollen sind fest, die Besetzung nicht.** In jedem Wortwechsel
     * traegt genau einer den Beleg und der andere reagiert — wer von beiden
     * das ist, darf wechseln. Ohne dieses Feld waere Volti immer links und
     * immer der Erklaerende, und nach vier Videos waere aus ihm ein Moderator
     * und aus Watti ein Requisit geworden.
     *
     * Fehlt das Feld, gilt `nachleser` — der haeufigere Fall, und `optional`
     * statt `default`, weil `z.default` das Feld im abgeleiteten Typ trotzdem
     * zur Pflicht macht und damit jeden bestehenden Entwurf braeche.
     */
    wer: Sprecher.optional(),
    von: PosenName,
    nach: PosenName,
    /**
     * Haltungen **zwischen** `von` und `nach`. Hoechstens zwei, also insgesamt
     * zwei bis vier Stationen je Szene.
     *
     * **Das ist die Antwort auf einen Zuschauersatz, der seit dem 23.08.2026
     * im Code steht:** „Er macht staendig immer nur dieselben Bewegungen."
     * Damals wurde das Posenvokabular von sechs auf zehn erweitert — das
     * behandelt die **Anzahl**, nicht die **Folge**. Eine Szene kannte genau
     * einen Uebergang, und ein Uebergang je Szene sieht bei jedem Video gleich
     * aus, egal aus wie vielen Posen er gewaehlt wird.
     *
     * Zwei benachbarte Stationen muessen verschieden sein — dieselbe
     * Vorgangsregel wie bei `von` und `nach`, nur ueber die ganze Kette. Sonst
     * entstuende eine Folge, die zwischendurch stehenbleibt und damit genau
     * das Gegenteil dessen tut, wofuer sie da ist.
     */
    zwischen: z.array(PosenName).max(2).optional(),
    /**
     * Die **zweite Figur**. `wer` sagt, welches Rig die Posen oben traegt;
     * `gegenueber` bekommt automatisch das andere.
     *
     * **Warum es sie gibt.** Neun Videos haben 0 Abonnenten gebracht. Man
     * abonniert Leute, keine Fakten, und zwei stumme Maskottchen sind kein
     * Grund wiederzukommen. Die Zwei-Figuren-Gattung lebt anderswo von
     * **geborgter** Wiedererkennung — unsere muss erst entstehen, und sie
     * entsteht daran, dass zwei Figuren miteinander reden statt nebeneinander
     * zu stehen.
     *
     * Ohne dieses Feld bleibt die Buehne einfigurig. Das ist kein Mangel: Eine
     * Szene, die nur den Beleg traegt, braucht kein Gegenueber, und
     * „immer beide" waere nach vier Videos wieder die Schablone.
     */
    gegenueber: z
      .object({
        von: PosenName,
        nach: PosenName,
        zwischen: z.array(PosenName).max(2).optional(),
      })
      .optional(),
    /**
     * Was die Figur dabei anschaut oder haelt. Erscheint zur Szenenmitte, statt
     * von Anfang an dazustehen: Ein Gegenstand, der auftaucht, ist ein
     * Ereignis; einer, der schon da war, ist Kulisse.
     */
    /*
     * `stab` ist am 24.08.2026 gestrichen worden. Der Zeigestab war als
     * Lehrergeste gedacht und sah im fertigen Video wie ein Fremdkoerper aus —
     * eine Figur ohne Haende, die einen Stock haelt. `blatt` bleibt: Es liegt
     * zwischen beiden Haenden und ist die Pose des Kanalspruchs.
     */
    requisite: KontextArt.or(z.literal('blatt')).optional(),
    /**
     * Wo die Figur steht.
     *
     * Bis zum 23.08.2026 stand sie immer an derselben Stelle, und der Befund
     * dazu kam vom Zuschauer: „Kann der Avatar nicht auch die Position
     * wechseln?" Acht Videos hintereinander mit derselben Figur an derselben
     * Stelle sehen aus wie achtmal dasselbe Video.
     *
     * `klein` ist der Fall, der den Platz unten nutzt: Die Figur steht
     * verkleinert am unteren Rand und sieht nach oben. Sie gehoert zur Pose
     * `hochschauen` — eine kleine Figur, die geradeaus schaut, wirkt nicht
     * klein, sondern weit weg.
     */
    stand: z.enum(['mitte', 'links', 'rechts', 'klein']).optional(),
  }),
  z.object({
    /**
     * Zwei Zustaende uebereinander, je ein Etikett. Aus dem kuerzesten Video
     * der Sammlung: DJI zeigt in **sieben Sekunden** oben „AMATEUR" und unten
     * „PRO", denselben Vorgang gleichzeitig — 1,75 Mio Aufrufe, kein
     * gesprochenes Wort, kein Satz im Bild.
     *
     * Fuer `eswareinmal` (frueher/heute) und `werhatrecht` (zwei Lager) ist
     * das die fertige Bildsprache. Der Vorgang liegt hier nicht in der Figur,
     * sondern im **Vergleich**: Das Auge wandert von oben nach unten und
     * findet den Unterschied selbst.
     */
    art: z.literal('gegenueber'),
    oben: z.object({ etikett: z.string().min(1).max(14), symbol: KontextArt }),
    unten: z.object({ etikett: z.string().min(1).max(14), symbol: KontextArt }),
    /**
     * Die Figur steht mit im Bild und zeigt auf den Vergleich.
     *
     * Standard, seit der erste Satz Videos fertig war: Ohne sie verschwand der
     * Avatar mitten im Video fuer eine ganze Szene und kam danach wieder — im
     * Feed liest sich das nicht als Bildwechsel, sondern als anderes Video.
     *
     * Sie steht klein links unten und zeigt mit dem Stab nach oben. Der Platz
     * dort ist ohnehin frei: Die beiden Haelften brauchen die Mitte, die
     * Etiketten die linke obere Ecke jeder Haelfte.
     *
     * Abschaltbar, weil es Vergleiche gibt, die fuer sich stehen — zwei
     * Zustaende und ein Etikett je Haelfte sind schon ein volles Bild.
     */
    mitFigur: z.boolean().optional(),
  }),
]).superRefine((buehne, ctx) => {
  /*
   * Die Vorgangsregel, so weit ein Schema sie fassen kann.
   *
   * Sie prueft nicht, ob der Vorgang zum Satz passt — das kann kein Skript.
   * Sie prueft den Fall, in dem gar keiner stattfindet, und das ist der Fall,
   * der beim Schreiben tatsaechlich auftritt: zweimal dieselbe Pose
   * hinschreiben, weil die Szene kurz ist und die Haltung schon stimmt.
   */
  if (buehne.art === 'figur') {
    /*
     * Geprueft wird die **ganze Kette**, nicht nur ihre Enden. Mit
     * `zwischen` kann eine Folge zwischendurch stehenbleiben — `ruhe`,
     * `ruhe`, `zeigen` faengt und endet verschieden und haelt trotzdem in der
     * Mitte an. Das ist genau der Zustand, den die Vorgangsregel verbietet,
     * nur eine Ebene tiefer.
     */
    const kette = [buehne.von, ...(buehne.zwischen ?? []), buehne.nach];
    for (let i = 1; i < kette.length; i += 1) {
      if (kette[i] === kette[i - 1]) {
        ctx.addIssue({
          code: 'custom',
          path: kette.length === 2 ? ['nach'] : ['zwischen'],
          message: `Buehne zeigt zweimal „${kette[i]}" hintereinander — ein Zustand, kein Vorgang.`,
        });
        break;
      }
    }
  }

  /*
   * Ein Symbol steht fest in der rechten Buehnenhaelfte. `stand: 'rechts'`
   * setzt die Figur auf dieselbe Stelle, und im fertigen Video vom 24.08.2026
   * lag der Stempel hinter ihr — verdeckt von Rumpf und Beinen.
   *
   * Der Renderer biegt den Fall inzwischen um, aber das ist das
   * Sicherheitsnetz und nicht die Regel: Eine stille Korrektur heisst, dass
   * die Buehne etwas anderes zeigt als das, was hier steht. Besser faellt es
   * beim Schreiben auf. `blatt` und `stab` sind ausgenommen — sie liegen in
   * der Hand der Figur und nicht neben ihr.
   */
  /*
   * Dieselbe Ueberlagerung eine Ebene weiter: **zwei Figuren und ein Symbol
   * passen nicht nebeneinander.**
   *
   * Im Wortwechsel steht die rechte Figur auf x = 158 (`WORTWECHSEL` in
   * `Buehnenbild.tsx`), ein Symbol daneben auf x = 152. Der Renderer zeichnet
   * beides, ohne zu murren — das Symbol laege also im Gehaeuse der rechten
   * Figur, und zwar seitenverkehrt, weil sie gespiegelt ist.
   *
   * `blatt` ist ausgenommen, und hier ist es mehr als eine Ausnahme: Es faehrt
   * als Requisite **in** der linken Figur mit, und die linke Figur ist die,
   * die vorliest. Der Nachleser mit Blatt in der Hand ist genau das Bild, das
   * die Szene meint.
   */
  if (
    buehne.art === 'figur' &&
    buehne.gegenueber !== undefined &&
    buehne.requisite !== undefined &&
    buehne.requisite !== 'blatt'
  ) {
    ctx.addIssue({
      code: 'custom',
      path: ['requisite'],
      message:
        `„${buehne.requisite}" steht auf x = 152, die zweite Figur auf x = 150 — ` +
        'das Symbol laege in ihr. Bei zwei Figuren traegt nur `blatt`.',
    });
  }

  if (
    buehne.art === 'figur' &&
    buehne.stand === 'rechts' &&
    buehne.requisite !== undefined &&
    buehne.requisite !== 'blatt'
  ) {
    ctx.addIssue({
      code: 'custom',
      path: ['stand'],
      message:
        `„${buehne.requisite}" steht rechts auf der Buehne — dort steht bei ` +
        `stand: 'rechts' auch die Figur. Nimm 'links', 'mitte' oder 'klein'.`,
    });
  }

  if (buehne.art === 'gegenueber' && buehne.oben.symbol === buehne.unten.symbol) {
    ctx.addIssue({
      code: 'custom',
      path: ['unten', 'symbol'],
      message: `Beide Haelften zeigen „${buehne.oben.symbol}" — der Vergleich hat nichts zu vergleichen.`,
    });
  }
});

export type Buehnenbild = z.infer<typeof Buehnenbild>;

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
  buehne: Buehnenbild.optional(),
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
/*
 * **`text` und `hervorhebung` sind am 01.09.2026 gestrichen.**
 *
 * Der grosse Satz ueber den Figuren war eine Doppelung: Bei zwei Stimmen
 * traegt die Sprechblase den gesprochenen Satz Wort fuer Wort, waehrend oben
 * ein zweiter, anderer stand. Der Zuschauer las zweimal — „das Geschriebene
 * oben macht sowieso keinen Sinn".
 *
 * An seine Stelle tritt kein besserer Text, sondern ein **Ort**: die Kulisse
 * in `video/bausteine/Kulisse.tsx`. Und sie braucht die Flaeche, die der Satz
 * belegte — im ersten Standbild mit beidem lag „Oft schwache Passwoerter."
 * quer ueber Fenster und Bilderwand.
 *
 * **Der Nebengewinn ist die Standlinie.** Der Text drueckte die Buehne nach
 * unten, und damit wanderte sie je nach Textlaenge; die Kulisse rechnet ihre
 * Bodenkante aber aus einer festen Zahl. Ohne Text stehen die Figuren wieder
 * dort, wo der Boden ist.
 *
 * Die Szenenart heisst weiter `text`, obwohl sie keinen mehr traegt: Sie ist
 * die Art **ohne** besondere Darstellung — die schlichte Szene, in der zwei
 * Figuren reden. Umzubenennen hiesse, alle vier Entwuerfe und den Renderer
 * anzufassen, ohne dass sich etwas aendert.
 */
const SzeneText = SzeneBasis.extend({
  art: z.literal('text'),
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
 * Die Zitatkarte — das Zitat **steht** im Bild, statt zitiert zu werden.
 *
 * ## Warum es sie gibt
 *
 * Der Belegapparat ist das Einzige, was diesen Kanal von hundert anderen mit
 * derselben Verpackung unterscheidet — und er war neun Videos lang eine
 * **dünne graue Zeile** unter der Kopfzeile. Am 16.08.2026 wurde die eigene
 * Belegszene gestrichen, weil sie zweieinhalb Sekunden Standbild kostete und
 * dort sass, wo die Pointe hingehoert.
 *
 * Die Zitatkarte ist der Nachfolger, und der Unterschied zur alten Belegszene
 * ist, dass hier **etwas passiert**: Der Wortlaut steht als Karte da, und die
 * beiden Figuren reden darueber. Kein Standbild mit einem Behoerdennamen,
 * sondern der Gegenstand des Gespraechs.
 *
 * ## Was hier anders ist als bei `text`
 *
 * `zitat` ist **woertlich** und wird nicht umgeschrieben. Genau hier darf das
 * Amtsdeutsch stehen, das die Sprachregel sonst verbietet — es ist als Zitat
 * gekennzeichnet und als solches erkennbar. Das ist die Umkehrung, die am
 * 25.08.2026 entschieden wurde: Das Zitat bleibt Behoerdensprache, alles in
 * eigenen Worten ist Alltagssprache.
 *
 * `quelleId` und `belegId` sind Pflicht, nicht optional wie bei `text`. Eine
 * Zitatkarte ohne Fundstelle waere ein Zitat ohne Quelle, und das ist der
 * einzige Fehler, den dieser Kanal sich nicht leisten kann.
 */
const SzeneZitatkarte = SzeneBasis.extend({
  art: z.literal('zitatkarte'),
  /**
   * Der Wortlaut auf der Karte — **hoechstens 90 Zeichen, seit dem 31.08.2026.**
   *
   * Vorher waren es 180, und das Urteil am ersten fertigen Video war deutlich:
   * „Niemand wuerde sich das oben durchlesen." Es stimmt, und zwar aus einem
   * Grund, der im Bau liegt und nicht im Geschmack: **Das Zitat wird ohnehin
   * gesprochen.** Wer es zusaetzlich als Block hinstellt, verlangt, dass
   * jemand dasselbe gleichzeitig hoert und liest — und nimmt dafuer den
   * Figuren die Buehne. Bei 180 Zeichen blieben ihnen 108 Pixel.
   *
   * Im Bild muss das Zitat **beglaubigen**, nicht gelesen werden. Dafuer
   * reicht der Kernsatz: „erhoeht die Sicherheit nicht automatisch" statt des
   * ganzen Behoerdensatzes.
   *
   * **Der volle Wortlaut geht dabei nicht verloren** — er steht in
   * `quellen.json` unter `belegId`, wird von `npm run quellen-pruefen` gegen
   * die Seite gehalten und steht in der Beschreibung unter dem Video. Was hier
   * kuerzer wird, ist die Anzeige, nicht der Beleg.
   *
   * Er muss trotzdem **woertlich** aus der Quelle stammen: 90 Zeichen sind
   * eine Kuerzung, keine Umschrift. Wo das Kuerzen die Bedeutung dreht — die
   * Verneinung am Satzende, das Subjekt am Anfang —, gehoert ein anderer
   * Ausschnitt gewaehlt und nicht ein laengerer erzwungen.
   */
  zitat: z.string().max(90),
  quelleId: z.string(),
  belegId: z.string(),
  ...mitBelegeinblendung,
  /*
   * **Die Buehne hat hier eine Woche lang gefehlt**, obwohl der Vertragstext
   * darueber sie seit dem 25.08.2026 verlangt: „Das Zitat steht als Karte im
   * Bild, und die beiden Figuren reden darueber."
   *
   * Im Standbild sass die Karte mittig und darunter war nichts — die Szene, in
   * der am ausdruecklichsten geredet wird, war die einzige ohne Figuren.
   *
   * **Ein Vertrag, den das Schema nicht kennt, ist eine Absichtserklaerung.**
   * Dieselbe Lehre wie bei der Belegpflicht und den Positionen: Was sich nicht
   * ausdruecken laesst, wird beim Schreiben nicht gefragt.
   */
  ...mitIllustration,
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
  /*
   * **Auch der Schluss hat eine Buehne — seit dem 01.09.2026.**
   *
   * Vorher stand hier nur Text: Satz, Strich, Spruch, und rechts eine kleine
   * Figur, die auf den Folgen-Knopf zeigt. Das Urteil am ersten fertigen Video
   * war „wieso werden die beiden am Ende nicht animiert dargestellt?", und es
   * trifft einen Bruch im Bau: Der ganze Short ist ein Gespraech zwischen
   * zwei Figuren — und in dem Moment, in dem die Pointe faellt, sind sie weg.
   *
   * Der Schluss ist damit eine Szene wie jede andere. Was ihn unterscheidet,
   * bleibt: die Restfrage, der Strich, der Spruch — und die eine Stelle, an
   * der eine Figur den Zuschauer direkt ansieht.
   */
  ...mitIllustration,
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
  SzeneZitatkarte,
  SzeneSchluss,
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
 *
 * ── Am 20.08.2026: aus sieben werden vier ──────────────────────────────
 *
 * Dasselbe Verfahren noch einmal, mit breiterer Nische (Technik allgemein
 * statt Geraete und Verbraucherrecht) und mit zwei Befunden aus den
 * Reichweiten-Skills, die das alte Modell direkt treffen:
 *
 * **Wiederholung ist ein Risiko, keine Wiedererkennung.** Die Retention-Ladder
 * aus `youtube-shorts` nennt als dritte Stufe: geklonte Formate werden
 * unterdrueckt, „volume without novelty is a negative". Acht feste Formate im
 * Wochentakt sind per Bauart genau das. Die Wiedererkennung, fuer die der
 * Wochentag gedacht war, ist ausserdem ein Versprechen an ein Publikum, das
 * es noch nicht gibt — bei 0 Abonnenten kostet sie Neuheit und bringt nichts
 * dafuer ein. **`tag` ist deshalb weg**, siehe `zeitplanBauen`.
 *
 * **Die Schaetzfrage ist keine Themengruppe** — das stand oben schon, aber die
 * Folgerung war zu klein. Sie laesst sich auf fast jedes Thema legen, und
 * WATCH verlangt ohnehin mehrere Hook-Varianten je Video. `dubistdumm` ist
 * deshalb kein Sendeplatz mehr, sondern die erste Machart in
 * `HOOK_MACHARTEN`. Der Vorrat wandert mit.
 *
 * Vier statt acht, sortiert nach der Reaktion:
 *
 * | Format | Reaktion | Vorrat kam aus |
 * |---|---|---|
 * | `gibtswirklich` | Staunen, „das erzaehl ich weiter" | `gibtswirklich` + die Zahlen aus `dubistdumm` |
 * | `absicht` | Empoerung, „jemand hat das entschieden" | `absicht` + `heimlich` |
 * | `eswareinmal` | Korrektur, „das stimmt nicht mehr" | `eswareinmal` |
 * | `werhatrecht` | Widerspruch, „wer hat recht" | `werhatrecht` |
 *
 * **`heimlich` geht in `absicht` auf.** Die alte Abgrenzung war „wie das
 * Geraet gebaut wurde" gegen „was es im Betrieb tut" — der Drucker, der
 * Fremdpatronen sperrt, gegen den Drucker, der den Fuellstand meldet. Die
 * Unterscheidung ist sauber und half beim Einsortieren, aber sie loest beim
 * Zuschauer dieselbe Reaktion aus, und sortiert wird nach Reaktion.
 *
 * **`auchgekauft` und `neu` fallen weg.** Beide sind fuer die Zielgruppe
 * 18–30 die schwaechsten: Garantieverlaengerungen und Displayversicherungen
 * kauft sie selten, und `neu` war als einziges Fach ohne haltbaren Vorrat
 * zugleich das teuerste — jede Woche eine frisch abgerufene Behoerdenseite.
 * Ihre tragfaehigen Themen wandern in die vier. `npm run neuigkeiten` bleibt
 * und liefert weiter Stoff fuer `absicht`; es traegt nur keinen Sendeplatz
 * mehr allein.
 *
 * `empfehlung` bleibt unveraendert und ausserhalb: erst ab Affiliate-Links.
 */
export const Format = z.enum([
  'gibtswirklich',
  'absicht',
  'eswareinmal',
  'werhatrecht',
  'empfehlung',
]);
export type Format = z.infer<typeof Format>;

/**
 * Macharten fuer den Aufschlag — der Werkzeugkasten, aus dem der erste Satz
 * kommt.
 *
 * Angelegt am 20.08.2026, als `dubistdumm` vom Sendeplatz zur Machart wurde.
 * Der Grund steht oben; hier steht die Folge: **Die Machart ist unabhaengig
 * vom Format.** Eine Schaetzfrage passt vor eine Absurditaet ebenso wie vor
 * eine veraltete Regel.
 *
 * WATCH (`short-form-video-script`) verlangt mehrere Hook-Varianten je Video
 * und nennt den Aufschlag ausdruecklich eine **Testgroesse**, keine einmalige
 * Entscheidung. Diese Liste ist der Vorrat, aus dem die Varianten kommen.
 *
 * Kein Schema erzwingt eine davon — welche traegt, entscheidet sich am Text.
 * Was das Schema erzwingt, steht anderswo: hoechstens 3,5 Sekunden, und keine
 * Ankuendigung („heute geht es um").
 */
export const HOOK_MACHARTEN = [
  {
    name: 'Schaetzfrage',
    tut: 'Fragt nach einer Groesse, die niemand einordnen kann. Der Zuschauer raet unwillkuerlich weiter, waehrend der Daumen schon wischt.',
    achtung:
      'Die Aufloesung muss ihn wieder einsammeln — „Sechzig. Du warst bei zwölf, wie alle." Ohne das „wie alle" bleibt nur die Beleidigung.',
    beispiele: ['Schätz mal.', 'Wie viele, glaubst du?', 'Nenn eine Zahl.'],
  },
  {
    name: 'Behauptung',
    tut: 'Stellt den Gegenstand hin, als waere die Sache entschieden. Der Widerspruch entsteht beim Zuschauer.',
    achtung: 'Muss belegt sein wie alles andere. Eine Behauptung ueber eine Absicht ist keine Behauptung ueber die Welt.',
    beispiele: ['Dein Drucker unterschreibt.', 'Eingeklebt.', 'Das war eine Entscheidung.'],
  },
  {
    name: 'Nackte Zahl',
    tut: 'Nennt die Zahl ohne ihren Gegenstand. Die Luecke haelt fest, bis sie geschlossen wird.',
    achtung:
      'Bei fester Schriftgroesse laeuft ein langes Wort ueber den rechten Rand — die Hook skaliert deshalb nach dem laengsten Wort, nicht nach der Gesamtlaenge.',
    beispiele: ['Dreizehn Jahre.', 'Zwanzigtausend.', 'Einundsechzig Sekunden.'],
  },
  {
    name: 'Frage, die keine ist',
    tut: 'Stellt eine Rueckfrage und beantwortet sie sofort. Ersetzt die Ueberleitung, die es sonst braeuchte.',
    achtung: 'Nie als echte Frage an den Zuschauer — das waere eine Handlung, die er nicht leisten will.',
    beispiele: ['Was heißt herausnehmbar?', 'Den Aufkleber gelassen?'],
  },
  {
    name: 'Zwei Lager',
    tut: 'Nennt beide Seiten eines Streits in einem Satz. Der Zuschauer nimmt sofort Partei und bleibt, um recht zu bekommen.',
    achtung: 'Was zwei Lager behaupten, ist keine Aussage ueber die Welt — die Zuspitzung darunter muss eine sein.',
    beispiele: ['Zwei Lager. Einer liegt falsch.', 'Die einen schwören darauf, die anderen lachen.'],
  },
] as const;

/**
 * Macharten fuer die Reaktion — der Werkzeugkasten der zweiten Stimme.
 *
 * Angelegt am 25.08.2026, als der Kanal zwei Sprecher bekam. Einer traegt die
 * belegte Aussage, der andere reagiert; eine Reaktion behauptet nichts ueber
 * die Welt und braucht deshalb keine Quelle. Genau darin liegt ihr Wert: Wo
 * der Beleg zwingt, nah am Zitat zu bleiben, darf sie frech sein.
 *
 * **Warum es diese Liste braucht.** Ohne Vorgabe faellt jeder Entwurf auf den
 * zusammenfassenden Kommentar zurueck — der Skill `joke-engineering` nennt das
 * H4, „punchline is stated rather than implied". Das ist der Normalfall, nicht
 * die Ausnahme, und `npm run pruefen` wird dabei gruen. Dieselbe Bauart wie bei
 * `HOOK_MACHARTEN`: Ein Problem, das man nicht verbieten kann, bekommt ein
 * Vokabular, aus dem gewaehlt werden muss.
 *
 * **Die eine Regel, an der alles scheitert:** Eine Reaktion, die den Fakt
 * zusammenfasst, ist keine Reaktion. Sie muss etwas hinzufuegen, das im Fakt
 * nicht steht.
 *
 * Abgeleitet aus fuenfzehn Zeilen, die Emirhan am 25.08.2026 einzeln bewertet
 * hat. Die Streichungen trugen mehr als die Treffer — sie stehen als Regeln in
 * `daten/marke/voice.md` unter „Humor", zusammen mit dem Register und dem
 * Vorrat an Ausrufen.
 *
 * **Der Vorrat ist nicht abzuarbeiten.** Die Haelfte der guten Reaktionen kommt
 * ohne Ausruf aus, und dasselbe Wort zweimal im Lauf macht daraus eine
 * Schablone — bei KI-Material seit Juli 2025 ein Reichweiten- und
 * Monetarisierungsrisiko.
 *
 * ## `regie` — der Vorrat an Ansagen fuer die Stimme
 *
 * Seit dem 26.08.2026. `eleven_v3` versteht Regieanweisungen in eckigen
 * Klammern, und das war der **Grund** fuer den Modellwechsel: Wattis Macharten
 * heissen Ratlosigkeit und Gestaendnis, und die lassen sich damit ansagen,
 * statt zu hoffen, dass die Stimme sie erraet. Der Ertrag lag seit dem 25.08.
 * ungenutzt da — das Modell konnte es, niemand hat es bestellt.
 *
 * `syntheseText` in `src/stimme.ts` setzt die Anweisung vor die Zeile. Sie
 * steht **nur im Synthesetext**: `sprechtext` bleibt unberuehrt, damit
 * Untertitel, Laengenschaetzung und die Gleichheitswache `rede` ↔
 * `sprechtext` nichts davon mitbekommen. `woerterAusAusrichtung` filtert
 * eckige Klammern ohnehin schon heraus — ohne diesen Filter stuende die
 * Klammer gross ueber der Buehne.
 *
 * ## Warum eine Liste und kein einzelner Wert
 *
 * **Ein fester Tag je Machart waere die Schablone, gegen die der ganze Umbau
 * laeuft.** Bis Ende Oktober sind es rund 36 Reaktionszeilen; klingt jede
 * Ratlosigkeit mit demselben Tag angesagt, ist die Tonlage in vier Wochen ein
 * Markenzeichen. Der Vertrag sagt genau das beim Ausruf — „Ein fester Marker
 * ist in vier Wochen eine Schablone. Es gibt einen Vorrat, aus dem gewaehlt
 * wird" —, und es gibt keinen Grund, warum das fuer „Watt?" gelten soll und
 * nicht fuer den Ton, in dem er es sagt.
 *
 * Gewaehlt wird **deterministisch aus der Short-`id`**, nicht ueber die
 * Listenposition und nicht per Zufall. Die Listenposition machte den ersten
 * Short jedes Laufs immer gleich — dieselbe Schablone, die beim Wochentag
 * gestrichen wurde. Ein Zufallsgriff waere nicht reproduzierbar, und derselbe
 * Short muss beim zweiten Render gleich klingen. Ein Feld am Entwurf haette
 * das Raten zurueck ins Schreiben verlagert.
 *
 * **Ein leerer Vorrat heisst: keine Ansage.** Das ist ein gueltiges Ergebnis,
 * kein fehlender Eintrag — deshalb steht die leere Fassung in der Blindwahl
 * als vollwertiger Kandidat. Kommt nur ein Tag durch, gehoert `''` als
 * zweiter Eintrag daneben: dann wechselt die Machart zwischen Ansage und
 * keiner, statt einen festen Marker zu tragen.
 *
 * ## Stand: alle sechs leer, und das ist Absicht
 *
 * Am 26.08.2026 standen hier sechs geratene Tags, von mir aus dem Gedaechtnis
 * gewaehlt — bei Quellen verbietet dieses Projekt genau das. Das Nachlesen der
 * ElevenLabs-Doku hat einen davon sofort erledigt: **`[confused]` existiert
 * nicht.** Es stand seit dem 25.08. in `src/stimme.ts` und in `AUFGABEN.md`
 * als *das* Beispiel, ausgerechnet fuer die Machart, fuer die der
 * Modellwechsel gemacht wurde.
 *
 * Die Vorraete fuellt `npm run regieprobe`, und zwar als **Blindwahl**: je
 * Machart zwei Zeilen — die echte aus dem Entwurf und eine bewusst tonlos
 * geschriebene —, dazu vier unbeschriftete Fassungen, darunter die ohne
 * Ansage. Was den ersten Durchgang uebersteht, wird ein zweites Mal
 * synthetisiert; die Synthese ist nicht deterministisch, und aus n = 1 wuerde
 * hier sonst eine Konstante im Code.
 *
 * **Nur nicht-hoerbare Ansagen sind zugelassen.** Ein Seufzer erzeugt Ton, den
 * **keine** Schaetzung sieht — derselbe Fehler wie die Sprecherwechselpausen,
 * die am 26.08. mit 1,2 bis 1,6 Sekunden je Short nachgetragen werden mussten.
 * Was hoerbar ist, entscheidet die Klammerspanne aus der Zeichenausrichtung
 * und nicht das Gefuehl. Gewinnt spaeter doch ein hoerbarer Tag, wird seine
 * Dauer gemessen und wandert als Konstante nach `src/zeit.ts`.
 *
 * ## Die Regel, die die Ansage nicht aushebeln darf
 *
 * **Die Zeile muss ohne Anweisung funktionieren.** Der Tag verstaerkt, er
 * ersetzt nie. Sonst laesst er einen zusammenfassenden Kommentar *klingen* wie
 * Ratlosigkeit, ohne dass er eine wird — und `npm run pruefen` wird dabei
 * gruen, genau wie bei der flachen Reaktionszeile. Damit unterliefe diese
 * Ebene die eine Regel, an der alles haengt.
 */
export const REAKTIONS_MACHARTEN = [
  {
    schluessel: 'gestaendnis',
    name: 'Gestaendnis',
    tut: 'Gibt zu, es selbst falsch zu machen. Der Zuschauer erkennt sich wieder, ohne dass ihm jemand etwas vorwirft.',
    achtung:
      'Im Moment gesprochen, nicht rueckblickend. „Ich mache das seit zehn Jahren." ist ein Protokoll; „Wie? Ich mache das seit zehn Jahren." ist der Augenblick, in dem es auffaellt.',
    beispiele: ['Wie? Ich mache das seit zehn Jahren.', 'Passwort3 ist meins.', 'Ich habe in der Schule vier gekonnt.'],
    /*
     * Gesucht wird das Ertapptwerden — kleiner werden, nicht lauter. Der
     * naechstliegende Tag waere ein Seufzer, und genau der faellt vorerst aus:
     * Er erzeugt Ton, den keine Schaetzung sieht.
     */
    regie: [],
  },
  {
    schluessel: 'falscherschluss',
    name: 'Falscher Schluss',
    tut: 'Zieht aus dem Fakt die naechstliegende falsche Folgerung. Der Zuschauer korrigiert im Kopf mit — und das ist die Beteiligung, die ein Kommentar braucht.',
    achtung:
      'Er muss erkennbar falsch sein. Ein Schluss, der stimmen koennte, ist eine Behauptung ueber die Welt und damit belegpflichtig.',
    beispiele: ['Meiner ist 7. Ich bin quasi Astronaut.', 'Mein Laptop ist also weltraumtauglich.'],
    /*
     * Gesucht wird Ueberzeugung. Zoegernd vorgetragen waere der Schluss ein
     * Vorschlag; ueberzeugt vorgetragen ist er der Fehler, den der Zuschauer
     * im Kopf berichtigt.
     */
    regie: [],
  },
  {
    schluessel: 'bild',
    name: 'Bild',
    tut: 'Setzt an die Stelle des Sachverhalts einen Gegenstand oder eine Szene. Ein Bild schlaegt ein Paradox.',
    achtung:
      'Nie an einem Wort haengen, das die Zielgruppe 18–30 nicht benutzt. „Roehre" und „Ladeziegel" sind daran gescheitert: Wer ein Wort erklaeren muss, hat keinen Witz mehr.',
    beispiele: ['Also haben Einzelteile jetzt Herrchen.', 'Meins liegt seit drei Jahren hinterm Sofa.'],
    /*
     * Der Verdacht ist, dass hier nichts hingehoert: Ein Bild traegt sich
     * selbst, und „Meins liegt seit drei Jahren hinterm Sofa." braucht keinen
     * Ton, der ansagt, dass es lustig ist. Der Verdacht wird geprueft und
     * nicht geglaubt — deshalb laeuft die Machart in der Blindwahl mit.
     */
    regie: [],
  },
  {
    schluessel: 'ratlosigkeit',
    name: 'Ratlosigkeit',
    tut: 'Nimmt dem Zuschauer den Boden weg, den der Fakt gerade weggezogen hat. Die Folgerung bleibt bei ihm.',
    achtung: 'Keine rhetorische Frage — echte Hilflosigkeit. Sobald eine Antwort mitgeliefert wird, ist es wieder ein Kommentar.',
    beispiele: ['Kacke, was dann?', 'Und jetzt? Zwiebeln?', 'Moment. Kleiner ist schlechter?'],
    /*
     * Der Fall, fuer den der Modellwechsel gemacht wurde. Ratlosigkeit ist
     * ganz Ton: „Kacke, was dann?" gelesen wie eine Frage ist rhetorisch,
     * gelesen wie Hilflosigkeit ist es die Machart. Wenn hier nichts wirkt,
     * wirkt die ganze Ebene nicht.
     */
    regie: [],
  },
  {
    schluessel: 'empoerung',
    name: 'Empoerung gegen den Falschen',
    tut: 'Zielt auf den Verursacher statt auf die Sache. Traegt die Reaktion, die `absicht` ohnehin ausloest.',
    achtung:
      'Firmen und Behoerden duerfen getroffen werden, wenn ein Beleg danebensteht. Gruppen und Personen des oeffentlichen Lebens nie.',
    beispiele: ['Die EU kann also doch was?!', 'Dreizehn Jahre. Für ein Loch.', 'Mein Hintern ist jetzt ein Geschäftsmodell.'],
    /*
     * Gesucht wird gespielte Empoerung, nicht echte — der Ton macht den
     * Unterschied zwischen einem Vorwurf und einem Witz ueber einen Vorwurf.
     * Schwierig zu messen, weil die Zeilen das Ausrufezeichen schon tragen;
     * dafuer laeuft die tonlose Vergleichszeile mit.
     */
    regie: [],
  },
  {
    schluessel: 'rueckfrage',
    name: 'Die banale Rueckfrage',
    tut: 'Fragt das Naheliegendste, das im Fakt offen bleibt. Wirkt, weil es niemand ausspricht.',
    achtung:
      'Sofort verstaendlich, nicht nach einem Takt. Wer erst ueberlegen muss, lacht nicht mehr — im Zweifel banaler.',
    beispiele: ['Warum heißt er dann so?', 'Also vor meiner Mutter.', 'Wie, vier Stück?!'],
    /*
     * Wie bei `bild` der Verdacht, dass nichts hingehoert: Die banale
     * Rueckfrage wirkt, weil sie banal klingt, und jede Ansage — neugierig,
     * empoert, verwundert — macht aus der Banalitaet eine Pointe mit
     * Unterstreichung. Auch dieser Verdacht wird geprueft.
     */
    regie: [],
  },
] as const;

/**
 * Die Wache ueber der Doppelung: `Redeanteil.machart` zaehlt die Schluessel
 * ein zweites Mal auf.
 *
 * Abgeleitet werden kann das Enum nicht — `Redeanteil` steht tausend Zeilen
 * weiter oben, und ein `const` ist zur Auswertungszeit dort noch leer. Also
 * bleibt die Doppelung, und damit gilt der Satz, der in diesem Projekt an
 * `herausgeber` und an `rede` ↔ `sprechtext` haengt: **Eine Doppelung ohne
 * Wache ist der eigentliche Fehler, nicht die Doppelung selbst.**
 *
 * Diese hier kostet nichts, weil sie im Typsystem liegt: Wer eine Machart
 * hinzufuegt und das Enum vergisst (oder umgekehrt), bekommt einen
 * `tsc`-Fehler statt einer Machart, die sich nicht eintragen laesst.
 */
type MachartSchluessel = (typeof REAKTIONS_MACHARTEN)[number]['schluessel'];
type MachartImSchema = NonNullable<z.infer<typeof Redeanteil>['machart']>;
const _machartenDeckenSich: [MachartSchluessel, MachartImSchema] extends [
  MachartImSchema,
  MachartSchluessel,
]
  ? true
  : never = true;
void _machartenDeckenSich;

/**
 * Der Vorrat an Ansagen zu einer Machart. Leer heisst: keine.
 *
 * Steht hier statt in `src/stimme.ts`, weil die Vertonung nicht die einzige
 * Stelle bleiben muss, die ihn liest — die Freigabeseite koennte ihn zeigen,
 * und eine zweite `find`-Schleife waere die naechste Doppelung.
 */
export const regieVorrat = (machart: MachartImSchema): readonly string[] =>
  REAKTIONS_MACHARTEN.find((m) => m.schluessel === machart)?.regie ?? [];

/**
 * Die Wochentage — nur noch fuer Anzeige und Datumsrechnung.
 *
 * **Bis zum 20.08.2026 hing hier der Sendeplan.** Jedes Format hatte ein Feld
 * `tag`, die sieben festen belegten Montag bis Sonntag, und `zeitplanBauen`
 * las den Termin dort. Das ist gestrichen: Der Wochentag war eine Zusage an
 * Zuschauer, die es noch nicht gibt, und er zwang jede Woche dieselben acht
 * Formate in derselben Reihenfolge — genau die Wiederholung, die die
 * Retention-Ladder als Verteilungsrisiko nennt. Die Begruendung steht bei
 * `Format`.
 *
 * Die **Empfehlung** stand schon vorher ausserhalb des Plans, und aus einem
 * Grund, der bleibt: Seltenheit ist der Preis, den eine Empfehlung wert ist.
 * Wer woechentlich empfiehlt, ist ein Prospekt.
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
    /**
     * Der Showtitel im Vorspann — „Facts", „Beef", „Maerchenstunde".
     *
     * **Seit dem 31.08.2026 ist ein Format eine Sendung.** Der Kanal ist der
     * Sender, das Format die Show darin: Jeder Short beginnt nach dem Aufschlag
     * mit einem Vorhang, auf dem dieser Titel steht und hinter dem sich die
     * beiden Figuren vorstellen.
     *
     * **Sechs verschiedene Vorspaenne sind keine Schablone, einer waere eine.**
     * Genau das ist der Grund, warum der Titel hier steht und nicht als
     * Konstante im Renderer: Er wechselt mit dem Format, und die Regel „kein
     * Format zweimal hintereinander" streut ihn damit von selbst.
     *
     * Kurz halten. Er steht mit „mit Watti und Volti" in einer Zeile.
     */
    show: string;
    /**
     * Die Farbe der Rubrik — in der Kopfzeilenpille und am Belegpunkt.
     *
     * **Seit dem 31.08.2026 traegt jede Sendung eine eigene.** Vorher war die
     * Pille durchgehend blau, und blau ist Voltis Kennfarbe: Das groesste
     * farbige Element im Bild gehoerte damit einer der beiden Figuren.
     *
     * Alle sechs sind gerechnet und nicht gewaehlt: Der Ton steht mit
     * mindestens **4,5** auf seiner hellen Flaeche. Pink und Orange mussten
     * dafuer nachgedunkelt werden — `#B0417A` lag bei 4,26 und `#B8642A` bei
     * 3,47.
     *
     * **Ein Einwand steht offen**, damit ihn niemand uebersieht: `gibtswirklich`
     * und `absicht` tragen beide Blau, in zwei Toenen. Gross nebeneinander sind
     * sie zu trennen; in der kleinen Pille oben im Video vermutlich nicht mehr.
     * Das entscheidet ein Standbild bei Briefmarkengroesse.
     */
    farbe: string;
    farbeHell: string;
    /**
     * Sendezeit als volle Stunde.
     *
     * Stand bis zum 17.08.2026 als Konstante `UHRZEIT = 18` in
     * `zeitplanBauen` und war dort richtig, solange ein Tag genau ein Format
     * trug. Mit dem zweiten Mittwochsvideo waeren zwei Shorts auf dieselbe
     * Minute gefallen — sie haetten sich gegenseitig die Reichweite genommen,
     * und zwar unbemerkt, weil der Plan formal stimmt.
     *
     * **Das Feld `tag` ist am 20.08.2026 gestrichen worden**, die Uhrzeit
     * nicht. Der Wochentag war eine Zusage an Zuschauer, die es noch nicht
     * gibt, und stand der Neuheit im Weg (Begruendung bei `Format`). Die
     * Uhrzeit bleibt, weil sie kein Versprechen ist, sondern eine Annahme
     * ueber den Feed: abends laeuft Kurzvideo besser als frueh morgens.
     *
     * Achtzehn Uhr ist der Hauptplatz. Wo an einem Tag zwei Videos laufen,
     * liegt das zweite mittags — weit genug entfernt, dass die beiden nicht
     * dieselbe Feed-Sitzung teilen.
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
  gibtswirklich: {
    titel: 'Das gibt es wirklich',
    pille: 'Gibt es wirklich',
    show: 'Facts',
    farbe: '#4C61B0',
    farbeHell: '#E3E5ED',
    uhrzeit: 18,
    /*
     * **Hier stand bis zum 31.08.2026 ein Freibrief.** Der Wortlaut war: „Sie
     * brauchen keine Pointe — die Sache selbst ist die Pointe." Damit schrumpfte
     * der Humor-Etat dieses Formats auf den Nachschlag, und der soll trocken
     * sein. Der Satz hat den Umbau auf zwei Stimmen am 25.08.2026 unangetastet
     * ueberlebt, obwohl der ganze Umbau gegen ihn lief.
     *
     * Die Sache traegt das **Staunen**. Die Pointe traegt die **Reaktion** —
     * und die ist seit dem 26.08.2026 Pflicht, in jedem Format
     * (`reaktion` in `src/pruefung.ts`). Ein Format, das sich von der Pointe
     * freispricht, spricht sich von einer Regel frei, die fuer alle gilt.
     */
    haltung:
      'Tatsachen, die absurd klingen und trotzdem dokumentiert sind. Die Sache ' +
      'traegt das Staunen, die Reaktion traegt die Pointe — beides gehoert ' +
      'hinein. Der breiteste Vorrat des Kanals: Raumstation, Radioastronomie, ' +
      'Schaltsekunde — kein Geraet, kein Paragraf, reines Staunen.',
    reaktion: 'Das kann nicht stimmen',
    kipppunkt: 'Die Sache selbst.',
    opener: ['Das gibt es wirklich.', 'Ich habe das dreimal nachgelesen.', 'Das ist kein Witz.'],
  },
  eswareinmal: {
    titel: 'Es war einmal',
    pille: 'Es war einmal',
    show: 'Märchenstunde',
    farbe: '#992F68',
    farbeHell: '#EDDEE3',
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
    show: 'Kein Zufall',
    farbe: '#303C6C',
    farbeHell: '#DFDFE4',
    uhrzeit: 18,
    haltung:
      'Nichts davon ist kaputt, es ist so gebaut. Der Unterschied zur blossen ' +
      'Absurditaet: Hier gibt es jemanden, der es entschieden hat. Die Wut ' +
      'richtet sich gegen den Hersteller, und das macht den Zuschauer ' +
      'automatisch zum Verbuendeten.\n\n' +
      'Seit dem 20.08.2026 gehoert auch dazu, **was das Geraet im Betrieb ' +
      'tut** — der alte Sendeplatz `heimlich`. Beides loest dieselbe Reaktion ' +
      'aus, und sortiert wird nach Reaktion. Die harte Regel von dort gilt ' +
      'jetzt fuer den ganzen Sendeplatz: **Es muss in einem Dokument stehen.** ' +
      '„Dein Handy hoert mit" ist unbelegbar und deshalb kein Thema — gerade ' +
      'hier, wo die Vermutung billig zu haben waere.',
    reaktion: 'Die haben sie doch nicht mehr alle',
    kipppunkt: 'Wer es entschieden hat — oder wo es dokumentiert steht.',
    opener: [
      'Das ist kein Fehler.',
      'Da hat jemand drüber nachgedacht.',
      'Das war eine Entscheidung.',
      'Niemand hat dich gefragt.',
      'Es schreibt mit.',
    ],
  },
  /*
   * ── Was das Aktuelle uebernimmt ──────────────────────────────────────
   *
   * Der Sendeplatz `neu` („Neu und keiner sagt es dir") ist am 20.08.2026
   * gestrichen. Sein Stoff geht an `absicht`, seine Begruendung bleibt hier
   * stehen, weil sie weiter gilt:
   *
   * **Die Materialgrenze ist hart.** „Aktuell" zerfaellt in zwei Sorten: neue
   * Geraete, belegt durch Herstellerankuendigung (beteiligt) und Presse (nicht
   * eintragbar) — das koennen wir nicht. Und neue **Regeln, Normen und
   * Grenzwerte**, belegt durch Behoerden und Normungsgremien — das koennen wir
   * als einzige. Wer ein Gadget ankuendigt, hat das missverstanden.
   *
   * Das ist kein Ersatzmaterial, sondern das bessere: Niemand liest das
   * Amtsblatt. Ein Kanal mit dem Spruch „Wir haben nachgelesen" hat dort ein
   * Monopol.
   *
   * **Warum er trotzdem faellt:** Er war als einziger ohne haltbaren Vorrat
   * und damit der teuerste — jede Woche eine frisch abgerufene Behoerdenseite,
   * waehrend alle anderen aus einem Vorrat ziehen, der Wochen haelt. Ein
   * eigener Sendeplatz zwingt diese Kosten in **jede** Woche. Als Stoff fuer
   * `absicht` faellt er an, wenn er anfaellt. `npm run neuigkeiten` bleibt und
   * liefert weiter.
   *
   * ── Und was mit dem Kaufen passiert ──────────────────────────────────
   *
   * `auchgekauft` („Na, auch gekauft?") ist am selben Tag gestrichen. Fuer die
   * Zielgruppe 18–30 war es das schwaechste Fach: Garantieverlaengerungen und
   * Displayversicherungen kauft sie selten.
   *
   * **Der Verlust ist benannt und nicht bestritten:** Es war die Vorarbeit fuer
   * die `empfehlung` — ein Kanal, der ein halbes Jahr lang sagt, was man nicht
   * kaufen soll, wird geglaubt, wenn er einmal etwas empfiehlt. Diese Wirkung
   * muss spaeter anders erarbeitet werden. Wer die `empfehlung` scharf
   * schaltet, liest das hier zuerst.
   */
  werhatrecht: {
    titel: 'Wer hat recht?',
    pille: 'Wer hat recht?',
    show: 'Beef',
    farbe: '#A33B2E',
    farbeHell: '#EFDFDB',
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
    show: 'Empfehlungen',
    farbe: '#9C5220',
    farbeHell: '#EEE2D9',
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
 * Die Grundspannung je Show — **wer irrt, worueber gestritten wird, wie es
 * ausgeht.**
 *
 * ## Warum das nicht in `FORMATE` steht
 *
 * `FORMATE` traegt Produktionsdaten: Pille, Farben, Sendezeit, Showtitel. Der
 * Bogen ist Dramaturgie. Zwei Dinge, die zusammen in einem Record wohnen,
 * laufen beim ersten Umbau auseinander — dieselbe Begruendung, aus der `RUHE`
 * nicht in `ABLAUF` steht.
 *
 * ## Warum vier der fuenf Felder von keinem Skript gelesen werden
 *
 * **Und das steht hier ausdruecklich, damit es niemand fuer ein Versehen
 * haelt.** Ob ein Streit wirklich um `streitfrage` geht und ob die `wendung`
 * traegt, kann kein Skript beurteilen. Ihr Leser ist der Entwurfsprompt und
 * der `belegpruefer` — genau wie bei `FORMATE.haltung`, das ebenfalls seit dem
 * 20.08.2026 von keiner Regel gelesen wird.
 *
 * Die Gefahr daran ist bekannt: „Ein Zielwert, der nur im Kommentar steht, ist
 * keine Wache." Deshalb traegt **genau ein Feld** eine Pruefung — `schluss`,
 * gegen den Zug des letzten Redeanteils. Alles andere ist Handreichung.
 *
 * ## Und warum die Mitte frei bleibt
 *
 * Der Bogen setzt Anfang und Aufloesung. Schriebe er die Mitte vor, waere er
 * in vier Wochen die Schablone, gegen die der ganze Umbau laeuft — `frei`
 * haelt fest, was er ausdruecklich **nicht** bestimmt.
 *
 * `schaetzmal` fehlt, weil es die Show nicht gibt: Die Schaetzfrage ist am
 * 20.08.2026 vom Sendeplatz zur Machart herabgestuft worden. Der Record-Typ
 * erzwingt ihren Bogen von selbst, sobald sie je angelegt wird.
 */
export type Gespraechsbogen = {
  /** Worueber die beiden uneins sind. Als Frage, damit sie offen bleibt. */
  streitfrage: string;
  /** Wer irrt — und ausdruecklich auch: ob ueberhaupt jemand irrt. */
  irrtum: Sprecher | 'beide' | 'keiner';
  /** Woran der Irrtum kippt. Haengt am `kipppunkt` des Formats. */
  wendung: string;
  /** Wie es ausgeht. **Das einzige gepruefte Feld.** */
  schluss: readonly Zug[];
  /** Was der Bogen offenlaesst. Steht hier, damit niemand die Mitte festschreibt. */
  frei: string;
};

export const GESPRAECHSBOEGEN: Record<Format, Gespraechsbogen> = {
  gibtswirklich: {
    streitfrage: 'Kann das stimmen?',
    irrtum: 'keiner',
    wendung: 'Die Sache selbst. Niemand hat sich geirrt, die Welt ist so.',
    schluss: ['richtigstellen', 'zuspitzen', 'einlenken'],
    frei: 'Wer staunt und wer nachlegt. Beide duerfen unglaeubig sein, und es darf wechseln.',
  },
  werhatrecht: {
    streitfrage: 'Wer von beiden Lagern hat recht?',
    irrtum: 'beide',
    wendung: 'Das Dritte, das beide Lager uebersehen.',
    /*
     * **Der einzige Bogen, der offen enden darf.** `FORMATE.werhatrecht`
     * verlangt die Restfrage seit dem 20.08.2026 — hier steht sie als
     * eingetragene Zusage und nicht als geduldete Luecke, damit die
     * Antwortpflicht sie kennt statt sie zu melden.
     */
    schluss: ['nachhaken', 'einschraenken', 'widersprechen'],
    frei: 'Welches Lager welche Figur vertritt. Es darf innerhalb des Shorts wechseln.',
  },
  eswareinmal: {
    streitfrage: 'Gilt das noch?',
    irrtum: 'zeiger',
    wendung: 'Das „und heute".',
    schluss: ['einlenken', 'richtigstellen'],
    frei: 'Ob der Irrende es merkt. Er darf auch bei seiner alten Weisheit bleiben.',
  },
  absicht: {
    streitfrage: 'Ist das kaputt oder so gebaut?',
    irrtum: 'nachleser',
    wendung: 'Wer es entschieden hat.',
    schluss: ['richtigstellen', 'zuspitzen'],
    frei: 'Gegen wen sich die Empoerung richtet, solange ein Beleg danebensteht.',
  },
  empfehlung: {
    streitfrage: 'Woran haengt es beim Kauf?',
    irrtum: 'zeiger',
    wendung: 'Das Merkmal, an dem es haengt.',
    schluss: ['beantworten', 'einlenken'],
    frei: 'Wer fragt und wer empfiehlt.',
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
 * **Am 20.08.2026 von acht Fragen auf vier gekuerzt**, weil es nur noch vier
 * Formate gibt. Die beiden Abgrenzungen, die frueher haltbar sein mussten,
 * sind unterschiedlich ausgegangen:
 *
 * **Maerchen gegen Streit muss weiter halten.** Beide handeln von falschen
 * Ueberzeugungen. Pruefstein — lautet die Aufloesung schlicht „frueher stimmte
 * es, heute nicht", ist es ein **Maerchen**. `werhatrecht` braucht, dass
 * **beide** Seiten etwas uebersehen haben. Sonst ist es ein Mythos mit zwei
 * Sprechern.
 *
 * **Gebaut gegen Betrieb ist entfallen.** Sie trennte `absicht` („der Drucker
 * sperrt Fremdpatronen") von `heimlich` („der Drucker meldet den
 * Fuellstand"). Die Trennung war sauber und half beim Einsortieren — nur loest
 * sie beim Zuschauer dieselbe Reaktion aus, und sortiert wird nach Reaktion.
 * Beides ist jetzt `absicht`.
 *
 * **Die Schaetzfrage steht nicht mehr hier.** „Ist es eine Groesse, die
 * niemand einordnen kann?" war eine Frage nach der **Machart**, nicht nach dem
 * Gegenstand — sie gehoerte nie in dieselbe Reihe wie die anderen sieben und
 * hat deshalb Themen abgefangen, die woanders hingehoerten. Sie steht jetzt in
 * `HOOK_MACHARTEN`.
 */
export const MATRIX: readonly { prueffrage: string; format: Format }[] = [
  { prueffrage: 'Streiten zwei Lager darüber, und beide übersehen etwas?', format: 'werhatrecht' },
  { prueffrage: 'Stimmte es früher und heute nicht mehr?', format: 'eswareinmal' },
  {
    prueffrage: 'Hat jemand es so entschieden oder tut das Gerät es ungefragt — und steht das in einem Dokument?',
    format: 'absicht',
  },
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
 *
 * **Am 20.08.2026 sind `raumfahrt` und `zeit` dazugekommen**, als die Nische
 * von Geraeten auf Technik allgemein verbreitert wurde. Derselbe Vorgang wie
 * bei `recht` am 17.08., und aus demselben Anlass: ein konkreter Fall, der
 * nirgends hinpasste. Die Raumstation mit ihren Notebooks von 2001 ist kein
 * `rechner`, und die Schaltsekunde ist kein `netz` — beides waeren
 * Notloesungen, und eine willkuerliche Zuordnung macht die Achse wertlos.
 * Genau daran ist die alte Fassung (`schreibtisch`, `unterwegs`, `reise`,
 * `zuhause`, `kaufen`) gescheitert.
 *
 * `zeit` traegt die Schaltsekunde, den Zaehlerueberlauf 2038 und die
 * Zeitzonen; `raumfahrt` die Raumstation, die Ariane und die
 * Satellitennavigation. Beide sind bewusst eng: Sie sollen Haeufungen sichtbar
 * machen und nicht alles auffangen.
 */
export const Sachgebiet = z.enum([
  'drucken',
  'laden',
  'bildschirm',
  'rechner',
  'handy',
  'fahren',
  'netz',
  'recht',
  'raumfahrt',
  'zeit',
]);
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
  /*
   * Die beiden letzten, nachgetragen am 20.08.2026 mit der breiteren Nische.
   *
   * Derselbe Vorgang wie bei `recht` und aus demselben Anlass: ein konkreter
   * Fall, der nirgends hinpasste. Die Raumstation mit ihren Notebooks von 2001
   * ist kein `rechner`, die Schaltsekunde kein `netz`. Beides waeren
   * Notloesungen gewesen, und eine willkuerliche Zuordnung macht die Achse
   * wertlos.
   *
   * Beide sind bewusst eng gehalten. Sie sollen Haeufungen sichtbar machen und
   * nicht alles auffangen, was sonst nirgends passt — ein Sammelgebiet waere
   * dasselbe wie gar keins.
   */
  raumfahrt: {
    titel: 'Raumfahrt',
    traegt: 'Raumstation, Satelliten, Sonden, Trägerraketen, Navigation von oben.',
    abgrenzung: 'Der Gegenstand ist im All oder war dafür gebaut. Das Handy, das ein Satellitensignal empfängt, ist „handy".',
  },
  zeit: {
    titel: 'Zeit',
    traegt: 'Schaltsekunde, Zeitzonen, Zählerüberläufe, Uhren, Kalenderregeln.',
    abgrenzung: 'Die Zeitrechnung selbst ist der Gegenstand, nicht ein Gerät, das sie anzeigt.',
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
   * Die Keyword-Zeile zwischen Titel und Quellenblock.
   *
   * **Sie war vom 15.08. bis zum 24.08.2026 ueberall leer**, und die
   * Begruendung dafuer stimmt weiter: Ein Short erklaert sich im Video, nicht
   * im Text darunter. Die frueheren Erklaerabsaetze holten nach, was das Video
   * nicht schaffte, und sind zu Recht entfallen.
   *
   * Eine Keyword-Zeile ist etwas anderes: Sie erklaert nichts, sie macht
   * auffindbar. Ein Satz mit dem `suchbegriff` vorn — die Plattformen
   * indizieren die ersten rund 80 Zeichen, und `beitragstext` setzt die Zeile
   * direkt hinter den Titel. Damit sie nicht zum Erklaerabsatz zurueckwaechst,
   * meldet `shortPruefen` alles ab 150 Zeichen als Hinweis.
   *
   * Die Quellen stehen nicht hier drin, sondern werden in `beitragstext` aus
   * den `quelleId`s der Szenen erzeugt — die abgeschriebene Liste war
   * unvollstaendig.
   *
   * An diesem Feld haengt ausserdem die `kennzeichnung`-Regel in
   * `src/pruefung.ts`: Sie sucht Partnerlinks und verlangt „Werbung" oder
   * „Anzeige" in derselben Zeile. Sobald Variante A greift, steht der
   * Partnerlink hier.
   */
  beschreibung: z.string().max(2200),

  /**
   * Drei bis fuenf, je Plattform verschieden.
   *
   * Bis zum 24.08.2026 waren hier zwoelf erlaubt und drei gleiche Saetze
   * gesetzt. **Instagram deckelt seit Dezember 2025 hart bei fuenf** — was
   * darueber steht, wird blockiert oder abgeschnitten. TikTok will drei bis
   * fuenf und behandelt sie als Suchwoerter, YouTube „ein paar". Ein
   * gemeinsames Fenster traegt alle drei; ein plattformabhaengiges Limit waere
   * die kompliziertere Loesung ohne Gewinn.
   *
   * Was Hashtags leisten, ist damit auch gesagt: Sie **kategorisieren und
   * helfen der Suche**. Sie sind kein Reichweitentrick, und die Tags, die
   * einer waeren, wenn es einen gaebe — `#fyp`, `#viral` — wirken nachweislich
   * nicht. `shortPruefen` lehnt sie hart ab.
   */
  hashtags: z.array(z.string()).min(3).max(5),
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
  /**
   * Die Tondatei. Bei zwei Sprechern die **erste** — die uebrigen stehen in
   * `abschnitte`, und der Renderer legt sie nebeneinander.
   */
  datei: z.string(),
  dauerSek: z.number().positive(),
  woerter: z.array(Untertitelwort),
  /** Startzeit jeder Szene, aus den Sprech-Zeitstempeln abgeleitet. */
  /**
   * Die Themenansage des Vorspanns — „Heutiges Thema: …".
   *
   * **Der einzige Vorspannton, der je Short wechselt.** Showtitel und Namen
   * haengen am Format und liegen als feste Dateien unter
   * `public/ton/marke/vorspann/`; die Themenzeile steht in `short.vorspann` und
   * ist bei jedem Video eine andere.
   *
   * Sie steht **neben** `abschnitte` und nicht darin, und das ist dieselbe
   * Absicherung wie beim uebrigen Vorspannton: Die Aufschlagmessung filtert
   * `woerter` gegen `szenenStartSek[1]`. Wanderten die Woerter der Ansage dort
   * hinein, verlaengerten sie den gemessenen Aufschlag ueber die 3,5 Sekunden
   * und liessen jeden Short durchfallen.
   *
   * `dauerSek` ist gemessen und der Grund, warum es das Feld ueberhaupt gibt:
   * Ohne sie muesste der Renderer die Laenge einer Tondatei kennen, und das
   * kann Remotion nicht synchron.
   */
  vorspann: z
    .object({
      datei: z.string().min(1),
      dauerSek: z.number().positive(),
    })
    .optional(),
  /**
   * Wattis Abspannzeile als Tonspur — dasselbe Muster wie `vorspann`.
   *
   * Voltis „Wir haben nachgelesen." steht **nicht** hier: Der Satz wechselt
   * nie und liegt als feste Aufnahme unter `public/ton/marke/`, einmal
   * bezahlt. Nur Wattis Antwort ist je Short neu.
   */
  abspann: z
    .object({
      datei: z.string().min(1),
      dauerSek: z.number().positive(),
    })
    .optional(),
  szenenStartSek: z.array(z.number().nonnegative()),
  /**
   * Ein Abschnitt je zusammenhaengendem Redeanteil einer Figur.
   *
   * **Warum nicht eine Datei.** Zwei Sprecher heissen zwei Stimmen, und
   * ElevenLabs synthetisiert je Aufruf mit genau einer. Die Stuecke wieder zu
   * einer Datei zusammenzukleben braeuchte ffmpeg — und hier gibt es nur den
   * abgespeckten Remotion-Wrapper mit 50 Filtern, an dem schon `afade`
   * gescheitert ist.
   *
   * Der Renderer legt sie stattdessen **nebeneinander**: je Abschnitt ein
   * `<Audio>` in einer `Sequence` mit eigenem Startbild. Das kann Remotion von
   * Haus aus, und die Markentoene laufen seit dem 24.08.2026 genau so.
   *
   * Fehlt das Feld, gilt `datei` allein — der einstimmige Fall bleibt
   * unveraendert, und kein bestehender Short bricht.
   */
  abschnitte: z
    .array(
      z.object({
        datei: z.string(),
        sprecher: Sprecher,
        startSek: z.number().nonnegative(),
        /**
         * Der Zug, den dieser Abschnitt spricht.
         *
         * **Damit das Bild ihn ueberhaupt sehen kann.** `ZUGARTEN[...]`
         * traegt eine `aufrichtung`, und der Weg dorthin fuehrt nur hier
         * entlang: Der Renderer kennt keine Redeanteile, er kennt Abschnitte
         * und eine Uhr. `Sprecherstand` blendet den Wert genauso ueber wie die
         * Sprechstaerke — ein harter Wechsel waere ein Ruck in der Figur.
         *
         * **Optional, und diese Zeile ist eine Reparatur vom selben Tag.**
         *
         * Erst stand hier `zug: Zug` als Pflicht, mit der Begruendung: „Alte
         * Renderdaten kennen es nicht — das ist kein Problem, weil aus ihnen
         * ohnehin einzelne Stuecke gelesen werden und nicht die ganze Datei
         * gegen den heutigen Vertrag."
         *
         * **Das war falsch, und es hat bezahlten Ton unbrauchbar gemacht.**
         * `--ton-behalten` in `skripte/wochenlauf.ts` parst genau dieses
         * Schema als Ganzes (`Tonspur.safeParse`), um einen Trockenlauf von
         * einem vertonten zu unterscheiden. Mit dem Pflichtfeld fiel **jede**
         * frueher bezahlte Tonspur durch — der naechste Lauf haette sie neu
         * synthetisieren muessen. Gefunden hat es nicht der Verstand, sondern
         * die Gegenprobe an einer echten Datei aus `laeufe/`.
         *
         * Der Vertrag hatte den Fall zwei Absaetze weiter oben schon
         * beschrieben: **Renderdaten sind eine Momentaufnahme eines aelteren
         * Vertrags.** Genau deshalb darf ein *abgeleiteter* Wert dort fehlen —
         * geschrieben wird der Zug am Redeanteil, und dort ist er Pflicht.
         *
         * Fehlt er, steht die Figur neutral und der Kipppunktton entfaellt.
         * Beides ist sichtbar richtig und nicht still falsch.
         *
         * Verschmilzt `redelaeufe` zwei Anteile derselben Figur innerhalb
         * einer Szene, **gewinnt der erste**, und `zugverlust` in
         * `src/pruefung.ts` meldet den Fall.
         */
        zug: Zug.optional(),
      }),
    )
    .min(1)
    .optional(),
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

  /**
   * Wie der Short gebaut ist. Siehe `BAUFORMEN` — dort steht auch, wie lang
   * diese Bauform sein will.
   *
   * Format und Bauform sind **unabhaengig**: Ein Maerchen kann eine
   * Wechselrede oder eine Reihe von Stationen sein. Das Format sagt, welche
   * Reaktion der Short ausloest; die Bauform sagt, wie er sie erzeugt.
   */
  bauform: Bauform,

  /** Interner Arbeitstitel, nicht der Veroeffentlichungstitel. */
  arbeitstitel: z.string(),

  /**
   * Die Themenzeile auf dem Vorhang — **das einzige, was am Vorspann je Short
   * wechselt.**
   *
   * ## Warum nur eine Zeile im Schema steht
   *
   * Der Vorspann besteht aus Vorhang, Showtitel, zwei gesprochenen Namen und
   * einem Jingle. Nichts davon ist eine Entscheidung beim Schreiben: Der
   * Showtitel folgt aus `format` (`FORMATE[...].show`), der Ton ist eine feste
   * Datei, der Rest ist Bild. Ein Feld fuer den Titel waere eine Frage, die
   * bei jedem Entwurf neu auftaucht und nur eine richtige Antwort hat.
   *
   * ## Eine Behauptung, keine Ankuendigung
   *
   * Nicht „Heute: Passwoerter", sondern „Dein Passwortwechsel ist sinnlos".
   * Der Unterschied ist derselbe, den `POSITIONEN.aufschlag` beim Aufschlag
   * macht: Eine Ankuendigung gibt dem Zuschauer die Erlaubnis zu entscheiden,
   * ob ihn das Thema interessiert — und im Feed entscheidet er dann gegen
   * dich. Deshalb gilt hier dieselbe Sperre wie fuer den Aufschlag; siehe das
   * `superRefine` weiter unten.
   *
   * ## Und der beste Platz fuer den Suchbegriff, den es je gab
   *
   * Der `suchbegriff` soll im Bildtext stehen und tut es oft nicht — die Regel
   * ist deshalb bis heute nur ein Hinweis. Diese Zeile ist gross, frueh und in
   * jedem Video da. Sie bleibt trotzdem ein Hinweis und wird kein Fehler: Als
   * der Suchbegriff im Sprechtext erzwungen wurde, sind Saetze verstuemmelt
   * worden — dieselbe Sorte Zwang wie der alte Zielwert von 23 Sekunden.
   */
  vorspann: z.string().min(12).max(60),

  /**
   * Die Fundstelle, die die Themenzeile traegt.
   *
   * **Seit dem 31.08.2026, und der Anlass steht in der eigenen Doku.** Der
   * `vorspann` behauptet — das verlangt der Absatz darueber ausdruecklich, und
   * das bleibt so. Nur war er das einzige gesprochene Feld **ohne**
   * Belegpflicht, weil er neu war und keine Regel ihn angesehen hat. Drei von
   * vier Themenzeilen trugen ihre Behauptung nicht:
   *
   * - „Passwort wechseln bringt gar nichts", waehrend das BSI „erhoeht die
   *   Sicherheit **nicht automatisch**" sagt. Das ist der Schritt von „nicht
   *   automatisch" zu „nicht" — derselbe, den CLAUDE.md als teuersten Fehler
   *   dieses Projekts fuehrt, und er stand ausgerechnet im Short, der als
   *   erster vertont werden sollte.
   * - „Voll laden macht deinen Akku kaputt" — „kaputt" trug keine der sechs
   *   Fundstellen des Umweltbundesamts.
   * - „Auf der Raumstation laufen uralte Laptops" im Praesens, an einem Beleg
   *   von 2009. Zeitangaben altern, der Short nicht.
   *
   * **Die Befreiung des Aufschlags gilt hier nicht.** Er ist befreit, weil er
   * die Erzaehlung setzt und nichts behauptet. Die Themenzeile behauptet — und
   * sie ist das Erste, was gesagt und gelesen wird, im Feed oft das Einzige,
   * was haengenbleibt. Von allen Saetzen eines Shorts ist sie der letzte, der
   * ungedeckt sein darf.
   *
   * Pflichtfeld nach dem Muster von `belegId` an der Szene, und aus demselben
   * Grund: **Die Frage „welches Zitat traegt das?" faellt beim Schreiben an,
   * nicht in der Durchsicht.** Eine Themenzeile ohne Fundstelle ist beim
   * Schreiben ein leeres Feld statt spaeter eine Diskussion.
   *
   * Dass die Fundstelle wirklich existiert und in einer Quelle **dieses**
   * Shorts steht, prueft `shortPruefen` — hier liegt `quellen.json` nicht vor.
   */
  vorspannBelegId: z.string().min(1),

  /**
   * Wattis Zeile im Abspann — das letzte Wort, auf dem geschlossenen Vorhang.
   *
   * **Seit dem 01.09.2026.** Der Vorhang faehrt am Ende wieder zu, und darauf
   * steht die Gegenkarte zum Vorspann: oben „WIR HABEN NACHGELESEN" statt
   * „HEUTIGES THEMA", darunter der Schlusssatz — und darunter diese Zeile.
   *
   * **Sie behauptet nichts und braucht deshalb keine Quelle.** Das ist
   * dieselbe Trennung wie bei der Reaktion: Wer einen Zug traegt, der nichts
   * behauptet, nennt auch keine Fundstelle. Gehalten wird sie von
   * `ohneWeltbehauptung` — keine Jahreszahl, keine Groesse mit Einheit,
   * hoechstens zwei Saetze.
   *
   * Sechzig Zeichen, wie die Themenzeile. Sie steht auf einem Vorhang und
   * konkurriert dort mit dem Schlusssatz darueber; was laenger ist, wird zum
   * Absatz und nimmt der Pointe das letzte Wort.
   */
  abspann: z
    .string()
    .min(4)
    .max(60)
    .superRefine((wert, ctx) => ohneWeltbehauptung(wert, ctx, [], 'Wattis Abspannzeile')),

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
   * Wonach jemand sucht, der das hier finden soll.
   *
   * Ein bis drei Woerter, so wie sie getippt werden — „Laptops Raumstation",
   * nicht „Warum im Weltraum alte Rechner laufen".
   *
   * Das Feld kam am 24.08.2026 dazu, nachdem `hashtag-strategy` und
   * `social-seo` denselben Befund lieferten: **Der Hebel sind nicht die Tags,
   * sondern das Suchwort** — gesprochen, im Bild und in der Beschreibung. Bei
   * TikTok heisst das die Dreifachnennung, und zwei Drittel davon erfuellt der
   * Kanal ohnehin, weil der Sprechtext Wort fuer Wort der Untertitel ist. Das
   * dritte Drittel fehlte ganz: Die Beschreibung war ueberall leer.
   *
   * Pflichtfeld nach dem Muster von `weitererzaehlt` und `belegId`, und aus
   * demselben Grund: Die Frage faellt beim Schreiben an, nicht in der
   * Durchsicht. `shortPruefen` verlangt den Begriff im Sprechtext und in allen
   * drei Beschreibungen; im Bildtext ist er nur ein Hinweis, weil der auf
   * wenige Woerter gebaut ist.
   */
  suchbegriff: z.string().min(3).max(40),

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
    /* ── Zwei Stimmen: die Wache gegen das Auseinanderlaufen ─────── */

    /*
     * `rede` und `sprechtext` sind zwei Fassungen desselben Textes. Ohne diese
     * Pruefung wuerde eine Aenderung an der einen die andere still veralten
     * lassen — und weil die Vertonung `sprechtext` liest und die Sprechblasen
     * `rede`, faellt es erst im fertigen Video auf.
     *
     * Verglichen wird ohne Ruecksicht auf Leerraum, sonst meldete ein
     * doppeltes Leerzeichen einen Fehler, den niemand sieht.
     */
    const platt = (t: string) => t.replace(/\s+/g, ' ').trim();
    short.szenen.forEach((szene, i) => {
      if (szene.rede === undefined) return;
      const verkettet = platt(szene.rede.map((r) => r.text).join(' '));
      if (verkettet !== platt(szene.sprechtext)) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen', i, 'rede'],
          message:
            'Die Redeanteile ergeben nicht den Sprechtext. Beide müssen denselben ' +
            'Wortlaut tragen — die Vertonung liest den einen, die Sprechblasen den anderen.',
        });
      }
      /*
       * Zwei Reaktionen derselben Machart in einer Szene sind der Anfang der
       * Schablone. Ueber den ganzen Short prueft `shortPruefen`.
       */
      const macharten = szene.rede.map((r) => r.machart).filter((m) => m !== undefined);
      if (new Set(macharten).size !== macharten.length) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen', i, 'rede'],
          message: 'Zweimal dieselbe Reaktions-Machart in einer Szene.',
        });
      }
    });

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

    /* ── Die sichtbare Zaehlung, wenn es eine gibt ───────────────── */

    /*
     * Die Zaehlung muss **lueckenlos bei 1 beginnen und aufsteigen**. Sie ist
     * eine offene Schleife, und eine Schleife mit Luecke ist keine: Die
     * Kopfzeile rechnet die Gesamtzahl aus dem hoechsten Wert, also stuende
     * bei den Nummern 1 und 3 im Bild „3 von 3", ohne dass es je eine 2 gab.
     *
     * Der Fehler faellt beim Ansehen nicht auf — die Zahl stimmt ja an jeder
     * einzelnen Stelle. Nur die Rechnung dahinter stimmt nicht mehr.
     */
    const nummern = short.szenen
      .map((s) => s.zaehlung)
      .filter((z): z is number => typeof z === 'number');

    if (nummern.length > 0) {
      if (nummern.length < 2) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen'],
          message:
            'Nur eine Szene trägt eine Zählung. „1 von 1" ist keine offene Schleife, ' +
            'sondern ein Etikett — entweder mehrere Szenen zählen oder keine.',
        });
      }

      const sortiert = [...nummern].sort((a, b) => a - b);
      const erwartet = sortiert.map((_, i) => i + 1);
      if (sortiert.join(',') !== erwartet.join(',')) {
        ctx.addIssue({
          code: 'custom',
          path: ['szenen'],
          message:
            `Die Zählung lautet ${sortiert.join(', ')} und müsste ${erwartet.join(', ')} lauten. ` +
            'Sie beginnt bei 1, steigt um 1 und lässt keine Nummer aus — die Kopfzeile ' +
            'rechnet die Gesamtzahl aus dem höchsten Wert.',
        });
      }

      /*
       * Aufsteigend **in Szenenreihenfolge**, nicht nur als Menge. Eine
       * Zaehlung, die im Bild rueckwaerts springt, macht aus der Schleife
       * einen Fehler — und der Countdown von 5 auf 1, den die Vorlagen
       * benutzen, laeuft im Bild ebenfalls vorwaerts durch seine Positionen.
       */
      nummern.forEach((n, i) => {
        const vorher = nummern[i - 1];
        if (vorher !== undefined && n <= vorher) {
          ctx.addIssue({
            code: 'custom',
            path: ['szenen'],
            message: `Die Zählung springt von ${vorher} auf ${n}. Sie läuft nur vorwärts.`,
          });
        }
      });
    }

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
    if (letzte !== undefined && letzte.art !== 'schluss') {
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

    /*
     * **Dieselbe Sperre auf der Themenzeile**, seit dem 31.08.2026.
     *
     * Sie steht gross auf dem Vorhang und ist damit das Erste, was gelesen
     * wird. Eine Ankuendigung dort waere schlimmer als eine im Aufschlag: Der
     * Aufschlag ist gesprochen und vorbei, die Themenzeile steht.
     *
     * `heute:` steht zusaetzlich in der Liste — als Etikett ist es genau die
     * Form, die hier nicht hingehoert, waehrend „heute geht es um" schon vom
     * Aufschlag her gesperrt ist.
     */
    const zeile = short.vorspann.toLowerCase();
    const zeilentreffer = [...ansagen, 'heute:', 'heutiges thema'].find((a) => zeile.includes(a));
    if (zeilentreffer !== undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['vorspann'],
        message:
          `Die Themenzeile sagt „${zeilentreffer}" — sie soll behaupten, nicht ankündigen. ` +
          'Nicht „Heute: Passwörter", sondern „Dein Passwortwechsel ist sinnlos".',
      });
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
