#!/bin/zsh
#
# Der Sonntagslauf: die fuenf Videos der Folgewoche bereitstellen.
#
# Aufgerufen von `de.ganzakkurat.wochenlauf` (sonntags 12:07). Von Hand:
#
#   skripte/sonntagslauf.sh
#
# ## Warum ein Shellskript und keine Zeile in der plist
#
# Der Lauf hat drei moegliche Ausgaenge — fertig, keine gueltige Woche,
# abgestuerzt — und jeder braucht eine andere Mitteilung. Als verkettete
# `&&`-Zeile in der plist waere das unlesbar, und eine unlesbare Zeile in einer
# XML-Datei liest niemand nach, wenn sie einmal nicht tut, was sie soll.
#
# ## Was es nicht tut
#
# **Es plant nichts ein.** Der Dienst endet an der Freigabeseite; das
# Veroeffentlichen bleibt der eine Schritt, den dieses Projekt bewusst von Hand
# macht.
set -u
cd "$(dirname "$0")/.."

melden() { osascript -e "display notification \"$2\" with title \"Ganz akkurat\" subtitle \"$1\"" >/dev/null 2>&1; }

if npm run lauf -- --mit-ton --auswahl=automatisch; then
  LAUF="laeufe/$(date +%Y-%m-%d)/freigabe.html"
  if [ -f "$LAUF" ]; then
    open "$LAUF"
    melden "Woche steht bereit" "Fuenf Videos gerendert und vertont. Freigabeseite ist offen."
  else
    melden "Lauf fertig, Seite fehlt" "Der Lauf lief durch, aber $LAUF gibt es nicht."
  fi
else
  # Der haeufigste Fall dahinter ist der leere Vorrat — der Lauf bricht dann ab,
  # **bevor** etwas bezahlt ist, und schreibt den Grund ins Log.
  melden "Kein Lauf" "Keine gueltige Woche oder Fehler. Siehe /tmp/ganzakkurat-wochenlauf.log"
fi
