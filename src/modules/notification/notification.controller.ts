import { Request, Response } from "express";
import notificationService from "./notification.service";
export class NotificationController {
  saveFcmToken = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized!!!!!" });
      }
      const { fcmToken } = req.body;
      if (!fcmToken) {
        return res.status(400).json({ message: "FCM Token is required!!!!!" });
      }
      const result = await notificationService.saveFcmToken(userId, fcmToken);
      return res.status(200).json({ message: "Success", result });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  getUserNotifications = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized!!!!!" });
      }
      const result = await notificationService.getUserNotifications(userId);
      return res.status(200).json({ message: "Success", result });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  markAsRead = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized!!!!!" });
      }
      const { id } = req.params;
      const result = await notificationService.markAsRead(id as string, userId);
      return res.status(200).json({ message: "Success", result });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
}
export default new NotificationController();
