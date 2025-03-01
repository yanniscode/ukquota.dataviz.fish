const express = require("express");
const Rx = require("rxjs/Rx");

const app = express();
const bodyParser = require('body-parser'); // body-parser = nécessaire pour les requêtes 'post'


// *** REQUETE SUR LES DONNÉES DU FORMULAIRE SEARCHFORM *** //

const router = express.Router();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// pour utiliser des variables d'environnement:
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {

    host: config.host,
    dialect: config.dialect,
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



// REQUÊTE SUR DIFFÉRENTS OBJETS : 'AllSpeciesAtSuperZone':

// router.get("/AllSpeciesAtSuperZone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/AllSpeciesAtSuperZone

//     sequelize.query("SELECT DISTINCT id_fishing, value_landing, value_quota, date, name_specie, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE super_zone = 'North sea' ORDER BY name_specie ASC", { type : sequelize.QueryTypes.SELECT } )
//     .then(fishing => {
//         res.json(fishing);
//     });

// });    



//  ************************************************************************************




// *****************************************************************************************************************//

// REQUETES GÉNÉRIQUES (POUR UN TABLEAU DE BASE DANS LA METHODE 'ONINIT' - CF : LES DIFFÉRENTS 'CHART.COMPONENT')
// CF COMPOSANT 'QUICKFILTER-BIS' (A RENOMMER)

// *****************************************************************************************************************//



// ***********

// REQUÊTE GÉNÉRALE (pour tableau) - prend toutes les données actuelles :
router.get("/AllFishings", function(req, res, next) {
    // envoie la donnée sur http://localhost:3000/api/AllFishings
    // REQUÊTE BDD 5.3 : infos sur toutes les dates :
    sequelize.query("SELECT id_fishing, name_specie, zone, super_zone, date, value_landing, value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN super_zones ON fishzone_join.id_super_zone = super_zones.id_super_zone ORDER BY id_fishing DESC;", { type : sequelize.QueryTypes.SELECT })
    .then(fishing => {
        res.status(200).json(fishing); // OK : réussite de la requête
    })
    .catch(error => {
    res.status(500).send(error); // Internal Server Error = erreur générique
    });
});


// REQUÊTE GÉNÉRALE (pour tableau) qui prend toutes les données actuelles:
router.get("/AllFishingsAtDate", function(req, res, next) {
    // envoie la donnée sur http://localhost:3000/api/AllFishingsAtDate
    // REQUÊTE BDD 5.3 : infos sur la dernière date:
    sequelize.query("SELECT id_fishing, name_specie, zone, super_zone, max(date) AS date, value_landing, value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN super_zones ON fishzone_join.id_super_zone = super_zones.id_super_zone WHERE date IN (SELECT max(date) FROM fishing) GROUP BY id_fishing ORDER BY id_fishing;", { type : sequelize.QueryTypes.SELECT })
    .then(fishing => {
        res.status(200).json(fishing); 
    })
    .catch(error => {
    res.status(500).send(error); 
    });
});


// *****************************************************************************************************************//

// REQUETES GÉNÉRIQUES (POUR UN GRAPHIQUE DE BASE DANS LA METHODE 'ONINIT' - CF : LES DIFFÉRENTS 'CHART.COMPONENT')

// *****************************************************************************************************************//



// ******
// I> Pour 'DATES-CHART' :

router.get("/AllFishingDates", function(req, res, next) {

    sequelize.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join WHERE date >= (SELECT min(date) FROM fishing) GROUP BY date ORDER BY date ASC;", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => {           
        res.status(200).json(fishing); 
    })
    .catch(error => {
    res.status(500).send(error); 
    });
});

// ******
// II> Pour 'SPECIES-CHART' :

router.get("/AllFishingSpecies", function(req, res, next) {

    sequelize.query("SELECT name_specie, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date IN (SELECT max(date) FROM fishing) GROUP BY name_specie ORDER BY name_specie;", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => {
        res.status(200).json(fishing); 
    })
    .catch(error => {
    res.status(500).send(error); 
    });

});



// III> Pour 'ZONES-CHART' :

router.get("/AllFishingZones", function(req, res, next) {

    sequelize.query("SELECT zones.id_zone, zone, z_coord, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date IN (SELECT max(date) FROM fishing) GROUP BY zones.id_zone ORDER BY zones.id_zone;", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => { 
        res.status(200).json(fishing); 
    })
    .catch(error => {
    res.status(500).send(error); 
    });
});









