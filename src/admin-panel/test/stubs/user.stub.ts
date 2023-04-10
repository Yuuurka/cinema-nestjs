import {CreateUserDto} from "../../../auth/dto/create-user.dto";

export const userStub: CreateUserDto = {
    user_id: 1,
    login: 'example@email.com',
    password: 'example@email.com',
    isAdmin: false
}