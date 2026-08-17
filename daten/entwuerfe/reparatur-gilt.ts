import type { Short } from '../../src/typen';

/**
 * Mittwoch, 12 Uhr · Neu und keiner sagt es dir · das Recht auf Reparatur.
 *
 * Der erste Short des achten Sendeplatzes und zugleich sein Beweisstueck: Der
 * Stichtag liegt **drei Wochen** zurueck. Kein „ab 2027", kein „demnaechst" —
 * es gilt, und niemand hat es erzaehlt.
 *
 * Der Kipppunkt ist die Stelle, an der sich dieser Kanal von einer Meldung
 * unterscheidet. Ueberall steht „das Recht auf Reparatur ist da"; in Artikel 21
 * steht, dass es fuer Kaufvertraege **vor** dem Stichtag nicht gilt. Das Geraet,
 * das der Zuschauer gerade in der Hand haelt, ist also nicht dabei. Wer nur die
 * Meldung liest, erzaehlt es falsch herum weiter.
 */
export const reparaturGilt: Short = {
  id: 'reparatur-gilt',
  themaId: 'recht-auf-reparatur-gilt',
  format: 'neu',
  sachgebiet: 'recht',
  arbeitstitel: 'Das Recht auf Reparatur gilt seit drei Wochen',
  weitererzaehlt: 'Das Recht auf Reparatur gilt — aber nur für Geräte, die du danach gekauft hast.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Seit drei Wochen hast du ein neues Recht.',
      text: 'Seit drei Wochen hast du ein neues Recht.',
      pauseSek: 0.8,
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Am einunddreißigsten Juli ist die Reparaturrichtlinie in Kraft.',
      text: 'Seit dem 31. Juli in Kraft.',
      hervorhebung: '31. Juli',
      quelleId: 'eu-recht-auf-reparatur',
      belegId: 'die-mitgliedstaaten-wenden-diese',
      herausgeber: 'Europäische Union',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Hersteller dürfen die Reparatur nicht mehr per Software blockieren.',
      text: 'Keine Software, die Reparatur behindert.',
      hervorhebung: 'Software',
      quelleId: 'eu-recht-auf-reparatur',
      belegId: 'setzen-keine-hardware-oder',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Zwei Artikel weiter steht das Kleingedruckte.',
      text: 'Zwei Artikel weiter:',
      quelleId: 'eu-recht-auf-reparatur',
      belegId: 'gilt-nicht-fu-r',
    },
    {
      art: 'einschraenkung',
      position: 'kipppunkt',
      sprechtext: 'Sie gilt nicht für Käufe vor dem Stichtag. Dein Gerät ist nicht dabei.',
      ueberschrift: 'Artikel 21',
      bedingung: 'Nicht für Käufe vor dem 31. Juli 2026',
      folge: 'Das Gerät in deiner Hand fällt nicht darunter',
      quelleId: 'eu-recht-auf-reparatur',
      belegId: 'gilt-nicht-fu-r',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Dein Recht auf Reparatur musst du erst kaufen.',
      satz: 'Erst kaufen, dann reparieren dürfen.',
    },
  ],

  quellenIds: ['eu-recht-auf-reparatur'],

  texte: {
    tiktok: {
      titel: 'Das Recht auf Reparatur gilt schon',
      beschreibung: '',
      hashtags: ['#reparatur', '#eu', '#verbraucherrecht', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Das Recht auf Reparatur gilt schon',
      beschreibung: '',
      hashtags: ['#reparatur', '#eu', '#verbraucherrecht', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Das Recht auf Reparatur gilt schon',
      beschreibung: '',
      hashtags: ['#reparatur', '#eu', '#verbraucherrecht', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
