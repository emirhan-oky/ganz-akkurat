import {
  AUFSCHLAG_SEK,
  herkuenfteLesen,
  median,
  prozent,
  rueckblickLesen,
  seitText,
  tageDraussen,
  zusammenfuehren,
} from '../src/rueckschau';

/**
 * `npm run aufschlaege` — der eigene Aufschlag neben der Zahl, die ihn misst.
 *
 * Das Gegenstück zu `npm run belege`. Dort stehen Sprechtext und Zitat
 * nebeneinander, und ein Mensch entscheidet, ob das eine das andere trägt.
 * Hier stehen Aufschlagtext und Haltequote nebeneinander, und ein Mensch
 * entscheidet, was daran gehalten hat.
 *
 * **Warum genau der Aufschlag und keine andere Szene:** Er ist die einzige,
 * bei der das Publikum noch nicht entschieden hat. `src/pruefung.ts` gibt ihm
 * höchstens 3,5 Sekunden, und `src/youtube.ts` liest die Haltekurve an
 * derselben Stelle aus. Die Zahl misst also nicht „das Video", sondern
 * diesen einen Satz.
 *
 * **Das Skript urteilt nicht und kann es nicht.** Es sortiert und stellt
 * nebeneinander. Was einen Aufschlag trägt — die Frechheit, die Zahl, die
 * Anrede —, sieht man beim Lesen von zwanzig Stück und nicht in einer
 * Kennzahl. Genau das ist auch der Grund, warum hier keine Hook-Formel aus
 * einem fremden Ratgeber steht: Die kennt den Kanal nicht.
 *
 *   npm run aufschlaege
 *   npm run aufschlaege -- --alle   # auch die ohne Haltekurve
 */

const NUR_MIT_ZAHL = !process.argv.includes('--alle');
const BREITE = 72;

/** Bricht auf `BREITE` um, ohne Wörter zu zerschneiden. */
const umbrechen = (text: string): string[] => {
  const zeilen: string[] = [];
  let laufend = '';
  for (const wort of text.split(/\s+/)) {
    if (laufend && (laufend + ' ' + wort).length > BREITE) {
      zeilen.push(laufend);
      laufend = wort;
    } else {
      laufend = laufend ? laufend + ' ' + wort : wort;
    }
  }
  if (laufend) zeilen.push(laufend);
  return zeilen;
};

const main = async () => {
  const [eintraege, herkuenfte] = await Promise.all([rueckblickLesen(), herkuenfteLesen()]);
  const alle = zusammenfuehren(eintraege, herkuenfte);

  if (alle.length === 0) {
    console.log('Noch nichts gemessen. `npm run rueckblick` holt die Zahlen.');
    return;
  }

  const mitText = alle.filter((r) => r.herkunft?.aufschlag);
  const gezeigt = NUR_MIT_ZAHL
    ? mitText.filter((r) => r.mitHalt?.haltequote != null)
    : mitText;

  console.log(`Ganz akkurat · Aufschläge\n`);

  if (gezeigt.length === 0) {
    console.log(
      `  ${mitText.length} ${mitText.length === 1 ? 'Aufschlag' : 'Aufschläge'} vorhanden, ` +
        'aber noch keiner mit Haltekurve.\n' +
        '  YouTube verbucht Analytics mit ein bis drei Tagen Verzug — das ist kein\n' +
        '  Fehler, sondern der Normalfall. `--alle` zeigt sie trotzdem.',
    );
    return;
  }

  const werte = gezeigt
    .map((r) => r.mitHalt?.haltequote)
    .filter((q): q is number => q != null);
  const mitte = median(werte);

  console.log(
    `  ${gezeigt.length} ${gezeigt.length === 1 ? 'Aufschlag' : 'Aufschläge'}, gemessen an Sekunde ${AUFSCHLAG_SEK.toString().replace('.', ',')} — ` +
      'dem Ende des Aufschlags.',
  );
  if (mitte !== null && werte.length > 1) {
    console.log(`  Median: ${mitte.toFixed(0)} %.`);
  }
  console.log('');

  const sortiert = [...gezeigt].sort(
    (a, b) => (b.mitHalt?.haltequote ?? -1) - (a.mitHalt?.haltequote ?? -1),
  );

  for (const r of sortiert) {
    const h = r.herkunft!;
    const zeilen = umbrechen(h.aufschlag);
    console.log(
      `  ${prozent(r.mitHalt?.haltequote)}  „${zeilen[0] ?? ''}${zeilen.length === 1 ? '"' : ''}`,
    );
    for (let i = 1; i < zeilen.length; i++) {
      console.log(`         ${zeilen[i]}${i === zeilen.length - 1 ? '"' : ''}`);
    }
    console.log(
      `         ${h.format} · ${h.sachgebiet} · ${seitText(tageDraussen(r.eintrag.online))}`,
    );
    console.log('');
  }

  console.log(
    '  Die Frage beim Lesen: Was tut der obere Satz, was der untere nicht tut?\n' +
      '  Nicht „welches Format" — welcher Zugriff.',
  );
};

main().catch((fehler) => {
  console.error('\n✗ ' + (fehler instanceof Error ? fehler.message : String(fehler)));
  process.exit(1);
});
