---
name: bild-bauen
description: Das Bild eines Shorts bauen und prüfen — Bühnenmaße, was gezeichnet wird, Figur und Kamera, Bewegungsregeln, die Standbildpflicht. Nutze das beim Anlegen oder Ändern einer Zeichnung, beim Bau von Szenen-Layouts, bei Animation und Kamerafahrten, und immer bevor ein Bild als fertig gilt.
---

# Das Bild bauen

Die eine Regel, aus der alle anderen folgen: **Eine Zeichnung ist erst geprüft,
wenn sie gerendert danebensteht.** Sie hat sich siebenmal bewährt, und jedes
Mal sah der Code vorher richtig aus.

## Was gezeichnet wird

**Gezeichnet wird, was der Satz nennt. Nicht gezeichnet wird, was ein
Datenblatt behaupten würde** — Buchsenformen, Pinbelegungen, Leistungsangaben,
Herstellermerkmale. Dafür steht keine Quelle ein.

**Nicht, worum es im Video geht.** Der Sonntags-Short handelt vom Fingerabdruck
im Browser, aber der Satz lautet „Erkannt wirst du am Browser". Zweimal wurde
trotzdem ein Fingerabdruck gezeichnet, zweimal hat ihn das Standbild verworfen:
konzentrische Kreise lasen sich als Radar, offene Bögen als Regenbogen. Ein
Browserfenster ist mit vier Linien eindeutig.

**Eine Assoziation, die nicht trifft, ist schlechter als der schlichte
Gegenstand.** Von 26 Zuordnungen waren zehn falsch, alle aus demselben Grund:
Aus „keine falschen Buchsen" war beim Bauen „keine Gegenstände" geworden, und
an ihre Stelle traten Bilder daneben — ein Sofa für „Dein Fernseher hat ein
Mikrofon", eine Waage für „zwei Kabel". Beim Zuschauer sieht das aus wie ein
Versehen, und genau das ist es. Ein Fernseher als Rechteck auf einem Fuß
behauptet nichts, was falsch sein könnte.

Nennt der Satz **keinen** Gegenstand, steht ein Situationssymbol: Kalender für
eine Frist, Fabrik für „ab Werk", Menschen für „alle gleichzeitig". Wo auch das
nicht trägt, trägt die Zahl das Bild.

**Keine Fotos, keine KI-Bilder, kein Stock-Material, keine Herstellerfootage.**
Das ist seit dem 20.08.2026 keine Doktrin mehr, sondern eine Folge: Der
Charakter-Stack leistet dasselbe lokal und kostenlos, und ein generiertes Bild
behauptet mit, ohne dass eine `quelleId` daran hängt.

## Die Bühne ist 200 × 150

`viewBox="0 0 200 150"`, Standfläche bei `y = 140`, **nichts unter y = 146**.

Wer für 200 × 200 zeichnet, verliert alles unter 150, und zwar **lautlos**: Das
Symbol erscheint, nur ohne Unterkante. Am 18.08.2026 traf das drei von vier
neuen Zeichnungen. Beim QR-Code fehlte dadurch die dritte Eckmarke — ohne die
sind es drei Quadrate.

Strichstärke 4 px auf 200 Einheiten. Was mehr als etwa ein Dutzend Linien
braucht, wird bei dieser Stärke ein grauer Fleck.

## Figur und Kamera

Seit dem 20.08.2026 trägt eine gerigte Figur die Shorts. Die Skills
`character-rigging`, `svg-character-animation` und `character-animation-qa`
halten das Handwerk; hier steht, was für dieses Projekt gilt.

**Die Zeitachse ist pausiert und wird vom Bild getrieben.** Nie
`requestAnimationFrame`. Remotion rendert Bild für Bild und nicht in Echtzeit
— eine selbstlaufende Zeitachse ergibt bei jedem Render eine andere Fassung,
und keine davon entspricht der Vorschau.

**Kein GSAP.** Der Skill `svg-character-animation` zeigt es mit einer
pausierten GSAP-Timeline, aber die Bedingung ist die Bildsteuerung, nicht die
Bibliothek. Remotions `interpolate` und `spring` sind per Bauart bildgetrieben,
stehen in `bewegung.ts` schon im Projekt und teilen sich `TEMPO.feder` mit
allem anderen. Eine zweite Zeitachsen-Bibliothek daneben wäre ein Fremdkörper
mit eigenem Gefühl für Tempo.

**Zeichnen und Zeit sind getrennt.** `Figur.tsx` bekommt eine fertige Pose und
kennt keine Bilder; `posen.ts` rechnet aus dem Bild eine Pose und zeichnet
nichts. Wer beides mischt, bekommt eine Animation, die sich in der Vorschau
anders verhält als im Render.

