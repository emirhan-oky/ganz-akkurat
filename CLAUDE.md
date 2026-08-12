# SetupKlar

Automatisierte Shortvideo-Produktion. Entwurf → Vertonung → Render → Freigabe →
Veröffentlichung. Deutschsprachig, auch im Code: Bezeichner, Kommentare und
Ausgaben sind deutsch.

## Prüfen vor allem anderen

```
npm run pruefen     # tsc --noEmit && Schemaprüfung der Daten
npm run lauf        # Wochenlauf, ohne Ton (Szenenlängen geschätzt)
npm run lauf -- --mit-ton   # kostet ElevenLabs-Kontingent
```

`npm run pruefen` muss vor jedem Lauf grün sein. Die Schemaprüfung
(`skripte/schemapruefung.ts`) existiert wegen einer teuren Erfahrung:
`daten/beispiel-short.ts` ist die Standard-Prop der Remotion-Komposition und
wird in `calculateMetadata` **im Browser-Kontext** geparst. Reißt er das Schema,
bleibt Remotion in einem unerfüllten Promise stehen — der Render hängt ohne
Fehlermeldung, bis jemand abbricht. `tsc` sieht das nicht, weil TypeScript
Formen prüft und nicht Werte.

Geparkte Entwürfe (`blockierend: false`) erscheinen als Hinweis und ändern den
Exit-Code nicht. Eine Prüfung, die dauerhaft rot ist, liest bald niemand mehr.

## Datenvertrag

`src/typen.ts` ist der einzige Vertrag. Alles andere richtet sich danach.

**`winkelart`** — eine von 14 Macharten (`WINKELARTEN`), je mit einer
Pflicht-Signaturszene. Die fünf Shorts eines Laufs müssen fünf *verschiedene*
Macharten haben; eine Dopplung ist ein Fehler auf jedem betroffenen Short.
Grund: Vielfalt entstand vorher nur aus gemischten Szenenbausteinen, nicht aus
verschiedenen Zugriffen — zwei Videos sagten faktisch dasselbe.

**`kennzeichnung.werbung`** — Dreiwert, kein Boolean:

| Wert | Bedeutung |
|---|---|
| `keine` | keine kommerziellen Verweise, kein Label |
| `beschreibung` | Partnerlinks nur in der Beschreibung, kein Label im Bild |
| `video` | Label wird ins Video eingebrannt (`video/Short.tsx`) |

**`Lauf`** ist ein Thema × 5 Shorts. Das Schema wird von **keinem Skript
geparst** — laufweite Regeln gehören deshalb in `laufweiteBefunde` in
`src/pruefung.ts`, nicht in ein `superRefine` auf `Lauf`. Eine Regel dort ist
tote Regel.

Es gibt kein `produktnaehe` mehr. `winkelart` hat es ersetzt.

## Harte Regeln (`src/pruefung.ts`)

Fehler halten einen Short zurück, Hinweise erscheinen nur in der
Freigabe-Übersicht.

- **`beleg`** — mindestens drei Quellen je Short, und `presse` zählt nie mit
  (`OFFIZIELLE_ARTEN`). Ein Fachartikel referiert bestenfalls das Datenblatt und
  altert schneller als die Spezifikation.
- **`produktname`** — im Video fällt nie ein Markenname (`ZUBEHOERMARKEN`), nur
  Merkmale. Das ist die Regel, die das ganze Modell trägt: Nennt das Video ein
  Produkt, bewirbt es und braucht die Kennzeichnung im Bild. Gerätehersteller
  (Apple, Dell) stehen bewusst nicht in der Liste — „dein MacBook" ist Kontext,
  keine Empfehlung.
- **`kennzeichnung`** — ein Partnerlink braucht „Werbung", „Anzeige" oder
  „Werbepartner" **in derselben Zeile**. Ein Sammelhinweis am Textende
  kennzeichnet den Link zwanzig Zeilen weiter unten nicht (LG Erfurt,
  23.11.2020). „Affiliate-Link" und „gesponsert" hat der BGH als unscharf
  verworfen (06.02.2014, I ZR 2/11).
- **`produktionsregel`** — kein Sprechtext behauptet eigene Produkterfahrung,
  kein Titel sagt „Test", solange nichts selbst benutzt wurde. Zulässig:
  „Vergleich", „Kompatibilitätscheck", „Kaufhilfe".
