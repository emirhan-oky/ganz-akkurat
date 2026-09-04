import fs from 'node:fs/promises';
import path from 'node:path';
import { absurdAbSek, gesprocheneZeichen, mitWache, plausibelBisSek } from '../src/stimme';
import type { Synthese } from '../src/stimme';

/**
 * Die Plausibilitaetswache gegen ElevenLabs-Halluzinationen — trocken geprueft.
 *
 * **Kein Netz, keine Kosten.** Genau das ist der Punkt: Die Wache existiert,
 * weil eine kaputte Synthese erst *nach* dem Bezahlen auffaellt. Eine Probe,
 * die zum Pruefen selbst bezahlen muesste, waere derselbe Fehler noch einmal.
 *
 * Drei Teile, und sie pruefen drei verschiedene Dinge:
 *
 * 1. **Die Schwelle gegen die fuenf gemessenen Werte.** Haelt die Formel den
 *    Fall, wegen dem sie gebaut wurde, und laesst sie die vier gesunden durch?
 * 2. **Die Gegenprobe an allen bezahlten Laeufen.** Wie viele Fehlalarme haette
 *    sie im echten Betrieb erzeugt? Soll: null. Dieser Teil waechst mit jedem
 *    Wochenlauf von selbst mit.
 * 3. **Die Verzweigung.** Wird wirklich nur bei Verdacht ein zweites Mal
 *    gerufen — und wird bei Absurdem geworfen?
 *
 * Teil 1 ist der eigentliche Waechter dieser Datei: Er schlaegt fehl, sobald
 * jemand an `TEMPO_TOLERANZ` oder `SOCKEL_SEK` dreht, ohne die Begruendung
 * nachzuziehen.
 */

/**
 * Die fuenf Messwerte vom 31.08.2026: fuenfmal derselbe 18-Zeichen-Text.
 *
 * Der fuenfte ist keine Streuung, sondern ein kaputter Lauf — sieben Minuten
 * Ton fuer vier Woerter.
 */
const MESSTEXT = 'Facts. Mit Volti …';
const GEMESSEN: { dauer: number; gesund: boolean }[] = [
  { dauer: 4.8, gesund: true },
  { dauer: 5.04, gesund: true },
  { dauer: 2.08, gesund: true },
  { dauer: 4.24, gesund: true },
  { dauer: 415.84, gesund: false },
];

let fehler = 0;
const pruefe = (bedingung: boolean, text: string) => {
  console.log(`   ${bedingung ? '✓' : '✕'} ${text}`);
  if (!bedingung) fehler += 1;
};

/* ── 1  Die Schwelle gegen die fuenf Messwerte ────────────────────────── */

const teil1 = () => {
  const grenze = plausibelBisSek(MESSTEXT);
  console.log(`\n1  Die fünf gemessenen Läufe (${gesprocheneZeichen(MESSTEXT)} Zeichen)`);
  console.log(`   Grenze: ${grenze.toFixed(2)}s\n`);

  for (const { dauer, gesund } of GEMESSEN) {
    const durch = dauer <= grenze;
    pruefe(
      durch === gesund,
      `${dauer.toFixed(2).padStart(6)}s  ${durch ? 'durch' : 'gefangen'}` +
        `${durch === gesund ? '' : `  ← erwartet: ${gesund ? 'durch' : 'gefangen'}`}`,
    );
  }
};

/* ── 2  Gegenprobe an allen bezahlten Laeufen ─────────────────────────── */

/**
 * Die Dauer je Abschnitt wird aus den **Wortzeitstempeln** rekonstruiert, nicht
 * ueber `redelaeufe`.
 *
 * Der naheliegende Weg waere, den Short erneut in Laeufe zu zerlegen und die
 * Texte danebenzulegen. Er traegt nicht: `redelaeufe` hat sich am 31.08.2026
 * geaendert und liefert fuer dieselben Props heute 10 Laeufe, wo damals 9
 * bezahlt wurden. Die Zuordnung waere still verschoben — und eine Probe, die
 * sich selbst falsch zuordnet, meldet Fehlalarme, die keine sind.
 *
 * Ueber `woerter` haengt die Rechnung dagegen an dem, was tatsaechlich
 * gesprochen wurde. Das ist unabhaengig vom aktuellen Code und altert nicht.
 */
