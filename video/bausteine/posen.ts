import { interpolate, spring } from 'remotion';
import { Pose, type PosenName, type Rig } from '../../src/figur';
import { TEMPO } from '../../src/marke';

/**
 * Der Posenwortschatz und seine Zeitsteuerung.
 *
 * Hier faellt die Trennung, auf der die ganze Figur steht: `Figur.tsx`
 * zeichnet eine Pose und kennt keine Zeit, diese Datei rechnet aus dem
 * aktuellen Bild eine Pose und zeichnet nichts. Wer beides mischt, bekommt
 * eine Animation, die sich in der Vorschau anders verhaelt als im Render.
 *
 * **Alles ist bildgetrieben.** Kein `requestAnimationFrame`, kein Timer, kein
 * Zufall ohne Saat. Remotion rendert Bild fuer Bild und nicht in Echtzeit;
 * eine selbstlaufende Zeitachse ergaebe bei jedem Durchlauf eine andere
 * Fassung, und keine davon entspraeche dem, was in der Vorschau zu sehen war.
 *
 * ## Sechs Posen, nicht sechzig
 *
 * Der Kanal braucht genau die Gesten, die zu seinen vier Positionen gehoeren:
 * zugreifen, nachschlagen, stutzen, zeigen. Eine Figur mit dreissig Posen
 * waere eine Figur, die spielt — und das Video ist keine Buehne, sondern
 * zwanzig Sekunden mit einem einzigen Gedanken darin.
 */

const p = (roh: Partial<Pose>) => Pose.parse(roh);

