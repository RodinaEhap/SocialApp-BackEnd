import { Schema, model, Document, Types } from "mongoose";
export interface IPost extends Document {
  content: string;
  image?: string;
  createdBy: Types.ObjectId;
  likes: Types.ObjectId[];
}
const postSchema = new Schema<IPost>(
  {
    content: { type: String, required: true, trim: true },
    image: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);
export const Post = model<IPost>("Post", postSchema);
