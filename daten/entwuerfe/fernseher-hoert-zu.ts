import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · das Mikrofon im Fernseher.
 *
 * **Szenario 4: Watti kontert mit einer Erinnerung.** Volti hat zwoelf Zeilen
 * lang recht und verliert trotzdem — weil er den Fernseher selbst ausgesucht
 * hat. Der Konter ist keine Quelle, sondern etwas aus ihrer Wohnung; genau
 * dafuer gibt es seit dem 02.09.2026 den Zug `erinnern`.
 *
 * **Voltis Nachgeben ist widerwillig** (Befund 30): „Ja gut. Das war ich."
 * Kein sauberes Einsehen — das waere eine Figur, die eine Lektion lernt.
 *
 * **Und der Schluss ist gesellschaftskritisch, ohne dass jemand eine Haltung
 * vortraegt:** Die Loesung der beiden ist, im eigenen Wohnzimmer nichts mehr
 * zu sagen.
 */
export const fernseherHoertZu: Short = {
  id: 'fernseher-hoert-zu',
  themaId: 'fernseher-hoert-zu',
  format: 'absicht',
  sachgebiet: 'bildschirm',
  bauform: 'wechselrede',
  arbeitstitel: 'Wattis Fernseher hört zu gut zu',
  weitererzaehlt: 'an einen Cloud-Server',
  suchbegriff: 'Fernseher Mikrofon',
  kaltstart: {
    art: 'stolzerfehler',
    satz: 'Ich muss nicht mal mehr aufstehen, der Fernseher hört auf mich.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'fernseher' },
  },
  vorspann: 'Wattis Fernseher und das Mikrofon',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Redest du gerade mit dem Fernseher? Klar, der wird lauter, wenn ich es sage, und das spart mir den Weg.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Redest du gerade mit dem Fernseher?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Klar, der wird lauter, wenn ich es sage, und das spart mir den Weg.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'zeigen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-smarttv-sprachbefehle',
      belegId: 'diese-ko-nnen-sprachbefehle',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Und dir ist klar, dass der dabei zuhört? Soll er doch zuhören, ich sage ja nichts Verbotenes im Wohnzimmer. In der Fernbedienung sitzt ein Mikrofon, und das kann Sprachbefehle aufzeichnen.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und dir ist klar, dass der dabei zuhört?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscherschluss',
          text: 'Soll er doch zuhören, ich sage ja nichts Verbotenes im Wohnzimmer.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'In der Fernbedienung sitzt ein Mikrofon, und das kann Sprachbefehle aufzeichnen.',
          quelleId: 'bsi-smarttv-sprachbefehle',
          belegId: 'diese-ko-nnen-sprachbefehle',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-smarttv-sprachbefehle',
      belegId: 'an-einen-cloud-server',
      sprechtext:
        'Der schickt das Gesagte also auch noch weg? Die können dann an einen Cloud-Server weitergeleitet werden.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'rueckfrage',
          text: 'Der schickt das Gesagte also auch noch weg?',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die können dann an einen Cloud-Server weitergeleitet werden.',
          quelleId: 'bsi-smarttv-sprachbefehle',
          belegId: 'an-einen-cloud-server',
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
      /*
       * **Der Kipppunkt gehoert Watti.** Voltis Belegsatz steht noch davor,
       * damit die Szene eine Behauptung traegt; die Wendung ist die
       * Erinnerung danach — und die braucht keine Quelle, weil sie nichts
       * ueber die Welt sagt, sondern ueber die beiden.
       */
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-smarttv-sprachbefehle',
      belegId: 'ist-bereits-eine-webcam',
      sprechtext:
        'Und die Kamera? In manchen Fernsehern ist die schon mit Mikrofon eingebaut, du Idiot. Moment mal. Wer hat den Fernseher denn ausgesucht? Was hat das jetzt damit zu tun? Du hast dir wochenlang den Kopf zerbrochen, bevor du ihn gekauft hast.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und die Kamera?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'In manchen Fernsehern ist die schon mit Mikrofon eingebaut, du Idiot.',
          quelleId: 'bsi-smarttv-sprachbefehle',
          belegId: 'ist-bereits-eine-webcam',
        },
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'umdeutung',
          text: 'Moment mal. Wer hat den Fernseher denn ausgesucht?',
        },
        { sprecher: 'nachleser', zug: 'abbiegen', text: 'Was hat das jetzt damit zu tun?' },
        {
          sprecher: 'zeiger',
          zug: 'erinnern',
          text: 'Du hast dir wochenlang den Kopf zerbrochen, bevor du ihn gekauft hast.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'nachdenken', nach: 'ansprechen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'In manchen Fernsehern ist die Kamera schon eingebaut.',
      sprechtext: 'Ja gut. Das war ich. Und jetzt? Jetzt sagen wir beide nichts mehr im Wohnzimmer.',
      rede: [
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Ja gut. Das war ich.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und jetzt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'banaleaufloesung',
          text: 'Jetzt sagen wir beide nichts mehr im Wohnzimmer.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'ansprechen',
        gegenueber: { von: 'ansprechen', nach: 'achselzucken' },
      },
      rundlauf:
        'Beim zweiten Sehen hört man den ersten Satz als das, was er ist: Watti lobt ein Gerät, das Volti selbst ausgesucht hat.',
    },
  ],

  quellenIds: ['bsi-smarttv-sprachbefehle'],

  texte: {
    tiktok: {
      titel: 'Wattis Fernseher hört zu gut zu',
      beschreibung: 'Fernseher mit Mikrofon: Was mit deinen Sprachbefehlen passiert.',
      hashtags: ['#smarttv', '#fernseher', '#datenschutz', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Fernseher hört zu gut zu',
      beschreibung: 'Fernseher mit Mikrofon in der Fernbedienung. Und der Weg zum Server.',
      hashtags: ['#smarttv', '#fernseher', '#privatsphaere', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was der Fernseher mit Wattis Sprachbefehlen macht',
      beschreibung: 'Fernseher, Mikrofon und Cloud: Was das BSI zu Sprachsteuerung im Smart TV schreibt.',
      hashtags: ['#smarttv', '#bsi', '#datenschutz', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
