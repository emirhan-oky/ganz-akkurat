import React, { createContext, useContext } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ZUGARTEN, type Sprecher, type Tonspur, type Untertitelwort } from '../../src/typen';

/**
 * Wer gerade spricht — auf der **absoluten** Zeitachse des Shorts.
 *
 * ## Warum ein Context und keine Prop
 *
 * Der Weg von `Short.tsx` bis zur Figur ist vier Ebenen lang: Short →
 * `SzeneRendern` → `Illustration` → `Buehnenbild` → `Figurenbuehne`. Drei
 * dieser Ebenen haetten eine Angabe durchgereicht, die sie nichts angeht, und
 * jede kuenftige Zwischenebene muesste daran denken. Genau die Sorte Kopplung,
 * an der hier schon die Symbolposition dreimal gescheitert ist.
 *
 * ## Warum der Stand oben gerechnet wird
 *
 * `useCurrentFrame()` liefert **innerhalb** einer `Sequence` das Bild seit
 * deren Beginn, nicht seit dem Anfang des Videos. Die Abschnitte der Tonspur
 * tragen aber absolute Startsekunden. Wer den Sprecher in der Szene rechnete,
 * vergliche zwei verschiedene Uhren — der Fehler faellt bei der ersten Szene
 * nicht auf und bei jeder weiteren umso mehr.
 *
 * Der Provider sitzt deshalb dort, wo `Short.tsx` ohnehin schon mit dem
 * absoluten Bild rechnet: neben der sichtbaren Zaehlung, aus demselben Grund.
 */
const SprecherContext = createContext<Sprecher | undefined>(undefined);

/**
 * Ob dieser Short unten eine Untertitelzone braucht.
 *
 * **Eine Eigenschaft des Shorts, nicht des Bildes.** Sie steht deshalb hier
 * und nicht in `Buehne.tsx`: Dort waere sie eine Prop, die drei Ebenen
 * durchgereicht werden muesste, und sie aendert sich innerhalb eines Shorts
 * nie — im Gegensatz zum Sprecher, der mit jedem Bild wechseln kann.
 *
 * Die Vorgabe ist `true`, also die alte Aufteilung. Wer `Buehne` ausserhalb
 * eines Shorts rendert — jede Probe tut das —, bekommt damit das Verhalten von
 * vor dem 31.08.2026 und nicht versehentlich eine andere Geometrie.
 */
const UntertitelzoneContext = createContext<boolean>(true);

/**
 * Die Wortzeitstempel des Shorts, fuer den Lippensync.
 *
 * **Absolut, nicht je Szene.** `useCurrentFrame()` zaehlt innerhalb einer
 * `Sequence` ab deren Beginn; die Woerter tragen die Zeit seit Videostart. Wer
 * beides mischt, bekommt einen Mund, der in der ersten Szene passt und in
 * jeder weiteren um die Szenenlaenge daneben liegt.
 *
 * Deshalb liegt hier **die Liste** und nicht das Ergebnis: Der Vergleich muss
 * dort passieren, wo das absolute Bild bekannt ist, und die Buehne kennt nur
 * ihr eigenes. Sie bekommt die Sekunde ueber `useSprechsekunde`.
 */
const WoerterContext = createContext<Untertitelwort[] | undefined>(undefined);
const SekundeContext = createContext<number>(0);

/**
 * Der Sprecher zu dieser Sekunde: der letzte Abschnitt, dessen Start erreicht
 * ist.
 *
 * Zwischen zwei Abschnitten liegt eine Pause. In ihr bleibt der **vorige**
 * Sprecher stehen — sonst erlischt in jeder Atempause der Name, und ein
 * Namensschild, das blinkt, sieht nach Fehler aus statt nach Wechsel.
 */
export const sprecherZu = (
  abschnitte: NonNullable<Tonspur['abschnitte']>,
  sekunde: number,
): Sprecher => {
  let wer = abschnitte[0]!.sprecher;
  for (const a of abschnitte) if (sekunde >= a.startSek) wer = a.sprecher;
  return wer;
};

/**
 * Wie lange ein Sprecherwechsel braucht, bis er im Bild angekommen ist.
 *
 * **Vorher gab es diesen Wert nicht, und das war der Fehler.** Hinlehnen,
 * Blickrichtung und Namensschild sprangen in **einem einzigen Bild** um — bei
 * der Neigung sind das 3 Grad Unterschied zwischen den beiden Figuren, ohne
 * jede Zwischenstufe. Es waren die einzigen Bewegungen im ganzen Projekt, die
 * nicht ueber Frames liefen, und im fertigen Video gehoerten sie zu dem, was
 * als „alles zappelt" auffiel.
 *
 * 0,25 s sind rund acht Bilder: lang genug, dass das Auge eine Bewegung sieht
 * statt eines Schnitts, kurz genug, dass die Zuwendung noch zur Silbe gehoert.
 */
const UEBERGANG_SEK = 0.25;

/**
 * Wie stark diese Figur gerade spricht — 0 bis 1 statt ja oder nein.
 *
 * Der Wert haengt am **letzten Wechsel**, nicht am Abschnitt: Redet dieselbe
 * Figur ueber zwei Abschnitte weiter, gibt es nichts zu ueberblenden, und ein
 * Wert je Abschnitt liesse sie bei jedem Szenenschnitt neu „anlaufen".
 */
