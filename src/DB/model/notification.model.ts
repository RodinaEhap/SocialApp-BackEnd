import { Schema, model, Document, Types } from "mongoose";
export interface INotification extends Document {
  userId: Types.ObjectId;
  title: string;
  body: string;
  data?: Record<string, string>;
  isRead: boolean;
}
const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    data: { type: Map, of: String },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const Notification = model<INotification>("Notification", notificationSchema);
export default Notification;
