import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { Buffer } from 'node:buffer';
import { promisify } from 'node:util';
import ffmpegPfad from 'ffmpeg-static';
import ffprobePaket from 'ffprobe-static';
import { FORMAT } from './marke';
import { LAENGE_SEK } from './zeit';

const ausfuehren = promisify(execFile);
const FFMPEG = ffmpegPfad as unknown as string;
const FFPROBE = ffprobePaket.path;

/**
 * Nachbearbeitung und technische Endkontrolle.
 *
 * ffmpeg und ffprobe kommen als npm-Abhaengigkeit mit dem Projekt, nicht
 * ueber eine systemweite Installation. Damit ist die Version an das Projekt
 * gebunden, es braucht kein Administratorrecht, und der Lauf verhaelt sich
 * auf jedem Rechner gleich.
 */

/**
 * Zielwerte fuer Sprachlautheit.
 *
 * Alle drei Plattformen regeln die Lautstaerke beim Abspielen auf etwa
 * -14 LUFS nach. Wer lauter anliefert, wird heruntergeregelt und klingt
 * danach flach; wer leiser anliefert, wirkt neben dem naechsten Video im
 * Feed schwach. Der wahre Spitzenpegel bleibt unter -1 dBTP, damit die
 * Umwandlung der Plattformen nicht uebersteuert.
 */
const LAUTHEIT = { ziel: -14, spitze: -1.5, umfang: 11 } as const;

/**
 * Gleicht die Lautheit einer Tondatei an.
 *
 * Zwei Durchgaenge: Der erste misst, der zweite korrigiert mit den
 * gemessenen Werten. Ein einzelner Durchgang schaetzt nur und trifft den
 * Zielwert bei kurzen Aufnahmen oft um mehrere Dezibel daneben.
 */
export const lautheitAngleichen = async (quelle: string, ziel: string): Promise<{ vorher: number; nachher: number }> => {
  const messen = await ausfuehren(FFMPEG, [
    '-i', quelle,
    '-af', `loudnorm=I=${LAUTHEIT.ziel}:TP=${LAUTHEIT.spitze}:LRA=${LAUTHEIT.umfang}:print_format=json`,
    '-f', 'null', '-',
  ]).catch((f: { stderr?: string }) => ({ stdout: '', stderr: f.stderr ?? '' }));

  // ffmpeg schreibt die Messung als JSON-Block ans Ende der Fehlerausgabe.
  const block = messen.stderr.slice(messen.stderr.lastIndexOf('{'));
  const gemessen = JSON.parse(block) as {
    input_i: string;
    input_tp: string;
    input_lra: string;
    input_thresh: string;
    target_offset: string;
  };

  await ausfuehren(FFMPEG, [
    '-y', '-i', quelle,
    '-af',
    `loudnorm=I=${LAUTHEIT.ziel}:TP=${LAUTHEIT.spitze}:LRA=${LAUTHEIT.umfang}` +
      `:measured_I=${gemessen.input_i}:measured_TP=${gemessen.input_tp}` +
      `:measured_LRA=${gemessen.input_lra}:measured_thresh=${gemessen.input_thresh}` +
      `:offset=${gemessen.target_offset}:linear=true`,
    '-ar', '44100', '-b:a', '192k',
    ziel,
  ]);

  return { vorher: Number(gemessen.input_i), nachher: LAUTHEIT.ziel };
};

/**
 * Wie leise es sein muss, um als Stille zu gelten, und wie kurz es sein darf.
 *
 * -40 dB ist die Schwelle, mit der die Luecken am 31.08.2026 gemessen wurden;
 * darunter liegt bei diesen Aufnahmen nur Grundrauschen. 0,03 s ist kurz genug,
 * um auch den Vorlauf zu erwischen, und lang genug, um nicht in einer Pause
 * zwischen zwei Woertern anzuschlagen.
 */
const STILLE_DB = -40;
const STILLE_MIN_SEK = 0.03;

/**
 * Schneidet Vorlauf- und Endstille einer Sprachaufnahme weg.
 *
 * ## Warum das noetig ist
 *
 * **ElevenLabs legt in jede Datei Stille**, und niemand hat sie je entfernt.
 * Gemessen am ersten fertigen Video (31.08.2026, `passwort-wechseln`, elf
 * Abschnitte): Vorlauf 0 bis 0,12 s, Endstille 0,03 bis **2,07 s**.
 *
 * Die Folge stand im Vertrag als 0,28 s Sprecherwechsel und war in Wirklichkeit
 * im Mittel **0,42 s, in der Spitze 0,61** — zusammen **4,19 Sekunden Stille in
 * einem Video von 53 Sekunden**, also 7,9 %. Das Urteil dazu lautete „das
 * klingt sehr schlimm", und es war richtig: Die bestellte Pause war der
 * **kleinere** Teil der Luecke.
 *
 * **Die Wortzeitstempel zeigen es nicht.** Die Zeichenausrichtung dehnt das
 * letzte Wort ueber die Endstille — „deiner?" steht dort mit 3,57 bis 6,08 s,
 * real endet die Sprache bei 4,04. Wer nach `woerter` rechnet, bekommt ueberall
 * saubere 0,28 s heraus und misst ein Artefakt. Deshalb wird hier an der Datei
 * gemessen und nicht an der Ausrichtung.
 *
 * ## Was hier nicht passiert
 *
 * **Stille im Inneren bleibt.** Beschnitten werden nur die beiden Enden. Eine
 * Pause mitten im Satz ist Betonung, und `<break>`-Tags bestellen sie
 * ausdruecklich — sie herauszuschneiden hiesse, die Denkpause abzuschaffen.
 *
 * Gibt die neue Dauer zurueck, denn die Uhr in `shortVertonen` rechnet mit ihr
 * weiter. Findet ffmpeg keine Stille, bleibt die Datei unveraendert.
 */
