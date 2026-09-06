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
npm run laengen        # Länge gegen Verweildauer
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

## Buffer liefert alle drei Kanäle — seit dem 05.09.2026

**Der Abschnitt hieß bis zum 06.09.2026 „Warum nicht Buffer, warum nur
YouTube" und war überholt.** Er stand auf einem Befund aus der Anfangszeit:
Buffers `metrics`-Feld war leer, YouTube meldete 112 Aufrufe, Buffer 0, und
`metricsUpdatedAt` lag **vor** `sentAt`. Das war richtig beobachtet und ist
nicht mehr der Stand.

Heute liefert Buffer mit demselben Token, das ohnehin in `.env` liegt, die
Zahlen aller drei Kanäle:

| Kanal | was ankommt |
|---|---|
| **TikTok** | Aufrufe, Reichweite, geteilt, Reaktionen, Kommentare, **durchschnittliche Sehdauer** |
| **Instagram** | Aufrufe, Reichweite, geteilt, gespeichert, neue Abos, Reaktionen, Kommentare |
| **YouTube** | Aufrufe, Reaktionen, Kommentare — geteilt und neue Abos kommen weiter aus der Analytics-API |

**Und das ändert, welcher Kanal überhaupt zählt.** `fernseher-hoert` hat 7
Aufrufe auf YouTube und 271 auf TikTok, `blitzer-app` 13 gegen 228. Neun Wochen
lang wurde an der schwächsten der drei Plattformen gemessen — jede Schwelle in
diesem Skill steht auf YouTube-Zahlen und gehört nachgerechnet, sobald drei
Wochen Kanaldaten vorliegen.

**Die Sehdauer gibt es nur von TikTok**, und sie ist die einzige Zahl im
Bestand, die sagt, wie weit jemand gekommen ist. Sie stand vom 04.09. bis zum
06.09.2026 ungelesen in der Datei — beschrieben im Schema, eingetragen in
`MELDET_NICHT`, auf keiner Seite angezeigt. **Gemessen, abgelegt, nie
angesehen**, wie `laengeSek` davor. `npm run laengen` rechnet sie jetzt
getrennt neben der YouTube-Durchsicht: verschiedene Plattformen, verschiedene
Publika — nebeneinanderstellen, nie mitteln.

**Der alte Grund gegen die Plattform-APIs gilt weiter.** Instagram verlangte
Geschäftskonto, Facebook-Seite und eine Meta-App-Review von zwei bis vier
Wochen, TikTok ein Developer-Konto — für dieselben Werte, die Buffer im
kostenlosen Tarif herausgibt.

## Wo die Daten liegen

- `daten/rueckblick.json` — wächst nachtragend, eine Messung je Short und
  Messtag. **Gemessen wird seit dem 06.09.2026 sonntags, nicht mehr täglich**
  — auf Ansage: Das Projekt findet nur noch sonntags statt. Der Preis steht im
  Vertrag unter „Was ohne Zutun läuft": eine Messung je Woche, und die Kurve
  zeigt Wochenpunkte statt Tage. Die Zahlen selbst kosten nichts
- `daten/verlauf.json` — wird beim Lauf einmal geschrieben, danach nie wieder
- `src/rueckschau.ts` — legt beides zusammen; die Brücke ist
  `laeufe/<tag>/lauf.json`, weil nur die `shortId` **und** `themaId` **und**
  die Szenen trägt

`laeufe/` steht in `.gitignore`. Auf einem frischen Klon ist die Rückschau
leer — sie sagt das ausdrücklich, statt eine leere Tabelle zu zeigen.
