import type { Short } from '../../src/typen';

/**
 * Rubrik Reise — „mAh in Wattstunden umrechnen".
 *
 * Bis zum 13.08.2026 lagen hier fünf Shorts aus einem Thema. Geblieben ist
 * der, bei dem die Umrechnung selbst der Inhalt ist — das beste Beispiel für
 * die Vertiefung `herleitung`: Auf der Powerbank steht mAh, in der Vorschrift
 * stehen Wattstunden. Wer die Rechnung einmal gesehen hat, kann jede
 * Powerbank selbst einschätzen, statt sich eine Zahl zu merken.
 *
 * **Seit dem 13.08.2026 nicht mehr geparkt.** Der Short stand lange auf einer
 * einzigen Quelle, dem Luftfahrt-Bundesamt — fünf Zitate aus einer Quelle
 * sind trotzdem eine Quelle. Jetzt tragen ihn drei Behörden aus drei
 * Rechtsräumen: LBA, EASA und die US-amerikanische FAA. Dass alle drei
 * dieselbe Grenze nennen, ist selbst ein Argument im Video: Die 100 Wh sind
 * keine deutsche Eigenheit.
 *
 * Bewusst auf **behördliche** Regeln gestützt statt auf die einer einzelnen
 * Fluggesellschaft: Airline-Regeln ändern sich und gelten nur dort, die
 * Grenzwerte des Regelwerks gelten überall.
 */

const HASHTAGS = ['#powerbank', '#handgepäck', '#reisetipps', '#technikwissen', '#setupklar'];

