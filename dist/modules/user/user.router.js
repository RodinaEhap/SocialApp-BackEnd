"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const authentication_middleware_1 = require("../../middleware/authentication.middleware");
const router = (0, express_1.Router)();
router.get("/profile", authentication_middleware_1.authMiddleware, user_controller_1.default.getProfile);
router.patch("/update-profile", authentication_middleware_1.authMiddleware, user_controller_1.default.updateProfile);
router.patch("/change-password", authentication_middleware_1.authMiddleware, user_controller_1.default.changePassword);
router.patch("/follow/:targetUserId", authentication_middleware_1.authMiddleware, user_controller_1.default.toggleFollow);
router.get("/search", authentication_middleware_1.authMiddleware, user_controller_1.default.searchUsers);
router.get("/suggestions", authentication_middleware_1.authMiddleware, user_controller_1.default.getSuggestions);
router.patch("/privacy", authentication_middleware_1.authMiddleware, user_controller_1.default.toggleAccountPrivacy);
exports.default = router;
