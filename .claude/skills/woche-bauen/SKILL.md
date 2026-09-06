---
name: woche-bauen
description: Eine Sendewoche produzieren und veröffentlichen — die Kette von der Prüfung über Sprechprobe, Vertonung und Render bis zur Freigabe und Einplanung bei Buffer. Nutze das beim Wochenlauf, vor `npm run lauf`, bei Fehlern in der Veröffentlichung, bei Fragen zu Buffer-Limits oder den Hintergrunddiensten.
---

# Eine Woche bauen

Die Reihenfolge ist nicht Geschmack. Jeder Schritt fängt Fehler ab, die eine
Stufe später Geld kosten.

**Vor Schritt „vertonen" `references/vertonung.md` lesen.** Dort steht seit dem
06.09.2026, was vorher im Vertrag stand: Modell und Regieanweisungen, die
beiden Stimmen und ihr Mindestabstand, die Sprecherpausen und
`tonspurNeuLegen`, dazu die Fehlerbehandlung des bezahlten Laufs. **Die
Kurzfassung dessen, was Geld kostet, bleibt im Vertrag** — was hier steht, ist
die Herleitung, nicht die Erlaubnis.

## Die Kette

```
npm run pruefen            # tsc + Schema + harte Regeln — muss grün sein
npm run quellen-pruefen    # jede URL abrufen, Zitat suchen
npm run belege             # Sprechtext neben Zitat, von Hand lesen
npm run sprechprobe        # misst die Sprechdauer, kostet nichts
npm run lauf               # Trockenlauf ohne Ton, Szenenlängen geschätzt
npm run lauf -- --mit-ton  # kostet ElevenLabs-Kontingent
                           # → Freigabe ansehen
npm run veroeffentlichen   # R2 + Buffer, drei Kanäle
```

**`npm run pruefen` muss vor jedem Lauf grün sein.** Seit dem 18.08.2026 prüft
es auch die harten Regeln aus `src/pruefung.ts` — vorher liefen die erst im
Wochenlauf, also *nachdem* die Vertonung bezahlt war. Aufgefallen ist das an
einem Schlusssatz mit „Schreib es in die Kommentare": Die Regel dagegen
meldete ihn zuverlässig, `npm run pruefen` sagte grün.

**`sprechprobe` gehört vor jeden Lauf mit Ton.** Sie spricht jede Szene mit
der deutschen Systemstimme von macOS und rechnet die Standdauer mit derselben
Funktion aus wie der Renderer. Was sie misst, ist nicht das Tempo, sondern der
Text: Die Formel zählt Zeichen, gesprochen werden Silben — „240" sind drei
Zeichen und vier Silben.

**Annas absolutes Tempo ist dabei belanglos und wird herausgerechnet.** Die
Probe stellt die *erwartete* Dauer neben die Formel, nicht ihr eigenes Tempo
neben die Konstante. Der alte Vergleich meldete bei jedem Lauf „weicht deutlich
ab" und legte damit die falsche Reaktion nahe: `ZEICHEN_PRO_SEKUNDE` von der
Produktionsstimme wegzudrehen.

## Zwei Fallstricke, derselbe Denkfehler

Ein Schritt schreibt in etwas, das er selbst überwacht:

- **`daten/verlauf.json` ist von der Frischeprüfung ausgenommen.**
- **Nur ein Lauf `--mit-ton` schreibt den Verlauf fort.** Ein Trockenlauf ist
  eine Übung; wer ihn mitschreibt, verbrennt ein Thema, das nie erschienen ist.

`skripte/veroeffentlichen.ts` prüft zweierlei: ob die Shorts noch dem Schema
entsprechen, und ob die Videodatei jünger ist als alles in `video/`, `src/`
und `daten/`.

## Buffer nimmt zehn je Kanal

Der kostenlose Tarif erlaubt **zehn geplante Beiträge je Kanal**. Bei acht
Shorts auf drei Kanälen belegt eine Woche acht Plätze — solange die laufende
Woche aussteht, ist kein Platz für die nächste.

