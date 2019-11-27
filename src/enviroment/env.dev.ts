// import * as dotenv from 'dotenv';
// import * as fs from 'fs';

// export class DevelopmentConfigService {
//   private readonly envConfig: Record<string, string>;

//   constructor(filePath: string) {
//     this.envConfig = dotenv.parse(fs.readFileSync('src/enviroment/.env'));
//   }

//   get(key: string): string {
//     return this.envConfig[key];
//   }
// }

import fs = require('fs');

export const development = {
    httpPort: '80',
    httpsPort: '443',
    environment: process.env.NODE_ENV,
    databaseProviderName: 'MONGO-CONNECTION',
    databaseMongoConnectionUrl: 'mongodb://localhost/root',
    jwtSecretKey: fs.readFileSync('src/secrets/jwtSecretKey.pem'),
};
