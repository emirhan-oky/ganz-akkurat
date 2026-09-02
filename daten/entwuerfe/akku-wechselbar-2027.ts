import type { Short } from '../../src/typen';

/**
 * Es war einmal · der geklebte Akku und der 18. Februar 2027.
 *
 * **Emirhans Dialog vom 02.09.2026**, aus `daten/briefings/akku-wechselbar-2027.md`.
 * Meine Fassung vom 03.09. ist geloescht — sie war entstanden, ohne dass ich
 * den Briefingbogen geoeffnet hatte.
 *
 * ## Warum seine Fassung besser ist
 *
 * **Der Schaden ist ein Geldschaden, kein technischer.** „Mein Handyakku wird
 * mein Geld aufessen" — damit hat der Short einen Gegenstand, der wehtut, und
 * nicht bloss eine Regel, die es gibt. Meine Fassung erklaerte Artikel 11;
 * seine erklaert, warum Watti heute in der Werkstatt steht.
 *
 * **Und der Schluss gehoert der Beziehung:** „Du nimmst mein altes und
 * vernichtest deinen Akku nicht wieder mit Social Media." Ein Geschenk mit
 * Widerhaken — Voltis Fach, und es steht so schon als Beispiel in `MACHARTEN`.
 *
 * ## Was ich angefasst habe
 *
 * **Die zwei Platzhalter gefuellt.** Wo „Hier Zitatkarte mit der
 * EU-Batterieverordnung, die dann Volti Watti erklaert" und „Dann noch die
 * kurze Erklaerung der falle" standen, stehen jetzt zwei Zeilen mit den
 * Fundstellen aus Artikel 11 und die Karte.
 *
 * Die Falle aus seinem Bogen ist dabei woertlich eingebaut: **„Handelsuebliche
 * Werkzeuge" heisst nicht „ohne Werkzeug".** Ein Schraubendreher ist
 * handelsueblich, und genau daran haette der Short sonst zu viel behauptet.
 *
 * Dazu Rechtschreibung: „handy" → „Handy", „Feburar" → „Februar", Satzzeichen.
 */
