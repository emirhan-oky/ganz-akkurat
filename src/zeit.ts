import { FORMAT } from './marke';
import type { Short, Szene } from './typen';

/**
 * Zeitberechnung eines Shorts.
 *
 * Solange keine Tonspur vorliegt, wird die Sprechdauer aus der Textlaenge
 * geschaetzt — damit laesst sich ein Skript im Studio schon vor der
 * Vertonung ansehen. Sobald die Sprachsynthese gelaufen ist, gelten
 * ausschliesslich deren echte Zeitstempel. Geschaetzt wird also nie
 * gerendert, nur vorschaubar gemacht.
 */

/**
 * Sprechgeschwindigkeit in Zeichen pro Sekunde.
 * Deutsche Erzaehlstimme in lockerem Tempo liegt bei rund 15 Zeichen/s.
 */
const ZEICHEN_PRO_SEKUNDE = 15;

/** Kurze Atempause nach jeder Szene, damit Schnitte nicht auf dem Wort sitzen. */
const PAUSE_NACH_SZENE_SEK = 0.32;

/** Untergrenzen je Szenenart: manche Bilder brauchen Zeit, egal wie kurz der Text ist. */
const MINDESTDAUER_SEK: Record<Szene['art'], number> = {
  hook: 1.8,
  aussage: 1.6,
  zahl: 2.2,
  vergleich: 4.0,
  checkliste: 4.0,
  warnung: 3.0,
  anschluss: 4.5,
  cta: 2.2,
};

/** Geschaetzte Sprechdauer einer einzelnen Szene in Sekunden. */
export const geschaetzteSzenendauer = (szene: Szene): number => {
  const sprechdauer = szene.sprechtext.length / ZEICHEN_PRO_SEKUNDE;
  return Math.max(MINDESTDAUER_SEK[szene.art], sprechdauer) + PAUSE_NACH_SZENE_SEK;
};

/**
 * Startzeit und Dauer jeder Szene in Bildern.
 * Nutzt echte Zeitstempel, sobald die Tonspur vorliegt.
 */
export const szenenZeitplan = (short: Short): { startBild: number; dauerBilder: number }[] => {
  const fps = FORMAT.bilderProSekunde;

  if (short.tonspur) {
    const { szenenStartSek, dauerSek } = short.tonspur;
    return szenenStartSek.map((start, i) => {
      const naechster = szenenStartSek[i + 1] ?? dauerSek;
      return {
        startBild: Math.round(start * fps),
        dauerBilder: Math.max(1, Math.round((naechster - start) * fps)),
      };
    });
  }

  let laufend = 0;
  return short.szenen.map((szene) => {
    const dauer = geschaetzteSzenendauer(szene);
    const eintrag = {
      startBild: Math.round(laufend * fps),
      dauerBilder: Math.max(1, Math.round(dauer * fps)),
    };
    laufend += dauer;
    return eintrag;
  });
};

/** Gesamtlaenge des Shorts in Bildern. */
export const gesamtdauerBilder = (short: Short): number => {
  if (short.tonspur) {
    // Etwas Nachlauf, damit die Endkarte nicht auf dem letzten Wort abreisst.
    return Math.round((short.tonspur.dauerSek + 0.8) * FORMAT.bilderProSekunde);
  }
  const plan = szenenZeitplan(short);
  const letzter = plan[plan.length - 1];
  return letzter ? letzter.startBild + letzter.dauerBilder : FORMAT.bilderProSekunde;
};

/**
 * Plattformgrenzen. Shorts unter 15 Sekunden wirken abgehackt, ueber 60
 * Sekunden verlieren sie auf allen drei Plattformen deutlich an Reichweite.
 */
export const LAENGE_SEK = { minimum: 15, ziel: [25, 45] as const, maximum: 59 } as const;
