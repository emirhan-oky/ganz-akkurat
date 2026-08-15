import type { Idee } from '../../src/typen';

/**
 * Rubrik Unterwegs — Alltagsweg im Inland. Es geht um Ausdauer, nicht um
 * Erlaubnis.
 *
 * Der Schnitt zu `reise` ist scharf und wird hier oft gebraucht: Sobald eine
 * Vorschrift oder eine Landesgrenze mitentscheidet, gehört die Idee nach
 * drüben. „Powerbank im Zug leer" ist Unterwegs, „Powerbank am Gate" ist
 * Reise — dieselbe Powerbank, zwei Sendeplätze.
 *
 * Der Belegengpass ist hier am größten: Akkuverhalten und Ladeleistung stehen
 * meist nur in Datenblättern, und die sind beteiligte Quellen. Ideen ohne
 * Norm oder Behörde dahinter sind entsprechend markiert.
 */
export const unterwegsIdeen: Idee[] = [
  {
    id: 'netzteil-zwei-geraete',
    rubrik: 'unterwegs',
    winkelart: 'grenzwert',
    reifegrad: 'skizze',
    kernfrage: 'Ein Netzteil für Notebook und Telefon — wie viel Watt brauche ich?',
    entwarnung: 'Du brauchst nicht die Summe aus beiden Netzteilen.',
    sache:
      'Ein Mehrfachnetzteil handelt die Leistung je Anschluss aus und verteilt eine feste Gesamtleistung; steckt das zweite Gerät dazu, sinkt die Leistung am ersten auf eine niedrigere Stufe.',
    titelmuster: 'uhr',
    system: 'beide',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'feste Spannungsstufen und Aushandlung je Anschluss' },
      { instanz: 'Netzteil-Datenblatt', art: 'hersteller', findet: 'Aufteilungstabelle bei zwei belegten Anschlüssen' },
    ],
    quellenIds: ['usbif-power-delivery'],
    notiz:
      'Der Nachfolger von `ein-netzteil-fuer-alles` aus der alten themen.json. Der offene Punkt bleibt: Die Aufteilung selbst ist gerätespezifisch und steht nur im Datenblatt — einer beteiligten Quelle. Der Standard trägt die Aushandlung, nicht die Aufteilung. Vor dem Bau klären, ob die Aussage auf die Aushandlung eingeengt werden kann.',
  },
  {
    id: 'powerbank-laedt-langsam',
    rubrik: 'unterwegs',
    winkelart: 'diagnose',
    reifegrad: 'skizze',
    kernfrage: 'Die Powerbank lädt mein Notebook kaum. Ist sie zu schwach?',
    entwarnung: 'Die Kapazität ist nicht das Problem.',
    sache:
      'Kapazität und Abgabeleistung sind zwei verschiedene Angaben. Eine große Powerbank kann trotzdem nur eine niedrige Stufe abgeben.',
    titelmuster: 'zweisatz',
    system: 'beide',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Leistungsstufen und ihre Aushandlung' },
    ],
    quellenIds: ['usbif-power-delivery'],
  },
  {
    id: 'kabel-am-flughafen-gekauft',
    rubrik: 'unterwegs',
    winkelart: 'selbsttest',
    reifegrad: 'skizze',
    kernfrage: 'Wie erkenne ich unterwegs in zehn Sekunden, was ein fremdes Kabel kann?',
    entwarnung: 'Du musst es nicht ausprobieren — es steht drauf.',
    sache:
      'Der Standard verlangt eine Kennzeichnung am Stecker; dazwischen gibt es keine Zwischenstufen.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Kennzeichnungspflicht am Stecker, zulässige Leistungsklassen' },
    ],
    quellenIds: ['usbif-kabel-kennzeichnung'],
    notiz:
      'Quelle liegt geprüft vor und trägt bereits `kabel-watt`. Der Winkel muss deutlich anders sein — hier Selbsttest am fremden Kabel, dort Herleitung der Wattzahl.',
  },
  {
    id: 'oeffentliches-wlan-verschluesselt',
    rubrik: 'unterwegs',
    winkelart: 'mythos',
    reifegrad: 'skizze',
    kernfrage: 'Ist offenes WLAN im Café gefährlich?',
    entwarnung: 'Deine Bankdaten liest da niemand mit.',
    sache:
      'Der Verkehr zu Websites ist heute überwiegend transportverschlüsselt; das BSI benennt, was ein offenes Netz noch preisgibt und was nicht.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundesamt für Sicherheit in der Informationstechnik', art: 'behoerde', findet: 'aktuelle Einschätzung zu öffentlichen WLANs' },
    ],
    quellenIds: [],
    notiz:
      'Der Grenzfall ist Pflicht, nicht Kür: Es bleibt ein Rest, und das Video darf nicht mehr Entwarnung geben als die Quelle. Titel darf keine Entwarnung versprechen, die er dann einschränkt.',
  },
  {
    id: 'tethering-langsam',
    rubrik: 'unterwegs',
    winkelart: 'diagnose',
    reifegrad: 'skizze',
    kernfrage: 'Der Hotspot vom Telefon ist langsamer als das Telefon selbst. Warum?',
    entwarnung: 'Weder Telefon noch Vertrag drosseln dich.',
    sache:
      'Beim Tethering läuft der Verkehr über eine zweite Funkstrecke; das WLAN zwischen Telefon und Notebook teilt sich dasselbe Band mit allem anderen im Raum.',
    titelmuster: 'zweisatz',
    system: 'beide',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Allgemeinzuteilung des 2,4-GHz-Bands zur gemeinsamen Nutzung' },
    ],
    quellenIds: ['bnetza-wlan-24ghz-allgemeinzuteilung'],
  },
  {
    id: 'akku-kaelte',
    rubrik: 'unterwegs',
    winkelart: 'uebersehenerPunkt',
    reifegrad: 'skizze',
    kernfrage: 'Warum ist das Telefon im Winter plötzlich bei 20 Prozent aus?',
    entwarnung: 'Der Akku ist nicht kaputt — und er kommt wieder.',
    sache:
      'Lithium-Ionen-Zellen haben einen zulässigen Temperaturbereich; unterhalb davon sinkt die entnehmbare Leistung vorübergehend.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundesanstalt für Materialforschung und -prüfung', art: 'behoerde', findet: 'Temperaturverhalten und Sicherheitsgrenzen von Lithium-Ionen-Zellen' },
      { instanz: 'IEC 62133', art: 'standard', findet: 'Prüfbedingungen und zulässige Temperaturbereiche' },
    ],
    quellenIds: [],
  },
  {
    id: 'ladeziegel-fremd',
    rubrik: 'unterwegs',
    winkelart: 'mythos',
    reifegrad: 'skizze',
    kernfrage: 'Darf ich mein Telefon an einem fremden Netzteil laden?',
    entwarnung: 'Ein stärkeres Netzteil überlädt dein Gerät nicht.',
    sache:
      'Die Leistung wird zwischen Gerät und Netzteil ausgehandelt; das Gerät nimmt, was es anfordert, nicht was das Netzteil hergibt.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Aushandlung durch das angeschlossene Gerät' },
    ],
    quellenIds: ['usbif-power-delivery'],
    notiz:
      'Sehr verbreiteter Irrtum, sauber belegbar, und die Entwarnung ist echt. Kandidat für einen der ersten produzierten Shorts dieser Rubrik.',
  },
  {
    id: 'usb-steckdose-zug',
    rubrik: 'unterwegs',
    winkelart: 'grenzwert',
    reifegrad: 'skizze',
    kernfrage: 'Die USB-Buchse im Zug lädt fast nichts. Kaputt?',
    entwarnung: 'Sie funktioniert — sie ist nur für etwas anderes gebaut.',
    sache:
      'Eine Buchse ohne Aushandlung gibt nur den festgelegten Grundstrom ab. Für ein Telefon reicht das knapp, für ein Notebook nicht.',
    titelmuster: 'uhr',
    system: 'ohne',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Grundstrom ohne Power Delivery' },
    ],
    quellenIds: ['usbif-power-delivery'],
  },
  {
    id: 'flugmodus-akku',
    rubrik: 'unterwegs',
    winkelart: 'mythos',
    reifegrad: 'skizze',
    kernfrage: 'Spart der Flugmodus wirklich Akku?',
    entwarnung: 'Ja — aber nicht aus dem Grund, den die meisten nennen.',
    sache:
      'Der Verbrauch des Funkmoduls steigt, wenn die Verbindung schlecht ist, weil dann mit höherer Leistung gesendet wird.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Leistungsregelung der Endgeräte im Mobilfunk' },
      { instanz: 'Bundesamt für Strahlenschutz', art: 'behoerde', findet: 'Sendeleistung des Telefons in Abhängigkeit von der Empfangsqualität' },
    ],
    quellenIds: [],
    notiz: 'Das BfS hat diese Aussage gut dokumentiert, weil sie auch für die Strahlenfrage zentral ist. Zwei unbeteiligte Instanzen ohne Mühe.',
  },
  {
    id: 'kabellos-laden-langsamer',
    rubrik: 'unterwegs',
    winkelart: 'kompromiss',
    reifegrad: 'skizze',
    kernfrage: 'Was gebe ich auf, wenn ich nur noch kabellos lade?',
    entwarnung: 'Bequemer ist es wirklich.',
    sache:
      'Induktives Laden erreicht geringere Leistungen als die Kabelverbindung und setzt einen Teil der Energie in Wärme um.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Wireless Power Consortium (Qi)', art: 'standard', findet: 'Leistungsklassen der Qi-Spezifikation' },
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Leistungsstufen der Kabelverbindung zum Vergleich' },
    ],
    quellenIds: ['usbif-power-delivery'],
  },
  {
    id: 'roaming-inland-nicht',
    rubrik: 'unterwegs',
    winkelart: 'uebersehenerPunkt',
    reifegrad: 'skizze',
    kernfrage: 'Warum habe ich im Funkloch kein Netz, obwohl ein anderer Anbieter da ist?',
    entwarnung: 'Dein Telefon sucht richtig — es darf nur nicht.',
    sache:
      'Nationales Roaming zwischen deutschen Netzbetreibern ist nicht allgemein vorgeschrieben; die Bundesnetzagentur regelt die Bedingungen dafür gesondert.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Regelungen zu nationalem Roaming und Versorgungsauflagen' },
    ],
    quellenIds: [],
    notiz: 'Grenzfall zur Rubrik Reise. Bleibt Unterwegs, solange keine Landesgrenze vorkommt — genau das ist der Witz der Idee.',
  },
  {
    id: 'rucksack-festplatte',
    rubrik: 'unterwegs',
    winkelart: 'kaufberatung',
    reifegrad: 'skizze',
    kernfrage: 'Verträgt eine externe Festplatte den Weg im Rucksack?',
    entwarnung: 'Der Sturz ist nicht das Hauptproblem.',
    sache:
      'Magnetische Festplatten haben im Betrieb eine deutlich niedrigere zulässige Beschleunigung als im Ruhezustand; Flash-Speicher hat dieses Problem nicht.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Festplatten-Datenblatt', art: 'hersteller', findet: 'zulässige Beschleunigung in Betrieb und Ruhe' },
      { instanz: 'IEC 60068 (Umweltprüfungen)', art: 'standard', findet: 'genormtes Prüfverfahren für Schock und Vibration' },
    ],
    quellenIds: [],
    notiz: 'Belegpfad prüfen: Ob die IEC-Norm frei einsehbar zitierbar ist, ist offen. Notfalls fällt die Idee.',
  },
  {
    id: 'schnellladen-akku-schaden',
    rubrik: 'unterwegs',
    winkelart: 'mythos',
    reifegrad: 'skizze',
    kernfrage: 'Macht Schnellladen den Akku kaputt?',
    entwarnung: 'Der Akku altert davon nicht schneller, als er ohnehin altert.',
    sache:
      'Die Alterung hängt an Ladezyklen, Ladezustand und Temperatur; die Ladeleistung wird vom Gerät begrenzt, sobald die Zelle warm wird.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Umweltbundesamt', art: 'behoerde', findet: 'Lebensdauer und Alterungsfaktoren von Lithium-Ionen-Akkus' },
      { instanz: 'IEC 62133', art: 'standard', findet: 'Zyklenfestigkeit als Prüfkriterium' },
    ],
    quellenIds: [],
    notiz:
      'Heikel wie `blaulichtfilter`: Die Entwarnung muss exakt so weit gehen wie die Quelle. Wenn das UBA differenziert, differenziert das Video auch.',
  },
  {
    id: 'notebook-im-standby-transport',
    rubrik: 'unterwegs',
    winkelart: 'uebersehenerPunkt',
    reifegrad: 'skizze',
    kernfrage: 'Warum ist das Notebook nach dem Weg zur Arbeit warm und leerer?',
    entwarnung: 'Es ist nicht abgestürzt.',
    sache:
      'Im Bereitschaftsbetrieb bleiben Teile des Systems aktiv; die dabei entstehende Wärme kann im geschlossenen Rucksack nicht abgeführt werden.',
    titelmuster: 'zweisatz',
    system: 'beide',
    belegpfad: [
      { instanz: 'Notebook-Datenblatt', art: 'hersteller', findet: 'Betriebsarten und deren Verbrauch' },
      { instanz: 'EU-Ökodesign-Verordnung', art: 'behoerde', findet: 'definierte Betriebszustände und Höchstwerte im Bereitschaftsbetrieb' },
    ],
    quellenIds: [],
    notiz: 'Die Ökodesign-Verordnung ist eine unterschätzte unbeteiligte Quelle für alles zum Thema Stromverbrauch. Merken für weitere Ideen.',
  },
  {
    id: 'zwei-kabel-eine-buchse',
    rubrik: 'unterwegs',
    winkelart: 'reihenfolge',
    reifegrad: 'skizze',
    kernfrage: 'Notebook und Telefon am selben Netzteil — spielt die Reihenfolge eine Rolle?',
    entwarnung: 'Kaputt geht dabei nichts.',
    sache:
      'Die Leistung wird beim Anstecken ausgehandelt; kommt ein Gerät später dazu, wird die Aufteilung neu bestimmt und das erste Gerät fällt auf eine niedrigere Stufe.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Neuaushandlung bei Änderung der Last' },
    ],
    quellenIds: ['usbif-power-delivery'],
    notiz: 'Enge Verwandtschaft zu `netzteil-zwei-geraete` — beide nur produzieren, wenn die Winkel klar auseinanderliegen. Sonst ist es zweimal dasselbe Video.',
  },
];
