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
import type { Kanalmessung } from '../src/rueckschau';

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

/*
 * `Kanalmessung` stand bis zum 05.09.2026 hier und steht jetzt in
 * `src/rueckschau.ts`, wo auch das Zod-Schema dazu liegt.
 *
 * **Der Grund ist ein Fehler, den die Doppelung erzeugt hat**, und zwar noch
 * am selben Tag: Das Skript schrieb `jeKanal` in die Ablage, die Rueckschau
 * kannte das Feld nicht — und Zod streift ab, was es nicht kennt. Die Zahlen
 * kamen an, wurden geschrieben und beim Lesen wieder weggeworfen, ohne dass
 * irgendetwas einen Fehler warf.
 *
 * **Die Quelle ist Buffer, nicht die Plattform.** Es kostet keine App-Review
 * bei Meta und kein TikTok-Developer-Konto: Die Zahlen haengen am Beitrag, den
 * Buffer ohnehin verwaltet, und kommen mit demselben Token.
 */
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
  /**
   * Dieselbe Messung je Kanal.
   *
   * **Die Felder darueber bleiben YouTube**, und das ist Absicht: `npm run
   * ausreisser`, `aufschlaege` und `laengen` lesen sie seit Wochen, und eine
   * Zahl, die still ihre Bedeutung wechselt, macht jeden Vergleich mit
   * aelteren Messungen falsch. Was dazukommt, steht daneben.
   *
   * **Der Nordstern steht erst hier vollstaendig.** „Geteilt" und „neue
   * Abonnenten" misst YouTube nur fuer sich; Instagram liefert beides, TikTok
   * das Teilen. Wer den Kanal beurteilen will, summiert ueber `jeKanal`.
   */
  jeKanal?: Record<string, Kanalmessung>;
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

/**
 * Buffers Kennzahlnamen in unsere Felder.
 *
 * **Jeder Dienst nennt dasselbe anders**, und das ist nicht zu vereinheitlichen,
 * sondern zu uebersetzen: TikTok meldet „Video Views", Instagram „Views",
 * YouTube wieder „Video Views". „Reactions" heisst bei uns `likes`.
 *
 * Was hier nicht steht, faellt weg — `Eng. Rate` etwa ist aus `likes` und
 * `aufrufe` gerechnet und waere eine dritte Zahl fuer dasselbe.
 */
const KENNZAHLNAMEN: Record<string, keyof Omit<Kanalmessung, 'stand'>> = {
  'Video Views': 'aufrufe',
  Views: 'aufrufe',
  Reach: 'reichweite',
  Reactions: 'likes',
  Comments: 'kommentare',
  Shares: 'geteilt',
  Saves: 'gespeichert',
  Follows: 'neueAbos',
  'Avg. Watch Time (sec)': 'sehdauerSek',
};

const kanalmessung = (b: { kennzahlen: { name: string; wert: number }[]; kennzahlenStand: string | null }): Kanalmessung => {
  const m: Kanalmessung = { aufrufe: 0, likes: 0, kommentare: 0, stand: b.kennzahlenStand };
  for (const k of b.kennzahlen) {
    const feld = KENNZAHLNAMEN[k.name];
    if (feld) m[feld] = k.wert;
  }
  return m;
};

