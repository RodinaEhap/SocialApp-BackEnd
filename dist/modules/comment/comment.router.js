"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = __importDefault(require("./comment.controller"));
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)({ mergeParams: true });
router.post("/:postId/comments", middleware_1.authMiddleware, comment_controller_1.default.createComment);
router.get("/:postId/comments", middleware_1.authMiddleware, comment_controller_1.default.getPostComments);
router.get("/:commentId", middleware_1.authMiddleware, comment_controller_1.default.getSingleComment);
router.patch("/:commentId", middleware_1.authMiddleware, comment_controller_1.default.updateComment);
router.delete("/:commentId", middleware_1.authMiddleware, comment_controller_1.default.deleteComment);
exports.default = router;
