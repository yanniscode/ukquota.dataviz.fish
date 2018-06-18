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

    router.get("/tableau", function(req, res, next) { // posts
    /*model.fishing.findAll().then(fishing => {*/

        sequelize.query("SELECT * FROM `fishing` INNER JOIN `species` ON fishing.id_specie = species.id_specie", { type : sequelize.QueryTypes.SELECT} )
        .then(fishing => {            
            console.log(fishing);
            res.json(fishing);
        });
    });

router.get("/graphique", function(req, res, next) {
    model.fishing.findOne().then(fishing => {
        console.log(fishing.toJSON());
        console.log("Yeah");
    });
});

router.get("/posts2", (req, res) => { // test (objet JSON) : marche seulement sur /api/posts2
    res.json([
        {
        id: 1,
        title: "mon titre",
        body: "iushfidugifnfinfu"
        },
        {
        id: 2,
        title: "mon titre 2",
        body: "iushfidugifnfinf22222u"
        }
    ]);
});

    module.exports = router;

    /*  sequelize.query('SELECT name_specie, value_quota, value_landing, name_zone , value_date_xlsx' // marche pas à tester ??
    FROM Fishing
    INNER JOIN Dates 
        ON Fishing.id_date = dates.id_date 
    INNER JOIN species 
        ON Fishing.id_specie = species.id_specie 
    INNER JOIN zones 
        ON Fishing.id_zone = zones.id_zone')

        fishing.findAll({
            include: [{
            model: dates,species,zones
            required: true
            }]
        }).then(fishing => {
            console.log([fishing])
        });
    */

