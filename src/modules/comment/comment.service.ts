import { Comment } from "../../DB/model/comment.model";
import { Post } from "../../DB/model/post.model";
import User from "../../DB/model/user.model";
import notificationService from "../notification/notification.service";
export class CommentService {
  createComment = async (userId: string, postId: string, content: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found!");
    const comment = await Comment.create({
      content,
      postId,
      createdBy: userId,
    });
    if (post.createdBy.toString() !== userId) {
      const commenter = await User.findById(userId);
      const postOwner = await User.findById(post.createdBy);
      await notificationService.sendPushNotification(
        post.createdBy.toString(),
        postOwner?.fcmTokens || [],
        "New Comment!",
        `${commenter?.username || "Someone"} commented on your post`,
        { type: "comment", postId: postId.toString() },
      );
    }
    return { message: "Comment added successfully", comment };
  };
  getPostComments = async (postId: string) => {
    const comments = await Comment.find({ postId })
      .populate("createdBy", "username email profileImage")
      .sort({ createdAt: -1 });
    return { message: "Success", comments };
  };
  getSingleComment = async (commentId: string) => {
    const comment = await Comment.findById(commentId).populate(
      "createdBy",
      "username email profileImage",
    );
    if (!comment) throw new Error("Comment not found!");
    return { message: "Success", comment };
  };
  updateComment = async (
    userId: string,
    commentId: string,
    content: string,
  ) => {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found!");
    if (comment.createdBy.toString() !== userId) {
      throw new Error("Unauthorized! You can only update your own comment.");
    }
    comment.content = content;
    await comment.save();
    return { message: "Comment updated successfully", comment };
  };
  deleteComment = async (userId: string, commentId: string) => {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found!");
    const post = await Post.findById(comment.postId);
    const isCommentOwner = comment.createdBy.toString() === userId;
    const isPostOwner = post && post.createdBy.toString() === userId;
    if (!isCommentOwner && !isPostOwner) {
      throw new Error("Unauthorized! You cannot delete this comment.");
    }
    await Comment.findByIdAndDelete(commentId);
    return { message: "Comment deleted successfully" };
  };
}
export default new CommentService();
