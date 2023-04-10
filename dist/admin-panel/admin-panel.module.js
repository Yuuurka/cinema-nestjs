"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPanelModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const admin_panel_service_1 = require("./admin-panel.service");
const admin_panel_controller_1 = require("./admin-panel.controller");
const typeorm_1 = require("@nestjs/typeorm");
const text_block_entity_1 = require("../text-block/text-block.entity");
const file_entity_1 = require("../file/file.entity");
const file_module_1 = require("../file/file.module");
const config_1 = require("@nestjs/config");
let AdminPanelModule = class AdminPanelModule {
};
AdminPanelModule = __decorate([
    (0, common_1.Module)({
        providers: [admin_panel_service_1.AdminPanelService],
        imports: [config_1.ConfigModule.forRoot(), database_module_1.DatabaseModule, file_module_1.FileModule, jwt_1.JwtModule.register({
                secret: process.env.PRIVATE_KEY || 'SECRET',
                signOptions: {
                    expiresIn: '24h'
                }
            }), typeorm_1.TypeOrmModule.forFeature([text_block_entity_1.TextBlock, file_entity_1.File])],
        controllers: [admin_panel_controller_1.AdminPanelController],
        exports: [jwt_1.JwtModule]
    })
], AdminPanelModule);
exports.AdminPanelModule = AdminPanelModule;
//# sourceMappingURL=admin-panel.module.js.map