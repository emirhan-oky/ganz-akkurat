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

**0 · Erst in `daten/briefings/` nachsehen.**

Vor jeder Zeile: Gibt es zu diesem Thema schon einen Bogen, und steht darin
schon ein Dialog? **Am 03.09.2026 habe ich sieben Dialoge neu geschrieben, für
die dort Emirhans eigene lagen** — geschrieben am Tag davor, an demselben Tag,
an dem aus genau diesen Dialogen die Befunde gezogen wurden.

Beim Flugmodus war es am teuersten: Seine Fassung lag seit dem 02.09. dort, ich
habe sie nie geöffnet — und in meiner stand als Begründung genau der Satz, den
sein Briefingbogen im Abschnitt „Die Falle" ausdrücklich verbietet.

**Ein Bogen mit Dialog ist keine Vorlage, sondern das Skript.** Was dort steht,
wird eingetragen, nicht neu erfunden. Geändert wird nur, wo eine Zeile ihren
Beleg nicht trägt — und dann wird die Stelle gemeldet, mit dem Zitat daneben.

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

**Und er gehört Wattis Sache.** Ein Kaltstart ist ein Selbstgespräch; ein
Bericht über den anderen hat keinen, an den er sich richtet. „Volti lädt mit
einem Kabel, das er im Zug gefunden hat." bekam am 03.09.2026 die kürzeste
mögliche Rückfrage: *„Mit wem redet Watti?"* Er braucht einen Gegenstand oder
eine Überzeugung, die Watti gehört.

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

Sie steht unten unter „Bevor du ihn vorlegst" und ist der Teil, den
`npm run pruefen` nicht übernehmen kann.

## Wo die Wege stehen: `daten/szenarien/`

**Der Skill enthält die Szenarien nicht, er liest sie.** Ein Dokument je
Szenario, darin vier Beispiele — mit einem einzigen Beispiel baut jeder Entwurf
genau dieses eine nach. Eine neue Runde legt dort eine Datei ab und fasst diesen
Skill nicht an.

**Alle zwölf haben Beispiele, 37 von 48 seit dem 03.09.2026:**

| | Szenario | Beisp. | wie die Wendung gebaut ist |
|---|---|---|---|
| 1 | Volti belehrt Watti | 3 | der Normalfall |
| 2 | Watti fragt um Rat | 3 | Volti antwortet **und rät** |
| 3 | Watti weiß etwas und schließt falsch | 3 | Volti kontert mit dem Satz danach |
| 4 | Watti kontert erfolgreich | 4 | Erinnerung · Gegenbeispiel · Frage ohne Antwort in der Quelle · Zufallstreffer |
| 5 | Volti wird ertappt | 3 | er tut selbst, wovon er abrät |
| 6 | Beide liegen daneben | 3 | die Quelle sagt ein Drittes |
| 7 | Watti hat einen Plan | 3 | die Quelle redet von etwas anderem als beide Lager |
| 8 | Der Rückfall | 3 | am Ende macht Watti es wieder |
| 9 | Der Dritte im Raum | 3 | jemand außerhalb hat etwas gesagt |
| 10 | Die Wette | 3 | die Zitatkarte entscheidet |
| 11 | Watti erzählt es falsch weiter | 3 | aus einer Wahlmöglichkeit wird ein Verbot |
| 12 | Volti hat es aufgegeben | 3 | Watti fragt zum vierten Mal |

**Die Blöcke dort werden gezogen, nicht abgeschrieben** —
`npm run szenarienblock -- <id>` baut sie aus `daten/entwuerfe/`.

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

**Und kein Baustein ist Pflicht, nur weil er oft dasteht.** Am 03.09.2026 stand
„kleiner" am Schluss von fünf der siebzehn Dialoge, weil ich es wie einen
Pflichtbaustein behandelt hatte. Emirhans Einwand: *„Es gibt keine feste Regel,
dass kleiner immer am Ende stehen soll."* Das Wort ist in Ordnung; der
Automatismus war es nicht.

**Daraus keine Regel bauen.** Der Reflex, aus einer Beobachtung einen Vorrat mit
Wache zu machen, schreibt die Schablone fest, statt sie aufzulösen — und der
Pool existiert genau dagegen.

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
  „der macht lauter". **Und keine Apokope:** „ich habe", „ich frage", „ich
  erzähle" — nie „ich hab". Emirhan verkürzt in keiner einzigen seiner Zeilen;
  ich tat es in sechs von elf. Im Untertitel liest sich die kurze Form als
  Tippfehler.
