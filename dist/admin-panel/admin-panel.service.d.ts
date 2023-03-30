import { Repository } from "typeorm";
import { TextBlock } from "../text-block/text-block.entity";
import { CreateTextBlockDto } from "../text-block/dto/text-block.dto";
export declare class AdminPanelService {
    private conn;
    private blockRepository;
    constructor(conn: any, blockRepository: Repository<TextBlock>);
    updateUser(req: any): Promise<{
        success: string;
    }>;
    createTextBlock(block: CreateTextBlockDto): Promise<TextBlock>;
    updateTextBlock(post: CreateTextBlockDto): Promise<TextBlock>;
    deleteTextBlock(id: number): Promise<void>;
}
