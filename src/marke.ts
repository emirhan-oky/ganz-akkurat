/**
 * Design-Tokens von Ganz akkurat.
 *
 * Einzige Quelle fuer Farbe, Schrift, Rhythmus und Geometrie. Jede Szene liest
 * hier — nirgends sonst stehen Hexwerte oder Pixelgroessen fest verdrahtet.
 *
 * Heller Grund, isometrisches Gitter, Outline-Illustrationen in Grau,
 * Signalblau als einziger echter Akzent — und die Wortmarke lebt vom Kontrast
 * „Ganz" duenn / „akkurat" fett.
 */

/** Hochformat fuer TikTok, Reels und Shorts. */
export const FORMAT = {
  breite: 1080,
  hoehe: 1920,
  bilderProSekunde: 30,
} as const;

/**
 * Bereiche, die die Plattformen mit eigener Oberflaeche ueberdecken.
 * Nichts Sinntragendes darf hier liegen — weder Text noch Kernillustration.
 * Die Werte richten sich nach der **schlimmsten** Plattform je Seite, nicht
 * nach dem Mittel: TikTok deckt rechts und oben am meisten ab, Reels unten.
 *
 * ## Nachgemessen am 15.08.2026
 *
 * Anlass war eine Beobachtung an den fertigen Videos: Die Endkarte musste
 * verkleinert werden, obwohl im Bild sichtbar Platz frei war. Der Platz war
 * da — er war nur reserviert, und zwar grosszuegiger als noetig. `oben` stand
 * auf 240 und `unten` auf 580; beide Zahlen stammten aus der Anfangszeit und
 * waren nie an veroeffentlichten Angaben geprueft.
 *
 * Verbreitete Angaben fuer 1080×1920 (Stand 2026):
 *
 * | | oben | unten | links | rechts |
 * |---|---|---|---|---|
 * | Instagram Reels | 108 | 400–500 | 60 | 120 |
 * | TikTok | 140 | 400 | 60 | 180 |
 * | YouTube Shorts | — | ~320 | — | — |
 *
 * Uebernommen ist jeweils der schlechteste Wert plus Reserve. Unten steht
 * bewusst die pessimistischere der beiden Reels-Angaben (500), weil dort der
 * Untertitel sitzt und ein verdeckter Untertitel den Short fuer alle
 * wertlos macht, die ohne Ton schauen.
 *
 * **Das bleibt eine Schaetzung.** Die Oberflaechen aendern sich mit den
 * App-Versionen, und keine der drei Plattformen veroeffentlicht die Masse
 * verbindlich. Wer hier weiter geht, prueft es an einem echten Beitrag —
 * nicht an einer Tabelle.
 */
export const SICHERE_ZONE = {
  /**
   * Muss unter `KOPFZEILE_OBEN` plus deren Hoehe liegen — die Kopfzeile sitzt
   * ausserhalb der Buehne und darf nicht in sie hineinragen.
   *
   * 420 statt 360 seit dem 15.08.2026: Bei 360 blieben zwischen Kopfzeile und
   * dem ersten Szenenelement nur 80 Pixel, und im fertigen Beitrag klebte die
   * Hook-Pille direkt unter der Rubrik-Pille — zwei aehnlich aussehende
   * Pillen ohne Luft dazwischen. Jetzt sind es 140.
   */
  oben: 420,
  /**
   * Reels blendet unten Beschreibung und Tonzeile ein und verdeckt damit
   * deutlich mehr als TikTok. Der Wert richtet sich nach der schlimmsten
   * Plattform, nicht nach dem Mittel.
   *
   * **Auch der Untertitel liegt darueber**, seit dem 13.08.2026. Vorher stand
   * hier, er duerfe „als Letztes verdeckt werden" — was ihn 380 Pixel tief in
   * die verdeckte Zone setzte. Das war falsch herum: Wer ohne Ton schaut,
   * liest den Untertitel statt zuzuhoeren; er ist damit nicht das
   * verzichtbarste Element, sondern eines der wichtigsten.
   */
  unten: 500,
  /**
   * ## Warum links so viel mehr als die 60 von frueher (15.08.2026)
   *
   * Am Handy nachgemessen, am ersten wirklich veroeffentlichten Beitrag:
   * Instagram, TikTok und YouTube zeigen ein 9:16-Video auf den heute
   * ueblichen langen Displays (rund 19,5:9) **formatfuellend** — sie
   * skalieren auf die Hoehe und schneiden seitlich ab. Sichtbar bleiben rund
   * **90 % der Breite**, je gut 5 % fallen links und rechts weg.
   *
   * Gemessen an einem bekannten Element: Der blaue Balken unter der Hook
   * beginnt im Render bei x=60 und endet bei x=400. Im Handybild lag er bei
   * 0,9 % bis 36 % der Breite — daraus folgen 52 Pixel Beschnitt links und
   * 56 rechts.
   *
   * Von den alten 60 Pixeln Rand blieben damit **8 uebrig**. Genau so sah es
   * auch aus: Die Ueberschrift klebte am Displayrand, und am Desktop, wo
   * nichts beschnitten wird, war davon nichts zu sehen.
   *
   * 170 = 52 Beschnitt + rund 120 echter Rand. Der Rand ist bewusst groesser
   * als noetig: Mit `rechts: 200` liegt die Mitte des nutzbaren Bereichs bei
   * 535 statt bei 540 — der Inhalt steht also praktisch zentriert. Vorher
   * (115/240) lag sie bei 477 und alles wirkte sichtbar nach links geschoben.
   */
  links: 170,
  /**
   * 200 = 56 Beschnitt + rund 145 fuer die Aktionsleiste rechts. Am
   * YouTube-Screenshot nachgemessen: Die Leiste beginnt bei 87 % der Breite
   * und braucht damit rund 128 sichtbare Pixel, nicht die zuvor
   * angenommenen 180.
   */
  rechts: 200,
} as const;

