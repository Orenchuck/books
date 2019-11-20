// export const environment = {
//     production: true,
//   };

// import { Config } from 'src/enviroment/env.dev';

// export const prod: Config = {
//   http: {
//   },
// };

import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ProductionConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync('src/enviroment/.env'));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
