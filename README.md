# SetupKlar

Automatisierte Shortvideo-Produktion für die deutschsprachige Medienmarke
**SetupKlar** – Technik-Setups für Schreibtisch, unterwegs, Reise und Laden.

Ein Lauf erzeugt **fünf Shorts, einen je Rubrik** – ein Video pro Werktag.

## Die fünf Rubriken

Das Oberthema der Marke ist immer **Setup**. Darunter fünf feste Sendeplätze,
je einer pro Werktag:

```
Schreibtisch  Monitore, Docks, Kabel, Strom, Ton, Ergonomie am festen Platz
Unterwegs     Akku, Laden, Tethering, Rucksack, fremde Steckdosen und WLANs
Reise         Flug, Handgepäck, Wattstunden, fremde Stromnetze, Roaming, Zoll
Zuhause       WLAN, Router, Fernseher, Streaming, Netzwerk in der Wohnung
Kaufen        Kaufhilfe, Gebrauchtkauf, Garantie, Reparatur, Akkutausch
```

Die Liste ist **geschlossen** (`Rubrik` in `src/typen.ts`). Wer eine sechste
braucht, hat kein neues Thema, sondern ein falsch zugeschnittenes. Vorher war
das freier Text – mit der Begründung, aus der Angabe solle keine Rubrik werden,
in die jedes Thema hineinpassen muss. Genau das ist seit dem 12.08.2026
gewollt.

**Unterwegs und Reise** überlappen, wenn man sie als Orte denkt. Der Schnitt
läuft deshalb an der Frage: Sobald eine **Vorschrift oder eine Landesgrenze**
mitentscheidet, ist es Reise – sonst der Alltagsweg.

Jede Rubrik zieht aus einem eigenen **Thema**: eine Alltagsfrage mit
**mindestens drei** offiziellen Belegen. Ein Thema trägt ein Video, nicht fünf.
Vorher war es umgekehrt – einmal recherchieren, fünfmal veröffentlichen – und
genau daher kam die Oberflächlichkeit: Wer aus einer Frage fünf Videos ziehen
muss, schneidet sie in fünf dünne Scheiben.

Rohe Ideen aus einer Ideensession landen zuerst in `daten/ideen.json` – ohne
Quellenpflicht, sonst bremst die Belegarbeit das Sammeln aus. Erst wenn drei
offizielle Quellen stehen, wandert eine Idee nach `themen.json`.

## Macharten: warum fünf Videos fünf verschiedene sind