// **************************************** COURBES DE DATES - REQUETES : ******************************************

// QUANTITÉS ET QUOTAS pêchés pour UNE ou TOUTES espèces à UNE date demandée dans UNE ou TOUTES les zone(s) :

// ***************************************************************************************************************** 


// *** Note: QUANTITÉS ET QUOTAS pêchés sur une PÉRIODE donnée dans une zone pour UNE ou le TOTAL des espèce :
// REQUETE DEPUIS LE FORMULAIRE 'CHART-CHANGE' (EN TEST AVEC TOUS LES PARAMÈTRES POSSIBLES) :



router.get('/dates/:name_specie&:zone&:datebegin&:dateend', function (req, res, next) { // ANCIENNE ÉCRITURE DE FONCTION

    const requestedFishName = req.params['name_specie'];
    const requestedFishZone = req.params['zone'];
    const requestedFishDateBegin = req.params['datebegin'];
    const requestedFishDateEnd = req.params['dateend'];        

    // ET APRÈS : requête à la BDD pour 'fishing':

    // UNE ESPÈCE, UNE ZONE :
    if (requestedFishName !== "vide" && requestedFishZone !== "vide" ) {
        // si zone non vide :
        sequelize.query("SELECT * FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY date ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.json(fishing);
        })
        .catch(error => {
            res.status(500).send(error); 
        });
    
    // ********
    // UNE ESPÈCE, TOUTES ZONES :
    } else if (requestedFishName !== "vide" && requestedFishZone === "vide") {
        // si zone vide :
        sequelize.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date, name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.json(fishing); // réponse 304 = résultat affiché en console
        });

    // ******
    // TOUTES ESPÈCES, UNE ZONE :
    } else if (requestedFishName === "vide" && requestedFishZone !== "vide") {
        // si zone vide :
        sequelize.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date, zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {          
            res.json(fishing);
        });
    
    // ******
    // TOUTES ESPÈCES, TOUTES ZONES:
    } else if (requestedFishName === "vide" && requestedFishZone === "vide") {
        // si zone vide :
        sequelize.query("SELECT SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' GROUP BY date ORDER BY date ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {            
            res.json(fishing);
        })
        .catch(error => {
            res.status(500).send(error); 
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

    // console.log(' API sequelize request 2 : ' + requestedFishName + ' ' + requestedFishZone + ' ' + requestedFishDate);

    // TOUTES ESPÈCES, UNE ZONE, UNE DATE:
    if (requestedFishName === "vide" && requestedFishZone !== "vide" && requestedFishDate !== "vide") { // LA DATE EST TOUJOURS RENSEIGNÉE AUTOMATIQUEMENT
        sequelize.query("SELECT name_specie, zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.json(fishing);
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    // ******
    // UNE ESPÈCE, UNE ZONE, UNE DATE:
    } else if (requestedFishName !== "vide" && requestedFishZone !== "vide" && requestedFishDate !== "vide") {
        sequelize.query("SELECT name_specie, zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {           
            res.json(fishing);
        })
        .catch(error => {
            res.status(500).send(error); 
        });


    // ******
    // UNE ESPÈCE, TOUTES ZONES, UNE DATE:
    } else if (requestedFishName !== "vide" && requestedFishZone === "vide" && requestedFishDate !== "vide") {
        sequelize.query("SELECT name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {           
            res.json(fishing);
        })
        .catch(error => {
            res.status(500).send(error); 
        });


    // ******
    // TOUTES ESPÈCES, TOUTES ZONES, UNE DATE: 
    } else if (requestedFishName === "vide" && requestedFishZone === "vide" && requestedFishDate !== "vide") {
        sequelize.query("SELECT name_specie, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' GROUP BY name_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {            
            res.json(fishing);
        })
        .catch(error => {
            res.status(500).send(error); 
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

    // console.log(' API sequelize request 3 : ' + requestedFishName + ' ' + requestedFishZone + ' ' + requestedFishDate);

    // ******
    // UNE ESPÈCE, TOUTES ZONES, UNE DATE :
    if (requestedFishName !== "vide" && requestedFishZone === "vide" && requestedFishDate !== "vide") { // LA DATE EST TOUJOURS RENSEIGNÉE AUTOMATIQUEMENT (jamais vide)
        sequelize.query("SELECT zone, name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {          
            res.json(fishing);
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    
    // ******

    // UNE ESPÈCE, UNE ZONE, UNE DATE :
    } else if (requestedFishName !== "vide" && requestedFishZone !== "vide" && requestedFishDate !== "vide") {
        sequelize.query("SELECT zone, name_specie, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie  WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {            
            res.json(fishing);
        })
        .catch(error => {
            res.status(500).send(error); 
        });


    // TOUTES ESPECES, UNE ZONE, UNE DATE :
    // ******
    } else if (requestedFishName === "vide" && requestedFishZone !== "vide" && requestedFishDate !== "vide") {

        sequelize.query("SELECT zone, date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {            
            res.json(fishing);
        })
        .catch(error => {
            res.status(500).send(error); 
        });


    // somme des captures / quotas de chaque zone à une date, par espèce : (on n'affiche donc pas la zone !)
    
    // TOUTE ESPECES, TOUTE ZONES, UNE DATE :
    // ******
    } else if (requestedFishName === "vide" && requestedFishZone === "vide" && requestedFishDate !== "vide") {

        sequelize.query("SELECT zone, max(date) AS date, SUM(value_landing) AS value_landing, SUM(value_quota) AS value_quota, z_coord FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone AND date = '"+ requestedFishDate +"' GROUP BY zones.id_zone ORDER BY zones.id_zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {            
            res.json(fishing);
        })
        .catch(error => {
            res.status(500).send(error); 
        });
   


    }; // fin de boucle 'ELSE IF'
    
}); // FIN DE REQUETE







