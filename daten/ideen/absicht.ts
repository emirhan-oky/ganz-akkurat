import type { Idee } from '../../src/typen';

/**
 * Das ist Absicht — nichts davon ist kaputt.
 *
 * Der Unterschied zur blossen Absurditaet: Hier gibt es **jemanden, der es
 * entschieden hat**. Ohne benennbaren Entscheider ist es ein Thema fuer
 * `gibtswirklich`.
 *
 * **Am 20.08.2026 aus drei Sendeplaetzen zusammengelegt** — `absicht`,
 * `heimlich` und `neu`, dazu der Grossteil von `auchgekauft`. Die alte
 * Abgrenzung lief an der Frage, ob es um den **Bau** oder um den **Betrieb**
 * geht: Der Drucker, der Fremdpatronen sperrt, gegen den Drucker, der den
 * Fuellstand meldet. Die Trennung war sauber und half beim Einsortieren, nur
 * loest sie beim Zuschauer dieselbe Reaktion aus — und sortiert wird nach
 * Reaktion.
 *
 * **Die schaerfste Hausregel des Kanals kommt von `heimlich` mit und gilt
 * jetzt fuer das ganze Format: Es muss in einem Dokument stehen.** „Dein Handy
 * hoert mit" waere die billigste Behauptung der Welt, sie wuerde jedes Mal
 * funktionieren, und genau deshalb ist sie verboten. Der Grund ist nicht
 * Vorsicht, sondern Selbsterhalt: Ein Kanal, der beim Ueberwachungsthema
 * einmal ohne Beleg behauptet, ist danach einer von hunderttausend.
 *
 * **Das Aktuelle ist hier kein eigenes Fach mehr, sondern Zulauf.** Was
 * `npm run neuigkeiten` findet, faellt an, wenn es anfaellt. Die
 * Materialgrenze gilt weiter: Neue **Geraete** sind durch
 * Herstellerankuendigung (beteiligt) und Presse (nicht eintragbar) belegt und
 * fallen aus, ausnahmslos. Neue **Regeln, Normen und Grenzwerte** sind durch
 * Behoerden und Normungsgremien belegt — nur die gehen. Ueber ein neues Handy
 * berichten hunderttausend Kanaele am selben Tag; dass ein Recht auf Reparatur
 * gilt, erzaehlt niemand, weil es niemand liest.
 *
 * **Was aus `auchgekauft` mitkommt**, sind die Marketing-Entscheidungen: das
 * Gaming-Kabel in anderer Farbe, die Garantieverlaengerung auf zwei Jahre, die
 * im Gesetz schon stehen. Was dort verloren geht, ist der Ton — „der Zuschauer
 * sieht sein eigenes Regal", mit dem Sprecher mitgemeint. Diese Wirkung war
 * die Vorarbeit fuer die `empfehlung` und muss spaeter anders erarbeitet
 * werden.
 */
