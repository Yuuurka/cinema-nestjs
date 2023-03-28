import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CabinetModule } from './cabinet/cabinet.module';


@Module({
  imports: [AuthModule, CabinetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
