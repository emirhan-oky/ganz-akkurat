import { FARBEN } from '../../src/marke';
import { Rig, type Form } from '../../src/figur';

/**
 * Der Nachleser — die Figur des Kanals. **Sie ist das Logo.**
 *
 * Ein Akku mit Armen, Beinen und Gesicht. Nicht eine Figur, die ein Logo
 * daneben traegt, sondern das Logozeichen selbst, das laufen und schauen kann.
 *
 * ## Warum das Logo und kein Mensch
 *
 * Die erste Fassung vom 20.08.2026 war eine Strichfigur mit Kopf, Hals und
 * Haaren. Sie funktionierte technisch und hatte einen Mangel, der schon im
 * Standbild notiert war: **Sie trug kein Merkmal, das sie zu diesem Kanal
 * gehoeren laesst.** Dieselbe Figur haette auf jedem anderen Kanal stehen
 * koennen.
 *
 * Der Akku loest drei Dinge auf einmal:
 *
 * - **Er steckt im Namen.** „Ganz akkurat" traegt den Akku vorn, und das
 *   Logozeichen ist bereits danach gebaut.
 * - **Jeder kennt ihn.** Er sitzt oben rechts auf jedem Display. Ein Symbol,
 *   das der Zuschauer taeglich sieht, braucht keine Einfuehrung.
 * - **Er stellt keine Fragen.** Eine Menschenfigur hat ein Alter, ein
 *   Geschlecht und ein Aussehen, ueber die jemand entscheiden muss und an
 *   denen sich Zuschauer stossen koennen. Ein Akku hat davon nichts.
 *
 * ## Kein Kopf, kein Hals
 *
 * Das Gesicht sitzt auf dem Gehaeuse. Das ist die uebliche Bauart fuer ein
 * Maskottchen aus einem Gegenstand, und sie kostet nur scheinbar Ausdruck:
 * Statt des Kopfes neigt sich der **ganze Koerper**, und das liest sich als
 * dieselbe Geste. Ein Akku mit einem Hals waere ein Akku mit einem Fehler.
 *
 * Die Gelenke `kopf` und `hals` sind deshalb weg. Die Posen drehen jetzt
 * `koerper`, wo sie vorher `kopf` drehten.
 *
 * ## Der Stil kommt aus dem Logozeichen
 *
 * Flaechig, ohne Kontur, `tinte` als Koerperfarbe und **genau ein blauer
 * Fleck**: die Ladung. Das ist unveraendert aus `Logozeichen` in
 * `video/bausteine/Wortmarke.tsx` uebernommen, samt Rundungen und
 * Groessenverhaeltnissen — Gehaeuse 68 breit zu 84 hoch, Pluspol 24 breit.
 *
 * Die Augen sind weiss auf dunklem Grund und brauchen deshalb keine Kontur.
 * Bei der Strichfigur war das umgekehrt, und der Unterschied ist kein
 * Geschmack: Eine Kontur auf dunkler Flaeche waere eine dritte Linie, die
 * nichts trennt.
 */

/** Gehaeuse, Arme, Beine — der flaechige Koerper aus dem Logozeichen. */
/* ─────────────────────────────── Die Pole ──────────────────────────────── */

/**
 * Ein Batteriepol oben auf dem Gehaeuse.
 *
 * **Seit dem 31.08.2026 die Stelle, an der sich die beiden Figuren
 * unterscheiden.** Vorher trennte sie allein die Farbe des Ladebalkens, und im
 * ersten Standbild zu zweit war das ein Farbfleck, der im Feed briefmarkengross
 * ist. Die Stauchung kam als zweites Merkmal dazu — und ist seit demselben Tag
 * keines mehr, weil beide gestaucht sind.
 *
 * Was bleibt, ist die **Oberkante**: eine Erhebung oder zwei. Das liest sich
 * auch klein, weil es die Silhouette veraendert und nicht die Flaeche.
 *
 * Die Pole tragen bewusst die **Gehaeusefarbe**. Ein hellerer Ton waere im Feed
 * deutlicher und wurde am 31.08.2026 verworfen: Er machte aus einem
 * Formunterschied wieder einen Farbunterschied, und davon hat die Figur schon
 * einen.
 */
