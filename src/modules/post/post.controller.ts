import { Request, Response } from "express";
import postService from "./post.service";
export class PostController {
  createPost = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized!!!!!" });
      }
      const result = await postService.createPost(userId, req.body, req.file);
      return res.status(201).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };

  getAllPosts = async (req: Request, res: Response) => {
    try {
      const result = await postService.getAllPosts();
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  getSinglePost = async (req: Request, res: Response) => {
    try {
      const result = await postService.getSinglePost(
        req.params.postId as string,
      );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  updatePost = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized!!!!!" });
      }
      const { postId } = req.params;
      const result = await postService.updatePost(
        userId,
        postId as string,
        req.body,
        req.file,
      );
      return res.status(200).json({ message: "Success", result });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  getFeedPosts = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized!!!!!" });
      }
      const result = await postService.getFeedPosts(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  toggleLikePost = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized!!!!!" });
      }
      const { postId } = req.params;
      const result = await postService.toggleLikePost(userId, postId as string);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  deletePost = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized!!!!!" });
      }
      const result = await postService.deletePost(
        userId,
        req.params.postId as string,
      );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
}
export default new PostController();
