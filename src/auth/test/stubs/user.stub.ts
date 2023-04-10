import {CreateUserDto} from "../../dto/create-user.dto";
import * as uuid from 'uuid';

export const userStubLOG = (): CreateUserDto => {
    return {
        user_id: null,
        login: "admin@gmail.com",
        password: "qwerty123"
    }
}

export const userStubREG = (): CreateUserDto => {
    return {
        user_id: null,
        login: uuid.v4().substring(0, 29),
        password: "qwerty123"
    }
}