import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "outputs/bochum_projektmanagement_2026";
await fs.mkdir(outDir, { recursive: true });

const checked = "04.08.2026";
const initiatives = [
  [1,"A","contec GmbH","Bochum","Gesundheits-/Sozialberatung","Bewerbungsformular/Kontakt möglich","Junior Consultant; Projektkoordination; Organisationsentwicklung","VZ / ggf. TZ","5/5","Apeiros + DRK + Koordination passen unmittelbar zur Sozial- und Gesundheitswirtschaft.","Beratungserfahrung noch nicht formal ausgewiesen.","Über die Bochumer Gesundheitscampus- und Beratungslandschaft; gezielt wegen Organisationsentwicklung im Sozialbereich.","Lena Radke / People Management","https://karriere.contec.de/",checked,"Anschreiben zuerst"],
  [1,"A","HÖCKER Project Managers GmbH","Bochum","Projektmanagement/Bau","Initiativbewerbung ausdrücklich möglich","Projektassistenz; Junior Projektmanagement; PMO","VZ / TZ anfragen","4/5","Kernunternehmen für Projektmanagement; Koordination, Ressourcen- und Terminsteuerung übertragbar.","Bautechnischer Hintergrund fehlt; auf Assistenz/Junior fokussieren.","Bei der gezielten Suche nach Projektmanagement-Unternehmen in Bochum gefunden.","Recruiting / info@hoecker-pm.com","https://hoecker-pm.com/de/karriere/initiativbewerbung",checked,"Anschreiben zuerst"],
  [1,"A","VISUS Health IT GmbH","Bochum","Health IT","Initiativbewerbung ausdrücklich möglich","Projektkoordination; PMO; Junior Consultant; Customer Projects","VZ / Werkstudent / TZ anfragen","5/5","Gesundheitsumfeld, Koordination und künftige Wirtschaftsinformatik ergeben ein stimmiges Profil.","IT-Praxiserfahrung noch begrenzt.","Über den Gesundheitscampus Bochum und die Verbindung von Gesundheitswesen und IT.","Jakob Schuhmann / HR","https://www.visus.com/karriere/initiativbewerbung.html",checked,"Anschreiben zuerst"],
  [1,"A","GLS Gemeinschaftsbank eG","Bochum","Nachhaltige Bank","Initiativbewerbung im Jobportal","Projektkoordination; Organisationsentwicklung; Transformation; PMO","VZ / TZ / Jobsharing","5/5","Analytik, Kommunikation, Nachhaltigkeitsinteresse und Haltung passen sehr gut.","Keine Bankausbildung; nicht auf fachbankliche Rollen zielen.","Durch die Bochumer Präsenz und die sozial-ökologische Ausrichtung der Bank.","Recruiting-Team","https://www.gls.de/gls-bank/ueber-uns/karriere/",checked,"Anschreiben zuerst"],
  [1,"A","GBTEC Software AG","Bochum","Software/BPM","Initiativbewerbung ausdrücklich möglich","Projektkoordination; Junior Consulting BPM; PMO; Customer Success","VZ / Werkstudent / TZ anfragen","5/5","Prozessoptimierung bei Picnic, Koordination und Wirtschaftsinformatik passen zu BPM.","Noch keine BPM-Softwarekenntnisse.","Bei der Suche nach Bochumer Unternehmen für Prozessmanagement und Digitalisierung.","Talent Acquisition","https://www.gbtec.com/de/unternehmen/karriere/stellenangebote/",checked,"Anschreiben zuerst"],
  [1,"A","Stadtwerke Bochum Holding GmbH","Bochum","Energie/Kommunal","Initiativbewerbung ausdrücklich möglich","Projektkoordination; Prozessmanagement; Transformation; Kundenprojekte","VZ / TZ anfragen","4.5/5","Koordination, Klimathema und Interesse an kommunaler Transformation passen.","Energiewirtschaftliche Kenntnisse müssen aufgebaut werden.","Über die Rolle der Stadtwerke bei Energiewende und kommunaler Daseinsvorsorge.","Recruiting / karriere@stadtwerke-bochum.de","https://www.stadtwerke-bochum.de/karriere/stellenangebote",checked,"Anschreiben zuerst"],
  [1,"A","rku.it GmbH","Herne","Kommunale IT","Initiativbewerbung ausdrücklich möglich","Projektkoordination; Project Office Management; PMO","VZ / Werkstudent / TZ anfragen","5/5","Koordination, Prozesse, MS Office und Wirtschaftsinformatik sind sehr anschlussfähig.","Direkte IT-Projekterfahrung fehlt noch.","Persönliche Empfehlung durch Herrn Oruc, Systemadministrator Infrastructure Services.","Recruiting-Team / Referenz Herr Oruc","https://rku-it.de/karriere",checked,"Anschreiben vorhanden"],
  [1,"A","do.it projekt-management GmbH & Co. KG","Castrop-Rauxel","Sozialwirtschaft/Projektmanagement","Initiativbewerbung ausdrücklich möglich","Projektkoordination; Bildungs-/Sozialprojekte; Projektassistenz","VZ / TZ anfragen","5/5","Vier Jahre Kinder- und Jugendhilfe plus Projekt- und Koordinationserfahrung sind besonders passend.","Unternehmensgröße und konkreter Bedarf vorher telefonisch prüfen.","Über die Verbindung von Projektmanagement, Kita-Trägerberatung und sozialer Verantwortung.","Bewerbungsteam / bewerbung@do-it-management.de","https://www.ogs-software.de/karriere/",checked,"Anschreiben zuerst"],
  [1,"A","gkd-el – Gelsenkirchener Kommunale Datenzentrale Emscher-Lippe","Gelsenkirchen","Kommunale IT","Initiativbewerbung ausdrücklich möglich","IT-Projektkoordination; PMO; Prozess-/Anforderungskoordination","VZ / TZ anfragen","4.5/5","Kommunikation, Verwaltungsschnittstellen und Wirtschaftsinformatik passen.","IT-Fachkenntnisse noch im Aufbau.","Bei der Suche nach kommunalen IT-Arbeitgebern im Ruhrgebiet.","Personal/Recruiting","https://www.gkd-el.de/karriere",checked,"Anschreiben zuerst"],
  [1,"A","opta data Gruppe","Essen","Health IT/Abrechnung","Initiativbewerbung ausdrücklich möglich","Projektkoordination; PMO; Prozessmanagement; Customer Operations","VZ / TZ anfragen","5/5","DRK-Erfahrung, Prozesskoordination und Wirtschaftsinformatik ergeben eine klare Brücke.","Gesundheitsabrechnung fachlich neu.","Über die Schnittstelle von Gesundheitswesen, Verwaltung und Digitalisierung.","Recruiting-Team","https://karriere.optadata.de/jobs/initiativbewerbung-w-m-x/3a52126f-629e-4869-b5b3-89273809d07d",checked,"Anschreiben zuerst"],
  [1,"A","NOWEDA eG","Essen","Pharmagroßhandel/IT/Logistik","Initiativbewerbung für Young Talents","Projektkoordination; Prozessmanagement; Logistikprojekte; IT-PMO","VZ / Werkstudent / TZ anfragen","4.5/5","Picnic-Prozess- und Ressourcensteuerung plus Gesundheitskontext passen.","Pharmabranche neu; Zielbereich klar benennen.","Über die Verbindung von Gesundheitsversorgung, Logistik und Digitalisierung.","Recruiting Young Talents","https://jobs.noweda.de/young-talents/initiativbewerbung",checked,"Anschreiben zuerst"],
  [1,"A","Ruhrbahn GmbH","Essen","Mobilität/ÖPNV","Initiativbewerbung ausdrücklich möglich","Projektkoordination; PMO; Organisations-/Prozessmanagement","VZ / TZ","4.5/5","Koordination vieler Beteiligter, Prozessblick und öffentliches Interesse passen.","ÖPNV-Fachwissen fehlt noch.","Über die Bedeutung der Ruhrbahn für Mobilitätswende und regionale Infrastruktur.","Recruiting-Team","https://jobs.ruhrbahn.de/jobs/35890057/Initiativbewerbung-w-m-d-",checked,"Anschreiben zuerst"],
  [1,"A","Regionalverband Ruhr (RVR)","Essen","Regionalentwicklung/Öffentlicher Sektor","Initiativbewerbung im Karriereportal","Projektkoordination; Regional-/Kultur-/Klimaprojekte; Verwaltung","VZ / TZ anfragen","5/5","Geisteswissenschaften, Klimathema, Kommunikation und Projektkoordination passen sehr gut.","Öffentliche Verfahren sind formal und oft laufbahn-/abschlussgebunden.","Über regionale Transformations-, Kultur- und Klimaprojekte im Ruhrgebiet.","Personalteam","https://recruitingapp-5172.de.umantis.com/Jobs/1?ContentOnly=&lang=ger",checked,"Anschreiben zuerst"],
  [1,"A","VIVAWEST Wohnen GmbH","Gelsenkirchen","Wohnungswirtschaft/Quartiersentwicklung","Initiativbewerbung ausdrücklich möglich","Projektkoordination; Quartiers-/Organisationsprojekte; PMO","VZ / TZ anfragen","4.5/5","Stakeholderkoordination, Sozialraumerfahrung und Organisation passen.","Immobilienfachwissen fehlt.","Über die Quartiersentwicklung und soziale Verantwortung eines großen Ruhrgebietsarbeitgebers.","Recruiting-Team","https://www.vivawest.de/jobboerse",checked,"Anschreiben zuerst"],
  [1,"A","Stadtwerke Herne AG","Herne","Energie/Kommunal","Initiativbewerbung ausdrücklich möglich","Projektkoordination; Prozessmanagement; Kunden-/Transformationsprojekte","VZ / TZ anfragen","4.5/5","Koordination, Klimathema und kommunaler Kontext sind passend.","Energiewirtschaftliche Erfahrung fehlt.","Über kommunale Energieversorgung und Transformationsprojekte in direkter Nachbarschaft zu Bochum.","Personalteam","https://www.stadtwerke-herne.de/ueber-uns/karriere/direkteinstieg",checked,"Anschreiben zuerst"],
  [1,"A","Stadtwerke Witten GmbH","Witten","Energie/Kommunal","Initiativbewerbung willkommen","Projektkoordination; Prozessmanagement; Organisation","VZ / TZ anfragen","4.5/5","Klimainteresse, Koordination und kommunale Ausrichtung passen.","Energiewissen muss aufgebaut werden.","Über die kommunale Energiewende und den regionalen Bezug zu Witten.","Personalteam","https://www.stadtwerke-witten.de/karriere-job-energie-witten",checked,"Anschreiben zuerst"],
  [1,"A","FUNKE Mediengruppe","Essen","Medien/Digital","Initiativbewerbung ausdrücklich möglich","Projektkoordination; Digitalprojekte; PMO; Content Operations","VZ / TZ anfragen","4.5/5","YouTube-/Medieninteresse, Kommunikation, Analyse und Koordination sind anschlussfähig.","Keine formale Medienerfahrung; Projekt-/Operationsbezug betonen.","Über FUNKE als großen regionalen Medien- und Digitalarbeitgeber.","Talent Acquisition","https://jobs.funkemedien.de/job/Essen-Initiativbewerbung-%28mwd%29/935282255/",checked,"Anschreiben zuerst"],
  [1,"A","Deichmann SE","Essen","Handel/Logistik/Digital","Initiativbewerbung Zentrale & Logistik; Voll-/Teilzeit","Projektkoordination; Prozessmanagement; PMO; Logistikprojekte","VZ / TZ","4.5/5","Picnic-Ressourcen- und Prozesssteuerung passt stark zu Handel und Logistik.","Unternehmensbezug muss konkreter als reine Nähe sein.","Über die Essener Zentrale und die Verbindung von Handel, Logistik und Digitalisierung.","Recruiting-Team","https://www.deichmann-karriere.de/jobs/2020-9/",checked,"Anschreiben zuerst"],
  [2,"A","VIB GmbH","Bochum","Technische Unternehmensberatung/PM","Initiativbewerbung ausdrücklich möglich","Projektassistenz; PMO; kaufmännische Projektkoordination","VZ / TZ anfragen","4/5","Kernnähe zu Projektmanagement und übertragbare Koordinationskompetenz.","Technisches Umfeld und Reisebereitschaft; klare Juniorpositionierung nötig.","Bei der gezielten Recherche nach Projektmanagement-Beratungen in Bochum.","Geschäftsführung/Recruiting","https://www.vib-bochum.de/unternehmen/",checked,"Welle 2"],
  [2,"A","VBW Bauen und Wohnen GmbH","Bochum","Wohnungswirtschaft","Initiativbewerbung ausdrücklich möglich","Projektkoordination; kaufmännische Projektabwicklung; Organisation","VZ / Werkstudent / TZ anfragen","4/5","Stakeholderkommunikation, Termin-/Aufgabensteuerung und sozialer Bezug passen.","Immobilien- und Baukenntnisse fehlen.","Über die Rolle der VBW in Bochumer Stadt- und Quartiersentwicklung.","Recruiting-Team","https://karriere.vbw-bochum.de/",checked,"Welle 2"],
  [2,"A","USB Bochum GmbH","Bochum","Entsorgung/Kreislaufwirtschaft","Initiativbewerbung willkommen (Karriere Metropole Ruhr)","Projektkoordination; Prozess-/Betriebsorganisation; PMO","VZ / TZ anfragen","4/5","Picnic-Prozesssteuerung und Klimainteresse passen zu Kreislaufwirtschaft.","Initiativweg auf offizieller Unternehmensseite nicht eindeutig; zuerst HR anrufen.","Über kommunale Kreislaufwirtschaft und nachhaltige Infrastruktur in Bochum.","Personalteam","https://www.usb-bochum.de/karriere/karriere-usb-als-arbeitgeber/",checked,"Vorher anrufen"],
  [2,"A","ZWP Ingenieur-AG","Bochum","Technische Gebäudeausrüstung","Direkte Projektassistenz-Stelle vorhanden","Projektassistenz; Projektkoordination","VZ","4.5/5","Die konkrete Projektassistenzrolle passt direkt zu Koordination und Organisation.","Technisches Branchenwissen fehlt, ist für Assistenz aber weniger zentral.","Über die konkrete Ausschreibung für Projektassistenz am Standort Bochum.","Recruiting-Team","https://www.zwp.de/de/karriere/stellenangebote/projektassistenz-m-w-d-4/",checked,"Anschreiben vorhanden"],
  [2,"A","The Coatinc Company – Standort Bochum","Bochum","Industrie/Oberflächen","Direkte Projektleitungs-Stelle vorhanden","Projektkoordination; Auftrags-/Prozesssteuerung","VZ","4/5","Picnic: Ressourcen, Qualität, Termine und Schnittstellen sind gut übertragbar.","Vertrieb/Produktion und technisches Produktwissen neu.","Über die ausgeschriebene Projektleitungsrolle in Bochum.","Recruiting-Team","https://coatinc.com/de/job/projektleitung-2/",checked,"Direktstelle prüfen"],
  [2,"A","KAMAT GmbH & Co. KG","Witten","Maschinenbau","Initiativbewerbungen jederzeit willkommen","Projektkoordination; Sales Support; Administration; PMO","VZ / TZ anfragen","4/5","Organisation, internationale Schnittstellen und Prozesssteuerung passen.","Technisches Produktwissen fehlt.","Über KAMATs ausdrückliche Offenheit für Initiativen in Projektmanagement und Administration.","Personalteam","https://www.kamat.de/unternehmen/karriere/stellenangebote/",checked,"Welle 2"],
  [2,"A","ista SE","Essen","Immobilientechnik/Nachhaltigkeit","Initiativbewerbung im Stellenportal","Projektkoordination; Digital-/Transformationsprojekte; PMO","VZ / Werkstudent / TZ anfragen","4.5/5","Nachhaltigkeit, Digitalisierung und Koordination passen sehr gut.","Energie-/Immobilienbranche neu.","Über die Verbindung von Digitalisierung, Energieeffizienz und Immobilienwirtschaft.","Talent Acquisition","https://www.ista.com/de/karriere/stellenuebersicht/",checked,"Welle 2"],
  [2,"A","Stadtwerke Essen AG","Essen","Energie/Kommunal","Initiativbewerbung ausdrücklich möglich","Projektkoordination; Prozessmanagement; Transformation","VZ / TZ anfragen","4/5","Klimathema, Koordination und kommunale Daseinsvorsorge passen.","Energiefachwissen fehlt.","Über die Energiewende und kommunale Infrastruktur im Ruhrgebiet.","Recruiting-Team","https://www.stadtwerke-essen.de/karriere/initiativbewerbung",checked,"Welle 2"],
  [2,"A","St. Augustinus Gelsenkirchen GmbH","Gelsenkirchen","Gesundheit/Soziales","Initiativbewerbung im Karriereportal","Projektkoordination; Verwaltung; Organisationsentwicklung","VZ / TZ","4.5/5","DRK- und Jugendhilfeerfahrung plus Koordination passen unmittelbar.","Projektrollen müssen ggf. erst intern zugeordnet werden.","Über die Verbindung von Gesundheitsversorgung, sozialen Angeboten und Organisation.","Recruiting-Team","https://wirsuchenmenschen.de/",checked,"Welle 2"],
  [2,"B","GWV Gesellschaft für Geowissenschaftliche Verfahrenstechnik mbH","Bochum","Technische Dienstleistungen","Initiativbewerbung ausdrücklich möglich","Projektassistenz; kaufmännische Projektkoordination; Backoffice","VZ / TZ anfragen","3.5/5","Organisation, Dokumentation und Koordination sind übertragbar.","Stark technisches Umfeld.","Bei der Recherche nach projektorientierten Bochumer Dienstleistern.","Personal / personal@gwv-bochum.de","https://gwv-bochum.de/karriere/",checked,"Welle 2"],
  [2,"B","VULKAN Gruppe","Herne","Industrie/Antriebstechnik","Initiativbewerbung ausdrücklich möglich","Projektassistenz; Prozess-/Auftragskoordination; PMO","VZ / TZ anfragen","3.5/5","Picnic-Erfahrung in Ressourcen, Qualität und Abläufen passt.","Technischer Branchenbezug fehlt.","Über VULKAN als international ausgerichteten Arbeitgeber in Herne.","Recruiting-Team","https://www.vulkan.com/karriere/stellenangebote",checked,"Welle 2"],
  [2,"B","Kelvion Holding GmbH – Standort Herne","Herne","Energie-/Wärmetechnik","Initiativbewerbung ausdrücklich möglich","Projektassistenz; PMO; Operations-/Prozesskoordination","VZ / TZ anfragen","3.5/5","Koordination, Qualität und Ressourcenplanung sind anschlussfähig.","Technischer Hintergrund fehlt; keine Senior-PMO-Rolle.","Über den Herner Standort und das internationale Projektgeschäft.","Talent Acquisition","https://www.kelvion.com/de/karriere/jobs",checked,"Welle 2"],
  [2,"B","J.D. Neuhaus GmbH & Co. KG","Witten","Maschinenbau","Initiativbewerbung ausdrücklich möglich","Projektassistenz; Prozesskoordination; Sales/Operations Support","VZ / TZ anfragen","3.5/5","Koordinations- und Prozessstärke passt zu internationalem Mittelstand.","Technisches Produktwissen fehlt.","Über das Wittener Traditionsunternehmen und seine internationale Projektarbeit.","HR-Team","https://www.jdngroup.com/de/karriere/",checked,"Welle 2"],
  [2,"B","ARDEX GmbH","Witten","Bauchemie","Initiativbewerbung für Standort willkommen","Projektassistenz; Marketing-/Prozessprojekte; Administration","VZ / TZ anfragen","3.5/5","Organisation, Kommunikation und Prozessverbesserung passen.","Bauchemie ist fachlich neu.","Über ARDEX als international tätiges Wittener Familienunternehmen.","Personalabteilung / personalabteilung@ardex.de","https://www.ardex.de/karriere/stellenangebote",checked,"Welle 2"],
  [2,"B","DÖRKEN","Herdecke","Chemie/Bauprodukte","Initiativbewerbung ausdrücklich möglich","Projektassistenz; Prozess-/Organisationskoordination; PMO","VZ / TZ anfragen","3.5/5","Ressourcen-, Qualitäts- und Schnittstellenkoordination passen.","Rand des 20-km-Radius; technisches Umfeld.","Über DÖRKEN als regional verwurzeltes Industrieunternehmen mit Transformationsbedarf.","Lys Vormann / personal@doerken.de","https://www.doerken.com/de/de/unternehmen/karriere/berufserfahrene/initiativbewerbung",checked,"Welle 2"],
  [2,"B","Rain Carbon Germany GmbH","Castrop-Rauxel","Chemische Industrie","Initiativbewerbung Deutschland mit Standortoption","Projektassistenz; Operations-/Prozesskoordination","VZ / TZ anfragen","3/5","Picnic-Prozess- und Qualitätssteuerung ist übertragbar.","Chemie/Technik und Englischanforderungen prüfen.","Über den Standort Castrop-Rauxel und das internationale Industrieumfeld.","Recruiting-Team","https://careers.rain-industries.com/raincarbon/job/Castrop-Rauxel-oder-Duisburg-Initiativbewerbung-Deutschland/1210458801/",checked,"Welle 2"],
  [2,"B","ifm-Unternehmensgruppe","Essen","Automatisierungstechnik","Initiativbewerbung für Hauptsitz","Projektassistenz; Produkt-/Prozesskoordination; Logistik","VZ / TZ anfragen","3.5/5","Picnic-Prozesse und künftige Wirtschaftsinformatik sind anschlussfähig.","Technische Produkte und B2B-Umfeld neu.","Über ifm als Essener Technologieunternehmen mit Bereichen Produktmanagement und Logistik.","Recruiting-Team","https://jobs.ifm.com/job/print-job-form-initiativbewerbung-fur-unseren-hauptsitz-in-essen_26.aspx",checked,"Welle 2"],
  [2,"B","TÜV NORD GROUP","Essen","Prüfung/Beratung/Technologie","Initiativbewerbung möglich","Projektkoordination; PMO; Organisations-/Verwaltungsrollen","VZ / TZ anfragen","4/5","Sorgfalt, Koordination, Dokumentation und analytisches Profil passen.","Viele Rollen verlangen technische Qualifikationen; nicht darauf zielen.","Über TÜV NORD als großen regionalen Arbeitgeber für Sicherheit und Transformation.","Recruiting-Team","https://www.tuev-nord-group.com/de/karriere/einstieg/",checked,"Welle 2"],
  [2,"B","secunet Security Networks AG","Essen","IT-Sicherheit","Initiativbewerbung Festanstellung und Studierende","Projektassistenz; PMO; Delivery-/Operations Support","VZ / Werkstudent / TZ anfragen","3.5/5","Organisation plus Wirtschaftsinformatik passen grundsätzlich.","Cybersecurity-Kenntnisse fehlen; nur koordinative Juniorrollen.","Über secunet als Essener IT-Sicherheitsunternehmen und künftige Wirtschaftsinformatik.","Talent Acquisition","https://jobs.secunet.com/Initiativbewerbung-Festanstellung-de-j162.html",checked,"Welle 2"],
  [3,"B","Fahrzeugtechnik Hattingen GmbH","Hattingen","Fahrzeugtechnik","Initiativbewerbung ausdrücklich möglich","Projektassistenz; Qualitäts-/Prozesskoordination","VZ / TZ anfragen","3/5","Picnic-Erfahrung in Qualität, Abläufen und Ressourcen passt.","Technikbezug fehlt; Randbereich.","Über den regionalen Standort und projektorientierte Fahrzeugtechnik.","Personalteam","https://www.ft-hattingen.com/unternehmen/karriere/",checked,"Reserve"],
  [3,"B","WIP-E Renewable Energies","Recklinghausen","Erneuerbare Energien","Initiativbewerbung ausdrücklich möglich","Projektassistenz; kaufmännische Projektkoordination","VZ / TZ anfragen","3/5","Klimainteresse und Koordination passen.","Technische Qualifikationen werden häufig vorausgesetzt; Rand des Radius.","Über die Verbindung von Projektgeschäft und erneuerbaren Energien.","Bewerbung / bewerbung@wip-e.de","https://www.wip-e.de/karriere",checked,"Reserve"],
  [3,"B","SBO Senioreneinrichtungen Bochum gGmbH","Bochum","Pflege/Soziales","Initiativbewerbung ausdrücklich möglich","Verwaltung; Projekt-/Organisationskoordination","VZ / TZ","3.5/5","DRK, Jugendhilfe und koordinative Erfahrung passen zum sozialen Umfeld.","Projektmanagement ist kein klarer Kernbereich.","Über den sozialen Auftrag und die Bochumer Verankerung.","Personalteam","https://sbo-bochum.de/karriere/initiativbewerbung",checked,"Reserve"],
  [3,"B","Come Back Gesundheitszentrum","Gelsenkirchen","Gesundheit","Initiativbewerbung ausdrücklich möglich","Verwaltung; Projekt-/Praxisorganisation","VZ / TZ","3/5","Gesundheitskontext und Organisation passen.","Kleinerer Arbeitgeber; PM-Rolle möglicherweise nicht vorhanden.","Über die Verbindung von Gesundheitsangeboten und organisatorischer Koordination.","Praxisleitung","https://gelsenkirchen.come-back.de/karriere/",checked,"Reserve"],
  [3,"B","GSE Gesellschaft für Soziale Dienstleistungen Essen mbH","Essen","Soziale Dienstleistungen","Initiativbewerbung im Karriereportal","Projektkoordination; Verwaltung; Bildungs-/Sozialprojekte","VZ / TZ","4/5","Kinder-/Jugendhilfe, Kommunikation und Koordination sind sehr relevant.","Projektstellen nicht garantiert.","Über die soziale Ausrichtung und vielfältigen Einrichtungen in Essen.","Recruiting-Team","https://karriere.gse-essen.de/",checked,"Reserve"],
  [3,"B","Reifen Stiebling GmbH","Herne","Handel/Service/Logistik","Initiativbewerbung ausdrücklich möglich","Operations-/Prozesskoordination; Verwaltung","VZ / TZ anfragen","3/5","Ressourcen- und Ablaufsteuerung aus Picnic passt.","Wenig klassisches Projektmanagement.","Über das regional verwurzelte Familienunternehmen und seine Betriebsorganisation.","Justina Lenz / bewerbung@reifen-stiebling.de","https://www.reifen-stiebling.de/jobs/initiativbewerbung",checked,"Reserve"],
  [3,"B","HOCHTIEF AG","Essen","Bau/Infrastruktur","Initiativbewerbung ausdrücklich möglich","Projektassistenz; PMO; kaufmännische Projektkoordination","VZ / TZ anfragen","3.5/5","Organisation, Termine, Ressourcen und Dokumentation passen.","Bau-/Ingenieurwissen fehlt; nur Assistenz/PMO.","Über HOCHTIEF als Essener Projektunternehmen für große Infrastrukturvorhaben.","Recruiting / jobs@hochtief.de","https://www.hochtief.de/karriere/faq-haeufig-gestellte-fragen",checked,"Reserve"],
  [3,"B","FEV Group GmbH","Essen","Mobilität/Engineering","Initiativbewerbung ausdrücklich möglich","Projektassistenz; PMO; Operations-/People Projects","VZ / TZ anfragen","3/5","Koordination und Prozessblick passen.","Engineering-Fokus; nicht auf technische Projektleitung zielen.","Über FEV als Essener Entwicklungs- und Technologieunternehmen.","Talent Acquisition","https://career.fev.com/de/p/de/jobs/34955/initiativbewerbung",checked,"Reserve"],
  [3,"B","INSIRE Consulting GmbH","Essen","Beratung/Digitalisierung","Initiativbewerbung veröffentlicht","Junior Projektkoordination; Consulting Support; PMO","VZ / TZ anfragen","3.5/5","Analytik, Kommunikation und künftige Wirtschaftsinformatik passen.","Konkrete Leistungsbereiche vor Bewerbung vertiefen.","Bei der Recherche nach Essener Beratungen mit Initiativweg.","Recruiting-Team","https://www.insire.de/wp-content/uploads/2024/08/Initiativbewerbung.pdf",checked,"Reserve"],
  [3,"C","BEGRA Steuerberatungsgesellschaft","Herne","Steuerberatung","Initiativbewerbung; Voll-/Teilzeit","Projekt-/Prozessassistenz; Backoffice; Verwaltung","VZ / TZ","2.5/5","Organisation und Kommunikation passen.","Kein Steuer-/BWL-Abschluss und kaum PM-Bezug.","Über die ausdrückliche Offenheit für Voll- und Teilzeit in Herne.","Kanzleileitung","https://www.begra-herne.de/karriere",checked,"Nur bei Bedarf"],
  [3,"C","Elektro Thimm GmbH","Herne","Elektrotechnik","Initiativbewerbung ausdrücklich möglich","Projektassistenz; kaufmännische Koordination","VZ / TZ anfragen","2.5/5","Organisation und Terminverfolgung sind übertragbar.","Technisches Handwerksumfeld; Bedarf an kaufmännischer Assistenz unklar.","Über den regionalen Standort und projektbezogene Elektroarbeiten.","Geschäftsführung/Personal","https://elektro-thimm.de/jobs/",checked,"Nur bei Bedarf"],
  [3,"C","WALPOL GmbH","Gelsenkirchen","Technischer Dienstleister","Initiativbewerbung ausdrücklich möglich","Projektassistenz; Backoffice; Prozesskoordination","VZ / TZ anfragen","2.5/5","Koordination und Administration passen grundsätzlich.","Unternehmens- und Rollenfit vor Kontakt genauer prüfen.","Bei der Recherche nach projektorientierten Arbeitgebern in Gelsenkirchen.","Personalteam","https://www.walpol.com/index.php/karriere/",checked,"Nur bei Bedarf"],
  [3,"C","RGE Servicegesellschaft Essen mbH","Essen","Gebäude-/Servicemanagement","Initiativbewerbung willkommen","Projekt-/Betriebskoordination; Verwaltung","VZ / TZ","3/5","Einsatz-, Ressourcen- und Prozesssteuerung aus Picnic passt.","Wenig strategisches Projektmanagement.","Über die kommunale Serviceorganisation und vielfältige Betriebsprozesse.","Personalteam","https://www.rge-essen.de/jobs",checked,"Nur bei Bedarf"],
  [3,"C","KNAPPMANN GmbH & Co. Landschaftsbau KG","Essen","Landschaftsbau","Initiativbewerbung für Standort; Voll-/Teilzeit","Projektassistenz; Disposition; Verwaltung","VZ / TZ","2.5/5","Organisation, Ressourcenplanung und Klimainteresse sind anschlussfähig.","Bau-/Landschaftsfachwissen fehlt.","Über die Verbindung von Projektarbeit, Stadtgrün und regionalem Standort.","Personalteam","https://www.knappmann.de/job/initiativbewerbung-fuer-den-standort-essen/",checked,"Nur bei Bedarf"],
  [3,"C","Anke Oberflächentechnik GmbH","Essen","Industrie","Initiativbewerbung ausdrücklich möglich","Projekt-/Auftragsassistenz; Prozesskoordination","VZ / TZ anfragen","2.5/5","Qualitäts- und Ablaufkoordination aus Picnic passt.","Technisches Umfeld und geringer PM-Bezug.","Bei der Recherche nach mittelständischen Essener Arbeitgebern mit Initiativweg.","Personalteam","https://www.anke-essen.de/karriere/",checked,"Nur bei Bedarf"],
  [3,"C","ESTB GmbH","Essen","Technische Dienstleistungen","Initiativbewerbung ausdrücklich möglich","Backoffice; Projektassistenz; Dokumentation","VZ / TZ anfragen","2.5/5","Dokumentation, Koordination und MS Office passen.","Technische Ausrichtung und konkreter Bedarf unklar.","Bei der Suche nach projektorientierten Dienstleistern in Essen.","Recruiting-Team","https://karriere.estb-essen.de/karriere/initiativbewerbung/",checked,"Nur bei Bedarf"],
  [3,"C","HEGER store project GmbH","Essen","Ladenbau/Projektgeschäft","Initiativbewerbung veröffentlicht","Projektassistenz; kaufmännische Projektkoordination","VZ / TZ anfragen","3/5","Koordination, Termine und Schnittstellen passen.","Baubranche und technische Abläufe neu.","Über das projektbasierte Ladenbaugeschäft am Standort Essen.","Personalteam","https://heger-store.de/wp-content/uploads/2024/08/Stellenausschreibungen_initiativ.pdf",checked,"Reserve"],
  [3,"C","Stadt Castrop-Rauxel","Castrop-Rauxel","Öffentliche Verwaltung","Initiativbewerbung ausdrücklich möglich","Projektkoordination; Verwaltung; Bildung/Klima/Integration","VZ / TZ je Bedarf","3.5/5","Geisteswissenschaften, Jugendhilfe und Klimathema passen zu Querschnittsprojekten.","Kommunale Eingruppierung verlangt oft exakt definierte Abschlüsse.","Über die ausdrückliche Möglichkeit zur Initiativbewerbung bei der Stadtverwaltung.","Personalservice","https://www.castrop-rauxel.de/karriere/initiativbewerbungen",checked,"Reserve"],
];

