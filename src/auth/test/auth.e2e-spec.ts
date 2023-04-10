import { Test, TestingModule } from '@nestjs/testing';
import {AuthService} from "../auth.service";
import {JwtService} from "@nestjs/jwt";
import {DatabaseModule} from "../../database/database.module";
import {userStubREG, userStubLOG} from "./stubs/user.stub";


class ApiServiceMock {
    registration(dto: any){
        return {}
    }
    login(dto: any){
        return {}
    }
}
describe.only("AuthService", () => {
    let authService: AuthService;
    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: AuthService,
            useClass: ApiServiceMock,
        }
        const module: TestingModule = await Test.createTestingModule({
            providers: [JwtService, AuthService, ApiServiceProvider],
            imports: [DatabaseModule]
        }).compile();
        authService = module.get<AuthService>(AuthService);
    })

    test("registration", async () => {
        const dto = userStubREG();
        authService.registration(dto);
        expect({"token":"log.role.secret"}).toMatchObject(authService.registration(dto))
    });

    test("login", async () => {
        const dto = userStubLOG();
        authService.registration(dto);
        expect({"token":"log.role.secret"}).toMatchObject(authService.login(dto))
    });
})