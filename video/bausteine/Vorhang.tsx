import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { FARBEN, FORMAT, SCHRIFT, VORHANG, mische } from '../../src/marke';
import { FIGURENNAMEN } from '../../src/typen';
import { nachleser } from '../../daten/figur/nachleser';
import { eingefaerbt, zeiger } from '../../daten/figur/zeiger';
import { Figur } from './Figur';
import { WORTWECHSEL, wortwechselTransform } from './Buehnenbild';
import { poseAus } from './posen';

/**
 * Der Bühnenvorhang und die Titelkarte darauf — der Vorspann.
 *
 * ## Was er ist
 *
 * Seit dem 31.08.2026 beginnt jeder Short als **Show**: Der Aufschlag läuft bei
 * offenem Vorhang, dann fährt der Vorhang zu, auf ihm stehen Showtitel und
 * Themenzeile, die beiden Figuren nennen ihre Namen, und dann öffnet er sich
 * auf das Gespräch.
 *
 * Aus vier Rubriken werden damit sechs benannte Sendungen — „Facts", „Beef",
 * „Märchenstunde", „Kein Zufall", „Schätz mal", „Empfehlungen". Der Kanal ist
 * der Sender, das Format die Show darin.
 *
 * ## Warum er nach dem Aufschlag sitzt und nicht davor
 *
 * **Cold Open**, wie in jeder Sitcom. Zwei Gründe, beide aus diesem Projekt:
 *
 * Der Aufschlag hat 3,5 Sekunden, weil 71 % der Zuschauer in dieser Zeit
 * entscheiden. Ein Vorspann davor verbraucht sie, bevor irgendetwas zugreift.
 *
 * **Ein Short läuft von selbst wieder an**, und ein Rewatch zählt als eigene
 * Ansicht. Ein Vorhang am Anfang säße in der Schleife unmittelbar hinter dem
 * Schluss — also genau dort, wo am 18.08.2026 schon einmal einer abgehängt
 * wurde: „ein Vorhang, der 1,5 bis 3,1 Sekunden dauerte und optisch sagte,
 * dass man **nicht abwarten muss**."
 *
 * Und deshalb gibt es am Ende auch keinen. Derselbe Bauteil, entgegengesetzte
 * Wirkung: mittendrin ein Übergang, am Schluss ein Schlusszeichen.
 *
 * ## Theaterrot
 *
 * Die Farbe ist am 31.08.2026 an einer Vergleichsseite gewählt worden — drei
 * Kandidaten, jeder als vollständiger Opener. Ein Marken-Rot gab es bis dahin
 * nicht: Bei Wattis Farbwahl war Rot als „zu grell" verworfen worden, **das
 * galt aber einer Figur, nicht einer Fläche.**
 *
 * Die Figuren stehen **vor** dem Vorhang und sind `#111820`. Gegen den
 * dunkelsten Faltenton ist ihr Kontrast **1,26**, und diese Zahl hat einmal
 * einen hellen Umriss um sie herum gerechtfertigt. Sie beantwortete die
 * falsche Frage — die richtige Fassung steht bei `VOLTI_AUF_ROT` weiter unten.
 *
 * ## Warum er nur die Bühne deckt
 *
 * Oben bleibt die Kopfzeile stehen: Doppelzeichen, Wortmarke, das Label
 * „KI-Stimme" — die seit Mai 2025 verlangte Kennzeichnung — und die
 * Belegzeile. **Oben der Kanal, auf dem Vorhang die Show.**
 *
 * ## Warum links und rechts ein Streifen stehen bleibt
 *
 * Seit dem 31.08.2026 fährt der Vorhang nicht ganz auf: `VORHANG.rand` bleibt
 * als gerafftes Tuch stehen, über die **ganze Laufzeit** jedes Videos. Damit
 * sieht der Zuschauer ab Sekunde null eine Bühne, und der Vorspannvorhang
 * erscheint nicht aus dem Nichts, sondern wächst aus etwas, das schon da war.
 *
 * Die Breite steht in `src/marke.ts`, samt der Messung, an der die erste Zahl
 * gescheitert ist: 50 Pixel hätten vollständig im Beschnitt der Apps gelegen.
 */

/* ─────────────────────────────── Der Ablauf ───────────────────────────── */

/** Wie lange die Hälften brauchen, in Bildern bei 30 fps. */
/* Die Zahl steht seit dem 31.08.2026 in `VORHANG`, weil `vorspannSek` sie
   ebenfalls braucht. Hier bleibt nur der Name. */
const FAHRT_BILDER = VORHANG.fahrtBilder;

