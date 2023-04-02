import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "./dto/create-user.dto";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto)
    }

    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }
}
