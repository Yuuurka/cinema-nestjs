import {Controller, Get, Put, Req, UseGuards} from '@nestjs/common';
import {CabinetService} from "./cabinet.service";
import {CreateUserDto} from "../auth/dto/create-user.dto";
import {JwtCabinetGuard} from "./jwt-cabinet.guard";


@Controller()
export class CabinetController {
    constructor(private readonly cabinetService: CabinetService) {
    }

    @UseGuards(JwtCabinetGuard)
    @Get('/settings')
    getInfoUser(@Req() req: Request){
        return this.cabinetService.getInfoUser(req);
    }

    @UseGuards(JwtCabinetGuard)
    @Put('/settings')
    putInfoUser(@Req() req: Request){
        return this.cabinetService.putInfoUser(req);
    }
}
