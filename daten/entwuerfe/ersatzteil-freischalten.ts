import type { Short } from '../../src/typen';

/**
 * Das ist Absicht · das Ersatzteil, das erst freigeschaltet werden muss.
 *
 * **Die Belegpflicht hat die Erzaehlung geformt.** Naheliegend waere der Satz
 * „Hersteller sperren Ersatzteile per Software" — nur belegt ihn niemand: Das
 * waere eine Aussage ueber die Praxis, und dafuer gibt es keine Behoerdenseite.
 * Was im Amtsblatt steht, ist das **Verbot**. Also traegt das Verbot den Short,
 * und die Praxis steht nur im Aufschlag, wo nichts behauptet wird.
 *
 * Genau das ist die Hausregel von `absicht`: Es muss in einem Dokument stehen.
 * Der Nachschlag zieht die Konsequenz daraus, ohne Wirksamkeit zu behaupten —
 * ein Verbot im Amtsblatt ist noch kein freigeschaltetes Ersatzteil.
 */
export const ersatzteilFreischalten: Short = {
  id: 'ersatzteil-freischalten',
  themaId: 'parts-pairing',
  format: 'absicht',
  sachgebiet: 'recht',
  arbeitstitel: 'Das Ersatzteil und das Verbot',
  weitererzaehlt: 'Das Teil passt. Freigeschaltet ist es damit nicht.',
  suchbegriff: 'Ersatzteil Reparatur',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Dein Ersatzteil passt. Es tut trotzdem nichts.',
      text: 'Passt. Tut nichts.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'schraubenschluessel' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Im Amtsblatt der Europäischen Union steht dazu ein ausdrückliches Verbot.',
      text: 'Verboten. Im Amtsblatt.',
      buehne: { art: 'figur', von: 'stutzen', nach: 'lesen', requisite: 'gesetzbuch', stand: 'links' },
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'keine-hardware-oder-softwaretechniken',
      herausgeber: 'Europäische Union',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Hersteller dürfen keine Softwaretechniken einsetzen, die die Reparatur behindern.',
      text: 'Keine Sperre per Software.',
      buehne: { art: 'figur', von: 'lesen', nach: 'erklaeren' },
      hervorhebung: 'behindern',
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'keine-hardware-oder-softwaretechniken',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Die Richtlinie nennt gebrauchte und kompatible Ersatzteile dabei beim Namen.',
      text: 'Auch gebrauchte Teile.',
      buehne: { art: 'figur', von: 'erklaeren', nach: 'staunen', requisite: 'karton', stand: 'links' },
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'kompatiblen-ersatzteilen',
    },
    {
      /*
       * Der 3D-Druck stand hier erst ohne eigene Fundstelle — er kam aus der
       * Zusammenfassung des Abrufs, nicht aus dem gebundenen Zitat. Die
       * Richtlinie nennt ihn tatsaechlich, an genau einer Stelle, und die
       * steht jetzt als eigener Beleg daneben.
       */
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Sogar Ersatzteile aus dem 3D-Drucker stehen ausdrücklich in der Aufzählung.',
      text: 'Auch gedruckte Teile.',
      buehne: { art: 'figur', von: 'staunen', nach: 'zeigen', requisite: 'drucker' },
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'mittels-3d-druck-hergestellt',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Das Teil passt. Freigeschaltet ist es damit nicht.',
      satz: 'Das Teil passt. Freigeschaltet ist es damit nicht.',
      rundlauf:
        'Beim zweiten Sehen ist „es tut trotzdem nichts" keine Klage mehr, sondern der Grund, warum das Verbot überhaupt nötig war.',
    },
  ],

  quellenIds: ['eu-reparaturrichtlinie-2024'],

  texte: {
    tiktok: {
      titel: 'Das Ersatzteil und das Verbot',
      beschreibung: 'Ein Ersatzteil, das nach der Reparatur nichts tut – die EU untersagt genau das.',
      hashtags: ['#partspairing', '#ersatzteile', '#righttorepair', '#eurecht', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Das Ersatzteil und das Verbot',
      beschreibung: 'Ersatzteil eingebaut, Reparatur erledigt, Funktion trotzdem tot. Dagegen steht ein Verbot.',
      hashtags: ['#ersatzteile', '#reparieren', '#righttorepair', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Das Ersatzteil und die Softwaretechnik',
      beschreibung: 'Ersatzteil und Reparatur: Was die Richtlinie 2024/1799 Herstellern ausdrücklich untersagt.',
      hashtags: ['#ersatzteile', '#reparatur', '#verbraucherrecht', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
