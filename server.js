// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const models = require('./server/models');

// Get our API routes
const api = require('./server/routes/api');
const app = express();

const Fishing = require('./server/routes/api.js'); // PAS UTILISÉ

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// PERMETTRE ORIGINES CROISÉES DES DONNÉES : marche pas
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
*/

// Point static path to dist == chemins vers les fichiers CSS et JS
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('/*', (req, res) => {
res.sendFile(path.join(__dirname, 'dist/index.html')); // ou 'src/index.html' ??
});



// TEST PERSO : ROUTE DES NOMS D'ESPECES : (MARCHE PAS ENCORE)
// app.get('/api/NameSpecie', Fishing.findAll);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));


// ************* AJOUT :

// ********

// const cors = require('cors') // pour les requêtes 'cross-origin-resource'

// var corsOptions = {
//     // origin: 'http://localhost:1234/', // ajout pour tests : route de 'OpenLayers'
//     origin: 'http://localhost:4200/', // PAS NÉCESSAIRE ICI
//     // origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
// }

// app.use(cors(corsOptions))

// *********