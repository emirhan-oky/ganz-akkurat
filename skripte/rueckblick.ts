import 'dotenv/config';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { gesendeteBeitraege, organisationErmitteln } from '../src/buffer';
import {
  zugriffstoken,
  videozahlen,
  verlaufszahlen,
  haltekurve,
  halteQuoteBei,
} from '../src/youtube';

/**
 * Der Rücklauf: was aus den Videos geworden ist.
 *
 * Bis zum 18.08.2026 war die Pipeline eine Einbahnstraße. `verlauf.json`
 * schrieb mit, **was** hinausging — Format, Sachgebiet, Thema, Dauer —, aber
 * nie, was ankam. Woche 3 wusste nichts von Woche 1. Jede Regel über
 * Reichweite wäre damit geraten gewesen, und geratene Größen haben dieses
 * Projekt schon zweimal Geld gekostet (`ZEICHEN_PRO_SEKUNDE`, `pauseSek`).
 *
 * Der Weg: `veroeffentlicht.json` hält `shortId` und `beitragId`, Buffer
 * liefert dazu die Adresse draußen, YouTube die Zahlen.
 *
 * **Die Aufrufe sind die unwichtigste der Zahlen.** Sie sagen, was der
 * Algorithmus getan hat. Was der Zuschauer getan hat, steht in der
 * Haltequote — und die wird an der Stelle gelesen, an der dieser Kanal schon
 * eine Regel hat: Sekunde 3,5, das Ende des Aufschlags.
 *
 *   npm run rueckblick            # holen und in daten/rueckblick.json schreiben
 *   npm run rueckblick -- --zeigen  # nur anzeigen, nichts schreiben
 */

const ABLAGE = 'daten/rueckblick.json';
const AUFSCHLAG_SEK = 3.5;
const NUR_ZEIGEN = process.argv.includes('--zeigen');

type Messung = {
  gemessenAm: string;
  aufrufe: number;
  likes: number;
  kommentare: number;
  /** Anteil des Videos, der im Schnitt gesehen wurde, in Prozent. */
  durchsicht: number | null;
  /** Anteil, der am Ende des Aufschlags noch da war, in Prozent. */
  haltequote: number | null;
  geteilt: number | null;
  neueAbos: number | null;
};

type Eintrag = {
  shortId: string;
  titel: string;
  online: string;
  laengeSek: number;
  videoId: string;
  link: string;
  messungen: Messung[];
};

type Ablage = { _hinweis: string; shorts: Record<string, Eintrag> };

const HINWEIS =
  'Was aus den Videos geworden ist. Wird von skripte/rueckblick.ts nachgetragen, ' +
  'nicht angehängt: eine Messung je Tag und Short. Bewusst getrennt von ' +
  'verlauf.json — der Verlauf wird beim Lauf einmal geschrieben und danach nie ' +
  'wieder angefasst, dieser hier wächst weiter.';

/** ISO-8601-Dauer (`PT1M20S`) in Sekunden. */
const dauerInSekunden = (iso: string): number => {
  const t = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/.exec(iso);
  if (!t) return 0;
  return Number(t[1] ?? 0) * 3600 + Number(t[2] ?? 0) * 60 + Number(t[3] ?? 0);
};

/** Die Video-Kennung aus einer YouTube-Shorts-Adresse. */
const videoIdAus = (link: string): string | null =>
  /youtube\.com\/shorts\/([\w-]{6,})/.exec(link)?.[1] ??
  /youtu\.be\/([\w-]{6,})/.exec(link)?.[1] ??
  null;

/** Alle Zuordnungen shortId → beitragId aus sämtlichen Läufen. */
const zuordnungenLesen = (): { shortId: string; beitragId: string; dienst: string }[] => {
  if (!existsSync('laeufe')) return [];
  const alle: { shortId: string; beitragId: string; dienst: string }[] = [];
  for (const ordner of readdirSync('laeufe')) {
    const datei = join('laeufe', ordner, 'veroeffentlicht.json');
    if (!existsSync(datei)) continue;
    alle.push(...(JSON.parse(readFileSync(datei, 'utf8')) as typeof alle));
  }
  return alle;
};

const prozent = (v: number | null): string => (v === null ? '   —' : `${v.toFixed(0).padStart(3)} %`);

