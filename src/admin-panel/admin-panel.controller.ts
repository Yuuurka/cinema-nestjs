import {Body, Controller, Delete, Param, Post, Put, UseGuards} from '@nestjs/common';
import {AdminPanelService} from "./admin-panel.service";
import {JwtAdminPanelGuard} from "./jwt-admin-panel.guard";
import {CreateUserDto} from "../auth/dto/create-user.dto";

@UseGuards(JwtAdminPanelGuard)
@Controller('/admin-panel')
export class AdminPanelController {
    constructor(private readonly adminService: AdminPanelService) {
    }

    @UseGuards(JwtAdminPanelGuard)
    @Put('/update-user')
    updateUser(@Body() req: { createUserDto: CreateUserDto }){
        return this.adminService.updateUser(req);
    }

    @UseGuards(JwtAdminPanelGuard)
    @Delete('/user/:id')
    deleteUser(@Param('id') id: string){
        return this.adminService.deleteUser(+id);
    }


    @UseGuards(JwtAdminPanelGuard)
    @Delete('/delete-images')
    deleteImages(){
        return this.adminService.deleteImages();
    }
}
