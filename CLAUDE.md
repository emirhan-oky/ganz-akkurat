# Ganz akkurat

Automatisierte Shortvideo-Produktion. Entwurf → Vertonung → Render → Freigabe →
Veröffentlichung. Deutschsprachig, auch im Code: Bezeichner, Kommentare und
Ausgaben sind deutsch.

**Der Kanal heißt seit dem 16.08.2026 „Ganz akkurat"**, Handle `@ganzakkurat`,
Domain `ganzakkurat.de`, Spruch **„Wir haben nachgelesen."** „Akkurat" trägt
drei Bedeutungen: den **Akku** vorn, die **Genauigkeit** als Haltung, den
**Rat** hinten.

## Prüfen vor allem anderen

```
npm run pruefen           # tsc --noEmit && Schema- und Regelprüfung
npm run quellen-pruefen   # ruft jede Quellen-URL ab, sucht das Zitat
npm run belege            # stellt Sprechtext und Zitat nebeneinander
npm run dialogprobe       # zählt den Dialog gegen Emirhans gemessene Werte
npm run sprechprobe       # misst die Sprechdauer, kostet kein Kontingent
npm run pausenprobe       # misst, wie lange die Stimme wirklich schweigt
npm run stimmproben       # Hörproben mehrerer Stimmen, `--paar` für beide Rollen
npm run stimmprobe-v3     # legt Reglerstufen und Tags als Hörproben ab
npm run szenarienblock    # zieht einen Dialogblock aus einem Entwurf
npm run neuigkeiten       # neue EU-Rechtsakte als Zulauf
npm run markenbilder      # Profilbild und Banner aus video/Marke.tsx
npm run rueckblick        # holt, was aus den Videos geworden ist
npm run ausreisser        # was hatte dieses eine? Zahlen neben Format und Thema
npm run aufschlaege       # jeder Aufschlag neben seiner Haltequote
npm run laengen           # Länge gegen Verweildauer, schweigt bei zu wenig
npm run lauf              # Wochenlauf, ohne Ton (Szenenlängen geschätzt)
npm run lauf -- --mit-ton # kostet ElevenLabs-Kontingent
```

`npm run pruefen` muss vor jedem Lauf grün sein. Es prüft Schema **und** die
harten Regeln aus `src/pruefung.ts` — vorher liefen die erst im Wochenlauf,
also *nachdem* die Vertonung bezahlt war.

Die Schemaprüfung (`skripte/schemapruefung.ts`) existiert wegen einer teuren
Erfahrung: `daten/beispiel-short.ts` ist die Standard-Prop der
Remotion-Komposition und wird in `calculateMetadata` **im Browser-Kontext**
geparst. Reißt er das Schema, bleibt Remotion in einem unerfüllten Promise
stehen — der Render hängt ohne Fehlermeldung. `tsc` sieht das nicht, weil
TypeScript Formen prüft und nicht Werte.

## Wo was steht

Diese Datei hält den **Vertrag**: was gilt und warum. Die **Abläufe** stehen in
`.claude/skills/`.

| Eigener Skill | wofür |
|---|---|
| `thema-finden` | Thema wählen, Ideenvorrat, Formatzuordnung, Materialgrenze |
| `beleg-holen` | Quelle abrufen, Zitat sichern, an die Szene binden |
| `bild-bauen` | Bühnenmaße, Figur, Kamera, Standbildpflicht |
| `woche-bauen` | prüfen, vertonen, rendern, freigeben, einplanen |
| `thema-briefen` | aus einer belegten Idee den Zettel machen, aus dem ein Dialog wird |
| `skript-schreiben` | den Dialog schreiben: Lage, Kaltstart, Bogen, Selbstprüfung |
| `humor-eichen` | aus Emirhans Zeilen und aus Vorbildern Humorregeln gewinnen |
| `rueckblick-lesen` | die Zahlen holen und die Schwellen kennen |

**Installiert:** die Inhaltskette (`brand-profile` → `voice-builder` →
`hook-writer` → `short-form-video-script` → die Plattform-Skills →
`viral-reverse-engineering`), die Bildkette (`character-rigging` →
`svg-character-animation` → `character-animation-qa`,
`remotion-best-practices`, `better-typography`, `ffmpeg`), die
Auffindbarkeitskette (`social-seo` → `instagram-seo` → `hashtag-strategy`) und
die Planungskette (`content-pillars` → `content-calendar`,
`analytics-and-reporting`, `competitor-analysis`).

Dazu **`joke-engineering`** seit dem 25.08.2026 — der einzige Skill, der das
Comedy-Handwerk lehrt. Er ist rein diagnostisch: Er benennt, *warum* eine Zeile
flach ist, und schreibt nichts. Sein Befund „H4 Over-Explained: punchline is
stated rather than implied" traf die ersten Entwürfe der Reaktionszeilen
wörtlich.

Einschränkungen, die man kennen muss: **`npm run rueckblick` liest
ausschließlich YouTube.** `analytics-and-reporting` sagt, *wie* man Zahlen
liest; es beschafft keine. Und `watch` behebt die Schwäche, die
`viral-reverse-engineering` selbst nennt — ein Agent kann ein Video hinter
einem Link nicht sehen.

**Zwei Subagenten lesen in eigenem Kontext, und beide schreiben nicht.** Der
`belegpruefer` meldet, wo ein Satz mehr behauptet, als sein Zitat trägt. Der
`dialogpruefer` meldet, wo ein Dialog von dem abweicht, was an Emirhans eigenen
Dialogen gemessen wurde — Figur, Sprache, Verständlichkeit.

**Der zweite ist am 04.09.2026 aus einer Zahl entstanden.** Die
Beschimpfungsregel stand an drei Orten, mit Quotentabelle, und fehlte trotzdem in
sieben von neun Dialogen dieses Tages. **Wer schreibt, übersieht die Regel, die
dem eigenen Satz im Weg steht** — deshalb hat der Belegapparat einen zweiten
Leser, und deshalb hat der Dialog jetzt auch einen.

`npm run dialogprobe` liefert ihm die Zahlen: Beschimpfungen je Short und je
korrigierendem Zug, Zeichen je Zeile getrennt nach Figur, Wattis Fragenanteil —
jeweils neben dem Wert aus den sechs Dialogen, deren Wortlaut von Emirhan
stammt. **Es ist keine Wache und meldet keine Fehler.** Eine Zahl neben einer
Vergleichszahl erzwingt nichts; ein Fehler, der eine Beschimpfung verlangt,
machte aus dem Witz eine Pflichtübung.

## Die Ausrichtung

**Tech-Unterhaltung, die nebenbei hilft.** Der Grund ist technisch: **Bei
Shorts sucht niemand.** Das Video läuft im Feed von selbst, der Zuschauer hat
in dem Moment kein Problem. Ein Hilfe-Video erreicht nur die Schnittmenge
derer, die gerade genau das haben — ein Staunfakt trifft jeden, der wischt.

**Was nicht mitwandert, ist der Belegapparat.** Quellenpflicht, wörtliches
Zitat, unbeteiligte Quelle: der einzige Unterschied zu den hundert anderen
Kanälen mit derselben Verpackung — und der Grund, warum wir uns die Frechheit
der Formate leisten können.

**Der Gegenstand ist Technik allgemein.** Zielgruppe 18–30, technikaffin — sie
kennt sich weit genug aus, um zu merken, dass etwas seltsam ist, und zu wenig,
um es zu erklären. Genau dort wird weitererzählt.

Die Haltung, die der Kanal verteidigt: **Nichts davon ist Zufall.** Alles an
deinen Geräten wurde entschieden, und wo entschieden wurde, gibt es ein
Dokument.

→ `daten/marke/brand-profile.md` (wer der Kanal ist) und `voice.md` (wie er
klingt). Beide werden vor jedem Entwurf gelesen.

## Datenvertrag

`src/typen.ts` ist der einzige Vertrag. Alles andere richtet sich danach.

### `format` — was der Short auslöst

**Vier Formate, kein Wochentag.** Veröffentlicht wird, was fertig und stark ist.

| Format | Reaktion | Kipppunkt |
|---|---|---|
| **Das gibt es wirklich** | Staunen, „das erzähl ich weiter" | die Sache selbst |
| **Das ist Absicht** | Empörung | wer es entschieden hat — oder wo es steht |
| **Es war einmal** | Korrektur | das „und heute" |
| **Wer hat recht?** | Widerspruch | das Dritte, das beide übersehen |
| **Empfehlung** | — | erst ab Affiliate-Links |

Sortiert wird nach **Reaktion**, nicht nach Gegenstand. Das ist der Grund,
warum es vier sind und nicht acht: Zwei Fächer, die dieselbe Reaktion
auslösen, sind ein Fach.

**Der Wochentag ist gestrichen.** Er war ein Versprechen an ein Publikum, das
es noch nicht gibt — bei 0 Abonnenten kostet er Neuheit und bringt nichts ein.
`zeitplanBauen` rechnet über die Listenposition; die Uhrzeit bleibt am Format.

**`MATRIX`** beantwortet die einzige Frage, die beim Entwerfen auftritt: in
welches Format gehört dieser Fakt? Vier Prüffragen der Reihe nach, die erste
Übereinstimmung gewinnt. `gibtswirklich` steht am Ende, weil es auffängt, was
keine der drei anderen erfüllt.

**Die eine Abgrenzung, die halten muss:** `eswareinmal` gegen `werhatrecht`.
Beide handeln von falschen Überzeugungen. Lautet die Auflösung schlicht „früher
stimmte es, heute nicht", ist es ein **Märchen**. `werhatrecht` braucht, dass
**beide** Seiten etwas übersehen.

Zwei Regeln für alle vier:

1. **Die Pointe trifft die Sache, nicht den Zuschauer** — mit einer Ausnahme,
   die seit dem 25.08.2026 die wichtigere ist: Sie darf **Watti** treffen. Er
   steht für den Zuschauer und sagt es selbst. Siehe „Zwei Stimmen".
2. **Kein Format verlangt eine Handlung.** „Steh auf und prüf das" ist Arbeit.
   Schätzen ist die feine Ausnahme: Es passiert unwillkürlich. **Sie gilt dem
   Zuschauer, nicht dem Bruder:** Voltis „Gib mal her." und „Schreib ihn an."
   sind Handlung im Stück und kosten den Zuschauer nichts.

### `sachgebiet` — die stille zweite Achse

`drucken`, `laden`, `bildschirm`, `rechner`, `handy`, `fahren`, `netz`,
`recht`, `raumfahrt`, `zeit`. Einzige Aufgabe: verhindern, dass eine Woche zur
**Druckerwoche** wird. Höchstens zweimal dasselbe Sachgebiet je Lauf.

Vier Formate garantieren vier verschiedene **Zugriffe**, aber nicht vier
verschiedene **Gegenstände**. Format und Sachgebiet bleiben unabhängig: „Es war
einmal" über Akkus und über Bildschirme sind zwei verschiedene Videos.

**Das `sachgebiet` taugt nicht als Tag.** `#drucken` gehört dem Textildruck,
`#laden` dem Einzelhandel, `#fahren` der Fahrschule. Es ist eine interne
Sortierachse, kein Suchwort.

### `bauform` — wie der Short gebaut ist

Seit dem 25.08.2026. Drei Einträge in `BAUFORMEN`, jeder mit einem eigenen
Zielwert für die Länge:

| Bauform | tut | Ziel |
|---|---|---|
| `wechselrede` | einer trägt den Beleg, der andere reagiert | 45 s |
| `zitatkarte` | das Zitat steht als Karte im Bild, beide reden darüber | 52 s |
| `stationen` | vier bis fünf Stationen, steigend, dann die Landung | 62 s |

**Warum es die Ebene gibt.** Am 25.08. wurde gemessen, was die Gattung
„faceless" als Standard fährt: KI-Stimme, ein Erzähler, wortweise animierte
Untertitel. Das war Wort für Wort unser Bau — wir waren nicht eigen, sondern
die **Voreinstellung**. Und dieselbe Gattung prüft YouTube seit Juli 2025 auf
Schablonenhaftigkeit, was Reichweite und Monetarisierung kostet.

**`einstimmig` ist am 31.08.2026 gestrichen.** Er stand mit einer guten
Begründung im Katalog: Was keinen Namen hat, kann keine Regel begrenzen — ihn
zu benennen setzte ihn unter dieselbe Drittelregel wie alles andere.

Das Fenster hat die Begründung überholt. Bei einer Untergrenze von 42 Sekunden
ist der einstimmige Bau kein kurzer Sonderfall mehr, sondern ein **Monolog von
dreiviertel Minute** — genau der Bau, gegen den der Umbau läuft. Die neun
Videos in diesem Bau haben 2.212 Aufrufe, 0-mal geteilt und 0 Abonnenten
gebracht, und sie waren dabei halb so lang. **Eine Begrenzung, die den
begrenzten Fall zugleich verschlimmert, ist keine Begrenzung mehr.**

Die alte Sorge bleibt richtig, und sie ist anders beantwortet: Er ist jetzt
nicht mehr benannt, sondern **unmöglich** — `zweistimmigkeit` verlangt zwei
Szenen mit beiden Stimmen, ohne Ausnahme.

**Und die Bauform darf nicht lügen.** `shortPruefen` prüft, ob die Mittel da
sind, die den Namen tragen — mindestens eine Zitatkartenszene, mindestens drei
Zuspitzungen für Stationen. Ohne diese Regel zählte die Drittelregel Etiketten
statt Unterschiede. Für die Wechselrede gibt es keine eigene Deckungsprüfung;
sie wird über `zweistimmigkeit`, `redelauf` und `stimmanteil` gehalten.

Format und Bauform sind unabhängig: Ein Märchen kann eine Wechselrede oder eine
Reihe von Stationen sein.

### `kaltstart` — was vor dem Vorhang steht

Seit dem 02.09.2026. Eine Figur, ein Symbol, ein Satz, höchstens 5,2 Sekunden —
dann fällt der Vorhang darüber und die Show fängt an.

**Die Zahl stand hier zweimal falsch.** Zuerst 3,5, geerbt vom Aufschlag; dann
4,0, als sie einmal angehoben wurde. Der Code steht seit dem 02.09.2026 auf
**5,2**, an zehn Kaltstarts gemessen, und `typen.ts` erzwingt die 68 Zeichen
dazu. Die 4,0 blieben hier stehen und wurden am 04.09.2026 gefunden — von einem
Skript, das die drei Orte nebeneinanderlegte. **Eine Zahl, die an drei Stellen
steht, ist an zweien veraltet.**