const main = async () => {
  const schluessel = process.env.BUFFER_ACCESS_TOKEN;
  if (!schluessel) throw new Error('BUFFER_ACCESS_TOKEN fehlt in .env');

  /*
   * Die Läufe werden von hinten nach vorn gelesen, damit ein Short, der in
   * zwei Läufen vorkommt, mit seinem **neuesten** Beitrag zählt. Genau das
   * ist am 18.08.2026 passiert: Die Woche wurde nach der Bebilderung noch
   * einmal geplant, die alten Beiträge waren da schon aus Buffer gelöscht.
   */
  const zuordnungen = zuordnungenLesen()
    .filter((z) => z.dienst === 'youtube')
    .reverse();

  const organisationId = await organisationErmitteln(schluessel);
  const beitraege = new Map(
    (await gesendeteBeitraege(schluessel, organisationId)).map((b) => [b.id, b]),
  );

  // shortId → Video-Kennung, ohne Doppelte
  const videos = new Map<string, string>();
  for (const z of zuordnungen) {
    if (videos.has(z.shortId)) continue;
    const link = beitraege.get(z.beitragId)?.link;
    const id = link ? videoIdAus(link) : null;
    if (id) videos.set(z.shortId, id);
  }

  if (videos.size === 0) {
    console.log('Keine gesendeten YouTube-Beiträge gefunden. Nichts zu messen.');
    return;
  }

  console.log(`${videos.size} veröffentlichte Videos gefunden.\n`);

  const token = await zugriffstoken();
  const stamm = await videozahlen([...videos.values()]);
  const stammNach = new Map(stamm.map((v) => [v.videoId, v]));

  // Die Länge kommt aus der Data API, nicht aus der Tonspur: Maßgeblich ist,
  // was draußen liegt, denn daran misst YouTube die Haltekurve.
  const laengen = new Map<string, number>();
  const antwort = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${[...videos.values()].join(',')}&key=${process.env.YOUTUBE_API_KEY}`,
  );
  for (const v of ((await antwort.json()) as { items?: { id: string; contentDetails: { duration: string } }[] })
    .items ?? []) {
    laengen.set(v.id, dauerInSekunden(v.contentDetails.duration));
  }

  const ablage: Ablage = existsSync(ABLAGE)
    ? (JSON.parse(readFileSync(ABLAGE, 'utf8')) as Ablage)
    : { _hinweis: HINWEIS, shorts: {} };
  ablage._hinweis = HINWEIS;

  const heute = new Date().toISOString().slice(0, 10);
  let ohneAnalytics = 0;

  console.log('Short                  Aufrufe  Halte  Durch  Geteilt  Titel');
  console.log('─'.repeat(78));

  for (const [shortId, videoId] of videos) {
    const s = stammNach.get(videoId);
    if (!s) continue;
    const laenge = laengen.get(videoId) ?? 0;

    const v = await verlaufszahlen(token, videoId);
    const kurve = await haltekurve(token, videoId);
    const halte = kurve ? halteQuoteBei(kurve, AUFSCHLAG_SEK, laenge) : null;
    if (!kurve) ohneAnalytics++;

    const messung: Messung = {
      gemessenAm: heute,
      aufrufe: s.aufrufe,
      likes: s.likes,
      kommentare: s.kommentare,
      durchsicht: v && v.aufrufe > 0 ? v.durchsicht : null,
      haltequote: halte === null ? null : halte * 100,
      geteilt: v && v.aufrufe > 0 ? v.geteilt : null,
      neueAbos: v && v.aufrufe > 0 ? v.neueAbos : null,
    };

    console.log(
      `${shortId.padEnd(22)} ${String(s.aufrufe).padStart(7)}  ${prozent(messung.haltequote)}  ` +
        `${prozent(messung.durchsicht)}  ${String(messung.geteilt ?? '—').padStart(7)}  ${s.titel}`,
    );

    const vorher = ablage.shorts[shortId];
    const messungen = (vorher?.messungen ?? []).filter((m) => m.gemessenAm !== heute);
    messungen.push(messung);

    ablage.shorts[shortId] = {
      shortId,
      titel: s.titel,
      online: s.online,
      laengeSek: laenge,
      videoId,
      link: `https://www.youtube.com/shorts/${videoId}`,
      messungen,
    };
  }

  console.log('─'.repeat(78));

  if (ohneAnalytics > 0) {
    console.log(
      `\n${ohneAnalytics} Video(s) noch ohne Analytics-Daten. YouTube verbucht sie mit\n` +
        'ein bis drei Tagen Verzug — das ist kein Fehler, sondern der Normalfall.',
    );
  }

  if (NUR_ZEIGEN) {
    console.log(`\n(--zeigen: ${ABLAGE} nicht geschrieben)`);
    return;
  }

  writeFileSync(ABLAGE, JSON.stringify(ablage, null, 2) + '\n');
  console.log(`\n✓ ${ABLAGE} fortgeschrieben.`);
};

main().catch((f) => {
  console.error('\n✗ ' + (f instanceof Error ? f.message : String(f)));
  process.exit(1);
});