// *****************************************************************************************************************//

// *****       REQUETES POUR APPROVISIONNER LES CHAMPS 'SELECT' DU FORMULAIRE DE RECHERCHE      ***** //

// *****************************************************************************************************************//




router.get("/NameSpecie", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/NameSpecie

    sequelize.query('SELECT DISTINCT name_specie FROM species ORDER BY name_specie ASC;', { type : sequelize.QueryTypes.SELECT })
    .then(fishing => {
        let response = res.json(fishing);
    })
    .catch(error => {
        res.status(500).send(error);
    });
    
});


router.get("/Date", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/Date

    sequelize.query("SELECT DISTINCT date FROM fishing ORDER BY date DESC;", { type : sequelize.QueryTypes.SELECT })
    .then(date => {         
        res.json(date);
    })
    .catch(error => {
        res.status(500).send(error);
    });

});


router.get("/Zone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/Zone

    sequelize.query("SELECT DISTINCT zone FROM zones ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
    .then(zone => {    
        res.json(zone);
    })
    .catch(error => {
        res.status(500).send(error);
    });

});


router.get("/SuperZone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/SuperZone

    sequelize.query("SELECT DISTINCT super_zone FROM super_zones ORDER BY super_zone ASC;", { type : sequelize.QueryTypes.SELECT })
    .then(superzone => {         
        res.json(superzone);
    })
    .catch(error => {
        res.status(500).send(error);
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
        // console.log('test new request name_specie : ' + requestedFishName);
    
        const requestedFishDate = req.params['date'];
        // console.log('test new request date : ' + requestedFishDate);
    
            
        // *******
        // TOUTES ESPECES, UNE DATE
        if (requestedFishName === "vide" && requestedFishDate !== "vide") {
    
            sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date = '"+ requestedFishDate +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
            .then(fishing => {
                res.status(200).json(fishing);
            })
            .catch(error => {
            res.status(500).send(error);
            });
    
        // ******
        // TOUTES ESPECES, TOUTES DATES :
        } else if (requestedFishName === "vide" && requestedFishDate === "vide") {
    
            sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
            .then(fishing => {
                res.status(200).json(fishing);
            })
            .catch(error => {
            res.status(500).send(error);
            });    
    
    


        //**************************************************  */
        
        // *****
        // UNE ESPÈCE, UNE DATE :    
        } else if (requestedFishName !== "vide" && requestedFishDate !== "vide") {
    
            sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date = '"+ requestedFishDate +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
            .then(fishing => {
                res.status(200).json(fishing);
            })
            .catch(error => {
            res.status(500).send(error);
            });

        
        // ******
        // UNE ESPÈCE, TOUTES DATES :
        } else if (requestedFishName !== "vide"  && requestedFishDate === "vide") {
    
            sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
            .then(fishing => {
                res.status(200).json(fishing);
            })
            .catch(error => {
            res.status(500).send(error);
            });
    
        };
    
    });





// *******************************************************

// MISE A JOUR DU CHAMPS NOMS D'ESPÈCES :

// *******************************************************



router.get("/newNameSpForSingleDate/:zone&:date", function(req, res, next) {

    const requestedFishZone = req.params['zone'];
    // console.log('test new request zone : ' + requestedFishZone);
    const requestedFishDate = req.params['date'];
    // console.log('test new request date : ' + requestedFishDate);


// ******************************************************

// CHAMPS ZONE VIDE :

    // ******
    // TOUTES ZONES, UNE DATE :
    if (requestedFishZone === "vide" && requestedFishDate !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date = '"+ requestedFishDate +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing);
        })
        .catch(error => {
        res.status(500).send(error);
        });


    // *****
    // TOUTES ZONES, TOUTES DATES :
    } else if (requestedFishZone === "vide" && requestedFishDate === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing);
        })
        .catch(error => {
        res.status(500).send(error);
        });

    

