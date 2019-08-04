// const mysql = require('mysql2');

// const express = require("express");
// const Rx = require("rxjs/Rx");

// const app = express();
// const bodyParser = require('body-parser'); // body-parser = nécessaire pour les requêtes 'post'

// // *************** REQUETE SUR LES DONNÉES DU FORMULAIRE SEARCHFORM :


// // *********************

// const router = express.Router();

// let model = require("../models");

// /*   const cls = require('continuation-local-storage'); // à tester : CLS () - installé par pour Sequelize https://github.com/othiym23/node-continuation-local-storage.git - 
// const ns = cls.createNamespace('....');*/
// const Sequelize = require('sequelize');
// //    Sequelize.useCLS(ns);

// /*   let Promise = require("bluebird"); // à tester pour Sequelize (pour le controle d'évènements asynchrones) */

// /*    const API = 'https://jsonplaceholder.typicode.com';   */

// // ***************

// //    const { SearchformComponent } = require('../../src/app/searchform/searchform.component');

// // **************
// const Op = Sequelize.Op;

// //  use sequelize with only alias for $and => Op.and
// //   const connection2 = new Sequelize("test_sakana", "root", "", { operatorsAliases: { $and: Op.and } });

// const operatorsAliases = {
//     $eq: Op.eq,
//     $ne: Op.ne,
//     $gte: Op.gte,
//     $gt: Op.gt,
//     $lte: Op.lte,
//     $lt: Op.lt,
//     $not: Op.not,
//     $in: Op.in,
//     $notIn: Op.notIn,
//     $is: Op.is,
//     $like: Op.like,
//     $notLike: Op.notLike,
//     $iLike: Op.iLike,
//     $notILike: Op.notILike,
//     $regexp: Op.regexp,
//     $notRegexp: Op.notRegexp,
//     $iRegexp: Op.iRegexp,
//     $notIRegexp: Op.notIRegexp,
//     $between: Op.between,
//     $notBetween: Op.notBetween,
//     $overlap: Op.overlap,
//     $contains: Op.contains,
//     $contained: Op.contained,
//     $adjacent: Op.adjacent,
//     $strictLeft: Op.strictLeft,
//     $strictRight: Op.strictRight,
//     $noExtendRight: Op.noExtendRight,
//     $noExtendLeft: Op.noExtendLeft,
//     $and: Op.and,
//     $or: Op.or,
//     $any: Op.any,
//     $all: Op.all,
//     $values: Op.values,
//     $col: Op.col
// };


// const connection = mysql.createConnection({
// // const sequelize = new Sequelize("test_sakana", "root", "", {

//     host: "localhost",
//     dialect: "mysql",
//     user: 'root',
//     database: 'test_sakana',
    
//     operatorsAliases: false,

//     // custom port; default: dialect default
//     // port: 4200,

//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }

// });

// // ****** TEST CONNECTION SLEEP : ****************

// /*
//     setInterval(function () {
//         sequelize.query('SELECT SLEEP(1);');
//         console.log(sequelize.pool.idle);
//     }, 2000);
// */

// // ************************************************



//     // sequelize
//     // .authenticate()
//     // .then(() => {
//     //     console.log("Connection has been established successfully.");
//     // })
//     // .catch(err => {
//     //     console.error("Unable to connect to the database:", err);
//     // });


//     /* GET api listing. */
//     router.get("/", (req, res) => {
//         res.send("api works");
//     });



// /*
// //  EXEMPLE À TRAVAILLER :
// router.get('/SearchNameSpecie', function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/NameSpecie
//     //  model.fishing.findOne().then(fishing => {

//     //    sequelize.query('SELECT DISTINCT name_specie FROM species WHERE
//     // name_specie like '%'+req.query.key+'%' ORDER BY name_specie ASC', function(err, results, fields) {)
//     sequelize.query('SELECT DISTINCT name_specie FROM species ORDER BY name_specie ASC', function(err, results, fields) {)
//     .then(fishing => {
//         const response = res.json(fishing);
//     //    console.log('NameSpecie :' + response);
//     })
//     .catch(error => {
//         res.status(500).send(error);
//     });

// });
// */

// /*
// //  EXEMPLE À TRAVAILLER :
// // REQUETE DEPUIS LE FORMULAIRE 'CHART-CHANGE' (EN TEST) :
// router.get('/fishes/:name_specie', function (req, res, next) { // ANCIENNE ÉCRITURE DE FONCTION
//     const requestedFishName = req.params['name_specie'];
  
//   // ET APRÈS : requête à la BDD pour 'fishing':
//   //    res.send({ requestedFishName, requestedFishSuperName });
//     console.log(requestedFishName);
 
