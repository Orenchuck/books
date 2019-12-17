import { development } from 'src/enviroment/env.dev';
import { production } from 'src/enviroment/env.prod';

export const environment = () => {
    const configuration = process.env.NODE_ENV;
    switch (configuration) {
        case 'DEVELOPMENT':
            return development;
        case 'PRODUCTION':
            return production;
        default:
            return development;
    }
};
