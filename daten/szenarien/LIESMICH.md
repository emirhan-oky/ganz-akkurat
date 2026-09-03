# Die Szenarien

Wie ein Gespräch zwischen Volti und Watti aufgebaut sein kann. **Ein Dokument je
Szenario, darin vier Beispiele** — mit einem einzigen Beispiel baut jeder
Entwurf genau dieses eine nach.

`skript-schreiben` liest diesen Ordner. Der Skill enthält die Szenarien nicht,
er verweist darauf. **Eine neue Runde legt hier eine Datei ab und fasst den
Skill nicht an.**

## Woher das kommt

Am 02.09.2026 hat Emirhan neun Dialoge geschrieben und danach in sechs Runden
Gegenentwürfe von Claude beurteilt. Die Messung steht in
`daten/marke/dialoganalyse.md`, die achtunddreißig Befunde ebenfalls.

**Der Satz, der über allem steht:** Jede Runde legt einen **Weg** dazu, keine
Regel obendrauf. Frühere Befunde werden nicht ersetzt, sondern Alternativen —
*„damit keine Schablone entsteht."*

## Der Pool

**31 von 48 Beispielen, Stand 03.09.2026.** Durchgang 1 hat je Szenario eines
gelegt, Durchgang 2 auf zwei aufgefüllt, Durchgang 3 füllt auf drei auf; Szenario 4 ist mit vieren fertig.

| | Szenario | Beispiele | wie die Wendung gebaut ist |
|---|---|---|---|
| 1 | Volti belehrt Watti | 3 | der Normalfall — die Ariane als Gegenstand fern vom Verbraucherrecht |
| 2 | Watti fragt um Rat | 3 | Volti antwortet **und rät** |
| 3 | Watti weiß etwas und schließt falsch | 3 | Volti kontert mit dem Satz danach |
| 4 | Watti kontert erfolgreich | 4 | Erinnerung · Gegenbeispiel · Frage ohne Antwort in der Quelle · Zufallstreffer |
| 5 | Volti wird ertappt | 3 | er tut selbst, wovon er abrät |
| 6 | Beide liegen daneben | 3 | die Quelle sagt ein Drittes |
| 7 | Watti hat einen Plan | 2 | die Quelle redet von etwas anderem als beide Lager |
| 8 | Der Rückfall | 2 | am Ende macht Watti es wieder |
| 9 | Der Dritte im Raum | 2 | jemand außerhalb hat etwas gesagt — der Vater, der Nachbar |
| 10 | Die Wette | 2 | die Zitatkarte entscheidet, und der Verlierer liest sie vor |
| 11 | Watti erzählt es falsch weiter | 2 | aus einer Wahlmöglichkeit wird ein Verbot |
| 12 | Volti hat es aufgegeben | 2 | Watti fragt zum vierten Mal |

**Die Blöcke werden gezogen, nicht abgeschrieben** — `npm run szenarienblock -- <id>`
baut sie aus `daten/entwuerfe/`. Am 03.09.2026 fiel auf, dass drei Dokumente
noch Dialoge zeigten, die längst verworfen waren: `akku-wechselbar-neu`,
`flugmodus-ansage`, `drucker-punkte-weitererzaehlt`. Sie standen nur hier und
in keinem Entwurf. **Eine zweite Fassung desselben Dialogs läuft beim ersten
Umbau lautlos auseinander.**

Zwölf Szenarien mal vier Formate mal sechzehn Witzbauarten.

**Vier Durchgänge, nicht ein Block.** Durchgang 1 hat je Szenario ein Beispiel
gelegt; Durchgang 2 bis 4 füllen auf vier auf. Dazwischen steht Emirhans
Urteil — 28 Beispiele am Stück zu schreiben, ohne dass eines beurteilt wurde,
wäre das Schreiben ohne Messung.

## Die Dialoge sind fertige Videos

Nicht Übungsmaterial. **Alle zehn stehen seit dem Abend des 02.09.2026 als
Entwürfe in `daten/entwuerfe/` und in `GEPARKT`**, mit Bühne, Zügen, Macharten
und geprüften Quellen. Sie können vertont, gerendert und veröffentlicht werden.

| Datei | Szenario | Format | Länge |
|---|---|---|---|
| `garantiesiegel-nichtig` | 1 | absicht | 61 s |
| `handyversicherung` | 1 | absicht | 70 s |
| `werbeblocker` | 2 | werhatrecht | 78 s |
| `festplatte-loeschen` | 3 → 4 | gibtswirklich | 69 s |
| `fernseher-hoert-zu` | 4 | absicht | 67 s |
| `kabelschublade` | 4 | gibtswirklich | 60 s |
| `produktpass-akku` | 4 | gibtswirklich | 54 s |
| `ladekabel-watt` | 4 | werhatrecht | 55 s |
| `zettel-im-treppenhaus` | 5 | werhatrecht | 59 s |
| `urlaubsfoto` | 5 | absicht | 67 s |

**Die Texte hier sind der Stand des Gesprächs, die Entwürfe der Stand des
Kanals.** Beim Eintragen sind zwölf Zeilen enger geworden, weil der
`belegpruefer` sie als ungedeckt gemeldet hat; `festplatte-loeschen` hat dabei
sein Ende gedreht — die BSI-Seite gibt Wattis Hammer recht. Was gesendet wird,
steht in `daten/entwuerfe/`.
