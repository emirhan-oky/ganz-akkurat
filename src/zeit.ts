import { FORMAT } from './marke';
import { BAUFORMEN, type Short, type Szene } from './typen';

/**
 * Zeitberechnung eines Shorts.
 *
 * Solange keine Tonspur vorliegt, wird die Sprechdauer aus der Textlaenge
 * geschaetzt — damit laesst sich ein Skript im Studio schon vor der
 * Vertonung ansehen. Sobald die Sprachsynthese gelaufen ist, gelten
 * ausschliesslich deren echte Zeitstempel. Geschaetzt wird also nie
 * gerendert, nur vorschaubar gemacht.
 */

/**
 * Sprechgeschwindigkeit in Zeichen pro Sekunde.
 *
 * Bis zum 13.08.2026 stand hier 15 — eine Annahme, nie nachgemessen. Die
 * Sprechprobe (`npm run sprechprobe`, deutsche Systemstimme ueber alle fuenf
 * Shorts) ergab 15,9. Der Unterschied klingt klein und ist es nicht: Bei
 * einem Short von rund 1.250 Zeichen sind das acht Sekunden, und acht
 * Sekunden entscheiden ueber das Zielfenster. Der Reise-Short galt mit 78,7
 * geschaetzten Sekunden als drin und lag gemessen bei 70,4.
 *
 * Die Richtung des Fehlers war die unguenstige: Wer zu lang schaetzt, baut zu
 * kurze Shorts — und merkt es erst, nachdem ElevenLabs abgerechnet hat.
 *
 * **Der Wert gehoert auf die gewaehlte Stimme gesetzt** und steht seit dem
 * 13.08.2026 auf Lenny (`6IEvIqBOPOMUc5HwR9sQ`), gemessen ueber
 * `npm run stimmproben`. Die Streuung zwischen Stimmen ist gross: vierzehn
 * geprobte deutsche Stimmen lagen zwischen 12,2 und 20,1 Zeichen je Sekunde.
 * Das entscheidet darueber, ob derselbe Text 76 oder 117 Sekunden dauert —
 * wer die Stimme wechselt, muss diesen Wert mitwechseln.
 *
 * **Seit dem 16.08.2026 steht hier eine Messung statt einer Probe.** Der Wert
 * war 17,4 und stammte aus 289 Zeichen einer Stimmprobe — eine Ansage in
 * Vorlesetonfall, nicht ein Short. Der erste vollstaendig vertonte Wochenlauf
 * liefert die belastbare Zahl: **2.479 Zeichen in 160,6 Sekunden, also 15,4**.
 * Dieselben Zeitstempel, aus denen der Renderer die Szenenlaengen nimmt.
 *
 * Der Fehler ging in die gefaehrliche Richtung. Zu hohe Zeichen/s heisst zu
 * kurz geschaetzt: Sieben Shorts galten als 20,8–23,3 s und lagen bei
 * 21,7–26,3 s. Alle noch im Fenster, aber die Zielmitte war rechnerisch
 * verfehlt — und wer bei 26,3 s landet, faellt beim naechsten Lauf durch die
 * Streuung heraus, ohne ein Wort geaendert zu haben.
 *
 * Bemerkenswert daneben: Die Systemstimme Anna misst ebenfalls 15,4. Die
 * kostenlose Probe traf die Produktionsstimme auf die erste Nachkommastelle,
 * und die teure Konstante lag daneben.
 *
 * Auch die neue Zahl bleibt eine Schaetzung fuer *ungesprochene* Entwuerfe:
 * Sobald ein Lauf `--mit-ton` gelaufen ist, gelten dessen echte Zeitstempel
 * und diese Formel spielt fuer den Short keine Rolle mehr.
 *
 * ## Offener Verdacht seit dem 24.08.2026
 *
 * `raumstation-alte-rechner` hat **506 Zeichen Sprechtext und 28,608 s
 * Tonspur** — das sind **17,7 Zeichen/s**, nicht 15,4. Die Sprechprobe
 * schaetzte fuer denselben Short 34,5 s. Ein Fehler von 15 %, und diesmal in
 * die *harmlose* Richtung: zu lang geschaetzt heisst, es wird zu viel
 * gestrichen.
 *
 * **Die Zahl wird trotzdem nicht geaendert**, weil eine Messung an einem
 * Video genau der Fehler waere, den dieser Kommentar oben beschreibt. Der
 * Verdacht hat aber eine plausible Ursache: Die Konstante wurde an Texten im
 * alten Telegrammstil gemessen — viele kurze Saetze, viele Satzpausen. Seit
 * dem 24.08.2026 verlangt `voice.md` in jedem gesprochenen Satz ein Verb, und
 * laengere Saetze laufen fluessiger durch.
 *
 * Waere das die Ursache, dann waere die Konstante nicht falsch gemessen,
 * sondern **fuer eine Sprache gemessen, die es nicht mehr gibt**. Nachmessen,
 * sobald vier Shorts im neuen Stil vertont sind — dann liegen genug Werte vor.
 *
 * ## 13,0 statt 15,4 — 25.08.2026, wegen des Modellwechsels
 *
 * Der Satz oben („nicht aendern, eine Messung an einem Video waere genau der
 * Fehler") gilt weiter fuer eine **unsichere** Zahl. Hier liegt ein anderer
 * Fall vor: Die 15,4 sind an `eleven_multilingual_v2` gemessen, und seit dem
 * Wechsel auf `eleven_v3` (Begruendung in `src/stimme.ts`) spricht das Modell
 * langsamer. Die Zahl ist damit nicht unsicher, sondern **fuer ein Modell
 * gemessen, das nicht mehr laeuft**.
 *
 * Drei Messungen auf v3, zusammen rund 800 Zeichen:
 *
 * | Was | Zeichen | Dauer | Rate |
 * |---|---|---|---|
 * | `passwort-wechseln`, zweistimmig, ganze Kette | 502 | 38,7 s ohne Pausen | **13,0** |
 * | Lenny, Vergleichstext | 148 | 11,5 s | 12,9 |
 * | Prayan, Vergleichstext | 148 | 11,7 s | 12,6 |
 *
 * Genommen wird **13,0**, die Rate **ohne** Pausen: Die Konstante rechnet je
 * Szene, und `szenendauerAus` addiert `pauseSek` getrennt. Mit Pausen waeren
 * es 12,1 — die Pausen zaehlten dann doppelt.
 *
 * **Was die Schaetzung weiterhin nicht kennt, sind die Sprecherwechsel.** Seit
 * dem 25.08. liegt zwischen zwei Redeanteilen einer Szene eine Pause von 0,28
 * Sekunden (`SPRECHERWECHSEL_SEK` in `src/stimme.ts`), und `szenendauerAus`
 * sieht sie nicht. Beim gemessenen Short fehlen dadurch rund 1,1 Sekunden.
 * Das ist der naechste Posten, nicht dieser.
 *
 * Die Basis bleibt duenn — 800 Zeichen gegen die 2.479, auf denen die 15,4
 * standen. Nachmessen, sobald vier Shorts auf v3 vertont sind.
 */
