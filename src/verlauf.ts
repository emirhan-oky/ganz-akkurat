import fs from 'node:fs/promises';
import { z } from 'zod';
import { Rubrik, Titelmuster, Vertiefung, Winkelart, type Short } from './typen';

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
 * Aufraeumen weg. Deshalb `daten/verlauf.json`, neben `themen.json`.
 *
 * Der Eintrag ist absichtlich schmal, rund 550 Byte je Lauf. Wer beim
 * Entwerfen die Historie braucht, soll nicht fuenf komplette Laeufe mit allen
 * Sprechtexten lesen muessen — `lauf.json` allein ist 21 KB.
 */

export const VERLAUFSDATEI = 'daten/verlauf.json';

export const Verlaufseintrag = z.object({
  rubrik: Rubrik,
  themaId: z.string(),
  winkelart: Winkelart,
  titelmuster: Titelmuster,
  vertiefung: Vertiefung.optional(),
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
      rubrik: s.rubrik,
      themaId: s.themaId,
      winkelart: s.winkelart,
      titelmuster: s.titelmuster,
      ...(s.vertiefung ? { vertiefung: s.vertiefung } : {}),
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

/**
 * Rubriken, die im zuletzt eingetragenen Lauf ohne Vertiefung waren.
 *
 * Grundlage des Rotationshinweises: Die zwei freien Plaetze sollen wandern,
 * damit nicht immer dieselben Rubriken flach bleiben — und das waeren
 * erfahrungsgemaess die schwierigsten Themen, also die, bei denen Tiefe am
 * meisten brauecht wird.
 */
export const zuletztOhneVertiefung = (verlauf: Verlaufslauf[]): Set<Rubrik> => {
  const letzter = verlauf[verlauf.length - 1];
  if (!letzter) return new Set();
  return new Set(letzter.shorts.filter((s) => !s.vertiefung).map((s) => s.rubrik));
};

/** Alle Themen, die schon einmal liefen — gegen Wiederholung. */
export const gelaufeneThemen = (verlauf: Verlaufslauf[]): Map<string, string> => {
  const themen = new Map<string, string>();
  for (const lauf of verlauf) {
    for (const short of lauf.shorts) themen.set(short.themaId, lauf.lauf);
  }
  return themen;
};
