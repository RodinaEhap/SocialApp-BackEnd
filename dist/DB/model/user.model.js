"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
