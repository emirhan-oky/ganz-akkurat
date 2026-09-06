# Die Figuren, ihre Haltung und die vierte Wand

Maße, Posen, Abstände und die Zuwendung — alles, was am Rig hängt. Am 06.09.2026 wörtlich aus `CLAUDE.md` hierher verschoben; kein Satz ist umformuliert.

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
