import type { Short } from '../../src/typen';

/**
 * Es war einmal · Die Firewall als Antwort auf alles.
 *
 * **Der dritte bewusst kurze Dialog** (siehe `inkognito-modus`).
 *
 * **Das Märchen steht im Aufschlag und nur dort** — Watti sagt den Satz, den
 * man ihm vor zwanzig Jahren beigebracht hat. Er behauptet nichts über die
 * Welt, er erzählt, was er gelernt hat; deshalb trägt der Aufschlag keine
 * Quelle.
 *
 * **Das „und heute" steht beim BSI in zwei Sätzen:** Ohne die richtige
 * Konfiguration schützt sie nicht optimal, und Angriffe nutzen jede Lücke
 * „wie auch in der Firewall selbst" aus. Das ist der Kipppunkt: Die Firewall
 * ist selbst ein Programm.
 *
 * **Der Nachschlag greift die zweite Firewall auf**, die kaum jemand kennt —
 * die im Router. Ein Satz, keine Handlung: Der Kanal verlangt nichts.
 */
export const firewallReicht: Short = {
  id: 'firewall-reicht',
  themaId: 'firewall-reicht',
  format: 'eswareinmal',
  sachgebiet: 'rechner',
  bauform: 'wechselrede',
  arbeitstitel: 'Wattis Firewall passt schon auf',
  weitererzaehlt: 'in der Firewall selbst',
  suchbegriff: 'Firewall Schutz',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Meine Firewall läuft. Da kommt keiner durch.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'schild' },
  },
  vorspann: 'Wattis Firewall und die Filterregeln',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Die Firewall ist an, ich bin durch. Wer sagt das, Watti? Das war schon immer so.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'behaupten',
          machart: 'falscheautoritaet',
          text: 'Die Firewall ist an, ich bin durch.',
        },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wer sagt das, Watti?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Das war schon immer so.' },
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
      quelleId: 'bsi-irrtuemer-internet',
      belegId: 'ohne-konfiguration-kein-schutz',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Ohne die richtige Konfiguration ist der Schutz nicht optimal, du Pfosten. Die konfiguriert sich doch selbst.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Ohne die richtige Konfiguration ist der Schutz nicht optimal, du Pfosten.',
          quelleId: 'bsi-irrtuemer-internet',
          belegId: 'ohne-konfiguration-kein-schutz',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'ratlosigkeit',
          text: 'Die konfiguriert sich doch selbst.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'erklaeren',
        gegenueber: { von: 'erklaeren', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-irrtuemer-internet',
      belegId: 'firewall-selbst-hat-luecken',
      sprechtext:
        'Angriffe nutzen jede Lücke aus, auch in der Firewall selbst. Die Firewall hat Lücken? Sie ist selbst ein Programm.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Angriffe nutzen jede Lücke aus, auch in der Firewall selbst.',
          quelleId: 'bsi-irrtuemer-internet',
          belegId: 'firewall-selbst-hat-luecken',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'falscherschluss', text: 'Die Firewall hat Lücken?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'nebenbemerkung',
          text: 'Sie ist selbst ein Programm.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-irrtuemer-internet',
      belegId: 'nur-notwendige-zugriffe',
      sprechtext:
        'Und was zählt dann? Die Filterregeln, damit nur unbedingt notwendige Zugriffe erlaubt sind. Und wer stellt die ein?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was zählt dann?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die Filterregeln, damit nur unbedingt notwendige Zugriffe erlaubt sind.',
          quelleId: 'bsi-irrtuemer-internet',
          belegId: 'nur-notwendige-zugriffe',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wer stellt die ein?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'zeigen', nach: 'ansprechen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Auch der Router hat eine.',
      sprechtext: 'Du. Nicht vergessen werden sollte auch die Firewall von Internet-Routern. Ich habe zwei davon?',
      rede: [
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Du.' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Nicht vergessen werden sollte auch die Firewall von Internet-Routern.',
          quelleId: 'bsi-irrtuemer-internet',
          belegId: 'firewall-von-internet-routern',
        },
        { sprecher: 'zeiger', zug: 'einlenken', machart: 'gestaendnis', text: 'Ich habe zwei davon?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'erklaeren',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „meine Firewall läuft" keine Antwort mehr, sondern eine Aussage darüber, dass sie eingeschaltet ist.',
    },
  ],

  quellenIds: ['bsi-irrtuemer-internet'],

  texte: {
    tiktok: {
      titel: 'Wattis Firewall passt schon auf',
      beschreibung: 'Firewall Schutz: Woran er wirklich hängt — und wo die zweite Firewall steht.',
      hashtags: ['#firewall', '#technikwissen', '#sicherheit', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Firewall passt schon auf',
      beschreibung: 'Firewall Schutz: „Ohne die richtige Konfiguration" schützt sie nicht optimal, schreibt das BSI.',
      hashtags: ['#firewall', '#technikwissen', '#computer', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Die Firewall ist selbst ein Programm',
      beschreibung: 'Firewall Schutz: Was das BSI zu Konfiguration, Filterregeln und dem Router schreibt.',
      hashtags: ['#firewall', '#sicherheit', '#technikwissen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
