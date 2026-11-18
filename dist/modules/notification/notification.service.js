"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const notification_model_1 = require("../../DB/model/notification.model");
class NotificationService {
    getUserNotifications = async (userId) => {
        const notifications = await notification_model_1.Notification.find({ recipient_id: userId })
            .populate("sender_id", "username email profilePicture")
            .sort({ createdAt: -1 });
        return { message: "Success", notifications };
    };
}
exports.NotificationService = NotificationService;
exports.default = new NotificationService();
