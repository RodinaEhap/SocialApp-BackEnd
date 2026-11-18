"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_service_1 = __importDefault(require("./notification.service"));
class NotificationController {
    getUserNotifications = async (req, res) => {
        try {
            const userId = req.user?.userId;
            const result = await notification_service_1.default.getUserNotifications(userId);
            return res.status(200).json(result);
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
