import { Response } from "express";
import postService from "./post.service";
export class PostController {
  createPost = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId;
      const result = await postService.createPost(userId, req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  getAllPosts = async (req: any, res: Response) => {
    try {
      const result = await postService.getAllPosts();
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  getSinglePost = async (req: any, res: Response) => {
    try {
      const result = await postService.getSinglePost(req.params.postId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  updatePost = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId;
      const result = await postService.updatePost(
        userId,
        req.params.postId,
        req.body,
      );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  getFeedPosts = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId;
      const result = await postService.getFeedPosts(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };

  toggleLikePost = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { postId } = req.params;
      const result = await postService.toggleLikePost(userId, postId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  deletePost = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId;
      const result = await postService.deletePost(userId, req.params.postId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
}
export default new PostController();
