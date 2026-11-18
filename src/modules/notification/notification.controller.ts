import { Response } from "express";
import notificationService from "./notification.service";
export class NotificationController {
  getUserNotifications = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId;
      const result = await notificationService.getUserNotifications(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
}
export default new NotificationController();
