const express = require("express");
const Rx = require("rxjs/Rx");

const app = express();
const bodyParser = require('body-parser'); // body-parser = nécessaire pour les requêtes 'post'

// *************** REQUETE SUR LES DONNÉES DU FORMULAIRE SEARCHFORM :


// *********************

const router = express.Router();

let model = require("../models");

/*   const cls = require('continuation-local-storage'); // à tester : CLS () - installé par pour Sequelize https://github.com/othiym23/node-continuation-local-storage.git - 
const ns = cls.createNamespace('....');*/
const Sequelize = require('sequelize');
//    Sequelize.useCLS(ns);

/*   let Promise = require("bluebird"); // à tester pour Sequelize (pour le controle d'évènements asynchrones) */

/*    const API = 'https://jsonplaceholder.typicode.com';   */

// ***************

//    const { SearchformComponent } = require('../../src/app/searchform/searchform.component');

// **************
const Op = Sequelize.Op;

//  use sequelize with only alias for $and => Op.and
//   const connection2 = new Sequelize("test_sakana", "root", "", { operatorsAliases: { $and: Op.and } });

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

const sequelize = new Sequelize("test_sakana", "root", "test", {

    host: "localhost",
    dialect: "mysql", // mysql
    
    // operatorsAliases: false,

    // custom port; default: dialect default
    // port: 4200,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});

// ****** TEST CONNECTION SLEEP : ****************

/*
    setInterval(function () {
        sequelize.query('SELECT SLEEP(1);');
        console.log(sequelize.pool.idle);
    }, 2000);
*/

// ************************************************



    sequelize
        .authenticate()
        .then(() => {
            console.log("Connection has been established successfully.");
        })
        .catch(err => {
            console.error("Unable to connect to the database:", err);
        });


    /* GET api listing. */
    router.get("/", (req, res) => {
        res.send("api works");
    });

    

/*
//  EXEMPLE À TRAVAILLER :
router.get('/SearchNameSpecie', function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/NameSpecie
    //  model.fishing.findOne().then(fishing => {

    //    sequelize.query('SELECT DISTINCT name_specie FROM species WHERE
    // name_specie like '%'+req.query.key+'%' ORDER BY name_specie ASC', { type : sequelize.QueryTypes.SELECT })
    sequelize.query('SELECT DISTINCT name_specie FROM species ORDER BY name_specie ASC', { type : sequelize.QueryTypes.SELECT })
    .then(fishing => {
        const response = res.json(fishing);
    //    console.log('NameSpecie :' + response);
    })
    .catch(error => {
        res.status(500).send(error);
    });

});
*/

/*
//  EXEMPLE À TRAVAILLER :
// REQUETE DEPUIS LE FORMULAIRE 'CHART-CHANGE' (EN TEST) :
router.get('/fishes/:name_specie', function (req, res, next) { // ANCIENNE ÉCRITURE DE FONCTION
    const requestedFishName = req.params['name_specie'];
  
  // ET APRÈS : requête à la BDD pour 'fishing':
  //    res.send({ requestedFishName, requestedFishSuperName });
    console.log(requestedFishName);
 
    sequelize.query("SELECT id_fishing, value_landing, value_quota, date, name_specie, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY date ASC", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => {
        // console.log(fishing);
        res.json(fishing);
    });
  
  });
*/







// ***************************************************************************************************************************


// TEST :

// REQUÊTE SUR DIFFÉRENTS OBJETS : 'AllSpeciesAtSuperZone':

// router.get("/AllSpeciesAtSuperZone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/AllSpeciesAtSuperZone

//     sequelize.query("SELECT DISTINCT id_fishing, value_landing, value_quota, date, name_specie, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE super_zone = 'North sea' ORDER BY name_specie ASC", { type : sequelize.QueryTypes.SELECT } )
//     .then(fishing => {            
//     //   console.log(fishing);
//         res.json(fishing);
//     });

// });    



//  ************************************************************************************




// *****************************************************************************************************************//

// REQUETES GÉNÉRIQUES (POUR UN TABLEAU DE BASE DANS LA METHODE 'ONINIT' - CF : LES DIFFÉRENTS 'CHART.COMPONENT')
// CF COMPOSANT 'QUICKFILTER-BIS' (A RENOMMER)

// *****************************************************************************************************************//



// ***********
// REQUÊTE GÉNÉRALE qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

router.get("/AllFishings", function(req, res, next) {

    // envoie la donnée sur http://localhost:3000/api/AllFishings
    // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

    // REQUÊTE BDD 5.3 : infos sur la dernière date : test
    // sequelize.query("SELECT id_fishing, name_specie, zone, super_zone, max(date) AS date, value_landing, value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN super_zones ON fishzone_join.id_super_zone = super_zones.id_super_zone WHERE date IN (SELECT max(date) FROM fishing) GROUP BY id_fishing ORDER BY id_fishing;", { type : sequelize.QueryTypes.SELECT })

    // REQUÊTE BDD 5.3 : infos sur toutes les dates :
    sequelize.query("SELECT id_fishing, name_specie, zone, super_zone, date, value_landing, value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN super_zones ON fishzone_join.id_super_zone = super_zones.id_super_zone ORDER BY id_fishing DESC;", { type : sequelize.QueryTypes.SELECT })

    // ANCIENNE REQUÊTE (BDD 4.2) :
    // sequelize.query("SELECT id_fishing, name_specie, date, value_landing, value_quota, super_zone, zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY id_fishing ASC", { type : sequelize.QueryTypes.SELECT } )

    .then(fishing => {
    //    console.log(fishing);
        res.status(200).json(fishing); // OK : réussite de la requête
        // next();
    })
    .catch(error => {
    res.status(500).send(error) // Internal Server Error = erreur générique
    });

});





// *****************************************************************************************************************//

// REQUETES GÉNÉRIQUES (POUR UN GRAPHIQUE DE BASE DANS LA METHODE 'ONINIT' - CF : LES DIFFÉRENTS 'CHART.COMPONENT')

// *****************************************************************************************************************//



// ******
// I> Pour 'DATES-CHART' :

router.get("/AllFishingDates", function(req, res, next) {
    // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

    sequelize.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join WHERE date >= (SELECT min(date) FROM fishing) GROUP BY date ORDER BY date ASC;", { type : sequelize.QueryTypes.SELECT } )
    // sequelize.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date >= '2018-02-07' GROUP BY date ORDER BY date ASC;", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => {           
    //    console.log(fishing);
        res.status(200).json(fishing); // OK : réussite de la requête
        // next();
    })
    .catch(error => {
    res.status(500).send(error) // Internal Server Error = erreur générique
    });
});

