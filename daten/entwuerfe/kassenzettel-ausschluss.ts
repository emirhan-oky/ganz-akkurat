import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · Der Haendler kann die Gewaehrleistung nicht wegschreiben.
 *
 * **Szenario 5, viertes Beispiel: Volti wird ertappt.** Sein Wissen stimmt und
 * sein Verhalten nicht — er erklaert Watti, dass ein Zettel im Laden nichts
 * wert ist, und hat seinen eigenen Monitor privat aus einer Anzeige, wo
 * derselbe Satz gilt. Ertappt wird er von der Regel, die er gerade selbst
 * vorgetragen hat.
 *
 * **Die Grenze des Paragrafen ist der Kipppunkt, nicht sein Inhalt.** § 476
 * steht im Untertitel ueber den Verbrauchsgueterkauf, und § 474 Absatz 1 sagt,
 * was das ist: ein Verbraucher kauft **von einem Unternehmer**. Beim Nachbarn
 * greift er nicht — und genau dort hat Volti gekauft.
 *
 * **Zwei Quellen, die seit Wochen ungenutzt in `quellen.json` lagen.** § 476
 * war eingetragen und an keinen Entwurf gebunden; seine beiden Belege waren
 * dabei Fragmente von vier und neun Woertern („kann der Unternehmer sich nicht
 * berufen"), also genau der Fall, gegen den die Subjektregel vom 30.08.2026
 * steht. Sie sind mit diesem Short ersetzt worden.
 */
export const kassenzettelAusschluss: Short = {
  id: 'kassenzettel-ausschluss',
  themaId: 'gewaehrleistung-ausschluss',
  format: 'gibtswirklich',
  sachgebiet: 'recht',
  bauform: 'zitatkarte',
  arbeitstitel: 'Volti pocht auf Rechte, die er selbst nicht hat',
  weitererzaehlt: 'Reparatur oder Geld zurück',
  suchbegriff: 'Gewährleistung Händler',
  kaltstart: {
    art: 'momentdanach',
    satz: 'Auf meinem Kassenzettel steht „keine Gewährleistung". Zu spät.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'lesen', requisite: 'kassenbon' },
  },
  vorspann: 'Voltis Monitor hat keine Rechte',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, warum liest du einen Kassenzettel? Weil da steht, dass ich keine Gewährleistung habe.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, warum liest du einen Kassenzettel?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Weil da steht, dass ich keine Gewährleistung habe.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'lesen',
        nach: 'stutzen',
        gegenueber: { von: 'ruhe', nach: 'erklaeren' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'die Abweichung … im Vertrag ausdrücklich und gesondert vereinbart wurde',
      quelleId: 'bgb-476-abweichende',
      belegId: 'abweichung-ausdruecklich-und-gesondert',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext:
        'Reparatur oder Geld zurück kann er dir damit nicht nehmen. Auch wenn ich unterschrieben habe? Unterschreiben reicht nicht. Es müsste ausdrücklich und gesondert vereinbart sein.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Reparatur oder Geld zurück kann er dir damit nicht nehmen.',
          quelleId: 'bgb-476-abweichende',
          belegId: 'unternehmer-kann-sich-nicht-berufen',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Auch wenn ich unterschrieben habe?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Unterschreiben reicht nicht. Es müsste ausdrücklich und gesondert vereinbart sein.',
          quelleId: 'bgb-476-abweichende',
          belegId: 'abweichung-ausdruecklich-und-gesondert',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bgb-474-verbrauchsgueterkauf',
      belegId: 'verbraucher-von-unternehmer',
      sprechtext:
        'Und wenn es kein Händler ist? Der Paragraf gilt nur, wenn du bei einem Unternehmer kaufst. Also privat, aus so einer Anzeige?',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und wenn es kein Händler ist?' },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Der Paragraf gilt nur, wenn du bei einem Unternehmer kaufst.',
          quelleId: 'bgb-474-verbrauchsgueterkauf',
          belegId: 'verbraucher-von-unternehmer',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Also privat, aus so einer Anzeige?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'nachdenken',
        gegenueber: { von: 'lesen', nach: 'zeigen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bgb-474-verbrauchsgueterkauf',
      belegId: 'ergaenzend-die-folgenden-vorschriften',
      sprechtext:
        'Kommt drauf an, wer sie geschaltet hat. Wie bei deinem Monitor? Was ist mit meinem Monitor?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Kommt drauf an, wer sie geschaltet hat.',
          quelleId: 'bgb-474-verbrauchsgueterkauf',
          belegId: 'verbraucher-von-unternehmer',
        },
        { sprecher: 'zeiger', zug: 'erinnern', text: 'Wie bei deinem Monitor?' },
        { sprecher: 'nachleser', zug: 'nachhaken', machart: 'empoerung', text: 'Was ist mit meinem Monitor?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'zeigen',
        gegenueber: { von: 'zeigen', nach: 'stutzen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Der Paragraf gilt nur, wenn auf der anderen Seite ein Unternehmer steht.',
      sprechtext:
        'Den hast du aus einer Anzeige. Von einer Privatperson. Der hat fast nichts gekostet. Und jetzt flackert er. Ja gut, einmal ist keinmal.',
      rede: [
        { sprecher: 'zeiger', zug: 'erinnern', text: 'Den hast du aus einer Anzeige. Von einer Privatperson.' },
        {
          sprecher: 'nachleser',
          zug: 'umdeuten',
          machart: 'banaleaufloesung',
          text: 'Der hat fast nichts gekostet.',
        },
        { sprecher: 'zeiger', zug: 'zuspitzen', text: 'Und jetzt flackert er.' },
        { sprecher: 'nachleser', zug: 'einlenken', machart: 'gestaendnis', text: 'Ja gut, einmal ist keinmal.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'nachdenken',
        gegenueber: { von: 'stutzen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen liest Watti den Zettel eines Händlers, während Volti gar keinen Händler hatte.',
    },
  ],

  quellenIds: ['bgb-476-abweichende', 'bgb-474-verbrauchsgueterkauf'],

  texte: {
    tiktok: {
      titel: 'Volti pocht auf Rechte, die er selbst nicht hat',
      beschreibung: 'Gewährleistung und Händler: Was auf dem Kassenzettel steht, gilt nicht automatisch.',
      hashtags: ['#gewährleistung', '#verbraucherrechte', '#gebrauchtkauf', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Volti pocht auf Rechte, die er selbst nicht hat',
      beschreibung: 'Gewährleistung und Händler: Der Schutz hängt daran, wer verkauft.',
      hashtags: ['#gewährleistung', '#bgb', '#gebrauchtkauf', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Der Zettel im Laden ist nichts wert',
      beschreibung:
        'Gewährleistung und Händler: Was die §§ 474 und 476 BGB über abweichende Vereinbarungen sagen.',
      hashtags: ['#gewährleistung', '#bgb', '#recht', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
