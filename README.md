# Ganz akkurat

Automatisierte Shortvideo-Produktion für einen deutschsprachigen Technikkanal.
Von der Themenwahl bis zum eingeplanten Beitrag auf TikTok, Instagram und
YouTube läuft alles über eine Kette von Skripten; von Hand bleibt genau ein
Schritt, die Freigabe.

Deutschsprachig auch im Code: Bezeichner, Kommentare und Ausgaben sind deutsch.

*Ganz akkurat. Wir haben nachgelesen.*

## Was das Projekt löst

Ein Kanal mit Belegpflicht hat ein Mengenproblem. Jede Aussage in einem Video
braucht eine abrufbare Quelle mit wörtlichem Zitat, und beim Tempo von vier
Videos je Woche ist der Beleg der Engpass, nicht die Produktion. Die Kette hier
macht daraus einen Prüfschritt statt einer Fleißaufgabe:

- `daten/quellen.json` hält zu jedem Beleg das **wörtliche Zitat** und das
  Abrufdatum. `npm run quellen-pruefen` holt jede Seite und sucht die
  Zeichenkette — stumpf, ohne Sprachmodell.
- Jede Szene hängt nicht an einer Quelle, sondern an **einer Fundstelle**. Ohne
  diese Feinheit erbt ein ganzer Absatz den Belegstatus eines einzigen Satzes.
- `npm run belege` stellt Sprechtext und Zitat nebeneinander. Die Frage „trägt
  das Zitat diesen Satz?" kann kein Skript beantworten — sie bekommt deshalb
  eine eigene Ansicht und einen eigenen Subagenten (`.claude/agents/`).

## Aufbau

```
Themenwahl        Ideenvorrat mit Belegpfad, Formatzuordnung
Quellenarbeit     URL abrufen, lesen, woertliches Zitat eintragen
Entwurf           vier Positionen: Aufschlag, Zuspitzung, Kipppunkt, Nachschlag
PRUEFUNG          npm run pruefen — Typen, Schema und die harten Regeln
Sprechprobe       Laenge messen, ohne Kontingent zu verbrauchen
Vertonung         ElevenLabs, zwei Stimmen, Wort-Zeitstempel zurueck
Untertitel        wortgenau aus den Zeitstempeln der Sprachsynthese
Render            Remotion, 1080x1920, reine Vektorgrafik
FREIGABE          alle Videos in einer HTML-Ansicht, du gibst frei
Veroeffentlichung Cloudflare R2 -> Buffer -> TikTok, Reels, Shorts
```

Zwei Schritte sind bewusst nicht automatisiert. Die Belegprüfung, weil ein
Skript nicht beurteilen kann, ob ein Zitat eine Folgerung trägt. Und die
Freigabe, weil Werbe- und KI-Kennzeichnung persönliche Haftung sind.

## Die Prüfung ist der Kern

`src/pruefung.ts` und `src/typen.ts` sind zusammen rund 5.000 Zeilen und
tragen die eigentliche Arbeit. Alles, was ein Video zurückhalten kann, steht
dort als Code und nicht als Vorsatz:

| Regel | prüft |
|---|---|
| Beleg | mindestens eine unbeteiligte Quelle je Video; `presse` ist im Enum gar nicht erst vorgesehen |
| Belegpflicht nach Position | jede Behauptung auf Zuspitzung und Kipppunkt braucht eine Fundstelle |
| Aufbau | jede Position kommt vor, die Folge läuft nur vorwärts |
| Aufschlag | die erste Szene spricht höchstens 3,5 Sekunden, gemessen an echten Zeitstempeln |
| Länge | 20 bis 65 Sekunden hart, Zielwert je Bauform |
| Kennzeichnung | Partnerlink und Werbewort in derselben Zeile (LG Erfurt, 23.11.2020) |
| Zeitangaben | „seit gestern" wird abgelehnt: Ein Short bleibt im Feed, das Datum wandert |
| Zweistimmigkeit | mindestens zwei Szenen mit beiden Sprechern, mindestens eine Reaktion |

Die Prüfung läuft zusätzlich als **Stop-Hook** von Claude Code
(`.claude/settings.json`): Wenn sie rot ist, meldet sie sich am Ende jeder
Sitzung von selbst. Vorher lief sie erst im Wochenlauf — also *nachdem* die
Vertonung bezahlt war.

Die Schemaprüfung (`skripte/schemapruefung.ts`) gibt es aus einem konkreten
Grund: Remotion parst die Standard-Prop im Browser-Kontext. Reißt sie das
Schema, bleibt der Render in einem unerfüllten Promise stehen, ohne
Fehlermeldung. `tsc` sieht das nicht, weil TypeScript Formen prüft und nicht
Werte.

## Befehle

