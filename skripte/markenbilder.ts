import fs from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

/**
 * `npm run markenbilder` — Profilbild, Banner und Wortmarke als Dateien.
 *
 * Die Bilder werden **erzeugt und nicht gepflegt**. Der Anlass steht in der
 * Geschichte dieses Repositories: Bis zum 17.08.2026 lagen acht von Hand
 * gebaute PNG-Banner darin, zusammen 32 MB, und sie trugen einen Kanalnamen,
 * den es seit einem Tag nicht mehr gab. Sie sind beim Umschreiben der
 * Historie herausgeflogen und kommen als Datei nicht zurueck.
 *
 * Die Ausgabe landet in `marke/` und steht in `.gitignore`: Was sich mit
 * einem Befehl aus dem Code wiederherstellen laesst, gehoert nicht in die
 * Versionsverwaltung — dieselbe Regel wie bei `laeufe/`.
 */

const ausfuehren = promisify(execFile);
const ZIEL = 'marke';

/** Was gebaut wird, und wofuer es gedacht ist. */
const BILDER = [
  { id: 'Profilbild-hell', datei: 'profilbild-hell.png', zweck: 'Kanalbild auf hellem Grund' },
  { id: 'Profilbild-dunkel', datei: 'profilbild-dunkel.png', zweck: 'Kanalbild, falls hell verschwindet' },
  { id: 'Banner-muster', datei: 'youtube-banner.png', zweck: 'YouTube-Kanalbanner, 2048x1152' },
  { id: 'Wortmarke-quer', datei: 'wortmarke-quer.png', zweck: 'freigestellt, mit Transparenz' },
] as const;

/** Nur die Wortmarke braucht einen durchsichtigen Grund. */
const DURCHSICHTIG = new Set(['Wortmarke-quer']);

const main = async () => {
  await fs.mkdir(ZIEL, { recursive: true });
  console.log('Ganz akkurat · Markenbilder\n');

  for (const bild of BILDER) {
    const pfad = `${ZIEL}/${bild.datei}`;
    const argumente = [
      'remotion', 'still', 'video/index.ts', bild.id, pfad,
      '--log=error', '--timeout=120000',
    ];
    if (DURCHSICHTIG.has(bild.id)) argumente.push('--image-format=png', '--transparent');

    await ausfuehren('npx', argumente, { maxBuffer: 32 * 1024 * 1024 });
    const kb = Math.round((await fs.stat(pfad)).size / 1024);
    console.log(`  ✓ ${pfad.padEnd(34)} ${String(kb).padStart(4)} KB   ${bild.zweck}`);
  }

  console.log(`\nFertig. Öffnen mit:  open ${ZIEL}`);
};

main().catch((fehler) => {
  console.error('\nFehlgeschlagen:', fehler.message);
  process.exit(1);
});
