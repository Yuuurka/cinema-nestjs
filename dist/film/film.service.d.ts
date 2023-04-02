import { Film } from "./film.entity";
import { Repository } from "typeorm";
import { CreateFilmDto } from "./dto/film.dto";
import { FileService } from "../file/file.service";
export declare class FilmService {
    private filmRepository;
    private fileService;
    constructor(filmRepository: Repository<Film>, fileService: FileService);
    createFilm(createFilmDto: CreateFilmDto, screenshots: object[]): Promise<Film>;
}
