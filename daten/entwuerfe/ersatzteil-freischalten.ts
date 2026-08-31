import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · das Ersatzteil, das erst freigeschaltet werden muss.
 *
 * **Die Belegpflicht hat die Erzaehlung geformt.** Naheliegend waere der Satz
 * „Hersteller sperren Ersatzteile per Software" — nur belegt ihn niemand: Das
 * waere eine Aussage ueber die Praxis, und dafuer gibt es keine Behoerdenseite.
 * Was im Amtsblatt steht, ist das **Verbot**. Also traegt das Verbot den Short,
 * und die Praxis steht nur im Aufschlag, wo nichts behauptet wird.
 *
 * ## Am 01.09.2026 auf Zuege umgeschrieben
 *
 * Vorher war das hier ein Nebeneinander: Volti las vor, Watti kommentierte,
 * und **keine einzige Zeile bezog sich auf die vorige**. Alle zwoelf
 * Redeanteile wechselten sich strikt ab, und genau das klang im ersten
 * fertigen Video wie zwei Monologe.
 *
 * Drei Aenderungen, die aus dem Nebeneinander ein Gespraech machen:
 *
 * - **Watti widerspricht, statt zu kommentieren** („Das hat sich doch jemand
 *   ausgedacht"), und Volti stellt richtig. Der Beleg steht damit nicht mehr
 *   im Vortrag, sondern im Konter — dieselbe Fundstelle, andere Funktion.
 * - **Watti traegt einmal selbst den Beleg.** Er liest den Stichtag vom Blatt
 *   ab. Der Vertrag erlaubt das seit dem 25.08.2026 ausdruecklich („die Rollen
 *   sind fest, die Besetzung nicht"), und **kein Entwurf hatte es je
 *   eingeloest**. Es ist zugleich die einzige Stelle, an der zwei Zeilen
 *   hintereinander derselben Figur gehoeren — die Abweichung vom Metronom.
 * - **Der Kipppunkt ist ein anderer geworden.** Vorher war er „auch gebrauchte
 *   Teile stehen drin", also eine zweite Zuspitzung im Gewand einer Wendung.
 *   Jetzt ist es der Stichtag: Das Verbot gilt, und das Geraet in deiner Hand
 *   ist trotzdem nicht dabei. Das ist die Wendung, die `absicht` verlangt —
 *   jemand hat den Stichtag entschieden.
 *
 * ## Was gleich geblieben ist
 *
 * Die Fundstellen. Sie sind am 31.08.2026 einzeln geprueft worden, und der
 * Weg dorthin war teuer: Der Satz war erst zu eng am falschen Wort („freie
 * Werkstaetten" steht in der gebundenen Fundstelle nicht), dann zu breit am
 * richtigen („duerfen die Verwendung nicht behindern" verbietet das Behindern
 * ueberhaupt, die Richtlinie verbietet enger).
 *
 * Zwei Grenzen, die dabei sichtbar wurden und hier weitergelten:
 *
 * - Der Absatz schuetzt den Einbau **durch unabhaengige Reparaturbetriebe**,
 *   nicht die Selbstreparatur. Deshalb steht dort die Werkstatt.
 * - Er gilt nur fuer die Waren aus **Anhang II**, Mobiltelefone sind Nummer 8.
 *   „Deine Reparatur" schlechthin ist zu weit, „deine Handy-Reparatur" ist
 *   gedeckt.
 *
 * **Eine Verallgemeinerung faellt nicht auf, eine Anrede schon.**
 *
 * `erklaeren`, `zeigen` und `achselzucken` fallen im Wortwechsel aus, und das
 * ist gemessen statt geraten: Die drei legen eine Hand auf das andere Gehaeuse
 * (`video/Wortwechselprobe.tsx`).
 */
export const ersatzteilFreischalten: Short = {
  id: 'ersatzteil-freischalten',
  themaId: 'parts-pairing',
  format: 'absicht',
  sachgebiet: 'recht',
  bauform: 'wechselrede',
  arbeitstitel: 'Das Ersatzteil und das Verbot',
  weitererzaehlt: 'Dein Teil passt. Freigeschaltet ist es damit nicht.',
  suchbegriff: 'Ersatzteil Reparatur',
  vorspann: 'Ein Verbot für Hersteller, und die Ausnahme dazu',
  vorspannBelegId: 'es-sei-denn-legitime',

  szenen: [
    {
      /*
       * Einstimmig, und das ist gerechnet: Der Aufschlag darf hoechstens 3,5
       * Sekunden sprechen. Watti tritt in der zweiten Szene dazu.
       */
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Ersatzteil passt. Es tut nichts.',
      rede: [
        { sprecher: 'nachleser', zug: 'behaupten', text: 'Dein Ersatzteil passt. Es tut nichts.' },
      ],
      text: 'Ersatzteil passt. Tut nichts.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'schraubenschluessel' },
    },
    {
      /*
       * **Der Widerspruch ist der Motor dieser Szene**, nicht der Beleg. Watti
       * bestreitet, Volti kontert mit der Fundstelle — vorher stand derselbe
       * Satz als vierte Behauptung in einer Reihe von Behauptungen.
       *
       * Wattis Widerspruch behauptet dabei nichts („das hat sich jemand
       * ausgedacht" ist eine Unterstellung, keine Aussage ueber die Welt) und
       * traegt deshalb keine Quelle.
       */
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Dann hast du es falsch eingebaut. Im Amtsblatt der EU steht dazu ein Verbot. Und jetzt? Ich hab es doch richtig eingebaut. Hersteller dürfen deine Handy-Reparatur nicht per Software behindern.',
      rede: [
        { sprecher: 'zeiger', zug: 'widersprechen', text: 'Dann hast du es falsch eingebaut.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Im Amtsblatt der EU steht dazu ein Verbot.',
          quelleId: 'eu-reparaturrichtlinie-2024',
          belegId: 'keine-hardware-oder-softwaretechniken',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          text: 'Und jetzt? Ich hab es doch richtig eingebaut.',
          machart: 'ratlosigkeit',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Hersteller dürfen deine Handy-Reparatur nicht per Software behindern.',
          quelleId: 'eu-reparaturrichtlinie-2024',
          belegId: 'keine-hardware-oder-softwaretechniken',
        },
      ],
      text: 'Verboten. Im Amtsblatt.',
      buehne: {
        art: 'figur',
        von: 'stutzen',
        zwischen: ['lesen'],
        nach: 'nachdenken',
        requisite: 'blatt',
        gegenueber: { von: 'ruhe', zwischen: ['staunen'], nach: 'stutzen' },
      },
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'keine-hardware-oder-softwaretechniken',
      herausgeber: 'Europäische Union',
    },
    {
      /*
       * Wattis Zeile greift „Software" aus der Vorzeile auf und dreht es ins
       * Handfeste — der Zug `umdeuten` verlangt genau das, und `rueckbezug`
       * prueft es nach. Ein behaupteter Anschluss ohne gemeinsames Wort waere
       * schlimmer als keiner.
       */
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Software? Ich hab einen Schraubenschlüssel benutzt. Hersteller dürfen freie Werkstätten bei zulässigen Ersatzteilen nicht behindern. Gebrauchte Teile zählen doch nicht, Volti.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          text: 'Software? Ich hab einen Schraubenschlüssel benutzt.',
          machart: 'bild',
        },
        {
          sprecher: 'nachleser',
          zug: 'gegenbeispiel',
          text: 'Hersteller dürfen freie Werkstätten bei zulässigen Ersatzteilen nicht behindern.',
          quelleId: 'eu-reparaturrichtlinie-2024',
          belegId: 'behindern-verwendung-ersatzteile',
        },
        {
          sprecher: 'zeiger',
          zug: 'widersprechen',
          text: 'Gebrauchte Teile zählen doch nicht, Volti.',
        },
      ],
      text: 'Einbau bei der Reparatur.',
      buehne: {
        art: 'figur',
        von: 'nachdenken',
        zwischen: ['lesen'],
        nach: 'ruhe',
        requisite: 'blatt',
        gegenueber: { von: 'stutzen', zwischen: ['nachdenken'], nach: 'hochschauen' },
      },
      hervorhebung: 'Reparatur',
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'behindern-verwendung-ersatzteile',
    },
    {
      /*
       * `mittels-3d-druck-hergestellt` traegt weder Subjekt noch Verneinung,
       * und das genuegt hier: Der Sprechtext behauptet nichts weiter als die
       * **Erwaehnung** („stehen in der Liste"). Die Regel „ein Zitat muss sein
       * Subjekt enthalten" zielt auf Fragmente, deren Bedeutung ausserhalb der
       * geprueften Zeichenkette haengt — nicht auf jedes Fragment.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext:
        'Teile aus dem 3D-Drucker stehen in der Richtlinie. Drucker? Dann drucke ich mir gleich ein neues Handy.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Teile aus dem 3D-Drucker stehen in der Richtlinie.',
          quelleId: 'eu-reparaturrichtlinie-2024',
          belegId: 'mittels-3d-druck-hergestellt',
        },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          text: 'Drucker? Dann drucke ich mir gleich ein neues Handy.',
          machart: 'falscherschluss',
        },
      ],
      text: 'Auch gedruckte Teile.',
      buehne: {
        art: 'figur',
        von: 'nachdenken',
        nach: 'lesen',
        requisite: 'blatt',
        gegenueber: { von: 'staunen', nach: 'stutzen' },
      },
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'mittels-3d-druck-hergestellt',
    },
    {
      /*
       * **Der Kipppunkt, und Watti liest ihn selbst vor.** Volti gibt das
       * Blatt weiter, statt die Antwort zu sprechen — damit traegt der Beleg
       * hier die Figur, die sonst nur reagiert, und die Redefolge weicht an
       * genau einer Stelle vom strikten Abwechseln ab.
       *
       * ## Hier stand am 01.09.2026 das Gegenteil des Belegten
       *
       * Der Kipppunkt lautete „Nicht, wenn du dein Handy vorher gekauft hast"
       * und hing an `gilt-nicht-fu-r`: „gilt nicht für Kaufverträge, die vor
       * dem 31. Juli 2026 geschlossen wurden". Der volle Satz beginnt mit
       * **„Artikel 16 dieser Richtlinie"** — und Artikel 16 aendert die
       * Warenkaufrichtlinie. Das Softwareverbot steht in Artikel 5 Absatz 6
       * und kennt diese Uebergangsregel nicht.
       *
       * Der Short behauptete damit nicht zu viel, sondern **das Gegenteil**:
       * Das Verbot gilt fuer das Geraet in der Hand des Zuschauers sehr wohl.
       * Gefunden hat es der `belegpruefer`, `npm run quellen-pruefen` war
       * gruen — die Zeichenkette stand ja auf der Seite. Genau der Fall, fuer
       * den die Subjektregel gebaut ist, und sie hat gefehlt, weil das Subjekt
       * hier kein Substantiv ist, sondern eine **Artikelnummer**.
       *
       * **Der neue Kipppunkt ist die Tuer im Verbot.** Sie steht unmittelbar
       * hinter der Fundstelle, an der der Short ohnehin schon haengt, und ist
       * die Wendung, die `absicht` verlangt: Es gibt ein Verbot, und es hat
       * eine Ausnahme, die jemand hineingeschrieben hat.
       *
       * Der Stichtag steht hinter einem Doppelpunkt. Ohne ihn waere „Die
       * Mitgliedstaaten wenden diese Vorschriften an" Amtsdeutsch im
       * Sprechtext, und das ist ein Fehler.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext:
        'Lies mal, was hinter dem Verbot steht. Hier steht: es sei denn, das ist durch geistiges Eigentum gerechtfertigt. Also immer. Und die Vorschriften gelten erst seit dem 31. Juli 2026. Ich hab den Schraubenzieher verdächtigt.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          text: 'Lies mal, was hinter dem Verbot steht.',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachlegen',
          text: 'Hier steht: es sei denn, das ist durch geistiges Eigentum gerechtfertigt.',
          quelleId: 'eu-reparaturrichtlinie-2024',
          belegId: 'es-sei-denn-legitime',
        },
        { sprecher: 'zeiger', zug: 'zuspitzen', text: 'Also immer.' },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Und die Vorschriften gelten erst seit dem 31. Juli 2026.',
          quelleId: 'eu-reparaturrichtlinie-2024',
          belegId: 'die-mitgliedstaaten-wenden-diese',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          text: 'Ich hab den Schraubenzieher verdächtigt.',
          machart: 'gestaendnis',
        },
      ],
      text: 'Es sei denn: geistiges Eigentum.',
      buehne: {
        art: 'figur',
        von: 'ruhe',
        zwischen: ['stutzen'],
        nach: 'nachdenken',
        gegenueber: { von: 'hochschauen', zwischen: ['lesen'], nach: 'staunen' },
      },
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'es-sei-denn-legitime',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Dein Teil passt. Freigeschaltet ist es damit nicht.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Dein Teil passt. Freigeschaltet ist es damit nicht.',
        },
      ],
      satz: 'Dein Teil passt. Freigeschaltet ist es damit nicht.',
      rundlauf:
        'Beim zweiten Sehen ist „es tut trotzdem nichts" keine Klage mehr, sondern der Grund, warum das Verbot überhaupt nötig war.',
    },
  ],

  quellenIds: ['eu-reparaturrichtlinie-2024'],

  texte: {
    tiktok: {
      titel: 'Das Ersatzteil und das Verbot',
      beschreibung: 'Ein Ersatzteil, das nach der Reparatur nichts tut – die EU untersagt genau das.',
      hashtags: ['#partspairing', '#ersatzteile', '#righttorepair', '#eurecht', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Das Ersatzteil und das Verbot',
      beschreibung: 'Ersatzteil eingebaut, Reparatur erledigt, Funktion trotzdem tot. Dagegen steht ein Verbot.',
      hashtags: ['#ersatzteile', '#reparieren', '#righttorepair', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Das Ersatzteil und die Softwaretechnik',
      beschreibung: 'Ersatzteil und Reparatur: Was die Richtlinie 2024/1799 Herstellern ausdrücklich untersagt.',
      hashtags: ['#ersatzteile', '#reparatur', '#verbraucherrecht', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
