import type { Short } from '../../src/typen';

/**
 * Montag · Du bist dumm · dreizehn Jahre für einen Stecker.
 *
 * Der Prototyp des Sendeplatzes: eine Groesse, die niemand richtig schaetzt,
 * als Frage gestellt und danach hingestellt. Fast alle tippen auf drei bis
 * fuenf Jahre, weil eine EU-Richtlinie sich anfuehlt wie ein Verwaltungsakt
 * und nicht wie ein Jahrzehnt.
 *
 * Die Denkpause nach dem Aufschlag ist Pflicht, nicht Geschmack. Ohne sie ist
 * „Schätz mal" rhetorisch, und wer nicht geschaetzt hat, liegt hinterher auch
 * nicht daneben — dann traegt der Sendeplatz seinen Namen zu Unrecht.
 *
 * In Szene 5 stand „In der Zeit wurde ein Kind eingeschult und kam aufs
 * Gymnasium." Ein guter Satz, aber keiner, den die Richtlinie hergibt: Er ist
 * ein Bild fuer die Dauer und behauptet nebenbei etwas ueber Schulzeiten. Beim
 * Eintragen der Fundstelle blieb das Feld leer, und das ist genau der Zweck
 * des Feldes. An seiner Stelle steht jetzt das Ende der Geschichte, das
 * woertlich belegt ist — und die Rechnung „dreizehn Jahre" haengt am Zitat
 * „Seit 2009 werden auf Unionsebene Anstrengungen unternommen".
 */
export const einStecker: Short = {
  id: 'ein-stecker',
  themaId: 'ladeanschluss-eu',
  format: 'dubistdumm',
  sachgebiet: 'handy',
  arbeitstitel: 'Dreizehn Jahre für einen Stecker',
  weitererzaehlt: 'Dreizehn Jahre. Für die Frage, welches Loch vorne im Telefon ist.',

  szenen: [
    {
      art: 'frage',
      position: 'aufschlag',
      sprechtext: 'Schätz mal.',
      frage: 'Wie viele Jahre für einen Stecker?',
      symbol: 'stecker',
      pauseSek: 2.5,
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Seit zweitausendneun sitzt die Europäische Union an dieser einen Sache.',
      text: 'Seit 2009 sitzt die EU an dieser Sache.',
      hervorhebung: '2009',
      symbol: 'europa',
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'seit-2009-werden-auf',
      herausgeber: 'Europäische Union',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      // „Dann kam nichts" stand hier und war eine Spur zu laut: Der
      // Erwaegungsgrund sagt, die freiwilligen Initiativen haetten „zwar" etwas
      // erreicht — nur eben nicht genug.
      sprechtext: 'Erst sollte die Industrie es freiwillig regeln. Es reichte nicht.',
      text: 'Freiwillig, hieß es. Es reichte nicht.',
      symbol: 'fabrik',
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'mit-den-ju-ngsten',
    },
    {
      art: 'zahl',
      position: 'kipppunkt',
      sprechtext: 'Dreizehn Jahre. Für die Frage, welches Loch vorne im Telefon ist.',
      wert: '13',
      einheit: 'Jahre',
      bedeutung: 'von der ersten Vereinbarung bis zur Pflicht',
      symbol: 'kalender',
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'seit-2009-werden-auf',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Jetzt steht im Gesetz, welcher Stecker es sein muss.',
      text: 'Jetzt steht es im Gesetz.',
      hervorhebung: 'Gesetz',
      symbol: 'gesetzbuch',
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'usb-typ-c-als',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Du hast auf drei getippt. Wie alle.',
      satz: 'Du hast auf drei getippt. Wie alle.',
      rundlauf:
        '„Wie alle." trifft auf „Schätz mal." — beim zweiten Mal weiß man, dass die Frage eine Falle war.',
    },
  ],

  quellenIds: ['eu-einheitlicher-ladeanschluss'],

  texte: {
    tiktok: {
      titel: 'Dreizehn Jahre für einen Stecker',
      beschreibung: '',
      hashtags: ['#technik', '#eu', '#ladekabel', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Dreizehn Jahre für einen Stecker',
      beschreibung: '',
      hashtags: ['#technik', '#eu', '#ladekabel', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Dreizehn Jahre für einen Stecker',
      beschreibung: '',
      hashtags: ['#technik', '#eu', '#ladekabel', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
