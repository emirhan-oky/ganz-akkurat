import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { Quelle, Short } from '../src/typen';
import { laufPruefen } from '../src/pruefung';
import { shortVertonen, zeichenverbrauch } from '../src/stimme';
import { freigabeseiteBauen } from '../src/freigabeseite';
import { lautheitAngleichen, videoPruefen } from '../src/medien';
import { durchschnittsdauer, verlaufLesen, verlaufSchreiben } from '../src/verlauf';
import { gesamtdauerBilder } from '../src/zeit';
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
const STIMME = process.env.ELEVENLABS_VOICE_ID ?? 'nPczCjzI2devNBz1zQrb';

/**
 * Teillauf: `--nur=skl-pbf-01` baut einen einzigen Short.
 *
 * Gedacht fuer die Ansicht einer Aenderung mit echter Stimme, ohne fuenf
 * Vertonungen zu bezahlen — ein Short kostet rund 1.500 Zeichen statt 7.300.
 *
 * Zwei Dinge gelten deshalb im Teillauf **nicht**:
 *
 * - **Die laufweiten Regeln.** Jede Rubrik genau einmal, Vertiefung in drei
 *   von fuenf, keine Haeufung von Titelmustern — das alles ist auf die Woche
 *   gemuenzt und wuerde bei einem einzelnen Short zwangslaeufig anschlagen.
 *   Eine Pruefung, die im Teillauf immer rot ist, liest bald niemand mehr.
 * - **Das Fortschreiben des Verlaufs.** Ein Teillauf ist eine Ansicht, keine
 *   Woche. Wer ihn mitschreibt, verbrennt ein Thema, das nie erschienen ist —
 *   derselbe Denkfehler, aus dem der Trockenlauf schon ausgenommen ist.
 */
const NUR = process.argv.find((a) => a.startsWith('--nur='))?.slice('--nur='.length);

/**
 * Die fuenf Shorts dieses Laufs — einer je Rubrik.
 *
 * Seit dem 13.08.2026 vollstaendig: fuenf Rubriken, fuenf Macharten, fuenf
 * Themen mit je drei woertlich geprueften Quellen.
 *
 * Die Reihenfolge in `WOCHENLAUF` ist die Sendereihenfolge der Woche, Montag
 * bis Freitag. `zeitplanBauen` in `src/buffer.ts` verteilt sie auf die
 * Werktage um 18:00.
 *
 * Die Liste steht in `daten/entwuerfe/index.ts` und nicht hier, damit die
 * Schemapruefung dieselbe sieht.
 */
const ENTWUERFE: Short[] = NUR ? WOCHENLAUF.filter((s) => s.id === NUR) : WOCHENLAUF;

