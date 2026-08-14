# SetupKlar

Automatisierte Shortvideo-Produktion. Entwurf → Vertonung → Render → Freigabe →
Veröffentlichung. Deutschsprachig, auch im Code: Bezeichner, Kommentare und
Ausgaben sind deutsch.

## Prüfen vor allem anderen

```
npm run pruefen           # tsc --noEmit && Schemaprüfung der Daten
npm run quellen-pruefen   # ruft jede Quellen-URL ab, sucht das Zitat
npm run belege            # stellt Sprechtext und Zitat nebeneinander
npm run sprechprobe       # misst die Sprechdauer, kostet kein Kontingent
npm run lauf              # Wochenlauf, ohne Ton (Szenenlängen geschätzt)
npm run lauf -- --mit-ton # kostet ElevenLabs-Kontingent
```

`sprechprobe` gehört vor jeden Lauf mit Ton. Sie spricht jede Szene mit der
deutschen Systemstimme von macOS (`say`) und rechnet die Standdauer mit
derselben Funktion aus wie der Renderer — gemessen wird nur die Sprechdauer.
Der Anlass: `ZEICHEN_PRO_SEKUNDE` in `src/zeit.ts` stand auf 15,0 und war nie
nachgemessen; real sind es 15,9. Der Reise-Short galt damit als 78,7 Sekunden
lang und war 70,4, also unter dem Zielfenster — sichtbar geworden wäre das
erst nach der Abrechnung bei ElevenLabs, und ein Wochenlauf kostet rund 6.300
Zeichen. Die Systemstimme klingt nicht wie ElevenLabs und soll es nicht; für
die Endabnahme bleibt die echte Tonspur zuständig.

`npm run pruefen` muss vor jedem Lauf grün sein. Die Schemaprüfung
(`skripte/schemapruefung.ts`) existiert wegen einer teuren Erfahrung:
`daten/beispiel-short.ts` ist die Standard-Prop der Remotion-Komposition und
wird in `calculateMetadata` **im Browser-Kontext** geparst. Reißt er das Schema,
bleibt Remotion in einem unerfüllten Promise stehen — der Render hängt ohne
Fehlermeldung, bis jemand abbricht. `tsc` sieht das nicht, weil TypeScript
Formen prüft und nicht Werte.

Geparkte Entwürfe (`blockierend: false`) erscheinen als Hinweis und ändern den
Exit-Code nicht. Eine Prüfung, die dauerhaft rot ist, liest bald niemand mehr.

## Datenvertrag

`src/typen.ts` ist der einzige Vertrag. Alles andere richtet sich danach.

**`rubrik`** — der Sendeplatz, eine **geschlossene** Liste von fünf
(`RUBRIKEN`): `schreibtisch`, `unterwegs`, `reise`, `zuhause`, `kaufen`. Je
Woche trägt jede Rubrik genau einen Short, einen je Werktag.

`unterwegs` und `reise` überlappen, wenn man sie als Orte denkt. Der Schnitt
läuft deshalb an der Frage: **Sobald eine Vorschrift oder eine Landesgrenze
mitentscheidet, ist es Reise** — sonst der Alltagsweg. `kaufen` ist der einzige
Sendeplatz, auf dem Partnerlinks vorgesehen sind (Variante A, siehe unten).

Die Rubrik steht am **Short**, nicht nur am Thema. Vorher holte der Renderer
die Kopfzeilen-Pille über die `themaId` aus `themen.json` und fiel still auf
„Setup" zurück, wenn er nichts fand — ein stiller Rückfall an einer Stelle, die
im fertigen Video sichtbar ist.

**`winkelart`** — eine von 14 Macharten (`WINKELARTEN`), je mit einer
Pflicht-Signaturszene. Die fünf Shorts eines Laufs müssen fünf *verschiedene*
Macharten haben; eine Dopplung ist ein Fehler auf jedem betroffenen Short.
Grund: Vielfalt entstand vorher nur aus gemischten Szenenbausteinen, nicht aus
verschiedenen Zugriffen — zwei Videos sagten faktisch dasselbe. Die Regel bleibt
auch neben `rubrik` sinnvoll: Sie verhindert fünf Diagnosen auf fünf
Sendeplätzen.

