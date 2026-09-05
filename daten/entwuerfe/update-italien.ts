import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · das Update, das für ein anderes Gerät gebaut war.
 *
 * **Szenario 8, zweites Beispiel: Der Rückfall.** Watti versteht alles und
 * hat das Update waehrend des Gespraechs installiert — genau wie er es im
 * Kaltstart angekuendigt hat. „Ups, ist schon geladen." fuehrt zurueck auf
 * „Sofort drauf, das mache ich immer so."
 *
 * **Hier fallen zum ersten Mal Herstellernamen im Video.** `ZUBEHOERMARKEN`
 * verbietet sie beim Zubehoer; Geraetehersteller stehen bewusst nicht in der
 * Liste, und die Zitatkarte nennt Apple ohnehin, weil die Behoerde es tut.
 * Emirhans Entscheidung dazu: *„Ja, die Behörde nennt sie auch."*
 *
 * **Die Pressemitteilung gibt es auf Englisch** — dieselbe Behoerde, dieselbe
 * Sache, nur lesbar. Die italienische Fassung waere die naheliegende Quelle
 * gewesen und haette eine Karte ergeben, die niemand versteht.
 *
 * **Befund 54 steckt in Voltis Italien-Zeile.** Dort stand „Da war mal was in
 * Italien." — *„Nach wie vor fehlen manchmal einfach die Informationen in den
 * Aussagen, die den Kontext besser erschließen können."* Ich kuerze, bis nur
 * das Stichwort uebrig ist, und halte das fuer knapp. Es ist aber
 * unvollstaendig. Dasselbe im Kaltstart: „Update" allein nennt den Gegenstand
 * nicht, „Handyupdate" tut es.
 */
export const updateItalien: Short = {
  id: 'update-italien',
  themaId: 'gedrosselte-alte-handys',
  format: 'absicht',
  sachgebiet: 'handy',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Handy altert schneller',
  weitererzaehlt: 'die Geräte wurden danach schneller ersetzt',
  suchbegriff: 'Handyupdate langsamer',
  kaltstart: {
    art: 'imvollzug',
    satz: 'Neues Handyupdate ist da. Sofort drauf, das mache ich immer so.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'uhr' },
  },
  vorspann: 'Wattis Handy altert schneller',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Warte. Gib mal her. Wieso denn, ist doch neu? Weil so ein Handyupdate dein Handy langsamer machen kann, du Idiot.',
      rede: [
        { sprecher: 'nachleser', zug: 'bitten', text: 'Warte. Gib mal her.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Wieso denn, ist doch neu?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Weil so ein Handyupdate dein Handy langsamer machen kann, du Idiot.',
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
      quelleId: 'agcm-updates-strafe',
      belegId: 'apple-und-samsung-bestraft',
      herausgeber: 'Autorità Garante della Concorrenza e del Mercato',
      sprechtext:
        'Dann ist es eben alt. Oder das Update war für das nächste Modell gebaut, nicht für deins. Wie soll ein Update mein Handy langsamer machen? Das war mal in Italien der Fall. Zwei Hersteller hatten das mal gemacht.',
      rede: [
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'rechtfertigung', text: 'Dann ist es eben alt.' },
        {
          sprecher: 'nachleser',
          zug: 'widersprechen',
          text: 'Oder das Update war für das nächste Modell gebaut, nicht für deins.',
          quelleId: 'agcm-updates-strafe',
          belegId: 'optimized-for-next-model',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Wie soll ein Update mein Handy langsamer machen?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Das war mal in Italien der Fall. Zwei Hersteller hatten das mal gemacht.',
          quelleId: 'agcm-updates-strafe',
          belegId: 'apple-und-samsung-bestraft',
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
      position: 'zuspitzung',
      quelleId: 'agcm-updates-strafe',
      belegId: 'apple-und-samsung-bestraft',
      sprechtext:
        'Watt? Und dann haben sie ihre Strafe bekommen. Wer denn? Apple und Samsung haben beide die Strafe erhalten.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Watt?' },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Und dann haben sie ihre Strafe bekommen.',
          quelleId: 'agcm-updates-strafe',
          belegId: 'apple-und-samsung-bestraft',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Wer denn?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Apple und Samsung haben beide die Strafe erhalten.',
          quelleId: 'agcm-updates-strafe',
          belegId: 'apple-und-samsung-bestraft',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'achselzucken',
        nach: 'staunen',
        gegenueber: { von: 'zeigen', nach: 'erklaeren' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'a new update (iOS 10.2.1), without warning consumers … could reduce the speed',
      quelleId: 'agcm-updates-strafe',
      belegId: 'apple-update-ohne-warnung',
      sprechtext:
        'Die haben Strafe gezahlt für ein Update? Für eins, das einige Geräte langsamer machen konnte, ohne es zu sagen.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Die haben Strafe gezahlt für ein Update?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Für eins, das einige Geräte langsamer machen konnte, ohne es zu sagen.',
          quelleId: 'agcm-updates-strafe',
          belegId: 'apple-update-ohne-warnung',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'lesen',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'agcm-updates-strafe',
      belegId: 'speeding-up-replacement',
      sprechtext:
        'Also wollten die, dass ich ein neues kaufe? Die Behörde schreibt, die Geräte wurden danach schneller ersetzt.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'falscherschluss',
          text: 'Also wollten die, dass ich ein neues kaufe?',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die Behörde schreibt, die Geräte wurden danach schneller ersetzt.',
          quelleId: 'agcm-updates-strafe',
          belegId: 'speeding-up-replacement',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'lesen',
        nach: 'nachdenken',
        gegenueber: { von: 'zeigen', nach: 'ansprechen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Ein Update kann für das nächste Modell gebaut sein, nicht für deins.',
      sprechtext: 'Und was mache ich jetzt? Erst lesen, was drinsteht. Ups, ist schon geladen.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was mache ich jetzt?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Erst lesen, was drinsteht.' },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'gestaendnis',
          text: 'Ups, ist schon geladen.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'ruhe',
        gegenueber: { von: 'ansprechen', nach: 'stutzen' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, dass Watti schon beim ersten Satz auf Installieren gedrückt hat – „sofort drauf" ist keine Ankündigung, sondern eine Feststellung.',
    },
  ],

  quellenIds: ['agcm-updates-strafe'],

  texte: {
    tiktok: {
      titel: 'Wattis Handy altert schneller',
      beschreibung: 'Handyupdate und langsamer: Was zwei Hersteller in Italien gekostet hat.',
      hashtags: ['#update', '#handy', '#drosselung', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Handy altert schneller',
      beschreibung: 'Handyupdate und langsamer: Eine Wettbewerbsbehörde hat es untersucht und bestraft.',
      hashtags: ['#update', '#handy', '#smartphone', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Das Update für ein anderes Handy',
      beschreibung: 'Handyupdate und langsamer: Was die italienische Wettbewerbsbehörde festgestellt hat.',
      hashtags: ['#update', '#handy', '#verbraucherschutz', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
