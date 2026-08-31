import { Buffer } from 'node:buffer';
import type { Redeanteil, Short, Sprecher, Untertitelwort } from './typen';
import { regieVorrat } from './typen';
import { SPRECHERWECHSEL_SEK, SZENENGRENZE_SEK, VORSPANN_NACH_SZENE, VORSPANN_SEK } from './zeit';

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
 * (`REAKTIONS_MACHARTEN` in `src/typen.ts`), und die lassen sich damit
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
export const synthetisieren = async (
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
 * Welche Anweisung zu welcher Machart gehoert, steht in `REAKTIONS_MACHARTEN`
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
 * Welche Anweisungen es je Machart gibt, steht in `REAKTIONS_MACHARTEN`. Ein
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
      szene.rede ?? [{ sprecher: 'nachleser' as Sprecher, text: szene.sprechtext.trim() }];

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
        return;
      }

      laeufe.push({
        sprecher: anteil.sprecher,
        text: syntheseText(anteil, short.id),
        /*
         * Ein Lauf traegt damit hoechstens **eine** Szenengrenze, und zwar an
         * Zeichen 0. Vorher konnte ein Lauf mehrere Szenen umfassen, und
         * `szenenStartzeiten` musste sie aus der Ausrichtung herauslesen.
         */
        szenenOffsets: neueSzene ? [{ szene: i, offset: 0 }] : [],
        pauseDavorSek:
          laeufe.length === 0
            ? 0
            : neueSzene
              ? (bestellt ?? SZENENGRENZE_SEK)
              : SPRECHERWECHSEL_SEK,
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
): Promise<{ short: Short; toene: { datei: string; ton: Buffer }[] }> => {
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
  let uhr = 0;

  for (const [i, lauf] of laeufe.entries()) {
    /*
     * **Hier steigt der Vorspann in die Zeitachse ein — an genau einer
     * Stelle.**
     *
     * Er sitzt als Cold Open nach der ersten Szene. Beginnt dieser Lauf die
     * Szene danach, springt die Uhr vor; alles Weitere — Abschnittsstarts,
     * Szenenstarts, Wortzeiten, `dauerSek` — rechnet von selbst richtig
     * weiter, weil alles auf dieser Uhr liegt.
     *
     * Der Vorspannton selbst geht **nicht** in `abschnitte` und seine Woerter
     * nicht in `woerter`: Er ist eine feste Datei mit eigener Wortliste. Genau
     * das haelt die Aufschlagmessung heil, die gegen `szenenStartSek[1]`
     * filtert.
     */
    if (lauf.szenenOffsets.some((o) => o.szene === VORSPANN_NACH_SZENE + 1)) {
      uhr += VORSPANN_SEK;
    }
    uhr += lauf.pauseDavorSek;
    const synthese = await synthetisieren(
      lauf.text,
      { stimmeId: stimmen[lauf.sprecher], ...KANAL_STIMME },
      schluessel,
    );
    const datei = tondateiname.replace('%', String(i + 1));
    toene.push({ datei, ton: synthese.ton });
    abschnitte.push({ datei, sprecher: lauf.sprecher, startSek: uhr });

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
    innen.forEach((sek) => szenenStartSek.push(sek + uhr));
    // Die Wortzeiten kommen je Aufruf ab 0 und wandern auf die gemeinsame Uhr.
    for (const w of synthese.woerter) {
      woerter.push({ wort: w.wort, startSek: w.startSek + uhr, endeSek: w.endeSek + uhr });
    }
    uhr += synthese.dauerSek;
  }

  return {
    toene,
    short: {
      ...short,
      tonspur: {
        datei: abschnitte[0]!.datei,
        dauerSek: uhr,
        woerter,
        szenenStartSek,
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
