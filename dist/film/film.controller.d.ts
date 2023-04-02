/// <reference types="multer" />
import { FilmService } from "./film.service";
import { CreateFilmDto } from "./dto/film.dto";
export declare class FilmController {
    private readonly filmService;
    constructor(filmService: FilmService);
    createFilm(dto: CreateFilmDto, screenshots: Array<Express.Multer.File>): Promise<import("./film.entity").Film>;
}
