import { FARBEN } from './marke';
import { FORMATE, type Format } from './typen';
import {
  KANAELE,
  vergleichspunkt,
  type Kanal,
  type Kanalmessung,
  type Rueckschau,
} from './rueckschau';

/**
 * Die Kanalwoche — was in einer Woche auf allen drei Kanälen passiert ist.
 *
 * ## Warum es die Seite gibt
 *
 * `npm run rueckblick` holt seit dem 05.09.2026 die Zahlen aller drei Kanäle
 * über Buffer und schreibt sie als `jeKanal` nach `daten/rueckblick.json`.
 * Gelesen hat sie danach niemand: `ausreisser`, `aufschlaege` und `laengen`
 * beantworten je eine Frage, und alle drei sehen nur die YouTube-Felder.
 *
 * Diese Seite legt die drei Kanäle nebeneinander, einmal in der Woche, vor dem
 * Wochenlauf. Sie holt nichts ab und schreibt nichts in die Ablage — sie liest
 * nur, was schon dasteht.
 *
 * ## Die Reihenfolge ist eine Aussage
 *
 * Oben steht der **Nordstern**: geteilt und neue Abonnenten. Die Aufrufe
 * stehen darunter, und das ist kein Layoutzufall — `skripte/rueckblick.ts`
 * nennt sie „die unwichtigste der Zahlen": Sie sagen, was der Algorithmus
 * getan hat, nicht was der Zuschauer getan hat. Eine Seite, die mit der großen
 * Zahl aufmacht, erzieht den Leser auf die falsche Größe.
 *
 * ## Was sie nicht tut
 *
 * Sie glättet nichts. Der Verlauf zeigt die **Messpunkte** und nicht eine
 * Kurve dazwischen: Am 05.09.2026 standen sechs Messtage seit dem 18.08. in
 * der Ablage, mit einer Lücke von sechs Tagen darin. Eine durchgezogene Linie
 * über diese Lücke behauptet eine Entwicklung, die niemand gemessen hat.
 */

const escape = (s: string): string =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** Wie die Kanäle heißen, wenn ein Mensch sie liest. */
const NAME: Record<Kanal, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok',
};

/**
 * Eine Farbe je Kanal, aus der Palette des Kanals und nicht von den
 * Plattformen geliehen.
 *
 * Plattformfarben wären hier naheliegend und falsch: Die Seite gehört uns,
 * nicht den drei Diensten, und drei gesättigte Fremdmarken auf `grund`
 * schlagen jede Zahl darauf tot.
 */
const FARBE: Record<Kanal, string> = {
  youtube: FARBEN.blau,
  instagram: FARBEN.anzeigeZwei,
  tiktok: FARBEN.jaGruen,
};

/**
 * Welche Größe welcher Dienst überhaupt meldet.
 *
 * **Steht hier als Liste, damit die Seite den Unterschied zwischen „null" und
 * „nicht gemessen" zeigen kann.** Buffer schickt für YouTube kein `Reach` und
 * kein `Shares`, für TikTok kein `Follows`. Eine 0 an diesen Stellen wäre eine
 * Messung, die niemand gemacht hat — und genau solche Nullen haben in diesem
 * Projekt schon einmal wochenlang für echte Werte gehalten werden können.
 */
const MELDET_NICHT: Record<Kanal, string[]> = {
  youtube: ['reichweite', 'gespeichert', 'sehdauerSek'],
  instagram: ['sehdauerSek'],
  tiktok: ['gespeichert', 'neueAbos'],
};

/**
 * Was bei YouTube nicht aus Buffer kommt, sondern aus der Analytics-API.
 *
 * **Der erste Anlauf hat den Nordstern für YouTube auf einen Strich gesetzt**,
 * weil Buffer für diesen Dienst kein `Shares` und kein `Follows` schickt. Das
 * Bild zeigte damit ausgerechnet für den größten Kanal keine geteilten Videos
 * und keine Abonnenten — obwohl beide Zahlen seit Wochen in derselben Datei
 * stehen, eine Ebene höher in `Messung`, geholt über `src/youtube.ts`.
 *
 * Sie werden von dort genommen und als andere Herkunft gekennzeichnet. Eine
 * Zahl zu verschweigen, die dasteht, ist der teurere Fehler; sie stillschweigend
 * mit den Buffer-Zahlen zu vermengen, wäre der zweite.
 */
