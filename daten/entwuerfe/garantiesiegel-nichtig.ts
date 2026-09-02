import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · der Aufkleber „Garantie erlischt bei Entfernung".
 *
 * **Der erste Dialog aus dem Gegentest vom 02.09.2026**, und der einzige, der
 * drei Anlaeufe gebraucht hat. Was an den ersten beiden fehlte, steht heute in
 * `daten/marke/dialoganalyse.md` als Befund 1: *ein Gegenstand, eine Handlung,
 * eine Folge — keine Kette.* Anlauf eins hatte Aufkleber ueber Schraube ueber
 * Gehaeuse ueber Luefter.
 *
 * **Volti belehrt Watti** — das Grundszenario, `daten/szenarien/01`.
 */
export const garantiesiegelNichtig: Short = {
  id: 'garantiesiegel-nichtig',
  themaId: 'garantiesiegel-nichtig',
  format: 'absicht',
  sachgebiet: 'recht',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti glaubt einem Aufkleber',
  weitererzaehlt: 'kommt zusätzlich zu deinen Rechten',
  suchbegriff: 'Garantie Aufkleber',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Meine Kopfhörer sind hin, und zurückgeben geht nicht.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'stempel' },
  },
  vorspann: 'Watti glaubt einem Aufkleber',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Warum bringst du die Kopfhörer nicht einfach zurück? Weil ich sie letztes Jahr aufgemacht habe und der Aufkleber jetzt ab ist.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Warum bringst du die Kopfhörer nicht einfach zurück?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Weil ich sie letztes Jahr aufgemacht habe und der Aufkleber jetzt ab ist.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'lesen' },
      },
    },
    {
      /*
       * **Wattis falscher Schluss traegt die Zuspitzung, Voltis Beleg deckt
       * sie.** Jede Zuspitzung braucht eine Fundstelle — Watti liefert keine,
       * er ist die Reaktion. Die Deckung kommt von der dritten Zeile.
       */
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bgb-443-garantie',
      belegId: 'zusa-tzlich-zu-der',
      sprechtext:
        'Und deswegen wirfst du sie einfach weg? Ja was soll ich denn machen, die Garantie ist doch futsch. Eine Garantie kommt zusätzlich zu deinen Rechten, du Idiot.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und deswegen wirfst du sie einfach weg?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscherschluss',
          text: 'Ja was soll ich denn machen, die Garantie ist doch futsch.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Eine Garantie kommt zusätzlich zu deinen Rechten, du Idiot.',
          quelleId: 'bgb-443-garantie',
          belegId: 'zusa-tzlich-zu-der',
        },
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
      /*
       * **Die zweite Zuspitzung traegt die Frist.** Sie steht als eigene
       * Szene, weil `szenen` fuenf verlangt — und die Regel hatte recht: In
       * einem Stueck sprach Volti hier ueber die Szenengrenze hinweg drei
       * Saetze am Stueck, und `redelaeufe` haette sie zu einem Vortrag
       * geklebt. Wattis Rueckfrage ist der Schnitt.
       */
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bgb-438-verjaehrung',
      belegId: 'im-u-brigen-in',
      sprechtext:
        'Und deine Rechte laufen zwei Jahre. Warte, also war der Aufkleber die ganze Zeit für nichts?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Und deine Rechte laufen zwei Jahre.',
          quelleId: 'bgb-438-verjaehrung',
          belegId: 'im-u-brigen-in',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'rueckfrage',
          text: 'Warte, also war der Aufkleber die ganze Zeit für nichts?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
    },
    {
      /*
       * **Der Kipppunkt von `absicht` ist die Person dahinter.** Nicht der
       * Aufkleber ist die Wendung, sondern dass jemand ihn angebracht hat und
       * genau auf diesen Gedanken gesetzt hat.
       *
       * Die Karte steht dabei im Bild und Volti redet darueber — das ist die
       * Bauform. Eine Gegenstimme braucht die Szene nicht: Watti hat gerade
       * gefragt, und die Antwort ist die Pointe.
       */
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'zusätzlich zu der gesetzlichen Mängelhaftung',
      quelleId: 'bgb-443-garantie',
      belegId: 'zusa-tzlich-zu-der',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext: 'Für den Hersteller war er was wert. Du hast geglaubt, er zählt.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'nebenbemerkung',
          text: 'Für den Hersteller war er was wert. Du hast geglaubt, er zählt.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'lesen',
        gegenueber: { von: 'staunen', nach: 'stutzen' },
      },
    },
    {
      /*
       * **Der Schluss gehoert der Beziehung, nicht der Sache** — Befund 13,
       * acht von neun Dialogen enden so. Und Voltis letzte Zeile ist ein
       * Gestaendnis, obwohl das Fach Watti gehoert: Genau diese Zeile hat
       * `gestaendnis` am 02.09.2026 zu einer geteilten Machart gemacht.
       */
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Eine Garantie kommt zusätzlich zu deinen Rechten.',
      sprechtext:
        'Also bringe ich sie einfach zurück? Wir bringen sie zurück. Du sagst gar nichts, weil ich rede, kleiner. Und wenn die sagen, ich hätte sie selbst kaputtgemacht? Das kann nicht passieren, weil ich sie ja kaputt gemacht habe.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Also bringe ich sie einfach zurück?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'widerhaken',
          text: 'Wir bringen sie zurück. Du sagst gar nichts, weil ich rede, kleiner.',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn die sagen, ich hätte sie selbst kaputtgemacht?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'gestaendnis',
          text: 'Das kann nicht passieren, weil ich sie ja kaputt gemacht habe.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'lesen',
        nach: 'ansprechen',
        gegenueber: { von: 'staunen', nach: 'stutzen' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, dass Volti die Kopfhörer selbst kaputt gemacht hat – und hört jede seiner Belehrungen anders.',
    },
  ],

  quellenIds: ['bgb-443-garantie', 'bgb-438-verjaehrung'],

  texte: {
    tiktok: {
      titel: 'Watti glaubt einem Aufkleber',
      beschreibung: 'Garantie Aufkleber am Gehäuse: Was er wirklich kann und was nicht.',
      hashtags: ['#garantie', '#verbraucherrecht', '#reparatur', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti glaubt einem Aufkleber',
      beschreibung: 'Garantie Aufkleber ab, Rechte weg? So steht es im Gesetz.',
      hashtags: ['#garantie', '#verbraucherrechte', '#recht', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Der Aufkleber, der Wattis Rechte nicht nehmen kann',
      beschreibung: 'Garantie Aufkleber und gesetzliche Mängelhaftung: der Unterschied im BGB.',
      hashtags: ['#garantie', '#bgb', '#verbraucherschutz', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
