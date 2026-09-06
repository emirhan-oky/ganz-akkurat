import type { Short } from '../../src/typen';

/**
 * Es war einmal · Das kleine G im Display.
 *
 * **Das Märchen ist ein Reflex:** Wer kein Netz hat, wartet darauf, dass
 * wenigstens das alte einspringt. Diese Rückfallebene gibt es für 3G seit 2021
 * nicht mehr — die Bundesnetzagentur schreibt es in einem Nebensatz, in dem es
 * eigentlich um 2G geht.
 *
 * **Der Kipppunkt ist die Zahl, die man falsch herum erwartet:** Das älteste
 * Netz deckt die größte Fläche. 2G kommt auf über 99 Prozent, 4G auf über 97,
 * 5G auf über 93 — und genau dieses 2G soll 2028 abgeschaltet werden.
 *
 * **Die Jahreszahlen sind absolut und altern deshalb nicht.** „Seit fünf
 * Jahren" wäre am Sendetag falsch gewesen, ohne dass jemand etwas geändert
 * hätte.
 */
export const dreiGAbgeschaltet: Short = {
  id: 'drei-g-abgeschaltet',
  themaId: 'drei-g-abgeschaltet',
  format: 'eswareinmal',
  sachgebiet: 'netz',
  bauform: 'wechselrede',
  arbeitstitel: 'Watti wartet auf das kleine G',
  weitererzaehlt: 'jeder einzelne Netzbetreiber mehr als 99 % der Fläche',
  suchbegriff: '3G abgeschaltet',
  kaltstart: {
    art: 'imvollzug',
    satz: 'Ein Balken steht noch. Gleich springt es auf 3G.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'hochschauen', requisite: 'lupe' },
  },
  vorspann: 'Wattis Balken und das Netz, das es nicht mehr gibt',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Volti, wie viele Balken hast du? Wonach suchst du? Nach 3G. Das kommt immer, wenn nichts geht.',
      rede: [
        { sprecher: 'zeiger', zug: 'behaupten', text: 'Volti, wie viele Balken hast du?' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wonach suchst du?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscheautoritaet',
          text: 'Nach 3G. Das kommt immer, wenn nichts geht.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'hochschauen',
        nach: 'erklaeren',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bnetza-2g-abschaltung',
      belegId: '3g-2021-abgeschaltet',
      herausgeber: 'Bundesnetzagentur',
      sprechtext:
        'Die 3G-Netze wurden 2021 abgeschaltet, du Pfosten. Dann steht da manchmal noch ein E. Das ist 2G, und das ist noch älter.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Die 3G-Netze wurden 2021 abgeschaltet, du Pfosten.',
          quelleId: 'bnetza-2g-abschaltung',
          belegId: '3g-2021-abgeschaltet',
        },
        {
          sprecher: 'zeiger',
          zug: 'widersprechen',
          machart: 'rechtfertigung',
          text: 'Dann steht da manchmal noch ein E.',
        },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Das ist 2G, und das ist noch älter.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'erklaeren',
        gegenueber: { von: 'erklaeren', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bnetza-2g-abschaltung',
      belegId: '2g-mehr-als-99-prozent',
      sprechtext:
        'Älter? Dann rettet mich das Älteste. Mit 2G erreicht jeder einzelne Netzbetreiber mehr als 99 % der Fläche. Welche Fläche meinst du? Gemeint ist Deutschland. Mit 4G sind es über alle Netze mehr als 97 %.',
      rede: [
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'falscherschluss', text: 'Älter? Dann rettet mich das Älteste.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Mit 2G erreicht jeder einzelne Netzbetreiber mehr als 99 % der Fläche.',
          quelleId: 'bnetza-2g-abschaltung',
          belegId: '2g-mehr-als-99-prozent',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Welche Fläche meinst du?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Gemeint ist Deutschland. Mit 4G sind es über alle Netze mehr als 97 %.',
          quelleId: 'bnetza-2g-abschaltung',
          belegId: '4g-97-5g-93',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bnetza-2g-abschaltung',
      belegId: '2g-abschaltung-2028',
      sprechtext:
        'Dann bleibe ich einfach bei 2G. Telekom, Vodafone und Telefónica haben angekündigt, ihre 2G-Netze voraussichtlich 2028 abzuschalten. Das mit der größten Fläche fliegt zuerst raus?',
      rede: [
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'uebercompliance', text: 'Dann bleibe ich einfach bei 2G.' },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Telekom, Vodafone und Telefónica haben angekündigt, ihre 2G-Netze voraussichtlich 2028 abzuschalten.',
          quelleId: 'bnetza-2g-abschaltung',
          belegId: '2g-abschaltung-2028',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'ratlosigkeit',
          text: 'Das mit der größten Fläche fliegt zuerst raus?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Auf 3G wartet hier niemand mehr.',
      sprechtext: 'Die Frequenzen sind begrenzt, und 2G ist veraltet. Und ich stehe hier ohne alles. Du stehst im Wald, du Idiot.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die Frequenzen sind begrenzt, und 2G ist veraltet.',
          quelleId: 'bnetza-2g-abschaltung',
          belegId: 'abschaltung-geboten',
        },
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'katastrophe', text: 'Und ich stehe hier ohne alles.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          machart: 'nebenbemerkung',
          text: 'Du stehst im Wald, du Idiot.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'ansprechen',
        gegenueber: { von: 'nachdenken', nach: 'ruhe' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „gleich springt es auf 3G" das Warten auf ein Netz, das seit 2021 abgeschaltet ist.',
    },
  ],

  quellenIds: ['bnetza-2g-abschaltung'],

  texte: {
    tiktok: {
      titel: 'Watti wartet auf das kleine G',
      beschreibung: '3G abgeschaltet: Was seit 2021 fehlt und wie weit die einzelnen Netze reichen.',
      hashtags: ['#3g', '#mobilfunk', '#technikwissen', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti wartet auf das kleine G',
      beschreibung: '3G abgeschaltet: Die Bundesnetzagentur schreibt, dass die 3G-Netze 2021 abgeschaltet wurden.',
      hashtags: ['#3g', '#mobilfunk', '#netz', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Beim ältesten Netz reicht die Fläche am weitesten',
      beschreibung: '3G abgeschaltet: Was die Bundesnetzagentur zu 2G, 4G und 5G an Flächenversorgung nennt.',
      hashtags: ['#3g', '#mobilfunk', '#technikwissen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
