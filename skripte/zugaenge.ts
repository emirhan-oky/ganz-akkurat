import 'dotenv/config';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { kanaeleLesen, naechsterMontag, organisationErmitteln, zeitplanBauen } from '../src/buffer';
import { hochladen, loeschen, oeffentlichErreichbar, zugangAusUmgebung } from '../src/ablage';
import { WOCHENLAUF } from '../daten/entwuerfe';

/**
 * Zugangspruefung.
 *
 * Prueft alle vier Dienste auf einmal und sagt bei jedem, was genau fehlt.
 * Nuetzlich nach jedem Tarifwechsel oder Schluesseltausch — sonst faellt ein
 * abgelaufener Zugang erst mitten im Wochenlauf auf, wenn schon Zeichen
 * verbraucht und Videos gerendert sind.
 *
 * Aufruf: npm run zugaenge
 */

const gut = (name: string, text: string) => console.log(`  ✓ ${name.padEnd(14)} ${text}`);
const schlecht = (name: string, text: string) => console.log(`  ✕ ${name.padEnd(14)} ${text}`);
const offen = (name: string, text: string) => console.log(`  · ${name.padEnd(14)} ${text}`);

const elevenlabs = async () => {
  const s = process.env.ELEVENLABS_API_KEY;
  if (!s) return schlecht('ElevenLabs', 'ELEVENLABS_API_KEY fehlt in .env');

  const a = await fetch('https://api.elevenlabs.io/v1/user/subscription', { headers: { 'xi-api-key': s } });
  const d = (await a.json()) as { tier?: string; character_count?: number; character_limit?: number; detail?: { message: string } };
  if (!a.ok) return schlecht('ElevenLabs', d.detail?.message ?? `HTTP ${a.status}`);

  const rest = (d.character_limit ?? 0) - (d.character_count ?? 0);
  const shorts = Math.floor(rest / 520);
  gut('ElevenLabs', `Tarif ${d.tier}, ${rest} Zeichen frei (~${shorts} Shorts)`);

  if (d.tier === 'free') {
    offen('', 'Free-Tarif: keine deutschen Stimmen über die API, Kontingent deckt ~35 % des Bedarfs');
  }
  if (!process.env.ELEVENLABS_VOICE_ID) {
    offen('', 'ELEVENLABS_VOICE_ID nicht gesetzt – es läuft die englische Standardstimme');
  }
};

/*
 * Hier stand bis zum 14.08.2026 eine Pexels-Pruefung, fuer Stock-Aufnahmen als
 * Akzentmaterial. Sie ist raus, weil kein Schritt der Pipeline sie je abgerufen
 * hat und keiner sie abrufen wird: Alles Sichtbare ist Eigenbau-Vektorgrafik.
 *
 * Der Anlass war die Frage, ob wir Stock brauchen, sobald es Werbepartner gibt.
 * Umgekehrt — ein Partner liefert Material, und genau das wollen wir nicht:
 * Herstellerfootage ist Marketingmaterial und behauptet Technisches, ohne dass
 * eine `quelleId` daran haengt. Dasselbe Argument wie gegen KI-Bilder.
 *
 * Die Pexels-Lizenz haette es ohnehin verengt: „Setze niemals voraus, dass dein
 * Produkt von den Personen oder Marken auf den Bildern unterstuetzt wird" —
 * ein Stock-Clip mit erkennbarer Marke neben einem Partnerlink ist genau das.
 */

const buffer = async () => {
  const s = process.env.BUFFER_ACCESS_TOKEN;
  if (!s) return schlecht('Buffer', 'BUFFER_ACCESS_TOKEN fehlt in .env');

  try {
    const org = await organisationErmitteln(s);
    const kanaele = await kanaeleLesen(s, org);
    const aktiv = kanaele.filter((k) => !k.isDisconnected);
    gut('Buffer', `${aktiv.length} Kanäle: ${aktiv.map((k) => k.service).join(', ')}`);
    for (const k of kanaele.filter((x) => x.isDisconnected)) {
      offen('', `Kanal ${k.service} (${k.name}) ist getrennt`);
    }
  } catch (f) {
    schlecht('Buffer', (f as Error).message.slice(0, 110));
  }
};

/**
 * Die Ablage wird mit einem echten Durchlauf geprueft: schreiben, oeffentlich
 * abrufen, wieder loeschen.
 *
 * Ein blosser Blick auf die Zugangsdaten genuegt hier nicht. Der haeufigste
 * Fehler ist ein Bucket, der sich einwandfrei beschreiben laesst, aber nicht
 * oeffentlich freigegeben ist — Buffer koennte die Videos dann nicht laden,
 * und das faellt sonst erst beim Veroeffentlichen auf.
 */
const ablage = async () => {
  let z;
  try {
    z = zugangAusUmgebung();
  } catch (f) {
    return schlecht('Dateiablage', (f as Error).message.split('\n')[0]!);
  }

  const probe = 'verbindungstest.txt';
  const datei = path.join(os.tmpdir(), probe);
  await fs.writeFile(datei, `Ganz akkurat Verbindungstest\n`);

  try {
    await hochladen(z, datei, probe);
    gut('Dateiablage', `Schreiben auf Bucket ${z.bucket} funktioniert`);
  } catch (f) {
    const text = (f as Error).message;
    if (/403|AccessDenied/.test(text)) {
      schlecht('Dateiablage', `Bucket ${z.bucket}: Lesen erlaubt, Schreiben verweigert`);
      offen('', 'Das R2-Token hat nur Leserecht. Neues Token mit „Object Read & Write" anlegen.');
    } else {
      schlecht('Dateiablage', text.slice(0, 110));
    }
    return;
  }

  if (!z.oeffentlicheBasis) {
    offen('', 'R2_OEFFENTLICHE_URL fehlt – Bucket → Settings → Public access → Allow Access');
  } else if (await oeffentlichErreichbar(`${z.oeffentlicheBasis}/${probe}`)) {
    gut('', `öffentlich erreichbar unter ${z.oeffentlicheBasis}`);
  } else {
    schlecht('', 'Bucket ist nicht öffentlich freigegeben – Buffer könnte die Videos nicht laden');
  }

  await loeschen(z, probe).catch(() => undefined);
};

const main = async () => {
  console.log('Ganz akkurat · Zugänge\n');
  await elevenlabs();
  await buffer();
  await ablage();

  /*
   * Der Rhythmus wird aus dem echten Wochenlauf gerechnet, nicht aus einer
   * festen Zahl. Hier stand `Array(10)` — zwei Videos je Tag, der Takt von
   * vor der Rubrik-Umstellung. Die Pruefung zeigte damit einen Zeitplan an,
   * den es nicht mehr gibt, an genau der Stelle, an der man ihn kontrolliert.
   */
  console.log('\nVeröffentlichungsrhythmus');
  const montag = naechsterMontag(new Date());
  const zeiten = zeitplanBauen(WOCHENLAUF, montag);
  const erste = zeiten[0]!;
  const letzte = zeiten[zeiten.length - 1]!;
  const f = (d: Date) =>
    d.toLocaleString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  console.log(`  ${WOCHENLAUF.length} Videos, eines je Tag`);
  console.log(`  von ${f(erste)} bis ${f(letzte)}`);
  for (const [i, short] of WOCHENLAUF.entries()) {
    console.log(`  ${f(zeiten[i]!)}  ${short.format.padEnd(20)} ${short.arbeitstitel}`);
  }
};

main().catch((f) => {
  console.error(f.message);
  process.exit(1);
});