const direct = [
  [1,"Vonovia SE","Bochum","Trainee operatives Management Wohnumfeld Service","VZ","Bachelor plus einschlägige Koordinations-/Führungserfahrung kann passen; gute Einstiegsbrücke.","https://jobs.vonovia.de/Vonovia/job/Bochum-Trainee-%28mwd%29-Wohnumfeld-Service-Bochum-Boch-44803/1378326433/",checked,"Jetzt prüfen"],
  [1,"ZWP Ingenieur-AG","Bochum","Projektassistenz (m/w/d)","VZ","Sehr direkte Passung; Anschreiben wurde bereits erstellt.","https://www.zwp.de/de/karriere/stellenangebote/projektassistenz-m-w-d-4/",checked,"Bewerben"],
  [1,"The Coatinc Company","Bochum","Projektleitung","VZ","Stretch-Bewerbung; Prozesse, Termine, Qualität und Ressourcen betonen.","https://coatinc.com/de/job/projektleitung-2/",checked,"Prüfen"],
  [1,"Gelsenwasser AG","Gelsenkirchen","Studentische Aushilfe Digital Workplace M365","Werkstudent","MA-Studierendenstatus, MS Office, Kommunikation und künftige WI passen; Verfügbarkeit prüfen.","https://www.gelsenwasser.de/unternehmen/arbeiten-bei-gelsenwasser/stellenangebote",checked,"Jetzt prüfen"],
  [1,"vhs Witten | Wetter | Herdecke","Witten","Projektkoordination drittmittelfinanzierte Projekte","VZ/TZ laut Anzeige prüfen","Apeiros, Bildung, Koordination und öffentliche Projekte passen außergewöhnlich gut.","https://www.vhs-wwh.de/stellenangebote",checked,"Sofort prüfen"],
  [2,"IGA Metropole Ruhr 2027 gGmbH","Essen/Ruhrgebiet","Projektmanager:in Veranstaltungen","VZ, befristet","Klima-/Gesellschaftsthema, Koordination und Kommunikation passen; Eventerfahrung ist Lücke.","https://www.iga2027.ruhr/die-iga-2027/karriere-bei-der-iga-2027/detailseite-karriere/news/projektmanagerin-im-bereich-veranstaltungen-m-w-d/",checked,"Stretch"],
  [2,"Messe Essen GmbH","Essen","Event-/Projektkoordination; konkrete Stellen beobachten","VZ/TZ je Anzeige","Organisation vieler Beteiligter passt; Initiativbewerbung zuerst telefonisch klären.","https://www.messe-essen.de/messeplatz-essen/das-unternehmen/jobs-karriere/jobs-bewerbung/",checked,"Anrufen"],
  [2,"contec GmbH","Bochum","Berufseinstieg/Studierende in Beratung Gesundheit & Soziales","VZ/Werkstudent","Branchenfit sehr hoch; konkrete Jobs zusätzlich zur Initiative prüfen.","https://karriere.contec.de/",checked,"Jetzt prüfen"],
];

