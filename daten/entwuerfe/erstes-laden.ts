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
 *
 * ## Am 01.09.2026 auf Zuege umgeschrieben
 *
 * Der Entwurf vom 26.08. hatte vier tadellose Reaktionen und trotzdem kein
 * Gespraech. Der Grund stand im Muster, nicht in den Zeilen: **Fuenfmal
 * hintereinander griff Watti ein Wort auf, haengte ein Fragezeichen daran und
 * kommentierte** — „Unterbrechen? …", „Ausgeschaltet? …", „Waerme? …",
 * „Memory? …". Jede Zeile fuer sich war richtig gebaut; zusammen waren sie
 * eine Masche.
 *
 * Was der Umbau geaendert hat:
 *
 * - **Watti verteidigt jetzt das Maerchen, statt es zu kommentieren.** Bei
 *   `eswareinmal` irrt laut Bogen der Zeiger — also muss er auch etwas
 *   behaupten duerfen, das falsch ist: „Sonst merkt der Akku sich das doch."
 *   Der Memory-Effekt ist damit nicht mehr eine weitere Fundstelle in der
 *   Reihe, sondern der **Konter** auf einen Widerspruch.
 * - **Volti spricht einmal zwei Zeilen am Stueck** (Szene 4). Die uebrigen
 *   drei Entwuerfe wechselten sich zu 100 % ab — 14 von 14, 12 von 12, 10 von
 *   10 —, und ein Wechsel, der nie ausfaellt, ist ein Metronom.
 * - **Der falsche Schluss steht am Ende und bleibt stehen.** Vorher stand er
 *   in der Mitte und wurde nicht aufgegriffen; jetzt ist der Nachschlag seine
 *   Richtigstellung.
 *
 * Die vier Fundstellen sind dieselben geblieben. Neu gebunden ist
 * `eine-vollstaendige-entleerung` — das Maerchen faengt beim Leerlaufen an,
 * nicht beim Vollmachen, und der Aufschlag nennt beides.
 *
 * **Die Symbole sind dabei verloren gegangen, bis auf zwei.** Bei zwei Figuren
 * steht die rechte auf x = 158 und ein Symbol auf x = 152 — Uhr, Batterie,
 * Steckdose und Lupe passen dort nicht mehr hin, und das Schema lehnt die
 * Kombination seit heute ab. Geblieben sind die Uhr im einstimmigen Aufschlag
 * und das Blatt in Voltis Hand.
 *
 * **Drei Posen hat erst das Standbild verworfen**, alle drei im Code
 * unauffaellig: `achselzucken`, `zeigen` und `erklaeren` legen bei zwei
 * Figuren eine Hand auf das andere Gehaeuse. Nach dem dritten Fall ist die
 * Frage nicht mehr je Short beantwortet worden, sondern einmal fuer das ganze
 * Vokabular — `video/Wortwechselprobe.tsx`.
 */