export const akkuWechselbar2027: Short = {
  id: 'akku-wechselbar-2027',
  themaId: 'akku-wechselbar-2027',
  format: 'eswareinmal',
  sachgebiet: 'handy',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Akku frisst sein Geld',
  weitererzaehlt: 'mit handelsüblichen Werkzeugen',
  suchbegriff: 'Akku Werkstatt',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Niemals zahle ich so viel für einen Akkuwechsel!',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'batterie' },
  },
  vorspann: 'Wattis Akku und die Werkstatt',

  szenen: [
    {
      /*
       * **Watti redet weiter und Volti kommt dazu.** Der Vorhang ist ein
       * Zeitsprung: davor schimpft er allein, danach steht sein Bruder im
       * Raum. Dieselbe Bauart wie in `passwort-wechseln`, wo Emirhans
       * Kaltstart ebenfalls ein Selbstgespraech war.
       */
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Aber mein Handy hält nur noch 3 Stunden bei 100 Prozent. Hey Watti, was läuft?',
      rede: [
        { sprecher: 'zeiger', zug: 'behaupten', text: 'Aber mein Handy hält nur noch 3 Stunden bei 100 Prozent.' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Hey Watti, was läuft?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'ansprechen',
        gegenueber: { von: 'ruhe', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-batterie-entnehmbar',
      belegId: 'leicht-entfernt-und-ausgetauscht',
      herausgeber: 'Europäische Union',
      sprechtext:
        'Nix läuft, mein Handyakku wird mein Geld aufessen. Wieso denn das? Die Handywerkstatt verlangt ein Batzen Geld für den Tausch meines Handyakkus. Autsch, aber bald nicht mehr. Watt? Wie bald nicht mehr?',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'bild',
          text: 'Nix läuft, mein Handyakku wird mein Geld aufessen.',
        },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wieso denn das?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Die Handywerkstatt verlangt ein Batzen Geld für den Tausch meines Handyakkus.',
        },
        { sprecher: 'nachleser', zug: 'einschraenken', text: 'Autsch, aber bald nicht mehr.' },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Watt? Wie bald nicht mehr?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'nachdenken',
        gegenueber: { von: 'nachdenken', nach: 'erklaeren' },
      },
    },
    {
      /*
       * **Der erste gefuellte Platzhalter.** Hier stand „Hier Zitatkarte mit
       * der EU-Batterieverordnung, die dann Volti Watti erklaert."
       */
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'mit handelsüblichen Werkzeugen aus einem Produkt entnommen werden kann',
      quelleId: 'eu-batterie-entnehmbar',
      belegId: 'handelsuebliche-werkzeuge-artikel-11',
      sprechtext:
        'Bei neuen Geräten muss der Akku mit handelsüblichen Werkzeugen rausgehen. Also ohne Werkzeug? Ein Schraubendreher ist handelsüblich, du Pfosten.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Bei neuen Geräten muss der Akku mit handelsüblichen Werkzeugen rausgehen.',
          quelleId: 'eu-batterie-entnehmbar',
          belegId: 'handelsuebliche-werkzeuge-artikel-11',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'falscherschluss', text: 'Also ohne Werkzeug?' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Ein Schraubendreher ist handelsüblich, du Pfosten.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      /*
       * **Der zweite gefuellte Platzhalter und der Kipppunkt zugleich.** Hier
       * stand „Dann noch die kurze Erklaerung der falle" — und die Falle aus
       * seinem Bogen ist genau das „und heute", das `eswareinmal` verlangt:
       * **Es geht doch. Es soll nur bis Februar 2027 nicht gehen.**
       *
       * Die Zahl steht im Bild, weil `zahlImBild` fuer jede technische Angabe
       * im Sprechtext eine `zahl`-Szene verlangt — Wattis „100 Prozent" im
       * Aufschlag loest sie aus.
       */
      art: 'zahl',
      position: 'kipppunkt',
      wert: '2027',
      einheit: 'ab Februar',
      bedeutung: 'erst dann muss der Akku mit normalem Werkzeug rausgehen',
      quelleId: 'eu-batterie-entnehmbar',
      belegId: 'artikel-11-gilt-ab',
      sprechtext:
        'Also gehe ich dann wieder im Februar zur Werkstatt? Das gilt für Handys ab Februar 2027, du Pfosten. Und für deins gilt es gar nicht, das ist ja schon verkauft.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'falscheautoritaet',
          text: 'Also gehe ich dann wieder im Februar zur Werkstatt?',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Das gilt für Handys ab Februar 2027, du Pfosten.',
          quelleId: 'eu-batterie-entnehmbar',
          belegId: 'artikel-11-gilt-ab',
        },
        {
          /*
           * **Der Umkehrschluss haengt an Artikel 11 Absatz 1**, nicht am
           * Geltungsbeginn: Die Pflicht trifft, wer ein Produkt *in Verkehr
           * bringt*. Ein Datum allein schliesst Bestandsgeraete nicht aus —
           * dasselbe Bauteil wie beim Ersatzteil-Short vom 01.09.
           */
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Und für deins gilt es gar nicht, das ist ja schon verkauft.',
          quelleId: 'eu-batterie-entnehmbar',
          belegId: 'in-verkehr-bringen-artikel-11',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'zeigen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Ab Februar 2027 muss der Akku mit normalem Werkzeug rausgehen.',
      sprechtext:
        'Ja, aber wie soll ich mit meinem Handy jetzt auskommen? Du nimmst mein altes und vernichtest deinen Akku nicht wieder mit Social Media.',
      rede: [
        { sprecher: 'zeiger', zug: 'bitten', text: 'Ja, aber wie soll ich mit meinem Handy jetzt auskommen?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'widerhaken',
          text: 'Du nimmst mein altes und vernichtest deinen Akku nicht wieder mit Social Media.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'ruhe',
        gegenueber: { von: 'zeigen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, dass Wattis Empörung über den Preis berechtigt ist – und dass ihm die neue Regel trotzdem nichts nützt.',
    },
  ],

  quellenIds: ['eu-batterie-entnehmbar'],

  texte: {
    tiktok: {
      titel: 'Wattis Akku frisst sein Geld',
      beschreibung: 'Akku in der Werkstatt tauschen: Was sich ab Februar 2027 ändert.',
      hashtags: ['#akku', '#reparatur', '#eu', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Akku frisst sein Geld',
      beschreibung: 'Akku tauschen kostet in der Werkstatt. Ab 2027 reicht normales Werkzeug.',
      hashtags: ['#akku', '#reparatur', '#handy', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Warum Wattis Akkuwechsel so viel kostet',
      beschreibung: 'Akku und Werkstatt: Was die EU-Batterieverordnung ab dem 18. Februar 2027 verlangt.',
      hashtags: ['#akku', '#batterieverordnung', '#reparatur', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
