import { Router } from "express";
import postController from "./post.controller";import { authMiddleware, uploadCloud } from "../../middleware";
const router = Router();
router.post(
  "/",
  authMiddleware,
  uploadCloud.single("image"),
  postController.createPost,
);
router.get("/", authMiddleware, postController.getAllPosts);
router.get("/feed", authMiddleware, postController.getFeedPosts);
router.get("/:postId", authMiddleware, postController.getSinglePost);
router.patch(
  "/:postId",
  authMiddleware,
  uploadCloud.single("image"),
  postController.updatePost,
);
router.patch("/:postId/like", authMiddleware, postController.toggleLikePost);
router.delete("/:postId", authMiddleware, postController.deletePost);
export default router;