**Die 3,5 des Aufschlags galten hier zuerst und waren zu eng.** Sie gelten ihm,
weil er eine Szene unter sechs ist und kein Monolog werden darf; der Kaltstart
ist der ganze Hook und trägt ein Bild. Emirhans erste Zeile riss die alte Grenze
um eine Zehntelsekunde — **eine Grenze, die die erste echte Zeile ablehnt, ist
vor dem Material gesetzt worden.** Die 4,0 sind eine Entscheidung und keine
Messung; sie fallen, sobald drei Kaltstarts vertont sind.

**Der Anlass kam von Zuschauern:** Sie wollten vor dem Vorhang wissen, worum es
geht. Bis dahin standen rund neun Sekunden Show zwischen Bild 0 und dem ersten
inhaltlichen Satz.

Das ist die Umkehrung dessen, was die zugekauften Shorts-Skills verlangen — sie
sagen einhellig „no intro, value starts at second 0". **Bezahlt ist es aus dem
Vorspann selbst:** Showtitel und Namen sind am selben Tag gestrichen, gesprochen
wie geschrieben, und das sind je nach Show 3,69 bis 4,40 Sekunden. Der Kaltstart
kostet mit der Vorhangfahrt 3,9. Das Video ist danach so lang wie vorher, und
die Zielwerte der Bauformen bleiben unangetastet.

**Wer anfängt, entscheidet das Format** (`KALTSTART_SPRECHER`), nicht der
Entwurf. Watti tappt hinein, wo es etwas gibt, in das man hineintappen kann: bei
`eswareinmal` glaubt er das Märchen, bei `werhatrecht` hat er eine Seite, bei
`absicht` ist er der Geschädigte. Bei `gibtswirklich` hat niemand einen Fehler
gemacht — dort gehört der Anfang Volti. Das ergibt von selbst rund jedes vierte
Video mit Volti; **eine Regel, die Abwechslung erzwingt, ließe sich ansteuern.**

Sieben Aufbauarten in `KALTSTART_ARTEN`, sechs für Watti und eine für Volti:
`momentdanach`, `stolzerfehler`, `beschwerde`, `imvollzug`, `gewissheit`,
`hilferuf` — und `erstaunen`. Jede setzt eine **Lage**, nie ein Thema.

**Volti behauptet, Watti nie.** Voltis Erstaunen sagt etwas Wahres über die Welt
und trägt deshalb eine `belegId`; Wattis Zeilen dürfen keine tragen und
unterliegen der Formsperre. Dieselbe Trennung wie zwischen Beleg und Reaktion,
eine Ebene höher — und sie steht im Schema statt in einer Prüfung, damit sich
die Kombination gar nicht erst eintragen lässt.

**Der Anschluss ist Pflicht — und die Regel dazu ist am selben Tag gefallen.**
Sie verlangte zuerst, dass die erste Zeile nach dem Vorhang vom **anderen**
kommt. Emirhans erster selbstgeschriebener Dialog macht es anders und macht es
besser: Watti sagt davor „Oh man ich hätte mein Passwort wechseln müssen" und
danach „Volti, ich brauche deine Hilfe". **Der Vorhang ist ein Zeitsprung, kein
Schnitt mitten im Gedanken** — vor ihm steht Watti allein mit seinem Schaden,
hinter ihm geht er zu seinem Bruder.

Was die Regel wollte, war nie der Sprecherwechsel, sondern das Gespräch: Der
Kaltstart ist ein Selbstgespräch, und die erste Szene muss eines zu zweit daraus
machen. Sie heißt deshalb **„Anrede oder Antwort"** — entweder der andere
antwortet, oder derselbe redet ihn an. Dazu ein Hinweis, wenn kein Wort des
Kaltstarts in der ersten Szene wiederkehrt.

Dafür gibt es seit dem 02.09.2026 den Zug **`bitten`**, und er trägt
ausdrücklich **kein `verlangt`**: Der erste Anlauf hatte `antwort`, und die
Antwortpflicht meldete sofort, „Klar, was ist los?" sei keine Antwort. Genau so
antwortet man auf eine Bitte.

**Der Vorhang fährt wieder zu, und der alte Grund dagegen ist weg.** Am
31.08.2026 wurde das Zufahren entfernt, weil das Standbild bei Bild 0 eine leere
Bühne zeigte — hinter dem offenen Vorhang lag keine Szene. Jetzt steht dort der
Kaltstart. **Ein Vorhang, der über eine Szene fällt, hängt von der Decke; einer,
der über nichts fällt, hängt an nichts.**

**Die Themenzeile trägt seitdem einen Namen und behauptet nichts mehr.** Statt
„Passwort regelmäßig wechseln ist überholt" steht dort „Wattis Passwort und der
Kalender". Damit dreht sich die Wache um: Sie musste behaupten und trug dafür
`vorspannBelegId`; jetzt darf sie es nicht und nennt den Namen dessen, der den
Kaltstart gesprochen hat. **Die Belegpflicht ist nicht gestrichen, sondern
umgezogen** — auf `kaltstart.belegId`, den einzigen Satz vor dem Vorhang, der
noch behauptet. Der Anlass für die alte Regel bleibt richtig und ist mit ihr
erledigt: Wo nichts behauptet wird, kann nichts überzogen werden.

**Zwei Wachen mussten mitwachsen, und eine hat sofort gemeldet.** Die Posenregel
in `src/pruefung.ts` lief über `short.szenen` und sah den Kaltstart nicht — zwei
der vier Entwürfe standen im ersten Anlauf auf „staunen mit Symbol daneben",
also genau auf dem Fehler, gegen den sie gebaut ist. `npm run bildrand` hatte
dieselbe Lücke. **Eine Wache, die das neue Feld nicht kennt, ist für dieses Feld
keine** — derselbe Befund wie bei der Tonspur-Attrappe am 01.09.2026.

### Vorrat und Wache — das Muster hinter allem

Der Kanal hat es längst, benannt ist es seit dem 02.09.2026: **Jeder Platz im
Bogen bekommt einen Vorrat, und jeder Vorrat bekommt dieselbe Regel — nicht
zweimal hintereinander dasselbe.**

| Platz | Vorrat | Wache |
|---|---|---|
| Kaltstart | `KALTSTART_ARTEN` (7) | nicht zweimal hintereinander |
| Aufschlag | `HOOK_MACHARTEN` (5) | keine |
| Witz | `MACHARTEN` (16, je Figur) | keine zweimal je Short |
| Zug | `ZUGARTEN` (14) | Tripelregel über benachbarte Shorts |
| Wendung | `GESPRAECHSBOEGEN` je Format | Schluss-Züge festgelegt |
| Bauform | `BAUFORMEN` (3) | nicht zweimal, nicht über die Hälfte |
| Ausruf | `AUSRUFE` (7) | nicht zweimal hintereinander |
| Schlussformel | `SCHLUSSFORMELN` | nicht zweimal hintereinander |

**Die beiden letzten sind neu, und einem davon fehlte die Wache seit dem
25.08.2026.** `voice.md` schrieb vor, dass der Ausruf nie zum Markenwort werden
darf — aber kein Skript kannte den Vorrat, also konnte keins ihn zählen. Es war
die einzige Humorregel des Kanals ohne Wache, und beim ersten Lauf hat sie
gemeldet: „Und jetzt?" stand in zwei Shorts.

Die **Schlussformel** kam mit Emirhans erstem selbstgeschriebenem Dialog dazu —
„Du sollst weniger dumme Fragen stellen und öfter deinen Verstand nutzen.", mit
dem Zusatz, dass der Satz öfter vorkommen soll. Ein Vorrat und keine feste
Formel, aus demselben Grund wie beim Ausruf.

**Der Kipppunkt bekommt bewusst keinen.** `GESPRAECHSBOEGEN` sagt je Format,
was die Wendung ist; ein zweiter Vorrat daneben wäre die Doppelung.

**`ZUGRAUM` in `src/pruefung.ts` rechnet die Kombinatorik, statt sie
danebenzuschreiben.** Dort standen 72, 380 und 2.600 mögliche Zugketten — gültig
für zwölf Zugarten. Am 02.09.2026 kam `bitten` dazu und machte alle drei still
falsch, und die Herleitung von damals ist nirgends aufgeschrieben. **Eine Zahl,
die aus ihrer Quelle fällt, kann nicht veralten.**

### Der Bau: vier Positionen

| # | Position | tut was | verboten |
|---|---|---|---|
| 1 | **Aufschlag** | greift zu: beschuldigt, behauptet, fordert heraus | das Thema ankündigen |
| 2 | **Zuspitzung** | macht es schlimmer, teurer, absurder | die Auflösung vorwegnehmen |
| 3 | **Kipppunkt** | die Wendung, je Format eine andere | erklären, warum das so ist |
| 4 | **Nachschlag** | ein trockener Satz, dann Strich und Spruch | zusammenfassen |

**Die Position ist ein Feld im Schema, kein Kommentar.** Sieben Erklärvideos
sind entstanden, weil beim Schreiben nichts gefragt hat: Ist das die Zuspitzung
oder schon der Kipppunkt? Dieselbe Logik wie bei der Belegpflicht — eine Regel,
die sich nicht ausdrücken lässt, lässt sich nicht brechen.

Geprüft wird, dass jede Position vorkommt, dass Aufschlag und Nachschlag genau
einmal vorkommen und dass die Folge **nur vorwärts** läuft. Eine Zuspitzung
nach dem Kipppunkt ist kein Fehler, den man hört, sondern einer, den man spürt:
Das Video hat seine Pointe schon gehabt und redet weiter.

`werhatrecht` ist die Ausnahme beim Nachschlag: Er endet auf einer Restfrage,
sonst gibt es nichts zu kommentieren.

### Zwei Stimmen — `rede`, `Sprecher`, `Redeanteil`

Seit dem 25.08.2026 hat der Kanal zwei sprechende Figuren.

**Volti** liest nach und trägt die belegte Aussage. **Watti** reagiert; er macht
alles falsch und lernt nichts. **Wattis Ausruf ist „Watt?"** — norddeutsch für
„Was?", womit er bei jeder Verwirrung fast seinen eigenen Namen sagt.

**Die Rollen sind fest, die Besetzung nicht.** In jedem Wortwechsel trägt genau
einer den Beleg und der andere reagiert, aber wer von beiden das ist, darf
wechseln (`wer` an der Figurenbühne). Feste Rollen an festen Figuren wären nach
vier Videos wieder eine Schablone — aus Volti würde ein Moderator und aus Watti
ein Requisit.

**Der Grund für den ganzen Umbau steht in den Zahlen.** Neun Videos, 2.212
Aufrufe, 10 Likes, **0-mal geteilt, 0 neue Abonnenten** — bei einer Durchsicht
von 53 bis 82 %. Die Leute bleiben bis zum Ende, und es passiert nichts mit
ihnen. Man abonniert Leute, keine Fakten.

**Eine Reaktion behauptet nichts über die Welt und braucht deshalb keine
Quelle.** Genau dort darf der Kanal frech sein, während der Beleg sonst zwingt,
dicht am Zitat zu bleiben. Die Trennung liegt in der Rolle, nicht in einer
Prüfung: Wer einen Zug trägt, der **nichts behauptet**, darf keine Quelle
nennen — das Schema lehnt die Kombination ab.

**Bis zum 01.09.2026 hing dieselbe Sperre an `machart`, und das war eine
Lücke.** Eine quellenlose Zeile ohne Machart entkam ihr vollständig; drei
solche Zeilen standen in `ersatzteil-freischalten`. Der Zug ist Pflicht, die
Machart nicht — **eine Wache gehört an das Feld, das immer da ist.**

**Die Formsperre** fängt die eine Lücke, die bleibt: Eine Reaktion könnte
heimlich eine Tatsachenbehauptung sein. Verboten sind Jahreszahlen und Zahlen
mit technischer Einheit, höchstens zwei Sätze.

Zwei Fehler beim Bau dieser Sperre, beide von der eigenen Prüfung gefunden:
Der erste Anlauf verbot **jede Ziffer** und lehnte „Passwort7 ist meins" ab —
eine Ziffer ist keine Behauptung, eine **Messgröße** ist eine. Der zweite hatte
Jahre, Monate und Tage in der Einheitenliste und lehnte „Wie? Ich mache das
seit 10 Jahren" ab — eine Zeitspanne behauptet etwas über den Sprecher, nicht
über die Welt.

**`sprechtext` und `rede` stehen nebeneinander**, und die Doppelung ist
gewollt: `sprechtext` ist die Fassung, die zwanzig Lesestellen kennen, `rede`
sagt zusätzlich, wer welchen Teil spricht. Ein `superRefine` prüft hart auf
Gleichheit — dasselbe Vorbild wie bei `herausgeber`. **Eine Doppelung ohne
Wache ist der Fehler, nicht die Doppelung selbst.**

Das Mindestmaß an Zweistimmigkeit gilt je **Short**, nicht je Szene. „Immer
beide" wäre nach vier Videos wieder die Schablone, gegen die der Umbau läuft.

### Der Beleg

**Eingeblendet, nicht gespielt.** `herausgeber` hängt an der Szene mit der
tragenden Behauptung und läuft als dünne Zeile unter der Kopfzeile mit. Nicht
unten: Dort sitzt der Untertitel, darunter beginnt TikToks Bedienleiste. Oben
steht der Beleg bei Wortmarke und Formatpille — die richtige Nachbarschaft, er
ist ein Markenelement.

Genau **eine** Szene je Short trägt `herausgeber`, und sie muss an einer
`quelleId` hängen. `herausgeber` steht in der Szene **und** in `quellen.json`;
`shortPruefen` prüft hart auf Gleichheit.

**Die Szene hängt am Zitat, nicht an der Quelle — `belegId`.** Jede Szene mit
`quelleId` trägt auch die eine Fundstelle, die genau diesen Satz trägt. Bis zum
17.08.2026 nannte eine Szene nur die Quelle und erbte den Belegstatus von
allem, was in ihr stand — drei unbelegte Sätze sind so durchgegangen, alle
formal grün. Das Entscheidende ist der **Zeitpunkt**: Die Frage „welcher Satz
trägt das?" fällt beim Schreiben an, nicht in der Durchsicht.

