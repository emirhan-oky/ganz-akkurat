import type { Short } from '../../src/typen';

/**
 * Wer hat recht? · Das Handy an der Zapfsäule.
 *
 * **Beide Lager liegen daneben, und das Dritte steht seit 1996 in einer
 * Presseinformation der PTB.** Watti hält das Handy für lebensgefährlich, Volti
 * für vollkommen harmlos — untersucht wurde etwas anderes: In der Mehrzahl der
 * Fälle war **elektrostatische Aufladung** die wahrscheinliche Ursache, und
 * „auch die elektrostatische Aufladung von Personen kommt als Zündquelle in
 * Betracht". Nicht das Telefon. Der Mensch.
 *
 * **Die Entlastung des Handys ist im selben Satz bedingt**, und die Bedingungen
 * gehören in den Dialog, nicht in die Fußnote: „Mobile Funktelefone mit einer
 * Nennleistung von nicht mehr als 6 Watt stellen an Tankstellen keine
 * Zündgefahr dar, wenn sie außerhalb explosionsgefährdeter Bereiche betrieben
 * werden." Zwei Einschränkungen in einem Satz — Voltis „Da ist noch nie was
 * passiert" ist deshalb genauso falsch wie Wattis Schild.
 *
 * **Kein `eswareinmal`, obwohl es sich so anfühlt.** Das Format verlangt, dass
 * es **früher gestimmt** hat. Ob die Autotelefone der Achtziger über der
 * 6-Watt-Grenze lagen, liegt nahe und ist nicht belegt — und eine Vermutung im
 * Format zu verstecken wäre dieselbe Überdehnung wie im Sprechtext. Es bleibt
 * `werhatrecht`, und der Nachschlag endet wie dort vorgesehen auf einer
 * Restfrage: Warum hängt das Schild noch da?
 *
 * **Der `belegpruefer` hat fünf Stellen gefunden, und vier davon waren
 * dieselbe Bewegung:** eine bedingte Aussage unbedingt gesprochen. „Bis 6 Watt
 * keine Zündgefahr" ohne den Ort, „war es elektrostatische Aufladung" ohne das
 * „wahrscheinliche", „Nicht dein Handy. Du." aus einem „kommt in Betracht".
 * Die fünfte war ein befreiter Satz, der trotzdem behauptete: „Steig nicht
 * dauernd ein und aus" erklärt einen Mechanismus, den kein Zitat trägt.
 *
 * **Das Jahr 1996 stand einen Anlauf lang im Dialog und ist wieder raus.** Es
 * ist das Datum der Presseinformation und steht in keiner Fundstelle — der
 * Satz hätte aus dem Erscheinungsdatum den Zeitpunkt der Untersuchung gemacht.
 * Es steht jetzt in der YouTube-Beschreibung, wo es hingehört: als Angabe über
 * die Quelle, nicht als Aussage im Video.
 *
 * **Und die tragende Brücke ist jetzt eine Frage.** Ob heutige Handys unter
 * 6 Watt liegen, steht in keiner Quelle — Wattis „Und was hat meins?" bekommt
 * deshalb die einzige ehrliche Antwort: „Steht da nicht." Dieselbe Bewegung
 * wie in `produktpass-akku`, wo Volti einmal zugeben muss, dass es keine
 * Auskunft gibt.
 *
 * **Zweimal hat der `dialogpruefer` denselben Fehler gefunden, und beim
 * zweiten Mal war er größer.** Voltis „Da ist noch nie was passiert" blieb
 * unangetastet stehen, während zwei Zuspitzungen ihn widerlegten — er räumt
 * es jetzt an Ort und Stelle ein, belegt („es gab Entzündungen, teils mit
 * Fahrzeugbränden"), und im Nachschlag fällt der Satz, den alle vier
 * Szenariobeispiele haben: **„Keiner von uns beiden lag richtig."**
 *
 * **Der `dialogpruefer` hat den Formatfehler gefunden:** Voltis „Da ist noch
 * nie was passiert" wurde von seiner eigenen späteren Zeile widerlegt, ohne
 * dass er es einräumt — damit trug nur Watti den Irrtum, und **ein Streitfall,
 * in dem eine Seite einfach recht hat, ist ein Märchen mit zwei Sprechern.**
 * Voltis „Halb." im Nachschlag ist das fehlende Eingeständnis.
 */
