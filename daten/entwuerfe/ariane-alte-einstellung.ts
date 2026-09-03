import type { Short } from '../../src/typen';

/**
 * Das gibt es wirklich · die Funktion, die nach dem Start nichts mehr zu tun
 * hatte.
 *
 * **Szenario 1, zweites Beispiel: Volti belehrt Watti.** Der Normalfall des
 * Kanals, und er braucht keine weiteren Belege dafuer, dass er funktioniert —
 * er braucht Konkurrenz im Gegenstand. Deshalb hier `raumfahrt` statt
 * Verbraucherrecht.
 *
 * **Zwei Quellen, weil eine allein nicht traegt.** Die ESA-Pressemitteilung
 * hat die 37 Sekunden und die Alignment-Funktion; die Ariane-4-Uebernahme, die
 * Zahlenkonvertierung und die Explosion stehen nur im Volltext des Berichts.
 * Der liegt bei der University of Minnesota — **und zwar unter
 * `www-users.cse.umn.edu`, nicht unter `ima.umn.edu`**: Dieselbe Datei, aber
 * nur die erste Adresse laesst sich von `quellen-pruefen` abrufen.
 *
 * **Befund 43 steckt in der Kipppunkt-Szene.** Ich hatte Wattis Frage „Wegen
 * einer alten Einstellung?" mit einem neuen Satz beantwortet, der das Wort
 * vermied. Emirhans Einwand: *„Kann Volti nicht einfach sagen: ja, wegen einer
 * alten Einstellung, die nur vor dem Start etwas tut."* Das „ja" plus die
 * Wiederholung von Wattis eigenem Wort ist die Antwort; ein Synonym
 * auszuweichen macht daraus eine zweite Behauptung.
 *
 * **Und Befund 44:** „Lief sie weiter und dann boom." stand vorher als „Lief
 * sie weiter. Nichts mehr zu tun, und trotzdem an." — zwei knappe
 * Aussagesaetze sind Schriftsprache, ein Geraeusch ist gesprochen.
 */
