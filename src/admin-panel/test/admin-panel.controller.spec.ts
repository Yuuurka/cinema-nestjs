import {Test, TestingModule} from '@nestjs/testing';
import {AdminPanelController} from '../admin-panel.controller';
import {AdminPanelService} from "../admin-panel.service";
import {HttpStatus, INestApplication} from "@nestjs/common";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {DatabaseModule} from "../../database/database.module";
import {FileModule} from "../../file/file.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TextBlock} from "../../text-block/text-block.entity";
import {File} from "../../file/file.entity";
import {FilmModule} from "../../film/film.module";
import * as request from 'supertest';
import {ConfigModule} from "@nestjs/config";


jest.mock('../admin-panel.service');


describe('AdminPanelController',  () => {
  let adminPanelService: AdminPanelService;
  let module: TestingModule;
  let adminPanelController: AdminPanelController;
  let app: INestApplication;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule,TypeOrmModule.forFeature([TextBlock, File]), TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }), FileModule, FilmModule, JwtModule.register( {
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
          expiresIn: '24h'
        }
      })],
      providers: [AdminPanelService, JwtService],
      controllers: [AdminPanelController],
      exports: [JwtModule]
    }).compile();
    app = module.createNestApplication();
    await app.init();
    adminPanelService = module.get<AdminPanelService>(AdminPanelService);
    adminPanelController = module.get<AdminPanelController>(AdminPanelController);
  });
  afterEach(async () => {
    await app.close();
    jest.clearAllMocks();
  })

  describe('updateUser',() => {
    it('updateUser',async () => {
      const token = process.env.CURRENT_ADMIN_TOKEN;
      const response = await request(app.getHttpServer())
          .put('/admin-panel/update-user')
          .set('Authorization', `Bearer ${token}`)
          .send({
            id: 1,
            name: "kir",
            fam: "kirov"
          })
      expect(response.status).not.toBe(401)
      expect(response.status).toBe(200)
    })
  })

  describe('deleteUser',() => {
    it('deleteUser',async () => {
      const id = 1;
      const token = process.env.CURRENT_ADMIN_TOKEN;
      const response = await request(app.getHttpServer())
          .delete(`/admin-panel/user/${id}`)
          .set('Authorization', `Bearer ${token}`)
      expect(response.status).not.toBe(401)
      expect(response.status).toBe(200)
    })
  })

  describe('deleteImages',() => {
    it('deleteImages',async () => {
      const token = process.env.CURRENT_ADMIN_TOKEN;
      const response = await request(app.getHttpServer())
          .delete(`/admin-panel/delete-images`)
          .set('Authorization', `Bearer ${token}`)
      expect(response.status).not.toBe(401)
      expect(response.status).toBe(200)
    })
  })
});