export const handyTankstelle: Short = {
  id: 'handy-tankstelle',
  themaId: 'handy-an-der-zapfsaeule',
  format: 'werhatrecht',
  sachgebiet: 'fahren',
  bauform: 'wechselrede',
  arbeitstitel: 'Watti hütet die Zapfsäule vor seinem Handy',
  weitererzaehlt: 'kommt als Zündquelle in Betracht',
  suchbegriff: 'Handy Tankstelle',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Handy weg an der Zapfsäule. Das steht sogar auf dem Schild.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'warndreieck' },
  },
  vorspann: 'Wattis Schild an der Zapfsäule',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, steck das Handy weg. Wir stehen an der Zapfsäule. Das ist ein Märchen, du Pfosten. Da ist noch nie was passiert.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'bitten',
          text: 'Volti, steck das Handy weg. Wir stehen an der Zapfsäule.',
        },
        {
          sprecher: 'nachleser',
          zug: 'widersprechen',
          machart: 'banaleaufloesung',
          text: 'Das ist ein Märchen, du Pfosten. Da ist noch nie was passiert.',
        },
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
      art: 'zahl',
      position: 'zuspitzung',
      wert: '6',
      einheit: 'Watt',
      bedeutung: 'bis zu dieser Nennleistung, außerhalb der explosionsgefährdeten Bereiche',
      quelleId: 'ptb-benzindaempfe',
      belegId: 'funktelefone-keine-zuendgefahr',
      herausgeber: 'Physikalisch-Technische Bundesanstalt',
      sprechtext:
        'Irgendwo zündet es doch mal. Funktelefone bis 6 Watt sind an Tankstellen keine Zündgefahr, außerhalb der explosionsgefährdeten Bereiche. Und was hat meins? Steht da nicht.',
      rede: [
        { sprecher: 'zeiger', zug: 'widersprechen', text: 'Irgendwo zündet es doch mal.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Funktelefone bis 6 Watt sind an Tankstellen keine Zündgefahr, außerhalb der explosionsgefährdeten Bereiche.',
          quelleId: 'ptb-benzindaempfe',
          belegId: 'funktelefone-keine-zuendgefahr',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Und was hat meins?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Steht da nicht.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'ptb-benzindaempfe',
      belegId: 'elektrostatische-aufladung-ursache',
      sprechtext:
        'Da ist bestimmt schon was passiert. Stimmt, es gab Entzündungen, teils mit Fahrzeugbränden. Da lag ich daneben. Und woran lag es? Wahrscheinliche Ursache war meistens elektrostatische Aufladung. Also das Auto. Dann bleibe ich beim Tanken einfach sitzen.',
      rede: [
        { sprecher: 'zeiger', zug: 'widersprechen', text: 'Da ist bestimmt schon was passiert.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Stimmt, es gab Entzündungen, teils mit Fahrzeugbränden. Da lag ich daneben.',
          quelleId: 'ptb-benzindaempfe',
          belegId: 'entzuendungen-mit-fahrzeugbraenden',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und woran lag es?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Wahrscheinliche Ursache war meistens elektrostatische Aufladung.',
          quelleId: 'ptb-benzindaempfe',
          belegId: 'elektrostatische-aufladung-ursache',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'katastrophe',
          text: 'Also das Auto. Dann bleibe ich beim Tanken einfach sitzen.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'nachdenken', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'ptb-benzindaempfe',
      belegId: 'aufladung-von-personen',
      sprechtext:
        'Auch die Aufladung von Personen kommt als Zündquelle in Betracht. Ich bin die Zündquelle? Du kommst in Betracht. Steht da. Ich fasse vorher immer das Blech an.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Auch die Aufladung von Personen kommt als Zündquelle in Betracht.',
          quelleId: 'ptb-benzindaempfe',
          belegId: 'aufladung-von-personen',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'uebercompliance',
          text: 'Ich bin die Zündquelle?',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Du kommst in Betracht. Steht da.',
          quelleId: 'ptb-benzindaempfe',
          belegId: 'aufladung-von-personen',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'gestaendnis',
          text: 'Ich fasse vorher immer das Blech an.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'staunen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Meistens war die wahrscheinliche Ursache die Aufladung.',
      sprechtext:
        'Also hatte ich recht mit dem Schild. Halb. Keiner von uns beiden lag richtig. Und warum hängt das Schild dann immer noch da?',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'umdeutung',
          text: 'Also hatte ich recht mit dem Schild.',
        },
        {
          sprecher: 'nachleser',
          zug: 'einlenken',
          text: 'Halb. Keiner von uns beiden lag richtig.',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'ratlosigkeit',
          text: 'Und warum hängt das Schild dann immer noch da?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'nachdenken', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „das steht sogar auf dem Schild" die Antwort auf die Frage, mit der der Short endet — und sie ist keine.',
    },
  ],

  quellenIds: ['ptb-benzindaempfe'],

  texte: {
    tiktok: {
      titel: 'Watti hütet die Zapfsäule vor seinem Handy',
      beschreibung:
        'Handy an der Tankstelle: Was die Physikalisch-Technische Bundesanstalt als Ursache gefunden hat.',
      hashtags: ['#tankstelle', '#technikwissen', '#autowissen', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti hütet die Zapfsäule vor seinem Handy',
      beschreibung:
        'Handy an der Tankstelle: In der Mehrzahl der Fälle fand die Untersuchung die elektrostatische Aufladung als wahrscheinliche Ursache.',
      hashtags: ['#tankstelle', '#autowissen', '#technikwissen', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Wattis Schild und die wahrscheinliche Ursache',
      beschreibung:
        'Handy an der Tankstelle: Was die PTB untersucht hat — und welche Bedingungen im Entlastungssatz stehen.',
      hashtags: ['#tankstelle', '#auto', '#technikwissen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
