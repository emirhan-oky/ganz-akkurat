/**
 * SetupKlar Design-Tokens.
 *
 * Einzige Quelle fuer Farbe, Schrift, Rhythmus und Geometrie. Jede Szene liest
 * hier — nirgends sonst stehen Hexwerte oder Pixelgroessen fest verdrahtet.
 *
 * Abgeleitet aus SetupKlar/Branding: heller Grund, isometrisches Gitter,
 * Outline-Illustrationen in Grau, Signalblau als einziger echter Akzent, und
 * die Wortmarke lebt vom Kontrast "Setup" duenn / "Klar" fett.
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
   */
  oben: 230,
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
   * 115 = 52 Beschnitt + rund 60 echter Rand.
   */
  links: 115,
  /**
   * 240 = 56 Beschnitt + rund 180 fuer die Aktionsleiste, die TikTok rechts
   * einblendet. Von den alten 200 blieben nach dem Beschnitt nur 144 — zu
   * wenig fuer die Leiste, auch wenn es am Desktop nie auffiel.
   */
  rechts: 240,
} as const;

/**
 * Hoehe, auf der die Kopfzeile sitzt — Wortmarke, Rubrik-Pille,
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
 * 150 liegt unter der Statusleiste auch der Geraete mit Dynamic Island (dort
 * rund 120 Pixel, auf die Videohoehe gerechnet).
 */
export const KOPFZEILE_OBEN = 150;

/**
 * Hoehe, die der Untertitel unten belegt.
 *
 * Zwei Zeilen à 66 Pixel plus Abstand. Der Wert ist eine Reservierung, kein
 * Rahmen: Der Untertitel wird nicht auf diese Hoehe gesetzt, aber die Buehne
 * rendert nicht hinein. Ohne die Reservierung liegen Szenentext und
 * Untertitel uebereinander, sobald der Untertitel in die sichere Zone
 * gewandert ist.
 */
export const UNTERTITEL_ZONE = 200;

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
