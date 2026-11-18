import { Schema, model, Document, Types } from "mongoose";
export interface INotification extends Document {
  recipient_id: Types.ObjectId;
  sender_id: Types.ObjectId;
  type: string;
  target_id: Types.ObjectId;
  is_read: boolean;
}
const notificationSchema = new Schema<INotification>(
  {
    recipient_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sender_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    target_id: { type: Schema.Types.ObjectId, required: true },
    is_read: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } },
);
export const Notification = model<INotification>(
  "Notification",
  notificationSchema,
);
