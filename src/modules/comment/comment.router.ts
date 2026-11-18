import { Router } from "express";
import commentController from "./comment.controller";
import { authMiddleware } from "../../middleware";
const router = Router({ mergeParams: true }); 
router.post(
  "/:postId/comments",
  authMiddleware,
  commentController.createComment,
);
router.get(
  "/:postId/comments",
  authMiddleware,
  commentController.getPostComments,
);
router.get("/:commentId", authMiddleware, commentController.getSingleComment);
router.patch("/:commentId", authMiddleware, commentController.updateComment);
router.delete("/:commentId", authMiddleware, commentController.deleteComment);
export default router;
