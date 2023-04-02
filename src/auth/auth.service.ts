import {HttpException, HttpStatus, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
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
        const userID: number = (await this.conn.query(`SELECT user_id FROM "User" WHERE login=$1`, [userDto.login]))['rows'][0]['user_id']
        return this.generateToken(userData, userID, "login")
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.conn.query(`SELECT 1 FROM "User" WHERE login=$1 LIMIT 1`, [userDto.login]);
        if ((candidate.rows).length==1) {
            throw new HttpException("Пользователь с таким логином существует", HttpStatus.BAD_REQUEST);
        }


        /** bcrypt.hash() хеширует строку с определенной сложностью (чем больше, тем больше ресурсов потребляет, но тем безопаснее **/
        const hashPassword = await bcrypt.hash(userDto.password, 5);

        const user = await this.conn.query
        (`INSERT INTO "User" (login, password) VALUES ($1, $2) RETURNING *`, [userDto.login, hashPassword]);

        if (!user) {
            throw new HttpException("Непредвиденная ошибка", HttpStatus.BAD_REQUEST);
        }
        const maxUserID = (await this.conn.query(`SELECT MAX(user_id) FROM "User"`)).rows[0]['max'];
        await this.conn.query
        (`INSERT INTO "Profile" (profile_id, name, fam, phone_number) VALUES ($1, $2, $3, $4) 
          RETURNING * `, [maxUserID, userDto.name || 'null', userDto.fam || 'null', userDto.phone_number || 'null']);


        return this.generateToken(userDto, maxUserID, "registration");
    }

    private async generateToken(userDto, userID, method){
        if (method == "login"){
            const isAdmin = (await this.conn.query(`SELECT isadmin FROM "User" WHERE login=$1`, [userDto.login]))['rows'][0]['isadmin'];
            const payload = {login: userDto.login, password: userDto.password, isAdmin};
            await this.conn.query(`UPDATE "jwttoken" SET token=$1 WHERE user_id=$2`, [this.jwtService.sign(payload), userID])
            return {
                token: this.jwtService.sign(payload)
            }
        }else{
            const payload = {login: userDto.login, password: userDto.password, isAdmin: false};
            await this.conn.query(`INSERT INTO "jwttoken" (user_id, token) VALUES ($1, $2)`, [userID, this.jwtService.sign(payload)])
            return {
                token: this.jwtService.sign(payload)
            }
        }
    }

    private async validateUser(userDto){
        const login: string = userDto.login;
        const user = await this.conn.query(`SELECT 1 FROM "User" WHERE login=$1`, [login]);
        if (user['rowCount'] != 1){
            throw new UnauthorizedException({message: 'Неверный логин или пароль'})
        }
        const getHash = await this.conn.query(`SELECT password FROM "User" WHERE login=$1`, [login]);
        const areEquals = await bcrypt.compare(userDto.password, getHash['rows'][0]['password']);
        if (areEquals){
            return userDto;
        }
        throw new UnauthorizedException({message: 'Неверный логин или пароль'})
    }
}




























