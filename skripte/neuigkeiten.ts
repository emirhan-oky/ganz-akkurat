import fs from 'node:fs/promises';

/**
 * `npm run neuigkeiten` — der Mittwochswächter.
 *
 * Der Sendeplatz „Neu und keiner sagt es dir" ist der teuerste der acht. Alle
 * anderen ziehen aus einem Vorrat, der Wochen hält; dieser braucht jede Woche
 * eine frisch abgerufene Behördenseite, weil ein Vorrat aus dem Frühjahr im
 * Herbst kein Vorrat mehr ist, sondern ein Archiv.
 *
 * Dieses Skript nimmt davon die Suche ab, nicht die Auswahl.
 *
 * ## Warum EU-Recht und nichts anderes
 *
 * Die Materialgrenze des Sendeplatzes ist hart und steht in `CLAUDE.md`: Neue
 * **Geräte** sind durch Herstellerankündigung (beteiligt) und Presse (nicht
 * eintragbar) belegt und fallen aus. Neue **Regeln, Normen und Grenzwerte**
 * sind durch Behörden belegt — nur die gehen.
 *
 * Und die EU führt ihr Recht als einzige Instanz vollständig maschinenlesbar.
 * Am 17.08.2026 sind die RSS-Adressen von Bundesgesetzblatt, BSI,
 * Bundesnetzagentur und Umweltbundesamt der Reihe nach mit 404 zurückgekommen;
 * die Behörden haben ihre Feeds verschoben. Für diesen Sendeplatz wiegt das
 * wenig — sämtliche bisher produzierten und geplanten Themen sind EU-Recht.
 *
 * ## Was das Skript nicht kann
 *
 * Entscheiden. Der Prüfstein lautet „Erzählt das jemand freiwillig weiter?",
 * und eine Durchführungsverordnung über Zolltarifpositionen ist formal genauso
 * neu wie das Recht auf Reparatur. Die Automatisierung **verschiebt den
 * Engpass, sie beseitigt ihn nicht**: aus einer Stunde Suchen werden zwei
 * Minuten Auswählen.
 */

const SPARQL = 'http://publications.europa.eu/webapi/rdf/sparql';
const CELLAR = 'http://publications.europa.eu/resource/celex';
const ZIEL = 'daten/neuigkeiten.json';

/**
 * Wie weit zurück gesucht wird.
 *
 * Der Sendeplatz lebt davon, dass der Stichtag **hinter** uns liegt: „seit
 * drei Wochen", nicht „ab 2027". Sechs Wochen sind der Kompromiss zwischen
 * „noch neu" und „genug Auswahl".
 */
const FENSTER_TAGE = 42;

/**
 * Zwei Klassen von Stichwörtern, und das ist der ganze Trick.
 *
 * Der erste Durchlauf am 17.08.2026 lief mit einer einzigen, großzügigen
 * Liste und lieferte **83 Kandidaten** — unbrauchbar viele. Der Grund war
 * nicht die Länge der Liste, sondern ihre Zusammensetzung: „daten",
 * „sicherheit", „netz", „energie" und „verbraucher" stehen in fast jedem
 * EU-Rechtsakt, auch in einem über Fischereiquoten.
 *
 * Deshalb jetzt zwei Klassen. **Tragend** sind Wörter, die ohne Technik kaum
 * vorkommen; sie entscheiden über die Aufnahme. **Begleitend** sind die
 * häufigen; sie entscheiden nur über die Reihenfolge. Ein Rechtsakt braucht
 * mindestens ein tragendes Wort, sonst fällt er heraus, egal wie oft
 * „Sicherheit" darin steht.
 */
const TRAGEND = [
  'akku', 'batterie', 'ladegerät', 'ladeanschluss', 'ökodesign', 'oekodesign',
  'reparatur', 'ersatzteil', 'elektro- und elektronikgerät', 'funkanlage',
  'künstliche intelligenz', 'kuenstliche intelligenz', 'cybersicherheit',
  'cyberresilienz', 'usb', 'drucker', 'bildschirm', 'smartphone', 'mobiltelefon',
  'telekommunikation', 'mobilfunk', 'frequenz', 'energieverbrauchsrelevant',
  'energieeffizienz', 'produktsicherheit', 'datenschutz', 'kennzeichnungspflicht',
];

/**
 * Sachgebiete, die sicher nichts fuer diesen Kanal sind.
 *
 * Ein Rechtsakt, in dem eines dieser Woerter steht, faellt heraus, egal was
 * sonst darin vorkommt. Das ist grob und darf es sein: Tierseuchen,
 * Sanktionslisten, Fischerei und Zolltarife machen einen grossen Teil des
 * laufenden EU-Rechts aus und keinen einzigen Short.
 */
const AUSGESCHLOSSEN = [
  'schweinepest', 'geflügelpest', 'tierseuche', 'seuchenbekämpfung',
  'restriktive maßnahmen', 'fischerei', 'zolltarif', 'agrarerzeugnis',
  'pflanzenschutzmittel', 'lebensmittelzusatzstoff',
];

