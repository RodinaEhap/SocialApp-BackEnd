"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    content: { type: String, required: true, trim: true },
    image: { type: String },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
postSchema.pre(/^find/, function () {
    this.where({ isDeleted: { $ne: true } });
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
