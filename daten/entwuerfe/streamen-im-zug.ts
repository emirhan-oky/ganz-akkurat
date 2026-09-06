import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · Dieselbe Stunde Video kostet 2 oder 90 Gramm.
 *
 * **Szenario 7, viertes Beispiel: Watti hat einen Plan.** Er will Strom sparen,
 * indem er zu Hause nichts mehr streamt — und Volti rechnet vor, was daraus
 * wird. Die Rechnung kommt aus der Quelle und nicht aus dem Kopf: alle vier
 * Zahlen stehen woertlich in der Pressemitteilung des Umweltbundesamts.
 *
 * **Der Schluss steht ebenfalls in der Quelle**, und er ist der Grund, warum
 * dieser Short ueberhaupt geht: „Nicht beruecksichtigt wird bei dieser
 * Berechnung der Stromverbrauch des Endgeraets." Wattis ganzer Plan haengt an
 * dem einen Posten, den die Zahlen gar nicht enthalten.
 *
 * **Die Zahlen sind von 2020 und werden im Dialog datiert.** Eine Messung ohne
 * Jahr behauptet den heutigen Stand — und der Mobilfunk hat sich seitdem
 * verschoben. Absolute Daten altern nicht.
 */
export const streamenImZug: Short = {
  id: 'streamen-im-zug',
  themaId: 'streaming-uebertragungsweg',
  format: 'gibtswirklich',
  sachgebiet: 'netz',
  bauform: 'stationen',
  arbeitstitel: 'Watti verschiebt seine Stromrechnung in den Funkmast',
  weitererzaehlt: 'Über das alte 3G waren es 90',
  suchbegriff: 'Streaming Mobilfunk',
  kaltstart: {
    art: 'stolzerfehler',
    satz: 'Ab jetzt streame ich nur noch mobil. Spart Strom zu Hause.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'koffer' },
  },
  vorspann: 'Wattis Serienabend im Zug',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, warum guckst du deine Serie über Mobilfunk? Weil der Strom dann nicht von meiner Rechnung geht.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, warum guckst du deine Serie über Mobilfunk?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Weil der Strom dann nicht von meiner Rechnung geht.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'nachdenken',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Und wo geht er dann hin? In den Funkmast. Nicht mein Problem.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und wo geht er dann hin?' },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'rechtfertigung',
          text: 'In den Funkmast. Nicht mein Problem.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'stutzen',
        gegenueber: { von: 'stutzen', nach: 'erklaeren' },
      },
    },
    {
      art: 'zahl',
      position: 'zuspitzung',
      wert: '2',
      einheit: 'Gramm',
      bedeutung: 'je Stunde HD-Video über Glasfaser, für Rechenzentrum und Datenübertragung',
      quelleId: 'uba-streaming-uebertragung',
      belegId: 'glasfaser-zwei-gramm',
      herausgeber: 'Umweltbundesamt',
      sprechtext:
        'Rechnen wir dein Streaming mal durch. Eine Stunde HD-Video über Glasfaser sind 2 Gramm CO2. Für was alles? Rechenzentrum und Übertragung. Sagt wer? Das Umweltbundesamt, 2020. Und bei mir im Zug?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'behaupten',
          text: 'Rechnen wir dein Streaming mal durch. Eine Stunde HD-Video über Glasfaser sind 2 Gramm CO2.',
          quelleId: 'uba-streaming-uebertragung',
          belegId: 'glasfaser-zwei-gramm',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Für was alles?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Rechenzentrum und Übertragung.',
          quelleId: 'uba-streaming-uebertragung',
          belegId: 'glasfaser-zwei-gramm',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Sagt wer?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Das Umweltbundesamt, 2020.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und bei mir im Zug?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'hochschauen',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'uba-streaming-uebertragung',
      belegId: 'umts-neunzig-gramm',
      sprechtext: 'Über 5G etwa 5. Und das war es? Über das alte 3G waren es 90. 90 Gramm für dieselbe Stunde?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Über 5G etwa 5.',
          quelleId: 'uba-streaming-uebertragung',
          belegId: 'fuenfg-etwa-fuenf-gramm',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Und das war es?' },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Über das alte 3G waren es 90.',
          quelleId: 'uba-streaming-uebertragung',
          belegId: 'umts-neunzig-gramm',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: '90 Gramm für dieselbe Stunde?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'hochschauen',
        nach: 'staunen',
        gegenueber: { von: 'lesen', nach: 'zeigen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'uba-streaming-uebertragung',
      belegId: 'fuenfg-etwa-fuenf-gramm',
      sprechtext: 'Für dieselbe Stunde. Dann nehme ich eben 5G.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Für dieselbe Stunde.',
          quelleId: 'uba-streaming-uebertragung',
          belegId: 'umts-neunzig-gramm',
        },
        { sprecher: 'zeiger', zug: 'einlenken', machart: 'uebercompliance', text: 'Dann nehme ich eben 5G.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'zeigen', nach: 'erklaeren' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'In keiner der Zahlen steckt der Strom, den dein Handy selbst braucht.',
      sprechtext:
        'Und den Strom für dein Handy zahlst du trotzdem selbst. Der steht in keiner der Zahlen. Wieso, ich lade doch bei dir.',
      rede: [
        { sprecher: 'nachleser', zug: 'zuspitzen', text: 'Und den Strom für dein Handy zahlst du trotzdem selbst.' },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Der steht in keiner der Zahlen.',
          quelleId: 'uba-streaming-uebertragung',
          belegId: 'endgeraet-nicht-beruecksichtigt',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'umdeutung',
          text: 'Wieso, ich lade doch bei dir.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'ruhe',
        gegenueber: { von: 'erklaeren', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „spart Strom zu Hause" der Plan von jemandem, der die Rechnung nur verschiebt.',
    },
  ],

  quellenIds: ['uba-streaming-uebertragung'],

  texte: {
    tiktok: {
      titel: 'Watti verschiebt seine Stromrechnung in den Funkmast',
      beschreibung: 'Streaming und Mobilfunk: Dieselbe Stunde HD-Video kostet je nach Weg 2 oder 5 Gramm CO2.',
      hashtags: ['#streaming', '#mobilfunk', '#klima', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti verschiebt seine Stromrechnung in den Funkmast',
      beschreibung: 'Streaming und Mobilfunk: Der Übertragungsweg entscheidet, nicht die Serie.',
      hashtags: ['#streaming', '#mobilfunk', '#umwelt', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Der Weg entscheidet, nicht die Serie',
      beschreibung:
        'Streaming und Mobilfunk: Was das Umweltbundesamt 2020 zur Klimawirkung der Übertragungswege rechnen ließ.',
      hashtags: ['#streaming', '#mobilfunk', '#umweltbundesamt', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
