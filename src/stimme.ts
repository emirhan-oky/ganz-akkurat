import { Buffer } from 'node:buffer';
import type { Short, Untertitelwort } from './typen';

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
 * Mehrsprachiges Modell. Notwendig fuer korrekte deutsche Aussprache,
 * Umlaute und die Betonung zusammengesetzter Substantive.
 */
const MODELL = 'eleven_multilingual_v2';

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
   * Alles zwischen `<` und `>` gehoert zu einem Break-Tag und ist kein
   * gesprochenes Wort. Ohne diesen Filter stuende „<break", „time=1.8s" und
   * „/>" als drei Woerter im Untertitel — die Zeichenausrichtung liefert sie
   * mit, obwohl die Stimme sie nicht spricht.
   */
  let imTag = false;

  for (let i = 0; i < a.characters.length; i += 1) {
    const zeichen = a.characters[i]!;
    const von = a.character_start_times_seconds[i] ?? 0;
    const bis = a.character_end_times_seconds[i] ?? von;

    if (zeichen === '<') {
      abschliessen(a.character_end_times_seconds[i - 1] ?? bis);
      imTag = true;
      continue;
    }
    if (imTag) {
      if (zeichen === '>') imTag = false;
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
 * Vertont einen vollstaendigen Short und ergaenzt ihn um die Tonspur.
 * Der Rueckgabewert ist ein neuer Short — das Original bleibt unveraendert.
 */
export const shortVertonen = async (
  short: Short,
  stimmeId: string,
  schluessel: string,
  tondateiname: string,
): Promise<{ short: Short; ton: Buffer }> => {
  const { text, szenenOffsets } = sprechtextZusammenfuegen(short);
  const synthese = await synthetisieren(text, { stimmeId, ...KANAL_STIMME }, schluessel);

  return {
    ton: synthese.ton,
    short: {
      ...short,
      tonspur: {
        datei: tondateiname,
        dauerSek: synthese.dauerSek,
        woerter: synthese.woerter,
        szenenStartSek: szenenStartzeiten(synthese.ausrichtung, szenenOffsets),
      },
    },
  };
};

/** Zeichenverbrauch eines Shorts — die Abrechnungsgroesse bei ElevenLabs. */
export const zeichenverbrauch = (short: Short): number => sprechtextZusammenfuegen(short).text.length;
