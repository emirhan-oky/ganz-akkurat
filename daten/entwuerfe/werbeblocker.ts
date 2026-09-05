import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · sieben Werbeblocker machen auffaellig statt unsichtbar.
 *
 * **Szenario 2: Watti fragt um Rat**, und Volti antwortet **und raet**. Die
 * Projektregel „kein Format verlangt eine Handlung" gilt dem Zuschauer, nicht
 * dem Bruder — wer fragt, bekommt eine Antwort. Alles andere waere eine Figur,
 * die einer Regel gehorcht statt einem Menschen.
 *
 * **Der Titel nimmt ein Bild statt des technischen Worts:** „Wattis sieben
 * Waechter verraten ihn", nicht „Blocker". Befund 9.
 *
 * **Eine Zeile ist gegen Emirhans Fassung geaendert, und der Grund gehoert
 * hierher.** Dort stand „Von hundert Leuten hat einer sieben Blocker, und der
 * bist du." — eine Zahl ueber die Welt, fuer die keine Quelle existiert. Der
 * Vergleich mit einem Menschen traegt die Pointe auch ohne sie, und er bleibt
 * damit in ihrer Wohnung statt in einer erfundenen Statistik.
 */
export const werbeblocker: Short = {
  id: 'werbeblocker',
  themaId: 'werbeblocker',
  format: 'werhatrecht',
  sachgebiet: 'netz',
  bauform: 'stationen',
  arbeitstitel: 'Wattis sieben Wächter verraten ihn',
  weitererzaehlt: 'individueller machen',
  suchbegriff: 'Werbeblocker Browser',
  kaltstart: {
    art: 'hilferuf',
    satz: 'Volti, welchen Werbeblocker soll ich noch installieren?',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'ansprechen', requisite: 'browserfenster' },
  },
  vorspann: 'Wattis Wächter und der Browser',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Wie viele Werbeblocker hast du denn schon? Sieben, und ich will nicht dass die mich überall verfolgen.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wie viele Werbeblocker hast du denn schon?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Sieben, und ich will nicht dass die mich überall verfolgen.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'ansprechen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-fingerprints',
      belegId: 'browser-individueller-werden',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Und du glaubst, mit dem achten bist du dann weg? Na klar, je mehr ich blocke, desto weniger sehen die von mir. Falsch herum du Idiot. Ausgerechnet die Dinger dagegen können deinen Browser individueller machen.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und du glaubst, mit dem achten bist du dann weg?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscherschluss',
          text: 'Na klar, je mehr ich blocke, desto weniger sehen die von mir.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Falsch herum du Idiot. Ausgerechnet die Dinger dagegen können deinen Browser individueller machen.',
          quelleId: 'bsi-fingerprints',
          belegId: 'browser-individueller-werden',
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
      quelleId: 'bsi-fingerprints',
      belegId: 'besser-zu-identifizieren-sein',
      sprechtext:
        'Watt? Und damit bist du besser zu identifizieren. Warte, ich mache mich mit den Dingern sichtbarer statt unsichtbar?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Watt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Und damit bist du besser zu identifizieren.',
          quelleId: 'bsi-fingerprints',
          belegId: 'besser-zu-identifizieren-sein',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'rueckfrage',
          text: 'Warte, ich mache mich mit den Dingern sichtbarer statt unsichtbar?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'staunen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-fingerprints',
      belegId: 'fingerprints-mehr-daten-als-cookies',
      sprechtext:
        'Fingerprints greifen auf deutlich mehr Daten zurück als Cookies. Also was jetzt? Von allen, die ich kenne, hat genau einer sieben Blocker. Du.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Fingerprints greifen auf deutlich mehr Daten zurück als Cookies.',
          quelleId: 'bsi-fingerprints',
          belegId: 'fingerprints-mehr-daten-als-cookies',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Also was jetzt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'menschenvergleich',
          text: 'Von allen, die ich kenne, hat genau einer sieben Blocker. Du.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      /*
       * **Der Kipppunkt von `werhatrecht` ist das Dritte, das beide
       * uebersehen.** Wattis Ausweg ist so falsch wie sein Anfang, und das
       * BSI nennt fuer die ganze Sache ein Wort, das keine der beiden Seiten
       * hat: Wettruesten.
       */
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-fingerprints',
      belegId: 'entsteht-ein-wettruesten',
      sprechtext:
        'Dann nehme ich heute Abend einfach alle wieder runter. Dann geht es von vorne los. Das BSI nennt das ein Wettrüsten.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          text: 'Dann nehme ich heute Abend einfach alle wieder runter.',
        },
        {
          sprecher: 'nachleser',
          zug: 'gegenbeispiel',
          text: 'Dann geht es von vorne los. Das BSI nennt das ein Wettrüsten.',
          quelleId: 'bsi-fingerprints',
          belegId: 'entsteht-ein-wettruesten',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'lesen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Ausgerechnet die Dinger dagegen können den Browser individueller machen.',
      sprechtext:
        'Also was soll ich denn jetzt machen? Nimm den einen, den ich auch habe, und lass die anderen sechs weg. Und dann bin ich sicher? Dann bist du so langweilig wie ich, kleiner.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Also was soll ich denn jetzt machen?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Nimm den einen, den ich auch habe, und lass die anderen sechs weg.',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und dann bin ich sicher?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'widerhaken',
          text: 'Dann bist du so langweilig wie ich, kleiner.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'lesen',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
      rundlauf:
        'Beim zweiten Sehen ist die Frage nach dem achten Blocker schon die Antwort: Jeder weitere macht ihn eindeutiger.',
    },
  ],

  quellenIds: ['bsi-fingerprints'],

  texte: {
    tiktok: {
      titel: 'Wattis sieben Wächter verraten ihn',
      beschreibung: 'Werbeblocker im Browser: Was das BSI zu Add-ons und Wiedererkennung schreibt.',
      hashtags: ['#werbeblocker', '#datenschutz', '#bsi', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis sieben Wächter verraten ihn',
      beschreibung: 'Werbeblocker können den Browser individueller machen. Sagt das BSI.',
      hashtags: ['#werbeblocker', '#browser', '#datenschutz', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was sieben Werbeblocker mit Wattis Browser machen',
      beschreibung: 'Werbeblocker und Browser Fingerprint: Was das BSI zu Add-ons und Wiedererkennung schreibt.',
      hashtags: ['#werbeblocker', '#fingerprinting', '#bsi', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
