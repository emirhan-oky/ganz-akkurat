import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, FARBEN, GROESSEN, SCHRIFT, SICHERE_ZONE } from '../../src/marke';
import type { Untertitelwort } from '../../src/typen';

/**
 * Wortgenaue Untertitel.
 *
 * Ein grosser Teil der Zuschauer sieht Shorts ohne Ton — der Untertitel ist
 * damit nicht Beiwerk, sondern der Haupttraeger. Die Zeitstempel stammen aus
 * der Sprachsynthese selbst, nicht aus einer nachtraeglichen Erkennung, sind
 * also exakt statt geschaetzt.
 */

/**
 * Wie viele Zeichen eine Gruppe hoechstens umfasst.
 *
 * Von 20 auf 28 erhoeht am 13.08.2026: Drei Woerter wechselten so schnell,
 * dass die untere Bildhaelfte staendig flackerte. Vier Woerter stehen ruhiger,
 * ohne dass man dem Text hinterherliest — bei 66 Pixel Schrift passen sie
 * immer noch in eine Zeile.
 */
const MAX_ZEICHEN_PRO_GRUPPE = 28;
/** Wie viele Woerter eine Gruppe hoechstens umfasst. */
const MAX_WOERTER_PRO_GRUPPE = 4;

type Gruppe = {
  woerter: Untertitelwort[];
  startSek: number;
  endeSek: number;
};

/**
 * Fasst Woerter zu lesbaren Haeppchen zusammen. Eine spuerbare Sprechpause
 * beendet eine Gruppe immer — so folgt der Untertitel dem Satzrhythmus statt
 * stur einem Zeichenzaehler.
 */
export const gruppiere = (woerter: Untertitelwort[]): Gruppe[] => {
  const gruppen: Gruppe[] = [];
  let aktuell: Untertitelwort[] = [];

  const abschliessen = () => {
    if (aktuell.length === 0) return;
    const erstes = aktuell[0]!;
    const letztes = aktuell[aktuell.length - 1]!;
    gruppen.push({ woerter: aktuell, startSek: erstes.startSek, endeSek: letztes.endeSek });
    aktuell = [];
  };

  for (const wort of woerter) {
    const vorheriges = aktuell[aktuell.length - 1];
    const pause = vorheriges ? wort.startSek - vorheriges.endeSek : 0;
    const zeichen = aktuell.reduce((n, w) => n + w.wort.length + 1, 0) + wort.wort.length;

    const zuLang = zeichen > MAX_ZEICHEN_PRO_GRUPPE;
    const zuViele = aktuell.length >= MAX_WOERTER_PRO_GRUPPE;
    const satzende = vorheriges ? /[.!?:]$/.test(vorheriges.wort) : false;

    if (aktuell.length > 0 && (zuLang || zuViele || satzende || pause > 0.28)) {
      abschliessen();
    }
    aktuell.push(wort);
  }
  abschliessen();

  return gruppen;
};

