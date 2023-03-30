import { CabinetService } from "./cabinet.service";
export declare class CabinetController {
    private readonly cabinetService;
    constructor(cabinetService: CabinetService);
    getInfoUser(req: Request): Promise<any>;
    putInfoUser(req: Request): Promise<{
        success: string;
    }>;
}
