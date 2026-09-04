import { AbsoluteFill, Audio, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ABSTAND, FARBEN, FORMAT, KENNZEICHNUNG, KOPFZEILE_OBEN, RADIUS, SCHRIFT, SICHERE_ZONE, UNTERTITEL_ZONE, VORHANG } from '../src/marke';

import type { Short as ShortDaten, Sprecher } from '../src/typen';
import { FORMATE, KALTSTART_ARTEN, ZUGARTEN } from '../src/typen';
import {
  NACHLAUF_SEK,
  SPRECHERWECHSEL_SEK,
  VORSPANN_VORLAUF_SEK,
  ansageAbSek,
  kaltstartSek,
  szenenZeitplan,
  vorlaufSek,
  vorspannSek,
} from '../src/zeit';
import { Hintergrund } from './bausteine/Hintergrund';
import { Kulisse } from './bausteine/Kulisse';
import {
  Abspannkarte,
  RUHE,
  Vorhangstoff,
  Vorspannkarte,
  aufVorhang,
  vorhangstand,
  vorlaufAblauf,
} from './bausteine/Vorhang';
import vorspannDauern from '../daten/vorspannton.json';
import { Belegzeile, Kopfzeile } from './bausteine/Wortmarke';
import { Untertitel } from './bausteine/Untertitel';
import { Kaltstartzeile, Redespalten } from './bausteine/Redespalten';
import { Sprechblase } from './bausteine/Sprechblase';
import { Sprecherstand } from './bausteine/Sprecherstand';
import { Kaltstartbild, SzeneRendern } from './szenen';
import { Figur } from './bausteine/Figur';
import { zeiger } from '../daten/figur/zeiger';
import { POSEN } from './bausteine/posen';

/**
 * Ein vollstaendiger Short.
 *
 * Aufbau von hinten nach vorn: Hintergrund, Szenenfolge, dauerhafte
 * Markenelemente, Untertitel, Kennzeichnung. Die Kennzeichnung liegt
 * bewusst ganz oben und ist nicht abschaltbar — sie ist rechtliche
 * Pflicht, keine Gestaltungsentscheidung.
 */

/**
 * Bei welchem Bild der Kipppunktton einsetzt — oder gar nicht.
 *
 * ## Die erste Kipppunkt-Szene, nicht beide
 *
 * Alle vier Entwuerfe haben **zwei** Szenen auf `kipppunkt` — das Schema
 * verlangt nur mindestens eine und deckelt nicht. Der Ton laeuft trotzdem
 * einmal: Zweimal derselbe Klang macht den zweiten zur Wiederholung des
 * ersten. Aus genau diesem Grund gibt es `gefaellt` und `folgen` als zwei
 * verschiedene Toene und nicht einen zweimal.
 *
 * ## Nicht am Szenenanfang, sondern am ersten behauptenden Zug
 *
 * **Die Kipppunkt-Szene beginnt nicht immer mit der Wendung.** In
 * `passwort-wechseln` steht dort zuerst Wattis Irrtum — „Also nie wechseln,
 * verstanden" (`widersprechen`) —, und erst Voltis Richtigstellung danach ist
 * das, was kippt. Ein Ton am Szenenanfang traefe den Irrtum.
 *
 * Nachgezaehlt am 01.09.2026: In drei von vier Entwuerfen ist der erste Zug
 * der Szene schon behauptend (`nachlegen`, `richtigstellen`, `beantworten`),
 * im vierten nicht. Die Regel trifft also dreimal den Szenenanfang und einmal
 * die Zeile danach — genau dort, wo der Unterschied zaehlt.
 *
 * Das ist der zweite Leser fuer `abschnitte[].zug`, der am selben Tag fuer die
 * Haltung der Figuren entstanden ist.
 *
 * ## Ohne Tonspur kein Ton
 *
 * Der Zug steht nur in `abschnitte`. Faellt die Tonspur weg — tonloser Render,
 * `npm run bildrand`, Vorschau —, faellt der Ton weg; ein Rueckfall auf den
 * geschaetzten Zeitplan wuesste nicht, wer was sagt.
 */