/**
 * Sucht ein Stichwort als **Wortanfang**, nicht als Teilzeichenkette.
 *
 * Der erste Durchlauf suchte stumpf mit `includes`, und das Ergebnis war eine
 * Liste voller Beschluesse zur Afrikanischen Schweinepest. Der Grund:
 * **„usb" steckt in „Ausbruch".** Dieselbe Falle lauert bei jedem kurzen
 * Kuerzel in einer Sprache, die Woerter zusammensetzt.
 *
 * Die Wortgrenze steht nur **vorn**. Hinten muss sie fehlen, sonst faende
 * „akku" weder „Akkus" noch „Akkuladung" — und genau die zusammengesetzten
 * Formen sind im Amtsdeutsch die Regel.
 */
const kommtVor = (text: string, wort: string): boolean =>
  new RegExp(`\\b${wort.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(text);

/** Häufige Wörter — sie ordnen nur, sie qualifizieren nicht. */
const BEGLEITEND = [
  'elektro', 'elektronisch', 'gerät', 'geräte', 'internet', 'netz', 'daten',
  'digital', 'software', 'sicherheit', 'verbraucher', 'kennzeichnung',
  'energie', 'fahrzeug', 'kraftfahrzeug',
];

/** Nur Sekundärrecht — Verordnungen, Richtlinien, Beschlüsse. */
const istSekundaerrecht = (celex: string) => /^3\d{4}[RLD]/.test(celex);

const tagVor = (tage: number) => {
  const d = new Date();
  d.setDate(d.getDate() - tage);
  return d.toISOString().slice(0, 10);
};

/**
 * Rechtsakte, die im Fenster in Kraft getreten sind.
 *
 * Die Abfrage holt bewusst **nur** Kennung und Datum. Der naheliegende
 * Zusatz — den deutschen Titel gleich mitziehen über `work_has_expression`
 * und `expression_title` — liefert am 17.08.2026 null Zeilen, obwohl beide
 * Prädikate im Modell stehen. Statt daran zu raten, kommen die Titel über
 * Cellar, und dieser Weg ist ohnehin schon erprobt: `quellen-pruefen` benutzt
 * ihn seit demselben Tag für die Zitatprüfung.
 */
const rechtsakteImFenster = async (von: string, bis: string): Promise<Map<string, string>> => {
  const query = `PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
SELECT ?celex ?inkraft WHERE {
  ?w cdm:resource_legal_id_celex ?celex .
  ?w cdm:resource_legal_date_entry-into-force ?inkraft .
  FILTER(?inkraft >= "${von}"^^<http://www.w3.org/2001/XMLSchema#date>
      && ?inkraft <= "${bis}"^^<http://www.w3.org/2001/XMLSchema#date>)
} LIMIT 1000`;

  const adresse = `${SPARQL}?query=${encodeURIComponent(query)}&format=${encodeURIComponent('application/sparql-results+json')}`;
  const antwort = await fetch(adresse, { signal: AbortSignal.timeout(90_000) });
  if (!antwort.ok) throw new Error(`SPARQL antwortete mit HTTP ${antwort.status}`);

  const daten = (await antwort.json()) as {
    results: { bindings: { celex: { value: string }; inkraft: { value: string } }[] };
  };

  /*
   * Dieselbe Kennung kommt mehrfach zurueck — ein Rechtsakt kann mehrere
   * Inkrafttretensdaten tragen (Grundfassung und Berichtigungen). Genommen
   * wird das aelteste im Fenster: Der Sendeplatz fragt, seit wann etwas gilt.
   */
  const treffer = new Map<string, string>();
  for (const b of daten.results.bindings) {
    const celex = b.celex.value;
    const datum = b.inkraft.value;
    const bisher = treffer.get(celex);
    if (!bisher || datum < bisher) treffer.set(celex, datum);
  }
  return treffer;
};

/** Holt den deutschen Volltext eines Rechtsakts und macht Fliesstext daraus. */
const textVonCellar = async (celex: string): Promise<string | null> => {
  try {
    const antwort = await fetch(`${CELLAR}/${celex}`, {
      headers: { Accept: 'application/xhtml+xml', 'Accept-Language': 'deu' },
      redirect: 'follow',
      signal: AbortSignal.timeout(30_000),
    });
    if (!antwort.ok) return null;
    const roh = await antwort.text();
    return roh
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  } catch {
    return null;
  }
};

/**
 * Der Titel eines Rechtsakts, aus dem Volltext geschnitten.
 *
 * Der Cellar-Text beginnt mit Amtsblattkopf und Nummer, danach folgt in
 * Grossbuchstaben die Gattung — VERORDNUNG, RICHTLINIE, BESCHLUSS. Ab dort
 * steht der amtliche Titel.
 *
 * **Nicht am Punkt abschneiden.** Der erste Anlauf endete beim ersten Punkt
 * und lieferte „DURCHFÜHRUNGSVERORDNUNG (EU) 2026/1731 DER KOMMISSION vom 15"
 * — abgeschnitten mitten im Datum, weil „15." einen Punkt enthält. Jetzt
 * laeuft der Schnitt an dem Wort, mit dem der amtliche Titel wirklich
 * beginnt: „zur", „ueber", „zwecks", „hinsichtlich", „mit". Was davor steht,
 * ist Gattung und Datum und interessiert beim Ueberfliegen nicht.
 */
const titelAus = (text: string): string => {
  const gattung =
    /((?:DURCHFÜHRUNGS|DELEGIERTE[RS]?\s+)?(?:VERORDNUNG|RICHTLINIE|BESCHLUSS)\s*\((?:EU|GASP)\)\s*[\d/]+)/i.exec(text);
  const ab = gattung ? text.slice(gattung.index) : text;
  const sache = /\b(zur |zum |über |ueber |betreffend |hinsichtlich |mit |zwecks |zwischen )/i.exec(ab.slice(0, 400));
  const kopf = gattung?.[1]?.trim() ?? '';
  const rest = sache ? ab.slice(sache.index, sache.index + 240).trim() : ab.slice(0, 240).trim();
  return `${kopf} ${rest}`.replace(/\s+/g, ' ').trim();
};

const main = async () => {
  const bis = tagVor(0);
  const von = tagVor(FENSTER_TAGE);

  console.log('Ganz akkurat · Neuigkeiten für den Mittwoch');
  console.log(`Fenster: ${von} bis ${bis}\n`);

  console.log('1  In Kraft getretene Rechtsakte abfragen');
  const alle = await rechtsakteImFenster(von, bis);
  const sekundaer = [...alle].filter(([c]) => istSekundaerrecht(c));
  console.log(`   ${alle.size} Rechtsakte, davon ${sekundaer.length} Verordnungen, Richtlinien, Beschlüsse\n`);

  if (sekundaer.length === 0) {
    console.log('Nichts im Fenster. Das Fenster in FENSTER_TAGE weiten oder nächste Woche erneut.');
    return;
  }

  /*
   * Der Volltext wird **nur** fuer die Kandidaten geholt, nicht fuer alle.
   * 265 Abrufe gegen Cellar waeren unhoeflich und langsam; deshalb zuerst
   * das Datum als Sieb (schon geschehen) und dann Stueck fuer Stueck, mit
   * einer Obergrenze.
   */
  console.log('2  Volltexte holen und sieben');
  const kandidaten: {
    celex: string; inkraft: string; titel: string;
    tragend: string[]; treffer: string[]; url: string;
  }[] = [];
  let geholt = 0;

  for (const [celex, inkraft] of sekundaer.sort((a, b) => b[1].localeCompare(a[1]))) {
    if (geholt >= 120) break;
    geholt += 1;
    const text = await textVonCellar(celex);
    if (!text) continue;

    const anfang = text.slice(0, 6000);
    const klein = anfang.toLowerCase();
    if (AUSGESCHLOSSEN.some((w) => klein.includes(w))) continue;

    const tragend = TRAGEND.filter((w) => kommtVor(anfang, w));
    if (tragend.length === 0) continue;
    const begleitend = BEGLEITEND.filter((w) => kommtVor(anfang, w));
    const treffer = [...tragend, ...begleitend];

    kandidaten.push({
      celex,
      inkraft,
      titel: titelAus(text),
      tragend,
      treffer,
      url: `https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:${celex}`,
    });
  }
  console.log(`   ${geholt} gelesen, ${kandidaten.length} mit Technikbezug\n`);

  /*
   * Sortiert nach den **tragenden** Treffern, bei Gleichstand nach Datum. Ein
   * Rechtsakt mit drei Geraetewoertern handelt wahrscheinlich davon; einer mit
   * einem streift es. Die begleitenden Woerter zaehlen hier bewusst nicht mit,
   * sonst gewinnt wieder der Akt, in dem oft „Sicherheit" steht.
   */
  kandidaten.sort((a, b) => b.tragend.length - a.tragend.length || b.inkraft.localeCompare(a.inkraft));

  console.log('3  Kandidaten');
  for (const k of kandidaten.slice(0, 20)) {
    console.log(`   ${k.inkraft}  ${k.celex}  ${k.tragend.join(', ')}`);
    console.log(`      ${k.titel.slice(0, 150)}`);
  }

  await fs.writeFile(ZIEL, JSON.stringify({ fenster: { von, bis }, kandidaten }, null, 2));
  console.log(`\n${kandidaten.length} Kandidaten in ${ZIEL}`);
  console.log('');
  console.log('Die Frage, die kein Skript beantwortet: Erzählt das jemand freiwillig weiter?');
  console.log('Was übrig bleibt, wandert als Idee nach daten/ideen/neu.ts — mit Belegpfad.');
};

main().catch((fehler) => {
  console.error('\nFehlgeschlagen:', fehler.message);
  process.exit(1);
});
