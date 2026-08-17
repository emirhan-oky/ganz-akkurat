import type { Idee } from '../../src/typen';

/**
 * Donnerstag · Na, auch gekauft? — der Zuschauer sieht sein eigenes Regal.
 *
 * Der Sendeplatz funktioniert nur, wenn der Sprecher **mitgemeint** ist. Ohne
 * das „wir" im Nachschlag ist es Belehrung, und Belehrung verteidigt der
 * Zuschauer sofort weg.
 *
 * Zugleich die Vorarbeit fuer die Empfehlung: Ein Kanal, der ein halbes Jahr
 * lang sagt, was man **nicht** kaufen soll, wird geglaubt, wenn er einmal
 * etwas empfiehlt.
 */
export const auchgekauftIdeen: Idee[] = [
  {
    id: 'garantieverlaengerung',
    format: 'auchgekauft',
    sachgebiet: 'recht',
    reifegrad: 'produziert',
    erzaehlt: 'Die Garantieverlängerung an der Kasse verkauft dir zwei Jahre, die im Gesetz schon stehen.',
    dreh: 'Garantie und Gewährleistung heißen im Laden dasselbe. Davon lebt der Zusatzvertrag.',
    sache: '§ 443 BGB (Garantie, freiwillig) gegen § 438 BGB (Gewährleistung, zwei Jahre, gesetzlich).',
    belegpfad: [{ instanz: 'Bundesministerium der Justiz', art: 'behoerde', findet: '§§ 443 und 438 BGB im Volltext' }],
    quellenIds: ['bgb-443-garantie', 'bgb-438-verjaehrung'],
  },
  {
    id: 'vergoldetes-kabel',
    format: 'auchgekauft',
    sachgebiet: 'bildschirm',
    reifegrad: 'skizze',
    erzaehlt: 'Ein vergoldetes Kabel überträgt keine besseren Nullen und Einsen.',
    dreh: 'Digital heißt: Es kommt an oder es kommt nicht an. Ein Dazwischen, das Gold verbessern könnte, gibt es nicht.',
    sache: 'Fehlerkorrektur und Signalintegrität bei digitaler Übertragung — belegbar über die Schnittstellennorm.',
    belegpfad: [
      { instanz: 'HDMI Forum', art: 'standard', findet: 'Anforderungen an Kabel, Prüfbedingungen' },
      { instanz: 'Verbraucherschutzbehörde', art: 'behoerde', findet: 'Beanstandung irreführender Kabelwerbung' },
    ],
    quellenIds: [],
    notiz: 'Die HDMI-Spezifikation ist kostenpflichtig. Prüfen, ob die frei zugängliche Zusammenfassung reicht.',
  },
  {
    id: 'panzerglas-ohne-norm',
    format: 'auchgekauft',
    sachgebiet: 'handy',
    reifegrad: 'skizze',
    erzaehlt: 'Panzerglas heißt Panzerglas, weil es sich gut verkauft. Eine Norm für den Begriff gibt es nicht.',
    dreh: 'Der Name ist das Produkt. Geprüft wird gegen nichts, weil es nichts gibt, wogegen man prüfen könnte.',
    sache: 'Es existiert keine Norm, die den Begriff für Displayschutz belegt.',
    belegpfad: [
      { instanz: 'DIN', art: 'standard', findet: 'Recherche im Normenverzeichnis, Nachweis der Nichtexistenz' },
    ],
    quellenIds: [],
    notiz:
      'Heikel: Wir behaupten eine Nichtexistenz. Eine leere Trefferliste ist kein Zitat. Vor dem Bauen klären, ' +
      'ob sich das überhaupt belegen lässt — sonst fällt die Idee.',
  },
  {
    id: 'kabellos-laden-verlust',
    format: 'auchgekauft',
    sachgebiet: 'laden',
    reifegrad: 'skizze',
    erzaehlt: 'Kabellos laden ist bequem und verheizt rund ein Drittel der Energie.',
    dreh: 'Keine Warnung, kein Verzicht — nur die Zahl neben die Bequemlichkeit gestellt.',
    sache: 'Wirkungsgrad induktiver Ladung gegenüber Kabelladung.',
    belegpfad: [
      { instanz: 'Umweltbundesamt', art: 'behoerde', findet: 'Energieverluste bei induktiver Ladung' },
      { instanz: 'Wireless Power Consortium', art: 'standard', findet: 'Qi-Spezifikation, Wirkungsgradangaben' },
    ],
    quellenIds: [],
    notiz: 'Kein „lass das lieber" im Text. Eine Handlung zu verlangen ist auf jedem Sendeplatz verboten.',
  },
  {
    id: 'gefaelschter-speicher',
    format: 'auchgekauft',
    sachgebiet: 'rechner',
    reifegrad: 'skizze',
    erzaehlt: 'Auf dem Stick steht ein Terabyte, drin ist ein Zwanzigstel. Er meldet dem Rechner eine Größe, die er nicht hat.',
    dreh: 'Der Betrug funktioniert, weil der Rechner glaubt, was der Stick sagt.',
    sache: 'Manipulierter Controller meldet falsche Kapazität; Daten laufen im Ring über.',
    belegpfad: [
      { instanz: 'Marktüberwachungsbehörde', art: 'behoerde', findet: 'Warnmeldung zu gefälschten Speichermedien' },
      { instanz: 'BSI', art: 'behoerde', findet: 'Hinweise zur Prüfung von Wechseldatenträgern' },
    ],
    quellenIds: [],
  },
  {
    id: 'gaming-netzwerkkabel',
    format: 'auchgekauft',
    sachgebiet: 'netz',
    reifegrad: 'skizze',
    erzaehlt: 'Der Aufpreis für „Gaming" auf einem Netzwerkkabel kauft dir eine andere Farbe.',
    dreh: 'Die Kategorie steht auf dem Kabel. Alles andere steht auf der Verpackung.',
    sache: 'Cat-Kategorien sind genormt; „Gaming" ist keine Kategorie.',
    belegpfad: [
      { instanz: 'ISO/IEC', art: 'standard', findet: 'Kategorien für symmetrische Verkabelung' },
    ],
    quellenIds: [],
    notiz: 'Gleiche Schwierigkeit wie beim Panzerglas: ISO-Normen sind kostenpflichtig.',
  },
  {
    id: 'garantiesiegel-nichtig',
    format: 'auchgekauft',
    sachgebiet: 'recht',
    reifegrad: 'skizze',
    erzaehlt: 'Auf dem Aufkleber steht, die Garantie erlischt beim Öffnen. Das gilt so nicht.',
    dreh: 'Der Aufkleber wirkt, obwohl er nichts kann — er hält Leute davon ab, ihr Recht zu nutzen.',
    sache: 'Gesetzliche Mängelhaftung gilt unabhängig vom Siegel; die Garantie ist eine eigene Erklärung.',
    belegpfad: [
      { instanz: 'Bundesministerium der Justiz', art: 'behoerde', findet: '§§ 443, 476 BGB im Wortlaut' },
      { instanz: 'Rechtsprechung', art: 'rechtsprechung', findet: 'Entscheidung zur Unwirksamkeit von Öffnungsklauseln' },
    ],
    quellenIds: ['bgb-443-garantie', 'bgb-438-verjaehrung'],
  },
  {
    id: 'schnellladegeraet-ohne-protokoll',
    format: 'auchgekauft',
    sachgebiet: 'laden',
    reifegrad: 'skizze',
    erzaehlt: 'Auf dem Netzteil steht Schnellladen. Welches Schnellladen, steht nicht drauf.',
    dreh: 'Zwei Geräte können beide schnellladen und sich trotzdem nicht einigen.',
    sache: 'USB Power Delivery ist das genormte Verfahren; herstellereigene Verfahren stehen daneben.',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Aushandlung der Leistung über Power Delivery' },
    ],
    quellenIds: ['usbif-power-delivery'],
  },
  {
    id: 'speicherkarte-klasse',
    format: 'auchgekauft',
    sachgebiet: 'rechner',
    reifegrad: 'skizze',
    erzaehlt: 'Auf der Speicherkarte stehen vier Geschwindigkeitsangaben. Nur eine sagt, was garantiert ist.',
    dreh: 'Die große Zahl vorn ist die Spitze im besten Fall. Die kleine im Kreis ist die Untergrenze.',
    sache: 'Speed Class, UHS Speed Class und Video Speed Class nennen Mindestwerte, die Werbezahl nicht.',
    belegpfad: [
      { instanz: 'SD Association', art: 'standard', findet: 'Definition der Geschwindigkeitsklassen als Mindestwerte' },
    ],
    quellenIds: [],
  },
  {
    id: 'handyversicherung',
    format: 'auchgekauft',
    sachgebiet: 'recht',
    reifegrad: 'skizze',
    erzaehlt: 'Die Displayversicherung an der Kasse deckt oft genau das ab, was ohnehin gilt.',
    dreh: 'Zwillingsthema zur Garantieverlängerung — erst bauen, wenn die genug Abstand hat.',
    sache: 'Abgrenzung von Mängelhaftung, Garantie und Versicherung; Selbstbeteiligung als versteckter Preis.',
    belegpfad: [
      { instanz: 'Bundesministerium der Justiz', art: 'behoerde', findet: 'Mängelhaftung im BGB' },
      { instanz: 'BaFin', art: 'behoerde', findet: 'Einordnung von Restschuld- und Geräteversicherungen' },
    ],
    quellenIds: ['bgb-438-verjaehrung'],
  },
];
