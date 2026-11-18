"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging");
const user_model_1 = __importDefault(require("../../DB/model/user.model"));
const notification_model_1 = __importDefault(require("../../DB/model/notification.model"));
const initFirebase = () => {
    if ((0, app_1.getApps)().length > 0)
        return true;
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!projectId || !clientEmail || !privateKey) {
        console.warn("Firebase credentials missing in .env! Push notifications disabled.");
        return false;
    }
    (0, app_1.initializeApp)({
        credential: (0, app_1.cert)({
            projectId,
            clientEmail,
            privateKey,
        }),
    });
    return true;
};
class NotificationService {
    async saveFcmToken(userId, fcmToken) {
        const user = await user_model_1.default.findByIdAndUpdate(userId, { $addToSet: { fcmTokens: fcmToken } }, { new: true });
        if (!user) {
            throw new Error("User not found!!!!!");
        }
        return { message: "FCM Token saved successfully!" };
    }
    async removeFcmToken(userId, fcmToken) {
        await user_model_1.default.findByIdAndUpdate(userId, {
            $pull: { fcmTokens: fcmToken },
        });
        return { message: "FCM Token removed successfully!" };
    }
    async sendPushNotification(userId, tokens, title, body, data) {
        await notification_model_1.default.create({
            userId,
            title,
            body,
            data: data || {},
        });
        if (!tokens || tokens.length === 0)
            return null;
        if (!initFirebase())
            return null;
        const messages = tokens.map((token) => ({
            token,
            notification: { title, body },
            data: data || {},
        }));
        try {
            const response = await (0, messaging_1.getMessaging)().sendEach(messages);
            if (response.failureCount > 0) {
                const invalidTokens = [];
                response.responses.forEach((res, idx) => {
                    if (!res.success &&
                        (res.error?.code ===
                            "messaging/registration-token-not-registered" ||
                            res.error?.code === "messaging/invalid-registration-token")) {
                        invalidTokens.push(tokens[idx]);
                    }
                });
                if (invalidTokens.length > 0) {
                    await user_model_1.default.findByIdAndUpdate(userId, {
                        $pull: { fcmTokens: { $in: invalidTokens } },
                    });
                }
            }
            return response;
        }
        catch (error) {
            console.error("Error sending notification!!!!!", error);
            return null;
        }
    }
    async getUserNotifications(userId) {
        const notifications = await notification_model_1.default.find({ userId }).sort({
            createdAt: -1,
        });
        return notifications;
    }
    async markAsRead(notificationId, userId) {
        const notification = await notification_model_1.default.findOneAndUpdate({ _id: notificationId, userId }, { isRead: true }, { new: true });
        if (!notification) {
            throw new Error("Notification not found!!!!!");
        }
        return notification;
    }
    async markAllAsRead(userId) {
        await notification_model_1.default.updateMany({ userId, isRead: false }, { isRead: true });
        return { message: "All notifications marked as read!" };
    }
}
exports.NotificationService = NotificationService;
exports.default = new NotificationService();