**`kennzeichnung.werbung`** — Dreiwert, kein Boolean:

| Wert | Bedeutung |
|---|---|
| `keine` | keine kommerziellen Verweise, kein Label |
| `beschreibung` | Partnerlinks nur in der Beschreibung, kein Label im Bild |
| `video` | Label wird ins Video eingebrannt (`video/Short.tsx`) |

**`Lauf`** ist 5 Shorts, einer je Rubrik. Ein `Thema` liefert seit dem
12.08.2026 **einen** Short, nicht fünf — das alte „ein Thema, fünf Zugriffe"
war die Ursache der Oberflächlichkeit: Wer aus einer Frage fünf Videos ziehen
muss, schneidet sie in fünf dünne Scheiben. Die `winkel` in `themen.json` sind
dadurch keine fünf Videos mehr, sondern Alternativen, aus denen eine gewählt
wird.

Das `Lauf`-Schema wird von **keinem Skript geparst** — laufweite Regeln gehören
deshalb in `laufweiteBefunde` in `src/pruefung.ts`, nicht in ein `superRefine`
auf `Lauf`. Eine Regel dort ist tote Regel.

Es gibt kein `produktnaehe` mehr — `winkelart` hat es ersetzt — und kein
`kontext` als freien Text mehr: daraus ist `rubrik` geworden.

## Harte Regeln (`src/pruefung.ts`)

Fehler halten einen Short zurück, Hinweise erscheinen nur in der
Freigabe-Übersicht.

- **`rubrik`** — jede der fünf Rubriken kommt im Lauf genau einmal vor. Geprüft
  wird beides: eine Rubrik doppelt **und** eine Rubrik fehlt. Nur die Dopplung
  zu prüfen ließe einen Lauf mit vier Shorts durchgehen.
- **`beleg`** — mindestens drei Quellen je Short, und `presse` zählt nie mit
  (`OFFIZIELLE_ARTEN`). Ein Fachartikel referiert bestenfalls das Datenblatt und
  altert schneller als die Spezifikation.
- **`produktname`** — im Video fällt nie ein Markenname (`ZUBEHOERMARKEN`), nur
  Merkmale. Das ist die Regel, die das ganze Modell trägt: Nennt das Video ein
  Produkt, bewirbt es und braucht die Kennzeichnung im Bild. Gerätehersteller
  (Apple, Dell) stehen bewusst nicht in der Liste — „dein MacBook" ist Kontext,
  keine Empfehlung.
- **`kennzeichnung`** — ein Partnerlink braucht „Werbung", „Anzeige" oder
  „Werbepartner" **in derselben Zeile**. Ein Sammelhinweis am Textende
  kennzeichnet den Link zwanzig Zeilen weiter unten nicht (LG Erfurt,
  23.11.2020). „Affiliate-Link" und „gesponsert" hat der BGH als unscharf
  verworfen (06.02.2014, I ZR 2/11).
- **`produktionsregel`** — kein Sprechtext behauptet eigene Produkterfahrung,
  kein Titel sagt „Test", solange nichts selbst benutzt wurde. Zulässig:
  „Vergleich", „Kompatibilitätscheck", „Kaufhilfe".
- Ein Verweis nach draußen (`VERWEIS_NACH_DRAUSSEN`) erzwingt
  `werbung: 'video'`. Die Regel gilt nur in diese Richtung — ein Label ohne
  Verweis ist die vorsichtige Wahl, kein Fehler.
