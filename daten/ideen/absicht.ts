import type { Idee } from '../../src/typen';

/**
 * Mittwoch · Das ist Absicht — nichts davon ist kaputt.
 *
 * Der Unterschied zur blossen Absurditaet: Hier gibt es **jemanden, der es
 * entschieden hat**. Ohne benennbaren Entscheider ist es ein Samstagsthema.
 *
 * Die Abgrenzung zum Freitag laeuft an einer einzigen Frage: Geht es darum,
 * wie das Geraet **gebaut** wurde, oder darum, was es im **Betrieb tut**? Der
 * Drucker, der Fremdpatronen sperrt, ist Mittwoch. Der Drucker, der den
 * Fuellstand nach Hause meldet, ist Freitag.
 */
export const absichtIdeen: Idee[] = [
  {
    id: 'usb-kabelklassen',
    format: 'absicht',
    sachgebiet: 'laden',
    reifegrad: 'produziert',
    erzaehlt: 'Alle USB-C-Kabel sehen gleich aus, obwohl eins vier Mal so viel kann wie das andere.',
    dreh: 'Der Entscheider ist ein Gremium, in dem die Hersteller sitzen. Die Kennzeichnung kam Jahre zu spät.',
    sache: 'Leistungsklassen 60 W und 240 W bei identischem Steckerbild; Kennzeichnungspflicht erst nachträglich.',
    belegpfad: [{ instanz: 'USB Implementers Forum', art: 'standard', findet: 'Kabelklassen und Kennzeichnungspflicht' }],
    quellenIds: ['usbif-kabel-kennzeichnung', 'usbif-power-delivery'],
  },
  {
    id: 'sitzheizung-abo',
    format: 'absicht',
    sachgebiet: 'fahren',
    reifegrad: 'skizze',
    erzaehlt: 'Ein Autohersteller wollte die Sitzheizung als Monatsabo verkaufen. Eingebaut war sie schon.',
    dreh: 'Bezahlt hätte man nicht für die Heizung, sondern für die Erlaubnis, sie einzuschalten.',
    sache: 'Ankündigung 2022 und die spätere Rücknahme — beides muss aus einer nachprüfbaren Quelle kommen.',
    belegpfad: [
      { instanz: 'Verbraucherschutzbehörde', art: 'behoerde', findet: 'Verfahren oder Stellungnahme zu Funktionen auf Abruf' },
      { instanz: 'Hersteller', art: 'hersteller', findet: 'Eigene Ankündigung des Abomodells' },
    ],
    quellenIds: [],
    notiz:
      'Der Fall ist über die Presse breit dokumentiert und damit für uns **nicht** eintragbar. Ohne Behörden- ' +
      'oder Herstellerdokument fällt die Idee.',
  },
  {
    id: 'parts-pairing',
    format: 'absicht',
    sachgebiet: 'recht',
    reifegrad: 'skizze',
    erzaehlt: 'Manche Ersatzteile funktionieren nur, wenn der Hersteller sie freischaltet. Gleiches Teil, tote Software.',
    dreh: 'Der Entscheider steht namentlich in einer EU-Richtlinie, weil die EU es ihm gerade verbietet.',
    sache: 'Die Reparaturrichtlinie 2024/1799 adressiert das Koppeln von Ersatzteilen ausdrücklich.',
    belegpfad: [{ instanz: 'Europäische Union', art: 'behoerde', findet: 'Richtlinie 2024/1799, Erwägungsgründe zum Parts Pairing' }],
    quellenIds: [],
    notiz:
      'EUR-Lex ist seit dem 17.08.2026 wieder maschinell prüfbar — nicht über die Weboberfläche, sondern ' +
      'über Cellar. `quellen-pruefen` leitet CELEX-Adressen selbst dorthin um.',
  },
  {
    id: 'akku-wechselbar-2027',
    format: 'absicht',
    sachgebiet: 'recht',
    reifegrad: 'skizze',
    erzaehlt: 'Ab 2027 muss der Akku im Handy wieder wechselbar sein. Nicht aus Einsicht, sondern per Verordnung.',
    dreh: 'Zwanzig Jahre lang war „fest verbaut" alternativlos. Jetzt geht es doch, weil es muss.',
    sache: 'EU-Batterieverordnung 2023/1542, Anforderungen an die Entnehmbarkeit durch Endnutzer.',
    belegpfad: [{ instanz: 'Europäische Union', art: 'behoerde', findet: 'Verordnung 2023/1542, Artikel zur Entnehmbarkeit' }],
    quellenIds: [],
  },
  {
    id: 'ladegeraet-nicht-im-karton',
    format: 'absicht',
    sachgebiet: 'laden',
    reifegrad: 'skizze',
    erzaehlt: 'Das Ladegerät liegt nicht mehr im Karton. Begründet wurde es mit der Umwelt, verkauft wird es einzeln.',
    dreh: 'Die Umweltbegründung ist überprüfbar, sobald dasselbe Teil daneben im Regal steht.',
    sache: 'Eine Wettbewerbsbehörde hat die Bewerbung dieser Entscheidung beanstandet.',
    belegpfad: [
      { instanz: 'Wettbewerbsbehörde', art: 'behoerde', findet: 'Bußgeldentscheidung zur Bewerbung des Lieferumfangs' },
    ],
    quellenIds: [],
  },
  {
    id: 'fernseher-quersubventioniert',
    format: 'absicht',
    sachgebiet: 'bildschirm',
    reifegrad: 'skizze',
    erzaehlt: 'Fernseher werden billiger, weil die Hersteller nicht mehr am Gerät verdienen, sondern an dir.',
    dreh: 'Der Preis im Regal ist kein Preis, sondern eine Anzahlung auf deine Daten.',
    sache: 'Erlösanteil aus Werbung und Datendiensten gegenüber dem Hardwareverkauf.',
    belegpfad: [
      { instanz: 'Datenschutzaufsichtsbehörde', art: 'behoerde', findet: 'Prüfbericht zu Datenerhebung bei Smart-TVs' },
      { instanz: 'Hersteller', art: 'hersteller', findet: 'Geschäftsbericht, Segmentberichterstattung' },
    ],
    quellenIds: [],
  },
  {
    id: 'gedrosselte-alte-handys',
    format: 'absicht',
    sachgebiet: 'handy',
    reifegrad: 'skizze',
    erzaehlt: 'Ein Hersteller hat alte Telefone per Update langsamer gemacht und es nicht dazugesagt.',
    dreh: 'Die Drosselung war technisch begründbar. Bestraft wurde nicht sie, sondern das Verschweigen.',
    sache: 'Die französische Wettbewerbs- und Verbraucherbehörde hat 2020 ein Bußgeld verhängt.',
    belegpfad: [
      { instanz: 'DGCCRF (Frankreich)', art: 'behoerde', findet: 'Bußgeldbescheid wegen unterlassener Information über die Drosselung' },
    ],
    quellenIds: [],
    notiz:
      'Der Fall ist über die Presse breit dokumentiert und damit für uns nicht eintragbar — die Behörde ' +
      'selbst hat aber eine Mitteilung veröffentlicht. Genau der Weg, für den Presse erlaubt ist: lesen, ' +
      'zur Primärquelle folgen, die Primärquelle zitieren.',
  },
  {
    id: 'firmware-sperrt-fremdpatronen',
    format: 'absicht',
    sachgebiet: 'drucken',
    reifegrad: 'skizze',
    erzaehlt: 'Ein Firmware-Update kann deinen Drucker über Nacht für fremde Patronen sperren.',
    dreh: 'Das Gerät wird nach dem Kauf schlechter, ohne dass jemand es angefasst hat.',
    sache: 'Die Reparaturrichtlinie verbietet Softwaretechniken, die Reparatur behindern — hier ist zu prüfen, ob Verbrauchsmaterial darunter fällt.',
    belegpfad: [
      { instanz: 'Europäische Union', art: 'behoerde', findet: 'Richtlinie 2024/1799, Verbot hindernder Softwaretechniken' },
    ],
    quellenIds: ['eu-recht-auf-reparatur'],
    notiz:
      'Die Quelle liegt schon geprüft in quellen.json. Vor dem Bauen die Abgrenzung klären: Das Verbot ' +
      'zielt auf Reparatur und Ersatzteile, nicht ausdrücklich auf Tinte. Wenn es nicht trägt, ist das ' +
      'Thema tot — nicht halb.',
  },
  {
    id: 'regionalcode',
    format: 'absicht',
    sachgebiet: 'bildschirm',
    reifegrad: 'skizze',
    erzaehlt: 'Eine Scheibe aus Amerika läuft in deinem Gerät nicht. Der Kopierschutz ist es nicht.',
    dreh: 'Der Regionalcode schützt keine Datei, er teilt die Welt in Verkaufsgebiete.',
    sache: 'Die Regionen sind Teil der Spezifikation, nicht eine Eigenheit einzelner Geräte.',
    belegpfad: [
      { instanz: 'DVD Forum / Normungsgremium', art: 'standard', findet: 'Festlegung der Regionalcodes in der Spezifikation' },
    ],
    quellenIds: [],
    notiz: 'Vor dem Bauen prüfen, ob die Spezifikation frei zugänglich ist — dieselbe Klippe wie bei HDMI und JEDEC.',
  },
  {
    id: 'speicher-verloetet',
    format: 'absicht',
    sachgebiet: 'rechner',
    reifegrad: 'skizze',
    erzaehlt: 'Der Arbeitsspeicher deines Notebooks ist festgelötet. Aufrüsten ist keine Option mehr.',
    dreh: 'Nicht der Speicher ist teuer, sondern die Entscheidung, ihn beim Kauf festzulegen.',
    sache: 'Ökodesign-Vorgaben zur Zerlegbarkeit und zur Verfügbarkeit von Ersatzteilen — trägt die Vorgabe das?',
    belegpfad: [
      { instanz: 'Europäische Union', art: 'behoerde', findet: 'Ökodesign-Verordnung, Anforderungen an Zerlegbarkeit' },
    ],
    quellenIds: [],
  },
];
