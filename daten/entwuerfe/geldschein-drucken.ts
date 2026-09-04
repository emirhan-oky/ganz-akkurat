import type { Short } from "../../src/typen";

/**
 * Das gibt es wirklich · Einen Geldschein drucken ist erlaubt, wenn er groesser wird.
 *
 * **Szenario 3, viertes Beispiel: Watti weiss etwas und schliesst falsch.** Und
 * zum ersten Mal in diesem Szenario traegt **Watti die Zitatkarte** — so, wie
 * das Szenariendokument es beschreibt und wie es keines der drei bisherigen
 * Beispiele macht. Er hat richtig gelesen und einen Absatz zu frueh aufgehoert;
 * Volti kontert mit dem Satz danach aus derselben Quelle.
 *
 * **Die Quelle ist die konsolidierte Fassung, und das war nicht egal.** Der
 * Beschluss EZB/2013/10 sagt in seiner Urfassung „Reproduktionen, die die
 * Oeffentlichkeit mit echten Euro-Banknoten verwechseln koennte, gelten als
 * unrechtmaessig" — ein Verbot mit unscharfem Rand. Seit der Aenderung von 2019
 * steht dort das Gegenteil einer Generalklausel: **unrechtmaessig ist, was die
 * Kriterien in Absatz 3 nicht erfuellt**, und verboten ist dann auch der blosse
 * **Besitz**. Es gibt eine Liste des Erlaubten, und genau davon handelt der
 * Short.
 *
 * Gefunden hat den Unterschied nicht die Ueberlegung, sondern der Abruf: Zwei
 * der sechs Zitate standen in der geltenden Fassung nicht mehr so da. **Zum
 * zweiten Mal an einem Tag** — bei `updates-vom-haendler` war es der falsche
 * Paragraf, hier die richtige Norm in der falschen Fassung.
 *
 * `quellen-pruefen` hat die konsolidierte Adressform dabei zuerst gar nicht
 * abgerufen: Das Regex schnitt den Stichtag hinter der CELEX-Nummer ab. Dritte
 * Schreibweise, derselbe Befund wie am 31.08.2026.
 */
