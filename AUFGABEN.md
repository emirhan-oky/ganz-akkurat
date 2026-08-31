# Aufgaben

Die laufende Aufgabe ist mit `▸` markiert. Diese Liste steht am Ende jeder
Antwort im Chat — die Statuszeile bleibt dafür frei. Erledigtes wird
durchgestrichen, nicht gelöscht: So bleibt sichtbar, was der Umbau alles
berührt hat.

**Die Abschnitte sind Historie, die Liste am Ende ist der Stand.** Bis zum
31.08.2026 hatte fast jeder Abschnitt eine eigene „Offen"-Sektion; offen ist
seitdem nur noch, was unter `# Offen · Stand 31.08.2026` steht.

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

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*

- [x] ~~**Vorschaubild bei TikTok: nichts zu machen.** Buffer schreibt es ins
      eigene Schema — die Netze nehmen keine hochgeladenen Titelbilder an und
      lehnen jedes Video ab, das eines mitschickt. Was geht, tun wir schon:
      `thumbnailOffset: 1000` wählt das Bild bei Sekunde 1, also im Aufschlag.
      Instagram hält sich daran, TikTok sucht sich trotzdem sein eigenes. Der
      Befund steht an der Codestelle~~


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

### Danach

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*

- [x] ~~Stufe 2: `LAENGE_SEK.ziel` von `[18, 28]` auf `[18, 30]` — **überholt**.
      Das Fenster steht heute bei 42–67 s mit vier Zielwerten je Bauform~~
- [x] ~~Stufe 3.1: Kamera-Layer und Übergänge — **verworfen**, gerechnet:
      Ein Schwenk kostete elf Prozent Figurengröße. Ersatz ist das Hinlehnen~~
- [x] ~~Stufe 3.2: Typografie und Farbe · 3.3: Zeichnungen als Zustände —
      erledigt im Theaterrot und im Figurenumbau vom 31.08.~~
- [x] ~~Stufe 4: `EINGEFROREN.md` in `~/Desktop/horizont-bench` — der Bench
      existiert nicht mehr~~

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

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*

- [x] ~~Arbeitsstruktur: Skill „Beleg holen", Subagent „Belegprüfer",
      CLAUDE.md gekürzt — alle drei stehen~~
- [x] ~~In drei bis vier Wochen wiederkommen: 15 Videos draußen, 11 mit
      Haltekurve. Die Aussage steht, und sie hat den Nordstern gewechselt~~

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
- [x] ~~Stufe 4: ein Video ganz durch, Aufwand messen, dann den Takt festlegen
      — erledigt am 24.08., der Takt steht bei vier je Woche~~
- [x] ~~Stufe 5: `thema-finden` und `rueckblick-lesen` schrumpfen, CLAUDE.md~~
- [x] ~~Stufe 6: aufräumen — teilweise. Was übrig ist, steht in der Liste am
      Ende: `laeufe/` ist inzwischen 235 MB in einem einzigen Ordner~~

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
- [x] ~~Die Aussprache der Ziffern ist beim Ansehen bestätigt: Die Stimme liest
      „2009" als Jahreszahl. Das Problem war allein die ausgeschriebene
      Fassung im Untertitel~~

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

## Stufe 5 · Doku entdoppelt · 24.08.2026

- [x] ~~`rueckblick-lesen`: Die Rechnung „acht Formate, acht Videos die Woche"
      war seit dem 20.08. falsch und sah weiter plausibel aus. Jetzt am Takt
      gerechnet: Median nach zwei Wochen, Formatvergleich nach fünf~~
- [x] ~~`thema-finden`: Materialgrenze und breitere Nische stehen im Vertrag,
      hier bleibt nur die Folge fürs Arbeiten. Der Ideenvorrat trägt jetzt den
      Hinweis, dass an ihm der Takt hängt~~
- [x] ~~CLAUDE.md: „je Sendeplatz" und die zweite Wortmarke im Nachschlag
      waren Reste aus zwei Umbauten~~

## Stufe 6 · aufgeräumt · 24.08.2026

- [x] ~~**`laeufe/` von 127 auf 19 MB.** Die acht Videos vom 23.08. waren ein
      Neurender, der nie veröffentlicht wurde (kein `veroeffentlicht.json`) und
      mit der Schriftrückkehr ohnehin überholt ist. Props, `lauf.json` und die
      Tonspuren liegen vollständig — ein `--ton-behalten` baut sie in drei
      Minuten neu, ohne Kontingent~~
- [x] ~~**`symbol` gestrichen**, das Feld für die stehende Zeichnung unter dem
      Satz. Die Entscheidung stand ausdrücklich im Schema auf Stufe 4 vertagt,
      weil man ein Feld nicht streicht, bevor sein Nachfolger an einem fertigen
      Video gemessen ist. Er ist gemessen, und kein Entwurf setzte es noch~~
- [x] ~~**Szenenart `hook` gestrichen.** Sie stand seit dem 17.08. als
      erledigt im Vertrag, trotzdem weiter im Schema — und ohne Zweig im
      Renderer. Ein Short mit `art: 'hook'` wäre durch die Prüfung gegangen~~

## Banner auf der Handyansicht · 25.08.2026

- [x] ~~**Der Freiraum ist die Silhouette des Textblocks**, kein Rechteck um
      ihn herum. Der Block ist oben 308 breit (Akkus), in der Mitte 800 (der
      Satz) und unten 510 (Strich und Spruch); ein Rechteck von 790 × 330 hielt
      daneben Fläche frei, in der nichts steht — und genau die zeigt das
      Telefon~~
- [x] ~~**Geprüft wird der Kasten eines Musterteils, nicht sein Ankerpunkt.**
      Der pauschale Rand von 90 Pixeln reichte für eine Leitung nicht, die 230
      nach rechts wächst, und war für ein kleines Dreieck dreimal zu viel~~
- [x] ~~**Das Muster ist innen dicht und außen dünn.** Gleichverteilt lag der
      größte Teil dort, wo ihn niemand sieht: Auf dem Telefon zeigt YouTube nur
      1235 × 338 von 2048 × 1152~~
- [x] ~~**Zwei Markenbilder statt vier.** Das dunkle Profilbild und die
      freigestellte Wortmarke sind gestrichen — samt Komposition und
      Komponente, nicht nur aus dem Skript. Beide standen auf Vorrat für Fälle,
      die es nicht gibt: ein helles Kanalbild, das im Feed verschwindet, und
      ein Impressum. Sie kommen nicht wieder~~

## Kanaltexte neu · 25.08.2026

Die Bio stand auf dem Stand vom 17.08. und nannte den Gegenstand nicht: Das Wort
„Technik" kam in keiner der drei Zeilen vor. Seit Instagram über Suchwörter
findet, ist das die teuerste Lücke — die Aufzählung der Quellenarten war
Katalogsprache.

- [x] ~~Neue Bio für alle drei Plattformen: „Technikfakten, die niemand
      nachliest. / Wir schon 📄"~~
- [x] ~~`marke-texte.md` nachgezogen: TikTok, Instagram, YouTube, Name-Feld,
      Kontakt, die überholte Takt-Regel~~

## Die erste fordernde Regel · 26.08.2026

1693 Zeilen Prüfung suchten bis heute ausschließlich Verbotenes. Deshalb wurde
`npm run pruefen` bei neun Videos grün, die 0-mal geteilt wurden.

- [x] ~~**Zweistimmigkeit**: mindestens zwei Szenen je Short tragen beide
      Stimmen, außer bei `einstimmig` — den begrenzt die Drittelregel im Lauf.
      Ein Mindestmaß, kein Muster: „immer beide" wäre nach vier Videos wieder
      die Schablone, gegen die der Umbau läuft~~
- [x] ~~**Reaktionszeile**: mindestens eine Zeile mit `machart` je Short, und
      keine Machart zweimal. Geprüft wird nicht, ob es witzig ist, sondern ob
      der Platz benutzt wurde — dieselbe Bauart wie die Belegregel~~
- [x] ~~**Bauform laufweit**: keine zweimal hintereinander (Fehler), ab sechs
      Shorts keine über ein Drittel. Die Grenze bei sechs ist nicht Vorsicht,
      sondern Rechnung: Bei vier Shorts hieße ein Drittel vier verschiedene
      Bauformen je Woche — derselbe Zwang, an dem die alte Formatregel
      gescheitert ist~~
- [x] ~~Alle vier Regeln an manipulierten Shorts gegengeprüft: jede feuert, und
      der unveränderte `passwort-wechseln` bleibt still~~
- [x] ~~**`erstes-laden` umgeschrieben** — Wechselrede, vier Reaktionen in vier
      Macharten, 40,4 s. Zwei Bildfehler fand erst das Standbild und beide sind
      jetzt Regeln: kein Symbol neben zwei Figuren, kein `zeigen` im
      Wortwechsel, und nie beide Figuren gleichzeitig ausgreifend~~
- [x] ~~Fehlalarm der Zeitregel abgestellt: „empfiehlt heute, vorher zu
      unterbrechen" wurde nach `ohneSatzzeichen` zu „heute vor…". Die Wendung
      wird jetzt samt ihrer Zeitspanne gesucht — ein Fehlalarm auf der starken
      Seite lädt dazu ein, den Sprechtext gegen die Sprache zu verbiegen~~
- [x] ~~**`ersatzteil-freischalten` umgeschrieben** — Wechselrede, vier
      Macharten, 36,2 s. Der Beleg der dritten Szene ist dabei auf die
      Fundstelle gewandert, die das gesprochene Wort wirklich trägt~~
- [x] ~~**`video/Wortwechselprobe.tsx`** — der Prüftisch, der die Posenfrage
      einmal für das ganze Vokabular beantwortet: `zeigen`, `erklaeren` und
      `achselzucken` greifen in die andere Figur, die übrigen sieben nicht.
      Davor standen zwei engere Regeln da, jede aus einem Standbild
      geschlossen, und beide waren zu eng~~
- [x] ~~**`raumstation-alte-rechner` ist der erste Short der Bauform
      `stationen`** — und war es vorher schon: sechs Zuspitzungen und
      Kipppunkte hintereinander sind eine steigende Aufzählung. Das Etikett
      `einstimmig` hat nur nicht beschrieben, was dasteht. Fünf Szenen bleiben
      einstimmig, damit die vier Zeichnungen im Bild bleiben; Watti tritt an
      drei Stellen dazu. 48,2 s~~
- [x] ~~**`npm run pruefen` ist wieder grün, ohne einen einzigen Hinweis** —
      zum ersten Mal seit der fordernden Regel~~
- [x] ~~In der `zahl`-Szene schrumpften die Figuren: Zahl und Bedeutung nahmen
      die Höhe, die Bühne bekam den Rest. Gelöst im Szenentyp — steht eine
      Zeichnung darunter, geht die Zahl auf 68 Prozent und der Abstand von
      `l` auf `m`. Am Standbild gemessen: 230 Pixel Figur vorher, 290 nachher,
      gegen 400 in den Textszenen desselben Shorts. **Die Lücke bleibt, und
      zwar begründet:** Das `<svg>` füllt seinen Kasten nur zu drei Fünfteln,
      jeder gewonnene Pixel bringt also 0,6 Pixel Figur — für die restlichen
      110 müsste die Zahl auf hundert Pixel schrumpfen, und dann trägt die
      `zahl`-Szene ihren eigenen Gegenstand nicht mehr. Die Überlaufmessung in
      `Buehne.tsx` ist nicht angefasst worden~~
