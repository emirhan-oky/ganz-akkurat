import type { Short } from '../../src/typen';

/**
 * Rubrik Zuhause — „WLAN wird abends langsamer".
 *
 * Der Zuschnitt hat sich bei der Recherche verschoben, und das ist wichtig
 * festzuhalten: Der ursprüngliche Titel war „Deine Leitung ist nicht schuld".
 * Das ließ sich **nicht belegen** — ob abends das Funkband oder der
 * Anschluss überlastet ist, hängt am Einzelfall, und keine Quelle sagt,
 * welches häufiger ist. Eine Häufigkeitsbehauptung wäre genau die Sorte
 * Zuspitzung, die von den Quellen nicht getragen wird.
 *
 * Belegbar ist dagegen: Das 2,4-GHz-Band wird geteilt, Nachbarnetze nehmen
 * nutzbare Kapazität weg, und abends sind alle gleichzeitig online. Daraus
 * wird die Entwarnung „Dein Router ist nicht zu alt" — die trägt.
 */

const HASHTAGS = ['#wlan', '#router', '#heimnetz', '#technikwissen', '#setupklar'];

export const wlanAbends: Short[] = [
  {
    id: 'skl-wla-01',
    themaId: 'wlan-abends',
    rubrik: 'zuhause',
    arbeitstitel: 'Nicht der Router ist verdächtig, sondern deine Nachbarn',
    winkelart: 'mythos',

    system: 'ohne',
    titelmuster: 'verdaechtiger',
    vertiefung: 'fehlspur',
    merksatz: '2,4 GHz ist ein geteiltes Band, kein eigener Kanal.',

    szenen: [
      {
        art: 'hook',
        kontext: 'WLAN in der Wohnung',
        // Abgeleitet aus „jeden Abend gegen acht" — die Tageszeit ist hier
        // die halbe Aussage, und ohne Bild steht sie nur im Sprechtext.
        symbol: 'uhr',
        text: 'Dein Router ist nicht zu alt.',
        sprechtext:
          'Jeden Abend gegen acht wird das WLAN zäh. Und jedes Mal denkst du, der Router hat es hinter sich.',
      },
      {
        art: 'fehlspur',
        ueberschrift: 'Was es nicht ist',
        spuren: [
          { verdacht: 'Der Router ist zu alt', entkraeftung: 'Neues Gerät, abends dasselbe Bild' },
          { verdacht: 'Der Anschluss ist zu klein', entkraeftung: 'Am Kabel läuft die volle Rate' },
        ],
        sprechtext:
          'Also kommt ein neuer her. Abends wird es trotzdem zäh. Dann ist es eben der Tarif, denkst du. Aber am Netzwerkkabel läuft die volle Geschwindigkeit, auch um acht. Beides ist es also nicht.',
      },
      {
        art: 'zahl',
        wert: '2,4',
        einheit: 'GHz',
        bedeutung: 'Ein Band für die ganze Nachbarschaft',
        /*
         * Bundesnetzagentur statt TP-Link, seit dem 14.08.2026.
         *
         * Der Short stand auf drei Herstellerquellen — TP-Link, TP-Link,
         * Intel — und behauptete „dein Router ist nicht zu alt". Belegt vom
         * Routerhersteller. Zur Frage, wie sich ein Funkband unter Nachbarn
         * aufteilt, ist ein Anbieter nicht die zustaendige Instanz: Das Band
         * ist per Allgemeinzuteilung vergeben, und dort steht ausdruecklich,
         * dass gegenseitige Beeintraechtigungen vorgesehen und hinzunehmen
         * sind. Genau das ist die Aussage der Szene.
         *
         * Der Sprechtext sagt es deshalb jetzt auch so: nicht „der Hersteller
         * sagt es selbst", sondern die Behoerde, die das Band zuteilt.
         */
        quelleId: 'bnetza-wlan-24ghz-allgemeinzuteilung',
        /*
         * Nachbarhaeuser statt Router: Diese Szene benennt die Ursache. Ein
         * Router daneben zeigte ausgerechnet die Partei, die das Video
         * entlastet.
         */
        symbol: 'nachbarhaeuser',
        sprechtext:
          'Der Grund steht in der Frequenz. Zwei Komma vier Gigahertz ist kein Kanal, der dir gehört, sondern ein Band, das sich alle teilen. Und das ist keine Panne, sondern so vergeben: Die Bundesnetzagentur schreibt ausdrücklich, dass es keinen Schutz vor gegenseitigen Störungen gibt.',
      },
      {
        art: 'vergleich',
        ueberschrift: 'Warum ausgerechnet abends',
        /*
         * Diese Szene behauptet ein **Zeitmuster** — vormittags frei, abends
         * voll. Als die zahl-Szene am 14.08.2026 von TP-Link auf die
         * Bundesnetzagentur umgehaengt wurde, fiel `tplink-kapazitaet-abends`
         * aus den `quellenIds`, und damit verlor der Vergleich still seinen
         * Beleg: Die Behoerde sagt, dass das Band geteilt wird, aber nichts
         * darueber, wann es voll ist. Aufgefallen ist es erst, als
         * `vergleich` ein Quellenfeld bekam.
         */
        quelleId: 'tplink-kapazitaet-abends',
        links: {
          titel: 'Vormittags',
          zeilen: ['Die halbe Nachbarschaft ist weg', 'Das Band ist frei'],
          bewertung: 'ja',
        },
        rechts: {
          titel: 'Abends um acht',
          zeilen: ['Alle sind gleichzeitig online', 'Dieselben drei Kanäle'],
          bewertung: 'nein',
        },
        sprechtext:
          'Vormittags ist das Haus leer und das Band gehört fast dir. Abends sind deine Nachbarn alle gleichzeitig online — und funken auf denselben Kanälen. Dein Router wird nicht langsamer. Er kommt nur seltener dran.',
      },
      {
        /*
         * Die Handlungsszene traegt den zweiten Beleg und zugleich die
         * Laenge. Ein Short mit Vertiefung soll 75 bis 90 Sekunden haben —
         * die kommen aus einer zusaetzlichen Sache, die der Zuschauer
         * mitnimmt, nicht aus laengeren Saetzen ueber dieselbe Sache.
         */
        art: 'checkliste',
        ueberschrift: 'In zwei Minuten geprüft',
        punkte: [
          { text: 'Am Netzwerkkabel gegenprüfen', bewertung: 'ja' },
          { text: 'Geräte auf das 5-GHz-Netz umhängen', bewertung: 'ja' },
          { text: 'Im Router den Funkkanal wechseln', bewertung: 'ja' },
          { text: 'Nicht sofort einen neuen Router kaufen', bewertung: 'nein' },
        ],
        quelleId: 'tplink-stoerung-nachbarn',
        sprechtext:
          'Bevor du Geld ausgibst, drei Handgriffe. Erstens: Häng ein Gerät ans Netzwerkkabel und miss noch mal. Läuft es dort schnell, ist die Leitung sauber und es liegt am Funk. Zweitens: Häng alles, was fünf Gigahertz kann, auf das zweite Netz um. Und drittens sagt der Hersteller selbst, was dann hilft — im Router den Funkkanal wechseln, weg von dem, auf dem die halbe Straße sitzt.',
      },
      {
        /*
         * Kam am 13.08.2026 dazu, weil der vertonte Short bei 73,9 Sekunden
         * lag und das Fenster bei 75 beginnt.
         *
         * `intel-funkumgebung` stand bis dahin nur in `quellenIds`, ohne dass
         * eine Szene sie trug. Der Ratschlag „nimm 5 GHz" steht zwar schon in
         * der Checkliste — was fehlte, war, dass er nicht von uns kommt.
         * Genau darin liegt der Unterschied zwischen einem Forentipp und
         * einer belegten Aussage, und dieser Kanal lebt von dem Unterschied.
         *
         * Bewusst **nicht** ergaenzt: dass 5 GHz schlechter durch Waende
         * kommt. Das stimmt, aber keine der drei Quellen sagt es — also steht
         * es nicht im Video.
         */
        art: 'aussage',
        text: 'Auch der Chiphersteller rät zu 5 GHz.',
        hervorhebung: 'Chiphersteller',
        quelleId: 'intel-funkumgebung',
        sprechtext:
          'Das ist übrigens kein Forentipp. Der Hersteller der Funkmodule, die in den meisten Notebooks stecken, empfiehlt genau das: Wer Störungen loswerden will, geht auf fünf Gigahertz.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'WLAN abends zäh?',
        punkte: [
          'Nicht der Router, das geteilte Band',
          'Auf 5 GHz ausweichen, wenn Geräte es können',
          'Am Kabel gegenprüfen: läuft es dort, ist es Funk',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext:
          'Wenn deine Geräte fünf Gigahertz können, nimm das Band — genau dafür ist es da. Und prüf einmal am Kabel gegen: Läuft es dort, liegt es nie an der Leitung.',
      },
    ],

    quellenIds: [
      'bnetza-wlan-24ghz-allgemeinzuteilung',
      'tplink-kapazitaet-abends',
      'tplink-stoerung-nachbarn',
      'intel-funkumgebung',
    ],

    texte: {
      tiktok: {
        titel: 'Nicht der Router ist verdächtig, sondern deine Nachbarn',
        beschreibung:
          'Das 2,4-GHz-Band teilst du dir mit der ganzen Nachbarschaft. Abends sind alle gleichzeitig drauf.',
        hashtags: HASHTAGS,
      },
      instagram: {
        titel: 'Nicht der Router ist verdächtig, sondern deine Nachbarn',
        beschreibung:
          'Ein neuer Router ändert daran wenig: 2,4 GHz ist ein geteiltes Band, kein eigener Kanal. Abends sind alle Haushalte gleichzeitig online und funken auf denselben Kanälen. Wer kann, weicht auf 5 GHz aus.',
        hashtags: HASHTAGS,
      },
      youtube: {
        titel: 'Nicht der Router ist verdächtig, sondern deine Nachbarn',
        beschreibung:
          'Das 2,4-GHz-Band ist ein Gemeinschaftsband. Nachbarnetze auf denselben Kanälen nehmen nutzbare Kapazität weg, und abends sind alle gleichzeitig online. Der Router ist deshalb nicht langsamer – er kommt seltener dran.\n\nQuellen:\nTP-Link, Why Is My Wi-Fi So Slow: https://www.tp-link.com/us/blog/2670/why-is-my-wi-fi-so-slow-a-guide-for-multi-device-households/\nTP-Link, How to Fix Slow Internet: https://www.tp-link.com/us/support/faq/2170/\nIntel, Advanced Wireless Adapter Settings: https://www.intel.com/content/www/us/en/support/articles/000005585/wireless.html',
        hashtags: ['#Shorts', '#WLAN', '#Heimnetz'],
      },
    },

    kennzeichnung: { werbung: 'keine', kiStimme: true },
  },
];