const pol = (x: number, breite: number): Form => ({
  art: 'rechteck',
  x,
  y: 20,
  breite,
  hoehe: 12,
  radius: 4,
});

/**
 * Voltis Pol: einer, mittig — die Form, die der Kanal seit dem 24.08.2026
 * fuehrt und die auch im Logozeichen der Wortmarke steht.
 */
export const POL_EINZELN: Form[] = [pol(88, 24)];

/**
 * Wattis Pole: zwei nebeneinander, wie beim 9-Volt-Block.
 *
 * **Die Maszahlen gehen ohne Rest auf.** Das Gehaeuse steht bei x 66 bis 134,
 * ist also 68 breit. Zwei Pole zu je 22 bei x = 74 und x = 104 ergeben
 * 8 + 22 + 8 + 22 + 8 = 68: gleicher Rand aussen wie Luecke innen. Nichts
 * daran ist geschaetzt, und wer die Gehaeusebreite aendert, sieht sofort, dass
 * die Rechnung nicht mehr aufgeht.
 */
export const POL_DOPPELT: Form[] = [pol(74, 22), pol(104, 22)];

/**
 * Dasselbe Rig mit anderen Polen.
 *
 * **Abgeleitet und nicht abgeschrieben** — dieselbe Begruendung wie bei
 * `eingefaerbt` in `zeiger.ts`: Ein zweites Rig von Hand liefe beim ersten
 * Umbau am Koerper auseinander, und zwar lautlos, weil die Schemapruefung zwei
 * gueltige Rigs sieht und nicht zwei verschiedene.
 */
export const mitPolen = (rig: Rig, formen: Form[]): Rig => ({
  ...rig,
  teile: rig.teile.map((teil) => (teil.id === 'pole' ? { ...teil, formen } : teil)),
});

const KOERPER = { fuellung: FARBEN.tinte, strich: 'none', staerke: 0 } as const;

/** Gliedmassen als Striche mit runden Kappen, in derselben Farbe. */
const GLIED = { fuellung: 'none', strich: FARBEN.tinte, staerke: 7, kappe: 'round' } as const;

/**
 * Der Saum: dasselbe Glied, heller und breiter, eine Ebene darunter.
 *
 * Er loest das Problem, das das zweite Standbild vom 20.08.2026 gezeigt hat:
 * Arm und Gehaeuse haben **dieselbe Farbe**. Ein Arm vor dem Gehaeuse ist
 * damit nicht vor ihm, sondern weg — und weil das so ist, hat sich die
 * Lesepose vorher aussen herumgedrueckt und dabei eine Kerbe eingeschlossen.
 *
 * Drei Einheiten je Seite (13 gegen 7) reichen, um die Kante zu trennen. Er
 * sitzt in einem eigenen Ebenenband **unter** allen Gliedern, nicht
 * unmittelbar unter seinem eigenen: Laege jeder Saum direkt unter seinem
 * Glied, fraesse der Saum des Unterarms die Spitze des Oberarms weg, und die
 * Figur haette am Ellenbogen eine helle Naht.
 *
 * ## Die Farbe ist der Buehnengrund, nicht Weiss
 *
 * Hier stand bis zum 23.08.2026 `grundRein` mit der Begruendung, drei
 * Einheiten seien „schmal genug, dass der Saum vor dem Hintergrund nicht als
 * zweite Zeichnung auffaellt". Das erste Standbild eines echten Shorts hat das
 * widerlegt: Reinweiss auf `#F7F8FA` ist ein sichtbarer Rand, und in fuenf von
 * sechs Posen haengen die Arme **ausserhalb** der Silhouette — dort trennt der
 * Saum nichts und liegt nur als heller Halo im Bild.
 *
 * Mit `grund` verschwindet er genau dort, wo er nichts zu tun hat, und bleibt
 * voll sichtbar, wo er gebraucht wird: auf dem Gehaeuse in `#111820`. Die
 * Trennung kostet damit nichts mehr.
 *
 * Der Preis steht in `Figurenprobe`: Auf weissen Kacheln waere der Saum wieder
 * zu sehen. Die Kacheln stehen deshalb auf `grund` — eine Probe, die einen
 * anderen Hintergrund zeigt als das Produkt, prueft den falschen Fall.
 */
