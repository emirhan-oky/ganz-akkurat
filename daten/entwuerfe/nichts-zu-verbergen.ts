import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · „Ich habe doch nichts zu verbergen."
 *
 * **Der zweite bewusst kurze Dialog** (siehe `inkognito-modus` für den Grund).
 *
 * **Beide Lager streiten über die falschen Dateien.** Watti sagt, auf seinem
 * Rechner liege nichts Wichtiges; Volti hält ihn deshalb für naiv. Das BSI
 * schreibt beiden ins Stammbuch, dass es **nicht unbedingt** um die
 * gespeicherten Urlaubsfotos geht — sondern um die Zugangs-, Konto- und
 * Kreditkartendaten, die durch den Rechner laufen.
 *
 * **Das ist die Bauart, die der Beef-Umbau vom 06.09.2026 meint:** Der Fakt
 * ist belegt, der Streit geht trotzdem weiter, und das Dritte steht erst am
 * Kipppunkt — nicht schon in der Themenzeile.
 */
export const nichtsZuVerbergen: Short = {
  id: 'nichts-zu-verbergen',
  themaId: 'nichts-zu-verbergen',
  format: 'werhatrecht',
  sachgebiet: 'rechner',
  bauform: 'wechselrede',
  arbeitstitel: 'Watti hat nichts zu verbergen',
  weitererzaehlt: 'nicht unbedingt die Urlaubsfotos',
  suchbegriff: 'nichts zu verbergen',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Ich habe nichts zu verbergen. Bei mir ist nichts zu holen.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'lupe' },
  },
  vorspann: 'Wattis Rechner und die falschen Dateien',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, bei mir ist nichts zu holen. Und was liegt da so? Urlaubsfotos. Da ist nichts zu verbergen.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'behaupten',
          machart: 'rechtfertigung',
          text: 'Volti, bei mir ist nichts zu holen.',
        },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und was liegt da so?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Urlaubsfotos. Da ist nichts zu verbergen.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-irrtuemer-computer',
      belegId: 'ansicht-grundlegend-falsch',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Diese Ansicht ist grundlegend falsch, weil Kriminelle alle verfügbaren Daten nutzen können. Meine Gardasee-Fotos sind verfügbare Daten?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'widersprechen',
          text: 'Diese Ansicht ist grundlegend falsch, weil Kriminelle alle verfügbaren Daten nutzen können.',
          quelleId: 'bsi-irrtuemer-computer',
          belegId: 'ansicht-grundlegend-falsch',
        },
        {
          sprecher: 'zeiger',
          zug: 'widersprechen',
          machart: 'katastrophe',
          text: 'Meine Gardasee-Fotos sind verfügbare Daten?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'erklaeren',
        gegenueber: { von: 'erklaeren', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-irrtuemer-computer',
      belegId: 'nicht-unbedingt-urlaubsfotos',
      sprechtext:
        'Es sind nicht unbedingt die Urlaubsfotos. Sondern? Zugangs-, Konto- und Kreditkartendaten.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Es sind nicht unbedingt die Urlaubsfotos.',
          quelleId: 'bsi-irrtuemer-computer',
          belegId: 'nicht-unbedingt-urlaubsfotos',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Sondern?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Zugangs-, Konto- und Kreditkartendaten.',
          quelleId: 'bsi-irrtuemer-computer',
          belegId: 'zugangs-konto-kreditkartendaten',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-irrtuemer-computer',
      belegId: 'zugangs-konto-kreditkartendaten',
      sprechtext: 'Die liegen aber nicht bei mir. Gespeichert oder übertragen, du Pfosten.',
      rede: [
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'umdeutung', text: 'Die liegen aber nicht bei mir.' },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          machart: 'nebenbemerkung',
          text: 'Gespeichert oder übertragen, du Pfosten.',
          quelleId: 'bsi-irrtuemer-computer',
          belegId: 'zugangs-konto-kreditkartendaten',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Nicht unbedingt die Urlaubsfotos.',
      sprechtext: 'Und was schütze ich jetzt? Alles, was du für unwichtig hältst. Also alles, was ich für wertlos halte?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was schütze ich jetzt?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Alles, was du für unwichtig hältst.' },
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'falscherschluss', text: 'Also alles, was ich für wertlos halte?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'ansprechen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „bei mir ist nichts zu holen" keine Entwarnung mehr, sondern die Aufzählung dessen, was Watti für wertlos hält.',
    },
  ],

  quellenIds: ['bsi-irrtuemer-computer'],

  texte: {
    tiktok: {
      titel: 'Watti hat nichts zu verbergen',
      beschreibung: 'Nichts zu verbergen: Worum es bei einem ungeschützten Rechner wirklich geht.',
      hashtags: ['#datenschutz', '#technikwissen', '#sicherheit', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti hat nichts zu verbergen',
      beschreibung: 'Nichts zu verbergen: Das BSI nennt diese Ansicht grundlegend falsch — und sagt auch, warum.',
      hashtags: ['#datenschutz', '#technikwissen', '#computer', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Es geht nicht unbedingt um deine Urlaubsfotos',
      beschreibung: 'Nichts zu verbergen: Was das BSI zu diesem Irrtum schreibt.',
      hashtags: ['#datenschutz', '#sicherheit', '#technikwissen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
