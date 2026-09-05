import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · der Supermarkt muss den alten Föhn nehmen.
 *
 * **Szenario 8, drittes Beispiel: Der Rückfall.** Watti versteht alles und
 * traegt den Foehn am Ende wieder nach Hause — der Schlusssatz fuehrt zurueck
 * auf „liegt seit einem Jahr in der Schublade".
 *
 * **Die Grenze ist die groesste Abmessung, nicht das Gewicht.** § 17 ElektroG
 * sagt „in keiner aeusseren Abmessung groesser als 25 Zentimeter" — daraus
 * „unter 25 Zentimeter" zu machen waere schon eine Verschiebung, und „klein"
 * erst recht.
 *
 * **Und der Supermarkt ist nicht irgendein Laden.** Die Pflicht haengt an
 * 800 Quadratmetern Gesamtverkaufsflaeche **und** daran, dass er ueberhaupt
 * Elektrogeraete fuehrt. Volti sagt beides, weil der halbe Satz sonst zu einer
 * Regel fuer jeden Kiosk wuerde.
 */
export const elektroschrottSupermarkt: Short = {
  id: 'elektroschrott-supermarkt',
  themaId: 'elektroschrott-ruecknahme',
  format: 'gibtswirklich',
  sachgebiet: 'recht',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Föhn fährt wieder mit heim',
  weitererzaehlt: 'größer als 25 Zentimeter',
  suchbegriff: 'Elektroschrott abgeben',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Der Föhn liegt seit einem Jahr da, zum Wertstoffhof komme ich nie.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'karton' },
  },
  vorspann: 'Wattis Föhn fährt wieder mit heim',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, was liegt da für ein Elektroschrott rum? Der alte Föhn. Der wartet seit einem Jahr auf den Wertstoffhof.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, was liegt da für ein Elektroschrott rum?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'rechtfertigung',
          text: 'Der alte Föhn. Der wartet seit einem Jahr auf den Wertstoffhof.',
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
      quelleId: 'elektrog-17-ruecknahme',
      belegId: 'lebensmittel-achthundert-quadratmeter',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext:
        'Du kannst ihn morgen beim Einkaufen abgeben. In den Supermarkt? Wenn er groß genug ist und Elektrogeräte führt, muss er ihn nehmen.',
      rede: [
        { sprecher: 'nachleser', zug: 'bitten', text: 'Du kannst ihn morgen beim Einkaufen abgeben.' },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'In den Supermarkt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Wenn er groß genug ist und Elektrogeräte führt, muss er ihn nehmen.',
          quelleId: 'elektrog-17-ruecknahme',
          belegId: 'lebensmittel-achthundert-quadratmeter',
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
      zitat: 'Altgeräte, die in keiner äußeren Abmessung größer als 25 Zentimeter sind',
      quelleId: 'elektrog-17-ruecknahme',
      belegId: 'fuenfundzwanzig-zentimeter',
      sprechtext:
        'Und was ist mit meinem Föhn? Nichts an ihm darf größer als 25 Zentimeter sein. Der ist kleiner. Dann nehmen die dir den ab.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was ist mit meinem Föhn?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Nichts an ihm darf größer als 25 Zentimeter sein.',
          quelleId: 'elektrog-17-ruecknahme',
          belegId: 'fuenfundzwanzig-zentimeter',
        },
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Der ist kleiner.' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann nehmen die dir den ab.',
          quelleId: 'elektrog-17-ruecknahme',
          belegId: 'fuenfundzwanzig-zentimeter',
        },
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
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'elektrog-17-ruecknahme',
      belegId: 'kein-kaufzwang-drei-stueck',
      sprechtext:
        'Und was muss ich dafür kaufen? Nichts. Die Rücknahme darf nicht an einen Kauf geknüpft werden. Und wie viele darf ich bringen?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'falscherschluss', text: 'Und was muss ich dafür kaufen?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Nichts. Die Rücknahme darf nicht an einen Kauf geknüpft werden.',
          quelleId: 'elektrog-17-ruecknahme',
          belegId: 'kein-kaufzwang-drei-stueck',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wie viele darf ich bringen?' },
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
      satz: 'Drei Altgeräte je Art, ohne einen Cent Umsatz.',
      sprechtext:
        'Drei pro Geräteart. Dann bin ich morgen den Föhn los. Danke großer Bruder. Leg ihn schon mal an die Tür. Mach ich gleich.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Drei pro Geräteart.',
          quelleId: 'elektrog-17-ruecknahme',
          belegId: 'kein-kaufzwang-drei-stueck',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          text: 'Dann bin ich morgen den Föhn los. Danke großer Bruder.',
        },
        { sprecher: 'nachleser', zug: 'bitten', text: 'Leg ihn schon mal an die Tür.' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'gestaendnis',
          text: 'Mach ich gleich.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'ruhe',
        gegenueber: { von: 'erklaeren', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „Mach ich gleich" schon die Antwort auf „seit einem Jahr" – der Föhn bleibt liegen, und beide wissen es.',
    },
  ],

  quellenIds: ['elektrog-17-ruecknahme'],

  texte: {
    tiktok: {
      titel: 'Wattis Föhn fährt wieder mit heim',
      beschreibung: 'Elektroschrott abgeben: Wo du ihn loswirst, ohne etwas zu kaufen.',
      hashtags: ['#elektroschrott', '#recycling', '#supermarkt', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Föhn fährt wieder mit heim',
      beschreibung: 'Elektroschrott abgeben: 25 Zentimeter, kostenlos, ohne Kaufzwang.',
      hashtags: ['#elektroschrott', '#recycling', '#nachhaltigkeit', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Wo du alte Geräte kostenlos loswirst',
      beschreibung: 'Elektroschrott abgeben: Was § 17 ElektroG über die Rücknahmepflicht schreibt.',
      hashtags: ['#elektroschrott', '#recycling', '#elektrog', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