export const ZEICHEN_PRO_SEKUNDE = 13.0;

/**
 * Stille nach dem letzten Wort, in der die Signatur stehen bleibt.
 *
 * **Diese Zahl stand hier schon einmal — und war zu Recht weg.** Bis zum
 * 24.08.2026 addierte `gesamtdauerBilder` 0,8 Sekunden „damit die Endkarte
 * nicht auf dem letzten Wort abreisst"; die Endkarte war seit dem 18.08.2026
 * gestrichen, und uebrig blieb eine **leere Buehne** am Videoende. Aufgefallen
 * ist das am Standbild des letzten Bildes.
 *
 * Jetzt steht dort etwas: Der Zeiger blickt in die Richtung des Folgen-Knopfs,
 * und eine Geste, die mit dem letzten Wort verschwindet, sieht niemand.
 * Dieselbe Zahl, ein anderer Grund — und diesmal waechst die **Schlussszene**
 * mit, nicht nur die Komposition. Genau das war der alte Fehler.
 *
 * Wer sie streichen will: erst das letzte Bild eines Videos ziehen.
 */
export const NACHLAUF_SEK = 1.5;

/** Kurze Atempause nach jeder Szene, damit Schnitte nicht auf dem Wort sitzen. */
const PAUSE_NACH_SZENE_SEK = 0.32;

