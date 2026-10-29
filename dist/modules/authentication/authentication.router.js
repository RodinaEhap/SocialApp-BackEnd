"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_controller_1 = __importDefault(require("./authentication.controller"));
const validators = __importStar(require("./authentication.validation"));
const enum_1 = require("../../common/enum");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.post("/signup", (0, middleware_1.validationMiddleware)(validators.signup(enum_1.languageEnum.EN)), authentication_controller_1.default.signup);
router.post("/confirm-email", (0, middleware_1.validationMiddleware)(validators.confirmEmail(enum_1.languageEnum.EN)), authentication_controller_1.default.confirmEmail);
router.post("/login", (0, middleware_1.validationMiddleware)(validators.login(enum_1.languageEnum.EN)), authentication_controller_1.default.login);
router.post("/refresh-token", (0, middleware_1.validationMiddleware)(validators.refreshToken(enum_1.languageEnum.EN)), authentication_controller_1.default.refreshToken);
router.post("/forgot-password", (0, middleware_1.validationMiddleware)(validators.forgotPassword(enum_1.languageEnum.EN)), authentication_controller_1.default.forgotPassword);
router.post("/reset-password", (0, middleware_1.validationMiddleware)(validators.resetPassword(enum_1.languageEnum.EN)), authentication_controller_1.default.resetPassword);
router.post("/google-login", (0, middleware_1.validationMiddleware)(validators.googleLogin(enum_1.languageEnum.EN)), authentication_controller_1.default.googleLogin);
exports.default = router;
