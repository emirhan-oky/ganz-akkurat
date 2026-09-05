import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · die Frist, die nie angefangen hat.
 *
 * **Szenario 10, drittes Beispiel: Die Wette.** Der Einsatz steht vor der
 * Karte, und die Karte entscheidet gegen den, der die bekanntere Zahl hatte.
 *
 * **Die Einschraenkung traegt den ganzen Short.** § 356 Absatz 4 nennt „zwoelf
 * Monate und 14 Tage" — aber nur, **wenn nicht belehrt wurde**. Wer die Zahl
 * ohne die Bedingung erzaehlt, behauptet, man koenne alles ein Jahr lang
 * zurueckschicken; das waere Befund 62 in seiner teuersten Form. Volti nennt
 * die Bedingung zweimal, einmal vor und einmal nach der Zahl.
 *
 * **Der Normalfall bleibt stehen.** Watti hat mit den 14 Tagen recht — sie
 * stehen woertlich in § 355 —, und er verliert trotzdem. Das ist die Bauart
 * aus Szenario 4: **recht haben und den falschen Schluss ziehen.**
 */
export const widerrufWette: Short = {
  id: 'widerruf-wette',
  themaId: 'widerrufsfrist-belehrung',
  format: 'absicht',
  sachgebiet: 'recht',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Frist hat nie angefangen',
  weitererzaehlt: 'Die Frist beginnt nicht',
  suchbegriff: 'Widerrufsfrist Händler',
  kaltstart: {
    art: 'momentdanach',
    satz: 'Die Kopfhörer gehen zurück, aber meine Rückgabefrist ist rum.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'karton' },
  },
  vorspann: 'Wattis Frist hat nie angefangen',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, seit wann hast du die Kopfhörer? Drei Wochen. Die Widerrufsfrist beträgt 14 Tage, das weiß jeder.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, seit wann hast du die Kopfhörer?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscheautoritaet',
          text: 'Drei Wochen. Die Widerrufsfrist beträgt 14 Tage, das weiß jeder.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'zeigen',
        gegenueber: { von: 'ruhe', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bgb-355-widerrufsrecht',
      belegId: 'vierzehn-tage-frist',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext:
        'Da hast du recht. Ab wann laufen die denn? Ab Lieferung natürlich. Nur wenn der Händler dich belehrt hat. Wetten?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Da hast du recht. Ab wann laufen die denn?',
          quelleId: 'bgb-355-widerrufsrecht',
          belegId: 'vierzehn-tage-frist',
        },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Ab Lieferung natürlich.' },
        { sprecher: 'nachleser', zug: 'widersprechen', text: 'Nur wenn der Händler dich belehrt hat. Wetten?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'achselzucken',
        gegenueber: { von: 'erklaeren', nach: 'stutzen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'Die Widerrufsfrist beginnt nicht, bevor der Unternehmer den Verbraucher … unterrichtet hat',
      quelleId: 'bgb-356-widerrufsfrist',
      belegId: 'frist-beginnt-nicht-ohne-belehrung',
      sprechtext:
        'Um was? Wenn ich gewinne, trägst du die Kopfhörer zur Post. Abgemacht. Die Frist beginnt nicht, bevor er dich unterrichtet hat.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Um was?' },
        { sprecher: 'nachleser', zug: 'umdeuten', text: 'Wenn ich gewinne, trägst du die Kopfhörer zur Post.' },
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Abgemacht.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Die Frist beginnt nicht, bevor er dich unterrichtet hat.',
          quelleId: 'bgb-356-widerrufsfrist',
          belegId: 'frist-beginnt-nicht-ohne-belehrung',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'achselzucken',
        nach: 'staunen',
        gegenueber: { von: 'stutzen', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bgb-356-widerrufsfrist',
      belegId: 'zwoelf-monate-und-vierzehn-tage',
      sprechtext:
        'Und wenn er das nicht gemacht hat? Dann hast du zwölf Monate und 14 Tage. Zwölf Monate? Nur ohne Belehrung. Mit sind es die 14 Tage.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn er das nicht gemacht hat?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann hast du zwölf Monate und 14 Tage.',
          quelleId: 'bgb-356-widerrufsfrist',
          belegId: 'zwoelf-monate-und-vierzehn-tage',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Zwölf Monate?' },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Nur ohne Belehrung. Mit sind es die 14 Tage.',
          quelleId: 'bgb-356-widerrufsfrist',
          belegId: 'zwoelf-monate-und-vierzehn-tage',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'erklaeren' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Ohne Belehrung fängt die Frist gar nicht erst an.',
      sprechtext:
        'Und wo steht, ob er mich belehrt hat? Guck nach, ob er dich überhaupt belehrt hat. Da steht ein Widerrufsformular drin. Ich trage sie wohl selbst zur Post.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wo steht, ob er mich belehrt hat?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Guck nach, ob er dich überhaupt belehrt hat.' },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'gestaendnis',
          text: 'Da steht ein Widerrufsformular drin. Ich trage sie wohl selbst zur Post.',
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
        'Beim zweiten Sehen weiß man, dass Wattis „meine Rückgabefrist ist rum" richtig war – nur nicht aus dem Grund, den er nennt.',
    },
  ],

  quellenIds: ['bgb-355-widerrufsrecht', 'bgb-356-widerrufsfrist'],

  texte: {
    tiktok: {
      titel: 'Wattis Frist hat nie angefangen',
      beschreibung: 'Widerrufsfrist und Händler: Wann die 14 Tage überhaupt zu laufen beginnen.',
      hashtags: ['#widerruf', '#onlinekauf', '#verbraucherrechte', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Frist hat nie angefangen',
      beschreibung: 'Widerrufsfrist und Händler: Ohne Belehrung beginnt sie gar nicht erst.',
      hashtags: ['#widerruf', '#onlinekauf', '#rueckgabe', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Wann die 14 Tage wirklich zu laufen beginnen',
      beschreibung: 'Widerrufsfrist und Händler: Was die §§ 355 und 356 BGB über Fristbeginn und Belehrung sagen.',
      hashtags: ['#widerruf', '#onlinekauf', '#bgb', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
