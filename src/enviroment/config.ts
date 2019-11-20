import * as fs from 'fs';

export default {
    "db": {
        "user": null,
        "pass": null,
        "host": "mongodb.com",
        "port": "27017",
        "database": "root",
        "authSource": null
    },
    "host": {
        "url": "localhost",
        "port": "465"
    },
    "jwt": {
        "secretOrKey": fs.readFileSync('src/secrets/jwtSecretKey.pem'),
        "expiresIn": 36000000
    },
    "mail": {
        "host": "i.ua",
        "port": "587",
        "secure": false,
        "user": "elena_ptica@i.ua",
        "pass": "Lenusya"
    },
};