export const POSEN: Record<PosenName, Pose> = {
  /** Grundstellung. Arme haengen, Blick geradeaus. */
  ruhe: p({ mund: 'laecheln' }),

  /**
   * Nachschlagen. Die Pose des Kanalspruchs.
   *
   * Sie ist die einzige Pose, die **ohne Requisite nicht funktioniert**: Ohne
   * etwas zwischen den Haenden greifen sie ins Leere.
   *
   * Die Winkel sind **gerechnet, nicht geschaetzt**. Die geschaetzten davor
   * (6 / 34 gespiegelt) haben den Arm aussen um das Gehaeuse herumgefuehrt und
   * dabei zwischen Oberarm, Unterarm und Gehaeusekante ein Dreieck Hintergrund
   * eingeschlossen — im Standbild eine Kerbe im Akku, keine Geste.
   *
   * Das Blatt liegt bei x 86..114, y 94..113; gesucht war die Handmitte an
   * seinen oberen Ecken. Die Kette dreht erst den Unterarm um den Ellenbogen,
   * dann den ganzen Arm um die Schulter. Mit -8 und -38 landet die linke Hand
   * bei (83,8 | 96,4) und deckt mit ihrem Radius von 5 die Blattkante bei
   * x = 86. Der Ellenbogen kommt dabei auf x = 67,2 zu liegen, also auf die
   * Gehaeusekante — der Arm knickt sichtbar nach vorn, statt im Umriss zu
   * verschwinden. Rechts dasselbe gespiegelt.
   */
  lesen: p({
    drehung: {
      oberarm_rechts: 38,
      unterarm_rechts: 8,
      oberarm_links: -38,
      unterarm_links: -8,
    },
    blick: [0, 2.6],
    mund: 'strich',
  }),

  /** Zeigen. Der Unterarm steht unabhaengig, sonst zeigt die Figur schraeg. */
  zeigen: p({
    drehung: { oberarm_rechts: -68, unterarm_rechts: -10, koerper: 4 },
    blick: [2.6, -1.4],
    mund: 'laecheln',
  }),

  /**
   * Schieflage, Blick zur Seite. Die Pose vor dem Kipppunkt.
   *
   * Hier neigt sich der **ganze Koerper**, nicht der Kopf — die Figur hat
   * keinen. Neun Grad sind die Obergrenze und sehen nach Geste aus; darueber
   * sieht ein Akku nicht nachdenklich aus, sondern umkippend.
   */
  stutzen: p({
    drehung: { koerper: 8, oberarm_rechts: -12 },
    blick: [-2.8, 0.4],
    mund: 'schmal',
  }),

  /** Offener Mund, leicht zurueckgelehnt, Arme etwas ab. */
  staunen: p({
    drehung: { koerper: -4, oberarm_rechts: -20, oberarm_links: 20 },
    blick: [0, -1.8],
    mund: 'offen',
  }),

  /**
   * Achselzucken. Die trockene Absage.
   *
   * Hiess bis zur zweiten Standbildprobe `abwehr` und klappte beide Unterarme
   * vor den Koerper. In der Vorderansicht ging das nicht auf: Der linke Arm
   * liegt dahinter und war unsichtbar, der rechte lag als einzelner Balken
   * quer davor. Nach aussen gedreht steht die Geste symmetrisch und braucht
   * keine Requisite.
   */
  achselzucken: p({
    drehung: {
      oberarm_rechts: -22,
      unterarm_rechts: -40,
      oberarm_links: 22,
      unterarm_links: 40,
    },
    /*
     * Kein Mundwinkel nach unten mehr. Bis zum 24.08.2026 stand hier `zug`,
     * und im fertigen Video war das der Gesichtsausdruck einer Figur, die
     * gerade eine schlechte Nachricht bekommt — beim Achselzucken ist die
     * Haltung schon die Aussage, das Gesicht muss nicht mittrauern.
     */
    mund: 'strich',
  }),

  /**
   * Erklaeren: der ausgestreckte Arm zum Bild hin.
   *
   * Der rechte Arm steht hoch und schraeg nach aussen, der Stab verlaengert
   * ihn. Der Blick geht mit — eine Figur, die auf etwas zeigt und woandershin
   * schaut, zeigt nicht, sondern haelt nur den Arm hoch.
   *
   * Gerechnet: Schulter rechts (132 | 62), Ellenbogen (144 | 76), Hand
   * (144 | 99). Mit -78 am Oberarm und -12 am Unterarm kommt die Hand
   * oberhalb der Schulter zu liegen, ausserhalb der Silhouette — dort hat der
   * Stab freie Bahn.
   */
  erklaeren: p({
    drehung: { oberarm_rechts: -78, unterarm_rechts: -12, koerper: 3 },
    blick: [2.8, -2.2],
    mund: 'laecheln',
  }),

  /**
   * Von unten nach oben schauen.
   *
   * Fuer die Buehnen, in denen die Figur klein am unteren Rand steht und das
   * Geschehen ueber ihr liegt. Der Koerper lehnt zurueck, der Blick geht nach
   * oben — bei einer Figur ohne Kopf ist das die einzige Moeglichkeit, eine
   * Blickrichtung zu zeigen, die nicht nur in den Augen steckt.
   */
  hochschauen: p({
    drehung: { koerper: -7, oberarm_rechts: -16, oberarm_links: 16 },
    // Nach oben **rechts**, nicht gerade nach oben: Dort steht bei
    // `stand: 'klein'` das Symbol. Ein Blick, der daran vorbeigeht, ist keiner.
    blick: [2, -2.8],
    mund: 'offen',
  }),

  /**
   * Gruss mit erhobenem Arm.
   *
   * Nur fuer den Aufschlag gedacht. Mitten im Video winkt niemand, und am Ende
   * waere es ein Abschied — genau das, was der Rundlauf verhindern soll.
   */
  winken: p({
    drehung: { oberarm_rechts: -92, unterarm_rechts: -28, koerper: -2 },
    blick: [1.6, -0.8],
    mund: 'laecheln',
  }),

  /**
   * Hand an der Wange.
   *
   * Gerechnet — und beim ersten Mal trotzdem falsch. Mit +45 am Oberarm und
   * +80 am Unterarm landet die Hand bei (112 | 67), rechnerisch elf Einheiten
   * unter dem rechten Auge (114 | 56). Im Standbild lag sie darauf: Hand und
   * Auge haben beide einen Radius, und die Rechnung hatte nur die Mittelpunkte
   * verglichen.
   *
   * Mit +30 und +70 kam sie auf (113 | 76) und lag damit auf dem Mund — im
   * Standbild ein Schnurrbart. Erst +20 und +60 bringen sie auf (116 | 83),
   * also unter den Mund ans Kinn.
   *
   * Dreimal gerechnet, dreimal nachgesehen. Bei einem Gesicht ohne Kopf gibt
   * es keine Faustregel dafuer, wo „an der Wange" liegt — nur Koordinaten und
   * das Bild.
   */
  nachdenken: p({
    drehung: { oberarm_rechts: 20, unterarm_rechts: 60, koerper: 5 },
    blick: [-1.8, 1.2],
    mund: 'schmal',
  }),
};

