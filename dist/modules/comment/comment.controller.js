"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comment_service_1 = __importDefault(require("./comment.service"));
class CommentController {
    createComment = async (req, res) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized!!!!!" });
            }
            const { postId } = req.params;
            const { content } = req.body;
            const result = await comment_service_1.default.createComment(userId, postId, content);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({ message: error.message || "Something went wrong!" });
        }
    };
    getPostComments = async (req, res) => {
        try {
            const { postId } = req.params;
            const result = await comment_service_1.default.getPostComments(postId);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({ message: error.message || "Something went wrong!" });
        }
    };
    getSingleComment = async (req, res) => {
        try {
            const result = await comment_service_1.default.getSingleComment(req.params.commentId);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({ message: error.message || "Something went wrong!" });
        }
    };
    updateComment = async (req, res) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized!!!!!" });
            }
            const { content } = req.body;
            const result = await comment_service_1.default.updateComment(userId, req.params.commentId, content);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({ message: error.message || "Something went wrong!" });
        }
    };
    deleteComment = async (req, res) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized!!!!!" });
            }
            const result = await comment_service_1.default.deleteComment(userId, req.params.commentId);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({ message: error.message || "Something went wrong!" });
        }
    };
}
exports.CommentController = CommentController;
exports.default = new CommentController();