// ******************************************************

    // *********
    // UNE ZONE, UNE DATE :
    } else if (requestedFishZone !== "vide" && requestedFishDate !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date = '"+ requestedFishDate +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing);
        })
        .catch(error => {
        res.status(500).send(error);
        });
    
    // ********
    // UNE ZONE, TOUTES DATES :
    } else if (requestedFishZone !== "vide" && requestedFishDate === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing);
        })
        .catch(error => {
        res.status(500).send(error);
        });

    };

});







// *******************************************************

// MISE A JOUR DU CHAMPS SIMPLE DATE

// ********************************************************



router.get("/newDateForSingleDate/:name_specie&:zone", function(req, res, next) {

    const requestedFishName = req.params['name_specie'];
    // console.log('test new request name_specie : ' + requestedFishName);
    const requestedFishZone = req.params['zone'];
    // console.log('test new request zone : ' + requestedFishZone);

    const requestedFishDate = req.params['date'];
    console.log('test new request date : ' + requestedFishDate);

    // ******
    // TOUTES ESPÈCES, TOUTES ZONES :
    if (requestedFishName === "vide" && requestedFishZone === "vide") {

        sequelize.query("SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join ORDER BY date DESC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing);
        })
        .catch(error => {
        res.status(500).send(error);
        });


    // ********
    // TOUTES ESPÈCES, UNE ZONE :
    } else if (requestedFishName === "vide" && requestedFishZone !== "vide") {

        sequelize.query("SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' ORDER BY date DESC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
        res.status(500).send(error); 
        });

    // ******
    // UNE ESPÈCE, TOUTES ZONES :
    } else if (requestedFishName !== "vide" && requestedFishZone === "vide") {

        sequelize.query("SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY date DESC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
        res.status(500).send(error); 
        });

    // *******
    // UNE ESPÈCE, UNE ZONE :
    } else if (requestedFishName !== "vide" && requestedFishZone !== "vide") {

        sequelize.query("SELECT DISTINCT date FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE name_specie = '"+ requestedFishName +"' AND zone = '"+ requestedFishZone +"' ORDER BY date DESC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
        res.status(500).send(error); 
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

router.get("/newZone/:name_specie&:date2Begin&:date2End", function(req, res, next) {

    const requestedFishName = req.params['name_specie'];
    // console.log('test new request Name_Specie : ' + requestedFishName);

    const requestedFishDateBegin = req.params['date2Begin'];
    // console.log('test new request Date2Begin : ' + requestedFishDateBegin);
    const requestedFishDateEnd = req.params['date2End'];
    // console.log('test new request Date2End : ' + requestedFishDateEnd);


    // ******
    // TOUTES ESPÈCES, UNE DATE DE DÉBUT, UNE DATE DE FIN :
    if (requestedFishName === "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
        res.status(500).send(error); 
        });

    // *****
    // TOUTES ESPÈCES, PAS DE DATE DE DÉBUT, UNE DATE DE FIN :
    } else if (requestedFishName === "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
        res.status(500).send(error); 
        });


    // ******
    // TOUTES ESPÈCES, UNE DATE DE DÉBUT, PAS DE DATE DE FIN :

    } else if (requestedFishName === "vide"  && requestedFishDateBegin !== "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE date >= '"+ requestedFishDateBegin +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    // ********
    // TOUTES ESPÈCES, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishName === "vide"  && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });





        //**************************************************  */
        // SI NOM D'ESPÈCE = NON-VIDE :

    // *******
    // UNE ESPÈCE, UNE DATE DE DÉBUT, UNE DATE DE FIN :
    } else if (requestedFishName !== "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    // ********
    // UNE ESPÈCE, PAS DE DATE DE DÉBUT, UNE DATE DE FIN :
    } else if (requestedFishName !== "vide"  && requestedFishDateBegin === "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });


    // ******
    // UNE ESPÈCE, UNE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishName !== "vide"  && requestedFishDateBegin !== "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' AND date >= '"+ requestedFishDateBegin +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    // ******
    // UNE ESPÈCE, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishName !== "vide"  && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT zone FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE name_specie = '"+ requestedFishName +"' ORDER BY zone ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    };

});


