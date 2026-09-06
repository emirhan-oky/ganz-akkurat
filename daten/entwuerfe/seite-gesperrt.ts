import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · Die Seite ist nicht kaputt, sie ist gesperrt.
 *
 * **Der Fall, den `absicht` beschreibt, im Reinzustand:** Watti haelt seinen
 * Router fuer defekt, und es ist eine Entscheidung — sie steht in § 8 DDG.
 *
 * **Die Norm ist enger, als sie klingt, und genau daraus lebt der Short.** Drei
 * Einschraenkungen stehen im selben Paragrafen, und jede kippt eine Erwartung:
 *
 * 1. Es geht **nur um geistiges Eigentum**, nicht um beliebige
 *    Rechtsverletzungen.
 * 2. Die Sperre ist das **letzte Mittel** — sie kommt erst, wenn dem
 *    Rechteinhaber kein anderer Weg bleibt.
 * 3. Die Kosten dafuer traegt der Rechteinhaber **selbst**; erstattet bekommt
 *    er sie nicht, es sei denn, der Anbieter macht absichtlich mit.
 *
 * **Der Adressat ist der Zugangsvermittler, nicht die Plattform.** Absatz 1
 * spricht von einem Dienst, der Informationen „in einem Kommunikationsnetz zu
 * uebermitteln" oder „den Zugang zu einem Kommunikationsnetz zu vermitteln"
 * hat — das ist der Internetanbieter. Der Dialog sagt deshalb durchweg „dein
 * Anbieter" und nie „die Plattform"; die Verwechslung waere die naheliegendste
 * Ueberdehnung dieses Shorts.
 *
 * **Die Bauform ist eine Wechselrede**, und das ist der Grund, warum dieser
 * Entwurf ueberhaupt entstanden ist: Am 06.09.2026 standen 25 Zitatkarten
 * gegen drei Wechselreden und zwei Stationen im ungesendeten Vorrat. Der
 * Engpass war nie das Thema.
 */
export const seiteGesperrt: Short = {
  id: 'seite-gesperrt',
  themaId: 'netzsperre-rechteinhaber',
  format: 'absicht',
  sachgebiet: 'netz',
  bauform: 'wechselrede',
  arbeitstitel: 'Watti schiebt es auf den Router, es war die Sperre',
  weitererzaehlt: 'Gesperrt vielleicht',
  suchbegriff: 'Seite gesperrt Anbieter',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Die Seite lädt nicht. Der Router blinkt wie immer.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'blatt' },
  },
  vorspann: 'Wattis Seite und der heile Router',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, meine Seite ist weg. Bei dir auch? Welche denn? Die mit den Serien.',
      rede: [
        { sprecher: 'zeiger', zug: 'bitten', text: 'Volti, meine Seite ist weg. Bei dir auch?' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Welche denn?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Die mit den Serien.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'zeigen',
        gegenueber: { von: 'ruhe', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'ddg-8-sperrung',
      belegId: 'nur-wenn-keine-andere-moeglichkeit',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext:
        'Eine Seite kann doch nicht einfach verschwinden. Verschwunden ist sie nicht, du Pfosten. Gesperrt vielleicht. Wer sperrt sowas? Ein Rechteinhaber kann das vom betroffenen Anbieter verlangen, wenn er sonst nicht weiterkommt.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'widersprechen',
          machart: 'rueckfrage',
          text: 'Eine Seite kann doch nicht einfach verschwinden.',
        },
        {
          sprecher: 'nachleser',
          zug: 'umdeuten',
          machart: 'banaleaufloesung',
          text: 'Verschwunden ist sie nicht, du Pfosten. Gesperrt vielleicht.',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Wer sperrt sowas?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ein Rechteinhaber kann das vom betroffenen Anbieter verlangen, wenn er sonst nicht weiterkommt.',
          quelleId: 'ddg-8-sperrung',
          belegId: 'nur-wenn-keine-andere-moeglichkeit',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'nachdenken',
        nach: 'erklaeren',
        gegenueber: { von: 'zeigen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'ddg-8-sperrung',
      belegId: 'nur-geistiges-eigentum',
      sprechtext:
        'Von meinem Anbieter? Von dem, über den die Verletzung läuft. Und bei jedem Streit? Es geht um das Recht am geistigen Eigentum. Dann ist mein halbes Internet bald leer. Und zumutbar muss sie sein.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Von meinem Anbieter?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Von dem, über den die Verletzung läuft.',
          quelleId: 'ddg-8-sperrung',
          belegId: 'nur-wenn-keine-andere-moeglichkeit',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und bei jedem Streit?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Es geht um das Recht am geistigen Eigentum.',
          quelleId: 'ddg-8-sperrung',
          belegId: 'nur-geistiges-eigentum',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'katastrophe',
          text: 'Dann ist mein halbes Internet bald leer.',
        },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Und zumutbar muss sie sein.',
          quelleId: 'ddg-8-sperrung',
          belegId: 'zumutbar-und-verhaeltnismaessig',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'ddg-8-sperrung',
      belegId: 'keine-kostenerstattung',
      sprechtext:
        'Und der Anbieter zahlt? Seine Kosten für die Durchsetzung kriegt er nicht. Dann lohnt sich das doch gar nicht. Die kriegt er nur, wenn der Anbieter absichtlich mitmacht.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und der Anbieter zahlt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Seine Kosten für die Durchsetzung kriegt er nicht.',
          quelleId: 'ddg-8-sperrung',
          belegId: 'keine-kostenerstattung',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'uebercompliance',
          text: 'Dann lohnt sich das doch gar nicht.',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Die kriegt er nur, wenn der Anbieter absichtlich mitmacht.',
          quelleId: 'ddg-8-sperrung',
          belegId: 'keine-kostenerstattung',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'staunen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Der Router ist heil, die Entscheidung steht im Gesetz.',
      sprechtext:
        'Ich schreibe meinem Anbieter, dass die Serie mir gehört. Du besitzt nicht mal den Fernseher dafür. Dann sperre ich dir den Fernseher.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'falscheautoritaet',
          text: 'Ich schreibe meinem Anbieter, dass die Serie mir gehört.',
        },
        {
          sprecher: 'nachleser',
          zug: 'widersprechen',
          machart: 'nebenbemerkung',
          text: 'Du besitzt nicht mal den Fernseher dafür.',
        },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'umdeutung',
          text: 'Dann sperre ich dir den Fernseher.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'ansprechen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „der Router blinkt wie immer" schon die Auflösung: Am Gerät war nie etwas.',
    },
  ],

  quellenIds: ['ddg-8-sperrung'],

  texte: {
    tiktok: {
      titel: 'Watti schiebt es auf den Router, es war die Sperre',
      beschreibung:
        'Seite gesperrt beim Anbieter: Wer eine Sperre verlangen darf, und warum sie das letzte Mittel ist.',
      hashtags: ['#internet', '#technikwissen', '#netzsperre', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti schiebt es auf den Router, es war die Sperre',
      beschreibung:
        'Seite gesperrt beim Anbieter: Nur beim geistigen Eigentum, nur als letztes Mittel, und die Kosten trägt der Rechteinhaber.',
      hashtags: ['#internet', '#technikwissen', '#recht', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Wenn eine Seite gesperrt ist, zahlt der Rechteinhaber',
      beschreibung:
        'Seite gesperrt beim Anbieter: Was § 8 DDG über die Sperrung und über die Kosten sagt.',
      hashtags: ['#internet', '#recht', '#technikwissen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
