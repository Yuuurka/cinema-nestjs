import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextBlock } from './text-block.entity';
import {CreateTextBlockDto} from "./dto/text-block.dto";
import {File} from "../file/file.entity";
import {FileService} from "../file/file.service";
import {PG_CONNECTION} from "../constants";

/** Api typeorm docs https://orkhan.gitbook.io/typeorm/docs/repository-api **/
@Injectable()
export class TextBlockService {
    /** `@InjectRepository` позволяет внедрить экземпляр репозитория
     * (класс, который обеспечивает способ взаимодействия с определенной таблицей или коллекцией базы данных)**/
    constructor(
        @Inject(PG_CONNECTION) private conn: any,
        @InjectRepository(TextBlock) private readonly blockRepository: Repository<TextBlock>,
        @InjectRepository(File) private fileRepository: Repository<File>,
        private fileService: FileService) {}
    /** Также можно внедрять другие сервисы, если их модули были импортированы в текущий .module **/

    /** Асинхронные функции должны возвращать Promise<type> **/
    async findAll(group): Promise<TextBlock[]> {
        if (group !== 'all') {
            return (await this.conn.query(`SELECT text_block.id, text_block."uniqueName", text_block.name, text_block.text, 
                                         text_block.group, file.url FROM text_block LEFT JOIN file ON file."essenceId" = text_block.id
                                         WHERE text_block.group = $1 AND file."essenceTable"=$2`,
                                         [group, "text-block"])).rows;
        }
        return (await this.conn.query(`SELECT text_block.id, text_block."uniqueName", text_block.name, text_block.text, 
                                         text_block.group, file.url FROM text_block LEFT JOIN file ON file."essenceId" = text_block.id
                                         WHERE file."essenceTable"=$1`, ["text-block"])).rows;
            // return await this.blockRepository.find({relations: [`image`], where: {group: group}})
        // }
            // return await this.blockRepository.find({relations: [`image`], where: {group: group}});
            // return await this.blockRepository.createQueryBuilder('text_block')
            //     .leftJoinAndSelect('text_block.image', 'file')
            //     .select(['text_block.id', 'text_block.uniqueName', 'text_block.name', 'text_block.text', 'text_block.group', 'file.url'])
            //     .where("text_block.group = :group", {group: group})
            //     .getMany();
    //         return await this.blockRepository.find({
    //             where: {
    //                 group: group
    //             },
    //             select: ['id', 'uniqueName', 'name', 'text', 'group'],
    //             relations: ['image'],
    //             join: {
    //                 alias: 'text_block',
    //                 leftJoinAndSelect: {
    //                     file: 'text_block.image'
    //                 }
    //             }
    //         });
    //     }
    //     return await this.blockRepository.find({select: ['id', 'uniqueName', 'name', 'text', 'group'],
    //         relations: ['image'],
    //         join: {
    //             alias: 'text_block',
    //             leftJoinAndSelect: {
    //                 file: 'text_block.image'
    //             }
    //         }
    //     });
    }

    async findOne(id): Promise<TextBlock[]> {
        return (await this.conn.query(`SELECT text_block.id, text_block."uniqueName", text_block.name, text_block.text, 
                                         text_block.group, file.url FROM text_block LEFT JOIN file ON file."essenceId" = text_block.id
                                         WHERE text_block.id=$1`, [id])).rows
    }

    async createTextBlock(createTextBlockDto: CreateTextBlockDto, images: object[]): Promise<TextBlock>{
        const block = new TextBlock();
        block.uniqueName = createTextBlockDto.uniqueName;
        block.name = createTextBlockDto.name;
        block.text = createTextBlockDto.text;
        block.group = createTextBlockDto.group;
        const savedBlock = await this.blockRepository.save(block);

        const blockId = await this.blockRepository.getId(savedBlock)

        await this.uploadFiles(images, "text-block", blockId);

        return savedBlock;
    }

    async updateTextBlock(post: CreateTextBlockDto, images: object[]): Promise<TextBlock>{
        console.log(post)
        await this.blockRepository.update(post.id, post);
        const updatedBlock = await this.blockRepository.findOne({where: {id: post.id}});

        if (images){
            await this.uploadFiles(images, "text-block", post.id);
        }
        if (updatedBlock) {
            return updatedBlock;
        }

        throw new HttpException('Block not found', HttpStatus.NOT_FOUND);
    }

    async deleteTextBlock(id: number): Promise<object>{
        const deletedBlock = await this.blockRepository.delete(id);
        if (!deletedBlock.affected) {
            throw new HttpException('Block not found', HttpStatus.NOT_FOUND);
        }
        await this.fileService.deleteBlockImages("text-block", id);
        return {"status": 200, "message": `block id${id} removed`, "error": null}
    }

    private async uploadFiles(images: object[], entity: string, entityId: number){
        for (const image of images) {
            await this.fileService.createFile(image, entity, entityId);
        }
    }
}