// ******
// II> Pour 'SPECIES-CHART' :

router.get("/AllFishingSpecies", function(req, res, next) {

    sequelize.query("SELECT name_specie, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date IN (SELECT max(date) FROM fishing) GROUP BY name_specie ORDER BY name_specie;", { type : sequelize.QueryTypes.SELECT } )
    // sequelize.query("SELECT name_specie, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = (SELECT date FROM fishing WHERE date <= CURDATE() GROUP BY date ORDER BY date DESC LIMIT 1) GROUP BY name_specie ORDER BY name_specie;", { type : sequelize.QueryTypes.SELECT } ) // AVANT (AUTRE ÉCRITURE A VOIR...) 
    .then(fishing => {
        console.log(fishing);
        res.status(200).json(fishing); // OK : réussite de la requête
        // next();
    })
    .catch(error => {
    res.status(500).send(error) // Internal Server Error = erreur générique
    });

});


// router.get("/AllFishingSpecies/:date", function(req, res, next) {

//     const requestedFishDate = req.params['date'];

//     sequelize.query("SELECT name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie", { type : sequelize.QueryTypes.SELECT } ) // ou à voir :  DESC LIMIT 1,42 = pour LIMITER LE NOMBRE D'ENREGISTREMENTS AU NOMBRE D'ENREGISTREMENT DANS LA TABLE 'NAME_SPECIES' (nb = 43) ??? > pb : fait la somme de tout ce qui a été enregistré précédemment
//     .then(fishing => {
//         console.log(fishing);
//         res.status(200).json(fishing); // OK : réussite de la requête
//         // next();
//     })
//     .catch(error => {
//     res.status(500).send(error) // Internal Server Error = erreur générique
//     });

