# Offene Punkte am Inhalt

Stand 12.08.2026, nach Durchsicht des Laufs `2026-08-12` (Thema
`dock-kein-bild`, fünf Shorts). Pipeline und Gestaltung sind in Ordnung — die
Kritik betrifft ausschließlich **was** die Videos erzählen, nicht wie sie
gebaut oder gerendert werden.

**Stand 12.08.2026, Abend:** Alle vier Punkte sind besprochen und entschieden.
Im Code steht bisher nur Punkt 3 (Rubriken). Punkt 1, 2 und 4 sind
beschlossen, aber **noch nicht gebaut** — die Umsetzung kommt gesammelt in
einem Rutsch. Die Aufgabenliste dafür steht am Ende dieses Dokuments.

## 1 Das Betriebssystem bleibt ungenannt — **entschieden am 12.08.2026**

Man sieht einem Video nicht an, ob es um macOS oder Windows geht. Der Zuschauer
kann also nicht entscheiden, ob ihn das Video überhaupt betrifft.

Die Quellenlage ist dabei nicht in allen fünf Shorts gleich — pauschal „die
Quellen sagen macOS" stimmt nicht:

| Short | Quellen | System |
|---|---|---|
| 01 | VESA, Plugable, Apple-Fehlerbehebung | überwiegend systemneutral |
| 02 | Apple MacBook Air, Plugable, **Dell** | gemischt, Dell ist Windows-Kontext |
| 03 | 3× DisplayLink/Synaptics, davon 2× macOS | macOS |
| 04 | Apple-Fehlerbehebung, Plugable, VESA | überwiegend systemneutral |
| 05 | Apple MacBook Air, 2× DisplayLink macOS | macOS |

Das heißt: Ein Short lässt sich nicht einfach als „macOS" beschriften, ohne
dass die Belege es tragen. Und Belege austauschen ist nicht frei — jeder Short
hat genau drei, und `beleg` verlangt drei offizielle (`src/pruefung.ts`). Wer
bei Short 02 die Dell-Quelle streicht, um ihn eindeutig macOS zu machen, bricht
sofort die Prüfung.

### Beschlossen

**Ein Feld `system` am Short**, vier Werte:

| Wert | Bedeutung |
|---|---|
| `macos` | gilt nur für Mac |
| `windows` | gilt nur für Windows |
| `beide` | Systembezug vorhanden, beide sind geprüft |
| `ohne` | es gibt gar keinen Systembezug |

`beide` und `ohne` sehen ähnlich aus und sind es nicht: Die Powerbank im
Handgepäck kennt kein Betriebssystem — eine Systemangabe wäre dort nur
Rauschen. Bei einem Dock-Video dagegen ist „gilt für Mac **und** Windows" eine
Aussage, die geprüft sein will.

