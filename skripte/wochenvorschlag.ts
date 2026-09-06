import fs from 'node:fs/promises';
import { wochenAuswaehlen, reichweiteInWochen } from '../src/wochenauswahl';
import { geschaetzteDauerSek, laengenklasseVon, LAENGENKLASSEN } from '../src/zeit';
import { verlaufLesen } from '../src/verlauf';
import { GEPARKT } from '../daten/entwuerfe';
import { Quelle } from '../src/typen';

/**
 * Schlaegt die fuenf Shorts einer Sendewoche vor.
 *
 * ```
 * npm run wochenvorschlag
 * ```
 *
 * Es aendert nichts. Es zeigt, was die Regeln erlauben — und was der Vorrat
 * noch traegt. Die Auswahl unter den gueltigen Wochen bleibt eine Entscheidung,
 * und der Wochenlauf nimmt sie mit `--auswahl=automatisch` selbst vor.
 */
const main = async () => {
  const quellen = (
    JSON.parse(await fs.readFile('daten/quellen.json', 'utf8')) as { quellen: unknown[] }
  ).quellen.map((q) => Quelle.parse(q));
  const verlauf = await verlaufLesen();

  console.log('\nGanz akkurat · Wochenvorschlag\n');

  const auswahl = wochenAuswaehlen(quellen, verlauf);

  /*
   * **Gezaehlt wird der frische Vorrat, nicht der geparkte.** Am 05.09.2026
   * stand hier die Gesamtzahl — 48 Entwuerfe —, waehrend 18 davon laengst
   * gesendet waren. Eine Zahl, die Gesendetes mitzaehlt, sagt genau dann etwas
   * Falsches, wenn es darauf ankommt.
   */
  const jeBauform = new Map<string, number>();
  const jeFormat = new Map<string, number>();
  for (const s of auswahl.frisch) {
    jeBauform.set(s.bauform, (jeBauform.get(s.bauform) ?? 0) + 1);
    jeFormat.set(s.format, (jeFormat.get(s.format) ?? 0) + 1);
  }
  console.log(
    `   Vorrat: ${auswahl.frisch.length} ungesendete von ${GEPARKT.length} geparkten Entwürfen`,
  );
  console.log(
    '   je Format:  ' +
      [...jeFormat.entries()].sort((a, b) => b[1] - a[1]).map(([f, n]) => `${f} ${n}`).join(' · '),
  );
  console.log(
    '   je Bauform: ' +
      [...jeBauform.entries()].sort((a, b) => b[1] - a[1]).map(([f, n]) => `${f} ${n}`).join(' · '),
  );

  /*
   * **Die Reichweite steht auch dann da, wenn nichts gefunden wurde.** Sie ist
   * die eigentliche Nachricht: Ob heute eine Woche zusammengeht, sagt wenig;
   * dass der Vorrat in drei Wochen leer ist, sagt viel. Gerechnet wird sie am
   * knappsten Bestandteil, nicht an der Gesamtzahl — siehe
   * `reichweiteInWochen`.
   */
  const wochen = auswahl.reichweiteWochen;
  console.log(
    `\n   Reichweite: ${wochen} volle Woche(n) — gerechnet an der Bauform, nicht an der Anzahl.`,
  );
  if (wochen <= 2) {
    console.log('   ⚠ Der Vorrat trägt nicht mehr lange. Was fehlt, sind Wechselreden und Stationen.');
  }

  if (auswahl.shorts.length === 0) {
    console.log(`\n   Kein Vorschlag.\n   ${auswahl.grund}\n`);
    process.exitCode = 1;
    return;
  }

  const tage = ['Mo', 'Mi', 'Fr', 'Sa', 'So'];
  console.log('');
  auswahl.shorts.forEach((s, i) => {
    console.log(
      `   ${tage[i] ?? '  '}  ${s.format.padEnd(14)} ${s.bauform.padEnd(12)} ` +
        `${s.sachgebiet.padEnd(10)} ${Math.round(geschaetzteDauerSek(s))}s  ${s.arbeitstitel}`,
    );
  });

  /*
   * **Wie die Woche ueber die Laengenklassen streut — ein Hinweis, keine
   * Wache.**
   *
   * Der Laengenversuch kann nur etwas messen, wenn die gesendeten Shorts sich
   * ueber die Klassen verteilen. Am 06.09.2026 nachgesehen: Der Vorrat liegt
   * mit 3 / 34 / 18 fast vollstaendig in der Mitte, und `wochenAuswaehlen`
   * kennt die Laenge nicht — es waehlt nach Format, Bauform und Sachgebiet.
   * Bei drei kurzen Kandidaten gegen 52 andere faellt die kurze Klasse in
   * einer Fuenferwoche praktisch nie, und der Vergleich kaeme **nie**
   * zustande, so lange man auch wartet.
   *
   * **Deshalb ein Hinweis und keine Regel.** Ein Mindestmass laesst sich
   * ansteuern und wird selbst zur Schablone — dieselbe Lehre wie bei allen
   * Gespraechsregeln. Und eine Wache, die eine Woche zurueckhaelt, weil kein
   * kurzer Short im Vorrat liegt, hielte jede Woche zurueck: Das fehlende
   * Stueck ist nicht die Auswahl, sondern der ungeschriebene Dialog.
   */
  const jeKlasse = new Map<string, number>();
  for (const s of auswahl.shorts) {
    const k = laengenklasseVon(geschaetzteDauerSek(s)).name;
    jeKlasse.set(k, (jeKlasse.get(k) ?? 0) + 1);
  }
  console.log(
    '\n   Längenklassen: ' +
      LAENGENKLASSEN.map((k) => `${k.name} ${jeKlasse.get(k.name) ?? 0}`).join(' · '),
  );
  const leer = LAENGENKLASSEN.filter((k) => !jeKlasse.has(k.name));
  if (leer.length > 0) {
    console.log(
      `   ⓘ Ohne Video in ${leer.map((k) => k.name).join(' und ')}. ` +
        'Der Längenversuch braucht Streuung — geschätzt, nicht gemessen.',
    );
  }

  console.log('\n   Als WOCHENLAUF in daten/entwuerfe/index.ts:');
  const namen = auswahl.shorts.map((s) => s.id.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase()));
  console.log(`   export const WOCHENLAUF: Short[] = [${namen.join(', ')}];\n`);
};

await main();
