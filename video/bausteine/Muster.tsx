import { FARBEN } from '../../src/marke';

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

/** Flache Platte in Isometrie — Grundform fuer Tastaturen, Displays, Ablagen. */
const Platte = (x: number, y: number, u: number, v: number, strich: string) => {
  const a = iso(0, 0);
  const b = iso(u, 0);
  const c = iso(u, v);
  const d = iso(0, v);
  const punkte = [a, b, c, d].map((p) => `${x + p.x},${y + p.y}`).join(' ');
  return <polygon points={punkte} fill="none" stroke={strich} strokeWidth={1.6} />;
};

/** Quader in Isometrie — Gehaeuse, Schrank, Klotz. */
const Quader = (x: number, y: number, u: number, v: number, h: number, strich: string) => {
  const o = (du: number, dv: number, dh: number) => {
    const p = iso(du, dv);
    return `${x + p.x},${y + p.y - dh}`;
  };
  return (
    <g fill="none" stroke={strich} strokeWidth={1.6}>
      <polygon points={[o(0, 0, h), o(u, 0, h), o(u, v, h), o(0, v, h)].join(' ')} />
      <polygon points={[o(0, 0, 0), o(u, 0, 0), o(u, 0, h), o(0, 0, h)].join(' ')} />
      <polygon points={[o(u, 0, 0), o(u, v, 0), o(u, v, h), o(u, 0, h)].join(' ')} />
    </g>
  );
};

/** Aufgeklappt — die Silhouette, die jeder als Notebook liest. */
const Klappe = (x: number, y: number, u: number, v: number, strich: string) => {
  const p = (du: number, dv: number, dh: number) => {
    const q = iso(du, dv);
    return `${x + q.x},${y + q.y - dh}`;
  };
  return (
    <g fill="none" stroke={strich} strokeWidth={1.6}>
      <polygon points={[p(0, 0, 0), p(u, 0, 0), p(u, v, 0), p(0, v, 0)].join(' ')} />
      <polygon points={[p(0, v, 0), p(u, v, 0), p(u, v, v * 0.8), p(0, v, v * 0.8)].join(' ')} />
    </g>
  );
};

/** Rechtwinklige Leitung mit Endpunkt — das Leiterbahnmotiv. */
const Leitung = (x: number, y: number, laenge: number, richtung: number, strich: string) => {
  const s = richtung > 0 ? 1 : -1;
  const d = `M ${x} ${y} h ${laenge * 0.5 * s} l ${28 * s} 28 h ${laenge * 0.5 * s}`;
  return (
    <g stroke={strich} strokeWidth={1.6} fill="none">
      <path d={d} />
      <circle cx={x + laenge * s + 28 * s} cy={y + 28} r={4} fill={strich} stroke="none" />
    </g>
  );
};

/**
 * Ein Dreieck, das nach rechts zeigt.
 *
 * Das Leitmotiv des alten Banners und der Grund, warum es funktioniert hat:
 * Ein liegendes Dreieck ist der Abspielknopf. Auf einem Videokanal braucht es
 * dafuer keine Erklaerung.
 */
const Dreieck = (x: number, y: number, groesse: number, drehung: number, farbe: string) => (
  <polygon
    points={`0,0 ${groesse},${groesse * 0.55} 0,${groesse * 1.1}`}
    fill={farbe}
    transform={`translate(${x} ${y}) rotate(${drehung} 0 ${groesse * 0.55})`}
  />
);

type MusterEigenschaften = {
  breite: number;
  hoehe: number;
  /** Rechteck in der Mitte, das frei bleibt — dort steht die Schrift. */
  freiBreite: number;
  freiHoehe: number;
  linie: string;
  dunkel: string;
  akzent: string;
};

export const Muster: React.FC<MusterEigenschaften> = ({
  breite,
  hoehe,
  freiBreite,
  freiHoehe,
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
   * Absicht. Der Rand ist grosszuegiger als das sichere Feld, damit die
   * Schrift nicht auf einer Kante sitzt.
   */
  const frei = (x: number, y: number, rand = 90) =>
    Math.abs(x - breite / 2) < freiBreite / 2 + rand &&
    Math.abs(y - hoehe / 2) < freiHoehe / 2 + rand;

  const platziere = (bauen: (x: number, y: number) => React.ReactNode, anzahl: number) => {
    let gesetzt = 0;
    let versuche = 0;
    while (gesetzt < anzahl && versuche < anzahl * 40) {
      versuche += 1;
      const x = w() * breite;
      const y = w() * hoehe;
      if (frei(x, y)) continue;
      teile.push(<g key={`${gesetzt}-${versuche}-${x.toFixed(0)}`}>{bauen(x, y)}</g>);
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

/**
 * Der Spruch als Hauptsache, im Staerkekontrast der Wortmarke.
 *
 * „Wir haben" duenn, „nachgelesen." fett — dieselbe Machart wie „Ganz akkurat"
 * und deshalb ohne Logo wiedererkennbar. Der Punkt am Ende ist blau: der
 * einzige Akzent, den der Satz braucht, und die Stelle, an der die Marke
 * trocken wird.
 *
 * **Der Abstand ist hier ein anderer als in der Wortmarke.** Dort steht ein
 * Haarspalt (`&#8202;`), weil „Ganz akkurat" als ein Wort gelesen werden soll
 * — die Trennung leistet die Strichstaerke. Uebernommen in einen Satz ergab
 * das „Wir habennachgelesen.": Die Staerken wechseln zwar, aber ein Leser
 * erwartet zwischen zwei Woertern Luft und nicht nur Fettung. Hier steht
 * deshalb ein **normales** Leerzeichen. Der Zwischenschritt mit einem schmalen
 * (`&#8239;`) sah im Code vernuenftig aus und klebte bei 104 Pixeln immer
 * noch. In einem Satz gewinnt die Lesbarkeit gegen den Kontrast — der
 * Staerkewechsel traegt auch mit normalem Abstand, er muss die Trennung nur
 * nicht allein leisten.
 */
export const SpruchGross: React.FC<{ groesse: number; farbe: string; duenn: number; fett: number; familie: string; akzent: string }> = ({
  groesse,
  farbe,
  duenn,
  fett,
  familie,
  akzent,
}) => (
  <span
    style={{
      fontFamily: familie,
      fontSize: groesse,
      color: farbe,
      letterSpacing: -1,
      whiteSpace: 'nowrap',
      lineHeight: 1,
    }}
  >
    <span style={{ fontWeight: duenn }}>Wir haben </span>
    <span style={{ fontWeight: fett }}>nachgelesen</span>
    <span style={{ fontWeight: fett, color: akzent }}>.</span>
  </span>
);

export const MUSTERFARBEN = {
  linie: FARBEN.linie,
  dunkel: FARBEN.tinte,
  akzent: FARBEN.blau,
};
