import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · die Liste, durch die Watti sich fragt.
 *
 * **Szenario 12, zweites Beispiel: Volti hat es aufgegeben.** Das Aufgeben
 * passiert in der vorletzten Zeile: Volti sagt nur noch den Namen. Und Wattis
 * Fragen laufen die Geraeteliste der Richtlinie ab, ohne dass er es merkt —
 * Laptop, Netbook, Tablet, Maus stehen dort alle, in genau dieser Reihenfolge
 * weiter unten.
 *
 * **Die Zuordnung ist im Anhang nachgeprueft.** „1.13. Laptops." steht dort
 * woertlich, und Maeuse sind Nummer 1.10 — also seit Dezember 2024 dabei.
 * Voltis Kapitulation am Ende ist damit richtig gelagert: Er **koennte**
 * antworten, er will nur nicht mehr.
 *
 * **`usb-neue-klasse` waere das geplante Thema gewesen** und ist gefallen: Das
 * USB Implementers Forum ist eine beteiligte Quelle, und jeder Short braucht
 * eine unbeteiligte.
 */
export const laptopUsbC: Short = {
  id: 'laptop-usb-c',
  themaId: 'ladeanschluss-laptops',
  format: 'absicht',
  sachgebiet: 'rechner',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti fragt sich durch die Liste',
  weitererzaehlt: 'Notebooks, Ultrabooks, Convertibles, Netbooks',
  suchbegriff: 'Laptop USB-C',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Mein Laptop lädt immer noch mit dem dicken Klotz.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'karton' },
  },
  vorspann: 'Watti fragt sich durch die Liste',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, zum vierten Mal. Was denn, ich frage doch nur. Seit April 2026 müssen neue Laptops über USB-C laden.',
      rede: [
        { sprecher: 'nachleser', zug: 'zuspitzen', machart: 'nebenbemerkung', text: 'Watti, zum vierten Mal.' },
        { sprecher: 'zeiger', zug: 'umdeuten', text: 'Was denn, ich frage doch nur.' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Seit April 2026 müssen neue Laptops über USB-C laden.',
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
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'fristen-dezember-und-april',
      herausgeber: 'Europäische Union',
      sprechtext:
        'Auch meiner? Deiner ist von 2022. Und wenn ich ihn neu kaufe? Dann hat er USB-C. Wie ich es dir am Montag gesagt habe.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Auch meiner?' },
        { sprecher: 'nachleser', zug: 'erinnern', text: 'Deiner ist von 2022.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn ich ihn neu kaufe?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann hat er USB-C. Wie ich es dir am Montag gesagt habe.',
          quelleId: 'eu-einheitlicher-ladeanschluss',
          belegId: 'fristen-dezember-und-april',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'Bei Laptops fallen alle tragbaren Computer, einschließlich Laptops, Notebooks, Ultrabooks',
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'laptops-alle-tragbaren-computer',
      sprechtext:
        'Und mein altes Netbook auch? Bei neuen auch. Notebooks, Ultrabooks, Convertibles, Netbooks. Alles.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und mein altes Netbook auch?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Bei neuen auch. Notebooks, Ultrabooks, Convertibles, Netbooks. Alles.',
          quelleId: 'eu-einheitlicher-ladeanschluss',
          belegId: 'laptops-alle-tragbaren-computer',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'staunen',
        gegenueber: { von: 'zeigen', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'geraeteliste-ab-mobiltelefonen',
      sprechtext: 'Und was ist mit meinem Tablet? Tablets waren Dezember 2024. Auch das habe ich dir gesagt.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was ist mit meinem Tablet?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Tablets waren Dezember 2024. Auch das habe ich dir gesagt.',
          quelleId: 'eu-einheitlicher-ladeanschluss',
          belegId: 'geraeteliste-ab-mobiltelefonen',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'ansprechen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Vom Tablet bis zum Laptop steht alles auf derselben Liste.',
      sprechtext:
        'Und meine Maus, die vom Flohmarkt? Watti. Was denn? Frag mich, wenn du eine neue Maus hast.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und meine Maus, die vom Flohmarkt?' },
        { sprecher: 'nachleser', zug: 'abbiegen', text: 'Watti.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Was denn?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'banaleaufloesung',
          text: 'Frag mich, wenn du eine neue Maus hast.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'stutzen',
        gegenueber: { von: 'ansprechen', nach: 'nachdenken' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, dass Wattis Frage nach dem Klotz die vierte war – und dass sie beim nächsten Mal wiederkommt.',
    },
  ],

  quellenIds: ['eu-einheitlicher-ladeanschluss'],

  texte: {
    tiktok: {
      titel: 'Watti fragt sich durch die Liste',
      beschreibung: 'Laptop und USB-C: Ab wann welches Gerät denselben Anschluss braucht.',
      hashtags: ['#usbc', '#laptop', '#ladeanschluss', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti fragt sich durch die Liste',
      beschreibung: 'Laptop und USB-C: Netbooks und Convertibles zählen ausdrücklich mit.',
      hashtags: ['#usbc', '#laptop', '#notebook', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Ab wann Laptops USB-C haben müssen',
      beschreibung: 'Laptop und USB-C: Was die Richtlinie über Stichtage und Gerätekategorien schreibt.',
      hashtags: ['#usbc', '#laptop', '#ladeanschluss', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
