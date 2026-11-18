import { Response } from "express";
import commentService from "./comment.service";
export class CommentController {
  createComment = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { postId } = req.params;
      const { content } = req.body;
      const result = await commentService.createComment(userId, postId, content);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Something went wrong!" });
    }
  };
  getPostComments = async (req: any, res: Response) => {
    try {
      const { postId } = req.params;
      const result = await commentService.getPostComments(postId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Something went wrong!" });
    }
  };
  getSingleComment = async (req: any, res: Response) => {
    try {
      const result = await commentService.getSingleComment(req.params.commentId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Something went wrong!" });
    }
  };
  updateComment = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { content } = req.body;
      const result = await commentService.updateComment(userId, req.params.commentId, content);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Something went wrong!" });
    }
  };
  deleteComment = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId;
      const result = await commentService.deleteComment(userId, req.params.commentId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Something went wrong!" });
    }
  };
}
export default new CommentController();