const AUS_ANALYTICS: string[] = ['geteilt', 'neueAbos'];

const zahl = (n: number): string => n.toLocaleString('de-DE');

/** Eine Zahl, oder ein Gedankenstrich, wenn der Dienst sie gar nicht meldet. */
const wert = (m: Kanalmessung | undefined, feld: keyof Kanalmessung, kanal: Kanal): string => {
  if (!m) return '<span class="ohne">—</span>';
  if (MELDET_NICHT[kanal].includes(feld)) return '<span class="ohne" title="meldet dieser Dienst nicht">—</span>';
  const v = m[feld];
  return typeof v === 'number' ? zahl(v) : '<span class="ohne">—</span>';
};

type Kanalsumme = {
  videos: number;
  aufrufe: number;
  reichweite: number;
  likes: number;
  kommentare: number;
  geteilt: number;
  gespeichert: number;
  neueAbos: number;
  /** Zuwachs an Aufrufen seit dem Vergleichspunkt, `null` ohne zweiten Messtag. */
  zuwachs: number | null;
  /** Wann Buffer zuletzt für diesen Kanal nachgesehen hat. */
  stand: string | null;
};

const leer = (): Kanalsumme => ({
  videos: 0,
  aufrufe: 0,
  reichweite: 0,
  likes: 0,
  kommentare: 0,
  geteilt: 0,
  gespeichert: 0,
  neueAbos: 0,
  zuwachs: null,
  stand: null,
});

/**
 * Die Summe je Kanal über alle Shorts, plus der Zuwachs seit `tage` Tagen.
 *
 * **Der Zuwachs wird je Short gerechnet und dann summiert**, nicht aus zwei
 * Gesamtsummen. Der Unterschied ist nicht theoretisch: Ein Short, der in der
 * älteren Messung noch nicht draußen war, hätte in einer Differenz von
 * Gesamtsummen seinen vollen Bestand als Zuwachs beigetragen — richtig ist
 * das nur zufällig, nämlich wenn er tatsächlich in der Spanne erschienen ist.
 * Je Short gerechnet fällt er sauber heraus, wenn ihm der Vergleichspunkt
 * fehlt.
 */
export const summieren = (
  alle: Rueckschau[],
  tage: number,
): { summen: Record<Kanal, Kanalsumme>; mitZuwachs: number; spannen: number[] } => {
  const summen = Object.fromEntries(KANAELE.map((k) => [k, leer()])) as Record<Kanal, Kanalsumme>;
  const spannen: number[] = [];
  let mitZuwachs = 0;

  for (const r of alle) {
    const jetzt = r.zuletzt.jeKanal;
    if (!jetzt) continue;

    for (const kanal of KANAELE) {
      const m = jetzt[kanal];
      if (!m) continue;
      const s = summen[kanal];
      s.videos++;
      s.aufrufe += m.aufrufe;
      s.reichweite += m.reichweite ?? 0;
      s.likes += m.likes;
      s.kommentare += m.kommentare;
      s.geteilt += m.geteilt ?? 0;
      s.gespeichert += m.gespeichert ?? 0;
      s.neueAbos += m.neueAbos ?? 0;
      // Der jüngste Stand aller Shorts gewinnt: Er sagt, wie frisch die
      // Zahlen dieses Kanals überhaupt sind.
      if (m.stand && (!s.stand || m.stand > s.stand)) s.stand = m.stand;
    }

    /*
     * Geteilt und neue Abonnenten kommen bei YouTube aus der Analytics-API und
     * stehen deshalb eine Ebene höher, nicht in `jeKanal`. Ohne diese zwei
     * Zeilen stünde der Nordstern des größten Kanals auf einem Strich.
     */
    if (jetzt['youtube']) {
      summen.youtube.geteilt += r.zuletzt.geteilt ?? 0;
      summen.youtube.neueAbos += r.zuletzt.neueAbos ?? 0;
    }

    const v = vergleichspunkt(r.eintrag.messungen, tage);
    if (!v?.davor.jeKanal) continue;
    mitZuwachs++;
    spannen.push(v.spanneTage);
    for (const kanal of KANAELE) {
      const a = v.davor.jeKanal[kanal];
      const b = v.jetzt.jeKanal?.[kanal];
      if (!a || !b) continue;
      const s = summen[kanal];
      s.zuwachs = (s.zuwachs ?? 0) + Math.max(0, b.aufrufe - a.aufrufe);
    }
  }

  return { summen, mitZuwachs, spannen };
};

