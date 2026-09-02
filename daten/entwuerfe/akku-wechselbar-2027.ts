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
 * **Zwei schwere Befunde vom 03.09.2026.** Der Short stand auf „Ab dem 18.
 * Februar 2027 gilt eine neue Regel fuer alle Batterien" — und die einzige
 * Fundstelle dieser Zeichenkette ist Artikel 13 Absatz 6, die **QR-Code-
 * Kennzeichnung**. Die Regel, von der der Short handelt, ist Artikel 11, und
 * ihr Geltungsbeginn steht in Artikel 96. `quellen-pruefen` war gruen, weil
 * die Zeichenkette auf der Seite stand — genau der Bau des Ersatzteil-Falls
 * vom 01.09.
 *
 * Zweitens sagte Volti „Kein Foehn und kein Loesungsmittel" und bestaetigte
 * mit „Woertlich." einen Wortlaut, der so nicht dasteht: Die Quelle sagt
 * **Waermeenergie**, und die tragende Verneinung („ohne Verwendung von") stand
 * ausserhalb der geprueften Zeichenkette. Beide Zitate stammten ausserdem aus
 * dem Erwaegungsgrund im Konjunktiv; heute steht der verfuegende Artikel 11
 * dahinter.
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
      belegId: 'leicht-entfernt-und-ausgetauscht',
      herausgeber: 'Europäische Union',
      sprechtext:
        'Worauf denn warten? Wer ein Produkt mit eingebautem Akku verkauft, muss dich den Akku selbst entfernen lassen. Ab wann? Artikel 11 gilt ab dem 18. Februar 2027. Und dann geht meins auf?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Worauf denn warten?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Wer ein Produkt mit eingebautem Akku verkauft, muss dich den Akku selbst entfernen lassen.',
          quelleId: 'eu-batterie-entnehmbar',
          belegId: 'leicht-entfernt-und-ausgetauscht',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Ab wann?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Artikel 11 gilt ab dem 18. Februar 2027.',
          quelleId: 'eu-batterie-entnehmbar',
          belegId: 'artikel-11-gilt-ab',
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
      belegId: 'handelsuebliche-werkzeuge-artikel-11',
      sprechtext:
        'Deins nicht, du Idiot. Neue Geräte. Leicht zu entfernen heißt: mit handelsüblichen Werkzeugen. Also kann man den Akku dann selbst wechseln?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Deins nicht, du Idiot. Neue Geräte. Leicht zu entfernen heißt: mit handelsüblichen Werkzeugen.',
          quelleId: 'eu-batterie-entnehmbar',
          belegId: 'handelsuebliche-werkzeuge-artikel-11',
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
      belegId: 'ohne-verwendung-von-spezialwerkzeugen',
      sprechtext:
        'Ohne Spezialwerkzeug, ohne Wärmeenergie, ohne Lösungsmittel. Das steht da wirklich drin? Wörtlich. Man schreibt so etwas nur hin, wenn es einer macht.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ohne Spezialwerkzeug, ohne Wärmeenergie, ohne Lösungsmittel.',
          quelleId: 'eu-batterie-entnehmbar',
          belegId: 'ohne-verwendung-von-spezialwerkzeugen',
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
      satz: 'Artikel 11 gilt ab dem 18. Februar 2027.',
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
      beschreibung: 'Akku wechseln: Was Artikel 11 ab dem 18. Februar 2027 verlangt.',
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
