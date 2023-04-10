import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import * as sinon from 'sinon';
import { getRepositoryToken } from "@nestjs/typeorm";
import {User} from "../user.entity";
import {Repository} from "typeorm";
import {DatabaseModule} from "../../database/database.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {userStubREG, userStubLOG} from "./stubs/user.stub";

describe('AuthService', () => {
    let authService: AuthService;
    let sandBox: sinon.SinonSandbox;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(User),
                    useValue: sinon.createStubInstance(Repository),
                },
                JwtService],
            imports: [DatabaseModule, JwtModule.register({
                secret: process.env.PRIVATE_KEY || 'SECRET',
                signOptions: {
                    expiresIn: '24h'
                }
            })]
        }).compile();
        authService = module.get<AuthService>(AuthService);
    })

    it('Должен вызвать функцию регистрации', async () => {
        const regUser = jest.spyOn(authService, 'registration');
        const dto = userStubREG();
        await authService.registration(dto);
        expect(regUser).toHaveBeenCalledWith(dto);
    })

    it('Должен вызвать функцию входа в систему', async () => {
        const loginUser = jest.spyOn(authService, 'login');
        const dto = userStubLOG();
        await authService.login(dto);
        expect(loginUser).toHaveBeenCalledWith(dto);
    })
})
