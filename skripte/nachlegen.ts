import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import {
  geplanteJeKanal,
  GEPLANT_MAXIMUM,
  kanaeleLesen,
  organisationErmitteln,
  type Veroeffentlichung,
} from '../src/buffer';

/**
 * Legt nach, was beim Veroeffentlichen keinen Platz mehr hatte.
 *
 * Buffers kostenloser Tarif erlaubt zehn geplante Beitraege **je Kanal**. Bei
 * acht Shorts auf drei Kanaelen passt eine zweite Woche nicht daneben,
 * solange die erste noch aussteht — am 18.08.2026 blieben deshalb vier von
 * acht Shorts liegen.
 *
 * Der Kern der Loesung steckt nicht hier, sondern in `veroeffentlichen.ts`:
 * Der Lauf ist **wiederholbar** geworden. Er ueberspringt, was schon in
 * `veroeffentlicht.json` steht, und legt nur an, was Buffer noch annimmt.
 * Dieses Skript ruft ihn deshalb einfach noch einmal auf.
 *
 * Der Rest ist Hoeflichkeit: Steht kein Platz zur Verfuegung, wird gar nicht
 * erst hochgeladen, und die Meldung sagt, wann es sich wieder lohnt.
 *
 *   npm run nachlegen              # sehen, was ginge
 *   npm run nachlegen -- --wirklich
 *
 * Fuer die taegliche Ausfuehrung siehe `skripte/nachlegen.plist` — der Dienst
 * laeuft, wenn der Rechner an ist, und tut an Tagen ohne freien Platz nichts.
 */

const WIRKLICH = process.argv.includes('--wirklich');

/** Der jüngste Lauf, der eine Freigabe hat. */
const letzterLauf = async (): Promise<string | null> => {
  const ordner = (await fs.readdir('laeufe').catch(() => [] as string[]))
    .filter((n) => /^\d{4}-\d{2}-\d{2}$/.test(n))
    .sort()
    .reverse();
  for (const o of ordner) {
    if (await fs.stat(path.join('laeufe', o, 'freigabe.json')).catch(() => null)) return o;
  }
  return null;
};

const main = async () => {
  const schluessel = process.env.BUFFER_ACCESS_TOKEN;
  if (!schluessel) throw new Error('BUFFER_ACCESS_TOKEN fehlt in .env');

  const lauf = await letzterLauf();
  if (!lauf) {
    console.log('Kein Lauf mit Freigabe gefunden. Nichts nachzulegen.');
    return;
  }

  const freigabe = JSON.parse(
    await fs.readFile(path.join('laeufe', lauf, 'freigabe.json'), 'utf8'),
  ) as { freigegeben: string[] };
  const draussen = await fs
    .readFile(path.join('laeufe', lauf, 'veroeffentlicht.json'), 'utf8')
    .then((t) => JSON.parse(t) as Veroeffentlichung[])
    .catch(() => [] as Veroeffentlichung[]);

  const organisation = await organisationErmitteln(schluessel);
  const kanaele = (await kanaeleLesen(schluessel, organisation)).filter((k) => !k.isDisconnected);
  const belegt = await geplanteJeKanal(schluessel, organisation);

  const fehlt = freigabe.freigegeben.filter((id) =>
    kanaele.some((k) => !draussen.some((e) => e.shortId === id && e.kanalId === k.id)),
  );

  console.log(`Lauf ${lauf} · ${freigabe.freigegeben.length} freigegeben, ${fehlt.length} offen\n`);

  if (fehlt.length === 0) {
    console.log('Alles eingeplant. Nichts zu tun.');
    return;
  }

  const platz = Math.min(...kanaele.map((k) => GEPLANT_MAXIMUM - (belegt.get(k.id) ?? 0)));
  for (const k of kanaele) {
    console.log(
      `  ${k.service.padEnd(10)} ${belegt.get(k.id) ?? 0} von ${GEPLANT_MAXIMUM} belegt`,
    );
  }
  console.log(`\nOffen: ${fehlt.join(', ')}`);

  if (platz <= 0) {
    console.log('\nKein Platz frei. Sobald ein Beitrag gesendet ist, wird einer frei —');
    console.log('bei einem Video am Tag also morgen. Nichts unternommen.');
    return;
  }

  console.log(`\n${Math.min(platz, fehlt.length)} Short(s) passen jetzt hinein.`);

  if (!WIRKLICH) {
    console.log('\nProbelauf. Mit --wirklich wird eingeplant.');
    return;
  }

  /*
   * Der eigentliche Versand laeuft ueber `veroeffentlichen.ts` und nicht ueber
   * eine zweite Kopie derselben Logik. Dort sitzen Frischepruefung, Upload,
   * Zeitplan und die Buchfuehrung — eine Nebenimplementierung waere genau die
   * doppelte Liste, die dieses Projekt schon einmal Geld gekostet hat.
   */
  console.log('\n— übergebe an veroeffentlichen —\n');
  const ab = process.argv.find((a) => a.startsWith('--ab='));
  const args = ['run', 'veroeffentlichen', '--', lauf, '--wirklich', ...(ab ? [ab] : [])];
  const kind = spawn('npm', args, { stdio: 'inherit' });
  await new Promise<void>((f, r) =>
    kind.on('exit', (c) => (c === 0 ? f() : r(new Error(`veroeffentlichen endete mit ${c}`)))),
  );
};

main().catch((f) => {
  console.error('\n✗ ' + (f instanceof Error ? f.message : String(f)));
  process.exit(1);
});
