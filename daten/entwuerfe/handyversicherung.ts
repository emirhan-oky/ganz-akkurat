import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · die Handyversicherung neben der Maengelhaftung.
 *
 * **Der Titel kommt aus Befund 8:** ein Satz mit einem Verb, das etwas tut —
 * „Watti schmeisst sechs Euro im Monat weg". Nicht „Wattis Kampf mit der
 * Versicherung"; ein Zustand mit Praeposition ist kein Video.
 *
 * **Volti belehrt Watti**, und der Schluss gehoert der Beziehung: „Ich bin
 * umsonst du Idiot." Emirhans Zeile, warm und boese im selben Satz.
 */
export const handyversicherung: Short = {
  id: 'handyversicherung',
  themaId: 'handyversicherung',
  format: 'absicht',
  sachgebiet: 'recht',
  bauform: 'wechselrede',
  arbeitstitel: 'Watti schmeißt sechs Euro im Monat weg',
  weitererzaehlt: 'für die gewöhnliche Verwendung eignen',
  suchbegriff: 'Handyversicherung Rechte',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Gut, dass ich meine Handyversicherung habe. Die zahlt das jetzt.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'ordner' },
  },
  vorspann: 'Watti und seine Versicherung',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Wie viel zahlst du dieser Handyversicherung im Monat? Sechs Euro, und dafür ist mein Handy komplett abgesichert.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wie viel zahlst du dieser Handyversicherung im Monat?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Sechs Euro, und dafür ist mein Handy komplett abgesichert.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'zeigen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bgb-438-verjaehrung',
      belegId: 'im-u-brigen-in',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext:
        'Und was hat dein Handy? Es geht seit Wochen einfach von selbst aus. Dafür hast du zwei Jahre lang Rechte.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und was hat dein Handy?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Es geht seit Wochen einfach von selbst aus.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Dafür hast du zwei Jahre lang Rechte.',
          quelleId: 'bgb-438-verjaehrung',
          belegId: 'im-u-brigen-in',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bgb-434-sachmangel',
      belegId: 'gewoehnliche-verwendung-eignet',
      sprechtext:
        'Warte, für genau das? Für genau das du Idiot. Ein Handy muss sich für die gewöhnliche Verwendung eignen.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Warte, für genau das?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Für genau das du Idiot. Ein Handy muss sich für die gewöhnliche Verwendung eignen.',
          quelleId: 'bgb-434-sachmangel',
          belegId: 'gewoehnliche-verwendung-eignet',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'lesen', nach: 'staunen' },
      },
    },
    {
      /*
       * **Der Kipppunkt ist die Umkehr der Beweislast**, und sie trifft Watti
       * genau da, wo er gerade gewonnen zu haben glaubt. Sein falscher Schluss
       * steht davor, damit die Wendung jemanden umwirft.
       */
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bgb-477-beweislast',
      belegId: 'zeigt-sich-innerhalb-eines',
      sprechtext:
        'Dann gehe ich einfach hin und die geben mir ein neues. So einfach nicht du Idiot. Im ersten Jahr wird vermutet, dass der Fehler von Anfang an da war. Vermutet? Und diese Vermutung gilt genau ein Jahr.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'falscherschluss',
          text: 'Dann gehe ich einfach hin und die geben mir ein neues.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'So einfach nicht du Idiot. Im ersten Jahr wird vermutet, dass der Fehler von Anfang an da war.',
          quelleId: 'bgb-477-beweislast',
          belegId: 'so-wird-vermutet-dass',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Vermutet?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Und diese Vermutung gilt genau ein Jahr.',
          quelleId: 'bgb-477-beweislast',
          belegId: 'zeigt-sich-innerhalb-eines',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'nachdenken',
        gegenueber: { von: 'staunen', nach: 'stutzen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Ein Handy muss sich für die gewöhnliche Verwendung eignen.',
      sprechtext:
        'Und wofür zahle ich dann seit einem Jahr? Dafür, dass du es fallen lässt. Dafür ist die Versicherung da, und dafür allein. Also hätte ich einfach in den Laden gehen können? Du hättest mich fragen können. Ich bin umsonst du Idiot.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wofür zahle ich dann seit einem Jahr?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'nebenbemerkung',
          text: 'Dafür, dass du es fallen lässt. Dafür ist die Versicherung da, und dafür allein.',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Also hätte ich einfach in den Laden gehen können?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'widerhaken',
          text: 'Du hättest mich fragen können. Ich bin umsonst du Idiot.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'nachdenken',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'achselzucken' },
      },
      rundlauf:
        'Beim zweiten Sehen hört man den ersten Satz anders: Watti ist stolz auf sechs Euro, für die er nichts bekommt, was er nicht ohnehin hätte.',
    },
  ],

  quellenIds: ['bgb-438-verjaehrung', 'bgb-434-sachmangel', 'bgb-477-beweislast'],

  texte: {
    tiktok: {
      titel: 'Watti schmeißt sechs Euro im Monat weg',
      beschreibung: 'Handyversicherung oder gesetzliche Rechte: Wofür du zwei Jahre lang ohnehin Rechte hast.',
      hashtags: ['#handyversicherung', '#verbraucherrecht', '#gewaehrleistung', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti schmeißt sechs Euro im Monat weg',
      beschreibung: 'Handyversicherung zahlt den Sturz. Deine Rechte gelten auch ohne sie.',
      hashtags: ['#handyversicherung', '#verbraucherrechte', '#handy', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Wofür Watti seine Handyversicherung bezahlt',
      beschreibung: 'Handyversicherung und gesetzliche Rechte: der Unterschied zu einem Unfallschutz.',
      hashtags: ['#handyversicherung', '#bgb', '#verbraucherschutz', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
