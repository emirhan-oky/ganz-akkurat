---
name: rueckblick-lesen
description: Die Zahlen der veröffentlichten Videos deuten — Haltequote, Durchsicht, Ausreißer, Aufschlagvergleich. Nutze das bei `npm run ausreisser`, `npm run aufschlaege` oder `npm run rueckblick`, bei Fragen nach der Reichweite, danach welches Format oder welcher Aufschlag funktioniert, und bevor aus Zahlen eine Regel wird.
---

# Den Rücklauf lesen

Bis zum 18.08.2026 war die Pipeline eine Einbahnstraße: `verlauf.json` schrieb
mit, was hinausging, aber nie, was ankam. Woche 3 wusste nichts von Woche 1.

Welche Zahl zählt, steht im Vertrag: die Haltequote an Sekunde 3,5, nicht die
Aufrufe. Hier steht, wie man sie liest.

## Die drei Befehle

```
npm run rueckblick     # holt die Zahlen (läuft täglich 9:30 von selbst)
npm run ausreisser     # Haltequote neben Format und Thema
npm run aufschlaege    # jeder Aufschlag neben seiner Haltequote
```

`npm run pruefen` sagt den Stand nebenbei in einer Zeile — an der Stelle, an
der die nächste Woche geplant wird.

## Die Schwellen, hinter denen geschwiegen wird

| Schwelle | Wert | Bedeutung |
|---|---|---|
| `GENUG_FUER_MEDIAN` | 8 gemessene Videos | darunter kein Median, keine Rangfolge |
| `GENUG_JE_FORMAT` | 5 je Format | darunter kein Formatvergleich |

**Diese Schwellen sind der Zweck der Werkzeuge, nicht ihre Einschränkung.**

Beim Takt von vier Videos je Woche (seit 24.08.2026) heißt das: Der Median
steht nach **zwei Wochen**, der Formatvergleich nach **fünf** — vier Formate,
eines je Video, also eine Messung je Format und Woche. Wer vorher ein Format
streicht, hat eine Woche Zufall zur Regel gemacht.

Hier stand bis dahin eine Rechnung mit acht Formaten und acht Videos, und sie
war nach dem Umbau vom 20.08. schlicht falsch. Das ist die Sorte Fehler, die
eine Doku unbemerkt macht: Die Zahlen sahen weiter plausibel aus.

Geratene Größen haben dieses Projekt schon zweimal Geld gekostet
(`ZEICHEN_PRO_SEKUNDE`, `pauseSek`); eine geratene Reichweitenregel wäre die
teuerste, weil sie die Themenwahl steuert.

## Die Frage, die früh trägt

Nicht „welches Format ist gut" — dafür reichen die Daten wochenlang nicht —,
sondern **„was hatte dieses eine, das dreimal so gut lief"**. Ein Ausreißer
ist nach zwei Wochen sichtbar, ein Formatvergleich frühestens nach fünf.

`npm run ausreisser` markiert mit `▲`, was mehr als das Doppelte des Medians
hält. `npm run aufschlaege` ist das Gegenstück zu `npm run belege`: Dort
stehen Sprechtext und Zitat nebeneinander, hier Aufschlagtext und Haltequote.
Beide urteilen nicht — sie stellen nebeneinander, und ein Mensch liest.

## Zwei Dinge, bevor man sich wundert

- **Analytics kommt mit ein bis drei Tagen Verzug.** Für ein Video von gestern
  Abend gibt es noch nichts. Deshalb führt jeder Short zwei Messungen:
  `zuletzt` und `mitHalt` (die jüngste *mit* Kurve). Wer nur `zuletzt` liest,
  sieht `null` und hält ein Video für tot, obwohl gestern eine Zahl dastand.
- **Die OAuth-App muss auf „In Produktion" stehen.** Auf „Testing" verfällt
  die Anmeldung nach sieben Tagen, und `invalid_grant` sieht nach einem
  kaputten Token aus statt nach einer Einstellung.

## Warum nicht Buffer, warum nur YouTube

Buffers Schnittstelle **hat** ein `metrics`-Feld mit sechzehn Metriktypen. Sie
füllt es nur nicht: YouTube meldete 112 Aufrufe, Buffer meldete 0 — und
`metricsUpdatedAt` lag **vor** `sentAt`. Das ist die gefährlichste Sorte Fund,
weil nichts kaputt aussieht. Wäre es nicht aufgefallen, schriebe der Rückblick
jede Woche Nullen mit, und niemandem fiele es auf.

**Buffer bleibt trotzdem in der Kette:** `veroeffentlicht.json` hält `shortId`
und `beitragId`, Buffer liefert dazu den `externalLink` — die einzige Brücke
zwischen einem Entwurf auf der Platte und dem Video draußen. YouTube liefert
die Zahlen.

TikTok lädt seine Zahlen per JavaScript nach, Instagram gibt ohne Anmeldung
nichts heraus. Beide verlangten Geschäftskonto, Entwickleranmeldung und
Freigabeverfahren — für Zahlen zu **demselben** Video mit **demselben**
Aufschlag. Was an Sekunde 3,5 bei YouTube hält, hält auch dort. Die Zahl muss
an einer Stelle sauber sein, nicht an dreien.

## Wo die Daten liegen

- `daten/rueckblick.json` — wächst nachtragend, eine Messung je Tag und Short.
  **Deshalb täglich und nicht wöchentlich:** Wer einmal die Woche misst, sieht
  den letzten Stand; wer täglich misst, sieht die Kurve — und die beantwortet
  die eigentliche Frage. Nicht „wie viele Aufrufe hat es", sondern „wann sind
  sie gekommen". Kostet nichts, die YouTube-APIs sind kostenlos
- `daten/verlauf.json` — wird beim Lauf einmal geschrieben, danach nie wieder
- `src/rueckschau.ts` — legt beides zusammen; die Brücke ist
  `laeufe/<tag>/lauf.json`, weil nur die `shortId` **und** `themaId` **und**
  die Szenen trägt

`laeufe/` steht in `.gitignore`. Auf einem frischen Klon ist die Rückschau
leer — sie sagt das ausdrücklich, statt eine leere Tabelle zu zeigen.