const SAUM = { fuellung: 'none', strich: FARBEN.grund, staerke: 13, kappe: 'round' } as const;

/**
 * Der Saum am Schulteransatz: stumpf abgeschnitten statt rund.
 *
 * Die runde Kappe war der naechste Fund im selben Standbild. Der Oberarm
 * beginnt bei x = 68, das Gehaeuse bei x = 66 — der Ansatz liegt also
 * **innen**. Eine runde Kappe von 6,5 Einheiten blueht von dort ins Gehaeuse
 * und hinterlaesst an jeder Schulter einen hellen Fleck, in jeder Pose.
 *
 * Der Saum des Oberarms faengt deshalb erst ausserhalb der Gehaeusekante an
 * und endet dort stumpf. Was er oben verliert, kostet nichts: Am Ansatz liegt
 * der Arm ohnehin im Umriss, und getrennt werden muss die Stelle, an der er
 * ihn **verlaesst**.
 */
const SAUM_STUMPF = { ...SAUM, kappe: 'butt' } as const;

/** Gesicht: hell auf dunkel, ohne Kontur. */
const GESICHT = { fuellung: FARBEN.grundRein, strich: 'none', staerke: 0 } as const;

/** Mund und Braue als heller Strich. */
const ZUG = { fuellung: 'none', strich: FARBEN.grundRein, staerke: 3, kappe: 'round' } as const;

