import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · die Wette über das Virenprogramm.
 *
 * **Szenario 10, zweites Beispiel: Die Wette.** Der Einsatz steht fest, bevor
 * die Karte kommt — sonst ist es keine Wette, sondern eine Meinungsverschieden-
 * heit. Und **Volti liest die Karte selbst vor** und verliert daran.
 *
 * **Die Quelle hat eine Falle, die den Short fast gekippt haette.** Das BSI
 * schreibt „Ein Programm zum Schutz des eigenen Rechners ist **daher** bei
 * privater Nutzung des Rechners nicht zwingend notwendig" — und das „daher"
 * bezieht sich auf den Satz davor, der von **Linux** handelt. Zwei Zeilen
 * hoeher steht „Tatsächlich sollten all Ihre Geräte einen Virenschutz haben",
 * und das ist der Satz, der gilt. Dieselbe Sorte Fehler wie die neun aus dem
 * Belegprueferdurchgang vom 01.09.2026: **das Subjekt ausserhalb der
 * geprueften Zeichenkette.**
 *
 * **Befund 55 steckt im Schluss.** Dort stand „Ich hab noch nie eine Wette
 * gegen dich verloren." — ein Satz ueber die Wette. Emirhans Fassung ist einer
 * ueber die Brueder: *„Wie redest du mit deinem großen Bruder?"* und Wattis
 * Konter mit Voltis eigenem Satz. *„Vergiss die Beziehung der beiden nicht."*
 */
export const virenprogrammWette: Short = {
  id: 'virenprogramm-wette',
  themaId: 'virenprogramm-noetig',
  format: 'werhatrecht',
  sachgebiet: 'rechner',
  bauform: 'zitatkarte',
  arbeitstitel: 'Volti verliert seine erste Wette',
  weitererzaehlt: 'Alle Geräte',
  suchbegriff: 'Virenprogramm Handy',
  kaltstart: {
    art: 'stolzerfehler',
    satz: 'Ich habe mir wieder ein Virenprogramm geholt. Teuer war es.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'kassenbon' },
  },
  vorspann: 'Volti verliert seine erste Wette',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, das Virenprogramm brauchst du nicht mehr, du Idiot. Doch. Sonst hole ich mir was.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'widersprechen',
          text: 'Watti, das Virenprogramm brauchst du nicht mehr, du Idiot.',
        },
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'rechtfertigung', text: 'Doch. Sonst hole ich mir was.' },
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
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Windows bringt seins mit, sagen sie. Wetten, dass das Amt mir recht gibt? Wetten dass nicht. Wenn ich gewinne, kochst du eine Woche.',
      rede: [
        { sprecher: 'nachleser', zug: 'zuspitzen', machart: 'nebenbemerkung', text: 'Windows bringt seins mit, sagen sie.' },
        {
          sprecher: 'zeiger',
          zug: 'widersprechen',
          machart: 'falscheautoritaet',
          text: 'Wetten, dass das Amt mir recht gibt?',
        },
        {
          sprecher: 'nachleser',
          zug: 'umdeuten',
          text: 'Wetten dass nicht. Wenn ich gewinne, kochst du eine Woche.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'erklaeren',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'Tatsächlich sollten all Ihre Geräte einen Virenschutz haben.',
      quelleId: 'bsi-virenschutz',
      belegId: 'alle-geraete-virenschutz',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Und wenn ich gewinne, kochst du. Abgemacht. Ich lese vor. Alle Geräte. Alle Geräte.',
      rede: [
        { sprecher: 'zeiger', zug: 'umdeuten', text: 'Und wenn ich gewinne, kochst du.' },
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Abgemacht. Ich lese vor.' },
        {
          sprecher: 'zeiger',
          zug: 'nachlegen',
          text: 'Alle Geräte.',
          quelleId: 'bsi-virenschutz',
          belegId: 'alle-geraete-virenschutz',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Alle Geräte.',
          quelleId: 'bsi-virenschutz',
          belegId: 'alle-geraete-virenschutz',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'erklaeren',
        nach: 'staunen',
        gegenueber: { von: 'zeigen', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-virenschutz',
      belegId: 'irrglaube-nur-pcs',
      sprechtext:
        'Auch das Handy? Da steht sogar, dass es ein Irrglaube ist, nur PCs bräuchten eins.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Auch das Handy?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Da steht sogar, dass es ein Irrglaube ist, nur PCs bräuchten eins.',
          quelleId: 'bsi-virenschutz',
          belegId: 'irrglaube-nur-pcs',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'ansprechen',
        gegenueber: { von: 'lesen', nach: 'stutzen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Das Amt empfiehlt Virenschutz für alle Geräte.',
      sprechtext:
        'Und was kochst du morgen? Wie redest du mit deinem großen Bruder? Wettschulden sind Ehrenschulden. Das hast du mir beigebracht.',
      rede: [
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'uebercompliance', text: 'Und was kochst du morgen?' },
        { sprecher: 'nachleser', zug: 'abbiegen', text: 'Wie redest du mit deinem großen Bruder?' },
        {
          sprecher: 'zeiger',
          zug: 'einschraenken',
          machart: 'menschenvergleich',
          text: 'Wettschulden sind Ehrenschulden. Das hast du mir beigebracht.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'achselzucken',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
      rundlauf:
        'Beim zweiten Sehen ist Wattis Virenprogramm nicht mehr die Dummheit, für die Volti es im ersten Satz hält.',
    },
  ],

  quellenIds: ['bsi-virenschutz'],

  texte: {
    tiktok: {
      titel: 'Volti verliert seine erste Wette',
      beschreibung: 'Virenprogramm fürs Handy: Was das Amt dazu schreibt – und für welche Geräte.',
      hashtags: ['#virenschutz', '#antivirus', '#bsi', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Volti verliert seine erste Wette',
      beschreibung: 'Virenprogramm fürs Handy: Nicht nur der Rechner ist gemeint, sondern alle Geräte.',
      hashtags: ['#virenschutz', '#antivirus', '#handysicherheit', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Das Virenprogramm und alle Geräte',
      beschreibung: 'Virenprogramm fürs Handy: Was das BSI über Virenschutz auf allen Geräten schreibt.',
      hashtags: ['#virenschutz', '#bsi', '#antivirus', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
