import { Buffer } from 'node:buffer';
import { stilleBeschneidenPuffer } from './medien';
import type { Redeanteil, Short, Sprecher, Untertitelwort, Zug } from './typen';
import { KALTSTART_ARTEN, regieVorrat } from './typen';
import {
  SPRECHERWECHSEL_SEK,
  SZENENGRENZE_SEK,
  ansageAbSek,
  VORHANGFAHRT_SEK,
  ZEICHEN_PRO_SEKUNDE,
  themaAnsage,
} from './zeit';

/**
 * Sprachsynthese und Zeitstempel.
 *
 * Kernidee: Der gesamte Short wird in **einem** Aufruf vertont, nicht Szene
 * fuer Szene. Das gibt der Stimme durchgehende Betonung und natuerliche
 * Uebergaenge zwischen den Saetzen. Die Grenzen der einzelnen Szenen werden
 * anschliessend aus den Zeichen-Zeitstempeln zurueckgerechnet.
 *
 * Damit stimmen Bild und Ton konstruktionsbedingt ueberein — es gibt keine
 * Schaetzung, die auseinanderlaufen koennte.
 */

const API = 'https://api.elevenlabs.io/v1';

/**
 * Das Sprachmodell. **Seit dem 25.08.2026 `eleven_v3`.**
 *
 * ## Warum der Wechsel
 *
 * Hier stand `eleven_multilingual_v2`, das Modell von 2024, und es war der
 * Grund fuer eine Suche, die ins Leere lief: Fuer die zweite Figur wurden
 * **26 Stimmen** synthetisiert und vermessen — Erzaehler, Trickfilmstimmen,
 * junge Gespraechsstimmen — und Emirhans Urteil war jedes Mal dasselbe. Bei
 * der Trefferquote liegt der Fehler nicht in der Auswahl.
 *
 * Die Gegenprobe war eindeutig: dieselbe Stimme (Lenny, die laufende
 * Kanalstimme), derselbe Text, einmal durch v2 und einmal durch v3. Das
 * Ergebnis war nicht eine andere Stimme, sondern eine bessere.
 *
 * ## Was v3 zusaetzlich kann
 *
 * **Regieanweisungen im Text**, in eckigen Klammern: `[thoughtful]`,
 * `[annoyed]`, `[surprised]`. Fuer Watti ist das keine Spielerei — seine
 * Macharten heissen Ratlosigkeit, Gestaendnis und falscher Schluss
 * (`MACHARTEN` in `src/typen.ts`), und die lassen sich damit
 * **ansagen**, statt zu hoffen, dass die Stimme sie errät. Kein aelteres
 * Modell kann das.
 *
 * **Welche es gibt, steht in der Doku und nicht im Gedaechtnis.** Am
 * 26.08.2026 wurden hier sechs Tags an die Macharten gebunden, die ich aus dem
 * Kopf gewaehlt hatte — einer davon, `[confused]`, existiert gar nicht, und er
 * stand seit dem 25.08. an dieser Stelle als Beispiel. Bei Quellen verbietet
 * dieses Projekt genau das.
 *
 * ## Was es kostet
 *
 * **Sprechzeit, und zwar ungleichmaessig je Stimme.** Derselbe Text: Lenny
 * 8,9 s auf v2 gegen 11,5 s auf v3, Prayan 9,1 gegen 11,7 — beide rund ein
 * Viertel langsamer. Olaf lief umgekehrt schneller. `ZEICHEN_PRO_SEKUNDE` in
 * `src/zeit.ts` steht auf 15,4 und ist an v2 gemessen; auf v3 liegt Lenny bei
 * 12,9. **Die Konstante gehoert neu gemessen**, sonst plant das Projekt mit
 * einer Zahl aus dem alten Modell.
 *
 * Geprueft wurde vorher, dass die Schnittstelle mitkommt: Alle vier Modelle
 * liefern `with-timestamps` samt Zeichenausrichtung. Daran haengen Untertitel,
 * Szenengrenzen und die Aufschlagpruefung — ohne sie waere der Wechsel
 * unmoeglich gewesen, und das war keine Annahme, sondern ein Test.
 */
const MODELL = 'eleven_v3';

export type Sprecheinstellung = {
  stimmeId: string;
  /** 0 = sehr variabel, 1 = sehr gleichfoermig. Locker heisst eher niedrig. */
  stabilitaet: number;
  /** Wie stark die Stimme dem Original aehnelt. */
  aehnlichkeit: number;
  /** Ausdrucksstaerke. Zu hoch klingt schnell theatralisch. */
  ausdruck: number;
  /** Sprechtempo. 1.0 ist Normaltempo. */
  tempo: number;
};

/**
 * Voreinstellung fuer Ganz akkurat: maennlich, locker, erklaerend.
 *
 * ## Die 0,45 ist seit dem 30.08.2026 gehoert, nicht geerbt
 *
 * Sie stand hier aus der v2-Zeit, mit einem Kommentar, der einen stufenlosen
 * Regler beschrieb — v3 kennt drei Stufen, und die robuste daempft
 * Regieanweisungen. Damit war offen, wo unsere Zahl ueberhaupt landet, und
 * eine Tag-Probe haette gegen eine Einstellung gemessen, die den Tag
 * womoeglich gerade wegregelt.
 *
 * `npm run stimmprobe-v3` hat vier Stufen an derselben Zeile abgelegt
 * (`laeufe/stimmprobe-v3/`). **Entschieden wurde am Ohr: 0,45 klingt ideal.**
 * Die Zahl bleibt also, aber sie steht jetzt auf einem Vergleich statt auf
 * einer Uebernahme.
 *
 * **Die Messung selbst hat nichts beigetragen, und das gehoert dazu.** Dauer
 * und Klammerspanne streuen so stark, dass keine Reglerwirkung ablesbar war —
 * dieselbe Zeile ergab 2,56 bis 3,12 Sekunden, und `speed 0.8` kam kuerzer
 * heraus als `speed 1.0`. Wer die Regler nachmisst, misst die Streuung.
 */
export const KANAL_STIMME: Omit<Sprecheinstellung, 'stimmeId'> = {
  stabilitaet: 0.45,
  aehnlichkeit: 0.75,
  ausdruck: 0.35,
  /** Normaltempo. Langsamer wurde am 30.08.2026 gehoert und nicht gewaehlt. */
  tempo: 1.0,
};

type Ausrichtung = {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
};

export type Synthese = {
  ton: Buffer;
  dauerSek: number;
  woerter: Untertitelwort[];
  /** Zeichenweise Ausrichtung, Grundlage fuer die Szenengrenzen. */
  ausrichtung: Ausrichtung;
};