- Ein Verweis nach draußen (`VERWEIS_NACH_DRAUSSEN`) erzwingt
  `werbung: 'video'`. Die Regel gilt nur in diese Richtung — ein Label ohne
  Verweis ist die vorsichtige Wahl, kein Fehler.

## Quellen

`daten/quellen.json`. Neue Quellen kommen erst hinein, **nachdem die URL
tatsächlich abgerufen und der Inhalt gelesen wurde** — nie aus dem Gedächtnis
und nie aus einem Suchtreffer-Ausschnitt. `geprueftAm` dokumentiert genau diesen
Abruf.

## Werbemodell — Phase 1 (Stand 12.08.2026)

**Zurzeit gar keine Werbung und keine Links, in keiner Beschreibung.** Für
Affiliate braucht es zuerst ein Kleingewerbe. Reihenfolge: Gewerbe →
Steuernummer → Bewerbung bei Amazon PartnerNet (dort werden Konten gekündigt,
die in 180 Tagen keine drei qualifizierten Verkäufe haben — Reichweite muss
vorher stehen).

Ab Partnerkonto gilt Variante A: nur der Kaufberatungs-Short trägt Partnerlinks
und dafür das Label im Bild; die anderen vier bleiben ganz ohne Links. Ob
Kennzeichnung allein in der Beschreibung für ein *Video* genügt, ist ungeklärt —
der Leitfaden der Medienanstalten behandelt den Fall nicht, YouTube empfiehlt
die Einblendung, eindeutige Rechtsprechung fehlt. Anwaltliche Auskunft ist
vorgesehen.

## Takt

Fünf Shorts pro Woche aus **einem** Thema, ein Video je Werktag um 18:00
(`src/buffer.ts`).

## Stand und nächster Schritt

Die Pipeline steht bis einschließlich Veröffentlichung: Ablage auf Cloudflare
R2, Einplanung über Buffer, Zugangsprüfung (`npm run zugaenge`). Alle Zugänge
liegen in `.env` und sind mit einem echten Video durchgetestet.

**Als Nächstes geht es um den Inhalt, nicht um die Optik.** Die offene Kritik
am Lauf `2026-08-12` steht in `offene-punkte.md`: fehlende Systemangabe
(macOS/Windows), zu beschreibende Titel, zu dünne Themen und die Frage, wie
Produkte gezeigt werden sollen, ohne die Regeln `produktname` und Eigenbau-
Vektorgrafik zu brechen. Nichts davon ist entschieden.

**Kamera-Layer: probiert, verworfen (12.08.2026).** Ein `Kamera`-Baustein fuhr
in der Anschluss-Szene auf die Bruchstelle zu. Die Bewegung wirkte auch nach
Umbau auf gleichmäßige Kurven nicht flüssig genug und ist wieder entfernt.
Falls das Thema zurückkommt, die Messwerte von damals: `spring` erreicht in der
Spitze das 2,95-fache seiner Durchschnittsgeschwindigkeit, `Easing.inOut(sin)`
nur das 1,57-fache; über etwa 1 % Bildänderung je Einzelbild wird eine Fahrt
unruhig. Der eigentliche Engpass war die Szenenlänge — nach dem Bildaufbau
bleiben keine zwei Sekunden für eine Fahrt.

Geblieben ist ein dabei gefundener Fehler: Die Signalkette braucht bei drei
Geräten 1134 Pixel, die Bühne hat 1100 — die Beschriftung des letzten Geräts lag
in dem Bereich, den Reels mit der Beschreibung überdeckt. Sie skaliert sich
jetzt auf den verfügbaren Platz. **Die Videos in `laeufe/2026-08-12` sind vor
dieser Korrektur gerendert.**

Später denkbar für die Optik: **Detailzoom** in den Stecker (`@remotion/paths`,
`getPointAtLength`), `@remotion/three`, eigene Makroaufnahmen als Beleg-B-Roll.
Verworfen: LottieFiles (bricht das Eigenbau-Prinzip) und Rive (Interaktivität
ist bei gerendertem Video wertlos).

Offen bleibt `daten/entwuerfe/powerbank-flug.ts` — steht auf einer einzigen
Quelle (LBA) und ist deshalb geparkt, nicht im Wochenlauf.