export const geldscheinDrucken: Short = {
  id: "geldschein-drucken",
  themaId: "kopierer-geldscheine",
  format: "gibtswirklich",
  sachgebiet: "drucken",
  bauform: "stationen",
  arbeitstitel: "Watti darf Geld drucken, wenn er übertreibt",
  weitererzaehlt: "125 Prozent oder mehr",
  suchbegriff: "Geldschein drucken",
  kaltstart: {
    art: "gewissheit",
    satz: "Mein Drucker verweigert den Geldschein. Verboten ist eben verboten.",
    buehne: {
      art: "figur",
      wer: "zeiger",
      von: "ruhe",
      nach: "stutzen",
      requisite: "blatt",
    },
  },
  vorspann: "Wattis Drucker hat Angst vor Geld",

  szenen: [
    {
      art: "text",
      position: "aufschlag",
      sprechtext:
        "Watti, warum liegt ein Geldschein auf dem Drucker? Spieleabend. Unser Spielgeld ist weg, ich wollte welches drucken.",
      rede: [
        {
          sprecher: "nachleser",
          zug: "nachhaken",
          text: "Watti, warum liegt ein Geldschein auf dem Drucker?",
        },
        {
          sprecher: "zeiger",
          zug: "beantworten",
          text: "Spieleabend. Unser Spielgeld ist weg, ich wollte welches drucken.",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "stutzen",
        nach: "nachdenken",
        gegenueber: { von: "ruhe", nach: "zeigen" },
      },
    },
    {
      art: "text",
      position: "zuspitzung",
      quelleId: "ezb-reproduktion-banknoten",
      belegId: "kriterien-nicht-erfuellt-unrechtmaessig",
      herausgeber: "Europäische Zentralbank",
      sprechtext:
        "Und warum liegt der 50er noch da? Weil das verboten ist. Steht bei der Zentralbank, ich lese auch mal was.",
      rede: [
        {
          sprecher: "nachleser",
          zug: "nachhaken",
          text: "Und warum liegt der 50er noch da?",
        },
        {
          sprecher: "zeiger",
          zug: "beantworten",
          text: "Weil das verboten ist. Steht bei der Zentralbank, ich lese auch mal was.",
          quelleId: "ezb-reproduktion-banknoten",
          belegId: "kriterien-nicht-erfuellt-unrechtmaessig",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "nachdenken",
        nach: "lesen",
        gegenueber: { von: "zeigen", nach: "stutzen" },
      },
    },
    {
      art: "zitatkarte",
      position: "zuspitzung",
      zitat:
        "Reproduktionen, die den … Kriterien nicht entsprechen … Besitz … als verboten",
      quelleId: "ezb-reproduktion-banknoten",
      belegId: "herstellung-besitz-verboten",
      sprechtext:
        "Was steht da genau? Herstellung, Besitz, Transport, Verbreitung. Alles verboten. Besitz! Mein Fehldruck liegt noch im Drucker. Für deinen Ausdruck stimmt das sogar. Also fällt der Spieleabend aus.",
      rede: [
        {
          sprecher: "nachleser",
          zug: "nachhaken",
          text: "Was steht da genau?",
        },
        {
          sprecher: "zeiger",
          zug: "beantworten",
          text: "Herstellung, Besitz, Transport, Verbreitung. Alles verboten.",
          quelleId: "ezb-reproduktion-banknoten",
          belegId: "herstellung-besitz-verboten",
        },
        {
          sprecher: "zeiger",
          zug: "zuspitzen",
          machart: "katastrophe",
          text: "Besitz! Mein Fehldruck liegt noch im Drucker.",
        },
        /*
         * **Der Satz, der den Short gerettet hat.** Ohne ihn korrigierte Volti
         * eine Aussage, die richtig war: Wattis Ausdruck ist ein 50er in
         * Originalgroesse, steht unter keinem der sechs Buchstaben von Absatz 3
         * und ist damit unrechtmaessig. Der Absatz danach aendert daran nichts,
         * er eroeffnet nur einen anderen Weg.
         *
         * Szenario 3 heisst „Watti weiss etwas **und schliesst falsch**" — und
         * genau das war es dann nicht mehr, weil der Konter den Fakt traf statt
         * den Schluss. Jetzt gibt Volti ihm recht, und Watti liefert den
         * Fehlschluss selbst nach.
         */
        {
          sprecher: "nachleser",
          zug: "einschraenken",
          text: "Für deinen Ausdruck stimmt das sogar.",
          quelleId: "ezb-reproduktion-banknoten",
          belegId: "kriterien-nicht-erfuellt-unrechtmaessig",
        },
        {
          sprecher: "zeiger",
          zug: "zuspitzen",
          machart: "falscherschluss",
          text: "Also fällt der Spieleabend aus.",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "lesen",
        nach: "staunen",
        gegenueber: { von: "stutzen", nach: "nachdenken" },
      },
    },
    {
      art: "text",
      position: "zuspitzung",
      quelleId: "ezb-reproduktion-banknoten",
      belegId: "einseitig-125-oder-75",
      sprechtext:
        "Du hast einen Absatz zu früh aufgehört du Idiot. Was steht denn danach? Welche rechtmäßig sind. Einseitig gedruckt, 125 Prozent oder mehr, in Länge und Breite.",
      rede: [
        {
          sprecher: "nachleser",
          zug: "widersprechen",
          machart: "nebenbemerkung",
          text: "Du hast einen Absatz zu früh aufgehört du Idiot.",
        },
        {
          sprecher: "zeiger",
          zug: "nachhaken",
          text: "Was steht denn danach?",
        },
        /*
         * **Zwei Anteile statt einem, weil zwei Saetze der Norm dahinterstehen.**
         * „Rechtmaessig" ist die Rechtsfolge aus dem Einleitungssatz von
         * Absatz 3; die 125 % stehen im Buchstaben a darunter und tragen das
         * Wort selbst nicht. An eine `belegId` gebunden sah die Zeile gedeckt
         * aus, und die Haelfte, die die Erlaubnis behauptet, hing an einem
         * Zitat, das sie nicht enthaelt.
         */
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Welche rechtmäßig sind.",
          quelleId: "ezb-reproduktion-banknoten",
          belegId: "rechtmaessig-nach-kriterien",
        },
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Einseitig gedruckt, 125 Prozent oder mehr, in Länge und Breite.",
          quelleId: "ezb-reproduktion-banknoten",
          belegId: "einseitig-125-oder-75",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "staunen",
        nach: "stutzen",
        gegenueber: { von: "nachdenken", nach: "erklaeren" },
      },
    },
    {
      art: "zahl",
      position: "kipppunkt",
      wert: "125",
      einheit: "% oder mehr",
      bedeutung:
        "in Länge und Breite, einseitig gedruckt. Oder Abmessungen von höchstens 75 %.",
      quelleId: "ezb-reproduktion-banknoten",
      belegId: "einseitig-125-oder-75",
      sprechtext:
        "Größer? Ich wollte ihn kleiner machen. Kleiner geht auch. 75 Prozent oder weniger. Und dazwischen? Dazwischen hilft dir das Material. Was sich nicht wie Papier anfühlt, geht auch.",
      rede: [
        {
          sprecher: "zeiger",
          zug: "nachhaken",
          machart: "rueckfrage",
          text: "Größer? Ich wollte ihn kleiner machen.",
        },
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Kleiner geht auch. 75 Prozent oder weniger.",
          quelleId: "ezb-reproduktion-banknoten",
          belegId: "einseitig-125-oder-75",
        },
        { sprecher: "zeiger", zug: "nachhaken", text: "Und dazwischen?" },
        {
          sprecher: "nachleser",
          zug: "beantworten",
          text: "Dazwischen hilft dir das Material. Was sich nicht wie Papier anfühlt, geht auch.",
          quelleId: "ezb-reproduktion-banknoten",
          belegId: "material-unterscheidet-sich",
        },
      ],
      buehne: {
        art: "figur",
        wer: "zeiger",
        von: "stutzen",
        nach: "staunen",
        gegenueber: { von: "erklaeren", nach: "zeigen" },
      },
    },
    {
      art: "schluss",
      position: "nachschlag",
      satz: "Einseitig ab 125 Prozent in Länge und Breite. Die Größe ist nicht alles.",
      sprechtext:
        "Also drucke ich auf ein Handtuch. Und räum den Fehldruck weg, bevor du ihn besitzt.",
      rede: [
        {
          sprecher: "zeiger",
          zug: "einlenken",
          machart: "uebercompliance",
          text: "Also drucke ich auf ein Handtuch.",
        },
        {
          sprecher: "nachleser",
          zug: "zuspitzen",
          machart: "widerhaken",
          text: "Und räum den Fehldruck weg, bevor du ihn besitzt.",
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
        gegenueber: { von: "zeigen", nach: "ansprechen" },
      },
      rundlauf:
        'Beim zweiten Sehen ist „Verboten ist eben verboten" die Zeile eines Mannes, der die Liste des Erlaubten nicht kennt.',
    },
  ],

  quellenIds: ["ezb-reproduktion-banknoten"],

  texte: {
    tiktok: {
      titel: "Watti darf Geld drucken, wenn er übertreibt",
      beschreibung:
        "Geldschein drucken: Erlaubt ist es, wenn die Abbildung deutlich größer oder kleiner wird.",
      hashtags: ["#geldschein", "#drucken", "#recht", "#ganzakkurat"],
    },
    instagram: {
      titel: "Watti darf Geld drucken, wenn er übertreibt",
      beschreibung:
        "Geldschein drucken: Es gibt eine Liste des Erlaubten, und größer steht darauf.",
      hashtags: ["#geldschein", "#drucken", "#eu", "#ganzakkurat"],
    },
    youtube: {
      titel: "Geld drucken ist erlaubt, wenn du übertreibst",
      beschreibung:
        "Geldschein drucken: Was der Beschluss EZB/2013/10 über rechtmäßige Reproduktionen von Euro-Banknoten sagt.",
      hashtags: ["#geldschein", "#ezb", "#drucken", "#ganzakkurat"],
    },
  },

  kennzeichnung: { werbung: "keine", kiStimme: true },
};
