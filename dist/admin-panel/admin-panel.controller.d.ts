import { AdminPanelService } from "./admin-panel.service";
import { CreateTextBlockDto } from "../text-block/dto/text-block.dto";
export declare class AdminPanelController {
    private readonly adminService;
    constructor(adminService: AdminPanelService);
    updateUser(req: Request): Promise<{
        success: string;
    }>;
    createTextBlock(block: CreateTextBlockDto): Promise<import("../text-block/text-block.entity").TextBlock>;
    updateTextBlock(block: CreateTextBlockDto): Promise<import("../text-block/text-block.entity").TextBlock>;
    deleteTextBlock(id: string): Promise<void>;
}
