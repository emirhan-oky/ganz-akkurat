import type { Short } from '../../src/typen';

/**
 * Dienstag · Es war einmal · der Akku, den man leer laufen lassen musste.
 *
 * Das Maerchen im Wortsinn erzaehlt: „Es war einmal ein Akku." Der Sendeplatz
 * lebt davon, dass **niemand gelogen hat** — die Regel stimmte, solange
 * Nickel-Cadmium in den Geraeten steckte. Die Technik hat sich unter ihr
 * weggedreht, und die Regel ist stehen geblieben.
 *
 * Deshalb trifft die Pointe die Regel und nicht den Vater, der sie
 * weitergegeben hat. Er hatte recht, nur eben 1998.
 *
 * **Die erste Fassung war unbelegt, und zwar in der Mitte.** Die Szenen 2 und 3
 * erzaehlten das Maerchen aus — „Lud man zwischendurch, merkte er es sich" —
 * und hingen dabei an der UBA-Quelle, die ausschliesslich in der Gegenwart
 * spricht. Aufgefallen ist es erst, als die Szenen sich an ein **einzelnes
 * Zitat** binden mussten: Fuer die Vergangenheit gab es keins.
 *
 * Daraus die Bauregel fuer diesen Sendeplatz: **Das „es war einmal" passt in
 * den Aufschlag und nur dorthin.** Der ist die einzige Position ohne
 * Belegpflicht, und das ist kein Schlupfloch, sondern die richtige Stelle — er
 * setzt die Erzaehlung, er behauptet nichts. Alles danach laeuft in der
 * Gegenwart und steht auf einem Satz des Umweltbundesamts.
 */
export const akkuLeerlaufen: Short = {
  id: 'akku-leerlaufen',
  themaId: 'akku-tiefentladung',
  format: 'eswareinmal',
  sachgebiet: 'laden',
  arbeitstitel: 'Der Akku, den man leer laufen lassen musste',
  weitererzaehlt: 'Einen Memory-Effekt hat dein Akku nicht. Ihn leer laufen zu lassen schadet ihm.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Es war einmal ein Akku, der leer werden musste.',
      text: 'Es war einmal ein Akku.',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Der Memory-Effekt aus dem Märchen? Hat deiner nicht.',
      text: 'Kein Memory-Effekt.',
      hervorhebung: 'Kein',
      quelleId: 'uba-akku-laden',
      belegId: 'der-memory-effekt-tritt',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Das Umweltbundesamt rät, gar nicht erst zu warten, bis er leer ist.',
      text: 'Warte gar nicht erst, bis er leer ist.',
      quelleId: 'uba-akku-laden',
      belegId: 'wenn-sie-nicht-warten',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Ihn vollständig zu entleeren schadet ihm sogar.',
      text: 'Ganz leer machen schadet ihm.',
      hervorhebung: 'schadet',
      quelleId: 'uba-akku-laden',
      belegId: 'eine-vollstaendige-entleerung',
      herausgeber: 'Umweltbundesamt',
    },
    {
      art: 'einschraenkung',
      position: 'kipppunkt',
      sprechtext: 'Altern lässt ihn die Wärme. Nicht der Ladestand.',
      ueberschrift: 'Der eigentliche Schuldige',
      bedingung: 'Nicht der Ladestand',
      folge: 'Übermäßige Wärme lässt den Akku schneller altern',
      quelleId: 'uba-akku-laden',
      belegId: 'u-berma-ssige-erwa',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Dein Vater hatte recht. Achtundneunzig.',
      satz: 'Dein Vater hatte recht. 1998.',
    },
  ],

  quellenIds: ['uba-akku-laden'],

  texte: {
    tiktok: {
      titel: 'Wärme altert den Akku, nicht der Ladestand',
      beschreibung: '',
      hashtags: ['#akku', '#technik', '#techmythen', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wärme altert den Akku, nicht der Ladestand',
      beschreibung: '',
      hashtags: ['#akku', '#technik', '#techmythen', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Wärme altert den Akku, nicht der Ladestand',
      beschreibung: '',
      hashtags: ['#akku', '#technik', '#techmythen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
