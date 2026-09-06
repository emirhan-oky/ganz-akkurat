# Vertonung, der bezahlte Lauf und die Pausen

Am 06.09.2026 wörtlich aus `CLAUDE.md` hierher verschoben. **Vor jedem
bezahlten Lauf zu lesen** — die Kurzfassung dessen, was Geld kostet, steht im
Vertrag unter „Was Geld kostet und was nach draußen geht"; hier steht, warum.

## Vertonung

**Modell: `eleven_v3`** seit dem 25.08.2026. Vorher lief
`eleven_multilingual_v2`, das Modell von 2024 — und es war der Grund für eine
Suche, die ins Leere lief: **26 Stimmen** wurden für die zweite Figur
synthetisiert und vermessen, und keine überzeugte. Bei der Trefferquote liegt
der Fehler nicht in der Auswahl. Dieselbe Stimme durch v3 war nicht eine
andere, sondern eine bessere.

v3 versteht **Regieanweisungen** in eckigen Klammern. Für Watti ist das keine
Spielerei: Seine Macharten heißen Ratlosigkeit, Geständnis und falscher
Schluss, und die lassen sich damit ansagen statt hoffen.

**Seit dem 26.08.2026 hängt ein Vorrat an Anweisungen an der Machart** —
`regie` in `MACHARTEN`, gewählt von `syntheseText`. Die Anweisung
steht **nur im Synthesetext**: `sprechtext` bleibt unberührt, damit Untertitel,
Längenschätzung und die Gleichheitswache `rede` ↔ `sprechtext` nichts davon
mitbekommen, und `woerterAusAusrichtung` filtert die Klammer hinterher ohnehin
wieder heraus. Das Schema lehnt eckige Klammern im Sprechtext ab — von Hand
geschrieben zählte `ZEICHEN_PRO_SEKUNDE` sie als gesprochen.

**Ein Vorrat, kein fester Tag.** Ein fester Marker je Machart wäre nach vier
Wochen eine Schablone; genau das steht hier schon beim Ausruf. Gewählt wird
deterministisch aus `id` und Machart — nicht über die Listenposition, die den
ersten Short jedes Laufs immer gleich klingen ließe, und nicht per Zufall,
weil derselbe Short beim zweiten Render gleich klingen muss.

**Nur nicht-hörbare Anweisungen.** Ein Seufzer erzeugt Ton, den keine
Schätzung sieht — derselbe Fehler wie die Sprecherwechselpausen, am selben Tag
eingebaut, an dem sie eingefangen wurden.

**Was hörbar ist, entscheidet das Ohr** — die Klammerspanne aus der
Zeichenausrichtung kann es nicht. Sie war als Sieb vor die Blindwahl gebaut und
hat sich am 26.08.2026 selbst widerlegt: zwei Läufe, zwei Ordnungen
(`[snorts]` 1,20 dann 0,44), und `[laughs]` stand auf „still". Ein Lachen ist
per Definition Ton. **Eine Größe, die bei Wiederholung ihre Ordnung verliert,
misst nichts** — und eine dritte Schwelle zu erfinden wäre dasselbe Spiel
gewesen. Gemessen wird erst wieder die Dauer der zwei bis drei Tags, die
tatsächlich in einen Vorrat kommen; die wandert dann als Konstante nach
`src/zeit.ts`.

**Die Stimmeinstellung steht seit dem 30.08.2026 auf einem Vergleich.**
`stabilitaet: 0.45` stammte aus der v2-Zeit, wo der Regler stufenlos war; v3
kennt drei Stufen, und die robuste dämpft Regieanweisungen. Vier Stufen wurden
an derselben Zeile abgelegt und gehört — 0,45 klingt am besten, die Zahl bleibt
also. Die Zahlen daneben trugen wieder nichts bei: Dieselbe Zeile ergab 2,56
bis 3,12 Sekunden, und `speed 0.8` kam kürzer heraus als `speed 1.0`.

**Alle sechs Vorräte sind leer, und das ist der beabsichtigte Zustand.** Was
darin steht, entscheidet eine Blindwahl an Wattis Stimme — je Machart die echte
Zeile und eine tonlos geschriebene, dazu vier unbeschriftete Fassungen samt
der ohne Ansage. Vorher standen dort sechs Tags, die ich aus dem Gedächtnis
gewählt hatte; einer davon existiert nicht.