/**
 * Hoehe, auf der die Kopfzeile sitzt — Wortmarke, Formatpille,
 * KI-Kennzeichnung.
 *
 * **Eine eigene Konstante, und das ist der Punkt.** Vorher stand im Renderer
 * `top: SICHERE_ZONE.oben - 130`. Die Kopfzeile hing damit an einem Wert, mit
 * dem sie nichts zu tun hat: Als `oben` am 15.08.2026 von 240 auf 180 sank,
 * um der Buehne Platz zu geben, rutschte die Kopfzeile von 110 auf 50 mit —
 * und damit unter die Statusleiste des Telefons. Im veroeffentlichten Beitrag
 * lag die Uhrzeit ueber der Wortmarke.
 *
 * Am Schreibtisch war das unsichtbar, weil ein Browserfenster keine
 * Statusleiste ueber das Video legt. Aufgefallen ist es erst am Telefon.
 *
 * ## Nachgemessen am 15.08.2026, zweiter Anlauf
 *
 * 150 war immer noch zu hoch. Die Statusleiste war nicht das einzige, was
 * dort liegt — jede der drei Apps blendet oben eigene Bedienelemente ein,
 * und die reichen deutlich tiefer:
 *
 * | | reicht bis |
 * |---|---|
 * | YouTube — Suche, drei Punkte | y ≈ 213 |
 * | Instagram Vollbild — Zurück, „Beiträge", Folgen | y ≈ 248 |
 * | Instagram Profilansicht — Profilkopf mit Namenszeile | y ≈ 352 |
 *
 * Gemessen an den Screenshots des ersten veroeffentlichten Beitrags, auf
 * 1080x1920 hochgerechnet. Der schlechteste Fall ist die Profilansicht mit
 * 352 — dort lag unsere Kopfzeile komplett unter dem Profilkopf.
 *
 * 280 liegt unter den beiden Faellen, die zaehlen: YouTube und Instagram im
 * Vollbild. Die **Profilansicht** mit ihren 352 ist bewusst ausgenommen —
 * dort ueberlappt der Profilkopf die Kopfzeile weiterhin leicht.
 *
 * Das ist eine Abwaegung, keine Nachlaessigkeit: 370 haetten die Buehne auf
 * 770 Pixel gedrueckt, und die Endkarte braucht 1132. Sie waere unter die
 * Untergrenze von 0,7 gefallen und damit unlesbar klein geworden. Die
 * Profilansicht ist ausserdem die seltenere: Gesehen wird ein Short im Feed,
 * das Profil oeffnet, wer schon ueberzeugt ist.
 */
export const KOPFZEILE_OBEN = 280;

/**
 * Der Theatervorhang: wo er oben ansetzt, und wie breit er im Ruhezustand
 * links und rechts stehen bleibt.
 *
 * ## `oben` — er reicht bis an den oberen Bildrand
 *
 * Hier stand einmal `KOPFZEILE_OBEN + 96`, und der Satz dazu hiess **„Der
 * Kanal oben, die Show darunter."** Er galt einem Vorhang, den man nur im
 * Vorspann sah: Dort deckt er die Buehne und laesst die Kennzeichnung frei.
 *
 * Seit die Streifen **dauerhaft** stehen, ist dieselbe Kante keine Trennung
 * mehr, sondern ein Schnitt mitten durchs Bild — der Vorhang begann
 * unvermittelt unter einer Zeile. **Ein Vorhang haengt von der Decke; faengt
 * er auf halber Hoehe an, haengt er an nichts.**
 *
 * Die Kopfzeile bleibt trotzdem sichtbar: Sie liegt in `Short.tsx` im
 * abschliessenden Block der dauerhaften Elemente und damit **ueber** dem
 * Stoff. Solange der Vorhang zu ist, wechselt sie auf helle Farben — dieselbe
 * Bauart wie beim Saum der Figuren: **Ein Wert, der einen Hintergrund meint,
 * wechselt mit ihm.** Die KI-Kennzeichnung reisst damit nie ab, und genau
 * dafuer stand die alte Kante.
 *
 * ## `rand` — warum 130 und nicht 50
 *
 * Der Vorhang faehrt nicht ganz auf. Links und rechts bleibt ein geraffter
 * Streifen stehen, damit der Zuschauer **ab Sekunde null eine Buehne sieht**
 * und der Vorspannvorhang aus etwas herauswaechst, das schon da war.
 *
 * Der erste Wert dafuer waren 50 Pixel, und die waeren **unsichtbar**
 * gewesen. `video/Anordnungsprobe.tsx` haelt den am 15.08.2026 an einem
 * veroeffentlichten Beitrag gemessenen Beschnitt fest: 52 Pixel links, 56
 * rechts. Alle drei Apps zeigen 9:16 auf langen Displays formatfuellend und
 * schneiden seitlich ab. Ein 50-Pixel-Streifen laege vollstaendig in dem, was
 * am Handy gar nicht erst ankommt — am Schreibtisch sichtbar, im Feed nie.
 * Genau der Fehler, den der Kommentar dort benennt: „Was dort steht, ist nicht
 * verdeckt, es ist nicht da."
 *
 * Das setzt die **Untergrenze**, nicht den Wert. Drei Breiten wurden am
 * 31.08.2026 als vollstaendige Standbilder nebeneinandergestellt — 100, 130,
 * 160 —, und **die Wahl fiel am Bild auf 100.** Die Herleitung haette 130
 * ergeben (`SICHERE_ZONE.links` minus 40 Reserve); gerechnet war das die
 * groesstmoegliche Breite, nicht die richtige. Eine Kulisse soll den Blick
 * rahmen und nicht die Buehne verengen.
 *
 * Sichtbar bleiben damit 100 − 52 = **48 Pixel links** und 100 − 56 = **44
 * rechts**, je rund 4,5 % der 972, die tatsaechlich ankommen. Das ist knapp
 * ueber dem Beschnitt, und knapp ist hier Absicht: Der Streifen soll am Rand
 * stehen, nicht ins Bild ragen.
 *
 * **Was diese Zahl nicht entscheidet:** wie sie auf anderen Geraeten
 * ankommt. Die 52/56 sind eine Messung an *einem* Beitrag, kein Gesetz — auf
 * einem Display mit mehr Beschnitt bleibt weniger als die Haelfte davon uebrig.
 *
 * Wer sie erhoeht, sieht als Erstes den Schluss-Zeiger `tiktok` klemmen: Er
 * reicht bis 908 Pixel und rueckt um genau diese Breite ein.
 * `skripte/schemapruefung.ts` bewacht den Abstand zur sicheren Zone.
 */
