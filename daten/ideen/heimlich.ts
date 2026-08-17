import type { Idee } from '../../src/typen';

/**
 * Freitag · Das macht dein Gerät heimlich — was es an dir tut, ohne zu fragen.
 *
 * Dieser Sendeplatz hat die schaerfste Hausregel des ganzen Kanals: **Es muss
 * in einem Dokument stehen.** „Dein Handy hoert mit" waere die billigste
 * Behauptung der Welt, sie wuerde jedes Mal funktionieren, und genau deshalb
 * ist sie hier verboten.
 *
 * Der Grund ist nicht Vorsicht, sondern Selbsterhalt: Ein Kanal, der beim
 * Ueberwachungsthema einmal ohne Beleg behauptet, ist danach einer von
 * hunderttausend. Der Beleg ist hier nicht die Pflicht, sondern der ganze
 * Unterschied.
 */
export const heimlichIdeen: Idee[] = [
  {
    id: 'smarttv-sprache',
    format: 'heimlich',
    sachgebiet: 'bildschirm',
    reifegrad: 'produziert',
    erzaehlt: 'Dein Fernseher kann Sprachbefehle aufzeichnen und leitet sie an einen Cloud-Server weiter.',
    dreh: 'Beide Hälften stehen wörtlich beim BSI — dass aufgezeichnet wird und dass es das Haus verlässt.',
    sache: 'BSI-Verbraucherseite zu Smart-TV, Abschnitt zu Sprachsteuerung und eingebauten Mikrofonen.',
    belegpfad: [{ instanz: 'BSI', art: 'behoerde', findet: 'Aufzeichnung von Sprachbefehlen, Weiterleitung an Cloud-Server' }],
    quellenIds: ['bsi-smarttv-sprachbefehle'],
  },
  {
    id: 'drucker-gelbe-punkte',
    format: 'heimlich',
    sachgebiet: 'drucken',
    reifegrad: 'skizze',
    erzaehlt: 'Dein Drucker setzt auf jede Seite eine Kennung, die zu genau diesem Gerät zurückführt.',
    dreh: 'Nicht abschaltbar und vom Hersteller nicht dokumentiert — das steht wörtlich beim BSI.',
    sache: 'Das BSI führt die „Yellow Dots" im IT-Grundschutz: nicht dokumentiert und nicht abschaltbar.',
    belegpfad: [{ instanz: 'BSI', art: 'behoerde', findet: 'IT-Grundschutz SYS.4.1, Umsetzungshinweise' }],
    quellenIds: ['bsi-yellow-dots'],
    notiz:
      'Am 17.08.2026 belegt. Der Beleg trägt **weniger** als die ursprüngliche Idee: Das BSI schreibt, dass ' +
      'ein Ausdruck „einem konkreten Drucker zugeordnet werden kann", und nicht, dass Seriennummer und ' +
      'Uhrzeit codiert sind. Das Video darf also nur das Erste behaupten. Der Kipppunkt bleibt trotzdem ' +
      'stark, weil er wörtlich dasteht: nicht dokumentiert und nicht abschaltbar.',
  },
  {
    id: 'auto-ereignisspeicher',
    format: 'heimlich',
    sachgebiet: 'fahren',
    reifegrad: 'skizze',
    erzaehlt: 'Dein Auto schreibt mit, wie schnell du warst und wann du gebremst hast. In Neuwagen ist das Pflicht.',
    dreh: 'Nicht der Hersteller hat es eingebaut, sondern der Gesetzgeber verlangt es.',
    sache: 'EU-Verordnung 2019/2144, Ereignisbezogenes Datenaufzeichnungssystem, verbindlich seit Juli 2024.',
    belegpfad: [{ instanz: 'Europäische Union', art: 'behoerde', findet: 'Verordnung 2019/2144, Definitionsartikel' }],
    quellenIds: ['eu-ereignisdatenspeicher'],
    notiz:
      'Am 17.08.2026 belegt. Die Verordnung ist enger als die Erzählung: aufgezeichnet wird „kurz vor, ' +
      'während und unmittelbar nach einem Aufprall", nicht die ganze Fahrt. Wer „dein Auto schreibt mit, ' +
      'wie schnell du warst" sagt, muss diesen Halbsatz mitliefern — sonst ist es eine Übertreibung, die ' +
      'die eigene Quelle widerlegt.',
  },
  {
    id: 'exif-im-foto',
    format: 'heimlich',
    sachgebiet: 'handy',
    reifegrad: 'skizze',
    erzaehlt: 'In jedem Foto steckt mehr als das Bild: Uhrzeit, Gerät, Objektiv — und oft der Ort auf zehn Meter genau.',
    dreh: 'Das Bild ist die kleinere Hälfte der Datei.',
    sache: 'EXIF-Felder und ihre Voreinstellungen; Genauigkeit der Ortsangabe.',
    belegpfad: [
      { instanz: 'BSI', art: 'behoerde', findet: 'Hinweise zu Metadaten in Bilddateien' },
      { instanz: 'Datenschutzaufsichtsbehörde', art: 'behoerde', findet: 'Merkblatt zu Standortdaten in Fotos' },
    ],
    quellenIds: [],
  },
  {
    id: 'hbbtv-roter-knopf',
    format: 'heimlich',
    sachgebiet: 'bildschirm',
    reifegrad: 'skizze',
    erzaehlt: 'Wenn im Fernsehen der rote Knopf erscheint, weiß der Sender schon, dass du eingeschaltet hast.',
    dreh: 'Das Angebot ist der Rückkanal. Man muss nichts drücken, damit es funktioniert.',
    sache: 'HbbTV baut beim Umschalten eine Verbindung zum Anbieter auf, bevor der Zuschauer etwas tut.',
    belegpfad: [
      { instanz: 'Landesmedienanstalt', art: 'behoerde', findet: 'Verfahren oder Hinweis zur HbbTV-Datenübertragung' },
      { instanz: 'Datenschutzaufsichtsbehörde', art: 'behoerde', findet: 'Prüfbericht zu Smart-TV-Rückkanälen' },
    ],
    quellenIds: [],
    notiz: 'Gelber Punkt: „hat schon erfahren" muss genau belegt sein — wann genau die Verbindung aufgebaut wird.',
  },
  {
    id: 'drucker-meldet-fuellstand',
    format: 'heimlich',
    sachgebiet: 'drucken',
    reifegrad: 'skizze',
    erzaehlt: 'Der Drucker meldet dem Hersteller, wie voll deine Patrone ist — und wann sie leer sein wird.',
    dreh: 'Der Nachbestelldienst ist kein Service, sondern der Grund für die Meldung.',
    sache: 'Datenschutzerklärungen zu Nachfülldiensten nennen Füllstand und Prognose ausdrücklich.',
    belegpfad: [
      { instanz: 'Datenschutzaufsichtsbehörde', art: 'behoerde', findet: 'Prüfung von Nachbestelldiensten bei Druckern' },
      { instanz: 'Hersteller', art: 'hersteller', findet: 'Datenschutzerklärung des Nachfülldienstes' },
    ],
    quellenIds: [],
  },
  {
    id: 'auto-sendet-daten',
    format: 'heimlich',
    sachgebiet: 'fahren',
    reifegrad: 'skizze',
    erzaehlt: 'Dein Auto sendet im Betrieb Daten an den Hersteller — nicht nur beim Unfall.',
    dreh: 'Die Abgrenzung zum Ereignisdatenspeicher ist der Punkt: Der schreibt lokal mit, das hier verlässt das Fahrzeug.',
    sache: 'Die Leitlinien des Europäischen Datenschutzausschusses zu vernetzten Fahrzeugen beschreiben die Datenflüsse.',
    belegpfad: [
      { instanz: 'Europäischer Datenschutzausschuss', art: 'behoerde', findet: 'Leitlinien 01/2020 zu vernetzten Fahrzeugen' },
    ],
    quellenIds: [],
    notiz: 'Sauber vom bereits belegten Ereignisdatenspeicher trennen, sonst sind es zwei Videos über dieselbe Sache.',
  },
  {
    id: 'saugroboter-karte',
    format: 'heimlich',
    sachgebiet: 'netz',
    reifegrad: 'skizze',
    erzaehlt: 'Dein Saugroboter hat einen Grundriss deiner Wohnung angelegt. Er liegt nicht nur bei dir.',
    dreh: 'Gekauft wurde ein Staubsauger. Entstanden ist ein Vermessungsgerät.',
    sache: 'Kartierung, Speicherort der Karte und Übertragung — was steht dazu in einer amtlichen Handreichung?',
    belegpfad: [
      { instanz: 'Bundesamt für Sicherheit in der Informationstechnik', art: 'behoerde', findet: 'Hinweise zu Smart-Home-Geräten und Kartendaten' },
      { instanz: 'Datenschutzkonferenz', art: 'behoerde', findet: 'Orientierungshilfe zu vernetzten Haushaltsgeräten' },
    ],
    quellenIds: [],
  },
  {
    id: 'handy-sucht-immer',
    format: 'heimlich',
    sachgebiet: 'netz',
    reifegrad: 'skizze',
    erzaehlt: 'Dein Telefon ruft ständig nach WLAN-Netzen, auch wenn du keins benutzt.',
    dreh: 'Diese Rufe sind erkennbar. In Innenstädten wird damit gezählt, wer vorbeigeht.',
    sache: 'Probe Requests, MAC-Adressen und die Frage, wie weit die Zufallsvergabe das aufhebt.',
    belegpfad: [
      { instanz: 'Bundesamt für Sicherheit in der Informationstechnik', art: 'behoerde', findet: 'Beschreibung der Ortung über WLAN-Suchanfragen' },
      { instanz: 'Datenschutzaufsicht', art: 'behoerde', findet: 'Bewertung von WLAN-Tracking im öffentlichen Raum' },
    ],
    quellenIds: [],
  },
  {
    id: 'fernseher-erkennt-bild',
    format: 'heimlich',
    sachgebiet: 'bildschirm',
    reifegrad: 'skizze',
    erzaehlt: 'Dein Fernseher erkennt am Bild selbst, was du gerade siehst — auch bei der Spielkonsole.',
    dreh: 'Das läuft unabhängig von der App und damit auch bei Geräten, die gar nichts melden wollen.',
    sache: 'Automatische Inhaltserkennung: Bildausschnitte werden abgeglichen, nicht Sendernamen gemeldet.',
    belegpfad: [
      { instanz: 'Datenschutzkonferenz', art: 'behoerde', findet: 'Orientierungshilfe zu Smart-TVs und Inhaltserkennung' },
    ],
    quellenIds: [],
    notiz: 'Nah am schon produzierten Mikrofon-Short. Nur bauen, wenn die Inhaltserkennung selbst der Kern ist.',
  },
];
