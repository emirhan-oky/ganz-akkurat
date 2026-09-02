import type { Short } from '../../src/typen';

/**
 * Es war einmal · der eingeklebte Akku und der 18. Februar 2027.
 *
 * **Szenario 8: Der Rueckfall.** Watti wartet auf die Pflicht zum wechselbaren
 * Akku — und klebt sein Handy am Ende trotzdem wieder zu. Die Form verlangt,
 * dass er am Schluss dasselbe tut wie am Anfang, nachdem er alles verstanden
 * hat.
 *
 * **Der Rueckfall ist keine Dummheit, sondern eine Gewohnheit.** Watti lernt
 * nichts, und das ist die Figur: Er hat recht verstanden, dass es besser wird,
 * und zieht daraus, dass er heute nichts aendern muss.
 *
 * **Das Thema lief am 18.08.2026 schon einmal** — 19 Sekunden, einstimmig,
 * 0-mal geteilt. Es wird bewusst neu erzaehlt und traegt deshalb die alte
 * `themaId`, damit die Wache `wiederholung` es meldet, statt es still passieren
 * zu lassen.
 */
export const akkuWechselbar2027: Short = {
  id: 'akku-wechselbar-neu',
  themaId: 'akku-wechselbar-2027',
  format: 'eswareinmal',
  sachgebiet: 'handy',
  bauform: 'wechselrede',
  arbeitstitel: 'Watti klebt sein Handy wieder zu',
  weitererzaehlt: 'mit handelsüblichen Werkzeugen',
  suchbegriff: 'Akku wechseln',
  kaltstart: {
    art: 'imvollzug',
    satz: 'Der Akku ist hin, und aufmachen kann man das Ding nicht.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'nachdenken', requisite: 'batterie' },
  },
  vorspann: 'Wattis Akku und der Klebstoff',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, was macht man mit einem Akku, an den man nicht rankommt? Wegbringen. Oder warten.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'bitten',
          text: 'Volti, was macht man mit einem Akku, an den man nicht rankommt?',
        },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Wegbringen. Oder warten.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-batterie-entnehmbar',
      belegId: 'ab-dem-18-februar-2027',
      herausgeber: 'Europäische Union',
      sprechtext:
        'Worauf denn warten? Ab dem 18. Februar 2027 gilt eine neue Regel für alle Batterien. Und dann geht meins auf?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Worauf denn warten?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ab dem 18. Februar 2027 gilt eine neue Regel für alle Batterien.',
          quelleId: 'eu-batterie-entnehmbar',
          belegId: 'ab-dem-18-februar-2027',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'falscherschluss', text: 'Und dann geht meins auf?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'stutzen',
        gegenueber: { von: 'stutzen', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-batterie-entnehmbar',
      belegId: 'handelsueblichen-werkzeugen-entfernt',
      sprechtext:
        'Deins nicht, du Idiot. Neue Geräte. Der Akku muss sich mit handelsüblichen Werkzeugen entfernen lassen. Also kann man den Akku dann selbst wechseln?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Deins nicht, du Idiot. Neue Geräte. Der Akku muss sich mit handelsüblichen Werkzeugen entfernen lassen.',
          quelleId: 'eu-batterie-entnehmbar',
          belegId: 'handelsueblichen-werkzeugen-entfernt',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Also kann man den Akku dann selbst wechseln?' },
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
      /*
       * **Der Kipppunkt eines Maerchens ist das „und heute".** Hier ist es das
       * „und ab 2027": Was ausdruecklich verboten werden musste, war vorher
       * offensichtlich der Normalfall.
       */
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-batterie-entnehmbar',
      belegId: 'waermeenergie-oder-loesungsmittel',
      sprechtext:
        'Kein Föhn und kein Lösungsmittel. Das steht da wirklich drin? Wörtlich. Man schreibt so etwas nur hin, wenn es einer macht.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Kein Föhn und kein Lösungsmittel.',
          quelleId: 'eu-batterie-entnehmbar',
          belegId: 'waermeenergie-oder-loesungsmittel',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Das steht da wirklich drin?' },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          machart: 'nebenbemerkung',
          text: 'Wörtlich. Man schreibt so etwas nur hin, wenn es einer macht.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'staunen',
        gegenueber: { von: 'zeigen', nach: 'lesen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Ab 2027 muss der Akku mit normalem Werkzeug herausgehen.',
      sprechtext:
        'Also bringe ich mein Handy weg. Genau das. Und was machst du da? Ich klebe es erstmal wieder zu.',
      rede: [
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Also bringe ich mein Handy weg.' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Genau das. Und was machst du da?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'rechtfertigung',
          text: 'Ich klebe es erstmal wieder zu.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist der erste Satz kein Problem mehr, sondern eine Ansage: Watti macht es wieder zu, und er weiß jetzt sogar, warum das nicht hilft.',
    },
  ],

  quellenIds: ['eu-batterie-entnehmbar'],

  texte: {
    tiktok: {
      titel: 'Watti klebt sein Handy wieder zu',
      beschreibung: 'Akku wechseln: Was sich am 18. Februar 2027 ändert.',
      hashtags: ['#akku', '#reparatur', '#eu', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti klebt sein Handy wieder zu',
      beschreibung: 'Akku wechseln mit handelsüblichem Werkzeug. Ab 2027 Pflicht.',
      hashtags: ['#akku', '#reparatur', '#handy', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Warum Wattis Akku erst ab 2027 herausgeht',
      beschreibung: 'Akku wechseln: Was die EU-Batterieverordnung ab dem 18. Februar 2027 verlangt.',
      hashtags: ['#akku', '#batterieverordnung', '#reparatur', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