- **Zahlen als Ziffer, mit Einheit und Richtung.** „60 Watt oder 240 Watt, und
  mehr Watt heißt mehr Durchlass." Ausgeschrieben wurde
  „zweihundertvierzig" als „zweiundvierzig" gelesen.
- **Eine Rechnung gehört als Rechnung in den Untertitel**, nicht als Nebensatz
  über eine Rechnung. Nicht „aus 20 Volt mal 5 Ampere", sondern die Frage und
  die Rechnung: *„Und wie kommt man auf 100?" — „20 Volt mal 5 Ampere."* Die
  `zahl`-Szene zeigt dieselbe Zeile, `wert` mal `einheit`.
- **Das Substantiv statt des Pronomens gilt doppelt, wenn beide dasselbe Ding
  haben.** „Und deins kann alles oder gar nichts" über Wattis Kabel, gefolgt von
  „Deins ist also auch nur geraten" über Voltis, hat einen ganzen Schluss
  unlesbar gemacht.
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
- **Er trägt ein Urteil, keine Beschreibung.** „Volti **predigt** und kauft
  neu" statt „Volti wartet keine fünf Tage". „Watti **rechnet sich** zwei Jahre
  **schön**" statt „Wattis Handy fällt durchs Raster". Beschreibungen sind
  korrekt und tonlos; ein Urteil sagt, was daran faul ist.
- **Und er darf metaphorisch sein.** „Wattis Akku muss erst **sterben**",
  „Wattis **Handyheizung**", „Wattis Umzug **sprengt** eine Rakete". Akkus
  sterben nicht, ein Kopfkissen ist keine Heizung.

**Am 03.09.2026 sind fünf Titel in Folge an diesen Regeln vorbeigegangen**, weil
ich aus einer Korrektur das Muster „zwei Gegenstände mit *und*" abgeleitet habe.
Aus einem halb verstandenen Befund wird eine Schablone, und sie wirkt sofort
fünffach.

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

## Bevor du ihn vorlegst

**Diese Liste stand bis zum 03.09.2026 nur als Verweis da** — Schritt 6 sagte
„siehe unten", und unten stand nichts. An diesem Tag habe ich in elf Dialogen
sechs Regeln gebrochen, die **schon in diesem Skill stehen**: fünfmal die
Titelregel, zweimal den Schluss auf die Beziehung, zweimal die Beschimpfung.

**Der Skill war nicht zu dünn. Ich habe ihn nicht gelesen.** Deshalb sieben
Fragen, jede zeigt auf ein Kapitel, das es schon gibt.

0. **Der Gegenstand** — kannst du zeichnen, worum gestritten wird? Und füllt
   ihn niemand mit dem falschen Ding? „Cookie" ist unsichtbar, „Dose" wird als
   Steckdose gelesen, „Anschlussdose" nicht. Ein Dialog ohne Gegenstand redet
   über „die", „manche", „der Teil" — und den versteht niemand, auch wenn jede
   Zeile belegt ist.
1. **Der Titel** — ein Satz mit Verb, ein Bild, ein Urteil? „Volti predigt und
   kauft neu", nicht „Volti wartet keine fünf Tage". → *Der Titel*
2. **Der Kaltstart** — nennt er das zusammengesetzte Substantiv, und weiß der
   Zuschauer beim ersten Satz, wovon die Rede ist? „Neues **Handy**update ist
   da", nicht „Update ist da". → *2 · Der Kaltstart*
3. **Der Schluss** — gehört er der Beziehung? Er darf ausweichen statt zu
   antworten: „Großer-Bruder-Kram eben." → *5 · Der Bogen*
4. **Jede Zeile** — nennt sie ihren Gegenstand, oder steht er nur im Satz
   davor? Hinter dem Vorhang trägt jede Zeile allein.
5. **Jeder Witz** — antwortet er auf die Zeile davor, oder steht er daneben?
   Steht er daneben, wird er **gestrichen**, nicht gedreht. → *Die eine Regel,
   an der alles scheitert*