// });


// III> Pour 'ZONES-CHART' :

router.get("/AllFishingZones", function(req, res, next) {

    sequelize.query("SELECT zones.id_zone, zone, z_coord, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date IN (SELECT max(date) FROM fishing) GROUP BY zones.id_zone ORDER BY zones.id_zone;", { type : sequelize.QueryTypes.SELECT } )
    // ****
    // sequelize.query("SELECT zone, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date IN (SELECT max(date) FROM fishing) GROUP BY zone ORDER BY zone;", { type : sequelize.QueryTypes.SELECT } )
    // ****
    // sequelize.query("SELECT zone, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = (SELECT date FROM fishing WHERE date <= CURDATE() GROUP BY date ORDER BY date DESC LIMIT 1) GROUP BY zone ORDER BY zone", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => { 
    //    console.log(fishing);
        res.status(200).json(fishing); // OK : réussite de la requête
        // next();
    })
    .catch(error => {
    res.status(500).send(error) // Internal Server Error = erreur générique
    });
});


// router.get("/AllFishingZones/:date", function(req, res, next) {

//     // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

//     const requestedFishDate = req.params['date'];

//     sequelize.query("SELECT zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' GROUP BY zone ORDER BY zone", { type : sequelize.QueryTypes.SELECT } )
//     .then(fishing => {           
//     //    console.log(fishing);
//         res.status(200).json(fishing); // OK : réussite de la requête
//         // next();
//     })
//     .catch(error => {
//     res.status(500).send(error) // Internal Server Error = erreur générique
//     });
// });






// ****************************************************************************************************************************




// **************************************** COURBES DE DATES - REQUETES : ******************************************

// QUANTITÉS ET QUOTAS pêchés pour UNE ou TOUTES espèces à UNE date demandée dans UNE ou TOUTES les zone(s) :

// ***************************************************************************************************************** 


// QUANTITÉS ET QUOTAS pêchés sur une PÉRIODE donnée dans une zone pour UNE ou le TOTAL des espèce :
// REQUETE DEPUIS LE FORMULAIRE 'CHART-CHANGE' (EN TEST AVEC TOUS LES PARAMÈTRES POSSIBLES) :



router.get('/dates/:name_specie&:zone&:datebegin&:dateend', function (req, res, next) { // ANCIENNE ÉCRITURE DE FONCTION

    const requestedFishName = req.params['name_specie'];
    const requestedFishZone = req.params['zone'];
    const requestedFishDateBegin = req.params['datebegin'];
    const requestedFishDateEnd = req.params['dateend'];        
    // const emptyReqParam = req.params[''];

    // ET APRÈS : requête à la BDD pour 'fishing':
    //    res.send({ requestedFishName, requestedFishSuperName });
    console.log(' API sequelize request 1 : ' + requestedFishName + ' ' + requestedFishZone + ' ' + requestedFishDateBegin + ' ' + requestedFishDateEnd);

    // ********
    // UNE ESPÈCE, UNE ZONE :
    if (requestedFishName !== "vide" && requestedFishZone !== "vide" ) {
        // si zone non vide :
        sequelize.query("SELECT * FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY date ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log('API fishing : ' + fishing);
            res.json(fishing);
        })
        .catch(error => {
            res.status(500).send(error) // Internal Server Error = erreur générique
        });
    
    // ********
    // UNE ESPÈCE, TOUTES ZONES :
    } else if (requestedFishName !== "vide" && requestedFishZone === "vide") {
        // si zone vide :
        sequelize.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date, name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log(fishing);
            res.json(fishing); // réponse 304 = résultat affiché en console
        });

    // ******
    // TOUTES ESPÈCES, UNE ZONE :
    } else if (requestedFishName === "vide" && requestedFishZone !== "vide") {
        // si zone vide :
        sequelize.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date, zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log(fishing);
            res.json(fishing);
        });
    
    // ******
    // TOUTES ESPÈCES, TOUTES ZONES:
    } else if (requestedFishName === "vide" && requestedFishZone === "vide") {
        // si zone vide :
        sequelize.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log(fishing);
            res.json(fishing);
        });

    }
    
});




