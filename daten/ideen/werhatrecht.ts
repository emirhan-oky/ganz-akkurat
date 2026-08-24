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
    reifegrad: "skizze",
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
    quellenIds: [],
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
    reifegrad: "skizze",
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
    quellenIds: [],
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
    reifegrad: "skizze",
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
    quellenIds: [],
  },
  {
    id: "oeffentliches-wlan",
    format: "werhatrecht",
    sachgebiet: "netz",
    reifegrad: "skizze",
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
    quellenIds: [],
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
