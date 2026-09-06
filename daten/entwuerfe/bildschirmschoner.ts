import type { Short } from '../../src/typen';

/**
 * Es war einmal · Der Bildschirmschoner hat wirklich einmal geschont.
 *
 * **Das Märchen ist einmal wahr gewesen, und genau das macht es zu einem.**
 * Der Name ist geblieben, die Aufgabe nicht.
 *
 * **Der Short behauptet die Röhre nicht, er gibt sie weiter.** Wattis Satz
 * endet auf „sagt unser Vater" — der `belegpruefer` hat den ersten Anlauf
 * daran zerlegt: „Bei Röhren brannte sich das Bild ein." steht im Indikativ,
 * beantwortet eine Sachfrage und ist damit eine Tatsachenbehauptung, die keine
 * Quelle traegt. Die Positionsbefreiung des Aufschlags deckt **Pointen, nicht
 * Behauptungen**. Mit der Zuschreibung stimmt auch die Machart wieder: `falsche
 * Autoritaet` ist genau das, was Watti hier auffuehrt.
 *
 * **Das „und heute" steht schwarz auf weiß beim Umweltbundesamt:** „Verzichten
 * Sie auf Bildschirmschoner. Sie sind zwar hübsch, aber benötigen mehr Strom,
 * als wenn der Bildschirm bei Inaktivität einfach abgeblendet wird und der
 * Computer in den Ruhemodus geht." Was den Bildschirm einmal geschont hat,
 * kostet heute mehr als das Nichtstun.
 *
 * **Die Röhre steht im Aufschlag und nur dort.** Das ist keine Bequemlichkeit,
 * sondern die Regel: Der Aufschlag setzt die Erzählung und behauptet nichts —
 * er ist die einzige Position ohne Belegpflicht. Für das Einbrennen bei
 * Kathodenstrahlröhren liegt keine geprüfte Quelle vor, und der Short braucht
 * auch keine: Er handelt nicht davon, dass es früher stimmte, sondern davon,
 * was heute gilt.
 *
 * **Die dritte Station ist ein zweites Märchen aus derselben Quelle.** Wattis
 * „Ich stelle einfach alles auf schwarz" ist der Dunkelmodus-Mythos, und das
 * Umweltbundesamt beantwortet ihn im selben Absatz: Bei LCD leuchtet der
 * Hintergrund ständig, und ob die Pixel hell oder dunkel sind, ändert am
 * Verbrauch nichts. **Zwei Märchen mit derselben Ursache — der Bildschirm ist
 * nicht mehr das, was er einmal war.**
 *
 * **Format `eswareinmal`, und das war am 06.09.2026 der eigentliche Anlass.**
 * Von 31 ungesendeten Entwürfen stand kein einziger in diesem Format, während
 * `gibtswirklich` bei 15 lag. Der Bauformengpass war am selben Tag erledigt,
 * der Formatengpass nicht.
 */
