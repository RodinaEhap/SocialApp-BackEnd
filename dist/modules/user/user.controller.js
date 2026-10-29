"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = __importDefault(require("./user.service"));
class UserController {
    getProfile = async (req, res) => {
        try {
            const userId = req.user?.userId || req.userId;
            const result = await user_service_1.default.getProfile(userId);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    updateProfile = async (req, res) => {
        try {
            const userId = req.user?.userId || req.userId;
            const result = await user_service_1.default.updateProfile(userId, req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    changePassword = async (req, res) => {
        try {
            const userId = req.user?.userId || req.userId;
            const result = await user_service_1.default.changePassword(userId, req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    toggleFollow = async (req, res) => {
        try {
            const currentUserId = req.user?.userId || req.userId;
            const { targetUserId } = req.params;
            const result = await user_service_1.default.toggleFollow(currentUserId, targetUserId);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    searchUsers = async (req, res) => {
        try {
            const { keyword } = req.query;
            const result = await user_service_1.default.searchUsers(keyword || "");
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    getSuggestions = async (req, res) => {
        try {
            const currentUserId = req.user?.userId || req.userId;
            const result = await user_service_1.default.getSuggestions(currentUserId);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    toggleAccountPrivacy = async (req, res) => {
        try {
            const userId = req.user?.userId || req.userId;
            const result = await user_service_1.default.toggleAccountPrivacy(userId);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
}
exports.UserController = UserController;
exports.default = new UserController();
