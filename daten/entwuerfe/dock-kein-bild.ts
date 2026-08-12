import type { Short } from '../../src/typen';

/**
 * Thema „Dock lädt, aber kein Bild" — fünf Shorts, fünf Winkel.
 *
 * Schreibregel dieses Projekts: **Bildtext ist die verdichtete Behauptung,
 * der Sprechtext führt sie aus.** Wer ohne Ton schaut, bekommt die Aussage
 * über Bild und Untertitel; wer mit Ton schaut, bekommt die Begründung dazu.
 * Beides doppelt zu sagen verschenkt die halbe Erzählzeit.
 *
 * Jede technische Kernaussage ist in daten/quellen.json belegt.
 */

const HASHTAGS_BASIS = ['#usbc', '#homeoffice', '#schreibtischsetup', '#technikwissen', '#setupklar'];

export const dockKeinBild: Short[] = [
  /* ─────────────────────────── 1 von 5 ─────────────────────────── */
  {
    id: 'skl-dkb-01',
    themaId: 'dock-kein-bild',
    arbeitstitel: 'Gleiche Buchse, andere Technik',
    winkelart: 'diagnose',
    szenen: [
      {
        art: 'hook',
        kontext: 'USB-C am Notebook',
        text: 'Dein Dock lädt. Der Monitor bleibt schwarz.',
        sprechtext: 'Dein Dock lädt, aber der Monitor bleibt einfach schwarz.',
      },
      {
        art: 'anschluss',
        ueberschrift: 'Wo das Signal hängen bleibt',
        kette: [
          { geraet: 'notebook', beschriftung: 'Notebook' },
          { geraet: 'dock', beschriftung: 'USB-C-Dock' },
          { geraet: 'monitor', beschriftung: 'Monitor' },
        ],
        bruchNach: 0,
        sprechtext: 'Das liegt fast nie am Dock. Das Bild kommt schon aus deinem Notebook nicht raus.',
      },
      {
        art: 'aussage',
        text: 'Bild braucht DisplayPort Alt Mode.',
        hervorhebung: 'DisplayPort Alt Mode',
        sprechtext:
          'Denn ein USB-C-Anschluss überträgt nur dann ein Videosignal, wenn er diesen Modus beherrscht. Und das sieht man dem Stecker nicht an.',
      },
      {
        art: 'vergleich',
        ueberschrift: 'Zwei Ports, ein Aussehen',
        links: {
          titel: 'Mit Alt Mode',
          zeilen: ['Bild, Ton und Strom', 'Meist der Thunderbolt-Port'],
          bewertung: 'ja',
        },
        rechts: {
          titel: 'Ohne Alt Mode',
          zeilen: ['Nur Strom und Daten', 'Oft der zweite USB-C-Port'],
          bewertung: 'nein',
        },
        sprechtext:
          'Der eine macht alles. Der andere sieht identisch aus, gibt aber nur Strom und Daten weiter.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'Kein Bild über das Dock?',
        punkte: [
          'Der Port muss DisplayPort Alt Mode können',
          'Meist kann das nur der Thunderbolt-Port',
          'Gleiches Aussehen heißt nicht gleiche Technik',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext: 'Merk dir das eine: Der Port muss Alt Mode können. Ansehen kannst du ihm das nicht.',
      },
    ],
    quellenIds: ['vesa-dp-altmode', 'plugable-altmode', 'apple-display-fehlerbehebung'],
    texte: {
      tiktok: {
        titel: 'Dock lädt, Monitor bleibt schwarz',
        beschreibung:
          'Nicht jeder USB-C-Port überträgt Bild. Ohne DisplayPort Alt Mode kommt nur Strom durch.',
        hashtags: HASHTAGS_BASIS,
      },
      instagram: {
        titel: 'Warum dein Dock lädt, aber kein Bild zeigt',
        beschreibung:
          'Gleiche Buchse, völlig andere Technik: Nur ein USB-C-Port mit DisplayPort Alt Mode überträgt ein Videosignal. Fehlt der, lädt dein Notebook zwar, der Monitor bleibt aber schwarz.',
        hashtags: HASHTAGS_BASIS,
      },
      youtube: {
        titel: 'Dock lädt, aber kein Bild? Das ist der Grund',
        beschreibung:
          'Ein USB-C-Anschluss überträgt nur dann ein Bild, wenn er DisplayPort Alt Mode unterstützt.\n\nQuellen:\nApple, externe Displays am MacBook Air: https://support.apple.com/de-de/122212\nApple, Fehlerbehebung für externe Displays: https://support.apple.com/de-de/102501',
        hashtags: ['#Shorts', '#USBC', '#Homeoffice'],
      },
    },
    kennzeichnung: { werbung: 'keine', kiStimme: true },
  },

  /* ─────────────────────────── 2 von 5 ─────────────────────────── */
  {
    id: 'skl-dkb-02',
    themaId: 'dock-kein-bild',
    arbeitstitel: 'Dual Display sagt nichts über dein Notebook',
    winkelart: 'entlarvung',
    szenen: [
      {
        art: 'hook',
        kontext: 'Vor dem Dock-Kauf',
        text: '„Dual Display" steht drauf. Klappt trotzdem nicht.',
        sprechtext: 'Auf dem Dock steht groß Dual Display. Zwei Monitore anschließen klappt trotzdem nicht.',
      },
      /*
       * Die Entlarvung braucht die Gegenueberstellung, nicht die Warnung:
       * Das Werbewort und die Wirklichkeit muessen nebeneinander stehen,
       * sonst bleibt es bei einer Behauptung ueber das Werbewort.
       */
      {
        art: 'vergleich',
        ueberschrift: 'Was „Dual Display" beschreibt',
        links: {
          titel: 'Die Angabe meint',
          zeilen: ['Zwei Anschlüsse am Dock', 'Sagt nichts über dein Gerät'],
          bewertung: 'achtung',
        },
        rechts: {
          titel: 'Entscheidend ist',
          zeilen: ['Wie viele Displays dein Chip kann', 'Steht im Datenblatt des Notebooks'],
          bewertung: 'ja',
        },
        sprechtext:
          'Denn diese Angabe sagt nur, wie viele Anschlüsse das Dock hat. Wie viele Bildschirme wirklich ankommen, entscheidet der Chip in deinem Notebook.',
      },
      {
        art: 'anschluss',
        ueberschrift: 'Das Dock erweitert nichts',
        kette: [
          { geraet: 'notebook', beschriftung: 'Chip bestimmt die Zahl' },
          { geraet: 'dock', beschriftung: 'Dock verteilt nur' },
          { geraet: 'monitor', beschriftung: 'Zweiter Monitor' },
        ],
        bruchNach: 1,
        sprechtext:
          'Ein Dock verteilt das Signal, das es bekommt. Es kann keins erzeugen, das dein Notebook gar nicht liefert.',
      },
      {
        art: 'checkliste',
        ueberschrift: 'So findest du die echte Zahl',
        punkte: [
          { text: 'Datenblatt des Notebooks öffnen', bewertung: 'ja' },
          { text: 'Nach „externe Displays" suchen', bewertung: 'ja' },
          { text: 'Nicht die Dock-Verpackung glauben', bewertung: 'nein' },
        ],
        sprechtext:
          'Such im Datenblatt deines Herstellers nach der Zahl externer Displays. Die steht dort ausdrücklich, und nur die zählt.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'Vor dem Dock-Kauf',
        punkte: [
          'Die Displayzahl bestimmt dein Notebook',
          'Sie steht im Datenblatt des Herstellers',
          '„Dual Display" beschreibt nur das Dock',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext: 'Die Zahl steht im Datenblatt deines Notebooks. Nur die zählt.',
      },
    ],
    quellenIds: ['apple-displays-mba', 'plugable-altmode', 'dell-mehrere-monitore'],
    texte: {
      tiktok: {
        titel: 'Dual Display heißt nicht zwei Monitore',
        beschreibung: 'Die Angabe beschreibt das Dock, nicht dein Notebook. Der Chip entscheidet.',
        hashtags: HASHTAGS_BASIS,
      },
      instagram: {
        titel: '„Dual Display" am Dock ist keine Zusage',
        beschreibung:
          'Ein Dock verteilt nur das Signal, das dein Notebook liefert. Wie viele externe Displays wirklich möglich sind, steht im Datenblatt deines Notebooks – nicht auf der Dock-Verpackung.',
        hashtags: HASHTAGS_BASIS,
      },
      youtube: {
        titel: 'Warum „Dual Display" am Dock nichts garantiert',
        beschreibung:
          'Die Zahl externer Displays bestimmt der Chip des Notebooks. Ein Dock kann diese Grenze nicht erweitern.\n\nQuelle:\nApple, externe Displays am MacBook Air: https://support.apple.com/de-de/122212',
        hashtags: ['#Shorts', '#USBC', '#Monitor'],
      },
    },
    kennzeichnung: { werbung: 'keine', kiStimme: true },
  },

  /* ─────────────────────────── 3 von 5 ─────────────────────────── */
  {
    id: 'skl-dkb-03',
    themaId: 'dock-kein-bild',
    arbeitstitel: 'DisplayLink löst ein Problem und schafft ein neues',
    winkelart: 'kompromiss',
    szenen: [
      {
        art: 'hook',
        kontext: 'Der Umweg',
        text: 'DisplayLink hebt die Displaygrenze auf. Mit einem Haken.',
        sprechtext: 'Es gibt einen Weg um die Displaygrenze herum. Der hat aber einen Haken.',
      },
      {
        art: 'aussage',
        text: 'DisplayLink schickt das Bild komprimiert über USB.',
        hervorhebung: 'komprimiert',
        sprechtext:
          'DisplayLink umgeht die Grenze deines Chips, indem es das Bild per Software berechnet und über USB schickt. Dafür brauchst du zusätzlich einen Treiber.',
      },
      {
        art: 'warnung',
        text: 'Geschützte Videoinhalte laufen damit auf dem Mac nicht.',
        loesung: 'Streaming auf einen Monitor legen, der direkt angeschlossen ist.',
        sprechtext:
          'Und genau deshalb spielen kopiergeschützte Inhalte auf dem Mac über DisplayLink nicht ab. Für Streaming brauchst du einen direkt angeschlossenen Monitor.',
      },
      {
        art: 'vergleich',
        ueberschrift: 'Wann sich das lohnt',
        links: {
          titel: 'Sinnvoll',
          zeilen: ['Tabellen und Text', 'Mehr Fläche zum Arbeiten'],
          bewertung: 'ja',
        },
        rechts: {
          titel: 'Ungeeignet',
          zeilen: ['Streaming', 'Video und Spiele'],
          bewertung: 'nein',
        },
        sprechtext: 'Zum Arbeiten ist das völlig in Ordnung. Für Video und Spiele nimm es lieber nicht.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'DisplayLink in drei Punkten',
        punkte: [
          'Umgeht die Displaygrenze per Software',
          'Braucht auf dem Mac einen Treiber',
          'Spielt keine geschützten Videoinhalte ab',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext: 'Zum Arbeiten gut, für Streaming ungeeignet. So einfach ist die Regel.',
      },
    ],
    quellenIds: ['displaylink-macos-grenzen', 'displaylink-kopierschutz', 'synaptics-displaylink-funktion'],
    texte: {
      tiktok: {
        titel: 'DisplayLink: Der Haken',
        beschreibung: 'Hebt die Displaygrenze auf, spielt aber keine geschützten Videoinhalte auf dem Mac ab.',
        hashtags: ['#displaylink', '#macbook', '#homeoffice', '#technikwissen', '#setupklar'],
      },
      instagram: {
        titel: 'DisplayLink löst ein Problem und schafft ein neues',
        beschreibung:
          'DisplayLink berechnet das Bild per Software und schickt es über USB – damit lassen sich mehr Displays anschließen, als der Chip nativ kann. Kopiergeschützte Inhalte laufen unter macOS darüber aber nicht.',
        hashtags: ['#displaylink', '#macbook', '#homeofficesetup', '#technikwissen', '#setupklar'],
      },
      youtube: {
        titel: 'DisplayLink: Was es kann und was nicht',
        beschreibung:
          'DisplayLink umgeht die native Displaygrenze per Software, benötigt unter macOS einen Treiber und spielt keine kopiergeschützten Videoinhalte ab.\n\nQuellen:\nDisplayLink Manager für macOS: https://support.displaylink.com/knowledgebase/articles/1932214-displaylink-manager-app-for-macos-introduction-in\nDisplayLink, geschützte Videoinhalte: https://support.displaylink.com/knowledgebase/articles/830301-content-protected-video-does-not-play-on-mac-while',
        hashtags: ['#Shorts', '#DisplayLink', '#Mac'],
      },
    },
    kennzeichnung: { werbung: 'keine', kiStimme: true },
  },

  /* ─────────────────────────── 4 von 5 ─────────────────────────── */
  {
    id: 'skl-dkb-04',
    themaId: 'dock-kein-bild',
    arbeitstitel: 'Wenn das Kabel der Fehler ist',
    winkelart: 'selbsttest',
    szenen: [
      {
        art: 'hook',
        kontext: 'Der übersehene Verdächtige',
        text: 'Alles richtig gekauft. Und trotzdem kein Bild.',
        sprechtext: 'Port kann Bild, Dock kann Bild, Monitor kann Bild. Und trotzdem bleibt er schwarz.',
      },
      {
        art: 'anschluss',
        ueberschrift: 'Der übersehene Verdächtige',
        kette: [
          { geraet: 'notebook', beschriftung: 'Notebook' },
          { geraet: 'kabel', beschriftung: 'Beigelegtes Kabel' },
          { geraet: 'dock', beschriftung: 'Dock' },
        ],
        bruchNach: 1,
        sprechtext: 'Dann ist oft das Kabel schuld. Meistens das, das irgendwo beigelegen hat.',
      },
      {
        art: 'aussage',
        text: 'Ein Ladekabel hat die Datenleitungen für Bild gar nicht.',
        hervorhebung: 'Datenleitungen',
        sprechtext:
          'Viele USB-C-Kabel sind reine Ladekabel. Ihnen fehlen schlicht die Leitungen, über die ein Videosignal läuft. Sie laden trotzdem einwandfrei.',
      },
      {
        art: 'checkliste',
        ueberschrift: 'Kabel in 30 Sekunden prüfen',
        punkte: [
          { text: 'Kabel des Monitors direkt testen', bewertung: 'ja' },
          { text: 'Auf Angaben zur Datenrate achten', bewertung: 'ja' },
          { text: 'Beigelegte Ladekabel meiden', bewertung: 'nein' },
        ],
        sprechtext:
          'Tausch zum Test einfach das Kabel. Kommt dann ein Bild, hast du den Fehler gefunden.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'Kein Bild? Kabel zuerst',
        punkte: [
          'Viele USB-C-Kabel laden nur',
          'Zum Prüfen einfach tauschen',
          'Auf die Angabe zur Datenrate achten',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext: 'Tausch zuerst das Kabel. Das kostet nichts und klärt die Hälfte der Fälle.',
      },
    ],
    quellenIds: ['apple-display-fehlerbehebung', 'plugable-altmode', 'vesa-dp-altmode'],
    texte: {
      tiktok: {
        titel: 'Kein Bild? Prüf das Kabel',
        beschreibung: 'Reine Ladekabel haben die Datenleitungen für Video gar nicht.',
        hashtags: ['#usbc', '#kabel', '#homeoffice', '#technikwissen', '#setupklar'],
      },
      instagram: {
        titel: 'Wenn das Kabel der Fehler ist',
        beschreibung:
          'Viele beigelegte USB-C-Kabel sind reine Ladekabel: Sie laden einwandfrei, übertragen aber kein Videosignal. Zum Testen einfach das Kabel tauschen.',
        hashtags: ['#usbc', '#kabel', '#homeofficesetup', '#technikwissen', '#setupklar'],
      },
      youtube: {
        titel: 'Kein Bild über USB-C? Prüf zuerst das Kabel',
        beschreibung:
          'Reine Ladekabel übertragen kein Videosignal. Kabel und Anschlussart gehören zu den ersten Prüfpunkten.\n\nQuelle:\nApple, Fehlerbehebung für externe Displays: https://support.apple.com/de-de/102501',
        hashtags: ['#Shorts', '#USBC', '#Kabel'],
      },
    },
    kennzeichnung: { werbung: 'keine', kiStimme: true },
  },

  /* ─────────────────────────── 5 von 5 ─────────────────────────── */
  {
    id: 'skl-dkb-05',
    themaId: 'dock-kein-bild',
    arbeitstitel: 'In 20 Sekunden prüfen, ob zwei Displays gehen',
    winkelart: 'kaufberatung',
    szenen: [
      {
        art: 'hook',
        kontext: 'Vor dem Kauf',
        text: 'Zwei Monitore? Das weißt du in 20 Sekunden.',
        sprechtext: 'Ob dein Notebook zwei externe Monitore kann, weißt du in zwanzig Sekunden.',
      },
      {
        art: 'zahl',
        wert: '1',
        einheit: 'Datenblatt',
        bedeutung: 'Mehr brauchst du nicht. Und zwar das deines Notebooks.',
        sprechtext:
          'Du brauchst genau eine Quelle: das Datenblatt deines Notebooks. Nicht die Dockbeschreibung, nicht die Verkäuferangabe.',
      },
      {
        art: 'checkliste',
        ueberschrift: 'Drei Schritte',
        punkte: [
          { text: 'Modellnummer heraussuchen', bewertung: 'ja' },
          { text: 'Herstellerseite öffnen', bewertung: 'ja' },
          { text: 'Zeile „externe Displays" lesen', bewertung: 'ja' },
        ],
        sprechtext:
          'Modellnummer heraussuchen, Herstellerseite öffnen, und dort die Zeile mit den externen Displays lesen. Diese Zahl ist die Wahrheit.',
      },
      /*
       * Frueher eine Aussage. Als Warnung gesetzt, weil der Satz ohnehin
       * eine Sackgasse beschreibt und eine Loesung anzubieten hat — und
       * weil „aussage" sonst in vier von fuenf Shorts dieses Themas steht.
       */
      {
        art: 'warnung',
        text: 'Steht dort eine Eins, hilft auch kein teureres Dock.',
        loesung: 'Dann bleibt nur der Umweg über DisplayLink.',
        sprechtext:
          'Steht dort eine Eins, ändert daran auch das teuerste Dock nichts. Dann bleibt nur der Umweg über DisplayLink.',
      },
      {
        art: 'kaufkriterien',
        ueberschrift: 'Worauf du beim Dock achtest',
        kriterien: [
          {
            text: 'Der Notebook-Port muss DisplayPort Alt Mode können',
            pruefen: 'Datenblatt, Zeile „externe Displays"',
          },
          {
            text: 'Reicht der Chip nicht, hilft nur DisplayLink',
            pruefen: 'Spielt dafür keine geschützten Videos am Mac',
          },
          {
            text: 'Kabel mit vollen Datenleitungen, kein Ladekabel',
            pruefen: 'Angabe „USB 3.x" statt nur „Charging"',
          },
        ],
        sprechtext:
          'Wenn du jetzt kaufst: Der Port muss Alt Mode können, sonst hilft nur DisplayLink. Und nimm ein Kabel mit vollen Datenleitungen.',
      },
    ],
    quellenIds: ['apple-displays-mba', 'displaylink-macos-grenzen', 'displaylink-kopierschutz'],
    texte: {
      tiktok: {
        titel: '20-Sekunden-Check vor dem Dock-Kauf',
        beschreibung: 'Eine Zeile im Datenblatt deines Notebooks entscheidet.',
        hashtags: HASHTAGS_BASIS,
      },
      instagram: {
        titel: 'In 20 Sekunden prüfen, ob zwei Displays gehen',
        beschreibung:
          'Modellnummer heraussuchen, Herstellerseite öffnen, Zeile „externe Displays" lesen. Steht dort eine Eins, hilft auch ein teureres Dock nicht weiter.',
        hashtags: HASHTAGS_BASIS,
      },
      youtube: {
        titel: 'So prüfst du in 20 Sekunden, ob zwei Monitore gehen',
        beschreibung:
          'Die Zahl externer Displays steht im Datenblatt des Notebookherstellers und lässt sich durch ein anderes Dock nicht erhöhen.\n\nQuellen:\nApple, externe Displays am MacBook Air: https://support.apple.com/de-de/122212\nDisplayLink Manager für macOS: https://support.displaylink.com/knowledgebase/articles/1932214-displaylink-manager-app-for-macos-introduction-in\nDisplayLink, geschützte Videoinhalte am Mac: https://support.displaylink.com/knowledgebase/articles/830301-content-protected-video-does-not-play-on-mac-while',
        hashtags: ['#Shorts', '#Monitor', '#Homeoffice'],
      },
    },
    /**
     * Noch ohne Partnerlinks: Bis Gewerbeanmeldung und Partnerkonto stehen,
     * wirbt kein Short. Die Kaufkriterien-Szene bleibt trotzdem — sie ist
     * Beratung, keine Werbung, und traegt das Video auch ohne Link.
     *
     * Sobald Links dazukommen, erzwingt die Pruefung die Kennzeichnung von
     * selbst; niemand muss daran denken.
     */
    kennzeichnung: { werbung: 'keine', kiStimme: true },
  },
];
