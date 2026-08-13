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
          gap: '0 14px',
          maxWidth: '100%',
        }}
      >
        {gruppe.woerter.map((w, i) => {
          const aktiv = sekunde >= w.startSek && sekunde <= w.endeSek;
          return (
            <span
              key={`${w.wort}-${i}`}
              style={{
                fontFamily: SCHRIFT.familie,
                fontWeight: SCHRIFT.fett,
                fontSize: GROESSEN.untertitel,
                lineHeight: 1.18,
                color: aktiv ? FARBEN.blau : FARBEN.tinte,
                letterSpacing: -1,
                /*
                 * Kontrast am Text statt am Kasten.
                 *
                 * Der weisse Kasten ist gestrichen: Auf dem hellen Grund der
                 * Marke brachte er kaum Kontrast, kostete aber Flaeche und sah
                 * aus wie ein aufgeklebtes Etikett. Sein eigentlicher Zweck —
                 * Lesbarkeit ueber unruhigem Untergrund — wird jetzt erst
                 * gebraucht, weil unter dem Untertitel Zeichnungen stehen
                 * koennen. Eine Aura in der Grundfarbe traegt ueber Linien und
                 * Flaechen, ohne Platz zu belegen.
                 */
                textShadow: [
                  '0 0 10px rgba(247,248,250,0.98)',
                  '0 0 20px rgba(247,248,250,0.92)',
                  '0 2px 4px rgba(247,248,250,1)',
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
