import type { Short } from '../../src/typen';

/**
 * Sonntag · Wer hat recht? · der private Modus.
 *
 * Der Sendeplatz verlangt, dass **beide** Seiten etwas uebersehen — sonst ist
 * es ein Maerchen und gehoert auf den Dienstag. Hier ist die Bedingung sauber
 * erfuellt: Die einen halten den privaten Modus fuer eine Tarnkappe, die
 * anderen fuer wirkungslos, und beide reden ueber **Cookies und Verlauf**.
 *
 * Das Dritte ist der Fingerabdruck. Er arbeitet mit anderem Material, und
 * genau deshalb aendert das Loeschen von Cookies an ihm nichts — das BSI
 * schreibt woertlich, dass er auf deutlich mehr Daten zurueckgreift und
 * deutlich schwerer zu verhindern ist.
 *
 * Der Streitfall steht im Aufschlag, der belegfrei sein darf: Was zwei Lager
 * behaupten, ist keine Aussage ueber die Welt. Die Zuspitzung darunter ist
 * eine, und die ist belegt.
 */
export const privaterModus: Short = {
  id: 'privater-modus',
  themaId: 'privater-modus-browser',
  format: 'werhatrecht',
  sachgebiet: 'netz',
  arbeitstitel: 'Beide streiten über Cookies',
  weitererzaehlt: 'Beide reden über Cookies. Der Fingerabdruck bleibt davon unberührt.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Tarnkappe oder Placebo?',
      text: 'Tarnkappe oder Placebo?',
      symbol: 'sprechblase',
    },
    {
      art: 'vergleich',
      position: 'zuspitzung',
      sprechtext: 'Cookies protokollieren dein Nutzungsverhalten. Darum geht der Streit.',
      links: { titel: 'Unsichtbar', zeilen: ['Niemand sieht mich'] },
      rechts: { titel: 'Bringt nichts', zeilen: ['Reine Kosmetik'] },
      quelleId: 'bsi-fingerprints',
      belegId: 'protokollieren-des-nutzungsverhaltens',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Beide reden über Cookies. Der Fingerabdruck bleibt davon unberührt.',
      text: 'Beide reden über Cookies.',
      symbol: 'karteikarte',
      hervorhebung: 'Cookies',
      quelleId: 'bsi-fingerprints',
      belegId: 'protokollieren-des-nutzungsverhaltens',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Fingerprints greifen auf deutlich mehr Daten zurück als Cookies.',
      text: 'Fingerprints nutzen mehr Daten.',
      symbol: 'lupe',
      quelleId: 'bsi-fingerprints',
      belegId: 'fingerprints-mehr-daten-als-cookies',
    },
    {
      art: 'einschraenkung',
      position: 'kipppunkt',
      sprechtext: 'Ihre Erstellung zu verhindern ist deutlich schwieriger.',
      bedingung: 'Cookies gelöscht, Verlauf leer',
      folge: 'der Fingerabdruck bleibt',
      symbol: 'warndreieck',
      quelleId: 'bsi-fingerprints',
      belegId: 'deutlich-schwieriger-zu-verhindern',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Gegen was genau war der Modus noch mal?',
      satz: 'Gegen was war der Modus noch mal?',
      rundlauf:
        '„Gegen was war der Modus noch mal?" trifft auf „Tarnkappe oder Placebo?" — die Streitfrage steht nach der Antwort offener als vorher.',
    },
  ],

  quellenIds: ['bsi-fingerprints'],

  texte: {
    tiktok: {
      titel: 'Der Streit dreht sich um Cookies',
      beschreibung: '',
      hashtags: ['#browser', '#datenschutz', '#technik', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Der Streit dreht sich um Cookies',
      beschreibung: '',
      hashtags: ['#browser', '#datenschutz', '#technik', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Der Streit dreht sich um Cookies',
      beschreibung: '',
      hashtags: ['#browser', '#datenschutz', '#technik', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
