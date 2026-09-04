import type { Short } from "../../src/typen";

/**
 * Wer hat recht? · Verboten ist nicht das Handy, sondern die Funktion.
 *
 * **Szenario 6, viertes Beispiel: Beide liegen daneben.** Watti haelt jede
 * Blitzer-App fuer verboten, Volti haelt den Beifahrersitz fuer den Ausweg —
 * und § 23 Absatz 1c StVO redet von keinem von beiden. Er unterscheidet
 * **Geraete, die dafuer bestimmt sind** (Satz 1 und 2: nicht einmal
 * betriebsbereit mitfuehren) von **Geraeten mit mehreren Zwecken** (Satz 3: nur
 * die Funktion darf nicht laufen). Ein Sitzplatz kommt darin nicht vor.
 *
 * **Der erste Bau ohne Zitatkarte in diesem Szenario.** Die drei vorhandenen
 * Beispiele tragen alle eine; hier laeuft der Beleg gesprochen und ueber die
 * Herausgeberzeile. Ein Vorrat, der viermal denselben Weg zeigt, ist eine
 * Schablone mit vier Beispielen.
 */
export const blitzerApp: Short = {
  id: "blitzer-app",
  themaId: "blitzer-app-verboten",
  format: "werhatrecht",
  sachgebiet: "fahren",
  bauform: "wechselrede",
  arbeitstitel: "Watti löscht eine App, die er behalten dürfte",
  weitererzaehlt: "nicht mal betriebsbereit mitführen",
  suchbegriff: "Blitzer App",
  kaltstart: {
    art: "imvollzug",
    satz: "Ich lösche die Blitzer-App. Nicht dass ich noch Punkte kriege.",
    buehne: {
      art: "figur",
      wer: "zeiger",
      von: "ruhe",
      nach: "nachdenken",
      requisite: "gesetzbuch",
    },
  },
  vorspann: "Wattis Blitzer-App stirbt umsonst",

  szenen: [
    {
      art: "text",
      position: "aufschlag",
      sprechtext:
        "Watti, warum löschst du deine Blitzer-App? Weil die verboten ist. Verboten sind die Kästen am Armaturenbrett. Deine App nicht.",
      rede: [
        {
          sprecher: "nachleser",
          zug: "nachhaken",
          text: "Watti, warum löschst du deine Blitzer-App?",
        },
        {
          sprecher: "zeiger",
          zug: "beantworten",
          text: "Weil die verboten ist.",
        },
        {
          sprecher: "nachleser",
          zug: "einschraenken",
          text: "Verboten sind die Kästen am Armaturenbrett. Deine App nicht.",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "nachdenken",
        nach: "stutzen",
        gegenueber: { von: "ruhe", nach: "erklaeren" },
      },
    },
    {
      art: "text",
      position: "zuspitzung",
      quelleId: "stvo-23-blitzerwarner",
      belegId: "nicht-betreiben-oder-mitfuehren",
      herausgeber: "Bundesministerium der Justiz",
      sprechtext:
        "Wer hat jetzt recht? Keiner von uns beiden. Es hängt am Gerät und an der Funktion. Was steht denn da?",
      rede: [
        { sprecher: "zeiger", zug: "nachhaken", text: "Wer hat jetzt recht?" },
        {
          sprecher: "nachleser",
          zug: "richtigstellen",
          text: "Keiner von uns beiden. Es hängt am Gerät und an der Funktion.",
          quelleId: "stvo-23-blitzerwarner",
          belegId: "nicht-betreiben-oder-mitfuehren",
        },
        { sprecher: "zeiger", zug: "nachhaken", text: "Was steht denn da?" },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "stutzen",
        nach: "hochschauen",
        gegenueber: { von: "erklaeren", nach: "lesen" },
      },
    },
    {
      art: "text",
      position: "zuspitzung",
      quelleId: "stvo-23-blitzerwarner",
      belegId: "nicht-betreiben-oder-mitfuehren",
      sprechtext:
        "Wer fährt, darf ein Gerät nicht mal betriebsbereit mitführen, wenn es dafür gebaut ist. Also doch löschen! Nein.",
      rede: [
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Wer fährt, darf ein Gerät nicht mal betriebsbereit mitführen, wenn es dafür gebaut ist.",
          quelleId: "stvo-23-blitzerwarner",
          belegId: "nicht-betreiben-oder-mitfuehren",
        },
        {
          sprecher: "zeiger",
          zug: "zuspitzen",
          machart: "uebercompliance",
          text: "Also doch löschen!",
        },
        { sprecher: "nachleser", zug: "widersprechen", text: "Nein." },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "hochschauen",
        nach: "zeigen",
        gegenueber: { von: "lesen", nach: "erklaeren" },
      },
    },
    {
      art: "text",
      position: "kipppunkt",
      quelleId: "stvo-23-blitzerwarner",
      belegId: "insbesondere-radarwarner",
      sprechtext:
        "Dafür gebaut ist zum Beispiel ein Radarwarner. Und mein Handy?",
      rede: [
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Dafür gebaut ist zum Beispiel ein Radarwarner.",
          quelleId: "stvo-23-blitzerwarner",
          belegId: "insbesondere-radarwarner",
        },
        {
          sprecher: "zeiger",
          zug: "nachhaken",
          machart: "rueckfrage",
          text: "Und mein Handy?",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "zeigen",
        nach: "stutzen",
        gegenueber: { von: "erklaeren", nach: "zeigen" },
      },
    },
    {
      art: "text",
      position: "kipppunkt",
      quelleId: "stvo-23-blitzerwarner",
      belegId: "andere-geraete-nur-funktion",
      sprechtext:
        "Dein Handy kann auch telefonieren. Da darf die Funktion nicht laufen. Also das Handy bleibt, die App bleibt, und ich mache sie nicht an.",
      rede: [
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Dein Handy kann auch telefonieren. Da darf die Funktion nicht laufen.",
          quelleId: "stvo-23-blitzerwarner",
          belegId: "andere-geraete-nur-funktion",
        },
        {
          sprecher: "zeiger",
          zug: "einlenken",
          machart: "falscherschluss",
          text: "Also das Handy bleibt, die App bleibt, und ich mache sie nicht an.",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "stutzen",
        nach: "staunen",
        gegenueber: { von: "zeigen", nach: "lesen" },
      },
    },
    {
      art: "schluss",
      position: "nachschlag",
      satz: "Der Paragraf trennt gebaute Warngeräte von Geräten, die es auch können.",
      sprechtext:
        "Und wenn du fährst und ich mache sie an? Dann redet der Paragraf von mir. Dann fahre ich ab jetzt immer bei dir mit.",
      rede: [
        {
          sprecher: "zeiger",
          zug: "nachhaken",
          text: "Und wenn du fährst und ich mache sie an?",
        },
        {
          sprecher: "nachleser",
          zug: "einschraenken",
          machart: "banaleaufloesung",
          text: "Dann redet der Paragraf von mir.",
          quelleId: "stvo-23-blitzerwarner",
          belegId: "nicht-betreiben-oder-mitfuehren",
        },
        {
          sprecher: "zeiger",
          zug: "umdeuten",
          machart: "umdeutung",
          text: "Dann fahre ich ab jetzt immer bei dir mit.",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        /*
         * **Nicht `staunen`, seit dem 04.09.2026.** Im Schluss stehen die
         * Figuren auf 0,92 statt 0,73, und `staunen` greift dort 58,8 von 50
         * verfuegbaren Einheiten nach aussen — im fertigen Video fehlte Wattis
         * linke Hand. Der Schnitt aus der Kipppunktszene traegt den Sprung.
         */
        von: "nachdenken",
        nach: "stutzen",
        gegenueber: { von: "lesen", nach: "ansprechen" },
      },
      rundlauf:
        "Beim zweiten Sehen löscht Watti eine App, die nach dem Paragrafen gar nicht gemeint ist.",
    },
  ],

  quellenIds: ["stvo-23-blitzerwarner"],

  texte: {
    tiktok: {
      titel: "Watti löscht eine App, die er behalten dürfte",
      beschreibung:
        "Blitzer App: Beim Radarwarner das Gerät, beim Handy die Funktion.",
      hashtags: ["#blitzer", "#stvo", "#autofahren", "#ganzakkurat"],
    },
    instagram: {
      titel: "Watti löscht eine App, die er behalten dürfte",
      beschreibung:
        "Blitzer App: Der Paragraf trennt Radarwarner von Geräten, die es auch können.",
      hashtags: ["#blitzer", "#stvo", "#verkehrsrecht", "#ganzakkurat"],
    },
    youtube: {
      titel: "Löschen musst du die App nicht",
      beschreibung:
        "Blitzer App: Was § 23 Absatz 1c StVO über Geräte zur Anzeige von Verkehrsüberwachung sagt.",
      hashtags: ["#blitzer", "#stvo", "#recht", "#ganzakkurat"],
    },
  },

  kennzeichnung: { werbung: "keine", kiStimme: true },
};
