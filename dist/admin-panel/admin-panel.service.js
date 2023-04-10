"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPanelService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const typeorm_1 = require("typeorm");
const text_block_entity_1 = require("../text-block/text-block.entity");
const typeorm_2 = require("@nestjs/typeorm");
const file_entity_1 = require("../file/file.entity");
const file_service_1 = require("../file/file.service");
let AdminPanelService = class AdminPanelService {
    constructor(conn, blockRepository, fileRepository, fileService) {
        this.conn = conn;
        this.blockRepository = blockRepository;
        this.fileRepository = fileRepository;
        this.fileService = fileService;
    }
    async updateUser(req) {
        const id = req.id;
        const exist = (await this.conn.query(`SELECT 1 FROM "User" WHERE user_id=$1`, [id])).rowCount;
        if (exist != 1) {
            return { "code": common_1.HttpStatus.OK, "result": null, "error": "Пользователя не существует" };
        }
        const name = req.name;
        const fam = req.fam;
        const phone_number = req.phone_number;
        await this.conn.query(`UPDATE "Profile" SET name=$1, fam=$2, phone_number=$3 WHERE profile_id=$4`, [name, fam, phone_number, id]);
        return { "code": common_1.HttpStatus.OK, "result": "Изменения вошли в силу", "error": null };
    }
    async deleteUser(id) {
        await this.conn.query(`DELETE FROM "jwttoken" WHERE user_id=$1`, [id]);
        await this.conn.query(`DELETE FROM "Profile" WHERE profile_id=$1`, [id]);
        await this.conn.query(`DELETE FROM "User" WHERE user_id=$1`, [id]);
        return { "code": common_1.HttpStatus.OK, "result": `Пользователь id${id} удален`, "error": null };
    }
    async deleteImages() {
        return await this.fileService.deleteNonUseImages();
    }
};
AdminPanelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __param(1, (0, typeorm_2.InjectRepository)(text_block_entity_1.TextBlock)),
    __param(2, (0, typeorm_2.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [Object, typeorm_1.Repository,
        typeorm_1.Repository,
        file_service_1.FileService])
], AdminPanelService);
exports.AdminPanelService = AdminPanelService;
//# sourceMappingURL=admin-panel.service.js.map