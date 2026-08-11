import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { SETUPKLAR_STIMME, synthetisieren } from '../src/stimme';

/**
 * Erzeugt Hoerproben mehrerer Stimmen mit identischem Text.
 *
 * Nur so ist ein Vergleich fair: gleiche Saetze, gleiche Einstellungen,
 * einziger Unterschied ist die Stimme. Der Text enthaelt bewusst einen
 * technischen Begriff und eine direkte Ansprache — genau die zwei Stellen,
 * an denen deutsche Stimmen typischerweise auseinanderfallen.
 */

const PROBETEXT =
  'Dein Dock lädt, aber der Monitor bleibt schwarz. Das liegt fast nie am Dock. ' +
  'Ein USB-C-Anschluss überträgt nur dann ein Bild, wenn er DisplayPort Alt Mode beherrscht.';

const KANDIDATEN = [
  { id: 'MMwckqU477oQxnAk1SgA', name: 'Ben', beschreibung: 'gesprächig, angenehm' },
  { id: 'z1EhmmPwF0ENGYE8dBE6', name: 'Christian-Plasa', beschreibung: 'natürlich, freundlich' },
  { id: 'ztZBipzb4WQJRDayep3G', name: 'Alex', beschreibung: 'jung, locker, klar' },
  { id: 'vmVmHDKBkkCgbLVIOJRb', name: 'Charlie-Chatlin', beschreibung: 'entspannt' },
];

const ZIEL = 'laeufe/stimmproben';

const main = async () => {
  const schluessel = process.env.ELEVENLABS_API_KEY;
  if (!schluessel) throw new Error('ELEVENLABS_API_KEY fehlt in .env');

  await fs.mkdir(ZIEL, { recursive: true });
  console.log(`Probetext: ${PROBETEXT.length} Zeichen je Stimme\n`);

  for (const kandidat of KANDIDATEN) {
    try {
      const synthese = await synthetisieren(
        PROBETEXT,
        { stimmeId: kandidat.id, ...SETUPKLAR_STIMME },
        schluessel,
      );
      const datei = path.join(ZIEL, `${kandidat.name}.mp3`);
      await fs.writeFile(datei, synthese.ton);
      console.log(
        `✓ ${kandidat.name.padEnd(18)} ${synthese.dauerSek.toFixed(1)}s  ` +
          `${synthese.woerter.length} Wörter  (${kandidat.beschreibung})`,
      );
    } catch (fehler) {
      console.log(`✕ ${kandidat.name.padEnd(18)} ${(fehler as Error).message.slice(0, 120)}`);
    }
  }

  console.log(`\nHörproben liegen in ${ZIEL}/`);
};

main().catch((fehler) => {
  console.error(fehler.message);
  process.exit(1);
});