/**
 * Eine bestellte Pause. Nur wo eine Szene ausdruecklich `pauseSek` setzt.
 *
 * ElevenLabs haelt die Zeit auf ein Zehntel genau ein (2,5 s bestellt, 2,60 s
 * gemessen, `npm run pausenprobe`). Auslassungspunkte taten das nicht: Sie
 * skalieren schwach und unvorhersehbar, und die erste Fassung der Denkpause
 * kam damit im fertigen Short auf eine einzige Sekunde.
 *
 * Der Tag wird **nicht vorgelesen**, taucht aber in der Zeichenausrichtung
 * auf — `woerterAusAusrichtung` filtert alles zwischen `<` und `>` heraus,
 * sonst stuende „time=2.5s" im Untertitel.
 */
const pause = (sek: number): string => ` <break time="${sek.toFixed(1)}s" /> `;

/**
 * Wandelt die zeichenweise Ausrichtung in Woerter um.
 * Untertitel arbeiten mit Woertern, die Schnittstelle liefert Zeichen.
 */
export const woerterAusAusrichtung = (a: Ausrichtung): Untertitelwort[] => {
  const woerter: Untertitelwort[] = [];
  let aktuell = '';
  let start = 0;

  const abschliessen = (ende: number) => {
    const bereinigt = aktuell.trim();
    // Reine Trennerpunkte sind Pausenmarker, kein gesprochenes Wort.
    if (bereinigt.length > 0 && bereinigt !== '...') {
      woerter.push({ wort: bereinigt, startSek: start, endeSek: ende });
    }
    aktuell = '';
  };

  /*
   * **Zwei Sorten Tags, beide unsichtbar.**
   *
   * `<break time="2.5s" />` bestellt eine Pause. Ohne den Filter stuenden
   * „<break", „time=1.8s" und „/>" als drei Woerter im Untertitel — die
   * Zeichenausrichtung liefert sie mit, obwohl die Stimme sie nicht spricht.
   *
   * `[thoughtful]`, `[sighs]`, `[laughs]` sind die **Regieanweisungen von
   * `eleven_v3`**. Sie kamen am 25.08.2026 mit dem Modellwechsel dazu, und der
   * Filter kannte sie nicht: Die eckige Klammer waere Wort fuer Wort im
   * Untertitel gelandet. Aufgefallen beim Nachsehen, nicht im fertigen Video —
   * dort haette „[thoughtful]" gross ueber der Buehne gestanden.
   */
  let imTag = false;
  let schluss = '>';

  for (let i = 0; i < a.characters.length; i += 1) {
    const zeichen = a.characters[i]!;
    const von = a.character_start_times_seconds[i] ?? 0;
    const bis = a.character_end_times_seconds[i] ?? von;

    if (!imTag && (zeichen === '<' || zeichen === '[')) {
      abschliessen(a.character_end_times_seconds[i - 1] ?? bis);
      imTag = true;
      schluss = zeichen === '<' ? '>' : ']';
      continue;
    }
    if (imTag) {
      if (zeichen === schluss) imTag = false;
      continue;
    }

    if (/\s/.test(zeichen)) {
      abschliessen(a.character_end_times_seconds[i - 1] ?? bis);
    } else {
      if (aktuell === '') start = von;
      aktuell += zeichen;
    }
  }
  abschliessen(a.character_end_times_seconds[a.character_end_times_seconds.length - 1] ?? 0);

  return woerter;
};

/**
 * Die Zeichen, die wirklich gesprochen werden.
 *
 * Kleine Schwester von `woerterAusAusrichtung` darueber, und sie muss es
 * bleiben: **Dieselbe Regel, zwei Leser.** Dort werden Break-Tags (`< … >`) und
 * Regieanweisungen (`[ … ]`) aus dem Untertitel gehalten, hier aus der
 * Laengenerwartung. Liefe die eine Fassung der anderen davon, waere die
 * Erwartung fuer jede Zeile mit Regieanweisung zu hoch — und bei einer Zeile
 * von 26 Zeichen ist `[thoughtful]` rund 40 % des Textes.
 */
export const gesprocheneZeichen = (text: string): number =>
  text.replace(/\[[^\]]*\]/g, '').replace(/<[^>]*>/g, '').length;

/**
 * Wie lange eine Synthese dieses Textes hoechstens dauern darf.
 *
 * ## Der Befund (31.08.2026)
 *
 * `eleven_v3` halluziniert bei kurzen Eingaben. Fuenf Laeufe mit identischem
 * 18-Zeichen-Text ergaben 4,80 · 5,04 · 2,08 · 4,24 · **415,84** Sekunden —
 * sieben Minuten Ton fuer vier Woerter. Die Zahlen stehen ausfuehrlich an
 * `vorspannFestSek` in `src/zeit.ts` und in `skripte/vorspannton.ts`; hier steht,
 * was daraus folgt.
 *
 * ## Warum die Schwelle aus dem Text kommt und nicht fest ist
 *
 * `skripte/vorspannton.ts` durfte eine feste Grenze von 4 Sekunden nehmen: Der
 * laengste Text dort hat 26 Zeichen. Im Wochenlauf reichen die Redelaeufe von
 * 20 bis 185 Zeichen — eine feste Sekundenzahl waere fuer den einen zu eng und
 * fuer den anderen wirkungslos.
 *
 * ## Warum Sockel **plus** Faktor
 *
 * Gerechnet an den fuenf Messwerten oben (18 Zeichen, erwartet 1,26 s):
 *
 * | Regel | Grenze | gesunde durch | Grenze bei 185 Z. |
 * |---|---|---|---|
 * | fest 4 s | 4,00 | 1 von 4 | 4,0 — unbrauchbar |
 * | reiner Faktor 3 | 3,78 | 1 von 4 | 38,8 |
 * | reiner Faktor 4,5 | 5,66 | 4 von 4 | 58,2 — zu lasch |
 * | **1,5 × erwartet + 4 s** | **5,89** | **4 von 4** | **23,4** |
 *
 * Der feste Anteil ist Ansatz, Endpause und Ausklang. Der **skaliert nicht mit
 * der Textlaenge**, gehoert also als Summand hinein und nicht als Faktor —
 * genau daran scheitert der reine Faktor 3 an zwei gesunden Laeufen.
 *
 * ## Woher die 1,5 kommt
 *
 * `ZEICHEN_PRO_SEKUNDE` streut gemessen zwischen 12,9 und 15,3; der langsamste
 * Short braucht damit das 1,11-fache. Die 16 Laeufe des bezahlten Laufs vom
 * 30.08. gehen bis **1,25**. 1,5 laesst darueber hinaus Luft fuer Betonung und
 * Zeichensetzung.
 *
 * ## Warum sie grosszuegig sein darf
 *
 * Zwischen dem laengsten gesunden Lauf (5,04 s) und dem kaputten (415,84 s)
 * liegt **Faktor 82**. Die Wache muss nicht scharf sein, sie muss irgendwo in
 * dieser Luecke liegen. Jede Schaerfe wird mit Fehlalarmen bezahlt, und ein
 * Fehlalarm kostet hier echtes Kontingent — fuer einen Gewinn, den es nicht
 * gibt. An den 16 bezahlten Laeufen erzeugt diese Schwelle **null**
 * Zusatzaufrufe; der knappste liegt bei Faktor 1,68.
 *
 * ## Was sie nicht kann
 *
 * Zwei kaputte Laeufe hintereinander faengt sie nicht — deshalb protokolliert
 * `synthetisieren` den Fall, statt ihn still durchgehen zu lassen.
 *
 * ## Und der Vorbehalt zu `pause()`
 *
 * `pause()` weiter oben ist seit dem 31.08.2026 **toter Code** (nachgeprueft:
 * kein Aufrufer) — die Pausen entstehen jetzt ueber `pauseDavorSek` zwischen
 * den Abschnitten. Solange das so bleibt, enthaelt kein Lauftext bestellte
 * Stille. Wird der Break-Tag je wiederbelebt, **muss seine Zeit hier addiert
 * werden**, sonst loest jede Denkpause die Wache aus.
 */