const kipppunktBild = (
  daten: ShortDaten,
  plan: { startBild: number; dauerBilder: number }[],
  bilderProSekunde: number,
): number | null => {
  const abschnitte = daten.tonspur?.abschnitte;
  if (!abschnitte) return null;

  const szene = daten.szenen.findIndex((sz) => sz.position === 'kipppunkt');
  const fenster = plan[szene];
  if (szene < 0 || !fenster) return null;

  const vonSek = fenster.startBild / bilderProSekunde;
  const bisSek = (fenster.startBild + fenster.dauerBilder) / bilderProSekunde;
  const treffer = abschnitte.find(
    // Ohne Zug kein Treffer: Alte Renderdaten kennen das Feld nicht, und ein
    // Ton auf gut Glueck saesse irgendwo.
    (a) => a.startSek >= vonSek && a.startSek < bisSek && a.zug !== undefined && ZUGARTEN[a.zug].behauptet,
  );
  return treffer ? Math.round(treffer.startSek * bilderProSekunde) : null;
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
 * Die Flaeche des Stoffs — bis an alle vier Bildraender.
 *
 * Er beginnt bei y = 0 und laeuft hinter der Kopfzeile durch. Ein Vorhang
 * haengt von der Decke; faengt er auf halber Hoehe an, haengt er an nichts.
 */
const STOFFFLAECHE = {
  position: 'absolute',
  top: VORHANG.oben,
  bottom: 0,
  left: 0,
  right: 0,
} as const;

/**
 * Die Flaeche der Titelkarte — sie setzt unter der Kopfzeile an.
 *
 * **Nicht dieselbe wie die des Stoffs**, obwohl beide denselben Vorhang
 * meinen. Der Stoff soll bis an den Bildrand, die Karte nicht: Sie zentriert
 * ihren Titelblock in ihrer Flaeche, und mit den zusaetzlichen 376 Pixeln
 * stand „Facts" quer durch die Wortmarke.
 */
/**
 * Wer in einer Szene links steht. `wer` gibt es nur an der Figurenbuehne; die
 * Gegenueberstellung kennt keine zwei Sprecher und faellt auf die Vorgabe
 * zurueck. Gelesen von den Redespalten.
 */
const linksIn = (szene: ShortDaten['szenen'][number] | undefined): Sprecher =>
  szene?.buehne?.art === 'figur' ? (szene.buehne.wer ?? 'nachleser') : 'nachleser';

const KARTENFLAECHE = {
  position: 'absolute',
  top: VORHANG.karte,
  bottom: 0,
  left: 0,
  right: 0,
} as const;

export const Short: React.FC<{ daten: ShortDaten }> = ({
  daten,
}) => {
  const plan = szenenZeitplan(daten);
  const { fps: bilderProSekunde, durationInFrames } = useVideoConfig();

  const kipppunktAb = kipppunktBild(daten, plan, bilderProSekunde);

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

  /*
   * **Der Vorhangstand wird genau einmal gerechnet, hier.**
   *
   * Das Startbild ist seit dem 31.08.2026 schlicht **null**. Vorher sass der
   * Vorspann zwischen Szene 0 und 1 und sein Beginn wurde rueckwaerts aus der
   * Folgeszene gerechnet — die Sprechdauer der ersten Szene stand ja schon im
   * Zeitplan. Am Anfang braucht es diese Rechnung nicht mehr.
   *
   * Ausserhalb der Vorspannspanne braucht es keinen Sonderfall: `vorhangstand`
   * klemmt an beiden Enden auf `RUHE`, die beiden stehenden Streifen.
   */
  const kaltstartBilder = Math.round(kaltstartSek(daten) * bilderProSekunde);
  const vorspannBilder = Math.round(vorspannSek(daten) * bilderProSekunde);
  /* Kaltstart, Zufahrt, Vorspann — dieselbe Summe, die `szenenZeitplan` vor
     die erste Szene legt. Zweimal gerechnet liefen Bild und Zeitplan
     auseinander, und der Vorhang stuende ueber der laufenden ersten Szene. */
  const vorlaufBilder = Math.round(vorlaufSek(daten) * bilderProSekunde);
  const A = vorlaufAblauf(kaltstartBilder, vorspannBilder);
  /* Wer den Kaltstart spricht, steht in `KALTSTART_ARTEN` und nicht im
     Entwurf — dieselbe Tabelle, die Schema und Vertonung lesen. */
  const kaltstartSprecher: Sprecher =
    KALTSTART_ARTEN.find((a) => a.schluessel === daten.kaltstart.art)?.wer ?? 'zeiger';

  /*
   * **Wann die Themenansage einsetzt — eine Zahl, zwei Verwendungen.**
   *
   * Sie folgt auf Voltis Showtitel und Wattis Einwurf, beide mit der Pause
   * dazwischen, die `src/zeit.ts` fuer jeden Sprecherwechsel ansetzt. Die
   * Dauern sind gemessen und stehen in `daten/vorspannton.json`.
   *
   * Derselbe Wert steuert den Toneinsatz **und** die Einblendung der Zeile.
   * Vorher hing die Einblendung an einem Anteil der Vorspanndauer, und das ging
   * schief: **Die Stimme kam 1,2 Sekunden vor dem Bild.** Ein Anteil beschreibt
   * eine Position im Ganzen; der Ansagebeginn haengt an der Laenge der beiden
   * Saetze davor — zwei Groessen, die nichts miteinander zu tun haben.
   */
  /*
   * **Seit dem 31.08.2026 aus `vorspannFestSek`, nicht hier gerechnet.**
   *
   * Diese Zeilen standen wortgleich in `src/zeit.ts` noch einmal — dort als
   * feste 4,8 Sekunden fuer die laengste Show, hier je Format. Zwei Zahlen fuer
   * denselben Zeitpunkt, und zwischen ihnen lag im fertigen Video ein Loch von
   * **1,53 Sekunden Stille**, das keine Pruefung sehen konnte.
   */
  const ansageAbBild = Math.round(ansageAbSek(kaltstartSek(daten)) * bilderProSekunde);
  /*
   * **Am Ende faehrt der Vorhang wieder zu — seit dem 01.09.2026.**
   *
   * Meine eigene Warnung dagegen lautete, ein zufahrender Vorhang sage optisch
   * „fertig" und arbeite damit gegen den Rundlauf. Sie war falsch, und zwar aus
   * einem Grund, den man erst sieht, wenn beide Enden nebeneinanderliegen:
   * **Das Video beginnt mit geschlossenem Vorhang.** Faehrt er am Ende zu, ist
   * der Uebergang in die Wiederholung nahtlos statt ein Schnitt — der Rundlauf
   * wird staerker, nicht schwaecher.
   *
   * Die Fahrt liegt in den letzten `VORHANG.fahrtBilder` und damit **innerhalb**
   * der Schlussszene, die den Nachlauf ohnehin traegt. Sie kostet also keine
   * zusaetzliche Sekunde.
   */
  /*
   * **Der Abspann beginnt mit dem Nachlauf, nicht erst am letzten Bild.**
   *
   * `NACHLAUF_SEK` sind 1,5 Sekunden Stille nach dem letzten Wort. Sie standen
   * frueher fuer die Signatur auf der Buehne — die ist auf den Vorhang
   * gewandert, und damit gehoert die Zeit der Karte. Der Stoff faehrt in den
   * ersten `VORHANG.fahrtBilder` davon zu; die restliche Sekunde steht das
   * Bild.
   *
   * Es kostet **keine zusaetzliche Sekunde**: Die Zeit war schon da, sie war
   * nur leer.
   */
  const abspannAbBild = Math.max(
    0,
    durationInFrames - 1 - Math.round(NACHLAUF_SEK * bilderProSekunde),
  );

  /*
   * Wattis „Wirklich." — nach der Fahrt, Voltis Dauer und der Sprecherpause.
   * Bild und Ton lesen dieselbe Zahl, wie beim Vorspann.
   */
  const wattiAbBild =
    VORHANG.fahrtBilder +
    Math.round((vorspannDauern.abspann.volti + SPRECHERWECHSEL_SEK) * bilderProSekunde);

  const schlussfahrt = interpolate(
    frame,
    /*
     * **Bis `durationInFrames - 1`, nicht bis `durationInFrames`.** Das letzte
     * gerenderte Bild ist eines vor der Gesamtlaenge; wer bis zur Laenge selbst
     * interpoliert, kommt nie ganz an. Im Standbild war das ein weisser Spalt
     * von wenigen Pixeln zwischen den beiden Vorhanghaelften — genau in dem
     * Bild, das im Rundlauf an das geschlossene Bild 0 anschliesst.
     *
     * Derselbe Off-by-one wie bei `gesamtdauerBilder` gestern Abend, und
     * dieselbe Stelle: das letzte Bild.
     */
    [abspannAbBild, abspannAbBild + VORHANG.fahrtBilder],
    [RUHE, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin) },
  );
  const vorhangZu = Math.max(vorhangstand(frame, kaltstartBilder, vorspannBilder), schlussfahrt);
  /*
   * Wie stark der Vorhang hinter der Kopfzeile steht. Sie liegt ueber dem
   * Stoff und bleibt sichtbar, wechselt aber auf helle Farben, solange er zu
   * ist — sonst stuenden Wortmarke und Belegzeile mit Kontrast 1,0 bis 1,9 auf
   * Theaterrot.
   *
   * **Aus demselben Stand gerechnet wie der Vorhang selbst.** Ein zweiter
   * Zeitvergleich daneben liefe beim naechsten Umbau am Ablauf lautlos
   * auseinander.
   */
  const kopfzeileAufRot = aufVorhang(vorhangZu);

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
    <Sprecherstand abschnitte={daten.tonspur?.abschnitte} woerter={daten.tonspur?.woerter}>
    <AbsoluteFill>
      <Hintergrund />
      {/*
        **Die Kulisse liegt zwischen Hintergrund und allem anderen.** Sie
        fuellt die Flaeche zwischen den Vorhaengen und macht aus der Buehne
        einen Ort — der Vorhang bleibt der Rahmen, und ein Zimmer, das ueber
        ihn liefe, waere kein Zimmer hinter einer Buehne mehr.

        Die Untertitelzone entscheidet ueber die Hoehe der Buehne und damit
        ueber die Standlinie der Figuren; die Kulisse rechnet ihre Bodenkante
        aus derselben Funktion.
      */}
      <Kulisse mitUntertitelzone={(daten.tonspur?.abschnitte?.length ?? 1) <= 1} />

      {/*
        Bei zwei Sprechern liegt der Ton in Abschnitten vor, je einer mit
        eigener Stimme und eigenem Startbild. Sie werden **nebeneinandergelegt**
        statt zu einer Datei verklebt — das kann Remotion von Haus aus, und
        Zusammenkleben braeuchte ffmpeg, das hier nur als abgespeckter
        Remotion-Wrapper existiert.

        Ohne `abschnitte` laeuft der einstimmige Fall wie vorher.
      */}
      {daten.tonspur?.abschnitte
        ? daten.tonspur.abschnitte.map((abschnitt) => (
            <Sequence
              key={abschnitt.datei}
              from={Math.round(abschnitt.startSek * bilderProSekunde)}
              // Ohne eigene Laenge endet die Sequence mit der Komposition; der
              // Ton hoert ohnehin von selbst auf.
              layout="none"
            >
              <Audio src={staticFile(abschnitt.datei)} />
            </Sequence>
          ))
        : daten.tonspur && <Audio src={staticFile(daten.tonspur.datei)} />}

      {/*
        **Der Kaltstart — die ersten Sekunden, vor dem Vorhang.**

        Eine Figur mit ihrem Symbol, darunter der Satz. Er laeuft, solange der
        Vorhang noch offen ist; danach faellt der Stoff darueber, und die
        Sequence endet mit ihm.

        **Sie endet bei `A.titel` und nicht bei `A.zufahren`.** Waehrend der
        Fahrt ist die Buehne noch zur Haelfte zu sehen — waere sie da schon
        leer, faellt der Vorhang ueber nichts, und genau das war der Grund,
        aus dem das Zufahren am 31.08.2026 abgeschafft wurde.

        Wer spricht, steht in `KALTSTART_ARTEN`. Dieselbe Tabelle liest das
        Schema und die Vertonung; eine zweite Zuordnung daneben liefe beim
        ersten Umbau lautlos auseinander.
      */}
      <Sequence durationInFrames={A.titel} name="Kaltstart">
        {/*
          **Ein eigener `Sprecherstand` fuer den Kaltstart.**

          Der aeussere rechnet mit den Abschnitten des Gespraechs, und deren
          erster beginnt erst hinter dem Vorspann — waehrend des Kaltstarts
          waere die Sprechstaerke also null und die Figur redete mit
          geschlossenem Mund. Seine Woerter liegen ab null, genau wie die
          Sequence, in der er steht.

          `zweistimmig` steht ausdruecklich auf `true`: Ein einzelner Abschnitt
          gaelte sonst als einstimmiger Short und schaltete die Untertitelzone
          ein — die Figur stuende 270 Pixel tiefer als hinter dem Vorhang.
        */}
        <Sprecherstand
          zweistimmig
          woerter={daten.tonspur?.kaltstart?.woerter}
          abschnitte={
            daten.tonspur?.kaltstart
              ? [
                  {
                    datei: daten.tonspur.kaltstart.datei,
                    sprecher: kaltstartSprecher,
                    startSek: 0,
                    zug: 'behaupten',
                  },
                ]
              : undefined
          }
        >
          <Kaltstartbild buehne={daten.kaltstart.buehne} dauer={A.titel} />
          {daten.tonspur?.kaltstart && (
            <>
              <Audio src={staticFile(daten.tonspur.kaltstart.datei)} />
              <Kaltstartzeile
                woerter={daten.tonspur.kaltstart.woerter}
                wer={kaltstartSprecher}
              />
            </>
          )}
        </Sprecherstand>
      </Sequence>

      {daten.szenen.map((szene, i) => {
        const zeit = plan[i];
        if (!zeit) return null;
        return (
          <Sequence key={i} from={zeit.startBild} durationInFrames={zeit.dauerBilder} name={`${i + 1} ${szene.art}`}>
            <SzeneRendern szene={szene} dauer={zeit.dauerBilder} />
          </Sequence>
        );
      })}

      {/*
        **Der Vorhang liegt ueber den Szenen und deckt die Buehne.**

        Er ist **dauerhaft** gemountet, nicht nur waehrend des Vorspanns: Seit
        dem 31.08.2026 bleiben links und rechts geraffte Streifen stehen, damit
        der Zuschauer ab Sekunde null eine Buehne sieht. Der Vorspannvorhang
        waechst dann aus ihnen heraus, statt aus dem Nichts zu erscheinen.

        Die Szene dahinter bleibt gemountet, auch wenn er geschlossen ist —
        deshalb reicht die Szene davor ueber die Vorspanndauer hinweg
        (`szenenZeitplan` gibt ihr die Dauer bis zum Start der naechsten, und
        dort steckt der Vorspann schon drin).

        **Ein einfaches `div`, kein `AbsoluteFill`.** Dessen Voreinstellung
        `inset: 0` hat `right` und `bottom` ueberschrieben; der Vorhang lief im
        Standbild ueber den rechten Bildrand hinaus, waehrend `left` und `top`
        griffen. Wer nur eine Seite prueft, sieht das nicht.

        **Seitlich bis zum Bildrand, oben unter der Kopfzeile.** Der erste
        Anlauf hielt sich an die sichere Zone und liess links wie rechts einen
        Streifen frei — durch den die Szene dahinter durchschaute. Ein Vorhang
        mit Rand ist kein Vorhang, sondern ein Bild im Bild.

        Die Flaeche wird hier gesetzt und nicht ueber `Buehne` geholt. `Buehne`
        misst die Hoehe ihres Inhalts und skaliert ihn; ein Kind mit
        `position: absolute` hat keine Hoehe, und die Transformation darueber
        macht sie zugleich zum Bezugsrahmen — der Vorhang war dadurch null
        Pixel hoch und im Standbild unsichtbar.
      */}
      <div style={STOFFFLAECHE}>
        <Vorhangstoff
          zu={vorhangZu}
          breite={FORMAT.breite}
          hoehe={FORMAT.hoehe - VORHANG.oben}
        />
      </div>

      {/*
        **Die Titelkarte — Cold Open nach dem Aufschlag.**

        Sie laeuft nur waehrend des Vorspanns und liegt deshalb in einer
        eigenen `Sequence`, waehrend der Stoff darueber dauerhaft steht. Zwei
        Bauteile, ein Stand: Eine zweite Zeichnung desselben Vorhangs waere die
        Doppelung ohne Wache.
      */}
      {
        <Sequence durationInFrames={vorlaufBilder} name="Vorspann">
          <div style={KARTENFLAECHE}>
            <Vorspannkarte
              zeile={daten.vorspann}
              dauer={vorspannBilder}
              kaltstartBilder={kaltstartBilder}
              zeileAbBild={ansageAbBild}
              hoehe={FORMAT.hoehe - VORHANG.karte}
            />
          </div>

          {/*
            **Der Ton des Vorspanns — vier feste Dateien, keine Vertonung.**

            Der Wortlaut wechselt nie, also wird er einmal bezahlt und liegt
            unter `public/ton/marke/`. Durch `shortVertonen` geschickt kostete
            derselbe Satz bei vier Videos die Woche rund 11.000 Zeichen im Jahr.

            **Alle Einsaetze haengen an `ablauf()`**, dem Zeitplan, der auch
            den Vorhang steuert. Danebengeschriebene Zahlen liefen beim ersten
            Umbau am Ablauf lautlos auseinander, und ein Geraeusch, das 0,1
            Sekunden neben seiner Bewegung sitzt, klingt wie ein Fehler.
          */}
          {/*
            **Der Auftakt sitzt auf der Zufahrt, nicht auf Bild 0.**

            Bis zum 02.09.2026 begann das Video mit ihm, weil es mit dem
            Vorhang begann. Jetzt laeuft davor der Kaltstart, und ein
            Dreiklang ueber Wattis erstem Satz kuendigt eine Show an, die noch
            nicht angefangen hat. Er gehoert dorthin, wo der Stoff faellt.

            **Der Showtitel und die beiden Namen sind gestrichen** — zehn feste
            Aufnahmen unter `public/ton/marke/vorspann/`, die niemand mehr
            abruft. Sie kosteten je nach Show 3,69 bis 4,40 Sekunden, und genau
            daraus ist der Kaltstart bezahlt. `daten/vorspannton.json` haelt nur
            noch die zwei Abspannaufnahmen.
          */}
          <Sequence from={A.zufahren} layout="none" name="Auftakt">
            <Audio src={staticFile('ton/marke/auftakt.wav')} />
          </Sequence>

          {daten.tonspur?.vorspann && (
            <Sequence from={ansageAbBild} layout="none" name="Vorspann Thema">
              <Audio src={staticFile(daten.tonspur.vorspann.datei)} />
            </Sequence>
          )}
        </Sequence>
      }

      {/*
        **Die Abspannkarte — dieselbe Karte wie im Vorspann, andere Mitte.**

        Sie liegt wie die Vorspannkarte in einer eigenen `Sequence` ueber dem
        Stoff, der dauerhaft steht. Der Schlusssatz steht seit dem 01.09.2026
        nirgends mehr im Bild; auf dem Vorhang stehen der Spruch und Wattis
        Zeile.
      */}
      <Sequence from={abspannAbBild} layout="none" name="Abspann">
        <div style={KARTENFLAECHE}>
          <Abspannkarte
            wattiAbBild={wattiAbBild}
            hoehe={FORMAT.hoehe - VORHANG.karte}
          />
        </div>

        {/*
          **Der Ton des Abspanns — zwei feste Dateien, keine Vertonung.**

          Volti setzt ein, sobald der Vorhang zu ist; Watti nach Voltis
          gemessener Dauer plus der Sprecherpause. Dasselbe Muster wie
          „Vorspann Volti / Vorspann Watti", und dieselbe Quelle fuer die
          Dauern: `daten/vorspannton.json`, geschrieben vom Aufnahmeskript.
        */}
        <Sequence from={VORHANG.fahrtBilder} layout="none" name="Abspann Volti">
          <Audio src={staticFile('ton/marke/abspann.volti.mp3')} />
        </Sequence>
        <Sequence from={wattiAbBild} layout="none" name="Abspann Watti">
          <Audio src={staticFile('ton/marke/abspann.watti.mp3')} />
        </Sequence>
      </Sequence>

      {/*
        **Die Aufloesung liegt ausserhalb der Vorspann-`Sequence`.**

        Sie klingt 0,94 Sekunden, der Vorhang faehrt in 0,4 — und sie setzt beim
        Oeffnen ein, also kurz vor Schluss des Vorspanns. Innen gemountet haette
        die `Sequence` sie nach wenigen Bildern abgeschnitten, und ein Ton, der
        mitten im Ausklingen aufhoert, klingt wie ein Kabelbruch.

        Draussen laeuft sie in die erste Szene hinein und traegt den Uebergang.
        Ihr Startbild kommt aus demselben `vorlaufAblauf().oeffnen` wie die
        Vorhangbewegung.
      */}
      <Sequence from={A.oeffnen} layout="none" name="Vorhang auf">
        <Audio src={staticFile('ton/marke/oeffnung.wav')} />
      </Sequence>

      {/*
        **Und derselbe Ton, wenn er wieder zufaehrt** — seit dem 04.09.2026.
        Emirhan: „Wenn der Vorhang wieder zugeht, will ich dafuer einen Ton
        haben. Eben derselbe wie wenn der Vorhang aufgeht, nur etwas
        abgerundeter fuers Zugehen."

        Er steht **ausserhalb** der Abspann-`Sequence`, aus demselben Grund wie
        die Oeffnung eine Ebene hoeher liegt als der Vorspann: Innen gemountet
        beginnt sein Ausklang, wo die Sequence anfaengt, und Voltis „Wir haben
        nachgelesen." setzt genau dort ein. Er faengt mit der Fahrt an, nicht
        mit der Karte.

        Ohne `durationInFrames` und ohne `volume`: Laenge und Pegel stehen in
        der Datei, wo sie messbar sind.
      */}
      <Sequence from={abspannAbBild} layout="none" name="Vorhang zu">
        <Audio src={staticFile('ton/marke/schliessung.wav')} />
      </Sequence>

      {/*
        Der Kipppunktton — siehe `kipppunktBild` oben, wo steht, warum er an
        einem Redeanteil haengt und nicht an einer Szene.

        **Ohne `durationInFrames`, und das ist Absicht.** Ein Deckel waere eine
        zweite Stelle fuer die Tonlaenge; die erste steht als 0,9 im Generator.
        Denselben Weg ist der Oeffnungston schon gegangen — er wurde
        ausdruecklich **ausserhalb** der Vorspann-Sequence gemountet, statt
        seine Laenge irgendwo zu pflegen. Ein Ton, der von selbst ausklingt,
        braucht kein Ende.

        Der Pegel steht in der Datei und nicht hier: Dort ist er messbar.
      */}
      {kipppunktAb !== null && (
        <Sequence from={kipppunktAb} layout="none" name="Kipppunkt">
          <Audio src={staticFile('ton/marke/kipppunkt.wav')} />
        </Sequence>
      )}

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
              <Kopfzeile format={daten.format} zaehlung={aktuelleZaehlung} aufVorhang={kopfzeileAufRot} />
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
                <Belegzeile herausgeber={herausgeber} aufVorhang={kopfzeileAufRot} />
              </Sequence>
            )}

          </div>
        </div>

        {/*
          ## Zweistimmige Shorts tragen seit dem 31.08.2026 keinen Text unten

          Bis dahin stand hier die `Sprechblase`: Text auf der Seite des
          Sprechers, sein Name als farbiges Schild darueber. Im fertigen Video
          zu zweit war das Urteil eindeutig — „das sieht mit den Untertiteln so
          unfassbar scheisse aus, wenn beide Charaktere im Bild sind".

          **Die Zuordnung traegt jetzt der Name ueber der Figur** (`Namensschild`
          in `Buehnenbild.tsx`): beide dauerhaft im Bild, der Sprechende in
          seiner Kennfarbe. Damit ist die eine Sache, die die Blase konnte und
          der Untertitel nicht, an einen anderen Ort gewandert statt verloren.

          **Der Preis gehoert danebengeschrieben.** Wer ohne Ton schaut,
          versteht in genau den Szenen nichts, die den Umbau tragen — und der
          Untertitel war das einzige, was die ersten Zuschauer ausdruecklich
          gelobt haben. Deshalb bleibt `Sprechblase.tsx` vollstaendig stehen:
          Diese Zeile zurueckzudrehen ist eine Zeile Arbeit, nicht ein Neubau.
        */}
        {daten.tonspur && (daten.tonspur.abschnitte?.length ?? 1) <= 1 && (
          <Untertitel woerter={daten.tonspur.woerter} />
        )}

        {/*
          **Zu zweit stehen die Redespalten unter den Figuren — seit dem
          01.09.2026.**

          Der Absatz darueber gilt weiter: Ein Textblock unten in der Mitte war
          zu zweit falsch. Was fehlte, war nicht der Untertitel, sondern sein
          Ort. Der Befund am ersten Video mit Kulisse: „wenn die beiden
          sprechen, wirkt es im Bild leer."

          `Sprechblase.tsx` bleibt trotzdem stehen — sie ist die Fassung mit
          Namensschild und einer Zeile, und zurueckzudrehen ist eine Zeile
          Arbeit.
        */}
        {/*
          **Sie enden mit dem Vorhang.** Ohne diese Grenze stehen die letzten
          Zeilen auf dem geschlossenen Stoff weiter — im ersten Standbild des
          Abspanns lasen sie sich als zweite, blasse Schrift neben der Karte.
        */}
        {daten.tonspur?.abschnitte && daten.tonspur.abschnitte.length > 1 && (
          <Sequence durationInFrames={abspannAbBild} layout="none" name="Redespalten">
          <Redespalten
            woerter={daten.tonspur.woerter}
            abschnitte={daten.tonspur.abschnitte}
            szenenStartSek={daten.tonspur.szenenStartSek}
            /* `wer` gibt es nur an der Figurenbuehne; die Gegenueberstellung
               kennt keine zwei Sprecher und faellt auf die Vorgabe zurueck. */
            linksJeSzene={daten.szenen.map(linksIn)}
            szenenArt={daten.szenen.map((s) => s.art)}
          />
          </Sequence>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
    </Sprecherstand>
  );
};
