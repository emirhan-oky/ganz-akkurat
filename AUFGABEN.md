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

## Offen

- ▸ **Die acht Shorts abnehmen** — `laeufe/2026-08-17/freigabe.html`.
      Danach `npm run veroeffentlichen`, das nie im Ganzen gelaufen ist.
- [ ] Namen bestätigen. Ich habe meinen eigenen Vorschlag genommen, weil du
      beim Tag weitergegangen bist — „Das gilt jetzt" wäre die Alternative.
- [ ] Der neue Sendeplatz hat **keinen haltbaren Vorrat**. Acht Beobachtungs-
      posten stehen jetzt in `daten/ideen/neu.ts`; nachschauen bleibt
      Wochenarbeit. Der nächste Termin: Meldepflichten des Cyber Resilience
      Act im September
- [ ] Sechs Themen hängen an Spezifikationen, die kostenpflichtig sein
      könnten (JEDEC, ISO/IEC Cat, HDMI, DVD-Regionalcode, Festplatten-
      Parken, POSIX-Epochenzeit). Vor dem Bauen je einmal nachsehen —
      danach entweder produzieren oder ganz streichen

## Achter Sendeplatz · 17.08.2026

- [x] ~~`Format` auf acht, `Lauf` auf acht Shorts, MATRIX-Prüffrage davor~~
- [x] ~~Sendezeit gehört jetzt ans Format (`FORMATE[...].uhrzeit`) — zwei
      Mittwochsvideos wären sonst auf dieselbe Minute gefallen~~
- [x] ~~Loch in der Formatprüfung geschlossen: Die Gegenprobe lief nur, wenn
      Shortzahl und Formatzahl gleich waren, und schwieg genau dann, wenn sie
      gebraucht wurde~~
- [x] ~~Reparaturrichtlinie 2024/1799 abgerufen, drei Zitate bestätigt~~
- [x] ~~`ein-stecker` von `recht` auf `handy`, sonst wäre `recht` dreimal drin~~

## Erledigt am 17.08.2026 · Nachmittag

- [x] ~~Vertonung: sieben Shorts, 2.508 Zeichen, 0 Fehler~~
- [x] ~~Denkpause gemessen statt geraten (`npm run pausenprobe`): Auslassungs-
      punkte geben 0,38 / 0,86 / 1,69 s, der `<break>`-Tag trifft auf ein
      Zehntel. `pauseNach` ist zu `pauseSek` geworden~~
- [x] ~~**EUR-Lex wieder maschinell prüfbar** — nicht über die Weboberfläche,
      sondern über Cellar. `quellen-pruefen` leitet CELEX-Adressen selbst um~~
- [x] ~~**Gelbe Punkte belegt**: BSI IT-Grundschutz SYS.4.1 schreibt wörtlich
      „nicht dokumentiert und kann nicht abgeschaltet werden"~~
- [x] ~~Streitfälle von 5 auf 10 aufgefüllt, Montag von 5 auf 9~~
- [x] ~~45 Zitate geprüft, 0 Beanstandungen~~

## Danach

- [ ] Instagram-Handle `@ganzakkurat` bestätigen, dann alle drei sichern
- [ ] R2-Bucket heißt noch `setupklarvideos` — Cloudflare kann nicht
      umbenennen, also neu anlegen und umziehen
- [ ] Vor dem gewerblichen Start: DPMAregister auf „Akkurat" in Klasse 41
