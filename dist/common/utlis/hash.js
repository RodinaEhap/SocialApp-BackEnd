"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (plainText) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");
    return await bcrypt_1.default.hash(plainText, saltRounds);
};
exports.hashPassword = hashPassword;
const comparePassword = async (plainText, hash) => {
    return await bcrypt_1.default.compare(plainText, hash);
};
exports.comparePassword = comparePassword;
