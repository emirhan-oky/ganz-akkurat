import React, { useMemo } from 'react';
import { BUEHNE_FIGUR, winkelKlemmen, type Form, type Pose, type Rig, type Stil } from '../../src/figur';

/**
 * Der Renderer fuer ein Rig-Paket. Generisch — er kennt keine Figur.
 *
 * ## Flach gerendert, Drehung verkettet
 *
 * Die naheliegende Bauart waere SVG-Verschachtelung: Der Kopf steckt in einer
 * `<g>` des Halses, der Hals in einer des Koerpers. Dann erbt jedes Kind die
 * Drehung von selbst — und die Ebenenreihenfolge ist verloren. Sie ergibt
 * sich in SVG aus der Dokumentreihenfolge, und die haengt bei Verschachtelung
 * am Stammbaum: Der linke Arm ist ein Kind des Koerpers und muesste deshalb
 * **hinter** ihm liegen, was verschachtelt unmoeglich ist.
 *
 * Deshalb liegt jedes Teil flach nebeneinander, sortiert nach `ebene`, und
 * traegt die **verkettete** Drehung seiner Eltern als eigenes
 * `transform`-Attribut. Das geht auf, weil `rotate(winkel, cx, cy)` in SVG
 * ein absoluter Operator ist: Der Pivot steht in Buehnenkoordinaten, nicht
 * relativ zum Teil. Genau darum verlangt `src/figur.ts` die Pivots in
 * Buehnenkoordinaten — es ist keine Bequemlichkeit, sondern die Bedingung
 * dafuer, dass Hierarchie und Ebene unabhaengig bleiben.
 *
 * ## Keine Zeitlogik
 *
 * Diese Datei kennt weder Bilder noch Sekunden. Sie bekommt eine fertige
 * Pose und zeichnet sie. Was sich wann bewegt, steht in `posen.ts` und wird
 * dort aus `useCurrentFrame()` gerechnet — bildgetrieben und damit bei jedem
 * Render identisch. Eine Animation, die sich selbst weiterschaltet, ergaebe
 * bei jedem Durchlauf eine andere Fassung, und keine davon entspraeche der
 * Vorschau.
 */

const stilAnwenden = (stil: Stil | undefined): React.CSSProperties => ({
  fill: stil?.fuellung ?? 'none',
  stroke: stil?.strich ?? 'none',
  strokeWidth: stil?.staerke ?? 0,
  strokeLinecap: stil?.kappe ?? 'round',
  strokeLinejoin: 'round',
});

const FormZeichnen: React.FC<{ form: Form; stil: React.CSSProperties }> = ({ form, stil }) => {
  // Ein Stil am Teil, ein Stil an der Form: Der an der Form gewinnt, damit
  // ein einzelner Pfad abweichen kann, ohne ein eigenes Teil zu werden.
  const eigen = form.stil ? { ...stil, ...stilAnwenden(form.stil) } : stil;

  switch (form.art) {
    case 'pfad':
      return <path d={form.d} style={eigen} />;
    case 'kreis':
      return <circle cx={form.cx} cy={form.cy} r={form.r} style={eigen} />;
    case 'ellipse':
      return <ellipse cx={form.cx} cy={form.cy} rx={form.rx} ry={form.ry} style={eigen} />;
    case 'rechteck':
      return (
        <rect
          x={form.x}
          y={form.y}
          width={form.breite}
          height={form.hoehe}
          rx={form.radius ?? 0}
          style={eigen}
        />
      );
  }
};

/**
 * Baut die Transformkette eines Teils, von der Wurzel bis zu ihm selbst.
 *
 * Die Reihenfolge ist die Stelle, an der das leicht falsch wird: SVG wendet
 * Transformationen **von links nach rechts** an, also muss die Wurzel vorn
 * stehen. Umgekehrt herum dreht der Kopf um seinen eigenen Pivot und wandert
 * danach mit dem Koerper, statt mit dem Koerper zu wandern und dann zu
 * drehen — im Standbild sieht das aus wie ein abgeloester Kopf.
 *
 * Jede Ebene traegt zwei Operationen: erst die Drehung, dann die Stauchung.
 * Beide um denselben Pivot, und beide erben sich damit an die Kinder — ein
 * gestauchtes Auge drueckt seine Pupille mit zu, ohne dass jemand das
 * anordnen muss.
 */
