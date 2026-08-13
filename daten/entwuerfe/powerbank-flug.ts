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
 * **Weiterhin geparkt** (`blockierend: false` in der Schemaprüfung): Der
 * Short steht auf einer einzigen Quelle, dem Luftfahrt-Bundesamt. Fünf
 * Zitate aus einer Quelle sind trotzdem eine Quelle — die Regel verlangt
 * drei. Bewusst auf die **behördliche** Regel gestützt statt auf die einer
 * einzelnen Fluggesellschaft: Airline-Regeln ändern sich und gelten nur dort,
 * die Grenzwerte des Regelwerks gelten überall.
 */

const HASHTAGS = ['#powerbank', '#handgepäck', '#reisetipps', '#technikwissen', '#setupklar'];

export const powerbankFlug: Short[] = [
  {
    id: 'skl-pbf-01',
    themaId: 'powerbank-flug',
    rubrik: 'reise',
    arbeitstitel: 'Auf der Powerbank steht die falsche Einheit',
    winkelart: 'umrechnung',

    system: 'ohne',
    titelmuster: 'zweisatz',
    vertiefung: 'herleitung',
    merksatz: 'Wattstunden sind mAh mal Spannung, geteilt durch 1000.',

    szenen: [
      {
        art: 'hook',
        kontext: 'Vor dem Abflug',
        text: 'Auf deiner Powerbank steht mAh.',
        sprechtext:
          'Auf deiner Powerbank steht eine Zahl in Milliamperestunden. In der Vorschrift steht eine ganz andere Einheit.',
      },
      {
        art: 'aussage',
        text: 'Die Vorschrift rechnet in Wattstunden.',
        hervorhebung: 'Wattstunden',
        quelleId: 'lba-lithiumbatterien',
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
        art: 'endkarte',
        ueberschrift: 'Powerbank im Handgepäck',
        punkte: [
          'mAh × 3,7 ÷ 1000 = Wattstunden',
          'Bis 100 Wh ohne Genehmigung',
          'Immer ins Handgepäck, nie in den Koffer',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext:
          'Merk dir die Rechnung, nicht die Zahl. Dann kannst du jede Powerbank im Laden selbst einschätzen, bevor du sie kaufst.',
      },
    ],

    quellenIds: ['lba-lithiumbatterien'],

    texte: {
      tiktok: {
        titel: 'Auf der Powerbank steht die falsche Einheit',
        beschreibung:
          'Die Vorschrift rechnet in Wattstunden, die Powerbank zeigt mAh. Die Umrechnung geht in einem Schritt.',
        hashtags: HASHTAGS,
      },
      instagram: {
        titel: 'Auf deiner Powerbank steht mAh. Die Vorschrift will Wattstunden.',
        beschreibung:
          'Milliamperestunden mal 3,7 Volt, geteilt durch 1000 – das sind die Wattstunden, nach denen im Handgepäck gefragt wird. Bis 100 Wh braucht es keine Genehmigung.',
        hashtags: HASHTAGS,
      },
      youtube: {
        titel: 'Auf deiner Powerbank steht mAh. Die Vorschrift will Wattstunden.',
        beschreibung:
          'Die Grenze für Powerbanks im Handgepäck steht in Wattstunden, auf dem Gerät stehen Milliamperestunden. Die Umrechnung: mAh × 3,7 V ÷ 1000 = Wh.\n\nQuelle:\nLuftfahrt-Bundesamt, Elektronische Geräte mit Lithium-Batterien: https://www.lba.de/DE/Luftfahrtunternehmen/Gefahrgut/Passagierinformation/Passagiergepaeck/Elektronische_Geraete.html',
        hashtags: ['#Shorts', '#Powerbank', '#Handgepäck'],
      },
    },

    kennzeichnung: { werbung: 'keine', kiStimme: true },
  },
];