const TEMPO_TOLERANZ = 1.5;
const SOCKEL_SEK = 4.0;

/**
 * Ab hier ist es keine Streuung mehr, sondern ein kaputter Lauf.
 *
 * Bewusst grob: Zwischen „etwas zu lang" und „das Modell redet weiter" liegen
 * zwei Groessenordnungen, da braucht die Trennlinie keine Praezision.
 */
const ABSURD_ZUSCHLAG_SEK = 60;

export const plausibelBisSek = (text: string): number =>
  (gesprocheneZeichen(text) / ZEICHEN_PRO_SEKUNDE) * TEMPO_TOLERANZ + SOCKEL_SEK;

export const absurdAbSek = (text: string): number =>
  gesprocheneZeichen(text) / ZEICHEN_PRO_SEKUNDE + ABSURD_ZUSCHLAG_SEK;

/** Startzeit jeder Szene, ermittelt ueber die Zeichenposition im Gesamttext. */
export const szenenStartzeiten = (a: Ausrichtung, szenenOffsets: number[]): number[] =>
  szenenOffsets.map((offset, i) => {
    if (i === 0) return 0;
    const index = Math.min(offset, a.character_start_times_seconds.length - 1);
    return a.character_start_times_seconds[index] ?? 0;
  });

/**
 * Wie oft ein Aufruf wiederholt wird, und wie lange dazwischen gewartet wird.
 *
 * Am 17.08.2026 ist die Vertonung desselben Shorts zweimal an ElevenLabs
 * gescheitert, mit zwei verschiedenen Gesichtern: einmal HTTP 200 mit leerem
 * Rumpf („Unexpected end of JSON input"), einmal `fetch failed`, also gar
 * keine Verbindung. Beide Male lief der naechste Versuch von Hand sauber
 * durch; Netz und Dienst waren nachweislich in Ordnung (api.elevenlabs.io
 * antwortete in 0,47 s).
 *
 * Ohne Wiederholung ist das im Wochenlauf teuer und nicht bloss laestig: Der
 * Lauf bricht beim vierten von acht Shorts ab, drei Vertonungen sind bezahlt,
 * und beim naechsten Anlauf werden sie noch einmal bezahlt. Ein Aussetzer im
 * Netz darf keinen Lauf kosten.
 *
 * Drei Versuche, dazwischen 2 und 4 Sekunden. Wer haeufiger scheitert, hat
 * kein Zuckeln, sondern eine Stoerung — und die soll sichtbar werden.
 */
const VERSUCHE = 3;
const WARTEN_MS = [2000, 4000];

const warte = (ms: number) => new Promise((fertig) => setTimeout(fertig, ms));

/**
 * Ruft die Sprachsynthese auf und liefert Ton samt Zeitstempeln.
 *
 * Wiederholt bei Netz- und Serverfehlern, **nicht** bei 4xx: Ein abgelehnter
 * Schluessel, ein aufgebrauchtes Kontingent oder eine unbekannte Stimme
 * werden beim dritten Mal genauso abgelehnt. Wiederholen wuerde die
 * Fehlermeldung nur um sechs Sekunden verzoegern.
 */
const mitWiederholung = async (
  text: string,
  einstellung: Sprecheinstellung,
  schluessel: string,
): Promise<Synthese> => {
  let letzter: Error | undefined;

  for (let versuch = 1; versuch <= VERSUCHE; versuch++) {
    try {
      return await einmalSynthetisieren(text, einstellung, schluessel);
    } catch (fehler) {
      const f = fehler as Error & { endgueltig?: boolean };
      if (f.endgueltig) throw f;
      letzter = f;
      if (versuch < VERSUCHE) {
        console.log(`   ↻ Versuch ${versuch} fehlgeschlagen (${f.message}) – neuer Versuch`);
        await warte(WARTEN_MS[versuch - 1] ?? 4000);
      }
    }
  }

  throw new Error(`Sprachsynthese nach ${VERSUCHE} Versuchen fehlgeschlagen: ${letzter?.message}`);
};

/**
 * Die Plausibilitaetswache um einen Syntheseaufruf herum.
 *
 * ## Warum sie ihren Beschaffer als Parameter nimmt
 *
 * `hol` ist **kein Testzubehoer**, sondern der Grund, aus dem diese Wache
 * ueberhaupt pruefbar ist, ohne ElevenLabs zu bezahlen: `skripte/plausibelprobe.ts`
 * fuettert eine Attrappe mit vorgegebenen Dauern und zaehlt die Aufrufe. Eine
 * Wache gegen einen Fehler, der Geld kostet, darf zum Pruefen nicht selbst
 * Geld kosten.
 *
 * ## Warum sie ausserhalb der Fehlerwiederholung liegt
 *
 * `mitWiederholung` versucht bis zu dreimal. Laege die Wache **innen**,
 * koennten sich Netzfehler und Verdacht zu neun Aufrufen multiplizieren. Es
 * sind zwei verschiedene Fragen: „kam eine Antwort?" und „ist die Antwort
 * plausibel?".
 *
 * ## Warum ein Zusatzversuch und nicht drei wie nebenan
 *
 * `skripte/vorspannton.ts` synthetisiert **immer** dreimal und nimmt die
 * kuerzeste. Das ist dort richtig: zehn Aufnahmen, einmal bezahlt, nie wieder.
 * Hier sind es rund 56 Aufrufe je Wochenlauf — dreimal waere eine
 * Verdreifachung der laufenden Kosten fuer einen Fall, der bei ueber dreissig
 * Zeichen selten ist. Der Normalfall bleibt **ein** Aufruf.
 *
 * ## Und warum ueber der Grenze weitergemacht wird
 *
 * Bleibt auch der zweite Lauf zu lang, ohne absurd zu sein, gewinnt die
 * kuerzere und der Lauf geht weiter. Ein Abbruch behebt den Fehler nicht,
 * kostet aber **alle vorher vertonten Shorts noch einmal**: `--ton-behalten`
 * sucht `props`-Dateien, und die entstehen erst, nachdem alle Shorts vertont
 * sind. Deshalb Warnung statt Wurf — und deshalb sammelt `shortVertonen` die
 * Faelle, statt sie nur ins Protokoll zu schreiben.
 *
 * Absurd ist die Ausnahme: Bei sieben Minuten Ton ist Weitermachen kein
 * Entgegenkommen, sondern Schaden. `uhr` waechst mit, `gesamtdauerBilder`
 * skaliert mit, und der Render brennt Rechenzeit fuer etwas, das niemand
 * veroeffentlichen wird.
 */
