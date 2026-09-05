import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · ein halbes Watt im Aus-Zustand.
 *
 * **Szenario 1, viertes Beispiel: Volti belehrt Watti.** Damit ist der
 * Normalfall des Kanals mit vier Zugaengen belegt — Verbraucherrecht,
 * Raumfahrt, Versicherung und jetzt der Stromverbrauch im Wohnzimmer.
 *
 * **Die Ausnahme ist die Pointe.** Was Watti abends ausschaltet, darf ohnehin
 * nur ein halbes Watt ziehen; **der Router, den er anlaesst, darf 8** — er ist
 * ein „HiNA-Geraet", und die Verordnung nennt ihn beim Namen.
 *
 * **Der Belegpruefer hat den Short vor dem Eintragen zweimal gerettet.**
 *
 * **Der Fernseher fiel nie unter diese Verordnung.** Anhang II schliesst
 * elektronische Displays zweimal aus — fuer sie gilt VO 2019/2021. Der erste
 * Anlauf liess Watti „Und mein Fernseher haengt im WLAN" sagen und Volti mit
 * 2 Watt antworten; die 2 Watt gelten Kaffeemaschinen und Spielekonsolen. Aus
 * dem Fernseher ist deshalb die **Konsole** geworden, die in Anhang II Nr. 4
 * ausdruecklich steht.
 *
 * **Und die 7 Watt gelten erst ab dem 9. Mai 2027.** Der Volltext lautet „darf
 * … **8,00 W** nicht ueberschreiten. Zwei Jahre nach dem Geltungsbeginn …
 * 7,00 W" — die Zeitangabe steht unmittelbar vor der geprueften Zeichenkette.
 * **Im `stuetzt`-Feld der Quelle stand es sogar** („7 Watt nach zwei Jahren,
 * davor 8"): Die Belegdatenbank wusste es, der Dialog nicht.
 *
 * **Keine Stromrechnung im Short.** 0,5 Watt mal 8.760 Stunden waere eine
 * Kilowattstunde je Jahr — die Rechnung steht in keiner Quelle, der Strompreis
 * erst recht nicht. Watti behauptet trotzdem „frisst mein Geld", und Volti
 * laesst es stehen, statt es zu widerlegen.
 */
export const standbyHalbesWatt: Short = {
  id: 'standby-halbes-watt',
  themaId: 'standby-verbrauch',
  format: 'gibtswirklich',
  sachgebiet: 'rechner',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti zieht jeden Abend alle Stecker',
  weitererzaehlt: 'Ein halbes Watt darf so ein Haushaltsgerät im Aus-Zustand ziehen',
  suchbegriff: 'Standby Watt',
  kaltstart: {
    art: 'imvollzug',
    satz: 'Ich ziehe abends alle Stecker. Der Standby frisst mein Geld.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'steckdose' },
  },
  vorspann: 'Watti zieht jeden Abend alle Stecker',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, wie viel frisst dein Standby denn? Viel. Deshalb ziehe ich ja die Stecker.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, wie viel frisst dein Standby denn?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscheautoritaet',
          text: 'Viel. Deshalb ziehe ich ja die Stecker.',
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
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'Die Leistungsaufnahme des Geräts im Aus-Zustand darf 0,50 W nicht überschreiten.',
      quelleId: 'eu-oekodesign-standby',
      belegId: 'aus-zustand-null-fuenf-watt',
      herausgeber: 'Europäische Kommission',
      sprechtext:
        'Ein halbes Watt darf so ein Haushaltsgerät im Aus-Zustand ziehen. Ein halbes? Ein halbes, du Idiot. Und ab Mai 2027 nur noch 0,3.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Ein halbes Watt darf so ein Haushaltsgerät im Aus-Zustand ziehen.',
          quelleId: 'eu-oekodesign-standby',
          belegId: 'aus-zustand-null-fuenf-watt',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Ein halbes?' },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Ein halbes, du Idiot. Und ab Mai 2027 nur noch 0,3.',
          quelleId: 'eu-oekodesign-standby',
          belegId: 'gilt-ab-neuntem-mai',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'eu-oekodesign-standby',
      belegId: 'vernetzte-geraete-zwei-watt',
      sprechtext:
        'Und meine Konsole hängt im WLAN. Dann darf sie 2 Watt. Das ist nichts, und du stehst jeden Abend auf.',
      rede: [
        { sprecher: 'zeiger', zug: 'umdeuten', text: 'Und meine Konsole hängt im WLAN.' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann darf sie 2 Watt.',
          quelleId: 'eu-oekodesign-standby',
          belegId: 'vernetzte-geraete-zwei-watt',
        },
        { sprecher: 'nachleser', zug: 'zuspitzen', machart: 'nebenbemerkung', text: 'Das ist nichts, und du stehst jeden Abend auf.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'achselzucken',
        gegenueber: { von: 'lesen', nach: 'zeigen' },
      },
    },
    {
      art: 'zahl',
      position: 'kipppunkt',
      wert: '8',
      einheit: 'Watt',
      bedeutung: 'so viel darf ein Router im vernetzten Bereitschaftsbetrieb ziehen',
      quelleId: 'eu-oekodesign-standby',
      belegId: 'hina-heute-acht-watt',
      sprechtext:
        'Und was ist mit dem Router? Der darf 8 Watt, solange er im Netz hängt. 8? Router und Modems zählen extra.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was ist mit dem Router?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Der darf 8 Watt, solange er im Netz hängt.',
          quelleId: 'eu-oekodesign-standby',
          belegId: 'hina-heute-acht-watt',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'katastrophe', text: '8?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Router und Modems zählen extra.',
          quelleId: 'eu-oekodesign-standby',
          belegId: 'hina-sind-router-und-modems',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'achselzucken',
        nach: 'nachdenken',
        gegenueber: { von: 'zeigen', nach: 'erklaeren' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Der höchste Grenzwert gilt dem Gerät, das im Netz hängt.',
      sprechtext:
        'Also ziehe ich ab jetzt den Router raus. Und wie kommst du dann ins Netz? Gar nicht. Dann ziehe ich weiter die Konsole.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'uebercompliance',
          text: 'Also ziehe ich ab jetzt den Router raus.',
        },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und wie kommst du dann ins Netz?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'gestaendnis',
          text: 'Gar nicht. Dann ziehe ich weiter die Konsole.',
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
        'Beim zweiten Sehen zieht Watti im ersten Satz genau die Stecker, hinter denen ein halbes Watt hängt – und lässt den einen stecken, der acht darf.',
    },
  ],

  quellenIds: ['eu-oekodesign-standby'],

  texte: {
    tiktok: {
      titel: 'Watti zieht jeden Abend alle Stecker',
      beschreibung: 'Standby und Watt: Wie viel ein Gerät im Aus-Zustand ziehen darf.',
      hashtags: ['#standby', '#strom', '#sparen', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti zieht jeden Abend alle Stecker',
      beschreibung: 'Standby und Watt: Ein halbes im Aus-Zustand — und der Router zählt extra.',
      hashtags: ['#standby', '#strom', '#stromsparen', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Ein halbes Watt, und der Router zählt extra',
      beschreibung: 'Standby und Watt: Was die Ökodesign-Verordnung über Aus-Zustand und Bereitschaft schreibt.',
      hashtags: ['#standby', '#strom', '#oekodesign', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
