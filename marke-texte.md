# Kanaltexte · Ganz akkurat

Stand 17.08.2026. Die Zeichengrenzen sind die der Plattformen, nicht unsere —
was darüber steht, wird abgeschnitten oder gar nicht erst angenommen.

## Vier Regeln für jeden dieser Texte

- **Kein Takt.** Nirgends steht, dass täglich etwas kommt. Der Wochentag ist im
  Formatmodell ein Versprechen an den Zuschauer, aber ein Versprechen gilt erst,
  wenn es gehalten wurde. In der ersten Woche ist eine angeschlagene Taktzahl
  keine Zusage, sondern eine Wette — der Mittwoch um 12 braucht jede Woche eine
  frisch abgerufene Behördenseite und hat per Bauart keinen Vorrat. Der
  Sendeplan kommt zurück, wenn er ein paar Wochen gestanden hat.
- **Kein „Test", keine behauptete Produkterfahrung.** Es wird nie etwas selbst
  benutzt, also darf es auch nirgends so klingen. `produktionsregel` in
  `src/pruefung.ts` erzwingt das für Titel und Sprechtext; hier muss es die
  Hand tun.
- **Keine Marken.** Auch nicht in der Bio.
- **Keine Mechanik erklären.** „Und im Bild steht, wer sie belegt“ stand hier
  und ist raus: Der Zuschauer sieht die Einblendung, er braucht keine
  Bedienungsanleitung dazu. Eine Bio behauptet etwas oder sie schweigt.
- **Der Beleg ist das Verkaufsargument.** Die Verpackung haben hundert Kanäle,
  die Quelle darunter nicht. Wenn in der Bio nur eine Sache steht, dann die.

---

## TikTok · Bio

Maximal 80 Zeichen — **auch Zeilenumbrüche zählen mit**. Die dreizeilige
Instagram-Fassung passt hier nicht, sie liegt bei 115.

**Empfohlen** — 76 Zeichen, zwei Zeilen, gleicher Anfang wie auf Instagram:

```
Wir behaupten nichts, was nicht belegt ist.
Behörden, Normen, Gesetzestexte.
```

Mit dem Spruch statt der Quellenarten, 66 Zeichen:

```
Wir behaupten nichts, was nicht belegt ist.
Wir haben nachgelesen.
```

Einzeilig, 70 Zeichen:

```
Wir behaupten nichts, was nicht belegt ist. Die Quelle steht im Video.
```

---

## Instagram · Bio

Maximal 150 Zeichen, Zeilenumbrüche zählen mit. Drei kurze Zeilen werden
gelesen, ein Block nicht — Instagram bricht ohnehin um.

**Empfohlen** — 115 Zeichen. Erster Satz wie auf TikTok, damit die Marke auf
beiden Plattformen gleich klingt:

```
Wir behaupten nichts, was nicht belegt ist.
Behörden, Normen, Gesetzestexte statt Meinungen.
Wir haben nachgelesen.
```

Knapper, 98 Zeichen:

```
Technikfakten, die stimmen.
Belegt mit Behörden, Normen und Gesetzestexten.
Wir haben nachgelesen.
```

**Link in Bio:** noch keiner. Solange es keine Website gibt, ist ein
Linktree-Sammelsurium der Auftritt eines Kanals, der etwas verkaufen will.
Sobald `ganzakkurat.de` steht, kommt sie dorthin.

---

## YouTube · Kanalbeschreibung

Maximal 1.000 Zeichen — die muss man nicht ausschöpfen. Dieselbe Bio wie auf
Instagram, plus Kontakt. 138 Zeichen:

```
Wir behaupten nichts, was nicht belegt ist.
Behörden, Normen, Gesetzestexte statt Meinungen.
Wir haben nachgelesen.

kontakt@ganzakkurat.de
```

Ohne Spruch, 115 Zeichen:

```
Wir behaupten nichts, was nicht belegt ist.
Behörden, Normen, Gesetzestexte statt Meinungen.

kontakt@ganzakkurat.de
```

**Hier stand zuerst eine Fassung mit 966 Zeichen**, samt Liste aller acht
Formate. Sie war Dokumentation und kein Kanaltext. Derselbe Fehler wie bei der
gestrichenen Endkarte im Video: eine Liste erklärt, wo etwas behaupten sollte.
Die Formate stehen in `src/typen.ts` und in `CLAUDE.md`, dort gehören sie hin.

**Was bewusst fehlt:** „Abonniert" und „Lasst ein Like da". Das ist Bettelei,
und ein Kanal, der auf Belege besteht, kann sie sich am wenigsten leisten.



## Kontakt

`kontakt@ganzakkurat.de`, angelegt bei STRATO. Steht in der YouTube-
Beschreibung, sonst nirgends — TikTok und Instagram haben zu wenig Zeichen,
und wer schreiben will, findet die Adresse auf YouTube.

Hier stand zwischenzeitlich eine zweite Adresse für Fehlermeldungen samt der
Zeile „Fehler gefunden? Schreib an …". Verworfen: Ein Kanal muss nicht um
Widerspruch bitten, um belegt zu arbeiten, und ein Postfach, das niemand
leert, ist schlechter als keins.

**Kein Impressum, solange nichts kommerziell ist.** § 5 DDG gilt für
„geschäftsmäßige" Telemedien, und „geschäftsmäßig" verlangt keinen Gewinn —
ohne Werbung, Partnerlinks und Monetarisierung steht aber nichts an. Mit dem
gewerblichen Start wird ein Impressum mit Anschrift fällig; der Auslöser ist
damit benannt und steht auch in `CLAUDE.md` unter „Werbemodell".

---

## Kanalname und Handle

| | |
|---|---|
| Anzeigename | Ganz akkurat |
| Handle | `@ganzakkurat` auf allen drei Plattformen |
| Domain | `ganzakkurat.de` |

Der Anzeigename wird **zusammengeschrieben**, wo die Plattform kein Leerzeichen
zulässt. Im Video steht die Wortmarke mit einem Haarspalt zwischen den
Wörtern — getrennt wird optisch durch die Strichstärke, nicht durch Luft.

---

## Wenn Affiliate dazukommt

Dann ändert sich hier etwas, und zwar zwingend: Sobald in einer Beschreibung
ein Partnerlink steht, braucht **dieselbe Zeile** das Wort „Werbung",
„Anzeige" oder „Werbepartner". Ein Sammelhinweis am Textende kennzeichnet den
Link zwanzig Zeilen weiter unten nicht (LG Erfurt, 23.11.2020), und
„Affiliate-Link" oder „gesponsert" hat der BGH als unscharf verworfen
(06.02.2014, I ZR 2/11).

Bis dahin steht in keiner Beschreibung ein Link.