// **************************************** BARRES D'ESPÈCES' - REQUETES : ******************************************

// QUANTITÉS ET QUOTAS pêchés pour UNE ou TOUTES espèces à UNE date demandée dans UNE ou TOUTES les zone(s) :

// *************************************************************************************************************** 

// ***********************************


router.get('/species/:name_specie&:zone&:date', function (req, res, next) { // ANCIENNE ÉCRITURE DE FONCTION
    const requestedFishName = req.params['name_specie'];
    const requestedFishZone = req.params['zone'];
    const requestedFishDate = req.params['date'];

    console.log(' API sequelize request 2 : ' + requestedFishName + ' ' + requestedFishZone + ' ' + requestedFishDate);

    // ******
    // TOUTES ESPÈCES, UNE ZONE, UNE DATE:
    if (requestedFishName === "vide" && requestedFishZone !== "vide" && requestedFishDate !== "vide") { // LA DATE EST TOUJOURS RENSEIGNÉE AUTOMATIQUEMENT
        sequelize.query("SELECT name_specie, zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log(fishing);
            res.json(fishing);
        });

    // ******
    // UNE ESPÈCE, UNE ZONE, UNE DATE:
    } else if (requestedFishName !== "vide" && requestedFishZone !== "vide" && requestedFishDate !== "vide") {
        sequelize.query("SELECT name_specie, zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log(fishing);
            res.json(fishing);
        });

    // ******
    // UNE ESPÈCE, TOUTES ZONES, UNE DATE:
    } else if (requestedFishName !== "vide" && requestedFishZone === "vide" && requestedFishDate !== "vide") {
        sequelize.query("SELECT name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log(fishing);
            res.json(fishing);
        });

    // ******
    // TOUTES ESPÈCES, TOUTES ZONES, UNE DATE: 
    } else if (requestedFishName === "vide" && requestedFishZone === "vide" && requestedFishDate !== "vide") {
        // sequelize.query("SELECT name_specie, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date IN (SELECT max(date) FROM fishing) GROUP BY name_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        sequelize.query("SELECT name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log(fishing);
            res.json(fishing);
        });

    };

});



// **************************************** BARRES DE ZONES - REQUETES : ******************************************** 

// QUANTITÉS ET QUOTAS pêchés dans UNE ou TOUTES les zones pour UNE ou TOUTES les espèces, à UNE date ou sur une 
// plage de dates (SOMME)

// *************************************************************************************************************** 



router.get('/zones/:name_specie&:zone&:date', function (req, res, next) { // ANCIENNE ÉCRITURE DE FONCTION

    const requestedFishName = req.params['name_specie'];
    const requestedFishZone = req.params['zone'];
    const requestedFishDate = req.params['date'];

    console.log(' API sequelize request 3 : ' + requestedFishName + ' ' + requestedFishZone + ' ' + requestedFishDate);

    // ******
    // UNE ESPÈCE, TOUTES ZONES, UNE DATE :
    if (requestedFishName !== "vide" && requestedFishZone === "vide" && requestedFishDate !== "vide") { // LA DATE EST TOUJOURS RENSEIGNÉE AUTOMATIQUEMENT (jamais vide)
    // if (requestedFishName !== "vide" && requestedFishZone === "vide" && requestedFishDate !== "vide") { // LA DATE EST TOUJOURS RENSEIGNÉE AUTOMATIQUEMENT (jamais vide)
        sequelize.query("SELECT zone, name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log(fishing);
            res.json(fishing);
        });
    
    // ******

    // UNE ESPÈCE, UNE ZONE, UNE DATE :
    } else if (requestedFishName !== "vide" && requestedFishZone !== "vide" && requestedFishDate !== "vide") {
    // } else if (requestedFishName !== "vide" && requestedFishZone !== "vide" && requestedFishDate !== "vide") {
        sequelize.query("SELECT zone, name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie  WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log(fishing);
            res.json(fishing);
        });

    // TOUTES ESPECES, UNE ZONE, UNE DATE :
    // ******
    } else if (requestedFishName === "vide" && requestedFishZone !== "vide" && requestedFishDate !== "vide") {
    // } else if (requestedFishName === "vide" && requestedFishZone !== "vide" && requestedFishDate !== "vide") {
        sequelize.query("SELECT zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log(fishing);
            res.json(fishing);
        });
        // somme des captures / quotas de chaque zone à une date, par espèce : (on n'affiche donc pas la zone !)
    
    // TOUTE ESPECES, TOUTE ZONES, UNE DATE :
    // ******
    } else if (requestedFishName === "vide" && requestedFishZone === "vide" && requestedFishDate !== "vide") {
    // } else if (requestedFishName === "vide" && requestedFishZone === "vide" && requestedFishDate !== "vide") {
        sequelize.query("SELECT zone, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone AND date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        // sequelize.query("SELECT zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log(fishing);
            res.json(fishing);
        });    


    }; // fin de boucle 'ELSE IF'
    
}); // FIN DE REQUETE







