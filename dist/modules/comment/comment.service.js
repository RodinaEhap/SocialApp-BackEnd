"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const comment_model_1 = require("../../DB/model/comment.model");
const post_model_1 = require("../../DB/model/post.model");
const user_model_1 = __importDefault(require("../../DB/model/user.model"));
const notification_service_1 = __importDefault(require("../notification/notification.service"));
class CommentService {
    createComment = async (userId, postId, content) => {
        const post = await post_model_1.Post.findById(postId);
        if (!post)
            throw new Error("Post not found!");
        const comment = await comment_model_1.Comment.create({
            content,
            postId,
            createdBy: userId,
        });
        if (post.createdBy.toString() !== userId) {
            const commenter = await user_model_1.default.findById(userId);
            const postOwner = await user_model_1.default.findById(post.createdBy);
            await notification_service_1.default.sendPushNotification(post.createdBy.toString(), postOwner?.fcmTokens || [], "New Comment!", `${commenter?.username || "Someone"} commented on your post`, { type: "comment", postId: postId.toString() });
        }
        return { message: "Comment added successfully", comment };
    };
    getPostComments = async (postId) => {
        const comments = await comment_model_1.Comment.find({ postId })
            .populate("createdBy", "username email profileImage")
            .sort({ createdAt: -1 });
        return { message: "Success", comments };
    };
    getSingleComment = async (commentId) => {
        const comment = await comment_model_1.Comment.findById(commentId).populate("createdBy", "username email profileImage");
        if (!comment)
            throw new Error("Comment not found!");
        return { message: "Success", comment };
    };
    updateComment = async (userId, commentId, content) => {
        const comment = await comment_model_1.Comment.findById(commentId);
        if (!comment)
            throw new Error("Comment not found!");
        if (comment.createdBy.toString() !== userId) {
            throw new Error("Unauthorized! You can only update your own comment.");
        }
        comment.content = content;
        await comment.save();
        return { message: "Comment updated successfully", comment };
    };
    deleteComment = async (userId, commentId) => {
        const comment = await comment_model_1.Comment.findById(commentId);
        if (!comment)
            throw new Error("Comment not found!");
        const post = await post_model_1.Post.findById(comment.postId);
        const isCommentOwner = comment.createdBy.toString() === userId;
        const isPostOwner = post && post.createdBy.toString() === userId;
        if (!isCommentOwner && !isPostOwner) {
            throw new Error("Unauthorized! You cannot delete this comment.");
        }
        await comment_model_1.Comment.findByIdAndDelete(commentId);
        return { message: "Comment deleted successfully" };
    };
}
exports.CommentService = CommentService;
exports.default = new CommentService();
