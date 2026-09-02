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

Der erste Satz des Videos, vor dem Vorhang — **und er ist die Hook.** Hier
entscheidet sich, ob jemand bleibt; die erste Szene läuft rund neun Sekunden
später und redet zu jemandem, der sich längst entschieden hat.

Wähle die Art aus `KALTSTART_ARTEN`. Welche Figur spricht, steht an der Art und
nicht am Format: Sechs der sieben gehören Watti, `erstaunen` gehört Volti.

Drei Grenzen: höchstens 68 Zeichen (5,2 Sekunden), keine Ankündigung, und bei
Watti keine Tatsachenbehauptung. Voltis Erstaunen behauptet und trägt deshalb
eine `belegId`.

**Er nennt das zusammengesetzte Substantiv**, das das Thema festnagelt —
Akkuwechsel, Flugmodus, Handyversicherung, Kabelschublade. Nicht „die
Versicherung", nicht „der Aufkleber".

**Und er trägt den Konflikt, nicht immer Wattis Irrtum.** Behält Watti am Ende
recht, kann er vor dem Vorhang nicht schon danebenliegen.

Dazu ein Symbol aus `KontextArt` — es ist die halbe Pointe, wenn es der
Gegenstand der Lage ist, und Ballast, wenn es nur das Thema bebildert.

**3 · Die Themenzeile.**

Sie trägt einen der beiden Namen und behauptet nichts: „Wattis Passwort und der
Kalender". Das ist keine Zusammenfassung des Videos, sondern der Titel dieser
Folge.

**Sie nennt den, um den es geht, nicht den, der anfängt.** In
`zettel-im-treppenhaus` spricht Watti vor dem Vorhang, und die Zeile heißt
„Voltis Zettel und die Nachbarn" — weil der Short davon handelt, dass Volti
ertappt wird.

**4 · Der erste Satz nach dem Vorhang.**

Er kommt vom **anderen** und antwortet: `nachhaken`, `richtigstellen`,
`beantworten` oder `widersprechen` — oder er spricht ihn mit Namen an.
`abbiegen` ist hier verboten: der Zug, der am Gesagten vorbeigeht, ist genau
das, was ein Kaltstart nicht überlebt.

**In den Belehrungsszenarien wird der Kaltstart sofort gekontert.** „Er wird
niemals herausfinden, wer die Beschwerde ausgedruckt hat." → „Watti, wieso
erhalte ich eine Beschwerde von dir per Post?"

Ein Wort aus dem Kaltstart soll wieder vorkommen. Die Regel meldet nur einen
Verdacht; sie kann eine Beziehung nicht sehen, sondern nur Zeichenketten
zählen.

**5 · Der Bogen.**

Aufschlag, Zuspitzung, Kipppunkt, Nachschlag — die Folge läuft nur vorwärts.
Jede Zeile trägt einen `zug` (was tut sie dem anderen an?), die witzigen
zusätzlich eine `machart` (wie ist sie witzig?). Beides gilt gleichzeitig: „Ich
bin bei Passwort7" ist ein tadelloses Geständnis *und* geht am Vorredner
vorbei.

**Der Schluss gehört der Beziehung, nicht der Sache.** Acht von neun Dialogen
enden so — „Ich bin umsonst du Idiot.", „Jetzt sagen wir beide nichts mehr im
Wohnzimmer.", „Das ist mein großer Bruder." Warm und böse dürfen im selben Satz
stehen.

**6 · Die Selbstprüfung.**

Siehe unten. Sie ist der Teil, den `npm run pruefen` nicht übernehmen kann.

## Wo die Wege stehen: `daten/szenarien/`

**Der Skill enthält die Szenarien nicht, er liest sie.** Ein Dokument je
Szenario, darin vier Beispiele — mit einem einzigen Beispiel baut jeder Entwurf
genau dieses eine nach. Eine neue Runde legt dort eine Datei ab und fasst diesen
Skill nicht an.

Zwölf Szenarien sind benannt, fünf haben Beispiele:

| | Szenario | wie die Wendung gebaut ist |
|---|---|---|
| 1 | Volti belehrt Watti | der Normalfall |
| 2 | Watti fragt um Rat | Volti antwortet **und rät** |
| 3 | Watti weiß etwas und schließt falsch | Volti kontert mit dem Satz danach |
| 4 | Watti kontert erfolgreich | Erinnerung · Gegenbeispiel · Frage ohne Antwort in der Quelle · Zufallstreffer |
| 5 | Volti wird ertappt | er tut selbst, wovon er abrät |
| 6–12 | noch ohne Beispiel | Beide daneben · Wattis Plan · der Rückfall · der Dritte im Raum · die Wette · falsch weitererzählt · Volti hat es aufgegeben |

**Der Zug `erinnern` macht Szenario 4 und 5 überhaupt möglich.** Wattis Konter
ist fast nie ein Fakt aus einer Behördenquelle, sondern etwas aus ihrer
Wohnung: „Sie hat einen runden Stecker, und du hast letzte Woche danach
gefragt." Er behauptet nichts über die Welt und braucht deshalb keinen Beleg.

## Die sechzehn Witzbauarten haben zwei Fächer

`MACHARTEN` in `src/typen.ts`, jede mit einem Feld `wer`. **Wattis zehn**
behaupten nichts und tragen deshalb keine Quelle. **Voltis fünf** sitzen gerade
auf der belegten Zeile.

| | Wattis Fach | Voltis Fach |
|---|---|---|
| | Geständnis · falscher Schluss · Ratlosigkeit · banale Rückfrage · absurde Rechtfertigung · Themenwechsel als Konter · Übercompliance · Umdeutung · falsche Autorität · Übertreibung ins Katastrophale | entwertende Nebenbemerkung · gedrehter Parallelbau · banale Auflösung · Geschenk mit Widerhaken · Empörung gegen den Falschen |

