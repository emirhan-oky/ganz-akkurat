import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · die Minute mit 61 Sekunden.
 *
 * **Szenario 10: Die Wette.** Watti behauptet etwas, Volti haelt dagegen, und
 * **die Zitatkarte entscheidet**. Die Form braucht eine Behauptung, die in
 * einem Satz entschieden werden kann — hier gibt es sogar zwei unbeteiligte
 * Quellen fuer dieselbe Sache, die PTB und das Internationale Buero fuer Mass
 * und Gewicht.
 *
 * **Die Wette geht so aus, dass beide etwas mitnehmen.** Watti gewinnt sie —
 * es gibt die Schaltsekunde wirklich —, und Volti hat trotzdem das letzte
 * Wort: Der Grenzwert wird angehoben, spaetestens 2035.
 *
 * **Hier stand „Sie wird abgeschafft".** Der Belegpruefer hat am 03.09.2026
 * nachgesehen: Die CGPM-Resolution beschliesst, **den Grenzwert fuer die
 * Abweichung UT1-UTC** anzuheben, und bittet das CIPM, einen neuen Wert erst
 * vorzuschlagen. Das Wort „abolish" kommt nicht vor. Das Subjekt der Erhoehung
 * stand ausserhalb der geprueften Zeichenkette — dasselbe Muster wie neunmal
 * beim letzten Durchgang.
 *
 * **Das Thema lief am 18.08.2026 als `schaltsekunde`.** Es wird bewusst neu
 * erzaehlt und traegt die alte `themaId`.
 */
export const schaltsekundeWette: Short = {
  id: 'schaltsekunde-wette',
  themaId: 'schaltsekunde',
  format: 'gibtswirklich',
  sachgebiet: 'zeit',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti wettet auf eine Minute mit 61 Sekunden',
  weitererzaehlt: 'die Erde dreht sich ungleichmäßig',
  suchbegriff: 'Schaltsekunde Erddrehung',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Es gibt eine Schaltsekunde. Darauf wette ich mit dir, Volti.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'uhr' },
  },
  vorspann: 'Wattis Wette über eine Minute',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, wetten wir? Worüber denn? Es gibt Minuten mit 61 Sekunden, wegen der Erddrehung. Das hast du geträumt.',
      rede: [
        { sprecher: 'zeiger', zug: 'bitten', text: 'Volti, wetten wir?' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Worüber denn?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Es gibt Minuten mit 61 Sekunden, wegen der Erddrehung.' },
        { sprecher: 'nachleser', zug: 'widersprechen', text: 'Das hast du geträumt.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'zeigen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'ptb-schaltsekunden',
      belegId: 'drehung-der-erde-definiert',
      sprechtext:
        'Guck selbst nach, du liest doch sonst alles. Die Länge des Tages kommt aus der Drehung der Erde. Und die Sekunde?',
      rede: [
        { sprecher: 'zeiger', zug: 'erinnern', text: 'Guck selbst nach, du liest doch sonst alles.' },
        {
          sprecher: 'nachleser',
          zug: 'behaupten',
          text: 'Die Länge des Tages kommt aus der Drehung der Erde.',
          quelleId: 'ptb-schaltsekunden',
          belegId: 'drehung-der-erde-definiert',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Und die Sekunde?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'stutzen',
        gegenueber: { von: 'stutzen', nach: 'lesen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'die Erddrehung recht ungleichmäßig verläuft',
      quelleId: 'ptb-schaltsekunden',
      belegId: 'erddrehung-ungleichmaessig',
      herausgeber: 'Physikalisch-Technische Bundesanstalt',
      sprechtext:
        'Die hängt an einer atomaren Naturkonstante. Also zwei verschiedene Uhren. Genau. Und die Erde dreht sich ungleichmäßig.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die hängt an einer atomaren Naturkonstante.',
          quelleId: 'ptb-schaltsekunden',
          belegId: 'zeiteinheit-atomare-naturkonstante',
        },
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'bild', text: 'Also zwei verschiedene Uhren.' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Genau. Und die Erde dreht sich ungleichmäßig.',
          quelleId: 'ptb-schaltsekunden',
          belegId: 'erddrehung-ungleichmaessig',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'staunen',
        gegenueber: { von: 'lesen', nach: 'erklaeren' },
      },
    },
    {
      /*
       * **Der Kipppunkt entscheidet die Wette.** Watti hat recht, und der
       * Grund ist groesser als seine Behauptung: Die Sekunde wird
       * eingeschoben, damit die beiden Uhren nicht auseinanderlaufen.
       */
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'ptb-schaltsekunden',
      belegId: 'abweichung-nie-groesser-null-neun',
      sprechtext:
        'Und der Tag wird im Mittel länger. Und damit? Damit sie nicht auseinanderlaufen, wird eine Schaltsekunde eingeschoben. Sag ich doch. Die Wette hast du.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Und der Tag wird im Mittel länger.',
          quelleId: 'ptb-schaltsekunden',
          belegId: 'erddrehung-ungleichmaessig',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und damit?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Damit sie nicht auseinanderlaufen, wird eine Schaltsekunde eingeschoben.',
          quelleId: 'ptb-schaltsekunden',
          belegId: 'abweichung-nie-groesser-null-neun',
        },
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'umdeutung', text: 'Sag ich doch.' },
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Die Wette hast du.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'zeigen',
        gegenueber: { von: 'erklaeren', nach: 'achselzucken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Der Grenzwert für die Abweichung wird angehoben.',
      sprechtext:
        'Lange kannst du damit nicht mehr wetten. Wieso nicht? Der Grenzwert wird angehoben, spätestens 2035. Dann wette ich jetzt nochmal, schnell.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Lange kannst du damit nicht mehr wetten.',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Wieso nicht?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Der Grenzwert wird angehoben, spätestens 2035.',
          quelleId: 'bipm-schaltsekunde',
          belegId: 'increased-in-or-before-2035',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'falscherschluss',
          text: 'Dann wette ich jetzt nochmal, schnell.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'ansprechen',
        gegenueber: { von: 'ruhe', nach: 'nachdenken' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, dass Watti recht hat – seine Wette klingt dann nach jemandem, der zufällig etwas Wahres aufgeschnappt hat.',
    },
  ],

  quellenIds: ['ptb-schaltsekunden', 'bipm-schaltsekunde'],

  texte: {
    tiktok: {
      titel: 'Watti wettet auf eine Minute mit 61 Sekunden',
      beschreibung: 'Schaltsekunde und Erddrehung: Warum eine Minute manchmal länger dauert.',
      hashtags: ['#schaltsekunde', '#zeit', '#atomuhr', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti wettet auf eine Minute mit 61 Sekunden',
      beschreibung: 'Schaltsekunde: Die Atomuhr geht anders als die Erddrehung.',
      hashtags: ['#schaltsekunde', '#atomuhr', '#zeit', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Die Minute, die bei Watti 61 Sekunden dauert',
      beschreibung: 'Schaltsekunde und Erddrehung: Was PTB und das Internationale Büro für Maß und Gewicht schreiben.',
      hashtags: ['#schaltsekunde', '#atomuhr', '#ptb', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
