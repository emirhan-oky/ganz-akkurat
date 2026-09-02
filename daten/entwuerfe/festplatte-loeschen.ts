import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · geloescht ist nicht weg, und der Satz danach.
 *
 * **Szenario 3: Watti weiss etwas und schliesst falsch.** Er hat recht — beim
 * Loeschen verschwindet nur der Verweis. Falsch ist, was er daraus macht.
 * Befund 26: Er ist nicht dumm, sein Schluss ist es.
 *
 * **Und Watti traegt hier die Quelle und die Zitatkarte.** Das erste Mal. Die
 * Bedingung steht in Befund 27: Im Dialog muss stehen, woher er es weiss —
 * „Steht beim BSI du Idiot, ich lese auch mal was." **Die Quelle wandert mit
 * der Vorgeschichte, nicht mit der Rolle.**
 *
 * **Der Konter ist der naechste Satz derselben Quelle** (Befund 28). Er kostet
 * keine zweite Recherche und ist der schaerfste im Pool: Volti widerlegt Watti
 * mit der Seite, die Watti selbst gefunden hat.
 */
export const festplatteLoeschen: Short = {
  id: 'festplatte-loeschen',
  themaId: 'festplatte-loeschen',
  format: 'gibtswirklich',
  sachgebiet: 'rechner',
  bauform: 'zitatkarte',
  arbeitstitel: 'Watti erschlägt seine Festplatte',
  weitererzaehlt: 'zum Überschreiben freigegeben',
  suchbegriff: 'Festplatte löschen',
  kaltstart: {
    art: 'imvollzug',
    satz: 'So, und jetzt zerlege ich die Festplatte mit dem Hammer.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'schraubenschluessel' },
  },
  vorspann: 'Watti und seine Festplatte',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, was machst du mit meinem Hammer? Ich verkaufe den Laptop, und vorher muss die Festplatte weg.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, was machst du mit meinem Hammer?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Ich verkaufe den Laptop, und vorher muss die Festplatte weg.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ruhe',
        nach: 'ansprechen',
        gegenueber: { von: 'zeigen', nach: 'stutzen' },
      },
    },
    {
      /*
       * **Die Karte gehoert diesmal Watti.** Er trifft die Sache, und der
       * Wortlaut steht im Bild, waehrend er ihn behauptet — nicht, waehrend
       * Volti ihn widerlegt. Genau darum bricht der Satz danach so hart.
       */
      art: 'zitatkarte',
      position: 'zuspitzung',
      zitat: 'lediglich die Verweise auf die Daten im Index',
      quelleId: 'bsi-loeschen-verweise',
      belegId: 'lediglich-die-verweise-auf',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Dann lösch die Daten und gut ist. Löschen bringt gar nichts, das weiß doch jeder. Wieso denn nicht? Weil beim Löschen nur der Verweis verschwindet und die Daten noch da sind.',
      rede: [
        { sprecher: 'nachleser', zug: 'einschraenken', text: 'Dann lösch die Daten und gut ist.' },
        {
          sprecher: 'zeiger',
          zug: 'widersprechen',
          machart: 'falscheautoritaet',
          text: 'Löschen bringt gar nichts, das weiß doch jeder.',
        },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wieso denn nicht?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Weil beim Löschen nur der Verweis verschwindet und die Daten noch da sind.',
          quelleId: 'bsi-loeschen-verweise',
          belegId: 'lediglich-die-verweise-auf',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'stutzen',
        gegenueber: { von: 'stutzen', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-loeschen-verweise',
      belegId: 'lediglich-die-verweise-auf',
      sprechtext: 'Woher weißt du das denn? Steht beim BSI du Idiot, ich lese auch mal was.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Woher weißt du das denn?' },
        { sprecher: 'zeiger', zug: 'beantworten', text: 'Steht beim BSI du Idiot, ich lese auch mal was.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'nachdenken',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-loeschen-verweise',
      belegId: 'der-bereich-wird-zum',
      sprechtext:
        'Und wieso liest du dann nicht den Satz danach? Welchen Satz danach? Der Bereich wird zum Überschreiben freigegeben. Du musst ihn nur vollschreiben.',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Und wieso liest du dann nicht den Satz danach?' },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Welchen Satz danach?' },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Der Bereich wird zum Überschreiben freigegeben. Du musst ihn nur vollschreiben.',
          quelleId: 'bsi-loeschen-verweise',
          belegId: 'der-bereich-wird-zum',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'nachdenken',
        nach: 'erklaeren',
        gegenueber: { von: 'zeigen', nach: 'staunen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Der Platz wird freigegeben, nicht der Hammer.',
      sprechtext:
        'Also soll ich den Laptop einfach mit irgendwas vollmachen? Genau das, und dann gib mir meinen Hammer zurück, kleiner.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          text: 'Also soll ich den Laptop einfach mit irgendwas vollmachen?',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          machart: 'widerhaken',
          text: 'Genau das, und dann gib mir meinen Hammer zurück, kleiner.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'ansprechen',
        gegenueber: { von: 'staunen', nach: 'stutzen' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man, dass Watti nur den halben Text kennt – und der Hammer ist die Lösung für einen Satz, den er nicht zu Ende gelesen hat.',
    },
  ],

  quellenIds: ['bsi-loeschen-verweise'],

  texte: {
    tiktok: {
      titel: 'Watti erschlägt seine Festplatte',
      beschreibung: 'Festplatte löschen vor dem Verkauf: Was dabei wirklich verschwindet.',
      hashtags: ['#festplatte', '#datenschutz', '#bsi', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti erschlägt seine Festplatte',
      beschreibung: 'Festplatte löschen heißt nicht weg. Der Satz danach erklärt, warum.',
      hashtags: ['#festplatte', '#daten', '#laptop', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was beim Löschen einer Festplatte wirklich passiert',
      beschreibung: 'Festplatte löschen und überschreiben: Was das BSI zu Verweisen im Index schreibt.',
      hashtags: ['#festplatte', '#datenloeschung', '#bsi', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
