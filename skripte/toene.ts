/**
 * Die berechneten Marken-Toene.
 *
 * Sie stehen unten in `main()` und wandern nach `public/ton/marke/`. **Wie
 * viele es sind, steht hier bewusst nicht:** Der Kopf sagte bis zum 01.09.2026
 * „die zwei", als es laengst vier waren. Ein Kommentar, der seine Gegenstaende
 * zaehlt, veraltet bei jedem neuen.
 *
 * **Warum selbst erzeugt und nicht heruntergeladen.** Dieselbe Begruendung wie
 * bei den Zeichnungen: Ein fremder Klang ist ein Lizenzproblem, und der
 * naheliegendste — das Bediengeraeusch der App beim Antippen — ist zugleich
 * ein fremdes Markenzeichen. Es ist nirgends als Datei veroeffentlicht und
 * nicht zum Einbrennen lizenziert. Nachgebaut wird die **Geste**, nicht der
 * Klang der Plattform.
 *
 * **Warum nicht mit ffmpeg.** Die Installation hier traegt 50 Filter; `afade`
 * und `aevalsrc` fehlen. Ein `sine` ohne Huellkurve knackt am Ende, und ein
 * Knacken faellt in einem stillen Video mehr auf als der Ton selbst. Eine WAV
 * von Hand zu schreiben ist ein Dutzend Zeilen und gibt volle Kontrolle.
 *
 * **Warum zwei Toene und nicht einer.** Sie markieren verschiedene Dinge: Der
 * eine sitzt mitten im Video und deutet auf den Like-Knopf, der andere steht
 * am Schluss beim Folgen-Zeichen. Zweimal derselbe Klang liesse den zweiten
 * wie eine Wiederholung des ersten klingen.
 *
 *     npx tsx skripte/toene.ts
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const RATE = 48_000;

/** WAV-Kopf plus 16-Bit-PCM. Kein Paket noetig; das Format ist ein Dutzend Felder. */
const wav = (proben: Float32Array): Buffer => {
  const daten = Buffer.alloc(proben.length * 2);
  for (let i = 0; i < proben.length; i++) {
    const v = Math.max(-1, Math.min(1, proben[i]!));
    daten.writeInt16LE(Math.round(v * 32_767), i * 2);
  }

  const kopf = Buffer.alloc(44);
  kopf.write('RIFF', 0);
  kopf.writeUInt32LE(36 + daten.length, 4);
  kopf.write('WAVE', 8);
  kopf.write('fmt ', 12);
  kopf.writeUInt32LE(16, 16); // Laenge des fmt-Blocks
  kopf.writeUInt16LE(1, 20); // PCM
  kopf.writeUInt16LE(1, 22); // mono
  kopf.writeUInt32LE(RATE, 24);
  kopf.writeUInt32LE(RATE * 2, 28); // Bytes je Sekunde
  kopf.writeUInt16LE(2, 32); // Blockgroesse
  kopf.writeUInt16LE(16, 34); // Bit je Probe
  kopf.write('data', 36);
  kopf.writeUInt32LE(daten.length, 40);

  return Buffer.concat([kopf, daten]);
};

/**
 * Ein Ton aus Grundton und Oktave, mit weicher Huellkurve.
 *
 * Der schnelle Anstieg (4 ms) macht den Anschlag, das lange Abklingen den
 * Charakter. Ohne den Anstieg klickt es, ohne das Abklingen piept es.
 */
const ton = (
  dauerSek: number,
  hz: (t: number) => number,
  opts: { oktave?: number; anstiegSek?: number; abfall?: number } = {},
): Float32Array => {
  const { oktave = 0.28, anstiegSek = 0.004, abfall = 26 } = opts;
  const n = Math.round(dauerSek * RATE);
  const proben = new Float32Array(n);

  let phase = 0;
  let phaseOkt = 0;

  for (let i = 0; i < n; i++) {
    const t = i / RATE;
    const f = hz(t);
    phase += (2 * Math.PI * f) / RATE;
    phaseOkt += (2 * Math.PI * f * 2) / RATE;

    const anstieg = Math.min(1, t / anstiegSek);
    const huelle = anstieg * Math.exp(-abfall * t);

    proben[i] = huelle * (Math.sin(phase) + oktave * Math.sin(phaseOkt)) * 0.42;
  }

  return proben;
};

/* ─────────────────────────── Stoff statt Ton ──────────────────────────── */

/**
 * Weisses Rauschen.
 *
 * Der Rohstoff fuer alles, was **reibt** statt zu klingen. Ein Vorhang hat
 * keine Tonhoehe: Schwerer Stoff, der ueber sich selbst gleitet, ist ein
 * Geraeusch, und ein Geraeusch faengt hier an.
 */
const rauschen = (dauerSek: number): Float32Array => {
  const proben = new Float32Array(Math.round(dauerSek * RATE));
  for (let i = 0; i < proben.length; i++) proben[i] = Math.random() * 2 - 1;
  return proben;
};

