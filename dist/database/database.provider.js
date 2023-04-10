"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbProvider = void 0;
const constants_1 = require("../constants");
const pg_1 = require("pg");
const config_1 = require("@nestjs/config");
exports.dbProvider = {
    imports: [config_1.ConfigModule.forRoot()],
    provide: constants_1.PG_CONNECTION,
    useValue: new pg_1.Pool({
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    })
};
//# sourceMappingURL=database.provider.js.map