/**
 * Wie lange zwischen zwei Sprechern geschwiegen wird.
 *
 * Kuerzer als der Szenentrenner: Ein Wortwechsel ist eine Reaktion, und eine
 * Reaktion kommt schnell. Zu lang, und aus dem Schlagabtausch werden zwei
 * Monologe.
 *
 * **Steht hier und nicht in `stimme.ts`**, obwohl die Vertonung sie einlegt:
 * Sie ist eine Laenge, und Laengen wohnen in dieser Datei. Vorher stand sie
 * nur drueben — und die Schaetzung wusste deshalb nichts von ihr.
 */
export const SPRECHERWECHSEL_SEK = 0.28;

/**
 * Die Pause zwischen zwei Szenen, wenn der Sprecher dabei wechselt.
 *
 * Innerhalb eines Laufs entsteht die Szenenpause ueber den Trenner im Text;
 * nur wo die Vertonung schneidet, muss sie als Zahl danebenstehen. Die 0,45
 * sind der gemessene Wert des Trenners aus `npm run pausenprobe`, gerundet:
 * ` ... ` ergab 0,38 s, drei davon 0,86 s.
 */
export const SZENENTRENNER_SEK = 0.45;

/**
 * Untergrenzen je Szenenart: manche Bilder brauchen Zeit, egal wie kurz der
 * Text ist.
 *
 * Die Werte sind am 17.08.2026 gesunken, und zwar aus einem dramaturgischen
 * Grund, nicht aus einem rechnerischen: Der Bau hat jetzt sechs bis acht
 * Szenen statt vier bis sechs, weil ein Schnitt alle drei Sekunden im Feed
 * traegt und ein Textblock von fuenf Sekunden nicht. Untergrenzen, die aus der
 * Zeit der fuenf langen Karten stammen, wuerden diesen Takt verhindern.
 */
const MINDESTDAUER_SEK: Record<Szene['art'], number> = {
  text: 1.4,
  zahl: 2.0,
  /**
   * Die Zitatkarte traegt einen woertlichen Behoerdensatz — laenger und
   * sperriger als jeder Satz, den der Kanal selbst schreibt. Sie braucht
   * Lesezeit, nicht nur Sprechzeit.
   */
  zitatkarte: 2.6,
  /**
   * Die Frage steht, waehrend nichts gesprochen wird.
   *
   * Die Untergrenze stand kurz auf 4,0 Sekunden und war damit ein **Platzhalter
   * fuer die Denkpause**, die es im Datenvertrag noch nicht gab. Seit `pauseSek`
   * existiert, bestellt die Szene ihre Stille selbst, und die Untergrenze darf
   * wieder das sein, was sie ueberall sonst ist: die Zeit zum Lesen.
   *
   * „Wie viele Jahre für einen Stecker?" ist in anderthalb Sekunden erfasst.
   * Die Denkzeit kommt danach.
   */
  frage: 1.5,
  vergleich: 2.6,
  einschraenkung: 2.2,
  /**
   * Der Nachschlag traegt einen Satz, die Wortmarke und den Spruch.
   *
   * Hier stand die Endkarte mit 3,2 Sekunden, davor mit fuenf, „damit man sie
   * fotografieren kann". Fotografiert wurde nie etwas. Ein Satz plus Absender
   * ist in zweieinhalb Sekunden gelesen.
   */
  schluss: 2.5,
  /** Nur im Format `empfehlung`, das erst mit Affiliate-Links kommt. */
  kaufkriterien: 4.5,
};

/**
 * Standdauer einer Szene aus ihrer Sprechdauer.
 *
 * Getrennt von der Schaetzung, damit `npm run sprechprobe` mit einer
 * **gemessenen** Sprechdauer dieselbe Rechnung anstellen kann statt sie
 * nachzubauen. Die Mindestdauern und die Atempause gelten unabhaengig davon,
 * woher die Sprechdauer kommt: Ein Bild, das fuenf Sekunden stehen muss,
 * steht auch dann fuenf Sekunden, wenn der Satz darueber in dreien
 * gesprochen ist.
 */
export const szenendauerAus = (
  art: Szene['art'],
  sprechdauerSek: number,
  /**
   * Bestellte Pause nach dieser Szene. Ohne Angabe die Atempause.
   *
   * Am 17.08.2026 dazugekommen. Vorher rechnete die Schaetzung immer mit 0,32
   * Sekunden, waehrend die Vertonung bei `pauseSek` das Mehrfache einlegt —
   * die Vorschau lief also genau an der Stelle von der Wirklichkeit weg, an
   * der bewusst Zeit verbraucht wird. Bei der Denkpause des Montags sind das
   * mehr als zwei Sekunden auf ein Video von zwanzig.
   */
  pauseSek?: number,
): number => Math.max(MINDESTDAUER_SEK[art], sprechdauerSek) + (pauseSek ?? PAUSE_NACH_SZENE_SEK);

