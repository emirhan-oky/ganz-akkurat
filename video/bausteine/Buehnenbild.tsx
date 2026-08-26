import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { FARBEN, SCHRIFT } from '../../src/marke';
import type { Buehnenbild as BuehnenbildDaten, KontextArt } from '../../src/typen';
import type { PosenName } from '../../src/figur';
import { nachleser } from '../../daten/figur/nachleser';
import { ZEIGER_STAUCHUNG, zeiger } from '../../daten/figur/zeiger';
import { Figur } from './Figur';
import { Symbole } from './Geraete';
import { Kamera } from './Kamera';
import { poseAus } from './posen';
import { Blatt } from './Requisiten';

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
const WORTWECHSEL = {
  links: 42,
  rechts: 158,
  ziel: { x: 100, y: 84, zoom: 1.06 },
} as const;

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
  });
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
}> = ({ buehne, dauer }) => {
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
  const gegenpose = gegenkette ? poseDerKette(gegenkette, gegenstarts, frame, fps) : undefined;

  // Wer die Posen oben traegt, bekommt sein Rig; das Gegenueber das andere.
  const eigenes = (buehne.wer ?? 'nachleser') === 'zeiger' ? zeiger : nachleser;
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
  const ziel = gegenpose ? WORTWECHSEL.ziel : platz.ziel;

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
        <Kamera dauer={dauer} von={{ zoom: 1 }} nach={ziel}>
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
              <ellipse cx={WORTWECHSEL.links} cy="140" rx="34" ry="9" fill={FARBEN.flaeche} opacity={0.5} />
              <ellipse cx={WORTWECHSEL.rechts} cy="140" rx="34" ry="9" fill={FARBEN.flaeche} opacity={0.5} />
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
              <Figur rig={eigenes} pose={pose} requisiten={gehalten} />
            </g>
          ) : (
            <>
              <g transform={`translate(${WORTWECHSEL.links - 100} 0)`}>
                <g transform={eigenes === zeiger ? ZEIGER_STAUCHUNG : undefined}>
                  <Figur rig={eigenes} pose={pose} requisiten={gehalten} />
                </g>
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
              <g
                transform={`translate(${WORTWECHSEL.rechts - 100} 0) translate(100 0) scale(-1 1) translate(-100 0)`}
              >
                <g transform={anderes === zeiger ? ZEIGER_STAUCHUNG : undefined}>
                  <Figur rig={anderes} pose={gegenpose} />
                </g>
              </g>
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

export const Buehnenbild: React.FC<{ buehne: BuehnenbildDaten; dauer: number }> = ({ buehne, dauer }) => {
  switch (buehne.art) {
    case 'figur':
      return <Figurenbuehne buehne={buehne} dauer={dauer} />;
    case 'gegenueber':
      return <Gegenueber buehne={buehne} dauer={dauer} />;
  }
};
