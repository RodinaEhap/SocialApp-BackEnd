import { Router } from "express";
import userController from "./user.controller";
import { authMiddleware } from "../../middleware/authentication.middleware";

const router = Router();
router.get("/profile", authMiddleware, userController.getProfile);
router.patch("/update-profile", authMiddleware, userController.updateProfile);
router.patch("/change-password", authMiddleware, userController.changePassword);
router.patch(
  "/follow/:targetUserId",
  authMiddleware,
  userController.toggleFollow,
);
router.get("/search", authMiddleware, userController.searchUsers);
router.get("/suggestions", authMiddleware, userController.getSuggestions);
router.patch("/privacy", authMiddleware, userController.toggleAccountPrivacy);
export default router;
