import { useLayoutEffect, useRef, useState } from 'react';
import { AbsoluteFill, continueRender, delayRender, interpolate, useCurrentFrame } from 'remotion';
import { BUEHNE, SICHERE_ZONE } from '../../src/marke';

/**
 * Nutzflaeche innerhalb der sicheren Zone.
 *
 * Ausserhalb liegen die Bedienelemente von TikTok, Reels und Shorts — rechts
 * die Aktionsleiste, unten Beschreibung und Ton. Was hier nicht hineinpasst,
 * wird auf mindestens einer Plattform verdeckt. Deshalb rendert jede Szene
 * ausschliesslich in diesem Rahmen.
 *
 * Die Buehne traegt ausserdem die **Dauerbewegung**: eine sehr langsame
 * Vergroesserung ueber die gesamte Szenenlaenge. Ohne sie steht das Bild nach
 * dem Einblenden mehrere Sekunden voellig still, und genau das laesst einen
 * Short wie eine Diashow wirken. Die Bewegung ist zu langsam, um bewusst
 * aufzufallen, aber schnell genug, dass das Auge nicht abschaltet.
 *
 * ## Warum hier gemessen wird (15.08.2026)
 *
 * Bis heute stand hier `justifyContent: 'center'` und sonst nichts. Ein
 * zentrierter Flex-Container, dessen Inhalt hoeher ist als der Platz, laeuft
 * **symmetrisch nach beiden Seiten ueber** — und zwar ueber das Padding
 * hinaus, das die sichere Zone erst herstellt. Genau das war im Lauf
 * 2026-08-15 zu sehen: In der Endkarte lag die Karte ueber der Kopfzeile und
 * gleichzeitig ueber dem Untertitel, in einer Checkliste stand die
 * Ueberschrift ueber der Rubrik-Pille.
 *
 * Der Fehler sah aus wie ein Fehler der beiden Szenen und war keiner. Keine
 * der vierzehn Szenenarten begrenzt ihre Hoehe, weil keine es kann: Wie hoch
 * drei Punkte werden, haengt an ihrem Text. Die Buehne ist die einzige
 * Stelle, die den verfuegbaren Platz kennt.
 *
 * Deshalb zwei Sicherungen statt einer:
 *
 * 1. **`safe center`** — CSS zentriert weiter, faellt bei Ueberlauf aber auf
 *    `flex-start` zurueck. Damit kann nichts mehr nach **oben** in die
 *    Kopfzeile laufen, auch wenn die Messung einmal danebenliegt.
 * 2. **Messen und herunterskalieren** — passt der Inhalt nicht, wird er
 *    verkleinert, statt unten in den Untertitel zu laufen.
 *
 * Die Messung laeuft ueber `delayRender`, nicht ueber einen blossen Effect:
 * Sonst schoesse Remotion das Standbild, bevor die Skalierung steht, und der
 * erste Frame jeder Szene waere der ueberlaufende. Sie ist stabil, weil
 * `scrollHeight` die **unskalierte** Layouthoehe liefert — die Skalierung
 * veraendert also nicht, was sie misst, und es gibt keine Rueckkopplung.
 * Aus demselben Grund stoert die Einlaufanimation nicht: Sie arbeitet mit
 * `opacity` und `transform`, und beide aendern das Layout nicht.
 */