const teil2 = async () => {
  console.log('\n2  Gegenprobe an den bezahlten Läufen');

  const laeufe = await fs.readdir('laeufe').catch(() => [] as string[]);
  let geprueft = 0;
  let alarme = 0;
  let knappste = Number.POSITIVE_INFINITY;

  for (const lauf of laeufe.sort()) {
    const propsOrdner = path.join('laeufe', lauf, 'props');
    const dateien = await fs.readdir(propsOrdner).catch(() => [] as string[]);

    for (const datei of dateien.sort()) {
      // Alte Laeufe legten je Dienst eine Kopie ab (<id>.tiktok.json); die
      // haben drei Punktteile und werden hier uebersprungen.
      if (!datei.endsWith('.json') || datei.split('.').length !== 2) continue;

      const roh = JSON.parse(await fs.readFile(path.join(propsOrdner, datei), 'utf8')) as {
        daten?: unknown;
      };
      const short = (roh.daten ?? roh) as {
        tonspur?: {
          dauerSek: number;
          abschnitte?: { startSek: number }[];
          woerter?: { wort: string; startSek: number; endeSek: number }[];
        };
      };
      const ton = short.tonspur;
      if (!ton?.abschnitte || !ton.woerter || ton.woerter.length === 0) continue;

      for (const [i, abschnitt] of ton.abschnitte.entries()) {
        const bis = ton.abschnitte[i + 1]?.startSek ?? ton.dauerSek;
        const drin = ton.woerter.filter((w) => w.startSek >= abschnitt.startSek - 0.01 && w.startSek < bis - 0.01);
        if (drin.length === 0) continue;

        const dauer = drin[drin.length - 1]!.endeSek - drin[0]!.startSek;
        const text = drin.map((w) => w.wort).join(' ');
        const grenze = plausibelBisSek(text);

        geprueft += 1;
        knappste = Math.min(knappste, grenze / dauer);
        if (dauer > grenze) {
          alarme += 1;
          console.log(
            `   ✕ ${lauf}/${datei} Abschnitt ${i + 1}: ${dauer.toFixed(2)}s über ${grenze.toFixed(2)}s`,
          );
        }
      }
    }
  }

  if (geprueft === 0) {
    console.log('   · keine bezahlten Läufe gefunden — nichts zu prüfen');
    return;
  }

  pruefe(alarme === 0, `${geprueft} bezahlte Läufe, ${alarme} Fehlalarme`);
  console.log(`   knappster Abstand: Faktor ${knappste.toFixed(2)}`);
  /*
   * Faktor 1,2 ist kein zweiter Schwellenwert, sondern eine Warnlampe: Rueckt
   * ein echter Lauf so nah an die Grenze, ist der naechste womoeglich darueber
   * — und dann kostet die Wache Geld, statt welches zu sparen.
   */
  if (knappste < 1.2) {
    console.log('   ⚠ Ein echter Lauf liegt nah an der Grenze. Die Toleranz gehört angesehen.');
  }
};

/* ── 3  Die Verzweigung, mit eingespeisten Antworten ──────────────────── */

/**
 * Eine Attrappe statt `fetch`.
 *
 * Dass `mitWache` ihren Beschaffer als Parameter nimmt, ist **kein**
 * Testzubehoer: Es ist der Grund, aus dem die Wache ueberhaupt pruefbar ist,
 * ohne die Schnittstelle zu stubben oder zu bezahlen.
 */
const attrappe = (dauern: number[]) => {
  let aufrufe = 0;
  const hol = async (): Promise<Synthese> => {
    const dauerSek = dauern[Math.min(aufrufe, dauern.length - 1)]!;
    aufrufe += 1;
    return { ton: Buffer.alloc(0), dauerSek, woerter: [], ausrichtung: { characters: [], character_start_times_seconds: [], character_end_times_seconds: [] } };
  };
  return { hol, zaehler: () => aufrufe };
};

const teil3 = async () => {
  console.log('\n3  Die Verzweigung');
  const t = MESSTEXT;
  console.log(`   Grenze ${plausibelBisSek(t).toFixed(2)}s · absurd ab ${absurdAbSek(t).toFixed(2)}s\n`);

  {
    const { hol, zaehler } = attrappe([4.8]);
    const e = await mitWache(hol, t, 'Probe');
    pruefe(zaehler() === 1 && e.dauerSek === 4.8, `gesund → 1 Aufruf (${zaehler()}), 4,80s`);
  }
  {
    const { hol, zaehler } = attrappe([415.84, 4.8]);
    const e = await mitWache(hol, t, 'Probe');
    pruefe(zaehler() === 2 && e.dauerSek === 4.8, `kaputt, dann gesund → 2 Aufrufe (${zaehler()}), 4,80s`);
  }
  {
    const { hol, zaehler } = attrappe([9.0, 8.0]);
    const e = await mitWache(hol, t, 'Probe');
    pruefe(zaehler() === 2 && e.dauerSek === 8.0, `zweimal über der Grenze → die kürzere (${e.dauerSek.toFixed(1)}s)`);
  }
  {
    const { hol, zaehler } = attrappe([415.84, 400]);
    const geworfen = await mitWache(hol, t, 'Probe').then(
      () => false,
      () => true,
    );
    pruefe(geworfen && zaehler() === 2, `zweimal absurd → wirft nach ${zaehler()} Aufrufen`);
  }
  {
    const { hol, zaehler } = attrappe([415.84]);
    const e = await mitWache(hol, t, 'Probe', false);
    pruefe(zaehler() === 1 && e.dauerSek === 415.84, `Wache aus → 1 Aufruf, ungeprüft durch`);
  }
};

const main = async () => {
  console.log('\nGanz akkurat · Plausibelprobe (kein Netz, keine Kosten)');
  teil1();
  await teil2();
  await teil3();

  console.log(
    fehler === 0
      ? '\n✓ Die Wache hält.\n'
      : `\n✕ ${fehler} Prüfung(en) fehlgeschlagen.\n`,
  );
  process.exitCode = fehler === 0 ? 0 : 1;
};

void main();
