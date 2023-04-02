/// <reference types="multer" />
import { TextBlockService } from './text-block.service';
import { CreateTextBlockDto } from "./dto/text-block.dto";
export declare class TextBlockController {
    private readonly textBlockService;
    constructor(textBlockService: TextBlockService);
    getAll(group: string): Promise<import("./text-block.entity").TextBlock[]>;
    getOne(id: string): Promise<import("./text-block.entity").TextBlock[]>;
    createTextBlock(block: CreateTextBlockDto, images: Array<Express.Multer.File>): Promise<import("./text-block.entity").TextBlock>;
    updateTextBlock(block: CreateTextBlockDto, images: Array<Express.Multer.File>): Promise<import("./text-block.entity").TextBlock>;
    deleteTextBlock(id: string): Promise<object>;
}
