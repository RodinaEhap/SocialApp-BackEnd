"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("../../DB/model/user.model"));
const hash_1 = require("../../common/utlis/hash");
class UserService {
    constructor() { }
    getProfile = async (userId) => {
        const user = await user_model_1.default.findById(userId).select("-password");
        if (!user) {
            throw new Error("User not found!");
        }
        return {
            message: "Success",
            user,
        };
    };
    updateProfile = async (userId, data) => {
        const user = await user_model_1.default.findByIdAndUpdate(userId, data, {
            new: true,
        }).select("-password");
        if (!user) {
            throw new Error("User not found!");
        }
        return {
            message: "Profile updated successfully",
            user,
        };
    };
    changePassword = async (userId, data) => {
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found!");
        }
        const isMatch = await (0, hash_1.comparePassword)(data.oldPassword, user.password);
        if (!isMatch) {
            throw new Error("Incorrect old password!");
        }
        const hashedNewPassword = await (0, hash_1.hashPassword)(data.password);
        user.password = hashedNewPassword;
        await user.save();
        return {
            message: "Password changed successfully",
        };
    };
    toggleFollow = async (currentUserId, targetUserId) => {
        if (currentUserId === targetUserId) {
            throw new Error("You cannot follow yourself!");
        }
        const targetUser = await user_model_1.default.findById(targetUserId);
        if (!targetUser) {
            throw new Error("Target user not found!");
        }
        const currentUser = await user_model_1.default.findById(currentUserId);
        const isFollowing = currentUser?.following.includes(targetUserId);
        if (isFollowing) {
            await user_model_1.default.findByIdAndUpdate(currentUserId, {
                $pull: { following: targetUserId },
            });
            await user_model_1.default.findByIdAndUpdate(targetUserId, {
                $pull: { followers: currentUserId },
            });
            return { message: "Unfollowed successfully" };
        }
        else {
            await user_model_1.default.findByIdAndUpdate(currentUserId, {
                $push: { following: targetUserId },
            });
            await user_model_1.default.findByIdAndUpdate(targetUserId, {
                $push: { followers: currentUserId },
            });
            return { message: "Followed successfully" };
        }
    };
    searchUsers = async (keyword) => {
        const users = await user_model_1.default.find({
            username: { $regex: keyword, $options: "i" },
        }).select("username email profilePicture");
        return {
            message: "Success",
            results: users,
        };
    };
    getSuggestions = async (currentUserId) => {
        const currentUser = await user_model_1.default.findById(currentUserId);
        if (!currentUser) {
            throw new Error("User not found!");
        }
        const followingList = currentUser.following || [];
        const suggestions = await user_model_1.default.find({
            _id: { $nin: [...followingList, currentUserId] },
        })
            .select("username email profilePicture")
            .limit(5);
        return {
            message: "Success",
            suggestions,
        };
    };
    toggleAccountPrivacy = async (userId) => {
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found!");
        }
        user.isPrivate = !user.isPrivate;
        await user.save();
        return {
            message: `Account privacy updated successfully. Profile is now ${user.isPrivate ? "Private" : "Public"}`,
            isPrivate: user.isPrivate,
        };
    };
}
exports.UserService = UserService;
exports.default = new UserService();
