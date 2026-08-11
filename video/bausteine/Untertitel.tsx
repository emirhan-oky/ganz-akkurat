import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, FARBEN, GROESSEN, RADIUS, SCHRIFT, SICHERE_ZONE } from '../../src/marke';
import type { Untertitelwort } from '../../src/typen';

/**
 * Wortgenaue Untertitel.
 *
 * Ein grosser Teil der Zuschauer sieht Shorts ohne Ton — der Untertitel ist
 * damit nicht Beiwerk, sondern der Haupttraeger. Die Zeitstempel stammen aus
 * der Sprachsynthese selbst, nicht aus einer nachtraeglichen Erkennung, sind
 * also exakt statt geschaetzt.
 */

/** Wie viele Zeichen eine Gruppe hoechstens umfasst. */
const MAX_ZEICHEN_PRO_GRUPPE = 20;
/** Wie viele Woerter eine Gruppe hoechstens umfasst. */
const MAX_WOERTER_PRO_GRUPPE = 3;

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
        // Direkt unterhalb der Buehne: nah genug am Bildinhalt, aber noch
        // ueber dem Bereich, den Reels mit eigener Oberflaeche zudeckt.
        bottom: SICHERE_ZONE.unten - 380,
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
          backgroundColor: FARBEN.grundRein,
          padding: `${ABSTAND.s}px ${ABSTAND.m}px`,
          borderRadius: RADIUS.m,
          boxShadow: '0 8px 28px rgba(17,24,32,0.10)',
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
