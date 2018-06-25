    const express = require("express");
    const router = express.Router();
    var model = require("../models");
    const Sequelize = require("sequelize");
    const sequelize = new Sequelize("test_sakana", "root", "", {
    
    host: "localhost",
    dialect: "mysql",
    
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,


        idle: 10000
    }
    });

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


// TABLE :

        // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

    router.get("/tableposts", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/posts

    sequelize.query("SELECT name_specie, date, value_landing, value_quota, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => {            
        console.log(fishing);
        res.json(fishing);
//            next()
        });
    });


    router.get("/tablepost", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/posts
    
        sequelize.query("SELECT DISTINCT value_landing, date FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date = '2017-11-15' AND name_specie = 'Cod' AND super_zone = 'North sea'", { type : sequelize.QueryTypes.SELECT} )
        .then(fishing => {         
                console.log(fishing);
                res.json(fishing);
    //            next()
            });
        });


// LINECHART :


// Linechart - test 6 :  (répond dans le terminal, mais pas sur le graphique)

    router.get("/landings", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/fishings

    // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

    sequelize.query("SELECT value_landing FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => {            
            console.log(fishing);
            res.json(fishing);
//            next()
        });
    });

module.exports = router;


// Linechart - test 6 : 'date' (MARCHE)
    
router.get("/date", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/landing
    sequelize.query("SELECT DISTINCT date FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '2017-11-15' AND name_specie = 'Cod' AND super_zone = 'North sea'", { type : sequelize.QueryTypes.SELECT} )

    .then(fishing => {
        fishing.forEach( (fishing) => { // test 2 (for loop)
            console.log(`${ fishing.value_landing } tonnes de ${ fishing.name_specie } ont été débarquées dans ${fishing.super_zone} le ${ fishing.date }.`);
            console.log(`le quota de ${fishing.name_specie} pêché est de ${ fishing.value_quota } tonnes le ${ fishing.date }.`);
            res.json(fishing); // récupère les données sur la console de la page web
        });
    });
});


// Linechart - test 5 : 'value_quota' (MARCHE)
    
router.get("/quota", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/landing
    sequelize.query("SELECT DISTINCT value_quota FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '2017-11-15' AND name_specie = 'Cod' AND super_zone = 'North sea'", { type : sequelize.QueryTypes.SELECT} )

    .then(fishing => {
        fishing.forEach( (fishing) => { // test 2 (for loop)
            console.log(`${ fishing.value_landing } tonnes de ${ fishing.name_specie } ont été débarquées dans ${fishing.super_zone} le ${ fishing.date }.`);
            console.log(`le quota de ${fishing.name_specie} pêché est de ${ fishing.value_quota } tonnes le ${ fishing.date }.`);
            res.json(fishing); // récupère les données sur la console de la page web
        });
    });
});


// Linechart - test 3 : 'value_landing, value_quota, date' : FONCTIONNE SAUF LE LABEL 'DATE' SI DÉCLARÉ EN MÊME TEMPS, SINON OUI...
    
router.get("/landing", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/landing
    sequelize.query("SELECT DISTINCT value_landing, value_quota, date, name_specie FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '2017-11-15' AND name_specie = 'Cod' AND super_zone = 'North sea'", { type : sequelize.QueryTypes.SELECT} )

    .then(fishing => { 
        fishing.forEach( (fishing) => { // test 2 (for loop)
            console.log(`${ fishing.value_landing } tonnes de ${ fishing.name_specie } ont été débarquées dans ${fishing.super_zone} le ${ fishing.date }.`);
            console.log(`le quota de ${fishing.name_specie} pêché est de ${ fishing.value_quota } tonnes le ${ fishing.date }.`);
            res.json(fishing); // récupère les données sur la console de la page web
        });

    });

});