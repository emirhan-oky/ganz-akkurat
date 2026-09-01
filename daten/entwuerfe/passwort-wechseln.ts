import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · der regelmaessige Passwortwechsel.
 *
 * ## Am 01.09.2026 als Geschichte neu geschrieben
 *
 * Der Befund am ersten fertigen Video: *„Es fuehlt sich immer noch so an, als
 * ob das alles blindlings reingeworfen wird."* Die Ursache lag nicht im Bild
 * und nicht im Ton, sondern im **Ausgangspunkt**: Der Short begann beim
 * Sachverhalt („90 Tage, dann neues Passwort") — bei einer Behauptung, die im
 * Raum steht und der niemand etwas passiert.
 *
 * Jetzt beginnt er bei einer **Lage**: Watti sagt, jemand war in seinem Konto.
 * Volti fragt nach, Watti erzaehlt, und der Beleg kommt als Antwort auf ein
 * echtes Problem statt als Vortrag.
 *
 * **Der Gewinn liegt nicht im Anfang, sondern im Kipppunkt.** Das BSI nennt
 * als Anlass zum Wechseln „einen Hinweis darauf, dass es in die Haende von
 * unbefugten Dritten gelangt ist" — und genau den hat Watti seit Szene 1. In
 * der alten Fassung stand dieser Beleg abstrakt in der Mitte; hier ist er die
 * Aufloesung einer Lage, die der Zuschauer seit dem ersten Satz kennt.
 *
 * **Kein einziges neues Feld war dafuer noetig.** Die Zuege tragen die
 * Erzaehlung von selbst: `nachhaken` verlangt eine Antwort, `beantworten`
 * schliesst sie, `richtigstellen` widerlegt. Was fehlte, war keine Technik,
 * sondern die Entscheidung, wo der Short anfaengt.
 *
 * **Die Belege sind unveraendert.** Alle fuenf Fundstellen standen schon in der
 * alten Fassung und sind geprueft; neu ist allein, wer wem was erzaehlt.
 *
 * ## Was bleibt
 *
 * Die Abgrenzung zu `eswareinmal` haelt weiter: Hier uebersehen **beide**
 * Seiten dasselbe. Neu ist, dass beide Lager von **derselben Figur** vertreten
 * werden — Watti wechselt vom „alle 90 Tage" zum „dann eben nie". Das ist
 * naeher an einem Menschen als zwei abstrakte Lager, und der Bogen von „Beef"
 * erlaubt es ausdruecklich: „Welches Lager welche Figur vertritt. Es darf
 * innerhalb des Shorts wechseln."
 *
 * Der Nachschlag endet weiter auf einer **Restfrage** — und sie schliesst
 * jetzt den Kreis zum Anfang, statt ins Leere zu fragen.
 */
export const passwortWechseln: Short = {
  id: 'passwort-wechseln',
  themaId: 'passwort-wechseln',
  format: 'werhatrecht',
  sachgebiet: 'netz',
  bauform: 'zitatkarte',
  arbeitstitel: 'Das Passwort und der Kalender',
  weitererzaehlt: 'Nicht der Kalender entscheidet.',
  suchbegriff: 'Passwort wechseln',
  /*
   * **„Bringt gar nichts" stand hier bis zum 31.08.2026** — und war der
   * teuerste Fehler dieses Projekts in seiner reinsten Form: Das BSI sagt
   * „erhoeht die Sicherheit **nicht automatisch**", und daraus wurde „gar
   * nichts". Die Zeile haengt seitdem an
   * `keine-zeitgemaesse-schutzmassnahme` und traegt das **„pauschal"** mit.
   */
  vorspann: 'Passwort regelmäßig wechseln ist überholt',
  vorspannBelegId: 'keine-zeitgemaesse-schutzmassnahme',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      /*
       * **Eine Lage, keine Behauptung.** Der Aufschlag hat 3,5 Sekunden, und
       * eine Lage passt hinein, wo eine Erklaerung es nicht taete: sieben
       * Woerter, 27 Zeichen, rund 2,1 Sekunden.
       *
       * Er traegt keine Quelle und braucht keine — Watti behauptet nichts
       * ueber die Welt, sondern ueber sein eigenes Konto. Dieselbe Sorte Satz
       * wie „Ich bin bei Passwort7", nur als Eroeffnung.
       *
       * **Ohne Zeitangabe.** „Heute Nacht" waere am Sendetag falsch, ohne dass
       * jemand etwas geaendert haette.
       */
      sprechtext: 'Jemand war in meinem Konto.',
      rede: [{ sprecher: 'zeiger', zug: 'behaupten', text: 'Jemand war in meinem Konto.' }],
      text: 'Jemand war drin.',
      /*
       * **Watti allein mit der Meldung.** Ein Symbol ist nur ohne zweite Figur
       * erlaubt — es steht fest auf x = 152 und laege sonst in ihr. Der
       * Aufschlag ist die einzige Szene, in der das ohnehin passt: Die Lage
       * gehoert Watti, Volti kommt erst mit der Nachfrage dazu.
       *
       * `browserfenster` und nicht `kalender`: Der Kalender stand hier, solange
       * der Short bei „90 Tage" anfing. Jetzt faengt er bei einer Meldung an,
       * und der Kalender kommt spaeter — als Wattis Irrtum, nicht als Aufhaenger.
       */
      buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'staunen', requisite: 'browserfenster' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      /*
       * **Die Nachfrage ist echt, und deshalb traegt sie.** `nachhaken`
       * verlangt eine Antwort der anderen Figur binnen zwei Zeilen — die Regel
       * erzwingt hier genau den Anschluss, den die Erzaehlung ohnehin will.
       *
       * Wattis Antwort behauptet nichts ueber die Welt, sondern ueber sein
       * Konto. Sie steht deshalb ohne Quelle in einer Szene, die eine traegt:
       * Die Belegpflicht haengt an der Szene, nicht an jeder Zeile.
       */
      sprechtext:
        'Woher weißt du das, Watti? Eine Anmeldung mit meinem Passwort, von einem fremden Gerät. Dann wechsel es.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Woher weißt du das, Watti?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Eine Anmeldung mit meinem Passwort, von einem fremden Gerät.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Dann wechsel es.',
          quelleId: 'bsi-umgang-mit-passwoertern',
          belegId: 'geaendert-wenn-hinweis-unbefugte',
        },
      ],
      text: 'Fremde Anmeldung.',
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'ruhe', nach: 'lesen' },
      },
      quelleId: 'bsi-umgang-mit-passwoertern',
      belegId: 'geaendert-wenn-hinweis-unbefugte',
    },
    {
      art: 'zitatkarte',
      position: 'zuspitzung',
      /*
       * **Wattis Irrtum kommt aus seinem Mund, nicht aus dem Raum.** In der
       * alten Fassung stand „90 Tage, dann neues Passwort" im Aufschlag — eine
       * Behauptung ohne Sprecher, gegen die Volti dann anredete. Hier ist es
       * Wattis eigene Gewohnheit, und die Zitatkarte widerlegt eine Person
       * statt einer Meinung.
       */
      sprechtext:
        'Mach ich doch. Alle 90 Tage ein neues Passwort. Beim BSI steht: Ein Wechsel nach Plan erhöht dir die Sicherheit nicht automatisch.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachlegen', text: 'Mach ich doch. Alle 90 Tage ein neues Passwort.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Beim BSI steht: Ein Wechsel nach Plan erhöht dir die Sicherheit nicht automatisch.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'routinemaessiger-wechsel-erhoeht-nicht',
        },
      ],
      zitat: 'Ein routinemäßiger Passwortwechsel aber erhöht die Sicherheit nicht automatisch',
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'stutzen',
        gegenueber: { von: 'lesen', nach: 'nachdenken' },
      },
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'routinemaessiger-wechsel-erhoeht-nicht',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      /*
       * **Watti eroeffnet, und das ist keine Geschmacksfrage.** `redebloecke`
       * klebt gleiche Sprecher ueber Szenengrenzen zusammen: Ohne diese Zeile
       * folgte Voltis Gegenbeispiel unmittelbar auf seinen Zitatsatz aus der
       * Szene davor, und daraus wurden **9,9 Sekunden Volti am Stueck** bei
       * erlaubten sechs. Die Regel hat es beim ersten Lauf gemeldet.
       *
       * Der Widerspruch ist zugleich das zweite Lager: Watti hat eben noch
       * „alle 90 Tage" verteidigt und verteidigt es hier ein letztes Mal,
       * bevor er es aufgibt.
       */
      sprechtext:
        'Aber öfter wechseln ist doch sicherer. Wer immer wieder wechselt, greift oft zu schwächeren Passwörtern. Ertappt. Ich bin bei Passwort7.',
      rede: [
        { sprecher: 'zeiger', zug: 'widersprechen', text: 'Aber öfter wechseln ist doch sicherer.' },
        {
          sprecher: 'nachleser',
          zug: 'gegenbeispiel',
          text: 'Wer immer wieder wechselt, greift oft zu schwächeren Passwörtern.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'schwache-vorhersehbare-passwoerter',
        },
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
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'nachdenken', nach: 'lesen' },
      },
      hervorhebung: 'schwächeren',
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'schwache-vorhersehbare-passwoerter',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      /*
       * **Der Kipppunkt ist die Lage aus Szene 1.** Watti springt vom „alle 90
       * Tage" ins Gegenteil, und Volti dreht ihn zurueck — nicht mit einer
       * Regel, sondern mit dem, was Watti selbst mitgebracht hat.
       *
       * Das ist der Grund, warum diese Fassung existiert: Derselbe Beleg stand
       * vorher hier und war eine Auskunft. Jetzt ist er eine **Antwort**.
       */
      sprechtext: 'Also nie wechseln. Doch — jetzt.',
      rede: [
        { sprecher: 'zeiger', zug: 'widersprechen', text: 'Also nie wechseln.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Doch — jetzt.',
          quelleId: 'bsi-umgang-mit-passwoertern',
          belegId: 'geaendert-wenn-hinweis-unbefugte',
        },
      ],
      text: 'Wechseln bei einem Hinweis.',
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'staunen',
        gegenueber: { von: 'lesen', nach: 'stutzen' },
      },
      quelleId: 'bsi-umgang-mit-passwoertern',
      belegId: 'geaendert-wenn-hinweis-unbefugte',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      /*
       * **Beide Belegsaetze sind gekuerzt, und zwar wegen der Naht.**
       * `redebloecke` klebt Voltis Kipppunkt aus der Szene davor an sein
       * Nachlegen hier: 6,9 Sekunden am Stueck bei erlaubten sechs. Statt eine
       * Zeile einzuschieben — der Short soll nicht wachsen — sind beide Saetze
       * um zusammen 27 Zeichen kuerzer.
       *
       * „Einzigartig heisst" faellt dabei weg. Der Satz bleibt gedeckt: Das
       * Zitat sagt „dass fuer jedes Benutzerkonto ein eigenes Passwort gewaehlt
       * wird", und genau das steht jetzt da — ohne das Wort, das die Definition
       * einleitete.
       */
      sprechtext:
        'Beim BSI heißt einzigartig: je Konto ein eigenes Passwort. Konto? Meins ist der Generalschlüssel für alles.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Beim BSI heißt einzigartig: je Konto ein eigenes Passwort.',
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
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'stutzen', nach: 'lesen' },
      },
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'stark-und-einzigartig',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      /*
       * **Die Restfrage schliesst jetzt den Kreis.** Sie gehoert weiter Watti
       * — der Bogen von „Beef" endet auf `nachhaken`, und ein `nachhaken`
       * behauptet nichts, kann also nicht derselbe Zug sein wie Voltis
       * Belegsatz. Kaemen beide von Volti, verschmoelze `redelaeufe` sie zu
       * einem Abschnitt und der zweite Zug erreichte das Bild nie.
       *
       * Neu ist, worauf sie zeigt: In der alten Fassung fragte Watti ins Leere
       * („Und wann kam deiner?"). Jetzt hat er seinen Hinweis seit dem ersten
       * Satz — und die Frage gibt sie an den Zuschauer weiter.
       */
      sprechtext: 'Nicht der Kalender entscheidet. Sondern?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Nicht der Kalender entscheidet.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'keine-zeitgemaesse-schutzmassnahme',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Sondern?' },
      ],
      satz: 'Nicht der Kalender entscheidet.',
      /*
       * Der Nachschlag traegt eine `belegId`, obwohl seine Position von der
       * Belegpflicht befreit ist. Grund ist ein Befund des `belegpruefer` vom
       * 30.08.2026: „Nicht der Kalender **entscheidet**" ist absolut, das an
       * der Zitatkarte gebundene Zitat sagt „erhoeht die Sicherheit **nicht
       * automatisch**". Der Schritt von „nicht automatisch" zu „nicht" stand
       * in keinem gebundenen Zitat — er stand zwei Absaetze darueber auf
       * derselben Seite und war damit zwei Zeilen entfernt zu haben.
       *
       * **Am 01.09.2026 ein zweites Mal derselbe Befund, an derselben Zeile.**
       * Nach dem Umschreiben stand dort „sondern der Verdacht" — ein Wort, das
       * in **keiner** gebundenen Fundstelle vorkommt. Der Short sagt jetzt
       * durchgehend „Hinweis": im Belegsatz, in Voltis Kipppunkt, im Bildtext
       * und hier. **Ein Wort, das nur an einer Stelle belegt ist, darf nicht
       * an vier Stellen stehen.**
       *
       * **Die vierte Wand.** Volti laesst Watti stehen und spricht den
       * Zuschauer an — `ansprechen` traegt als einzige Pose `zuwendung: 0` und
       * nimmt damit Blick und Neigung zur anderen Figur heraus.
       */
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'stutzen',
        gegenueber: { von: 'lesen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man von Anfang an, dass Watti seinen Hinweis schon hat – und hört, wie lange er braucht, um es zu merken.',
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