- **`titel`** — der Titel **schließt die Lücke, die er selbst öffnet**, und
  sonst nichts. Prüfstein: Kann jemand, der nur den Titel sieht, sagen, wann
  ihn das betrifft? Ja → die Entwarnung reicht. Nein → das Fehlende gehört
  hinein, und je nach Fall ist das der **Kontext** („Am Gate zählt eine andere
  Zahl" — Flug? Powerbank?) oder die **Auflösung** („kein neues Netzteil" —
  sondern?). Wann was fehlt, sagt die Rubrik: Bei `reise` entscheidet ein Ort
  oder eine Vorschrift mit, der gehört immer in den Titel; wo das Gerät auf dem
  Tisch steht, erschließt sich der Kontext von selbst.
  Geprüft wird an den drei veröffentlichten Titeln (`texte[dienst].titel`),
  nicht am `arbeitstitel`: Er darf nicht der Hooktext sein, muss mindestens ein
  Sachwort tragen, das die Hook nicht sagt, und darf **nichts nennen, was im
  Video nicht vorkommt** — die Belegpflicht, auf den Titel angewandt. Dazu die
  Form des Titelmusters am `arbeitstitel` (`zweisatz` zwei Sätze,
  `verdaechtiger` eine Entlastung, `uhr` eine Zahl), sonst wäre `titelmuster`
  ein Feld ohne Wirkung, und die zwei prüfbaren Teile der Humor-Regel: kein
  Ausrufezeichen, kein Emoji, keine Konfrontation gegen den Zuschauer.
  **Die erste Fassung der Regel hieß „der Titel nennt die Sache" und war zu
  grob** — als Quote angewandt statt als Diagnose. Die Sache in jeden Titel zu
  zwingen nimmt ihm den Grund, angesehen zu werden: „Dein Monitor ist
  unschuldig, der Anschluss nicht" beantwortet die Frage schon im Titel.
  Einzelheiten in `produktionsmatrix.md`.

## Quellen

`daten/quellen.json`. Neue Quellen kommen erst hinein, **nachdem die URL
tatsächlich abgerufen und der Inhalt gelesen wurde** — nie aus dem Gedächtnis
und nie aus einem Suchtreffer-Ausschnitt. `geprueftAm` dokumentiert genau diesen
Abruf.

Seit dem 13.08.2026 ist diese Regel **nachprüfbar**: Jeder Beleg trägt ein
`zitat`, wörtlich von der Seite, und `npm run quellen-pruefen` holt die Seite
und sucht die Zeichenkette. `stuetzt` daneben ist die Folgerung in unseren
Worten und wird nicht geprüft.

**Die Prüfung fragt bewusst kein Sprachmodell**, sondern sucht stumpf. Beim
Bau am 13.08.2026 hatte ein Modell zwei Zitate als „exakt vorhanden" gemeldet,
die es nicht waren — es hatte Anführungszeichen weggeglättet. Ein Modell die
Behauptung eines Modells prüfen zu lassen ist keine Prüfung, sondern eine
zweite Meinung.

### Welche Quellen es gibt — und welche nicht (14.08.2026)

`QuellenArt` ist auf fünf Arten geschnitten, in zwei Rängen:

| Rang | Arten | Rolle |
|---|---|---|
| **unbeteiligt** | `standard`, `behoerde`, `rechtsprechung` | dürfen eine Aussage allein tragen |
| **beteiligt** | `hersteller`, `plattform` | autoritativ fürs eigene Datenblatt, interessiert am Rest |

**`presse` ist nicht mehr eintragbar**, nicht bloß heruntergestuft. Vorher
stand sie im Enum und war nur aus `OFFIZIELLE_ARTEN` ausgenommen — eine
Pressequelle durfte also in `quellen.json` stehen und über `quelleId` eine
Szene belegen, solange drei offizielle daneben die Zählung erfüllten. Die Zahl
stimmte, die konkrete Aussage hing am Fachartikel. Presse bleibt als
**Wegweiser** ausdrücklich erlaubt: lesen, zur Primärquelle folgen, die
Primärquelle zitieren. In `quellen.json` landet sie nie — und dass das nicht
an Vorsatz hängt, sondern am Enum, ist die Absicherung. Eine Regel, die sich
nicht ausdrücken lässt, lässt sich nicht brechen.

**`messung` ist raus**, weil sie per Konstruktion unerreichbar war: Die
`produktionsregel` verbietet Aussagen aus eigener Produkterfahrung, wir
benutzen also nie etwas selbst. Was wir messen — Sprechtempo, Bitrate — sind
interne Kennzahlen, keine Aussagen im Video.

