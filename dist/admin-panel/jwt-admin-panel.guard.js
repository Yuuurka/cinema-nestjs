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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdminPanelGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtAdminPanelGuard = class JwtAdminPanelGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            const isAdmin = Boolean(this.jwtService.verify(token, { secret: 'SECRET' })['isAdmin']);
            if (bearer !== 'Bearer' || !token) {
                throw new common_1.UnauthorizedException({ message: `Пользователь не авторизован` });
            }
            if (isAdmin == false) {
                throw new common_1.UnauthorizedException({ message: 'Вы не являетесь администратором' });
            }
            req.user = this.jwtService.verify(token, { secret: 'SECRET' });
            return true;
        }
        catch (e) {
            throw new common_1.UnauthorizedException({ message: 'Вы не являетесь администратором/ошибка сервера' });
        }
    }
};
JwtAdminPanelGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAdminPanelGuard);
exports.JwtAdminPanelGuard = JwtAdminPanelGuard;
//# sourceMappingURL=jwt-admin-panel.guard.js.map