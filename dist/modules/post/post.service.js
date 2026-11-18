"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const notification_model_1 = require("../../DB/model/notification.model");
const post_model_1 = require("../../DB/model/post.model");
const user_model_1 = __importDefault(require("../../DB/model/user.model"));
class PostService {
    createPost = async (userId, data) => {
        const post = await post_model_1.Post.create({ ...data, createdBy: userId });
        return { message: "Post created successfully", post };
    };
    getAllPosts = async () => {
        const posts = await post_model_1.Post.find()
            .populate("createdBy", "username email profilePicture")
            .sort({ createdAt: -1 });
        return { message: "Success", posts };
    };
    getSinglePost = async (postId) => {
        const post = await post_model_1.Post.findById(postId).populate("createdBy", "username email profilePicture");
        if (!post)
            throw new Error("Post not found!");
        return { message: "Success", post };
    };
    updatePost = async (userId, postId, data) => {
        const post = await post_model_1.Post.findById(postId);
        if (!post)
            throw new Error("Post not found!");
        if (post.createdBy.toString() !== userId) {
            throw new Error("Unauthorized! You can only update your own post.");
        }
        const updatedPost = await post_model_1.Post.findByIdAndUpdate(postId, data, {
            returnDocument: "after",
        });
        return { message: "Post updated successfully", post: updatedPost };
    };
    getFeedPosts = async (userId) => {
        const currentUser = await user_model_1.default.findById(userId);
        if (!currentUser)
            throw new Error("User not found!");
        const followingList = currentUser.following || [];
        const posts = await post_model_1.Post.find({
            createdBy: { $in: [...followingList, userId] },
        })
            .populate("createdBy", "username email profilePicture")
            .sort({ createdAt: -1 });
        return { message: "Success", posts };
    };
    toggleLikePost = async (userId, postId) => {
        const post = await post_model_1.Post.findById(postId);
        if (!post)
            throw new Error("Post not found!");
        const isLiked = post.likes.includes(userId);
        if (isLiked) {
            await post_model_1.Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
            return { message: "Post unliked successfully" };
        }
        else {
            await post_model_1.Post.findByIdAndUpdate(postId, { $push: { likes: userId } });
            if (post.createdBy.toString() !== userId) {
                await notification_model_1.Notification.create({
                    recipient_id: post.createdBy,
                    sender_id: userId,
                    type: "like",
                    target_id: postId,
                });
            }
            return { message: "Post liked successfully" };
        }
    };
    deletePost = async (userId, postId) => {
        const post = await post_model_1.Post.findById(postId);
        if (!post)
            throw new Error("Post not found!");
        if (post.createdBy.toString() !== userId) {
            throw new Error("Unauthorized! You can only delete your own post.");
        }
        await post_model_1.Post.findByIdAndDelete(postId);
        return { message: "Post deleted successfully" };
    };
}
exports.PostService = PostService;
exports.default = new PostService();
