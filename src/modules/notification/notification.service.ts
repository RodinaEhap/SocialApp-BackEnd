import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getMessaging, type Message } from "firebase-admin/messaging";
import User from "../../DB/model/user.model";
import Notification from "../../DB/model/notification.model";
const initFirebase = () => {
  if (getApps().length > 0) return true;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const values = [projectId, clientEmail, privateKey];
  const hasPlaceholder = values.some((value) =>
    value?.includes("your_") || value?.includes("-----BEGIN PRIVATE KEY-----\n...")
  );
  if (
    !projectId ||
    !clientEmail ||
    !privateKey ||
    hasPlaceholder
  ) {
    console.warn(
      "Firebase credentials missing in .env! Push notifications disabled.",
    );
    return false;
  }
  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
  return true;
};
export class NotificationService {
  async saveFcmToken(userId: string, fcmToken: string) {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { fcmTokens: fcmToken } },
      { returnDocument: "after" },
    );
    if (!user) {
      throw new Error("User not found!!!!!");
    }
    return { message: "FCM Token saved successfully!" };
  }
  async removeFcmToken(userId: string, fcmToken: string) {
    await User.findByIdAndUpdate(userId, {
      $pull: { fcmTokens: fcmToken },
    });
    return { message: "FCM Token removed successfully!" };
  }
  async sendPushNotification(
    userId: string,
    tokens: string[],
    title: string,
    body: string,
    data?: Record<string, string>,
  ) {
    await Notification.create({
      userId,
      title,
      body,
      data: data || {},
    });
    if (!tokens || tokens.length === 0) return null;
    if (!initFirebase()) return null;
    const messages: Message[] = tokens.map((token) => ({
      token,
      notification: { title, body },
      data: data || {},
    }));

    try {
      const response = await getMessaging().sendEach(messages);
      if (response.failureCount > 0) {
        const invalidTokens: string[] = [];
        response.responses.forEach((res, idx) => {
          if (
            !res.success &&
            (res.error?.code ===
              "messaging/registration-token-not-registered" ||
              res.error?.code === "messaging/invalid-registration-token")
          ) {
            invalidTokens.push(tokens[idx]!);
          }
        });
        if (invalidTokens.length > 0) {
          await User.findByIdAndUpdate(
            userId,
            { $pull: { fcmTokens: { $in: invalidTokens } } },
          );
        }
      }
      return response;
    } catch (error) {
      console.error("Error sending notification!!!!!", error);
      return null;
    }
  }
  async getUserNotifications(userId: string) {
    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });
    return notifications;
  }
  async markAsRead(notificationId: string, userId: string) {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { returnDocument: "after" },
    );
    if (!notification) {
      throw new Error("Notification not found!!!!!");
    }
    return notification;
  }
  async markAllAsRead(userId: string) {
    await Notification.updateMany({ userId, isRead: false }, { isRead: true });
    return { message: "All notifications marked as read!" };
  }
}
export default new NotificationService();