/**
 * Zwei Hex-Farben mischen, `t` von 0 (nur `a`) bis 1 (nur `b`).
 *
 * Steht hier und nicht im Renderer, weil zwei Bauteile sie brauchen: Der
 * Vorhang leitet daraus seine drei Stofftoene ab, und die Kopfzeile blendet
 * damit zwischen ihrer dunklen und ihrer hellen Fassung, waehrend er faehrt.
 * **Eine Doppelung ohne Wache ist der eigentliche Fehler**, und bei einer
 * Rechenfunktion ist die Wache schlicht: Es gibt sie nur einmal.
 */
export const mische = (a: string, b: string, t: number): string => {
  const zerlege = (h: string) => [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16));
  const [x, y] = [zerlege(a), zerlege(b)];
  return (
    '#' +
    x.map((v, i) => Math.round(v * (1 - t) + y[i]! * t).toString(16).padStart(2, '0')).join('')
  );
};

export const VORHANG = {
  oben: 0,
  /**
   * Wo die **Titelkarte** des Vorspanns ansetzt — unter der Kopfzeile samt
   * Belegzeile.
   *
   * Das ist der Wert, auf dem `oben` einmal stand, und hier ist er weiterhin
   * richtig: Der **Stoff** soll bis an den Bildrand, die **Karte** nicht. Ohne
   * die Trennung stand „Facts" im ersten Standbild quer durch die Wortmarke —
   * der Titelblock zentriert sich in seiner Flaeche, und die war ploetzlich
   * 376 Pixel groesser.
   *
   * **Zwei Dinge, die dieselbe Farbe teilen, teilen nicht ihre Masze.**
   */
  karte: KOPFZEILE_OBEN + 96,
  rand: 100,
  /**
   * Wie lange die Vorhangfahrt dauert, in Bildern.
   *
   * **Stand bis zum 31.08.2026 in `video/bausteine/Vorhang.tsx`** und war dort
   * richtig aufgehoben, solange nur der Renderer sie brauchte. Seit
   * `vorspannSek` die Vorspannlaenge aus den gemessenen Tondauern zusammensetzt,
   * braucht sie die Fahrt mit — und zwei Zahlen fuer dieselbe Bewegung waeren
   * die Doppelung, an der in dieser Nacht schon `gesamtdauerBilder` und
   * `VORSPANN_SEK` gescheitert sind.
   *
   * Die Fahrt liegt **innerhalb** des Vorspanns: `ablauf` rechnet sie von
   * hinten, damit der Vorhang mit dem Vorspann fertig wird.
   */
  fahrtBilder: 12,
} as const;

/**
 * Was vom Bild uebrig bleibt, wenn der Vorhang steht.
 *
 * **Die Zahl, die am 31.08.2026 gefehlt hat.** Seit der Vorhang dauerhaft
 * links und rechts stehenbleibt, ist nicht mehr das Format die Grenze, sondern
 * sein Innenrand — und diese Grenze stand nirgends. Die Folge war ein Fehler,
 * der drei Erklaerungen ueberlebt hat: Voltis linke Hand lag im fertigen Video
 * bei x = 101, die Vorhangkante bei 100.
 *
 * Zur Einordnung, alles gemessen und nicht gerechnet:
 *
 * | | von | bis | Breite |
 * |---|---|---|---|
 * | Bild | 0 | 1080 | 1080 |
 * | zwischen den Vorhaengen | 100 | 980 | 880 |
 * | **Spielflaeche** (hier) | 120 | 960 | **840** |
 * | Buehne (`BUEHNE`) | 170 | 880 | 710 |
 *
 * **Die Buehne ist also gar nicht zu breit** — sie ist mit 710 Pixeln sogar
 * schmaler als die freie Flaeche. Der Fehler lag nie an dieser Zahl, sondern
 * daran, dass ein Kasten ueber sie hinauswuchs, ohne dass etwas es gemerkt
 * haette. Deshalb ist diese Konstante vor allem eine **Messlatte**: Sie sagt,
 * wogegen `npm run bildrand` prueft.
 *
 * Der Saum von 20 Pixeln ist kein Sicherheitsabstand gegen Rechenfehler,
 * sondern gegen den Eindruck: Eine Figur, die den Stoff beruehrt, sieht aus,
 * als lehnte sie am Vorhang.
 */
