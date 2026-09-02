import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · drei Powerbanks im Handgepaeck.
 *
 * **Szenario 7: Watti hat einen Plan, Volti rechnet vor.** Watti packt fuer
 * den Flug drei Powerbanks ein und ist stolz darauf. Volti rechnet ihm vor,
 * was daraus wird — und die Rechnung ist der Short.
 *
 * **Die einzige Idee im Vorrat mit Reifegrad `belegt` ohne Entwurf**, und sie
 * steht auf drei unbeteiligten Quellen aus drei Laendern: LBA, EASA, FAA. Das
 * ist selten genug, um es hier festzuhalten — die 100 Wh sind keine deutsche
 * Besonderheit.
 *
 * **Die Einheit ist die Pointe.** Auf der Powerbank steht mAh, gezaehlt werden
 * Wattstunden, und dazwischen liegt eine Multiplikation, die niemand macht.
 *
 * **Der Belegpruefer hat am 03.09.2026 eine erfundene Zahl gefunden.** Hier
 * stand „Mal die Spannung, dann bist du bei 74" — die 3,7 Volt einer Zelle
 * stehen in keiner der drei Quellen. Die FAA nennt den **Rechenweg**, nicht
 * das Ergebnis. Plausibel und erfunden ist genau der Fall, gegen den der
 * ganze Belegapparat gebaut ist; heute nennt Volti den Rechenweg und den
 * Aufdruck, und beides steht woertlich da.
 */