export const mitWache = async (
  hol: () => Promise<Synthese>,
  text: string,
  wofuer: string,
  wache = true,
): Promise<Synthese & { unplausibel?: string }> => {
  const erste = await hol();
  if (!wache) return erste;

  const grenze = plausibelBisSek(text);
  if (erste.dauerSek <= grenze) return erste;

  console.log(
    `   ⟳ ${wofuer}: ${erste.dauerSek.toFixed(1)}s statt höchstens ${grenze.toFixed(1)}s ` +
      `(${gesprocheneZeichen(text)} Zeichen) – Verdacht, zweiter Versuch`,
  );

  const zweite = await hol();
  if (zweite.dauerSek <= grenze) return zweite;

  const kuerzere = zweite.dauerSek < erste.dauerSek ? zweite : erste;

  if (kuerzere.dauerSek > absurdAbSek(text)) {
    throw new Error(
      `Die Synthese von „${wofuer}" ist zweimal unbrauchbar zurückgekommen: ` +
        `${erste.dauerSek.toFixed(1)}s und ${zweite.dauerSek.toFixed(1)}s für ` +
        `${gesprocheneZeichen(text)} Zeichen (erwartet rund ` +
        `${(gesprocheneZeichen(text) / ZEICHEN_PRO_SEKUNDE).toFixed(1)}s). ` +
        `Text: „${text.slice(0, 80)}${text.length > 80 ? '…' : ''}"`,
    );
  }

  const meldung =
    `${wofuer}: ${kuerzere.dauerSek.toFixed(1)}s statt höchstens ${grenze.toFixed(1)}s ` +
    `(${gesprocheneZeichen(text)} Zeichen)`;
  console.log(`   ⚠ ${meldung} – bleibt unplausibel, die kürzere gewinnt`);
  return { ...kuerzere, unplausibel: meldung };
};

/**
 * Ruft die Sprachsynthese auf und liefert Ton samt Zeitstempeln.
 *
 * Wiederholt bei Netz- und Serverfehlern, **nicht** bei 4xx: Ein abgelehnter
 * Schluessel, ein aufgebrauchtes Kontingent oder eine unbekannte Stimme
 * werden beim dritten Mal genauso abgelehnt. Wiederholen wuerde die
 * Fehlermeldung nur um sechs Sekunden verzoegern.
 *
 * **`wache` ist ein Schalter und keine Voreinstellung**, und das ist Absicht.
 * `skripte/stimmproben.ts`, `stimmprobe-v3.ts` und `pausenprobe.ts` rufen diese
 * Funktion auf, um genau die Streuung zu **messen**, die die Wache abfaengt.
 * Eine stille Wiederholung dort misst die Wache statt das Modell — und
 * `vorspannton.ts` hat mit „dreimal, kuerzeste gewinnt" seine eigene, dort gut
 * begruendete Regel; zwei uebereinandergelegte Wachen waeren undurchschaubar.
 */
export const synthetisieren = async (
  text: string,
  einstellung: Sprecheinstellung,
  schluessel: string,
  wache = false,
  wofuer = 'Synthese',
): Promise<Synthese & { unplausibel?: string }> =>
  mitWache(() => mitWiederholung(text, einstellung, schluessel), text, wofuer, wache);

const einmalSynthetisieren = async (
  text: string,
  einstellung: Sprecheinstellung,
  schluessel: string,
): Promise<Synthese> => {
  const antwort = await fetch(`${API}/text-to-speech/${einstellung.stimmeId}/with-timestamps`, {
    method: 'POST',
    headers: { 'xi-api-key': schluessel, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      model_id: MODELL,
      voice_settings: {
        stability: einstellung.stabilitaet,
        similarity_boost: einstellung.aehnlichkeit,
        style: einstellung.ausdruck,
        speed: einstellung.tempo,
        use_speaker_boost: true,
      },
    }),
  });

  if (!antwort.ok) {
    const rohtext = await antwort.text();
    const fehler = new Error(
      `Sprachsynthese fehlgeschlagen (HTTP ${antwort.status}): ${rohtext.slice(0, 300)}`,
    ) as Error & { endgueltig?: boolean };
    /*
     * 4xx heisst: Der Aufruf war falsch, nicht der Zeitpunkt. Abgelehnter
     * Schluessel, aufgebrauchtes Kontingent, unbekannte Stimme — alles davon
     * scheitert beim dritten Mal genauso. Nur 429 ist die Ausnahme, das ist
     * ausdruecklich eine Bitte, spaeter wiederzukommen.
     */
    fehler.endgueltig = antwort.status >= 400 && antwort.status < 500 && antwort.status !== 429;
    throw fehler;
  }

  /*
   * Der leere Rumpf mit HTTP 200.
   *
   * Genau das kam am 17.08.2026 zurueck, und weil die Antwort direkt in
   * `JSON.parse` lief, hiess die Meldung „Unexpected end of JSON input". Das
   * schickt einen zum eigenen Text — man sucht den Fehler im Sprechtext, im
   * Break-Tag, im Schema —, waehrend der Dienst gehustet hat. Eine
   * Fehlermeldung, die in die falsche Richtung zeigt, kostet mehr Zeit als
   * gar keine.
   */
  const rohtext = await antwort.text();
  if (rohtext.trim() === '') {
    throw new Error('ElevenLabs antwortete mit HTTP 200, aber ohne Inhalt.');
  }

  const daten = JSON.parse(rohtext) as { audio_base64: string; alignment: Ausrichtung };
  const ausrichtung = daten.alignment;
  const woerter = woerterAusAusrichtung(ausrichtung);
  const enden = ausrichtung.character_end_times_seconds;

  return {
    ton: Buffer.from(daten.audio_base64, 'base64'),
    dauerSek: enden[enden.length - 1] ?? 0,
    woerter,
    ausrichtung,
  };
};

