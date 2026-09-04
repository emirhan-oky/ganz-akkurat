import { ALLE_ENTWUERFE } from '../daten/entwuerfe';
import { Short, Zug } from '../src/typen';

/**
 * `npm run dialogprobe` — Zahlen neben Emirhans Zahlen.
 *
 * **Das Skript urteilt nicht und haelt nichts zurueck.** Es zaehlt, was sich
 * zaehlen laesst, und stellt den Wert aus Emirhans Dialogen daneben. Wer
 * abweicht, hat vielleicht einen Grund; wer nie hinsieht, hat keinen.
 *
 * ## Warum es das gibt
 *
 * Am 04.09.2026 stand die Beschimpfungsregel an drei Orten: in
 * `dialoganalyse.md` mit Quotentabelle, im Schreibskill als Punkt 6 der
 * Selbstpruefung, und in `voice.md`. **In sieben von neun Dialogen dieses Tages
 * fehlte sie trotzdem** — in vieren davon an einer `richtigstellen`-Zeile, also
 * genau dort, wo die gemessene Quote 16 % betraegt. Emirhan hat einen davon
 * bemerkt, sechs sind durchgegangen.
 *
 * Eine Regel, die dreimal dasteht und trotzdem nicht wirkt, braucht keine
 * vierte Fassung. Sie braucht eine Zahl.
 *
 * ## Was es ausdruecklich nicht ist
 *
 * **Keine Wache.** In `src/pruefung.ts` steht kein Wort davon, und das ist
 * Absicht: Ein Fehler, der eine Beschimpfung erzwingt, macht aus dem Witz eine
 * Pflichtuebung — genau die Schablone, gegen die der Beispielvorrat gebaut ist.
 * Eine Zahl neben einer Vergleichszahl erzwingt nichts.
 */

/**
 * **Die Eichgruppe: Dialoge, deren Wortlaut ueberwiegend von Emirhan stammt.**
 *
 * Die Zuordnung ist nicht aus den Dateien ablesbar, deshalb steht sie hier mit
 * ihrem Nachweis. Sechs sind ueber Commits belegt, zwei ueber die Herkunft aus
 * einem Briefingbogen, den er ueberarbeitet hat.
 *
 * Der Rohbefund vom 02.09.2026 spricht von **neun** Dialogen mit 131
 * Redezeilen — „vier von Grund auf, fuenf ueberarbeitet". Der neunte liess sich
 * nicht sicher zuordnen: Bei `powerbank-wattstunden` und
 * `schaltsekunde-wette` stammt der Bau von mir und die Korrekturen von ihm.
 * **Lieber acht sichere als neun geratene** — die Eichwerte haengen daran.
 */
const EICHGRUPPE: Record<string, string> = {
  'passwort-wechseln': 'Commit d456bab „Emirhans erster Dialog"',
  'fremdes-ladekabel': 'Commit fcd1ed8 „nach Emirhans Urteil"',
  'drucker-gelbe-punkte': 'Commit b8eb959 „Emirhans Drucker-Dialog wird der Entwurf"',
  'auto-ereignisspeicher': 'Commit f111ec6 „Emirhans Ereignisspeicher-Dialog"',
  'akku-wechselbar-2027': 'Commit d636d04 „Emirhans Akku- und Flugmodus-Dialog"',
  flugmodus: 'Commit d636d04, derselbe',
  'akku-ganz-leer': 'aus `daten/briefings/akku-ganz-leer.md`, von ihm ueberarbeitet',
  handyheizung: 'aus `daten/briefings/nachts-laden.md`, von ihm ueberarbeitet',
};

/**
 * **Die Beschimpfungen, gezaehlt an 32 Vorkommen in 23 Shorts** (Befund 72/73).
 *
 * Zwei Gruppen, weil sie an verschiedenen Stellen stehen: „du Idiot" und „du
 * Pfosten" strafen und sitzen in Zuspitzung und Kipppunkt, „kleiner" versoehnt
 * und sitzt im Nachschlag. Wer nur eine Liste zaehlt, sieht den Unterschied
 * nicht.
 */
const STRAFEND = ['du idiot', 'du pfosten', 'du depp', 'du trottel', 'vollpfosten', 'vollidiot'];
const VERSOEHNEND = ['kleiner'];

