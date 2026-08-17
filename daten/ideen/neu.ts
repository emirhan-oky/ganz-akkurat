import type { Idee } from '../../src/typen';

/**
 * Mittwoch, 12 Uhr · Neu und keiner sagt es dir.
 *
 * Der einzige Sendeplatz **ohne haltbaren Vorrat**. Alle anderen ziehen aus
 * einem Lager, das Wochen ueberdauert; dieser hier verdirbt. Was im Fruehjahr
 * „neu" war, ist im Herbst Archiv — und dann gehoert es entweder zu
 * `absicht`, `gibtswirklich` oder gar nicht mehr in den Kanal.
 *
 * Die Liste unten ist deshalb anders zu lesen als die uebrigen sechs: nicht
 * als Vorrat, sondern als **Beobachtungsposten**. Wer hier nachschaut, sieht,
 * welche Stellen etwas veroeffentlichen, das kurzfristig zum Thema wird.
 *
 * ## Die Materialgrenze
 *
 * Neue **Geraete** sind belegt durch Herstellerankuendigung (beteiligt) und
 * Presse (nicht eintragbar). Sie fallen aus, ausnahmslos.
 *
 * Neue **Regeln, Normen und Grenzwerte** sind belegt durch Behoerden und
 * Normungsgremien. Nur die gehen.
 *
 * Das klingt nach Einschraenkung und ist der Vorteil: Ueber ein neues Handy
 * berichten hunderttausend Kanaele am selben Tag. Dass seit dem 31. Juli ein
 * Recht auf Reparatur gilt, erzaehlt niemand, weil es niemand liest.
 *
 * ## Woher die Themen kommen
 *
 * Feste Anlaufstellen statt Zufallsfunde — die Recherche ist hier woechentlich
 * und muss deshalb einen Ablauf haben:
 *
 * - **EUR-Lex**, ueber Cellar abrufbar (`skripte/quellen-pruefen.ts` leitet
 *   CELEX-Adressen selbst dorthin um)
 * - **Bundesnetzagentur**, Verbraucherbereich und Allgemeinzuteilungen
 * - **BSI**, Verbraucherempfehlungen und IT-Grundschutz
 * - **Umweltbundesamt**, Oekodesign und Elektrogeraete
 * - **Normungsgremien** mit frei zugaenglichen Bekanntmachungen (USB-IF, VESA)
 */
