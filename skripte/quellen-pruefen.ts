import fs from 'node:fs/promises';
import { Quelle } from '../src/typen';

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
     */
    .replace(/\s+([,.;:!?])/g, '$1')
    .toLowerCase()
    .trim();

/** Holt eine Seite als Text. HTML wird grob von Auszeichnung befreit. */
const seiteHolen = async (url: string): Promise<string> => {
  const antwort = await fetch(url, {
    headers: {
      // Ohne erkennbaren Browser antworten manche Anbieter mit einer Sperrseite.
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
      'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
    },
    redirect: 'follow',
  });

  if (!antwort.ok) throw new Error(`HTTP ${antwort.status}`);

  const roh = await antwort.text();
  return roh
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&[a-z]+;/gi, ' ');
};

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

    const treffer = quelle.belegt.map((b) => ({ beleg: b, gefunden: text.includes(normalisieren(b.zitat)) }));
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
