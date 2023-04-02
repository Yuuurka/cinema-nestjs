import { File } from "./file.entity";
import { Repository } from "typeorm";
export declare class FileService {
    private fileRepository;
    constructor(fileRepository: Repository<File>);
    createFile(file: any, entity: string, entityId: number): Promise<string>;
    deleteNonUseImages(): Promise<{
        status: number;
        result: string;
        Error: any;
    }>;
    deleteBlockImages(entity: string, id: number): Promise<void>;
    private subtractHours;
    private subtractSecs;
    private deleteFromDisk;
}
