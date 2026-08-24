import { AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, FARBEN, KENNZEICHNUNG, KOPFZEILE_OBEN, RADIUS, SCHRIFT, SICHERE_ZONE, UNTERTITEL_ZONE } from '../src/marke';
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
/**
 * Der Like-Hinweis — eine Hand deutet aus dem Bild nach rechts.
 *
 * **Sie zeigt auf etwas, das nicht uns gehoert.** Der Like-Knopf liegt bei
 * allen drei Plattformen rechts, als Overlay der App ueber unserem Video.
 * Zeichnen koennen wir ihn nicht, darauf deuten schon. Deshalb braucht der
 * Hinweis auch keine drei Fassungen — anders als das Folgen-Zeichen, das
 * ueberall woanders sitzt.
 *
 * **Warum eine Hand und keine Figur.** Der erste Anlauf liess den Nachleser
 * von rechts hereinlugen. Im Standbild standen dann **zwei** Nachleser im
 * Bild, einer auf der Buehne und einer am Rand, und das liest sich als Doppel
 * statt als Hinweis. Der Kanal hat eine Figur.
 *
 * Die vorhandene Figur konnte die Geste nicht uebernehmen: `Buehnenbild.tsx`
 * interpoliert ihre Haltung ueber die ganze Szene von `von` nach `nach`. Sie
 * mittendrin zu uebersteuern waere ein Sprung, und die Kette zur naechsten
 * Szene braeche.
 *
 * Die Hand ist aus denselben Teilen gebaut wie der Arm des Rigs — `GLIED` mit
 * Staerke 7 und runder Kappe, die Hand als Kreis mit r = 5, hier nur
 * groesser skaliert. Sie ist damit erkennbar unsere Geste, ohne ein zweiter
 * Koerper zu sein.
 *
 * **Es ist eine Richtungsgeste, keine Marke.** Unser Video ist 9:16, die
 * Geraete sind hoeher, und die Apps schneiden oder rahmen verschieden. Wo der
 * Knopf relativ zu unserem Bildinhalt landet, haengt am Geraet. „Nach rechts"
 * stimmt trotzdem — ein Pfeil auf einen Punkt nicht.
 *
 * Der Ton dazu ist unser eigener (`public/ton/marke/gefaellt.wav`,
 * `skripte/toene.ts`), kein Plattformklang.
 */
const GEFAELLT_BILDER = 44;

const Gefaelltmir: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Herein, ein kurzer Tipper, hinaus.
  const herein = spring({ frame, fps, config: { damping: 15, mass: 0.5 } });
  const hinaus = interpolate(frame, [GEFAELLT_BILDER - 9, GEFAELLT_BILDER], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  /* Der Tipper: zweimal ein kurzer Stoss nach rechts, wie beim Antippen. */
  const tipper = interpolate(
    frame,
    [14, 19, 24, 29, 34],
    [0, 20, 0, 16, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const x = interpolate(herein, [0, 1], [150, 0]) + tipper + hinaus * 150;

  return (
    <div
      style={{
        position: 'absolute',
        right: 16,
        bottom: SICHERE_ZONE.unten + UNTERTITEL_ZONE + 60,
        transform: `translateX(${x}px)`,
        opacity: 1 - hinaus,
      }}
    >
      {/*
        Zwei Korrekturen aus dem Standbild.

        **Kurz statt lang.** Ein Unterarm ueber 300 Pixel lief quer durch die
        Buehne und stiess in das Symbol der Szene — im Bild sah er aus wie ein
        Kabel, das in die Steckdose geht.

        **Tippen statt zeigen.** Der erste Anlauf hatte einen ausgestreckten
        Zeigefinger. Der ragte zum einen aus dem Bild, weil er ja nach rechts
        deutet; zum anderen kennt das Rig gar keine Finger — eine Hand ist dort
        ein Kreis am Strich (`hand_rechts`, r = 5). Ein Finger waere eine
        Fremdform gewesen.
        
        Die Geste liegt jetzt in der Bewegung: Die Hand stupst zweimal nach
        rechts. Das ist naeher an dem, was der Zuschauer tun soll — er tippt,
        er deutet nicht.
      */}
      {/*
        **Schmal, damit sie neben das Szenensymbol passt.** Ein breiterer
        Auftritt stiess im Standbild an die Lupe, den Haken und die Steckdose:
        Das Symbol sitzt fest in der rechten Buehnenhaelfte, und was von rechts
        hereinkommt, trifft es zwangslaeufig. Rechts von x = 870 bleiben rund
        210 Pixel, und in die passt die Hand nur ohne Unterarm.
      */}
      <svg width={200} height={110} viewBox="0 0 100 55" style={{ display: 'block', overflow: 'visible' }}>
        {/*
          Das Herz gehoert dazu, und zwar aus einem Befund am Standbild: Eine
          Hand allein liest sich nicht als Hand. Im Rig ist sie ein Kreis am
          Strich, und was sie zur Hand macht, ist der Koerper daran — den es
          hier nicht gibt. In der Szene mit der Steckdose sah der Strich mit
          Kugel aus wie ein Stecker, der hineinwill.

          Mit dem Herz daneben ist die Lesart eindeutig: Etwas wird angetippt,
          und was angetippt wird, ist ein Like. Das Herz ist dabei ein
          allgemeines Zeichen und kein Plattform-Logo — es steht bei allen drei
          Diensten fuer dasselbe.
        */}
        <path
          d="M 90 15 C 90 8 82 5 78 10 C 74 5 66 8 66 15 C 66 22 78 31 78 31 C 78 31 90 22 90 15 Z"
          fill={FARBEN.blau}
        />
        <path d="M 4 25 L 30 25" fill="none" stroke={FARBEN.tinte} strokeWidth={13} strokeLinecap="round" />
        <circle cx="44" cy="25" r="15" fill={FARBEN.tinte} />
      </svg>
    </div>
  );
};

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
   * Die Gesamtlaenge aus dem Zeitplan, nicht aus `useVideoConfig`: Die
   * Komposition kennt sie erst nach `calculateMetadata`, und der Like-Hinweis
   * braucht sie schon beim Aufbau der Sequences.
   */
  const gesamtBilder = plan.length > 0 ? plan[plan.length - 1]!.startBild + plan[plan.length - 1]!.dauerBilder : 0;

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

      {/*
        Der Like-Hinweis sitzt bei rund 62 % der Laufzeit: nach dem Kipppunkt,
        wo die Ueberraschung schon passiert ist, und weit weg von Sekunde 3,5,
        an der die Haltequote gemessen wird.

        `Sequence` und nicht ein Zeitvergleich im Bauteil: So sieht man ihn im
        Remotion-Studio als eigene Spur und kann ihn dort anspringen.
      */}
      <Sequence
        from={Math.round(gesamtBilder * 0.62)}
        durationInFrames={GEFAELLT_BILDER}
        layout="none"
        name="Gefällt mir"
      >
        <Gefaelltmir />
        <Audio src={staticFile('ton/marke/gefaellt.wav')} volume={0.5} />
      </Sequence>

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
