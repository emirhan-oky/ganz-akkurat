import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { FARBEN, SCHRIFT } from '../../src/marke';
import type {
  Buehnenbild as BuehnenbildDaten,
  KontextArt,
  Sprecher,
  Untertitelwort,
} from '../../src/typen';
import { FIGURENNAMEN } from '../../src/typen';
import type { Pose, PosenName } from '../../src/figur';
import { nachleser } from '../../daten/figur/nachleser';
import { zeiger } from '../../daten/figur/zeiger';
import { Figur } from './Figur';
import { Symbole } from './Geraete';
import { Kamera } from './Kamera';
import { poseAus } from './posen';
import { Blatt } from './Requisiten';
import { atemvolumen, gewicht } from './bewegung';
import { useSprechsekunde, useSprecher, useSprechstaerke, useWoerter } from './Sprecherstand';

/**
 * Die Buehne einer Szene: was im Bild **passiert**.
 *
 * Sie ist der Nachfolger von `symbol`, und der Unterschied ist der ganze
 * Punkt. Ein Symbol steht unter dem Satz und tut nichts — im Standbild vom
 * 20.08.2026 war das eine graue Lupe neben „Beim BSI heisst das
 * Wasserzeichen". Eine Buehne fuehrt vor.
 *
 * Der Befund dazu steht am Schema in `src/typen.ts`: Neun von zwoelf
 * vermessenen viralen Tech-Shorts leben von einer Vorfuehrung. Wir haben
 * nichts vorzufuehren, also muss die Zeichnung es tun.
 *
 * ## Alles laeuft ueber den Fortschritt
 *
 * Die Buehne rechnet nicht in Sekunden, sondern in einem Anteil von 0 bis 1
 * ueber die Szenenlaenge. Das ist dieselbe Ueberlegung wie bei
 * `auftrittImSprechrhythmus` in `bewegung.ts`: Wer feste Sekunden rechnet,
 * baut einen Fehler ein, der erst nach der Vertonung sichtbar wird — die
 * Bewegung ist nach drei Sekunden durch, die Stimme redet noch neun weitere,
 * und das Bild steht still.
 */

/*
 * ## Hier stand `BUEHNENBILD_GROESSE = 620`
 *
 * Eine exportierte Konstante, die niemand las: `video/szenen/index.tsx` setzte
 * stattdessen `minHeight: 340`. Der Versuch, sie anzuschliessen, hat gezeigt,
 * warum sie nie funktionieren konnte — eine feste Untergrenze weiss nicht, ob
 * der Satz darueber zwei Zeilen braucht oder drei, und bei drei laeuft die
 * Buehne in den Text hinein.
 *
 * Der Platz kommt jetzt aus dem Layout: Der Text nimmt sich, was er braucht,
 * die Buehne bekommt den Rest und fuellt ihn ganz aus. Deshalb steht hier eine
 * Begruendung statt einer Zahl.
 */

/**
 * Wo die Figur steht, wie gross sie ist und wohin die Kamera faehrt.
 *
 * Die drei haengen zusammen und werden deshalb an einer Stelle entschieden.
 * Vorher standen sie verstreut: die Verschiebung am `<g>`, die Standflaeche
 * daneben, das Kameraziel weiter oben — und jede Aenderung an einer der drei
 * hat die anderen beiden stillschweigend falsch gemacht.
 *
 * Der Bezugspunkt ist immer der Boden bei (100 | 140). Eine Figur, die um
 * ihren Mittelpunkt skaliert, schwebt oder versinkt; eine, die um ihre
 * Standlinie skaliert, wird kleiner und bleibt stehen.
 */
const PLAETZE = {
  /** Allein auf der Buehne, mittig, ganze Groesse. */
  mitte: { x: 100, groesse: 1, ziel: { x: 100, y: 80, zoom: 1.24 } },
  /**
   * Links, damit rechts ein Symbol Platz hat.
   *
   * **Zwei Kameraziele, seit dem 25.08.2026.** Steht ein Symbol daneben, muss
   * die Kamera es mitfassen — und das tat sie nicht:
   *
   * | | Wert |
   * |---|---|
   * | Symbol im Raum | x = 112 bis 192, sichtbar gezeichnet bis ~176 |
   * | Kamera zielte auf | x = 84, Zoom 1,16 |
   * | sichtbares Feld | 200 / 1,16 = 172 breit → x = −2 bis **170** |
   *
   * Die rechten Einheiten des Symbols lagen also ausserhalb. Im fertigen Video
   * war das Schild angeschnitten und gegen Szenenende ganz verschwunden.
   *
   * **Der erste Anlauf verschob nur das Ziel und war damit falsch.** Bei
   * x = 102 und unveraendertem Zoom endete das Feld links bei x = 15,8 — und
   * die Figur reicht in `achselzucken` mit abstehenden Armen bis x = 15. Der
   * Fehler war nur von rechts nach links gewandert.
   *
   * Beides zusammen passt erst mit **weniger Zoom**. Was ins Feld muss:
   *
   * | | von | bis |
   * |---|---|---|
   * | Figur, Arme abstehend | 15 | 90 |
   * | Symbol, gezeichnet | 112 | 176 |
   * | **zusammen** | **15** | **176** |
   *
   * Das sind 161 Einheiten Breite, Mitte 95,5. Bei Zoom 1,10 ist das Feld
   * 182 breit und reicht von x = 5 bis 187 — gut zehn Einheiten Rand auf
   * jeder Seite. Bei 1,16 waeren es 172, und die Rechnung ginge nicht auf.
   *
   * Die Kamera kommt damit weniger nah heran, und das ist der Preis: Wer zwei
   * Dinge zeigt, kann nicht so dicht heran wie bei einem.
   */
  links: {
    x: 52,
    groesse: 1,
    ziel: { x: 84, y: 82, zoom: 1.16 },
    zielMitSymbol: { x: 96, y: 82, zoom: 1.1 },
  },
  /** Rechts — dasselbe gespiegelt, fuer Abwechslung ueber mehrere Szenen. */
  rechts: { x: 138, groesse: 1, ziel: { x: 112, y: 82, zoom: 1.16 } },
  /**
   * Klein am unteren Rand. Die Kamera bleibt weit und zeigt den Raum ueber
   * ihr — sonst waere die Figur klein **und** formatfuellend, also nur eine
   * schlecht aufgeloeste grosse Figur.
   */
  klein: { x: 46, groesse: 0.52, ziel: { x: 100, y: 84, zoom: 1.06 } },
} as const;

/**
 * Die beiden Plaetze im Wortwechsel, seit dem 25.08.2026.
 *
 * Sie stehen ausserhalb von `PLAETZE`, weil `stand` sie nicht waehlen kann:
 * Wer ein Gegenueber hat, hat keine Wahl mehr, wo er steht.
 *
 * **116 Einheiten Abstand, in zwei Schritten erarbeitet.** Der erste Anlauf
 * rechnete mit 76 und der Figur in Ruhe — die Koerper ueberlappten. Der zweite
 * mit 100 und `achselzucken`, der breitesten Pose — da lag der Rumpf frei, aber
 * **`erklaeren` greift weiter als er breit ist**: Im Standbild lag Voltis Hand
 * auf Wattis Brust.
 *
 * Gerechnet wird also nicht mit der breitesten Pose, sondern mit der
 * **weitesten**: `erklaeren` und `zeigen` strecken einen Arm bis x = 106 im
 * eigenen Raum, also 6 Einheiten ueber die Mitte hinaus. Derselbe Fehler wie
 * am 24.08.2026 beim Symbolabstand, nur eine Ebene feiner.
 *
 * **Die Kamera bleibt weit.** `ziel` liegt bei Zoom 1,06 statt 1,24 — der
 * Kommentar an `links` sagt warum: „Wer zwei Dinge zeigt, kann nicht so dicht
 * heran wie bei einem." Bei zwei Figuren gilt das doppelt.
 */
export type Wortwechselstand = {
  /** Mittelpunkt der linken Figur in Buehneneinheiten. */
  links: number;
  /** Mittelpunkt der rechten Figur. */
  rechts: number;
  /** Groesse beider Figuren, um die Standlinie skaliert. 1 ist volle Groesse. */
  groesse: number;
  ziel: { x: number; y: number; zoom: number };
};

