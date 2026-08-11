import type { Short } from './typen';

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

  const daten = (await antwort.json()) as { data?: T; errors?: { message: string }[] };
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
 * Baut den Beitragstext. Nur die erste Zeile ist ueber dem Video sichtbar —
 * sie traegt deshalb die Aussage, die Hashtags stehen hinten.
 */
export const beitragstext = (short: Short, dienst: string): string | null => {
  const texte = textFuerDienst(short, dienst);
  if (!texte) return null;
  return `${texte.beschreibung}\n\n${texte.hashtags.join(' ')}`.trim();
};

export type Veroeffentlichung = {
  shortId: string;
  kanalId: string;
  dienst: string;
  faelligAm: string;
  beitragId: string;
};

/** Legt einen geplanten Beitrag mit Videoanhang an. */
export const beitragPlanen = async (
  schluessel: string,
  opts: { kanalId: string; text: string; videoUrl: string; titel: string; faelligAm: Date },
): Promise<string> => {
  const daten = await abfragen<{ createPost: { post: { id: string } } }>(
    schluessel,
    /*
     * `aiAssisted` wird gesetzt, weil die Stimme synthetisch ist. Das ist
     * keine Formalie: Es ergaenzt die Kennzeichnung im Bild um die Angabe
     * dort, wo die Plattformen sie auswerten.
     */
    `mutation($channelId: ChannelId!, $text: String!, $dueAt: DateTime!, $url: String!, $titel: String!) {
       createPost(input: {
         channelId: $channelId
         text: $text
         dueAt: $dueAt
         mode: SCHEDULED
         schedulingType: AUTOMATIC
         aiAssisted: true
         assets: [{ video: { url: $url, metadata: { title: $titel, thumbnailOffset: 1000 } } }]
       }) { post { id status dueAt } }
     }`,
    {
      channelId: opts.kanalId,
      text: opts.text,
      dueAt: opts.faelligAm.toISOString(),
      url: opts.videoUrl,
      titel: opts.titel,
    },
  );
  return daten.createPost.post.id;
};

/**
 * Verteilt Shorts auf Veroeffentlichungszeitpunkte.
 *
 * Zwei Beitraege taeglich an fuenf Tagen. Die Uhrzeiten liegen morgens und
 * abends: Das sind die Zeitfenster, in denen im deutschsprachigen Raum am
 * meisten gescrollt wird — ohne dass beide Beitraege eines Tages
 * miteinander um dieselbe Aufmerksamkeit konkurrieren.
 */
export const zeitplanBauen = (shorts: Short[], beginn: Date): Date[] => {
  const UHRZEITEN = [8, 18];
  return shorts.map((_, i) => {
    const tag = Math.floor(i / UHRZEITEN.length);
    const stunde = UHRZEITEN[i % UHRZEITEN.length]!;
    const zeitpunkt = new Date(beginn);
    zeitpunkt.setDate(zeitpunkt.getDate() + tag);
    zeitpunkt.setHours(stunde, 0, 0, 0);
    return zeitpunkt;
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
