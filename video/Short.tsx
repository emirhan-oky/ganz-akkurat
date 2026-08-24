import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, FARBEN, KENNZEICHNUNG, KOPFZEILE_OBEN, RADIUS, SCHRIFT, SICHERE_ZONE } from '../src/marke';
import type { Short as ShortDaten } from '../src/typen';
import { szenenZeitplan } from '../src/zeit';
import { Hintergrund } from './bausteine/Hintergrund';
import { Belegzeile, Kopfzeile } from './bausteine/Wortmarke';
import { Untertitel } from './bausteine/Untertitel';
import { SzeneRendern } from './szenen';
import type { Dienst } from './bausteine/Geraete';

/**
 * Ein vollstaendiger Short.
 *
 * Aufbau von hinten nach vorn: Hintergrund, Szenenfolge, dauerhafte
 * Markenelemente, Untertitel, Kennzeichnung. Die Kennzeichnung liegt
 * bewusst ganz oben und ist nicht abschaltbar — sie ist rechtliche
 * Pflicht, keine Gestaltungsentscheidung.
 */

/** Dünner Fortschrittsbalken am oberen Rand. Zeigt, dass es bald vorbei ist. */
const Fortschritt: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, backgroundColor: FARBEN.gitter }}>
      <div
        style={{
          height: '100%',
          width: `${Math.min(1, frame / durationInFrames) * 100}%`,
          backgroundColor: FARBEN.blau,
        }}
      />
    </div>
  );
};

/**
 * Pflichthinweise im Bild.
 *
 * Das Werbelabel erscheint **nur**, wenn das Video selbst auf die Links
 * verweist. Stehen die Partnerlinks ausschliesslich in der Beschreibung, ist
 * dort auch der Ort der Kennzeichnung — dann ist das Video Information und
 * ein Label im Bild waere falsch, nicht vorsichtig.
 */
const Kennzeichnung: React.FC<{ werbung: ShortDaten['kennzeichnung']['werbung']; kiStimme: boolean }> = ({
  werbung,
  kiStimme,
}) => {
  const hinweise: string[] = [];
  if (werbung === 'video') hinweise.push(KENNZEICHNUNG.werbung);
  if (kiStimme) hinweise.push(KENNZEICHNUNG.kiStimme);

  if (hinweise.length === 0) return null;

  return (
    <div style={{ display: 'flex', gap: ABSTAND.xs }}>
      {hinweise.map((hinweis) => (
        <span
          key={hinweis}
          style={{
            fontFamily: SCHRIFT.familie,
            fontWeight: SCHRIFT.halbfett,
            fontSize: 22,
            color: FARBEN.tinteWeich,
            backgroundColor: FARBEN.grundRein,
            border: `2px solid ${FARBEN.flaeche}`,
            padding: '6px 14px',
            borderRadius: RADIUS.rund,
          }}
        >
          {hinweis}
        </span>
      ))}
    </div>
  );
};

/**
 * Wie lange der Beleg oben stehen bleibt.
 *
 * Er erscheint mit der Szene, die die tragende Behauptung macht, und
 * verschwindet mit ihr — laengstens nach drei Sekunden. Die Obergrenze gibt es
 * fuer den Fall, dass jemand die Einblendung an eine lange Szene haengt:
 * „Umweltbundesamt" ist ein Name, kein Satz, und laenger stehen zu lassen
 * waere Andacht statt Beleg.
 */
const BELEG_MAXBILDER = 90;

/**
 * Der Dienst ist eine Eigenschaft des **Renders**, nicht des Shorts.
 *
 * Ein Short ist derselbe, egal wo er landet; nur das Folgen-Zeichen an der
 * Signatur wechselt. Deshalb steht `dienst` hier als Prop und nicht im Schema.
 *
 * **Optional mit Vorgabe ist Absicht.** So bleibt `daten/beispiel-short.ts`
 * als Standard-Prop der Komposition gueltig und `npm run lauf` laeuft
 * unveraendert weiter. Wuerde die Prop pflichtig, riss die Standard-Prop das
 * Schema — und dann bleibt Remotion in einem unerfuellten Promise stehen, ohne
 * Fehlermeldung, bis jemand abbricht.
 */
