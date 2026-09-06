# Verworfen — und warum es nicht zurückkommt

Die Begründungen stehen hier, weil sonst jemand es wieder einbaut. Am
06.09.2026 wörtlich aus `CLAUDE.md` hierher verschoben; gebraucht wird die
Datei genau dann, wenn jemand eines dieser Dinge vorschlägt.

Gestrichen und nicht zurückzuholen — die Begründung steht dabei, weil sonst
jemand sie wieder einbaut:

| weg | warum |
|---|---|
| `warnung` mit `loesung` | eine Lösung anzubieten heißt, eine Handlung zu verlangen |
| `merkmalskarte` | Gerätezeichnung plus ja/nein-Merkmale: eine Kaufberatungskarte |
| `endkarte` | erzwang `punkte: min(2).max(4)` — eine Liste kann keine Pointe sein |
| `merksatz` | stellte bei jedem Entwurf die Frage „was ist hier das Prinzip?" und erzwang siebenmal ein Erklärvideo. Heißt jetzt `weitererzaehlt` |
| `symbol` | die stehende Zeichnung unter dem Satz; ersetzt durch `buehne` |
| `GeraeteArt` | neun Gerätezeichnungen, mit der Kaufberatung gegangen |
| `src/illustration.ts` | schlug Symbole aus dem Szenentext vor — der Erklärvideo-Reflex in Codeform |
| `stab` | der Zeigestab sah im Video aus wie eine Figur ohne Hände, die einen Stock hält |
| der **Zeiger in der Signatur** | die kleine Figur, die auf den Folgen- und Gefällt-mir-Knopf deutete. Gestrichen am 04.09.2026 auf Ansage: „Den brauchen wir nicht mehr." |

**Der Zeiger nimmt fünf Dinge mit**, und die Begründungen bleiben hier stehen,
damit sie niemand erneut versucht:

- Die Prop `dienst` und mit ihr die **drei Fassungen je Short**. Sie waren
  byte-identisch — der Zeiger war das einzige, was sie unterschied. Der
  Wochenlauf rendert seitdem eine Datei, `veroeffentlichen.ts` lädt sie für
  alle drei Kanäle hoch, und ein Lauf mit vier Shorts kostet ein Drittel der
  Zeit.
- Die Töne `gefaellt` und `folgen`. Von den Markentönen bleiben `auftakt`,
  `oeffnung`, `kipppunkt` — und seit demselben Tag `schliessung`.
- Die Ausnahme in `npm run bildrand`: In der Zeigerszene wurde nur die **linke**
  Kante geprüft, weil der Zeiger mit Absicht rechts herausragte. Jetzt prüft die
  Probe wieder beide Kanten in jeder Szene.
- `Plattformzeichen` in `Geraete.tsx` (tot seit dem 24.08.2026) und
  `video/Gestenprobe.tsx`.

**Drei Sackgassen und drei Messwerte**, falls jemand wieder auf einen Knopf
zeigen will: Der Nachleser konnte es nicht selbst — er steht schon auf der
Bühne, ein Übersteuern mittendrin wäre ein Sprung. Eine **körperlose Hand**
wurde im fertigen Video als Schlüssel erkannt. Ein **gezeichnetes
Plattformzeichen** deutet auf nichts: Ein Zeichen, das wir selbst malen, ist
nicht der Knopf der App. Dazu: Unter **siebzig Grad** sieht man keine Geste, der
Arm hängt in Ruhe schon schräg nach außen. Der **Unterarm darf nicht
mitdrehen** — beide Vorzeichen drehen zum Körper hin. Und für „unten Mitte" gibt
es **keinen Armwinkel**; das ging nur über die Position.

**Ein Satz überlebt, weil er jeder zeigenden Pose gilt:** Zwei gleiche Arme sind
keine Geste, sondern eine Haltung. Erst die Asymmetrie macht den linken zum
zeigenden.

Das alte Vokabular war **Erklärvideo-Vokabular**: Lösung, Merkmal, Bewertung,
Punkte zum Mitnehmen — jedes Feld setzt voraus, dass der Zuschauer etwas lernen
will.

Das `Lauf`-Schema wird von **keinem Skript geparst** — laufweite Regeln gehören
deshalb in `laufweiteBefunde` in `src/pruefung.ts`, nicht in ein `superRefine`
auf `Lauf`. Eine Regel dort ist tote Regel.


## `schaetzmal` als sechstes Format · verworfen am 06.09.2026

Es war einmal als sechste Sendung geplant — Facts, Beef, Märchenstunde, Kein
Zufall, Empfehlungen und **Schätz mal**. Als einzige der sechs hatte sie kein
Format hinter sich; sie existierte nur als Name und als geplante
Vorspannaufnahme, und die ist nie entstanden.

**Verworfen mit dem Argument aus der Formatregel selbst:** Sortiert wird nach
der **Reaktion**, nicht nach dem Gegenstand. Die Schätzfrage löst Staunen aus,
und dafür gibt es `gibtswirklich` — **zwei Fächer, die dieselbe Reaktion
auslösen, sind ein Fach.** Genau das ist der Grund, warum es vier sendende
Formate gibt und nicht acht.

**Was bleibt, ist die Schätzfrage als Mittel.** Sie steht in `ZUGARTEN` als
Beispiel und ist der Grund, warum eine Szene über `pauseSek` Stille bestellen
kann: Nach „Schätz mal." braucht der Zuschauer Zeit, sonst ist die Frage
rhetorisch. Gemessen sind 2,60 Sekunden mit `<break time="2.5s" />`. **Damit
kann sie in jedem Format vorkommen, statt eines zu sein.**

Der Kanal bleibt bei fünf Formaten im Schema, von denen vier senden;
`empfehlung` ruht bis zu den Partnerlinks.
