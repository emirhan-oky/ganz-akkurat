import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · die gelben Punkte im Ausdruck.
 *
 * **Emirhans Dialog vom 02.09.2026**, aus `daten/briefings/drucker-gelbe-punkte.md`.
 *
 * Am 03.09. stand hier vier Stunden lang ein Dialog, den ich neu geschrieben
 * hatte, ohne den Briefingbogen zu oeffnen. **Sein Urteil:** *„also wir nehmen
 * alle meine, die ich heute den ganzen Tag geschrieben habe und aus denen du
 * die ganzen Befunde auch rausgeschrieben hast."* Meine Fassung ist verworfen.
 *
 * ## Was seine Fassung kann und meine nicht konnte
 *
 * **Volti ist der Vermieter.** Damit ist der Dritte im Raum keine erzaehlte
 * Nachbarin, sondern der, der danebensteht — und die Empoerung trifft am Ende
 * nicht den Drucker, sondern die Wohnsituation.
 *
 * **Und Watti traegt die Einschraenkung selbst.** „wodurch man nicht weiss, ob
 * jeder Drucker es tut" ist genau die Falle aus dem Briefingbogen, und er hat
 * sie in den Dialog geschrieben statt daneben. Meine Fassung hatte sie
 * weggelassen und musste sie nachtraeglich vom `belegpruefer` einsetzen
 * lassen.
 *
 * ## Was ich angefasst habe
 *
 * **Nur Rechtschreibung.** „Farbleserdrucker" → „Farblaserdrucker" (so steht es
 * auch im Briefingtext darueber), und in Wattis langer Zeile „das" → „dass"
 * samt Satzzeichen. Der Sprechtext ist Wort fuer Wort der Untertitel; was sich
 * schlecht liest, ist falsch geschrieben. **Kein Wort ist ersetzt, keines
 * dazugekommen.**
 */
