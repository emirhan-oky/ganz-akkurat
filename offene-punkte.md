# Offene Punkte am Inhalt

Stand 12.08.2026, nach Durchsicht des Laufs `2026-08-12` (Thema
`dock-kein-bild`, fünf Shorts). Pipeline und Gestaltung sind in Ordnung — die
Kritik betrifft ausschließlich **was** die Videos erzählen, nicht wie sie
gebaut oder gerendert werden.

Nichts davon ist umgesetzt. Wird gemeinsam angegangen.

## 1 Das Betriebssystem bleibt ungenannt

Man sieht einem Video nicht an, ob es um macOS oder Windows geht — obwohl die
Quellen eindeutig macOS benennen. Der Zuschauer kann also nicht entscheiden, ob
ihn das Video überhaupt betrifft.

Zu klären: Gehört das System in den Sprechtext, ins Bild (Kopfzeile hat schon
den Setup-Kontext), in den Titel — oder in alle drei? Der Datenvertrag kennt
bisher kein Feld dafür.

## 2 Titel sprechen niemanden an

Aktuell beschreibend statt konfrontierend:

| heute | Richtung, die gemeint ist |
|---|---|
| Dock lädt, aber kein Bild? Das ist der Grund | Wieso dein MacBook nicht auf 2 Monitoren erscheint |
| Warum „Dual Display" am Dock nichts garantiert | — |

Kern: **direkt den Zuschauer ansprechen, sein Gerät benennen, das Problem
behaupten.** Nicht neutral über eine Technik berichten.

Zu beachten: „dein MacBook" ist ausdrücklich erlaubt — Gerätehersteller stehen
bewusst nicht in `ZUBEHOERMARKEN`, weil das der Kontext des Zuschauers ist und
keine Empfehlung (siehe CLAUDE.md, Regel `produktname`).

## 3 Die fünf Shorts sind zu oberflächlich

Sie greifen je einen kleinen Aspekt rund um DisplayPort heraus. Fünf
verschiedene Macharten sind erfüllt, aber die Substanz je Video ist dünn — es
bleibt beim Anreißen.

Das ist die schwierigste Frage von den vieren, weil `winkelart` und die
Fünferregel formal genau das erzeugen, was hier zu wenig ist: fünf Zugriffe auf
**ein** Thema. Zu klären, ob das Thema breiter geschnitten gehört, ob ein Short
länger werden muss, oder ob fünf Shorts je Thema die falsche Zahl sind.

## 4 Werbung und Produkte passen nicht ins Layout

Erwartet war, dass Produkte im Video **gezeigt** werden. Das Layout sieht dafür
keinen Platz vor, und es steht in direktem Widerspruch zu zwei tragenden
Regeln:

- **`produktname`** — im Video fällt nie ein Markenname, nur Merkmale
  (`ZUBEHOERMARKEN` in `src/pruefung.ts`, harte Prüfung).
- **Gestaltungsregel** — alles Sichtbare ist selbst erzeugte Vektorgrafik, keine
  Herstellerbilder oder Produktfotos. Grund war Lizenz- und Markenrecht.

Beide Regeln sind bewusst gesetzt und tragen das Werbemodell (siehe README,
„Werbung: ein Video je Thema, sonst gar keins"). Wenn Produkte gezeigt werden
sollen, ist das keine Layoutfrage, sondern eine Entscheidung gegen diese
Regeln — mit Folgen für Kennzeichnungspflicht und Bildrechte. Das gehört
besprochen, bevor irgendetwas am Layout geändert wird.

## Was ausdrücklich bleibt

Gestaltung und Design gefallen. Die Pipeline mit fünf Videos je Woche steht und
soll nicht angetastet werden — die Kritik zielt auf den Inhalt, den sie
transportiert.
