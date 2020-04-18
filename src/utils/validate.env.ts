const envalid = require('envalid')
const {str, port, cleanEnv} = envalid

/*
Check configuration from .env file
 */
export default class validateEnv {

    validateEnv() {
        envalid.cleanEnv(process.env, {
            MONGO_PASSWORD: str(),
            MONGO_PATH: str(),
            MONGO_USER: str(),
            PORT: port(),
        })
    }
}
