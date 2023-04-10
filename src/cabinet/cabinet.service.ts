import {Inject, Injectable} from '@nestjs/common';
import {PG_CONNECTION} from "../constants";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class CabinetService {
    constructor(@Inject(PG_CONNECTION) private conn: any, private jwtService: JwtService) {}

    async getInfoUser(req){
        console.log(req)
        const header = req.get("Authorization").split(' ')[1];
        const login = this.jwtService.verify(header)['login']

        const userID = (await this.conn.query(`SELECT user_id FROM "User" WHERE login=$1`, [login]))['rows'][0]['user_id'];
        const response = await this.conn.query(`SELECT * FROM "Profile" WHERE profile_id=$1`, [userID]);

        return response.rows[0];
    }

    async putInfoUser(req){
        const header = req.get("Authorization").split(' ')[1];
        const login = this.jwtService.verify(header)['login']

        const body = req.body;
        const name = body.name;
        const fam = body.fam;
        const phone_number = body.phone_number;

        const userID = (await this.conn.query(`SELECT user_id FROM "User" WHERE login=$1`, [login]))['rows'][0]['user_id'];
        await this.conn.query(`UPDATE "Profile" SET name=$1, fam=$2, phone_number=$3 WHERE profile_id=$4`, [name, fam, phone_number, userID]);
        return {"success":"Изменения вошли в силу"};
    }
}
