import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · der Beweis für zu langsames Internet, und was er kostet.
 *
 * **Szenario 2, drittes Beispiel: Watti fragt um Rat.** Volti antwortet **und
 * raet** — „Miss." —, und der Rat ist das eigentliche Thema: Das Recht ist da,
 * es haengt nur an einer Messkampagne von 14 Tagen.
 *
 * **Der Rat steht zwischen Bruedern, nicht im Video an den Zuschauer.** Das
 * ist der Unterschied, der `Kein Format verlangt eine Handlung` unberuehrt
 * laesst: Volti sagt es Watti, nicht der Kamera — Befund F aus Emirhans
 * Material („Volti gibt eine Anweisung statt einer Erklaerung").
 *
 * **Und die Zahl ist eine Obergrenze, keine Vorgabe.** Die Bundesnetzagentur
 * schreibt „**maximal** 30 Messungen … innerhalb von 14 Tagen"; „30 in 14
 * Tagen" waere Befund 58 zum fuenften Mal — das Modalwort faellt beim Kuerzen
 * zuerst weg.
 */
export const mobilfunkMesskampagne: Short = {
  id: 'mobilfunk-messkampagne',
  themaId: 'mobilfunk-messung-beweis',
  format: 'absicht',
  sachgebiet: 'netz',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti beweist es 14 Tage lang',
  weitererzaehlt: 'ein Minderungs- oder Sonderkündigungsrecht',
  suchbegriff: 'Internet zu langsam',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Mein Vertrag verspricht 100 Megabit, mein Handy schafft 12.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'kassenbon' },
  },
  vorspann: 'Watti beweist es 14 Tage lang',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Volti, mein Mobilfunkvertrag ist teuer und das Internet zu langsam. Kann ich da was machen? Ja. Du kannst es beweisen.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'bitten',
          text: 'Volti, mein Mobilfunkvertrag ist teuer und das Internet zu langsam. Kann ich da was machen?',
        },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Ja. Du kannst es beweisen.' },
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
      quelleId: 'bnetza-internetgeschwindigkeit',
      belegId: 'verbindliches-nachweisverfahren',
      herausgeber: 'Bundesnetzagentur',
      sprechtext:
        'Wie denn, mit einem Screenshot? Mit einer App vom Amt. Die Bundesnetzagentur stellt ein verbindliches Nachweisverfahren.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Wie denn, mit einem Screenshot?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Mit einer App vom Amt. Die Bundesnetzagentur stellt ein verbindliches Nachweisverfahren.',
          quelleId: 'bnetza-internetgeschwindigkeit',
          belegId: 'verbindliches-nachweisverfahren',
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
      zitat: 'dann haben Sie gegenüber Ihrem Anbieter ein Minderungs- oder Sonderkündigungsrecht',
      quelleId: 'bnetza-internetgeschwindigkeit',
      belegId: 'minderungs-oder-sonderkuendigungsrecht',
      sprechtext:
        'Und dann? Dann hast du ein Minderungs- oder Sonderkündigungsrecht. Einfach so? Du musst das Messprotokoll vorlegen.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und dann?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann hast du ein Minderungs- oder Sonderkündigungsrecht.',
          quelleId: 'bnetza-internetgeschwindigkeit',
          belegId: 'minderungs-oder-sonderkuendigungsrecht',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Einfach so?' },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Du musst das Messprotokoll vorlegen.',
          quelleId: 'bnetza-internetgeschwindigkeit',
          belegId: 'messprotokoll-vorlegen',
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
      art: 'zahl',
      position: 'kipppunkt',
      wert: '30',
      einheit: 'Messungen',
      bedeutung: 'höchstens, verteilt auf 14 Tage und 5 Messtage',
      quelleId: 'bnetza-internetgeschwindigkeit',
      belegId: 'maximal-dreissig-messungen',
      sprechtext:
        'Klingt machbar. Wie viele Messungen? Höchstens 30 in 14 Tagen. An höchstens 5 Messtagen. 30?',
      rede: [
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Klingt machbar. Wie viele Messungen?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Höchstens 30 in 14 Tagen.',
          quelleId: 'bnetza-internetgeschwindigkeit',
          belegId: 'maximal-dreissig-messungen',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'An höchstens 5 Messtagen.',
          quelleId: 'bnetza-internetgeschwindigkeit',
          belegId: 'fuenf-messtage',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'katastrophe', text: '30?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'stutzen',
        gegenueber: { von: 'lesen', nach: 'erklaeren' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Das Recht ist da. Es kostet 14 Tage Messen.',
      sprechtext:
        'Und zwischen der dritten und vierten Messung 3 Stunden Pause. Und was rätst du mir? Miss. Sonst zahlst du weiter für 100 Megabit. Ich messe morgen. Hoffe ich für dich kleiner.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Und zwischen der dritten und vierten Messung 3 Stunden Pause.',
          quelleId: 'bnetza-internetgeschwindigkeit',
          belegId: 'drei-stunden-abstand',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was rätst du mir?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Miss. Sonst zahlst du weiter für 100 Megabit.' },
        { sprecher: 'zeiger', zug: 'einlenken', machart: 'uebercompliance', text: 'Ich messe morgen.' },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'nebenbemerkung',
          text: 'Hoffe ich für dich kleiner.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'achselzucken',
        gegenueber: { von: 'erklaeren', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, dass Wattis „verspricht 100 Megabit, schafft 12" keine Beschwerde ist, sondern der Anfang einer Rechnung, die er nie aufmachen wird.',
    },
  ],

  quellenIds: ['bnetza-internetgeschwindigkeit'],

  texte: {
    tiktok: {
      titel: 'Watti beweist es 14 Tage lang',
      beschreibung: 'Internet zu langsam: Was das Amt anbietet und was es dich kostet.',
      hashtags: ['#mobilfunk', '#internet', '#bundesnetzagentur', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti beweist es 14 Tage lang',
      beschreibung: 'Internet zu langsam: Das Recht ist da, es hängt nur an einer Messkampagne.',
      hashtags: ['#mobilfunk', '#internet', '#verbraucherrechte', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was gegen zu langsames Internet hilft',
      beschreibung: 'Internet zu langsam: Was die Bundesnetzagentur über Nachweisverfahren und Minderung schreibt.',
      hashtags: ['#mobilfunk', '#internet', '#bundesnetzagentur', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
