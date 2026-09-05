import { writeFileSync } from 'node:fs';
import { herkuenfteLesen, rueckblickLesen, zusammenfuehren, KANAELE } from '../src/rueckschau';
import { kanalseiteBauen, summieren } from '../src/kanalseite';

/**
 * `npm run kanalwoche` — die Wochenauswertung über alle drei Kanäle.
 *
 * Läuft sonntags um 11:30 als `de.ganzakkurat.kanalwoche`, also **vor** dem
 * Wochenlauf um 12:00: Wer die nächste Woche wählt, soll wissen, was die
 * letzte getan hat.
 *
 * Es holt nichts ab und kostet nichts — die Zahlen stehen schon in
 * `daten/rueckblick.json`, wo `npm run rueckblick` sie täglich hinterlegt.
 * Erzeugt wird `kanalwoche.html` im Wurzelverzeichnis, wie `belege.html`;
 * beide stehen in `.gitignore`, weil sie jederzeit neu entstehen.
 *
 *   npm run kanalwoche              erzeugen und öffnen
 *   npm run kanalwoche -- --still   nur erzeugen, nicht öffnen
 */

const ZIEL = 'kanalwoche.html';

/** Das Fenster, über das der Zuwachs gerechnet wird. */
const FENSTER_TAGE = 7;

const main = async () => {
  const [eintraege, herkuenfte] = await Promise.all([rueckblickLesen(), herkuenfteLesen()]);
  const alle = zusammenfuehren(eintraege, herkuenfte);

  if (alle.length === 0) {
    console.log('Noch nichts gemessen. `npm run rueckblick` holt die Zahlen.');
    return;
  }

  /*
   * Der Fall, der eine eigene Meldung braucht: Es ist gemessen worden, aber
   * ohne Kanalzahlen. So sah die Ablage vor dem 05.09.2026 aus, und eine
   * Seite mit drei leeren Spalten sähe aus wie ein Ausfall der drei Kanäle.
   */
  const mitKanaelen = alle.filter((r) => r.zuletzt.jeKanal);
  if (mitKanaelen.length === 0) {
    console.log(
      'Gemessen, aber ohne Kanalzahlen. Die kommen erst mit einem Rückblick ab dem\n' +
        '05.09.2026 — `npm run rueckblick` holt sie.',
    );
    return;
  }

  const { summen } = summieren(alle, FENSTER_TAGE);

  console.log('Ganz akkurat · Kanalwoche\n');
  console.log(`  ${alle.length} Videos draußen, ${mitKanaelen.length} davon mit Kanalzahlen.\n`);
  console.log('  Kanal        Videos   Aufrufe  Reichw.  Geteilt   Abos');
  console.log('  ' + '─'.repeat(56));
  for (const kanal of KANAELE) {
    const s = summen[kanal];
    console.log(
      `  ${kanal.padEnd(12)}${String(s.videos).padStart(5)}${String(s.aufrufe).padStart(10)}` +
        `${(s.reichweite || '—').toString().padStart(9)}${String(s.geteilt).padStart(9)}` +
        `${String(s.neueAbos).padStart(7)}`,
    );
  }
  console.log('  ' + '─'.repeat(56));
  console.log(
    `  ${'gesamt'.padEnd(12)}     ${String(KANAELE.reduce((n, k) => n + summen[k].aufrufe, 0)).padStart(9)}`,
  );

  writeFileSync(ZIEL, kanalseiteBauen(alle, FENSTER_TAGE));
  console.log(`\n✓ ${ZIEL} geschrieben.`);

  if (!process.argv.includes('--still')) {
    const { spawn } = await import('node:child_process');
    spawn('open', [ZIEL], { stdio: 'ignore', detached: true }).unref();
  }
};

main().catch((fehler) => {
  console.error('\n✗ ' + (fehler instanceof Error ? fehler.message : String(fehler)));
  process.exit(1);
});
