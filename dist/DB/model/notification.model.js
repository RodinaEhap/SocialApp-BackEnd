"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    recipient_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    sender_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    target_id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    is_read: { type: Boolean, default: false },
}, { timestamps: { createdAt: "created_at", updatedAt: false } });
exports.Notification = (0, mongoose_1.model)("Notification", notificationSchema);
