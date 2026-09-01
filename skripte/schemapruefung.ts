import { readFileSync } from 'node:fs';
import { Idee, Short, type Quelle } from '../src/typen';
import { beispielShort } from '../daten/beispiel-short';
import { GEPARKT, WOCHENLAUF } from '../daten/entwuerfe';
import { IDEEN, reichweiteInWochen } from '../daten/ideen';
import { laufPruefen,
  ZU_BREIT_IM_WORTWECHSEL,
} from '../src/pruefung';
import { redelaeufe } from '../src/stimme';
import { SZENENGRENZE_SEK, zusatzpausenSek } from '../src/zeit';
import { nachleser } from '../daten/figur/nachleser';
import { AUSSENREICHWEITE, POSEN, posenPruefen } from '../video/bausteine/posen';
import {
  AUFRICHTUNG,
  WORTWECHSEL,
  WORTWECHSEL_SCHLUSS,
  zuBreiteWortwechselposen,
} from '../video/bausteine/Buehnenbild';
import { SICHERE_ZONE, VORHANG } from '../src/marke';
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
 *
 * ## Und seit dem 30.08.2026 auch die laufweiten Regeln
 *
 * Hier stand `shortPruefen` je Short — also genau die Haelfte. Die andere
 * Haelfte, `laufweiteBefunde`, lief weiterhin nur im Wochenlauf, und der ruft
 * sie **nach** der Vertonung auf.
 *
 * Am 30.08.2026 hat das 2.199 Zeichen gekostet: `npm run pruefen` war gruen,
 * und der bezahlte Lauf meldete danach vier Fehler — dreimal `Wechselrede`
 * hintereinander und drei verbotene Posen im Wortwechsel. Beides braucht
 * keine Tonspur. Beides war vorher zu haben.
 *
 * **Der Kommentar darueber beschrieb die Regel richtig und der Code hielt sie
 * halb** — das ist die teuerste Sorte Luecke, weil sie beim Lesen wie ein
 * geschlossener Fall aussieht.
 *
 * `nurEinzeln` bleibt `false`: Wir pruefen hier immer den ganzen Lauf. Der
 * Teillauf schaltet die laufweiten Regeln bewusst ab, aber das ist eine
 * Ansicht auf einen Short — diese Datei sieht die Liste.
 *
 * Ohne Verlauf laeuft es, und das ist Absicht: Die Wiederholungsregel braucht
 * ihn und meldet ohne ihn nichts. Sie ist ein Hinweis, haelt also nichts
 * zurueck; ihn hier zu laden hiesse, die Freigabe-Uebersicht in die
 * Vorabpruefung zu ziehen.
 */
const quellen = (
  JSON.parse(readFileSync('daten/quellen.json', 'utf8')) as { quellen?: Quelle[] } | Quelle[]
);
const quellenliste = Array.isArray(quellen) ? quellen : (quellen.quellen ?? []);

