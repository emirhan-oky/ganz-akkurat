# Das Längenprotokoll

*Ausgelagert aus `CLAUDE.md` am 06.09.2026, wörtlich. Der Vertrag behält das
Fenster (40 bis 80 Sekunden, hart) und `ZEICHEN_PRO_SEKUNDE`; hier steht, wie
es dazu kam und was bis zum 02.09.2026 galt.*

## Der Stand bis zum 02.09.2026

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

## Was an der Sprechprobe repariert wurde

**Sie misst seit dem 06.09.2026 nur die Shorts, die man ihr nennt.** Vorher las
sie `process.argv` gar nicht: `npm run sprechprobe -- <id>` maß trotzdem alle
54 Entwürfe, rund 300 `say`-Aufrufe statt fünf. **Eine Probe, die ihr Argument
ignoriert, misst jedes Mal alles** — `dialogprobe` konnte es zwei Tage länger.

**Und jeder `say`-Aufruf hat jetzt eine Grenze.** `say` blieb mitten in einem
Lauf stehen, bei 0 % CPU, ohne Ausgabe und ohne Fehler; `execFile` ohne
`timeout` wartet darauf für immer, und der ganze Node-Prozess hängt mit. Drei
solche Bäume standen über eine Stunde in der Prozessliste — **gesehen hat sie
nicht die Probe, sondern Emirhan.** 20 Sekunden je Satz, danach einmal
nachfassen. Ein Aufruf, der hängen kann, überträgt seinen Stillstand sonst auf
alles, was auf ihn wartet.
