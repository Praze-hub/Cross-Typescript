"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const userService_1 = require("../services/userService");
const getUsers = (req, res) => {
    const users = (0, userService_1.getAllUsers)();
    res.json(users);
};
exports.getUsers = getUsers;
//# sourceMappingURL=userController.js.map