/**
 * Halbe Figurenbreite in Ruhe, aus dem Rig abgelesen.
 *
 * Die aeussersten Punkte sind die **Saumhaende** — Kreise mit r = 8 um
 * cx = 56 und cx = 144 (`daten/figur/nachleser.ts`). Also 48 bis 152, Mitte
 * 100, halbe Breite 52.
 *
 * **Das ist die Ruhepose.** `erklaeren` und `zeigen` strecken einen Arm bis
 * x = 106 im eigenen Raum, greifen also ueber die Mitte statt nach aussen —
 * fuer die Aussenkante bleibt 52 der richtige Wert, fuer die Luecke in der
 * Mitte nicht.
 */
export const FIGUR_HALBBREITE = 52;

/**
 * Was von einer Anordnung sichtbar bleibt.
 *
 * **Gerechnet, nicht geschaetzt**, und zwar weil die Schaetzung am 31.08.2026
 * falsch war: Bei `links: 42`, `rechts: 158`, voller Groesse und Zoom 1,06 lag
 * Voltis linke Kante bei −10 und Wattis rechte bei 220, waehrend das sichtbare
 * Feld von 5,7 bis 194,3 reicht. **Beide verloren ihre aeussere Hand**, und
 * gleichzeitig blieben in der Mitte zwei Einheiten Luft. Mehr Abstand haette
 * das eine verschlimmert, um das andere zu loesen.
 *
 * Der fehlende Freiheitsgrad war die **Groesse**. Diese Funktion macht ihn
 * ablesbar, statt ihn wieder zu raten.
 */
export const wortwechselKanten = (
  w: Wortwechselstand,
  /**
   * Wie weit die Posen nach aussen reichen. Ohne Angabe die Ruhepose — und
   * genau das war am 31.08.2026 der Fehler: `achselzucken` reicht 76,7
   * Einheiten nach aussen statt 52, und drei Posen standen deshalb mit
   * abgeschnittenem Arm am Bildrand.
   */
  reichweite: { links?: number; rechts?: number } = {},
) => {
  const feldHalb = 100 / w.ziel.zoom;
  const feld = { von: w.ziel.x - feldHalb, bis: w.ziel.x + feldHalb };
  /*
   * **Beide Seiten gleich, seit die Stauchung weg ist.**
   *
   * Hier stand bis zum 31.08.2026 links eine andere Rechnung als rechts, weil
   * Watti gestaucht und damit ein Fuenftel breiter war. Zweimal ist daran
   * etwas schiefgegangen: Erst fehlte der Faktor rechts und Watti ragte mit
   * einem Viertel seiner Breite aus dem Bild, dann galt er fuer beide und die
   * Figuren mussten dafuer schrumpfen. Ohne Stauchung ist die Rechnung wieder
   * eine.
   */
  const halbLinks = (reichweite.links ?? FIGUR_HALBBREITE) * w.groesse;
  const halbRechts = (reichweite.rechts ?? FIGUR_HALBBREITE) * w.groesse;
  return {
    feld,
    /** Aeussere Kante der linken Figur. Muss >= feld.von bleiben. */
    linksAussen: w.links - halbLinks,
    /** Aeussere Kante der rechten Figur. Muss <= feld.bis bleiben. */
    rechtsAussen: w.rechts + halbRechts,
    /**
     * Luft zwischen den beiden Gehaeusen — **immer mit der Ruhebreite**, auch
     * wenn aussen eine Pose gerechnet wird. Was zur Mitte greift, ist eine
     * andere Frage als was nach aussen ragt, und `Wortwechselstaende` misst
     * sie an `erklaeren` gegen `zeigen`.
     */
    luecke: w.rechts - w.links - 2 * FIGUR_HALBBREITE * w.groesse,
  };
};

/**
 * Welche Posen bei einer Anordnung aus dem Bild ragen.
 *
 * **Die Sperre folgt damit aus einer Zahl statt aus einer Liste.** Vorher
 * standen drei Posennamen in `src/pruefung.ts`, aus einem Standbild
 * geschlossen; sie fielen am 31.08.2026, als die Luecke wuchs — und drei
 * andere rissen dafuer den Bildrand, ohne dass etwas meldete.
 *
 * Wer die Anordnung aendert, aendert diese Liste mit. Das ist der ganze Punkt.
 */
export const zuBreiteWortwechselposen = (
  w: Wortwechselstand,
  reichweiten: Record<string, number>,
): string[] =>
  Object.entries(reichweiten)
    .filter(([, r]) => {
      const k = wortwechselKanten(w, { links: r, rechts: r });
      return k.linksAussen < k.feld.von || k.rechtsAussen > k.feld.bis;
    })
    .map(([name]) => name);

/**
 * Die laufende Anordnung.
 *
 * **Symmetrisch, seit die Stauchung weg ist.** Sie war es nie: Solange eine der
 * beiden Figuren ein Fuenftel breiter war, mussten die Standpunkte das
 * ausgleichen.
 *
 * ## Der Weg zu 0,73 — drei Messungen an einem Tag
 *
 * | Stand | Anordnung | Luecke | Hoehe im Bild |
 * |---|---|---|---|
 * | bis 31.08. frueh | 42/158, voll, gestaucht rechts | 1,6 | 84 / 150 |
 * | 31.08. vormittags | 45/146, 0,70 | 20,9 | 84 / 150 |
 * | 31.08. abends | 49/151, 0,62, **beide** gestaucht | 24,6 | **55 / 150** |
 * | **seither** | **50/150, 0,73, keine Stauchung** | **24,1** | **88 / 150** |
 *
 * Der dritte Schritt war der Fehler: Zwei breite Figuren brauchen mehr Buehne,
 * also musste jede kleiner werden — und „klein und dickfoermig" war das
 * Urteil. Ohne Stauchung stehen beide auf 88 von 150 Einheiten, **groesser als
 * Volti je war**, weil vorher Wattis Breite die Grenze setzte.
 *
 * ## Was die Groesse begrenzt
 *
 * Zwei Bedingungen gleichzeitig, beide gerechnet aus `AUSSENREICHWEITE`:
 *
 * - **nach aussen** — `staunen` reicht 63,9 Einheiten, muss also innerhalb des
 *   Feldes bleiben. Das deckelt bei rund 0,77.
 * - **zur Mitte** — `erklaeren` gegen `zeigen` greift von beiden Seiten
 *   19,9 Einheiten in die Luecke. Bei 0,75 waeren es 20,4 gegen 20,0 Luecke,
 *   also Beruehrung.
 *
 * Bei 0,73 bleiben vier Einheiten Luft. **Und dieser Fall ist erlaubt** —
 * eine Regel gegen „beide greifen gleichzeitig aus" gibt es nicht, obwohl ein
 * Kommentar das bis zum 31.08.2026 behauptet hat.
 */
export const WORTWECHSEL: Wortwechselstand = {
  links: 50,
  rechts: 150,
  groesse: 0.73,
  ziel: { x: 100, y: 84, zoom: 1.0 },
};

/**
 * Die Transformationskette einer Wortwechselfigur.
 *
 * **Die Reihenfolge ist die ganze Rechnung**, und sie liest sich von rechts
 * nach links: erst um die Standlinie (100 | 140) skalieren, dann spiegeln,
 * dann an den Platz schieben.
 *
 * - **Skalieren um die Standlinie**, nicht um die Mitte. Eine Figur, die um
 *   ihren Mittelpunkt skaliert, schwebt oder versinkt — derselbe Grund, aus
 *   dem `platzVon` fuer `PLAETZE.klein` dieselbe Kette rechnet.
 * - **Gespiegelt wird um x = 100**, also um die eigene Mitte im Figurenraum,
 *   und erst danach verschoben. Die umgekehrte Reihenfolge klappte die Figur
 *   ueber den Buehnenrand.
 *
 * Skalierung und Spiegelung halten beide x = 100 fest, sie vertragen sich
 * also in jeder Reihenfolge; nur das Verschieben muss zuletzt kommen.
 */
