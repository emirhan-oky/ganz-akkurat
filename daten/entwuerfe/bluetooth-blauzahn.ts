import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · Der Arbeitstitel, den keiner mehr wegbekam.
 *
 * **Geschrieben am 05.09.2026 gegen den Engpass**, und der war kein
 * Themenmangel: Von 33 ungesendeten Entwuerfen waren 27 Zitatkarten, bei
 * hoechstens zwei je Bauform und Woche. Es fehlten Wechselreden.
 *
 * **Der Staunfakt ist nicht der Koenig.** Dass Bluetooth nach Harald Blauzahn
 * heisst, wissen viele und es ist der halbe Witz; die andere Haelfte ist, dass
 * **zwei Namen nacheinander an Kleinigkeiten scheiterten** — PAN an zehntausend
 * Internettreffern, RadioWire an einer Markenrecherche, die nicht fertig wurde.
 * Uebrig blieb der Arbeitstitel. Eine Weltmarke aus einem Fristablauf, und das
 * ist die Sache selbst, die `gibtswirklich` verlangt.
 *
 * **Und er sagt „Koenig", nicht „Wikinger".** Der Belegpruefer hat es am
 * 05.09.2026 gefunden: Das Wort „Viking" kommt auf der ganzen Quellseite nicht
 * vor, sie nennt ihn durchweg King. Der tote Zahn traegt, die Figur nicht.
 *
 * **Wattis Gegenstand ist sein Lautsprecher.** Ohne ihn waere der Short eine
 * Anekdote ueber eine Firma; mit ihm hat Watti dasselbe Problem wie die drei
 * Konzerne von 1996 — ein Provisorium, das bleibt. Der Parallelbau am Schluss
 * gehoert deshalb Volti, nicht dem Fakt.
 *
 * **Der Kaltstart gehoert Volti**, weil `KALTSTART_SPRECHER` das fuer
 * `gibtswirklich` so vorsieht: Wo niemand einen Fehler gemacht hat, gibt es
 * nichts, worin Watti hineintappen koennte. Voltis Erstaunen behauptet und
 * traegt deshalb eine `belegId` — anders als jeder Kaltstart von Watti.
 */
