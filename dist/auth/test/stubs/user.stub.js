"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStubREG = exports.userStubLOG = void 0;
const uuid = require("uuid");
const userStubLOG = () => {
    return {
        user_id: null,
        login: "admin@gmail.com",
        password: "qwerty123"
    };
};
exports.userStubLOG = userStubLOG;
const userStubREG = () => {
    return {
        user_id: null,
        login: uuid.v4().substring(0, 29),
        password: "qwerty123"
    };
};
exports.userStubREG = userStubREG;
//# sourceMappingURL=user.stub.js.map