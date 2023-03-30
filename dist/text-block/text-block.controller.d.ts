import { TextBlockService } from './text-block.service';
export declare class TextBlockController {
    private readonly textBlockService;
    constructor(textBlockService: TextBlockService);
    getAll(group: string): Promise<import("./text-block.entity").TextBlock[]>;
    getOne(id: string): Promise<import("./text-block.entity").TextBlock>;
}
