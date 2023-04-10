import {Test, TestingModule} from '@nestjs/testing';
import {CabinetController} from '../cabinet.controller';
import {CabinetService} from "../cabinet.service";
import {INestApplication} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {DatabaseModule} from "../../database/database.module";
import * as request from 'supertest';
import {ConfigModule} from "@nestjs/config";


jest.mock('../cabinet.service');


describe('AdminPanelController',  () => {
    let cabinetService: CabinetService;
    let module: TestingModule;
    let cabinetController: CabinetController;
    let app: INestApplication;
    beforeEach(async () => {
        module = await Test.createTestingModule({
            controllers: [CabinetController],
            providers: [CabinetService],
            exports: [CabinetService, JwtModule],
            imports: [ConfigModule.forRoot(), DatabaseModule, JwtModule.register({
                secret: process.env.PRIVATE_KEY || 'SECRET',
                signOptions: {
                    expiresIn: '24h'
                }
            })]
        }).compile();
        app = module.createNestApplication();
        await app.init();
        cabinetService = module.get<CabinetService>(CabinetService);
        cabinetController = module.get<CabinetController>(CabinetController);
    });

    afterEach(async () => {
        await app.close();
        jest.clearAllMocks();
    })

    describe('/settings',() => {
        it('GET /settings',async () => {
            const token = process.env.CURRENT_ADMIN_TOKEN;
            const response = await request(app.getHttpServer())
                .get('/settings')
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).not.toBe(401)
            expect(response.status).toBe(200)
        })
    })

    describe('/settings',() => {
        it('PUT /settings',async () => {
            const token = process.env.CURRENT_ADMIN_TOKEN;
            const response = await request(app.getHttpServer())
                .put(`/settings`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: "test",
                    fam: "test",
                    number: "+79999999999"
                })
            expect(response.status).not.toBe(401)
            expect(response.status).toBe(200)
        })
    })
});
