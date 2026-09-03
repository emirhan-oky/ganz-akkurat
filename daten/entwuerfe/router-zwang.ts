import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · der Router, den niemand vorschreiben darf.
 *
 * **Szenario 6, drittes Beispiel: Beide liegen daneben.** Watti glaubt, er
 * muss den Router des Anbieters nehmen. Volti sagt, man darf tauschen — und
 * beide streiten ueber das **Geraet**. Das Dritte sind die **Zugangsdaten**:
 * Der Anbieter muss sie „unaufgefordert und kostenfrei" bei Vertragsschluss
 * herausgeben, und ohne sie nuetzt der schoenste eigene Router nichts.
 *
 * **Das Thema hat einen Gegenstand, und das ist der Grund, warum es hier
 * steht.** Der Vorlaeufer war `cookie-banner-ablehnen`: sauber belegt, Wache
 * gruen, echtes Drittes — und unverstaendlich. Emirhans Urteil: *„Irgendwie
 * checke ich den Dialog nicht. Worum geht es hier?"* Der ganze Dialog redete
 * ueber „die", „manche", „der Teil" — vier Woerter fuer Sachen, die nie einen
 * Namen bekamen. **Ein Thema ohne Gegenstand ergibt einen Dialog ueber
 * Kategorien** (Befund 65). Ein Router steht im Regal.
 *
 * **`reis-im-handy` waere der naechste Kandidat gewesen** und ist gefallen:
 * Zum nassen Handy gibt es nur Herstellerseiten, und jeder Short braucht eine
 * unbeteiligte Quelle. Damit ist der `werhatrecht`-Vorrat erschoepft — funf
 * verbraucht, zwei ohne Beleg.
 */
export const routerZwang: Short = {
  id: 'router-zwang',
  themaId: 'routerfreiheit',
  format: 'werhatrecht',
  sachgebiet: 'netz',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Router hat einen Zettel',
  weitererzaehlt: 'unaufgefordert und kostenfrei',
  suchbegriff: 'Router tauschen',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Mein Anbieterrouter ist Schrott, tauschen darf man ihn ja nicht.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'karton' },
  },
  vorspann: 'Wattis Router hat einen Zettel',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, wer sagt dir, dass du deinen Anbieterrouter nicht tauschen darfst? Steht bestimmt im Vertrag, so was steht immer drin.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachhaken',
          text: 'Watti, wer sagt dir, dass du deinen Anbieterrouter nicht tauschen darfst?',
        },
        { sprecher: 'zeiger', zug: 'beantworten', machart: 'falscheautoritaet', text: 'Steht bestimmt im Vertrag, so was steht immer drin.' },
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
      quelleId: 'tkg-73-endeinrichtungen',
      belegId: 'nicht-zwingend-vorschreiben',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext:
        'Steht da nicht. Und wieso nicht? Der Anbieter darf dir einen Router geben. Vorschreiben darf er ihn nicht. Und wenn ich trotzdem einen eigenen kaufe?',
      rede: [
        { sprecher: 'nachleser', zug: 'widersprechen', text: 'Steht da nicht.' },
        { sprecher: 'zeiger', zug: 'umdeuten', machart: 'rueckfrage', text: 'Und wieso nicht?' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Der Anbieter darf dir einen Router geben. Vorschreiben darf er ihn nicht.',
          quelleId: 'tkg-73-endeinrichtungen',
          belegId: 'nicht-zwingend-vorschreiben',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn ich trotzdem einen eigenen kaufe?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'achselzucken',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'tkg-73-endeinrichtungen',
      belegId: 'netz-endet-am-abschlusspunkt',
      sprechtext:
        'Dann steckst du ihn an die Anschlussdose. Da endet das Netz vom Anbieter. Also ist alles hinter der Dose meine Sache? Ab der Anschlussdose musst du für den fachgerechten Anschluss sorgen.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann steckst du ihn an die Anschlussdose. Da endet das Netz vom Anbieter.',
          quelleId: 'tkg-73-endeinrichtungen',
          belegId: 'netz-endet-am-abschlusspunkt',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'falscherschluss', text: 'Also ist alles hinter der Dose meine Sache?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ab der Anschlussdose musst du für den fachgerechten Anschluss sorgen.',
          quelleId: 'tkg-73-endeinrichtungen',
          belegId: 'fachgerechter-anschluss',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'achselzucken',
        nach: 'nachdenken',
        gegenueber: { von: 'zeigen', nach: 'erklaeren' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'in Textform unaufgefordert und kostenfrei bei Vertragsschluss zur Verfügung zu stellen',
      quelleId: 'tkg-73-endeinrichtungen',
      belegId: 'bei-vertragsschluss-zur-verfuegung',
      sprechtext:
        'Dann hattest du also recht. Keiner von uns beiden. Der Router war nie das Problem. Was denn dann? Die Zugangsdaten. Die musst du haben.',
      rede: [
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Dann hattest du also recht.' },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Keiner von uns beiden. Der Router war nie das Problem.',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Was denn dann?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die Zugangsdaten. Die musst du haben.',
          quelleId: 'tkg-73-endeinrichtungen',
          belegId: 'zugangsdaten-unaufgefordert',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'tkg-73-endeinrichtungen',
      belegId: 'bei-vertragsschluss-zur-verfuegung',
      sprechtext:
        'Und wo kriege ich die her? Die hast du schon. Unaufgefordert und kostenfrei, bei Vertragsschluss.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wo kriege ich die her?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die hast du schon. Unaufgefordert und kostenfrei, bei Vertragsschluss.',
          quelleId: 'tkg-73-endeinrichtungen',
          belegId: 'bei-vertragsschluss-zur-verfuegung',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'stutzen',
        gegenueber: { von: 'lesen', nach: 'zeigen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Nicht der Router entscheidet, sondern der Zettel dazu.',
      sprechtext:
        'In welchem Brief soll das gestanden haben? In dem, den du weggeschmissen hast. Ich schmeiße nichts weg. Dann liegt er in dem Stapel neben deinem Bett. Such ihn, kleiner.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'In welchem Brief soll das gestanden haben?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'widerhaken',
          text: 'In dem, den du weggeschmissen hast.',
        },
        { sprecher: 'zeiger', zug: 'widersprechen', machart: 'rechtfertigung', text: 'Ich schmeiße nichts weg.' },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Dann liegt er in dem Stapel neben deinem Bett. Such ihn, kleiner.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'achselzucken',
        gegenueber: { von: 'zeigen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „tauschen darf man ihn ja nicht" nicht Wattis Irrtum, sondern seine Ausrede – gesucht hat er den Brief nie.',
    },
  ],

  quellenIds: ['tkg-73-endeinrichtungen'],

  texte: {
    tiktok: {
      titel: 'Wattis Router hat einen Zettel',
      beschreibung: 'Router tauschen: Was der Anbieter darf und was er dir geben muss.',
      hashtags: ['#router', '#internet', '#routerfreiheit', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Router hat einen Zettel',
      beschreibung: 'Router tauschen: Der Anbieter darf keinen vorschreiben – und muss die Zugangsdaten geben.',
      hashtags: ['#router', '#internet', '#wlan', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Darf der Anbieter dir einen Router vorschreiben?',
      beschreibung: 'Router tauschen: Was § 73 TKG über Endgeräte und Zugangsdaten schreibt.',
      hashtags: ['#router', '#tkg', '#internet', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
