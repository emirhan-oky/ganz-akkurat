import { FARBEN } from '../../src/marke';
import type { GeraeteArt } from '../../src/typen';

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
export type { GeraeteArt } from '../../src/typen';

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

export const Geraet: React.FC<{
  art: GeraeteArt;
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
}> = ({ art, groesse = 200, gedimmt = false, einpassen = false }) => (
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
    {Zeichnungen[art]}
  </svg>
);
