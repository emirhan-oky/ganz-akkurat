import type { Idee } from '../../src/typen';

/**
 * Rubrik Zuhause — in der Wohnung, aber nicht am Arbeitsplatz.
 *
 * Die tragende unbeteiligte Instanz ist hier die Bundesnetzagentur: Funk,
 * Frequenzen, Anschlussrechte und Routerfreiheit sind alle bei ihr geregelt
 * und öffentlich abrufbar. Für alles am Fernseher kommt die Ökodesign- und
 * Energiekennzeichnungsverordnung dazu.
 *
 * Die häufigste Falle in dieser Rubrik ist der Belegrang: Zu WLAN-Fragen
 * findet man alles bei Routerherstellern — und die sind beteiligt. Der
 * WLAN-Short stand am 14.08.2026 auf TP-Link, TP-Link und Intel, bis die
 * Allgemeinzuteilung der BNetzA dazukam.
 */
export const zuhauseIdeen: Idee[] = [
  {
    id: 'wlan-kanal-selbst-setzen',
    rubrik: 'zuhause',
    winkelart: 'selbsttest',
    reifegrad: 'skizze',
    kernfrage: 'Soll ich den WLAN-Kanal von Hand einstellen?',
    entwarnung: 'Der Automatik kannst du meistens vertrauen.',
    sache:
      'Das Band ist zur gemeinsamen Nutzung zugeteilt und in überlappende Kanäle geteilt; nur wenige liegen wirklich störungsfrei nebeneinander.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Kanalaufteilung und Allgemeinzuteilung des 2,4-GHz-Bands' },
    ],
    quellenIds: ['bnetza-wlan-24ghz-allgemeinzuteilung'],
  },
  {
    id: 'routerfreiheit',
    rubrik: 'zuhause',
    winkelart: 'uebersehenerPunkt',
    reifegrad: 'skizze',
    kernfrage: 'Muss ich den Router vom Anbieter nehmen?',
    entwarnung: 'Nein — und der Anbieter muss dir die Zugangsdaten geben.',
    sache:
      'Die freie Endgerätewahl am Netzabschlusspunkt ist gesetzlich geregelt; der Anbieter muss die notwendigen Zugangsdaten unaufgefordert bereitstellen.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Regelungen zur Routerfreiheit und zum Netzabschlusspunkt' },
      { instanz: 'Telekommunikationsgesetz', art: 'behoerde', findet: 'Rechtsgrundlage der freien Endgerätewahl' },
    ],
    quellenIds: [],
    notiz: 'Starke Idee: konkreter Anspruch, klar belegbar, betrifft jeden mit Internetanschluss. Kandidat für einen frühen Zuhause-Short.',
  },
  {
    id: 'wlan-repeater-halbiert',
    rubrik: 'zuhause',
    winkelart: 'kompromiss',
    reifegrad: 'skizze',
    kernfrage: 'Der Repeater bringt mehr Balken, aber nicht mehr Tempo. Woran liegt das?',
    entwarnung: 'Der Repeater ist nicht schlecht — er macht genau das, was er soll.',
    sache:
      'Ein einfacher Repeater empfängt und sendet auf demselben Kanal, überträgt jedes Paket also zweimal.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'IEEE 802.11', art: 'standard', findet: 'Funktionsweise der Weiterleitung, Halbduplex-Betrieb des Mediums' },
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'gemeinsame Nutzung des Bands als Rahmen' },
    ],
    quellenIds: ['bnetza-wlan-24ghz-allgemeinzuteilung'],
    notiz: 'Prüfen, ob der IEEE-Standard frei zitierbar ist. Falls nicht, trägt die Aussage möglicherweise nur über eine beteiligte Quelle — dann fällt sie.',
  },
  {
    id: 'lan-kabel-kategorie',
    rubrik: 'zuhause',
    winkelart: 'entlarvung',
    reifegrad: 'skizze',
    kernfrage: 'Brauche ich Cat 8 für schnelles Internet zuhause?',
    entwarnung: 'Dein altes Kabel reicht mit ziemlicher Sicherheit.',
    sache:
      'Die Kategorien sind für Übertragungsraten weit oberhalb üblicher Hausanschlüsse ausgelegt; die begrenzende Stelle ist der Anschluss, nicht das Kabel.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'ISO/IEC 11801 bzw. EN 50173', art: 'standard', findet: 'Kategorien und die zugehörigen Übertragungsraten' },
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'tatsächlich verfügbare Anschlussgeschwindigkeiten in Deutschland' },
    ],
    quellenIds: [],
    notiz: 'Der BNetzA-Breitbandbericht liefert die Zahl, die den Vergleich trägt. Genau die Sorte Gegenüberstellung, aus der die Pointe von selbst entsteht.',
  },
  {
    id: 'fernseher-hdmi-arc',
    rubrik: 'zuhause',
    winkelart: 'reihenfolge',
    reifegrad: 'skizze',
    kernfrage: 'Der Ton der Soundbar kommt nicht. Falscher Anschluss?',
    entwarnung: 'Kabel und Soundbar sind in Ordnung.',
    sache:
      'Der Rückkanal für Ton läuft nur über einen bestimmten, gekennzeichneten Anschluss am Fernseher — nicht über jeden.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'HDMI Forum', art: 'standard', findet: 'Audio Return Channel als Eigenschaft bestimmter Anschlüsse' },
    ],
    quellenIds: [],
  },
  {
    id: 'fernseher-stromverbrauch',
    rubrik: 'zuhause',
    winkelart: 'grenzwert',
    reifegrad: 'skizze',
    kernfrage: 'Wie viel Strom zieht der Fernseher wirklich im Jahr?',
    entwarnung: 'Weniger, als das Etikett vermuten lässt.',
    sache:
      'Das Energielabel nennt den Verbrauch für 1000 Betriebsstunden; wer weniger fernsieht, kommt entsprechend niedriger heraus.',
    titelmuster: 'uhr',
    system: 'ohne',
    belegpfad: [
      { instanz: 'EU-Energiekennzeichnungsverordnung', art: 'behoerde', findet: 'Bezugsgröße der Verbrauchsangabe auf dem Label' },
      { instanz: 'Umweltbundesamt', art: 'behoerde', findet: 'durchschnittliche Nutzungsdauer als Vergleichsgröße' },
    ],
    quellenIds: [],
  },
  {
    id: 'standby-verbrauch',
    rubrik: 'zuhause',
    winkelart: 'mythos',
    reifegrad: 'skizze',
    kernfrage: 'Lohnt es sich, die Geräte nachts vom Strom zu nehmen?',
    entwarnung: 'Der Bereitschaftsbetrieb ist gesetzlich gedeckelt.',
    sache:
      'Die Ökodesign-Verordnung begrenzt die Leistungsaufnahme im Bereitschaftsbetrieb auf einen festen Höchstwert.',
    titelmuster: 'uhr',
    system: 'ohne',
    belegpfad: [
      { instanz: 'EU-Ökodesign-Verordnung', art: 'behoerde', findet: 'Höchstwerte für Bereitschafts- und Aus-Zustand' },
      { instanz: 'Umweltbundesamt', art: 'behoerde', findet: 'Einordnung des Sparpotenzials in Euro' },
    ],
    quellenIds: [],
    notiz: 'Die Deflation der großen Zahl durch die kleine — Titelmuster `uhr` im Reinzustand. Alte Geräte sind der Grenzfall und gehören genannt.',
  },
  {
    id: 'streaming-ruckelt-abends',
    rubrik: 'zuhause',
    winkelart: 'diagnose',
    reifegrad: 'skizze',
    kernfrage: 'Streaming ruckelt abends. Ist die Leitung zu langsam?',
    entwarnung: 'Deine Leitung ist nicht schlechter geworden.',
    sache:
      'Die Bundesnetzagentur unterscheidet die vertraglich zugesicherte von der tatsächlich verfügbaren Rate und misst die Abweichung regelmäßig.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Messverfahren, zugesicherte gegenüber tatsächlicher Rate' },
    ],
    quellenIds: [],
    notiz: 'Verwandt mit dem laufenden `wlan-abends`, aber anderer Zugriff: dort das Funkband, hier die Leitung. Vor dem Bau gegen den bestehenden Short halten.',
  },
  {
    id: 'internet-zu-langsam-recht',
    rubrik: 'zuhause',
    winkelart: 'uebersehenerPunkt',
    reifegrad: 'skizze',
    kernfrage: 'Was kann ich tun, wenn die Leitung dauerhaft langsamer ist als versprochen?',
    entwarnung: 'Du kannst die Rechnung kürzen — das ist geregelt.',
    sache:
      'Bei erheblicher, kontinuierlicher Abweichung von der vertraglichen Leistung besteht ein Minderungsrecht; die Bundesnetzagentur stellt dafür ein anerkanntes Messverfahren bereit.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Telekommunikationsgesetz', art: 'behoerde', findet: 'Minderungsrecht bei Abweichung von der vertraglichen Leistung' },
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Messverfahren und Nachweisregeln' },
    ],
    quellenIds: [],
    notiz: 'Sehr starke Idee: konkreter Anspruch mit nachprüfbarem Verfahren. Muss aber genau bleiben — „erheblich" und „kontinuierlich" sind definierte Begriffe, keine Floskeln.',
  },
  {
    id: 'wlan-5ghz-reichweite',
    rubrik: 'zuhause',
    winkelart: 'kompromiss',
    reifegrad: 'skizze',
    kernfrage: 'Warum ist das schnellere WLAN-Band im Nebenzimmer weg?',
    entwarnung: 'Du hast den Router nicht falsch aufgestellt.',
    sache:
      'Höhere Frequenzen werden von Wänden stärker gedämpft; zusätzlich ist die zulässige Sendeleistung im 5-GHz-Bereich teilweise auf Innenräume beschränkt.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Allgemeinzuteilung 5 GHz mit Leistungsgrenzen und Innenraumbeschränkung' },
    ],
    quellenIds: [],
    notiz: 'Die Innenraumbeschränkung ist der übersehene Teil und macht die Idee mehr als Physikunterricht.',
  },
  {
    id: 'mesh-oder-repeater',
    rubrik: 'zuhause',
    winkelart: 'verwechslung',
    reifegrad: 'skizze',
    kernfrage: 'Mesh oder Repeater — ist das nicht dasselbe?',
    entwarnung: 'Beide vergrößern die Fläche. Der Unterschied liegt woanders.',
    sache:
      'Der Unterschied ist die Übergabe zwischen den Stationen und ob die Weiterleitung dasselbe Funkband mitbenutzt.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'IEEE 802.11 (Roaming-Erweiterungen)', art: 'standard', findet: 'genormte Verfahren zur Übergabe zwischen Zugangspunkten' },
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Bandbelegung als Rahmen' },
    ],
    quellenIds: ['bnetza-wlan-24ghz-allgemeinzuteilung'],
  },
  {
    id: 'powerline-nachbarn',
    rubrik: 'zuhause',
    winkelart: 'uebersehenerPunkt',
    reifegrad: 'skizze',
    kernfrage: 'Kommt mein Powerline-Signal beim Nachbarn an?',
    entwarnung: 'Mitlesen kann er nicht — verschlüsselt ist es.',
    sache:
      'Powerline nutzt das Stromnetz als Übertragungsweg und endet nicht zwingend an der Wohnungsgrenze; die Bundesnetzagentur regelt die zulässige Störaussendung.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Vorgaben zur Störaussendung von Powerline-Geräten' },
    ],
    quellenIds: [],
  },
  {
    id: 'smart-home-cloud-weg',
    rubrik: 'zuhause',
    winkelart: 'kompromiss',
    reifegrad: 'skizze',
    kernfrage: 'Was passiert mit meinen smarten Lampen, wenn der Hersteller den Dienst abschaltet?',
    entwarnung: 'Deine Rechte enden nicht mit dem Serverbetrieb.',
    sache:
      'Für Waren mit digitalen Elementen besteht eine gesetzliche Aktualisierungspflicht über einen Zeitraum, den der Käufer erwarten darf.',
    titelmuster: 'zweisatz',
    system: 'ohne',
    belegpfad: [
      { instanz: '§ 475b BGB (Waren mit digitalen Elementen)', art: 'behoerde', findet: 'Aktualisierungspflicht und deren Dauer' },
    ],
    quellenIds: [],
    notiz:
      'Grenzfall zur Rubrik Kaufen. Bleibt Zuhause, solange der Zugriff „das Gerät hängt schon an der Wand" ist und nicht „worauf achte ich beim Kauf".',
  },
  {
    id: 'router-neustart-nachts',
    rubrik: 'zuhause',
    winkelart: 'mythos',
    reifegrad: 'skizze',
    kernfrage: 'Bringt es etwas, den Router nachts auszuschalten?',
    entwarnung: 'Für die Geschwindigkeit bringt es nichts.',
    sache:
      'Die Zwangstrennung ist bei heutigen Anschlüssen nicht mehr üblich; der Verbrauch im Bereitschaftsbetrieb ist gedeckelt.',
    titelmuster: 'verdaechtiger',
    system: 'ohne',
    belegpfad: [
      { instanz: 'Bundesnetzagentur', art: 'behoerde', findet: 'Anschlussarten und Zuteilung der Adressen' },
      { instanz: 'EU-Ökodesign-Verordnung', art: 'behoerde', findet: 'Höchstwerte im Bereitschaftsbetrieb' },
    ],
    quellenIds: [],
    notiz: 'Belegpfad prüfen — ob die BNetzA die Zwangstrennung ausdrücklich behandelt, ist offen. Notfalls auf den Verbrauchsteil eingrenzen.',
  },
];
