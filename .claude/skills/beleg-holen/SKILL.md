---
name: beleg-holen
description: Eine Quelle abrufen, das wörtliche Zitat sichern und als Beleg an eine Szene binden. Nutze das, sobald ein Short eine Aussage trägt, die belegt werden muss — beim Schreiben neuer Entwürfe, beim Nachbelegen einer Behauptung, bei Fehlern aus `npm run quellen-pruefen`, oder wenn eine Idee aus `daten/ideen/` produktionsreif werden soll.
---

# Einen Beleg holen und binden

**Vor dem Eintragen einer neuen Quelle `references/zitat-und-abruf.md` lesen.**
Dort steht seit dem 06.09.2026, woran Zitate praktisch scheitern: das fehlende
Subjekt, die Verneinung außerhalb der Zeichenkette, die Zitatlänge und der
EUR-Lex-Umweg. Neun Befunde eines einzigen `belegpruefer`-Durchgangs hingen an
einem Wort außerhalb des Zitats.

Der teuerste Schritt der Produktion, siebenmal die Woche. Er kostet Zeit, weil
er nicht abgekürzt werden kann — und jede Abkürzung hat hier schon einmal ein
falsches Video erzeugt.

## Der Ablauf

**1 · Die Seite wirklich abrufen.** Nie aus dem Gedächtnis, nie aus einem
Suchtreffer-Ausschnitt. `geprueftAm` dokumentiert genau diesen Abruf.

**2 · Das wörtliche Zitat entnehmen.** 40–80 Zeichen, keine
Anführungszeichen im Zitat selbst. Längere Zitate brechen an Umbrüchen und
Sonderzeichen und fallen dann bei der Prüfung durch, obwohl sie stimmen.

**3 · Eintragen in `daten/quellen.json`** — mit `id` am Beleg. Daneben steht
`stuetzt`: die Folgerung in unseren Worten. Sie wird **nie** geprüft.

**4 · An die Szene binden.** Wer eine `quelleId` nennt, nennt auch eine
`belegId` — die eine Fundstelle, die genau diesen Satz trägt. Das Schema
erzwingt das Paar.

**5 · `npm run quellen-pruefen`** holt jede Seite und sucht die Zeichenkette.

**6 · `npm run belege`** stellt Sprechtext und Zitat nebeneinander. Das ist
der Schritt, den kein Skript ersetzt — siehe unten.

## Welche Quellen zählen

| Rang | Arten | Rolle |
|---|---|---|
| **unbeteiligt** | `standard`, `behoerde`, `rechtsprechung`, `wissenschaft` | dürfen eine Aussage allein tragen |
| **beteiligt** | `hersteller`, `plattform` | autoritativ fürs eigene Datenblatt, interessiert am Rest |

**`wissenschaft` ist am 20.08.2026 dazugekommen**, als die Nische von Geräten
und Verbraucherrecht auf Technik allgemein verbreitert wurde. Gemeint sind
begutachtete Veröffentlichungen, staatliche Forschungsinstitute (PTB,
Fraunhofer, NIST, ESA) und Normungsgremien jenseits von `standard`.

Der Anlass war eine Lücke, kein Wunsch: „Licht braucht 67 Millisekunden um die
Erde" belegt keine Behörde. Ohne passende Art wäre ein großer Teil der neuen
Nische unbelegbar gewesen — und dann wird die Regel nicht gebrochen, sondern
umgangen, indem der Satz an eine Quelle gehängt wird, die halb passt.

**Die Prüffrage bleibt dieselbe wie bei den anderen drei: kein
wirtschaftliches Interesse am Gegenstand.** Ein Institutsblog, der ein eigenes
Produkt bewirbt, ist `hersteller`.

**`presse` ist nicht eintragbar**, nicht bloß heruntergestuft — sie fehlt im
Enum. Erlaubt bleibt sie als Wegweiser: lesen, zur Primärquelle folgen, die
Primärquelle zitieren. Eine Regel, die sich nicht ausdrücken lässt, lässt sich
nicht brechen.

**`messung` gibt es nicht**, weil die `produktionsregel` Aussagen aus eigener
Produkterfahrung verbietet.

**Mindestens eine unbeteiligte Quelle je Short** (`UNBETEILIGTE_ARTEN`) — die
Anzahl ist am 16.08.2026 entfallen. Sie war die schwächere Hälfte: Drei
Herstellerseiten belegen nichts, eine Behördenseite belegt alles. Genau der
Fall stand im WLAN-Short, der mit drei Quellen sauber durchging und auf
TP-Link, TP-Link und Intel stand. Bei einem Fakt je Video wären drei Quellen
ohnehin zwei dekorative — und Dekoration im Belegapparat ist schlimmer als
keine, weil sie die Zahl stimmen lässt.

