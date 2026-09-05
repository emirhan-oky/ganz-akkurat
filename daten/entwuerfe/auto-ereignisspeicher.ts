import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · der Ereignisdatenspeicher im Auto.
 *
 * **Emirhans Dialog vom 02.09.2026**, aus `daten/briefings/auto-ereignisspeicher.md`.
 * Meine Fassung vom 03.09. ist verworfen — sie war entstanden, ohne dass ich
 * den Briefingbogen geoeffnet hatte.
 *
 * ## Warum seine Fassung besser ist
 *
 * **Es ist gerade passiert.** Voltis erste Zeile ist „Omg gehts dir gut?" —
 * die Lage hat einen Zeitpunkt, einen Schaden und einen, dem er passiert ist.
 * Meine Fassung liess Watti zum vierten Mal dieselbe Frage stellen; das ist
 * eine Form, aber keine Lage.
 *
 * **Und die Schuldfrage bleibt offen** — genau so, wie es der Bogen verlangt.
 * Watti sagt „anscheinend" und „ich bin mir nicht sicher"; Volti sagt
 * „vielleicht kann es der Fall sein". Waere Watti schuld, staende der
 * Zuschauer auf der Seite des Datenspeichers, und das Video liefe gegen sein
 * eigenes Format.
 *
 * ## Was ich angefasst habe
 *
 * **Den Platzhalter gefuellt.** Wo „Wusstest du, dass neue Fahrzeuge… und hier
 * wieder Zitierkarte mit der Information" stand, steht jetzt die Zeile mit der
 * Fundstelle und die Karte.
 *
 * **Eine Zeile ersetzt, mit seiner Zustimmung.** „Es is nicht abgeklaert, wer
 * die Daten bekommt, wie lange sie liegen oder ob sie vor Gericht landen."
 * steht in keiner Quelle — die Verordnung regelt, *was* aufgezeichnet wird und
 * *wann*, sonst nichts. Aus der Behauptung ist Wattis Frage und Voltis
 * Eingestaendnis geworden: „Und wer kriegt das zu sehen?" — „Steht da nicht."
 * **Dieselbe Aussage, aber als Luecke der Quelle statt als Tatsache.**
 *
 * Dazu Rechtschreibung: „Rueckfaehrtsfahren" → „Rueckwaertsfahren",
 * „Versicheurngspapiere" → „Versicherungspapiere", „Es is" → „Es ist".
 */
