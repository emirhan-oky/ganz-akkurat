import type { Short } from '../../src/typen';

/**
 * Samstag · Das gibt es wirklich · Löschen löscht nichts.
 *
 * Der staerkste Sendeplatz am staerksten Feed-Tag, und die Machart ist die
 * einfachste von allen: Die Sache selbst ist die Pointe. Es braucht keine
 * Wendung, die jemand baut — es reicht, sie hinzustellen.
 *
 * Das Thema trifft jeden, der je etwas geloescht hat, weil es peinlich war.
 * Genau darin liegt die Reichweite: Es setzt kein Interesse an Technik voraus,
 * nur ein schlechtes Gewissen.
 */
export const loeschenLoeschtNicht: Short = {
  id: 'loeschen-loescht-nicht',
  themaId: 'dateien-loeschen',
  format: 'gibtswirklich',
  sachgebiet: 'rechner',
  arbeitstitel: 'Löschen löscht nichts',
  weitererzaehlt: 'Wenn du eine Datei löschst, wird die Datei nicht gelöscht — nur ihr Eintrag.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Du hast das gelöscht. Es ist noch da.',
      text: 'Du hast das gelöscht.',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Beim Bundesamt für Sicherheit in der Informationstechnik steht, was wirklich passiert.',
      text: 'Was dabei wirklich passiert:',
      quelleId: 'bsi-loeschen-verweise',
      belegId: 'lediglich-die-verweise-auf',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Gelöscht wird lediglich der Verweis im Inhaltsverzeichnis.',
      text: 'Gelöscht wird der Verweis.',
      hervorhebung: 'Verweis',
      quelleId: 'bsi-loeschen-verweise',
      belegId: 'lediglich-die-verweise-auf',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Die Datei liegt weiter da. Der Platz wird nur freigegeben.',
      text: 'Die Datei liegt weiter da.',
      quelleId: 'bsi-loeschen-verweise',
      belegId: 'der-bereich-wird-zum',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Dein Rechner hat die Seite aus dem Register gerissen. Das Regal steht noch.',
      text: 'Die Seite aus dem Register gerissen.',
      quelleId: 'bsi-loeschen-verweise',
      belegId: 'der-bereich-wird-zum',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Weg ist es, wenn Zufall darüberliegt.',
      satz: 'Weg ist es, wenn Zufall drüberliegt.',
    },
  ],

  quellenIds: ['bsi-loeschen-verweise'],

  texte: {
    tiktok: {
      titel: 'Der Verweis ist weg, die Datei nicht',
      beschreibung: '',
      hashtags: ['#technik', '#datenschutz', '#computer', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Der Verweis ist weg, die Datei nicht',
      beschreibung: '',
      hashtags: ['#technik', '#datenschutz', '#computer', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Der Verweis ist weg, die Datei nicht',
      beschreibung: '',
      hashtags: ['#technik', '#datenschutz', '#computer', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
