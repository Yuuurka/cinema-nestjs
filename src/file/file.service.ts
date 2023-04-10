import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import {InjectRepository} from "@nestjs/typeorm";
import {File} from "./file.entity";
import {IsNull, LessThan, Repository} from "typeorm";


@Injectable()
export class FileService {
    constructor(@InjectRepository(File) private fileRepository: Repository<File>) {
    }

    async createFile(file, entity: string, entityId: number): Promise<string>{
        try{
            /** uuid.v4() генерирует строку универсального уникального идентификатора **/
            const fileName = uuid.v4() + '.jpg';
            /** путь к хранению файлов (хранится в папке dist **/
            const filePath = path.resolve(__dirname, '..', 'static', 'img');

            /** Если не существует, то создать, все функции должны быть асинхронными **/
            if (!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})
            }

            /** Запись на диск, path.join передает полный путь + название файла, file.buffer - двоичные данные файла **/
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);

            const dateString = new Date().toLocaleString();
            const image = new File();
            image.url = fileName;
            image.createdAt = dateString;
            image.essenceTable = entity;
            image.essenceId = entityId;
            await this.fileRepository.save(image)

            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', 500)
        }
    }

    async deleteNonUseImages() {
        const currentDate = new Date();
        const pastDate = this.subtractHours(currentDate, 1).toLocaleString();
        /** IsNull() проверяет столбец на null **/
        const namesDeletedImages = await this.fileRepository.find({
            where: {
                essenceTable: IsNull(),
                essenceId: IsNull(),
                createdAt: LessThan(pastDate)
            }
        });

        const deletedImages = await this.fileRepository.delete({
            essenceTable: IsNull(),
            essenceId: IsNull(),
            createdAt: LessThan(pastDate)
        });
        if (!deletedImages.affected) {
            return {"code": HttpStatus.OK, "result": "Nothing to delete", "error": null}
        }
        await this.deleteFromDisk(namesDeletedImages);
        return {"code": HttpStatus.OK, "result": `${deletedImages.affected} images removed`, "error": null}
    }

    async deleteBlockImages(entity: string, id: number){
        const names = await this.fileRepository.find({where: {essenceTable: entity, essenceId: id}});
        const deletedImages = await this.fileRepository.delete({essenceTable: entity, essenceId: id});
        if (deletedImages.affected){
            await this.deleteFromDisk(names);
        }
    }

    private subtractHours(date, hours) {
        date.setHours(date.getHours() - hours);

        return date;
    }

    private async deleteFromDisk(arr){
        for (const file of arr) {
            await fs.unlink(path.resolve(__dirname, '..', 'static', 'img', `${file.url}`), err => {
                if (err) {
                    return err
                }
            })
        }
    }
}