export const wortwechselTransform = (w: Wortwechselstand, seite: 'links' | 'rechts'): string => {
  const um = `translate(100 140) scale(${w.groesse}) translate(-100 -140)`;
  return seite === 'links'
    ? `translate(${w.links - 100} 0) ${um}`
    : `translate(${w.rechts - 100} 0) translate(100 0) scale(-1 1) translate(-100 0) ${um}`;
};

const platzVon = (stand: 'mitte' | 'links' | 'rechts' | 'klein', hatSymbol: boolean) => {
  /*
   * Ein Symbol daneben braucht die rechte Haelfte — es steht fest bei x = 138.
   * `mitte` weicht deshalb nach links aus, statt sich mit ihm zu ueberlagern.
   *
   * **`rechts` ebenso, seit dem 24.08.2026.** Vorher setzte es die Figur auf
   * genau dieselben x = 138 wie das Symbol, und im fertigen Video stand der
   * Stempel hinter der Figur: Beine und Rumpf lagen darueber. Aufgefallen ist
   * es dem Zuschauer, nicht der Pruefung — zwei Zeichnungen, die sich
   * ueberlagern, sind fuer ein Skript zwei gueltige Zeichnungen.
   *
   * Das Umbiegen hier ist das Sicherheitsnetz. Der eigentliche Ort der Regel
   * ist das Schema, das `stand: 'rechts'` zusammen mit einem Symbol ablehnt —
   * dort faellt es beim Schreiben auf und nicht erst im Bild. Gespiegelt wird
   * nicht: Die Posen zeigen und greifen nach rechts, ein Symbol links davon
   * stuende hinter ihrem Ruecken.
   */
  const name = (stand === 'mitte' || stand === 'rechts') && hatSymbol ? 'links' : stand;
  const p = PLAETZE[name];
  const verschiebung = p.x - 100;
  return {
    x: p.x,
    groesse: p.groesse,
    // Ein Platz darf ein eigenes Ziel fuer den Fall mit Symbol nennen. Wo es
    // fehlt, gilt dasselbe Ziel — dort passt das Symbol ohnehin ins Feld.
    ziel: hatSymbol && 'zielMitSymbol' in p ? p.zielMitSymbol : p.ziel,
    transform:
      p.groesse === 1
        ? verschiebung === 0
          ? undefined
          : `translate(${verschiebung} 0)`
        : `translate(${verschiebung} 0) translate(100 140) scale(${p.groesse}) translate(-100 -140)`,
  };
};

/**
 * Wann die Uebergaenge einer Posenkette beginnen.
 *
 * Sie liegen zwischen 40 % und 90 % der Szene. Bei genau einem Uebergang
 * ergibt die Rechnung wieder 40 % — das bisherige Verhalten bleibt also
 * unveraendert, und der Grund dafuer gilt weiter: Am Anfang laege der
 * Uebergang vor dem Satz, der ihn ausloest.
 */
const uebergangsstarts = (stationen: number, dauer: number): number[] => {
  const uebergaenge = Math.max(1, stationen - 1);
  return Array.from({ length: uebergaenge }, (_, i) =>
    Math.round(dauer * (0.4 + (i * 0.5) / uebergaenge)),
  );
};

/** Die Haltung, die zu diesem Bild gehoert — der letzte begonnene Abschnitt. */
const poseDerKette = (
  kette: readonly PosenName[],
  starts: readonly number[],
  frame: number,
  fps: number,
  /**
   * Welche der beiden Figuren das ist — 0 oder 1.
   *
   * **Er fehlte hier, und das war ein stiller Fehler.** `poseAus` nimmt einen
   * `versatz` und verschiebt damit Atem und Blinzeln gegeneinander; die Kette
   * hat ihn nie weitergereicht, also stand fuer beide Figuren die 0. Die Folge
   * war im fertigen Video zu sehen, ohne dass jemand sie benennen konnte:
   * **Beide blinzelten im selben Bild und atmeten im selben Takt.** Zwei
   * Figuren, die exakt gleich atmen, sind nicht zwei Figuren, sondern ein
   * Objekt, das zweimal gezeichnet wurde.
   *
   * `gewicht` und `atemvolumen` bekamen den Versatz die ganze Zeit — nur die
   * Kette nicht. Eine halbe Kopplung ist schwerer zu sehen als gar keine.
   */
  versatz = 0,
) => {
  let abschnitt = 0;
  starts.forEach((start, i) => {
    if (frame >= start) abschnitt = i;
  });
  return poseAus({
    frame,
    fps,
    pose: kette[abschnitt + 1] ?? kette[kette.length - 1]!,
    vorherigePose: kette[abschnitt] ?? kette[0]!,
    abBild: starts[abschnitt] ?? 0,
    versatz,
  });
};

/* ──────────────────────────── Sprechbewegung ─────────────────────────── */

/**
 * Was eine Figur tut, waehrend sie redet — und was die andere tut, waehrend
 * sie zuhoert.
 *
 * ## Der Befund
 *
 * „Er macht staendig immer nur dieselben Bewegungen" stand schon im August im
 * Zuschauerfeedback, und die Antwort damals war mehr Posen je Szene. Am
 * 31.08.2026 kam derselbe Vorwurf zurueck, jetzt fuer zwei Figuren. Diesmal
 * mit einer Zahl dahinter: Eine Pose ist ein **Standbild**, zwei bis vier je
 * Szene, dazwischen ein Uebergang. Waehrend eine Figur zehn Sekunden redet,
 * bewegt sie sich zweimal — und atmet.
 *
 * **Was fehlte, war nicht mehr Vokabular, sondern ein Auslöser.** Den gibt es
 * seit dem 31.08.2026: `tonspur.abschnitte` sagt Bild fuer Bild, wer spricht
 * (siehe `Sprecherstand.tsx`). Vorher konnte keine Bewegung an der Rede
 * haengen, weil das Bild von der Rede nichts wusste.
 *
 * ## Drei Sachen, und die erste ist die wichtigste
 *
 * 1. **Blickkontakt.** Beide Pupillen wandern zur Mitte, also zur anderen
 *    Figur. Das ist der Unterschied zwischen zwei Figuren, die abwechselnd
 *    sprechen, und zweien, die sich unterhalten — und es kostet zwei
 *    Buehneneinheiten.
 *
 *    Die rechte Figur ist gespiegelt (`scale(-1 1)`), in ihrem eigenen Raum
 *    zeigt „zur Mitte" deshalb in dieselbe Richtung wie links. **Derselbe
 *    Wert fuer beide** — kein Vorzeichen, das man verwechseln kann.
 *
 * 2. **Der Mund bewegt sich, solange die Figur dran ist.** Ein harter Wechsel
 *    zwischen `offen` und der Mundform der Pose, kein Uebergang: Der Stil ist
 *    flache Vektorgrafik, und eine Zwischenform gibt es im Rig nicht.
 *
 * 3. **Leichtes Wippen** ueber `hub`, zusaetzlich zum Atmen. Wer spricht,
 *    steht nicht still.
 *
 * ## Was das nicht ist
 *
 * **Kein Lippensync.** Die Wortzeitstempel laegen vor, aber ein Mund, der
 * einzelnen Silben folgt, braucht mehr Mundformen als fuenf.
 *
 * ## Warum zwei Frequenzen und nicht eine
 *
 * Der erste Anlauf war ein einzelner Sinus bei 2,6 Hz. Nachgemessen an der
 * Ausgabe: fuenf bis sechs Bilder offen, fuenf bis sechs zu, **drei
 * verschiedene Abschnittslaengen auf 52 Abschnitte** — ein Metronom. Und damit
 * genau die Schablone, gegen die der ganze Umbau laeuft; „sie bewegen sich
 * staendig gleich" waere danach wieder wahr gewesen, nur schneller.
 *
 * Zwei ueberlagerte Sinus mit einem krummen Frequenzverhaeltnis (2,6 und
 * 4,1 Hz) ergeben ein Muster, das sich ueber die Laenge eines Shorts nicht
 * wiederholt. Das kostet eine Zeile und **keine Zufallszahl** — bildgetrieben
 * muss es bleiben, sonst rendert derselbe Short zweimal verschieden.
 *
 * Die Schwelle liegt bei −0,15 statt bei 0: Beim Reden ist der Mund haeufiger
 * offen als zu.
 *
 * ## Was das nicht kann
 *
 * In den 0,28 bis 0,32 Sekunden Pause zwischen zwei Abschnitten klappert der
 * Mund weiter: `sprecherZu` haelt dort den vorigen Sprecher, damit der Name
 * nicht blinkt. Das ist unter einer Zehntelsekunde sichtbar und der Preis
 * dafuer, dass der Name ruhig steht.
 */
