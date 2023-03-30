import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { TextBlockService } from './text-block.service';

@Controller('text-blocks')
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
}