export const arianeAlteEinstellung: Short = {
  id: 'ariane-alte-einstellung',
  themaId: 'ariane-siebenunddreissig-sekunden',
  format: 'gibtswirklich',
  sachgebiet: 'raumfahrt',
  bauform: 'zitatkarte',
  arbeitstitel: 'Wattis Umzug sprengt eine Rakete',
  weitererzaehlt: '37 Sekunden nach der Zündung',
  suchbegriff: 'Ariane 5',
  kaltstart: {
    art: 'stolzerfehler',
    satz: 'Beim Handywechsel hab ich einfach alles vom alten übernommen.',
    buehne: { art: 'figur', wer: 'zeiger', von: 'ruhe', nach: 'zeigen', requisite: 'karton' },
  },
  vorspann: 'Wattis Umzug sprengt eine Rakete',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext:
        'Watti, du hast beim Handywechsel echt alles übernommen? Jede App, jede Einstellung. Warum zweimal einrichten?',
      rede: [
        { sprecher: 'nachleser', zug: 'nachhaken', text: 'Watti, du hast beim Handywechsel echt alles übernommen?' },
        {
          sprecher: 'zeiger',
          zug: 'beantworten',
          text: 'Jede App, jede Einstellung. Warum zweimal einrichten?',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'zeigen',
        nach: 'achselzucken',
        gegenueber: { von: 'ruhe', nach: 'stutzen' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'umn-ariane-bericht',
      belegId: 'sri-gleich-wie-ariane-4',
      herausgeber: 'Douglas N. Arnold, University of Minnesota',
      sprechtext:
        'Genau das haben sie bei der Ariane 5 gemacht. Bei der Ariane 5, der Rakete? Die Steuerung kam unverändert aus der Ariane 4.',
      rede: [
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Genau das haben sie bei der Ariane 5 gemacht.',
          quelleId: 'umn-ariane-bericht',
          belegId: 'sri-gleich-wie-ariane-4',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', machart: 'rueckfrage', text: 'Bei der Ariane 5, der Rakete?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Die Steuerung kam unverändert aus der Ariane 4.',
          quelleId: 'umn-ariane-bericht',
          belegId: 'sri-gleich-wie-ariane-4',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'achselzucken',
        nach: 'stutzen',
        gegenueber: { von: 'stutzen', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      quelleId: 'esa-ariane-501',
      belegId: 'siebenunddreissig-sekunden',
      sprechtext:
        'Und? 37 Sekunden nach der Zündung war die Bahn weg. Danach ist sie explodiert.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: '37 Sekunden nach der Zündung war die Bahn weg.',
          quelleId: 'esa-ariane-501',
          belegId: 'siebenunddreissig-sekunden',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          text: 'Danach ist sie explodiert.',
          quelleId: 'umn-ariane-bericht',
          belegId: 'broke-up-and-exploded',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'stutzen',
        nach: 'staunen',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      art: 'zitatkarte',
      position: 'kipppunkt',
      zitat: 'served a purpose only before lift-off (but remained operative afterwards)',
      quelleId: 'esa-ariane-501',
      belegId: 'purpose-only-before-liftoff',
      sprechtext:
        'Wegen einer alten Einstellung? Ja, wegen einer alten Einstellung, die nur vor dem Start etwas tut. Und was war nach dem Start damit? Lief sie weiter. Und rechnete eine Zahl aus, die nicht mehr ins Feld passte. Und dann boom.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Wegen einer alten Einstellung?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Ja, wegen einer alten Einstellung, die nur vor dem Start etwas tut.',
          quelleId: 'esa-ariane-501',
          belegId: 'purpose-only-before-liftoff',
        },
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was war nach dem Start damit?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Lief sie weiter. Und rechnete eine Zahl aus, die nicht mehr ins Feld passte.',
          quelleId: 'umn-ariane-bericht',
          belegId: 'groesser-als-16-bit',
        },
        {
          sprecher: 'nachleser',
          zug: 'nachlegen',
          machart: 'banaleaufloesung',
          text: 'Und dann boom.',
          quelleId: 'umn-ariane-bericht',
          belegId: 'broke-up-and-exploded',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'staunen',
        nach: 'lesen',
        gegenueber: { von: 'zeigen', nach: 'erklaeren' },
      },
    },
    {
      art: 'text',
      position: 'kipppunkt',
      quelleId: 'esa-ariane-501',
      belegId: 'switch-off-after-liftoff',
      sprechtext:
        'Und was haben sie danach dagegen gemacht? Abschalten nach dem Abheben. Stand so in den Maßnahmen danach.',
      rede: [
        { sprecher: 'zeiger', zug: 'nachhaken', text: 'Und was haben sie danach dagegen gemacht?' },
        {
          sprecher: 'nachleser',
          zug: 'beantworten',
          text: 'Abschalten nach dem Abheben. Stand so in den Maßnahmen danach.',
          quelleId: 'esa-ariane-501',
          belegId: 'switch-off-after-liftoff',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'lesen',
        nach: 'nachdenken',
        gegenueber: { von: 'erklaeren', nach: 'zeigen' },
      },
    },
    {
      /*
       * **Befund 46: Der Schluss darf einfacher sein als die Pointe davor.**
       *
       * Hier stand „Und du hast 200 Apps, die alle noch vor dem Start denken."
       * — die Ruecklenkung auf die Rakete, also zweimal um die Ecke. Emirhans
       * Fassung trifft direkt. **Und Volti darf den letzten Satz haben**; der
       * Schluss muss nicht bei Watti liegen.
       *
       * Gestrichen ist Wattis „Eine davon weckt mich um 6." — *„weil er
       * wirklich unlustig ist."* Nicht gedreht, bis er sitzt: gestrichen.
       */
      art: 'schluss',
      position: 'nachschlag',
      satz: 'Eine Funktion, die nichts mehr zu tun hat, läuft trotzdem weiter.',
      sprechtext:
        'Eine halbe Rakete für einen Schalter, den keiner umgelegt hat. Und du hast 200 Apps, von denen du vielleicht 5 brauchst.',
      rede: [
        {
          sprecher: 'zeiger',
          zug: 'zuspitzen',
          machart: 'katastrophe',
          text: 'Eine halbe Rakete für einen Schalter, den keiner umgelegt hat.',
        },
        {
          sprecher: 'nachleser',
          zug: 'zuspitzen',
          machart: 'parallelbau',
          text: 'Und du hast 200 Apps, von denen du vielleicht 5 brauchst.',
        },
      ],
      buehne: {
        art: 'figur',
        wer: 'zeiger',
        von: 'nachdenken',
        nach: 'achselzucken',
        gegenueber: { von: 'zeigen', nach: 'ansprechen' },
      },
      rundlauf:
        'Beim zweiten Sehen weiß man beim ersten Satz schon, dass „einfach alles übernommen" der Fehler ist, den der Short erklärt.',
    },
  ],

  quellenIds: ['esa-ariane-501', 'umn-ariane-bericht'],

  texte: {
    tiktok: {
      titel: 'Wattis Umzug sprengt eine Rakete',
      beschreibung: 'Ariane 5 und eine alte Einstellung: Was 37 Sekunden nach der Zündung passierte.',
      hashtags: ['#ariane', '#raumfahrt', '#software', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Wattis Umzug sprengt eine Rakete',
      beschreibung: 'Ariane 5: Eine Funktion aus dem Vorgänger lief weiter, obwohl sie nichts mehr zu tun hatte.',
      hashtags: ['#ariane', '#raumfahrt', '#raketenstart', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Die Rakete und die alte Einstellung',
      beschreibung: 'Ariane 5, Flug 501: Was der Untersuchungsbericht der ESA über die Alignment-Funktion schreibt.',
      hashtags: ['#ariane', '#raumfahrt', '#esa', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
