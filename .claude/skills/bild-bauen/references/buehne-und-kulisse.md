# Die Bühne und die Kulisse

Der Raum hinter den Figuren und die Überlaufmessung, die keiner anfassen soll. Am 06.09.2026 wörtlich aus `CLAUDE.md` hierher verschoben.

### Die Kulisse

Seit dem 01.09.2026 steht die Bühne in einem **Raum**: Wand mit Fenster,
Katzenbildern und Uhr, Dielenboden, links ein gelbes Sofa, rechts eine
Kommode (`video/bausteine/Kulisse.tsx`). Sie liegt randlos über dem ganzen
Bild, hinter Vorhang und Kopfzeile.

**Links steht ein Sofa und keine zwei Sessel.** Zwischen Vorhangkante und
Voltis Außenkante liegen 113 Pixel, ein Sessel in dieser Größe ist allein 164
breit — zwei davon standen ineinander und lasen sich als ein Möbel mit einer
Kante daneben. Ein Sofa darf halb hinter Volti liegen, weil es breit ist.

**Der große Satz über den Figuren ist dafür gestrichen** — `text` und
`hervorhebung` gibt es im Schema nicht mehr. Der Anlass war ein Satz zum
fertigen Video: „Das Geschriebene oben macht sowieso keinen Sinn." Er hatte
doppelt recht. Bei zwei Stimmen tragen die Redespalten den gesprochenen Satz
Wort für Wort — oben stand ein zweiter, anderer, und der Zuschauer las
zweimal. **Und der Satz kostete mehr als seine eigene Höhe:** Er drückte die
Bühne nach unten, und damit wanderte die Standlinie der Figuren je nach
Textlänge.

**Die Standlinie kommt aus `standlinieImBild()` in `src/marke.ts`** und ist
damit dieselbe Zahl für die Kulisse und für die Bühne — eine zweite Rechnung
daneben wäre die Doppelung ohne Wache.

**Eine Zeichnung gehört als `illustration` in die Bühne, nicht als Kind.** Als
Kind bekommt sie nur ihre eigene Höhe und sitzt zentriert im Rahmen; im ersten
Standbild ohne Text stand die Figur dadurch achtzig Pixel über dem Boden und
halb so hoch wie sonst. Als `illustration` bekommt sie `flex: 1` und damit den
ganzen Rahmen.

**Was auf der Wand steht, braucht einen Schleier.** `Textschleier` in
`video/szenen/index.tsx` liegt hinter Schluss, Frage und Zahl: ein weicher
Verlauf in `grundRein`, der die Wand dort aufhellt, wo Text steht. Zwei
Befunde stecken darin:

- **Ein Kasten wäre falsch.** Der Schluss hatte schon einmal einen Strich über
  die ganze Bühnenbreite, und der sagte optisch „fertig". Ein Verlauf hat
  keine Kante.
- **Er hängt absolut hinter dem Text.** Ein Verlauf endet am Rand seines
  Kastens; beim ersten Anlauf stand er dort noch bei halber Deckung, und im
  Bild war ein heller Rechteckblock mit vier Rändern — genau der Rahmen, den
  der Schluss nicht haben darf. Den Platz über Rand und Innenabstand zu holen
  ging nicht: `offsetHeight` zählt den Innenabstand mit, und die
  Überlaufbremse in `Buehne.tsx` misst genau diese Zahl.

### Die Bühne

`video/bausteine/Buehne.tsx` misst den Überlauf und verkleinert den Inhalt, wenn
er nicht passt (Untergrenze 0,7). **Diese Messung wird nicht angefasst.** Ihre
Kommentare dokumentieren drei gescheiterte Anläufe; einer rechnete
`passung = 0` und machte **jede Szene leer**.

**Die Untertitelzone ist am 04.09.2026 gefallen, und die Bühne hat nur noch
eine Höhe.** 270 Pixel waren unten für den Untertitel reserviert; seit dem
31.08. gab es dafür zwei Höhen, und die Weiche stand auf `!zweistimmig`.

**Gewirkt hat sie zuletzt in keinem gesendeten Video.** `zweistimmigkeit`
verlangt zwei Szenen mit beiden Stimmen, also ist jeder vertonte Short
zweistimmig — die Zone war dort längst aus. Übrig blieb ihre Wirkung genau da,
wo **keine** Tonspur vorliegt: im Trockenlauf, in der Vorschau, in den Proben.
Am Standbild vom 04.09. stand die Kulisse dort 150 Pixel zu hoch, die Belegzeile
lag über dem Fenster, und unten blieben 270 Pixel leer. **Eine Vorschau, die ein
anderes Bild zeigt als das fertige Video, ist keine Vorschau.**

Der Beweis, dass am Gesendeten nichts hängt, ist gemessen und nicht überlegt:
Dasselbe Standbild vor und nach dem Ausbau, mit derselben Tonspur, ist
**byte-identisch**. Die Gegenprobe ohne Ton unterscheidet sich — und gleicht
seitdem dem fertigen Video.

Die Überlaufmessung selbst ist unangetastet. Sie zu lockern stand einmal im Plan
und ist am 25.08.2026 verworfen worden: Eine Beschränkung zu lösen, für die es
keinen Bedarf gibt, ist in dieser Datei besonders teuer.

**Die Figur und ihr Symbol stehen in getrennten Hälften.** Ein Symbol sitzt
fest in der rechten Bühnenhälfte; `stand: 'rechts'` setzte die Figur auf
dieselbe Stelle, und im Video lag der Stempel hinter ihr. Das Schema lehnt die
Kombination ab.

**Die Posenfolge:** Eine Szene trägt zwei bis vier Haltungen (`zwischen`), die
Übergänge liegen zwischen 40 % und 90 % der Szene. Der Anlass war ein
Zuschauersatz — „Er macht ständig immer nur dieselben Bewegungen" —, und der
erste Versuch behandelte die **Anzahl** der Posen statt die **Folge**. Geprüft
wird die ganze Kette: Zwei benachbarte Stationen müssen verschieden sein.

**Welche Szene ein Bild trägt, ist eine Entscheidung und kein Automatismus.**
`src/illustration.ts` schlug Symbole aus dem Szenentext vor, und das Ergebnis
war, dass **jede** Szene eins bekam. Die Regel dazu hat zweimal auf der
falschen Seite gestanden — erst prüfte sie nur nach oben (Ergebnis: gar keine
Zeichnungen), dann verlangte sie genau eine je Short (Ergebnis: eine, vier
Szenen leer). Heute meldet sie jede bebilderbare Szene **ohne** Zeichnung und
dieselbe Zeichnung zweimal im selben Video.

→ Skill `bild-bauen`: Bühnenmaße (200 × 150, nichts unter y = 146), die
Standbild-Fälle, Kamera-Messwerte, die QA-Kette.
