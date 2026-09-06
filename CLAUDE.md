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
npm run rueckblick        # holt, was aus den Videos geworden ist (alle drei Kanäle)
npm run wochenvorschlag   # schlägt die fünf Shorts der nächsten Woche vor
npm run ausreisser        # was hatte dieses eine? Zahlen neben Format und Thema
npm run aufschlaege       # jeder Aufschlag neben seiner Haltequote
npm run laengen           # Länge gegen Verweildauer, schweigt bei zu wenig
npm run kanalwoche        # alle drei Kanäle nebeneinander, als Seite
npm run lauf              # Wochenlauf, ohne Ton (Szenenlängen geschätzt)
npm run lauf -- --mit-ton # kostet ElevenLabs-Kontingent
npm run lauf -- --auswahl=automatisch   # Woche selbst zusammenstellen
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
`.claude/skills/`, das **Handwerk** in deren `references/`, und was nur beim
Nachschlagen gebraucht wird, in `docs/`.

**Am 06.09.2026 sind 53 KB aus dieser Datei umgezogen** — von 119 auf 66, in
zwei Durchgängen. Die
Aufteilung war in der Datei seit langem angelegt und benannt, nur nicht
durchgezogen: Vier Fünftel waren Ablaufwissen, Messprotokolle und
Änderungshistorie, die situativ gebraucht werden und trotzdem jede Sitzung
mitgeladen wurden. Verschoben wurde **wörtlich**, geprüft mit einer Zeilenprobe
gegen den Tag `vor-aufteilung`; nur „Harte Regeln" ist zu einer Tabelle
verdichtet, und das alte Kapitel steht vollständig in der Historie.

**Der zweite Durchgang am selben Tag nahm Länge, Kanalwoche und Takt** — 7 KB,
wieder wörtlich und wieder mit einer Zeilenprobe: Von den entfernten Zeilen
fehlten drei, und alle drei waren Überleitungssätze auf den verschobenen Text.

| Datei | was drinsteht | wann zu lesen |
|---|---|---|
| `bild-bauen/references/figuren.md` | Rigs, Posen, Abstände, Haltung, vierte Wand | an einer Figur arbeiten |
| `bild-bauen/references/buehne-und-kulisse.md` | Raum, Überlaufmessung, gefallene Untertitelzone | an Bühne oder Kulisse |
| `bild-bauen/references/text-im-bild.md` | Redespalten, Zitatkarte, keine Sprechblase | an Text im Bild |
| `bild-bauen/references/vorhang-und-vorspann.md` | Vorhang, Vorspann- und Abspannkarte | an der Show außenherum |
| `woche-bauen/references/vertonung.md` | Modell, Regie, Stimmen, Pausen, bezahlter Lauf | **vor jeder Vertonung** |
| `woche-bauen/references/takt.md` | die Messungen hinter fünf je Woche, Engpassrechnung, Rubrikenverteilung | eine Woche planen |
| `rueckblick-lesen/references/kanalwoche.md` | wie die Seite gebaut ist, der Strich statt der Null, TikTok trägt den Kanal | an `src/kanalseite.ts` |
| `beleg-holen/references/zitat-und-abruf.md` | Subjekt im Zitat, Verneinung, Länge, EUR-Lex | **vor jeder neuen Quelle** |
| `docs/regelhistorie.md` | wie jede harte Regel entstand | bevor eine Regel geändert wird |
| `docs/verworfen.md` | was gestrichen ist und warum | wenn jemand es wieder vorschlägt |
| `docs/ton.md` | die vier Klänge, Abspann, Kipppunktton | an `skripte/toene.ts` |
| `docs/umbauten.md` | das Protokoll der drei Umbauten | für die Vorgeschichte |
| `docs/laengenprotokoll.md` | Zielwerte, fremde Messungen, die Sprechprobe-Reparatur | an Längen und Zielwerten |

**Was hier neu aufgenommen wird, muss eine der drei Fragen mit Ja beantworten:**
Kostet es Geld? Wirkt es nach draußen? Gilt es in **jeder** Sitzung? Sonst
gehört es in einen Skill, in eine Referenzdatei oder als Kommentar an die
Codestelle, die es erzwingt. **Ohne diese Frage steht die Datei in vier Wochen
wieder bei 110 KB** — und zwar mit den Befunden aus genau diesen vier Wochen.

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

**Zwei zugekaufte Skills sind übrig, und das ist das Ergebnis einer Messung.**
Am 04.09.2026 standen 23 fremde Skills im Ordner; nachgesehen wurde, welcher
davon in einem unserer acht eigenen Skills als Schritt vorkommt. **Zwei tun
es** — die anderen 21 sind gelöscht.

