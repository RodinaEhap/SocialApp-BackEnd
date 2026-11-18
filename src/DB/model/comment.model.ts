import { Schema, model, Document, Types } from "mongoose";
export interface IComment extends Document {
  content: string;
  postId: Types.ObjectId;
  createdBy: Types.ObjectId;
}
const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true, trim: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);
export const Comment = model<IComment>("Comment", commentSchema);
