import { createServer } from 'node:http';
import { readFileSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';

/**
 * Anbindung an YouTube — die einzige Quelle, aus der dieser Kanal erfaehrt,
 * was aus einem Video geworden ist.
 *
 * Warum nicht Buffer: Die Buffer-Schnittstelle **hat** ein `metrics`-Feld mit
 * sechzehn Metriktypen, aber sie fuellt es nicht. Am 18.08.2026 gemessen am
 * ersten Video des Kanals: YouTube meldete 112 Aufrufe, Buffer meldete 0 —
 * und `metricsUpdatedAt` lag **vor** `sentAt`. Buffer fasst die Zahlen einmal
 * beim Senden an und danach nie wieder; eine Mutation zum Nachladen gibt es
 * nicht. Waere das nicht aufgefallen, haette der Rueckblick jede Woche
 * Nullen mitgeschrieben — und niemandem waere es aufgefallen, weil eine Zahl
 * dastand.
 *
 * Buffer bleibt trotzdem im Spiel: `externalLink` je Beitrag ist die einzige
 * Bruecke zwischen einem Entwurf auf der Platte und dem Video draussen.
 *
 * Warum nur YouTube: TikTok laedt seine Zahlen per JavaScript nach, Instagram
 * gibt ohne Anmeldung gar nichts heraus. Beide wuerden ein Geschaeftskonto,
 * eine Entwickleranmeldung und ein Freigabeverfahren verlangen — fuer Zahlen
 * zu **demselben** Video mit **demselben** Aufschlag. Was an Sekunde 3,5 bei
 * YouTube haelt, haelt auch dort.
 *
 * Zwei Schnittstellen, zwei Zugangsarten:
 *
 * - **Data API** (`YOUTUBE_API_KEY`): Aufrufe, Likes, Kommentare. Oeffentlich,
 *   ein Schluessel genuegt.
 * - **Analytics API** (OAuth): Haltequote und Durchsichtsrate. Die sieht nur
 *   der Kanalinhaber, deshalb die einmalige Anmeldung.
 */

const DATA = 'https://www.googleapis.com/youtube/v3';
const ANALYTICS = 'https://youtubeanalytics.googleapis.com/v2/reports';
const TOKEN = 'https://oauth2.googleapis.com/token';

/**
 * Nur Lesen, und nur Auswertung. Der Scope reicht ausdruecklich **nicht**, um
 * Videos hochzuladen, zu aendern oder zu loeschen — wenn dieses Skript je
 * durchdreht, kann es nichts kaputtmachen.
 */
export const SCOPE = 'https://www.googleapis.com/auth/yt-analytics.readonly';

const umgebung = (name: string): string => {
  const wert = process.env[name];
  if (!wert) throw new Error(`${name} fehlt in .env`);
  return wert;
};

// ---------------------------------------------------------------- Anmeldung

/**
 * Traegt einen Wert in .env ein oder ersetzt ihn.
 *
 * Bewusst nicht ueber eine Bibliothek: .env haelt alle Zugaenge dieses
 * Projekts, und ein Werkzeug, das die Datei neu formatiert, wuerde die
 * Kommentare darin verlieren.
 */
const inEnvSchreiben = (name: string, wert: string): void => {
  const zeilen = readFileSync('.env', 'utf8').split('\n');
  const stelle = zeilen.findIndex((z) => z.startsWith(`${name}=`));
  if (stelle >= 0) zeilen[stelle] = `${name}=${wert}`;
  else {
    while (zeilen.length && (zeilen[zeilen.length - 1] ?? '').trim() === '') zeilen.pop();
    zeilen.push(`${name}=${wert}`, '');
  }
  writeFileSync('.env', zeilen.join('\n'));

  /*
   * Auch den laufenden Prozess auf den neuen Stand bringen. dotenv liest .env
   * einmal beim Start; wer danach hineinschreibt, kennt seine eigene Zeile
   * sonst nicht. Der Anmeldeflow scheiterte genau daran an seinem eigenen
   * Selbsttest — mit der Meldung, das Token fehle, unmittelbar nachdem er es
   * geschrieben hatte.
   */
  process.env[name] = wert;
};

/**
 * Der einmalige Anmeldeweg fuer eine Desktopanwendung.
 *
 * Google schickt den Code nicht an das Programm, sondern an eine Adresse im
 * Browser. Bei einer Desktopanwendung darf das `http://127.0.0.1` mit einem
 * beliebigen Port sein, der nirgends registriert werden muss — deshalb
 * horcht hier kurz ein eigener Server, faengt die Weiterleitung ab und macht
 * sich sofort wieder zu.
 *
 * `access_type=offline` und `prompt=consent` sind beide noetig: ohne das
 * erste kommt gar kein Refresh-Token, ohne das zweite kommt es nur beim
 * allerersten Mal — und wer einmal falsch abgebrochen hat, bekaeme danach
 * nie wieder eins und suchte den Fehler im Code.
 */
export const anmelden = async (): Promise<string> => {
  const clientId = umgebung('YOUTUBE_CLIENT_ID');
  const clientSecret = umgebung('YOUTUBE_CLIENT_SECRET');

  const { code, ziel } = await new Promise<{ code: string; ziel: string }>((erfuellen, ablehnen) => {
    let ziel = '';

    const server = createServer((anfrage, antwort) => {
      const url = new URL(anfrage.url ?? '/', ziel);
      const code = url.searchParams.get('code');
      const fehler = url.searchParams.get('error');

      antwort.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      antwort.end(
        `<!doctype html><meta charset="utf-8"><body style="font:16px/1.6 -apple-system,sans-serif;padding:3rem;background:#111;color:#eee">
         <p>${code ? 'Angemeldet. Du kannst dieses Fenster schließen.' : `Abgebrochen: ${fehler}`}</p>`,
      );

      server.close();
      if (code) erfuellen({ code, ziel });
      else ablehnen(new Error(`Anmeldung abgebrochen: ${fehler ?? 'kein Code erhalten'}`));
    });

    server.listen(0, '127.0.0.1', () => {
      const port = (server.address() as { port: number }).port;
      ziel = `http://127.0.0.1:${port}`;
      const url =
        'https://accounts.google.com/o/oauth2/v2/auth?' +
        new URLSearchParams({
          client_id: clientId,
          redirect_uri: ziel,
          response_type: 'code',
          scope: SCOPE,
          access_type: 'offline',
          prompt: 'consent',
        });

      console.log('Ein Browserfenster öffnet sich. Melde dich mit dem Konto an,');
      console.log('dem der Kanal gehört, und bestätige den Lesezugriff.\n');
      console.log('Kommt kein Fenster, öffne diese Adresse von Hand:');
      console.log(url + '\n');
      spawn('open', [url], { stdio: 'ignore', detached: true }).unref();
    });

    server.on('error', ablehnen);
  });

  /*
   * Der Code ist Sekunden gueltig und genau einmal einloesbar. `redirect_uri`
   * muss hier **buchstabengleich** die Adresse von oben sein — Google
   * vergleicht sie, obwohl es nichts mehr dorthin schickt. Weicht sie ab,
   * lautet die Antwort `redirect_uri_mismatch`, was nach einem Fehler in der
   * Cloud-Konsole aussieht und keiner ist.
   */
  const antwort = await fetch(TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: ziel,
      grant_type: 'authorization_code',
    }),
  });

  const daten = (await antwort.json()) as { refresh_token?: string; error_description?: string };
  if (!daten.refresh_token) {
    throw new Error(
      `Kein Refresh-Token erhalten: ${daten.error_description ?? JSON.stringify(daten)}`,
    );
  }

  inEnvSchreiben('YOUTUBE_REFRESH_TOKEN', daten.refresh_token);
  return daten.refresh_token;
};

