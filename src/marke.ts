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
} as const;

export const FARBEN = {
  /** Grund: heller Off-White wie im Banner — hebt sich im dunklen Feed ab. */
  grund: '#F7F8FA',
  grundRein: '#FFFFFF',
  /** Isometrisches Hintergrundgitter. */
  gitter: '#EDF1F5',

  /** Text und Illustrationslinien. */
  tinte: '#111820',
  tinteWeich: '#5E6877',
  linie: '#9EA6AF',
  linieFein: '#BDC4CB',
  flaeche: '#D7DCE2',

  /** Der einzige echte Akzent. Sparsam einsetzen, sonst verliert er Wirkung. */
  blau: '#2C5EFF',
  blauHell: '#E9EEFF',

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
 * variable Schrift frei nutzbar. Der Markenkontrast entsteht ueber die
 * Staerken, nicht ueber zwei verschiedene Schriften.
 */
export const SCHRIFT = {
  familie: 'Inter',
  duenn: 300,
  normal: 400,
  halbfett: 600,
  fett: 800,
  schwarz: 900,
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
