"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const comment_model_1 = require("../../DB/model/comment.model");
const notification_model_1 = require("../../DB/model/notification.model");
const post_model_1 = require("../../DB/model/post.model");
class CommentService {
    createComment = async (userId, postId, content) => {
        const post = await post_model_1.Post.findById(postId);
        if (!post)
            throw new Error("Post not found!");
        if (post.createdBy.toString() !== userId) {
            await notification_model_1.Notification.create({
                recipient_id: post.createdBy,
                sender_id: userId,
                type: "comment",
                target_id: postId,
            });
        }
        const comment = await comment_model_1.Comment.create({
            content,
            postId,
            createdBy: userId,
        });
        return { message: "Comment added successfully", comment };
    };
    ;
    getPostComments = async (postId) => {
        const comments = await comment_model_1.Comment.find({ postId })
            .populate("createdBy", "username email profilePicture")
            .sort({ createdAt: -1 });
        return { message: "Success", comments };
    };
    getSingleComment = async (commentId) => {
        const comment = await comment_model_1.Comment.findById(commentId).populate("createdBy", "username email profilePicture");
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