/**
 * Einpoliger Tiefpass. `hz` darf ueber die Zeit wandern.
 *
 * `y += a * (x - y)` — mehr ist ein Tiefpass erster Ordnung nicht. Die
 * Grenzfrequenz als Funktion der Zeit zu fuehren ist der ganze Trick am
 * Vorhang: Waehrend der Stoff Fahrt aufnimmt, wandert sie nach oben, und genau
 * das hoert man als **Zug**. Eine feste Grenze klaenge wie ein Windstoss.
 */
const tiefpass = (ein: Float32Array, hz: (t: number) => number): Float32Array => {
  const aus = new Float32Array(ein.length);
  let y = 0;
  for (let i = 0; i < ein.length; i++) {
    const a = Math.min(1, (2 * Math.PI * hz(i / RATE)) / RATE);
    y += a * (ein[i]! - y);
    aus[i] = y;
  }
  return aus;
};

/**
 * Hochpass durch Abzug: was der Tiefpass durchlaesst, fehlt danach.
 *
 * Braucht es, weil weisses Rauschen unter 150 Hz ein Rumpeln hat, das auf
 * Handylautsprechern nicht klingt, sondern nur Pegel kostet.
 */
const hochpass = (ein: Float32Array, hz: number): Float32Array => {
  const tief = tiefpass(ein, () => hz);
  const aus = new Float32Array(ein.length);
  for (let i = 0; i < ein.length; i++) aus[i] = ein[i]! - tief[i]!;
  return aus;
};

/** Gleichmaessig leiser — `ton` bringt einen festen Pegel mit, der fuer ein
    Begleitgeraeusch zu hoch ist. */
const leiser = (ein: Float32Array, faktor: number): Float32Array => {
  const aus = new Float32Array(ein.length);
  for (let i = 0; i < ein.length; i++) aus[i] = ein[i]! * faktor;
  return aus;
};

/** Punktweise Lautstaerke — die Huellkurve, die aus Rauschen eine Bewegung macht. */
const huelle = (ein: Float32Array, f: (t: number) => number): Float32Array => {
  const aus = new Float32Array(ein.length);
  for (let i = 0; i < ein.length; i++) aus[i] = ein[i]! * f(i / RATE);
  return aus;
};

/**
 * Die Rollen auf der Schiene: unregelmaessige kurze Anschlaege.
 *
 * **Unregelmaessig ist die halbe Miete.** Gleichmaessige Abstaende klingen nach
 * Maschine; ein Vorhang haengt an Ringen, die sich verhaken und nachrutschen.
 * Die Streuung kommt aus demselben Generator, mit dem der Vorhang seine Falten
 * verteilt — gleicher Startwert, gleiches Geraeusch.
 */
const schiene = (dauerSek: number, anzahl: number, saat: number): Float32Array => {
  let s = saat;
  const wurf = () => ((s = (s * 1664525 + 1013904223) % 4294967296), s / 4294967296);
  const teile: { ab: number; proben: Float32Array }[] = [];
  for (let i = 0; i < anzahl; i++) {
    const ab = (i / anzahl) * dauerSek * (0.8 + wurf() * 0.4);
    const klick = huelle(hochpass(rauschen(0.02), 900), (t) => Math.exp(-260 * t) * 0.5);
    teile.push({ ab: Math.min(ab, dauerSek - 0.02), proben: klick });
  }
  return nacheinander(teile);
};

/** Zwei Toene hintereinander, der zweite versetzt. */
const nacheinander = (teile: { ab: number; proben: Float32Array }[]): Float32Array => {
  const laenge = Math.max(...teile.map((s) => Math.round(s.ab * RATE) + s.proben.length));
  const misch = new Float32Array(laenge);
  for (const { ab, proben } of teile) {
    const versatz = Math.round(ab * RATE);
    for (let i = 0; i < proben.length; i++) {
      misch[versatz + i] = (misch[versatz + i] ?? 0) + proben[i]!;
    }
  }
  return misch;
};

/**
 * Ein Swisch: schmales Rauschband, das ueber die Frequenz wandert.
 *
 * **Der Unterschied zum gescheiterten Stoffklang ist die Breite.** Jener lief
 * von 150 bis 2500 Hz — ein breites Rauschband, und das ist per Definition ein
 * Foen. Ein Swisch ist ein **schmaler** Streifen, der wandert; erst die
 * Schmalheit macht aus Rauschen eine Bewegung, weil das Ohr die wandernde
 * Mitte als Richtung liest.
 *
 * Schmal heisst hier: mehrfach tiefpassen und danach hochpassen, beides mit
 * derselben wandernden Mitte. Jeder Durchgang halbiert, was daneben liegt.
 *
 * `richtung` ist der ganze Unterschied zwischen Zufahren und Oeffnen: Beim
 * Aufziehen entfernt sich der Stoff, beim Schliessen kommt er auf einen zu.
 */