| bleibt | wo er im Ablauf steht |
|---|---|
| **`joke-engineering`** | Diagnose in `skript-schreiben`. Er ist rein diagnostisch: Er benennt, *warum* eine Zeile flach ist, und schreibt nichts. Sein Befund „H4 Over-Explained: punchline is stated rather than implied" traf die ersten Entwürfe der Reaktionszeilen wörtlich |
| **`viral-reverse-engineering`** | Schritt 5 in `humor-eichen` — die Vorbilder zerlegen, und `watch` behebt die Schwäche, die er selbst nennt: Ein Agent kann ein Video hinter einem Link nicht sehen |

**Was die 21 anderen beigetragen haben, ist längst übernommen** — und genau
deshalb konnten sie gehen:

- `brand-profile` und `voice-builder` haben `daten/marke/brand-profile.md` und
  `voice.md` erzeugt. **Die Dateien bleiben, das Werkzeug ist fertig.**
- `hook-writer` und `short-form-video-script` stecken in `HOOK_MACHARTEN` und
  `MACHARTEN`.
- `youtube-shorts` lieferte die Taktobergrenze 7 („post ~3–7/week, not spam").
- Die Bildkette (`character-rigging` → `svg-character-animation` →
  `character-animation-qa`) steht als sechs Prüfstufen im Skill `bild-bauen`,
  der selbst sagt: „halten das Handwerk; hier steht, was für dieses Projekt
  gilt." Dasselbe gilt für `ffmpeg` und `skripte/ff`.
- Die Auffindbarkeits- und die Planungskette (`social-seo`, `instagram-seo`,
  `hashtag-strategy`, `content-pillars`, `content-calendar`,
  `analytics-and-reporting`, `competitor-analysis`, dazu `instagram-growth`,
  `tiktok-growth`, `reels-script`, `animation-vocabulary`, `better-typography`)
  haben **keine Spur hinterlassen**. Die Hashtag-Regel steht im Code, die Zahlen
  holt `npm run rueckblick`.

**Der Rückweg steht in `skills-lock.json`** — Quelle und Prüfsumme aller 21,
sechs davon am selben Tag nachgetragen, weil sie nie darin standen. Und in der
Git-Historie steht jede Datei im Wortlaut.

**Die Einschränkung „`rueckblick` liest ausschließlich YouTube" ist am
05.09.2026 gefallen** — und zwar ohne dass etwas angebunden werden musste:
Buffer liefert die Kennzahlen aller drei Kanäle mit dem Token, das ohnehin in
`.env` liegt. Siehe „Rücklauf".

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

**Im Schema stehen fünf**, und die Zählung stimmt trotzdem: `empfehlung` ruht
bis zu den Partnerlinks. **Ein sechstes wird es nicht geben** — `schaetzmal`
ist am 06.09.2026 verworfen, weil die Schätzfrage Staunen auslöst und dafür
`gibtswirklich` da ist. Sie bleibt ein Mittel, das in jedem Format vorkommt;
die Begründung steht in `docs/verworfen.md`.

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
stimmte es, heute nicht", ist es ein **Märchen** — und seit dem 06.09.2026 steht
`eswareinmal` deshalb **vor** `werhatrecht` in der Reihe, statt dass eine engere
Streitfrage die Trennung tragen muss.

**Beef ist am selben Tag geweitet worden.** Die Frage verlangte „und beide
übersehen etwas" und damit beim **Sammeln**, was erst der Dialog leisten kann;
sie fragt jetzt, ob zwei **benennbare** Lager streiten, obwohl der Fakt belegt
ist. **Das Dritte ist nicht gestrichen, sondern umgezogen** — auf den
Kipppunkt, wo `GESPRAECHSBOEGEN` es weiter verlangt. Das Wort „benennbar" hält
die Frage eng: Ohne es träfe „belegt und trotzdem strittig" auf fast jeden Fakt
zu, und die Abgrenzung zu `gibtswirklich` hinge an nichts mehr.

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

Gestrichen und **nicht zurückzuholen**: `warnung` mit `loesung`,
`merkmalskarte`, `endkarte`, `merksatz`, `symbol`, `GeraeteArt`,
`src/illustration.ts`, der `stab` und der **Zeiger in der Signatur**. Das alte
Vokabular war **Erklärvideo-Vokabular** — Lösung, Merkmal, Bewertung, Punkte
zum Mitnehmen: jedes Feld setzt voraus, dass der Zuschauer etwas lernen will.

→ `docs/verworfen.md` hat zu jedem Punkt die Begründung, dazu die fünf Dinge,
die der Zeiger mitgenommen hat, und die drei Sackgassen samt Messwerten. **Die
Datei wird gebraucht, wenn jemand eines davon wieder vorschlägt** — und genau
dann trägt sie mehr als eine Tabelle.

Das `Lauf`-Schema wird von **keinem Skript geparst** — laufweite Regeln gehören
deshalb in `laufweiteBefunde` in `src/pruefung.ts`, nicht in ein `superRefine`
auf `Lauf`. Eine Regel dort ist tote Regel.
## Harte Regeln (`src/pruefung.ts`)

Fehler halten einen Short zurück, Hinweise erscheinen in der Freigabe-Übersicht.
**Eine Zeile je Regel; wie sie entstanden ist, steht in
`docs/regelhistorie.md`.**

| Regel | was sie verlangt |
|---|---|
| `format` | kein Format zweimal hintereinander (Fehler); ab vier Shorts Hinweis, wenn eines mehr als die Hälfte stellt |
| `bauform` | keine zweimal hintereinander (Fehler); ab vier Shorts keine über die Hälfte je Lauf; die Mittel müssen den Namen decken |
| `zweistimmigkeit` | mindestens zwei Szenen mit beiden Stimmen, ohne Ausnahme (Fehler) |
| `reaktion` | mindestens eine Zeile mit `machart`, keine Machart zweimal im selben Short |
| `antwortpflicht` | auf `widersprechen` folgt ein Konter, auf `nachhaken` eine Auskunft — vom anderen, höchstens zwei Zeilen später. Zurückfragen und Ausweichen lösen sie ein |
| `abbiegen` | höchstens einmal je Short |
| `anschluss` | anschlusslose Züge höchstens ein Drittel |
| `zugpaar` | kein Zugpaar über der Hälfte aller Wechsel |
| `zugtripel` | kein gleiches Zugtripel in zwei aufeinanderfolgenden Shorts (Hinweis) |
| `zugverlust` | Hinweis, wo zwei Anteile derselben Figur in einer Szene verschiedene Haltungen tragen |
| `rueckbezug` | Hinweis, wenn keine Zeile ein Wort ihrer Vorzeile aufgreift |
| `sachgebiet` | höchstens zwei Shorts je Sachgebiet und Woche |
| `suchbegriff` | jedes Wort steht im Sprechtext und in allen drei Beschreibungen (Fehler) |
| `beleg` | mindestens **eine unbeteiligte** Quelle je Short |
| `belegId` | die Fundstelle steht wirklich in der genannten Quelle (Fehler); ein Zitat trägt höchstens zwei Szenen (Hinweis) |
| Belegpflicht nach Position | `zuspitzung` und `kipppunkt` brauchen eine Quelle, **sobald eine ihrer Zeilen einen behauptenden Zug trägt** |
| `aufbau` | jede Position kommt vor, Aufschlag und Nachschlag genau einmal, die Folge läuft nur vorwärts |
| `aufschlag` | die erste Szene spricht höchstens **9 Sekunden** (an den Wortzeitstempeln, sobald eine Tonspur vorliegt); Ansagen wie „heute geht es um" lehnt das Schema ab |
| `sprache` | Amtsdeutsch im Sprechtext ist ein Fehler, außer hinter einem Doppelpunkt |
| `laenge` | **40 bis 80 Sekunden hart**; ab drei Shorts Hinweis, wenn alle in derselben Längenklasse liegen |
| `produktname` | im Video fällt nie ein Markenname aus `ZUBEHOERMARKEN` — Gerätehersteller sind ausgenommen |
| `kennzeichnung` | ein Partnerlink braucht „Werbung", „Anzeige" oder „Werbepartner" **in derselben Zeile** (LG Erfurt, 23.11.2020) |
| `produktionsregel` | kein Sprechtext behauptet eigene Produkterfahrung, kein Titel sagt „Test" |
| `titel` | der Titel nennt nichts, was im Video nicht vorkommt; kein Ausrufezeichen, kein Emoji, keine Konfrontation gegen den Zuschauer |
| Zeitangaben | „seit heute", „gestern", „diese Woche", „seit N Tagen" werden hart abgelehnt — **geprüft an Wortgrenzen**, seit die Regel „morgen" in „morgens" fand |
| `kaltstart` | Anrede oder Antwort: die erste Zeile nach dem Vorhang antwortet dem Kaltstart oder spricht den anderen an; dazu ein Hinweis, wenn kein Wort daraus wiederkehrt |
| `bildvielfalt` | jede bebilderbare Szene trägt eine Zeichnung, keine zweimal im selben Short; die Posenfolge wechselt; **und die Posen, die zu zweit aus dem Bild ragen, sind ein Fehler** — `achselzucken` im Wortwechsel, dazu `staunen` und `hochschauen` im Schluss |
| `wiederholung` | Hinweis, wenn ein Thema schon in einem früheren Lauf lief |

**Vier Sätze aus der Historie, die über ihre Regel hinaus gelten** und deshalb
hier bleiben:

- **Eine Wache, die sich bei Abweichung selbst abschaltet, ist keine Wache.**
  Die Formatregel hieß einmal „jedes Format genau einmal je Lauf" und stand
  hinter einer Zahlengleichheit — sie war genau dann still, wenn sie gebraucht
  wurde.
- **Eine Wache, die bei sieben Shorts unerfüllbar ist, ist keine Wache.**
  Dasselbe von der anderen Seite, an der Bauformregel gelernt.
- **Alle Gesprächsregeln sind Obergrenzen, keine Mindestmaße.** Das Projekt hat
  dreimal erlebt, dass eine vorschreibende Regel selbst zur Schablone wird — ein
  Maximum lässt sich nicht ansteuern.
- **Ein Maß, das eine Zeichenkette zählt, kann eine Beziehung nicht sehen.**
  `rueckbezug` war am ersten vertonten Video weit übererfüllt, und es war
  trotzdem kein Gespräch. Er bleibt als Gegenprobe zum Zug.
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

## Was Geld kostet und was nach draußen geht

**Der Block, der niemals in eine Datei wandert, die nicht geladen wird.** Alles
darunter kostet entweder bezahltes Kontingent oder wirkt auf echte Konten —
beides lässt sich nicht zurücknehmen, wenn es einmal passiert ist.

**Bezahlt wird bei ElevenLabs, je Zeichen:**

- `npm run pruefen` **muss vor jedem Lauf grün sein.** Die harten Regeln liefen
  einmal erst *im* Wochenlauf, also **nachdem** die Vertonung bezahlt war.
- `npm run lauf -- --mit-ton`, `npm run vorspannton` und `npm run stimmproben`
  kosten Kontingent. **Jeder dieser Aufrufe braucht eine ausdrückliche Zusage**
  — die einzige Ausnahme ist der Sonntagslauf, für den sie einmal erteilt ist.
- `npm run sprechprobe` und `npm run pausenprobe` **kosten nichts** und
  beantworten fast jede Frage, für die man sonst vertonen würde.
- **`vorspannton` nur mit `--shows`.** Der Aufruf ohne Argument war der
  wahrscheinlichste und der teuerste: Er nahm eine längst gestrichene
  Showaufnahme neu auf.
- **Die Synthese ist nicht deterministisch.** Dieselbe Zeile ergibt beim
  zweiten Mal eine andere Dauer — nicht neu vertonen, um eine Zahl zu
  bestätigen.
- **Ein Fehlschlag nimmt einen Short mit, nicht den Lauf**, und die Tonspur
  wird sofort nach der Synthese in `laeufe/<tag>/props/` geschrieben. Vorher
  kostete ein Abbruch beim vierten Short die ersten drei ein zweites Mal, weil
  `--ton-behalten` `props`-Dateien sucht.
- **Der Sonntagslauf bricht ab, bevor etwas bezahlt ist**, wenn die Auswahl
  keine gültige Woche findet.
- **Die Schemaprüfung steht vor allem anderen.** Reißt `daten/beispiel-short.ts`
  das Schema, bleibt Remotion in einem unerfüllten Promise stehen — der Render
  hängt ohne Fehlermeldung, und `tsc` sieht es nicht.
- **Alle vier Markentöne müssen als Datei da sein.** Der schlechtere Fall ist
  nicht der Absturz, sondern das **stumme Video**, das durchgeht.

**Nach draußen wirkt, was an Buffer, R2 und die drei Kanäle geht:**

- `kiStimme` ist Pflicht und geht als `isAiGenerated` an alle drei Dienste. Das
  ist die von YouTube seit Mai 2025 verlangte Kennzeichnung; `shortPruefen`
  meldet einen Fehler bei `false`.
- Ein Partnerlink braucht „Werbung", „Anzeige" oder „Werbepartner" **in
  derselben Zeile** (LG Erfurt, 23.11.2020).
- `produktionsregel` und `ZUBEHOERMARKEN`: keine eigene Produkterfahrung, kein
  „Test", im Video fällt nie ein Zubehör-Markenname.
- **Quellen nie aus dem Gedächtnis** und nie aus einem Suchtreffer-Ausschnitt —
  erst abrufen, lesen, dann eintragen.
- **Zeitangaben altern, der Short nicht.** Absolute Daten, keine relativen.
- **Veröffentlichtes wird nicht nachgebessert.** Der Lauf-Ordner ist das
  Archiv.
- `npm run veroeffentlichen` und `npm run buffer-probe` wirken auf echte
  Konten. Vier Zeitpläne laufen sonntags **ohne dass jemand dabei ist** — siehe
  „Was ohne Zutun läuft".

→ Die Herleitung zu Vertonung, bezahltem Lauf und den Pausen steht in
`woche-bauen/references/vertonung.md`: Modell, Regieanweisungen, Stimmen,
Sprecherpausen und `tonspurNeuLegen`.
## Quellen

`daten/quellen.json`. Neue Quellen kommen erst hinein, **nachdem die URL
tatsächlich abgerufen und der Inhalt gelesen wurde** — nie aus dem Gedächtnis
und nie aus einem Suchtreffer-Ausschnitt. `geprueftAm` dokumentiert den Abruf.

Die Regel ist **nachprüfbar**: Jeder Beleg trägt ein `zitat`, wörtlich von der
Seite, und `npm run quellen-pruefen` holt die Seite und sucht die Zeichenkette
— stumpf, ohne Sprachmodell. `stuetzt` daneben ist die Folgerung in unseren
Worten und wird **nie** geprüft. Genau dort saß der teuerste Fehler dieses
Projekts; `npm run belege` ist die Durchsicht dagegen.

**Ein Zitat muss sein Subjekt enthalten**, und die Verneinung gehört mit hinein.
Eine Fundstelle, deren Bedeutung an Wörtern außerhalb des Zitats hängt, wird
**still** falsch, wenn die Seite umformuliert wird — `quellen-pruefen` findet
die Zeichenkette und kann nicht sehen, ob sie noch beim selben Gegenstand
steht. Höchstens 240 Zeichen, kurz halten bleibt die Empfehlung.

→ `beleg-holen/references/zitat-und-abruf.md` hat die Fälle dazu: das Subjekt,
das kein Substantiv war (Artikel 16 der Reparaturrichtlinie), die Verneinung am
Satzende, warum die Länge von 180 auf 240 stieg, und den EUR-Lex-Umweg über
Cellar samt der Schreibweise, an der er einmal hing.
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

**Eine Probe ohne Tonspur prüft ein anderes Bild.** `npm run bildrand` hat
einmal 75 Standbilder mit zu kleinen Figuren gemessen und für gut befunden:
`Sprecherstand` hielt einen Short ohne `abschnitte` für einstimmig, und die
Bühne reservierte dann unten 270 Pixel für den Untertitel. **Eine Probe, die
kleinere Figuren misst, kann nicht sehen, dass die großen herausragen** — sie
ist genau dort still, wo sie gebraucht wird. Sie legt seit dem 01.09.2026 eine
Tonspur-Attrappe in die Props und liest ihre Bildnummern aus **demselben**
angereicherten Short, weil `szenenZeitplan` mit Tonspur anders rechnet als ohne.

**Die Untertitelzone selbst ist am 04.09.2026 gefallen** (siehe „Die Bühne"),
und die Attrappe bleibt trotzdem: Ohne Abschnitte gibt es keine Sprechstärke,
also neigt `HINLEHNEN` keine Figur — und geneigt reichen sie weiter.

**Eine Zeichnung ist erst geprüft, wenn sie gerendert danebensteht.** Diese
Regel hat sich zehnmal bewährt, und jedes Mal sah der Code vorher richtig aus.
Zusätzlich gehört das **letzte** Bild gezogen — dort fiel die leere Bühne am
Videoende auf, die sonst niemand sieht.

**Der Ton steht in `docs/ton.md`** — die vier berechneten Klänge, die zwei
festen Abspannaufnahmen und der Begleitton am Kipppunkt. Er ist weder Bild noch
Vertonung, und kein Skill deckt ihn ab. Zwei Sätze daraus gelten trotzdem
überall: **Synthese baut Klänge gut und Texturen schlecht**, und der Ausweg ist
nie, die Textur besser zu bauen, sondern den Klang auf seine Aufgabe zu
beschränken.

**Alles Weitere steht seit dem 06.09.2026 im Skill**, wörtlich verschoben und
nicht umgeschrieben. Der Vertrag behält, was eine Grundsatzentscheidung mit
Rechtsfolge ist; das Handwerk liest, wer am Bild arbeitet:

| wo | was |
|---|---|
| `bild-bauen/references/figuren.md` | die beiden Rigs, Posen, Abstände, die Haltung aus dem Zug, die vierte Wand |
| `bild-bauen/references/buehne-und-kulisse.md` | der Raum hinter den Figuren, die Überlaufmessung, die gefallene Untertitelzone |
| `bild-bauen/references/text-im-bild.md` | Redespalten und Zitatkarte — und warum es keine Sprechblase mit Zipfel gibt |
| `bild-bauen/references/vorhang-und-vorspann.md` | Vorhang, Vorspannkarte, Abspann und die Geometrie, die nicht angefasst wird |

**Zwei Sätze bleiben hier, weil sie nicht das Bild betreffen, sondern die
Marke:** Es wird nie etwas selbst benutzt, also gilt `produktionsregel`
dauerhaft — und die Größen von Vorspann- und Abspannkarte sind auf Ansage
festgelegt: *„Die Größen und Abstände beim Opener und Abspann nicht abändern.
Das wollte ich nie abgeändert haben."*

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

→ `docs/laengenprotokoll.md` hat das Protokoll: die beiden Größen, die
verschiedene Dinge messen, die zwei Korrekturen an fremden Videos, die drei
Zielwerte als Versuchsaufbau und woher 42 und 67 kamen.

**`ZEICHEN_PRO_SEKUNDE` steht auf 13,0.** Die alte 15,4 war an
`eleven_multilingual_v2` gemessen und damit nicht unsicher, sondern **für ein
Modell gemessen, das nicht mehr läuft**. Drei Messungen auf v3 liegen zwischen
12,6 und 13,0. Die Basis ist dünn — 800 Zeichen gegen die 2.479, auf denen die
alte Zahl stand; nachmessen, sobald vier Shorts auf v3 vertont sind.

Die Vertonung streut rund sechs Prozent — derselbe Text ergab 75,3 und 70,5
Sekunden. **Zielwert ist die Mitte, nicht der Rand.**

`npm run sprechprobe` prüft das vorab und kostet nichts.

→ Was an ihr am 06.09.2026 repariert wurde (das ignorierte Argument, der
fehlende Timeout an `say`), steht in `docs/laengenprotokoll.md`.

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

**Seit dem 05.09.2026 misst er alle drei Kanäle**, und dafür musste nichts
angebunden werden. Am Buffer-Beitrag hängen `metrics` und `metricsUpdatedAt`,
im kostenlosen Tarif und mit demselben Token:

| Kanal | was ankommt |
|---|---|
| **TikTok** | Aufrufe, Reichweite, geteilt, Reaktionen, Kommentare, **durchschnittliche Sehdauer** |
| **Instagram** | Aufrufe, Reichweite, **geteilt**, **gespeichert**, **neue Abos**, Reaktionen, Kommentare |
| **YouTube** | Aufrufe, Reaktionen, Kommentare |

**Damit ist der Nordstern erstmals vollständig messbar.** Geteilt und neue
Abonnenten misst YouTube nur für sich; Instagram liefert beides. Der Weg über
die Plattform-APIs hätte ein Business-Konto mit Facebook-Seite, eine
Meta-App-Review von zwei bis vier Wochen und ein TikTok-Developer-Konto
gekostet — für dieselben Werte.

**Die Zahlen stehen als `jeKanal` neben den YouTube-Feldern, nicht in ihnen.**
Die oberste Ebene bleibt YouTube, weil `ausreisser`, `aufschlaege` und `laengen`
sie seit Wochen lesen: **Eine Zahl, die still ihre Bedeutung wechselt, macht
jeden Vergleich mit älteren Messungen falsch.**

**Und genau dieses Danebenstellen hat sie beinahe unsichtbar gemacht.**
`src/rueckschau.ts` beschreibt die Messung als Zod-Schema, und Zod streift ab,
was nicht beschrieben ist. `jeKanal` stand nicht darin: Der Rückblick schrieb
die Zahlen in die Datei, `rueckblickLesen` warf sie beim Parsen wieder weg, und
alle vier Leser waren für Instagram und TikTok blind — ohne dass irgendetwas
einen Fehler warf. **Eine Lücke, die kein Fehler ist, weil ein Feld einfach
verschwindet.** Gefunden am 05.09.2026 mit einem Dreizeiler, der nach dem Parsen
nachsieht.

Die Form steht seitdem an **einer** Stelle — `Kanalmessung` in
`src/rueckschau.ts`, importiert von `skripte/rueckblick.ts`. Sie war einen Tag
lang zweimal beschrieben, und dieser eine Tag hat gereicht.

→ Wie `npm run kanalwoche` gebaut ist — der Nordstern oben, der gestrichelte
Verlauf, „ein Strich ist keine Null" und der Befund, dass TikTok den Kanal
trägt — steht in `.claude/skills/rueckblick-lesen/references/kanalwoche.md`.

**Die Warnung daraus gehört hierher, weil sie Daten kostet:** Die Zuordnung
Short → Buffer-Beitrag steht in `laeufe/<tag>/veroeffentlicht.json`. Am
04.09.2026 habe ich fünf Laufordner gelöscht, weil ihre `lauf.json` nicht mehr
parste — die `veroeffentlicht.json` daneben tat das sehr wohl, und zwölf Videos
verloren ihre Zuordnung. **Ich habe eine Datei nach dem Wert einer anderen
beurteilt.** `npm run zuordnung-wiederherstellen` holt sie aus Buffer zurück;
es ist ein Notschlüssel, kein Teil der Kette.

## Takt

**Fünf Videos je Woche: Montag, Mittwoch, Freitag, Samstag, Sonntag um 18:00** —
auf Instagram um 20:00. Die Plätze stehen als `SENDEPLAETZE` in `src/buffer.ts`,
die Stunde je Dienst als `UHRZEIT_JE_DIENST` in `skripte/veroeffentlichen.ts`.

**Fünf ist gemessen, nicht geraten** (Buffer, 11,4 Mio. Beiträge; Metricool
2026; Sprout Social), und **die Obergrenze ist 6, nicht 7** — bei sieben Shorts
lässt sich „keine Bauform über die Hälfte" mit drei Bauformen nicht erfüllen.

→ Die Messungen, die Engpassrechnung und die Rubrikenverteilung stehen in
`.claude/skills/woche-bauen/references/takt.md`.

Die **Materialgrenze** für Aktuelles: Neue **Geräte** sind durch
Herstellerankündigung (beteiligt) und Presse (nicht eintragbar) belegt und
fallen aus. Neue **Regeln, Normen und Grenzwerte** sind durch Behörden belegt —
nur die gehen. Das klingt nach Einschränkung und ist der Vorteil: Über ein neues
Handy berichten hunderttausend Kanäle am selben Tag; dass ein Recht auf
Reparatur gilt, erzählt niemand.

### Der Sonntagslauf

`de.ganzakkurat.wochenlauf` stellt **sonntags um 10:00** die fünf Videos der
Folgewoche bereit: Woche zusammenstellen, vertonen, rendern, Freigabeseite
öffnen, Mitteilung schicken. Er plant nichts ein.

**Die drei Sonntagszeiten sind eine Kette, und die Reihenfolge ist ihr Grund:**

| | | |
|---|---|---|
| **8:30** | `rueckblick` | trägt die Zahlen aller drei Kanäle nach |
| **9:00** | `kanalwoche` | wertet aus, was die letzte Woche getan hat |
| **10:00** | `wochenlauf` | wählt daraufhin die nächste |

Wer die nächste Woche wählt, soll wissen, was die letzte getan hat — und wer
auswertet, braucht die Zahlen von heute, nicht die von gestern. **Der tägliche
Rückblick lief bis zum 06.09.2026 um 9:30 und damit nach der Auswertung**; das
fiel erst auf, als die Zeiten vorgezogen wurden.

**Vorgezogen wurden sie am 06.09.2026 auf Ansage**, nachdem der erste Sonntag von
selbst durchgelaufen war — 9:00 und 10:00 statt 11:30 und 12:00. Davor stand dort
12:07, begründet damit, dass um 12:00 das Sonntagsvideo sendet; das galt dem von
Hand gelegten Plan einer einzigen Woche, und seit `SENDEPLAETZE` steht der
Sonntagsplatz auf 18:00. **Eine Ausnahme, deren Fall es nicht mehr gibt, ist
keine Ausnahme.**

**Der Mac wird dafür nicht geweckt, und das ist entschieden.** Er schläft nach
einer Minute; ein Aufweckplan (`pmset repeat wakeorpoweron`) würde ihn hochholen,
aber bei zugeklapptem Deckel im Akkubetrieb lässt macOS das nicht zu — die
Zuverlässigkeit hinge daran, ob das Netzteil steckt. `launchd` holt einen
verpassten Termin beim nächsten Aufwachen nach, und **die Woche muss nicht um
zwölf fertig sein, sondern vor Montag 18 Uhr.** Wird es einmal knapp, ist der
Ausweg ein Aufruf von Hand (`skripte/sonntagslauf.sh`), nicht der Aufweckplan.

**Das ist die einzige Vertonung, die ohne vorherige Zusage läuft** — rund 3.600
Zeichen je Woche. Findet die Auswahl keine gültige Woche, bricht der Lauf ab,
**bevor** etwas bezahlt ist.

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
| **Messen** | `de.ganzakkurat.rueckblick` | sonntags 8:30 |
| **Auswerten** | `de.ganzakkurat.kanalwoche` | sonntags 9:00, nach dem Messen |
| **Bereitstellen** | `de.ganzakkurat.wochenlauf` | sonntags 10:00, die fünf der Folgewoche |
| **Nachlegen** | `de.ganzakkurat.nachlegen` | sonntags 11:00, nach dem Lauf |

**Alle vier laufen sonntags, und das ist eine Ansage vom 06.09.2026:** *„Ich
will, dass dieses Projekt zukünftig immer nur am Sonntag stattfindet."* Zwei
Dienste sind dafür umgezogen — der Rückblick von täglich 8:30 und das
Nachlegen von täglich 19:15.

**Der Preis steht daneben, damit ihn niemand später sucht.** Der tägliche
Rückblick hatte einen Grund: YouTube Analytics verbucht mit ein bis drei Tagen
Verzug, und der Verlauf auf der Kanalseite bekommt ohne tägliche Punkte
Lücken. Jetzt gibt es eine Messung je Woche, und die Kurve zeigt Wochenpunkte.
Das Nachlegen lief 19:15, weil der Sendeplatz 18:00 ist und danach ein Platz
frei wird; bei fünf Videos je Woche geht die Rechnung trotzdem auf — Buffer
nimmt zehn geplante Beiträge je Kanal, die Vorwoche ist sonntags gesendet,
also stehen fünf Plätze für fünf neue frei.

**Die Reihenfolge ist der eigentliche Inhalt:** messen, auswerten, wählen,
einlegen. Nachlegen um 11:00 kommt nach dem Wochenlauf um 10:00 — umgekehrt
legte der Dienst nach, was es noch nicht gibt.

**Und alle drei Dienste, die ins Netz gehen, laufen über
`skripte/mit-netz.sh`.** Am 06.09.2026 startete der Rückblick um 09:36 und
brach sofort mit „✗ fetch failed" ab: `launchd` holt einen verpassten Termin
nach, sobald der Mac wach ist — und startet den Job, **bevor das WLAN steht.**
Der Dienst hatte funktioniert, seine Zahlen waren trotzdem zwei Tage alt. Das
Skript wartet bis zu fünf Minuten auf eine Verbindung und fasst bei einem
Fehlschlag genau einmal nach.

**Dabei ist eine ältere Diagnose gefallen.** `launchctl print` zeigte für drei
Dienste `runs = 0`, und ich habe das zweimal als „hat sich nie ausgelöst"
gelesen. **Der Zähler wird beim Neuladen zurückgesetzt** — und die drei waren
am selben Tag neu geladen worden. Die Logdateien in `/tmp/ganzakkurat-*.log`
zeigten alle vier am selben Tag gelaufen. Eine Zahl, die bei jedem Handgriff
auf null springt, misst den Handgriff und nicht den Dienst.

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

Drei Umbauten haben den Kanal zu dem gemacht, was er ist: **zwei Stimmen** ab
dem 25.08.2026, die **Show** mit Vorhang und Kaltstart ab dem 31.08., und ab
dem 02.09. schreibt Claude die Dialoge. **Kein Video im einstimmigen Bau
entsteht noch**, und die Zahlen im Rücklauf stammen überwiegend aus jener Zeit.

→ `docs/umbauten.md` hat das Protokoll: wie es dazu kam, was gemessen wurde und
welche Regel an welchem Tag gefallen ist.
## Arbeitsweise

**Die Aufgabenliste gehört ans Ende jeder Antwort**, solange etwas offen ist —
aus `AUFGABEN.md`, Erledigtes durchgestrichen, die laufende Aufgabe mit `▸`.
Nicht in die Statuszeile: die gehört Emirhan.

**Erst zu Ende besprechen, dann bauen.** Nach einem bestätigten Einzelpunkt
sofort loszubauen hat sich als falsch erwiesen — die Umsetzung kommt gesammelt.

**Dialoge werden nicht einzeln vorgelegt. Der Prüfstein ist die
Freigabeseite.** Emirhan sieht fünf fertige, vertonte Videos — vorher nichts.
Bis dahin schreibe ich, prüfe mit `npm run pruefen`, `npm run dialogprobe` und
**beiden** Subagenten, und behebe selbst, was sie finden.

**Der alte Ablauf hatte einen Zweck, und der ist erfüllt.** In Durchgang 4 wurde
jeder Dialog vorgelegt, weil aus jeder Korrektur ein Befund werden sollte:
118 Befunde, zwölf Szenarien mit je vier Beispielen, zwei Prüfagenten. Sein
Einwand am 06.09.2026: *„Wofür haben wir dann sonst die Skills angefertigt und
die Struktur aufgebaut?"* — **ein Werkzeug, das man nur benutzt und trotzdem
gegenlesen lässt, spart nichts.**

Und es funktioniert: Der einzige Fehler der ersten automatisch gebauten Woche —
Watti sagt „kleiner" zu Volti — ist ihm **an der Freigabeseite** aufgefallen, am
fertigen Video, nicht am Dialogtext. Genau dort gehört die Kritik hin.

**Die Methode ist das Ergebnis, nicht die Regeln.** Jede Runde legt einen
**Weg** dazu, keine Regel obendrauf — *„damit du so viele Wege wie möglich hast,
wodurch keine Schablone entsteht."* Und: **Widersprechen sich eine Regel und
eine gute Zeile, verliert die Regel.** Einzige Ausnahme ist die Belegpflicht,
und die ist an diesem Tag nicht gefallen, sondern von der Szene auf die
behauptende Zeile gewandert.

**Wenn eine Größe messbar ist, gehört sie gemessen und nicht begründet.** Das
ist die Regel, die dieses Projekt am häufigsten gerettet hat: bei
`ZEICHEN_PRO_SEKUNDE`, bei der Denkpause, bei der Videolänge, bei der Tonhöhe
der Stimmen. Und die Begründung, warum sich etwas angeblich nicht messen lässt,
ist das verdächtigste Bauteil überhaupt.
