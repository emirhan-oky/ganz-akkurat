import { readFileSync } from 'node:fs';
import { Idee, Short, type Quelle } from '../src/typen';
import { beispielShort } from '../daten/beispiel-short';
import { GEPARKT, WOCHENLAUF } from '../daten/entwuerfe';
import { IDEEN, reichweiteInWochen } from '../daten/ideen';
import { shortPruefen } from '../src/pruefung';
import { redelaeufe } from '../src/stimme';
import { zusatzpausenSek } from '../src/zeit';
import { nachleser } from '../daten/figur/nachleser';
import { POSEN, posenPruefen } from '../video/bausteine/posen';
import {
  GENUG_FUER_MEDIAN,
  herkuenfteLesen,
  median,
  rueckblickLesen,
  zusammenfuehren,
} from '../src/rueckschau';

/**
 * Schemapruefung der Daten — die Luecke, die `tsc` nicht schliesst.
 *
 * TypeScript prueft Formen, nicht Werte. Ein Short mit zwei statt drei
 * Quellen typisiert einwandfrei und faellt erst zur Laufzeit durch das
 * Zod-Schema.
 *
 * Das ist besonders teuer beim **Referenz-Short**: Er ist die Standard-Prop
 * der Remotion-Komposition, und `calculateMetadata` parst ihn im
 * Browser-Kontext. Wirft er dort, bleibt Remotion in einem unerfuellten
 * Promise stehen — der Render haengt dann ohne jede Fehlermeldung, bis
 * jemand ihn abbricht. Genau das ist am 12.08.2026 passiert und hat
 * anderthalb Stunden gekostet, bevor die Ursache gefunden war.
 *
 * Deshalb laeuft diese Pruefung vor jedem Lauf mit.
 */

/**
 * Die Prueflinge kommen aus `daten/entwuerfe/index.ts`, nicht aus einer
 * eigenen Liste. Eine eigene Liste hatte diese Pruefung bis zum 13.08.2026,
 * und sie war um zwei Shorts veraltet — gemeldet wurde trotzdem gruen.
 *
 * Geparkte Entwuerfe blockieren nicht: Sie erscheinen als Hinweis und aendern
 * den Exit-Code nicht. Eine Pruefung, die dauerhaft rot ist, liest bald
 * niemand mehr.
 */
type Pruefling = { name: string; daten: unknown[]; blockierend: boolean };

const PRUEFLINGE: Pruefling[] = [
  { name: 'Referenz-Short (Standard-Prop der Komposition)', daten: [beispielShort], blockierend: true },
  { name: 'Wochenlauf', daten: WOCHENLAUF, blockierend: true },
  { name: 'geparkt', daten: GEPARKT, blockierend: false },
];

const pruefen = ({ name, daten, blockierend }: Pruefling): number => {
  let fehler = 0;
  for (const eintrag of daten) {
    const ergebnis = Short.safeParse(eintrag);
    if (ergebnis.success) continue;
    fehler++;
    const id = (eintrag as { id?: string }).id ?? '(ohne id)';
    const melden = blockierend ? console.error : console.warn;
    melden(`${blockierend ? '✕' : '·'} ${name} · ${id}`);
    for (const problem of ergebnis.error.issues) {
      melden(`    ${problem.path.join('.') || '(wurzel)'}: ${problem.message}`);
    }
  }
  return blockierend ? fehler : 0;
};

const gesamt = PRUEFLINGE.reduce((n, p) => n + p.daten.length, 0);
let fehler = PRUEFLINGE.reduce((n, p) => n + pruefen(p), 0);

/*
 * Der Ideenvorrat wird mitgeprueft, blockierend.
 *
 * `tsc` sieht an einer Idee nur die Form, nicht die Regel: dass mindestens
 * eine der genannten Instanzen unbeteiligt sein muss und dass `belegt` drei
 * Quellen verlangt, steht in `Idee.superRefine` — und ein superRefine laeuft
 * nur, wenn jemand parst. Ohne diese Schleife waere es eine tote Regel,
 * derselbe Fall wie beim `Lauf`-Schema.
 */
for (const idee of IDEEN) {
  const ergebnis = Idee.safeParse(idee);
  if (ergebnis.success) continue;
  fehler++;
  console.error(`✕ Ideenvorrat · ${idee.id}`);
  for (const problem of ergebnis.error.issues) {
    console.error(`    ${problem.path.join('.') || '(wurzel)'}: ${problem.message}`);
  }
}

