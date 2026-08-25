import type { Befund } from './pruefung';
import { FORMATE, POSITIONEN, SACHGEBIETE, type Quelle, type Short, type Szene } from './typen';

/**
 * Erzeugt die Freigabe-Uebersicht als eigenstaendige HTML-Datei.
 *
 * Das ist das einzige Nadeloehr, durch das ein Video vor der
 * Veroeffentlichung muss. Entsprechend zeigt die Seite alles, was fuer die
 * Entscheidung noetig ist — Video, Plattformtexte, Quellen und Befunde —
 * und nichts, was ablenkt. Kein externer Aufruf, keine Schrift aus dem Netz:
 * die Datei muss auch offline vollstaendig funktionieren.
 */

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Was eine Szene im Bild behauptet — die Seite der Aussage, die belegt sein
 * muss. Nicht der Sprechtext: Der fuehrt aus, die Behauptung steht im Bild.
 */
const behauptung = (szene: Szene): string => {
  switch (szene.art) {
    case 'text':
      return szene.text;
    case 'zahl':
      return `${szene.wert}${szene.einheit ? ' ' + szene.einheit : ''} — ${szene.bedeutung}`;
    case 'frage':
      return szene.frage;
    case 'schluss':
      return szene.satz;
    case 'einschraenkung':
      return `${szene.bedingung} — ${szene.folge}`;
    default:
      return '';
  }
};

/**
 * Welche Fassung im Player laeuft, aus dem Dateinamen gelesen.
 *
 * Der Wochenlauf legt `videos/<id>.<dienst>.mp4` an; die Freigabeseite zeigt
 * eine davon. Drei Player je Short waeren unuebersichtlich und zeigten nichts,
 * was man nicht weiss — die Fassungen unterscheiden sich in der Blickrichtung
 * des Zeigers am Schluss, sonst in nichts.
 */
const DIENSTNAMEN: Record<string, string> = {
  tiktok: 'TikTok-Fassung',
  instagram: 'Instagram-Fassung',
  youtube: 'YouTube-Fassung',
};

const fassungsname = (pfad: string): string => {
  const teile = pfad.replace(/\.mp4$/, '').split('.');
  const dienst = teile[teile.length - 1] ?? '';
  const name = DIENSTNAMEN[dienst];
  return name === undefined
    ? 'Vorschau'
    : `${name} — die anderen beiden zeigen am Schluss in eine andere Richtung`;
};

