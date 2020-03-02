const express = require("express");
const Rx = require("rxjs/Rx");

const app = express();
const bodyParser = require('body-parser'); // body-parser = nécessaire pour les requêtes 'post'


// *************** (TEST) REQUETE POUR L'INSERTION D'UN NOUVEL USAGER DU SITE :

// const { User } = require('sequelize');

// *********************

const router = express.Router();

let model = require("../models");


const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const UserModel = require('../models/users')



const sequelize = new Sequelize("test_sakana", "root", "test", {

    host: "localhost",
    dialect: "mysql",
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



const User = UserModel(sequelize, Sequelize);

/* GET api listing. */
router.get("/", (req, res) => {
    res.send("api Users works");
});



router.get("/AddNewUser/:user_firstname"), function(req, res, next) {

    // console.log(req.body);
    // User.create(req.body)
    // .then(user => res.json(user))
    // .catch(error => {
    //     res.status(500).send(error) // Internal Server Error = erreur générique
    // });

    // console.log(req.body);
    // const insertUserFirstName = req.body;
    // // console.log(req.body.user_firstname);

    const userFirstName = req.params['user_firstname'];
    console.log('test new user_firstname : ' + userFirstName);

    sequelize.query("SELECT * FROM `users` WHERE user_firstname = '"+ userFirstName +"';", { type : sequelize.QueryTypes.SELECT })
    // sequelize.query("INSERT INTO `users` (`user_firstname`) VALUES('"+ userFirstName +"'", { })
    .then(user => {
        console.log(user);
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
    });

}


// ***********
// REQUÊTE GÉNÉRALE qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

router.get("/AllUsers", function(req, res, next) { 
    // envoie la donnée sur http://localhost:3000/users-api/AllUsers (voir "server.js")
    // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

    sequelize.query("SELECT * FROM `users`;", { type : sequelize.QueryTypes.SELECT })

    .then(user => {

    //    console.log(user);
        res.status(200).json(user); // OK : réussite de la requête
        // next();
        console.log(user);
    })
    .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
    });

});

// UPDATE D'UN USER :
router.put("/AllUsers", function(req, res, next) {
    // envoie la donnée sur http://localhost:3000/users-api/AllUsers (voir "server.js")
    // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):
    // console.log(req.body);
    console.log(req.body['login']);   
    console.log(req.body['mail']);

    const requestedUserLogin = req.body['login'];
    const requestedUserMail = req.body['mail'];
    const requestedUserId = req.body['id_user'];

    sequelize.query("UPDATE `users` SET login='"+ requestedUserLogin +"', mail='"+ requestedUserMail +"' WHERE id_user="+ requestedUserId +";", { type : sequelize.QueryTypes.PUT })

    .then(user => {

    //    console.log(user);
        res.status(200).json(user); // OK : réussite de la requête
        // next();
        console.log(user);
    })
    .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
    });

});


// SUPPRESSION D'UN USER :
router.post("/DeleteUsers", function(req, res, next) { 
    // envoie la donnée sur http://localhost:3000/users-api/AllUsers/:id_user (voir "server.js")

    console.log(req.body['login']);

    const requestedUserLogin = req.body['login'];

    // ex : DELETE FROM `users` WHERE id_user =36;
    sequelize.query("DELETE FROM `users` WHERE login='"+ requestedUserLogin +"';", { type : sequelize.QueryTypes.DELETE })

    .then(user => {

    //    console.log(user);
        res.status(200).json(user); // OK : réussite de la requête
        // next();
        console.log(user);
    })
    .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
    });

});



// SUPPRESSION D'UN USER -TEST AUTOCOMPLETE (dans une liste) : (marche moyen...)

router.delete("/AllUsers/:login", function(req, res, next) { 
    // envoie la donnée sur http://localhost:3000/users-api/AllUsers/:id_user (voir "server.js")

    console.log(req.params['login']);

    const requestedUserLogin = req.params['login'];

    // ex : DELETE FROM `users` WHERElogin ='yatest';
    sequelize.query("DELETE FROM `users` WHERE login='"+ requestedUserLogin +"';", { })

    .then(user => {

    //    console.log(user);
        res.status(200).json(user); // OK : réussite de la requête
        // next();
        console.log(user);
    })
    .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
    });

});


// SUPPRESSION D'UN USER (dans une liste) :

