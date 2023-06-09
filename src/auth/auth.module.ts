import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {DatabaseModule} from "../database/database.module";
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";


@Module({
  providers: [AuthService],
  imports: [ConfigModule.forRoot(), DatabaseModule, JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions: {
      expiresIn: '24h'
    }
  })],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