**Sichtbar wird es in der Hook-Pille**, nicht in der Kopfzeile. Das Feld dafür
existiert bereits (`SzeneHook.kontext`, heute „USB-C am Notebook" → künftig
„USB-C am MacBook"). Die Kopfzeile ist mit Wortmarke, Rubrik-Pille und
KI-Stimme schon voll.

**Im Titel nur, wenn das Video systemspezifisch ist** (`macos` oder
`windows`). Sonst stünde in jedem zweiten Titel ein Wort, das keine Neugier
erzeugt.

**Harte Prüfung:** Bei `macos` oder `windows` muss mindestens eine Quelle
systemspezifisch sein. Sonst behauptet das Video eine Systemgrenze, die die
Belege nicht tragen — genau der Fall bei Short 02, dessen dritte Quelle von
Dell kommt. Das ist faktisch begründet, nicht geschmacklich, darf also hart
sein. Kostet ein neues Feld in `quellen.json`.

Zum Einwand „macOS im Titel halbiert die Zielgruppe": Es verdoppelt die
Relevanz für die andere Hälfte. Bei Shorts zählt Verweildauer, nicht
Reichweite — wer nach zwei Sekunden merkt „betrifft mich nicht", schadet dem
Video mehr, als der Aufruf genützt hat. Und `beide` ist ein Verkaufsargument,
das man aussprechen sollte statt es zu verschweigen.

## 2 Titel sprechen niemanden an — **entschieden am 12.08.2026**

Aktuell beschreibend statt ansprechend:

| Short | heute (YouTube-Titel) |
|---|---|
| 01 | Dock lädt, aber kein Bild? Das ist der Grund |
| 02 | Warum „Dual Display" am Dock nichts garantiert |

Der Ton, der gemeint ist — Emirhans eigene Beispiele:

> Innerhalb von 20 Sekunden realisieren, dass du doch kein neues Dock brauchst
> Dock lädt, aber kein Bild: Dein Monitor ist nicht kaputt
> WLAN bricht abends ein: Deine Leitung ist nicht schuld

### Der Hebel ist Entwarnung, nicht Konfrontation

Der erste Versuch ging in die falsche Richtung: „Du lädst falsch", „Dein Dock
lügt dich an" — das sind **Beschuldigungen**. Emirhans Beispiele sind
**Entwarnungen**, und die sind aus drei Gründen stärker:

1. Sie beantworten die Frage, die der Zuschauer wirklich hat — nicht „wie
   funktioniert das", sondern *„muss ich jetzt Geld ausgeben?"*
2. Sie machen ihn nicht zum Deppen, sondern nehmen ihm etwas ab.
3. Sie reißen ein Loch auf: Wenn nicht das — **was dann?** Da bleibt man.

Humor entsteht aus der trockenen Zuspitzung, nicht aus Pointen.

### Die drei Muster

Alle drei sind gültig, je Video wird eines gewählt. Vorgeschlagene Bezeichner:
`verdaechtiger`, `uhr`, `zweisatz`.

**1 · Der falsche Verdächtige** (`verdaechtiger`)
Das, was der Zuschauer verdächtigt, ist unschuldig — also gibt es einen echten
Täter, und den nennt das Video.

```
Hook    Deine Leitung ist nicht schuld.
Titel   WLAN bricht abends ein: Deine Leitung ist nicht schuld
Hook    Dein Monitor ist nicht kaputt.
Titel   Dock lädt, aber kein Bild: Dein Monitor ist nicht kaputt
```

**2 · Die Ersparnis mit Uhr** (`uhr`)
Eine kurze Prüfung, an deren Ende eine Ausgabe wegfällt. Der Zuschauer setzt
20 Sekunden gegen 90 Euro.

```
Hook    20 Sekunden. Dann weißt du es.
Titel   In 20 Sekunden: Du brauchst kein neues Dock
```

**3 · Die trockene Feststellung** (`zweisatz`)
Zwei Sätze, die sich widersprechen. Der Widerspruch ist die Pointe.

```
Hook    Dein Dock kann zwei Monitore.
        Dein Notebook wusste davon nichts.
Titel   Dein Dock kann zwei Monitore. Dein Notebook nicht.

Hook    Dein Router steht im Schrank.
        Funkwellen finden das nicht witzig.
Titel   Dein Router steht im Schrank. Das ist das Problem.
```

### Hook und Titel gehören zusammen

Die eigentliche Regel, die für alle drei Muster gilt: **Die Hook ist die kurze
Hälfte, der Titel trägt den Kontext mit.** Im Bild sieht der Zuschauer die
Situation ohnehin, im Feed nicht. Deshalb „Dein Monitor ist nicht kaputt" im
Bild, aber „Dock lädt, aber kein Bild: Dein Monitor ist nicht kaputt" als
Titel.

Das ist wichtiger als der Titel allein: Bei Shorts läuft das Video im Feed von
selbst — die ersten drei Sekunden Bild entscheiden, nicht die Titelzeile.

### Welches Muster wann

Die Muster ordnen sich fast von selbst den Macharten zu, weil jedes eine
Voraussetzung braucht: **Der Zweisatz braucht einen Widerspruch, der
Verdächtige einen Täter, die Uhr eine Handlung.**

| Machart | Muster |
|---|---|
| Diagnose, Reihenfolge, Mythos | `verdaechtiger` |
| Entlarvung, Haken, Verwechslung, Umrechnung, Grenzwert, Vorschrift, Kompromiss | `zweisatz` |
| Selbsttest, Kaufberatung, Notlösung | `uhr` |
| Übersehener Punkt | `verdaechtiger` oder `zweisatz` |

Das ist eine **Empfehlung, keine Prüfung**. Alle harten Regeln im Projekt sind
rechtlich oder faktisch begründet, nie geschmacklich — das soll so bleiben.
Prüfenswert ist nur die Wiederholung: Wenn alle fünf Shorts einer Woche
denselben Bau haben, klingt der Kanal nach Schablone. Ein Hinweis ab drei
gleichen Mustern je Lauf würde reichen.

### Zu Clickbait

Die Frage kam auf und die Antwort ist: **Der Ton darf alles, die Tatsache muss
stimmen.** Zuspitzen und Neugier erzeugen ist kein Clickbait, sondern gutes
Schreiben. Das Problem ist nur, etwas zu versprechen, was das Video nicht hält
— und zwar aus einem technischen Grund, nicht aus Moral: **Bei Shorts gibt es
keinen Klick.** Das Video läuft im Feed von selbst. Es gibt nichts zu „baiten";
die Währung ist, ob jemand nach zwei Sekunden weiterwischt. Ein Titel, der
mehr verspricht als das Video hält, gewinnt nichts und kostet Wiedergabedauer.
Bei einem 20-Minuten-Video wäre die Rechnung eine andere.

Die Grenze verläuft deshalb an der Tatsache, nicht am Ton:

| | |
|---|---|
| geht | Kauf kein neues Dock. Es liegt nicht am Dock. |
| geht nicht | Der Fehler, den 90 % machen ← Zahl frei erfunden |
| geht nicht | Dieser Trick behebt jedes Bildproblem ← schlicht falsch |

Beide unteren scheitern nicht daran, dass sie reißerisch sind, sondern daran,
dass keine Quelle sie trägt.

Zu beachten: „dein MacBook" ist ausdrücklich erlaubt — Gerätehersteller stehen
bewusst nicht in `ZUBEHOERMARKEN`, weil das der Kontext des Zuschauers ist und
keine Empfehlung (siehe CLAUDE.md, Regel `produktname`).

**Verworfen:** ein viertes Muster, bei dem Hook und Titel bewusst verschiedene
Register bedienen (Hook beruhigt, Titel provoziert). Zwei Formulierungen je
Video, die zueinander passen müssen — zu viel Handarbeit für den Gewinn.

## 3 Die fünf Shorts sind zu oberflächlich — **entschieden am 12.08.2026**

**Gelöst durch feste Rubriken.** Ein Wochenlauf ist nicht mehr ein Thema mit
fünf Zugriffen, sondern fünf unabhängige Themen — eines je Rubrik:

| Rubrik | trägt | Abgrenzung |
|---|---|---|
| Schreibtisch | Monitore, Docks, Kabel, Strom, Ton, Ergonomie | Das Gerät steht, nichts wird eingepackt |
| Unterwegs | Akku, Laden, Tethering, Rucksack, fremde Steckdosen | Alltagsweg im Inland, es geht um Ausdauer |
| Reise | Flug, Handgepäck, Wattstunden, fremde Netze, Roaming | **Eine Vorschrift oder Landesgrenze entscheidet mit** |
| Zuhause | WLAN, Router, Fernseher, Streaming, Netzwerk | In der Wohnung, nicht am Arbeitsplatz |
| Kaufen | Kaufhilfe, Gebrauchtkauf, Garantie, Reparatur | Einziger Sendeplatz mit Partnerlinks |

Die Liste ist **geschlossen** (`Rubrik` in `src/typen.ts`). Wer eine sechste
braucht, hat kein neues Thema, sondern ein falsch zugeschnittenes. Die Prüfung
`rubrik` verlangt jede genau einmal je Lauf.

Nebenwirkung, die zählt: `kaufen` als fester Sendeplatz macht Variante A des
Werbemodells sauber — ein Video pro Woche mit Label, vier ohne, und der
Zuschauer lernt, welches.

Der ursprüngliche Befund, zur Erinnerung:

Sie greifen je einen kleinen Aspekt heraus. Fünf verschiedene Macharten sind
erfüllt, aber die Substanz je Video ist dünn — es bleibt beim Anreißen.

Genau genommen sitzen sie nicht einmal alle auf derselben Technik: 01, 02 und
04 handeln von DisplayPort Alt Mode, 03 und 05 von DisplayLink — das ist
Bildkompression über USB, etwas anderes. Für den Zuschauer ist das eine
Klammer („Dock, kein Bild"), technisch sind es zwei.

`winkelart` und die Fünferregel erzeugten formal genau das, was hier zu wenig
war: fünf Zugriffe auf **ein** Thema. Offen bleibt davon nur noch, ob ein Short
**länger** werden muss — die Rubriken lösen die Breite, nicht die Tiefe je
Video.

## 4 Werbung und Produkte passen nicht ins Layout — **entschieden am 12.08.2026**

Erwartet war, dass Produkte im Video **gezeigt** werden. Das schien im
Widerspruch zu zwei tragenden Regeln zu stehen:

- **`produktname`** — im Video fällt nie ein Markenname, nur Merkmale
  (`ZUBEHOERMARKEN` in `src/pruefung.ts`, harte Prüfung). Achtung: Die Prüfung
  läuft nur über `short.szenen`. **Titel und Beschreibung prüft sie nicht** —
  dort würde ein Markenname ohne Warnung durchgehen. Das ist bei Punkt 2
  wichtig, weil neue Titel gerade in die Richtung „Gerät benennen" gehen.
- **Gestaltungsregel** — alles Sichtbare ist selbst erzeugte Vektorgrafik, keine
  Herstellerbilder oder Produktfotos. Grund war Lizenz- und Markenrecht.

### Der Widerspruch war kleiner als gedacht

`produktname` liefert ihre eigene Auflösung mit. Die Begründung in CLAUDE.md
lautet: *„Nennt das Video ein Produkt, bewirbt es und braucht die
Kennzeichnung im Bild."* Das ist kein Verbot, sondern eine **Bedingung** — die
Regel existiert, um die Kennzeichnungsfrage zu umgehen. Umgekehrt gilt
genauso: **Wer ohnehin kennzeichnet, darf nennen.**

Vor allem aber sind „Produkte zeigen" zwei verschiedene Dinge:

| | wo erlaubt | Kennzeichnung |
|---|---|---|
| **Zeigen** — ein generisches, gezeichnetes Gerät mit echten Merkmalen | alle fünf Rubriken | keine nötig |
| **Benennen** — ein konkretes Modell empfehlen, mit Link | nur Rubrik Kaufen | Label im Bild |

Das erste ist keine Werbung, sondern Illustration. Praktisch heißt das:
**Produkte in allen fünf Videos**, nur der Markenname bleibt auf einen
Sendeplatz beschränkt.

Nebenbei: Auch ohne Partnerkonto darf ein Produkt gezeigt werden — eine
redaktionelle Empfehlung ohne Gegenleistung ist keine kommerzielle
Kommunikation. Unsere Regel war von Anfang an strenger als das Gesetz, als
Vorsicht gedacht und nicht als Pflicht. Die ohnehin vorgesehene anwaltliche
Auskunft sollte das mit abdecken.

### Woher die Bilder kommen: selbst gezeichnet, flächig

Entschieden gegen:

- **Eigene Fotos.** Emirhan wird ausdrücklich nicht fotografieren („da werde
  ich keine Mühe reininvestieren"). Alles soll aus der Pipeline kommen.
- **KI-generierte Bilder.** Ein Bildmodell erfindet technische Details —
  Buchsen, die es nicht gibt, Stecker in falscher Form. Bei einem Kanal, der
  auf drei geprüften Quellen je Video steht, wäre ein erfundenes Detail im Bild
  **derselbe Fehler, den die Belegpflicht verhindern soll**, nur an einer
  Stelle, die niemand prüft.
- **Herstellerbilder / Amazon-Partnerprogramm.** Erst ab Partnerkonto, bindet
  alles an Amazon, und die Video-Einbettung ist ein Graubereich.

Entschieden für: **Eigenbau-Vektorgrafik im jetzigen flächigen Stil** — kein
Realismus, keine Schattierung, keine Perspektive. Das bleibt beim Design, das
ohnehin gefällt, und ist sofort möglich. Ich zeichne genau die Buchsen, die im
Datenblatt stehen, und keine mehr.

Konkrete Bausteine, die dabei entstehen sollen:

- **Anschlussleiste** — die Rückseite eines Docks in echter Proportion, jede
  Buchse als das, was sie ist, beschriftet. „Worauf du achtest" wörtlich im
  Bild statt als Textliste.
- **Merkmalskarte** — ein gezeichnetes Gerät mit zwei bis drei Anmerkungen:
  Pfeil auf die Buchse, daneben das Merkmal. Die gezeichnete Entsprechung zur
  `kaufkriterien`-Szene, die heute reiner Text ist.
- **Größenvergleich** — zwei Geräte maßstabsgetreu nebeneinander mit ihren
  Kennzahlen. Für die Rubrik Reise die naheliegendste Form.

### Die Folge, die endgültig ist

Ohne eigene Fotos wird nie etwas selbst benutzt. Damit bleibt
`produktionsregel` dauerhaft in Kraft: **„Test" ist für diesen Kanal für
immer ausgeschlossen**, es bleibt bei „Vergleich", „Kompatibilitätscheck" und
„Kaufhilfe". Bewusst so entschieden — die Stärke des Kanals ist die belegte
Aussage, nicht die Erfahrung.

## Was ausdrücklich bleibt

Gestaltung und Design gefallen. Die Pipeline steht und soll nicht angetastet
werden — die Kritik zielt auf den Inhalt, den sie transportiert.

Das betrifft den **Takt** (fünf Veröffentlichungen je Woche, ein Video je
Werktag). Dass die fünf aus *einem* Thema kommen, gilt seit dem 12.08.2026
nicht mehr — siehe Punkt 3.

---

# Aufgabenliste für die Umsetzung

Stand 13.08.2026, nach der Umsetzung. Was abgehakt ist, steht im Code und ist
mit einem grünen `npm run pruefen` belegt.

**Datenvertrag (`src/typen.ts`)**

- [x] `Titelmuster`-Enum: `verdaechtiger`, `uhr`, `zweisatz`; Feld am Short
- [x] `System`-Enum: `macos`, `windows`, `beide`, `ohne`; Feld am Short
- [x] `Quelle` bekommt ein Systemfeld, damit die Belegprüfung greifen kann
- [x] Empfehlungstabelle Machart → Titelmuster als Kommentar (`MATRIX`)
- [x] *Dazugekommen:* `Vertiefung`-Enum, `merksatz`, `quelleId` je Szene,
      `Quelle.belegt` mit wörtlichen Zitaten, drei neue Szenenarten

**Prüfung (`src/pruefung.ts`)**

- [x] Hart: `system` auf `macos`/`windows` verlangt mindestens eine
      systemspezifische Quelle
- [x] Hart: `produktname` nur noch, wenn `werbung !== 'video'`
- [x] Hart: `produktname` zusätzlich über `short.texte`
- [x] Hinweis: ab drei gleichen Titelmustern je Lauf
- [x] Nichts Geschmackliches hart gemacht
- [x] *Dazugekommen:* Vertiefung 3 von 5 und Kaufen immer, Zahl im Bild,
      Länge zweistufig und schon vor der Vertonung, Rotation und
      Themenwiederholung über `daten/verlauf.json`

**Video (`video/`)**

- [x] Drei neue Szenenarten: `fehlspur`, `herleitung`, `einschraenkung`
- [ ] **Hook-Pille trägt die Systemangabe, wenn `macos` oder `windows`**
      — das Feld steht im Vertrag und wird geprüft, ist aber im Bild noch
      unsichtbar. Fällt derzeit nicht auf, weil alle fünf Shorts `ohne`
      tragen; beim ersten systemspezifischen Thema wäre es ein stiller
      Ausfall.
- [ ] **Neue Bausteine: Anschlussleiste, Merkmalskarte, Größenvergleich**
      — die einzige der vier Grundsatzentscheidungen vom 12.08.2026, die
      noch gar nicht umgesetzt ist. Der Lauf meldet den Mangel selbst:
      „Szenenart `aussage` kommt in 4 von 5 Shorts vor."
- [ ] Flächiger Stil, keine Schattierung, keine Perspektive

**Inhalt**

- [x] Je ein Short für alle fünf Rubriken, jeder mit drei geprüften Quellen
- [x] Titel und Hooks auf die drei Muster
- [x] Quellen recherchiert und wörtlich geprüft (33 Zitate, 0 Beanstandungen)

**Offen geblieben**

- **Deutsche Stimme.** `skripte/wochenlauf.ts` fällt ohne
  `ELEVENLABS_VOICE_ID` auf eine englische Standardstimme zurück. Der
  Free-Tarif gibt über die API keine deutschen Stimmen her — das klärt sich
  mit dem Tarifwechsel, aber die Stimme muss danach ausgewählt und in `.env`
  eingetragen werden.
- **ElevenLabs-Tarif.** Bedarf rund 27.800 Zeichen im Monat. Free scheidet
  schon wegen der fehlenden kommerziellen Lizenz aus, Starter läge bei 93 %
  Auslastung ohne Puffer. Empfohlen: Creator.
- **Der ganze Weg nach draußen ist mit dem neuen Stand nie gelaufen.**
  R2-Ablage, Buffer-Einplanung und Veröffentlichung sind seit dem Umbau
  nicht mehr durchgetestet worden — nur die Prüfungen davor.
- Der Lauf `laeufe/2026-08-12` ist endgültig unbrauchbar: veraltet gerendert
  und unter der Free-Lizenz vertont. `veroeffentlichen.ts` weist ihn jetzt
  von selbst ab.
