import type { Short } from '../../src/typen';

/**
 * Sonntag · Wer hat recht? · das WLAN, das abends langsam wird.
 *
 * Der einzige Sendeplatz, der **nicht** auf einer Pointe endet. Er endet auf
 * einer Restfrage, weil es sonst nichts zu kommentieren gibt — und Kommentare
 * sind bei Shorts ein Verteilungssignal.
 *
 * Die Bedingung des Formats ist streng und wird hier erfuellt: **Beide** Lager
 * uebersehen etwas. Wer den Router beschuldigt, uebersieht die Nachbarn; wer
 * den Anbieter beschuldigt, uebersieht, dass die Leitung im Haus endet.
 * Uebersehen haben es beide, weil das Dritte in einer Amtsblattverfuegung
 * steht und nicht im Werbeprospekt: Das Band ist rechtlich schutzlos.
 *
 * Waere die Aufloesung „Lager A hat recht", waere es ein Dienstag. Genau diese
 * Abgrenzung steht in `MATRIX`.
 *
 * Die Praemisse des Shorts — **abends** — hing bis zum 17.08.2026 an nichts.
 * Die Bundesnetzagentur schreibt ueber das Band, nicht ueber die Uhrzeit; erst
 * beim Eintragen der Fundstellen fiel auf, dass fuer den einzigen Zeitbezug
 * kein Satz da war. Er steht jetzt bei TP-Link, und das ist die zulaessige
 * Rollenteilung: Ein Anbieter ist eine gute Adresse fuer die Beobachtung, dass
 * abends alle gleichzeitig funken, und eine schlechte fuer die Frage, wer
 * daran schuld ist. Die traegt weiter die Behoerde.
 */
export const wlanAbends: Short = {
  id: 'wlan-abends',
  themaId: 'wlan-abendliche-verlangsamung',
  format: 'werhatrecht',
  sachgebiet: 'netz',
  arbeitstitel: 'Wer schuld ist, wenn das WLAN abends einbricht',
  weitererzaehlt: 'Das WLAN-Band ist rechtlich schutzlos — niemand garantiert dir dort irgendetwas.',

  szenen: [
    {
      art: 'text',
      position: 'aufschlag',
      sprechtext: 'Abends bricht das WLAN ein. Beide irren.',
      text: 'Abends bricht das WLAN ein.',
    },
    {
      art: 'vergleich',
      position: 'zuspitzung',
      sprechtext: 'Die einen sagen, der Router ist zu alt. Die anderen sagen, der Anbieter drosselt.',
      ueberschrift: 'Zwei Lager',
      quelleId: 'bnetza-wlan-24ghz-allgemeinzuteilung',
      belegId: 'es-besteht-kein-schutz',
      links: { titel: 'Der Router', zeilen: ['zu alt', 'zu billig'], bewertung: 'achtung' },
      rechts: { titel: 'Der Anbieter', zeilen: ['drosselt abends', 'überbucht'], bewertung: 'achtung' },
    },
    {
      art: 'text',
      position: 'zuspitzung',
      sprechtext: 'Beide reden über Geräte. Abends sind aber alle gleichzeitig online.',
      text: 'Abends sind alle gleichzeitig online.',
      quelleId: 'tplink-kapazitaet-abends',
      belegId: 'that-s-when-most',
    },
    {
      art: 'text',
      position: 'kipppunkt',
      sprechtext: 'Bei der Bundesnetzagentur steht: kein Schutz vor Beeinträchtigungen.',
      text: 'Kein Schutz vor anderen.',
      hervorhebung: 'Kein Schutz',
      quelleId: 'bnetza-wlan-24ghz-allgemeinzuteilung',
      belegId: 'es-besteht-kein-schutz',
      herausgeber: 'Bundesnetzagentur',
    },
    {
      art: 'einschraenkung',
      position: 'kipppunkt',
      sprechtext: 'Und weiter: keine Gewähr für eine Mindestqualität.',
      ueberschrift: 'Derselbe Text, zwei Zeilen weiter',
      bedingung: 'Keine Gewähr für eine Mindestqualität',
      folge: 'Abends senden im selben Band alle Nachbarn mit',
      quelleId: 'bnetza-wlan-24ghz-allgemeinzuteilung',
      belegId: 'die-bundesnetzagentur-u-bernimmt',
    },
    {
      art: 'schluss',
      position: 'nachschlag',
      sprechtext: 'Wen verklagst du also? Schreib es in die Kommentare.',
      satz: 'Wen verklagst du also?',
    },
  ],

  quellenIds: ['bnetza-wlan-24ghz-allgemeinzuteilung', 'tplink-kapazitaet-abends'],

  texte: {
    tiktok: {
      titel: 'Weder Router noch Anbieter sind schuld',
      beschreibung: '',
      hashtags: ['#wlan', '#internet', '#technik', '#ganzakkurat'],
    },
    instagram: {
      titel: 'Weder Router noch Anbieter sind schuld',
      beschreibung: '',
      hashtags: ['#wlan', '#internet', '#technik', '#ganzakkurat'],
    },
    youtube: {
      titel: 'Weder Router noch Anbieter sind schuld',
      beschreibung: '',
      hashtags: ['#wlan', '#internet', '#technik', '#ganzakkurat'],
    },
  },

  kennzeichnung: { werbung: 'keine', kiStimme: true },
};
