# Text im Bild — Redespalten, Zitatkarte und was davor da war

Wo der gesprochene Satz steht, seit Untertitel und Sprechblase ausgebaut sind. Am 06.09.2026 wörtlich aus `CLAUDE.md` hierher verschoben.

### Was den Text unten trug — Untertitel und Sprechblase

**Beides ist am 04.09.2026 ausgebaut, und keins davon lief noch.** Der
Untertitel wurde nur gezeichnet, wenn eine Tonspur **einen einzigen**
Sprecherabschnitt hatte; `zweistimmigkeit` verlangt seit dem 26.08.2026 zwei
Szenen mit beiden Stimmen, ohne Ausnahme. **Ein Zweig, den kein Short mehr
erreichen kann.** Die `Sprechblase` stand als Import in `Short.tsx` und wurde
nirgends gerendert, mit der Begründung daneben, sie zurückzudrehen sei „eine
Zeile Arbeit".

Das stimmt weiterhin — der Wortlaut steht in der Git-Historie. Und was die Blase
konnte und der Untertitel nicht (**zeigen, wer spricht**), tragen heute das
Namensschild über der Figur und die Farbe der Redespalte darunter.

**Das Karaoke-Prinzip ist geblieben.** `gruppiere` steht weiter in
`Untertitel.tsx` — von der Datei ist nur diese Funktion übrig —, und
`Redespalten` gruppiert damit; das aktive Wort steht auf farbigem Grund in der
Farbe seines Sprechers. Der Untertitel war von den ersten Zuschauern
ausdrücklich gelobt worden; ihn ersatzlos zu streichen hieße, eine der wenigen
belegten Stärken wegzuwerfen.

**Keine Blase mit Zipfel** — die Begründung bleibt für jeden künftigen Anlauf:
Ein Zipfel müsste auf den Mund zeigen, und der sitzt im SVG-Raum der Bühne,
während der Text HTML ist. An dieser Kopplung ist die Symbolposition dreimal
gescheitert. Seite und Farbe beantworten dieselbe Frage ohne eine umgerechnete
Koordinate.

### Die Figuren stehen fest, der Text darunter

**Die Figurenbühne steht seit dem 01.09.2026 nicht mehr im gemessenen
Textstapel.** Sie liegt absolut in genau der Fläche, aus der
`standlinieImBild()` die Bodenkante der Kulisse rechnet — es ist nicht dieselbe
Rechnung zweimal, sondern dieselbe Fläche.

Vorher bekamen die Figuren den Rest, den der Text übrig ließ: In der
Zitatkartenszene standen sie halb so hoch wie nebenan, bei einem langen Zitat
fast gar nicht mehr. Mit einer gezeichneten Bodenkante im Rücken fällt das
sofort auf.

**Die Zitatkarte steht deshalb unten**, vor den Figuren auf der Diele, in 0,72
der Schriftgröße: In voller Größe deckte sie die beiden bis zum Kopf. Sie liest
sich als Schild, das die zwei vor sich halten. Der alte Zielkonflikt „Karte und
Figuren teilen sich dieselbe Höhe" ist damit erledigt — was die Karte groß
macht, macht die Figuren nicht mehr klein.

**Die Redespalten füllen die Fläche unter den Figuren**
(`video/bausteine/Redespalten.tsx`). Jede gesprochene Zeile bleibt bis zum
Szenenende stehen, in der Farbe ihres Sprechers, unter dem Standplatz seiner
Figur; mit dem Schnitt leeren sie sich.

Der Untertitel war am 31.08.2026 abgeschaltet worden — „das sieht mit den
Untertiteln so unfassbar scheiße aus, wenn beide Charaktere im Bild sind". Der
Befund war richtig und galt dem **Ort**, nicht dem Text: ein Block unten in der
Bildmitte. Mit dem Raum dahinter fiel der Preis auf, „wenn die beiden sprechen,
wirkt es im Bild leer".

**Sie hängen am Standplatz, nicht an der gerenderten Figur.** Die Kamera fährt
im Bühnen-SVG bis Zoom 1,24 — wer den Text pixelgenau an die Figur bindet,
rechnet zwischen SVG-Raum und Pixelraum um und lässt ihn bei jeder Fahrt
mitwandern. Seite und Farbe statt einer umgerechneten Koordinate — dieselbe
Antwort, die schon die Sprechblase gab, bevor sie ausgebaut wurde.

**Welche Seite, entscheidet die Szene.** `wer` an der Figurenbühne darf
wechseln, und die Spalten müssen dem folgen — im ersten Standbild stand Voltis
Satz unter Watti.

**Was nicht passt, fällt als ganze Gruppe weg — nicht als halbe Zeile.** Der
erste Anlauf schnitt mit `overflow: hidden` an der sicheren Zone ab, und die
Unterkante der Spalte ist genau die Kante, an der die Zitatkarte endet: Im
Video sah es aus, als schnitte die Karte weiter ab, obwohl sie längst weg war.
Jetzt werden je Gruppe die Umbruchzeilen geschätzt, und von hinten bleiben so
viele Gruppen stehen, wie in fünf Zeilen passen. In der Zitatkartenszene sind
die Spalten aus — ein Zitat teilt sich die Fläche nicht.
