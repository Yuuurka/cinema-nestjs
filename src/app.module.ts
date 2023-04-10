import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CabinetModule } from './cabinet/cabinet.module';
import {AdminPanelModule} from "./admin-panel/admin-panel.module";
import { TextBlockModule } from './text-block/text-block.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { FileModule } from './file/file.module';
import { FilmModule } from './film/film.module';
import {DatabaseModule} from "./database/database.module";


/** В этот файл импортируются все модули напрямую/ или в конечном счете через связи должны здесь оказаться **/
/** Как и в другой .module файл импортируются его контроллеры и провайдеры[сервисы], если такие существуют **/
/** Подключение к базе данных с ORM **/
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, CabinetModule, AdminPanelModule, TextBlockModule,TypeOrmModule.forFeature(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    FilmModule,
    FileModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
