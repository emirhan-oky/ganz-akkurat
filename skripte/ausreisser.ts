import {
  GENUG_FUER_MEDIAN,
  GENUG_JE_FORMAT,
  herkuenfteLesen,
  median,
  prozent,
  rueckblickLesen,
  tageDraussen,
  tageText,
  zusammenfuehren,
  type Rueckschau,
} from '../src/rueckschau';
import { FORMATE, type Format } from '../src/typen';

/**
 * `npm run ausreisser` — was hatte dieses eine?
 *
 * Bis hierher war der Rücklauf eine Liste: `daten/rueckblick.json` sagt, was
 * ein Video erreicht hat, aber nicht, **was es war**. Format, Sachgebiet und
 * Thema stehen in `laeufe/<tag>/lauf.json`, und niemand legte beides
 * nebeneinander.
 *
 * Die Frage, auf die dieses Skript antwortet, steht in der CLAUDE.md:
 * nicht „welches Format ist gut" — dafür reichen die Daten auf Monate nicht —,
 * sondern **„was hatte dieses eine, das dreimal so gut lief"**.
 *
 * Deshalb rechnet es Ausreißer und keine Durchschnitte. Ein Median über acht
 * Videos ist eine Hausnummer; ein Video, das doppelt so lange hält wie der
 * Median, ist ein Fingerzeig — und der trägt schon nach zwei Wochen.
 *
 * **Es urteilt nicht über Formate, solange es nicht darf.** Unter fünf
 * gemessenen Videos je Format steht dort „zu wenig" und keine Zahl. Geratene
 * Größen haben dieses Projekt schon zweimal Geld gekostet
 * (`ZEICHEN_PRO_SEKUNDE`, `pauseSek`); eine geratene Reichweitenregel wäre die
 * dritte und die teuerste, weil sie die Themenwahl steuert.
 *
 *   npm run ausreisser
 */

/** Ab welchem Vielfachen des Medians ein Video als Ausreißer gilt. */
const AUSREISSER_FAKTOR = 2;

const zeile = (r: Rueckschau, markiert: boolean): string => {
  const h = r.herkunft;
  const m = r.mitHalt;
  return (
    `${markiert ? '▲' : ' '} ` +
    `${prozent(m?.haltequote)}  ${prozent(m?.durchsicht)}  ` +
    `${String(m?.geteilt ?? '—').padStart(7)}  ` +
    `${(h?.format ?? '—').padEnd(13)}` +
    `${(h?.themaId ?? r.eintrag.shortId).padEnd(26)}` +
    `${tageText(tageDraussen(r.eintrag.online)).padStart(8)}` +
    `${String(r.zuletzt.aufrufe).padStart(9)}`
  );
};

const main = async () => {
  const [eintraege, herkuenfte] = await Promise.all([rueckblickLesen(), herkuenfteLesen()]);
  const alle = zusammenfuehren(eintraege, herkuenfte);

  if (alle.length === 0) {
    console.log('Noch nichts gemessen. `npm run rueckblick` holt die Zahlen.');
    return;
  }

  const ohneHerkunft = alle.filter((r) => !r.herkunft).length;
  const mitHalt = alle.filter((r) => r.mitHalt?.haltequote != null);
  const werte = mitHalt.map((r) => r.mitHalt!.haltequote!);
  const mitte = werte.length >= GENUG_FUER_MEDIAN ? median(werte) : null;

  console.log('Ganz akkurat · Ausreißer\n');
  console.log(
    `  ${alle.length} veröffentlichte Shorts, ${mitHalt.length} davon mit Haltekurve.`,
  );
  if (mitte !== null) {
    console.log(`  Median an Sekunde 3,5: ${mitte.toFixed(0)} %. ▲ = mehr als das Doppelte.`);
  } else {
    console.log(
      `  Kein Median: dafür braucht es ${GENUG_FUER_MEDIAN} gemessene Videos, ` +
        `${werte.length} liegen vor.\n  Bis dahin ist die Liste eine Liste und keine Rangfolge.`,
    );
  }
  console.log('');

  console.log('  Halt  Durchs  geteilt  Format       Thema                       draußen  Aufrufe');
  console.log('  ' + '─'.repeat(81));

  // Sortiert nach Haltequote; was keine hat, steht unten statt bei null Prozent.
  const sortiert = [...alle].sort(
    (a, b) => (b.mitHalt?.haltequote ?? -1) - (a.mitHalt?.haltequote ?? -1),
  );

  for (const r of sortiert) {
    const q = r.mitHalt?.haltequote ?? null;
    const markiert = mitte !== null && q !== null && q > mitte * AUSREISSER_FAKTOR;
    console.log('  ' + zeile(r, markiert));
  }
  console.log('  ' + '─'.repeat(81));

  /*
   * Der Formatvergleich steht bewusst hinter einer eigenen Schwelle. Er ist
   * die Zahl, nach der man greifen will — „welcher Sendeplatz trägt?" —, und
   * genau deshalb die gefährlichste: Bei acht Formaten und acht Videos die
   * Woche hat jedes Format nach vier Wochen vier Messungen. Wer daraus einen
   * Sendeplatz streicht, hat eine Woche Zufall zur Regel gemacht.
   */
  console.log('\n  Je Format');
  for (const format of Object.keys(FORMATE) as Format[]) {
    const dazu = mitHalt.filter((r) => r.herkunft?.format === format);
    const eigene = dazu.map((r) => r.mitHalt!.haltequote!);
    const wert = eigene.length >= GENUG_JE_FORMAT ? median(eigene) : null;
    console.log(
      `    ${format.padEnd(14)}${
        wert === null
          ? `zu wenig (${eigene.length} von ${GENUG_JE_FORMAT})`
          : `${wert.toFixed(0)} % aus ${eigene.length} Videos`
      }`,
    );
  }

  if (ohneHerkunft > 0) {
    console.log(
      `\n  ${ohneHerkunft} Short(s) ohne Herkunft: Der zugehörige Lauf liegt nicht mehr unter\n` +
        '  `laeufe/`. Der Ordner steht in .gitignore — auf einem frischen Klon ist er leer.',
    );
  }

  console.log(
    '\n  Die Aufrufe stehen ganz rechts, weil sie am wenigsten sagen: Sie messen,\n' +
      '  was der Algorithmus getan hat. Was der Zuschauer getan hat, steht links.',
  );
};

main().catch((fehler) => {
  console.error('\n✗ ' + (fehler instanceof Error ? fehler.message : String(fehler)));
  process.exit(1);
});