/**
 * Wie weit der Sprechende sich zum anderen hinlehnt.
 *
 * ## Der Ersatz fuer eine Kamerafahrt
 *
 * Geplant war am 31.08.2026 eine Kamera, die dem Sprecher folgt. Sie ist an der
 * Geometrie gescheitert, und die Rechnung gehoert hierher, damit sie niemand
 * zweimal anstellt: Bei der laufenden Anordnung bleiben **1,5 Einheiten**
 * Luft, bis eine Figur anschneidet. Ein sichtbarer Schwenk von zehn Einheiten
 * braucht `groesse` 0,55 statt 0,62 — elf Prozent kleinere Figuren fuer eine
 * Kamerabewegung, und kleiner sollen sie gerade nicht werden.
 *
 * ## Warum das Hinlehnen in dieselbe Luecke passt
 *
 * **Weil es nach innen geht.** Der Koerper dreht um die Standlinie; wer sich
 * zum Gegenueber neigt, zieht seinen **aeusseren** Arm mit hinein. Bei 1,5 Grad
 * wandert die weiteste Hand rund 1,7 Einheiten nach innen — der Abstand zum
 * Bildrand waechst, statt zu schrumpfen.
 *
 * Und das Vorzeichen stimmt fuer beide, ohne Fallunterscheidung: Die rechte
 * Figur ist gespiegelt, also zeigt derselbe Winkel in ihrem eigenen Raum nach
 * derselben Seite und auf der Buehne zur Mitte.
 *
 * `winkelKlemmen` deckelt bei 9 Grad. `stutzen` steht auf 8 und verliert damit
 * einen halben Grad seiner Neigung — sichtbar ist das nicht, und die Grenze
 * ist begruendet: „Ein um vierzehn Grad gekippter Akku ist ein umfallender
 * Akku."
 */
const HINLEHNEN = 1.5;

const SPRECH_HZ = 2.6;
const SPRECH_HZ_ZWEIT = 4.1;
const MUND_SCHWELLE = -0.15;
const BLICK_ZUR_MITTE = 2;

/**
 * Alles, was einer Figur je Bild widerfaehrt — ueber ihre Pose hinaus.
 *
 * **Eine Stelle statt dreier.** Gewichtsverlagerung, Atemvolumen und
 * Sprechbewegung greifen alle in dieselbe Pose, und zwar in verschiedene
 * Felder: die eine in `drehung`, die andere in `stauchung`/`dehnung`, die
 * dritte in `blick`, `mund` und `hub`. Getrennt aufgerufen muesste jede
 * Aufrufstelle das Zusammenlegen selbst schreiben — und es gibt zwei davon, je
 * eine Figur.
 *
 * `versatz` verschiebt Wiegen und Atmen der beiden Figuren gegeneinander.
 * Ohne ihn atmen sie im Gleichschritt, und zwei Figuren, die synchron atmen,
 * sind eine Figur in zwei Farben.
 */
const figurenbewegung = (
  pose: Pose,
  {
    staerke,
    versatz,
    frame,
    fps,
    woerter,
    sekunde,
  }: {
    /** Wie stark diese Figur spricht: 0 bis 1, ueberblendet am Wechsel. */
    staerke: number;
    versatz: number;
    frame: number;
    fps: number;
    woerter?: readonly Untertitelwort[];
    /** Sekunde seit **Videostart**, nicht seit Szenenstart. */
    sekunde: number;
  },
): Pose => {
  const g = gewicht(frame, fps, versatz);
  const atem = atemvolumen(frame, fps, versatz);
  /*
   * **Der Sinus ist der Rueckfall, nicht die Regel.** Mit Tonspur klappt der
   * Mund zur Silbe; ohne — in jeder Probe, jedem Standbild, jeder Vorschau
   * ohne Ton — bleibt die zweifrequente Bewegung, die wenigstens nicht nach
   * Metronom aussieht.
   */
  const geredet = sprechbewegung(pose, staerke, frame, fps);
  const synchron = staerke > 0.5 && woerter ? lippensync(sekunde, woerter) : undefined;
  /*
   * Blickkontakt und Wippen bleiben in jedem Fall — nur der **Mund** wechselt
   * die Quelle. Mit Wortzeitstempeln klappt er zur Silbe, ohne bleibt der
   * Sinus, der wenigstens nicht nach Metronom aussieht.
   */
  const geredetSynchron = woerter ? { ...geredet, mund: synchron ?? pose.mund } : geredet;
  return {
    ...geredetSynchron,
    drehung: {
      ...geredetSynchron.drehung,
      ...g,
      koerper: (geredetSynchron.drehung.koerper ?? 0) + g.koerper + HINLEHNEN * staerke,
    },
    stauchung: { ...geredetSynchron.stauchung, ...atem.stauchung },
    dehnung: { ...geredetSynchron.dehnung, ...atem.dehnung },
  };
};

/**
 * Der Mund zur gesprochenen Silbe — **Lippensync aus den Wortzeitstempeln.**
 *
 * ## Warum das ohne neue Daten geht
 *
 * `tonspur.woerter` traegt seit dem ersten zweistimmigen Lauf Anfang und Ende
 * **jedes Wortes**, aus der Zeichenausrichtung von ElevenLabs. An
 * `ersatzteil-freischalten` gemessen: 76 Woerter, zusammen 23,7 von 32,1
 * Sekunden — **ein Viertel der Laufzeit sind Luecken zwischen Woertern**, und
 * in denen gehoerte der Mund bisher trotzdem geklappt. Allein das Schweigen
 * dort ist sichtbarer Sync.
 *
 * ## Die Silben kommen aus dem Wort selbst
 *
 * Zeitstempel je Laut gibt es nicht, den **Wortlaut** aber schon. Die
 * Vokalgruppen eines Wortes sind eine brauchbare Silbenschaetzung:
 * „Ersatzteil" hat drei, „Amtsblatt" zwei. Gemessen ergibt das 60 bis 340
 * Millisekunden je Oeffnung, bei 30 Bildern also 2 bis 10 Bilder — genau der
 * Bereich, in dem eine Mundbewegung als Sprechen liest und nicht als Flackern.
 *
 * ## Zwei Fallen, beide gemessen
 *
 * **Satzschluss-Woerter tragen ihre Nachlaufstille im Zeitstempel** — `passt.`
 * dauert 720 ms bei einer einzigen Vokalgruppe. Die Oeffnung sitzt deshalb am
 * **Anfang** ihres Abschnitts und ist bei `OEFFNUNG_MAX_SEK` gedeckelt; sonst
 * stuende der Mund am Satzende weit offen.
 *
 * **Und der Vokal waehlt die Form.** Ein Mund, der zwischen zu und immer
 * derselben Ellipse springt, klappert. Offene Vokale bekommen `weit`,
 * geschlossene `spalt` — drei Stufen sind fuer eine flache Vektorfigur das
 * ganze Vokabular. Lippensync auf Lautebene braeuchte Formen je Phonem.
 */
const OEFFNUNG_MAX_SEK = 0.18;
const OEFFNUNG_ANTEIL = 0.7;

const VOKALFORM: Record<string, Pose['mund']> = {
  a: 'weit', ä: 'weit', o: 'weit', å: 'weit',
  e: 'offen', ö: 'offen',
  i: 'spalt', u: 'spalt', ü: 'spalt', y: 'spalt',
};

export const lippensync = (
  sekunde: number,
  woerter: readonly Untertitelwort[],
): Pose['mund'] | undefined => {
  const wort = woerter.find((w) => sekunde >= w.startSek && sekunde < w.endeSek);
  if (wort === undefined) return undefined;

  const gruppen = wort.wort.toLowerCase().match(/[aeiouäöüy]+/g) ?? [];
  if (gruppen.length === 0) return undefined;

  const dauer = wort.endeSek - wort.startSek;
  const schritt = dauer / gruppen.length;
  const i = Math.min(gruppen.length - 1, Math.floor((sekunde - wort.startSek) / schritt));
  const seit = sekunde - wort.startSek - i * schritt;
  if (seit > Math.min(schritt * OEFFNUNG_ANTEIL, OEFFNUNG_MAX_SEK)) return undefined;

  return VOKALFORM[gruppen[i]![0]!] ?? 'offen';
};

