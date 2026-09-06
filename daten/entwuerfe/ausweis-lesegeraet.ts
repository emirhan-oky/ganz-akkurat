import type { Short } from '../../src/typen';

/**
 * Es war einmal · Das Lesegerät für den Online-Ausweis.
 *
 * **Belegt ist das Heute, nicht das Früher.** Das BSI schreibt zweierlei: Seit
 * 2017 wird jeder Ausweis mit aktivierter Online-Ausweisfunktion ausgegeben,
 * und der Ausweis muss mit einem geeigneten kontaktlosen Lesegerät **oder**
 * einem NFC-fähigen Smartphone verbunden sein. **Dass es früher anders war,
 * behauptet der Short nicht** — das Märchen steht im Aufschlag, und der ist
 * die einzige Position ohne Belegpflicht.
 *
 * **Der Kipppunkt ist der Haken:** aktiviert heißt nicht nutzbar. Erst wer die fünfstellige Transport-PIN in eine sechsstellige
 * ändert, schaltet sie frei — und genau dieser Brief liegt bei den meisten
 * ungeöffnet in einer Schublade.
 *
 * **Bauform `stationen`, und das ist der Grund für die Wahl:** Vier belegte
 * Stufen stehen zur Verfügung, die aufeinander aufbauen — Gerät, Freischaltung,
 * Auslieferungszustand, PIN. Eine Wechselrede müsste drei davon wegwerfen.
 */
export const ausweisLesegeraet: Short = {
  id: 'ausweis-lesegeraet',
  themaId: 'ausweis-lesegeraet',
  format: 'eswareinmal',
  sachgebiet: 'handy',
  bauform: 'stationen',
  arbeitstitel: 'Watti sucht das falsche Gerät',
  weitererzaehlt: 'Seit 2017 werden alle Ausweise mit aktivierter Online-Ausweisfunktion ausgegeben',
  suchbegriff: 'Online Ausweis',
  kaltstart: {
    art: 'beschwerde',
    satz: 'Online ausweisen. Und wo kriege ich jetzt ein Lesegerät her?',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'nachdenken', requisite: 'lupe' },
  },
  vorspann: 'Wattis Suche und der Brief in der Schublade',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Volti, ich brauche ein Lesegerät für den Online Ausweis. Wofür? Ohne das Ding geht das nicht, das weiß doch jeder.',
      rede: [
        { sprecher: 'zeiger', zug: 'bitten', text: 'Volti, ich brauche ein Lesegerät für den Online Ausweis.' },
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Wofür?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscheautoritaet',
          text: 'Ohne das Ding geht das nicht, das weiß doch jeder.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'erklaeren',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-online-ausweisfunktion',
      belegId: 'lesegeraet-oder-smartphone',
      herausgeber: 'Bundesamt für Sicherheit in der Informationstechnik',
      sprechtext:
        'Ein geeignetes kontaktloses Kartenlesegerät, du Pfosten. Oder? Oder ein NFC-fähiges Smartphone.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Ein geeignetes kontaktloses Kartenlesegerät, du Pfosten.',
          quelleId: 'bsi-online-ausweisfunktion',
          belegId: 'lesegeraet-oder-smartphone',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'ratlosigkeit', text: 'Oder?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Oder ein NFC-fähiges Smartphone.',
          quelleId: 'bsi-online-ausweisfunktion',
          belegId: 'lesegeraet-oder-smartphone',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'erklaeren',
        gegenueber: { von: 'erklaeren', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-online-ausweisfunktion',
      belegId: 'seit-2017-standardmaessig-aktiviert',
      sprechtext:
        'Dann muss ich sie aber erst freischalten lassen. Seit 2017 werden alle Ausweise mit aktivierter Online-Ausweisfunktion ausgegeben. Meiner ist neuer als das.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'widersprechen',
          machart: 'rechtfertigung',
          text: 'Dann muss ich sie aber erst freischalten lassen.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Seit 2017 werden alle Ausweise mit aktivierter Online-Ausweisfunktion ausgegeben.',
          quelleId: 'bsi-online-ausweisfunktion',
          belegId: 'seit-2017-standardmaessig-aktiviert',
        },
        { sprecher: 'zeiger', zug: 'einlenken', machart: 'umdeutung', text: 'Meiner ist neuer als das.' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'nachdenken', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'bsi-online-ausweisfunktion',
      belegId: 'aktiviert-aber-nicht-nutzbar',
      sprechtext:
        'Dann probiere ich es sofort. Im Auslieferungszustand ist sie zwar aktiviert, aber noch nicht nutzbar. Watt? Aktiviert und trotzdem nicht?',
      rede: [
        { sprecher: 'zeiger', zug: 'zuspitzen', machart: 'uebercompliance', text: 'Dann probiere ich es sofort.' },
        {
          sprecher: 'nachleser',
          zug: 'einschraenken',
          text: 'Im Auslieferungszustand ist sie zwar aktiviert, aber noch nicht nutzbar.',
          quelleId: 'bsi-online-ausweisfunktion',
          belegId: 'aktiviert-aber-nicht-nutzbar',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'falscherschluss', text: 'Watt? Aktiviert und trotzdem nicht?' },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'stutzen', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'bsi-online-ausweisfunktion',
      belegId: 'transport-pin-aendern',
      sprechtext:
        'Erst mit der Änderung der fünfstelligen Transport-PIN in eine sechsstellige wird sie freigeschaltet. Die stand in dem Brief? Der Brief, den du weggeworfen hast.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Erst mit der Änderung der fünfstelligen Transport-PIN in eine sechsstellige wird sie freigeschaltet.',
          quelleId: 'bsi-online-ausweisfunktion',
          belegId: 'transport-pin-aendern',
        },
        { sprecher: 'zeiger', zug: 'einlenken', machart: 'rueckfrage', text: 'Die stand in dem Brief?' },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'nebenbemerkung',
          text: 'Der Brief, den du weggeworfen hast.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'ansprechen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Ohne die neue PIN nützt kein Gerät.',
      sprechtext: 'Und jetzt? Du änderst die Transport-PIN, dann läuft es. Ich habe die ganze Zeit nach dem falschen Ding gesucht.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und jetzt?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Du änderst die Transport-PIN, dann läuft es.',
          quelleId: 'bsi-online-ausweisfunktion',
          belegId: 'transport-pin-aendern',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'gestaendnis',
          text: 'Ich habe die ganze Zeit nach dem falschen Ding gesucht.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'ansprechen',
        nach: 'erklaeren',
        gegenueber: { von: 'nachdenken', nach: 'ruhe' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „wo kriege ich ein Lesegerät her" die Frage, die am Thema vorbeigeht — das Gerät liegt längst in seiner Hand.',
    },
  ],

  quellenIds: ['bsi-online-ausweisfunktion'],

  texte: {
    tiktok: {
      titel: 'Watti sucht das falsche Gerät',
      beschreibung: 'Online Ausweis: Was seit 2017 gilt und woran es wirklich hängt.',
      hashtags: ['#onlineausweis', '#technikwissen', '#behoerde', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Watti sucht das falsche Gerät',
      beschreibung: 'Online Ausweis: „Seit 2017 werden alle Ausweise mit standardmäßig aktivierter Online-Ausweisfunktion ausgegeben", schreibt das BSI.',
      hashtags: ['#onlineausweis', '#technikwissen', '#personalausweis', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Aktiviert und trotzdem nicht nutzbar',
      beschreibung: 'Online Ausweis: Was das BSI zu Lesegerät, Freischaltung und Transport-PIN schreibt.',
      hashtags: ['#onlineausweis', '#technikwissen', '#nfc', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
