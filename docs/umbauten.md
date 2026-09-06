# Stand der Umbauten — das Protokoll

Am 06.09.2026 wörtlich aus dem Kapitel „Stand" in `CLAUDE.md` hierher
verschoben. Es ist ein Tagebuch dreier Umbauten: die zwei Stimmen ab dem
25.08., die Show ab dem 31.08., der Dialogumbau ab dem 02.09. Jeder Satz ist
datiert und steht so auch im Git-Log.

**Was daran heute noch gilt, steht im Vertrag** — hier steht, wie es dazu kam.

Die Pipeline steht bis einschließlich Veröffentlichung: Ablage auf Cloudflare
R2, Einplanung über Buffer, Zugangsprüfung (`npm run zugaenge`). Alle Zugänge
liegen in `.env`. Die laufende Aufgabenliste steht in `AUFGABEN.md`.

**Seit dem 25.08.2026 läuft der Umbau auf zwei Stimmen.** Schema, Vertonung,
Redespalten, zwei Rigs, die Bauformen und die fordernden Prüfregeln stehen.
**Kein Video im neuen Bau ist bisher veröffentlicht** — alle Zahlen oben
stammen aus der einstimmigen Zeit.

**Seit dem 31.08.2026 beginnt jeder Short als Show.** Ein Theatervorhang deckt
die Bühne, links und rechts bleibt gerafftes Tuch über die ganze Laufzeit
stehen, und die Kopfzeile wechselt auf helle Farben, solange er zu ist. Aus vier
Rubriken sind sechs benannte Sendungen geworden — Facts, Beef, Märchenstunde,
Kein Zufall, Schätz mal, Empfehlungen. Was fehlt, ist der **Ton**: sechs feste
Aufnahmen; `VORSPANN_SEK` steht auf gerechneten 3,8 Sekunden.

**Alle vier Entwürfe sind auf ein Zwiegespräch umgeschrieben**, und
`npm run pruefen` ist am selben Abend erstmals seit dem 26.08. wieder
vollständig grün. Ausgenommen wurde keiner: Eine Regel, die den alten Bestand
durchwinkt, wäre keine.

**Seit dem 02.09.2026 schreibt Claude die Dialoge.** Emirhans Befund: Ich habe
jeden seiner Dialoge umgeschrieben, weil Regeln dagegenstanden, die ich vorher
selbst gebaut hatte — keine davon an seinem Material gemessen. Der Weg dahin
war eine Messung, kein Argument:

1. **Seine neun Dialoge vermessen** — 131 Redezeilen, Zeichen je Figur,
   Fragenanteil, wo die Zitatkarte sitzt. Erst danach interpretiert.
2. **Sechs Runden Gegentest.** Ich schreibe einen Dialog, er sagt, was nicht
   klingt, der Befund geht ins Profil. Runde vier war die erste ohne
   Beanstandung.
3. **38 Befunde** in `daten/marke/dialoganalyse.md`, **zwölf Szenarien** in
   `daten/szenarien/` — der Skill `skript-schreiben` liest den Ordner, er
   enthält ihn nicht. Eine neue Runde legt dort eine Datei ab.
4. **Alle zehn Dialoge ins Schema**, dann `shortPruefen`: **91 Befunde an zehn
   Dialogen, die er geschrieben und abgenommen hat.** Neun Regeln sind daraufhin
   gewandert, sechs haben recht behalten.

**Die Methode ist das Ergebnis, nicht die Regeln.** Jede Runde legt einen
**Weg** dazu, keine Regel obendrauf — *„damit du so viele Wege wie möglich hast,
wodurch keine Schablone entsteht."* Und: **Widersprechen sich eine Regel und
eine gute Zeile, verliert die Regel.** Einzige Ausnahme ist die Belegpflicht,
und die ist an diesem Tag nicht gefallen, sondern von der Szene auf die
behauptende Zeile gewandert.

Was der Umbau dabei über sich selbst gezeigt hat: **Die Nähte lagen zwischen
den Sätzen, nicht in ihnen.** Ein Aufschlag von 2,9 Sekunden und ein Belegsatz
von 4,2 sind beide unauffällig — `redebloecke` klebt sie über die Szenengrenze
zu 6,9 zusammen. Und **jede Kürzung nimmt ein Wort mit, das gedeckt war**: Der
`belegpruefer` fand sechs Stellen, alle sechs in Sätzen, die gerade erst
angefasst worden waren.
