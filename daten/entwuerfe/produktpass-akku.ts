import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · der digitale Produktpass am Akku.
 *
 * **Szenario 4, dritte Bauart: Watti fragt, was die Quelle nicht sagt.** Der
 * Konter kommt ohne Gegenbeweis aus — Volti muss zugeben, dass er es nicht
 * weiss. Befund 32: Er ist bei Technik ueberlegen, im Umgang mit Menschen
 * nicht, und **das ist das Feld, auf dem er irren darf, ohne dass der Beleg
 * wackelt.**
 *
 * **Die Quelle sagt es wirklich nicht.** Die Durchfuehrungsverordnung regelt
 * das Register und die Produktkennung; wer die Nummer eintraegt, steht dort
 * nicht. Voltis „Das steht in dem Text nicht drin." ist damit die genaueste
 * Zeile des ganzen Shorts.
 *
 * **Und die Handlung steht in der Beschreibung**, nicht im Video: Fuer den
 * Produktpass gibt es keinen Rat, der in eine Zeile passt.
 */
export const produktpassAkku: Short = {
  id: 'produktpass-akku',
  themaId: 'digitaler-produktpass',
  format: 'gibtswirklich',
  sachgebiet: 'laden',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Akku hat einen Ausweis',
  weitererzaehlt: 'eindeutigen Produktkennungen',
  suchbegriff: 'Produktpass Akku',
  kaltstart: {
    art: 'imvollzug',
    satz: 'Auf meinem neuen Akku klebt ein QR-Code, den scanne ich jetzt.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'qrcode' },
  },
  vorspann: 'Wattis Akku und sein Ausweis',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Was scannst du denn da? Den Code auf meinem Akku, mal sehen was da drinsteht.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Was scannst du denn da?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Den Code auf meinem Akku, mal sehen was da drinsteht.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'zeigen', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-produktpassregister',
      belegId: 'digitales-register-produktpass',
      sprechtext:
        'Das ist ein digitaler Produktpass. Dafür muss die Kommission ein eigenes Register einrichten. Ein Ausweis für einen Akku?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'behaupten',
          text: 'Das ist ein digitaler Produktpass. Dafür muss die Kommission ein eigenes Register einrichten.',
          quelleId: 'eu-produktpassregister',
          belegId: 'digitales-register-produktpass',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Ein Ausweis für einen Akku?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'erklaeren',
        gegenueber: { von: 'lesen', nach: 'stutzen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'mindestens die eindeutigen Produktkennungen gespeichert werden',
      quelleId: 'eu-produktpassregister',
      belegId: 'eindeutige-produktkennung-gespeichert',
      herausgeber: 'Europäische Union',
      sprechtext:
        'In dem Register werden mindestens die eindeutigen Produktkennungen gespeichert. Und was steht in so einem Ausweis drin?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'In dem Register werden mindestens die eindeutigen Produktkennungen gespeichert.',
          quelleId: 'eu-produktpassregister',
          belegId: 'eindeutige-produktkennung-gespeichert',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was steht in so einem Ausweis drin?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'lesen',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
    },
    {
      /*
       * **Der Kipppunkt ist Voltis Luecke, nicht Wattis Irrtum.** Er
       * beantwortet die erste Frage aus der Quelle und muss bei der zweiten
       * passen — und Watti merkt es sofort.
       */
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-produktpassregister',
      belegId: 'eindeutige-produktkennung-gespeichert',
      sprechtext:
        'Eine Kennung, die das Produkt eindeutig macht. Und wer schreibt die Kennung da rein? Das steht in dem Text nicht drin.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Eine Kennung, die das Produkt eindeutig macht.',
          quelleId: 'eu-produktpassregister',
          belegId: 'eindeutige-produktkennung-gespeichert',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wer schreibt die Kennung da rein?' },
        { sprecher: 'nachleser', zug: 'einschraenken', text: 'Das steht in dem Text nicht drin.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'lesen',
        nach: 'nachdenken',
        gegenueber: { von: 'staunen', nach: 'ansprechen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Im Register stehen mindestens die eindeutigen Produktkennungen.',
      sprechtext:
        'Aber du liest doch sonst alles nach. Dieses eine Mal weiß ich es nicht, ja? Dann scanne ich das Ding einfach nochmal.',
      rede: [
        { sprecher: 'zeiger', zug: 'erinnern', text: 'Aber du liest doch sonst alles nach.' },
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Dieses eine Mal weiß ich es nicht, ja?' },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'falscherschluss',
          text: 'Dann scanne ich das Ding einfach nochmal.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'nachdenken',
        nach: 'ruhe',
        gegenueber: { von: 'ansprechen', nach: 'zeigen' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, dass die Frage offen bleibt – und Wattis Scannen am Anfang ist schon der Versuch, es selbst herauszufinden.',
    },
  ],

  quellenIds: ['eu-produktpassregister'],

  texte: {
    tiktok: {
      titel: 'Wattis Akku hat einen Ausweis',
      beschreibung: 'Produktpass am Akku: Was hinter dem QR-Code auf der Batterie steckt.',
      hashtags: ['#produktpass', '#akku', '#eu', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Akku hat einen Ausweis',
      beschreibung: 'Produktpass für den Akku. Ein Register, eine Nummer, ein QR-Code.',
      hashtags: ['#produktpass', '#akku', '#nachhaltigkeit', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Der QR-Code auf Wattis Akku und was dahintersteckt',
      beschreibung: 'Produktpass und Akku: Was die EU-Durchführungsverordnung zum digitalen Register regelt.',
      hashtags: ['#produktpass', '#eu', '#batterie', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