/**
 * Die Redelaeufe eines Shorts — ein Lauf je zusammenhaengendem Stueck **einer**
 * Figur.
 *
 * Nicht ein Lauf je Redeanteil: Sagt dieselbe Figur zwei Saetze hintereinander,
 * gehoeren die in einen Aufruf, sonst reisst die Betonung mittendrin ab.
 * Und nicht ein Lauf je Sprecher: Dann kaeme Wattis ganze Rolle am Stueck und
 * die Reihenfolge waere hin.
 *
 * Szenen ohne `rede` ergeben einen einzigen Lauf mit `nachleser` — der
 * einstimmige Fall bleibt damit genau der von vorher.
 */
export type Redelauf = {
  sprecher: Sprecher;
  /**
   * Der Zug dieses Laufs. Bei verschmolzenen Anteilen der **erste**.
   *
   * Er wandert von hier in `abschnitte[].zug` und von dort ueber
   * `Sprecherstand` in die Haltung der Figur. Warum der erste gewinnt und die
   * Verschmelzung nicht aufgebrochen wird, steht bei `redelaeufe`.
   */
  zug: Zug;
  /** Der fertig verkettete Text dieses Laufs, samt Szenentrennern. */
  text: string;
  /**
   * Wo in `text` jede Szene beginnt, die in diesem Lauf anfaengt.
   *
   * Ein Lauf kann **mehrere Szenen** umfassen — genau dafuer gibt es das Feld:
   * Solange dieselbe Figur weiterspricht, bleibt es ein Aufruf, und die
   * Szenengrenzen werden hinterher aus der Zeichenausrichtung gelesen. Der
   * einstimmige Short bleibt damit ein einziger Aufruf, wie vor dem Umbau.
   */
  szenenOffsets: { szene: number; offset: number }[];
  /** Pause **vor** diesem Lauf, in Sekunden. */
  pauseDavorSek: number;
};


/**
 * Die Redelaeufe eines Shorts — ein Lauf je zusammenhaengendem Stueck **einer**
 * Figur, ueber Szenengrenzen hinweg.
 *
 * **Ueber Szenengrenzen hinweg ist der Punkt.** Der erste Anlauf schnitt an
 * jeder Szene, und damit machte ein einstimmiger Short sechs Aufrufe statt
 * einem — genau gegen die Begruendung, aus der die Verkettung ueberhaupt
 * existiert: durchgehende Betonung und natuerliche Uebergaenge. Aufgefallen ist
 * es an `erstes-laden`, das gar keine zweite Stimme hat und trotzdem
 * zerschnitten wurde.
 *
 * Szenen ohne `rede` zaehlen als `nachleser`. Der einstimmige Fall ergibt damit
 * genau einen Lauf mit demselben Text wie vorher.
 */
/**
 * Der Text eines Redeanteils, wie ihn die Synthese bekommt — mit der
 * Regieanweisung seiner Machart davor.
 *
 * **Nur hier, nicht im Schema.** `sprechtext` und `rede[].text` bleiben, was
 * sie sind: die Fassung, die im Untertitel steht und an der die Laenge
 * geschaetzt wird. Die Klammer entsteht erst beim Vertonen und verschwindet
 * hinterher wieder — `woerterAusAusrichtung` filtert alles zwischen `[` und
 * `]`, sonst stuende die Klammer gross ueber der Buehne.
 *
 * Damit rechnet auch die Schaetzung weiter richtig: Die zusaetzlichen Zeichen
 * werden nicht gesprochen, und `ZEICHEN_PRO_SEKUNDE` sieht sie nie.
 *
 * Welche Anweisung zu welcher Machart gehoert, steht in `MACHARTEN`
 * — zwei der sechs haben bewusst keine.
 */
/**
 * Deterministischer Streuwert aus einer Zeichenkette (djb2).
 *
 * Nicht `Math.random`: Derselbe Short muss beim zweiten Render gleich klingen,
 * sonst waere ein Neurendern ein anderes Video. Und nicht die Listenposition —
 * die machte den ersten Short jedes Laufs immer gleich, also genau die
 * Schablone, die beim Wochentag gestrichen wurde.
 */
const streuwert = (text: string): number => {
  let wert = 5381;
  for (let i = 0; i < text.length; i += 1) {
    wert = ((wert << 5) + wert + text.charCodeAt(i)) >>> 0;
  }
  return wert;
};

/**
 * Der Text eines Redeanteils, wie ihn die Synthese bekommt — mit einer
 * Regieanweisung aus dem Vorrat seiner Machart davor.
 *
 * **Nur hier, nicht im Schema.** `sprechtext` und `rede[].text` bleiben, was
 * sie sind: die Fassung, die im Untertitel steht und an der die Laenge
 * geschaetzt wird. Die Klammer entsteht erst beim Vertonen und verschwindet
 * hinterher wieder — `woerterAusAusrichtung` filtert alles zwischen `[` und
 * `]`, sonst stuende sie gross ueber der Buehne.
 *
 * Damit rechnet auch die Schaetzung weiter richtig: Die zusaetzlichen Zeichen
 * werden nicht gesprochen, und `ZEICHEN_PRO_SEKUNDE` sieht sie nie. **Das gilt
 * nur, solange keine hoerbare Anweisung im Vorrat steht** — ein Seufzer
 * erzeugt Ton, und der fehlte dann in jeder Zahl, so wie die
 * Sprecherwechselpausen bis zum 26.08.2026 in jeder Zahl fehlten.
 *
 * **Gestreut wird ueber `id` und Machart zusammen.** Nur ueber die `id` naehmen
 * alle Macharten eines Shorts denselben Listenplatz — dann klaenge ein Short
 * durchgehend nach Vorrat A und der naechste durchgehend nach Vorrat B, was
 * die Streuung wieder zu einem Muster machte.
 *
 * Welche Anweisungen es je Machart gibt, steht in `MACHARTEN`. Ein
 * leerer Vorrat heisst: keine Ansage — ein gueltiges Ergebnis der Blindwahl
 * und kein fehlender Eintrag.
 */