/**
 * Die Pausen, die **zwischen** den Sprechern entstehen und die
 * `szenendauerAus` nicht kennt.
 *
 * ## Der Fehler, den sie behebt
 *
 * `szenendauerAus` rechnet je Szene: Sprechdauer plus eine Atempause. Seit dem
 * Umbau auf zwei Stimmen legt die Vertonung aber **innerhalb** einer Szene
 * eine Pause ein, sobald die Figur wechselt — 0,28 Sekunden, die in keiner
 * Schaetzung standen. Bei vier Reaktionszeilen sind das 1,1 Sekunden je Short,
 * und sie fehlten in der Sprechprobe, in der Laengenpruefung und im
 * Szenenzeitplan der Vorschau.
 *
 * Dazu die kleinere Haelfte: Faellt der Sprecherwechsel auf eine
 * **Szenengrenze**, schneidet die Vertonung und legt `SZENENTRENNER_SEK` ein
 * statt der Atempause von 0,32 — also 0,13 Sekunden mehr, die hier
 * nachgetragen werden. Eine bestellte `pauseSek` bleibt aussen vor: Die zaehlt
 * `szenendauerAus` bereits.
 *
 * ## Warum sie `redelaeufe` nicht aufruft
 *
 * `redelaeufe` in `src/stimme.ts` ist die Wahrheit ueber diese Pausen — die
 * Regel hier ist ihr Abbild und kein zweiter Entwurf. Aufrufen laesst sie sich
 * trotzdem nicht: `stimme.ts` importiert `node:buffer`, und `gesamtdauerBilder`
 * laeuft ueber `calculateMetadata` **im Browser**. Ein Import von dort haenge
 * den Render an einem Modul auf, das dort nicht laedt.
 *
 * **Die Doppelung hat deshalb eine Wache**: `skripte/schemapruefung.ts` haelt
 * beide Rechnungen je Short nebeneinander und meldet jede Abweichung. Eine
 * Doppelung ohne Wache waere der eigentliche Fehler.
 */
export const zusatzpausenSzene = (short: Short, i: number): number => {
  const szene = short.szenen[i];
  const anteile = szene?.rede;
  if (!szene || anteile === undefined) return 0;

  let summe = 0;

  // Wechsel **innerhalb** der Szene: jede Naht zwischen zwei Sprechern.
  for (let j = 1; j < anteile.length; j += 1) {
    if (anteile[j]!.sprecher !== anteile[j - 1]!.sprecher) summe += SPRECHERWECHSEL_SEK;
  }

  // Und der Wechsel **an** der hinteren Grenze, der einen Schnitt erzwingt.
  const naechste = short.szenen[i + 1];
  if (naechste) {
    const letzter = anteile[anteile.length - 1]?.sprecher;
    const erster = naechste.rede?.[0]?.sprecher ?? 'nachleser';
    if (letzter !== undefined && letzter !== erster && szene.pauseSek === undefined) {
      summe += SZENENTRENNER_SEK - PAUSE_NACH_SZENE_SEK;
    }
  }

  return summe;
};

/**
 * Dieselben Pausen ueber den ganzen Short.
 *
 * **Je Szene und nicht nur als Summe**, weil sonst zwei Wahrheiten ueber
 * dieselbe Laenge entstuenden: `geschaetzteDauerSek` haette die Pausen
 * gezaehlt und `szenenZeitplan` nicht — der tonlose Render waere um bis zu
 * anderthalb Sekunden kuerzer gewesen als die Zahl, gegen die die
 * Laengenpruefung misst. Genau diese Sorte Widerspruch hat hier schon einmal
 * eine leere Buehne am Videoende produziert.
 */
export const zusatzpausenSek = (short: Short): number =>
  short.szenen.reduce((summe, _, i) => summe + zusatzpausenSzene(short, i), 0);

/** Geschaetzte Sprechdauer einer einzelnen Szene in Sekunden. */
export const geschaetzteSzenendauer = (szene: Szene): number =>
  szenendauerAus(szene.art, szene.sprechtext.length / ZEICHEN_PRO_SEKUNDE, szene.pauseSek);