export const erstesLaden: Short = {
  id: 'erstes-laden',
  themaId: 'erstes-laden-zwoelf-stunden',
  format: 'eswareinmal',
  sachgebiet: 'laden',
  bauform: 'wechselrede',
  arbeitstitel: '12 Stunden beim ersten Laden',
  weitererzaehlt: '12 Stunden waren die Regel. Ideal sind heute 70 Prozent.',
  suchbegriff: 'Akku laden',
  /*
   * **„Kaputt" trug keine der sechs Fundstellen** und stand hier bis zum
   * 31.08.2026. Das Umweltbundesamt nennt genau zwei Dinge schaedlich —
   * uebermaessige Erwaermung und vollstaendige Entleerung —, und den frueheren
   * Halt bei 70 % nennt es „ideal". Der Weg von „nicht ideal" zu „kaputt" ist
   * derselbe Schritt wie „nicht automatisch" zu „nicht", nur in der anderen
   * Richtung.
   *
   * Die neue Zeile behauptet weiterhin — sie sagt nur das, was die Quelle
   * hergibt: Nicht das Volle ist das Ziel, sondern die 70 %.
   */
  /*
   * **Der stolze Fehler.** Watti hat gerade zwoelf Stunden geladen und ist
   * zufrieden damit — der Zuschauer weiss es besser oder ahnt es und bleibt,
   * um recht zu behalten. „Stunden" traegt die Bruecke in den Aufschlag.
   *
   * Zwei Saetze, keine Jahreszahl, keine Groesse mit Einheit: Eine Zeitspanne
   * behauptet etwas ueber den Sprecher, nicht ueber die Welt.
   */
  kaltstart: {
    art: 'stolzerfehler',
    satz: '12 Stunden geladen. Jetzt hält der ewig.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'uhr' },
  },
  /*
   * **Die Zeile nennt Watti und behauptet nichts mehr.** Hier stand „Dein Akku
   * will gar nicht voll geladen werden", davor „Voll laden macht deinen Akku
   * kaputt" — „kaputt" trug keine der sechs Fundstellen des
   * Umweltbundesamtes.
   */
  vorspann: 'Wattis Glaube ans erste Laden',


  szenen: [
    {
      /*
       * Der Aufschlag bleibt einstimmig, und das ist gerechnet: Er darf
       * hoechstens 3,5 Sekunden sprechen, und die 38 Zeichen liegen bei rund
       * 2,9. Eine Reaktion daneben — auch eine kurze — spraenge die Grenze.
       */
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Erst 12 Stunden laden, sagte man dir.',
      rede: [
        /* `richtigstellen` statt `behaupten`: Der Satz antwortet seit dem
           02.09.2026 auf Wattis Kaltstart, statt aus dem Nichts zu behaupten. */
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Erst 12 Stunden laden, sagte man dir.',
        },
      ],
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'uhr', stand: 'links' },
    },
    {
      /*
       * **Watti verteidigt hier das Maerchen.** „Sonst merkt der Akku sich
       * das doch" ist der Satz, der die alte Regel getragen hat — und er
       * behauptet nichts ueber die Welt, sondern gibt eine Ueberzeugung
       * wieder. Deshalb traegt er keine Quelle und darf falsch sein.
       *
       * Der Memory-Effekt steht dagegen nicht mehr als vierte Fundstelle in
       * einer Reihe, sondern als **Konter**: Er beantwortet genau den Einwand,
       * der eine Zeile vorher gefallen ist.
       */
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Und vorher ganz leer fahren, Volti? Wer vorher auflädt, statt leer zu warten, verlängert die Lebensdauer. Sonst merkt der Akku sich das doch. Den Memory-Effekt gibt es bei Lithium-Ionen gar nicht.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          text: 'Und vorher ganz leer fahren, Volti?',
          machart: 'rueckfrage',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Wer vorher auflädt, statt leer zu warten, verlängert die Lebensdauer.',
          quelleId: 'uba-akku-laden',
          belegId: 'wenn-sie-nicht-warten',
        },
        { sprecher: 'zeiger', zug: 'widersprechen', text: 'Sonst merkt der Akku sich das doch.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Den Memory-Effekt gibt es bei Lithium-Ionen gar nicht.',
          quelleId: 'uba-akku-laden',
          belegId: 'der-memory-effekt-tritt',
        },
      ],
      buehne: {
        art: 'figur',
        von: 'stutzen',
        zwischen: ['lesen'],
        nach: 'nachdenken',
        requisite: 'blatt',
        gegenueber: { von: 'ruhe', zwischen: ['stutzen'], nach: 'staunen' },
      },
      quelleId: 'uba-akku-laden',
      belegId: 'wenn-sie-nicht-warten',
      herausgeber: 'Umweltbundesamt',
    },
    {
      /*
       * Die Zahlenszene traegt jetzt die Empfehlung, und Wattis Ratlosigkeit
       * haengt nicht am Beleg, sondern am Aufschlag: Wer bei etwa 70 Prozent
       * abbrechen soll, kann nicht ueber Nacht laden. Die Folgerung bleibt
       * beim Zuschauer.
       */
      art: 'zahl',
      position: 'zuspitzung',
      sprechtext:
        'Memory-Effekt? Meine Mutter hat mir das beigebracht. Ideal ist: bei etwa 70 Prozent unterbrechen. Und wer weckt mich dafür nachts?',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          text: 'Memory-Effekt? Meine Mutter hat mir das beigebracht.',
          machart: 'falscheautoritaet',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Ideal ist: bei etwa 70 Prozent unterbrechen.',
          quelleId: 'uba-akku-laden',
          belegId: 'siebzig-prozent-unterbrechen',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          text: 'Und wer weckt mich dafür nachts?',
          machart: 'ratlosigkeit',
        },
      ],
      wert: '70',
      einheit: '%',
      bedeutung: 'Hier soll Schluss sein.',
      buehne: {
        art: 'figur',
        von: 'nachdenken',
        nach: 'lesen',
        requisite: 'blatt',
        gegenueber: { von: 'staunen', zwischen: ['nachdenken'], nach: 'stutzen' },
      },
      quelleId: 'uba-akku-laden',
      belegId: 'siebzig-prozent-unterbrechen',
    },
    {
      /*
       * **Die einzige Stelle im ganzen Lauf, an der eine Figur zweimal
       * hintereinander spricht.** Sie steht hier und nicht anderswo, weil die
       * beiden Empfehlungen zusammengehoeren: Wie geladen wird und warum.
       * Wattis Bild kommt danach und trifft beide auf einmal.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext:
        'Laden sollst du am besten ausgeschaltet. Übermäßige Wärme lässt ihn schneller altern. Kühlschrank. Da altern Sachen langsamer.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Laden sollst du am besten ausgeschaltet.',
          quelleId: 'uba-akku-laden',
          belegId: 'ausgeschalteter-zustand-laden',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Übermäßige Wärme lässt ihn schneller altern.',
          quelleId: 'uba-akku-laden',
          belegId: 'u-berma-ssige-erwa',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          text: 'Kühlschrank. Da altern Sachen langsamer.',
          machart: 'bild',
        },
      ],
      buehne: {
        art: 'figur',
        von: 'lesen',
        zwischen: ['ruhe'],
        nach: 'nachdenken',
        requisite: 'blatt',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
      quelleId: 'uba-akku-laden',
      belegId: 'u-berma-ssige-erwa',
    },
    {
      /*
       * Der falsche Schluss steht jetzt **am Ende** des Gespraechs und bleibt
       * stehen — der Nachschlag ist seine Richtigstellung. Vorher stand er in
       * der Mitte, und niemand ging darauf ein.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext:
        'Auch die Aufbewahrung bei extremer Kälte soll man vermeiden. Also lade ich ab jetzt absichtlich schlecht.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Auch die Aufbewahrung bei extremer Kälte soll man vermeiden.',
          quelleId: 'uba-akku-laden',
          belegId: 'extreme-kaelte-vermieden',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          text: 'Also lade ich ab jetzt absichtlich schlecht.',
          machart: 'falscherschluss',
        },
      ],
      buehne: {
        art: 'figur',
        von: 'nachdenken',
        nach: 'stutzen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
      quelleId: 'uba-akku-laden',
      belegId: 'extreme-kaelte-vermieden',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: '12 Stunden waren die Regel. Ideal sind heute 70 Prozent.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: '12 Stunden waren die Regel. Ideal sind heute 70 Prozent.',
        },
      ],
      satz: '12 Stunden waren die Regel. Ideal sind heute 70 Prozent.',
      /*
       * **Die vierte Wand.** Volti laesst Watti stehen und spricht den
       * Zuschauer an — `ansprechen` traegt als einzige Pose `zuwendung: 0`
       * und nimmt damit Blick und Neigung zur anderen Figur heraus.
       *
       * Der Nachschlag ist der Ort dafuer, weil er der einzige Satz im Short
       * ist, der niemandem auf der Buehne gilt.
       */
      buehne: {
        art: 'figur',
        von: 'stutzen',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'ruhe' },
      },
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
