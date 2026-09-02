import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · der Zettel im Treppenhaus und das 2,4-GHz-Band.
 *
 * **Szenario 5: Volti wird ertappt.** Er hat den Zettel selbst aufgehaengt,
 * und er weiss besser als jeder, dass auf diesem Band niemand Vorrang hat.
 * Befund 32: Er ist bei Technik ueberlegen, im Umgang mit Menschen nicht.
 *
 * **Wer etwas getan hat, macht es auch wieder gut** (Befund 7). Der erste
 * Anlauf liess Watti den Zettel abnehmen, und Emirhans Frage dazu war die
 * kuerzestmoegliche: „Wieso soll jetzt Watti den Zettel abnehmen?"
 *
 * **Und der Schluss ist Wattis Lob**, woertlich von Emirhan: „Das ist mein
 * grosser Bruder." Befund 33 — er darf Volti loben, und das ist die waermste
 * Stelle im ganzen Pool.
 */
export const zettelImTreppenhaus: Short = {
  id: 'zettel-im-treppenhaus',
  themaId: 'zettel-im-treppenhaus',
  format: 'werhatrecht',
  sachgebiet: 'netz',
  bauform: 'zitatkarte',
  arbeitstitel: 'Voltis Zettel bringt gar nichts',
  weitererzaehlt: 'garantiert wird dir da gar nichts',
  suchbegriff: 'WLAN Nachbarn',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Im Treppenhaus hängt ein Zettel wegen dem WLAN.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'zettel' },
  },
  vorspann: 'Voltis Zettel und die Nachbarn',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Volti, hast du den Zettel im Treppenhaus aufgehängt? Welchen Zettel?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Volti, hast du den Zettel im Treppenhaus aufgehängt?' },
        { sprecher: 'nachleser', zug: 'abbiegen', text: 'Welchen Zettel?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bnetza-wlan-24ghz-allgemeinzuteilung',
      belegId: 'die-bundesnetzagentur-u-bernimmt',
      sprechtext:
        'Den, auf dem steht, die Nachbarn sollen ihr WLAN runterdrehen. Das war ich, ja. Abends geht bei uns hier nichts mehr, und das nervt.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Den, auf dem steht, die Nachbarn sollen ihr WLAN runterdrehen.',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'gestaendnis',
          text: 'Das war ich, ja. Abends geht bei uns hier nichts mehr, und das nervt.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'zeigen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'Es besteht kein Schutz vor Beeinträchtigungen durch andere',
      quelleId: 'bnetza-wlan-24ghz-allgemeinzuteilung',
      belegId: 'es-besteht-kein-schutz',
      herausgeber: 'Bundesnetzagentur',
      sprechtext:
        'Und du bist der, der mir das mit dem Funk erklärt hat. Weil es stimmt. Auf dem Band hat keiner Vorrang, und garantiert wird dir da gar nichts.',
      rede: [
        { sprecher: 'zeiger', zug: 'erinnern', text: 'Und du bist der, der mir das mit dem Funk erklärt hat.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Weil es stimmt. Auf dem Band hat keiner Vorrang, und garantiert wird dir da gar nichts.',
          quelleId: 'bnetza-wlan-24ghz-allgemeinzuteilung',
          belegId: 'es-besteht-kein-schutz',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'lesen',
        gegenueber: { von: 'stutzen', nach: 'erklaeren' },
      },
    },
    {
      /*
       * **Der Kipppunkt braucht keine Quelle**, weil keine seiner Zeilen etwas
       * ueber die Welt behauptet: Watti zieht die Folgerung aus dem, was Volti
       * gerade selbst gesagt hat, und Volti gibt zu, dass er sauer war.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext:
        'Also steht auf deinem Zettel eine Bitte, auf die niemand hören muss. Ich war abends sauer, ja? Du hast mich letzte Woche einen Idioten genannt für weniger.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          text: 'Also steht auf deinem Zettel eine Bitte, auf die niemand hören muss.',
        },
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Ich war abends sauer, ja?' },
        { sprecher: 'zeiger', zug: 'erinnern', text: 'Du hast mich letzte Woche einen Idioten genannt für weniger.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'lesen',
        nach: 'ansprechen',
        gegenueber: { von: 'erklaeren', nach: 'nachdenken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Auf dem Band hat keiner Vorrang.',
      sprechtext: 'Ich nehme den Zettel nachher wieder ab. Das ist mein großer Bruder.',
      rede: [
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Ich nehme den Zettel nachher wieder ab.' },
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'menschenvergleich', text: 'Das ist mein großer Bruder.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'ruhe',
        gegenueber: { von: 'nachdenken', nach: 'achselzucken' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, wer den Zettel aufgehängt hat – und Wattis erste Frage klingt nicht mehr neugierig, sondern wie ein Verhör.',
    },
  ],

  quellenIds: ['bnetza-wlan-24ghz-allgemeinzuteilung'],

  texte: {
    tiktok: {
      titel: 'Voltis Zettel bringt gar nichts',
      beschreibung: 'WLAN und Nachbarn im 2,4-GHz-Band: Warum niemand dort Vorrang hat.',
      hashtags: ['#wlan', '#nachbarn', '#funk', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Voltis Zettel bringt gar nichts',
      beschreibung: 'WLAN langsam, Nachbarn schuld? Auf dem Band gibt es keine Garantie.',
      hashtags: ['#wlan', '#nachbarn', '#internet', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Warum Voltis Zettel im Treppenhaus nichts bringt',
      beschreibung: 'WLAN und Nachbarn: Was die Bundesnetzagentur zum 2,4-GHz-Band festgelegt hat.',
      hashtags: ['#wlan', '#bundesnetzagentur', '#funk', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
