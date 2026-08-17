import { FORMATE, POSITIONEN, QUELLENPFLICHT, UNBETEILIGTE_ARTEN, type Quelle, type Short, type Szene } from './typen';
import { FARBEN } from './marke';

/**
 * Belegansicht — die Pruefung, die kein Skript machen kann.
 *
 * `npm run quellen-pruefen` beantwortet eine Frage: Steht das Zitat wirklich
 * auf der Seite? Die zweite Frage beantwortet es ausdruecklich nicht —
 * **traegt das Zitat den Satz, den wir darauf bauen?** In `quellen.json`
 * heisst dieses Feld `stuetzt`, und es wird nie geprueft.
 *
 * Genau dort sitzt der teuerste Fehler, den dieses Projekt kennt: Am
 * 14.08.2026 stand im Kabel-Short eine Aussage, deren Quelle existierte, deren
 * Zitat wirklich auf der Seite stand — und die von keiner der drei Quellen
 * getragen wurde. Falsch war die Folgerung dazwischen. Kein Schema, keine
 * Zeichenkettensuche und kein zweites Sprachmodell haette das gefunden.
 *
 * Diese Seite stellt beides nebeneinander und sonst nichts: links, was das
 * Video sagt, rechts, was die Quelle sagt. Sie urteilt nicht — sie legt vor.
 *
 * **Sie laeuft vor der Vertonung.** Das ist der ganze Sinn: Eine falsche
 * Folgerung, die erst in der Freigabe auffaellt, ist schon vertont, gerendert
 * und bezahlt.
 *
 * Mitgezeigt wird die **Interessenlage**, nicht nur der Herausgeber. Ob ein
 * Zitat den Satz traegt, ist eine andere Frage als, ob der Zitierende die
 * richtige Instanz ist, um es zu sagen — beide muessen beim Lesen im Kopf
 * sein, sonst prueft man die halbe Sache.
 */

const escape = (s: string): string =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/*
 * Welche Szenenart belegen muss, steht in `QUELLENPFLICHT` und nirgends
 * sonst. Die erste Fassung dieser Datei fuehrte eine eigene Handliste — und
 * sie war schon beim Schreiben falsch: `checkliste`, `warnung` und
 * `merkmalskarte` standen darin als „kann keine Quelle tragen", obwohl sie
 * das Feld laengst hatten. Die Ansicht meldete damit eine Luecke, die es
 * nicht gab. Zwei Listen ueber dieselbe Sache laufen auseinander, und die
 * falsche faellt nicht auf, weil sie fuer sich stimmig aussieht.
 */
const pflicht = (szene: Szene): 'pflicht' | 'ohne' => {
  const nachArt = (QUELLENPFLICHT as Record<string, string>)[szene.art] ?? 'ohne';
  // Seit dem 17.08.2026 haengt die halbe Belegpflicht an der Position statt
  // an der Art: Alles auf `zuspitzung` und `kipppunkt` behauptet, egal in
  // welcher Darstellung.
  if (nachArt === 'nachPosition') {
    return szene.position === 'zuspitzung' || szene.position === 'kipppunkt' ? 'pflicht' : 'ohne';
  }
  return nachArt === 'pflicht' ? 'pflicht' : 'ohne';
};

const istUnbeteiligt = (art: Quelle['art']): boolean =>
  (UNBETEILIGTE_ARTEN as readonly string[]).includes(art);

