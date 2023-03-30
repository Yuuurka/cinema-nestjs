import { JwtService } from "@nestjs/jwt";
export declare class CabinetService {
    private conn;
    private jwtService;
    constructor(conn: any, jwtService: JwtService);
    getInfoUser(req: any): Promise<any>;
    putInfoUser(req: any): Promise<{
        success: string;
    }>;
}
