import { FARBEN } from '../../src/marke';
import type { GeraeteArt, KontextArt } from '../../src/typen';

/**
 * Geraete als Strichzeichnung im Bannerstil der Marke.
 *
 * Bewusst als Vektor nachgebaut statt als Foto oder Herstellerbild: Damit
 * entsteht kein Lizenz- oder Markenrechtsproblem, das Aussehen bleibt ueber
 * alle Videos identisch, und die Zeichnungen skalieren verlustfrei.
 *
 * Alle Icons teilen sich dieselbe Zeichenflaeche (200x150) und dieselben
 * Strichstaerken, damit sie in einer Kette optisch gleich gross wirken.
 */

/*
 * Der Typ kommt aus dem Datenvertrag, nicht aus dieser Datei. Vorher stand er
 * an beiden Stellen — eine Zeichnung ohne Eintrag im Schema oder ein
 * Schema-Wert ohne Zeichnung waere nicht aufgefallen, bis Remotion beim
 * Rendern nichts zu zeichnen findet.
 */
export type { GeraeteArt, KontextArt } from '../../src/typen';

const strich = {
  fill: 'none',
  stroke: FARBEN.linie,
  strokeWidth: 4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const fein = { ...strich, stroke: FARBEN.linieFein, strokeWidth: 3 };
const koerper = { fill: FARBEN.grundRein, stroke: FARBEN.linie, strokeWidth: 4, strokeLinejoin: 'round' as const };

const Zeichnungen: Record<GeraeteArt, React.ReactNode> = {
  notebook: (
    <>
      <rect {...koerper} x="42" y="30" width="116" height="76" rx="6" />
      <path {...fein} d="M56 46h88M56 62h64" />
      <path {...koerper} d="M28 108h144l12 16H16Z" />
      <path {...fein} d="M84 116h32" />
    </>
  ),
  dock: (
    <>
      <rect {...koerper} x="26" y="58" width="148" height="46" rx="10" />
      <path {...fein} d="M26 76h148" />
      <rect {...fein} x="44" y="84" width="18" height="10" rx="3" />
      <rect {...fein} x="72" y="84" width="18" height="10" rx="3" />
      <rect {...fein} x="100" y="84" width="18" height="10" rx="3" />
      <rect {...fein} x="128" y="84" width="26" height="10" rx="3" />
      <path {...strich} d="M60 58V44M140 58V44" />
    </>
  ),
  monitor: (
    <>
      <rect {...koerper} x="26" y="24" width="148" height="88" rx="6" />
      <path {...fein} d="M44 44h72M44 62h52" />
      <path {...strich} d="M100 112v18M66 130h68" />
    </>
  ),
  kabel: (
    <>
      <rect {...koerper} x="22" y="60" width="34" height="30" rx="8" />
      <rect {...koerper} x="144" y="60" width="34" height="30" rx="8" />
      <path {...strich} d="M56 75c22 0 22-26 44-26s22 52 44 52" />
      <path {...fein} d="M32 68h14M154 68h14" />
    </>
  ),
  netzteil: (
    <>
      <rect {...koerper} x="52" y="42" width="96" height="76" rx="12" />
      <path {...strich} d="M84 42V26M116 42V26" />
      <path {...fein} d="M74 84h52" />
      <path {...strich} d="M100 62l-14 22h28l-14 22" />
    </>
  ),
  telefon: (
    <>
      <rect {...koerper} x="66" y="20" width="68" height="118" rx="12" />
      <path {...fein} d="M84 40h32" />
      <circle {...fein} cx="100" cy="122" r="6" />
    </>
  ),
  powerbank: (
    <>
      <rect {...koerper} x="54" y="34" width="92" height="92" rx="14" />
      <rect {...fein} x="72" y="54" width="56" height="24" rx="5" />
      <path {...fein} d="M78 60h10M94 60h10M110 60h10" />
      <rect {...fein} x="86" y="96" width="28" height="12" rx="4" />
    </>
  ),
  adapter: (
    <>
      <rect {...koerper} x="60" y="46" width="80" height="68" rx="12" />
      <path {...strich} d="M78 46V28M122 46V28" />
      <circle {...fein} cx="100" cy="82" r="14" />
      <path {...fein} d="M86 82h28M100 68v28" />
    </>
  ),
  /*
   * Der Router traegt die Rubrik Zuhause und fehlte bis zum 13.08.2026 als
   * einziges Alltagsgeraet in dieser Liste. Zwei Antennen und drei
   * Statuslichter reichen zur Wiedererkennung — mehr Details waeren Behauptung
   * ueber ein Geraet, das es so nicht gibt.
   */
  router: (
    <>
      <rect {...koerper} x="34" y="72" width="132" height="42" rx="8" />
      <path {...strich} d="M62 72V38M138 72V38" />
      <circle {...fein} cx="60" cy="93" r="5" />
      <circle {...fein} cx="80" cy="93" r="5" />
      <circle {...fein} cx="100" cy="93" r="5" />
      {/* Funkwellen ueber der rechten Antenne: das, was den Router ausmacht. */}
      <path {...fein} d="M152 44a20 20 0 0 1 0 24M164 34a34 34 0 0 1 0 44" />
    </>
  ),
};

/**
 * Symbole fuer die Situation, nicht fuer die Technik.
 *
 * Sie stehen dort, wo es kein Geraet zu zeigen gibt — beim Rechtsthema, beim
 * Flug, an der fremden Steckdose. Derselbe Stil und dieselbe Zeichenflaeche,
 * aber ein anderer Anspruch: Ein Geraet muss dem Datenblatt entsprechen, ein
 * Symbol behauptet nichts, das falsch sein koennte. Ausfuehrlich begruendet
 * bei `KontextArt` in `src/typen.ts`.
 */
const Symbole: Record<KontextArt, React.ReactNode> = {
  /*
   * Seitenansicht, Nase nach rechts — aus vier klaren Formen statt einer
   * durchgehenden Kontur. Ein erster Versuch zeichnete die ganze Silhouette
   * als einen Pfad; sie war als Flugzeug zu erkennen, aber Nase und Heck
   * gerieten eckig. Vier Teile lassen sich einzeln sauber setzen.
   */
  flugzeug: (
    <>
      {/* Rumpf */}
      <path {...koerper} d="M40 66h100c17 0 28 7 28 15s-11 15-28 15H40c-13 0-22-7-22-15s9-15 22-15Z" />
      {/* Leitwerk */}
      <path {...koerper} d="M42 66 32 32h17l21 34Z" />
      {/* Tragflaeche, nach hinten unten gezogen */}
      <path {...koerper} d="M94 96 68 128h21l26-32Z" />
      {/* Fensterreihe */}
      <path {...fein} d="M62 81h58" />
    </>
  ),
  koffer: (
    <>
      <rect {...koerper} x="52" y="46" width="96" height="74" rx="10" />
      <path {...strich} d="M82 46V30h36v16" />
      <path {...fein} d="M74 62v42M126 62v42" />
      <circle {...fein} cx="72" cy="128" r="7" />
      <circle {...fein} cx="128" cy="128" r="7" />
    </>
  ),
  /* Gesetzbuch statt Richterhammer — die Begruendung steht bei `KontextArt`. */
  gesetzbuch: (
    <>
      {/* Deckel */}
      <rect {...koerper} x="46" y="26" width="110" height="96" rx="8" />
      {/* Ruecken links, Seitenschnitt rechts */}
      <path {...strich} d="M66 26v96" />
      <path {...fein} d="M146 44v60" />
      <text
        x="108"
        y="90"
        textAnchor="middle"
        fontSize="52"
        fontWeight="800"
        fontFamily="Inter, system-ui, sans-serif"
        fill={FARBEN.linie}
      >
        §
      </text>
    </>
  ),
  /* Der Bon traegt das Kaufdatum — den Tag, an dem die Fristen zu laufen beginnen. */
  kassenbon: (
    <>
      <path {...koerper} d="M62 24h76v102l-9.5-8-9.5 8-9.5-8-9.5 8-9.5-8-9.5 8-9.5-8-9.5 8Z" />
      <path {...fein} d="M78 50h44M78 68h44M78 86h28" />
    </>
  ),
  steckdose: (
    <>
      <circle {...koerper} cx="100" cy="75" r="50" />
      <circle {...fein} cx="83" cy="75" r="7" />
      <circle {...fein} cx="117" cy="75" r="7" />
      <path {...fein} d="M72 45h56M72 105h56" />
    </>
  ),
};

type ZeichnungProps = {
  groesse?: number;
  gedimmt?: boolean;
  /**
   * Begrenzt die Zeichnung auf die Hoehe ihres Behaelters.
   *
   * Noetig, seit Textszenen eine Illustration tragen koennen: Dort steht
   * zuerst der Text, und was uebrig bleibt, ist von Szene zu Szene
   * verschieden. Ohne diese Grenze quoll ein Geraet aus einer Szene mit
   * langem Text nach unten in den Untertitel hinein.
   */
  einpassen?: boolean;
};

const Zeichenflaeche: React.FC<ZeichnungProps & { inhalt: React.ReactNode }> = ({
  inhalt,
  groesse = 200,
  gedimmt = false,
  einpassen = false,
}) => (
  <svg
    width={groesse}
    height={groesse * 0.75}
    viewBox="0 0 200 150"
    preserveAspectRatio="xMidYMid meet"
    style={{
      display: 'block',
      opacity: gedimmt ? 0.35 : 1,
      ...(einpassen ? { maxHeight: '100%', maxWidth: '100%', height: 'auto' } : {}),
    }}
  >
    {/* Standflaeche: gibt den Objekten Halt wie im Banner. */}
    <ellipse cx="100" cy="140" rx="62" ry="9" fill={FARBEN.flaeche} opacity={0.5} />
    {inhalt}
  </svg>
);

export const Geraet: React.FC<ZeichnungProps & { art: GeraeteArt }> = ({ art, ...rest }) => (
  <Zeichenflaeche inhalt={Zeichnungen[art]} {...rest} />
);

/** Situationssymbol — gleiche Flaeche, anderer Anspruch. Siehe `Symbole`. */
export const Symbol: React.FC<ZeichnungProps & { art: KontextArt }> = ({ art, ...rest }) => (
  <Zeichenflaeche inhalt={Symbole[art]} {...rest} />
);
