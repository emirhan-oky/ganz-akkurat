# Der Ton — Vorspann, Abspann und der Kipppunkt

Vier berechnete Klänge, zwei feste Aufnahmen und ein Begleitton mitten im
Short. Am 06.09.2026 wörtlich aus `CLAUDE.md` hierher verschoben.

**Gebraucht wird die Datei, wenn an `skripte/toene.ts`, an
`daten/vorspannton.json` oder am Toneinsatz im Renderer gearbeitet wird.** Kein
Satz darin hält einen Short zurück — aber zwei Messgrößen darin haben mehrmals
vorhergesagt, was das Ohr nachher hörte: der RMS und der Anteil der Energie
über 2 kHz. Sie stehen als `messen` fest im Code.

Die vier Töne selbst stehen in `MARKENTOENE` in `src/marke.ts`, und
`npm run pruefen` prüft, dass alle vier als Datei da sind. Der Grund dafür
steht im Vertrag unter „Der bezahlte Lauf": Der schlechtere Fall ist nicht der
Absturz, sondern das stumme Video, das durchgeht.

### Der Ton des Vorspanns

Vier Klänge, und drei davon kosten nichts — die Themenansage kommt aus der
Vertonung, der Rest ist berechnet.

| | was | woher |
|---|---|---|
| **Auftakt** | D-Dur-Dreiklang aufsteigend, auf der Vorhangzufahrt | `skripte/toene.ts`, berechnet |
| **Themenansage** | „Heutiges Thema: …" | aus der Vertonung, je Short |
| **Öffnung** | Hauch plus Grundton D4, aufsteigend | berechnet |
| **Schließung** | derselbe Klang abwärts, kürzer und weicher | berechnet |

**Der Schließton kam am 04.09.2026 dazu**, auf Emirhans Bitte: „Eben derselbe
wie wenn der Vorhang aufgeht, nur etwas abgerundeter fürs Zugehen." Zwei
Änderungen tragen das, und beide standen schon im Kommentar der Öffnung: Der
Hauch läuft **abwärts** (1700 → 700 Hz), weil beim Schließen der Stoff auf einen
zukommt, und der Grundton hat einen längeren Anstieg bei kleinerem Abfall.

**Die Länge ist hier die harte Grenze**, anders als beim Öffnen. Die Öffnung
darf 0,96 Sekunden klingen, weil sie in eine leere erste Szene hineinläuft;
hinter der Schlussfahrt steht sofort Voltis „Wir haben nachgelesen." Deshalb
0,62 Sekunden und ein **gemessener** Ziel-RMS von 0,019 — ein Viertel der
Sprache. Ein fester Pegelfaktor wäre dasselbe Versehen wie beim Kipppunktton, wo
dieselbe Fassung je nach Phasenlage zwischen 0,072 und 0,144 lag.

**Showtitel und Einwurf sind am 02.09.2026 gestrichen** — zehn feste Aufnahmen,
die niemand mehr abruft. Auf der Karte steht seitdem fest „Die Volti & Watti
Show" mit den beiden Namen in ihren Kennfarben, gesprochen wird sie nicht mehr.
Der Grund ist Zeit: Sie kosteten je nach Show 3,69 bis 4,40 Sekunden, und genau
daraus ist der Kaltstart bezahlt. Die Formatpille in der Kopfzeile bleibt.

**Zweimal dasselbe zu sagen war dabei der eigentliche Anlass.** Die Namen
standen in der Zeile *und* wurden gesprochen, während der Zuschauer noch gar
nicht wusste, worum es geht.

`daten/vorspannton.json` hält die zwei Abspannaufnahmen samt ihren gemessenen
Dauern — und daneben die zehn stillgelegten Showaufnahmen. **Die MP3s bleiben
liegen, obwohl niemand sie abruft:** Sie sind einmal bezahlt, `eleven_v3` ist
nicht deterministisch, und 250 KB sind billiger als eine zweite Synthese. Was
gefallen ist, ist der Weg dorthin — `npm run vorspannton` nimmt sie seit dem
04.09.2026 nur noch mit `--shows` auf. **Ein Aufruf ohne Argument war der
wahrscheinlichste und der teuerste.**

