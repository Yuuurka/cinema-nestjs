import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

/** Проверка на администратора **/
@Injectable()
export class JwtAdminPanelGuard implements CanActivate{
    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            const isAdmin = Boolean(this.jwtService.verify(token, {secret: 'SECRET'})['isAdmin'])

            if (bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: `Пользователь не авторизован`})
            }

            if (isAdmin==false){
                throw new UnauthorizedException({message: 'Вы не являетесь администратором'})
            }

            req.user = this.jwtService.verify(token, {secret: 'SECRET'});
            return true
        } catch (e) {
            throw new UnauthorizedException({message: 'Вы не являетесь администратором/ошибка сервера'})
        }
    }
}