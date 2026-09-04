import fs from 'node:fs/promises';
import { Quelle } from '../src/typen';
import { ALLE_ENTWUERFE } from '../daten/entwuerfe/index';

/**
 * Belegpruefung: Steht das Zitat wirklich auf der Seite?
 *
 * Das ist die Stelle, an der die Vertrauensfrage haengt. Die Regel „neue
 * Quellen erst nach tatsaechlichem Abruf" stand lange nur in CLAUDE.md — eine
 * Absichtserklaerung, die niemand pruefen konnte. Wer ein Zitat erfindet,
 * faellt jetzt hier auf.
 *
 * **Bewusst ohne Sprachmodell.** Die Pruefung holt den Seitentext und sucht
 * die Zeichenkette, mehr nicht. Ein Modell zu fragen hiesse, die Behauptung
 * eines Modells von einem Modell pruefen zu lassen — beide koennen sich
 * irren, und die Pruefung waere nur eine zweite Meinung. Eine
 * Zeichenkettensuche hat keine Meinung.
 *
 *   npm run quellen-pruefen
 *   npm run quellen-pruefen -- --nur=lba-lithiumbatterien
 */

const NUR = process.argv.find((a) => a.startsWith('--nur='))?.slice(6);

/**
 * Normalisiert Seitentext und Zitat auf eine vergleichbare Form.
 *
 * Ohne das scheitert die Suche an Kleinigkeiten, die inhaltlich nichts
 * bedeuten: typografische gegen gerade Anfuehrungszeichen, Gedankenstriche,
 * geschuetzte Leerzeichen, Zeilenumbrueche mitten im Satz. Genau daran riss
 * beim Test am 13.08.2026 das Dell-Zitat.
 */