- [x] ~~**`npm run laengen`** — Länge gegen Verweildauer. Anlass: `laengeSek`
      stand seit Wochen in `daten/rueckblick.json` und wurde von keiner
      Auswertung gelesen. Ohne das hätte die Entscheidung „erst messen, dann
      über die Zielwerte reden" Daten gesammelt, die niemand ansieht.
      Gerechnet wird `durchsicht × laengeSek`, weil die Prozent-Durchsicht mit
      der Länge zwangsläufig sinkt — sie beantwortet die Frage, bevor sie
      gestellt ist~~
- [x] ~~`Herkunft` trägt jetzt `bauform`, **optional**: Die Läufe vor dem
      25.08.2026 kennen das Feld nicht, und ein Pflichtfeld hätte jeden alten
      Lauf durch `safeParse` fallen lassen — samt Format und Aufschlag der
      neun veröffentlichten Videos~~
- [x] ~~**Der Längenversuch bis Oktober ist aufgesetzt.** Die Zielwerte sind
      auf 25 / 35 / 45 / 60 gespreizt — vorher fielen drei von vier Bauformen
      in dieselbe Längenklasse, und die Streuung hing allein daran, wie oft
      `stationen` drankam. Keine der vier Zahlen ist gemessen; sie stehen als
      Versuchsaufbau im Code und im Vertrag~~
- [x] ~~`LAENGENKLASSEN` in `src/zeit.ts`, **aus `BAUFORMEN` abgeleitet**:
      Grenze jeweils in der Mitte zwischen zwei Zielwerten. Eine zweite,
      handgeschriebene Einteilung wäre eine Doppelung ohne Wache~~
- [x] ~~Laufregel: Hinweis, wenn ab drei Shorts alle in derselben Klasse
      liegen. Hinweis und kein Fehler — „Länge ist eine Folge davon, wie viel
      es zu zeigen gibt" bleibt die stärkere Regel. Beide Richtungen
      gegengeprüft~~
- [x] ~~`npm run laengen` zeigt jetzt auch „je Format", eindimensional. Format
      mal Länge wären zwölf Felder mit je drei Videos bis Oktober — Rauschen~~
- [x] ~~**Sprecherwechsel-Pausen zählen mit.** Es waren 1,2 bis 1,6 s je Short,
      nicht 1,1: 0,28 s je Wechsel innerhalb einer Szene plus 0,13 s Aufschlag
      an jeder Szenengrenze mit Wechsel, wo die Vertonung schneidet statt zu
      atmen. `SPRECHERWECHSEL_SEK` und `SZENENTRENNER_SEK` stehen jetzt in
      `src/zeit.ts` — Längen wohnen dort, und `stimme.ts` importiert sie~~
- [x] ~~Gerechnet wird **je Szene** (`zusatzpausenSzene`), nicht nur als Summe:
      Sonst hätte `geschaetzteDauerSek` die Pausen gezählt und `szenenZeitplan`
      nicht, und der tonlose Render wäre kürzer gewesen als die Zahl, gegen die
      die Längenprüfung misst~~
- [x] ~~**Wache über der Doppelung**: `npm run pruefen` hält `zusatzpausenSek`
      und die `pauseDavorSek` aus `redelaeufe` je Short gegeneinander. Aufrufen
      lässt sich die eine von der anderen nicht — `stimme.ts` importiert
      `node:buffer`, die Schätzung läuft im Browser. Gegenprobe: Bei halbiertem
      Wechselwert meldet sie alle vier Shorts~~
- [x] ~~`npm run sprechprobe` rechnet die Pausen ebenfalls mit, sonst hätte die
      Spreizungswarnung eine fehlende Zeile als Textproblem gemeldet~~
- [x] ~~Regieanweisungen an die Macharten binden. Das war der Grund für den
      Wechsel auf `eleven_v3`. `regie` steht in `REAKTIONS_MACHARTEN`,
      `syntheseText` wählt daraus — **nur im Synthesetext**, `sprechtext`
      bleibt unberührt~~
- [x] ~~Wache über der Doppelung `Redeanteil.machart` ↔ `REAKTIONS_MACHARTEN`.
      Ableiten geht nicht (das Enum steht tausend Zeilen früher als die Liste),
      also eine Typwache: wer eine Machart hinzufügt und das Enum vergisst,
      bekommt einen `tsc`-Fehler. Dazu die Klammerwache: keine eckigen Klammern
      im Sprechtext, sonst zählt `ZEICHEN_PRO_SEKUNDE` sie als gesprochen~~
- [x] ~~Ein **Vorrat** statt eines festen Tags je Machart, gewählt
      deterministisch aus `id` und Machart. Ein fester Marker wäre nach vier
      Wochen eine Schablone — dieselbe Begründung wie beim Ausruf~~
- [x] ~~Die sechs geratenen Tags wieder raus. `[confused]` stand seit dem 25.08.
      als *das* Beispiel in `stimme.ts` und in dieser Datei — **und es
      existiert in der ElevenLabs-Doku nicht.** Aus dem Gedächtnis gewählt,
      also genau das, was das Projekt bei Quellen verbietet~~
- [x] ~~`npm run stimmprobe-v3` gelaufen (2.600 Zeichen). **Beide Messgrößen
      tragen nicht.** Die Dauer streut um 20 % bei derselben Zeile, damit ist
      kein Reglereffekt zu sehen; die Klammerspanne ergab in zwei Läufen zwei
      verschiedene Ordnungen (`[snorts]` 1,20 dann 0,44) und stufte `[laughs]`
      als still ein. Ein Lachen ist per Definition Ton~~
- [x] ~~Daraus die Planänderung: **Das Sieb gehört ans Ende, nicht an den
      Anfang.** Ob ein Tag Ton erzeugt, fällt in der Blindwahl ohnehin auf, und
      die Sekundenfrage stellt sich erst für die zwei bis drei Tags, die
      wirklich in einen Vorrat kommen~~
- [x] ~~Die Reglerstufen gehört. **0,45 klingt ideal**, die Zahl bleibt — aber
      erstmals aus einem Vergleich statt aus der v2-Zeit. Der Kommentar an
      `KANAL_STIMME` sagt das jetzt auch~~
- [x] ~~Das Durchhören der 18 `sieb-*.mp3` **gestrichen**, und zwar als eigener
      Fehler: Zwei Punkte weiter oben steht „das Sieb gehört ans Ende", und
      danach habe ich es trotzdem vorne verlangt. Die Frage nach Ton ist eine
      Buchhaltungsfrage und stellt sich erst für die zwei bis drei Tags, die
      wirklich in einen Vorrat kommen. Achtzehn vorab durchzuhören wäre
      sechsfach vergebene Arbeit gewesen — und sie sieht beim Anfordern
      gründlich aus~~
- [x] ~~`stability 0` gegen `1`: **deutlich verschieden.** Die Stimme reagiert
      auf den Regler, wir stehen also nicht auf der robusten Stufe, die laut
      Doku Regieanweisungen dämpft. Die Blindwahl hat damit etwas zu finden~~
- [x] ~~Erster Lauf mit Ton am 30.08.2026, ohne Tags. **Zwei von vier
      gerendert, vier Fehler.** Der teuerste Befund war nicht einer der vier:
      `npm run pruefen` rief nur `shortPruefen` je Short und **nie**
      `laufweiteBefunde`. Die laufweiten Regeln liefen damit erst im
      Wochenlauf, also nach der Vertonung — genau der Fehler, den der
      Kommentar über der Stelle für behoben erklärt. 2.199 Zeichen für zwei
      Fehler, die keine Tonspur brauchten. Behoben: `schemapruefung.ts` ruft
      jetzt `laufPruefen`~~
- [x] ~~`ZEICHEN_PRO_SEKUNDE` von 13,0 auf **14,3**, die im Kommentar
      angekündigte Nachmessung. 2.111 Zeichen aus vier Shorts gegen die 800,
      auf denen die 13,0 standen. Die Schätzung lag durchweg ein Zehntel zu
      hoch — Raumstation 49,9 s geschätzt, 43,2 s gerendert~~
- [x] ~~`passwort-wechseln` auf die Bauform `zitatkarte`. Drei Wechselreden
      unter vier Shorts lassen sich nicht anordnen, ohne dass zwei
      nebeneinander stehen; eine musste wechseln. Der Short zitiert das BSI
      wörtlich, also trägt er die Karte. Nebenbei löst das den
      Längenklassen-Hinweis: 45 s statt 35 s Zielwert~~
- [x] ~~Aufschlag von `passwort-wechseln` gemessen 4,0 s bei höchstens 3,5.
      Jetzt einstimmig; Wattis „Bin bei Passwort7." steht in Szene 3, wo
      „Passwort8 kriegt ein Ausrufezeichen" ohnehin erst dadurch Sinn ergibt~~
