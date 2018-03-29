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

    router.get("/posts", function(req, res, next) {
    /*model.fishing.findAll().then(fishing => {*/

    sequelize.query("SELECT DISTINCT name_specie, value_quota, value_landing, name_zone, value_date_xlsx FROM `fishing` INNER JOIN `Dates` ON Fishing.id_date = Dates.id_date INNER JOIN `species` ON Fishing.id_specie = species.id_specie INNER JOIN `zones` ON Fishing.id_zone = zones.id_zone", { type : sequelize.QueryTypes.SELECT} )
    .then(fishing => {
            
            console.log(fishing);
            res.json(fishing);
        });
    });

    router.get("/linechart", function(req, res, next) {
    model.zones.findOne().then(zones => {
        console.log(zones.toJSON());
        console.log("Yeah");
    });
    });

    router.get("/posts2", (req, res) => {
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

    /*sequelize.query('SELECT name_specie, value_quota, value_landing, name_zone , value_date_xlsx'
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
