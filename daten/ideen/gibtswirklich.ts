import type { Idee } from '../../src/typen';

/**
 * Das gibt es wirklich — die Sache selbst ist die Pointe.
 *
 * Der staerkste Vorrat des Kanals und die einfachste Machart von allen: Es
 * braucht keine Wendung, die jemand baut. Es reicht, die Sache hinzustellen.
 *
 * Der Pruefstein ist der haerteste: **Klingt es absurd und ist trotzdem
 * dokumentiert?** Faellt die eine Haelfte weg, ist es entweder langweilig oder
 * eine Legende. `MATRIX` stellt dieses Format deshalb ans Ende — es faengt
 * auf, was keine der drei anderen Bedingungen erfuellt, und darf nie zuerst
 * greifen.
 *
 * **Am 20.08.2026 zusammengelegt** mit dem alten Sendeplatz `dubistdumm`. Der
 * war keine Themengruppe, sondern eine Machart: die Schaetzfrage. Sie steht
 * jetzt in `HOOK_MACHARTEN` und laesst sich auf jedes Format legen; seine
 * Zahlen sind hierher gewandert, wo sie immer hingehoert haben.
 *
 * Was der alte Sendeplatz an Wissen mitbringt und was weiter gilt: Eine Zahl
 * taugt nur, wenn die **Fehlschaetzung vorhersagbar** ist — zu klein, zu
 * gross, falsche Groessenordnung. Zwei Bauformen haben sich bewaehrt, die
 * **falsche Groessenordnung** (sechzig Elemente, wo man fuenf vermutet) und
 * die **falsche Einheit**: Auf der Powerbank stehen Milliamperestunden,
 * erlaubt sind Wattstunden. Die zweite ist die bessere, weil der Zuschauer
 * nicht nur danebenliegt, sondern in einer Groesse antwortet, nach der gar
 * nicht gefragt war.
 *
 * Hier landet ausserdem der Zuwachs aus der breiteren Nische: Raumstation,
 * Radioastronomie, Schaltsekunde — kein Geraet, kein Paragraf.
 */
