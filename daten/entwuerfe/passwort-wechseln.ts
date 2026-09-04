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
  arbeitstitel: 'Watti wechselt fleißig das falsche Passwort',
  weitererzaehlt: 'für jedes Benutzerkonto ein eigenes Passwort',
  suchbegriff: 'Passwort wechseln',
  /*
   * **Der Kaltstart, mit Emirhans Wortlaut** — der Satz, an dem die ganze
   * Ebene entstanden ist. Watti steht vor dem Vorhang neben einem Zettel und
   * merkt gerade, dass es zu spaet ist.
   *
   * Gekuerzt ist er um fuenf Zeichen: „Kacke ich haette mein Passwort
   * wechseln muessen" liegt mit Satzzeichen bei 47 und damit ueber den 3,5
   * Sekunden, die der erste Satz des Videos haben darf.
   */
  kaltstart: {
    art: 'momentdanach',
    satz: 'Oh man. Ich hätte mein Passwort wechseln müssen.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'zettel' },
  },
  /*
   * **Die Zeile traegt seit dem 02.09.2026 einen Namen und behauptet nichts
   * mehr.** Hier stand „Passwort regelmaessig wechseln ist ueberholt", davor
   * „bringt gar nichts" — der teuerste Fehler dieses Projekts in seiner
   * reinsten Form: Das BSI sagt „erhoeht die Sicherheit **nicht
   * automatisch**".
   *
   * Die Belegkennung ist nicht gestrichen, sondern gewandert — dorthin, wo vor
   * dem Vorhang noch etwas behauptet wird. Hier behauptet nichts mehr, also
   * kann nichts mehr ueberzogen werden.
   */
  vorspann: 'Wattis Passwort und der Kalender',


  szenen: [
    {
      /*
       * **Der Aufschlag ist eine Bitte, kein Bericht.**
       *
       * Watti hat vor dem Vorhang mit sich selbst geredet; hier geht er zu
       * seinem Bruder. Dass er dabei nicht denselben Satz fortsetzt, sondern
       * `Volti` **anspricht**, ist genau das, was die Anschlussregel seit dem
       * 02.09.2026 verlangt — und der Grund, warum sie an diesem Tag von „der
       * andere muss antworten" auf „Anrede oder Antwort" umgestellt wurde.
       * **Emirhans Bau war da, bevor die Regel ihn zuliess.**
       *
       * 31 Zeichen, rund 2,4 Sekunden.
       */
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Volti, ich brauche deine Hilfe.',
      rede: [{ sprecher: 'zeiger', zug: 'bitten', text: 'Volti, ich brauche deine Hilfe.' }],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      /*
       * **Die Mail, geteilt in zwei Zeilen.**
       *
       * In einem Stueck sind es 79 Zeichen und damit 6,1 Sekunden — knapp
       * ueber der Grenze, ab der ein Redeblock ein Vortrag wird. Geteilt ist er
       * nicht nur kuerzer, sondern besser: Die zweite Haelfte ist die
       * eigentliche Nachricht und steht jetzt allein.
       *
       * **Voltis Rat ist zugleich der Beleg dieser Szene.** Jede Zuspitzung
       * muss eine Fundstelle nennen — dort liegt die Substanz. Das BSI nennt
       * den Hinweis auf Unbefugte als Anlass zum Wechseln, und Watti hat
       * genau den seit der Mail.
       */
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-umgang-mit-passwoertern',
      belegId: 'geaendert-wenn-hinweis-unbefugte',
      sprechtext:
        'Klar, was ist los? Ich habe eine Mail bekommen. Ein fremdes Gerät hat sich eingeloggt. Dann musst du wechseln, du hast ja einen Hinweis.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Klar, was ist los?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Ich habe eine Mail bekommen.' },
        { sprecher: 'zeiger', zug: 'nachlegen', text: 'Ein fremdes Gerät hat sich eingeloggt.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Dann musst du wechseln, du hast ja einen Hinweis.',
          quelleId: 'bsi-umgang-mit-passwoertern',
          belegId: 'geaendert-wenn-hinweis-unbefugte',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'lesen' },
      },
    },
    {
      /*
       * **Watti verraet sich beim Verteidigen.**
       *
       * Das Mittel aus Emirhans Dialog, fuer das es im Schema keinen Namen
       * gibt: Die Zeile beantwortet richtig („hab ich schon") und liefert im
       * selben Atemzug den groesseren Fehler mit. Der Zuschauer hoert ihn vor
       * Volti — er ist einen Schritt voraus, ohne dass ihm jemand etwas
       * erklaert hat.
       *
       * Deshalb `zuspitzen` und nicht `nachlegen`: Der Satz behauptet nichts
       * ueber die Welt, sondern verraet etwas ueber den Sprecher, und nur so
       * darf er eine `machart` tragen.
       *
       * **„Du Idiot" ist erlaubt, weil die beiden Brueder sind.** Man sucht
       * sich nicht aus, wen man korrigiert — deshalb klingt es nach Kueche und
       * nicht nach Verachtung.
       */
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'schwache-vorhersehbare-passwoerter',
      sprechtext:
        'Hab ich schon, ich bin doch kein Idiot. Hoffentlich nicht in meinen anderen Konten. Du Idiot, hast du überall dasselbe Passwort? Ja klar, sonst vergesse ich sie. Genau deshalb greifen die Leute zu schwachen Passwörtern. Na super.',
      rede: [
        { sprecher: 'zeiger', zug: 'richtigstellen', text: 'Hab ich schon, ich bin doch kein Idiot.' },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'gestaendnis',
          text: 'Hoffentlich nicht in meinen anderen Konten.',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachhaken',
          text: 'Du Idiot, hast du überall dasselbe Passwort?',
        },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Ja klar, sonst vergesse ich sie.' },
        {
          sprecher: 'nachleser',
          zug: 'gegenbeispiel',
          text: 'Genau deshalb greifen die Leute zu schwachen Passwörtern.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'schwache-vorhersehbare-passwoerter',
        },
        /* **„Na super." ist der Schnitt.** Ohne diese eine Sekunde spricht
           Volti ueber die Szenengrenze hinweg 9,2 Sekunden am Stueck —
           `redelaeufe` klebt seinen Belegsatz an die Zitatkarte, und aus einem
           Streit wird ein Vortrag. */
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Na super.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'erklaeren',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'stutzen' },
      },
    },
    {
      /*
       * **Der Kipppunkt sitzt auf der Einzigartigkeit.**
       *
       * Die alte Fassung kippte auf „ein Wechsel nach Plan erhoeht die
       * Sicherheit nicht automatisch" — richtig belegt, aber es traf Watti
       * nicht. Hier trifft es ihn: Er hat gewechselt, er hat es sogar richtig
       * gemacht, und trotzdem liegt sein Fehler eine Ebene tiefer.
       *
       * **Wattis Einwurf ist zugleich der Schnitt.** Ohne ihn spraeche Volti
       * ueber die Szenengrenze hinweg zwoelf Sekunden am Stueck; `redelaeufe`
       * klebt sie zu einem Aufruf zusammen, und aus einem Streit wird ein
       * Vortrag. Er kostet zwei Sekunden und traegt dabei das zweite Lager,
       * das `werhatrecht` braucht.
       */
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'für jedes Benutzerkonto ein eigenes Passwort',
      quelleId: 'bsi-passwortwechsel-2026',
      belegId: 'stark-und-einzigartig',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Vollpfosten. Beim BSI steht: für jedes Benutzerkonto ein eigenes Passwort. Für jedes? Das merkt sich doch keiner.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Vollpfosten. Beim BSI steht: für jedes Benutzerkonto ein eigenes Passwort.',
          quelleId: 'bsi-passwortwechsel-2026',
          belegId: 'stark-und-einzigartig',
        },
        {
          sprecher: 'zeiger',
          /* Nicht `widersprechen`: Ein Widerspruch verlangt einen Konter, und
             danach kommt nur noch der Nachschlag — eine Antwortpflicht, die der
             Short nicht mehr einloesen kann, ist eine offene Rechnung.

             `umdeuten` statt `zuspitzen`, weil es genauer ist und nebenbei das
             Zugpaar aufloest: Watti greift „fuer jedes Benutzerkonto" auf und
             dreht es zu „das merkt sich keiner". `rueckbezug` sieht das Wort. */
          zug: 'umdeuten',
          text: 'Für jedes? Das merkt sich doch keiner.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'stutzen',
        gegenueber: { von: 'stutzen', nach: 'erklaeren' },
      },
    },
    {
      /*
       * **Die banale Rueckfrage ist die Vorlage, nicht die Pointe.**
       *
       * Das dritte Mittel aus Emirhans Dialog: Watti fragt das Naheliegendste,
       * damit Volti die Formel setzen kann. Setup und Punchline liegen bei
       * zwei Figuren — das kann ein einstimmiger Short nicht.
       *
       * **Und die Restfrage steht danach.** `werhatrecht` muss offen enden, und
       * Emirhans Reihenfolge — Frage, dann Formel — schloss den Short. Ein Beat
       * mehr loest beides: Die Formel bleibt sein Satz, und Watti hat das
       * letzte Wort, weil er es immer noch nicht verstanden hat.
       *
       * Die Formel steht in `SCHLUSSFORMELN`, und die laufweite Wache sorgt
       * dafuer, dass sie nicht zum Markenwort wird.
       */
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Für jedes Benutzerkonto ein eigenes Passwort.',
      sprechtext:
        'Also wirklich für jedes Konto ein anderes? Du sollst weniger dumme Fragen stellen und öfter deinen Verstand nutzen. War das ein Ja?',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'rueckfrage',
          text: 'Also wirklich für jedes Konto ein anderes?',
        },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          text: 'Du sollst weniger dumme Fragen stellen und öfter deinen Verstand nutzen.',
        },
        /* **Die Restfrage.** `werhatrecht` endet laut Gespraechsbogen offen —
           auf Nachhaken, Einschraenken oder Widersprechen. Emirhans
           Reihenfolge (Frage, dann Formel) schloss den Short; ein Beat mehr
           loest beides. Die Formel bleibt sein Satz, und Watti hat das letzte
           Wort, weil er es immer noch nicht verstanden hat. */
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'War das ein Ja?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'erklaeren', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man von Anfang an, dass Watti überall dasselbe Passwort hat – und hört, wie lange er braucht, um es zuzugeben.',
    },
  ],

  quellenIds: ['bsi-passwortwechsel-2026', 'bsi-umgang-mit-passwoertern'],

  texte: {
    tiktok: {
      titel: 'Watti wechselt fleißig das falsche Passwort',
      beschreibung: 'Passwort wechseln nach Kalender: Das BSI sagt, das erhöht die Sicherheit nicht automatisch.',
      hashtags: ['#passwortsicherheit', '#bsi', '#passkeys', '#zweifaktor', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti wechselt fleißig das falsche Passwort',
      beschreibung: 'Dein Passwort wechseln musst du nicht nach Kalender, sondern bei einem Hinweis.',
      hashtags: ['#passwortsicherheit', '#onlinesicherheit', '#bsi', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Der Kalender entscheidet nicht, wann ein Passwort weg muss',
      beschreibung: 'Passwort wechseln nach BSI: Warum der Routinewechsel die Sicherheit nicht automatisch erhöht.',
      hashtags: ['#passwort', '#bsi', '#itsicherheit', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