const swisch = (opts: {
  dauerSek: number;
  vonHz: number;
  bisHz: number;
  pegel: number;
  /** Wie schmal das Band ist — mehr Durchgaenge, schmaler. */
  schaerfe?: number;
}): Float32Array => {
  const { dauerSek, vonHz, bisHz, pegel, schaerfe = 3 } = opts;
  const mitte = (t: number) => vonHz + (bisHz - vonHz) * (t / dauerSek);

  let band: Float32Array = rauschen(dauerSek);
  for (let i = 0; i < schaerfe; i++) band = tiefpass(band, (t) => mitte(t) * 1.35);
  for (let i = 0; i < schaerfe; i++) {
    const tief = tiefpass(band, (t) => mitte(t) * 0.7);
    const aus = new Float32Array(band.length);
    for (let k = 0; k < band.length; k++) aus[k] = band[k]! - tief[k]!;
    band = aus;
  }

  /*
   * Weich an und weich ab: Ein Swisch hat keinen Anschlag, sonst ist es ein
   * Schlag.
   *
   * **Der Pegel ist die zweite Haelfte von „sanft".** Jeder Filterdurchgang
   * nimmt Energie weg, und der erste Anlauf glich das mit Faktor 26 aus — das
   * Ergebnis lag bei RMS 0,55 und damit **fuenfmal ueber der Sprache** (0,08).
   * Sanft ist messbar: deutlich leiser als das, was es begleitet.
   */
  return huelle(band, (t) => {
    const a = t / dauerSek;
    return Math.sin(Math.PI * a) ** 1.3 * pegel;
  });
};

/* ────────────────────────── Der Vorhang faehrt ────────────────────────── */

/** Wie lange eine Vorhangfahrt dauert: `FAHRT_BILDER` = 12 bei 30 fps. */
const FAHRT_SEK = 0.4;

/**
 * Eine Vorhangfahrt als Geraeusch.
 *
 * Drei Dinge machen aus Rauschen einen Vorhang, und alle drei haengen an der
 * **Bewegung**, die man gleichzeitig sieht:
 *
 * 1. **Die Grenzfrequenz wandert nach oben.** Der Stoff nimmt Fahrt auf, und
 *    mit der Geschwindigkeit wird das Reiben heller. Eine feste Grenze klaenge
 *    nach Windstoss.
 * 2. **Die Huellkurve folgt der Fahrt**, nicht einem Anschlag. Ein Vorhang hat
 *    keinen Einsatz wie ein Schlag — er wird lauter, waehrend er laeuft.
 * 3. **Unten wird abgeschnitten.** Weisses Rauschen rumpelt unter 150 Hz, und
 *    das kommt auf einem Handylautsprecher nicht an, kostet aber Pegel.
 */
const fahrt = (opts: {
  vonHz: number;
  bisHz: number;
  /** Wie die Lautstaerke ueber die Fahrt laeuft, 0 bis 1. */
  lautheit: (t: number) => number;
  dauerSek?: number;
  unten?: number;
}): Float32Array => {
  const { vonHz, bisHz, lautheit, dauerSek = FAHRT_SEK, unten = 150 } = opts;
  const roh = hochpass(rauschen(dauerSek), unten);
  const gefiltert = tiefpass(roh, (t) => vonHz + (bisHz - vonHz) * (t / dauerSek));
  return huelle(gefiltert, (t) => lautheit(t / dauerSek) * 0.9);
};

/** Anschwellen und wieder weg — die Grundform jeder Fahrt. */
const bogen = (a: number) => Math.sin(Math.PI * Math.min(1, Math.max(0, a))) ** 0.7;

/* ────────────────────── Das Publikum, 01.09.2026 ──────────────────────── */

/**
 * Was eine Fassung dem Ohr antut, in Zahlen.
 *
 * **Die beiden Groessen sind nicht gewaehlt, sondern uebrig geblieben.** Beim
 * Vorhangstoff sind drei Anlaeufe gescheitert, und jedes Mal hat genau eine
 * dieser Zahlen es vorher gesagt: Das breite Rauschband hatte 67 % seiner
 * Energie ueber 2 kHz und klang wie ein Foen; der erste Swisch lag bei RMS
 * 0,55 gegen 0,08 Sprache, also fuenfmal ueber ihr.
 *
 * Sie stehen hier fest im Code und nicht mehr nebenbei im Terminal, weil eine
 * Zahl, die man einmal von Hand gerechnet hat, beim naechsten Anlauf niemand
 * mehr rechnet.
 */
const messen = (proben: Float32Array): { rms: number; ueber2k: number } => {
  let summe = 0;
  for (const p of proben) summe += p * p;
  const rms = Math.sqrt(summe / proben.length);

  /*
   * Der Anteil ueber 2 kHz ohne Fourier: Was der Tiefpass bei 2 kHz
   * durchlaesst, ist das Tiefe — der Rest ist das Helle. Grob, und fuer die
   * Frage „klingt das nach Foen" genau genug.
   */
  const tief = tiefpass(proben, () => 2000);
  let tiefSumme = 0;
  for (const p of tief) tiefSumme += p * p;
  return { rms, ueber2k: summe === 0 ? 0 : 1 - tiefSumme / summe };
};

