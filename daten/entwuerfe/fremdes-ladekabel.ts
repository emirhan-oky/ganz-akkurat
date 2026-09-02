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
  /*
   * **Der Kaltstart gehoert Wattis Sache, nicht einem Bericht ueber Volti.**
   *
   * Hier stand „Volti laedt mit einem Kabel, das er im Zug gefunden hat." —
   * Emirhans Urteil dazu: *„Mit wem redet Watti? Das ist komisch."* Er hatte
   * recht, und der Grund ist benennbar: Der Kaltstart ist ein Selbstgespraech,
   * und in allen neun seiner eigenen geht es um **Wattis** Gegenstand oder um
   * **Wattis** Ueberzeugung. Ein Bericht ueber den anderen hat keinen
   * Sprecher, an den er sich richtet.
   *
   * Jetzt traegt er Wattis Position — und der Short loest sie zur Haelfte auf:
   * Es kommt aufs Kabel an, aber nicht wegen des Bahnsteigs.
   */
  kaltstart: {
    art: 'gewissheit',
    satz: 'Ein Kabel vom Bahnsteig kommt mir nicht ans Handy.',
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
        'Deins lag im Zug rum, meins nicht. Meins hat wenigstens einen Namen drauf. Früher war bei 100 Watt Schluss.',
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
          text: 'Früher war bei 100 Watt Schluss.',
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
       * **Die Rechnung steht als Rechnung im Bild und im Untertitel.**
       *
       * Emirhans Befund: *„Hier ist es leichter, wenn du es in den Untertiteln
       * einfach als Rechenaufgabe darstellst."* Vorher stand ein **Satz ueber**
       * eine Rechnung — „aus 20 Volt mal 5 Ampere" —, und die Zahl-Szene zeigte
       * daneben ein Ergebnis, das im Satz gar nicht vorkam.
       *
       * Jetzt fragt Watti danach, Volti rechnet, und `wert` mal `einheit`
       * ergibt im Bild dieselbe Zeile: gross und blau „20 × 5", daneben
       * „= 100 Watt". Der Sprechtext ist Wort fuer Wort der Untertitel — die
       * Rechenaufgabe steht damit zweimal da und beide Male gleich.
       */
      art: 'zahl',
      position: 'zuspitzung',
      wert: '20 × 5',
      einheit: '= 100 Watt',
      bedeutung: 'so kam früher die höchste Leistung zustande',
      quelleId: 'usbif-power-delivery',
      belegId: 'usb-pd-was-limited',
      sprechtext: 'Und wie kommt man auf 100? 20 Volt mal 5 Ampere.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wie kommt man auf 100?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: '20 Volt mal 5 Ampere.',
          quelleId: 'usbif-power-delivery',
          belegId: 'usb-pd-was-limited',
        },
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
      /*
       * **Hier stand die Pronomen-Kollision, die den Schluss unlesbar machte.**
       *
       * Volti sagte „Und **deins** kann alles oder gar nichts" ueber Wattis
       * Kabel, und Watti antwortete „**Deins** ist also auch nur geraten" ueber
       * Voltis. Zwei Saetze hintereinander, dasselbe Wort, verschiedene Kabel —
       * und dazu falsch herum, denn das unbekannte ist Voltis Fundkabel.
       *
       * Das ist Befund 23 aus `dialoganalyse.md` in seiner teuersten Form: das
       * Substantiv statt des Pronomens. Emirhans Urteil dazu war nicht „falsch",
       * sondern *„ich checke einfach nicht, in welche Richtung du willst."*
       */
      sprechtext:
        'Heute gehen 240 Watt, über 28, 36 und 48 Volt. Wer hat denn jetzt recht? Keiner von uns beiden. Für 240 Watt gelten eigene Anforderungen an das Kabel. Also nicht ans Netzteil? Ans Kabel. Nicht der Name, der draufsteht.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Heute gehen 240 Watt, über 28, 36 und 48 Volt.',
          quelleId: 'usbif-power-delivery',
          belegId: 'neue-spannungen-140-180-240',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Wer hat denn jetzt recht?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Keiner von uns beiden. Für 240 Watt gelten eigene Anforderungen an das Kabel.',
          quelleId: 'usbif-power-delivery',
          belegId: 'type-c-release-2-1-240w',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Also nicht ans Netzteil?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ans Kabel. Nicht der Name, der draufsteht.',
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
      /*
       * **Beide geben nach — die Aufloesung, fuer die Szenario 6 gebaut ist.**
       *
       * Watti hatte recht, dass es aufs Kabel ankommt, und unrecht, warum. Das
       * ist die einzige Stelle im Short, an der er gewinnt, und sie kostet
       * Volti mehr als ihn.
       *
       * **Und der Short landet nicht auf „die Zahl steht drauf".** Darauf endet
       * `ladekabel-watt`, und zwei Shorts ueber Kabel duerfen nicht dieselbe
       * Pointe haben.
       *
       * Hier stand „Bei dir, kleiner." Emirhans Befund: *„Dieses kleiner am
       * Ende muss nicht sein."* Es ist keine Vorschrift und war nie eine — ich
       * hatte es fuenfmal automatisch ans Ende gesetzt.
       */
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Es kommt aufs Kabel an, nicht auf den Namen darauf.',
      sprechtext:
        'Also hatte ich doch recht mit dem Kabel. Du hattest recht, dass es drauf ankommt. Nicht warum. Nehme ich.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'umdeutung',
          text: 'Also hatte ich doch recht mit dem Kabel.',
        },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Du hattest recht, dass es drauf ankommt. Nicht warum.',
        },
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Nehme ich.' },
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
