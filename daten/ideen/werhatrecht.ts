import type { Idee } from '../../src/typen';

/**
 * Wer hat recht? — das teuerste Material des Kanals.
 *
 * Ein Streitfall braucht drei Dinge gleichzeitig: zwei Lager, die es wirklich
 * gibt, ein Drittes, das **beide** uebersehen, und einen Beleg dafuer.
 *
 * Was beim Nachfuellen geholfen hat: **Streitfaelle sitzen dort, wo eine
 * Behoerde ihre eigene alte Empfehlung zurueckgezogen hat** — dann gibt es die
 * zwei Lager von selbst, und das Dritte ist ein Dokument, das keiner von
 * beiden gelesen hat.
 *
 * Pruefstein gegen `eswareinmal`: Lautet die Aufloesung „Lager A hat recht,
 * B irrt", ist es ein **Maerchen**. Hier muessen beide danebenliegen.
 *
 * Das einzige Format, das nicht auf einer Pointe endet, sondern auf einer
 * Restfrage — sonst gibt es nichts zu kommentieren, und Kommentare sind bei
 * Shorts ein Verteilungssignal.
 *
 * Der Streitfall selbst gehoert wie das Maerchen in den Aufschlag: Was zwei
 * Lager behaupten, ist keine Aussage ueber die Welt. Die Zuspitzung darunter
 * muss eine sein.
 */