/** Bringt eine Fassung auf einen gemessenen RMS. Siehe `raunen.ziel`. */
const aufPegel = (proben: Float32Array, ziel: number): Float32Array => {
  const ist = messen(proben).rms;
  return ist === 0 ? proben : leiser(proben, ziel / ist);
};

/**
 * Eine einzelne gemurmelte Stimme.
 *
 * **Additiv und nicht gefiltert, und das ist der ganze Punkt.** Der Vertrag
 * sagt, dass Synthese Klaenge gut und Texturen schlecht baut — ein Raunen
 * aus gefiltertem Rauschen waere eine Textur und ginge denselben Weg wie der
 * Foen. Ein Raunen ist aber gar keine Textur: Es sind viele **Stimmen**, und
 * eine Stimme ist ein Klang mit Grundton und Formanten.
 *
 * Acht Harmonische, gewichtet nach zwei Formantgipfeln bei 500 und 1100 Hz —
 * das ist ungefaehr ein gemurmeltes „o". Dazu ein langsames Vibrato, denn eine
 * Stimme ohne Schwankung ist eine Orgelpfeife.
 */
const gemurmel = (dauerSek: number, f0: number, saat: number): Float32Array => {
  const n = Math.round(dauerSek * RATE);
  const proben = new Float32Array(n);
  const vibratoHz = 4.2 + (saat % 7) * 0.3;
  const vibratoTiefe = 0.012;

  for (let h = 1; h <= 8; h++) {
    const f = f0 * h;
    // Zwei Formantgipfel, je mit einer weichen Glocke gewichtet.
    const glocke = (mitte: number, breite: number) => Math.exp(-(((f - mitte) / breite) ** 2));
    const staerke = (glocke(500, 320) + 0.6 * glocke(1100, 420)) / h ** 0.4;
    if (staerke < 0.01) continue;
    let phase = (saat * h) % (2 * Math.PI);
    for (let i = 0; i < n; i++) {
      const t = i / RATE;
      const wackeln = 1 + vibratoTiefe * Math.sin(2 * Math.PI * vibratoHz * t + saat);
      phase += (2 * Math.PI * f * wackeln) / RATE;
      proben[i] = proben[i]! + staerke * Math.sin(phase);
    }
  }
  return proben;
};

/**
 * Das Raunen: viele Stimmen, versetzt eingesetzt.
 *
 * **Versetzt ist die halbe Miete**, aus demselben Grund wie die
 * unregelmaessigen Rollen auf der Vorhangschiene: Setzen alle gleichzeitig
 * ein, ist es ein Chor und kein Publikum. Ein Publikum reagiert innerhalb
 * einer Viertelsekunde, aber nicht im selben Bild.
 *
 * Die Grundtoene liegen zwischen 95 und 200 Hz, also im Sprechbereich beider
 * Geschlechter. Sie sind **nicht** auf D und A gestimmt: Ein Publikum, das
 * einen Akkord raunt, ist ein Chor.
 */
const raunen = (opts: {
  dauerSek?: number;
  stimmen?: number;
  /**
   * Der **gemessene** RMS, auf den die Summe normiert wird — nicht ein
   * Multiplikator.
   *
   * Ein Faktor waere hier die falsche Groesse: Wie laut die Summe wird, haengt
   * an der Zahl der Stimmen und daran, wie ihre Phasen zufaellig
   * zusammenfallen. Mit festem Faktor lag dieselbe Zeile zwischen 0,072 und
   * 0,144, waehrend die Sprache bei 0,08 liegt — der erste Anlauf war also
   * lauter als das, was er begleiten soll. Genau der Fehler des ersten
   * Swisch (0,55 gegen 0,08).
   */
  ziel?: number;
  saat?: number;
}): Float32Array => {
  const { dauerSek = 0.9, stimmen = 14, ziel = 0.03, saat = 7 } = opts;
  let s = saat;
  const wurf = () => ((s = (s * 1664525 + 1013904223) % 4294967296), s / 4294967296);

  const teile: { ab: number; proben: Float32Array }[] = [];
  for (let i = 0; i < stimmen; i++) {
    const f0 = 95 + wurf() * 105;
    const ab = wurf() * 0.22;
    const laenge = dauerSek - ab;
    /*
     * Jede Stimme bekommt ihren eigenen Bogen. Ein gemeinsamer ueber die
     * Summe klaenge nach einem Ton, den jemand auf- und zudreht.
     */
    const eigen = huelle(gemurmel(laenge, f0, wurf() * 6.28), (t) => bogen(t / laenge));
    teile.push({ ab, proben: eigen });
  }
  /*
   * Unten abschneiden wie beim Vorhang: Was unter 90 Hz liegt, kommt auf einem
   * Handylautsprecher nicht an und kostet nur Pegel.
   */
  const roh = hochpass(nacheinander(teile), 90);
  const ist = messen(roh).rms;
  return leiser(roh, ist === 0 ? 0 : ziel / ist);
};

