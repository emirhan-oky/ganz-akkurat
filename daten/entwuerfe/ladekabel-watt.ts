import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · die Wattzahl steht auf dem Kabel.
 *
 * **Szenario 4, vierte Bauart: Watti hatte aus Versehen recht.** Sein Kabel
 * ist wirklich das schnellere — nur nicht aus dem Grund, den er nennt. Beide
 * Seiten uebersehen etwas, und genau das verlangt `werhatrecht`.
 *
 * **Keine Zitatkarte.** Das Zitat des USB Implementers Forum ist englisch, und
 * eine Karte, die der Zuschauer nicht liest, ist ein Bild ohne Inhalt. Die
 * Quelle steht in der Beschreibung, wie bei jedem Short — Befund 37: **Die
 * Karte ist optional, die Quelle nicht.**
 *
 * **Zahlen als Ziffer, mit Einheit und Richtung** (Befunde 19 und 20): „60
 * Watt oder 240 Watt, und mehr Watt heisst schneller voll." Ausgeschrieben
 * wurde „zweihundertvierzig" im ersten Anlauf als „zweiundvierzig" gelesen.
 */
export const ladekabelWatt: Short = {
  id: 'ladekabel-watt',
  themaId: 'ladekabel-watt',
  format: 'werhatrecht',
  sachgebiet: 'laden',
  bauform: 'wechselrede',
  arbeitstitel: 'Auf Wattis Kabel steht die Antwort',
  weitererzaehlt: 'mehr Watt heißt schneller voll',
  suchbegriff: 'Ladekabel Watt',
  kaltstart: {
    art: 'stolzerfehler',
    satz: 'Mein neues Ladekabel war teuer, und man merkt es sofort.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'kabel' },
  },
  vorspann: 'Wattis Kabel und die Zahl darauf',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Was hat dich das Kabel denn gekostet? Egal was es gekostet hat, es lädt doppelt so schnell wie mein altes.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Was hat dich das Kabel denn gekostet?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Egal was es gekostet hat, es lädt doppelt so schnell wie mein altes.',
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
      quelleId: 'usbif-kabel-kennzeichnung',
      belegId: 'the-policy-now-extends',
      herausgeber: 'USB Implementers Forum',
      sprechtext:
        'Und du glaubst, das liegt am Preis? Klar, teuer ist besser, das weiß doch jedes Kind. Auf jedem dieser Kabel steht drauf, wie viel Leistung es kann.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und du glaubst, das liegt am Preis?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscheautoritaet',
          text: 'Klar, teuer ist besser, das weiß doch jedes Kind.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Auf jedem dieser Kabel steht drauf, wie viel Leistung es kann.',
          quelleId: 'usbif-kabel-kennzeichnung',
          belegId: 'the-policy-now-extends',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'usbif-kabel-kennzeichnung',
      belegId: 'must-be-labelled-with',
      sprechtext:
        'Auf meinem steht was drauf? Da stehen 60 Watt oder 240 Watt, und mehr Watt heißt schneller voll.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Auf meinem steht was drauf?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Da stehen 60 Watt oder 240 Watt, und mehr Watt heißt schneller voll.',
          quelleId: 'usbif-kabel-kennzeichnung',
          belegId: 'must-be-labelled-with',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'staunen', nach: 'lesen' },
      },
    },
    {
      /*
       * **Der Kipppunkt ist Voltis Nachsehen.** Er sucht die Zahl, findet sie
       * und muss zugeben, dass Watti recht hat — aus dem falschen Grund. Der
       * Satz „Ja gut, deins ist wirklich das schnelle." ist widerwilliges
       * Nachgeben, kein Einsehen (Befund 30).
       */
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'usbif-kabel-kennzeichnung',
      belegId: 'must-be-labelled-with',
      sprechtext:
        'Und was steht dann auf meinem? Guck ich nach. 240. Ja gut, deins ist wirklich das schnelle. Sag ich doch, teuer ist besser.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was steht dann auf meinem?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Guck ich nach. 240. Ja gut, deins ist wirklich das schnelle.',
          quelleId: 'usbif-kabel-kennzeichnung',
          belegId: 'must-be-labelled-with',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'falscherschluss',
          text: 'Sag ich doch, teuer ist besser.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'lesen',
        gegenueber: { von: 'lesen', nach: 'staunen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Die Zahl steht auf dem Kabel, nicht auf dem Preisschild.',
      sprechtext: 'Teuer war Zufall, die Zahl war der Grund du Idiot. Meine Zahl, mein Kabel, mein Sieg.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          machart: 'parallelbau',
          text: 'Teuer war Zufall, die Zahl war der Grund du Idiot.',
        },
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'umdeutung', text: 'Meine Zahl, mein Kabel, mein Sieg.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'lesen',
        nach: 'ansprechen',
        gegenueber: { von: 'staunen', nach: 'zeigen' },
      },
      rundlauf:
        'Beim zweiten Sehen hört man, dass Watti von Anfang an recht hat – und dass er den Grund dafür bis zum Schluss nicht kennt.',
    },
  ],

  quellenIds: ['usbif-kabel-kennzeichnung'],

  texte: {
    tiktok: {
      titel: 'Auf Wattis Kabel steht die Antwort',
      beschreibung: 'Ladekabel und Watt: Die Zahl auf dem Stecker sagt, wie schnell es lädt.',
      hashtags: ['#ladekabel', '#usbc', '#technik', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Auf Wattis Kabel steht die Antwort',
      beschreibung: 'Ladekabel mit 60 oder 240 Watt. Der Preis sagt darüber nichts.',
      hashtags: ['#ladekabel', '#usbc', '#laden', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Warum Wattis teures Ladekabel wirklich schneller lädt',
      beschreibung: 'Ladekabel und Watt: Was das USB Implementers Forum zur Kennzeichnung vorschreibt.',
      hashtags: ['#ladekabel', '#usbc', '#schnellladen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
