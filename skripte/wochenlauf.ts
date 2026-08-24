import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { Quelle, Short, Tonspur } from '../src/typen';
import { laufPruefen } from '../src/pruefung';
import { shortVertonen, zeichenverbrauch } from '../src/stimme';
import { freigabeseiteBauen } from '../src/freigabeseite';
import { lautheitAngleichen, videoPruefen } from '../src/medien';
import { durchschnittsdauer, verlaufLesen, verlaufSchreiben } from '../src/verlauf';
import { gesamtdauerBilder } from '../src/zeit';
import { FORMAT } from '../src/marke';
import { WOCHENLAUF } from '../daten/entwuerfe';

const ausfuehren = promisify(execFile);

/**
 * Der Wochenlauf.
 *
 * Standard ist der **Trockenlauf**: alles ausser der Vertonung. Damit laesst
 * sich die gesamte Kette beliebig oft ueben, ohne Zeichenkontingent zu
 * verbrauchen. Erst `--mit-ton` ruft die Sprachsynthese auf und kostet Geld.
 *
 * Aufruf:
 *   npm run lauf                 Trockenlauf, geschaetzte Szenenlaengen
 *   npm run lauf -- --mit-ton    echte Vertonung und Zeitstempel
 *   npm run lauf -- --ton-behalten  rendert neu, vertont nicht noch einmal
 */

const MIT_TON = process.argv.includes('--mit-ton');

/**
 * Neu rendern mit der Vertonung, die schon da ist.
 *
 * Der Anlass am 15.08.2026: Im Lauf desselben Tages lag die Endkarte ueber
 * der Kopfzeile und unter dem Untertitel — ein Fehler der Buehne, nicht des
 * Textes. Die Korrektur betraf ausschliesslich das Bild, und ohne diesen
 * Schalter haette der neue Render **noch einmal 7.390 Zeichen** gekostet,
 * fuer exakt dieselben Saetze in derselben Stimme.
 *
 * Gelesen werden die Shorts aus `laeufe/<id>/props/*.json`. Dort steht der
 * **vertonte** Stand mit Tonspur und Wort-Zeitstempeln, den Schritt 2
 * hinterlassen hat — also alles, was der Renderer braucht.
 *
 * Der Verlauf wird dabei **nicht** fortgeschrieben: Das hat der Lauf mit Ton
 * bereits getan. Ein zweiter Eintrag fuer dieselbe Woche waere doppelt
 * gezaehlt, und der Wochenschnitt der Laenge stimmte nicht mehr.
 */
const TON_BEHALTEN = process.argv.includes('--ton-behalten');

/**
 * Ob die fertigen Videos Sprache tragen — unabhaengig davon, ob sie in
 * diesem Lauf entstanden ist.
 *
 * Der Unterschied zu `MIT_TON` ist nicht kosmetisch: `mitTon: false` in
 * `lauf.json` und in der Freigabe-Uebersicht hiesse, die Videos seien stumm.
 * Sie sind es nicht. Nur der **Verlauf** haengt weiter an `MIT_TON`, denn
 * fortgeschrieben wird eine Woche genau einmal.
 */
const HAT_TON = MIT_TON || TON_BEHALTEN;

/*
 * Beide Schalter zusammen sind ein Widerspruch, und er kostet Geld.
 *
 * Die Verzweigung unten lautet `if (MIT_TON) … else if (TON_BEHALTEN)`. Wer
 * beide setzt, bekommt also stillschweigend die **teure** Variante: Am
 * 18.08.2026 sind dadurch dieselben acht Texte dreimal vertont worden, jedes
 * Mal 2.690 Zeichen. Nichts sah falsch aus — der Lauf war grün, die Videos
 * waren richtig, nur das Kontingent war weg.
 *
 * Kein Vorrang, sondern Abbruch: Welche der beiden Absichten gemeint war,
 * weiss nur der Aufrufende. Ein stiller Vorrang waere wieder ein Raten, nur
 * in die andere Richtung.
 */
if (MIT_TON && TON_BEHALTEN) {
  console.error('--mit-ton und --ton-behalten schließen sich aus.\n');
  console.error('  --mit-ton        vertont neu und verbraucht Kontingent');
  console.error('  --ton-behalten   rendert neu, übernimmt die vorhandene Vertonung');
  console.error('\nFür eine Bildkorrektur an fertigen Shorts: nur --ton-behalten.');
  process.exit(1);
}
const STIMME = process.env.ELEVENLABS_VOICE_ID ?? 'nPczCjzI2devNBz1zQrb';