/**
 * Sechs Fassungen zum Abhoeren, mit `--proben`.
 *
 * **Klang laesst sich nicht beschreiben.** Dieselbe Entscheidung wie bei der
 * Vorhangfarbe, den Randbreiten und den Stimmen: mehrere Fassungen
 * nebeneinander, und die Wahl faellt am Ohr.
 */
/**
 * Fassungen fuer das Oeffnen, mit `--swisch`.
 *
 * Die erste Runde war zu laut (RMS 0,55 gegen 0,08 Sprache), die zweite
 * lag bei 0,024 bis 0,039 und war immer noch nicht sanft genug. Diese Runde
 * geht zwei Wege zugleich: **noch leiser** und **kein Rauschen mehr**.
 *
 * Der zweite Weg kommt aus dem Auftakt. Der ist ein D-Dur-Dreiklang, und beim
 * Oeffnen laesst sich derselbe Akkord als Gegenbewegung lesen: absteigend
 * statt aufsteigend, oder nur der Grundton als Aufloesung. **Ein Klang, der
 * schon zur Marke gehoert, passt per Konstruktion** — und ein einzelner Ton
 * kann leiser sein als Rauschen und trotzdem da.
 */
const SWISCHPROBEN = () => [
  {
    name: '1-aufsteigend',
    was: 'Wandert nach oben, 600 → 2400 Hz. Der Stoff nimmt Fahrt auf.',
    proben: swisch({ dauerSek: 0.4, vonHz: 600, bisHz: 2400, pegel: 1.4 }),
  },
  {
    name: '2-absteigend',
    was: 'Wandert nach unten, 2400 → 600 Hz. Der Stoff zieht sich weg.',
    proben: swisch({ dauerSek: 0.4, vonHz: 2400, bisHz: 600, pegel: 1.4 }),
  },
  {
    name: '3-sanft-lang',
    was: 'Leiser und länger, 700 → 1800 Hz über 0,55 s. Kaum bemerkt.',
    proben: swisch({ dauerSek: 0.55, vonHz: 700, bisHz: 1800, pegel: 0.9 }),
  },
  {
    name: '4-doppelt',
    was: 'Zwei Bahnen, leicht versetzt — links und rechts ziehen nicht gleich.',
    proben: nacheinander([
      { ab: 0, proben: swisch({ dauerSek: 0.42, vonHz: 650, bisHz: 2200, pegel: 1.1 }) },
      { ab: 0.05, proben: swisch({ dauerSek: 0.4, vonHz: 800, bisHz: 2600, pegel: 0.8 }) },
    ]),
  },
  {
    name: '5-hauch',
    was: 'Dasselbe Swisch, nur halb so laut. Ein Hauch statt eines Zuges.',
    proben: swisch({ dauerSek: 0.5, vonHz: 700, bisHz: 1700, pegel: 0.42 }),
  },
  {
    /*
     * Der Grundton des Auftakts, eine Oktave tiefer. Der Akkord hat
     * aufgemacht, die Tonika schliesst — **eine Klammer, kein zweites Signal.**
     */
    name: '6-grundton',
    was: 'D4, der Grundton des Auftakts eine Oktave tiefer. Weich an, lang aus.',
    proben: leiser(ton(1.1, () => 293.66, { anstiegSek: 0.09, abfall: 4.2, oktave: 0.3 }), 0.3),
  },
  {
    /*
     * Der Auftakt rueckwaerts. Aufsteigend kuendigt an, absteigend loest auf —
     * dieselben drei Toene, die Gegenbewegung.
     */
    name: '7-dreiklang-abwaerts',
    was: 'Der Auftakt rückwärts: A5, Fis5, D5, sehr leise. Die Gegenbewegung.',
    proben: nacheinander([
      { ab: 0, proben: leiser(ton(0.55, () => 880, { anstiegSek: 0.05, abfall: 8, oktave: 0.2 }), 0.2) },
      { ab: 0.07, proben: leiser(ton(0.6, () => 739.99, { anstiegSek: 0.05, abfall: 7, oktave: 0.2 }), 0.2) },
      { ab: 0.14, proben: leiser(ton(0.8, () => 587.33, { anstiegSek: 0.05, abfall: 5, oktave: 0.24 }), 0.2) },
    ]),
  },
  {
    /*
     * Beides zugleich: Der Hauch traegt die Bewegung, der Ton die Aufloesung.
     * Zusammen sind sie leiser als jeder fuer sich es sein muesste.
     */
    name: '8-hauch-und-ton',
    was: 'Hauch und Grundton übereinander — Bewegung plus Auflösung.',
    proben: nacheinander([
      { ab: 0, proben: swisch({ dauerSek: 0.45, vonHz: 700, bisHz: 1700, pegel: 0.3 }) },
      { ab: 0.06, proben: leiser(ton(0.9, () => 293.66, { anstiegSek: 0.09, abfall: 5, oktave: 0.28 }), 0.25) },
    ]),
  },
];