const monitor = [
  ["BOGESTRA AG","Bochum","Initiativweg nicht eindeutig bestätigt","Recruiting vorab fragen; sonst nur Stellenportal.","https://www.bogestra.de/karriere","Projektkoordination; Organisation; Mobilität","B"],
  ["G DATA CyberDefense AG","Bochum","Allgemeiner HR-Kontakt, Initiative nicht eindeutig bestätigt","Kurze Anfrage an HR statt sofortiger Vollbewerbung.","https://www.gdata.de/karriere","PMO; Operations; Projektassistenz","B"],
  ["NWB Verlag GmbH & Co. KG","Herne","Initiativweg auf offizieller Seite prüfen","Jobportal beobachten und HR kurz kontaktieren.","https://www.nwb.de/unternehmen/karriere","Digitalprojekte; Produkt-/Content Operations","B"],
  ["Emschergenossenschaft/Lippeverband","Essen","Initiativweg nicht bestätigt","Konkrete Stellen bewerben; HR nur mit kurzer Zielrollenfrage kontaktieren.","https://www.eglv.de/karriere/stellenangebote/","Klima-/Transformationsprojekte; PMO","A"],
  ["Ruhrverband","Essen","Initiativweg nicht bestätigt","Konkrete Stellen beobachten.","https://ruhrverband.de/karriere","Umwelt-/Infrastrukturprojekte; Verwaltung","B"],
  ["Gelsenwasser AG","Gelsenkirchen","Initiativweg nicht bestätigt","Direkte Stellen bewerben; Jobportal regelmäßig prüfen.","https://www.gelsenwasser.de/unternehmen/arbeiten-bei-gelsenwasser/stellenangebote","Projekt-/Prozesskoordination; Werkstudent Digital Workplace","A"],
  ["E.ON SE","Essen","Kein bestätigter Initiativweg","Nur passende Junior-/PMO-/Werkstudentenstellen.","https://careers.eon.com/deutschland/go/Germany-Careers/3727101","Transformation; PMO; People/Process Projects","B"],
  ["Westenergie AG","Essen","Karrierenetzwerk statt klassischer Initiative","Talent Network nutzen und konkrete Stellen beobachten.","https://jobs.westenergie.de/de?locale=de_DE","Projektkoordination; Transformation; Kommunikation","B"],
  ["RWE AG","Essen","Initiativbewerbungen ausdrücklich nicht vorgesehen","Nur auf konkrete Ausschreibungen bewerben.","https://www.rwe.com/karriere-bei-rwe/","PMO; Transformation; Nachhaltigkeit","B"],
  ["Stadt Gelsenkirchen","Gelsenkirchen","Initiativbewerbungen ausdrücklich nicht erwünscht","Nur konkrete Ausschreibungen.","https://www.gelsenkirchen.de/de/Rathaus/Karriere/Stellenangebote/","Projektkoordination; Klima; Bildung; Verwaltung","B"],
  ["ELE Verteilnetz / Emscher Lippe Energie","Gelsenkirchen","Aktuell keine Initiativstelle im Portal","Nur konkrete Stellen und Job-Alarm.","https://karriere.ele.de/","Projekt-/Prozesskoordination","B"],
  ["Stadt Bochum","Bochum","Kein bestätigter allgemeiner Initiativweg","Nur konkrete Stellen; Projektrollen aus Bochum-Strategie beobachten.","https://karriere.bochum.de/","Projektkoordination; Bildung; Klima; Digitalisierung","A"],
];

