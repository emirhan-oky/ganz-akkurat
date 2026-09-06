import type { Short } from '../../src/typen';

/**
 * Es war einmal · Acht Zeichen, Ausrufezeichen vorn, Ziffer hinten.
 *
 * **Die alte Regel steht in jedem Kopf, und das BSI schreibt heute etwas
 * anderes.** „Einfache Ziffern am Ende des Passwortes anzuhängen oder eines der
 * üblichen Sonderzeichen … zu ergänzen, ist nicht empfehlenswert." Sicher ist
 * ein Passwort mit **20 bis 25 Zeichen und zwei Zeichenarten** — eine Folge von
 * Wörtern genügt.
 *
 * **Die Landung ist Wattis eigener Fall.** Er hat acht Zeichen und drei
 * Zeichenarten, und genau diese Kombination nennt das BSI nur zusammen mit
 * einem zweiten Faktor: „8 Zeichen lang ist, drei Zeichenarten genutzt werden
 * und es zusätzlich durch eine Mehr-Faktor-Authentisierung abgesichert ist."
 * Der Kipppunkt musste nicht erfunden werden, er stand in der Aufzählung.
 *
 * **Das „es war einmal" steht im Aufschlag und trägt keine Quelle**, wie in
 * `bildschirmschoner`: Dass die alte Regel einmal gelehrt wurde, behauptet
 * Watti, nicht der Kanal — deshalb „So haben wir das gelernt." Belegt ist
 * ausschließlich das „und heute".
 *
 * **Wattis Passwort hat drei Zeichenarten, und das musste nachgerechnet
 * werden.** Der erste Anlauf ließ ihn „groß, klein, Ziffer" sagen und im
 * Kaltstart zusätzlich ein Ausrufezeichen — das sind **vier** Arten, und damit
 * fiele er unter das zweite Beispiel des BSI und wäre sicher. Der ganze
 * Kipppunkt hätte ins Leere getroffen. Gefunden hat es der `dialogpruefer`,
 * nicht die Prüfung: **Eine Zahl im Dialog kann stimmen und trotzdem die
 * falsche sein.**
 *
 * **Der `belegpruefer` hat neun Stellen gefunden, und eine war struktureller
 * Natur.** Die drei Längenangaben stehen auf der BSI-Seite als Aufzählung
 * unter einem einleitenden Satz; das tragende „ist sicher" und die
 * Einschränkung „beispielsweise" liegen damit **außerhalb** jedes Fragments.
 * Das erste Beispiel ist deshalb mitsamt seiner Einleitung zitiert, die beiden
 * anderen tragen im Dialog nur noch die Erwähnung („stehen auch da"). **Eine
 * Aufzählung lässt sich nicht in Einzelteilen zitieren, ohne den Satz zu
 * verlieren, der sie zu einer Aussage macht.**
 *
 * **Zwei Passwort-Shorts im Vorrat sind Absicht, kein Versehen.**
 * `passwort-wechseln` handelt vom **Rhythmus** (wechseln nach Kalender),
 * dieser vom **Aufbau**. Beide sind `netz`, also fängt die Sachgebietsregel
 * sie ab, wenn eine Woche beide zieht.
 */