- [x] ~~Drei verbotene Posen im Wortwechsel von `passwort-wechseln`~~
- [x] ~~Zweiter Lauf mit Ton. `passwort-wechseln` hat einen neuen Sprechtext,
      also greift `--ton-behalten` nicht — der Lauf synthetisiert alle vier neu~~
      *(zusammengefasst in „Der erste Short mit vollem Ton" am Ende)*
- [x] ~~**Die Zitatkartenszene zeigt keine Figuren.** Der Vertrag sagt über die
      Bauform „die beiden Figuren reden darüber"; `SzeneZitatkarte` nimmt kein
      `buehne`, und der Renderer zeichnet nur die Karte. Zweistimmig ist die
      Szene trotzdem — man hört beide und sieht sie nicht. Dieselbe Sorte
      Lücke wie seinerzeit `hook`: im Vertrag beschrieben, im Renderer nicht
      gebaut~~
      *(erledigt 31.08. nachts: `mitIllustration` im Schema, Bühne im Renderer, `minHeight` an beiden Enden)*
- [x] ~~Erst dann die Blindwahl (`regieprobe`, neu zu schreiben): je Machart die
      echte Zeile und eine tonlos geschriebene, vier unbeschriftete Fassungen
      samt der ohne Ansage, zweiter Durchgang für die Überlebenden~~
      *(steht als „Blindwahl für die Regieanweisungen" in der Liste am Ende)*
- [x] ~~Die Bauform `stationen` an einem echten Thema gebaut~~
- [x] ~~Bildtexte von `passwort-wechseln` an den neuen Sprechtext angeglichen:
      „Oft schwächere Passwörter" → „Vorhersehbare Passwörter" (das gesprochene
      Wort), „Stark. Einzigartig." → „Stark. Und nirgendwo sonst.", „Beim
      Hinweis. Dann ja." → „Nur bei Verdacht.". Der Aufschlag behält
      „Passwort wechseln?" — dort steht der `suchbegriff` im Bild~~

## Das Bild zuerst · 31.08.2026

Die ersten zwei Videos im neuen Bau lagen gerendert vor, und das Urteil war
deutlich: „Das größte Problem ist der Stil der Videos. Die sind furchtbar."
Dazu drei konkrete Punkte — sie sollen miteinander sprechen, die Pausen sind zu
lang, die Körper verschwinden. Alle drei sind nachgemessen und alle drei waren
Fehler mit einer Zahl.

**Die Reihenfolge dreht sich damit um: erst das Bild.** Was die Figuren können,
entscheidet, wie Gespräche geschrieben werden — nicht umgekehrt.

### Gemessen, bevor etwas angefasst wurde

- [x] ~~**Die langen Pausen waren nicht die Sprecherpausen.** Die Wechsel lagen
      exakt auf 0,28 und 0,45. Die längsten Pausen (2,19 / 2,13 / 1,94 s)
      saßen zwischen zwei Sätzen **derselben** Figur — der Szenentrenner
      ` ... `, dessen Kommentar „gemessene 0,86 Sekunden" nannte. Gemessen an
      `eleven_multilingual_v2`. In `raumstation` waren das 14 % des Videos~~
- [x] ~~**Die Figuren wurden rechnerisch zwingend abgeschnitten.** 104
      Einheiten breit (Watti 125 durch die Stauchung), Standpunkte 42 und 158,
      Feld 5,7–194,3 → Voltis linke Kante bei −10, Wattis rechte bei 220.
      Beide verloren ihre äußere Hand, und in der Mitte blieben 1,6 Einheiten~~
- [x] ~~**Vortrag statt Gespräch:** Volti spricht 13,9 s am Stück und trägt
      83 % der Zeichen. `zweistimmigkeit` war dabei grün~~
- [x] ~~**„Sie bewegen sich ständig gleich" hat eine Zahl:** zehn Posen, drei
      im Wortwechsel gesperrt, `winken` nie benutzt — sechs nutzbar, davon
      tragen vier drei Viertel aller Nennungen~~

### Gebaut

- [x] ~~`wortwechselKanten` in `Buehnenbild.tsx` — die Randbedingungen als
      Rechnung statt als Schätzung, mit `ZEIGER_BREITE` und `ZEIGER_HOEHE` aus
      `zeiger.ts` statt abgeschriebener Zahlen~~
- [x] ~~`Wortwechselstaende` als zweiter Prüftisch: vier Anordnungen
      nebeneinander, jede mit ihren gerechneten Kanten. **Ergebnis: g 0,75,
      Lücke 20,2** — bei 10,5 liegt Voltis Hand auf Wattis Gehäuse~~
- [x] ~~**Die Posensperre ist gefallen.** `zeigen`, `erklaeren` und
      `achselzucken` greifen bei der neuen Anordnung nicht mehr hinüber. Zehn
      statt sechs nutzbare Posen, ohne eine einzige neue zu bauen~~
- [x] ~~`(Volti)` und `(Watti)` über den Figuren, im SVG statt in HTML. Beide
      dauerhaft, der Sprechende leuchtet~~
- [x] ~~`Sprecherstand.tsx` — wer spricht, als Context statt als Prop über vier
      Ebenen. Gerechnet auf der **absoluten** Zeitachse, weil `useCurrentFrame`
      in einer `Sequence` bei 0 beginnt~~
- [x] ~~**Die Sprechblase ist weg.** Bei zwei Figuren im Bild sah sie mit dem
      Untertitel nicht aus. Das Bauteil bleibt vollständig im Code~~
- [x] ~~Die Bühne bekommt die 270 Pixel Untertitelzone zurück, wenn kein
      Untertitel unten steht. **Die Überlaufmessung ist unangetastet** — nur
      der Platz kommt von außen statt aus einer Konstante. Die Figuren werden
      dadurch fast doppelt so groß, ohne dass an der Skalierung etwas geändert
      wird~~
- [x] ~~**Sprechbewegung:** Blickkontakt zur Mitte, Mund im Sprechrhythmus,
      leichtes Wippen. Der erste Anlauf war ein Sinus bei 2,6 Hz — nachgemessen
      drei verschiedene Abschnittslängen auf 52, also ein Metronom. Zwei
      überlagerte Frequenzen (2,6 und 4,1) ergeben 4–9 Bilder und sechs
      verschiedene Längen~~
- [x] ~~**`redelaeufe` schneidet an jeder Szenengrenze.** Kein ` ... ` mehr im
      Text; die Pause ist ein Versatz im Schnitt. `SZENENTRENNER_SEK` (0,45)
      und `SZENENTRENNER` sind entfallen, `SZENENGRENZE_SEK` ist 0,32. **Damit
      ist die Pausenlänge die erste Größe hier, die sich ohne Kontingent
      nachjustieren lässt**~~
- [x] ~~`sprechtextZusammenfuegen` entfernt — die Funktion hat zuletzt nichts
      mehr vertont und zählte für `zeichenverbrauch` Trennerpunkte mit, die nie
      an die Synthese gingen. Jetzt über `redelaeufe`~~
- [x] ~~Die Pausenwache in `schemapruefung.ts` zählt jede Szenengrenze, nicht
      nur die mit Wechsel — und rechnet über `SZENENGRENZE_SEK` statt über eine
      abgeschriebene 0,32~~
- [x] ~~**Zwei fordernde Regeln:** `redelauf` (höchstens 6 s am Stück) und
      `stimmanteil` (höchstens zwei Drittel). Beide ohne Ton prüfbar, beide
      gesetzt und nicht gemessen. **Alle vier Entwürfe fallen durch** — eine
      Regel, die den Bestand grün lässt, hätte nichts gefunden~~
- [x] ~~Längenfenster 20–65 → **42–67 s**~~
- [x] ~~`gibtswirklich` verliert den Freibrief „brauchen keine Pointe — die
      Sache selbst ist die Pointe". Der Satz hat den Umbau vom 25.08.
      unangetastet überlebt, obwohl der ganze Umbau gegen ihn lief~~

### Offen

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*

- [x] ~~**Die vier Entwürfe nach dem neuen Maßstab umschreiben.** Anrede
      („Watti, …"), zweite Person, Rückbezug auf ein Wort der Vorzeile,
      Reaktionspartikel. Voltis lange Belegsätze zerfallen in Frage und
      Antwort; die Frage gehört Watti~~
      *(erledigt 31.08. nachts)*
- [x] ~~**Die Zitatkartenszene zeigt keine Figuren.** Der Vertrag sagt „die
      beiden Figuren reden darüber"; `SzeneZitatkarte` nimmt kein `buehne`~~
      *(erledigt 31.08. nachts: `mitIllustration` im Schema, Bühne im Renderer, `minHeight` an beiden Enden)*
- [x] ~~Zweiter Lauf mit Ton, erst nach dem Umschreiben~~
      *(zusammengefasst in „Der erste Short mit vollem Ton" am Ende)*
- [x] ~~Die Bauformen gegen das neue Fenster: 25 / 35 / 45 / 60 liegen zu drei
      Vierteln darunter. Entschieden wird, wenn das Bild steht~~
      *(erledigt 31.08. nachts: 45 / 52 / 62 gegen 42–67 s)*

## Das Maximum des Figurenstils · 31.08.2026, abends

Die Frage nach dem ersten Bildumbau: „Ist das das Maximum an dynamischen
Bewegungen?" **Nein — es war etwa ein Drittel.**

### Was ungenutzt dalag

- [x] ~~**`TEMPO.feder` hat nie gefedert.** `damping 200` bei einer kritischen
      Dämpfung von 17,0 — **11,8-fach überdämpft**, Maximum 100,00 % über 90
      Bilder. Eine Rampe, keine Feder. In `Kamera.tsx` steht dazu wörtlich die
      Begründung „ein Arm, der federt, wirkt lebendig"~~
- [x] ~~**Die Beine waren tote Gelenke:** ±12° verfügbar, in keiner der zehn
      Posen benutzt~~
- [x] ~~**Die Brauen hatten kein Gelenk** — Teile ohne Beweglichkeit, und damit
      die größte ungenutzte Ausdrucksfläche der Figur~~
- [x] ~~**Drei Posen rissen ihre Gelenkgrenzen und wurden stumm abgeschnitten:**
      `achselzucken` wollte ±40 an den Unterarmen und bekam ±15, `winken` −28
      und bekam −15. `posenPruefen` prüfte nur, **ob** ein Gelenk existiert,
      nicht ob der Winkel hineinpasst~~

### Gebaut

- [x] ~~`FIGURENFEDERN` in `src/marke.ts`: `heute` / `gefasst` / `cartoon`.
      **`TEMPO.feder` bleibt unangetastet** — die Probe wählt, die Produktion
      erbt erst nach der Entscheidung~~
- [x] ~~`poseAus` nimmt eine Feder entgegen, dazu `nachzug` (Overlapping:
      Unterarm 2, Hand 4 Bilder später) und `ausholung` (Anticipation als
      negatives `t` in den sechs Bildern davor)~~
- [x] ~~`gewicht`, `atemvolumen`, `aufprall` in `bewegung.ts` — Standbein und
      Spielbein über zwei Frequenzen, volumenerhaltendes Squash & Stretch~~
- [x] ~~`dehnung` als eigenes Feld neben `stauchung`. **Nicht** als Erweiterung
      von `stauchung`: Ein blinzelndes Auge wird flach und nicht breit~~
- [x] ~~Zwei Braugelenke, Pivot am **inneren** Ende. Der erste Anlauf setzte
      ihn außen — die Pfade laufen von außen nach innen, und die Richtung fällt
      an einer Zahl nicht auf~~
- [x] ~~Gelenkgrenzen geweitet: Unterarme ±60 statt ±15, Oberarme ±120 statt
      ±105. Diese Figur hat keinen Ellenbogen; was dort „Überstreckung" heißt,
      ist eine Designentscheidung~~
- [x] ~~`posenPruefen` prüft jetzt auch die Winkelgrenzen~~
- [x] ~~`video/Bewegungsprobe.tsx` — fünf Blöcke: Feder, Prinzipien, tote
      Gelenke, Brauen, Gesamtvergleich~~

### Und der Fehler, den das Weiten sichtbar gemacht hat

- [x] ~~**Drei Posen ragten im Wortwechsel aus dem Bild**, zwei davon schon vor
      dem Weiten. `wortwechselKanten` rechnete gegen die **Ruhepose** —
      `achselzucken` reicht aber 76,7 Einheiten nach außen statt 52, `staunen`
      63,9. Eine Stufe unter dem Fehler vom 26.08. („nicht die breiteste,
      sondern die weiteste Pose")~~
- [x] ~~`AUSSENREICHWEITE` je Pose, aus der Gelenkkette gerechnet;
      `zuBreiteWortwechselposen` leitet die Sperre daraus ab, und
      `schemapruefung.ts` hält beide gegeneinander. **Die dritte
      handgeschriebene Liste in einer Woche wäre die dritte still falsche
      gewesen**~~
- [x] ~~Anordnung von 0,75 · 43/149 auf **0,70 · 45/146**. Sieben Prozent
      Größe holen `staunen` (zehn Nennungen, die meistgenutzte Pose) und
      `hochschauen` zurück; die Lücke wächst dabei von 20,2 auf 20,9~~
- [x] ~~`achselzucken` bleibt im Wortwechsel gesperrt, und zwar geometrisch:
      Wer beide Arme ausbreitet, braucht die ganze Bühnenbreite. Bei 0,70 bliebe
      eine Lücke von 1,8 Einheiten. Für **eine** Figur bleibt die Pose erlaubt~~

### Offen

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*

- [x] ~~**Entscheidung an der Bewegungsprobe:** Welche Feder, wie viel
      Overlapping und Anticipation, Gewicht und Atemvolumen ja oder nein~~
      *(erledigt 31.08. abends — der Bewegungsstil steht in Produktion)*
- [x] ~~Danach wandert das Gewählte in `TEMPO.feder` und in `Figurenbuehne`;
      was nicht bleibt, wird aus der Probe gelöscht statt liegen zu lassen~~
      *(erledigt 31.08. abends)*
- [x] ~~Die Kamera folgt dem Sprecher — **verworfen**, und zwar gerechnet:
      Ein Schwenk von zehn Einheiten bräuchte `groesse` 0,55 statt 0,62. Der
      Ersatz steht im Abschnitt darunter: Der Sprechende lehnt sich um 1,5°
      hin. Dieser Punkt stand danach noch als *entschieden, noch nicht gebaut*
      hier und widersprach der eigenen Rechnung zwei Abschnitte weiter~~
- [x] ~~Die vier Entwürfe nach dem neuen Maßstab umschreiben~~
      *(erledigt 31.08. nachts)*

## Volti umgebaut, Bewegungsstil in Produktion · 31.08.2026, abends

Nach der Bewegungsprobe: „Das Maximum gefällt mir. Es wirkt weitaus dynamischer
als alles, was wir jemals hatten." Dazu der Auftrag, Volti dieselbe Form wie
Watti zu geben — „ich finde Voltis Körper aktuell sehr kacke" — mit zwei Polen
oben als neuem Unterscheidungsmerkmal.

### Die Figuren

- [x] ~~**Volti ist gestaucht wie Watti.** `ZEIGER_*` heißt `FIGUR_*` und steht
      in `nachleser.ts` statt in `zeiger.ts`: Ein `ZEIGER_BREITE`, das für beide
      gilt, behauptet eine Unterscheidung, die es nicht mehr gibt~~
- [x] ~~**Die Pole sind ein eigenes Teil** (`ebene: 9`, unter dem Gehäuse).
      Volti trägt zwei à 22 bei x = 74 und 104, Watti seinen einen à 24 bei
      x = 88. Die Maße gehen ohne Rest auf: 8 + 22 + 8 + 22 + 8 = 68~~
- [x] ~~`zeiger.ts` leitet weiter ab: `eingefaerbt(mitPolen(nachleser,
      POL_EINZELN), …)`. Erst Pole tauschen, dann färben — umgekehrt trüge der
      neue Pol die alte Farbe~~
- [x] ~~**Die Stauchung sitzt jetzt in `Figur.tsx`**, nicht an der Aufrufstelle.
      Vier Stellen hatten sie vergessen und zeichneten schlanke neben
      gestauchten Figuren: Like-Hinweis, Banner, Farb- und Gestenprobe. **Was
      jede Aufrufstelle mitschreiben muss, vergisst irgendwann eine**~~
- [x] ~~Kantenrechnung symmetrisch, beide Schatten gleich breit~~
- [x] ~~**Anordnung 0,62 · 49/151.** Gerechnet ergab `staunen` als bindende
      Grenze 0,647; am Prüftisch berührten sich bei 0,64 die Hände im härtesten
      Fall, bei 0,62 bleibt Luft. Die alte Schwelle „zwanzig reichen" galt für
      **eine** schlanke und **eine** gestauchte Figur~~
- [x] ~~**Ein Fund am Rand:** Der Kommentar behauptete, „beide greifen
      gleichzeitig aus" sei schon eine Regel in `src/pruefung.ts`. Ist es nicht
      — die Regel dort war immer eine je Pose. Deshalb muss die Anordnung den
      Fall aushalten~~

### Der Bewegungsstil

- [x] ~~`poseAus` federt cartoonhaft, mit Overlapping und Anticipation als
      Vorgabe. **`TEMPO.feder` bleibt unangetastet** — sie trägt Einblender und
      Karten, und was über sein Ziel hinausschießt, ist eine Geste; eine Zahl,
      die eine Geste macht, ist ein Fehler~~
- [x] ~~Gewichtsverlagerung und Atemvolumen dauerhaft, mit Versatz je Figur~~
- [x] ~~**Die Kamerafahrt ist verworfen, und zwar gerechnet:** Bei der laufenden
      Anordnung bleiben 1,5 Einheiten Luft, bis eine Figur anschneidet. Ein
      Schwenk von zehn Einheiten bräuchte `groesse` 0,55 statt 0,62 — elf
      Prozent kleinere Figuren für eine Kamerabewegung~~
- [x] ~~**Stattdessen lehnt sich der Sprechende hin** (1,5°). Das passt in
      dieselbe Lücke, weil es nach **innen** geht: Wer sich zum Gegenüber
      neigt, zieht seinen äußeren Arm mit hinein~~

### Gesicht und Lippensync

- [x] ~~**Die Brauen sind in allen zehn Posen belegt.** Zehn Posen mit eigener
      Brauenhaltung sind zehn Gesichter statt einem — ohne ein Feld im Schema
      und ohne dass ein Entwurf angefasst wird~~
- [x] ~~Zwei Mundformen dazu: `spalt` und `weit`. Sieben statt fünf~~
- [x] ~~**Lippensync aus den Wortzeitstempeln.** Sie liegen seit dem ersten
      zweistimmigen Lauf da: 76 Wörter in `ersatzteil`, zusammen 23,7 von 32,1
      Sekunden — **ein Viertel der Laufzeit sind Lücken**, in denen der Mund
      bisher trotzdem klappte~~
- [x] ~~Silben aus **Vokalgruppen** des Wortes: „Ersatzteil" bekommt drei
      Öffnungen, 60–340 ms je Öffnung. Der Vokal wählt die Form — offen weit,
      geschlossen schmal. Gemessen: Mund 54 % zu, alle drei Formen benutzt~~
- [x] ~~Satzschluss-Wörter tragen ihre Nachlaufstille im Zeitstempel (`passt.`
      = 720 ms bei einer Vokalgruppe). Die Öffnung sitzt deshalb am **Anfang**
      ihres Abschnitts und ist gedeckelt~~
- [x] ~~Ohne Tonspur bleibt der Sinus — jede Probe, jedes Standbild~~

### Offen

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*

- [x] ~~**Der Freiraum unter dem Satz.** Die Figuren sitzen tief, darüber steht
      viel Leere. Drei Anläufe über `preserveAspectRatio` und `alignItems`
      haben **nichts** bewirkt und sind zurückgenommen — der Platz entsteht
      woanders als vermutet. Erst messen, wo, dann ändern~~
      *(gemessen 31.08. nachts: Die Letterbox ist strukturell — nur mehr Bühnenbreite hilft, und die kostet sichere Zone. Steht als solche in der Liste am Ende)*
- [x] ~~Die vier Entwürfe nach dem Gesprächsmaßstab umschreiben~~
      *(erledigt 31.08. nachts)*
- [x] ~~Zitatkartenszene zeigt keine Figuren; zweiter Lauf mit Ton; Bauformen
      gegen das Fenster 42–67 s; Blindwahl; neue Ideenquelle~~
      *(erledigt 31.08. nachts: `mitIllustration` im Schema, Bühne im Renderer, `minHeight` an beiden Enden)*


## Korrektur am selben Abend · 31.08.2026

„Ich habe es verkackt. Watti sollte beide Endpunkte haben und nicht Volti. […]
Ich hätte nicht gedacht, dass jetzt beide so klein und dickförmig aussehen."

- [x] ~~**Die Pole sind getauscht.** Watti trägt die zwei (9-Volt-Block), Volti
      den einen — denselben, den auch das Logozeichen der Wortmarke zeigt~~
- [x] ~~**Die Stauchung ist ersatzlos gefallen.** Sie kam am 25.08. als
      Notbehelf gegen zwei ununterscheidbare Figuren; diese Aufgabe hat jetzt
      die Oberkante, und die kostet keine Breite. „Dickförmig" war
      `scale(1.2 0.74)`, „klein" war ihre Folge~~
- [x] ~~`FIGUR_BREITE`, `FIGUR_HOEHE`, `FIGUR_STAUCHUNG` raus; damit auch der
      Faktor in der Kantenrechnung, an den Schatten und die `stauchung`-Prop am
      Namensschild~~
- [x] ~~**Anordnung 50/150 bei 0,73**, symmetrisch — die alten 45/146 stammten
      aus der Zeit, als eine Figur ein Fünftel breiter war~~
- [x] ~~**Die Figuren sind größer als je zuvor: 88 von 150 Einheiten.** Volti
      stand früher bei 84, heute Abend gestaucht bei 55. Vorher setzte Wattis
      Breite die Grenze, und die gibt es nicht mehr~~
- [x] ~~Am Prüftisch gemessen: bei 0,75 berühren sich die Hände im härtesten
      Fall (`erklaeren` gegen `zeigen`), bei 0,73 bleiben vier Einheiten Luft~~
- [x] ~~Der Merksatz bleibt, auch wenn die Stauchung ging: **Was die Form der
      Figur betrifft, gehört in `Figur` und nicht an die zwanzig Aufrufstellen.**
      Vier hatten sie vergessen~~
- [x] ~~Zwei offene Punkte haben sich erledigt: Der Banner in `Marke.tsx` zeichnet
      ungestaucht und stimmt damit wieder, und das quer liegende Szenensymbol
      `batterie` ist neben aufrechten Figuren keine Dopplung mehr~~

### Weiter offen

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*

- [x] ~~Der Freiraum unter dem Satz — drei Anläufe ohne Wirkung, zurückgenommen.
      Mit 88 statt 55 Einheiten Figurenhöhe ist er kleiner geworden~~
      *(gemessen 31.08. nachts: Die Letterbox ist strukturell — nur mehr Bühnenbreite hilft, und die kostet sichere Zone. Steht als solche in der Liste am Ende)*
- [x] ~~Die vier Entwürfe nach dem Gesprächsmaßstab umschreiben~~
      *(erledigt 31.08. nachts)*
- [x] ~~Zitatkartenszene; zweiter Lauf mit Ton; Bauformen gegen 42–67 s;
      Blindwahl; neue Ideenquelle~~
      *(erledigt 31.08. nachts: `mitIllustration` im Schema, Bühne im Renderer, `minHeight` an beiden Enden)*


## Der Vorspann: aus vier Rubriken werden sechs Shows · 31.08.2026, nachts

Aus „der Anfang jedes Videos wird ein Vorhang" ist im Grilling etwas Größeres
geworden: **Jedes Format ist eine benannte Sendung.** Der Kanal ist der Sender,
das Format die Show. Sieben Runden, 31 Entscheidungen.

### Der Ablauf

Aufschlag bei offenem Vorhang (höchstens 3,5 s) → Vorhang schließt → Titelkarte
mit Showtitel und Themenzeile, die beiden nennen ihre Namen → alles vergeht →
Jingle, Vorhang auf → das Gespräch. Rund 4 Sekunden. **Kein Vorhang am Ende.**

### Die sechs Shows

`gibtswirklich` **Facts** · `werhatrecht` **Beef** · `eswareinmal`
**Märchenstunde** · `absicht` **Kein Zufall** · `empfehlung` **Empfehlungen** ·
neu: `schaetzmal` **Schätz mal**

### Gebaut

- [x] ~~**`show`-Titel je Format** in `FORMATE`. Fünf gesetzt~~
- [x] ~~**Feld `vorspann`** am Short — die Themenzeile, das einzige, was je Short
      wechselt. Der Showtitel folgt aus `format`, der Ton ist eine feste Datei~~
- [x] ~~**Dieselbe Ansagesperre wie im Aufschlag** auf der Themenzeile, dazu
      „heute:" und „heutiges thema". Sie soll behaupten, nicht ankündigen~~
- [x] ~~Vier Themenzeilen geschrieben, jede eine Behauptung mit dem Suchbegriff~~
- [x] ~~**`VORSPANN_SEK` in `src/zeit.ts`.** Der ganze Zeitgriff sitzt an **einer**
      Stelle: `shortVertonen` addiert die Dauer auf die Uhr, bevor die zweite
      Szene beginnt. `szenenStartSek`, `dauerSek`, `szenenZeitplan` und
      `gesamtdauerBilder` stimmen dadurch von selbst~~
- [x] ~~Gegengeprüft: Szene 1 spricht 3,26 s und dauert mit Vorspann 7,07 s;
      Szene 2 beginnt genau dort~~
- [x] ~~`video/bausteine/Vorhang.tsx` — zwei Hälften, Titelkarte, die beiden
      Figuren davor, gestaffelte Schriftgröße für die Themenzeile~~
- [x] ~~In `Short.tsx` eingehängt, Startbild **rückwärts** aus der Folgeszene
      gerechnet — dann wandert die Karte mit, wenn die Dauer sich ändert~~

### Vier Fehler, alle erst im Standbild sichtbar

- [x] ~~**`Buehne` gibt ihren Kindern keine Höhe.** Sie misst den Inhalt und
      skaliert ihn; ein Kind mit `position: absolute` hat keine Höhe, und die
      Transformation darüber macht sie zugleich zum Bezugsrahmen. Der Vorhang
      war null Pixel hoch~~
- [x] ~~**`[seite]: 0` setzte eine CSS-Eigenschaft namens `links`.** Bezeichner
      sind hier deutsch, CSS-Eigenschaften nicht — nur eine Hälfte stand da~~
- [x] ~~**`AbsoluteFill` überschreibt `right` und `bottom`** mit seinem
      `inset: 0`. `left` und `top` griffen, der Vorhang lief rechts aus dem
      Bild. Wer nur eine Seite prüft, sieht das nicht~~
- [x] ~~**Feste 52 px liefen über.** Die sichere Zone nimmt links 170 und rechts
      200 Pixel — es bleiben 710. Die Themenzeile staffelt jetzt nach Länge,
      wie die `zahl`-Szene ihre Ziffern~~

### Offen — der Vorspann ist noch stumm

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*

- [x] ~~**Ton und Jingle.** Sechs feste Aufnahmen („Facts, mit Watti…" / „…und
      Volti!"), einmal vertont, rund 210 Zeichen, danach null laufende Kosten.
      Dazu ein aufsteigender Dreiklang in `skripte/toene.ts`, von Hand
      geschrieben wie `gefaellt.wav`~~
      *(erledigt 31.08. nachts)*
- [x] ~~**`VORSPANN_SEK` steht auf gerechneten 3,8 s** und ist noch nicht
      gemessen. Sobald die Tondatei existiert, wird sie an ihr abgelesen~~
      *(erledigt 31.08. nachts: gemessen an zehn festen Aufnahmen, `daten/vorspannton.json`)*
- [x] ~~**Lippensync im Vorspann** — die Wortzeiten kommen aus derselben einmaligen
      Vertonung~~
      *(erledigt 31.08. nachts)*
- [x] ~~**Bauform `einstimmig` streichen** — Zielwert 25 s, Fenster ab 42 s~~
      *(erledigt 31.08. nachts)*
- [x] ~~**Die Bauform-Zielwerte gegen das Fenster 42–67 s.**~~ 45 / 52 / 62 am
      31.08.2026 abends, `einstimmig` gestrichen. 25 / 35 / 45 / 60
      liegen zu drei Vierteln darunter


## Theaterrot im Renderer · 31.08.2026, nachts

Nach drei Vergleichsseiten sind alle Werte entschieden und eingebaut.

### Farben

- [x] ~~**Theaterrot `#7E1F1F`** als erste Flächenfarbe der Marke. Rot war bei
      Wattis Farbwahl als „zu grell" verworfen worden — das galt einer **Figur**,
      nicht einer Fläche~~
- [x] ~~**Je Kennfarbe drei Helligkeiten**, mit gerechneter Begründung: Anzeige
      (dunkler Körper), tief (heller Grund), hell (roter Vorhang). Die gedämpften
      Töne haben auf Theaterrot Kontrast **1,06** und **1,90** — unsichtbar~~
- [x] ~~**Sechs Rubrikfarben**, alle ≥ 4,5 auf ihrer hellen Fläche. Pink und
      Orange mussten dafür nachgedunkelt werden (4,26 und 3,47)~~
- [x] ~~`anzeigeZweiHell` — das seit jeher fehlende Gegenstück zu `blauHell`~~

### Kopfzeile

- [x] ~~**Doppelzeichen** statt eines einzelnen blauen Akkus: Volti ein Pol,
      Watti zwei. Versatz **78** — vorher 105, also 37 Einheiten Lücke bei 68
      Einheiten Gehäusebreite~~
- [x] ~~`Zeichenformen` herausgezogen, damit `Doppelzeichen` und `Logozeichen`
      dieselben Formen teilen statt sie abzuschreiben~~
- [x] ~~**Wortmarke zweifarbig** in den gedämpften Tönen `#303C6C` / `#896358`.
      Der erste Anlauf nahm die Anzeigefarben und wirkte flau — die sind für den
      dunklen Figurenkörper aufgehellt~~
- [x] ~~**Formatpille zurück**, mit dem Showtitel und der Rubrikfarbe~~
- [x] ~~Das Profilbild nutzt `Doppelzeichen` statt zweier Aufrufe von Hand — die
      Paarungsrechnung stand an zwei Orten~~

### Vorhang

- [x] ~~**Falten mit Verlauf**, Breiten deterministisch gestreut (derselbe
      Generator wie das Bannermuster). Gleich breite Bänder wären ein
      Streifenmuster~~
- [x] ~~**Querbehang** mit Bögen und Quasten, bleibt oben hängen~~
- [x] ~~**Weißer Umriss** um die Figuren~~ — **am selben Abend wieder entfernt.**
      Die 1,26 waren gegen den **Körper** der Figur gerechnet, nicht gegen die
      Figur: Ihr Gesicht steht mit 17,1 auf dem Körper. Der weiße Rand, den
      Emirhan sah, kam vom **Saum des Rigs** und nicht von diesem Umriss
- [x] ~~**„HEUTIGES THEMA"** als feste Zeile im Renderer, Stärke 900 — außerhalb
      des geprüften Feldes, damit die Ansagesperre bestehen bleibt~~
- [x] ~~**„mit Volti und Watti"**, jeder Name in seiner aufgehellten Kennfarbe~~
- [x] ~~Typografie: Titel 132, Themenzeile 68–88 gestaffelt~~

### Ein Fehler, im Standbild gefunden

- [x] ~~**Die Naht stand fest in der Bildmitte.** Bei halb geöffnetem Vorhang lag
      sie als dunkler Streifen auf der hellen Szene, während die Hälften längst
      auseinander waren. Der Schatten gehört an die Innenkante **jeder Hälfte** —
      dort wandert er mit~~

### Offen

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*


## Die Bühne steht von Anfang an · 31.08.2026 · Abend

Der Vorhang war ein Vorspann und ist eine **Bühne** geworden: Links und rechts
bleibt gerafftes Tuch stehen, über die ganze Laufzeit jedes Videos.

### Die Bühne

- [x] ~~**Randbreite 100 Pixel**, am Bild gewählt. Die Herleitung hätte 130
      ergeben (sichere Zone minus Reserve) — das war die größtmögliche Breite,
      nicht die richtige~~
- [x] ~~**50 Pixel wären unsichtbar gewesen.** Der am 15.08. an einem
      veröffentlichten Beitrag gemessene Beschnitt liegt bei 52 links und 56
      rechts — ein 50-Pixel-Streifen läge vollständig in dem, was am Handy gar
      nicht ankommt~~
- [x] ~~**Gestaucht statt hinausgeschoben.** Ein gerafft aufgezogener Vorhang
      staucht sein Tuch. Verschoben wäre von acht Falten eine dreiviertel
      übriggeblieben — ein flacher roter Balken~~
- [x] ~~**Der Vorhang reicht bis y = 0**, Logo, Wortmarke und beide Pillen liegen
      darin. „Der Kanal oben, die Show darunter" galt einem Vorhang, den man nur
      im Vorspann sah — **ein Vorhang hängt von der Decke**~~
- [x] ~~**Die Kopfzeile wechselt auf helle Farben**, solange er zu ist. Damit
      reißt die KI-Kennzeichnung nie ab, und genau dafür stand die alte Kante~~
- [x] ~~Ein Stoff, ein Mount: `Vorhangstoff` läuft dauerhaft, `Vorspannkarte` in
      der Sequence. Stand und Farbumschaltung kommen aus **einem** Wert~~
- [x] ~~Untertitel, Sprechblase und beide Zeiger rücken um die Randbreite ein~~
- [x] ~~Titel und Namen dicker über eine Kontur in der Textfarbe — über 900
      gibt es bei Inter kein Schriftgewicht mehr~~

### Zwei Messfehler derselben Sorte

- [x] ~~**Der weiße Rand um die Arme war der Saum des Rigs**, nicht mein Umriss.
      Verteidigt hatte ich ihn mit Kontrast 1,26 — gerechnet gegen den Körper
      der Figur statt gegen die Figur~~
- [x] ~~**Die Kennfarben auf dem Vorhang standen bei 1,76 und 2,37**, nicht bei
      den dokumentierten 3,23 und 4,36. Die alten Zahlen sind gegen die
      Grundfarbe gerechnet, und der Stoff ist gefaltet. **Der Kontrast gegen
      einen Farbverlauf ist der gegen seinen ungünstigsten Ton.** Jetzt tragen
      `blauHell` und `anzeigeZweiHell` mit 4,19 und 4,49~~

## Aus Vortrag mit Zwischenruf wird ein Gespräch · 31.08.2026 · Abend

Acht Befunde hielten seit dem 26.08. jeden Entwurf zurück. **`npm run pruefen`
ist erstmals seitdem vollständig grün.**

### Die Zielwerte zuerst

- [x] ~~**`einstimmig` gestrichen.** Bei einer Untergrenze von 42 Sekunden ist
      der einstimmige Bau kein kurzer Sonderfall mehr, sondern ein Monolog von
      dreiviertel Minute. Er ist jetzt nicht mehr benannt, sondern **unmöglich**:
      `zweistimmigkeit` gilt ohne Ausnahme~~
- [x] ~~**Zielwerte 45 / 52 / 62.** Drei von vier lagen unter dem Fenster — ein
      Zielwert, der den eigenen Short ungültig macht, ist eine Falle~~
- [x] ~~**Die Drittelregel wäre unerfüllbar geworden.** Bei drei Bauformen und
      sieben Shorts erlaubt ein Drittel höchstens sechs. Sie steht jetzt auf der
      Hälfte, wie beim Format~~

### Die vier Entwürfe

- [x] ~~**Die Nähte lagen zwischen den Sätzen, nicht in ihnen.** Aufschlag 2,9 s
      und Belegsatz 4,2 s sind beide unauffällig — zusammengeklebt 6,9. In drei
      von vier Shorts eröffnet jetzt **Watti** die zweite Szene~~
- [x] ~~**Watti trägt selbst einen Beleg** (`raumstation` Szene 6). Sechs
      Macharten je einmal reichen nicht, um 97 Zeichen aufzuholen~~
- [x] ~~Drei neue Sätze aus Fundstellen, die ungenutzt in den Quellen lagen.
      `stationen` hat damit erstmals vier Zuspitzungen~~
- [x] ~~**Die Längen streuen:** 61,5 / 49,6 / 48,1 / 47,3 s — drei Klassen statt
      einer. Der Versuch bis Oktober hat etwas zu messen~~
- [x] ~~Sechs Befunde des `belegpruefer` nachgezogen, **alle sechs in Sätzen, die
      gerade erst angefasst worden waren.** Jede Kürzung nimmt ein Wort mit, das
      gedeckt war~~

### Die EU-Richtlinie war nie kaputt

- [x] ~~**Eine Wache, die an einer Schreibweise hängt, prüft die Schreibweise
      und nicht die Sache.** Die Cellar-Umleitung erkannte nur `?uri=CELEX:…`,
      nicht `?uri=OJ:…` — sieben EU-Quellen gingen durch, die achte nicht~~
- [x] ~~Beide Wege liefern byte-genau dieselbe Datei. Nachgemessen: 199.351
      Bytes, `cmp` meldet keinen Unterschied~~
- [x] ~~**Der Rechtsakt stand zweimal in `quellen.json`**, in beiden
      Adressformen. Zusammengelegt; der ältere Eintrag trug dabei einen falschen
      Titel und einen Beleg, der Teilmenge eines anderen war~~
- [x] ~~**Zwei Zitate sagten für sich gelesen das Gegenteil.** Subjekt und
      Verneinung stehen an den Enden des Satzes, die Aufzählung dazwischen~~
- [x] ~~Zitatlänge von 180 auf 240. Die 180 waren nie eine gemessene
      Bruchgrenze, sondern Vorsicht nach einem Fall, der an **Sonderzeichen**
      scheiterte. **Von zwei Regeln, die sich widersprechen, gewinnt die mit dem
      besseren Grund**~~

### Offen

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*

- [x] ~~**Ton und Jingle des Vorspanns.** Sechs feste Aufnahmen, rund 210 Zeichen
      einmalig. `VORSPANN_SEK` steht auf gerechneten 3,8 s und ist **nicht
      gemessen**~~
      *(erledigt 31.08. nachts: „Hauch und Grundton" ist gewählt und liegt in `skripte/toene.ts`)*
- [x] ~~Die Zitatkartenszene zeigt keine Figuren~~
      *(erledigt 31.08. nachts: `mitIllustration` im Schema, Bühne im Renderer, `minHeight` an beiden Enden)*

## Der Vorspann hat einen Ton · 31.08.2026 · Nacht

Fünf Klänge, zehn Aufnahmen, und der Vorhang ist an den Anfang gewandert.

### Der Ton

- [x] ~~**Zehn feste Aufnahmen** je Format, 170 Zeichen einmalig. Showtitel und
      Namen wechseln nie; durch `shortVertonen` geschickt kostete derselbe Satz
      rund 11.000 Zeichen im Jahr~~
- [x] ~~**`eleven_v3` halluziniert bei kurzen Eingaben.** Fünf Läufe mit
      identischem Text (18 Zeichen): 4,80 · 5,04 · 2,08 · 4,24 · **415,84** s.
      Bekannt war die Streuung von „rund sechs Prozent" — gemessen an 800
      Zeichen. Bei achtzehn sind es Faktor 200~~
- [x] ~~Das Skript läuft dreimal je Aufnahme und verwirft alles über vier
      Sekunden. **Sechs von dreißig Läufen fielen durch**~~
- [x] ~~**Die Themenansage** je Short, aus der Vertonung. Sie steht neben
      `abschnitte`, nicht darin — die Aufschlagmessung filtert gegen
      `szenenStartSek[1]`~~
- [x] ~~`VORSPANN_SEK` war eine Konstante und ist eine **Funktion**: Die
      Themenzeile wechselt je Short, eine Zahl für alle wäre für jeden die
      falsche~~
- [x] ~~**Ton und Bild aus einer Zahl.** `ansageAbBild` steuert beides; vorher
      hing die Einblendung an einem Anteil der Vorspanndauer und lag 1,2
      Sekunden hinter der Stimme~~

### Drei Anläufe für den Vorhangklang, alle gescheitert

- [x] ~~**Stoffrauschen**: 67 % der Energie über 2 kHz — ein Fön~~
- [x] ~~**Applaus**: klang nach Knistern. Ein Hochpass lässt alles darüber
      durch; 5 % lagen im Klatschkörper statt 30~~
- [x] ~~**Swisch**: sanfter, allein aber fremd~~
- [x] ~~**Der Ausweg war nicht, das Rauschen wegzulassen, sondern es auf seine
      Aufgabe zu beschränken.** Es zeigt eine Richtung an, den Rest trägt ein
      Ton, der ohnehin zur Marke gehört — Hauch plus Grundton D4, RMS 0,019
      gegen 0,08 der Sprache~~
- [x] ~~**Alle vier Markenklänge stehen auf D und A.** Nicht geplant: `folgen`
      stand schon darauf, die Terz war die einzige fehlende Note~~

### Der Vorhang an den Anfang

- [x] ~~**Das Cold Open ist Geschichte.** „Der Anfang ist echt unnötig" —
      ein Argument aus einer Zahl schlägt keinen Eindruck vom gerenderten Video.
      Die 71 % stehen trotzdem im Kommentar~~
- [x] ~~Der Umbau hat die Vertonung **vereinfacht**: aus einem Uhrsprung mitten
      in der Schleife wurde eine Anfangsbedingung. `VORSPANN_NACH_SZENE` ist weg~~
- [x] ~~**Er fährt nicht mehr zu.** Der erste Anlauf ließ ihn zufahren, und
      Bild 0 zeigte eine leere Bühne — die erste Szene beginnt erst nach dem
      Vorspann~~
- [x] ~~`ABLAUF` war eine Tabelle fester Anteile und ist eine Funktion: Mit
      wechselnder Vorspannlänge hätte ein Anteil die Vorhangfahrt mitskaliert,
      obwohl sie immer zwölf Bilder braucht~~

### Zwei eigene Fehler, beide beim Basteln

- [x] ~~**Die Vorschaudatei spielte die Ansage doppelt.** Ich hatte dieselbe
      Datei an `tonspur.datei` und `tonspur.vorspann.datei` gehängt — das erste
      ist die Szenenvertonung und läuft ab Bild 0. Ein Pflichtfeld mit dem
      erstbesten Wert gefüllt, statt zu prüfen, was es bedeutet~~
- [x] ~~**Die zehn bezahlten Aufnahmen lagen nicht im Repo.** `*.mp3` ist
      pauschal ignoriert, und das ist für Vertonungen richtig — die entstehen
      neu. Diese nicht: `eleven_v3` ist nicht deterministisch, eine neue
      Synthese ergibt eine andere Aufnahme und kostet wieder~~

### Offen

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*


## Der Hauptteil wird ein Gespräch · 31.08.2026 · Nacht

### Wattis Stimme — geklärt, nicht geändert

- [x] ~~**„Die Stimme von Watti ist nicht mehr die erste Stimme"** stand seit dem
      Vormittag offen und in keiner Liste. Im Verlauf gibt es **keinen Beleg**
      dafür, dass Watti je eine andere hatte: `ELEVENLABS_VOICE_ID_ZEIGER` steht
      seit dem 25.08., 21:36 auf Prayan~~
- [x] ~~**Die Vereinbarung über „die erste Stimme" betraf Volti**, nicht Watti —
      „okay wir lassen doch die erste Stimme wieder für Volti" (25.08., 21:21).
      Watti wurde erst danach gewählt: „Wir nehmen Prayan" (21:35)~~
- [x] ~~Geändert hat sich nicht die Stimme, sondern **was sie spricht**: v3 statt
      v2, Regieanweisungen seit dem 26.08., die Stimmeinstellung~~
- [x] ~~Alle acht Kandidaten von damals gegen die heutige Aufnahme gehört.
      **Entschieden: es bleibt bei Prayan**~~

### Der Gesprächsmaßstab

- [x] ~~**Emirhans Musterdialog steht wörtlich in `voice.md`.** Er stand bis
      dahin nur im Chat — und ist heute Abend genau deshalb verlorengegangen:
      Die vier Entwürfe wurden nach `redelauf` und `stimmanteil` umgeschrieben,
      grün, und der Maßstab blieb unerfüllt~~
- [x] ~~Drei Merkmale, alle prüfbar: **Anrede**, **zweite Person**,
      **Rückbezug** auf ein Wort der Vorzeile~~
- [x] ~~`ersatzteil-freischalten` umgeschrieben: von **0 Anreden und 0 zweiter
      Person** auf 3 und 6, dazu drei Rückbezüge (Verbot, erlaubt, Drucker)~~
- [x] ~~**Die zweite Person hat zwei Grenzen sichtbar gemacht, die vorher
      niemand vermisst hat:** Das Verbot schützt den Einbau durch *unabhängige
      Reparaturbetriebe*, und es gilt nur für die Waren aus *Anhang II*. Eine
      Verallgemeinerung fällt nicht auf, eine Anrede schon~~
- [x] ~~Ein Zitat endete **vor seinem eigenen Verb** — „behindern" stand
      außerhalb der geprüften Zeichenkette, obwohl der Sprechtext es spricht~~
- [x] ~~Drei `stuetzt`-Zeilen nachgezogen. Sie ließen genau die Grenzen weg, die
      dann im Sprechtext fehlten — **wer beim Umschreiben auf `stuetzt` statt auf
      `zitat` schaut, bekommt die Verschiebung geliefert**~~

### Offen

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*

- [x] ~~**Die drei Regeln bauen** — `anrede`, `zweitePerson`, `rueckbezug`.
      Ohne sie fragt beim Schreiben wieder nichts danach~~
      *(erledigt 31.08. nachts: `anrede`, `zweitePerson`, `rueckbezug` stehen in `src/pruefung.ts`)*
- [x] ~~**Die restlichen drei Entwürfe** nach dem Musterdialog~~
      *(erledigt 31.08. nachts)*
- [x] ~~**Die Bauform-Zielwerte kennen den Vorspann nicht.** 45 / 52 / 62 sind
      gesetzt worden, als er 3,8 s gerechnet war; mit Themenansage kostet er
      9,5. `ersatzteil` steht bei 58 s gegen Ziel 45 — für den Inhalt einer
      Wechselrede bleiben 35,5 Sekunden~~
      *(erledigt 31.08. nachts: `geschaetzteInhaltSek` rechnet ohne Vorspann)*
- [x] ~~**Vier Szenenarten streichen** — `frage`, `vergleich`, `einschraenkung`,
      `kaufkriterien` werden von keinem Short benutzt~~
      *(erledigt 31.08. nachts)*
- [x] ~~**Die Zitatkartenszene zeigt keine Figuren**, obwohl der Vertrag sagt
      „die beiden Figuren reden darüber"~~
      *(erledigt 31.08. nachts: `mitIllustration` im Schema, Bühne im Renderer, `minHeight` an beiden Enden)*
- [x] ~~**Die erste Szene nach dem Vorhang zeigt nur eine Figur** — „Da müssen
      beide drauf". Das Symbol blockiert den zweiten Platz~~
      *(erledigt 31.08. nachts)*
- [x] ~~**Der Freiraum unter dem Satz** — drei Anläufe ohne Wirkung. Erst messen,
      wo der Platz entsteht~~
      *(gemessen 31.08. nachts: Die Letterbox ist strukturell — nur mehr Bühnenbreite hilft, und die kostet sichere Zone. Steht als solche in der Liste am Ende)*
- [x] ~~**Widerspruch in dieser Datei:** „Die Kamera folgt dem Sprecher" steht
      einmal als *entschieden, noch nicht gebaut* und einmal als *verworfen*~~
      *(aufgelöst 31.08. nachts — siehe oben im Bewegungsstil-Abschnitt)*

## Zielwert und Fenster messen Verschiedenes · 31.08.2026 · Nacht

- [x] ~~**Der Bauform-Zielwert rechnet ohne den Vorspann.** Er sagt, wie lang
      ein so gebautes *Gespräch* ist; das Fenster sagt, wie lange der Zuschauer
      zusieht. Solange der Vorspann 3,8 s gerechnet war, fiel der Unterschied
      nicht auf — mit Themenansage kostet er 9~~
- [x] ~~**Anheben ging nicht:** 62 + 9,5 = 71,5 reißt die Obergrenze. Zwei
      Größen, die verschiedene Dinge meinen, brauchen verschiedene Zahlen~~
- [x] ~~`npm run pruefen` ist **vollständig grün** — kein Fehler, kein Hinweis,
      erstmals seit dem 26.08.2026~~

Gespräch gegen Zielwert: raumstation 55 (62) · ersatzteil 49 (45) ·
passwort 48 (52) · erstes-laden 45 (45). Gesamtlängen 54 bis 64 s.

### Offen

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*

- [x] ~~**Das Bild der Gesprächsszenen** — vier tote Szenenarten streichen, die
      Zitatkarte mit Bühne, die erste Szene mit beiden Figuren, der Freiraum
      unter dem Satz~~
      *(erledigt 31.08. nachts)*
- [x] ~~**Widerspruch in dieser Datei:** „Die Kamera folgt dem Sprecher" steht
      einmal als *entschieden, noch nicht gebaut* und einmal als *verworfen*~~
      *(aufgelöst 31.08. nachts — siehe oben im Bewegungsstil-Abschnitt)*

## Das Bild der Gesprächsszenen · 31.08.2026 · Nacht

### Der Freiraum — gemessen statt vermutet

- [x] ~~**Die Notiz stand falsch herum.** „Die Figuren sitzen tief, darüber
      steht viel Leere" — gemessen an vier Szenen sitzen sie **hoch**: über dem
      Inhalt sind 1 bis 13 Pixel frei, **darunter rund 790** (41 % des Bildes)~~
- [x] ~~**Zwei eigene Fehlrechnungen**, beide vor dem Bauen gefunden: Ein
      viewBox-Beschnitt macht die Letterbox **größer** (203 → 327 px), weil die
      Skala an der Breite hängt. Und die größere Schrift hat **drei Pixel**
      gebracht~~
- [x] ~~**Die Letterbox ist strukturell.** Bei 710 px Bühnenbreite ist die
      Zeichnung 532 px hoch und bekommt 736. Sie verschwindet nur, wenn die
      Bühne breiter wird — und das kostet sichere Zone~~
- [x] ~~Die Schriftgrößen sind trotzdem gestiegen (76 → 92, Aufschlag 86 → 96):
      besser lesbar im Feed, auch wenn es die Leere nicht löst~~

### Vier Szenenarten gestrichen

- [x] ~~`vergleich`, `einschraenkung`, `kaufkriterien` — von keinem Short je
      benutzt. Fünf Arten bleiben: `text`, `zahl`, `frage`, `zitatkarte`,
      `schluss`~~
- [x] ~~**`frage` bekommt eine Gnadenfrist:** Sie ist der Baustein für das
      Format `schaetzmal`, das auf der Liste steht. Was gebraucht wird, streicht
      man nicht, weil es heute niemand benutzt~~

### Beide auf die Bühne, wo beide reden

- [x] ~~**`passwort-wechseln` zeigte in drei von sechs Szenen eine einzelne
      Figur**, während beide miteinander redeten. Die anderen drei Entwürfe
      waren sauber~~
- [x] ~~**Der Grund war der Weg des geringsten Widerstands:** Die drei Szenen
      trugen `erklaeren`, `zeigen` und zwei Requisiten — alles bei zwei Figuren
      verboten. Wer die Sperre nicht lösen will, lässt die zweite Figur weg~~
- [x] ~~**Neue Wache `zweiImBild`.** Sperren verbieten, sie verlangen nichts —
      dieselbe Lücke wie bei `zweistimmigkeit` und `reaktion`~~
- [x] ~~Gemessen: Die Bühnenzone ist jetzt zu **14,7 %** gefüllt statt zu 8,2 %~~

### Offen

*Was hier offen war, steht zusammengeführt in **Offen · Stand 31.08.2026** am Ende dieser Datei.*

- [x] ~~**Die Zitatkartenszene zeigt keine Figuren** — bei `passwort-wechseln`
      ist das Szene 2, und der Vertrag sagt „die beiden Figuren reden darüber".
      Im Standbild ist die untere Hälfte leer~~
      *(erledigt 31.08. nachts: `mitIllustration` im Schema, Bühne im Renderer, `minHeight` an beiden Enden)*

---

# Offen · Stand 31.08.2026

**Die einzige Liste.** Bis heute Nacht hatte fast jeder Abschnitt seine eigene
„Offen"-Sektion — acht Stück, mit denselben Punkten in verschiedenen Fassungen
und einem Widerspruch darin. *„Eine Liste, in der dieselbe Sache zweimal
gegensätzlich steht, ist schlechter als keine"* stand am selben Tag über der
Kamerafrage und galt am Ende für die Liste selbst.

Die Abschnitte darüber bleiben Historie: was gebaut wurde und warum. Was noch
zu tun ist, steht ab hier.

## Als Nächstes

- [ ] ▸ **Der erste Short mit vollem Ton.** Rund 580 Zeichen von 81.000.
      **Kostet Kontingent und braucht Emirhans Zustimmung.** Dort zeigt sich,
      ob `VORSPANN_SEK`, die Sprecherpausen und die Aufschlagmessung tragen —
      bisher sind das gerechnete Zahlen an gemessenen Bausteinen
- [ ] **`raumstation-alte-rechner` liegt bei rund 64 von 67 Sekunden.** Die
      Vertonung streut sechs Prozent, das sind ±3,9 s. Beim ersten Lauf kann
      das reißen
- [ ] **Kurze Redeanteile im Wochenlauf.** Wattis Reaktionszeilen sind 20 bis
      40 Zeichen lang und laufen ungeprüft durch dasselbe Modell, das im
      Vorspann 415 Sekunden für 18 Zeichen ausgegeben hat. Dort fällt ein
      kaputter Lauf erst **nach** dem Bezahlen auf

## Am fertigen Video zu entscheiden

- [ ] **Die Letterbox** — 203 Pixel, strukturell. Zweimal gemessen statt
      geraten: Ein engerer viewBox macht sie größer (203 → 327), eine größere
      Schrift gewinnt drei Pixel. Nur mehr Bühnenbreite hilft, und die kostet
      sichere Zone
- [ ] **Die Randbreite am Handy.** 100 Pixel Vorhang; sichtbar bleiben nach dem
      gemessenen Beschnitt 48 links und 44 rechts. Ob das als Kulisse liest
      oder als Rahmen, entscheidet kein Standbild
- [ ] **Die Formatpille in der Kopfzeile** — bleibt sie? „KI-Stimme" bleibt in
      jedem Fall
- [ ] **Facts `#4C61B0` und Kein Zufall `#303C6C` sind beide blau.** Bei
      Briefmarkengröße prüfen
- [ ] **Das Logozeichen** ist einpolig und aufrecht, während Watti gestaucht
      ist. Entschieden wird am Bild
- [ ] **Das Szenensymbol `batterie` liegt quer** — „weil eine zweite Batterie
      in derselben Haltung eine Dopplung wäre". Mit zwei querformatigen Figuren
      daneben ist genau das jetzt der Fall

## Ton

- [ ] **Blindwahl für die Regieanweisungen.** Alle sechs Vorräte in
      `REAKTIONS_MACHARTEN` sind leer, und das ist der beabsichtigte Zustand:
      Vorher standen dort sechs Tags aus dem Gedächtnis, einer davon existiert
      nicht. Je Machart die echte Zeile und eine tonlos geschriebene, vier
      unbeschriftete Fassungen samt der ohne Ansage, zweiter Durchgang für die
      Überlebenden. `regieprobe` ist neu zu schreiben

## Formate und Vorrat

- [ ] **Beef umbauen:** neue MATRIX-Prüffrage „Ist der Fakt belegt und die
      Folgerung trotzdem strittig?" statt „übersehen beide etwas Drittes?". Die
      alte Frage traf beim Sammeln fast nie zu — daher nur zehn Ideen
- [ ] **`schaetzmal` als sechstes Format:** Enum, `FORMATE`, `MATRIX`, eigene
      Ideendatei. Erst dann fehlt die sechste Vorspannaufnahme. Sendet, wenn
      der Vorrat steht
- [ ] **Eine neue Ideenquelle** — der Pillar-Weg ist verworfen
- [ ] **Vorrat nachfüllen**, sobald ein Format unter sechs offene Ideen fällt.
      `eswareinmal` und `werhatrecht` stehen bei zehn
- [ ] **Ab Oktober `npm run laengen` lesen**, sobald zwei Längenklassen belegt
      sind. **Dann fallen die vier Zielwerte** — vorher nicht, sonst ersetzt
      eine geratene Zahl die andere

## Marke und Kanaltexte — nur Emirhan

- [ ] Instagram-Bio eintragen, **Name-Feld auf „Ganz akkurat · Technikfakten"**,
      Kategorie weg von „KI-Creator" (YouTube ist erledigt)
- [ ] TikTok-Bio eintragen
- [ ] Die restlichen rund 900 Zeichen der YouTube-Beschreibung sind Suchfläche
      — ein oder zwei Sätze mit den Wörtern, unter denen gesucht wird
- [ ] Einmal `/hooks` öffnen oder die Sitzung neu starten: Der Settings-Watcher
      beobachtet `.claude/` nur, wenn dort beim Sitzungsstart schon eine
      Settings-Datei lag
- [ ] `video/Marke.tsx` — der Banner braucht breitere, flachere Kästen, dann
      `npm run markenbilder` neu ablegen

## Dokumentation

- [ ] **`CLAUDE.md` steht an mehreren Stellen auf altem Stand:** Längenfenster
      und Zielwerte, Vorhang und Vorspann, Sprechblase, `WORTWECHSEL` mit 116
      Einheiten, Szenentrenner, die drei gesperrten Posen, die Pausenwerte, die
      neuen Regeln, `einstimmig`, die Zitatlänge — und ein Kapitel „Die
      Figuren", das den Umbau vom 31.08. gar nicht kennt
- [ ] **`.claude/skills/bild-bauen/SKILL.md`** dazu nachziehen
- [ ] **Ein fünfter Skill für die Bebilderung?** Bühnenmaße, Symbolwahl und
      „die Prüfung hat die Richtung zweimal gewechselt" sind Produktionswissen
      und kein Vertrag — rund 90 Zeilen. Nicht gebaut, weil es eine
      Strukturentscheidung ist

## Aufräumen

- [ ] **`laeufe/` liegt bei 235 MB in einem einzigen Ordner**, und 115 von 209
      versionierten Dateien sind fremde Skills. Am 30.08. besprochen, nichts
      umgesetzt
- [ ] **`daten/benchmarks.md` und `npm run nachfrage`** stehen seit dem 19.08.
      unangetastet auf der Liste. Erst entscheiden, ob sie noch gewollt sind
- [ ] Den Tagesstand pushen
- [ ] Die nächste Woche bauen

---

# Die Nacht auf den 01.09.2026 — was gemessen wurde

Das erste vertonte Video im neuen Bau lag vor, und das Urteil war: **„Es wirkt
so sehr nach KI-Slop, dass man sich das einfach nicht angucken möchte."** Sechs
Punkte davon waren messbar, alle sechs haben sich bestätigt, und drei waren
schlimmer als vermutet.

**Diese Zahlen stehen hier, weil sie sonst nirgends stehen.** Die meisten sind
inzwischen in Codekommentare gewandert; die aus dieser Tabelle nicht.

| Befund | gemessen |
|---|---|
| Stille an den Sprecherwechseln | **4,19 s auf 53 s = 7,9 %**, Mittel 0,42, Spitze 0,61 |
| Loch im Vorspann vor Szene 1 | **1,53 s** — von niemandem gemeldet |
| Lücke im Opener | 0,382 s statt 0,28, plus 0,445 s **in** der volti-Aufnahme |
| Zoom-Überlagerung | Bühne +4,5 % × Kamera +24 % = **+29,6 %** |
| Zitatkarte | driftet 11 px nach oben, jedes Bild neu subpixel-gerastert |
| Figurenkasten | **856 px breit auf einer Bühne von 719** |
| `passung`-Bremse | griff dauerhaft auf **0,806**, unbemerkt seit dem Umbau |

**Zwei Befunde, die nur die Messung zeigt:** Der Bühnenzoom sprang an **jedem
Schnitt** um 4,5 % zurück. Und Blinzeln und Atmen liefen bei beiden Figuren
**exakt synchron** — `poseDerKette` reichte den Versatz nie weiter. Zwei
Figuren, die gleich atmen, sind ein Objekt, das zweimal gezeichnet wurde.

## Der Rhythmus war eine Schablone, und niemand hatte sie entschieden

Nachgezählt über **alle vier** Entwürfe: `VWVWVWVWVWVWVWV`, `VWVWVWVWVWVWV`,
`VWVWVWVWVWV`, `VWVWVWVWVWVWV` — **14/14, 12/12, 10/10, 12/12 Wechsel.** Kein
einziger Redeanteil wich ab.

Und zwei Regeln trieben aktiv hinein: `redelauf` verbietet lange Blöcke,
`stimmanteil` verlangt ausgeglichene Anteile — der kürzeste Weg, beide zu
erfüllen, ist striktes Abwechseln.

**`rueckbezug` war dabei weit übererfüllt:** fünf von zehn Zeilen greifen ein
Wort der Vorzeile auf, verlangt sind zwei. Trotzdem war es kein Gespräch.
**Ein Maß, das eine Zeichenkette zählt, kann eine Beziehung nicht sehen** — die
Schwelle zu erhöhen hätte nichts gebracht.

## Die Kombinatorik der Zugarten, gerechnet

| Einheit | mögliche | in 3 gesehenen Shorts erwartet |
|---|---|---|
| Zugpaar | 72 | ~30 Wiederholungen je Woche — harmlos, das ist Sprache |
| **Zugtripel** | 380 | **~1,1 — die Sichtbarkeitsschwelle** |
| Zugquadrupel | 2.600 | 0,17 — unsichtbar |

Deshalb sitzt die laufweite Regel auf dem Tripel. Bei zehn statt zwölf Zugarten
sänke die Tripelzahl auf 250 und die Erwartung stiege auf 1,7 — das ist das
einzige belastbare Argument für zwölf. **Alle Zahlen sind gerechnet, nicht
gemessen**, und fallen, sobald zwölf Shorts mit Zügen vorliegen.

## Was der Belegprüfer fand — acht Stellen in zwei Durchgängen

**Keine davon hätte eine Regel gefunden.** Alle acht sind
Bedeutungsverschiebungen innerhalb korrekter Zeichenketten. Zwei waren aus
meinen eigenen Korrekturen: die gekürzte Zitatkarte ohne „routinemäßiger", und
beim Beheben des Verdacht-Problems der Tausch des **Wortes** statt der
**Logik** („erst bei einem Hinweis" macht aus einem hinreichenden Anlass den
einzigen).

## Offen aus dem Plan „Aus dem Nebeneinander ein Gespräch machen"

- [x] ~~**Die drei übrigen Entwürfe migrieren** — alle vier sind jetzt
      Gespräche. Gelernt dabei: Das Zugsystem allein macht noch keins. Drei von
      vier Shorts eröffneten mit derselben Figur „Behaupten → Nachhaken →
      Beantworten", und **gefunden hat das nicht mein Auge, sondern die
      Tripelregel** — eine Stunde nachdem ich sie gebaut hatte~~
- [x] ~~**`zug` auf Pflicht**, Übersprungzweig gelöscht, Quellensperre und
      Formsperre hängen an `behauptet` statt an `machart`. Das war keine
      Umbenennung: Eine quellenlose Zeile **ohne** Machart entkam der alten
      Sperre vollständig~~
- [x] ~~**Die laufweite Tripelregel** in `laufweiteBefunde`, auf benachbarten
      Shorts. Sie hat beim ersten Lauf dreimal gemeldet und dreimal recht
      gehabt~~
- [ ] **Die vierte Wand**: Pose `ansprechen` plus ein `zuwendung`-Faktor.
      Der eigentliche Fund liegt nicht in der Pose: `BLICK_ZUR_MITTE` und
      `HINLEHNEN` ziehen Volti zu Watti, **während er den Zuschauer
      anspricht** — eine neue Pose allein löst das nicht.
      `Wortwechselprobe` rendert ohne `Sprecherstand` und zeigt deshalb
      ausgerechnet diese beiden Größen nicht
- [ ] **Der Zug an der Tonspur** — `Redelauf.zug` → `abschnitte[].zug`, plus
      eine Wache: `src/stimme.ts:679` verschmilzt zwei Anteile derselben Figur
      **innerhalb einer Szene**, und dabei geht der zweite Zug still verloren
- [ ] **Die Haltungsprobe vor dem Bau.** Der Körperwinkel ist als Träger
      blockiert — `drehung.koerper` klemmt bei ±9, und `stutzen` 8 plus
      Gewicht 1,65 plus `HINLEHNEN` 1,5 ergeben **11,15**, was `winkelKlemmen`
      schon heute still abschneidet. Die Haltung gehört auf Hub, Stauchung und
      Beine; der Pivot bei y = 138 lässt die Füße stehen. Ausschlag rund 2,9
      von 88 Einheiten — **erst ein Standbild in Feed-Größe, dann bauen**
- [ ] **Der Publikumston** am Kipppunkt, einmal je Short, ein Raunen
- [ ] **Ein Video mit vollem Ton** — braucht Emirhans Zustimmung

## Der Belegprüfer am 01.09.2026 — elf Stellen, eine davon umgekehrt

Die drei neu geschriebenen Entwürfe gingen an den `belegpruefer`, **bevor**
vertont wurde. Elf Befunde, und der erste ist der teuerste, den dieses Projekt
bisher hatte:

**`ersatzteil-freischalten` behauptete das Gegenteil des Belegten.** Der
Kipppunkt lautete „Nicht, wenn du dein Handy vorher gekauft hast", gebunden an
„gilt nicht für Kaufverträge, die vor dem 31. Juli 2026 geschlossen wurden".
Der volle Satz beginnt mit **„Artikel 16 dieser Richtlinie"** — und Artikel 16
ändert die Warenkaufrichtlinie. Das Softwareverbot steht in Artikel 5 Absatz 6
und kennt diese Übergangsregel nicht. Das Verbot gilt für das Gerät in der Hand
des Zuschauers sehr wohl.

`npm run quellen-pruefen` war dabei grün — die Zeichenkette stand auf der
Seite. **Die Subjektregel hat gefehlt, weil das Subjekt hier kein Substantiv
ist, sondern eine Artikelnummer.**

Vier weitere Zitate haben ihr Subjekt bekommen: „All equipment flown aboard the
ISS", „Ideal ist es zudem", der Vorbehalt „es sei denn …" und der allgemeine
UBA-Satz zum Ladeverhalten statt des Lagerabsatzes.

**Das Muster über alle elf:** Neun hängen an einem Wort **außerhalb** der
geprüften Zeichenkette — davor, dahinter oder in der Artikelnummer. Zwei sind
Verallgemeinerungen im Sprechtext selbst („Deins", „deine Werkstatt darf").
Keiner wäre von einer Regel zu finden gewesen.

**Und der neue Kipppunkt ist besser als der falsche.** Die Ausnahme im Verbot
(„es sei denn, dies ist durch legitime und objektive Faktoren wie den Schutz
der Rechte des geistigen Eigentums … gerechtfertigt") steht unmittelbar hinter
der Fundstelle, an der der Short ohnehin hing, und ist die Wendung, die
`absicht` verlangt: Es gibt ein Verbot, und jemand hat eine Tür hineingeschrieben.

## Die Gegenprobe fand elf weitere — darunter die dokumentierte Falle

Nach den Reparaturen ging derselbe Text noch einmal an den `belegpruefer`, und
**das war nicht Vorsicht, sondern hat sich gelohnt**: elf weitere Befunde in
Sätzen, die ich gerade erst angefasst hatte.

**Der wichtigste ist die Falle, die in dieser Datei schon steht.** Ich hatte im
Ersatzteil-Short das Zitat ausgetauscht, das die Ausnahme nach Gerätealter
belegen sollte — und Wattis Pointe „Meins ist von der Schulzeit" stehen lassen.
**Das Wort war getauscht, die Folgerung war geblieben**, genau wie am
31.08.2026 bei „erst bei einem Hinweis". Die Stelle sah geprüft aus, weil die
Zeile daneben repariert war.

Vier Muster über alle elf:

- **Der Vorbehalt fällt weg wie eine Verneinung.** „Hersteller dürfen nicht
  behindern, **wenn** die Teile den Anforderungen entsprechen" wurde zu einem
  unbedingten Verbot. Dieselbe Bauform wie das gekappte „nicht" am Satzende,
  nur die andere Satzhälfte.
- **„Hier steht:" ist ein Versprechen.** Wer so einleitet, gibt sich als
  Vorlesender aus — eine Zusammenfassung, die eine Tatbestandsvoraussetzung
  streicht, wiegt dort schwerer als anderswo.
- **Das Subjekt fällt beim Kürzen zuerst.** „Eine **Aufbewahrung** bei extremer
  Kälte" wurde zu „Extreme Kälte", und aus einem Lagerhinweis ein Ladeverbot.
- **Der Sprechsatz weicht von seinem eigenen `stuetzt` ab.** „hätte zu lange
  gedauert" stand im `stuetzt` richtig da, im Sprechtext stand „hätte es nicht
  geschafft". Zwei Sätze über dieselbe Fundstelle, in derselben Zeile geprüft,
  und nur einer war richtig.

Dazu ein Randfund, der keiner Belegregel unterliegt: In `daten/quellen.json`
stand eine **relative Zeitangabe** („Er liegt drei Wochen zurück"). Das Kapitel
„Zeitangaben altern" galt bisher nur dem Sprechtext.

