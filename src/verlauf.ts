import fs from 'node:fs/promises';
import { z } from 'zod';
import { Format,  Sachgebiet, type Short } from './typen';

/**
 * Das Gedaechtnis ueber die Woche hinaus.
 *
 * Ein Lauf kennt seinen Vorgaenger nicht: `skripte/wochenlauf.ts` legt einen
 * Ordner unter `laeufe/` an und liest nie einen frueheren. Damit liessen sich
 * zwei Dinge nicht pruefen — ob die zwei Plaetze ohne Vertiefung wirklich
 * rotieren, und ob ein Thema schon einmal lief.
 *
 * Der zweite Punkt ist der eigentliche Gewinn. Bei rund 260 Videos im Jahr
 * wird sonst irgendwann dasselbe Thema ein zweites Mal vorgeschlagen, einfach
 * weil niemand mehr weiss, was vor vier Monaten lief.
 *
 * **Bewusst nicht unter `laeufe/`.** Der Ordner steht in `.gitignore` mit der
 * Begruendung „gross, reproduzierbar" — fuer Videos richtig, fuer ein
 * Gedaechtnis fatal: Es laege nur auf einem Rechner und waere beim ersten
 * Aufraeumen weg. Deshalb `daten/verlauf.json`, neben dem Ideenvorrat.
 *
 * Der Eintrag ist absichtlich schmal, rund 550 Byte je Lauf. Wer beim
 * Entwerfen die Historie braucht, soll nicht fuenf komplette Laeufe mit allen
 * Sprechtexten lesen muessen — `lauf.json` allein ist 21 KB.
 */

export const VERLAUFSDATEI = 'daten/verlauf.json';

export const Verlaufseintrag = z.object({
  format: Format,
  sachgebiet: Sachgebiet,
  themaId: z.string(),
  /**
   * Die vertonte Laenge in Sekunden — die einzige Zahl hier, die nicht der
   * Wiederholungspruefung dient.
   *
   * Sie steht wegen einer Absicht, die sich sonst nicht halten liesse: Das
   * Zielfenster geht bis 28 Sekunden, aber der Zielwert ist die Mitte bei 23
   * und nicht der Rand — die Vertonung streut rund sechs Prozent, wer an der
   * Kante baut, faellt beim naechsten Lauf heraus. Eine solche Absicht ohne
   * Messwert verliert sich nach drei Wochen. Mit ihr steht im Lauf, wie die
   * Woche gegen die Vorwoche liegt.
   */
  dauerSek: z.number().optional(),
});
export type Verlaufseintrag = z.infer<typeof Verlaufseintrag>;

export const Verlaufslauf = z.object({
  lauf: z.string(),
  shorts: z.array(Verlaufseintrag),
});
export type Verlaufslauf = z.infer<typeof Verlaufslauf>;

const Verlaufsdatei = z.object({
  _hinweis: z.string().optional(),
  laeufe: z.array(Verlaufslauf),
});

/** Liest den Verlauf. Fehlt die Datei, ist der Verlauf leer — kein Fehler. */
export const verlaufLesen = async (datei = VERLAUFSDATEI): Promise<Verlaufslauf[]> => {
  try {
    const roh = JSON.parse(await fs.readFile(datei, 'utf8'));
    return Verlaufsdatei.parse(roh).laeufe;
  } catch (fehler) {
    if ((fehler as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw fehler;
  }
};

/**
 * Traegt einen Lauf nach. Ein bereits vorhandener Lauf gleicher Kennung wird
 * ersetzt — ein wiederholter Lauf am selben Tag soll den Verlauf nicht
 * verdoppeln.
 */
export const verlaufSchreiben = async (
  laufId: string,
  shorts: Short[],
  datei = VERLAUFSDATEI,
): Promise<void> => {
  const bisher = (await verlaufLesen(datei)).filter((l) => l.lauf !== laufId);

  const eintrag: Verlaufslauf = {
    lauf: laufId,
    shorts: shorts.map((s) => ({
      format: s.format,
      sachgebiet: s.sachgebiet,
      themaId: s.themaId,
      // Nur die echte Laenge, nie die geschaetzte: Ein Trockenlauf schreibt
      // ohnehin keinen Verlauf, und eine Schaetzung als Messwert zu fuehren
      // waere schlimmer als gar keiner.
      ...(s.tonspur ? { dauerSek: Math.round(s.tonspur.dauerSek * 10) / 10 } : {}),
    })),
  };

  await fs.writeFile(
    datei,
    JSON.stringify(
      {
        _hinweis:
          'Gedaechtnis ueber die Woche hinaus: welche Rubrik zuletzt ohne Vertiefung lief, welches Thema ' +
          'schon da war, welches Titelmuster sich abnutzt. Wird von skripte/wochenlauf.ts fortgeschrieben. ' +
          'Bewusst ausserhalb von laeufe/, weil das in .gitignore steht.',
        laeufe: [...bisher, eintrag].sort((a, b) => a.lauf.localeCompare(b.lauf)),
      },
      null,
      2,
    ) + '\n',
  );
};

/*
 * Hier stand `zuletztOhneVertiefung`: Sie sagte, welche Rubriken im letzten
 * Lauf ohne Vertiefung liefen, damit die beiden freien Plaetze rotieren.
 * Mit der Vertiefung ist sie am 15.08.2026 entfallen — jetzt ist jeder Short
 * knapp, und es gibt keine freien Plaetze mehr zu verteilen.
 */


/**
 * Durchschnittliche Laenge eines Laufs in Sekunden, oder `null`.
 *
 * `null` heisst „keine belastbare Zahl": Laeufe von vor dem 13.08.2026 haben
 * keine Laengen gespeichert. Eine Null auszugeben waere hier schlimmer als
 * nichts — sie saehe wie ein Fortschritt aus.
 */
export const durchschnittsdauer = (lauf: Verlaufslauf | undefined): number | null => {
  const werte = lauf?.shorts.map((s) => s.dauerSek).filter((d): d is number => typeof d === 'number') ?? [];
  if (werte.length === 0) return null;
  return Math.round((werte.reduce((a, b) => a + b, 0) / werte.length) * 10) / 10;
};

/** Alle Themen, die schon einmal liefen — gegen Wiederholung. */
export const gelaufeneThemen = (verlauf: Verlaufslauf[]): Map<string, string> => {
  const themen = new Map<string, string>();
  for (const lauf of verlauf) {
    for (const short of lauf.shorts) themen.set(short.themaId, lauf.lauf);
  }
  return themen;
};
