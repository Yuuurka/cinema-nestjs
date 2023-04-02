import {Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {FilmService} from "./film.service";
import {CreateFilmDto} from "./dto/film.dto";
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {JwtCabinetGuard} from "../cabinet/jwt-cabinet.guard";


@Controller('/film')
export class FilmController {
    constructor(private readonly filmService: FilmService) {}

    @UseGuards(JwtCabinetGuard)
    @Post('/create')
    @UseInterceptors(AnyFilesInterceptor())
    createFilm(@Body() dto: CreateFilmDto, @UploadedFiles() screenshots: Array<Express.Multer.File>){
        return this.filmService.createFilm(dto, screenshots)
    }
}
