import { Request, Response } from "express";
import commentService from "./comment.service";
export class CommentController {
  createComment = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized!!!!!" });
      }
      const { postId } = req.params;
      const { content } = req.body;
      const result = await commentService.createComment(
        userId,
        postId as string,
        content,
      );
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Something went wrong!" });
    }
  };
  getPostComments = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const result = await commentService.getPostComments(postId as string);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Something went wrong!" });
    }
  };
  getSingleComment = async (req: Request, res: Response) => {
    try {
      const result = await commentService.getSingleComment(
        req.params.commentId as string,
      );
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Something went wrong!" });
    }
  };
  updateComment = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized!!!!!" });
      }
      const { content } = req.body;
      const result = await commentService.updateComment(
        userId,
        req.params.commentId as string,
        content,
      );
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Something went wrong!" });
    }
  };
  deleteComment = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized!!!!!" });
      }
      const result = await commentService.deleteComment(
        userId,
        req.params.commentId as string,
      );
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Something went wrong!" });
    }
  };
}
export default new CommentController();