/**
 * Teillauf: `--nur=ein-stecker` baut einen einzigen Short.
 *
 * Gedacht fuer die Ansicht einer Aenderung mit echter Stimme, ohne acht
 * Vertonungen zu bezahlen — ein Short kostet rund 350 Zeichen statt 2.850.
 *
 * Zwei Dinge gelten deshalb im Teillauf **nicht**:
 *
 * - **Die laufweiten Regeln.** Jedes Format genau einmal, kein Sachgebiet
 *   oefter als zweimal — das alles ist auf die Woche
 *   gemuenzt und wuerde bei einem einzelnen Short zwangslaeufig anschlagen.
 *   Eine Pruefung, die im Teillauf immer rot ist, liest bald niemand mehr.
 * - **Das Fortschreiben des Verlaufs.** Ein Teillauf ist eine Ansicht, keine
 *   Woche. Wer ihn mitschreibt, verbrennt ein Thema, das nie erschienen ist —
 *   derselbe Denkfehler, aus dem der Trockenlauf schon ausgenommen ist.
 */
const NUR = process.argv.find((a) => a.startsWith('--nur='))?.slice('--nur='.length);

/**
 * Die drei Fassungen je Short.
 *
 * Ein Short ist derselbe, egal wo er landet — nur das Folgen-Zeichen an der
 * Signatur wechselt. Ein **falsches** Zeichen waere schlechter als keines: Es
 * deutet auf einen Knopf, den es dort nicht gibt.
 */
const DIENSTE = ['tiktok', 'instagram', 'youtube'] as const;
type Dienst = (typeof DIENSTE)[number];

/**
 * Welche Fassungen dieser Lauf rendert.
 *
 * Der volle Lauf baut alle drei; **der Teillauf nur eine.** Ein Teillauf ist
 * eine Ansicht und keine Woche — dieselbe Begruendung, aus der er auch den
 * Verlauf nicht fortschreibt. Beim Iterieren am Bild verdreifachte sich sonst
 * jede Runde, ohne dass man dabei mehr saehe.
 *
 * `--dienst=youtube` waehlt, welche Fassung der Teillauf zeigt.
 */
const DIENST_WAHL = process.argv.find((a) => a.startsWith('--dienst='))?.slice('--dienst='.length);
if (DIENST_WAHL !== undefined && !DIENSTE.includes(DIENST_WAHL as Dienst)) {
  console.error(`\n--dienst=${DIENST_WAHL} kennt niemand. Möglich: ${DIENSTE.join(', ')}\n`);
  process.exit(1);
}
const FASSUNGEN: readonly Dienst[] = NUR
  ? [(DIENST_WAHL as Dienst | undefined) ?? 'tiktok']
  : DIENSTE;

/**
 * Die sieben Shorts dieses Laufs — einer je Format und Wochentag.
 *
 * Seit dem 16.08.2026 sieben statt fuenf: ein Format je Wochentag, jedes
 * mit einem eigenen Fakt und einer woertlich geprueften Quelle.
 *
 * Die Reihenfolge in `WOCHENLAUF` ist nur noch Lesereihenfolge — welchen Tag
 * ein Short bekommt, steht am Format (`FORMATE[...].tag`), und
 * `zeitplanBauen` in `src/buffer.ts` liest es dort. Vorher haette das
 * Vertauschen zweier Eintraege stillschweigend zwei Sendetermine verschoben.
 *
 * Die Liste steht in `daten/entwuerfe/index.ts` und nicht hier, damit die
 * Schemapruefung dieselbe sieht.
 */
const ENTWUERFE: Short[] = NUR ? WOCHENLAUF.filter((s) => s.id === NUR) : WOCHENLAUF;