export const stilleBeschneiden = async (
  datei: string,
): Promise<{ vorherSek: number; nachherSek: number; vornSek: number; hintenSek: number }> => {
  const dauer = async (d: string) =>
    Number(
      (
        await ausfuehren(FFPROBE, [
          '-v', 'error', '-show_entries', 'format=duration',
          '-of', 'default=noprint_wrappers=1:nokey=1', d,
        ])
      ).stdout.trim(),
    );

  const vorher = await dauer(datei);

  const erkennen = await ausfuehren(FFMPEG, [
    '-i', datei,
    '-af', `silencedetect=noise=${STILLE_DB}dB:d=${STILLE_MIN_SEK}`,
    '-f', 'null', '-',
  ]).catch((f: { stderr?: string }) => ({ stdout: '', stderr: f.stderr ?? '' }));

  /*
   * ffmpeg meldet Anfang und Ende jeder Stille als eigene Zeile. Gesucht sind
   * nur zwei davon: eine, die bei 0 beginnt, und eine, die bis zum Dateiende
   * laeuft. Alles dazwischen bleibt stehen.
   */
  const zeilen = erkennen.stderr;
  const starts = [...zeilen.matchAll(/silence_start: ([\d.]+)/g)].map((m) => Number(m[1]));
  const enden = [...zeilen.matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]));

  const vornSek = starts.length > 0 && starts[0]! < 0.001 ? (enden[0] ?? 0) : 0;
  /*
   * **Die Toleranz war zuerst 0,02 s und hat um 0,01 danebengelegen.**
   * ffmpeg meldet das Ende einer Stille am letzten ausgewerteten Block, nicht
   * am Dateiende: Bei `passwort-wechseln.11.mp3` laeuft sie bis 6,08, die Datei
   * ist 6,11 lang. Mit 0,02 galt sie deshalb als Stille *im Inneren* und blieb
   * stehen — ausgerechnet die laengste, 2,04 Sekunden.
   *
   * 0,06 s sind knapp zwei Bilder. Was kuerzer ist, kann kein gesprochenes
   * Wort mehr sein.
   */
  const ENDE_TOLERANZ_SEK = 0.06;
  const letzterStart = starts[starts.length - 1] ?? Number.POSITIVE_INFINITY;
  const letztesEnde = enden.length === starts.length ? enden[enden.length - 1]! : vorher;
  const hintenSek =
    letztesEnde >= vorher - ENDE_TOLERANZ_SEK ? Math.max(0, vorher - letzterStart) : 0;

  if (vornSek < 0.005 && hintenSek < 0.005) {
    return { vorherSek: vorher, nachherSek: vorher, vornSek: 0, hintenSek: 0 };
  }

  /*
   * Ein Sicherheitssaum von 20 ms an beiden Enden. Ohne ihn schneidet der
   * Schnitt in den Anlaut oder laesst den Nachhall abreissen — beides hoert
   * man deutlicher als die Stille, die man loswerden wollte.
   */
  const saum = 0.02;
  const von = Math.max(0, vornSek - saum);
  const bis = Math.max(von + 0.1, vorher - Math.max(0, hintenSek - saum));

  const zwischen = datei.replace(/\.mp3$/, '.beschnitten.mp3');
  await ausfuehren(FFMPEG, [
    '-y', '-i', datei,
    '-ss', von.toFixed(3), '-to', bis.toFixed(3),
    '-ar', '44100', '-b:a', '192k',
    zwischen,
  ]);
  await fs.rename(zwischen, datei);

  return { vorherSek: vorher, nachherSek: await dauer(datei), vornSek, hintenSek };
};

/**
 * Dasselbe fuer einen Puffer, der noch keine Datei ist.
 *
 * **Warum es diese zweite Fassung gibt.** Beschnitten werden muss, **bevor**
 * die Zeiten gerechnet werden: Wer vorn 0,12 s wegnimmt, verschiebt jedes Wort
 * dieses Abschnitts um 0,12 s — und an den Wortzeiten haengen Untertitel,
 * Lippensync und die Aufschlagmessung. `shortVertonen` ist die einzige Stelle,
 * an der Ton und Zeiten zusammen vorliegen, und dort gibt es noch keine
 * Dateien, nur Puffer.
 *
 * Der Umweg ueber eine temporaere Datei ist Absicht: ffmpeg braucht bei mp3
 * eine seekbare Quelle, ueber `pipe:0` kennt es die Laenge nicht.
 */
