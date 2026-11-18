"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../DB/model/user.model"));
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res
                .status(401)
                .json({ message: "Access denied. No token provided!!!!!" });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Access denied. Token missing!!!!!" });
            return;
        }
        const secretKey = process.env.TOKEN_SIGNIN_SECRET_KEY || "access_secret";
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        const user = await user_model_1.default.findById(decoded.userId);
        if (!user) {
            res.status(401).json({ message: "User not found!!!!!" });
            return;
        }
        if (user.changeCredentialsTime &&
            decoded.iat &&
            decoded.iat * 1000 < user.changeCredentialsTime.getTime()) {
            res
                .status(401)
                .json({
                message: "Token expired due to logout! Please login again!!!!!",
            });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token!!!!", error });
    }
};
exports.authMiddleware = authMiddleware;
