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
  arbeitstitel: 'Der Browser wird dadurch einzigartiger',
  weitererzaehlt: 'Je mehr du dagegen tust, desto einzigartiger wird er.',
  suchbegriff: 'Privates Fenster',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Privates Fenster auf. Und jetzt sieht dich keiner?',
      text: 'Privates Fenster auf.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'zeigen', requisite: 'browserfenster' },
    },
    {
      art: 'vergleich',
      position: 'zuspitzung',
      sprechtext: 'Die einen halten sich für unsichtbar. Die anderen lachen darüber.',
      links: { titel: 'Unsichtbar', zeilen: ['Niemand sieht mich'] },
      rechts: { titel: 'Bringt nichts', zeilen: ['Reine Kosmetik'] },
      quelleId: 'bsi-fingerprints',
      belegId: 'protokollieren-des-nutzungsverhaltens',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Beide meinen Cookies. Die löscht das Fenster wirklich.',
      text: 'Cookies löscht es wirklich.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'erklaeren', stand: 'rechts' },
      quelleId: 'bsi-fingerprints',
      belegId: 'protokollieren-des-nutzungsverhaltens',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Nur erkennt man dich nicht am Cookie. Sondern am Browser selbst.',
      text: 'Erkannt wirst du am Browser.',
      buehne: { art: 'figur', von: 'zeigen', nach: 'nachdenken', requisite: 'lupe' },
      hervorhebung: 'am Browser',
      quelleId: 'bsi-fingerprints',
      belegId: 'fingerprints-mehr-daten-als-cookies',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Und je mehr du dagegen tust, desto einzigartiger wird er.',
      text: 'Je mehr du tust, desto einzigartiger.',
      buehne: {
        art: 'gegenueber',
        oben: { etikett: 'IN DER MASSE', symbol: 'menschen' },
        unten: { etikett: 'EINZIGARTIG', symbol: 'warndreieck' },
      },
      quelleId: 'bsi-fingerprints',
      belegId: 'browser-individueller-werden',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Unsichtbar wird man so nicht.',
      satz: 'Unsichtbar wird man so nicht.',
      rundlauf:
        '„Unsichtbar wird man so nicht." trifft auf „Privates Fenster auf. Und jetzt sieht dich keiner?" — die Frage ist beim zweiten Mal beantwortet, bevor sie fällt.',
    },
  ],

  quellenIds: ['bsi-fingerprints'],

  texte: {
    tiktok: {
      titel: 'Der Browser wird dadurch einzigartiger',
      beschreibung: 'Privates Fenster: Cookies weg, Browser trotzdem erkennbar.',
      hashtags: ['#privatesfenster', '#inkognito', '#browserfingerprint', '#datenschutz', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Der Browser wird dadurch einzigartiger',
      beschreibung: 'Ein privates Fenster löscht Cookies. Erkennbar bleibst du trotzdem.',
      hashtags: ['#datenschutz', '#browser', '#privatsphaere', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Der Browser wird dadurch einzigartiger',
      beschreibung: 'Privates Fenster: was es löscht und woran man dich trotzdem erkennt.',
      hashtags: ['#browser', '#datenschutz', '#inkognito', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
