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
exports.TextBlockController = void 0;
const common_1 = require("@nestjs/common");
const text_block_service_1 = require("./text-block.service");
let TextBlockController = class TextBlockController {
    constructor(textBlockService) {
        this.textBlockService = textBlockService;
    }
    getAll(group) {
        return this.textBlockService.findAll(group);
    }
    getOne(id) {
        return this.textBlockService.findOne(+id);
    }
};
__decorate([
    (0, common_1.Get)('/group/:group'),
    __param(0, (0, common_1.Param)('group')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TextBlockController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TextBlockController.prototype, "getOne", null);
TextBlockController = __decorate([
    (0, common_1.Controller)('text-blocks'),
    __metadata("design:paramtypes", [text_block_service_1.TextBlockService])
], TextBlockController);
exports.TextBlockController = TextBlockController;
//# sourceMappingURL=text-block.controller.js.map