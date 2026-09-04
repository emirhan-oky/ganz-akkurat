import type { Short } from "../../src/typen";

/**
 * Das ist Absicht · Dreizehn Ausnahmen vom Widerrufsrecht, und Watti hat vier davon.
 *
 * **Szenario 12, viertes Beispiel: Volti hat es aufgegeben.** Watti fragt sich
 * durch eine Liste, und die Liste ist echt: § 312g Absatz 2 BGB zaehlt dreizehn
 * Nummern auf. Das ist der Unterschied zu einem erfundenen Frageschwall —
 * **jede seiner Fragen hat wirklich eine eigene Nummer.**
 *
 * **Der Schluss ist nicht „Frag mich morgen nochmal".** Der steht schon in
 * `laptop-usb-c`, dem ersten Beispiel dieses Szenarios; ein Vorrat mit
 * demselben Ausstieg viermal ist eine Schablone mit vier Beispielen. Hier dreht
 * Watti stattdessen durch und behaelt alles.
 *
 * **Die Ausnahmen sind abdingbar, und das steht im Dialog.** „soweit die
 * Parteien nichts anderes vereinbart haben" ist der Einleitungssatz des
 * Absatzes — ein Haendler darf grosszuegiger sein, und viele sind es.
 */
export const vierPaketeZurueck: Short = {
  id: "vier-pakete-zurueck",
  themaId: "widerruf-ausnahmen",
  format: "absicht",
  sachgebiet: "recht",
  bauform: "stationen",
  arbeitstitel: "Watti schickt fünf Pakete zurück und behält alles",
  weitererzaehlt: "Folie ab, Widerruf weg",
  suchbegriff: "Widerruf Ausnahmen",
  kaltstart: {
    art: "gewissheit",
    satz: "Fünf Pakete, alles geht zurück. So läuft das online.",
    buehne: {
      art: "figur",
      wer: "zeiger",
      von: "ruhe",
      nach: "zeigen",
      requisite: "koffer",
    },
  },
  vorspann: "Wattis fünf Pakete gehen zurück",

  szenen: [
    {
      art: "text",
      position: "aufschlag",
      sprechtext:
        "Watti, was ist in den fünf Paketen? Bohrmaschine, Kopfhörer, Spiele-CD, Kaffee und mein Namensschild.",
      rede: [
        {
          sprecher: "nachleser",
          zug: "nachhaken",
          text: "Watti, was ist in den fünf Paketen?",
        },
        {
          sprecher: "zeiger",
          zug: "beantworten",
          text: "Bohrmaschine, Kopfhörer, Spiele-CD, Kaffee und mein Namensschild.",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "zeigen",
        nach: "stutzen",
        gegenueber: { von: "ruhe", nach: "erklaeren" },
      },
    },
    {
      art: "text",
      position: "zuspitzung",
      quelleId: "bgb-312g-ausnahmen",
      belegId: "versiegelt-hygiene",
      herausgeber: "Bundesministerium der Justiz",
      sprechtext:
        "Die Bohrmaschine kannst du zurückschicken. Und die Kopfhörer, wo ich die Folie abgemacht habe? Versiegelte Ware aus Hygienegründen. Folie ab, Widerruf weg.",
      rede: [
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Die Bohrmaschine kannst du zurückschicken.",
        },
        {
          sprecher: "zeiger",
          zug: "nachhaken",
          text: "Und die Kopfhörer, wo ich die Folie abgemacht habe?",
        },
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Versiegelte Ware aus Hygienegründen. Folie ab, Widerruf weg.",
          quelleId: "bgb-312g-ausnahmen",
          belegId: "versiegelt-hygiene",
        },
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
      quelleId: "bgb-312g-ausnahmen",
      belegId: "versiegelte-software",
      sprechtext:
        "Und die Spiele-CD? Auch versiegelt gewesen. Auch weg. Und der Kaffee, der bald abläuft?",
      rede: [
        { sprecher: "zeiger", zug: "nachhaken", text: "Und die Spiele-CD?" },
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Auch versiegelt gewesen. Auch weg.",
          quelleId: "bgb-312g-ausnahmen",
          belegId: "versiegelte-software",
        },
        {
          sprecher: "zeiger",
          zug: "nachhaken",
          text: "Und der Kaffee, der bald abläuft?",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "stutzen",
        nach: "zeigen",
        gegenueber: { von: "lesen", nach: "erklaeren" },
      },
    },
    {
      art: "text",
      position: "zuspitzung",
      quelleId: "bgb-312g-ausnahmen",
      belegId: "schnell-verderblich",
      sprechtext:
        "Watti, das ist die dritte Frage. Ich frag doch nur. Schnell verderbliche Ware. Auch nicht. Und mein Namensschild für die Tür?",
      rede: [
        {
          sprecher: "nachleser",
          zug: "abbiegen",
          machart: "nebenbemerkung",
          text: "Watti, das ist die dritte Frage.",
        },
        {
          sprecher: "zeiger",
          zug: "beantworten",
          machart: "rechtfertigung",
          text: "Ich frag doch nur.",
        },
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Schnell verderbliche Ware. Auch nicht.",
          quelleId: "bgb-312g-ausnahmen",
          belegId: "schnell-verderblich",
        },
        {
          sprecher: "zeiger",
          zug: "nachhaken",
          text: "Und mein Namensschild für die Tür?",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "zeigen",
        nach: "nachdenken",
        gegenueber: { von: "erklaeren", nach: "zeigen" },
      },
    },
    {
      art: "zitatkarte",
      position: "kipppunkt",
      zitat:
        "Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl",
      quelleId: "bgb-312g-ausnahmen",
      belegId: "individuell-angefertigt",
      sprechtext:
        "Da steht dein Name drauf. Also auch nicht? Individuell angefertigt. Das steht ganz oben in der Liste. Dreizehn Ausnahmen?",
      rede: [
        {
          sprecher: "nachleser",
          zug: "nachhaken",
          machart: "widerhaken",
          text: "Da steht dein Name drauf.",
        },
        { sprecher: "zeiger", zug: "nachhaken", text: "Also auch nicht?" },
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Individuell angefertigt. Das steht ganz oben in der Liste.",
          quelleId: "bgb-312g-ausnahmen",
          belegId: "individuell-angefertigt",
        },
        {
          sprecher: "zeiger",
          zug: "nachhaken",
          machart: "katastrophe",
          text: "Dreizehn Ausnahmen?",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "nachdenken",
        nach: "staunen",
        gegenueber: { von: "zeigen", nach: "lesen" },
      },
    },
    {
      art: "schluss",
      position: "nachschlag",
      satz: "Ein Händler darf mehr zurücknehmen, als das Gesetz verlangt — viele tun es.",
      sprechtext:
        "Dreizehn. Dein Händler darf trotzdem alles zurücknehmen, steht im selben Satz. Dann frage ich den. Watti.",
      rede: [
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Dreizehn. Dein Händler darf trotzdem alles zurücknehmen, steht im selben Satz.",
          quelleId: "bgb-312g-ausnahmen",
          belegId: "soweit-nichts-anderes-vereinbart",
        },
        { sprecher: "zeiger", zug: "einlenken", text: "Dann frage ich den." },
        {
          sprecher: "nachleser",
          zug: "zuspitzen",
          machart: "banaleaufloesung",
          text: "Watti.",
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
        von: "stutzen",
        nach: "nachdenken",
        gegenueber: { von: "lesen", nach: "ansprechen" },
      },
      rundlauf:
        'Beim zweiten Sehen ist „alles geht zurück" der Satz von jemandem, der vier von dreizehn Ausnahmen im Stapel hat.',
    },
  ],

  quellenIds: ["bgb-312g-ausnahmen"],

  texte: {
    tiktok: {
      titel: "Watti schickt fünf Pakete zurück und behält alles",
      beschreibung:
        "Widerruf und Ausnahmen: Dreizehn Fälle, in denen das Rückgaberecht nicht gilt.",
      hashtags: [
        "#widerruf",
        "#onlineshopping",
        "#verbraucherrechte",
        "#ganzakkurat",
      ],
    },
    instagram: {
      titel: "Watti schickt fünf Pakete zurück und behält alles",
      beschreibung:
        "Widerruf und Ausnahmen: Folie ab, Widerruf weg — und zwölf weitere Fälle.",
      hashtags: ["#widerruf", "#onlineshopping", "#bgb", "#ganzakkurat"],
    },
    youtube: {
      titel: "Dreizehn Fälle, in denen der Widerruf nicht gilt",
      beschreibung:
        "Widerruf und Ausnahmen: Was § 312g Absatz 2 BGB vom Widerrufsrecht ausnimmt.",
      hashtags: ["#widerruf", "#bgb", "#onlineshopping", "#ganzakkurat"],
    },
  },

  kennzeichnung: { werbung: "keine", kiStimme: true },
};
