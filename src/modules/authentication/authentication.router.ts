import { Router } from "express";
import authController from "./authentication.controller";
import * as validators from "./authentication.validation";
import { languageEnum } from "../../common/enum";
import { authMiddleware, validationMiddleware } from "../../middleware";
import authenticationController from "./authentication.controller";

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
  "/resend-confirm-email",
  validationMiddleware(validators.resendConfirmEmail(languageEnum.EN)),
  authController.resendConfirmEmail,
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
router.post(
  "/forgot-password",
  validationMiddleware(validators.forgotPassword(languageEnum.EN)),
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  validationMiddleware(validators.resetPassword(languageEnum.EN)),
  authController.resetPassword,
);

router.post(
  "/google-login",
  validationMiddleware(validators.googleLogin(languageEnum.EN)),
  authController.googleLogin,
);

router.post("/logout", authMiddleware, authenticationController.logout);
export default router;
