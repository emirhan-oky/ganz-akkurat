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
import { dockKeinBild } from '../daten/entwuerfe/dock-kein-bild';

const ausfuehren = promisify(execFile);

/**
 * Der Wochenlauf.
 *
 * Standard ist der **Trockenlauf**: alles ausser der Vertonung. Damit laesst
 * sich die gesamte Kette beliebig oft ueben, ohne Zeichenkontingent zu
 * verbrauchen. Erst `--mit-ton` ruft die Sprachsynthese auf und kostet Geld.
 *
 * Aufruf:
 *   npm run lauf              Trockenlauf, geschaetzte Szenenlaengen
 *   npm run lauf -- --mit-ton echte Vertonung und Zeitstempel
 */

const MIT_TON = process.argv.includes('--mit-ton');
const STIMME = process.env.ELEVENLABS_VOICE_ID ?? 'nPczCjzI2devNBz1zQrb';

/**
 * Die fuenf Shorts dieses Laufs — **ein** Thema, nicht zwei.
 *
 * Der Engpass war nie die Produktion, sondern der Beleg: drei geprueefte
 * Quellen je Short sind fuer ein Thema pro Woche zu halten, fuer zwei nicht.
 * `powerbank-flug` bleibt als Entwurf liegen, bis seine Quellenlage steht —
 * bisher traegt das ganze Thema eine einzige Quelle.
 */
const ENTWUERFE: Short[] = dockKeinBild;

/**
 * Der Setup-Kontext eines Shorts steht im Themenpool, nicht im Entwurf.
 * So gibt es genau eine Stelle, an der ein Thema seinem Kontext zugeordnet ist.
 */
const kontextZuordnung = async (): Promise<Map<string, string>> => {
  const pool = JSON.parse(await fs.readFile('daten/themen.json', 'utf8')) as {
    themen: { id: string; kontext: string }[];
  };
  return new Map(pool.themen.map((t) => [t.id, t.kontext]));
};

const laufId = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const main = async () => {
  const id = laufId();
  const wurzel = path.join('laeufe', id);
  const videoOrdner = path.join(wurzel, 'videos');
  await fs.mkdir(videoOrdner, { recursive: true });

  console.log(`SetupKlar · Wochenlauf ${id}`);
  console.log(MIT_TON ? 'Modus: mit Vertonung\n' : 'Modus: Trockenlauf (keine Vertonung, kein Verbrauch)\n');

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
  } else {
    console.log('2  Vertonen übersprungen – Szenenlängen werden geschätzt\n');
  }

  /* ── 3  Inhaltliche Pruefung ─────────────────────────────────────── */

  console.log('3  Qualität prüfen');
  const roh = JSON.parse(await fs.readFile('daten/quellen.json', 'utf8')) as { quellen: unknown[] };
  const quellen = roh.quellen.map((q) => Quelle.parse(q));
  const ergebnis = laufPruefen(fertige, quellen);

  for (const b of ergebnis.befunde) {
    console.log(`   ${b.stufe === 'fehler' ? '✕' : '·'} ${b.shortId}  [${b.regel}] ${b.text}`);
  }
  console.log(`   ${ergebnis.fehler.length} Fehler, ${ergebnis.hinweise.length} Hinweise\n`);

  /* ── 4  Rendern ──────────────────────────────────────────────────── */

  console.log('4  Rendern');
  const zuRendern = ergebnis.freigabefaehig;
  if (zuRendern.length < fertige.length) {
    console.log(`   ${fertige.length - zuRendern.length} Short(s) wegen Fehlern übersprungen`);
  }

  const propsOrdner = path.join(wurzel, 'props');
  await fs.mkdir(propsOrdner, { recursive: true });
  const kontexte = await kontextZuordnung();

  for (const short of zuRendern) {
    const propsDatei = path.join(propsOrdner, `${short.id}.json`);
    const ziel = path.join(videoOrdner, `${short.id}.mp4`);
    await fs.writeFile(
      propsDatei,
      JSON.stringify({ daten: short, kontext: kontexte.get(short.themaId) ?? 'Setup' }),
    );

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
    console.log(`   ${short.id}  ${mb.toFixed(1)} MB  (${((Date.now() - beginn) / 1000).toFixed(0)}s)${anmerkung}`);
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
    mitTon: MIT_TON,
  });
  const seitenPfad = path.join(wurzel, 'freigabe.html');
  await fs.writeFile(seitenPfad, seite);

  await fs.writeFile(
    path.join(wurzel, 'lauf.json'),
    JSON.stringify({ id, erstelltAm: new Date().toISOString(), mitTon: MIT_TON, shorts: zuRendern }, null, 2),
  );

  console.log(`   ${seitenPfad}\n`);
  console.log(`Fertig. Öffnen mit:  open ${seitenPfad}`);
};

main().catch((fehler) => {
  console.error('\nFehlgeschlagen:', fehler.message);
  process.exit(1);
});
