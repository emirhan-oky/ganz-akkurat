
/**
 * Das Isometriemuster — Bannergrund aus Dreiecken, Umrissen und Leitungen.
 *
 * Nachgebaut nach dem alten SetupKlar-Banner, das als einziges Stueck der
 * alten Marke gefallen hat. Drei Ebenen uebereinander: duenne Linien im
 * Hintergrund, flaechige Dreiecke davor, ein paar blaue Akzente dazwischen.
 *
 * **Gezeichnet und nicht generiert.** Ein Bildmodell erfindet Buchsen, und
 * Stock-Material behauptet Technisches, ohne dass jemand dafuer einsteht — die
 * beiden Regeln gelten fuer das Video, und es gibt keinen Grund, sie fuer ein
 * Banner aufzuweichen. Was hier steht, ist deshalb Geometrie: Parallelogramme
 * in Isometrie, Dreiecke, rechtwinklige Leitungen mit Endpunkt.
 *
 * Die Gestalt entsteht aus der **Dichte**, nicht aus Detailtreue. Aus zwei
 * Metern Entfernung liest man ein Werkstattmuster; aus zehn Zentimetern
 * Rechtecke. Genau das ist bei einem Banner richtig, das die meisten Leute
 * zwei Sekunden lang und stark verkleinert sehen.
 *
 * Die Streuung ist **deterministisch**: derselbe Startwert, dasselbe Bild.
 * Ein Banner, das sich bei jedem Lauf anders wuerfelt, waere kein Markenbild,
 * sondern ein Zufallsgenerator — und man koennte nie sagen, welche Fassung
 * gerade online steht.
 */

/** Linearer Kongruenzgenerator. Reicht fuer Streuung und ist reproduzierbar. */
const zufall = (start: number) => {
  let s = start;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
};

/** Isometrische Achsen: 30 Grad nach rechts oben, 30 Grad nach rechts unten. */
const ISO_X = { x: Math.cos(Math.PI / 6), y: Math.sin(Math.PI / 6) };
const ISO_Y = { x: -Math.cos(Math.PI / 6), y: Math.sin(Math.PI / 6) };

const iso = (u: number, v: number) => ({
  x: u * ISO_X.x + v * ISO_Y.x,
  y: u * ISO_X.y + v * ISO_Y.y,
});

/**
 * Ein Musterteil samt seinem Platzbedarf.
 *
 * `kasten` nennt, wie weit das Teil vom Ankerpunkt aus nach links, oben,
 * rechts und unten reicht. Ohne diese Angabe konnte die Freiraumpruefung nur
 * den Anker pruefen, und ein Teil, das nach rechts waechst, ragte in die
 * Schrift — dagegen half nur ein grosszuegiger Sicherheitsrand, der den
 * Freiraum weit ueber den Textblock hinaus aufblies.
 */
type Bau = {
  knoten: React.ReactNode;
  /**
   * links, oben, rechts, unten — je als Abstand vom Anker. Negativ ist
   * erlaubt und heisst, dass das Teil auf dieser Seite gar nicht bis zum
   * Anker reicht.
   */
  kasten: [number, number, number, number];
};

/** Flache Platte in Isometrie — Grundform fuer Tastaturen, Displays, Ablagen. */
const Platte = (x: number, y: number, u: number, v: number, strich: string): Bau => {
  const a = iso(0, 0);
  const b = iso(u, 0);
  const c = iso(u, v);
  const d = iso(0, v);
  const punkte = [a, b, c, d].map((p) => `${x + p.x},${y + p.y}`).join(' ');
  return {
    knoten: <polygon points={punkte} fill="none" stroke={strich} strokeWidth={1.6} />,
    kasten: [-ISO_Y.x * v, 0, ISO_X.x * u, 0.5 * (u + v)],
  };
};

/** Quader in Isometrie — Gehaeuse, Schrank, Klotz. */
const Quader = (x: number, y: number, u: number, v: number, h: number, strich: string): Bau => {
  const o = (du: number, dv: number, dh: number) => {
    const p = iso(du, dv);
    return `${x + p.x},${y + p.y - dh}`;
  };
  return {
    knoten: (
      <g fill="none" stroke={strich} strokeWidth={1.6}>
        <polygon points={[o(0, 0, h), o(u, 0, h), o(u, v, h), o(0, v, h)].join(' ')} />
        <polygon points={[o(0, 0, 0), o(u, 0, 0), o(u, 0, h), o(0, 0, h)].join(' ')} />
        <polygon points={[o(u, 0, 0), o(u, v, 0), o(u, v, h), o(u, 0, h)].join(' ')} />
      </g>
    ),
    kasten: [-ISO_Y.x * v, h, ISO_X.x * u, 0.5 * (u + v)],
  };
};