//     sequelize.query("SELECT id_fishing, value_landing, value_quota, date, name_specie, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY date ASC", function(err, results, fields) { )
//     .then(fishing => {
//         // console.log(fishing);
//         res.json(fishing);
//     });
  
//   });
// */


// //  **************************************


// // **************************************** COURBES DE DATES - REQUETES : ******************************************

// // QUANTITÉS ET QUOTAS pêchés pour UNE ou TOUTES espèces à UNE date demandée dans UNE ou TOUTES les zone(s) :

// // ***************************************************************************************************************** 


// // QUANTITÉS ET QUOTAS pêchés sur une PÉRIODE donnée dans une zone pour UNE ou le TOTAL des espèce :
// // REQUETE DEPUIS LE FORMULAIRE 'CHART-CHANGE' (EN TEST AVEC TOUS LES PARAMÈTRES POSSIBLES) :


// // connexion sans 'Sequelize' :
// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

// router.get('/dates/:name_specie&:zone&:datebegin&:dateend', function (req, res, next) { // ANCIENNE ÉCRITURE DE FONCTION

//         const requestedFishName = req.params['name_specie'];
//         const requestedFishZone = req.params['zone'];
//         const requestedFishDateBegin = req.params['datebegin'];
//         const requestedFishDateEnd = req.params['dateend'];        
//         // const emptyReqParam = req.params[''];

//         // ET APRÈS : requête à la BDD pour 'fishing':
//         //    res.send({ requestedFishName, requestedFishSuperName });
//         console.log(' API sequelize request 1 : ' + requestedFishName + ' ' + requestedFishZone + ' ' + requestedFishDateBegin + ' ' + requestedFishDateEnd);

//         if (requestedFishName !== "vide" && requestedFishZone !== "vide" ) {
//             // si zone non vide :
//             connection.query("SELECT * FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY date ASC", function(err, results, fields) {
//                 console.log(results); // results contains rows returned by server
//                 console.log(fields); // fields contains extra meta data about results, if available
            
//             });

//         } else if (requestedFishName !== "vide" && requestedFishZone === "vide") {
//             // si zone vide :
//             connection.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date, name_specie FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC", function(err, results, fields) {
//                 console.log(results); // results contains rows returned by server
//                 console.log(fields); // fields contains extra meta data about results, if available            
//             });

//         } else if (requestedFishName === "vide" && requestedFishZone !== "vide") {
//             // si zone vide :
//             connection.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC", function(err, results, fields) {
//                 console.log(results); // results contains rows returned by server
//             });

//         } else if (requestedFishName === "vide" && requestedFishZone === "vide") {
//             // si zone vide :
//             connection.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC", function(err, results, fields) {
//                 console.log(results); // results contains rows returned by server
//                 console.log(fields); // fields contains extra meta data about results, if available 
//             });

//         }
    
// });




// // **************************************** BARRES D'ESPÈCES' - REQUETES : ******************************************

// // QUANTITÉS ET QUOTAS pêchés pour UNE ou TOUTES espèces à UNE date demandée dans UNE ou TOUTES les zone(s) :

// // *************************************************************************************************************** 

// // ***********************************


// router.get('/species/:name_specie&:zone&:date', function (req, res, next) { // ANCIENNE ÉCRITURE DE FONCTION
//     const requestedFishName = req.params['name_specie'];
//     const requestedFishZone = req.params['zone'];
//     const requestedFishDate = req.params['date'];

//     console.log(' API sequelize request 2 : ' + requestedFishName + ' ' + requestedFishZone + ' ' + requestedFishDate);

//     // CAS NORMAL SOUHAITÉ : QUANTITÉS ET QUOTAS pêchés dans UNE zone pour TOUTES les espèces à LA date demandée (une seule date) :
//     if (requestedFishName === "vide" && requestedFishZone !== "vide") { // LA DATE EST TOUJOURS RENSEIGNÉE AUTOMATIQUEMENT
//         connection.query("SELECT name_specie, zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available 
//         });

//     } else if (requestedFishName !== "vide" && requestedFishZone !== "vide") {
//         connection.query("SELECT name_specie, zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available 
//         });

//     } else if (requestedFishName !== "vide" && requestedFishZone === "vide") {
//         connection.query("SELECT name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available 
//         });
//         // somme des captures / quotas de chaque zone à une date, par espèce : (on n'affiche donc pas la zone !)
//     } else if (requestedFishName === "vide" && requestedFishZone === "vide") {
//         connection.query("SELECT name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available 
//         });

//     };

// });