**`rechtsprechung` ist dazugekommen.** Ein Urteil gilt anders als eine
Verordnung, und Kaufen braucht es regelmäßig.

**Mindestens eine unbeteiligte Quelle je Short** (`beleg`, Fehler). Die
Drei-Quellen-Regel zählte nur: Der WLAN-Short ging sauber durch und stand auf
TP-Link, TP-Link und Intel — „dein Router ist nicht zu alt", belegt vom
Routerhersteller. Er trägt jetzt die Allgemeinzuteilung der Bundesnetzagentur,
in der die gemeinsame Nutzung des Bandes ausdrücklich steht.

### `npm run belege` — die Prüfung, die kein Skript machen kann

`quellen-pruefen` beantwortet eine Frage: Steht das Zitat auf der Seite? Die
zweite beantwortet es ausdrücklich nicht — **trägt das Zitat den Satz, den wir
darauf bauen?** Das Feld heißt `stuetzt` und wird nie geprüft.

Dort sitzt der teuerste Fehler dieses Projekts: Am 14.08.2026 stand im
Kabel-Short eine Aussage, deren Quelle existierte, deren Zitat wirklich auf der
Seite stand — und die von keiner der drei Quellen getragen wurde. Falsch war
die Folgerung dazwischen. Kein Schema, keine Zeichenkettensuche und kein
zweites Modell hätte das gefunden.

`belege.html` stellt links den Sprechtext und rechts das wörtliche Zitat samt
Folgerung, mit Art und Herausgeber der Quelle. **Vor der Vertonung** — eine
falsche Folgerung, die erst in der Freigabe auffällt, ist schon bezahlt.

Praktische Folgen aus demselben Tag:

- **Zitate kurz halten**, 40–80 Zeichen, ohne Anführungszeichen im Zitat
  selbst. Lange Zitate brechen an Umbrüchen und Sonderzeichen.
- `abrufart: 'manuell'` ist für Seiten, die ihren Inhalt nachladen. Die beiden
  Apple-Supportseiten sind deshalb **entfernt** worden statt als geprüft
  geführt zu werden — sie liefern beim Abruf nur die Kopfzeile. Wer sie
  zurückholen will, öffnet sie von Hand und schreibt das Zitat ab.
- **Wer behaupten kann, muss belegen können** (`QUELLENPFLICHT` in
  `src/typen.ts`, seit 14.08.2026 die einzige Wahrheit darüber):

  | | Arten |
  |---|---|
  | Pflicht | `aussage`, `zahl`, `herleitung`, `einschraenkung`, `vergleich`, `warnung`, `merkmalskarte`, `anschluss`, `kaufkriterien` |
  | optional | `fehlspur`, `checkliste` |
  | ohne Feld | `hook`, `cta`, `endkarte` |

  Vorher hing die Belegdecke als Liste am Short — bei drei Quellen und sechs
  Aussagen konnte eine frei schweben. Dann trugen vier Arten ein Pflichtfeld,
  drei ein optionales, der Rest keins: gewachsen, nicht entschieden. Die Folge
  fand `npm run belege` am ersten Tag: Der Dock-Short sagt in einer
  `vergleich`-Szene „Alt Mode ist optional" — belegbedürftig, und im Vertrag
  gab es keine Stelle dafür. Die passende Quelle stand derweil in
  `quellenIds`, von keiner Szene benutzt, und zählte trotzdem auf die
  Drei-Quellen-Regel. Dasselbe Schlupfloch wie bei `presse`.

  `anschluss` sieht harmlos aus und ist es nicht: `bruchNach` behauptet, an
  welcher Verbindung die Kette reißt.

## Werbemodell — Phase 1 (Stand 12.08.2026)

**Zurzeit gar keine Werbung und keine Links, in keiner Beschreibung.** Für
Affiliate braucht es zuerst ein Kleingewerbe. Reihenfolge: Gewerbe →
Steuernummer → Bewerbung bei Amazon PartnerNet (dort werden Konten gekündigt,
die in 180 Tagen keine drei qualifizierten Verkäufe haben — Reichweite muss
vorher stehen).

