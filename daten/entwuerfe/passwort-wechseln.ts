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
  bauform: 'wechselrede',
  arbeitstitel: 'Das Passwort und der Kalender',
  weitererzaehlt: 'Nicht der Kalender entscheidet, sondern der Verdacht.',
  suchbegriff: 'Passwort wechseln',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: '90 Tage, neues Passwort. Bin bei Passwort7.',
      rede: [
        { sprecher: 'nachleser', text: '90 Tage, neues Passwort.' },
        { sprecher: 'zeiger', text: 'Bin bei Passwort7.', machart: 'gestaendnis' },
      ],
      text: 'Passwort wechseln?',
      buehne: { art: 'figur', von: 'ruhe', nach: 'achselzucken' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Beim BSI steht: Ein routinemäßiger Passwortwechsel erhöht die Sicherheit nicht automatisch. Also war das alles umsonst?',
      rede: [
        {
          sprecher: 'nachleser',
          text: 'Beim BSI steht: Ein routinemäßiger Passwortwechsel erhöht die Sicherheit nicht automatisch.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'routinemaessiger-wechsel-erhoeht-nicht',
        },
        { sprecher: 'zeiger', text: 'Also war das alles umsonst?', machart: 'ratlosigkeit' },
      ],
      text: 'Nicht automatisch.',
      buehne: {
        art: 'figur',
        von: 'lesen',
        zwischen: ['zeigen'],
        nach: 'erklaeren',
        gegenueber: { von: 'ruhe', zwischen: ['stutzen'], nach: 'achselzucken' },
      },
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'routinemaessiger-wechsel-erhoeht-nicht',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Watti, wer ständig wechseln muss, nimmt vorhersehbare Passwörter. Passwort8 kriegt ein Ausrufezeichen.',
      rede: [
        {
          sprecher: 'nachleser',
          text: 'Watti, wer ständig wechseln muss, nimmt vorhersehbare Passwörter.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'schwache-vorhersehbare-passwoerter',
        },
        { sprecher: 'zeiger', text: 'Passwort8 kriegt ein Ausrufezeichen.', machart: 'bild' },
      ],
      text: 'Oft schwächere Passwörter.',
      buehne: { art: 'figur', von: 'lesen', nach: 'erklaeren' },
      hervorhebung: 'vorhersehbaren',
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'schwache-vorhersehbare-passwoerter',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Wichtiger ist, dass es stark ist und nirgendwo sonst steht.',
      rede: [
        {
          sprecher: 'nachleser',
          text: 'Wichtiger ist, dass es stark ist und nirgendwo sonst steht.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'stark-und-einzigartig',
        },
      ],
      text: 'Stark. Einzigartig.',
      buehne: { art: 'figur', von: 'erklaeren', nach: 'zeigen', requisite: 'haken' },
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'stark-und-einzigartig',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Wechseln sollst du, wenn jemand Fremdes drangekommen sein könnte. Volti, das hat sich jemand ausgedacht.',
      rede: [
        {
          sprecher: 'nachleser',
          text: 'Wechseln sollst du, wenn jemand Fremdes drangekommen sein könnte.',
          quelleId: 'bsi-umgang-mit-passwoertern',
          belegId: 'geaendert-wenn-hinweis-unbefugte',
        },
        { sprecher: 'zeiger', text: 'Volti, das hat sich jemand ausgedacht.', machart: 'falscherschluss' },
      ],
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
