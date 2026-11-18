import { Schema, model, Types, Query } from "mongoose";
export interface IPost {
  content: string;
  image?: string;
  createdBy: Types.ObjectId;
  likes: Types.ObjectId[];
  isDeleted: boolean;
}
const postSchema = new Schema<IPost>(
  {
    content: { type: String, required: true, trim: true },
    image: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);
postSchema.pre<Query<any, IPost>>(/^find/, function () {
  this.where({ isDeleted: { $ne: true } });
});

export const Post = model<IPost>("Post", postSchema);