const syntheseText = (
  anteil: Pick<Redeanteil, 'text' | 'machart'>,
  shortId: string,
): string => {
  const rein = anteil.text.trim();
  if (anteil.machart === undefined) return rein;
  const vorrat = regieVorrat(anteil.machart);
  if (vorrat.length === 0) return rein;
  const regie = vorrat[streuwert(`${shortId}:${anteil.machart}`) % vorrat.length]!;
  return regie === '' ? rein : `${regie} ${rein}`;
};

export const redelaeufe = (short: Short): Redelauf[] => {
  const laeufe: Redelauf[] = [];

  short.szenen.forEach((szene, i) => {
    const vorherige = short.szenen[i - 1];
    // Die Pause gehoert zur Szene **davor** — sie hat sie bestellt.
    const bestellt = vorherige?.pauseSek;
    const anteile =
      szene.rede ??
      /*
       * Der einstimmige Notfall: eine Szene ohne `rede`. Sie behauptet ihren
       * Satz und nichts weiter — `behaupten` ist hier keine Verlegenheitswahl,
       * sondern die richtige Angabe.
       */
      [{ sprecher: 'nachleser' as Sprecher, zug: 'behaupten' as const, text: szene.sprechtext.trim() }];

    anteile.forEach((anteil, j) => {
      const letzter = laeufe[laeufe.length - 1];
      const neueSzene = j === 0;
      const gleicherSprecher = letzter !== undefined && letzter.sprecher === anteil.sprecher;

      /*
       * **Angehaengt wird nur innerhalb einer Szene.**
       *
       * Bis zum 31.08.2026 lief ein Lauf ueber Szenengrenzen weiter, solange
       * dieselbe Figur sprach; die Pause entstand dann durch ` ... ` im Text.
       * Der Kommentar dazu nannte „gemessene 0,86 Sekunden" — gemessen an
       * `eleven_multilingual_v2`. Unter `eleven_v3` waren es **0,85 bis 2,19**,
       * und in `raumstation-alte-rechner` standen dadurch 5,9 von 41,7 Sekunden
       * still: **14 % des Videos**, waehrend `src/zeit.ts` 0,32 rechnete.
       *
       * Dieselbe Geschichte wie bei `ZEICHEN_PRO_SEKUNDE`: fuer ein Modell
       * gemessen, das nicht mehr laeuft. Der Vertrag hatte die Antwort schon
       * danebenstehen — **ein Break-Tag ist eine Bitte an die Synthese, ein
       * Versatz im Schnitt ist eine Tatsache.**
       *
       * Der Grund fuer die Verkettung, durchgehende Betonung, gilt weiter: Zwei
       * Redeanteile derselben Figur **innerhalb** einer Szene werden nach wie
       * vor zusammengezogen. Ueber eine Szenengrenze war ohnehin schon
       * geschnitten, nur in Textform statt im Ton.
       *
       * Der Nebengewinn ist der eigentliche: Ein Versatz laesst sich aendern,
       * ohne neu zu vertonen. Die Pausenlaenge ist damit die erste Groesse in
       * diesem Projekt, die **kostenlos** nachjustierbar ist.
       */
      if (gleicherSprecher && !neueSzene) {
        letzter.text += ` ${syntheseText(anteil, short.id)}`;
        /*
         * **Der Zug des zweiten Anteils faellt hier weg, und das ist gewollt.**
         * Ein Abschnitt ist ein Syntheseaufruf und traegt genau eine Haltung;
         * die Verschmelzung aufzubrechen fuegte eine Sprecherpause ein, wo
         * kein Sprecher wechselt, und kostete einen zusaetzlichen Aufruf.
         *
         * Gewollt heisst nicht unbemerkt: `zugverlust` in `src/pruefung.ts`
         * meldet jeden solchen Fall. Am 01.09.2026 waren das drei von vier
         * Shorts mit je einer Stelle — der alte Plan hielt den Fall noch fuer
         * theoretisch, weil damals alle vier Entwuerfe strikt abwechselten.
         */
        return;
      }

      laeufe.push({
        sprecher: anteil.sprecher,
        zug: anteil.zug,
        text: syntheseText(anteil, short.id),
        /*
         * Ein Lauf traegt damit hoechstens **eine** Szenengrenze, und zwar an
         * Zeichen 0. Vorher konnte ein Lauf mehrere Szenen umfassen, und
         * `szenenStartzeiten` musste sie aus der Ausrichtung herauslesen.
         */
        szenenOffsets: neueSzene ? [{ szene: i, offset: 0 }] : [],
        /*
         * `beatSek` kommt oben drauf — der bestellte Beat einer einzelnen
         * Zeile, zusaetzlich zur Standardpause ihrer Naht. Siehe das Feld in
         * `src/typen.ts`.
         */
        pauseDavorSek:
          (anteil.beatSek ?? 0) +
          (laeufe.length === 0
            ? 0
            : neueSzene
              ? (bestellt ?? SZENENGRENZE_SEK)
              : SPRECHERWECHSEL_SEK),
      });
    });
  });

  return laeufe;
};

/**
 * Vertont einen vollstaendigen Short und ergaenzt ihn um die Tonspur.
 * Der Rueckgabewert ist ein neuer Short — das Original bleibt unveraendert.
 */
