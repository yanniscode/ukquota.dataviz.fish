// *** Note: Get dependencies:
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors') // *** Note: pour les requêtes 'cross-origin-resource'
const app = express();
const path = require('path');
const http = require('http');


// *** Note: Get our API routes:
const fishingApi = require('./server/routes/fishing-api');
const usersApi = require('./server/routes/users-api');


// *** Note: Parsers for POST data:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// *******************

// *** Note: PERMETTRE LES REQUÊTES D'ORIGINES CROISÉES:
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200, // *** Note: some legacy browsers (IE11, various SmartTVs) choke on 204
  exposedHeaders: ['Content-Length', 'A-BCD', 'Z-XYZ'], // *** Note: Use exposedHeaders property in express middleware to expose headers
}
app.use(cors(corsOptions));


// ********************

// *** Note: Point static path to dist = chemins vers les fichiers compilés
app.use(express.static(path.join(__dirname, 'dist')));

// *** Note:  Set our api routes:
app.use('/fishing-api', fishingApi);             // *** Note: api des dataquotas
app.use('/users-api', usersApi);  // *** Note: api des utilisateurs

// *** Note: Catch all other routes and return the index file:
app.get('/*', (req, res) => {
res.sendFile(path.join(__dirname, 'dist/index.html'));
});


/** Note: 
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


/** Note: 
 * Create HTTP server.
 */
const server = http.createServer(app);

/** Note: 
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = app;