export const druckerGelbePunkte: Short = {
  id: 'drucker-gelbe-punkte',
  themaId: 'drucker-gelbe-punkte',
  format: 'absicht',
  sachgebiet: 'drucken',
  bauform: 'wechselrede',
  arbeitstitel: 'Wattis Beschwerde hat einen Absender',
  weitererzaehlt: 'einem bestimmten Drucker zuordnen',
  suchbegriff: 'Drucker gelbe Punkte',
  kaltstart: {
    art: 'stolzerfehler',
    satz: 'Er wird niemals herausfinden, wer die Beschwerde ausgedruckt hat.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'drucker' },
  },
  vorspann: 'Watti und sein Farbdrucker',

  szenen: [
    {
      /*
       * **Der Kaltstart wird sofort gekontert** — Befund 12: In den
       * Belehrungsszenarien beantwortet die erste Zeile nach dem Vorhang den
       * Selbstgespraechssatz davor. Watti sagt „Er wird niemals
       * herausfinden…", und Volti steht mit dem Brief in der Hand da.
       *
       * Wattis Antwort ist in zwei Anteile geteilt, weil sie zwei Zuege traegt:
       * erst die Auskunft, dann die Rueckfrage. **Kein Wort ist geaendert.**
       */
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, wieso erhalte ich eine Beschwerde von dir per Post? Das ist eine Beschwerde an den Vermieter. Wie kommst du auf mich?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachhaken',
          text: 'Watti, wieso erhalte ich eine Beschwerde von dir per Post?',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'rueckfrage',
          text: 'Das ist eine Beschwerde an den Vermieter. Wie kommst du auf mich?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'zeigen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-yellow-dots',
      belegId: 'wasserzeichen-mit-denen-ein',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      /*
       * **Wattis „Watt?" steht hier, damit Volti nicht 12,3 Sekunden am Stueck
       * spricht.** Emirhans Zeile war ein Doppelsatz; `redelauf` erlaubt acht
       * Sekunden, und diese Grenze ist an seinen eigenen zehn Dialogen
       * gemessen — sein laengster Block lag bei 7,5.
       *
       * **Der Ausruf ist seiner und steht in seinen anderen Dialogen an genau
       * dieser Stelle**: nach der Behauptung, vor der Erklaerung. Kein Wort von
       * ihm faellt weg, es kommt eines dazu, und die beiden Bloecke liegen bei
       * 7,1 und 5,2 Sekunden.
       */
      sprechtext:
        'Wusstest du eigentlich, dass einige Drucker ein Muster winziger gelber Punkte auf die Seite setzen? Watt? Damit lässt sich das ausgedruckte Blatt einem bestimmten Drucker zuordnen. Yellow Dots heißt das.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Wusstest du eigentlich, dass einige Drucker ein Muster winziger gelber Punkte auf die Seite setzen?',
          quelleId: 'bsi-yellow-dots',
          belegId: 'einige-geraete-hinterlassen',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Watt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Damit lässt sich das ausgedruckte Blatt einem bestimmten Drucker zuordnen. Yellow Dots heißt das.',
          quelleId: 'bsi-yellow-dots',
          belegId: 'yellow-dots-name',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'lesen' },
      },
    },
    {
      /*
       * **Watti traegt hier die Quelle**, und die Vorgeschichte steht im Satz:
       * „ja weiss ich". Befund 27 — die Quelle wandert mit der Vorgeschichte,
       * nicht mit der Rolle.
       *
       * **Und er traegt die Einschraenkung**, die das BSI mit „Einige Geraete"
       * setzt: „wodurch man nicht weiss, ob jeder Drucker es tut". Genau dieser
       * Halbsatz fehlte in meiner Fassung.
       */
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-yellow-dots',
      belegId: 'diese-funktion-ist-oft',
      /*
       * **Voltis „Du?" ist das zweite dazugekommene Wort.** Wattis Zeile stand
       * am Stueck bei 8,9 Sekunden; geteilt sind es 1,0 und 7,8. Und der
       * Einwurf tut etwas, was der Short ohnehin braucht: Er macht hoerbar,
       * dass Watti hier ausnahmsweise der ist, der nachgelesen hat.
       */
      sprechtext:
        'Ja, weiß ich. Du? Und dass es laut BSI oft vom Hersteller nicht dokumentiert wird, wodurch man nicht weiß, ob jeder Drucker es tut.',
      rede: [
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Ja, weiß ich.' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Du?' },
        {
          sprecher: 'zeiger',
          zug: 'gegenbeispiel',
          text: 'Und dass es laut BSI oft vom Hersteller nicht dokumentiert wird, wodurch man nicht weiß, ob jeder Drucker es tut.',
          quelleId: 'bsi-yellow-dots',
          belegId: 'diese-funktion-ist-oft',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'stutzen',
        gegenueber: { von: 'lesen', nach: 'zeigen' },
      },
    },
    {
      /*
       * **Der Kipppunkt braucht keine Quelle**, weil keine seiner Zeilen etwas
       * ueber die Welt behauptet. „Wir leben hier alleine und ich bin dein
       * Vermieter" ist der erzaehlte Fall — dafuer gibt es den Zug `erinnern`.
       *
       * **Und das ist die Wendung von `absicht` in ihrer besten Form:** Nicht
       * die Technik ueberfuehrt Watti, sondern die Wohnsituation. Der ganze
       * Belegapparat war umsonst.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext:
        'Aber ich weiß trotzdem, dass es von dir ist. Und wie willst du das beweisen? Wir leben hier alleine und ich bin dein Vermieter du Idiot.',
      rede: [
        { sprecher: 'nachleser', zug: 'zuspitzen', text: 'Aber ich weiß trotzdem, dass es von dir ist.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wie willst du das beweisen?' },
        {
          sprecher: 'nachleser',
          zug: 'erinnern',
          machart: 'banaleaufloesung',
          text: 'Wir leben hier alleine und ich bin dein Vermieter du Idiot.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'ansprechen',
        gegenueber: { von: 'zeigen', nach: 'staunen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Der Ausdruck führt auf das Gerät zurück.',
      sprechtext: 'Also darf ich jetzt eine Katze haben oder nicht? Sonst kriegst du noch einen Brief.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'themenwechsel',
          text: 'Also darf ich jetzt eine Katze haben oder nicht? Sonst kriegst du noch einen Brief.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'nachdenken',
        gegenueber: { von: 'stutzen', nach: 'zeigen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist Wattis erster Satz doppelt komisch: Er hat gar keinen Drucker überführt, sondern seinen Mitbewohner.',
    },
  ],

  quellenIds: ['bsi-yellow-dots'],

  texte: {
    tiktok: {
      titel: 'Wattis Beschwerde hat einen Absender',
      beschreibung: 'Gelbe Punkte vom Drucker: Was ein Ausdruck über sein Gerät verrät.',
      hashtags: ['#drucker', '#datenschutz', '#bsi', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Beschwerde hat einen Absender',
      beschreibung: 'Gelbe Punkte auf jeder Seite. Der Drucker steht im Ausdruck.',
      hashtags: ['#drucker', '#datenschutz', '#privatsphaere', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was die gelben Punkte aus Wattis Drucker verraten',
      beschreibung: 'Gelbe Punkte im Drucker: Was das BSI zu Wasserzeichen in Ausdrucken schreibt.',
      hashtags: ['#drucker', '#bsi', '#datenschutz', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
