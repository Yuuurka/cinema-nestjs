import { AdminPanelService } from "./admin-panel.service";
export declare class AdminPanelController {
    private readonly adminService;
    constructor(adminService: AdminPanelService);
    updateUser(req: Request): Promise<{
        code: number;
        message: string;
        error: any;
    }>;
    deleteUser(id: string): Promise<{
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
