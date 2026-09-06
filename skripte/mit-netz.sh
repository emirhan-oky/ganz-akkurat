#!/bin/zsh
#
# Wartet auf eine brauchbare Netzverbindung und fuehrt dann den Befehl aus.
#
# **Am 06.09.2026 aus einer Zeile im Log entstanden.** Der Rueckblick lief um
# 09:36 an und brach sofort mit „✗ fetch failed" ab: `launchd` holt einen
# verpassten Termin nach, sobald der Mac wach ist — und startet den Job, bevor
# das WLAN steht. Der Dienst hatte also funktioniert, seine Zahlen waren
# trotzdem zwei Tage alt.
#
# **Ein Dienst, der beim Aufwachen startet, startet vor dem Netz.** Deshalb
# wird hier gewartet statt gehofft: bis zu WARTE_MAX Sekunden in Schritten von
# WARTE_SCHRITT, und erst dann losgelegt. Faellt der Befehl trotzdem durch,
# gibt es genau einen zweiten Versuch nach einer Minute — mehr waere Kosmetik,
# denn was zweimal am Netz scheitert, scheitert an etwas anderem.
#
# Aufruf:  skripte/mit-netz.sh <befehl…>

WARTE_MAX=300
WARTE_SCHRITT=10
ZIEL="https://api.buffer.com"

netz_da() {
  curl -sS --max-time 8 -o /dev/null "$ZIEL" 2>/dev/null
}

gewartet=0
until netz_da; do
  if (( gewartet >= WARTE_MAX )); then
    echo "✗ Nach ${WARTE_MAX}s kein Netz — Abbruch, ohne den Befehl zu starten."
    exit 75   # EX_TEMPFAIL: launchd darf es beim naechsten Termin wieder versuchen
  fi
  sleep $WARTE_SCHRITT
  gewartet=$(( gewartet + WARTE_SCHRITT ))
done

if (( gewartet > 0 )); then
  echo "· ${gewartet}s auf das Netz gewartet."
fi

"$@" && exit 0

echo "· Erster Versuch fehlgeschlagen, ein zweiter in 60s."
sleep 60
"$@"
