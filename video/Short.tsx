import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, FARBEN, KENNZEICHNUNG, RADIUS, SCHRIFT, SICHERE_ZONE } from '../src/marke';
import type { Short as ShortDaten } from '../src/typen';
import { szenenZeitplan } from '../src/zeit';
import { Hintergrund } from './bausteine/Hintergrund';
import { Kopfzeile } from './bausteine/Wortmarke';
import { Untertitel } from './bausteine/Untertitel';
import { SzeneRendern } from './szenen';

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

export const Short: React.FC<{ daten: ShortDaten }> = ({ daten }) => {
  const plan = szenenZeitplan(daten);

  return (
    <AbsoluteFill>
      <Hintergrund />

      {daten.tonspur && <Audio src={staticFile(daten.tonspur.datei)} />}

      {daten.szenen.map((szene, i) => {
        const zeit = plan[i];
        if (!zeit) return null;
        return (
          <Sequence key={i} from={zeit.startBild} durationInFrames={zeit.dauerBilder} name={`${i + 1} ${szene.art}`}>
            <SzeneRendern szene={szene} dauer={zeit.dauerBilder} />
          </Sequence>
        );
      })}

      {/* Dauerhafte Elemente liegen ueber den Szenen. */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <Fortschritt />

        <div
          style={{
            position: 'absolute',
            top: SICHERE_ZONE.oben - 130,
            left: SICHERE_ZONE.links,
            right: SICHERE_ZONE.rechts,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: ABSTAND.m,
          }}
        >
          <Kopfzeile rubrik={daten.rubrik} />
          <Kennzeichnung werbung={daten.kennzeichnung.werbung} kiStimme={daten.kennzeichnung.kiStimme} />
        </div>

        {daten.tonspur && <Untertitel woerter={daten.tonspur.woerter} />}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
