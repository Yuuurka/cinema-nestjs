import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { Film } from './film.entity'
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileModule} from "../file/file.module";
import {JwtModule} from "@nestjs/jwt";


@Module({
  imports: [TypeOrmModule.forFeature([Film]), FileModule, JwtModule, JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions: {
      expiresIn: '24h'
    }
  })],
  providers: [FilmService],
  controllers: [FilmController]
})
export class FilmModule {}