/** Die Aufrufe je Kanal an jedem Messtag — die Punkte des Verlaufs. */
const verlauf = (alle: Rueckschau[]): { tag: string; je: Record<Kanal, number> }[] => {
  const nachTag = new Map<string, Record<Kanal, number>>();
  for (const r of alle) {
    for (const m of r.eintrag.messungen) {
      if (!m.jeKanal) continue;
      const eintrag =
        nachTag.get(m.gemessenAm) ??
        (Object.fromEntries(KANAELE.map((k) => [k, 0])) as Record<Kanal, number>);
      for (const kanal of KANAELE) eintrag[kanal] += m.jeKanal[kanal]?.aufrufe ?? 0;
      nachTag.set(m.gemessenAm, eintrag);
    }
  }
  return [...nachTag.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([tag, je]) => ({ tag, je }));
};

const tagKurz = (iso: string): string => {
  const d = new Date(iso);
  return `${d.getDate()}.${d.getMonth() + 1}.`;
};

/**
 * Der Verlauf als SVG — **Punkte auf gestrichelten Linien**.
 *
 * Gestrichelt, weil zwischen zwei Messtagen bis zu sechs Tage liegen können
 * und dort nichts gemessen wurde. Eine durchgezogene Linie behauptet die
 * Zwischenwerte; eine gestrichelte sagt, dass sie eine Verbindung ist und
 * keine Messung.
 */
const verlaufsbild = (punkte: { tag: string; je: Record<Kanal, number> }[]): string => {
  if (punkte.length < 2) {
    return `<p class="hinweis"><b>Noch kein Verlauf: ${punkte.length === 1 ? 'erst ein Messtag' : 'kein Messtag'} trägt Kanalzahlen.</b>
      Gemessen wird seit dem 18.08.2026, aber die Zahlen von Instagram und TikTok kommen erst
      seit dem 05.09. mit — die Messungen davor kennen nur YouTube. Der Verlauf füllt sich mit
      jedem täglichen Rückblick um einen Punkt.</p>`;
  }

  const B = 900;
  const H = 260;
  const links = 54;
  const unten = 28;
  const oben = 12;

  const hoechster = Math.max(
    1,
    ...punkte.flatMap((p) => KANAELE.map((k) => p.je[k])),
  );
  // Auf eine runde Zahl aufziehen, damit die Achse lesbare Marken bekommt.
  const stufe = Math.pow(10, Math.floor(Math.log10(hoechster)));
  const decke = Math.ceil(hoechster / stufe) * stufe;

  const x = (i: number) => links + (i * (B - links - 10)) / (punkte.length - 1);
  const y = (v: number) => oben + (1 - v / decke) * (H - oben - unten);

  const achse = [0, 0.5, 1]
    .map((a) => {
      const v = decke * a;
      return (
        `<line x1="${links}" y1="${y(v).toFixed(1)}" x2="${B - 10}" y2="${y(v).toFixed(1)}" class="raster"/>` +
        `<text x="${links - 8}" y="${(y(v) + 4).toFixed(1)}" class="achse" text-anchor="end">${zahl(Math.round(v))}</text>`
      );
    })
    .join('');

  const tage = punkte
    .map(
      (p, i) =>
        `<text x="${x(i).toFixed(1)}" y="${H - 8}" class="achse" text-anchor="middle">${tagKurz(p.tag)}</text>`,
    )
    .join('');

  const linien = KANAELE.map((kanal) => {
    const d = punkte.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.je[kanal]).toFixed(1)}`).join(' ');
    const kreise = punkte
      .map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(p.je[kanal]).toFixed(1)}" r="4" fill="${FARBE[kanal]}"/>`)
      .join('');
    return `<path d="${d}" fill="none" stroke="${FARBE[kanal]}" stroke-width="2" stroke-dasharray="5 4"/>${kreise}`;
  }).join('');

  return `<svg viewBox="0 0 ${B} ${H}" class="verlauf" role="img" aria-label="Aufrufe je Kanal an jedem Messtag">
    ${achse}${tage}${linien}
  </svg>`;
};