export const Short: React.FC<{ daten: ShortDaten; dienst?: Dienst }> = ({
  daten,
  dienst = 'tiktok',
}) => {
  const plan = szenenZeitplan(daten);

  /*
   * Die Belegszene sass frueher im Szenenstrom und brauchte deshalb keine
   * Suche. Als Einblendung haengt sie an irgendeiner Szene — welcher, weiss
   * nur die Szene selbst. Genau eine traegt `herausgeber`, das erzwingt das
   * Schema.
   */
  const belegIndex = daten.szenen.findIndex((s) => 'herausgeber' in s && s.herausgeber !== undefined);
  const belegSzene = belegIndex >= 0 ? daten.szenen[belegIndex] : undefined;
  const belegZeit = belegIndex >= 0 ? plan[belegIndex] : undefined;
  const herausgeber =
    belegSzene !== undefined && 'herausgeber' in belegSzene ? belegSzene.herausgeber : undefined;

  /*
   * Der Spruch stand hier bis zum 24.08.2026 als eigene Sequenz oben in der
   * Kopfzeile. Er steht jetzt **in** der Schlussszene, neben der Figur — die
   * Stelle kennt nur `video/szenen/index.tsx`, und der Short muss dafuer
   * nichts mehr ausrechnen.
   */

  /*
   * Die sichtbare Zaehlung, wenn der Short eine hat.
   *
   * Sie wird hier gerechnet und nicht in der Szene, weil die Kopfzeile
   * **ueber** allen Sequences liegt: Sie kennt das aktuelle Bild, aber keine
   * Szene. Der Umweg ueber den Zeitplan ist deshalb kein Umweg, sondern die
   * einzige Stelle, an der beides zusammenkommt.
   *
   * Die Zahl **haelt**, statt zu verschwinden. Eine Szene ohne eigene Nummer
   * zwischen zwei gezaehlten ist der Normalfall — jeder Punkt braucht mehr als
   * eine Szene. Wuerde die Anzeige dort aussetzen, blitzte sie im Bild und
   * saehe nach Fehler aus statt nach Fortschritt.
   */
  const frame = useCurrentFrame();
  const gesamtZaehlung = daten.szenen.reduce((max, s) => Math.max(max, s.zaehlung ?? 0), 0);

  const aktuelleZaehlung = (() => {
    if (gesamtZaehlung === 0) return undefined;
    let stand: number | undefined;
    for (const [i, szene] of daten.szenen.entries()) {
      const zeit = plan[i];
      if (!zeit || frame < zeit.startBild) break;
      if (szene.zaehlung !== undefined) stand = szene.zaehlung;
    }
    return stand === undefined ? undefined : { nummer: stand, von: gesamtZaehlung };
  })();

  return (
    <AbsoluteFill>
      <Hintergrund />

      {daten.tonspur && <Audio src={staticFile(daten.tonspur.datei)} />}

      {daten.szenen.map((szene, i) => {
        const zeit = plan[i];
        if (!zeit) return null;
        return (
          <Sequence key={i} from={zeit.startBild} durationInFrames={zeit.dauerBilder} name={`${i + 1} ${szene.art}`}>
            <SzeneRendern szene={szene} dauer={zeit.dauerBilder} dienst={dienst} />
          </Sequence>
        );
      })}

      {/* Dauerhafte Elemente liegen ueber den Szenen. */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <Fortschritt />

        <div
          style={{
            position: 'absolute',
            top: KOPFZEILE_OBEN,
            left: SICHERE_ZONE.links,
            right: SICHERE_ZONE.rechts,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: ABSTAND.m,
            }}
          >
            {/* `flex: 1`, damit die Zaehlung in der Kopfzeile per `margin-left:
                auto` bis an die Kennzeichnung heranrueckt. Ohne das ist die
                Kopfzeile nur so breit wie ihr Inhalt, und die Zahl klebte an
                der Formatpille — dort liest sie sich als Teil des Etiketts. */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Kopfzeile format={daten.format} zaehlung={aktuelleZaehlung} />
            </div>
            <Kennzeichnung werbung={daten.kennzeichnung.werbung} kiStimme={daten.kennzeichnung.kiStimme} />
          </div>

          {/*
            Der Beleg haengt unter der Kopfzeile, nicht in ihr: Er kommt und
            geht, sie steht. Die feste Hoehe haelt die Buehne darunter ruhig —
            ohne sie ruckte das ganze Bild, sobald die Zeile erscheint.
          */}
          <div style={{ height: 46, display: 'flex', alignItems: 'center' }}>
            {herausgeber !== undefined && belegZeit !== undefined && (
              <Sequence
                from={belegZeit.startBild}
                durationInFrames={Math.min(belegZeit.dauerBilder, BELEG_MAXBILDER)}
                layout="none"
                name="Beleg"
              >
                <Belegzeile herausgeber={herausgeber} />
              </Sequence>
            )}

          </div>
        </div>

        {daten.tonspur && <Untertitel woerter={daten.tonspur.woerter} />}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