/**
 * Blendet zwischen zwei Posen.
 *
 * Zahlen werden interpoliert, der **Mund springt**. Er ist als vier getrennte
 * Teile gebaut, gerade damit er nicht auf halbem Weg eine Form zeigt, die
 * niemand gezeichnet hat. Der Umschlag liegt bei 0,5 — vorher die alte Form,
 * danach die neue.
 */
export const poseMischen = (von: Pose, nach: Pose, t: number): Pose => {
  const mischeFeld = (a: Record<string, number>, b: Record<string, number>, ruhe: number) => {
    const ergebnis: Record<string, number> = {};
    for (const id of new Set([...Object.keys(a), ...Object.keys(b)])) {
      ergebnis[id] = interpolate(t, [0, 1], [a[id] ?? ruhe, b[id] ?? ruhe]);
    }
    return ergebnis;
  };

  return {
    drehung: mischeFeld(von.drehung, nach.drehung, 0),
    // Der Ruhewert ist hier `1` und nicht `0`: Ein Teil, das in der einen
    // Pose nicht genannt wird, ist ungestaucht und nicht zugedrueckt. Mit
    // `0` waere jedes Auge, das nur in einer der beiden Posen vorkommt,
    // beim Uebergang zugefallen.
    stauchung: mischeFeld(von.stauchung, nach.stauchung, 1),
    blick: [
      interpolate(t, [0, 1], [von.blick[0], nach.blick[0]]),
      interpolate(t, [0, 1], [von.blick[1], nach.blick[1]]),
    ],
    hub: interpolate(t, [0, 1], [von.hub, nach.hub]),
    mund: t < 0.5 ? von.mund : nach.mund,
  };
};

/** Ruhiges Heben und Senken. Amplitude in Buehneneinheiten, nicht in Pixeln. */
const atmen = (frame: number, fps: number) => Math.sin((frame / fps) * 1.6) * 0.7;

/**
 * Blinzeln, deterministisch aus dem Bild gerechnet.
 *
 * Der Takt ist bewusst keine runde Zahl: Bei glatten 90 Bildern faellt das
 * Blinzeln in jeder Szene auf dieselbe Sekunde, und zwei Szenen nebeneinander
 * blinzeln im Gleichschritt. `versatz` verschiebt es zusaetzlich je Szene —
 * ohne ihn beginnt jede Szene bei Bild 0 und damit mit demselben Muster.
 */
const TAKT = 97;
const DAUER = 5;

