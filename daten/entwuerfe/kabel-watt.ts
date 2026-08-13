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
        art: 'hook',
        kontext: 'Laden unterwegs',
        text: '10 Sekunden. Dann weißt du es.',
        sprechtext:
          'Dein Notebook lädt unterwegs im Schneckentempo, obwohl das Netzteil hundert Watt kann. Bevor du ein neues kaufst: zehn Sekunden, dann weißt du, woran es liegt.',
      },
      {
        art: 'aussage',
        text: 'Zwischen Netzteil und Gerät hängt noch etwas.',
        hervorhebung: 'noch etwas',
        quelleId: 'usbif-power-delivery',
        sprechtext:
          'Das liegt daran, dass die Leistung nicht vom Netzteil allein bestimmt wird. Der Standard sagt: Hundert Watt entstehen aus zwanzig Volt und fünf Ampere. Und die fünf Ampere müssen erst mal durch das Kabel passen.',
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
          'Schau also aufs Kabel, bevor du ein neues Netzteil kaufst. Steht dort gar nichts, geh vom schwächeren aus — das kostet dich zehn Sekunden und spart dir den Fehlkauf.',
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
