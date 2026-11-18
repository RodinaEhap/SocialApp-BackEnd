"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_service_1 = __importDefault(require("./notification.service"));
class NotificationController {
    saveFcmToken = async (req, res) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized!!!!!" });
            }
            const { fcmToken } = req.body;
            if (!fcmToken) {
                return res.status(400).json({ message: "FCM Token is required!!!!!" });
            }
            const result = await notification_service_1.default.saveFcmToken(userId, fcmToken);
            return res.status(200).json({ message: "Success", result });
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    getUserNotifications = async (req, res) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized!!!!!" });
            }
            const result = await notification_service_1.default.getUserNotifications(userId);
            return res.status(200).json({ message: "Success", result });
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    markAsRead = async (req, res) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized!!!!!" });
            }
            const { id } = req.params;
            const result = await notification_service_1.default.markAsRead(id, userId);
            return res.status(200).json({ message: "Success", result });
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
}
exports.NotificationController = NotificationController;
exports.default = new NotificationController();