const laufId = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Wirft Remotions Bundler-Cache weg, wenn sich der Modulbestand geaendert hat.
 *
 * Am 18.08.2026 hing der Render **eine halbe Stunde bei „Bundling code 6 %"**
 * — kein Chrome, 0 % CPU, keine Fehlermeldung, kein Abbruch. Am Tag zuvor sah
 * dasselbe Bild nach einem Browser-Timeout aus und wurde als „intermittierend"
 * abgelegt; in Wahrheit war es zweimal dieselbe Ursache.
 *
 * Sie ist erklaerbar und reproduzierbar: Webpack legt seinen Cache unter
 * `node_modules/.cache/webpack` ab und invalidiert ihn ueber Zeitstempel der
 * Dateien, die er kennt. **Geloeschte** Module bemerkt er dabei nicht — er
 * versucht weiter, sie aufzuloesen, und bleibt stehen. Genau das war passiert:
 * Die acht Entwuerfe der Vorwoche waren weg, der Cache von 00:59 kannte sie
 * noch.
 *
 * Gegenprobe: `esbuild` bundelte denselben Entry-Point in 1,5 Sekunden
 * fehlerfrei, der Speicher war zu 59 % frei. Nach dem Entfernen des Caches
 * lief Remotion in 43 Sekunden durch.
 *
 * Der Wecker dafuer ist die **mtime des Verzeichnisses** `daten/entwuerfe`.
 * Sie aendert sich, wenn eine Datei darin entsteht oder verschwindet — also
 * genau in dem Fall, den Webpack uebersieht. Aenderungen *innerhalb* einer
 * Datei beruehren sie nicht; die bekommt Webpack von allein mit.
 */
const bundlerCachePruefen = async (): Promise<void> => {
  const cache = path.join('node_modules', '.cache', 'webpack');
  const [cacheStat, entwuerfeStat] = await Promise.all([
    fs.stat(cache).catch(() => null),
    fs.stat(path.join('daten', 'entwuerfe')).catch(() => null),
  ]);
  if (!cacheStat || !entwuerfeStat) return;

  if (entwuerfeStat.mtimeMs > cacheStat.mtimeMs) {
    await fs.rm(cache, { recursive: true, force: true });
    console.log('   Bundler-Cache verworfen (Entwürfe kamen dazu oder fielen weg)');
  }
};