/**
 * **Zuege, an denen die Beschimpfung sitzt.** Gemessen: `richtigstellen` 16 %,
 * `gegenbeispiel` 14 %, `nachhaken` 0,5 %. Sie steht dort, wo Volti einen
 * Irrtum umdreht, nicht dort, wo er Auskunft gibt.
 */
const KORRIGIERENDE_ZUEGE: Zug[] = ['richtigstellen', 'gegenbeispiel'];

/**
 * **Die nominale Ellipse — „jeder gesprochene Satz hat ein Verb", gemessen.**
 *
 * Der erste Anlauf zaehlte finite Verbformen aus einer Liste und **meldete 26
 * Saetze in Emirhans eigenen Dialogen**: „Da fliesst Strom durch, fertig.",
 * „Wir heben gleich ab.", „Du rettest gar nichts, du Idiot." Deutsch hat zu
 * viele Verben, als dass eine Liste sie fassen koennte — und eine Heuristik,
 * die das Eichmaterial anklagt, misst das Falsche.
 *
 * Die zweite Fassung sucht nicht nach dem fehlenden Verb, sondern nach der
 * **Form, die uebrig bleibt**: ein Satz, in dem jedes Wort entweder
 * grossgeschrieben ist oder ein Funktionswort. „Radarwarner." und „Drei
 * Bedingungen." erfuellen das, „Dein Teil passt." nicht — dort steht ein
 * kleingeschriebenes Wort, das kein Artikel ist, und das ist fast immer ein
 * Verb.
 *
 * Was uebrig bleibt, sind Ausrufe und Partizipien. Sie stehen unten, und die
 * Liste ist kurz, weil die Signatur den Rest schon aussortiert.
 */
const FUNKTIONSWORT =
  /^(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines|kein|keine|keinen|mein|meine|meinen|dein|deine|deinen|sein|seine|ihr|ihre|und|oder|aber|von|vom|mit|zum|zur|im|in|am|an|auf|für|bei|nach|über|unter|ohne|pro|je|bis|als|wie|so|nur|auch|noch|mal|halt|eben|etwa|rund|circa|ca|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|dreizehn|hundert|tausend|prozent|euro|watt|volt|gramm|sekunden|minuten|stunden|tage|jahre|zentimeter)$/i;

/** Was ohne Verb vollstaendig ist: Ausrufe, Partizipien, Namen, blosse Zahlen. */
const ELLIPSE_ERLAUBT =
  /^(watt|was|wie|wieso|warum|und|aber|ach|oh|nein|ja|doch|genau|abgemacht|verstanden|richtig|falsch|na|also|okay|klar|echt|ernsthaft|niemals|logisch|eben|stimmt|moment|halt|autsch|watti|volti|wetten|dreizehn|geladen|gekauft|gemacht|passiert|egal|schade|danke|bitte|sicher|vielleicht|natürlich|quatsch|pech|super|gut|schon)\b/i;

/**
 * Ein Satz ist eine nominale Ellipse, wenn **kein** Wort kleingeschrieben ist
 * ausser Funktionswoertern — und wenn mindestens zwei Woerter dastehen.
 * Einwortsaetze sind im Gespraech fast immer Ausrufe („Dreizehn.", „Watti.")
 * und werden nicht gemeldet.
 */
const istEllipse = (satz: string): boolean => {
  const roh = satz.replace(/[.!?…,;:„""»«]/g, '').trim();
  const woerter = roh.split(/\s+/).filter(Boolean);
  if (woerter.length < 2) return false;
  if (ELLIPSE_ERLAUBT.test(roh)) return false;
  return woerter.every((w) => FUNKTIONSWORT.test(w) || /^[A-ZÄÖÜ0-9]/.test(w));
};

type Mass = {
  id: string;
  eich: boolean;
  zeilen: number;
  zeichenSchnitt: number;
  zeichenWatti: number;
  zeichenVolti: number;
  wattiFragen: number;
  strafend: number;
  versoehnend: number;
  korrigierendeZuege: number;
  korrigierendMitStrafe: number;
  ohneVerb: string[];
};

