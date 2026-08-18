import type { Short } from '../../src/typen';

/**
 * Freitag · Das macht dein Geraet heimlich · die gelben Punkte.
 *
 * Die Hausregel des Sendeplatzes ist erfuellt, und zwar in ihrer schaerfsten
 * Form: Beide Haelften stehen woertlich beim BSI — dass die Kennung den
 * Ausdruck einem Geraet zuordnet, und dass sie **nicht dokumentiert und nicht
 * abschaltbar** ist. Der zweite Halbsatz ist der Kipppunkt und muesste sonst
 * behauptet werden.
 *
 * Die Quelle ist ein PDF mit komprimierten Textstroemen. Sie steht deshalb
 * auf `abrufart: manuell` — am 17.08.2026 von Hand entpackt und gelesen, eine
 * Zeichenkettensuche findet dort nichts.
 */
export const druckerKennung: Short = {
  id: 'drucker-kennung',
  themaId: 'drucker-gelbe-punkte',
  format: 'heimlich',
  sachgebiet: 'drucken',
  arbeitstitel: 'Jeder Ausdruck trägt die Nummer des Druckers',
  weitererzaehlt: 'Nicht dokumentiert. Und abschalten kannst du es nicht.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Drucker unterschreibt jede Seite.',
      text: 'Dein Drucker unterschreibt.',
      symbol: 'drucker',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Beim Bundesamt für Sicherheit in der Informationstechnik heißt das Wasserzeichen.',
      text: 'Beim BSI heißt das Wasserzeichen.',
      symbol: 'lupe',
      quelleId: 'bsi-yellow-dots',
      belegId: 'wasserzeichen-mit-denen-ein',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Ein Ausdruck kann einem konkreten Drucker zugeordnet werden. Deinem.',
      text: 'Zugeordnet. Deinem Gerät.',
      symbol: 'karteikarte',
      hervorhebung: 'zugeordnet',
      quelleId: 'bsi-yellow-dots',
      belegId: 'wasserzeichen-mit-denen-ein',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Nicht dokumentiert. Und abschalten kannst du es nicht.',
      text: 'Nicht dokumentiert. Nicht abschaltbar.',
      symbol: 'kreuz',
      quelleId: 'bsi-yellow-dots',
      belegId: 'diese-funktion-ist-oft',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Oft nicht einmal vom Hersteller dokumentiert.',
      text: 'Nicht einmal vom Hersteller.',
      symbol: 'fabrik',
      quelleId: 'bsi-yellow-dots',
      belegId: 'diese-funktion-ist-oft',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Gelb auf weiß. Sieht ja keiner.',
      satz: 'Gelb auf weiß. Sieht ja keiner.',
      rundlauf:
        '„Gelb auf weiß. Sieht ja keiner." trifft auf „Dein Drucker unterschreibt jede Seite." — man weiß jetzt, womit, und sucht es.',
    },
  ],

  quellenIds: ['bsi-yellow-dots'],

  texte: {
    tiktok: {
      titel: 'Ein Wasserzeichen, das niemand dokumentiert',
      beschreibung: '',
      hashtags: ['#drucker', '#datenschutz', '#technik', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Ein Wasserzeichen, das niemand dokumentiert',
      beschreibung: '',
      hashtags: ['#drucker', '#datenschutz', '#technik', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Ein Wasserzeichen, das niemand dokumentiert',
      beschreibung: '',
      hashtags: ['#drucker', '#datenschutz', '#technik', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