const wb = Workbook.create();
const dark = "#18324A", teal = "#0F766E", pale = "#EAF4F3", gold = "#E7B34B", light = "#F5F7FA", red = "#FCE8E6";

function title(sheet, text, subtitle, lastCol) {
  sheet.showGridLines = false;
  sheet.mergeCells(`A1:${lastCol}1`);
  sheet.getRange("A1").values = [[text]];
  sheet.getRange(`A1:${lastCol}1`).format = { fill: dark, font: { bold: true, color: "#FFFFFF", size: 18 }, rowHeight: 34, verticalAlignment: "center" };
  sheet.mergeCells(`A2:${lastCol}2`);
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange(`A2:${lastCol}2`).format = { fill: pale, font: { color: dark, italic: true }, wrapText: true, rowHeight: 32, verticalAlignment: "center" };
}

const summary = wb.worksheets.add("Start & Strategie");
title(summary,"Bewerbungsradar Projektmanagement – Bochum + ca. 20 km","Arbeitsstand 04.08.2026 | Profil: BA Geschichte/Philosophie, MA Philosophie, Koordinations- und Führungserfahrung bei Apeiros und Picnic, Wirtschaftsinformatik ab 10/2026","H");
summary.getRange("A4:B9").values = [
  ["Kennzahl","Wert"],
  ["Recherchierte Initiativ-/Kontaktziele",initiatives.length],
  ["Priorität A",null],
  ["Passung 4.5/5 oder 5/5",null],
  ["Konkrete Chancen",direct.length],
  ["Nur beobachten / keine Initiative",monitor.length],
];
summary.getRange("A4:B4").format = { fill: teal, font: { bold: true, color: "#FFFFFF" } };
summary.getRange("A4:B9").format.borders = { preset: "all", style: "thin", color: "#D7DEE5" };
summary.getRange("D4:H4").merge();
summary.getRange("D4").values = [["Empfohlene Reihenfolge"]];
summary.getRange("D4:H4").format = { fill: teal, font: { bold: true, color: "#FFFFFF" } };
for (let r = 5; r <= 10; r++) summary.mergeCells(`F${r}:H${r}`);
summary.getRange("D5:H10").values = [
  ["1","Zuerst","contec, VISUS, GLS, GBTEC, Stadtwerke Bochum, rku.it, do.it, gkd-el, opta data, RVR","",""],
  ["2","Dann","Ruhrbahn, VIVAWEST, NOWEDA, Deichmann, Stadtwerke Herne/Witten, FUNKE","",""],
  ["3","Danach","VIB, VBW, KAMAT, ista, St. Augustinus, TÜV NORD, Industrie-Mittelstand","",""],
  ["4","Parallel","Konkrete Ausschreibungen auf dem Blatt „Direkte Chancen“ sofort prüfen","",""],
  ["5","Nicht blind","Bei „vorher anrufen“ erst 3-Minuten-HR-Anfrage; keine komplette Bewerbung senden","",""],
  ["6","Wöchentlich","Portale im Blatt „Beobachten“ kontrollieren; RWE/Stadt Gelsenkirchen nicht initiativ anschreiben","",""],
];
summary.getRange("D5:H10").format = { wrapText: true, borders: { preset: "all", style: "thin", color: "#D7DEE5" } };
summary.getRange("A12:H12").merge();
summary.getRange("A12").values = [["Positionierung für alle Anschreiben"]];
summary.getRange("A12:H12").format = { fill: gold, font: { bold: true, color: dark } };
for (let r = 13; r <= 18; r++) summary.mergeCells(`B${r}:H${r}`);
summary.getRange("A13:H18").values = [
  ["Zielrollen","Projektkoordination, Projektassistenz, PMO/Project Office, Prozesskoordination, Junior Consulting, Organisationsentwicklung","","","","","",""] ,
  ["Nicht behaupten","Keine jahrelange formale Projektmanager-Erfahrung und keine technische Fachqualifikation vortäuschen.","","","","","",""] ,
  ["Apeiros","Projektarbeiten planen/steuern, Angebote organisieren, Aufgaben und Termine abstimmen, Mitarbeitende/Eltern/Partner koordinieren, Konflikte lösen.","","","","","",""] ,
  ["Picnic","Bis zu 50 Mitarbeitende koordinieren, Ressourcen planen, zeitkritische Abläufe steuern, Qualität sichern, Onboarding/Feedback, Prozesse verbessern.","","","","","",""] ,
  ["Studium","Analytik und verständliche Aufbereitung; Wirtschaftsinformatik ab 10/2026 als gezielte Ergänzung – nicht als bereits vorhandene IT-Expertise darstellen.","","","","","",""] ,
  ["Beschäftigung","Vollzeit klar als Präferenz nennen; Teilzeit/Werkstudent nur als flexible Alternative, sofern beim Arbeitgeber sinnvoll.","","","","","",""] ,
];
summary.getRange("A13:H18").format = { wrapText: true, borders: { preset: "all", style: "thin", color: "#D7DEE5" } };
summary.getRange("A4:H18").format.verticalAlignment = "top";
summary.getRange("A:H").format.columnWidth = 16;
summary.getRange("A:A").format.columnWidth = 34;
summary.getRange("B:B").format.columnWidth = 14;
summary.getRange("D:D").format.columnWidth = 9;
summary.getRange("E:E").format.columnWidth = 15;
summary.getRange("F:H").format.columnWidth = 24;
summary.freezePanes.freezeRows(2);