const normalisieren = (text: string): string =>
  text
    .replace(/[‘’‚‛′]/g, "'")
    .replace(/[“”„‟″]/g, '"')
    .replace(/[‐-―−]/g, '-')
    .replace(/[    ]/g, ' ')
    .replace(/\s+/g, ' ')
    /*
     * Leerzeichen vor Satzzeichen entfernen. Kein Aufweichen der Pruefung,
     * sondern die Korrektur eines eigenen Artefakts: Wer aus „real
     * ceiling</b>, not" die Auszeichnung durch ein Leerzeichen ersetzt,
     * erzeugt „ceiling , not". Ein Leerzeichen vor einem Komma ist nie
     * bedeutungstragend — genau daran scheiterte das Dell-Zitat.
     *
     * **Die schliessende Klammer kam am 02.09.2026 dazu**, aus demselben
     * Grund und an derselben Sorte Naht: Das BSI schreibt „(Datum, Ort der
     * Aufnahme etc.)", und weil dort ein Tag endet, steht nach dem Strippen
     * „etc. )". Die Pruefung meldete ein Zitat als „nicht auf der Seite", das
     * woertlich dort steht.
     */
    .replace(/\s+([,.;:!?)\]])/g, '$1')
    /*
     * Und dasselbe hinter der oeffnenden Klammer: „( Datum" entsteht auf
     * demselben Weg.
     */
    .replace(/([(\[])\s+/g, '$1')
    .toLowerCase()
    .trim();

/**
 * EUR-Lex ueber die Cellar-Schnittstelle statt ueber die Weboberflaeche.
 *
 * Am 17.08.2026 hat `eur-lex.europa.eu` angefangen, **jeden** automatischen
 * Abruf mit HTTP 202 und leerem Rumpf zu beantworten — die Weboberflaeche,
 * die PDF-Variante und die ELI-Adresse gleichermassen. Die EU-Quellen dieses
 * Projekts waeren damit dauerhaft `manuell` gewesen, also ungeprueft.
 *
 * Cellar ist das Dokumentenarchiv **hinter** EUR-Lex und liefert denselben
 * amtlichen Text ohne Botabwehr. Zwei Bedingungen, beide gemessen:
 *
 * - `Accept: application/xhtml+xml` — mit `text/html` antwortet es 404, ohne
 *   Accept-Header 202 mit der Meldung „Invalid content type CONTENT_STREAM
 *   for WORK without language".
 * - `Accept-Language: deu` — dreibuchstabig, **nicht** `de`. Die Sprache ist
 *   Pflicht, weil ein Rechtsakt in 24 Fassungen vorliegt.
 *
 * Die Kennung steht in der EUR-Lex-Adresse und wird hier herausgezogen, damit
 * in `quellen.json` weiter die lesbare, zitierfaehige URL steht. Wer die
 * Quelle nachschlaegt, soll bei EUR-Lex landen und nicht bei einer
 * Archivkennung.
 *
 * ## Zwei Adressformen, und die zweite fiel ein Jahr lang durch
 *
 * EUR-Lex adressiert denselben Rechtsakt auf zwei Arten: ueber die
 * **CELEX-Nummer** (`?uri=CELEX:32024L1799`) und ueber die
 * **Amtsblatt-Kennung** (`?uri=OJ:L_202401799`). Beide sind gueltig, beide
 * werden von der Weboberflaeche vergeben — welche man kopiert, haengt daran,
 * ueber welche Seite man hereinkommt.
 *
 * Bis zum 31.08.2026 erkannte die Umleitung nur die erste. Die zweite lief
 * ungebremst in die Botabwehr, und `quellen-pruefen` meldete „Seite lieferte
 * nur 0 Zeichen" — was wie ein Problem der Quelle aussah und keines war.
 * Sieben EU-Quellen gingen durch, die achte nicht, und der Unterschied lag
 * allein in der Form der Adresse.
 *
 * **Eine Wache, die an einer Schreibweise haengt, prueft die Schreibweise und
 * nicht die Sache.** Cellar kennt beide Wege und liefert byte-genau dieselbe
 * Datei — nachgemessen, nicht angenommen: 199.351 Bytes ueber beide Pfade,
 * `cmp` meldet keinen Unterschied.
 *
 * Die OJ-Kennung wandert dabei **ohne** ihr `OJ:`-Praefix in den Pfad
 * (`resource/oj/L_202401799`); mit Praefix antwortet Cellar 404.
 *
 * ## Und eine dritte Form: die konsolidierte Fassung
 *
 * Ein geaenderter Rechtsakt hat neben seiner Urfassung (`32013D0010`) eine
 * **konsolidierte** — dieselbe Nummer mit einer fuehrenden Null und dem
 * Stichtag dahinter: `02013D0010-20210104`. Sie ist die Fassung, die heute
 * gilt, und deshalb die, die ein Beleg nennen sollte.
 *
 * Bis zum 03.09.2026 schnitt das Regex den Stichtag ab, und
 * `resource/celex/02013D0010` antwortet 404 — eine konsolidierte Fassung ohne
 * ihren Stichtag ist nicht adressierbar. **Zum zweiten Mal derselbe Befund:**
 * die Wache haengt an einer Schreibweise, und die Sache dahinter ist
 * dieselbe. Beim ersten Mal war es die Amtsblatt-Kennung.
 *
 * Der Ausweg beim ersten Mal war ein zweites Regex daneben, weil die Form
 * wirklich eine andere ist. Hier genuegt ein optionaler Anhang: Es ist
 * dieselbe Nummer, nur laenger.
 */
const CELEX = /eur-lex\.europa\.eu\/.*CELEX(?::|%3A)([0-9][0-9A-Z]+(?:-\d{8})?)/i;
const AMTSBLATT = /eur-lex\.europa\.eu\/.*uri=OJ(?::|%3A)([A-Z]_\d+)/i;

/** Der Kopf, den Cellar braucht — beide Zeilen sind gemessen, siehe oben. */
const CELLAR_KOPF = { Accept: 'application/xhtml+xml', 'Accept-Language': 'deu' };

const abrufziel = (url: string): { url: string; kopf: Record<string, string> } => {
  const celex = CELEX.exec(url);
  if (celex?.[1]) {
    return {
      url: `http://publications.europa.eu/resource/celex/${celex[1]}`,
      kopf: CELLAR_KOPF,
    };
  }

  const amtsblatt = AMTSBLATT.exec(url);
  if (amtsblatt?.[1]) {
    return {
      url: `http://publications.europa.eu/resource/oj/${amtsblatt[1]}`,
      kopf: CELLAR_KOPF,
    };
  }

  /*
   * **Die PTB antwortet ausgerechnet auf die Chrome-Kennung mit HTTP 500.**
   *
   * Am 02.09.2026 gemessen: Ohne `User-Agent` liefert
   * `www.ptb.de` eine 200, mit `curl/8.4.0` eine 200, mit `Mozilla/5.0` eine
   * 200 — nur mit der vollstaendigen Chrome-Zeichenkette oben eine 500. Es ist
   * also keine Sperre, sondern etwas, das an dieser einen Kennung zerbricht.
   *
   * Die Kennung steht oben aus gutem Grund: Ohne erkennbaren Browser
   * antworten andere Anbieter mit einer Sperrseite. Deshalb wird sie hier nur
   * fuer diesen einen Wirt ersetzt und nicht allgemein weggelassen — dieselbe
   * Bauart wie die Cellar-Umleitung darueber.
   *
   * **Sonst haette die Pruefung eine Behoerdenquelle als „nicht abrufbar"
   * gemeldet, die im Browser einwandfrei laedt** — und damit die
   * Zeichenkette geprueft statt der Sache.
   */
  if (/(^|\.)ptb\.de$/i.test(new URL(url).hostname)) {
    return { url, kopf: { 'User-Agent': 'Mozilla/5.0' } };
  }

  return { url, kopf: {} };
};

/** Holt eine Seite als Text. HTML wird grob von Auszeichnung befreit. */
const seiteHolen = async (url: string): Promise<string> => {
  const ziel = abrufziel(url);
  const antwort = await fetch(ziel.url, {
    headers: {
      // Ohne erkennbaren Browser antworten manche Anbieter mit einer Sperrseite.
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
      'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
      ...ziel.kopf,
    },
    redirect: 'follow',
  });

  if (!antwort.ok) throw new Error(`HTTP ${antwort.status}`);

  /*
   * Zeichensatz aus dem Content-Type lesen statt UTF-8 anzunehmen.
   *
   * `gesetze-im-internet.de` liefert ISO-8859-1. Mit `response.text()` wird
   * daraus „B�rgerliches" — und ein Zitat mit Umlauten waere damit nie
   * auffindbar. Der Fehler saehe aus wie ein falsches Zitat, waere aber ein
   * Abruffehler; genau die Verwechslung, die diese Pruefung vermeiden soll.
   */
  const zeichensatz = /charset=([\w-]+)/i.exec(antwort.headers.get('content-type') ?? '')?.[1] ?? 'utf-8';
  const puffer = await antwort.arrayBuffer();
  const roh = new TextDecoder(zeichensatz.toLowerCase()).decode(puffer);
  return entschluesseln(
    roh
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  );
};

/**
 * HTML-Entities aufloesen, numerische eingeschlossen.
 *
 * `gesetze-im-internet.de` schreibt Umlaute als `&#228;` statt als Zeichen.
 * Ohne diese Umwandlung waere „Sachmaengeln" auf der Seite nie zu finden —
 * und der Befund saehe aus wie ein erfundenes Zitat, obwohl er ein
 * Abruffehler waere.
 */
const BENANNT: Record<string, string> = {
  nbsp: ' ', amp: '&', quot: '"', apos: "'", lt: '<', gt: '>',
  auml: 'ä', ouml: 'ö', uuml: 'ü', Auml: 'Ä', Ouml: 'Ö', Uuml: 'Ü',
  szlig: 'ß', sect: '§', euro: '€', bdquo: '"', ldquo: '"', rdquo: '"',
  laquo: '«', raquo: '»', ndash: '–', mdash: '—', shy: '',
};

const entschluesseln = (text: string): string =>
  text
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n: string) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-zA-Z]+);/g, (ganz, name: string) => BENANNT[name] ?? ganz);

