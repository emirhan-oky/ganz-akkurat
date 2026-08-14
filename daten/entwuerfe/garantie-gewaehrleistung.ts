import type { Short } from '../../src/typen';

/**
 * Rubrik Kaufen — „Die Garantie ist abgelaufen. Deine Rechte nicht."
 *
 * Der Sendeplatz, auf dem später die Partnerlinks liegen sollen (Variante A).
 * Genau deshalb trägt er **immer** eine Vertiefung: Beim werbenden Short
 * gewinnt sonst der Gedanke „der will mir was verkaufen".
 *
 * Gewählt ist `grenzfall` statt der von der Matrix empfohlenen `fehlspur` —
 * hier liegt die Tiefe wirklich in der Ausnahme. Die zwei Jahre gelten, aber
 * nach dem ersten Jahr dreht sich die Beweislast um, und das ist der Punkt,
 * an dem die meisten Auseinandersetzungen kippen. Wer das verschweigt,
 * verspricht zu viel.
 *
 * Stand 13.08.2026 ohne Werbung und ohne Links — Phase 1.
 */

const HASHTAGS = ['#gewährleistung', '#garantie', '#verbraucherrechte', '#technikwissen', '#setupklar'];

export const garantieGewaehrleistung: Short[] = [
  {
    id: 'skl-gwl-01',
    themaId: 'garantie-gewaehrleistung',
    rubrik: 'kaufen',
    arbeitstitel: 'Die Garantie ist abgelaufen. Die Gewährleistung nicht.',
    winkelart: 'verwechslung',

    system: 'ohne',
    titelmuster: 'zweisatz',
    vertiefung: 'grenzfall',
    merksatz: 'Garantie ist freiwillig. Gewährleistung ist Gesetz.',

    szenen: [
      {
        art: 'hook',
        kontext: 'Gerät kaputt, ein Jahr alt',
        text: 'Die Garantie ist abgelaufen.',
        sprechtext:
          'Das Gerät geht kaputt, du rufst an, und am Telefon heißt es: Die Garantie ist leider abgelaufen. Da können wir nichts machen.',
      },
      {
        art: 'aussage',
        text: 'Garantie ist freiwillig — Gewährleistung steht im Gesetz.',
        hervorhebung: 'freiwillig',
        quelleId: 'bgb-443-garantie',
        /*
         * Der erste Short dieses Kanals mit einem Situationssymbol statt einem
         * Geraet. Bei einem Rechtsthema gibt es kein Geraet zu zeigen — bis
         * zum 13.08.2026 lief er deshalb ganz ohne Bild, und genau dort fiel
         * der leere Platz unter dem Text am meisten auf.
         *
         * Bewusst das Gesetzbuch und **kein Richterhammer**: Deutsche Gerichte
         * benutzen keinen, das ist ein Bild aus amerikanischen Serien.
         * Ausgerechnet beim Rechtsthema ein Requisit zu zeigen, das es
         * hierzulande nicht gibt, waere der vermeidbarste aller Patzer.
         */
        symbol: 'gesetzbuch',
        sprechtext:
          'Nur sind das zwei verschiedene Dinge. Eine Garantie gibt der Verkäufer oder der Hersteller freiwillig ab — er entscheidet, was drinsteht. Das Gesetz sagt dazu: Sie kommt zusätzlich zur gesetzlichen Mängelhaftung. Zusätzlich. Sie ersetzt sie nicht.',
      },
      {
        art: 'vergleich',
        ueberschrift: 'Zwei Dinge, ein Wort',
        links: {
          titel: 'Gewährleistung',
          zeilen: ['Steht im Gesetz', 'Immer der Verkäufer', 'Zwei Jahre'],
          bewertung: 'ja',
        },
        rechts: {
          titel: 'Garantie',
          zeilen: ['Freiwillig gegeben', 'Oft der Hersteller', 'Dauer frei wählbar'],
          bewertung: 'achtung',
        },
        sprechtext:
          // Gestrafft am 13.08.2026: Der letzte Satz („sagt das ueber deine
          // Rechte gar nichts") stand als Aussage schon in der Szene davor.
          'Die Gewährleistung schuldet dir immer der Verkäufer, bei dem du gekauft hast. Die Garantie kommt meistens vom Hersteller und hat die Bedingungen, die er sich ausgesucht hat.',
      },
      {
        art: 'zahl',
        wert: '2',
        einheit: 'Jahre',
        bedeutung: 'Gesetzliche Mängelhaftung beim normalen Kauf',
        quelleId: 'bgb-438-verjaehrung',
        /*
         * Der Bon traegt das Kaufdatum — den Tag, an dem diese zwei Jahre zu
         * laufen beginnen. Er stand zuerst bei der Einschraenkung, dort blieb
         * neben drei Textbloecken aber so wenig Platz, dass die Zeichnung auf
         * Briefmarkengroesse schrumpfte. Eine Zahl-Szene traegt wenig Text und
         * damit die Illustration.
         */
        symbol: 'kassenbon',
        sprechtext:
          'Denn die läuft beim normalen Kauf zwei Jahre. Das steht so im Bürgerlichen Gesetzbuch, und es gilt unabhängig davon, was auf der Garantiekarte steht.',
      },
      {
        art: 'einschraenkung',
        // Abgeleitet aus „im ersten Jahr" und „die zwei Jahre": Es geht um
        // Fristen, nicht um den Kaufvorgang — deshalb Kalender, nicht Bon.
        symbol: 'kalender',
        ueberschrift: 'Der Haken kommt nach zwölf Monaten',
        bedingung: 'Im ersten Jahr musst du nichts beweisen',
        folge: 'Danach musst du zeigen, dass der Mangel von Anfang an da war — und das ist schwer',
        quelleId: 'bgb-477-beweislast',
        sprechtext:
          'Aber jetzt der Teil, den kaum jemand sagt. Zeigt sich der Fehler im ersten Jahr, wird vermutet, dass er von Anfang an da war. Du musst nichts beweisen. Danach dreht sich das um: Dann liegt es an dir zu zeigen, dass der Mangel schon beim Kauf angelegt war. Die zwei Jahre gelten weiter — nur werden sie schwerer durchzusetzen.',
      },
      {
        /*
         * Kam am 13.08.2026 dazu: Der vertonte Short lag bei 72,7 Sekunden,
         * das Fenster beginnt bei 75.
         *
         * Anders als bei den zwei anderen kurzen Shorts liess sich hier keine
         * ungenutzte Quelle heranziehen — alle drei tragen schon eine Szene.
         * Ergaenzt ist deshalb der Schritt, der dem Video wirklich fehlte:
         * Bis hierher weiss der Zuschauer, dass er Rechte hat, aber nicht,
         * welchen Satz er am Telefon sagt. Ein Rechtsthema ohne Handgriff ist
         * nur Halbwissen.
         *
         * Nebenwirkung, die zaehlt: `checkliste` kam bisher nur in einem der
         * fuenf Shorts vor.
         */
        art: 'checkliste',
        ueberschrift: 'Was du am Telefon sagst',
        punkte: [
          { text: 'Nach Gewährleistung fragen, nicht nach Garantie', bewertung: 'ja' },
          { text: 'Beim Verkäufer melden, nicht beim Hersteller', bewertung: 'ja' },
          { text: 'Kaufdatum nennen — unter zwölf Monaten?', bewertung: 'ja' },
          { text: '„Garantie abgelaufen" als Absage hinnehmen', bewertung: 'nein' },
        ],
        quelleId: 'bgb-443-garantie',
        sprechtext:
          'Praktisch heißt das: Ruf beim Verkäufer an, nicht beim Hersteller. Sag das Wort Gewährleistung, nicht Garantie. Und nenn das Kaufdatum — liegt es unter zwölf Monaten, bist du in der bequemen Hälfte.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'Am Telefon abgewimmelt?',
        punkte: [
          'Garantie und Gewährleistung sind nicht dasselbe',
          'Gewährleistung schuldet immer der Verkäufer',
          'Im ersten Jahr musst du nichts beweisen',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext:
          'Wenn also jemand sagt, die Garantie sei abgelaufen: Das kann stimmen und trotzdem irrelevant sein. Frag nach der Gewährleistung, und frag beim Verkäufer, nicht beim Hersteller.',
      },
    ],

    quellenIds: ['bgb-443-garantie', 'bgb-438-verjaehrung', 'bgb-477-beweislast'],

    /*
     * Phase 1: keine Werbung, keine Links, auch auf diesem Sendeplatz nicht.
     * Affiliate setzt ein Kleingewerbe voraus. Sobald das Partnerkonto steht,
     * wird hier `werbung: 'video'` gesetzt und das Label eingeblendet — erst
     * dann duerfen die Texte auch Produktnamen tragen.
     */
    kennzeichnung: { werbung: 'keine', kiStimme: true },

    texte: {
      tiktok: {
        titel: 'Garantie abgelaufen? Frag nach der Gewährleistung.',
        beschreibung:
          'Garantie ist freiwillig, Gewährleistung steht im Gesetz. Zwei Jahre, und im ersten musst du nichts beweisen.',
        hashtags: HASHTAGS,
      },
      instagram: {
        titel: 'Garantie abgelaufen? Die Gewährleistung läuft zwei Jahre weiter',
        beschreibung:
          'Eine Garantie gibt der Hersteller freiwillig – sie kommt laut Gesetz zusätzlich zur Mängelhaftung. Die gesetzliche Gewährleistung schuldet dagegen immer der Verkäufer, zwei Jahre lang. Im ersten Jahr wird vermutet, dass der Mangel von Anfang an da war.',
        hashtags: HASHTAGS,
      },
      youtube: {
        titel: 'Garantie abgelaufen? Die Gewährleistung läuft zwei Jahre weiter',
        beschreibung:
          'Garantie und Gewährleistung werden ständig verwechselt. Die Garantie ist freiwillig und kommt zusätzlich zur gesetzlichen Mängelhaftung (§ 443 BGB). Die Gewährleistung läuft beim normalen Kauf zwei Jahre (§ 438 BGB) und schuldet sie immer der Verkäufer. Im ersten Jahr gilt die Beweislastumkehr (§ 477 BGB).\n\nKeine Rechtsberatung – im Zweifel an die Verbraucherzentrale wenden.\n\nQuellen:\n§ 443 BGB Garantie: https://www.gesetze-im-internet.de/bgb/__443.html\n§ 438 BGB Verjährung: https://www.gesetze-im-internet.de/bgb/__438.html\n§ 477 BGB Beweislastumkehr: https://www.gesetze-im-internet.de/bgb/__477.html',
        hashtags: ['#Shorts', '#Gewährleistung', '#Verbraucherrechte'],
      },
    },
  },
];