export const Buehne: React.FC<{
  /*
   * **Optional seit dem 01.09.2026.** Der grosse Satz ueber den Figuren ist
   * gestrichen; die schlichte Szene traegt nur noch `illustration`. Ohne Kind
   * bleibt der Inhaltsknoten leer, `minHeight: 100%` greift wie gehabt, und
   * die Zeichnung bekommt ueber `flex: 1` den ganzen Rahmen.
   */
  children?: React.ReactNode;
  ausrichtung?: 'oben' | 'mitte';
  /** Laenge der Szene in Bildern. Bestimmt das Tempo der Dauerbewegung. */
  dauerBilder?: number;
  /**
   * Zeichnung unterhalb des Textes.
   *
   * Der Grund, aus dem es diesen Platz gibt: Zwischen Text und Untertitel
   * blieb bisher ein Viertel der Bildhoehe ungenutzt — der Text stand mittig,
   * darunter kam lange nichts. Hier steht jetzt das Geraet, um das es geht.
   *
   * Bewusst **optional**. Ein Bild, das nur Platz fuellt, macht den Short
   * nicht besser: Bei „Die Garantie ist abgelaufen" gibt es nichts zu
   * zeichnen, und ein beliebiges Dock daneben waere Dekoration. Ohne
   * Illustration bleibt der Text mittig stehen wie zuvor.
   */
  illustration?: React.ReactNode;
  /**
   * Wo der geschriebene Inhalt im Rahmen sitzt — oben oder unten.
   *
   * Nur die Zitatkarte nutzt `'unten'`: Sie steht dort **unter** der
   * Standlinie, auf der Diele vor den Figuren, statt ihnen von oben den Platz
   * zu nehmen.
   */
  inhaltStand?: 'oben' | 'unten';
}> = ({ children, ausrichtung = 'mitte', dauerBilder, illustration, inhaltStand = 'oben' }) => {
  const frame = useCurrentFrame();

  /*
   * **Eine Hoehe, seit dem 04.09.2026.**
   *
   * Von 31.08. bis dahin waren es zwei: Ein Short mit Untertitel bekam unten
   * 270 Pixel weniger. Der Untertitel ist ausgebaut, und die Fallunterscheidung
   * wirkte zuletzt nur noch dort, wo keine Tonspur vorliegt — sie zeigte in der
   * Vorschau ein Bild, das es im fertigen Video nicht gibt.
   *
   * **Die Ueberlaufmessung darunter ist unveraendert.** Sie rechnet weiter
   * „Platz gegen Bedarf" mit denselben zwei Knoten und derselben Wache gegen
   * Null. Das ist die kleinstmoegliche Aenderung an einer Datei, deren
   * Kommentare drei gescheiterte Anlaeufe dieser Messung dokumentieren — einer
   * rechnete `passung = 0` und machte jede Szene leer.
   */
  const hoehe = BUEHNE.hoehe;

  const inhaltRef = useRef<HTMLDivElement>(null);
  const [passung, setPassung] = useState(1);
  const [gemessen, setGemessen] = useState(false);
  const [messung] = useState(() => delayRender('Bühne misst die Inhaltshöhe'));

  /*
   * Zwei Effekte, und das ist der Kern: Der erste misst und setzt die
   * Passung, der zweite gibt den Render **erst frei, wenn die neue Passung
   * im DOM steht**.
   *
   * Beim dritten Anlauf am 15.08.2026 stand `continueRender` direkt hinter
   * `setPassung` im selben Effekt. React verarbeitet ein `setState` aber
   * nicht sofort, also gab die Buehne den Render frei, bevor die Skalierung
   * angewandt war — und Remotion schoss exakt das ungeschrumpfte Bild. Die
   * Messung stimmte die ganze Zeit; nur sah sie nie jemand.
   */
  useLayoutEffect(() => {
    if (gemessen) return;
    const inhalt = inhaltRef.current;
    if (!inhalt) {
      setGemessen(true);
      return;
    }
    /*
     * Zwei Knoten, zwei klare Groessen: Der Rahmen hat den Platz
     * (`clientHeight`), der Inhalt braucht ihn (`offsetHeight`).
     *
     * Der Umweg ueber zwei Elemente ist der zweite Anlauf. Der erste mass
     * `scrollHeight` am Rahmen selbst — und `scrollHeight` meldet bei
     * `overflow: visible` nicht verlaesslich, was ueberlaeuft. Das Standbild
     * zeigte die Endkarte danach zwar an der richtigen Stelle, aber
     * ungeschrumpft und weiterhin unter dem Untertitel.
     *
     * `offsetHeight` ist dagegen die Layouthoehe des Inhalts und von der
     * Skalierung unberuehrt — die Messung veraendert also nicht, was sie
     * misst, und es gibt keine Rueckkopplung. Aus demselben Grund stoert die
     * Einlaufanimation nicht: Sie arbeitet mit `opacity` und `transform`, und
     * beide aendern das Layout nicht.
     *
     * Die Wache gegen `0` ist ebenfalls Erfahrung: Die allererste Fassung
     * rechnete ohne sie `passung = 0`, und **jede Szene war leer**. Ein
     * Layoutfehler, der Text verschiebt, ist unangenehm; einer, der ihn
     * verschwinden laesst, ist schlimmer als das Problem, das er loesen soll.
     */
    const vorhanden = hoehe;
    const gebraucht = inhalt.offsetHeight;
    if (gebraucht <= 0 || gebraucht <= vorhanden) {
      setGemessen(true);
      return;
    }
    /*
     * Untergrenze 0,7: Wer mehr schrumpfen muesste, hat nicht zu wenig Platz,
     * sondern zu viel Text. Das gehoert im Bild sichtbar zu bleiben statt in
     * unlesbarer Groesse zu verschwinden — kleiner als 0,7 faellt beim
     * Durchsehen auf, und genau das ist die Absicht.
     */
    setPassung(Math.max(0.7, vorhanden / gebraucht));
    setGemessen(true);
  }, [gemessen]);

  useLayoutEffect(() => {
    if (gemessen) continueRender(messung);
  }, [gemessen, messung]);

  /*
   * **Die Dauerbewegung ist am 31.08.2026 gestrichen.**
   *
   * Hier wuchs die Buehne ueber jede Szene um 4,5 %, „damit ein Short nicht
   * wie eine Diashow wirkt". Der Grund ist entfallen, seit zwei Figuren im Bild
   * stehen, die atmen, blinzeln und sich zuwenden — das Auge hat genug zu tun.
   *
   * **Was sie stattdessen angerichtet hat**, gemessen am ersten fertigen Video:
   *
   * - Die Zitatkarte liegt in diesem Container und sitzt an seinem oberen Rand.
   *   Sie wuchs also nicht nur mit, sie **driftete um 11 Pixel nach oben** und
   *   wurde dabei **in jedem Einzelbild neu subpixel-gerastert**. Das ist das
   *   Flimmern, das am Standbild unsichtbar ist und im Video sofort auffaellt.
   * - Sie multiplizierte sich mit der Kamerafahrt im SVG zu **+29,6 %**.
   * - Und sie sprang **an jedem Schnitt um 4,5 % zurueck**: Jede Szene ist eine
   *   eigene `Sequence`, `useCurrentFrame()` beginnt wieder bei 0.
   *
   * Der letzte Punkt ist der eigentliche Befund: Eine Bewegung, die am Ende
   * jeder Szene zurueckschnellt, ist keine Ruhe und keine Bewegung, sondern ein
   * Ruckeln im Takt der Schnitte.
   *
   * `dauerBilder` bleibt als Prop stehen — die Szenen geben sie ohnehin weiter,
   * und wer hier je wieder etwas ueber die Szenenlaenge animieren will, braucht
   * sie. Ein ungenutztes Feld ist billiger als eine Signaturaenderung an zehn
   * Aufrufstellen.
   */
  const zoom = 1;

  return (
    <AbsoluteFill
      style={{
        paddingTop: SICHERE_ZONE.oben,
        paddingBottom: SICHERE_ZONE.unten,
        paddingLeft: SICHERE_ZONE.links,
        paddingRight: SICHERE_ZONE.rechts,
        width: BUEHNE.breite + SICHERE_ZONE.links + SICHERE_ZONE.rechts,
        // Ohne border-box zaehlt das Padding zur Hoehe hinzu statt hinein,
        // und der Messrahmen darunter waere um die sichere Zone zu gross.
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Rahmen: hat den Platz — und zwar ausdruecklich `BUEHNE.hoehe`.
          Weder `flex: 1` noch `height: 100%` funktionierten hier: Beide
          ergaben eine `clientHeight` von 0, weil der AbsoluteFill darueber
          seine Hoehe aus `inset` bezieht und nicht aus einem Wert, den ein
          Kind erben koennte. Die Folge war sichtbar: Der Inhalt wurde zwar
          richtig verkleinert, aber um seine eigene Mitte statt um die der
          Buehne — die Karte sass danach zu tief und lag weiter unter dem
          Untertitel. Die Konstante ist ohnehin die Wahrheit ueber den
          verfuegbaren Platz; sie hier zu wiederholen ist keine Doppelung,
          sondern dieselbe Quelle. */}
      <div
        style={{
          height: hoehe,
          display: 'flex',
          flexDirection: 'column',
          /* Bezugsrahmen fuer die absolut stehende Zeichnung darunter. */
          position: 'relative',
          // Mit Illustration steht der Text oben und die Zeichnung fuellt den
          // Rest — sonst schoebe die Zentrierung beide in die Bildmitte und
          // liesse oben und unten je ein Loch.
          //
          // `safe` ist der Unterschied zu vorher: Bei Ueberlauf verhaelt sich
          // die Zentrierung wie `flex-start`, statt den Inhalt oben aus der
          // sicheren Zone zu schieben. Zweiter Guertel neben der Skalierung.
          justifyContent:
            inhaltStand === 'unten'
              ? 'flex-end'
              : illustration || ausrichtung === 'oben'
                ? 'flex-start'
                : 'safe center',
          alignItems: 'stretch',
        }}
      >
        {/*
          **Die Zeichnung steht absolut, und zwar in genau dieser Flaeche.**

          `inset: 0` an diesem Rahmen ist `BUEHNE.x/y/breite` und die
          Kastenhoehe — dieselben vier Zahlen, aus denen `standlinieImBild()`
          in `src/marke.ts` die Bodenkante der Kulisse rechnet. Deshalb stehen
          die Figuren auf dem gezeichneten Boden und nicht daneben: Es ist
          nicht dieselbe Rechnung zweimal, sondern dieselbe Flaeche.

          Sie liegt **hinter** dem geschriebenen Inhalt, weil der Stapel im
          Markup danach kommt. Eine Karte deckt damit die Figuren, statt von
          ihnen verdeckt zu werden — und genau deshalb steht die Zitatkarte
          seit dem 01.09.2026 unten (`inhaltStand`).
        */}
        {illustration && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>{illustration}</div>
        )}

        {/* Inhalt: braucht den Platz. Wird gemessen und notfalls skaliert.
            `flexShrink: 0`, damit Flexbox ihn nicht staucht — gestaucht waere
            `offsetHeight` nicht mehr die gewuenschte Hoehe, und die Messung
            haette nichts zu messen. */}
        <div
          ref={inhaltRef}
          style={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            /*
             * Nur mit Illustration: Der Inhalt fuellt den Rahmen, damit das
             * `flex: 1` der Zeichnung darunter etwas zu verteilen hat.
             *
             * **`minHeight` und nicht `height` — seit dem 31.08.2026.** Mit
             * `height: '100%'` ist `offsetHeight` per Definition genau die
             * Buehnenhoehe, egal wie viel der Inhalt wirklich braucht. Die
             * Messung oben verglich also eine Zahl mit sich selbst und kam
             * **nie** auf einen Ueberlauf: Bei einem Zitat von 172 Zeichen
             * nahm sich die Karte den ganzen Platz, die Figurenbuehne
             * darunter behielt null Hoehe, und im Bild waren die beiden
             * schlicht weg. Kein Ueberlauf, keine Warnung, kein Fehler —
             * genau die Sorte stiller Ausfall, gegen die die Bremse gebaut
             * wurde.
             *
             * Mit `minHeight` ist der Inhalt **mindestens** so hoch wie die
             * Buehne und darf darueber hinauswachsen. Erst dann hat die
             * Messung etwas zu messen.
             */
            /*
             * **Kein `minHeight: '100%'` mehr — seit dem 01.09.2026.**
             *
             * Es stand hier, weil die Zeichnung als letztes Kind im selben
             * Stapel lag und ueber `flex: 1` den Rest bekommen sollte. Genau
             * daran hingen zwei Fehler: Bei einem langen Zitat blieb den
             * Figuren nichts, und in jeder Szene bekamen sie eine andere
             * Groesse — je nachdem, wie viel Text darueber stand.
             *
             * Die Zeichnung steht jetzt **absolut** hinter dem Stapel, in
             * genau der Flaeche, aus der `standlinieImBild()` rechnet. Der
             * gemessene Stapel traegt nur noch Geschriebenes, und die
             * Ueberlaufbremse misst weiterhin, was sie immer gemessen hat.
             */
            transform: `scale(${zoom * passung})`,
            /*
             * Der Ankerpunkt haengt daran, ob geschrumpft wird.
             *
             * Passt der Inhalt, sitzt er zentriert, und die Dauerbewegung
             * soll symmetrisch aus der Mitte wachsen. Passt er nicht, hat
             * `safe center` ihn oben angesetzt — dann muss auch von oben
             * skaliert werden, sonst zieht die Verkleinerung ihn um seine
             * **eigene** Mitte zusammen statt um die der Buehne. Genau das
             * war im vorletzten Standbild zu sehen: Die Karte war richtig
             * verkleinert und sass trotzdem 100 Pixel zu tief, weiter unter
             * dem Untertitel.
             */
            transformOrigin: passung < 1 ? 'top center' : 'center center',
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
