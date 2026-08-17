import type { Short } from '../../src/typen';

/**
 * Freitag · Das macht dein Gerät heimlich · der Fernseher nimmt auf.
 *
 * Der Sendeplatz hat eine harte Hausregel: **Es muss in einem Dokument
 * stehen.** „Dein Fernseher hört mit" waere die billigste Behauptung der Welt
 * und ist genau deshalb verboten — hier steht sie beim BSI, woertlich, und
 * zwar in beiden Haelften: dass aufgezeichnet wird und dass das Aufgezeichnete
 * das Haus verlaesst.
 *
 * Der Short beschuldigt trotzdem nichts Kriminelles. Er sagt, was das Geraet
 * tut, und ueberlaesst die Empoerung dem Zuschauer. Das ist der Unterschied
 * zwischen Unbehagen und Verschwoerung.
 */
export const fernseherHoert: Short = {
  id: 'fernseher-hoert',
  themaId: 'smarttv-sprache',
  format: 'heimlich',
  sachgebiet: 'bildschirm',
  arbeitstitel: 'Der Fernseher nimmt auf und schickt es weg',
  weitererzaehlt: 'Dein Fernseher zeichnet Sprachbefehle auf und schickt sie an einen fremden Server.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Fernseher hat ein Mikrofon.',
      text: 'Dein Fernseher hat ein Mikrofon.',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Beim Bundesamt für Sicherheit in der Informationstechnik steht: ab Werk eingebaut.',
      text: 'Ab Werk eingebaut.',
      quelleId: 'bsi-smarttv-sprachbefehle',
      belegId: 'ist-bereits-eine-webcam',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Dieselbe Behörde schreibt: Diese können Sprachbefehle aufzeichnen.',
      text: 'Sie können Sprachbefehle aufzeichnen.',
      hervorhebung: 'aufzeichnen',
      quelleId: 'bsi-smarttv-sprachbefehle',
      belegId: 'diese-ko-nnen-sprachbefehle',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Und dann der Halbsatz: weitergeleitet an einen Cloud-Server.',
      text: 'Weitergeleitet an einen Cloud-Server.',
      hervorhebung: 'Cloud-Server',
      quelleId: 'bsi-smarttv-sprachbefehle',
      belegId: 'an-einen-cloud-server',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Es bleibt nicht im Wohnzimmer. Nicht einmal im Gerät.',
      text: 'Nicht im Wohnzimmer. Nicht im Gerät.',
      quelleId: 'bsi-smarttv-sprachbefehle',
      belegId: 'an-einen-cloud-server',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Gefragt hat dich niemand.',
      satz: 'Gefragt hat dich niemand.',
    },
  ],

  quellenIds: ['bsi-smarttv-sprachbefehle'],

  texte: {
    tiktok: {
      titel: 'Vom Wohnzimmer auf den Cloud-Server',
      beschreibung: '',
      hashtags: ['#smarttv', '#datenschutz', '#technik', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Vom Wohnzimmer auf den Cloud-Server',
      beschreibung: '',
      hashtags: ['#smarttv', '#datenschutz', '#technik', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Vom Wohnzimmer auf den Cloud-Server',
      beschreibung: '',
      hashtags: ['#smarttv', '#datenschutz', '#technik', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