Die fünf Videos einer Woche dürfen nicht fünfmal dasselbe tun. Ohne Benennung
passiert das trotzdem: Im Dock-Thema waren zwei Videos faktisch identisch
(„prüf nach, ob dein Gerät das kann"), nur verschieden betitelt. Die Vielfalt
entstand aus gemischten Szenenbausteinen, nicht aus verschiedenen Zugriffen.

Die Regel bleibt neben den Rubriken sinnvoll: Sie verhindert fünf Diagnosen auf
fünf verschiedenen Sendeplätzen.

Jeder Short trägt deshalb eine **Machart** (`winkelart`), und je Lauf müssen
alle fünf verschieden sein. Vierzehn stehen zur Wahl:

```
Warum es klemmt        Diagnose · Verwechslung · Übersehener Punkt · Der Haken
Was die Angabe bedeutet Entlarvung · Mythos · Grenzwert · Umrechnung
Was gilt               Vorschrift · Reihenfolge
Was du tust            Selbsttest · Kaufberatung · Kompromiss · Notlösung
```

Jede Machart hat eine **Signaturszene**, die sie tragen muss – eine Diagnose
ohne unterbrochene Signalkette ist keine Diagnose, sondern eine Behauptung.
Das Schema weist einen Short zurück, dem sie fehlt.

## Werbung: nur die Rubrik „Kaufen", sonst gar keins

**Stand 12.08.2026 gibt es gar keine Werbung und keine Links, in keiner
Beschreibung.** Affiliate setzt ein Kleingewerbe voraus – Reihenfolge: Gewerbe →
Steuernummer → Amazon PartnerNet. Das Folgende beschreibt das Modell ab
Partnerkonto; die Prüfungen dafür stehen bereits.

**Vier von fünf Shorts haben überhaupt keine Partnerlinks** – auch nicht in
der Beschreibung. Nur der Short der Rubrik **Kaufen** wirbt, und er trägt dafür
das Label im Bild. Seit die Rubriken fest sind, ist das ein Sendeplatz und
keine Machart, die zufällig in einer Woche vorkommt: Der Zuschauer lernt,
welches der fünf Videos werblich ist.

Der Grund ist nicht Zurückhaltung, sondern eine ungeklärte Rechtsfrage: Ob die
Kennzeichnung allein in der Beschreibung für ein Video genügt, sagt weder der
Leitfaden der Medienanstalten noch eine eindeutige Rechtsprechung. Für YouTube
wird die Einblendung empfohlen. Statt diese Frage auf fünf Videos zu verteilen,
trägt sie eines allein – die anderen vier sind unstrittig werbefrei.

**Kein Video verweist nach draußen**, auch das werbende nicht. Das Label ist
Vorsicht, keine Einladung, die Beschreibung zu öffnen.

| `kennzeichnung.werbung` | Bedeutung |
|---|---|
| `keine` | kein kommerzieller Inhalt – der Normalfall, 4 von 5 |
| `beschreibung` | Links nur unten, kein Label im Bild – derzeit ungenutzt |
| `video` | Label wird eingebrannt – der Kaufberatungs-Short |

Wo geworben wird, steht die Kennzeichnung **zeilengenau am Link**: Ein
„Werbung" am Anfang deckt keinen Link zwanzig Zeilen weiter unten. Zulässig
sind nur „Werbung", „Anzeige" und „Werbepartner" – „Affiliate-Link" und
„gesponsert" hat der BGH als unscharf verworfen (06.02.2014, I ZR 2/11).

Unabhängig davon gilt in **jedem** Video: **Es fällt nie ein Produktname, nur
Merkmale.** Als harte Prüfung gebaut (`ZUBEHOERMARKEN` in `src/pruefung.ts`).
Gerätehersteller stehen bewusst nicht auf der Liste – „bei einem MacBook mit
M1" ist der Kontext des Zuschauers, keine Empfehlung.

Die Szenenart `kaufkriterien` nennt deshalb **kein Modell**, sondern das
Merkmal – das bleibt richtig, wenn das Gerät längst abgelöst ist. Trägt sie
einen `verweis`, wird das Video kommerzielle Kommunikation (§ 5a Abs. 4 UWG,
§ 6 DDG) und das Schema verlangt `werbung: 'video'`. Umgekehrt ist ein Label
ohne Verweis kein Fehler, sondern die vorsichtige Wahl.

## Ablauf

```
Prompt "Wir entwerfen neue Shortvideos"
  │
  1  Themenwahl        aus daten/themen.json, nach Nutzen und Belegbarkeit
  2  Skript            Hook → Beweis → Konsequenz → CTA, jede Aussage belegt
  3  Vertonung         ElevenLabs, deutsche Männerstimme, locker
  4  Untertitel        wortgenau aus den Zeitstempeln der Sprachsynthese
  5  Render            Remotion → 1080×1920, reine Motion Graphics
  6  Qualitätsprüfung  Länge, Lautheit, sichere Zonen, Kennzeichnung
  │
  7  FREIGABE          du siehst alle 5 Videos und gibst frei
  │
  8  Veröffentlichung  Cloudflare R2 → Buffer → TikTok, Reels, Shorts
```

Schritte 1–6 laufen ohne Zutun. Schritt 7 ist bewusst manuell: Werbe- und
KI-Kennzeichnung sowie die Belegpflicht sind persönliche Haftung.

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm run zugaenge` | Alle vier Dienste prüfen und sagen, was fehlt |
| `npm run lauf` | Wochenlauf als **Trockenlauf** – kostet nichts |
| `npm run lauf -- --mit-ton` | Wochenlauf mit echter Vertonung |
| `npm run veroeffentlichen -- <lauf-id>` | Probelauf der Veröffentlichung |
| `npm run veroeffentlichen -- <lauf-id> --wirklich` | Beiträge wirklich einplanen |
| `npm run vorschau` | Remotion-Studio, Szenen live bearbeiten |
| `npm run stimmproben` | Hörproben mehrerer Stimmen erzeugen |
| `npm run buffer-probe` | Rauchtest der Kette Ablage → Buffer, räumt selbst auf |
| `npm run pruefen` | Typprüfung und Schemaprüfung der Daten |

Trockenlauf und Probelauf sind jeweils der Standard. Geld und geplante
Beiträge entstehen nur mit ausdrücklichem Schalter.

## Aufbau

```
src/marke.ts        Design-Tokens: Farbe, Schrift, Raster, sichere Zonen
src/typen.ts        Datenverträge – was nicht validiert, wird nicht gerendert
src/zeit.ts         Szenenlängen aus echten Sprech-Zeitstempeln
src/ablage.ts       Cloudflare R2: Upload und öffentliche URL
src/buffer.ts       Einplanung über die Buffer-GraphQL-Schnittstelle
video/              Remotion: Szenenvokabular und Komposition
daten/              Themenpool, Ideenspeicher, Quellen, Referenz-Short
laeufe/             Produktionsergebnisse (nicht in Git)
SetupKlar/Branding/ Logo, Kanalbanner, Profilbild
```

## Gestaltungsregeln

Alles Sichtbare ist **selbst erzeugte Vektorgrafik**. Keine Herstellerbilder,
keine Produktfotos, keine fremden Videoclips – damit entsteht kein Lizenz-
oder Markenrechtsproblem. Stock-Material von Pexels ist als Akzent möglich,
nicht als Fundament.

Farben, Schriftgrößen und Abstände stehen ausschließlich in `src/marke.ts`.
Kein Hexwert gehört in eine Szene.

## Produktionsregeln

Diese Regeln stammen aus der Markenstrategie und sind teilweise technisch
erzwungen (`src/pruefung.ts`):

- Ein Inhalt heißt nur **„Test"**, wenn das Produkt selbst benutzt wurde.
  Sonst: „Vergleich", „Kompatibilitätscheck", „Kaufhilfe".
- Jede technische Kernaussage braucht eine **Hersteller- oder Standardquelle**.
  Das Schema erzwingt mindestens eine Quelle je Short.
- Preise werden **datiert** und als veränderlich gekennzeichnet.
- Die synthetische Stimme trägt **„KI-Stimme"**, eingebrannt und nicht
  abschaltbar. Das Werbe-Label erscheint nur bei `werbung: 'video'` – stehen
  die Links nur in der Beschreibung, ist dort auch der Ort der Kennzeichnung.

## Zugänge

Alle Schlüssel stehen in `.env` (nicht in Git, Vorlage in `.env.example`).

| Zweck | Dienst | Status |
|---|---|---|
| Stimme | ElevenLabs | läuft, aber Free-Tarif: nur englische Standardstimmen, 10.000 Zeichen/Monat |
| B-Roll | Pexels | läuft |
| Verteilung | Buffer | läuft, alle drei Kanäle verbunden |
| Dateiablage | Cloudflare R2 | läuft, mit einem echten Video durchgetestet |

`npm run zugaenge` prüft alle vier auf einmal und sagt, was fehlt. Bei der
Ablage werden Schreibrecht und öffentlicher Zugriff getrennt geprüft – ein
Bucket kann beschreibbar sein und trotzdem keine öffentliche URL liefern, und
genau die braucht Buffer.

**Buffer:** Die alte REST-Schnittstelle nimmt keine öffentlichen Tokens mehr an
und wird am 1. Februar 2027 abgeschaltet. Genutzt wird `api.buffer.com/graphql`.
Kanäle liegen **nicht** unter `account`, sondern in einer eigenen Abfrage:
`channels(input: { organizationId: "…" })`.
