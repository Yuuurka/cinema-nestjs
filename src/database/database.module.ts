import { Module } from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {dbProvider} from "./database.provider";



@Module({
    imports: [ConfigModule.forRoot()],
    providers: [dbProvider],
    exports: [dbProvider],
})
export class DatabaseModule {}
