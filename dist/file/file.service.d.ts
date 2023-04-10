import { HttpStatus } from '@nestjs/common';
import { File } from "./file.entity";
import { Repository } from "typeorm";
export declare class FileService {
    private fileRepository;
    constructor(fileRepository: Repository<File>);
    createFile(file: any, entity: string, entityId: number): Promise<string>;
    deleteNonUseImages(): Promise<{
        code: HttpStatus;
        result: string;
        error: any;
    }>;
    deleteBlockImages(entity: string, id: number): Promise<void>;
    private subtractHours;
    private deleteFromDisk;
}