// ------------------------------------------------------------------ Zugriff

/**
 * Tauscht das dauerhafte Refresh-Token gegen ein kurzlebiges Zugriffstoken.
 *
 * Das Refresh-Token verfaellt nur dann nicht, wenn die App in der Cloud-
 * Konsole auf **In Produktion** steht. Bleibt sie auf „Testing", ist nach
 * sieben Tagen Schluss — und die Meldung dazu (`invalid_grant`) sieht nach
 * einem kaputten Token aus, nicht nach einer Einstellung.
 */
export const zugriffstoken = async (): Promise<string> => {
  const antwort = await fetch(TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: umgebung('YOUTUBE_CLIENT_ID'),
      client_secret: umgebung('YOUTUBE_CLIENT_SECRET'),
      refresh_token: umgebung('YOUTUBE_REFRESH_TOKEN'),
      grant_type: 'refresh_token',
    }),
  });

  const daten = (await antwort.json()) as { access_token?: string; error?: string };
  if (!daten.access_token) {
    const rat =
      daten.error === 'invalid_grant'
        ? ' Steht die App in der Cloud-Konsole unter Zielgruppe auf „In Produktion“? Auf „Testing“ verfällt die Anmeldung nach sieben Tagen. Danach: npm run youtube-anmelden'
        : '';
    throw new Error(`Zugriffstoken abgelehnt: ${daten.error ?? 'unbekannt'}.${rat}`);
  }
  return daten.access_token;
};

// --------------------------------------------------------- Oeffentliche Zahlen

export type Videozahlen = {
  videoId: string;
  titel: string;
  online: string;
  aufrufe: number;
  likes: number;
  kommentare: number;
};