`src/zeit.ts` liest aus der Datei nur `abspann` — **Remotion kann die Länge
einer Tondatei nicht synchron lesen**, und Wattis „Wirklich." hängt daran.

**Die Themenansage ist der einzige Vorspannton je Short.** Sie steht deshalb in
der Tonspur und **nicht** in `abschnitte`: Die Aufschlagmessung filtert `woerter`
gegen `szenenStartSek[1]`, und Vorspannwörter dort verlängerten den gemessenen
Aufschlag über die 3,5 Sekunden.

**Ton und Bild kommen aus einer Zahl.** `ansageAbBild` steuert den Toneinsatz
und die Einblendung der Zeile. Vorher hing die Einblendung an einem Anteil der
Vorspanndauer — die Stimme kam 1,2 Sekunden vor dem Bild. Ein Anteil beschreibt
eine Position im Ganzen; der Ansagebeginn hängt an der Länge der beiden Sätze
davor.

**Synthese baut Klänge gut und Texturen schlecht.** Der Vorhang sollte ein
Stoffgeräusch bekommen, und drei Anläufe sind gescheitert: ein breites
Rauschband (67 % der Energie über 2 kHz — ein Fön), ein Applaus, der nach
Knistern klang (5 % im Klatschkörper statt 30), ein schmales Swisch (sanfter,
allein aber fremd). Der Ausweg war nicht, das Rauschen wegzulassen, sondern es
**auf seine Aufgabe zu beschränken**: Es zeigt eine Richtung an, den Rest trägt
ein Ton, der ohnehin zur Marke gehört.

**Alle berechneten Klänge stehen auf D und A.** Das war nicht der Ausgangspunkt —
`folgen` stand schon darauf, die Terz dazwischen war die einzige Note, die
fehlte.

**„Sanft" ist messbar.** Die Sprache im Vorspann liegt bei RMS 0,08; die
Öffnung bei 0,019. Der erste Swisch-Anlauf lag bei 0,55, also fünfmal über der
Sprache — der Ausgleich für die Filterdurchgänge war zu hoch gegriffen.

**Und die beiden Maße stehen seit dem 01.09.2026 als `messen` fest im Code.**
RMS und der Anteil über 2 kHz sind nicht gewählt, sondern übrig geblieben:
Jedes hat beim Vorhang einmal vorher gesagt, was das Ohr nachher hörte. Eine
Zahl, die man einmal von Hand rechnet, rechnet beim nächsten Anlauf niemand
mehr.

### Der Ton am Kipppunkt

Seit dem 01.09.2026 gibt es einen Klang mitten im Short: `kipppunkt`, A2, 0,9 Sekunden,
langsam anschwellend und wieder weg.

**Er sollte ein Publikum sein und ist keins.** Der Kanal ist eine Show, und
eine Show hat ein Publikum, das an der Wendung raunt. Sechs Fassungen standen
zur Wahl, drei davon ein Raunen aus 8 bis 14 synthetischen Stimmen — additiv
aus Harmonischen mit zwei Formantgipfeln gebaut, weil ein Raunen keine Textur
ist, sondern viele Stimmen. Gewonnen hat die vierte, die gar keins ist.

**Damit gilt der Satz vom Vorhangstoff ein zweites Mal, und zwar schärfer:**
Der Ausweg ist nicht, die Textur besser zu bauen, sondern den Klang auf seine
Aufgabe zu beschränken. Die Aufgabe heißt nicht „ein Publikum", sondern „der
Kipppunkt ist da".

Die Gegenprobe aus gefiltertem Rauschen stand daneben und hat es bestätigt:
45 % ihrer Energie über 2 kHz, derselbe Bereich, in dem das breite Rauschband
mit 67 % als Fön aufflog. Die Stimmenfassung lag bei 6 %.