export const nachleser = Rig.parse({
  id: 'nachleser',
  ansicht: 'vorn',

  teile: [
    /*
     * **Beide** Arme liegen vor dem Gehaeuse.
     *
     * Vorher lag der linke dahinter, und die Begruendung war, das sei in der
     * Vorderansicht die einzige Moeglichkeit, Tiefe zu zeigen. Das Standbild
     * vom 20.08.2026 hat sie widerlegt, und zwar zweimal:
     *
     * In fuenf der sechs Posen haengen beide Arme **ausserhalb** der
     * Silhouette. Dort ist die Ebene folgenlos — die Tiefe war also nicht
     * sichtbar, sondern nur aufgeschrieben. In der sechsten, `lesen`, greift
     * der Arm nach innen, und hinter dem Gehaeuse heisst das: unsichtbar.
     * Die Pose hat sich davor gedrueckt, indem sie den Arm ausserhalb
     * herumfuehrte, und dabei zwischen Oberarm, Unterarm und Gehaeusekante
     * ein Dreieck Hintergrund eingeschlossen. Im Bild war das keine Tiefe,
     * sondern eine Kerbe im Akku.
     *
     * Die Tiefe kommt jetzt aus zwei Dingen, die man sieht: dem Saum, der die
     * Kante trennt, und der Requisite auf Ebene 36 — vor dem Gehaeuse und
     * **hinter** den Haenden. Eine dunkle Hand, die die Blattkante ueberdeckt,
     * greift sie. Das ist eine Ueberlappung, die im Bild steht, und keine, die
     * man dem Code glauben muss.
     *
     * ## Die Ebenenbaender
     *
     * Nicht durchgezaehlt, sondern in Baendern mit Luecken. Beim ersten
     * Umbau lag der linke Arm auf 36 — und die Brauen auch. Eine
     * Ebenenkollision meldet niemand: Zwei Teile auf derselben Zahl zeichnen
     * in Quellreihenfolge, also genau in der Ordnung, deren Wegfall der Grund
     * fuer das Feld `ebene` war.
     *
     *   0–9    hinter dem Gehaeuse (Beine)
     *   10     Gehaeuse
     *   20–29  Gesicht
     *   30–35  Saeume der Glieder
     *   36     gehaltene Requisite
     *   40–42  linker Arm
     *   50–52  rechter Arm
     *
     * Die Requisite liegt zwischen Saum und Arm: vor dem Gehaeuse, hinter den
     * Haenden. Deshalb greift eine Hand ein Blatt, statt daneben zu liegen.
     */
    { id: 'saum_oberarm_links', ebene: 30, eltern: 'oberarm_links', stil: SAUM_STUMPF,
      formen: [{ art: 'pfad', d: 'M 63.2 67.6 L 56 76' }] },
    { id: 'saum_unterarm_links', ebene: 31, eltern: 'unterarm_links', stil: SAUM,
      formen: [{ art: 'pfad', d: 'M 56 76 L 56 96' }] },
    { id: 'saum_hand_links', ebene: 32, eltern: 'hand_links',
      stil: { fuellung: FARBEN.grund, strich: 'none', staerke: 0 },
      formen: [{ art: 'kreis', cx: 56, cy: 99, r: 8 }] },

    { id: 'oberarm_links', ebene: 40, eltern: 'koerper', stil: GLIED,
      formen: [{ art: 'pfad', d: 'M 68 62 L 56 76' }] },
    { id: 'unterarm_links', ebene: 41, eltern: 'oberarm_links', stil: GLIED,
      formen: [{ art: 'pfad', d: 'M 56 76 L 56 96' }] },
    { id: 'hand_links', ebene: 42, eltern: 'unterarm_links', stil: KOERPER,
      formen: [{ art: 'kreis', cx: 56, cy: 99, r: 5 }] },

    { id: 'bein_links', ebene: 7, eltern: 'koerper', stil: GLIED,
      formen: [{ art: 'pfad', d: 'M 88 112 L 87 136 L 79 139' }] },
    { id: 'bein_rechts', ebene: 8, eltern: 'koerper', stil: GLIED,
      formen: [{ art: 'pfad', d: 'M 112 112 L 113 136 L 121 139' }] },

    /*
     * **Die Pole sind seit dem 31.08.2026 ein eigenes Teil.**
     *
     * Vorher war der Pol die erste Form im `koerper`, mit der Begruendung: „ein
     * Teil, das sich nie eigenstaendig bewegt, ist kein Teil, sondern eine
     * Linie." Das Argument ist gefallen, weil die Pole jetzt **die**
     * Unterscheidung der beiden Figuren tragen: Volti hat zwei, Watti einen.
     * Ein eigenes Teil ist der Ort, an dem die beiden Rigs auseinandergehen
     * duerfen, ohne dass eines vom anderen abgeschrieben wird.
     *
     * `ebene: 9` liegt **unter** dem Gehaeuse (10). Die Pole ragen von y = 20
     * bis 32 und das Gehaeuse beginnt bei 30 — die zwei Einheiten Ueberlappung
     * deckt das Gehaeuse, genau wie vorher als erste Form derselben Liste.
     *
     * Kein eigenes Gelenk: Sie folgen dem Koerper ueber `eltern`, und ein
     * wackelnder Pol waere ein loser Pol.
     */
    { id: 'pole', ebene: 9, eltern: 'koerper', stil: KOERPER, formen: POL_EINZELN },

    /*
     * Das Gehaeuse ist das Wurzelteil und traegt alles. Sein Gelenk sitzt
     * unten in Fusshoehe: Wenn die Figur sich neigt, kippt sie um ihren
     * Stand und nicht um ihre Mitte — sonst wandern die Fuesse mit, und sie
     * schwebt.
     *
     * Die Ladung bleibt eine Form desselben Teils. Sie bewegt sich nie
     * eigenstaendig und unterscheidet die Figuren nur ueber ihre Farbe.
     */
    { id: 'koerper', ebene: 10, stil: KOERPER,
      formen: [
        { art: 'rechteck', x: 66, y: 30, breite: 68, hoehe: 84, radius: 14 },
        /* Der einzige blaue Fleck. Er sitzt unten im Gehaeuse wie im
           Logozeichen — nicht mittig: Eine Ladung, die in der Mitte steht,
           liest sich als Fenster und nicht als Fuellstand. */
        { art: 'rechteck', x: 78, y: 86, breite: 44, hoehe: 22, radius: 7,
          /*
           * **Der Ladebalken traegt die Kennfarbe der Figur.** Beim
           * `nachleser` ist das der Akzent, beim `zeiger` das Rot — und weil
           * beide sonst identisch sind, ist dieser Balken das Einzige, was sie
           * unterscheidet.
           *
           * Am 24.08.2026 stand hier einen Tag lang `FARBEN.grund`, waehrend
           * der Koerper hell war. Das ging mit dem dunklen Hintergrund wieder.
           */
          stil: { fuellung: FARBEN.anzeigeEins, strich: 'none', staerke: 0 } },
      ] },

    { id: 'auge_links', ebene: 21, eltern: 'koerper', stil: GESICHT,
      formen: [{ art: 'kreis', cx: 86, cy: 56, r: 8.5 }] },
    { id: 'auge_rechts', ebene: 21, eltern: 'koerper', stil: GESICHT,
      formen: [{ art: 'kreis', cx: 114, cy: 56, r: 8.5 }] },

    /*
     * Pupillen als eigene Teile, damit der Blick sich aendern kann, ohne dass
     * sich der Koerper dreht. Bei einer Figur ohne Kopf ist das der einzige
     * Weg, ueberhaupt irgendwohin zu schauen — und damit wichtiger als vorher.
     */
    { id: 'pupille_links', ebene: 22, eltern: 'auge_links',
      stil: { fuellung: FARBEN.tinte, strich: 'none', staerke: 0 },
      formen: [{ art: 'kreis', cx: 86, cy: 56, r: 4 }] },
    { id: 'pupille_rechts', ebene: 22, eltern: 'auge_rechts',
      stil: { fuellung: FARBEN.tinte, strich: 'none', staerke: 0 },
      formen: [{ art: 'kreis', cx: 114, cy: 56, r: 4 }] },

    { id: 'braue_links', ebene: 23, eltern: 'koerper', stil: ZUG,
      formen: [{ art: 'pfad', d: 'M 78 42 L 92 40' }] },
    { id: 'braue_rechts', ebene: 23, eltern: 'koerper', stil: ZUG,
      formen: [{ art: 'pfad', d: 'M 108 40 L 122 42' }] },

    { id: 'mund_strich', ebene: 20, eltern: 'koerper', stil: ZUG,
      formen: [{ art: 'pfad', d: 'M 93 74 L 107 74' }] },
    { id: 'mund_offen', ebene: 20, eltern: 'koerper', stil: GESICHT,
      formen: [{ art: 'ellipse', cx: 100, cy: 75, rx: 6, ry: 5.5 }] },
    { id: 'mund_schmal', ebene: 20, eltern: 'koerper', stil: ZUG,
      formen: [{ art: 'pfad', d: 'M 93 73 Q 100 79 107 73' }] },
    { id: 'mund_zug', ebene: 20, eltern: 'koerper', stil: ZUG,
      formen: [{ art: 'pfad', d: 'M 93 77 Q 100 71 107 77' }] },
    /*
     * Das deutliche Laecheln. `mund_schmal` ist derselbe Bogen mit 6
     * Einheiten Tiefe — im fertigen Video war er bei Bildschirmgroesse nicht
     * als Laecheln zu erkennen, sondern als gerader Strich. Hier sind es 9
     * Einheiten auf 18 Breite statt 14, also ein Mund, der auch klein noch
     * eine Form hat.
     */
    { id: 'mund_laecheln', ebene: 20, eltern: 'koerper', stil: ZUG,
      formen: [{ art: 'pfad', d: 'M 91 71 Q 100 80 109 71' }] },

    /*
     * **Zwei Oeffnungsgrade, seit dem 31.08.2026.**
     *
     * Fuer den Lippensync reicht ein einzelnes `offen` nicht: Ein Mund, der
     * zwischen zu und immer derselben Ellipse springt, klappert. Mit `spalt`
     * und `weit` daneben gibt es drei Stufen, und das ist fuer eine flache
     * Vektorfigur das ganze Vokabular — mehr braeuchte Formen je Laut, und die
     * hat dieser Stil nicht.
     *
     * Gewaehlt wird ueber den Vokal: offene Vokale weit, geschlossene schmal.
     * Siehe `lippensync` in `Buehnenbild.tsx`.
     */
    { id: 'mund_spalt', ebene: 20, eltern: 'koerper', stil: GESICHT,
      formen: [{ art: 'ellipse', cx: 100, cy: 75, rx: 5, ry: 2.6 }] },
    { id: 'mund_weit', ebene: 20, eltern: 'koerper', stil: GESICHT,
      formen: [{ art: 'ellipse', cx: 100, cy: 76, rx: 7.5, ry: 8.5 }] },

    { id: 'saum_oberarm_rechts', ebene: 33, eltern: 'oberarm_rechts', stil: SAUM_STUMPF,
      formen: [{ art: 'pfad', d: 'M 136.8 67.6 L 144 76' }] },
    { id: 'saum_unterarm_rechts', ebene: 34, eltern: 'unterarm_rechts', stil: SAUM,
      formen: [{ art: 'pfad', d: 'M 144 76 L 144 96' }] },
    { id: 'saum_hand_rechts', ebene: 35, eltern: 'hand_rechts',
      stil: { fuellung: FARBEN.grund, strich: 'none', staerke: 0 },
      formen: [{ art: 'kreis', cx: 144, cy: 99, r: 8 }] },

    { id: 'oberarm_rechts', ebene: 50, eltern: 'koerper', stil: GLIED,
      formen: [{ art: 'pfad', d: 'M 132 62 L 144 76' }] },
    { id: 'unterarm_rechts', ebene: 51, eltern: 'oberarm_rechts', stil: GLIED,
      formen: [{ art: 'pfad', d: 'M 144 76 L 144 96' }] },
    { id: 'hand_rechts', ebene: 52, eltern: 'unterarm_rechts', stil: KOERPER,
      formen: [{ art: 'kreis', cx: 144, cy: 99, r: 5 }] },
  ],

  gelenke: {
    /*
     * Der Koerper uebernimmt, was vorher Kopf und Hals taten. Die Grenze ist
     * deshalb enger als die alte Kopfgrenze von 14 Grad: Ein geneigter Kopf
     * ist eine Geste, ein um vierzehn Grad gekippter Akku ist ein umfallender
     * Akku.
     */
    koerper: { pivot: [100, 138], drehung: [-9, 9] },

    /*
     * Die Vorzeichen sind gemessen, nicht gedacht. In SVG dreht ein positiver
     * Winkel visuell im Uhrzeigersinn, weil y nach unten laeuft — ein
     * haengender rechter Unterarm klappt also mit **positivem** Winkel vor den
     * Koerper. In der ersten Fassung standen die Grenzen andersherum, und die
     * Lesepose streckte beide Arme waagerecht zur Seite.
     */
    /*
     * ## Die Unterarmgrenzen sind am 31.08.2026 geweitet worden
     *
     * Sie standen auf ±15 in der Ueberstreckungsrichtung — die Grenze eines
     * echten Ellenbogens. **Drei Posen rissen sie seit Wochen**, und
     * `winkelKlemmen` schnitt stumm ab: `achselzucken` wollte ±40 und bekam
     * ±15, `winken` wollte −28 und bekam −15. Wer eine Pose am Standbild
     * justiert, dreht die Zahl weiter und sieht nichts.
     *
     * **Diese Figur hat keinen Ellenbogen.** Sie hat ein Gelenk in der Mitte
     * eines Strichs, und was dort „Ueberstreckung" heisst, ist eine
     * Designentscheidung und keine Anatomie. ±60 gibt den Posen ihre
     * geschriebenen Werte zurueck und laesst einer ueberschwingenden Feder
     * Platz — ein Ueberschwinger, der in die Grenze laeuft, wird dort flach
     * und sieht aus wie ein Ruckeln.
     *
     * Die Oberarme ebenso: `winken` steht auf −92, und bei cartoonhafter
     * Feder schwingt der Uebergang aus `lesen` bis −116 durch.
     *
     * `posenPruefen` meldet seit demselben Tag jeden Winkel ausserhalb der
     * Grenzen. Die Wache kam nach dem Fehler und nicht davor — aber sie kam.
     */
    oberarm_links: { pivot: [68, 62], drehung: [-75, 120] },
    unterarm_links: { pivot: [56, 76], drehung: [-130, 60] },
    oberarm_rechts: { pivot: [132, 62], drehung: [-120, 75] },
    unterarm_rechts: { pivot: [144, 76], drehung: [-60, 130] },

    /*
     * **Die Beine sind seit dem 31.08.2026 keine toten Gelenke mehr.**
     * ±12 standen hier von Anfang an und wurden in **keiner** der zehn Posen
     * benutzt. Gewichtsverlagerung und Standbein/Spielbein sind der
     * billigste Weg, aus einer stehenden Figur eine wartende zu machen.
     */
    bein_links: { pivot: [88, 112], drehung: [-12, 12] },
    bein_rechts: { pivot: [112, 112], drehung: [-12, 12] },

    /*
     * **Die Brauen bekommen Gelenke, seit dem 31.08.2026.**
     *
     * Sie sind die ausdrucksstaerkste Stelle eines Cartoon-Gesichts und waren
     * bis dahin unbeweglich: Teile ohne Gelenk, fest am Gehaeuse. Der Pivot
     * sitzt am **inneren** Ende, damit eine Drehung das aeussere hebt oder
     * senkt — die schraege Braue ist der klassische Zweifel, und eine hoch
     * plus eine tief ist die Verwirrung, fuer die es Watti gibt.
     *
     * Additiv: Keine bestehende Pose nennt diese Gelenke, also aendert sich
     * kein einziges heutiges Bild. Die Stauchung bleibt ungenutzt — eine
     * gestauchte Braue ist ein duennerer Strich und keine Geste.
     */
    braue_links: { pivot: [92, 40], drehung: [-22, 22] },
    braue_rechts: { pivot: [108, 40], drehung: [-22, 22] },

    /*
     * Die Augen drehen nicht — ihre Gelenke stehen nur da, damit die
     * Stauchung beim Blinzeln einen Pivot hat. Ein Auge, das um seinen
     * Unterrand zublinzelt, sieht aus wie ein Zwinkern von unten; um die
     * Mitte gestaucht sieht es aus wie ein Lid.
     */
    auge_links: { pivot: [86, 56], drehung: [0, 0] },
    auge_rechts: { pivot: [114, 56], drehung: [0, 0] },
  },

  griffe: {
    hand_rechts: [144, 99],
    hand_links: [56, 99],
    neben_rechts: [172, 112],
    neben_links: [28, 112],
    ueber_kopf: [100, 12],
  },
});
