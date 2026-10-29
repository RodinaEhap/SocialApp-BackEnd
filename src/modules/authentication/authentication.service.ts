import { ISignupDto } from "./dto/authentication.dto";
import User from "../../DB/model/user.model";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../../common/utlis/hash";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthenticationService {
  constructor() {}
  signup = async (data: ISignupDto) => {
    console.log("FULL DATA RECEIVED IN SERVICE:", data);
    const username = data.username || data.email?.split("@")[0] || "User";

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Email already exists!");
    }
    const hashedPassword = await hashPassword(data.password);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const newUser = (await User.create({
      username: username,
      email: data.email,
      password: hashedPassword,
      phone: String(data.phone),
      otp,
      confirmEmail: false,
    })) as any;

    console.log("Generated OTP for testing:", otp);

    return {
      message:
        "User registered successfully. Please check your email/OTP to confirm.",
      userId: newUser._id,
    };
  };
  confirmEmail = async (data: { email: string; otp: string }) => {
    const { email, otp } = data;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found!");
    }
    if (user.confirmEmail) {
      throw new Error("Email already confirmed!");
    }
    if (user.otp !== otp) {
      throw new Error("Invalid OTP Code!");
    }
    await User.findOneAndUpdate(
      { email },
      { confirmEmail: true, $unset: { otp: "" } },
    );

    return { message: "Email confirmed successfully" };
  };

  login = async (data: { email: string; password: string }) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new Error("Invalid email or password!");
    }
    if (!user.confirmEmail) {
      throw new Error("Please confirm your email first!");
    }
    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password!");
    }
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.TOKEN_SIGNIN_SECRET_KEY || "access_secret",
      { expiresIn: "1d" },
    );

    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET_KEY || "refresh_secret",
      { expiresIn: "7d" },
    );

    return { message: "Logged in successfully", accessToken, refreshToken };
  };

  refreshToken = async (token: string) => {
    if (!token) {
      throw new Error("Refresh token is required!");
    }
    const secretKey = process.env.REFRESH_TOKEN_SECRET_KEY || "refresh_secret";

    const decoded = jwt.verify(token, secretKey) as unknown as {
      userId: string;
      role: string;
    };

    const accessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.TOKEN_SIGNIN_SECRET_KEY || "access_secret",
      { expiresIn: "1d" },
    );

    return { message: "Token refreshed successfully!", accessToken };
  };

  forgotPassword = async (data: { email: string }) => {
    const { email } = data;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found!");
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpireTime = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otpExpireTime = otpExpireTime;
    await user.save();
    console.log("Generated Forgot Password OTP for testing:", otp);
    return {
      message:
        "OTP sent to your email successfully. Please check it to reset password.",
    };
  };
  resetPassword = async (data: {
    email: string;
    otp: string;
    password: string; 
  }) => {
    const { email, otp, password } = data; 
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found!");
    }

    if (!user.otp || user.otp !== otp) {
      throw new Error("Invalid OTP Code!");
    }
    if (user.otpExpireTime && new Date() > user.otpExpireTime) {
      throw new Error("OTP has expired!");
    }
    const hashedPassword = await hashPassword(password); 
    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
        $unset: { otp: "", otpExpireTime: "" },
      },
    );

    return { message: "Password reset successfully" };
  };

  googleLogin = async (data: { idToken: string }) => {
    const { idToken } = data;
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID as string,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new Error("Invalid Google Token!");
    }
    const { email, name, picture } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      const generatedUsername = name || email.split("@")[0] || "User";
      user = await User.create({
        username: generatedUsername,
        email,
        password: Math.random().toString(36).slice(-8),
        confirmEmail: true,
        phone: "00000000000",
      });
    }
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.TOKEN_SIGNIN_SECRET_KEY || "access_secret",
      { expiresIn: "1d" },
    );

    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET_KEY || "refresh_secret",
      { expiresIn: "7d" },
    );

    return { message: "Google login successful", accessToken, refreshToken };
  };
} 

export default new AuthenticationService();