export const sprechbewegung = (pose: Pose, staerke: number, frame: number, fps: number): Pose => {
  const sek = frame / fps;
  const takt =
    (Math.sin(sek * SPRECH_HZ * 2 * Math.PI) +
      0.6 * Math.sin(sek * SPRECH_HZ_ZWEIT * 2 * Math.PI + 1.3)) /
    1.6;
  return {
    ...pose,
    /*
     * Additiv, nicht ersetzend: `hochschauen` und `nachdenken` setzen einen
     * eigenen Blick, und der soll erhalten bleiben. Zwei Einheiten obendrauf
     * heissen „schaut hin", nicht „schaut nur noch dorthin".
     */
    blick: [pose.blick[0] + BLICK_ZUR_MITTE * staerke, pose.blick[1]],
    /* Der Mund bleibt ein Ja/Nein — ein halb offener Mund ist keine Silbe.
       Ab der halben Staerke gilt die Figur als sprechend. */
    mund: staerke > 0.5 && takt > MUND_SCHWELLE ? 'offen' : pose.mund,
    hub: pose.hub + takt * 0.6 * staerke,
  };
};

/* ───────────────────────────── Namensschild ──────────────────────────── */

/**
 * Der Name ueber der Figur — `(Volti)` und `(Watti)`.
 *
 * ## Warum er im SVG steht und nicht in HTML
 *
 * Er haengt an der Figurenposition und muss mit der Kamera mitfahren. Ein
 * HTML-Etikett braeuchte dafuer eine Umrechnung zwischen Buehnenraum und
 * Pixelraum — genau die Kopplung, an der die Symbolposition dreimal
 * gescheitert ist und derentwegen die Sprechblase bewusst **keinen** Zipfel
 * hatte.
 *
 * ## Warum beide dauerhaft stehen
 *
 * Seit dem 31.08.2026 traegt der Name allein die Zuordnung: Die Sprechblase
 * ist weg, unten steht bei zwei Stimmen kein Text mehr. Ein Name, der nur beim
 * Sprechen erscheint, blitzte in jeder Atempause weg und saehe nach Fehler
 * aus. **Beide stehen, der Sprechende leuchtet** in seiner Kennfarbe, der
 * andere bleibt blass.
 *
 * Ohne Tonspur — im Standbild, in der Vorschau, in jeder Probe — ist niemand
 * der Sprecher, und dann stehen beide gleich hell. Ein willkuerlich gewaehlter
 * Sprecher waere eine Behauptung ueber eine Tonspur, die es nicht gibt.
 *
 * ## Die Klammern
 *
 * Sie tragen den technischen Look, den `SCHRIFT.familie` (Playfair Display
 * kursiv) nicht hergibt. Gesetzt wird deshalb in `SCHRIFT.wortmarke` — Inter,
 * ohnehin geladen, weil sie die Wortmarke traegt. Eine dritte Schrift zu laden
 * waere ein Ladeschritt fuer zwei Woerter.
 */
const NAMENSHOEHE = {
  /** Oberkante des Gehaeuses im Figurenraum: das Pluspol-Rechteck bei y = 20. */
  kopf: 20,
  /** Luft zwischen Kopf und Grundlinie der Schrift. */
  luft: 7,
  groesse: 9,
} as const;

const Namensschild: React.FC<{
  wer: Sprecher;
  x: number;
  groesse: number;
  /** 0 bis 1 statt ja oder nein — siehe `sprechstaerke` in `Sprecherstand.tsx`. */
  staerke: number;
}> = ({ wer, x, groesse, staerke }) => {
  /*
   * Die Oberkante wandert mit der Wortwechselgroesse, um die Standlinie bei
   * y = 140 — dieselbe Rechnung wie bei der Figur selbst.
   *
   * Hier stand bis zum 31.08.2026 eine zweite Skalierung fuer Wattis
   * Stauchung. Sie ist mit der Stauchung gegangen; wer nur eine der beiden
   * rechnete, haengte den Namen fuenfundzwanzig Einheiten ueber dem Kopf in
   * der Luft.
   */
  const oben = 140 + (NAMENSHOEHE.kopf - 140) * groesse;
  return (
    <text
      x={x}
      y={oben - NAMENSHOEHE.luft}
      textAnchor="middle"
      fontFamily={SCHRIFT.wortmarke}
      fontSize={NAMENSHOEHE.groesse}
      fontWeight={700}
      letterSpacing={0.6}
      fill={wer === 'zeiger' ? FARBEN.anzeigeZwei : FARBEN.anzeigeEins}
      /* Der Name blendet mit dem Wechsel auf, statt in einem Bild umzuspringen.
         0,32 bleibt die Ruhelage: Der Zuhoerende ist gedaempft, nicht weg. */
      opacity={0.32 + 0.68 * staerke}
    >
      ({FIGURENNAMEN[wer]})
    </text>
  );
};

/* ───────────────────────────── Figurenbuehne ─────────────────────────── */

/**
 * Die Figur geht waehrend der Szene von einer Haltung in eine andere; eine
 * Requisite taucht zur Mitte auf.
 *
 * **Der Uebergang liegt in der Mitte der Szene, nicht am Anfang.** Am Anfang
 * waere er noch vor dem Satz, der ihn ausloest — die Figur reagierte auf etwas,
 * das der Zuschauer noch nicht gehoert hat. In der Mitte faellt er mit dem
 * Moment zusammen, in dem die Stimme die Wendung spricht.
 */
