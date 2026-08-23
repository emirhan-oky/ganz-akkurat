import type { Short } from '../../src/typen';

/**
 * Donnerstag · Na, auch gekauft? · der Aufkleber ueber der Schraube.
 *
 * Der Sendeplatz handelt sonst von etwas, das man **gekauft** hat. Hier ist
 * es etwas, das man **geglaubt** hat, und das ist die naechste Stufe: Der
 * Aufkleber kostet nichts und wirkt trotzdem, weil niemand ihn nachschlaegt.
 *
 * Belegt ist das ueber § 476 BGB, und zwar genau in der Haelfte, auf die es
 * ankommt: Nicht der Aufkleber ist verboten — er wirkt nur nicht. Der
 * Unterschied ist wichtig, sonst behauptet das Video etwas ueber eine
 * Absicht, und dafuer steht keine Quelle ein.
 */
export const aufkleberGarantie: Short = {
  id: 'aufkleber-garantie',
  themaId: 'garantie-siegel',
  format: 'absicht',
  sachgebiet: 'recht',
  arbeitstitel: 'Der Aufkleber über der Schraube',
  weitererzaehlt: 'Der Aufkleber ist nicht verboten. Er wirkt nur nicht.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Na, den Aufkleber über der Schraube gelassen?',
      text: 'Den Aufkleber gelassen?',
      symbol: 'zettel',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Darauf steht: beim Öffnen erlischt alles. Im Gesetzbuch nicht.',
      text: 'Beim Öffnen erlischt alles.',
      symbol: 'gesetzbuch',
      quelleId: 'bgb-476-abweichende',
      belegId: 'auf-eine-vor-mitteilung',
      herausgeber: 'Bundesministerium der Justiz',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Auf eine Abrede zu deinem Nachteil kann er sich nicht berufen.',
      text: 'Zu deinem Nachteil zählt nicht.',
      symbol: 'kreuz',
      hervorhebung: 'nicht berufen',
      quelleId: 'bgb-476-abweichende',
      belegId: 'kann-der-unternehmer-sich-nicht',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Der Aufkleber ist nicht verboten. Er wirkt nur nicht.',
      text: 'Nicht verboten. Nur wirkungslos.',
      symbol: 'haken',
      quelleId: 'bgb-476-abweichende',
      belegId: 'kann-der-unternehmer-sich-nicht',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Zwei Jahre Mängelhaftung hast du trotzdem. Ohne Aufpreis.',
      text: 'Zwei Jahre hast du trotzdem.',
      symbol: 'uhr',
      quelleId: 'bgb-438-verjaehrung',
      belegId: 'im-u-brigen-in',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Ein Stück Papier hat gereicht.',
      satz: 'Ein Stück Papier hat gereicht.',
      rundlauf:
        '„Ein Stück Papier hat gereicht." trifft auf „Na, den Aufkleber über der Schraube gelassen?" — die Frage klingt beim zweiten Mal wie eine Diagnose.',
    },
  ],

  quellenIds: ['bgb-476-abweichende', 'bgb-438-verjaehrung'],

  texte: {
    tiktok: {
      titel: 'Zwei Jahre Mängelhaftung bleiben trotzdem',
      beschreibung: '',
      hashtags: ['#garantie', '#reparatur', '#recht', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Zwei Jahre Mängelhaftung bleiben trotzdem',
      beschreibung: '',
      hashtags: ['#garantie', '#reparatur', '#recht', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Zwei Jahre Mängelhaftung bleiben trotzdem',
      beschreibung: '',
      hashtags: ['#garantie', '#reparatur', '#recht', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
