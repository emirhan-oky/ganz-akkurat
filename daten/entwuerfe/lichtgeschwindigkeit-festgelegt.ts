import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · Die Lichtgeschwindigkeit ist eine Festlegung.
 *
 * **Der Staunfakt ist die Richtung.** Nicht „die Lichtgeschwindigkeit ist sehr
 * genau gemessen", sondern: Ihr Zahlenwert ist seit 1983 **festgesetzt**, und
 * der Meter folgt daraus.
 *
 * **Der erste Anlauf stand auf der falschen Quelle, der zweite auf einem
 * falschen Satz — beides hat der `belegpruefer` gefunden.**
 *
 * Zuerst hing der Short an der BIPM-Seite zu den sieben definierenden
 * Konstanten. Die nennt **keine einzige Einheitendefinition**, den Meter
 * eingeschlossen, und die Zahl 299 792 458 steht dort nur in einer Tabelle —
 * ausserhalb jeder zitierbaren Zeichenkette. Fuenf Verdachtsfaelle an einem
 * Dialog.
 *
 * **Der zweite Anlauf stand auf der richtigen Quelle und sagte trotzdem etwas
 * Falsches:** „Der Wert wird nicht gemessen. Er ist gesetzt." Dieselbe Seite
 * schreibt zwei Saetze weiter, wir wuerden „immer den gleichen Wert fuer die
 * Lichtgeschwindigkeit im Vakuum messen", und die Fussnote sagt, der Wert sei
 * 1983 als **letztgueltiger** festgelegt worden. Die Zahl **stammt** aus
 * Messungen; festgelegt ist ihre **Rolle**. Der Dialog behauptet deshalb heute
 * gar nichts mehr ueber das Messen: Volti sagt nur noch, **wann** die Zahl
 * festgelegt wurde — „Die Zahl wurde 1983 festgelegt, du Pfosten.
 * Letztgueltig." Das ist Wort fuer Wort gedeckt, und es widerlegt Wattis
 * falschen Schluss trotzdem.
 *
 * **Zwei Fallen stecken in dieser Quelle**, und beide sind umgangen:
 *
 * 1. **Die alte Definition steht daneben.** „Der Meter ist die Laenge der
 *    Strecke, die Licht im Vakuum waehrend der Dauer von 1/299 792 458 Sekunden
 *    durchlaeuft" galt **bis Mai 2019** und steht auf derselben Seite. Zitiert
 *    ist die geltende.
 * 2. **Die Seite ist im Futur geschrieben** („Ab dem 20. Mai 2019 wird die
 *    offizielle Definition geaendert zu"). Kein Satz des Dialogs haengt an
 *    diesem Datum; er haengt an 1983, und das ist eine Feststellung.
 *
 * **Der Kipppunkt ist das Vakuum.** Die beruehmteste Zahl der Physik gilt fuer
 * das Nichts — in Luft und in Glas ist Licht langsamer, und das steht als
 * Fussnote auf derselben Seite. Der Kipppunkt eines `gibtswirklich` ist die
 * Sache selbst, und hier ist es die Einschraenkung, die im Merksatz nie
 * mitgesprochen wird.
 *
 * **Wattis Gegenstand ist sein Zollstock.** Der erste Anlauf haengte den Short
 * an seinen ruckelnden Videocall — eine Ursachenbehauptung ueber Netze, die
 * keine Quelle traegt und sachlich schief ist: In Glasfaser laeuft das Signal
 * ohnehin langsamer, und es ruckelt wegen Routern und Umwegen.
 */
export const lichtgeschwindigkeitFestgelegt: Short = {
  id: 'lichtgeschwindigkeit-festgelegt',
  themaId: 'meter-aus-licht',
  format: 'gibtswirklich',
  sachgebiet: 'zeit',
  bauform: 'wechselrede',
  arbeitstitel: 'Wattis Zollstock hängt an einer festgelegten Zahl',
  weitererzaehlt: 'nur im Vakuum',
  suchbegriff: 'Meter Lichtgeschwindigkeit',
  kaltstart: {
    art: 'erstaunen',
    satz: 'Der Wert der Lichtgeschwindigkeit steht seit 1983 letztgültig fest.',
    belegId: 'zahlenwert-1983-letztgueltig',
    buehne: { art: 'figur', wer: 'nachleser', von: 'ruhe', nach: 'staunen', requisite: 'blatt' },
  },
  vorspann: 'Wattis Zollstock und das Licht',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, ist mein Zollstock eigentlich genau? Am Ende hängt er an der Lichtgeschwindigkeit.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Volti, ist mein Zollstock eigentlich genau?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Am Ende hängt er an der Lichtgeschwindigkeit.',
          quelleId: 'ptb-der-meter',
          belegId: 'meter-aus-lichtgeschwindigkeit',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'staunen',
        nach: 'erklaeren',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'ptb-der-meter',
      belegId: 'meter-aus-lichtgeschwindigkeit',
      herausgeber: 'Physikalisch-Technische Bundesanstalt',
      sprechtext:
        'Ein Meter ist ein Meter, den gibt es doch einfach. Der Meter ist über die Lichtgeschwindigkeit definiert. Und wie hoch ist die? 299792458 Meter pro Sekunde, festgelegt.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'widersprechen',
          machart: 'rueckfrage',
          text: 'Ein Meter ist ein Meter, den gibt es doch einfach.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Der Meter ist über die Lichtgeschwindigkeit definiert.',
          quelleId: 'ptb-der-meter',
          belegId: 'meter-aus-lichtgeschwindigkeit',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wie hoch ist die?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: '299792458 Meter pro Sekunde, festgelegt.',
          quelleId: 'ptb-der-meter',
          belegId: 'meter-aus-lichtgeschwindigkeit',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'ptb-der-meter',
      belegId: 'zahlenwert-1983-letztgueltig',
      sprechtext:
        'Festgelegt? Dann haben die also ewig gemessen, bis die Zahl saß. Die Zahl wurde 1983 festgelegt, du Pfosten. Letztgültig. Und das gilt überall?',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'falscherschluss',
          text: 'Festgelegt? Dann haben die also ewig gemessen, bis die Zahl saß.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Die Zahl wurde 1983 festgelegt, du Pfosten. Letztgültig.',
          quelleId: 'ptb-der-meter',
          belegId: 'zahlenwert-1983-letztgueltig',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und das gilt überall?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'nachdenken', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'ptb-der-meter',
      belegId: 'licht-im-medium-langsamer',
      sprechtext:
        'Das gilt nur im Vakuum. Dann räume ich mein Zimmer eben leer. In Luft ist Licht langsamer. In Glas noch langsamer.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Das gilt nur im Vakuum.',
          quelleId: 'ptb-der-meter',
          belegId: 'licht-im-medium-langsamer',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'uebercompliance',
          text: 'Dann räume ich mein Zimmer eben leer.',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'In Luft ist Licht langsamer. In Glas noch langsamer.',
          quelleId: 'ptb-der-meter',
          belegId: 'licht-im-medium-langsamer',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'staunen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Die Zahl steht seit 1983 fest, und der Meter folgt daraus.',
      sprechtext:
        'Also war mein Zollstock die ganze Zeit zu langsam. Dein Zollstock ist aus Holz. Der hatte es noch nie eilig. Dann kaufe ich einen aus Glas.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'katastrophe',
          text: 'Also war mein Zollstock die ganze Zeit zu langsam.',
        },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'parallelbau',
          text: 'Dein Zollstock ist aus Holz. Der hatte es noch nie eilig.',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'umdeutung',
          text: 'Dann kaufe ich einen aus Glas.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'ansprechen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
      rundlauf:
        'Beim zweiten Sehen beantwortet sich „ist mein Zollstock genau" selbst: so genau wie eine Zahl, die niemand mehr nachrechnet.',
    },
  ],

  quellenIds: ['ptb-der-meter'],

  texte: {
    tiktok: {
      titel: 'Wattis Zollstock hängt an einer festgelegten Zahl',
      beschreibung:
        'Meter und Lichtgeschwindigkeit: Warum der Meter aus der Lichtgeschwindigkeit folgt und nicht umgekehrt.',
      hashtags: ['#meter', '#technikwissen', '#lichtgeschwindigkeit', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Zollstock hängt an einer festgelegten Zahl',
      beschreibung:
        'Meter und Lichtgeschwindigkeit: Der Zahlenwert steht seit 1983 fest — und gilt nur im Vakuum.',
      hashtags: ['#meter', '#technikwissen', '#einheiten', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Die Zahl steht seit 1983 fest, der Meter folgt daraus',
      beschreibung:
        'Meter und Lichtgeschwindigkeit: Was die Physikalisch-Technische Bundesanstalt zur Definition schreibt.',
      hashtags: ['#meter', '#einheiten', '#technikwissen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
