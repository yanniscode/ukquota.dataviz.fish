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

// REQUÊTE GÉNÉRALE qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

    router.get("/AllFishings", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/tableposts
    // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

        sequelize.query("SELECT name_specie, date, value_landing, value_quota, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie", { type : sequelize.QueryTypes.SELECT } )
        .then(fishing => {           
            console.log(fishing);
            res.json(fishing);
//            next()
        });
    });


// REQUÊTE SUR DIFFÉRENTS OBJETS : 'CodAtDate':

    router.get("/CodAtDate", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/landings

    sequelize.query("SELECT value_landing, value_quota, date, name_specie, super_zone, zone FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date = '2018-06-20' AND name_specie = 'Cod'", { type : sequelize.QueryTypes.SELECT } )
    .then(fishing => {            
            console.log(fishing);
            res.json(fishing);
        });

    });

    
// REQUÊTE SUR UN OBJET : 'NorthSeaCodAtDate' :
    
router.get("/NorthSeaCodAtDate", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/landing

    sequelize.query("SELECT DISTINCT value_landing, value_quota, date, name_specie, super_zone, zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '2018-06-20' AND name_specie = 'Cod' AND super_zone = 'North sea'", { type : sequelize.QueryTypes.SELECT} )    
    .then(fishing => {         
        console.log(fishing);
        console.log(`${ fishing.value_landing } tonnes de ${ fishing.name_specie } ont été débarquées dans ${fishing.super_zone} le ${ fishing.date }.`);
        console.log(`le quota de ${fishing.name_specie} pêché est de ${ fishing.value_quota } tonnes le ${ fishing.date }.`);
        res.json(fishing);
    });

});


// REQUÊTE SUR UN OBJET : 'NorthSeaCodAtDate2': (date différente)

router.get("/NorthSeaCodAtDate2", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/landing2

    sequelize.query("SELECT DISTINCT value_landing, value_quota, date, name_specie, super_zone, zone FROM fishing INNER JOIN species ON fishing.id_specie = species.id_specie WHERE date = '2018-06-13' AND name_specie = 'Cod' AND super_zone = 'North sea'", { type : sequelize.QueryTypes.SELECT} )
    .then(fishing => {         
        console.log(fishing);
        console.log(`${ fishing.value_landing } tonnes de ${ fishing.name_specie } ont été débarquées dans ${fishing.super_zone} le ${ fishing.date }.`);
        console.log(`le quota de ${fishing.name_specie} pêché est de ${ fishing.value_quota } tonnes le ${ fishing.date }.`);
        res.json(fishing);
    });

});

// REQUETE SUR UN ÉLÉMENT D'UN OBJET (value_landing) : 'NorthSeaCodLandingAtDate'

router.get("/NorthSeaCodLandingAtDate", function(req, res, next) { // envoie la donnée sur http://localhost:3000/api/posts
    /*model.fishing.findOne().then(fishing => {*/

    sequelize.query("SELECT DISTINCT value_landing, name_specie, super_zone, zone, date FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie WHERE date = '2018-06-20' AND name_specie = 'Cod' AND super_zone = 'North sea'", { type : sequelize.QueryTypes.SELECT} )
    .then(fishing => {         
            console.log(fishing);
            res.json(fishing);
        });

    });


module.exports = router;