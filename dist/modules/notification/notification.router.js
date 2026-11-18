"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = __importDefault(require("./notification.controller"));
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.get("/", middleware_1.authMiddleware, notification_controller_1.default.getUserNotifications);
exports.default = router;
