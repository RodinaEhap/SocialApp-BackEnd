import { Router } from "express";
import authController from "./authentication.controller";
import * as validators from "./authentication.validation";
import { languageEnum } from "../../common/enum"; 
import { validationMiddleware } from "../../middleware";
const router = Router();
router.post(
  "/signup",
  validationMiddleware(validators.signup(languageEnum.EN)),
  authController.signup,
);
router.post(
  "/confirm-email",
  validationMiddleware(validators.confirmEmail(languageEnum.EN)),
  authController.confirmEmail,
);
router.post(
  "/login",
  validationMiddleware(validators.login(languageEnum.EN)),
  authController.login,
);
router.post(
  "/refresh-token",
  validationMiddleware(validators.refreshToken(languageEnum.EN)),
  authController.refreshToken,
);

export default router;