/**
 * Der Zeitverlauf über die Vorspanndauer, als Anteile von 0 bis 1.
 *
 * ## Warum `oeffnen` und `vergehen` gerechnet werden statt festzustehen
 *
 * Bis zum 31.08.2026 stand hier `oeffnen: 0.86`, und das ging, solange der
 * Vorspann immer **4,8 Sekunden** dauerte. Mit der Themenansage wechselt seine
 * Länge je Short — 51 bis 63 Zeichen, rund vier Sekunden Unterschied.
 *
 * Ein fester Anteil hätte dann **mitskaliert**: Bei einem längeren Vorspann
 * öffnete der Vorhang später und ließe hinterher Leerlauf stehen, obwohl die
 * Fahrt physisch immer dieselben zwölf Bilder braucht. **Ein Anteil beschreibt
 * eine Bewegung nur so lange richtig, wie das Ganze gleich lang bleibt.**
 *
 * Also von hinten gerechnet: Der Vorhang öffnet so, dass er mit dem Vorspann
 * fertig wird — egal wie lang der ist.
 */
export const ablauf = (dauer: number) => {
  const fahrt = FAHRT_BILDER / Math.max(1, dauer);
  const oeffnen = 1 - fahrt;
  return {
    titel: 0,
    /* Sie steht, bis der Vorhang aufgeht: Solange die Ansage läuft, gehört das
       Thema ins Bild. Vorher stand hier ein fester Vorlauf, und der schnitt die
       Zeile mitten in ihrer eigenen Ansage weg. */
    vergehen: oeffnen - fahrt,
    oeffnen,
  };
};

const anteil = (frame: number, dauer: number) => frame / Math.max(1, dauer);

/**
 * Wie weit der Vorhang im Ruhezustand zu ist — die beiden stehenden Streifen.
 *
 * Abgeleitet aus `VORHANG.rand`, nicht daneben geschrieben. Eine Breite gehört
 * nicht in `ABLAUF`: Das ist eine Tabelle von **Zeitanteilen**, und zwei
 * Größen in einem Record laufen beim ersten Umbau auseinander.
 */
export const RUHE = VORHANG.rand / (FORMAT.breite / 2);

/**
 * Wie stark der Vorhang den oberen Bildbereich deckt: 0 im Ruhezustand,
 * 1 geschlossen.
 *
 * Die Kopfzeile liegt über dem Stoff und wechselt darüber ihre Farben. Sie
 * liest denselben `zu`-Wert, der auch den Vorhang steuert — **ein Stand, eine
 * Wahrheit.** Ein zweiter Zeitvergleich daneben liefe beim ersten Umbau am
 * Ablauf lautlos auseinander.
 */
export const aufVorhang = (zu: number): number =>
  interpolate(zu, [RUHE, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/**
 * Wie tief die Blende im Ruhezustand ins Bild hängt, in Pixeln.
 *
 * Sie stand einmal auf `SICHERE_ZONE.oben - VORHANG.oben` — dem Platz zwischen
 * Vorhangkante und Bühnenbeginn. Seit der Vorhang bei y = 0 ansetzt, wäre das
 * 420: eine Blende über einem Viertel des Bildes.
 *
 * Also eine eigene Zahl. Ihre Grenze nach unten ist die Kopfzeile bei
 * `KOPFZEILE_OBEN` = 280 — die Blende darf nicht hinter ihr stehen, sonst
 * liest sich die Wortmarke auf zwei Untergründen zugleich.
 */
const BEHANG_RUHE = 64;

/**
 * Wie weit der Vorhang zu ist. 0 wäre ganz offen, 1 geschlossen — **der
 * Ruhewert ist `RUHE`, nicht 0.**
 *
 * Die Funktion gilt damit auf der ganzen Zeitachse und nicht nur im Vorspann:
 * `interpolate` klemmt an beiden Enden, also liefert sie für jedes Bild davor
 * und danach `RUHE`. Kein Sonderfall, keine zweite Kurve daneben.
 */
export const vorhangstand = (frame: number, dauer: number): number => {
  const t = anteil(frame, dauer);
  const A = ablauf(dauer);
  const spanne = FAHRT_BILDER / Math.max(1, dauer);

  /*
   * **Der Vorhang ist von Bild null an geschlossen — er faehrt nicht mehr zu.**
   *
   * Bis zum 31.08.2026 sass der Vorspann zwischen Aufschlag und Gespraech, und
   * dort war das Zufahren die halbe Geste: Man sah eine Buehne, dann deckte
   * sich der Vorhang darueber.
   *
   * Am Anfang gibt es nichts zuzudecken. Der erste Anlauf liess ihn trotzdem
   * zufahren, und das Standbild bei Bild 0 zeigte es sofort: **eine leere
   * Buehne** — hinter dem noch offenen Vorhang lag keine Szene, weil die erste
   * erst nach dem Vorspann beginnt. Derselbe Fehler wie die leere Buehne am
   * Videoende, nur am anderen Ende.
   */
  return interpolate(t, [A.oeffnen, A.oeffnen + spanne], [1, RUHE], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.sin),
  });
};

