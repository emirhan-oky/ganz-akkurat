# Briefings

Ein Bogen je Thema, und **der Dialog wird in dieselbe Datei geschrieben.** Damit
bleiben Vorgabe und Antwort zusammen, und das Archiv entsteht von selbst — genau
so haben die fünfzehn bewerteten Zeilen vom 25.08.2026 das Humorkapitel in
`daten/marke/voice.md` getragen.

Wie ein Bogen entsteht, steht im Skill `thema-briefen`. Was daraus wird, im
Skill `skript-schreiben`.

## Die Regel, die den Ordner trägt

**Kein Bogen ohne abgerufene Quelle.** Der Ideenvorrat trägt einen `belegpfad` —
eine Vermutung, wo etwas stehen müsste. Wer darum herum brieft, lässt jemanden
einen Dialog um einen Fakt schreiben, den es vielleicht nicht gibt. Fällt der
Fakt, fällt der Witz mit.

Jedes Zitat in diesen Bogen steht wörtlich in `daten/quellen.json` und ist über
`npm run quellen-pruefen` nachprüfbar.

## Und das wichtigste Feld ist „Die Falle"

Was die Quelle **nicht** sagt. „Nicht automatisch" ist nicht „nicht", und der
Schritt dazwischen ist der teuerste Fehler dieses Projekts. Das Feld zieht die
Arbeit des `belegpruefer` nach vorn, wo sie nichts kostet — hinterher kostet sie
eine Umschreibung, und jede Umschreibung nimmt ein Wort mit, das gedeckt war.

## Der Stand

Zehn Bogen, alle auf geprüften Quellen: drei `gibtswirklich`, drei `absicht`,
zwei `eswareinmal`, zwei `werhatrecht`.

Die Verteilung ist schief, und der Grund ist der Vorrat: `eswareinmal` und
`werhatrecht` haben je acht offene Ideen, aber nur zwei davon haben eine
abgerufene Quelle. **Der Engpass ist nicht das Schreiben, sondern der Beleg** —
genau das sagt `thema-finden` seit dem 19.08.2026.

Was zuerst geholt gehört, damit die beiden Engpassfächer nachziehen:
`apps-schliessen` und `bildschirmschoner` (Es war einmal), `inkognito-modus` und
`oeffentliches-wlan` (Wer hat recht?).

**Ein dreizehnter Bogen steht aus.** Ein Zuschauer hat zum Passwort-Video
eingewandt, die BSI-Empfehlung könne ohne eine Meldung über kompromittierte
Zugangsdaten nach hinten losgehen. Das ist bei `werhatrecht` genau das Dritte —
und es braucht eine eigene Fundstelle, die es noch nicht gibt.
