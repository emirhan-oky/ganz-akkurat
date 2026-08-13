import type { Short } from '../src/typen';

/**
 * Referenz-Short.
 *
 * Dient zwei Zwecken: er ist die Vorschau im Remotion-Studio, und er ist der
 * Massstab fuer die Skript-Engine — so klingt und so sitzt ein SetupKlar-Short.
 * Inhaltlich echt und belegt, kein Blindtext.
 */
export const beispielShort: Short = {
  id: 'skl-0001',
  themaId: 'usbc-dock-kein-bild',
  rubrik: 'schreibtisch',
  arbeitstitel: 'Dock lädt, aber kein Bild',
  winkelart: 'diagnose',

  /*
   * Der Referenz-Short traegt bewusst **keine** Vertiefung. Er ist die
   * Standard-Prop der Komposition und soll den Grundaufbau zeigen — Hook,
   * Beweis, Konsequenz, Schlusskarte. Wie eine Vertiefung aussieht, steht
   * in `daten/entwuerfe/dock-kein-bild.ts` (Fehlspur) und
   * `powerbank-flug.ts` (Herleitung).
   */
  system: 'ohne',
  titelmuster: 'verdaechtiger',
  merksatz: 'USB-C ist eine Steckerform, keine Fähigkeit.',

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
      sprechtext:
        'Und das liegt fast nie am Dock. Das Bild kommt schon aus deinem Notebook nicht raus.',
    },
    {
      art: 'aussage',
      text: 'Ein USB-C-Port überträgt nur dann Bild, wenn er DisplayPort Alt Mode kann.',
      hervorhebung: 'DisplayPort Alt Mode',
      quelleId: 'vesa-dp-altmode',
      sprechtext:
        'Denn ein USB-C-Anschluss überträgt nur dann ein Bild, wenn er DisplayPort Alt Mode beherrscht. Und das sieht man dem Stecker nicht an.',
    },
    {
      art: 'vergleich',
      ueberschrift: 'Gleiche Buchse, zwei Welten',
      links: {
        titel: 'Mit Alt Mode',
        zeilen: ['Bild und Ton laufen', 'Lädt gleichzeitig', 'Meist Thunderbolt-Port'],
        bewertung: 'ja',
      },
      rechts: {
        titel: 'Ohne Alt Mode',
        zeilen: ['Nur Strom und Daten', 'Monitor bleibt schwarz', 'Oft der zweite USB-C-Port'],
        bewertung: 'nein',
      },
      sprechtext:
        'Der eine Port macht Bild, Ton und Strom. Der andere sieht identisch aus, gibt aber nur Strom und Daten weiter.',
    },
    {
      art: 'checkliste',
      ueberschrift: 'Das prüfst du vor dem Kauf',
      punkte: [
        { text: 'Steht am Port ein DisplayPort-Symbol?', bewertung: 'ja' },
        { text: 'Wie viele Displays nennt der Hersteller?', bewertung: 'ja' },
        { text: 'Nicht auf „Dual Display" am Dock verlassen', bewertung: 'nein' },
      ],
      sprechtext:
        'Also: Schau, ob am Port ein DisplayPort-Symbol steht. Prüf im Datenblatt deines Notebooks, wie viele Displays es überhaupt kann. Und verlass dich nie auf die Angabe Dual Display am Dock.',
    },
    /*
     * Frueher ein Abbinder, der auf den angehefteten Beitrag verwies. Das
     * schickt Zuschauer weg und macht das Video kennzeichnungspflichtig,
     * ohne dass irgendwer den Beitrag oeffnet. Was mitgenommen werden soll,
     * steht jetzt im Video.
     */
    {
      art: 'endkarte',
      ueberschrift: 'Kein Bild über das Dock?',
      punkte: [
        'Der Port muss DisplayPort Alt Mode können',
        'Die Displayzahl steht im Datenblatt des Notebooks',
        '„Dual Display" beschreibt nur das Dock',
      ],
      abschluss: 'Technik, die zusammenpasst',
      sprechtext: 'Merk dir das eine: Der Port muss Alt Mode können. Ansehen kannst du ihm das nicht.',
    },
  ],

  /*
   * Mindestens drei Belege — der Referenz-Short ist zugleich die
   * Standard-Prop der Komposition. Reisst er das Schema, wirft
   * `calculateMetadata` im Browser-Kontext, und Remotion bleibt in einem
   * unerfuellten Promise stehen, statt abzubrechen: Der Render haengt dann
   * ohne Fehlermeldung.
   */
  /*
   * Die beiden Apple-Supportseiten standen bis zum 13.08.2026 hier. Sie sind
   * aus `quellen.json` entfernt, weil sie sich nicht abrufen lassen und
   * deshalb kein woertliches Zitat tragen konnten. Die Aussage zur
   * Displaygrenze belegt jetzt Plugable, pruefbar.
   */
  quellenIds: ['vesa-dp-altmode', 'plugable-altmode', 'displaylink-macos-grenzen'],

  texte: {
    tiktok: {
      titel: 'Dock lädt, Monitor bleibt schwarz',
      beschreibung:
        'Nicht jeder USB-C-Port überträgt Bild. Ohne DisplayPort Alt Mode kommt nur Strom durch. Das prüfst du vor dem Kauf.',
      hashtags: ['#usbc', '#homeoffice', '#technik', '#schreibtisch', '#setupklar'],
    },
    instagram: {
      titel: 'Warum dein Dock lädt, aber kein Bild zeigt',
      beschreibung:
        'Gleiche Buchse, völlig andere Technik: Nur ein USB-C-Port mit DisplayPort Alt Mode überträgt ein Bild. Fehlt der, lädt dein Notebook zwar, der Monitor bleibt aber schwarz. Die drei Punkte aus dem Video prüfst du am besten vor dem Kauf.',
      hashtags: ['#usbc', '#homeofficesetup', '#schreibtischsetup', '#technikwissen', '#setupklar'],
    },
    youtube: {
      titel: 'Dock lädt, aber kein Bild? Das ist der Grund',
      beschreibung:
        'Ein USB-C-Anschluss überträgt nur dann ein Bild, wenn er DisplayPort Alt Mode unterstützt. Sonst kommen nur Strom und Daten durch – das Dock funktioniert, der Monitor bleibt trotzdem schwarz.\n\nQuellen:\nVESA, DisplayPort über USB Type-C: https://vesa.org/featured-articles/vesa-brings-displayport-to-new-usb-type-c-connector/\nPlugable, Understanding USB-C Alt Mode: https://kb.plugable.com/understanding-usb-c-alt-mode\nDisplayLink Manager für macOS: https://support.displaylink.com/knowledgebase/articles/1932214-displaylink-manager-app-for-macos-introduction-in',
      hashtags: ['#Shorts', '#USBC', '#Homeoffice'],
    },
  },

  kennzeichnung: {
    werbung: 'keine',
    kiStimme: true,
  },
};