// // **************************************** BARRES DE ZONES - REQUETES : ******************************************** 

// // QUANTITÉS ET QUOTAS pêchés dans UNE ou TOUTES les zones pour UNE ou TOUTES les espèces, à UNE date ou sur une 
// // plage de dates (SOMME)

// // *************************************************************************************************************** 



// router.get('/zones/:name_specie&:zone&:date', function (req, res, next) { // ANCIENNE ÉCRITURE DE FONCTION

//     const requestedFishName = req.params['name_specie'];
//     const requestedFishZone = req.params['zone'];
//     const requestedFishDate = req.params['date'];

//     console.log(' API sequelize request 3 : ' + requestedFishName + ' ' + requestedFishZone + ' ' + requestedFishDate);


//     // CAS NORMAL SOUHAITÉ : QUANTITÉS ET QUOTAS pêchés dans TOUTES les zones à UNE ou PLUSIEURS date(s) demandée pour UNE ou TOUTES les espèces :
//     // cas 'vide' = toutes données de champs sélectionnées
//     if (requestedFishName !== "vide" && requestedFishZone === "vide" && requestedFishDate !== "vide") { // LA DATE EST TOUJOURS RENSEIGNÉE AUTOMATIQUEMENT (jamais vide)
//         connection.query("SELECT zone, name_specie, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available 
//         });
    
//     // CAS OU TOUTES LES ZONES SÉLECTIONNÉES POUR UNE ESPÈCE :
//     } else if (requestedFishName !== "vide" && requestedFishZone !== "vide" && requestedFishDate !== "vide") {
//         connection.query("SELECT zone, name_specie, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available 
//         });

//     } else if (requestedFishName === "vide" && requestedFishZone !== "vide" && requestedFishDate !== "vide") {
//         connection.query("SELECT zone, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone ASC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//                 console.log(fields); // fields contains extra meta data about results, if available 
//         });
//         // somme des captures / quotas de chaque zone à une date, par espèce : (on n'affiche donc pas la zone !)

//     } else if (requestedFishName === "vide" && requestedFishZone === "vide" && requestedFishDate !== "vide") {
//         connection.query("SELECT zone, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available 
//         });    

//     }; // fin de boucle 'ELSE IF'

// }); // FIN DE REQUETE






// // *****************************************************************************************************************//

// // REQUETES GÉNÉRIQUES (POUR UN GRAPHIQUE DE BASE DANS LA METHODE 'ONINIT' - CF : LES DIFFÉRENTS 'CHART.COMPONENT')

// // *****************************************************************************************************************//


// // I> Pour 'DATES-CHART' :

// router.get("/AllFishingDates", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/AllFishings
//     // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

//     connection.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date >= '2018-02-07' GROUP BY date ORDER BY date ASC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     });
// });

    
// // II> Pour 'SPECIES-CHART' :

// router.get("/AllFishingSpecies/:date", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/AllFishings
//     // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

//     const requestedFishDate = req.params['date'];

//     connection.query("SELECT id_fishing, name_specie, date, value_landing, value_quota, super_zone, zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' ORDER BY date ASC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     });

// });


// // III> Pour 'ZONES-CHART' :

// router.get("/AllFishingZones", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/AllFishings
//     // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

//     connection.query("SELECT id_fishing, name_specie, date, value_landing, value_quota, super_zone, zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date <= '' ORDER BY id_fishing ASC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     });
// });


// // ****************************************************************************************************************************




// // REQUÊTE GÉNÉRALE qui marche (pour 'test_sakana'): (prend toutes les données actuelles):


//     router.get("/AllFishings", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/AllFishings
//     // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

//         connection.query("SELECT id_fishing, name_specie, date, value_landing, value_quota, super_zone, zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY id_fishing ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });
//     });







// // REQUÊTE SUR DIFFÉRENTS OBJETS : 'AllSpeciesAtSuperZone':
// // problème : comment afficher à la fois 'date' + 'name_specie' en abscisse ?

// router.get("/AllSpeciesAtSuperZone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/AllSpeciesAtSuperZone

//     connection.query("SELECT DISTINCT id_fishing, value_landing, value_quota, date, name_specie, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE super_zone = 'North sea' ORDER BY name_specie ASC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     });

// });    






// // *****************************************************************************************************************//

// // *****       REQUETES POUR APPROVISIONNER LES CHAMPS 'SELECT' DU FORMULAIRE DE RECHERCHE      ***** //

// // *****************************************************************************************************************//




// router.get("/NameSpecie", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/NameSpecie
// //  model.fishing.findOne().then(fishing => {

