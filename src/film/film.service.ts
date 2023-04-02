import { Injectable } from '@nestjs/common';
import {Film} from "./film.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateFilmDto} from "./dto/film.dto";
import {FileService} from "../file/file.service";


@Injectable()
export class FilmService {
    constructor(@InjectRepository(Film) private filmRepository: Repository<Film>,
                private fileService: FileService) {}

    async createFilm(createFilmDto: CreateFilmDto, screenshots: object[]): Promise<Film> {
        const film = new Film();
        film.name = createFilmDto.name;
        film.year = createFilmDto.year;
        film.description = createFilmDto.description;
        const savedFilm = await this.filmRepository.save(film);

        const filmId = await this.filmRepository.getId(savedFilm);

        for (const screenshot of screenshots) {
            await this.fileService.createFile(screenshot,"film", filmId);
        }
        return savedFilm;
    }
}
