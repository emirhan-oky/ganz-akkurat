import type { Short } from '../../src/typen';

/**
 * Rubrik Schreibtisch — „Dock lädt, aber kein Bild".
 *
 * Bis zum 13.08.2026 lagen hier **fünf** Shorts zu diesem einen Thema, der
 * alte Zuschnitt „ein Thema, fünf Zugriffe". Genau daraus entstand die
 * Oberflächlichkeit: Wer aus einer Frage fünf Videos ziehen muss, schneidet
 * sie in fünf dünne Scheiben. Geblieben ist der beste der fünf, dafür mit
 * Vertiefung und in voller Länge.
 *
 * Schreibregel dieses Projekts: **Bildtext ist die verdichtete Behauptung,
 * der Sprechtext führt sie aus.** Wer ohne Ton schaut, bekommt die Aussage
 * über Bild und Untertitel; wer mit Ton schaut, bekommt die Begründung dazu.
 * Beides doppelt zu sagen verschenkt die halbe Erzählzeit.
 */

const HASHTAGS = ['#usbc', '#homeoffice', '#schreibtischsetup', '#technikwissen', '#setupklar'];

export const dockKeinBild: Short[] = [
  {
    id: 'skl-dkb-01',
    themaId: 'dock-kein-bild',
    rubrik: 'schreibtisch',
    arbeitstitel: 'Dein Monitor ist nicht kaputt',
    winkelart: 'diagnose',

    /*
     * Systemunabhaengig: Alt Mode ist eine Eigenschaft des Anschlusses, nicht
     * des Betriebssystems. Waere hier `macos` gesetzt, verlangte die Pruefung
     * eine systemspezifische Quelle — zu Recht, denn die Aussage traegt keine.
     */
    system: 'ohne',
    titelmuster: 'verdaechtiger',
    vertiefung: 'fehlspur',
    merksatz: 'USB-C ist eine Steckerform, keine Fähigkeit.',

    szenen: [
      {
        art: 'hook',
        kontext: 'USB-C am Notebook',
        text: 'Dein Monitor ist nicht kaputt.',
        sprechtext: 'Dein Dock lädt, der Monitor bleibt schwarz. Und nein, dein Monitor ist nicht kaputt.',
      },
      {
        /*
         * Die Fehlspur nennt zuerst, was der Zuschauer selbst vermutet
         * haette. Beide Verdaechtigen sind die haeufigsten Ratschlaege in
         * Supportforen — wer sie schon durch hat, bleibt jetzt dran.
         */
        art: 'fehlspur',
        ueberschrift: 'Was es nicht ist',
        spuren: [
          { verdacht: 'Das Kabel ist kaputt', entkraeftung: 'Neues Kabel, immer noch schwarz' },
          { verdacht: 'Das Dock ist zu schwach', entkraeftung: 'Es lädt ja — Strom kommt an' },
        ],
        sprechtext:
          'Der erste Gedanke ist meistens das Kabel. Neues Kabel gekauft, immer noch schwarz. Der zweite Gedanke ist das Dock — aber das kann es auch nicht sein, denn es lädt ja. Strom kommt an. Nur eben kein Bild.',
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
        sprechtext:
          'Denn das Bild kommt gar nicht erst aus deinem Notebook heraus. Die Kette reißt an der ersten Verbindung, nicht an der letzten.',
      },
      {
        art: 'aussage',
        text: 'Bild braucht DisplayPort Alt Mode.',
        hervorhebung: 'DisplayPort Alt Mode',
        quelleId: 'vesa-dp-altmode',
        sprechtext:
          'Ein USB-C-Anschluss überträgt nämlich nur dann ein Videosignal, wenn er den DisplayPort Alt Mode beherrscht. Der Standard sagt das ganz klar: Erst dieser Modus bringt Bild und Ton über den Stecker.',
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
          'Und der Hersteller sagt es selbst: Alt Mode ist optional, nicht jedes System hat ihn. Der eine Port macht alles. Der andere sieht identisch aus und gibt nur Strom und Daten weiter. Ansehen kannst du ihm das nicht.',
      },
      {
        /*
         * Der Grenzfall ist die Antwort auf den haeufigsten Einwand: „Bei mir
         * geht es aber ohne Alt Mode." Stimmt — dann laeuft ein Treiber, der
         * das Bild als Datenstrom schickt. Wer das nicht nennt, wird in den
         * Kommentaren korrigiert; wer es nennt, ist der, der es wusste.
         *
         * Die Szene traegt zugleich die Laenge: 68 Sekunden lagen unter dem
         * Zielfenster von 75 bis 90 fuer einen Short mit Vertiefung.
         */
        art: 'einschraenkung',
        ueberschrift: 'Außer wenn ein Treiber mitspielt',
        bedingung: 'Manche Docks bringen trotzdem ein Bild',
        folge: 'Sie schicken es als Datenstrom über einen Treiber — das kostet Rechenleistung',
        quelleId: 'synaptics-displaylink-funktion',
        sprechtext:
          'Jetzt sagst du vielleicht: Bei mir geht es aber. Dann steckt eine andere Technik im Dock. Ein Treiber sammelt die Bildpunkte ein und schickt sie als Datenstrom hinüber — der Hersteller beschreibt es genau so. Es funktioniert. Nur macht die Arbeit dein Prozessor.',
      },
      {
        art: 'endkarte',
        ueberschrift: 'Kein Bild über das Dock?',
        punkte: [
          'Der Port muss DisplayPort Alt Mode können',
          'Meist kann das nur der Thunderbolt-Port',
          'USB-C ist eine Steckerform, keine Fähigkeit',
        ],
        abschluss: 'Technik, die zusammenpasst',
        sprechtext:
          'Merk dir das eine, dann brauchst du dieses Video nie wieder: USB-C ist eine Steckerform, keine Fähigkeit. Was hinten drin steckt, steht im Datenblatt — nicht am Stecker.',
      },
    ],

    quellenIds: ['vesa-dp-altmode', 'plugable-altmode', 'dell-mehrere-monitore', 'synaptics-displaylink-funktion'],

    texte: {
      tiktok: {
        titel: 'Dock lädt, Monitor schwarz: nicht dein Monitor',
        beschreibung:
          'Nicht jeder USB-C-Port überträgt Bild. Ohne DisplayPort Alt Mode kommt nur Strom durch.',
        hashtags: HASHTAGS,
      },
      instagram: {
        titel: 'Dock lädt, aber kein Bild: Dein Monitor ist nicht kaputt',
        beschreibung:
          'Gleiche Buchse, völlig andere Technik: Nur ein USB-C-Port mit DisplayPort Alt Mode überträgt ein Videosignal. Fehlt der, lädt dein Notebook zwar, der Monitor bleibt aber schwarz. Weder Kabel noch Dock sind schuld.',
        hashtags: HASHTAGS,
      },
      youtube: {
        titel: 'Dock lädt, aber kein Bild: Dein Monitor ist nicht kaputt',
        beschreibung:
          'Ein USB-C-Anschluss überträgt nur dann ein Bild, wenn er DisplayPort Alt Mode unterstützt. Sonst kommen nur Strom und Daten durch – das Dock funktioniert, der Monitor bleibt trotzdem schwarz.\n\nQuellen:\nVESA, DisplayPort über USB Type-C: https://vesa.org/featured-articles/vesa-brings-displayport-to-new-usb-type-c-connector/\nPlugable, Understanding USB-C Alt Mode: https://kb.plugable.com/understanding-usb-c-alt-mode\nDell, Advanced Multi-Monitor Setup: https://www.dell.com/support/kbdoc/en-us/000134286/how-to-setup-multiple-monitors',
        hashtags: ['#Shorts', '#USBC', '#Homeoffice'],
      },
    },

    kennzeichnung: { werbung: 'keine', kiStimme: true },
  },
];