/** Aufgeklappt — die Silhouette, die jeder als Notebook liest. */
const Klappe = (x: number, y: number, u: number, v: number, strich: string): Bau => {
  const p = (du: number, dv: number, dh: number) => {
    const q = iso(du, dv);
    return `${x + q.x},${y + q.y - dh}`;
  };
  return {
    knoten: (
      <g fill="none" stroke={strich} strokeWidth={1.6}>
        <polygon points={[p(0, 0, 0), p(u, 0, 0), p(u, v, 0), p(0, v, 0)].join(' ')} />
        <polygon points={[p(0, v, 0), p(u, v, 0), p(u, v, v * 0.8), p(0, v, v * 0.8)].join(' ')} />
      </g>
    ),
    kasten: [-ISO_Y.x * v, 0.3 * v, ISO_X.x * u, 0.5 * (u + v)],
  };
};

/** Rechtwinklige Leitung mit Endpunkt — das Leiterbahnmotiv. */
const Leitung = (x: number, y: number, laenge: number, richtung: number, strich: string): Bau => {
  const s = richtung > 0 ? 1 : -1;
  const d = `M ${x} ${y} h ${laenge * 0.5 * s} l ${28 * s} 28 h ${laenge * 0.5 * s}`;
  const weite = laenge + 32;
  return {
    knoten: (
      <g stroke={strich} strokeWidth={1.6} fill="none">
        <path d={d} />
        <circle cx={x + laenge * s + 28 * s} cy={y + 28} r={4} fill={strich} stroke="none" />
      </g>
    ),
    kasten: [s > 0 ? 0 : weite, 4, s > 0 ? weite : 0, 32],
  };
};

/**
 * Ein Dreieck, das nach rechts zeigt.
 *
 * Das Leitmotiv des alten Banners und der Grund, warum es funktioniert hat:
 * Ein liegendes Dreieck ist der Abspielknopf. Auf einem Videokanal braucht es
 * dafuer keine Erklaerung.
 */
const Dreieck = (x: number, y: number, groesse: number, drehung: number, farbe: string): Bau => ({
  knoten: (
    <polygon
      points={`0,0 ${groesse},${groesse * 0.55} 0,${groesse * 1.1}`}
      fill={farbe}
      transform={`translate(${x} ${y}) rotate(${drehung} 0 ${groesse * 0.55})`}
    />
  ),
  /*
   * Je Drehung ein eigener Kasten. Zusammengefasst waere er doppelt so
   * breit wie noetig, und ein Dreieck, das nach rechts zeigt, muesste links
   * denselben Abstand halten wie rechts — genau die Reserve, die den
   * Freiraum aufblaeht.
   */
  kasten: KAESTEN[drehung]!(groesse),
});

/** Der Kasten des Dreiecks, je Drehung. Gerechnet, nicht geschaetzt. */
const KAESTEN: Record<number, (g: number) => [number, number, number, number]> = {
  0: (g) => [0, 0, g, 1.1 * g],
  180: (g) => [g, 0, 0, 1.1 * g],
  90: (g) => [0.55 * g, -0.55 * g, 0.55 * g, 1.55 * g],
  270: (g) => [0.55 * g, 0.45 * g, 0.55 * g, 0.55 * g],
};

/**
 * Ein Streifen des Textblocks, der frei bleiben muss.
 *
 * Alle drei Angaben zaehlen von der Bildmitte aus: `breite` ist die volle
 * Breite des Streifens, `oben` und `unten` sind seine Kanten als Abstand zur
 * Mitte, negativ nach oben.
 */
export type FreiStreifen = { breite: number; oben: number; unten: number };

type MusterEigenschaften = {
  breite: number;
  hoehe: number;
  /**
   * Die Streifen in der Mitte, die frei bleiben — dort steht die Schrift.
   *
   * **Kein einzelnes Rechteck und keine Ellipse, sondern die Silhouette.**
   * Ein Textblock ist oben und unten schmal und nur in der Zeile mit der
   * groessten Schrift breit. Eine Huelle darum haelt Flaeche frei, in der
   * nichts steht — und genau diese Flaeche ist auf dem Telefon sichtbar.
   */
  frei: FreiStreifen[];
  /** Abstand, den jedes Musterteil zu den Streifen haelt. */
  freiRand: number;
  linie: string;
  dunkel: string;
  akzent: string;
};

