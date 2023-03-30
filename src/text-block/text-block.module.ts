import { Module } from '@nestjs/common';
import { TextBlockController } from './text-block.controller';
import { TextBlockService } from './text-block.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextBlock } from './text-block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TextBlock])],
  providers: [TextBlockService],
  controllers: [TextBlockController],
})
export class TextBlockModule {}