import { Repository } from "typeorm";
import { TextBlock } from "../text-block/text-block.entity";
import { File } from "../file/file.entity";
import { FileService } from "../file/file.service";
export declare class AdminPanelService {
    private conn;
    private blockRepository;
    private fileRepository;
    private fileService;
    constructor(conn: any, blockRepository: Repository<TextBlock>, fileRepository: Repository<File>, fileService: FileService);
    updateUser(req: any): Promise<{
        code: number;
        message: string;
        error: any;
    }>;
    deleteUser(id: any): Promise<{
        code: number;
        message: string;
        error: any;
    }>;
    deleteImages(): Promise<{
        status: number;
        result: string;
        Error: any;
    }>;
}
