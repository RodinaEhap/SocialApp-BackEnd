import { Comment } from "../../DB/model/comment.model";
import { Notification } from "../../DB/model/notification.model";
import { Post } from "../../DB/model/post.model";
export class CommentService {
  createComment = async (userId: string, postId: string, content: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found!");
     if (post.createdBy.toString() !== userId) {
       await Notification.create({
         recipient_id: post.createdBy,
         sender_id: userId,
         type: "comment",
         target_id: postId,
       });
     }
    const comment = await Comment.create({
      content,
      postId,
      createdBy: userId,
    });
    return { message: "Comment added successfully", comment };
  };;
  getPostComments = async (postId: string) => {
    const comments = await Comment.find({ postId })
      .populate("createdBy", "username email profilePicture")
      .sort({ createdAt: -1 });
    return { message: "Success", comments };
  };
  getSingleComment = async (commentId: string) => {
    const comment = await Comment.findById(commentId).populate(
      "createdBy",
      "username email profilePicture",
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
