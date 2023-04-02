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
exports.Film = void 0;
const typeorm_1 = require("typeorm");
const file_entity_1 = require("../file/file.entity");
let Film = class Film {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Film.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Film.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Check)('"year" > 1895 AND year <= extract(year from NOW()) + 6'),
    __metadata("design:type", Number)
], Film.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Film.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => file_entity_1.File),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Film.prototype, "screenshots", void 0);
Film = __decorate([
    (0, typeorm_1.Entity)()
], Film);
exports.Film = Film;
//# sourceMappingURL=film.entity.js.map