"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const user_model_1 = __importDefault(require("../../DB/model/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hash_1 = require("../../common/utlis/hash");
class AuthenticationService {
    constructor() { }
    signup = async (data) => {
        console.log("FULL DATA RECEIVED IN SERVICE:", data);
        const username = data.username || data.email?.split("@")[0] || "User";
        const existingUser = await user_model_1.default.findOne({ email: data.email });
        if (existingUser) {
            throw new Error("Email already exists!");
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const newUser = (await user_model_1.default.create({
            username: username,
            email: data.email,
            password: data.password,
            phone: String(data.phone),
            otp,
            confirmEmail: false,
        }));
        console.log("Generated OTP for testing:", otp);
        return {
            message: "User registered successfully. Please check your email/OTP to confirm.",
            userId: newUser._id,
        };
    };
    confirmEmail = async (data) => {
        const { email, otp } = data;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw new Error("User not found!");
        }
        if (user.confirmEmail) {
            throw new Error("Email already confirmed!");
        }
        if (user.otp !== otp) {
            throw new Error("Invalid OTP Code!");
        }
        await user_model_1.default.findOneAndUpdate({ email }, { confirmEmail: true, $unset: { otp: "" } });
        return { message: "Email confirmed successfully" };
    };
    login = async (data) => {
        const user = await user_model_1.default.findOne({ email: data.email });
        if (!user) {
            throw new Error("Invalid email or password!");
        }
        if (!user.confirmEmail) {
            throw new Error("Please confirm your email first!");
        }
        const isMatch = await (0, hash_1.comparePassword)(data.password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password!");
        }
        const accessToken = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.TOKEN_SIGNIN_SECRET_KEY || "access_secret", { expiresIn: "1d" });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET_KEY || "refresh_secret", { expiresIn: "7d" });
        return { message: "Logged in successfully", accessToken, refreshToken };
    };
    refreshToken = async (token) => {
        if (!token) {
            throw new Error("Refresh token is required!");
        }
        const secretKey = process.env.REFRESH_TOKEN_SECRET_KEY || "refresh_secret";
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        const accessToken = jsonwebtoken_1.default.sign({ userId: decoded.userId, role: decoded.role }, process.env.TOKEN_SIGNIN_SECRET_KEY || "access_secret", { expiresIn: "1d" });
        return { message: "Token refreshed successfully!", accessToken };
    };
}
exports.AuthenticationService = AuthenticationService;
exports.default = new AuthenticationService();