const VORHANGPROBEN = () => [
  {
    name: '1-samt-dumpf',
    was: 'Schwerer Samt, nur Stoff. Tiefpass 400 → 900 Hz.',
    proben: fahrt({ vonHz: 400, bisHz: 900, lautheit: bogen }),
  },
  {
    name: '2-samt-hell',
    was: 'Leichterer Stoff, mehr Zug. 900 → 2500 Hz.',
    proben: fahrt({ vonHz: 900, bisHz: 2500, lautheit: bogen }),
  },
  {
    name: '3-samt-schiene',
    was: 'Dumpfer Stoff plus die Rollen auf der Stange.',
    proben: nacheinander([
      { ab: 0, proben: fahrt({ vonHz: 400, bisHz: 900, lautheit: bogen }) },
      { ab: 0.02, proben: schiene(FAHRT_SEK, 7, 20260831) },
    ]),
  },
  {
    name: '4-hell-schiene',
    was: 'Hellerer Stoff plus Rollen.',
    proben: nacheinander([
      { ab: 0, proben: fahrt({ vonHz: 900, bisHz: 2500, lautheit: bogen }) },
      { ab: 0.02, proben: schiene(FAHRT_SEK, 7, 20260831) },
    ]),
  },
  {
    /*
     * Zufahren endet mit einem Treffer: Die beiden Haelften stossen in der
     * Mitte zusammen. Physikalisch ist das der einzige Moment der ganzen
     * Bewegung mit einem echten Anschlag.
     */
    name: '5-zu-mit-anschlag',
    was: 'Dumpf, und am Ende stossen die Hälften zusammen.',
    proben: nacheinander([
      { ab: 0, proben: fahrt({ vonHz: 400, bisHz: 1100, lautheit: (a) => bogen(a) * (0.6 + 0.4 * a) }) },
      { ab: FAHRT_SEK - 0.03, proben: huelle(hochpass(rauschen(0.16), 120), (t) => Math.exp(-22 * t) * 0.75) },
    ]),
  },
  {
    /*
     * Oeffnen ist die Gegenbewegung: kein Ziel, an dem etwas anstoesst. Der
     * Stoff zieht sich zur Seite und laeuft aus — deshalb laenger und ohne
     * Anschlag.
     */
    name: '6-auf-auslaufend',
    was: 'Dumpf, zieht sich weg und läuft aus. Kein Anschlag.',
    proben: fahrt({
      vonHz: 500,
      bisHz: 800,
      dauerSek: 0.55,
      lautheit: (a) => bogen(Math.min(1, a * 1.5)) * (1 - a * 0.35),
    }),
  },
];

/**
 * Fassungen fuer den Publikumston, mit `--raunen`.
 *
 * **Die Aufgabe ist nicht „ein Publikum", sondern „der Kipppunkt ist da".**
 * Das ist die Lehre aus dem Vorhangstoff: Dort sind drei Anlaeufe an einem
 * Geraeusch gescheitert, und der vierte hat gewonnen, indem er das Geraeusch
 * auf seine Aufgabe beschraenkte — eine Richtung anzeigen, den Rest traegt ein
 * Ton, der ohnehin zur Marke gehoert.
 *
 * Deshalb stehen hier zwei Wege nebeneinander und nicht einer: das Raunen aus
 * Stimmen und **der Weg ohne Publikum**, ein tiefer Markenton auf A. Wer nur
 * die eine Sorte baut, entscheidet die Frage vor dem Hoeren.
 */
const RAUNPROBEN = () => [
  {
    name: '1-raunen',
    was: '14 Stimmen, 0,9 s, versetzt. Der direkte Weg.',
    proben: raunen({}),
  },
  {
    name: '2-raunen-knapp',
    was: '8 Stimmen, 0,6 s. Kuerzer und duenner — ein Aufmerken, kein Aufruhr.',
    proben: raunen({ stimmen: 8, dauerSek: 0.6 }),
  },
  {
    name: '3-raunen-leise',
    was: 'Halb so laut wie 1. Er laeuft deutlich unter der Stimme.',
    proben: raunen({ ziel: 0.015 }),
  },
  {
    name: '4-nur-ton',
    was: 'Kein Publikum: A2 mit langsamem Anschwellen. Der Weg, der beim Vorhang gewann.',
    proben: aufPegel(
      huelle(ton(0.9, () => 110, { abfall: 1.6, oktave: 0.5, anstiegSek: 0.12 }), (t) => bogen(t / 0.9)),
      0.03,
    ),
  },
  {
    name: '5-beides',
    was: 'Duennes Raunen ueber dem Ton. Das Publikum traegt die Farbe, der Ton den Einsatz.',
    proben: nacheinander([
      {
        ab: 0,
        proben: aufPegel(
          huelle(ton(0.9, () => 110, { abfall: 1.6, oktave: 0.5, anstiegSek: 0.12 }), (t) => bogen(t / 0.9)),
          0.02,
        ),
      },
      { ab: 0.06, proben: raunen({ stimmen: 9, ziel: 0.018 }) },
    ]),
  },
  {
    name: '6-gegenprobe-rauschen',
    was: 'Der naive Weg: gefiltertes Rauschen. Steht hier, damit die Wahl nicht blind ist.',
    proben: aufPegel(huelle(tiefpass(hochpass(rauschen(0.9), 200), () => 1400), (t) => bogen(t / 0.9)), 0.03),
  },
];