**Ein Koordinatenraum für alles.** Die Figur lebt in denselben 200 × 150 wie
die Symbole, Standlinie y = 140. Das ist die tragende Entscheidung: Figur und
Requisite stehen **ohne Umrechnung** nebeneinander, und eine Hand kann auf
einen Punkt zeigen, der im Symbol wirklich dort liegt. Ein eigener Figurenraum
hätte bei jeder Berührung eine Umrechnung verlangt, und die hätte irgendwann
jemand vergessen.

**Die Symbole sind Requisiten.** Die geprüften Zeichnungen bleiben und werden
zu Dingen, die die Figur hält oder anschaut. Sie sind teuer erarbeitet, sieben
davon im Standbild verworfen und neu gezeichnet.

**Kamerawerte, gemessen am 12.08.2026:** Über etwa **1 % Bildänderung je
Einzelbild** wird eine Fahrt unruhig. `spring` in Remotions Voreinstellung
(`damping: 10`) erreicht in der Spitze das 2,95-fache seiner
Durchschnittsgeschwindigkeit, `Easing.inOut(sin)` nur das 1,57-fache.
`TEMPO.feder` aus `src/marke.ts` (`damping: 200`) ist nicht gemessen.

**Die Denkpause bleibt eine Pause.** `pauseSek` bestellt Stille, keine
Gelegenheit für Bewegung. Wer sie füllt, nimmt der Frage ihre Wirkung.

## Die Figur: was die Standbilder verworfen haben

Vier Anläufe am 20.08.2026, jeder Fund im Code unsichtbar:

| Fund | Was das Standbild zeigte |
|---|---|
| Arme drehen spiegelverkehrt | Die Lesepose streckte beide Arme waagerecht zur Seite |
| `sweep = 1` an den Haaren | Der Bogen lief über die untere Kopfhälfte und verschluckte die Brauen |
| Kopf 38 hoch, Rumpf 34 | Kleinkindmaße — eine Figur, die keinen trockenen Satz sagen kann |
| Hals auf Ebene 12 | Weißes Rechteck auf der Brust, las sich als Latz |
| Rumpf ohne Halsausschnitt | Die größte Fläche im Bild und die einzige ohne Merkmal |
| Unterarme vor den Körper | Ein Balken quer über dem Bauch, Hand in der Mitte |

**Die Vorzeichenregel ist gemessen, nicht gedacht.** In SVG läuft y nach
unten, ein positiver Winkel dreht also visuell im Uhrzeigersinn. Ein
hängender **rechter** Unterarm klappt mit **positivem** Winkel vor den
Körper, ein linker mit negativem. Wer es andersherum annimmt, bekommt eine
Figur, die alles nach außen streckt — und die Zahlen sehen dabei richtig aus.

**Eine Pose kann eine Requisite brauchen.** `lesen` ist ohne Blatt nicht zu
zahm, sondern falsch: In der Vorderansicht liegt der linke Arm hinter dem
Rumpf und ist unsichtbar. Der Prüftisch zeigt sie deshalb **mit** Requisite —
eine Probe, die den falschen Zustand zeigt, prüft nichts.

**Requisiten haben zwei Bauarten, und die Wahl ist keine Geschmacksfrage.**
`anTeil` hängt sie in die Drehkette und lässt sie mitkippen; `ebene` stellt
sie frei in Bühnenkoordinaten. Ein Blatt am Handteil kippt um dreißig Grad
mit dem Unterarm — so hält niemand ein Blatt.

## Die Bühne: Vorgang statt Zustand

Seit dem 20.08.2026 die Regel über allen anderen:

> **Eine Bühne zeigt einen Vorgang, keinen Zustand.** Zwischen erstem und
> letztem Bild einer Szene muss sich etwas ereignet haben.

Der Befund dahinter: Von zwölf vermessenen viralen Tech-Shorts leben **neun
von einer Vorführung** — ein Gerät in der Hand, eine Bildschirmaufnahme, ein
Auto vor Ort. Das ist der Motor, nicht der Text. Wir haben nichts vorzuführen,
also muss die Zeichnung es tun.

Die Regel steht im Schema und nicht in einem Kommentar: Bei `art: 'figur'`
müssen `von` und `nach` verschiedene Posen sein, bei `art: 'gegenueber'`
verschiedene Zeichnungen. Eine Bühne, die endet wie sie anfing, wird abgelehnt.

Zwei Bühnen gibt es:

| Bühne | was sie tut | wofür |
|---|---|---|
| `figur` | Haltungswechsel bei 40 % der Szene, Requisite taucht kurz davor auf | der Regelfall |
| `gegenueber` | oben ein Zustand, dann kommt der zweite dazu | `eswareinmal`, `werhatrecht` |

`gegenueber` stammt aus dem kürzesten Video der Sammlung: DJI zeigt in sieben
Sekunden oben „AMATEUR" und unten „PRO", 1,75 Mio Aufrufe, kein gesprochenes
Wort.

**Die Requisite erscheint vor dem Haltungswechsel, nicht danach.** Umgekehrt
reagiert die Figur auf etwas, das noch nicht da ist; gleichzeitig sieht es aus,
als hätte sie es herbeigezaubert.

**Alles rechnet in Anteilen der Szene, nie in Sekunden.** Wer feste Sekunden
rechnet, hat die Bewegung nach drei Sekunden durch, während die Stimme noch
neun weitere redet — derselbe Fehler, der am 13.08.2026 alle vier
Vertiefungsszenen stillstehen ließ.

### Was die Bühnen-Standbilder verworfen haben

| Fund | Was das Standbild zeigte |
|---|---|
| `frame - beginn` an `poseAus` | Senkrechte Striche durch die ganze Figur |
| `Symbol` statt `Symbole` | Eine zweite Standfläche schwebte neben der Figur |
| Beide mittig positioniert | Die Lupe lag über dem Kopf |
| Gegenüber als Flex-Kästen | Beide Hälften oben zusammengedrängt, Etiketten am Bühnenrand |
| Etikettbreite 5,1/Zeichen | „FRÜHER" stand rechts über seinem Kasten hinaus |

**Der erste ist der lehrreichste.** Die Bühne schob den Frame um den
Übergangsbeginn zurück und übergab damit negative Werte. `lidschluss` rechnete
`(-51) % 97` — JavaScripts Restoperator behält das Vorzeichen des Dividenden,
also `-51` statt `46`. Der Wert fiel unter die Blinzeldauer, `interpolate`
extrapolierte ihn ohne Klemmung, und die Augen wurden auf das
**Einundzwanzigfache** gestreckt.

Zwei Lehren, beide allgemein: **Zwei Zeitachsen in einem Zähler sind eine zu
viel** — der Posenwechsel bekam deshalb `abBild`, während Atmen und Blinzeln
ab Bild 0 weiterlaufen. Und `interpolate` ohne `extrapolate`-Klemmung ist eine
Falle, die erst außerhalb ihres Bereichs zuschnappt.

## Die Kamera

`video/bausteine/Kamera.tsx` fährt **innerhalb** des SVG und rechnet in
Bühneneinheiten. Als CSS-Transform am Container ginge es nicht: Ein Zoom auf
„die Stelle, an der die Lupe auftaucht" lässt sich nur formulieren, wenn die
Stelle Koordinaten hat.

**`Easing.inOut(sin)`, nie `spring`.** Bei einer Figur ist die Feder richtig —
ein Arm, der federt, wirkt lebendig. Eine Kamera, die nachschwingt, wirkt
verwackelt. Die Messwerte vom 12.08.2026 stützen das: `spring` mit
`damping: 10` erreicht das 2,95-fache seiner Durchschnittsgeschwindigkeit,
`Easing.inOut(sin)` nur das 1,57-fache, und über 1 % Bildänderung je Einzelbild
wird eine Fahrt unruhig.

`ZOOM_MAX` steht auf 1,4 und ist **gesetzt, nicht gemessen** — darüber liegt
die Figur schnell teilweise außerhalb, und ein abgeschnittener Kopf ist
derselbe lautlose Fehler wie eine Zeichnung unter y = 146.

## Der Prüftisch

Drei Kompositionen in `Root.tsx`, jede für einen anderen Fehler:

```
npx remotion still video/index.ts Figurenprobe    posen.png   # alle Posen
npx remotion still video/index.ts Figurengeruest  rig.png     # Pivots und Grenzen
npx remotion still video/index.ts Figurenfolge    folge.png   # vier Zeitpunkte
npx remotion still video/index.ts Wortwechselprobe paare.png  # zwei Figuren
```

`Wortwechselprobe` beantwortet die Posenfrage bei zwei Figuren für das ganze
Vokabular: zwanzig Kacheln, jede Pose einmal links neben einer ruhenden Figur
und einmal rechts. Gemessen am 26.08.2026 greifen **`zeigen`, `erklaeren` und
`achselzucken`** in die andere Figur, die übrigen sieben bleiben frei;
`src/pruefung.ts` sperrt die drei seither.

