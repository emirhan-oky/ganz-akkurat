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

/**
 * Wattis Probetext — **seine echten Zeilen**, nicht der Kanal-Probetext.
 *
 * Der obere Text prueft, ob eine Stimme erklaeren kann. Watti erklaert nichts:
 * Er gesteht, zieht falsche Schluesse und ist ratlos. Ob eine Stimme das
 * traegt, hoert man an einer Erklaerung nicht — deshalb hier vier Zeilen aus
 * dem Eichmass vom 25.08.2026, je eine Machart.
 *
 * „Watt?" steht bewusst vorn: Es ist sein wiederkehrender Ausruf, und wenn eine
 * Stimme daran scheitert, scheitert sie in jedem zweiten Video.
 */
const WATTI_TEXT =
  'Watt? Ich mache das seit zehn Jahren. ' +
  'Bin bei Passwort7. ' +
  'Also war das alles umsonst? ' +
  'Volti, das hat sich jemand ausgedacht.';

/**
 * Wattis Kandidaten — gesucht am **Abstand zu Volti**.
 *
 * Volti bleibt Lenny bei 137 Hz; die Paarrunde vom 25.08.2026 hat ihn
 * bestaetigt, nachdem er kurz zur Disposition stand. Was zaehlt, ist damit nur
 * noch eine Zahl: **mindestens 40 Hz Abstand**, also ueber 177 oder unter 97.
 * Darunter klingen zwei Stimmen im Wechsel wie eine.
 *
 * Von achtzehn gemessenen Stimmen erfuellt das genau eine sauber — Olaf mit
 * 182 Hz. Callya liegt bei 172 knapp darunter, Peter-Hartlapp trennt mit 88 Hz
 * gut und spricht dafuer nur 11,6 Zeichen/s, was bei Zwei-Wort-Einwuerfen
 * schleppt. Deshalb diese Runde im hohen Bereich.
 *
 * Zwei Anlaeufe davor sind an der falschen Achse gescheitert. Die acht
 * Erzaehler oben liegen fast alle neben Voltis 137 Hz — Lars bei 132, also
 * fuenf Hertz daneben, was im Wechsel derselbe Sprecher waere. Und
 * `characters_animation` war zu kindisch: Nach dem Aussieben von Schrei-,
 * Horror- und Roboterstimmen bleiben dort **zwei** deutsche Stimmen. Die
 * Kategorie ist fuer Kinderformate gebaut.
 *
 * Die Spur hier ist `conversational` und `social_media`, Alter `young` — 57
 * beziehungsweise 50 Stimmen, und niemand hat sie probiert. Jemand, der
 * **redet**, statt zu erzaehlen oder eine Figur zu spielen. Nachrichten-
 * sprecher, Kommentatoren und Motivationsredner sind aussortiert: alles
 * Vortragsregister.
 *
 * Vali und Gerry stehen bewusst dabei, obwohl sie tiefer liegen. Ohne sie
 * bestuende der Topf nur aus hohen Stimmen, und dann gaebe es kein Paar mit
 * Abstand, sondern zehn Wattis.
 */
const PAAR_KANDIDATEN = [
  // Zweite Messung derselben drei — die Streuung der Synthese pruefen.
  { id: 'ZDsEGXYAf6c4QY0LNSHr', name: 'Prayan-2', beschreibung: 'schrullig, energisch' },
  { id: 'UafGxvF2q1XMC9Qy4tPR', name: 'Clowny-2', beschreibung: 'lustig, aufgedreht' },
  { id: 'iwRzSAbd1d305sh0TAAy', name: 'Olaf-2', beschreibung: 'froehlich, jung' },
  { id: '6IEvIqBOPOMUc5HwR9sQ', name: 'Volti-Lenny', beschreibung: 'die laufende Kanalstimme' },
];

/**
 * Der Paar-Probetext — **beide Register in einer Datei.**
 *
 * Zuerst ein Zitatsatz, wie Volti ihn traegt: Amtsdeutsch hinter einem
 * Doppelpunkt, sachlich, ohne Pointe. Dann zwei Einwuerfe, wie Watti sie sagt:
 * kurz, ratlos, mit Gestaendnis. So hoert man je Stimme, welche der beiden
 * Rollen sie besser kann — und ob sie beide kann.
 *
 * „Watt?" steht bewusst dazwischen: Es ist Wattis wiederkehrender Ausruf, und
 * eine Stimme, die daran scheitert, scheitert in jedem zweiten Video.
 */
const PAAR_TEXT =
  'Beim BSI steht: Ein routinemäßiger Passwortwechsel erhöht die Sicherheit nicht automatisch. ' +
  'Watt? Ich mache das seit zehn Jahren. Bin bei Passwort7.';

/** `--paar` hoert beide Register ab, ohne `--paar` den alten Kanal-Probetext. */
const WATTI = process.argv.includes('--paar') || process.argv.includes('--watti');

const ZIEL = WATTI ? 'laeufe/stimmproben-paar' : 'laeufe/stimmproben';

const main = async () => {
  const schluessel = process.env.ELEVENLABS_API_KEY;
  if (!schluessel) throw new Error('ELEVENLABS_API_KEY fehlt in .env');

  await fs.mkdir(ZIEL, { recursive: true });
  console.log(
    `${WATTI ? 'Beide Register' : 'Probetext'}: ${(WATTI ? PAAR_TEXT : PROBETEXT).length} Zeichen je Stimme, ` +
      `${(WATTI ? PAAR_KANDIDATEN : KANDIDATEN).length * (WATTI ? PAAR_TEXT : PROBETEXT).length} Zeichen insgesamt\n`,
  );

  const tempi: number[] = [];

  for (const kandidat of WATTI ? PAAR_KANDIDATEN : KANDIDATEN) {
    try {
      const synthese = await synthetisieren(
        WATTI ? PAAR_TEXT : PROBETEXT,
        { stimmeId: kandidat.id, ...KANAL_STIMME },
        schluessel,
      );
      const datei = path.join(ZIEL, `${kandidat.name}.mp3`);
      await fs.writeFile(datei, synthese.ton);

      const tempo = (WATTI ? PAAR_TEXT : PROBETEXT).length / synthese.dauerSek;
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
  console.log(`Danach ${WATTI ? 'ELEVENLABS_VOICE_ID (Volti) und ELEVENLABS_VOICE_ID_ZEIGER (Watti)' : 'ELEVENLABS_VOICE_ID'} in .env auf die Kennung der gewählten Stimme setzen.`);
};

main().catch((fehler) => {
  console.error(fehler.message);
  process.exit(1);
});
