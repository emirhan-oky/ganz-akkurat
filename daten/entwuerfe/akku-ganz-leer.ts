import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · die Regel, die vom Vater kommt.
 *
 * **Szenario 9, zweites Beispiel: Der Dritte im Raum.** Der Vater hat es
 * gesagt, er ist nicht da, und er entscheidet trotzdem, wie Watti sein Handy
 * laedt. Volti erledigt ihn in einer Zeile: „Dein Vater hat auch noch ein
 * Faxgerät du Idiot."
 *
 * **Der Dialog ist Emirhans**, aus `daten/briefings/akku-ganz-leer.md`.
 *
 * **Die Zitatkarte ist beim Eintragen getauscht worden**, und das ist die
 * einzige inhaltliche Aenderung. In seinem Bogen stand „Eine vollständige
 * Entleerung schadet dem Akku" — bei genau diesem Beleg steht in
 * `quellen.json` der Vermerk, dass er der **Lagerung** gilt: Geraet
 * ausgeschaltet in der Schublade, nachladen nach sechs Monaten. Fuers
 * taegliche Laden traegt `wenn-sie-nicht-warten`, und der sagt dasselbe, nur
 * richtig zugeordnet. **`quellen-pruefen` haette beide durchgewinkt** — der
 * Unterschied steht ausserhalb der geprueften Zeichenkette.
 *
 * **Das Format ist `gibtswirklich` und nicht `eswareinmal`**, obwohl es nach
 * Maerchen klingt. Sein Bogen verbietet ausdruecklich, dass Volti bestaetigt,
 * wie es frueher war — ohne „und heute" fehlt dem Maerchen sein Kipppunkt.
 *
 * **Die Schlussformel steht fast wortgleich in `drucker-gelbe-punkte`.** Kein
 * Fehler, aber die Wache meldet sich, sobald beide im selben Lauf stehen.
 */
export const akkuGanzLeer: Short = {
  id: 'akku-ganz-leer',
  themaId: 'akku-ganz-leer',
  format: 'gibtswirklich',
  sachgebiet: 'laden',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Akku muss erst sterben',
  weitererzaehlt: 'Wer vorher nachlädt, hat ihn länger',
  suchbegriff: 'Handyakku laden',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Meinen Akku lade ich erst, wenn er ganz leer ist. Gehört sich so.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'steckdose' },
  },
  vorspann: 'Wattis Akku muss erst sterben',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Handyakku geht gleich aus. Gib mal her. Nicht anstecken!',
      rede: [
        { sprecher: 'nachleser', zug: 'bitten', text: 'Dein Handyakku geht gleich aus. Gib mal her.' },
        { sprecher: 'zeiger', zug: 'widersprechen', text: 'Nicht anstecken!' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'ruhe', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Warum denn nicht? Weil er erst ganz leer werden muss. Wer sagt das? Unser Vater. Der macht das seit 30 Jahren so.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Warum denn nicht?' },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'rechtfertigung',
          text: 'Weil er erst ganz leer werden muss.',
        },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wer sagt das?' },
        {
          sprecher: 'zeiger',
          zug: 'erinnern',
          machart: 'falscheautoritaet',
          text: 'Unser Vater. Der macht das seit 30 Jahren so.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'erklaeren',
        gegenueber: { von: 'erklaeren', nach: 'stutzen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'Wenn Sie nicht warten, bis Ihr Akku vollständig leer ist … sondern ihn … vorher aufladen',
      quelleId: 'uba-akku-laden',
      belegId: 'wenn-sie-nicht-warten',
      herausgeber: 'Umweltbundesamt',
      sprechtext:
        'Dein Vater hat auch noch ein Faxgerät du Idiot. Beim Umweltbundesamt steht das Gegenteil. Watt? Wer vorher nachlädt, hat ihn länger.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'gegenbeispiel',
          machart: 'nebenbemerkung',
          text: 'Dein Vater hat auch noch ein Faxgerät du Idiot.',
        },
        { sprecher: 'nachleser', zug: 'richtigstellen', text: 'Beim Umweltbundesamt steht das Gegenteil.' },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Watt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Wer vorher nachlädt, hat ihn länger.',
          quelleId: 'uba-akku-laden',
          belegId: 'wenn-sie-nicht-warten',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'erklaeren',
        nach: 'staunen',
        gegenueber: { von: 'stutzen', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext:
        'Also mache ich es seit Jahren falsch? Du machst es seit Jahren so richtig falsch.',
      rede: [
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Also mache ich es seit Jahren falsch?' },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'parallelbau',
          text: 'Du machst es seit Jahren so richtig falsch.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'zeigen' },
      },
    },
    {
      /*
       * **Befund I: Der Short darf damit enden, dass es gar keine Regel gibt.**
       *
       * Watti will eine Vorschrift, und die Aufloesung ist, dass keine
       * existiert. Das ist die Anti-Erklaervideo-Haltung des Kanals in zwei
       * Zeilen — und sie steht in Emirhans Dialog, nicht in einer Regel.
       */
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Wer vorher nachlädt, hat den Akku länger.',
      sprechtext:
        'Und wann soll ich jetzt laden? Wann immer du dran denkst. Das ist ja gar keine Regel. Du sollst weniger dumme Fragen stellen und mehr deinen Verstand nutzen.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wann soll ich jetzt laden?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Wann immer du dran denkst.' },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'uebercompliance',
          text: 'Das ist ja gar keine Regel.',
        },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'widerhaken',
          text: 'Du sollst weniger dumme Fragen stellen und mehr deinen Verstand nutzen.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'ruhe',
        gegenueber: { von: 'zeigen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „so gehört sich das" im ersten Satz schon die Regel, die es gar nicht gibt.',
    },
  ],

  quellenIds: ['uba-akku-laden'],

  texte: {
    tiktok: {
      titel: 'Wattis Akku muss erst sterben',
      beschreibung: 'Handyakku laden: Warum das Warten auf null aus einer anderen Zeit stammt.',
      hashtags: ['#handyakku', '#laden', '#akku', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Akku muss erst sterben',
      beschreibung: 'Handyakku laden: Wer vorher nachlädt, hat ihn länger. Steht beim Umweltbundesamt.',
      hashtags: ['#handyakku', '#laden', '#akkupflege', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Muss der Akku erst ganz leer werden?',
      beschreibung: 'Handyakku laden: Was das Umweltbundesamt über Ladestand und Lebensdauer schreibt.',
      hashtags: ['#handyakku', '#umweltbundesamt', '#laden', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