/*
 * Die harten Regeln laufen hier mit — nicht erst im Wochenlauf.
 *
 * Bis zum 18.08.2026 prueften `npm run pruefen` und `shortPruefen` zwei
 * verschiedene Dinge: hier das Zod-Schema, dort die Regeln aus
 * `src/pruefung.ts`. Aufgefallen ist der Unterschied an einem Schlusssatz
 * mit „Schreib es in die Kommentare" — die Regel dagegen meldete ihn
 * zuverlaessig, aber `npm run pruefen` sagte gruen.
 *
 * Das ist derselbe Fehler wie bei `npm run belege`, nur eine Stufe frueher:
 * **Was erst in der Freigabe auffaellt, ist schon vertont und schon
 * gerendert.** Die Regeln kosten hier nichts und finden dort alles, was
 * keine Tonspur braucht; die tonspurabhaengigen Bloecke in `shortPruefen`
 * ueberspringen sich von selbst, solange keine vorliegt.
 */
const quellen = (
  JSON.parse(readFileSync('daten/quellen.json', 'utf8')) as { quellen?: Quelle[] } | Quelle[]
);
const quellenliste = Array.isArray(quellen) ? quellen : (quellen.quellen ?? []);

let hinweise = 0;
for (const eintrag of WOCHENLAUF) {
  for (const befund of shortPruefen(eintrag, quellenliste)) {
    if (befund.stufe === 'fehler') {
      fehler++;
      console.error(`✕ Regel · ${befund.shortId} · [${befund.regel}] ${befund.text}`);
    } else {
      hinweise++;
      console.warn(`· Hinweis · ${befund.shortId} · [${befund.regel}] ${befund.text}`);
    }
  }
}

/*
 * Die Figur wird hier mitgeprueft und nicht nur beim Rendern.
 *
 * Aus demselben Grund, aus dem die Schemapruefung ueberhaupt existiert: Das
 * Rig-Paket wird im Browser-Kontext geparst, und ein ungueltiges Rig laesst
 * Remotion in einem unerfuellten Promise stehen — der Render haengt ohne
 * Fehlermeldung. `Rig.parse` liegt in `daten/figur/nachleser.ts` auf
 * Modulebene, der Import hier loest ihn also aus.
 *
 * `posenPruefen` faengt die andere Haelfte: einen Tippfehler in einem
 * Gelenknamen. Der ist im Bild unsichtbar, weil der Renderer ihn nachschlaegt,
 * nichts findet und die Ruhelage zeichnet. Die Figur wirkt dann steif, und
 * niemand sucht die Ursache in einem Buchstaben.
 */
const figurenbefunde = posenPruefen(nachleser);
for (const befund of figurenbefunde) console.error(`✗ Fehler  · [figur] ${befund}`);
fehler += figurenbefunde.length;

/*
 * ## Die Wache über der Pausenrechnung
 *
 * `zusatzpausenSek` in `src/zeit.ts` bildet nach, welche Pausen `redelaeufe`
 * in `src/stimme.ts` zwischen zwei Sprechern einlegt. Zwei Fassungen derselben
 * Regel — aufrufen lässt sich die eine von der anderen nicht, weil
 * `stimme.ts` `node:buffer` importiert und die Schätzung über
 * `calculateMetadata` im Browser läuft.
 *
 * **Eine Doppelung ohne Wache ist der eigentliche Fehler, nicht die
 * Doppelung.** Dasselbe Vorbild wie bei `rede` neben `sprechtext` und bei
 * `herausgeber`: Hier läuft beides je Short gegeneinander, und jede Abweichung
 * über einer Millisekunde hält den Lauf zurück.
 *
 * Verglichen wird nur, was `redelaeufe` als Zahl ausweist: die Pause vor jedem
 * Lauf. Der Szenentrenner **innerhalb** eines Laufs steckt im Text und nicht
 * in `pauseDavorSek` — die Schätzung zählt ihn als Atempause, und genau um
 * deren Differenz korrigiert `zusatzpausenSek` an der Szenengrenze.
 */
