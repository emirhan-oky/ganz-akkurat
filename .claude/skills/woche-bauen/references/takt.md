# Takt: woher die Zahlen kommen

*Ausgelagert aus `CLAUDE.md` am 06.09.2026, wörtlich. Der Vertrag behält die
Sendeplätze, die Obergrenze und die Materialgrenze; hier stehen die Messungen
dahinter, die Engpassrechnung und die Rubrikenverteilung.*

## Frequenz, Uhrzeit, Obergrenze

**Die Zahl ist gemessen, nicht geraten.** Buffers Auswertung von 11,4 Millionen
Beiträgen: 2–5 je Woche bringen 17 % mehr Aufrufe je Beitrag als einer, 6–10
bringen 29 %. **Der große Sprung liegt zwischen eins und 2–5**, darüber wird es
flach — fünf ist der obere Rand des Optimums. Dazu die Warnung, die zum Kanal
passt: Ein schwächeres Video täglich zieht den Schnitt stärker herunter, als ein
starkes dreimal die Woche ihn hebt.

**Die Uhrzeiten ebenso** (Metricool 2026, 2 Mio. TikTok-Beiträge aus 92.000
Konten; Sprout Social, 2 Mrd. Interaktionen): TikTok 18–20 Uhr, **Samstag der
stärkste Tag**; YouTube Shorts 12–15 und 17–20; Instagram hat um **20 Uhr** die
meisten Aufrufe. Deshalb liegt Instagram zwei Stunden später — `beitragPlanen`
nimmt je Kanal eine eigene Fälligkeit, und bis zum 04.09.2026 war das
verschenkt.

**Die eigenen Zahlen sagen dazu nichts**, und das gehört daneben: 13 der 15
gemessenen Videos liefen um 18 Uhr, zwei um 12 — bei einer Streuung von 7 bis
701 Aufrufen. Der Unterschied zwischen den Plätzen ist um ein Vielfaches
kleiner als die Streuung innerhalb eines Platzes.

**Die Obergrenze ist 6, nicht 7.** Der Skill `youtube-shorts` nannte 3–7
(„post ~3–7/week, not spam"), und die 7 stand hier bis zum 05.09.2026. Sie ist
mit der eigenen Bauformregel unvereinbar: Bei sieben Shorts erlaubt „keine
Bauform über die Hälfte" höchstens drei je Bauform, und drei mal drei sind
neun — bei drei Bauformen geht sieben nicht auf. Das Kapitel „Harte Regeln" sagt
es selbst, die Takt-Tabelle sagte weiter 7.

Welcher Engpass zuerst greift:

| Engpass | trägt | Rechnung |
|---|---|---|
| **Bauform im Vorrat** | **3 Wochen** | 35 Zitatkarten, 7 Wechselreden, 6 Stationen — höchstens 2 je Bauform und Woche |
| Ideenvorrat | ~7 Wochen | 77 Ideen bei fünf je Woche |
| Formatabwechslung | 5 je Woche | vier Formate, eines doppelt, keines hintereinander |
| Produktion | ~26 je Woche | 11 min je Video, davon 6 min Beleg |
| Buffer | 10 je Kanal | fünf geplante Beiträge je Kanal gegen ein Limit von zehn |
| ElevenLabs | ~170 je Monat | rund 715 Zeichen je Video, 121.000 im Monat |

**Der Engpass ist seit dem 05.09.2026 die Bauform, nicht die Idee.** Von 48
geschriebenen Dialogen sind 35 Zitatkarten; jede Woche braucht drei Videos, die
keine sind, und davon gibt es dreizehn. `npm run wochenvorschlag` rechnet die
Reichweite am knappsten Bestandteil und meldet sie bei jedem Aufruf. **Was
fehlt, sind Wechselreden und Stationen** — nicht Themen.

## Welche Rubrik wann

**Vier Rubriken je Woche, die vorratsstärkste zweimal.** Keine Zuordnung zu
Wochentagen — *„Mir ist es egal, was an welchem Tag kommt."*

Die Regel folgt dem Bestand, statt ihn vorzuschreiben: Heute bekommt „Das gibt
es wirklich" den zweiten Platz (21 Entwürfe), schrumpft der, wandert er von
allein weiter. **„Es war einmal" bekommt ihn nie**, solange es der kleinste
Vorrat ist — genau das Format, das mit zwei Entwürfen am Limit steht.

**Der Wochentag ist damit nicht zurück.** Gestrichen wurde am 20.08.2026 die
Zuordnung **Format → Tag**; die gibt es nicht wieder. Fest ist, **dass**
gesendet wird, nicht **was**.

`wochenAuswaehlen` in `src/wochenauswahl.ts` sucht die fünf, die Format, Bauform
und Sachgebiet gleichzeitig erfüllen. Von Hand ist das nicht mehr zu treffen:
Eine Suche über 4.000 Kombinationen fand am 04.09.2026 nichts.

**Zwei Tage lang lag das an etwas anderem, als die Meldung sagte.** Der
Vorschlag nannte als Ursache die Bauformregel — tatsächlich standen **27 von 51
Shorts auf einer verbotenen Pose** (`achselzucken` im Wortwechsel, `staunen` im
Schluss), und `laufPruefen` wirft beides als Fehler. **Eine Fehlermeldung, die
rät, schickt die Suche in die falsche Richtung.** Seit dem 06.09.2026 sind die
Posen ersetzt und die Woche kommt wieder zustande.

Dazu sortiert `wochenAuswaehlen` seitdem **die knappe Bauform nach vorn**: Je
Format werden höchstens acht Kandidaten durchprobiert, und die wenigen
Wechselreden und Stationen standen weiter hinten im Vorrat. **Eine Suche, die
den knappsten Bestandteil zuletzt ansieht, findet ihn bei jeder Kappung
nicht.**
