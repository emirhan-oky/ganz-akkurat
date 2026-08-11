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
 * Werte bewusst konservativ: TikTok deckt rechts am meisten ab, Reels unten.
 */
export const SICHERE_ZONE = {
  oben: 240,
  /**
   * Reels blendet unten Beschreibung und Tonzeile ein und verdeckt damit
   * deutlich mehr als TikTok. Der Wert richtet sich nach der schlimmsten
   * Plattform, nicht nach dem Mittel — darunter liegt nur noch der
   * Untertitel, der als Letztes verdeckt werden darf.
   */
  unten: 580,
  links: 60,
  rechts: 200,
} as const;

/** Nutzbare Flaeche innerhalb der sicheren Zone. */
export const BUEHNE = {
  x: SICHERE_ZONE.links,
  y: SICHERE_ZONE.oben,
  breite: FORMAT.breite - SICHERE_ZONE.links - SICHERE_ZONE.rechts,
  hoehe: FORMAT.hoehe - SICHERE_ZONE.oben - SICHERE_ZONE.unten,
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
