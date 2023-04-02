import { Repository } from 'typeorm';
import { TextBlock } from './text-block.entity';
import { CreateTextBlockDto } from "./dto/text-block.dto";
import { File } from "../file/file.entity";
import { FileService } from "../file/file.service";
export declare class TextBlockService {
    private conn;
    private readonly blockRepository;
    private fileRepository;
    private fileService;
    constructor(conn: any, blockRepository: Repository<TextBlock>, fileRepository: Repository<File>, fileService: FileService);
    findAll(group: any): Promise<TextBlock[]>;
    findOne(id: any): Promise<TextBlock[]>;
    createTextBlock(createTextBlockDto: CreateTextBlockDto, images: object[]): Promise<TextBlock>;
    updateTextBlock(post: CreateTextBlockDto, images: object[]): Promise<TextBlock>;
    deleteTextBlock(id: number): Promise<object>;
    private uploadFiles;
}