**Und die Regel, die die Ansage nicht aushebeln darf:** Die Zeile muss ohne
Anweisung funktionieren. Der Tag verstärkt, er ersetzt nie — sonst lässt er
einen zusammenfassenden Kommentar klingen wie Ratlosigkeit, ohne dass er eine
wird, und `npm run pruefen` wird dabei grün.

**Zwei Stimmen, zwei Aufrufe je Lauf.** ElevenLabs synthetisiert mit genau
einer Stimme. `redelaeufe` in `src/stimme.ts` bildet je zusammenhängendem Stück
einer Figur einen Lauf — **über Szenengrenzen hinweg**, solange dieselbe Figur
weiterspricht. Der erste Anlauf schnitt an jeder Szene und machte aus einem
einstimmigen Short sechs Aufrufe statt einem, gegen die Begründung, aus der die
Verkettung überhaupt existiert: durchgehende Betonung.

**Die Pausen zwischen den Sprechern zählen mit.** 0,28 Sekunden bei jedem
Wechsel innerhalb einer Szene, 0,45 an einer Szenengrenze mit Wechsel — beide
Zahlen stehen seit dem 26.08.2026 in `src/zeit.ts` und nicht mehr nur in der
Vertonung. Vorher wusste die Schätzung nichts von ihnen: **1,2 bis 1,6 Sekunden
je Short fehlten** in der Sprechprobe, in der Längenprüfung und im tonlosen
Render.

`zusatzpausenSzene` rechnet sie **je Szene** und nicht nur als Summe. Sonst
gäbe es zwei Wahrheiten über dieselbe Länge: eine für die Prüfung, eine für den
Zeitplan — dieselbe Sorte Widerspruch, die schon einmal eine leere Bühne am
Videoende erzeugt hat.

Die Rechnung ist ein **Abbild** von `redelaeufe` und kein zweiter Entwurf.
Aufrufen lässt sie sich nicht: `src/stimme.ts` importiert `node:buffer`, und
die Schätzung läuft über `calculateMetadata` im Browser. Deshalb hält
`npm run pruefen` beide Fassungen je Short gegeneinander und meldet jede
Abweichung über einer Millisekunde — **eine Doppelung ohne Wache ist der
eigentliche Fehler, nicht die Doppelung.**

**Zusammengeklebt wird nichts.** Die Abschnitte werden im Renderer
nebeneinandergelegt, je einer in einer `Sequence`. Kleben bräuchte ffmpeg, und
hier gibt es nur den abgespeckten Remotion-Wrapper (`skripte/ff`, 50 Filter,
kein `afade`).

**Die Besetzung:** Volti ist Lenny (132 Hz), Watti ist Prayan (198 Hz). Beide
Kennungen stehen in `.env` als `ELEVENLABS_VOICE_ID` und
`ELEVENLABS_VOICE_ID_ZEIGER`.

Zwei Messbefunde, die für jede künftige Besetzung gelten:

- **Unter 40 Hz Abstand klingen zwei Stimmen im Wechsel wie eine.** Der erste
  Vorschlag lag fünf Hertz neben Volti.
- **Eine Einzelmessung der Tonhöhe trägt nicht.** Dieselbe Stimme, derselbe
  Text, zwei Aufnahmen: Olaf maß 182 und 155 Hz. Die Synthese ist nicht
  deterministisch — der Vertrag weiß das schon von der Länge.

## Der bezahlte Lauf

**Ein Fehlschlag nimmt einen Short mit, nicht den Lauf.** Seit dem 01.09.2026
liegt ein `try/catch` um die Vertonung des einzelnen Shorts, und die Tonspur
wird **sofort** nach ihrer Synthese in `laeufe/<tag>/props/` geschrieben statt
erst nach dem Render.

Vorher konnte ein Fehlschlag beim vierten Short die ersten drei kosten: Die
MP3-Dateien lagen da, aber `--ton-behalten` sucht `props`-Dateien, und die
entstanden erst in Schritt 4. Ein Neustart zahlte alles ein zweites Mal. Das
Loch war im Code sogar schon benannt — es war die Begründung dafür, dass die
Plausibilitätswache lieber warnt als wirft. **Eine Wache, die einem behebbaren
Problem ausweicht, sichert das Problem ab statt das Ergebnis.**