**Die Zitatkarte** (seit 25.08.2026) ist die dritte Darstellung: Der Wortlaut
steht als Karte im Bild, mit blauem Zitatbalken und dem Herausgeber darunter,
und die beiden Figuren reden darüber. `quelleId` und `belegId` sind dort
Pflicht, nicht optional.

Zwei Bauregeln, beide aus Reparaturen gelernt:

- **Das „es war einmal" gehört in den Aufschlag und nur dorthin.** Er ist die
  einzige Position ohne Belegpflicht, und das ist kein Schlupfloch: Er setzt
  die Erzählung, er behauptet nichts.
- **Der Streitfall bei `werhatrecht` ebenso.** Was zwei Lager behaupten, ist
  keine Aussage über die Welt — aber die Zuspitzung darunter muss eine sein.

### Die Denkpause — `pauseSek`

Die Schätzfrage braucht Stille nach „Schätz mal", sonst ist die Frage
rhetorisch. Eine Szene bestellt sie über `pauseSek`.

**Der erste Anlauf lief über Auslassungspunkte und war falsch begründet.** Im
Schema stand, eine Sekundenangabe sei „eine Zahl, die niemand einhält". Das war
geraten. `npm run pausenprobe` hat es gemessen:

| Trenner | Pause |
|---|---|
| ` ... ` | 0,38 s |
| ` ... ... ... ` | 0,86 s |
| `<break time="2.5s" />` | **2,60 s** |

Dieselbe Geschichte wie bei `ZEICHEN_PRO_SEKUNDE`. **Wenn eine Größe messbar
ist, gehört sie gemessen und nicht begründet** — und die Begründung, warum sie
sich angeblich nicht messen lässt, ist das verdächtigste Bauteil überhaupt.

`woerterAusAusrichtung` filtert deshalb, was gesprochen aussieht, aber nicht
gesprochen wird: alles zwischen `<` und `>` (Break-Tags) **und** alles zwischen
`[` und `]` (die Regieanweisungen von `eleven_v3`). Ohne den zweiten Filter
stünde „[thoughtful]" groß über der Bühne.

### `suchbegriff` — gefunden wird über das Wort, nicht über die Tags

Hashtags kategorisieren und helfen der Suche. **Reichweite bringen sie nicht.**
Der Hebel ist das Suchwort — gesprochen, im Bild und in der Beschreibung.

Zwei Drittel davon erfüllt der Kanal ohnehin, weil der Sprechtext Wort für Wort
der Untertitel ist. Das dritte Drittel ist die Keyword-Zeile in
`beitragstext`, direkt hinter dem Titel, also in den ersten rund 80 indizierten
Zeichen. Damit sie nicht zum Erklärabsatz zurückwächst, meldet die Prüfung
alles ab 150 Zeichen.

`suchbegriff` ist Pflicht: ein bis drei Wörter, so wie sie getippt werden.
Geprüft wird **Wort für Wort**, nicht als Phrase.

**Und darunter steht seit dem 02.09.2026 der Quellenblock unter einer
Einladung:** „Für weitere Informationen rund um die Thematik:" statt
„Quellen:". Der Unterschied ist keine Kosmetik. Manche Themen haben im Short
keine Lösung, die in eine Zeile passt — der Produktpass, die Schaltsekunde, das
Reparaturrecht. **Die Handlung steht dann dort, wo der Zuschauer sie freiwillig
liest**, statt dass sie einer Figur in den Mund gelegt wird. Das ist der Grund,
warum kein Format eine Handlung verlangt und der Kanal trotzdem hilft.

`beitragstext` baut den Block aus den Kennungen der Szenen **und der
Redeanteile**. Seit dem Umbau auf zwei Stimmen hängt eine `quelleId` an der
einzelnen Zeile, und die Zitatkarte ist optional; wer nur Szenen einsammelt,
verliert genau die Quellen der Shorts ohne Karte. `raumstation-alte-rechner`
hatte deshalb einen leeren Quellenblock. **Die Quelle steht immer unter dem
Video, auch wenn sie im Video nie im Bild war.**

**Hashtags: drei bis fünf, je Plattform verschieden.** Instagram deckelt hart
bei fünf; TikTok will drei bis fünf. Auf diesen Plätzen stehen drei Rollen:
genau ein Markentag (`#ganzakkurat`), ein bis zwei aus `GEMEINSCHAFTSTAGS`,
zwei bis drei Themen-Tags.

**`GEMEINSCHAFTSTAGS` ist absichtlich leer.** Der Skill verlangt, die Tagseite
vor der Verwendung anzusehen — das kann kein Skript aus dem Gedächtnis. Solange
die Liste leer ist, schweigt die Regel; **eine Wache, die eine leere Liste
erzwingt, hielte jeden Short zurück.**

**Einen Formattag gibt es bewusst nicht.** Er sammelte eine Serie für ein
Publikum, das es noch nicht gibt, und kostete einen von fünf Plätzen.

Ein Fall, der beim Nachziehen auffiel und den die Regel selbst nicht meldet:
**Zwei Shorts sagen ihr eigenes Suchwort nie.** „Schaltsekunde" kommt in
`schaltsekunde-endet` nicht vor, „Flugmodus" nicht in `flugmodus-maerchen`.
Das lässt sich nur beim Schreiben lösen.

### `kennzeichnung`

`werbung` ist ein Dreiwert: `keine`, `beschreibung` (Partnerlinks nur im Text),
`video` (Label eingebrannt).

`kiStimme` ist Pflicht und geht als `isAiGenerated` an alle drei Dienste
(`src/buffer.ts`). Das ist die von YouTube seit Mai 2025 verlangte
Kennzeichnung; `shortPruefen` meldet einen Fehler bei `false`.

### Was es nicht mehr gibt

Gestrichen und nicht zurückzuholen — die Begründung steht dabei, weil sonst
jemand sie wieder einbaut:

| weg | warum |
|---|---|
| `warnung` mit `loesung` | eine Lösung anzubieten heißt, eine Handlung zu verlangen |
| `merkmalskarte` | Gerätezeichnung plus ja/nein-Merkmale: eine Kaufberatungskarte |
| `endkarte` | erzwang `punkte: min(2).max(4)` — eine Liste kann keine Pointe sein |
| `merksatz` | stellte bei jedem Entwurf die Frage „was ist hier das Prinzip?" und erzwang siebenmal ein Erklärvideo. Heißt jetzt `weitererzaehlt` |
| `symbol` | die stehende Zeichnung unter dem Satz; ersetzt durch `buehne` |
| `GeraeteArt` | neun Gerätezeichnungen, mit der Kaufberatung gegangen |
| `src/illustration.ts` | schlug Symbole aus dem Szenentext vor — der Erklärvideo-Reflex in Codeform |
| `stab` | der Zeigestab sah im Video aus wie eine Figur ohne Hände, die einen Stock hält |
| der **Zeiger in der Signatur** | die kleine Figur, die auf den Folgen- und Gefällt-mir-Knopf deutete. Gestrichen am 04.09.2026 auf Ansage: „Den brauchen wir nicht mehr." |

**Der Zeiger nimmt fünf Dinge mit**, und die Begründungen bleiben hier stehen,
damit sie niemand erneut versucht:

- Die Prop `dienst` und mit ihr die **drei Fassungen je Short**. Sie waren
  byte-identisch — der Zeiger war das einzige, was sie unterschied. Der
  Wochenlauf rendert seitdem eine Datei, `veroeffentlichen.ts` lädt sie für
  alle drei Kanäle hoch, und ein Lauf mit vier Shorts kostet ein Drittel der
  Zeit.
- Die Töne `gefaellt` und `folgen`. Von den Markentönen bleiben `auftakt`,
  `oeffnung`, `kipppunkt` — und seit demselben Tag `schliessung`.
- Die Ausnahme in `npm run bildrand`: In der Zeigerszene wurde nur die **linke**
  Kante geprüft, weil der Zeiger mit Absicht rechts herausragte. Jetzt prüft die
  Probe wieder beide Kanten in jeder Szene.
- `Plattformzeichen` in `Geraete.tsx` (tot seit dem 24.08.2026) und
  `video/Gestenprobe.tsx`.

**Drei Sackgassen und drei Messwerte**, falls jemand wieder auf einen Knopf
zeigen will: Der Nachleser konnte es nicht selbst — er steht schon auf der
Bühne, ein Übersteuern mittendrin wäre ein Sprung. Eine **körperlose Hand**
wurde im fertigen Video als Schlüssel erkannt. Ein **gezeichnetes
Plattformzeichen** deutet auf nichts: Ein Zeichen, das wir selbst malen, ist
nicht der Knopf der App. Dazu: Unter **siebzig Grad** sieht man keine Geste, der
Arm hängt in Ruhe schon schräg nach außen. Der **Unterarm darf nicht
mitdrehen** — beide Vorzeichen drehen zum Körper hin. Und für „unten Mitte" gibt
es **keinen Armwinkel**; das ging nur über die Position.

**Ein Satz überlebt, weil er jeder zeigenden Pose gilt:** Zwei gleiche Arme sind
keine Geste, sondern eine Haltung. Erst die Asymmetrie macht den linken zum
zeigenden.

Das alte Vokabular war **Erklärvideo-Vokabular**: Lösung, Merkmal, Bewertung,
Punkte zum Mitnehmen — jedes Feld setzt voraus, dass der Zuschauer etwas lernen
will.

Das `Lauf`-Schema wird von **keinem Skript geparst** — laufweite Regeln gehören
deshalb in `laufweiteBefunde` in `src/pruefung.ts`, nicht in ein `superRefine`
auf `Lauf`. Eine Regel dort ist tote Regel.

## Harte Regeln (`src/pruefung.ts`)

Fehler halten einen Short zurück, Hinweise erscheinen in der Freigabe-Übersicht.

- **`format`** — kein Format zweimal hintereinander (Fehler); ab vier Shorts
  ein Hinweis, wenn eines mehr als die Hälfte stellt. Die Regel hieß einmal
  „jedes Format genau einmal je Lauf" und stand hinter einer Zahlengleichheit —
  sie war deshalb genau dann still, wenn sie gebraucht wurde. **Eine Wache, die
  sich bei Abweichung selbst abschaltet, ist keine Wache.**
- **`bauform`** — keine zweimal hintereinander (Fehler), ab vier Shorts keine
  über die **Hälfte** je Lauf, und die Deckungsregel oben. Es war einmal ein
  Drittel ab sechs Shorts, und das war richtig, solange es vier Bauformen gab.
  Mit dreien kippt dieselbe Rechnung: Bei sechs Shorts erlaubt ein Drittel genau
  zwei je Bauform, also 2/2/2 und sonst nichts; bei sieben wäre die Regel
  **unerfüllbar**, und sieben ist die Obergrenze des Takts. Dieselbe Lehre wie
  bei der Formatregel, nur von der anderen Seite: Eine Wache, die bei sieben
  Shorts nicht mehr erfüllbar ist, ist keine Wache.
- **`zweistimmigkeit`** und **`reaktion`** — die beiden einzigen Regeln, die
  etwas **verlangen** statt etwas zu verbieten, seit dem 26.08.2026. Jeder
  Short braucht mindestens zwei Szenen mit beiden Stimmen — **ohne Ausnahme,
  seit `einstimmig` weg ist** — und mindestens eine Zeile mit `machart`; keine
  Machart kommt zweimal im selben Short vor. Geprüft wird nicht, ob es witzig
  ist — geprüft wird, ob der Platz benutzt wurde. Genau so arbeitet die
  Belegregel: Sie prüft nicht, ob das Zitat überzeugt, sondern ob eins da ist.