Sie rendert durch `Buehnenbild` selbst statt durch einen Nachbau der Anordnung.
Ein Nachbau wäre eine zweite Geometrie neben der echten und liefe beim ersten
Umbau lautlos auseinander.

`Figurenfolge` ist die Bewegungsprobe als **einzelnes Bild**. Die vier
Zeitpunkte sind gewählt, nicht gleichmäßig verteilt: Bild 2 fällt in den
Lidschluss, Bild 12 in den Übergang, Bild 45 in die Ruhe danach, Bild 99 in
das zweite Blinzeln. Vier gleiche Abstände hätten das Blinzeln zuverlässig
verpasst.

`npm run pruefen` parst das Rig mit und meldet Posen, die ein Gelenk nennen,
das es nicht gibt. Der Tippfehler ist sonst unsichtbar — der Renderer schlägt
nach, findet nichts und zeichnet die Ruhelage.

## Bewegungsregeln

Aus drei Web-Skills übernommen, die am 20.08.2026 entfernt wurden, weil ihr
Maßstab Interaktionsfrequenz und Sub-300-ms-Fenster war — beides gibt es im
Video nicht. Übertragbar ist das Handwerk:

- **Nur `transform` und `opacity` animieren.** Sie überspringen Layout und
  Paint. `width`, `height`, `margin`, `top`, `left` lösen alle drei
  Rendering-Schritte aus.
- **Kein `ease-in` auf einem Eintritt.** Es verzögert den Moment, den der
  Zuschauer am genauesten ansieht.
- **Eigene Kurven statt der eingebauten.** Die CSS-Voreinstellungen sind zu
  schwach: `cubic-bezier(0.23, 1, 0.32, 1)` als starkes Ease-out,
  `cubic-bezier(0.77, 0, 0.175, 1)` für Bewegung über die Fläche.
- **Nie aus `scale(0)` heraus.** Von `0.9` bis `0.97` plus Deckkraft.
- **Kindtransformationen nicht über eine CSS-Variable am Elternteil steuern** —
  das rechnet die Stile aller Kinder neu.

## Die Prüfung, und warum sie zweimal falsch herum stand

`src/illustration.ts` schlug aus dem Szenentext ein Symbol vor. Ergebnis: Jede
Szene bekam eins, der Erklärvideo-Reflex in Codeform. Ersatzlos gestrichen —
welche Szene ein Bild trägt, ist eine Entscheidung.

Die Regel danach stand zweimal auf der falschen Seite:

1. Sie prüfte nur nach **oben**. Ergebnis: gar keine Zeichnungen in acht
   Shorts, weil nichts nach unten fragte.
2. Sie verlangte **genau eine** je Short. Ergebnis: eine, vier Szenen leer.

Heute meldet sie jede bebilderbare Szene **ohne** Zeichnung, und zusätzlich
dieselbe Zeichnung zweimal im selben Video. Über verschiedene Shorts hinweg ist
Wiederholung erwünscht: Das Gesetzbuch soll bei jedem Rechtsthema dasselbe sein.

## Die Standbildpflicht — sieben Fälle

Jeder sah im Code richtig aus:

| Fund | Was das Standbild zeigte |
|---|---|
| Steckdose | las sich als Gesicht |
| Kalender | schrumpfte in textreicher Szene zur Karte mit Streifen |
| Nachbarhäuser | ohne Dächer und damit keine Häuser |
| Hook „Zwanzigtausend." | lief über den rechten Rand in TikToks Bedienleiste |
| Formatpille | brach auf zwei Zeilen und zog die Kopfzeile hoch |
| Ladenkasse | sah aus wie `fernseher` zwei Videos weiter |
| zwei Kabel | gespiegelt gezeichnet und damit Ohrhörer |

Zwei Folgen im Code: Die Hook skaliert nach dem **längsten Wort**, nicht nach
der Gesamtlänge — ein langer Satz bricht um, ein langes Wort nicht, und deutsche
Komposita sind lang. Die Pillennamen stehen getrennt vom Formattitel in
`FORMATE[...].pille` und brechen nie um.

Ein achter Fall betraf nicht die Zeichnung, sondern ihren Platz: Die Symbole
erschienen **60 Pixel groß statt 560**. In einer Flex-Spalte nahm der Text
sich, was er brauchte, und die Zeichnung bekam den Rest. Eine Zeichnung braucht
eine Untergrenze, keinen Restplatz.

## Der Rand, den niemand sieht

Der Untertitel sitzt in seiner **270-Pixel-Zone** unten, darunter beginnt
TikToks Bedienleiste. Rechts liegen die Schaltflächen. Die Bühne ist 1100 Pixel
breit — was darüber hinausragt, ist auf dem Rechner sichtbar und auf dem Handy
verdeckt.

