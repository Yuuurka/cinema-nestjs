"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmModule = void 0;
const common_1 = require("@nestjs/common");
const film_service_1 = require("./film.service");
const film_controller_1 = require("./film.controller");
const film_entity_1 = require("./film.entity");
const typeorm_1 = require("@nestjs/typeorm");
const file_module_1 = require("../file/file.module");
const jwt_1 = require("@nestjs/jwt");
let FilmModule = class FilmModule {
};
FilmModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([film_entity_1.Film]), file_module_1.FileModule, jwt_1.JwtModule, jwt_1.JwtModule.register({
                secret: process.env.PRIVATE_KEY || 'SECRET',
                signOptions: {
                    expiresIn: '24h'
                }
            })],
        providers: [film_service_1.FilmService],
        controllers: [film_controller_1.FilmController]
    })
], FilmModule);
exports.FilmModule = FilmModule;
//# sourceMappingURL=film.module.js.map