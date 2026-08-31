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
 * ## Am 26.08.2026 auf zwei Stimmen umgebaut
 *
 * Der erste Entwurf, den die Reaktionsregel zurueckgehalten hat. Er war der
 * Musterfall dessen, wogegen sie gebaut ist: sechs Saetze, alle belegt, alle
 * richtig, und keine Zeile, die ein Mensch sagen wuerde.
 *
 * **Vier Reaktionen, vier Macharten**, und keine fasst den Fakt zusammen:
 *
 * - *„Unterbrechen? Und wer weckt mich dafür?"* haengt nicht am Beleg, sondern am Aufschlag:
 *   Wer bei etwa 70 Prozent abbrechen soll, kann nicht ueber Nacht laden. Die
 *   Folgerung bleibt beim Zuschauer.
 * - *„Also lade ich ab jetzt absichtlich schlecht."* ist erkennbar falsch —
 *   ein Schluss, der stimmen koennte, waere eine Behauptung und muesste belegt
 *   sein.
 * - *„Ausgeschaltet? Dann gucke ich die Wand an."* setzt an die Stelle der
 *   Empfehlung eine Szene.
 * - *„Memory? Meine Mutter hat mir das beigebracht!"* zielt auf den Verursacher statt
 *   auf die Sache. Der Mythos hat eine Herkunft, und sie steht nicht im Zitat.
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
  weitererzaehlt: 'Voll laden war die Regel. Heute ist es der Fehler.',
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
  vorspann: 'Dein Akku will gar nicht voll geladen werden',
  vorspannBelegId: 'siebzig-prozent-unterbrechen',

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
      rede: [{ sprecher: 'nachleser', text: 'Erst 12 Stunden laden, sagte man dir.' }],
      text: '12 Stunden laden.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'uhr', stand: 'links' },
    },
    {
      /*
       * **Watti eroeffnet, und das ist der eigentliche Umbau vom 31.08.2026.**
       *
       * Vorher begann Volti hier mit dem Belegsatz — und weil `redebloecke`
       * gleiche Sprecher ueber Szenengrenzen zusammenklebt, wurde daraus mit
       * dem Aufschlag ein Block von 6,9 Sekunden. Die Naht war unsichtbar: Der
       * Aufschlag fuer sich liegt bei 2,9, der Belegsatz bei 4,2, und keiner
       * von beiden ist zu lang.
       *
       * Wattis Gestaendnis davor loest sie ohne einen Umweg: Es bricht den
       * Block, es bringt den Aufschlag in die Gegenwart, und es macht aus
       * „Und wer weckt mich dafuer?" eine Antwort auf die eigene Ansage statt
       * auf den Beleg.
       *
       * Drei Anteile in einer Szene — Watti, Volti, Watti. Das ist die Form,
       * die den vier Entwuerfen bis heute gefehlt hat: Kein Redeanteil kehrte
       * je zum ersten Sprecher zurueck.
       */
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Ich stecke es abends rein und schlafe. Watti, das Umweltbundesamt sagt: vorher unterbrechen. Unterbrechen? Und wer weckt mich dafür?',
      rede: [
        { sprecher: 'zeiger', text: 'Ich stecke es abends rein und schlafe.', machart: 'gestaendnis' },
        { sprecher: 'nachleser', text: 'Watti, das Umweltbundesamt sagt: vorher unterbrechen.' },
        { sprecher: 'zeiger', text: 'Unterbrechen? Und wer weckt mich dafür?', machart: 'rueckfrage' },
      ],
      text: 'Akku vorher vom Kabel.',
      buehne: {
        art: 'figur',
        von: 'stutzen',
        nach: 'lesen',
        requisite: 'blatt',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
      quelleId: 'uba-akku-laden',
      belegId: 'siebzig-prozent-unterbrechen',
      herausgeber: 'Umweltbundesamt',
    },
    {
      /*
       * Eine `zahl`-Szene, keine `text`-Szene: Die 70 sind eine technische
       * Angabe, und die Regel `zahlImBild` verlangt sie im Bild. Eine
       * gesprochene Zahl ist eine Behauptung, eine gezeigte ist ein Beleg.
       *
       * Die Zahl gehoert damit zwingend Volti: Die Formsperre verbietet
       * Groessen mit Einheit in jeder Zeile, die eine `machart` traegt.
       */
      art: 'zahl',
      position: 'zuspitzung',
      sprechtext: 'Bei etwa 70 Prozent soll dein Akku vom Kabel. Nicht bei 100. Also lade ich ab jetzt absichtlich schlecht.',
      rede: [
        { sprecher: 'nachleser', text: 'Bei etwa 70 Prozent soll dein Akku vom Kabel. Nicht bei 100.' },
        { sprecher: 'zeiger', text: 'Also lade ich ab jetzt absichtlich schlecht.', machart: 'falscherschluss' },
      ],
      wert: '70',
      einheit: '%',
      bedeutung: 'Hier soll Schluss sein.',
      buehne: {
        art: 'figur',
        von: 'lesen',
        nach: 'nachdenken',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
      quelleId: 'uba-akku-laden',
      belegId: 'siebzig-prozent-unterbrechen',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Laden sollst du am besten ausgeschaltet. Ausgeschaltet? Dann gucke ich die Wand an.',
      rede: [
        { sprecher: 'nachleser', text: 'Laden sollst du am besten ausgeschaltet.' },
        { sprecher: 'zeiger', text: 'Ausgeschaltet? Dann gucke ich die Wand an.', machart: 'bild' },
      ],
      text: 'Am besten ausgeschaltet.',
      buehne: {
        art: 'figur',
        von: 'nachdenken',
        zwischen: ['ruhe'],
        nach: 'lesen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
      quelleId: 'uba-akku-laden',
      belegId: 'ausgeschalteter-zustand-laden',
    },
    {
      /*
       * **Die Waerme ist neu, und sie traegt die Aufloesung.**
       *
       * `u-berma-ssige-erwa` lag seit dem 24.08.2026 ungenutzt in der Quelle.
       * Der Short redete bis dahin ausschliesslich ueber Ladestaende — und
       * genau das ist die Frage, die das Maerchen offen laesst: Wenn es weder
       * voll noch leer sein soll, woran liegt es dann?
       *
       * Wattis Ratlosigkeit liefert keine Antwort mit. Sobald sie eine
       * mitlieferte, waere sie wieder ein Kommentar.
       *
       * **Der Satz hiess zuerst „Schlimmer als der Ladestand ist Waerme"**,
       * und der `belegpruefer` hat ihn am 31.08.2026 kassiert: Das Zitat
       * vergleicht mit nichts, und es spricht von *uebermaessiger* Erwaermung,
       * nicht von Waerme ueberhaupt. Dieselbe Quelle empfiehlt zwei Absaetze
       * weiter einen Ladestand von etwa 70 Prozent — sie sagt also gerade
       * nicht, dass der Ladestand harmlos ist.
       *
       * **Die Rangfolge war meine, nicht die der Behoerde.** Wattis Frage
       * traegt sie weiterhin, und das darf sie: Eine Frage behauptet nichts.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Übermäßige Wärme lässt deinen Akku schneller altern. Wärme? Es ging nie ums Volle?',
      rede: [
        { sprecher: 'nachleser', text: 'Übermäßige Wärme lässt deinen Akku schneller altern.' },
        { sprecher: 'zeiger', text: 'Wärme? Es ging nie ums Volle?', machart: 'ratlosigkeit' },
      ],
      text: 'Wärme altert den Akku.',
      buehne: {
        art: 'figur',
        von: 'lesen',
        nach: 'staunen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
      quelleId: 'uba-akku-laden',
      belegId: 'u-berma-ssige-erwa',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Den Memory-Effekt gibt es bei Lithium-Ionen gar nicht. Memory? Meine Mutter hat mir das beigebracht!',
      rede: [
        { sprecher: 'nachleser', text: 'Den Memory-Effekt gibt es bei Lithium-Ionen gar nicht.' },
        { sprecher: 'zeiger', text: 'Memory? Meine Mutter hat mir das beigebracht!', machart: 'empoerung' },
      ],
      text: 'Bei Lithium-Ionen: nein.',
      buehne: {
        art: 'figur',
        von: 'staunen',
        nach: 'stutzen',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
      quelleId: 'uba-akku-laden',
      belegId: 'der-memory-effekt-tritt',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Voll laden war die Regel. Heute ist es der Fehler.',
      rede: [{ sprecher: 'nachleser', text: 'Voll laden war die Regel. Heute ist es der Fehler.' }],
      satz: 'Voll laden war die Regel. Heute ist es der Fehler.',
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