Ab Partnerkonto gilt Variante A: nur der Kaufberatungs-Short trägt Partnerlinks
und dafür das Label im Bild; die anderen vier bleiben ganz ohne Links. Ob
Kennzeichnung allein in der Beschreibung für ein *Video* genügt, ist ungeklärt —
der Leitfaden der Medienanstalten behandelt den Fall nicht, YouTube empfiehlt
die Einblendung, eindeutige Rechtsprechung fehlt. Anwaltliche Auskunft ist
vorgesehen.

## Takt

Fünf Shorts pro Woche, **einer je Rubrik**, ein Video je Werktag um 18:00
(`src/buffer.ts`). Die Fünf kommt vom Takt der Werktage, nicht davon, wie viel
ein Thema hergibt.

## Länge

Zwei Zielfenster (`src/zeit.ts`), gekoppelt an die Vertiefung: **40–60 s ohne,
75–95 s mit**. Darüber liegt eine harte Grenze bei **100 s**, die ausnahmslos
gilt und einen Short zurückhält.

Die Obergrenze des tiefen Fensters stand bis zum 13.08.2026 auf 90 und ging
auf 95, weil die vertonte Länge stärker schwankt als angenommen. Zwei Dinge
sind dabei festgehalten worden:

**95 ist Spielraum, nicht das Ziel.** Die Absicht ist, die Länge über die
Wochen wieder zu drücken — aber durch Straffung, nie durch Weglassen von
Substanz. Das lässt sich nicht als Regel fassen: Eine Schwelle bei 88 wäre nur
die alte Grenze unter neuem Namen, und ein Dauerhinweis „könnte kürzer" wäre
nach drei Wochen unsichtbar. Stattdessen schreibt der Verlauf die vertonte
Länge mit, und der Lauf zeigt den Wochenschnitt neben dem der Vorwoche.
Erkennen muss man es selbst — ohne den Messwert kann man es gar nicht.

**Die vertonte Länge schwankt.** Derselbe Text ergab bei zwei Läufen 75,3 und
70,5 Sekunden; ElevenLabs liefert nicht zweimal dieselbe Aufnahme. Rund sechs
Prozent, also etwa fünf Sekunden. Wer an der Kante des Fensters baut, fällt
beim nächsten Lauf heraus — Zielwert ist deshalb die Mitte, nicht der Rand.

`npm run sprechprobe` prüft das vorab und kostet nichts.

## Stand und nächster Schritt

Die Pipeline steht bis einschließlich Veröffentlichung: Ablage auf Cloudflare
R2, Einplanung über Buffer, Zugangsprüfung (`npm run zugaenge`). Alle Zugänge
liegen in `.env` und sind mit einem echten Video durchgetestet.

`npm run buffer-probe` ist der Rauchtest dieser Kette: Er legt ein Video ab,
plant auf jedem Kanal einen Beitrag für Dezember 2027 und räumt beides sofort
wieder weg. Er braucht keine Vertonung — ein stumm gerendertes Video genügt,
weil die Kette geprüft wird und nicht der Inhalt. Am 13.08.2026 fand er drei
Dinge, die keine Prüfung davor sehen konnte, weil sie erst beim Anlegen
auffallen:

- **Jeder Dienst verlangt eigene `metadata`.** YouTube `title` und
  `categoryId` (28, Science & Technology), Instagram einen `type` (`reel`,
  nicht `post` — sonst landet das Hochformat im Raster). Ohne sie lehnt Buffer
  ab. Das betraf zwei von drei Kanälen.
- **`isAiGenerated` steht je Dienst**, nicht nur als `aiAssisted` am Beitrag.
  Das eine ist Buffers interne Notiz, das andere die Angabe, die die Plattform
  anzeigt — die Entsprechung zu `kennzeichnung.kiStimme`.
- **`deletePost` antwortet mit einer anderen Union als `createPost`**
  (`DeletePostSuccess | VoidMutationError`, ohne `post`). Mit den falschen
  Fragmenten schlug das Aufräumen fehl, und der Testbeitrag blieb im Konto
  stehen — an der einen Stelle, die dafür da ist, nichts zurückzulassen.

