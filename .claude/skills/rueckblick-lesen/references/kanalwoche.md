# Die Kanalwoche

*Ausgelagert aus `CLAUDE.md` am 06.09.2026, wörtlich. Der Vertrag behält, dass
der Rückblick alle drei Kanäle misst und wann die Dienste laufen; hier steht,
wie die Seite gebaut ist und warum sie so aussieht.*

### `npm run kanalwoche` — die Seite

Sonntags um 9:00 legt `de.ganzakkurat.kanalwoche` die Seite `kanalwoche.html`
an und öffnet sie: alle drei Kanäle nebeneinander, je Kanal und je Video. Sie
holt nichts ab und kostet nichts — die Zahlen stehen schon in
`daten/rueckblick.json`.

**9:00, weil der Wochenlauf um 10:00 startet.** Wer die nächste Woche wählt,
soll wissen, was die letzte getan hat; eine Auswertung danach kommt für die
Entscheidung zu spät. Ein eigener Dienst und keine Zeile in `sonntagslauf.sh`:
Der Lauf bricht ab, wenn keine gültige Woche zustande kommt, und das ist der
häufigste Fall — die Auswertung hinge dann an einer Bedingung, mit der sie
nichts zu tun hat.

**Der Nordstern steht oben, die Aufrufe darunter.** Das ist kein Layout, sondern
dieselbe Aussage wie im Rückblick: Aufrufe sagen, was der Algorithmus getan hat.
Eine Seite, die mit der großen Zahl aufmacht, erzieht den Leser auf die falsche
Größe.

**Ein Strich ist keine Null.** Buffer schickt je Dienst verschiedene Felder —
für YouTube kein `Reach`, für TikTok kein `Follows`. Wo der Dienst nichts meldet,
steht ein Strich; eine 0 wäre eine Messung, die niemand gemacht hat. Geteilt und
neue Abonnenten kommen für YouTube aus der Analytics API und sind als andere
Herkunft gekennzeichnet — **der erste Anlauf setzte den Nordstern des größten
Kanals auf einen Strich, obwohl beide Zahlen eine Ebene höher in derselben Datei
standen.** Gesehen hat das nicht der Code, sondern das gerenderte Bild.

**Der Verlauf ist gestrichelt gezeichnet.** Zwischen zwei Messtagen liegen bis zu
sechs Tage, an denen nichts gemessen wurde; eine durchgezogene Linie behauptet
die Zwischenwerte. Aus demselben Grund steht am Zuwachs die **tatsächliche**
Spanne und nicht „diese Woche".

Und was sofort sichtbar wurde: **TikTok trägt den Kanal.** `fernseher-hoert` hat
7 Aufrufe auf YouTube und 271 auf TikTok; `blitzer-app` 13 gegen 228. Neun
Wochen lang wurde an der schwächsten der drei Plattformen gemessen.

**Eine Warnung dazu, aus einem eigenen Fehler:** Die Zuordnung Short →
Buffer-Beitrag steht in `laeufe/<tag>/veroeffentlicht.json`. Am 04.09.2026 habe
ich fünf Laufordner gelöscht, weil ihre `lauf.json` nicht mehr parste — die
`veroeffentlicht.json` daneben tat das sehr wohl, und zwölf Videos verloren ihre
Zuordnung. **Ich habe eine Datei nach dem Wert einer anderen beurteilt.**
`npm run zuordnung-wiederherstellen` holt sie aus Buffer zurück (über die
YouTube-`videoId` und ein Zeitfenster von 30 Minuten); es ist ein Notschlüssel,
kein Teil der Kette.

**Die Länge ist die offene Frage.** Keiner der vier Zielwerte ist gemessen;
sie sind am 26.08.2026 gespreizt worden, damit es überhaupt etwas zu messen
gibt. Die einzige fremde Messung (48–67 s) wurde bewusst **nicht** übernommen —
eine geratene Zahl durch eine übertragene zu ersetzen, macht sie nicht
gemessen. Die Zahlen fallen, sobald zwei Längenklassen belegt sind.

Dafür gibt es seit demselben Tag `npm run laengen`. Es rechnet die
**Verweildauer** (`durchsicht × laengeSek`) statt der Prozent-Durchsicht: Die
sinkt mit der Länge zwangsläufig, und wer Längen an Prozenten vergleicht, hat
sich für das kürzere Video entschieden, bevor er hingesehen hat. Es schweigt
unter drei Videos je Längenklasse.

Der Anlass war eine Lücke: `laengeSek` stand seit Wochen in
`daten/rueckblick.json` und wurde **von keiner Auswertung gelesen**. Heute sind
alle neun veröffentlichten Videos 20–23 Sekunden lang; zu jeder Länge darüber
gibt es keine eigene Zahl.

**Der Nordstern sind geteilt und neue Abonnenten**, dazu Kommentare als frühes
Signal. Das ist am 25.08.2026 geändert worden, und zwar an den eigenen Zahlen:
Die Haltequote an Sekunde 3,5 lag bei **100 bis 115 %** — sie ist grün und
ausgereizt, während geteilt und Abos bei **null** stehen. Ein Messinstrument,
das auf die ausgereizte Größe zeigt, sagt nichts mehr.

Beide Werkzeuge schweigen, solange zu wenig gemessen ist: Median ab acht
Videos, Formatvergleich ab fünf je Format. Geratene Größen haben hier zweimal
Geld gekostet; eine geratene Reichweitenregel wäre die teuerste, weil sie die
Themenwahl steuert. Die Frage, die früh trägt, ist **„was hatte dieses eine"**.

**Veröffentlichtes wird nicht nachgebessert.** Der Lauf-Ordner `laeufe/<tag>/`
hält den ausgestrahlten Wortlaut und ist das Archiv; der Entwurf in
`daten/entwuerfe/` geht weiter. Der Verlauf soll zeigen, wie der Kanal sich
verändert hat.
