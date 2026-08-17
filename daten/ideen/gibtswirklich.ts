import type { Idee } from '../../src/typen';

/**
 * Samstag · Das gibt es wirklich — die Sache selbst ist die Pointe.
 *
 * Der staerkste Vorrat am staerksten Feed-Tag, und die einfachste Machart von
 * allen: Es braucht keine Wendung, die jemand baut. Es reicht, die Sache
 * hinzustellen.
 *
 * Der Pruefstein ist der haerteste: **Klingt es absurd und ist trotzdem
 * dokumentiert?** Faellt die eine Haelfte weg, ist es entweder langweilig oder
 * eine Legende. `MATRIX` stellt diesen Sendeplatz deshalb ans Ende — er faengt
 * auf, was keine der sechs anderen Bedingungen erfuellt, und darf nie zuerst
 * greifen.
 */
export const gibtswirklichIdeen: Idee[] = [
  {
    id: 'dateien-loeschen',
    format: 'gibtswirklich',
    sachgebiet: 'rechner',
    reifegrad: 'produziert',
    erzaehlt: 'Wenn du eine Datei löschst, wird nichts gelöscht — nur der Eintrag im Inhaltsverzeichnis.',
    dreh: 'Trifft jeden, der je etwas aus Peinlichkeit gelöscht hat. Setzt kein Technikinteresse voraus.',
    sache: 'BSI: Gelöscht werden lediglich die Verweise; der Bereich wird zum Überschreiben freigegeben.',
    belegpfad: [{ instanz: 'BSI', art: 'behoerde', findet: 'Leitfaden zum endgültigen Löschen von Daten' }],
    quellenIds: ['bsi-loeschen-verweise'],
  },
  {
    id: 'kopierer-geldscheine',
    format: 'gibtswirklich',
    sachgebiet: 'drucken',
    reifegrad: 'skizze',
    erzaehlt: 'Kopierer verweigern Geldscheine, und kein Hersteller hat je erklärt, woran sie das erkennen.',
    dreh: 'Das Geheimnis ist Teil der Sache. Es gibt keine Auflösung, und das ist die Pointe.',
    sache: 'Erkennungssystem in Kopiergeräten; die Funktionsweise wird bewusst nicht offengelegt.',
    belegpfad: [
      { instanz: 'Deutsche Bundesbank', art: 'behoerde', findet: 'Hinweise zum Reproduktionsverbot und zu Sicherheitsmerkmalen' },
    ],
    quellenIds: [],
  },
  {
    id: 'raumstation-alte-rechner',
    format: 'gibtswirklich',
    sachgebiet: 'rechner',
    reifegrad: 'skizze',
    erzaehlt: 'Die Raumstation lief jahrelang mit Notebooks von 2001. Nicht aus Geiz — moderne Chips überleben die Strahlung nicht.',
    dreh: 'Die Auflösung dreht die Erwartung um: Alt ist hier die technisch überlegene Wahl.',
    sache: 'Strahlungshärte gegen Strukturbreite: Je feiner der Chip, desto anfälliger für Einzelereignisse.',
    belegpfad: [
      { instanz: 'ESA', art: 'behoerde', findet: 'Anforderungen an strahlungsfeste Bordelektronik' },
      { instanz: 'NASA', art: 'behoerde', findet: 'Dokumentation zur Rechnerausstattung der Station' },
    ],
    quellenIds: [],
  },
  {
    id: 'wlan-aus-der-astronomie',
    format: 'gibtswirklich',
    sachgebiet: 'netz',
    reifegrad: 'skizze',
    erzaehlt: 'WLAN kommt aus der Astronomie. Das Verfahren wurde entwickelt, um Signale schwarzer Löcher aus dem Rauschen zu holen.',
    dreh: 'Der Umweg ist die Geschichte: Ein gescheitertes Astronomieprojekt steckt in jedem Router.',
    sache: 'Patentschrift zur Mehrwegeausbreitung, entstanden in der Radioastronomie.',
    belegpfad: [
      { instanz: 'Patentamt', art: 'behoerde', findet: 'Patentschrift mit Anmelder und Priorität' },
      { instanz: 'CSIRO', art: 'behoerde', findet: 'Eigene Darstellung der Entstehung' },
    ],
    quellenIds: [],
  },
  {
    id: 'ariane-siebenunddreissig-sekunden',
    format: 'gibtswirklich',
    sachgebiet: 'rechner',
    reifegrad: 'skizze',
    erzaehlt: 'Eine Rakete ist explodiert, weil eine Zahl nicht in ihr Feld passte. Der Fehler brauchte siebenunddreißig Sekunden.',
    dreh: 'Die Zahl macht es: Nicht „ein Softwarefehler", sondern eine zu große Zahl in einer zu kleinen Variablen.',
    sache: 'ESA-Untersuchungsbericht Ariane 501, Überlauf bei der Konvertierung einer Gleitkommazahl.',
    belegpfad: [{ instanz: 'ESA', art: 'behoerde', findet: 'Bericht der Untersuchungskommission Ariane 501' }],
    quellenIds: [],
  },
  {
    id: 'kabelknoten-studie',
    format: 'gibtswirklich',
    sachgebiet: 'rechner',
    reifegrad: 'skizze',
    erzaehlt: 'Es gibt eine wissenschaftliche Studie darüber, warum Kopfhörerkabel sich in der Tasche verknoten.',
    dreh: 'Nicht das Ergebnis ist der Witz, sondern dass jemand das erforscht hat.',
    sache: 'Untersuchung zur spontanen Knotenbildung in bewegten Schnüren.',
    belegpfad: [
      { instanz: 'Fachzeitschrift mit Begutachtung', art: 'standard', findet: 'Studie zur spontanen Knotenbildung' },
    ],
    quellenIds: [],
    notiz:
      'Eine begutachtete Studie ist im Enum am ehesten „standard". Falls das nicht trägt, fällt die Idee — ' +
      'presse ist ausdrücklich nicht eintragbar.',
  },
  {
    id: 'qr-code-autoteile',
    format: 'gibtswirklich',
    sachgebiet: 'rechner',
    reifegrad: 'skizze',
    erzaehlt: 'Der QR-Code wurde für die Lagerhaltung von Autoteilen erfunden. Das Patent wurde freigegeben — deshalb ist er überall.',
    dreh: 'Die Weltverbreitung hängt an einer Verzichtserklärung, nicht an einer Erfindung.',
    sache: 'ISO/IEC 18004 normiert den Code; der Patentinhaber hat auf Durchsetzung verzichtet.',
    belegpfad: [
      { instanz: 'ISO/IEC', art: 'standard', findet: 'Norm 18004 mit Angaben zu Schutzrechten' },
    ],
    quellenIds: [],
  },
  {
    id: 'bluetooth-heisst-blauzahn',
    format: 'gibtswirklich',
    sachgebiet: 'netz',
    reifegrad: 'skizze',
    erzaehlt: 'Bluetooth ist nach einem Wikingerkönig benannt, und das Logo sind seine Initialen in Runen.',
    dreh: 'Der Name war als Platzhalter gedacht, bis jemand einen richtigen findet. Es kam nie einer.',
    sache: 'Harald Blauzahn einte Dänemark und Norwegen — das Bild für einen Funkstandard, der Geräte eint.',
    belegpfad: [
      { instanz: 'Bluetooth SIG', art: 'standard', findet: 'Herkunft von Name und Logo' },
    ],
    quellenIds: [],
    notiz: 'Das Gremium ist die zuständige Instanz für die eigene Namensgeschichte — sie behauptet nichts Technisches.',
  },
  {
    id: 'schaltsekunde-wird-abgeschafft',
    format: 'gibtswirklich',
    sachgebiet: 'netz',
    reifegrad: 'skizze',
    erzaehlt: 'Es gibt Minuten mit einundsechzig Sekunden. Damit ist bald Schluss — beschlossen ist es schon.',
    dreh: 'Nicht die Uhr ist ungenau, sondern die Erde. Sie dreht sich nicht im Takt.',
    sache: 'Beschluss der Generalkonferenz für Maß und Gewicht, die Schaltsekunde bis 2035 auslaufen zu lassen.',
    belegpfad: [
      { instanz: 'Physikalisch-Technische Bundesanstalt', art: 'behoerde', findet: 'Erläuterung zur Schaltsekunde und zum Auslaufbeschluss' },
      { instanz: 'BIPM', art: 'standard', findet: 'Resolution der Generalkonferenz für Maß und Gewicht' },
    ],
    quellenIds: [],
  },
  {
    id: 'zeit-endet-2038',
    format: 'gibtswirklich',
    sachgebiet: 'rechner',
    reifegrad: 'skizze',
    erzaehlt: 'Für viele Geräte endet die Zeit im Januar 2038. Der Zähler ist dann voll.',
    dreh: 'Das Jahr-2000-Problem war Panik ohne Substanz. Dieses hier ist Substanz ohne Panik.',
    sache: 'Sekunden seit 1970 in einer vorzeichenbehafteten 32-Bit-Zahl — die Grenze steht im Standard.',
    belegpfad: [
      { instanz: 'POSIX / IEEE', art: 'standard', findet: 'Definition der Epochenzeit und ihres Wertebereichs' },
    ],
    quellenIds: [],
    notiz: 'Prüfen, ob die POSIX-Definition frei einsehbar ist. Die Open Group stellt Teile offen bereit.',
  },
];
