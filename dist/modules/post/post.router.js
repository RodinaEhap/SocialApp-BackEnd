"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("./post.controller"));
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.post("/", middleware_1.authMiddleware, middleware_1.uploadCloud.single("image"), post_controller_1.default.createPost);
router.get("/", middleware_1.authMiddleware, post_controller_1.default.getAllPosts);
router.get("/feed", middleware_1.authMiddleware, post_controller_1.default.getFeedPosts);
router.get("/:postId", middleware_1.authMiddleware, post_controller_1.default.getSinglePost);
router.patch("/:postId", middleware_1.authMiddleware, middleware_1.uploadCloud.single("image"), post_controller_1.default.updatePost);
router.patch("/:postId/like", middleware_1.authMiddleware, post_controller_1.default.toggleLikePost);
router.delete("/:postId", middleware_1.authMiddleware, post_controller_1.default.deletePost);
exports.default = router;
