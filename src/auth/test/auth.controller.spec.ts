import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import {AuthService} from "../auth.service";
import {JwtService} from "@nestjs/jwt";
import {DatabaseModule} from "../../database/database.module";
import {CreateUserDto} from "../dto/create-user.dto";


describe('AuthController', () => {
    let authController: AuthController;
    let spyService: AuthService;
    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: AuthService,
            useFactory: () => ({
                registration: jest.fn(() => {}),
                login: jest.fn(() => {}),
            })
        }
        const app: TestingModule = await Test.createTestingModule({
            providers: [AuthService, JwtService, ApiServiceProvider],
            controllers: [AuthController],
            imports: [DatabaseModule]
        }).compile();
        authController = app.get<AuthController>(AuthController);
        spyService = app.get<AuthService>(AuthService)
    })

    it('Вызывает registration', async () => {
        const dto = new CreateUserDto();
        expect(authController.registration(dto)).not.toEqual(null)
    });

    it('Вызывает registration', async () => {
        const dto = new CreateUserDto();
        authController.registration(dto);
        expect(spyService.registration).toHaveBeenCalled();
        expect(spyService.registration).toHaveBeenCalledWith(dto);
    });

    it('Вызывает login', async () => {
        const dto = new CreateUserDto();
        expect(authController.login(dto)).not.toEqual(null)
    });

    it('Вызывает login', async () => {
        const dto = new CreateUserDto();
        authController.login(dto);
        expect(spyService.login).toHaveBeenCalled();
        expect(spyService.login).toHaveBeenCalledWith(dto);
    });
})