export const werhatrechtIdeen: Idee[] = [
  /*
   * **Der dreizehnte Bogen — aus einem Zuschauereinwand, 04.09.2026.** Zum
   * Passwort-Video kam der Hinweis, die BSI-Empfehlung koenne nach hinten
   * losgehen, wenn niemand von einem Leck erfaehrt: Wer nur bei Verdacht
   * wechselt und nie einen Verdacht bekommt, wechselt nie.
   *
   * **Das ist bei `werhatrecht` genau das Dritte** — und der Einwand kam von
   * aussen, nicht aus dem Ideenvorrat. Sein Beispiel war Firmen-IT; fuer 18-
   * bis 30-Jaehrige ist das Gegenstueck der Leakchecker, den das BSI selbst
   * verlinkt. **Eine Handlung darf daraus nicht werden**, sonst kippt der Kanal
   * ins Hilfevideo: Der Hinweis gehoert unter das Video, nicht in den Mund
   * einer Figur.
   */
  {
    id: "wechseln-ohne-verdacht",
    format: "werhatrecht",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt:
      "Passwort nur bei Verdacht wechseln — die einen halten das für vernünftig, die anderen für gefährlich.",
    dreh: "Beide setzen voraus, dass ein Verdacht entsteht. Wer nie erfährt, dass seine Adresse in einem Leck steht, hat nie einen.",
    sache: "Woher der Verdacht kommen soll: Das BSI verweist selbst auf zwei Leakchecker, die eine Adresse gegen bekannte Lecks prüfen.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Verweis auf Leakchecker im Cybersicherheits-Lotsen",
      },
      {
        instanz: "Hasso-Plattner-Institut",
        art: "wissenschaft",
        findet: "Identity Leak Checker",
      },
    ],
    quellenIds: [],
  },

  /*
   * **Vier Ideen aus einer Fundgrube, gefunden am 06.09.2026.** Das BSI führt
   * vier Seiten „Sicherheits-Irrtümer" — Internet, Mobil, Computer und
   * E-Mail —, auf denen eine Behörde verbreitete Annahmen aufzählt und
   * widerlegt. **Das ist genau die Bauart, die diesem Format fehlt:** zwei
   * Lager gibt es von selbst, sobald ein Irrtum weit genug verbreitet ist, und
   * das Dritte steht in der Antwort darunter.
   *
   * Der Prüfstein bleibt: Lautet die Auflösung „Lager A hat recht", ist es ein
   * Märchen. Die vier hier taugen, weil die BSI-Antwort jeweils **„nur
   * teilweise"** heißt.
   */
  {
    id: "wlan-mitlesen",
    format: "werhatrecht",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt:
      "Öffentliches WLAN: Die einen rühren es nicht an, die anderen sagen, heute sei ohnehin alles verschlüsselt.",
    dreh: "Das BSI antwortet weder ja noch nein: „Das stimmt leider nur teilweise.“ Unverschlüsselt ist die Funkstrecke zum Router — nicht die Seite, die man ansteuert.",
    sache: "Was das Gerät nach dem Trennen tut: Der Hotspot bleibt in der Liste der bevorzugten Netze und wird später von selbst wieder gewählt.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Sicherheits-Irrtümer: Mobile Sicherheit, Irrtum 2",
      },
    ],
    quellenIds: ["bsi-irrtuemer-mobil"],
  },
  {
    id: "ein-langes-passwort",
    format: "werhatrecht",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt:
      "Ein richtig langes Passwort für alles — die einen halten das für sicher genug, die anderen für fahrlässig.",
    dreh: "Das BSI führt es als Irrtum: Die Länge trägt, die Wiederverwendung nicht. Ein Leck bei einem Dienst öffnet alle anderen.",
    sache: "Warum ein Passwortmanager die Antwort auf beide Lager ist, ohne dass jemand sich etwas merken muss.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Sicherheits-Irrtümer: Internet-Sicherheit, Irrtum 3",
      },
    ],
    quellenIds: [],
  },
  {
    id: "nichts-zu-verbergen",
    format: "werhatrecht",
    sachgebiet: "rechner",
    reifegrad: "produziert",
    erzaehlt:
      "„Ich habe nichts zu verbergen“ — die einen sagen, dann ist auch nichts zu holen, die anderen halten es für naiv.",
    dreh: "Das BSI listet es als Irrtum: Angegriffen wird nicht der Inhalt, sondern die Rechenleistung, die Kontakte und der Zugang.",
    sache: "Wozu ein Gerät ohne interessante Daten trotzdem taugt.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Sicherheits-Irrtümer: Computer-Sicherheit, Irrtum 2",
      },
    ],
    quellenIds: ["bsi-irrtuemer-computer"],
  },
  {
    id: "cloud-statt-backup",
    format: "werhatrecht",
    sachgebiet: "rechner",
    reifegrad: "skizze",
    erzaehlt:
      "Alles liegt in der Cloud — die einen sagen, damit ist gesichert, die anderen misstrauen ihr grundsätzlich.",
    dreh: "Das BSI hält beiden dasselbe entgegen: Eine Synchronisation ist keine Sicherung. Was gelöscht wird, ist überall gelöscht.",
    sache: "Der Unterschied zwischen Synchronisieren und Sichern, an einem gelöschten Ordner erklärt.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Sicherheits-Irrtümer: Computer-Sicherheit, Irrtum 3",
      },
    ],
    quellenIds: [],
  },

  {
    id: "wlan-abendliche-verlangsamung",
    format: "werhatrecht",
    sachgebiet: "netz",
    reifegrad: "produziert",
    erzaehlt: "Abends wird das WLAN langsam. Die einen beschuldigen den Router, die anderen den Anbieter.",
    dreh: "Beide übersehen dasselbe: Das Band ist rechtlich schutzlos, niemand garantiert dort irgendetwas.",
    sache: "Allgemeinzuteilung der Bundesnetzagentur: kein Schutz vor Beeinträchtigungen, keine Gewähr für Mindestqualität.",
    belegpfad: [
      {
        instanz: "Bundesnetzagentur",
        art: "behoerde",
        findet: "Allgemeinzuteilung 2,4 GHz",
      },
    ],
    quellenIds: [
      "bnetza-wlan-24ghz-allgemeinzuteilung",
    ],
  },
  {
    id: "nachts-laden",
    format: "werhatrecht",
    sachgebiet: "laden",
    reifegrad: "belegt",
    erzaehlt: "Handy über Nacht laden: Die einen sagen, das killt den Akku, die anderen lachen darüber.",
    dreh: "Beide haben halb recht, und der Grund liegt woanders — nicht am Ladestand, sondern an Spannung und Wärme.",
    sache: "Zeit bei hoher Ladeschlussspannung altert die Zelle; die Ladeelektronik schaltet zwar ab, hält aber oben.",
    belegpfad: [
      {
        instanz: "Umweltbundesamt",
        art: "behoerde",
        findet: "Empfehlungen zu Ladestand und Wärme",
      },
      {
        instanz: "Batterieforschung",
        art: "standard",
        findet: "Alterung bei hoher Ladeschlussspannung",
      },
    ],
    quellenIds: ["uba-akku-laden"],
    notiz: "Vorsicht vor der Überschneidung mit dem Dienstagsthema „leer laufen lassen\". Hier streiten zwei Lager.",
  },
  {
    id: "megapixel-streit",
    format: "werhatrecht",
    sachgebiet: "handy",
    reifegrad: "skizze",
    erzaehlt: "Mehr Megapixel, bessere Fotos — dagegen die, die auf die Sensorgröße zeigen. Entschieden wird es von keinem der beiden.",
    dreh: "Beide messen die Kamera an einer einzigen Zahl. Die dritte Größe steht in keinem Datenblatt vorne.",
    sache: "Pixelgröße und Lichtausbeute; die Rechenkette hinter dem Sensor entscheidet mit.",
    belegpfad: [
      {
        instanz: "Physikalisch-Technische Bundesanstalt",
        art: "behoerde",
        findet: "Grundlagen zu Sensorfläche und Lichtausbeute",
      },
      {
        instanz: "ISO",
        art: "standard",
        findet: "Messverfahren für Bildqualität",
      },
    ],
    quellenIds: [],
  },
  {
    id: "inkognito-modus",
    format: "werhatrecht",
    sachgebiet: "netz",
    reifegrad: "produziert",
    erzaehlt: "Privater Modus im Browser: Die einen halten ihn für eine Tarnkappe, die anderen für ein Placebo.",
    dreh: "Beide irren in dieselbe Richtung — sie reden über „sichtbar\", ohne zu sagen, für wen.",
    sache: "Was lokal nicht gespeichert wird, gegen das, was Arbeitgeber, Anbieter und Zielseite trotzdem sehen.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Hinweise zum privaten Surfmodus und seinen Grenzen",
      },
      {
        instanz: "Datenschutzaufsichtsbehörde",
        art: "behoerde",
        findet: "Aufklärung zu Tracking trotz privatem Modus",
      },
    ],
    quellenIds: ["bsi-fingerprints"],
  },
  {
    id: "reis-im-handy",
    format: "werhatrecht",
    sachgebiet: "handy",
    reifegrad: "skizze",
    erzaehlt: "Nasses Handy in Reis. Millionen machen es, und die Hersteller raten ausdrücklich davon ab.",
    dreh: "Der Streit läuft zwischen Erfahrung und Handbuch. Übersehen haben beide, was Reis physikalisch überhaupt tut.",
    sache: "Trocknungswirkung von Reis gegen Stärkestaub in den Öffnungen.",
    belegpfad: [
      {
        instanz: "Materialprüfanstalt",
        art: "standard",
        findet: "Trocknungsverhalten und Restfeuchte",
      },
      {
        instanz: "Hersteller",
        art: "hersteller",
        findet: "Anleitung zur Behandlung von Feuchtigkeitsschäden",
      },
    ],
    quellenIds: [],
    notiz: "Der Sendeplatz verbietet Handlungsanweisungen. Also nicht „mach stattdessen X\", sondern die Restfrage.",
  },
  {
    id: "passwort-wechseln",
    format: "werhatrecht",
    sachgebiet: "netz",
    reifegrad: "produziert",
    erzaehlt: "Passwörter regelmäßig wechseln: Die IT-Abteilung besteht darauf, im Internet lachen alle darüber.",
    dreh: "Beide streiten über eine Regel, die die Behörde, von der sie stammt, selbst zurückgezogen hat.",
    sache: "Das BSI hat die Empfehlung zum regelmäßigen Passwortwechsel aus dem Grundschutz entfernt.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "IT-Grundschutz ORP.4, Wegfall der Wechselempfehlung",
      },
    ],
    quellenIds: [],
    notiz: "Der stärkste Streitfall im Vorrat: Es gibt zwei echte Lager, und das Dritte ist ein Dokument, das beide nicht gelesen haben. Genau die Bauform, die dieser Sendeplatz braucht.",
  },
  {
    id: "virenprogramm-noetig",
    format: "werhatrecht",
    sachgebiet: "rechner",
    reifegrad: "belegt",
    erzaehlt: "Braucht man noch ein Virenprogramm? Die einen kaufen jedes Jahr eins, die anderen halten es für Geldschneiderei.",
    dreh: "Beide reden über Software. Der Weg, über den heute etwas hereinkommt, ist keine Datei.",
    sache: "Empfehlung der Behörde zum mitgelieferten Schutz und zur Rolle von Phishing gegenüber Dateiviren.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Empfehlung zu Virenschutz für Privatanwender",
      },
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Lagebericht zur IT-Sicherheit, Verteilung der Angriffswege",
      },
    ],
    quellenIds: ["bsi-virenschutz"],
  },
  {
    id: "oeffentliches-wlan",
    format: "werhatrecht",
    sachgebiet: "netz",
    reifegrad: "belegt",
    erzaehlt: "Öffentliches WLAN: Die einen rühren es nicht an, die anderen sagen, heute sei ohnehin alles verschlüsselt.",
    dreh: "Beide streiten über das Mitlesen. Das Risiko ist längst woandershin gewandert.",
    sache: "Wo die Verschlüsselung heute greift und was sie nicht abdeckt — Namensauflösung, Zertifikate, Sichtbarkeit im Netz.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Hinweise zur Nutzung öffentlicher WLAN-Netze",
      },
    ],
    quellenIds: ["bsi-oeffentliches-wlan"],
  },
  {
    id: "cookie-banner-ablehnen",
    format: "werhatrecht",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt: "Cookie-Banner ablehnen: Die einen klicken gewissenhaft, die anderen sagen, das ändere sowieso nichts.",
    dreh: "Beide reden über Cookies. Was gemessen wird, hängt an etwas anderem.",
    sache: "Was ein Widerspruch rechtlich auslösen muss und was Aufsichtsbehörden bei Prüfungen tatsächlich vorfinden.",
    belegpfad: [
      {
        instanz: "Datenschutzkonferenz",
        art: "behoerde",
        findet: "Beschluss zu Einwilligungsbannern",
      },
      {
        instanz: "Datenschutzaufsichtsbehörde",
        art: "behoerde",
        findet: "Prüfbericht zur Umsetzung von Ablehnungen",
      },
    ],
    quellenIds: [],
    notiz: "Kommentarträchtigstes Thema des Vorrats — und deshalb dasjenige, bei dem der Beleg sitzen muss.",
  },
  {
    id: "fremdes-ladekabel",
    format: "werhatrecht",
    sachgebiet: "laden",
    reifegrad: "skizze",
    erzaehlt: "Fremde Ladekabel: Die einen schwören auf das Original, die anderen kaufen das Dreierpack.",
    dreh: "Beide streiten über die Marke. Entschieden wird es von etwas, das auf keiner Packung groß draufsteht.",
    sache: "Der Chip im Stecker und die Leistungsklasse entscheiden, nicht der Aufdruck auf der Verpackung.",
    belegpfad: [
      {
        instanz: "USB Implementers Forum",
        art: "standard",
        findet: "E-Marker-Pflicht und Kabelklassen",
      },
    ],
    quellenIds: [],
    notiz: "Achtung Abgrenzung zum Mittwoch: Dort geht es um die Norm, hier um zwei Lager im Freundeskreis.",
  },
];
