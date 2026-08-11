import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { beispielShort } from '../daten/beispiel-short';
import { shortVertonen, zeichenverbrauch } from '../src/stimme';
import { laufPruefen } from '../src/pruefung';
import { Quelle, Short } from '../src/typen';

const ausfuehren = promisify(execFile);

/**
 * Durchlauf der kompletten Kette an einem einzelnen Short.
 *
 * Dient als Nachweis, dass Skript, Vertonung, Zeitstempel, Untertitel,
 * Pruefung und Render zusammenspielen — bevor das auf zehn Videos
 * hochskaliert wird.
 */

/** Standardstimme. Im Free-Tarif die einzige ueber die API nutzbare. */
const STIMME = process.env.ELEVENLABS_VOICE_ID ?? 'nPczCjzI2devNBz1zQrb';

const main = async () => {
  const schluessel = process.env.ELEVENLABS_API_KEY;
  if (!schluessel) throw new Error('ELEVENLABS_API_KEY fehlt in .env');

  const short = beispielShort;
  console.log(`Short:  ${short.arbeitstitel}`);
  console.log(`Umfang: ${short.szenen.length} Szenen, ${zeichenverbrauch(short)} Zeichen\n`);

  /* 1 — Vertonen */
  console.log('1  Vertonen …');
  const tondatei = `ton/${short.id}.mp3`;
  const { short: vertont, ton } = await shortVertonen(short, STIMME, schluessel, tondatei);

  await fs.mkdir(path.join('public', 'ton'), { recursive: true });
  await fs.writeFile(path.join('public', tondatei), ton);
  console.log(`   ${vertont.tonspur!.dauerSek.toFixed(1)}s, ${vertont.tonspur!.woerter.length} Wörter`);
  console.log(`   Szenenstarts: ${vertont.tonspur!.szenenStartSek.map((s) => s.toFixed(1)).join('s  ')}s\n`);

  /* 2 — Pruefen */
  console.log('2  Prüfen …');
  const rohquellen = JSON.parse(await fs.readFile('daten/quellen.json', 'utf8')) as { quellen: unknown[] };
  const quellen = rohquellen.quellen.map((q) => Quelle.parse(q));
  const ergebnis = laufPruefen([vertont], quellen);

  if (ergebnis.befunde.length === 0) {
    console.log('   keine Beanstandungen');
  }
  for (const b of ergebnis.befunde) {
    console.log(`   ${b.stufe === 'fehler' ? '✕ FEHLER ' : '· Hinweis'} [${b.regel}] ${b.text}`);
  }
  if (ergebnis.fehler.length > 0) {
    console.log('\nAbbruch: Fehler müssen behoben werden, bevor gerendert wird.');
    process.exit(1);
  }

  /* 3 — Rendern */
  console.log('\n3  Rendern …');
  const ziel = 'laeufe/probe/vertont.mp4';
  const propsDatei = 'laeufe/probe/props.json';
  await fs.mkdir('laeufe/probe', { recursive: true });
  await fs.writeFile(propsDatei, JSON.stringify({ daten: Short.parse(vertont), reihe: 'SchreibtischKlar' }));

  await ausfuehren('npx', [
    'remotion', 'render', 'video/index.ts', 'Short', ziel,
    `--props=${propsDatei}`, '--log=error',
  ]);

  const groesse = (await fs.stat(ziel)).size / 1_048_576;
  console.log(`   ${ziel} — ${groesse.toFixed(1)} MB\n`);
  console.log('Fertig.');
};

main().catch((fehler) => {
  console.error('\nFehlgeschlagen:', fehler.message);
  process.exit(1);
});