const median = (werte: number[]): number => {
  if (werte.length === 0) return 0;
  const s = [...werte].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? Math.round(((s[m - 1] ?? 0) + (s[m] ?? 0)) / 2) : (s[m] ?? 0);
};

/** Der Kaltstart zaehlt mit: Er ist eine gesprochene Zeile wie jede andere. */
const zeilenVon = (short: Short): { sprecher: string; text: string; zug?: Zug }[] => [
  { sprecher: 'zeiger', text: short.kaltstart.satz },
  ...short.szenen.flatMap((szene) =>
    'rede' in szene && szene.rede
      ? szene.rede.map((r) => ({ sprecher: r.sprecher, text: r.text, zug: r.zug }))
      : [],
  ),
];

const messen = (short: Short): Mass => {
  const zeilen = zeilenVon(short);
  const laengen = zeilen.map((z) => z.text.length);
  const watti = zeilen.filter((z) => z.sprecher === 'zeiger');
  const volti = zeilen.filter((z) => z.sprecher === 'nachleser');
  const schnitt = (liste: { text: string }[]) =>
    liste.length === 0 ? 0 : Math.round(liste.reduce((s, z) => s + z.text.length, 0) / liste.length);
  const zaehle = (liste: string[]) =>
    zeilen.filter((z) => liste.some((w) => z.text.toLowerCase().includes(w))).length;

  /*
   * **Nur Voltis Zeilen.** Der erste Anlauf zaehlte ueber beide Figuren, und
   * damit landeten Wattis eigene Korrekturen im Nenner — „Hab ich schon, ich
   * bin doch kein Idiot." und sein BSI-Konter im Druckerdialog. Die Quote fiel
   * dadurch von 50 auf 25 %, also auf die Haelfte. Gefunden hat es die
   * Gegenprobe an Emirhans Dialogen, nicht das Nachlesen des Codes.
   */
  const korrigierend = zeilen.filter(
    (z) => z.sprecher === 'nachleser' && z.zug && KORRIGIERENDE_ZUEGE.includes(z.zug),
  );

  /*
   * Geprueft wird **je Satz**, nicht je Zeile: „Nein. Dafuer gebaut ist zum
   * Beispiel ein Radarwarner." haette als Zeile ein Verb und trotzdem eine
   * nominale Ellipse dahinter.
   */
  const ohneVerb = zeilen.flatMap((z) =>
    z.text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(istEllipse),
  );

  return {
    id: short.id,
    eich: short.id in EICHGRUPPE,
    zeilen: zeilen.length,
    zeichenSchnitt: Math.round(laengen.reduce((a, b) => a + b, 0) / Math.max(1, laengen.length)),
    zeichenWatti: schnitt(watti),
    zeichenVolti: schnitt(volti),
    wattiFragen: Math.round((watti.filter((z) => z.text.includes('?')).length / Math.max(1, watti.length)) * 100),
    strafend: zaehle(STRAFEND),
    versoehnend: zaehle(VERSOEHNEND),
    korrigierendeZuege: korrigierend.length,
    korrigierendMitStrafe: korrigierend.filter((z) =>
      STRAFEND.some((w) => z.text.toLowerCase().includes(w)),
    ).length,
    ohneVerb,
  };
};

const mittel = (werte: number[]): string =>
  werte.length === 0 ? '–' : (werte.reduce((a, b) => a + b, 0) / werte.length).toFixed(1);

