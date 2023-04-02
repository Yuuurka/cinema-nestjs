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
exports.TextBlockService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const text_block_entity_1 = require("./text-block.entity");
const file_entity_1 = require("../file/file.entity");
const file_service_1 = require("../file/file.service");
const constants_1 = require("../constants");
let TextBlockService = class TextBlockService {
    constructor(conn, blockRepository, fileRepository, fileService) {
        this.conn = conn;
        this.blockRepository = blockRepository;
        this.fileRepository = fileRepository;
        this.fileService = fileService;
    }
    async findAll(group) {
        if (group !== 'all') {
            return (await this.conn.query(`SELECT text_block.id, text_block."uniqueName", text_block.name, text_block.text, 
                                         text_block.group, file.url FROM text_block LEFT JOIN file ON file."essenceId" = text_block.id
                                         WHERE text_block.group = $1 AND file."essenceTable"=$2`, [group, "text-block"])).rows;
        }
        return (await this.conn.query(`SELECT text_block.id, text_block."uniqueName", text_block.name, text_block.text, 
                                         text_block.group, file.url FROM text_block LEFT JOIN file ON file."essenceId" = text_block.id
                                         WHERE file."essenceTable"=$1`, ["text-block"])).rows;
    }
    async findOne(id) {
        return (await this.conn.query(`SELECT text_block.id, text_block."uniqueName", text_block.name, text_block.text, 
                                         text_block.group, file.url FROM text_block LEFT JOIN file ON file."essenceId" = text_block.id
                                         WHERE text_block.id=$1`, [id])).rows;
    }
    async createTextBlock(createTextBlockDto, images) {
        const block = new text_block_entity_1.TextBlock();
        block.uniqueName = createTextBlockDto.uniqueName;
        block.name = createTextBlockDto.name;
        block.text = createTextBlockDto.text;
        block.group = createTextBlockDto.group;
        const savedBlock = await this.blockRepository.save(block);
        const blockId = await this.blockRepository.getId(savedBlock);
        await this.uploadFiles(images, "text-block", blockId);
        return savedBlock;
    }
    async updateTextBlock(post, images) {
        console.log(post);
        await this.blockRepository.update(post.id, post);
        const updatedBlock = await this.blockRepository.findOne({ where: { id: post.id } });
        if (images) {
            await this.uploadFiles(images, "text-block", post.id);
        }
        if (updatedBlock) {
            return updatedBlock;
        }
        throw new common_1.HttpException('Block not found', common_1.HttpStatus.NOT_FOUND);
    }
    async deleteTextBlock(id) {
        const deletedBlock = await this.blockRepository.delete(id);
        if (!deletedBlock.affected) {
            throw new common_1.HttpException('Block not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.fileService.deleteBlockImages("text-block", id);
        return { "status": 200, "message": `block id${id} removed`, "error": null };
    }
    async uploadFiles(images, entity, entityId) {
        for (const image of images) {
            await this.fileService.createFile(image, entity, entityId);
        }
    }
};
TextBlockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __param(1, (0, typeorm_1.InjectRepository)(text_block_entity_1.TextBlock)),
    __param(2, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository,
        typeorm_2.Repository,
        file_service_1.FileService])
], TextBlockService);
exports.TextBlockService = TextBlockService;
//# sourceMappingURL=text-block.service.js.map