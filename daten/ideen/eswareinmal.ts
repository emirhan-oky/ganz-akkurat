import type { Idee } from '../../src/typen';

/**
 * Es war einmal — Regeln, die einmal richtig waren.
 *
 * Der Pruefstein ist streng und rettet das Format vor `werhatrecht`: Die
 * Aufloesung muss „frueher stimmte es, heute nicht" lauten. Sobald **beide**
 * Seiten etwas uebersehen, ist es ein Streitfall.
 *
 * Der zweite Pruefstein ist der Ton: Niemand hat gelogen. Die Pointe trifft
 * die Regel, nie den, der sie weitergegeben hat — er hatte recht, nur eben
 * 1998.
 *
 * Das Maerchen selbst gehoert in den Aufschlag und nur dorthin. Er ist die
 * einzige Position ohne Belegpflicht, und das ist kein Schlupfloch: Er setzt
 * die Erzaehlung, er behauptet nichts. Alles danach laeuft in der Gegenwart.
 */
export const eswareinmalIdeen: Idee[] = [
  /*
   * **Drei Ideen aus den BSI-Irrtümern, 06.09.2026.** Für dieses Format ist
   * nicht die Idee knapp, sondern die **Quelle**: Ein Märchen braucht einen
   * Beleg für das „und heute", und der muss von einer unbeteiligten Instanz
   * kommen. Behörden schreiben über Alltagsmythen nur, wenn der Mythos in ihr
   * Ressort fällt — die vier Seiten „Sicherheits-Irrtümer" des BSI tun genau
   * das.
   */
  {
    id: "papierkorb-leeren",
    format: "eswareinmal",
    sachgebiet: "rechner",
    reifegrad: "skizze",
    erzaehlt:
      "Datei löschen, Papierkorb leeren, weg. So hat man das gelernt, und so stimmt es nicht.",
    dreh: "Gelöscht wird der Verweis, nicht die Datei — und das „und heute“ ist die SSD: Dort hilft mehrfaches Überschreiben nicht mehr zuverlässig.",
    sache: "Was der Papierkorb wirklich entfernt und warum bei Flash-Speicher ein anderer Weg nötig ist.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Sicherheits-Irrtümer: Computer-Sicherheit, Irrtum 4",
      },
    ],
    quellenIds: [],
  },
  {
    id: "ausweis-lesegeraet",
    format: "eswareinmal",
    sachgebiet: "handy",
    reifegrad: "produziert",
    erzaehlt:
      "Für den Online-Ausweis brauchte man ein Kartenlesegerät. Heute steht das NFC-fähige Smartphone gleichberechtigt daneben.",
    dreh: "Der Haken ist nicht das Gerät, sondern die Transport-PIN aus dem Brief, den niemand aufhebt.",
    sache: "Seit 2017 wird jeder Ausweis mit aktivierter Online-Ausweisfunktion ausgegeben — aktiviert heißt aber nicht nutzbar.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "FAQ Online-Ausweisfunktion",
      },
    ],
    quellenIds: ["bsi-online-ausweisfunktion"],
  },
  {
    id: "drei-g-abgeschaltet",
    format: "eswareinmal",
    sachgebiet: "netz",
    reifegrad: "produziert",
    erzaehlt:
      "Wer kein Netz hat, wartet darauf, dass es auf 3G zurückfällt. Diese Rückfallebene gibt es seit 2021 nicht mehr.",
    dreh: "Die Zahl steht falsch herum im Kopf: Mit 2G erreicht jeder einzelne Netzbetreiber über 99 % der Fläche — und genau dieses Netz soll 2028 abgeschaltet werden.",
    sache: "Abschaltung der 3G-Netze 2021, angekündigte 2G-Abschaltung 2028, Flächenversorgung je Technologie.",
    belegpfad: [
      {
        instanz: "Bundesnetzagentur",
        art: "behoerde",
        findet: "Abschaltung der 2G-Mobilfunknetze in Deutschland",
      },
    ],
    quellenIds: ["bnetza-2g-abschaltung"],
  },
  {
    id: "virus-merkt-man",
    format: "eswareinmal",
    sachgebiet: "rechner",
    reifegrad: "produziert",
    erzaehlt:
      "Früher merkte man einen Virus: Der Rechner wurde langsam, Fenster gingen auf, irgendwas blinkte.",
    dreh: "Das „und heute“: Wer entdeckt wird, verdient nichts. Schadprogramme sind darauf gebaut, unauffällig zu bleiben.",
    sache: "Warum die Auffälligkeit von damals ein Geschäftsmodell hatte und das heutige das Gegenteil verlangt.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Sicherheits-Irrtümer: Computer-Sicherheit, Irrtum 1",
      },
    ],
    quellenIds: ["bsi-irrtuemer-computer"],
  },
  {
    id: "firewall-reicht",
    format: "eswareinmal",
    sachgebiet: "rechner",
    reifegrad: "produziert",
    erzaehlt:
      "Die Firewall war einmal die Antwort auf die Frage, wie man sich schützt.",
    dreh: "Das „und heute“: Sie prüft, was von außen anklopft — geholt wird die Schadsoftware heute vom Nutzer selbst, durch eine Seite oder einen Anhang.",
    sache: "Was eine Firewall abdeckt und wo der Weg heute stattdessen hineinführt.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Sicherheits-Irrtümer: Internet-Sicherheit, Irrtum 1",
      },
    ],
    quellenIds: ["bsi-irrtuemer-internet"],
  },

  {
    id: "akku-tiefentladung",
    format: "eswareinmal",
    sachgebiet: "laden",
    reifegrad: "produziert",
    erzaehlt: "Den Akku erst ganz leer laufen lassen war richtig — bei den Akkus deiner Eltern.",
    dreh: "Märchenform. Der Memory-Effekt gab es wirklich, nur nicht mehr in diesem Gerät.",
    sache: "Das Umweltbundesamt empfiehlt ausdrücklich, nicht bis 0 % zu warten.",
    belegpfad: [
      {
        instanz: "Umweltbundesamt",
        art: "behoerde",
        findet: "Empfehlung zum Ladeverhalten",
      },
    ],
    quellenIds: [
      "uba-akku-laden",
    ],
  },
  {
    id: "sicher-entfernen",
    format: "eswareinmal",
    sachgebiet: "rechner",
    reifegrad: "skizze",
    erzaehlt: "Den USB-Stick sicher entfernen war einmal überlebenswichtig. Heute macht das System es selbst.",
    dreh: "Das Ritual überlebt die Notwendigkeit. Jeder klickt es, keiner weiß warum.",
    sache: "Der Schreibcache ist bei Wechselmedien standardmäßig abgeschaltet — seit wann und wo dokumentiert?",
    belegpfad: [
      {
        instanz: "Microsoft",
        art: "hersteller",
        findet: "Voreinstellung „Schnelles Entfernen\"",
      },
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Hinweise zum Umgang mit Wechseldatenträgern",
      },
    ],
    quellenIds: [],
    notiz: "Gelber Punkt: Ob das System es „meistens schon selbst\" macht, muss belegt werden, nicht behauptet.",
  },
  {
    id: "defragmentieren",
    format: "eswareinmal",
    sachgebiet: "rechner",
    reifegrad: "skizze",
    erzaehlt: "Defragmentieren half, solange sich im Rechner etwas gedreht hat. Bei einer SSD schadet es.",
    dreh: "Die Regel hing an einem beweglichen Teil. Das Teil ist weg, die Regel geblieben.",
    sache: "Flash-Speicher hat begrenzte Schreibzyklen; Defragmentieren erzeugt Schreibvorgänge ohne Nutzen.",
    belegpfad: [
      {
        instanz: "JEDEC",
        art: "standard",
        findet: "Ausdauerangaben für Flash-Speicher",
      },
      {
        instanz: "Microsoft",
        art: "hersteller",
        findet: "Warum Windows SSDs nicht defragmentiert",
      },
    ],
    quellenIds: [],
  },
  {
    id: "bildschirmschoner",
    format: "eswareinmal",
    sachgebiet: "bildschirm",
    reifegrad: "produziert",
    erzaehlt: "Der Bildschirmschoner hat wirklich den Bildschirm geschont. Bei Röhren.",
    dreh: "Der Name ist das Fossil. Er beschreibt eine Aufgabe, die es seit zwanzig Jahren nicht gibt.",
    sache: "Phosphor-Einbrennen bei Kathodenstrahlröhren gegen Flüssigkristall ohne Leuchtstoff.",
    belegpfad: [
      {
        instanz: "Physikalisch-Technische Bundesanstalt",
        art: "behoerde",
        findet: "Aufbau und Alterung von Bildröhren",
      },
    ],
    quellenIds: [],
    notiz: "Einschränkung nicht verschweigen: OLED brennt sehr wohl ein. Das ist der Kipppunkt, nicht die Panne.",
  },
  {
    id: "magnete-loeschen",
    format: "eswareinmal",
    sachgebiet: "rechner",
    reifegrad: "skizze",
    erzaehlt: "Magnete konnten Datenträger löschen. Bei allem, was heute im Gerät steckt, passiert nichts.",
    dreh: "Die Angst vor dem Kühlschrankmagneten stammt aus der Diskettenzeit.",
    sache: "Magnetische Speicherung gegen Ladungsspeicherung in Flash-Zellen.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Degaussing als Löschverfahren, Anwendbarkeit je Speichertyp",
      },
    ],
    quellenIds: [],
    notiz: "Der Beleg liegt praktischerweise da, wo das BSI erklärt, warum Degaussing bei SSDs nicht wirkt.",
  },
  {
    id: "apps-schliessen",
    format: "eswareinmal",
    sachgebiet: "handy",
    reifegrad: "skizze",
    erzaehlt: "Programme im Hintergrund wegwischen, um Akku zu sparen, kostet mehr Strom, als es spart.",
    dreh: "Die verbreitetste Handbewegung der Welt macht das Gegenteil von dem, wofür sie gedacht ist.",
    sache: "Ein erneuter Kaltstart braucht mehr Energie als eine eingefrorene App im Speicher.",
    belegpfad: [
      {
        instanz: "Apple",
        art: "hersteller",
        findet: "Entwicklerdokumentation zum App-Lebenszyklus",
      },
      {
        instanz: "Google",
        art: "hersteller",
        findet: "Android-Dokumentation zur Prozessverwaltung",
      },
      {
        instanz: "Umweltbundesamt",
        art: "behoerde",
        findet: "Energieverbrauch mobiler Geräte im Betrieb",
      },
    ],
    quellenIds: [],
    notiz: "Die beiden Herstellerquellen sind hier ausnahmsweise die besseren — es geht um das Verhalten ihres eigenen Betriebssystems. Tragen darf die Aussage trotzdem nur die unbeteiligte Instanz.",
  },
  {
    id: "flugmodus",
    format: "eswareinmal",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt: "Der Flugmodus stammt aus einer Zeit, in der Bordinstrumente empfindlicher waren.",
    dreh: "Er bleibt trotzdem — aber aus einem anderen Grund, als alle denken.",
    sache: "Der heutige Grund liegt am Boden: Ein Telefon in Reiseflughöhe belegt sehr viele Funkzellen zugleich.",
    belegpfad: [
      {
        instanz: "Bundesnetzagentur",
        art: "behoerde",
        findet: "Mobilfunknutzung in Luftfahrzeugen",
      },
      {
        instanz: "EASA",
        art: "behoerde",
        findet: "Regelungen zu tragbaren elektronischen Geräten an Bord",
      },
    ],
    quellenIds: [],
  },
  {
    id: "handy-stoert-flugzeug",
    format: "eswareinmal",
    sachgebiet: "fahren",
    reifegrad: "skizze",
    erzaehlt: "Das Handy im Flugzeug bringt kein Flugzeug zum Absturz. Die Behörde hat es längst freigegeben.",
    dreh: "Der Flugmodus ist geblieben, das Verbot dahinter nicht. Übrig ist die Ansage.",
    sache: "Die europäische Luftsicherheitsbehörde erlaubt die Nutzung seit 2014 unter Auflagen.",
    belegpfad: [
      {
        instanz: "EASA",
        art: "behoerde",
        findet: "Freigabe tragbarer elektronischer Geräte an Bord",
      },
    ],
    quellenIds: [],
    notiz: "Abgrenzen vom schon skizzierten Flugmodus-Thema, sonst ist es dasselbe Video mit anderem Anfang.",
  },
  {
    id: "erstes-laden-zwoelf-stunden",
    format: "eswareinmal",
    sachgebiet: "laden",
    reifegrad: "produziert",
    erzaehlt: "Neue Geräte sollte man beim ersten Mal zwölf Stunden am Stück laden. Sollte man nicht.",
    dreh: "Die Regel stammt aus der Anleitung, die dem Gerät beilag — nur eben einem anderen Gerät.",
    sache: "Heutige Empfehlung ist das Gegenteil: nicht leer werden lassen, nicht dauerhaft voll halten.",
    belegpfad: [
      {
        instanz: "Umweltbundesamt",
        art: "behoerde",
        findet: "Empfehlungen zum Laden von Lithium-Ionen-Akkus",
      },
    ],
    quellenIds: [
      "uba-akku-laden",
    ],
    notiz: "Die Quelle ist geprüft und liegt vor. Der Dienstag hat damit einen zweiten sofort baubaren Eintrag.",
  },
  {
    id: "festplatte-parken",
    format: "eswareinmal",
    sachgebiet: "rechner",
    reifegrad: "skizze",
    erzaehlt: "Vor dem Transport musste man die Schreibköpfe der Festplatte parken. Von Hand.",
    dreh: "Es gab ein Programm dafür, und wer es vergaß, kratzte seine Daten auf.",
    sache: "Automatisches Parken ist heute Teil der Laufwerksspezifikation — und in SSDs gibt es nichts zu parken.",
    belegpfad: [
      {
        instanz: "Normungsgremium für Speicherlaufwerke",
        art: "standard",
        findet: "Automatisches Parken als Bestandteil der Spezifikation",
      },
    ],
    quellenIds: [],
    notiz: "Wenn die Spezifikation kostenpflichtig ist, fällt das Thema — dieselbe Klippe wie bei JEDEC.",
  },
];
