import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · was ein Ladezyklus wirklich ist.
 *
 * **Szenario 2, zweites Beispiel: Watti fragt um Rat.** Volti antwortet **und
 * raet** — das ist die Bedingung der Form, und der Rat steht hier im
 * Nachschlag: „Steck ihn an, wenn er leer ist. Sonst nichts."
 *
 * **Der Zyklus ist die Fundstelle, nicht die Folgerung.** Der erste Anlauf
 * liess Volti sagen „Von leer auf voll. Dreimal ein Drittel ist einer." — eine
 * Rechnung, die in keiner Quelle steht. Die Verordnung definiert die
 * `Batterielaufzeit in Zyklen` ueber die **Nennkapazitaet**, und genau das
 * sagt Volti jetzt: gezaehlt wird die Kapazitaet, nicht das Anstecken.
 *
 * **Die Rechnung steht als Rechnung im Bild** — Emirhans Befund vom
 * Powerbank-Dialog: *„Hier in den Untertiteln eine Art Rechnung, damit
 * Zuschauer verstehen, was gemeint ist."*
 *
 * **Befund 47 steckt in Wattis zweiter Zeile.** Dort stand „Ich zähle
 * Steckdose. Dreimal Steckdose, dreimal kaputter." — *„ein unfassbar schlimmer
 * Satz. Du wolltest sicherlich witzig sein, aber das ist es echt nicht."* Ein
 * Witz, der auf Pointe gebaut ist und dabei die Antwort verliert, steht neben
 * dem Gespraech. Emirhans Fassung antwortet auf Voltis Vorwurf **und** ist die
 * Pointe: Watti zaehlt genau — nur das Falsche.
 */
export const ladezyklenSteckdose: Short = {
  id: 'ladezyklen-steckdose',
  themaId: 'ladezyklen',
  format: 'gibtswirklich',
  sachgebiet: 'laden',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Akku stirbt 800 Tode',
  weitererzaehlt: '800 Zyklen lang 80 Prozent',
  suchbegriff: 'Ladezyklen Akku',
  kaltstart: {
    art: 'hilferuf',
    satz: 'Mein Akku hält keinen Tag mehr, und ich lade dreimal.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'steckdose' },
  },
  vorspann: 'Wattis Akku stirbt 800 Tode',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, mach ich den Akku kaputt, wenn ich dreimal am Tag lade? Nein, machst du nicht. Du zählst nur das Falsche.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'bitten',
          text: 'Volti, mach ich den Akku kaputt, wenn ich dreimal am Tag lade?',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Nein, machst du nicht. Du zählst nur das Falsche.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'ansprechen',
        gegenueber: { von: 'ruhe', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-oekodesign-handys',
      belegId: 'vollstaendige-zyklen-nennkapazitaet',
      herausgeber: 'Europäische Kommission',
      sprechtext:
        'Ich zähle leider genau, wie schnell mein Akku leer geht. Gezählt werden vollständige Zyklen, Bezugswert ist die Nennkapazität.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'gestaendnis',
          text: 'Ich zähle leider genau, wie schnell mein Akku leer geht.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Gezählt werden vollständige Zyklen, Bezugswert ist die Nennkapazität.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'vollstaendige-zyklen-nennkapazitaet',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'stutzen',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'zahl',
      position: 'zuspitzung',
      wert: '1 Zyklus',
      einheit: '100 % Kapazität',
      bedeutung: 'so misst die Verordnung einen vollständigen Ladezyklus',
      quelleId: 'eu-oekodesign-handys',
      belegId: 'vollstaendige-zyklen-nennkapazitaet',
      sprechtext:
        'Und wenn ich nur ein Drittel lade? Dann ist das kein vollständiger. Du brauchst die ganze Kapazität.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn ich nur ein Drittel lade?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann ist das kein vollständiger. Du brauchst die ganze Kapazität.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'vollstaendige-zyklen-nennkapazitaet',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'zeigen', nach: 'erklaeren' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'die Geräte mindestens 800 Zyklen lang eine Restkapazität von 80 % erreichen',
      quelleId: 'eu-oekodesign-handys',
      belegId: 'achthundert-zyklen-achtzig-prozent',
      sprechtext:
        'Also war ich die ganze Zeit umsonst vorsichtig. Ja. Neue Geräte müssen 800 Zyklen lang 80 Prozent halten.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'ratlosigkeit',
          text: 'Also war ich die ganze Zeit umsonst vorsichtig.',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ja. Neue Geräte müssen 800 Zyklen lang 80 Prozent halten.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'achthundert-zyklen-achtzig-prozent',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-oekodesign-handys',
      belegId: 'achthundert-zyklen-achtzig-prozent',
      sprechtext: '800 Ladezyklen. Und dann ist er hin? Dann hat er noch 80 Prozent. Nicht null.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: '800 Ladezyklen. Und dann ist er hin?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann hat er noch 80 Prozent. Nicht null.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'achthundert-zyklen-achtzig-prozent',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'stutzen',
        gegenueber: { von: 'lesen', nach: 'zeigen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Gezählt wird die Kapazität, nicht die Steckdose.',
      sprechtext:
        'Und was mache ich jetzt? Steck ihn an, wenn er leer ist. Sonst nichts. Nichts machen kann ich. Weiß ich.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was mache ich jetzt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Steck ihn an, wenn er leer ist. Sonst nichts.',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'uebercompliance',
          text: 'Nichts machen kann ich.',
        },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'nebenbemerkung',
          text: 'Weiß ich.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'zeigen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, dass Wattis „ich lade dreimal" gar kein Problem ist – und hört den ersten Satz als das, was er ist: eine Sorge ohne Grund.',
    },
  ],

  quellenIds: ['eu-oekodesign-handys'],

  texte: {
    tiktok: {
      titel: 'Wattis Akku stirbt 800 Tode',
      beschreibung: 'Ladezyklen und Akku: Warum dreimal anstecken nicht dreimal zählt.',
      hashtags: ['#ladezyklen', '#akku', '#handyakku', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Akku stirbt 800 Tode',
      beschreibung: 'Ladezyklen und Akku: Gezählt wird die Kapazität, nicht die Steckdose.',
      hashtags: ['#ladezyklen', '#akku', '#handyakku', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was ein Ladezyklus wirklich ist',
      beschreibung: 'Ladezyklen und Akku: Was die Ökodesign-Verordnung über 800 Zyklen und 80 Prozent schreibt.',
      hashtags: ['#ladezyklen', '#akku', '#oekodesign', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
