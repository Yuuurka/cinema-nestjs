import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CabinetModule } from './cabinet/cabinet.module';
import {AdminPanelModule} from "./admin-panel/admin-panel.module";
import { TextBlockModule } from './text-block/text-block.module';
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
  imports: [AuthModule, CabinetModule, AdminPanelModule, TextBlockModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'auth_hm3',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
