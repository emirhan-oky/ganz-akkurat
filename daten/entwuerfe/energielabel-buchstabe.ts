import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · zwei Buchstaben auf demselben Etikett.
 *
 * **Szenario 11, drittes Beispiel: Watti erzählt es falsch weiter.** Er hat
 * vom neuen Etikett gehoert und macht daraus einen einzigen Buchstaben, der
 * alles bedeutet — und gibt ihn am Ende genauso weiter.
 *
 * **Zwei Klassen, dieselben Buchstaben.** Die Energieeffizienzklasse laeuft
 * von A bis G, die Reparierbarkeitsklasse von A bis E, und beide stehen auf
 * demselben Etikett. Genau daran scheitert Wattis Weitergabe: Er kennt den
 * Buchstaben und nicht die Frage, auf die er antwortet.
 *
 * **Kein „A ist immer gut".** Die Verordnung sagt „A (am besten
 * reparierbar)" — das ist eine Skala unter mehreren, und wer sie zur Note
 * macht, hat Befund 62 gebaut.
 */
export const energielabelBuchstabe: Short = {
  id: 'energielabel-buchstabe',
  themaId: 'energielabel-smartphones',
  format: 'gibtswirklich',
  sachgebiet: 'handy',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Handy hat ein A',
  weitererzaehlt: 'am besten reparierbar',
  suchbegriff: 'Energielabel Handy',
  kaltstart: {
    art: 'stolzerfehler',
    satz: 'Mein neues Handy hat ein A auf dem Energielabel. Bestes Gerät.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'regal' },
  },
  vorspann: 'Wattis Handy hat ein A',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, ein A wofür? Ein A ist ein A. Steht auf dem Energielabel. Auf dem Etikett stehen mehrere Buchstaben, du Idiot.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, ein A wofür?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscherschluss',
          text: 'Ein A ist ein A. Steht auf dem Energielabel.',
        },
        {
          sprecher: 'nachleser',
          zug: 'widersprechen',
          text: 'Auf dem Etikett stehen mehrere Buchstaben, du Idiot.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'ruhe', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-energielabel-smartphones',
      belegId: 'skala-a-bis-g',
      herausgeber: 'Europäische Kommission',
      sprechtext:
        'Wieso mehrere? Einer ist die Energieeffizienzklasse, die geht von A bis G. Und der andere? Wie gut sich dein Handy reparieren lässt. Der geht nur bis E.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Wieso mehrere?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Einer ist die Energieeffizienzklasse, die geht von A bis G.',
          quelleId: 'eu-energielabel-smartphones',
          belegId: 'skala-a-bis-g',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und der andere?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Wie gut sich dein Handy reparieren lässt. Der geht nur bis E.',
          quelleId: 'eu-energielabel-smartphones',
          belegId: 'reparierbarkeit-a-bis-e',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'achselzucken',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'A (am besten reparierbar)',
      quelleId: 'eu-energielabel-smartphones',
      belegId: 'a-am-besten-reparierbar',
      sprechtext:
        'Also zweimal dieselbe Skala? Zwei verschiedene. A heißt am besten reparierbar. Also hab ich zweimal A?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Also zweimal dieselbe Skala?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Zwei verschiedene. A heißt am besten reparierbar.',
          quelleId: 'eu-energielabel-smartphones',
          belegId: 'a-am-besten-reparierbar',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'uebercompliance', text: 'Also hab ich zweimal A?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'achselzucken',
        nach: 'staunen',
        gegenueber: { von: 'zeigen', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-energielabel-smartphones',
      belegId: 'stuerze-ohne-defekt',
      sprechtext:
        'Guck nach. Und da steht noch ein Buchstabe. Die Klasse fürs Fallenlassen. Auf einem Etikett?',
      rede: [
        { sprecher: 'nachleser', zug: 'bitten', text: 'Guck nach.' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Und da steht noch ein Buchstabe.' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die Klasse fürs Fallenlassen.',
          quelleId: 'eu-energielabel-smartphones',
          belegId: 'klasse-freier-fall',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Auf einem Etikett?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'erklaeren' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Ein Buchstabe beantwortet immer nur eine Frage.',
      sprechtext:
        'Auf einem Etikett. Und was erzähle ich jetzt im Büro? Dass du nachgeguckt hast. Ich erzähle lieber, dass mein Handy überall A hat.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Auf einem Etikett.',
          quelleId: 'eu-energielabel-smartphones',
          belegId: 'reparierbarkeit-a-bis-e',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was erzähle ich jetzt im Büro?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Dass du nachgeguckt hast.' },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'umdeutung',
          text: 'Ich erzähle lieber, dass mein Handy überall A hat.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'achselzucken',
        gegenueber: { von: 'erklaeren', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „Mein neues Handy hat ein A" schon die falsche Weitergabe – und am Ende macht Watti sie noch einmal.',
    },
  ],

  quellenIds: ['eu-energielabel-smartphones'],

  texte: {
    tiktok: {
      titel: 'Wattis Handy hat ein A',
      beschreibung: 'Energielabel fürs Handy: Warum ein Buchstabe nicht reicht.',
      hashtags: ['#energielabel', '#handy', '#reparierbarkeit', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Handy hat ein A',
      beschreibung: 'Energielabel fürs Handy: Zwei Klassen, dieselben Buchstaben, verschiedene Fragen.',
      hashtags: ['#energielabel', '#handy', '#smartphone', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was der Buchstabe auf dem Handy-Etikett bedeutet',
      beschreibung: 'Energielabel fürs Handy: Was die EU über Energieeffizienz- und Reparierbarkeitsklasse schreibt.',
      hashtags: ['#energielabel', '#handy', '#eu', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
