import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · die fünf Jahre, die für Wattis Handy nicht gelten.
 *
 * **Szenario 3, zweites Beispiel: Watti weiss etwas und schliesst falsch.**
 * Er weiss, dass es jetzt fuenf Jahre Updates gibt, und schliesst daraus, dass
 * sein Geraet versorgt ist. Volti kontert mit dem Satz danach — dem Stichtag.
 *
 * **Der erste Anlauf hatte den harmlosen Fehlschluss.** Dort irrte Watti sich
 * zu seinen Gunsten: Die Frist laeuft ab Verkaufsende, also laenger als
 * gedacht. Beim Nachlesen von Artikel 10 stand aber „Sie gilt ab dem 20. Juni
 * 2025" — sein Handy von 2023 faellt gar nicht darunter. **Dieselbe Falle wie
 * beim Ersatzteil-Short mit der Uebergangsregel**, nur andersherum: Nicht zu
 * viel behauptet, sondern das Falsche.
 *
 * **Zwei Zeilen bleiben absichtlich eng am Zitat.** „Diese Regel gilt dafür
 * nicht" und „Nach dieser Verordnung schuldet er deinem nichts" — dass es fuer
 * aeltere Geraete *ueberhaupt* keine Pflicht gab, sagt diese Verordnung nicht,
 * und ohne eine zweite Quelle darf Volti es nicht sagen.
 *
 * **Befund 49 steckt in Wattis zweiter Zeile.** Dort stand „Fünf Jahre gibt es
 * jetzt" — *„5 Jahre gibt es was?"* Dass „Sicherheitsupdates" zwei Zeilen
 * vorher im Kaltstart stand, hilft der Zeile nicht; sie steht hinter dem
 * Vorhang und muss allein tragen.
 */
export const updatefristStichtag: Short = {
  id: 'updatefrist-stichtag',
  themaId: 'fuenf-jahre-updates',
  format: 'absicht',
  sachgebiet: 'handy',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti rechnet sich zwei Jahre schön',
  weitererzaehlt: 'ab dem Tag, an dem das Modell aus dem Verkauf geht',
  suchbegriff: 'Sicherheitsupdates Handy',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Mein Handy hält noch ewig, das kriegt ja noch Sicherheitsupdates.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'kalender' },
  },
  vorspann: 'Watti rechnet sich zwei Jahre schön',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, seit wann hast du das? Drei Jahre. Fünf Jahre Sicherheitsupdates gibt es jetzt, also hab ich noch zwei.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, seit wann hast du das?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscherschluss',
          text: 'Drei Jahre. Fünf Jahre Sicherheitsupdates gibt es jetzt, also hab ich noch zwei.',
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
      quelleId: 'eu-oekodesign-handys',
      belegId: 'gilt-ab-zwanzigstem-juni',
      herausgeber: 'Europäische Kommission',
      sprechtext: 'Nein. Die Regel gilt erst seit Juni 2025. Und meins?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Nein. Die Regel gilt erst seit Juni 2025.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'gilt-ab-zwanzigstem-juni',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Und meins?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'erklaeren',
        nach: 'stutzen',
        gegenueber: { von: 'stutzen', nach: 'zeigen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'Sie gilt ab dem 20. Juni 2025.',
      quelleId: 'eu-oekodesign-handys',
      belegId: 'gilt-ab-zwanzigstem-juni',
      sprechtext:
        'Deins stand vorher im Laden. Diese Regel gilt dafür nicht. Also kann der Hersteller bei meinem einfach aufhören? Nach dieser Verordnung schuldet er deinem nichts.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Deins stand vorher im Laden. Diese Regel gilt dafür nicht.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'gilt-ab-zwanzigstem-juni',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          text: 'Also kann der Hersteller bei meinem einfach aufhören?',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Nach dieser Verordnung schuldet er deinem nichts.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'gilt-ab-zwanzigstem-juni',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'staunen',
        gegenueber: { von: 'zeigen', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'eu-oekodesign-handys',
      belegId: 'fuenf-jahre-aktualisierungen',
      sprechtext:
        'Und bei neuen? Fünf Jahre, ab dem Tag, an dem das Modell aus dem Verkauf geht. Ab Verkaufsende? Nicht ab Kauf? Ab Verkaufsende.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und bei neuen?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Fünf Jahre, ab dem Tag, an dem das Modell aus dem Verkauf geht.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'fuenf-jahre-aktualisierungen',
          /* Der Ankerpunkt „Ab dem Datum der Beendigung des Inverkehrbringens"
           * stand bis zum 03.09.2026 unmittelbar VOR der geprueften
           * Zeichenkette. Der Belegpruefer hat ihn als fehlend gemeldet: Das
           * Zitat allein sagte nur „fuenf Jahre" und „kostenlos", nicht
           * wovon ab. Es ist seitdem um ihn erweitert. */
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Ab Verkaufsende? Nicht ab Kauf?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ab Verkaufsende.',
          quelleId: 'eu-oekodesign-handys',
          belegId: 'fuenf-jahre-aktualisierungen',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'erklaeren' },
      },
    },
    {
      /*
       * **Befund 50: Die Beschimpfung fehlt, wenn sie fehlt.**
       *
       * „Dann kriegst du fünf Jahre auf ein Handy, das keiner mehr will."
       * stand ohne sie da. Emirhans Einwand: *„Beschimpfung fehlt mir."* Sie
       * klebt hinten an, ohne Komma davor — so steht sie in allen neun seiner
       * eigenen Dialoge, etwa jede dreizehnte Zeile.
       */
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Die Frist beginnt, wenn das Modell aus dem Verkauf geht.',
      sprechtext:
        'Dann kaufe ich das nächste erst, wenn es keiner mehr will. Dann kriegst du fünf Jahre auf ein Handy, das keiner mehr will, du Idiot. Klingt nach mir.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'uebercompliance',
          text: 'Dann kaufe ich das nächste erst, wenn es keiner mehr will.',
        },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'parallelbau',
          text: 'Dann kriegst du fünf Jahre auf ein Handy, das keiner mehr will, du Idiot.',
        },
        { sprecher: 'zeiger', zug: 'einlenken', text: 'Klingt nach mir.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'achselzucken',
        gegenueber: { von: 'erklaeren', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen hört man Wattis „das kriegt ja noch Sicherheitsupdates" als das, was es ist: eine Annahme, die nie geprüft wurde.',
    },
  ],

  quellenIds: ['eu-oekodesign-handys'],

  texte: {
    tiktok: {
      titel: 'Watti rechnet sich zwei Jahre schön',
      beschreibung: 'Sicherheitsupdates fürs Handy: Ab wann die fünf Jahre wirklich laufen.',
      hashtags: ['#sicherheitsupdates', '#handy', '#android', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti rechnet sich zwei Jahre schön',
      beschreibung: 'Sicherheitsupdates fürs Handy: Die Frist beginnt am Verkaufsende, nicht am Kauftag.',
      hashtags: ['#sicherheitsupdates', '#handy', '#smartphone', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Ab wann die fünf Jahre wirklich laufen',
      beschreibung: 'Sicherheitsupdates fürs Handy: Was die Ökodesign-Verordnung über Frist und Stichtag schreibt.',
      hashtags: ['#sicherheitsupdates', '#handy', '#oekodesign', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
