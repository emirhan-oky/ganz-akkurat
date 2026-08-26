import { Buffer } from 'node:buffer';
import type { Redeanteil, Short, Sprecher, Untertitelwort } from './typen';
import { regieVon } from './typen';
import { SPRECHERWECHSEL_SEK, SZENENTRENNER_SEK } from './zeit';

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
 * **Regieanweisungen im Text**, in eckigen Klammern: `[confused]`, `[sighs]`,
 * `[laughs]`. Fuer Watti ist das keine Spielerei — seine Macharten heissen
 * Ratlosigkeit, Gestaendnis und falscher Schluss (`REAKTIONS_MACHARTEN` in
 * `src/typen.ts`), und die lassen sich damit **ansagen**, statt zu hoffen,
 * dass die Stimme sie errät. Kein aelteres Modell kann das.
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
 * Etwas unter Normaltempo, weil technische Begriffe sonst untergehen.
 */
export const KANAL_STIMME: Omit<Sprecheinstellung, 'stimmeId'> = {
  stabilitaet: 0.45,
  aehnlichkeit: 0.75,
  ausdruck: 0.35,
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
 * Trennt zwei Szenen im Sprechtext. Erzeugt zugleich eine hoerbare Pause.
 *
 * Die Voreinstellung sind drei Auslassungspunkte — gemessene 0,86 Sekunden,
 * gerade genug, dass ein Schnitt nicht auf dem Wort sitzt.
 */
const SZENENTRENNER = ' ... ';

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
 * Fuegt die Sprechtexte aller Szenen zu einem Text zusammen und merkt sich,
 * an welchem Zeichen jede Szene beginnt.
 */
export const sprechtextZusammenfuegen = (short: Short): { text: string; szenenOffsets: number[] } => {
  const szenenOffsets: number[] = [];
  let text = '';

  short.szenen.forEach((szene, i) => {
    // Die Pause gehoert zur Szene **davor** — sie hat sie bestellt.
    const vorherige = short.szenen[i - 1];
    if (vorherige !== undefined) {
      text += vorherige.pauseSek === undefined ? SZENENTRENNER : pause(vorherige.pauseSek);
    }
    szenenOffsets.push(text.length);
    text += szene.sprechtext.trim();
  });

  return { text, szenenOffsets };
};

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
   * `[confused]`, `[sighs]`, `[laughs]` sind die **Regieanweisungen von
   * `eleven_v3`**. Sie kamen am 25.08.2026 mit dem Modellwechsel dazu, und der
   * Filter kannte sie nicht: Die eckige Klammer waere Wort fuer Wort im
   * Untertitel gelandet. Aufgefallen beim Nachsehen, nicht im fertigen Video —
   * dort haette „[confused]" gross ueber der Buehne gestanden.
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
 * `]`, sonst stuende „[confused]" gross ueber der Buehne.
 *
 * Damit rechnet auch die Schaetzung weiter richtig: Die zusaetzlichen Zeichen
 * werden nicht gesprochen, und `ZEICHEN_PRO_SEKUNDE` sieht sie nie.
 *
 * Welche Anweisung zu welcher Machart gehoert, steht in `REAKTIONS_MACHARTEN`
 * — zwei der sechs haben bewusst keine.
 */
const syntheseText = (anteil: Pick<Redeanteil, 'text' | 'machart'>): string => {
  const rein = anteil.text.trim();
  const regie = anteil.machart === undefined ? undefined : regieVon(anteil.machart);
  return regie === undefined ? rein : `${regie} ${rein}`;
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
       * Anhaengen, wenn dieselbe Figur weiterspricht. Bei einer neuen Szene
       * kommt der Trenner mit in den Text — er erzeugt die Pause **innerhalb**
       * der Synthese, so wie bisher. Nur beim Sprecherwechsel entsteht die
       * Pause zwischen zwei Aufrufen.
       */
      if (gleicherSprecher) {
        if (neueSzene) {
          letzter.text += bestellt === undefined ? SZENENTRENNER : pause(bestellt);
          letzter.szenenOffsets.push({ szene: i, offset: letzter.text.length });
        } else {
          letzter.text += ' ';
        }
        letzter.text += syntheseText(anteil);
        return;
      }

      laeufe.push({
        sprecher: anteil.sprecher,
        text: syntheseText(anteil),
        szenenOffsets: neueSzene ? [{ szene: i, offset: 0 }] : [],
        pauseDavorSek:
          laeufe.length === 0
            ? 0
            : neueSzene
              ? (bestellt ?? SZENENTRENNER_SEK)
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

/** Zeichenverbrauch eines Shorts — die Abrechnungsgroesse bei ElevenLabs. */
export const zeichenverbrauch = (short: Short): number => sprechtextZusammenfuegen(short).text.length;