/** Wie sichtbar die Titelkarte ist: 0 bis 1. */
export const titelstand = (frame: number, dauer: number): number => {
  const t = anteil(frame, dauer);
  const A = ablauf(dauer);
  return Math.min(
    /* Schnell, nicht sanft: Bei Bild null steht sonst 0,7 Sekunden lang ein
       leerer Vorhang, und der Short faengt mit nichts an. */
    interpolate(t, [A.titel, A.titel + 0.02], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    interpolate(t, [A.vergehen, A.oeffnen], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
};

/* ──────────────────────────────── Der Stoff ───────────────────────────── */


/**
 * Die drei Tonwerte des Stoffs, **abgeleitet** aus `FARBEN.vorhang`.
 *
 * Wer die Grundfarbe ändert, ändert alle drei mit. Drei Werte, weil eine Falte
 * ein Tal, einen Wulst und eine Flanke hat — mit zweien wird sie ein Streifen.
 */
const STOFF = {
  grund: FARBEN.vorhang,
  tief: mische(FARBEN.vorhang, '#000000', 0.46),
  licht: mische(FARBEN.vorhang, '#FFFFFF', 0.24),
  naht: mische(FARBEN.vorhang, '#000000', 0.7),
};

/**
 * Derselbe lineare Kongruenzgenerator wie in `Muster.tsx`.
 *
 * **Gleicher Startwert, gleiches Bild.** Ein Vorhang, der sich bei jedem Lauf
 * anders faltet, wäre kein Markenelement, sondern ein Zufallsgenerator — und
 * niemand könnte sagen, welche Fassung gerade gerendert wurde.
 */
const zufall = (start: number) => {
  let s = start;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
};

/**
 * Unregelmäßige Faltenbreiten, die zusammen genau die Hälfte füllen.
 *
 * **Unregelmäßig ist der ganze Punkt.** Gleich breite Bänder sind ein
 * Streifenmuster und kein Stoff — dieselbe Überlegung wie beim Mundrhythmus,
 * wo ein einzelner Sinus als Metronom auffiel.
 */
const FALTEN_JE_SEITE = 8;

const falten = (breite: number, saat: number) => {
  const w = zufall(saat);
  const roh = Array.from({ length: FALTEN_JE_SEITE }, () => 0.62 + w() * 0.76);
  const summe = roh.reduce((a, b) => a + b, 0);
  let x = 0;
  return roh.map((r) => {
    const b = (r / summe) * breite;
    const eintrag = { x, b };
    x += b;
    return eintrag;
  });
};

/**
 * Die Schriftgröße der Themenzeile, nach ihrer Länge.
 *
 * **Die Bühne ist schmaler, als sie aussieht.** Die sichere Zone nimmt links
 * 170 und rechts 200 Pixel; auf der Vorlage lief eine feste Größe bei
 * „Auf der Raumstation laufen uralte Laptops" über den Rand. Dieselbe Bauart
 * wie bei der `zahl`-Szene, die ihre Ziffern nach der Zeichenzahl staffelt.
 * Das Schema deckelt die Zeile bei 60 Zeichen, also gibt es drei Stufen.
 */
const zeilengroesse = (zeile: string): number =>
  zeile.length <= 24 ? 88 : zeile.length <= 38 ? 78 : 68;

/**
 * Die Figuren mit einem Saum in der Vorhangfarbe.
 *
 * ## Der weiße Rand war nicht meiner
 *
 * Am 31.08.2026 stand hier ein weißer Umriss um die Figuren, den ich mit einem
 * Kontrast von 1,26 begründet hatte. Er ist gefallen — und der Rand blieb
 * trotzdem sichtbar.
 *
 * **Er gehört zum Rig.** `SAUM` in `daten/figur/nachleser.ts` zeichnet eine
 * 13 Einheiten breite Linie in `FARBEN.grund` um Arme und Hände. Ihre Aufgabe
 * ist nicht Zierde: Ein Arm liegt streckenweise **vor** dem Körper, und beide
 * sind fast schwarz — ohne den Saum verschwindet er darin.
 *
 * ## Also nicht weg, sondern umgefärbt
 *
 * Der Saum ist eine Trennlinie zum **Hintergrund** und muss deshalb dessen
 * Farbe tragen. Auf hellem Grund ist das `FARBEN.grund`, auf dem Vorhang der
 * Stoffton. Dann trennt er weiterhin Arm von Körper und fällt nicht als
 * heller Rand auf.
 *
 * Er trägt `STOFF.tief` und nicht `STOFF.grund`. Der Stoff ist **gefaltet**:
 * Ein flacher Grundton steht neben jedem Tal als heller Ring da — genau der
 * weiße Rand, nur in Rot. Der tiefste der drei Töne ist nirgends heller als
 * seine Umgebung und liest sich deshalb als Kontur, nicht als Halo.
 *
 * Dieselbe Bauart wie bei den Kennfarben, die je nach Grund eine andere
 * Helligkeit tragen: **Ein Wert, der einen Hintergrund meint, wechselt mit
 * ihm.**
 *
 * `eingefaerbt` kommt aus `daten/figur/zeiger.ts` und greift auf Teil- wie
 * Formstile durch — abgeleitet statt abgeschrieben.
 */
const VOLTI_AUF_ROT = eingefaerbt(nachleser, { [FARBEN.grund]: STOFF.tief });
const WATTI_AUF_ROT = eingefaerbt(zeiger, { [FARBEN.grund]: STOFF.tief });


/* ───────────────────────────────── Der Stoff ──────────────────────────── */

/**
 * Die beiden Vorhanghälften — **dauerhaft im Bild**, nicht nur im Vorspann.
 *
 * Sie nimmt `zu` als Prop und liest keinen Frame. Damit gibt es genau einen
 * Ort, an dem der Stand gerechnet wird (`Short.tsx`), und genau einen, an dem
 * der Stoff gezeichnet wird. Eine zweite Zeichnung desselben Stoffs — eine für
 * den Ruhezustand, eine für den Vorspann — wäre die Doppelung ohne Wache, vor
 * der diese Datei an fünf Stellen warnt.
 */
export const Vorhangstoff: React.FC<{
  /** 0 wäre ganz offen, 1 geschlossen. Der Ruhewert ist `RUHE`. */
  zu: number;
  /** Maße der Fläche in Pixeln — sie kommen von außen. */
  breite: number;
  hoehe: number;
}> = React.memo(({ zu, breite, hoehe }) => {
  const halb = breite / 2;
  /* Wie breit eine Hälfte gerade ist. Bei `zu = 1` stoßen sie in der Mitte
     zusammen, bei `RUHE` stehen sie als geraffte Streifen am Rand. */
  const bahn = zu * halb;

  const behangHoch = Math.round(hoehe * 0.085);
  const behangTiefe = Math.round(behangHoch * 0.47);
  const boegen = 7;
  const bogenBreite = breite / boegen;

  /*
    **Der Behang fährt mit ein, aber nie ganz hinaus.**

    Ohne ihn sind die beiden Ruhestreifen zwei Balken am Bildrand; erst die
    Bogenkette quer darüber macht daraus eine Bühne. Ganz stehen bleiben kann er
    aber auch nicht: Er ist 171 Pixel tief, zwischen `VORHANG.oben` und dem
    Beginn der Bühne liegen nur **44** frei — dauerhaft läge er im Szenentext.

    Also bleibt im Ruhezustand genau so viel stehen, wie hineinpasst. Die
    Bogenkette ist dann flach und liest sich als Blende, wie sie über jeder
    Bühne hängt.

    Verschoben statt skaliert: Das SVG beginnt bei y = 0 und schneidet alles
    darüber ab, es genügt also, ihn hinauszuschieben. Skaliert würden die Ringe
    zu Ellipsen.
  */
  /* Der tiefste Punkt der Bogenkette: der Scheitel einer quadratischen Kurve
     liegt auf halber Strecke zwischen Endpunkten und Kontrollpunkt. Er ist die
     Zahl, an der der Versatz haengt — nicht die Gesamthoehe, die auch die
     Ringe unter der Kette einschliesst. */
  const behangScheitel = (behangHoch - behangTiefe + behangHoch + 26) / 2;
  const behangVersatz = (behangScheitel - BEHANG_RUHE) * (1 - aufVorhang(zu));
  /* **Die Ringe haengen unter der Kette und passen im Ruhezustand nicht mit
     hinein.** Beides zugleich in 44 Pixel zu zwingen hiesse, den Bogen ganz
     hinauszuschieben — dann schwebten nur noch Punkte in der Luft. Sie sind
     ohnehin die Aufhaengung, und die sieht man an einem gerafften Vorhang
     nicht: Die Blende verdeckt sie. */
  const ringe = interpolate(zu, [RUHE + (1 - RUHE) * 0.4, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  /* Der Querbehang: eine Bogenkette, die oben hängen bleibt, während die
     Hälften fahren. Genau das macht aus zwei Rechtecken eine Bühne. */
  let behangPfad = `M 0 0 L 0 ${behangHoch - behangTiefe}`;
  for (let i = 0; i < boegen; i++) {
    const x = i * bogenBreite;
    behangPfad += ` Q ${x + bogenBreite / 2} ${behangHoch + 26} ${x + bogenBreite} ${behangHoch - behangTiefe}`;
  }
  behangPfad += ` L ${breite} 0 Z`;

  /*
    **Gestaucht, nicht hinausgeschoben.** Bis zum 31.08.2026 schob sich jede
    Hälfte um `(1 - zu) * halb` aus dem Bild. Mit einem Ruhewert von 0,24 wäre
    davon eine dreiviertel Falte übriggeblieben — ein flacher roter Balken.

    Ein gerafft aufgezogener Vorhang staucht sein Tuch, er schiebt es nicht
    weg. Skaliert stehen im Ruhezustand alle acht Falten in den 130 Pixeln,
    rund 16 je Falte, und der Vorspannvorhang wächst wirklich aus ihnen heraus.

    Die Außenkante bleibt dabei fest: links ist der Ursprung x = 0, rechts
    liegt die Gruppe am rechten Bildrand.
  */
  const seite = (links: boolean) => (
    <g transform={links ? `scale(${zu} 1)` : `translate(${breite - bahn} 0) scale(${zu} 1)`}>
      {falten(halb, links ? 20260214 : 20260831).map((f, i) => (
        <rect
          key={i}
          x={f.x}
          y={0}
          width={f.b + 0.6}
          height={hoehe}
          fill={`url(#falte-${links ? 'l' : 'r'}-${i})`}
        />
      ))}
    </g>
  );

  /*
    **Der Schatten an der Innenkante darf nicht mitgestaucht werden.**

    Er stand einmal als festes Rechteck bei der halben Breite und lag im
    halb geöffneten Zustand als dunkler Streifen mitten auf der hellen Szene.
    Dann wanderte er in die Hälfte hinein und fuhr richtig mit. Seit die Hälfte
    skaliert statt fährt, schrumpfte er dort auf 12,5 Pixel — der Schatten
    einer Kante ist aber nicht schmaler, nur weil das Tuch gerafft ist.

    Also liegt er wieder außerhalb, jetzt an der gerechneten Innenkante.
  */
  const kantenbreite = Math.min(52, bahn);
  const kante = (links: boolean) => (
    <rect
      x={links ? bahn - kantenbreite : breite - bahn}
      y={0}
      width={kantenbreite}
      height={hoehe}
      fill={`url(#vorhang-kante-${links ? 'l' : 'r'})`}
    />
  );

  return (
    <svg
      width={breite}
      height={hoehe}
      viewBox={`0 0 ${breite} ${hoehe}`}
      style={{ position: 'absolute', inset: 0 }}
    >
      <defs>
        {(['l', 'r'] as const).flatMap((s) =>
          Array.from({ length: FALTEN_JE_SEITE }, (_, i) => (
            /*
              Das Licht sitzt nicht mittig auf der Falte — ein Wulst wird von
              einer Seite beleuchtet, sonst sieht er aus wie eine Röhre.
            */
            <linearGradient key={`${s}${i}`} id={`falte-${s}-${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={STOFF.tief} />
              <stop offset="34%" stopColor={STOFF.licht} />
              <stop offset="62%" stopColor={STOFF.grund} />
              <stop offset="100%" stopColor={STOFF.tief} />
            </linearGradient>
          )),
        )}
        <linearGradient id="vorhang-kante-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={STOFF.naht} stopOpacity={0} />
          <stop offset="100%" stopColor={STOFF.naht} stopOpacity={0.72} />
        </linearGradient>
        <linearGradient id="vorhang-kante-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={STOFF.naht} stopOpacity={0.72} />
          <stop offset="100%" stopColor={STOFF.naht} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="vorhang-behang" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={STOFF.licht} />
          <stop offset="100%" stopColor={STOFF.tief} />
        </linearGradient>
      </defs>

      {seite(true)}
      {seite(false)}
      {kante(true)}
      {kante(false)}

      <g transform={`translate(0 ${-behangVersatz})`}>
        <path d={behangPfad} fill="url(#vorhang-behang)" />
        <g opacity={ringe}>
          {Array.from({ length: boegen }, (_, i) => (
            <circle key={i} cx={(i + 0.5) * bogenBreite} cy={behangHoch + 15} r={11} fill={STOFF.tief} />
          ))}
        </g>
      </g>
    </svg>
  );
});

/* ───────────────────────────────── Die Karte ──────────────────────────── */

/**
 * Titel, Themenzeile und die beiden sich vorstellenden Figuren.
 *
 * Läuft **nur** während des Vorspanns, während der Stoff dahinter über die
 * ganze Laufzeit steht. Deshalb liest sie ihren eigenen Frame: Sie ist in eine
 * `Sequence` gemountet, deren Zeitachse bei null beginnt.
 */
export const Vorspannkarte: React.FC<{
  /** Der Showtitel aus `FORMATE[format].show`. */
  show: string;
  /** Die Themenzeile aus `short.vorspann`. */
  zeile: string;
  /** Laufzeit des Vorspanns in Bildern. */
  dauer: number;
  /**
   * Ab welchem Bild die Themenzeile steht — **derselbe Wert, ab dem sie
   * gesprochen wird.**
   *
   * Er kommt von aussen und wird hier nicht gerechnet, weil er aus den
   * gemessenen Dauern der festen Aufnahmen faellt (`daten/vorspannton.json`)
   * und die kennt nur `Short.tsx`. Zweimal gerechnet liefen Bild und Ton
   * auseinander — genau das war am 31.08.2026 der Fall: **Die Stimme kam 1,2
   * Sekunden vor der Einblendung.**
   *
   * Ein Anteil der Vorspanndauer hat es nicht getan. Er beschreibt eine
   * Position im Ganzen, und die Ansage haengt an der Laenge der beiden Saetze
   * davor — zwei Groessen, die nichts miteinander zu tun haben.
   */
  zeileAbBild: number;
  /** Höhe der Fläche in Pixeln — für den unteren Rand. */
  hoehe: number;
}> = ({ show, zeile, dauer, hoehe, zeileAbBild }) => {
  const frame = useCurrentFrame();
  const sichtbar = titelstand(frame, dauer);
  const t = anteil(frame, dauer);
  const zeileAuf = interpolate(frame, [zeileAbBild, zeileAbBild + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const figur = (rig: typeof nachleser, s: 'links' | 'rechts', x: number) => {
    const pose = poseAus({ frame, fps: 30, pose: 'winken', vorherigePose: 'ruhe' });
    return (
      <g key={s}>
        <ellipse
          cx={x}
          cy="140"
          rx={34 * WORTWECHSEL.groesse}
          ry={9 * WORTWECHSEL.groesse}
          fill={STOFF.tief}
          opacity={0.55}
        />
        {/*
          **Hier stand ein weisser Umriss, und er war falsch begruendet.**
          Ich hatte ihn mit Kontrast 1,26 verteidigt — gerechnet gegen den
          **Koerper** der Figur, nicht gegen die Figur. Ihr Gesicht steht mit
          **17,1** auf dem Koerper: weisse Augen, weisser Mund, farbiger
          Balken.

          **Eine Figur liest sich ueber ihre Innenzeichnung, nicht ueber ihren
          Umriss.** Der Umriss war die Antwort auf eine Zahl, die die falsche
          Frage beantwortet hat.
        */}
        <g transform={wortwechselTransform(WORTWECHSEL, s)}>
          <Figur rig={rig} pose={pose} />
        </g>
      </g>
    );
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        opacity: sichtbar,
        paddingBottom: Math.round(hoehe * 0.1),
      }}
    >
      <div
        style={{
          flex: '0 0 54%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 9%',
        }}
      >
        <div style={{ fontFamily: SCHRIFT.wortmarke, lineHeight: 1.02 }}>
          {/*
            **Ueber 900 hinaus gibt es kein Schriftgewicht mehr**, und der
            Showtitel stand schon darauf. Der Zuwachs kommt deshalb aus einer
            Kontur in der Textfarbe: Sie sitzt mittig auf der Glyphenkante und
            laesst den Buchstaben um die halbe Strichbreite wachsen.

            Rund 3 % der Schriftgroesse — dieselbe Regel fuer beide Zeilen,
            damit sie zusammen dicker werden und nicht gegeneinander.

            Die Laufweite geht dabei von −4 auf −2 zurueck: Die Kontur braucht
            je Seite zwei Pixel mehr, und bei −4 stiessen die Buchstaben
            aneinander.
          */}
          <div
            style={{
              fontWeight: SCHRIFT.schwarz,
              fontSize: 132,
              letterSpacing: -2,
              color: FARBEN.grundRein,
              WebkitTextStroke: `4px ${FARBEN.grundRein}`,
            }}
          >
            {show}
          </div>
          {/*
            **„mit Volti und Watti", jeder Name in seiner Farbe** — aber in
            der *aufgehellten* Fassung. Die gedämpften Töne der Wortmarke
            haben auf Theaterrot Kontrast 1,06 und 1,90, sind dort also
            unsichtbar. Dieselbe Trennung, die es für Blau seit dem
            24.08.2026 gibt: zwei Rollen, zwei Werte.

            Hier standen zuerst `kennVoltiHell` und `kennWattiHell` mit 3,23
            und 4,36. Diese Zahlen sind gegen die **Grundfarbe** gerechnet, und
            der Stoff ist gefaltet: Gegen den hellsten Ton fallen sie auf
            **1,76** und **2,37**. Dieselbe Sorte Fehler wie beim Saum der
            Figuren — dort gegen den Körper statt gegen die Figur gerechnet,
            hier gegen einen Mittelwert statt gegen einen Verlauf.

            **Der Kontrast gegen einen Farbverlauf ist der gegen seinen
            ungünstigsten Ton.** Jetzt 4,19 und 4,49.
          */}
          <div
            style={{
              /* Die Zeile klebte am Titel — dazwischen lag nur dessen
                 Zeilenhoehe von 1,02. */
              marginTop: 34,
              fontWeight: SCHRIFT.duenn,
              fontSize: 38,
              color: FARBEN.grundRein,
              opacity: 0.86,
            }}
          >
            mit{' '}
            <span style={{ color: FARBEN.blauHell, fontWeight: SCHRIFT.schwarz }}>
              {FIGURENNAMEN.nachleser}
            </span>{' '}
            und{' '}
            <span style={{ color: FARBEN.anzeigeZweiHell, fontWeight: SCHRIFT.schwarz }}>
              {FIGURENNAMEN.zeiger}
            </span>
          </div>
        </div>

        {/*
          Das Themenlabel steht **außerhalb** des geprüften Feldes und ist
          deshalb erlaubt, obwohl das Schema Ankündigungen sperrt: Ein Label
          sagt, *was* kommt; eine Ankündigung nimmt der Behauptung ihre Kraft.
          Die Regel zielte immer auf das Zweite — die Zeile darunter muss
          weiterhin behaupten.
        */}
        <div
          style={{
            /* 130 statt 54: Der Titelblock hatte rund 270 Pixel ungenutzten
               Rand, weil er zentriert stand. Der Abstand fuellt ihn, statt
               die Schrift zu vergroessern. */
            marginTop: 130,
            opacity: zeileAuf,
            fontFamily: SCHRIFT.wortmarke,
            fontWeight: SCHRIFT.schwarz,
            fontSize: 34,
            letterSpacing: 9,
            color: FARBEN.gold,
          }}
        >
          HEUTIGES THEMA
        </div>

        <div
          style={{
            marginTop: 40,
            opacity: zeileAuf,
            fontFamily: SCHRIFT.auszeichnung,
            fontStyle: SCHRIFT.neigung,
            fontWeight: SCHRIFT.schwarz,
            fontSize: zeilengroesse(zeile),
            lineHeight: 1.12,
            color: FARBEN.grundRein,
            maxWidth: '100%',
          }}
        >
          {zeile}
        </div>
      </div>

      {/*
        **Die beiden stehen vor dem Vorhang und stellen sich vor.**

        Sie werden hier eigens gezeichnet und nicht aus der Szene
        durchgereicht: Der Vorspann ist eine geschlossene Karte, die als
        Ganzes ausblendet, bevor der Vorhang fährt. Die Szene dahinter
        zeichnet ihre Figuren an denselben Stellen — beim Öffnen stehen sie
        also schon da, und es gibt keinen Moment leerer Bühne.
      */}
      <svg
        viewBox="0 0 200 150"
        preserveAspectRatio="xMidYMax meet"
        style={{ flex: 1, minHeight: 0, width: '100%' }}
      >
        {figur(VOLTI_AUF_ROT, 'links', WORTWECHSEL.links)}
        {figur(WATTI_AUF_ROT, 'rechts', WORTWECHSEL.rechts)}
      </svg>
    </div>
  );
};

/* ──────────────────────────── Die Abspannkarte ─────────────────────────── */

/**
 * Das letzte Bild: Der Vorhang ist zu, die beiden stehen davor, und das
 * Nachgelesene steht darauf.
 *
 * **Seit dem 01.09.2026.** Der Vorhang faehrt schon seit demselben Tag am Ende
 * wieder zu — er zeigte nur nichts. Die Karte ist die Gegenkarte zum Vorspann:
 * dieselbe Anordnung, dieselben Farben, andere Zeilen.
 *
 * | Vorspann | Abspann |
 * |---|---|
 * | Showtitel, „mit Volti und Watti" | entfaellt |
 * | „HEUTIGES THEMA" | **„WIR HABEN NACHGELESEN"** |
 * | die Themenzeile | **der Schlusssatz** |
 * | — | **Wattis Zeile**, in seiner Kennfarbe |
 *
 * **Der Schlusssatz steht deshalb nicht mehr auf der Buehne.** Er stand dort
 * ueber den Figuren und brauchte einen Schleier, um ueberhaupt lesbar zu sein;
 * auf dem Vorhang hat er eine eigene Flaeche. Der Rundlauf verliert dabei
 * nichts: Das Video beginnt mit geschlossenem Vorhang, und es endet jetzt mit
 * demselben Bild — **der Uebergang in die Wiederholung ist eine Ueberblendung
 * und kein Schnitt.**
 *
 * Die Figuren stehen wie im Vorspann davor, nur in Ruhe statt winkend: Sie
 * haben gerade geredet, ein Winken waere ein zweiter Auftritt.
 */
export const Abspannkarte: React.FC<{
  /** Der Schlusssatz — bis zum 01.09.2026 stand er auf der Buehne. */
  satz: string;
  /** Wattis letztes Wort, aus `short.abspann`. */
  wattis: string;
  /** Laufzeit der Karte in Bildern. */
  dauer: number;
}> = ({ satz, wattis, dauer }) => {
  const frame = useCurrentFrame();

  /*
   * Sie blendet **mit dem Vorhang** auf, nicht danach. Der Stoff braucht
   * `VORHANG.fahrtBilder`, und eine Karte, die erst dann anfaengt, haette auf
   * der letzten Sekunde nichts mehr zu stehen.
   */
  const auf = interpolate(frame, [0, FAHRT_BILDER], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wattiAuf = interpolate(frame, [FAHRT_BILDER, FAHRT_BILDER + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const figur = (rig: typeof nachleser, s: 'links' | 'rechts', x: number) => (
    <g key={s}>
      <ellipse
        cx={x}
        cy="140"
        rx={34 * WORTWECHSEL.groesse}
        ry={9 * WORTWECHSEL.groesse}
        fill={STOFF.tief}
        opacity={0.55}
      />
      <g transform={wortwechselTransform(WORTWECHSEL, s)}>
        <Figur rig={rig} pose={poseAus({ frame, fps: 30, pose: 'ruhe', vorherigePose: 'ruhe' })} />
      </g>
    </g>
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        opacity: auf,
        paddingBottom: Math.round(FORMAT.hoehe * 0.06),
      }}
    >
      <div
        style={{
          flex: '0 0 54%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 9%',
        }}
      >
        {/*
          Dieselbe Zeile an derselben Stelle wie „HEUTIGES THEMA" — und
          derselbe Goldton. Der Spruch ist die Marke; er steht hier nicht als
          Abbinder, sondern als Absender.
        */}
        <div
          style={{
            fontFamily: SCHRIFT.wortmarke,
            fontWeight: SCHRIFT.schwarz,
            fontSize: 34,
            letterSpacing: 9,
            color: FARBEN.gold,
          }}
        >
          WIR HABEN NACHGELESEN
        </div>

        <div
          style={{
            marginTop: 40,
            fontFamily: SCHRIFT.auszeichnung,
            fontStyle: SCHRIFT.neigung,
            fontWeight: SCHRIFT.schwarz,
            fontSize: zeilengroesse(satz),
            lineHeight: 1.12,
            color: FARBEN.grundRein,
            maxWidth: '100%',
          }}
        >
          {satz}
        </div>

        {/*
          Wattis Zeile kommt **nach** dem Satz, nicht mit ihm. Zwei Saetze, die
          gleichzeitig erscheinen, sind ein Absatz; nacheinander sind sie ein
          Wortwechsel — und genau der ist der Kanal.

          In `anzeigeZweiHell`, nicht in seiner gedaempften Kennfarbe: Die
          gedaempften Toene haben auf Theaterrot Kontrast 1,06 und 1,90 und
          sind dort unsichtbar. Dieselbe Trennung wie im Vorspann.
        */}
        <div
          style={{
            marginTop: 34,
            opacity: wattiAuf,
            fontFamily: SCHRIFT.auszeichnung,
            fontStyle: SCHRIFT.neigung,
            fontWeight: SCHRIFT.schwarz,
            fontSize: 44,
            lineHeight: 1.16,
            color: FARBEN.anzeigeZweiHell,
            maxWidth: '100%',
          }}
        >
          {wattis}
        </div>
      </div>

      <svg
        viewBox="0 0 200 150"
        preserveAspectRatio="xMidYMax meet"
        style={{ flex: 1, minHeight: 0, width: '100%' }}
      >
        {figur(VOLTI_AUF_ROT, 'links', WORTWECHSEL.links)}
        {figur(WATTI_AUF_ROT, 'rechts', WORTWECHSEL.rechts)}
      </svg>
    </div>
  );
};