const init = wb.worksheets.add("Initiativziele");
title(init,"Initiativziele","Sortiert nach Bewerbungswelle und Profilpassung. URLs führen zu offiziellen Karriere-/Bewerbungsseiten; Status vor Versand nochmals kurz prüfen.","P");
const initHeaders = ["Welle","Prio","Unternehmen","Ort","Branche","Initiativweg","Geeignete Zielrollen","Arbeitszeit","Profilpassung","Warum passend","Lücke/Risiko","Personalisierter Einstieg","Kontakt","Offizielle Quelle","Geprüft","Nächster Schritt"];
init.getRange("A4:P4").values = [initHeaders];
init.getRange(`A5:P${initiatives.length+4}`).values = initiatives;
init.getRange("A4:P4").format = { fill: teal, font: { bold: true, color: "#FFFFFF" }, wrapText: true, rowHeight: 34, verticalAlignment: "center" };
init.getRange(`A5:P${initiatives.length+4}`).format = { wrapText: true, verticalAlignment: "top", borders: { preset: "all", style: "thin", color: "#E0E5EA" } };
for (let r = 5; r <= initiatives.length + 4; r++) if (r % 2 === 0) init.getRange(`A${r}:P${r}`).format.fill = light;
init.getRange(`B5:B${initiatives.length+4}`).conditionalFormats.addCustom('=B5="A"',{fill:"#DDF3E4",font:{bold:true,color:"#176B3A"}});
init.getRange(`B5:B${initiatives.length+4}`).conditionalFormats.addCustom('=B5="C"',{fill:red,font:{color:"#A12820"}});
init.getRange(`I5:I${initiatives.length+4}`).conditionalFormats.addCustom('=I5="5/5"',{fill:"#DDF3E4",font:{bold:true,color:"#176B3A"}});
init.getRange("A:P").format.columnWidth = 14;
init.getRange("A:A").format.columnWidth = 7; init.getRange("B:B").format.columnWidth = 7;
init.getRange("C:C").format.columnWidth = 27; init.getRange("D:D").format.columnWidth = 15;
init.getRange("E:F").format.columnWidth = 23; init.getRange("G:G").format.columnWidth = 34;
init.getRange("H:I").format.columnWidth = 15; init.getRange("J:L").format.columnWidth = 43;
init.getRange("M:M").format.columnWidth = 27; init.getRange("N:N").format.columnWidth = 42;
init.getRange("O:O").format.columnWidth = 13; init.getRange("P:P").format.columnWidth = 19;
init.freezePanes.freezeRows(4); init.freezePanes.freezeColumns(3);
summary.getRange("B6").formulas = [[`=COUNTIF(Initiativziele!B5:B${initiatives.length+4},"A")`]];
summary.getRange("B7").formulas = [[`=COUNTIF(Initiativziele!I5:I${initiatives.length+4},"5/5")+COUNTIF(Initiativziele!I5:I${initiatives.length+4},"4.5/5")`]];