const main = async () => {
  if (process.argv.includes('--raunen')) {
    const ordner = path.join('laeufe', 'raunproben');
    await fs.mkdir(ordner, { recursive: true });
    console.log('   Raunproben — kostet kein Kontingent\n');
    console.log('   Zum Vergleich: Sprache im Vorspann liegt bei RMS 0,08.\n');
    for (const { name, was, proben } of RAUNPROBEN()) {
      await fs.writeFile(path.join(ordner, `${name}.wav`), wav(proben));
      const m = messen(proben);
      console.log(
        `   ${name.padEnd(24)} ${(proben.length / RATE).toFixed(2)}s  ` +
          `RMS ${m.rms.toFixed(3)}  über 2 kHz ${(m.ueber2k * 100).toFixed(0)} %  ${was}`,
      );
    }
    return;
  }

  if (process.argv.includes('--swisch')) {
    const ordner = path.join('laeufe', 'swischproben');
    await fs.mkdir(ordner, { recursive: true });
    console.log('   Swischproben — kostet kein Kontingent\n');
    for (const { name, was, proben } of SWISCHPROBEN()) {
      await fs.writeFile(path.join(ordner, `${name}.wav`), wav(proben));
      console.log(`   ${name.padEnd(18)} ${(proben.length / RATE).toFixed(2)}s  ${was}`);
    }
    return;
  }

  if (process.argv.includes('--proben')) {
    const ordner = path.join('laeufe', 'vorhangproben');
    await fs.mkdir(ordner, { recursive: true });
    console.log('   Vorhangproben — kostet kein Kontingent\n');
    for (const { name, was, proben } of VORHANGPROBEN()) {
      const ziel = path.join(ordner, `${name}.wav`);
      await fs.writeFile(ziel, wav(proben));
      console.log(`   ${name.padEnd(20)} ${(proben.length / RATE).toFixed(2)}s  ${was}`);
    }
    return;
  }

  const ordner = path.join('public', 'ton', 'marke');
  await fs.mkdir(ordner, { recursive: true });

  /*
   * **gefaellt** — ein kurzer, heller Pop mit steigender Tonhoehe.
   *
   * Steigend, weil er auf etwas zeigt: Er hebt an, statt abzuschliessen. 130
   * Millisekunden, damit er unter der Stimme durchgeht und nicht ueber ihr
   * steht.
   */
  const gefaellt = ton(0.13, (t) => 660 + 520 * t * 8, { abfall: 34, oktave: 0.22 });

  /*
   * **folgen** — zwei Toene, eine Quinte auseinander, der zweite nach 90 ms.
   *
   * Zwei statt einem, weil der Schluss bestaetigt und nicht hinweist. Die
   * Quinte klingt aufgeloest; eine Sekunde oder Terz klaenge nach Frage.
   */
  const folgen = nacheinander([
    { ab: 0, proben: ton(0.4, () => 587.33, { abfall: 13 }) }, // D5
    { ab: 0.09, proben: ton(0.42, () => 880, { abfall: 11 }) }, // A5
  ]);

  /*
   * **auftakt** — der Dreiklang, mit dem die Show beginnt.
   *
   * D-Dur: D5, Fis5, A5, je 70 Millisekunden versetzt. Er stand am 31.08.2026
   * schon einmal hier, als **Jingle beim Oeffnen**, und ist dort abgelehnt
   * worden: „Ein Jingle kuendigt an, ein Vorhang bewegt sich."
   *
   * **Der Einwand war richtig, der Platz war falsch.** Ankuendigen ist genau
   * die Aufgabe an dieser Stelle: Er steht auf Bild null, vor dem geschlossenen
   * Vorhang, und sagt, dass jetzt etwas anfaengt.
   *
   * Er hiess bis zum 31.08.2026 `vorhang-zu`, und der Name stimmte auch nur
   * einen Abend lang — seit der Vorhang schon geschlossen beginnt, faehrt
   * nichts mehr zu. **Ein Name, der eine Bewegung nennt, die es nicht gibt, ist
   * die Sorte Altlast, die spaeter niemand mehr aufloest.**
   *
   * Er endet auf demselben A5 wie `folgen` und teilt dessen Grundton D5. Die
   * Markentoene sind damit **derselbe Akkord in mehreren Rollen**: ein Pop beim
   * Hinweis, eine Quinte beim Schluss, der volle Dreiklang beim Auftritt. Das
   * war nicht der Ausgangspunkt — `folgen` stand schon auf D und A, die Terz
   * dazwischen war die einzige Note, die fehlte.
   */
  const auftakt = nacheinander([
    { ab: 0, proben: ton(0.5, () => 587.33, { abfall: 9, oktave: 0.24 }) }, // D5
    { ab: 0.07, proben: ton(0.5, () => 739.99, { abfall: 9, oktave: 0.24 }) }, // Fis5
    { ab: 0.14, proben: ton(0.52, () => 880, { abfall: 8, oktave: 0.26 }) }, // A5
  ]);

  /*
   * **oeffnung** — Hauch und Grundton, wenn der Vorhang aufgeht.
   *
   * **Zwei Schichten, zwei Aufgaben.** Ein Hauch — schmales Rauschband, das
   * von 700 nach 1700 Hz wandert — traegt die **Bewegung**; darunter D4, der
   * Grundton des Auftakts eine Oktave tiefer, traegt die **Aufloesung**. Der
   * Akkord hat aufgemacht, die Tonika schliesst.
   *
   * ## Was daran gemessen ist
   *
   * Der Vorhang sollte zuerst ein Stoffgeraeusch bekommen, und zwei Anlaeufe
   * sind daran gescheitert: Ein breites Rauschband klingt nach Foen (67 % der
   * Energie ueber 2 kHz), ein schmales wandernden nach Swisch — sanfter, aber
   * allein immer noch fremd. **Synthese baut Klaenge gut und Texturen
   * schlecht**, und ein Vorhang ist eine Textur.
   *
   * Der Ausweg war nicht, das Rauschen wegzulassen, sondern es **auf seine
   * Aufgabe zu beschraenken**: Es muss nicht nach Stoff klingen, es muss nur
   * eine Richtung anzeigen. Den Rest traegt ein Ton, der ohnehin zur Marke
   * gehoert.
   *
   * **Zusammen sind sie leiser, als jeder fuer sich sein muesste** — RMS 0,019
   * gegen 0,08 der Sprache, das leiseste aller acht Kandidaten mit Ausnahme des
   * blossen Hauchs. Zwei Schichten decken einander, eine allein muesste sich
   * durchsetzen.
   *
   * Der Tongenerator bringt einen festen Pegel mit, der fuer ein
   * Begleitgeraeusch zu hoch ist — daher `leiser`. Ohne ihn laege der Ton bei
   * 0,08 und damit genau auf Sprachniveau.
   *
   * Es dauert 0,96 Sekunden und damit laenger als die Fahrt (0,4). Das ist
   * Absicht: Es klingt in die erste Szene hinein und traegt den Uebergang.
   */
  const oeffnung = nacheinander([
    { ab: 0, proben: swisch({ dauerSek: 0.45, vonHz: 700, bisHz: 1700, pegel: 0.3 }) },
    { ab: 0.06, proben: leiser(ton(0.9, () => 293.66, { anstiegSek: 0.09, abfall: 5, oktave: 0.28 }), 0.25) }, // D4
  ]);

  /*
   * **kipppunkt** — der Ton, an dem die Wendung sitzt. A2, 0,9 Sekunden,
   * langsam anschwellend und wieder weg.
   *
   * **Er sollte ein Publikum sein und ist keins.** Der Kanal ist eine Show mit
   * Vorhang, und eine Show hat ein Publikum, das an der Stelle raunt, wo der
   * Fakt kippt. Sechs Fassungen standen zur Wahl (`--raunen`), drei davon ein
   * Raunen aus 8 bis 14 synthetischen Stimmen — und gewonnen hat die vierte,
   * die gar keins ist.
   *
   * **Damit gilt der Satz vom Vorhangstoff ein zweites Mal**, und zwar
   * schaerfer: Der Ausweg ist nicht, die Textur besser zu bauen, sondern den
   * Klang auf seine Aufgabe zu beschraenken. Die Aufgabe heisst hier nicht
   * „ein Publikum", sondern „der Kipppunkt ist da" — und dafuer genuegt ein
   * Ton, der ohnehin zur Marke gehoert.
   *
   * A2 (110 Hz) und nicht D: Der Auftakt steht auf D-Dur, die Oeffnung auf D4.
   * Die Quinte darunter traegt, ohne den Dreiklang noch einmal aufzusagen.
   *
   * Der Pegel steht **hier** und nicht als `volume` im Renderer: Hier ist er
   * messbar, dort waere er eine zweite Stellschraube fuer dieselbe Groesse.
   */
  const kipppunkt = aufPegel(
    huelle(ton(0.9, () => 110, { abfall: 1.6, oktave: 0.5, anstiegSek: 0.12 }), (t) => bogen(t / 0.9)),
    0.03,
  );

  for (const [name, proben] of [
    ['gefaellt', gefaellt],
    ['folgen', folgen],
    ['auftakt', auftakt],
    ['oeffnung', oeffnung],
    ['kipppunkt', kipppunkt],
  ] as const) {
    const ziel = path.join(ordner, `${name}.wav`);
    await fs.writeFile(ziel, wav(proben));
    const kb = (proben.length * 2 + 44) / 1024;
    console.log(`   ${name.padEnd(10)} ${(proben.length / RATE).toFixed(2)}s  ${kb.toFixed(0)} KB  ${ziel}`);
  }
};

console.log('\nGanz akkurat · Markentöne\n');
await main();
console.log('');