for (const short of [...WOCHENLAUF, ...GEPARKT, beispielShort]) {
  const ausRede = redelaeufe(short).reduce((summe, lauf) => summe + lauf.pauseDavorSek, 0);

  const bestellte = short.szenen.reduce((summe, szene, i) => {
    const naechste = short.szenen[i + 1];
    if (!naechste || szene.pauseSek === undefined) return summe;
    const letzter = szene.rede?.[szene.rede.length - 1]?.sprecher ?? 'nachleser';
    const erster = naechste.rede?.[0]?.sprecher ?? 'nachleser';
    return letzter === erster ? summe : summe + szene.pauseSek;
  }, 0);

  const grenzwechsel = short.szenen.reduce((n, szene, i) => {
    const naechste = short.szenen[i + 1];
    if (!naechste || szene.pauseSek !== undefined) return n;
    const letzter = szene.rede?.[szene.rede.length - 1]?.sprecher ?? 'nachleser';
    const erster = naechste.rede?.[0]?.sprecher ?? 'nachleser';
    return letzter === erster ? n : n + 1;
  }, 0);

  // `zusatzpausenSek` zieht an jeder Szenengrenze die Atempause ab, die
  // `szenendauerAus` dort schon zählt. Für den Vergleich kommt sie zurück.
  const nachgerechnet = zusatzpausenSek(short) + grenzwechsel * 0.32 + bestellte;

  if (Math.abs(ausRede - nachgerechnet) > 0.001) {
    console.error(
      `✗ Fehler  · ${short.id} · [pausen] Die Schätzung rechnet ${nachgerechnet.toFixed(2)}s ` +
        `Sprecherpausen, die Vertonung legt ${ausRede.toFixed(2)}s ein. ` +
        '`zusatzpausenSek` in `src/zeit.ts` und `redelaeufe` in `src/stimme.ts` ' +
        'sind auseinandergelaufen.',
    );
    fehler += 1;
  }
}

if (fehler > 0) {
  console.error(`\n${fehler === 1 ? 'Ein Befund haelt' : `${fehler} Befunde halten`} den Lauf zurück.`);
  process.exit(1);
}

const belegt = IDEEN.filter((i) => i.reifegrad === 'belegt').length;
const produziert = IDEEN.filter((i) => i.reifegrad === 'produziert').length;

console.log(
  `✓ Schema: ${gesamt} Shorts geprüft, keine blockierenden Verstöße` +
    (hinweise > 0 ? ` (${hinweise} Hinweis${hinweise === 1 ? '' : 'e'})` : ''),
);
console.log(
  `✓ Figur:  ${nachleser.teile.length} Teile, ${Object.keys(nachleser.gelenke).length} Gelenke, ` +
    `${Object.keys(POSEN).length} Posen`,
);
console.log(
  `✓ Ideen:  ${IDEEN.length} im Vorrat (${belegt} belegt, ${produziert} produziert), ` +
    `Reichweite ${reichweiteInWochen()} Wochen bei einem Video je Format`,
);

/*
 * Der Rücklauf in einem Satz — an der Stelle, an der man ihn braucht.
 *
 * `npm run pruefen` steht vor jedem Wochenlauf. Das ist der Moment, in dem
 * die Themen der nächsten Woche feststehen und die letzten noch draußen sind;
 * wer hier nichts von ihnen liest, plant die dritte Woche ohne die erste.
 *
 * **Er darf den Lauf nie aufhalten.** Der Rückblick ist eine Beobachtung, die
 * Schemaprüfung ein Tor — ein fehlender Ordner, eine halb geschriebene Datei
 * oder ein alter Lauf gegen das heutige Schema wären sonst ein Grund, die
 * Woche nicht zu bauen. Deshalb steht alles hier in einem `catch`, das
 * schweigt.
 */
try {
  const rueckschau = zusammenfuehren(await rueckblickLesen(), await herkuenfteLesen());
  const werte = rueckschau
    .map((r) => r.mitHalt?.haltequote)
    .filter((q): q is number => q != null);

  if (rueckschau.length > 0) {
    const mitte = werte.length >= GENUG_FUER_MEDIAN ? median(werte) : null;
    console.log(
      `✓ Rücklauf: ${rueckschau.length} draußen, ${werte.length} mit Haltekurve` +
        (mitte === null
          ? ` — für einen Median braucht es ${GENUG_FUER_MEDIAN}. \`npm run ausreisser\``
          : `, Median ${mitte.toFixed(0)} % an Sekunde 3,5. \`npm run aufschlaege\``),
    );
  }
} catch {
  // Kein Rücklauf ist kein Fehler. Die Woche wird trotzdem gebaut.
}
