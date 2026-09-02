import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · „Bitte schalten Sie Ihr Handy aus."
 *
 * **Szenario 9: Der Dritte im Raum.** Nicht Volti und nicht Watti haben etwas
 * behauptet, sondern das Bordpersonal — und der Short arbeitet an dessen Satz
 * ab. Die dritte Instanz muss nicht erfunden werden: Sie steht in der Quelle.
 *
 * ## Der Short stand auf einer Begruendung, die die Quelle nicht hergibt
 *
 * Bis zum 03.09.2026 sagte Volti hier: „Das stoert den Boden. Es sieht zu
 * viele Funkzellen auf einmal." **Der Belegpruefer hat gleich dreifach
 * widersprochen.** Erstens nennt der Durchfuehrungsbeschluss keinen Grund; er
 * verlangt nur, dass eine Netzsteuerungseinheit verhindert, dass Geraete sich
 * bei terrestrischen Netzen anmelden. Zweitens kommt das Wort „Funkzelle"
 * darin null Mal vor. Drittens sagt Erwaegungsgrund 7 das Gegenteil: Es wurden
 * **keine** funktechnischen Stoerungen festgestellt, die von Geraeten an Bord
 * verursacht worden waeren.
 *
 * Ebenso gestrichen ist „Es war nie deins" — die EASA schreibt ausdruecklich,
 * dass tragbare Geraete die Bordausruestung stoeren koennen.
 *
 * **Was bleibt, ist besser als die erfundene Erklaerung:** Volti sagt, was
 * verlangt wird, und muss dann zugeben, dass der Grund nicht dabeisteht.
 * Dieselbe Bewegung wie in `produktpass-akku` — der Nachleser stoesst an die
 * Grenze seiner Quelle, und das ist die ehrlichste Stelle des Shorts.
 *
 * **Das Thema lief am 18.08.2026 als `flugmodus-herkunft`.** Es wird bewusst
 * neu erzaehlt; die alte `themaId` bleibt, damit die Wache es meldet.
 */
export const flugmodusAnsage: Short = {
  id: 'flugmodus-ansage',
  themaId: 'flugmodus-herkunft',
  format: 'absicht',
  sachgebiet: 'fahren',
  bauform: 'zitatkarte',
  arbeitstitel: 'Die Ansage, die Watti nicht mehr glaubt',
  weitererzaehlt: 'sich bei den Netzen am Boden anmeldet',
  suchbegriff: 'Flugmodus Handy',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Die Frau vorne sagt, ich soll mein Handy ausmachen. Schon wieder.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'flugzeug' },
  },
  vorspann: 'Wattis Flugmodus und die Ansage',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, stürzt der Flieger ab, wenn ich mein Handy anlasse? Nein. Warum sagt sie es dann?',
      rede: [
        { sprecher: 'zeiger', zug: 'bitten', text: 'Volti, stürzt der Flieger ab, wenn ich mein Handy anlasse?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Nein.' },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Warum sagt sie es dann?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'erklaeren' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'versuchen, sich bei terrestrischen UMTS-Mobilfunknetzen anzumelden',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'terrestrischen-umts-mobilfunknetzen',
      herausgeber: 'Europäische Union',
      sprechtext:
        'An Bord muss eine Einheit verhindern, dass dein Handy sich bei den Netzen am Boden anmeldet. Und warum? Steht da nicht drin.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'An Bord muss eine Einheit verhindern, dass dein Handy sich bei den Netzen am Boden anmeldet.',
          quelleId: 'eu-mca-5g-an-bord',
          belegId: 'terrestrischen-umts-mobilfunknetzen',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und warum?' },
        { sprecher: 'nachleser', zug: 'einschraenken', text: 'Steht da nicht drin.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'hinzufuegen-der-5g-netzanbindung',
      sprechtext:
        'Du liest doch sonst alles nach. Dieses eine Mal steht es nicht da. Und trotzdem soll ich es ausmachen? Seit 2022 ist 5G an Bord sogar ausdrücklich vorgesehen.',
      rede: [
        { sprecher: 'zeiger', zug: 'erinnern', text: 'Du liest doch sonst alles nach.' },
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Dieses eine Mal steht es nicht da.' },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'umdeutung',
          text: 'Und trotzdem soll ich es ausmachen?',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Seit 2022 ist 5G an Bord sogar ausdrücklich vorgesehen.',
          quelleId: 'eu-mca-5g-an-bord',
          belegId: 'hinzufuegen-der-5g-netzanbindung',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'zeigen',
        gegenueber: { von: 'lesen', nach: 'erklaeren' },
      },
    },
    {
      /*
       * **Der Kipppunkt gehoert dem Dritten.** Die Ansage ist aelter als die
       * Regel, auf die sie sich beruft — und niemand hat sie zurueckgenommen.
       */
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'bis-zum-1-januar-2026',
      sprechtext:
        'Und ausdrücklich seit wann? Bis zum 1. Januar 2026 musste das Anmelden verhindert werden. Also sagt sie etwas von damals? Sie sagt, was sie immer gesagt hat.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und ausdrücklich seit wann?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Bis zum 1. Januar 2026 musste das Anmelden verhindert werden.',
          quelleId: 'eu-mca-5g-an-bord',
          belegId: 'bis-zum-1-januar-2026',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          text: 'Also sagt sie etwas von damals?',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'banaleaufloesung',
          text: 'Sie sagt, was sie immer gesagt hat.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'nachdenken',
        gegenueber: { von: 'erklaeren', nach: 'achselzucken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Eine Einheit an Bord hält die Handys von den Netzen am Boden fern.',
      sprechtext:
        'Dann lasse ich den Flugmodus jetzt aus. Machst du nicht. Und warum nicht? Weil sie es gesagt hat, kleiner.',
      rede: [
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'falscheautoritaet', text: 'Dann lasse ich den Flugmodus jetzt aus.' },
        { sprecher: 'nachleser', zug: 'widersprechen', text: 'Machst du nicht.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und warum nicht?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'menschenvergleich',
          text: 'Weil sie es gesagt hat, kleiner.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'achselzucken',
        gegenueber: { von: 'achselzucken', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen hört man Wattis erste Beschwerde als das, was am Ende bleibt: Die Ansage gilt weiter, egal was in der Verordnung steht.',
    },
  ],

  quellenIds: ['eu-mca-5g-an-bord'],

  texte: {
    tiktok: {
      titel: 'Die Ansage, die Watti nicht mehr glaubt',
      beschreibung: 'Flugmodus im Handy: Was die Verordnung dazu wirklich sagt.',
      hashtags: ['#flugmodus', '#fliegen', '#mobilfunk', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Die Ansage, die Watti nicht mehr glaubt',
      beschreibung: 'Flugmodus am Handy: An Bord hält eine Einheit die Netze am Boden fern.',
      hashtags: ['#flugmodus', '#fliegen', '#handy', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was in der Verordnung zu Wattis Flugmodus steht',
      beschreibung: 'Flugmodus und Handy: Was die EU-Verordnung zu Mobilfunk an Bord festlegt.',
      hashtags: ['#flugmodus', '#mobilfunk', '#luftfahrt', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
