import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { Quelle, Short, Tonspur } from '../src/typen';
import { laufPruefen } from '../src/pruefung';
import { shortVertonen, zeichenverbrauch } from '../src/stimme';
import { freigabeseiteBauen } from '../src/freigabeseite';
import { lautheitAngleichen, videoPruefen } from '../src/medien';
import { durchschnittsdauer, verlaufLesen, verlaufSchreiben } from '../src/verlauf';
import { gesamtdauerBilder, tonspurNeuLegen } from '../src/zeit';
import { FORMAT } from '../src/marke';
import { WOCHENLAUF } from '../daten/entwuerfe';

const ausfuehren = promisify(execFile);

/**
 * Der Wochenlauf.
 *
 * Standard ist der **Trockenlauf**: alles ausser der Vertonung. Damit laesst
 * sich die gesamte Kette beliebig oft ueben, ohne Zeichenkontingent zu
 * verbrauchen. Erst `--mit-ton` ruft die Sprachsynthese auf und kostet Geld.
 *
 * Aufruf:
 *   npm run lauf                 Trockenlauf, geschaetzte Szenenlaengen
 *   npm run lauf -- --mit-ton    echte Vertonung und Zeitstempel
 *   npm run lauf -- --ton-behalten  rendert neu, vertont nicht noch einmal
 */

const MIT_TON = process.argv.includes('--mit-ton');

/**
 * Neu rendern mit der Vertonung, die schon da ist.
 *
 * Der Anlass am 15.08.2026: Im Lauf desselben Tages lag die Endkarte ueber
 * der Kopfzeile und unter dem Untertitel — ein Fehler der Buehne, nicht des
 * Textes. Die Korrektur betraf ausschliesslich das Bild, und ohne diesen
 * Schalter haette der neue Render **noch einmal 7.390 Zeichen** gekostet,
 * fuer exakt dieselben Saetze in derselben Stimme.
 *
 * Gelesen werden die Shorts aus `laeufe/<id>/props/*.json`. Dort steht der
 * **vertonte** Stand mit Tonspur und Wort-Zeitstempeln, den Schritt 2
 * hinterlassen hat — also alles, was der Renderer braucht.
 *
 * Der Verlauf wird dabei **nicht** fortgeschrieben: Das hat der Lauf mit Ton
 * bereits getan. Ein zweiter Eintrag fuer dieselbe Woche waere doppelt
 * gezaehlt, und der Wochenschnitt der Laenge stimmte nicht mehr.
 */
const TON_BEHALTEN = process.argv.includes('--ton-behalten');

/**
 * Ob die fertigen Videos Sprache tragen — unabhaengig davon, ob sie in
 * diesem Lauf entstanden ist.
 *
 * Der Unterschied zu `MIT_TON` ist nicht kosmetisch: `mitTon: false` in
 * `lauf.json` und in der Freigabe-Uebersicht hiesse, die Videos seien stumm.
 * Sie sind es nicht. Nur der **Verlauf** haengt weiter an `MIT_TON`, denn
 * fortgeschrieben wird eine Woche genau einmal.
 */
const HAT_TON = MIT_TON || TON_BEHALTEN;

/*
 * Beide Schalter zusammen sind ein Widerspruch, und er kostet Geld.
 *
 * Die Verzweigung unten lautet `if (MIT_TON) … else if (TON_BEHALTEN)`. Wer
 * beide setzt, bekommt also stillschweigend die **teure** Variante: Am
 * 18.08.2026 sind dadurch dieselben acht Texte dreimal vertont worden, jedes
 * Mal 2.690 Zeichen. Nichts sah falsch aus — der Lauf war grün, die Videos
 * waren richtig, nur das Kontingent war weg.
 *
 * Kein Vorrang, sondern Abbruch: Welche der beiden Absichten gemeint war,
 * weiss nur der Aufrufende. Ein stiller Vorrang waere wieder ein Raten, nur
 * in die andere Richtung.
 */
if (MIT_TON && TON_BEHALTEN) {
  console.error('--mit-ton und --ton-behalten schließen sich aus.\n');
  console.error('  --mit-ton        vertont neu und verbraucht Kontingent');
  console.error('  --ton-behalten   rendert neu, übernimmt die vorhandene Vertonung');
  console.error('\nFür eine Bildkorrektur an fertigen Shorts: nur --ton-behalten.');
  process.exit(1);
}
/**
 * Eine Stimme je Figur.
 *
 * Volti behaelt die bisherige Kanalstimme. Watti braucht eine eigene — zwei
 * Sprecher mit derselben Stimme waeren kein Wortwechsel, sondern ein Monolog
 * mit Absaetzen. Die Besetzung ist eine Entscheidung und keine Voreinstellung:
 * Solange `ELEVENLABS_VOICE_ID_ZEIGER` fehlt, spricht Watti mit Voltis Stimme,
 * und das faellt beim Hoeren sofort auf.
 *
 * Kandidaten stehen in `skripte/stimmproben.ts`, samt der Regel, nach der sie
 * ausgewaehlt wurden.
 */
const STIMMEN = {
  nachleser: process.env.ELEVENLABS_VOICE_ID ?? 'nPczCjzI2devNBz1zQrb',
  zeiger: process.env.ELEVENLABS_VOICE_ID_ZEIGER ?? process.env.ELEVENLABS_VOICE_ID ?? 'nPczCjzI2devNBz1zQrb',
} as const;