export const absichtIdeen: Idee[] = [
  {
    id: "ersatzteile-vorhalten",
    format: "absicht",
    sachgebiet: "recht",
    reifegrad: "skizze",
    erzaehlt: "Wie lange muss ein Hersteller Ersatzteile für dein Gerät vorhalten? Länger, als du glaubst.",
    dreh: "Die Schätzfrage dreht die übliche Richtung um: Hier liegt der Zuschauer zu niedrig, nicht zu hoch.",
    sache: "Ökodesign-Vorgaben nennen für einzelne Produktgruppen konkrete Fristen in Jahren.",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Ökodesign-Verordnung, Verfügbarkeit von Ersatzteilen",
      },
    ],
    quellenIds: [],
    notiz: "Gute Ergänzung zum Mittwoch (Parts Pairing): dasselbe Rechtsgebiet, entgegengesetzte Stoßrichtung.",
  },
  {
    id: "usb-kabelklassen",
    format: "absicht",
    sachgebiet: "laden",
    reifegrad: "produziert",
    erzaehlt: "Alle USB-C-Kabel sehen gleich aus, obwohl eins vier Mal so viel kann wie das andere.",
    dreh: "Der Entscheider ist ein Gremium, in dem die Hersteller sitzen. Die Kennzeichnung kam Jahre zu spät.",
    sache: "Leistungsklassen 60 W und 240 W bei identischem Steckerbild; Kennzeichnungspflicht erst nachträglich.",
    belegpfad: [
      {
        instanz: "USB Implementers Forum",
        art: "standard",
        findet: "Kabelklassen und Kennzeichnungspflicht",
      },
    ],
    quellenIds: [
      "usbif-kabel-kennzeichnung",
      "usbif-power-delivery",
    ],
  },
  {
    id: "sitzheizung-abo",
    format: "absicht",
    sachgebiet: "fahren",
    reifegrad: "skizze",
    erzaehlt: "Ein Autohersteller wollte die Sitzheizung als Monatsabo verkaufen. Eingebaut war sie schon.",
    dreh: "Bezahlt hätte man nicht für die Heizung, sondern für die Erlaubnis, sie einzuschalten.",
    sache: "Ankündigung 2022 und die spätere Rücknahme — beides muss aus einer nachprüfbaren Quelle kommen.",
    belegpfad: [
      {
        instanz: "Verbraucherschutzbehörde",
        art: "behoerde",
        findet: "Verfahren oder Stellungnahme zu Funktionen auf Abruf",
      },
      {
        instanz: "Hersteller",
        art: "hersteller",
        findet: "Eigene Ankündigung des Abomodells",
      },
    ],
    quellenIds: [],
    notiz: "Der Fall ist über die Presse breit dokumentiert und damit für uns **nicht** eintragbar. Ohne Behörden- oder Herstellerdokument fällt die Idee.",
  },
  {
    id: "parts-pairing",
    format: "absicht",
    sachgebiet: "recht",
    reifegrad: "produziert",
    erzaehlt: "Manche Ersatzteile funktionieren nur, wenn der Hersteller sie freischaltet. Gleiches Teil, tote Software.",
    dreh: "Der Entscheider steht namentlich in einer EU-Richtlinie, weil die EU es ihm gerade verbietet.",
    sache: "Die Reparaturrichtlinie 2024/1799 adressiert das Koppeln von Ersatzteilen ausdrücklich.",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Richtlinie 2024/1799, Erwägungsgründe zum Parts Pairing",
      },
    ],
    quellenIds: [],
    notiz: "EUR-Lex ist seit dem 17.08.2026 wieder maschinell prüfbar — nicht über die Weboberfläche, sondern über Cellar. `quellen-pruefen` leitet CELEX-Adressen selbst dorthin um.",
  },
  {
    id: "akku-wechselbar-2027",
    format: "absicht",
    sachgebiet: "recht",
    reifegrad: "skizze",
    erzaehlt: "Ab 2027 muss der Akku im Handy wieder wechselbar sein. Nicht aus Einsicht, sondern per Verordnung.",
    dreh: "Zwanzig Jahre lang war „fest verbaut\" alternativlos. Jetzt geht es doch, weil es muss.",
    sache: "EU-Batterieverordnung 2023/1542, Anforderungen an die Entnehmbarkeit durch Endnutzer.",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Verordnung 2023/1542, Artikel zur Entnehmbarkeit",
      },
    ],
    quellenIds: [],
  },
  {
    id: "ladegeraet-nicht-im-karton",
    format: "absicht",
    sachgebiet: "laden",
    reifegrad: "skizze",
    erzaehlt: "Das Ladegerät liegt nicht mehr im Karton. Begründet wurde es mit der Umwelt, verkauft wird es einzeln.",
    dreh: "Die Umweltbegründung ist überprüfbar, sobald dasselbe Teil daneben im Regal steht.",
    sache: "Eine Wettbewerbsbehörde hat die Bewerbung dieser Entscheidung beanstandet.",
    belegpfad: [
      {
        instanz: "Wettbewerbsbehörde",
        art: "behoerde",
        findet: "Bußgeldentscheidung zur Bewerbung des Lieferumfangs",
      },
    ],
    quellenIds: [],
  },
  {
    id: "fernseher-quersubventioniert",
    format: "absicht",
    sachgebiet: "bildschirm",
    reifegrad: "skizze",
    erzaehlt: "Fernseher werden billiger, weil die Hersteller nicht mehr am Gerät verdienen, sondern an dir.",
    dreh: "Der Preis im Regal ist kein Preis, sondern eine Anzahlung auf deine Daten.",
    sache: "Erlösanteil aus Werbung und Datendiensten gegenüber dem Hardwareverkauf.",
    belegpfad: [
      {
        instanz: "Datenschutzaufsichtsbehörde",
        art: "behoerde",
        findet: "Prüfbericht zu Datenerhebung bei Smart-TVs",
      },
      {
        instanz: "Hersteller",
        art: "hersteller",
        findet: "Geschäftsbericht, Segmentberichterstattung",
      },
    ],
    quellenIds: [],
  },
  {
    id: "gedrosselte-alte-handys",
    format: "absicht",
    sachgebiet: "handy",
    reifegrad: "skizze",
    erzaehlt: "Ein Hersteller hat alte Telefone per Update langsamer gemacht und es nicht dazugesagt.",
    dreh: "Die Drosselung war technisch begründbar. Bestraft wurde nicht sie, sondern das Verschweigen.",
    sache: "Die französische Wettbewerbs- und Verbraucherbehörde hat 2020 ein Bußgeld verhängt.",
    belegpfad: [
      {
        instanz: "DGCCRF (Frankreich)",
        art: "behoerde",
        findet: "Bußgeldbescheid wegen unterlassener Information über die Drosselung",
      },
    ],
    quellenIds: [],
    notiz: "Der Fall ist über die Presse breit dokumentiert und damit für uns nicht eintragbar — die Behörde selbst hat aber eine Mitteilung veröffentlicht. Genau der Weg, für den Presse erlaubt ist: lesen, zur Primärquelle folgen, die Primärquelle zitieren.",
  },
  {
    id: "firmware-sperrt-fremdpatronen",
    format: "absicht",
    sachgebiet: "drucken",
    reifegrad: "skizze",
    erzaehlt: "Ein Firmware-Update kann deinen Drucker über Nacht für fremde Patronen sperren.",
    dreh: "Das Gerät wird nach dem Kauf schlechter, ohne dass jemand es angefasst hat.",
    sache: "Die Reparaturrichtlinie verbietet Softwaretechniken, die Reparatur behindern — hier ist zu prüfen, ob Verbrauchsmaterial darunter fällt.",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Richtlinie 2024/1799, Verbot hindernder Softwaretechniken",
      },
    ],
    quellenIds: [
      "eu-recht-auf-reparatur",
    ],
    notiz: "Die Quelle liegt schon geprüft in quellen.json. Vor dem Bauen die Abgrenzung klären: Das Verbot zielt auf Reparatur und Ersatzteile, nicht ausdrücklich auf Tinte. Wenn es nicht trägt, ist das Thema tot — nicht halb.",
  },
  {
    id: "regionalcode",
    format: "absicht",
    sachgebiet: "bildschirm",
    reifegrad: "skizze",
    erzaehlt: "Eine Scheibe aus Amerika läuft in deinem Gerät nicht. Der Kopierschutz ist es nicht.",
    dreh: "Der Regionalcode schützt keine Datei, er teilt die Welt in Verkaufsgebiete.",
    sache: "Die Regionen sind Teil der Spezifikation, nicht eine Eigenheit einzelner Geräte.",
    belegpfad: [
      {
        instanz: "DVD Forum / Normungsgremium",
        art: "standard",
        findet: "Festlegung der Regionalcodes in der Spezifikation",
      },
    ],
    quellenIds: [],
    notiz: "Vor dem Bauen prüfen, ob die Spezifikation frei zugänglich ist — dieselbe Klippe wie bei HDMI und JEDEC.",
  },
  {
    id: "speicher-verloetet",
    format: "absicht",
    sachgebiet: "rechner",
    reifegrad: "skizze",
    erzaehlt: "Der Arbeitsspeicher deines Notebooks ist festgelötet. Aufrüsten ist keine Option mehr.",
    dreh: "Nicht der Speicher ist teuer, sondern die Entscheidung, ihn beim Kauf festzulegen.",
    sache: "Ökodesign-Vorgaben zur Zerlegbarkeit und zur Verfügbarkeit von Ersatzteilen — trägt die Vorgabe das?",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Ökodesign-Verordnung, Anforderungen an Zerlegbarkeit",
      },
    ],
    quellenIds: [],
  },
  {
    id: "recht-auf-reparatur-gilt",
    format: "absicht",
    sachgebiet: "recht",
    reifegrad: "skizze",
    erzaehlt: "Seit Ende Juli hast du ein Recht auf Reparatur. Gesagt hat es dir keiner.",
    dreh: "Kein Ausblick, kein „ab 2027\" — es gilt seit ein paar Wochen, und niemand hat es gemerkt.",
    sache: "Die Reparaturrichtlinie ist in Kraft; entscheidend ist, was sie dem Hersteller konkret abverlangt.",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Richtlinie 2024/1799, Geltungsbeginn und Pflichten",
      },
    ],
    quellenIds: [],
    notiz: "Das aktuellste Thema im ganzen Vorrat und damit der natürliche erste Mittwoch. Vor dem Bauen das genaue Datum und den Umfang aus dem Rechtstext holen — nicht aus einer Meldung über den Rechtstext.",
  },
  {
    id: "mobilfunk-messung-beweis",
    format: "absicht",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt: "Du kannst jetzt amtlich beweisen, dass dein Mobilfunk langsamer ist als im Vertrag.",
    dreh: "Nicht „beschwer dich\", sondern: Es gibt ein festgelegtes Verfahren, und das Ergebnis zählt.",
    sache: "Die Bundesnetzagentur hat ein Messverfahren festgelegt — mehrere Messungen, verteilt über mehrere Tage.",
    belegpfad: [
      {
        instanz: "Bundesnetzagentur",
        art: "behoerde",
        findet: "Festlegung zum Messverfahren Mobilfunk",
      },
    ],
    quellenIds: [],
    notiz: "Grenzfall zur Handlungsaufforderung: Der Sendeplatz darf keine Arbeit verlangen. Also erzählen, dass es das gibt — nicht, wie man es macht. Die Anleitung wäre Hauptvideo-Stoff.",
  },
  {
    id: "batterie-ausnahmen",
    format: "absicht",
    sachgebiet: "recht",
    reifegrad: "skizze",
    erzaehlt: "Der wechselbare Akku kommt — für manche Geräte hat die Kommission die Pflicht gerade wieder gestrichen.",
    dreh: "Die Wendung ist die Rücknahme. Erst die große Ankündigung, dann die Ausnahmeliste.",
    sache: "Ein Rechtsakt der Kommission nimmt einzelne Produktgruppen von den Entnahmeanforderungen aus.",
    belegpfad: [
      {
        instanz: "Europäische Kommission",
        art: "behoerde",
        findet: "Delegierter Rechtsakt mit den Ausnahmen",
      },
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Verordnung 2023/1542, Grundpflicht zur Entnehmbarkeit",
      },
    ],
    quellenIds: [],
    notiz: "Sauber abgrenzen gegen den Mittwoch um 18 Uhr: Dort ginge es um die Absicht dahinter, hier nur darum, dass es passiert ist und wann.",
  },
  {
    id: "batteriepass",
    format: "absicht",
    sachgebiet: "recht",
    reifegrad: "skizze",
    erzaehlt: "Jede größere Batterie bekommt bald einen digitalen Ausweis, den du selbst auslesen kannst.",
    dreh: "Ein Dokument über den Akku in deinem Gerät, das es vorher schlicht nicht gab.",
    sache: "Der Batteriepass nach 2023/1542: welche Angaben er trägt und ab wann.",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Verordnung 2023/1542, Vorgaben zum Batteriepass",
      },
    ],
    quellenIds: [],
  },
  {
    id: "ki-verordnung-gilt",
    format: "absicht",
    sachgebiet: "recht",
    reifegrad: "skizze",
    erzaehlt: "Seit August gelten die meisten Pflichten der KI-Verordnung. Gemerkt hat es fast niemand.",
    dreh: "Der Stichtag liegt hinter uns, nicht vor uns — genau das macht ihn zum Mittwochsthema.",
    sache: "Verordnung 2024/1689, Geltungsbeginn der allgemeinen Pflichten am 2. August 2026.",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Verordnung 2024/1689, Artikel zum Geltungsbeginn",
      },
    ],
    quellenIds: [],
    notiz: "Über Cellar abrufbar wie die Reparaturrichtlinie. Der Geltungsbeginn ist gestaffelt — vor dem Bauen den genau richtigen Absatz zitieren, nicht den bequemsten.",
  },
  {
    id: "meldepflicht-schwachstellen",
    format: "absicht",
    sachgebiet: "recht",
    reifegrad: "skizze",
    erzaehlt: "Ab September müssen Hersteller ausgenutzte Sicherheitslücken binnen 24 Stunden melden.",
    dreh: "Die Frist ist der Aufhänger: 24 Stunden für etwas, das bisher niemand erfahren musste.",
    sache: "Cyber Resilience Act, Verordnung 2024/2847 — Meldepflichten gelten vor den übrigen Pflichten.",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Verordnung 2024/2847, Meldepflichten und ihr Geltungsbeginn",
      },
    ],
    quellenIds: [],
    notiz: "Der Stichtag liegt im September 2026 — der Beobachtungsposten mit dem nächsten Termin.",
  },
  {
    id: "fuenf-jahre-updates",
    format: "absicht",
    sachgebiet: "handy",
    reifegrad: "skizze",
    erzaehlt: "Neue Handys müssen fünf Jahre Sicherheitsupdates bekommen. Das ist keine Kulanz mehr.",
    dreh: "Dazu Ersatzteile für sieben Jahre und ein Energielabel auf dem Karton — auf dem Handykarton.",
    sache: "Ökodesign-Verordnung 2023/1670, anwendbar seit dem 20. Juni 2025.",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Verordnung 2023/1670, Anhang zu Updates und Ersatzteilen",
      },
    ],
    quellenIds: [],
    notiz: "Etwas älter als die anderen Mittwochsthemen, aber immer noch weitgehend unbekannt. Reserve.",
  },
  {
    id: "garantieverlaengerung",
    format: "absicht",
    sachgebiet: "recht",
    reifegrad: "produziert",
    erzaehlt: "Die Garantieverlängerung an der Kasse verkauft dir zwei Jahre, die im Gesetz schon stehen.",
    dreh: "Garantie und Gewährleistung heißen im Laden dasselbe. Davon lebt der Zusatzvertrag.",
    sache: "§ 443 BGB (Garantie, freiwillig) gegen § 438 BGB (Gewährleistung, zwei Jahre, gesetzlich).",
    belegpfad: [
      {
        instanz: "Bundesministerium der Justiz",
        art: "behoerde",
        findet: "§§ 443 und 438 BGB im Volltext",
      },
    ],
    quellenIds: [
      "bgb-443-garantie",
      "bgb-438-verjaehrung",
    ],
  },
  {
    id: "vergoldetes-kabel",
    format: "absicht",
    sachgebiet: "bildschirm",
    reifegrad: "skizze",
    erzaehlt: "Ein vergoldetes Kabel überträgt keine besseren Nullen und Einsen.",
    dreh: "Digital heißt: Es kommt an oder es kommt nicht an. Ein Dazwischen, das Gold verbessern könnte, gibt es nicht.",
    sache: "Fehlerkorrektur und Signalintegrität bei digitaler Übertragung — belegbar über die Schnittstellennorm.",
    belegpfad: [
      {
        instanz: "HDMI Forum",
        art: "standard",
        findet: "Anforderungen an Kabel, Prüfbedingungen",
      },
      {
        instanz: "Verbraucherschutzbehörde",
        art: "behoerde",
        findet: "Beanstandung irreführender Kabelwerbung",
      },
    ],
    quellenIds: [],
    notiz: "Die HDMI-Spezifikation ist kostenpflichtig. Prüfen, ob die frei zugängliche Zusammenfassung reicht.",
  },
  {
    id: "gefaelschter-speicher",
    format: "absicht",
    sachgebiet: "rechner",
    reifegrad: "skizze",
    erzaehlt: "Auf dem Stick steht ein Terabyte, drin ist ein Zwanzigstel. Er meldet dem Rechner eine Größe, die er nicht hat.",
    dreh: "Der Betrug funktioniert, weil der Rechner glaubt, was der Stick sagt.",
    sache: "Manipulierter Controller meldet falsche Kapazität; Daten laufen im Ring über.",
    belegpfad: [
      {
        instanz: "Marktüberwachungsbehörde",
        art: "behoerde",
        findet: "Warnmeldung zu gefälschten Speichermedien",
      },
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Hinweise zur Prüfung von Wechseldatenträgern",
      },
    ],
    quellenIds: [],
  },
  {
    id: "gaming-netzwerkkabel",
    format: "absicht",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt: "Der Aufpreis für „Gaming\" auf einem Netzwerkkabel kauft dir eine andere Farbe.",
    dreh: "Die Kategorie steht auf dem Kabel. Alles andere steht auf der Verpackung.",
    sache: "Cat-Kategorien sind genormt; „Gaming\" ist keine Kategorie.",
    belegpfad: [
      {
        instanz: "ISO/IEC",
        art: "standard",
        findet: "Kategorien für symmetrische Verkabelung",
      },
    ],
    quellenIds: [],
    notiz: "Gleiche Schwierigkeit wie beim Panzerglas: ISO-Normen sind kostenpflichtig.",
  },
  {
    id: "garantiesiegel-nichtig",
    format: "absicht",
    sachgebiet: "recht",
    reifegrad: "skizze",
    erzaehlt: "Auf dem Aufkleber steht, die Garantie erlischt beim Öffnen. Das gilt so nicht.",
    dreh: "Der Aufkleber wirkt, obwohl er nichts kann — er hält Leute davon ab, ihr Recht zu nutzen.",
    sache: "Gesetzliche Mängelhaftung gilt unabhängig vom Siegel; die Garantie ist eine eigene Erklärung.",
    belegpfad: [
      {
        instanz: "Bundesministerium der Justiz",
        art: "behoerde",
        findet: "§§ 443, 476 BGB im Wortlaut",
      },
      {
        instanz: "Rechtsprechung",
        art: "rechtsprechung",
        findet: "Entscheidung zur Unwirksamkeit von Öffnungsklauseln",
      },
    ],
    quellenIds: [
      "bgb-443-garantie",
      "bgb-438-verjaehrung",
    ],
  },
  {
    id: "schnellladegeraet-ohne-protokoll",
    format: "absicht",
    sachgebiet: "laden",
    reifegrad: "skizze",
    erzaehlt: "Auf dem Netzteil steht Schnellladen. Welches Schnellladen, steht nicht drauf.",
    dreh: "Zwei Geräte können beide schnellladen und sich trotzdem nicht einigen.",
    sache: "USB Power Delivery ist das genormte Verfahren; herstellereigene Verfahren stehen daneben.",
    belegpfad: [
      {
        instanz: "USB Implementers Forum",
        art: "standard",
        findet: "Aushandlung der Leistung über Power Delivery",
      },
    ],
    quellenIds: [
      "usbif-power-delivery",
    ],
  },
  {
    id: "speicherkarte-klasse",
    format: "absicht",
    sachgebiet: "rechner",
    reifegrad: "skizze",
    erzaehlt: "Auf der Speicherkarte stehen vier Geschwindigkeitsangaben. Nur eine sagt, was garantiert ist.",
    dreh: "Die große Zahl vorn ist die Spitze im besten Fall. Die kleine im Kreis ist die Untergrenze.",
    sache: "Speed Class, UHS Speed Class und Video Speed Class nennen Mindestwerte, die Werbezahl nicht.",
    belegpfad: [
      {
        instanz: "SD Association",
        art: "standard",
        findet: "Definition der Geschwindigkeitsklassen als Mindestwerte",
      },
    ],
    quellenIds: [],
  },
  {
    id: "handyversicherung",
    format: "absicht",
    sachgebiet: "recht",
    reifegrad: "skizze",
    erzaehlt: "Die Displayversicherung an der Kasse deckt oft genau das ab, was ohnehin gilt.",
    dreh: "Zwillingsthema zur Garantieverlängerung — erst bauen, wenn die genug Abstand hat.",
    sache: "Abgrenzung von Mängelhaftung, Garantie und Versicherung; Selbstbeteiligung als versteckter Preis.",
    belegpfad: [
      {
        instanz: "Bundesministerium der Justiz",
        art: "behoerde",
        findet: "Mängelhaftung im BGB",
      },
      {
        instanz: "BaFin",
        art: "behoerde",
        findet: "Einordnung von Restschuld- und Geräteversicherungen",
      },
    ],
    quellenIds: [
      "bgb-438-verjaehrung",
    ],
  },
  {
    id: "smarttv-sprache",
    format: "absicht",
    sachgebiet: "bildschirm",
    reifegrad: "produziert",
    erzaehlt: "Dein Fernseher kann Sprachbefehle aufzeichnen und leitet sie an einen Cloud-Server weiter.",
    dreh: "Beide Hälften stehen wörtlich beim BSI — dass aufgezeichnet wird und dass es das Haus verlässt.",
    sache: "BSI-Verbraucherseite zu Smart-TV, Abschnitt zu Sprachsteuerung und eingebauten Mikrofonen.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Aufzeichnung von Sprachbefehlen, Weiterleitung an Cloud-Server",
      },
    ],
    quellenIds: [
      "bsi-smarttv-sprachbefehle",
    ],
  },
  {
    id: "drucker-gelbe-punkte",
    format: "absicht",
    sachgebiet: "drucken",
    reifegrad: "skizze",
    erzaehlt: "Dein Drucker setzt auf jede Seite eine Kennung, die zu genau diesem Gerät zurückführt.",
    dreh: "Nicht abschaltbar und vom Hersteller nicht dokumentiert — das steht wörtlich beim BSI.",
    sache: "Das BSI führt die „Yellow Dots\" im IT-Grundschutz: nicht dokumentiert und nicht abschaltbar.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "IT-Grundschutz SYS.4.1, Umsetzungshinweise",
      },
    ],
    quellenIds: [
      "bsi-yellow-dots",
    ],
    notiz: "Am 17.08.2026 belegt. Der Beleg trägt **weniger** als die ursprüngliche Idee: Das BSI schreibt, dass ein Ausdruck „einem konkreten Drucker zugeordnet werden kann\", und nicht, dass Seriennummer und Uhrzeit codiert sind. Das Video darf also nur das Erste behaupten. Der Kipppunkt bleibt trotzdem stark, weil er wörtlich dasteht: nicht dokumentiert und nicht abschaltbar.",
  },
  {
    id: "auto-ereignisspeicher",
    format: "absicht",
    sachgebiet: "fahren",
    reifegrad: "skizze",
    erzaehlt: "Dein Auto schreibt mit, wie schnell du warst und wann du gebremst hast. In Neuwagen ist das Pflicht.",
    dreh: "Nicht der Hersteller hat es eingebaut, sondern der Gesetzgeber verlangt es.",
    sache: "EU-Verordnung 2019/2144, Ereignisbezogenes Datenaufzeichnungssystem, verbindlich seit Juli 2024.",
    belegpfad: [
      {
        instanz: "Europäische Union",
        art: "behoerde",
        findet: "Verordnung 2019/2144, Definitionsartikel",
      },
    ],
    quellenIds: [
      "eu-ereignisdatenspeicher",
    ],
    notiz: "Am 17.08.2026 belegt. Die Verordnung ist enger als die Erzählung: aufgezeichnet wird „kurz vor, während und unmittelbar nach einem Aufprall\", nicht die ganze Fahrt. Wer „dein Auto schreibt mit, wie schnell du warst\" sagt, muss diesen Halbsatz mitliefern — sonst ist es eine Übertreibung, die die eigene Quelle widerlegt.",
  },
  {
    id: "exif-im-foto",
    format: "absicht",
    sachgebiet: "handy",
    reifegrad: "skizze",
    erzaehlt: "In jedem Foto steckt mehr als das Bild: Uhrzeit, Gerät, Objektiv — und oft der Ort auf zehn Meter genau.",
    dreh: "Das Bild ist die kleinere Hälfte der Datei.",
    sache: "EXIF-Felder und ihre Voreinstellungen; Genauigkeit der Ortsangabe.",
    belegpfad: [
      {
        instanz: "BSI",
        art: "behoerde",
        findet: "Hinweise zu Metadaten in Bilddateien",
      },
      {
        instanz: "Datenschutzaufsichtsbehörde",
        art: "behoerde",
        findet: "Merkblatt zu Standortdaten in Fotos",
      },
    ],
    quellenIds: [],
  },
  {
    id: "hbbtv-roter-knopf",
    format: "absicht",
    sachgebiet: "bildschirm",
    reifegrad: "skizze",
    erzaehlt: "Wenn im Fernsehen der rote Knopf erscheint, weiß der Sender schon, dass du eingeschaltet hast.",
    dreh: "Das Angebot ist der Rückkanal. Man muss nichts drücken, damit es funktioniert.",
    sache: "HbbTV baut beim Umschalten eine Verbindung zum Anbieter auf, bevor der Zuschauer etwas tut.",
    belegpfad: [
      {
        instanz: "Landesmedienanstalt",
        art: "behoerde",
        findet: "Verfahren oder Hinweis zur HbbTV-Datenübertragung",
      },
      {
        instanz: "Datenschutzaufsichtsbehörde",
        art: "behoerde",
        findet: "Prüfbericht zu Smart-TV-Rückkanälen",
      },
    ],
    quellenIds: [],
    notiz: "Gelber Punkt: „hat schon erfahren\" muss genau belegt sein — wann genau die Verbindung aufgebaut wird.",
  },
  {
    id: "drucker-meldet-fuellstand",
    format: "absicht",
    sachgebiet: "drucken",
    reifegrad: "skizze",
    erzaehlt: "Der Drucker meldet dem Hersteller, wie voll deine Patrone ist — und wann sie leer sein wird.",
    dreh: "Der Nachbestelldienst ist kein Service, sondern der Grund für die Meldung.",
    sache: "Datenschutzerklärungen zu Nachfülldiensten nennen Füllstand und Prognose ausdrücklich.",
    belegpfad: [
      {
        instanz: "Datenschutzaufsichtsbehörde",
        art: "behoerde",
        findet: "Prüfung von Nachbestelldiensten bei Druckern",
      },
      {
        instanz: "Hersteller",
        art: "hersteller",
        findet: "Datenschutzerklärung des Nachfülldienstes",
      },
    ],
    quellenIds: [],
  },
  {
    id: "auto-sendet-daten",
    format: "absicht",
    sachgebiet: "fahren",
    reifegrad: "skizze",
    erzaehlt: "Dein Auto sendet im Betrieb Daten an den Hersteller — nicht nur beim Unfall.",
    dreh: "Die Abgrenzung zum Ereignisdatenspeicher ist der Punkt: Der schreibt lokal mit, das hier verlässt das Fahrzeug.",
    sache: "Die Leitlinien des Europäischen Datenschutzausschusses zu vernetzten Fahrzeugen beschreiben die Datenflüsse.",
    belegpfad: [
      {
        instanz: "Europäischer Datenschutzausschuss",
        art: "behoerde",
        findet: "Leitlinien 01/2020 zu vernetzten Fahrzeugen",
      },
    ],
    quellenIds: [],
    notiz: "Sauber vom bereits belegten Ereignisdatenspeicher trennen, sonst sind es zwei Videos über dieselbe Sache.",
  },
  {
    id: "saugroboter-karte",
    format: "absicht",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt: "Dein Saugroboter hat einen Grundriss deiner Wohnung angelegt. Er liegt nicht nur bei dir.",
    dreh: "Gekauft wurde ein Staubsauger. Entstanden ist ein Vermessungsgerät.",
    sache: "Kartierung, Speicherort der Karte und Übertragung — was steht dazu in einer amtlichen Handreichung?",
    belegpfad: [
      {
        instanz: "Bundesamt für Sicherheit in der Informationstechnik",
        art: "behoerde",
        findet: "Hinweise zu Smart-Home-Geräten und Kartendaten",
      },
      {
        instanz: "Datenschutzkonferenz",
        art: "behoerde",
        findet: "Orientierungshilfe zu vernetzten Haushaltsgeräten",
      },
    ],
    quellenIds: [],
  },
  {
    id: "handy-sucht-immer",
    format: "absicht",
    sachgebiet: "netz",
    reifegrad: "skizze",
    erzaehlt: "Dein Telefon ruft ständig nach WLAN-Netzen, auch wenn du keins benutzt.",
    dreh: "Diese Rufe sind erkennbar. In Innenstädten wird damit gezählt, wer vorbeigeht.",
    sache: "Probe Requests, MAC-Adressen und die Frage, wie weit die Zufallsvergabe das aufhebt.",
    belegpfad: [
      {
        instanz: "Bundesamt für Sicherheit in der Informationstechnik",
        art: "behoerde",
        findet: "Beschreibung der Ortung über WLAN-Suchanfragen",
      },
      {
        instanz: "Datenschutzaufsicht",
        art: "behoerde",
        findet: "Bewertung von WLAN-Tracking im öffentlichen Raum",
      },
    ],
    quellenIds: [],
  },
  {
    id: "fernseher-erkennt-bild",
    format: "absicht",
    sachgebiet: "bildschirm",
    reifegrad: "skizze",
    erzaehlt: "Dein Fernseher erkennt am Bild selbst, was du gerade siehst — auch bei der Spielkonsole.",
    dreh: "Das läuft unabhängig von der App und damit auch bei Geräten, die gar nichts melden wollen.",
    sache: "Automatische Inhaltserkennung: Bildausschnitte werden abgeglichen, nicht Sendernamen gemeldet.",
    belegpfad: [
      {
        instanz: "Datenschutzkonferenz",
        art: "behoerde",
        findet: "Orientierungshilfe zu Smart-TVs und Inhaltserkennung",
      },
    ],
    quellenIds: [],
    notiz: "Nah am schon produzierten Mikrofon-Short. Nur bauen, wenn die Inhaltserkennung selbst der Kern ist.",
  },
];
