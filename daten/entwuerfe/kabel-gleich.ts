import type { Short } from '../../src/typen';

/**
 * Mittwoch · Das ist Absicht · zwei Kabel, ein Stecker, kein Unterschied zu sehen.
 *
 * Der Sendeplatz verlangt jemanden, der es **entschieden** hat. Den gibt es
 * hier: Das USB Implementers Forum hat den Stecker so genormt, dass er bei
 * jeder Leistungsklasse gleich aussieht — und die Kennzeichnungspflicht, die
 * das Problem loest, kam erst hinterher.
 *
 * Wichtig fuer die Abgrenzung zum Donnerstag: Hier geht es nicht darum, dass
 * jemand zu viel bezahlt hat, sondern darum, dass er es am Regal nicht
 * erkennen konnte. Der Aerger richtet sich gegen die Norm, nicht gegen den
 * eigenen Kassenbon.
 *
 * **In Szene 3 stand bis zum 17.08.2026 „Kein Zufall. Ein Gremium hat das so
 * festgelegt."** Der Satz hing an einer Quelle ueber Leistungsklassen und
 * behauptete etwas ueber eine **Absicht** — belegt war davon kein Wort.
 * Aufgefallen ist er, als jede Szene das einzelne Zitat nennen musste, das sie
 * traegt: Fuer „kein Zufall" gab es keins. Was das Gremium wirklich getan hat,
 * steht dagegen woertlich da, und es reicht voellig — es hat festgelegt, was
 * ein Kabel koennen muss, und die Kennzeichnung, woran man das erkennt, kam
 * Jahre spaeter. Der Aerger bleibt derselbe, nur ist er jetzt belegt.
 */
export const kabelGleich: Short = {
  id: 'kabel-gleich',
  themaId: 'usb-kabelklassen',
  format: 'absicht',
  sachgebiet: 'laden',
  arbeitstitel: 'Zwei Kabel, ein Stecker, kein Unterschied zu sehen',
  weitererzaehlt: 'Das eine trägt sechzig Watt, das andere zweihundertvierzig.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Zwei Kabel. Eins lädt dein Notebook, eins nicht.',
      text: 'Zwei Kabel. Eins lädt, eins nicht.',
      symbol: 'kabel',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      // „Gleiche Dicke" war eine Aussage ueber das Aussehen, und die traegt das
      // Zitat nicht — es sagt, dass man es ohne Aufdruck nicht weiss.
      sprechtext: 'Gleicher Stecker. Was drinsteckt, siehst du am Regal nicht.',
      text: 'Am Regal siehst du es nicht.',
      symbol: 'stecker',
      quelleId: 'usbif-kabel-kennzeichnung',
      belegId: 'must-be-labelled-with',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Ein Gremium hat festgelegt, was so ein Kabel können muss.',
      text: 'Ein Gremium legt fest, was es können muss.',
      hervorhebung: 'können',
      symbol: 'stempel',
      quelleId: 'usbif-power-delivery',
      belegId: 'define-240w-cable-requirements',
    },
    {
      art: 'vergleich',
      position: 'kipppunkt',
      sprechtext: 'Das eine trägt sechzig Watt, das andere zweihundertvierzig.',
      ueberschrift: 'Von außen nicht zu unterscheiden',
      quelleId: 'usbif-kabel-kennzeichnung',
      belegId: 'must-be-labelled-with',
      herausgeber: 'USB Implementers Forum',
      links: { titel: '60 Watt', zeilen: ['reicht fürs Telefon', 'Notebook: nein'], bewertung: 'achtung' },
      rechts: { titel: '240 Watt', zeilen: ['reicht für alles', 'Chip im Stecker'], bewertung: 'ja' },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      // „Jahre später" war eine Zeitangabe ohne Fundstelle. Das Zitat sagt, dass
      // die Pflicht **ausgeweitet** wurde — also nachtraeglich, nicht von Anfang an.
      sprechtext: 'Ein Aufdruck klärt das. Pflicht wurde er erst nachträglich.',
      text: 'Der Aufdruck kam nachträglich.',
      symbol: 'anhaenger',
      quelleId: 'usbif-kabel-kennzeichnung',
      belegId: 'the-policy-now-extends',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Ein Strich auf dem Stecker. So schwer war das.',
      satz: 'Ein Strich auf dem Stecker.',
      rundlauf:
        '„Ein Strich auf dem Stecker." trifft auf „Zwei Kabel." — man sucht beim zweiten Mal den fehlenden Strich.',
    },
  ],

  quellenIds: ['usbif-kabel-kennzeichnung', 'usbif-power-delivery'],

  texte: {
    tiktok: {
      titel: 'Warum alle USB-C-Kabel gleich aussehen',
      beschreibung: '',
      hashtags: ['#usbc', '#technik', '#kabel', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Warum alle USB-C-Kabel gleich aussehen',
      beschreibung: '',
      hashtags: ['#usbc', '#technik', '#kabel', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Warum alle USB-C-Kabel gleich aussehen',
      beschreibung: '',
      hashtags: ['#usbc', '#technik', '#kabel', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
