*** Etapes de travail en cours, réalisées, à faire, à voir... ***


Travail à faire :

	- formulaire sur les 'super-zones' et adaptation des graphiques, carte
	
	- amélioration de l'affichage du popup sur le tableau de données

	-tests unitaires ? (karma, e2e...)

	-requêtes sur les 'super-zone' à réaliser


A voir, si nécessaire:

	-problème avec l'affichage dans le champs date d'une plage de date (format = anglais) > à revoir, si possible...



Fait:

	Dernières modifications (15/09/2020):


-- Commit 25 (15/09/2020): optimisations de code (refactoring), routing, responsive (bootstrap et media queries), bdd renommée `dataviz_fish_uk`

	- nettoyage global du code

	- BDD renommée `dataviz_fish_uk`

	- refactorisation: composants, services, html...

	- routing (erreur 404, secu de l'espace admin)

	- responsive (remplacer les média queries par des classes bootstrap)

	- layout de la page à revoir (bordures, disposition du texte...)

	- ergonomie de la partie formulaire / graphique -> ajout de modales bootstrap sur les graphiques et carte




-- --------------------------------------------------------------------------------------------------

-- Commit n° 24 : Modales (Bootstrap) d’affichage de graphiques (Chart.js) et de carte (Leaflet), formulaires de connexion (tests) pour membre et administrateur, formulaire --d’édition de profil (ajout, suppression, modification), tableau des membres (Bootstrap), Tabs Material Angular (datas, administrateur) – Angular 8.2, Node.js 12.14 (.gitignore : dossiers et fichers)


-- Commit n° 19 (02/03/2020) : Validation du formulaire d'interrogation des données sous Node.Js et Angular et affichage de résultats (extraits d'une BDD MySQL2), sous forme de tableau (Ag-Grid) et de graphiques (line et barcharts) - librairie 'Chart.js'


-- Commit 17 :  Ajout d'une carte interactive avec la librairie Leaflet.js (04/08/2019)

	- révisions du CSS

	- validation du formulaire d'interrogation des données

	- affichage des données choisies sous forme graphique (bar et linecharts)

	- affichage des données sous forme de tableau filtrable avec le module Ag-Grid

	- les autres champs à ajouter (+ calendrier pour date, avec le module Material Angular également)

	- intégration d'un champs Select 'name_specie' avec liste des noms qui marche / module 'material' pour angular(données réelles)

	- ajout d'un système d'onglets (tabs de Material Angular)


-- commit 10 :

	- création d'un formulaire d'interrogation des données sur un graphique de la librairie 'chart.js' (type 'linechart')

	- Modification de CSS (header...)

	- Suppression de 'quickstart-2.1.js non fonctionnel dans ce module. Le retrouver ici : https://github.com/DarKaweit/Node-Extract_SQL-Insert


-- Commit 9 :

	- Ajout de html, de CSS et possibilité d'affichage de tableaux et de graphiques (design en travail) sur des données extraites d'une BDD MySQL


-- Commit 8 :
	
	- [*** Note: module 'quickstart-2.1.js' supprimé (15/09_2020: Ce module est intégré dans 'Node-Extract_SQL-Insert' - cf: https://github.com/DarKaweit/Node-Extract_SQL-Insert (à consulter pour plus de détails)] : il permet la récupérations de données sélectionnées d'une pièce-jointe de mail au format '.xlsx', de leur parsage en fichier '.csv' (qui seront enregistrés dans le dossier 'Tableaux') et l'intégration de données selectionnées en Base de donnée MySQL (fichier : 'datafishuk-3.0.sql'). 


-- Commit 7 :

	- tests: possibilité d'interroger une BDD Mysql et d'afficher les données d'un objet 'json' sur un graphique (Attention : pour l'instant, au choix : l'abscisse ou l'ordonnée)
