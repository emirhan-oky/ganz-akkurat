import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · Der Netzbetreiber darf keine Meldung mehr verlangen.
 *
 * **Szenario 9, viertes Beispiel: Der Dritte im Raum.** Der Nachbar hat es
 * gesagt, und er hat selbst eins — deshalb glaubt Watti ihm. Der Nachbar ist
 * dabei nicht dumm, sondern **auf dem Stand seiner eigenen Anmeldung**: Als er
 * sein Gerät anschloss, galt die Meldepflicht noch.
 *
 * Das ist der Unterschied zu einem Dritten, der bloss Unsinn erzaehlt. Ein
 * Zeuge, der etwas erlebt hat, ist glaubwuerdiger als eine Behauptung — und
 * genau deshalb haelt Watti daran fest.
 *
 * **Der Short nimmt die halbe Wahrheit mit:** Die Registrierung im
 * Marktstammdatenregister bleibt, sie steht im selben Satz des Gesetzes wie das
 * Verbot der zusaetzlichen Meldung. Wer nur die erste Haelfte erzaehlt, schickt
 * jemanden in eine Ordnungswidrigkeit.
 */
export const balkonkraftwerkNachbar: Short = {
  id: 'balkonkraftwerk-nachbar',
  themaId: 'steckersolar-meldepflicht',
  format: 'gibtswirklich',
  sachgebiet: 'laden',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti lässt die Sonne im Karton',
  weitererzaehlt: 'darf der Netzbetreiber keine Meldung verlangen',
  suchbegriff: 'Balkonkraftwerk anmelden',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Zwei Solarplatten für den Balkon. Und jetzt trau ich mich nicht.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'achselzucken', requisite: 'koffer' },
  },
  vorspann: 'Wattis Solarplatten bleiben im Karton',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, warum hängen die Solarplatten nicht am Balkon? So ein Balkonkraftwerk muss man anmelden, sagt der Nachbar.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, warum hängen die Solarplatten nicht am Balkon?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'So ein Balkonkraftwerk muss man anmelden, sagt der Nachbar.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'zeigen',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext:
        'Dein Nachbar ist auf dem Stand von vorgestern. Der hat selber eins auf dem Balkon. Dann hat er es damals so gemacht.',
      rede: [
        { sprecher: 'nachleser', zug: 'widersprechen', text: 'Dein Nachbar ist auf dem Stand von vorgestern.' },
        {
          sprecher: 'zeiger',
          zug: 'erinnern',
          machart: 'falscheautoritaet',
          text: 'Der hat selber eins auf dem Balkon.',
        },
        { sprecher: 'nachleser', zug: 'umdeuten', text: 'Dann hat er es damals so gemacht.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'stutzen', nach: 'erklaeren' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'zusätzliche … Meldungen von Anlagen nach Satz 1 können nicht verlangt werden',
      quelleId: 'eeg-8-steckersolar',
      belegId: 'keine-zusaetzliche-meldung',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext:
        'Und was gilt jetzt? Neben der Registrierung darf der Netzbetreiber keine Meldung verlangen. Einfach so einstecken?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was gilt jetzt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Neben der Registrierung darf der Netzbetreiber keine Meldung verlangen.',
          quelleId: 'eeg-8-steckersolar',
          belegId: 'keine-zusaetzliche-meldung',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Einfach so einstecken?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      art: 'zahl',
      position: 'kipppunkt',
      wert: '800',
      einheit: 'Voltampere',
      bedeutung: 'Wechselrichterleistung zusammen, dazu bis 2 Kilowatt installierte Leistung',
      quelleId: 'eeg-8-steckersolar',
      belegId: 'zwei-kilowatt-achthundert-va',
      sprechtext:
        'Wenn die Platten zusammen unter 2 Kilowatt bleiben und der Wechselrichter unter 800 Voltampere liegt. Steht auf dem Karton, beides.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Wenn die Platten zusammen unter 2 Kilowatt bleiben und der Wechselrichter unter 800 Voltampere liegt.',
          quelleId: 'eeg-8-steckersolar',
          belegId: 'zwei-kilowatt-achthundert-va',
        },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Steht auf dem Karton, beides.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'lesen',
        gegenueber: { von: 'lesen', nach: 'zeigen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eeg-8-steckersolar',
      belegId: 'registrierung-bleibt-unberuehrt',
      sprechtext:
        'Und melden muss ich gar nichts? Doch. Ins Marktstammdatenregister. Das bleibt. Also doch Papierkram.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und melden muss ich gar nichts?' },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Doch. Ins Marktstammdatenregister. Das bleibt.',
          quelleId: 'eeg-8-steckersolar',
          belegId: 'registrierung-bleibt-unberuehrt',
        },
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'katastrophe', text: 'Also doch Papierkram.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'lesen',
        nach: 'stutzen',
        gegenueber: { von: 'zeigen', nach: 'erklaeren' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Die Registrierung bleibt, die Meldung beim Netzbetreiber nicht.',
      sprechtext:
        'Du trägst fünf Angaben ein, mehr nicht. Dann sage ich dem Nachbarn Bescheid. Der glaubt dir kein Wort.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Du trägst fünf Angaben ein, mehr nicht.',
          quelleId: 'bnetza-balkonkraftwerk-registrierung',
          belegId: 'fuenf-angaben-statt-zwanzig',
        },
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Dann sage ich dem Nachbarn Bescheid.' },
        { sprecher: 'nachleser', zug: 'zuspitzen', machart: 'nebenbemerkung', text: 'Der glaubt dir kein Wort.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'zeigen',
        gegenueber: { von: 'erklaeren', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „ich trau mich nicht" die Scheu vor einem Formular, das es nicht mehr gibt.',
    },
  ],

  quellenIds: ['eeg-8-steckersolar', 'bnetza-balkonkraftwerk-registrierung'],

  texte: {
    tiktok: {
      titel: 'Watti lässt die Sonne im Karton',
      beschreibung: 'Balkonkraftwerk anmelden: Im Register ja, beim Netzbetreiber nicht zusätzlich.',
      hashtags: ['#balkonkraftwerk', '#solar', '#eeg', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti lässt die Sonne im Karton',
      beschreibung: 'Balkonkraftwerk anmelden: Was der Nachbar von damals noch weiß.',
      hashtags: ['#balkonkraftwerk', '#solar', '#strom', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Neben dem Register verlangt der Netzbetreiber nichts',
      beschreibung:
        'Balkonkraftwerk anmelden: Was § 8 Absatz 5a EEG über Steckersolargeräte und Meldepflichten sagt.',
      hashtags: ['#balkonkraftwerk', '#eeg', '#solar', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
