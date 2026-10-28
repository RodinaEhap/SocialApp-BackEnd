"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const authentication_service_1 = __importDefault(require("./authentication.service"));
class AuthenticationController {
    signup = async (req, res) => {
        try {
            const result = await authentication_service_1.default.signup(req.body);
            return res.status(201).json({ message: "Success", result });
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    confirmEmail = async (req, res) => {
        try {
            const result = await authentication_service_1.default.confirmEmail(req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    login = async (req, res) => {
        try {
            const result = await authentication_service_1.default.login(req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    refreshToken = async (req, res) => {
        try {
            const { refreshToken } = req.body;
            const result = await authentication_service_1.default.refreshToken(refreshToken);
            return res.status(200).json(result);
        }
        catch (error) {
            return res
                .status(401)
                .json({ message: error.message || "Invalid refresh token!" });
        }
    };
}
exports.AuthenticationController = AuthenticationController;
exports.default = new AuthenticationController();
