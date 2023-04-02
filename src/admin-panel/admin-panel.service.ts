import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {PG_CONNECTION} from "../constants";
import {IsNull, LessThan, Repository} from "typeorm";
import {TextBlock} from "../text-block/text-block.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {File} from "../file/file.entity"
import {FileService} from "../file/file.service"


@Injectable()
export class AdminPanelService {
    constructor(@Inject(PG_CONNECTION) private conn: any,
                @InjectRepository(TextBlock) private blockRepository: Repository<TextBlock>,
                @InjectRepository(File) private fileRepository: Repository<File>,
                private fileService: FileService) {}

    async updateUser(req){
        const id = req.id;
        const name = req.name;
        const fam = req.fam;
        const phone_number = req.phone_number;

        await this.conn.query(`UPDATE "Profile" SET name=$1, fam=$2, phone_number=$3 WHERE profile_id=$4`, [name, fam, phone_number, id]);
        return {"code": 200, "message":"Изменения вошли в силу", "error": null};
    }

    async deleteUser(id){
        await this.conn.query(`DELETE FROM "Profile" WHERE id=$1`, [id]);
        await this.conn.query(`DELETE FROM "User" WHERE id=$1`, [id]);
        return {"code": 200, "message":`Пользователь id${id} удален`, "error": null};
    }


    async deleteImages() {
        return await this.fileService.deleteNonUseImages()
    }
}