export const SPIELFLAECHE = {
  links: VORHANG.rand + 20,
  rechts: FORMAT.breite - VORHANG.rand - 20,
} as const;

/**
 * Hoehe, die der Untertitel unten belegt.
 *
 * Zwei Zeilen à 66 Pixel plus Abstand. Der Wert ist eine Reservierung, kein
 * Rahmen: Der Untertitel wird nicht auf diese Hoehe gesetzt, aber die Buehne
 * rendert nicht hinein. Ohne die Reservierung liegen Szenentext und
 * Untertitel uebereinander, sobald der Untertitel in die sichere Zone
 * gewandert ist.
 *
 * 270 statt 200 seit dem 15.08.2026. Die reine Zwei-Zeilen-Rechnung ging auf,
 * liess aber keinen Zwischenraum: Im fertigen Beitrag stand der Untertitel
 * direkt an der Unterkante der Checkliste und beruehrte in einer anderen
 * Szene das Kontextsymbol. Die zusaetzlichen 70 Pixel sind kein Platz fuer
 * mehr Untertitel, sondern Luft davor.
 */
export const UNTERTITEL_ZONE = 270;

/**
 * Nutzbare Flaeche fuer Szeneninhalt.
 *
 * Kleiner als die sichere Zone, weil der Untertitel unten mitwohnt. Der
 * Zugewinn liegt trotzdem auf der Hand: Vorher endete die Buehne bei 1340,
 * der Untertitel sass bei 1620, und die 280 Pixel dazwischen konnten von
 * keiner Szene bespielt werden — sie waren per Konstruktion leer. Jetzt
 * grenzen beide aneinander.
 */
export const BUEHNE = {
  x: SICHERE_ZONE.links,
  y: SICHERE_ZONE.oben,
  breite: FORMAT.breite - SICHERE_ZONE.links - SICHERE_ZONE.rechts,
  hoehe: FORMAT.hoehe - SICHERE_ZONE.oben - SICHERE_ZONE.unten - UNTERTITEL_ZONE,
  /**
   * Die Hoehe **ohne** reservierte Untertitelzone — seit dem 31.08.2026.
   *
   * Zweistimmige Shorts tragen unten keinen Text mehr (siehe `Short.tsx`), und
   * die 270 Pixel standen im ersten Standbild danach leer im Bild. Genau der
   * Fehler, den der Kommentar an `UNTERTITEL_ZONE` schon einmal beschreibt:
   * „die 280 Pixel dazwischen konnten von keiner Szene bespielt werden — sie
   * waren per Konstruktion leer."
   *
   * **Der Gewinn ist groesser als die Zahl.** Das Buehnen-SVG ist 200 x 150
   * Einheiten und passt sich mit `meet` der kleineren Seite an. Bei 972 Pixeln
   * Breite und der alten Hoehe war die **Hoehe** die Grenze — die Figuren
   * nutzten die Breite nicht aus. Mit den 270 zusaetzlichen Pixeln wandert die
   * Grenze auf die Breite, und die Figuren werden deutlich groesser, ohne dass
   * an ihrer Skalierung etwas geaendert wird.
   */
  hoeheOhneUntertitel:
    FORMAT.hoehe - SICHERE_ZONE.oben - SICHERE_ZONE.unten,
} as const;

/**
 * ## Zwei Umwege an einem Abend
 *
 * Der Grund war lange `#F7F8FA` — praktisch Weiss und ohne eigenen Ton. Auf
 * dem Weg zum jetzigen Blaugrau lagen zwei Versuche, die beide am fertigen
 * Bild gescheitert sind: **Nachtblau** (siehe unten) und ein **warmer
 * Papierton** `#F2EBDE`. Der Papierton hatte das bessere Argument — der Kanal
 * heisst „Wir haben nachgelesen" — und die schlechtere Wirkung: Er las sich
 * nach Buchladen, nicht nach Technik.
 *
 * ## Der Umweg ueber Nachtblau, und warum er scheiterte
 *
 * Am 24.08.2026 lief der Kanal einen Tag lang auf `#061B3D` mit gelbem Akzent.
 * Ausloeser war der zweite Avatar, der ein Gelb tragen sollte — und Gelb auf
 * hellem Grund ist unsichtbar. Der dunkle Grund hat das geloest und zwei neue
 * Probleme geschaffen: Die **Kontextsymbole** verloren ihre Wirkung, und der
 * Avatar musste hell werden, was schlecht aussah.
 *
 * Die Rechnung dahinter, damit sie niemand zweimal anstellen muss (WCAG-
 * Kontrast gegen den jeweiligen Grund):
 *
 * | | heller Grund | dunkler Grund |
 * |---|---|---|
 * | Avatarkoerper `#111820` | 12–17 | **1,0** |
 * | Symbole `#5E6877` | 3,9–5,3 | 2,8–3,0 |
 * | Akzent blau `#2C5EFF` | 3,5–4,8 | 3,1–3,4 |
 * | Kennfarbe rot `#DD3B1D` | 3,1–4,2 | 3,5–3,8 |
 * | Gelb `#F7F36D` | **1,0–1,2** | 13–15 |
 *
 * **Ein dunkler Koerper braucht hellen Grund, und auf hellem Grund faellt Gelb
 * aus.** Deshalb tragen die beiden Avatare Blau und Rot, nicht Blau und Gelb.
 */
