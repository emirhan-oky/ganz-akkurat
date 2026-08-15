import type { Idee } from '../../src/typen';

/**
 * Rubrik Reise — eine Vorschrift oder eine Landesgrenze entscheidet mit.
 *
 * Belegtechnisch der dankbarste Sendeplatz: Hier ist die unbeteiligte Quelle
 * nicht die Mühe, sondern der Ausgangspunkt. Luftfahrtbehörden, Zoll und
 * EU-Verordnungen schreiben genau das auf, worum es im Video geht, und sie
 * schreiben es öffentlich auf.
 *
 * Die Gegenprobe zur Rubrik: Fällt die Vorschrift weg, bleibt ein
 * Unterwegs-Thema übrig. „Powerbank am Gate" ist Reise, „Powerbank im Zug
 * leer" ist Unterwegs.
 */
export const reiseIdeen: Idee[] = [
  {
    id: 'powerbank-flug',
    rubrik: 'reise',
    winkelart: 'umrechnung',
    reifegrad: 'produziert',
    kernfrage: 'Darf meine Powerbank mit ins Flugzeug?',
    entwarnung: 'Deine normale Powerbank darf mit.',
    sache:
      'Die Vorschrift nennt die Grenze in Wattstunden, auf dem Gerät stehen Milliamperestunden; die Umrechnung geht in einem Schritt.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Luftfahrt-Bundesamt', art: 'behoerde', findet: 'Grenze in Wattstunden' },
      { instanz: 'EASA', art: 'behoerde', findet: 'gleiche Grenze im europäischen Recht' },
      { instanz: 'FAA', art: 'behoerde', findet: 'gleiche Grenze im amerikanischen Recht' },
    ],
    quellenIds: ['lba-lithiumbatterien', 'easa-lithium-handgepaeck', 'faa-lithium-grenzwerte'],
    notiz:
      'Läuft als skl-pbf-01. Aus themen.json übernommen, das am 14.08.2026 abgelöst wurde. Drei Behörden aus drei Rechtsräumen — der Grund, warum es aus GEPARKT herauskam.',
  },
  {
    id: 'powerbank-anzahl',
    rubrik: 'reise',
    winkelart: 'grenzwert',
    reifegrad: 'skizze',
    kernfrage: 'Wie viele Powerbanks darf ich mitnehmen?',
    entwarnung: 'Für normale Größen gibt es gar keine Stückzahlgrenze.',
    sache:
      'Unterhalb der Wattstundengrenze ist die Zahl nicht begrenzt; erst darüber gilt eine ausdrückliche Höchstzahl an Ersatzbatterien und die Zustimmung der Fluggesellschaft.',
    titelmuster: 'uhr',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Luftfahrt-Bundesamt', art: 'behoerde', findet: 'Grenzwerte und Stückzahlen für Lithiumbatterien im Handgepäck' },
      { instanz: 'EASA', art: 'behoerde', findet: 'europäische Fassung derselben Grenzen' },
    ],
    quellenIds: ['lba-lithiumbatterien', 'easa-lithium-handgepaeck', 'faa-lithium-grenzwerte'],
    notiz:
      'Alle drei Quellen liegen geprüft vor und tragen `powerbank-flug`. Diese Idee ist die Fortsetzung mit anderem Winkel — dort die Umrechnung, hier die Stückzahl. Schnellster Weg zu einem zweiten Reise-Short.',
  },
  {
    id: 'powerbank-aufgabegepaeck',
    rubrik: 'reise',
    winkelart: 'vorschrift',
    reifegrad: 'skizze',
    kernfrage: 'Darf die Powerbank in den Koffer?',
    entwarnung: 'Die Regel ist eindeutig — du musst nicht raten.',
    sache:
      'Lithiumbatterien gehören ins Handgepäck; im aufgegebenen Gepäck sind sie untersagt, weil ein Brand dort nicht bemerkt würde.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Luftfahrt-Bundesamt', art: 'behoerde', findet: 'Verbot im aufgegebenen Gepäck mit Begründung' },
      { instanz: 'EASA', art: 'behoerde', findet: 'gleichlautende europäische Regelung' },
    ],
    quellenIds: ['lba-lithiumbatterien', 'easa-lithium-handgepaeck'],
  },
  {
    id: 'notebook-akku-flug',
    rubrik: 'reise',
    winkelart: 'uebersehenerPunkt',
    reifegrad: 'skizze',
    kernfrage: 'Gilt die Wattstundengrenze auch für den fest eingebauten Notebook-Akku?',
    entwarnung: 'Dein Notebook darfst du mitnehmen.',
    sache:
      'Für fest eingebaute Batterien in Geräten gelten andere Bestimmungen als für lose Ersatzbatterien; die Grenzwerte unterscheiden sich entsprechend.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Luftfahrt-Bundesamt', art: 'behoerde', findet: 'Unterscheidung Gerät mit eingebauter Batterie / lose Ersatzbatterie' },
      { instanz: 'FAA', art: 'behoerde', findet: 'entsprechende Unterscheidung im amerikanischen Recht' },
    ],
    quellenIds: ['lba-lithiumbatterien', 'faa-lithium-grenzwerte'],
  },
  {
    id: 'reiseadapter-spannung',
    rubrik: 'reise',
    winkelart: 'verwechslung',
    reifegrad: 'skizze',
    kernfrage: 'Reicht ein Reiseadapter oder brauche ich einen Spannungswandler?',
    entwarnung: 'Für Notebook und Telefon reicht der Adapter.',
    sache:
      'Ein Reiseadapter ändert nur die Steckerform. Ob das Gerät die fremde Spannung verträgt, steht auf dem Netzteil — moderne Schaltnetzteile decken meist den gesamten Bereich ab.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'IEC 60038 (Normspannungen)', art: 'standard', findet: 'weltweite Normspannungen und Toleranzen' },
      { instanz: 'Netzteil-Typenschild', art: 'hersteller', findet: 'Eingangsspannungsbereich als Aufdruck' },
    ],
    quellenIds: [],
    notiz:
      'Der Grenzfall ist wichtig: Für Geräte mit Heizung oder Motor gilt das nicht. Ohne diese Einschränkung wäre das Video gefährlich falsch.',
  },
  {
    id: 'esim-ausland',
    rubrik: 'reise',
    winkelart: 'kaufberatung',
    reifegrad: 'skizze',
    kernfrage: 'eSIM fürs Ausland — worauf muss ich vor der Reise achten?',
    entwarnung: 'Der Netzbetreiber darf dich nicht mehr blockieren.',
    sache:
      'Die EU-Vorgaben zum Wechsel und zur Entsperrung von Endgeräten regeln, was der Anbieter verlangen darf; die Bundesnetzagentur führt die Rechte auf.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Verbraucherrechte bei Anbieterwechsel und Endgeräteentsperrung' },
    ],
    quellenIds: [],
    notiz: 'Rubrik Kaufen wäre falsch: Es wird nichts gekauft, sondern eine Regel angewandt, und eine Landesgrenze entscheidet mit.',
  },
  {
    id: 'roaming-eu-fair-use',
    rubrik: 'reise',
    winkelart: 'grenzwert',
    reifegrad: 'skizze',
    kernfrage: 'Gilt meine Datenflatrate im EU-Ausland wirklich unbegrenzt?',
    entwarnung: 'Aufschlag zahlst du im Urlaub nicht.',
    sache:
      'Die Roaming-Verordnung erlaubt dem Anbieter eine Begrenzung nur bei dauerhaftem Aufenthalt im Ausland, nicht bei einer Reise.',
    titelmuster: 'uhr',
    system: 'ohne',
    belegpfad: [
      { instanz: 'EU-Roaming-Verordnung', art: 'behoerde', findet: 'Regelung zur angemessenen Nutzung und deren Voraussetzungen' },
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'deutschsprachige Erläuterung der Verordnung' },
    ],
    quellenIds: [],
  },
  {
    id: 'drohne-mitnehmen',
    rubrik: 'reise',
    winkelart: 'vorschrift',
    reifegrad: 'skizze',
    kernfrage: 'Darf ich eine Drohne im Flugzeug mitnehmen?',
    entwarnung: 'Mitnehmen ja — fliegen ist die andere Frage.',
    sache:
      'Für den Transport gelten die Lithiumbatterie-Regeln; für den Betrieb gilt am Zielort das dortige Luftrecht, in der EU einheitlich geregelt.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'EASA', art: 'behoerde', findet: 'EU-weite Drohnenregeln und Registrierungspflicht' },
      { instanz: 'Luftfahrt-Bundesamt', art: 'behoerde', findet: 'Transport der Batterien, nationale Umsetzung' },
    ],
    quellenIds: ['easa-lithium-handgepaeck', 'lba-lithiumbatterien'],
  },
  {
    id: 'zoll-technik-einfuhr',
    rubrik: 'reise',
    winkelart: 'grenzwert',
    reifegrad: 'skizze',
    kernfrage: 'Ab wann muss ich Technik aus dem Urlaub verzollen?',
    entwarnung: 'Dein eigenes Notebook interessiert niemanden.',
    sache:
      'Für die Rückreise aus einem Drittland gelten Reisefreimengen mit festen Wertgrenzen; mitgeführte eigene Geräte fallen nicht darunter.',
    titelmuster: 'uhr',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Generalzolldirektion / Zoll online', art: 'behoerde', findet: 'Reisefreimengen, Wertgrenzen, Behandlung mitgeführter Geräte' },
    ],
    quellenIds: [],
    notiz: 'Sehr gut belegbar, der Zoll schreibt die Zahlen selbst auf. Kandidat für einen frühen Reise-Short.',
  },
  {
    id: 'fremdes-ladekabel-hotel',
    rubrik: 'reise',
    winkelart: 'mythos',
    reifegrad: 'skizze',
    kernfrage: 'Kann ein fremder USB-Anschluss im Hotel mein Telefon ausspähen?',
    entwarnung: 'Dein Telefon fragt vorher.',
    sache:
      'Eine Datenverbindung über USB verlangt am Gerät eine ausdrückliche Bestätigung; ohne sie bleibt es beim Laden.',
    titelmuster: 'verdaechtiger',
    system: 'beide',
    belegpfad: [
      { instanz: 'Bundesamt für Sicherheit in der Informationstechnik', art: 'behoerde', findet: 'Einschätzung zu öffentlichen Ladepunkten' },
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Trennung von Lade- und Datenverbindung' },
    ],
    quellenIds: [],
    notiz:
      'Vorsicht: Die Aussage muss auf aktuelle Geräte eingegrenzt bleiben. Wenn das BSI weiterhin warnt, darf das Video nicht mehr entwarnen als die Behörde.',
  },
  {
    id: 'steckdose-flugzeug',
    rubrik: 'reise',
    winkelart: 'grenzwert',
    reifegrad: 'skizze',
    kernfrage: 'Warum lädt mein Notebook an der Steckdose im Flugzeug nicht?',
    entwarnung: 'Weder Notebook noch Steckdose sind defekt.',
    sache:
      'Die Bordstromversorgung ist in der abgebbaren Leistung begrenzt und schaltet oberhalb davon ab.',
    titelmuster: 'uhr',
    system: 'ohne',
    belegpfad: [
      { instanz: 'EASA', art: 'behoerde', findet: 'Anforderungen an Bordstromversorgung für Passagiere' },
      { instanz: 'Airline-Beförderungsbedingungen', art: 'hersteller', findet: 'genannte Höchstleistung je Sitzplatz' },
    ],
    quellenIds: [],
    notiz: 'Belegpfad unsicher — ob die EASA das öffentlich in dieser Form beziffert, ist zu prüfen. Falls nicht, fällt die Idee oder wandert zu einer Zahl aus der Beförderungsbedingung, die dann als beteiligte Quelle allein nicht trägt.',
  },
  {
    id: 'handgepaeck-elektronik-raus',
    rubrik: 'reise',
    winkelart: 'vorschrift',
    reifegrad: 'skizze',
    kernfrage: 'Muss das Notebook an der Kontrolle noch aus der Tasche?',
    entwarnung: 'An vielen Flughäfen nicht mehr.',
    sache:
      'Die Vorgabe hängt an der eingesetzten Kontrolltechnik; wo neue Scanner stehen, entfällt das Auspacken.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundespolizei', art: 'behoerde', findet: 'Regeln zur Luftsicherheitskontrolle und Ausnahmen' },
      { instanz: 'EU-Kommission (Luftsicherheit)', art: 'behoerde', findet: 'Rechtsgrundlage der Kontrollvorgaben' },
    ],
    quellenIds: [],
    notiz: 'Altert schnell und ist flughafenabhängig. Das gehört als Einschränkung ins Video, sonst stimmt es nächstes Jahr nicht mehr.',
  },
  {
    id: 'wattstunden-aufdruck-fehlt',
    rubrik: 'reise',
    winkelart: 'notloesung',
    reifegrad: 'skizze',
    kernfrage: 'Auf meiner Powerbank steht keine Wattstundenzahl. Was jetzt?',
    entwarnung: 'Du kannst sie am Gate selbst ausrechnen.',
    sache:
      'Die Umrechnung von Milliamperestunden in Wattstunden geht über die Zellspannung und ist ein einziger Rechenschritt.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Luftfahrt-Bundesamt', art: 'behoerde', findet: 'Grenze in Wattstunden' },
    ],
    quellenIds: ['lba-lithiumbatterien'],
    notiz:
      'Überschneidet sich stark mit dem laufenden `powerbank-flug` (Winkelart `umrechnung`). Nur bauen, wenn dort die Notlage nicht schon abgedeckt ist — sonst zweimal dasselbe Video.',
  },
  {
    id: 'usb-c-pflicht-eu',
    rubrik: 'reise',
    winkelart: 'uebersehenerPunkt',
    reifegrad: 'skizze',
    kernfrage: 'Brauche ich für neue Geräte noch verschiedene Ladekabel?',
    entwarnung: 'Ein Kabel reicht — das ist inzwischen Gesetz.',
    sache:
      'Die EU-Richtlinie schreibt für eine festgelegte Geräteklasse einen einheitlichen Ladeanschluss vor und nennt den Stichtag.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'EU-Richtlinie 2022/2380', art: 'behoerde', findet: 'betroffene Geräteklassen, Stichtag, Ausnahmen' },
    ],
    quellenIds: [],
    notiz: 'Reise, weil die Landesgrenze mitentscheidet — außerhalb der EU gilt die Vorgabe nicht.',
  },
];