## Die Prüfung, die kein Skript machen kann

`quellen-pruefen` beantwortet eine Frage: *Steht das Zitat auf der Seite?*
Die zweite beantwortet es ausdrücklich nicht: **Trägt das Zitat den Satz, den
wir darauf bauen?**

Dort sitzt der teuerste Fehler des Projekts. Am 14.08.2026 stand im
Kabel-Short eine Aussage, deren Quelle existierte, deren Zitat wirklich auf
der Seite stand — und die von keiner der drei Quellen getragen wurde. Falsch
war die Folgerung dazwischen. Kein Schema, keine Zeichenkettensuche und kein
zweites Modell hätte das gefunden.

**Deshalb vor der Vertonung ansehen.** Eine falsche Folgerung, die erst in der
Freigabe auffällt, ist schon bezahlt.

**Neben jeder Behauptung steht genau ein Zitat**, das über `belegId` gebundene,
und sonst keines. Vorher standen dort **alle** Zitate der Quelle — wer drei
Zitate neben eine Behauptung gestellt bekommt, liest, ob irgendeines passt,
nicht ob dieses eine trägt. Genau so sind drei unbelegte Sätze durch die
Durchsicht gekommen. Aus 82 Paaren für acht Shorts wurden 32: dieselbe
Substanz ohne die Dekoration, die die Zahl stimmen ließ.

Für die Durchsicht der Paare gibt es den Subagenten `belegpruefer` — er liest
sie in eigenem Kontext und meldet nur die Verdachtsfälle.

## Warum die Prüfung stumpf sucht und kein Modell fragt

Beim Bau am 13.08.2026 hatte ein Modell zwei Zitate als „exakt vorhanden"
gemeldet, die es nicht waren — es hatte Anführungszeichen weggeglättet. Ein
Modell die Behauptung eines Modells prüfen zu lassen ist keine Prüfung,
sondern eine zweite Meinung.

## Warum die Szene am Zitat hängt, nicht an der Quelle

Bis zum 17.08.2026 nannte eine Szene nur eine `quelleId`. Eine Quelle mit drei
Fundstellen hing an vier Szenen, und jede erbte den Belegstatus der Quelle als
Ganzes. Formal war alles grün.

Durchgegangen sind dabei drei Sätze, die keine Quelle trug: „Kein Zufall. Ein
Gremium hat das so festgelegt." (eine Behauptung über eine **Absicht**, belegt
mit einer Seite über Leistungsklassen), das Märchen des Dienstags (die
UBA-Quelle spricht ausschließlich in der Gegenwart) und „Neunundzwanzig Euro"
— eine plausible, erfundene Zahl.

Das Entscheidende ist der **Zeitpunkt**: Die Frage „welcher Satz trägt das?"
fällt beim Schreiben an, nicht in der Durchsicht. Wo es keine Fundstelle gibt,
steht ein leeres Feld statt einer Diskussion.

**Warnzeichen:** Sobald ein Zitat mehr als zwei Szenen tragen soll, meldet
`shortPruefen` einen Hinweis. Zwei sind normal — Zuspitzung und Kipppunkt
kommen oft aus demselben Absatz. Drei sind das Muster, hinter dem sich beide
Fehler versteckt hatten.

## Zwei Bauregeln aus der Reparatur

- **Das „es war einmal" gehört in den Aufschlag und nur dorthin.** Er ist die
  einzige Position ohne Belegpflicht, und das ist kein Schlupfloch: Er setzt
  die Erzählung, er behauptet nichts. Alles danach läuft in der Gegenwart.
- **Der Streitfall des Sonntags ebenso.** Was zwei Lager behaupten, ist keine
  Aussage über die Welt — aber die Zuspitzung darunter muss eine sein.

## Wer behaupten kann, muss belegen können

`QUELLENPFLICHT` in `src/typen.ts`: Pflicht bei `aussage`, `zahl`,
`einschraenkung`, `vergleich`, `warnung`, `merkmalskarte`, `kaufkriterien`,
`beleg`. Ohne Feld bei `hook` und `endkarte`.

`abrufart: 'manuell'` ist für Seiten, die ihren Inhalt nachladen. PDFs mit
komprimierten Textströmen (Bundesnetzagentur) gehören dazu.