export const FARBEN = {
  /**
   * Grund: warmes Weiss.
   *
   * **Gewaehlt an der Farbprobe** (`video/Farbprobe.tsx`), nachdem vier
   * Hintergruende an einem Abend gescheitert waren. Das Muster der
   * Fehlversuche entschied es:
   *
   * | | Helligkeit | Saettigung | Urteil |
   * |---|---|---|---|
   * | `#F7F8FA` Off-White | 97,5 % | 23 %, kuehl | zu steril |
   * | `#E4E9EF` Blaugrau | 91,6 % | 26 %, kuehl | verworfen |
   * | `#F2EBDE` Papier | 91,0 % | 44 %, warm | zu warm |
   * | `#EAF0F2` Cyan | 93,9 % | 21 %, kuehl | dasselbe Feld wie Blaugrau |
   * | **`#F0EFEB`** | **93,1 %** | **14 %, warm** | unbesetzt |
   *
   * Kuehl plus mittelhell war bereits durchgefallen. Dieses Feld — hell wie
   * Off-White, aber ohne dessen Blaustich und mit einem Drittel der
   * Saettigung des Papiertons — war als einziges noch frei.
   *
   * Zwei Sachgruende kamen dazu: Ein kuehler Grund verschluckt das Marineblau
   * des ersten Akkus (Ton in Ton) und laesst nur das Altrosa arbeiten, womit
   * die Rollenteilung optisch unausgewogen wird. Und ein blaustichiger Grund
   * neben gesaettigtem Blau ist genau der Fall, fuer den `--crf=16` im
   * Wochenlauf steht: aehnliche Chroma-Werte, harte Kanten, Farbsaeume.
   */
  grund: '#F0EFEB',
  /** Flaechen auf dem Grund — Symbolfuellungen, Pillen. */
  grundRein: '#FBFAF7',
  /** Isometrisches Hintergrundgitter. */
  gitter: '#E6E4DE',

  /** Text und Illustrationslinien. */
  tinte: '#111820',
  tinteWeich: '#5E6877',
  linie: '#A8A69E',
  linieFein: '#C7C4BB',
  flaeche: '#D8D5CC',

  /**
   * Die Strichfarbe der Symbolzeichnungen.
   *
   * **Eigener Wert, seit die Farbprobe es zeigte:** Die Lupe war auf allen
   * acht Kandidaten blass, unabhaengig vom Grund. Symbole zeichnen mit
   * Staerke 5 auf einer 200er-Flaeche — im Video rund neun Pixel —, und bei
   * so duennen Linien traegt `tinteWeich` mit seinem Kontrast von 4,9 nicht.
   * Dieser Wert kommt auf rund 8,5.
   *
   * Warum nicht einfach `tinteWeich` dunkler: Die Farbe traegt zwei Rollen,
   * die Symbole und den Spruch in der Signatur. Der Spruch **soll**
   * zuruecktreten — er ist der Absender, nicht die Aussage. Zwei Rollen, zwei
   * Werte, wie schon bei `blau` und `anzeigeEins`.
   */
  symbolLinie: '#3D4655',

  /**
   * Der Akzent — und zugleich die Kennfarbe des ersten Avatars.
   *
   * Bis zum 25.08.2026 stand hier das Signalblau `#2C5EFF`. Es steckte in
   * Wortmarke, Formatpille, Untertitelbalken, dem Strich der Signatur und
   * jeder Hervorhebung, und es war laut. Das Marineblau ist dunkler und
   * ruhiger; der Kanal verliert damit seinen grellsten Ton.
   *
   * Der Name bleibt `blau`, weil er die **Rolle** meint und nicht den Ton.
   */
  blau: '#303C6C',
  blauHell: '#DDE2ED',

  /**
   * ## Die Ladeanzeigen der beiden Figuren
   *
   * Beide Akkus sind identisch gebaut — derselbe dunkle Koerper, dieselben
   * Augen. **Allein die Anzeige trennt sie**, und deshalb muss sie auf einen
   * Blick lesbar sein.
   *
   * **Sie ist nicht derselbe Wert wie `blau`, und das ist gemessen.** Das
   * Marineblau des Akzents traegt auf hellem Grund mit 8,9 — auf dem dunklen
   * Koerper aber nur mit **1,7**, und dort verschwand der Balken im ersten
   * Anlauf einfach. `anzeigeEins` ist dieselbe Farbe, aufgehellt bis der
   * Kontrast zum Koerper 3,1 erreicht.
   *
   * Der Akzent bleibt dunkel, weil er auf dem Grund steht, nicht auf der
   * Figur. Zwei Rollen, zwei Werte.
   *
   * **Die Unterscheidung liegt im Farbton, nicht in der Helligkeit.** Blau und
   * Rosa liegen im Farbkreis gegenueber und sind im Vorbeiscrollen sofort zu
   * trennen; zwei Blautoene waeren es nicht — deshalb traegt der `zeiger`
   * nicht das Marineblau aus derselben Vorlage.
   *
   * Beide Werte sind aus einer Vorlage **geschaetzt**, nicht gemessen: Der
   * Screenshot lag in einem temporaeren Ordner, der beim Zugriff schon geleert
   * war. Ein `#DD3B1D` stand hier vorher und war zu grell.
   */
  anzeigeEins: '#4C61B0',
  anzeigeZwei: '#BE8A7A',

  /**
   * Das fehlende Gegenstueck zu `blauHell` — Wattis Altrosa als Flaeche.
   *
   * Fuer Blau gab es seit jeher zwei Werte: einen fuer Schrift und einen fuer
   * die Flaeche darunter. Fuer Altrosa gab es nur den Ton selbst, und
   * deshalb konnte Wattis Farbe nirgends als Hintergrund auftreten. Am
   * 31.08.2026 aufgefallen, als die Formatpille beide Kennfarben tragen
   * sollte.
   */
  anzeigeZweiHell: '#F3E7E2',

  /* ────────────────────── Die Kennfarben als Schrift ───────────────────── */

  /**
   * ## Dieselben zwei Farben, drei Helligkeiten
   *
   * `anzeigeEins` und `anzeigeZwei` sind **Anzeigefarben**: aufgehellt, damit
   * sie auf dem fast schwarzen Figurenkoerper leuchten. Als Schrift auf hellem
   * Grund sind sie dadurch flau — im Wortmarken-Vergleich vom 31.08.2026 war
   * das der Befund, an dem die erste zweifarbige Fassung gescheitert ist.
   *
   * Es gibt deshalb je Figur drei Werte, und die Regel dahinter steht seit dem
   * 24.08.2026 eine Ebene hoeher: **zwei Rollen, zwei Werte.** Hier sind es
   * drei Gruende:
   *
   * | | fuer | Volti | Watti |
   * |---|---|---|---|
   * | Anzeige | dunkler Figurenkoerper | `anzeigeEins` | `anzeigeZwei` |
   * | Schrift | heller Grund | `kennVoltiTief` | `kennWattiTief` |
   * | Schrift | roter Vorhang | `kennVoltiHell` | `kennWattiHell` |
   *
   * **Die dritte Zeile ist gemessen und nicht gewaehlt.** Auf Theaterrot
   * `#7E1F1F` hat `kennVoltiTief` einen Kontrast von **1,06** und
   * `kennWattiTief` von **1,90** — beides unsichtbar. Aufgehellt tragen sie
   * mit 3,23 und 4,36.
   *
   * **Und genau dort steckte ein Messfehler, gefunden am 31.08.2026.** Die
   * 3,23 und 4,36 sind gegen `vorhang` gerechnet — gegen die *Grundfarbe*.
   * Der Stoff ist aber **gefaltet** und hat drei Toene: Gegen den hellsten
   * (24 % Weiss beigemischt) fallen dieselben Werte auf **1,76** und **2,37**
   * und reissen die Schwelle von 3,0.
   *
   * Dieselbe Sorte Fehler wie beim Saum der Figuren: Dort war gegen den
   * Koerper gerechnet statt gegen die Figur, hier gegen die Grundfarbe statt
   * gegen den Stoff. **Ein Kontrast gegen einen Farbverlauf ist der Kontrast
   * gegen seinen unguenstigsten Ton, nicht gegen seinen mittleren.**
   *
   * Die Rolle „Schrift auf rotem Vorhang" traegt deshalb `blauHell` und
   * `anzeigeZweiHell` — die vorhandenen Flaechenfassungen, mit **4,19** und
   * **4,49** gegen den hellsten Faltenton. Keine neuen Werte: dieselben
   * Farbtoene, eine Stufe heller.
   *
   * `kennVoltiHell` und `kennWattiHell` bleiben, wo eine Flaeche dahinter
   * liegt und der Verlauf keine Rolle spielt.
   */
  kennVoltiTief: '#303C6C',
  kennWattiTief: '#896358',
  kennVoltiHell: '#8B92AB',
  kennWattiHell: '#BCA7A0',

  /* ──────────────────────────── Der Vorhang ────────────────────────────── */

  /**
   * ## Theaterrot — die erste Flaechenfarbe der Marke
   *
   * Seit dem 31.08.2026 beginnt jeder Short als Show, und dafuer faehrt nach
   * dem Aufschlag ein Vorhang zu. Ein Marken-Rot gab es bis dahin nicht: Bei
   * Wattis Farbwahl war Rot als „zu grell" verworfen worden — **das galt aber
   * einer Figur, nicht einer Flaeche.** Ein Ton, der auf einem Koerper von
   * 68 Einheiten Breite schreit, traegt ueber eine ganze Buehne ruhig.
   *
   * Gewaehlt an einer Vergleichsseite mit drei Kandidaten, jeder als
   * vollstaendiger Opener. Bordeaux `#6B1D24` war tiefer und Ziegelrot
   * `#A33B2E` heller; Theaterrot liegt dazwischen und ist der klassische
   * Buehnenton.
   *
   * **Weiss traegt darauf mit 9,6.** Die Figuren dagegen nicht: Ihr Koerper
   * hat gegen den dunkelsten Faltenton nur **1,26** — deshalb bekommen sie im
   * Opener einen hellen Umriss, und nur dort.
   */
  vorhang: '#7E1F1F',

  /**
   * Theatergold — die Schrift, die auf dem Vorhang herausstechen soll.
   *
   * **Gelb war einmal verworfen worden, und der Grund gilt hier nicht.** Bei
   * Wattis Farbwahl fiel es mit einer Luminanz von 1,1 durch — *auf hellem
   * Grund*. Auf Theaterrot traegt es mit **5,16**, und es kommt aus dem
   * Gegenstand statt aus dem Farbkreis: Ein Buehnenvorhang hat goldene Borten
   * und Quasten.
   *
   * Dieselbe Unterscheidung wie beim Rot selbst: Ein Urteil ueber eine Farbe
   * gilt immer nur fuer den Grund, auf dem gemessen wurde.
   *
   * **Nur auf dem Vorhang.** Auf dem hellen Grund des Videos hat Gold nichts
   * verloren — dort gilt weiter, woran es gescheitert ist.
   */
  gold: '#E8B23A',

  /** Bedeutungsfarben fuer Kompatibilitaetsaussagen. */
  jaGruen: '#1F9D68',
  jaGruenHell: '#E7F7F0',
  neinRot: '#D94B4B',
  neinRotHell: '#FDEAEA',
  achtungGelb: '#F5B942',
  achtungGelbHell: '#FFF6D9',
} as const;