export const Untertitel: React.FC<{ woerter: Untertitelwort[] }> = ({ woerter }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sekunde = frame / fps;

  if (woerter.length === 0) return null;

  const gruppen = gruppiere(woerter);

  // Die Gruppe bleibt bis zum Beginn der naechsten stehen. Sonst blitzt der
  // Untertitel in Atempausen weg und das Bild wirkt unruhig.
  const index = gruppen.findIndex((g, i) => {
    const naechste = gruppen[i + 1];
    return sekunde >= g.startSek && (naechste ? sekunde < naechste.startSek : sekunde <= g.endeSek + 0.6);
  });
  if (index === -1) return null;
  const gruppe = gruppen[index]!;

  /*
   * Die Schriftgroesse richtet sich nach dem **laengsten Wort**, nicht nach
   * der Gesamtlaenge — dieselbe Rechnung wie bei der Hook, und aus demselben
   * Grund: Ein langer Satz bricht um, ein langes Wort nicht.
   *
   * Der Anlass war „zweitausendzweiundzwanzig", 25 Zeichen am Stueck. Bei 66
   * Pixeln lief das Wort ueber die Buehne hinaus, und der blaue Balken des
   * aktiven Wortes machte den Ueberlauf erst richtig sichtbar. Ausgeschriebene
   * Jahreszahlen sind hier keine Ausnahme, sondern die Regel: Die Vertonung
   * braucht sie, damit die Stimme sie richtig liest.
   *
   * 960 Pixel nutzbare Breite bei rund 0,62 Pixel Laufweite je Punkt
   * Schriftgroesse und Zeichen.
   */
  const laengstesWort = Math.max(...gruppe.woerter.map((w) => w.wort.length));
  const groesse = Math.min(GROESSEN.untertitel, Math.floor(960 / (laengstesWort * 0.62)));

  return (
    <div
      style={{
        position: 'absolute',
        left: ABSTAND.l,
        right: SICHERE_ZONE.rechts - ABSTAND.m,
        /*
         * Innerhalb der sicheren Zone, nicht darunter.
         *
         * Bis zum 13.08.2026 sass der Untertitel 380 Pixel **unterhalb** der
         * Zonengrenze, begruendet damit, er duerfe „als Letztes verdeckt
         * werden". Das war falsch herum gedacht: Ein grosser Teil der
         * Zuschauer sieht Shorts ohne Ton, damit ist der Untertitel der
         * Haupttraeger — und ausgerechnet der lag in dem Bereich, den Reels
         * mit Beschreibung und Tonzeile ueberdeckt.
         *
         * Jetzt schliesst er unten an die Buehne an, im selben Rahmen, in dem
         * auch die Szenen rendern.
         */
        bottom: SICHERE_ZONE.unten + ABSTAND.m,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          /*
           * 24 statt 14 Pixel, seit die Untertitel kursiv gesetzt sind. Eine
           * kursive Schrift neigt ihre Buchstaben nach rechts, und das letzte
           * Zeichen eines Wortes ragt damit in den Zwischenraum. Beim aktiven
           * Wort kommt der blaue Kasten dazu, der mit `margin: -10px` bewusst
           * ueber die Wortkante hinausgeht — „einundsechzig" klebte an
           * „Sekunden.".
           */
          gap: '0 24px',
          maxWidth: '100%',
        }}
      >
        {gruppe.woerter.map((w, i) => {
          const aktiv = sekunde >= w.startSek && sekunde <= w.endeSek;
          return (
            <span
              key={`${w.wort}-${i}`}
              style={{
                /*
                 * Eigene Schrift, nicht Inter in einer anderen Staerke. Die
                 * Begruendung samt Vergleich steht bei `SCHRIFT.untertitel`.
                 * Archivo Black hat genau einen Schnitt — `fontWeight` waere
                 * hier ohne Wirkung und stuende nur als falscher Hinweis da.
                 */
                fontFamily: SCHRIFT.untertitel,
                fontStyle: SCHRIFT.neigung,
                fontWeight: SCHRIFT.schwarz,
                fontSize: groesse,
                lineHeight: 1.18,
                /*
                 * Auf dem Akzentbalken steht die **Grundfarbe**, nicht Weiss.
                 * Seit dem 24.08.2026 ist der Akzent gelb, und Weiss auf Gelb
                 * traegt nichts — dieselbe Rechnung, die den ganzen
                 * Farbwechsel ausgeloest hat, nur eine Ebene tiefer.
                 */
                color: aktiv ? FARBEN.grund : FARBEN.tinte,
                letterSpacing: -1,
                /*
                 * Das aktive Wort steht auf einem blauen Balken, nicht nur in
                 * Blau. Am 18.08.2026 im fertigen Video gesehen: „#2C5EFF" auf
                 * dem hellen Markengrund traegt zu wenig, und die helle Aura
                 * darunter — gegen Zeichnungen gebaut — frisst den Rest des
                 * Kontrasts weg. Weiss auf Blau kehrt das Verhaeltnis um und
                 * macht zugleich sichtbarer, welches Wort gerade faellt.
                 */
                backgroundColor: aktiv ? FARBEN.blau : 'transparent',
                padding: aktiv ? '0 10px' : 0,
                margin: aktiv ? '0 -10px' : 0,
                borderRadius: 8,
                /*
                 * Kontrast am Text statt am Kasten.
                 *
                 * Der weisse Kasten ist gestrichen: Er brachte kaum Kontrast,
                 * kostete aber Flaeche und sah aus wie ein aufgeklebtes
                 * Etikett. Sein eigentlicher Zweck — Lesbarkeit ueber
                 * unruhigem Untergrund — wird gebraucht, weil unter dem
                 * Untertitel Zeichnungen stehen koennen. Eine Aura in der
                 * Grundfarbe traegt ueber Linien und Flaechen, ohne Platz zu
                 * belegen.
                 *
                 * **Die Aura kommt aus `FARBEN.grund`, nicht als fester
                 * rgba-Wert.** Bis zum 24.08.2026 stand hier `247,248,250`
                 * ausgeschrieben — der alte helle Grund. Nach der Umkehr auf
                 * Nachtblau leuchtete der Untertitel weiss aus dem Bild, und
                 * genau so sah es auch aus: wie ein Fehler im Render.
                 */
                textShadow: aktiv
                  ? 'none'
                  : [
                      `0 0 10px ${FARBEN.grund}FA`,
                      `0 0 20px ${FARBEN.grund}EB`,
                      `0 2px 4px ${FARBEN.grund}`,
                    ].join(', '),
              }}
            >
              {w.wort}
            </span>
          );
        })}
      </div>
    </div>
  );
};
