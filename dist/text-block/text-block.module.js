"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBlockModule = void 0;
const common_1 = require("@nestjs/common");
const text_block_controller_1 = require("./text-block.controller");
const text_block_service_1 = require("./text-block.service");
const typeorm_1 = require("@nestjs/typeorm");
const text_block_entity_1 = require("./text-block.entity");
let TextBlockModule = class TextBlockModule {
};
TextBlockModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([text_block_entity_1.TextBlock])],
        providers: [text_block_service_1.TextBlockService],
        controllers: [text_block_controller_1.TextBlockController],
    })
], TextBlockModule);
exports.TextBlockModule = TextBlockModule;
//# sourceMappingURL=text-block.module.js.map