/**
 * Teillauf: `--nur=ein-stecker` baut einen einzigen Short.
 *
 * Gedacht fuer die Ansicht einer Aenderung mit echter Stimme, ohne acht
 * Vertonungen zu bezahlen — ein Short kostet rund 350 Zeichen statt 2.850.
 *
 * Zwei Dinge gelten deshalb im Teillauf **nicht**:
 *
 * - **Die laufweiten Regeln.** Jedes Format genau einmal, kein Sachgebiet
 *   oefter als zweimal — das alles ist auf die Woche
 *   gemuenzt und wuerde bei einem einzelnen Short zwangslaeufig anschlagen.
 *   Eine Pruefung, die im Teillauf immer rot ist, liest bald niemand mehr.
 * - **Das Fortschreiben des Verlaufs.** Ein Teillauf ist eine Ansicht, keine
 *   Woche. Wer ihn mitschreibt, verbrennt ein Thema, das nie erschienen ist —
 *   derselbe Denkfehler, aus dem der Trockenlauf schon ausgenommen ist.
 */
const NUR = process.argv.find((a) => a.startsWith('--nur='))?.slice('--nur='.length);

/**
 * Die sieben Shorts dieses Laufs — einer je Format und Wochentag.
 *
 * Seit dem 16.08.2026 sieben statt fuenf: ein Format je Wochentag, jedes
 * mit einem eigenen Fakt und einer woertlich geprueften Quelle.
 *
 * Die Reihenfolge in `WOCHENLAUF` ist nur noch Lesereihenfolge — welchen Tag
 * ein Short bekommt, steht am Format (`FORMATE[...].tag`), und
 * `zeitplanBauen` in `src/buffer.ts` liest es dort. Vorher haette das
 * Vertauschen zweier Eintraege stillschweigend zwei Sendetermine verschoben.
 *
 * Die Liste steht in `daten/entwuerfe/index.ts` und nicht hier, damit die
 * Schemapruefung dieselbe sieht.
 */
const ENTWUERFE: Short[] = NUR ? WOCHENLAUF.filter((s) => s.id === NUR) : WOCHENLAUF;

const laufId = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Wirft Remotions Bundler-Cache weg, wenn sich der Modulbestand geaendert hat.
 *
 * Am 18.08.2026 hing der Render **eine halbe Stunde bei „Bundling code 6 %"**
 * — kein Chrome, 0 % CPU, keine Fehlermeldung, kein Abbruch. Am Tag zuvor sah
 * dasselbe Bild nach einem Browser-Timeout aus und wurde als „intermittierend"
 * abgelegt; in Wahrheit war es zweimal dieselbe Ursache.
 *
 * Sie ist erklaerbar und reproduzierbar: Webpack legt seinen Cache unter
 * `node_modules/.cache/webpack` ab und invalidiert ihn ueber Zeitstempel der
 * Dateien, die er kennt. **Geloeschte** Module bemerkt er dabei nicht — er
 * versucht weiter, sie aufzuloesen, und bleibt stehen. Genau das war passiert:
 * Die acht Entwuerfe der Vorwoche waren weg, der Cache von 00:59 kannte sie
 * noch.
 *
 * Gegenprobe: `esbuild` bundelte denselben Entry-Point in 1,5 Sekunden
 * fehlerfrei, der Speicher war zu 59 % frei. Nach dem Entfernen des Caches
 * lief Remotion in 43 Sekunden durch.
 *
 * Der Wecker dafuer ist die **mtime des Verzeichnisses** `daten/entwuerfe`.
 * Sie aendert sich, wenn eine Datei darin entsteht oder verschwindet — also
 * genau in dem Fall, den Webpack uebersieht. Aenderungen *innerhalb* einer
 * Datei beruehren sie nicht; die bekommt Webpack von allein mit.
 */
const bundlerCachePruefen = async (): Promise<void> => {
  const cache = path.join('node_modules', '.cache', 'webpack');
  const [cacheStat, entwuerfeStat] = await Promise.all([
    fs.stat(cache).catch(() => null),
    fs.stat(path.join('daten', 'entwuerfe')).catch(() => null),
  ]);
  if (!cacheStat || !entwuerfeStat) return;

  if (entwuerfeStat.mtimeMs > cacheStat.mtimeMs) {
    await fs.rm(cache, { recursive: true, force: true });
    console.log('   Bundler-Cache verworfen (Entwürfe kamen dazu oder fielen weg)');
  }
};

