# Aufgaben

Die laufende Aufgabe ist mit `▸` markiert. Diese Liste steht am Ende jeder
Antwort im Chat — die Statuszeile bleibt dafür frei. Erledigtes wird
durchgestrichen, nicht gelöscht: So bleibt sichtbar, was der Umbau alles
berührt hat.

## Der große Umbau · 16.–17.08.2026

Der Kanal wird **Unterhaltung, die nebenbei hilft** — nicht Hilfe im
Unterhaltungston. Befund: Die sieben Shorts vom 16.08. waren Erklärvideos, und
zwar nicht wegen des Tons, sondern wegen der **Themen**. Es waren Suchanfragen
— „welche Buchse überträgt Bild" —, und im Feed sucht niemand.

Prüfstein für jedes Thema ab jetzt: **Erzählt das jemand freiwillig weiter?**

### Beschlossen

- [x] ~~Zweite Person erlaubt, der Sprecher ist mitgemeint~~
- [x] ~~Beleg wird eingeblendet statt gespielt — die 2,5 s gehen in die Pointe~~
- [x] ~~56 erzählbare Themen gesammelt, 11 gestrichen, 45 bleiben~~
- [x] ~~Formate aus dem Material abgeleitet statt umgekehrt; Wochentage neu~~
- [x] ~~Montag heißt **„Du bist dumm"** — der Spott steht im Namen~~

### Gebaut am 17.08.2026

- [x] ~~`src/typen.ts` — `Position` als Pflichtfeld, sieben statt zehn Szenenarten~~
- [x] ~~Sieben neue Sendeplätze, acht neue Sachgebiete, `MATRIX` neu~~
- [x] ~~`merksatz` → `weitererzaehlt`, `kernfrage` → `erzaehlt`, `system` gestrichen~~
- [x] ~~Belegeinblendung unter der Kopfzeile (`Belegzeile` in `Wortmarke.tsx`)~~
- [x] ~~`frage`-Szene mit Denkpause über den Szenentrenner — kostet kein Kontingent~~
- [x] ~~`schluss` ersetzt die Endkarte: ein Satz statt einer Liste~~
- [x] ~~Gerätezeichnungen und `src/illustration.ts` gestrichen, Typografie trägt~~
- [x] ~~Zwei Fehlalarme abgestellt: `bildvielfalt` und „vom" als Sachwort~~
- [x] ~~Drei Quellen neu abgerufen und maschinell bestätigt (UBA, BSI × 2)~~
- [x] ~~Sieben neue Shorts, **0 Fehler, 0 Hinweise**, 22,8–25,4 s~~
- [x] ~~Neuer Ideenvorrat: 42 Ideen, eine Datei je Sendeplatz~~
- [x] ~~Standbilder geprüft: Frage, Belegzeile, Nachschlag, Vergleich~~

## Belege strukturell abgesichert · 17.08.2026 · Abend

Nicht drei Sätze repariert, sondern die Stelle geschlossen, an der sie
entstehen konnten. **Eine Szene hing an einer Quelle, nicht an einem Zitat** —
und erbte damit den Belegstatus von allem, was in der Quelle stand.

- [x] ~~Jeder Beleg in `quellen.json` hat ein `id` (50 Zitate)~~
- [x] ~~Jede Szene mit `quelleId` trägt eine `belegId` — Schema erzwingt das
      Paar, `shortPruefen` prüft, dass die Fundstelle wirklich dort steht~~
- [x] ~~Hinweis, sobald ein Zitat mehr als zwei Szenen tragen soll — das
      Muster, hinter dem sich alle drei Fehler versteckt hatten~~
- [x] ~~Belegansicht zeigt nur noch das gebundene Zitat: 82 Paare → 32~~
- [x] ~~**Dienstag**: Das Märchen sitzt jetzt ganz im Aufschlag, der belegfrei
      sein darf. Zwei neue UBA-Zitate geholt und bestätigt — „Der
      Memory-Effekt tritt bei Lithium-Ionen-Akkus nicht auf" und „Eine
      vollständige Entleerung schadet dem Akku"~~
- [x] ~~**Mittwoch 18 Uhr**: „Kein Zufall. Ein Gremium hat das so festgelegt."
      war eine Behauptung über eine Absicht. Jetzt: was das Gremium wirklich
      festgelegt hat — steht wörtlich da und ärgert genauso~~
- [x] ~~**Donnerstag**: „Neunundzwanzig Euro" waren erfunden. Raus~~
- [x] ~~**Montag**: „In der Zeit wurde ein Kind eingeschult" hatte keine
      Fundstelle. Ersetzt durch das belegte Ende der Geschichte~~
- [x] ~~**Sonntag**: Die Prämisse „abends" hing an nichts — die
      Bundesnetzagentur schreibt über das Band, nicht über die Uhrzeit~~
