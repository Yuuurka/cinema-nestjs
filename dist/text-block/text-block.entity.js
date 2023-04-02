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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBlock = void 0;
const typeorm_1 = require("typeorm");
const file_entity_1 = require("../file/file.entity");
let TextBlock = class TextBlock {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TextBlock.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], TextBlock.prototype, "uniqueName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TextBlock.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => file_entity_1.File),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], TextBlock.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TextBlock.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TextBlock.prototype, "group", void 0);
TextBlock = __decorate([
    (0, typeorm_1.Entity)()
], TextBlock);
exports.TextBlock = TextBlock;
//# sourceMappingURL=text-block.entity.js.map