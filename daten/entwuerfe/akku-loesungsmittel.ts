import type { Short } from '../../src/typen';

/**
 * Mittwoch, 18 Uhr · Das ist Absicht · der eingeklebte Akku.
 *
 * Das Lustigste ist hier wieder die Tatsache, nuechtern hingestellt. Die EU
 * musste in einen Gesetzestext schreiben, dass ein Akku ohne **Waermeenergie
 * oder Loesungsmittel** herausnehmbar sein muss. Auf so einen Satz kommt
 * niemand aus Vorsicht — man schreibt ihn hin, weil es gemacht wird.
 *
 * Der Sendeplatz verlangt, dass eine Entscheidung sichtbar wird, und das ist
 * sie hier zweimal: die, den Akku einzukleben, und die, das zu verbieten.
 * Beschuldigt wird trotzdem niemand namentlich — was zaehlt, ist der
 * Massstab, den der Gesetzgeber anlegen musste.
 */
export const akkuLoesungsmittel: Short = {
  id: 'akku-loesungsmittel',
  themaId: 'akku-wechselbar-2027',
  format: 'absicht',
  sachgebiet: 'handy',
  arbeitstitel: 'Fön und Lösungsmittel mussten verboten werden',
  weitererzaehlt: 'Ohne Wärme. Ohne Lösungsmittel. Das musste jemand hinschreiben.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Akku ist eingeklebt. Das war eine Entscheidung.',
      text: 'Eingeklebt. Eine Entscheidung.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'batterie' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Die EU hat aufgeschrieben, was herausnehmbar heißt.',
      text: 'Was heißt herausnehmbar?',
      buehne: { art: 'figur', von: 'stutzen', nach: 'lesen', requisite: 'blatt' },
      quelleId: 'eu-batterie-entnehmbar',
      belegId: 'handelsueblichen-werkzeugen-entfernt',
      herausgeber: 'Europäische Union',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Mit handelsüblichen Werkzeugen zu entfernen.',
      text: 'Mit handelsüblichen Werkzeugen.',
      buehne: { art: 'figur', von: 'lesen', nach: 'zeigen', requisite: 'schraubenschluessel' },
      quelleId: 'eu-batterie-entnehmbar',
      belegId: 'handelsueblichen-werkzeugen-entfernt',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Ohne Wärme. Ohne Lösungsmittel. Das musste jemand hinschreiben.',
      text: 'Keine Wärme. Kein Lösungsmittel.',
      buehne: { art: 'figur', von: 'zeigen', nach: 'stutzen', requisite: 'thermometer' },
      hervorhebung: 'Lösungsmittel',
      quelleId: 'eu-batterie-entnehmbar',
      belegId: 'waermeenergie-oder-loesungsmittel',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Ab Februar zweitausendsiebenundzwanzig gilt das.',
      text: 'Ab Februar 2027.',
      buehne: { art: 'figur', von: 'stutzen', nach: 'zeigen', requisite: 'kalender' },
      quelleId: 'eu-batterie-entnehmbar',
      belegId: 'ab-dem-18-februar-2027',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Vorher galt der Fön.',
      satz: 'Vorher galt der Fön.',
      rundlauf:
        '„Vorher galt der Fön." trifft auf „Dein Akku ist eingeklebt." — das Wort Entscheidung bekommt beim zweiten Mal ein Bild.',
    },
  ],

  quellenIds: ['eu-batterie-entnehmbar'],

  texte: {
    tiktok: {
      titel: 'Warum Lösungsmittel verboten werden musste',
      beschreibung: '',
      hashtags: ['#akku', '#reparatur', '#technik', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Warum Lösungsmittel verboten werden musste',
      beschreibung: '',
      hashtags: ['#akku', '#reparatur', '#technik', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Warum Lösungsmittel verboten werden musste',
      beschreibung: '',
      hashtags: ['#akku', '#reparatur', '#technik', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
