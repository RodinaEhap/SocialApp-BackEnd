import { Post } from "../../DB/model/post.model";
import User from "../../DB/model/user.model";
import notificationService from "../notification/notification.service";
import s3Service from "../S3/s3.service";
import { Comment } from "../../DB/model/comment.model";
export class PostService {
  createPost = async (
    userId: string,
    data: { content: string; image?: string },
    file?: Express.Multer.File,
  ) => {
    if (file) {
      const uploaded = await s3Service.uploadAsset(file, "posts");
      data.image = uploaded.url;
    }
    const post = await Post.create({ ...data, createdBy: userId });
    return { message: "Post created successfully", post };
  };
  getAllPosts = async () => {
    const posts = await Post.find()
      .populate("createdBy", "username email profileImage")
      .sort({ createdAt: -1 });
    return { message: "Success", posts };
  };
  getSinglePost = async (postId: string) => {
    const post = await Post.findById(postId).populate(
      "createdBy",
      "username email profileImage",
    );
    if (!post) throw new Error("Post not found!");
    return { message: "Success", post };
  };
  updatePost = async (
    userId: string,
    postId: string,
    data: { content?: string; image?: string },
    file?: Express.Multer.File,
  ) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found!");
    if (post.createdBy.toString() !== userId) {
      throw new Error("Unauthorized! You can only update your own post.");
    }
    if (file) {
      const uploaded = await s3Service.uploadAsset(file, "posts");
      data.image = uploaded.url;
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
      .populate("createdBy", "username email profileImage")
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
      await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });
      if (post.createdBy.toString() !== userId) {
        const postOwner = await User.findById(post.createdBy);
        const liker = await User.findById(userId);
        if (postOwner) {
          await notificationService.sendPushNotification(
            postOwner._id.toString(),
            postOwner.fcmTokens || [],
            "New Like!",
            `${liker?.username || "Someone"} liked your post`,
            { type: "like", postId: postId.toString() },
          );
        }
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
    await Post.findByIdAndUpdate(postId, { isDeleted: true });
    await Comment.deleteMany({ postId });
    return { message: "Post deleted successfully" };
  };
}
export default new PostService();