export const Muster: React.FC<MusterEigenschaften> = ({
  breite,
  hoehe,
  frei,
  freiRand,
  linie,
  dunkel,
  akzent,
}) => {
  const w = zufall(20260817);
  const teile: React.ReactNode[] = [];

  /*
   * Die Mitte bleibt frei — nicht durch Ueberdecken, sondern indem dort
   * nichts erst gezeichnet wird. Ein halbdurchsichtiger Deckel ueber dem
   * Muster sieht aus wie ein Wasserzeichen; eine echte Luecke sieht aus wie
   * Absicht.
   *
   * Geprueft wird der **Kasten** des Teils gegen die Streifen, nicht sein
   * Ankerpunkt. Bis zum 25.08.2026 stand hier ein Punkttest mit einem
   * pauschalen Rand von 90 Pixeln; der reichte fuer eine Leitung, die 230
   * Pixel nach rechts waechst, nicht aus und war fuer ein kleines Dreieck
   * dreimal zu viel. Der Rand musste deshalb den schlimmsten Fall abdecken
   * und blies den Freiraum ueberall auf.
   */
  const mx = breite / 2;
  const my = hoehe / 2;

  const stoert = (x: number, y: number, [links, oben, rechts, unten]: [number, number, number, number]) =>
    frei.some((streifen) => {
      const halb = streifen.breite / 2 + freiRand;
      return (
        x + rechts > mx - halb &&
        x - links < mx + halb &&
        y + unten > my + streifen.oben - freiRand &&
        y - oben < my + streifen.unten + freiRand
      );
    });

  /*
   * **Das Muster ist innen dicht und aussen duenn.**
   *
   * Gleichverteilt gestreut liegt der groesste Teil dort, wo ihn niemand
   * sieht: Auf dem Telefon zeigt YouTube nur einen Streifen von 1235x338,
   * also rund ein Sechstel der Flaeche, und die Mitte davon gehoert der
   * Schrift. Innerhalb dieses Streifens faellt kein Teil weg, nach aussen
   * duennt das Muster bis auf ein Drittel aus.
   */
  const HANDY_BREITE = 1235;
  const HANDY_HOEHE = 338;

  const gewicht = (x: number, y: number) => {
    const r = Math.max(Math.abs(x - mx) / (HANDY_BREITE / 2), Math.abs(y - my) / (HANDY_HOEHE / 2));
    return r < 1 ? 1 : Math.max(0.34, 1 - (r - 1) * 0.4);
  };

  const platziere = (bauen: (x: number, y: number) => Bau, anzahl: number) => {
    let gesetzt = 0;
    let versuche = 0;
    while (gesetzt < anzahl && versuche < anzahl * 60) {
      versuche += 1;
      const x = w() * breite;
      const y = w() * hoehe;
      if (w() > gewicht(x, y)) continue;
      const teil = bauen(x, y);
      if (stoert(x, y, teil.kasten)) continue;
      teile.push(<g key={`${gesetzt}-${versuche}-${x.toFixed(0)}`}>{teil.knoten}</g>);
      gesetzt += 1;
    }
  };

  platziere((x, y) => Leitung(x, y, 60 + w() * 140, w() > 0.5 ? 1 : -1, linie), 40);
  platziere((x, y) => Platte(x, y, 60 + w() * 70, 45 + w() * 55, linie), 38);
  platziere((x, y) => Quader(x, y, 40 + w() * 45, 40 + w() * 45, 25 + w() * 55, linie), 28);
  platziere((x, y) => Klappe(x, y, 55 + w() * 45, 45 + w() * 30, linie), 22);
  /*
   * Die Drehung ist gerastert, nicht frei.
   *
   * Der erste Anlauf wuerfelte 0 bis 360 Grad, und damit war das Leitmotiv weg:
   * Ein Dreieck, das nach rechts zeigt, ist der Abspielknopf; eins, das nach
   * unten zeigt, ist ein Keil. Im gerenderten Bild zeigte die Haelfte irgendwo
   * hin und die Flaeche las sich als Scherbenhaufen. Jetzt liegt das Gewicht
   * auf 0 Grad, ein Drittel kippt um 180 oder 90 Grad — genug Unruhe, dass es
   * kein Raster wird, und genug Ordnung, dass man den Knopf erkennt.
   */
  const DREHUNGEN = [0, 0, 0, 0, 180, 180, 90, 270];
  platziere(
    (x, y) => Dreieck(x, y, 26 + w() * 80, DREHUNGEN[Math.floor(w() * DREHUNGEN.length)]!, w() > 0.62 ? akzent : dunkel),
    44,
  );

  return (
    <svg
      width={breite}
      height={hoehe}
      viewBox={`0 0 ${breite} ${hoehe}`}
      style={{ position: 'absolute', inset: 0 }}
    >
      {teile}
    </svg>
  );
};

