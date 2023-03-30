import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private conn;
    private jwtService;
    constructor(conn: any, jwtService: JwtService);
    login(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    registration(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    private generateToken;
    private validateUser;
}
