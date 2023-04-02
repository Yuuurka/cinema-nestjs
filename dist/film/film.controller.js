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
exports.FilmController = void 0;
const common_1 = require("@nestjs/common");
const film_service_1 = require("./film.service");
const film_dto_1 = require("./dto/film.dto");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_cabinet_guard_1 = require("../cabinet/jwt-cabinet.guard");
let FilmController = class FilmController {
    constructor(filmService) {
        this.filmService = filmService;
    }
    createFilm(dto, screenshots) {
        return this.filmService.createFilm(dto, screenshots);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_cabinet_guard_1.JwtCabinetGuard),
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [film_dto_1.CreateFilmDto, Array]),
    __metadata("design:returntype", void 0)
], FilmController.prototype, "createFilm", null);
FilmController = __decorate([
    (0, common_1.Controller)('/film'),
    __metadata("design:paramtypes", [film_service_1.FilmService])
], FilmController);
exports.FilmController = FilmController;
//# sourceMappingURL=film.controller.js.map