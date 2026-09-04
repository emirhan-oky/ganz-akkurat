import type { Short } from '../../src/typen';

/**
 * Es war einmal · Die Stoererhaftung fuers offene WLAN.
 *
 * **Szenario 8, viertes Beispiel: Der Rueckfall.** Watti versteht alles und
 * rueckt das Passwort am Ende trotzdem nicht heraus — **im Gespraech, ohne
 * Zeitsprung.** Der Short spielt in einem Raum, und der einzige Schnitt ist der
 * Vorhang; „nächste Woche" ist derselbe Rueckfall wie „und, hast du es
 * rausgegeben?", nur sichtbar.
 *
 * **Das „und heute" sind zwei Normen.** Die Haftungsfreistellung steht seit dem
 * Digitale-Dienste-Gesetz nicht mehr im TMG, sondern in Artikel 4 der
 * Verordnung (EU) 2022/2065; was dem Rechteinhaber bleibt, steht in § 8 DDG —
 * eine Sperrung, zumutbar und verhaeltnismaessig, und **keine Kosten**.
 *
 * Genau die Kosten waren frueher das Druckmittel, und deshalb traegt der Short
 * sie als Zitatkarte.
 */
export const wlanPasswortAbmahnung: Short = {
  id: 'wlan-passwort-abmahnung',
  themaId: 'stoererhaftung-wlan',
  format: 'gibtswirklich',
  sachgebiet: 'netz',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti hütet ein Passwort vor einer Gefahr, die es nicht gibt',
  weitererzaehlt: 'haftet nicht für das, was durchläuft',
  suchbegriff: 'WLAN Abmahnung',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Mein WLAN-Passwort kriegt keiner. Ich will keine Abmahnung.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'nachbarhaeuser' },
  },
  vorspann: 'Wattis WLAN-Passwort bleibt geheim',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, warum kriegt mein Besuch dein WLAN-Passwort nicht? Weil ich dann für alles hafte, was der macht.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, warum kriegt mein Besuch dein WLAN-Passwort nicht?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Weil ich dann für alles hafte, was der macht.' },
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
      quelleId: 'dsa-4-reine-durchleitung',
      belegId: 'haftet-nicht-fuer-uebermittelte',
      herausgeber: 'Europäisches Parlament und Rat',
      sprechtext:
        'Wer einen Internetzugang über sein WLAN bereitstellt, haftet nicht für das, was durchläuft. Ich stelle doch nichts bereit, ich gebe ein Passwort raus. Genau das ist es. Auch wenn du nichts dafür nimmst.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Wer einen Internetzugang über sein WLAN bereitstellt, haftet nicht für das, was durchläuft.',
          quelleId: 'ddg-7-verantwortlichkeit',
          belegId: 'internetzugang-ueber-wlan',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'ratlosigkeit',
          text: 'Ich stelle doch nichts bereit, ich gebe ein Passwort raus.',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Genau das ist es. Auch wenn du nichts dafür nimmst.',
          quelleId: 'ddg-7-verantwortlichkeit',
          belegId: 'gilt-auch-ohne-entgelt',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'hochschauen',
        gegenueber: { von: 'nachdenken', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'dsa-4-reine-durchleitung',
      belegId: 'drei-bedingungen-durchleitung',
      sprechtext:
        'Einfach so? Es gibt drei Bedingungen. Du fängst nichts an. Und? Du suchst weder Empfänger noch Daten aus, und du änderst nichts. Das kriege ich hin.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Einfach so?' },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Es gibt drei Bedingungen. Du fängst nichts an.',
          quelleId: 'dsa-4-reine-durchleitung',
          belegId: 'drei-bedingungen-durchleitung',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Du suchst weder Empfänger noch Daten aus, und du änderst nichts.',
          quelleId: 'dsa-4-reine-durchleitung',
          belegId: 'drei-bedingungen-durchleitung',
        },
        { sprecher: 'zeiger', zug: 'einlenken', machart: 'gestaendnis', text: 'Das kriege ich hin.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'hochschauen',
        nach: 'achselzucken',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'ddg-7-verantwortlichkeit',
      belegId: 'kein-schadensersatz-keine-unterlassung',
      sprechtext:
        'Und wenn der was runterlädt? Dann kann dich keiner auf Schadensersatz oder Unterlassung belangen.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn der was runterlädt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann kann dich keiner auf Schadensersatz oder Unterlassung belangen.',
          quelleId: 'ddg-7-verantwortlichkeit',
          belegId: 'kein-schadensersatz-keine-unterlassung',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'achselzucken',
        nach: 'stutzen',
        gegenueber: { von: 'zeigen', nach: 'erklaeren' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'aller Kosten für die Geltendmachung und Durchsetzung dieser Ansprüche',
      quelleId: 'ddg-7-verantwortlichkeit',
      belegId: 'alle-kosten-dieser-ansprueche',
      sprechtext:
        'Und die Abmahnung? Die Kosten dafür genauso wenig. Und wenn ein Anwalt trotzdem schreibt? Seine Kosten zahlst du nicht. Außer du machst absichtlich mit. Mache ich nicht, ich schlafe nachts.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und die Abmahnung?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die Kosten dafür genauso wenig.',
          quelleId: 'ddg-7-verantwortlichkeit',
          belegId: 'alle-kosten-dieser-ansprueche',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn ein Anwalt trotzdem schreibt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Seine Kosten zahlst du nicht. Außer du machst absichtlich mit.',
          quelleId: 'ddg-7-verantwortlichkeit',
          belegId: 'absichtlich-zusammenarbeitet',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'rechtfertigung',
          text: 'Mache ich nicht, ich schlafe nachts.',
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
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Wer nach Artikel 4 nicht haftet, haftet auch nicht auf Unterlassung.',
      sprechtext:
        'Dann gib meinem Besuch jetzt das Passwort. Nächste Woche. Erst lese ich das selber nach.',
      rede: [
        { sprecher: 'nachleser', zug: 'bitten', text: 'Dann gib meinem Besuch jetzt das Passwort.' },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'uebercompliance',
          text: 'Nächste Woche. Erst lese ich das selber nach.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'achselzucken',
        gegenueber: { von: 'lesen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „Ich will keine Abmahnung" die Sorge vor etwas, das es so nicht mehr gibt.',
    },
  ],

  quellenIds: ['ddg-7-verantwortlichkeit', 'dsa-4-reine-durchleitung'],

  texte: {
    tiktok: {
      titel: 'Watti hütet ein Passwort vor einer Gefahr, die es nicht gibt',
      beschreibung: 'WLAN und Abmahnung: Wer den Zugang bereitstellt, haftet nicht für das, was durchläuft.',
      hashtags: ['#wlan', '#abmahnung', '#internetrecht', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti hütet ein Passwort vor einer Gefahr, die es nicht gibt',
      beschreibung: 'WLAN und Abmahnung: Drei Bedingungen, und die Haftung ist weg.',
      hashtags: ['#wlan', '#abmahnung', '#recht', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Für den Besuch in deinem WLAN haftest du nicht',
      beschreibung:
        'WLAN und Abmahnung: Was § 7 DDG und Artikel 4 der Verordnung (EU) 2022/2065 über Zugangsanbieter sagen.',
      hashtags: ['#wlan', '#ddg', '#abmahnung', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
