import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · Erlaubt ist es, solange das Geraet liegen bleibt.
 *
 * **Szenario 11, viertes Beispiel: Watti erzaehlt es falsch weiter.** Aus einer
 * Bedingung wird bei ihm ein Verbot — „Handy im Auto ist verboten" statt „nur
 * nicht in die Hand nehmen". § 23 Absatz 1a StVO sagt „**nur benutzen, wenn**",
 * und beide Halbsaetze zusammen sind eine Erlaubnis mit Auflagen.
 *
 * **Die Quelle ist dieselbe wie in `blitzer-app`, der Absatz ein anderer.** Dort
 * geht es um Absatz 1c (Geraete zur Anzeige von Verkehrsueberwachung), hier um
 * Absatz 1a. Das ist die Probe darauf, ob eine `belegId` wirklich an der
 * Fundstelle haengt und nicht an der Norm: Beide Shorts nennen § 23, und keine
 * Zeile des einen traegt im anderen.
 *
 * **Die Videobrille steht bewusst mit drin.** Sie ist die eine Stelle, an der
 * Wattis Version zufaellig recht behaelt — ein Geraet, das wirklich gar nicht
 * benutzt werden darf. Wer eine Ausnahme unterschlaegt, macht aus einer
 * richtigen Regel eine falsche; wer sie nennt, macht aus einem Vortrag ein
 * Gespraech.
 */
export const handyAmSteuer: Short = {
  id: 'handy-am-steuer',
  themaId: 'handy-am-steuer-bedingungen',
  format: 'gibtswirklich',
  sachgebiet: 'fahren',
  bauform: 'wechselrede',
  arbeitstitel: 'Watti verbietet ein Handy, das in der Halterung liegt',
  weitererzaehlt: 'weder aufnimmst noch hältst',
  suchbegriff: 'Handy am Steuer',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Beifahrer sein heißt aufpassen. Handy am Steuer kostet Punkte.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'gesetzbuch' },
  },
  vorspann: 'Wattis Regel für das Auto',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, warum guckst du mir auf die Hand? Du hast dein Handy angefasst. Handy am Steuer ist verboten, das weiß jeder.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, warum guckst du mir auf die Hand?' },
        {
          sprecher: 'zeiger',
          zug: 'behaupten',
          text: 'Du hast dein Handy angefasst. Handy am Steuer ist verboten, das weiß jeder.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'stutzen',
        gegenueber: { von: 'ruhe', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'stvo-23-blitzerwarner',
      belegId: 'nur-benutzen-wenn-nicht-gehalten',
      herausgeber: 'Bundesministerium der Justiz',
      sprechtext:
        'Da steht nicht verboten du Pfosten. Da steht: nur benutzen, wenn du es weder aufnimmst noch hältst. Also darf ich draufdrücken?',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Da steht nicht verboten du Pfosten. Da steht: nur benutzen, wenn du es weder aufnimmst noch hältst.',
          quelleId: 'stvo-23-blitzerwarner',
          belegId: 'nur-benutzen-wenn-nicht-gehalten',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'falscherschluss', text: 'Also darf ich draufdrücken?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'erklaeren', nach: 'lesen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'stvo-23-blitzerwarner',
      belegId: 'kurze-blickzuwendung',
      sprechtext:
        'Nur mit einer kurzen Blickzuwendung, angepasst an die Verhältnisse. Und was heißt kurz? Kürzer, als du gerade guckst.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Nur mit einer kurzen Blickzuwendung, angepasst an die Verhältnisse.',
          quelleId: 'stvo-23-blitzerwarner',
          belegId: 'kurze-blickzuwendung',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was heißt kurz?' },
        { sprecher: 'nachleser', zug: 'beantworten', machart: 'nebenbemerkung', text: 'Kürzer, als du gerade guckst.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'achselzucken',
        gegenueber: { von: 'lesen', nach: 'zeigen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'stvo-23-blitzerwarner',
      belegId: 'auch-unterhaltungselektronik',
      sprechtext:
        'Und mein Navi? Das steht in derselben Liste. Tablets und Berührungsbildschirme auch. Dann habe ich es dem Papa falsch erzählt.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und mein Navi?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Das steht in derselben Liste. Tablets und Berührungsbildschirme auch.',
          quelleId: 'stvo-23-blitzerwarner',
          belegId: 'auch-unterhaltungselektronik',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'gestaendnis',
          text: 'Dann habe ich es dem Papa falsch erzählt.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'achselzucken',
        nach: 'staunen',
        gegenueber: { von: 'zeigen', nach: 'erklaeren' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Erlaubt, solange das Gerät weder aufgenommen noch gehalten wird.',
      sprechtext:
        'Bei einem Gerät hattest du recht. Bei welchem? Einer Videobrille auf dem Kopf. Die darf gar nicht benutzt werden. Dann fahre ich ab jetzt mit Brille, großer Bruder.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachlegen', text: 'Bei einem Gerät hattest du recht.' },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Bei welchem?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Einer Videobrille auf dem Kopf. Die darf gar nicht benutzt werden.',
          quelleId: 'stvo-23-blitzerwarner',
          belegId: 'videobrille-verboten',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'umdeutung',
          text: 'Dann fahre ich ab jetzt mit Brille, großer Bruder.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'zeigen',
        gegenueber: { von: 'erklaeren', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „das kostet Punkte" der Satz von jemandem, der die Bedingung für ein Verbot gehalten hat.',
    },
  ],

  quellenIds: ['stvo-23-blitzerwarner'],

  texte: {
    tiktok: {
      titel: 'Watti verbietet ein Handy, das in der Halterung liegt',
      beschreibung: 'Handy am Steuer: Erlaubt, solange du es weder aufnimmst noch hältst.',
      hashtags: ['#handyamsteuer', '#stvo', '#autofahren', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti verbietet ein Handy, das in der Halterung liegt',
      beschreibung: 'Handy am Steuer: Aus einer Bedingung wird beim Weitererzählen ein Verbot.',
      hashtags: ['#handyamsteuer', '#stvo', '#verkehrsrecht', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Nicht das Handy ist verboten, sondern das Halten',
      beschreibung: 'Handy am Steuer: Was § 23 Absatz 1a StVO über elektronische Geräte beim Fahren sagt.',
      hashtags: ['#handyamsteuer', '#stvo', '#recht', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
