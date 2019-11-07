import * as dotenv from 'dotenv';

export class ConfigModel {
    jwtSecret: string;
    constructor () {
        dotenv.config();

        this.jwtSecret = process.env.JWT_SECRET;
    }
}