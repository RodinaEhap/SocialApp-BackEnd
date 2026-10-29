import { Request, Response } from "express";
import userService from "./user.service";

export class UserController {
  getProfile = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId || req.userId;
      const result = await userService.getProfile(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };

  updateProfile = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId || req.userId;
      const result = await userService.updateProfile(userId, req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };

  changePassword = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId || req.userId;
      const result = await userService.changePassword(userId, req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };

  toggleFollow = async (req: any, res: Response) => {
    try {
      const currentUserId = req.user?.userId || req.userId;
      const { targetUserId } = req.params;
      const result = await userService.toggleFollow(
        currentUserId,
        targetUserId,
      );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };

  searchUsers = async (req: any, res: Response) => {
    try {
      const { keyword } = req.query;
      const result = await userService.searchUsers(keyword || "");
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };

  getSuggestions = async (req: any, res: Response) => {
    try {
      const currentUserId = req.user?.userId || req.userId;
      const result = await userService.getSuggestions(currentUserId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  
  toggleAccountPrivacy = async (req: any, res: Response) => {
    try {
      const userId = req.user?.userId || req.userId;
      const result = await userService.toggleAccountPrivacy(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
}

export default new UserController();