- [x] ~~Gegentest gefahren: alle drei neuen Regeln greifen~~
- [x] ~~Beim Lesen der 32 Paare vier weitere Sätze gefunden, die mehr sagten
      als ihr Zitat: „Dann kam nichts" (die EU sagt „zwar … aber"), „gleiche
      Dicke", „Jahre später" und „freiwillige Erklärung". Alle vier auf das
      zurückgeschnitten, was wörtlich dasteht~~
- [x] ~~Alle acht neu vertont und gerendert: **0 Fehler, 0 Hinweise**,
      19,5–22,5 s, 2.828 Zeichen Kontingent~~
- [x] ~~Vorrat aufgefüllt: 56 → **77 Ideen**, Reichweite 5 → **8 Wochen**.
      Neu unter anderem KI-Verordnung (gilt seit dem 2. August), Cyber
      Resilience Act (Meldefrist ab September), gedrosselte Telefone,
      Schaltsekunde, Bluetooth-Königsname~~

## Der Kanal läuft · 17.08.2026, 20:40

- [x] ~~Alle acht Shorts abgenommen. Der Dienstag ging dreimal zurück: erst
      klang der Übergang abgehackt, dann fehlte der Pointe ihr Aufbau (den
      hatte der Beleg-Umbau weggeschnitten), dann war „Achtundneunzig" als
      Jahreszahl weder verständlich noch belegt. Jetzt: „Damals."~~
- [x] ~~**`npm run veroeffentlichen` erstmals komplett gelaufen** — 24 Beiträge
      auf drei Kanälen, Mo 17.08. bis So 23.08. Kein Fehlschlag~~
- [x] ~~`--ab=<datum>` gebaut: Die Woche beginnt am Tag, an dem sie fertig
      wurde, nicht sieben Tage später~~
- [x] ~~Vergangene Termine gehen gleich raus statt still zu scheitern,
      gestaffelt, damit nicht zwei auf dieselbe Minute fallen~~
- [x] ~~ElevenLabs bekommt drei Versuche; ein leerer Rumpf mit HTTP 200 heißt
      jetzt auch so und nicht „Unexpected end of JSON input"~~
- [x] ~~Render-Wartezeit auf zwei Minuten — 25 Sekunden reichen für einen
      kalten Chrome-Start nicht, wenn nebenher etwas läuft~~
- [x] ~~Markenbilder aus dem Code erzeugt (`npm run markenbilder`): Profilbild
      hell und dunkel, YouTube-Banner, freigestellte Wortmarke~~
- [x] ~~Kanaltexte in `marke-texte.md`, ohne Taktzusage~~

## Entschieden und erledigt · 17.08.2026, spät

- [x] ~~Bilder hochgeladen, Bios eingetragen, Kanäle stehen auf allen drei
      Plattformen~~
- [x] ~~Die Videos sehen auf den Plattformen richtig aus — geprüft am
      Montagsvideo~~
- [x] ~~Rechner neu gestartet~~
- [x] ~~`emirhanokyay@hotmail.com` im GitHub-Konto eingetragen~~
- [x] ~~**Kleinschreibung des YouTube-Handles bleibt, wie sie ist.** `@Ganzakkurat`
      dort, `ganzakkurat` bei Instagram und TikTok. Handles sind bei YouTube
      nicht groß-klein-empfindlich; es ist kein Fehler, sondern eine
      Uneinheitlichkeit, die niemanden stört~~
- [x] ~~**Der Sendeplan kommt nicht aufs Banner zurück.** Entschieden, nicht
      vertagt: Ein angeschlagener Takt bindet, und der Kanal soll frei bleiben,
      Wochen auch mal ausfallen zu lassen. Die Wochentage bleiben im
      Formatmodell — dort sind sie Produktionsplan, kein Versprechen nach
      außen~~
- [x] ~~**Kein Anwaltstermin.** Die drei Fragen — Werbekennzeichnung im Video,
      Impressumspflicht, DPMAregister — hingen alle am gewerblichen Start. Es
      gibt keine Werbung, keine Partnerlinks und keine Monetarisierung, also
      steht nichts an. Käme das zurück, käme die Liste mit~~

## Bebilderung · 18.08.2026

Aus „eine Zeichnung als Ausnahme" ist „jede Szene, die eine tragen kann"
geworden. Der Anstoß kam von dir: Die reine Typografie hält den Inhalt, aber
sie lässt die Fläche leer.

- [x] ~~Symbolvorrat von 8 auf **38**; 34 von 38 Szenen bebildert~~
- [x] ~~Untergrenze für die Zeichnung: Sie bekam nur den Rest der Bühne und kam
      in textreichen Szenen mit 60 statt 560 Pixeln an~~
- [x] ~~**Doktrin korrigiert.** „Keine Gerätezeichnungen" war als „keine
      Buchsen" gemeint und wurde als „keine Gegenstände" gebaut. Zehn von 26
      Zuordnungen waren dadurch Assoziationen statt Gegenstände — ein Sofa für
      „Dein Fernseher hat ein Mikrofon". Jetzt gilt: gezeichnet wird, was der
      Satz nennt~~