export const shortVertonen = async (
  short: Short,
  stimmen: Record<Sprecher, string>,
  schluessel: string,
  /** Muster fuer die Dateinamen, `%` wird durch die Abschnittsnummer ersetzt. */
  tondateiname: string,
): Promise<{
  short: Short;
  toene: { datei: string; ton: Buffer }[];
  /**
   * Laeufe, die auch beim zweiten Versuch ueber der Plausibilitaetsgrenze
   * blieben, ohne absurd zu sein.
   *
   * **Sie werden durchgereicht und nicht nur protokolliert.** Eine Warnung, die
   * im Durchlauf von zwoelf Renderzeilen ueberschrieben wird, hat niemand
   * gesehen — der Wochenlauf fasst sie am Ende zusammen, dort, wo entschieden
   * wird, ob der Short in die Freigabe geht.
   */
  unplausibel: string[];
}> => {
  const laeufe = redelaeufe(short);

  /*
   * **Ein Aufruf je Lauf statt einer je Short.**
   *
   * ElevenLabs synthetisiert mit genau einer Stimme. Zwei Sprecher heissen
   * also mehrere Aufrufe — und die Stuecke werden nicht zu einer Datei
   * verklebt, sondern im Renderer nebeneinandergelegt. Der Grund steht am
   * Schema von `Tonspur`: Zusammenkleben braeuchte ffmpeg, und hier gibt es
   * nur den abgespeckten Remotion-Wrapper.
   *
   * Die Pausen entstehen dadurch **zwischen** den Abschnitten statt in einem
   * Break-Tag. Das ist genauer: Ein Break-Tag ist eine Bitte an die Synthese,
   * ein Versatz im Schnitt ist eine Tatsache.
   *
   * Der Preis sind mehr Netzaufrufe je Short. Das Zeichenkontingent bleibt
   * gleich — abgerechnet werden Zeichen, nicht Anfragen.
   */
  const toene: { datei: string; ton: Buffer }[] = [];
  const abschnitte: NonNullable<Short['tonspur']>['abschnitte'] = [];
  const woerter: Untertitelwort[] = [];
  const szenenStartSek: number[] = [];
  /*
   * **Die Uhr startet beim Vorspann, nicht bei null.**
   *
   * Hier stand bis zum 31.08.2026 ein Sprung mitten in der Schleife: Beginnt
   * dieser Lauf die Szene nach dem Vorspann, springt die Uhr vor. Das war die
   * kniffligste Stelle der ganzen Vertonung, weil sie genau einmal und genau
   * dort greifen musste.
   *
   * Seit der Vorhang am Anfang steht, ist es eine Anfangsbedingung. **Ein Wert,
   * der einmal am Anfang gesetzt wird, kann nicht an der falschen Stelle
   * einsteigen.** Alles Weitere — Abschnittsstarts, Szenenstarts, Wortzeiten,
   * `dauerSek` — rechnet von selbst richtig weiter, weil alles auf dieser Uhr
   * liegt.
   */
  let uhr = 0;

  /*
   * **Die Themenansage — der einzige Vorspannton, der je Short wechselt.**
   *
   * Showtitel und Namen haengen am Format und liegen als feste Dateien unter
   * `public/ton/marke/vorspann/`; sie kosten einmal und nie wieder. „Heutiges
   * Thema: …" steht in `short.vorspann` und ist bei jedem Video ein anderer
   * Satz — also gehoert sie hierher.
   *
   * Sie geht **nicht** in `abschnitte` und ihre Woerter nicht in `woerter`,
   * genau wie der uebrige Vorspannton: Die Aufschlagmessung filtert gegen
   * `szenenStartSek[1]`, und Woerter aus dem Vorspann verlaengerten dort den
   * gemessenen Aufschlag ueber die 3,5 Sekunden.
   *
   * Der Wortlaut kommt aus `themaAnsage` in `src/zeit.ts` — derselben
   * Funktion, aus der auch die Schaetzung vor der Vertonung rechnet. Zweimal
   * geschrieben klaenge das Video eines Tages anders, als jede Laengenrechnung
   * annimmt.
   */
  const unplausibel: string[] = [];

  /*
   * **Der Kaltstart — der erste Satz des Videos, vor dem Vorhang.**
   *
   * Eigene Datei, eigene Wortzeiten, und beides **neben** `abschnitte` statt
   * darin. Der Grund ist derselbe wie bei der Themenansage darunter: Die
   * Aufschlagmessung in `src/pruefung.ts` filtert `woerter` gegen
   * `szenenStartSek[1]`. Wanderten die Kaltstartwoerter dorthin, verlaengerten
   * sie den gemessenen Aufschlag um ihre eigene Laenge — und der Short fiele
   * an einer Regel durch, die er selbst mitbringt.
   *
   * **Wer spricht, steht in `KALTSTART_ARTEN` und nicht im Entwurf.** Dieselbe
   * Tabelle, die auch das Schema und das Bild lesen; eine zweite Zuordnung
   * daneben liefe beim ersten Umbau lautlos auseinander.
   */
  const kaltstartArt = KALTSTART_ARTEN.find((a) => a.schluessel === short.kaltstart.art);
  const kaltstart = await synthetisieren(
    short.kaltstart.satz,
    { stimmeId: stimmen[kaltstartArt?.wer ?? 'zeiger'], ...KANAL_STIMME },
    schluessel,
    true,
    `${short.id} Kaltstart`,
  );
  if (kaltstart.unplausibel) unplausibel.push(kaltstart.unplausibel);
  const kaltstartdatei = tondateiname.replace('%', 'kaltstart');
  const kaltstartBeschnitten = await stilleBeschneidenPuffer(kaltstart.ton);
  toene.push({ datei: kaltstartdatei, ton: kaltstartBeschnitten.ton });
  const kaltstartDauer = kaltstart.dauerSek - kaltstartBeschnitten.vornSek;
  /* Die Woerter wandern um den weggeschnittenen Vorlauf nach vorn, wie in der
     Schleife weiter unten — der Text steht sonst um genau diesen Betrag zu
     spaet unter der Figur. */
  const kaltstartWoerter = kaltstart.woerter.map((w) => ({
    wort: w.wort,
    startSek: Math.max(0, w.startSek - kaltstartBeschnitten.vornSek),
    endeSek: Math.max(0, w.endeSek - kaltstartBeschnitten.vornSek),
  }));


  const ansage = await synthetisieren(
    themaAnsage(short),
    { stimmeId: stimmen.nachleser, ...KANAL_STIMME },
    schluessel,
    true,
    `${short.id} Themenansage`,
  );
  if (ansage.unplausibel) unplausibel.push(ansage.unplausibel);
  const ansagedatei = tondateiname.replace('%', 'vorspann');
  /*
   * **Beschnitten wird vor dem Rechnen, nicht nach dem Schreiben.**
   *
   * ElevenLabs legt in jede Datei Stille — am ersten fertigen Video gemessen:
   * vorn bis 0,12 s, hinten bis 2,07 s. Wer sie erst beim Ablegen entfernt, hat
   * die Zeiten laengst mit der ungeschnittenen Fassung gerechnet; die
   * Untertitel liefen dann um genau den Vorlauf hinterher.
   */
  const ansageBeschnitten = await stilleBeschneidenPuffer(ansage.ton);
  toene.push({ datei: ansagedatei, ton: ansageBeschnitten.ton });

  /* Die **gemessene** Dauer, nicht die geschaetzte: Ton und Bild liefen sonst
     um genau die Differenz auseinander. */
  uhr =
    ansageAbSek(kaltstartDauer) +
    (ansage.dauerSek - ansageBeschnitten.vornSek) +
    VORHANGFAHRT_SEK;

  for (const [i, lauf] of laeufe.entries()) {
    uhr += lauf.pauseDavorSek;
    const synthese = await synthetisieren(
      lauf.text,
      { stimmeId: stimmen[lauf.sprecher], ...KANAL_STIMME },
      schluessel,
      true,
      `${short.id} Lauf ${i + 1} (${lauf.sprecher})`,
    );
    if (synthese.unplausibel) unplausibel.push(synthese.unplausibel);

    /*
     * **Der Vorlauf wird abgeschnitten und aus allen Zeiten dieses Abschnitts
     * herausgerechnet.** Das ist der ganze Trick: Die Ausrichtung zaehlt ab
     * dem Dateianfang, die beschnittene Datei beginnt aber `vornSek` spaeter —
     * ohne die Verschiebung liefen Untertitel und Lippensync um genau diesen
     * Betrag vor.
     *
     * **Und die Endstille braucht sehr wohl eine Korrektur.** Hier stand bis
     * zum 01.09.2026 das Gegenteil: „`dauerSek` ist das Ende der Ausrichtung,
     * nicht der Datei, und liegt ohnehin vor ihr."
     *
     * Am ersten vertonten Streit-Short war das um das Vierfache falsch.
     * Abschnitt 4 („Dann wechsel es.", 16 Zeichen) ergab eine Datei von
     * **0,84 Sekunden** und eine Ausrichtung bis **3,93** — das Wort „es."
     * stand darin mit 3,44 Sekunden fuer zwei Buchstaben. Die Ausrichtung
     * dehnt das letzte Wort ueber die Endstille, und `stilleBeschneiden`
     * schneidet genau die weg.
     *
     * Die Folge war dreifach und wurde am fertigen Video gehoert: eine Pause
     * mitten in der Szene, ein Untertitel, der auf einem Wort stehenblieb, und
     * ein Mund, der ab dort asynchron lief — `lippensync` liest dieselben
     * Zeitstempel.
     *
     * Deshalb rechnet die Uhr jetzt mit `nachherSek`, der **gemessenen** Dauer
     * der beschnittenen Datei. `stilleBeschneiden` gibt sie ausdruecklich
     * zurueck, „denn die Uhr in `shortVertonen` rechnet mit ihr weiter" — sie
     * tat es nur nicht.
     */
    const beschnitten = await stilleBeschneidenPuffer(synthese.ton);
    const vorn = beschnitten.vornSek;
    /*
     * Die maessgebliche Dauer dieses Abschnitts. Ein Wort kann nicht enden,
     * nachdem die Datei zu Ende ist.
     */
    const echtSek = beschnitten.nachherSek;
    if (synthese.dauerSek - vorn - echtSek > 0.5) {
      unplausibel.push(
        `${short.id} Lauf ${i + 1}: Ausrichtung ${(synthese.dauerSek - vorn).toFixed(2)}s gegen ` +
          `Datei ${echtSek.toFixed(2)}s — die Endstille steckte im letzten Wort.`,
      );
    }

    const datei = tondateiname.replace('%', String(i + 1));
    toene.push({ datei, ton: beschnitten.ton });
    abschnitte.push({ datei, sprecher: lauf.sprecher, startSek: uhr, zug: lauf.zug });

    /*
     * Ein Lauf kann mehrere Szenen umfassen. Innerhalb des Laufs liegen ihre
     * Grenzen an Zeichenoffsets, und `szenenStartzeiten` liest sie aus der
     * Ausrichtung — dieselbe Rechnung wie vor dem Umbau, nur je Lauf statt je
     * Short.
     */
    const innen = szenenStartzeiten(
      synthese.ausrichtung,
      lauf.szenenOffsets.map((o) => o.offset),
    );
    innen.forEach((sek) => szenenStartSek.push(Math.max(uhr, sek - vorn + uhr)));
    // Die Wortzeiten kommen je Aufruf ab 0 und wandern auf die gemeinsame Uhr —
    // abzueglich des weggeschnittenen Vorlaufs.
    for (const w of synthese.woerter) {
      /*
       * Nach hinten auf das Dateiende gedeckelt: Das letzte Wort traegt sonst
       * die ganze Endstille, und der Untertitel bleibt darauf stehen.
       */
      const ende = uhr + echtSek;
      woerter.push({
        wort: w.wort,
        startSek: Math.min(ende, Math.max(uhr, w.startSek - vorn + uhr)),
        endeSek: Math.min(ende, Math.max(uhr, w.endeSek - vorn + uhr)),
      });
    }
    uhr += echtSek;
  }

  return {
    toene,
    unplausibel,
    short: {
      ...short,
      tonspur: {
        datei: abschnitte[0]!.datei,
        dauerSek: uhr,
        woerter,
        szenenStartSek,
        kaltstart: {
          datei: kaltstartdatei,
          dauerSek: kaltstartDauer,
          woerter: kaltstartWoerter,
        },
        vorspann: { datei: ansagedatei, dauerSek: ansage.dauerSek },
        ...(abschnitte.length > 1 ? { abschnitte } : {}),
      },
    },
  };
};