router.delete("/AllUsers2/:id_user", function(req, res, next) { 
    // envoie la donnée sur http://localhost:3000/users-api/AllUsers/:id_user (voir "server.js")

    console.log(req.params['id_user']);

    const requestedUserId = req.params['id_user'];

    // ex : DELETE FROM `users` WHERE id_user =36;
    sequelize.query("DELETE FROM `users` WHERE id_user="+ requestedUserId +";", { })

    .then(user => {

    //    console.log(user);
        res.status(200).json(user); // OK : réussite de la requête
        // next();
        console.log(user);
    })
    .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
    });

});

router.get("/SingleLogin/:login&:mail", function(req, res, next) {

    const requestedUserLogin = req.params['login'];
    const requestedUserMail = req.params['mail'];

    // envoie la donnée sur http://localhost:3000/users-api/AllUsers (voir "server.js")
    // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

    sequelize.query("SELECT login, mail FROM `users` WHERE login='"+ requestedUserLogin +"' AND mail='"+ requestedUserMail +"';", { type : sequelize.QueryTypes.SELECT })

    .then(user => {

    //    console.log(user);
        res.status(200).json(user); // OK : réussite de la requête
        // next();
        console.log(user);
    })
    .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
    });

});


/* bonne version : (post) */
router.post("/AllUsers", function(req, res) {
// router.post("/SingleLoginTest", function(req, res) {

    const requestedUserLogin = req.body["login"];
    console.log(req.body['login']);
    const requestedUserMail = req.body["mail"];
    console.log(req.body['mail']);

    sequelize.query("INSERT INTO `users` (`login`, `mail`) VALUES('"+ requestedUserLogin +"','"+ requestedUserMail +"');", { type : sequelize.QueryTypes.INSERT })

    // User.create(req.body)
    //     .then(user => res.json(user))

    .then(user => {
        console.log(user);
        res.status(200).json(user); // OK : réussite de la requête
    })
    .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
    });

});



router.get("/SingleLoginTest/:login", function(req, res, next) {
    console.log(req.body);
    const requestedUserLogin = req.params['login'];

    // envoie la donnée sur http://localhost:3000/users-api/AllUsers (voir "server.js")
    // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

    sequelize.query("INSERT INTO `users` (`login`) VALUES('"+ requestedUserLogin +"');", { type : sequelize.QueryTypes.INSERT })
    // sequelize.query("SELECT login, mail FROM `users` WHERE login='"+ requestedUserLogin +"';", { type : sequelize.QueryTypes.SELECT })

    .then(user => {

    //    console.log(user);
        res.status(200).json(user); // OK : réussite de la requête
        // next();
        console.log(user);
    })
    .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
    });

});



/* RECHERCHE DE LA DONNÉE ID_USER, AVEC POUR PARAMETRE LE LOGIN DU MEMBRE SÉLECTIONNÉ (TEST : POUR L'UPDATE D'UN LOGIN) : méthode 'GET' */
router.get("/SingleUserLogin/:login", function(req, res, next) {
    console.log(req.params);
    const requestedUserLogin = req.params['login'];

    // envoie la donnée sur http://localhost:3000/users-api/AllUsers (voir "server.js")
    // requête générale qui marche (pour 'test_sakana'): (prend toutes les données actuelles):

    sequelize.query("SELECT id_user, login, mail FROM `users` WHERE login='"+ requestedUserLogin +"';", { type : sequelize.QueryTypes.SELECT })
    // sequelize.query("SELECT login, mail FROM `users` WHERE login='"+ requestedUserLogin +"';", { type : sequelize.QueryTypes.SELECT })

    .then(user => {

    //    console.log(user);
        res.status(200).json(user); // OK : réussite de la requête
        // next();
        console.log(user);
    })
    .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
    });

});



/* RECHERCHE DE LA DONNÉE ID_USER, AVEC POUR PARAMETRE LE LOGIN DU MEMBRE SÉLECTIONNÉ (TEST : POUR L'UPDATE D'UN LOGIN) : méthode 'GET' */
router.get("/SingleUserMail/:mail", function(req, res, next) {
    console.log(req.params);
    const requestedUserMail = req.params['mail'];

    sequelize.query("SELECT id_user, login, mail FROM `users` WHERE mail='"+ requestedUserMail +"';", { type : sequelize.QueryTypes.SELECT })
    .then(user => {
    //    console.log(user);
        res.status(200).json(user); // OK : réussite de la requête
        // next();
        console.log(user);
    })
    .catch(error => {
        res.status(500).send(error) // Internal Server Error = erreur générique
    });

});


module.exports = router;