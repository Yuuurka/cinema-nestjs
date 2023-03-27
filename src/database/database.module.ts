import { Module } from "@nestjs/common";
import { Pool } from "pg";
import { PG_CONNECTION } from '../constants';

const dbProvider = {
    provide: PG_CONNECTION,
    useValue: new Pool({
        // host: process.env.POSTGRES_HOST,
        // port: +process.env.POSTGRES_PORT,
        // user: process.env.POSTGRES_USER,
        // password: process.env.POSTGRES_PASSWORD,
        // database: process.env.POSTGRES_DB
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'auth_hm3'
    })
}

@Module({
    providers: [dbProvider],
    exports: [dbProvider],
})
export class DatabaseModule {}
