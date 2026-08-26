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
 *
 * ## Am 26.08.2026 auf zwei Stimmen umgebaut
 *
 * Vier Reaktionen, vier Macharten. `absicht` loest Empoerung aus, und genau
 * deshalb steht hier nur **eine** empoerte Zeile: Vier waeren die Haltung des
 * Kanals und keine Figur.
 *
 * **Der Beleg der dritten Szene ist dabei gewandert.** Der Satz sagt
 * „die Reparatur behindern"; die Fundstelle dafuer ist
 * `behindern-verwendung-ersatzteile` („behindern insbesondere die Verwendung
 * von Originalersatzteilen"), nicht der allgemeine Verbotssatz, an dem er
 * vorher hing. Dieselbe Aussage, aber die Fundstelle traegt jetzt wirklich
 * das Wort, das gesprochen wird.
 *
 * **Die Symbole sind bis auf den Schraubenschluessel weg.** Bei zwei Figuren
 * laege ein Symbol in der rechten — geblieben ist das Blatt in Voltis Hand,
 * und im Aufschlag steht er noch allein.
 *
 * `erklaeren` faellt hier ebenfalls aus, und das ist gemessen statt geraten:
 * Die drei ausgreifenden Posen legen eine Hand auf das andere Gehaeuse
 * (`video/Wortwechselprobe.tsx`).
 */
export const ersatzteilFreischalten: Short = {
  id: 'ersatzteil-freischalten',
  themaId: 'parts-pairing',
  format: 'absicht',
  sachgebiet: 'recht',
  bauform: 'wechselrede',
  arbeitstitel: 'Das Ersatzteil und das Verbot',
  weitererzaehlt: 'Das Teil passt. Freigeschaltet ist es damit nicht.',
  suchbegriff: 'Ersatzteil Reparatur',

  szenen: [
    {
      /*
       * Einstimmig, und das ist gerechnet: Der Aufschlag darf hoechstens 3,5
       * Sekunden sprechen. Watti tritt in der zweiten Szene dazu.
       */
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Das Ersatzteil passt. Es tut nichts.',
      rede: [{ sprecher: 'nachleser', text: 'Das Ersatzteil passt. Es tut nichts.' }],
      text: 'Passt. Tut nichts.',
      buehne: { art: 'figur', von: 'ruhe', nach: 'stutzen', requisite: 'schraubenschluessel' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Im Amtsblatt der EU steht dazu ein Verbot. Und das weiß mein Handy nicht?',
      rede: [
        { sprecher: 'nachleser', text: 'Im Amtsblatt der EU steht dazu ein Verbot.' },
        { sprecher: 'zeiger', text: 'Und das weiß mein Handy nicht?', machart: 'rueckfrage' },
      ],
      text: 'Verboten. Im Amtsblatt.',
      buehne: {
        art: 'figur',
        von: 'stutzen',
        nach: 'lesen',
        requisite: 'blatt',
        gegenueber: { von: 'ruhe', nach: 'staunen' },
      },
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'keine-hardware-oder-softwaretechniken',
      herausgeber: 'Europäische Union',
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Hersteller dürfen die Reparatur nicht per Software behindern. Da hat jemand dafür Gehalt bekommen.',
      rede: [
        { sprecher: 'nachleser', text: 'Hersteller dürfen die Reparatur nicht per Software behindern.' },
        { sprecher: 'zeiger', text: 'Da hat jemand dafür Gehalt bekommen.', machart: 'empoerung' },
      ],
      text: 'Reparatur nicht sperren.',
      buehne: {
        art: 'figur',
        von: 'lesen',
        nach: 'stutzen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
      hervorhebung: 'behindern',
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'behindern-verwendung-ersatzteile',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Gebrauchte und kompatible Ersatzteile stehen ausdrücklich drin. Meins ist vom Flohmarkt. Sagt keinem was.',
      rede: [
        { sprecher: 'nachleser', text: 'Gebrauchte und kompatible Ersatzteile stehen ausdrücklich drin.' },
        { sprecher: 'zeiger', text: 'Meins ist vom Flohmarkt. Sagt keinem was.', machart: 'gestaendnis' },
      ],
      text: 'Auch gebrauchte Ersatzteile.',
      buehne: {
        art: 'figur',
        von: 'stutzen',
        zwischen: ['lesen'],
        nach: 'nachdenken',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
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
      sprechtext: 'Sogar Teile aus dem 3D-Drucker stehen in der Liste. Ich drucke mir jetzt ein neues Handy.',
      rede: [
        { sprecher: 'nachleser', text: 'Sogar Teile aus dem 3D-Drucker stehen in der Liste.' },
        { sprecher: 'zeiger', text: 'Ich drucke mir jetzt ein neues Handy.', machart: 'falscherschluss' },
      ],
      text: 'Auch gedruckte Teile.',
      buehne: {
        art: 'figur',
        von: 'nachdenken',
        nach: 'lesen',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
      quelleId: 'eu-reparaturrichtlinie-2024',
      belegId: 'mittels-3d-druck-hergestellt',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Das Teil passt. Freigeschaltet ist es damit nicht.',
      rede: [{ sprecher: 'nachleser', text: 'Das Teil passt. Freigeschaltet ist es damit nicht.' }],
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
