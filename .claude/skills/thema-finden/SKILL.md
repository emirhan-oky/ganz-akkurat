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
(Share-Trigger). Wie daraus ein erster Satz wird, steht in `skript-schreiben`
unter „Der Kaltstart".

## Die vier Formate

Seit dem 20.08.2026 sind es vier statt acht, sortiert nach der **Reaktion**:

| Format | Reaktion | Prüffrage |
|---|---|---|
| `gibtswirklich` | Staunen | Klingt es absurd und ist trotzdem dokumentiert? |
| `absicht` | Empörung | Hat jemand es so entschieden oder tut das Gerät es ungefragt — und steht das in einem Dokument? |
| `eswareinmal` | Korrektur | Stimmte es früher und heute nicht mehr? |
| `werhatrecht` | Widerspruch | Streiten zwei **benennbare** Lager darüber, obwohl der Fakt belegt ist? |

`MATRIX` in `src/typen.ts` prüft der Reihe nach, **die erste Übereinstimmung
gewinnt**. `gibtswirklich` steht am Ende und darf nie zuerst greifen — es fängt
auf, was keine der drei anderen Bedingungen erfüllt.

**Die eine Abgrenzung, die halten muss:** Lautet die Auflösung schlicht „früher
stimmte es, heute nicht", ist es ein **Märchen**. Seit dem 06.09.2026 trägt das
die **Reihenfolge**: `eswareinmal` wird vor `werhatrecht` geprüft und fängt
diese Fälle ab.

**Beef fragt seitdem weiter.** Die alte Frage („und beide übersehen etwas")
verlangte beim Sammeln, was erst der Dialog leisten kann — ob es ein Drittes
gibt, sieht man nach dem Lesen der Quelle, nicht beim Notieren des Themas.
**Das Dritte bleibt Pflicht am Kipppunkt**, nicht am Thema. Und „benennbar"
hält die Frage eng: Zwei Lager, die sich nicht benennen lassen, sind kein
Streit, sondern einer, den der Entwurf erfindet.

**Kein Wochentag mehr.** Die Formate sind an keinen Tag gebunden; veröffentlicht
wird, was fertig und stark ist. Was die Prüfung noch verlangt: kein Format
zweimal hintereinander.

## Der Ideenvorrat

`daten/ideen/`, eine Datei je Format. **Jede Idee trägt einen Belegpfad**: die
Instanz, die die Aussage tragen könnte, und ob sie unbeteiligt ist. Das Schema
erzwingt mindestens eine unbeteiligte — wer schon beim Skizzieren keine
benennen kann, hat kein Thema, sondern eine Vermutung.

**An dieser Zahl hängt seit dem 24.08.2026 der Takt.** `reichweiteInWochen`
rechnet je Format mit dem Minimum, und sie ist der engste Engpass des Kanals:
enger als Produktion, Kontingent und Buffer. Fällt ein Format unter sechs
offene Ideen, ist das die Aufforderung nachzufüllen — nicht, langsamer zu
werden.

## Die Materialgrenze beim Aktuellen

Was gilt, steht im Vertrag: Neue **Geräte** fallen aus, neue **Regeln, Normen
und Grenzwerte** gehen. Beim Arbeiten zählt die Folge daraus:

`npm run neuigkeiten` siebt aus rund 400 EU-Rechtsakten zehn Kandidaten.
**Was der Wächter nicht kann, bleibt der Engpass:** ob jemand es freiwillig
weitererzählt. Er legt zehn vor, ein Mensch nimmt zwei.

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
- **Wie ein Thema zum Skript wird** — `skript-schreiben`.
- **Wie der erste Satz entsteht** — der Kaltstart, ebenfalls in
  `skript-schreiben`, mit `KALTSTART_ARTEN` in `src/typen.ts`.
- **Wer der Kanal ist und wie er klingt** — `daten/marke/brand-profile.md` und
  `voice.md`. Beide werden vor jedem Entwurf gelesen.
