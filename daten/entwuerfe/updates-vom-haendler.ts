import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · Updates schuldet der Händler, mindestens zwei Jahre.
 *
 * **Szenario 2, viertes Beispiel: Watti fragt um Rat.** Volti antwortet **und
 * raet** — der Rat ist, sich an den Vertragspartner zu wenden, und er kippt in
 * der letzten Zeile: Watti hat die Updates, die es gab, nie installiert.
 *
 * **Der erste Anlauf stand auf der falschen Norm, und der Belegpruefer hat es
 * vor dem Eintragen gefunden.** Er stuetzte sich auf § 327f BGB — und
 * § 327a Absatz 3 nimmt „Kaufvertraege ueber Waren, die … ihre Funktionen ohne
 * diese digitalen Produkte nicht erfuellen koennen" ausdruecklich aus. Eine
 * Smartwatch ist genau so eine Ware. **Der Short behauptete nicht zu viel,
 * sondern stuetzte eine richtige Aussage auf den Paragrafen, der den Fall
 * ausnimmt** — derselbe Bau wie beim Ersatzteil-Short am 01.09.2026, und
 * `quellen-pruefen` war dabei gruen.
 *
 * **Die richtige Norm ist die bessere.** §§ 475b und 475c stehen im
 * Verbrauchsgueterkauf, der Unternehmer ist dort wirklich der Verkaeufer — und
 * § 475c Absatz 2 nennt eine Zahl, die § 327f nicht hat: **mindestens zwei
 * Jahre ab Ablieferung**, wenn die digitalen Elemente dauerhaft bereitgestellt
 * werden.
 *
 * **Der Widerhaken ist bedingt, nicht absolut.** Absatz 5 nimmt dem
 * Unternehmer die Haftung nur fuer den einen Mangel, nur nach Ablauf einer
 * angemessenen Frist und nur, wenn er informiert hat. „Sonst haftet keiner"
 * waere daraus ein allgemeiner Rechtsverlust geworden.
 */
export const updatesVomHaendler: Short = {
  id: 'updates-vom-haendler',
  themaId: 'aktualisierungspflicht-haendler',
  format: 'gibtswirklich',
  sachgebiet: 'recht',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Smartwatch bekommt Post vom Händler',
  weitererzaehlt: 'mindestens zwei Jahre ab Ablieferung',
  suchbegriff: 'Updates Händler',
  kaltstart: {
    art: 'hilferuf',
    satz: 'Meine Smartwatch kriegt keine Updates mehr, der Hersteller schweigt.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'stutzen', requisite: 'uhr' },
  },
  vorspann: 'Wattis Smartwatch bekommt Post vom Händler',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, meine Smartwatch kriegt keine Updates mehr. Was kann ich machen? Schreib deinem Händler, bei dem du sie gekauft hast.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'bitten',
          text: 'Volti, meine Smartwatch kriegt keine Updates mehr. Was kann ich machen?',
        },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Schreib deinem Händler, bei dem du sie gekauft hast.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'zeigen',
        gegenueber: { von: 'ruhe', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bgb-475b-ware-mit-digitalen-elementen',
      belegId: 'kauf-ware-mit-digitalen-elementen',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext:
        'Dem Laden? Der baut die doch gar nicht. Eine Uhr ohne Software ist keine Uhr. Dafür gibt es einen eigenen Paragrafen.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Dem Laden? Der baut die doch gar nicht.' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Eine Uhr ohne Software ist keine Uhr. Dafür gibt es einen eigenen Paragrafen.',
          quelleId: 'bgb-475b-ware-mit-digitalen-elementen',
          belegId: 'kauf-ware-mit-digitalen-elementen',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bgb-475b-ware-mit-digitalen-elementen',
      belegId: 'aktualisierungen-waehrend-erwartbarem-zeitraum',
      sprechtext:
        'Und was steht da drin? Dass dein Verkäufer dir Updates bereitstellen muss. Und wie lange?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was steht da drin?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dass dein Verkäufer dir Updates bereitstellen muss.',
          quelleId: 'bgb-475b-ware-mit-digitalen-elementen',
          belegId: 'aktualisierungen-waehrend-erwartbarem-zeitraum',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wie lange?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'achselzucken',
        gegenueber: { von: 'zeigen', nach: 'erklaeren' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'mindestens aber für einen Zeitraum von zwei Jahren ab der Ablieferung der Ware',
      quelleId: 'bgb-475c-dauerhafte-bereitstellung',
      belegId: 'mindestens-zwei-jahre',
      sprechtext:
        'So lange, wie du es bei so einer Uhr erwarten kannst. Und wenn die App dauernd mitläuft? Dann mindestens zwei Jahre ab Ablieferung.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'So lange, wie du es bei so einer Uhr erwarten kannst.',
          quelleId: 'bgb-475b-ware-mit-digitalen-elementen',
          belegId: 'aktualisierungen-waehrend-erwartbarem-zeitraum',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Und wenn die App dauernd mitläuft?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Dann mindestens zwei Jahre ab Ablieferung.',
          quelleId: 'bgb-475c-dauerhafte-bereitstellung',
          belegId: 'mindestens-zwei-jahre',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'achselzucken',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Bei dauerhafter Bereitstellung sind es mindestens zwei Jahre.',
      sprechtext:
        'Und was rätst du mir? Schreib ihn an. Aber installier die Updates, die kommen. Sonst haftet er dafür nicht. Die letzten drei Updates liegen noch auf der Uhr.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was rätst du mir?' },
        { sprecher: 'nachleser', zug: 'beantworten', text: 'Schreib ihn an.' },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Aber installier die Updates, die kommen. Sonst haftet er dafür nicht.',
          quelleId: 'bgb-475b-ware-mit-digitalen-elementen',
          belegId: 'haftet-nicht-bei-fehlender-installation',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'gestaendnis',
          text: 'Die letzten drei Updates liegen noch auf der Uhr.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „der Hersteller schweigt" der falsche Adressat und Wattis eigene Uhr das eigentliche Problem.',
    },
  ],

  quellenIds: ['bgb-475b-ware-mit-digitalen-elementen', 'bgb-475c-dauerhafte-bereitstellung'],

  texte: {
    tiktok: {
      titel: 'Wattis Smartwatch bekommt Post vom Händler',
      beschreibung: 'Updates und Händler: Wer die Aktualisierungen wirklich schuldet.',
      hashtags: ['#updates', '#smartwatch', '#verbraucherrechte', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Smartwatch bekommt Post vom Händler',
      beschreibung: 'Updates und Händler: Nicht der Hersteller ist dein Vertragspartner.',
      hashtags: ['#updates', '#smartwatch', '#gewaehrleistung', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Der Händler schuldet dir die Updates',
      beschreibung: 'Updates und Händler: Was die §§ 475b und 475c BGB über Waren mit digitalen Elementen sagen.',
      hashtags: ['#updates', '#bgb', '#smartwatch', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
