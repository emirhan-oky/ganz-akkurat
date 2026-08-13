import type { Short } from '../../src/typen';

/**
 * Rubrik Unterwegs — „In 10 Sekunden: Du brauchst kein neues Netzteil"
 *
 * Die Rubrik trägt den Alltagsweg: Es geht um Ausdauer, nicht um Erlaubnis.
 * Sobald eine Vorschrift mitentscheidet, wäre es Reise — hier entscheidet
 * niemand außer der Physik.
 *
 * Die Herleitung ist der Kern: Wer einmal gesehen hat, dass 100 Watt aus
 * 20 Volt mal 5 Ampere entstehen, versteht auch, warum ein Kabel überhaupt
 * eine Rolle spielt. Die Spannung ist bei beiden Klassen gleich — der
 * Unterschied steckt allein in der Stromstärke, und die trägt das Kabel.
 */

const HASHTAGS = ['#usbc', '#laden', '#powerdelivery', '#technikwissen', '#setupklar'];

export const kabelWatt: Short[] = [
  {
    id: 'skl-kbw-01',
    themaId: 'kabel-watt',
    rubrik: 'unterwegs',
    arbeitstitel: 'In 10 Sekunden: Du brauchst kein neues Netzteil',
    winkelart: 'grenzwert',

    system: 'ohne',
    /*
     * Die Matrix empfiehlt fuer `grenzwert` den Zweisatz. Hier ist bewusst
     * `uhr` gesetzt, aus zwei Gruenden: Der Lauf haette sonst dreimal
     * denselben Bau (Powerbank und Garantie sind beide Zweisatz), und der
     * Inhalt traegt die Uhr wirklich — zehn Sekunden aufs Kabel schauen
     * gegen den Preis eines neuen Netzteils.
     */
    titelmuster: 'uhr',
    vertiefung: 'herleitung',
    merksatz: 'Die Wattzahl steht am Kabel, nicht am Netzteil.',

    szenen: [
      {
        /*
         * Hook und Endkarte sind am 13.08.2026 ausgebaut worden, um Abstand
         * zur Fenstergrenze zu gewinnen: Derselbe Text kam bei zwei
         * Vertonungen einmal auf 75,3 und einmal auf 70,5 Sekunden. Die
         * Sprachsynthese liefert nicht zweimal dieselbe Aufnahme, und rund
         * sechs Prozent Unterschied entscheiden ueber das Zielfenster. Wer
         * knapp an der Kante baut, faellt beim naechsten Lauf heraus.
         *
         * Ergaenzt ist bewusst **keine neue Tatsache**. Ein erster Versuch
         * fuegte eine Szene ein („es geht nichts kaputt, die Seiten handeln
         * aus") — keine der drei Quellen sagt das, und eine Behauptung
         * einzubauen, um ein Zeitfenster zu treffen, waere genau der Fehler,
         * den die Belegpflicht verhindern soll. Hier steht nur ausfuehrlicher,
         * was ohnehin schon dasteht.
         */
        art: 'hook',
        kontext: 'Laden unterwegs',
        text: '10 Sekunden. Dann weißt du es.',
        sprechtext:
          'Dein Notebook lädt unterwegs im Schneckentempo, obwohl das Netzteil hundert Watt kann. Also denkst du, das Netzteil ist hinüber oder zu schwach für dieses Gerät. Bevor du ein neues kaufst: zehn Sekunden, dann weißt du, woran es wirklich liegt.',
      },
      {
        /*
         * Die erste Merkmalskarte des Kanals: Das Kabel wird gezeigt, nicht
         * benannt. Genau die Trennung aus der Entscheidung vom 12.08.2026 —
         * zeigen ja, benennen nur auf dem Sendeplatz „Kaufen" mit Label.
         *
         * Ersetzt hier eine `aussage`, die dasselbe nur behauptet haette.
         * Der Lauf meldete zuvor „Szenenart aussage kommt in 4 von 5 Shorts
         * vor" — das Bild unterschied sich nicht, obwohl die Macharten es
         * taten.
         */
        art: 'merkmalskarte',
        ueberschrift: 'Woran du es erkennst',
        geraet: 'kabel',
        merkmale: [
          { text: 'Aufdruck 60 W oder 240 W am Stecker', bewertung: 'ja' },
          { text: 'Dickere Tülle heißt meist mehr Ampere', bewertung: 'neutral' },
          { text: 'Beiliegendes Handykabel: fast immer 60 W', bewertung: 'achtung' },
        ],
        quelleId: 'usbif-power-delivery',
        sprechtext:
          'Denn die Leistung bestimmt nicht das Netzteil allein. Der Standard sagt: Hundert Watt entstehen aus zwanzig Volt und fünf Ampere — und die fünf Ampere müssen erst mal durch das Kabel passen. Ansehen kannst du das dem Kabel fast nicht. Fast: Der Aufdruck sitzt am Stecker.',
      },
      {
        art: 'herleitung',
        ueberschrift: 'Woraus 100 Watt entstehen',
        schritte: [
          { wert: '20 V', erlaeuterung: 'Spannung, bei beiden gleich' },
          { wert: '× 3 A', erlaeuterung: 'Stromstärke im einfachen Kabel' },
        ],
        ergebnis: { wert: '60 W', bedeutung: 'mehr geht damit nicht' },
        quelleId: 'hp-usbc-leistungsstufen',
        sprechtext:
          'Rechne einmal mit. Zwanzig Volt mal drei Ampere sind sechzig Watt. Mehr gibt ein einfaches Kabel nicht her. Erst bei fünf Ampere kommst du auf hundert — bei genau derselben Spannung. Der Unterschied steckt also nicht im Netzteil und nicht im Gerät, sondern in der Strippe dazwischen.',
      },
      {
        art: 'zahl',
        wert: '60',
        einheit: 'oder 240 W',
        bedeutung: 'Mehr Kabelklassen gibt es nicht',
        quelleId: 'usbif-kabel-kennzeichnung',
        sprechtext:
          'Und jetzt die gute Nachricht: Du musst das nicht raten. Der Standard verlangt, dass jedes USB-C-Kabel gekennzeichnet ist — entweder mit sechzig Watt oder mit zweihundertvierzig. Etwas dazwischen gibt es nicht. Das heißt für dich: Es gibt nur zwei Klassen, und die Kennzeichnung sitzt direkt am Stecker oder auf der Tülle. Genau dort schaust du hin, und dafür brauchst du keine zehn Sekunden.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'Lädt langsam trotz starkem Netzteil?',
        punkte: [
          'Die Wattzahl steht am Kabel, nicht am Netzteil',
          '60 W oder 240 W — dazwischen gibt es nichts',
          'Ohne Aufdruck: im Zweifel das schwächere annehmen',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext:
          'Schau also aufs Kabel, bevor du ein neues Netzteil kaufst. Der Aufdruck sitzt am Stecker oder auf der Tülle, und mehr als hinsehen musst du nicht. Steht dort gar nichts, geh vom schwächeren aus — das kostet dich zehn Sekunden und spart dir den Fehlkauf.',
      },
    ],

    quellenIds: ['usbif-power-delivery', 'hp-usbc-leistungsstufen', 'usbif-kabel-kennzeichnung'],

    texte: {
      tiktok: {
        titel: 'In 10 Sekunden: kein neues Netzteil nötig',
        beschreibung:
          '100 Watt sind 20 Volt mal 5 Ampere. Die 5 Ampere müssen durchs Kabel passen – und das ist gekennzeichnet.',
        hashtags: HASHTAGS,
      },
      instagram: {
        titel: 'In 10 Sekunden: Du brauchst kein neues Netzteil',
        beschreibung:
          'Die Spannung ist bei beiden Klassen gleich, der Unterschied liegt in der Stromstärke: 20 V × 3 A sind 60 Watt, 20 V × 5 A sind 100. Und die Stromstärke trägt das Kabel. Jedes USB-C-Kabel muss mit 60 W oder 240 W gekennzeichnet sein.',
        hashtags: HASHTAGS,
      },
      youtube: {
        titel: 'In 10 Sekunden: Du brauchst kein neues Netzteil',
        beschreibung:
          'Ein starkes Netzteil nützt nichts, wenn das Kabel die Stromstärke nicht trägt. 100 W entstehen aus 20 V und 5 A – bei nur 3 A bleiben 60 W. Der Standard verlangt, dass jedes USB-C-Kabel mit 60 W oder 240 W gekennzeichnet ist.\n\nQuellen:\nUSB-IF, USB Power Delivery: https://www.usb.org/usb-charger-pd\nUSB-IF, Cable Logo Requirements: https://www.usb.org/cable_connector\nHP, What is USB-C: https://www.hp.com/us-en/tech-takes/connectivity/explainer/what-is-usb-c.html',
        hashtags: ['#Shorts', '#USBC', '#Laden'],
      },
    },

    kennzeichnung: { werbung: 'keine', kiStimme: true },
  },
];