export const passwortSonderzeichen: Short = {
  id: 'passwort-sonderzeichen',
  themaId: 'passwortaufbau',
  format: 'eswareinmal',
  sachgebiet: 'netz',
  bauform: 'stationen',
  arbeitstitel: 'Wattis Ausrufezeichen rettet gar nichts',
  weitererzaehlt: 'nicht empfehlenswert',
  suchbegriff: 'Passwort sicher',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Mein Passwort ist sicher. Da ist ein Ausrufezeichen drin.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'zettel' },
  },
  vorspann: 'Wattis Ausrufezeichen und die acht Zeichen',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, wie sieht dein Passwort aus? Acht Zeichen: ein Wort, eine Ziffer, ein Ausrufezeichen. So haben wir das gelernt.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, wie sieht dein Passwort aus?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscheautoritaet',
          text: 'Acht Zeichen: ein Wort, eine Ziffer, ein Ausrufezeichen. So haben wir das gelernt.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-sichere-passwoerter',
      belegId: 'ziffern-am-ende-nicht-empfehlenswert',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Eine Ziffer hinten und ein Sonderzeichen vorn sind bei einem simplen Passwort nicht empfehlenswert. Was denn sonst?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Eine Ziffer hinten und ein Sonderzeichen vorn sind bei einem simplen Passwort nicht empfehlenswert.',
          quelleId: 'bsi-sichere-passwoerter',
          belegId: 'ziffern-am-ende-nicht-empfehlenswert',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Was denn sonst?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'erklaeren',
        gegenueber: { von: 'erklaeren', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-sichere-passwoerter',
      belegId: 'beispielsweise-zwanzig-bis-fuenfundzwanzig',
      sprechtext:
        'Sicher ist eins zum Beispiel mit 20 bis 25 Zeichen und zwei Zeichenarten. 25 Zeichen? Das tippe ich bis Weihnachten.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Sicher ist eins zum Beispiel mit 20 bis 25 Zeichen und zwei Zeichenarten.',
          quelleId: 'bsi-sichere-passwoerter',
          belegId: 'beispielsweise-zwanzig-bis-fuenfundzwanzig',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'katastrophe',
          text: '25 Zeichen? Das tippe ich bis Weihnachten.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-sichere-passwoerter',
      belegId: 'acht-bis-zwoelf-vier-zeichenarten',
      sprechtext:
        'Und wenn ich es kurz will? 8 bis 12 Zeichen mit vier Zeichenarten stehen auch da. Vier? Ich habe drei.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn ich es kurz will?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: '8 bis 12 Zeichen mit vier Zeichenarten stehen auch da.',
          quelleId: 'bsi-sichere-passwoerter',
          belegId: 'acht-bis-zwoelf-vier-zeichenarten',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'uebercompliance',
          text: 'Vier? Ich habe drei.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'nachdenken', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-sichere-passwoerter',
      belegId: 'acht-zeichen-drei-arten-mehrfaktor',
      sprechtext:
        'Acht mit drei Arten stehen da auch, du Pfosten. Zusammen mit Mehr-Faktor-Authentisierung. Und die habe ich nicht.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Acht mit drei Arten stehen da auch, du Pfosten. Zusammen mit Mehr-Faktor-Authentisierung.',
          quelleId: 'bsi-sichere-passwoerter',
          belegId: 'acht-zeichen-drei-arten-mehrfaktor',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'gestaendnis',
          text: 'Und die habe ich nicht.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'erklaeren',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Lang und schlicht steht neben kurz und kompliziert.',
      sprechtext:
        'Dann nehme ich eben vier Wörter. Du kennst keine vier Wörter. Doch. Passwort, Passwort, Passwort, Passwort.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'umdeutung',
          text: 'Dann nehme ich eben vier Wörter.',
        },
        {
          sprecher: 'nachleser',
          zug: 'widersprechen',
          machart: 'nebenbemerkung',
          text: 'Du kennst keine vier Wörter.',
        },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'falscherschluss',
          text: 'Doch. Passwort, Passwort, Passwort, Passwort.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'ansprechen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „sicher" schon die Pointe: Wattis Passwort ist genau das dritte Beispiel des BSI — und dem fehlt der zweite Faktor.',
    },
  ],

  quellenIds: ['bsi-sichere-passwoerter'],

  texte: {
    tiktok: {
      titel: 'Wattis Ausrufezeichen rettet gar nichts',
      beschreibung:
        'Passwort sicher: Warum die Ziffer am Ende nicht empfehlenswert ist — und welche drei Beispiele das BSI nennt.',
      hashtags: ['#passwort', '#technikwissen', '#sicherheit', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Ausrufezeichen rettet gar nichts',
      beschreibung:
        'Passwort sicher: Das BSI nennt drei Beispiele — lang mit zwei Zeichenarten, kurz mit vier, oder acht Zeichen mit zweitem Faktor.',
      hashtags: ['#passwort', '#technikwissen', '#datenschutz', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Wattis Passwort ist genau das dritte Beispiel',
      beschreibung:
        'Passwort sicher: Was das Bundesamt für Sicherheit in der Informationstechnik heute zu Länge und Zeichenarten schreibt.',
      hashtags: ['#passwort', '#sicherheit', '#technikwissen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
