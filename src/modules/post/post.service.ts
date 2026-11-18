import { Notification } from "../../DB/model/notification.model";
import { Post } from "../../DB/model/post.model";
import User from "../../DB/model/user.model";
export class PostService {
  createPost = async (
    userId: string,
    data: { content: string; image?: string },
  ) => {
    const post = await Post.create({ ...data, createdBy: userId });
    return { message: "Post created successfully", post };
  };

  getAllPosts = async () => {
    const posts = await Post.find()
      .populate("createdBy", "username email profilePicture")
      .sort({ createdAt: -1 });
    return { message: "Success", posts };
  };
  getSinglePost = async (postId: string) => {
    const post = await Post.findById(postId).populate(
      "createdBy",
      "username email profilePicture",
    );
    if (!post) throw new Error("Post not found!");
    return { message: "Success", post };
  };
  updatePost = async (
    userId: string,
    postId: string,
    data: { content?: string },
  ) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found!");
    if (post.createdBy.toString() !== userId) {
      throw new Error("Unauthorized! You can only update your own post.");
    }
  const updatedPost = await Post.findByIdAndUpdate(postId, data, {
    returnDocument: "after",
  });
    return { message: "Post updated successfully", post: updatedPost };
  };
  getFeedPosts = async (userId: string) => {
    const currentUser = await User.findById(userId);
    if (!currentUser) throw new Error("User not found!");
    const followingList = currentUser.following || [];
    const posts = await Post.find({
      createdBy: { $in: [...followingList, userId] },
    })
      .populate("createdBy", "username email profilePicture")
      .sort({ createdAt: -1 });
    return { message: "Success", posts };
  };
  toggleLikePost = async (userId: string, postId: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found!");
    const isLiked = post.likes.includes(userId as any);
    if (isLiked) {
      await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      return { message: "Post unliked successfully" };
    } else {
      await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });
      if (post.createdBy.toString() !== userId) {
        await Notification.create({
          recipient_id: post.createdBy,
          sender_id: userId,
          type: "like",
          target_id: postId,
        });
      }
      return { message: "Post liked successfully" };
    }
  };
  deletePost = async (userId: string, postId: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found!");

    if (post.createdBy.toString() !== userId) {
      throw new Error("Unauthorized! You can only delete your own post.");
    }
    await Post.findByIdAndDelete(postId);
    return { message: "Post deleted successfully" };
  };
}
export default new PostService();
