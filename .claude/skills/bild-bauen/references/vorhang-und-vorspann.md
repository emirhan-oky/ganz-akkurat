# Der Vorhang, der Vorspann und der Abspann

Die Show um die Szenen herum. Am 06.09.2026 wörtlich aus `CLAUDE.md` hierher verschoben.

### Der Vorhang

Seit dem 31.08.2026 beginnt jeder Short als **Show**: Der Vorhang ist von Bild
null an geschlossen, auf ihm stehen Showtitel und Themenzeile, die beiden
Figuren nennen ihre Namen, dann öffnet er sich auf den Aufschlag.

**Er stand einen Abend lang nach dem Aufschlag**, als Cold Open, und die
Begründung war gut: Der Aufschlag hat 3,5 Sekunden, weil 71 % dort entscheiden
— ein Vorspann davor verbraucht sie. Und ein Short läuft von selbst wieder an;
ein Vorhang am Anfang sitzt in der Schleife unmittelbar hinter dem Schluss, also
genau dort, wo am 18.08.2026 schon einmal einer abgehängt wurde.

**Am fertigen Video hat das nicht getragen** („der Anfang ist echt unnötig").
Das Argument ist nicht falsch geworden, es ist gegen den Eindruck angetreten und
hat verloren — **ein Argument aus einer Zahl schlägt keinen Eindruck vom
gerenderten Video.** Die Zahl steht trotzdem hier, damit beim nächsten Umbau
niemand dieselbe Runde noch einmal dreht.

Der Umbau hat die Vertonung nebenbei vereinfacht: Der Vorspann war ein Einschub
zwischen Szene 0 und 1, und die kniffligste Stelle der ganzen Vertonung war ein
Uhrsprung mitten in der Schleife, der genau einmal und genau dort greifen
musste. Jetzt startet die Uhr bei der Vorspanndauer. **Ein Wert, der einmal am
Anfang gesetzt wird, kann nicht an der falschen Stelle einsteigen.**

Er **fuhr eine Zeit lang nicht mehr zu**: Am Anfang gab es nichts zuzudecken,
und das Standbild bei Bild 0 zeigte eine **leere Bühne**, weil die erste Szene
erst nach dem Vorspann beginnt. Seit dem 02.09.2026 fährt er wieder zu — jetzt
liegt der Kaltstart davor, also fällt er über eine Szene. Siehe `kaltstart`.

### Der Abspann

Der Vorhang fährt am Ende zu, und darauf steht **dieselbe Karte wie im
Vorspann** — Showtitel, „mit Volti und Watti", die beiden davor. Nur die Mitte
wechselt: statt „HEUTIGES THEMA" und Themenzeile steht dort der **feste
Zweizeiler**, in jedem Short derselbe:

> Volti: „Wir haben nachgelesen."
> Watti: „Wirklich."

Beides gesprochen, beides im Bild. **Zwei feste Aufnahmen, einmal bezahlt**
(`public/ton/marke/abspann.volti.mp3`, `abspann.watti.mp3`, aufgenommen mit
`npm run vorspannton -- --abspann`), ihre Dauern in `daten/vorspannton.json`
unter `abspann`. Wattis Wort blendet ein, wenn er es sagt — Bild und Ton aus
einer Zahl, wie beim Vorspann.

**Drei Anläufe, bis das stand, und alle drei waren Lesefehler.** Der erste
ließ Showtitel und Namen weg und setzte den Schlusssatz auf den Vorhang. Der
zweite las „darunter wirklich" als Füllwort und baute ein Feld `abspann` mit
einer erfundenen Wattizeile je Short. **„Wirklich." ist das Wort.** Die Lehre
steht als Gedächtnisnotiz: Was bei Emirhan in Anführungszeichen steht, ist
Wortlaut.

Der Schlusssatz steht seitdem **nirgends mehr im Bild** — er wird gesprochen.
`satz` an der Schlussszene ist damit ein Feld, das kein Bild mehr liest; es
hängt noch an `rundlauf` und der Abbinde-Regel.

`Vorspannkarte` und `Abspannkarte` sind zwei dünne Aufrufe derselben
`Vorhangkarte` in `video/bausteine/Vorhang.tsx` — ein Slot `mitte`, alles
andere einmal. Zwei Zeichnungen derselben Karte wären die Doppelung ohne
Wache, und genau die ist am 01.09.2026 auseinandergelaufen:

**Die Karte hat die Geometrie vom 31.08., und die bleibt.** Am Abend des
01.09. stand für zwei Stunden eine andere: Titel 96 statt 132, Abstände
gekürzt, die Figuren auf der Bühnenstandlinie statt unten. Der Anlass war ein
Screenshot mit zwei Figurenpaaren während der Schlussfahrt — und die Lösung war
die falsche: Ich habe die Kartenfiguren auf die Bühnenfiguren gelegt, statt die
Überblendung zu vermeiden, bei der beide überhaupt zugleich sichtbar sind. Das
Urteil: „Die Größen und Abstände beim Opener und Abspann nicht abändern. Das
wollte ich nie abgeändert haben."

Der Vorspann hatte das Problem nie: `titelstand` blendet die Karte aus, bevor
der Vorhang öffnet. Der Abspann blendet seitdem erst ein, wenn der Vorhang zu
ist. **Ein Zeitpunkt, kein Layout** — ein Übergang von 0,4 Sekunden ist kein
Grund, ein Bild umzubauen, das jemand abgenommen hat.

**`NACHLAUF_SEK` ist seitdem gerechnet, nicht gesetzt**: Fahrt, Voltis
gemessene Dauer, Sprecherpause, Wattis Dauer, 0,6 Sekunden Stand — rund 3,5
statt 1,5 Sekunden. Eine feste Zahl daneben wäre die zweite Wahrheit über
dieselbe Größe. Der Folgen-Ton ist mit der Signatur gegangen.