/**
 * Zeichenverbrauch eines Shorts — die Abrechnungsgroesse bei ElevenLabs.
 *
 * **Ueber `redelaeufe` gerechnet, seit dem 31.08.2026.** Vorher lief die Zahl
 * ueber `sprechtextZusammenfuegen`, das den ganzen Short zu einem Text mit
 * ` ... ` als Szenentrenner zusammenzog. Diese Funktion hat zuletzt **nichts
 * mehr vertont** — sie war nur noch diese Zaehlung — und zaehlte dabei
 * Trennerpunkte mit, die nie an die Synthese gingen.
 *
 * Jetzt wird gezaehlt, was wirklich abgeschickt wird: die Laufttexte samt
 * ihrer Regieanweisungen. Die kosten Zeichen, und ein Vorrat, der spaeter
 * gefuellt wird, taucht damit von selbst in der Abrechnung auf.
 */
export const zeichenverbrauch = (short: Short): number =>
  redelaeufe(short).reduce((summe, lauf) => summe + lauf.text.length, 0);


/**
 * Wie viele Zeichen bei ElevenLabs noch frei sind.
 *
 * **Der Wert stand seit dem 19.08.2026 in `npm run zugaenge` und wurde vor dem
 * Lauf nie abgefragt.** `wochenlauf.ts` gibt den Zeichenbedarf aus und
 * verglich ihn mit nichts — ein Lauf, dem 300 Zeichen fehlen, bricht dann
 * mitten in der vierten Vertonung ab, und bezahlt ist bis dahin alles.
 *
 * `null` heisst: nicht feststellbar. Dann laeuft der Lauf weiter, denn eine
 * Wache, die bei einer unerreichbaren API abbricht, haelt eine fertige Woche
 * wegen eines Netzwerkfehlers zurueck.
 */
export const restkontingent = async (schluessel: string): Promise<number | null> => {
  try {
    const antwort = await fetch('https://api.elevenlabs.io/v1/user/subscription', {
      headers: { 'xi-api-key': schluessel },
    });
    if (!antwort.ok) return null;
    const d = (await antwort.json()) as { character_count?: number; character_limit?: number };
    if (d.character_limit === undefined || d.character_count === undefined) return null;
    return d.character_limit - d.character_count;
  } catch {
    return null;
  }
};
