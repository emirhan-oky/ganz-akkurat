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
 * weitergegeben hat. Er hatte recht — damals.
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
 *
 * **Die erste Umsetzung dieser Regel klang abgehackt**, und zwar aus zwei
 * Gruenden, die beide in Szene 2 sassen: Sie zeigte von aussen auf die
 * Erzaehlung („der Memory-Effekt aus dem Maerchen") und warf dabei einen
 * Fachbegriff ein, den die Geschichte nie eingefuehrt hatte. Damit war das
 * Maerchen nach einem Satz vorbei und der Rest eine Richtigstellung.
 *
 * **Und dann fehlte der Pointe ihr Aufbau.** Der Nachschlag heisst „Dein Vater
 * hatte recht. Achtundneunzig." — er zielt auf jemanden, der die Regel
 * weitergegeben hat. Genau dieser Jemand stand in der ersten Fassung in Szene
 * 3 („Also lernten alle: erst ganz leer, dann ganz voll") und ist beim
 * Verschieben des Maerchens in den Aufschlag mitverschwunden. Uebrig blieb
 * eine Antwort auf eine Frage, die das Video nie gestellt hatte.
 *
 * Der Aufschlag ist deshalb **kein Erzaehleroeffner mehr, sondern ein Zitat**:
 * „Dein Vater sagt: erst ganz leer, dann ganz voll." Damit steht die Person im
 * ersten Satz, die Regel liegt auf dem Tisch, und der Nachschlag hat ein Ziel.
 * Die Denkpause dahinter ist der Aufbau, nicht Atmosphaere.
 *
 * Dass „Es war einmal" dabei nicht mehr woertlich faellt, ist keine
 * Abweichung: Der gesprochene Opener variiert bewusst, die Wiedererkennung
 * traegt die Formatpille. Das Maerchen steckt in der Sache — eine Regel, die
 * einmal gestimmt hat —, nicht in der Formel.
 */
export const akkuLeerlaufen: Short = {
  id: 'akku-leerlaufen',
  themaId: 'akku-tiefentladung',
  format: 'eswareinmal',
  sachgebiet: 'laden',
  arbeitstitel: 'Der Akku, den man leer laufen lassen musste',
  weitererzaehlt: 'Dein Akku merkt sich nichts. Ihn ganz leer zu machen schadet ihm sogar.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Vater sagt: erst ganz leer, dann ganz voll.',
      text: 'Erst ganz leer, dann ganz voll.',
      symbol: 'batterie',
      // Die Pause ist der Aufbau. Der Satz muss stehen bleiben, sonst ist er
      // eine Behauptung statt eines Zitats — und der Nachschlag zielt darauf.
      pauseSek: 0.9,
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Dein Akku merkt sich aber nichts. Gar nichts.',
      text: 'Dein Akku merkt sich nichts.',
      hervorhebung: 'nichts',
      symbol: 'kreuz',
      quelleId: 'uba-akku-laden',
      belegId: 'der-memory-effekt-tritt',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Das Umweltbundesamt rät, ihn gar nicht erst leer werden zu lassen.',
      text: 'Lass ihn gar nicht erst leer werden.',
      symbol: 'steckdose',
      quelleId: 'uba-akku-laden',
      belegId: 'wenn-sie-nicht-warten',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Ihn ganz leer zu machen schadet ihm sogar.',
      text: 'Ganz leer machen schadet ihm.',
      hervorhebung: 'schadet',
      symbol: 'warndreieck',
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
      symbol: 'thermometer',
      quelleId: 'uba-akku-laden',
      belegId: 'u-berma-ssige-erwa',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      // Hier stand „Achtundneunzig." und sollte trocken zurueckdatieren. Es
      // hat zweierlei nicht getan: Als einzelnes Wort nach einem Punkt liest
      // sich eine Jahreszahl nicht als Jahreszahl, und belegt war sie ohnehin
      // nicht — dieselbe erfundene Genauigkeit wie die 29 Euro am Donnerstag.
      // „Damals." macht dieselbe Bewegung in einem Wort, das jeder sofort hat.
      sprechtext: 'Dein Vater hatte recht. Damals.',
      satz: 'Dein Vater hatte recht. Damals.',
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
