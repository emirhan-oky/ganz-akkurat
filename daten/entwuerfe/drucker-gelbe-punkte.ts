import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · die gelben Punkte im Ausdruck.
 *
 * **Szenario 11: Watti erzaehlt es falsch weiter.** Er hat es von Volti
 * gehoert, gibt es im Treppenhaus weiter — und aus „einem konkreten Drucker
 * zugeordnet" wird bei ihm „der Drucker schreibt deinen Namen drauf".
 *
 * **Die Verdrehung ist schon dokumentiert**, und das ist der Grund, warum
 * gerade dieser Gegenstand die Form traegt: Der Beleg ist enger als die
 * Erzaehlung, und genau in dieser Luecke sitzt Wattis Fassung.
 *
 * **Der Kipppunkt bleibt trotzdem stark**, weil die Sache auch ohne
 * Uebertreibung reicht: nicht dokumentiert und nicht abschaltbar, beides
 * woertlich.
 *
 * **Das Thema lief am 18.08.2026.** Es wird bewusst neu erzaehlt und traegt
 * die alte `themaId`.
 */
export const druckerGelbePunkte: Short = {
  id: 'drucker-punkte-weitererzaehlt',
  themaId: 'drucker-gelbe-punkte',
  format: 'absicht',
  sachgebiet: 'drucken',
  bauform: 'wechselrede',
  arbeitstitel: 'Watti erzählt es im Treppenhaus weiter',
  weitererzaehlt: 'einem konkreten Drucker zugeordnet werden kann',
  suchbegriff: 'Drucker Punkte',
  kaltstart: {
    art: 'stolzerfehler',
    satz: 'Ich habe der Nachbarin gerade das mit den Druckern erklärt.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'erklaeren', requisite: 'drucker' },
  },
  vorspann: 'Wattis Erklärung im Treppenhaus',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, ich habe der Nachbarin das mit den gelben Punkten erklärt. Was hast du ihr erzählt?',
      rede: [
        { sprecher: 'zeiger', zug: 'behaupten', text: 'Volti, ich habe der Nachbarin das mit den gelben Punkten erklärt.' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Was hast du ihr erzählt?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ruhe',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-yellow-dots',
      belegId: 'wasserzeichen-mit-denen-ein',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Dass ihr Drucker ihren Namen auf jedes Blatt schreibt. Das habe ich nie gesagt, du Idiot. Und was hast du gesagt? Es sind Wasserzeichen, mit denen ein Ausdruck einem konkreten Drucker zugeordnet werden kann. Also doch ihr Name.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'katastrophe',
          text: 'Dass ihr Drucker ihren Namen auf jedes Blatt schreibt.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Das habe ich nie gesagt, du Idiot.',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was hast du gesagt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Es sind Wasserzeichen, mit denen ein Ausdruck einem konkreten Drucker zugeordnet werden kann.',
          quelleId: 'bsi-yellow-dots',
          belegId: 'wasserzeichen-mit-denen-ein',
        },
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'falscherschluss', text: 'Also doch ihr Name.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'erklaeren',
        nach: 'stutzen',
        gegenueber: { von: 'nachdenken', nach: 'zeigen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-yellow-dots',
      belegId: 'wasserzeichen-mit-denen-ein',
      sprechtext:
        'Das Gerät, nicht die Person. Und wer weiß, wem das Gerät gehört? Da fängt es an. Aber der Drucker selbst weiß es nicht.',
      rede: [
        { sprecher: 'nachleser', zug: 'einschraenken', text: 'Das Gerät, nicht die Person.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wer weiß, wem das Gerät gehört?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Da fängt es an. Aber der Drucker selbst weiß es nicht.',
          quelleId: 'bsi-yellow-dots',
          belegId: 'wasserzeichen-mit-denen-ein',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'zeigen', nach: 'erklaeren' },
      },
    },
    {
      /*
       * **Der Kipppunkt von `absicht` ist, wer es entschieden hat.** Hier ist
       * es die Stelle, an der die Sache ohne jede Uebertreibung reicht: nicht
       * dokumentiert und nicht abschaltbar, beides woertlich beim BSI.
       */
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-yellow-dots',
      belegId: 'diese-funktion-ist-oft',
      sprechtext:
        'Dann stelle ich das bei ihr eben ab. Die Funktion ist oft nicht dokumentiert und kann nicht abgeschaltet werden. Gar nicht?',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'uebercompliance',
          text: 'Dann stelle ich das bei ihr eben ab.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Die Funktion ist oft nicht dokumentiert und kann nicht abgeschaltet werden.',
          quelleId: 'bsi-yellow-dots',
          belegId: 'diese-funktion-ist-oft',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Gar nicht?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Der Ausdruck führt auf das Gerät, nicht auf den Namen.',
      sprechtext:
        'Gar nicht. Dann gehe ich nochmal runter und sage es ihr richtig. Sag ihr diesmal nur das, was ich gesagt habe.',
      rede: [
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Gar nicht.' },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          text: 'Dann gehe ich nochmal runter und sage es ihr richtig.',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'widerhaken',
          text: 'Sag ihr diesmal nur das, was ich gesagt habe.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'ansprechen',
        gegenueber: { von: 'lesen', nach: 'achselzucken' },
      },
      rundlauf:
        'Beim zweiten Sehen ist der erste Satz schon das Problem: Watti hat es weitergegeben, bevor er es verstanden hatte.',
    },
  ],

  quellenIds: ['bsi-yellow-dots'],

  texte: {
    tiktok: {
      titel: 'Watti erzählt es im Treppenhaus weiter',
      beschreibung: 'Gelbe Punkte im Drucker: Was sie wirklich verraten.',
      hashtags: ['#drucker', '#datenschutz', '#bsi', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti erzählt es im Treppenhaus weiter',
      beschreibung: 'Gelbe Punkte vom Drucker führen auf das Gerät. Nicht auf den Namen.',
      hashtags: ['#drucker', '#datenschutz', '#privatsphaere', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was die gelben Punkte aus Wattis Drucker verraten',
      beschreibung: 'Gelbe Punkte im Drucker: Was das BSI zu Wasserzeichen in Ausdrucken schreibt.',
      hashtags: ['#drucker', '#bsi', '#datenschutz', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
