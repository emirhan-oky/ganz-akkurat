import type { Short } from '../../src/typen';

/**
 * Es war einmal · Einen Virus hat man gemerkt.
 *
 * **Das Märchen war einmal wahr, und es hatte einen Grund:** Die Schadprogramme
 * der Neunziger wollten gesehen werden. Ein Virus, der ein Fenster aufmacht,
 * eine Meldung anzeigt oder den Rechner ausbremst, hat sein Ziel erreicht — er
 * war ein Streich, kein Geschäft.
 *
 * **Das „und heute" steht beim BSI in einem Satz:** „Nicht immer kann ein
 * Anwender feststellen, ob sich auf seinem Computer ein Virus oder anderes
 * Schadprogramm eingenistet hat." Und der Grund steht daneben: Wer Zugangsdaten
 * ausspähen oder ein Gerät fernsteuern will, **darf nicht auffallen.**
 * Unauffälligkeit ist keine Nebenwirkung, sie ist die Bauart.
 *
 * **Der Kipppunkt ist, wozu Wattis Rechner taugt.** Nicht seine Daten sind das
 * Ziel — er ist einer von tausenden, mit denen ein Angriff gefahren wird. Das
 * beantwortet nebenbei den zweiten Irrtum derselben Quelle („ich habe nichts zu
 * verbergen"), ohne ihn auszusprechen.
 *
 * **Die Quelle ist die neue Ideenquelle vom 06.09.2026:** Das BSI führt vier
 * Seiten „Sicherheits-Irrtümer", auf denen eine Behörde verbreitete Annahmen
 * aufzählt und widerlegt. Für `eswareinmal` ist das der Beleg für das „und
 * heute", den sonst niemand schreibt — Behörden schreiben über Alltagsmythen
 * nur, wenn der Mythos in ihr Ressort fällt.
 */
export const virusMerktMan: Short = {
  id: 'virus-merkt-man',
  themaId: 'schadprogramm-unauffaellig',
  format: 'eswareinmal',
  sachgebiet: 'rechner',
  bauform: 'wechselrede',
  arbeitstitel: 'Wattis Rechner läuft super, sagt Watti',
  weitererzaehlt: 'Nicht immer',
  suchbegriff: 'Virus merken',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Mein Rechner läuft schnell. Also ist da nichts drauf.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'lupe' },
  },
  vorspann: 'Wattis Rechner und das ruhige Gewissen',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
'Volti, auf meinem Rechner ist kein Virus. Woran merkst du das? Merken würde ich das, der läuft schnell.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'behaupten',
          machart: 'falscheautoritaet',
          text: 'Volti, auf meinem Rechner ist kein Virus.',
        },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Woran merkst du das?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Merken würde ich das, der läuft schnell.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-irrtuemer-computer',
      belegId: 'nicht-immer-feststellbar',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Würdest du nicht. Nicht immer kann man feststellen, ob sich ein Schadprogramm eingenistet hat. Und wie merke ich es dann?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Würdest du nicht. Nicht immer kann man feststellen, ob sich ein Schadprogramm eingenistet hat.',
          quelleId: 'bsi-irrtuemer-computer',
          belegId: 'nicht-immer-feststellbar',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'ratlosigkeit',
          text: 'Und wie merke ich es dann?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'erklaeren',
        gegenueber: { von: 'erklaeren', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-irrtuemer-computer',
      belegId: 'unbemerkt-installiert-identitaetsdiebstahl',
      sprechtext:
        'Gar nicht, du Pfosten. Viele laufen unbemerkt und können Zugangsdaten stehlen. Unbemerkt? Der versteckt sich also absichtlich?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Gar nicht, du Pfosten. Viele laufen unbemerkt und können Zugangsdaten stehlen.',
          quelleId: 'bsi-irrtuemer-computer',
          belegId: 'unbemerkt-installiert-identitaetsdiebstahl',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'falscherschluss',
          text: 'Unbemerkt? Der versteckt sich also absichtlich?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-irrtuemer-computer',
      belegId: 'tausende-computer-ddos',
      sprechtext:
        'Und was wollen die von mir? Mit tausenden infizierten Rechnern fahren sie Angriffe auf Webseiten. Ich bin also nur eine Nummer.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'uebercompliance',
          text: 'Und was wollen die von mir?',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Mit tausenden infizierten Rechnern fahren sie Angriffe auf Webseiten.',
          quelleId: 'bsi-irrtuemer-computer',
          belegId: 'tausende-computer-ddos',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'gestaendnis',
          text: 'Ich bin also nur eine Nummer.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'staunen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Was auffällt, wollte auffallen.',
      sprechtext:
        'Wenigstens läuft er schnell. Das haben die anderen tausend auch gesagt. Meiner ist trotzdem der schnellste.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'rechtfertigung',
          text: 'Wenigstens läuft er schnell.',
        },
        {
          sprecher: 'nachleser',
          zug: 'widersprechen',
          machart: 'nebenbemerkung',
          text: 'Das haben die anderen tausend auch gesagt.',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'katastrophe',
          text: 'Meiner ist trotzdem der schnellste.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'staunen',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „mein Rechner läuft schnell" kein Beweis mehr, sondern der Satz, den der Short gerade entwertet hat.',
    },
  ],

  quellenIds: ['bsi-irrtuemer-computer'],

  texte: {
    tiktok: {
      titel: 'Wattis Rechner läuft super, sagt Watti',
      beschreibung:
        'Virus merken: Warum ein Schadprogramm heute unauffällig bleibt — und wozu ein unauffälliger Rechner taugt.',
      hashtags: ['#virus', '#technikwissen', '#sicherheit', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Rechner läuft super, sagt Watti',
      beschreibung:
        'Virus merken: „Nicht immer kann ein Anwender feststellen, ob sich ein Schadprogramm eingenistet hat", schreibt das BSI.',
      hashtags: ['#virus', '#technikwissen', '#computer', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Ein Schadprogramm, das auffällt, ist schlecht gebaut',
      beschreibung:
        'Virus merken: Was das Bundesamt für Sicherheit in der Informationstechnik zu diesem Irrtum schreibt.',
      hashtags: ['#virus', '#sicherheit', '#technikwissen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
