"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CabinetModule = void 0;
const common_1 = require("@nestjs/common");
const cabinet_controller_1 = require("./cabinet.controller");
const cabinet_service_1 = require("./cabinet.service");
const database_module_1 = require("../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let CabinetModule = class CabinetModule {
};
CabinetModule = __decorate([
    (0, common_1.Module)({
        controllers: [cabinet_controller_1.CabinetController],
        providers: [cabinet_service_1.CabinetService],
        exports: [cabinet_service_1.CabinetService, jwt_1.JwtModule],
        imports: [config_1.ConfigModule.forRoot(), database_module_1.DatabaseModule, jwt_1.JwtModule.register({
                secret: process.env.PRIVATE_KEY || 'SECRET',
                signOptions: {
                    expiresIn: '24h'
                }
            })]
    })
], CabinetModule);
exports.CabinetModule = CabinetModule;
//# sourceMappingURL=cabinet.module.js.map