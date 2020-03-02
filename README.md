# ukquota.dataviz.fish - fork (en test)

02/03/2020

Ceci est un fork de https://github.com/StevLG/ukquota.dataviz.fish.git (Licence GNU -v3)

Il se justifie notamment par un choix de présentation différente de l'interface (des tabs material-angular pour l'un / modales (bootstrap) pour l'autre. Les deux projets version pourront ainsi se prolonger parallèlement, si nécessaire, avec possibilité de choisir l'UX la plus adaptée).


travail à faire :

- responsive (remplacer les média queries par des classes bootstrap)

- layout de la page à revoir (bordures, disposition du texte...)




Dernières modifications :

-- Commit 1 (02/03/2020) :

	Fait :

- ergonomie de la partie formulaire / graphique modifiée : présentation de graphiques et carte sous forme de modale (bootstrap), refactorisation de code

-2 tabs (material angular pour l'instant) pour séparer:
	-formulaire de connexion (utilisateur)
	-tab (onglets) de formulaire de connexion (administrateur)
-formulaire d’inscription (utilisateur ou administrateur) et de modification de profil (login, mail), 
-tableau des membres inscrits modifiable (à optimiser : l’update ‘login’ et ‘mail’ dans le tableau)

-update des modules (node.js)


	A faire :

- revoir la gestion des cycles de vie (ngOnDestroy…)
- revoir la gestion des routes (avant mise en ligne)
- tests unitaires ??

- choix de librairie (Bootstrap ?? / Material ?? / Ag Grid pour le tableau ??)
si Bootstrap : revoir l’utilisation de ng-bootstrap... (jquery...)
- revoir le responsive (grid bootstrap ?)

- ajouter des données compplémentaires  (graphiques et carte des super-zones, sous forme de Tab ? ou de checkboxes  (zone / superzone? Sur le même formulaire de recherche)) → revoir l’API en conséquence (requêtes SQL…)

- clean général du code avant mise en ligne (on est en cours de construction, donc certains éléments sont laissé en commentaire pour inspiration ou utilisation possible ultérieure…)

- champs 'super-zone' à ajouter

    problème avec l'affichage dans le champs date d'une plage de date (format = anglais) > à revoir, si possible...



	by Code.bzh.

	With Angular, ChartJS, Express, Sequelize, MySQL, and Api Gmail


Lancement de l'application (après installation et configuration):

-Note : Ajouter un login / mail (admin dans "login-checked-directive.ts") - variables 'loginChek' et 'mailCheck'


Run `npm run build` to run the app

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