**Ein Fehler, den erst die Messung fand:** Der Pegel war zuerst ein fester
Faktor, und damit lag dieselbe Fassung zwischen RMS 0,072 und 0,144 — je
nachdem, wie die Phasen der Stimmen zufällig zusammenfielen. Bei einer Sprache
von 0,08 war der Begleitton also lauter als das, was er begleitet. Seitdem ist
der Pegel ein **gemessener Ziel-RMS**, und erst dadurch waren die sechs
Fassungen überhaupt vergleichbar: Sonst wäre es eine Lautstärkewahl gewesen und
keine Klangwahl.

**Er hängt an einem Redeanteil, nicht an einer Szene.** Alle vier Entwürfe
haben zwei Kipppunkt-Szenen; der Ton läuft in der ersten und nur dort. Und
nicht an ihrem Anfang: In `passwort-wechseln` steht dort zuerst Wattis Irrtum,
und erst Voltis Richtigstellung ist das, was kippt. Getroffen wird deshalb der
**erste Abschnitt mit behauptendem Zug** — dreimal ist das der Szenenanfang,
einmal die Zeile danach.

Das ist der zweite Leser für `abschnitte[].zug`. Ohne Tonspur entfällt der Ton:
Der Zug steht nur dort.

**Er reicht bis an den oberen Bildrand.** Zuerst deckte er nur die Bühne, unter
dem Satz „Der Kanal oben, die Show darunter" — das galt einem Vorhang, den man
nur im Vorspann sah. Seit die Streifen dauerhaft stehen, ist dieselbe Kante ein
Schnitt mitten durchs Bild: **Ein Vorhang hängt von der Decke; fängt er auf
halber Höhe an, hängt er an nichts.** Die Kopfzeile liegt darüber und wechselt
auf helle Farben, solange er zu ist — damit reißt die KI-Kennzeichnung nie ab,
und genau dafür stand die alte Kante.

**Links und rechts bleibt gerafftes Tuch stehen**, über die ganze Laufzeit.
`VORHANG.rand` = 100 Pixel, am Bild gewählt und nicht gerechnet: Die Herleitung
hätte 130 ergeben, das war die größtmögliche Breite. Die **Untergrenze** ist
gemessen — der Beschnitt der Apps liegt bei 52 Pixeln links und 56 rechts, ein
50-Pixel-Streifen läge vollständig in dem, was am Handy gar nicht ankommt.

**Gestaucht, nicht hinausgeschoben.** Ein gerafft aufgezogener Vorhang staucht
sein Tuch. Verschoben wäre von acht Falten eine dreiviertel übriggeblieben —
ein flacher roter Balken.

**Ein Stoff, ein Mount.** `Vorhangstoff` läuft dauerhaft und nimmt seinen Stand
als Prop, `Vorspannkarte` läuft in der Sequence. Beide lesen denselben Wert, aus
dem auch die Farbumschaltung der Kopfzeile fällt — eine zweite Zeichnung
desselben Vorhangs wäre die Doppelung ohne Wache.

**Zwei Kontrastfehler derselben Sorte, beide am selben Tag.** Der weiße Rand um
die Arme kam vom **Saum des Rigs**, nicht von einem Umriss; verteidigt hatte ich
ihn mit Kontrast 1,26 — gerechnet gegen den Körper der Figur statt gegen die
Figur, deren Gesicht mit 17,1 darauf steht. Und die Kennfarben auf dem Vorhang
standen bei 1,76 und 2,37 statt bei den dokumentierten 3,23 und 4,36: Die alten
Zahlen sind gegen die Grundfarbe gerechnet, und der Stoff ist **gefaltet**.
**Der Kontrast gegen einen Farbverlauf ist der gegen seinen ungünstigsten Ton,
nicht gegen seinen mittleren.**
