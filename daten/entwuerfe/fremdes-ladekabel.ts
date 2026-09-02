import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · das fremde Ladekabel.
 *
 * **Szenario 6: Beide liegen daneben.** Watti sagt, das billige Kabel macht
 * das Handy kaputt. Volti sagt, ein Kabel ist ein Kabel. Beide reden ueber die
 * **Marke**, und entschieden wird es ueber die Anforderungen an das Kabel.
 *
 * **Der Belegpruefer hat den Short am 03.09.2026 in die Gegenwart gerueckt.**
 * Er stand auf „100 Watt kommen aus 20 Volt mal 5 Ampere" — und der volle Satz
 * beim USB-IF beginnt mit „**Prior to this update**". Das Zitat beschreibt den
 * Stand **vor** USB PD 3.1; heute gehen 240 Watt ueber hoehere Spannungen.
 * Erzaehlt wurde im Praesens, was die Quelle als ueberholt bezeichnet.
 *
 * **Die Form verlangt, dass die Quelle ein Drittes sagt.** Ein Streitfall, in
 * dem eine Seite einfach recht hat, ist ein Maerchen mit zwei Sprechern; das
 * steht so in der Abgrenzung von `eswareinmal` gegen `werhatrecht`.
 */
export const fremdesLadekabel: Short = {
  id: 'fremdes-ladekabel',
  themaId: 'fremdes-ladekabel',
  format: 'werhatrecht',
  sachgebiet: 'laden',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti streitet über das falsche Kabel',
  weitererzaehlt: 'Für 240 Watt gelten eigene Anforderungen an das Kabel',
  suchbegriff: 'Ladekabel Ampere',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Volti lädt mit einem Kabel, das er im Zug gefunden hat.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'kabel' },
  },
  vorspann: 'Wattis Streit über ein Ladekabel',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, nimm das Ladekabel da weg, das macht dein Handy kaputt. Ein Kabel ist ein Kabel, Watti. Da fließt Strom durch, fertig.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'behaupten',
          text: 'Volti, nimm das Ladekabel da weg, das macht dein Handy kaputt.',
        },
        {
          sprecher: 'nachleser',
          zug: 'widersprechen',
          text: 'Ein Kabel ist ein Kabel, Watti. Da fließt Strom durch, fertig.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'achselzucken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'usbif-power-delivery',
      belegId: 'usb-pd-was-limited',
      herausgeber: 'USB Implementers Forum',
      sprechtext:
        'Deins lag im Zug rum, meins nicht. Meins hat wenigstens einen Namen drauf. Früher war bei 100 Watt Schluss, aus 20 Volt mal 5 Ampere.',
      rede: [
        { sprecher: 'zeiger', zug: 'erinnern', text: 'Deins lag im Zug rum, meins nicht.' },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'falscheautoritaet',
          text: 'Meins hat wenigstens einen Namen drauf.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Früher war bei 100 Watt Schluss, aus 20 Volt mal 5 Ampere.',
          quelleId: 'usbif-power-delivery',
          belegId: 'usb-pd-was-limited',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'stutzen',
        gegenueber: { von: 'achselzucken', nach: 'erklaeren' },
      },
    },
    {
      /*
       * **Die Zahl steht im Bild, weil sie im Sprechtext steht.** `zahlImBild`
       * verlangt fuer jede technische Angabe eine `zahl`-Szene — und hier ist
       * sie zugleich das Dritte, das keiner der beiden hatte.
       */
      art: 'zahl',
      position: 'zuspitzung',
      wert: '240',
      einheit: 'Watt',
      bedeutung: 'so viel geht heute, über höhere Spannungen',
      quelleId: 'usbif-power-delivery',
      belegId: 'neue-spannungen-140-180-240',
      sprechtext:
        'Und heute? Heute gehen 240 Watt, über 28, 36 und 48 Volt. Wer hat denn jetzt recht? Keiner von uns beiden.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und heute?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Heute gehen 240 Watt, über 28, 36 und 48 Volt.',
          quelleId: 'usbif-power-delivery',
          belegId: 'neue-spannungen-140-180-240',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Wer hat denn jetzt recht?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Keiner von uns beiden.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'Release 2.1 to define 240W cable requirements',
      quelleId: 'usbif-power-delivery',
      belegId: 'type-c-release-2-1-240w',
      sprechtext:
        'Für 240 Watt gelten eigene Anforderungen an das Kabel. Also nicht ans Netzteil? Ans Kabel. Und deins kann alles oder gar nichts.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Für 240 Watt gelten eigene Anforderungen an das Kabel.',
          quelleId: 'usbif-power-delivery',
          belegId: 'type-c-release-2-1-240w',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Also nicht ans Netzteil?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ans Kabel. Und deins kann alles oder gar nichts.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'staunen',
        gegenueber: { von: 'zeigen', nach: 'lesen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Die Zahl steht im Kabel, nicht auf der Packung.',
      sprechtext:
        'Deins ist also auch nur geraten. Meins liegt seit heute im Zug. Und wo lädst du jetzt? Bei dir, kleiner.',
      rede: [
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'umdeutung', text: 'Deins ist also auch nur geraten.' },
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Meins liegt seit heute im Zug.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wo lädst du jetzt?' },
        { sprecher: 'nachleser', zug: 'beantworten', machart: 'widerhaken', text: 'Bei dir, kleiner.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'ansprechen',
        gegenueber: { von: 'lesen', nach: 'achselzucken' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, dass Voltis Fundkabel wirklich das Problem war – nur nicht aus dem Grund, den Watti im ersten Satz nennt.',
    },
  ],

  quellenIds: ['usbif-power-delivery'],

  texte: {
    tiktok: {
      titel: 'Watti streitet über das falsche Kabel',
      beschreibung: 'Ladekabel und Ampere: Woran es beim Laden wirklich hängt.',
      hashtags: ['#ladekabel', '#usbc', '#schnellladen', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti streitet über das falsche Kabel',
      beschreibung: 'Ladekabel, Marke, Ampere. Entschieden wird es von der Stromstärke.',
      hashtags: ['#ladekabel', '#usbc', '#laden', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was Wattis Ladekabel wirklich aushält',
      beschreibung: 'Ladekabel und Ampere: Was das USB Implementers Forum zu 100 und 240 Watt schreibt.',
      hashtags: ['#ladekabel', '#usbpowerdelivery', '#laden', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
