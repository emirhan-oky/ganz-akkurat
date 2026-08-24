import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · die gelben Punkte.
 *
 * Lief bis zum 20.08.2026 unter `heimlich` („Das macht dein Geraet heimlich",
 * Freitag). Das Format ist in `absicht` aufgegangen, das Thema ist dasselbe
 * geblieben — und es ist der Musterfall dafuer, warum die Zusammenlegung
 * traegt: Ob der Drucker so **gebaut** wurde oder es im **Betrieb tut**,
 * aendert an der Reaktion des Zuschauers nichts.
 *
 * Die Hausregel des Formats ist erfuellt, und zwar in ihrer schaerfsten
 * Form: Beide Haelften stehen woertlich beim BSI — dass die Kennung den
 * Ausdruck einem Geraet zuordnet, und dass sie **nicht dokumentiert und nicht
 * abschaltbar** ist. Der zweite Halbsatz ist der Kipppunkt und muesste sonst
 * behauptet werden.
 *
 * Die Quelle ist ein PDF mit komprimierten Textstroemen. Sie steht deshalb
 * auf `abrufart: manuell` — am 17.08.2026 von Hand entpackt und gelesen, eine
 * Zeichenkettensuche findet dort nichts.
 */
export const druckerKennung: Short = {
  id: 'drucker-kennung',
  themaId: 'drucker-gelbe-punkte',
  format: 'absicht',
  sachgebiet: 'drucken',
  arbeitstitel: 'Jeder Ausdruck trägt die Nummer des Druckers',
  weitererzaehlt: 'Nicht dokumentiert. Und abschalten kannst du es nicht.',
  suchbegriff: 'Drucker Wasserzeichen',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Drucker unterschreibt jede Seite.',
      text: 'Dein Drucker unterschreibt.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'drucker' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Beim Bundesamt für Sicherheit in der Informationstechnik heißt das Wasserzeichen.',
      text: 'Beim BSI heißt das Wasserzeichen.',
      buehne: { art: 'figur', von: 'stutzen', nach: 'lesen', requisite: 'blatt' },
      quelleId: 'bsi-yellow-dots',
      belegId: 'wasserzeichen-mit-denen-ein',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Ein Ausdruck kann einem konkreten Drucker zugeordnet werden. Deinem.',
      text: 'Zugeordnet. Deinem Gerät.',
      buehne: { art: 'figur', von: 'lesen', nach: 'zeigen', requisite: 'karteikarte' },
      hervorhebung: 'zugeordnet',
      quelleId: 'bsi-yellow-dots',
      belegId: 'wasserzeichen-mit-denen-ein',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Nicht dokumentiert. Und abschalten kannst du es nicht.',
      text: 'Nicht dokumentiert. Nicht abschaltbar.',
      buehne: { art: 'figur', von: 'zeigen', nach: 'hochschauen', requisite: 'kreuz', stand: 'klein' },
      quelleId: 'bsi-yellow-dots',
      belegId: 'diese-funktion-ist-oft',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Oft nicht einmal vom Hersteller dokumentiert.',
      text: 'Nicht einmal vom Hersteller.',
      buehne: {
        art: 'gegenueber',
        oben: { etikett: 'DU', symbol: 'menschen' },
        unten: { etikett: 'DER HERSTELLER', symbol: 'fabrik' },
      },
      quelleId: 'bsi-yellow-dots',
      belegId: 'diese-funktion-ist-oft',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Gelb auf weiß. Sieht ja keiner.',
      satz: 'Gelb auf weiß. Sieht ja keiner.',
      rundlauf:
        '„Gelb auf weiß. Sieht ja keiner." trifft auf „Dein Drucker unterschreibt jede Seite." — man weiß jetzt, womit, und sucht es.',
    },
  ],

  quellenIds: ['bsi-yellow-dots'],

  texte: {
    tiktok: {
      titel: 'Ein Wasserzeichen, das niemand dokumentiert',
      beschreibung: 'Drucker-Wasserzeichen: gelbe Punkte auf jeder Seite, die niemand abschalten kann.',
      hashtags: ['#druckerpunkte', '#wasserzeichen', '#gelbepunkte', '#datenschutz', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Ein Wasserzeichen, das niemand dokumentiert',
      beschreibung: 'Drucker und Wasserzeichen: das BSI beschreibt, was auf jeder Seite mitgedruckt wird.',
      hashtags: ['#drucker', '#datenschutz', '#ueberwachung', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Ein Wasserzeichen, das niemand dokumentiert',
      beschreibung: 'Drucker-Wasserzeichen: die Kennung, die auf jedem Ausdruck steht.',
      hashtags: ['#drucker', '#wasserzeichen', '#datenschutz', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