**Alle vier Punkte aus `offene-punkte.md` sind besprochen und entschieden
(12.08.2026). Im Code steht davon bisher nur die Rubrik-Umstellung.** Die
Aufgabenliste für den Rest steht am Ende von `offene-punkte.md` — dort
nachlesen, bevor irgendetwas an Themen, Titeln oder Produktdarstellung
geändert wird. Kurzfassung der Beschlüsse:

- **Titel und Hook** folgen einem von drei Mustern (`verdaechtiger`, `uhr`,
  `zweisatz`). Der Hebel ist **Entwarnung**, nicht Konfrontation — „Dein
  Monitor ist nicht kaputt", nicht „Du machst es falsch". Die Hook ist die
  kurze Hälfte, der Titel trägt den Kontext mit. Der Ton darf zugespitzt sein,
  die Tatsache muss von den Quellen getragen sein.
- **Humor ist keine vierte Zutat, sondern die Wendung** zwischen den zwei
  Hälften des Titels — und sie hängt am Titelmuster: `verdaechtiger` ist der
  Freispruch, `zweisatz` sind zwei Parteien, die verschieden rechnen, `uhr`
  ist die Deflation der großen Zahl durch die kleine. Drei Regeln: Die Pointe
  trifft nie den Zuschauer; trocken statt laut; und **der Witz muss belegt
  sein wie alles andere** — „Der Verkäufer hofft, dass du das glaubst" wäre
  lustig und eine unbelegte Behauptung über Absichten. Die Folge davon ist
  angenehm: Das Lustigste ist meistens die Tatsache, nüchtern hingestellt.
  Ausführlich in `produktionsmatrix.md`.
- **Systemangabe** über ein Feld `system` (`macos`, `windows`, `beide`,
  `ohne`), sichtbar in der Hook-Pille, im Titel nur bei echter
  Systemspezifik — und nur belegbar, wenn eine Quelle systemspezifisch ist.
- **Produkte werden gezeigt**, in allen fünf Rubriken: generisch, selbst
  gezeichnet, im jetzigen flächigen Stil. **Benennen** (Markenname, Link)
  bleibt auf die Rubrik Kaufen mit Label im Bild beschränkt.
- **Keine Fotos, keine KI-Bilder.** Ein Bildmodell erfindet Buchsen — das wäre
  derselbe Fehler, den die Belegpflicht verhindern soll, nur ungeprüft. Folge:
  Es wird nie etwas selbst benutzt, also bleibt `produktionsregel` dauerhaft
  und **„Test" ist für diesen Kanal endgültig ausgeschlossen**.

Die Zeichnungen stehen in zwei Kategorien (`video/bausteine/Geraete.tsx`):
`geraet` **muss dem Datenblatt entsprechen**, `symbol` setzt nur den Ort und
behauptet nichts. Welches Symbol zu einer Szene passt, schlägt
`src/illustration.ts` aus deren Text vor — als **Hinweis**, gesetzt wird im
Entwurf. Vorgeschlagen werden nur Symbole, nie Geräte: Ein automatisch
gesetztes Dock wäre eine technische Aussage ohne Beleg.

**Eine Zeichnung ist erst geprüft, wenn sie gerendert danebensteht.** Am
14.08.2026 sahen drei neue Symbole im Code plausibel aus und im Standbild
nicht: Die Steckdose las sich als Gesicht, der Kalender schrumpfte in einer
textreichen Szene zur Karte mit Streifen, die Nachbarhäuser hatten keine
Dächer und waren damit keine Häuser. Einzelheiten in `produktionsmatrix.md`.

**Arbeitsweise bei diesen Themen: erst zu Ende besprechen, dann bauen.** Nach
einem bestätigten Einzelpunkt sofort loszubauen hat sich als falsch erwiesen —
die Umsetzung kommt gesammelt.