Das Limit meldet sich erst beim Anlegen, und dann steht die Hälfte schon
draußen: Am 18.08.2026 brach ein Lauf nach dem **zwölften von 24** Beiträgen
ab. `veroeffentlichen.ts` zählt deshalb vorher und bricht ab, bevor der erste
Beitrag rausgeht.

**Zwei Wochen lassen sich nicht auf Vorrat einplanen.** Das ist keine
Einschränkung der Produktion, nur der Terminierung — und sie löst sich selbst
auf: `npm run nachlegen` legt nach, was hineinpasst. Der Kern steckt darin,
dass `veroeffentlichen.ts` **wiederholbar** ist: Es überspringt, was schon in
`veroeffentlicht.json` steht. Man kann es beliebig oft aufrufen.

**Ein angelegter Beitrag wird sofort vermerkt.** Derselbe Abbruch hätte die
zwölf Beiträge fast verloren, weil `veroeffentlicht.json` erst nach der
letzten Schleife geschrieben wurde — also nie. Jetzt schreibt der Lauf nach
jedem einzelnen Beitrag fort.

## Was ohne Zutun läuft

| | wo | wann |
|---|---|---|
| **Senden** | Buffers Server | zu den geplanten Terminen, Rechner darf aus sein |
| **Nachlegen** | `de.ganzakkurat.nachlegen` | täglich 19:15, wenn ein Platz frei wird |
| **Messen** | `de.ganzakkurat.rueckblick` | täglich 9:30 |

Alles andere braucht eine Sitzung: Themen wählen, Quellen abrufen, Entwürfe
schreiben, vertonen, rendern, freigeben.

`skripte/nachlegen.plist` macht daraus einen Dienst. **19:15 ist eine
Viertelstunde nach dem Sendeplatz** — dann hat Buffer den Versand verbucht und
je Kanal einen Platz frei gemacht. An Tagen ohne freien Platz schreibt er zwei
Zeilen ins Log und beendet sich. Ein- und ausschalten steht im Kopf der Datei,
das Log unter `/tmp/ganzakkurat-nachlegen.log`.

Der Dienst läuft nur, wenn der Rechner an ist. Das genügt: Verpasst er einen
Tag, holt er am nächsten zwei Plätze auf einmal.

## Wohin das Video geht

Ablage auf Cloudflare R2, Einplanung über Buffer, drei Kanäle. Alle Zugänge
liegen in `.env`, `npm run zugaenge` prüft sie mit echtem Hin-und-Rück. Die
`pub-…r2.dev`-Adresse bleibt ohne eigene Domain: Sie sieht kein Zuschauer, nur
Buffer und die Plattformen holen darüber die Datei ab.

## Was `npm run buffer-probe` einmal fand

Drei Dinge, die keine Prüfung davor sehen konnte:

- **Jeder Dienst verlangt eigene `metadata`.** YouTube `title` und
  `categoryId` (28), Instagram einen `type` (`reel`, nicht `post`).
- **`isAiGenerated` steht je Dienst**, nicht nur als `aiAssisted` am Beitrag.
- **`deletePost` antwortet mit einer anderen Union als `createPost`** — mit
  den falschen Fragmenten blieb der Testbeitrag im Konto stehen.

## Wenn ein Render hängt

Zwei Minuten Wartezeit sind eingestellt; 25 Sekunden reichen für einen kalten
Chrome-Start nicht. Bleibt Remotion ohne Fehlermeldung stehen, ist es fast
immer die Schemaprüfung im Browser-Kontext: `daten/beispiel-short.ts` wird in
`calculateMetadata` geparst — reißt er das Schema, hängt der Render in einem
unerfüllten Promise. `tsc` sieht das nicht, weil TypeScript Formen prüft und
nicht Werte. Ein weiterer Kandidat war einmal der Webpack-Cache.

`--ton-behalten` liest nur Tonspur und Sprechtext, nicht die alten Renderdaten
gegen das aktuelle Schema — sonst wäre es nach jeder Vertragsänderung
unbenutzbar, also genau dann, wenn man es braucht. Es findet den Ton auch in
einem früheren Lauf.
