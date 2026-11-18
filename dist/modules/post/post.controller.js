"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const post_service_1 = __importDefault(require("./post.service"));
class PostController {
    createPost = async (req, res) => {
        try {
            const userId = req.user?.userId;
            const result = await post_service_1.default.createPost(userId, req.body);
            return res.status(201).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    getAllPosts = async (req, res) => {
        try {
            const result = await post_service_1.default.getAllPosts();
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    getSinglePost = async (req, res) => {
        try {
            const result = await post_service_1.default.getSinglePost(req.params.postId);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    updatePost = async (req, res) => {
        try {
            const userId = req.user?.userId;
            const result = await post_service_1.default.updatePost(userId, req.params.postId, req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    getFeedPosts = async (req, res) => {
        try {
            const userId = req.user?.userId;
            const result = await post_service_1.default.getFeedPosts(userId);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    toggleLikePost = async (req, res) => {
        try {
            const userId = req.user?.userId;
            const { postId } = req.params;
            const result = await post_service_1.default.toggleLikePost(userId, postId);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    deletePost = async (req, res) => {
        try {
            const userId = req.user?.userId;
            const result = await post_service_1.default.deletePost(userId, req.params.postId);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
}
exports.PostController = PostController;
exports.default = new PostController();
