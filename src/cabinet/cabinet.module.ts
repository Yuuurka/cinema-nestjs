import { Module } from '@nestjs/common';
import { CabinetController } from './cabinet.controller';
import { CabinetService } from './cabinet.service';
import {DatabaseModule} from "../database/database.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";

@Module({
  controllers: [CabinetController],
  providers: [CabinetService],
  exports: [CabinetService, JwtModule],
  imports: [ConfigModule.forRoot(), DatabaseModule, JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions: {
      expiresIn: '24h'
    }
  })]
})
export class CabinetModule {}