export const freigabeseiteBauen = (opts: {
  laufId: string;
  shorts: Short[];
  quellen: Quelle[];
  befunde: Befund[];
  videopfad: (short: Short) => string;
  mitTon: boolean;
}): string => {
  const { laufId, shorts, quellen, befunde, videopfad, mitTon } = opts;

  const fehlerGesamt = befunde.filter((b) => b.stufe === 'fehler').length;

  const karten = shorts
    .map((short, i) => {
      const eigene = befunde.filter((b) => b.shortId === short.id);
      const fehler = eigene.filter((b) => b.stufe === 'fehler');
      const zustand = fehler.length > 0 ? 'fehler' : eigene.length > 0 ? 'hinweis' : 'gut';

      const quellenListe = short.quellenIds
        .map((id) => {
          const q = quellen.find((x) => x.id === id);
          return q
            ? `<li><a href="${escape(q.url)}" target="_blank" rel="noopener">${escape(q.titel)}</a>
                 <span class="meta">${escape(q.herausgeber)} · geprüft ${escape(q.geprueftAm)}${
                   q.abrufart === 'manuell' ? ' · <b class="manuell">nur von Hand geprüft</b>' : ''
                 }</span></li>`
            : `<li class="fehlt">Unbekannte Quelle: ${escape(id)}</li>`;
        })
        .join('');

      /*
       * Die Belegtafel — der eigentliche Grund, warum die Freigabe manuell
       * bleibt.
       *
       * Vorher standen die Quellen als Liste am Ende, ohne Bezug zu dem, was
       * im Video behauptet wird. Damit war die Freigabe ein Plausibilitaets-
       * urteil: Klingt richtig, also wird es stimmen. Jetzt steht neben
       * jeder Behauptung der woertliche Satz, auf dem sie ruht.
       */
      const belegte = short.szenen
        .map((szene, index) => ({ szene, index }))
        .filter(({ szene }) => 'quelleId' in szene);

      const belegtafel = belegte.length
        ? belegte
            .map(({ szene, index }) => {
              const id = (szene as Extract<Szene, { quelleId: string }>).quelleId;
              const q = quellen.find((x) => x.id === id);

              const zitate = q
                ? q.belegt
                    .map(
                      (b) => `<blockquote>„${escape(b.zitat)}"</blockquote>
                              <p class="folgerung">${escape(b.stuetzt)}</p>`,
                    )
                    .join('')
                : `<p class="fehlt">Quelle „${escape(id)}" steht nicht in quellen.json.</p>`;

              return `
              <div class="beleg">
                <p class="szenenart">Szene ${index + 1} · ${escape(szene.art)}</p>
                <p class="behauptung">${escape(behauptung(szene))}</p>
                ${zitate}
                ${
                  q
                    ? `<p class="herkunft"><a href="${escape(q.url)}" target="_blank" rel="noopener">${escape(
                        q.herausgeber,
                      )}</a>${q.abrufart === 'manuell' ? ' · <b class="manuell">nur von Hand geprüft</b>' : ''}</p>`
                    : ''
                }
              </div>`;
            })
            .join('')
        : '<p class="fehlt">Keine Szene dieses Shorts trägt einen Beleg.</p>';

      const befundListe = eigene.length
        ? `<ul class="befunde">${eigene
            .map(
              (b) =>
                `<li class="${b.stufe}"><b>${b.stufe === 'fehler' ? 'Fehler' : 'Hinweis'}</b>
                 <span class="regel">${escape(b.regel)}</span> ${escape(b.text)}</li>`,
            )
            .join('')}</ul>`
        : '<p class="ok">Keine Beanstandungen.</p>';

      const texte = (['tiktok', 'instagram', 'youtube'] as const)
        .map(
          (p) => `
          <div class="plattform">
            <h4>${p}</h4>
            <p class="titel">${escape(short.texte[p].titel)}</p>
            <p class="beschreibung">${escape(short.texte[p].beschreibung)}</p>
            <p class="hashtags">${short.texte[p].hashtags.map(escape).join(' ')}</p>
          </div>`,
        )
        .join('');

      return `
      <article class="karte ${zustand}" id="${escape(short.id)}">
        <div class="video">
          <video src="${escape(videopfad(short))}" controls preload="metadata" playsinline></video>
          <!--
            Welche der drei Fassungen hier laeuft, stand bis zum 25.08.2026
            nirgends — und war damit die erste Frage beim Ansehen. Der
            Dateiname traegt sie ohnehin; hier steht sie lesbar.
          -->
          <p class="fassung">${escape(fassungsname(videopfad(short)))}</p>
        </div>
        <div class="inhalt">
          <div class="kopf">
            <span class="nummer">${i + 1} von ${shorts.length}</span>
            <h3>${escape(short.arbeitstitel)}</h3>
            <div class="marken">
              <span class="marke rubrik">${escape(FORMATE[short.format].titel)}</span>
              <span class="marke machart">${escape(SACHGEBIETE[short.sachgebiet].titel)}</span>
              ${short.kennzeichnung.werbung === 'video' ? '<span class="marke werbung">Werbung im Bild</span>' : ''}
              ${short.kennzeichnung.werbung === 'beschreibung' ? '<span class="marke werbung">Werbung in der Beschreibung</span>' : ''}
              ${short.kennzeichnung.kiStimme ? '<span class="marke ki">KI-Stimme</span>' : ''}
              ${short.tonspur ? `<span class="marke dauer">${short.tonspur.dauerSek.toFixed(1)} s</span>` : '<span class="marke ohneton">ohne Ton</span>'}
            </div>
          </div>

          <p class="merksatz">${escape(short.weitererzaehlt)}</p>

          ${befundListe}

          <details open>
            <summary>Belege (${belegte.length} Aussagen)</summary>
            <div class="belege">${belegtafel}</div>
          </details>

          <details>
            <summary>Plattformtexte</summary>
            <div class="texte">${texte}</div>
          </details>

          <details>
            <summary>Quellen (${short.quellenIds.length})</summary>
            <ul class="quellen">${quellenListe}</ul>
          </details>

          <div class="entscheidung">
            <label><input type="radio" name="e-${escape(short.id)}" value="ja" checked> Freigeben</label>
            <label><input type="radio" name="e-${escape(short.id)}" value="nein"> Ablehnen</label>
          </div>
        </div>
      </article>`;
    })
    .join('');

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ganz akkurat · Freigabe ${escape(laufId)}</title>
<style>
  :root {
    --grund: #F7F8FA; --karte: #fff; --tinte: #111820; --weich: #5E6877;
    --blau: #2C5EFF; --blauHell: #E9EEFF; --rand: #D7DCE2;
    --gruen: #1F9D68; --gruenHell: #E7F7F0;
    --rot: #D94B4B; --rotHell: #FDEAEA;
    --gelb: #F5B942; --gelbHell: #FFF6D9;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 32px 24px 96px;
    background: var(--grund); color: var(--tinte);
    font: 16px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  }
  header { max-width: 1180px; margin: 0 auto 32px; }
  h1 { font-size: 30px; margin: 0 0 6px; letter-spacing: -0.5px; }
  h1 .duenn { font-weight: 300; } h1 .fett { font-weight: 800; }
  .unterzeile { color: var(--weich); margin: 0; }
  .bilanz { display: flex; gap: 10px; margin-top: 18px; flex-wrap: wrap; }
  .zahl { background: var(--karte); border: 2px solid var(--rand); border-radius: 12px; padding: 10px 18px; }
  .zahl b { font-size: 22px; display: block; }
  .zahl.warn { border-color: var(--rot); background: var(--rotHell); }

  .liste { max-width: 1180px; margin: 0 auto; display: flex; flex-direction: column; gap: 22px; }
  .karte {
    display: grid; grid-template-columns: 300px 1fr; gap: 26px;
    background: var(--karte); border: 2px solid var(--rand);
    border-radius: 18px; padding: 22px; align-items: start;
  }
  .karte.fehler { border-color: var(--rot); }
  .karte.hinweis { border-color: var(--gelb); }
  .karte.gut { border-color: var(--gruen); }
  @media (max-width: 860px) { .karte { grid-template-columns: 1fr; } }

  video { width: 100%; border-radius: 12px; background: #000; display: block; }

  .kopf { margin-bottom: 14px; }
  .nummer { color: var(--weich); font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
  h3 { margin: 4px 0 10px; font-size: 21px; }
  .marken { display: flex; gap: 8px; flex-wrap: wrap; }
  .marke { font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 999px; border: 1px solid var(--rand); color: var(--weich); }
  .marke.machart { background: var(--tinte); border-color: var(--tinte); color: #fff; }
  .marke.rubrik { background: var(--blauHell); border-color: var(--blau); color: var(--blau); }
  .marke.tiefe { background: var(--gruenHell); border-color: var(--gruen); color: var(--gruen); }
  .marke.flach { background: var(--grund); }
  .marke.system { background: var(--tinte); border-color: var(--tinte); color: #fff; }

  .merksatz {
    font-size: 18px; font-weight: 600; font-style: italic;
    border-left: 5px solid var(--blau); padding-left: 14px;
    margin: 0 0 16px; color: var(--tinte);
  }

  /*
   * Die Belegtafel steht bewusst aufgeklappt und ueber den Plattformtexten.
   * Sie ist der Grund, warum dieser Schritt nicht automatisiert ist — wer
   * sie zuklappt, gibt nach Gefuehl frei.
   */
  .belege { display: flex; flex-direction: column; gap: 14px; margin-top: 12px; }
  .beleg { background: var(--grund); border-radius: 12px; padding: 14px 16px; }
  .beleg .szenenart { color: var(--weich); font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; margin: 0 0 4px; }
  .beleg .behauptung { font-weight: 600; margin: 0 0 10px; }
  .beleg blockquote {
    margin: 0 0 4px; padding: 8px 12px; background: var(--karte);
    border-left: 4px solid var(--gruen); border-radius: 0 8px 8px 0;
    font-size: 14px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  .beleg .folgerung { font-size: 13px; color: var(--weich); margin: 0 0 10px; }
  .beleg .herkunft { font-size: 13px; margin: 0; }
  .beleg .fehlt, .quellen .fehlt { color: var(--rot); }
  .manuell { color: #8a6200; }
  .marke.werbung { background: var(--gelbHell); border-color: var(--gelb); color: #8a6200; }
  .marke.ki { background: var(--blauHell); border-color: var(--blau); color: var(--blau); }
  .marke.ohneton { background: var(--rotHell); border-color: var(--rot); color: var(--rot); }

  .ok { color: var(--gruen); font-weight: 600; margin: 0 0 14px; }
  .befunde { list-style: none; padding: 0; margin: 0 0 14px; display: flex; flex-direction: column; gap: 8px; }
  .befunde li { padding: 10px 14px; border-radius: 10px; font-size: 14px; }
  .befunde li.fehler { background: var(--rotHell); border-left: 5px solid var(--rot); }
  .befunde li.hinweis { background: var(--gelbHell); border-left: 5px solid var(--gelb); }
  .regel { color: var(--weich); font-size: 12px; text-transform: uppercase; letter-spacing: 0.6px; margin-right: 6px; }

  details { border-top: 1px solid var(--rand); padding: 12px 0 0; margin-top: 12px; }
  summary { cursor: pointer; font-weight: 600; font-size: 14px; }
  .texte { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 12px; }
  .video .fassung {
    margin: 8px 0 0;
    font-size: 12px;
    color: var(--weich);
    text-align: center;
  }
  .plattform h4 { margin: 0 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--blau); }
  .plattform .titel { font-weight: 600; margin: 0 0 6px; }
  .plattform .beschreibung { font-size: 14px; color: var(--weich); margin: 0 0 6px; white-space: pre-wrap; }
  .plattform .hashtags { font-size: 13px; color: var(--blau); margin: 0; }

  .quellen { margin: 12px 0 0; padding-left: 20px; font-size: 14px; }
  .quellen li { margin-bottom: 8px; }
  .quellen .meta { color: var(--weich); font-size: 12px; display: block; }
  .quellen .fehlt { color: var(--rot); }

  .entscheidung { display: flex; gap: 18px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--rand); }
  .entscheidung label { display: flex; align-items: center; gap: 7px; cursor: pointer; font-weight: 600; font-size: 14px; }

  .fussleiste {
    position: fixed; bottom: 0; left: 0; right: 0;
    background: var(--karte); border-top: 2px solid var(--rand);
    padding: 14px 24px; display: flex; justify-content: center; gap: 14px; align-items: center;
  }
  button {
    font: inherit; font-weight: 700; border: none; border-radius: 999px;
    padding: 13px 30px; cursor: pointer; background: var(--blau); color: #fff;
  }
  button:disabled { background: var(--rand); color: var(--weich); cursor: not-allowed; }
  .fussleiste .hinweistext { color: var(--weich); font-size: 14px; }
</style>
</head>
<body>
<header>
  <h1><span class="duenn">Ganz&#8202;</span><span class="fett">akkurat</span> · Freigabe</h1>
  <p class="unterzeile">Lauf ${escape(laufId)}${mitTon ? '' : ' · Trockenlauf ohne Vertonung'}</p>
  <div class="bilanz">
    <div class="zahl"><b>${shorts.length}</b>Videos</div>
    <div class="zahl ${fehlerGesamt > 0 ? 'warn' : ''}"><b>${fehlerGesamt}</b>Fehler</div>
    <div class="zahl"><b>${befunde.filter((b) => b.stufe === 'hinweis').length}</b>Hinweise</div>
  </div>
</header>

<main class="liste">${karten}</main>

<div class="fussleiste">
  <span class="hinweistext" id="stand"></span>
  <button id="freigeben" ${fehlerGesamt > 0 ? 'disabled' : ''}>
    ${fehlerGesamt > 0 ? 'Erst Fehler beheben' : 'Auswahl freigeben'}
  </button>
</div>

<script>
  // Die Entscheidung wird als Datei gespeichert, die der Veroeffentlichungs-
  // schritt einliest. Bewusst kein Server: die Seite laeuft ueberall.
  const stand = document.getElementById('stand');
  const aktualisieren = () => {
    const ja = [...document.querySelectorAll('input[value=ja]:checked')].length;
    const gesamt = ${shorts.length};
    stand.textContent = ja + ' von ' + gesamt + ' freigegeben';
  };
  document.addEventListener('change', aktualisieren);
  aktualisieren();

  document.getElementById('freigeben').addEventListener('click', () => {
    const auswahl = [...document.querySelectorAll('input[type=radio]:checked')]
      .filter(i => i.value === 'ja')
      .map(i => i.name.slice(2));
    const blob = new Blob([JSON.stringify({ laufId: ${JSON.stringify(laufId)}, freigegeben: auswahl }, null, 2)],
      { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'freigabe.json';
    a.click();
  });
</script>
</body>
</html>`;
};