const main = async () => {
  const id = laufId();
  const wurzel = path.join('laeufe', id);
  const videoOrdner = path.join(wurzel, 'videos');
  await fs.mkdir(videoOrdner, { recursive: true });

  console.log(`Ganz akkurat · ${NUR ? `Teillauf ${NUR}` : 'Wochenlauf'} ${id}`);
  console.log(
    MIT_TON
      ? 'Modus: mit Vertonung'
      : TON_BEHALTEN
        ? 'Modus: neu rendern, Vertonung bleibt (kein Verbrauch)'
        : 'Modus: Trockenlauf (keine Vertonung, kein Verbrauch)',
  );
  if (NUR) {
    if (ENTWUERFE.length === 0) {
      console.log(`\nKein Entwurf mit der Kennung „${NUR}". Bekannt sind:`);
      for (const s of WOCHENLAUF) console.log(`  ${s.id}  ${s.format}`);
      process.exit(1);
    }
    console.log('Teillauf: laufweite Regeln aus, Verlauf wird nicht fortgeschrieben');
  }
  console.log();

  /* ── 1  Entwuerfe validieren ─────────────────────────────────────── */

  console.log(`1  Entwürfe prüfen (${ENTWUERFE.length})`);
  const shorts: Short[] = [];
  for (const entwurf of ENTWUERFE) {
    const ergebnis = Short.safeParse(entwurf);
    if (!ergebnis.success) {
      console.log(`   ✕ ${entwurf.id}: ${ergebnis.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`);
      process.exitCode = 1;
      continue;
    }
    shorts.push(ergebnis.data);
  }
  if (shorts.length !== ENTWUERFE.length) {
    console.log('\nAbbruch: Entwürfe entsprechen nicht dem Schema.');
    return;
  }
  console.log(`   ${shorts.length} Entwürfe entsprechen dem Schema`);
  console.log(`   Zeichenbedarf bei Vertonung: ${shorts.reduce((n, s) => n + zeichenverbrauch(s), 0)}\n`);

  /* ── 2  Vertonen (nur mit --mit-ton) ─────────────────────────────── */

  let fertige = shorts;
  if (MIT_TON) {
    const schluessel = process.env.ELEVENLABS_API_KEY;
    if (!schluessel) throw new Error('ELEVENLABS_API_KEY fehlt in .env');

    console.log('2  Vertonen');
    await fs.mkdir(path.join('public', 'ton', id), { recursive: true });
    fertige = [];
    for (const short of shorts) {
      const datei = `ton/${id}/${short.id}.mp3`;
      const { short: vertont, ton } = await shortVertonen(short, STIMME, schluessel, datei);

      // Erst roh sichern, dann auf Plattformlautheit angleichen. Die rohe
      // Datei bleibt liegen, damit sich das Ergebnis nachvollziehen laesst.
      const rohPfad = path.join('public', `ton/${id}/${short.id}.roh.mp3`);
      await fs.writeFile(rohPfad, ton);
      const pegel = await lautheitAngleichen(rohPfad, path.join('public', datei));

      console.log(
        `   ${short.id}  ${vertont.tonspur!.dauerSek.toFixed(1)}s  ` +
          `Lautheit ${pegel.vorher.toFixed(1)} → ${pegel.nachher} LUFS`,
      );
      fertige.push(vertont);
    }
    console.log('');
  } else if (TON_BEHALTEN) {
    /*
     * Der Ton darf aus einem **frueheren** Lauf kommen, nicht nur aus dem von
     * heute.
     *
     * Die erste Fassung suchte ausschliesslich in `laeufe/<heute>/props/` und
     * brach sonst ab. Das ging gut, bis in der Nacht zum 18.08.2026 mitten in
     * der Arbeit der Tag wechselte: Die Tonspuren lagen unter dem 17., der
     * Lauf suchte unter dem 18., und die Meldung lautete „setzt einen Lauf mit
     * Ton am selben Tag voraus" — richtig beschrieben und trotzdem die falsche
     * Grenze. Der Schalter will vorhandenen Ton wiederverwenden; das Datum ist
     * dabei keine Eigenschaft des Tons, sondern des Ordners.
     *
     * Gesucht wird deshalb der **juengste** Lauf, der eine Tonspur zu diesem
     * Short hat. Gefaehrlich ist das nicht: Unmittelbar danach wird Szene fuer
     * Szene verglichen, ob der Sprechtext noch derselbe ist, und bei der
     * kleinsten Abweichung bricht der Lauf ab. Ein alter Ton unter neuem Text
     * kommt hier nicht durch.
     */
    const laufOrdner = (await fs.readdir('laeufe').catch(() => [] as string[]))
      .filter((n) => /^\d{4}-\d{2}-\d{2}$/.test(n))
      .sort()
      .reverse();

    /*
     * Gesucht wird der juengste Lauf mit einer **brauchbaren Tonspur** — nicht
     * der juengste mit einer Datei.
     *
     * Der Unterschied hat am 23.08.2026 den Schalter blockiert: Der Lauf vom
     * 20.08. war ein Trockenlauf. Seine `props/` enthalten Szenen und Texte,
     * aber keine Tonspur. Die erste Fassung nahm ihn trotzdem, weil die Datei
     * da war, und brach dann mit „keine brauchbare Tonspur" ab — waehrend im
     * Ordner vom 18.08. der vertonte Stand lag und nie geprueft wurde.
     *
     * Der Kommentar darueber beschrieb schon das richtige Verhalten: „der
     * juengste Lauf, **der eine Tonspur zu diesem Short hat**". Der Code tat es
     * nicht. Ein Trockenlauf hinterlaesst dieselben Dateinamen wie ein
     * vertonter; unterscheiden lassen sie sich nur am Inhalt.
     */
    const propsSuchen = async (shortId: string): Promise<{ pfad: string; roh: string } | null> => {
      for (const ordner of laufOrdner) {
        const pfad = path.join('laeufe', ordner, 'props', `${shortId}.json`);
        const roh = await fs.readFile(pfad, 'utf8').catch(() => null);
        if (!roh) continue;
        const alt = (JSON.parse(roh) as { daten?: { tonspur?: unknown } }).daten;
        if (!Tonspur.safeParse(alt?.tonspur).success) continue;
        return { pfad, roh };
      }
      return null;
    };

    console.log('2  Vertonung aus dem vorhandenen Lauf übernommen');
    fertige = [];
    for (const short of shorts) {
      const gefunden = await propsSuchen(short.id);
      if (!gefunden) {
        throw new Error(
          `--ton-behalten: Zu ${short.id} gibt es in keinem Lauf unter laeufe/ eine ` +
            `Vertonung. Einmal mit --mit-ton laufen lassen.`,
        );
      }
      const { pfad: propsDatei, roh } = gefunden;
      if (!propsDatei.includes(id)) {
        console.log(`   ${short.id}  Ton aus ${propsDatei.split(path.sep)[1]}`);
      }
      /*
       * Aus den alten Renderdaten wird **nur die Tonspur** gelesen, und zwar
       * ohne den ganzen Short zu validieren.
       *
       * Vorher stand hier `Short.parse(...)` auf der kompletten Datei, und das
       * war ein Konstruktionsfehler: Renderdaten sind eine Momentaufnahme
       * eines aelteren Datenvertrags. Am 18.08.2026 kam dadurch ein
       * ZodError — in den Props stand `symbol: 'kasse'`, ein Wert, den das
       * Schema eine Minute zuvor verloren hatte. Der Schalter blockierte sich
       * damit **selbst**: Wer das Schema aendert, muss neu rendern, und genau
       * das liess er nicht mehr zu.
       *
       * Die Tonspur ist von solchen Aenderungen nie betroffen. Sie wird
       * deshalb einzeln geprueft, und alles andere kommt ohnehin aus dem
       * aktuellen Entwurf.
       */
      const altDaten = (JSON.parse(roh) as {
        daten?: { tonspur?: unknown; szenen?: { sprechtext?: string; untertitel?: unknown }[] };
      }).daten;
      const tonspur = Tonspur.safeParse(altDaten?.tonspur);
      if (!tonspur.success) {
        throw new Error(
          `--ton-behalten: ${short.id} hat in ${propsDatei} keine brauchbare Tonspur.`,
        );
      }
      /*
       * Die alten Szenen werden **roh** gelesen, nicht validiert. Gebraucht
       * werden aus ihnen nur zwei Dinge: die Anzahl und der Sprechtext, beides
       * fuer die Sicherheitspruefung gleich darunter. Beides ist von
       * Schemaaenderungen nie betroffen — ein weggefallener Symbolwert macht
       * einen Sprechtext nicht ungueltig.
       */
      const alt = { tonspur: tonspur.data, szenen: altDaten?.szenen ?? [] };

      /*
       * **Nur die Tonspur wird uebernommen, alles andere kommt aus dem
       * aktuellen Entwurf.**
       *
       * Die erste Fassung dieses Schalters nahm den Short komplett aus den
       * Props — und damit auch jeden Text von damals. Am 15.08.2026 fiel das
       * teuer auf: Die Beschreibungen waren in den Entwuerfen geleert, der
       * Lauf uebernahm trotzdem die alten, und im veroeffentlichten Beitrag
       * stand die Beschreibung samt einer zweiten, veralteten Quellenliste.
       * Sichtbar wurde es erst auf Instagram.
       *
       * Der Schalter heisst `--ton-behalten` und nicht `--alles-behalten`.
       * Uebernommen wird deshalb genau das, was er verspricht: die Tonspur
       * und die daran haengenden Wort-Zeitstempel, weil beide Geld gekostet
       * haben. Titel, Texte, Szenen und Quellen kommen aus dem Entwurf —
       * sonst waere jede Textkorrektur nur mit neuer Vertonung zu bezahlen.
       */
      const szenenMitZeit = short.szenen.map((szene, i) => {
        const frueher = alt.szenen[i] as { untertitel?: unknown } | undefined;
        return frueher?.untertitel ? { ...szene, untertitel: frueher.untertitel } : szene;
      });

      if (short.szenen.length !== alt.szenen.length) {
        throw new Error(
          `--ton-behalten: ${short.id} hat jetzt ${short.szenen.length} Szenen, ` +
            `die vorhandene Vertonung ${alt.szenen.length}. Wer Szenen hinzufügt oder ` +
            `entfernt, ändert den Sprechtext — das braucht einen Lauf mit --mit-ton.`,
        );
      }

      /*
       * Der Sprechtext muss derselbe sein. Sonst gehoeren die uebernommenen
       * Wort-Zeitstempel zu anderen Worten — die Untertitel liefen dann
       * sichtbar am Ton vorbei, und zwar ohne dass irgendeine Pruefung
       * anschlaegt. Texte am Bildschirm darf dieser Schalter aendern, den
       * gesprochenen Satz nicht.
       */
      const geaendert = short.szenen
        .map((s, i) => (s.sprechtext !== alt.szenen[i]?.sprechtext ? i + 1 : 0))
        .filter(Boolean);
      if (geaendert.length > 0) {
        throw new Error(
          `--ton-behalten: In ${short.id} weicht der Sprechtext von Szene ` +
            `${geaendert.join(', ')} von der vorhandenen Vertonung ab. Die Zeitstempel ` +
            `gehörten dann zu anderen Worten — das braucht einen Lauf mit --mit-ton.`,
        );
      }

      const vertont = Short.parse({ ...short, szenen: szenenMitZeit, tonspur: alt.tonspur });
      console.log(`   ${short.id}  ${alt.tonspur.dauerSek.toFixed(1)}s  Ton unverändert, Texte aktuell`);
      fertige.push(vertont);
    }
    console.log('');
  } else {
    console.log('2  Vertonen übersprungen – Szenenlängen werden geschätzt\n');
  }

  /* ── 3  Inhaltliche Pruefung ─────────────────────────────────────── */

  console.log('3  Qualität prüfen');
  const roh = JSON.parse(await fs.readFile('daten/quellen.json', 'utf8')) as { quellen: unknown[] };
  const quellen = roh.quellen.map((q) => Quelle.parse(q));
  /*
   * Der eigene Lauf zaehlt nicht als Vergangenheit.
   *
   * `verlaufSchreiben` ersetzt einen Eintrag mit derselben Kennung, ein
   * zweiter Lauf am selben Tag ueberschreibt also sauber. Beim **Pruefen**
   * lag der erste Durchgang aber noch im Verlauf — und meldete alle sieben
   * Themen als Wiederholung des Laufs, der gerade ersetzt wird. Jeder
   * Korrekturlauf am selben Tag haette damit sieben falsche Hinweise erzeugt,
   * und Hinweise, die regelmaessig falsch sind, liest bald niemand mehr.
   */
  const verlauf = (await verlaufLesen()).filter((eintrag) => eintrag.lauf !== id);
  const ergebnis = laufPruefen(fertige, quellen, verlauf, Boolean(NUR));

  for (const b of ergebnis.befunde) {
    console.log(`   ${b.stufe === 'fehler' ? '✕' : '·'} ${b.shortId}  [${b.regel}] ${b.text}`);
  }
  console.log(`   ${ergebnis.fehler.length} Fehler, ${ergebnis.hinweise.length} Hinweise`);

  /*
   * Laengentendenz statt Laengenurteil.
   *
   * Das Zielfenster reicht bis 95 Sekunden, aber die 95 sind Spielraum und
   * nicht das Ziel — die Absicht ist, die Laenge ueber die Wochen wieder zu
   * druecken, durch Straffung und nicht durch Weglassen von Substanz.
   *
   * Das laesst sich nicht als Regel fassen: Eine Grenze bei 88 waere nur die
   * alte Grenze unter anderem Namen, und ein Hinweis „koennte kuerzer" waere
   * jede Woche derselbe und damit nach drei Wochen unsichtbar. Was bleibt,
   * ist die Zahl neben der Zahl der Vorwoche. Erkennen muss man es selbst —
   * aber ohne den Messwert kann man es gar nicht.
   */
  if (HAT_TON) {
    const jetzt = durchschnittsdauer({ lauf: id, shorts: fertige.map((s) => ({
      format: s.format,
      sachgebiet: s.sachgebiet,
      themaId: s.themaId,
      ...(s.tonspur ? { dauerSek: s.tonspur.dauerSek } : {}),
    })) });
    const vorher = durchschnittsdauer(verlauf[verlauf.length - 1]);
    if (jetzt !== null) {
      const vergleich =
        vorher === null
          ? 'keine Vergleichswoche'
          : `${vorher.toFixed(1)}s zuvor, ${jetzt > vorher ? '+' : ''}${(jetzt - vorher).toFixed(1)}s`;
      console.log(`   Länge im Schnitt: ${jetzt.toFixed(1)}s  (${vergleich})`);
    }
  }
  console.log();

  /* ── 4  Rendern ──────────────────────────────────────────────────── */

  console.log('4  Rendern');
  const zuRendern = ergebnis.freigabefaehig;
  if (zuRendern.length < fertige.length) {
    console.log(`   ${fertige.length - zuRendern.length} Short(s) wegen Fehlern übersprungen`);
  }

  await bundlerCachePruefen();

  const propsOrdner = path.join(wurzel, 'props');
  await fs.mkdir(propsOrdner, { recursive: true });

  for (const short of zuRendern) {
    /*
     * Die Props-Datei **ohne** Dienst-Suffix bleibt bestehen, auch wenn
     * gerendert wird aus den Fassungsdateien daneben. `--ton-behalten` sucht
     * in `laeufe/*\/props/<id>.json` nach einer brauchbaren Tonspur; faende
     * es dort nichts mehr, waere jeder spaetere Lauf ohne Ton wieder ein Lauf
     * mit Verbrauch.
     */
    const propsDatei = path.join(propsOrdner, `${short.id}.json`);
    await fs.writeFile(propsDatei, JSON.stringify({ daten: short }));

    /*
     * `--timeout` steht hier wegen des 17.08.2026.
     *
     * Drei Laeufe hintereinander brachen ab, und zwar mit drei verschiedenen
     * Meldungen: „Timed out after 25000 ms while trying to connect to the
     * browser", danach zweimal ein SIGKILL auf `ffprobe` bzw. `ffmpeg` aus
     * Remotions eigenem Compositor. Das sah nach drei Fehlern aus und war
     * einer: Laeuft der Browserstart in die Voreinstellung von 25 Sekunden,
     * raeumt Remotion auf und schiesst dabei seine Kindprozesse ab. Der
     * SIGKILL ist die Folge, nicht die Ursache.
     *
     * Nachgemessen war die Maschine dabei unauffaellig — 61 % Speicher frei,
     * Last 1,5, kein Swap —, und `ffprobe` las von Hand genau die Datei
     * einwandfrei, an der es gescheitert war. Der Direktlauf mit erhoehter
     * Wartezeit lief durch.
     *
     * 25 Sekunden sind fuer einen kalten Chrome-Start knapp bemessen, sobald
     * nebenher irgendetwas laeuft. Zwei Minuten kosten nichts: Der Wert ist
     * eine Obergrenze, kein Warten.
     */
    const beginn = Date.now();
    /*
     * `--crf=16` statt des Standards 18.
     *
     * Am 23.08.2026 kam der Hinweis, die Figur sei „sehr verpixelt". Gemessen
     * an zwei vergroesserten Ausschnitten stimmt das fuer unser Rendering
     * nicht: Das Standbild ist bei doppelter Vergroesserung glatt, das Bild aus
     * dem fertigen MP4 nur leicht weicher. Der beanstandete Screenshot kam
     * ueber WhatsApp, und WhatsApp rekomprimiert Videos hart.
     *
     * Trotzdem steht der Regler jetzt hoeher, weil unsere Bilder der
     * ungeschickteste Fall fuer H.264 sind: grosse einfarbige Flaechen mit
     * harten Kanten, dazu gesaettigtes Blau neben Weiss. Mit `yuvj420p` liegt
     * die Farbe nur in einem Viertel der Aufloesung vor, und genau an solchen
     * Kanten entstehen die Farbsaeume. Zwei CRF-Stufen kosten ein paar
     * Megabyte und sonst nichts.
     */
    /*
     * Eine Fassung je Dienst. Sie unterscheiden sich in genau einem Zeichen
     * an der Signatur — und ohne den Unterschied waere die Prop `dienst` in
     * `video/Short.tsx` folgenlos, weil `veroeffentlichen.ts` bis zum
     * 24.08.2026 eine Datei an alle drei Kanaele haengte.
     */
    let mb = 0;
    let technisch: Awaited<ReturnType<typeof videoPruefen>> = [];

    for (const dienst of FASSUNGEN) {
      const fassungProps = path.join(propsOrdner, `${short.id}.${dienst}.json`);
      const ziel = path.join(videoOrdner, `${short.id}.${dienst}.mp4`);
      await fs.writeFile(fassungProps, JSON.stringify({ daten: short, dienst }));

      await ausfuehren('npx', [
        'remotion', 'render', 'video/index.ts', 'Short', ziel,
        `--props=${fassungProps}`, '--log=error', '--timeout=120000', '--crf=16',
      ], { maxBuffer: 32 * 1024 * 1024 });

      /*
       * Gemessen und geprueft wird nur die **erste** Fassung. Die Dateien
       * unterscheiden sich in drei Sekunden Bildinhalt, nicht in Aufloesung,
       * Codec oder Tonspur — dieselben Befunde dreimal zu melden macht die
       * Uebersicht unlesbar und faende nichts Neues.
       */
      if (dienst === FASSUNGEN[0]) {
        mb = (await fs.stat(ziel)).size / 1_048_576;
        technisch = await videoPruefen(ziel);
        for (const b of technisch) {
          ergebnis.befunde.push({ stufe: b.stufe, shortId: short.id, regel: 'datei', text: b.text });
        }
      }
    }

    const anmerkung = technisch.length > 0 ? `  ← ${technisch.map((b) => b.text).join(' ')}` : '';
    // Videolaenge zuerst, Renderzeit danach und beschriftet: Ohne Beschriftung
    // liest sich die Renderzeit wie eine Laenge — und ein Wert, der aussieht
    // wie die Zahl, um die es geht, wird auch dafuer gehalten.
    const laengeSek = gesamtdauerBilder(short) / FORMAT.bilderProSekunde;
    const renderSek = (Date.now() - beginn) / 1000;
    const fassungen = FASSUNGEN.length > 1 ? `  ${FASSUNGEN.length} Fassungen` : '';
    console.log(
      `   ${short.id}  ${laengeSek.toFixed(1)}s Video  ${mb.toFixed(1)} MB${fassungen}  ` +
        `(Render ${renderSek.toFixed(0)}s)${anmerkung}`,
    );
  }
  console.log('');

  /* ── 5  Freigabeseite ────────────────────────────────────────────── */

  console.log('5  Freigabe-Übersicht');
  const seite = freigabeseiteBauen({
    laufId: id,
    shorts: zuRendern,
    quellen,
    befunde: ergebnis.befunde,
    /*
     * Die Freigabeseite zeigt **eine** Fassung. Drei Videoplayer je Short
     * machten die Seite unuebersichtlich und zeigten nichts, was man nicht
     * weiss — der Unterschied ist ein Zeichen an der Signatur.
     */
    videopfad: (s) => `videos/${s.id}.${FASSUNGEN[0]}.mp4`,
    mitTon: HAT_TON,
  });
  const seitenPfad = path.join(wurzel, 'freigabe.html');
  await fs.writeFile(seitenPfad, seite);

  await fs.writeFile(
    path.join(wurzel, 'lauf.json'),
    JSON.stringify({ id, erstelltAm: new Date().toISOString(), mitTon: HAT_TON, shorts: zuRendern }, null, 2),
  );

  /* ── 6  Verlauf fortschreiben ────────────────────────────────────── */

  /*
   * Zwei Bedingungen, und beide sind noetig.
   *
   * Erst hier, nicht frueher: Was an der Pruefung gescheitert ist, wurde nie
   * gerendert und gehoert nicht ins Gedaechtnis.
   *
   * Und nur mit Ton: Ein Trockenlauf ist eine Uebung. Wer ihn mitschreibt,
   * verbrennt ein Thema, das nie erschienen ist — beim naechsten Entwurf
   * gaelte es als schon gelaufen. Veroeffentlicht werden kann ohnehin nur ein
   * vertonter Lauf, das prueft `veroeffentlichen.ts`.
   */
  if (MIT_TON && !NUR && zuRendern.length > 0) {
    await verlaufSchreiben(id, zuRendern);
    console.log(`6  Verlauf fortgeschrieben (${zuRendern.length} Shorts)\n`);
  } else if (zuRendern.length > 0) {
    /*
     * Auch ein vertonter Teillauf bleibt draussen: Er ist eine Ansicht, keine
     * Woche. Wuerde er mitschreiben, gaelte sein Thema als gelaufen und
     * verschwaende einen Sendeplatz — derselbe Denkfehler wie beim
     * Trockenlauf, nur teurer, weil hier schon Zeichen verbraucht sind.
     */
    console.log(
      `6  Verlauf unberührt – ${
        NUR
          ? 'ein Teillauf ist eine Ansicht'
          : TON_BEHALTEN
            ? 'diese Woche steht schon im Verlauf'
            : 'Trockenläufe zählen nicht als gelaufen'
      }\n`,
    );
  }

  console.log(`   ${seitenPfad}\n`);
  console.log(`Fertig. Öffnen mit:  open ${seitenPfad}`);
};

main().catch((fehler) => {
  console.error('\nFehlgeschlagen:', fehler.message);
  process.exit(1);
});