export const autoEreignisspeicher: Short = {
  id: 'auto-ereignisspeicher',
  themaId: 'auto-ereignisspeicher',
  format: 'absicht',
  sachgebiet: 'fahren',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Auto hat mitgeschrieben',
  weitererzaehlt: 'kurz vor, während und unmittelbar nach einem Aufprall',
  suchbegriff: 'Auto Aufprall',
  kaltstart: {
    art: 'momentdanach',
    satz: 'Volti, weißt du wo die Versicherungspapiere für das Auto sind?',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'warndreieck' },
  },
  vorspann: 'Wattis Auto und der Zeuge',

  szenen: [
    {
      /*
       * **Voltis erste Zeile ist eine Reaktion auf den Kaltstart**, nicht auf
       * ein Thema. Watti fragt nach den Papieren, und Volti versteht sofort,
       * was das heisst.
       */
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Geht es dir gut? Was ist passiert? Ja klar, ich kann ja noch klar denken.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Geht es dir gut? Was ist passiert?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Ja klar, ich kann ja noch klar denken.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      /*
       * **„Durch dein Verhör nicht mehr" ist Emirhans Zeile**, und sie steht
       * als Beispiel fuer die Machart `umdeutung` in `src/typen.ts`: Watti
       * kommentiert nicht die Sache, sondern die Art, wie Volti fragt.
       */
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-ereignisdatenspeicher',
      belegId: 'ereignisbezogene-datenaufzeichnung',
      herausgeber: 'Europäische Union',
      sprechtext:
        'Ich bin anscheinend beim Rückwärtsfahren gegen ein anderes Auto gekommen. Und wie machst du das fest? Wieso bist du dir nicht sicher? Naja, genau in dem Moment, wo ich den Rückwärtsgang eingelegt habe, ist es eben passiert. Watti, bist du dir ganz sicher? Durch dein Verhör nicht mehr.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'nachlegen',
          text: 'Ich bin anscheinend beim Rückwärtsfahren gegen ein anderes Auto gekommen.',
        },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und wie machst du das fest? Wieso bist du dir nicht sicher?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Naja, genau in dem Moment, wo ich den Rückwärtsgang eingelegt habe, ist es eben passiert.',
        },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, bist du dir ganz sicher?' },
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'umdeutung', text: 'Durch dein Verhör nicht mehr.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'erklaeren',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
    },
    {
      /*
       * **Der gefuellte Platzhalter.** Hier stand „Wusstest du, dass neue
       * Fahrzeuge… und hier wieder Zitierkarte mit der Information".
       *
       * Die Fundstelle passt auf seinen Bau wie gebaut: Watti weiss nicht, was
       * passiert ist, und das Auto hat genau den Moment mitgeschrieben, um den
       * es geht.
       */
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'kurz vor, während und unmittelbar nach einem Aufprall',
      quelleId: 'eu-ereignisdatenspeicher',
      belegId: 'kritische-unfallbezogene-parameter-u',
      sprechtext:
        'Wusstest du, dass neue Fahrzeuge so etwas aufzeichnen? Was denn aufzeichnen? Was kurz vor, während und unmittelbar nach einem Aufprall passiert. Und? Vielleicht kann es der Fall sein, dass er doch in dich reingefahren ist.',
      rede: [
        { sprecher: 'nachleser', zug: 'behaupten', text: 'Wusstest du, dass neue Fahrzeuge so etwas aufzeichnen?' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Was denn aufzeichnen?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Was kurz vor, während und unmittelbar nach einem Aufprall passiert.',
          quelleId: 'eu-ereignisdatenspeicher',
          belegId: 'kritische-unfallbezogene-parameter-u',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Vielleicht kann es der Fall sein, dass er doch in dich reingefahren ist.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'lesen',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
    },
    {
      /*
       * **Die ersetzte Zeile.** Hier stand „Es ist nicht abgeklaert, wer die
       * Daten bekommt, wie lange sie liegen oder ob sie vor Gericht landen."
       * Das steht in keiner Quelle; die Verordnung regelt, *was* aufgezeichnet
       * wird und *wann*.
       *
       * Aus der Behauptung ist Wattis Frage und Voltis Eingestaendnis
       * geworden. **Dieselbe Aussage, aber als Luecke der Quelle statt als
       * Tatsache** — und es ist die Bewegung, die seine Fassung ohnehin hat:
       * Volti weiss viel und kann Wattis eigentliche Frage trotzdem nicht
       * beantworten.
       */
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-ereignisdatenspeicher',
      belegId: 'ausschliesslich-unfallforschung',
      sprechtext:
        'Also bin ich nicht schuld? Das steht da nicht drin. Und wer kriegt das überhaupt zu sehen? Die Behörden, ausschließlich für Unfallforschung. Und anonymisiert.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Also bin ich nicht schuld?' },
        { sprecher: 'nachleser', zug: 'einschraenken', text: 'Das steht da nicht drin.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wer kriegt das überhaupt zu sehen?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die Behörden, ausschließlich für Unfallforschung.',
          quelleId: 'eu-ereignisdatenspeicher',
          belegId: 'ausschliesslich-unfallforschung',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Und anonymisiert.',
          quelleId: 'eu-ereignisdatenspeicher',
          belegId: 'daten-anonymisiert',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'lesen',
        nach: 'nachdenken',
        gegenueber: { von: 'staunen', nach: 'stutzen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Aufgezeichnet wird der Aufprall, nicht der Weg.',
      sprechtext: 'Also bin ich Schuld? Wir klären das erst einmal ab, Watti. Fakt ist, dass dein Auto petzen kann.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Also bin ich Schuld?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Wir klären das erst einmal ab, Watti. Fakt ist, dass dein Auto petzen kann.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'nachdenken',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
      rundlauf:
        'Beim zweiten Sehen ist Wattis Frage nach den Versicherungspapieren schon die Pointe: Der Zeuge saß die ganze Zeit in seinem eigenen Auto.',
    },
  ],

  quellenIds: ['eu-ereignisdatenspeicher'],

  texte: {
    tiktok: {
      titel: 'Wattis Auto hat mitgeschrieben',
      beschreibung: 'Auto und Aufprall: Was der Speicher im Wagen aufzeichnet und wann.',
      hashtags: ['#auto', '#datenschutz', '#eu', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Auto hat mitgeschrieben',
      beschreibung: 'Das Auto zeichnet den Aufprall auf. Nicht den Weg dorthin.',
      hashtags: ['#auto', '#datenschutz', '#fahren', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was Wattis Auto beim Aufprall aufzeichnet',
      beschreibung: 'Auto und Aufprall: Was die EU-Verordnung zur ereignisbezogenen Datenaufzeichnung regelt.',
      hashtags: ['#auto', '#datenschutz', '#eu', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