**Auf dem Handy ansehen, nicht am Rechner.**

### Der Beschnitt ist gemessen: 52 links, 56 rechts

Am 15.08.2026 an einem veröffentlichten Beitrag nachgemessen (`BESCHNITT` in
`video/Anordnungsprobe.tsx`): Alle drei Apps zeigen 9:16 auf den heute üblichen
langen Displays **formatfüllend** und schneiden seitlich ab.

Diese Zahl entscheidet mehr, als sie aussieht. Der Vorhangstreifen sollte
zuerst 50 Pixel breit werden — er hätte **vollständig im Beschnitt gelegen**.
Am Schreibtisch sichtbar, im Feed nie. Der Kommentar dort sagt es genau: *Was
dort steht, ist nicht verdeckt, es ist nicht da.*

## Der Vorhang

Seit dem 31.08.2026 liegt über der Bühne ein Theatervorhang
(`video/bausteine/Vorhang.tsx`). Er reicht von **y = 0** bis zum unteren
Bildrand — die Kopfzeile liegt darüber, nicht daneben.

**Links und rechts bleiben 100 Pixel gerafftes Tuch stehen**, über die ganze
Laufzeit. Alles, was am Bildrand steht, rückt darum ein: Untertitel und
Sprechblase links, der Like-Zeiger und der Schluss-Zeiger `tiktok` rechts. Wer
`VORHANG.rand` erhöht, sieht den `tiktok`-Zeiger als Erstes klemmen — er reicht
bis 908 Pixel.

**Die Szenen selbst sind nicht betroffen**, und das ist keine Umsicht, sondern
Geometrie: Jede Szene rendert im Bühnen-SVG von x = 170 bis 880, auch bei
Kamera-Zoom. Ein Streifen bei 0–100 und 980–1080 kann sie nicht erreichen.

### Kontrast gegen einen Verlauf

Auf dem Vorhang gilt nicht die Grundfarbe, sondern der **ungünstigste Ton des
Verlaufs**. Der Stoff hat drei: `grund`, `tief` (46 % Schwarz) und `licht`
(24 % Weiß). Zweimal an einem Tag ist genau daran gerechnet worden:

- Ein weißer Umriss um die Figuren, verteidigt mit Kontrast **1,26** — gerechnet
  gegen den **Körper** der Figur statt gegen die Figur. Ihr Gesicht steht mit
  **17,1** auf dem Körper; der Rand, den man sah, war der Saum des Rigs.
- Die Kennfarben mit dokumentierten **3,23** und **4,36** — gegen `grund`
  gerechnet. Gegen `licht` fallen sie auf **1,76** und **2,37**.

**Der Kontrast gegen einen Farbverlauf ist der gegen seinen ungünstigsten Ton,
nicht gegen seinen mittleren.**

## Werkzeug

`skripte/ff` kapselt ffmpeg und ffprobe. Beide liefert Remotion mit (Fassung
7.1), aber sie finden ihre eigenen dylibs nicht ohne `DYLD_LIBRARY_PATH` und
brechen sonst mit „Library not loaded" ab — was nach einer kaputten
Installation aussieht und keine ist. Homebrew wird nicht gebraucht.

```
skripte/ff ffprobe -v error -show_entries format=duration \
  -show_entries stream=codec_type,width,height,r_frame_rate \
  -of default=noprint_wrappers=1 datei.mp4
```

Erwartet: `1080 × 1920`, `30/1`, ein Video- **und** ein Tonstrom, Dauer im
Längenfenster.

Es ist ein abgespecktes ffmpeg mit Whitelist für Filter, Muxer und Decoder.
`skripte/ff ffmpeg -version` zeigt sie.

## Die Kette vor „fertig"

Nach `character-animation-qa`, sechs Stufen:

1. Schema — Figurendaten, Rig, Posen, Zeitachse
2. Bestand — jedes genannte Teil und jeder Hintergrund existiert
3. Vorschau im Browser, Screenshots, Konsolenfehler einsammeln
4. **Bewegungsprobe** — abgetastete Einzelbilder vergleichen. Fängt die
   eingefrorene Animation, die im Code richtig aussieht
5. `ffprobe` auf die fertige Datei
6. Ansehen: abgelöste Gliedmaßen, falsche Ebenenreihenfolge, Figur aus dem
   Bild, unlesbarer Text

`pass` heißt: Technik grün **und** das Spiel ist lesbar. `revise` ist ein
reparierbarer Rig- oder Zeitachsenfehler. `fail` sind fehlende Teile, leeres
Bild oder ein Abbruch.
