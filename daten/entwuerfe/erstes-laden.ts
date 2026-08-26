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
 * - *„Und wer weckt mich dafür?"* haengt nicht am Beleg, sondern am Aufschlag:
 *   Wer bei etwa 70 Prozent abbrechen soll, kann nicht ueber Nacht laden. Die
 *   Folgerung bleibt beim Zuschauer.
 * - *„Also lade ich ab jetzt absichtlich schlecht."* ist erkennbar falsch —
 *   ein Schluss, der stimmen koennte, waere eine Behauptung und muesste belegt
 *   sein.
 * - *„Aus? Dann gucke ich solange die Wand an."* setzt an die Stelle der
 *   Empfehlung eine Szene.
 * - *„Meine Mutter hat mir das beigebracht!"* zielt auf den Verursacher statt
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

  szenen: [
    {
      /*
       * Der Aufschlag bleibt einstimmig, und das ist gerechnet: Er darf
       * hoechstens 3,5 Sekunden sprechen, und die 38 Zeichen liegen bei rund
       * 2,9. Eine Reaktion daneben — auch eine kurze — spraenge die Grenze.
       * Watti steht ab der zweiten Szene daneben.
       */
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Erst 12 Stunden laden, hieß es früher.',
      rede: [{ sprecher: 'nachleser', text: 'Erst 12 Stunden laden, hieß es früher.' }],
      text: '12 Stunden laden.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'uhr', stand: 'links' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Das Umweltbundesamt empfiehlt heute, vorher zu unterbrechen. Und wer weckt mich dafür?',
      rede: [
        { sprecher: 'nachleser', text: 'Das Umweltbundesamt empfiehlt heute, vorher zu unterbrechen.' },
        { sprecher: 'zeiger', text: 'Und wer weckt mich dafür?', machart: 'rueckfrage' },
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
       * „vom Kabel" statt „den Ladevorgang unterbrechen": Das Zitat bleibt
       * woertlich in der Einblendung, gesprochen wird Alltagssprache. Der Satz
       * bringt zugleich das Suchwort „Akku" unter, das in der alten Fassung
       * nur in „Lithium-Ionen-Akkus" steckte.
       */
      art: 'zahl',
      position: 'zuspitzung',
      sprechtext: 'Der Akku soll bei etwa 70 Prozent vom Kabel. Nicht bei 100. Also lade ich ab jetzt absichtlich schlecht.',
      rede: [
        { sprecher: 'nachleser', text: 'Der Akku soll bei etwa 70 Prozent vom Kabel. Nicht bei 100.' },
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
      sprechtext: 'Und laden sollst du am besten, wenn das Handy aus ist. Aus? Dann gucke ich solange die Wand an.',
      rede: [
        { sprecher: 'nachleser', text: 'Und laden sollst du am besten, wenn das Handy aus ist.' },
        { sprecher: 'zeiger', text: 'Aus? Dann gucke ich solange die Wand an.', machart: 'bild' },
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
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Den Memory-Effekt, den die alte Regel meinte, gibt es bei Lithium-Ionen-Akkus nicht. Meine Mutter hat mir das beigebracht!',
      rede: [
        { sprecher: 'nachleser', text: 'Den Memory-Effekt, den die alte Regel meinte, gibt es bei Lithium-Ionen-Akkus nicht.' },
        { sprecher: 'zeiger', text: 'Meine Mutter hat mir das beigebracht!', machart: 'empoerung' },
      ],
      text: 'Bei Lithium-Ionen: nein.',
      buehne: {
        art: 'figur',
        von: 'lesen',
        nach: 'stutzen',
        gegenueber: { von: 'nachdenken', nach: 'staunen' },
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
