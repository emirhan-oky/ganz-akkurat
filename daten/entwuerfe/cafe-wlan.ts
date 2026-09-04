import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · das offene WLAN, dessen Betreiber niemand kennt.
 *
 * **Szenario 6, zweites Beispiel: Beide liegen daneben.** Watti sagt, im
 * Café-WLAN liest jeder mit. Volti sagt, heute sei alles verschluesselt. Das
 * BSI redet von keinem von beidem — es redet vom **Betreiber** und von dem,
 * was auf das Geraet kommt.
 *
 * **Voltis Irrtum steht im Aufschlag und nirgends sonst.** Das ist die einzige
 * Position ohne Belegpflicht, und der Streitfall bei `werhatrecht` gehoert
 * dorthin: Was zwei Lager behaupten, ist keine Aussage ueber die Welt.
 *
 * **Und die Quelle hat eine Falle, die keine Wache sieht.** Das BSI schreibt
 * `<abbr>WLAN</abbr>-Netz`; nach dem Strippen der Tags steht dort „WLAN -Netz"
 * mit Leerzeichen, und **jedes Zitat mit dieser Fuge ist fuer
 * `quellen-pruefen` unauffindbar**. Die drei Belege dieser Quelle sind
 * deshalb Saetze ohne sie — gemessen, nicht vermutet.
 */
export const cafeWlan: Short = {
  id: 'cafe-wlan',
  themaId: 'oeffentliches-wlan',
  format: 'werhatrecht',
  sachgebiet: 'netz',
  bauform: 'zitatkarte',
  arbeitstitel: 'Das Café-WLAN gehört jemandem',
  weitererzaehlt: 'Abgreifen und Schadsoftware',
  suchbegriff: 'öffentliches WLAN',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Im Café-WLAN mache ich nichts, da liest doch jeder mit.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'mikrofon' },
  },
  vorspann: 'Wattis Café-WLAN gehört jemandem',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, wer liest im Café-WLAN mit? Alle. Offenes Netz, offene Daten. Heute ist fast alles verschlüsselt.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, wer liest im Café-WLAN mit?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscheautoritaet',
          text: 'Alle. Offenes Netz, offene Daten.',
        },
        { sprecher: 'nachleser', zug: 'widersprechen', text: 'Heute ist fast alles verschlüsselt.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Und warum sagen dann alle, man soll da nichts machen? Weil sie es von früher haben. Wer hat jetzt recht?',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'rueckfrage',
          text: 'Und warum sagen dann alle, man soll da nichts machen?',
        },
        { sprecher: 'nachleser', zug: 'zuspitzen', text: 'Weil sie es von früher haben.' },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Wer hat jetzt recht?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'erklaeren',
        nach: 'stutzen',
        gegenueber: { von: 'stutzen', nach: 'achselzucken' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'Daten können abgegriffen oder Schadsoftware auf Ihr Gerät eingeschleust werden.',
      quelleId: 'bsi-oeffentliches-wlan',
      belegId: 'schadsoftware-eingeschleust',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Keiner von uns beiden. Da steht beides drin. Beides? Abgreifen und Schadsoftware auf deinem Gerät.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Keiner von uns beiden. Da steht beides drin.',
          quelleId: 'bsi-oeffentliches-wlan',
          belegId: 'schadsoftware-eingeschleust',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Beides?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Abgreifen und Schadsoftware auf deinem Gerät.',
          quelleId: 'bsi-oeffentliches-wlan',
          belegId: 'schadsoftware-eingeschleust',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'staunen',
        gegenueber: { von: 'achselzucken', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-oeffentliches-wlan',
      belegId: 'betreiber-nicht-bekannt',
      sprechtext:
        'Ein öffentliches WLAN kann mir was schicken? Wenn du seinen Betreiber nicht kennst, ja. Das ist der Punkt.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Ein öffentliches WLAN kann mir was schicken?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Wenn du seinen Betreiber nicht kennst, ja. Das ist der Punkt.',
          quelleId: 'bsi-oeffentliches-wlan',
          belegId: 'betreiber-nicht-bekannt',
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
      satz: 'Das Risiko hängt an dem, dem das Netz gehört.',
      sprechtext:
        'Und was mache ich? WLAN aus, wenn du es nicht brauchst. Steht so beim Amt. Aus? Das ist die ganze Lösung? Ein ausgeschaltetes WLAN hat keine Angriffsfläche. Dann ist mein Handy nachts das sicherste der Welt.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was mache ich?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'WLAN aus, wenn du es nicht brauchst. Steht so beim Amt.',
          quelleId: 'bsi-oeffentliches-wlan',
          belegId: 'keine-angriffsflaeche',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Aus? Das ist die ganze Lösung?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ein ausgeschaltetes WLAN hat keine Angriffsfläche.',
          quelleId: 'bsi-oeffentliches-wlan',
          belegId: 'keine-angriffsflaeche',
        },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'uebercompliance',
          text: 'Dann ist mein Handy nachts das sicherste der Welt.',
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
        'Beim zweiten Sehen hört man Wattis „da liest doch jeder mit" als die halbe Wahrheit, die es ist – das Problem liegt woanders.',
    },
  ],

  quellenIds: ['bsi-oeffentliches-wlan'],

  texte: {
    tiktok: {
      titel: 'Das Café-WLAN gehört jemandem',
      beschreibung: 'Öffentliches WLAN: Worum es beim Risiko wirklich geht – und worum nicht.',
      hashtags: ['#wlan', '#cybersicherheit', '#bsi', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Das Café-WLAN gehört jemandem',
      beschreibung: 'Öffentliches WLAN: Nicht das Mitlesen ist der Punkt, sondern der Betreiber.',
      hashtags: ['#wlan', '#cybersicherheit', '#hotspot', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Wem gehört das WLAN im Café?',
      beschreibung: 'Öffentliches WLAN: Was das BSI über fremde Netze und Schadsoftware schreibt.',
      hashtags: ['#wlan', '#cybersicherheit', '#bsi', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
