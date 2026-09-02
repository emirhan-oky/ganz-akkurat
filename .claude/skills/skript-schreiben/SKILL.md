---
name: skript-schreiben
description: Den Dialog eines Shorts schreiben — von der Lage über den Kaltstart bis zum Nachschlag, mit Zügen, Macharten und der Selbstprüfung. Nutze das beim Anlegen eines neuen Entwurfs in `daten/entwuerfe/`, beim Umschreiben eines flachen Skripts, und immer wenn eine Reaktionszeile nicht trägt.
---

# Ein Skript schreiben

Der Schritt zwischen `thema-finden` und `woche-bauen`, und bis zum 02.09.2026
der einzige ohne Anleitung. `thema-finden` sagt selbst: „Der eigentliche
Engpass des Kanals. Nicht das Schreiben." Das stimmte, solange ein Short ein
Vortrag mit Beleg war. Seit er ein Gespräch ist, stimmt es nicht mehr.

Das Ergebnis der Lücke steht im Befund vom 02.09.2026: „In den letzten Tagen
ist mir aufgefallen, dass das Script von uns immer sehr kacke war."

## Die Reihenfolge, und sie fängt nicht beim Fakt an

**1 · Die Lage, nicht das Thema.**

Die Frage lautet nicht „worum geht es", sondern **„was ist Watti gerade
passiert"**. Der Unterschied ist am 01.09.2026 an `passwort-wechseln` gemessen
worden: Der Short begann bei einem Sachverhalt statt bei einer Lage, und das
las sich als „blindlings reingeworfen". Der Kommentar oben in der Datei ist das
ausführlichste Protokoll darüber, das es im Projekt gibt.

Eine Lage hat einen Zeitpunkt, einen Schaden und einen, dem er passiert. „Der
Routinewechsel bringt nichts" ist ein Thema. „Jemand war in meinem Konto, und
ich wechsle brav alle 90 Tage" ist eine Lage.

**2 · Der Kaltstart.**

Der erste Satz des Videos, vor dem Vorhang. Wähle die Art aus
`KALTSTART_ARTEN`; welche Figur spricht, entscheidet das Format
(`KALTSTART_SPRECHER`) und nicht der Entwurf.

Drei Grenzen: höchstens 3,5 Sekunden, keine Ankündigung, und bei Watti keine
Tatsachenbehauptung. Voltis Erstaunen behauptet und trägt deshalb eine
`belegId`.

Dazu ein Symbol aus `KontextArt` — es ist die halbe Pointe, wenn es der
Gegenstand der Lage ist, und Ballast, wenn es nur das Thema bebildert.

**3 · Die Themenzeile.**

Sie trägt den Namen dessen, der den Kaltstart gesprochen hat, und behauptet
nichts: „Wattis Passwort und der Kalender". Das ist keine Zusammenfassung des
Videos, sondern der Titel dieser Folge.

**4 · Der erste Satz nach dem Vorhang.**

Er kommt vom **anderen** und antwortet: `nachhaken`, `richtigstellen`,
`beantworten` oder `widersprechen`. `abbiegen` ist hier verboten — der Zug, der
am Gesagten vorbeigeht, ist genau das, was ein Kaltstart nicht überlebt.

Ein Wort aus dem Kaltstart soll wieder vorkommen. Die Regel meldet nur einen
Verdacht; sie kann eine Beziehung nicht sehen, sondern nur Zeichenketten
zählen.

**5 · Der Bogen.**

Aufschlag, Zuspitzung, Kipppunkt, Nachschlag — die Folge läuft nur vorwärts.
Jede Zeile trägt einen `zug` (was tut sie dem anderen an?), jede Reaktion
zusätzlich eine `machart` (was fügt sie dem Fakt hinzu?). Beides gilt
gleichzeitig.

**6 · Die Selbstprüfung.**

Siehe unten. Sie ist der Teil, den `npm run pruefen` nicht übernehmen kann.

## Die eine Regel, an der alles scheitert

**Eine Reaktion, die den Fakt zusammenfasst, ist keine Reaktion.** Sie muss
etwas hinzufügen, das im Fakt nicht steht.

