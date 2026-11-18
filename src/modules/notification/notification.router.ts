import { Router } from "express";
import notificationController from "./notification.controller";
import { authMiddleware } from "../../middleware";
const router = Router();
router.post("/fcm-token", authMiddleware, notificationController.saveFcmToken);
router.get("/", authMiddleware, notificationController.getUserNotifications);
router.patch("/:id/read", authMiddleware, notificationController.markAsRead);
export default router;
