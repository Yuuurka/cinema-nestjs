import {IsEmail, IsMobilePhone, IsString, Length} from "class-validator";

export class CreateUserDto{
    @IsString({message: "Email должен быть строкой"})
    @IsEmail({}, {message: "Некорректный ввод Email"})
    readonly login: string;
    @Length(7, 255, {message: "Длина пароля должна составлять минимум 7 символов"})
    readonly password: string;
    readonly isAdmin?: boolean = false;
    readonly name?: string;
    readonly fam?: string;
    readonly phone_number?: string;
}