export const bildschirmschoner: Short = {
  id: 'bildschirmschoner',
  themaId: 'bildschirmschoner-schont-nichts',
  format: 'eswareinmal',
  sachgebiet: 'bildschirm',
  bauform: 'stationen',
  arbeitstitel: 'Wattis Toaster fliegt für nichts',
  weitererzaehlt: 'Er braucht mehr Strom als Abblenden und Ruhemodus',
  suchbegriff: 'Bildschirmschoner Strom',
  kaltstart: {
    art: 'gewissheit',
    satz: 'Bildschirmschoner an. Dann hält mein Monitor länger.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'fernseher' },
  },
  vorspann: 'Wattis Toaster fliegt über den Monitor',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, warum fliegt da ein Toaster über den Monitor? Bildschirmschoner. Bei Röhren brannte sich das Bild ein, sagt unser Vater.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachhaken',
          text: 'Watti, warum fliegt da ein Toaster über den Monitor?',
        },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          machart: 'falscheautoritaet',
          text: 'Bildschirmschoner. Bei Röhren brannte sich das Bild ein, sagt unser Vater.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'uba-computer-nutzung',
      belegId: 'verzichten-sie-auf-bildschirmschoner',
      herausgeber: 'Umweltbundesamt',
      sprechtext:
        'Er braucht mehr Strom als Abblenden und Ruhemodus. Mehr Strom? Der spart doch. Nichts spart er. Er malt.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Er braucht mehr Strom als Abblenden und Ruhemodus.',
          quelleId: 'uba-computer-nutzung',
          belegId: 'verzichten-sie-auf-bildschirmschoner',
        },
        {
          sprecher: 'zeiger',
          zug: 'nachhaken',
          machart: 'ratlosigkeit',
          text: 'Mehr Strom? Der spart doch.',
        },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Nichts spart er. Er malt.',
          quelleId: 'uba-computer-nutzung',
          belegId: 'verzichten-sie-auf-bildschirmschoner',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'stutzen',
        nach: 'erklaeren',
        gegenueber: { von: 'erklaeren', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'uba-computer-nutzung',
      belegId: 'ruhezustand-paar-watt',
      sprechtext:
        'Und was zieht der Ruhemodus? Ein moderner PC mit Monitor braucht im Ruhezustand nur noch ein paar Watt. Dann lasse ich den Rechner ganz aus.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was zieht der Ruhemodus?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ein moderner PC mit Monitor braucht im Ruhezustand nur noch ein paar Watt.',
          quelleId: 'uba-computer-nutzung',
          belegId: 'ruhezustand-paar-watt',
        },
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'katastrophe',
          text: 'Dann lasse ich den Rechner ganz aus.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'zeigen',
        gegenueber: { von: 'staunen', nach: 'nachdenken' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'uba-computer-nutzung',
      belegId: 'lcd-hintergrund-staendig-beleuchtet',
      sprechtext:
        'Oder ich stelle einfach alles auf schwarz. Bei einem LCD leuchtet der Hintergrund, solange der Bildschirm an ist, du Pfosten. Und die schwarzen Pixel? Die ändern am Verbrauch nichts.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'umdeuten',
          machart: 'umdeutung',
          text: 'Oder ich stelle einfach alles auf schwarz.',
        },
        {
          sprecher: 'nachleser',
          zug: 'richtigstellen',
          text: 'Bei einem LCD leuchtet der Hintergrund, solange der Bildschirm an ist, du Pfosten.',
          quelleId: 'uba-computer-nutzung',
          belegId: 'lcd-hintergrund-staendig-beleuchtet',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und die schwarzen Pixel?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die ändern am Verbrauch nichts.',
          quelleId: 'uba-computer-nutzung',
          belegId: 'pixel-hell-oder-dunkel-egal',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'zeigen',
        nach: 'erklaeren',
        gegenueber: { von: 'nachdenken', nach: 'staunen' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'uba-computer-nutzung',
      belegId: 'verzichten-sie-auf-bildschirmschoner',
      sprechtext:
        'Und was sagt man heute dazu? Verzichten Sie auf Bildschirmschoner. So steht es beim Umweltbundesamt. Also schont mein Toaster gar nichts. Du hast ihn eingestellt, als der Monitor neu war.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was sagt man heute dazu?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Verzichten Sie auf Bildschirmschoner. So steht es beim Umweltbundesamt.',
          quelleId: 'uba-computer-nutzung',
          belegId: 'verzichten-sie-auf-bildschirmschoner',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'gestaendnis',
          text: 'Also schont mein Toaster gar nichts.',
        },
        {
          sprecher: 'nachleser',
          zug: 'erinnern',
          machart: 'banaleaufloesung',
          text: 'Du hast ihn eingestellt, als der Monitor neu war.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'erklaeren',
        nach: 'nachdenken',
        gegenueber: { von: 'staunen', nach: 'stutzen' },
      },
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Geschont wird, was ausgeht.',
      sprechtext:
        'Ich stelle den Toaster auf zehn Sekunden. Dann fliegt er, während du davorsitzt. Er ist das Einzige hier, was fliegt.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'uebercompliance',
          text: 'Ich stelle den Toaster auf zehn Sekunden.',
        },
        {
          sprecher: 'nachleser',
          zug: 'widersprechen',
          text: 'Dann fliegt er, während du davorsitzt.',
        },
        {
          sprecher: 'zeiger',
          zug: 'einlenken',
          machart: 'rechtfertigung',
          text: 'Er ist das Einzige hier, was fliegt.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'nachleser',
        von: 'nachdenken',
        nach: 'ansprechen',
        gegenueber: { von: 'stutzen', nach: 'ruhe' },
      },
      rundlauf:
        'Beim zweiten Sehen ist „dann hält mein Monitor länger" der Satz, den der Short gerade widerlegt hat — und Watti sagt ihn wieder.',
    },
  ],

  quellenIds: ['uba-computer-nutzung'],

  texte: {
    tiktok: {
      titel: 'Wattis Toaster fliegt für nichts über den Monitor',
      beschreibung:
        'Bildschirmschoner und Strom: Was er einmal geschont hat und was er heute kostet.',
      hashtags: ['#bildschirmschoner', '#technikwissen', '#stromsparen', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Toaster fliegt für nichts über den Monitor',
      beschreibung:
        'Bildschirmschoner und Strom: Das Umweltbundesamt rät ab — abblenden und Ruhemodus sind sparsamer.',
      hashtags: ['#bildschirmschoner', '#monitor', '#energiesparen', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Wattis Bildschirmschoner schont nichts mehr',
      beschreibung:
        'Bildschirmschoner und Strom: Warum das Umweltbundesamt abrät und der dunkle Modus bei LCD nichts spart.',
      hashtags: ['#bildschirmschoner', '#strom', '#technikwissen', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
