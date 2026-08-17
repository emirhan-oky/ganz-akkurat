import type { HauptvideoIdee } from '../../src/typen';

/**
 * Ideen, die als Short nicht tragen — und warum.
 *
 * Beim Umbau auf sieben Formate am 16.08.2026 sind zwei Pruefsteine
 * dazugekommen, und sie haben genau diese Ideen aussortiert:
 *
 * - **Keine Vorgeschichte.** „Der Monitor kann 144 Hz, aber ich bekomme nur
 *   60" setzt voraus, dass jemand gerade dieses Problem hat. Im Feed hat er
 *   es nicht, und nach zwei Sekunden ist er weg.
 * - **Keine Handlung.** „Pruef das in zehn Sekunden nach" verlangt, dass
 *   jemand aufsteht. Ein Format, das Arbeit verlangt, verliert.
 *
 * Beides sind gute Themen — nur nicht fuer Shorts. Sie stehen hier, weil die
 * Recherche daran haengt: `belegpfad` nennt je Idee die Instanz, die die
 * Aussage tragen koennte. Das ist der teure Teil, und er ueberlebt den
 * Formatwechsel. Sobald es lange Videos gibt, faengt der Vorrat hier an.
 *
 * Kein Skript liest diese Liste. Sie wird von `tsc` geprueft und sonst von
 * niemandem — das ist Absicht: Sie soll die Wochenlaufpruefung nicht faerben.
 */
