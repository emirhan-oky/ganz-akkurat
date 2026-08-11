import type { Short } from '../../src/typen';

/**
 * Thema „Powerbank im Flugzeug" — Setup-Kontext Unterwegs.
 *
 * Alle Aussagen stammen aus der Passagierinformation des Luftfahrt-Bundesamts.
 * Bewusst auf die **behoerdliche** Regel gestuetzt statt auf die einer
 * einzelnen Fluggesellschaft: Airline-Regeln aendern sich und gelten nur dort,
 * die Grenzwerte des Regelwerks gelten ueberall. Genau deshalb ist der Hinweis
 * „deine Airline darf strenger sein" ein eigener Short und kein Nebensatz.
 */

const HASHTAGS = ['#powerbank', '#handgepäck', '#reisetipps', '#technikwissen', '#setupklar'];

const QUELLE = ['lba-lithiumbatterien'];

export const powerbankFlug: Short[] = [
  /* ─────────────────────────── 1 von 5 ─────────────────────────── */
  {
    id: 'skl-pbf-01',
    themaId: 'powerbank-flug',
    arbeitstitel: 'Powerbank gehört niemals in den Koffer',
    szenen: [
      {
        art: 'hook',
        kontext: 'Vor dem Abflug',
        text: 'Powerbank im Koffer? Die bleibt am Boden.',
        sprechtext: 'Wenn deine Powerbank im aufgegebenen Koffer liegt, hast du ein Problem.',
      },
      {
        art: 'warnung',
        text: 'Ersatzbatterien sind im aufgegebenen Gepäck verboten.',
        loesung: 'Powerbank immer ins Handgepäck – ohne Ausnahme.',
        sprechtext:
          'Eine Powerbank zählt als Ersatzbatterie, und die ist im aufgegebenen Gepäck schlicht verboten. Sie gehört ins Handgepäck, immer.',
      },
      {
        art: 'aussage',
        text: 'Der Grund: Im Frachtraum bemerkt niemand einen Brand.',
        hervorhebung: 'bemerkt niemand',
        sprechtext:
          'Der Grund ist einfach. Fängt eine Batterie in der Kabine an zu qualmen, sieht das jemand und kann eingreifen. Im Frachtraum nicht.',
      },
      {
        art: 'checkliste',
        ueberschrift: 'Ins Handgepäck gehören',
        punkte: [
          { text: 'Powerbanks und Ersatzakkus', bewertung: 'ja' },
          { text: 'Telefon, Tablet, Notebook', bewertung: 'ja' },
          { text: 'E-Zigaretten', bewertung: 'ja' },
        ],
        sprechtext: 'Dasselbe gilt für Telefon, Tablet, Notebook und E-Zigaretten. Alles mit Akku bleibt bei dir.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'Akkus gehören ins Handgepäck',
        punkte: [
          'Powerbanks im Koffer sind verboten',
          'Auch Telefon, Tablet und Notebook',
          'Im Frachtraum bemerkt niemand einen Brand',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext: 'Alles mit Akku bleibt bei dir. Keine Ausnahme.',
      },
    ],
    quellenIds: QUELLE,
    texte: {
      tiktok: {
        titel: 'Powerbank gehört ins Handgepäck',
        beschreibung: 'Ersatzbatterien sind im aufgegebenen Gepäck verboten. Immer mitnehmen, nie einchecken.',
        hashtags: HASHTAGS,
      },
      instagram: {
        titel: 'Warum die Powerbank niemals in den Koffer darf',
        beschreibung:
          'Eine Powerbank zählt als Ersatzbatterie und ist im aufgegebenen Gepäck verboten. Der Grund: In der Kabine würde ein Brand sofort bemerkt, im Frachtraum nicht. Alles mit Akku gehört ins Handgepäck.',
        hashtags: HASHTAGS,
      },
      youtube: {
        titel: 'Powerbank im Koffer? Das geht schief',
        beschreibung:
          'Ersatzbatterien und Powerbanks sind im aufgegebenen Gepäck verboten und gehören ausschließlich ins Handgepäck.\n\nQuelle:\nLuftfahrt-Bundesamt, Elektronische Geräte mit Lithium-Batterien: https://www.lba.de/DE/Luftfahrtunternehmen/Gefahrgut/Passagierinformation/Passagiergepaeck/Elektronische_Geraete.html',
        hashtags: ['#Shorts', '#Powerbank', '#Reisen'],
      },
    },
    kennzeichnung: { werbung: false, kiStimme: true },
  },

  /* ─────────────────────────── 2 von 5 ─────────────────────────── */
  {
    id: 'skl-pbf-02',
    themaId: 'powerbank-flug',
    arbeitstitel: 'mAh in Wattstunden umrechnen',
    szenen: [
      {
        art: 'hook',
        kontext: 'Die Rechnung vor der Reise',
        text: 'Deine Powerbank zeigt mAh. Die Regel nennt Wh.',
        sprechtext: 'Auf deiner Powerbank stehen Milliamperestunden. Die Vorschrift spricht aber von Wattstunden.',
      },
      {
        art: 'aussage',
        text: 'mAh geteilt durch 1000, mal 3,7 Volt.',
        hervorhebung: 'mal 3,7 Volt',
        sprechtext:
          'Die Umrechnung ist simpel: Milliamperestunden durch tausend, mal die Zellspannung. Bei Lithium-Zellen sind das drei Komma sieben Volt.',
      },
      {
        art: 'zahl',
        wert: '27.000',
        einheit: 'mAh',
        bedeutung: 'Das sind rund 100 Wh – genau die Grenze ohne Genehmigung.',
        sprechtext:
          'Damit landest du bei rund siebenundzwanzigtausend Milliamperestunden. Genau da liegt die Hundert-Wattstunden-Grenze.',
      },
      {
        art: 'checkliste',
        ueberschrift: 'Schneller Weg',
        punkte: [
          { text: 'Erst nach der Wh-Angabe suchen', bewertung: 'ja' },
          { text: 'Steht meist klein aufgedruckt', bewertung: 'ja' },
          { text: 'Nur rechnen, wenn sie fehlt', bewertung: 'achtung' },
        ],
        sprechtext:
          'Schau aber zuerst nach der Wattstundenzahl. Die steht bei den meisten Powerbanks klein aufgedruckt. Rechnen musst du nur, wenn sie fehlt.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'mAh in Wattstunden',
        punkte: [
          'mAh geteilt durch 1000, mal 3,7 Volt',
          '27.000 mAh sind rund 100 Wh',
          'Erst nach der Wh-Angabe suchen',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext: 'Eine Rechnung, die du einmal machst und nie wieder vergisst.',
      },
    ],
    quellenIds: QUELLE,
    texte: {
      tiktok: {
        titel: 'mAh in Wattstunden umrechnen',
        beschreibung: 'mAh geteilt durch 1000, mal 3,7 Volt. 27.000 mAh sind rund 100 Wh.',
        hashtags: HASHTAGS,
      },
      instagram: {
        titel: 'So rechnest du mAh in Wattstunden um',
        beschreibung:
          'Powerbanks werben mit mAh, die Luftfahrtregeln nennen Wattstunden. Die Umrechnung: mAh geteilt durch 1000, mal 3,7 Volt Zellspannung. Rund 27.000 mAh entsprechen damit etwa 100 Wh – der Grenze, bis zu der keine Genehmigung nötig ist.',
        hashtags: HASHTAGS,
      },
      youtube: {
        titel: 'mAh in Wattstunden umrechnen – so gehts',
        beschreibung:
          'Die Grenze ohne Genehmigung liegt bei 100 Wh Nennenergie. Umrechnung: mAh ÷ 1000 × 3,7 V.\n\nQuelle:\nLuftfahrt-Bundesamt, Elektronische Geräte mit Lithium-Batterien: https://www.lba.de/DE/Luftfahrtunternehmen/Gefahrgut/Passagierinformation/Passagiergepaeck/Elektronische_Geraete.html',
        hashtags: ['#Shorts', '#Powerbank', '#Reisen'],
      },
    },
    kennzeichnung: { werbung: false, kiStimme: true },
  },

  /* ─────────────────────────── 3 von 5 ─────────────────────────── */
  {
    id: 'skl-pbf-03',
    themaId: 'powerbank-flug',
    arbeitstitel: 'Die Zone zwischen 100 und 160 Wattstunden',
    szenen: [
      {
        art: 'hook',
        kontext: 'Große Powerbanks',
        text: 'Über 100 Wh? Dann brauchst du eine Erlaubnis.',
        sprechtext: 'Liegt deine Powerbank über hundert Wattstunden, darfst du sie nicht einfach mitnehmen.',
      },
      {
        art: 'vergleich',
        ueberschrift: 'Drei Bereiche',
        links: {
          titel: 'Bis 100 Wh',
          zeilen: ['Ohne Genehmigung erlaubt', 'Der Normalfall'],
          bewertung: 'ja',
        },
        rechts: {
          titel: 'Über 160 Wh',
          zeilen: ['Beförderung ausgeschlossen', 'Bleibt zu Hause'],
          bewertung: 'nein',
        },
        sprechtext:
          'Bis hundert Wattstunden ist alles unkompliziert. Über hundertsechzig ist die Mitnahme komplett ausgeschlossen.',
      },
      {
        art: 'zahl',
        wert: '2',
        einheit: 'Stück',
        bedeutung: 'Mehr Ersatzbatterien sind im Genehmigungsbereich nicht erlaubt.',
        sprechtext:
          'Dazwischen, also zwischen hundert und hundertsechzig Wattstunden, brauchst du die Genehmigung deiner Fluggesellschaft. Und dann sind höchstens zwei Ersatzbatterien pro Person erlaubt.',
      },
      {
        art: 'warnung',
        text: 'Die Genehmigung holst du vor dem Flug ein, nicht am Gate.',
        loesung: 'Beim Buchen oder danach beim Service der Airline anfragen.',
        sprechtext: 'Diese Genehmigung holst du vorher ein. Am Schalter ist es dafür zu spät.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'Die drei Bereiche',
        punkte: [
          'Bis 100 Wh ohne Genehmigung',
          '100 bis 160 Wh nur genehmigt, höchstens zwei',
          'Über 160 Wh gar nicht',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext: 'Drei Bereiche, drei Regeln. Mehr musst du dir nicht merken.',
      },
    ],
    quellenIds: QUELLE,
    texte: {
      tiktok: {
        titel: '100 bis 160 Wh: Genehmigung nötig',
        beschreibung: 'Bis 100 Wh frei, bis 160 Wh nur mit Genehmigung und maximal zwei Stück, darüber gar nicht.',
        hashtags: HASHTAGS,
      },
      instagram: {
        titel: 'Die drei Bereiche bei Powerbanks',
        beschreibung:
          'Bis 100 Wh ohne Genehmigung. Zwischen 100 und 160 Wh nur mit Genehmigung der Fluggesellschaft und höchstens zwei Ersatzbatterien pro Person. Über 160 Wh ist die Beförderung ausgeschlossen.',
        hashtags: HASHTAGS,
      },
      youtube: {
        titel: 'Powerbank über 100 Wh: Was dann gilt',
        beschreibung:
          'Zwischen 100 und 160 Wh ist eine Genehmigung der Fluggesellschaft erforderlich, dann sind höchstens zwei Ersatzbatterien pro Person zulässig. Über 160 Wh ist die Beförderung ausgeschlossen.\n\nQuelle:\nLuftfahrt-Bundesamt, Elektronische Geräte mit Lithium-Batterien: https://www.lba.de/DE/Luftfahrtunternehmen/Gefahrgut/Passagierinformation/Passagiergepaeck/Elektronische_Geraete.html',
        hashtags: ['#Shorts', '#Powerbank', '#Reisen'],
      },
    },
    kennzeichnung: { werbung: false, kiStimme: true },
  },

  /* ─────────────────────────── 4 von 5 ─────────────────────────── */
  {
    id: 'skl-pbf-04',
    themaId: 'powerbank-flug',
    arbeitstitel: 'Pole gegen Kurzschluss sichern',
    szenen: [
      {
        art: 'hook',
        kontext: 'Der übersehene Punkt',
        text: 'Lose im Rucksack? Das ist der eigentliche Fehler.',
        sprechtext: 'Die meisten kennen die Wattstundengrenze. Diesen Punkt hier übersehen fast alle.',
      },
      {
        art: 'aussage',
        text: 'Die Batteriepole müssen gegen Kurzschluss isoliert sein.',
        hervorhebung: 'gegen Kurzschluss isoliert',
        sprechtext:
          'Die Pole deiner Ersatzbatterien müssen gegen Kurzschluss gesichert sein. Das ist keine Empfehlung, das steht in der Vorschrift.',
      },
      {
        art: 'anschluss',
        ueberschrift: 'Was im Rucksack passiert',
        kette: [
          { geraet: 'powerbank', beschriftung: 'Freiliegende Pole' },
          { geraet: 'adapter', beschriftung: 'Schlüssel, Münzen' },
        ],
        bruchNach: 0,
        sprechtext: 'Denn ein Schlüsselbund oder ein paar Münzen reichen aus, um die Kontakte zu überbrücken.',
      },
      {
        art: 'checkliste',
        ueberschrift: 'Drei zulässige Wege',
        punkte: [
          { text: 'In der Originalverpackung lassen', bewertung: 'ja' },
          { text: 'Kontakte abkleben', bewertung: 'ja' },
          { text: 'Jede Batterie einzeln in Beutel oder Hülle', bewertung: 'ja' },
        ],
        sprechtext:
          'Lass sie in der Originalverpackung, kleb die Kontakte ab, oder pack jede Batterie einzeln in einen Beutel oder eine Hülle.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'Pole gegen Kurzschluss',
        punkte: [
          'In der Originalverpackung lassen',
          'Oder die Kontakte abkleben',
          'Oder einzeln in Beutel oder Hülle',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext: 'Einer dieser drei Wege reicht. Aber einer muss es sein.',
      },
    ],
    quellenIds: QUELLE,
    texte: {
      tiktok: {
        titel: 'Powerbank-Pole gegen Kurzschluss sichern',
        beschreibung: 'Originalverpackung, Kontakte abkleben oder einzeln in eine Hülle. Vorschrift, keine Empfehlung.',
        hashtags: HASHTAGS,
      },
      instagram: {
        titel: 'Der übersehene Punkt bei Powerbanks',
        beschreibung:
          'Die Batteriepole müssen gegen Kurzschluss isoliert sein – ein Schlüsselbund im Rucksack reicht aus, um die Kontakte zu überbrücken. Zulässig sind Originalverpackung, abgeklebte Kontakte oder eine eigene Hülle je Batterie.',
        hashtags: HASHTAGS,
      },
      youtube: {
        titel: 'Powerbank sichern: Die Regel, die kaum jemand kennt',
        beschreibung:
          'Die Batteriepole müssen gegen Kurzschluss isoliert sein.\n\nQuelle:\nLuftfahrt-Bundesamt, Elektronische Geräte mit Lithium-Batterien: https://www.lba.de/DE/Luftfahrtunternehmen/Gefahrgut/Passagierinformation/Passagiergepaeck/Elektronische_Geraete.html',
        hashtags: ['#Shorts', '#Powerbank', '#Reisen'],
      },
    },
    kennzeichnung: { werbung: false, kiStimme: true },
  },

  /* ─────────────────────────── 5 von 5 ─────────────────────────── */
  {
    id: 'skl-pbf-05',
    themaId: 'powerbank-flug',
    arbeitstitel: 'Deine Airline darf strenger sein',
    szenen: [
      {
        art: 'hook',
        kontext: 'Der Haken an allen Regeln',
        text: 'Alle Grenzwerte eingehalten – und trotzdem abgelehnt.',
        sprechtext: 'Du hast alle Grenzwerte eingehalten und stehst am Gate trotzdem dumm da. Wie kann das sein?',
      },
      {
        art: 'aussage',
        text: 'Fluggesellschaften dürfen strengere Regeln aufstellen.',
        hervorhebung: 'strengere Regeln',
        sprechtext:
          'Weil die Werte, über die alle reden, nur die Untergrenze sind. Jede Fluggesellschaft darf zusätzlich eigene, strengere Regeln aufstellen.',
      },
      {
        art: 'vergleich',
        ueberschrift: 'Zwei Ebenen',
        links: {
          titel: 'Behördliche Regel',
          zeilen: ['Gilt überall', '100 Wh, 160 Wh, Handgepäck'],
          bewertung: 'ja',
        },
        rechts: {
          titel: 'Regel deiner Airline',
          zeilen: ['Kann strenger sein', 'Zählt am Gate'],
          bewertung: 'achtung',
        },
        sprechtext:
          'Die behördliche Regel gilt überall. Am Gate zählt aber die Regel der Fluggesellschaft, mit der du fliegst.',
      },
      {
        art: 'checkliste',
        ueberschrift: 'Zwei Minuten vor dem Packen',
        punkte: [
          { text: 'Airline-Seite zu Akkus öffnen', bewertung: 'ja' },
          { text: 'Nach Nutzung an Bord suchen', bewertung: 'ja' },
          { text: 'Nicht auf alte Reiseberichte verlassen', bewertung: 'nein' },
        ],
        sprechtext:
          'Also: kurz die Seite deiner Airline zu Akkus öffnen und schauen, ob die Nutzung an Bord eingeschränkt ist. Diese Regeln haben sich zuletzt oft geändert.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'Zwei Minuten vor dem Packen',
        punkte: [
          'Die behördliche Regel ist die Untergrenze',
          'Deine Airline darf strenger sein',
          'Regeln zur Nutzung an Bord ändern sich',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext: 'Zwei Minuten auf der Seite deiner Airline. Das spart die meisten Nerven.',
      },
    ],
    quellenIds: QUELLE,
    texte: {
      tiktok: {
        titel: 'Deine Airline darf strenger sein',
        beschreibung: 'Die behördlichen Grenzwerte sind die Untergrenze. Am Gate zählt die Regel deiner Fluggesellschaft.',
        hashtags: HASHTAGS,
      },
      instagram: {
        titel: 'Warum die Grenzwerte nicht das letzte Wort sind',
        beschreibung:
          'Fluggesellschaften dürfen strengere Anforderungen stellen als die behördliche Regel. Vor dem Packen lohnt ein Blick auf die Akku-Seite deiner Airline – gerade die Regeln zur Nutzung an Bord haben sich zuletzt häufig geändert.',
        hashtags: HASHTAGS,
      },
      youtube: {
        titel: 'Powerbank-Regeln: Deine Airline hat das letzte Wort',
        beschreibung:
          'Fluggesellschaften dürfen strengere Anforderungen stellen; die Regeln der eigenen Airline sind vorab zu prüfen.\n\nQuelle:\nLuftfahrt-Bundesamt, Elektronische Geräte mit Lithium-Batterien: https://www.lba.de/DE/Luftfahrtunternehmen/Gefahrgut/Passagierinformation/Passagiergepaeck/Elektronische_Geraete.html',
        hashtags: ['#Shorts', '#Powerbank', '#Reisen'],
      },
    },
    kennzeichnung: { werbung: false, kiStimme: true },
  },
];
