export class CreateUserDto{
    readonly login: string;
    readonly password: string;
    readonly isAdmin?: boolean = false;
    readonly name?: string;
    readonly fam?: string;
    readonly phone_number?: string;
}