/**
 * Startzeit und Dauer jeder Szene in Bildern.
 * Nutzt echte Zeitstempel, sobald die Tonspur vorliegt.
 */
export const szenenZeitplan = (short: Short): { startBild: number; dauerBilder: number }[] => {
  const fps = FORMAT.bilderProSekunde;

  if (short.tonspur) {
    const { szenenStartSek, dauerSek } = short.tonspur;
    return szenenStartSek.map((start, i) => {
      const letzte = i === szenenStartSek.length - 1;
      // Die letzte Szene traegt den Nachlauf mit, sonst endet sie mit dem Wort
      // und die Komposition liefe ueber eine leere Buehne weiter.
      const naechster = (szenenStartSek[i + 1] ?? dauerSek) + (letzte ? NACHLAUF_SEK : 0);
      return {
        startBild: Math.round(start * fps),
        dauerBilder: Math.max(1, Math.round((naechster - start) * fps)),
      };
    });
  }

  let laufend = 0;
  return short.szenen.map((szene, i) => {
    // Die Sprecherpausen gehoeren in die Szene, in der gewechselt wird —
    // sonst laufen Zeitplan und Gesamtdauer auseinander.
    const dauer = geschaetzteSzenendauer(szene) + zusatzpausenSzene(short, i);
    const eintrag = {
      startBild: Math.round(laufend * fps),
      dauerBilder: Math.max(1, Math.round(dauer * fps)),
    };
    laufend += dauer;
    return eintrag;
  });
};

/** Gesamtlaenge des Shorts in Bildern. */
export const gesamtdauerBilder = (short: Short): number => {
  if (short.tonspur) {
    /*
     * **Kein Nachlauf.** Hier standen bis zum 24.08.2026 0,8 Sekunden extra,
     * begruendet mit „damit die Endkarte nicht auf dem letzten Wort
     * abreisst" — und die Endkarte ist am 18.08.2026 gestrichen worden. Die
     * Zahl blieb stehen und produzierte seitdem am Ende jedes Videos 0,8
     * Sekunden **leere Buehne**: Die Sequences enden mit der letzten Szene,
     * die Komposition lief weiter.
     *
     * Aufgefallen beim Standbild des letzten Bildes — dort stand nur noch die
     * Kopfzeile. Genau dort setzt der Rundlauf an, und Leere ist der Vorhang,
     * den er nicht haben soll.
     */
    return Math.round((short.tonspur.dauerSek + NACHLAUF_SEK) * FORMAT.bilderProSekunde);
  }
  const plan = szenenZeitplan(short);
  const letzter = plan[plan.length - 1];
  return letzter ? letzter.startBild + letzter.dauerBilder : FORMAT.bilderProSekunde;
};

/**
 * Laengenvorgaben.
 *
 * Hier stand bis zum 15.08.2026 ein zweistufiges Modell: ein knappes Fenster
 * ohne Vertiefung, ein tiefes mit. Es ist ersatzlos entfallen — die Begruendung
 * steht an `ziel`.
 */