export const gibtswirklichIdeen: Idee[] = [
  {
    id: "stecker-dreizehn-jahre",
    format: "gibtswirklich",
    sachgebiet: "handy",
    reifegrad: "produziert",
    erzaehlt: "Die EU hat dreizehn Jahre gebraucht, bis alle Handys denselben Ladestecker haben.",
    dreh: "Schätzfrage. Fast alle tippen auf drei bis fünf Jahre.",
    sache: "Erste Bemühungen 2009, Richtlinie 2022/2380 macht USB-C verbindlich.",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Erwägungsgründe der Richtlinie 2022/2380",
      },
    ],
    quellenIds: [
      "eu-einheitlicher-ladeanschluss",
    ],
  },
  {
    id: "elemente-im-telefon",
    format: "gibtswirklich",
    sachgebiet: "handy",
    reifegrad: "skizze",
    erzaehlt: "In einem Smartphone stecken rund sechzig verschiedene Elemente des Periodensystems.",
    dreh: "Schätzfrage. Die meisten tippen auf fünf bis zehn — sie denken an Metall, Glas, Plastik.",
    sache: "Zahl und Recyclingquote müssen aus einer Behördenquelle kommen, nicht aus einer Infografik.",
    belegpfad: [
      {
        instanz: "Umweltbundesamt",
        art: "behoerde",
        findet: "Zahl der enthaltenen Metalle und Rückgewinnungsquote",
      },
      {
        instanz: "EU-Rohstoffbericht",
        art: "behoerde",
        findet: "Liste kritischer Rohstoffe in Elektronik",
      },
    ],
    quellenIds: [],
    notiz: "Die UBA-Verbraucherseite nennt keine Zahl („zahlreiche wertvolle Edel- und Sondermetalle\"). Die Zahl steht vermutlich in einer UBA-Studie oder im EU-Rohstoffbericht — vor dem Bauen prüfen.",
  },
  {
    id: "ladeziegel-gegen-apollo",
    format: "gibtswirklich",
    sachgebiet: "laden",
    reifegrad: "skizze",
    erzaehlt: "Dein Ladeziegel hat mehr Rechenleistung als der Computer, der Menschen zum Mond geflogen hat.",
    dreh: "Nicht das Telefon — der Stecker in der Wand. Das ist der Unterschied zum bekannten Vergleich.",
    sache: "Apollo Guidance Computer: Taktfrequenz und Speicher gegen den Controller eines heutigen Netzteils.",
    belegpfad: [
      {
        instanz: "NASA",
        art: "behoerde",
        findet: "Spezifikation des Apollo Guidance Computer",
      },
      {
        instanz: "Halbleiterhersteller",
        art: "hersteller",
        findet: "Datenblatt eines USB-PD-Controllers",
      },
    ],
    quellenIds: [],
    notiz: "Der Reiz hängt daran, dass es der Ladeziegel ist. Beim Telefon kennt den Vergleich jeder.",
  },
  {
    id: "licht-um-die-erde",
    format: "gibtswirklich",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt: "Licht braucht siebenundsechzig Millisekunden einmal um die Erde. Schneller geht keine Verbindung.",
    dreh: "Die Schätzfrage ist die Ping-Untergrenze. Alle tippen zu niedrig, weil Licht „sofort\" ist.",
    sache: "Erdumfang geteilt durch Lichtgeschwindigkeit in Glasfaser, nicht im Vakuum.",
    belegpfad: [
      {
        instanz: "Physikalisch-Technische Bundesanstalt",
        art: "behoerde",
        findet: "Lichtgeschwindigkeit, Brechungsindex Glasfaser",
      },
    ],
    quellenIds: [],
    notiz: "Rechnung selbst führen ist heikel — sie ist keine Messung, aber auch keine zitierbare Aussage.",
  },
  {
    id: "rechenzentrum-kleinstadt",
    format: "gibtswirklich",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt: "Ein einzelnes Rechenzentrum verbraucht so viel Strom wie eine deutsche Kleinstadt.",
    dreh: "Schätzfrage nach Einwohnern, nicht nach Megawatt — Megawatt kann niemand einordnen.",
    sache: "Stromverbrauch eines großen Rechenzentrums gegen den Pro-Kopf-Verbrauch mal Einwohnerzahl.",
    belegpfad: [
      {
        instanz: "Umweltbundesamt",
        art: "behoerde",
        findet: "Stromverbrauch von Rechenzentren in Deutschland",
      },
    ],
    quellenIds: [],
  },
  {
    id: "powerbank-wattstunden",
    format: "gibtswirklich",
    sachgebiet: "laden",
    reifegrad: "belegt",
    erzaehlt: "Wie groß darf die Powerbank im Handgepäck sein? Fast alle nennen eine Zahl in der falschen Einheit.",
    dreh: "Auf der Powerbank steht Milliamperestunden, erlaubt sind Wattstunden. Der Zuschauer schätzt in der falschen Größe.",
    sache: "Luftfahrt-Bundesamt: 100 Wh Nennenergie, darüber Genehmigung, höchstens zwei Ersatzbatterien.",
    belegpfad: [
      {
        instanz: "Luftfahrt-Bundesamt",
        art: "behoerde",
        findet: "Grenzwerte für Lithiumbatterien im Gepäck",
      },
      {
        instanz: "EASA",
        art: "behoerde",
        findet: "Regelungen zu Ersatzbatterien im Handgepäck",
      },
    ],
    quellenIds: [
      "lba-lithiumbatterien",
      "easa-lithium-handgepaeck",
      "faa-lithium-grenzwerte",
    ],
    notiz: "Der einzige Vorrat-Eintrag auf „belegt\": drei geprüfte unbeteiligte Quellen liegen schon in quellen.json. Sofort produzierbar, ohne eine Seite abzurufen.",
  },
  {
    id: "ladezyklen",
    format: "gibtswirklich",
    sachgebiet: "laden",
    reifegrad: "skizze",
    erzaehlt: "Wie viele Ladungen hält ein Handyakku, bevor er spürbar nachlässt? Die meisten schätzen viel zu hoch.",
    dreh: "Die EU schreibt inzwischen eine Untergrenze vor — die Zahl ist also nicht Meinung, sondern Recht.",
    sache: "EU-Batterieverordnung 2023/1542, Mindestzahl an Vollzyklen bei verbleibender Restkapazität.",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Verordnung 2023/1542, Anforderungen an die Zyklenfestigkeit",
      },
    ],
    quellenIds: [],
  },
  {
    id: "ssd-ohne-strom",
    format: "gibtswirklich",
    sachgebiet: "rechner",
    reifegrad: "skizze",
    erzaehlt: "Wie lange hält eine SSD deine Daten, wenn sie in der Schublade liegt und keinen Strom bekommt?",
    dreh: "Alle denken, ein Speicher ohne Strom ist ein Tresor. Die Norm nennt eine Frist in Monaten.",
    sache: "JEDEC gibt eine Mindestaufbewahrungszeit ohne Spannung an — deutlich kürzer als vermutet.",
    belegpfad: [
      {
        instanz: "JEDEC",
        art: "standard",
        findet: "Retention-Anforderungen für Client-SSDs",
      },
    ],
    quellenIds: [],
    notiz: "Vor dem Bauen prüfen, ob die JEDEC-Angabe frei zugänglich ist — Normen sind oft kostenpflichtig. Dieselbe Klippe wie bei den Cat-Normen und beim Panzerglas.",
  },
  {
    id: "usb-neue-klasse",
    format: "gibtswirklich",
    sachgebiet: "laden",
    reifegrad: "skizze",
    erzaehlt: "Es gibt eine neue USB-Geschwindigkeitsklasse, und sie heißt schon wieder anders als die letzte.",
    dreh: "Die Norm ist neu, die Namensgebung bleibt eine Zumutung — das ist der Witz, nicht die Zahl.",
    sache: "Aktuelle Fassung der USB-Spezifikation samt der offiziell empfohlenen Bezeichnung.",
    belegpfad: [
      {
        instanz: "USB Implementers Forum",
        art: "standard",
        findet: "Aktuelle Spezifikation und Namenskonvention",
      },
    ],
    quellenIds: [],
    notiz: "Prüfen, ob das nicht besser als „Das ist Absicht\" läuft. Kriterium: Ist es neu oder ist es Wut?",
  },
  {
    id: "panzerglas-ohne-norm",
    format: "gibtswirklich",
    sachgebiet: "handy",
    reifegrad: "skizze",
    erzaehlt: "Panzerglas heißt Panzerglas, weil es sich gut verkauft. Eine Norm für den Begriff gibt es nicht.",
    dreh: "Der Name ist das Produkt. Geprüft wird gegen nichts, weil es nichts gibt, wogegen man prüfen könnte.",
    sache: "Es existiert keine Norm, die den Begriff für Displayschutz belegt.",
    belegpfad: [
      {
        instanz: "DIN",
        art: "standard",
        findet: "Recherche im Normenverzeichnis, Nachweis der Nichtexistenz",
      },
    ],
    quellenIds: [],
    notiz: "Heikel: Wir behaupten eine Nichtexistenz. Eine leere Trefferliste ist kein Zitat. Vor dem Bauen klären, ob sich das überhaupt belegen lässt — sonst fällt die Idee.",
  },
  {
    id: "kabellos-laden-verlust",
    format: "gibtswirklich",
    sachgebiet: "laden",
    reifegrad: "skizze",
    erzaehlt: "Kabellos laden ist bequem und verheizt rund ein Drittel der Energie.",
    dreh: "Keine Warnung, kein Verzicht — nur die Zahl neben die Bequemlichkeit gestellt.",
    sache: "Wirkungsgrad induktiver Ladung gegenüber Kabelladung.",
    belegpfad: [
      {
        instanz: "Umweltbundesamt",
        art: "behoerde",
        findet: "Energieverluste bei induktiver Ladung",
      },
      {
        instanz: "Wireless Power Consortium",
        art: "standard",
        findet: "Qi-Spezifikation, Wirkungsgradangaben",
      },
    ],
    quellenIds: [],
    notiz: "Kein „lass das lieber\" im Text. Eine Handlung zu verlangen ist auf jedem Sendeplatz verboten.",
  },
  {
    id: "dateien-loeschen",
    format: "gibtswirklich",
    sachgebiet: "rechner",
    reifegrad: "produziert",
    erzaehlt: "Wenn du eine Datei löschst, wird nichts gelöscht — nur der Eintrag im Inhaltsverzeichnis.",
    dreh: "Trifft jeden, der je etwas aus Peinlichkeit gelöscht hat. Setzt kein Technikinteresse voraus.",
    sache: "BSI: Gelöscht werden lediglich die Verweise; der Bereich wird zum Überschreiben freigegeben.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Leitfaden zum endgültigen Löschen von Daten",
      },
    ],
    quellenIds: [
      "bsi-loeschen-verweise",
    ],
  },
  {
    id: "kopierer-geldscheine",
    format: "gibtswirklich",
    sachgebiet: "drucken",
    reifegrad: "skizze",
    erzaehlt: "Kopierer verweigern Geldscheine, und kein Hersteller hat je erklärt, woran sie das erkennen.",
    dreh: "Das Geheimnis ist Teil der Sache. Es gibt keine Auflösung, und das ist die Pointe.",
    sache: "Erkennungssystem in Kopiergeräten; die Funktionsweise wird bewusst nicht offengelegt.",
    belegpfad: [
      {
        instanz: "Deutsche Bundesbank",
        art: "behoerde",
        findet: "Hinweise zum Reproduktionsverbot und zu Sicherheitsmerkmalen",
      },
    ],
    quellenIds: [],
  },
  {
    id: "raumstation-alte-rechner",
    format: "gibtswirklich",
    sachgebiet: "raumfahrt",
    reifegrad: "skizze",
    erzaehlt: "Die Raumstation lief jahrelang mit Notebooks von 2001. Nicht aus Geiz — moderne Chips überleben die Strahlung nicht.",
    dreh: "Die Auflösung dreht die Erwartung um: Alt ist hier die technisch überlegene Wahl.",
    sache: "Strahlungshärte gegen Strukturbreite: Je feiner der Chip, desto anfälliger für Einzelereignisse.",
    belegpfad: [
      {
        instanz: "ESA",
        art: "behoerde",
        findet: "Anforderungen an strahlungsfeste Bordelektronik",
      },
      {
        instanz: "NASA",
        art: "behoerde",
        findet: "Dokumentation zur Rechnerausstattung der Station",
      },
    ],
    quellenIds: [],
  },
  {
    id: "wlan-aus-der-astronomie",
    format: "gibtswirklich",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt: "WLAN kommt aus der Astronomie. Das Verfahren wurde entwickelt, um Signale schwarzer Löcher aus dem Rauschen zu holen.",
    dreh: "Der Umweg ist die Geschichte: Ein gescheitertes Astronomieprojekt steckt in jedem Router.",
    sache: "Patentschrift zur Mehrwegeausbreitung, entstanden in der Radioastronomie.",
    belegpfad: [
      {
        instanz: "Patentamt",
        art: "behoerde",
        findet: "Patentschrift mit Anmelder und Priorität",
      },
      {
        instanz: "CSIRO",
        art: "behoerde",
        findet: "Eigene Darstellung der Entstehung",
      },
    ],
    quellenIds: [],
  },
  {
    id: "ariane-siebenunddreissig-sekunden",
    format: "gibtswirklich",
    sachgebiet: "raumfahrt",
    reifegrad: "skizze",
    erzaehlt: "Eine Rakete ist explodiert, weil eine Zahl nicht in ihr Feld passte. Der Fehler brauchte siebenunddreißig Sekunden.",
    dreh: "Die Zahl macht es: Nicht „ein Softwarefehler\", sondern eine zu große Zahl in einer zu kleinen Variablen.",
    sache: "ESA-Untersuchungsbericht Ariane 501, Überlauf bei der Konvertierung einer Gleitkommazahl.",
    belegpfad: [
      {
        instanz: "ESA",
        art: "behoerde",
        findet: "Bericht der Untersuchungskommission Ariane 501",
      },
    ],
    quellenIds: [],
  },
  {
    id: "kabelknoten-studie",
    format: "gibtswirklich",
    sachgebiet: "rechner",
    reifegrad: "skizze",
    erzaehlt: "Es gibt eine wissenschaftliche Studie darüber, warum Kopfhörerkabel sich in der Tasche verknoten.",
    dreh: "Nicht das Ergebnis ist der Witz, sondern dass jemand das erforscht hat.",
    sache: "Untersuchung zur spontanen Knotenbildung in bewegten Schnüren.",
    belegpfad: [
      {
        instanz: "Fachzeitschrift mit Begutachtung",
        art: "standard",
        findet: "Studie zur spontanen Knotenbildung",
      },
    ],
    quellenIds: [],
    notiz: "Eine begutachtete Studie ist im Enum am ehesten „standard\". Falls das nicht trägt, fällt die Idee — presse ist ausdrücklich nicht eintragbar.",
  },
  {
    id: "qr-code-autoteile",
    format: "gibtswirklich",
    sachgebiet: "rechner",
    reifegrad: "skizze",
    erzaehlt: "Der QR-Code wurde für die Lagerhaltung von Autoteilen erfunden. Das Patent wurde freigegeben — deshalb ist er überall.",
    dreh: "Die Weltverbreitung hängt an einer Verzichtserklärung, nicht an einer Erfindung.",
    sache: "ISO/IEC 18004 normiert den Code; der Patentinhaber hat auf Durchsetzung verzichtet.",
    belegpfad: [
      {
        instanz: "ISO/IEC",
        art: "standard",
        findet: "Norm 18004 mit Angaben zu Schutzrechten",
      },
    ],
    quellenIds: [],
  },
  {
    id: "bluetooth-heisst-blauzahn",
    format: "gibtswirklich",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt: "Bluetooth ist nach einem Wikingerkönig benannt, und das Logo sind seine Initialen in Runen.",
    dreh: "Der Name war als Platzhalter gedacht, bis jemand einen richtigen findet. Es kam nie einer.",
    sache: "Harald Blauzahn einte Dänemark und Norwegen — das Bild für einen Funkstandard, der Geräte eint.",
    belegpfad: [
      {
        instanz: "Bluetooth SIG",
        art: "standard",
        findet: "Herkunft von Name und Logo",
      },
    ],
    quellenIds: [],
    notiz: "Das Gremium ist die zuständige Instanz für die eigene Namensgeschichte — sie behauptet nichts Technisches.",
  },
  {
    id: "schaltsekunde-wird-abgeschafft",
    format: "gibtswirklich",
    sachgebiet: "zeit",
    reifegrad: "skizze",
    erzaehlt: "Es gibt Minuten mit einundsechzig Sekunden. Damit ist bald Schluss — beschlossen ist es schon.",
    dreh: "Nicht die Uhr ist ungenau, sondern die Erde. Sie dreht sich nicht im Takt.",
    sache: "Beschluss der Generalkonferenz für Maß und Gewicht, die Schaltsekunde bis 2035 auslaufen zu lassen.",
    belegpfad: [
      {
        instanz: "Physikalisch-Technische Bundesanstalt",
        art: "behoerde",
        findet: "Erläuterung zur Schaltsekunde und zum Auslaufbeschluss",
      },
      {
        instanz: "BIPM",
        art: "standard",
        findet: "Resolution der Generalkonferenz für Maß und Gewicht",
      },
    ],
    quellenIds: [],
  },
  {
    id: "zeit-endet-2038",
    format: "gibtswirklich",
    sachgebiet: "zeit",
    reifegrad: "skizze",
    erzaehlt: "Für viele Geräte endet die Zeit im Januar 2038. Der Zähler ist dann voll.",
    dreh: "Das Jahr-2000-Problem war Panik ohne Substanz. Dieses hier ist Substanz ohne Panik.",
    sache: "Sekunden seit 1970 in einer vorzeichenbehafteten 32-Bit-Zahl — die Grenze steht im Standard.",
    belegpfad: [
      {
        instanz: "POSIX / IEEE",
        art: "standard",
        findet: "Definition der Epochenzeit und ihres Wertebereichs",
      },
    ],
    quellenIds: [],
    notiz: "Prüfen, ob die POSIX-Definition frei einsehbar ist. Die Open Group stellt Teile offen bereit.",
  },
];

/*
 * Hier stand kurz „Die erste Festplatte wog eine Tonne" (IBM RAMAC 350, 1956).
 * Die Idee ist beim Aufschreiben durchgefallen, und zwar an der eigenen Regel:
 * Der einzige Beleg waere das IBM-Archiv gewesen — der Hersteller selbst, also
 * eine beteiligte Instanz. Das Schema lehnt das ab (`Idee.superRefine`), und
 * es hat recht: Wer keine unbeteiligte Instanz benennen kann, hat kein Thema,
 * sondern eine Vermutung.
 *
 * Sie kommt zurueck, sobald ein Computermuseum oder eine Normungsstelle die
 * Zahlen fuehrt. Notiert bleibt sie hier, damit niemand sie in drei Monaten
 * ein zweites Mal recherchiert.
 */
