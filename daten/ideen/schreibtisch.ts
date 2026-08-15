import type { Idee } from '../../src/typen';

/**
 * Rubrik Schreibtisch — das Gerät steht, nichts davon wird eingepackt.
 *
 * Der ergiebigste Sendeplatz, weil hier drei unbeteiligte Instanzen dauerhaft
 * zuständig sind: die VESA für alles am Bild, das USB Implementers Forum für
 * alles am Kabel, und die Arbeitsstättenverordnung samt DGUV für alles, was
 * den Menschen davor betrifft. Wo eine Idee nur auf Herstellerseiten zu
 * belegen wäre, steht sie hier nicht.
 */
export const schreibtischIdeen: Idee[] = [
  {
    id: 'dock-kein-bild',
    rubrik: 'schreibtisch',
    winkelart: 'diagnose',
    reifegrad: 'produziert',
    kernfrage: 'Das Dock lädt, aber es kommt kein Bild. Was ist kaputt?',
    entwarnung: 'Weder Dock noch Monitor sind defekt.',
    sache:
      'Ein USB-C-Anschluss überträgt nur dann ein Bild, wenn er den DisplayPort Alt Mode unterstützt — und der ist im Standard optional.',
    titelmuster: 'verdaechtiger',
    system: 'beide',
    belegpfad: [
      { instanz: 'VESA', art: 'standard', findet: 'Alt Mode als optionaler Bestandteil der Spezifikation' },
      { instanz: 'Plugable', art: 'hersteller', findet: 'praktische Folge für Docks' },
    ],
    quellenIds: ['vesa-dp-altmode', 'plugable-altmode', 'synaptics-displaylink-funktion'],
    notiz:
      'Läuft als skl-dkb-01. Steht im Vorrat, damit niemand dasselbe ein zweites Mal entwirft — aus themen.json übernommen, das am 14.08.2026 abgelöst wurde.',
  },
  {
    id: 'hdmi-144hz',
    rubrik: 'schreibtisch',
    winkelart: 'diagnose',
    reifegrad: 'skizze',
    kernfrage: 'Der Monitor kann 144 Hz, aber ich bekomme nur 60. Woran liegt das?',
    entwarnung: 'Weder Monitor noch Grafikkarte sind zu schwach.',
    sache:
      'Die Bildwiederholrate hängt an der Bandbreite der Verbindung. HDMI 1.4 trägt bei 1080p keine 144 Hz, DisplayPort 1.2 schon.',
    titelmuster: 'verdaechtiger',
    system: 'beide',
    belegpfad: [
      { instanz: 'VESA', art: 'standard', findet: 'Bandbreite je DisplayPort-Version, Datenrate pro Lane' },
      { instanz: 'HDMI Forum / HDMI Licensing', art: 'standard', findet: 'TMDS-Bandbreite je HDMI-Version' },
      { instanz: 'Monitorhersteller-Datenblatt', art: 'hersteller', findet: 'welche Rate über welchen Eingang anliegt' },
    ],
    quellenIds: [],
    notiz:
      'Die Fehlspur ist stark, weil fast jeder zuerst die Grafikkarte verdächtigt. Der Kern ist eine Bandbreitenrechnung, also `herleitung` möglich statt `fehlspur`.',
  },
  {
    id: 'displayhdr-400',
    rubrik: 'schreibtisch',
    winkelart: 'entlarvung',
    reifegrad: 'skizze',
    kernfrage: 'Auf dem Monitor steht HDR. Warum sieht HDR trotzdem nicht besser aus?',
    entwarnung: 'Dein Auge täuscht dich nicht.',
    sache:
      'DisplayHDR 400 ist die unterste Stufe der VESA-Norm und verlangt weder lokale Dimmung noch einen erweiterten Farbraum. Der Aufkleber sagt also weniger, als er verspricht.',
    titelmuster: 'zweisatz',
    system: 'beide',
    belegpfad: [
      { instanz: 'VESA DisplayHDR', art: 'standard', findet: 'Anforderungstabelle der Stufen 400 bis 1400' },
    ],
    quellenIds: [],
    notiz:
      'Musterbeispiel für „der Witz ist die Tatsache, nüchtern hingestellt": Die Norm nennt die Mindestanforderung selbst. Keine Behauptung über Absichten des Herstellers — das wäre unbelegt.',
  },
  {
    id: 'reaktionszeit-1ms',
    rubrik: 'schreibtisch',
    winkelart: 'entlarvung',
    reifegrad: 'skizze',
    kernfrage: 'Ein Monitor mit 1 ms und einer mit 5 ms — merke ich den Unterschied?',
    entwarnung: 'Die Zahl auf dem Karton ist nicht falsch, sie misst nur etwas anderes.',
    sache:
      'MPRT und GtG sind zwei verschiedene Messverfahren; die VESA hat mit ClearMR ein eigenes Verfahren veröffentlicht, weil die Herstellerangaben nicht vergleichbar waren.',
    titelmuster: 'verdaechtiger',
    system: 'beide',
    belegpfad: [
      { instanz: 'VESA ClearMR', art: 'standard', findet: 'Begründung des Verfahrens, Abgrenzung zu GtG und MPRT' },
    ],
    quellenIds: [],
  },
  {
    id: 'monitor-hub-langsam',
    rubrik: 'schreibtisch',
    winkelart: 'diagnose',
    reifegrad: 'skizze',
    kernfrage: 'Die Festplatte am Monitor-USB ist quälend langsam. Ist sie kaputt?',
    entwarnung: 'Die Platte ist in Ordnung.',
    sache:
      'Viele Monitor-Hubs führen die USB-Anschlüsse nur mit 480 Mbit/s aus. Ein Datenträger kann daran nicht schneller sein als die Verbindung.',
    titelmuster: 'zweisatz',
    system: 'beide',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Datenraten der USB-Generationen, Bezeichnungspflicht' },
      { instanz: 'Monitor-Datenblatt', art: 'hersteller', findet: 'welche Generation der eingebaute Hub führt' },
    ],
    quellenIds: [],
  },
  {
    id: 'zwei-monitore-dock-macos',
    rubrik: 'schreibtisch',
    winkelart: 'haken',
    reifegrad: 'skizze',
    kernfrage: 'Am Dock hängen zwei Monitore, einer bleibt schwarz. Am Windows-Rechner ging es.',
    entwarnung: 'Das Dock ist nicht defekt und du hast nichts falsch angeschlossen.',
    sache:
      'Die Aufteilung eines DisplayPort-Signals auf mehrere Monitore heißt Multi-Stream Transport. Der Standard beschreibt sie, aber sie muss auf beiden Seiten unterstützt werden.',
    titelmuster: 'zweisatz',
    system: 'macos',
    belegpfad: [
      { instanz: 'VESA DisplayPort', art: 'standard', findet: 'MST als optionaler Bestandteil, nicht als Pflicht' },
      { instanz: 'DisplayLink / Synaptics', art: 'hersteller', findet: 'Umgehung über Treiber statt über MST' },
    ],
    quellenIds: ['displaylink-macos-grenzen'],
    notiz:
      'Zwei geprüfte DisplayLink-Quellen liegen bereits in quellen.json und werden bisher von keiner Szene benutzt. Diese Idee ist deshalb schneller belegt als die meisten anderen.',
  },
  {
    id: 'usbc-kabel-laenge',
    rubrik: 'schreibtisch',
    winkelart: 'grenzwert',
    reifegrad: 'skizze',
    kernfrage: 'Mein längeres USB-C-Kabel überträgt kein Bild mehr. Ist es kaputt?',
    entwarnung: 'Das Kabel ist heil — es ist nur zu lang für diese Datenrate.',
    sache:
      'Passive USB-C-Kabel sind ab einer bestimmten Datenrate in der Länge begrenzt; darüber verlangt die Spezifikation aktive Kabel.',
    titelmuster: 'uhr',
    system: 'beide',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Längenbegrenzung passiver Kabel je Datenrate' },
    ],
    quellenIds: [],
  },
  {
    id: 'bildschirmarbeit-abstand',
    rubrik: 'schreibtisch',
    winkelart: 'uebersehenerPunkt',
    reifegrad: 'skizze',
    kernfrage: 'Wie weit weg gehört der Monitor eigentlich?',
    entwarnung: 'Es gibt dafür eine geschriebene Regel — du musst nicht schätzen.',
    sache:
      'Für Bildschirmarbeitsplätze bestehen verbindliche Anforderungen an Sehabstand und Anordnung; die DGUV nennt dazu konkrete Maße.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Arbeitsstättenverordnung, Anhang Nr. 6', art: 'behoerde', findet: 'Anforderungen an Bildschirmarbeitsplätze' },
      { instanz: 'DGUV Information 215-410', art: 'behoerde', findet: 'Sehabstand, Höhe der obersten Zeile, Aufstellwinkel' },
    ],
    quellenIds: [],
    notiz:
      'Gilt am Arbeitsplatz, nicht im Wohnzimmer — die Einschränkung gehört ins Video, sonst behauptet es Geltung, die es nicht hat.',
  },
  {
    id: 'blaulichtfilter',
    rubrik: 'schreibtisch',
    winkelart: 'mythos',
    reifegrad: 'skizze',
    kernfrage: 'Brauche ich eine Blaulichtfilter-Brille vor dem Monitor?',
    entwarnung: 'Deine Augen nehmen vom Bildschirm keinen Schaden.',
    sache:
      'Das Bundesamt für Strahlenschutz sieht bei Bildschirmen keine Gefährdung durch Blaulicht; die Beschwerden am Abend betreffen den Schlaf, nicht die Netzhaut.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundesamt für Strahlenschutz', art: 'behoerde', findet: 'Einordnung von Blaulicht aus Bildschirmen und LED' },
    ],
    quellenIds: [],
    notiz:
      'Heikel: Die Aussage muss exakt so weit gehen wie die Quelle und keinen Schritt weiter. „Kein Schaden an der Netzhaut" ist nicht dasselbe wie „völlig egal".',
  },
  {
    id: 'thunderbolt-gleicher-stecker',
    rubrik: 'schreibtisch',
    winkelart: 'verwechslung',
    reifegrad: 'skizze',
    kernfrage: 'Thunderbolt und USB-C sehen gleich aus. Ist das dasselbe?',
    entwarnung: 'Du hast nicht das falsche Kabel gekauft — die Stecker sind wirklich identisch.',
    sache:
      'Der Steckertyp sagt nichts über das Protokoll. Was durch die Leitung geht, steht im Symbol daneben, nicht in der Form.',
    titelmuster: 'zweisatz',
    system: 'beide',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Steckertyp und Protokoll als getrennte Festlegungen, Logo-Regeln' },
      { instanz: 'Intel', art: 'hersteller', findet: 'Thunderbolt-Kennzeichnung am Anschluss' },
    ],
    quellenIds: [],
  },
  {
    id: 'ueberspannungsschutz-leiste',
    rubrik: 'schreibtisch',
    winkelart: 'kaufberatung',
    reifegrad: 'skizze',
    kernfrage: 'Schützt eine Steckdosenleiste mit Überspannungsschutz meinen Rechner beim Gewitter?',
    entwarnung: 'Die Leiste ist nicht wirkungslos — sie ist nur die letzte von drei Stufen.',
    sache:
      'Überspannungsschutz ist nach Normenreihe in Stufen aufgebaut; eine Steckdosenleiste allein ersetzt den Schutz an der Hauptverteilung nicht.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'DIN VDE 0100-443 / -534', art: 'standard', findet: 'Stufenkonzept des Überspannungsschutzes, Einbauort' },
      { instanz: 'Verband der Elektrotechnik (VDE)', art: 'standard', findet: 'allgemeinverständliche Fassung des Stufenkonzepts' },
    ],
    quellenIds: [],
    notiz: 'Rubrik Schreibtisch, nicht Kaufen: Es geht um den Aufbau am Platz, nicht um eine Kaufempfehlung.',
  },
  {
    id: 'dock-treiber-oder-nicht',
    rubrik: 'schreibtisch',
    winkelart: 'verwechslung',
    reifegrad: 'skizze',
    kernfrage: 'Warum braucht das eine Dock einen Treiber und das andere nicht?',
    entwarnung: 'Kein Dock ist deshalb das schlechtere.',
    sache:
      'Es gibt zwei verschiedene Wege, ein Bild über USB-C zu übertragen: als DisplayPort-Signal durch die Leitung, oder komprimiert über einen Treiber.',
    titelmuster: 'zweisatz',
    system: 'beide',
    belegpfad: [
      { instanz: 'VESA', art: 'standard', findet: 'DisplayPort Alt Mode als optionale Funktion' },
      { instanz: 'Synaptics / DisplayLink', art: 'hersteller', findet: 'Funktionsweise der treibergestützten Übertragung' },
    ],
    quellenIds: ['vesa-dp-altmode', 'plugable-altmode', 'synaptics-displaylink-funktion'],
    notiz:
      'Alle drei Quellen liegen geprüft vor — sie tragen bereits den Dock-Short. Zweitverwendung ist erlaubt, aber der Winkel muss ein anderer sein, sonst sagen zwei Videos dasselbe.',
  },
  {
    id: 'monitor-ton-displayport',
    rubrik: 'schreibtisch',
    winkelart: 'diagnose',
    reifegrad: 'skizze',
    kernfrage: 'Bild kommt an, Ton nicht. Ist der Monitorlautsprecher kaputt?',
    entwarnung: 'Der Lautsprecher ist in Ordnung.',
    sache:
      'Der Ton läuft über dieselbe Leitung wie das Bild, wird aber als eigenes Ausgabegerät geführt und muss dort ausgewählt werden.',
    titelmuster: 'verdaechtiger',
    system: 'beide',
    belegpfad: [
      { instanz: 'VESA DisplayPort', art: 'standard', findet: 'Audiotransport als Bestandteil der Verbindung' },
    ],
    quellenIds: [],
    notiz: 'Schwacher Belegpfad — nur eine unbeteiligte Instanz, und die Aussage ist eher Bedienung als Technik. Vor dem Bau prüfen, ob genug trägt.',
  },
  {
    id: 'funkmaus-stoert-wlan',
    rubrik: 'schreibtisch',
    winkelart: 'diagnose',
    reifegrad: 'skizze',
    kernfrage: 'Die Funkmaus hakt, seit der Rechner am Dock hängt. Zufall?',
    entwarnung: 'Weder Maus noch Dock sind defekt.',
    sache:
      'Funkmäuse und WLAN teilen sich dasselbe Frequenzband; die Bundesnetzagentur weist es ausdrücklich zur gemeinsamen Nutzung zu.',
    titelmuster: 'verdaechtiger',
    system: 'beide',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Allgemeinzuteilung des 2,4-GHz-Bands zur gemeinsamen Nutzung' },
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Störaussendung von USB-3-Verbindungen im 2,4-GHz-Bereich' },
    ],
    quellenIds: ['bnetza-wlan-24ghz-allgemeinzuteilung'],
    notiz:
      'Die BNetzA-Quelle ist geprüft und trägt schon den WLAN-Short. Der zweite Beleg ist der interessante: Die USB-3-Störung ist ein bekanntes, dokumentiertes Phänomen.',
  },
  {
    id: 'kaltgeraetestecker-belastung',
    rubrik: 'schreibtisch',
    winkelart: 'grenzwert',
    reifegrad: 'skizze',
    kernfrage: 'Kann ich jedes Kaltgerätekabel an jedes Gerät stecken?',
    entwarnung: 'Für den Schreibtisch: fast immer ja.',
    sache:
      'Die Bauformen der Gerätesteckvorrichtungen sind genormt und tragen unterschiedliche Ströme und Temperaturen — der Unterschied ist die Kerbe, nicht die Farbe.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'IEC 60320', art: 'standard', findet: 'Bauformen C13/C14, C15, C19 mit Strom- und Temperaturangabe' },
    ],
    quellenIds: [],
  },
  {
    id: 'monitor-usbc-65w',
    rubrik: 'schreibtisch',
    winkelart: 'grenzwert',
    reifegrad: 'skizze',
    kernfrage: 'Der Monitor lädt mein Notebook, aber langsamer als das Netzteil. Ist das normal?',
    entwarnung: 'Ja — und es steht im Datenblatt, nur nicht auf der Vorderseite.',
    sache:
      'Ein Monitor mit Stromversorgung über USB-C gibt eine feste Leistung ab, die unabhängig vom Netzteil des Notebooks ist.',
    titelmuster: 'uhr',
    system: 'beide',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Aushandlung der Leistung, feste Spannungsstufen' },
      { instanz: 'Monitor-Datenblatt', art: 'hersteller', findet: 'abgegebene Leistung am USB-C-Eingang' },
    ],
    quellenIds: ['usbif-power-delivery'],
  },
  {
    id: 'webcam-usb2-4k',
    rubrik: 'schreibtisch',
    winkelart: 'diagnose',
    reifegrad: 'skizze',
    kernfrage: 'Die 4K-Webcam liefert nur ein grieseliges Bild. Ist sie schlecht?',
    entwarnung: 'Die Kamera kann mehr, als bei dir ankommt.',
    sache:
      'Unkomprimiertes Video braucht mehr Bandbreite, als eine USB-2.0-Verbindung bereitstellt; die Kamera muss dann komprimieren oder die Auflösung senken.',
    titelmuster: 'zweisatz',
    system: 'beide',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Bruttodatenrate USB 2.0 gegenüber USB 3.2' },
    ],
    quellenIds: [],
    notiz: 'Die Herleitung ist die Stärke: Auflösung × Farbtiefe × Bilder je Sekunde, vor den Augen gerechnet.',
  },
  {
    id: 'dp-kabel-zertifiziert',
    rubrik: 'schreibtisch',
    winkelart: 'kaufberatung',
    reifegrad: 'skizze',
    kernfrage: 'Woran erkenne ich ein DisplayPort-Kabel, das die volle Auflösung schafft?',
    entwarnung: 'Du musst dafür keine Datenblätter lesen — es steht auf dem Kabel.',
    sache:
      'Die VESA vergibt für DisplayPort-Kabel Zertifizierungsstufen mit eigenem Aufdruck; ohne diesen Aufdruck ist die Datenrate nicht zugesichert.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'VESA', art: 'standard', findet: 'Zertifizierungsstufen für DisplayPort-Kabel und deren Kennzeichnung' },
    ],
    quellenIds: [],
    notiz:
      'Achtung Rubrik: Das ist Kaufberatung im Wortsinn, aber es geht um den festen Platz und trägt keine Links. Falls es nach Kaufen rutscht, muss es dort einen anderen Winkel bekommen.',
  },
  {
    id: 'monitor-skalierung-unscharf',
    rubrik: 'schreibtisch',
    winkelart: 'diagnose',
    reifegrad: 'skizze',
    kernfrage: 'Schrift auf dem zweiten Monitor sieht unscharf aus. Ist der Monitor schlechter?',
    entwarnung: 'Das Panel ist nicht schlechter.',
    sache:
      'Wird ein Bild nicht in der physikalischen Auflösung des Panels ausgegeben, muss es umgerechnet werden — dabei fallen Pixel nicht mehr auf Pixel.',
    titelmuster: 'verdaechtiger',
    system: 'beide',
    belegpfad: [
      { instanz: 'VESA', art: 'standard', findet: 'native Auflösung als Eigenschaft des Panels' },
    ],
    quellenIds: [],
    notiz: 'Belegpfad dünn. Vor dem Bau prüfen, ob sich das über eine Norm sagen lässt oder nur über Herstellerdokumentation.',
  },
  {
    id: 'usb-namen-generationen',
    rubrik: 'schreibtisch',
    winkelart: 'entlarvung',
    reifegrad: 'skizze',
    kernfrage: 'USB 3.0, 3.1 Gen 1, 3.2 Gen 1 — was ist der Unterschied?',
    entwarnung: 'Es gibt keinen. Du hast nichts übersehen.',
    sache:
      'Dieselbe Datenrate wurde bei jeder Fassung der Spezifikation neu benannt; das USB-IF empfiehlt inzwischen, die Geschwindigkeit statt der Versionsnummer anzugeben.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Umbenennungshistorie und aktuelle Bezeichnungsempfehlung' },
    ],
    quellenIds: [],
    notiz:
      'Das Lustigste ist hier die Tatsache selbst, nüchtern hingestellt — drei Namen, eine Geschwindigkeit. Keine Unterstellung über Absichten.',
  },
  {
    id: 'strom-usb-hub-eigen',
    rubrik: 'schreibtisch',
    winkelart: 'diagnose',
    reifegrad: 'skizze',
    kernfrage: 'Die externe Festplatte am Hub meldet sich ab. Zu wenig Strom?',
    entwarnung: 'Die Platte ist nicht defekt — sie bekommt zu wenig ab.',
    sache:
      'Ein Anschluss gibt ohne Aushandlung nur einen festgelegten Grundstrom ab; teilen sich mehrere Geräte einen Hub ohne eigene Stromversorgung, reicht das nicht.',
    titelmuster: 'uhr',
    system: 'beide',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Grundstrom je Anschluss ohne Power Delivery, Verhalten am Hub' },
    ],
    quellenIds: ['usbif-power-delivery'],
  },
];