const transformkette = (rig: Rig, teilId: string, pose: Pose): string => {
  const nachEltern = new Map(rig.teile.map((t) => [t.id, t.eltern] as const));
  const kette: string[] = [];

  let id: string | undefined = teilId;
  // Wache gegen einen Zyklus in den Elternangaben. Ohne sie ist der Fehler
  // ein haengender Render ohne Meldung, und der ist in diesem Projekt schon
  // einmal teuer gewesen.
  for (let tiefe = 0; id && tiefe < 32; tiefe++) {
    const gelenk = rig.gelenke[id];
    if (gelenk) {
      const [px, py] = gelenk.pivot;
      const stauchung = pose.stauchung[id];
      const dehnung = pose.dehnung[id];
      const hoch = typeof stauchung === 'number' ? stauchung : 1;
      const breit = typeof dehnung === 'number' ? dehnung : 1;
      if (hoch !== 1 || breit !== 1) {
        // Kein `transform-origin`, sondern die ausgeschriebene Rechnung:
        // Der Ursprung eines SVG-Elements ist browserabhaengig, sobald
        // Gruppen ineinanderliegen. Zwei Verschiebungen um einen Punkt sind
        // ueberall dasselbe.
        //
        // Beide Achsen in **einer** Skalierung: Zwei getrennte `scale` um
        // denselben Punkt waeren dasselbe Ergebnis mit doppelter Kette, und
        // die Kette wird je Teil und je Bild neu gebaut.
        kette.unshift(`translate(${px} ${py}) scale(${breit} ${hoch}) translate(${-px} ${-py})`);
      }
      const winkel = pose.drehung[id];
      if (typeof winkel === 'number' && winkel !== 0) {
        kette.unshift(`rotate(${winkelKlemmen(rig, id, winkel)} ${px} ${py})`);
      }
    }
    id = nachEltern.get(id) ?? undefined;
  }

  return kette.join(' ');
};

/**
 * Eine Requisite — das, was die Figur haelt oder woneben sie steht.
 *
 * Zwei Bauarten, und die Wahl ist keine Geschmacksfrage:
 *
 * - **`anTeil`** haengt sie in die Drehkette dieses Teils. Sie wandert dann
 *   mit und kippt mit. Richtig fuer alles, was wirklich in der Hand liegt und
 *   sich mit ihr dreht — ein Stift, ein Kabel.
 * - **`ebene`** stellt sie frei in Buehnenkoordinaten, ohne jede Drehung, an
 *   der genannten Stelle im Ebenenstapel. Richtig fuer alles, was **gerade**
 *   bleiben muss, waehrend zwei Haende es halten: ein aufgeschlagenes Blatt,
 *   ein Bildschirm.
 *
 * Der Unterschied ist an der Lesepose aufgefallen. Am Handteil aufgehaengt
 * kippt das Blatt um denselben Winkel wie der Unterarm, also um dreissig
 * Grad — ein Blatt, das niemand so haelt. Frei gestellt liegt es waagerecht,
 * und die Haende greifen von beiden Seiten daran.
 */
export type Requisite = { inhalt: React.ReactNode } & (
  | { anTeil: string; ebene?: never }
  | { ebene: number; anTeil?: never }
);