export const LAENGE_SEK = {
  /**
   * Das Zielfenster. **Seit dem 16.08.2026 eine Stufe statt dreier.**
   *
   * Hier standen bis dahin drei Zahlen fuer eine Frage: ein Fenster von 28
   * bis 40 Sekunden, eine „ausnahmslose" Grenze bei 45 und ein Minimum bei
   * 15. Die zweite Stufe war ein Rest aus der Zeit mit zwei Fenstern (mit und
   * ohne Vertiefung) — mit nur einem Fenster ist sie eine Regel ohne Aufgabe.
   *
   * Die Zahlen kommen aus zwei Messungen und einer Rechnung:
   *
   * - **15 bis 30 Sekunden** haben die hoechste Abschlussrate. Erklaerendes
   *   darf 35 bis 45, aber nur wenn der Nutzen frueh sichtbar ist — und
   *   „frueh sichtbar" ist bei einem Fakt je Video ohnehin die ganze Anlage.
   * - **Die Vertonung streut rund sechs Prozent.** Derselbe Text ergab bei
   *   zwei Laeufen 75,3 und 70,5 Sekunden; ElevenLabs liefert nicht zweimal
   *   dieselbe Aufnahme. Bei 23 Sekunden sind das ±1,4 s.
   * - Fuenf Szenen mit rund 370 Zeichen ergeben bei 17,4 Zeichen je Sekunde
   *   21,4 s Sprechzeit plus 1,6 s Pausen — also 23 s.
   *
   * Daraus folgt die Regel, die wichtiger ist als die Grenzen selbst:
   * **Zielwert ist die Mitte, nicht der Rand.** Wer an der Obergrenze baut,
   * faellt beim naechsten Lauf heraus, ohne ein Wort geaendert zu haben. Der
   * Zielwert steht seit dem 24.08.2026 bei 30 s; siehe unten.
   *
   * ## Die Obergrenze steht seit dem 20.08.2026 auf 34 statt 28
   *
   * Zwoelf fremde Tech-Shorts wurden angesehen und vermessen. Die drei mit den
   * meisten Aufrufen sind **41, 29 und 31 Sekunden** lang — das alte Fenster
   * haette alle drei abgelehnt. Der Median der Sammlung liegt bei rund 28 s,
   * also genau auf der alten Obergrenze.
   *
   * Die Gegenprobe steht in derselben Sammlung: 4,1 Mio Aufrufe bei 19 s,
   * 1,75 Mio bei 7 s. **Laenge ist keine Ursache, sondern eine Folge davon,
   * wie viel es zu zeigen gibt.** Ein Fenster, das die Obergrenze zur Aussage
   * ueber Qualitaet macht, misst die falsche Groesse.
   *
   * Der naheliegende Einwand — das „zu lang" der ersten Zuschauer — trifft die
   * Shorts mit dem alten Fenster von 28 bis 40 Sekunden, nicht eine Obergrenze
   * von 34. Und er kam von unserem Publikum, waehrend diese zwoelf Videos von
   * fremden Kanaelen stammen und ausdruecklich als Treffer ausgewaehlt wurden.
   *
   * ## Zielwert 30 statt 23, Fenster 20 bis 36 — seit dem 24.08.2026
   *
   * **Der Zielwert war die Ursache fuer eine Sprache, die niemand spricht.**
   * Aufgefallen ist es am ersten Video im neuen Bau: „Laptops, aelter als
   * fuenf Jahre." Kein Satz, kein Verb, ein Telegramm. Bei 23 Sekunden auf
   * sechs Szenen bleiben je Satz rund vier Sekunden, und dann wird gestrichen,
   * bis nur noch Stichworte stehen. Der Zwang kam nicht vom Fenster — 23 lag
   * bequem darin — sondern vom Zielwert, an dem tatsaechlich geschrieben wird.
   *
   * Dieselben zwoelf fremden Videos stuetzen die Verschiebung: Ihr Median
   * liegt bei rund 28 Sekunden, die drei staerksten bei 41, 31 und 29.
   *
   * Die Obergrenze geht mit, und zwar aus der Streuungsrechnung: Bei 30 s sind
   * sechs Prozent ±1,8 s, und die alte Grenze von 34 laege damit im
   * Wurfbereich. **Zielwert ist die Mitte, nicht der Rand** — 36 haelt den
   * Abstand, den die Regel verlangt.
   */
  /*
   * ## Fenster 20 bis 65 — seit dem 25.08.2026
   *
   * Zwoelf Shorts eines laufenden Kanals wurden vermessen (`@dr_data_dr`,
   * 91.000 Abonnenten, 44 Mio. Aufrufe): **48 bis 67 Sekunden**, Median rund
   * 61, das staerkste Video (3,2 Mio.) bei 51. **Kein einziges lag in unserem
   * alten Fenster.**
   *
   * Wichtiger als die neue Obergrenze ist aber, was daneben passiert ist: Der
   * **Zielwert haengt jetzt an der Bauform** (`BAUFORMEN[...].zielSek`), nicht
   * mehr einmal an allem. Vier Stationen brauchen mehr Zeit als ein
   * Wortwechsel, weil sie mehr Inhalt haben — „Laenge ist keine Ursache,
   * sondern eine Folge davon, wie viel es zu zeigen gibt" stand schon oben,
   * nur fehlte die Folgerung.
   *
   * **Und der Zielwert ist erstmals eine Wache statt eines Kommentars.** Bis
   * hierher stand er nur in diesem Text; geprueft wurde allein das Fenster.
   * Mit 65 als Obergrenze liefe eine Wechselrede von 60 Sekunden stumm durch,
   * deshalb meldet `shortPruefen` jede Abweichung von mehr als einem Fuenftel
   * vom Zielwert der jeweiligen Bauform.
   *
   * Der Einwand gehoert daneben: Das „zu lang" der ersten Zuschauer galt
   * Videos von 28 bis 40 Sekunden. Wir halten Langeweile fuer die Ursache und
   * wissen es nicht sicher — eine Bauform mit 55 Sekunden ist eine Wette.
   */
  ziel: [20, 65] as const,
  /**
   * Die Hook spricht hoechstens dreieinhalb Sekunden.
   *
   * Eingefuehrt am 15.08.2026, nachdem die Hook des Kabel-Shorts 14,0 s
   * dauerte. 71 Prozent der Zuschauer entscheiden in den ersten Sekunden, ob
   * sie bleiben — eine Hook, die laenger braucht als diese Entscheidung, ist
   * keine Hook, sondern der Anfang des Videos.
   *
   * 3,5 s sind bei 17,4 Zeichen je Sekunde rund 60 Zeichen. Ein Satz.
   */
  hookMaximum: 3.5,
} as const;