// *******************************************************

// MISE A JOUR DU CHAMPS NOM D'ESPÈCES :

// ********************************************************



router.get("/newNameSp/:zone&:date2Begin&:date2End", function(req, res, next) {

    const requestedFishZone = req.params['zone'];
    // console.log('test new request zone : ' + requestedFishZone);
    const requestedFishDateBegin = req.params['date2Begin'];
    // console.log('test new request Date2Begin : ' + requestedFishDateBegin);
    const requestedFishDateEnd = req.params['date2End'];
    // console.log('test new request Date2End : ' + requestedFishDateEnd);


// ******************************************************

    // ******
    // TOUTES ZONES, UNE DATE DE DÉBUT, UNE DATE DE FIN : 
    if (requestedFishZone === "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    // ******
    // TOUTES ZONES, PAS DE DATE DE DÉBUT, UNE DATE DE FIN :
    } else if (requestedFishZone === "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    // *******
    // TOUTES ZONES, UNE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishZone === "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    // *******
    // TOUTES ZONES, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishZone === "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    

// ******************************************************

// CHAMPS ZONE NON-VIDE :
    
    // ******
    // UNE ZONE, UNE DATE DE DÉBUT, UNE DATE DE FIN :
    } else if (requestedFishZone !== "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    // ********
    // UNE ZONE, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishZone !== "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    // *******
    // UNE ZONE, UNE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishZone !== "vide" && requestedFishDateBegin !== "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' AND date >= '"+ requestedFishDateBegin +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    // *******
    // UNE ZONE, PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :
    } else if (requestedFishZone !== "vide" && requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie INNER JOIN zones ON fishzone_join.id_zone = zones.id_zone WHERE zone = '"+ requestedFishZone +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });

    };

});



// *******************************************************

// MISE A JOUR DU CHAMPS DATES : (?? SI CHOIX D'UNE SELECT-LISTE DÉROULANTE)

// ********************************************************



router.get("/newDate2/:date2Begin&:date2End", function(req, res, next) {

    const requestedFishDateBegin = req.params['date2Begin'];
    // console.log('test new request Date2Begin : ' + requestedFishDateBegin);
    const requestedFishDateEnd = req.params['date2End'];
    // console.log('test new request Date2End : ' + requestedFishDateEnd);

    // PAS DE DATE DE DÉBUT, PAS DE DATE DE FIN :
    if (requestedFishDateBegin === "vide" && requestedFishDateEnd === "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error); 
        });
    
    // UNE DATE DE DÉBUT, UNE DATE DE FIN :
    } else if (requestedFishDateBegin !== "vide" && requestedFishDateEnd !== "vide") {

        sequelize.query("SELECT DISTINCT name_specie FROM fishing INNER JOIN fishzone_join ON fishing.id_fishzone_join = fishzone_join.id_fishzone_join INNER JOIN species ON fishzone_join.id_specie = species.id_specie WHERE date >= '"+ requestedFishDateBegin +"' AND date <= '"+ requestedFishDateEnd +"' ORDER BY name_specie ASC;", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {
            res.status(200).json(fishing); 
        })
        .catch(error => {
            res.status(500).send(error);
        });

    };

});


module.exports = router;