// //    connection.query('SELECT DISTINCT name_specie FROM species WHERE name_specie like "%'+req.query.key+'%" ORDER BY name_specie ASC', function(err, results, fields) {)
//     connection.query('SELECT DISTINCT name_specie FROM species ORDER BY name_specie ASC', function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     });

// });

// router.get("/Date", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/Date
//     /*model.fishing.findOne().then(fishing => {*/

//     connection.query("SELECT DISTINCT date FROM `fishing` ORDER BY date DESC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     });

// });


// router.get("/SuperZone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/SuperZone
//     /*model.fishing.findOne().then(fishing => {*/

//     connection.query("SELECT DISTINCT super_zone FROM `species` ORDER BY super_zone ASC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     });

// });

// router.get("/Zone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/Zone
//     /*model.fishing.findOne().then(fishing => {*/

//     connection.query("SELECT DISTINCT zone FROM `species` ORDER BY zone ASC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     });

// });




// // ***************************************************************************************************************** //

// //  REQUETES POUR METTRE A JOUR LES CHAMPS 'SELECT' (AVEC SIMPLE DATE) DU FORMULAIRE DE RECHERCHE                  //

// // ***************************************************************************************************************** //

// // *******************************************************

// // MISE A JOUR DU CHAMPS ZONE :

// // ********************************************************

//     // SI NOM D'ESPÈCE = VIDE :

// router.get("/newZoneForSingleDate/:name_specie&:date", function(req, res, next) {

//     const requestedFishName = req.params['name_specie'];
//     console.log('test new request name_specie : ' + requestedFishName);

//     const requestedFishDate = req.params['date'];
//     console.log('test new request date : ' + requestedFishDate);


//     // SI NOM D'ESPÈCE = VIDE :

//     if (requestedFishName === "vide" && requestedFishDate !== "vide") {

//         connection.query("SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishName === "vide" && requestedFishDate === "vide") {

//         connection.query("SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });    




//         //**************************************************  */
//         // SI NOM D'ESPÈCE = NON-VIDE :

//     } else if (requestedFishName !== "vide" && requestedFishDate !== "vide") {

//         connection.query("SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishName !== "vide"  && requestedFishDate === "vide") {

//         connection.query("SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     };

// });





// // *******************************************************

// // MISE A JOUR DU CHAMPS NOMS D'ESPÈCES :

// // *******************************************************



// router.get("/newNameSpForSingleDate/:zone&:date", function(req, res, next) {

//     const requestedFishZone = req.params['zone'];
//     console.log('test new request zone : ' + requestedFishZone);
//     const requestedFishDate = req.params['date'];
//     console.log('test new request date : ' + requestedFishDate);


// // ******************************************************

// // CHAMPS ZONE VIDE :

//     if (requestedFishZone === "vide" && requestedFishDate !== "vide") {

//         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' ORDER BY name_specie ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishZone === "vide" && requestedFishDate === "vide") {

//         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY name_specie ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

    

// // ******************************************************

// // CHAMPS ZONE NON-VIDE :

//     } else if (requestedFishZone !== "vide" && requestedFishDate !== "vide") {

//         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' ORDER BY name_specie ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishZone !== "vide" && requestedFishDate === "vide") {

//         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' ORDER BY name_specie ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     };

// });







// // *******************************************************

// // MISE A JOUR DU CHAMPS SIMPLE DATE

// // ********************************************************



// router.get("/newDateForSingleDate/:name_specie&:zone", function(req, res, next) {

//     const requestedFishName = req.params['name_specie'];
//     console.log('test new request name_specie : ' + requestedFishName);
//     const requestedFishZone = req.params['zone'];
//     console.log('test new request zone : ' + requestedFishZone);

//     const requestedFishDate = req.params['date'];
//     console.log('test new request date : ' + requestedFishDate);

//     if (requestedFishName === "vide" && requestedFishZone === "vide") {

//         connection.query("SELECT DISTINCT date FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY date DESC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishName === "vide" && requestedFishZone !== "vide") {

//         connection.query("SELECT DISTINCT date FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' ORDER BY date DESC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishName !== "vide" && requestedFishZone === "vide") {

//         connection.query("SELECT DISTINCT date FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY date DESC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishName !== "vide" && requestedFishZone !== "vide") {

//         connection.query("SELECT DISTINCT date FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' ORDER BY date DESC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     };

// });






// // *****************************************************************************************************************    



// // ***************************************************************************************************************** //

// //  REQUETES POUR METTRE A JOUR LES CHAMPS 'SELECT' (AVEC PLAGE DE DATE) DU FORMULAIRE DE RECHERCHE                  //

// // ***************************************************************************************************************** //


