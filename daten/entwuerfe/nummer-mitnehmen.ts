import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · der Kollege, der vom Wechseln abrät.
 *
 * **Szenario 9, drittes Beispiel: Der Dritte im Raum.** Nach dem Vater
 * (`akku-ganz-leer`) und dem Nachbarn (`achtzig-prozent-nachbar`) ist es der
 * Kollege — und wie die beiden anderen ist er nicht da und entscheidet
 * trotzdem, was Watti tut.
 *
 * **Die Pointe ist die Zustaendigkeit.** Watti glaubt, er muesse beim alten
 * Anbieter etwas beantragen; § 59 sagt, der **aufnehmende** Anbieter fuehrt
 * den Wechsel. Wer das weiss, hat nichts zu tun — und genau daran scheitert
 * Wattis Ausrede.
 *
 * **Kein „frueher war die Nummer weg".** Das waere der `eswareinmal`-Bau, und
 * das Format fehlt dem ganzen Durchgang. Die Quelle traegt es nicht: Sie sagt,
 * was heute gilt, nicht was frueher galt. **Ein Format zu fuellen ist kein
 * Grund, eine Behauptung zu erfinden.**
 */
export const nummerMitnehmen: Short = {
  id: 'nummer-mitnehmen',
  themaId: 'rufnummernmitnahme',
  format: 'absicht',
  sachgebiet: 'netz',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Kollege hat da mal was gehört',
  weitererzaehlt: 'nicht länger als einen Arbeitstag',
  suchbegriff: 'Anbieterwechsel Rufnummer',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Ich bleibe bei meinem Mobilfunkanbieter, sonst ist die Nummer weg.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'kassenbon' },
  },
  vorspann: 'Wattis Kollege hat da mal was gehört',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, wer sagt dir, dass beim Anbieterwechsel die Nummer weg ist? Ein Kollege. Der hat das mal probiert.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachhaken',
          text: 'Watti, wer sagt dir, dass beim Anbieterwechsel die Nummer weg ist?',
        },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscheautoritaet',
          text: 'Ein Kollege. Der hat das mal probiert.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'ruhe', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'tkg-59-anbieterwechsel',
      belegId: 'leitung-aufnehmender-anbieter',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext:
        'Und was hat dein Kollege gemacht? Beim alten Anbieter angerufen. Da liegt sein Fehler. Den Wechsel führt der neue.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und was hat dein Kollege gemacht?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Beim alten Anbieter angerufen.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Da liegt sein Fehler. Den Wechsel führt der neue.',
          quelleId: 'tkg-59-anbieterwechsel',
          belegId: 'leitung-aufnehmender-anbieter',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'achselzucken',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'Anbieterwechsel und Rufnummernmitnahme erfolgen unter Leitung des aufnehmenden Anbieters.',
      quelleId: 'tkg-59-anbieterwechsel',
      belegId: 'leitung-aufnehmender-anbieter',
      sprechtext:
        'Also muss ich beim alten gar nichts sagen? Du sagst dem neuen, dass du deine Rufnummer mitnimmst. Den Rest machen die unter sich.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Also muss ich beim alten gar nichts sagen?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Du sagst dem neuen, dass du deine Rufnummer mitnimmst.',
          quelleId: 'tkg-59-anbieterwechsel',
          belegId: 'leitung-aufnehmender-anbieter',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          machart: 'banaleaufloesung',
          text: 'Den Rest machen die unter sich.',
          quelleId: 'tkg-59-anbieterwechsel',
          belegId: 'zur-zusammenarbeit-verpflichtet',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'achselzucken',
        nach: 'staunen',
        gegenueber: { von: 'zeigen', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'tkg-59-anbieterwechsel',
      belegId: 'hoechstens-ein-arbeitstag',
      sprechtext:
        'Und wie lange bin ich dann offline? Der Dienst darf nicht länger als einen Arbeitstag unterbrochen sein.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'katastrophe', text: 'Und wie lange bin ich dann offline?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Der Dienst darf nicht länger als einen Arbeitstag unterbrochen sein.',
          quelleId: 'tkg-59-anbieterwechsel',
          belegId: 'hoechstens-ein-arbeitstag',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'erklaeren' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Den Wechsel führt der neue Anbieter, nicht du.',
      sprechtext:
        'Und wenn sie sich Zeit lassen? Dann zahlst du dem alten nach Vertragsende nur noch den halben Anschluss. Das erzähle ich meinem Kollegen.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn sie sich Zeit lassen?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann zahlst du dem alten nach Vertragsende nur noch den halben Anschluss.',
          quelleId: 'tkg-59-anbieterwechsel',
          belegId: 'fuenfzig-prozent-reduziert',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'uebercompliance',
          text: 'Das erzähle ich meinem Kollegen.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'achselzucken',
        gegenueber: { von: 'erklaeren', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „sonst ist die Nummer weg" nicht Wattis Wissen, sondern das eines Kollegen, der beim falschen Anbieter angerufen hat.',
    },
  ],

  quellenIds: ['tkg-59-anbieterwechsel'],

  texte: {
    tiktok: {
      titel: 'Wattis Kollege hat da mal was gehört',
      beschreibung: 'Anbieterwechsel und Rufnummer: Wer den Wechsel macht und wie lange er dauern darf.',
      hashtags: ['#anbieterwechsel', '#handyvertrag', '#rufnummer', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Kollege hat da mal was gehört',
      beschreibung: 'Anbieterwechsel und Rufnummer: Der neue Anbieter führt das, nicht du.',
      hashtags: ['#anbieterwechsel', '#handyvertrag', '#mobilfunk', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Wer den Anbieterwechsel wirklich macht',
      beschreibung: 'Anbieterwechsel und Rufnummer: Was § 59 TKG über Leitung, Fristen und Entgelte schreibt.',
      hashtags: ['#anbieterwechsel', '#tkg', '#mobilfunk', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
