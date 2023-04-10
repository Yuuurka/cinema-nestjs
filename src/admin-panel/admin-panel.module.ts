import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {JwtModule} from "@nestjs/jwt";
import {AdminPanelService} from "./admin-panel.service";
import {AdminPanelController} from "./admin-panel.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TextBlock} from "../text-block/text-block.entity";
import {File} from "../file/file.entity"
import {FileModule} from "../file/file.module";
import {ConfigModule} from "@nestjs/config";


@Module({
    providers: [AdminPanelService],
    imports: [ConfigModule.forRoot(), DatabaseModule, FileModule, JwtModule.register( {
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
            expiresIn: '24h'
        }
    }), TypeOrmModule.forFeature([TextBlock, File])],
    controllers: [AdminPanelController],
    exports: [JwtModule]
})
export class AdminPanelModule {}