    const express = require("express");

    let app = express();
    const router = express.Router();
    
    let model = require("../models");
    
/*   const cls = require('continuation-local-storage'); // à tester : CLS () - installé par pour Sequelize https://github.com/othiym23/node-continuation-local-storage.git - 
    const ns = cls.createNamespace('....');*/
    const Sequelize = require('sequelize');
//    Sequelize.useCLS(ns);
    
/*   let Promise = require("bluebird"); // à tester pour Sequelize (pour le controle d'évènements asynchrones) */
    
/*    const API = 'https://jsonplaceholder.typicode.com';   */

    const Op = Sequelize.Op;

    //use sequelize with only alias for $and => Op.and
//   const connection2 = new Sequelize("test_sakana", "root", "", { operatorsAliases: { $and: Op.and } });

    const operatorsAliases = {
        $eq: Op.eq,
        $ne: Op.ne,
        $gte: Op.gte,
        $gt: Op.gt,
        $lte: Op.lte,
        $lt: Op.lt,
        $not: Op.not,
        $in: Op.in,
        $notIn: Op.notIn,
        $is: Op.is,
        $like: Op.like,
        $notLike: Op.notLike,
        $iLike: Op.iLike,
        $notILike: Op.notILike,
        $regexp: Op.regexp,
        $notRegexp: Op.notRegexp,
        $iRegexp: Op.iRegexp,
        $notIRegexp: Op.notIRegexp,
        $between: Op.between,
        $notBetween: Op.notBetween,
        $overlap: Op.overlap,
        $contains: Op.contains,
        $contained: Op.contained,
        $adjacent: Op.adjacent,
        $strictLeft: Op.strictLeft,
        $strictRight: Op.strictRight,
        $noExtendRight: Op.noExtendRight,
        $noExtendLeft: Op.noExtendLeft,
        $and: Op.and,
        $or: Op.or,
        $any: Op.any,
        $all: Op.all,
        $values: Op.values,
        $col: Op.col
      };

    const sequelize = new Sequelize("test_sakana", "root", "", {
    
        host: "localhost",
        dialect: "mysql",
        
        operatorsAliases: false,

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


    


// REQUÊTE GÉNÉRALE qui marche (pour 'test_sakana'): (prend toutes les données actuelles):


    router.get("/AllFishings", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/AllFishings
    // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

        sequelize.query("SELECT distinct id_fishing, name_specie, date, value_landing, value_quota, super_zone, zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie ORDER BY id_fishing ASC", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {           
            console.log(fishing);
            res.status(200).json(fishing);
            // next();
        })
        .catch(error => {
        res.status(500).send(error)
        });
    });




// REQUÊTE SUR DIFFÉRENTS OBJETS : 'AllSpeciesAtSuperZone':
// problème : comment afficher à la fois 'date' + 'name_specie' en abscisse ?

router.get("/AllSpeciesAtSuperZone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/AllSpeciesAtSuperZone

    sequelize.query("SELECT DISTINCT value_landing, value_quota, date, name_specie, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE super_zone = 'North sea' ORDER BY name_specie ASC", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => {            
            console.log(fishing);
            res.json(fishing);
        });

    });    


// REQUÊTE SUR DIFFÉRENTS OBJETS : 'AllSpeciesAtDate':
// problème : comment afficher à la fois 'zone' + 'name_specie' en abscisse ?

router.get("/AllSpeciesAtDate", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/AllSpeciesAtDate

    sequelize.query("SELECT DISTINCT value_landing, value_quota, date, name_specie, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date = '2018-06-20' ORDER BY name_specie ASC", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => {            
            console.log(fishing);
            res.json(fishing);
        });

    });


// REQUÊTE SUR DIFFÉRENTS OBJETS : 'Cod':

router.get("/Cod", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/Cod

    sequelize.query("SELECT value_landing, value_quota, date, name_specie, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE name_specie = 'Cod' ORDER BY date ASC", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => {            
            console.log(fishing);
            res.json(fishing);
        });

    });


// REQUÊTE SUR DIFFÉRENTS OBJETS : 'CodAtDate':

    router.get("/CodAtDate", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/CodAtDate

    sequelize.query("SELECT value_landing, value_quota, date, name_specie, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date = '2018-06-20' AND name_specie = 'Cod' ORDER BY super_zone ASC", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => {            
            console.log(fishing);
            res.json(fishing);
        });

    });

// REQUÊTE SUR DIFFÉRENTS OBJETS : 'CodAtZone':

router.get("/CodAtZone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/CodAtZone

    sequelize.query("SELECT DISTINCT value_landing, value_quota, date, name_specie, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE zone = 'North sea' AND name_specie = 'Cod' ORDER BY date ASC", { type : sequelize.QueryTypes.SELECT } )
    .then(fishs => {            
            console.log(fishs);
            res.json(fishs);
        });

    });
    
// REQUÊTE SUR UN OBJET : 'NorthSeaCodAtDate' :
    
router.get("/NorthSeaCodAtDate", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/NorthSeaCodAtDate

    sequelize.query("SELECT DISTINCT value_landing, value_quota, date, name_specie, super_zone, zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '2018-06-20' AND name_specie = 'Cod' AND super_zone = 'North sea'", { type : sequelize.QueryTypes.SELECT} )    
    .then(fishing => {         
        console.log(fishing);
        console.log(`${ fishing.value_landing } tonnes de ${ fishing.name_specie } ont été débarquées dans ${fishing.super_zone} le ${ fishing.date }.`);
        console.log(`le quota de ${fishing.name_specie} pêché est de ${ fishing.value_quota } tonnes le ${ fishing.date }.`);
        res.json(fishing);
    });

});


