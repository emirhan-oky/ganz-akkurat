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
 */
export const handyTankstelle: Short = {
  id: 'handy-tankstelle',
  themaId: 'handy-an-der-zapfsaeule',
  format: 'werhatrecht',
  sachgebiet: 'fahren',
  bauform: 'wechselrede',
  arbeitstitel: 'Watti hütet die Zapfsäule vor seinem Handy',
  weitererzaehlt: 'Nicht dein Handy. Du.',
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
      bedeutung: 'bis zu dieser Nennleistung sind Funktelefone an Tankstellen keine Zündgefahr',
      quelleId: 'ptb-benzindaempfe',
      belegId: 'funktelefone-keine-zuendgefahr',
      herausgeber: 'Physikalisch-Technische Bundesanstalt',
      sprechtext:
        'Irgendwo zündet es doch mal. Funktelefone bis 6 Watt sind an Tankstellen keine Zündgefahr. Bis 6 Watt? Meins hat nicht mal ein halbes.',
      rede: [
        { sprecher: 'zeiger', zug: 'widersprechen', text: 'Irgendwo zündet es doch mal.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Funktelefone bis 6 Watt sind an Tankstellen keine Zündgefahr.',
          quelleId: 'ptb-benzindaempfe',
          belegId: 'funktelefone-keine-zuendgefahr',
        },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'rueckfrage',
          text: 'Bis 6 Watt? Meins hat nicht mal ein halbes.',
        },
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
        'Und was hat dann gebrannt? In der Mehrzahl der Fälle war es elektrostatische Aufladung. Also das Auto. Dann bleibe ich beim Tanken einfach sitzen.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was hat dann gebrannt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'In der Mehrzahl der Fälle war es elektrostatische Aufladung.',
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
        'Auch die Aufladung von Personen kommt als Zündquelle in Betracht. Ich bin die Zündquelle? Nicht dein Handy. Du.',
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
          text: 'Nicht dein Handy. Du.',
          quelleId: 'ptb-benzindaempfe',
          belegId: 'aufladung-von-personen',
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
      satz: 'Untersucht wurde die Aufladung, nicht das Telefon.',
      sprechtext:
        'Steig trotzdem nicht dauernd ein und aus. Frag lieber mal, wer das Schild aufgehängt hat. Und warum hängt es dann immer noch da?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'parallelbau',
          text: 'Steig trotzdem nicht dauernd ein und aus.',
        },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          text: 'Frag lieber mal, wer das Schild aufgehängt hat.',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'ratlosigkeit',
          text: 'Und warum hängt es dann immer noch da?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'staunen',
        nach: 'ansprechen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
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
        'Handy an der Tankstelle: Nicht das Telefon war die Zündquelle, sondern die elektrostatische Aufladung.',
      hashtags: ['#tankstelle', '#autowissen', '#technikwissen', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Nicht das Handy zündet an der Tankstelle, sondern du',
      beschreibung:
        'Handy an der Tankstelle: Was die PTB 1996 untersucht hat und was in dem Satz noch alles steht.',
      hashtags: ['#tankstelle', '#auto', '#technikwissen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
