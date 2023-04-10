"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("./file.entity");
const typeorm_2 = require("typeorm");
let FileService = class FileService {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    async createFile(file, entity, entityId) {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static', 'img');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            const dateString = new Date().toLocaleString();
            const image = new file_entity_1.File();
            image.url = fileName;
            image.createdAt = dateString;
            image.essenceTable = entity;
            image.essenceId = entityId;
            await this.fileRepository.save(image);
            return fileName;
        }
        catch (e) {
            throw new common_1.HttpException('Произошла ошибка при записи файла', 500);
        }
    }
    async deleteNonUseImages() {
        const currentDate = new Date();
        const pastDate = this.subtractHours(currentDate, 1).toLocaleString();
        const namesDeletedImages = await this.fileRepository.find({
            where: {
                essenceTable: (0, typeorm_2.IsNull)(),
                essenceId: (0, typeorm_2.IsNull)(),
                createdAt: (0, typeorm_2.LessThan)(pastDate)
            }
        });
        const deletedImages = await this.fileRepository.delete({
            essenceTable: (0, typeorm_2.IsNull)(),
            essenceId: (0, typeorm_2.IsNull)(),
            createdAt: (0, typeorm_2.LessThan)(pastDate)
        });
        if (!deletedImages.affected) {
            return { "code": common_1.HttpStatus.OK, "result": "Nothing to delete", "error": null };
        }
        await this.deleteFromDisk(namesDeletedImages);
        return { "code": common_1.HttpStatus.OK, "result": `${deletedImages.affected} images removed`, "error": null };
    }
    async deleteBlockImages(entity, id) {
        const names = await this.fileRepository.find({ where: { essenceTable: entity, essenceId: id } });
        const deletedImages = await this.fileRepository.delete({ essenceTable: entity, essenceId: id });
        if (deletedImages.affected) {
            await this.deleteFromDisk(names);
        }
    }
    subtractHours(date, hours) {
        date.setHours(date.getHours() - hours);
        return date;
    }
    async deleteFromDisk(arr) {
        for (const file of arr) {
            await fs.unlink(path.resolve(__dirname, '..', 'static', 'img', `${file.url}`), err => {
                if (err) {
                    return err;
                }
            });
        }
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map