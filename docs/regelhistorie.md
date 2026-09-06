# Wie die harten Regeln entstanden sind

Am 06.09.2026 aus `CLAUDE.md` hierher verschoben. **Der Vertrag hat die
Kurzfassung: eine Zeile je Regel mit ihrer Schwelle.** Hier steht, woran jede
gemessen wurde und welche Fassung vorher galt.

**Die geltenden Werte stehen im Code** — `src/pruefung.ts` und `src/typen.ts`
erzwingen sie. Weicht diese Datei davon ab, hat der Code recht; eine Zahl, die
an zwei Stellen steht, ist an einer veraltet.

**Gebraucht wird die Datei, wenn eine Regel geändert oder gestrichen werden
soll.** Fast jede hier war schon einmal anders, und die Begründung, warum sie
heute so lautet, ist der teuerste Teil daran.

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