export const sprechstaerke = (
  abschnitte: NonNullable<Tonspur['abschnitte']>,
  sekunde: number,
  wer: Sprecher,
): number => {
  let laufend = abschnitte[0]!.sprecher;
  let wechselBei = abschnitte[0]!.startSek;
  for (const a of abschnitte) {
    if (sekunde < a.startSek) break;
    if (a.sprecher !== laufend) {
      laufend = a.sprecher;
      wechselBei = a.startSek;
    }
  }
  const t = Math.min(1, Math.max(0, (sekunde - wechselBei) / UEBERGANG_SEK));
  return wer === laufend ? t : 1 - t;
};

/**
 * Wie aufgerichtet diese Figur gerade steht — aus dem Zug ihres letzten
 * Abschnitts, ueberblendet wie die Sprechstaerke.
 *
 * **Der Wert haengt an der Figur, nicht am Zeitpunkt.** Wer schweigt, behaelt
 * die Haltung seines letzten Zuges: Ein Widerspruch, der beim ersten Wort der
 * Antwort wieder zusammensinkt, waere kein Widerspruch, sondern ein Zucken.
 *
 * Ueberblendet ueber dieselben `UEBERGANG_SEK` wie alles andere am Wechsel.
 * Ohne die Rampe spraenge die Oberkante um 16 Pixel in einem Bild — genau der
 * Fehler, den `UEBERGANG_SEK` bei Neigung und Namensschild schon behoben hat.
 */
export const aufrichtung = (
  abschnitte: NonNullable<Tonspur['abschnitte']>,
  sekunde: number,
  wer: Sprecher,
): number => {
  let ziel = 0;
  let vorher = 0;
  let abBei = abschnitte[0]!.startSek;
  for (const a of abschnitte) {
    if (sekunde < a.startSek) break;
    if (a.sprecher !== wer) continue;
    /*
     * Ohne Zug steht die Figur neutral. Alte Renderdaten kennen das Feld
     * nicht — siehe die Begruendung an `Tonspur.abschnitte.zug`.
     */
    const neu = a.zug ? (ZUGARTEN[a.zug].aufrichtung ?? 0) : 0;
    if (neu !== ziel) {
      vorher = ziel;
      ziel = neu;
      abBei = a.startSek;
    }
  }
  const t = Math.min(1, Math.max(0, (sekunde - abBei) / UEBERGANG_SEK));
  return vorher + (ziel - vorher) * t;
};

const StaerkeContext = createContext<((wer: Sprecher) => number) | undefined>(undefined);
const AufrichtungContext = createContext<((wer: Sprecher) => number) | undefined>(undefined);

/** Die weiche Aufrichtung, oder `undefined` im einstimmigen Fall. */
export const useAufrichtung = (): ((wer: Sprecher) => number) | undefined =>
  useContext(AufrichtungContext);

/**
 * Die weiche Sprechstaerke, oder `undefined` im einstimmigen Fall.
 *
 * Wer sie nicht bekommt, faellt auf `useSprecher()` zurueck — dort ist der
 * harte Wert richtig, weil es keinen Wechsel gibt, den man ueberblenden
 * koennte.
 */
export const useSprechstaerke = (): ((wer: Sprecher) => number) | undefined =>
  useContext(StaerkeContext);

export const Sprecherstand: React.FC<{
  abschnitte?: Tonspur['abschnitte'];
  /** Die Wortzeitstempel des ganzen Shorts. Ohne sie klappt der Mund blind. */
  woerter?: Untertitelwort[];
  children: React.ReactNode;
}> = ({ abschnitte, woerter, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  /*
   * Ohne Abschnitte gibt es keinen Wechsel, also auch keinen Stand. Der
   * einstimmige Fall bekommt `undefined` und nicht etwa `nachleser`: Ein
   * Name, der dauerhaft leuchtet, behauptet einen Sprecherwechsel, den es
   * nicht gibt.
   */
  const zweistimmig = (abschnitte?.length ?? 1) > 1;
  const wer = zweistimmig && abschnitte ? sprecherZu(abschnitte, frame / fps) : undefined;
  const staerke =
    zweistimmig && abschnitte
      ? (figur: Sprecher) => sprechstaerke(abschnitte, frame / fps, figur)
      : undefined;
  const haltung =
    zweistimmig && abschnitte
      ? (figur: Sprecher) => aufrichtung(abschnitte, frame / fps, figur)
      : undefined;

  return (
    <UntertitelzoneContext.Provider value={!zweistimmig}>
      <WoerterContext.Provider value={woerter}>
        <SekundeContext.Provider value={frame / fps}>
          <StaerkeContext.Provider value={staerke}>
            <AufrichtungContext.Provider value={haltung}>
              <SprecherContext.Provider value={wer}>{children}</SprecherContext.Provider>
            </AufrichtungContext.Provider>
          </StaerkeContext.Provider>
        </SekundeContext.Provider>
      </WoerterContext.Provider>
    </UntertitelzoneContext.Provider>
  );
};

/** `undefined`, solange der Short einstimmig ist. */
export const useSprecher = (): Sprecher | undefined => useContext(SprecherContext);

/** `true`, solange unten ein Untertitel steht und Platz braucht. */
export const useUntertitelzone = (): boolean => useContext(UntertitelzoneContext);

/** Die Wortzeitstempel — `undefined` ohne Tonspur, also in jeder Probe. */
export const useWoerter = (): Untertitelwort[] | undefined => useContext(WoerterContext);

/** Die Sekunde seit Videostart, nicht seit Szenenstart. */
export const useSprechsekunde = (): number => useContext(SekundeContext);
