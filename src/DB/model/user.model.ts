import { Schema, model, Document } from "mongoose";
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  phone?: string;
  confirmEmail: boolean;
  otp?: string;
  role: "User" | "Admin";
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
    role: { type: String, enum: ["User", "Admin"], default: "User" },
  },
  { timestamps: true },
);

const User = model<IUser>("User", userSchema);
export default User;