// // *******************************************************

// // MISE A JOUR DU CHAMPS ZONE :

// // ********************************************************


//     // SI NOM D'ESPÈCE = VIDE :

// // router.get("/newnamesp/:name_specie&:date2", function(req, res, next) {
// router.get("/newZone/:name_specie&:date2Begin&:date2End", function(req, res, next) {

//     const requestedFishName = req.params['name_specie'];
//     console.log('test new request Name_Specie : ' + requestedFishName);

//     const requestedFishDateBegin = req.params['date2Begin'];
//     console.log('test new request Date2Begin : ' + requestedFishDateBegin);
//     const requestedFishDateEnd = req.params['date2End'];
//     console.log('test new request Date2End : ' + requestedFishDateEnd);

//     // const requestedFishDate = req.params['date2']
//     // console.log('test new request Date2 : ' + requestedFishDate);



//     // SI NOM D'ESPÈCE = VIDE :

//     if (requestedFishName === "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

//         connection.query("SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishName === "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd !== "vide") {

//         connection.query("SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishName === "vide"  && requestedFishDateBegin !== "vide" && requestedFishDateEnd === "vide") {

//         connection.query("SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     // } else if (requestedFishName === "vide"  && requestedFishDate === "vide") {
//     } else if (requestedFishName === "vide"  && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

//         connection.query("SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });





//         //**************************************************  */
//         // SI NOM D'ESPÈCE = NON-VIDE :


//     } else if (requestedFishName !== "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

//         connection.query("SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishName !== "vide"  && requestedFishDateBegin === "vide" && requestedFishDateEnd !== "vide") {

//         connection.query("SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishName !== "vide"  && requestedFishDateBegin !== "vide" && requestedFishDateEnd === "vide") {

//         connection.query("SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishName !== "vide"  && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {
//     //  } else if (requestedFishName !== "vide"  && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

//         connection.query("SELECT DISTINCT zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY zone ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     };

// });


// // *******************************************************

// // MISE A JOUR DU CHAMPS NOM D'ESPÈCES :

// // ********************************************************



// router.get("/newNameSp/:zone&:date2Begin&:date2End", function(req, res, next) {

//     const requestedFishZone = req.params['zone'];
//     console.log('test new request zone : ' + requestedFishZone);
//     const requestedFishDateBegin = req.params['date2Begin'];
//     console.log('test new request Date2Begin : ' + requestedFishDateBegin);
//     const requestedFishDateEnd = req.params['date2End'];
//     console.log('test new request Date2End : ' + requestedFishDateEnd);


// // ******************************************************

// // CHAMPS ZONE VIDE :

//     if (requestedFishZone === "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

//         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishZone === "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd !== "vide") {

//         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishZone === "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd === "vide") {

//         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' ORDER BY name_specie ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishZone === "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

//         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY name_specie ASC", function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     });

    

// // ******************************************************

// // CHAMPS ZONE NON-VIDE :

//     } else if (requestedFishZone !== "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

//         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishZone !== "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd !== "vide") {

//         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishZone !== "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd === "vide") {

//         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' ORDER BY name_specie ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     } else if (requestedFishZone !== "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

//         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE zone = '"+ requestedFishZone +"' ORDER BY name_specie ASC", function(err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
//         });

//     };

// });


// connection.end();



// // *******************************************************

// // MISE A JOUR DU CHAMPS DATES : (SI CHOIX D'UNE SELECT-LISTE DÉROULANTE)

// // ********************************************************



// // router.get("/newDate2/:date2Begin&:date2End", function(req, res, next) {

// //     const requestedFishDateBegin = req.params['date2Begin'];
// //     console.log('test new request Date2Begin : ' + requestedFishDateBegin);
// //     const requestedFishDateEnd = req.params['date2End'];
// //     console.log('test new request Date2End : ' + requestedFishDateEnd);

// //     if (requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

// //         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY name_specie ASC", function(err, results, fields) {
// //         .then(fishing => {
// //         //    console.log(fishing);
// //             res.status(200).json(fishing); // OK : réussite de la requête
// //             // next();
// //         })
// //         .catch(error => {
// //         res.status(500).send(error) // Internal Server Error = erreur générique
// //         });

// //     } else if (requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

// //         connection.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC", function(err, results, fields) {
// //         .then(fishing => {
// //         //    console.log(fishing);
// //             res.status(200).json(fishing); // OK : réussite de la requête
// //             // next();
// //         })
// //         .catch(error => {
// //         res.status(500).send(error) // Internal Server Error = erreur générique
// //         });

// //     };

// // });



// module.exports = router;