// REQUÊTE SUR UN OBJET : 'NorthSeaCodAtDate2': (date différente)

router.get("/NorthSeaCodAtDate2", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/NorthSeaCodAtDate2

    sequelize.query("SELECT DISTINCT value_landing, value_quota, date, name_specie, super_zone, zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '2018-06-13' AND name_specie = 'Cod' AND super_zone = 'North sea'", { type : sequelize.QueryTypes.SELECT} )
    .then(fishing => {         
        console.log(fishing);
        console.log(`${ fishing.value_landing } tonnes de ${ fishing.name_specie } ont été débarquées dans ${fishing.super_zone} le ${ fishing.date }.`);
        console.log(`le quota de ${fishing.name_specie} pêché est de ${ fishing.value_quota } tonnes le ${ fishing.date }.`);
        res.json(fishing);
    });

});

// REQUETE SUR UN ÉLÉMENT D'UN OBJET (value_landing) : 'NorthSeaCodLandingAtDate'

router.get("/NorthSeaCodLandingAtDate", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/NorthSeaCodLandingAtDate

    sequelize.query("SELECT DISTINCT value_landing, name_specie, super_zone, zone, date FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date = '2018-06-20' AND name_specie = 'Cod' AND super_zone = 'North sea'", { type : sequelize.QueryTypes.SELECT} )
    .then(fishing => {         
        console.log(fishing);
        res.json(fishing);
    });

});


// **************************************************************
    // EN TEST ACTUELLEMENT : 28/10/2018
// **************************************************************
// REQUETES pour le formulaire de recherches :

// ** AJOUT POUR TEST FORMULAIRE DE REQUETE 'name_specie'

// TEST RAW QUERY importants les 'modèles' Sequelize :


const Fishing = sequelize.import("../models/species.js");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("project", {
        name_specie: Sequelize.STRING,
        description: DataTypes.TEXT
    }).then(namespecie => {         
        console.log(namespecie);
        res.json(namespecie);
    })
    .catch(error => {
        res.status(500).send(error)
    });
};


router.get("/NameSpecie", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/NameSpecie

//    Fishing.findAll({ attributes: ['name_specie'], where: {  }, raw: true }) 
// REQUETE PAR MODELE (SEQUELIZE)

sequelize.query('SELECT DISTINCT name_specie FROM species ORDER BY name_specie ASC', { type : sequelize.QueryTypes.SELECT })
    .then(namespecie => {         
        const fishes = res.json(namespecie);
        console.log( {fishes});
        return {fishes};
    })
    .catch(error => {
        res.status(500).send(error)
    });

});




//************************** */

//  router.get("/NameSpecie", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/NameSpecie
/*model.fishing.findOne().then(fishing => {*/

//    sequelize.query('SELECT DISTINCT name_specie FROM species WHERE name_specie like "%'+req.query.key+'%" ORDER BY name_specie ASC', { type : sequelize.QueryTypes.SELECT })
/*    sequelize.query('SELECT DISTINCT name_specie FROM species ORDER BY name_specie ASC', { type : sequelize.QueryTypes.SELECT })
    .then(fishing => {         
        console.log(fishing);
        res.json(fishing);
    })
    .catch(error => {
        res.status(500).send(error)
    });
    
});
*/

router.get("/Date", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/Date
    /*model.fishing.findOne().then(fishing => {*/

    sequelize.query("SELECT DISTINCT date FROM `fishing` ORDER BY date ASC", { type : sequelize.QueryTypes.SELECT })
    .then(date => {         
        console.log(date);
        res.json(date);
    });

});


router.get("/SuperZone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/SuperZone
    /*model.fishing.findOne().then(fishing => {*/

    sequelize.query("SELECT DISTINCT super_zone FROM `species` ORDER BY super_zone ASC", { type : sequelize.QueryTypes.SELECT })
    .then(superzone => {         
        console.log(superzone);
        res.json(superzone);
    });

});

router.get("/Zone", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/Zone
    /*model.fishing.findOne().then(fishing => {*/

    sequelize.query("SELECT DISTINCT zone FROM `species` ORDER BY zone ASC", { type : sequelize.QueryTypes.SELECT } )
    .then(zone => {    
        console.log(zone);
        res.json(zone);
    });

});

router.get("/ValueLanding", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/posts
    /*model.fishing.findOne().then(fishing => {*/

    sequelize.query("SELECT DISTINCT value_landing FROM `fishing`", { type : sequelize.QueryTypes.SELECT })
    .then(valuelanding => {         
        console.log(valuelanding);
        res.json(valuelanding);
    });

});

router.get("/ValueQuota", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/ValueQuota
    /*model.fishing.findOne().then(fishing => {*/

    sequelize.query("SELECT DISTINCT value_quota FROM `fishing`", { type : sequelize.QueryTypes.SELECT })
    .then(valuequota => {         
        console.log(valuequota);
        res.json(valuequota);
    });

});




//*********** GET POSTS TEST : */ 
// CF : https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli

// Get all posts
router.get('/NameSpeciePosts', (req, res) => {
    sequelize.query("SELECT DISTINCT name_specie FROM `species` ORDER BY name_specie ASC", { type : sequelize.QueryTypes.SELECT })
    // Get posts from the mock api
    // This should ideally be replaced with a service that connects to MongoDB
//    axios.get(`${API}/posts`)
      .then(posts => {
        res.status(200).json(posts.data);
      })
      .catch(error => {
        res.status(500).send(error)
      });
  });

module.exports = router;