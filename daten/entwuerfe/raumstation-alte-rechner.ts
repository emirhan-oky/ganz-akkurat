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
  arbeitstitel: 'Laptops auf der Raumstation',
  weitererzaehlt: 'Im Weltraum ist neuer nicht besser.',
  suchbegriff: 'Laptops Raumstation',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Handy ist zu modern für den Weltraum.',
      text: 'Zu modern für den Weltraum.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'satellit' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Auf der Raumstation liefen 2009 Laptops, die älter als 5 Jahre waren.',
      text: 'Laptops, älter als 5 Jahre.',
      buehne: { art: 'figur', von: 'stutzen', nach: 'hochschauen', requisite: 'kalender', stand: 'klein' },
      quelleId: 'esa-iss-laptops',
      belegId: 'laptops-more-than-five-years-old',
      herausgeber: 'Europäische Weltraumorganisation',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Alles, was da hochfliegt, muss durch eine aufwendige Sicherheitsprüfung.',
      text: 'Alles muss durch die Prüfung.',
      buehne: { art: 'figur', von: 'hochschauen', nach: 'erklaeren' },
      quelleId: 'esa-iss-laptops',
      belegId: 'arduous-safety-and-compatibility-testing',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Ein schnelleres Gerät hätte diese Prüfung nicht rechtzeitig geschafft.',
      text: 'Ein schnelleres schafft sie nicht.',
      buehne: { art: 'figur', von: 'erklaeren', nach: 'achselzucken', requisite: 'uhr', stand: 'links' },
      hervorhebung: 'rechtzeitig',
      quelleId: 'esa-iss-laptops',
      belegId: 'too-long-to-pass-a-faster-pc',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Neuere Chips sind kleiner geworden und arbeiten mit weniger Ladung.',
      text: 'Kleiner. Weniger Ladung.',
      buehne: { art: 'figur', von: 'achselzucken', nach: 'nachdenken', requisite: 'lupe' },
      quelleId: 'esa-strahlung-elektronik',
      belegId: 'smaller-and-less-charge',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Genau deshalb bringen geladene Teilchen sie leichter durcheinander.',
      text: 'Geladene Teilchen stören sie leichter.',
      buehne: { art: 'figur', von: 'nachdenken', nach: 'staunen', requisite: 'warndreieck', stand: 'links' },
      hervorhebung: 'leichter',
      quelleId: 'esa-strahlung-elektronik',
      belegId: 'more-vulnerable-to-disruption',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Für Satelliten sind besonders strahlungsfeste Bauteile deshalb unverzichtbar.',
      text: 'Strahlungsfest statt schnell.',
      buehne: { art: 'figur', von: 'staunen', nach: 'zeigen', requisite: 'chip' },
      quelleId: 'esa-strahlung-elektronik',
      belegId: 'radiation-hardened-essential',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Im Weltraum ist neuer nicht besser.',
      satz: 'Im Weltraum ist neuer nicht besser.',
      rundlauf:
        'Beim zweiten Sehen ist „zu modern für den Weltraum" kein Spott mehr, sondern der Befund aus dem Schlusssatz.',
    },
  ],

  quellenIds: ['esa-iss-laptops', 'esa-strahlung-elektronik'],

  texte: {
    tiktok: {
      titel: 'Laptops auf der Raumstation',
      beschreibung: 'Auf der Raumstation liefen Laptops, die älter als fünf Jahre waren – mit Absicht.',
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