const main = async () => {
  const id = laufId();
  const wurzel = path.join('laeufe', id);

  /*
   * **Was die Plausibilitaetswache anschlug, ueberlebt die Konsole.**
   *
   * Bis zum 01.09.2026 endeten diese Befunde als Konsolenzeile im
   * Vertonungsblock — weder `lauf.json` noch die Freigabeseite noch der
   * Exit-Code trugen sie. Wer die Konsole nicht las, gab einen Short frei,
   * dessen Vertonung angeschlagen hatte. **Ein Befund, den nur das Terminal
   * kennt, gilt bis zum naechsten Scrollen.**
   *
   * Sie werden deshalb unten in die regulaere Befundliste eingespeist statt in
   * einen zweiten Kanal daneben: `Befund` hat genau die Felder, die es
   * braucht, und Freigabeseite wie `lauf.json` lesen sie ohnehin schon.
   */
  const unplausibelGesamt: { shortId: string; text: string }[] = [];
  const videoOrdner = path.join(wurzel, 'videos');
  await fs.mkdir(videoOrdner, { recursive: true });

  console.log(`Ganz akkurat · ${NUR ? `Teillauf ${NUR}` : 'Wochenlauf'} ${id}`);
  console.log(
    MIT_TON
      ? 'Modus: mit Vertonung'
      : TON_BEHALTEN
        ? 'Modus: neu rendern, Vertonung bleibt (kein Verbrauch)'
        : 'Modus: Trockenlauf (keine Vertonung, kein Verbrauch)',
  );
  if (NUR) {
    if (ENTWUERFE.length === 0) {
      console.log(`\nKein Entwurf mit der Kennung „${NUR}". Bekannt sind:`);
      for (const s of WOCHENLAUF) console.log(`  ${s.id}  ${s.format}`);
      process.exit(1);
    }
    console.log('Teillauf: laufweite Regeln aus, Verlauf wird nicht fortgeschrieben');
  }
  console.log();

  /* ── 1  Entwuerfe validieren ─────────────────────────────────────── */

  console.log(`1  Entwürfe prüfen (${ENTWUERFE.length})`);
  const shorts: Short[] = [];
  for (const entwurf of ENTWUERFE) {
    const ergebnis = Short.safeParse(entwurf);
    if (!ergebnis.success) {
      console.log(`   ✕ ${entwurf.id}: ${ergebnis.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`);
      process.exitCode = 1;
      continue;
    }
    shorts.push(ergebnis.data);
  }
  if (shorts.length !== ENTWUERFE.length) {
    console.log('\nAbbruch: Entwürfe entsprechen nicht dem Schema.');
    return;
  }
  console.log(`   ${shorts.length} Entwürfe entsprechen dem Schema`);

  /*
   * Die Quellen werden **einmal** gelesen, seit die Pruefung auch vor der
   * Vertonung laeuft. Zweimal einlesen hiesse, dass ein Lauf mit zwei
   * verschiedenen Staenden von `quellen.json` arbeiten koennte, falls die
   * Datei dazwischen geschrieben wird — eine Doppelung ohne Wache.
   */
  const rohQuellen = JSON.parse(await fs.readFile('daten/quellen.json', 'utf8')) as {
    quellen: unknown[];
  };
  const quellen = rohQuellen.quellen.map((q) => Quelle.parse(q));
  console.log(`   Zeichenbedarf bei Vertonung: ${shorts.reduce((n, s) => n + zeichenverbrauch(s), 0)}\n`);

  /* ── 2  Vertonen (nur mit --mit-ton) ─────────────────────────────── */

  let fertige = shorts;
  if (MIT_TON) {
    const schluessel = process.env.ELEVENLABS_API_KEY;
    if (!schluessel) throw new Error('ELEVENLABS_API_KEY fehlt in .env');

    /*
     * **Die Regeln vor dem Bezahlen, nicht danach.**
     *
     * Bis zum 31.08.2026 lief das Schema vor der Vertonung und die
     * inhaltliche Pruefung erst in Schritt 3 — also *nachdem* die Zeichen
     * abgerechnet waren. Ein Short, der an einer Regel scheiterte, wurde
     * bezahlt und dann zurueckgehalten.
     *
     * Aufgefallen ist es beim Bau der Plausibilitaetswache, und es ist
     * dieselbe Sorte Fehler: eine Wache, die an der richtigen Stelle steht,
     * aber zum falschen Zeitpunkt greift.
     *
     * Geprueft wird hier gegen die **unvertonten** Entwuerfe. Regeln, die eine
     * Tonspur brauchen — die Aufschlagmessung an den Wortzeitstempeln, die
     * Laenge —, fallen dabei auf ihre Schaetzung zurueck und laufen in
     * Schritt 3 noch einmal scharf. Das ist kein Ersatz fuer die spaetere
     * Pruefung, sondern ein Filter davor: Was jetzt schon rot ist, wird durch
     * eine Vertonung nicht gruen.
     *
     * Nur Fehler halten auf. Hinweise sind zum Lesen da, nicht zum Anhalten —
     * und ein Lauf, der an einem Hinweis scheitert, waere in einer Woche
     * abgeschaltet.
     */
    const vorab = laufPruefen(shorts, quellen, [], Boolean(NUR));
    if (vorab.fehler.length > 0) {
      console.log('   Vor dem Bezahlen geprüft — und es gibt Fehler:\n');
      for (const b of vorab.fehler) console.log(`   ✕ ${b.shortId}  [${b.regel}] ${b.text}`);
      console.log(
        '\nAbbruch vor der Vertonung. Kein Zeichen verbraucht — ' +
          'eine Regel, die erst nach der Rechnung greift, ist keine.\n',
      );
      return;
    }
    console.log(`   Vorprüfung: ${vorab.hinweise.length} Hinweis(e), keine Fehler\n`);

    console.log('2  Vertonen');
    await fs.mkdir(path.join('public', 'ton', id), { recursive: true });
    fertige = [];
    /*
     * Was die Plausibilitaetswache nicht endgueltig klaeren konnte.
     *
     * Gesammelt statt nur gemeldet: Eine Warnung mitten im Vertonungsblock
     * verschwindet hinter zwoelf Renderzeilen. Sie gehoert dorthin, wo
     * entschieden wird — vor die Freigabe.
     */
    const unplausibel: { shortId: string; text: string }[] = [];
    /*
     * **Die Tonspur wird sofort gesichert, nicht erst nach dem Render.**
     *
     * Bis zum 01.09.2026 entstanden die `props`-Dateien erst in Schritt 4 —
     * und genau die sucht `--ton-behalten`. Scheiterte die Synthese beim
     * vierten Short, waren die ersten drei bezahlt und trotzdem verloren: Die
     * MP3-Dateien lagen da, aber ohne `props` fand sie niemand wieder. Ein
     * Neustart zahlte alles ein zweites Mal.
     *
     * Dieses Loch war im Code schon benannt — es ist die Begruendung dafuer,
     * dass die Plausibilitaetswache lieber warnt als wirft
     * (`src/stimme.ts`). **Eine Wache, die einem behebbaren Problem
     * ausweicht, sichert das Problem ab statt das Ergebnis.**
     */
    const propsOrdnerFrueh = path.join(wurzel, 'props');
    await fs.mkdir(propsOrdnerFrueh, { recursive: true });

    /** Shorts, deren Vertonung geworfen hat. Sie halten den Lauf nicht auf. */
    const gescheitert: { id: string; grund: string }[] = [];

    for (const short of shorts) {
      /*
       * `%` wird zur Abschnittsnummer. Bei einem Sprecher entsteht daraus
       * `<id>.1.mp3` — eine Datei wie vorher, nur mit Nummer, damit ein Short
       * nicht je nach Stimmenzahl anders heisst.
       */
      const muster = `ton/${id}/${short.id}.%.mp3`;
      /*
       * **Ein Fehlschlag nimmt einen Short mit, nicht den Lauf.** Dieselbe
       * Behandlung, die Regelfehler laengst bekommen (`zuRendern =
       * ergebnis.freigabefaehig` weiter unten); bei der Synthese fehlte sie
       * bisher, und ein Wurf landete in `main().catch` samt `process.exit(1)`.
       */
      let ergebnisTon;
      try {
        ergebnisTon = await shortVertonen(short, STIMMEN, schluessel, muster);
      } catch (fehler) {
        const grund = fehler instanceof Error ? fehler.message : String(fehler);
        gescheitert.push({ id: short.id, grund });
        console.log(`   ${short.id}  ✗ ${grund}`);
        continue;
      }
      const { short: vertont, toene, unplausibel: verdaechtig } = ergebnisTon;
      unplausibel.push(...verdaechtig.map((text) => ({ shortId: short.id, text })));

      /*
       * **Sofort wegschreiben, und zwar vor jedem weiteren Schritt.**
       *
       * Dasselbe Format, das `--ton-behalten` liest und per `Tonspur.safeParse`
       * prueft. Schritt 4 ueberschreibt die Datei spaeter mit demselben Inhalt;
       * das ist keine Doppelung, sondern dieselbe Datei zu einem frueheren
       * Zeitpunkt.
       *
       * **Die Stelle ist am 01.09.2026 zweimal gewandert.** Zuerst stand das
       * Schreiben in Schritt 4, nach dem Render — dort war es nutzlos, sobald
       * ein Short scheiterte. Dann stand es hier unten, **nach** der
       * Lautheitsangleichung: Als die an einem 0,44-Sekunden-Abschnitt
       * abbrach, war die Vertonung bezahlt und die Tonspur trotzdem verloren.
       *
       * Was zwischen Synthese und Sicherung liegt, kann sie kosten. Also liegt
       * nichts mehr dazwischen.
       */
      await fs.writeFile(
        path.join(propsOrdnerFrueh, `${short.id}.json`),
        JSON.stringify({ daten: vertont }),
      );

      // Erst roh sichern, dann auf Plattformlautheit angleichen. Die rohen
      // Dateien bleiben liegen, damit sich das Ergebnis nachvollziehen laesst.
      let pegel = { vorher: 0, nachher: 0 };
      for (const abschnitt of toene) {
        const rohPfad = path.join('public', abschnitt.datei.replace('.mp3', '.roh.mp3'));
        await fs.writeFile(rohPfad, abschnitt.ton);
        pegel = await lautheitAngleichen(rohPfad, path.join('public', abschnitt.datei));
      }

      console.log(
        `   ${short.id}  ${vertont.tonspur!.dauerSek.toFixed(1)}s  ` +
          `${toene.length} Abschnitt${toene.length === 1 ? '' : 'e'}  ` +
          `Lautheit ${pegel.vorher.toFixed(1)} → ${pegel.nachher} LUFS`,
      );
      fertige.push(vertont);
    }
    if (gescheitert.length > 0) {
      console.log(`\n   ✗ ${gescheitert.length} Short(s) ohne Ton — der Lauf geht ohne sie weiter:`);
      for (const fall of gescheitert) console.log(`     · ${fall.id}: ${fall.grund}`);
      console.log(
        '     Die bezahlten Tonspuren der uebrigen liegen in ' +
          `laeufe/${id}/props/ und sind mit --ton-behalten wiederverwendbar.`,
      );
    }
    unplausibelGesamt.push(...unplausibel);
    if (unplausibel.length > 0) {
      console.log(
        `\n   ⚠ ${unplausibel.length} Lauf/Läufe blieben unplausibel lang. Vor der Freigabe hören:`,
      );
      for (const fall of unplausibel) console.log(`     · ${fall.text}`);
    }
    console.log('');
  } else if (TON_BEHALTEN) {
    /*
     * Der Ton darf aus einem **frueheren** Lauf kommen, nicht nur aus dem von
     * heute.
     *
     * Die erste Fassung suchte ausschliesslich in `laeufe/<heute>/props/` und
     * brach sonst ab. Das ging gut, bis in der Nacht zum 18.08.2026 mitten in
     * der Arbeit der Tag wechselte: Die Tonspuren lagen unter dem 17., der
     * Lauf suchte unter dem 18., und die Meldung lautete „setzt einen Lauf mit
     * Ton am selben Tag voraus" — richtig beschrieben und trotzdem die falsche
     * Grenze. Der Schalter will vorhandenen Ton wiederverwenden; das Datum ist
     * dabei keine Eigenschaft des Tons, sondern des Ordners.
     *
     * Gesucht wird deshalb der **juengste** Lauf, der eine Tonspur zu diesem
     * Short hat. Gefaehrlich ist das nicht: Unmittelbar danach wird Szene fuer
     * Szene verglichen, ob der Sprechtext noch derselbe ist, und bei der
     * kleinsten Abweichung bricht der Lauf ab. Ein alter Ton unter neuem Text
     * kommt hier nicht durch.
     */
    const laufOrdner = (await fs.readdir('laeufe').catch(() => [] as string[]))
      .filter((n) => /^\d{4}-\d{2}-\d{2}$/.test(n))
      .sort()
      .reverse();

    /*
     * Gesucht wird der juengste Lauf mit einer **brauchbaren Tonspur** — nicht
     * der juengste mit einer Datei.
     *
     * Der Unterschied hat am 23.08.2026 den Schalter blockiert: Der Lauf vom
     * 20.08. war ein Trockenlauf. Seine `props/` enthalten Szenen und Texte,
     * aber keine Tonspur. Die erste Fassung nahm ihn trotzdem, weil die Datei
     * da war, und brach dann mit „keine brauchbare Tonspur" ab — waehrend im
     * Ordner vom 18.08. der vertonte Stand lag und nie geprueft wurde.
     *
     * Der Kommentar darueber beschrieb schon das richtige Verhalten: „der
     * juengste Lauf, **der eine Tonspur zu diesem Short hat**". Der Code tat es
     * nicht. Ein Trockenlauf hinterlaesst dieselben Dateinamen wie ein
     * vertonter; unterscheiden lassen sie sich nur am Inhalt.
     */
    const propsSuchen = async (shortId: string): Promise<{ pfad: string; roh: string } | null> => {
      for (const ordner of laufOrdner) {
        const pfad = path.join('laeufe', ordner, 'props', `${shortId}.json`);
        const roh = await fs.readFile(pfad, 'utf8').catch(() => null);
        if (!roh) continue;
        const alt = (JSON.parse(roh) as { daten?: { tonspur?: unknown } }).daten;
        if (!Tonspur.safeParse(alt?.tonspur).success) continue;
        return { pfad, roh };
      }
      return null;
    };

    console.log('2  Vertonung aus dem vorhandenen Lauf übernommen');
    fertige = [];
    for (const short of shorts) {
      const gefunden = await propsSuchen(short.id);
      if (!gefunden) {
        throw new Error(
          `--ton-behalten: Zu ${short.id} gibt es in keinem Lauf unter laeufe/ eine ` +
            `Vertonung. Einmal mit --mit-ton laufen lassen.`,
        );
      }
      const { pfad: propsDatei, roh } = gefunden;
      if (!propsDatei.includes(id)) {
        console.log(`   ${short.id}  Ton aus ${propsDatei.split(path.sep)[1]}`);
      }
      /*
       * Aus den alten Renderdaten wird **nur die Tonspur** gelesen, und zwar
       * ohne den ganzen Short zu validieren.
       *
       * Vorher stand hier `Short.parse(...)` auf der kompletten Datei, und das
       * war ein Konstruktionsfehler: Renderdaten sind eine Momentaufnahme
       * eines aelteren Datenvertrags. Am 18.08.2026 kam dadurch ein
       * ZodError — in den Props stand `symbol: 'kasse'`, ein Wert, den das
       * Schema eine Minute zuvor verloren hatte. Der Schalter blockierte sich
       * damit **selbst**: Wer das Schema aendert, muss neu rendern, und genau
       * das liess er nicht mehr zu.
       *
       * Die Tonspur ist von solchen Aenderungen nie betroffen. Sie wird
       * deshalb einzeln geprueft, und alles andere kommt ohnehin aus dem
       * aktuellen Entwurf.
       */
      const altDaten = (JSON.parse(roh) as {
        daten?: { tonspur?: unknown; szenen?: { sprechtext?: string; untertitel?: unknown }[] };
      }).daten;
      const tonspur = Tonspur.safeParse(altDaten?.tonspur);
      if (!tonspur.success) {
        throw new Error(
          `--ton-behalten: ${short.id} hat in ${propsDatei} keine brauchbare Tonspur.`,
        );
      }
      /*
       * Die alten Szenen werden **roh** gelesen, nicht validiert. Gebraucht
       * werden aus ihnen nur zwei Dinge: die Anzahl und der Sprechtext, beides
       * fuer die Sicherheitspruefung gleich darunter. Beides ist von
       * Schemaaenderungen nie betroffen — ein weggefallener Symbolwert macht
       * einen Sprechtext nicht ungueltig.
       */
      const alt = { tonspur: tonspur.data, szenen: altDaten?.szenen ?? [] };

      /*
       * **Nur die Tonspur wird uebernommen, alles andere kommt aus dem
       * aktuellen Entwurf.**
       *
       * Die erste Fassung dieses Schalters nahm den Short komplett aus den
       * Props — und damit auch jeden Text von damals. Am 15.08.2026 fiel das
       * teuer auf: Die Beschreibungen waren in den Entwuerfen geleert, der
       * Lauf uebernahm trotzdem die alten, und im veroeffentlichten Beitrag
       * stand die Beschreibung samt einer zweiten, veralteten Quellenliste.
       * Sichtbar wurde es erst auf Instagram.
       *
       * Der Schalter heisst `--ton-behalten` und nicht `--alles-behalten`.
       * Uebernommen wird deshalb genau das, was er verspricht: die Tonspur
       * und die daran haengenden Wort-Zeitstempel, weil beide Geld gekostet
       * haben. Titel, Texte, Szenen und Quellen kommen aus dem Entwurf —
       * sonst waere jede Textkorrektur nur mit neuer Vertonung zu bezahlen.
       */
      const szenenMitZeit = short.szenen.map((szene, i) => {
        const frueher = alt.szenen[i] as { untertitel?: unknown } | undefined;
        return frueher?.untertitel ? { ...szene, untertitel: frueher.untertitel } : szene;
      });

      if (short.szenen.length !== alt.szenen.length) {
        throw new Error(
          `--ton-behalten: ${short.id} hat jetzt ${short.szenen.length} Szenen, ` +
            `die vorhandene Vertonung ${alt.szenen.length}. Wer Szenen hinzufügt oder ` +
            `entfernt, ändert den Sprechtext — das braucht einen Lauf mit --mit-ton.`,
        );
      }

      /*
       * Der Sprechtext muss derselbe sein. Sonst gehoeren die uebernommenen
       * Wort-Zeitstempel zu anderen Worten — die Untertitel liefen dann
       * sichtbar am Ton vorbei, und zwar ohne dass irgendeine Pruefung
       * anschlaegt. Texte am Bildschirm darf dieser Schalter aendern, den
       * gesprochenen Satz nicht.
       */
      const geaendert = short.szenen
        .map((s, i) => (s.sprechtext !== alt.szenen[i]?.sprechtext ? i + 1 : 0))
        .filter(Boolean);
      if (geaendert.length > 0) {
        throw new Error(
          `--ton-behalten: In ${short.id} weicht der Sprechtext von Szene ` +
            `${geaendert.join(', ')} von der vorhandenen Vertonung ab. Die Zeitstempel ` +
            `gehörten dann zu anderen Worten — das braucht einen Lauf mit --mit-ton.`,
        );
      }

      /*
       * **Die Pausen kommen aus dem heutigen `src/zeit.ts`, nicht aus dem
       * Lauf von damals.** `tonspurNeuLegen` misst je Naht die Stille und
       * hebt sie auf die aktuellen Werte an; die Dateien bleiben. Seit dem
       * 01.09.2026 — bis dahin war „Nachjustieren kostet nichts" ein Satz im
       * Kommentar, den kein Code eingeloest hat.
       */
      const neuGelegt = tonspurNeuLegen(alt.tonspur, short);
      const vertont = Short.parse({ ...short, szenen: szenenMitZeit, tonspur: neuGelegt });
      const verschoben = neuGelegt.dauerSek - alt.tonspur.dauerSek;
      console.log(
        `   ${short.id}  ${neuGelegt.dauerSek.toFixed(1)}s  Ton unverändert, Texte aktuell` +
          (verschoben > 0.01 ? `, Pausen +${verschoben.toFixed(1)}s` : ''),
      );
      fertige.push(vertont);
    }
    console.log('');
  } else {
    console.log('2  Vertonen übersprungen – Szenenlängen werden geschätzt\n');
  }

  /* ── 3  Inhaltliche Pruefung ─────────────────────────────────────── */

  console.log('3  Qualität prüfen');
  /*
   * Der eigene Lauf zaehlt nicht als Vergangenheit.
   *
   * `verlaufSchreiben` ersetzt einen Eintrag mit derselben Kennung, ein
   * zweiter Lauf am selben Tag ueberschreibt also sauber. Beim **Pruefen**
   * lag der erste Durchgang aber noch im Verlauf — und meldete alle sieben
   * Themen als Wiederholung des Laufs, der gerade ersetzt wird. Jeder
   * Korrekturlauf am selben Tag haette damit sieben falsche Hinweise erzeugt,
   * und Hinweise, die regelmaessig falsch sind, liest bald niemand mehr.
   */
  const verlauf = (await verlaufLesen()).filter((eintrag) => eintrag.lauf !== id);
  const ergebnis = laufPruefen(fertige, quellen, verlauf, Boolean(NUR));

  /*
   * Die Wachbefunde der Vertonung wandern hier hinein — als Hinweis, nicht als
   * Fehler: Die Wache hat bereits den kuerzeren von zwei Laeufen genommen, das
   * Ergebnis ist brauchbar und nur verdaechtig. Ein Fehler hielte einen Short
   * zurueck, den man vielleicht nur anhoeren muss.
   */
  const wachbefunde = unplausibelGesamt.map((fall) => ({
    stufe: 'hinweis' as const,
    shortId: fall.shortId,
    regel: 'vertonung',
    text: `${fall.text} – vor der Freigabe anhören.`,
  }));
  /*
   * In **beide** Listen, weil `hinweise` in `laufPruefen` ein Filter ueber
   * `befunde` ist und nach dem Bau nicht mitwaechst. Der Text steht trotzdem
   * nur einmal da — eine Doppelung entsteht erst, wo zweimal geschrieben wird.
   */
  ergebnis.befunde.push(...wachbefunde);
  ergebnis.hinweise.push(...wachbefunde);

  for (const b of ergebnis.befunde) {
    console.log(`   ${b.stufe === 'fehler' ? '✕' : '·'} ${b.shortId}  [${b.regel}] ${b.text}`);
  }
  console.log(`   ${ergebnis.fehler.length} Fehler, ${ergebnis.hinweise.length} Hinweise`);

  /*
   * Laengentendenz statt Laengenurteil.
   *
   * Das Zielfenster reicht bis 95 Sekunden, aber die 95 sind Spielraum und
   * nicht das Ziel — die Absicht ist, die Laenge ueber die Wochen wieder zu
   * druecken, durch Straffung und nicht durch Weglassen von Substanz.
   *
   * Das laesst sich nicht als Regel fassen: Eine Grenze bei 88 waere nur die
   * alte Grenze unter anderem Namen, und ein Hinweis „koennte kuerzer" waere
   * jede Woche derselbe und damit nach drei Wochen unsichtbar. Was bleibt,
   * ist die Zahl neben der Zahl der Vorwoche. Erkennen muss man es selbst —
   * aber ohne den Messwert kann man es gar nicht.
   */
  if (HAT_TON) {
    const jetzt = durchschnittsdauer({ lauf: id, shorts: fertige.map((s) => ({
      format: s.format,
      sachgebiet: s.sachgebiet,
      themaId: s.themaId,
      ...(s.tonspur ? { dauerSek: s.tonspur.dauerSek } : {}),
    })) });
    const vorher = durchschnittsdauer(verlauf[verlauf.length - 1]);
    if (jetzt !== null) {
      const vergleich =
        vorher === null
          ? 'keine Vergleichswoche'
          : `${vorher.toFixed(1)}s zuvor, ${jetzt > vorher ? '+' : ''}${(jetzt - vorher).toFixed(1)}s`;
      console.log(`   Länge im Schnitt: ${jetzt.toFixed(1)}s  (${vergleich})`);
    }
  }
  console.log();

  /* ── 4  Rendern ──────────────────────────────────────────────────── */

  console.log('4  Rendern');
  const zuRendern = ergebnis.freigabefaehig;
  if (zuRendern.length < fertige.length) {
    console.log(`   ${fertige.length - zuRendern.length} Short(s) wegen Fehlern übersprungen`);
  }

  await bundlerCachePruefen();

  const propsOrdner = path.join(wurzel, 'props');
  await fs.mkdir(propsOrdner, { recursive: true });

  for (const short of zuRendern) {
    /*
     * Aus dieser Datei wird gerendert, und `--ton-behalten` sucht sie: Es
     * durchsucht `laeufe/*\/props/<id>.json` nach einer brauchbaren Tonspur.
     * Faende es dort nichts, waere jeder spaetere Lauf ohne Ton wieder einer
     * mit Verbrauch.
     */
    const propsDatei = path.join(propsOrdner, `${short.id}.json`);
    await fs.writeFile(propsDatei, JSON.stringify({ daten: short }));

    /*
     * `--timeout` steht hier wegen des 17.08.2026.
     *
     * Drei Laeufe hintereinander brachen ab, und zwar mit drei verschiedenen
     * Meldungen: „Timed out after 25000 ms while trying to connect to the
     * browser", danach zweimal ein SIGKILL auf `ffprobe` bzw. `ffmpeg` aus
     * Remotions eigenem Compositor. Das sah nach drei Fehlern aus und war
     * einer: Laeuft der Browserstart in die Voreinstellung von 25 Sekunden,
     * raeumt Remotion auf und schiesst dabei seine Kindprozesse ab. Der
     * SIGKILL ist die Folge, nicht die Ursache.
     *
     * Nachgemessen war die Maschine dabei unauffaellig — 61 % Speicher frei,
     * Last 1,5, kein Swap —, und `ffprobe` las von Hand genau die Datei
     * einwandfrei, an der es gescheitert war. Der Direktlauf mit erhoehter
     * Wartezeit lief durch.
     *
     * 25 Sekunden sind fuer einen kalten Chrome-Start knapp bemessen, sobald
     * nebenher irgendetwas laeuft. Zwei Minuten kosten nichts: Der Wert ist
     * eine Obergrenze, kein Warten.
     */
    const beginn = Date.now();
    /*
     * `--crf=16` statt des Standards 18.
     *
     * Am 23.08.2026 kam der Hinweis, die Figur sei „sehr verpixelt". Gemessen
     * an zwei vergroesserten Ausschnitten stimmt das fuer unser Rendering
     * nicht: Das Standbild ist bei doppelter Vergroesserung glatt, das Bild aus
     * dem fertigen MP4 nur leicht weicher. Der beanstandete Screenshot kam
     * ueber WhatsApp, und WhatsApp rekomprimiert Videos hart.
     *
     * Trotzdem steht der Regler jetzt hoeher, weil unsere Bilder der
     * ungeschickteste Fall fuer H.264 sind: grosse einfarbige Flaechen mit
     * harten Kanten, dazu gesaettigtes Blau neben Weiss. Mit `yuvj420p` liegt
     * die Farbe nur in einem Viertel der Aufloesung vor, und genau an solchen
     * Kanten entstehen die Farbsaeume. Zwei CRF-Stufen kosten ein paar
     * Megabyte und sonst nichts.
     */
    /*
     * **Eine Fassung, nicht drei.** Bis zum 04.09.2026 rendete der Lauf je
     * Short dreimal dasselbe Video — einmal je Dienst. Der Unterschied war ein
     * Zeichen an der Signatur, und das ist am 01.09.2026 mit ihr gegangen:
     * `cmp` auf TikTok und YouTube meldete danach keinen Unterschied mehr.
     *
     * **Ein Short ist derselbe, egal wo er landet.** Als Emirhan am 04.09. den
     * Zeiger vollstaendig strich, fiel die letzte Begruendung fuer die Prop
     * `dienst` — und mit ihr zwei Drittel der Renderzeit. Der Lauf mit vier
     * Shorts brauchte fuer zwoelf Fassungen fuenfzehn Minuten.
     */
    const ziel = path.join(videoOrdner, `${short.id}.mp4`);
    await ausfuehren('npx', [
      'remotion', 'render', 'video/index.ts', 'Short', ziel,
      `--props=${propsDatei}`, '--log=error', '--timeout=120000', '--crf=16',
    ], { maxBuffer: 32 * 1024 * 1024 });

    const mb = (await fs.stat(ziel)).size / 1_048_576;
    const technisch = await videoPruefen(ziel);
    for (const b of technisch) {
      ergebnis.befunde.push({ stufe: b.stufe, shortId: short.id, regel: 'datei', text: b.text });
    }

    const anmerkung = technisch.length > 0 ? `  ← ${technisch.map((b) => b.text).join(' ')}` : '';
    // Videolaenge zuerst, Renderzeit danach und beschriftet: Ohne Beschriftung
    // liest sich die Renderzeit wie eine Laenge — und ein Wert, der aussieht
    // wie die Zahl, um die es geht, wird auch dafuer gehalten.
    const laengeSek = gesamtdauerBilder(short) / FORMAT.bilderProSekunde;
    const renderSek = (Date.now() - beginn) / 1000;
    console.log(
      `   ${short.id}  ${laengeSek.toFixed(1)}s Video  ${mb.toFixed(1)} MB  ` +
        `(Render ${renderSek.toFixed(0)}s)${anmerkung}`,
    );
  }
  console.log('');

  /* ── 5  Freigabeseite ────────────────────────────────────────────── */

  console.log('5  Freigabe-Übersicht');
  const seite = freigabeseiteBauen({
    laufId: id,
    shorts: zuRendern,
    quellen,
    befunde: ergebnis.befunde,
    videopfad: (s) => `videos/${s.id}.mp4`,
    mitTon: HAT_TON,
  });
  const seitenPfad = path.join(wurzel, 'freigabe.html');
  await fs.writeFile(seitenPfad, seite);

  await fs.writeFile(
    path.join(wurzel, 'lauf.json'),
    JSON.stringify({ id, erstelltAm: new Date().toISOString(), mitTon: HAT_TON, shorts: zuRendern }, null, 2),
  );

  /* ── 6  Verlauf fortschreiben ────────────────────────────────────── */

  /*
   * Zwei Bedingungen, und beide sind noetig.
   *
   * Erst hier, nicht frueher: Was an der Pruefung gescheitert ist, wurde nie
   * gerendert und gehoert nicht ins Gedaechtnis.
   *
   * Und nur mit Ton: Ein Trockenlauf ist eine Uebung. Wer ihn mitschreibt,
   * verbrennt ein Thema, das nie erschienen ist — beim naechsten Entwurf
   * gaelte es als schon gelaufen. Veroeffentlicht werden kann ohnehin nur ein
   * vertonter Lauf, das prueft `veroeffentlichen.ts`.
   */
  if (MIT_TON && !NUR && zuRendern.length > 0) {
    await verlaufSchreiben(id, zuRendern);
    console.log(`6  Verlauf fortgeschrieben (${zuRendern.length} Shorts)\n`);
  } else if (zuRendern.length > 0) {
    /*
     * Auch ein vertonter Teillauf bleibt draussen: Er ist eine Ansicht, keine
     * Woche. Wuerde er mitschreiben, gaelte sein Thema als gelaufen und
     * verschwaende einen Sendeplatz — derselbe Denkfehler wie beim
     * Trockenlauf, nur teurer, weil hier schon Zeichen verbraucht sind.
     */
    console.log(
      `6  Verlauf unberührt – ${
        NUR
          ? 'ein Teillauf ist eine Ansicht'
          : TON_BEHALTEN
            ? 'diese Woche steht schon im Verlauf'
            : 'Trockenläufe zählen nicht als gelaufen'
      }\n`,
    );
  }

  console.log(`   ${seitenPfad}\n`);
  console.log(`Fertig. Öffnen mit:  open ${seitenPfad}`);
};

main().catch((fehler) => {
  console.error('\nFehlgeschlagen:', fehler.message);
  process.exit(1);
});
