import type { Short } from '../../src/typen';

/**
 * Es war einmal · die zwoelf Stunden beim ersten Laden.
 *
 * Das Maerchen steht im Aufschlag und nur dort — die einzige Position ohne
 * Belegpflicht, und kein Schlupfloch: Er setzt die Erzaehlung, er behauptet
 * nichts. Alles danach laeuft in der Gegenwart und haengt am Umweltbundesamt.
 *
 * **Die Quelle war schon da**, und zwei ihrer Zitate sind am 24.08.2026
 * nachgetragen worden: die 70-Prozent-Empfehlung und das Laden im
 * ausgeschalteten Zustand. Der Short vom 18.08. („Akku leerlaufen") lebt von
 * denselben Seiten, aber von anderen Fundstellen — dass beide aus einer Quelle
 * kommen, ist kein Mangel, sondern die Folge davon, dass eine Behoerde zum
 * Thema alles an einer Stelle sagt.
 */
export const erstesLaden: Short = {
  id: 'erstes-laden',
  themaId: 'erstes-laden-zwoelf-stunden',
  format: 'eswareinmal',
  sachgebiet: 'laden',
  arbeitstitel: '12 Stunden beim ersten Laden',
  weitererzaehlt: 'Voll laden war die Regel. Heute ist es der Fehler.',
  suchbegriff: 'Akku laden',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Neue Geräte musstest du 12 Stunden am Stück laden.',
      text: '12 Stunden laden.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'uhr', stand: 'links' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Das Umweltbundesamt empfiehlt heute, den Ladevorgang vorher zu unterbrechen.',
      text: 'Vorher unterbrechen.',
      buehne: { art: 'figur', von: 'stutzen', nach: 'lesen', requisite: 'batterie' },
      quelleId: 'uba-akku-laden',
      belegId: 'siebzig-prozent-unterbrechen',
      herausgeber: 'Umweltbundesamt',
    },
    {
      /*
       * Eine `zahl`-Szene, keine `text`-Szene: Die 70 sind eine technische
       * Angabe, und die Regel `zahlImBild` verlangt sie im Bild. Eine
       * gesprochene Zahl ist eine Behauptung, eine gezeigte ist ein Beleg.
       */
      art: 'zahl',
      position: 'zuspitzung',
      sprechtext: 'Unterbrechen sollst du bei etwa 70 Prozent. Nicht bei 100.',
      wert: '70',
      einheit: '%',
      bedeutung: 'Etwa hier soll der Ladevorgang unterbrochen werden.',
      buehne: { art: 'figur', von: 'lesen', nach: 'erklaeren' },
      quelleId: 'uba-akku-laden',
      belegId: 'siebzig-prozent-unterbrechen',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Und laden sollst du möglichst im ausgeschalteten Zustand.',
      text: 'Am besten ausgeschaltet.',
      buehne: { art: 'figur', von: 'erklaeren', nach: 'staunen', requisite: 'steckdose', stand: 'links' },
      quelleId: 'uba-akku-laden',
      belegId: 'ausgeschalteter-zustand-laden',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Der Memory-Effekt, den die alte Regel meinte, tritt bei Lithium-Ionen-Akkus nicht auf.',
      text: 'Bei Lithium-Ionen: nein.',
      buehne: { art: 'figur', von: 'staunen', nach: 'nachdenken', requisite: 'lupe' },
      quelleId: 'uba-akku-laden',
      belegId: 'der-memory-effekt-tritt',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Voll laden war die Regel. Heute ist es der Fehler.',
      satz: 'Voll laden war die Regel. Heute ist es der Fehler.',
      rundlauf:
        'Beim zweiten Sehen klingen die 12 Stunden nicht mehr nach Sorgfalt, sondern nach dem, was der Schlusssatz daraus macht.',
    },
  ],

  quellenIds: ['uba-akku-laden'],

  texte: {
    tiktok: {
      titel: '12 Stunden beim ersten Laden',
      beschreibung: 'Akku laden: Die Behörde rät heute, bei etwa 70 Prozent abzubrechen statt voll zu machen.',
      hashtags: ['#akkuladen', '#akkupflege', '#lithiumionen', '#umweltbundesamt', '#ganzakkurat'],
    },
    instagram: {
      titel: '12 Stunden beim ersten Laden',
      beschreibung: 'Einen Akku voll zu laden war einmal Pflege. Heute rät das UBA, vorher aufzuhören.',
      hashtags: ['#akku', '#akkupflege', '#nachhaltigkeit', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Warum das erste Laden nicht 12 Stunden dauern muss',
      beschreibung: 'Akku laden nach Empfehlung des Umweltbundesamts: bei etwa 70 Prozent abbrechen, nicht bei 100.',
      hashtags: ['#akku', '#laden', '#akkupflege', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