- [x] ~~Drei Zeichnungen im Standbild verworfen: Ladenkasse (las sich wie der
      Fernseher), zwei gespiegelte Kabel (lasen sich als Ohrhörer), Waage für
      „zwei Kabel"~~
- [x] ~~`--ton-behalten` parste die alten Renderdaten gegen das **aktuelle**
      Schema und war damit nach jeder Vertragsänderung unbenutzbar — genau
      dann, wenn man es braucht. Liest jetzt nur Tonspur und Sprechtext~~
- [x] ~~`--ton-behalten` findet den Ton auch in einem früheren Lauf. Vorher
      brach es um Mitternacht ab, weil der Tagesordner wechselte~~

## Offen

- [x] ~~**Vorschaubild bei TikTok: nichts zu machen.** Buffer schreibt es ins
      eigene Schema — die Netze nehmen keine hochgeladenen Titelbilder an und
      lehnen jedes Video ab, das eines mitschickt. Was geht, tun wir schon:
      `thumbnailOffset: 1000` wählt das Bild bei Sekunde 1, also im Aufschlag.
      Instagram hält sich daran, TikTok sucht sich trotzdem sein eigenes. Der
      Befund steht an der Codestelle~~

- ▸ Den Tagesstand pushen — seit dem letzten Push sind Markenbilder,
      Kanaltexte und die drei Werkzeugkorrekturen dazugekommen
- [ ] Nächste Woche bauen. Der Vorrat trägt acht Wochen

## Der Mittwoch ist automatisiert · 17.08.2026, nachts

`npm run neuigkeiten` fragt bei Cellar ab, welche EU-Rechtsakte in den
letzten sechs Wochen **in Kraft getreten** sind, holt die Volltexte und siebt
sie. Aus 400 Rechtsakten werden zehn Kandidaten.

- [x] ~~SPARQL-Abfrage auf `resource_legal_date_entry-into-force`, Volltexte
      über denselben Cellar-Weg wie `quellen-pruefen`~~
- [x] ~~**Gegenprobe bestanden:** Der erste scharfe Lauf setzte die
      KI-Verordnung (32024R1689, in Kraft seit 2. August) auf Platz eins —
      dasselbe Thema, das nachmittags von Hand recherchiert worden war~~
- [x] ~~Drei Anläufe, zwei Befunde im Skript festgehalten: 83 Kandidaten waren
      zu viele (häufige Wörter qualifizieren nicht mehr, sie ordnen nur), und
      30 waren die falschen — **„usb" steckt in „Ausbruch"**, deshalb lauter
      Beschlüsse zur Schweinepest. Gesucht wird jetzt am Wortanfang~~

**Was der Wächter nicht kann, bleibt der Engpass:** Ob jemand es freiwillig
weitererzählt. Er legt zehn vor, ein Mensch nimmt zwei.

## Umzug auf „Ganz akkurat" · 17.08.2026 · Abend

- [x] ~~Buffer auf die drei neuen Kanäle umgestellt — alle drei verbunden,
      keiner getrennt~~
- [x] ~~Cloudflare: `ganzakkuratvideos` angelegt und öffentlich freigegeben,
      `.env` umgestellt, alle Zugänge mit echtem Hin-und-Rück geprüft~~
- [x] ~~Die zwei letzten SetupKlar-Videos gelöscht, `setupklarvideos` entfernt~~
- [x] ~~Aufräumregel: Objekte verschwinden nach 90 Tagen von selbst~~
- [x] ~~GitHub angelegt und gepusht. Historie vorher vereinheitlicht: ein
      Autor statt zwei, acht alte Banner raus, 35 MB → 6,3 MB~~
- [x] ~~`.gitignore` deckt jetzt alle `.env`-Varianten ab. Eine Sicherungskopie
      lag daneben, die keine Einzelregel traf — eine Aufzählung kann man
      vergessen, ein Muster nicht~~
- [x] ~~Letzte SetupKlar-Spuren im Code: veraltetes Beispielkürzel im
      Wochenlauf. Die historischen Kommentare bleiben stehen, sie erklären,
      warum etwas so ist~~

## Danach

- [x] ~~`@ganzakkurat` auf allen drei Plattformen gesichert und umbenannt~~
- [x] ~~`ganzakkurat.de` bei STRATO als Kontodomain hinterlegt~~
- [x] ~~**Keine eigene Domain für die Videoablage.** Die `pub-…r2.dev`-Adresse
      bleibt. Sie sieht kein Zuschauer — nur Buffer und die Plattformen holen
      darüber die Datei ab, danach liegt das Video bei ihnen. Der einzige
      Vorteil wäre, einen Bucketwechsel zu überleben; dafür müssten die
      Namensserver von STRATO zu Cloudflare umziehen. Steht in keinem
      Verhältnis~~
- [x] ~~`kontakt@ganzakkurat.de` bei STRATO angelegt~~
