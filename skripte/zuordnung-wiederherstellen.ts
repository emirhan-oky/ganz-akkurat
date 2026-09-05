import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { gesendeteBeitraege, organisationErmitteln } from '../src/buffer';

/**
 * Stellt die Zuordnung Short → Buffer-Beitrag aus Buffer wieder her.
 *
 * ```
 * npm run zuordnung-wiederherstellen           Probelauf
 * npm run zuordnung-wiederherstellen -- --wirklich
 * ```
 *
 * ## Warum es das gibt
 *
 * `npm run rueckblick` findet seine Videos ueber `laeufe/<tag>/veroeffentlicht.json`
 * — dort steht, welcher Short welchem Buffer-Beitrag entspricht. **Am
 * 04.09.2026 habe ich fuenf Laufordner geloescht**, weil ihre `lauf.json` gegen
 * das heutige Schema nicht mehr parste. Die `veroeffentlicht.json` daneben tat
 * das sehr wohl; ich habe eine Datei nach dem Wert einer anderen beurteilt.
 *
 * Zwoelf Videos verloren damit ihre Zuordnung. Ihre bisherigen Zahlen stehen
 * weiter in `daten/rueckblick.json` — aber neue Messungen bekamen sie nicht
 * mehr, und die neuen Kanalzahlen von TikTok und Instagram schon gar nicht.
 *
 * ## Wie die Zuordnung zurueckkommt
 *
 * Ueber zwei Bruecken, die beide noch stehen:
 *
 * 1. **`rueckblick.json` haelt je Short die YouTube-`videoId`.** Sie steht im
 *    `externalLink` des YouTube-Beitrags — das findet den Beitrag eindeutig.
 * 2. **Die drei Beitraege eines Shorts wurden zusammen gesendet.** Buffer
 *    stellt sie innerhalb weniger Minuten zu; ein Fenster von 30 Minuten um den
 *    YouTube-Zeitpunkt trifft genau die beiden anderen.
 *
 * Am 05.09.2026 geprueft: **18 von 18 Shorts eindeutig**, kein einziger Fall mit
 * zwei Beitraegen desselben Dienstes im Fenster.
 *
 * ## Einmalig, und das steht hier
 *
 * Das Skript ist kein Teil der Kette. Es repariert einen Verlust und darf
 * danach stehenbleiben wie ein Notschluessel — wer es ein zweites Mal braucht,
 * hat wieder Laufordner geloescht.
 */
const WIRKLICH = process.argv.includes('--wirklich');
const ZIEL = path.join('laeufe', 'wiederhergestellt');
/** Wie weit die Beitraege eines Shorts zeitlich auseinanderliegen duerfen. */
const FENSTER_MS = 30 * 60 * 1000;

const main = async () => {
  const schluessel = process.env.BUFFER_ACCESS_TOKEN;
  if (!schluessel) throw new Error('BUFFER_ACCESS_TOKEN fehlt in .env');

  console.log('\nGanz akkurat · Zuordnung wiederherstellen');
  console.log(WIRKLICH ? 'Modus: es wird geschrieben\n' : 'Modus: Probelauf\n');

  const rueckblick = JSON.parse(await fs.readFile('daten/rueckblick.json', 'utf8')) as {
    shorts: Record<string, { videoId: string }>;
  };

  /* Was schon zugeordnet ist, bleibt unangetastet — der Notschluessel dreht
   * nur an den Tueren, die wirklich zu sind. */
  const vorhanden = new Set<string>();
  for (const ordner of await fs.readdir('laeufe').catch(() => [] as string[])) {
    const datei = path.join('laeufe', ordner, 'veroeffentlicht.json');
    const roh = await fs.readFile(datei, 'utf8').catch(() => null);
    if (!roh) continue;
    for (const e of JSON.parse(roh) as { shortId: string }[]) vorhanden.add(e.shortId);
  }

  const organisationId = await organisationErmitteln(schluessel);
  const beitraege = await gesendeteBeitraege(schluessel, organisationId);

  const neu: { shortId: string; kanalId: string; dienst: string; faelligAm: string; beitragId: string }[] = [];
  let schon = 0;

  for (const [shortId, v] of Object.entries(rueckblick.shorts)) {
    if (vorhanden.has(shortId)) { schon++; continue; }

    const yt = beitraege.find((b) => b.dienst === 'youtube' && (b.link ?? '').includes(v.videoId));
    if (!yt?.gesendetAm) {
      console.log(`   ✕ ${shortId.padEnd(24)} kein YouTube-Beitrag zu ${v.videoId}`);
      continue;
    }

    const t = new Date(yt.gesendetAm).getTime();
    const nah = beitraege.filter(
      (b) => b.gesendetAm && Math.abs(new Date(b.gesendetAm).getTime() - t) < FENSTER_MS,
    );
    const jeDienst = new Map(nah.map((b) => [b.dienst, b]));
    if (jeDienst.size !== nah.length) {
      console.log(`   ✕ ${shortId.padEnd(24)} mehrdeutig: ${nah.length} Beiträge, ${jeDienst.size} Dienste`);
      continue;
    }

    for (const b of jeDienst.values()) {
      neu.push({
        shortId,
        kanalId: '',
        dienst: b.dienst,
        faelligAm: b.gesendetAm!,
        beitragId: b.id,
      });
    }
    console.log(
      `   ✓ ${shortId.padEnd(24)} ${[...jeDienst.keys()].join(', ')}  (${yt.gesendetAm.slice(0, 10)})`,
    );
  }

  console.log(`\n   ${schon} Short(s) hatten ihre Zuordnung noch, ${neu.length} Einträge neu.`);

  if (neu.length === 0) return;
  if (!WIRKLICH) {
    console.log(`   Mit --wirklich entstünde ${path.join(ZIEL, 'veroeffentlicht.json')}.\n`);
    return;
  }

  await fs.mkdir(ZIEL, { recursive: true });
  await fs.writeFile(path.join(ZIEL, 'veroeffentlicht.json'), JSON.stringify(neu, null, 2));
  console.log(`   ✓ ${path.join(ZIEL, 'veroeffentlicht.json')}\n`);
};

await main();