export const powerbankWattstunden: Short = {
  id: 'powerbank-wattstunden',
  themaId: 'powerbank-wattstunden',
  format: 'gibtswirklich',
  sachgebiet: 'laden',
  bauform: 'stationen',
  arbeitstitel: 'Watti packt drei Powerbanks ein',
  weitererzaehlt: 'Das ist die falsche Einheit',
  suchbegriff: 'Powerbank Handgepäck',
  kaltstart: {
    art: 'stolzerfehler',
    satz: 'Drei Powerbanks im Koffer, damit gehe ich nie wieder leer aus.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'koffer' },
  },
  vorspann: 'Wattis Powerbanks und der Koffer',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Was packst du denn da ein? Drei Powerbanks. Und die kommen alle in den Koffer?',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Was packst du denn da ein?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Drei Powerbanks.' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und die kommen alle in den Koffer?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'zeigen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'lba-lithiumbatterien',
      belegId: 'lose-lithiumersatzbatterien-power-ba',
      herausgeber: 'Luftfahrt-Bundesamt',
      sprechtext:
        'Klar, im Handgepäck ist kein Platz. Powerbanks sind im aufgegebenen Gepäck verboten. Sie dürfen nur ins Handgepäck.',
      rede: [
        { sprecher: 'zeiger', zug: 'beantworten', machart: 'rechtfertigung', text: 'Klar, im Handgepäck ist kein Platz.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Powerbanks sind im aufgegebenen Gepäck verboten. Sie dürfen nur ins Handgepäck.',
          quelleId: 'lba-lithiumbatterien',
          belegId: 'lose-lithiumersatzbatterien-power-ba',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'easa-lithium-handgepaeck',
      belegId: 'they-must-be-individually',
      sprechtext:
        'Dann eben alle drei in den Rucksack. Und jede einzeln gegen Kurzschluss sichern.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'uebercompliance',
          text: 'Dann eben alle drei in den Rucksack.',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Und jede einzeln gegen Kurzschluss sichern.',
          quelleId: 'easa-lithium-handgepaeck',
          belegId: 'they-must-be-individually',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'faa-lithium-grenzwerte',
      belegId: 'batteries-are-limited-to',
      sprechtext:
        'Volti, sag mir einfach, wie viele ich mitnehmen darf. Wie viel steht denn auf deinen drauf? 20000, glaube ich. Das ist die falsche Einheit. Gezählt werden Wattstunden.',
      rede: [
        { sprecher: 'zeiger', zug: 'bitten', text: 'Volti, sag mir einfach, wie viele ich mitnehmen darf.' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wie viel steht denn auf deinen drauf?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: '20000, glaube ich.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Das ist die falsche Einheit. Gezählt werden Wattstunden.',
          quelleId: 'faa-lithium-grenzwerte',
          belegId: 'batteries-are-limited-to',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
    },
    {
      /*
       * **Der Kipppunkt ist die Rechnung.** Die Zahl steht im Bild, weil
       * `zahlImBild` das fuer jede technische Angabe verlangt — und weil sie
       * hier die Wendung ist: Auf der Powerbank steht mAh, entschieden wird es
       * in Wattstunden, und dazwischen liegt eine Multiplikation.
       */
      art: 'zahl',
      position: 'kipppunkt',
      wert: '100',
      einheit: 'Wattstunden',
      bedeutung: 'darüber geht es nur mit Genehmigung des Betreibers',
      quelleId: 'lba-lithiumbatterien',
      belegId: 'mit-genehmigung-des-betreibers',
      sprechtext:
        'Und wie komme ich von meiner Zahl auf deine? Volt mal Amperestunden. Auf neueren steht die Zahl sogar drauf. Und wo ist Schluss? Über 100 Wh geht es nur mit Genehmigung des Betreibers, und bei 160 ist Ende.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wie komme ich von meiner Zahl auf deine?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Volt mal Amperestunden.',
          quelleId: 'faa-lithium-grenzwerte',
          belegId: 'to-calculate-wh-multiply',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Auf neueren steht die Zahl sogar drauf.',
          quelleId: 'faa-lithium-grenzwerte',
          belegId: 'wh-rating-marked-on-them',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Und wo ist Schluss?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Über 100 Wh geht es nur mit Genehmigung des Betreibers, und bei 160 ist Ende.',
          quelleId: 'lba-lithiumbatterien',
          belegId: 'mit-genehmigung-des-betreibers',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'lesen',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Auf der Powerbank steht mAh, gezählt werden Wattstunden.',
      sprechtext:
        'Und was heißt das für mich? Jede einzeln, alle im Handgepäck, und keine über den Grenzwerten. Ich nehme eine mit. Und die anderen zwei? Die lade ich hier vor, kleiner.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was heißt das für mich?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Jede einzeln, alle im Handgepäck, und keine über den Grenzwerten.',
          quelleId: 'lba-lithiumbatterien',
          belegId: 'grenzwerte-nicht-ueberschreiten',
        },
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Ich nehme eine mit.' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und die anderen zwei?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscherschluss',
          text: 'Die lade ich hier vor, kleiner.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'lesen',
        nach: 'ansprechen',
        gegenueber: { von: 'staunen', nach: 'zeigen' },
      },
      rundlauf:
        'Beim zweiten Sehen hört man den ersten Satz als Plan, der schon am Koffer scheitert – die Powerbanks dürfen dort gar nicht hinein.',
    },
  ],

  quellenIds: ['lba-lithiumbatterien', 'easa-lithium-handgepaeck', 'faa-lithium-grenzwerte'],

  texte: {
    tiktok: {
      titel: 'Watti packt drei Powerbanks ein',
      beschreibung: 'Powerbank und Handgepäck: Was mit ins Flugzeug darf und was nicht.',
      hashtags: ['#powerbank', '#fliegen', '#handgepaeck', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti packt drei Powerbanks ein',
      beschreibung: 'Powerbank im Handgepäck: mAh steht drauf, gezählt werden Wattstunden.',
      hashtags: ['#powerbank', '#fliegen', '#reisen', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Wie viele Powerbanks Watti ins Handgepäck darf',
      beschreibung: 'Powerbank im Handgepäck: Was Luftfahrt-Bundesamt, EASA und FAA zur 100-Wh-Grenze schreiben.',
      hashtags: ['#powerbank', '#luftfahrt', '#akku', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