export const bluetoothBlauzahn: Short = {
  id: 'bluetooth-blauzahn',
  themaId: 'bluetooth-heisst-blauzahn',
  format: 'gibtswirklich',
  sachgebiet: 'netz',
  bauform: 'wechselrede',
  arbeitstitel: 'Ein toter Zahn steckt in Wattis Lautsprecher',
  weitererzaehlt: 'die Markenrecherche nicht fertig',
  suchbegriff: 'Bluetooth Name',
  kaltstart: {
    art: 'erstaunen',
    satz: 'Bluetooth heißt nach einem König mit einem toten Zahn.',
    belegId: 'harald-blauzahn-toter-zahn',
    buehne: { art: 'figur', wer: 'nachleser', von: 'ruhe', nach: 'staunen', requisite: 'schallwellen' },
  },
  vorspann: 'Voltis König im Lautsprecher',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      quelleId: 'bluetooth-namensherkunft',
      belegId: 'harald-blauzahn-toter-zahn',
      herausgeber: 'Bluetooth SIG',
      sprechtext:
        'Volti, was hat mein Lautsprecher mit einem König zu tun? Harald Blauzahn hat Dänemark und Norwegen geeint.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          text: 'Volti, was hat mein Lautsprecher mit einem König zu tun?',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Harald Blauzahn hat Dänemark und Norwegen geeint.',
          quelleId: 'bluetooth-namensherkunft',
          belegId: 'harald-blauzahn-toter-zahn',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'staunen',
        nach: 'erklaeren',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bluetooth-namensherkunft',
      belegId: 'platzhalter-bis-marketing',
      sprechtext:
        'Und was hat der mit meinem Lautsprecher gemacht? Nichts. Intel, Ericsson und Nokia wollten einen Funkstandard. Und der hieß Bluetooth? Der Name war ein Arbeitstitel und sollte weg, sobald dem Marketing was Besseres einfällt. Dann kann meiner auch Test 2 bleiben.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'rueckfrage',
          text: 'Und was hat der mit meinem Lautsprecher gemacht?',
        },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Nichts.' },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Intel, Ericsson und Nokia wollten einen Funkstandard.',
          quelleId: 'bluetooth-namensherkunft',
          belegId: 'drei-firmen-1996',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und der hieß Bluetooth?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Der Name war ein Arbeitstitel und sollte weg, sobald dem Marketing was Besseres einfällt.',
          quelleId: 'bluetooth-namensherkunft',
          belegId: 'platzhalter-bis-marketing',
        },
        /*
         * **Wattis Zeile bricht Voltis Redelauf, und sie verraet ihn.** Ohne sie
         * spricht Volti ueber die Szenengrenze hinweg 13,6 Sekunden am Stueck —
         * `redelauf` laesst acht zu. Aus der Not wurde der bessere Bau: Watti
         * zieht den falschen Schluss, und Volti fragt in der naechsten Szene
         * genau dort nach.
         */
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'falscherschluss',
          text: 'Dann kann meiner auch Test 2 bleiben.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Dein Lautsprecher heißt Test 2? Seit zwei Jahren. Du wolltest ihn umbenennen, du Pfosten. Ich finde die Einstellung nicht mehr.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Dein Lautsprecher heißt Test 2?' },
        /*
         * **`erinnern` und nicht `beantworten`.** Der Zug ist eine Antwort auf
         * Voltis Frage, aber er behauptet nichts ueber die Welt — er holt etwas
         * aus ihrer Wohnung. Mit `beantworten` verlangte die Belegpflicht eine
         * Quelle fuer Wattis Lautsprecher, und die kann es nicht geben.
         */
        {
          sprecher: 'zeiger',
          zug: 'erinnern',
          machart: 'gestaendnis',
          text: 'Seit zwei Jahren.',
        },
        { sprecher: 'nachleser', zug: 'erinnern', text: 'Du wolltest ihn umbenennen, du Pfosten.' },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'rechtfertigung',
          text: 'Ich finde die Einstellung nicht mehr.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'nachdenken', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bluetooth-namensherkunft',
      belegId: 'markenrecherche-nicht-rechtzeitig',
      /*
       * **RadioWire war der Nachruecker, nicht der gesetzte Name.** Hier stand
       * „Der richtige Name stand schon fest, der hiess RadioWire" — und der
       * Belegpruefer hat den Satz davor gelesen: Zur Wahl standen zwei, und
       * **PAN lag vorn**. RadioWire kam erst zum Zug, nachdem PAN an den
       * Internettreffern gescheitert war.
       *
       * Der Kipppunkt wird dadurch besser, nicht schlechter: Zwei Namen
       * scheitern nacheinander an zwei Kleinigkeiten, und uebrig bleibt der
       * Arbeitstitel.
       */
      sprechtext:
        'Es sollte RadioWire heißen oder PAN. Und wieso heißt es dann nicht so? PAN gab es schon zehntausendfach im Internet. Und RadioWire? Da wurde die Markenrecherche nicht fertig. Also blieb Bluetooth.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Es sollte RadioWire heißen oder PAN.',
          quelleId: 'bluetooth-namensherkunft',
          belegId: 'zwei-kandidaten-pan-vorn',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wieso heißt es dann nicht so?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'PAN gab es schon zehntausendfach im Internet.',
          quelleId: 'bluetooth-namensherkunft',
          belegId: 'zwei-kandidaten-pan-vorn',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und RadioWire?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Da wurde die Markenrecherche nicht fertig. Also blieb Bluetooth.',
          quelleId: 'bluetooth-namensherkunft',
          belegId: 'markenrecherche-nicht-rechtzeitig',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'staunen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Der Arbeitstitel blieb, weil niemand rechtzeitig fertig wurde.',
      sprechtext:
        'In jedem Handy steckt also ein Anwalt, der nicht fertig geworden ist. Und in deinem Lautsprecher einer, der die Einstellung nicht findet. Meiner heißt wenigstens nicht nach einem toten Zahn.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'bild',
          text: 'In jedem Handy steckt also ein Anwalt, der nicht fertig geworden ist.',
        },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'parallelbau',
          text: 'Und in deinem Lautsprecher einer, der die Einstellung nicht findet.',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'umdeutung',
          text: 'Meiner heißt wenigstens nicht nach einem toten Zahn.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'staunen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „ein König mit einem toten Zahn" die Kurzfassung von etwas, das nur deshalb so heißt, weil es niemand rechtzeitig geändert hat.',
    },
  ],

  quellenIds: ['bluetooth-namensherkunft'],

  texte: {
    tiktok: {
      titel: 'Ein toter Zahn steckt in Wattis Lautsprecher',
      beschreibung: 'Bluetooth Name: Warum der Funkstandard nach einem dänischen König aus dem 10. Jahrhundert heißt.',
      hashtags: ['#bluetooth', '#technikwissen', '#kopfhörer', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Ein toter Zahn steckt in Wattis Lautsprecher',
      beschreibung: 'Bluetooth Name: Als Arbeitstitel gedacht — geblieben, weil die Markenrecherche nicht fertig wurde.',
      hashtags: ['#bluetooth', '#technikwissen', '#wikinger', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Der Arbeitstitel, den keiner mehr wegbekam',
      beschreibung: 'Bluetooth Name: Was die Bluetooth SIG über Harald Blauzahn, RadioWire und PAN schreibt.',
      hashtags: ['#bluetooth', '#technikwissen', '#namensherkunft', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
