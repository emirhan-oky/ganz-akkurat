# SetupKlar

Automatisierte Shortvideo-Produktion für die deutschsprachige Medienmarke
**SetupKlar** – Technik-Setups für Schreibtisch, unterwegs, Reise und Laden.

Ein Lauf erzeugt **2 Themen mit je 5 Shorts**. Veröffentlicht wird an
5 Tagen je 2 Videos.

## Themenaufbau

Das Oberthema der Marke ist immer **Setup**. Darunter:

```
Setup-Kontext   "Schreibtisch", "Unterwegs", "B-Ware & Nachhaltig" …
  └── Thema     eine Alltagsfrage + die Quellen, die sie belegen
        └── Winkel   fünf Blickwinkel auf dieselbe Frage = fünf Shorts
```

Der Kontext sagt nur, um welche **Art** Setup es geht – er ist freier Text,
keine feste Liste. Neue Kontexte entstehen ohne Codeänderung, damit aus der
Angabe keine Rubrik wird, in die jedes Thema hineinpassen muss.

Die Quellen hängen am **Thema**, nicht am einzelnen Short: einmal
recherchieren, fünfmal veröffentlichen.

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
  7  FREIGABE          du siehst alle 10 Videos und gibst frei
  │
  8  Veröffentlichung  Make.com → Buffer → TikTok, Reels, Shorts
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
| `npm run pruefen` | Typprüfung |

Trockenlauf und Probelauf sind jeweils der Standard. Geld und geplante
Beiträge entstehen nur mit ausdrücklichem Schalter.

## Aufbau

```
src/marke.ts        Design-Tokens: Farbe, Schrift, Raster, sichere Zonen
src/typen.ts        Datenverträge – was nicht validiert, wird nicht gerendert
src/zeit.ts         Szenenlängen aus echten Sprech-Zeitstempeln
video/              Remotion: Szenenvokabular und Komposition
daten/              Themenpool, Quellen, Referenz-Short
laeufe/             Produktionsergebnisse (nicht in Git)
archiv/             Strategie- und Entscheidungsdokumente
SetupKlar/Branding/ Logo, Banner, Profilbild
```

## Gestaltungsregeln

Alles Sichtbare ist **selbst erzeugte Vektorgrafik**. Keine Herstellerbilder,
keine Produktfotos, keine fremden Videoclips – damit entsteht kein Lizenz-
oder Markenrechtsproblem. Stock-Material von Pexels ist als Akzent möglich,
nicht als Fundament.

Farben, Schriftgrößen und Abstände stehen ausschließlich in `src/marke.ts`.
Kein Hexwert gehört in eine Szene.

## Produktionsregeln

Diese Regeln stammen aus der Markenstrategie in `archiv/` und sind teilweise
technisch erzwungen:

- Ein Inhalt heißt nur **„Test"**, wenn das Produkt selbst benutzt wurde.
  Sonst: „Vergleich", „Kompatibilitätscheck", „Kaufhilfe".
- Jede technische Kernaussage braucht eine **Hersteller- oder Standardquelle**.
  Das Schema erzwingt mindestens eine Quelle je Short.
- Preise werden **datiert** und als veränderlich gekennzeichnet.
- Affiliate-Inhalte tragen **„Werbung"**, synthetische Stimme trägt
  **„KI-Stimme"**. Beides ist im Video eingebrannt, nicht abschaltbar.

## Zugänge

Alle Schlüssel stehen in `.env` (nicht in Git, Vorlage in `.env.example`).

| Zweck | Dienst | Status |
|---|---|---|
| Stimme | ElevenLabs | läuft, aber Free-Tarif: nur englische Standardstimmen, 10.000 Zeichen/Monat |
| B-Roll | Pexels | läuft |
| Verteilung | Buffer | läuft, alle drei Kanäle verbunden |
| Dateiablage | offen | Buffer braucht öffentlich erreichbare Video-URLs |

**Buffer:** Die alte REST-Schnittstelle nimmt keine öffentlichen Tokens mehr an
und wird am 1. Februar 2027 abgeschaltet. Genutzt wird `api.buffer.com/graphql`.
Kanäle liegen **nicht** unter `account`, sondern in einer eigenen Abfrage:
`channels(input: { organizationId: "…" })`.