export const hauptvideoIdeen: HauptvideoIdee[] = [
  {
    id: 'wattstunden-aufdruck-fehlt',
    warum: 'verlangt eine Handlung im Moment der Not',
    sachgebiet: 'laden',
    kernfrage: 'Auf meiner Powerbank steht keine Wattstundenzahl. Was jetzt?',
    dreh: 'Du kannst sie am Gate selbst ausrechnen.',
    sache:
      'Die Umrechnung von Milliamperestunden in Wattstunden geht über die Zellspannung und ist ein einziger Rechenschritt.',
    belegpfad: [
      { instanz: 'Luftfahrt-Bundesamt', art: 'behoerde', findet: 'Grenze in Wattstunden' },
    ],
    notiz:
      'Überschneidet sich stark mit dem laufenden `powerbank-flug` (Winkelart `umrechnung`). Nur bauen, wenn dort die Notlage nicht schon abgedeckt ist — sonst zweimal dasselbe Video.',
  },
  {
    id: 'dock-kein-bild',
    warum: 'braucht eine Vorgeschichte („mein Dock lädt, aber…") — im Feed ist die nicht da',
    sachgebiet: 'rechner',
    kernfrage: 'Das Dock lädt, aber es kommt kein Bild. Was ist kaputt?',
    dreh: 'Weder Dock noch Monitor sind defekt.',
    sache:
      'Ein USB-C-Anschluss überträgt nur dann ein Bild, wenn er den DisplayPort Alt Mode unterstützt — und der ist im Standard optional.',
    belegpfad: [
      { instanz: 'VESA', art: 'standard', findet: 'Alt Mode als optionaler Bestandteil der Spezifikation' },
      { instanz: 'Plugable', art: 'hersteller', findet: 'praktische Folge für Docks' },
    ],
    notiz:
      'Läuft als skl-dkb-01. Steht im Vorrat, damit niemand dasselbe ein zweites Mal entwirft — aus themen.json übernommen, das am 14.08.2026 abgelöst wurde.',
  },
  {
    id: 'hdmi-144hz',
    warum: 'braucht eine Vorgeschichte („mein Dock lädt, aber…") — im Feed ist die nicht da',
    sachgebiet: 'rechner',
    kernfrage: 'Der Monitor kann 144 Hz, aber ich bekomme nur 60. Woran liegt das?',
    dreh: 'Weder Monitor noch Grafikkarte sind zu schwach.',
    sache:
      'Die Bildwiederholrate hängt an der Bandbreite der Verbindung. HDMI 1.4 trägt bei 1080p keine 144 Hz, DisplayPort 1.2 schon.',
    belegpfad: [
      { instanz: 'VESA', art: 'standard', findet: 'Bandbreite je DisplayPort-Version, Datenrate pro Lane' },
      { instanz: 'HDMI Forum / HDMI Licensing', art: 'standard', findet: 'TMDS-Bandbreite je HDMI-Version' },
      { instanz: 'Monitorhersteller-Datenblatt', art: 'hersteller', findet: 'welche Rate über welchen Eingang anliegt' },
    ],
    notiz:
      'Die Fehlspur ist stark, weil fast jeder zuerst die Grafikkarte verdächtigt. Der Kern ist eine Bandbreitenrechnung, also `herleitung` möglich statt `fehlspur`.',
  },
  {
    id: 'monitor-hub-langsam',
    warum: 'braucht eine Vorgeschichte („mein Dock lädt, aber…") — im Feed ist die nicht da',
    sachgebiet: 'rechner',
    kernfrage: 'Die Festplatte am Monitor-USB ist quälend langsam. Ist sie kaputt?',
    dreh: 'Die Platte ist in Ordnung.',
    sache:
      'Viele Monitor-Hubs führen die USB-Anschlüsse nur mit 480 Mbit/s aus. Ein Datenträger kann daran nicht schneller sein als die Verbindung.',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Datenraten der USB-Generationen, Bezeichnungspflicht' },
      { instanz: 'Monitor-Datenblatt', art: 'hersteller', findet: 'welche Generation der eingebaute Hub führt' },
    ],
  },
  {
    id: 'monitor-ton-displayport',
    warum: 'braucht eine Vorgeschichte („mein Dock lädt, aber…") — im Feed ist die nicht da',
    sachgebiet: 'rechner',
    kernfrage: 'Bild kommt an, Ton nicht. Ist der Monitorlautsprecher kaputt?',
    dreh: 'Der Lautsprecher ist in Ordnung.',
    sache:
      'Der Ton läuft über dieselbe Leitung wie das Bild, wird aber als eigenes Ausgabegerät geführt und muss dort ausgewählt werden.',
    belegpfad: [
      { instanz: 'VESA DisplayPort', art: 'standard', findet: 'Audiotransport als Bestandteil der Verbindung' },
    ],
    notiz: 'Schwacher Belegpfad — nur eine unbeteiligte Instanz, und die Aussage ist eher Bedienung als Technik. Vor dem Bau prüfen, ob genug trägt.',
  },
  {
    id: 'funkmaus-stoert-wlan',
    warum: 'braucht eine Vorgeschichte („mein Dock lädt, aber…") — im Feed ist die nicht da',
    sachgebiet: 'rechner',
    kernfrage: 'Die Funkmaus hakt, seit der Rechner am Dock hängt. Zufall?',
    dreh: 'Weder Maus noch Dock sind defekt.',
    sache:
      'Funkmäuse und WLAN teilen sich dasselbe Frequenzband; die Bundesnetzagentur weist es ausdrücklich zur gemeinsamen Nutzung zu.',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Allgemeinzuteilung des 2,4-GHz-Bands zur gemeinsamen Nutzung' },
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Störaussendung von USB-3-Verbindungen im 2,4-GHz-Bereich' },
    ],
    notiz:
      'Die BNetzA-Quelle ist geprüft und trägt schon den WLAN-Short. Der zweite Beleg ist der interessante: Die USB-3-Störung ist ein bekanntes, dokumentiertes Phänomen.',
  },
  {
    id: 'webcam-usb2-4k',
    warum: 'braucht eine Vorgeschichte („mein Dock lädt, aber…") — im Feed ist die nicht da',
    sachgebiet: 'rechner',
    kernfrage: 'Die 4K-Webcam liefert nur ein grieseliges Bild. Ist sie schlecht?',
    dreh: 'Die Kamera kann mehr, als bei dir ankommt.',
    sache:
      'Unkomprimiertes Video braucht mehr Bandbreite, als eine USB-2.0-Verbindung bereitstellt; die Kamera muss dann komprimieren oder die Auflösung senken.',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Bruttodatenrate USB 2.0 gegenüber USB 3.2' },
    ],
    notiz: 'Die Herleitung ist die Stärke: Auflösung × Farbtiefe × Bilder je Sekunde, vor den Augen gerechnet.',
  },
  {
    id: 'monitor-skalierung-unscharf',
    warum: 'braucht eine Vorgeschichte („mein Dock lädt, aber…") — im Feed ist die nicht da',
    sachgebiet: 'rechner',
    kernfrage: 'Schrift auf dem zweiten Monitor sieht unscharf aus. Ist der Monitor schlechter?',
    dreh: 'Das Panel ist nicht schlechter.',
    sache:
      'Wird ein Bild nicht in der physikalischen Auflösung des Panels ausgegeben, muss es umgerechnet werden — dabei fallen Pixel nicht mehr auf Pixel.',
    belegpfad: [
      { instanz: 'VESA', art: 'standard', findet: 'native Auflösung als Eigenschaft des Panels' },
    ],
    notiz: 'Belegpfad dünn. Vor dem Bau prüfen, ob sich das über eine Norm sagen lässt oder nur über Herstellerdokumentation.',
  },
  {
    id: 'strom-usb-hub-eigen',
    warum: 'braucht eine Vorgeschichte („mein Dock lädt, aber…") — im Feed ist die nicht da',
    sachgebiet: 'rechner',
    kernfrage: 'Die externe Festplatte am Hub meldet sich ab. Zu wenig Strom?',
    dreh: 'Die Platte ist nicht defekt — sie bekommt zu wenig ab.',
    sache:
      'Ein Anschluss gibt ohne Aushandlung nur einen festgelegten Grundstrom ab; teilen sich mehrere Geräte einen Hub ohne eigene Stromversorgung, reicht das nicht.',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Grundstrom je Anschluss ohne Power Delivery, Verhalten am Hub' },
    ],
  },
  {
    id: 'powerbank-laedt-langsam',
    warum: 'braucht eine Vorgeschichte („mein Dock lädt, aber…") — im Feed ist die nicht da',
    sachgebiet: 'laden',
    kernfrage: 'Die Powerbank lädt mein Notebook kaum. Ist sie zu schwach?',
    dreh: 'Die Kapazität ist nicht das Problem.',
    sache:
      'Kapazität und Abgabeleistung sind zwei verschiedene Angaben. Eine große Powerbank kann trotzdem nur eine niedrige Stufe abgeben.',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Leistungsstufen und ihre Aushandlung' },
    ],
  },
  {
    id: 'kabel-am-flughafen-gekauft',
    warum: 'verlangt eine Handlung: aufstehen und nachsehen',
    sachgebiet: 'laden',
    kernfrage: 'Wie erkenne ich unterwegs in zehn Sekunden, was ein fremdes Kabel kann?',
    dreh: 'Du musst es nicht ausprobieren — es steht drauf.',
    sache:
      'Der Standard verlangt eine Kennzeichnung am Stecker; dazwischen gibt es keine Zwischenstufen.',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Kennzeichnungspflicht am Stecker, zulässige Leistungsklassen' },
    ],
    notiz:
      'Quelle liegt geprüft vor und trägt bereits `kabel-watt`. Der Winkel muss deutlich anders sein — hier Selbsttest am fremden Kabel, dort Herleitung der Wattzahl.',
  },
  {
    id: 'tethering-langsam',
    warum: 'braucht eine Vorgeschichte („mein Dock lädt, aber…") — im Feed ist die nicht da',
    sachgebiet: 'laden',
    kernfrage: 'Der Hotspot vom Telefon ist langsamer als das Telefon selbst. Warum?',
    dreh: 'Weder Telefon noch Vertrag drosseln dich.',
    sache:
      'Beim Tethering läuft der Verkehr über eine zweite Funkstrecke; das WLAN zwischen Telefon und Notebook teilt sich dasselbe Band mit allem anderen im Raum.',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Allgemeinzuteilung des 2,4-GHz-Bands zur gemeinsamen Nutzung' },
    ],
  },
  {
    id: 'zwei-kabel-eine-buchse',
    warum: 'verlangt eine Handlung: umstecken und neu probieren',
    sachgebiet: 'laden',
    kernfrage: 'Notebook und Telefon am selben Netzteil — spielt die Reihenfolge eine Rolle?',
    dreh: 'Kaputt geht dabei nichts.',
    sache:
      'Die Leistung wird beim Anstecken ausgehandelt; kommt ein Gerät später dazu, wird die Aufteilung neu bestimmt und das erste Gerät fällt auf eine niedrigere Stufe.',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Neuaushandlung bei Änderung der Last' },
    ],
    notiz: 'Enge Verwandtschaft zu `netzteil-zwei-geraete` — beide nur produzieren, wenn die Winkel klar auseinanderliegen. Sonst ist es zweimal dasselbe Video.',
  },
  {
    id: 'wlan-kanal-selbst-setzen',
    warum: 'verlangt eine Handlung: aufstehen und nachsehen',
    sachgebiet: 'netz',
    kernfrage: 'Soll ich den WLAN-Kanal von Hand einstellen?',
    dreh: 'Der Automatik kannst du meistens vertrauen.',
    sache:
      'Das Band ist zur gemeinsamen Nutzung zugeteilt und in überlappende Kanäle geteilt; nur wenige liegen wirklich störungsfrei nebeneinander.',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Kanalaufteilung und Allgemeinzuteilung des 2,4-GHz-Bands' },
    ],
  },
  {
    id: 'fernseher-hdmi-arc',
    warum: 'verlangt eine Handlung: umstecken und neu probieren',
    sachgebiet: 'netz',
    kernfrage: 'Der Ton der Soundbar kommt nicht. Falscher Anschluss?',
    dreh: 'Kabel und Soundbar sind in Ordnung.',
    sache:
      'Der Rückkanal für Ton läuft nur über einen bestimmten, gekennzeichneten Anschluss am Fernseher — nicht über jeden.',
    belegpfad: [
      { instanz: 'HDMI Forum', art: 'standard', findet: 'Audio Return Channel als Eigenschaft bestimmter Anschlüsse' },
    ],
  },
  {
    id: 'streaming-ruckelt-abends',
    warum: 'braucht eine Vorgeschichte („mein Dock lädt, aber…") — im Feed ist die nicht da',
    sachgebiet: 'netz',
    kernfrage: 'Streaming ruckelt abends. Ist die Leitung zu langsam?',
    dreh: 'Deine Leitung ist nicht schlechter geworden.',
    sache:
      'Die Bundesnetzagentur unterscheidet die vertraglich zugesicherte von der tatsächlich verfügbaren Rate und misst die Abweichung regelmäßig.',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Messverfahren, zugesicherte gegenüber tatsächlicher Rate' },
    ],
    notiz: 'Verwandt mit dem laufenden `wlan-abends`, aber anderer Zugriff: dort das Funkband, hier die Leitung. Vor dem Bau gegen den bestehenden Short halten.',
  },
];