const lidschluss = (frame: number, versatz: number): number => {
  /*
   * `((a % n) + n) % n` und nicht `a % n`.
   *
   * JavaScripts Restoperator behaelt das Vorzeichen des Dividenden: `-51 % 97`
   * ist `-51` und nicht `46`. Der Wert fiel damit unter `DAUER`, und
   * `interpolate` extrapolierte ihn ohne Klemmung auf das **Einundzwanzigfache**
   * — die Augen wurden ueber die ganze Figur gestreckt und sahen im Standbild
   * aus wie senkrechte Striche durch den Koerper.
   *
   * Gefunden am 20.08.2026 im ersten Standbild der Figurenbuehne. Im Code war
   * nichts zu sehen: Die Formel ist richtig, solange niemand einen negativen
   * Frame hineingibt — und genau das tat die Buehne, weil ihr Uebergang erst
   * in der Szenenmitte beginnt.
   */
  const stelle = (((frame + versatz * 23) % TAKT) + TAKT) % TAKT;
  if (stelle >= DAUER) return 0;
  // Zu und wieder auf, ohne Halt in der Mitte: Ein Lid, das eine Zehntel
  // Sekunde geschlossen bleibt, sieht aus wie ein Fehler im Render.
  return interpolate(stelle, [0, DAUER / 2, DAUER], [0, 1, 0], {
    // Guertel neben dem Hosentraeger. Die Klemmung kostet nichts und macht
    // die Funktion gegen jeden Eingabewert dicht, nicht nur gegen den einen,
    // der aufgefallen ist.
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

/**
 * Die Pose eines Bildes.
 *
 * Sie entsteht in drei Schichten, und die Reihenfolge ist die Aussage: Erst
 * der Uebergang in die Grundpose, dann das Atmen, dann das Blinzeln. Atmen
 * und Blinzeln laufen **immer** — auch waehrend des Uebergangs, auch in einer
 * Denkpause. Eine Figur, die waehrend einer Stille voellig stillsteht, sieht
 * aus wie ein eingefrorener Render, und genau diesen Fehler soll die
 * Bewegungsprobe der QA finden.
 */
export const poseAus = ({
  frame,
  fps,
  pose,
  vorherigePose = 'ruhe',
  versatz = 0,
  abBild = 0,
}: {
  frame: number;
  fps: number;
  pose: PosenName;
  /** Woher die Figur kommt. Innerhalb einer Szene die Pose der Szene davor. */
  vorherigePose?: PosenName;
  /** Szenenindex. Verschiebt Blinzeln und Atmen gegeneinander. */
  versatz?: number;
  /**
   * Ab welchem Bild der Uebergang laeuft. Vorher steht die Figur in
   * `vorherigePose` — **atmet und blinzelt aber weiter**.
   *
   * Der Parameter ist noetig, weil der Uebergang einer Buehne in der
   * Szenenmitte liegt und nicht am Anfang: Am Anfang reagierte die Figur auf
   * einen Satz, den der Zuschauer noch nicht gehoert hat.
   *
   * Der erste Anlauf loeste das, indem die Buehne `frame - beginn` uebergab.
   * Das verschob **alles** mit, auch Atmen und Blinzeln, und lieferte
   * negative Frames — mit dem Ergebnis, dass die Augen auf das
   * Einundzwanzigfache gestreckt wurden. Zwei Zeitachsen in einem Zaehler
   * sind eine zu viel.
   */
  abBild?: number;
}): Pose => {
  const ziel = POSEN[pose];
  const start = POSEN[vorherigePose];

  const t = spring({ frame: frame - abBild, fps, config: TEMPO.feder });
  const gemischt = poseMischen(start, ziel, t);

  const zu = lidschluss(frame, versatz);

  return {
    ...gemischt,
    hub: gemischt.hub + atmen(frame + versatz * 11, fps),
    stauchung: {
      ...gemischt.stauchung,
      auge_links: 1 - zu,
      auge_rechts: 1 - zu,
    },
  };
};

/**
 * Die drei Folge-Posen des Zeigers — eine je Dienst.
 *
 * **Bewusst ausserhalb von `POSEN`.** Jenes Record folgt dem Enum `PosenName`
 * und ist damit das Vokabular, aus dem **Entwuerfe** eine Haltung waehlen.
 * Diese drei gehoeren nicht dorthin: Sie sind Teil der Signatur, kein
 * Szenenmittel, und ein Entwurf soll sie nicht setzen koennen.
 *
 * **Was sie zeigen, gehoert uns nicht.** Der Folgen-Knopf liegt bei jedem
 * Dienst woanders, als Overlay der App ueber unserem Video. Zeichnen koennen
 * wir ihn nicht, in seine Richtung deuten schon.
 *
 * | Dienst | Knopf | Geste |
 * |---|---|---|
 * | `tiktok` | rechts, mittlere Hoehe | rechter Arm waagerecht nach rechts |
 * | `instagram` | unten links | linker Arm nach links, leicht gesenkt |
 * | `youtube` | unten Mitte | linker Arm nach unten |
 *
 * **Es ist eine Richtung, kein Zielen.** Unser Video ist 9:16, die Geraete
 * sind hoeher, und die Apps schneiden oder rahmen verschieden. Wo der Knopf
 * relativ zu unserem Bildinhalt landet, haengt am Geraet — „nach rechts"
 * ueberlebt das, ein Pfeil auf einen Punkt nicht.
 *
 * Der Blick geht mit: `blick` ist ein Versatz der Pupille in SVG-Konvention,
 * x positiv nach rechts, y positiv nach unten.
 */
export const FOLGEPOSEN = {
  /*
   * Die Winkel sind beim ersten Standbild **verdoppelt** worden. Mit -46 und
   * +22 Grad sahen die drei Fassungen fast gleich aus: Der Arm haengt in der
   * Ruhelage schon schraeg nach aussen, und eine Drehung um zwanzig Grad
   * verschwindet darin. Erst ab rund siebzig Grad steht er waagerecht und die
   * Geste ist als Zeigen zu lesen — dieselbe Groessenordnung wie bei `zeigen`
   * (-68).
   */
  tiktok: p({
    drehung: { oberarm_rechts: -74, unterarm_rechts: -14, koerper: 6 },
    blick: [3, 0.2],
    mund: 'laecheln',
  }),
  instagram: p({
    drehung: { oberarm_links: 46, unterarm_links: 14, koerper: -6 },
    blick: [-3, 1.4],
    mund: 'laecheln',
  }),
  /*
   * **Der Unterarm dreht hier nicht mit.** Im ersten Anlauf stand er auf -22,
   * und zusammen mit einem Oberarm auf -34 klappte der ganze Arm vor die
   * Brust: Beide Vorzeichen drehen zum Koerper hin, und in der Ruhelage haengt
   * der Arm ohnehin schon schraeg nach innen-unten.
   *
   * Der Knopf sitzt bei YouTube tiefer und weniger weit links als bei
   * Instagram. Den Unterschied traegt vor allem der **Blick** — zwei Arme, die
   * sich um zwanzig Grad unterscheiden, sieht im Feed niemand.
   */
  youtube: p({
    drehung: { oberarm_links: 20, unterarm_links: 8, koerper: -4 },
    blick: [-1, 2.9],
    mund: 'laecheln',
  }),
} as const;

/**
 * Prueft, dass jede Pose nur Gelenke nennt, die es im Rig gibt.
 *
 * Ein Tippfehler in einem Gelenknamen ist sonst unsichtbar: Der Renderer
 * schlaegt ihn nach, findet nichts und zeichnet die Ruhelage. Die Figur wirkt
 * dann steif, und niemand sucht die Ursache in einem Buchstaben.
 */
export const posenPruefen = (rig: Rig): string[] => {
  const bekannt = new Set(Object.keys(rig.gelenke));
  const befunde: string[] = [];

  for (const [name, pose] of [...Object.entries(POSEN), ...Object.entries(FOLGEPOSEN)]) {
    for (const id of Object.keys(pose.drehung)) {
      if (!bekannt.has(id)) befunde.push(`Pose „${name}" dreht „${id}" — kein Gelenk im Rig.`);
    }
    for (const id of Object.keys(pose.stauchung)) {
      if (!bekannt.has(id)) befunde.push(`Pose „${name}" staucht „${id}" — kein Gelenk im Rig.`);
    }
  }

  return befunde;
};
