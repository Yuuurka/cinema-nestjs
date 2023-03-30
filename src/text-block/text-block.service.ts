import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextBlock } from './text-block.entity';

@Injectable()
export class TextBlockService {
    constructor(
        @InjectRepository(TextBlock)
        private readonly textBlockRepository: Repository<TextBlock>,
    ) {}

    async findAll(group?): Promise<TextBlock[]> {
        if (group) {
            return await this.textBlockRepository.find({where: {group: group}});
        }
        return await this.textBlockRepository.find();
    }

    async findOne(id): Promise<TextBlock> {
        return await this.textBlockRepository.findOne({where: {id: id}});
    }
}