"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("../common/utlis/environment");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect((0, environment_1.getRequiredEnv)("DB_URI"));
        console.log("Database Connected Successfully");
    }
    catch (error) {
        console.error("Database Connection Failed", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
