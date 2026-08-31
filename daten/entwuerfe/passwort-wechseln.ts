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
  bauform: 'zitatkarte',
  arbeitstitel: 'Das Passwort und der Kalender',
  weitererzaehlt: 'Nicht der Kalender entscheidet, sondern der Verdacht.',
  suchbegriff: 'Passwort wechseln',
  vorspann: 'Passwort wechseln bringt gar nichts',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: '90 Tage, dann neues Passwort.',
      rede: [{ sprecher: 'nachleser', text: '90 Tage, dann neues Passwort.' }],
      text: 'Passwort wechseln?',
      /*
       * „90 Tage" **ist** ein Kalender, keine Uebertragung — `uhr` waere die
       * Assoziation fuer Zeit, und genau davor warnt der Kommentar an
       * `KontextArt`. Der Short landet auf „Nicht der Kalender entscheidet":
       * Das Symbol im Aufschlag stellt auf, was der Nachschlag umwirft.
       */
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'kalender' },
    },
    {
      art: 'zitatkarte',
      position: 'zuspitzung',
      /*
       * **Watti eroeffnet.** Vorher begann Volti hier, und weil `redebloecke`
       * gleiche Sprecher ueber Szenengrenzen zusammenklebt, wurde daraus mit
       * dem Aufschlag ein Block von 8,4 Sekunden.
       *
       * Sein Belegsatz ist zugleich von 90 auf 77 Zeichen gekuerzt: Sechs
       * Sekunden sind rund 86, der Satz war fuer sich allein schon zu lang.
       * Der Wortlaut des Zitats steht ohnehin auf der Karte im Bild —
       * **gesprochen wird Alltagssprache, gezeigt wird die Behoerdenfassung.**
       */
      sprechtext:
        'Sagt das eigentlich mal jemand mit Ahnung? Beim BSI steht: Ein Wechsel nach Plan erhöht die Sicherheit nicht automatisch. Also war das alles umsonst?',
      rede: [
        { sprecher: 'zeiger', text: 'Sagt das eigentlich mal jemand mit Ahnung?', machart: 'rueckfrage' },
        {
          sprecher: 'nachleser',
          text: 'Beim BSI steht: Ein Wechsel nach Plan erhöht die Sicherheit nicht automatisch.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'routinemaessiger-wechsel-erhoeht-nicht',
        },
        { sprecher: 'zeiger', text: 'Also war das alles umsonst?', machart: 'ratlosigkeit' },
      ],
      zitat: 'Ein routinemäßiger Passwortwechsel aber erhöht die Sicherheit nicht automatisch',
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'routinemaessiger-wechsel-erhoeht-nicht',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Watti, wer ständig wechseln muss, greift oft zu schwächeren Passwörtern. Ich bin bei Passwort7. Passwort8 kriegt ein Ausrufezeichen.',
      rede: [
        {
          sprecher: 'nachleser',
          text: 'Watti, wer ständig wechseln muss, greift oft zu schwächeren Passwörtern.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'schwache-vorhersehbare-passwoerter',
        },
        {
          sprecher: 'zeiger',
          text: 'Ich bin bei Passwort7. Passwort8 kriegt ein Ausrufezeichen.',
          machart: 'gestaendnis',
        },
      ],
      text: 'Oft schwächere Passwörter.',
      buehne: { art: 'figur', von: 'lesen', nach: 'erklaeren' },
      hervorhebung: 'schwächeren',
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'schwache-vorhersehbare-passwoerter',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      /*
       * **Die einzige Szene ohne Reaktion war zugleich die Naht.** Sie lief
       * einstimmig in den naechsten Belegsatz, und beide zusammen ergaben
       * 10,3 Sekunden Volti am Stueck. Eine Zeile fuer Watti loest den Block,
       * ohne dass Volti ein Wort abgibt.
       */
      sprechtext: 'Wichtiger ist, dass es stark ist und nur zu einem Konto gehört. Meins hängt an allem. Wie ein Generalschlüssel.',
      rede: [
        {
          sprecher: 'nachleser',
          text: 'Wichtiger ist, dass es stark ist und nur zu einem Konto gehört.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'stark-und-einzigartig',
        },
        { sprecher: 'zeiger', text: 'Meins hängt an allem. Wie ein Generalschlüssel.', machart: 'bild' },
      ],
      text: 'Stark. Nur für ein Konto.',
      buehne: { art: 'figur', von: 'erklaeren', nach: 'zeigen', requisite: 'haken' },
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'stark-und-einzigartig',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Wechseln sollst du, wenn es einen Hinweis gibt, dass jemand Fremdes es kennt. Volti, das hat sich jemand ausgedacht.',
      rede: [
        {
          sprecher: 'nachleser',
          text: 'Wechseln sollst du, wenn es einen Hinweis gibt, dass jemand Fremdes es kennt.',
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
      rede: [
        {
          sprecher: 'nachleser',
          text: 'Nicht der Kalender entscheidet, sondern der Verdacht. Wann war deiner?',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'keine-zeitgemaesse-schutzmassnahme',
        },
      ],
      satz: 'Nicht der Kalender entscheidet, sondern der Verdacht.',
      /*
       * Der Nachschlag traegt eine `belegId`, obwohl seine Position von der
       * Belegpflicht befreit ist. Grund ist ein Befund des `belegpruefer` vom
       * 30.08.2026: „Nicht der Kalender **entscheidet**" ist absolut, das an
       * Szene 2 gebundene Zitat sagt „erhoeht die Sicherheit **nicht
       * automatisch**". Der Schritt von „nicht automatisch" zu „nicht" stand
       * in keinem gebundenen Zitat — er stand zwei Absaetze darueber auf
       * derselben Seite und war damit zwei Zeilen entfernt zu haben.
       *
       * Formal haette der Satz gehalten, weil der Nachschlag nichts belegen
       * muss. **Genau das ist der Grund, ihn trotzdem zu belegen:** Es war der
       * einzige Satz des Shorts, dessen Deckung ausserhalb der gebundenen
       * Belege lag, und die Befreiung ist fuer Pointen gedacht, nicht fuer
       * Behauptungen, die zufaellig am Ende stehen.
       */
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
