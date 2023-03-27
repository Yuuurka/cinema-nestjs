import {Inject, Injectable} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import { PG_CONNECTION } from "../constants";

@Injectable()
export class AuthService {
    constructor(@Inject(PG_CONNECTION) private conn: any) {}

    async getUsers() {
        const res = await this.conn.query('SELECT * FROM "User"');
        return res.rows;
    }
}
