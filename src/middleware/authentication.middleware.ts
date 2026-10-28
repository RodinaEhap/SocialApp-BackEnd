import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
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
    const decoded = jwt.verify(token, secretKey) as unknown as {
      userId: string;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token!!!!", error });
  }
};
