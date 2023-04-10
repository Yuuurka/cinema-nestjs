import {PG_CONNECTION} from "../constants";
import { Pool } from "pg";
import {ConfigModule} from "@nestjs/config";


export /** Подключение к базе данных без ORM **/
const dbProvider = {
    imports: [ConfigModule.forRoot()],
    provide: PG_CONNECTION,
    useValue: new Pool({
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    })
}