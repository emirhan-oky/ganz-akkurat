import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · der Sommer im Ausland und der Hinweis, der vorher kommt.
 *
 * **Szenario 7, drittes Beispiel: Watti hat einen Plan.** Volti rechnet vor,
 * was daraus wird — und die Rechnung endet nicht bei einer Strafe, sondern bei
 * einem Brief.
 *
 * **Der erste Anlauf war inhaltlich falsch, und der Belegpruefer hat es
 * gefunden.** Er liess Volti sagen: „Du brauchst einen ueberwiegenden
 * Inlandsaufenthalt. Sonst darf er dir was aufschlagen." Das Zitat sagt aber,
 * ein ueberwiegender Inlandsaufenthalt **gilt als Nachweis, dass keine
 * missbraeuchliche Nutzung vorliegt** — eine **hinreichende** Bedingung. Der
 * Short machte daraus eine **notwendige**, und Artikel 5 Absatz 3 sagt das
 * Gegenteil: Reissen beide Kriterien, muessen zusaetzliche Risikoanzeichen
 * dazukommen, dann ein Hinweis, dann mindestens zwei Wochen.
 *
 * **Und der zitierte Fall war nicht Wattis.** „Permanentes Roaming" meint laut
 * derselben Quelle den Vertrag aus einem Mitgliedstaat, in dem der Kunde
 * „weder seinen gewoehnlichen Aufenthalt noch stabile Bindungen hat". Watti
 * hat einen deutschen Vertrag und wohnt in Deutschland.
 *
 * **Der Umbau macht den Short besser.** Der Kipppunkt ist jetzt nicht die
 * Strafe, sondern dass vor jeder Strafe ein Hinweis steht — und dass Watti
 * nachweisen darf, wo er wohnt. Die Aufregung loest sich in einem Brief auf.
 */
export const roamingSommer: Short = {
  id: 'roaming-sommer',
  themaId: 'roaming-angemessene-nutzung',
  format: 'absicht',
  sachgebiet: 'netz',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Anbieter schreibt ihm einen Brief',
  weitererzaehlt: 'mindestens 2 Wochen',
  suchbegriff: 'Roaming Ausland',
  kaltstart: {
    art: 'stolzerfehler',
    satz: 'Koffer, Laptop, Handyvertrag. Der Sommer geht nach Spanien.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'koffer' },
  },
  vorspann: 'Wattis Anbieter schreibt ihm einen Brief',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, wie lange willst du mit dem Handyvertrag in Spanien sitzen? Vier Monate. Kostet ja nichts extra.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachhaken',
          text: 'Watti, wie lange willst du mit dem Handyvertrag in Spanien sitzen?',
        },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscherschluss',
          text: 'Vier Monate. Kostet ja nichts extra.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'ruhe', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-roaming-angemessene-nutzung',
      belegId: 'kein-permanentes-roaming',
      herausgeber: 'Europäische Kommission',
      sprechtext:
        'Roaming zu Inlandspreisen gilt für Reisen im Ausland. Dein Anbieter darf trotzdem hinschauen. Auf was denn? Auf deine Tage.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Roaming zu Inlandspreisen gilt für Reisen im Ausland. Dein Anbieter darf trotzdem hinschauen.',
          quelleId: 'eu-roaming-angemessene-nutzung',
          belegId: 'zeitraum-mindestens-vier-monate',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Auf was denn?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Auf deine Tage.',
          quelleId: 'eu-roaming-angemessene-nutzung',
          belegId: 'jeder-tag-im-inlandsnetz',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'achselzucken',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'Aufenthalts- und Nutzungsindikatoren … über einen Zeitraum von mindestens vier Monaten',
      quelleId: 'eu-roaming-angemessene-nutzung',
      belegId: 'zeitraum-mindestens-vier-monate',
      sprechtext:
        'Und wie lange schaut er hin? Mindestens vier Monate. Aufenthalt und Nutzung zusammen. Und wenn er dann vier Monate lang nur Spanien sieht?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wie lange schaut er hin?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Mindestens vier Monate. Aufenthalt und Nutzung zusammen.',
          quelleId: 'eu-roaming-angemessene-nutzung',
          belegId: 'zeitraum-mindestens-vier-monate',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn er dann vier Monate lang nur Spanien sieht?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'achselzucken',
        nach: 'staunen',
        gegenueber: { von: 'zeigen', nach: 'lesen' },
      },
    },
    {
      art: 'zahl',
      position: 'kipppunkt',
      wert: '2 Wochen',
      einheit: 'nach dem Hinweis',
      bedeutung: 'so lange bleibt Zeit, bevor überhaupt etwas kostet',
      quelleId: 'eu-roaming-angemessene-nutzung',
      belegId: 'nicht-kuerzer-als-zwei-wochen',
      sprechtext:
        'Dann schreibt er dir. Also kostet es was? Erst der Hinweis. Und dann hast du mindestens 2 Wochen Zeit, dein Verhalten zu ändern.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann schreibt er dir.',
          quelleId: 'eu-roaming-angemessene-nutzung',
          belegId: 'hinweisen-bevor-aufschlag',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'katastrophe', text: 'Also kostet es was?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Erst der Hinweis.',
          quelleId: 'eu-roaming-angemessene-nutzung',
          belegId: 'hinweisen-bevor-aufschlag',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Und dann hast du mindestens 2 Wochen Zeit, dein Verhalten zu ändern.',
          quelleId: 'eu-roaming-angemessene-nutzung',
          belegId: 'nicht-kuerzer-als-zwei-wochen',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'erklaeren' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Vor jedem Aufschlag steht ein Hinweis.',
      sprechtext:
        'Und was schreibe ich zurück? Dass du hier wohnst. Das darfst du nachweisen. Dann fliege ich zwischendurch einmal heim. Ach Watti...',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was schreibe ich zurück?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dass du hier wohnst. Das darfst du nachweisen.',
          quelleId: 'eu-roaming-angemessene-nutzung',
          belegId: 'nachweis-gewoehnlicher-aufenthalt',
        },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'uebercompliance',
          text: 'Dann fliege ich zwischendurch einmal heim.',
        },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'nebenbemerkung',
          text: 'Ach Watti...',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'achselzucken',
        gegenueber: { von: 'erklaeren', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen steht der Handyvertrag im ersten Satz zwischen Koffer und Laptop – und er reist wirklich mit, nur nicht unbemerkt.',
    },
  ],

  quellenIds: ['eu-roaming-angemessene-nutzung'],

  texte: {
    tiktok: {
      titel: 'Wattis Anbieter schreibt ihm einen Brief',
      beschreibung: 'Roaming im Ausland: Was passiert, bevor überhaupt etwas kostet.',
      hashtags: ['#roaming', '#ausland', '#handyvertrag', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Anbieter schreibt ihm einen Brief',
      beschreibung: 'Roaming im Ausland: Vor jedem Aufschlag steht ein Hinweis und mindestens zwei Wochen.',
      hashtags: ['#roaming', '#ausland', '#workation', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was passiert, bevor Roaming etwas kostet',
      beschreibung: 'Roaming im Ausland: Was die EU über Beobachtungszeitraum und Inlandsaufenthalt schreibt.',
      hashtags: ['#roaming', '#ausland', '#eu', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
