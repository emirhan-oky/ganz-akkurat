import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · die Metadaten im Urlaubsfoto.
 *
 * **Szenario 5, zweite Bauart: Volti wird mit seiner eigenen Lektion
 * erledigt.** Er hat Watti erklaert, was in einem Foto steckt — und schickt
 * dann selbst eins mit Ort und Uhrzeit. **Der schaerfste Konter im Pool, und
 * er kostet keine zweite Quelle** (Befund 35).
 *
 * **Watti traegt hier den Beleg und die Zitatkarte**, weil der Dialog sagt,
 * woher er es weiss: „Du hast mir das doch selbst mal erklaert." Befund 27 —
 * die Quelle wandert mit der Vorgeschichte, nicht mit der Rolle.
 *
 * **Und der Schluss gehoert der Beziehung:** „Und ich sage niemandem, wo du
 * warst." Kein Rat an den Zuschauer, keine Zusammenfassung — was zu tun ist,
 * steht in der Beschreibung.
 */
export const urlaubsfoto: Short = {
  id: 'urlaubsfoto',
  themaId: 'urlaubsfoto',
  format: 'absicht',
  sachgebiet: 'handy',
  bauform: 'stationen',
  arbeitstitel: 'Voltis Foto weiß, wo er war',
  weitererzaehlt: 'ganz automatisch bei jedem Bild',
  suchbegriff: 'Metadaten Foto',
  kaltstart: {
    art: 'stolzerfehler',
    satz: 'Voltis Urlaubsfoto verrät mehr, als er denkt.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'lesen', requisite: 'lupe' },
  },
  vorspann: 'Voltis Foto und die Metadaten',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Volti, wo genau war das Foto von gestern? In den Bergen, warum fragst du?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Volti, wo genau war das Foto von gestern?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'In den Bergen, warum fragst du?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'lesen', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-metadaten-fotos',
      belegId: 'metadaten-automatisch-gespeichert',
      sprechtext:
        'Weil unten in den Details eine Uhrzeit steht und ein Ort. Das kann nicht sein, ich lösche das immer raus.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'behaupten',
          text: 'Weil unten in den Details eine Uhrzeit steht und ein Ort.',
          quelleId: 'bsi-metadaten-fotos',
          belegId: 'metadaten-automatisch-gespeichert',
        },
        { sprecher: 'nachleser', zug: 'widersprechen', text: 'Das kann nicht sein, ich lösche das immer raus.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'zeigen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'Löschen Sie mit entsprechenden Apps die Ortsangaben aus den Metadaten der Fotos',
      quelleId: 'bsi-metadaten-fotos',
      belegId: 'ortsangaben-loeschen',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Du hast mir das doch selbst mal erklärt. Datum, Gerät und Ort der Aufnahme, ganz automatisch bei jedem Bild.',
      rede: [
        { sprecher: 'zeiger', zug: 'erinnern', text: 'Du hast mir das doch selbst mal erklärt.' },
        {
          sprecher: 'zeiger',
          zug: 'nachlegen',
          text: 'Datum, Gerät und Ort der Aufnahme, ganz automatisch bei jedem Bild.',
          quelleId: 'bsi-metadaten-fotos',
          belegId: 'ortsangaben-loeschen',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-metadaten-fotos',
      belegId: 'cyberkriminelle-aufenthaltsort',
      sprechtext:
        'Ich weiß, was da drinsteht. Und dann findet einer raus, wo du bist oder dass du nicht zu Hause bist. Ja. Das habe ich dir gesagt.',
      rede: [
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Ich weiß, was da drinsteht.' },
        {
          sprecher: 'zeiger',
          zug: 'nachlegen',
          text: 'Und dann findet einer raus, wo du bist oder dass du nicht zu Hause bist.',
          quelleId: 'bsi-metadaten-fotos',
          belegId: 'cyberkriminelle-aufenthaltsort',
        },
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Ja. Das habe ich dir gesagt.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'erklaeren',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'nachdenken' },
      },
    },
    {
      /*
       * **Der Kipppunkt ist die Aufzaehlung**, und sie braucht keine Quelle:
       * Was auf Voltis Bild steht, ist eine Tatsache im erzaehlten Fall und
       * keine ueber die Welt. Der Beleg dafuer, **dass** so etwas draufsteht,
       * ist drei Szenen lang gelegt worden.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Und trotzdem steht auf deinem Bild das Hotel, der Tag und die Uhrzeit. Ich hatte es eilig, ja?',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'erinnern',
          text: 'Und trotzdem steht auf deinem Bild das Hotel, der Tag und die Uhrzeit.',
        },
        { sprecher: 'nachleser', zug: 'einlenken', machart: 'gestaendnis', text: 'Ich hatte es eilig, ja?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'ansprechen',
        nach: 'zeigen',
        gegenueber: { von: 'nachdenken', nach: 'achselzucken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Der Ort steht im Bild, auch wenn er nicht zu sehen ist.',
      sprechtext: 'Ich lösche es und schicke es dir nochmal richtig. Und ich sage niemandem, wo du warst.',
      rede: [
        { sprecher: 'nachleser', zug: 'einlenken', text: 'Ich lösche es und schicke es dir nochmal richtig.' },
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'widerhaken', text: 'Und ich sage niemandem, wo du warst.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'ruhe',
        gegenueber: { von: 'achselzucken', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist Wattis erste Frage keine Frage mehr – er weiß die Antwort schon und lässt Volti hineinlaufen.',
    },
  ],

  quellenIds: ['bsi-metadaten-fotos'],

  texte: {
    tiktok: {
      titel: 'Voltis Foto weiß, wo er war',
      beschreibung: 'Metadaten im Foto: Was dein Handy bei jeder Aufnahme mitspeichert.',
      hashtags: ['#metadaten', '#datenschutz', '#foto', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Voltis Foto weiß, wo er war',
      beschreibung: 'Metadaten im Foto verraten Ort und Uhrzeit. Ganz von allein.',
      hashtags: ['#metadaten', '#privatsphaere', '#foto', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was in Voltis Urlaubsfoto steht, ohne dass man es sieht',
      beschreibung: 'Metadaten im Foto: Was das BSI zu Ortsangaben in Bildern aus dem Smartphone schreibt.',
      hashtags: ['#metadaten', '#bsi', '#datenschutz', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