export const neuIdeen: Idee[] = [
  {
    id: 'recht-auf-reparatur-gilt',
    format: 'neu',
    sachgebiet: 'recht',
    reifegrad: 'skizze',
    erzaehlt: 'Seit Ende Juli hast du ein Recht auf Reparatur. Gesagt hat es dir keiner.',
    dreh: 'Kein Ausblick, kein „ab 2027" — es gilt seit ein paar Wochen, und niemand hat es gemerkt.',
    sache: 'Die Reparaturrichtlinie ist in Kraft; entscheidend ist, was sie dem Hersteller konkret abverlangt.',
    belegpfad: [{ instanz: 'Europäische Union', art: 'behoerde', findet: 'Richtlinie 2024/1799, Geltungsbeginn und Pflichten' }],
    quellenIds: [],
    notiz:
      'Das aktuellste Thema im ganzen Vorrat und damit der natürliche erste Mittwoch. Vor dem Bauen das ' +
      'genaue Datum und den Umfang aus dem Rechtstext holen — nicht aus einer Meldung über den Rechtstext.',
  },
  {
    id: 'mobilfunk-messung-beweis',
    format: 'neu',
    sachgebiet: 'netz',
    reifegrad: 'skizze',
    erzaehlt: 'Du kannst jetzt amtlich beweisen, dass dein Mobilfunk langsamer ist als im Vertrag.',
    dreh: 'Nicht „beschwer dich", sondern: Es gibt ein festgelegtes Verfahren, und das Ergebnis zählt.',
    sache: 'Die Bundesnetzagentur hat ein Messverfahren festgelegt — mehrere Messungen, verteilt über mehrere Tage.',
    belegpfad: [{ instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Festlegung zum Messverfahren Mobilfunk' }],
    quellenIds: [],
    notiz:
      'Grenzfall zur Handlungsaufforderung: Der Sendeplatz darf keine Arbeit verlangen. Also erzählen, ' +
      'dass es das gibt — nicht, wie man es macht. Die Anleitung wäre Hauptvideo-Stoff.',
  },
  {
    id: 'batterie-ausnahmen',
    format: 'neu',
    sachgebiet: 'recht',
    reifegrad: 'skizze',
    erzaehlt: 'Der wechselbare Akku kommt — für manche Geräte hat die Kommission die Pflicht gerade wieder gestrichen.',
    dreh: 'Die Wendung ist die Rücknahme. Erst die große Ankündigung, dann die Ausnahmeliste.',
    sache: 'Ein Rechtsakt der Kommission nimmt einzelne Produktgruppen von den Entnahmeanforderungen aus.',
    belegpfad: [
      { instanz: 'Europäische Kommission', art: 'behoerde', findet: 'Delegierter Rechtsakt mit den Ausnahmen' },
      { instanz: 'Europäische Union', art: 'behoerde', findet: 'Verordnung 2023/1542, Grundpflicht zur Entnehmbarkeit' },
    ],
    quellenIds: [],
    notiz:
      'Sauber abgrenzen gegen den Mittwoch um 18 Uhr: Dort ginge es um die Absicht dahinter, hier nur ' +
      'darum, dass es passiert ist und wann.',
  },
  {
    id: 'batteriepass',
    format: 'neu',
    sachgebiet: 'recht',
    reifegrad: 'skizze',
    erzaehlt: 'Jede größere Batterie bekommt bald einen digitalen Ausweis, den du selbst auslesen kannst.',
    dreh: 'Ein Dokument über den Akku in deinem Gerät, das es vorher schlicht nicht gab.',
    sache: 'Der Batteriepass nach 2023/1542: welche Angaben er trägt und ab wann.',
    belegpfad: [{ instanz: 'Europäische Union', art: 'behoerde', findet: 'Verordnung 2023/1542, Vorgaben zum Batteriepass' }],
    quellenIds: [],
  },
  {
    id: 'usb-neue-klasse',
    format: 'neu',
    sachgebiet: 'laden',
    reifegrad: 'skizze',
    erzaehlt: 'Es gibt eine neue USB-Geschwindigkeitsklasse, und sie heißt schon wieder anders als die letzte.',
    dreh: 'Die Norm ist neu, die Namensgebung bleibt eine Zumutung — das ist der Witz, nicht die Zahl.',
    sache: 'Aktuelle Fassung der USB-Spezifikation samt der offiziell empfohlenen Bezeichnung.',
    belegpfad: [{ instanz: 'USB Implementers Forum', art: 'standard', findet: 'Aktuelle Spezifikation und Namenskonvention' }],
    quellenIds: [],
    notiz: 'Prüfen, ob das nicht besser als „Das ist Absicht" läuft. Kriterium: Ist es neu oder ist es Wut?',
  },
  {
    id: 'ki-verordnung-gilt',
    format: 'neu',
    sachgebiet: 'recht',
    reifegrad: 'skizze',
    erzaehlt: 'Seit August gelten die meisten Pflichten der KI-Verordnung. Gemerkt hat es fast niemand.',
    dreh: 'Der Stichtag liegt hinter uns, nicht vor uns — genau das macht ihn zum Mittwochsthema.',
    sache: 'Verordnung 2024/1689, Geltungsbeginn der allgemeinen Pflichten am 2. August 2026.',
    belegpfad: [
      { instanz: 'Europäische Union', art: 'behoerde', findet: 'Verordnung 2024/1689, Artikel zum Geltungsbeginn' },
    ],
    quellenIds: [],
    notiz:
      'Über Cellar abrufbar wie die Reparaturrichtlinie. Der Geltungsbeginn ist gestaffelt — vor dem ' +
      'Bauen den genau richtigen Absatz zitieren, nicht den bequemsten.',
  },
  {
    id: 'meldepflicht-schwachstellen',
    format: 'neu',
    sachgebiet: 'recht',
    reifegrad: 'skizze',
    erzaehlt: 'Ab September müssen Hersteller ausgenutzte Sicherheitslücken binnen 24 Stunden melden.',
    dreh: 'Die Frist ist der Aufhänger: 24 Stunden für etwas, das bisher niemand erfahren musste.',
    sache: 'Cyber Resilience Act, Verordnung 2024/2847 — Meldepflichten gelten vor den übrigen Pflichten.',
    belegpfad: [
      { instanz: 'Europäische Union', art: 'behoerde', findet: 'Verordnung 2024/2847, Meldepflichten und ihr Geltungsbeginn' },
    ],
    quellenIds: [],
    notiz: 'Der Stichtag liegt im September 2026 — der Beobachtungsposten mit dem nächsten Termin.',
  },
  {
    id: 'fuenf-jahre-updates',
    format: 'neu',
    sachgebiet: 'handy',
    reifegrad: 'skizze',
    erzaehlt: 'Neue Handys müssen fünf Jahre Sicherheitsupdates bekommen. Das ist keine Kulanz mehr.',
    dreh: 'Dazu Ersatzteile für sieben Jahre und ein Energielabel auf dem Karton — auf dem Handykarton.',
    sache: 'Ökodesign-Verordnung 2023/1670, anwendbar seit dem 20. Juni 2025.',
    belegpfad: [
      { instanz: 'Europäische Union', art: 'behoerde', findet: 'Verordnung 2023/1670, Anhang zu Updates und Ersatzteilen' },
    ],
    quellenIds: [],
    notiz: 'Etwas älter als die anderen Mittwochsthemen, aber immer noch weitgehend unbekannt. Reserve.',
  },
];
