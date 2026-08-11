import fs from 'node:fs/promises';
import path from 'node:path';
import { AwsClient } from 'aws4fetch';

/**
 * Dateiablage fuer fertige Videos.
 *
 * Buffer nimmt keine Dateien entgegen — beim Anlegen eines Beitrags erwartet
 * es eine oeffentlich erreichbare URL. Die Videos liegen aber lokal. Deshalb
 * dieser Zwischenschritt.
 *
 * Cloudflare R2 spricht das S3-Protokoll. Statt des schweren AWS-SDK genuegt
 * `aws4fetch`: es signiert Anfragen und laesst den Rest bei `fetch`. Die
 * Wahl fiel auf R2, weil dort **kein** Entgelt fuer ausgehenden Datenverkehr
 * anfaellt — und genau der entsteht, wenn Buffer und danach drei Plattformen
 * dieselbe Datei abholen.
 */

export type AblageZugang = {
  kontoId: string;
  bucket: string;
  schluesselId: string;
  geheimnis: string;
  /**
   * Oeffentliche Basisadresse des Buckets, ohne Schraegstrich am Ende.
   *
   * Bewusst optional: Schreibrecht und oeffentlicher Zugriff sind zwei
   * getrennte Einstellungen in Cloudflare, und sie schlagen getrennt fehl.
   * Ein Zugang kann schreiben koennen, ohne dass der Bucket freigegeben ist —
   * und umgekehrt. Waeren sie hier zusammengefasst, verdeckte die eine
   * fehlende Angabe die Diagnose der anderen.
   */
  oeffentlicheBasis?: string;
};

/** Liest den Zugang aus der Umgebung und meldet fehlende Angaben einzeln. */
export const zugangAusUmgebung = (): AblageZugang => {
  const felder = {
    kontoId: process.env.CLOUDFLARE_ACCOUNT_ID,
    bucket: process.env.R2_BUCKET,
    schluesselId: process.env.R2_ACCESS_KEY_ID,
    geheimnis: process.env.R2_SECRET_ACCESS_KEY,
  };

  const fehlend = Object.entries(felder)
    .filter(([, wert]) => !wert)
    .map(([name]) => name);

  if (fehlend.length > 0) {
    throw new Error(
      `Dateiablage nicht eingerichtet. In .env fehlen: ${fehlend.join(', ')}.\n` +
        'Die Werte stehen im Cloudflare-Dashboard unter R2.',
    );
  }

  return {
    kontoId: felder.kontoId!,
    bucket: felder.bucket!,
    schluesselId: felder.schluesselId!,
    geheimnis: felder.geheimnis!,
    oeffentlicheBasis: process.env.R2_OEFFENTLICHE_URL?.replace(/\/+$/, ''),
  };
};

const client = (z: AblageZugang) =>
  new AwsClient({ accessKeyId: z.schluesselId, secretAccessKey: z.geheimnis, service: 's3', region: 'auto' });

/**
 * Legt eine Datei ab und liefert ihre oeffentliche Adresse.
 *
 * Der Ablagepfad enthaelt die Lauf-Kennung, damit sich die Dateien eines
 * Wochenlaufs nach dem Veroeffentlichen gemeinsam loeschen lassen.
 */
export const hochladen = async (
  z: AblageZugang,
  lokalerPfad: string,
  zielpfad: string,
): Promise<string> => {
  const inhalt = await fs.readFile(lokalerPfad);
  const endpunkt = `https://${z.kontoId}.r2.cloudflarestorage.com/${z.bucket}/${zielpfad}`;

  const antwort = await client(z).fetch(endpunkt, {
    method: 'PUT',
    body: new Uint8Array(inhalt),
    headers: {
      'Content-Type': lokalerPfad.endsWith('.mp4') ? 'video/mp4' : 'application/octet-stream',
      'Content-Length': String(inhalt.byteLength),
    },
  });

  if (!antwort.ok) {
    throw new Error(`Upload von ${path.basename(lokalerPfad)} fehlgeschlagen (HTTP ${antwort.status}): ${await antwort.text()}`);
  }

  if (!z.oeffentlicheBasis) {
    throw new Error(
      'R2_OEFFENTLICHE_URL fehlt in .env. Die Datei liegt zwar im Bucket, aber ohne ' +
        'öffentliche Adresse könnte Buffer sie nicht laden.',
    );
  }
  return `${z.oeffentlicheBasis}/${zielpfad}`;
};

/** Entfernt eine abgelegte Datei, etwa nach erfolgreicher Veroeffentlichung. */
export const loeschen = async (z: AblageZugang, zielpfad: string): Promise<void> => {
  const endpunkt = `https://${z.kontoId}.r2.cloudflarestorage.com/${z.bucket}/${zielpfad}`;
  const antwort = await client(z).fetch(endpunkt, { method: 'DELETE' });
  if (!antwort.ok && antwort.status !== 404) {
    throw new Error(`Löschen von ${zielpfad} fehlgeschlagen (HTTP ${antwort.status}).`);
  }
};

/**
 * Prueft, ob eine abgelegte Datei tatsaechlich oeffentlich erreichbar ist.
 *
 * Ein Bucket kann erfolgreich beschrieben und trotzdem nicht freigegeben
 * sein. Buffer wuerde die Datei dann nicht laden koennen — und der Fehler
 * faellt erst beim Veroeffentlichen auf. Deshalb wird vorher nachgesehen.
 */
export const oeffentlichErreichbar = async (url: string): Promise<boolean> => {
  try {
    const antwort = await fetch(url, { method: 'HEAD' });
    return antwort.ok;
  } catch {
    return false;
  }
};
