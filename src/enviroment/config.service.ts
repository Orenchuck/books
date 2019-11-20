import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';
// import * as config from 'config';

export type EnvConfig = Record<string, string>;

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;
    // config: ConfigModel;
    constructor(filePath: string) {
        // this.config = new ConfigModel();
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production')
                .default('development'),
            PORT: Joi.number().default(443),
            API_AUTH_ENABLED: Joi.boolean().required(),
        });

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get isApiAuthEnabled(): boolean {
        return Boolean(this.envConfig.API_AUTH_ENABLED);
    }
}

// @Injectable()
// export class ConfigService {
//     public get<T>(key: string): T {
//         return config.get<T>(key);
//     }
// }
