"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequiredEnv = void 0;
const getRequiredEnv = (name) => {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
};
exports.getRequiredEnv = getRequiredEnv;
