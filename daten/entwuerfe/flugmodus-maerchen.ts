import type { Short } from '../../src/typen';

/**
 * Dienstag · Es war einmal · der Flugmodus.
 *
 * Das Maerchen sitzt ganz im Aufschlag, wie es die Bauregel verlangt: Er ist
 * die einzige Position ohne Belegpflicht, weil er die Erzaehlung setzt und
 * nichts behauptet. Alles danach laeuft in der Gegenwart.
 *
 * Der Dreh ist besser als das uebliche „stimmt gar nicht": Der Grund fuer die
 * Abschaltung war **nie das Flugzeug**. Er stand am Boden. Ein Geraet in
 * zehn Kilometern Hoehe sieht Dutzende Funkzellen gleichzeitig und meldet
 * sich bei allen an — das Problem hatte das Mobilfunknetz, nicht die
 * Bordelektronik. Genau deshalb steht in dem Beschluss eine Einheit, deren
 * einziger Zweck es ist, die Anmeldung **am Boden** zu verhindern.
 */
export const flugmodusMaerchen: Short = {
  id: 'flugmodus-maerchen',
  themaId: 'flugmodus-herkunft',
  format: 'eswareinmal',
  sachgebiet: 'fahren',
  arbeitstitel: 'Der Flugmodus war nie wegen des Flugzeugs da',
  weitererzaehlt: 'Nicht das Flugzeug war das Problem. Das Netz am Boden war es.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Handy aus, sonst stürzt das Flugzeug ab.',
      text: 'Handy aus. Sonst stürzt es ab.',
      // Das Flugzeug taucht auf, die Figur erschrickt. Die Drohung wird hier
      // noch geglaubt; der Zweifel kommt erst in der Zuspitzung.
      buehne: { art: 'figur', von: 'ruhe', nach: 'staunen', requisite: 'flugzeug' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'In den Vorschriften steht ein Gerät mit einer einzigen Aufgabe.',
      text: 'Ein Gerät mit einer einzigen Aufgabe.',
      // Aus dem Schreck wird Nachschlagen. Das ist der Kanal in einer Geste:
      // Wer erschrickt, glaubt; wer nachliest, prueft.
      buehne: { art: 'figur', von: 'staunen', nach: 'lesen', requisite: 'blatt' },
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'terrestrischen-umts-mobilfunknetzen',
      herausgeber: 'Europäische Union',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Und selbst die galt nur bis Anfang zweitausendsechsundzwanzig.',
      text: 'Und die galt nur bis 2026.',
      // Vom Blatt zum Kalender: Sie zeigt auf das Ablaufdatum, das sie eben
      // gelesen hat.
      buehne: { art: 'figur', von: 'lesen', nach: 'zeigen', requisite: 'kalender' },
      hervorhebung: 'nur bis',
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'bis-zum-1-januar-2026',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Nicht das Flugzeug war das Problem. Das Netz am Boden war es.',
      text: 'Nicht das Flugzeug. Das Netz.',
      /*
       * Der Kipppunkt als geteiltes Bild — der Satz stellt zwei Dinge
       * gegenueber, und genau das tut die Buehne. Oben steht das Flugzeug aus
       * dem Aufschlag wieder da, damit der Vergleich etwas zu vergleichen hat;
       * unten die Haeuser, die das Netz am Boden tragen.
       */
      buehne: {
        art: 'gegenueber',
        oben: { etikett: 'DAS FLUGZEUG', symbol: 'flugzeug' },
        unten: { etikett: 'DAS NETZ', symbol: 'nachbarhaeuser' },
      },
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'terrestrischen-umts-mobilfunknetzen',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Seit zweitausendzweiundzwanzig ist Fünf-G an Bord vorgesehen.',
      text: 'Seit 2022 ist 5G an Bord vorgesehen.',
      /*
       * Aus dem Zweifel wird ein Hinweis: Sie zeigt auf das, was seit 2022
       * gilt.
       *
       * Hier stand zuerst `achselzucken`, und das Standbild hat gezeigt, warum
       * das neben einer Requisite nicht geht: Die Pose stellt beide Arme aus,
       * die linke Hand landet bei x = 23,3, und nach der Verschiebung um -38
       * liegt sie bei -14,7 — ausserhalb der viewBox. Der Arm war im Bild
       * glatt abgeschnitten.
       */
      buehne: { art: 'figur', von: 'stutzen', nach: 'zeigen', requisite: 'europa' },
      quelleId: 'eu-mca-5g-an-bord',
      belegId: 'hinzufuegen-der-5g-netzanbindung',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Der Schalter heißt immer noch so.',
      satz: 'Der Schalter heißt immer noch so.',
      rundlauf:
        '„Der Schalter heißt immer noch so." trifft auf „Handy aus, sonst stürzt das Flugzeug ab." — die Drohung klingt beim zweiten Mal wie ein Überbleibsel.',
    },
  ],

  quellenIds: ['eu-mca-5g-an-bord'],

  texte: {
    tiktok: {
      titel: 'Das Problem stand am Boden, nicht im Flugzeug',
      beschreibung: '',
      hashtags: ['#flugmodus', '#fliegen', '#technik', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Das Problem stand am Boden, nicht im Flugzeug',
      beschreibung: '',
      hashtags: ['#flugmodus', '#fliegen', '#technik', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Das Problem stand am Boden, nicht im Flugzeug',
      beschreibung: '',
      hashtags: ['#flugmodus', '#fliegen', '#technik', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