/** Aufrufe, Likes, Kommentare — bis zu 50 Videos in einer Anfrage. */
export const videozahlen = async (videoIds: string[]): Promise<Videozahlen[]> => {
  if (videoIds.length === 0) return [];
  const url = `${DATA}/videos?part=snippet,statistics&id=${videoIds.join(',')}&key=${umgebung('YOUTUBE_API_KEY')}`;
  const antwort = await fetch(url);
  const daten = (await antwort.json()) as {
    items?: {
      id: string;
      snippet: { title: string; publishedAt: string };
      statistics: { viewCount?: string; likeCount?: string; commentCount?: string };
    }[];
    error?: { message: string };
  };
  if (daten.error) throw new Error(`YouTube Data API: ${daten.error.message}`);

  return (daten.items ?? []).map((v) => ({
    videoId: v.id,
    titel: v.snippet.title,
    online: v.snippet.publishedAt,
    aufrufe: Number(v.statistics.viewCount ?? 0),
    likes: Number(v.statistics.likeCount ?? 0),
    kommentare: Number(v.statistics.commentCount ?? 0),
  }));
};

// ------------------------------------------------------------- Die Haltequote

export type Verlaufszahlen = {
  aufrufe: number;
  /** Wie viele Sekunden im Schnitt gesehen wurden. */
  mittlereSicht: number;
  /** Anteil des Videos, der im Schnitt gesehen wurde, in Prozent. */
  durchsicht: number;
  geteilt: number;
  neueAbos: number;
};

const bereich = (tage: number): { von: string; bis: string } => {
  const heute = new Date();
  const frueher = new Date(heute.getTime() - tage * 86_400_000);
  const f = (d: Date) => d.toISOString().slice(0, 10);
  return { von: f(frueher), bis: f(heute) };
};

const analytics = async (token: string, parameter: Record<string, string>) => {
  const antwort = await fetch(`${ANALYTICS}?${new URLSearchParams(parameter)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const daten = (await antwort.json()) as {
    rows?: (string | number)[][];
    columnHeaders?: { name: string }[];
    error?: { message: string };
  };
  if (daten.error) throw new Error(`YouTube Analytics API: ${daten.error.message}`);
  return daten;
};

/** Durchsichtsrate, mittlere Sichtdauer, Teilen — je Video. */
export const verlaufszahlen = async (
  token: string,
  videoId: string,
  tage = 90,
): Promise<Verlaufszahlen | null> => {
  const { von, bis } = bereich(tage);
  const daten = await analytics(token, {
    ids: 'channel==MINE',
    startDate: von,
    endDate: bis,
    metrics: 'views,averageViewDuration,averageViewPercentage,shares,subscribersGained',
    filters: `video==${videoId}`,
  });

  const zeile = daten.rows?.[0];
  if (!zeile) return null;
  const [aufrufe = 0, mittlereSicht = 0, durchsicht = 0, geteilt = 0, neueAbos = 0] =
    zeile.map(Number);
  return { aufrufe, mittlereSicht, durchsicht, geteilt, neueAbos };
};

/**
 * Die Haltekurve: an hundert Punkten des Videos, welcher Anteil noch da war.
 *
 * `audienceWatchRatio` ist der Wert, um den es diesem Kanal geht. Aufrufe
 * sagen, was der Algorithmus getan hat; die Haltekurve sagt, was der
 * Zuschauer getan hat — und sie sagt es an einer Stelle, die hier schon eine
 * Regel hat: dem Ende des Aufschlags bei 3,5 Sekunden.
 *
 * Vorlauf beachten: Analytics-Daten kommen mit ein bis drei Tagen Verzug.
 * Fuer ein Video von gestern Abend gibt es noch nichts, und das ist kein
 * Fehler, sondern der Normalfall.
 */
export const haltekurve = async (
  token: string,
  videoId: string,
  tage = 90,
): Promise<{ anteilVideo: number; nochDa: number }[] | null> => {
  const { von, bis } = bereich(tage);
  const daten = await analytics(token, {
    ids: 'channel==MINE',
    startDate: von,
    endDate: bis,
    metrics: 'audienceWatchRatio',
    dimensions: 'elapsedVideoTimeRatio',
    filters: `video==${videoId}`,
  });

  if (!daten.rows?.length) return null;
  return daten.rows.map(([anteil, ratio]) => ({
    anteilVideo: Number(anteil),
    nochDa: Number(ratio),
  }));
};

/**
 * Liest aus der Haltekurve, wie viele bei Sekunde `sekunde` noch da waren.
 *
 * Die Kurve steht in Anteilen der Videolaenge, nicht in Sekunden — deshalb
 * braucht es die Laenge dazu. Genommen wird der naechstgelegene Messpunkt.
 */
export const halteQuoteBei = (
  kurve: { anteilVideo: number; nochDa: number }[],
  sekunde: number,
  laengeSek: number,
): number | null => {
  if (!kurve.length || laengeSek <= 0) return null;
  const ziel = sekunde / laengeSek;
  if (ziel > 1) return null;
  const naechster = kurve.reduce((a, b) =>
    Math.abs(b.anteilVideo - ziel) < Math.abs(a.anteilVideo - ziel) ? b : a,
  );
  return naechster.nochDa;
};
