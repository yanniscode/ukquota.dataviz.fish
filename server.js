// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// const models = require('./server/models');

// Get our API routes
const api = require('./server/routes/api');
const usersApi = require('./server/routes/users-api');

const app = express();

// const Fishing = require('./server/routes/api.js'); // PAS UTILISÉ





// ************* AJOUT : cf: https://github.com/expressjs/cors

// PERMETTRE ORIGINES CROISÉES DES DONNÉES (test 1): marche pas

// ********

// const cors = require('cors') // pour les requêtes 'cross-origin-resource' // marche pas

// const corsOptions = {
//     // ex : origin: 'http://localhost:1234/', // ajout pour tests : route de 'OpenLayers'

//     origin: 'http://localhost:3000/',
//     // origin: 'http://example.com',
//     optionsSuccessStatus: 200       // some legacy browsers (IE11, various SmartTVs) choke on 204
    
// }

// app.use(cors(corsOptions))


// *********

// PERMETTRE ORIGINES CROISÉES DES DONNÉES (test 2): marche pas

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'localhost:3000');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Access-Control-Allow-Methods', 'POST, GET, OPTIONS',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
// });


// *********


// *********

// PERMETTRE ORIGINES CROISÉES DES DONNÉES (test 3): marche pas


// var corsOptions = {
//   origin: 'localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.get('/api', cors(corsOptions), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for only example.com.'})
// })

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })

// *********





// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Point static path to dist == chemins vers les fichiers CSS et JS
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);
app.use('/users-api', usersApi);

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