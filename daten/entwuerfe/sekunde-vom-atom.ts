import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · die Sekunde kommt nicht von der Erde.
 *
 * **Szenario 3, drittes Beispiel: Watti weiss etwas und schliesst falsch.** Er
 * weiss, dass seine Uhr nachgeht, und haelt sie fuer kaputt. Voltis Konter ist
 * der Satz danach: „Vielleicht geht sie richtig."
 *
 * **Der Dialog ist Emirhans**, aus
 * `daten/briefings/schaltsekunde-wird-abgeschafft.md`.
 *
 * **Die Zitatkarte ist getauscht, und der Grund ist ein Widerspruch.** In
 * seinem Bogen stand „Die Drehung der Erde um ihre Achse definiert unser
 * natürliches Zeitmaß" — direkt unter Voltis Satz „Unsere Sekunde kommt nicht
 * von der Erde." Der volle PTB-Satz endet mit „**, die Länge des Tages**": Die
 * Erddrehung definiert den **Tag**, nicht die Sekunde. Die Karte zeigte das
 * Gegenteil dessen, was darueber gesprochen wird.
 *
 * **Der Belegpruefer hat danach fuenf weitere Stellen gefunden**, zwei davon
 * schwer:
 *
 * **Der Kaltstart sagte das Gegenteil des Shorts.** „Wie, unsere Uhren gehen
 * nicht nach der Erde?" — doch, genau deshalb gibt es Schaltsekunden, und der
 * Short erzaehlt es zwei Szenen spaeter selbst. Das Zitat spricht von der
 * **Zeiteinheit**, nicht vom Uhrenstand. Jetzt: „Wie, unsere Sekunde kommt gar
 * nicht von der Erde?"
 *
 * **Und die Instanz war die falsche.** Wattis „Und wer ist dafür
 * verantwortlich?" bezog sich auf die Schaltsekunde — die ordnet der **IERS**
 * an, nicht das BIPM. Der volle Resolutionssatz nennt IERS und ITU-R, und die
 * PTB schreibt „Auf Anweisung des IERS". Fuer die **Zeit** ist das BIPM
 * richtig: „UTC is a time scale produced by the International Bureau of
 * Weights and Measures". Die Frage zielt jetzt dorthin.
 *
 * Dazu drei kleinere: „aber ein Atom schwingt immer gleich" (die PTB schreibt
 * „atomare Naturkonstante", die **Schwingung** ist erklaert und nicht
 * zitiert) haengt jetzt als eigene Zeile an ihrem eigenen Beleg. **Das Wort
 * „Atom" bleibt dabei stehen** — es steht in „atomare Naturkonstante", und
 * ein Anlauf, es gegen „Naturkonstante" zu tauschen, bekam die kuerzeste
 * Rueckfrage: *„Wieso steht hier nicht einfach Atom?"* Belegtreue heisst
 * nicht, das Wort der Quelle zu uebernehmen; aus „**zu** ungleichmaessig" ist „recht
 * ungleichmaessig" geworden, weil „zu" ein Urteil ueber Tauglichkeit ist, das
 * die PTB nicht faellt; und der Nachschlag traegt jetzt eine Fundstelle.
 *
 * **Zwei Shorts erzaehlen die Schaltsekunde**, dieser und
 * `schaltsekunde-wette`. Emirhans Entscheidung vom 03.09.2026: beide behalten.
 * Der Zugang ist verschieden — dort der Fakt in einer Wette, hier die
 * **Instanz**: „Und die dürfen das einfach?" Sie duerfen nur nie im selben
 * Lauf stehen.
 */