const main = async () => {
  const schluessel = process.env.BUFFER_ACCESS_TOKEN;
  if (!schluessel) throw new Error('BUFFER_ACCESS_TOKEN fehlt in .env');

  /*
   * Die Läufe werden von hinten nach vorn gelesen, damit ein Short, der in
   * zwei Läufen vorkommt, mit seinem **neuesten** Beitrag zählt. Genau das
   * ist am 18.08.2026 passiert: Die Woche wurde nach der Bebilderung noch
   * einmal geplant, die alten Beiträge waren da schon aus Buffer gelöscht.
   */
  const alleZuordnungen = zuordnungenLesen().reverse();
  const zuordnungen = alleZuordnungen.filter((z) => z.dienst === 'youtube');

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
  const analyticsFehler: string[] = [];

  console.log('Short                  Aufrufe  Halte  Durch  Geteilt  Titel');
  console.log('─'.repeat(78));

  for (const [shortId, videoId] of videos) {
    const s = stammNach.get(videoId);
    if (!s) continue;
    const laenge = laengen.get(videoId) ?? 0;

    /*
     * **Ein Fehlschlag nimmt einen Short mit, nicht den Lauf.** Dieselbe Lehre
     * wie bei der Vertonung am 01.09.2026, hier am 05.09.2026 nachgeholt: Der
     * Dienst lief, das achte Video bekam von der Analytics-API ein „Internal
     * error encountered" — und der ganze Durchgang brach ab, bevor
     * `rueckblick.json` geschrieben war. Die sieben Videos davor waren
     * gemessen und wurden trotzdem nicht gespeichert.
     *
     * Ein Aussetzer der Analytics-API ist kein Sonderfall: Sie verbucht mit
     * ein bis drei Tagen Verzug, und der Code unten rechnet ohnehin damit,
     * dass keine Kurve kommt (`ohneAnalytics`). Der Unterschied zwischen
     * „keine Kurve" und „Fehler beim Holen der Kurve" darf nicht sein, dass
     * das eine eine Fußnote ist und das andere den Tag kostet.
     *
     * Die Stammzahlen oben stehen bewusst außerhalb: Sie kommen aus der Data
     * API in einem Aufruf für alle Videos, und wenn die ausfällt, gibt es
     * nichts zu messen.
     */
    let v: Awaited<ReturnType<typeof verlaufszahlen>> = null;
    let kurve: Awaited<ReturnType<typeof haltekurve>> = null;
    try {
      v = await verlaufszahlen(token, videoId);
      kurve = await haltekurve(token, videoId);
    } catch (fehler) {
      analyticsFehler.push(
        `${shortId}: ${fehler instanceof Error ? fehler.message : String(fehler)}`,
      );
    }
    const halte = kurve ? halteQuoteBei(kurve, AUFSCHLAG_SEK, laenge) : null;
    if (!kurve) ohneAnalytics++;

    /*
     * **Die Kanalzahlen kommen aus Buffer, die YouTube-Zahlen aus YouTube** —
     * und zwar bewusst doppelt fuer YouTube.
     *
     * Buffers „Video Views" und YouTubes eigene Aufrufzahl weichen um Stunden
     * voneinander ab, weil Buffer nur periodisch nachsieht. Die Data API ist
     * hier die genauere Quelle und bleibt es fuer die Felder, an denen die
     * Auswertungen haengen. Buffers Wert steht daneben in `jeKanal`, wo er den
     * Vergleich **zwischen** den Kanaelen traegt — und dort kommt es auf
     * Stunden nicht an.
     */
    const jeKanal: Record<string, Kanalmessung> = {};
    for (const z of alleZuordnungen) {
      if (z.shortId !== shortId) continue;
      if (jeKanal[z.dienst]) continue; // der neueste Beitrag je Dienst gewinnt
      const b = beitraege.get(z.beitragId);
      if (b && b.kennzahlen.length > 0) jeKanal[z.dienst] = kanalmessung(b);
    }

    const messung: Messung = {
      gemessenAm: heute,
      aufrufe: s.aufrufe,
      likes: s.likes,
      kommentare: s.kommentare,
      durchsicht: v && v.aufrufe > 0 ? v.durchsicht : null,
      haltequote: halte === null ? null : halte * 100,
      geteilt: v && v.aufrufe > 0 ? v.geteilt : null,
      neueAbos: v && v.aufrufe > 0 ? v.neueAbos : null,
      ...(Object.keys(jeKanal).length > 0 ? { jeKanal } : {}),
    };

    console.log(
      `${shortId.padEnd(22)} ${String(s.aufrufe).padStart(7)}  ${prozent(messung.haltequote)}  ` +
        `${prozent(messung.durchsicht)}  ${String(messung.geteilt ?? '—').padStart(7)}  ${s.titel}`,
    );
    const kanaele = Object.entries(jeKanal).filter(([d]) => d !== 'youtube');
    if (kanaele.length > 0) {
      console.log(
        '  '.padEnd(22) +
          kanaele
            .map(([d, m]) => `${d} ${m.aufrufe}▶ ${m.geteilt ?? 0}↗ ${m.neueAbos ?? 0}+`)
            .join('   '),
      );
    }

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

  /*
   * Fehler der Analytics-API stehen **nach** der Tabelle und nicht statt ihrer.
   * Ein Befund, den nur ein Absturz kennt, ist keiner — derselbe Grund, aus
   * dem die Plausibilitaetswache am 01.09.2026 in die Freigabe gewandert ist.
   */
  if (analyticsFehler.length > 0) {
    console.log(
      `\n${analyticsFehler.length} Video(s) mit Fehler aus der Analytics-API. Ihre Stammzahlen\n` +
        'sind trotzdem geschrieben, nur Haltequote und Durchsicht fehlen:',
    );
    for (const zeile of analyticsFehler) console.log(`  ${zeile}`);
  }

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