const laufId = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const main = async () => {
  const id = laufId();
  const wurzel = path.join('laeufe', id);
  const videoOrdner = path.join(wurzel, 'videos');
  await fs.mkdir(videoOrdner, { recursive: true });

  console.log(`SetupKlar · ${NUR ? `Teillauf ${NUR}` : 'Wochenlauf'} ${id}`);
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
      for (const s of WOCHENLAUF) console.log(`  ${s.id}  ${s.rubrik}`);
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
  console.log(`   Zeichenbedarf bei Vertonung: ${shorts.reduce((n, s) => n + zeichenverbrauch(s), 0)}\n`);

  /* ── 2  Vertonen (nur mit --mit-ton) ─────────────────────────────── */

  let fertige = shorts;
  if (MIT_TON) {
    const schluessel = process.env.ELEVENLABS_API_KEY;
    if (!schluessel) throw new Error('ELEVENLABS_API_KEY fehlt in .env');

    console.log('2  Vertonen');
    await fs.mkdir(path.join('public', 'ton', id), { recursive: true });
    fertige = [];
    for (const short of shorts) {
      const datei = `ton/${id}/${short.id}.mp3`;
      const { short: vertont, ton } = await shortVertonen(short, STIMME, schluessel, datei);

      // Erst roh sichern, dann auf Plattformlautheit angleichen. Die rohe
      // Datei bleibt liegen, damit sich das Ergebnis nachvollziehen laesst.
      const rohPfad = path.join('public', `ton/${id}/${short.id}.roh.mp3`);
      await fs.writeFile(rohPfad, ton);
      const pegel = await lautheitAngleichen(rohPfad, path.join('public', datei));

      console.log(
        `   ${short.id}  ${vertont.tonspur!.dauerSek.toFixed(1)}s  ` +
          `Lautheit ${pegel.vorher.toFixed(1)} → ${pegel.nachher} LUFS`,
      );
      fertige.push(vertont);
    }
    console.log('');
  } else if (TON_BEHALTEN) {
    console.log('2  Vertonung aus dem vorhandenen Lauf übernommen');
    fertige = [];
    for (const short of shorts) {
      const propsDatei = path.join(wurzel, 'props', `${short.id}.json`);
      let roh: string;
      try {
        roh = await fs.readFile(propsDatei, 'utf8');
      } catch {
        throw new Error(
          `--ton-behalten: ${propsDatei} fehlt. Der Schalter setzt einen Lauf ` +
            `mit Ton am selben Tag voraus — sonst gibt es keine Vertonung zu behalten.`,
        );
      }
      const vertont = Short.parse((JSON.parse(roh) as { daten: unknown }).daten);
      if (!vertont.tonspur) {
        throw new Error(`--ton-behalten: ${short.id} hat in den Props keine Tonspur.`);
      }
      console.log(`   ${short.id}  ${vertont.tonspur.dauerSek.toFixed(1)}s  unverändert`);
      fertige.push(vertont);
    }
    console.log('');
  } else {
    console.log('2  Vertonen übersprungen – Szenenlängen werden geschätzt\n');
  }

  /* ── 3  Inhaltliche Pruefung ─────────────────────────────────────── */

  console.log('3  Qualität prüfen');
  const roh = JSON.parse(await fs.readFile('daten/quellen.json', 'utf8')) as { quellen: unknown[] };
  const quellen = roh.quellen.map((q) => Quelle.parse(q));
  /*
   * Der eigene Lauf zaehlt nicht als Vergangenheit.
   *
   * `verlaufSchreiben` ersetzt einen Eintrag mit derselben Kennung, ein
   * zweiter Lauf am selben Tag ueberschreibt also sauber. Beim **Pruefen**
   * lag der erste Durchgang aber noch im Verlauf — und meldete alle fuenf
   * Themen als Wiederholung des Laufs, der gerade ersetzt wird. Jeder
   * Korrekturlauf am selben Tag haette damit fuenf falsche Hinweise erzeugt,
   * und Hinweise, die regelmaessig falsch sind, liest bald niemand mehr.
   */
  const verlauf = (await verlaufLesen()).filter((eintrag) => eintrag.lauf !== id);
  const ergebnis = laufPruefen(fertige, quellen, verlauf, Boolean(NUR));

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
      rubrik: s.rubrik,
      themaId: s.themaId,
      winkelart: s.winkelart,
      titelmuster: s.titelmuster,
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

  const propsOrdner = path.join(wurzel, 'props');
  await fs.mkdir(propsOrdner, { recursive: true });

  for (const short of zuRendern) {
    const propsDatei = path.join(propsOrdner, `${short.id}.json`);
    const ziel = path.join(videoOrdner, `${short.id}.mp4`);
    await fs.writeFile(propsDatei, JSON.stringify({ daten: short }));

    const beginn = Date.now();
    await ausfuehren('npx', [
      'remotion', 'render', 'video/index.ts', 'Short', ziel,
      `--props=${propsDatei}`, '--log=error',
    ], { maxBuffer: 32 * 1024 * 1024 });

    const mb = (await fs.stat(ziel)).size / 1_048_576;

    // Technische Endkontrolle an der fertigen Datei. Was hier auffaellt,
    // liesse sich am Skript nicht erkennen.
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
