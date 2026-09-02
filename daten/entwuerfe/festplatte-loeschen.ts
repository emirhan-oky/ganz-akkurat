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
 * keine zweite Recherche: Volti widerlegt Watti mit der Seite, die Watti selbst
 * gefunden hat.
 *
 * ## Und dann liest man die Seite zu Ende
 *
 * **Der `belegpruefer` hat den Short am 02.09.2026 umgedreht.** Er stand so da,
 * dass Volti gewinnt: Loeschen gibt den Bereich zum Ueberschreiben frei, also
 * vollschreiben und den Hammer weglegen. Dieselbe BSI-Seite sagt weiter unten
 * zweierlei — Ueberschreiben erreicht nur, wozu das Programm Zugriff hat, und
 * wenn man nicht ueberschreiben kann, soll man die Platte physisch zerstoeren.
 *
 * **Wattis Hammer war die ganze Zeit eine der Methoden, die das BSI nennt.**
 * Der Short behauptete das Gegenteil, und `npm run quellen-pruefen` war dabei
 * gruen: Beide Zitate standen woertlich auf der Seite, nur nicht das, was der
 * Short daraus machte.
 *
 * Damit wird aus Szenario 3 nebenbei Szenario 4 — Watti weiss etwas, schliesst
 * falsch, und behaelt am Ende trotzdem recht. Das ist die bessere Geschichte,
 * und sie ist die belegte.
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
        'Und wieso liest du dann nicht den Satz danach? Welchen Satz danach? Der Bereich wird zum Überschreiben freigegeben. Du musst ihn nur vollschreiben. Und den Rest? Überschreiben erreicht nur die Daten, auf die das Programm Zugriff hat.',
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
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und den Rest?' },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Überschreiben erreicht nur die Daten, auf die das Programm Zugriff hat.',
          quelleId: 'bsi-loeschen-verweise',
          belegId: 'ueberschreiben-nur-mit-zugriff',
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
      satz: 'Für den Rest nennt das BSI die physische Zerstörung.',
      sprechtext:
        'Also war der Hammer doch richtig? Schon das Verbiegen der Scheiben macht die gängigen Methoden der Datenrettung unbrauchbar. Dann gib mir den Hammer wieder, großer Bruder.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Also war der Hammer doch richtig?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Schon das Verbiegen der Scheiben macht die gängigen Methoden der Datenrettung unbrauchbar.',
          quelleId: 'bsi-loeschen-verweise',
          belegId: 'verbiegen-der-scheiben',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'widerhaken',
          text: 'Dann gib mir den Hammer wieder, großer Bruder.',
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
        'Beim zweiten Sehen weiß man, dass Watti recht behält – und Voltis erste Frage nach dem Hammer klingt wie jemand, der zu früh sicher ist.',
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
      beschreibung: 'Festplatte löschen heißt nicht weg. Und Überschreiben erreicht nicht alles.',
      hashtags: ['#festplatte', '#daten', '#laptop', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Was beim Löschen einer Festplatte wirklich passiert',
      beschreibung: 'Festplatte löschen, überschreiben, zerstören: Was das BSI zu jeder der drei Methoden schreibt.',
      hashtags: ['#festplatte', '#datenloeschung', '#bsi', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
