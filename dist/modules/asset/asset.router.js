"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asset_controller_1 = __importDefault(require("./asset.controller"));
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.post("/upload", middleware_1.authMiddleware, middleware_1.uploadCloud.single("file"), asset_controller_1.default.uploadSingle);
router.post("/presigned-upload", middleware_1.authMiddleware, asset_controller_1.default.getPresignedUpload);
router.get("/presigned-download", middleware_1.authMiddleware, asset_controller_1.default.getPresignedDownload);
router.delete("/", middleware_1.authMiddleware, asset_controller_1.default.deleteAsset);
exports.default = router;