export const Figur: React.FC<{
  rig: Rig;
  pose: Pose;
  requisiten?: Requisite[];
  /** Fuer die Standbildprobe: zeichnet Pivots und Buehnengrenzen ein. */
  geruest?: boolean;
}> = ({ rig, pose, requisiten = [], geruest = false }) => {
  const teile = useMemo(() => [...rig.teile].sort((a, b) => a.ebene - b.ebene), [rig]);

  // Freie Requisiten werden in denselben Stapel einsortiert wie die Teile.
  // Zwei getrennte Stapel waeren die naheliegende Bauart und liessen genau
  // das nicht zu, wofuer es sie gibt: ein Blatt **zwischen** Rumpf und Hand.
  const frei = useMemo(
    () =>
      requisiten
        .filter((r): r is Requisite & { ebene: number } => typeof r.ebene === 'number')
        .sort((a, b) => a.ebene - b.ebene),
    [requisiten],
  );

  const stapel = useMemo(
    () =>
      [
        ...teile.map((teil) => ({ ebene: teil.ebene, art: 'teil' as const, teil })),
        ...frei.map((r, i) => ({ ebene: r.ebene, art: 'requisite' as const, requisite: r, i })),
      ].sort((a, b) => a.ebene - b.ebene),
    [teile, frei],
  );

  return (
    <svg
      viewBox={`0 0 ${BUEHNE_FIGUR.breite} ${BUEHNE_FIGUR.hoehe}`}
      width="100%"
      height="100%"
      style={{ overflow: 'visible' }}
    >
      {/*
        **Hier sass am 31.08.2026 einen Abend lang die Stauchung**, mit der
        Begruendung, die weiter gilt: Was jede Aufrufstelle mitschreiben muss,
        vergisst irgendwann eine. Vier Stellen hatten sie vergessen und
        zeichneten schlanke neben gestauchten Figuren.

        Die Stauchung selbst ist noch am selben Abend gefallen (siehe
        `daten/figur/zeiger.ts`), der Merksatz nicht: **Was die Form der Figur
        betrifft, gehoert in die Figur** und nicht an die zwanzig Orte, an
        denen eine gezeichnet wird.
      */}
      {/* Hub hebt die ganze Figur, ohne ein Gelenk zu bemuehen. Das Atmen
          gehoert nicht in ein Gelenk: Wer es dem Koerper gibt, laesst die
          Fuesse mitwandern. */}
      <g transform={`translate(0 ${-pose.hub})`}>
        {stapel.map((eintrag) => {
          if (eintrag.art === 'requisite') {
            return <g key={`requisite-${eintrag.i}`}>{eintrag.requisite.inhalt}</g>;
          }

          const teil = eintrag.teil;

          // Der Mund ist vier Teile, von denen genau eines sichtbar ist.
          if (teil.id.startsWith('mund_') && teil.id !== `mund_${pose.mund}`) return null;

          const stil = stilAnwenden(teil.stil);
          const transform = transformkette(rig, teil.id, pose);

          // Die Pupille bekommt den Blickversatz zusaetzlich und als
          // **innersten** Transform: Sie soll im Auge wandern, nicht das
          // Auge im Kopf verschieben.
          const blick = teil.id.startsWith('pupille_')
            ? ` translate(${pose.blick[0]} ${pose.blick[1]})`
            : '';

          return (
            <g key={teil.id} transform={`${transform}${blick}`.trim() || undefined}>
              {teil.formen.map((form, i) => (
                <FormZeichnen key={i} form={form} stil={stil} />
              ))}
              {requisiten
                .filter((r) => r.anTeil === teil.id)
                .map((r, i) => (
                  <g key={i}>{r.inhalt}</g>
                ))}
            </g>
          );
        })}
      </g>

      {geruest && (
        <g>
          <line
            x1={0}
            y1={BUEHNE_FIGUR.boden}
            x2={BUEHNE_FIGUR.breite}
            y2={BUEHNE_FIGUR.boden}
            stroke="#2C5EFF"
            strokeWidth={0.6}
          />
          <line
            x1={0}
            y1={BUEHNE_FIGUR.unterkante}
            x2={BUEHNE_FIGUR.breite}
            y2={BUEHNE_FIGUR.unterkante}
            stroke="#D94B4B"
            strokeWidth={0.6}
            strokeDasharray="3 2"
          />
          {Object.entries(rig.gelenke).map(([id, gelenk]) => (
            <circle key={id} cx={gelenk.pivot[0]} cy={gelenk.pivot[1]} r={1.4} fill="#D94B4B" />
          ))}
          {Object.entries(rig.griffe).map(([id, punkt]) => (
            <circle key={id} cx={punkt[0]} cy={punkt[1]} r={1.4} fill="#1F9D68" />
          ))}
        </g>
      )}
    </svg>
  );
};
