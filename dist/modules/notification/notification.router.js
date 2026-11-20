"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = __importDefault(require("./notification.controller"));
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.post("/fcm-token", middleware_1.authMiddleware, notification_controller_1.default.saveFcmToken);
router.delete("/fcm-token", middleware_1.authMiddleware, notification_controller_1.default.removeFcmToken);
router.get("/", middleware_1.authMiddleware, notification_controller_1.default.getUserNotifications);
router.patch("/read-all", middleware_1.authMiddleware, notification_controller_1.default.markAllAsRead);
router.patch("/:id/read", middleware_1.authMiddleware, notification_controller_1.default.markAsRead);
exports.default = router;
