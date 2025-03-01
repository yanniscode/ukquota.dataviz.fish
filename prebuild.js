// fichier déclaré dans le script "prebuild" dans package.json
const fs = require('fs');
require('dotenv').config();

const environmentFilePath = './src/environments/environment.ts';
const environmentProdFilePath = './src/environments/environment.prod.ts';

const dbProtocol = process.env.DB_PROTOCOL || 'defaultProtocol';
const dbHost = process.env.DB_HOST || 'defaultHost';
const dbPort = process.env.DB_PORT || 'defaultPort';
const dbName = process.env.DB_NAME || 'defaultName';
const dbUserName = process.env.DB_USERNAME || 'defaultUserName';
const dbPassword = process.env.DB_PASSWORD || 'defaultPassword';
const dbDialect = process.env.DB_DIALECT || 'defaultDialect';

const content = `
export const environment = {
    production: false,
    backend: {
        baseURL:"${dbProtocol}://${dbHost}:${dbPort}",
    },
    dbHost: '${dbHost}',
    dbName: '${dbName}',
    dbUserName: '${dbUserName}',
    dbPassword: '${dbPassword}',
    dbDialect: '${dbDialect}'
};
`;

// l'environnement production ou non est déclaré dans le script de lancement dans package.json --configuration=production
const contentProd = `
export const environment = {
    production: true,
    backend: {
        baseURL:"${dbProtocol}://${dbHost}:${dbPort}",
    },
    dbHost: '${dbHost}',
    dbName: '${dbName}',
    dbUserName: '${dbUserName}',
    dbPassword: '${dbPassword}',
    dbDialect: '${dbDialect}'
};
`;

fs.writeFileSync(environmentFilePath, content);
fs.writeFileSync(environmentProdFilePath, contentProd);