- **`antwortpflicht`**, **`abbiegen`**, **`anschluss`**, **`zugpaar`** — die
  Gesprächsebene, seit dem 01.09.2026. Jeder Redeanteil trägt einen **Zug** aus
  `ZUGARTEN`, und der beantwortet eine andere Frage als die Machart: Die
  Machart sagt, was die Zeile dem **Fakt** hinzufügt, der Zug, was sie dem
  **anderen** antut. Beides gilt gleichzeitig — „Ich bin bei Passwort7" ist ein
  tadelloses Geständnis *und* geht am Vorredner vorbei.

  Auf `widersprechen` muss ein Konter folgen, auf `nachhaken` eine Auskunft —
  vom anderen, höchstens zwei Zeilen später. `abbiegen` höchstens einmal je
  Short, anschlusslose Züge höchstens ein Drittel, kein Zugpaar über der Hälfte
  aller Wechsel.

  **Zwei dieser Zahlen sind am 02.09.2026 an zehn Dialogen gefallen.** Die
  Zugpaarregel hieß „kein Paar dreimal", gerechnet aus 72 möglichen
  Kombinationen — und behandelte damit alle Paare als gleich wahrscheinlich.
  „Nachhaken → Beantworten" ist die Grundbewegung jedes Gesprächs und steht in
  Emirhans Dialogen vier- bis fünfmal je Short. Acht Meldungen an zehn guten
  Dialogen, keine davon hatte recht.

  Und die Antwortpflicht gilt als eingelöst, wenn der andere **zurückfragt**
  („Wieso denn nicht?") oder wenn er **ausweicht**. Beides geht darauf ein;
  eine Antwort ist es nur noch nicht. `abbiegen` ist ohnehin auf einen je Short
  gedeckelt, und zwei Regeln auf demselben Zug bestrafen ihn doppelt.

  **Alle vier sind Obergrenzen, keine Mindestmaße.** Das Projekt hat dreimal
  erlebt, dass eine vorschreibende Regel selbst zur Schablone wird — ein
  Maximum lässt sich nicht ansteuern. Und die laufweite Regel sitzt auf dem
  **Zugtripel**: Zugpaare wiederholen sich rund dreißigmal je Woche, das ist
  Sprache; bei Tripeln liegt die Erwartung bei 1,1 je drei gesehenen Shorts,
  und das ist die Schwelle, ab der jemand den Takt bemerkt.

  Laufweit kommt **`zugtripel`** dazu: kein gleiches Zugtripel in zwei
  aufeinanderfolgenden Shorts (Hinweis). Sie hat beim ersten Lauf dreimal
  gemeldet und dreimal recht gehabt — drei von vier Entwürfen eröffneten mit
  „Behaupten → Nachhaken → Beantworten", und **gesehen hat das nicht mein Auge,
  sondern die Regel**, eine Stunde nachdem sie gebaut war.

  Der Anlass war ein Befund, der eine ältere Wache widerlegt: `rueckbezug` war
  am ersten vertonten Video **weit übererfüllt** (fünf von zehn Zeilen), und es
  war trotzdem kein Gespräch. **Ein Maß, das eine Zeichenkette zählt, kann eine
  Beziehung nicht sehen.** Er bleibt trotzdem — als Gegenprobe: Der Zug ist eine
  *erklärte* Beziehung, der Rückbezug misst die *tatsächlichen* Wörter.
- **`zugverlust`** — ein Hinweis, wo zwei Anteile derselben Figur in einer
  Szene **verschiedene Haltungen** tragen. `redelaeufe` klebt sie zu einem
  Syntheseaufruf zusammen, und ein Abschnitt trägt genau einen Zug: Der erste
  gewinnt, die Haltung des zweiten kommt im Bild nie an. Die Verschmelzung
  aufzubrechen wäre falsch — sie fügte eine Sprecherpause ein, wo kein Sprecher
  wechselt, und kostete einen Aufruf mehr. Gemeldet wird deshalb nur der Fall,
  in dem der Verlust etwas kostet.
- **`sachgebiet`** — höchstens zwei Shorts je Sachgebiet und Woche.
- **`suchbegriff`** — jedes Wort steht im Sprechtext und in allen drei
  Beschreibungen (Fehler). Das dritte Drittel — der Bildtext — ist am
  01.09.2026 mit dem Feld `text` entfallen; die beiden tragenden Drittel sind
  ohnehin der Sprechtext (er ist Wort für Wort der Untertitel) und die
  Beschreibung.
- **`beleg`** — mindestens **eine unbeteiligte** Quelle je Short. Die
  Drei-Quellen-Regel ist entfallen: Die Anzahl war die schwächere Hälfte — drei
  Herstellerseiten belegen nichts, eine Behördenseite belegt alles. Genau
  dieser Fall stand im WLAN-Short, der mit drei Quellen sauber durchging und
  auf TP-Link, TP-Link und Intel stand.
- **`belegId`** — die Fundstelle steht wirklich in der genannten Quelle
  (Fehler); ein Zitat trägt höchstens zwei Szenen (Hinweis).
- **Belegpflicht nach Position** — jede Szene auf `zuspitzung` und `kipppunkt`
  braucht eine Quelle, **sobald eine ihrer Zeilen einen behauptenden Zug
  trägt**. Vorher entschied die Wahl der Darstellung darüber, ob ein Satz
  belegt sein musste; seit dem 17.08.2026 nicht mehr, und seit dem 02.09.2026
  entscheidet auch die Position allein nicht mehr.

  **Die Belegpflicht wackelt dabei nicht, sie wandert** — dieselbe Bewegung wie
  am 17.08., als sie von der Quelle auf die Fundstelle ging. Der Anlass sind die
  Szenarien, in denen Watti erfolgreich kontert oder Volti ertappt wird: Ihr
  Kipppunkt besteht aus Sätzen über die beiden Brüder — die Fahrradlampe, der
  Fernseher, den Volti selbst ausgesucht hat. Es gibt keine Quelle dafür, und es
  soll keine geben. Dafür steht der Zug **`erinnern`** im Katalog: Er hält etwas
  aus ihrem gemeinsamen Leben dagegen und behauptet nichts über die Welt.

  Wo ein behauptender Zug steht, ist die Pflicht unverändert hart.
- **`aufbau`** — jede Position kommt vor, Aufschlag und Nachschlag genau
  einmal, die Folge läuft nur vorwärts. Geprüft im Schema.
- **`aufschlag`** — die erste Szene spricht höchstens **9 Sekunden**, an den
  gemessenen Wortzeitstempeln, sobald eine Tonspur vorliegt. Dazu eine Handvoll
  Ansagen, die das Schema hart ablehnt: „heute geht es um", „in diesem Video",
  „ich zeige dir".

  **Hier standen bis zum 02.09.2026 3,5 Sekunden**, weil 71 % der Zuschauer in
  den ersten Sekunden entscheiden. Der Satz stimmt und gilt nicht mehr dieser
  Szene: Seit dem Kaltstart fällt die Entscheidung **vor** dem Vorhang, und die
  3,5 Sekunden stehen dort als `KALTSTART_MAX_SEK` — heute 5,2, an zehn
  Kaltstarts gemessen. Die erste Szene beginnt rund neun Sekunden nach Bild
  null und ist ein Wortwechsel aus zwei bis drei Zeilen; alle zehn Dialoge von
  Emirhan lagen zwischen 6,2 und 8,8 Sekunden. **Eine Regel, die zehn von zehn
  guten Anfängen ablehnt, misst das Falsche.**
- **`sprache`** — Amtsdeutsch im Sprechtext ist ein Fehler, **außer** hinter
  einem Doppelpunkt. Siehe „Sprache und Humor".
- **`laenge`** — 40 bis 80 Sekunden hart. Laufweit ein Hinweis,
  wenn ab drei Shorts **alle in derselben Längenklasse** liegen: Bis Oktober
  läuft der Versuch, verschiedene Längen zu senden.
- **`produktname`** — im Video fällt nie ein Markenname (`ZUBEHOERMARKEN`), nur
  Merkmale. Gerätehersteller stehen bewusst nicht in der Liste — „dein MacBook"
  ist Kontext, keine Empfehlung.
- **`kennzeichnung`** — ein Partnerlink braucht „Werbung", „Anzeige" oder
  „Werbepartner" **in derselben Zeile** (LG Erfurt, 23.11.2020).
  „Affiliate-Link" und „gesponsert" hat der BGH als unscharf verworfen
  (06.02.2014, I ZR 2/11).
- **`produktionsregel`** — kein Sprechtext behauptet eigene Produkterfahrung,
  kein Titel sagt „Test". Zulässig: „Vergleich", „Kompatibilitätscheck".
- **`titel`** — der Titel darf **nichts nennen, was im Video nicht vorkommt**:
  die Belegpflicht, auf den Titel angewandt. Kein Ausrufezeichen, kein Emoji,
  keine Konfrontation gegen den Zuschauer.
- **Zeitangaben** — „seit heute", „gestern", „diese Woche", „seit N Tagen"
  werden hart abgelehnt. Siehe unten. **Geprüft wird an Wortgrenzen**, seit die
  Regel am 03.09.2026 „morgen" in Emirhans „damit es **morgens** wieder voll
  ist" gefunden hat. Eine Tageszeit altert nicht, und der Fehlalarm liegt auf
  der teuren Seite: Er hält einen richtigen Short zurück und lädt dazu ein, den
  Sprechtext gegen die Sprache zu verbiegen.

## Sprache und Humor

**Der Humor hängt an der zweiten Stimme.** Bis zum 25.08.2026 stand in
`voice.md` ein Dreizeiler — „trocken, und er steckt in der Tatsache selbst".
Das war keine Beschreibung, sondern eine Erlaubnis, nicht witzig zu sein.

**Die eine Regel, an der alles scheitert: Eine Reaktion, die den Fakt
zusammenfasst, ist keine Reaktion.** Sie muss etwas hinzufügen, das im Fakt
nicht steht. Ohne Vorgabe fällt jeder Entwurf auf den zusammenfassenden
Kommentar zurück — das ist der Normalfall, nicht die Ausnahme, und
`npm run pruefen` wird dabei grün.

**`MACHARTEN`** in `src/typen.ts` ist das Gegenmittel, nach dem Muster von
`HOOK_MACHARTEN`. Der Entwurf wählt eine je Zeile und darf sie im selben Short
nicht wiederholen.

**Seit dem 02.09.2026 hat die Liste ein Feld `wer`**, und das ist die
eigentliche Änderung: Vorher hieß sie `REAKTIONS_MACHARTEN`, hatte sechs
Einträge und beschrieb durchweg **Wattis** Handwerk — Voltis Witz hatte im
Schema gar keinen Platz, obwohl er in allen neun Dialogen von Emirhan
vorkommt. Heute sind es sechzehn: **Wattis zehn** (Geständnis, falscher
Schluss, Ratlosigkeit, banale Rückfrage, absurde Rechtfertigung,
Themenwechsel als Konter, Übercompliance, Umdeutung, falsche Autorität,
Übertreibung ins Katastrophale), **Voltis fünf** (entwertende Nebenbemerkung,
gedrehter Parallelbau, banale Auflösung, Geschenk mit Widerhaken, Empörung
gegen den Falschen) und **zwei geteilte** (das Bild, der Vergleich mit einem
Menschen).

**Das Fach entscheidet über mehr als die Zuordnung.** Wattis zehn behaupten
nichts und tragen deshalb keine Quelle; Voltis fünf sitzen gerade auf der
belegten Zeile. Die beiden Kopplungswachen hängen seitdem an `machartFach` und
nicht mehr an jeder Machart — vorher hätten sie Voltis Fach vollständig
verboten. Die Fachwache hat beim ersten Lauf zwei Fehlzuordnungen gefunden,
beide „Empörung" an Watti: „Zugelassen? Also Beziehungen." ist eine Umdeutung,
„Meine Mutter hat mir das beigebracht." eine falsche Autorität.

**Das Zitat bleibt Behördendeutsch, alles in eigenen Worten ist
Alltagssprache.** Vorher lief es umgekehrt: Das Zitat stand klein oben in der
Einblendung, gesprochen wurde die Behördenfassung mit anderer Wortstellung. Die
Ursache war der Bau, nicht der Vorsatz — wer gedeckt sein muss, bleibt dicht
am Zitat.

**Register: umgangssprachlich und derb, aber ohne Fluchen.** „Kacke" ist drin,
„Fuck" nicht — YouTubes Werberichtlinien stufen starke Sprache in den ersten
Sekunden am härtesten ab.

**Der Ausruf darf nie zum Markenwort werden.** Ein fester Marker ist in vier
Wochen eine Schablone. Es gibt einen Vorrat, aus dem gewählt wird, und dasselbe
Wort steht nicht zweimal im selben Lauf.

**Jeder gesprochene Satz hat ein Verb.** Die alte Vorgabe „zwei bis sechs
Wörter" hat den Telegrammstil erzwungen.

**Zahlen stehen als Ziffer, auch im Sprechtext.** „2009", nicht
„zweitausendneun". Der Sprechtext ist nicht nur Sprechtext, **er ist der
Untertitel, Wort für Wort.** Was sich schlecht liest, ist falsch geschrieben,
auch wenn es sich gut anhört.

→ `daten/marke/voice.md`, Kapitel „Humor": die sieben Regeln aus dem Eichmaß
vom 25.08.2026, samt Vorher-Nachher-Tabelle.

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

## Quellen

`daten/quellen.json`. Neue Quellen kommen erst hinein, **nachdem die URL
tatsächlich abgerufen und der Inhalt gelesen wurde** — nie aus dem Gedächtnis
und nie aus einem Suchtreffer-Ausschnitt. `geprueftAm` dokumentiert den Abruf.

Die Regel ist **nachprüfbar**: Jeder Beleg trägt ein `zitat`, wörtlich von der
Seite, und `npm run quellen-pruefen` holt die Seite und sucht die Zeichenkette
— stumpf, ohne Sprachmodell. `stuetzt` daneben ist die Folgerung in unseren
Worten und wird **nie** geprüft. Genau dort saß der teuerste Fehler dieses
Projekts; `npm run belege` ist die Durchsicht dagegen.

**Ein Zitat muss sein Subjekt enthalten.** Seit dem 30.08.2026, aus einem Fall,
der die Wache selbst betrifft: „keine zeitgemäße Schutzmaßnahme mehr" sagt
nicht, wovon die Rede ist — das steht außerhalb der geprüften Zeichenkette.
`quellen-pruefen` findet sie und kann nicht sehen, ob sie noch beim selben
Gegenstand steht. Eine Fundstelle, deren Bedeutung an Wörtern außerhalb des
Zitats hängt, wird **still** falsch, wenn die Seite umformuliert wird. Also
mitschneiden: „ein pauschaler Passwortwechsel jedoch keine zeitgemäße
Schutzmaßnahme mehr".

**Das Subjekt ist nicht immer ein Substantiv.** Am 01.09.2026 stand im
Ersatzteil-Short der Satz „Nicht, wenn du dein Handy vorher gekauft hast",
gebunden an „gilt nicht für Kaufverträge, die vor dem 31. Juli 2026 geschlossen
wurden". Der volle Satz beginnt mit **„Artikel 16 dieser Richtlinie"**, und
Artikel 16 ändert die Warenkaufrichtlinie — das Softwareverbot steht in Artikel
5 Absatz 6 und kennt die Übergangsregel nicht. **Der Short behauptete nicht zu
viel, sondern das Gegenteil**, und `quellen-pruefen` war dabei grün.

Gefunden hat es der `belegpruefer`. Von elf Befunden desselben Durchgangs
hingen **neun an einem Wort außerhalb der geprüften Zeichenkette** — davor
(„All equipment flown aboard the ISS", „Ideal ist es zudem"), dahinter („es sei
denn, dies ist durch legitime und objektive Faktoren … gerechtfertigt") oder
eben in einer Artikelnummer.

**Die Regel zielt auf Fragmente, deren Bedeutung außerhalb der Zeichenkette
hängt — nicht auf jedes Fragment.** „Ersatzteilen, die mittels 3D-Druck
hergestellt wurden" trägt kein Subjekt und kein Verb, und es genügt trotzdem:
Der Satz darüber behauptet nur die Erwähnung („stehen in der Liste").
Gefährlich wird es, wo die **Verneinung** außerhalb steht. Bei der
EU-Reparaturrichtlinie sagt das gekürzte Fragment für sich gelesen das
Gegenteil, weil das „nicht" am Satzende steht.

**Deshalb ist die Zitatlänge am 31.08.2026 von 180 auf 240 Zeichen gestiegen.**
Subjekt und Verneinung stehen dort an den beiden Enden eines Satzes mit einer
Aufzählung dazwischen — auf 180 gekürzt fällt die Verneinung weg. Die 180 waren
nie eine gemessene Bruchgrenze, sondern Vorsicht nach einem Fall, der an
**Sonderzeichen** scheiterte; das 231-Zeichen-Zitat wurde im Volltext als
Zeichenkette gefunden. **Von zwei Regeln, die sich widersprechen, gewinnt die
mit dem besseren Grund** — ein zu langes Zitat fällt sofort auf, ein zu kurzes
wird still falsch. Kurz halten bleibt trotzdem die Empfehlung.

**EUR-Lex braucht einen Umweg, und der hängt an der Schreibweise.** Seit dem
17.08.2026 beantwortet die Seite jeden automatischen Abruf mit HTTP 202 und
leerem Rumpf (`x-amzn-waf-action: challenge`). `quellen-pruefen` leitet deshalb
über **Cellar** um, das Dokumentenarchiv dahinter. EUR-Lex adressiert denselben
Rechtsakt aber auf zwei Arten — über die CELEX-Nummer und über die
Amtsblatt-Kennung —, und bis zum 31.08.2026 erkannte die Umleitung nur die
erste. Sieben EU-Quellen gingen durch, die achte nicht. **Eine Wache, die an
einer Schreibweise hängt, prüft die Schreibweise und nicht die Sache.**

**Die Positionsbefreiung gilt Pointen, nicht Behauptungen.** Der Nachschlag
muss nichts belegen, und deshalb stand „Nicht der Kalender entscheidet" lange
ohne Deckung da, während das gebundene Zitat nur „erhöht die Sicherheit nicht
automatisch" sagte. Der Schritt von „nicht automatisch" zu „nicht" war zwei
Absätze entfernt zu haben. Wenn ein befreiter Satz etwas behauptet, gehört er
belegt — die Befreiung ist kein Grund, es zu lassen.

| Rang | Arten | Rolle |
|---|---|---|
| **unbeteiligt** | `standard`, `behoerde`, `rechtsprechung`, `wissenschaft` | dürfen eine Aussage allein tragen |
| **beteiligt** | `hersteller`, `plattform` | autoritativ fürs eigene Datenblatt, interessiert am Rest |

**`presse` ist nicht eintragbar**, nicht bloß heruntergestuft — sie fehlt im
Enum. Erlaubt bleibt sie als Wegweiser: lesen, zur Primärquelle folgen, die
Primärquelle zitieren. Dass das nicht an Vorsatz hängt, sondern am Enum, ist
die Absicherung. **`messung` ist raus**, weil die `produktionsregel` Aussagen
aus eigener Produkterfahrung verbietet.

## Bild

**Keine Fotos, keine KI-Bilder, kein Stock-Material, keine Herstellerfootage.**
Ein Bildmodell erfindet Buchsen — derselbe Fehler, den die Belegpflicht
verhindern soll, nur ungeprüft. Herstellerfootage behauptet Technisches, ohne
dass eine `quelleId` daran hängt. Folge: Es wird nie etwas selbst benutzt, also
bleibt `produktionsregel` dauerhaft und **„Test" ist endgültig ausgeschlossen**.

**Jede Szene, die eine Zeichnung tragen kann, trägt eine.** Die Kehrtwende kam
vom Zuschauer, nicht aus der Systematik: Reine Typografie hält den Inhalt, aber
sie lässt die Fläche leer, und im Feed fällt das auf.

**Gezeichnet wird, was der Satz nennt. Nicht gezeichnet wird, was ein Datenblatt
behaupten würde** — Buchsenformen, Pinbelegungen, Leistungsangaben.

**Eine Probe ohne Tonspur prüft ein anderes Bild.** `Sprecherstand` hält einen
Short ohne `abschnitte` für einstimmig, und dann reserviert die Bühne unten
270 Pixel für den Untertitel — die im zweistimmigen Video niemand braucht, weil
dort die Sprechblase steht. `npm run bildrand` hat so 75 Standbilder mit zu
kleinen Figuren gemessen und für gut befunden. **Eine Probe, die kleinere
Figuren misst, kann nicht sehen, dass die großen herausragen**; sie ist genau
dort still, wo sie gebraucht wird. Sie legt seit dem 01.09.2026 eine
Tonspur-Attrappe in die Props — und liest ihre Bildnummern aus **demselben**
angereicherten Short, weil `szenenZeitplan` mit Tonspur anders rechnet als ohne.

**Eine Zeichnung ist erst geprüft, wenn sie gerendert danebensteht.** Diese
Regel hat sich zehnmal bewährt, und jedes Mal sah der Code vorher richtig aus.
Zusätzlich gehört das **letzte** Bild gezogen — dort fiel die leere Bühne am
Videoende auf, die sonst niemand sieht.

### Die Figuren

**Volti** ist die schlanke Zelle, **Watti** eine Knopfzelle — `ZEIGER_STAUCHUNG`
in `daten/figur/zeiger.ts`, `scale(1.2 0.74)` um die Standlinie. Gestaucht statt
umgebaut, weil ein breiteres Gehäuse die Arme aus dem Rumpf wachsen ließe: Die
Armgelenke sitzen fest bei x = 68 und 132.

Der Unterschied musste sein: Im ersten Standbild zu zweit waren sie nicht
auseinanderzuhalten — gleicher Körper, gleiches Gesicht, dazwischen ein
Farbfleck, der im Feed briefmarkengroß ist. Verworfen wurden vorher eine eigene
Körperfarbe (macht aus der Rolle eine fremde Figur), Füllstände, Größe und
Geschlechtszeichen wie Wimpern.

`daten/figur/zeiger.ts` **leitet ab statt abzuschreiben**: Teile, Gelenke und
Griffe kommen unverändert vom `nachleser`, getauscht wird nur die Farbe. Ein
zweites Rig von Hand wäre beim ersten Umbau am Körper auseinandergelaufen, und
zwar lautlos — die Prüfung sieht zwei gültige Rigs, nicht zwei verschiedene.

**Im Wortwechsel stehen sie 116 Einheiten auseinander** (`WORTWECHSEL` in
`Buehnenbild.tsx`), die rechte gespiegelt. Der Abstand ist in drei Schritten
erarbeitet: 76 — Körper überlappten. 100 — Rumpf frei, aber Voltis Hand lag auf
Wattis Brust. Gerechnet wird nicht mit der **breitesten** Pose, sondern mit der
**weitesten**: `erklaeren` und `zeigen` strecken einen Arm über die eigene
Mitte hinaus.

**Im Wortwechsel fallen ein Symbol und drei Posen weg.** Ein **Symbol** daneben
steht auf x = 152 und läge damit in der zweiten Figur; nur `blatt` bleibt, weil
es in der Hand der linken Figur mitfährt. Und **`zeigen`, `erklaeren` und
`achselzucken`** legen eine Hand auf das andere Gehäuse; die übrigen sieben
Posen sind frei.

**Was die Liste nicht fängt, ist das eigene Gesicht.** `nachdenken` legte die
Hand bis zum 01.09.2026 quer über den **Mund** — im Wortwechsel-Standbild sah
die Figur aus, als hielte sie sich den Mund zu, und der Mund ist die Stelle,
die lippensynchron animiert wird. „Hand an der Wange" heißt bei einem Gehäuse
ohne Kopf: an der **Kante**, nicht in der Mitte. Der Unterarm steht seitdem auf
38 statt 60.

**Diese Liste ist gemessen, nicht geschätzt** — `video/Wortwechselprobe.tsx`
stellt alle zehn Posen einzeln neben eine ruhende Figur, in der Anordnung des
Videos. Davor standen nacheinander zwei engere Regeln da, je aus einem
Standbild geschlossen, und beide waren zu eng. **Eine Messung ist billiger als
drei Regeln, die nacheinander zu eng waren.**

Mehr Abstand löst es nicht. Die 116 sind an zwei gleich breiten Rigs gemessen,
Wattis Stauchung macht ihn ein Fünftel breiter — und bei 158 plus halber Breite
steht er schon am Bühnenrand.

Der Satz „Gespiegelt wird nicht" in `platzVon` gilt weiter für Figur plus
Symbol — ein Symbol läge sonst hinter dem Rücken. Bei zwei Figuren gilt er
nicht.

### Die Haltung

Seit dem 01.09.2026 steht die Figur nicht immer gleich da: Wer widerspricht
oder richtigstellt, **richtet sich auf**; wer einlenkt oder nachhakt, sinkt
ein. Der Wert steht als `aufrichtung` in `ZUGARTEN` — 1, −0,5 oder −1 an genau
vier der zwölf Züge.

**Bewusst nur an vieren.** Wer jedem Zug eine Haltung gibt, bekommt keine
Körpersprache, sondern eine zappelnde Figur. Dieselbe Überlegung wie beim
Ausruf, der einen Vorrat hat und keinen festen Marker.

**Der Weg läuft über die Tonspur und nicht über die Pose.** `abschnitte[].zug`
ist seit demselben Tag Pflichtfeld, `Sprecherstand` blendet den Wert über
dieselben 0,25 Sekunden über wie die Sprechstärke. Ein Posenfeld wäre tot
gewesen: Der Zug wechselt je Redeanteil, die Pose nur einmal je Szene — sie
hätte den Wert nie zu sehen bekommen.

**Getragen wird die Haltung von der Streckung des Körpers**, volumenerhaltend
um den Pivot bei y = 138, also praktisch auf der Standlinie. Die Füße bleiben
stehen.

**Die Zahlen sind gemessen, und die Vorabrechnung lag um die Hälfte daneben.**
Geplant waren 7,5 Pixel von 1920, gemessen sind es **16**: Die Rechnung ging
von der Gehäusehöhe 84 aus, während die Streckung auf den Abstand vom Pivot bis
zur Oberkante wirkt, und das sind rund 108.

| | Ausschlag | in Pixeln |
|---|---|---|
| Atem-Squash | ±1 % | 2,2 |
| Atem-Hub | ±0,7 Einheiten | 1,8 |
| Sprechwippen | ±0,6 Einheiten | 1,6 |
| **Aufrichtung** | **3,45 %** | **16** |

**Die Beine sind verworfen, obwohl sie mehr bewegten.** Gegenläufig gestellt
ändern sie die Standbreite von 189 auf 215 Pixel — mehr als die Streckung. Am
Bild in Feed-Größe hat die Streckung trotzdem gewonnen: Der breite Stand las
sich als andere Figur, nicht als andere Haltung. Ein Vorzeichenfehler auf dem
Weg dorthin ist derselbe wie bei den Armen von `ansprechen`: Die Ketten sind
gespiegelt gezeichnet, und der erste Anlauf stellte die Beine zusammen statt
breit.

**Zwei Zusammenführungsfehler mussten vorher weg**, beide in
`figurenbewegung`. Der Atem wurde über die Posenstauchung *gespreadet* statt
mit ihr multipliziert, die Gewichtsverlagerung über die Beindrehung gelegt
statt zu ihr addiert. Beide waren folgenlos, solange keine Pose diese Felder
setzt — und genau deshalb billig zu beheben, bevor es eine tat.

**Die Probe hatte ihren eigenen Fehler**, und er ist lehrreich: Der erste
Anlauf gab beiden Figuren denselben Zug. Beide richteten sich auf, die Messung
zeigte 2 Pixel Unterschied — **eine Probe, die ihr Messobjekt auf beide Seiten
legt, misst die Differenz von nichts.**

Und weil `AUSSENREICHWEITE` nur **Breite** rechnet, prüft
`skripte/schemapruefung.ts` jetzt zusätzlich die Höhe: Bei einer Figurengröße
über rund 1,13 ragte die gestreckte Figur oben aus der Bühne. Heute ist reichlich
Luft — die Wache steht für den nächsten, der `WORTWECHSEL_SCHLUSS` heraufsetzt,
so wie es am 01.09. schon einmal geschah.

### Die vierte Wand

Seit dem 01.09.2026 gibt es die Pose **`ansprechen`**: Die Figur lässt die
andere stehen und redet mit dem Zuschauer. Ihr Ort ist der Nachschlag.

**Die Pose allein löst es nicht, und das war der eigentliche Fund.**
`blick: [0, 0]` ist bereits der Blick nach vorn — eine Pose müsste dafür gar
nichts setzen. Das Problem sitzt im Renderer: `BLICK_ZUR_MITTE` und
`HINLEHNEN` werden mit der **Sprechstärke** aufaddiert, und wer spricht, hat
Stärke 1. Volti schaute und lehnte also zu Watti, während er den Zuschauer
ansprach.

Deshalb trägt jede Pose einen Faktor **`zuwendung`** (0…1, Vorgabe 1), der
**beide** Größen skaliert. Ein Wert für beides, aus demselben Grund, der schon
am Lichtkegel steht: drei Dinge, ein Wert, sonst laufen sie beim nächsten Umbau
auseinander. Er wird wie jede Posenzahl gemischt — die Figur dreht sich weg,
sie springt nicht.

**Die Armvorzeichen sind seitenabhängig**, und das hat erst das Standbild
gezeigt: Mit −10/−28 auf beiden Seiten klappte nur der linke Arm an den Bauch,
der rechte stand nach außen-unten weg. Die Armketten sind gespiegelt
gezeichnet.

**`Zuwendungsprobe` braucht einen `Sprecherstand` und das Bild 20.**
`Wortwechselprobe` rendert `Buehnenbild` ohne ihn, die Sprechstärke ist dort
also 0 — sie zeigt ausgerechnet die beiden Größen nicht, gegen die die Pose
antritt. Und der Wechsel läuft über 0,25 Sekunden, also acht Bilder; bei Bild 0
zeigte die Probe dasselbe wie ihre eigene Gegenprobe. **Die Gegenprobe gehört
dazu**: Ohne eine Kachel mit `ruhe`, in der Blick und Neigung da sein *müssen*,
beweist die Probe nur, dass die Zuwendung noch anliegt — nicht, dass die Pose
sie ausnimmt.

**Im Schluss stehen die Figuren größer** — `WORTWECHSEL_SCHLUSS` mit 0,92
statt 0,73. Die 0,73 sind an `staunen` gemessen (63,9 Einheiten) und an
`erklaeren` gegen `zeigen`, die von beiden Seiten in die Lücke greifen; im
Schluss steht keine Pose weiter als 52, die Grenze liegt dort gar nicht an.

**Mehr Höhe hätte nichts gebracht.** Das Bühnen-SVG ist 200 zu 150 Einheiten,
der Kasten im Schluss ist höher als breit — es deckelt die **Breite**, und die
zusätzliche Höhe bleibt ungenutzt. Das ist der Grund, warum die Figuren
ausgerechnet in der höchsten Bühne des Shorts am kleinsten standen.

### Die Sprechblase

Bei zwei Stimmen ersetzt `video/bausteine/Sprechblase.tsx` den Untertitel. Sie
kann, was er nicht konnte: **zeigen, wer spricht** — Namensschild in der Farbe
der Figur, Text auf ihrer Seite.

**Das Karaoke-Prinzip zieht mit um, statt ersetzt zu werden.** `gruppiere` kommt
unverändert aus `Untertitel.tsx`; das aktive Wort steht weiter auf farbigem
Grund, nur in der Farbe seines Sprechers. Der Untertitel war von den ersten
Zuschauern ausdrücklich gelobt worden — ihn ersatzlos zu streichen hieße, eine
der wenigen belegten Stärken wegzuwerfen.

**Keine Blase mit Zipfel.** Ein Zipfel müsste auf den Mund zeigen, und der sitzt
im SVG-Raum der Bühne, während der Text HTML ist. An dieser Kopplung ist die
Symbolposition dreimal gescheitert. Seite und Farbe beantworten dieselbe Frage
ohne eine umgerechnete Koordinate.

### Der Vorhang

Seit dem 31.08.2026 beginnt jeder Short als **Show**: Der Vorhang ist von Bild
null an geschlossen, auf ihm stehen Showtitel und Themenzeile, die beiden
Figuren nennen ihre Namen, dann öffnet er sich auf den Aufschlag.

**Er stand einen Abend lang nach dem Aufschlag**, als Cold Open, und die
Begründung war gut: Der Aufschlag hat 3,5 Sekunden, weil 71 % dort entscheiden
— ein Vorspann davor verbraucht sie. Und ein Short läuft von selbst wieder an;
ein Vorhang am Anfang sitzt in der Schleife unmittelbar hinter dem Schluss, also
genau dort, wo am 18.08.2026 schon einmal einer abgehängt wurde.

**Am fertigen Video hat das nicht getragen** („der Anfang ist echt unnötig").
Das Argument ist nicht falsch geworden, es ist gegen den Eindruck angetreten und
hat verloren — **ein Argument aus einer Zahl schlägt keinen Eindruck vom
gerenderten Video.** Die Zahl steht trotzdem hier, damit beim nächsten Umbau
niemand dieselbe Runde noch einmal dreht.

Der Umbau hat die Vertonung nebenbei vereinfacht: Der Vorspann war ein Einschub
zwischen Szene 0 und 1, und die kniffligste Stelle der ganzen Vertonung war ein
Uhrsprung mitten in der Schleife, der genau einmal und genau dort greifen
musste. Jetzt startet die Uhr bei der Vorspanndauer. **Ein Wert, der einmal am
Anfang gesetzt wird, kann nicht an der falschen Stelle einsteigen.**

Er **fuhr eine Zeit lang nicht mehr zu**: Am Anfang gab es nichts zuzudecken,
und das Standbild bei Bild 0 zeigte eine **leere Bühne**, weil die erste Szene
erst nach dem Vorspann beginnt. Seit dem 02.09.2026 fährt er wieder zu — jetzt
liegt der Kaltstart davor, also fällt er über eine Szene. Siehe `kaltstart`.

### Der Ton des Vorspanns

Vier Klänge, und drei davon kosten nichts — die Themenansage kommt aus der
Vertonung, der Rest ist berechnet.

| | was | woher |
|---|---|---|
| **Auftakt** | D-Dur-Dreiklang aufsteigend, auf der Vorhangzufahrt | `skripte/toene.ts`, berechnet |
| **Themenansage** | „Heutiges Thema: …" | aus der Vertonung, je Short |
| **Öffnung** | Hauch plus Grundton D4, aufsteigend | berechnet |
| **Schließung** | derselbe Klang abwärts, kürzer und weicher | berechnet |

**Der Schließton kam am 04.09.2026 dazu**, auf Emirhans Bitte: „Eben derselbe
wie wenn der Vorhang aufgeht, nur etwas abgerundeter fürs Zugehen." Zwei
Änderungen tragen das, und beide standen schon im Kommentar der Öffnung: Der
Hauch läuft **abwärts** (1700 → 700 Hz), weil beim Schließen der Stoff auf einen
zukommt, und der Grundton hat einen längeren Anstieg bei kleinerem Abfall.

**Die Länge ist hier die harte Grenze**, anders als beim Öffnen. Die Öffnung
darf 0,96 Sekunden klingen, weil sie in eine leere erste Szene hineinläuft;
hinter der Schlussfahrt steht sofort Voltis „Wir haben nachgelesen." Deshalb
0,62 Sekunden und ein **gemessener** Ziel-RMS von 0,019 — ein Viertel der
Sprache. Ein fester Pegelfaktor wäre dasselbe Versehen wie beim Kipppunktton, wo
dieselbe Fassung je nach Phasenlage zwischen 0,072 und 0,144 lag.

**Showtitel und Einwurf sind am 02.09.2026 gestrichen** — zehn feste Aufnahmen,
die niemand mehr abruft. Auf der Karte steht seitdem fest „Die Volti & Watti
Show" mit den beiden Namen in ihren Kennfarben, gesprochen wird sie nicht mehr.
Der Grund ist Zeit: Sie kosteten je nach Show 3,69 bis 4,40 Sekunden, und genau
daraus ist der Kaltstart bezahlt. Die Formatpille in der Kopfzeile bleibt.

**Zweimal dasselbe zu sagen war dabei der eigentliche Anlass.** Die Namen
standen in der Zeile *und* wurden gesprochen, während der Zuschauer noch gar
nicht wusste, worum es geht.

`daten/vorspannton.json` hält nur noch die zwei Abspannaufnahmen samt ihren
gemessenen Dauern — **Remotion kann die Länge einer Tondatei nicht synchron
lesen**, und Wattis „Wirklich." hängt daran.

**Die Themenansage ist der einzige Vorspannton je Short.** Sie steht deshalb in
der Tonspur und **nicht** in `abschnitte`: Die Aufschlagmessung filtert `woerter`
gegen `szenenStartSek[1]`, und Vorspannwörter dort verlängerten den gemessenen
Aufschlag über die 3,5 Sekunden.

**Ton und Bild kommen aus einer Zahl.** `ansageAbBild` steuert den Toneinsatz
und die Einblendung der Zeile. Vorher hing die Einblendung an einem Anteil der
Vorspanndauer — die Stimme kam 1,2 Sekunden vor dem Bild. Ein Anteil beschreibt
eine Position im Ganzen; der Ansagebeginn hängt an der Länge der beiden Sätze
davor.

**Synthese baut Klänge gut und Texturen schlecht.** Der Vorhang sollte ein
Stoffgeräusch bekommen, und drei Anläufe sind gescheitert: ein breites
Rauschband (67 % der Energie über 2 kHz — ein Fön), ein Applaus, der nach
Knistern klang (5 % im Klatschkörper statt 30), ein schmales Swisch (sanfter,
allein aber fremd). Der Ausweg war nicht, das Rauschen wegzulassen, sondern es
**auf seine Aufgabe zu beschränken**: Es zeigt eine Richtung an, den Rest trägt
ein Ton, der ohnehin zur Marke gehört.

**Alle berechneten Klänge stehen auf D und A.** Das war nicht der Ausgangspunkt —
`folgen` stand schon darauf, die Terz dazwischen war die einzige Note, die
fehlte.

**„Sanft" ist messbar.** Die Sprache im Vorspann liegt bei RMS 0,08; die
Öffnung bei 0,019. Der erste Swisch-Anlauf lag bei 0,55, also fünfmal über der
Sprache — der Ausgleich für die Filterdurchgänge war zu hoch gegriffen.

**Und die beiden Maße stehen seit dem 01.09.2026 als `messen` fest im Code.**
RMS und der Anteil über 2 kHz sind nicht gewählt, sondern übrig geblieben:
Jedes hat beim Vorhang einmal vorher gesagt, was das Ohr nachher hörte. Eine
Zahl, die man einmal von Hand rechnet, rechnet beim nächsten Anlauf niemand
mehr.

### Der Ton am Kipppunkt

Seit dem 01.09.2026 gibt es einen Klang mitten im Short: `kipppunkt`, A2, 0,9 Sekunden,
langsam anschwellend und wieder weg.

**Er sollte ein Publikum sein und ist keins.** Der Kanal ist eine Show, und
eine Show hat ein Publikum, das an der Wendung raunt. Sechs Fassungen standen
zur Wahl, drei davon ein Raunen aus 8 bis 14 synthetischen Stimmen — additiv
aus Harmonischen mit zwei Formantgipfeln gebaut, weil ein Raunen keine Textur
ist, sondern viele Stimmen. Gewonnen hat die vierte, die gar keins ist.

**Damit gilt der Satz vom Vorhangstoff ein zweites Mal, und zwar schärfer:**
Der Ausweg ist nicht, die Textur besser zu bauen, sondern den Klang auf seine
Aufgabe zu beschränken. Die Aufgabe heißt nicht „ein Publikum", sondern „der
Kipppunkt ist da".

Die Gegenprobe aus gefiltertem Rauschen stand daneben und hat es bestätigt:
45 % ihrer Energie über 2 kHz, derselbe Bereich, in dem das breite Rauschband
mit 67 % als Fön aufflog. Die Stimmenfassung lag bei 6 %.

**Ein Fehler, den erst die Messung fand:** Der Pegel war zuerst ein fester
Faktor, und damit lag dieselbe Fassung zwischen RMS 0,072 und 0,144 — je
nachdem, wie die Phasen der Stimmen zufällig zusammenfielen. Bei einer Sprache
von 0,08 war der Begleitton also lauter als das, was er begleitet. Seitdem ist
der Pegel ein **gemessener Ziel-RMS**, und erst dadurch waren die sechs
Fassungen überhaupt vergleichbar: Sonst wäre es eine Lautstärkewahl gewesen und
keine Klangwahl.

**Er hängt an einem Redeanteil, nicht an einer Szene.** Alle vier Entwürfe
haben zwei Kipppunkt-Szenen; der Ton läuft in der ersten und nur dort. Und
nicht an ihrem Anfang: In `passwort-wechseln` steht dort zuerst Wattis Irrtum,
und erst Voltis Richtigstellung ist das, was kippt. Getroffen wird deshalb der
**erste Abschnitt mit behauptendem Zug** — dreimal ist das der Szenenanfang,
einmal die Zeile danach.

Das ist der zweite Leser für `abschnitte[].zug`. Ohne Tonspur entfällt der Ton:
Der Zug steht nur dort.

**Er reicht bis an den oberen Bildrand.** Zuerst deckte er nur die Bühne, unter
dem Satz „Der Kanal oben, die Show darunter" — das galt einem Vorhang, den man
nur im Vorspann sah. Seit die Streifen dauerhaft stehen, ist dieselbe Kante ein
Schnitt mitten durchs Bild: **Ein Vorhang hängt von der Decke; fängt er auf
halber Höhe an, hängt er an nichts.** Die Kopfzeile liegt darüber und wechselt
auf helle Farben, solange er zu ist — damit reißt die KI-Kennzeichnung nie ab,
und genau dafür stand die alte Kante.

**Links und rechts bleibt gerafftes Tuch stehen**, über die ganze Laufzeit.
`VORHANG.rand` = 100 Pixel, am Bild gewählt und nicht gerechnet: Die Herleitung
hätte 130 ergeben, das war die größtmögliche Breite. Die **Untergrenze** ist
gemessen — der Beschnitt der Apps liegt bei 52 Pixeln links und 56 rechts, ein
50-Pixel-Streifen läge vollständig in dem, was am Handy gar nicht ankommt.

**Gestaucht, nicht hinausgeschoben.** Ein gerafft aufgezogener Vorhang staucht
sein Tuch. Verschoben wäre von acht Falten eine dreiviertel übriggeblieben —
ein flacher roter Balken.

**Ein Stoff, ein Mount.** `Vorhangstoff` läuft dauerhaft und nimmt seinen Stand
als Prop, `Vorspannkarte` läuft in der Sequence. Beide lesen denselben Wert, aus
dem auch die Farbumschaltung der Kopfzeile fällt — eine zweite Zeichnung
desselben Vorhangs wäre die Doppelung ohne Wache.

**Zwei Kontrastfehler derselben Sorte, beide am selben Tag.** Der weiße Rand um
die Arme kam vom **Saum des Rigs**, nicht von einem Umriss; verteidigt hatte ich
ihn mit Kontrast 1,26 — gerechnet gegen den Körper der Figur statt gegen die
Figur, deren Gesicht mit 17,1 darauf steht. Und die Kennfarben auf dem Vorhang
standen bei 1,76 und 2,37 statt bei den dokumentierten 3,23 und 4,36: Die alten
Zahlen sind gegen die Grundfarbe gerechnet, und der Stoff ist **gefaltet**.
**Der Kontrast gegen einen Farbverlauf ist der gegen seinen ungünstigsten Ton,
nicht gegen seinen mittleren.**

### Die Kulisse

Seit dem 01.09.2026 steht die Bühne in einem **Raum**: Wand mit Fenster,
Katzenbildern und Uhr, Dielenboden, links ein gelbes Sofa, rechts eine
Kommode (`video/bausteine/Kulisse.tsx`). Sie liegt randlos über dem ganzen
Bild, hinter Vorhang und Kopfzeile.

**Links steht ein Sofa und keine zwei Sessel.** Zwischen Vorhangkante und
Voltis Außenkante liegen 113 Pixel, ein Sessel in dieser Größe ist allein 164
breit — zwei davon standen ineinander und lasen sich als ein Möbel mit einer
Kante daneben. Ein Sofa darf halb hinter Volti liegen, weil es breit ist.

**Der große Satz über den Figuren ist dafür gestrichen** — `text` und
`hervorhebung` gibt es im Schema nicht mehr. Der Anlass war ein Satz zum
fertigen Video: „Das Geschriebene oben macht sowieso keinen Sinn." Er hatte
doppelt recht. Bei zwei Stimmen trägt die Sprechblase den gesprochenen Satz
Wort für Wort — oben stand ein zweiter, anderer, und der Zuschauer las
zweimal. **Und der Satz kostete mehr als seine eigene Höhe:** Er drückte die
Bühne nach unten, und damit wanderte die Standlinie der Figuren je nach
Textlänge.

**Die Standlinie kommt aus `standlinieImBild()` in `src/marke.ts`** und ist
damit dieselbe Zahl für die Kulisse und für die Bühne — eine zweite Rechnung
daneben wäre die Doppelung ohne Wache.

**Eine Zeichnung gehört als `illustration` in die Bühne, nicht als Kind.** Als
Kind bekommt sie nur ihre eigene Höhe und sitzt zentriert im Rahmen; im ersten
Standbild ohne Text stand die Figur dadurch achtzig Pixel über dem Boden und
halb so hoch wie sonst. Als `illustration` bekommt sie `flex: 1` und damit den
ganzen Rahmen.

**Was auf der Wand steht, braucht einen Schleier.** `Textschleier` in
`video/szenen/index.tsx` liegt hinter Schluss, Frage und Zahl: ein weicher
Verlauf in `grundRein`, der die Wand dort aufhellt, wo Text steht. Zwei
Befunde stecken darin:

- **Ein Kasten wäre falsch.** Der Schluss hatte schon einmal einen Strich über
  die ganze Bühnenbreite, und der sagte optisch „fertig". Ein Verlauf hat
  keine Kante.
- **Er hängt absolut hinter dem Text.** Ein Verlauf endet am Rand seines
  Kastens; beim ersten Anlauf stand er dort noch bei halber Deckung, und im
  Bild war ein heller Rechteckblock mit vier Rändern — genau der Rahmen, den
  der Schluss nicht haben darf. Den Platz über Rand und Innenabstand zu holen
  ging nicht: `offsetHeight` zählt den Innenabstand mit, und die
  Überlaufbremse in `Buehne.tsx` misst genau diese Zahl.

### Die Figuren stehen fest, der Text darunter

**Die Figurenbühne steht seit dem 01.09.2026 nicht mehr im gemessenen
Textstapel.** Sie liegt absolut in genau der Fläche, aus der
`standlinieImBild()` die Bodenkante der Kulisse rechnet — es ist nicht dieselbe
Rechnung zweimal, sondern dieselbe Fläche.

Vorher bekamen die Figuren den Rest, den der Text übrig ließ: In der
Zitatkartenszene standen sie halb so hoch wie nebenan, bei einem langen Zitat
fast gar nicht mehr. Mit einer gezeichneten Bodenkante im Rücken fällt das
sofort auf.

**Die Zitatkarte steht deshalb unten**, vor den Figuren auf der Diele, in 0,72
der Schriftgröße: In voller Größe deckte sie die beiden bis zum Kopf. Sie liest
sich als Schild, das die zwei vor sich halten. Der alte Zielkonflikt „Karte und
Figuren teilen sich dieselbe Höhe" ist damit erledigt — was die Karte groß
macht, macht die Figuren nicht mehr klein.

**Die Redespalten füllen die Fläche unter den Figuren**
(`video/bausteine/Redespalten.tsx`). Jede gesprochene Zeile bleibt bis zum
Szenenende stehen, in der Farbe ihres Sprechers, unter dem Standplatz seiner
Figur; mit dem Schnitt leeren sie sich.

Der Untertitel war am 31.08.2026 abgeschaltet worden — „das sieht mit den
Untertiteln so unfassbar scheiße aus, wenn beide Charaktere im Bild sind". Der
Befund war richtig und galt dem **Ort**, nicht dem Text: ein Block unten in der
Bildmitte. Mit dem Raum dahinter fiel der Preis auf, „wenn die beiden sprechen,
wirkt es im Bild leer".

**Sie hängen am Standplatz, nicht an der gerenderten Figur.** Die Kamera fährt
im Bühnen-SVG bis Zoom 1,24 — wer den Text pixelgenau an die Figur bindet,
rechnet zwischen SVG-Raum und Pixelraum um und lässt ihn bei jeder Fahrt
mitwandern. Seite und Farbe statt einer umgerechneten Koordinate, wie schon bei
der Sprechblase.

**Welche Seite, entscheidet die Szene.** `wer` an der Figurenbühne darf
wechseln, und die Spalten müssen dem folgen — im ersten Standbild stand Voltis
Satz unter Watti.

**Was nicht passt, fällt als ganze Gruppe weg — nicht als halbe Zeile.** Der
erste Anlauf schnitt mit `overflow: hidden` an der sicheren Zone ab, und die
Unterkante der Spalte ist genau die Kante, an der die Zitatkarte endet: Im
Video sah es aus, als schnitte die Karte weiter ab, obwohl sie längst weg war.
Jetzt werden je Gruppe die Umbruchzeilen geschätzt, und von hinten bleiben so
viele Gruppen stehen, wie in fünf Zeilen passen. In der Zitatkartenszene sind
die Spalten aus — ein Zitat teilt sich die Fläche nicht.

### Der Abspann

Der Vorhang fährt am Ende zu, und darauf steht **dieselbe Karte wie im
Vorspann** — Showtitel, „mit Volti und Watti", die beiden davor. Nur die Mitte
wechselt: statt „HEUTIGES THEMA" und Themenzeile steht dort der **feste
Zweizeiler**, in jedem Short derselbe:

> Volti: „Wir haben nachgelesen."
> Watti: „Wirklich."

Beides gesprochen, beides im Bild. **Zwei feste Aufnahmen, einmal bezahlt**
(`public/ton/marke/abspann.volti.mp3`, `abspann.watti.mp3`, aufgenommen mit
`npm run vorspannton -- --abspann`), ihre Dauern in `daten/vorspannton.json`
unter `abspann`. Wattis Wort blendet ein, wenn er es sagt — Bild und Ton aus
einer Zahl, wie beim Vorspann.

**Drei Anläufe, bis das stand, und alle drei waren Lesefehler.** Der erste
ließ Showtitel und Namen weg und setzte den Schlusssatz auf den Vorhang. Der
zweite las „darunter wirklich" als Füllwort und baute ein Feld `abspann` mit
einer erfundenen Wattizeile je Short. **„Wirklich." ist das Wort.** Die Lehre
steht als Gedächtnisnotiz: Was bei Emirhan in Anführungszeichen steht, ist
Wortlaut.

Der Schlusssatz steht seitdem **nirgends mehr im Bild** — er wird gesprochen.
`satz` an der Schlussszene ist damit ein Feld, das kein Bild mehr liest; es
hängt noch an `rundlauf` und der Abbinde-Regel.

`Vorspannkarte` und `Abspannkarte` sind zwei dünne Aufrufe derselben
`Vorhangkarte` in `video/bausteine/Vorhang.tsx` — ein Slot `mitte`, alles
andere einmal. Zwei Zeichnungen derselben Karte wären die Doppelung ohne
Wache, und genau die ist am 01.09.2026 auseinandergelaufen:

**Die Karte hat die Geometrie vom 31.08., und die bleibt.** Am Abend des
01.09. stand für zwei Stunden eine andere: Titel 96 statt 132, Abstände
gekürzt, die Figuren auf der Bühnenstandlinie statt unten. Der Anlass war ein
Screenshot mit zwei Figurenpaaren während der Schlussfahrt — und die Lösung war
die falsche: Ich habe die Kartenfiguren auf die Bühnenfiguren gelegt, statt die
Überblendung zu vermeiden, bei der beide überhaupt zugleich sichtbar sind. Das
Urteil: „Die Größen und Abstände beim Opener und Abspann nicht abändern. Das
wollte ich nie abgeändert haben."

Der Vorspann hatte das Problem nie: `titelstand` blendet die Karte aus, bevor
der Vorhang öffnet. Der Abspann blendet seitdem erst ein, wenn der Vorhang zu
ist. **Ein Zeitpunkt, kein Layout** — ein Übergang von 0,4 Sekunden ist kein
Grund, ein Bild umzubauen, das jemand abgenommen hat.

**`NACHLAUF_SEK` ist seitdem gerechnet, nicht gesetzt**: Fahrt, Voltis
gemessene Dauer, Sprecherpause, Wattis Dauer, 0,6 Sekunden Stand — rund 3,5
statt 1,5 Sekunden. Eine feste Zahl daneben wäre die zweite Wahrheit über
dieselbe Größe. Der Folgen-Ton ist mit der Signatur gegangen.

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

### Die Bühne

`video/bausteine/Buehne.tsx` misst den Überlauf und verkleinert den Inhalt, wenn
er nicht passt (Untergrenze 0,7). **Diese Messung wird nicht angefasst.** Ihre
Kommentare dokumentieren drei gescheiterte Anläufe; einer rechnete
`passung = 0` und machte **jede Szene leer**.

Die Bühne zu lockern stand im Plan und ist am 25.08.2026 verworfen worden: Die
270 Pixel Untertitelzone sind nicht frei, dort sitzt die Sprechblase. Eine
Beschränkung zu lösen, für die es keinen Bedarf gibt, ist in dieser Datei
besonders teuer.

**Die Figur und ihr Symbol stehen in getrennten Hälften.** Ein Symbol sitzt
fest in der rechten Bühnenhälfte; `stand: 'rechts'` setzte die Figur auf
dieselbe Stelle, und im Video lag der Stempel hinter ihr. Das Schema lehnt die
Kombination ab.

**Die Posenfolge:** Eine Szene trägt zwei bis vier Haltungen (`zwischen`), die
Übergänge liegen zwischen 40 % und 90 % der Szene. Der Anlass war ein
Zuschauersatz — „Er macht ständig immer nur dieselben Bewegungen" —, und der
erste Versuch behandelte die **Anzahl** der Posen statt die **Folge**. Geprüft
wird die ganze Kette: Zwei benachbarte Stationen müssen verschieden sein.

**Welche Szene ein Bild trägt, ist eine Entscheidung und kein Automatismus.**
`src/illustration.ts` schlug Symbole aus dem Szenentext vor, und das Ergebnis
war, dass **jede** Szene eins bekam. Die Regel dazu hat zweimal auf der
falschen Seite gestanden — erst prüfte sie nur nach oben (Ergebnis: gar keine
Zeichnungen), dann verlangte sie genau eine je Short (Ergebnis: eine, vier
Szenen leer). Heute meldet sie jede bebilderbare Szene **ohne** Zeichnung und
dieselbe Zeichnung zweimal im selben Video.

→ Skill `bild-bauen`: Bühnenmaße (200 × 150, nichts unter y = 146), die
Standbild-Fälle, Kamera-Messwerte, die QA-Kette.

## Der Rundlauf

**Ein Short läuft von selbst wieder an, und ein Rewatch zählt als eigene
Ansicht.** Der Schluss arbeitete dagegen — ein Strich über die ganze
Bühnenbreite sagte optisch „fertig". Er ist weg.

Der Spruch steht in der Mitte unter dem Schlusssatz: ein Strich von 96 Pixeln,
in einer halben Sekunde gezogen, darunter „Wir haben nachgelesen.", rechts die
Figur. **Eine Linie, die entsteht, ist eine Geste; eine, die schon da ist, ist
ein Rahmen.**

**`NACHLAUF_SEK` steht auf 1,5 Sekunden** Stille nach dem letzten Wort, in denen
die Signatur stehen bleibt. Diese Zahl stand hier schon einmal und war zu Recht
weg: 0,8 Sekunden „damit die Endkarte nicht abreißt", während die Endkarte
längst gestrichen war — übrig blieb eine **leere Bühne** am Videoende. Jetzt
steht dort etwas. **Die Schlussszene wächst mit**, nicht nur die Komposition;
genau das war der alte Fehler.

Zwei Felder tragen den Rundlauf: **`rundlauf`** an der Schlussszene sagt, warum
der erste Satz danach wieder passt (ein Feld, keine Prüfung — beurteilen kann
das kein Skript), und **`weitererzaehlt`** muss im verketteten Sprechtext
vorkommen. Prüfbar ist die andere Hälfte: **Der Schlusssatz darf nicht
abbinden.** „Fazit", „kurz gesagt", „schreib es in die Kommentare".

## Länge

**Fenster 40 bis 80 Sekunden, hart. Keine Zielwerte je Bauform mehr.**

**Beides ist am 02.09.2026 an Emirhans zehn Dialogen gefallen.** Sie liegen
zwischen 40 und 78 Sekunden; das alte Fenster hätte vier von zehn abgelehnt,
ohne dass an einem von ihnen etwas zu kürzen gewesen wäre. Und die drei
Zielwerte waren nie gemessen — sie waren zweimal gewandert, beide Male aus
einem Widerspruch heraus und nie aus einer Zahl.

`LAENGENKLASSEN` fällt seitdem aus dem **Fenster** statt aus den Zielwerten:
drei gleiche Drittel zwischen 40 und 80. Der Längenversuch läuft weiter, nur
ohne Vorgabe, welche Länge eine Bauform haben soll.

Der Rest dieses Kapitels ist das Protokoll dazu und beschreibt den Stand bis
zum 02.09.2026.

**Die beiden messen verschiedene Dinge, seit der Vorspann Ton hat.** Das
Fenster misst, wie lange der Zuschauer zusieht — der Vorspann gehört dazu. Der
Zielwert einer Bauform misst, wie lang ein so gebautes **Gespräch** ist; der
Vorspann ist bei jeder Bauform derselbe und sagt über sie nichts aus.

Solange er 3,8 Sekunden gerechnet war, fiel der Unterschied nicht auf. Mit der
Themenansage kostet er rund 9 — und damit blieben einer Wechselrede von ihren 45
Sekunden noch 35,5 für den Inhalt. Die Zielwerte anzuheben ging nicht: 62 plus 9
sind 71 und reißen die Obergrenze. **Zwei Größen, die verschiedene Dinge meinen,
brauchen verschiedene Zahlen** — nicht dieselbe Zahl mit einem Aufschlag.

Ein einziger Zielwert für alle Bauformen war der eigentliche Fehler, nicht seine
Höhe: Vier Stationen brauchen mehr Zeit als ein Wortwechsel, weil sie mehr
Inhalt haben. **Länge ist keine Ursache, sondern eine Folge davon, wie viel es
zu zeigen gibt.**

Zwei Korrekturen an fremden Videos, beide gegen die eigene Vermutung:

- Zwölf Tech-Shorts vermessen: Die drei mit den meisten Aufrufen sind 41, 29
  und 31 Sekunden lang; das damalige Fenster hätte alle drei abgelehnt.
- `@dr_data_dr` (44 Mio. Aufrufe), zwölf Shorts: **48 bis 67 Sekunden**, Median
  61, das stärkste bei 51. **Kein einziges lag im alten Fenster.**

**Der Zielwert ist erstmals eine Wache statt eines Kommentars.** Bis zum
25.08.2026 stand er nur im Text; geprüft wurde allein das Fenster.

**Woher die 42 und die 67 kommen.** Die **67** sind gemessen, aber an einem
fremden Kanal (`@dr_data_dr`, zwölf Shorts, Median 61) — übertragbar ist die
Größenordnung, nicht mehr. Die **42** sind eine Entscheidung vom 31.08.2026:
Unter 42 Sekunden bleibt bei zwei Sprechern kaum mehr als ein Beleg und eine
Reaktion, und genau das war der Bau, der 0-mal geteilt wurde.

### Die drei Zielwerte sind ein Versuchsaufbau

**45 / 52 / 62 seit dem 31.08.2026, und keine dieser Zahlen ist gemessen.**
Gemessen ist bisher eine einzige Länge: Alle neun veröffentlichten Videos sind
20 bis 23 Sekunden lang, zu allem darüber gibt es keine eigene Zahl.

Sie sind zweimal gewandert, aus zwei verschiedenen Gründen. Der erste Umbau
(26.08., auf 25 / 35 / 45 / 60) **spreizte** sie, weil drei von vier in
dieselbe Längenklasse fielen und ein Versuch über Längen so nicht möglich war.

Der zweite hatte einen anderen Anlass: Mit dem Fenster ab 42 Sekunden lagen
**drei von vier Zielwerten unter der Untergrenze.** Eine Wechselrede konnte ihr
eigenes Ziel nicht treffen, ohne durchzufallen — **ein Zielwert, der den
eigenen Short ungültig macht, ist keine Vorgabe, sondern eine Falle.**

**Die Längenklassen werden aus `BAUFORMEN` abgeleitet** (`LAENGENKLASSEN` in
`src/zeit.ts`), Grenze jeweils in der Mitte zwischen zwei Zielwerten. Eine
danebengeschriebene zweite Einteilung wäre eine Doppelung ohne Wache und liefe
beim ersten Umbau lautlos auseinander.

Der Einwand gehört daneben: Das „zu lang" der ersten Zuschauer galt Videos von
28 bis 40 Sekunden. Wir halten Langeweile für die Ursache und wissen es nicht
sicher — eine Bauform mit 60 Sekunden ist eine Wette.

**Und was der Versuch nicht kann:** Bis Ende Oktober sind es rund 36 Shorts.
Das trägt drei Längenklassen mit je etwa zwölf Videos, aber Format mal Länge
wären zwölf Felder mit je dreien — Rauschen. Ausgewertet wird eindimensional,
Länge und Format getrennt.

**`ZEICHEN_PRO_SEKUNDE` steht auf 13,0.** Die alte 15,4 war an
`eleven_multilingual_v2` gemessen und damit nicht unsicher, sondern **für ein
Modell gemessen, das nicht mehr läuft**. Drei Messungen auf v3 liegen zwischen
12,6 und 13,0. Die Basis ist dünn — 800 Zeichen gegen die 2.479, auf denen die
alte Zahl stand; nachmessen, sobald vier Shorts auf v3 vertont sind.

Die Vertonung streut rund sechs Prozent — derselbe Text ergab 75,3 und 70,5
Sekunden. **Zielwert ist die Mitte, nicht der Rand.**

`npm run sprechprobe` prüft das vorab und kostet nichts.

## Zeitangaben altern — der Short nicht

Zwischen Entwurf und Ausstrahlung liegen ein bis zwei Wochen, und danach bleibt
der Short im Feed. „Seit zwölf Tagen" stimmte am Schreibtag und ist am Sendetag
falsch, ohne dass jemand etwas geändert hätte.

Das ist die unangenehmste Sorte Fehler, weil sie durch jede Prüfung geht: Die
Quelle stimmt, das Zitat steht auf der Seite, die Rechnung war korrekt — nur
der Bezugspunkt wandert. **Absolute Daten altern nicht.**

## Rücklauf — was aus den Videos wird

`npm run rueckblick` schließt den Kreis: Buffer liefert den `externalLink`,
YouTube die Zahlen, `daten/rueckblick.json` sammelt sie nachtragend.
`npm run ausreisser`, `npm run aufschlaege` und `npm run laengen` lesen sie.

**Die Länge ist die offene Frage.** Keiner der vier Zielwerte ist gemessen;
sie sind am 26.08.2026 gespreizt worden, damit es überhaupt etwas zu messen
gibt. Die einzige fremde Messung (48–67 s) wurde bewusst **nicht** übernommen —
eine geratene Zahl durch eine übertragene zu ersetzen, macht sie nicht
gemessen. Die Zahlen fallen, sobald zwei Längenklassen belegt sind.

Dafür gibt es seit demselben Tag `npm run laengen`. Es rechnet die
**Verweildauer** (`durchsicht × laengeSek`) statt der Prozent-Durchsicht: Die
sinkt mit der Länge zwangsläufig, und wer Längen an Prozenten vergleicht, hat
sich für das kürzere Video entschieden, bevor er hingesehen hat. Es schweigt
unter drei Videos je Längenklasse.

Der Anlass war eine Lücke: `laengeSek` stand seit Wochen in
`daten/rueckblick.json` und wurde **von keiner Auswertung gelesen**. Heute sind
alle neun veröffentlichten Videos 20–23 Sekunden lang; zu jeder Länge darüber
gibt es keine eigene Zahl.

**Der Nordstern sind geteilt und neue Abonnenten**, dazu Kommentare als frühes
Signal. Das ist am 25.08.2026 geändert worden, und zwar an den eigenen Zahlen:
Die Haltequote an Sekunde 3,5 lag bei **100 bis 115 %** — sie ist grün und
ausgereizt, während geteilt und Abos bei **null** stehen. Ein Messinstrument,
das auf die ausgereizte Größe zeigt, sagt nichts mehr.

Beide Werkzeuge schweigen, solange zu wenig gemessen ist: Median ab acht
Videos, Formatvergleich ab fünf je Format. Geratene Größen haben hier zweimal
Geld gekostet; eine geratene Reichweitenregel wäre die teuerste, weil sie die
Themenwahl steuert. Die Frage, die früh trägt, ist **„was hatte dieses eine"**.

**Veröffentlichtes wird nicht nachgebessert.** Der Lauf-Ordner `laeufe/<tag>/`
hält den ausgestrahlten Wortlaut und ist das Archiv; der Entwurf in
`daten/entwuerfe/` geht weiter. Der Verlauf soll zeigen, wie der Kanal sich
verändert hat.

## Takt

**Vier Videos je Woche**, ein Video je Tag um 18:00, in der Reihenfolge der
Liste. Obergrenze 7 — das ist das Ende der Spanne, die `youtube-shorts` nennt
(„post ~3–7/week, not spam").

Die Zahl kommt daraus, welcher Engpass zuerst greift:

| Engpass | trägt | Rechnung |
|---|---|---|
| **Ideenvorrat** | **9 Wochen** | 77 Ideen, je Format mit dem Minimum |
| Formatabwechslung | 4 je Woche | vier Formate, keines zweimal hintereinander |
| Produktion | ~26 je Woche | 11 min je Video, davon 6 min Beleg |
| ElevenLabs | ~240 je Monat | rund 500 Zeichen je Video, 121.000 im Monat |

**Der Ideenvorrat ist die Grenze, nicht die Produktion.** Bei mehr als vier
Videos je Woche muss ein Format doppelt laufen, und dann wird aus der Regel ein
Zwang statt einer Wache — genau davor warnt die Retention-Ladder: „volume
without novelty is a negative".

Die **Materialgrenze** für Aktuelles: Neue **Geräte** sind durch
Herstellerankündigung (beteiligt) und Presse (nicht eintragbar) belegt und
fallen aus. Neue **Regeln, Normen und Grenzwerte** sind durch Behörden belegt —
nur die gehen. Das klingt nach Einschränkung und ist der Vorteil: Über ein neues
Handy berichten hunderttausend Kanäle am selben Tag; dass ein Recht auf
Reparatur gilt, erzählt niemand.

## Ideenvorrat

`daten/ideen/` — **eine Datei je Format**, `index.ts` als einzige Liste. Jede
Idee trägt einen **Belegpfad**; das Schema erzwingt mindestens eine unbeteiligte
Instanz — wer schon beim Skizzieren keine benennen kann, hat kein Thema,
sondern eine Vermutung.

Stand: **77 Ideen** — `gibtswirklich` 21, `absicht` 36, `eswareinmal` 10,
`werhatrecht` 10. `daten/ideen/hauptvideo.ts` sammelt, was als Short nicht
trägt.

**Nachgefüllt wird je Pillar, nicht je Format.** Welches Format daraus wird,
entscheidet die `MATRIX` hinterher — ob ein Thema ein Märchen oder ein
Streitfall ist, sieht man erst, wenn man es hat.

## Was ohne Zutun läuft

| | wo | wann |
|---|---|---|
| **Senden** | Buffers Server | zu den geplanten Terminen, Rechner darf aus sein |
| **Nachlegen** | `de.ganzakkurat.nachlegen` | täglich 19:15, wenn ein Platz frei wird |
| **Messen** | `de.ganzakkurat.rueckblick` | täglich 9:30 |

**Buffers kostenloser Tarif nimmt zehn geplante Beiträge je Kanal** — zwei
Wochen lassen sich deshalb nicht auf Vorrat einplanen. `npm run nachlegen` löst
das täglich.

Alles andere braucht eine Sitzung: Themen wählen, Quellen abrufen, Entwürfe
schreiben, vertonen, rendern, freigeben.

## Werbemodell

**Zurzeit gar keine Werbung und keine Links.** Das Format `empfehlung` ruht,
bis Partnerlinks möglich sind, und trägt dann als einziges das Label im Bild.
**Seltenheit ist der Preis, den eine Empfehlung wert ist.** Wer wöchentlich
empfiehlt, ist ein Prospekt.

Die Kennzeichnungsregeln stehen trotzdem schon im Code (`src/pruefung.ts`,
`ZUBEHOERMARKEN` und `kennzeichnung`): Eine Regel, die erst gebaut wird, wenn
sie gebraucht wird, wird unter Zeitdruck gebaut.

Die geschäftliche und rechtliche Vorbereitung steht in `daten/geschaeft.md`
und nicht in diesem Repository.

## Stand

Die Pipeline steht bis einschließlich Veröffentlichung: Ablage auf Cloudflare
R2, Einplanung über Buffer, Zugangsprüfung (`npm run zugaenge`). Alle Zugänge
liegen in `.env`. Die laufende Aufgabenliste steht in `AUFGABEN.md`.

**Seit dem 25.08.2026 läuft der Umbau auf zwei Stimmen.** Schema, Vertonung,
Sprechblase, zwei Rigs, die Bauformen und die fordernden Prüfregeln stehen.
**Kein Video im neuen Bau ist bisher veröffentlicht** — alle Zahlen oben
stammen aus der einstimmigen Zeit.

**Seit dem 31.08.2026 beginnt jeder Short als Show.** Ein Theatervorhang deckt
die Bühne, links und rechts bleibt gerafftes Tuch über die ganze Laufzeit
stehen, und die Kopfzeile wechselt auf helle Farben, solange er zu ist. Aus vier
Rubriken sind sechs benannte Sendungen geworden — Facts, Beef, Märchenstunde,
Kein Zufall, Schätz mal, Empfehlungen. Was fehlt, ist der **Ton**: sechs feste
Aufnahmen; `VORSPANN_SEK` steht auf gerechneten 3,8 Sekunden.

**Alle vier Entwürfe sind auf ein Zwiegespräch umgeschrieben**, und
`npm run pruefen` ist am selben Abend erstmals seit dem 26.08. wieder
vollständig grün. Ausgenommen wurde keiner: Eine Regel, die den alten Bestand
durchwinkt, wäre keine.

**Seit dem 02.09.2026 schreibt Claude die Dialoge.** Emirhans Befund: Ich habe
jeden seiner Dialoge umgeschrieben, weil Regeln dagegenstanden, die ich vorher
selbst gebaut hatte — keine davon an seinem Material gemessen. Der Weg dahin
war eine Messung, kein Argument:

1. **Seine neun Dialoge vermessen** — 131 Redezeilen, Zeichen je Figur,
   Fragenanteil, wo die Zitatkarte sitzt. Erst danach interpretiert.
2. **Sechs Runden Gegentest.** Ich schreibe einen Dialog, er sagt, was nicht
   klingt, der Befund geht ins Profil. Runde vier war die erste ohne
   Beanstandung.
3. **38 Befunde** in `daten/marke/dialoganalyse.md`, **zwölf Szenarien** in
   `daten/szenarien/` — der Skill `skript-schreiben` liest den Ordner, er
   enthält ihn nicht. Eine neue Runde legt dort eine Datei ab.
4. **Alle zehn Dialoge ins Schema**, dann `shortPruefen`: **91 Befunde an zehn
   Dialogen, die er geschrieben und abgenommen hat.** Neun Regeln sind daraufhin
   gewandert, sechs haben recht behalten.

**Die Methode ist das Ergebnis, nicht die Regeln.** Jede Runde legt einen
**Weg** dazu, keine Regel obendrauf — *„damit du so viele Wege wie möglich hast,
wodurch keine Schablone entsteht."* Und: **Widersprechen sich eine Regel und
eine gute Zeile, verliert die Regel.** Einzige Ausnahme ist die Belegpflicht,
und die ist an diesem Tag nicht gefallen, sondern von der Szene auf die
behauptende Zeile gewandert.

Was der Umbau dabei über sich selbst gezeigt hat: **Die Nähte lagen zwischen
den Sätzen, nicht in ihnen.** Ein Aufschlag von 2,9 Sekunden und ein Belegsatz
von 4,2 sind beide unauffällig — `redebloecke` klebt sie über die Szenengrenze
zu 6,9 zusammen. Und **jede Kürzung nimmt ein Wort mit, das gedeckt war**: Der
`belegpruefer` fand sechs Stellen, alle sechs in Sätzen, die gerade erst
angefasst worden waren.

## Arbeitsweise

**Die Aufgabenliste gehört ans Ende jeder Antwort**, solange etwas offen ist —
aus `AUFGABEN.md`, Erledigtes durchgestrichen, die laufende Aufgabe mit `▸`.
Nicht in die Statuszeile: die gehört Emirhan.

**Erst zu Ende besprechen, dann bauen.** Nach einem bestätigten Einzelpunkt
sofort loszubauen hat sich als falsch erwiesen — die Umsetzung kommt gesammelt.

**Wenn eine Größe messbar ist, gehört sie gemessen und nicht begründet.** Das
ist die Regel, die dieses Projekt am häufigsten gerettet hat: bei
`ZEICHEN_PRO_SEKUNDE`, bei der Denkpause, bei der Videolänge, bei der Tonhöhe
der Stimmen. Und die Begründung, warum sich etwas angeblich nicht messen lässt,
ist das verdächtigste Bauteil überhaupt.
