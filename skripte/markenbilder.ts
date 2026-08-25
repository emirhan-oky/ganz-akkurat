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

/**
 * Was gebaut wird, und wofuer es gedacht ist.
 *
 * **Zwei Bilder, seit dem 25.08.2026 — und es kommen keine dritten dazu.**
 * Das dunkle Profilbild war fuer den Fall gedacht, dass das helle im Feed
 * verschwindet; der Kanal steht, es verschwindet nicht. Die freigestellte
 * Wortmarke war fuer Impressum, Anschreiben und eine spaetere Website
 * gedacht — nichts davon gibt es, und ein Bild auf Vorrat veraltet still.
 * Beide sind auf Emirhans Ansage hin gestrichen und werden nicht wieder
 * aufgenommen.
 */
const BILDER = [
  { id: 'Profilbild-hell', datei: 'profilbild-hell.png', zweck: 'Kanalbild auf hellem Grund' },
  { id: 'Banner-muster', datei: 'youtube-banner.png', zweck: 'YouTube-Kanalbanner, 2048x1152' },
] as const;

const main = async () => {
  await fs.mkdir(ZIEL, { recursive: true });
  console.log('Ganz akkurat · Markenbilder\n');

  for (const bild of BILDER) {
    const pfad = `${ZIEL}/${bild.datei}`;
    const argumente = [
      'remotion', 'still', 'video/index.ts', bild.id, pfad,
      '--log=error', '--timeout=120000',
    ];

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
