import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · das Piktogramm neben dem Preis.
 *
 * **Szenario 12, drittes Beispiel: Volti hat es aufgegeben.** Watti fragt zum
 * vierten Mal, warum kein Ladegeraet im Karton war — und die Antwort stand
 * beim Kauf neben dem Preis.
 *
 * **Zwei harte Pflichten, kein „sollte".** Der Erwaegungsgrund 10 der
 * Richtlinie schreibt „**sollte** angegeben sein"; Artikel 3a Absatz 2 sagt
 * „Die Wirtschaftsakteure **stellen sicher**". Volti zitiert die zweite
 * Fassung — Befund 58 in der Anwendung: Wo die Quelle zweimal dasselbe in
 * verschiedener Staerke sagt, gilt die staerkere.
 *
 * **Und die Wahlfreiheit ist der eigentliche Fakt.** Wer das Geraet mit
 * Ladegeraet anbietet, muss es auch ohne anbieten — der Kaeufer entscheidet,
 * nicht der Hersteller. Das kehrt Wattis „Das ist doch Absicht" um, ohne es zu
 * widerlegen.
 */
export const ladegeraetPiktogramm: Short = {
  id: 'ladegeraet-piktogramm',
  themaId: 'ladegeraet-piktogramm',
  format: 'gibtswirklich',
  sachgebiet: 'laden',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti fragt zum vierten Mal',
  weitererzaehlt: 'neben dem Preis',
  suchbegriff: 'Ladegerät Karton',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Im Karton war wieder kein Ladegerät. Das ist doch Absicht.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'karton' },
  },
  vorspann: 'Watti fragt zum vierten Mal',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, zum vierten Mal frage ich mich, ob du auf den Karton guckst. Da stand nichts drauf. Ein Piktogramm.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          machart: 'nebenbemerkung',
          text: 'Watti, zum vierten Mal frage ich mich, ob du auf den Karton guckst.',
        },
        { sprecher: 'zeiger', zug: 'widersprechen', text: 'Da stand nichts drauf.' },
        { sprecher: 'nachleser', zug: 'richtigstellen', text: 'Ein Piktogramm.' },
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
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'Das Piktogramm wird auf die Verpackung gedruckt oder als Aufkleber auf der Verpackung angebracht.',
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'piktogramm-auf-der-verpackung',
      herausgeber: 'Europäische Union',
      sprechtext:
        'Was für ein Piktogramm? Ein Bildchen, das zeigt, ob ein Ladegerät drin ist. Gedruckt oder als Aufkleber, du Idiot.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Was für ein Piktogramm?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ein Bildchen, das zeigt, ob ein Ladegerät drin ist.',
          quelleId: 'eu-einheitlicher-ladeanschluss',
          belegId: 'information-ob-ladenetzteil-enthalten',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Gedruckt oder als Aufkleber, du Idiot.',
          quelleId: 'eu-einheitlicher-ladeanschluss',
          belegId: 'piktogramm-auf-der-verpackung',
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
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'piktogramm-nahe-preisangabe',
      sprechtext:
        'Ich hab es online bestellt, da gibt es keinen Karton. Dann stand es neben dem Preis. Neben dem Preis? Da guckt doch keiner hin.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'rechtfertigung',
          text: 'Ich habe es online bestellt, da gibt es keinen Karton.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Dann stand es neben dem Preis.',
          quelleId: 'eu-einheitlicher-ladeanschluss',
          belegId: 'piktogramm-nahe-preisangabe',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Neben dem Preis? Da guckt doch keiner hin.' },
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
      quelleId: 'eu-einheitlicher-ladeanschluss',
      belegId: 'auch-ohne-ladenetzteil-erwerben',
      sprechtext:
        'Und wenn ich eins gewollt hätte? Wer es mit Ladegerät anbietet, muss es auch ohne anbieten. Andersrum steht da nichts. Also lag es an mir?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn ich eins gewollt hätte?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Wer es mit Ladegerät anbietet, muss es auch ohne anbieten. Andersrum steht da nichts.',
          quelleId: 'eu-einheitlicher-ladeanschluss',
          belegId: 'auch-ohne-ladenetzteil-erwerben',
        },
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Also lag es an mir?' },
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
      satz: 'Beim Onlinekauf steht das Piktogramm neben dem Preis.',
      sprechtext:
        'Es lag daran, dass du vier Mal nicht hingeguckt hast. Und beim fünften Mal? Guckst du hin oder fragst mich wieder.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Es lag daran, dass du vier Mal nicht hingeguckt hast.',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und beim fünften Mal?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'banaleaufloesung',
          text: 'Guckst du hin oder fragst mich wieder.',
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
        'Beim zweiten Sehen ist „Das ist doch Absicht" richtig – nur nicht die Absicht, die Watti meint.',
    },
  ],

  quellenIds: ['eu-einheitlicher-ladeanschluss'],

  texte: {
    tiktok: {
      titel: 'Watti fragt zum vierten Mal',
      beschreibung: 'Ladegerät und Karton: Wo steht, ob eins dabei ist.',
      hashtags: ['#ladegeraet', '#usbc', '#onlinekauf', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti fragt zum vierten Mal',
      beschreibung: 'Ladegerät und Karton: Beim Onlinekauf steht das Piktogramm neben dem Preis.',
      hashtags: ['#ladegeraet', '#usbc', '#handykauf', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Das Piktogramm neben dem Preis',
      beschreibung: 'Ladegerät und Karton: Was die Richtlinie über Piktogramm und Wahlmöglichkeit schreibt.',
      hashtags: ['#ladegeraet', '#usbc', '#eu', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
