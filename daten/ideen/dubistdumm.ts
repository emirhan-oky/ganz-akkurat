import type { Idee } from '../../src/typen';

/**
 * Montag · Du bist dumm — Groessen, die niemand einordnen kann.
 *
 * Der Sendeplatz braucht eine Zahl, bei der die **Fehlschaetzung vorhersagbar**
 * ist: zu klein, zu gross, falsche Groessenordnung. Eine Zahl, die man
 * ungefaehr trifft, taugt nicht — dann liegt niemand daneben und der Name des
 * Sendeplatzes ist eine leere Beleidigung.
 *
 * Zwei Bauformen haben sich bewaehrt: die **falsche Groessenordnung** (sechzig
 * Elemente, wo man fuenf vermutet) und die **falsche Einheit** — auf der
 * Powerbank stehen Milliamperestunden, erlaubt sind Wattstunden. Die zweite
 * ist die bessere, weil der Zuschauer nicht nur danebenliegt, sondern in einer
 * Groesse antwortet, nach der gar nicht gefragt war.
 */
export const dubistdummIdeen: Idee[] = [
  {
    id: 'stecker-dreizehn-jahre',
    format: 'dubistdumm',
    sachgebiet: 'handy',
    reifegrad: 'produziert',
    erzaehlt: 'Die EU hat dreizehn Jahre gebraucht, bis alle Handys denselben Ladestecker haben.',
    dreh: 'Schätzfrage. Fast alle tippen auf drei bis fünf Jahre.',
    sache: 'Erste Bemühungen 2009, Richtlinie 2022/2380 macht USB-C verbindlich.',
    belegpfad: [{ instanz: 'Europäische Union', art: 'behoerde', findet: 'Erwägungsgründe der Richtlinie 2022/2380' }],
    quellenIds: ['eu-einheitlicher-ladeanschluss'],
  },
  {
    id: 'elemente-im-telefon',
    format: 'dubistdumm',
    sachgebiet: 'handy',
    reifegrad: 'skizze',
    erzaehlt: 'In einem Smartphone stecken rund sechzig verschiedene Elemente des Periodensystems.',
    dreh: 'Schätzfrage. Die meisten tippen auf fünf bis zehn — sie denken an Metall, Glas, Plastik.',
    sache: 'Zahl und Recyclingquote müssen aus einer Behördenquelle kommen, nicht aus einer Infografik.',
    belegpfad: [
      { instanz: 'Umweltbundesamt', art: 'behoerde', findet: 'Zahl der enthaltenen Metalle und Rückgewinnungsquote' },
      { instanz: 'EU-Rohstoffbericht', art: 'behoerde', findet: 'Liste kritischer Rohstoffe in Elektronik' },
    ],
    quellenIds: [],
    notiz:
      'Die UBA-Verbraucherseite nennt keine Zahl („zahlreiche wertvolle Edel- und Sondermetalle"). Die Zahl steht ' +
      'vermutlich in einer UBA-Studie oder im EU-Rohstoffbericht — vor dem Bauen prüfen.',
  },
  {
    id: 'ladeziegel-gegen-apollo',
    format: 'dubistdumm',
    sachgebiet: 'laden',
    reifegrad: 'skizze',
    erzaehlt: 'Dein Ladeziegel hat mehr Rechenleistung als der Computer, der Menschen zum Mond geflogen hat.',
    dreh: 'Nicht das Telefon — der Stecker in der Wand. Das ist der Unterschied zum bekannten Vergleich.',
    sache: 'Apollo Guidance Computer: Taktfrequenz und Speicher gegen den Controller eines heutigen Netzteils.',
    belegpfad: [
      { instanz: 'NASA', art: 'behoerde', findet: 'Spezifikation des Apollo Guidance Computer' },
      { instanz: 'Halbleiterhersteller', art: 'hersteller', findet: 'Datenblatt eines USB-PD-Controllers' },
    ],
    quellenIds: [],
    notiz: 'Der Reiz hängt daran, dass es der Ladeziegel ist. Beim Telefon kennt den Vergleich jeder.',
  },
  {
    id: 'licht-um-die-erde',
    format: 'dubistdumm',
    sachgebiet: 'netz',
    reifegrad: 'skizze',
    erzaehlt: 'Licht braucht siebenundsechzig Millisekunden einmal um die Erde. Schneller geht keine Verbindung.',
    dreh: 'Die Schätzfrage ist die Ping-Untergrenze. Alle tippen zu niedrig, weil Licht „sofort" ist.',
    sache: 'Erdumfang geteilt durch Lichtgeschwindigkeit in Glasfaser, nicht im Vakuum.',
    belegpfad: [
      { instanz: 'Physikalisch-Technische Bundesanstalt', art: 'behoerde', findet: 'Lichtgeschwindigkeit, Brechungsindex Glasfaser' },
    ],
    quellenIds: [],
    notiz: 'Rechnung selbst führen ist heikel — sie ist keine Messung, aber auch keine zitierbare Aussage.',
  },
  {
    id: 'rechenzentrum-kleinstadt',
    format: 'dubistdumm',
    sachgebiet: 'netz',
    reifegrad: 'skizze',
    erzaehlt: 'Ein einzelnes Rechenzentrum verbraucht so viel Strom wie eine deutsche Kleinstadt.',
    dreh: 'Schätzfrage nach Einwohnern, nicht nach Megawatt — Megawatt kann niemand einordnen.',
    sache: 'Stromverbrauch eines großen Rechenzentrums gegen den Pro-Kopf-Verbrauch mal Einwohnerzahl.',
    belegpfad: [
      { instanz: 'Umweltbundesamt', art: 'behoerde', findet: 'Stromverbrauch von Rechenzentren in Deutschland' },
    ],
    quellenIds: [],
  },
  {
    id: 'powerbank-wattstunden',
    format: 'dubistdumm',
    sachgebiet: 'laden',
    reifegrad: 'belegt',
    erzaehlt: 'Wie groß darf die Powerbank im Handgepäck sein? Fast alle nennen eine Zahl in der falschen Einheit.',
    dreh: 'Auf der Powerbank steht Milliamperestunden, erlaubt sind Wattstunden. Der Zuschauer schätzt in der falschen Größe.',
    sache: 'Luftfahrt-Bundesamt: 100 Wh Nennenergie, darüber Genehmigung, höchstens zwei Ersatzbatterien.',
    belegpfad: [
      { instanz: 'Luftfahrt-Bundesamt', art: 'behoerde', findet: 'Grenzwerte für Lithiumbatterien im Gepäck' },
      { instanz: 'EASA', art: 'behoerde', findet: 'Regelungen zu Ersatzbatterien im Handgepäck' },
    ],
    quellenIds: ['lba-lithiumbatterien', 'easa-lithium-handgepaeck', 'faa-lithium-grenzwerte'],
    notiz:
      'Der einzige Vorrat-Eintrag auf „belegt": drei geprüfte unbeteiligte Quellen liegen schon in ' +
      'quellen.json. Sofort produzierbar, ohne eine Seite abzurufen.',
  },
  {
    id: 'ladezyklen',
    format: 'dubistdumm',
    sachgebiet: 'laden',
    reifegrad: 'skizze',
    erzaehlt: 'Wie viele Ladungen hält ein Handyakku, bevor er spürbar nachlässt? Die meisten schätzen viel zu hoch.',
    dreh: 'Die EU schreibt inzwischen eine Untergrenze vor — die Zahl ist also nicht Meinung, sondern Recht.',
    sache: 'EU-Batterieverordnung 2023/1542, Mindestzahl an Vollzyklen bei verbleibender Restkapazität.',
    belegpfad: [{ instanz: 'Europäische Union', art: 'behoerde', findet: 'Verordnung 2023/1542, Anforderungen an die Zyklenfestigkeit' }],
    quellenIds: [],
  },
  {
    id: 'ssd-ohne-strom',
    format: 'dubistdumm',
    sachgebiet: 'rechner',
    reifegrad: 'skizze',
    erzaehlt: 'Wie lange hält eine SSD deine Daten, wenn sie in der Schublade liegt und keinen Strom bekommt?',
    dreh: 'Alle denken, ein Speicher ohne Strom ist ein Tresor. Die Norm nennt eine Frist in Monaten.',
    sache: 'JEDEC gibt eine Mindestaufbewahrungszeit ohne Spannung an — deutlich kürzer als vermutet.',
    belegpfad: [{ instanz: 'JEDEC', art: 'standard', findet: 'Retention-Anforderungen für Client-SSDs' }],
    quellenIds: [],
    notiz:
      'Vor dem Bauen prüfen, ob die JEDEC-Angabe frei zugänglich ist — Normen sind oft kostenpflichtig. ' +
      'Dieselbe Klippe wie bei den Cat-Normen und beim Panzerglas.',
  },
  {
    id: 'ersatzteile-vorhalten',
    format: 'dubistdumm',
    sachgebiet: 'recht',
    reifegrad: 'skizze',
    erzaehlt: 'Wie lange muss ein Hersteller Ersatzteile für dein Gerät vorhalten? Länger, als du glaubst.',
    dreh: 'Die Schätzfrage dreht die übliche Richtung um: Hier liegt der Zuschauer zu niedrig, nicht zu hoch.',
    sache: 'Ökodesign-Vorgaben nennen für einzelne Produktgruppen konkrete Fristen in Jahren.',
    belegpfad: [{ instanz: 'Europäische Union', art: 'behoerde', findet: 'Ökodesign-Verordnung, Verfügbarkeit von Ersatzteilen' }],
    quellenIds: [],
    notiz: 'Gute Ergänzung zum Mittwoch (Parts Pairing): dasselbe Rechtsgebiet, entgegengesetzte Stoßrichtung.',
  },
];

/*
 * Hier stand kurz „Die erste Festplatte wog eine Tonne" (IBM RAMAC 350, 1956).
 * Die Idee ist beim Aufschreiben durchgefallen, und zwar an der eigenen Regel:
 * Der einzige Beleg waere das IBM-Archiv gewesen — der Hersteller selbst, also
 * eine beteiligte Instanz. Das Schema lehnt das ab (`Idee.superRefine`), und
 * es hat recht: Wer keine unbeteiligte Instanz benennen kann, hat kein Thema,
 * sondern eine Vermutung.
 *
 * Sie kommt zurueck, sobald ein Computermuseum oder eine Normungsstelle die
 * Zahlen fuehrt. Notiert bleibt sie hier, damit niemand sie in drei Monaten
 * ein zweites Mal recherchiert.
 */