// *****************************************************************************************************************//

// *****       REQUETES POUR APPROVISIONNER LES CHAMPS 'SELECT' DU FORMULAIRE DE RECHERCHE      ***** //

// *****************************************************************************************************************//




router.get("/NameSpecie", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/NameSpecie
//  model.fishing.findOne().then(fishing => {

//    sequelize.query('SELECT DISTINCT name_specie FROM species WHERE name_specie like "%'+req.query.key+'%" ORDER BY name_specie ASC', { type : sequelize.QueryTypes.SELECT })
    sequelize.query('SELECT DISTINCT name_specie FROM species ORDER BY name_specie ASC;', { type : sequelize.QueryTypes.SELECT })
    .then(fishing => {         
        let response = res.json(fishing);
    //    console.log('NameSpecie :' + response);
    })
    .catch(error => {
        res.status(500).send(error)
    });
    
});


router.get("/Date", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/Date
    /*model.fishing.findOne().then(fishing => {*/

    sequelize.query("SELECT DISTINCT date FROM fishing ORDER BY date DESC;", { type : sequelize.QueryTypes.SELECT })
    .then(date => {         
        // console.log(date);
        res.json(date);
    })
    .catch(error => {
        res.status(500).send(error)
    });

});


router.get("/Zone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/Zone
    /*model.fishing.findOne().then(fishing => {*/

    sequelize.query("SELECT DISTINCT zone FROM zones ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
    .then(zone => {    
        // console.log(zone);
        res.json(zone);
    })
    .catch(error => {
        res.status(500).send(error)
    });

});


router.get("/SuperZone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/SuperZone
    /*model.fishing.findOne().then(fishing => {*/

    sequelize.query("SELECT DISTINCT super_zone FROM super_zones ORDER BY super_zone ASC;", { type : sequelize.QueryTypes.SELECT })
    .then(superzone => {         
        // console.log(superzone);
        res.json(superzone);
    })
    .catch(error => {
        res.status(500).send(error)
    });

});







// ***************************************************************************************************************** //

//  REQUETES POUR METTRE A JOUR LES CHAMPS 'SELECT' (AVEC SIMPLE DATE) DU FORMULAIRE DE RECHERCHE                  //

// ***************************************************************************************************************** //

// *******************************************************

// MISE A JOUR DU CHAMPS ZONE :

// ********************************************************

    // SI NOM D'ESPÈCE = VIDE :

    router.get("/newZoneForSingleDate/:name_specie&:date", function(req, res, next) {

        const requestedFishName = req.params['name_specie'];
        console.log('test new request name_specie : ' + requestedFishName);
    
        const requestedFishDate = req.params['date'];
        console.log('test new request date : ' + requestedFishDate);
    
            
        // *******
        // TOUTES ESPECES, UNE DATE
        if (requestedFishName === "vide" && requestedFishDate !== "vide") {
    
            sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date = '"+ requestedFishDate +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
            .then(fishing => {
            //    console.log(fishing);
                res.status(200).json(fishing); // OK : réussite de la requête
                // next();
            })
            .catch(error => {
            res.status(500).send(error) // Internal Server Error = erreur générique
            });
    
        // ******
        // TOUTES ESPECES, TOUTES DATES :
        } else if (requestedFishName === "vide" && requestedFishDate === "vide") {
    
            sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
            .then(fishing => {
            //    console.log(fishing);
                res.status(200).json(fishing); // OK : réussite de la requête
                // next();
            })
            .catch(error => {
            res.status(500).send(error) // Internal Server Error = erreur générique
            });    
    
    


            //**************************************************  */
        
        // *****
        // UNE ESPÈCE, UNE DATE :    
        } else if (requestedFishName !== "vide" && requestedFishDate !== "vide") {
    
            sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
            .then(fishing => {
            //    console.log(fishing);
                res.status(200).json(fishing); // OK : réussite de la requête
                // next();
            })
            .catch(error => {
            res.status(500).send(error) // Internal Server Error = erreur générique
            });
        
        // ******
        // UNE ESPÈCE, TOUTES DATES :
        } else if (requestedFishName !== "vide"  && requestedFishDate === "vide") {
    
            sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
            .then(fishing => {
            //    console.log(fishing);
                res.status(200).json(fishing); // OK : réussite de la requête
                // next();
            })
            .catch(error => {
            res.status(500).send(error) // Internal Server Error = erreur générique
            });
    
        };
    
    });





