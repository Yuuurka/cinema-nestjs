import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    UseGuards,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import {JwtAdminPanelGuard} from "../admin-panel/jwt-admin-panel.guard";
import {CreateTextBlockDto} from "./dto/text-block.dto";
import {AnyFilesInterceptor} from "@nestjs/platform-express";

@Controller('/text-blocks')
export class TextBlockController {
    constructor(private readonly textBlockService: TextBlockService) {}

    @Get('/group/:group')
    getAll(@Param('group') group: string) {
        return this.textBlockService.findAll(group);
    }

    @Get('/id/:id')
    getOne(@Param('id') id: string) {
        return this.textBlockService.findOne(+id);
    }

    @UseGuards(JwtAdminPanelGuard)
    @Post('/settings')
    /** AnyFilesInterceptor() позволяет перехватывать и обрабатывать входящие запросы, которые содержат файлы любого типа**/
    @UseInterceptors(AnyFilesInterceptor())
    /** Express.Multer.File используется для загрузки НЕСКОЛЬКИХ файлов, где файлы это объекты**/
    createTextBlock(@Body() block: CreateTextBlockDto, @UploadedFiles() images: Array<Express.Multer.File>){
        return this.textBlockService.createTextBlock(block, images);
    }

    @UseGuards(JwtAdminPanelGuard)
    @Put('/settings')
    @UseInterceptors(AnyFilesInterceptor())
    updateTextBlock(@Body() block: CreateTextBlockDto, @UploadedFiles() images: Array<Express.Multer.File>){
        return this.textBlockService.updateTextBlock(block, images);
    }

    @UseGuards(JwtAdminPanelGuard)
    @Delete('/id/:id')
    deleteTextBlock(@Param('id') id: string){
        return this.textBlockService.deleteTextBlock(+id);
    }
}