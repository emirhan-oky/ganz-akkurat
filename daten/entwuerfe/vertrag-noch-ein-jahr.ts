import type { Short } from '../../src/typen';

/**
 * Es war einmal · „Zu spät gekündigt, jetzt hängst du ein Jahr drin."
 *
 * **Das Märchen war lange wahr und ist es seit dem 01.12.2021 nicht mehr.**
 * § 56 TKG lässt einen stillschweigend verlängerten Vertrag jederzeit mit
 * einem Monat Frist kündigen — und die Kündigung darf nichts kosten.
 *
 * **Der Kipppunkt ist die Pflicht, die kaum jemand kennt:** Vor dem
 * Vertragsschluss muss der Anbieter ein Angebot mit höchstens zwölf Monaten
 * Laufzeit machen. Wer 24 Monate unterschreibt, hat sich dagegen entschieden,
 * ohne es zu merken.
 *
 * **Die Fundstelle zur 24-Monats-Obergrenze ist bewusst nicht eingetragen.**
 * Ihr Subjekt steht im Satz davor, und ein Zitat, dessen Bedeutung an Wörtern
 * außerhalb hängt, wird still falsch, sobald die Seite umformuliert.
 */
export const vertragNochEinJahr: Short = {
  id: 'vertrag-noch-ein-jahr',
  themaId: 'vertrag-noch-ein-jahr',
  format: 'eswareinmal',
  sachgebiet: 'recht',
  bauform: 'stationen',
  arbeitstitel: 'Watti hängt freiwillig ein Jahr länger drin',
  weitererzaehlt: 'jederzeit mit einer Frist von einem Monat kündigen',
  suchbegriff: 'Vertrag verlängert',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Kündigung vergessen. Jetzt läuft der Vertrag ein Jahr weiter.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'nachdenken', requisite: 'lupe' },
  },
  vorspann: 'Wattis Vertrag und die Frist, die er nicht kennt',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, mein Handyvertrag hat sich verlängert. Und jetzt? Ein Jahr warten. So ist das eben.',
      rede: [
        { sprecher: 'zeiger', zug: 'behaupten', text: 'Volti, mein Handyvertrag hat sich verlängert.' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und jetzt?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscherschluss',
          text: 'Ein Jahr warten. So ist das eben.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'erklaeren',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'tkg-56-vertragslaufzeit',
      belegId: 'jederzeit-ein-monat-kuendigen',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext:
        'Bei Telefon- und Internetverträgen kannst du dann jederzeit mit einer Frist von einem Monat kündigen, du Pfosten. Ab wann? Nach Ablauf der anfänglichen Laufzeit. Also wenn die Mindestlaufzeit rum ist.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Bei Telefon- und Internetverträgen kannst du dann jederzeit mit einer Frist von einem Monat kündigen, du Pfosten.',
          quelleId: 'tkg-56-vertragslaufzeit',
          belegId: 'jederzeit-ein-monat-kuendigen',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Ab wann?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Nach Ablauf der anfänglichen Laufzeit.',
          quelleId: 'tkg-56-vertragslaufzeit',
          belegId: 'jederzeit-ein-monat-kuendigen',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'umdeutung',
          text: 'Also wenn die Mindestlaufzeit rum ist.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'erklaeren',
        gegenueber: { von: 'erklaeren', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'tkg-56-vertragslaufzeit',
      belegId: 'keine-kosten-durch-kuendigung',
      sprechtext:
        'Und was kostet mich das? Durch eine solche Kündigung dürfen dem Endnutzer keine Kosten entstehen. Nichts?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was kostet mich das?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Durch eine solche Kündigung dürfen dem Endnutzer keine Kosten entstehen.',
          quelleId: 'tkg-56-vertragslaufzeit',
          belegId: 'keine-kosten-durch-kuendigung',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'uebercompliance', text: 'Nichts?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'nachdenken', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'tkg-56-vertragslaufzeit',
      belegId: 'hinweis-vor-verlaengerung',
      sprechtext:
        'Nichts. Der Anbieter muss dich vor einer Verlängerung auf einem dauerhaften Datenträger hinweisen. Das war die Mail, die ich weggewischt habe.',
      rede: [
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Nichts.' },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          text: 'Der Anbieter muss dich vor einer Verlängerung auf einem dauerhaften Datenträger hinweisen.',
          quelleId: 'tkg-56-vertragslaufzeit',
          belegId: 'hinweis-vor-verlaengerung',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'gestaendnis',
          text: 'Das war die Mail, die ich weggewischt habe.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'ansprechen',
        gegenueber: { von: 'staunen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'tkg-56-vertragslaufzeit',
      belegId: 'zwoelf-monate-anbieten',
      sprechtext:
        'Anbieter müssen dir vorher einen Vertrag mit einer anfänglichen Laufzeit von höchstens zwölf Monaten anbieten. Mir hat nie jemand zwölf Monate angeboten. Gefragt hast du auch nicht.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Anbieter müssen dir vorher einen Vertrag mit einer anfänglichen Laufzeit von höchstens zwölf Monaten anbieten.',
          quelleId: 'tkg-56-vertragslaufzeit',
          belegId: 'zwoelf-monate-anbieten',
        },
        {
          sprecher: 'zeiger',
          zug: 'widersprechen',
          machart: 'rechtfertigung',
          text: 'Mir hat nie jemand zwölf Monate angeboten.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          machart: 'nebenbemerkung',
          text: 'Gefragt hast du auch nicht.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Nach der Mindestlaufzeit: ein Monat.',
      sprechtext: 'Sag mal, wusstest du das die ganze Zeit? Länger, als du denkst. Ich kündige heute Abend.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Sag mal, wusstest du das die ganze Zeit?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Länger, als du denkst.' },
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Ich kündige heute Abend.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'ansprechen',
        gegenueber: { von: 'nachdenken', nach: 'ruhe' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „jetzt läuft der Vertrag ein Jahr weiter" kein Schicksal mehr, sondern ein Satz, den Watti sich selbst erzählt.',
    },
  ],

  quellenIds: ['tkg-56-vertragslaufzeit'],

  texte: {
    tiktok: {
      titel: 'Watti hängt freiwillig ein Jahr länger drin',
      beschreibung: 'Vertrag verlängert: Welche Frist bei Telefon- und Internetverträgen nach der Mindestlaufzeit gilt.',
      hashtags: ['#handyvertrag', '#verbraucherrecht', '#technikwissen', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti hängt freiwillig ein Jahr länger drin',
      beschreibung: 'Vertrag verlängert: Nach Ablauf der anfänglichen Laufzeit lässt § 56 TKG einen Monat Frist zu, kostenlos.',
      hashtags: ['#handyvertrag', '#verbraucherrecht', '#kuendigung', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Watti wartet ein Jahr, das er nicht warten muss',
      beschreibung: 'Vertrag verlängert: Was § 56 TKG zu Kündigungsfrist, Kosten und Zwölfmonatsangebot schreibt.',
      hashtags: ['#handyvertrag', '#verbraucherrecht', '#tkg', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