const main = () => {
  /*
   * `safeParse`, nicht `parse` — und der Grund stand beim ersten Lauf sofort da:
   * `ladezyklen-steckdose` hatte eine `einheit` mit 21 Zeichen, das Schema
   * erlaubt 16. `npm run pruefen` meldete das als **Hinweis unter 59 anderen**,
   * weil `GEPARKT` nicht blockierend geprueft wird — jedes Skript, das die Datei
   * liest, waere daran abgestuerzt. Ein Werkzeug, das beim ersten kaputten
   * Datensatz stehen bleibt, wird nicht benutzt.
   */
  const shorts: Short[] = [];
  for (const entwurf of ALLE_ENTWUERFE) {
    const ergebnis = Short.safeParse(entwurf);
    if (ergebnis.success) shorts.push(ergebnis.data);
    else
      console.error(
        `  ✕ ${(entwurf as { id?: string }).id ?? '(ohne id)'} entspricht nicht dem Schema — nicht gemessen.`,
      );
  }
  const masse = shorts.map(messen);
  const eich = masse.filter((m) => m.eich);
  const meine = masse.filter((m) => !m.eich);

  const nurId = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const zeigen = nurId.length > 0 ? masse.filter((m) => nurId.includes(m.id)) : masse;

  console.log('\n  Eichgruppe — Dialoge, deren Wortlaut überwiegend von Emirhan stammt\n');
  for (const [id, nachweis] of Object.entries(EICHGRUPPE)) {
    console.log(`    ${id.padEnd(24)} ${nachweis}`);
  }

  const zeile = (m: Mass) => {
    const strafe =
      m.korrigierendeZuege === 0
        ? '   –  '
        : `${m.korrigierendMitStrafe}/${m.korrigierendeZuege}`.padStart(6);
    return (
      `  ${m.eich ? '●' : ' '} ${m.id.padEnd(26)}` +
      `${String(m.zeilen).padStart(3)} Zeilen  ` +
      `Zeichen W ${String(m.zeichenWatti).padStart(3)} / V ${String(m.zeichenVolti).padStart(3)}  ` +
      `Wattis Fragen ${String(m.wattiFragen).padStart(3)} %  ` +
      `Strafe ${String(m.strafend).padStart(2)}  ` +
      `an Korrektur ${strafe}  ` +
      `ohne Verb ${String(m.ohneVerb.length).padStart(2)}`
    );
  };

  console.log('\n  ● = Eichgruppe\n');
  for (const m of zeigen.sort((a, b) => Number(b.eich) - Number(a.eich) || a.id.localeCompare(b.id))) {
    console.log(zeile(m));
  }

  const block = (name: string, gruppe: Mass[]) => {
    if (gruppe.length === 0) return;
    const mitStrafe = gruppe.filter((m) => m.strafend > 0).length;
    const korr = gruppe.reduce((s, m) => s + m.korrigierendeZuege, 0);
    const korrStrafe = gruppe.reduce((s, m) => s + m.korrigierendMitStrafe, 0);
    console.log(`\n  ${name} (${gruppe.length} Shorts)`);
    console.log(`    Beschimpfungen je Short        ${mittel(gruppe.map((m) => m.strafend))}`);
    console.log(`    Shorts mit mindestens einer    ${mitStrafe} von ${gruppe.length}`);
    console.log(
      `    an korrigierenden Zügen        ${korr === 0 ? '–' : `${Math.round((korrStrafe / korr) * 100)} %`}` +
        `  (${korrStrafe} von ${korr})`,
    );
    console.log(
      `    Zeichen je Zeile               Watti ${mittel(gruppe.map((m) => m.zeichenWatti))} · ` +
        `Volti ${mittel(gruppe.map((m) => m.zeichenVolti))}` +
        '   (Rohbefund 02.09.: Watti 41 · Volti 52)',
    );
    console.log(`    Wattis Fragenanteil            ${mittel(gruppe.map((m) => m.wattiFragen))} %`);
    console.log(`    Sätze ohne finites Verb        ${gruppe.reduce((s, m) => s + m.ohneVerb.length, 0)}`);
  };

  block('Emirhan', eich);
  block('Claude', meine);

  const auffaellig = meine.flatMap((m) => m.ohneVerb.map((s) => `${m.id}: „${s}"`));
  if (auffaellig.length > 0) {
    console.log('\n  Sätze ohne finites Verb, außerhalb der Eichgruppe:');
    for (const s of auffaellig.slice(0, 20)) console.log(`    ${s}`);
    if (auffaellig.length > 20) console.log(`    … und ${auffaellig.length - 20} weitere`);
  }

  const eichOhneVerb = eich.flatMap((m) => m.ohneVerb.map((s) => `${m.id}: „${s}"`));
  if (eichOhneVerb.length > 0) {
    console.log('\n  ⚠ In der Eichgruppe gemeldet — die Heuristik ist zu streng:');
    for (const s of eichOhneVerb) console.log(`    ${s}`);
  }

  console.log('');
};

main();
