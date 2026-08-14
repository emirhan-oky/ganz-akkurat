# SetupKlar

Automatisierte Shortvideo-Produktion für die deutschsprachige Medienmarke
**SetupKlar** – Technik-Setups für Schreibtisch, unterwegs, Reise, zuhause und
Kaufen. Ein Lauf erzeugt **fünf Shorts, einen je Rubrik** – ein Video pro
Werktag.

Deutschsprachig auch im Code: Bezeichner, Kommentare und Ausgaben sind deutsch.

## Wo was steht

Diese Datei ist der Einstieg und sonst nichts. Die Regeln stehen woanders, und
zwar jede an genau einer Stelle:

| Datei | Inhalt |
|---|---|
| `CLAUDE.md` | Der Arbeitsvertrag: Datenvertrag, harte Regeln, Quellenpolitik, warum jede Regel existiert |
| `produktionsmatrix.md` | Rubriken, Titelmuster, Humor, Vertiefungen, Zeichenkategorien – die inhaltliche Matrix |
| `offene-punkte.md` | Das Entscheidungsprotokoll: was besprochen, was beschlossen, was noch offen ist |
| `src/typen.ts` | Der einzige Datenvertrag. Alles andere richtet sich danach |
| `src/pruefung.ts` | Alle Regeln als Code. Fehler halten zurück, Hinweise erscheinen nur in der Freigabe |

Steht etwas hier und dort verschieden, gilt die speziellere Datei. Doppelte
Listen sind in diesem Projekt schon zweimal auseinandergelaufen, ohne dass es
auffiel – jede sah für sich stimmig aus.

## Ablauf

```
Prompt "Wir entwerfen neue Shortvideos"
  │
  1  Themenwahl        nach Nutzen und Belegbarkeit
  2  Quellenarbeit     URL abrufen, lesen, wörtliches Zitat eintragen
  3  Skript            Hook → Beweis → Konsequenz → CTA, jede Aussage belegt
  4  BELEGANSICHT      npm run belege – trägt das Zitat den Satz wirklich?
  5  Sprechprobe       Länge messen, ohne Kontingent zu verbrauchen
  6  Vertonung         ElevenLabs, deutsche Männerstimme
  7  Untertitel        wortgenau aus den Zeitstempeln der Sprachsynthese
  8  Render            Remotion → 1080×1920, reine Motion Graphics
  9  Qualitätsprüfung  Länge, Lautheit, sichere Zonen, Kennzeichnung
  │
 10  FREIGABE          du siehst alle 5 Videos und gibst frei
  │
 11  Veröffentlichung  Cloudflare R2 → Buffer → TikTok, Reels, Shorts
```

Schritt 4 ist die einzige Prüfung, die kein Skript übernehmen kann:
`quellen-pruefen` beantwortet, ob das Zitat auf der Seite steht –
**nicht**, ob es die Folgerung trägt. Schritt 10 ist bewusst manuell: Werbe-
und KI-Kennzeichnung sowie die Belegpflicht sind persönliche Haftung.

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm run pruefen` | Typprüfung und Schemaprüfung der Daten – **vor jedem Lauf** |
| `npm run quellen-pruefen` | Ruft jede Quellen-URL ab und sucht das Zitat |
| `npm run belege` | Stellt Sprechtext und Zitat nebeneinander (`belege.html`) |
| `npm run sprechprobe` | Misst die Sprechdauer mit der macOS-Systemstimme, kostet nichts |
| `npm run lauf` | Wochenlauf als **Trockenlauf** – kostet nichts |
| `npm run lauf -- --mit-ton` | Wochenlauf mit echter Vertonung, rund 6.300 Zeichen |
| `npm run vorschau` | Remotion-Studio, Szenen live bearbeiten |
| `npm run zugaenge` | Alle Dienste prüfen und sagen, was fehlt |
| `npm run stimmproben` | Hörproben mehrerer Stimmen erzeugen |
| `npm run buffer-probe` | Rauchtest der Kette Ablage → Buffer, räumt selbst auf |
| `npm run veroeffentlichen -- <lauf-id>` | Probelauf der Veröffentlichung |
| `npm run veroeffentlichen -- <lauf-id> --wirklich` | Beiträge wirklich einplanen |

Trockenlauf und Probelauf sind jeweils der Standard. Geld und geplante
Beiträge entstehen nur mit ausdrücklichem Schalter.

## Aufbau

```
src/typen.ts        Datenvertrag – was nicht validiert, wird nicht gerendert
src/pruefung.ts     Alle Regeln: Fehler halten zurück, Hinweise nicht
src/marke.ts        Design-Tokens: Farbe, Schrift, Raster, sichere Zonen
src/zeit.ts         Szenenlängen aus echten Sprech-Zeitstempeln
src/illustration.ts Schlägt Kontextsymbole aus dem Szenentext vor
src/belegansicht.ts Erzeugt belege.html
src/ablage.ts       Cloudflare R2: Upload und öffentliche URL
src/buffer.ts       Einplanung über die Buffer-GraphQL-Schnittstelle
src/verlauf.ts      Gedächtnis über die Woche hinaus (daten/verlauf.json)
video/              Remotion: Szenenvokabular und Komposition
daten/entwuerfe/    Die Shorts. index.ts sagt, was läuft – und nur dort
daten/quellen.json  Quellen mit wörtlichen Zitaten und Abrufdatum
daten/themen.json   Vorrat und Notizbuch, von keinem Skript gelesen
laeufe/             Produktionsergebnisse (nicht in Git)
public/ton/         Vertonungen je Lauf (nicht in Git)
SetupKlar/Branding/ Logo und Profilbild
```

## Zugänge

Alle Schlüssel stehen in `.env` (nicht in Git, Vorlage in `.env.example`).
`npm run zugaenge` prüft alle auf einmal und sagt, was fehlt.

| Zweck | Dienst | Stand |
|---|---|---|
| Stimme | ElevenLabs | Tarif Creator, 121.000 Zeichen im Monat, kommerzielle Lizenz |
| Dateiablage | Cloudflare R2 | läuft, mit einem echten Video durchgetestet |
| Verteilung | Buffer | läuft, alle drei Kanäle verbunden |
| Akzentmaterial | Pexels | Zugang steht, wird von der Pipeline nicht abgerufen |

Bei der Ablage werden **Schreibrecht und öffentlicher Zugriff getrennt**
geprüft – ein Bucket kann beschreibbar sein und trotzdem keine öffentliche URL
liefern, und genau die braucht Buffer.

**Buffer:** Die alte REST-Schnittstelle nimmt keine öffentlichen Tokens mehr an
und wird am 1. Februar 2027 abgeschaltet. Genutzt wird `api.buffer.com/graphql`.
Kanäle liegen **nicht** unter `account`, sondern in einer eigenen Abfrage:
`channels(input: { organizationId: "…" })`. Jeder Dienst verlangt zusätzlich
eigene `metadata` – YouTube `title` und `categoryId`, Instagram `type: 'reel'`,
sonst lehnt Buffer den Beitrag ab.
