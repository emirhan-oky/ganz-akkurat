import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { KANAL_STIMME, synthetisieren } from '../src/stimme';
import { ZEICHEN_PRO_SEKUNDE } from '../src/zeit';

/**
 * Erzeugt Hoerproben mehrerer Stimmen mit identischem Text.
 *
 * Nur so ist ein Vergleich fair: gleiche Saetze, gleiche Einstellungen,
 * einziger Unterschied ist die Stimme.
 *
 * Der Probetext ist kein beliebiger Absatz, sondern enthaelt genau die vier
 * Stellen, an denen deutsche Stimmen auseinanderfallen: die direkte Ansprache
 * („dein"), einen englischen Fachbegriff mitten im deutschen Satz
 * („DisplayPort Alt Mode"), eine ausgeschriebene Zahl mit Einheit und einen
 * trockenen Nachsatz, der die Entwarnung traegt. Wer den letzten Satz
 * feierlich liest, passt nicht zu diesem Kanal.
 */

const PROBETEXT =
  'Dein Dock lädt, aber der Monitor bleibt schwarz. Das liegt fast nie am Dock. ' +
  'Ein USB-C-Anschluss überträgt nur dann ein Bild, wenn er DisplayPort Alt Mode beherrscht. ' +
  'Zwanzig Volt mal drei Ampere sind sechzig Watt — mehr gibt ein einfaches Kabel nicht her. ' +
  'Ansehen kannst du ihm das nicht.';

/**
 * Die Kandidaten stammen aus der Stimmbibliothek, gefiltert auf Deutsch und
 * maennlich.
 *
 * **Zweite Runde, andere Achse.** Die erste Runde am 13.08.2026 filterte auf
 * `narrative_story` und lieferte damit Erzaehler: warm, gesetzt, getragen.
 * Alle sechs fielen durch, und im Rueckblick zu Recht — eine Hoerbuchstimme
 * erzaehlt, dieser Kanal erklaert. Der Unterschied hoert sich schon im ersten
 * Satz.
 *
 * Gesucht wird jetzt entlang einer einzigen Frage: **Klingt das nach einem
 * Menschen oder nach einem Sprecher?** Die Filter dafuer sind
 * `social_media` und `informative_educational`, die Merkmale `casual`,
 * `conversational` und `upbeat`. Ausgelassen bleibt alles mit `deep`,
 * `narrator` oder `epic` im Namen.
 */
const KANDIDATEN = [
  { id: '6n4YmXLiuP4C7cZqYOJl', name: 'Finn', beschreibung: 'frisch, im Gespraechston' },
  { id: 'YQCQPPJTHYAQGhuwY6gZ', name: 'Jonas', beschreibung: 'jung, sachkundig, gelassen' },
  { id: '7EKf9tDpNnyY22oEtrvq', name: 'Simon-Sunday', beschreibung: 'betont normal, kein Sprecherton' },
  { id: '6IEvIqBOPOMUc5HwR9sQ', name: 'Lenny', beschreibung: 'lockerer Creator-Ton' },
  { id: 'xj61lbryotizgwAuHImw', name: 'Mark-Albrecht', beschreibung: 'trocken-witzig, Radio' },
  { id: 'raYPS0b2ZPlIzZWkcD0G', name: 'Lars', beschreibung: 'jung, wach, schnell' },
  { id: 'n6JEKnKG5a8I78SoBRry', name: 'Julius', beschreibung: 'erklaerend, beilaeufig' },
  { id: 'AMJfLTmTy3vPtjSvrGqZ', name: 'Peter-Hartlapp', beschreibung: 'Podcast, tiefer' },
];

const ZIEL = 'laeufe/stimmproben';

const main = async () => {
  const schluessel = process.env.ELEVENLABS_API_KEY;
  if (!schluessel) throw new Error('ELEVENLABS_API_KEY fehlt in .env');

  await fs.mkdir(ZIEL, { recursive: true });
  console.log(
    `Probetext: ${PROBETEXT.length} Zeichen je Stimme, ` +
      `${KANDIDATEN.length * PROBETEXT.length} Zeichen insgesamt\n`,
  );

  const tempi: number[] = [];

  for (const kandidat of KANDIDATEN) {
    try {
      const synthese = await synthetisieren(
        PROBETEXT,
        { stimmeId: kandidat.id, ...KANAL_STIMME },
        schluessel,
      );
      const datei = path.join(ZIEL, `${kandidat.name}.mp3`);
      await fs.writeFile(datei, synthese.ton);

      const tempo = PROBETEXT.length / synthese.dauerSek;
      tempi.push(tempo);
      console.log(
        `✓ ${kandidat.name.padEnd(18)} ${synthese.dauerSek.toFixed(1).padStart(5)}s  ` +
          `${tempo.toFixed(1)} Zeichen/s  ${kandidat.id}  (${kandidat.beschreibung})`,
      );
    } catch (fehler) {
      console.log(`✕ ${kandidat.name.padEnd(18)} ${(fehler as Error).message.slice(0, 120)}`);
    }
  }

  /*
   * Das Sprechtempo ist hier ein Nebenprodukt und trotzdem der genaueste
   * Wert, den es gibt: `npm run sprechprobe` misst mit der Systemstimme von
   * macOS, hier spricht die Stimme, die spaeter wirklich im Video zu hoeren
   * ist. Weicht der Wert deutlich von `ZEICHEN_PRO_SEKUNDE` in `src/zeit.ts`
   * ab, gehoert die Formel auf die gewaehlte Stimme nachgezogen — sonst
   * liegen die Zielfenster daneben.
   */
  if (tempi.length > 0) {
    const schnitt = tempi.reduce((a, b) => a + b, 0) / tempi.length;
    console.log(
      `\n  Sprechtempo im Schnitt: ${schnitt.toFixed(1)} Zeichen/s` +
        ` — src/zeit.ts rechnet mit ${ZEICHEN_PRO_SEKUNDE.toFixed(1).replace('.', ',')}`,
    );
    console.log(`  Die Werte streuen je Stimme; maßgeblich ist die, die du wählst.`);
  }

  console.log(`\nHörproben liegen in ${ZIEL}/`);
  console.log(`Anhören mit:  open ${ZIEL}`);
  console.log(`Danach ELEVENLABS_VOICE_ID in .env auf die Kennung der gewählten Stimme setzen.`);
};

main().catch((fehler) => {
  console.error(fehler.message);
  process.exit(1);
});
