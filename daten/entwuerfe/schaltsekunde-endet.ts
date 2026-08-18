import type { Short } from '../../src/typen';

/**
 * Samstag · Das gibt es wirklich · die Minute mit einundsechzig Sekunden.
 *
 * Der Sendeplatz braucht die Tatsache selbst, ohne Pointe, und die liegt hier
 * gleich doppelt: dass es Minuten mit einundsechzig Sekunden gibt — und dass
 * beschlossen ist, damit aufzuhoeren, weil diese eine Sekunde Rechenzentren
 * durcheinanderbringt.
 *
 * Die Quelle ist die Generalkonferenz fuer Mass und Gewicht, also ein
 * Normungsgremium und damit unbeteiligt. Zitiert wird englisch, weil dort
 * englisch steht; gesprochen wird deutsch.
 */
export const schaltsekundeEndet: Short = {
  id: 'schaltsekunde-endet',
  themaId: 'schaltsekunde',
  format: 'gibtswirklich',
  sachgebiet: 'netz',
  arbeitstitel: 'Die Minute mit 61 Sekunden wird abgeschafft',
  weitererzaehlt: 'Damit ist Schluss. Spätestens zweitausendfünfunddreißig.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Manche Minuten haben einundsechzig Sekunden.',
      text: 'Manche Minuten haben 61 Sekunden.',
      symbol: 'uhr',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Die Erde dreht ungleichmäßig. Also schiebt man eine Sekunde ein.',
      text: 'Eine Sekunde wird eingeschoben.',
      symbol: 'mond',
      quelleId: 'bipm-schaltsekunde',
      belegId: 'a-leap-second-is-applied',
      herausgeber: 'Internationales Büro für Maß und Gewicht',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Für Rechenzentren ist das eine Zeit, die es nicht gibt.',
      text: 'Eine Zeit, die es nicht gibt.',
      symbol: 'warndreieck',
      hervorhebung: 'nicht gibt',
      quelleId: 'bipm-schaltsekunde',
      belegId: 'serious-malfunctions-critical',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Damit ist Schluss. Spätestens zweitausendfünfunddreißig.',
      text: 'Spätestens 2035 nicht mehr.',
      symbol: 'kalender',
      quelleId: 'bipm-schaltsekunde',
      belegId: 'increased-in-or-before-2035',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Beschlossen von einer Konferenz, die du nicht kennst.',
      text: 'Beschlossen ist es längst.',
      symbol: 'menschen',
      quelleId: 'bipm-schaltsekunde',
      belegId: 'maximum-value-will-be-increased',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Danach passt die Uhr nicht mehr zur Erde.',
      satz: 'Danach passt die Uhr nicht mehr zur Erde.',
      rundlauf:
        '„Danach passt die Uhr nicht mehr zur Erde." trifft auf den Aufschlag — die Kuriosität wird zur Erklärung, wofür die Sekunde da war.',
    },
  ],

  quellenIds: ['bipm-schaltsekunde'],

  texte: {
    tiktok: {
      titel: 'Die Minute mit 61 Sekunden endet',
      beschreibung: '',
      hashtags: ['#zeit', '#wissen', '#technik', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Die Minute mit 61 Sekunden endet',
      beschreibung: '',
      hashtags: ['#zeit', '#wissen', '#technik', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Die Minute mit 61 Sekunden endet',
      beschreibung: '',
      hashtags: ['#zeit', '#wissen', '#technik', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
