import { execFile } from 'node:child_process';
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

  if (dauer > LAENGE_SEK.maximum) {
    befunde.push({ stufe: 'fehler', text: `${dauer.toFixed(1)}s überschreitet das Plattformlimit.` });
  } else if (dauer < LAENGE_SEK.minimum) {
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
