import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · siebzehn Kabel und der einheitliche Anschluss.
 *
 * **Szenario 4, zweite Bauart: Watti kontert mit einem Gegenbeispiel.** Volti
 * hat in der Sache recht — seit 2009 arbeitet die EU daran, und USB Typ C ist
 * die Antwort. Watti kontert mit Voltis eigener Fahrradlampe, und der Konter
 * haelt.
 *
 * **Voltis Nachgeben ist zweimal widerwillig** und wird beim zweiten Mal
 * kuerzer: „Ja gut, einmal im Jahr halt." — „Ja gut, die liegt eh im Schrank."
 * Emirhans Zeile, und der Rhythmus ist die Pointe.
 *
 * **Und Watti hat das letzte Wort.** Befund 25: eine Haeufigkeit ist keine
 * Vorschrift — in vier von neun Dialogen endet er, in fuenf Volti.
 */
export const kabelschublade: Short = {
  id: 'kabelschublade',
  themaId: 'ladeanschluss-eu',
  format: 'gibtswirklich',
  sachgebiet: 'laden',
  bauform: 'stationen',
  arbeitstitel: 'Wattis Kabelschublade schlägt zurück',
  weitererzaehlt: 'USB Typ C als einheitlichen Ladeanschluss',
  suchbegriff: 'Kabel USB C',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Volti will meine Kabelschublade wegwerfen. Über meine Leiche.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'kabel' },
  },
  vorspann: 'Wattis Schublade und die EU',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, warum liegen hier siebzehn alte Kabel rum? Weil ich sie noch brauche, irgendwann passt jedes davon irgendwo.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, warum liegen hier siebzehn alte Kabel rum?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'rechtfertigung',
          text: 'Weil ich sie noch brauche, irgendwann passt jedes davon irgendwo.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'zeigen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'seit-2009-werden-auf',
      herausgeber: 'Europäische Union',
      sprechtext:
        'Seit 2009 arbeitet die EU gegen das Durcheinander bei Ladeanschlüssen. Und deswegen soll ich meine ganze Schublade wegwerfen?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Seit 2009 arbeitet die EU gegen das Durcheinander bei Ladeanschlüssen.',
          quelleId: 'eu-einheitlicher-ladeanschluss',
          belegId: 'seit-2009-werden-auf',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'katastrophe',
          text: 'Und deswegen soll ich meine ganze Schublade wegwerfen?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'erklaeren',
        gegenueber: { von: 'zeigen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'usb-typ-c-als',
      sprechtext: 'Die EU will USB Typ C als einheitlichen Ladeanschluss, du Idiot. Aha. Und womit lädst du deine Fahrradlampe?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die EU will USB Typ C als einheitlichen Ladeanschluss, du Idiot.',
          quelleId: 'eu-einheitlicher-ladeanschluss',
          belegId: 'usb-typ-c-als',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Aha. Und womit lädst du deine Fahrradlampe?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'usb-typ-c-als',
      sprechtext:
        'Jetzt komm mir nicht mit der Lampe. Sie hat einen runden Stecker, und du hast letzte Woche danach gefragt.',
      rede: [
        { sprecher: 'nachleser', zug: 'abbiegen', text: 'Jetzt komm mir nicht mit der Lampe.' },
        {
          sprecher: 'zeiger',
          zug: 'erinnern',
          text: 'Sie hat einen runden Stecker, und du hast letzte Woche danach gefragt.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'nachdenken', nach: 'ansprechen' },
      },
    },
    {
      /*
       * **Der Kipppunkt braucht hier keine Quelle**, und das ist die Regel vom
       * 02.09.2026: Er besteht aus zwei Erinnerungen und zwei Mal Nachgeben —
       * keine einzige Zeile behauptet etwas ueber die Welt. Fuer Voltis
       * Fahrradlampe gibt es keinen Beleg, und es soll keinen geben.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Ja gut, einmal im Jahr halt. Und deine alte Kamera. Ja gut, die liegt eh im Schrank.',
      rede: [
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Ja gut, einmal im Jahr halt.' },
        { sprecher: 'zeiger', zug: 'erinnern', text: 'Und deine alte Kamera.' },
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Ja gut, die liegt eh im Schrank.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'achselzucken',
        gegenueber: { von: 'ansprechen', nach: 'zeigen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Genau deshalb bleibt die Schublade.',
      sprechtext: 'Und der Anhänger von der Kamera liegt auch noch drin. Genau deshalb bleibt die Schublade.',
      rede: [
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Und der Anhänger von der Kamera liegt auch noch drin.' },
        { sprecher: 'zeiger', zug: 'zuspitzen', text: 'Genau deshalb bleibt die Schublade.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'nachdenken',
        nach: 'ruhe',
        gegenueber: { von: 'zeigen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, dass Watti gewinnt – und Voltis erster Satz klingt wie jemand, der es schon einmal versucht hat.',
    },
  ],

  quellenIds: ['eu-einheitlicher-ladeanschluss'],

  texte: {
    tiktok: {
      titel: 'Wattis Kabelschublade schlägt zurück',
      beschreibung: 'Kabel Schublade und USB C: Warum die EU seit 2009 daran arbeitet.',
      hashtags: ['#usbc', '#kabel', '#eu', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Kabelschublade schlägt zurück',
      beschreibung: 'Ein Kabel für alles, sagt die EU. Die Schublade sagt etwas anderes. USB C.',
      hashtags: ['#usbc', '#kabel', '#ladekabel', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Warum Wattis Kabelschublade doch bleiben darf',
      beschreibung: 'Kabel und USB C: Was die EU-Richtlinie zum einheitlichen Ladeanschluss regelt.',
      hashtags: ['#usbc', '#eu', '#ladekabel', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
