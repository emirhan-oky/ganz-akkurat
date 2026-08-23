---
name: thema-finden
description: Ein Thema für einen Short auswählen oder bewerten — Ideenvorrat, Belegpfad, Formatzuordnung, Materialgrenze. Nutze das beim Füllen von `daten/ideen/`, beim Planen eines Laufs, bei der Frage ob ein Thema trägt, und wenn ein Format keinen Nachschub mehr hat.
---

# Ein Thema finden

Der eigentliche Engpass des Kanals. Nicht das Schreiben — der Beleg und die
Frage davor.

## Der eine Prüfstein

**Erzählt das jemand freiwillig weiter?**

Am 17.08.2026 wurde der komplette Ideenvorrat verworfen. Er bestand aus
Suchanfragen — „welche Buchse überträgt Bild", „welche Kabelklasse reicht".
Antworten auf Fragen, die im Feed niemand stellt.

Der Grund ist technisch, nicht geschmacklich: **Bei Shorts sucht niemand.**
Das Video läuft im Feed von selbst, der Zuschauer hat in dem Moment kein
Dock-Problem. Ein Hilfe-Video erreicht nur die Schnittmenge derer, die gerade
genau das haben — ein Staunfakt trifft jeden, der wischt.

→ Warum etwas geteilt wird, steht ausführlich in `viral-reverse-engineering`
(Share-Trigger). Wie daraus ein erster Satz wird, in `hook-writer`.

## Die vier Formate

Seit dem 20.08.2026 sind es vier statt acht, sortiert nach der **Reaktion**:

| Format | Reaktion | Prüffrage |
|---|---|---|
| `gibtswirklich` | Staunen | Klingt es absurd und ist trotzdem dokumentiert? |
| `absicht` | Empörung | Hat jemand es so entschieden oder tut das Gerät es ungefragt — und steht das in einem Dokument? |
| `eswareinmal` | Korrektur | Stimmte es früher und heute nicht mehr? |
| `werhatrecht` | Widerspruch | Streiten zwei Lager, und beide übersehen etwas? |

`MATRIX` in `src/typen.ts` prüft der Reihe nach, **die erste Übereinstimmung
gewinnt**. `gibtswirklich` steht am Ende und darf nie zuerst greifen — es fängt
auf, was keine der drei anderen Bedingungen erfüllt.

**Die eine Abgrenzung, die halten muss:** Lautet die Auflösung schlicht „früher
stimmte es, heute nicht", ist es ein **Märchen**. `werhatrecht` verlangt, dass
**beide** Seiten etwas übersehen. Sonst ist es ein Mythos mit zwei Sprechern.

**Kein Wochentag mehr.** Die Formate sind an keinen Tag gebunden; veröffentlicht
wird, was fertig und stark ist. Was die Prüfung noch verlangt: kein Format
zweimal hintereinander.

## Der Ideenvorrat

`daten/ideen/` — **eine Datei je Format**, `index.ts` als einzige Liste.
Nicht je Sachgebiet: Die Reichweite wird je Format gerechnet, und wer wissen
will, welches Fach leer läuft, soll eine Datei öffnen und nicht acht.

**Jede Idee trägt einen Belegpfad**: welche Instanz die Aussage tragen könnte
und ob sie unbeteiligt ist. Das Schema erzwingt mindestens eine unbeteiligte
Instanz — wer schon beim Skizzieren keine benennen kann, hat kein Thema,
sondern eine Vermutung.

`npm run pruefen` nennt die Reichweite in Wochen und rechnet **je Format** mit
dem Minimum: Ein Format ohne Nachschub hält alles auf, auch wenn drei andere
überquellen.

## Die Materialgrenze

Sie stammt vom gestrichenen Sendeplatz `neu` und gilt für alles Aktuelle
weiter, das jetzt bei `absicht` anfällt:

Neue **Geräte** sind durch Herstellerankündigung (beteiligt) und Presse (nicht
eintragbar) belegt. Sie fallen aus, ausnahmslos. Neue **Regeln, Normen und
Grenzwerte** sind durch Behörden und Normungsgremien belegt — nur die gehen.

Das klingt nach Einschränkung und ist der Vorteil: Über ein neues Handy
berichten hunderttausend Kanäle am selben Tag. Dass ein Recht auf Reparatur
gilt, erzählt niemand, weil es niemand liest.

`npm run neuigkeiten` siebt aus rund 400 EU-Rechtsakten zehn Kandidaten.
**Was der Wächter nicht kann, bleibt der Engpass:** ob jemand es freiwillig
weitererzählt. Er legt zehn vor, ein Mensch nimmt zwei.

## Die breitere Nische

Seit dem 20.08.2026 ist der Gegenstand **Technik allgemein**, nicht mehr nur
Geräte und Verbraucherrecht. Zwei Folgen:

- **Die Quellenart `wissenschaft` trägt das Neue.** Begutachtete Arbeiten,
  staatliche Institute, Normungsgremien. „Licht braucht 67 Millisekunden um die
  Erde" belegt keine Behörde. → Skill `beleg-holen`
- **Zwei neue Sachgebiete**, `raumfahrt` und `zeit`. Beide bewusst eng: Sie
  sollen Häufungen sichtbar machen und nicht alles auffangen, was sonst nirgends
  passt.

Der Zuwachs landet fast vollständig bei `gibtswirklich` — Raumstation,
Radioastronomie, Schaltsekunde. Kein Gerät, kein Paragraf.

## Was als Short nicht trägt

`daten/ideen/hauptvideo.ts` sammelt, was eine **Vorgeschichte** braucht (elf
Diagnosen: „mein Dock lädt, aber kein Bild") oder eine **Handlung** verlangt
(Selbsttest, Notlösung, Reihenfolge). Beides ist im Feed tödlich und im langen
Video normal. Kein Skript liest die Liste; der Belegpfad, also der teure Teil,
ist mitgewandert.

## Wiederholung vermeiden

`daten/verlauf.json` weiß, welche Themen schon liefen. Bei rund 260 Videos im
Jahr wird sonst irgendwann dasselbe Thema ein zweites Mal vorgeschlagen,
einfach weil niemand mehr weiß, was vor vier Monaten lief.

**Das gilt auch für die Machart.** Am 19.08.2026 fiel auf, dass zwei Shorts aus
zwei aufeinanderfolgenden Tagen denselben Aufschlag hatten — „Schätz mal."
`npm run aufschlaege` stellt sie nebeneinander. Der Werkzeugkasten dagegen
steht in `HOOK_MACHARTEN` (`src/typen.ts`): fünf Macharten, formatunabhängig.

## Wo der Rest steht

- **Humor, Rundlauf, `weitererzaehlt`** — nicht mehr hier. Der Humor hängt am
  Format und steht bei `FORMATE`; die Rundlaufregeln stehen in `src/pruefung.ts`
  und in `daten/marke/voice.md`.
- **Wie ein Thema zum Skript wird** — `short-form-video-script` (WATCH).
- **Wie der erste Satz entsteht** — `hook-writer`.
- **Wer der Kanal ist und wie er klingt** — `daten/marke/brand-profile.md` und
  `voice.md`. Beide werden vor jedem Entwurf gelesen.
