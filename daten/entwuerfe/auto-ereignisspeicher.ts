import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · der Ereignisdatenspeicher im Auto.
 *
 * **Szenario 12: Volti hat es aufgegeben.** Watti fragt zum vierten Mal
 * dasselbe, und Volti antwortet nicht mehr wie beim ersten Mal. Die Form lebt
 * davon, dass der Zuschauer die Vorgeschichte **nicht** kennt und sie aus
 * Voltis Ton trotzdem heraushoert.
 *
 * **Der Beleg ist enger als die Empoerung**, und das ist hier die Substanz:
 * Das Auto schreibt nicht dauerhaft mit, sondern um den Aufprall herum. Wer
 * daraus „dein Auto verpfeift dich" macht, hat die Verordnung nicht gelesen.
 *
 * **Genauigkeit vor Empoerung** — der Satz steht im `stuetzt` der Fundstelle
 * und ist der Grund, warum dieser Gegenstand hier steht und nicht bei
 * Szenario 11.
 */
export const autoEreignisspeicher: Short = {
  id: 'auto-ereignisspeicher',
  themaId: 'auto-ereignisspeicher',
  format: 'gibtswirklich',
  sachgebiet: 'fahren',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti fragt zum vierten Mal nach seinem Auto',
  weitererzaehlt: 'dient ausschließlich dem Zweck, den aufzuzeichnen',
  suchbegriff: 'Auto Aufprall',
  kaltstart: {
    art: 'hilferuf',
    satz: 'Volti, ganz kurz nur: Schreibt mein Auto eigentlich alles mit?',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'ansprechen', requisite: 'warndreieck' },
  },
  vorspann: 'Wattis Auto und die vierte Frage',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Zum vierten Mal fragst du mich das mit dem Auto, Watti. Dann sag es zum vierten Mal. Nein.',
      rede: [
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Zum vierten Mal fragst du mich das mit dem Auto, Watti.' },
        { sprecher: 'zeiger', zug: 'bitten', text: 'Dann sag es zum vierten Mal.' },
        { sprecher: 'nachleser', zug: 'widersprechen', text: 'Nein.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ruhe',
        nach: 'achselzucken',
        gegenueber: { von: 'ansprechen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-ereignisdatenspeicher',
      belegId: 'ereignisbezogene-datenaufzeichnung',
      sprechtext:
        'Du hast es mir dreimal erklärt und ich weiß es immer noch nicht. Es heißt ereignisbezogene Datenaufzeichnung. Ereignis heißt jeden Tag?',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'erinnern',
          text: 'Du hast es mir dreimal erklärt und ich weiß es immer noch nicht.',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Es heißt ereignisbezogene Datenaufzeichnung.',
          quelleId: 'eu-ereignisdatenspeicher',
          belegId: 'ereignisbezogene-datenaufzeichnung',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'falscherschluss', text: 'Ereignis heißt jeden Tag?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'achselzucken',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'ausschließlich dem Zweck dient, kritische unfallbezogene Parameter aufzuzeichnen',
      quelleId: 'eu-ereignisdatenspeicher',
      belegId: 'ausschliesslich-dem-zweck',
      herausgeber: 'Europäische Union',
      sprechtext:
        'Ereignis heißt Aufprall. Das System dient ausschließlich dem Zweck, den aufzuzeichnen. Also nicht, wo ich überall war.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Ereignis heißt Aufprall. Das System dient ausschließlich dem Zweck, den aufzuzeichnen.',
          quelleId: 'eu-ereignisdatenspeicher',
          belegId: 'ausschliesslich-dem-zweck',
        },
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'rueckfrage', text: 'Also nicht, wo ich überall war.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'nachdenken', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-ereignisdatenspeicher',
      belegId: 'kritische-unfallbezogene-parameter-u',
      sprechtext: 'Nicht, wo du überall hinfährst. Und beim fünften Mal? Beim fünften Mal sage ich es dir wieder.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Nicht, wo du überall hinfährst.',
          quelleId: 'eu-ereignisdatenspeicher',
          belegId: 'ausschliesslich-dem-zweck',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und beim fünften Mal?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'widerhaken',
          text: 'Beim fünften Mal sage ich es dir wieder.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'ansprechen',
        gegenueber: { von: 'staunen', nach: 'ruhe' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Aufgezeichnet wird der Aufprall, nicht der Weg.',
      sprechtext: 'Danke, großer Bruder. Frag lieber gleich nochmal.',
      rede: [
        { sprecher: 'zeiger', zug: 'einlenken', machart: 'menschenvergleich', text: 'Danke, großer Bruder.' },
        { sprecher: 'nachleser', zug: 'zuspitzen', text: 'Frag lieber gleich nochmal.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'ruhe',
        gegenueber: { von: 'ruhe', nach: 'zeigen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist Wattis „ganz kurz nur" die Pointe: Es ist die vierte Runde, und beim nächsten Sehen ist es die fünfte.',
    },
  ],

  quellenIds: ['eu-ereignisdatenspeicher'],

  texte: {
    tiktok: {
      titel: 'Wattis Auto und die vierte Frage',
      beschreibung: 'Auto und Aufprall: Was der Speicher im Wagen aufzeichnet und wann.',
      hashtags: ['#auto', '#datenschutz', '#eu', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Auto und die vierte Frage',
      beschreibung: 'Das Auto schreibt den Aufprall mit. Nicht den Weg.',
      hashtags: ['#auto', '#datenschutz', '#fahren', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was Wattis Auto beim Aufprall aufzeichnet',
      beschreibung: 'Auto und Aufprall: Was die EU-Verordnung zur ereignisbezogenen Datenaufzeichnung regelt.',
      hashtags: ['#auto', '#datenschutz', '#eu', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
