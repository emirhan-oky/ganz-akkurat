import type { Short } from '../../src/typen';

/**
 * Mittwoch, 12 Uhr · Neu und keiner sagt es dir · das Produktpassregister.
 *
 * Gefunden hat es `npm run neuigkeiten`: aus 614 in Kraft getretenen
 * Rechtsakten wurden 316 Verordnungen, daraus 120 gelesene Volltexte, daraus
 * elf Kandidaten — und dieser ist zwoelf Tage alt.
 *
 * Der Rechtsakt selbst ist Verwaltungstechnik und traegt kein Video. Was ihn
 * erzaehlbar macht, steht in der Batterieverordnung, auf die er verweist: Der
 * Zugang zu diesem Pass ist ein **QR-Code auf der Batterie**. Kein Konto,
 * keine Behoerde, kein Antrag — abfotografieren genuegt.
 */
export const produktpassRegister: Short = {
  id: 'produktpass-register',
  themaId: 'digitaler-produktpass',
  format: 'absicht',
  sachgebiet: 'recht',
  arbeitstitel: 'Seit dem 6. August gibt es das Register',
  weitererzaehlt: 'Der Zugang ist ein Code auf der Batterie. Du hältst die Kamera drauf.',
  suchbegriff: 'Akku Register',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Akku hat jetzt einen Ausweis.',
      text: 'Dein Akku hat einen Ausweis.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'staunen', requisite: 'karteikarte' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Seit August zweitausendsechsundzwanzig gibt es ein Register dafür.',
      text: 'Seit August 2026: ein Register.',
      buehne: { art: 'figur', von: 'staunen', nach: 'zeigen', requisite: 'ordner' },
      quelleId: 'eu-produktpassregister',
      belegId: 'digitales-register-produktpass',
      herausgeber: 'Europäische Union',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Darin steht eine Kennung. Je Produkt, nicht je Modell.',
      text: 'Eine Kennung. Je Produkt.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'erklaeren', stand: 'rechts' },
      hervorhebung: 'Je Produkt',
      quelleId: 'eu-produktpassregister',
      belegId: 'eindeutige-produktkennung-gespeichert',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Der Zugang ist ein Code auf der Batterie. Du hältst die Kamera drauf.',
      text: 'Ein Code auf der Batterie.',
      buehne: { art: 'figur', von: 'stutzen', nach: 'hochschauen', requisite: 'qrcode', stand: 'klein' },
      quelleId: 'eu-batterie-entnehmbar',
      belegId: 'ueber-den-qr-code-zugriff',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Ab Februar zweitausendsiebenundzwanzig für alle Batterien.',
      text: 'Ab Februar 2027 für alle.',
      buehne: {
        art: 'gegenueber',
        oben: { etikett: 'JETZT', symbol: 'batterie' },
        unten: { etikett: 'AB 2027', symbol: 'kalender' },
      },
      quelleId: 'eu-batterie-entnehmbar',
      belegId: 'ab-dem-18-februar-2027',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Erfahren hast du es hier.',
      satz: 'Erfahren hast du es hier.',
      rundlauf:
        '„Erfahren hast du es hier." trifft auf „Seit August zweitausendsechsundzwanzig." — das Datum wird beim zweiten Mal zum Vorwurf an alle anderen.',
    },
  ],

  quellenIds: ['eu-produktpassregister', 'eu-batterie-entnehmbar'],

  texte: {
    tiktok: {
      titel: 'Der Code auf der Batterie führt zum Register',
      beschreibung: 'Akku im Register: seit August gibt es zu jedem einzelnen einen Eintrag.',
      hashtags: ['#batteriepass', '#akku', '#produktpass', '#eurecht', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Der Code auf der Batterie führt zum Register',
      beschreibung: 'Der Akku hat einen Ausweis, das Register dazu steht seit August offen.',
      hashtags: ['#akku', '#nachhaltigkeit', '#eu', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Der Code auf der Batterie führt zum Register',
      beschreibung: 'Akku und Register: der Code auf der Batterie führt hin.',
      hashtags: ['#akku', '#produktpass', '#eu', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