export const powerbankFlug: Short[] = [
  {
    id: 'skl-pbf-01',
    themaId: 'powerbank-flug',
    rubrik: 'reise',
    arbeitstitel: 'Am Gate zählt eine andere Zahl',
    winkelart: 'umrechnung',

    system: 'ohne',
    titelmuster: 'zweisatz',
    vertiefung: 'herleitung',
    merksatz: 'Wattstunden sind mAh mal Spannung, geteilt durch 1000.',

    szenen: [
      {
        /*
         * Der Flug gehoert in den ersten Satz, nicht in den vierten.
         *
         * Bis zum 13.08.2026 hiess der Titel „Auf der Powerbank steht die
         * falsche Einheit" und die Hook nannte nur „die Vorschrift". Wer das
         * las, hielt den Short fuer Powerbank-Wissen mit zufaelligem
         * Flugbeispiel — und lag damit nicht falsch, denn nichts im Bild sagte
         * etwas anderes.
         *
         * Das ist keine Geschmacksfrage: Die Rubrik Reise ist definiert durch
         * „eine Vorschrift oder Landesgrenze entscheidet mit". Ohne Flug ist
         * die Umrechnung eine Rechenuebung ohne Anlass. Der Sendeplatz war
         * formal richtig belegt und inhaltlich nicht eingeloest.
         */
        art: 'hook',
        kontext: 'Powerbank im Handgepäck',
        text: 'Am Gate zählt eine andere Zahl.',
        sprechtext:
          'Du fliegst nächste Woche und packst die Powerbank ins Handgepäck. Auf ihr steht eine Zahl in Milliamperestunden — am Gate zählt eine ganz andere Einheit.',
      },
      {
        art: 'aussage',
        text: 'Die Vorschrift rechnet in Wattstunden.',
        hervorhebung: 'Wattstunden',
        quelleId: 'lba-lithiumbatterien',
        // Das Geraet, auf dem die falsche Einheit steht. Die spaeteren Szenen
        // bleiben ohne Zeichnung: Die Herleitung ist die Rechnung selbst, und
        // dieselbe Powerbank ein zweites Mal zu zeigen erklaert nichts.
        geraet: 'powerbank',
        sprechtext:
          'Das Luftfahrt-Bundesamt nennt die Grenze in Wattstunden. Auf keiner Powerbank der Welt steht diese Zahl groß auf der Vorderseite. Also musst du sie selbst ausrechnen — und das geht in einem Schritt.',
      },
      {
        /*
         * Die Signaturszene der Vertiefung. Die Rechnung laeuft in der
         * Reihenfolge, in der sie jemand im Kopf machen wuerde: von der Zahl
         * auf dem Geraet zur Zahl in der Vorschrift, nicht umgekehrt.
         */
        art: 'herleitung',
        ueberschrift: 'Von mAh zu Wattstunden',
        schritte: [
          { wert: '20.000 mAh', erlaeuterung: 'steht auf der Powerbank' },
          { wert: '× 3,7 V', erlaeuterung: 'Nennspannung der Lithium-Zelle' },
          { wert: '÷ 1000', erlaeuterung: 'Milliamperestunden zu Amperestunden' },
        ],
        ergebnis: { wert: '74 Wh', bedeutung: 'liegt unter der Grenze' },
        quelleId: 'lba-lithiumbatterien',
        sprechtext:
          'Nimm die Milliamperestunden, mal drei Komma sieben Volt, geteilt durch tausend. Eine Zwanzigtausender-Powerbank kommt so auf vierundsiebzig Wattstunden. Und damit liegt sie unter der Grenze.',
      },
      {
        art: 'zahl',
        wert: '100',
        einheit: 'Wh',
        bedeutung: 'Bis hier ohne Genehmigung',
        quelleId: 'lba-lithiumbatterien',
        sprechtext:
          'Denn hundert Wattstunden ist die Zahl, bis zu der du nichts anmelden musst. Umgerechnet sind das rund siebenundzwanzigtausend Milliamperestunden.',
      },
      {
        /*
         * Die Einschraenkung traegt zugleich die Laenge und den zweiten
         * Rechtsraum: Dass FAA und EASA dieselbe Zahl nennen wie das LBA,
         * macht aus einer deutschen Vorschrift eine internationale.
         */
        art: 'einschraenkung',
        ueberschrift: 'Gilt auch außerhalb Europas',
        bedingung: 'Über 100 Wh brauchst du die Zustimmung der Airline',
        folge: 'Dann höchstens zwei Ersatzbatterien — und über 160 Wh gar keine',
        /*
         * Bewusst die FAA und nicht die EASA: Die Szene behauptet, die Grenze
         * gelte auch ausserhalb Europas — belegen kann das nur eine Quelle von
         * ausserhalb Europas. Die EASA traegt dafuer die Szene darunter.
         */
        quelleId: 'faa-lithium-grenzwerte',
        sprechtext:
          'Und das ist keine deutsche Eigenheit. Die europäische und die amerikanische Luftfahrtbehörde nennen dieselbe Zahl. Wer darüber liegt, braucht die Zustimmung der Fluggesellschaft und darf dann höchstens zwei Ersatzbatterien mitnehmen. Über hundertsechzig Wattstunden ist ganz Schluss.',
      },
      {
        /*
         * Kam am 13.08.2026 dazu, aus zwei Gruenden. Der erste ist die Laenge:
         * Die Sprechprobe mass 70,4 Sekunden gegen ein Zielfenster von 75 bis
         * 90 — der Short war zu kurz, und die alte Schaetzformel hatte das
         * verdeckt.
         *
         * Der zweite ist der bessere: Die Kurzschluss-Sicherung steht bei LBA
         * und EASA wortgleich und ist der einzige Punkt der ganzen Vorschrift,
         * den man auch dann noch falsch machen kann, wenn man richtig
         * gerechnet hat. Wer 74 Wattstunden hat und die Powerbank lose zu den
         * Schluesseln wirft, verstoesst trotzdem.
         */
        art: 'warnung',
        text: 'Lose in der Tasche reicht nicht',
        loesung: 'Pole abkleben oder in die Originalhülle — jede Batterie einzeln',
        quelleId: 'easa-lithium-handgepaeck',
        sprechtext:
          'Eine Sache übersehen selbst die, die richtig gerechnet haben. Beide Behörden verlangen, dass jede Ersatzbatterie einzeln gegen Kurzschluss gesichert ist. Lose zwischen Schlüssel und Kleingeld reicht dafür nicht. Es genügt, die Pole abzukleben oder die Powerbank in ihrer Hülle zu lassen.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'Powerbank im Handgepäck',
        punkte: [
          'mAh × 3,7 ÷ 1000 = Wattstunden',
          'Bis 100 Wh ohne Genehmigung',
          'Immer ins Handgepäck, nie in den Koffer',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext:
          // Gekürzt am 13.08.2026: Der Short lag gemessen bei 89,3 Sekunden,
          // das Fenster endet bei 90. „In Europa wie in den USA" stand zwei
          // Szenen vorher schon.
          'Merk dir die Rechnung, nicht die Zahl. Dann kannst du jede Powerbank selbst einschätzen, bevor du sie kaufst. Und pack sie ins Handgepäck — im aufgegebenen Koffer ist sie ausnahmslos verboten.',
      },
    ],

    quellenIds: ['lba-lithiumbatterien', 'easa-lithium-handgepaeck', 'faa-lithium-grenzwerte'],

    texte: {
      /*
       * Alle drei Titel nennen jetzt den Flug. Vorher hiess es „die
       * Vorschrift" — die schwaechste Stelle des Zweisatzes, weil sie offen
       * laesst, welche. Das Muster verlangt ausdruecklich, dass der Titel den
       * Kontext mittraegt: Im Bild sieht man die Situation, im Feed nicht.
       */
      tiktok: {
        titel: 'Powerbank im Handgepäck: die falsche Einheit',
        beschreibung:
          'Am Gate wird in Wattstunden gerechnet, auf der Powerbank stehen mAh. Die Umrechnung geht in einem Schritt.',
        hashtags: HASHTAGS,
      },
      instagram: {
        titel: 'Auf deiner Powerbank steht mAh. Am Gate zählen Wattstunden.',
        beschreibung:
          'Milliamperestunden mal 3,7 Volt, geteilt durch 1000 – das sind die Wattstunden, nach denen im Handgepäck gefragt wird. Bis 100 Wh braucht es keine Genehmigung.',
        hashtags: HASHTAGS,
      },
      youtube: {
        titel: 'Powerbank im Handgepäck: Am Gate zählt eine andere Zahl',
        beschreibung:
          'Die Grenze für Powerbanks im Handgepäck steht in Wattstunden, auf dem Gerät stehen Milliamperestunden. Die Umrechnung: mAh × 3,7 V ÷ 1000 = Wh. Bis 100 Wh braucht es keine Genehmigung – und jede Batterie muss einzeln gegen Kurzschluss gesichert sein.\n\nQuellen:\nLuftfahrt-Bundesamt, Elektronische Geräte mit Lithium-Batterien: https://www.lba.de/DE/Luftfahrtunternehmen/Gefahrgut/Passagierinformation/Passagiergepaeck/Elektronische_Geraete.html\nEASA, Dangerous Goods: https://www.easa.europa.eu/en/domains/air-operations/dangerous-goods\nFAA, Lithium Batteries: https://www.faa.gov/hazmat/packsafe/lithium-batteries',
        hashtags: ['#Shorts', '#Powerbank', '#Handgepäck'],
      },
    },

    kennzeichnung: { werbung: 'keine', kiStimme: true },
  },
];
