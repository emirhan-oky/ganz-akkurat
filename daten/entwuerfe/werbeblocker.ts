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
  weitererzaehlt: 'desto auffälliger bist du',
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
      sprechtext: 'Wie viele hast du denn schon? Sieben, und ich will nicht dass die mich überall verfolgen.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wie viele hast du denn schon?' },
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
        'Und du glaubst, mit dem achten bist du dann weg? Na klar, je mehr ich blocke, desto weniger sehen die von mir. Falsch herum du Idiot. Je mehr du blockst, desto auffälliger bist du.',
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
          text: 'Falsch herum du Idiot. Je mehr du blockst, desto auffälliger bist du.',
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
      belegId: 'browser-individueller-werden',
      sprechtext:
        'Watt? Dein Browser wird durch jedes Add-on individueller. Warte, ich mache mich mit den Dingern sichtbarer statt unsichtbar?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Watt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dein Browser wird durch jedes Add-on individueller.',
          quelleId: 'bsi-fingerprints',
          belegId: 'browser-individueller-werden',
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
      belegId: 'besser-zu-identifizieren-sein',
      sprechtext:
        'Und damit besser zu identifizieren. Von allen, die ich kenne, hat genau einer sieben Blocker. Du.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Und damit besser zu identifizieren.',
          quelleId: 'bsi-fingerprints',
          belegId: 'besser-zu-identifizieren-sein',
        },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
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
        'Dann nehme ich heute Abend einfach alle wieder runter. Dann sehen sie wieder alles, und das BSI nennt das Ganze ein Wettrüsten.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          text: 'Dann nehme ich heute Abend einfach alle wieder runter.',
        },
        {
          sprecher: 'nachleser',
          zug: 'gegenbeispiel',
          text: 'Dann sehen sie wieder alles, und das BSI nennt das Ganze ein Wettrüsten.',
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
      satz: 'Ein Browser mit sieben Blockern ist der auffälligste im Raum.',
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
        gegenueber: { von: 'stutzen', nach: 'achselzucken' },
      },
      rundlauf:
        'Beim zweiten Sehen ist die Frage nach dem achten Blocker schon die Antwort: Jeder weitere macht ihn eindeutiger.',
    },
  ],

  quellenIds: ['bsi-fingerprints'],

  texte: {
    tiktok: {
      titel: 'Wattis sieben Wächter verraten ihn',
      beschreibung: 'Werbeblocker im Browser: Warum mehr davon dich leichter erkennbar macht.',
      hashtags: ['#werbeblocker', '#datenschutz', '#bsi', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis sieben Wächter verraten ihn',
      beschreibung: 'Werbeblocker machen den Browser eigener. Und damit dich.',
      hashtags: ['#werbeblocker', '#browser', '#datenschutz', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Warum sieben Werbeblocker Watti auffälliger machen',
      beschreibung: 'Werbeblocker und Browser Fingerprint: Was das BSI zu Add-ons und Wiedererkennung schreibt.',
      hashtags: ['#werbeblocker', '#fingerprinting', '#bsi', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