/**
 * Inter deckt deutsche Umlaute und scharfes S vollstaendig ab und ist als
 * variable Schrift frei nutzbar. Sie traegt alles, was gelesen wird.
 *
 * Der Satz „Der Markenkontrast entsteht ueber die Staerken, nicht ueber zwei
 * verschiedene Schriften" stand hier bis zum 23.08.2026 und gilt nicht mehr.
 * Er war eine Entscheidung gegen Aufwand, nicht fuer eine Wirkung — und nach
 * zwei Wochen ohne Reichweite ist die fehlende Wiedererkennbarkeit das
 * groessere Problem als eine zweite Schriftdatei.
 */
export const SCHRIFT = {
  /**
   * **Playfair Display, kursiv — ueberall.**
   *
   * Bis zum 23.08.2026 trug Inter alles und Playfair nur den Aufschlag. Der
   * Wunsch danach war eindeutig: alles in der Schrift des Aufschlags,
   * einheitlich. Die Serif ist damit nicht mehr die Auszeichnung, sondern die
   * Hausschrift.
   *
   * Der Vorbehalt bleibt im Text stehen, weil er sich am fertigen Video zeigen
   * wird und nicht hier: Untertitel werden **wortweise** gelesen, und eine
   * Serif mit hohem Strichkontrast ist dabei schwerer zu erfassen als eine
   * Grotesk. Wenn es auf dem Handy nicht traegt, ist der Untertitel die
   * Stelle, an der zuerst zurueckgebaut wird — `SCHRIFT.untertitel` steht
   * dafuer weiterhin getrennt.
   *
   * Inter bleibt geladen und traegt die **Wortmarke**. Sie ist ein
   * Logozeichen, keine Schrift im Satz: „Ganz" duenn, „akkurat" fett — dieser
   * Kontrast lebt von den neun Staerken einer variablen Grotesk, die eine
   * Display-Serif nicht hat.
   */
  familie: 'Playfair Display',
  /** Nur noch fuer die Wortmarke. Siehe oben. */
  wortmarke: 'Inter',
  /**
   * Der Schnitt der Hausschrift. Playfair traegt den Kanal kursiv — aufrecht
   * ist sie eine Zeitungsschrift, kursiv eine Haltung.
   */
  neigung: 'italic',
  duenn: 300,
  normal: 400,
  halbfett: 600,
  fett: 800,
  schwarz: 900,

  /**
   * Die zweite Schrift — **nur** fuer Aufschlag und Schlusssatz.
   *
   * Playfair Display in 900 kursiv, gewaehlt am gerenderten Standbild gegen
   * Inter 900, Fraunces 900 kursiv und Instrument Serif kursiv. Drei Gruende,
   * in dieser Reihenfolge:
   *
   * - **Sie spart eine Zeile.** „Handy aus. Sonst stuerzt es ab." braucht in
   *   Inter und Fraunces vier Zeilen, in Playfair drei. Der Platz darunter
   *   gehoert der Buehne, und genau dort ist das Layout am 23.08.2026
   *   gescheitert: Bei drei Textzeilen lag das Etikett im Satz.
   * - **Sie ist schwer genug.** Instrument Serif sieht eleganter aus und wiegt
   *   bei 400 zu wenig. Der Aufschlag ist der Hook im Feed und muss ohne Ton
   *   bestehen.
   * - **Sie passt zur Haltung.** Eine Serif liest sich redaktionell, und der
   *   Kanal behauptet nichts ohne Beleg. Fraunces kippt ins Verspielte.
   *
   * Untertitel, Kopfzeile, Formatpille und Etiketten bleiben Inter. Die
   * Untertitel sind das, was beim Publikum ankam, und sie werden wortweise
   * gelesen — dort schlaegt eine Grotesk jede Serif.
   *
   * Die Schriften der Vorbilder — Macabro Danger, Ketchup Manis, Margin —
   * sind Canva-Schriften und stehen nicht unter den 1.831 Google Fonts, die
   * `@remotion/google-fonts` lokal mitbringt. Sie waeren Fremddateien mit
   * offener Lizenzfrage fuer einen monetarisierten Kanal.
   */
  auszeichnung: 'Playfair Display',

  /**
   * Die Untertitelschrift — Archivo Black.
   *
   * Untertitel sind das, was beim Publikum ankam, und der einzige Teil, der
   * **wortweise** gelesen wird. Sie bekommen deshalb eine eigene Zeile im
   * System statt einer Staerke von Inter.
   *
   * Gewaehlt am gerenderten Vergleich gegen Inter 800, Inter 900 in Versalien
   * und Anton, geprueft am echten Fall: derselbe Satz, dieselbe Groesse,
   * derselbe blaue Balken um dasselbe Wort.
   *
   * - **Versalien** fallen aus. Sie sind lauter und bei wortweisem Wechsel
   *   schlechter zu erfassen — Grossbuchstaben haben keine Oberlaengen, an
   *   denen das Auge ein Wort als Form erkennt.
   * - **Anton** ist die uebliche Shorts-Schrift und passt mehr Text in eine
   *   Zeile. Sie ist dafuer so schmal, dass Umlaute gedraengt stehen, und sie
   *   kollidiert mit der Playfair im Aufschlag: zwei sehr eigene Schriften in
   *   einem Bild.
   * - **Archivo Black** ist deutlich kraeftiger als Inter 800 und bleibt
   *   ruhig genug, um neben einer Serif zu bestehen.
   *
   * Sie hat genau einen Schnitt. `SCHRIFT.fett` und `SCHRIFT.schwarz` gelten
   * fuer sie nicht — das Gewicht ist immer 400.
   */
  untertitel: 'Playfair Display',
} as const;

