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
 * ## Am 26.08.2026 auf `stationen` umgebaut
 *
 * **Der erste Short dieser Bauform, und er war es vorher schon** — sechs
 * Zuspitzungen und Kipppunkte hintereinander sind eine steigende Aufzaehlung
 * und kein Wortwechsel. Das Etikett `einstimmig` hat nur nicht beschrieben,
 * was dasteht.
 *
 * **Deshalb bleiben hier fuenf Szenen einstimmig.** Die Bauform lebt von der
 * Reihe, nicht vom Gespraech: Watti tritt an drei Stellen dazu, und die vier
 * Zeichnungen (Satellit, Kalender, Lupe, Chip) bleiben in den Szenen, in denen
 * Volti allein steht — bei zwei Figuren laege ein Symbol in der rechten.
 *
 * Die letzte Reaktion sitzt bei der Pruefungsdauer und nicht am Schluss. Der
 * gemessene Vergleichskanal landet am Ende beim Zuschauer; hier tut es der
 * Schlusssatz schon, und zwei Landungen hintereinander sind eine zu viel.
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
  vorspann: 'Auf der Raumstation laufen uralte Laptops',

  szenen: [
    {
      /*
       * Einstimmig, und das ist gerechnet: Der Aufschlag darf hoechstens 3,5
       * Sekunden sprechen, die 42 Zeichen liegen bei rund 2,9.
       */
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Handy ist zu modern für den Weltraum.',
      rede: [{ sprecher: 'nachleser', text: 'Dein Handy ist zu modern für den Weltraum.' }],
      text: 'Zu modern für den Weltraum.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'satellit' },
    },
    {
      /*
       * **Watti eroeffnet und schliesst.** Vorher lief hier Voltis Belegsatz
       * allein, und weil `redebloecke` gleiche Sprecher ueber Szenengrenzen
       * zusammenklebt, entstand mit Aufschlag und Szene 3 ein Block von 12,8
       * Sekunden — der laengste des ganzen Laufs.
       *
       * Zwei Wattizeilen um den Beleg herum brechen ihn an beiden Enden. Die
       * erste nimmt das „zu modern" aus dem Aufschlag woertlich auf, die
       * zweite setzt ein Bild an die Stelle der Zahl.
       */
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Zu modern? Wie geht das denn? 2009 liefen dort Laptops, älter als 5 Jahre. Ich hätte da oben Raumschiff erwartet.',
      rede: [
        { sprecher: 'zeiger', text: 'Zu modern? Wie geht das denn?', machart: 'ratlosigkeit' },
        {
          sprecher: 'nachleser',
          text: '2009 liefen dort Laptops, älter als 5 Jahre.',
        },
        { sprecher: 'zeiger', text: 'Ich hätte da oben Raumschiff erwartet.', machart: 'bild' },
      ],
      text: 'Laptops: älter als 5 Jahre.',
      buehne: {
        art: 'figur',
        von: 'stutzen',
        nach: 'hochschauen',
        gegenueber: { von: 'ruhe', nach: 'staunen' },
      },
      quelleId: 'esa-iss-laptops',
      belegId: 'laptops-more-than-five-years-old',
      herausgeber: 'Europäische Weltraumorganisation',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Watti, alles was zur Raumstation fliegt, muss durch eine Sicherheitsprüfung. Sicherheitsprüfung? Auch die Zahnbürste?',
      rede: [
        { sprecher: 'nachleser', text: 'Watti, alles was zur Raumstation fliegt, muss durch eine Sicherheitsprüfung.' },
        { sprecher: 'zeiger', text: 'Sicherheitsprüfung? Auch die Zahnbürste?', machart: 'rueckfrage' },
      ],
      text: 'Raumstation: erst die Prüfung.',
      buehne: {
        art: 'figur',
        von: 'hochschauen',
        nach: 'stutzen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
      quelleId: 'esa-iss-laptops',
      belegId: 'arduous-safety-and-compatibility-testing',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Ein Gerät wie deins zuzulassen hätte damals zu lange gedauert. Und ich rege mich über Ladezeiten auf.',
      rede: [
        { sprecher: 'nachleser', text: 'Ein Gerät wie deins zuzulassen hätte damals zu lange gedauert.' },
        { sprecher: 'zeiger', text: 'Und ich rege mich über Ladezeiten auf.', machart: 'gestaendnis' },
      ],
      text: 'Zulassung dauert.',
      buehne: {
        art: 'figur',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
      hervorhebung: 'zuzulassen',
      quelleId: 'esa-iss-laptops',
      belegId: 'too-long-to-pass-a-faster-pc',
    },
    {
      /*
       * **Neu, und `thinkpads-already-qualified` lag dafuer ungenutzt in der
       * Quelle.** Der Short sagte bisher nur, warum das schnellere Geraet
       * *nicht* genommen wurde — nie, was stattdessen genommen wurde. Genau
       * das ist die Station, die zwischen „dauert zu lange" und der Landung
       * fehlte.
       *
       * `stationen` verlangt mindestens drei Zuspitzungen. Mit dieser sind es
       * vier, und die Bauform traegt ihren Namen erstmals wirklich.
       */
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Die Rechner dort oben waren längst zugelassen. Zugelassen? Also Beziehungen.',
      rede: [
        { sprecher: 'nachleser', text: 'Die Rechner dort oben waren längst zugelassen.' },
        { sprecher: 'zeiger', text: 'Zugelassen? Also Beziehungen.', machart: 'empoerung' },
      ],
      text: 'Schon zugelassen.',
      buehne: {
        art: 'figur',
        von: 'nachdenken',
        nach: 'lesen',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
      quelleId: 'esa-iss-laptops',
      belegId: 'thinkpads-already-qualified',
    },
    {
      /*
       * **Watti traegt hier den Beleg, nicht Volti.** Die Rollen sind fest,
       * die Besetzung nicht — und dies ist die Stelle, an der der Wechsel
       * etwas leistet: Watti zieht die Folgerung zum ersten Mal selbst, und im
       * naechsten Atemzug zieht er die falsche.
       *
       * Zugleich loest der Wechsel die dritte Naht. Szene 6 und 7 liefen beide
       * einstimmig hintereinander, zusammen 9,4 Sekunden Volti.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext:
        'Neuere Chips sind kleiner geworden und arbeiten mit weniger Ladung. Und deshalb bringen geladene Teilchen sie leichter durcheinander.',
      rede: [
        {
          sprecher: 'nachleser',
          text: 'Neuere Chips sind kleiner geworden und arbeiten mit weniger Ladung.',
          quelleId: 'esa-strahlung-elektronik',
          belegId: 'smaller-and-less-charge',
        },
        {
          sprecher: 'zeiger',
          text: 'Und deshalb bringen geladene Teilchen sie leichter durcheinander.',
          quelleId: 'esa-strahlung-elektronik',
          belegId: 'more-vulnerable-to-disruption',
        },
      ],
      text: 'Kleiner, weniger Ladung.',
      buehne: {
        art: 'figur',
        von: 'lesen',
        nach: 'staunen',
        gegenueber: { von: 'staunen', nach: 'lesen' },
      },
      hervorhebung: 'leichter',
      quelleId: 'esa-strahlung-elektronik',
      belegId: 'smaller-and-less-charge',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Satelliten brauchen strahlungsfeste Bauteile. Meiner ist uralt. Ich bin quasi Astronaut, Volti.',
      rede: [
        { sprecher: 'nachleser', text: 'Satelliten brauchen strahlungsfeste Bauteile.' },
        { sprecher: 'zeiger', text: 'Meiner ist uralt. Ich bin quasi Astronaut, Volti.', machart: 'falscherschluss' },
      ],
      text: 'Strahlungsfest zählt.',
      buehne: {
        art: 'figur',
        von: 'staunen',
        nach: 'stutzen',
        gegenueber: { von: 'lesen', nach: 'staunen' },
      },
      quelleId: 'esa-strahlung-elektronik',
      belegId: 'radiation-hardened-essential',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Im Weltraum gewinnt nicht der schnellste Chip.',
      rede: [{ sprecher: 'nachleser', text: 'Im Weltraum gewinnt nicht der schnellste Chip.' }],
      satz: 'Im Weltraum gewinnt nicht der schnellste Chip.',
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
