import type { Idee } from '../../src/typen';

/**
 * Rubrik Kaufen — der einzige Sendeplatz, auf dem Partnerlinks vorgesehen
 * sind (Variante A). Zurzeit trägt er trotzdem keine, weil das Gewerbe fehlt.
 *
 * Zwei Besonderheiten gegenüber allen anderen Rubriken:
 *
 * 1. Die tragende unbeteiligte Instanz ist meist das **Gesetz** oder ein
 *    **Urteil**, nicht eine technische Norm. `rechtsprechung` ist bisher die
 *    einzige Quellenart, die in quellen.json noch nie vorkam — hier wird sie
 *    gebraucht.
 * 2. Die `produktionsregel` schlägt hier am härtesten zu: kein „Test", keine
 *    behauptete eigene Erfahrung, kein Markenname im Video. Was bleibt, sind
 *    Kriterien und Rechte — und genau das ist die Stärke dieser Rubrik, weil
 *    Kriterien länger halten als Produktempfehlungen.
 */
export const kaufenIdeen: Idee[] = [
  {
    id: 'refurbished-zustandsklassen',
    rubrik: 'kaufen',
    winkelart: 'entlarvung',
    reifegrad: 'skizze',
    kernfrage: 'Was bedeutet „Zustand: sehr gut" bei generalüberholter Ware?',
    entwarnung: 'Du hast die Skala nicht übersehen.',
    sache:
      'Für die Zustandsangaben gebrauchter Elektronik gibt es keine verbindliche Festlegung; jeder Händler führt seine eigene Einteilung.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Verbraucherzentrale', art: 'behoerde', findet: 'Hinweis auf fehlende Verbindlichkeit der Zustandsklassen' },
      { instanz: '§ 434 BGB', art: 'behoerde', findet: 'vereinbarte Beschaffenheit als maßgeblicher Begriff statt einer Skala' },
    ],
    quellenIds: [],
    notiz:
      'Der Nachfolger von `refurbished-monitor` aus der alten themen.json. Wenn die Recherche bestätigt, dass es keine verbindliche Skala gibt, ist genau das die Aussage — und sie ist stärker als jede Aufzählung von Händlerklassen.',
  },
  {
    id: 'garantie-gegen-gewaehrleistung',
    rubrik: 'kaufen',
    winkelart: 'verwechslung',
    reifegrad: 'produziert',
    kernfrage: 'Garantie und Gewährleistung — ist das dasselbe?',
    entwarnung: 'Du hast zwei Rechte, nicht eines.',
    sache:
      'Die Gewährleistung ist gesetzlich und richtet sich gegen den Verkäufer; die Garantie ist freiwillig und kommt von dem, der sie gibt.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: '§ 443 BGB', art: 'behoerde', findet: 'Definition der Garantie als freiwillige Zusage' },
      { instanz: '§ 438 BGB', art: 'behoerde', findet: 'Verjährungsfrist der gesetzlichen Rechte' },
    ],
    quellenIds: ['bgb-443-garantie', 'bgb-438-verjaehrung', 'bgb-477-beweislast'],
    notiz: 'Läuft bereits als skl-gwl-01. Steht hier, damit der Vorrat vollständig ist und niemand dasselbe zweimal entwirft.',
  },
  {
    id: 'beweislast-nach-einem-jahr',
    rubrik: 'kaufen',
    winkelart: 'grenzwert',
    reifegrad: 'skizze',
    kernfrage: 'Nach welcher Zeit muss ich selbst beweisen, dass der Mangel von Anfang an da war?',
    entwarnung: 'Die Frist ist länger, als die meisten denken.',
    sache:
      'Innerhalb eines festgelegten Zeitraums nach Übergabe wird vermutet, dass der Mangel bereits vorlag; erst danach kehrt sich die Beweislast um.',
    titelmuster: 'uhr',
    system: 'ohne',
    belegpfad: [
      { instanz: '§ 477 BGB', art: 'behoerde', findet: 'Dauer der Beweislastumkehr beim Verbrauchsgüterkauf' },
    ],
    quellenIds: ['bgb-477-beweislast'],
    notiz:
      'Die Frist wurde zum 01.01.2022 von sechs auf zwölf Monate verlängert — genau deshalb ist die verbreitete Annahme falsch, und genau darin liegt die Entwarnung.',
  },
  {
    id: 'akkutausch-recht',
    rubrik: 'kaufen',
    winkelart: 'uebersehenerPunkt',
    reifegrad: 'skizze',
    kernfrage: 'Muss ein Akku künftig wieder wechselbar sein?',
    entwarnung: 'Ja — und das ist bereits beschlossen.',
    sache:
      'Die EU-Batterieverordnung schreibt für tragbare Batterien in Geräten die Austauschbarkeit durch den Endnutzer vor und nennt einen Stichtag.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'EU-Batterieverordnung 2023/1542', art: 'behoerde', findet: 'Pflicht zur Austauschbarkeit, betroffene Geräte, Stichtag' },
    ],
    quellenIds: [],
    notiz: 'Sehr gute Kaufen-Idee: Sie ändert eine Kaufentscheidung heute, ohne ein Produkt zu nennen.',
  },
  {
    id: 'ruecksendung-kosten',
    rubrik: 'kaufen',
    winkelart: 'uebersehenerPunkt',
    reifegrad: 'skizze',
    kernfrage: 'Wer zahlt die Rücksendung bei einem defekten Gerät?',
    entwarnung: 'Bei einem Mangel nicht du.',
    sache:
      'Bei der Nacherfüllung trägt der Verkäufer die erforderlichen Aufwendungen; das ist etwas anderes als der Widerruf, bei dem andere Regeln gelten.',
    titelmuster: 'zweisatz',
    vertiefung: 'grenzfall',
    system: 'ohne',
    belegpfad: [
      { instanz: '§ 439 BGB', art: 'behoerde', findet: 'Aufwendungen bei der Nacherfüllung' },
      { instanz: '§ 357 BGB', art: 'behoerde', findet: 'Kostentragung beim Widerruf zur Abgrenzung' },
    ],
    quellenIds: [],
    notiz: 'Der Grenzfall ist der eigentliche Inhalt: Mangel und Widerruf werden ständig verwechselt und haben verschiedene Kostenfolgen.',
  },
  {
    id: 'gebraucht-privat-gekauft',
    rubrik: 'kaufen',
    winkelart: 'haken',
    reifegrad: 'skizze',
    kernfrage: 'Kann ich beim Privatkauf etwas reklamieren?',
    entwarnung: 'Ein Ausschluss ist wirksam — aber nicht grenzenlos.',
    sache:
      'Ein Privatverkäufer darf die Gewährleistung ausschließen; bei arglistigem Verschweigen eines Mangels greift der Ausschluss nicht.',
    titelmuster: 'zweisatz',
    vertiefung: 'grenzfall',
    system: 'ohne',
    belegpfad: [
      { instanz: '§ 444 BGB', art: 'behoerde', findet: 'Grenzen des Haftungsausschlusses bei Arglist' },
      { instanz: 'Bundesgerichtshof', art: 'rechtsprechung', findet: 'Auslegung von Ausschlussklauseln in Privatanzeigen' },
    ],
    quellenIds: [],
    notiz:
      'Erste Idee im Vorrat, die die Quellenart `rechtsprechung` wirklich braucht — bisher steht sie im Enum und wird von keiner Quelle benutzt.',
  },
  {
    id: 'preis-durchgestrichen',
    rubrik: 'kaufen',
    winkelart: 'entlarvung',
    reifegrad: 'skizze',
    kernfrage: 'Was sagt der durchgestrichene Preis neben dem Angebot aus?',
    entwarnung: 'Du musst ihn nicht glauben — er ist definiert.',
    sache:
      'Bei Preisermäßigungen ist der niedrigste Preis der letzten dreißig Tage anzugeben; welcher Preis als Bezug dienen darf, ist damit festgelegt.',
    titelmuster: 'uhr',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Preisangabenverordnung § 11', art: 'behoerde', findet: 'Pflicht zur Angabe des niedrigsten Preises der letzten 30 Tage' },
      { instanz: 'Bundesgerichtshof / EuGH', art: 'rechtsprechung', findet: 'Auslegung, worauf sich die Ermäßigung beziehen muss' },
    ],
    quellenIds: [],
    notiz: 'Sehr starke Idee für diese Rubrik — und ausgerechnet die, bei der ein Partnerlink daneben am meisten Fingerspitzengefühl verlangt.',
  },
  {
    id: 'netzteil-kaufen-kriterien',
    rubrik: 'kaufen',
    winkelart: 'kaufberatung',
    reifegrad: 'skizze',
    kernfrage: 'Worauf achte ich bei einem Netzteil, ohne die Marke zu kennen?',
    entwarnung: 'Drei Angaben reichen.',
    sache:
      'Leistungsstufen und Kennzeichnung sind genormt; die zugesicherte Abgabeleistung und die geforderte Kennzeichnung stehen am Gerät.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Leistungsstufen und Kennzeichnungsregeln' },
      { instanz: 'EU-Ökodesign-Verordnung', art: 'behoerde', findet: 'Effizienzanforderungen an externe Netzteile' },
    ],
    quellenIds: ['usbif-power-delivery'],
    notiz: 'Modellfall für die Rubrik: Kaufkriterien statt Produktempfehlung. Funktioniert mit und ohne Partnerlink unverändert.',
  },
  {
    id: 'reparatur-anspruch',
    rubrik: 'kaufen',
    winkelart: 'uebersehenerPunkt',
    reifegrad: 'skizze',
    kernfrage: 'Habe ich ein Recht darauf, dass mein Gerät repariert wird?',
    entwarnung: 'Für eine wachsende Zahl von Geräten: ja.',
    sache:
      'Die EU-Richtlinie zum Recht auf Reparatur verpflichtet Hersteller bestimmter Produktgruppen zur Reparatur und zur Bereitstellung von Ersatzteilen.',
    titelmuster: 'zweisatz',
    vertiefung: 'grenzfall',
    system: 'ohne',
    belegpfad: [
      { instanz: 'EU-Richtlinie zum Recht auf Reparatur (2024/1799)', art: 'behoerde', findet: 'betroffene Produktgruppen, Pflichten, Umsetzungsfrist' },
    ],
    quellenIds: [],
    notiz: 'Der Grenzfall ist Pflicht: Die Richtlinie gilt nicht für alles, und die Umsetzungsfrist läuft noch. Ohne das wäre die Entwarnung zu weit.',
  },
  {
    id: 'monitor-pixelfehler',
    rubrik: 'kaufen',
    winkelart: 'haken',
    reifegrad: 'skizze',
    kernfrage: 'Ein Pixelfehler im neuen Monitor — ist das ein Mangel?',
    entwarnung: 'Es kommt auf die Zahl an, und die ist genormt.',
    sache:
      'Für Pixelfehler bestehen genormte Fehlerklassen mit zulässigen Höchstzahlen je Fehlerart; darüber liegt ein Sachmangel nahe.',
    titelmuster: 'uhr',
    system: 'ohne',
    belegpfad: [
      { instanz: 'ISO 9241-307 bzw. Nachfolgenorm', art: 'standard', findet: 'Pixelfehlerklassen und zulässige Höchstzahlen' },
      { instanz: '§ 434 BGB', art: 'behoerde', findet: 'übliche Beschaffenheit als Maßstab' },
    ],
    quellenIds: [],
    notiz: 'Prüfen, ob die ISO-Norm frei zitierbar ist. Falls nicht, trägt die Aussage über die übliche Beschaffenheit nach BGB allein — dann wird das Video kürzer und rechtlicher.',
  },
  {
    id: 'kabel-kaufen-kriterien',
    rubrik: 'kaufen',
    winkelart: 'kaufberatung',
    reifegrad: 'skizze',
    kernfrage: 'Woran erkenne ich beim Kauf, was ein Kabel wirklich kann?',
    entwarnung: 'An zwei Angaben, beide vorgeschrieben.',
    sache:
      'Der Standard verlangt eine Kennzeichnung der Leistungsklasse; zwischen den festgelegten Klassen gibt es nichts.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'USB Implementers Forum', art: 'standard', findet: 'Kennzeichnungspflicht und zulässige Leistungsklassen' },
    ],
    quellenIds: ['usbif-kabel-kennzeichnung'],
    notiz: 'Überschneidet sich mit `kabel-watt` (Schreibtisch) und `kabel-am-flughafen-gekauft` (Unterwegs). Drei Rubriken, ein Sachverhalt — höchstens zwei davon bauen, sonst wiederholt sich der Kanal.',
  },
  {
    id: 'ersatzteile-verfuegbarkeit',
    rubrik: 'kaufen',
    winkelart: 'kompromiss',
    reifegrad: 'skizze',
    kernfrage: 'Wie lange bekomme ich für ein Gerät noch Ersatzteile?',
    entwarnung: 'Für viele Gerätearten ist die Dauer vorgeschrieben.',
    sache:
      'Die Ökodesign-Verordnungen legen für einzelne Produktgruppen fest, wie lange Ersatzteile verfügbar sein müssen und in welcher Frist sie zu liefern sind.',
    titelmuster: 'uhr',
    vertiefung: 'folgekosten',
    system: 'ohne',
    belegpfad: [
      { instanz: 'EU-Ökodesign-Verordnungen (produktgruppenweise)', art: 'behoerde', findet: 'Mindestzeiträume für Ersatzteilverfügbarkeit und Lieferfristen' },
    ],
    quellenIds: [],
  },
  {
    id: 'widerruf-geoeffnet',
    rubrik: 'kaufen',
    winkelart: 'haken',
    reifegrad: 'skizze',
    kernfrage: 'Darf ich das Gerät auspacken und trotzdem widerrufen?',
    entwarnung: 'Ausprobieren darfst du.',
    sache:
      'Zulässig ist die Prüfung, die auch im Ladengeschäft möglich wäre; für einen darüber hinausgehenden Wertverlust kann Ersatz verlangt werden.',
    titelmuster: 'zweisatz',
    vertiefung: 'grenzfall',
    system: 'ohne',
    belegpfad: [
      { instanz: '§ 357a BGB', art: 'behoerde', findet: 'Wertersatz bei über die Prüfung hinausgehender Nutzung' },
      { instanz: 'Bundesgerichtshof', art: 'rechtsprechung', findet: 'Auslegung der zulässigen Prüfung' },
    ],
    quellenIds: [],
    notiz: 'Zweite Idee, die `rechtsprechung` braucht. Die Abgrenzung „wie im Laden" stammt aus der Rechtsprechung, nicht aus dem Gesetzeswortlaut.',
  },
];
