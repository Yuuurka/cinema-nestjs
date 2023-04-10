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
exports.CabinetService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const jwt_1 = require("@nestjs/jwt");
let CabinetService = class CabinetService {
    constructor(conn, jwtService) {
        this.conn = conn;
        this.jwtService = jwtService;
    }
    async getInfoUser(req) {
        console.log(req);
        const header = req.get("Authorization").split(' ')[1];
        const login = this.jwtService.verify(header)['login'];
        const userID = (await this.conn.query(`SELECT user_id FROM "User" WHERE login=$1`, [login]))['rows'][0]['user_id'];
        const response = await this.conn.query(`SELECT * FROM "Profile" WHERE profile_id=$1`, [userID]);
        return response.rows[0];
    }
    async putInfoUser(req) {
        const header = req.get("Authorization").split(' ')[1];
        const login = this.jwtService.verify(header)['login'];
        const body = req.body;
        const name = body.name;
        const fam = body.fam;
        const phone_number = body.phone_number;
        const userID = (await this.conn.query(`SELECT user_id FROM "User" WHERE login=$1`, [login]))['rows'][0]['user_id'];
        await this.conn.query(`UPDATE "Profile" SET name=$1, fam=$2, phone_number=$3 WHERE profile_id=$4`, [name, fam, phone_number, userID]);
        return { "success": "Изменения вошли в силу" };
    }
};
CabinetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], CabinetService);
exports.CabinetService = CabinetService;
//# sourceMappingURL=cabinet.service.js.map