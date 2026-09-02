---
name: thema-briefen
description: Aus einer belegten Idee einen Briefingbogen machen, aus dem sich ein Dialog schreiben lässt — Lage, Fehler, Beleg, Kipppunkt, Falle. Nutze das, wenn Emirhan Dialoge schreiben soll, wenn ein Thema produktionsreif wird, und bevor jemand anfängt, Sprechtext zu formulieren.
---

# Ein Thema briefen

Der Zettel, mit dem jemand einen Dialog schreiben kann, ohne nachzuschlagen.
Er steht zwischen `beleg-holen` und `skript-schreiben` und ist seit dem
02.09.2026 die Stelle, an der aus einem Fakt eine **Lage** wird.

## Warum es den Bogen gibt

Der Ideenvorrat kennt den Fakt und nicht die Lage — `erzaehlt`, `dreh` und
`sache` beschreiben alle drei die Sache. Das ist Absicht: Das Feld hieß bis zum
17.08.2026 `kernfrage`, und notierte Fragen haben Erklärvideos produziert.

Die Lage entsteht erst im Short, über den Kaltstart. Der Briefingbogen ist der
Ort, an dem sie **vorher** erfunden wird — sonst fängt jeder Entwurf wieder beim
Sachverhalt an. Genau das war der Befund am ersten fertigen Video: „Es fühlt
sich immer noch so an, als ob das alles blindlings reingeworfen wird."

## Kein Bogen ohne abgerufene Quelle

Die Idee trägt einen `belegpfad` — eine **Vermutung**, wo etwas stehen müsste.
Wer darum herum brieft, lässt jemanden einen Dialog um einen Fakt schreiben,
den es vielleicht nicht gibt. Fällt der Fakt, fällt der Witz mit.

Also erst `beleg-holen`, dann briefen. Der Bogen zitiert wörtlich aus
`daten/quellen.json` und nirgends aus dem Gedächtnis.

## Die sechs Felder

```markdown
# <id>

**Format** · <format> — <was das Format auslöst>
**Sachgebiet** · <sachgebiet>
**Wer eröffnet** · Watti oder Volti, laut `KALTSTART_SPRECHER`

## Wattis Lage
Was ihm gerade passiert ist. Ein Satz, mit Zeitpunkt und Schaden.

## Sein Fehler
Was er falsch macht und nicht weiß. Der Zuschauer muss ihn vor Volti sehen.

## Was Volti nachgelesen hat
Der belegte Kern in eigenen Worten.
> wörtliches Zitat
— Herausgeber, `quelleId#belegId`

## Wo es kippt
Der Satz, nach dem Watti anders dasteht als vorher.

## Das Dritte
Nur bei `werhatrecht`: was beide Lager übersehen.

## Die Falle
Was die Quelle **nicht** sagt.

---

## Dialog
(hier schreibt Emirhan)
```

**Das letzte Feld ist das wichtigste.** „Nicht automatisch" ist nicht „nicht",
und der Schritt dazwischen ist der teuerste Fehler dieses Projekts. Die Falle
zieht die Arbeit des `belegpruefer` nach vorn, wo sie nichts kostet — hinterher
kostet sie eine Umschreibung, und jede Umschreibung nimmt ein Wort mit, das
gedeckt war.

## Was die Lage sein muss

Ein Zeitpunkt, ein Schaden, und jemand, dem er passiert.

| kein Bogen | ein Bogen |
|---|---|
| Der Routinewechsel bringt nichts | Jemand war in meinem Konto, und ich wechsle brav alle 90 Tage |
| Kabellos laden verliert Energie | Mein Handy liegt seit gestern Abend auf der Matte und ist warm |
| Die ISS lief mit alten Notebooks | Ich wollte den alten Laptop wegwerfen |

## Das Wort, das nicht fällt

**Steht im Bogen ein Fachwort, das die Zielgruppe 18–30 nicht benutzt, gehört
in den Bogen der Satz, der es ersetzt.**

Humorregel eins sagt: Kein Witz darf an so einem Wort hängen. „Röhre" und
„Ladeziegel" sind daran gestorben. Der teurere Fall ist der, wo das Wort das
Thema selbst ist — dann müsste es im Video erklärt werden, und fünf Sekunden
Erklärung in einem Short sind fünf Sekunden Erklärvideo.

Der Prüfstein kam von Emirhan beim Lesen des vierten Bogens: *„Ich weiß selbst
nicht einmal, was der Memory-Effekt ist."* Damit war die Frage beantwortet —
wenn er es nicht weiß, weiß es die Zielgruppe auch nicht. Der Bogen heißt
seitdem `akku-ganz-leer`, und im Video sagt Watti „Sonst merkt der sich das".

**Der Aberglaube braucht keinen Namen, das Verhalten reicht.** Vier der ersten
zehn Bogen waren betroffen: Memory-Effekt, Nennenergie, Ereignisdatenspeicher,
E-Marker.

## Der Prüfstein bei „Das ist Absicht"

**Würde der Zuschauer an Wattis Stelle dasselbe tun?**

Zwei der ersten zehn Bogen sind daran gescheitert, beide am 02.09.2026. Sie
ließen Watti etwas tun, das ihn ins Unrecht setzt: hinten drauffahren, etwas
ausdrucken, das ihm niemand zuordnen soll. Beide Male kippt die Sympathie —
und der Zuschauer steht auf der Seite dessen, der die Entscheidung getroffen
hat. Gut, dass das Auto mitschreibt, der Depp hätte aufpassen sollen.

**„Das ist Absicht" lebt davon, dass sich der Zuschauer *mit* Watti ärgert,
nicht *über* ihn.** Ein Kratzer beim Einparken, eine Beschwerde ohne Absender,
ein Akku, der nach zwei Jahren schlappmacht — daran erkennt er sich wieder.

Bei den drei anderen Formaten gilt das nicht. Dort darf Watti falsch liegen,
das ist sein Beruf; die Empörung richtet sich dort nicht gegen eine
Entscheidung.

Gefunden hat den Fehler nicht die Systematik, sondern Emirhan beim Lesen:
*„Ich verstehe Wattis Rolle hier einfach nicht."* Wer über eine Lage stolpert,
hat meistens recht.

Wer keine Lage findet, hat ein Hauptvideo-Thema. `daten/ideen/hauptvideo.ts`
sammelt sie — sechzehn Ideen sind daran schon gescheitert, elf brauchten eine
Vorgeschichte und fünf eine Handlung.

## Wo die Bogen liegen

`daten/briefings/<id>.md`, und **der Dialog wird in dieselbe Datei
geschrieben.** Vorgabe und Antwort bleiben zusammen, das Archiv entsteht von
selbst — genau so haben die fünfzehn bewerteten Zeilen vom 25.08.2026 das
Humorkapitel getragen.

Ein Bogen geht zuerst allein raus. Erst wenn er trägt, die übrigen.
