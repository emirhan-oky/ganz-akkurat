import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · aus einer Wahlmöglichkeit wird im Weitererzählen ein
 * Verbot.
 *
 * **Szenario 11, zweites Beispiel: Watti erzählt es falsch weiter.** Und er
 * tut es am Ende noch einmal — „Das sage ich ihm genauso." Der Nachbar ist der
 * Dritte, aber anders als der Vater in `akku-ganz-leer`: Dort war der Dritte
 * die Autoritaet, hier ist er die Quelle des Irrtums.
 *
 * **Die Verordnung sagt genau das Gegenteil des Weitererzaehlten.** Sie
 * verlangt eine „vom Nutzer waehlbare **optionale** Ladefunktion" — es gibt
 * kein Verbot, voll zu laden. Aus einer Wahlmoeglichkeit wird beim
 * Weitererzaehlen eine Vorschrift, und das ist die Form dieses Szenarios in
 * ihrer reinsten Gestalt.
 *
 * **`exif-im-foto` waere das geplante Thema gewesen** und ist gefallen:
 * `urlaubsfoto` deckt die Metadaten bereits vollstaendig ab. Ein zweiter Short
 * zum selben Gegenstand ist die Wiederholung, die die Wache meldet.
 */
export const achtzigProzentNachbar: Short = {
  id: 'achtzig-prozent-nachbar',
  themaId: 'ladegeraet-nicht-im-karton',
  format: 'absicht',
  sachgebiet: 'laden',
  bauform: 'zitatkarte',
  arbeitstitel: 'Der Nachbar weiß es besser',
  weitererzaehlt: 'Da steht, dass es die Funktion geben muss',
  suchbegriff: 'Handy laden 80 Prozent',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Ich habe gehört, neue Handys laden gar nicht mehr voll.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'nachbarhaeuser' },
  },
  vorspann: 'Der Nachbar weiß es besser',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Wer erzählt denn so was? Der von nebenan. Die EU hat neuen Handys das Vollladen verboten.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wer erzählt denn so was?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscheautoritaet',
          text: 'Der von nebenan. Die EU hat neuen Handys das Vollladen verboten.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'zeigen',
        gegenueber: { von: 'ruhe', nach: 'erklaeren' },
      },
    },
    {
      art: 'zahl',
      position: 'zuspitzung',
      wert: '80',
      einheit: '%',
      bedeutung: 'dort endet die optionale Ladefunktion',
      quelleId: 'eu-oekodesign-handys',
      belegId: 'optionale-ladefunktion-achtzig',
      sprechtext:
        'Verboten hat die niemand was. Doch, bei 80 Prozent ist Schluss. Der hat es mir genau erklärt.',
      rede: [
        { sprecher: 'nachleser', zug: 'widersprechen', text: 'Verboten hat die niemand was.' },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'rechtfertigung',
          text: 'Doch, bei 80 Prozent ist Schluss. Der hat es mir genau erklärt.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'erklaeren', nach: 'stutzen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'eine vom Nutzer wählbare optionale Ladefunktion aufweisen, die den Ladevorgang automatisch beendet',
      quelleId: 'eu-oekodesign-handys',
      belegId: 'optionale-ladefunktion-achtzig',
      herausgeber: 'Europäische Kommission',
      sprechtext:
        'Da steht, dass es die Funktion geben muss. Nicht, dass sie an ist. Also kann ich sie anmachen? Du kannst. Du musst nicht.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Da steht, dass es die Funktion geben muss. Nicht, dass sie an ist.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'optionale-ladefunktion-achtzig',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Also kann ich sie anmachen?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Du kannst. Du musst nicht.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'optionale-ladefunktion-achtzig',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'erklaeren',
        nach: 'staunen',
        gegenueber: { von: 'stutzen', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-oekodesign-handys',
      belegId: 'nutzer-wird-informiert',
      sprechtext:
        'Und warum sollte ich? Weil dein Handy dir beim ersten Laden sagt, dass der Akku dann länger halten kann. Das sagt es mir? Muss es sogar. Steht auch da drin.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und warum sollte ich?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Weil dein Handy dir beim ersten Laden sagt, dass der Akku dann länger halten kann.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'nutzer-wird-informiert',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Das sagt es mir?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Muss es sogar. Steht auch da drin.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'nutzer-wird-informiert',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'zeigen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Die Funktion muss es geben. Anschalten muss sie niemand.',
      sprechtext:
        'Und was erzähle ich jetzt dem von nebenan? Dass er zuhören soll, bevor er weitererzählt. Das sage ich ihm genauso.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was erzähle ich jetzt dem von nebenan?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dass er zuhören soll, bevor er weitererzählt.',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'uebercompliance',
          text: 'Das sage ich ihm genauso.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'ansprechen',
        gegenueber: { von: 'zeigen', nach: 'achselzucken' },
      },
      rundlauf:
        'Beim zweiten Sehen ist Wattis „ich habe gehört" der eigentliche Fehler – und am Ende gibt er es genauso weiter.',
    },
  ],

  quellenIds: ['eu-oekodesign-handys'],

  texte: {
    tiktok: {
      titel: 'Der Nachbar weiß es besser',
      beschreibung: 'Handy laden 80 Prozent: Was die EU wirklich verlangt – und was nicht.',
      hashtags: ['#akku', '#laden', '#handyakku', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Der Nachbar weiß es besser',
      beschreibung: 'Handy laden 80 Prozent: Die Funktion muss es geben. Anschalten muss sie niemand.',
      hashtags: ['#akku', '#laden', '#akkupflege', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was die EU beim Laden wirklich verlangt',
      beschreibung: 'Handy laden 80 Prozent: Was die Ökodesign-Verordnung über die optionale Ladefunktion schreibt.',
      hashtags: ['#akku', '#oekodesign', '#laden', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