export const sekundeVomAtom: Short = {
  id: 'sekunde-vom-atom',
  themaId: 'schaltsekunde',
  format: 'gibtswirklich',
  sachgebiet: 'zeit',
  bauform: 'zitatkarte',
  arbeitstitel: 'Volti zählt die Sekunden nach',
  weitererzaehlt: 'Unsere Sekunde kommt nicht von der Erde',
  suchbegriff: 'Sekunde Atom',
  kaltstart: {
    art: 'erstaunen',
    satz: 'Wie, unsere Sekunde kommt gar nicht von der Erde?',
    belegId: 'zeiteinheit-atomare-naturkonstante',
    buehne: { art: 'figur', wer: 'nachleser', von: 'ruhe', nach: 'staunen', requisite: 'uhr' },
  },
  vorspann: 'Volti zählt die Sekunden nach',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Meine Uhr geht eine Sekunde hinter deiner. Vielleicht geht sie richtig.',
      rede: [
        { sprecher: 'zeiger', zug: 'behaupten', text: 'Meine Uhr geht eine Sekunde hinter deiner.' },
        { sprecher: 'nachleser', zug: 'widersprechen', text: 'Vielleicht geht sie richtig.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'staunen', nach: 'erklaeren' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'die Zeiteinheit an eine atomare Naturkonstante anzuschließen',
      quelleId: 'ptb-schaltsekunden',
      belegId: 'zeiteinheit-atomare-naturkonstante',
      herausgeber: 'Physikalisch-Technische Bundesanstalt',
      sprechtext:
        'Wie, richtig? Unsere Sekunde kommt nicht von der Erde. Sondern kommt von einem Atom.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Wie, richtig?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Unsere Sekunde kommt nicht von der Erde.',
          quelleId: 'ptb-schaltsekunden',
          belegId: 'zeiteinheit-atomare-naturkonstante',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Sondern kommt von einem Atom.',
          quelleId: 'ptb-schaltsekunden',
          belegId: 'zeiteinheit-atomare-naturkonstante',
        },
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
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'ptb-schaltsekunden',
      belegId: 'erddrehung-ungleichmaessig',
      sprechtext:
        'Watt? Die Erde dreht sich recht ungleichmäßig. Ein Atom nicht. Und dann? Damit beide nicht auseinanderlaufen, schiebt man eine Schaltsekunde ein.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Watt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die Erde dreht sich recht ungleichmäßig.',
          quelleId: 'ptb-schaltsekunden',
          belegId: 'erddrehung-ungleichmaessig',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Ein Atom nicht.',
          quelleId: 'ptb-schaltsekunden',
          belegId: 'zeiteinheit-atomare-naturkonstante',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und dann?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Damit beide nicht auseinanderlaufen, schiebt man eine Schaltsekunde ein.',
          quelleId: 'ptb-schaltsekunden',
          belegId: 'abweichung-nie-groesser-null-neun',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'zeigen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bipm-schaltsekunde',
      belegId: 'utc-produced-by-bipm',
      sprechtext:
        'Und wer bestimmt, wie lang eine Sekunde ist? Das Internationale Büro für Maß und Gewicht. Und die dürfen das einfach, ohne dich zu fragen? Die machen die Zeit.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wer bestimmt, wie lang eine Sekunde ist?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Das Internationale Büro für Maß und Gewicht.',
          quelleId: 'bipm-schaltsekunde',
          belegId: 'utc-produced-by-bipm',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rechtfertigung', text: 'Und die dürfen das einfach, ohne dich zu fragen?' },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'banaleaufloesung',
          text: 'Die machen die Zeit.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'stutzen',
        gegenueber: { von: 'zeigen', nach: 'ansprechen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Die Sekunde hängt an einem Atom, der Tag an der Erde.',
      sprechtext:
        'Und keiner beschwert sich? Wieso sollten wir uns bei einem Amt beschweren, die dafür sorgen, dass unsere Zeit einheitlich ist? Ja stimmt auch wieder, ich Idiot.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und keiner beschwert sich?' },
        {
          sprecher: 'nachleser',
          zug: 'umdeuten',
          text: 'Wieso sollten wir uns bei einem Amt beschweren, die dafür sorgen, dass unsere Zeit einheitlich ist?',
          quelleId: 'bipm-schaltsekunde',
          belegId: 'utc-basis-of-civil-time',
        },
        { sprecher: 'zeiger', zug: 'einlenken', machart: 'gestaendnis', text: 'Ja stimmt auch wieder, ich Idiot.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'achselzucken',
        gegenueber: { von: 'ansprechen', nach: 'ruhe' },
      },
      rundlauf:
        'Beim zweiten Sehen ist Voltis erste Frage keine Frage mehr, sondern die Auflösung – und Wattis nachgehende Uhr war die ganze Zeit in Ordnung.',
    },
  ],

  quellenIds: ['ptb-schaltsekunden', 'bipm-schaltsekunde'],

  texte: {
    tiktok: {
      titel: 'Volti zählt die Sekunden nach',
      beschreibung: 'Sekunde und Atom: Warum unsere Uhren nicht nach der Erde gehen.',
      hashtags: ['#schaltsekunde', '#zeit', '#atomuhr', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Volti zählt die Sekunden nach',
      beschreibung: 'Sekunde und Atom: Die Erde dreht sich ungleichmäßig, ein Atom nicht.',
      hashtags: ['#schaltsekunde', '#zeit', '#atomuhr', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Wer bestimmt, wie lang eine Sekunde ist',
      beschreibung: 'Sekunde und Atom: Was die PTB über Zeiteinheit und Schaltsekunden schreibt.',
      hashtags: ['#schaltsekunde', '#zeit', '#ptb', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
