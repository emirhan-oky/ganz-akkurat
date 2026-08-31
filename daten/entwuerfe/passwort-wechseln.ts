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
  weitererzaehlt: 'Nicht der Kalender entscheidet, sondern der Hinweis.',
  suchbegriff: 'Passwort wechseln',
  /*
   * **„Bringt gar nichts" stand hier bis zum 31.08.2026** — und war der
   * teuerste Fehler dieses Projekts in seiner reinsten Form: Das BSI sagt
   * „erhoeht die Sicherheit **nicht automatisch**", und daraus wurde „gar
   * nichts". Derselbe Schritt von „nicht automatisch" zu „nicht", den
   * CLAUDE.md am Nachschlag dieses Shorts schon einmal beschreibt.
   *
   * Er stand hier, weil der `vorspann` das einzige gesprochene Feld ohne
   * Belegpflicht war. Nicht aus Absicht, sondern weil er neu war.
   *
   * Die neue Zeile haengt an `keine-zeitgemaesse-schutzmassnahme` und traegt
   * das **„pauschal"** mit: Das BSI verwirft den Wechsel nach Zeitplan, nicht
   * das Wechseln ueberhaupt — sonst widerspraeche die Themenzeile dem eigenen
   * Kipppunkt, der genau sagt, wann man wechseln soll.
   */
  vorspann: 'Passwort regelmäßig wechseln ist überholt',
  vorspannBelegId: 'keine-zeitgemaesse-schutzmassnahme',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: '90 Tage, dann neues Passwort.',
      rede: [{ sprecher: 'nachleser', zug: 'behaupten', text: '90 Tage, dann neues Passwort.' }],
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
        'Sagt das eigentlich mal jemand mit Ahnung? Beim BSI steht: Ein Wechsel nach Plan erhöht dir die Sicherheit nicht automatisch. Nicht automatisch? Dann lasse ich es ganz.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          text: 'Sagt das eigentlich mal jemand mit Ahnung?',
          machart: 'rueckfrage',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Beim BSI steht: Ein Wechsel nach Plan erhöht dir die Sicherheit nicht automatisch.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'routinemaessiger-wechsel-erhoeht-nicht',
        },
        /*
         * **Hier stand „Sicherheit? Also war das alles umsonst?"** — eine
         * tadellose Ratlosigkeit, die auf den *Fakt* reagierte und nicht auf
         * Volti. Der neue Satz greift „automatisch" auf und zieht daraus den
         * Schluss, der Wattis halbes Lager vertritt: gar nicht mehr wechseln.
         * **Das ist der Irrtum, den der Kipppunkt spaeter kassiert** — und
         * damit tut die Zeile etwas fuer den Short, statt nur witzig zu sein.
         */
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          text: 'Nicht automatisch? Dann lasse ich es ganz.',
          machart: 'falscherschluss',
        },
      ],
      /*
       * **Der Kernsatz, und er beginnt bei „routinemaessiger".**
       *
       * Der erste Anlauf am 31.08. kuerzte auf „Passwortwechsel aber erhoeht
       * die Sicherheit nicht automatisch" — mit der Begruendung, der
       * Ausschnitt „beginne beim Subjekt". Das Subjekt ist aber **„Ein
       * routinemaessiger Passwortwechsel"**, und ohne das Adjektiv behauptet
       * die Karte ueber *jeden* Wechsel, was das BSI nur ueber den
       * routinemaessigen sagt — auch ueber den, zu dem Volti zwei Szenen
       * spaeter ausdruecklich raet. **Die Kuerzung widersprach dem eigenen
       * Short.**
       *
       * Gefunden vom `belegpruefer`, nicht von einer Regel: Die Zitatlaenge
       * war eingehalten, die Zeichenkette stand woertlich auf der Seite, und
       * `quellen-pruefen` fand sie. Was fehlte, war ein Wort, dessen
       * Weglassen die Bedeutung dreht — genau der Fall, fuer den der
       * Kommentar an `zitat` in `src/typen.ts` warnt.
       */
      zitat: 'Ein routinemäßiger Passwortwechsel aber erhöht die Sicherheit nicht automatisch',
      /*
       * **Die Zitatkarte traegt seit dem 31.08.2026 eine Buehne.** Der Vertrag
       * verlangt sie seit einer Woche — „die beiden Figuren reden darueber" —,
       * und das Schema kannte sie nicht. Ausgerechnet die Szene, in der am
       * ausdruecklichsten geredet wird, war die einzige ohne Figuren.
       *
       * `lesen` fuer Volti, weil er vorliest, was auf der Karte steht;
       * `stutzen → nachdenken` fuer Watti, der es gerade begreift.
       */
      buehne: {
        art: 'figur',
        von: 'lesen',
        nach: 'stutzen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'routinemaessiger-wechsel-erhoeht-nicht',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Watti, wer ständig wechselt, greift oft zu schwächeren Passwörtern. Ertappt. Ich bin bei Passwort7.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'gegenbeispiel',
          text: 'Watti, wer ständig wechselt, greift oft zu schwächeren Passwörtern.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'schwache-vorhersehbare-passwoerter',
        },
        /*
         * **„Ertappt." ist die ganze Aenderung**, und sie ist der Unterschied
         * zwischen einem Gestaendnis und einem Einlenken: Vorher stand hier
         * „Ich bin bei Passwort7. Passwort8 kriegt ein Ausrufezeichen." — fuer
         * sich witzig, und es bezog sich auf nichts. Ein Wort davor macht die
         * Zeile zur Antwort auf Voltis Satz, ohne ihr die Pointe zu nehmen.
         */
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          text: 'Ertappt. Ich bin bei Passwort7.',
          machart: 'gestaendnis',
        },
      ],
      text: 'Oft schwächere Passwörter.',
      buehne: {
        art: 'figur',
        von: 'lesen',
        nach: 'nachdenken',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
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
      sprechtext: 'Also nie wechseln, verstanden. Nein. Wechseln sollst du, wenn es einen Hinweis gibt, dass Fremde es haben.',
      rede: [
        /*
         * **Wattis Irrtum wird ausgesprochen, bevor er kassiert wird.** Der
         * Bogen von „Beef" sagt, dass **beide** Lager etwas uebersehen — das
         * eine wechselt nach Kalender, das andere gar nicht. Ohne diese Zeile
         * gibt es nur ein Lager im Bild, und der Kipppunkt kippt nichts.
         */
        { sprecher: 'zeiger', zug: 'widersprechen', text: 'Also nie wechseln, verstanden.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Nein. Wechseln sollst du, wenn es einen Hinweis gibt, dass Fremde es haben.',
          quelleId: 'bsi-umgang-mit-passwoertern',
          belegId: 'geaendert-wenn-hinweis-unbefugte',
        },
      ],
      text: 'Erst bei einem Hinweis.',
      buehne: {
        art: 'figur',
        von: 'nachdenken',
        nach: 'lesen',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
      quelleId: 'bsi-umgang-mit-passwoertern',
      belegId: 'geaendert-wenn-hinweis-unbefugte',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      /*
       * **Diese Szene und die davor haben den Platz getauscht.** Vorher stand
       * hier der Hinweis-Beleg und in Szene 4 die Einzigartigkeit — mit dem
       * Ergebnis, dass Wattis Irrtum („also nie wechseln") erst nach seiner
       * Aufloesung kam. Ein Kipppunkt, der vor dem Irrtum steht, kippt nichts.
       */
      /*
       * **Watti eroeffnet, und zwar nicht aus Dramaturgie, sondern weil
       * `redelauf` es verlangt.** Vorher endete Szene 4 mit Voltis
       * Richtigstellung und Szene 5 begann mit seinem naechsten Belegsatz —
       * `redebloecke` klebt das ueber die Szenengrenze zu **8,6 Sekunden**
       * Volti am Stueck zusammen, erlaubt sind sechs.
       *
       * Die Naht lag zwischen den Saetzen, nicht in ihnen: Beide sind fuer
       * sich unauffaellig. Wattis Einlenken loest den Block und greift dabei
       * „Verdacht" auf — es kostet den Short nichts und gibt ihm einen
       * Rueckbezug mehr.
       */
      sprechtext: 'Also erst bei einem Hinweis. Und jedes Konto braucht ein eigenes Passwort. Konto? Meins ist der Generalschlüssel für alles.',
      rede: [
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Also erst bei einem Hinweis.' },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Und jedes Konto braucht ein eigenes Passwort.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'stark-und-einzigartig',
        },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          text: 'Konto? Meins ist der Generalschlüssel für alles.',
          machart: 'bild',
        },
      ],
      text: 'Ein Konto, ein Passwort.',
      buehne: {
        art: 'figur',
        von: 'lesen',
        nach: 'stutzen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'stark-und-einzigartig',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      /*
       * **Die Restfrage gehoert Watti, nicht Volti** — und das ist keine
       * Geschmacksfrage, sondern folgt aus zwei Dingen.
       *
       * Der Bogen von „Beef" endet auf `nachhaken`, `einschraenken` oder
       * `widersprechen`; der Short soll also mit einer offenen Frage schliessen.
       * Ein `nachhaken` behauptet nichts und darf deshalb keine Quelle tragen —
       * Voltis Belegsatz und die Frage koennen nicht derselbe Zug sein.
       *
       * Und wenn beide von Volti kaemen, wuerde `redelaeufe` sie zu einem
       * Abschnitt verschmelzen: Der zweite Zug erreichte das Bild nie. Watti
       * ist ohnehin die Figur, die fuer den Zuschauer steht — die Frage an ihn
       * ist bei ihm richtig aufgehoben.
       */
      sprechtext: 'Nicht der Kalender entscheidet, sondern der Hinweis. Und wann kam deiner?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Nicht der Kalender entscheidet, sondern der Hinweis.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'keine-zeitgemaesse-schutzmassnahme',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wann kam deiner?' },
      ],
      satz: 'Nicht der Kalender entscheidet, sondern der Hinweis.',
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
       *
       * **Am 01.09.2026 ein zweites Mal derselbe Befund, an derselben Zeile.**
       * Nach dem Umschreiben stand dort „sondern der Verdacht" — ein Wort, das
       * in **keiner** gebundenen Fundstelle vorkommt: Die Quelle nennt einen
       * „Hinweis darauf, dass es in die Haende von unbefugten Dritten gelangt
       * ist". „Verdacht" klingt griffiger und war eine halbe Behauptung mehr.
       *
       * Der Short sagt jetzt durchgehend „Hinweis" — im Belegsatz, in Wattis
       * Einlenken, im Bildtext und hier. **Ein Wort, das nur an einer Stelle
       * belegt ist, darf nicht an vier Stellen stehen.**
       */
      rundlauf:
        'Beim zweiten Sehen streiten die beiden Lager nicht mehr um dasselbe – jedes hat die Hälfte, die dem anderen fehlt.',
      /*
       * **Beide stehen auch im Schluss auf der Buehne.** `zeigen` fuer Volti,
       * weil er die Restfrage an den Zuschauer richtet; `achselzucken` fuer
       * Watti, der sie nicht beantworten kann — das ist die Haltung, mit der
       * ein Streitfall bei „Wer hat recht?" endet.
       */
      buehne: {
        art: 'figur',
        von: 'lesen',
        nach: 'zeigen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
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
      titel: 'Das Passwort und der Hinweis',
      beschreibung: 'Passwort wechseln nach BSI: Warum der Routinewechsel die Sicherheit nicht automatisch erhöht.',
      hashtags: ['#passwort', '#bsi', '#itsicherheit', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