const dir = wb.worksheets.add("Direkte Chancen");
title(dir,"Direkte Chancen","Diese Ausschreibungen beziehungsweise konkreten Einstiegswege zuerst prüfen. Verfügbarkeit kann sich kurzfristig ändern.","I");
dir.getRange("A4:I4").values = [["Prio","Unternehmen","Ort","Rolle","Arbeitszeit","Warum passend","Offizielle Quelle","Geprüft","Aktion"]];
dir.getRange(`A5:I${direct.length+4}`).values = direct;
dir.getRange("A4:I4").format = { fill: teal, font: { bold: true, color: "#FFFFFF" }, wrapText: true };
dir.getRange(`A5:I${direct.length+4}`).format = { wrapText: true, verticalAlignment: "top", borders: { preset: "all", style: "thin", color: "#D7DEE5" } };
dir.getRange("A:I").format.columnWidth = 16; dir.getRange("A:A").format.columnWidth = 7; dir.getRange("B:B").format.columnWidth = 27;
dir.getRange("C:C").format.columnWidth = 17; dir.getRange("D:D").format.columnWidth = 37; dir.getRange("E:E").format.columnWidth = 16;
dir.getRange("F:F").format.columnWidth = 50; dir.getRange("G:G").format.columnWidth = 48; dir.getRange("H:I").format.columnWidth = 15;
dir.freezePanes.freezeRows(4);

