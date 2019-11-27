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
    db: 'MONGO-CONNECTION',
    mongoUri: 'mongodb://127.0.0.1:27017/root',
    jwtSecretKey: fs.readFileSync('src/secrets/jwtSecretKey.pem'),
    expiresInAccess: process.env.ACCESS,
    expiresInRefresh: process.env.REFRESH,
};