export const stilleBeschneidenPuffer = async (
  ton: Buffer,
): Promise<{ ton: Buffer; vornSek: number; hintenSek: number }> => {
  const ordner = await fs.mkdtemp(path.join(os.tmpdir(), 'ganzakkurat-ton-'));
  const datei = path.join(ordner, 'stueck.mp3');
  try {
    await fs.writeFile(datei, ton);
    const { vornSek, hintenSek } = await stilleBeschneiden(datei);
    return { ton: await fs.readFile(datei), vornSek, hintenSek };
  } finally {
    await fs.rm(ordner, { recursive: true, force: true });
  }
};

export type Videobefund = { stufe: 'fehler' | 'hinweis'; text: string };

/**
 * Technische Endkontrolle der fertigen Videodatei.
 *
 * Prueft, was sich erst am Ergebnis feststellen laesst — nicht am Skript.
 * Ein Video ohne Tonspur oder mit falscher Aufloesung faellt sonst erst
 * nach dem Hochladen auf.
 */
export const videoPruefen = async (datei: string): Promise<Videobefund[]> => {
  const befunde: Videobefund[] = [];

  const { stdout } = await ausfuehren(FFPROBE, [
    '-v', 'error',
    '-show_entries', 'format=duration,bit_rate:stream=codec_type,codec_name,width,height,r_frame_rate',
    '-of', 'json', datei,
  ]);

  const daten = JSON.parse(stdout) as {
    format: { duration: string; bit_rate?: string };
    streams: { codec_type: string; codec_name: string; width?: number; height?: number; r_frame_rate?: string }[];
  };

  const dauer = Number(daten.format.duration);
  const bild = daten.streams.find((s) => s.codec_type === 'video');
  const ton = daten.streams.find((s) => s.codec_type === 'audio');

  if (!bild) {
    befunde.push({ stufe: 'fehler', text: 'Die Datei hat keine Bildspur.' });
  } else {
    if (bild.width !== FORMAT.breite || bild.height !== FORMAT.hoehe) {
      befunde.push({
        stufe: 'fehler',
        text: `Auflösung ${bild.width}×${bild.height} statt ${FORMAT.breite}×${FORMAT.hoehe}.`,
      });
    }
    if (bild.codec_name !== 'h264') {
      befunde.push({ stufe: 'hinweis', text: `Bildcodec ist ${bild.codec_name}, erwartet wurde h264.` });
    }
  }

  if (!ton) {
    befunde.push({ stufe: 'fehler', text: 'Die Datei hat keine Tonspur – der Short liefe stumm.' });
  } else {
    /*
     * Die blosse Existenz einer Tonspur sagt nichts: Der Renderer legt auch
     * dann eine an, wenn nichts zu hoeren ist. Schlaegt die Vertonung fehl,
     * waehrend der Render durchlaeuft, entstuende sonst ein stummes Video,
     * das erst nach dem Hochladen auffiele. Deshalb wird der Pegel gemessen.
     */
    const pegel = await mittlererPegel(datei);
    if (pegel < -50) {
      befunde.push({
        stufe: 'fehler',
        text: `Die Tonspur ist stumm (${pegel.toFixed(0)} dB) – es wurde keine Sprache eingebettet.`,
      });
    }
  }

  const [minimum, maximum] = LAENGE_SEK.ziel;
  if (dauer > maximum) {
    befunde.push({ stufe: 'fehler', text: `${dauer.toFixed(1)}s überschreitet das Plattformlimit.` });
  } else if (dauer < minimum) {
    befunde.push({ stufe: 'fehler', text: `${dauer.toFixed(1)}s ist zu kurz.` });
  }

  return befunde;
};

/**
 * Mittlerer Lautstaerkepegel einer Datei in dB.
 * Voellige Stille liefert etwa -91 dB, gesprochene Sprache liegt bei -25 bis -15.
 */
export const mittlererPegel = async (datei: string): Promise<number> => {
  const lauf = await ausfuehren(FFMPEG, ['-i', datei, '-af', 'volumedetect', '-f', 'null', '-']).catch(
    (f: { stderr?: string }) => ({ stdout: '', stderr: f.stderr ?? '' }),
  );
  const treffer = lauf.stderr.match(/mean_volume:\s*(-?\d+(?:\.\d+)?) dB/);
  return treffer ? Number(treffer[1]) : Number.NEGATIVE_INFINITY;
};

/** Laufzeit einer Datei in Sekunden. */
export const dauerSekunden = async (datei: string): Promise<number> => {
  const { stdout } = await ausfuehren(FFPROBE, [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', datei,
  ]);
  return Number(stdout.trim());
};