// *******************************************************

// MISE A JOUR DU CHAMPS NOMS D'ESPÈCES :

// *******************************************************



router.get("/newNameSpForSingleDate/:zone&:date", function(req, res, next) {

    const requestedFishZone = req.params['zone'];
    console.log('test new request zone : ' + requestedFishZone);
    const requestedFishDate = req.params['date'];
    console.log('test new request date : ' + requestedFishDate);


// ******************************************************

// CHAMPS ZONE VIDE :

    // ******
    // TOUTES ZONES, UNE DATE :
    if (requestedFishZone === "vide" && requestedFishDate !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // *****
    // TOUTES ZONES, TOUTES DATES :
    } else if (requestedFishZone === "vide" && requestedFishDate === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    

// ******************************************************

    // *********
    // UNE ZONE, UNE DATE :
    } else if (requestedFishZone !== "vide" && requestedFishDate !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });
    
    // ********
    // UNE ZONE, TOUTES DATES :
    } else if (requestedFishZone !== "vide" && requestedFishDate === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    };

});







// *******************************************************

// MISE A JOUR DU CHAMPS SIMPLE DATE

// ********************************************************



router.get("/newDateForSingleDate/:name_specie&:zone", function(req, res, next) {

    const requestedFishName = req.params['name_specie'];
    console.log('test new request name_specie : ' + requestedFishName);
    const requestedFishZone = req.params['zone'];
    console.log('test new request zone : ' + requestedFishZone);

    const requestedFishDate = req.params['date'];
    console.log('test new request date : ' + requestedFishDate);

    // ******
    // TOUTES ESPÈCES, TOUTES ZONES :
    if (requestedFishName === "vide" && requestedFishZone === "vide") {

        sequelize.query("SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join ORDER BY date DESC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // ********
    // TOUTES ESPÈCES, UNE ZONE :
    } else if (requestedFishName === "vide" && requestedFishZone !== "vide") {

        sequelize.query("SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' ORDER BY date DESC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // ******
    // UNE ESPÈCE, TOUTES ZONES :
    } else if (requestedFishName !== "vide" && requestedFishZone === "vide") {

        sequelize.query("SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY date DESC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // *******
    // UNE ESPÈCE, UNE ZONE :
    } else if (requestedFishName !== "vide" && requestedFishZone !== "vide") {

        sequelize.query("SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' ORDER BY date DESC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    };

});






// *****************************************************************************************************************    



// ***************************************************************************************************************** //

//  REQUETES POUR METTRE A JOUR LES CHAMPS 'SELECT' (AVEC PLAGE DE DATE) DU FORMULAIRE DE RECHERCHE                  //

// ***************************************************************************************************************** //


// *******************************************************

// MISE A JOUR DU CHAMPS ZONE :

// ********************************************************


    // SI NOM D'ESPÈCE = VIDE :

// router.get("/newnamesp/:name_specie&:date2", function(req, res, next) {
router.get("/newZone/:name_specie&:date2Begin&:date2End", function(req, res, next) {

    const requestedFishName = req.params['name_specie'];
    console.log('test new request Name_Specie : ' + requestedFishName);

    const requestedFishDateBegin = req.params['date2Begin'];
    console.log('test new request Date2Begin : ' + requestedFishDateBegin);
    const requestedFishDateEnd = req.params['date2End'];
    console.log('test new request Date2End : ' + requestedFishDateEnd);

    // const requestedFishDate = req.params['date2']
    // console.log('test new request Date2 : ' + requestedFishDate);


    // ******
    // TOUTES ESPÈCES, UNE DATE DE DÉBUT, UNE DATE DE FIN :
    if (requestedFishName === "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // *****
    // TOUTES ESPÈCES, PAS DE DATE DE DÉBUT, UNE DATE DE FIN :
    } else if (requestedFishName === "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // ******
    // TOUTES ESPÈCES, UNE DATE DE DÉBUT, PAS DE DATE DE FIN :

    } else if (requestedFishName === "vide"  && requestedFishDateBegin !== "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date >= '"+ requestedFishDateBegin +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // ********
    // TOUTES ESPÈCES, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :
    // } else if (requestedFishName === "vide"  && requestedFishDate === "vide") {
    } else if (requestedFishName === "vide"  && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });





        //**************************************************  */
        // SI NOM D'ESPÈCE = NON-VIDE :

    // *******
    // UNE ESPÈCE, UNE DATE DE DÉBUT, UNE DATE DE FIN :
    } else if (requestedFishName !== "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // ********
    // UNE ESPÈCE, PAS DE DATE DE DÉBUT, UNE DATE DE FIN :
    } else if (requestedFishName !== "vide"  && requestedFishDateBegin === "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // ******
    // UNE ESPÈCE, UNE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishName !== "vide"  && requestedFishDateBegin !== "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // ******
    // UNE ESPÈCE, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishName !== "vide"  && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {
    //  } else if (requestedFishName !== "vide"  && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    };

});


// *******************************************************

// MISE A JOUR DU CHAMPS NOM D'ESPÈCES :

// ********************************************************



router.get("/newNameSp/:zone&:date2Begin&:date2End", function(req, res, next) {

    const requestedFishZone = req.params['zone'];
    console.log('test new request zone : ' + requestedFishZone);
    const requestedFishDateBegin = req.params['date2Begin'];
    console.log('test new request Date2Begin : ' + requestedFishDateBegin);
    const requestedFishDateEnd = req.params['date2End'];
    console.log('test new request Date2End : ' + requestedFishDateEnd);


// ******************************************************

    // ******
    // TOUTES ZONES, UNE DATE DE DÉBUT, UNE DATE DE FIN : 
    if (requestedFishZone === "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // ******
    // TOUTES ZONES, PAS DE DATE DE DÉBUT, UNE DATE DE FIN :
    } else if (requestedFishZone === "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // *******
    // TOUTES ZONES, UNE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishZone === "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // *******
    // TOUTES ZONES, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishZone === "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    

// ******************************************************

// CHAMPS ZONE NON-VIDE :
    
    // ******
    // UNE ZONE, UNE DATE DE DÉBUT, UNE DATE DE FIN :
    } else if (requestedFishZone !== "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // ********
    // UNE ZONE, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishZone !== "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // *******
    // UNE ZONE, UNE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishZone !== "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    // *******
    // UNE ZONE, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishZone !== "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
        //    console.log(fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    };

});



// *******************************************************

// MISE A JOUR DU CHAMPS DATES : (?? SI CHOIX D'UNE SELECT-LISTE DÉROULANTE)

// ********************************************************



router.get("/newDate2/:date2Begin&:date2End", function(req, res, next) {

    const requestedFishDateBegin = req.params['date2Begin'];
    console.log('test new request Date2Begin : ' + requestedFishDateBegin);
    const requestedFishDateEnd = req.params['date2End'];
    console.log('test new request Date2End : ' + requestedFishDateEnd);

    // PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :
    if (requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log('test 1' + fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });
    
    // UNE DATE DE DÉBUT, UNE DATE DE FIN :
    } else if (requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            console.log('test 2' + fishing);
            res.status(200).json(fishing); // OK : réussite de la requête
            // next();
        })
        .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
        });

    };

});



module.exports = router;