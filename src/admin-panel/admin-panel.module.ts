import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {JwtModule} from "@nestjs/jwt";
import {AdminPanelService} from "./admin-panel.service";
import {AdminPanelController} from "./admin-panel.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TextBlock} from "../text-block/text-block.entity";

@Module({
    providers: [AdminPanelService],
    imports: [DatabaseModule, JwtModule.register( {
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
            expiresIn: '24h'
        }
    }), TypeOrmModule.forFeature([TextBlock])],
    controllers: [AdminPanelController],
    exports: [JwtModule]
})
export class AdminPanelModule {}