Ohne Vorgabe fällt jeder Entwurf auf den zusammenfassenden Kommentar zurück.
Das ist der Normalfall, nicht die Ausnahme, und `npm run pruefen` wird dabei
grün. `joke-engineering` nennt den Fehler H4: „punchline is stated rather than
implied". Sein Gegenmittel heißt strategische Auslassung — eine Spur früher
aufhören, als der Satz fertig wäre.

| flach | trägt |
|---|---|
| Die Regel, über die sich alle beschweren, hilft also niemandem. | Kacke, was dann? |
| Das Teil funktioniert. Es darf nur nicht. | Also haben Einzelteile jetzt Herrchen. |
| Ich mache das seit zehn Jahren. | Wie? Ich mache das seit zehn Jahren. |

## Die beiden Figuren

**Volti** liest nach und trägt die belegte Aussage. **Watti** reagiert. Sie
sind Brüder — man sucht sich nicht aus, wen man korrigiert, und das ist der
Grund, warum „Du Idiot" nach Küche klingt statt gemein.

**Watti ist der kleine Bruder, der die Welt noch nicht versteht.** Er macht
alles falsch und lernt nichts, und er tappt nicht aus Trotz hinein, sondern
weil er es wirklich nicht weiß. Sein Ausruf ist „Watt?" — norddeutsch für
„Was?", womit er bei jeder Verwirrung fast seinen eigenen Namen sagt.

Vier Reaktionswege: trotzen, falsch folgern, nachfragen was schon dasteht, sich
verraten. **Was er nicht tut: zustimmen.** Er sagt nie „Ach so.", nie „Du hast
recht.", nie „Interessant." und nichts Belegtes.

**Der Härtetest:** Ließe sich die Zeile tauschen, ohne dass es auffällt, gehört
sie keinem von beiden.

## Die sieben Humorregeln

Aus dem Eichmaß vom 25.08.2026, an fünfzehn von Emirhan einzeln bewerteten
Zeilen. Der Wortlaut steht in `daten/marke/voice.md`; hier die Kurzform, damit
sie beim Schreiben danebenliegt.

1. **Verständlichkeit schlägt Pointe.** Kein Witz hängt an einem Wort, das die
   Zielgruppe 18–30 nicht benutzt.
2. **Ein Bild schlägt ein Paradox.** „Einzelteile haben jetzt Herrchen" statt
   einer sauberen Verneinung.
3. **Im Moment gesprochen, nicht rückblickend.** Das vorangestellte „Wie?"
   trägt die ganze Zeile.
4. **Die Pointe zielt auf den Verursacher.** Nicht auf die Sache und nie auf
   den Zuschauer.
5. **Keine Mensch-Maschine-Vergleiche.** Sie sind als Konstruktion erkennbar.
6. **Sofort, nicht nach einem Takt.** Wer überlegen muss, lacht nicht mehr. Im
   Zweifel banaler.
7. **Der Ausruf variiert.** Ein fester Marker ist nach vier Wochen eine
   Schablone.

## Was das Schema ohnehin erzwingt

Nicht hier nachbauen — es steht in `src/typen.ts` und meldet sich von selbst:
Positionen und ihre Folge, mindestens eine Reaktionszeile, keine Machart
zweimal, Antwortpflicht nach `widersprechen` und `nachhaken`, höchstens ein
`abbiegen`, die Belegpflicht auf Zuspitzung und Kipppunkt, das Längenfenster.

**Was es nicht prüfen kann und du prüfen musst:** ob die Reaktion etwas
hinzufügt, ob die Lage trägt, ob der Kipppunkt wirklich kippt, und ob eine
Zeile ihrem Sprecher gehört.

## Vor dem Vertonen

`npm run pruefen`, dann `npm run belege` von Hand lesen, dann den Subagenten
`belegpruefer`. Er hat am 01.09.2026 in einem Durchgang elf Stellen gefunden,
davon **neun an einem Wort außerhalb der geprüften Zeichenkette** — und eine,
in der der Short das Gegenteil dessen behauptete, was die Quelle sagt, während
`npm run quellen-pruefen` grün war.

**Und jede Kürzung nimmt ein Wort mit, das gedeckt war.** Beim Umschreiben am
31.08.2026 fand der Belegprüfer sechs Stellen, alle sechs in Sätzen, die gerade
erst angefasst worden waren.
