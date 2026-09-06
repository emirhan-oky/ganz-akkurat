import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · Der private Modus, die Cookies und der Fingerabdruck.
 *
 * **Der erste bewusst kurze Dialog.** Am 06.09.2026 nachgesehen, wie der
 * Vorrat auf den Laengenklassen liegt: 3 / 34 / 18. Die kurze Klasse belegt
 * sich nicht von selbst — `wochenAuswaehlen` kennt die Laenge nicht, und bei
 * drei kurzen Kandidaten gegen 52 andere faellt sie in einer Fuenferwoche nie.
 * **Der Laengenversuch wartet also nicht auf Sendungen, sondern auf Dialoge.**
 *
 * **Kurz heisst hier: ein Beleg weniger, nicht eine Zuspitzung gekuerzt.** Ein
 * Short, der kurz ist, weil ihm etwas fehlt, misst am Ende das Fehlende und
 * nicht die Laenge.
 *
 * **Das Dritte steht wortwoertlich in der Quelle.** Beide Lager reden ueber
 * Cookies — die einen halten den privaten Modus fuer eine Tarnkappe, die
 * anderen fuer ein Placebo. Das BSI schreibt, dass Fingerprints auf deutlich
 * mehr Daten zurueckgreifen und schwerer zu verhindern sind. Und die
 * Gegenmassnahme dreht sich um: Wer sich abschirmt, hebt sich ab.
 */
export const inkognitoModus: Short = {
  id: 'inkognito-modus',
  themaId: 'inkognito-modus',
  format: 'werhatrecht',
  sachgebiet: 'netz',
  bauform: 'wechselrede',
  arbeitstitel: 'Watti surft unsichtbar',
  weitererzaehlt: 'Fingerprints',
  suchbegriff: 'Inkognito Modus',
  kaltstart: {
    art: 'stolzerfehler',
    satz: 'Inkognito ist an. Ab jetzt sieht mich keiner mehr.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'lupe' },
  },
  vorspann: 'Wattis Modus und der Fingerabdruck',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Volti, ich surfe im Inkognito Modus. Wer sieht dich nicht? Keiner. Der vergisst doch alles.',
      rede: [
        { sprecher: 'zeiger', zug: 'behaupten', machart: 'falscheautoritaet', text: 'Volti, ich surfe im Inkognito Modus.' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wer sieht dich nicht?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Keiner. Der vergisst doch alles.' },
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
      quelleId: 'bsi-fingerprints',
      belegId: 'protokollieren-des-nutzungsverhaltens',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Cookies ermöglichen das Protokollieren des Nutzungsverhaltens, du Pfosten. Sag ich doch, und die sind weg.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Cookies ermöglichen das Protokollieren des Nutzungsverhaltens, du Pfosten.',
          quelleId: 'bsi-fingerprints',
          belegId: 'protokollieren-des-nutzungsverhaltens',
        },
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'falscherschluss', text: 'Sag ich doch, und die sind weg.' },
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
      position: 'kipppunkt',
      quelleId: 'bsi-fingerprints',
      belegId: 'fingerprints-mehr-daten-als-cookies',
      sprechtext:
        'Dein Browser hat einen Fingerabdruck. Einen was? Fingerprints greifen auf deutlich mehr Daten zurück als Cookies. Dann verhindere ich die eben auch.',
      rede: [
        { sprecher: 'nachleser', zug: 'behaupten', text: 'Dein Browser hat einen Fingerabdruck.' },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Einen was?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Fingerprints greifen auf deutlich mehr Daten zurück als Cookies.',
          quelleId: 'bsi-fingerprints',
          belegId: 'fingerprints-mehr-daten-als-cookies',
        },
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'uebercompliance', text: 'Dann verhindere ich die eben auch.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-fingerprints',
      belegId: 'deutlich-schwieriger-zu-verhindern',
      sprechtext: 'Ihre Erstellung ist deutlich schwieriger zu verhindern.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Ihre Erstellung ist deutlich schwieriger zu verhindern.',
          quelleId: 'bsi-fingerprints',
          belegId: 'deutlich-schwieriger-zu-verhindern',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Wer sich abschirmt, kann auffallen.',
      sprechtext:
        'Und wenn ich alles blockiere? Dann kann dein Browser dadurch individueller werden. Ich kann auffallen, weil ich nicht auffalle?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn ich alles blockiere?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann kann dein Browser dadurch individueller werden.',
          quelleId: 'bsi-fingerprints',
          belegId: 'browser-individueller-werden',
        },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'umdeutung',
          text: 'Ich kann auffallen, weil ich nicht auffalle?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'ansprechen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „Inkognito ist an" kein Schutzversprechen mehr, sondern der Satz, der den Browser auffälliger macht.',
    },
  ],

  quellenIds: ['bsi-fingerprints'],

  texte: {
    tiktok: {
      titel: 'Watti surft unsichtbar',
      beschreibung: 'Inkognito Modus: Was er vergisst, und was ihn trotzdem wiedererkennt.',
      hashtags: ['#inkognito', '#browser', '#technikwissen', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti surft unsichtbar',
      beschreibung: 'Inkognito Modus: Fingerprints greifen auf deutlich mehr Daten zurück als Cookies, schreibt das BSI.',
      hashtags: ['#inkognito', '#browser', '#datenschutz', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Fingerprints greifen auf mehr Daten zurück als Cookies',
      beschreibung: 'Inkognito Modus: Was das BSI zu Cookies, Fingerprints und dem Abschirmen schreibt.',
      hashtags: ['#inkognito', '#browser', '#technikwissen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
