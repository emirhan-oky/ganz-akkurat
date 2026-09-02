import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · „Bitte schalten Sie Ihr Handy aus."
 *
 * **Szenario 9: Der Dritte im Raum.** Nicht Volti und nicht Watti haben etwas
 * behauptet, sondern das Bordpersonal — und der Short arbeitet an dessen Satz
 * ab. Die dritte Instanz muss nicht erfunden werden: Sie steht in der Quelle.
 *
 * **Die Wendung ist, wer es entschieden hat.** Der Grund fuer die Abschaltung
 * war nie das Flugzeug, sondern das Netz am Boden — Geraete in der Hoehe sehen
 * zu viele Funkzellen auf einmal. Und seit 2022 ist 5G an Bord ausdruecklich
 * vorgesehen.
 *
 * **Das Thema lief am 18.08.2026 als `flugmodus-herkunft`.** Es wird bewusst
 * neu erzaehlt; die alte `themaId` bleibt, damit die Wache es meldet.
 */
export const flugmodusAnsage: Short = {
  id: 'flugmodus-ansage',
  themaId: 'flugmodus-herkunft',
  format: 'absicht',
  sachgebiet: 'fahren',
  bauform: 'zitatkarte',
  arbeitstitel: 'Die Ansage, die Watti nicht mehr glaubt',
  weitererzaehlt: 'zu viele Funkzellen auf einmal',
  suchbegriff: 'Flugmodus Handy',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Die Frau vorne sagt, ich soll mein Handy ausmachen. Schon wieder.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'flugzeug' },
  },
  vorspann: 'Wattis Flugmodus und die Ansage',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, stürzt der Flieger ab, wenn ich mein Handy anlasse? Nein. Warum sagt sie es dann?',
      rede: [
        { sprecher: 'zeiger', zug: 'bitten', text: 'Volti, stürzt der Flieger ab, wenn ich mein Handy anlasse?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Nein.' },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Warum sagt sie es dann?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'erklaeren' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'versuchen, sich bei terrestrischen UMTS-Mobilfunknetzen anzumelden',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'terrestrischen-umts-mobilfunknetzen',
      herausgeber: 'Europäische Union',
      sprechtext:
        'Weil dein Handy da oben versucht, sich bei den Netzen am Boden anzumelden. Und das stört den Piloten? Das stört den Boden. Es sieht zu viele Funkzellen auf einmal.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Weil dein Handy da oben versucht, sich bei den Netzen am Boden anzumelden.',
          quelleId: 'eu-mca-5g-an-bord',
          belegId: 'terrestrischen-umts-mobilfunknetzen',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'falscherschluss', text: 'Und das stört den Piloten?' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Das stört den Boden. Es sieht zu viele Funkzellen auf einmal.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'hinzufuegen-der-5g-netzanbindung',
      sprechtext:
        'Dann war es nie mein Handy, das gefährlich war. Es war nie deins. Seit 2022 ist 5G an Bord sogar ausdrücklich vorgesehen.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'umdeutung',
          text: 'Dann war es nie mein Handy, das gefährlich war.',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Es war nie deins. Seit 2022 ist 5G an Bord sogar ausdrücklich vorgesehen.',
          quelleId: 'eu-mca-5g-an-bord',
          belegId: 'hinzufuegen-der-5g-netzanbindung',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'zeigen',
        gegenueber: { von: 'lesen', nach: 'erklaeren' },
      },
    },
    {
      /*
       * **Der Kipppunkt gehoert dem Dritten.** Die Ansage ist aelter als die
       * Regel, auf die sie sich beruft — und niemand hat sie zurueckgenommen.
       */
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'bis-zum-1-januar-2026',
      sprechtext:
        'Und? Die Abschirmung war bis zum 1. Januar 2026 befristet. Also sagt sie etwas, was nicht mehr gilt? Sie sagt, was sie immer gesagt hat.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die Abschirmung war bis zum 1. Januar 2026 befristet.',
          quelleId: 'eu-mca-5g-an-bord',
          belegId: 'bis-zum-1-januar-2026',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          text: 'Also sagt sie etwas, was nicht mehr gilt?',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'banaleaufloesung',
          text: 'Sie sagt, was sie immer gesagt hat.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'nachdenken',
        gegenueber: { von: 'erklaeren', nach: 'achselzucken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Der Flugmodus schützt das Netz am Boden, nicht das Flugzeug.',
      sprechtext:
        'Dann lasse ich den Flugmodus jetzt aus. Machst du nicht. Und warum nicht? Weil sie es gesagt hat, kleiner.',
      rede: [
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'falscheautoritaet', text: 'Dann lasse ich den Flugmodus jetzt aus.' },
        { sprecher: 'nachleser', zug: 'widersprechen', text: 'Machst du nicht.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und warum nicht?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'menschenvergleich',
          text: 'Weil sie es gesagt hat, kleiner.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'achselzucken',
        gegenueber: { von: 'achselzucken', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen hört man Wattis erste Beschwerde als das, was am Ende bleibt: Die Ansage gilt weiter, egal was in der Verordnung steht.',
    },
  ],

  quellenIds: ['eu-mca-5g-an-bord'],

  texte: {
    tiktok: {
      titel: 'Die Ansage, die Watti nicht mehr glaubt',
      beschreibung: 'Flugmodus im Handy: Wen er wirklich schützt.',
      hashtags: ['#flugmodus', '#fliegen', '#mobilfunk', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Die Ansage, die Watti nicht mehr glaubt',
      beschreibung: 'Flugmodus am Handy schützt nicht das Flugzeug, sondern das Netz am Boden.',
      hashtags: ['#flugmodus', '#fliegen', '#handy', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was der Flugmodus in Wattis Handy wirklich schützt',
      beschreibung: 'Flugmodus und Handy: Was die EU-Verordnung zu Mobilfunk an Bord festlegt.',
      hashtags: ['#flugmodus', '#mobilfunk', '#luftfahrt', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
