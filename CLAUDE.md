# Ganz akkurat

Automatisierte Shortvideo-Produktion. Entwurf → Vertonung → Render → Freigabe →
Veröffentlichung. Deutschsprachig, auch im Code: Bezeichner, Kommentare und
Ausgaben sind deutsch.

**Der Kanal heißt seit dem 16.08.2026 „Ganz akkurat"** (vorher SetupKlar),
Handle `@ganzakkurat`, Domain `ganzakkurat.de`, Spruch **„Wir haben
nachgelesen."** Der alte Name war selbst ein Hilfe-Versprechen — wer ihn liest,
erwartet Unterstützung beim Einrichten. „Akkurat" trägt drei Bedeutungen auf
einmal: den **Akku** vorn, die **Genauigkeit** als Haltung, den **Rat** hinten.

## Prüfen vor allem anderen

```
npm run pruefen           # tsc --noEmit && Schemaprüfung der Daten
npm run quellen-pruefen   # ruft jede Quellen-URL ab, sucht das Zitat
npm run belege            # stellt Sprechtext und Zitat nebeneinander
npm run sprechprobe       # misst die Sprechdauer, kostet kein Kontingent
npm run pausenprobe       # misst, wie lange die Stimme wirklich schweigt (~60 Zeichen)
npm run neuigkeiten       # neue EU-Rechtsakte als Zulauf, siebt auf ~10
npm run markenbilder      # Profilbild, Banner, Wortmarke aus video/Marke.tsx
npm run rueckblick        # holt, was aus den Videos geworden ist
npm run ausreisser        # was hatte dieses eine? Zahlen neben Format und Thema
npm run aufschlaege       # jeder Aufschlag neben seiner Haltequote
npm run youtube-anmelden  # einmalig, danach nie wieder
npm run lauf              # Wochenlauf, ohne Ton (Szenenlängen geschätzt)
npm run lauf -- --mit-ton # kostet ElevenLabs-Kontingent
```

`sprechprobe` gehört vor jeden Lauf mit Ton und kostet nichts.
`ZEICHEN_PRO_SEKUNDE` in `src/zeit.ts` stand auf 15,0 und war nie nachgemessen;
heute steht dort **15,4**, gemessen an 2.479 Zeichen echter Vertonung. **Was
die Probe misst, ist nicht das Tempo, sondern der Text** — die Formel zählt
Zeichen, gesprochen werden Silben, und „240" sind drei Zeichen und vier Silben.

`npm run pruefen` muss vor jedem Lauf grün sein — **und es prüft seit dem
18.08.2026 auch die harten Regeln aus `src/pruefung.ts`**, nicht nur das
Schema. Vorher liefen die erst im Wochenlauf, also *nachdem* die Vertonung
bezahlt war. Aufgefallen ist der Unterschied an einem Schlusssatz mit „Schreib
es in die Kommentare": Die Regel dagegen meldete ihn zuverlässig,
`npm run pruefen` sagte grün. Der erste Lauf mit den harten Regeln in der
Vorprüfung hat sofort eine tote, widersprüchliche Regel zutage gefördert — eine
Obergrenze für Zeichnungen, die längst durch eine Untergrenze ersetzt war und
von da an den Sollzustand als Mangel meldete.

Die Schemaprüfung (`skripte/schemapruefung.ts`) existiert wegen einer teuren
Erfahrung:
`daten/beispiel-short.ts` ist die Standard-Prop der Remotion-Komposition und
wird in `calculateMetadata` **im Browser-Kontext** geparst. Reißt er das
Schema, bleibt Remotion in einem unerfüllten Promise stehen — der Render hängt
ohne Fehlermeldung, bis jemand abbricht. `tsc` sieht das nicht, weil
TypeScript Formen prüft und nicht Werte.

## Wo was steht

Diese Datei hält den **Vertrag**: was gilt und warum es so gilt. Die
**Abläufe** stehen in `.claude/skills/` und werden bei Bedarf geladen.

**Eigene Skills** — das Wissen, das nur hier gilt:

| Skill | wofür |
|---|---|
| `thema-finden` | Thema wählen, Ideenvorrat, Formatzuordnung, Materialgrenze |
| `beleg-holen` | Quelle abrufen, Zitat sichern, an die Szene binden |
| `bild-bauen` | Bühnenmaße, was gezeichnet wird, Figur, Kamera, Standbildpflicht |
| `woche-bauen` | prüfen, vertonen, rendern, freigeben, einplanen |
| `rueckblick-lesen` | die Zahlen holen und die Schwellen kennen, ab denen sie etwas sagen |

**Installierte Skills** — zwei Ketten, die sich nicht berühren:

- **Inhalt:** `brand-profile` → `voice-builder` → `hook-writer` →
  `short-form-video-script` → `youtube-shorts` / `tiktok-growth` /
  `reels-script` + `instagram-growth` → `viral-reverse-engineering`. Sie lesen
  alle zuerst `daten/marke/brand-profile.md` und `voice.md`.
- **Bild:** `character-rigging` → `svg-character-animation` →
  `character-animation-qa`, dazu `remotion-best-practices`,
  `better-typography` und `ffmpeg`.
- **Auffindbarkeit:** `social-seo` → `instagram-seo` → `hashtag-strategy`.
  Diese Kette hat am 24.08.2026 `suchbegriff` und die Keyword-Zeile
  hervorgebracht.
- **Planung und Zahlen:** `content-pillars` → `content-calendar`,
  `analytics-and-reporting`, `competitor-analysis`.

Zur letzten Kette eine Einschränkung, die man kennen muss: **`npm run
rueckblick` liest ausschließlich YouTube.** `analytics-and-reporting` sagt,
*wie* man Zahlen liest; es beschafft keine. Wer TikTok und Instagram messen
will, braucht Zugänge, keine Skills.

`watch` gehört zu `viral-reverse-engineering`: Der Skill nennt als eigene
Schwäche, dass ein Agent ein Video hinter einem Link nicht sehen kann — `watch`
behebt genau das.

Dazu der Subagent `belegpruefer`: Er liest die Behauptung-Zitat-Paare in
eigenem Kontext und meldet nur, wo ein Satz mehr behauptet, als sein Zitat
trägt.

## Die Ausrichtung

**Tech-Unterhaltung, die nebenbei hilft** — entschieden am 15.08.2026, nachdem
die ersten Shorts online gingen und das Feedback einhellig war: zu lang. Nicht
zu kompliziert, nicht zu trocken. Design, Untertitel und Machart kamen an, die
Länge nicht.

Der Grund für den Kurswechsel ist technisch, nicht geschmacklich: **Bei Shorts
sucht niemand.** Das Video läuft im Feed von selbst, der Zuschauer hat in dem
Moment kein Dock-Problem. Ein Hilfe-Video erreicht nur die Schnittmenge derer,
die gerade genau das haben — ein Staunfakt trifft jeden, der wischt.

**Was nicht mitwandert, ist der Belegapparat.** Quellenpflicht, wörtliches
Zitat, unbeteiligte Quelle: Er ist kein Ballast aus der Hilfe-Ära, sondern der
einzige Unterschied zu den hundert anderen Kanälen mit derselben Verpackung —
und der Grund, warum wir uns die Frechheit der Formate leisten können.