/**
 * Schriftgroessen. Untergrenze ist bewusst hoch: Shorts werden auf kleinen
 * Displays und oft ohne Ton gesehen, alles unter 34px ist dort unlesbar.
 */
export const GROESSEN = {
  hook: 104,
  ueberschrift: 76,
  aussage: 60,
  fliesstext: 46,
  detail: 38,
  fussnote: 30,
  untertitel: 66,
} as const;

/** Abstaende auf einem 8er-Raster — haelt Szenen ohne Nachdenken ruhig. */
export const ABSTAND = {
  xs: 8,
  s: 16,
  m: 32,
  l: 56,
  xl: 88,
  xxl: 128,
} as const;

export const RADIUS = {
  s: 12,
  m: 24,
  l: 40,
  rund: 999,
} as const;

/**
 * Bewegung. Kurz und straff — bei 25-45s Laufzeit kostet jede lange
 * Animation Erzaehlzeit. Werte in Bildern bei 30 fps.
 */
export const TEMPO = {
  einblendenSchnell: 6,
  einblenden: 10,
  versatzProElement: 3,
  /** Feder fuer Einfluege: knapp, ohne sichtbares Nachschwingen. */
  feder: { damping: 200, stiffness: 120, mass: 0.6 },
} as const;

/**
 * Federn fuer Figurenbewegungen — **die Kandidaten der Probe vom 31.08.2026.**
 *
 * ## Der Befund
 *
 * `TEMPO.feder` traegt jeden Posenwechsel des Kanals, und sie **federt nicht.**
 * Nachgerechnet: Bei `stiffness: 120` und `mass: 0.6` liegt die kritische
 * Daempfung bei 17,0; gesetzt sind 200, also **11,8-fach ueberdaempft**. Ueber
 * 90 Bilder erreicht sie nie mehr als 100,00 % — kein Ueberschwingen, an
 * keiner Stelle. Das ist eine Rampe.
 *
 * In `Kamera.tsx` steht die Begruendung, warum die Kamera **keine** Feder
 * benutzt: „Bei einer Figur ist die Feder richtig — ein Arm, der federt, wirkt
 * lebendig." Die Feder, fuer die dieser Satz geschrieben wurde, hat noch nie
 * gefedert. Der Kommentar beschreibt die Absicht, der Wert tut das Gegenteil —
 * dieselbe Sorte Bauteil wie der Szenentrenner.
 *
 * ## Die Kandidaten, gemessen
 *
 * | | zeta | Ziel bei | Maximum | ruhig ab |
 * |---|---|---|---|---|
 * | `heute` | 11,79 | nie erreicht | 100,0 % | 0,53 s |
 * | `gefasst` | 0,71 | Bild 8 | 104,2 % | 0,50 s |
 * | `cartoon` | 0,47 | Bild 5 | 118,3 % | 0,83 s |
 *
 * **`heute` steht hier als Kandidat und nicht als Erbe.** Ohne sie im
 * Vergleich misst die Probe nur, *welches* Ueberschwingen — nicht *ob*.
 * Dasselbe Prinzip wie die Fassung ohne Regieanweisung in der Blindwahl.
 *
 * ## Was das Ueberschwingen kostet
 *
 * Es laeuft ueber das Ziel hinaus, und `winkelKlemmen` in `Figur.tsx`
 * schneidet dort stumm ab. Bei `cartoon` reissen vier Uebergaenge eine
 * Gelenkgrenze, bei `gefasst` zwei — nachgemessen ueber alle 90 Posenpaare.
 * Ein Ueberschwinger, der in die Grenze laeuft, wird dort flach: Das sieht aus
 * wie ein Ruckeln und ist keins. Deshalb gehoeren die Grenzen geweitet und
 * nicht die Bewegung gedaempft.
 */