Geteilt: **das Bild**, **der Vergleich mit einem Menschen**, und —
ausnahmsweise — **Geständnis** und **Widerhaken**, wenn die Rollen sich drehen.

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
recht.", nie „Interessant."

**Er darf aber gewinnen.** Watti hat oft in einem Punkt recht und zieht nur den
falschen Schluss — er ist nicht dumm, sein Schluss ist es. Und er darf Volti
loben: „Das ist mein großer Bruder."

**Er darf sogar die Quelle tragen**, wenn im Dialog steht, woher er es weiß:
„Steht beim BSI du Idiot, ich lese auch mal was." **Die Quelle wandert mit der
Vorgeschichte, nicht mit der Rolle.**

**Volti ist bei Technik überlegen, im Umgang mit Menschen nicht.** Das ist das
Feld, auf dem er irren darf, ohne dass der Beleg wackelt — und es macht den
Kanal gesellschaftskritisch, ohne dass jemand eine Haltung vorträgt. Sein
Nachgeben ist widerwillig, nie sauber: „Ja gut, einmal im Jahr halt."

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

## Wie die Sätze gebaut sind

Aus der Messung an Emirhans neun Dialogen — `daten/marke/dialoganalyse.md`.

**Seine Zeilen haben im Schnitt 65 Zeichen, meine hatten 35.** Der Unterschied
ist kein Stil, sondern der Grund, warum meine Fassungen als Telegramm gelesen
wurden. Ein Satz mit Nebensatz ist keine Rede.

- **Die Folge sagen, nicht den Mechanismus.** „Desto **auffälliger** bist du",
  nicht „desto seltener".
- **Das Substantiv statt des Pronomens.** „Der Laptop spinnt", nicht „er
  spinnt". Mein häufigster Fehler, viermal in derselben Form.
- **Umgangssprache heißt nicht ungrammatisch.** „Der **wird** lauter", nicht
  „der macht lauter".
- **Zahlen als Ziffer, mit Einheit und Richtung.** „60 Watt oder 240 Watt, und
  mehr Watt heißt mehr Durchlass." Ausgeschrieben wurde
  „zweihundertvierzig" als „zweiundvierzig" gelesen.
- **Übertreibungen ohne Zahl.** „Ewig", „ein Batzen Geld". „Drei Wochen im
  Laden" liest sich als Tatsache.
- **Das Bild kommt aus ihrer Welt.** „Sich den Kopf zerbrechen", nicht
  „Tabellen machen".
- **Ein Gegenstand, eine Handlung, eine Folge — keine Kette.** Der erste Anlauf
  zum Garantiesiegel hatte Aufkleber über Schraube über Gehäuse über Lüfter.

## Der Titel

- **Ein Satz mit einem Verb, das etwas tut.** „Watti schmeißt sechs Euro im
  Monat weg." Nie ein Zustand mit Präposition — „Kampf mit", „Angst vor".
- **Ein Bild statt des technischen Worts.** „Wattis sieben **Wächter** verraten
  ihn", nicht „Blocker".
- **Ein Schaden oder eine Umkehrung steckt drin.** „Watti installiert sieben
  Werbeblocker" ist eine Feststellung, kein Video.

## Die Beschreibung trägt, was der Short nicht schafft

Oben der Titel, darunter die Suchwortzeile, dann „Für weitere Informationen
rund um die Thematik:" und die Quellen. `beitragstext` in `src/buffer.ts` baut
den Block aus den Kennungen der Szenen **und der Redeanteile**.

Damit dürfen Themen komplex sein: Der Produktpass, die Schaltsekunde und das
Reparaturrecht haben im Short keine Lösung, die in eine Zeile passt. Die
Handlung steht dort, wo der Zuschauer sie freiwillig liest — und deshalb muss
keine Figur sie aussprechen.

## Was das Schema ohnehin erzwingt

Nicht hier nachbauen — es steht in `src/typen.ts` und meldet sich von selbst:
Positionen und ihre Folge, mindestens eine Reaktionszeile, keine Machart
zweimal, Antwortpflicht nach `widersprechen` und `nachhaken`, höchstens ein
`abbiegen`, die Belegpflicht auf jeder behauptenden Zeile in Zuspitzung und
Kipppunkt, das Fenster von 40 bis 80 Sekunden.

**`npm run pruefen` sieht auch `GEPARKT`.** Ein Entwurf, der noch nicht im Lauf
steht, wird trotzdem durch alle Regeln geschickt — als Hinweis, damit die
Vorabprüfung nicht dauerhaft rot ist.

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

**Am 02.09.2026 hat er einen ganzen Short umgedreht.** `festplatte-loeschen`
sagte: Löschen gibt den Bereich zum Überschreiben frei, also vollschreiben und
den Hammer weglegen. Dieselbe BSI-Seite sagt weiter unten, dass Überschreiben
nur erreicht, wozu das Programm Zugriff hat, und nennt die physische Zerstörung
als Weg. **Wattis Hammer war die ganze Zeit eine der Methoden, die das BSI
nennt**, und `npm run quellen-pruefen` war dabei grün: Beide Zitate standen
wörtlich auf der Seite, nur nicht das, was der Short daraus machte.

Von 22 Verdachtsfällen desselben Durchgangs hingen neun an einem Wort außerhalb
der geprüften Zeichenkette — „In **manche** Smart-TV-Geräte", „**beispielsweise**
über die Internetverbindung", „**In order to pass through** the USB-IF
Compliance Program". **Lies immer den Satz davor und den Satz danach.**