**Der Gegenstand ist seit dem 20.08.2026 Technik allgemein**, nicht mehr nur
Geräte und Verbraucherrecht. Die Zielgruppe steht damit fest: 18–30,
technikaffin — sie kennt sich weit genug aus, um zu merken, dass etwas seltsam
ist, und zu wenig, um es zu erklären. Genau dort wird weitererzählt.

Die Haltung, die der Kanal verteidigt: **Nichts davon ist Zufall.** Alles an
deinen Geräten wurde entschieden, und wo entschieden wurde, gibt es ein
Dokument. Das ist zugleich der Grund, warum die breitere Nische den
Belegapparat nicht sprengt — sie öffnet ihn über die neue Quellenart
`wissenschaft` statt über eine Ausnahme.

→ `daten/marke/brand-profile.md` (wer der Kanal ist) und `voice.md` (wie er
klingt). Beide werden vor jedem Entwurf gelesen; die installierten Skills
suchen sie unter diesen Namen.

## Datenvertrag

`src/typen.ts` ist der einzige Vertrag. Alles andere richtet sich danach.

### `format` — die tragende Achse

**Vier Formate, kein Wochentag.** Veröffentlicht wird, was fertig und stark ist.

| Format | Reaktion | Kipppunkt |
|---|---|---|
| **Das gibt es wirklich** | Staunen, „das erzähl ich weiter" | die Sache selbst |
| **Das ist Absicht** | Empörung | wer es entschieden hat — oder wo es dokumentiert steht |
| **Es war einmal** | Korrektur | das „und heute" |
| **Wer hat recht?** | Widerspruch | das Dritte, das beide übersehen |
| **Empfehlung** | — | erst ab Affiliate-Links |

**Aus acht wurden am 20.08.2026 vier**, nach demselben Verfahren wie am 17.08.:
erst sammeln, dann nach **Reaktion** sortieren, dann sehen, welche Gruppen
entstehen. Die Zahl war nicht vorgegeben.

Zwei Befunde aus den Reichweiten-Skills haben das alte Modell getroffen:

**Wiederholung ist ein Risiko, keine Wiedererkennung.** Die Retention-Ladder
(`youtube-shorts`) nennt geklonte Formate als Grund für Unterdrückung — „volume
without novelty is a negative". Acht feste Formate im Wochentakt sind per Bauart
genau das. Der Wochentag war außerdem ein Versprechen an ein Publikum, das es
noch nicht gibt: Bei 0 Abonnenten kostet er Neuheit und bringt nichts ein.
**`FORMATE[...].tag` ist deshalb weg**, `zeitplanBauen` rechnet wieder über die
Listenposition. Die Uhrzeit bleibt am Format — sie ist kein Versprechen,
sondern eine Annahme über den Feed.