const Figurenbuehne: React.FC<{
  buehne: Extract<BuehnenbildDaten, { art: 'figur' }>;
  dauer: number;
  /**
   * Nur der Prueftisch setzt das. Die Vorgabe ist die laufende Anordnung —
   * eine Prop mit Vorgabewert statt einer Testtuer, damit `Wortwechselprobe`
   * denselben Renderpfad benutzt statt einer zweiten Geometrie daneben.
   */
  stand?: Wortwechselstand;
}> = ({ buehne, dauer, stand = WORTWECHSEL }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Der Uebergang beginnt bei 40 % der Szene. `abBild` verschiebt **nur** ihn;
  // Atmen und Blinzeln laufen ab Bild 0 weiter. Der erste Anlauf uebergab
  // stattdessen `frame - beginn` und verschob damit alles — mit negativen
  // Frames als Folge, die die Augen auf das Einundzwanzigfache streckten.
  /*
   * Seit dem 25.08.2026 kann eine Szene eine **Folge** von Haltungen tragen,
   * nicht nur einen Uebergang. Die Kette ist `[von, ...zwischen, nach]`, also
   * zwei bis vier Stationen und damit ein bis drei Uebergaenge.
   *
   * Sie liegen zwischen 40 % und 90 % der Szene. Bei genau einem Uebergang
   * ergibt die Rechnung wieder 40 % — das bisherige Verhalten bleibt also
   * unveraendert, und der Grund dafuer gilt weiter: Am Anfang laege der
   * Uebergang vor dem Satz, der ihn ausloest.
   */
  const kette = [buehne.von, ...(buehne.zwischen ?? []), buehne.nach];
  const starts = uebergangsstarts(kette.length, dauer);
  const beginn = starts[0] ?? Math.round(dauer * 0.4);
  const pose = poseDerKette(kette, starts, frame, fps);

  /*
   * Das Gegenueber laeuft auf derselben Zeitachse, aber mit eigener Kette.
   * Beide Figuren wechseln damit **gleichzeitig** die Haltung — das ist
   * gewollt: Ein Wortwechsel ist eine Reaktion, und eine Reaktion faellt mit
   * dem zusammen, worauf sie antwortet.
   */
  const gegenkette = buehne.gegenueber
    ? [buehne.gegenueber.von, ...(buehne.gegenueber.zwischen ?? []), buehne.gegenueber.nach]
    : undefined;
  const gegenstarts = gegenkette ? uebergangsstarts(gegenkette.length, dauer) : [];
  const gegenpose = gegenkette ? poseDerKette(gegenkette, gegenstarts, frame, fps, 1) : undefined;

  // Wer die Posen oben traegt, bekommt sein Rig; das Gegenueber das andere.
  const eigenes = (buehne.wer ?? 'nachleser') === 'zeiger' ? zeiger : nachleser;
  /*
   * Wer gerade spricht — aus dem Context, nicht aus einer Prop. Ohne Tonspur
   * ist es `undefined`, und dann leuchtet keiner der beiden Namen. Siehe
   * `Sprecherstand.tsx`.
   */
  const spricht = useSprecher();
  /*
   * **Die weiche Fassung desselben Standes.** `spricht` sagt, wer dran ist;
   * `staerkeVon` sagt, wie weit der Wechsel schon durch ist. Ohne Tonspur —
   * jede Probe, jedes Standbild ohne Ton — gibt es keinen Wechsel, und dann
   * ist der harte Wert richtig.
   */
  const sprechstaerkeFn = useSprechstaerke();
  const staerkeVon = (rolle: Sprecher) =>
    sprechstaerkeFn ? sprechstaerkeFn(rolle) : spricht === rolle ? 1 : 0;
  const woerter = useWoerter();
  const sekunde = useSprechsekunde();
  const eigeneRolle: Sprecher = eigenes === zeiger ? 'zeiger' : 'nachleser';
  const andereRolle: Sprecher = eigeneRolle === 'zeiger' ? 'nachleser' : 'zeiger';
  const anderes = eigenes === nachleser ? zeiger : nachleser;

  /*
   * Die Requisite erscheint kurz **vor** dem Haltungswechsel. Umgekehrt wuerde
   * die Figur auf etwas reagieren, das noch nicht da ist; gleichzeitig saehe
   * es aus, als haette sie es herbeigezaubert.
   */
  const auftauchen = interpolate(frame, [beginn - 12, beginn], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const hatSymbol = buehne.requisite !== undefined && buehne.requisite !== 'blatt';
  const platz = platzVon(buehne.stand ?? 'mitte', hatSymbol);
  /*
   * Mit Gegenueber gilt `stand` nicht mehr: Wer ein Gegenueber hat, hat keine
   * Wahl, wo er steht. Die Kamera geht dafuer weiter auf.
   */
  const ziel = gegenpose ? stand.ziel : platz.ziel;

  /*
   * Das Blatt gehoert **in** die Figur, nicht daneben.
   *
   * Vorher lag es hier ausserhalb von `<Figur>` und damit ausserhalb der
   * Verschiebung um -38: Die Figur stand links, das Blatt in der Buehnenmitte,
   * und die Lesepose griff daneben ins Leere. Als Requisite auf Ebene 36 faehrt
   * es mit, sitzt vor dem Gehaeuse und hinter den Haenden — und die Haende
   * decken seine Kanten, weil beide im selben Koordinatenraum gerechnet sind.
   *
   * Der Unterschied zu den Symbolen ist nicht Bequemlichkeit, sondern Groesse:
   * Das Blatt ist so gebaut, dass zwei Haende es fassen. Ein Drucker ist es
   * nicht — der steht daneben.
   */
  const gehalten =
    buehne.requisite === 'blatt'
      ? [{ inhalt: <g opacity={auftauchen}><Blatt /></g>, ebene: 36 }]
      : [];

  const daneben =
    buehne.requisite === undefined || buehne.requisite === 'blatt' ? undefined : (
      <g opacity={auftauchen}>
        {(
          /*
           * Ein Symbol neben der Figur, nicht in ihrer Hand: Die Zeichnungen
           * in `Geraete.tsx` sind fuer die volle Buehnenbreite gebaut und um
           * (100, 140) herum aufgesetzt. In die Hand gelegt muessten sie je
           * Symbol von Hand skaliert und verschoben werden. Rechts daneben
           * stehen sie in ihrer eigenen Form, und die Figur schaut hin.
           *
           * `Symbole` und nicht `Symbol`: Die Komponente braechte ein zweites
           * `<svg>` samt Standflaeche mit, und die schwebte im ersten
           * Standbild als graue Ellipse in der Luft.
           *
           * Die Skalierung sitzt in einem eigenen `<g>` **innerhalb** der
           * Deckkraft. Ein `transform` per CSS mit `transformOrigin` in Pixeln
           * waere hier falsch: In einem viewBox-SVG sind CSS-Pixel nicht die
           * Einheiten der Zeichnung, und der Ursprung laege irgendwo.
           *
           * ## Warum (138 | 110) und nicht (112 | 44)
           *
           * Die erste Fassung war zweimal falsch, und beides zeigte erst die
           * `Buehnenprobe`: Das Symbol lag in Kopfhoehe und ueberdeckte das
           * Gesicht.
           *
           * Nachgerechnet: Ein Symbol setzt bei y = 140 auf. Diese Kette bildet
           * (100 | 140) auf (tx | ty + 0,46 · 65) ab. Mit ty = 44 landet die
           * Standlinie bei y = 74 — das Symbol schwebte also 66 Einheiten ueber
           * dem Boden, auf dem die Figur steht. Mit ty = 110 kommt sie auf
           * y = 139,9, und tx = 138 hielt es rechts von der Figur.
           *
           * ## Am 24.08.2026 auseinandergerueckt: 152 statt 138, 0,40 statt 0,46
           *
           * Die Rechnung darueber ging von einem ausgestreckten Arm bis x = 106
           * aus. Das gilt fuer `zeigen` — bei `achselzucken` stehen **beide**
           * Arme ab, und im fertigen Video lag die rechte Hand in der Uhr. Die
           * Zahl war also nicht falsch gerechnet, sondern an der falschen Pose
           * gemessen: an der, die zum Symbol hinzeigt, statt an der breitesten.
           *
           * Die Figur geht zugleich von x = 62 auf 52. Beides zusammen, weil
           * nur eines von beidem den Abstand halbherzig vergroessert haette —
           * das Symbol allein waere an den Buehnenrand gerueckt.
           */
          <g transform={
            /*
             * Bei `stand: 'klein'` steht das Symbol **ueber** der Figur, nicht
             * neben ihr.
             *
             * Sonst geht die Anordnung nicht auf: `klein` setzt die Figur auf
             * 0,52 an den unteren Rand und laesst sie hochschauen — wenn der
             * Gegenstand daneben auf derselben Standlinie steht, schaut sie an
             * ihm vorbei ins Leere. Im ersten Video war genau das zu sehen:
             * kleine Figur, Blick nach oben, Flugzeug in Augenhoehe.
             *
             * Groesser und hoeher: 0,62 statt 0,46, Mittelpunkt bei (128 | 66)
             * statt Standlinie bei y = 140. Damit liegt das Symbol zwischen
             * x = 66 und 190 — die Figur reicht bis x = 67, sie beruehren sich
             * gerade nicht.
             */
            platz.groesse < 1
              ? 'translate(128 66) scale(0.62) translate(-100 -75)'
              : 'translate(152 112) scale(0.40) translate(-100 -75)'
          }>
            <g
              transform={`scale(${interpolate(auftauchen, [0, 1], [0.94, 1])})`}
              transform-origin="100 75"
            >
              {Symbole[buehne.requisite]}
            </g>
          </g>
        )}
      </g>
    );

  /*
   * Kein Zwischenkasten mehr. Hier stand ein `div` mit `width: 100%`,
   * `height: 100%` und zentrierendem Flex — also genau das, was der aufrufende
   * Kasten in `video/szenen/index.tsx` ohnehin tut. Er hat nichts hinzugefuegt
   * und dabei die Hoehenkette unterbrochen: Das `<svg>` bezog sein
   * `height: 100%` auf ihn statt auf den Kasten mit der wirklichen Hoehe, und
   * die Zeichnung blieb weit unter ihrer Flaeche.
   *
   * `flex: 1` mit `minWidth: 0` statt fester Prozente: In einer Flex-Zeile ist
   * das der Weg, den ganzen Platz zu nehmen, ohne unter den Inhalt schrumpfen
   * zu duerfen — `width: 100%` waere hier nur ein Wunsch.
   */
  return (
      <svg
        viewBox="0 0 200 150"
        preserveAspectRatio="xMidYMid meet"
        style={{ flex: 1, minWidth: 0, minHeight: 0, alignSelf: 'stretch' }}
      >
        {/*
          Die Kamera faehrt langsam heran. Sie richtet sich nach dem, was zu
          sehen ist: Steht ein Symbol daneben, rueckt sie in die Mitte zwischen
          beide — dorthin also, wo das Ereignis stattfindet. Haelt die Figur
          etwas selbst, bleibt sie auf der Figur, denn dort ist das Ereignis
          schon.

          Sie ersetzt nicht die Dauerbewegung in `Buehne.tsx`, sondern liegt
          darunter: Jene bewegt das **ganze** Bild samt Text und ist so
          langsam, dass sie nur das Auge wachhaelt. Diese hier bewegt die
          Zeichnung und darf gesehen werden.
        */}
        {/*
          **Die Fahrt ist am 31.08.2026 stillgelegt — `von` und `nach` sind
          derselbe Stand.**

          Sie zoomte ueber die Szene auf bis zu 1,24, und zusammen mit der
          Dauerbewegung in `Buehne.tsx` waren das +29,6 %. Am ersten fertigen
          Video war das Urteil „alles zappelt im Bild", und dazu kam ein Fehler,
          den erst die Pixelmessung zeigte: **Die Fahrt vergroessert den Inhalt
          ueber den SVG-Rahmen hinaus, und niemand beschneidet ihn.** Voltis
          linke Hand stand am Szenenanfang 58 Pixel ueber der Buehnenkante, am
          Ende 70 — und damit direkt auf dem Vorhangstreifen.

          **Der Aufbau bleibt vollstaendig stehen**, samt `PLAETZE` und ihren
          Kamerazielen: Die Rechnungen darin sind an Standbildern erarbeitet und
          dokumentieren, wie eng es zugeht, sobald ein Symbol danebensteht. Wer
          die Fahrt zurueckholt, findet sie hier — und muss dann die
          Beschneidung mitbauen.
        */}
        <Kamera dauer={dauer} von={{ zoom: 1 }} nach={{ zoom: 1 }}>
          {/*
            Standflaeche wie bei den Symbolen — Figur und Requisite stehen auf
            derselben Linie, weil sie sich denselben Koordinatenraum teilen.

            Sie richtet sich nach dem, was darauf steht. Die feste Breite von
            vorher spannte immer von x = 38 bis 162, auch wenn nur die Figur bei
            x = 62 stand: In der `Buehnenprobe` lag der Schatten dann als
            eigener grauer Fleck **neben** ihr. Ein Schatten, der weiter reicht
            als das, was ihn wirft, sieht nicht nach Boden aus, sondern nach
            einem zweiten Gegenstand.
          */}
          {/*
            Sie gehoert der Figur, nicht der Buehne. Bei `daneben` spannte sie
            vorher ueber beide (rx 62) und behauptete damit einen gemeinsamen
            Boden — den es nicht gibt: `europa` ist ein Sternenkreis um
            (100 | 74) mit Radius 46 und endet bei y = 127, also 13 Einheiten
            ueber der Standlinie. Ein Zeichen setzt nicht auf, ein Gegenstand
            schon, und die Ellipse kann das nicht wissen.

            Damit gilt hier dieselbe Begruendung wie fuer die Breite: Ein
            Schatten, der weiter reicht als das, was ihn wirft, sieht nicht nach
            Boden aus, sondern nach einem zweiten Gegenstand.
          */}
          {gegenpose === undefined ? (
            <ellipse
              cx={platz.x}
              cy="140"
              rx={34 * platz.groesse}
              ry={9 * platz.groesse}
              fill={FARBEN.flaeche}
              opacity={0.5}
            />
          ) : (
            // Zwei Figuren, zwei Schatten. Einer ueber beide behauptete einen
            // gemeinsamen Sockel, auf dem sie nicht stehen.
            <>
              {/* Zwei Figuren, zwei gleich breite Schatten. Einer ueber beide
                  behauptete einen gemeinsamen Sockel, auf dem sie nicht
                  stehen. */}
              {[stand.links, stand.rechts].map((x) => (
                <ellipse
                  key={x}
                  cx={x}
                  cy="140"
                  rx={34 * stand.groesse}
                  ry={9 * stand.groesse}
                  fill={FARBEN.flaeche}
                  opacity={0.5}
                />
              ))}
            </>
          )}
          {/*
            Die Figur steht links, ein Symbol rechts. Im ersten Standbild
            standen beide mittig und die Lupe lag ueber dem Kopf. Das Blatt
            geht als `gehalten` mit hinein und wird deshalb mitverschoben.

            **Ohne Symbol wird nicht verschoben.** Die -38 galten vorher immer,
            auch wenn die Figur allein auf der Buehne stand: Sie sass dann
            links aussen, waehrend rechts die halbe Flaeche leer blieb, und der
            Platz, den sie fuer ein Symbol raeumte, wurde von nichts gebraucht.
          */}
          {gegenpose === undefined ? (
            <g transform={platz.transform}>
              {/*
                Auch allein auf der Buehne wiegt und atmet die Figur — nur
                sprechen tut sie nicht sichtbar: Ohne Gegenueber gibt es keinen
                Sprecherwechsel, und ein Mund, der dauerhaft klappt, ist kein
                Sprechen, sondern ein Tic.
              */}
              <Figur
                rig={eigenes}
                pose={figurenbewegung(pose, { staerke: 0, versatz: 0, frame, fps, woerter, sekunde })}
                requisiten={gehalten}
              />
            </g>
          ) : (
            <>
              <g transform={wortwechselTransform(stand, 'links')}>
                <Figur
                  rig={eigenes}
                  pose={figurenbewegung(pose, { staerke: staerkeVon(eigeneRolle), versatz: 0, frame, fps, woerter, sekunde })}
                  requisiten={gehalten}
                />
              </g>
              {/*
                Die rechte Figur ist **gespiegelt**, damit beide sich ansehen.
                Der Satz „Gespiegelt wird nicht" in `platzVon` bleibt richtig —
                er galt dem Fall Figur plus Symbol, wo das Symbol danach hinter
                dem Ruecken laege. Bei zwei Figuren gilt er nicht: Gehaeuse und
                Ladebalken sind symmetrisch, und ohne Spiegelung schauen beide
                in dieselbe Richtung, was ein Gruppenbild ergibt und kein
                Gespraech.

                Gespiegelt wird um x = 100, also um die eigene Mitte der Figur
                in ihrem Koordinatenraum — erst danach wird verschoben. Die
                umgekehrte Reihenfolge klappte sie ueber den Buehnenrand.
              */}
              <g transform={wortwechselTransform(stand, 'rechts')}>
                <Figur
                  rig={anderes}
                  pose={figurenbewegung(gegenpose, { staerke: staerkeVon(andereRolle), versatz: 1, frame, fps, woerter, sekunde })}
                />
              </g>
              {/*
                Die Namen zuletzt, also **ueber** den Figuren in der
                Zeichenreihenfolge. Ein Name hinter einem Arm waere nur bei
                bestimmten Posen halb verdeckt — der lautloseste Fehler, den
                dieses Bild kennt.
              */}
              <Namensschild
                wer={eigeneRolle}
                x={stand.links}
                groesse={stand.groesse}
                staerke={staerkeVon(eigeneRolle)}
              />
              <Namensschild
                wer={andereRolle}
                x={stand.rechts}
                groesse={stand.groesse}
                staerke={staerkeVon(andereRolle)}
              />
            </>
          )}
          {daneben}
        </Kamera>
      </svg>
  );
};

/* ───────────────────────────── Gegenueber ────────────────────────────── */

/**
 * Zwei Zustaende uebereinander, je ein Etikett.
 *
 * Aus dem kuerzesten Video der Sammlung: DJI zeigt in sieben Sekunden oben
 * „AMATEUR" und unten „PRO" — 1,75 Mio Aufrufe, kein gesprochenes Wort.
 *
 * **Der Vorgang liegt hier nicht in einer Bewegung, sondern im Vergleich.**
 * Deshalb erscheinen die Haelften nacheinander: Zuerst steht die obere allein,
 * dann kommt die untere dazu. Beide gleichzeitig einzublenden waere ein Bild
 * mit zwei Haelften; nacheinander ist es eine Behauptung und ihre Antwort.
 */
const Gegenueber: React.FC<{
  buehne: Extract<BuehnenbildDaten, { art: 'gegenueber' }>;
  dauer: number;
}> = ({ buehne, dauer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zweite = interpolate(frame, [Math.round(dauer * 0.42), Math.round(dauer * 0.52)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  /*
   * Alles in **einem** SVG, nicht in zwei Flex-Kaesten mit HTML-Etiketten.
   *
   * Der erste Anlauf war HTML: zwei `div` mit `flex: 1`, das Symbol darin, das
   * Etikett absolut positioniert. Im Standbild standen beide Haelften
   * zusammengedraengt oben, darunter ein Drittel leere Flaeche, und die
   * Etiketten klebten am linken Buehnenrand statt an ihrer Zeichnung. Der
   * Grund ist immer derselbe: `height: 100%` braucht einen Elternteil mit
   * bekannter Hoehe, und in einer Flex-Spalte, die selbst noch verhandelt,
   * gibt es die nicht.
   *
   * Ein SVG mit `viewBox` verhandelt nicht. Die obere Haelfte **ist** y 0 bis
   * 72, und das Etikett sitzt bei (6, 6), weil es dort sitzen soll.
   */
  const HALB = 72;

  const Haelfte: React.FC<{
    seite: { etikett: string; symbol: KontextArt };
    y: number;
    auf: number;
  }> = ({ seite, y, auf }) => (
    <g opacity={auf} transform={`translate(0 ${y + interpolate(auf, [0, 1], [4, 0])})`}>
      {/*
        Die Zeichnung sitzt **unter** dem Etikett, nicht in der Mitte der
        Haelfte. Der doppelte `translate` ist der uebliche Weg, um um einen
        Punkt zu skalieren, ohne sich auf `transform-origin` zu verlassen.

        Vorher stand sie bei y = 34 mit `scale(0.52)` und reichte damit von
        y = -5 bis 73 — das Etikett belegt y 3 bis 16, und im Standbild lag
        „DAS FLUGZEUG" quer ueber dem Tragflaechenansatz. Die beiden konnten
        sich gar nicht ausweichen, weil die Zeichnung ueber den oberen Rand
        ihrer eigenen Haelfte hinauslief.

        Jetzt bleiben ihr y 19 bis 75: die Haelfte ohne den Streifen, den das
        Etikett braucht. Das kostet Groesse, und der Tausch ist richtig — eine
        Zeichnung, die halb unter einem schwarzen Kasten liegt, ist nicht
        groesser, sondern unlesbar.
      */}
      <g transform={`translate(104 ${HALB / 2 + 11}) scale(0.37) translate(-100 -75)`}>
        {Symbole[seite.symbol]}
      </g>

      {/*
        Etikett links oben in der Haelfte, wie im Vorbild. Nicht zentriert:
        Zentriert konkurriert es mit der Zeichnung um die Mitte, und das Auge
        weiss nicht, was zuerst gilt.

        Die Breite wird aus der Zeichenzahl geschaetzt statt gemessen. Die
        Alternative waere eine Messung im DOM, also derselbe `delayRender`, den
        sich `Buehne.tsx` schon leistet — fuer ein Etikett aus hoechstens
        vierzehn Zeichen zu teuer.

        **6,4 Einheiten je Zeichen, nicht 5,1.** Der erste Wert war geraten und
        im Standbild sofort zu sehen: „FRÜHER" stand rechts ueber seinem
        Kasten hinaus. Gemessen an Inter in `SCHRIFT.fett` bei Schriftgroesse 9
        und Grossbuchstaben — die breiteste Stelle ist ein „M", die schmalste
        ein „I", und der Mittelwert deckt beides mit dem Innenabstand ab.
      */}
      <rect x={6} y={3} width={seite.etikett.length * 6.4 + 12} height={13} rx={3} fill={FARBEN.tinte} />
      <text
        x={12}
        y={12.8}
        fill={FARBEN.grundRein}
        style={{
          fontFamily: SCHRIFT.familie,
          fontWeight: SCHRIFT.fett,
          fontSize: 9,
          letterSpacing: 0.3,
        }}
      >
        {seite.etikett.toUpperCase()}
      </text>
    </g>
  );

  /*
   * Kein Zwischenkasten mehr. Hier stand ein `div` mit `width: 100%`,
   * `height: 100%` und zentrierendem Flex — also genau das, was der aufrufende
   * Kasten in `video/szenen/index.tsx` ohnehin tut. Er hat nichts hinzugefuegt
   * und dabei die Hoehenkette unterbrochen: Das `<svg>` bezog sein
   * `height: 100%` auf ihn statt auf den Kasten mit der wirklichen Hoehe, und
   * die Zeichnung blieb weit unter ihrer Flaeche.
   *
   * `flex: 1` mit `minWidth: 0` statt fester Prozente: In einer Flex-Zeile ist
   * das der Weg, den ganzen Platz zu nehmen, ohne unter den Inhalt schrumpfen
   * zu duerfen — `width: 100%` waere hier nur ein Wunsch.
   */
  return (
      <svg
        viewBox="0 0 200 150"
        preserveAspectRatio="xMidYMid meet"
        style={{ flex: 1, minWidth: 0, minHeight: 0, alignSelf: 'stretch' }}
      >
        <Haelfte seite={buehne.oben} y={0} auf={1} />

        {/* Die Trennlinie gehoert zur unteren Haelfte: Sie erscheint mit ihr
            und markiert den Moment, in dem aus einem Bild ein Vergleich wird. */}
        <line
          x1={10}
          y1={HALB + 3}
          x2={190}
          y2={HALB + 3}
          stroke={FARBEN.flaeche}
          strokeWidth={1.5}
          opacity={zweite}
        />

        <Haelfte seite={buehne.unten} y={HALB + 6} auf={zweite} />

        {/*
          Die Figur zeigt auf den Vergleich, statt fuer eine ganze Szene zu
          verschwinden.

          Bis zum 23.08.2026 war das geteilte Bild die einzige Buehne ohne sie.
          Im fertigen Video fiel auf, was das bedeutet: Der Avatar ist da, weg,
          und wieder da — im Feed liest sich das nicht als Bildwechsel, sondern
          als anderes Video.

          Sie steht klein links unten. Der erste Versuch mit Groesse 0,4 und
          Boden auf y = 140 hat sie in das Etikett der unteren Haelfte gestellt
          — dort ist nichts frei, beide Haelften fuellen die 200 mal 150
          vollstaendig aus. Bei 0,32 und Boden y = 148 reicht sie von y = 110
          bis 148 und bleibt damit unter dem Etikett, das bei 94 endet.

          Der Stab zeigt nach oben rechts, also in den Vergleich hinein.

          Sie taucht mit der **unteren** Haelfte auf. Vorher waere sie eine
          Figur, die auf etwas zeigt, das es noch nicht gibt.
        */}
        {(buehne.mitFigur ?? true) && (
          <g
            opacity={zweite}
            transform="translate(-70 8) translate(100 140) scale(0.32) translate(-100 -140)"
          >
            <Figur
              rig={nachleser}
              pose={poseAus({ frame, fps, pose: 'erklaeren', vorherigePose: 'hochschauen', abBild: Math.round(dauer * 0.42) })}
            />
          </g>
        )}
      </svg>
  );
};

/* ─────────────────────────────── Auswahl ─────────────────────────────── */

export const Buehnenbild: React.FC<{
  buehne: BuehnenbildDaten;
  dauer: number;
  /** Nur fuer `Wortwechselprobe`. Siehe `Figurenbuehne`. */
  stand?: Wortwechselstand;
}> = ({ buehne, dauer, stand }) => {
  switch (buehne.art) {
    case 'figur':
      return <Figurenbuehne buehne={buehne} dauer={dauer} stand={stand} />;
    case 'gegenueber':
      return <Gegenueber buehne={buehne} dauer={dauer} />;
  }
};
