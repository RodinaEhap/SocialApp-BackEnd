"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDisk = exports.uploadCloud = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") ||
        file.mimetype.startsWith("video/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file type! Only images and videos are allowed!!!!!"), false);
    }
};
exports.uploadCloud = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 },
});
exports.uploadDisk = (0, multer_1.default)({
    storage,
    fileFilter,
});
