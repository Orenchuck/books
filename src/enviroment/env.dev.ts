// export const environment = {
//     production: false,
//   };

// export interface Config {
//   http?: any;
// }

// export const dev: Config = {
//   http: {
//     port: 443,
//     host: 'localhost',
//   },
// };

import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class DevelopmentConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync('src/enviroment/.env'));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