**Kamera-Layer: probiert, verworfen (12.08.2026).** Ein `Kamera`-Baustein fuhr
in der Anschluss-Szene auf die Bruchstelle zu. Die Bewegung wirkte auch nach
Umbau auf gleichmäßige Kurven nicht flüssig genug und ist wieder entfernt.
Falls das Thema zurückkommt, die Messwerte von damals: `spring` in Remotions
**Voreinstellung** (`damping: 10`) erreicht in der Spitze das 2,95-fache seiner
Durchschnittsgeschwindigkeit, `Easing.inOut(sin)` nur das 1,57-fache; über etwa
1 % Bildänderung je Einzelbild wird eine Fahrt unruhig. Nicht gemessen wurde
`TEMPO.feder` aus `src/marke.ts` (`damping: 200`) — die ist stark überdämpft,
kann gar nicht überschwingen und wäre vermutlich brauchbar gewesen. Der
eigentliche Engpass war ohnehin die Szenenlänge: nach dem Bildaufbau bleiben
keine zwei Sekunden für eine Fahrt.

Geblieben ist ein dabei gefundener Fehler: Die Signalkette braucht bei drei
Geräten 1134 Pixel, die Bühne hat 1100 — die Beschriftung des letzten Geräts lag
in dem Bereich, den Reels mit der Beschreibung überdeckt. Sie skaliert sich
jetzt auf den verfügbaren Platz. Die Videos in `laeufe/2026-08-12` waren vor
dieser Korrektur gerendert — **der Lauf ist seit dem 13.08.2026 ohnehin
unbrauchbar**, weil seine Daten dem Datenvertrag nicht mehr entsprechen und die
Vertonung unter der Free-Lizenz von ElevenLabs entstand, die keine kommerzielle
Nutzung erlaubt.

Die Lücke, die dieser Fall aufdeckte, ist geschlossen:
`skripte/veroeffentlichen.ts` lud hoch, was im Ordner lag. Es prüft jetzt
zweierlei — ob die Shorts noch dem Schema entsprechen, und ob die Videodatei
jünger ist als alles in `video/`, `src/` und `daten/`. Ist sie das nicht, wurde
seit dem Render am Aussehen gearbeitet, und der Lauf muss wiederholt werden.

Zwei Fallstricke dabei, beide beim Bau gefunden und beide derselbe Denkfehler —
ein Schritt schreibt in etwas, das er selbst überwacht:

- **`daten/verlauf.json` ist von der Frischeprüfung ausgenommen.** Der
  Wochenlauf schreibt es *nach* dem Rendern; ohne die Ausnahme wäre jedes
  frische Video sofort veraltet und die Prüfung dauerhaft rot.
- **Nur ein Lauf `--mit-ton` schreibt den Verlauf fort.** Ein Trockenlauf ist
  eine Übung; wer ihn mitschreibt, verbrennt ein Thema, das nie erschienen ist.

Später denkbar für die Optik: **Detailzoom** in den Stecker (`@remotion/paths`,
`getPointAtLength`), `@remotion/three`, eigene Makroaufnahmen als Beleg-B-Roll.
Verworfen: LottieFiles (bricht das Eigenbau-Prinzip) und Rive (Interaktivität
ist bei gerendertem Video wertlos).

Welche Entwürfe im Lauf sind, steht in `daten/entwuerfe/index.ts` — in
`WOCHENLAUF` das, was läuft, in `GEPARKT` das, was noch nicht trägt. Geparktes
färbt die Prüfung nicht rot. Die Liste steht dort und **nirgends sonst**:
Wochenlauf, Schemaprüfung, Zugangsprüfung und Rauchtest ziehen alle daraus.
Bis zum 13.08.2026 hatte jedes Skript seine eigene, und sie waren
auseinandergelaufen — die Schemaprüfung kannte drei von fünf Shorts und meldete
grün. Doppelte Listen fallen nicht auf, weil jede für sich stimmig aussieht.

`powerbank-flug` stand lange in `GEPARKT`, weil es auf einer einzigen Quelle
(LBA) beruhte; seit dem 13.08.2026 tragen es drei Behörden aus drei
Rechtsräumen, und es ist im Lauf. `GEPARKT` ist zurzeit leer.
