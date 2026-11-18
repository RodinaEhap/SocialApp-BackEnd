import { Router } from "express";
import notificationController from "./notification.controller";
import { authMiddleware } from "../../middleware";
const router = Router();
router.get("/", authMiddleware, notificationController.getUserNotifications);
export default router;
