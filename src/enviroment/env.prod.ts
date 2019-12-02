import fs = require('fs');

export const production = {
    httpPort: '80',
    httpsPort: '443',
    host: 'localhost',
    environment: 'production',
    db: 'MONGO-CONNECTION',
    mongoUri: 'mongodb://127.0.0.1:27017/root',
    jwtSecretKey: fs.readFileSync('src/secrets/jwtSecretKey.pem'),
    expiresInAccess: 900,
    expiresInRefresh: 2592000,
    sqlUsername: 'root',
    sqlPassword: 'root',
    sqlDBname: 'root',
    sqlDialect: 'mysql',
    sqlPort: 3306,
};
