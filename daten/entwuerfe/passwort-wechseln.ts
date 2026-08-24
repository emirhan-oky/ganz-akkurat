import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · der regelmaessige Passwortwechsel.
 *
 * Die Abgrenzung zu `eswareinmal` haelt, und zwar knapp: Waere die Aufloesung
 * „frueher stimmte es, heute nicht", waere es ein Maerchen. Hier uebersehen
 * **beide** Seiten dasselbe — die IT-Abteilung, dass der erzwungene Wechsel zu
 * schwaecheren Passwoertern fuehrt; die Spoetter, dass es sehr wohl einen
 * Anlass zum Wechseln gibt, naemlich den konkreten Verdacht.
 *
 * Der Streitfall selbst steht im Aufschlag und nur dort. Was zwei Lager
 * behaupten, ist keine Aussage ueber die Welt; die Zuspitzung darunter muss
 * eine sein und haengt deshalb am BSI.
 *
 * Der Nachschlag endet auf einer **Restfrage** statt auf einer Pointe — sonst
 * gibt es bei diesem Format nichts zu kommentieren.
 */
export const passwortWechseln: Short = {
  id: 'passwort-wechseln',
  themaId: 'passwort-wechseln',
  format: 'werhatrecht',
  sachgebiet: 'netz',
  arbeitstitel: 'Das Passwort und der Kalender',
  weitererzaehlt: 'Nicht der Kalender entscheidet, sondern der Verdacht.',
  suchbegriff: 'Passwort wechseln',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Passwort wechseln, sagt die IT. Das Netz lacht.',
      text: 'Passwort wechseln?',
      buehne: { art: 'figur', von: 'ruhe', nach: 'achselzucken' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Beim BSI steht, ein routinemäßiger Wechsel erhöht die Sicherheit nicht automatisch.',
      text: 'Nicht automatisch.',
      buehne: { art: 'figur', von: 'achselzucken', nach: 'lesen', requisite: 'schild', stand: 'links' },
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'routinemaessiger-wechsel-erhoeht-nicht',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Wer ständig wechseln muss, greift vermehrt zu schwachen, vorhersehbaren Passwörtern.',
      text: 'Oft schwächere Passwörter.',
      buehne: { art: 'figur', von: 'lesen', nach: 'erklaeren' },
      hervorhebung: 'vorhersehbaren',
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'schwache-vorhersehbare-passwoerter',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Wichtiger ist laut Behörde, dass ein Passwort stark und einzigartig ist.',
      text: 'Stark. Einzigartig.',
      buehne: { art: 'figur', von: 'erklaeren', nach: 'zeigen', requisite: 'haken' },
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'stark-und-einzigartig',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Wechseln sollst du dann, wenn es einen Hinweis auf unbefugte Dritte gibt.',
      text: 'Beim Hinweis. Dann ja.',
      buehne: { art: 'figur', von: 'zeigen', nach: 'stutzen', requisite: 'warndreieck', stand: 'links' },
      quelleId: 'bsi-umgang-mit-passwoertern',
      belegId: 'geaendert-wenn-hinweis-unbefugte',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Nicht der Kalender entscheidet, sondern der Verdacht. Wann war deiner?',
      satz: 'Nicht der Kalender entscheidet, sondern der Verdacht.',
      rundlauf:
        'Beim zweiten Sehen streiten die beiden Lager nicht mehr um dasselbe – jedes hat die Hälfte, die dem anderen fehlt.',
    },
  ],

  quellenIds: ['bsi-passwortwechsel-2026', 'bsi-umgang-mit-passwoertern'],

  texte: {
    tiktok: {
      titel: 'Das Passwort und der Kalender',
      beschreibung: 'Passwort wechseln nach Kalender: Das BSI sagt, das erhöht die Sicherheit nicht automatisch.',
      hashtags: ['#passwortsicherheit', '#bsi', '#passkeys', '#zweifaktor', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Das Passwort und der Kalender',
      beschreibung: 'Dein Passwort wechseln musst du nicht nach Kalender, sondern bei einem Hinweis.',
      hashtags: ['#passwortsicherheit', '#onlinesicherheit', '#bsi', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Das Passwort und der Verdacht',
      beschreibung: 'Passwort wechseln nach BSI: Warum der Routinewechsel die Sicherheit nicht automatisch erhöht.',
      hashtags: ['#passwort', '#bsi', '#itsicherheit', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