export const zielfenster = (): readonly [number, number] => LAENGE_SEK.ziel;

/* ───────────────────────── Laengenklassen ──────────────────────────── */

/**
 * Die Klassen, in denen der Ruecklauf Laengen vergleicht.
 *
 * **Sie werden aus `BAUFORMEN` abgeleitet und nicht danebengeschrieben.** Die
 * Zielwerte sagen, welche Laengen wir ueberhaupt anstreben; eine zweite,
 * handgeschriebene Einteilung waere eine Doppelung ohne Wache und liefe beim
 * ersten Umbau lautlos auseinander — genau der Fehler, den `rede` neben
 * `sprechtext` nur deshalb nicht macht, weil dort eine harte Gleichheit
 * prueft.
 *
 * Die Grenze liegt jeweils **in der Mitte zwischen zwei benachbarten
 * Zielwerten**: Bei 25 / 35 / 45 / 60 sind das 30, 40 und 53. Damit liegt
 * jeder Zielwert mittig in seiner Klasse, und eine Bauform, die ihr Ziel
 * trifft, landet in ihrer eigenen Klasse.
 *
 * Zwei Bauformen mit demselben Zielwert teilen sich eine Klasse. Das ist kein
 * Sonderfall, sondern die richtige Antwort: Sie sind dann in dieser Hinsicht
 * dasselbe, und genau deshalb wurden die Zielwerte am 26.08.2026 gespreizt.
 */
export type Laengenklasse = { name: string; von: number; bis: number };

const klassenAusZielwerten = (): Laengenklasse[] => {
  const ziele = [...new Set(Object.values(BAUFORMEN).map((b) => b.zielSek))].sort((a, b) => a - b);
  const grenzen = ziele.slice(0, -1).map((z, i) => Math.round((z + ziele[i + 1]!) / 2));

  return ziele.map((_, i) => {
    const von = i === 0 ? 0 : grenzen[i - 1]!;
    const bis = i === ziele.length - 1 ? Infinity : grenzen[i]!;
    return {
      name: von === 0 ? `bis ${bis} s` : bis === Infinity ? `über ${von} s` : `${von}–${bis} s`,
      von,
      bis,
    };
  });
};

export const LAENGENKLASSEN = klassenAusZielwerten();

/** In welche Klasse eine Dauer faellt. Die letzte Klasse ist nach oben offen. */
export const laengenklasseVon = (sek: number): Laengenklasse =>
  LAENGENKLASSEN.find((k) => sek >= k.von && sek < k.bis) ?? LAENGENKLASSEN[LAENGENKLASSEN.length - 1]!;

/**
 * Geschaetzte Gesamtlaenge in Sekunden, ohne Tonspur.
 *
 * Damit laesst sich die Laenge schon **vor** der Vertonung pruefen. Vorher
 * lief die Laengenpruefung nur ueber `short.tonspur` — wer also einen zu
 * kurzen Short schrieb, erfuhr es erst, nachdem die Sprachsynthese
 * abgerechnet war. Bei rund 1.400 Zeichen je Short ist das die teuerste
 * Stelle, an der eine Rueckmeldung zu spaet kommt.
 */
export const geschaetzteDauerSek = (short: Short): number =>
  short.szenen.reduce((summe, szene) => summe + geschaetzteSzenendauer(szene), 0) +
  zusatzpausenSek(short);