**Die Schätzfrage ist keine Themengruppe.** Das stand hier schon („die Machart
der Zahlen-Gruppe"), aber die Folgerung war zu klein. Sie lässt sich auf jedes
Thema legen, und WATCH verlangt ohnehin mehrere Hook-Varianten je Video.
`dubistdumm` ist kein Sendeplatz mehr, sondern die erste von fünf Macharten in
**`HOOK_MACHARTEN`**; seine Zahlen sind zu `gibtswirklich` gewandert.

Was zusammengelegt und was gestrichen wurde:

- **`heimlich` geht in `absicht` auf.** Die alte Abgrenzung — wie das Gerät
  **gebaut** wurde gegen das, was es im **Betrieb tut** — war sauber und half
  beim Einsortieren. Nur löst sie beim Zuschauer dieselbe Reaktion aus, und
  sortiert wird nach Reaktion. Die schärfste Hausregel des Kanals kommt mit und
  gilt jetzt für ganz `absicht`: **Es muss in einem Dokument stehen.**
- **`neu` fällt weg.** Es war als einziges Fach ohne haltbaren Vorrat zugleich
  das teuerste — jede Woche eine frisch abgerufene Behördenseite. Als Stoff für
  `absicht` fällt es an, wenn es anfällt. `npm run neuigkeiten` bleibt.
- **`auchgekauft` fällt weg.** Für 18–30 das schwächste Fach. **Der Verlust ist
  benannt:** Es war die Vorarbeit für die `empfehlung` — ein Kanal, der ein
  halbes Jahr sagt, was man nicht kaufen soll, wird geglaubt, wenn er einmal
  empfiehlt. Diese Wirkung muss später anders erarbeitet werden.

Zwei Regeln gelten für alle vier:

1. **Die Pointe trifft die Sache, nicht den Zuschauer.** Die alte Ausnahme
   (Montag) ist mit dem Wochentag entfallen — aber wo die Schätzfrage als
   Machart benutzt wird, gilt sie weiter: „Sechzig. Du warst bei zwölf — wie
   alle." **Ohne dieses „wie alle" bleibt nur die Beleidigung.**
2. **Kein Format verlangt eine Handlung.** „Steh auf und prüf das" ist Arbeit.
   Ein Format, das Arbeit verlangt, ist Hauptvideo-Stoff. Schätzen ist die
   feine Ausnahme: Es ist keine Arbeit, es passiert unwillkürlich.

Die zweite Person ist seit dem 16.08.2026 erlaubt, der Sprecher dabei
mitgemeint. Vorher galt die dritte Person als Schutz vor Belehrung; sie hat
stattdessen jede Frechheit weichgespült.

**`MATRIX`** beantwortet die einzige Frage, die beim Entwerfen wirklich
auftritt: in welches Format gehört dieser Fakt? Vier Prüffragen, der Reihe
nach, die erste Übereinstimmung gewinnt. `gibtswirklich` steht am Ende, weil es
alles auffängt, was keine der drei anderen erfüllt.

**Die eine Abgrenzung, die halten muss:** `eswareinmal` gegen `werhatrecht`.
Beide handeln von falschen Überzeugungen. Lautet die Auflösung schlicht „früher
stimmte es, heute nicht", ist es ein **Märchen**. `werhatrecht` braucht, dass
**beide** Seiten etwas übersehen.

### `sachgebiet` — die stille zweite Achse

`drucken`, `laden`, `bildschirm`, `rechner`, `handy`, `fahren`, `netz`,
`recht`, `raumfahrt`, `zeit`. Einzige Aufgabe: verhindern, dass eine Woche zur
**Druckerwoche** wird. Vier Formate garantieren vier verschiedene **Zugriffe**,
aber nicht vier verschiedene **Gegenstände** — deshalb höchstens zweimal
dasselbe Sachgebiet je Lauf.

**Die Werte sind am 17.08.2026 komplett ausgetauscht worden.** Die alten fünf
(`schreibtisch`, `unterwegs`, `reise`, `zuhause`, `kaufen`) passen auf das neue
Material nicht: `reise` hätte genau **ein** Thema getragen, während im Vorrat
vier Drucker- und sieben Akku-Themen stehen. Eine Achse, die die Häufung nicht
sieht, um die es geht, ist keine Achse.

`recht` ist beim Planen der ersten Woche nachgetragen worden. Der Mangel fiel
am konkreten Fall auf: Wohin gehört „Ersatzteile müssen freigeschaltet
werden"? Es hat keinen Gegenstand, sondern einen Paragrafen — und eine
willkürliche Zuordnung macht die Achse wertlos.

**`raumfahrt` und `zeit` kamen am 20.08.2026 dazu**, mit der breiteren Nische
und aus demselben Anlass: Die Raumstation mit ihren Notebooks von 2001 ist kein
`rechner`, die Schaltsekunde kein `netz`. Beide sind bewusst eng — sie sollen
Häufungen sichtbar machen und nicht alles auffangen, was sonst nirgends passt.
Ein Sammelgebiet wäre dasselbe wie gar keins.

Format und Sachgebiet bleiben **unabhängig**: „Es war einmal" über Akkus und
über Bildschirme sind zwei verschiedene Videos.

### Der Bau: vier Positionen, fünf bis acht Szenen

**Positionen und Szenen sind seit dem 17.08.2026 zwei verschiedene Dinge.**
Vorher war eine Szene eine Position, und das hieß bei fünf Positionen: fünf
Textblöcke à vier bis fünf Sekunden. Für einen Feed ist das eine Diashow. Sechs
bis sieben Szenen ergeben einen Schnitt alle drei Sekunden bei **gleicher**
Gesamtlänge — der Platz dafür kommt aus der gestrichenen Belegszene (2,5 s) und
der gestrichenen Endkarte (3,2 s).

| # | Position | tut was | verboten |
|---|---|---|---|
| 1 | **Aufschlag** | greift zu: beschuldigt, behauptet, fordert heraus | das Thema ankündigen |
| 2 | **Zuspitzung** | macht es schlimmer, teurer, absurder | die Auflösung vorwegnehmen |
| 3 | **Kipppunkt** | die Wendung, je Format eine andere | erklären, warum das so ist |
| 4 | **Nachschlag** | ein trockener Satz, dann Strich und Spruch | zusammenfassen |

**Die Position ist ein Feld im Schema, kein Kommentar.** Sieben Erklärvideos
sind entstanden, weil beim Schreiben nichts gefragt hat: Ist das die Zuspitzung
oder schon der Kipppunkt? Dieselbe Logik wie bei der Belegpflicht und beim
gestrichenen `presse` — eine Regel, die sich nicht ausdrücken lässt, lässt sich
nicht brechen. Geprüft wird, dass jede Position vorkommt, dass Aufschlag und
Nachschlag genau einmal vorkommen und dass die Folge **nur vorwärts** läuft.

`werhatrecht` ist die Ausnahme beim Nachschlag: Er endet auf einer Restfrage
statt auf einer Pointe, sonst gibt es nichts zu kommentieren.

### Der Beleg wird eingeblendet, nicht gespielt

Die Belegszene saß auf Position 4 des alten Baus — zweieinhalb Sekunden
Standbild mit einem Behördennamen, genau dort, wo die Pointe hingehört.

Jetzt hängt `herausgeber` an der Szene, die die **tragende Behauptung** macht,
und läuft als dünne Zeile **unter der Kopfzeile** mit. Nicht unten: Dort sitzt
der Untertitel in seiner 270-Pixel-Zone, darunter beginnt TikToks
Bedienleiste. Oben steht der Beleg außerdem bei Wortmarke und Formatpille, und
das ist die richtige Nachbarschaft — er ist ein Markenelement, kein Inhalt.

`herausgeber` steht in der Szene **und** in `quellen.json`. Die Doppelung ist
gewollt: Der Renderer bekommt nur den Short. Damit beide nicht auseinander
laufen, prüft `shortPruefen` hart auf Gleichheit.

### Die Szene hängt am Zitat, nicht an der Quelle — `belegId`

Jede Szene mit `quelleId` trägt auch eine **`belegId`**: die eine Fundstelle in
dieser Quelle, die genau diesen Satz trägt. Bis zum 17.08.2026 nannte eine
Szene nur die Quelle und erbte damit den Belegstatus von allem, was in ihr
stand — drei unbelegte Sätze sind so durchgegangen, alle formal grün. Das
Entscheidende ist der **Zeitpunkt**: Die Frage „welcher Satz trägt das?" fällt
beim Schreiben an, nicht in der Durchsicht, und wo es keine Fundstelle gibt,
steht ein leeres Feld statt einer Diskussion.

Geprüft wird an zwei Stellen, weil das Schema auch im Browser läuft: Das Schema
(`src/typen.ts`) erzwingt das Paar, `shortPruefen` prüft, dass die Fundstelle
wirklich in **dieser** Quelle steht.

Zwei Bauregeln folgen daraus, beide aus der Reparatur gelernt:

- **Das „es war einmal" gehört in den Aufschlag und nur dorthin.** Er ist die
  einzige Position ohne Belegpflicht, und das ist kein Schlupfloch: Er setzt die
  Erzählung, er behauptet nichts. Alles danach läuft in der Gegenwart.
- **Der Streitfall bei `werhatrecht` ebenso.** Was zwei Lager behaupten, ist keine
  Aussage über die Welt — aber die Zuspitzung darunter muss eine sein.

→ Skill `beleg-holen`: die drei Fälle, die es aufdeckte, und das Warnzeichen.

### Die Denkpause — `pauseSek`

Die Schätzfrage braucht Stille nach „Schätz mal", sonst ist die Frage rhetorisch
und niemand liegt hinterher daneben. Eine Szene bestellt sie über `pauseSek`,
die Vertonung setzt einen `<break>`-Tag in den Text.

**Der erste Anlauf lief über Auslassungspunkte und war falsch begründet.** Im
Schema stand, eine Sekundenangabe sei „eine Zahl, die niemand einhält" — die
Pause entstehe in der Sprachsynthese und lasse sich nicht bestellen. Das war
geraten. Im fertigen Schätzfrage-Short kam eine Denkpause von **1,0 Sekunde**
heraus: eine Atempause, kein Gedanke. `npm run pausenprobe` hat es dann
gemessen, für rund 60 Zeichen Kontingent:

| Trenner | Pause |
|---|---|
| ` ... ` | 0,38 s |
| ` ... ... ... ` | 0,86 s |
| ` ... ... ... ... ... ... ` | 1,69 s |
| `<break time="2.5s" />` | **2,60 s** |

Dieselbe Geschichte wie bei `ZEICHEN_PRO_SEKUNDE`, das zweimal auf einer
Annahme stand, bis jemand nachgemessen hat. **Wenn eine Größe messbar ist,
gehört sie gemessen und nicht begründet** — und die Begründung, warum sie sich
angeblich nicht messen lässt, ist das verdächtigste Bauteil überhaupt.

Zwei Folgen im Code: `woerterAusAusrichtung` filtert alles zwischen `<` und
`>`, sonst stünde „time=2.5s" im Untertitel. Und `szenendauerAus` rechnet die
bestellte Pause mit — vorher lief die Vorschau genau an der Stelle von der
Wirklichkeit weg, an der bewusst Zeit verbraucht wird.

Beim Wechsel von Modell oder Stimme gilt: Ein nicht unterstützter Break-Tag
würde **vorgelesen**. `npm run pausenprobe` beantwortet das vorab.

### Gefunden wird über das Suchwort, nicht über die Tags — `suchbegriff`

Am 24.08.2026 kamen `hashtag-strategy` und `social-seo` dazu, und beide sagen
dasselbe: **Hashtags kategorisieren und helfen der Suche. Reichweite bringen
sie nicht.** Der Hebel ist das Suchwort — gesprochen, im Bild und in der
Beschreibung; bei TikTok heißt das die Dreifachnennung.

Zwei Drittel davon erfüllt der Kanal ohnehin, weil der Sprechtext Wort für Wort
der Untertitel ist. **Das dritte Drittel fehlte ganz:** `beschreibung` war seit
dem 15.08.2026 überall leer.

Die Begründung von damals stimmt weiter — ein Short erklärt sich im Video, nicht
im Text darunter, und die alten Erklärabsätze holten nach, was das Video nicht
schaffte. **Eine Keyword-Zeile erklärt aber nichts, sie macht auffindbar.** Sie
steht in `beitragstext` direkt hinter dem Titel, also in den ersten rund 80
Zeichen, die indiziert werden. Damit sie nicht zum Erklärabsatz zurückwächst,
meldet die Prüfung alles ab 150 Zeichen.

`suchbegriff` ist ein Pflichtfeld nach dem Muster von `weitererzaehlt`: ein bis
drei Wörter, so wie sie getippt werden. Geprüft wird **Wort für Wort**, nicht
als Phrase — „Laptops Raumstation" steht im Video als „Auf der Raumstation
liefen 2009 Laptops", getrennt, und genau so sucht auch niemand.

**Hashtags: drei bis fünf, je Plattform verschieden.** Vorher waren zwölf
erlaubt und drei gleiche Sätze gesetzt. Instagram deckelt seit Dezember 2025
hart bei fünf; TikTok will drei bis fünf und behandelt sie als Suchwörter. Ein
gemeinsames Fenster trägt alle drei Kanäle.

Auf diesen Plätzen stehen **drei Rollen**: genau ein Markentag
(`#ganzakkurat`, Fehler wenn er fehlt), ein bis zwei Tags aus
`GEMEINSCHAFTSTAGS` — dort browst die Zielgruppe —, und zwei bis drei
Themen-Tags, die benennen, wovon das Video handelt. Reichweiten-Tags sind ein
Fehler, zu breite ein Hinweis.

**`GEMEINSCHAFTSTAGS` ist absichtlich leer.** Der Skill verlangt, die Tagseite
vor der Verwendung anzusehen: Sind die obersten Beiträge von der Art, gibt es
Publikum, ist sie von Spam überrannt? Das kann kein Skript und kein Modell aus
dem Gedächtnis — es wäre derselbe Fehler wie bei `ZEICHEN_PRO_SEKUNDE` und der
Denkpause, die beide auf einer Annahme standen, bis jemand nachgemessen hat.
Solange die Liste leer ist, schweigt die Regel; **eine Wache, die eine leere
Liste erzwingt, hielte jeden Short zurück.** Kandidaten stehen als Kommentar
daneben.

**Einen Formattag gibt es bewusst nicht.** Er sammelte eine Serie für ein
Publikum, das es noch nicht gibt — dasselbe Argument, mit dem am 20.08.2026 der
Wochentag gestrichen wurde — und kostete dafür einen von fünf Plätzen, auf dem
sonst ein Wort steht, nach dem jemand sucht. Zu holen, sobald Abonnenten da
sind.

**Das `sachgebiet` taugt nicht als Tag.** `#drucken` gehört dem Textildruck,
`#laden` dem Einzelhandel, `#fahren` der Fahrschule. Die Sachgebiete sind
interne Sortierachsen gegen die Druckerwoche, keine Suchwörter.

Beim Nachziehen der neun Entwürfe ist etwas aufgefallen, das die Regel selbst
nicht meldet: **Zwei Shorts sagen ihr eigenes Suchwort nie.** „Schaltsekunde"
kommt in `schaltsekunde-endet` nicht vor, „Flugmodus" nicht in
`flugmodus-maerchen` — beide Male steht im Sprechtext eine Umschreibung. Der
Suchbegriff musste deshalb auf ein schwächeres Wortpaar ausweichen. Das ist der
Fall, für den die Regel gebaut ist, und er lässt sich nur beim Schreiben lösen.

### `kennzeichnung.werbung` — Dreiwert, kein Boolean

| Wert | Bedeutung |
|---|---|
| `keine` | keine kommerziellen Verweise, kein Label |
| `beschreibung` | Partnerlinks nur in der Beschreibung, kein Label im Bild |
| `video` | Label wird ins Video eingebrannt (`video/Short.tsx`) |

### Was es nicht mehr gibt

`winkelart`, `titelmuster`, `Vertiefung`, `produktnaehe`, `kontext` als freier
Text — und die Szenenarten `anschluss`, `checkliste`, `fehlspur`,
`herleitung`, `cta`.

Am 17.08.2026 dazugekommen, alle aus demselben Befund: Das alte Vokabular war
**Erklärvideo-Vokabular**. Lösung, Merkmal, Bewertung, Punkte zum Mitnehmen —
jedes dieser Felder setzt voraus, dass der Zuschauer etwas lernen will.

| weg | warum |
|---|---|
| `hook` | ging in `text` auf; ihr Merkmal war eine Zeichengrenze, die als Sekundengrenze längst existierte |
| `aussage` | heißt jetzt `text` |
| `warnung` | trug ein Feld `loesung` — eine Lösung anzubieten heißt, eine Handlung zu verlangen |
| `merkmalskarte` | Gerätezeichnung plus ja/nein-Merkmale: eine Kaufberatungskarte |
| `beleg` | wurde zur Einblendung |
| `endkarte` | erzwang per Schema `punkte: min(2).max(4)` — eine Liste kann keine Pointe sein |
| `merksatz` | heißt `weitererzaehlt`; siehe unten |
| `system` | kein einziges der 45 Themen ist systemspezifisch |
| `symbol` | die stehende Zeichnung unter dem Satz; ersetzt durch `buehne`, gestrichen am 24.08.2026, nachdem der Nachfolger an einem fertigen Video gemessen war |
| `hook` (Szenenart) | stand seit dem 17.08.2026 als gestrichen im Vertrag und trotzdem weiter im Schema — ohne Zweig im Renderer |
| `GeraeteArt` | neun Gerätezeichnungen, mit der Kaufberatung gegangen |
| `src/illustration.ts` | schlug Symbole aus dem Szenentext vor — der Erklärvideo-Reflex in Codeform |

**`merksatz` → `weitererzaehlt`** ist der wichtigste dieser Tausche. Das alte
Feld hat getan, was es sollte, und genau darin lag der Fehler: Es stellte bei
jedem Entwurf die Frage „was ist hier das Prinzip?" und erzwang damit siebenmal
ein Erklärvideo. Der Zwang bleibt, die Frage wechselt.

Das `Lauf`-Schema wird von **keinem Skript geparst** — laufweite Regeln
gehören deshalb in `laufweiteBefunde` in `src/pruefung.ts`, nicht in ein
`superRefine` auf `Lauf`. Eine Regel dort ist tote Regel.

## Harte Regeln (`src/pruefung.ts`)

Fehler halten einen Short zurück, Hinweise erscheinen nur in der
Freigabe-Übersicht.

- **`format`** — **kein Format zweimal hintereinander** (Fehler), und ab vier
  Shorts ein Hinweis, wenn eines mehr als die Hälfte des Laufs stellt.
  Die Regel hat am 20.08.2026 die Richtung gewechselt: Vorher hieß sie „jedes
  Format genau einmal je Lauf" und prüfte auch, ob eines **fehlt**. Mit dem
  Wegfall des Wochentags wäre daraus ein Zwang geworden — bei vier Formaten
  hätte sie jede Woche genau diese vier verlangt und damit die Wiederholung
  erzwungen, gegen die die Retention-Ladder warnt. Der Befund, der zur alten
  Gegenprobe führte, bleibt lesenswert: Sie stand einmal hinter einer
  Zahlengleichheit und war deshalb genau dann still, wenn sie gebraucht wurde.
  **Eine Wache, die sich bei Abweichung selbst abschaltet, ist keine Wache.**
- **`sachgebiet`** — höchstens zwei Shorts je Sachgebiet und Woche.
- **`suchbegriff`** — jedes Wort steht im Sprechtext (Fehler) und in allen drei
  Beschreibungen (Fehler); fehlt es im Bildtext, ist das ein Hinweis. Der
  Bildtext ist auf wenige Wörter gebaut, und ein Zwang dort erzeugte dieselbe
  Verstümmelung wie seinerzeit der Zielwert von 23 Sekunden.
- **`texte`** — drei bis fünf Hashtags je Plattform (Schema), darauf drei
  Rollen. Fehler: ein Tag aus `REICHWEITENTAGS`, ein fehlender `#ganzakkurat`,
  oder — sobald die Liste für diese Plattform gefüllt ist — kein Tag aus
  `GEMEINSCHAFTSTAGS`. Hinweise: ein Tag aus `BREITE_TAGS`, weniger als zwei
  Themen-Tags, oder drei identische Sätze.
- **`beleg`** — mindestens **eine unbeteiligte** Quelle je Short
  (`UNBETEILIGTE_ARTEN`). Die Drei-Quellen-Regel ist am 16.08.2026 entfallen:
  Die Anzahl war die schwächere Hälfte — drei Herstellerseiten belegen nichts,
  eine Behördenseite belegt alles. Genau dieser Fall stand im WLAN-Short, der
  mit drei Quellen sauber durchging und auf TP-Link, TP-Link und Intel stand.
  Bei einem Fakt je Video wären drei Quellen ohnehin zwei dekorative — und
  Dekoration im Belegapparat ist schlimmer als keine, weil sie die Zahl
  stimmen lässt.
- **`aufbau`** — jede Position kommt vor, Aufschlag und Nachschlag genau
  einmal, und die Folge läuft **nur vorwärts**. Eine Zuspitzung nach dem
  Kipppunkt ist kein Fehler, den man hört, sondern einer, den man spürt: Das
  Video hat seine Pointe schon gehabt und redet weiter. Geprüft im Schema.
- **`aufschlag`** — die erste Szene spricht höchstens **3,5 Sekunden**, und
  zwar an den **gemessenen** Wortzeitstempeln, sobald eine Tonspur vorliegt.
  71 % der Zuschauer entscheiden in den ersten Sekunden. Dazu eine Handvoll
  Ansagen, die das Schema hart ablehnt: „heute geht es um", „in diesem Video",
  „ich zeige dir", „wir schauen uns" — das kündigt an, statt zuzugreifen.
- **`beleg`** (Einblendung) — genau **eine** Szene je Short trägt
  `herausgeber`, und sie muss an einer `quelleId` hängen. Zwei Einblendungen
  wären zwei Quellenangaben in zwanzig Sekunden; keine wäre der Zustand vor
  dem 16.08.2026, als der ganze Belegapparat im Video unsichtbar war.
- **`belegId`** — die Fundstelle steht wirklich in der genannten Quelle
  (Fehler), und ein Zitat trägt höchstens zwei Szenen (Hinweis). Die andere
  Hälfte der Regel steht im Schema: Wer eine Quelle nennt, nennt ein Zitat.
- **Belegpflicht nach Position** — alles auf `zuspitzung` und `kipppunkt`
  braucht eine Quelle, egal in welcher Darstellung. Vorher entschied allein
  die Szenenart, und damit entschied die Wahl der Darstellung darüber, ob ein
  Satz belegt sein musste.
- **`laenge`** — 20 bis 36 Sekunden, hart in beide Richtungen. Zielwert 30.
  Beides ist am 24.08.2026 angehoben worden, und zwar wegen der Sprache: Der
  alte Zielwert von 23 hat den Telegrammstil erzwungen.
- **`produktname`** — im Video fällt nie ein Markenname (`ZUBEHOERMARKEN`),
  nur Merkmale. Das ist die Regel, die das ganze Modell trägt. Gerätehersteller
  (Apple, Dell) stehen bewusst nicht in der Liste — „dein MacBook" ist Kontext,
  keine Empfehlung. Ausnahme: das Format `Empfehlung` mit Label im Bild.
- **`kennzeichnung`** — ein Partnerlink braucht „Werbung", „Anzeige" oder
  „Werbepartner" **in derselben Zeile**. Ein Sammelhinweis am Textende
  kennzeichnet den Link zwanzig Zeilen weiter unten nicht (LG Erfurt,
  23.11.2020). „Affiliate-Link" und „gesponsert" hat der BGH als unscharf
  verworfen (06.02.2014, I ZR 2/11).
- **`produktionsregel`** — kein Sprechtext behauptet eigene Produkterfahrung,
  kein Titel sagt „Test", solange nichts selbst benutzt wurde. Zulässig:
  „Vergleich", „Kompatibilitätscheck", „Kaufhilfe".
- **`titel`** — der Titel darf **nichts nennen, was im Video nicht vorkommt**:
  die Belegpflicht, auf den Titel angewandt. Dazu kein Ausrufezeichen, kein
  Emoji, keine Konfrontation gegen den Zuschauer. `KEINE_SACHWOERTER` hält die
  Funktionswörter, die am Titelanfang großgeschrieben stehen — „Weder Leitung
  noch Router sind schuld" meldete sonst „weder" als fehlendes Sachwort.

## Der Rundlauf und der Humor

**Ein Short läuft von selbst wieder an, und ein Rewatch zählt als eigene
Ansicht.** Bis zum 18.08.2026 arbeitete der Schluss dagegen — ein Satz, ein
blauer Strich, eine zweite Wortmarke, im Schnitt 2,2 Sekunden, in denen nichts
Neues kommt. Der Strich war das eigentliche Signal: Er sagte optisch „fertig".

Er ist weg, und mit ihm die zweite Wortmarke.

**Der Spruch steht seit dem 24.08.2026 wieder in der Mitte**, unter dem
Schlusssatz: ein kurzer Strich von 96 Pixeln, der in einer halben Sekunde
gezogen wird, darunter „Wir haben nachgelesen.", rechts daneben die Figur.
Zwischen dem 18. und dem 24.08. lief er oben unter der Kopfzeile mit.

Das nimmt den Vorhang nicht zurück, und der Unterschied liegt in der Länge des
Strichs. Einer über die ganze Bühnenbreite trennt die Pointe vom Absender und
sagt „fertig". 96 Pixel trennen nichts, sie zeichnen den Spruch aus. Gezogen
statt eingeblendet: **Eine Linie, die entsteht, ist eine Geste; eine, die schon
da ist, ist ein Rahmen.**

Zwei Felder tragen das: **`rundlauf`** an der Schlussszene sagt, warum der
erste Satz danach wieder passt (ein Feld, keine Prüfung — beurteilen kann das
kein Skript), und **`weitererzaehlt`** muss im verketteten Sprechtext wirklich
vorkommen. Prüfbar ist die andere Hälfte: **Der Schlusssatz darf nicht
abbinden.** „Fazit", „kurz gesagt", „schreib es in die Kommentare" — die Liste
steht in `src/pruefung.ts`.

Der **Humor** ist keine vierte Zutat, sondern die **Wendung**, und er hängt am
Format: `eswareinmal` ist die veraltete Weisheit, `absicht` die Absurdität der
Industrie, `gibtswirklich` die Tatsache, die keine Pointe braucht,
`werhatrecht` das Dritte, an das keiner gedacht hat. Drei Regeln: Die Pointe
trifft die Sache, nicht den Zuschauer (außer bei der Schätzfrage, wo die
Auflösung ihn wieder einsammelt); trocken statt laut; **der Witz muss belegt
sein wie alles andere**. Die Folge ist angenehm — das Lustigste ist meistens
die Tatsache, nüchtern hingestellt.

→ Skill `thema-finden`: die Herleitung beider Teile.

## Quellen

`daten/quellen.json`. Neue Quellen kommen erst hinein, **nachdem die URL
tatsächlich abgerufen und der Inhalt gelesen wurde** — nie aus dem Gedächtnis
und nie aus einem Suchtreffer-Ausschnitt. `geprueftAm` dokumentiert genau
diesen Abruf.

Die Regel ist **nachprüfbar**: Jeder Beleg trägt ein `zitat`, wörtlich von der
Seite, und `npm run quellen-pruefen` holt die Seite und sucht die
Zeichenkette — stumpf, ohne Sprachmodell. `stuetzt` daneben ist die Folgerung
in unseren Worten und wird **nie** geprüft. Genau dort saß der teuerste Fehler
dieses Projekts, und `npm run belege` ist die Durchsicht dagegen: vor der
Vertonung, von Hand.

| Rang | Arten | Rolle |
|---|---|---|
| **unbeteiligt** | `standard`, `behoerde`, `rechtsprechung`, `wissenschaft` | dürfen eine Aussage allein tragen |
| **beteiligt** | `hersteller`, `plattform` | autoritativ fürs eigene Datenblatt, interessiert am Rest |

**`presse` ist nicht eintragbar**, nicht bloß heruntergestuft — sie fehlt im
Enum. Erlaubt bleibt sie als **Wegweiser**: lesen, zur Primärquelle folgen,
die Primärquelle zitieren. Dass das nicht an Vorsatz hängt, sondern am Enum,
ist die Absicherung — eine Regel, die sich nicht ausdrücken lässt, lässt sich
nicht brechen. **`messung` ist raus**, weil die `produktionsregel` Aussagen aus
eigener Produkterfahrung verbietet.

→ Skill `beleg-holen`: der Ablauf, Zitatlänge, `abrufart`, `QUELLENPFLICHT`,
und warum die Prüfung kein Modell fragt.

## Was ohne Zutun läuft

| | wo | wann |
|---|---|---|
| **Senden** | Buffers Server | zu den geplanten Terminen, Rechner darf aus sein |
| **Nachlegen** | `de.ganzakkurat.nachlegen` | täglich 19:15, wenn ein Platz frei wird |
| **Messen** | `de.ganzakkurat.rueckblick` | täglich 9:30 |

Alles andere braucht eine Sitzung: Themen wählen, Quellen abrufen, Entwürfe
schreiben, vertonen, rendern, freigeben.

**Buffers kostenloser Tarif nimmt zehn geplante Beiträge je Kanal.** Eine Woche
belegt acht davon — **zwei Wochen lassen sich deshalb nicht auf Vorrat
einplanen.** Das ist keine Einschränkung der Produktion, nur der Terminierung,
und sie löst sich selbst auf: `npm run nachlegen` legt täglich nach, was
hineinpasst.

→ Skill `woche-bauen`: die Kette von der Prüfung bis zur Einplanung.

## Rücklauf — was aus den Videos wird

Bis zum 18.08.2026 war die Pipeline eine **Einbahnstraße**: `verlauf.json`
schrieb mit, was hinausging, aber nie, was ankam. `npm run rueckblick`
schließt den Kreis — Buffer liefert den `externalLink`, YouTube die Zahlen,
`daten/rueckblick.json` sammelt sie nachtragend. `npm run ausreisser` und
`npm run aufschlaege` lesen sie, `src/rueckschau.ts` legt sie mit der Herkunft
aus `laeufe/<tag>/lauf.json` zusammen.

**Die Aufrufe sind die unwichtigste Zahl.** Sie sagen, was der Algorithmus
getan hat; was der Zuschauer getan hat, steht in der **Haltequote** an
**Sekunde 3,5** — dem Ende des Aufschlags, wo es hier ohnehin schon eine Regel
gibt. Beide Werkzeuge schweigen, solange zu wenig gemessen ist: Median ab acht
Videos, Formatvergleich ab fünf je Format. Geratene Größen haben hier zweimal
Geld gekostet; eine geratene Reichweitenregel wäre die teuerste, weil sie die
Themenwahl steuert. Die Frage, die früh trägt, ist ohnehin nicht „welches
Format ist gut", sondern **„was hatte dieses eine"**.

→ Skill `rueckblick-lesen`: warum nicht Buffer, warum nur YouTube, der Verzug
von ein bis drei Tagen.

## Werbemodell — Phase 1

**Zurzeit gar keine Werbung und keine Links, in keiner Beschreibung.** Für
Affiliate braucht es zuerst ein Kleingewerbe. Reihenfolge: Gewerbe →
Steuernummer → Bewerbung bei Amazon PartnerNet (dort werden Konten gekündigt,
die in 180 Tagen keine drei qualifizierten Verkäufe haben — Reichweite muss
vorher stehen).

Ab Partnerkonto gilt Variante A: nur das Format **Empfehlung** trägt
Partnerlinks und dafür das Label im Bild; die vier laufenden Formate bleiben
ganz ohne Links.

**Seltenheit ist der Preis, den eine Empfehlung wert ist.** Wer wöchentlich
empfiehlt, ist ein Prospekt.

**Die Vorarbeit fehlt seit dem 20.08.2026.** Sie hieß `auchgekauft` — ein
Kanal, der ein halbes Jahr lang sagt, was man *nicht* kaufen soll, wird
geglaubt, wenn er einmal etwas empfiehlt. Das Format ist gestrichen, weil es
für 18–30 das schwächste war, und der Verlust ist damit nicht weg, sondern
unbezahlt. Wer die Empfehlung scharf schaltet, muss dieses Vertrauen vorher
anders erarbeitet haben.

Ob Kennzeichnung allein in der Beschreibung für ein *Video* genügt, ist
ungeklärt und bleibt es vorerst. Der Anwaltstermin, der hier bis zum
17.08.2026 vorgesehen war, ist gestrichen — nicht aufgeschoben, sondern
gegenstandslos: Alle drei Fragen (Werbekennzeichnung, Impressumspflicht nach
§ 5 DDG, DPMAregister auf „Akkurat" in Klasse 41) hängen am gewerblichen
Start, und es gibt weder Werbung noch Partnerlinks noch Monetarisierung.

**Der Auslöser ist damit benannt, nicht der Termin.** Wer Phase 2 beginnt,
holt die drei Fragen zurück — sie stehen hier, damit sie beim Kleingewerbe
nicht neu gefunden werden müssen.

## Takt

**Vier Videos je Woche, festgelegt am 24.08.2026.** Ein Video je Tag um 18:00,
in der Reihenfolge der Liste — `zeitplanBauen` rechnet über die Listenposition,
seit `FORMATE[...].tag` weggefallen ist. Die Uhrzeit steht weiter am Format.
Feste Wochentage gibt es nicht: Veröffentlicht wird, was fertig und stark ist.

Die Zahl kommt nicht aus dem Bauchgefühl, sondern daraus, welcher Engpass
zuerst greift. Vier Kandidaten, in dieser Reihenfolge geprüft:

| Engpass | trägt | Rechnung |
|---|---|---|
| **Ideenvorrat** | **9 Wochen** | 77 Ideen, gerechnet je Format mit dem Minimum |
| Formatabwechslung | 4 je Woche | vier Formate, keines zweimal hintereinander |
| Produktion | ~26 je Woche | 11 min je Video, davon 6 min Beleg |
| ElevenLabs | ~240 je Monat | rund 500 Zeichen je Video, 121.000 im Monat |

**Der Ideenvorrat ist die Grenze, nicht die Produktion.** Das ist der Befund
aus Stufe 4: Ein Video im neuen Bau war in elf Minuten fertig, und mehr als die
Hälfte davon war der Beleg — Suche, fünf Abrufe, zwei Fehlschläge. Rechnerisch
gingen 26 Videos je Woche, aber `npm run pruefen` rechnet die Reichweite **je
Format** mit dem Minimum, und die schwächsten Fächer (`eswareinmal`,
`werhatrecht`) tragen zehn Themen. Bei vier Videos je Woche sind das neun
Wochen; bei sieben wären es fünf.

Die zweite Grenze ist die Formatregel. **Kein Format zweimal hintereinander**,
und es gibt vier — bei mehr als vier Videos je Woche muss eines doppelt laufen,
und dann wird aus der Regel ein Zwang statt einer Wache. Genau davor warnt die
Retention-Ladder: „volume without novelty is a negative".

Kontingent und Buffer sind keine Engpässe und werden hier nur genannt, damit
niemand sie neu ausrechnet: Vier Videos à rund 500 Zeichen sind 2.000 die
Woche, also knapp 7 % des Monatsvolumens von 121.000. Buffers kostenloser Tarif
nimmt zehn geplante Beiträge je Kanal — vier je Woche passen, und
`npm run nachlegen` legt täglich nach.

**Die Messbasis ist ein einziges Video.** Das ist dünn, und es ist trotzdem
genug für diese Entscheidung: Selbst wenn die Produktion dreimal so lange
dauert wie gemessen, entscheidet weiter der Vorrat. Die Zahl gehört überprüft,
sobald der Vorrat im schwächsten Fach unter sechs fällt — dann steht die Frage
neu, und zwar als Frage nach dem Nachfüllen, nicht nach dem Takt.

Die **Materialgrenze** für Aktuelles gilt weiter, sie hängt jetzt an `absicht`
statt an einem eigenen Sendeplatz: Neue **Geräte** sind durch
Herstellerankündigung (beteiligt) und Presse (nicht eintragbar) belegt und
fallen aus. Neue **Regeln, Normen und Grenzwerte** sind durch Behörden belegt —
nur die gehen. Das klingt nach Einschränkung und ist der Vorteil: Über ein neues
Handy berichten hunderttausend Kanäle am selben Tag; dass ein Recht auf
Reparatur gilt, erzählt niemand, weil es niemand liest.

## Länge

Ein Fenster, hart: **20 bis 36 Sekunden**, Zielwert **30**.

Die Vertonung streut rund sechs Prozent — derselbe Text ergab bei zwei Läufen
75,3 und 70,5 Sekunden; ElevenLabs liefert nicht zweimal dieselbe Aufnahme.
Bei 30 Sekunden sind das ±1,8 s. Wer den Zielwert trifft, fällt nie heraus;
wer an der Obergrenze baut, fällt beim nächsten Lauf durch, ohne ein Wort
geändert zu haben.

**Der Zielwert stand bis zum 24.08.2026 auf 23, und er war die Ursache für eine
Sprache, die niemand spricht.** Aufgefallen am ersten Video im neuen Bau:
„Laptops, älter als fünf Jahre." — kein Satz, kein Verb, eine Bildunterschrift.
Sechs Szenen in 23 Sekunden lassen je Satz vier Sekunden, und dann wird
gestrichen, bis nur noch Stichworte stehen. Der Zwang kam nicht vom Fenster,
sondern vom Zielwert, an dem tatsächlich geschrieben wird. Die Obergrenze ging
mit, weil 34 bei einem Zielwert von 30 im Wurfbereich der Streuung läge.

**Die Obergrenze stand bis zum 20.08.2026 auf 28 und ist an fremden Videos
gescheitert.** Zwölf Tech-Shorts wurden angesehen und vermessen; die drei mit
den meisten Aufrufen sind 41, 29 und 31 Sekunden lang, das alte Fenster hätte
alle drei abgelehnt. Die Gegenprobe steht in derselben Sammlung: 4,1 Millionen
bei 19 Sekunden, 1,75 Millionen bei sieben. **Länge ist keine Ursache, sondern
eine Folge davon, wie viel es zu zeigen gibt** — eine Obergrenze, die zur
Qualitätsaussage wird, misst die falsche Größe. Der Zielwert ist die
eigentliche Steuerung.

Der Einwand liegt nahe und trägt nicht: Das „zu lang" der ersten Zuschauer galt
Shorts im alten Fenster von 28 bis 40 Sekunden, nicht einer Obergrenze von 36.

Hier standen bis zum 16.08.2026 drei Zahlen für eine Frage (Fenster 28–40,
harte Grenze 45, Minimum 15). Die zweite Stufe war ein Rest aus der Zeit mit
zwei Fenstern — mit einem Fenster hat sie keine Aufgabe.

`npm run sprechprobe` prüft das vorab und kostet nichts.

### Was aus dem Zielwert für die Sprache folgt

Zwei Regeln stehen seit dem 24.08.2026 in `voice.md`, beide aus demselben
Befund:

**Jeder gesprochene Satz hat ein Verb.** Die alte Vorgabe „zwei bis sechs
Wörter" und „Ellipsen sind die Stimme" hat den Telegrammstil nicht erlaubt,
sondern erzwungen. Der Bildtext darf knapp bleiben — er wird gelesen, nicht
gehört, und `sprechtext` und `text` sind zwei Sprachen für zwei Sinne.

**Zahlen stehen als Ziffer, auch im Sprechtext.** „2009", nicht
„zweitausendneun". Vorher stand hier das Gegenteil, und der Untertitel hat es
vorgeführt: Über dem Bild stand „Zweitausendneun:" in voller Breite, wo „2009:"
gereicht hätte. **Der Sprechtext ist nicht nur Sprechtext — er ist der
Untertitel, Wort für Wort.** Was sich schlecht liest, ist damit falsch
geschrieben, auch wenn es sich gut anhört.

## Bild

**Keine Fotos, keine KI-Bilder, kein Stock-Material, keine Herstellerfootage.**
Ein Bildmodell erfindet Buchsen — das wäre derselbe Fehler, den die Belegpflicht
verhindern soll, nur ungeprüft. Herstellerfootage ist Marketingmaterial und
behauptet Technisches, ohne dass eine `quelleId` daran hängt; dasselbe Argument,
nur sitzt eine Marketingabteilung an der Quelle statt eines Bildmodells. Folge:
Es wird nie etwas selbst benutzt, also bleibt `produktionsregel` dauerhaft und
**„Test" ist für diesen Kanal endgültig ausgeschlossen**.

**Am 20.08.2026 ist KI-Video geprüft und verworfen worden** — nicht aus
Doktrin, sondern weil der Charakter-Stack dasselbe lokal und kostenlos leistet
und dabei nichts behauptet, wofür keine Quelle einsteht. Seither trägt eine
gerigte Figur die Shorts, dazu mehrere Bühnen und eine Kamera. Alles entsteht
aus Code.

**Jede Szene, die eine Zeichnung tragen kann, trägt eine.** Die Kehrtwende vom
18.08.2026 kam vom Zuschauer, nicht aus der Systematik: Die reine Typografie
hält den Inhalt, aber sie lässt die Fläche leer, und im Feed fällt das auf.

**Gezeichnet wird, was der Satz nennt. Nicht gezeichnet wird, was ein
Datenblatt behaupten würde** — Buchsenformen, Pinbelegungen, Leistungsangaben,
Herstellermerkmale.

**Die Figur und ihr Symbol stehen in getrennten Hälften.** Ein Symbol sitzt
fest in der rechten Bühnenhälfte; `stand: 'rechts'` setzte die Figur auf
dieselbe Stelle, und im Video vom 24.08.2026 lag der Stempel hinter ihr. Das
Schema lehnt die Kombination jetzt ab. Die Symbolposition selbst war zugleich
**an der falschen Pose gemessen** — gerechnet an `zeigen`, wo ein Arm zum Bild
hin ausgestreckt ist, während bei `achselzucken` beide Arme abstehen und die
Hand in der Zeichnung landete.

**Der Zeigestab ist am 24.08.2026 gestrichen**, samt `'stab'` im Schema. Die
Pose `erklaeren` bleibt als ausgestreckter Arm. Und die Figur kann seither
lächeln: Das Rig kannte vier Mundformen, von denen keine ein deutliches
Lächeln war, weshalb sie in acht von zehn Posen ernst bis betrübt aussah.

**Eine Zeichnung ist erst geprüft, wenn sie gerendert danebensteht.** Diese
Regel hat sich siebenmal bewährt, und jedes Mal sah der Code vorher richtig aus.

→ Skill `bild-bauen`: die Bühnenmaße (200 × 150, nichts unter y = 146), die
sieben Standbild-Fälle, Figur und Kamera samt Messwerten, die Bewegungsregeln,
die QA-Kette und `skripte/ff`.


## Zeitangaben altern — der Short nicht

Zwischen Entwurf und Ausstrahlung liegen hier ein bis zwei Wochen, und danach
bleibt der Short im Feed. „Seit zwölf Tagen" stimmte am Schreibtag und ist am
Sendetag falsch, ohne dass jemand etwas geändert hätte.

Das ist die unangenehmste Sorte Fehler, weil sie durch jede Prüfung geht: Die
Quelle stimmt, das Zitat steht auf der Seite, die Rechnung war korrekt — nur
der Bezugspunkt wandert. **Absolute Daten altern nicht:** „Seit dem 6. August"
ist in einem Jahr noch richtig. `src/pruefung.ts` lehnt „seit heute",
„gestern", „diese Woche" und „seit N Tagen/Wochen/Monaten" hart ab.

### Wer entscheidet, welche Szene ein Bild trägt

`src/illustration.ts` schlug aus dem Szenentext ein Symbol vor, und das
Ergebnis war, dass **jede** Szene eins bekam — der Erklärvideo-Reflex in
Codeform. Es ist ersatzlos gestrichen; welche Szene ein Bild trägt, ist eine
Entscheidung und kein Automatismus.

Die Regel dazu hat zweimal auf der falschen Seite gestanden — erst prüfte sie
nur nach oben (Ergebnis: gar keine Zeichnungen), dann verlangte sie genau eine
je Short (Ergebnis: eine, vier Szenen leer). Heute meldet sie jede bebilderbare
Szene **ohne** Zeichnung, und zusätzlich dieselbe Zeichnung zweimal im selben
Video. Über verschiedene Shorts hinweg ist Wiederholung erwünscht: Das
Gesetzbuch soll bei jedem Rechtsthema dasselbe sein.

Die Kopfzeile trägt Wortmarke, Formatpille und bei echter Systemspezifik die
Systemangabe. **Die Formatpille trägt die Wiedererkennung allein**, weil der
gesprochene Opener bewusst variiert — derselbe Einstieg immer wieder klingt
nach Schablone. Seit dem Wegfall des Wochentags ist sie das einzige
Wiedererkennungszeichen, das ein Format hat.

→ Skill `bild-bauen`: die sieben Standbild-Fälle im Einzelnen und die
Kamera-Messwerte vom 12.08.2026.

## Ideenvorrat

`daten/ideen/` — **eine Datei je Format**, `index.ts` als einzige Liste. Nicht
je Sachgebiet: Die Reichweite wird je Format gerechnet, und wer wissen will,
welches Fach leer läuft, soll eine Datei öffnen und nicht zehn. Jede Idee trägt
einen **Belegpfad**; das Schema erzwingt mindestens eine unbeteiligte Instanz —
wer schon beim Skizzieren keine benennen kann, hat kein Thema, sondern eine
Vermutung. `npm run pruefen` nennt die Reichweite in Wochen und rechnet dabei
**je Format** mit dem Minimum. `daten/ideen/hauptvideo.ts` sammelt, was als
Short nicht trägt.

Stand 20.08.2026: **77 Ideen auf vier Dateien** — `gibtswirklich` 21,
`absicht` 36, `eswareinmal` 10, `werhatrecht` 10. Bei der Umsortierung von acht
auf vier Formate ist keine Idee verloren gegangen; der Belegpfad ist der teure
Teil und formatunabhängig.

→ Skill `thema-finden`: der Prüfstein, die Materialgrenze, was nicht trägt.

## Stand

Die Pipeline steht bis einschließlich Veröffentlichung: Ablage auf Cloudflare
R2, Einplanung über Buffer, Zugangsprüfung (`npm run zugaenge`). Alle Zugänge
liegen in `.env`. `npm run veroeffentlichen` ist am 17.08.2026 erstmals im
Ganzen gelaufen — 24 Beiträge auf drei Kanälen, kein Fehlschlag. Die laufende
Aufgabenliste steht in `AUFGABEN.md`.

**Seit dem 20.08.2026 läuft ein Umbau**, und zwar mitten drin: Marke, Nische
und Formate sind neu, das Bild noch nicht. Bis eine Figur steht und ein Video
im neuen Bau gemessen ist, gilt der Takt als offen und wird nirgends zugesagt.
Der Plan liegt unter `~/.claude/plans/okay-ich-habe-hier-shimmering-eich.md`.

→ Skill `woche-bauen`: die Fallstricke der Frischeprüfung, `buffer-probe`,
ein hängender Render.

## Arbeitsweise

**Die Aufgabenliste gehört ans Ende jeder Antwort**, solange etwas offen ist —
aus `AUFGABEN.md`, Erledigtes durchgestrichen, die laufende Aufgabe mit `▸`.
Nicht in die Statuszeile: die gehört Emirhan und zeigt Modell, Kontingent und
Verzeichnis.

**Erst zu Ende besprechen, dann bauen.** Nach einem bestätigten Einzelpunkt
sofort loszubauen hat sich als falsch erwiesen — die Umsetzung kommt
gesammelt.
