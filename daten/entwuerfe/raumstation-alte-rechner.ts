import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · warum im Weltraum der aeltere Rechner gewinnt.
 *
 * **Der Beleg hat die Erzaehlung korrigiert, nicht bestaetigt.** Die Idee im
 * Vorrat behauptete, die Raumstation nutze alte Notebooks, weil moderne Chips
 * die Strahlung nicht ueberleben. Die ESA nennt an der Stelle, an der sie ueber
 * die Laptops an Bord schreibt, einen ganz anderen Grund: Ein schnelleres
 * Geraet haette die Zulassung nicht rechtzeitig geschafft.
 *
 * Beides steht jetzt im Short, aber in der belegten Reihenfolge — erst der
 * Zulassungsgrund (Quelle 1), dann als Kipppunkt die Strahlung (Quelle 2), die
 * ausdruecklich sagt, dass kleinere Strukturen anfaelliger sind. Die Idee war
 * damit nicht falsch, nur an der zweiten Ursache aufgehaengt.
 *
 * Beide Quellen sind ESA-Seiten, also `behoerde` und unbeteiligt. Zitiert wird
 * englisch, weil dort englisch steht; gesprochen wird deutsch.
 *
 * ## Am 01.09.2026 auf Zuege umgeschrieben
 *
 * Der Entwurf vom 26.08. war der ehrlichste Fall im ganzen Lauf: **sechs
 * belegte Saetze hintereinander, dazwischen Kommentare.** Die Bauform
 * `stationen` lebt von der Reihe, und genau deshalb kippt sie am leichtesten
 * in den Vortrag zu zweit — von dreizehn Zeilen schlossen zehn an nichts an.
 *
 * Der Umbau haengt die Reihe an Widersprueche statt an Uebergaenge. Dreimal
 * bestreitet Watti, was gerade gesagt wurde, und dreimal kontert Volti mit
 * einer Fundstelle. Die Stationen sind dieselben geblieben, ihre Reihenfolge
 * auch — **neu ist nur, wer sie auslöst**.
 *
 * Zwei Stellen tragen die Abweichung vom Metronom:
 *
 * - Watti spricht in Szene 4 **zwei Zeilen am Stueck**: erst die Unterstellung
 *   („Also Beziehungen"), dann das Gestaendnis. Beide sind kurz genug, dass
 *   `redelauf` sie durchlaesst.
 * - Das Gestaendnis ist der **einzige `abbiegen`-Zug im Lauf** und als solcher
 *   ausgewiesen: „Und ich rege mich über Ladezeiten auf" geht am Gesagten
 *   vorbei, und hier ist genau das der Witz. Mehr als einen davon laesst die
 *   Regel nicht zu — beim ersten fertigen Video waren es drei.
 *
 * **Die vier Zeichnungen sind gefallen.** Vorher standen fuenf Szenen
 * einstimmig, damit Satellit, Kalender, Lupe und Chip Platz haben; bei zwei
 * Figuren laege ein Symbol in der rechten. Ein Bau, der die Haelfte der Szenen
 * einstimmig haelt, ist aber genau der Bau, gegen den der Umbau laeuft.
 * Geblieben ist der Satellit im einstimmigen Aufschlag.
 *
 * Die Jahreszahl im zweiten Satz ist Absicht: Die ESA schreibt „more than five
 * years old", und das ist eine relative Angabe, die altert. Die Seite ist auf
 * den 22.09.2009 datiert — im Sprechtext steht deshalb das Jahr und nicht die
 * Spanne.
 */
export const raumstationAlteRechner: Short = {
  id: 'raumstation-alte-rechner',
  themaId: 'raumstation-alte-rechner',
  format: 'gibtswirklich',
  sachgebiet: 'raumfahrt',
  bauform: 'stationen',
  arbeitstitel: 'Laptops auf der Raumstation',
  weitererzaehlt: 'Im Weltraum gewinnt nicht der schnellste Chip.',
  suchbegriff: 'Laptops Raumstation',
  /*
   * **Praesens an einem Beleg von 2009** — bis zum 31.08.2026 stand hier „Auf
   * der Raumstation laufen uralte Laptops". Die ESA-Seite ist auf den
   * 22.09.2009 datiert; was heute dort laeuft, weiss sie nicht.
   *
   * Das ist genau der Fehler, vor dem das Kapitel „Zeitangaben altern — der
   * Short nicht" warnt, nur in der unauffaelligsten Form: kein „seit heute",
   * sondern ein blosses Verb im Praesens. **Absolute Daten altern nicht.**
   */
  vorspann: '2009 waren die ISS-Laptops über 5 Jahre alt',
  vorspannBelegId: 'laptops-more-than-five-years-old',


  szenen: [
    {
      /*
       * Einstimmig, und das ist gerechnet: Der Aufschlag darf hoechstens 3,5
       * Sekunden sprechen, die 42 Zeichen liegen bei rund 2,9.
       */
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Handy ist zu modern für den Weltraum.',
      rede: [
        { sprecher: 'nachleser', zug: 'behaupten', text: 'Dein Handy ist zu modern für den Weltraum.' },
      ],
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'satellit' },
    },
    {
      /*
       * **Der erste von drei Widerspruechen.** Watti bestreitet, Volti haelt
       * einen Fall dagegen — `gegenbeispiel` statt `richtigstellen`, weil ein
       * Beispiel hier mehr traegt als ein Argument: Die Raumstation ist der
       * Fall, und niemand kann ihn wegdiskutieren.
       */
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Zu modern? Das gibt es nicht. 2009 waren die Laptops auf der Raumstation über 5 Jahre alt. Raumstation? Ich hätte Raumschiff erwartet.',
      rede: [
        { sprecher: 'zeiger', zug: 'widersprechen', text: 'Zu modern? Das gibt es nicht.' },
        {
          sprecher: 'nachleser',
          zug: 'gegenbeispiel',
          text: '2009 waren die Laptops auf der Raumstation über 5 Jahre alt.',
          quelleId: 'esa-iss-laptops',
          belegId: 'laptops-more-than-five-years-old',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          text: 'Raumstation? Ich hätte Raumschiff erwartet.',
          machart: 'bild',
        },
      ],
      buehne: {
        art: 'figur',
        von: 'stutzen',
        zwischen: ['lesen'],
        nach: 'hochschauen',
        requisite: 'blatt',
        gegenueber: { von: 'ruhe', zwischen: ['stutzen'], nach: 'staunen' },
      },
      quelleId: 'esa-iss-laptops',
      belegId: 'laptops-more-than-five-years-old',
      herausgeber: 'Europäische Weltraumorganisation',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Alles an Bord musste durch die Prüfung. Warum dann nicht einfach neue, Volti? Einen schnelleren Rechner zuzulassen hätte dort zu lange gedauert.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Alles an Bord musste durch die Prüfung.',
          quelleId: 'esa-iss-laptops',
          belegId: 'arduous-safety-and-compatibility-testing',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          text: 'Warum dann nicht einfach neue, Volti?',
          machart: 'rueckfrage',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Einen schnelleren Rechner zuzulassen hätte dort zu lange gedauert.',
          quelleId: 'esa-iss-laptops',
          belegId: 'too-long-to-pass-a-faster-pc',
        },
      ],
      buehne: {
        art: 'figur',
        von: 'hochschauen',
        zwischen: ['lesen'],
        nach: 'stutzen',
        requisite: 'blatt',
        gegenueber: { von: 'staunen', zwischen: ['nachdenken'], nach: 'hochschauen' },
      },
      quelleId: 'esa-iss-laptops',
      belegId: 'arduous-safety-and-compatibility-testing',
    },
    {
      /*
       * **Die einzige Stelle im Lauf, an der Watti zweimal hintereinander
       * spricht** — und die einzige mit einem `abbiegen`. Die Unterstellung
       * greift „zugelassen" aus der Vorzeile auf, das Gestaendnis danach geht
       * am ganzen Gespraech vorbei. Zusammen sind die beiden 67 Zeichen und
       * damit weit unter der Grenze von `redelauf`.
       */
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Fünf Jahre? Das glaubt dir keiner. Die Rechner oben waren längst zugelassen. Zugelassen? Also Beziehungen. Und ich rege mich über Ladezeiten auf.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'widersprechen',
          text: 'Fünf Jahre? Das glaubt dir keiner.',
        },
        {
          sprecher: 'nachleser',
          zug: 'gegenbeispiel',
          text: 'Die Rechner oben waren längst zugelassen.',
          quelleId: 'esa-iss-laptops',
          belegId: 'thinkpads-already-qualified',
        },
        { sprecher: 'zeiger', zug: 'umdeuten', text: 'Zugelassen? Also Beziehungen.', machart: 'empoerung' },
        {
          sprecher: 'zeiger',
          zug: 'abbiegen',
          text: 'Und ich rege mich über Ladezeiten auf.',
          machart: 'gestaendnis',
        },
      ],
      buehne: {
        art: 'figur',
        von: 'stutzen',
        zwischen: ['nachdenken'],
        nach: 'lesen',
        requisite: 'blatt',
        gegenueber: { von: 'hochschauen', zwischen: ['stutzen'], nach: 'nachdenken' },
      },
      quelleId: 'esa-iss-laptops',
      belegId: 'thinkpads-already-qualified',
    },
    {
      /*
       * Der Kipppunkt liegt an der zweiten Quelle, und er beantwortet eine
       * Frage, die Watti selbst stellt. Vorher stand hier dieselbe Physik als
       * zwei aufeinanderfolgende Behauptungen — richtig, belegt, und ohne
       * jeden Grund, warum sie an dieser Stelle faellt.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext:
        'Die Strukturen auf Chips sind kleiner und brauchen weniger Ladung. Kleiner ist schlechter, Volti? Geladene Teilchen bringen sie leichter durcheinander.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Die Strukturen auf Chips sind kleiner und brauchen weniger Ladung.',
          quelleId: 'esa-strahlung-elektronik',
          belegId: 'smaller-and-less-charge',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          text: 'Kleiner ist schlechter, Volti?',
          machart: 'ratlosigkeit',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Geladene Teilchen bringen sie leichter durcheinander.',
          quelleId: 'esa-strahlung-elektronik',
          belegId: 'more-vulnerable-to-disruption',
        },
      ],
      buehne: {
        art: 'figur',
        von: 'lesen',
        zwischen: ['stutzen'],
        nach: 'staunen',
        requisite: 'blatt',
        gegenueber: { von: 'nachdenken', zwischen: ['staunen'], nach: 'lesen' },
      },
      quelleId: 'esa-strahlung-elektronik',
      belegId: 'smaller-and-less-charge',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext:
        'Und das soll ein Grund sein? Bei Satelliten sind strahlungsfeste Bauteile unverzichtbar. Mit meinem alten Handy bin ich Astronaut.',
      rede: [
        { sprecher: 'zeiger', zug: 'widersprechen', text: 'Und das soll ein Grund sein?' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Bei Satelliten sind strahlungsfeste Bauteile unverzichtbar.',
          quelleId: 'esa-strahlung-elektronik',
          belegId: 'radiation-hardened-essential',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          text: 'Mit meinem alten Handy bin ich Astronaut.',
          machart: 'falscherschluss',
        },
      ],
      buehne: {
        art: 'figur',
        von: 'staunen',
        zwischen: ['lesen'],
        nach: 'stutzen',
        requisite: 'blatt',
        gegenueber: { von: 'lesen', zwischen: ['stutzen'], nach: 'staunen' },
      },
      quelleId: 'esa-strahlung-elektronik',
      belegId: 'radiation-hardened-essential',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Im Weltraum gewinnt nicht der schnellste Chip.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Im Weltraum gewinnt nicht der schnellste Chip.',
        },
      ],
      satz: 'Im Weltraum gewinnt nicht der schnellste Chip.',
      /*
       * **Die vierte Wand.** Volti laesst Watti stehen und spricht den
       * Zuschauer an — `ansprechen` traegt als einzige Pose `zuwendung: 0`
       * und nimmt damit Blick und Neigung zur anderen Figur heraus.
       *
       * Der Nachschlag ist der Ort dafuer, weil er der einzige Satz im Short
       * ist, der niemandem auf der Buehne gilt.
       */
      buehne: {
        art: 'figur',
        von: 'staunen',
        nach: 'ansprechen',
        gegenueber: { von: 'nachdenken', nach: 'hochschauen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „zu modern" keine Übertreibung mehr, sondern die genaue Beschreibung des Problems.',
    },
  ],

  quellenIds: ['esa-iss-laptops', 'esa-strahlung-elektronik'],

  texte: {
    tiktok: {
      titel: 'Laptops auf der Raumstation',
      beschreibung: 'Auf der Raumstation liefen Laptops, die älter als fünf Jahre waren – die ESA nennt den Grund.',
      hashtags: ['#raumstation', '#iss', '#altetechnik', '#raumfahrt', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Laptops auf der Raumstation',
      beschreibung: 'Warum auf der Raumstation alte Laptops laufen: die ESA nennt den Grund.',
      hashtags: ['#raumstation', '#raumfahrt', '#esa', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Laptops auf der Raumstation',
      beschreibung: 'Die ESA über die Laptops an Bord der Raumstation und die Prüfung dahinter.',
      hashtags: ['#raumstation', '#raumfahrt', '#weltraum', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
