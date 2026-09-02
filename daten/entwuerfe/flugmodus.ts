import type { Short } from '../../src/typen';

/**
 * Es war einmal · der Flugmodus und das Netz am Boden.
 *
 * **Emirhans ueberarbeitete Fassung vom 02.09.2026.** Sie steht — vermutlich
 * durch ein verrutschtes Einfuegen — in `daten/briefings/fremdes-ladekabel.md`
 * und nicht in `flugmodus.md`, wo seine erste Fassung und meine gekuerzte
 * liegen. Meine Fassung `flugmodus-ansage` vom 03.09. ist geloescht.
 *
 * ## Warum seine Fassung besser ist
 *
 * **Sie spielt im Flugzeug beim Start.** Meine spielte in einem Gespraech
 * ueber eine Ansage — ein Bericht ueber eine Lage statt der Lage. Und der
 * Schluss ist seiner: „Oh Ja klar! Fuer die Leute da unten!" Watti hat nichts
 * verstanden und ist trotzdem zufrieden.
 *
 * ## Die zwei Zeilen, die ich aendern musste
 *
 * Hier stand: „Dein Handy sieht da oben hunderte Funkmasten. Und meldet sich
 * bei allen an." und „Damit die Leute unten noch Empfang haben, du Idiot. Du
 * stoerst somit das Internet der Leute unter dir."
 *
 * **Der Durchfuehrungsbeschluss gibt das nicht her**, und zwar dreifach: Er
 * nennt keinen Grund, das Wort „Funkzelle" kommt darin nicht vor, und
 * Erwaegungsgrund 7 sagt ausdruecklich, dass **keine** funktechnischen
 * Stoerungen festgestellt wurden, die von Geraeten an Bord verursacht worden
 * waeren.
 *
 * **Die Falle steht in seinem eigenen Briefingbogen:** „Sie sagt nicht, dass
 * Telefone nie gestoert haben." Ich hatte denselben Satz am 03.09. in meiner
 * eigenen Fassung stehen, und der `belegpruefer` hat ihn dort gestrichen.
 *
 * Geaendert ist deshalb nur, **wer** die Folgerung zieht: Volti sagt, was
 * verlangt wird, und gibt zu, dass der Grund nicht dabeisteht. Wattis
 * Schlusszeile bleibt woertlich — und wird dadurch besser, weil sie jetzt sein
 * Irrtum ist und nicht Voltis Behauptung.
 */
