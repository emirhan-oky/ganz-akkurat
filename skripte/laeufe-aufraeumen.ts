/**
 * Alte Rendervideos aus `laeufe/` entfernen — und nichts anderes.
 *
 * **Der Ordner lag am 06.09.2026 bei 141 MB, und 137 davon sind neun MP4s.**
 * Sie sind auf Cloudflare R2 hochgeladen und bei Buffer eingeplant; die lokale
 * Kopie wird nur noch gebraucht, wenn jemand denselben Lauf ein zweites Mal
 * hochladen will.
 *
 * ## Was hier nie gelöscht wird
 *
 * **`veroeffentlicht.json`, `lauf.json`, `freigabe.json` und die Tonspuren in
 * `props/` bleiben immer.** Am 04.09.2026 habe ich fünf Laufordner gelöscht,
 * weil ihre `lauf.json` nicht mehr parste — die `veroeffentlicht.json` daneben
 * tat das sehr wohl, und zwölf Videos verloren ihre Buffer-Zuordnung. **Eine
 * Datei nach dem Wert einer anderen zu beurteilen, ist der Fehler**, gegen den
 * dieses Skript gebaut ist: Es sieht ausschließlich `*.mp4` an.
 *
 * ## Wann ein Video als entbehrlich gilt
 *
 * Nur wenn sein Short im Rückblick **Aufrufe** hat. Das ist der einzige
 * Nachweis, der von außen kommt: Was Aufrufe hat, ist gesendet, und was
 * gesendet ist, liegt bei R2 und auf drei Plattformen. Ein Video, das erst
 * eingeplant ist, bleibt liegen — dort wäre ein neuer Render nötig, wenn der
 * Upload nachgezogen werden muss.
 *
 * Aufruf:
 *   npm run laeufe-aufraeumen              # zeigt nur an
 *   npm run laeufe-aufraeumen -- --wirklich
 */
import { readdirSync, statSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { rueckblickLesenSync, type Rueckblickeintrag } from '../src/rueckschau';

const WIRKLICH = process.argv.includes('--wirklich');
const WURZEL = 'laeufe';

const mb = (bytes: number): string => (bytes / 1024 / 1024).toFixed(1).padStart(6) + ' MB';

const main = () => {
  const gemessen = rueckblickLesenSync();
  const mitAufrufen = new Set(
    Object.entries(gemessen)
      .filter(([, e]) => ((e as Rueckblickeintrag).messungen ?? []).some((m) => (m.aufrufe ?? 0) > 0))
      .map(([id]) => id),
  );

  console.log('Ganz akkurat · Laufordner aufräumen\n');
  console.log(`  ${mitAufrufen.size} Shorts haben Aufrufe und gelten damit als gesendet.\n`);

  let frei = 0;
  let behalten = 0;
  const weg: string[] = [];

  for (const tag of readdirSync(WURZEL)) {
    const videos = path.join(WURZEL, tag, 'videos');
    let dateien: string[];
    try {
      dateien = readdirSync(videos).filter((d) => d.endsWith('.mp4'));
    } catch {
      continue;
    }
    for (const datei of dateien) {
      const voll = path.join(videos, datei);
      const groesse = statSync(voll).size;
      const id = datei.replace(/\.mp4$/, '');
      if (mitAufrufen.has(id)) {
        weg.push(voll);
        frei += groesse;
        console.log(`  ${mb(groesse)}  ${tag}/${datei}  — gesendet, kann weg`);
      } else {
        behalten += groesse;
        console.log(`  ${mb(groesse)}  ${tag}/${datei}  — noch keine Aufrufe, bleibt`);
      }
    }
  }

  if (weg.length === 0) {
    console.log('\n  Nichts zu tun.');
    return;
  }

  console.log(`\n  ${mb(frei)} freizugeben, ${mb(behalten)} bleiben liegen.`);

  if (!WIRKLICH) {
    console.log('  Nichts gelöscht. Mit `-- --wirklich` ausführen.');
    return;
  }

  for (const datei of weg) unlinkSync(datei);
  console.log(`  ${weg.length} Datei(en) gelöscht.`);
};

main();
