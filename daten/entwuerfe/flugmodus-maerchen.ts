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
      /*
       * Die Figur steht klein am unteren Rand, das Flugzeug ueber ihr, und sie
       * sieht hoch. Der Aufschlag behauptet eine Gefahr von oben — dann soll
       * die Figur auch von unten hinaufschauen.
       *
       * Vorher stand sie hier gross in der Mitte und erschrak. Das war nicht
       * falsch, aber es war dieselbe Anordnung wie in den sieben anderen
       * Shorts.
       */
      buehne: { art: 'figur', von: 'ruhe', nach: 'hochschauen', requisite: 'flugzeug', stand: 'klein' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'In den Vorschriften steht ein Gerät mit einer einzigen Aufgabe.',
      text: 'Ein Gerät mit einer einzigen Aufgabe.',
      // Aus dem Schreck wird Nachschlagen. Das ist der Kanal in einer Geste:
      // Wer erschrickt, glaubt; wer nachliest, prueft.
      buehne: { art: 'figur', von: 'hochschauen', nach: 'lesen', requisite: 'blatt' },
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
       * Sie erklaert mit dem Stab, was seit 2022 gilt.
       *
       * Zwei Anlaeufe stecken hier drin. Zuerst `achselzucken`: Die Pose
       * stellt beide Arme aus, die linke Hand landet bei x = 23,3 und nach der
       * Verschiebung um -38 bei -14,7 — ausserhalb der viewBox, der Arm war im
       * Bild abgeschnitten. Dann `zeigen` mit dem Europa-Kranz daneben, was
       * ging, aber die vierte Zeigegeste im selben Video war.
       *
       * `stand: 'rechts'` ist nur moeglich, weil der Stab **gehalten** wird.
       * Ein Symbol daneben liegt fest auf x = 138, also genau dort, wo die
       * Figur dann steht.
       */
      buehne: { art: 'figur', von: 'stutzen', nach: 'erklaeren', stand: 'rechts' },
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
