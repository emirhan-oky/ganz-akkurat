import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { beitragLoeschen } from '../src/buffer';

/**
 * Nimmt die Beitraege eines Laufs bei Buffer zurueck.
 *
 * Aufruf:
 *   npm run zuruecknehmen -- 2026-08-15              Probelauf, zeigt nur
 *   npm run zuruecknehmen -- 2026-08-15 --wirklich   loescht wirklich
 *
 * ## Was das kann — und was ausdruecklich nicht
 *
 * Geloescht wird der Beitrag **bei Buffer**. Ist er dort noch geplant, ist er
 * damit weg und erscheint nie.
 *
 * **Ist er schon veroeffentlicht, bleibt er auf der Plattform stehen.** Buffer
 * hat keinen Zugriff mehr auf einen Beitrag, den Instagram, TikTok oder
 * YouTube bereits angenommen haben; geloescht wird dann nur der Eintrag in
 * Buffers eigener Uebersicht. Wer den Beitrag wirklich aus der Welt haben
 * will, loescht ihn in der jeweiligen App von Hand.
 *
 * Das ist keine Einschraenkung dieses Skripts, sondern der Grund, warum
 * `veroeffentlichen` einplant statt sofort zu senden: Zwischen dem Einplanen
 * und dem Erscheinen liegt das Zeitfenster, in dem sich etwas
 * zurueckholen laesst.
 *
 * Angelegt am 15.08.2026, nachdem der erste veroeffentlichte Beitrag am
 * Telefon Layoutfehler zeigte und wieder wegmusste — von Hand in drei Apps.
 */

const WIRKLICH = process.argv.includes('--wirklich');
const laufId = process.argv[2];

type Eintrag = {
  shortId: string;
  kanalId: string;
  dienst: string;
  faelligAm: string;
  beitragId: string;
};

const main = async () => {
  if (!laufId || laufId.startsWith('--')) {
    console.error('Aufruf: npm run zuruecknehmen -- <lauf-id> [--wirklich]');
    process.exit(1);
  }

  const schluessel = process.env.BUFFER_ACCESS_TOKEN;
  if (!schluessel) throw new Error('BUFFER_ACCESS_TOKEN fehlt in .env');

  const datei = path.join('laeufe', laufId, 'veroeffentlicht.json');
  let eintraege: Eintrag[];
  try {
    eintraege = JSON.parse(await fs.readFile(datei, 'utf8')) as Eintrag[];
  } catch {
    throw new Error(`${datei} fehlt — für diesen Lauf wurde nichts eingeplant.`);
  }

  console.log(`SetupKlar · Beiträge zurücknehmen ${laufId}`);
  console.log(WIRKLICH ? 'Modus: es wird wirklich gelöscht\n' : 'Modus: Probelauf, es wird nichts gelöscht\n');
  console.log(`${eintraege.length} Beitrag/Beiträge in ${datei}\n`);

  let weg = 0;
  const nichtMehrZuruecknehmbar: string[] = [];
  for (const e of eintraege) {
    const kennung = `${e.shortId}  ${e.dienst.padEnd(10)}`;
    if (!WIRKLICH) {
      console.log(`   · ${kennung} würde gelöscht (${e.beitragId})`);
      continue;
    }
    try {
      await beitragLoeschen(schluessel, e.beitragId);
      console.log(`   ✓ ${kennung} bei Buffer gelöscht`);
      weg++;
    } catch (f) {
      const meldung = (f as Error).message;
      /*
       * Buffers Antwort auf einen bereits gesendeten Beitrag lautet
       * „Account is not allowed to perform this action on post". Das klingt
       * nach einem Rechteproblem und ist keines — der Beitrag ist schlicht
       * schon draussen und gehoert damit der Plattform, nicht mehr Buffer.
       * Am 15.08.2026 genau so eingetreten, beim ersten Rueckruf.
       */
      if (/not allowed to perform this action/i.test(meldung)) {
        console.log(`   ✕ ${kennung} schon veröffentlicht – Buffer kann ihn nicht mehr zurückholen`);
        nichtMehrZuruecknehmbar.push(e.dienst);
      } else {
        console.log(`   ✕ ${kennung} ${meldung}`);
      }
    }
  }

  if (!WIRKLICH) {
    console.log(`\nProbelauf beendet. Mit --wirklich würden ${eintraege.length} Beiträge gelöscht.`);
    return;
  }

  /*
   * Die Datei bleibt liegen und wird nur umbenannt. Sie ist der einzige
   * Nachweis darueber, was einmal draussen war — und gerade wenn ein Beitrag
   * auf der Plattform stehenbleibt, will man die Kennungen spaeter noch
   * nachschlagen koennen.
   */
  if (nichtMehrZuruecknehmbar.length > 0) {
    console.log(
      `\n${nichtMehrZuruecknehmbar.length} Beitrag/Beiträge waren schon veröffentlicht ` +
        `(${nichtMehrZuruecknehmbar.join(', ')}).`,
    );
    console.log(
      'Die gehören jetzt der Plattform, nicht mehr Buffer — löschen geht nur\n' +
        'in der jeweiligen App von Hand:\n' +
        '  Instagram  Reel öffnen → ··· → Löschen\n' +
        '  TikTok     Video öffnen → ··· → Löschen\n' +
        '  YouTube    YouTube Studio → Inhalte → Shorts → Löschen',
    );
  }

  if (weg > 0) {
    const beiseite = path.join('laeufe', laufId, `veroeffentlicht.zurueckgenommen.json`);
    await fs.rename(datei, beiseite).catch(() => undefined);
    console.log(`\n${weg} Beitrag/Beiträge bei Buffer gelöscht.`);
    console.log(`Nachweis liegt in ${beiseite}`);
    console.log(
      '\nAchtung: Bereits veröffentlichte Beiträge bleiben auf der Plattform.\n' +
        'Die müssen in Instagram, TikTok bzw. YouTube von Hand gelöscht werden.',
    );
  }
};

main().catch((f) => {
  console.error(f.message);
  process.exit(1);
});
