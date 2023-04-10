import { AdminPanelService } from "./admin-panel.service";
import { CreateUserDto } from "../auth/dto/create-user.dto";
export declare class AdminPanelController {
    private readonly adminService;
    constructor(adminService: AdminPanelService);
    updateUser(req: {
        createUserDto: CreateUserDto;
    }): Promise<{
        code: import("@nestjs/common").HttpStatus;
        result: any;
        error: string;
    } | {
        code: import("@nestjs/common").HttpStatus;
        result: string;
        error: any;
    }>;
    deleteUser(id: string): Promise<{
        code: import("@nestjs/common").HttpStatus;
        result: string;
        error: any;
    }>;
    deleteImages(): Promise<{
        code: import("@nestjs/common").HttpStatus;
        result: string;
        error: any;
    }>;
}
