"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNonUseImages = exports.createFile = exports.fileNonUseStub = exports.fileStub = void 0;
const common_1 = require("@nestjs/common");
const fileStub = () => {
    return {
        id: 1,
        url: "1d7167c4-31d9-4d18-b433-4b35506704e1.jpg",
        createdAt: '02.04.2023, 15:23:03',
        essenceId: 1,
        essenceTable: 'entity',
    };
};
exports.fileStub = fileStub;
const fileNonUseStub = () => {
    return {
        id: 1,
        url: "21d7167c4-31d9-4d18-b433-4b35506704e1.jpg",
        createdAt: '02.04.2023, 15:23:03',
        essenceId: null,
        essenceTable: null,
    };
};
exports.fileNonUseStub = fileNonUseStub;
const createFile = () => {
    return (0, exports.fileStub)().url;
};
exports.createFile = createFile;
const deleteNonUseImages = () => {
    return { "code": common_1.HttpStatus.OK, "result": `1 images removed`, "error": null };
};
exports.deleteNonUseImages = deleteNonUseImages;
//# sourceMappingURL=file.stub.js.map