import { Module } from '@nestjs/common';
import { TextBlockController } from './text-block.controller';
import { TextBlockService } from './text-block.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextBlock } from './text-block.entity';
import {File} from '../file/file.entity'
import {DatabaseModule} from "../database/database.module";
import {JwtModule} from "@nestjs/jwt";
import {FileModule} from "../file/file.module";

/** Если используются модели, то их надо импортировать, тоже самое и с приватным ключом в JWT**/
@Module({
  imports: [TypeOrmModule.forFeature([TextBlock, File]), DatabaseModule, JwtModule.register( {
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions: {
      expiresIn: '24h'
    }
  }), FileModule],
  providers: [TextBlockService],
  controllers: [TextBlockController],
})
export class TextBlockModule {}