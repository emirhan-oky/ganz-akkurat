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
npm run neuigkeiten       # neue EU-Rechtsakte für den Mittwoch, siebt auf ~10
npm run markenbilder      # Profilbild, Banner, Wortmarke aus video/Marke.tsx
npm run rueckblick        # holt, was aus den Videos geworden ist
npm run youtube-anmelden  # einmalig, danach nie wieder
npm run lauf              # Wochenlauf, ohne Ton (Szenenlängen geschätzt)
npm run lauf -- --mit-ton # kostet ElevenLabs-Kontingent
```

`sprechprobe` gehört vor jeden Lauf mit Ton. Sie spricht jede Szene mit der
deutschen Systemstimme von macOS (`say`, Anna) und rechnet die Standdauer mit
derselben Funktion aus wie der Renderer. Der Anlass: `ZEICHEN_PRO_SEKUNDE` in
`src/zeit.ts` stand auf 15,0 und war nie nachgemessen. Heute steht dort **15,4**,
gemessen an 2.479 Zeichen echter Vertonung.

**Was sie misst, ist nicht das Tempo, sondern der Text.** Die Formel zählt
Zeichen, gesprochen werden Silben — „240" sind drei Zeichen und vier Silben.
Annas absolutes Tempo (15,4) ist dabei belanglos und wird herausgerechnet;
sie stellt seit dem 16.08.2026 die **erwartete** Dauer neben die Formel, nicht
ihr eigenes Tempo neben die Konstante. Der alte Vergleich meldete bei jedem
Lauf „weicht deutlich ab" und legte damit die falsche Reaktion nahe: die
Konstante von der Produktionsstimme wegzudrehen.

`npm run pruefen` muss vor jedem Lauf grün sein. Die Schemaprüfung
(`skripte/schemapruefung.ts`) existiert wegen einer teuren Erfahrung:
`daten/beispiel-short.ts` ist die Standard-Prop der Remotion-Komposition und
wird in `calculateMetadata` **im Browser-Kontext** geparst. Reißt er das
Schema, bleibt Remotion in einem unerfüllten Promise stehen — der Render hängt
ohne Fehlermeldung, bis jemand abbricht. `tsc` sieht das nicht, weil
TypeScript Formen prüft und nicht Werte.

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

## Datenvertrag

`src/typen.ts` ist der einzige Vertrag. Alles andere richtet sich danach.

### `format` — die tragende Achse

**Acht Formate auf sieben Wochentage**, jedes genau einmal je Lauf. Der
Wochentag wird damit zur Wiedererkennung — ein Termin, kein Design, und er
kostet nichts.

Der Mittwoch trägt seit dem 17.08.2026 **zwei** Videos: mittags „Neu und keiner
sagt es dir", abends „Das ist Absicht". Deshalb steht die Sendezeit jetzt am
Format und nicht mehr als Konstante in `zeitplanBauen` — mit einer gemeinsamen
Uhrzeit wären beide auf dieselbe Minute gefallen und hätten sich die Reichweite
genommen. Ein Fehler, den kein Schema bemerkt, weil der Plan formal stimmt.

| Tag | Zeit | Format | Reaktion | Kipppunkt |
|---|---|---|---|---|
| Mo | 18 | **Du bist dumm** | schätzt daneben | die Zahl |
| Di | 18 | **Es war einmal** | Aha | das „und heute" |
| Mi | **12** | **Neu und keiner sagt es dir** | das gilt schon? | seit wann — und dass es niemand sagt |
| Mi | 18 | **Das ist Absicht** | Empörung | wer es entschieden hat |
| Do | 18 | **Na, auch gekauft?** | ertappt | was du stattdessen bekamst |
| Fr | 18 | **Das macht dein Gerät heimlich** | Unbehagen | wo es dokumentiert steht |
| Sa | 18 | **Das gibt es wirklich** | wtf | die Sache selbst |
| So | 18 | **Wer hat recht?** | Widerspruch | das Dritte, das beide übersehen |
| — | 18 | **Empfehlung** | — | erst ab Affiliate-Links |

**Die sieben sind am 17.08.2026 aus dem Material abgeleitet worden, nicht
umgekehrt.** Das ist der Unterschied zur Fassung vom Vortag: Damals standen
die Sendeplätze fest, und die Themen wurden hineinsortiert — Ergebnis waren
sieben Erklärvideos. Der neue Weg lief andersherum: erst sammeln, was man am
Tisch erzählen würde, dann nach der **Reaktion** sortieren und sehen, welche
Gruppen entstehen. Es wurden sieben, ohne dass die Zahl vorgegeben war.

Eine Beobachtung hat die Rechnung gerettet: **„Du bist dumm" ist keine
Themengruppe, sondern die Machart der Zahlen-Gruppe.** Die Schätzfrage ist das
Roasten, die Zahl ist die Auflösung. Ohne diese Zusammenlegung wären es acht
Gruppen auf sieben Tage gewesen.

Zwei Regeln gelten für alle:

1. **Die Pointe trifft die Sache, nicht den Zuschauer** — mit einer
   ausdrücklichen Ausnahme. Der Montag heißt „Du bist dumm" und behauptet
   genau das, aber die Auflösung sammelt ihn sofort wieder ein: „Sechzig. Du
   warst bei zwölf — wie alle." Der Titel beleidigt, das Video beweist, dass es
   allen so geht. **Ohne dieses „wie alle" bleibt nur die Beleidigung.**
2. **Kein Format verlangt eine Handlung.** „Steh auf und prüf das" ist Arbeit.
   Ein Format, das Arbeit verlangt, ist Hauptvideo-Stoff. Der Montag ist die
   feine Ausnahme: Schätzen ist keine Arbeit, es passiert unwillkürlich.

Die zweite Person ist seit dem 16.08.2026 erlaubt, der Sprecher dabei
mitgemeint. Vorher galt die dritte Person als Schutz vor Belehrung; sie hat
stattdessen jede Frechheit weichgespült.

**`MATRIX`** beantwortet die einzige Frage, die beim Entwerfen wirklich
auftritt: in welches Format gehört dieser Fakt? Sieben Prüffragen, der Reihe
nach, die erste Übereinstimmung gewinnt. `gibtswirklich` steht am Ende, weil es
alles auffängt, was keine der sechs anderen erfüllt.

Zwei Abgrenzungen müssen halten:

**Dienstag gegen Sonntag.** Beide handeln von falschen Überzeugungen. Lautet
die Auflösung schlicht „früher stimmte es, heute nicht", ist es ein
**Märchen**. `werhatrecht` braucht, dass **beide** Seiten etwas übersehen.

**Mittwoch gegen Freitag.** Beide empören. `absicht` ist, wie das Gerät
**gebaut** wurde; `heimlich` ist, was es im **Betrieb tut**. Der Drucker, der
Fremdpatronen sperrt, ist Mittwoch — der Drucker, der den Füllstand nach Hause
meldet, ist Freitag.

### `sachgebiet` — die stille zweite Achse

`drucken`, `laden`, `bildschirm`, `rechner`, `handy`, `fahren`, `netz`,
`recht`. Einzige Aufgabe: verhindern, dass eine Woche zur **Druckerwoche**
wird. Sieben Formate garantieren sieben verschiedene **Zugriffe**, aber nicht
sieben verschiedene **Gegenstände** — deshalb höchstens zweimal dasselbe
Sachgebiet je Lauf.

**Die Werte sind am 17.08.2026 komplett ausgetauscht worden.** Die alten fünf
(`schreibtisch`, `unterwegs`, `reise`, `zuhause`, `kaufen`) passen auf das neue
Material nicht: `reise` hätte genau **ein** Thema getragen, während im Vorrat
vier Drucker- und sieben Akku-Themen stehen. Eine Achse, die die Häufung nicht
sieht, um die es geht, ist keine Achse.

`recht` ist beim Planen der ersten Woche nachgetragen worden. Der Mangel fiel
am konkreten Fall auf: Wohin gehört „Ersatzteile müssen freigeschaltet
werden"? Es hat keinen Gegenstand, sondern einen Paragrafen — und eine
willkürliche Zuordnung macht die Achse wertlos.

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
| 3 | **Kipppunkt** | die Wendung, je Sendeplatz eine andere | erklären, warum das so ist |
| 4 | **Nachschlag** | ein trockener Satz, dann Wortmarke und Spruch | zusammenfassen |

**Die Position ist ein Feld im Schema, kein Kommentar.** Sieben Erklärvideos
sind entstanden, weil beim Schreiben nichts gefragt hat: Ist das die Zuspitzung
oder schon der Kipppunkt? Dieselbe Logik wie bei der Belegpflicht und beim
gestrichenen `presse` — eine Regel, die sich nicht ausdrücken lässt, lässt sich
nicht brechen. Geprüft wird, dass jede Position vorkommt, dass Aufschlag und
Nachschlag genau einmal vorkommen und dass die Folge **nur vorwärts** läuft.

Der Sonntag ist die Ausnahme beim Nachschlag: Er endet auf einer Restfrage
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

Bis zum 17.08.2026 nannte eine Szene eine `quelleId` und war damit belegt. Eine
Quelle mit drei Fundstellen hing aber an vier Szenen, und **jede erbte den
Belegstatus der Quelle als Ganzes**. Formal stimmte alles: Die Quelle existiert,
das Zitat steht auf der Seite, die Zeichenkettensuche ist grün.

Durchgegangen sind dabei drei Sätze, die keine Quelle trug: „Kein Zufall. Ein
Gremium hat das so festgelegt." (eine Behauptung über eine **Absicht**, belegt
mit einer Seite über Leistungsklassen), das ganze Märchen des Dienstags (die
UBA-Quelle spricht ausschließlich in der Gegenwart) und „Neunundzwanzig Euro"
am Donnerstag — eine plausible, erfundene Zahl.

Jetzt trägt jede Szene mit `quelleId` auch eine **`belegId`**: die eine
Fundstelle in dieser Quelle, die genau diesen Satz trägt. Jeder Beleg in
`quellen.json` hat dafür ein `id`-Feld.

Das Entscheidende ist der **Zeitpunkt**. Die Frage „welcher Satz trägt das?"
fällt beim Schreiben an, nicht in der Durchsicht — und wo es keine Fundstelle
gibt, steht ein leeres Feld statt einer Diskussion. Geprüft wird an zwei
Stellen, weil das Schema auch im Browser läuft:

- **Schema** (`src/typen.ts`): Wer eine Quelle nennt, nennt eine Fundstelle. Und
  umgekehrt.
- **`shortPruefen`** (`src/pruefung.ts`): Die Fundstelle existiert wirklich in
  **dieser** Quelle. Dazu ein Hinweis, sobald ein Zitat mehr als zwei Szenen
  tragen soll — das ist das Muster, hinter dem sich beide Fehler versteckt
  hatten. Zwei sind normal, Zuspitzung und Kipppunkt kommen oft aus demselben
  Absatz.

Zwei Bauregeln folgen daraus, beide aus der Reparatur gelernt:

- **Das „es war einmal" gehört in den Aufschlag und nur dorthin.** Er ist die
  einzige Position ohne Belegpflicht, und das ist kein Schlupfloch: Er setzt die
  Erzählung, er behauptet nichts. Alles danach läuft in der Gegenwart.
- **Der Streitfall des Sonntags ebenso.** Was zwei Lager behaupten, ist keine
  Aussage über die Welt — aber die Zuspitzung darunter muss eine sein.

### Die Denkpause — `pauseSek`

Der Montag braucht Stille nach „Schätz mal", sonst ist die Frage rhetorisch
und niemand liegt hinterher daneben. Eine Szene bestellt sie über `pauseSek`,
die Vertonung setzt einen `<break>`-Tag in den Text.

**Der erste Anlauf lief über Auslassungspunkte und war falsch begründet.** Im
Schema stand, eine Sekundenangabe sei „eine Zahl, die niemand einhält" — die
Pause entstehe in der Sprachsynthese und lasse sich nicht bestellen. Das war
geraten. Im fertigen Montags-Short kam eine Denkpause von **1,0 Sekunde**
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

- **`format`** — jedes der sieben Formate kommt im Lauf genau einmal vor.
  Geprüft wird beides: ein Format doppelt **und** ein Format fehlt. Nur die
  Dopplung zu prüfen ließe einen Lauf mit sechs Shorts durchgehen.
- **`sachgebiet`** — höchstens zwei Shorts je Sachgebiet und Woche.
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
- **`laenge`** — 18 bis 28 Sekunden, hart in beide Richtungen.
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

## Der Rundlauf — das Video endet nicht

**Ein Short läuft von selbst wieder an, und ein Rewatch zählt als eigene
Ansicht.** Bis zum 18.08.2026 arbeitete der Schluss dagegen: ein Satz, ein
blauer Strich, eine zweite Wortmarke, der Spruch. Gemessen an den acht
fertigen Shorts dauerte das **1,5 bis 3,1 Sekunden**, im Schnitt 2,2 — bei
zwanzig Sekunden Laufzeit elf Prozent, in denen nichts Neues kommt.

Der Strich war dabei das eigentliche Signal. Er trennte die Pointe vom
Absender und sagte optisch: fertig. Er ist weg, und mit ihm die zweite
Wortmarke. Der Spruch läuft jetzt **oben unter der Kopfzeile** mit, an der
Stelle, an der sonst der Beleg steht — der Platz ist frei, weil die
Schlussszene als einzige nichts behauptet. Die Wortmarke selbst wird dadurch
nicht seltener: Sie stand ohnehin in jedem Bild.

**`rundlauf` ist ein Pflichtfeld an der Schlussszene:** warum der erste Satz
danach wieder passt. Ob er das tut, kann kein Skript beurteilen — deshalb ein
Feld und keine Prüfung, dieselbe Logik wie bei `position` und `belegId`.
Bemerkenswert: Bei zweien der acht lief es schon rund, ohne dass jemand darauf
geachtet hätte („Gefragt hat dich niemand." → „Dein Fernseher hat ein
Mikrofon.").

Prüfbar ist die andere Hälfte: **Der Schlusssatz darf nicht abbinden.**
„Fazit", „kurz gesagt", „schreib es in die Kommentare" — die Liste steht in
`src/pruefung.ts`. Sie hat beim ersten Lauf sofort einen Treffer gehabt.

### `weitererzaehlt` muss gesprochen werden

Das Feld stellte beim Entwerfen die richtige Frage und gab die Antwort nie
weiter: **In keinem der acht Shorts kam der Satz vor**, bei `wlan-abends` nicht
einmal eines seiner sechs Sachwörter. Er existierte nur auf der Platte.

Jetzt prüft `shortPruefen` hart, dass er im **verketteten** Sprechtext steht.
Über eine Szenengrenze darf er laufen — dazwischen liegt nur eine Atempause —,
über das ganze Video verstreut nicht.

### Die Prüfung läuft jetzt vor der Vertonung

`npm run pruefen` prüfte bis zum 18.08.2026 nur das Zod-Schema. Die harten
Regeln aus `src/pruefung.ts` liefen erst im Wochenlauf — also **nachdem** die
Vertonung bezahlt war. Aufgefallen ist der Unterschied an einem Schlusssatz mit
„Schreib es in die Kommentare": Die Regel dagegen meldete ihn zuverlässig,
`npm run pruefen` sagte grün.

Der erste Lauf mit den harten Regeln in der Vorprüfung hat sofort eine **tote,
widersprüchliche Regel** zutage gefördert: eine Obergrenze für Zeichnungen
(„mehr als die Hälfte ist zu viel"), die am 18.08. durch die Untergrenze
ersetzt worden war, aber stehenblieb — und von da an den Sollzustand als Mangel
meldete, mit einem Begründungstext, der das Gegenteil der geltenden Doktrin
sagte. Sie ist gestrichen.

## Der Humor

Er ist keine vierte Zutat, sondern die **Wendung** — und er hängt am Format:
`dubistdumm` ist das kollektive Danebenliegen, `eswareinmal` die veraltete
Weisheit, `absicht` die Absurdität der Industrie, `gibtswirklich` die Tatsache,
die keine Pointe braucht.

Drei Regeln:

1. **Die Pointe trifft die Sache, nicht den Zuschauer** — außer montags, und
   dort fängt die Auflösung ihn wieder ein („wie alle"). Sonst trifft sie die
   veraltete Regel oder eine Institution.
2. **Trocken statt laut.** Untertreibung mit Ausrufezeichen gibt es nicht.
3. **Der Witz muss belegt sein wie alles andere.** „Der Verkäufer hofft, dass
   du das glaubst" wäre lustig und eine unbelegte Behauptung über Absichten.
   Die Folge ist angenehm: **Das Lustigste ist meistens die Tatsache, nüchtern
   hingestellt** — dreizehn Jahre für einen Ladestecker braucht keine Pointe.

## Quellen

`daten/quellen.json`. Neue Quellen kommen erst hinein, **nachdem die URL
tatsächlich abgerufen und der Inhalt gelesen wurde** — nie aus dem Gedächtnis
und nie aus einem Suchtreffer-Ausschnitt. `geprueftAm` dokumentiert genau
diesen Abruf.

Die Regel ist **nachprüfbar**: Jeder Beleg trägt ein `zitat`, wörtlich von der
Seite, und `npm run quellen-pruefen` holt die Seite und sucht die
Zeichenkette. `stuetzt` daneben ist die Folgerung in unseren Worten und wird
nicht geprüft.

**Die Prüfung fragt bewusst kein Sprachmodell**, sondern sucht stumpf. Beim
Bau am 13.08.2026 hatte ein Modell zwei Zitate als „exakt vorhanden" gemeldet,
die es nicht waren — es hatte Anführungszeichen weggeglättet. Ein Modell die
Behauptung eines Modells prüfen zu lassen ist keine Prüfung, sondern eine
zweite Meinung.

### Welche Quellen es gibt — und welche nicht

| Rang | Arten | Rolle |
|---|---|---|
| **unbeteiligt** | `standard`, `behoerde`, `rechtsprechung` | dürfen eine Aussage allein tragen |
| **beteiligt** | `hersteller`, `plattform` | autoritativ fürs eigene Datenblatt, interessiert am Rest |

**`presse` ist nicht eintragbar**, nicht bloß heruntergestuft. Sie bleibt als
**Wegweiser** erlaubt: lesen, zur Primärquelle folgen, die Primärquelle
zitieren. Dass das nicht an Vorsatz hängt, sondern am Enum, ist die
Absicherung — eine Regel, die sich nicht ausdrücken lässt, lässt sich nicht
brechen. **`messung` ist raus**, weil per Konstruktion unerreichbar: Die
`produktionsregel` verbietet Aussagen aus eigener Produkterfahrung.

### `npm run belege` — die Prüfung, die kein Skript machen kann

`quellen-pruefen` beantwortet eine Frage: Steht das Zitat auf der Seite? Die
zweite beantwortet es ausdrücklich nicht — **trägt das Zitat den Satz, den wir
darauf bauen?** Das Feld heißt `stuetzt` und wird nie geprüft.

Dort sitzt der teuerste Fehler dieses Projekts: Am 14.08.2026 stand im
Kabel-Short eine Aussage, deren Quelle existierte, deren Zitat wirklich auf
der Seite stand — und die von keiner der drei Quellen getragen wurde. Falsch
war die Folgerung dazwischen. Kein Schema, keine Zeichenkettensuche und kein
zweites Modell hätte das gefunden. **Vor der Vertonung ansehen** — eine
falsche Folgerung, die erst in der Freigabe auffällt, ist schon bezahlt.

**Die Seite ist am 17.08.2026 enger geworden, und das ist der eigentliche
Fortschritt.** Vorher standen neben einem Satz **alle** Zitate seiner Quelle.
Wer drei Zitate neben eine Behauptung gestellt bekommt, liest, ob irgendeines
passt — nicht, ob dieses eine trägt. Genau so sind drei unbelegte Sätze durch
die Durchsicht gekommen. Jetzt steht neben jeder Behauptung das eine Zitat, an
das sie sich über `belegId` gebunden hat, und sonst keines. Aus 82 Paaren für
acht Shorts wurden 32 — dieselbe Substanz, ohne die Dekoration, die die Zahl
stimmen ließ.

Praktische Folgen:

- **Zitate kurz halten**, 40–80 Zeichen, ohne Anführungszeichen im Zitat.
  Lange Zitate brechen an Umbrüchen und Sonderzeichen.
- `abrufart: 'manuell'` ist für Seiten, die ihren Inhalt nachladen. PDFs mit
  komprimierten Textströmen (Bundesnetzagentur) gehören dazu.
- **Wer behaupten kann, muss belegen können** (`QUELLENPFLICHT` in
  `src/typen.ts`): Pflicht bei `aussage`, `zahl`, `einschraenkung`,
  `vergleich`, `warnung`, `merkmalskarte`, `kaufkriterien`, `beleg`; ohne Feld
  bei `hook` und `endkarte`.

## Buffer nimmt zehn je Kanal

Der kostenlose Tarif erlaubt **zehn geplante Beiträge je Kanal**. Bei acht
Shorts auf drei Kanälen belegt eine Woche also acht Plätze — und solange die
laufende Woche noch aussteht, ist kein Platz für die nächste.

Das Limit meldet sich erst beim Anlegen, mit `LimitReachedError`, und dann
steht die Hälfte schon draußen: Am 18.08.2026 brach ein Lauf nach dem
**zwölften von 24** Beiträgen ab. `veroeffentlichen.ts` zählt deshalb vorher
und bricht ab, bevor der erste Beitrag rausgeht.

**Zwei Wochen lassen sich nicht auf Vorrat einplanen.** Die nächste Woche geht
erst raus, wenn die laufende gesendet ist — praktisch also am Wochenende. Das
ist keine Einschränkung der Produktion, nur der Terminierung.

### Ein angelegter Beitrag wird sofort vermerkt

Derselbe Abbruch hat die zwölf angelegten Beiträge fast verloren:
`veroeffentlicht.json` wurde erst **nach** der letzten Schleife geschrieben,
also nie. Die Zuordnung musste aus Buffer zurückgeholt und über die
Fälligkeit den Shorts zugeordnet werden.

Jetzt schreibt der Lauf nach jedem einzelnen Beitrag fort. Ein Beitrag, der
angelegt ist, existiert — ihn erst nach dem letzten Erfolg zu vermerken heißt,
den Buchhaltungsstand von etwas abhängig zu machen, das danach kommt.

## Rücklauf — was aus den Videos wird

Bis zum 18.08.2026 war die Pipeline eine **Einbahnstraße**. `verlauf.json`
schrieb mit, was hinausging — Format, Sachgebiet, Thema, Dauer —, aber nie,
was ankam. Woche 3 wusste nichts von Woche 1. Jede Regel über Reichweite wäre
damit geraten gewesen, und geratene Größen haben hier schon zweimal Geld
gekostet.

`npm run rueckblick` schließt den Kreis: `veroeffentlicht.json` hält `shortId`
und `beitragId`, Buffer liefert dazu den `externalLink`, YouTube die Zahlen.
Sie landen in `daten/rueckblick.json` — **nachtragend**, eine Messung je Tag
und Short, damit man die Entwicklung sieht und nicht nur den letzten Stand.

### Warum nicht Buffer

Die Buffer-Schnittstelle **hat** ein `metrics`-Feld mit sechzehn Metriktypen.
Sie füllt es nur nicht. Gemessen am ersten Video des Kanals: YouTube meldete
112 Aufrufe, Buffer meldete 0 — und `metricsUpdatedAt` lag **vor** `sentAt`.
Buffer fasst die Zahlen einmal beim Senden an und danach nie wieder; eine
Mutation zum Nachladen gibt es nicht.

Das ist die gefährlichste Sorte Fund, weil nichts kaputt aussieht. Wäre es
nicht aufgefallen, schriebe der Rückblick jede Woche Nullen mit, und niemandem
fiele es auf — es steht ja eine Zahl da. Dieselbe Sorte Fehler wie die drei
Zitate, die formal grün waren.

Buffer bleibt trotzdem in der Kette: `externalLink` ist die einzige Brücke
zwischen einem Entwurf auf der Platte und dem Video draußen.

### Warum nur YouTube

TikTok lädt seine Zahlen per JavaScript nach, Instagram gibt ohne Anmeldung
gar nichts heraus. Beide verlangten ein Geschäftskonto, eine
Entwickleranmeldung und ein Freigabeverfahren — für Zahlen zu **demselben**
Video mit **demselben** Aufschlag. Was an Sekunde 3,5 bei YouTube hält, hält
auch dort. Die Zahl muss an einer Stelle sauber sein, nicht an dreien.

### Welche Zahl zählt

**Die Aufrufe sind die unwichtigste.** Sie sagen, was der Algorithmus getan
hat. Was der Zuschauer getan hat, steht in der **Haltequote** — und die wird
an der Stelle gelesen, an der es hier schon eine Regel gibt: **Sekunde 3,5**,
das Ende des Aufschlags. Dazu die Durchsichtsrate und das Teilen.

Zwei Dinge, die man wissen muss, bevor man sich wundert:

- **Analytics kommt mit ein bis drei Tagen Verzug.** Für ein Video von gestern
  Abend gibt es noch nichts. Das Skript sagt das ausdrücklich, weil es sonst
  wie ein Fehler aussieht.
- **Die OAuth-App muss auf „In Produktion" stehen.** Auf „Testing" verfällt
  die Anmeldung nach sieben Tagen, und die Meldung dazu (`invalid_grant`)
  sieht nach einem kaputten Token aus statt nach einer Einstellung.

### Was der Rücklauf noch nicht kann

Bei acht Videos die Woche sind vier Wochen **32 Datenpunkte über acht
Formate** — vier je Format. Damit lässt sich kein Format bewerten, und wer es
trotzdem tut, hat wieder geraten, nur mit Zahlen daneben. Was schon nach zwei
Wochen sichtbar wird, sind **Ausreißer nach oben**: das eine Video, das
dreimal so gut lief. Das ist ohnehin die interessantere Frage — nicht „welches
Format ist gut", sondern „was hatte dieses eine".

## Werbemodell — Phase 1

**Zurzeit gar keine Werbung und keine Links, in keiner Beschreibung.** Für
Affiliate braucht es zuerst ein Kleingewerbe. Reihenfolge: Gewerbe →
Steuernummer → Bewerbung bei Amazon PartnerNet (dort werden Konten gekündigt,
die in 180 Tagen keine drei qualifizierten Verkäufe haben — Reichweite muss
vorher stehen).

Ab Partnerkonto gilt Variante A: nur das Format **Empfehlung** trägt
Partnerlinks und dafür das Label im Bild; die sieben Wochenformate bleiben
ganz ohne Links. Geplant sind dann drei Empfehlungen je Woche zusätzlich zu
den sieben — zehn Videos.

**Seltenheit ist der Preis, den eine Empfehlung wert ist.** Wer wöchentlich
empfiehlt, ist ein Prospekt. Und `auchgekauft` ist die Vorarbeit dazu: Ein
Kanal, der ein halbes Jahr lang sagt, was man *nicht* kaufen soll, wird
geglaubt, wenn er einmal etwas empfiehlt.

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

**Acht Shorts pro Woche, einer je Format, ein Video je Tag um 18:00 — außer
mittwochs, da kommt um 12:00 eins dazu.**
`zeitplanBauen` in `src/buffer.ts` liest den Wochentag aus `FORMATE[...].tag`,
nicht aus der Array-Position — der Wochentag ist ein Versprechen an den
Zuschauer und gehört nicht an eine Listenstelle.

Kontingent: acht Videos à rund 360 Zeichen sind knapp 2.900 die Woche, also gut
10 % des Monatsvolumens von 121.000. Mit den drei Empfehlungen später rund 14 %.
Der gemessene Wert für sieben Videos lag bei 2.508 Zeichen.
Vorher waren es 26 % für fünf Videos.

**Der Mittwochsplatz um 12 Uhr ist der teuerste der acht.** Alle anderen
ziehen aus einem Vorrat, der Wochen hält; dieser braucht jede Woche eine frisch
abgerufene Behördenseite, weil ein Vorrat aus dem Frühjahr im Herbst kein
Vorrat mehr ist, sondern ein Archiv. Die Materialgrenze ist hart: Neue
**Geräte** sind durch Herstellerankündigung (beteiligt) und Presse (nicht
eintragbar) belegt und fallen aus. Neue **Regeln, Normen und Grenzwerte** sind
durch Behörden belegt — nur die gehen. Das klingt nach Einschränkung und ist
der Vorteil: Über ein neues Handy berichten hunderttausend Kanäle am selben
Tag; dass seit dem 31. Juli ein Recht auf Reparatur gilt, erzählt niemand, weil
es niemand liest.

**Der Engpass ist nicht die Produktion, sondern der Beleg**: sieben
abgerufene, wörtlich zitierte Seiten je Woche. Das ist der einzige Schritt,
den keine Struktur verkürzt — und der Grund, warum der Ideenvorrat mit seinen
Belegpfaden wertvoll ist.

## Länge

Ein Fenster, hart: **18 bis 28 Sekunden**, Zielwert die **Mitte bei 23**.

Die Vertonung streut rund sechs Prozent — derselbe Text ergab bei zwei Läufen
75,3 und 70,5 Sekunden; ElevenLabs liefert nicht zweimal dieselbe Aufnahme.
Bei 23 Sekunden sind das ±1,4 s. Wer die Mitte trifft, fällt nie heraus; wer
bei 27,5 baut, fällt beim nächsten Lauf durch, ohne ein Wort geändert zu haben.

Hier standen bis zum 16.08.2026 drei Zahlen für eine Frage (Fenster 28–40,
harte Grenze 45, Minimum 15). Die zweite Stufe war ein Rest aus der Zeit mit
zwei Fenstern — mit einem Fenster hat sie keine Aufgabe.

`npm run sprechprobe` prüft das vorab und kostet nichts.

## Bild

**Keine Fotos, keine KI-Bilder, kein Stock-Material.** Ein Bildmodell erfindet
Buchsen — das wäre derselbe Fehler, den die Belegpflicht verhindern soll, nur
ungeprüft. Herstellerfootage ist Marketingmaterial und behauptet Technisches,
ohne dass eine `quelleId` daran hängt; dasselbe Argument, nur sitzt eine
Marketingabteilung an der Quelle statt eines Bildmodells. Folge: Es wird nie
etwas selbst benutzt, also bleibt `produktionsregel` dauerhaft und **„Test"
ist für diesen Kanal endgültig ausgeschlossen**.

**Jede Szene, die eine Zeichnung tragen kann, trägt eine.** Das ist seit dem
18.08.2026 so und war zwei Tage lang das Gegenteil. Die Kehrtwende kommt vom
Zuschauer, nicht aus der Systematik: Die reine Typografie hält den Inhalt, aber
sie lässt die Fläche leer, und im Feed fällt das auf.

Drei Szenenarten können konstruktionsbedingt keine tragen und sind deshalb aus
der Zählung: `vergleich` hat zwei Spalten, `kaufkriterien` eine Liste,
`schluss` zeigt Wortmarke und Spruch. Alle drei sind voll.

### Was gezeichnet wird — und was nicht

**Gezeichnet wird, was der Satz nennt. Nicht gezeichnet wird, was ein
Datenblatt behaupten würde** — Buchsenformen, Pinbelegungen, Leistungsangaben,
Herstellermerkmale.

Diese Fassung ist eine **Korrektur**, keine Lockerung. Hier stand „keine
Gerätezeichnungen", und der Grund dafür war immer nur die falsch gezeichnete
Buchse: Sie behauptet etwas über ein Datenblatt, und dafür steht keine Quelle
ein. Aus „keine Buchsen" wurde beim Bauen „keine Gegenstände", und an ihre
Stelle traten Assoziationen — ein **Sofa** für „Dein Fernseher hat ein
Mikrofon", eine **Waage** für „zwei Kabel", eine **Uhr** für „dreizehn Jahre".

Von 26 Zuordnungen waren zehn falsch, alle aus diesem einen Grund. **Eine
Assoziation, die nicht trifft, ist schlechter als der schlichte Gegenstand** —
sie sieht aus wie ein Versehen, und beim Zuschauer ist sie genau das. Ein
Fernseher als Rechteck auf einem Fuß behauptet dagegen nichts, was falsch sein
könnte.

Was bleibt: Wo der Satz **keinen** Gegenstand nennt, steht weiter ein
Situationssymbol — Kalender für eine Frist, Fabrik für „ab Werk", Menschen für
„alle gleichzeitig". „Licht braucht 67 Millisekunden um die Erde" hat keinen
Gegenstand, und dort trägt die Zahl das Bild.

### Die Bühne ist 200 × 150, nicht quadratisch

`viewBox="0 0 200 150"`, Standfläche bei `y = 140`. Wer für 200 × 200 zeichnet,
verliert alles unter 150 — **lautlos**: Das Symbol erscheint, nur ohne
Unterkante. Am 18.08.2026 traf das drei von vier neuen Zeichnungen. Beim
QR-Code fehlte dadurch die dritte Eckmarke, und ohne die sind es drei
Quadrate. Faustregel: nichts unter **y = 146**.

### Was der Satz nennt, nicht was das Thema ist

Der Sonntags-Short handelt vom Fingerabdruck im Browser. Zweimal wurde
deshalb ein **Fingerabdruck** gezeichnet, und zweimal hat das Standbild ihn
verworfen: konzentrische Kreise lasen sich als Radar, offene Bögen als
Regenbogen. Ein Abdruck lebt von zwei Dutzend dicht liegenden Linien — bei
4 px Strichstärke auf 200 Einheiten wird daraus ein grauer Fleck oder etwas
anderes.

Der Fehler lag aber davor: Der Satz lautet „Erkannt wirst du am **Browser**."
Er nennt keinen Abdruck. **Gezeichnet wird, was der Satz nennt — nicht, worum
es im Video geht.** Ein Browserfenster ist mit vier Linien eindeutig.

## Zeitangaben altern — der Short nicht

Zwischen Entwurf und Ausstrahlung liegen hier ein bis zwei Wochen, und danach
bleibt der Short im Feed. „Seit zwölf Tagen" stimmte am Schreibtag und ist am
Sendetag falsch, ohne dass jemand etwas geändert hätte.

Das ist die unangenehmste Sorte Fehler, weil sie durch jede Prüfung geht: Die
Quelle stimmt, das Zitat steht auf der Seite, die Rechnung war korrekt — nur
der Bezugspunkt wandert. **Absolute Daten altern nicht:** „Seit dem 6. August"
ist in einem Jahr noch richtig. `src/pruefung.ts` lehnt „seit heute",
„gestern", „diese Woche" und „seit N Tagen/Wochen/Monaten" hart ab.

### Die Prüfung hat die Richtung zweimal gewechselt

`src/illustration.ts` schlug aus dem Szenentext ein Symbol vor, und das
Ergebnis war, dass **jede** Szene eins bekam — der Erklärvideo-Reflex in
Codeform. Es ist ersatzlos gestrichen; welche Szene ein Bild trägt, ist eine
Entscheidung und kein Automatismus.

Die Regel dazu hat danach zweimal auf der falschen Seite gestanden:

1. Sie prüfte nur nach **oben** (mehr als die Hälfte der Szenen ist zu viel).
   Ergebnis: gar keine Zeichnungen in acht Shorts, weil nichts nach unten
   fragte.
2. Sie verlangte **genau eine** je Short. Ergebnis: eine, und vier Szenen
   blieben leer.

Heute meldet sie jede bebilderbare Szene **ohne** Zeichnung — und zusätzlich,
wenn dieselbe Zeichnung in einem Video zweimal vorkommt. Über verschiedene
Shorts hinweg ist Wiederholung erwünscht: Das Gesetzbuch soll bei jedem
Rechtsthema dasselbe sein.

**Eine Zeichnung ist erst geprüft, wenn sie gerendert danebensteht.** Diese
Regel hat sich inzwischen siebenmal bewährt:

- Am 14.08.2026 sahen drei neue Symbole im Code plausibel aus und im Standbild
  nicht: Die Steckdose las sich als Gesicht, der Kalender schrumpfte in einer
  textreichen Szene zur Karte mit Streifen, die Nachbarhäuser hatten keine
  Dächer und waren damit keine Häuser.
- Am 16.08.2026 lief die Hook „Zwanzigtausend." bei fester Schriftgröße über
  den rechten Rand — dorthin, wo TikTok seine Bedienleiste einblendet. Die
  Hook skaliert jetzt nach dem **längsten Wort**, nicht nach der
  Gesamtlänge: Ein langer Satz bricht um, ein langes Wort nicht. Deutsche
  Komposita sind lang, und die Bühne ist 1100 Pixel breit.
- Am selben Tag brach die Formatpille „Hallo 21. Jahrhundert" auf zwei Zeilen
  und zog die Kopfzeile in die Höhe. Die Pillennamen stehen deshalb getrennt
  vom Formattitel in `FORMATE[...].pille`, und die Pille bricht nie um.
- Und das erste Akku-Logo lag waagerecht wie das Batteriesymbol im Display —
  es nutzte damit nur die halbe Höhe des Quadrats und las sich als dunkler
  Fleck. Aufrecht füllt es seinen Platz.
- Am 18.08.2026 gleich dreifach: Die **Ladenkasse** las sich als Bildschirm auf
  einem Kasten und damit fast wie das Symbol `fernseher` zwei Videos weiter —
  zwei ähnliche Zeichnungen sind schlimmer als eine zu wenig, weil der
  Zuschauer einen Zusammenhang sucht, den es nicht gibt. Die **zwei Kabel**
  waren gespiegelt gezeichnet und damit Ohrhörer; gleichgerichtet lesen sie
  sich als das, was sie sind, nämlich zweimal dasselbe. Und die Symbole
  erschienen zwar, aber **60 Pixel groß statt 560**: In einer Flex-Spalte nahm
  der Text sich, was er brauchte, und die Zeichnung bekam den Rest.

Die Kopfzeile trägt Wortmarke, Formatpille und bei echter Systemspezifik die
Systemangabe. **Die Formatpille trägt die Wiedererkennung allein**, weil der
gesprochene Opener bewusst variiert — derselbe Einstieg siebenmal die Woche
klingt nach Schablone.

**Kamera-Layer: probiert, verworfen (12.08.2026).** Falls das Thema
zurückkommt, die Messwerte: `spring` in Remotions Voreinstellung
(`damping: 10`) erreicht in der Spitze das 2,95-fache seiner
Durchschnittsgeschwindigkeit, `Easing.inOut(sin)` nur das 1,57-fache; über
etwa 1 % Bildänderung je Einzelbild wird eine Fahrt unruhig. Nicht gemessen
wurde `TEMPO.feder` aus `src/marke.ts` (`damping: 200`).

## Ideenvorrat

`daten/ideen/` — **eine Datei je Sendeplatz**, `index.ts` als einzige Liste.
Nicht mehr je Sachgebiet: Die Reichweite wird je Format gerechnet, und wer
wissen will, welches Fach leer läuft, soll eine Datei öffnen und nicht sieben. Jede
Idee trägt einen **Belegpfad**: welche Instanz die Aussage tragen könnte und
ob sie unbeteiligt ist. Das Schema erzwingt mindestens eine unbeteiligte
Instanz — wer schon beim Skizzieren keine benennen kann, hat kein Thema,
sondern eine Vermutung. `npm run pruefen` nennt die Reichweite in Wochen und
rechnet dabei **je Format**: Ein Format ohne Nachschub hält die ganze Woche
auf, auch wenn sechs andere überquellen.

`daten/ideen/hauptvideo.ts` sammelt, was als Short nicht trägt — sechzehn
Ideen, die eine **Vorgeschichte** brauchen (elf Diagnosen: „mein Dock lädt,
aber kein Bild") oder eine **Handlung** verlangen (Selbsttest, Notlösung,
Reihenfolge). Beides ist im Feed tödlich und im langen Video normal. Kein
Skript liest die Liste; der Belegpfad, also der teure Teil, ist mitgewandert.

## Stand

Die Pipeline steht bis einschließlich Veröffentlichung: Ablage auf Cloudflare
R2, Einplanung über Buffer, Zugangsprüfung (`npm run zugaenge`). Alle Zugänge
liegen in `.env`.

`npm run buffer-probe` ist der Rauchtest dieser Kette. Am 13.08.2026 fand er
drei Dinge, die keine Prüfung davor sehen konnte:

- **Jeder Dienst verlangt eigene `metadata`.** YouTube `title` und
  `categoryId` (28), Instagram einen `type` (`reel`, nicht `post`). Ohne sie
  lehnt Buffer ab — das betraf zwei von drei Kanälen.
- **`isAiGenerated` steht je Dienst**, nicht nur als `aiAssisted` am Beitrag.
- **`deletePost` antwortet mit einer anderen Union als `createPost`** — mit
  den falschen Fragmenten blieb der Testbeitrag im Konto stehen.

`skripte/veroeffentlichen.ts` prüft zweierlei: ob die Shorts noch dem Schema
entsprechen, und ob die Videodatei jünger ist als alles in `video/`, `src/`
und `daten/`. Zwei Fallstricke dabei, beide derselbe Denkfehler — ein Schritt
schreibt in etwas, das er selbst überwacht:

- **`daten/verlauf.json` ist von der Frischeprüfung ausgenommen.**
- **Nur ein Lauf `--mit-ton` schreibt den Verlauf fort.** Ein Trockenlauf ist
  eine Übung; wer ihn mitschreibt, verbrennt ein Thema, das nie erschienen ist.

**Offen:** `npm run veroeffentlichen` ist nie im Ganzen gelaufen — der Schritt
braucht einen freigegebenen Lauf. Die laufende Aufgabenliste steht in
`AUFGABEN.md`.

## Arbeitsweise

**Die Aufgabenliste gehört ans Ende jeder Antwort**, solange etwas offen ist —
aus `AUFGABEN.md`, Erledigtes durchgestrichen, die laufende Aufgabe mit `▸`.
Nicht in die Statuszeile: die gehört Emirhan und zeigt Modell, Kontingent und
Verzeichnis.

**Erst zu Ende besprechen, dann bauen.** Nach einem bestätigten Einzelpunkt
sofort loszubauen hat sich als falsch erwiesen — die Umsetzung kommt
gesammelt.
