import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  phone?: string;
  confirmEmail: boolean;
  otp?: string;
  otpExpireTime?: Date;
  role: "User" | "Admin";
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  isPrivate: boolean;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: {
      type: String,
      required: true,
    },
    confirmEmail: { type: Boolean, default: false },
    otp: { type: String },
    otpExpireTime: { type: Date },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isPrivate: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const User = model<IUser>("User", userSchema);
export default User;