**Was die Plausibilitätswache anschlägt, steht jetzt in der Freigabe.** Die
Befunde wandern als Hinweis in die reguläre Befundliste und damit in
`lauf.json` und auf die Freigabeseite. Bis dahin waren sie eine Konsolenzeile
im Vertonungsblock: **Ein Befund, den nur das Terminal kennt, gilt bis zum
nächsten Scrollen.**

**Der Zug in der Tonspur ist optional, und das ist keine Schlamperei.** Am
Redeanteil ist er Pflicht — dort wird geschrieben. In `tonspur.abschnitte` ist
er ein abgeleiteter Wert, und Renderdaten sind eine Momentaufnahme eines
älteren Vertrags. Als Pflichtfeld eingebaut, hat er am selben Tag **jede früher
bezahlte Tonspur unbrauchbar gemacht**: `--ton-behalten` parst das Schema als
Ganzes, um einen Trockenlauf von einem vertonten zu unterscheiden. Gefunden hat
das nicht die Überlegung, sondern die Gegenprobe an einer echten Datei aus
`laeufe/`.

**Die berechneten Markentöne sind nicht versioniert** (`*.wav` in
`.gitignore`) und entstehen mit `npm run toene`. `npm run pruefen` prüft seit
demselben Tag, dass alle vier da sind — der schlechtere Fall ist nicht der
Absturz, sondern das **stumme Video**, das durchgeht.

Die Liste der vier steht in `MARKENTOENE` in `src/marke.ts` und nicht im
Skript, das sie erzeugt. Der erste Anlauf legte sie dorthin, und die Wache
importierte sie von da — aber `skripte/toene.ts` hat ein `await main()` am
Modulende. **Der Import erzeugte die Dateien, deren Vorhandensein die Wache
prüfen sollte**, und sie war immer grün. Eine Wache, die ihren eigenen
Prüfgegenstand herstellt, prüft nichts.

### Die Pausen, gefallen am ersten Video

**`SPRECHERWECHSEL_SEK` 0,15 → 0,45 und `PAUSE_NACH_SZENE_SEK` 0,2 → 0,7, seit
dem 01.09.2026.** Beide standen seit dem 31.08. als „geratene Zahl, die am
nächsten fertigen Video fällt". Das Video war da, und das Urteil vom Handy:
„Generell könnten sie an einigen Stellen langsamer sprechen. Immerhin geht das
Video nur 51 Sekunden." Die Sätze sind so lang, wie sie sind; was den Eindruck
„zu schnell" macht, sind die Nähte.

**Nachjustiert ohne Kontingent — jetzt wirklich.** An beiden Konstanten stand
„Nachjustieren kostet nichts: Die Tondateien bleiben, nur die `startSek`
verschieben sich", und kein Code hat das eingelöst: `--ton-behalten` übernahm
die Tonspur samt alter Startzeiten. `tonspurNeuLegen` in `src/zeit.ts` misst
je Naht die tatsächliche Stille, hebt sie auf den Zielwert an und schiebt alles
dahinter — Abschnitte, Wörter, Szenenstarts, Gesamtdauer. **Nur vergrößern,
nie verkürzen**: verkürzt lägen die Dateien übereinander, und eine Naht, die
schon länger ist, hat einen Grund. Der erste Abschnitt rückt dabei hinter den
neuen Vorspann; ohne das liefe eine ältere Tonspur 1,2 Sekunden in den
fahrenden Vorhang hinein.

`passwort-wechseln` ging damit von 49,9 auf 56,7 Sekunden. `raumstation` und
`ersatzteil` liegen nach Schätzung jetzt **über 67** und müssen vor ihrer
Vertonung kürzer werden.

**Und Volti wartet 0,6 Sekunden**, bevor er den Showtitel sagt
(`VORSPANN_VORLAUF_SEK`). „Er sagt es für mich viel zu schnell." Der Titel
steht ab Bild 0, nur die Stimme wartet — und weil der Vorlauf in
`vorspannFestSek` steckt, rücken Themenansage und Fahrt mit.