const mon = wb.worksheets.add("Beobachten");
title(mon,"Beobachten / nicht blind initiativ bewerben","Hier ist der Initiativweg nicht bestätigt oder ausdrücklich ausgeschlossen. Deshalb nur die angegebene Aktion ausführen.","G");
mon.getRange("A4:G4").values = [["Unternehmen","Ort","Status Initiativbewerbung","Empfohlene Aktion","Offizielle Quelle","Passende Bereiche","Profil-Priorität"]];
mon.getRange(`A5:G${monitor.length+4}`).values = monitor;
mon.getRange("A4:G4").format = { fill: teal, font: { bold: true, color: "#FFFFFF" }, wrapText: true };
mon.getRange(`A5:G${monitor.length+4}`).format = { wrapText: true, verticalAlignment: "top", borders: { preset: "all", style: "thin", color: "#D7DEE5" } };
for (let r = 5; r <= monitor.length + 4; r++) {
  const status = monitor[r-5][2];
  if (status.includes("ausdrücklich") || status.includes("keine Initiativ")) mon.getRange(`A${r}:G${r}`).format.fill = red;
  else if (r % 2 === 0) mon.getRange(`A${r}:G${r}`).format.fill = light;
}
mon.getRange("A:G").format.columnWidth = 20; mon.getRange("A:A").format.columnWidth = 28; mon.getRange("B:B").format.columnWidth = 17;
mon.getRange("C:D").format.columnWidth = 36; mon.getRange("E:E").format.columnWidth = 48; mon.getRange("F:F").format.columnWidth = 36; mon.getRange("G:G").format.columnWidth = 14;
mon.freezePanes.freezeRows(4);