const main = async () => {
  const roh = JSON.parse(await fs.readFile('daten/quellen.json', 'utf8')) as { quellen: unknown[] };
  const quellen = roh.quellen.map((q) => Quelle.parse(q)).filter((q) => !NUR || q.id === NUR);

  console.log(`Belegprüfung · ${quellen.length} Quellen\n`);

  let fehler = 0;
  let manuell = 0;
  let geprueft = 0;

  for (const quelle of quellen) {
    if (quelle.abrufart === 'manuell') {
      manuell += 1;
      console.log(`·  ${quelle.id}`);
      console.log(`   übersprungen: ${quelle.abrufhinweis}\n`);
      continue;
    }

    let text: string;
    try {
      text = normalisieren(await seiteHolen(quelle.url));
    } catch (f) {
      fehler += 1;
      console.log(`✕  ${quelle.id}`);
      console.log(`   nicht abrufbar: ${(f as Error).message}`);
      console.log(`   ${quelle.url}\n`);
      continue;
    }

    /*
     * Eine leere oder winzige Seite ist kein bestandener Test, sondern ein
     * stiller Fehlschlag: Wer nur die Kopfzeile bekommt, findet auch kein
     * Zitat — und ohne diese Schwelle sähe das aus wie „nichts gefunden".
     */
    if (text.length < 500) {
      fehler += 1;
      console.log(`✕  ${quelle.id}`);
      console.log(`   Seite lieferte nur ${text.length} Zeichen – Inhalt wird vermutlich nachgeladen.`);
      console.log(`   Kandidat für abrufart: "manuell".\n`);
      continue;
    }

    /*
     * **Auch die Zitatkarten, nicht nur die Belege.**
     *
     * Bis zum 03.09.2026 las diese Pruefung ausschliesslich
     * `quelle.belegt[].zitat`. Was im **Bild** steht — `szene.zitat` mit
     * Zitatbalken und Herausgeber darunter — hatte ausser dem Renderer keinen
     * Leser. Und genau dort war gekuerzt worden: „Der Unternehmer hat
     * sicherzustellen, dass dem Verbraucher Aktualisierungen bereitgestellt
     * werden" liess drei Einschraenkungen weg und kam als Zeichenkette auf der
     * Seite gar nicht vor.
     *
     * Der Belegpruefer hat es gefunden, keine Wache. **Die sichtbarste Stelle
     * des ganzen Belegapparats war die einzige ungepruefte** — dieselbe Sorte
     * Loch wie die Tonspur-Attrappe am 01.09.2026 und `GEPARKT` am 02.09.
     */
    const karten = ALLE_ENTWUERFE.flatMap((s) =>
      s.szenen
        .filter((sz): sz is typeof sz & { art: 'zitatkarte' } => sz.art === 'zitatkarte')
        .filter((sz) => sz.quelleId === quelle.id)
        .map((sz) => ({ id: `${s.id} · Karte`, zitat: sz.zitat, stuetzt: '' })),
    );

    /*
     * **Eine gekennzeichnete Auslassung wird stueckweise geprueft.**
     *
     * Eine Karte hat 90 Zeichen, und mancher Satz im Gesetzblatt hat 220 —
     * § 356 Absatz 3 BGB traegt Verneinung und Verb an den beiden Enden von
     * „Die Widerrufsfrist beginnt nicht, bevor der Unternehmer den Verbraucher
     * entsprechend den Anforderungen des Artikels 246a … unterrichtet hat".
     * Kein Ausschnitt dieser Laenge traegt beides.
     *
     * **Der Unterschied ist die Kennzeichnung, nicht die Kuerzung.** Ein „…"
     * sagt dem Zuschauer, dass hier etwas fehlt; ein stiller Schnitt behauptet
     * einen zusammenhaengenden Satz, den es nicht gibt. Geprueft wird deshalb
     * jedes Stueck einzeln — die Auslassung darf Woerter weglassen, keine
     * Wortfolge erfinden.
     */
    const stuecke = (zitat: string): string[] =>
      zitat
        .split(/\s*(?:…|\.\.\.)\s*/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

    const treffer = [...quelle.belegt, ...karten].map((b) => ({
      beleg: b,
      gefunden: stuecke(b.zitat).every((s) => text.includes(normalisieren(s))),
    }));
    const fehlend = treffer.filter((t) => !t.gefunden);
    geprueft += treffer.length;

    if (fehlend.length === 0) {
      console.log(`✓  ${quelle.id}  ${treffer.length} Zitat(e) bestätigt`);
    } else {
      fehler += fehlend.length;
      console.log(`✕  ${quelle.id}  ${fehlend.length} von ${treffer.length} Zitaten nicht gefunden`);
      for (const t of fehlend) {
        console.log(`   nicht auf der Seite: „${t.beleg.zitat.slice(0, 70)}…"`);
      }
      console.log(`   ${quelle.url}`);
    }
    console.log('');
  }

  console.log(`${geprueft} Zitate geprüft, ${fehler} Beanstandung(en), ${manuell} manuell.`);
  if (fehler > 0) process.exitCode = 1;
};

main().catch((fehler) => {
  console.error('\nFehlgeschlagen:', fehler.message);
  process.exit(1);
});
