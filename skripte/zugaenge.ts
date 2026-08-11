import 'dotenv/config';
import { kanaeleLesen, naechsterMontag, organisationErmitteln, zeitplanBauen } from '../src/buffer';
import { zugangAusUmgebung } from '../src/ablage';
import { dockKeinBild } from '../daten/entwuerfe/dock-kein-bild';

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

const pexels = async () => {
  const s = process.env.PEXELS_API_KEY;
  if (!s) return offen('Pexels', 'PEXELS_API_KEY fehlt (nur für Akzentmaterial nötig)');
  const a = await fetch('https://api.pexels.com/videos/search?query=desk&per_page=1', { headers: { Authorization: s } });
  a.ok ? gut('Pexels', 'erreichbar') : schlecht('Pexels', `HTTP ${a.status}`);
};

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

const ablage = async () => {
  try {
    const z = zugangAusUmgebung();
    // Ein Schreibversuch waere teurer als noetig: erreicht die oeffentliche
    // Basisadresse ueberhaupt jemanden?
    const a = await fetch(z.oeffentlicheBasis, { method: 'HEAD' }).catch(() => null);
    gut('Dateiablage', `Bucket ${z.bucket}, öffentlich unter ${z.oeffentlicheBasis}${a ? '' : ' (nicht erreichbar)'}`);
  } catch (f) {
    schlecht('Dateiablage', (f as Error).message.split('\n')[0]!);
  }
};

const main = async () => {
  console.log('SetupKlar · Zugänge\n');
  await elevenlabs();
  await pexels();
  await buffer();
  await ablage();

  console.log('\nVeröffentlichungsrhythmus');
  const montag = naechsterMontag(new Date());
  const zeiten = zeitplanBauen(Array(10).fill(dockKeinBild[0]!), montag);
  const erste = zeiten[0]!;
  const letzte = zeiten[zeiten.length - 1]!;
  const f = (d: Date) =>
    d.toLocaleString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  console.log(`  10 Videos, 2 je Tag an 5 Tagen`);
  console.log(`  von ${f(erste)} bis ${f(letzte)}`);
};

main().catch((f) => {
  console.error(f.message);
  process.exit(1);
});
