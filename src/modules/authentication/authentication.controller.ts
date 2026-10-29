import { Request, Response } from "express";
import authenticationService from "./authentication.service";

export class AuthenticationController {
  signup = async (req: Request, res: Response) => {
    try {
      const result = await authenticationService.signup(req.body);
      return res.status(201).json({ message: "Success", result });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };

  confirmEmail = async (req: Request, res: Response) => {
    try {
      const result = await authenticationService.confirmEmail(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const result = await authenticationService.login(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      const result = await authenticationService.refreshToken(refreshToken);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(401)
        .json({ message: error.message || "Invalid refresh token!" });
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const result = await authenticationService.forgotPassword(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const result = await authenticationService.resetPassword(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  
  googleLogin = async (req: Request, res: Response) => {
    try {
      const result = await authenticationService.googleLogin(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
}

export default new AuthenticationController();
