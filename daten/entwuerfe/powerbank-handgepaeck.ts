import type { Short } from '../../src/typen';

/**
 * Montag · Du bist dumm · die Powerbank im Handgepaeck.
 *
 * Die Schaetzfrage hat hier eine Besonderheit, die sie besser macht als die
 * uebliche: Der Zuschauer liegt nicht nur daneben, er antwortet in der
 * **falschen Einheit**. Auf jeder Powerbank stehen Milliamperestunden, die
 * Vorschrift rechnet in Wattstunden — man kann die Frage also gar nicht
 * richtig beantworten, wenn man nur auf sein Geraet schaut.
 *
 * Damit faengt die Aufloesung den Spott sofort wieder ein: Es ist nicht
 * Dummheit, sondern eine Zahl, die auf dem Geraet nicht steht.
 */
export const powerbankHandgepaeck: Short = {
  id: 'powerbank-handgepaeck',
  themaId: 'powerbank-handgepaeck',
  format: 'gibtswirklich',
  sachgebiet: 'laden',
  arbeitstitel: 'Die Powerbank und die falsche Einheit',
  weitererzaehlt: 'Hundert Wattstunden. Und ins aufgegebene Gepäck darf sie nie.',

  szenen: [
    {
      art: 'frage',
      position: 'aufschlag',
      sprechtext: 'Schätz mal.',
      frage: 'Wie stark darf deine Powerbank im Flugzeug sein?',
      pauseSek: 2.5,
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'koffer' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Du hast in Milliamperestunden geantwortet. Danach fragt keiner.',
      text: 'Danach fragt keiner.',
      buehne: { art: 'figur', von: 'stutzen', nach: 'achselzucken', stand: 'rechts' },
      quelleId: 'lba-lithiumbatterien',
      belegId: 'bei-lithium-ionen-batterien',
      herausgeber: 'Luftfahrt-Bundesamt',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Das Luftfahrt-Bundesamt rechnet in Wattstunden.',
      text: 'Gerechnet wird in Wattstunden.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'zeigen', requisite: 'waage' },
      hervorhebung: 'Wattstunden',
      quelleId: 'lba-lithiumbatterien',
      belegId: 'bei-lithium-ionen-batterien',
    },
    {
      art: 'zahl',
      position: 'kipppunkt',
      sprechtext: 'Hundert Wattstunden. Und ins aufgegebene Gepäck darf sie nie.',
      wert: '100',
      einheit: 'Wh',
      bedeutung: 'ohne Rückfrage bei der Airline',
      buehne: { art: 'figur', von: 'zeigen', nach: 'hochschauen', requisite: 'flugzeug', stand: 'klein' },
      quelleId: 'lba-lithiumbatterien',
      belegId: 'lose-lithiumersatzbatterien-power-ba',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Dieselbe Grenze gilt in den Vereinigten Staaten. Sie ist keine deutsche Erfindung.',
      text: 'Dieselbe Grenze gilt in den USA.',
      buehne: {
        art: 'gegenueber',
        oben: { etikett: 'EUROPA', symbol: 'europa' },
        unten: { etikett: 'USA', symbol: 'schild' },
      },
      quelleId: 'faa-lithium-grenzwerte',
      belegId: 'batteries-are-limited-to',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Die Zahl steht nicht drauf. Wie bei allen.',
      satz: 'Die Zahl steht nicht drauf.',
      rundlauf:
        '„Die Zahl steht nicht drauf." trifft auf „Schätz mal." — beim zweiten Mal weiß man, dass die Frage unbeantwortbar war.',
    },
  ],

  quellenIds: ['lba-lithiumbatterien', 'faa-lithium-grenzwerte'],

  texte: {
    tiktok: {
      titel: 'Die Grenze steht nicht auf der Powerbank',
      beschreibung: '',
      hashtags: ['#powerbank', '#fliegen', '#technik', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Die Grenze steht nicht auf der Powerbank',
      beschreibung: '',
      hashtags: ['#powerbank', '#fliegen', '#technik', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Die Grenze steht nicht auf der Powerbank',
      beschreibung: '',
      hashtags: ['#powerbank', '#fliegen', '#technik', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
