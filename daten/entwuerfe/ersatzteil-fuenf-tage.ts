import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · die fünf Arbeitstage, die Volti selbst nicht abwarten
 * wollte.
 *
 * **Szenario 5, drittes Beispiel: Volti wird ertappt.** Er nennt die fuenf
 * Tage als zumutbar und gibt zwei Zeilen spaeter zu, dass sie es ihm nicht
 * waren. Der Konter kostet keine zweite Quelle — Wattis Erinnerung behauptet
 * nichts ueber die Welt, sondern etwas ueber die beiden.
 *
 * **Die Sieben-Jahre-Frist ist absichtlich draussen.** Sie stand im ersten
 * Anlauf als Kipppunkt da und war damit der dritte Short in Folge mit dem Satz
 * „ab dem Tag, an dem das Modell aus dem Verkauf geht" — derselbe Satz aus
 * derselben Verordnung, dreimal. Uebrig bleibt die **Lieferfrist**, und die
 * traegt den Short allein.
 *
 * **Befund 51 steckt im Schluss.** Dort stand „Ich wollte nicht fünf Tage
 * warten." — ein Gestaendnis, das die Frage beantwortet und den Fall
 * schliesst. Emirhans Fassung antwortet gar nicht: *„Großer-Bruder-Kram
 * eben."* Volti beruft sich auf einen Rang statt auf einen Grund.
 */
export const ersatzteilFuenfTage: Short = {
  id: 'ersatzteil-fuenf-tage',
  themaId: 'ersatzteile-vorhalten',
  format: 'absicht',
  sachgebiet: 'recht',
  bauform: 'zitatkarte',
  arbeitstitel: 'Volti predigt und kauft neu',
  weitererzaehlt: 'Fünf Arbeitstage, die ersten fünf Jahre lang',
  suchbegriff: 'Ersatzteil Reparateur',
  kaltstart: {
    art: 'momentdanach',
    satz: 'Das Display ist hin. Dann eben ein neues Handy.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'schraubenschluessel' },
  },
  vorspann: 'Volti predigt und kauft neu',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, wegen eines Displays wirft man kein Handy weg, du Idiot. Und wer baut mir eins ein?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'widersprechen',
          text: 'Watti, wegen eines Displays wirft man kein Handy weg, du Idiot.',
        },
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'rueckfrage', text: 'Und wer baut mir eins ein?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'achselzucken',
        gegenueber: { von: 'ruhe', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-oekodesign-handys',
      belegId: 'displaybaugruppe-endnutzer',
      herausgeber: 'Europäische Kommission',
      sprechtext:
        'Ein Reparateur. Der Hersteller muss ihm das Ersatzteil geben. Muss er? Muss er. Akku, Rückwand, Display — steht als Liste drin.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ein Reparateur. Der Hersteller muss ihm das Ersatzteil geben.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'sieben-jahre-ersatzteile',
          // Die Displaybaugruppe steht nicht unter Buchstabe a, sondern unter b.
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Muss er?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Muss er. Akku, Rückwand, Display — steht als Liste drin.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'displaybaugruppe-endnutzer',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'achselzucken',
        nach: 'stutzen',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'während der ersten fünf Jahre … Ersatzteile innerhalb von fünf Arbeitstagen',
      quelleId: 'eu-oekodesign-handys',
      belegId: 'fuenf-arbeitstage-lieferung',
      sprechtext:
        'Und wie lange warte ich? Fünf Arbeitstage, die ersten fünf Jahre lang. Fünf Tage ohne Handy. Fünf Tage ohne Handy oder ein neues für 900. Such dir was aus.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wie lange warte ich?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Fünf Arbeitstage, die ersten fünf Jahre lang.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'fuenf-arbeitstage-lieferung',
        },
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'katastrophe', text: 'Fünf Tage ohne Handy.' },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'widerhaken',
          text: 'Fünf Tage ohne Handy oder ein neues für 900. Such dir was aus.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'staunen',
        gegenueber: { von: 'zeigen', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext:
        'Sag mal, was war letztes Jahr mit deinem? Wie, mit meinem? Der Akku war hin und du standst am nächsten Tag mit einem neuen da.',
      rede: [
        { sprecher: 'zeiger', zug: 'abbiegen', text: 'Sag mal, was war letztes Jahr mit deinem?' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wie, mit meinem?' },
        {
          sprecher: 'zeiger',
          zug: 'erinnern',
          text: 'Der Akku war hin und du standst am nächsten Tag mit einem neuen da.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'ansprechen',
        gegenueber: { von: 'lesen', nach: 'stutzen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'In den ersten fünf Jahren liefert der Hersteller in fünf Arbeitstagen.',
      sprechtext: 'Das war was anderes. Was denn? Großer-Bruder-Kram eben.',
      rede: [
        { sprecher: 'nachleser', zug: 'umdeuten', text: 'Das war was anderes.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Was denn?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'banaleaufloesung',
          text: 'Großer-Bruder-Kram eben.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'nachdenken',
        gegenueber: { von: 'stutzen', nach: 'ruhe' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, dass Volti selbst nicht gewartet hat – und sein „wegen eines Displays wirft man kein Handy weg" klingt anders.',
    },
  ],

  quellenIds: ['eu-oekodesign-handys'],

  texte: {
    tiktok: {
      titel: 'Volti predigt und kauft neu',
      beschreibung: 'Ersatzteil und Reparateur: In welcher Frist der Hersteller liefern muss.',
      hashtags: ['#ersatzteil', '#reparatur', '#rechtaufreparatur', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Volti predigt und kauft neu',
      beschreibung: 'Ersatzteil und Reparateur: Fünf Arbeitstage, und das steht so in der Verordnung.',
      hashtags: ['#ersatzteil', '#reparatur', '#displayschaden', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Fünf Arbeitstage für ein Ersatzteil',
      beschreibung: 'Ersatzteil und Reparateur: Was die Ökodesign-Verordnung über Lieferfristen schreibt.',
      hashtags: ['#ersatzteil', '#reparatur', '#oekodesign', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
