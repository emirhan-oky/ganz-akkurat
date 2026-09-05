import { FORMATE, type Quelle, type Short } from './typen';

/**
 * Anbindung an Buffer.
 *
 * Zwei Eigenheiten, die beim Bauen Zeit gekostet haben und deshalb hier
 * festgehalten sind:
 *
 * 1. Die alte REST-Schnittstelle nimmt oeffentliche Tokens nicht mehr an und
 *    wird am 1. Februar 2027 abgeschaltet. Genutzt wird ausschliesslich die
 *    GraphQL-Schnittstelle unter api.buffer.com.
 * 2. Kanaele liegen **nicht** unter `account`, sondern in einer eigenen
 *    Abfrage mit Organisations-Kennung. Der Weg ueber `account.channels`
 *    antwortet mit FORBIDDEN und sieht dadurch nach einem Rechteproblem aus,
 *    obwohl es nur der falsche Pfad ist.
 */

const ENDPUNKT = 'https://api.buffer.com/graphql';

export type Kanal = {
  id: string;
  name: string;
  service: string;
  isDisconnected: boolean;
};

const abfragen = async <T>(schluessel: string, query: string, variables?: unknown): Promise<T> => {
  const antwort = await fetch(ENDPUNKT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${schluessel}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  /*
   * Erst den Statuscode ansehen, dann erst parsen.
   *
   * Vorher stand hier direkt `antwort.json()`. Als Buffer am 15.08.2026
   * mitten in einer Veroeffentlichung mit **504 Gateway Timeout** und einer
   * HTML-Fehlerseite antwortete, kam als Meldung nur an:
   *
   *   Unexpected token '<', "<html> <h"... is not valid JSON
   *
   * Das liest sich wie ein Fehler im eigenen Code — und die Suche begann an
   * der falschen Stelle. Eine Stoerung beim Dienst muss als Stoerung beim
   * Dienst erkennbar sein, sonst kostet sie eine halbe Stunde.
   */
  if (!antwort.ok) {
    const art = antwort.status >= 500 ? 'Störung bei Buffer' : 'Buffer lehnt die Anfrage ab';
    const rat =
      antwort.status >= 500
        ? 'Nichts am eigenen Zugang ändern — später erneut versuchen.'
        : antwort.status === 401 || antwort.status === 403
          ? 'BUFFER_ACCESS_TOKEN prüfen (npm run zugaenge).'
          : '';
    throw new Error(`${art}: HTTP ${antwort.status} ${antwort.statusText}. ${rat}`.trim());
  }

  /*
   * Auch mit 200 kann HTML kommen — etwa von einem Zwischenserver, der eine
   * Wartungsseite ausliefert. Deshalb den Rohtext holen und selbst parsen,
   * statt `json()` an einer Fehlerseite scheitern zu lassen.
   */
  const roh = await antwort.text();
  let daten: { data?: T; errors?: { message: string }[] };
  try {
    daten = JSON.parse(roh) as { data?: T; errors?: { message: string }[] };
  } catch {
    throw new Error(
      `Buffer antwortete mit ${antwort.status}, aber nicht mit JSON ` +
        `(${antwort.headers.get('content-type') ?? 'ohne Content-Type'}). ` +
        `Anfang der Antwort: ${roh.slice(0, 80).replace(/\s+/g, ' ')}`,
    );
  }

  if (daten.errors?.length) {
    throw new Error(`Buffer: ${daten.errors.map((f) => f.message).join('; ')}`);
  }
  if (!daten.data) throw new Error('Buffer lieferte keine Daten.');
  return daten.data;
};

/** Kennung der Organisation, unter der die Kanaele haengen. */
export const organisationErmitteln = async (schluessel: string): Promise<string> => {
  const daten = await abfragen<{ account: { organizations: { id: string }[] } }>(
    schluessel,
    'query { account { organizations { id name } } }',
  );
  const erste = daten.account.organizations[0];
  if (!erste) throw new Error('Keine Organisation im Buffer-Konto gefunden.');
  return erste.id;
};

export const kanaeleLesen = async (schluessel: string, organisationId: string): Promise<Kanal[]> => {
  const daten = await abfragen<{ channels: Kanal[] }>(
    schluessel,
    // Buffer verwendet eigene Kennungstypen statt String. Mit `String!`
    // antwortet die Schnittstelle mit einem Typfehler, der wie ein
    // Rechteproblem aussieht.
    `query($org: OrganizationId!) {
       channels(input: { organizationId: $org }) { id name service isDisconnected }
     }`,
    { org: organisationId },
  );
  return daten.channels;
};

/** Ordnet die Plattformtexte eines Shorts dem passenden Buffer-Dienst zu. */
const textFuerDienst = (short: Short, dienst: string) => {
  switch (dienst) {
    case 'tiktok':
      return short.texte.tiktok;
    case 'instagram':
      return short.texte.instagram;
    case 'youtube':
      return short.texte.youtube;
    default:
      return null;
  }
};

/**
 * Trennstrich zwischen Titel und Quellenblock.
 *
 * Drei Geviertstriche, bewusst **kuerzer als das Wort „Quellen:"** darunter.
 * Fuenf waren es zuerst, und der Strich wirkte dann wie eine Ueberschrift
 * statt wie eine Trennung — er zog mehr Aufmerksamkeit als das, was er
 * abtrennt.
 */
const TRENNSTRICH = '———';

/**
 * Die Ueberschrift ueber dem Quellenblock.
 *
 * Sie hiess bis zum 02.09.2026 „Quellen:", und das war eine Fussnote. Emirhans
 * Fassung ist eine **Einladung**: Manche Themen haben im Short keine Loesung,
 * die in eine Zeile passt — der Produktpass, die Schaltsekunde, das
 * Reparaturrecht. Die Handlung steht dann dort, wo der Zuschauer sie
 * freiwillig liest, statt dass sie einer Figur in den Mund gelegt wird.
 *
 * Das ist der Grund, warum ein Format nie eine Handlung verlangt und der Kanal
 * trotzdem hilft.
 */
const QUELLENZEILE = 'Für weitere Informationen rund um die Thematik:';

/**
 * Dienste, die aufeinanderfolgende Zeilenumbrueche zusammenfalten.
 *
 * TikTok zeigt die Bildunterschrift ohne Leerzeilen an: Aus Titel, Absatz,
 * Quellenblock, Absatz, Hashtags wird ein einziger Block ohne Luft — genau
 * so am 15.08.2026 im veroeffentlichten Beitrag zu sehen, waehrend Instagram
 * und YouTube dieselbe Zeichenkette korrekt umbrachen.
 *
 * Der Ausweg ist ein Zeichen, das TikTok als Inhalt zaehlt und nicht als
 * Leerraum: U+2800, das leere Braille-Muster. Es ist unsichtbar, aber kein
 * Whitespace — die Zeile bleibt damit stehen.
 */
const FALTET_LEERZEILEN = ['tiktok'];

/** Leerzeile, die auch dort ueberlebt, wo Leerraum zusammengefaltet wird. */
const LEERZEILE_HART = '\u2800';

/**
 * Baut den Beitragstext — auf allen drei Diensten nach demselben Muster.
 *
 * ```
 * Dock lädt, aber kein Bild: Dein Monitor ist unschuldig
 *
 * —————
 * Quellen:
 * - VESA, DisplayPort über USB Type-C: https://…
 * - Plugable, Understanding USB-C Alt Mode: https://…
 *
 * #usbc #homeoffice #schreibtischsetup
 * ```
 *
 * ## Zwei Entscheidungen vom 15.08.2026
 *
 * **Die Beschreibung entfaellt, ueberall.** Bis dahin stand vorne auf
 * Instagram und TikTok die Beschreibung und der Titel wurde nie angezeigt —
 * ausgerechnet der Text, der die Titelregeln durchlaufen hat. Bei YouTube
 * standen Titel und Beschreibung doppelt untereinander. Jetzt traegt die
 * erste Zeile ueberall den Titel; bei YouTube steht er zusaetzlich im
 * Titelfeld, weil es dort eines gibt. Die Begruendung fuer das Weglassen ist
 * die Gattung: Ein Short erklaert sich im Video, nicht im Text darunter.
 *
 * **Die Quellen werden erzeugt, nicht abgeschrieben.** Vorher standen sie als
 * fester Text in `texte.youtube.beschreibung` — eine zweite Liste neben den
 * `quelleId`s an den Szenen, und damit genau die Sorte Doppelung, die in
 * diesem Projekt schon dreimal auseinandergelaufen ist. Sie kommen jetzt aus
 * den Szenen selbst: Was keine Szene belegt, steht auch nicht darunter, und
 * was eine Szene belegt, steht zwangslaeufig da.
 *
 * Nebenwirkung, und eine erwuenschte: Instagram und TikTok tragen damit
 * ueberhaupt zum ersten Mal Quellenangaben. Vorher hingen die nur bei
 * YouTube.
 *
 * ## Der Zwiegespraech-Nachtrag vom 02.09.2026
 *
 * **Die Quellen kommen aus den Szenen *und* den Redeanteilen.** Seit dem
 * Umbau auf zwei Stimmen haengt eine `quelleId` nicht mehr nur an der Szene,
 * sondern an der einzelnen Zeile — und die Zitatkarte ist optional. Wer nur
 * die Szenen einsammelt, verliert genau die Quellen der Shorts, die ohne
 * Karte auskommen. **Die Quelle steht immer unter dem Video, auch wenn sie im
 * Video nie im Bild war.**
 */
export const beitragstext = (
  short: Short,
  dienst: string,
  quellen: readonly Quelle[] = [],
): string | null => {
  const texte = textFuerDienst(short, dienst);
  if (!texte) return null;

  /*
   * Reihenfolge der Szenen, ohne Doppelte: So steht die Quelle zur ersten
   * Aussage auch als erste unter dem Video.
   */
  const benutzte = [
    ...new Set(
      short.szenen.flatMap((s) => [
        ...('quelleId' in s && s.quelleId ? [s.quelleId] : []),
        ...('rede' in s && s.rede ? s.rede.flatMap((r) => (r.quelleId ? [r.quelleId] : [])) : []),
      ]),
    ),
  ];

  const zeilen = benutzte
    .map((id) => quellen.find((q) => q.id === id))
    .filter((q): q is Quelle => Boolean(q))
    .map((q) => `- ${q.herausgeber}, ${q.titel}: ${q.url}`);

  const bloecke = [texte.titel];

  /*
   * Die Beschreibung steht zwischen Titel und Quellen — **wenn sie etwas
   * enthaelt**. Vom 15.08. bis zum 24.08.2026 war sie ueberall leer, und das
   * Format hiess: Titel, Strich, Quellen, Hashtags.
   *
   * Seit dem 24.08.2026 traegt sie die **Keyword-Zeile**, und diese Stelle ist
   * genau die richtige dafuer: Die Plattformen indizieren die ersten rund 80
   * Zeichen, und hier steht sie direkt hinter dem Titel. Erklaert wird
   * weiterhin nichts — `shortPruefen` meldet alles ab 150 Zeichen.
   *
   * Das Feld ganz zu streichen waere schon vorher falsch gewesen. An ihm haengt die
   * `kennzeichnung`-Regel in `src/pruefung.ts`: Sie sucht Partnerlinks und
   * verlangt „Werbung" oder „Anzeige" **in derselben Zeile** (LG Erfurt,
   * 23.11.2020). Wuerde die Beschreibung nicht mehr veroeffentlicht, pruefte
   * diese Regel einen Text, den niemand je zu sehen bekommt — eine tote
   * Regel an der Stelle, an der es teuer wird.
   *
   * Sobald Variante A greift, ist dies also der Ort des Partnerlinks: im
   * veroeffentlichten Text, geprueft, und im Kaufen-Short zusammen mit dem
   * Label im Bild.
   */
  if (texte.beschreibung.trim()) bloecke.push(texte.beschreibung.trim());

  if (zeilen.length > 0) bloecke.push(`${TRENNSTRICH}\n${QUELLENZEILE}\n${zeilen.join('\n')}`);
  bloecke.push(texte.hashtags.join(' '));

  const trenner = FALTET_LEERZEILEN.includes(dienst.toLowerCase())
    ? `\n${LEERZEILE_HART}\n`
    : '\n\n';

  return bloecke.join(trenner).trim();
};

/**
 * Der Titel des Beitrags auf diesem Dienst.
 *
 * Vorher stand an beiden Aufrufstellen fest `short.texte.youtube.titel` —
 * auch fuer TikTok. Die drei Titel sind aber verschieden gebaut: TikTok
 * kuerzer, YouTube mit Kontext. Der Titel je Dienst steht in `short.texte`,
 * er wurde nur nicht benutzt.
 */
export const beitragstitel = (short: Short, dienst: string): string | null =>
  textFuerDienst(short, dienst)?.titel ?? null;

export type Veroeffentlichung = {
  shortId: string;
  kanalId: string;
  dienst: string;
  faelligAm: string;
  beitragId: string;
};

/**
 * Antwortvarianten der Beitragsaktionen.
 *
 * Buffer meldet Fachfehler **nicht** ueber das `errors`-Feld von GraphQL,
 * sondern als eigene Variante der Antwort. Ein technisch fehlerfreier Aufruf
 * kann also `LimitReachedError` enthalten — ohne diese Auswertung gaelte ein
 * abgelehnter Beitrag als angelegt.
 */
const ANTWORTVARIANTEN = `
  __typename
  ... on PostActionSuccess { post { id status dueAt } }
  ... on NotFoundError { message }
  ... on UnauthorizedError { message }
  ... on UnexpectedError { message }
  ... on RestProxyError { code message link }
  ... on LimitReachedError { message }
  ... on InvalidInputError { message }
`;

type Antwort = { __typename: string; post?: { id: string; status: string }; message?: string; code?: string };

/** Holt den Beitrag heraus oder wirft mit der Fehlermeldung von Buffer. */
const beitragAuswerten = (a: Antwort, was: string): { id: string; status: string } => {
  if (a.__typename === 'PostActionSuccess' && a.post) return a.post;
  const zusatz = a.code ? ` (${a.code})` : '';
  throw new Error(`${was}: ${a.__typename}${zusatz} – ${a.message ?? 'ohne Meldung'}`);
};

/**
 * YouTube-Kategorie 28, „Science & Technology".
 *
 * `categoryId` ist bei YouTube Pflicht — ohne sie lehnt Buffer den Beitrag ab.
 * Die Kennungen kommen aus der YouTube Data API und sind fuer den
 * deutschsprachigen Raum dieselben wie fuer den englischen; uebersetzt wird
 * nur der angezeigte Name.
 */
const YOUTUBE_KATEGORIE_TECHNIK = '28';

/**
 * Was jeder Dienst zusaetzlich zum Text verlangt.
 *
 * Der Rauchtest am 13.08.2026 hat das aufgedeckt: YouTube braucht `title` und
 * `categoryId`, Instagram einen `type`. Ohne diese Felder nimmt Buffer den
 * Beitrag nicht an — zwei von drei Kanaelen waeren im echten Lauf
 * gescheitert, und zwar erst nach dem Rendern und Vertonen.
 *
 * `isAiGenerated` steht hier bewusst je Dienst und nicht nur als `aiAssisted`
 * am Beitrag. Das eine ist Buffers eigene Notiz, das andere die Angabe, die
 * an die Plattform durchgereicht und dort als Hinweis angezeigt wird. Sie
 * ergaenzt die Kennzeichnung im Bild an der Stelle, an der die Plattformen
 * sie auswerten.
 */
const metadatenFuerDienst = (dienst: string, titel: string, kiStimme: boolean): Record<string, unknown> | null => {
  switch (dienst) {
    case 'youtube':
      return {
        youtube: {
          title: titel,
          categoryId: YOUTUBE_KATEGORIE_TECHNIK,
          privacy: 'public',
          madeForKids: false,
          isAiGenerated: kiStimme,
        },
      };
    case 'instagram':
      // `reel` und nicht `post`: Ein Hochformatvideo laeuft als Reel, ein
      // `post` landet im Raster und verliert die Reichweite, um die es geht.
      return { instagram: { type: 'reel', shouldShareToFeed: true, isAiGenerated: kiStimme } };
    case 'tiktok':
      return { tiktok: { title: titel, isAiGenerated: kiStimme } };
    default:
      return null;
  }
};

/** Legt einen geplanten Beitrag mit Videoanhang an. */
export const beitragPlanen = async (
  schluessel: string,
  opts: {
    kanalId: string;
    dienst: string;
    text: string;
    videoUrl: string;
    titel: string;
    kiStimme: boolean;
    faelligAm: Date;
  },
): Promise<string> => {
  const metadaten = metadatenFuerDienst(opts.dienst, opts.titel, opts.kiStimme);
  if (!metadaten) throw new Error(`Kein Metadatensatz für den Dienst ${opts.dienst} hinterlegt.`);

  const daten = await abfragen<{ createPost: Antwort }>(
    schluessel,
    /*
     * Die Enum-Werte stehen klein geschrieben im Schema: `customScheduled`
     * fuer einen festen Termin, `automatic` fuer selbsttaetiges
     * Veroeffentlichen. Die Dokumentation nennt an dieser Stelle
     * SCHEDULED und AUTOMATIC - beides existiert nicht.
     */
    /*
     * Zum Vorschaubild, damit es niemand ein zweites Mal recherchiert.
     *
     * `thumbnailOffset` waehlt es als **Zeitpunkt im Video**, nicht als Datei.
     * Eine eigene Bilddatei ist nicht bloss nicht vorgesehen, sondern
     * ausgeschlossen: Buffers Schema schreibt zum Feld `thumbnailUrl`
     * woertlich, dass soziale Netze keine eigenen Vorschaubilder annehmen und
     * die Programmierschnittstelle jedes Video ablehnt, das eines mitschickt.
     *
     * 1000 ms ist Absicht: Die erste Sekunde liegt im Aufschlag, und der ist
     * die Szene, die zum Antippen bringen soll. Spaeter waere es eine Szene
     * aus der Mitte, die nichts verspricht.
     *
     * Am 17.08.2026 hat sich Instagram daran gehalten und **TikTok nicht** —
     * dort stand ein Bild aus Szene 3. Laut Schema ist TikTok unterstuetzt;
     * die Auswahl passiert also auf deren Seite und laesst sich von hier nicht
     * erzwingen.
     *
     * Zuletzt eine Warnung an den naechsten, der hier etwas erklaeren will:
     * Dieser Kommentar stand zuerst **in** der Abfrage. Dort beenden die
     * Backticks um Feldnamen das Template-Literal, und selbst ohne das waere er
     * an Buffer mitgeschickt worden — GraphQL kennt die geschweiften
     * Sternchen-Kommentare von JavaScript nicht, sondern nur die Raute.
     * Kommentare gehoeren ueber eine Abfrage, nie hinein.
     */
    `mutation($channelId: ChannelId!, $text: String!, $dueAt: DateTime!, $url: String!, $titel: String!, $metadata: PostInputMetaData!) {
       createPost(input: {
         channelId: $channelId
         text: $text
         dueAt: $dueAt
         mode: customScheduled
         schedulingType: automatic
         aiAssisted: true
         metadata: $metadata
         assets: [{ video: { url: $url, metadata: { title: $titel, thumbnailOffset: 1000 } } }]
       }) { ${ANTWORTVARIANTEN} }
     }`,
    {
      channelId: opts.kanalId,
      text: opts.text,
      dueAt: opts.faelligAm.toISOString(),
      url: opts.videoUrl,
      titel: opts.titel,
      metadata: metadaten,
    },
  );
  return beitragAuswerten(daten.createPost, 'Beitrag anlegen').id;
};

/**
 * Entfernt einen geplanten Beitrag wieder.
 *
 * `deletePost` antwortet mit einer **anderen** Union als `createPost`:
 * `DeletePostSuccess | VoidMutationError`, ohne `post`-Feld. Mit den
 * Varianten von `createPost` lehnt GraphQL die Abfrage ab („Fragment cannot
 * be spread here") — und beim Rauchtest hiess das, dass der Testbeitrag im
 * Konto stehen blieb, obwohl das Aufraeumen ausdruecklich dafuer da ist.
 */
export const beitragLoeschen = async (schluessel: string, beitragId: string): Promise<void> => {
  const daten = await abfragen<{ deletePost: { __typename: string; message?: string } }>(
    schluessel,
    `mutation($id: PostId!) {
       deletePost(input: { id: $id }) {
         __typename
         ... on DeletePostSuccess { id }
         ... on VoidMutationError { message }
       }
     }`,
    { id: beitragId },
  );
  if (daten.deletePost.__typename !== 'DeletePostSuccess') {
    throw new Error(`Beitrag löschen: ${daten.deletePost.__typename} – ${daten.deletePost.message ?? 'ohne Meldung'}`);
  }
};

/**
 * Verteilt Shorts auf Veroeffentlichungszeitpunkte — ein Video je Tag, in der
 * Reihenfolge der Liste.
 *
 * Die Zuordnung hat zweimal die Seite gewechselt. Bis zum 16.08.2026 kam der
 * Termin aus der Listenposition; dann aus `FORMATE[...].tag`, weil der
 * Wochentag beim Formatmodell ein Versprechen an den Zuschauer war und ein
 * Versprechen nicht an eine Array-Position gehoert. Seit dem 20.08.2026 wieder
 * aus der Position, weil es das Versprechen nicht mehr gibt.
 *
 * **Das ist keine Ruecknahme, sondern eine geaenderte Voraussetzung.** Der
 * Einwand von damals stimmt weiter — wer zwei Eintraege vertauscht, verschiebt
 * still zwei Sendetermine. Er wiegt nur nichts mehr, wenn kein Zuschauer einen
 * bestimmten Tag erwartet. Die Reihenfolge der Liste muss trotzdem absichtlich
 * sein: die staerkste Sache zuerst.
 *
 * Die Uhrzeit ist eine Annahme, kein Messergebnis: abends laeuft Kurzvideo
 * im Schnitt besser als frueh morgens. Sie steht weiter am Format.
 */
export type GesendeterBeitrag = {
  id: string;
  dienst: string;
  gesendetAm: string | null;
  link: string | null;
  /**
   * Was die Plattform zu diesem Beitrag meldet — seit dem 05.09.2026.
   *
   * **Buffer liefert Kennzahlen fuer alle drei Kanaele**, im kostenlosen Tarif
   * und mit demselben Token, das ohnehin in `.env` liegt. Bis dahin las
   * `npm run rueckblick` „ausschliesslich YouTube", und der Nordstern des
   * Kanals — geteilt und neue Abonnenten — war auf Instagram und TikTok
   * unsichtbar.
   *
   * Die Namen kommen von Buffer und sind je Dienst verschieden: TikTok meldet
   * „Video Views", Instagram „Views"; nur Instagram kennt „Saves" und
   * „Follows", nur TikTok „Avg. Watch Time (sec)". Uebersetzt wird in
   * `skripte/rueckblick.ts`, nicht hier — hier steht, was ankommt.
   *
   * **Es sind Momentaufnahmen**, keine Kurven: `metricsUpdatedAt` sagt, wann
   * Buffer zuletzt nachgesehen hat. Deshalb schreibt der Rueckblick sie taeglich
   * weg, statt sie bei Bedarf zu holen.
   */
  kennzahlen: { name: string; wert: number }[];
  /** Wann Buffer die Kennzahlen zuletzt geholt hat. */
  kennzahlenStand: string | null;
};

/**
 * Alle gesendeten Beitraege der Organisation, mit ihrer Adresse draussen.
 *
 * Das ist die einzige Bruecke zwischen einem Entwurf auf der Platte und dem
 * Video auf einer Plattform: `veroeffentlicht.json` haelt `shortId` und
 * `beitragId`, und hier kommt zur `beitragId` der `externalLink` dazu.
 *
 * Die Zahlen selbst holt Buffer **nicht** — siehe `src/youtube.ts`. Das
 * `metrics`-Feld existiert, bleibt aber auf Null stehen.
 */
export const gesendeteBeitraege = async (
  schluessel: string,
  organisationId: string,
): Promise<GesendeterBeitrag[]> => {
  const alle: GesendeterBeitrag[] = [];
  let cursor: string | null = null;

  // Seitenweise, weil die Liste mit jeder Woche um zwei Dutzend waechst.
  for (;;) {
    type Seite = {
      posts: {
        edges: {
          cursor: string;
          node: {
          id: string;
          channelService: string;
          sentAt: string | null;
          externalLink: string | null;
          metricsUpdatedAt: string | null;
          metrics: { name: string; value: number }[] | null;
        };
        }[];
        pageInfo: { hasNextPage: boolean };
      };
    };
    const seite: Seite = await abfragen<Seite>(
      schluessel,
      `query($i: PostsInput!, $after: String) {
         posts(input: $i, first: 100, after: $after) {
           edges { cursor node { id channelService sentAt externalLink metricsUpdatedAt metrics { name value } } }
           pageInfo { hasNextPage }
         }
       }`,
      { i: { organizationId: organisationId, filter: { status: 'sent' } }, after: cursor },
    );

    for (const e of seite.posts.edges) {
      alle.push({
        id: e.node.id,
        dienst: e.node.channelService,
        gesendetAm: e.node.sentAt,
        link: e.node.externalLink,
        kennzahlen: (e.node.metrics ?? []).map((m) => ({ name: m.name, wert: m.value })),
        kennzahlenStand: e.node.metricsUpdatedAt,
      });
    }

    if (!seite.posts.pageInfo.hasNextPage || seite.posts.edges.length === 0) break;
    cursor = seite.posts.edges[seite.posts.edges.length - 1]!.cursor;
  }

  return alle;
};

/**
 * Wie viele Beitraege je Kanal schon in der Warteschlange stehen.
 *
 * Buffer begrenzt die geplanten Beitraege **je Kanal** — im kostenlosen Tarif
 * auf zehn. Das Limit meldet sich erst beim Anlegen, mit
 * `LimitReachedError`, und dann steht die Haelfte schon draussen: Am
 * 18.08.2026 brach ein Lauf nach dem zwoelften von 24 Beitraegen ab, weil die
 * laufende Woche die Plaetze noch belegte.
 *
 * Vorher zaehlen kostet eine Abfrage und erspart einen halb ausgefuehrten
 * Versand — den man nicht zurueckdrehen kann, ohne in Buffer von Hand zu
 * loeschen.
 */
export const geplanteJeKanal = async (
  schluessel: string,
  organisationId: string,
): Promise<Map<string, number>> => {
  const seite = await abfragen<{
    posts: { edges: { node: { channelId: string } }[] };
  }>(
    schluessel,
    `query($i: PostsInput!) { posts(input: $i, first: 100) { edges { node { channelId } } } }`,
    { i: { organizationId: organisationId, filter: { status: 'scheduled' } } },
  );

  const zaehler = new Map<string, number>();
  for (const e of seite.posts.edges) {
    zaehler.set(e.node.channelId, (zaehler.get(e.node.channelId) ?? 0) + 1);
  }
  return zaehler;
};

/** Buffers Obergrenze je Kanal im kostenlosen Tarif. */
export const GEPLANT_MAXIMUM = 10;

/**
 * Die Sendeplaetze einer Woche — Wochentag und Uhrzeit, seit dem 04.09.2026.
 *
 * ## Warum Plaetze und nicht fortlaufende Tage
 *
 * Bis hierhin rechnete `zeitplanBauen` „ein Video je Tag ab dem Wochenbeginn",
 * die Uhrzeit kam aus dem Format. Das trug vier Videos an vier
 * aufeinanderfolgenden Tagen. Fuenf Videos auf Mo, Mi, Fr, Sa, So lassen sich
 * so nicht ausdruecken: Zwischen Montag und Mittwoch liegt eine Luecke,
 * zwischen Freitag, Samstag und Sonntag keine.
 *
 * **Der Wochentag ist damit nicht zurueck.** Was am 20.08.2026 gestrichen
 * wurde, war die Zuordnung **Format → Tag** — montags die Skala, dienstags das
 * Maerchen. Die gibt es nicht wieder: Welche Rubrik an welchem Platz laeuft,
 * entscheidet die Woche, nicht der Kalender. Fest ist, **dass** gesendet wird,
 * nicht **was**.
 *
 * ## Warum die Uhrzeit hier steht und nicht mehr am Format
 *
 * `FORMATE[...].uhrzeit` stand bei allen vier Formaten auf 18 und trug damit
 * nichts mehr bei. Die Zeit gehoert zum **Platz**: Der Zuschauer sieht den
 * Feed, nicht die Rubrik.
 *
 * ## Woher die Zahlen kommen
 *
 * Gemessen von Metricool 2026 (2 Mio. TikTok-Beitraege aus 92.000 Konten) und
 * Sprout Social (2 Mrd. Interaktionen, Nov 2025 bis Feb 2026): TikTok laeuft
 * 18 bis 20 Uhr am besten, **Samstag** ist dort der staerkste Tag; YouTube
 * Shorts 12 bis 15 und 17 bis 20 Uhr; Instagram hat um **20 Uhr** die meisten
 * Aufrufe — siehe `UHRZEIT_JE_DIENST` in `skripte/veroeffentlichen.ts`.
 *
 * **Die eigenen Zahlen sagen dazu nichts**, und das gehoert danebengeschrieben:
 * 13 der 15 gemessenen Videos liefen um 18 Uhr, zwei um 12 — bei einer
 * Streuung von 7 bis 701 Aufrufen. Der Unterschied zwischen den Plaetzen ist um
 * ein Vielfaches kleiner als die Streuung innerhalb eines Platzes.
 */
export const SENDEPLAETZE = [
  { tag: 1, uhrzeit: 18 }, // Montag
  { tag: 3, uhrzeit: 18 }, // Mittwoch
  { tag: 5, uhrzeit: 18 }, // Freitag
  { tag: 6, uhrzeit: 18 }, // Samstag — staerkster TikTok-Tag
  { tag: 0, uhrzeit: 18 }, // Sonntag
] as const;

/**
 * Die Termine einer Woche, je Short einer.
 *
 * `beginn` ist der Montag der Sendewoche; die Plaetze liegen darauf. Der
 * Sonntag gehoert ans **Ende** der Woche und nicht an ihren Anfang — deshalb
 * rechnet die Zeile unten `(tag + 6) % 7`, was aus dem Sonntag den sechsten Tag
 * nach Montag macht.
 *
 * **Mehr Shorts als Plaetze gibt es nicht.** Der Takt ist fuenf, die Liste hat
 * fuenf Eintraege; ein sechster Short bekaeme sonst still den Montag der
 * Folgewoche. Er wirft.
 */
export const zeitplanBauen = (shorts: Short[], beginn: Date): Date[] => {
  if (shorts.length > SENDEPLAETZE.length) {
    throw new Error(
      `${shorts.length} Shorts, aber nur ${SENDEPLAETZE.length} Sendeplätze. ` +
        'Der Takt ist fünf je Woche — mehr braucht einen zusätzlichen Platz in `SENDEPLAETZE`.',
    );
  }
  return shorts.map((_, i) => {
    const platz = SENDEPLAETZE[i]!;
    const zeitpunkt = new Date(beginn);
    zeitpunkt.setDate(zeitpunkt.getDate() + ((platz.tag + 6) % 7));
    zeitpunkt.setHours(platz.uhrzeit, 0, 0, 0);
    return zeitpunkt;
  });
};

/**
 * Vorlauf fuer einen Termin, der eigentlich schon vorbei ist.
 *
 * Buffer plant in die Zukunft. Ein Termin in der Vergangenheit wird entweder
 * abgelehnt oder sofort veroeffentlicht — beides ohne Vorwarnung, und beides
 * will man nicht als Ueberraschung.
 */
export const VORLAUF_MIN = 8;

/**
 * Schiebt vergangene Termine nach vorn, gestaffelt.
 *
 * Gebraucht am 17.08.2026: Die erste Woche sollte am selben Montag starten,
 * an dem sie gebaut wurde, und der 18-Uhr-Platz war um 20:22 laengst vorbei.
 *
 * **Gestaffelt** deshalb, weil sonst mehrere nachgezogene Shorts auf dieselbe
 * Minute fielen. Genau dagegen steht die Uhrzeit am Format: Zwei Videos zur
 * selben Zeit nehmen sich die Reichweite. Ein Fehler, den kein Schema
 * bemerkt, weil der Plan formal richtig bleibt — er darf hier nicht durch die
 * Hintertuer zurueckkommen.
 */
export const nichtInDerVergangenheit = (zeiten: Date[], jetzt: Date): Date[] => {
  let nachgezogen = 0;
  return zeiten.map((zeitpunkt) => {
    if (zeitpunkt.getTime() > jetzt.getTime()) return zeitpunkt;
    const versatz = (VORLAUF_MIN + nachgezogen * 3) * 60_000;
    nachgezogen += 1;
    return new Date(jetzt.getTime() + versatz);
  });
};

/** Naechster Montag ab einem Stichtag — der Wochenlauf beginnt montags. */
export const naechsterMontag = (ab: Date): Date => {
  const d = new Date(ab);
  d.setHours(0, 0, 0, 0);
  const bisMontag = (8 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + bisMontag);
  return d;
};
