import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · Fuer jeden versaeumten Technikertermin gibt es Geld.
 *
 * **Szenario 10, viertes Beispiel: Die Wette.** Die Zitatkarte entscheidet, und
 * der Verlierer liest sie vor — hier ist das **Volti**, wie in
 * `virenprogramm-wette`. Damit steht es im Vorrat 2:2, und der belesene Bruder
 * verliert genauso oft wie der kleine.
 *
 * **Warum Watti es weiss, steht im Dialog.** Der Skill erlaubt ihm die Quelle,
 * wenn die Vorgeschichte sie traegt: Er hat acht Stunden im Flur gesessen und
 * dabei nachgelesen. Das ist zugleich die Pointe — die Wartezeit, ueber die er
 * sich beschwert, ist der Grund, warum er gewinnt.
 *
 * **Der Anspruch ist bedingt, und die Bedingung steht im Dialog:** „es sei
 * denn, der Verbraucher hat das Versaeumnis des Termins zu vertreten." Watti
 * sass da; sie ist erfuellt, ohne dass jemand einen Nebensatz vortragen muss.
 */
export const technikerTermin: Short = {
  id: 'techniker-termin',
  themaId: 'entschaedigung-versaeumter-termin',
  format: 'gibtswirklich',
  sachgebiet: 'netz',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti sitzt den Tag im Flur und stellt eine Rechnung',
  weitererzaehlt: 'für jeden versäumten Termin',
  suchbegriff: 'Techniker Termin versäumt',
  kaltstart: {
    art: 'momentdanach',
    satz: 'Acht Stunden habe ich im Flur gewartet, und der Techniker kam nicht.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'achselzucken', requisite: 'uhr' },
  },
  vorspann: 'Wattis Techniker kommt nicht',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, warum sitzt du im Flur? Der Techniker vom Internetanbieter sollte kommen. Pech. Mach einen neuen Termin aus.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, warum sitzt du im Flur?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Der Techniker vom Internetanbieter sollte kommen.' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Pech. Mach einen neuen Termin aus.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'stutzen',
        gegenueber: { von: 'ruhe', nach: 'zeigen' },
      },
    },
    {
      art: 'zahl',
      position: 'zuspitzung',
      wert: '10',
      einheit: 'Euro',
      bedeutung: 'je Termin, den dein Anbieter versäumt — oder 20 % vom festen Monatsentgelt',
      quelleId: 'tkg-58-entstoerung',
      belegId: 'versaeumter-termin-zehn-euro',
      sprechtext: 'Und meine 10 Euro? Welche 10 Euro? Der Termin war vereinbart und er hat ihn versäumt. Dafür gibt es 10 Euro. Wetten?',
      rede: [
        { sprecher: 'zeiger', zug: 'behaupten', text: 'Und meine 10 Euro?' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Welche 10 Euro?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Der Termin war vereinbart und er hat ihn versäumt. Dafür gibt es 10 Euro. Wetten?',
          quelleId: 'tkg-58-entstoerung',
          belegId: 'versaeumter-termin-zehn-euro',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'zeigen',
        gegenueber: { von: 'zeigen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Wetten. Wenn ich gewinne, machst du eine Woche den Abwasch. Und wenn ich gewinne, machst du ihn. Abgemacht. Ich lese vor.',
      rede: [
        { sprecher: 'nachleser', zug: 'zuspitzen', text: 'Wetten. Wenn ich gewinne, machst du eine Woche den Abwasch.' },
        { sprecher: 'zeiger', zug: 'zuspitzen', text: 'Und wenn ich gewinne, machst du ihn.' },
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Abgemacht. Ich lese vor.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'nachdenken',
        gegenueber: { von: 'stutzen', nach: 'lesen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'für jeden versäumten Termin eine Entschädigung in Höhe von 10 Euro',
      quelleId: 'tkg-58-entstoerung',
      belegId: 'versaeumter-termin-zehn-euro',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext:
        'Für jeden versäumten Termin eine Entschädigung in Höhe von 10 Euro. Oder 20 Prozent vom Monatsentgelt, wenn du jeden Monat dasselbe zahlst. Je nachdem, welcher Betrag höher ist.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Für jeden versäumten Termin eine Entschädigung in Höhe von 10 Euro.',
          quelleId: 'tkg-58-entstoerung',
          belegId: 'versaeumter-termin-zehn-euro',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachlegen',
          text: 'Oder 20 Prozent vom Monatsentgelt, wenn du jeden Monat dasselbe zahlst. Je nachdem, welcher Betrag höher ist.',
          quelleId: 'tkg-58-entstoerung',
          belegId: 'je-nachdem-welcher-betrag-hoeher',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'staunen',
        gegenueber: { von: 'lesen', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext:
        'Woher weißt du das? Acht Stunden im Flur. Da liest man was. Und wenn du selbst schuld bist am Termin?',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Woher weißt du das?' },
        { sprecher: 'zeiger', zug: 'erinnern', machart: 'rechtfertigung', text: 'Acht Stunden im Flur. Da liest man was.' },
        {
          sprecher: 'nachleser',
          zug: 'nachhaken',
          text: 'Und wenn du selbst schuld bist am Termin?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'zeigen',
        gegenueber: { von: 'erklaeren', nach: 'stutzen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Nötig ist ein vereinbarter Termin, den der Anbieter versäumt hat.',
      sprechtext:
        'Dann gibt es nichts. Ich saß aber da. Eine Woche Abwasch. Und den neuen Termin machst du.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Dann gibt es nichts. Ich saß aber da.',
          quelleId: 'tkg-58-entstoerung',
          belegId: 'je-nachdem-welcher-betrag-hoeher',
        },
        { sprecher: 'nachleser', zug: 'einlenken', machart: 'gestaendnis', text: 'Eine Woche Abwasch.' },
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'umdeutung', text: 'Und den neuen Termin machst du.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'nachdenken',
        gegenueber: { von: 'stutzen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen sind die acht Stunden im Flur nicht der Ärger, sondern der Grund, warum Watti die Wette gewinnt.',
    },
  ],

  quellenIds: ['tkg-58-entstoerung'],

  texte: {
    tiktok: {
      titel: 'Watti sitzt den Tag im Flur und stellt eine Rechnung',
      beschreibung: 'Techniker Termin versäumt: 10 Euro kannst du beim Anbieter verlangen.',
      hashtags: ['#techniker', '#tkg', '#verbraucherrechte', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti sitzt den Tag im Flur und stellt eine Rechnung',
      beschreibung: 'Techniker Termin versäumt: Für jeden vom Anbieter versäumten Termin gibt es einen Anspruch.',
      hashtags: ['#techniker', '#internet', '#recht', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Für den versäumten Termin kannst du 10 Euro verlangen',
      beschreibung: 'Techniker Termin versäumt: Was § 58 TKG über Entschädigungen bei versäumten Terminen sagt.',
      hashtags: ['#techniker', '#tkg', '#internet', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
