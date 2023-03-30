import { Repository } from 'typeorm';
import { TextBlock } from './text-block.entity';
export declare class TextBlockService {
    private readonly textBlockRepository;
    constructor(textBlockRepository: Repository<TextBlock>);
    findAll(group?: any): Promise<TextBlock[]>;
    findOne(id: any): Promise<TextBlock>;
}