export const belegansichtBauen = (shorts: Short[], quellen: Quelle[]): string => {
  const finde = (id: string) => quellen.find((q) => q.id === id);

  let ohneQuelle = 0;
  let paare = 0;

  const abschnitte = shorts
    .map((short) => {
      const zeilen = short.szenen
        .map((szene, i) => {
          const quelleId = (szene as { quelleId?: string }).quelleId;
          const belegId = (szene as { belegId?: string }).belegId;
          const nummer = `${i + 1}`;

          /* Szene mit Quelle: Sprechtext gegen das gebundene Zitat stellen. */
          if (quelleId) {
            const q = finde(quelleId);
            if (!q) {
              return `<tr class="luecke"><td class="nr">${nummer}</td><td colspan="2">
                <b>${escape(szene.art)}</b> verweist auf „${escape(quelleId)}“ – die Quelle steht nicht in quellen.json.</td></tr>`;
            }

            /*
             * Hier standen bis zum 17.08.2026 **alle** Zitate der Quelle
             * nebeneinander, und das war der Fehler dieser Seite: Wer drei
             * Zitate neben einen Satz gestellt bekommt, liest, ob irgendeines
             * passt — nicht, ob dieses eine traegt. Genau so ist „Ein Gremium
             * hat das so festgelegt" zweimal durch die Durchsicht gekommen.
             *
             * Jetzt steht neben dem Satz das Zitat, an das die Szene sich
             * gebunden hat, und sonst keines.
             */
            const gebunden = q.belegt.find((b) => b.id === belegId);
            if (!gebunden) {
              return `<tr class="luecke"><td class="nr">${nummer}</td><td colspan="2">
                <b>${escape(szene.art)}</b> nennt keine Fundstelle in „${escape(quelleId)}“ –
                es ist also offen, welcher Satz der Quelle diesen Satz trägt.
                <p>${escape(szene.sprechtext)}</p></td></tr>`;
            }

            paare += 1;
            const unbeteiligt = istUnbeteiligt(q.art);

            const belege = `<div class="beleg">
                  <blockquote>${escape(gebunden.zitat)}</blockquote>
                  <p class="folgerung"><span>daraus folgern wir</span>${escape(gebunden.stuetzt)}</p>
                </div>`;

            return `<tr>
              <td class="nr">${nummer}</td>
              <td class="sagt">
                <div class="art">${escape(szene.art)}</div>
                <p>${escape(szene.sprechtext)}</p>
              </td>
              <td class="quelle">
                <div class="qkopf">
                  <span class="marke ${unbeteiligt ? 'unbeteiligt' : 'beteiligt'}">${escape(q.art)}</span>
                  <span class="herausgeber">${escape(q.herausgeber)}</span>
                  ${q.abrufart === 'manuell' ? '<span class="marke manuell">nur von Hand</span>' : ''}
                </div>
                ${belege}
                <a class="url" href="${escape(q.url)}" target="_blank" rel="noopener">${escape(q.url)}</a>
              </td>
            </tr>`;
          }

          /* Szene ohne Quelle: unterscheiden, ob das erlaubt ist. */
          const stufe = pflicht(szene);

          if (stufe === 'pflicht') {
            ohneQuelle += 1;
            return `<tr class="luecke"><td class="nr">${nummer}</td><td colspan="2">
              <b>${escape(szene.art)}</b> auf „${escape(POSITIONEN[szene.position].titel)}" trägt keine
              Quelle, obwohl dort die Substanz des Videos liegt.
              <p>${escape(szene.sprechtext)}</p></td></tr>`;
          }

          /*
           * Die dritte Stufe `moeglich` gab es bis zum 17.08.2026 und ist
           * ersatzlos weg. Sie war fuer `fehlspur` und `checkliste` gedacht —
           * Arten, die belegbeduerftig werden **konnten**. Beide sind
           * gestrichen, und die verbleibende Unschaerfe hat die Position
           * uebernommen: Aufschlag und Nachschlag sind frei, die Mitte ist
           * Pflicht. Eine Stufe „vielleicht" braucht es dafuer nicht mehr.
           */
          return '';
        })
        .filter(Boolean)
        .join('');

      const arten = short.quellenIds
        .map((id) => finde(id))
        .filter((q): q is Quelle => Boolean(q));
      const unbeteiligte = arten.filter((q) => istUnbeteiligt(q.art)).length;

      return `<section>
        <header class="shortkopf">
          <div>
            <h2>${escape(short.arbeitstitel)}</h2>
            <p class="meta">${escape(FORMATE[short.format].titel)} · ${escape(short.sachgebiet)} · ${short.szenen.length} Szenen</p>
          </div>
          <div class="bilanz">
            <span class="marke ${unbeteiligte > 0 ? 'unbeteiligt' : 'beteiligt'}">${unbeteiligte} unbeteiligt</span>
            <span class="marke neutral">${arten.length} Quellen</span>
          </div>
        </header>
        <table>
          <thead><tr><th></th><th>Was das Video sagt</th><th>Was die Quelle sagt</th></tr></thead>
          <tbody>${zeilen}</tbody>
        </table>
      </section>`;
    })
    .join('');

  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Belege · Ganz akkurat</title>
<style>
  :root {
    --grund: ${FARBEN.grund}; --flaeche: ${FARBEN.grundRein}; --linie: ${FARBEN.linieFein};
    --tinte: ${FARBEN.tinte}; --weich: ${FARBEN.tinteWeich}; --blau: ${FARBEN.blau};
    --blauHell: ${FARBEN.blauHell}; --gruen: ${FARBEN.jaGruen}; --gruenHell: ${FARBEN.jaGruenHell};
    --rot: ${FARBEN.neinRot}; --rotHell: ${FARBEN.neinRotHell};
    --gelb: #8A6400; --gelbHell: ${FARBEN.achtungGelbHell};
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--grund); color: var(--tinte); font: 15px/1.6 Inter, system-ui, sans-serif; }
  .huelle { max-width: 1160px; margin: 0 auto; padding: 40px 24px 100px; }
  h1 { font-size: 30px; font-weight: 800; letter-spacing: -.02em; margin: 0 0 8px; }
  .anriss { color: var(--weich); max-width: 68ch; margin: 0 0 8px; }
  .zaehler { display: flex; flex-wrap: wrap; gap: 8px; margin: 22px 0 40px; }
  .zaehler span { background: var(--flaeche); border: 1px solid var(--linie); border-radius: 999px; padding: 5px 13px; font-size: 13px; }
  .zaehler b { font-variant-numeric: tabular-nums; }
  section { margin-bottom: 44px; }
  .shortkopf { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 12px; }
  h2 { font-size: 19px; font-weight: 700; margin: 0 0 2px; letter-spacing: -.01em; }
  .meta { color: var(--weich); font-size: 13px; margin: 0; }
  .bilanz { display: flex; gap: 6px; }
  table { width: 100%; border-collapse: collapse; background: var(--flaeche); border: 1px solid var(--linie); border-radius: 12px; overflow: hidden; }
  th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: var(--weich);
       font-weight: 500; padding: 10px 16px; border-bottom: 1px solid var(--linie); }
  td { padding: 16px; border-bottom: 1px solid var(--linie); vertical-align: top; }
  tr:last-child td { border-bottom: none; }
  td.nr { width: 34px; color: var(--weich); font-size: 12px; font-variant-numeric: tabular-nums; }
  td.sagt { width: 44%; }
  td.sagt p { margin: 0; }
  .art { font-size: 11px; text-transform: uppercase; letter-spacing: .09em; color: var(--weich); margin-bottom: 6px; }
  .qkopf { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
  .herausgeber { font-weight: 650; font-size: 13.5px; }
  .marke { font-size: 11px; font-weight: 650; padding: 2px 8px; border-radius: 999px; letter-spacing: .02em; }
  .marke.unbeteiligt { background: var(--gruenHell); color: var(--gruen); }
  .marke.beteiligt { background: var(--gelbHell); color: var(--gelb); }
  .marke.manuell { background: var(--blauHell); color: var(--blau); }
  .marke.neutral { background: var(--grund); color: var(--weich); border: 1px solid var(--linie); }
  .beleg { margin-bottom: 12px; }
  blockquote { margin: 0 0 5px; padding-left: 12px; border-left: 3px solid var(--blau); font-size: 14.5px; }
  .folgerung { margin: 0; font-size: 13.5px; color: var(--weich); }
  .folgerung span { display: block; font-size: 10.5px; text-transform: uppercase; letter-spacing: .09em; color: var(--blau); margin-bottom: 1px; }
  .url { font-size: 11.5px; color: var(--weich); word-break: break-all; text-decoration: none; }
  .url:hover { text-decoration: underline; }
  tr.luecke td { background: var(--rotHell); }
  tr.luecke b { color: var(--rot); }
  tr.offen td { background: var(--gelbHell); }
  .frage { margin: 8px 0 0; font-size: 13px; color: var(--gelb); font-weight: 600; }
  @media (max-width: 760px) { td.sagt { width: auto; } table, thead, tbody, tr, td, th { display: block; } th { display: none; } td.nr { padding-bottom: 0; } }
</style></head>
<body><div class="huelle">
  <h1>Belege</h1>
  <p class="anriss">
    Links steht, was das Video sagt. Rechts, was die Quelle wörtlich sagt, und was wir daraus folgern.
    Die eine Frage, die kein Skript beantworten kann: <b>Trägt das?</b>
  </p>
  <p class="anriss">
    <b>grün</b> = unbeteiligte Quelle (Standard, Behörde, Rechtsprechung) ·
    <b>gelb</b> = am Inhalt beteiligt (Hersteller, Plattform)
  </p>
  <div class="zaehler">
    <span><b>${shorts.length}</b> Shorts</span>
    <span><b>${paare}</b> Behauptung-Zitat-Paare zu lesen</span>
    <span><b>${ohneQuelle}</b> Szenen ohne Quelle, obwohl nötig</span>
  </div>
  ${abschnitte}
</div></body></html>`;
};