6. **Voltis Ärger** — sie klebt hinten an, ohne Komma, und sitzt **am Zug**:
   Bei `richtigstellen` und `gegenbeispiel` steht sie in jeder sechsten bis
   siebten Zeile, bei `nachhaken` in jeder zweihundertsten. Gemessen an 32
   Beschimpfungen in 23 Shorts. **Wo Volti korrigiert, schimpft er; wo er nur
   Auskunft gibt, nicht.**
   Und die beiden Wörter sind verschieden: **„du Idiot" straft** (Zuspitzung,
   Kipppunkt), **„kleiner" versöhnt** (Nachschlag). → *Die beiden Figuren*
7. **Jede behauptende Zeile** — steht das Zitat daneben, und trägt es *diesen*
   Satz? **Lies den Satz davor und den Satz danach in der Quelle.** → *Vor dem
   Vertonen*

**Und für Punkt 7 sechs Fragen einzeln**, weil er am 03.09.2026 an elf Dialogen
siebzehnmal gerissen ist — bei grünem `pruefen` und grünem `quellen-pruefen`:

- **Steht im Zitat ein „kann", „vor allem", „einige", „übermäßig", „ideal"?**
  Dann steht es auch im Sprechtext. Modalverben fallen beim Kürzen auf
  Sprechlänge als Erstes weg, und was übrig bleibt, klingt besser und behauptet
  mehr. Viermal in elf Dialogen.
- **Steht ein „weil", „deshalb", „und dann" im Sprechtext?** Dann muss ein
  Zitat den *Zusammenhang* tragen, nicht die beiden Enden einzeln.
- **Nennt das Zitat den Gegenstand der Zeile beim Namen?** „Das war Dezember
  2024" über Tablets hing an einer Liste, die bei „1.9. Tastaturen" beginnt.
  Beim Binden nicht fragen „welche Quelle", sondern „welcher Satz".
- **Trägt die Zitatkarte noch, was der Beleg trägt?** 90 Zeichen sind eine
  Kürzung, und jede Kürzung behauptet, was entbehrlich ist. Lieber ein Zitat
  wählen, das in 90 Zeichen vollständig ist, als eines zurechtschneiden.
- **Wird aus einem Fall ein Immer?** Zwei dokumentierte Fälle sind kein „nach
  jedem Update", und eine angekündigte Maßnahme („will be applied") ist keine
  heutige Praxis.
- **Behauptet der Nachschlag etwas?** Die Positionsbefreiung gilt Pointen,
  nicht Behauptungen. Eine Geldsumme ist eine Behauptung, „mehr sagt das Amt
  nicht" auch.

**Und die Gegenprobe dazu:** Belegtreue heißt nicht, das Wort der Quelle zu
übernehmen. „Ein Atom nicht" ist durch „atomare Naturkonstante" gedeckt und die
bessere Zeile — nach siebzehn Belegbefunden bin ich auf die Gegenseite gekippt
und habe ein gedecktes Wort gegen ein steiferes getauscht.

**Der Belegprüfer läuft vor der Vorlage, und zwar hinter jedem einzelnen
Dialog.** Am 03.09.2026 hat Emirhan elf Dialoge abgenommen, in denen siebzehn
Sätze mehr behaupteten als ihre Quelle; im nächsten Durchgang waren es zwanzig,
obwohl diese Liste dazwischenlag.

**Der Grund, und er ist der wichtigste Satz dieses Abschnitts:** Diese Liste
prüft gegen das **Zitat**, der Belegprüfer gegen die **Seite**. Die Frage
„steht die Einschränkung im Zitat?" beantwortet sich selbst mit Ja, wenn das
Zitat die Einschränkung gar nicht enthält. Nur wer die Seite abruft und Vor-
und Folgesatz liest, sieht das „Weichen die Ergebnisse **erheblich** ab", das
vor der Fundstelle steht.

**Und eine Denkfigur, die zweimal gerissen ist:** Eine hinreichende Bedingung
ist keine notwendige. „X gilt als Nachweis, dass kein Missbrauch vorliegt"
heißt nicht „ohne X gibt es Strafe".

**Und wenn du eine Auswahl vorlegst:** Sortiere nach Ton, nicht nach
Genauigkeit. Am 03.09.2026 standen vier von fünf besseren Titeln als Zweitwahl
in meiner eigenen Liste — ich kann sie schreiben und erkenne sie nicht.

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
