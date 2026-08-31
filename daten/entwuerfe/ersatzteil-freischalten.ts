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
 * Genau das ist die Hausregel von `absicht`: Es muss in einem Dokument stehen.
 * Der Nachschlag zieht die Konsequenz daraus, ohne Wirksamkeit zu behaupten —
 * ein Verbot im Amtsblatt ist noch kein freigeschaltetes Ersatzteil.
 *
 * ## Am 26.08.2026 auf zwei Stimmen umgebaut
 *
 * Vier Reaktionen, vier Macharten. `absicht` loest Empoerung aus, und genau
 * deshalb steht hier nur **eine** empoerte Zeile: Vier waeren die Haltung des
 * Kanals und keine Figur.
 *
 * **Der Beleg der dritten Szene ist dabei gewandert.** Der Satz sagt
 * „die Reparatur behindern"; die Fundstelle dafuer ist
 * `behindern-verwendung-ersatzteile` („behindern insbesondere die Verwendung
 * von Originalersatzteilen"), nicht der allgemeine Verbotssatz, an dem er
 * vorher hing. Dieselbe Aussage, aber die Fundstelle traegt jetzt wirklich
 * das Wort, das gesprochen wird.
 *
 * **Die Symbole sind bis auf den Schraubenschluessel weg.** Bei zwei Figuren
 * laege ein Symbol in der rechten — geblieben ist das Blatt in Voltis Hand,
 * und im Aufschlag steht er noch allein.
 *
 * `erklaeren` faellt hier ebenfalls aus, und das ist gemessen statt geraten:
 * Die drei ausgreifenden Posen legen eine Hand auf das andere Gehaeuse
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
  vorspann: 'Dein Ersatzteil darf keine Reparatur blockieren',
  vorspannBelegId: 'keine-hardware-oder-softwaretechniken',

  szenen: [
    {
      /*
       * Einstimmig, und das ist gerechnet: Der Aufschlag darf hoechstens 3,5
       * Sekunden sprechen. Watti tritt in der zweiten Szene dazu.
       */
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Ersatzteil passt. Es tut nichts.',
      rede: [{ sprecher: 'nachleser', text: 'Dein Ersatzteil passt. Es tut nichts.' }],
      text: 'Passt. Tut nichts.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'schraubenschluessel' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Und jetzt? Ich hab es doch richtig eingebaut. Watti, im Amtsblatt der EU steht dazu ein Verbot. Verbot? Das weiß mein Handy nicht?',
      rede: [
        { sprecher: 'zeiger', text: 'Und jetzt? Ich hab es doch richtig eingebaut.', machart: 'ratlosigkeit' },
        { sprecher: 'nachleser', text: 'Watti, im Amtsblatt der EU steht dazu ein Verbot.' },
        { sprecher: 'zeiger', text: 'Verbot? Das weiß mein Handy nicht?', machart: 'rueckfrage' },
      ],
      text: 'Verboten. Im Amtsblatt.',
      buehne: {
        art: 'figur',
        von: 'stutzen',
        nach: 'lesen',
        requisite: 'blatt',
        gegenueber: { von: 'ruhe', nach: 'staunen' },
      },
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'keine-hardware-oder-softwaretechniken',
      herausgeber: 'Europäische Union',
    },
    {
      /*
       * **Hier stand ein Satz mit 97 Zeichen**, und er war fuer sich allein
       * schon ein Fehler: Sechs Sekunden sind rund 86 Zeichen, also zwei
       * mittlere Saetze. Der Satz war einer.
       *
       * Zerlegt in vier Anteile, und die Zerlegung folgt der Meldung, die ihn
       * gefunden hat: **Die Frage gehoert dem anderen.** Wattis Ratlosigkeit
       * steht dabei nicht am Ende als Kommentar, sondern mitten im Satz —
       * genau dort, wo der Zuschauer sie hat.
       *
       * Naeher am Zitat als vorher. Die alte Fassung sprach von „freien
       * Werkstaetten", und die stehen in der gebundenen Fundstelle nicht.
       *
       * **Dabei ist der Satz erst zu weit geraten**, und der `belegpruefer`
       * hat es am selben Tag gefunden: „duerfen die Verwendung nicht
       * behindern" verbietet das Behindern **ueberhaupt**. Die Richtlinie
       * verbietet enger — den Einsatz von Vertragsklauseln und Hardware- oder
       * Softwaretechniken, die behindern. Ein Hersteller, der schlicht keine
       * Teile liefert, ist davon nicht erfasst.
       *
       * **Naeher am Zitat heisst nicht automatisch gedeckt.** Der Weg von
       * „zu eng am falschen Wort" nach „zu breit am richtigen" ist kurz.
       * Deshalb steht „per Software" jetzt darin, und der Anteil haengt an der
       * Fundstelle, die Subjekt und Verneinung mitbringt.
       *
       * ## Zwei Grenzen, die erst die zweite Person sichtbar gemacht hat
       *
       * Beim Umschreiben auf den Gespraechsmassstab wurde aus „die Verwendung
       * von Ersatzteilen" ein „deine", und **damit fielen zwei Grenzen auf, die
       * vorher niemand vermisst hatte**:
       *
       * - Der Absatz schuetzt den Einbau **durch unabhaengige
       *   Reparaturbetriebe**. „Deine gebrauchten Teile" machte aus einem
       *   Werkstattprivileg ein Verbraucherrecht — deshalb steht dort jetzt die
       *   Werkstatt.
       * - Er gilt nur fuer die Waren aus **Anhang II**, und Mobiltelefone sind
       *   Nummer 8. „Deine Reparatur" schlechthin ist zu weit; „deine
       *   Handy-Reparatur" ist gedeckt.
       *
       * **Eine Verallgemeinerung faellt nicht auf, eine Anrede schon.** Solange
       * der Satz „Hersteller duerfen …" hiess, klang er nach dem Rechtstext.
       * Sobald er „du" sagt, muss man wissen, wer gemeint ist.
       */
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Hersteller dürfen deine Handy-Reparatur nicht per Software behindern. Dafür hat jemand ein Jahr lang Gehalt bekommen. Auch nicht, wenn deine Werkstatt gebrauchte Ersatzteile einbaut. Erlaubt, und trotzdem tot.',
      rede: [
        {
          sprecher: 'nachleser',
          text: 'Hersteller dürfen deine Handy-Reparatur nicht per Software behindern.',
          quelleId: 'eu-reparaturrichtlinie-2024',
          belegId: 'keine-hardware-oder-softwaretechniken',
        },
        { sprecher: 'zeiger', text: 'Dafür hat jemand ein Jahr lang Gehalt bekommen.', machart: 'empoerung' },
        {
          sprecher: 'nachleser',
          text: 'Auch nicht, wenn deine Werkstatt gebrauchte Ersatzteile einbaut.',
          quelleId: 'eu-reparaturrichtlinie-2024',
          belegId: 'behindern-verwendung-ersatzteile',
        },
        { sprecher: 'zeiger', text: 'Erlaubt, und trotzdem tot.', machart: 'bild' },
      ],
      text: 'Einbau bei der Reparatur.',
      buehne: {
        art: 'figur',
        von: 'lesen',
        zwischen: ['stutzen'],
        nach: 'nachdenken',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
      hervorhebung: 'behindern',
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'behindern-verwendung-ersatzteile',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Gebrauchte und kompatible Ersatzteile stehen ausdrücklich drin. Meins ist vom Flohmarkt. Sag es keinem, Volti.',
      rede: [
        { sprecher: 'nachleser', text: 'Gebrauchte und kompatible Ersatzteile stehen ausdrücklich drin.' },
        { sprecher: 'zeiger', text: 'Meins ist vom Flohmarkt. Sag es keinem, Volti.', machart: 'gestaendnis' },
      ],
      text: 'Auch gebrauchte Ersatzteile.',
      buehne: {
        art: 'figur',
        von: 'stutzen',
        zwischen: ['lesen'],
        nach: 'nachdenken',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'kompatiblen-ersatzteilen',
    },
    {
      /*
       * Der 3D-Druck stand hier erst ohne eigene Fundstelle — er kam aus der
       * Zusammenfassung des Abrufs, nicht aus dem gebundenen Zitat. Die
       * Richtlinie nennt ihn tatsaechlich, an genau einer Stelle, und die
       * steht jetzt als eigener Beleg daneben.
       *
       * ## Warum dieses Fragment ohne Subjekt und Verneinung genuegt
       *
       * `mittels-3d-druck-hergestellt` und `kompatiblen-ersatzteilen` sind
       * Glieder einer Aufzaehlung. Sie tragen weder das Verb „behindern" noch
       * das „nicht" am Satzende — und sie brauchen es auch nicht, **weil der
       * Sprechtext nichts weiter behauptet als die Erwaehnung**: „stehen in
       * der Liste", „stehen ausdruecklich drin".
       *
       * Der Unterschied zum Fall, der am 31.08.2026 repariert wurde: Dort
       * hiess der Satz „duerfen nicht behindern", und das Fragment ohne
       * Verneinung sagte fuer sich gelesen das Gegenteil. Hier sagt das
       * Fragment genau so viel, wie der Satz braucht.
       *
       * **Die Regel „ein Zitat muss sein Subjekt enthalten" zielt auf
       * Fragmente, deren Bedeutung ausserhalb der geprueften Zeichenkette
       * haengt** — nicht auf jedes Fragment.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Sogar Teile aus dem 3D-Drucker stehen in der Liste. Drucker? Dann drucke ich mir gleich ein neues Handy.',
      rede: [
        { sprecher: 'nachleser', text: 'Sogar Teile aus dem 3D-Drucker stehen in der Liste.' },
        { sprecher: 'zeiger', text: 'Drucker? Dann drucke ich mir gleich ein neues Handy.', machart: 'falscherschluss' },
      ],
      text: 'Auch gedruckte Teile.',
      buehne: {
        art: 'figur',
        von: 'nachdenken',
        nach: 'lesen',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'mittels-3d-druck-hergestellt',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Dein Teil passt. Freigeschaltet ist es damit nicht.',
      rede: [{ sprecher: 'nachleser', text: 'Dein Teil passt. Freigeschaltet ist es damit nicht.' }],
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
