"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const user_model_1 = __importDefault(require("../../DB/model/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hash_1 = require("../../common/utlis/hash");
const google_auth_library_1 = require("google-auth-library");
const notification_service_1 = __importDefault(require("../notification/notification.service"));
const environment_1 = require("../../common/utlis/environment");
const send_email_1 = require("../../common/utlis/send-email");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
class AuthenticationService {
    constructor() { }
    resendConfirmEmail = async (data) => {
        const user = await user_model_1.default.findOne({ email: data.email });
        if (!user) {
            throw new Error("User not found!");
        }
        if (user.confirmEmail) {
            throw new Error("Email already confirmed!");
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpireTime = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();
        await (0, send_email_1.sendEmail)({
            to: data.email,
            subject: "Confirm your SocialApp account",
            html: `<h2>SocialApp Email Confirmation</h2><p>Your new OTP code is: <strong>${otp}</strong></p>`,
        });
        return { message: "Confirmation OTP sent successfully" };
    };
    signup = async (data) => {
        console.log("FULL DATA RECEIVED IN SERVICE:", data);
        const username = data.username || data.email?.split("@")[0] || "User";
        const existingUser = await user_model_1.default.findOne({ email: data.email });
        if (existingUser) {
            throw new Error("Email already exists!");
        }
        const hashedPassword = await (0, hash_1.hashPassword)(data.password);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const newUser = (await user_model_1.default.create({
            username: username,
            email: data.email,
            password: hashedPassword,
            phone: String(data.phone),
            otp,
            confirmEmail: false,
        }));
        await (0, send_email_1.sendEmail)({
            to: data.email,
            subject: "Confirm your SocialApp account",
            html: `<h2>SocialApp Email Confirmation</h2><p>Your OTP code is: <strong>${otp}</strong></p>`,
        });
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
        const accessToken = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, (0, environment_1.getRequiredEnv)("TOKEN_SIGNIN_SECRET_KEY"), { expiresIn: "1d" });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, (0, environment_1.getRequiredEnv)("REFRESH_TOKEN_SECRET_KEY"), { expiresIn: "7d" });
        return { message: "Logged in successfully", accessToken, refreshToken };
    };
    refreshToken = async (token) => {
        if (!token) {
            throw new Error("Refresh token is required!");
        }
        const secretKey = (0, environment_1.getRequiredEnv)("REFRESH_TOKEN_SECRET_KEY");
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        const accessToken = jsonwebtoken_1.default.sign({ userId: decoded.userId, role: decoded.role }, (0, environment_1.getRequiredEnv)("TOKEN_SIGNIN_SECRET_KEY"), { expiresIn: "1d" });
        return { message: "Token refreshed successfully!", accessToken };
    };
    forgotPassword = async (data) => {
        const { email } = data;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw new Error("User not found!");
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpireTime = new Date(Date.now() + 10 * 60 * 1000);
        user.otp = otp;
        user.otpExpireTime = otpExpireTime;
        await user.save();
        await (0, send_email_1.sendEmail)({
            to: email,
            subject: "Reset your SocialApp password",
            html: `<h2>SocialApp Password Reset</h2><p>Your OTP code is: <strong>${otp}</strong></p><p>This code expires in 10 minutes.</p>`,
        });
        return {
            message: "OTP sent to your email successfully. Please check it to reset password.",
        };
    };
    resetPassword = async (data) => {
        const { email, otp, password } = data;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw new Error("User not found!");
        }
        if (!user.otp || user.otp !== otp) {
            throw new Error("Invalid OTP Code!");
        }
        if (user.otpExpireTime && new Date() > user.otpExpireTime) {
            throw new Error("OTP has expired!");
        }
        const hashedPassword = await (0, hash_1.hashPassword)(password);
        await user_model_1.default.findOneAndUpdate({ email }, {
            password: hashedPassword,
            $unset: { otp: "", otpExpireTime: "" },
        });
        return { message: "Password reset successfully" };
    };
    googleLogin = async (data) => {
        const { idToken } = data;
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            throw new Error("Invalid Google Token!");
        }
        const { email, name, picture } = payload;
        let user = await user_model_1.default.findOne({ email });
        if (!user) {
            const generatedUsername = name || email.split("@")[0] || "User";
            user = await user_model_1.default.create({
                username: generatedUsername,
                email,
                password: Math.random().toString(36).slice(-8),
                confirmEmail: true,
                phone: "00000000000",
            });
        }
        const accessToken = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, (0, environment_1.getRequiredEnv)("TOKEN_SIGNIN_SECRET_KEY"), { expiresIn: "1d" });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, (0, environment_1.getRequiredEnv)("REFRESH_TOKEN_SECRET_KEY"), { expiresIn: "7d" });
        return { message: "Google login successful", accessToken, refreshToken };
    };
    logout = async (userId, fcmToken) => {
        await user_model_1.default.findByIdAndUpdate(userId, {
            changeCredentialsTime: new Date(),
        });
        if (fcmToken) {
            await notification_service_1.default.removeFcmToken(userId, fcmToken);
        }
        return { message: "Logged out successfully!" };
    };
}
exports.AuthenticationService = AuthenticationService;
exports.default = new AuthenticationService();