export const flugmodus: Short = {
  id: 'flugmodus',
  themaId: 'flugmodus-herkunft',
  format: 'eswareinmal',
  sachgebiet: 'netz',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti rettet das Flugzeug',
  weitererzaehlt: 'Netz an Bord ist längst geregelt',
  suchbegriff: 'Flugmodus Flugzeug',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Flugmodus an, Volti! Wir heben gleich ab.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'flugzeug' },
  },
  vorspann: 'Watti rettet das Flugzeug',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Volti, ich hör die Turbinen schon. Watti, chill. Meiner ist längst aus.',
      rede: [
        { sprecher: 'zeiger', zug: 'behaupten', text: 'Volti, ich hör die Turbinen schon.' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Watti, chill. Meiner ist längst aus.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'ansprechen',
        gegenueber: { von: 'ruhe', nach: 'achselzucken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'terrestrischen-umts-mobilfunknetzen',
      herausgeber: 'Europäische Union',
      sprechtext:
        'Gut, denn sonst stören wir die Bordelektronik. Und dann stürzen wir ab. Wir stören keinen Piloten. Wozu gibt es den Flugmodus denn sonst? Nicht wegen dem Netz im Flugzeug. Sondern wegen dem am Boden.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'nachlegen',
          machart: 'katastrophe',
          text: 'Gut, denn sonst stören wir die Bordelektronik. Und dann stürzen wir ab.',
        },
        { sprecher: 'nachleser', zug: 'widersprechen', text: 'Wir stören keinen Piloten.' },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'rueckfrage',
          text: 'Wozu gibt es den Flugmodus denn sonst?',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Nicht wegen dem Netz im Flugzeug. Sondern wegen dem am Boden.',
          quelleId: 'eu-mca-5g-an-bord',
          belegId: 'terrestrischen-umts-mobilfunknetzen',
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
       * **Die geaenderte Stelle.** Statt „Dein Handy sieht da oben hunderte
       * Funkmasten. Und meldet sich bei allen an." steht hier, was der
       * Beschluss wirklich sagt — und Voltis Eingestaendnis, dass der Grund
       * nicht dabeisteht.
       */
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'versuchen, sich bei terrestrischen UMTS-Mobilfunknetzen anzumelden',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'terrestrischen-umts-mobilfunknetzen',
      sprechtext:
        'Watt? Dein Handy versucht da oben, sich bei den Netzen am Boden anzumelden. Und an Bord muss etwas das verhindern. Ach, damit ich nicht im falschen Netz lande? Warum, steht da nicht.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Watt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dein Handy versucht da oben, sich bei den Netzen am Boden anzumelden.',
          quelleId: 'eu-mca-5g-an-bord',
          belegId: 'terrestrischen-umts-mobilfunknetzen',
        },
        { sprecher: 'nachleser', zug: 'nachlegen', text: 'Und an Bord muss etwas das verhindern.' },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'falscherschluss',
          text: 'Ach, damit ich nicht im falschen Netz lande?',
        },
        { sprecher: 'nachleser', zug: 'einschraenken', text: 'Warum, steht da nicht.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      /*
       * **Der Kipppunkt eines Maerchens ist das „und heute".** Hier ist es das
       * „ist laengst geregelt": Aus dem Verbot ist eine Ausstattung geworden.
       */
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'hinzufuegen-der-5g-netzanbindung',
      sprechtext:
        'Ich rette also gar nicht das Flugzeug? Du rettest gar nichts, du Idiot. Netz an Bord ist längst geregelt, und das bis 5G.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Ich rette also gar nicht das Flugzeug?' },
        { sprecher: 'nachleser', zug: 'beantworten', machart: 'nebenbemerkung', text: 'Du rettest gar nichts, du Idiot.' },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Netz an Bord ist längst geregelt, und das bis 5G.',
          quelleId: 'eu-mca-5g-an-bord',
          belegId: 'hinzufuegen-der-5g-netzanbindung',
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
      /*
       * **Wattis Schlusszeile bleibt woertlich.** Sie ist jetzt sein Irrtum
       * und nicht Voltis Behauptung — Volti hat nie gesagt, dass er jemandem
       * unten hilft. Damit traegt sie mehr als vorher.
       */
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Der Flugmodus hält das Handy von den Netzen am Boden fern.',
      sprechtext:
        'Ohh, also kann ich weiter in Ruhe Anime streamen? Du hast sie vorhin schon runtergeladen. Schau offline du Idiot. Oh ja klar! Für die Leute da unten!',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'themenwechsel',
          text: 'Ohh, also kann ich weiter in Ruhe Anime streamen?',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Du hast sie vorhin schon runtergeladen. Schau offline du Idiot.',
        },
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'uebercompliance', text: 'Oh ja klar! Für die Leute da unten!' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'zeigen',
        gegenueber: { von: 'erklaeren', nach: 'achselzucken' },
      },
      rundlauf:
        'Beim zweiten Sehen ist Wattis Kommando am Anfang doppelt komisch: Er befiehlt Volti etwas, das der längst getan hat, und aus einem Grund, den es nicht gibt.',
    },
  ],

  quellenIds: ['eu-mca-5g-an-bord'],

  texte: {
    tiktok: {
      titel: 'Watti rettet das Flugzeug',
      beschreibung: 'Flugmodus im Flugzeug: Wovon er das Handy wirklich fernhält.',
      hashtags: ['#flugmodus', '#fliegen', '#mobilfunk', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti rettet das Flugzeug',
      beschreibung: 'Flugmodus im Flugzeug. Nicht das Cockpit ist gemeint, sondern das Netz am Boden.',
      hashtags: ['#flugmodus', '#fliegen', '#handy', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was der Flugmodus im Flugzeug wirklich soll',
      beschreibung: 'Flugmodus und Flugzeug: Was die EU-Verordnung zu Mobilfunk an Bord festlegt.',
      hashtags: ['#flugmodus', '#mobilfunk', '#luftfahrt', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