/** Ein waagerechter Balken je Kanal — die Aufrufe im Verhältnis. */
const balken = (summen: Record<Kanal, Kanalsumme>): string => {
  const groesster = Math.max(1, ...KANAELE.map((k) => summen[k].aufrufe));
  const gesamt = KANAELE.reduce((s, k) => s + summen[k].aufrufe, 0);
  return KANAELE.map((kanal) => {
    const s = summen[kanal];
    const anteil = gesamt > 0 ? (s.aufrufe / gesamt) * 100 : 0;
    return `<div class="balkenzeile">
      <span class="bname">${NAME[kanal]}</span>
      <span class="bschiene"><span class="bfuellung" style="width:${((s.aufrufe / groesster) * 100).toFixed(1)}%;background:${FARBE[kanal]}"></span></span>
      <span class="bzahl">${zahl(s.aufrufe)}</span>
      <span class="banteil">${anteil.toFixed(0)} %</span>
    </div>`;
  }).join('');
};

export const kanalseiteBauen = (alle: Rueckschau[], tageFenster = 7): string => {
  const { summen, mitZuwachs, spannen } = summieren(alle, tageFenster);
  const punkte = verlauf(alle);
  const gesamt = KANAELE.reduce((s, k) => s + summen[k].aufrufe, 0);
  const geteiltGesamt = KANAELE.reduce((s, k) => s + summen[k].geteilt, 0);
  const abosGesamt = KANAELE.reduce((s, k) => s + summen[k].neueAbos, 0);
  const heute = new Date().toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  /*
   * Die Spanne kommt aus den Daten und nicht aus dem Fenster. Sind die
   * Messtage sechs Tage auseinander, ist der „Zuwachs der Woche" in Wahrheit
   * einer über elf Tage — und dann muss das dastehen, statt dass die
   * Überschrift eine Woche behauptet.
   */
  const spanneText =
    spannen.length === 0
      ? 'Kein zweiter Messtag — es gibt noch keinen Zuwachs zu rechnen.'
      : spannen.every((s) => s === spannen[0])
        ? `Zuwachs über ${spannen[0]} Tage, ${mitZuwachs} von ${alle.length} Shorts.`
        : `Zuwachs über ${Math.min(...spannen)} bis ${Math.max(...spannen)} Tage, je nachdem, wann zuletzt gemessen wurde — ${mitZuwachs} von ${alle.length} Shorts.`;

  const nordstern = KANAELE.map((kanal) => {
    const s = summen[kanal];
    const fehlt = MELDET_NICHT[kanal];
    const feld = (name: keyof Kanalsumme, schluessel: string) => {
      if (fehlt.includes(schluessel))
        return '<td class="ohne" title="meldet dieser Dienst nicht über Buffer">—</td>';
      const fremd = kanal === 'youtube' && AUS_ANALYTICS.includes(schluessel);
      return `<td${fremd ? ' class="fremd" title="aus YouTubes Analytics-API, nicht aus Buffer"' : ''}><b>${zahl(s[name] as number)}</b></td>`;
    };
    return `<tr>
      <td><span class="punkt" style="background:${FARBE[kanal]}"></span>${NAME[kanal]}</td>
      ${feld('geteilt', 'geteilt')}
      ${feld('neueAbos', 'neueAbos')}
      <td>${zahl(s.kommentare)}</td>
      ${feld('gespeichert', 'gespeichert')}
      <td>${zahl(s.likes)}</td>
      <td class="stand">${s.stand ? new Date(s.stand).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—'}</td>
    </tr>`;
  }).join('');

  const zeilen = [...alle]
    .sort((a, b) => b.eintrag.online.localeCompare(a.eintrag.online))
    .map((r) => {
      const je = r.zuletzt.jeKanal;
      const summe = KANAELE.reduce((s, k) => s + (je?.[k]?.aufrufe ?? 0), 0);
      const streifen = KANAELE.map((k) => {
        const a = je?.[k]?.aufrufe ?? 0;
        return a === 0
          ? ''
          : `<span style="width:${((a / Math.max(1, summe)) * 100).toFixed(1)}%;background:${FARBE[k]}" title="${NAME[k]}: ${zahl(a)}"></span>`;
      }).join('');
      const format = r.herkunft?.format as Format | undefined;
      return `<tr>
        <td class="titel">${escape(r.eintrag.titel)}
          <span class="unterzeile">${format ? escape(FORMATE[format].titel) : 'Herkunft unbekannt'} · ${r.eintrag.laengeSek} s · ${new Date(r.eintrag.online).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}</span>
        </td>
        ${KANAELE.map((k) => `<td class="num">${wert(je?.[k], 'aufrufe', k)}</td>`).join('')}
        <td class="num"><b>${zahl(summe)}</b></td>
        <td class="streifen"><span class="mischung">${streifen}</span></td>
      </tr>`;
    })
    .join('');

  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kanalwoche · Ganz akkurat</title>
<style>
  :root {
    --grund: ${FARBEN.grund}; --flaeche: ${FARBEN.grundRein}; --linie: ${FARBEN.linieFein};
    --tinte: ${FARBEN.tinte}; --weich: ${FARBEN.tinteWeich}; --blau: ${FARBEN.blau};
    --blauHell: ${FARBEN.blauHell}; --gelbHell: ${FARBEN.achtungGelbHell}; --gelb: #8A6400;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--grund); color: var(--tinte); font: 15px/1.6 Inter, system-ui, sans-serif; }
  .huelle { max-width: 1000px; margin: 0 auto; padding: 40px 24px 100px; }
  h1 { font-size: 30px; font-weight: 800; letter-spacing: -.02em; margin: 0 0 4px; }
  .anriss { color: var(--weich); max-width: 68ch; margin: 0 0 8px; }
  h2 { font-size: 19px; font-weight: 700; margin: 0 0 4px; letter-spacing: -.01em; }
  .warum { color: var(--weich); font-size: 13.5px; margin: 0 0 16px; max-width: 72ch; }
  section { margin: 0 0 46px; }
  .zaehler { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0 40px; }
  .zaehler span { background: var(--flaeche); border: 1px solid var(--linie); border-radius: 999px; padding: 5px 13px; font-size: 13px; }
  .zaehler b { font-variant-numeric: tabular-nums; }
  table { width: 100%; border-collapse: collapse; background: var(--flaeche); border: 1px solid var(--linie); border-radius: 12px; overflow: hidden; }
  th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: var(--weich);
       font-weight: 500; padding: 10px 14px; border-bottom: 1px solid var(--linie); white-space: nowrap; }
  td { padding: 12px 14px; border-bottom: 1px solid var(--linie); font-variant-numeric: tabular-nums; }
  tr:last-child td { border-bottom: none; }
  th.num, td.num { text-align: right; }
  td.titel { font-variant-numeric: normal; }
  .unterzeile { display: block; color: var(--weich); font-size: 12px; }
  .ohne { color: var(--linie); }
  .fremd b { border-bottom: 1px dotted var(--linie); }
  .stand { color: var(--weich); font-size: 12px; }
  .punkt { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 8px; vertical-align: baseline; }
  .balkenzeile { display: grid; grid-template-columns: 92px 1fr 76px 46px; align-items: center; gap: 12px; margin-bottom: 10px; }
  .bname { font-size: 14px; }
  .bschiene { background: var(--flaeche); border: 1px solid var(--linie); border-radius: 999px; height: 22px; overflow: hidden; }
  .bfuellung { display: block; height: 100%; border-radius: 999px; }
  .bzahl { text-align: right; font-variant-numeric: tabular-nums; font-weight: 650; }
  .banteil { text-align: right; color: var(--weich); font-size: 13px; font-variant-numeric: tabular-nums; }
  .verlauf { width: 100%; height: auto; background: var(--flaeche); border: 1px solid var(--linie); border-radius: 12px; padding: 8px; }
  .raster { stroke: ${FARBEN.linieFein}; stroke-width: 1; }
  .achse { fill: ${FARBEN.tinteWeich}; font: 11px Inter, system-ui, sans-serif; }
  .mischung { display: flex; height: 10px; border-radius: 999px; overflow: hidden; background: var(--grund); min-width: 90px; }
  .mischung span { display: block; }
  .hinweis { background: var(--gelbHell); border-radius: 10px; padding: 12px 16px; font-size: 13.5px; margin: 0; }
  .grenzen { background: var(--flaeche); border: 1px solid var(--linie); border-radius: 12px; padding: 4px 22px 16px; }
  .grenzen li { margin: 10px 0; font-size: 14px; }
  @media (max-width: 720px) { .balkenzeile { grid-template-columns: 76px 1fr 64px; } .banteil { display: none; } }
</style></head>
<body><div class="huelle">
  <h1>Kanalwoche</h1>
  <p class="anriss">Stand ${heute}. Alle Zahlen je Kanal kommen aus Buffer, mit demselben Zugang, der auch veröffentlicht — für Instagram und TikTok gibt es keine eigene Anbindung und keine braucht es.</p>
  <div class="zaehler">
    <span><b>${alle.length}</b> Videos draußen</span>
    <span><b>${zahl(gesamt)}</b> Aufrufe insgesamt</span>
    <span><b>${zahl(geteiltGesamt)}</b> mal geteilt</span>
    <span><b>${zahl(abosGesamt)}</b> neue Abonnenten</span>
    <span><b>${punkte.length}</b> ${punkte.length === 1 ? 'Messtag' : 'Messtage'} mit Kanalzahlen</span>
  </div>

  <section>
    <h2>Der Nordstern</h2>
    <p class="warum">Geteilt und neue Abonnenten. Man abonniert Leute, keine Fakten — und diese beiden Zahlen sagen, ob mit dem Zuschauer etwas passiert ist. Ein Strich heißt: Diesen Wert meldet der Dienst über Buffer nicht. Er ist nicht null, er ist ungemessen.</p>
    <table>
      <tr><th>Kanal</th><th>Geteilt</th><th>Neue Abos</th><th>Kommentare</th><th>Gespeichert</th><th>Likes</th><th>Stand</th></tr>
      ${nordstern}
    </table>
  </section>

  <section>
    <h2>Aufrufe je Kanal</h2>
    <p class="warum">Die unwichtigste der Zahlen: Sie sagt, was der Algorithmus getan hat, nicht was der Zuschauer getan hat. Sie steht hier, weil sie den Nenner für alles darüber liefert.</p>
    ${balken(summen)}
    <p class="warum" style="margin-top:16px">${spanneText}${
      KANAELE.some((k) => summen[k].zuwachs !== null)
        ? ' Davon neu: ' +
          KANAELE.filter((k) => summen[k].zuwachs !== null)
            .map((k) => `${NAME[k]} ${zahl(summen[k].zuwachs!)}`)
            .join(', ') +
          '.'
        : ''
    }</p>
  </section>

  <section>
    <h2>Verlauf</h2>
    <p class="warum">Aufrufe aller Videos zusammen, an jedem Tag, an dem gemessen wurde. Die Linien sind gestrichelt, weil zwischen zwei Punkten nichts gemessen wurde — sie verbinden, sie zeigen nicht.</p>
    ${verlaufsbild(punkte)}
  </section>

  <section>
    <h2>Jedes Video, die drei Kanäle nebeneinander</h2>
    <p class="warum">Neueste zuerst. Der Streifen rechts zeigt, wie sich die Aufrufe eines Videos auf die Kanäle verteilen.</p>
    <table>
      <tr><th>Video</th>${KANAELE.map((k) => `<th class="num">${NAME[k]}</th>`).join('')}<th class="num">Summe</th><th>Mischung</th></tr>
      ${zeilen}
    </table>
  </section>

  <section>
    <h2>Was diese Seite nicht weiß</h2>
    <ul class="grenzen">
      <li><b>Keine Haltekurve für Instagram und TikTok.</b> Buffer liefert Momentaufnahmen. Die Haltequote an Sekunde 3,5 gibt es nur bei YouTube, über dessen Analytics-Schnittstelle — sie steht in <code>npm run aufschlaege</code>.</li>
      <li><b>Keine neuen Abonnenten bei TikTok</b> und keine Reichweite bei YouTube. Buffer schickt diese Felder je Dienst verschieden; wo ein Strich steht, wurde nichts gemessen.</li>
      <li><b>Nur, was Buffer gesendet hat.</b> Ein von Hand veröffentlichter Beitrag hat keine Beitragskennung und taucht hier nicht auf.</li>
      <li><b>Der Stand ist der von Buffer</b>, nicht der von jetzt. Die Spalte rechts oben sagt, wann Buffer zuletzt nachgesehen hat.</li>
    </ul>
  </section>
</div></body></html>`;
};