let hinweise = 0;
for (const befund of laufPruefen(WOCHENLAUF, quellenliste).befunde) {
  if (befund.stufe === 'fehler') {
    fehler++;
    console.error(`✕ Regel · ${befund.shortId} · [${befund.regel}] ${befund.text}`);
  } else {
    hinweise++;
    console.warn(`· Hinweis · ${befund.shortId} · [${befund.regel}] ${befund.text}`);
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
 * ## Die Wache über der Wortwechsel-Sperre
 *
 * `src/pruefung.ts` sperrt Posen, die im Wortwechsel aus dem Bild ragen. Die
 * Liste dort ist **abgeleitet und nicht geschrieben** — welche Posen das sind,
 * folgt aus der Anordnung (`WORTWECHSEL`) und der gemessenen Reichweite
 * (`AUSSENREICHWEITE`), und beides steht in `video/`.
 *
 * **Warum die Liste trotzdem in `src/pruefung.ts` steht:** Die Prüfregeln
 * dürfen nicht aus `video/` importieren, sonst zöge der Renderer an der
 * Datenprüfung. Also eine Doppelung — und eine Doppelung ohne Wache ist der
 * eigentliche Fehler, nicht die Doppelung.
 *
 * **Der Anlass ist frisch.** Am 31.08.2026 stand dieselbe Sperre binnen eines
 * Tages zweimal falsch da: erst zu eng (die Anordnung hatte sich geändert und
 * die Liste nicht), dann leer (die Kantenrechnung lief gegen die Ruhepose und
 * übersah drei ausgreifende Posen). Zwei handgeschriebene Listen, beide still
 * falsch.
 */
const erwartet = zuBreiteWortwechselposen(WORTWECHSEL, AUSSENREICHWEITE).sort();
const gesetzt = [...ZU_BREIT_IM_WORTWECHSEL].sort();
if (erwartet.join(',') !== gesetzt.join(',')) {
  console.error(
    `✗ Fehler  · [figur] Die Wortwechsel-Sperre in \`src/pruefung.ts\` steht auf ` +
      `[${gesetzt.join(', ') || '—'}], gerechnet sind [${erwartet.join(', ') || '—'}]. ` +
      'Die Anordnung oder die Reichweiten haben sich geändert.',
  );
  fehler += 1;
}

/*
 * ## Ragt eine aufgerichtete Figur oben aus der Bühne?
 *
 * `AUSSENREICHWEITE` und die Sperre darüber rechnen ausschließlich **Breite**
 * — sie war immer die Grenze, weil das Bühnen-SVG mit 200 zu 150 Einheiten
 * breitenbegrenzt ist. Seit dem 01.09.2026 gibt es eine Größe, die die Figur
 * **höher** macht: `ZUGARTEN[...].aufrichtung` streckt den Körper um
 * `AUFRICHTUNG` um die Standlinie.
 *
 * Gerechnet ist heute reichlich Luft: Im Wortwechsel steht die Oberkante bei
 * 52,4 und gestreckt bei 49,4; im Schluss bei 29,6 und 25,8. Reißen würde es
 * erst bei einer Figurengröße von rund 1,13.
 *
 * **Die Wache steht trotzdem hier, und zwar genau deswegen.** Die 0,92 des
 * Schlusses sind am 01.09.2026 von 0,73 heraufgesetzt worden, weil die Figuren
 * zu klein standen — und wer sie das nächste Mal heraufsetzt, hat keinen
 * Grund, an die Streckung zu denken. Eine Bremse, die still greift, ist
 * schlimmer als eine, die meldet: `Buehne` skalierte den ganzen Inhalt
 * kleiner, und niemand wüsste warum.
 */
const figurOberkante = Math.min(
  ...nachleser.teile.flatMap((t) =>
    t.formen.map((f) => {
      if (f.art === 'rechteck') return f.y;
      if (f.art === 'kreis') return f.cy - f.r;
      if (f.art === 'ellipse') return f.cy - f.ry;
      /*
       * Beim Pfad wird jede zweite Zahl als y gelesen. Grob, und das genuegt:
       * Gefragt ist die oberste Kante, und die liegt in dieser Figur ohnehin
       * im Gehaeuse — einem Rechteck.
       */
      const zahlen = f.d.match(/-?\d+(\.\d+)?/g) ?? [];
      return Math.min(...zahlen.filter((_, i) => i % 2 === 1).map(Number));
    }),
  ),
);
for (const [name, stand] of [
  ['Wortwechsel', WORTWECHSEL],
  ['Schluss', WORTWECHSEL_SCHLUSS],
] as const) {
  const gestreckt = 140 - (140 - figurOberkante) * stand.groesse * (1 + AUFRICHTUNG);
  if (gestreckt < 0) {
    console.error(
      `✗ Fehler  · [figur] Eine aufgerichtete Figur ragt im ${name} bis y = ` +
        `${gestreckt.toFixed(1)} und damit über den Bühnenrand. Bei groesse ` +
        `${stand.groesse} und ${(AUFRICHTUNG * 100).toFixed(2)} % Streckung geht das nicht auf.`,
    );
    fehler += 1;
  }
}

/*
 * ## Die zwei Wachen über den Geometriezahlen
 *
 * Beide bewachen eine Zahl, die an einem Ort steht und an einem anderen
 * gebraucht wird — dieselbe Bauart wie die Wortwechsel-Sperre darüber.
 */

/*
 * **Der Vorhangstreifen darf nicht in die Bühne wachsen.**
 *
 * `VORHANG.rand` ist aus `SICHERE_ZONE.links` hergeleitet (170 − 40 Reserve).
 * Wer die sichere Zone anfasst, ändert damit stillschweigend den Abstand mit —
 * und ein Streifen, der über die Bühnenkante läuft, verdeckt Szeneninhalt,
 * ohne dass irgendetwas meldet.
 */
const zonenrand = Math.min(SICHERE_ZONE.links, SICHERE_ZONE.rechts);
if (VORHANG.rand + 40 > zonenrand) {
  console.error(
    `✗ Fehler  · [vorhang] Der Vorhangstreifen ist ${VORHANG.rand} Pixel breit, ` +
      `die Bühne beginnt bei ${zonenrand}. Es bleiben ${zonenrand - VORHANG.rand} ` +
      'Pixel Reserve statt der geforderten 40 — der Streifen liegt auf dem Szeneninhalt.',
  );
  fehler += 1;
}

/*
 * **Die Fehlermeldung zur Symbolsperre nennt eine Zahl aus dem Renderer.**
 *
 * `src/typen.ts` darf nicht aus `video/` importieren, also steht dort
 * `WORTWECHSEL.rechts` als Text in der Meldung. Am 31.08.2026 stand die Zahl
 * ein halbes Jahr nach dem Umbau noch auf 158, während der Renderer längst auf
 * 150 lief — eine Meldung, die eine falsche Begründung liefert, ist schlimmer
 * als keine.
 */
const WORTWECHSEL_RECHTS_IN_MELDUNG = 150;
if (WORTWECHSEL.rechts !== WORTWECHSEL_RECHTS_IN_MELDUNG) {
  console.error(
    `✗ Fehler  · [figur] Die zweite Figur steht auf x = ${WORTWECHSEL.rechts}, ` +
      `die Fehlermeldung zur Symbolsperre in \`src/typen.ts\` nennt ` +
      `${WORTWECHSEL_RECHTS_IN_MELDUNG}. Beide Zahlen nachziehen.`,
  );
  fehler += 1;
}

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
 * Verglichen wird, was `redelaeufe` als Zahl ausweist: die Pause vor jedem
 * Lauf. **Seit dem 31.08.2026 ist das alles** — vorher konnte eine Pause auch
 * im Text stecken (` ... `), und dort sah die Wache sie nicht. Genau dort
 * saßen bis zu 2,19 Sekunden je Szenengrenze, während beide Seiten 0,32
 * rechneten und die Wache zufrieden schwieg.
 *
 * **Eine Wache prüft nur, was sie sehen kann.** Was in einer Datei entsteht,
 * statt in einer Zahl zu stehen, entzieht sich ihr — das ist der Grund, aus
 * dem die Pause jetzt ein Versatz im Schnitt ist und keine Bitte an die
 * Synthese.
 */
for (const short of [...WOCHENLAUF, ...GEPARKT, beispielShort]) {
  const ausRede = redelaeufe(short).reduce((summe, lauf) => summe + lauf.pauseDavorSek, 0);

  /*
   * **Seit dem 31.08.2026 zählt jede Szenengrenze, nicht nur die mit
   * Sprecherwechsel.** `redelaeufe` schneidet dort jetzt immer; vorher lief
   * ein Lauf über die Grenze weiter, wenn dieselbe Figur weitersprach, und die
   * Pause entstand über ` ... ` im Text — also nicht als Zahl in
   * `pauseDavorSek`, sondern in der Datei.
   *
   * Das war der Fehler, den diese Wache **nicht** finden konnte: Was im Text
   * steckt, weist `redelaeufe` nicht aus, und beide Seiten waren sich einig,
   * dass dort 0,32 anfallen. Gehört wurden 0,85 bis 2,19.
   */
  const grenzen = short.szenen.slice(0, -1);
  const bestellte = grenzen.reduce((summe, szene) => summe + (szene.pauseSek ?? 0), 0);
  const ohneBestellung = grenzen.filter((szene) => szene.pauseSek === undefined).length;

  /*
   * `zusatzpausenSek` zieht an jeder Szenengrenze die Atempause ab, die
   * `szenendauerAus` dort schon zählt. Für den Vergleich kommt sie zurück —
   * über `SZENENGRENZE_SEK` und nicht über eine abgeschriebene 0,32, sonst
   * stünde hier eine dritte Kopie derselben Zahl.
   */
  const nachgerechnet = zusatzpausenSek(short) + ohneBestellung * SZENENGRENZE_SEK + bestellte;

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
