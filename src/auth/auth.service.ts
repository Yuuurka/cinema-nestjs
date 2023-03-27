import {Body, HttpException, HttpStatus, Inject, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import { PG_CONNECTION } from "../constants";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(@Inject(PG_CONNECTION) private conn: any,
                private jwtService: JwtService) {}

    async login(userDto: CreateUserDto){
        const userData = await this.validateUser(userDto);
        return this.generateToken(userData)
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.conn.query(`SELECT 1 FROM "User" WHERE login=$1 LIMIT 1`, [userDto.login]);
        if ((candidate.rows).length==1) {
            throw new HttpException("Пользователь с таким логином существует", HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);

        const user = await this.conn.query
        (`INSERT INTO "User" (login, password) VALUES ($1, $2) RETURNING *`, [userDto.login, hashPassword]);

        if (!user) {
            throw new HttpException("Непредвиденная ошибка", HttpStatus.BAD_REQUEST);
        }

        const profile = await this.conn.query
        (`INSERT INTO "Profile" (profile_id, name, fam, phone_number) VALUES ((SELECT MAX(user_id) FROM "User"), $1, $2, $3) 
          RETURNING * `, [userDto.name || 'null', userDto.fam || 'null', userDto.phone_number || 'null']);


        return this.generateToken(userDto);
    }

    private async generateToken(userDto){
        const payload = {login: userDto.login, password: userDto.password, isAdmin: userDto.isAdmin}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto){
        const login: string = userDto.login;
        const user = await this.conn.query(`SELECT 1 FROM "User" WHERE login=$1`, [login]);
        const getHash = await this.conn.query(`SELECT password FROM "User" WHERE login=$1`, [login]);
        const areEquals = await bcrypt.compare(userDto.password, getHash['rows'][0]['password']);
        if (user['rowCount'] == 1 && areEquals){
            return userDto;
        }
        throw new UnauthorizedException({message: 'Неверный логин или пароль'})
    }
}




























