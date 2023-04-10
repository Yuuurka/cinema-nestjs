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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(conn, jwtService) {
        this.conn = conn;
        this.jwtService = jwtService;
    }
    async login(userDto) {
        const userData = await this.validateUser(userDto);
        const userID = (await this.conn.query(`SELECT user_id FROM "User" WHERE login=$1`, [userDto.login]))['rows'][0]['user_id'];
        return this.generateToken(userData, userID, "login");
    }
    async registration(userDto) {
        const candidate = await this.conn.query(`SELECT 1 FROM "User" WHERE login=$1 LIMIT 1`, [userDto.login]);
        if ((candidate.rows).length == 1) {
            throw new common_1.HttpException("Пользователь с таким логином существует", common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.conn.query(`INSERT INTO "User" (login, password) VALUES ($1, $2) RETURNING *`, [userDto.login, hashPassword]);
        if (!user) {
            throw new common_1.HttpException("Непредвиденная ошибка", common_1.HttpStatus.BAD_REQUEST);
        }
        const maxUserID = (await this.conn.query(`SELECT MAX(user_id) FROM "User"`)).rows[0]['max'];
        await this.conn.query(`INSERT INTO "Profile" (profile_id, name, fam, phone_number) VALUES ($1, $2, $3, $4) 
          RETURNING * `, [maxUserID, userDto.name || 'null', userDto.fam || 'null', userDto.phone_number || 'null']);
        return this.generateToken(userDto, maxUserID, "registration");
    }
    async generateToken(userDto, userID, method) {
        if (method == "login") {
            const isAdmin = (await this.conn.query(`SELECT isadmin FROM "User" WHERE login=$1`, [userDto.login]))['rows'][0]['isadmin'];
            const payload = { login: userDto.login, password: userDto.password, isAdmin };
            await this.conn.query(`UPDATE "jwttoken" SET token=$1 WHERE user_id=$2`, [this.jwtService.sign(payload, { secret: process.env.PRIVATE_KEY }), userID]);
            return {
                token: this.jwtService.sign(payload, { secret: process.env.PRIVATE_KEY })
            };
        }
        else {
            const payload = { login: userDto.login, password: userDto.password, isAdmin: false };
            await this.conn.query(`INSERT INTO "jwttoken" (user_id, token) VALUES ($1, $2)`, [userID, this.jwtService.sign(payload, { secret: process.env.PRIVATE_KEY })]);
            return {
                token: this.jwtService.sign(payload, { secret: process.env.PRIVATE_KEY })
            };
        }
    }
    async validateUser(userDto) {
        const login = userDto.login;
        const user = await this.conn.query(`SELECT 1 FROM "User" WHERE login=$1`, [login]);
        if (user['rowCount'] != 1) {
            throw new common_1.UnauthorizedException({ message: 'Неверный логин или пароль' });
        }
        const getHash = await this.conn.query(`SELECT password FROM "User" WHERE login=$1`, [login]);
        const areEquals = await bcrypt.compare(userDto.password, getHash['rows'][0]['password']);
        if (areEquals) {
            return userDto;
        }
        throw new common_1.UnauthorizedException({ message: 'Неверный логин или пароль' });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map