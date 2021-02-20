const express = require("express");
const Rx = require("rxjs/Rx");

const app = express();
const bodyParser = require('body-parser'); // body-parser = nécessaire pour les requêtes 'post'



// *************** (TEST) REQUETE POUR L'INSERTION D'UN NOUVEL USAGER DU SITE :


const router = express.Router();

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const UserModel = require('../models/users')



const sequelize = new Sequelize("dataviz_fish_uk", "root", "test", {

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



// router.get("/AddNewUser/:user_firstname"), function(req, res, next) {

//     const userFirstName = req.params['user_firstname'];

//     sequelize.query("SELECT * FROM `users` WHERE user_firstname = '"+ userFirstName +"';", { type : sequelize.QueryTypes.SELECT })
//     .then(user => {
//         res.status(200).json(user);
//     })
//     .catch(error => {
//         res.status(500).send(error);
//     });

// }


// ***********
// REQUÊTE GÉNÉRALE qui marche (pour 'dataviz_fish_uk'): (prend toutes les données actuelles):

router.post("/AllUsers", function(req, res, next) {

    // requête générale qui marche (pour 'dataviz_fish_uk'): (prend toutes les données 'utilisateur' actuelles):

    sequelize.query("SELECT * FROM `users`;", { type : sequelize.QueryTypes.SELECT })
    .then(user => {
        res.status(200).json(user); // OK : réussite de la requête       
    })
    .catch(error => {
        res.status(500).send(error);
    });

});

// UPDATE D'UN USER :
router.put("/UpdateUser", function(req, res, next) {
    // envoie la donnée sur http://localhost:3000/users-api/AllUsers (voir "server.js")
    // requête générale qui marche (pour 'dataviz_fish_uk'): (prend toutes les données actuelles):

    const requestedUserLogin = req.body['login'];
    const requestedUserMail = req.body['mail'];
    const requestedUserId = req.body['id_user'];

    sequelize.query("UPDATE `users` SET login='"+ requestedUserLogin +"', mail='"+ requestedUserMail +"' WHERE id_user="+ requestedUserId +";", { type : sequelize.QueryTypes.PUT })
    .then(user => {
       res.status(200).json(user); 
    })
    .catch(error => {
        res.status(500).send(error);
    });

});


// SUPPRESSION D'UN USER :
router.post("/DeleteUser", function(req, res, next) { 
    // envoie la donnée sur http://localhost:3000/users-api/AllUsers/:id_user (voir "server.js")

    const requestedUserLogin = req.body['login'];

    sequelize.query("DELETE FROM `users` WHERE login='"+ requestedUserLogin +"';", { type : sequelize.QueryTypes.DELETE })
    .then(user => { 
        res.status(200).json(user);     
    })
    .catch(error => {
        res.status(500).send(error);
    });

});



// SUPPRESSION D'UN USER -TEST AUTOCOMPLETE (dans une liste) :

router.delete("/DeleteUser/:login", function(req, res, next) { 
    // envoie la donnée sur http://localhost:3000/users-api/AllUsers/:id_user (voir "server.js")

    const requestedUserLogin = req.params['login'];

    sequelize.query("DELETE FROM `users` WHERE login='"+ requestedUserLogin +"';", { })
    .then(user => {  
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).send(error);
    });

});


// *** SUPPRESSION D'UN USER (dans une liste) :
// *** utilisée dans 'Members-list':

router.delete("/DeleteUserByTable/:id_user", function(req, res, next) { 
    // envoie la donnée sur http://localhost:3000/users-api/AllUsers/:id_user (voir "server.js")

    const requestedUserId = req.params['id_user'];

    // ex : DELETE FROM `users` WHERE id_user =36;
    sequelize.query("DELETE FROM `users` WHERE id_user="+ requestedUserId +";", { })
    .then(user => {
        res.status(200).json(user); 
    })
    .catch(error => {
        res.status(500).send(error);
    });

});

router.post("/User", function(req, res, next) {

    const requestedUserLogin = req.body['login'];
    const requestedUserMail = req.body['mail'];

    // envoie la donnée sur http://localhost:3000/users-api/AllUsers (voir "server.js")
    // requête générale qui marche (pour 'dataviz_fish_uk'): (prend toutes les données actuelles):

    sequelize.query("SELECT login, mail FROM `users` WHERE login='"+ requestedUserLogin +"' AND mail='"+ requestedUserMail +"';", { type : sequelize.QueryTypes.SELECT })
    .then(user => {
        res.status(200).json(user);  
    })
    .catch(error => {
        res.status(500).send(error);
    });

});


// admin login (requête sur le rôle ajouté à la BDD)
router.post("/Admin", function(req, res, next) {

    const requestedUserLogin = req.body['login'];
    const requestedUserMail = req.body['mail'];

    // envoie la donnée sur http://localhost:3000/users-api/AllUsers (voir "server.js")
    // requête générale qui marche (pour 'dataviz_fish_uk'): (prend toutes les données actuelles):

    sequelize.query("SELECT * FROM `users` WHERE role='admin' AND login='"+ requestedUserLogin +"' AND mail='"+ requestedUserMail +"';", { type : sequelize.QueryTypes.SELECT })
    .then(user => {
        res.status(200).json(user);  
    })
    .catch(error => {
        res.status(500).send(error);
    });

});


/* bonne version : (post) */
router.post("/AddUser", function(req, res) {

    const requestedUserLogin = req.body["login"];
    const requestedUserMail = req.body["mail"];

    sequelize.query("INSERT INTO `users` (`login`, `mail`) VALUES('"+ requestedUserLogin +"','"+ requestedUserMail +"');", { type : sequelize.QueryTypes.INSERT })
    .then(user => { 
        res.status(200).json(user); 
    })
    .catch(error => {
        res.status(500).send(error);
    });

});



// router.get("/SingleLoginTest/:login", function(req, res, next) {
//     const requestedUserLogin = req.params['login'];

//     // envoie la donnée sur http://localhost:3000/users-api/AllUsers (voir "server.js")
//     // requête générale qui marche (pour 'dataviz_fish_uk'): (prend toutes les données actuelles):

//     sequelize.query("INSERT INTO `users` (`login`) VALUES('"+ requestedUserLogin +"');", { type : sequelize.QueryTypes.INSERT })
//     .then(user => {
//         res.status(200).json(user);     
//     })
//     .catch(error => {
//         res.status(500).send(error);
//     });

// });



/* RECHERCHE DE LA DONNÉE ID_USER, AVEC POUR PARAMETRE LE LOGIN DU MEMBRE SÉLECTIONNÉ (TEST : POUR L'UPDATE D'UN LOGIN) : méthode 'GET' */
router.post("/SingleUserLogin", function(req, res, next) {
    const requestedUserLogin = req.body['login'];

    // envoie la donnée sur http://localhost:3000/users-api/AllUsers (voir "server.js")
    // requête générale qui marche (pour 'dataviz_fish_uk'): (prend toutes les données actuelles):

    sequelize.query("SELECT id_user, login, mail FROM `users` WHERE login='"+ requestedUserLogin +"';", { type : sequelize.QueryTypes.SELECT })
    .then(user => { 
        res.status(200).json(user);  
    })
    .catch(error => {
        res.status(500).send(error);
    });

});



/* RECHERCHE DE LA DONNÉE ID_USER, AVEC POUR PARAMETRE LE LOGIN DU MEMBRE SÉLECTIONNÉ (TEST : POUR L'UPDATE D'UN LOGIN) : méthode 'GET' */
router.post("/SingleUserMail", function(req, res, next) {

    const requestedUserMail = req.body['mail'];

    sequelize.query("SELECT id_user, login, mail FROM `users` WHERE mail='"+ requestedUserMail +"';", { type : sequelize.QueryTypes.SELECT })
    .then(user => {
        res.status(200).json(user);   
    })
    .catch(error => {
        res.status(500).send(error);
    });

});


module.exports = router;
