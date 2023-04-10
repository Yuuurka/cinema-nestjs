export declare class CreateUserDto {
    readonly user_id: number;
    readonly login: string;
    readonly password: string;
    readonly isAdmin?: boolean;
    readonly name?: string;
    readonly fam?: string;
    readonly phone_number?: string;
}
