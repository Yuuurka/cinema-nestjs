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
exports.FilmService = void 0;
const common_1 = require("@nestjs/common");
const film_entity_1 = require("./film.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const file_service_1 = require("../file/file.service");
let FilmService = class FilmService {
    constructor(filmRepository, fileService) {
        this.filmRepository = filmRepository;
        this.fileService = fileService;
    }
    async createFilm(createFilmDto, screenshots) {
        const film = new film_entity_1.Film();
        film.name = createFilmDto.name;
        film.year = createFilmDto.year;
        film.description = createFilmDto.description;
        const savedFilm = await this.filmRepository.save(film);
        const filmId = await this.filmRepository.getId(savedFilm);
        for (const screenshot of screenshots) {
            await this.fileService.createFile(screenshot, "film", filmId);
        }
        return savedFilm;
    }
};
FilmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(film_entity_1.Film)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        file_service_1.FileService])
], FilmService);
exports.FilmService = FilmService;
//# sourceMappingURL=film.service.js.map