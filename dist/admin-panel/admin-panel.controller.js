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
exports.AdminPanelController = void 0;
const common_1 = require("@nestjs/common");
const admin_panel_service_1 = require("./admin-panel.service");
const jwt_admin_panel_guard_1 = require("./jwt-admin-panel.guard");
let AdminPanelController = class AdminPanelController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    updateUser(req) {
        return this.adminService.updateUser(req);
    }
    deleteUser(id) {
        return this.adminService.deleteUser(+id);
    }
    deleteImages() {
        return this.adminService.deleteImages();
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_admin_panel_guard_1.JwtAdminPanelGuard),
    (0, common_1.Put)('/update-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], AdminPanelController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_admin_panel_guard_1.JwtAdminPanelGuard),
    (0, common_1.Delete)('/user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminPanelController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_admin_panel_guard_1.JwtAdminPanelGuard),
    (0, common_1.Delete)('/delete-images'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminPanelController.prototype, "deleteImages", null);
AdminPanelController = __decorate([
    (0, common_1.UseGuards)(jwt_admin_panel_guard_1.JwtAdminPanelGuard),
    (0, common_1.Controller)('/admin-panel'),
    __metadata("design:paramtypes", [admin_panel_service_1.AdminPanelService])
], AdminPanelController);
exports.AdminPanelController = AdminPanelController;
//# sourceMappingURL=admin-panel.controller.js.map