export const FIGURENFEDERN = {
  heute: { damping: 200, stiffness: 120, mass: 0.6 },
  gefasst: { damping: 12, stiffness: 120, mass: 0.6 },
  cartoon: { damping: 8, stiffness: 120, mass: 0.6 },
} as const;

export type Federname = keyof typeof FIGURENFEDERN;

/** Isometrie des Bannerstils: 30-Grad-Achsen. */
export const ISOMETRIE = {
  gitterBreite: 72,
  gitterHoehe: 42,
} as const;

/**
 * Pflichtkennzeichnung. Steht rechtlich fest, nicht zur Auswahl:
 * Affiliate-Inhalte brauchen Werbekennzeichnung, synthetische Stimme
 * braucht KI-Kennzeichnung.
 */
export const KENNZEICHNUNG = {
  werbung: 'Werbung',
  kiStimme: 'KI-Stimme',
} as const;

/**
 * Der Kanalspruch. Steht im Nachschlag jedes Shorts.
 *
 * Er ist mehr als eine Signatur: „Wir haben nachgelesen." ist die
 * Rechtfertigung dafuer, dass dieser Kanal sich Frechheiten erlaubt. Wer
 * nachgelesen hat, darf behaupten, der Zuschauer sei zu bloed fuer die Zahl.
 * Wer nicht nachgelesen hat, ist einfach unhoeflich.
 *
 * Hier und nicht im Szenenrenderer, weil der Name genau diesen Fehler schon
 * einmal gemacht hat: „SetupKlar" stand an zwei Stellen im Code, eine wurde
 * beim Wechsel umgestellt, die andere nicht.
 */
export const SPRUCH = 'Wir haben nachgelesen.';
