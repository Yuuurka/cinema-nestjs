import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {PG_CONNECTION} from "../constants";
import {Repository} from "typeorm";
import {TextBlock} from "../text-block/text-block.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateTextBlockDto} from "../text-block/dto/text-block.dto";

@Injectable()
export class AdminPanelService {
    constructor(@Inject(PG_CONNECTION) private conn: any,
                @InjectRepository(TextBlock) private blockRepository: Repository<TextBlock>) {}

    async updateUser(req){
        const id = req.id;
        const name = req.name;
        const fam = req.fam;
        const phone_number = req.phone_number;

        await this.conn.query(`UPDATE "Profile" SET name=$1, fam=$2, phone_number=$3 WHERE profile_id=$4`, [name, fam, phone_number, id]);
        return {"success":"Изменения вошли в силу"};
    }


    async createTextBlock(block: CreateTextBlockDto){
        const newBlock = await this.blockRepository.create(block);
        await this.blockRepository.save(newBlock);

        return newBlock;
    }

    async updateTextBlock(post: CreateTextBlockDto){
        await this.blockRepository.update(post.id, post);
        const updatedBlock = await this.blockRepository.findOne({where: {id: post.id}});
        if (updatedBlock) {
            return updatedBlock;
        }

        throw new HttpException('Block not found', HttpStatus.NOT_FOUND);
    }

    async deleteTextBlock(id: number){
        const deletedTodo = await this.blockRepository.delete(id);
        if (!deletedTodo.affected) {
            throw new HttpException('Block not found', HttpStatus.NOT_FOUND);
        }
    }
}
