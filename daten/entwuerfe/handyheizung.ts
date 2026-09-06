import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · das Handy unter dem Kopfkissen.
 *
 * **Szenario 7, zweites Beispiel: Watti hat einen Plan.** Sein Plan ist das
 * Kissen — laden und den Wecker hoeren. Volti rechnet nicht vor, was daraus
 * wird, sondern zeigt, dass beide Lager am Thema vorbeireden.
 *
 * **Der Dialog ist Emirhans**, aus `daten/briefings/nachts-laden.md`. Der
 * Bogen trug die Ueberschrift „Vorschlag (Claude)" und war von ihm
 * ueberschrieben — erkennbar an „du Idiot", „Ja was denn nun?" und der
 * Themenzeile „Wattis Handyheizung". **Am 03.09.2026 hat sich gezeigt, dass
 * das fuer alle fuenf Boegen mit dieser Ueberschrift gilt.**
 *
 * **Drei Schreibsachen sind beim Eintragen berichtigt**, weil der Sprechtext
 * Wort fuer Wort der Untertitel ist: „Ladert" → „Laden", „dein handy" → „dein
 * Handy", der fehlende Punkt hinter „Dummheit". Und „acht Stunden" steht als
 * Ziffer, wie die Zeile darunter.
 *
 * **Eine Zeile ist geaendert, und der Grund steht in seinem eigenen Bogen.**
 * Dort stand „Nicht das ständige Laden lässt dein Handy altern." Das
 * Umweltbundesamt schreibt aber „**Ideal** ist es zudem, den Ladevorgang immer
 * schon dann zu unterbrechen, wenn der Akku etwa 70 % seiner Kapazität
 * erreicht hat" — es sagt also gerade **nicht**, dass Laden unschaedlich ist.
 * Der Abschnitt „Die Falle" im Bogen warnt genau davor.
 *
 * **Befund 52 steckt in der Ersatzzeile.** Mein erster Anlauf lautete „Die
 * streiten übers Kabel." — *„Das ergibt wenig Sinn, das passt da nicht rein."*
 * Der Satz verlangt, „die" auf Voltis zwei Lager zurueckzurechnen **und**
 * deren Streit auf ein Wort umzudeuten, das vorher nie fiel. Jetzt antwortet
 * Volti einfach auf „Watt?".
 */
export const handyheizung: Short = {
  id: 'handyheizung',
  themaId: 'nachts-laden',
  format: 'werhatrecht',
  sachgebiet: 'laden',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Handyheizung',
  weitererzaehlt: 'dass übermäßige Erwärmung ihn altern lässt',
  suchbegriff: 'Akku Erwärmung',
  kaltstart: {
    art: 'imvollzug',
    satz: 'So Handyakku dran, unters Kissen, damit ich meinen Wecker höre.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'steckdose' },
  },
  vorspann: 'Wattis Handyheizung',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Warum liegt dein Handy unter dem Kopfkissen? Weil es laden soll du Idiot, damit es morgens wieder voll ist.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Warum liegt dein Handy unter dem Kopfkissen?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'rechtfertigung',
          text: 'Weil es laden soll du Idiot, damit es morgens wieder voll ist.',
        },
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
        'Es hängt die halbe Nacht am Kabel, obwohl es längst voll ist, Idiot. Und? Schadet nicht.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          text: 'Es hängt die halbe Nacht am Kabel, obwohl es längst voll ist, Idiot.',
        },
        { sprecher: 'zeiger', zug: 'umdeuten', text: 'Und? Schadet nicht.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'erklaeren',
        nach: 'nachdenken',
        gegenueber: { von: 'stutzen', nach: 'zeigen' },
      },
    },
    {
      /*
       * **Die fuenfte Szene, geteilt an der Naht.** Der Dialog hatte vier und
       * riss damit das Minimum des Schemas — gefunden am 04.09.2026, als zum
       * ersten Mal ein Skript alle Entwuerfe parsen wollte. Geteilt wurde
       * nicht gekuerzt: Der Streitfall steht jetzt fuer sich, und Wattis „Ja
       * was denn nun?" schliesst ihn ab, statt die Zitatkarte zu eroeffnen.
       */
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Sagen die einen. Die anderen sagen, es macht den Akku kaputt. Ja was denn nun?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          text: 'Sagen die einen. Die anderen sagen, es macht den Akku kaputt.',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Ja was denn nun?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'stutzen',
        gegenueber: { von: 'zeigen', nach: 'erklaeren' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'Übermäßige Erwärmung des Akkus lässt ihn schneller altern',
      quelleId: 'uba-akku-laden',
      belegId: 'u-berma-ssige-erwa',
      herausgeber: 'Umweltbundesamt',
      sprechtext:
        'Beim Umweltbundesamt steht was anderes. Watt? Dass übermäßige Erwärmung ihn altern lässt. Und du liegst drauf.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Beim Umweltbundesamt steht was anderes.',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Watt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dass übermäßige Erwärmung ihn altern lässt. Und du liegst drauf.',
          quelleId: 'uba-akku-laden',
          belegId: 'u-berma-ssige-erwa',
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
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Nicht der Zeitpunkt entscheidet, sondern die Wärme.',
      sprechtext:
        'Also lag ich 8 Stunden auf einer Heizung? Du lagst 8 Stunden auf deiner Dummheit. Und wenn ich es danebenlege? Dann liegst du nicht drauf.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'katastrophe',
          text: 'Also lag ich 8 Stunden auf einer Heizung?',
        },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'parallelbau',
          text: 'Du lagst 8 Stunden auf deiner Dummheit.',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn ich es danebenlege?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann liegst du nicht drauf.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist das Kissen im ersten Satz schon der Fehler – und nicht das Kabel, über das beide streiten.',
    },
  ],

  quellenIds: ['uba-akku-laden'],

  texte: {
    tiktok: {
      titel: 'Wattis Handyheizung',
      beschreibung: 'Akku und Erwärmung: Warum das Kopfkissen schlimmer ist als das Kabel.',
      hashtags: ['#akku', '#handyakku', '#laden', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Handyheizung',
      beschreibung: 'Akku und Erwärmung: Beide Lager streiten über die Nacht. Das Amt schreibt von etwas anderem.',
      hashtags: ['#akku', '#handyakku', '#nachtsladen', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Das Handy unter dem Kopfkissen',
      beschreibung: 'Akku und Erwärmung: Was das Umweltbundesamt über Erwärmung und Alterung schreibt.',
      hashtags: ['#akku', '#umweltbundesamt', '#laden', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
