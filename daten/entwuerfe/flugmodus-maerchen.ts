import type { Short } from '../../src/typen';

/**
 * Dienstag · Es war einmal · der Flugmodus.
 *
 * Das Maerchen sitzt ganz im Aufschlag, wie es die Bauregel verlangt: Er ist
 * die einzige Position ohne Belegpflicht, weil er die Erzaehlung setzt und
 * nichts behauptet. Alles danach laeuft in der Gegenwart.
 *
 * Der Dreh ist besser als das uebliche „stimmt gar nicht": Der Grund fuer die
 * Abschaltung war **nie das Flugzeug**. Er stand am Boden. Ein Geraet in
 * zehn Kilometern Hoehe sieht Dutzende Funkzellen gleichzeitig und meldet
 * sich bei allen an — das Problem hatte das Mobilfunknetz, nicht die
 * Bordelektronik. Genau deshalb steht in dem Beschluss eine Einheit, deren
 * einziger Zweck es ist, die Anmeldung **am Boden** zu verhindern.
 */
export const flugmodusMaerchen: Short = {
  id: 'flugmodus-maerchen',
  themaId: 'flugmodus-herkunft',
  format: 'eswareinmal',
  sachgebiet: 'fahren',
  arbeitstitel: 'Der Flugmodus war nie wegen des Flugzeugs da',
  weitererzaehlt: 'Nicht das Flugzeug war das Problem. Das Netz am Boden war es.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Handy aus, sonst stürzt das Flugzeug ab.',
      text: 'Handy aus. Sonst stürzt es ab.',
      symbol: 'flugzeug',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'In den Vorschriften steht ein Gerät mit einer einzigen Aufgabe.',
      text: 'Ein Gerät mit einer einzigen Aufgabe.',
      symbol: 'gesetzbuch',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'terrestrischen-umts-mobilfunknetzen',
      herausgeber: 'Europäische Union',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Und selbst diese Pflicht galt nur bis zum ersten Januar.',
      text: 'Und die galt nur bis Januar.',
      symbol: 'kalender',
      hervorhebung: 'nur bis',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'bis-zum-1-januar-2026',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Nicht das Flugzeug war das Problem. Das Netz am Boden war es.',
      text: 'Nicht das Flugzeug. Das Netz.',
      symbol: 'nachbarhaeuser',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'terrestrischen-umts-mobilfunknetzen',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Seit zweitausendzweiundzwanzig ist Fünf-G an Bord vorgesehen.',
      text: 'Seit 2022 ist 5G an Bord vorgesehen.',
      symbol: 'europa',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'hinzufuegen-der-5g-netzanbindung',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Der Schalter heißt immer noch so.',
      satz: 'Der Schalter heißt immer noch so.',
      rundlauf:
        '„Der Schalter heißt immer noch so." trifft auf „Handy aus, sonst stürzt das Flugzeug ab." — die Drohung klingt beim zweiten Mal wie ein Überbleibsel.',
    },
  ],

  quellenIds: ['eu-mca-5g-an-bord'],

  texte: {
    tiktok: {
      titel: 'Das Problem stand am Boden, nicht im Flugzeug',
      beschreibung: '',
      hashtags: ['#flugmodus', '#fliegen', '#technik', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Das Problem stand am Boden, nicht im Flugzeug',
      beschreibung: '',
      hashtags: ['#flugmodus', '#fliegen', '#technik', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Das Problem stand am Boden, nicht im Flugzeug',
      beschreibung: '',
      hashtags: ['#flugmodus', '#fliegen', '#technik', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
