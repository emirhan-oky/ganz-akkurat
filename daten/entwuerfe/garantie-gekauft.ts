import type { Short } from '../../src/typen';

/**
 * Donnerstag · Na, auch gekauft? · die Garantieverlängerung an der Kasse.
 *
 * Der Sendeplatz funktioniert nur, wenn der Sprecher mitgemeint ist — sonst
 * ist es Belehrung. Deshalb „wir" im Nachschlag und nicht „du".
 *
 * Die harte Kante liegt im Datenvertrag: Verkauft wird eine **Garantie**
 * (§ 443 BGB, freiwillig), und was ohnehin gilt, ist die **Gewährleistung**
 * (§ 438 BGB, zwei Jahre, gesetzlich). Beides heisst im Laden dasselbe, und
 * genau davon lebt der Zusatzvertrag. Der Short sagt nicht, dass jede
 * Verlaengerung wertlos ist — er sagt, wofuer die ersten zwei Jahre nicht
 * gebraucht werden.
 *
 * **Der Preis ist raus.** In Szene 2 standen „Neunundzwanzig Euro" — eine
 * plausible Zahl, die niemand erhoben hat. Sie klang wie eine Tatsache, war
 * aber erfunden, und keine Fundstelle konnte sie tragen. Der Short verliert
 * dadurch nichts: Er handelt nicht davon, dass die Verlaengerung teuer ist,
 * sondern davon, dass zwei ihrer drei Jahre gesetzlich ohnehin gelten. Was der
 * Zuschauer bezahlt hat, weiss er selbst.
 */
export const garantieGekauft: Short = {
  id: 'garantie-gekauft',
  themaId: 'garantieverlaengerung',
  format: 'auchgekauft',
  sachgebiet: 'recht',
  arbeitstitel: 'Die Garantieverlängerung an der Kasse',
  weitererzaehlt: 'Die Garantieverlängerung verkauft dir zwei Jahre, die du gesetzlich schon hast.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Na, an der Kasse drei Jahre Garantie dazugekauft?',
      text: 'Na, auch dazugekauft?',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      // „freiwillig" ist die herrschende Lesart von § 443, steht aber nicht im
      // Zitat. Was dort steht, reicht und ist schaerfer: Es ist seine Erklärung.
      sprechtext: 'Verkauft hat er dir eine Erklärung. Seine eigene.',
      text: 'Eine Erklärung. Seine eigene.',
      hervorhebung: 'Seine eigene',
      quelleId: 'bgb-443-garantie',
      belegId: 'geht-der-verka-ufer',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Sie gilt zusätzlich zur gesetzlichen Mängelhaftung. Zusätzlich.',
      text: 'Zusätzlich zum Gesetz.',
      hervorhebung: 'Zusätzlich',
      quelleId: 'bgb-443-garantie',
      belegId: 'zusa-tzlich-zu-der',
      herausgeber: 'Bundesministerium der Justiz',
    },
    {
      art: 'zahl',
      position: 'kipppunkt',
      sprechtext: 'Im Gesetz steht daneben: zwei Jahre, für jeden, ohne Aufpreis.',
      wert: '2',
      einheit: 'Jahre',
      bedeutung: 'Gewährleistung, gesetzlich, ohne Aufpreis',
      quelleId: 'bgb-438-verjaehrung',
      belegId: 'im-u-brigen-in',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Von den drei bezahlten Jahren hattest du zwei schon.',
      text: 'Zwei davon hattest du schon.',
      quelleId: 'bgb-438-verjaehrung',
      belegId: 'im-u-brigen-in',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Gekauft haben wir das alle mal.',
      satz: 'Gekauft haben wir das alle mal.',
    },
  ],

  quellenIds: ['bgb-443-garantie', 'bgb-438-verjaehrung'],

  texte: {
    tiktok: {
      titel: 'Garantie und Gewährleistung sind nicht dasselbe',
      beschreibung: '',
      hashtags: ['#verbraucherrecht', '#garantie', '#technik', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Garantie und Gewährleistung sind nicht dasselbe',
      beschreibung: '',
      hashtags: ['#verbraucherrecht', '#garantie', '#technik', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Garantie und Gewährleistung sind nicht dasselbe',
      beschreibung: '',
      hashtags: ['#verbraucherrecht', '#garantie', '#technik', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