```
npm run pruefen           # tsc --noEmit und Schema- und Regelpruefung
npm run quellen-pruefen   # ruft jede Quellen-URL ab, sucht das Zitat
npm run belege            # stellt Sprechtext und Zitat nebeneinander
npm run sprechprobe       # misst die Sprechdauer, kostet kein Kontingent
npm run pausenprobe       # misst, wie lange die Stimme wirklich schweigt
npm run stimmproben       # Hoerproben mehrerer Stimmen
npm run regieprobe        # was eine Regieanweisung mit der Zeile macht
npm run vorschau          # Remotion-Studio, Szenen live bearbeiten
npm run lauf              # Wochenlauf als Trockenlauf — kostet nichts
npm run lauf -- --mit-ton # Wochenlauf mit echter Vertonung
npm run veroeffentlichen -- <lauf-id>            # Probelauf
npm run veroeffentlichen -- <lauf-id> --wirklich # wirklich einplanen
npm run rueckblick        # holt die Zahlen der veroeffentlichten Videos
npm run ausreisser        # was hatte dieses eine?
npm run laengen           # Laenge gegen Verweildauer
npm run zugaenge          # alle Dienste pruefen und sagen, was fehlt
```

Trockenlauf und Probelauf sind jeweils der Standard. Geld und geplante Beiträge
entstehen nur mit ausdrücklichem Schalter.

## Verzeichnisse

```
src/typen.ts        Der Datenvertrag. Was nicht validiert, wird nicht gerendert
src/pruefung.ts     Alle Regeln. Fehler halten zurueck, Hinweise nicht
src/stimme.ts       ElevenLabs, zwei Sprecher, Laeufe ueber Szenengrenzen
src/zeit.ts         Szenenlaengen aus echten Sprech-Zeitstempeln
src/marke.ts        Farbe, Schrift, Raster, sichere Zonen
src/ablage.ts       Cloudflare R2: Upload und oeffentliche URL
src/buffer.ts       Einplanung ueber die Buffer-GraphQL-Schnittstelle
src/rueckschau.ts   YouTube-Zahlen zurueck ins Projekt
video/              Remotion: Szenenvokabular, Figuren, Kamera, Komposition
daten/entwuerfe/    Die Shorts. index.ts sagt, was laeuft — und nur dort
daten/quellen.json  Quellen mit woertlichen Zitaten und Abrufdatum
daten/ideen/        Ideenvorrat je Format, jede Idee mit Belegpfad
daten/figur/        Die Rigs der beiden sprechenden Figuren
.claude/            Eigene Skills, Subagent und der Stop-Hook
CLAUDE.md           Der Arbeitsvertrag: jede Regel mit ihrer Begruendung
AUFGABEN.md         Was laeuft, was offen ist
```

## Bild

Keine Fotos, kein Stockmaterial, keine KI-Bilder. Alles Sichtbare ist
Vektorgrafik in Remotion — aus demselben Grund wie die Belegpflicht: Ein
Bildmodell erfindet Buchsen, und Herstellerfootage behauptet Technisches, ohne
dass eine Quelle daran hängt.

Die beiden sprechenden Figuren sind Akkuzellen mit einem datengetriebenen Rig
(26 Teile, 9 Gelenke, 10 Posen). `daten/figur/zeiger.ts` **leitet vom ersten Rig
ab, statt es abzuschreiben**: Ein zweites Rig von Hand wäre beim ersten Umbau
am Körper lautlos auseinandergelaufen — die Prüfung sähe zwei gültige Rigs,
nicht zwei verschiedene.

## Einrichtung

```bash
npm install
cp .env.example .env    # ausfuellen
npm run zugaenge        # sagt, was fehlt
npm run pruefen
```

Drei Dienste: ElevenLabs für die Vertonung, Cloudflare R2 für die Ablage,
Buffer für die Einplanung. Ohne Schlüssel laufen `pruefen`, `belege`,
`sprechprobe` und `vorschau` trotzdem.

## Wo die Regeln stehen

`CLAUDE.md` ist die wichtigste Datei des Projekts. Sie hält nicht nur, *was*
gilt, sondern zu jeder Regel, *warum* sie existiert und welcher Fehler sie
ausgelöst hat. Das ist Absicht: Eine Regel ohne Begründung wird beim nächsten
Umbau wegoptimiert.

Der Satz, der dabei am häufigsten getragen hat: **Wenn eine Größe messbar ist,
gehört sie gemessen und nicht begründet.** Er hat den Zeichendurchsatz der
Sprachsynthese korrigiert, die Länge der Denkpause, die Videolänge und den
Abstand zweier Stimmen. Die Begründung, warum sich etwas angeblich nicht messen
lässt, ist das verdächtigste Bauteil überhaupt.

## Lizenz

Code unter MIT. Marke, redaktionelle Inhalte und die zitierten Quellen sind
ausgenommen — siehe `LICENSE`.
