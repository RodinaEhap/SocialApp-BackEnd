import { Notification } from "../../DB/model/notification.model";
export class NotificationService {
  getUserNotifications = async (userId: string) => {
    const notifications = await Notification.find({ recipient_id: userId })
      .populate("sender_id", "username email profilePicture")
      .sort({ createdAt: -1 });

    return { message: "Success", notifications };
  };
}
export default new NotificationService();
