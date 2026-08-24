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

- [ ] Den Tagesstand pushen — seit dem letzten Push sind Markenbilder,
      Kanaltexte und die drei Werkzeugkorrekturen dazugekommen
- [ ] Nächste Woche bauen. Der Vorrat trägt acht Wochen

## Neues Fundament · 19.08.2026 · läuft

Anlass: Der Eindruck, planlos gearbeitet zu haben — Plan-Modus, Plugins und
Skills waren eine Woche lang unbekannt. Entschieden wurde **nichts zu löschen**,
sondern zu ordnen. Der Plan liegt unter
`~/.claude/plans/okay-ich-suche-n-mlich-snug-nebula.md`.

Drei Festlegungen: Länge auf **maximal 30 Sekunden** (nicht 40 — das Fenster
war schon einmal 28–40 und wurde am 16.08. wegen „zu lang" verengt), Design in
vier Bereichen, CLAUDE.md wird **aufgeteilt statt neu geschrieben**.

### Gebaut

- [x] ~~Vier Skills unter `.claude/skills/`: `beleg-holen` (111 Z.),
      `woche-bauen` (107 Z.), `thema-finden` (114 Z.), `rueckblick-lesen`
      (87 Z.)~~
- [x] ~~Subagent `.claude/agents/belegpruefer.md` — liest die Zitat-Paare in
      eigenem Kontext und meldet nur, wo ein Satz mehr behauptet als sein
      Zitat trägt~~

### ~~CLAUDE.md gekürzt · 19.08.2026~~

- [x] ~~**928 → 713 Zeilen.** Neun Abschnitte in die vier Skills ausgelagert,
      an ihrer Stelle steht der Vertragsteil plus ein `→ Skill`-Verweis:
      `belegId`, Rundlauf + `weitererzaehlt`, Prüfung vor der Vertonung,
      Humor, Quellen + `npm run belege`, Buffer-Limit + Hintergrunddienste,
      Rücklauf komplett, Ideenvorrat, Stand~~
- [x] ~~Neuer Abschnitt **„Wo was steht"** ganz vorn: eine Tabelle der vier
      Skills und des Subagenten. Diese Datei hält den Vertrag, die Skills
      halten die Abläufe~~
- [x] ~~**Ein Fehler im Skill gefunden, bevor das Original gelöscht wurde:**
      `beleg-holen` schrieb „Drei Quellen je Short" — diese Regel ist am
      16.08.2026 entfallen und durch „mindestens eine unbeteiligte Quelle"
      ersetzt worden. Wäre die CLAUDE.md zuerst geschnitten worden, hätte die
      falsche Fassung als einzige überlebt~~
- [x] ~~Sechs Begründungen nachgetragen, die in keinem Skill standen:
      Belegansicht 82 → 32 Paare, `nachlegen.plist` samt der 19:15-Begründung,
      R2/Buffer/Zugänge, täglich statt wöchentlich messen, `externalLink` als
      einzige Brücke, der herausgerechnete Tempovergleich der Sprechprobe~~
- [x] ~~`npm run pruefen` grün~~

**Warum 713 und nicht 400:** Die Schätzung im Plan ging von einem Zweizeiler je
Abschnitt aus. Gegen die eigene Regel — keine Begründung löschen, ohne dass sie
im Skill steht — hätte das den Vertragsteil mitgenommen (Quellenrangfolge,
Belegpflicht im Aufschlag, `rundlauf`). Ausgelagert ist jetzt der **Ablauf**,
geblieben ist, **was gilt**.

- [ ] Offen und noch nicht entschieden: ein fünfter Skill für die
      **Bebilderung**. „Die Prüfung hat die Richtung zweimal gewechselt"
      (59 Zeilen) plus Bühnenmaße und Symbolwahl sind Produktionswissen und
      kein Vertrag — das wären noch einmal rund 90 Zeilen. Nicht gebaut, weil
      es eine Strukturentscheidung ist

### Stop-Hook: die Prüfung erinnert sich selbst · 19.08.2026

Anlass war eine Bitte aus der zweiten Sitzung. Der Gedanke ist derselbe wie bei
`presse`, das aus dem Enum entfernt statt verboten wurde: „Prüfen vor allem
anderen" war eine Regel, an die man sich erinnern muss — als Hook ist es eine,
die man nicht vergessen kann.

- [x] ~~Stop-Hook in `.claude/settings.local.json`: `npm run pruefen` nach jedem
      Zug, still bei Erfolg, `systemMessage` mit den letzten 15 Zeilen bei
      Rot. Er meldet, er blockiert nicht~~
- [x] ~~**Stop und nicht PostToolUse:** `tsc` läuft über das ganze Projekt —
      bei zehn Dateiänderungen in einem Zug wären das zehn Läufe. Der Moment,
      der zählt, ist der andere: wenn „fertig" gesagt wird, obwohl die Prüfung
      rot ist~~
- [x] ~~Beide Fälle vor dem Eintragen einzeln gefahren, der Fehlerfall mit
      einer weggeworfenen Datei mit Typfehler. Danach der Befehl noch einmal
      **aus der JSON heraus** ausgeführt — Escaping ist die Stelle, an der so
      etwas still kaputtgeht. `permissions` unversehrt, `jq -e` grün~~
- [ ] **Einmal `/hooks` öffnen oder die Sitzung neu starten.** Der
      Settings-Watcher beobachtet `.claude/` nur, wenn dort beim Sitzungsstart
      schon eine Settings-Datei lag. Das kann nur Emirhan tun

### Danach

- [ ] Stufe 2: `LAENGE_SEK.ziel` in `src/zeit.ts:175` von `[18, 28]` auf
      `[18, 30]`. Zielwert wird die Mitte bei 24. Den Kommentar
      **fortschreiben**, nicht überschreiben — dass das Fenster einmal 28–40
      war und warum es verengt wurde, muss lesbar bleiben
- [ ] Stufe 3.1: Kamera-Layer über `video/bausteine/Buehne.tsx` und Übergänge
      (Push-in bei der Zuspitzung, Punch auf den Kipppunkt). Grenze: Die
      Denkpause bleibt eine Pause
- [ ] Stufe 3.2: Typografie und Farbe · 3.3: Zeichnungen als Zustände
- [ ] Stufe 4: `EINGEFROREN.md` in `~/Desktop/horizont-bench`

**Bedienung, ab sofort:** `cd ~/Documents/Youtube && claude` — sonst wird
diese Datei und die CLAUDE.md gar nicht geladen. Plan-Modus vor allem, was
mehr als eine Datei berührt.

## Der Rücklauf wird lesbar · 19.08.2026

Anlass war die Suche nach Plugins, die die Videos besser machen. Geprüft: die
286 Plugins im offiziellen Marktplatz und drei einschlägige Fremd-Skills. Kein
einziges liefert Reichweite; die brauchbaren Teile sind entweder schon gebaut
(YouTube-Anbindung, und zwar genauer — Sekunde 3,5 statt pauschal) oder reines
Nachschlagewissen. **Nichts installiert.**

Der Engpass stand längst hier: „Ob jemand es freiwillig weitererzählt." Und in
der CLAUDE.md: „was hatte dieses eine". Gebaut wurde das Werkzeug für die
zweite Frage.

- [x] ~~`src/rueckschau.ts` — legt Rückblick und Herkunft zusammen. Die Brücke
      ist `lauf.json`, nicht `verlauf.json`: Der Verlauf kennt nur die
      `themaId`, der Rückblick nur die `shortId`~~
- [x] ~~Zwei Messungen je Short statt einer. `mitHalt` neben `zuletzt`, weil
      Analytics ein bis drei Tage nachhinkt — sonst liest man `null` und hält
      ein Video für tot, obwohl gestern eine Zahl dastand~~
- [x] ~~`npm run ausreisser` — Haltequote neben Format und Thema, Ausreißer mit
      `▲`, Aufrufe ganz rechts~~
- [x] ~~`npm run aufschlaege` — jeder Aufschlag neben seiner Haltequote. Das
      Gegenstück zu `npm run belege`: stellt nebeneinander, urteilt nicht~~
- [x] ~~**Beide schweigen, wenn sie nichts wissen.** Median erst ab acht
      gemessenen Videos, Formatvergleich erst ab fünf je Format. Gegen die
      zwei vorhandenen Shorts gefahren: keine Rangfolge behauptet, `—` statt
      `0 %`~~
- [x] ~~Join gegen `daten/verlauf.json` als unabhängige Quelle gegengeprüft —
      beide Shorts stimmen in Format, Sachgebiet und Thema überein~~
- [x] ~~Zwei Sprachfehler in der eigenen Ausgabe behoben: „1 Tage draußen" und
      „2 Aufschlag/Aufschläge". `tageText` für die Tabellenspalte (Nominativ),
      `seitText` für den Satz (Dativ)~~
- [x] ~~`npm run pruefen` sagt den Rücklauf in einem Satz — an der Stelle, an
      der die nächste Woche geplant wird. In einem `catch`, das schweigt: Der
      Rückblick ist eine Beobachtung, die Schemaprüfung ein Tor. Ein fehlender
      Ordner darf kein Grund sein, die Woche nicht zu bauen~~
- [x] ~~Gegentest über sechs Randfälle: fehlende Datei, fehlender Ordner,
      kaputtes JSON, Lauf gegen fremdes Schema, `median([])`, Short ohne
      Messung. `median([])` gibt `null` und nicht `0` — eine Null sähe hier
      wie ein Messwert aus~~

**Befund nebenbei:** `ein-stecker` (17.08.) und `powerbank-handgepaeck`
(18.08.) haben denselben Aufschlag — „Schätz mal." Zweimal derselbe Zugriff in
zwei Tagen. Genau die Sorte Wiederholung, die der Vergleich sichtbar machen
soll; bisher hätte sie niemand bemerkt.

### Offen aus demselben Plan

- [ ] `daten/benchmarks.md` — die vier fremden Shorts-Kennzahlen, jede gegen
      die YouTube-Dokumentation geprüft und als **unbelegt** markiert. Sie
      taugen zur Kalibrierung und dürfen nie in einem Video vorkommen
- [ ] `npm run nachfrage` — läuft ein Thema woanders schon? Braucht einen
      Data-API-Schlüssel; der bestehende Scope ist nur `yt-analytics.readonly`
- [ ] Arbeitsstruktur: Skill „Beleg holen", Subagent „Belegprüfer",
      CLAUDE.md von 928 auf etwa 400 Zeilen
- [ ] In drei bis vier Wochen wiederkommen. Jetzt liegen zwei Videos und keine
      einzige Haltekurve vor — das Instrument steht, die Aussage nicht

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

## Der große Umbau · ab 20.08.2026 · läuft

Anlass: 0 Abonnenten überall, TikTok vier Videos mit 0 Aufrufen, YouTube und
Instagram zusammen gut 200. Dazu siebzehn neu installierte Skills, die sich
teils ergänzen und teils widersprechen. Plan unter
`~/.claude/plans/okay-ich-habe-hier-shimmering-eich.md`.

**Freigegeben:** CLAUDE.md und die vier eigenen Skills sind nicht mehr bindend,
wo sie den Umbau blockieren. Zwei Grenzen bleiben — der Belegapparat und die
Regel, dass eine Begründung verschoben statt gelöscht wird.

### Stufe 0 · Aufräumen und Werkzeug

- [x] ~~Vier Projekt-Skills entfernt: `design-critique`,
      `find-animation-opportunities`, `improve-animations`,
      `review-animations`. Die drei Animations-Skills messen an
      Interaktionsfrequenz, Sub-300-ms-Fenstern und `prefers-reduced-motion` —
      ein Short hat davon nichts, und `find-animation-opportunities` ist ein
      Ablehnfilter, der Bewegung wegargumentiert hätte. Gesichert im
      Scratchpad, nicht gelöscht~~
- [x] ~~Drei globale Symlinks entfernt: `ai-video-generation` (kostenpflichtig),
      `hyperframes-cli` (zweite Render-Pipeline neben Remotion),
      `humanizer-zh` (chinesische Fassung von `vermenschlichen`). Die Ziele
      unter `~/.agents/skills/` bleiben liegen~~
- [x] ~~**ffmpeg ohne Homebrew.** Der Rechner hat kein `brew`, aber Remotion
      4.0.508 liefert ffmpeg und ffprobe 7.1 mit. Sie fanden nur ihre eigenen
      dylibs nicht — ohne `DYLD_LIBRARY_PATH` bricht der Aufruf mit „Library
      not loaded" ab, was nach einer kaputten Installation aussieht und keine
      ist. `skripte/ff` kapselt das, beide Fehlerfälle geprüft~~
- [x] ~~Gegenprobe gegen ein echtes Video: 1080 × 1920, 30 fps, Video- und
      Tonstrom, 22,27 s~~
- [x] ~~Neuer Skill `bild-bauen` (184 Z.): rettet die übertragbaren
      Bewegungsregeln aus den gelöschten Skills und sammelt das
      Projektwissen — Bühnenmaße, „gezeichnet wird, was der Satz nennt", die
      sieben Standbild-Fälle, die Kamerawerte vom 12.08. Zugleich der fünfte
      Skill, der seit dem 19.08. als offene Strukturfrage hier stand~~

### Stufe 1 · Fundament

- [x] ~~`daten/marke/brand-profile.md` (171 Z.). Zielgruppe: 18–30,
      technikaffin — kennt sich weit genug aus, um zu merken, dass etwas
      seltsam ist, und zu wenig, um es zu erklären. Haltung: **„Nichts davon
      ist Zufall"** — wo entschieden wurde, gibt es ein Dokument~~
- [x] ~~`daten/marke/voice.md` (173 Z.), aus 23 vertonten Sprechtexten. Anker
      ist der 18.08.; der 16.08. steht ausdrücklich als **Anti-Referenz**
      drin — dieselbe Person, aber die Erklärvideo-Stimme, die gescheitert
      ist. Sechs Signaturen, die auffälligste ist der Satz ohne Verb~~
- [x] ~~Stimmtest gefahren, wie der Skill ihn verlangt. Er hat eine Signatur
      verfehlt: Die Behörde muss **im gesprochenen Text** stehen, nicht nur in
      der Einblendung, sonst klingt der Text wie jeder andere Kanal. In
      `voice.md` nachgetragen~~
- [x] ~~**Der Abo-Hinweis wird still eingeblendet, nie gesprochen und nie als
      Schlusssatz.** So kollidiert er nicht mit dem Rundlauf, auf dem der Kanal
      seine zweiten Ansichten holt~~
- [x] ~~Neue Quellenart **`wissenschaft`** als vierte unbeteiligte Art:
      begutachtete Arbeiten, staatliche Institute (PTB, Fraunhofer, NIST,
      ESA), Normungsgremien jenseits von `standard`. Ohne sie wäre ein großer
      Teil der breiteren Nische unbelegbar gewesen — und dann wird die Regel
      nicht gebrochen, sondern umgangen. `presse` und `messung` bleiben
      draußen~~
- [x] ~~**Erste tote Regel gefunden und gestrichen:** `OFFIZIELLE_ARTEN` in
      `src/pruefung.ts` stand nur noch als `void OFFIZIELLE_ARTEN;` da. Ihr
      eigener Kommentar nannte sie „den Ort, an dem eine künftige Art
      eingeordnet werden muss" — als am selben Tag `wissenschaft` dazukam, hat
      sie das nicht geleistet und konnte es nicht, weil sie nichts prüft.
      Begründung an beide Stellen verschoben, nicht gelöscht~~
- [x] ~~`beleg-holen` nachgezogen, `npm run pruefen` grün~~

### Stufe 2 · Formate neu

- [x] ~~**Aus acht Formaten wurden vier**, sortiert nach Reaktion:
      `gibtswirklich` (Staunen), `absicht` (Empörung), `eswareinmal`
      (Korrektur), `werhatrecht` (Widerspruch). `empfehlung` bleibt außerhalb~~
- [x] ~~`heimlich` in `absicht` aufgegangen. Die alte Abgrenzung „gebaut gegen
      Betrieb" war sauber, löst beim Zuschauer aber dieselbe Reaktion aus — und
      sortiert wird nach Reaktion. Die Hausregel von `heimlich` gilt jetzt für
      ganz `absicht`: **Es muss in einem Dokument stehen**~~
- [x] ~~`neu` und `auchgekauft` gestrichen. **Beide Verluste sind im Code
      benannt statt weggelassen** — `auchgekauft` war die Vorarbeit fürs
      Empfehlen und muss später anders erarbeitet werden~~
- [x] ~~**`dubistdumm` ist keine Themengruppe, sondern eine Machart.** Das
      stand seit dem 17.08. so da, aber die Folgerung war zu klein: Die
      Schätzfrage passt vor jedes Thema. Sie steht jetzt als erste von fünf in
      `HOOK_MACHARTEN` — das bedient zugleich WATCH, das mehrere Hook-Varianten
      je Video verlangt~~
- [x] ~~**Der Wochentag ist weg.** `FORMATE[...].tag` gestrichen,
      `zeitplanBauen` rechnet wieder über die Listenposition. Grund: Die
      Retention-Ladder nennt geklonte Formate als Grund für Unterdrückung, und
      ein fester Wochentag ist ein Versprechen an ein Publikum, das es noch
      nicht gibt~~
- [x] ~~**Die Formatregel hat die Richtung gewechselt:** statt „jedes Format
      genau einmal je Lauf" jetzt „kein Format zweimal hintereinander"
      (Fehler) plus ein Hinweis ab der Hälfte. Die alte Regel wäre zum Zwang
      geworden — bei vier Formaten hätte sie jede Woche dieselben vier
      verlangt~~
- [x] ~~Gegentest über vier Fälle gefahren: zwei gleiche hintereinander →
      1 Fehler; dieselben verteilt → still; drei von fünf gleich → 1 Hinweis;
      alle verschieden → still. Die alte „Format fehlt"-Prüfung schlägt
      nirgends mehr an~~
- [x] ~~**77 Ideen umsortiert, keine verloren** — `gibtswirklich` 21,
      `absicht` 36, `eswareinmal` 10, `werhatrecht` 10. Aus acht Dateien
      wurden vier. Der RAMAC-Kommentar (verworfene Idee samt Begründung) ist
      mitgewandert~~
- [x] ~~Zwei neue Sachgebiete `raumfahrt` und `zeit` — und gleich mit Inhalt
      gefüllt. Vier Ideen umgetragen, die vorher als `rechner` oder `netz`
      falsch einsortiert waren. **Zwei leere Sachgebiete wären genau die
      Dekoration gewesen, die dieses Projekt sonst streicht**~~
- [x] ~~CLAUDE.md nachgezogen: Formattabelle, Sachgebiete, Quellenrang, Takt,
      Skill-Tabelle, Ausrichtung, Bildabschnitt. **713 → 708 Zeilen**, obwohl
      viel dazukam — der Bildabschnitt ist in `bild-bauen` ausgelagert~~
- [x] ~~`thema-finden` neu geschrieben: Humor und Rundlauf raus (stehen jetzt
      bei `FORMATE` und in `voice.md`), Formattabelle und Materialgrenze rein~~

### Stufe 3–6 · danach

- [x] ~~Stufe 3a: Figur geriggt — `src/figur.ts` (Vertrag), `daten/figur/`
      (Rig-Paket), `video/bausteine/Figur.tsx` (generischer Renderer),
      `posen.ts` (sechs Posen, Atmen, Blinzeln), `Requisiten.tsx`. Prüftisch
      als drei Kompositionen, `npm run pruefen` parst das Rig mit~~
- [x] ~~Stufe 3b: Längenfenster auf 18–34 s, `zaehlung` als Szenenfeld mit
      Anzeige in der Kopfzeile, zwei Bühnen (`figur`, `gegenueber`) nach der
      Regel „Vorgang statt Zustand", Kamera-Layer. Probe-Render: 1080×1920,
      30/1, beide Ströme, 23,06 s~~
- [ ] Stufe 4: ein Video ganz durch, Aufwand messen, **dann** den Takt festlegen
- [ ] Stufe 5: `thema-finden` und `rueckblick-lesen` schrumpfen, CLAUDE.md
- [ ] Stufe 6: aufräumen — `laeufe/` (68 MB), tote Felder und Regeln, Skripte
      ohne Aufgabe, und die Frage, ob die vier eigenen Skills dann noch tragen

## Nachbesserung aus der ersten Sichtung · 24.08.2026

Alle sechs Punkte kamen vom Zuschauer, keiner aus der Prüfung. Das ist das
Muster: Was formal grün ist, sieht deshalb noch nicht richtig aus.

- [x] ~~**Zahlen stehen als Ziffer**, auch im Sprechtext. Der Untertitel hat es
      vorgeführt: „Zweitausendneun:" füllte die Zeile, wo „2009:" reicht. Der
      Sprechtext *ist* der Untertitel — was sich schlecht liest, ist falsch
      geschrieben, auch wenn es sich gut anhört~~
- [x] ~~**Zielwert 30 s statt 23, Fenster 20–36 statt 18–34.** Der Zielwert war
      die Ursache für den Telegrammstil: sechs Szenen in 23 Sekunden lassen je
      Satz vier Sekunden. Die Obergrenze geht mit, weil sechs Prozent Streuung
      bei 30 s ±1,8 s sind und 34 damit im Wurfbereich läge~~
- [x] ~~**Jeder gesprochene Satz hat ein Verb** (`voice.md`). Die alte Vorgabe
      „zwei bis sechs Wörter" und „Ellipsen sind die Stimme" hat den
      Telegrammstil nicht erlaubt, sondern erzwungen~~
- [x] ~~**Symbol und Figur standen beide bei x = 138.** Im fertigen Video lag
      der Stempel hinter der Figur. Der Renderer biegt `stand: 'rechts'` bei
      einem Symbol jetzt um, und das Schema lehnt die Kombination ab — dort
      fällt sie beim Schreiben auf~~
- [x] ~~**Die Figur konnte nicht lächeln.** Das Rig kannte vier Mundformen, und
      keine davon war ein deutliches Lächeln. `mund_laecheln` dazu, gesetzt in
      `ruhe`, `zeigen`, `erklaeren` und `winken`; `achselzucken` verliert den
      Mundwinkel nach unten~~
- [x] ~~**`hochschauen` und `erklaeren` zum ersten Mal im Bild** — die kleine
      Figur am unteren Rand und der Zeigestab standen seit dem 23.08. im Rig,
      aber in keinem Video~~
- [ ] Offen: Wie ElevenLabs „2009" ausspricht, ist **nicht** geprüft — hörbar
      nur beim Ansehen. Falls die Stimme Ziffern buchstabiert, braucht es eine
      Ausnahme für Jahreszahlen

## Zweite Sichtung · 24.08.2026

- [x] ~~**Der Arm greift ins Symbol.** Die Symbolposition x = 138 war an der
      Pose `zeigen` gerechnet — bei `achselzucken` stehen beide Arme ab, und
      die Hand lag in der Uhr. Die Zahl war nicht falsch gerechnet, sondern an
      der falschen Pose gemessen. Symbol jetzt bei 152 und 0,40 statt 0,46,
      Figur bei 52 statt 62~~
- [x] ~~**Der Zeigestab ist weg** — samt `'stab'` im Schema, der Zeichnung, den
      sieben Entwürfen, die ihn benutzt haben, und den Ausnahmen in
      `pruefung.ts`. Die Pose `erklaeren` bleibt: ausgestreckter Arm zum Bild~~
- [x] ~~**Der Spruch steht wieder in der Mitte**, unter dem Schlusssatz, mit
      der Figur in Zeilenhöhe daneben. Ohne blauen Strich und ohne zweite
      Wortmarke — der Strich war das Signal „fertig", nicht der Spruch~~
- [x] ~~**Die Signatur ist eine Geste geworden:** ein kurzer Strich von 96
      Pixeln wird in einer halben Sekunde gezogen, darunter der Spruch, rechts
      daneben die Figur, die darauf zeigt. Der Unterschied zum alten Abspann
      liegt in der Länge — ein Strich über die ganze Breite trennt Pointe und
      Absender, ein kurzer zeichnet den Spruch aus~~
- [x] ~~**Die Figur steht unter dem Spruch statt daneben**, am rechten Ende
      der Zeile, und sieht zu ihm hoch. Nebeneinander teilen sich Zeile und
      Figur eine Grundlinie, die zu keinem von beiden gehört — untereinander
      stellt sich die Frage nicht~~
- [x] ~~**Zwei neue Zeichnungen:** `satellit` statt `mond` für den Weltraum —
      der Mond zeigt den Himmel, aber niemanden, der dort etwas gebaut hat —
      und `chip` statt `haken` für die strahlungsfesten Bauteile: Der Haken
      sagte „stimmt", statt zu zeigen, wovon die Rede ist~~
- [x] ~~**Die Figur steht rechts neben der Signatur**, größer, vertikal
      zentriert, lächelnd und ohne Zeigegeste. Sie hat vier Plätze durchlaufen;
      die Begründung steht bei `Schluss` in `video/szenen/index.tsx`~~

## Takt festgelegt · 24.08.2026

- [x] ~~**Vier Videos je Woche.** Nicht geschätzt, sondern über den Engpass
      hergeleitet: Der Ideenvorrat trägt neun Wochen (77 Ideen, je Format mit
      dem Minimum gerechnet), die Formatregel erlaubt vier ohne Wiederholung,
      die Produktion schaffte 26 und ElevenLabs 240. **Die Grenze ist der
      Vorrat, nicht die Produktion** — und damit ist die offene Frage aus
      Stufe 4 beantwortet~~
- [ ] Vorrat nachfüllen, sobald ein Format unter sechs offene Ideen fällt.
      `eswareinmal` und `werhatrecht` stehen bei zehn