const qa = wb.worksheets.add("Anschreiben-System");
title(qa,"System für jedes neue Anschreiben","Das zuletzt abgestimmte rku.it-Anschreiben bleibt die Basis. Nur Unternehmensbezug, Einstieg und Schwerpunkt werden geändert; Länge bleibt eine Seite.","H");
qa.getRange("A4:H4").merge(); qa.getRange("A4").values = [["Feste Struktur"]]; qa.getRange("A4:H4").format = { fill: teal, font: { bold: true, color: "#FFFFFF" } };
qa.getRange("A5:H11").values = [
  ["1. Betreff","Initiativbewerbung im Bereich Projektmanagement – Vollzeit oder Teilzeit/Werkstudent","","","","","",""] ,
  ["2. Einstieg","Wie auf Unternehmen gestoßen + konkrete Zielrichtung + Vollzeitpräferenz.","","","","","",""] ,
  ["3. Unternehmen","Zwei konkrete Sätze: Aufgaben/Branche/Transformation; keine austauschbaren Lobfloskeln.","","","","","",""] ,
  ["4. Apeiros","Projektarbeiten, Angebote, Aufgaben/Termine, Beteiligte, Konfliktlösung – je nach Zielbranche gewichten.","","","","","",""] ,
  ["5. Picnic","Bis zu 50 Mitarbeitende, Ressourcen, zeitkritische Prozesse, Qualität, Verbesserung – für Operations/Industrie stärker.","","","","","",""] ,
  ["6. Studium","Analytik + Wirtschaftsinformatik ab 10/2026; nur wenn für Digital-/IT-/Prozessrollen relevant.","","","","","",""] ,
  ["7. Schluss","Zielrollen nennen, nächstmögliche Verfügbarkeit, Vollzeit; Alternative knapp, Gesprächswunsch.","","","","","",""] ,
];
qa.getRange("A5:H11").format = { wrapText: true, verticalAlignment: "top", borders: { preset: "all", style: "thin", color: "#D7DEE5" } };
qa.getRange("A13:H13").merge(); qa.getRange("A13").values = [["Branchengewichtung"]]; qa.getRange("A13:H13").format = { fill: gold, font: { bold: true, color: dark } };
qa.getRange("A14:H19").values = [
  ["IT/Digital","Wirtschaftsinformatik, Prozesse, schnelle Einarbeitung; keine IT-Expertise behaupten.","","","","","",""] ,
  ["Gesundheit/Soziales","Apeiros und DRK stärker; Stakeholder, Verantwortung, sensible Situationen.","","","","","",""] ,
  ["Energie/Kommunal","Klimainteresse, Daseinsvorsorge, Transformation, viele Beteiligte.","","","","","",""] ,
  ["Industrie/Logistik","Picnic stärker; Ressourcen, Qualität, Termine, Prozessoptimierung.","","","","","",""] ,
  ["Beratung","Analytik, verständliche Aufbereitung, Kommunikation, Organisationsentwicklung.","","","","","",""] ,
  ["Medien/Event","Kommunikation, YouTube-/Contentinteresse, Organisation vieler Beteiligter.","","","","","",""] ,
];
qa.getRange("A14:H19").format = { wrapText: true, verticalAlignment: "top", borders: { preset: "all", style: "thin", color: "#D7DEE5" } };
qa.getRange("A:A").format.columnWidth = 24; qa.getRange("B:H").format.columnWidth = 22; qa.freezePanes.freezeRows(2);

const preview = await wb.render({ sheetName: "Start & Strategie", autoCrop: "all", scale: 1, format: "png" });
await fs.writeFile(`${outDir}/preview_start.png`, new Uint8Array(await preview.arrayBuffer()));
const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(`${outDir}/Bewerbungsradar_Projektmanagement_Bochum_20km.xlsx`);

const check = await wb.inspect({kind:"table",range:`Initiativziele!A1:P12`,include:"values,formulas",tableMaxRows:12,tableMaxCols:16});
await fs.writeFile(`${outDir}/inspection.txt`, JSON.stringify(check, null, 2));
console.log(JSON.stringify({initiative: initiatives.length, direct: direct.length, monitor: monitor.length, output: `${outDir}/Bewerbungsradar_Projektmanagement_Bochum_20km.xlsx`}));
